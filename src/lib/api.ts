// Gusion API Client with ngrok bypass headers

const API_BASE_URL = "https://front-katheryn-personal00abhi-d9168ec1.koyeb.app";

interface RequestOptions extends RequestInit {
  requiresAuth?: boolean;
  includeUserId?: boolean;
}

// Helper to get auth data from localStorage
function getAuthData(): { token: string | null; userId: string | null } {
  const token = localStorage.getItem("gusion_token");
  const userStr = localStorage.getItem("gusion_user");
  let userId: string | null = null;
  
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      userId = user.id || null;
    } catch {
      userId = null;
    }
  }
  
  return { token, userId };
}

export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { requiresAuth = true, includeUserId = false, headers: customHeaders, ...restOptions } = options;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
    ...customHeaders,
  };

  if (requiresAuth || includeUserId) {
    const { token, userId } = getAuthData();
    
    if (requiresAuth && token) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;
    }
    
    if (includeUserId && userId) {
      (headers as Record<string, string>)["X-User-Id"] = userId;
    }
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...restOptions,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new ApiError(
      errorData.error || errorData.message || `API Error: ${response.status}`,
      response.status,
      errorData
    );
  }

  return response.json();
}

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Auth API
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name?: string;
}

// Backend returns flat structure
interface BackendAuthResponse {
  userId: string;
  email: string;
  name?: string;
  role: string;
  token: string;
}

// Frontend expects nested structure
export interface AuthResponse {
  token: string;
  user: UserProfile;
}

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  role?: "USER" | "ADMIN";
  createdAt?: string;
}

// Transform flat backend response to frontend structure
function transformAuthResponse(response: BackendAuthResponse): AuthResponse {
  return {
    token: response.token,
    user: {
      id: response.userId,
      email: response.email,
      name: response.name,
      role: response.role as "USER" | "ADMIN",
    },
  };
}

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await apiClient<BackendAuthResponse>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      requiresAuth: false,
    });
    return transformAuthResponse(response);
  },

  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    const response = await apiClient<BackendAuthResponse>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      requiresAuth: false,
    });
    return transformAuthResponse(response);
  },

  getProfile: () => apiClient<UserProfile>("/api/auth/profile"),
};

// Problems API
export interface TestCase {
  id?: string;
  input: string;
  output: string;
  inputUrl?: string;        // URL to fetch large inputs (if not hidden)
  expectedOutput?: string;  // Alternative field name from backend
  hidden?: boolean;         // Legacy field
  isHidden?: boolean;       // Backend uses isHidden
}

export interface Problem {
  id: string;
  slug: string;
  title?: string;
  description?: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  tags?: string[];
  acceptanceRate?: number;
  starterCode?: Record<string, string>;
  examples?: ProblemExample[];
  constraints?: string[];
  testCases?: TestCase[]; // May include hidden test cases from backend
}

export interface ProblemExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export const problemsApi = {
  getAll: (page = 0, size = 20) =>
    apiClient<PaginatedResponse<Problem>>(`/api/problems?page=${page}&size=${size}`),

  getBySlug: (slug: string) => apiClient<Problem>(`/api/problems/${slug}`),

  // Admin: Create a new problem
  create: (data: CreateProblemRequest) =>
    apiClient<Problem>("/api/problems", {
      method: "POST",
      body: JSON.stringify(data),
      requiresAuth: true,
    }),

  // Admin: Update an existing problem
  update: (problemId: string, data: Partial<CreateProblemRequest>) =>
    apiClient<Problem>(`/api/problems/${problemId}`, {
      method: "PUT",
      body: JSON.stringify(data),
      requiresAuth: true,
    }),

  // Admin: Delete a problem
  delete: (problemId: string) =>
    apiClient<void>(`/api/problems/${problemId}`, {
      method: "DELETE",
      requiresAuth: true,
    }),

  // Admin: Add test case to a problem
  addTestCase: (problemId: string, testCase: CreateTestCaseRequest) =>
    apiClient<TestCase>(`/api/problems/${problemId}/testcases`, {
      method: "POST",
      body: JSON.stringify(testCase),
      requiresAuth: true,
    }),

  // Admin: Get all test cases for a problem
  getTestCases: (problemId: string) =>
    apiClient<TestCase[]>(`/api/problems/${problemId}/testcases`, {
      requiresAuth: true,
    }),

  // Admin: Delete a test case
  deleteTestCase: (problemId: string, testCaseId: string) =>
    apiClient<void>(`/api/problems/${problemId}/testcases/${testCaseId}`, {
      method: "DELETE",
      requiresAuth: true,
    }),
};

// Admin API Types
export interface CreateProblemRequest {
  title: string;
  slug: string;
  description: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  starterCode?: Record<string, string>;
  tags?: string[];
  cpuLimit?: number;
  memoryLimit?: number;
}

export interface CreateTestCaseRequest {
  input: string;
  expectedOutput: string;
  hidden: boolean;
}

// Submission API
export interface SubmissionRequest {
  problemId: number; // Backend expects Long
  lang: string;      // e.g., "java", "python"
  code: string;
  customInput?: string; // Optional, only for /run
}

// Backend response from /api/submit
export interface SubmissionResponse {
  submissionId: string;    // UUID from backend
  status: SubmissionStatus;
  verdict?: Verdict;
  executionTime?: number;  // Backend field name
  memoryUsed?: number;     // Backend field name
  // Legacy/normalized fields for frontend compatibility
  id?: string;
  runtime?: number;
  memory?: number;
  failedTestCase?: TestCaseResult;
}

// Backend status values
export type SubmissionStatus = "PENDING" | "COMPLETED";

// Backend verdict short codes
export type Verdict = "AC" | "WA" | "TLE" | "MLE" | "RE" | "CE";

export interface TestCaseResult {
  input: string;
  expected: string;
  actual: string;
}

// Run API (playground-style with custom input)
export interface RunRequest {
  problemId: string;
  lang: string;
  code: string;
  customInput: string;
}

export interface RunResponse {
  output: string;
  error?: string;
}

// Raw backend response shape for /api/run (playground-style)
interface RawRunResponse {
  output?: string;
  error?: string;
}

// Normalize backend run response to simple output structure
function normalizeRunResponse(raw: RawRunResponse): RunResponse {
  return {
    output: raw.output || "",
    error: raw.error,
  };
}

// Submission History types
export interface SubmissionHistoryItem {
  id: string;
  problemId: string;
  language: string;
  status: SubmissionStatus;
  verdict?: Verdict;
  runtime?: number;           // May be present
  executionTime?: number;     // Backend field name
  memory?: number;
  createdAt: string;
}

export interface SubmissionHistoryResponse {
  content: SubmissionHistoryItem[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

// Leaderboard API Types
export interface LeaderboardEntry {
  rank: number;
  email: string;
  name?: string;
  problemsSolved: number;
  totalSubmissions?: number;
  acceptanceRate?: number;
}

export interface LeaderboardResponse {
  content: LeaderboardEntry[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export const submissionApi = {
  // CRITICAL: Include X-User-Id header for submissions
  submit: (data: { problemId: string; lang: string; code: string }) =>
    apiClient<SubmissionResponse>("/api/submit", {
      method: "POST",
      body: JSON.stringify({
        problemId: parseInt(data.problemId, 10), // Convert to number for backend Long
        lang: data.lang.toLowerCase(),           // Backend expects lowercase (e.g., "java", "python")
        code: data.code,
      }),
      requiresAuth: true,
      includeUserId: true, // This adds X-User-Id header
    }),

  getStatus: (submissionId: string) =>
    apiClient<SubmissionResponse>(`/api/submit/${submissionId}/status`, {
      requiresAuth: true,
      includeUserId: true,
    }),

  // Run with custom input (playground mode, no verdict)
  run: async (data: RunRequest): Promise<RunResponse> => {
    const raw = await apiClient<RawRunResponse>("/api/run", {
      method: "POST",
      body: JSON.stringify({
        problemId: parseInt(data.problemId, 10),
        lang: data.lang.toLowerCase(),
        code: data.code,
        customInput: data.customInput,
      }),
      requiresAuth: true,
      includeUserId: true,
    });
    return normalizeRunResponse(raw);
  },

  // Get submission history for user
  getHistory: (problemId?: string, page = 0, size = 10) => {
    const params = new URLSearchParams({ page: String(page), size: String(size) });
    if (problemId) params.set("problemId", problemId);
    return apiClient<SubmissionHistoryResponse>(
      `/api/submit/history?${params.toString()}`,
      {
        requiresAuth: true,
        includeUserId: true,
      }
    );
  },
};

// Leaderboard API
export const leaderboardApi = {
  getLeaderboard: (page = 0, size = 20) =>
    apiClient<LeaderboardResponse>(`/api/leaderboard?page=${page}&size=${size}`, {
      requiresAuth: true,
    }),
};

// AI Analysis API
export interface AIAnalysis {
  feedback: string;
  hints: string[];
  conceptsToReview?: string[];
}

export const aiApi = {
  getAnalysis: (submissionId: string) =>
    apiClient<AIAnalysis>(`/api/ai/analysis/${submissionId}`),
};

// AI Hint Streaming
export interface HintStreamOptions {
  problemId: string;
  level?: number;
  onChunk: (text: string) => void;
  onComplete: () => void;
  onError: (error: Error) => void;
}

export function streamAIHint(options: HintStreamOptions): () => void {
  const { problemId, level = 1, onChunk, onComplete, onError } = options;
  
  const { token, userId } = getAuthData();
  
  // Build URL with query params
  const url = new URL(`${API_BASE_URL}/api/ai/hint/stream`);
  url.searchParams.set("problemId", problemId);
  url.searchParams.set("level", level.toString());
  
  // For EventSource, we need to pass auth via query params since headers aren't supported
  // However, if the backend supports it, we use a custom fetch-based SSE implementation
  
  const abortController = new AbortController();
  
  const fetchSSE = async () => {
    try {
      const headers: HeadersInit = {
        "Accept": "text/event-stream",
        "ngrok-skip-browser-warning": "true",
      };
      
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }
      
      if (userId) {
        headers["X-User-Id"] = userId;
      }
      
      const response = await fetch(url.toString(), {
        method: "GET",
        headers,
        signal: abortController.signal,
      });
      
      if (!response.ok) {
        throw new Error(`Hint stream failed: ${response.status}`);
      }
      
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No response body");
      }
      
      const decoder = new TextDecoder();
      let buffer = "";
      
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) {
          onComplete();
          break;
        }
        
        buffer += decoder.decode(value, { stream: true });
        
        // Process SSE events
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";
        
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6).trim();
            if (data === "[DONE]") {
              onComplete();
              return;
            }
            onChunk(data);
          }
        }
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        onError(error as Error);
      }
    }
  };
  
  fetchSSE();
  
  // Return cleanup function
  return () => {
    abortController.abort();
  };
}

// Utility function to format slug to title
export function formatSlugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Utility to normalize problem data with defaults
export function normalizeProblem(problem: Problem): Problem & { title: string; tags: string[] } {
  return {
    ...problem,
    title: problem.title || formatSlugToTitle(problem.slug),
    tags: problem.tags?.length ? problem.tags : ["Algorithm"],
  };
}

// Get only visible test cases (filter out hidden ones)
export function getVisibleTestCases(problem: Problem): TestCase[] {
  return (problem.testCases || []).filter(tc => !tc.hidden && !tc.isHidden);
}

// Check if a test case is hidden (supports both field names)
export function isTestCaseHidden(testCase: TestCase): boolean {
  return testCase.hidden === true || testCase.isHidden === true;
}
