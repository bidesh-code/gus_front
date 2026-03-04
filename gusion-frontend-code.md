# Gusion Frontend - Complete Source Code

## index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lovable App</title>
    <meta name="description" content="Lovable Generated Project" />
    <meta name="author" content="Lovable" />
    <meta property="og:title" content="Lovable App" />
    <meta property="og:description" content="Lovable Generated Project" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@Lovable" />
    <meta name="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## vite.config.ts
```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
```

## tailwind.config.ts
```ts
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        neon: {
          purple: "hsl(var(--neon-purple))",
          cyan: "hsl(var(--neon-cyan))",
          pink: "hsl(var(--neon-pink))",
        },
        glass: {
          bg: "hsl(var(--glass-bg))",
          border: "hsl(var(--glass-border))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "glow-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 5px hsl(var(--neon-purple) / 0.5), 0 0 10px hsl(var(--neon-purple) / 0.3)",
          },
          "50%": {
            boxShadow: "0 0 15px hsl(var(--neon-purple) / 0.8), 0 0 30px hsl(var(--neon-purple) / 0.5)",
          },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glow-pulse": "glow-pulse 2s infinite",
        "float": "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
```

## src/index.css
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Gusion - Cyberpunk Professional Design System */

@layer base {
  :root {
    --background: 222 47% 6%;
    --foreground: 210 40% 98%;

    --card: 222 47% 8%;
    --card-foreground: 210 40% 98%;

    --popover: 222 47% 8%;
    --popover-foreground: 210 40% 98%;

    --primary: 285 100% 50%;
    --primary-foreground: 210 40% 98%;

    --secondary: 180 100% 50%;
    --secondary-foreground: 222 47% 6%;

    --muted: 217 32% 17%;
    --muted-foreground: 215 20% 65%;

    --accent: 285 100% 50%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 84% 60%;
    --destructive-foreground: 210 40% 98%;

    --success: 142 76% 46%;
    --success-foreground: 210 40% 98%;

    --warning: 38 92% 50%;
    --warning-foreground: 222 47% 6%;

    --border: 217 32% 17%;
    --input: 217 32% 17%;
    --ring: 285 100% 50%;

    --radius: 0.75rem;

    /* Neon glow colors */
    --neon-purple: 285 100% 50%;
    --neon-cyan: 180 100% 50%;
    --neon-pink: 330 100% 60%;

    /* Glassmorphism */
    --glass-bg: 222 47% 11%;
    --glass-border: 217 32% 25%;

    --sidebar-background: 222 47% 6%;
    --sidebar-foreground: 210 40% 98%;
    --sidebar-primary: 285 100% 50%;
    --sidebar-primary-foreground: 210 40% 98%;
    --sidebar-accent: 217 32% 17%;
    --sidebar-accent-foreground: 210 40% 98%;
    --sidebar-border: 217 32% 17%;
    --sidebar-ring: 285 100% 50%;
  }

  .dark {
    --background: 222 47% 4%;
    --foreground: 210 40% 98%;

    --card: 222 47% 6%;
    --card-foreground: 210 40% 98%;

    --popover: 222 47% 6%;
    --popover-foreground: 210 40% 98%;

    --primary: 285 100% 50%;
    --primary-foreground: 210 40% 98%;

    --secondary: 180 100% 50%;
    --secondary-foreground: 222 47% 6%;

    --muted: 217 32% 17%;
    --muted-foreground: 215 20% 65%;

    --accent: 285 100% 50%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 62% 30%;
    --destructive-foreground: 210 40% 98%;

    --border: 217 32% 17%;
    --input: 217 32% 17%;
    --ring: 285 100% 50%;

    --sidebar-background: 222 47% 4%;
    --sidebar-foreground: 210 40% 98%;
    --sidebar-primary: 285 100% 50%;
    --sidebar-primary-foreground: 210 40% 98%;
    --sidebar-accent: 217 32% 17%;
    --sidebar-accent-foreground: 210 40% 98%;
    --sidebar-border: 217 32% 17%;
    --sidebar-ring: 285 100% 50%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-background text-foreground font-sans antialiased;
    font-family: 'Inter', system-ui, sans-serif;
  }

  code, pre, .font-mono {
    font-family: 'JetBrains Mono', monospace;
  }
}

@layer components {
  /* Glassmorphism card */
  .glass-card {
    @apply relative overflow-hidden rounded-xl;
    background: hsl(var(--glass-bg) / 0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid hsl(var(--glass-border) / 0.5);
  }

  .glass-card-hover {
    @apply glass-card transition-all duration-300;
  }

  .glass-card-hover:hover {
    border-color: hsl(var(--neon-purple) / 0.5);
    box-shadow: 0 0 20px hsl(var(--neon-purple) / 0.2),
                0 0 40px hsl(var(--neon-purple) / 0.1);
  }

  /* Neon glow effects */
  .neon-glow-purple {
    box-shadow: 0 0 5px hsl(var(--neon-purple) / 0.5),
                0 0 20px hsl(var(--neon-purple) / 0.3),
                0 0 40px hsl(var(--neon-purple) / 0.1);
  }

  .neon-glow-cyan {
    box-shadow: 0 0 5px hsl(var(--neon-cyan) / 0.5),
                0 0 20px hsl(var(--neon-cyan) / 0.3),
                0 0 40px hsl(var(--neon-cyan) / 0.1);
  }

  .neon-text-purple {
    text-shadow: 0 0 10px hsl(var(--neon-purple) / 0.8),
                 0 0 20px hsl(var(--neon-purple) / 0.5),
                 0 0 40px hsl(var(--neon-purple) / 0.3);
  }

  .neon-text-cyan {
    text-shadow: 0 0 10px hsl(var(--neon-cyan) / 0.8),
                 0 0 20px hsl(var(--neon-cyan) / 0.5),
                 0 0 40px hsl(var(--neon-cyan) / 0.3);
  }

  /* Gradient borders */
  .gradient-border {
    position: relative;
  }

  .gradient-border::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1px;
    background: linear-gradient(135deg, hsl(var(--neon-purple)), hsl(var(--neon-cyan)));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  /* Button neon variant */
  .btn-neon {
    @apply relative overflow-hidden px-6 py-2 font-semibold rounded-lg transition-all duration-300;
    background: linear-gradient(135deg, hsl(var(--neon-purple)), hsl(var(--neon-cyan) / 0.8));
  }

  .btn-neon:hover {
    @apply neon-glow-purple;
    transform: translateY(-2px);
  }

  /* Difficulty badges */
  .badge-easy {
    @apply bg-success/20 text-success border border-success/30;
  }

  .badge-medium {
    @apply bg-warning/20 text-warning border border-warning/30;
  }

  .badge-hard {
    @apply bg-destructive/20 text-destructive border border-destructive/30;
  }

  /* Animated pulse for status indicators */
  .pulse-neon {
    animation: pulseNeon 2s infinite;
  }

  @keyframes pulseNeon {
    0%, 100% {
      box-shadow: 0 0 5px hsl(var(--neon-purple) / 0.5),
                  0 0 10px hsl(var(--neon-purple) / 0.3);
    }
    50% {
      box-shadow: 0 0 15px hsl(var(--neon-purple) / 0.8),
                  0 0 30px hsl(var(--neon-purple) / 0.5),
                  0 0 45px hsl(var(--neon-purple) / 0.3);
    }
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: hsl(var(--background));
  }

  ::-webkit-scrollbar-thumb {
    background: hsl(var(--muted));
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: hsl(var(--muted-foreground) / 0.5);
  }
}

@layer utilities {
  .text-gradient {
    @apply bg-clip-text text-transparent;
    background-image: linear-gradient(135deg, hsl(var(--neon-purple)), hsl(var(--neon-cyan)));
  }

  .bg-gradient-neon {
    background: linear-gradient(135deg, hsl(var(--neon-purple)), hsl(var(--neon-cyan)));
  }
}
```

## src/main.tsx
```tsx
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
```

## src/App.tsx
```tsx
// App entry – cache-bust v2
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Arena from "./pages/Arena";
import Leaderboard from "./pages/Leaderboard";
import ProblemManager from "./pages/admin/ProblemManager";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/problem/:slug"
              element={
                <ProtectedRoute>
                  <Arena />
                </ProtectedRoute>
              }
            />
            <Route
              path="/leaderboard"
              element={
                <ProtectedRoute>
                  <Leaderboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute adminOnly>
                  <ProblemManager />
                </ProtectedRoute>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
```

## src/lib/utils.ts
```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## src/lib/api.ts
```ts
// Gusion API Client with ngrok bypass headers

const API_BASE_URL = "https://liftable-unusefully-anisa.ngrok-free.dev";

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
  inputUrl?: string;
  expectedOutput?: string;
  hidden?: boolean;
  isHidden?: boolean;
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
  testCases?: TestCase[];
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

  create: (data: CreateProblemRequest) =>
    apiClient<Problem>("/api/problems", {
      method: "POST",
      body: JSON.stringify(data),
      requiresAuth: true,
    }),

  update: (problemId: string, data: Partial<CreateProblemRequest>) =>
    apiClient<Problem>(`/api/problems/${problemId}`, {
      method: "PUT",
      body: JSON.stringify(data),
      requiresAuth: true,
    }),

  delete: (problemId: string) =>
    apiClient<void>(`/api/problems/${problemId}`, {
      method: "DELETE",
      requiresAuth: true,
    }),

  addTestCase: (problemId: string, testCase: CreateTestCaseRequest) =>
    apiClient<TestCase>(`/api/problems/${problemId}/testcases`, {
      method: "POST",
      body: JSON.stringify(testCase),
      requiresAuth: true,
    }),

  getTestCases: (problemId: string) =>
    apiClient<TestCase[]>(`/api/problems/${problemId}/testcases`, {
      requiresAuth: true,
    }),

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
  problemId: number;
  lang: string;
  code: string;
  customInput?: string;
}

export interface SubmissionResponse {
  submissionId: string;
  status: SubmissionStatus;
  verdict?: Verdict;
  executionTime?: number;
  memoryUsed?: number;
  id?: string;
  runtime?: number;
  memory?: number;
  failedTestCase?: TestCaseResult;
}

export type SubmissionStatus = "PENDING" | "COMPLETED";
export type Verdict = "AC" | "WA" | "TLE" | "MLE" | "RE" | "CE";

export interface TestCaseResult {
  input: string;
  expected: string;
  actual: string;
}

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

interface RawRunResponse {
  output?: string;
  error?: string;
}

function normalizeRunResponse(raw: RawRunResponse): RunResponse {
  return {
    output: raw.output || "",
    error: raw.error,
  };
}

export interface SubmissionHistoryItem {
  id: string;
  problemId: string;
  language: string;
  status: SubmissionStatus;
  verdict?: Verdict;
  runtime?: number;
  executionTime?: number;
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
  submit: (data: { problemId: string; lang: string; code: string }) =>
    apiClient<SubmissionResponse>("/api/submit", {
      method: "POST",
      body: JSON.stringify({
        problemId: parseInt(data.problemId, 10),
        lang: data.lang.toLowerCase(),
        code: data.code,
      }),
      requiresAuth: true,
      includeUserId: true,
    }),

  getStatus: (submissionId: string) =>
    apiClient<SubmissionResponse>(`/api/submit/${submissionId}/status`, {
      requiresAuth: true,
      includeUserId: true,
    }),

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

export const leaderboardApi = {
  getLeaderboard: (page = 0, size = 20) =>
    apiClient<LeaderboardResponse>(`/api/leaderboard?page=${page}&size=${size}`, {
      requiresAuth: true,
    }),
};

export interface AIAnalysis {
  feedback: string;
  hints: string[];
  conceptsToReview?: string[];
}

export const aiApi = {
  getAnalysis: (submissionId: string) =>
    apiClient<AIAnalysis>(`/api/ai/analysis/${submissionId}`),
};

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
  
  const url = new URL(`${API_BASE_URL}/api/ai/hint/stream`);
  url.searchParams.set("problemId", problemId);
  url.searchParams.set("level", level.toString());
  
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
  
  return () => {
    abortController.abort();
  };
}

export function formatSlugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function normalizeProblem(problem: Problem): Problem & { title: string; tags: string[] } {
  return {
    ...problem,
    title: problem.title || formatSlugToTitle(problem.slug),
    tags: problem.tags?.length ? problem.tags : ["Algorithm"],
  };
}

export function getVisibleTestCases(problem: Problem): TestCase[] {
  return (problem.testCases || []).filter(tc => !tc.hidden && !tc.isHidden);
}

export function isTestCaseHidden(testCase: TestCase): boolean {
  return testCase.hidden === true || testCase.isHidden === true;
}
```

## src/contexts/AuthContext.tsx
```tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authApi, UserProfile, LoginRequest, SignupRequest, ApiError } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<boolean>;
  signup: (data: SignupRequest) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEYS = {
  TOKEN: "gusion_token",
  USER: "gusion_user",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);

    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem(STORAGE_KEYS.TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    }
    setIsLoading(false);
  }, []);

  const persistAuth = useCallback((authToken: string, authUser: UserProfile) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, authToken);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(authUser));
    setToken(authToken);
    setUser(authUser);
  }, []);

  const clearAuth = useCallback(() => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    setToken(null);
    setUser(null);
  }, []);

  const login = useCallback(
    async (data: LoginRequest): Promise<boolean> => {
      try {
        setIsLoading(true);
        const response = await authApi.login(data);
        persistAuth(response.token, response.user);
        toast({
          title: "Welcome back!",
          description: `Logged in as ${response.user.email}`,
        });
        return true;
      } catch (error) {
        const message =
          error instanceof ApiError
            ? error.message
            : "Login failed. Please try again.";
        toast({
          title: "Login Failed",
          description: message,
          variant: "destructive",
        });
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [persistAuth, toast]
  );

  const signup = useCallback(
    async (data: SignupRequest): Promise<boolean> => {
      try {
        setIsLoading(true);
        const response = await authApi.signup(data);
        persistAuth(response.token, response.user);
        toast({
          title: "Account Created!",
          description: "Welcome to Gusion. Let's start coding!",
        });
        return true;
      } catch (error) {
        const message =
          error instanceof ApiError
            ? error.message
            : "Signup failed. Please try again.";
        toast({
          title: "Signup Failed",
          description: message,
          variant: "destructive",
        });
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [persistAuth, toast]
  );

  const logout = useCallback(() => {
    clearAuth();
    toast({
      title: "Logged Out",
      description: "See you next time!",
    });
  }, [clearAuth, toast]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!token && !!user,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
```

## src/components/layout/ProtectedRoute.tsx
```tsx
import { useEffect, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export function ProtectedRoute({ children, adminOnly = false }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const { toast } = useToast();
  const hasShownToast = useRef(false);

  const isAdmin = user?.role === "ADMIN";
  const shouldDenyAccess = adminOnly && isAuthenticated && !isAdmin;

  useEffect(() => {
    if (shouldDenyAccess && !hasShownToast.current) {
      hasShownToast.current = true;
      toast({
        title: "Access Denied",
        description: "You don't have permission to access the admin area.",
        variant: "destructive",
      });
    }
  }, [shouldDenyAccess, toast]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (shouldDenyAccess) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
```

## src/components/layout/Layout.tsx
```tsx
import { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Zap } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export function Layout({ children, showFooter = true }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">{children}</main>
      {showFooter && <Footer />}
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-neon">
              <Zap className="h-4 w-4 text-background" />
            </div>
            <span className="font-bold text-gradient">Gusion</span>
            <span className="text-sm text-muted-foreground">
              — AI-Powered Online Judge
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="transition-colors hover:text-foreground">About</a>
            <a href="#" className="transition-colors hover:text-foreground">Documentation</a>
            <a href="#" className="transition-colors hover:text-foreground">GitHub</a>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Gusion. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

## src/components/layout/Navbar.tsx
```tsx
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, LogOut, Settings, Zap, Shield } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/leaderboard", label: "Leaderboard" },
];

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdmin = user?.role === "ADMIN" || true;

  const isActive = (path: string) => location.pathname === path;

  const getInitials = (name?: string, email?: string) => {
    if (name) {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return email?.charAt(0).toUpperCase() || "U";
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-neon">
            <Zap className="h-5 w-5 text-background" />
          </div>
          <span className="text-xl font-bold text-gradient">Gusion</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-primary neon-glow-purple" />
              )}
            </Link>
          ))}
          
          {isAuthenticated && isAdmin && (
            <Link
              to="/admin"
              className={`relative flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors ${
                isActive("/admin")
                  ? "text-neon-purple"
                  : "text-muted-foreground hover:text-neon-purple"
              }`}
            >
              <Shield className="h-4 w-4" />
              Admin
              {isActive("/admin") && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-neon-purple" />
              )}
            </Link>
          )}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-full ring-2 ring-primary/50 transition-all hover:ring-primary"
                >
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user?.avatar} alt={user?.name || user?.email} />
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {getInitials(user?.name, user?.email)}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 glass-card border-glass-border">
                <div className="flex items-center gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-primary/20 text-primary text-xs">
                      {getInitials(user?.name, user?.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user?.name || "User"}</span>
                    <span className="text-xs text-muted-foreground">{user?.email}</span>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/auth">
              <Button className="btn-neon text-foreground">Sign In</Button>
            </Link>
          )}
        </div>

        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 glass-card border-l-glass-border">
            <div className="flex flex-col gap-6 pt-8">
              {isAuthenticated && (
                <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {getInitials(user?.name, user?.email)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{user?.name || "User"}</span>
                    <span className="text-sm text-muted-foreground">{user?.email}</span>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      isActive(link.href)
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                
                {isAuthenticated && isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                      isActive("/admin")
                        ? "bg-neon-purple/10 text-neon-purple"
                        : "text-muted-foreground hover:bg-muted hover:text-neon-purple"
                    }`}
                  >
                    <Shield className="h-4 w-4" />
                    Admin Panel
                  </Link>
                )}
              </div>

              <div className="mt-auto flex flex-col gap-2">
                {isAuthenticated ? (
                  <>
                    <Button variant="ghost" className="justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button variant="ghost" className="justify-start">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start text-destructive hover:text-destructive"
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </>
                ) : (
                  <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="btn-neon w-full text-foreground">Sign In</Button>
                  </Link>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
```

## src/components/NavLink.tsx
```tsx
import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={({ isActive, isPending }) =>
          cn(className, isActive && activeClassName, isPending && pendingClassName)
        }
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
```

## src/components/arena/MonacoEditor.tsx
```tsx
import * as React from "react";
import MonacoEditorReact from "@monaco-editor/react";
import { cn } from "@/lib/utils";

export type MonacoEditorProps = React.ComponentProps<typeof MonacoEditorReact> & {
  containerClassName?: string;
};

const MonacoEditor = React.forwardRef<HTMLDivElement, MonacoEditorProps>(
  ({ containerClassName, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("h-full w-full", containerClassName)}>
        <MonacoEditorReact className={className} {...props} />
      </div>
    );
  },
);

MonacoEditor.displayName = "MonacoEditor";

export default MonacoEditor;
```

## src/components/arena/SubmissionHistory.tsx
```tsx
import { Loader2, CheckCircle2, XCircle, Clock, Cpu, History } from "lucide-react";
import { useSubmissionHistory, formatTimeAgo, getCompactVerdictInfo, getExecutionTime } from "@/hooks/useSubmissionHistory";
import { cn } from "@/lib/utils";

interface SubmissionHistoryProps {
  problemId: string;
  onRefresh?: () => void;
}

export function SubmissionHistory({ problemId }: SubmissionHistoryProps) {
  const { data, isLoading, error, refetch } = useSubmissionHistory({ problemId });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-2 py-8 text-center">
        <XCircle className="h-6 w-6 text-destructive" />
        <p className="text-sm text-muted-foreground">Failed to load history</p>
        <button 
          onClick={() => refetch()} 
          className="text-sm text-primary hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  const submissions = data?.content || [];

  if (submissions.length === 0) {
    return (
      <div className="flex flex-col items-center gap-2 py-8 text-center">
        <History className="h-8 w-8 text-muted-foreground/50" />
        <p className="text-sm text-muted-foreground">No submissions yet</p>
        <p className="text-xs text-muted-foreground/70">
          Submit your code to see your history here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {submissions.map((submission) => {
        const verdictInfo = getCompactVerdictInfo(submission.verdict);
        const execTime = getExecutionTime(submission);
        
        return (
          <div
            key={submission.id}
            className="flex items-center justify-between rounded-lg border border-glass-border bg-glass-bg/30 p-3 transition-colors hover:bg-glass-bg/50"
          >
            <div className="flex items-center gap-3">
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg",
                verdictInfo.className
              )}>
                {submission.verdict === "AC" ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : submission.verdict ? (
                  <XCircle className="h-4 w-4" />
                ) : (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
              </div>
              
              <div>
                <div className={cn("text-sm font-medium", verdictInfo.className.split(" ")[0])}>
                  {verdictInfo.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {submission.language}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              {execTime !== undefined && (
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{execTime} ms</span>
                </div>
              )}
              
              {submission.memory !== undefined && (
                <div className="flex items-center gap-1">
                  <Cpu className="h-3 w-3" />
                  <span>{(submission.memory / 1024).toFixed(1)} MB</span>
                </div>
              )}
              
              <div className="w-16 text-right">
                {formatTimeAgo(submission.createdAt)}
              </div>
            </div>
          </div>
        );
      })}
      
      {data && data.totalElements > submissions.length && (
        <p className="pt-2 text-center text-xs text-muted-foreground">
          Showing {submissions.length} of {data.totalElements} submissions
        </p>
      )}
    </div>
  );
}
```

## src/hooks/useRunCode.ts
```ts
import { useState, useCallback } from "react";
import { submissionApi, RunResponse } from "@/lib/api";

export function useRunCode() {
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async (problemId: string, language: string, code: string, customInput: string) => {
    setIsRunning(true);
    setError(null);
    setOutput(null);

    try {
      const response = await submissionApi.run({ problemId, lang: language, code, customInput });
      setOutput(response.output);
      if (response.error) {
        setError(response.error);
      }
      return response;
    } catch (err) {
      const message = (err as Error).message || "Failed to run code";
      setError(message);
      return null;
    } finally {
      setIsRunning(false);
    }
  }, []);

  const reset = useCallback(() => {
    setOutput(null);
    setError(null);
  }, []);

  return {
    isRunning,
    output,
    error,
    run,
    reset,
  };
}
```

## src/hooks/useSubmission.ts
```ts
import { useState, useCallback, useRef, useEffect } from "react";
import { submissionApi, SubmissionResponse, SubmissionStatus, Verdict } from "@/lib/api";

interface UseSubmissionOptions {
  onComplete?: (submission: SubmissionResponse) => void;
  pollingInterval?: number;
}

export function useSubmission(options: UseSubmissionOptions = {}) {
  const { onComplete, pollingInterval = 2000 } = options;
  
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [status, setStatus] = useState<SubmissionStatus | null>(null);
  const [result, setResult] = useState<SubmissionResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const submitGuardRef = useRef(false);

  const stopPolling = useCallback(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  }, []);

  const pollStatus = useCallback(async (id: string) => {
    try {
      const response = await submissionApi.getStatus(id);
      setStatus(response.status);
      
      if (response.status === "COMPLETED" || response.verdict) {
        setResult(response);
        stopPolling();
        setIsSubmitting(false);
        onComplete?.(response);
      }
    } catch (err) {
      setError((err as Error).message);
      stopPolling();
      setIsSubmitting(false);
    }
  }, [stopPolling, onComplete]);

  const submit = useCallback(async (problemId: string, language: string, code: string) => {
    if (submitGuardRef.current) return null;
    submitGuardRef.current = true;

    setIsSubmitting(true);
    setError(null);
    setResult(null);
    setStatus("PENDING");
    
    try {
      const response = await submissionApi.submit({ problemId, lang: language, code });
      const subId = response.submissionId;
      setSubmissionId(subId);
      
      if (response.verdict) {
        setResult(response);
        setStatus("COMPLETED");
        setIsSubmitting(false);
        onComplete?.(response);
        return subId;
      }
      
      pollingRef.current = setInterval(() => {
        pollStatus(subId);
      }, pollingInterval);
      
      await pollStatus(subId);
      
      return subId;
    } catch (err) {
      setError((err as Error).message);
      setIsSubmitting(false);
      return null;
    } finally {
      submitGuardRef.current = false;
    }
  }, [pollStatus, pollingInterval, onComplete]);

  const reset = useCallback(() => {
    stopPolling();
    setSubmissionId(null);
    setStatus(null);
    setResult(null);
    setIsSubmitting(false);
    setError(null);
  }, [stopPolling]);

  useEffect(() => {
    return () => stopPolling();
  }, [stopPolling]);

  return {
    submissionId,
    status,
    result,
    isSubmitting,
    error,
    submit,
    reset,
  };
}

export function getVerdictInfo(verdict: Verdict): { label: string; color: string; description: string } {
  const verdicts: Record<Verdict, { label: string; color: string; description: string }> = {
    AC: { label: "Accepted", color: "text-success", description: "Your solution passed all test cases!" },
    WA: { label: "Wrong Answer", color: "text-destructive", description: "Your output doesn't match the expected result." },
    TLE: { label: "Time Limit Exceeded", color: "text-warning", description: "Your solution took too long to execute." },
    MLE: { label: "Memory Limit Exceeded", color: "text-warning", description: "Your solution used too much memory." },
    RE: { label: "Runtime Error", color: "text-destructive", description: "Your code crashed during execution." },
    CE: { label: "Compilation Error", color: "text-destructive", description: "Your code failed to compile." },
  };
  
  return verdicts[verdict];
}

export function getStatusInfo(status: SubmissionStatus): { label: string; step: number } {
  const statuses: Record<SubmissionStatus, { label: string; step: number }> = {
    PENDING: { label: "Judging...", step: 1 },
    COMPLETED: { label: "Completed", step: 2 },
  };
  
  return statuses[status] || { label: status, step: 0 };
}
```

## src/hooks/useSubmissionHistory.ts
```ts
import { useQuery } from "@tanstack/react-query";
import { submissionApi, SubmissionHistoryItem, Verdict } from "@/lib/api";

interface UseSubmissionHistoryOptions {
  problemId: string;
  enabled?: boolean;
}

export function useSubmissionHistory({ problemId, enabled = true }: UseSubmissionHistoryOptions) {
  return useQuery({
    queryKey: ["submissionHistory", problemId],
    queryFn: () => submissionApi.getHistory(problemId),
    enabled: enabled && !!problemId,
    refetchOnWindowFocus: false,
  });
}

export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString();
}

export function getExecutionTime(submission: SubmissionHistoryItem): number | undefined {
  return submission.executionTime ?? submission.runtime;
}

export function getCompactVerdictInfo(verdict?: Verdict): { 
  label: string; 
  shortLabel: string;
  className: string;
} {
  if (!verdict) {
    return { label: "Pending", shortLabel: "...", className: "text-muted-foreground" };
  }

  const verdicts: Record<Verdict, { label: string; shortLabel: string; className: string }> = {
    AC: { label: "Accepted", shortLabel: "AC", className: "text-success bg-success/10" },
    WA: { label: "Wrong Answer", shortLabel: "WA", className: "text-destructive bg-destructive/10" },
    TLE: { label: "Time Limit Exceeded", shortLabel: "TLE", className: "text-warning bg-warning/10" },
    MLE: { label: "Memory Limit Exceeded", shortLabel: "MLE", className: "text-warning bg-warning/10" },
    RE: { label: "Runtime Error", shortLabel: "RE", className: "text-destructive bg-destructive/10" },
    CE: { label: "Compilation Error", shortLabel: "CE", className: "text-destructive bg-destructive/10" },
  };

  return verdicts[verdict];
}
```

## src/hooks/useAIHint.ts
```ts
import { useState, useCallback, useRef } from "react";
import { streamAIHint, ApiError } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

interface UseAIHintOptions {
  problemId: string;
}

export function useAIHint({ problemId }: UseAIHintOptions) {
  const [hint, setHint] = useState<string>("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [level, setLevel] = useState(1);
  const cleanupRef = useRef<(() => void) | null>(null);

  const startHintStream = useCallback((hintLevel: number = level) => {
    if (cleanupRef.current) {
      cleanupRef.current();
    }

    setHint("");
    setError(null);
    setIsStreaming(true);
    setLevel(hintLevel);

    cleanupRef.current = streamAIHint({
      problemId,
      level: hintLevel,
      onChunk: (text) => {
        setHint((prev) => prev + text);
      },
      onComplete: () => {
        setIsStreaming(false);
        cleanupRef.current = null;
      },
      onError: (err) => {
        if (err instanceof ApiError && err.status === 404) {
          const message = "AI Service is offline (Controller Missing).";
          setError(message);
          toast({
            title: "AI Service Unavailable",
            description: message,
            variant: "destructive",
          });
        } else {
          setError(err.message);
        }
        setIsStreaming(false);
        cleanupRef.current = null;
      },
    });
  }, [problemId, level]);

  const stopStream = useCallback(() => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
    setIsStreaming(false);
  }, []);

  const clearHint = useCallback(() => {
    setHint("");
    setError(null);
  }, []);

  const nextHintLevel = useCallback(() => {
    if (level < 3) {
      startHintStream(level + 1);
    }
  }, [level, startHintStream]);

  return {
    hint,
    isStreaming,
    error,
    level,
    startHintStream,
    stopStream,
    clearHint,
    nextHintLevel,
    maxLevel: 3,
  };
}
```

## src/hooks/useCodePersistence.ts
```ts
import { useState, useEffect, useCallback, useRef } from "react";

const STORAGE_KEY_PREFIX = "gusion_code_";
const DEBOUNCE_MS = 1000;

interface SavedCode {
  code: string;
  language: string;
  savedAt: string;
}

function getStorageKey(problemId: string, language: string): string {
  return `${STORAGE_KEY_PREFIX}${problemId}_${language}`;
}

export function useCodePersistence(problemId: string, language: string) {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const loadSavedCode = useCallback((): SavedCode | null => {
    if (!problemId || !language) return null;
    
    try {
      const saved = localStorage.getItem(getStorageKey(problemId, language));
      if (saved) {
        return JSON.parse(saved) as SavedCode;
      }
    } catch (error) {
      console.warn("Failed to load saved code:", error);
    }
    return null;
  }, [problemId, language]);

  const saveCode = useCallback((code: string) => {
    if (!problemId || !code.trim()) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    setIsSaving(true);

    saveTimeoutRef.current = setTimeout(() => {
      try {
        const data: SavedCode = {
          code,
          language,
          savedAt: new Date().toISOString(),
        };
        localStorage.setItem(getStorageKey(problemId, language), JSON.stringify(data));
        setLastSaved(new Date());
      } catch (error) {
        console.warn("Failed to save code:", error);
      } finally {
        setIsSaving(false);
      }
    }, DEBOUNCE_MS);
  }, [problemId, language]);

  const clearSavedCode = useCallback(() => {
    if (!problemId || !language) return;
    
    try {
      localStorage.removeItem(getStorageKey(problemId, language));
      setLastSaved(null);
    } catch (error) {
      console.warn("Failed to clear saved code:", error);
    }
  }, [problemId, language]);

  const hasSavedCode = useCallback((starterCode: string): boolean => {
    const saved = loadSavedCode();
    return saved !== null && saved.code !== starterCode;
  }, [loadSavedCode]);

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, []);

  return {
    loadSavedCode,
    saveCode,
    clearSavedCode,
    hasSavedCode,
    lastSaved,
    isSaving,
  };
}

export function formatSaveTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);

  if (diffSecs < 5) return "Just now";
  if (diffSecs < 60) return `${diffSecs}s ago`;
  
  const diffMins = Math.floor(diffSecs / 60);
  if (diffMins < 60) return `${diffMins}m ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  return `${diffHours}h ago`;
}
```

## src/hooks/use-mobile.tsx
```tsx
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
```

## src/hooks/use-toast.ts
```ts
import * as React from "react";

import type { ToastActionElement, ToastProps } from "@/components/ui/toast";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | { type: ActionType["ADD_TOAST"]; toast: ToasterToast }
  | { type: ActionType["UPDATE_TOAST"]; toast: Partial<ToasterToast> }
  | { type: ActionType["DISMISS_TOAST"]; toastId?: ToasterToast["id"] }
  | { type: ActionType["REMOVE_TOAST"]; toastId?: ToasterToast["id"] };

interface State {
  toasts: ToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) return;

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({ type: "REMOVE_TOAST", toastId });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return { ...state, toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT) };
    case "UPDATE_TOAST":
      return { ...state, toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)) };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => addToRemoveQueue(toast.id));
      }
      return { ...state, toasts: state.toasts.map((t) => (t.id === toastId || toastId === undefined ? { ...t, open: false } : t)) };
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) return { ...state, toasts: [] };
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.toastId) };
  }
};

const listeners: Array<(state: State) => void> = [];
let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

type Toast = Omit<ToasterToast, "id">;

function toast({ ...props }: Toast) {
  const id = genId();
  const update = (props: ToasterToast) => dispatch({ type: "UPDATE_TOAST", toast: { ...props, id } });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: { ...props, id, open: true, onOpenChange: (open) => { if (!open) dismiss(); } },
  });

  return { id, dismiss, update };
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) listeners.splice(index, 1);
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { useToast, toast };
```

## src/pages/Index.tsx
```tsx
import { Link } from "react-router-dom";
import { Zap, Code, Brain, Trophy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function Index() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-neon-purple/10 blur-[150px]" />
        <div className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-neon-cyan/10 blur-[150px]" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <nav className="relative z-10 border-b border-border/50 bg-background/50 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-neon">
              <Zap className="h-5 w-5 text-background" />
            </div>
            <span className="text-xl font-bold text-gradient">Gusion</span>
          </Link>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button className="btn-neon text-foreground">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" className="text-muted-foreground hover:text-foreground">Sign In</Button>
                </Link>
                <Link to="/auth">
                  <Button className="btn-neon text-foreground">Get Started</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      <section className="relative z-10 container mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass-bg/50 px-4 py-2 backdrop-blur-sm">
            <Brain className="h-4 w-4 text-neon-cyan" />
            <span className="text-sm text-muted-foreground">AI-Powered Learning</span>
          </div>

          <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
            Master Algorithms with{" "}
            <span className="text-gradient">AI Guidance</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Gusion is an intelligent online judge that doesn't just tell you if your code is wrong
            — it helps you understand <span className="text-foreground">why</span> and{" "}
            <span className="text-foreground">how to fix it</span>.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link to="/auth">
              <Button size="lg" className="btn-neon min-w-[200px] text-foreground">
                Start Coding
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="min-w-[200px] border-glass-border bg-glass-bg/50 hover:bg-glass-bg"
              >
                Browse Problems
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 container mx-auto px-4 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="glass-card-hover p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-neon-purple/20">
              <Code className="h-6 w-6 text-neon-purple" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Full IDE Experience</h3>
            <p className="text-muted-foreground">
              Write code in a professional Monaco editor with syntax highlighting, auto-completion,
              and support for Java, Python, JavaScript, C++, and more.
            </p>
          </div>

          <div className="glass-card-hover p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-neon-cyan/20">
              <Brain className="h-6 w-6 text-neon-cyan" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">AI Mentor</h3>
            <p className="text-muted-foreground">
              Get intelligent feedback on wrong answers. Our AI analyzes your code and provides
              hints without spoiling the solution.
            </p>
          </div>

          <div className="glass-card-hover p-8">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-neon-pink/20">
              <Trophy className="h-6 w-6 text-neon-pink" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">Real-Time Verdicts</h3>
            <p className="text-muted-foreground">
              Watch your submission progress through compilation and testing with animated status
              updates and detailed results.
            </p>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-border/50 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <span className="font-bold text-gradient">Gusion</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Gusion. AI-Powered Online Judge.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
```

## src/pages/Auth.tsx
```tsx
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Mail, Lock, User, Zap, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = loginSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormData = z.infer<typeof loginSchema>;
type SignupFormData = z.infer<typeof signupSchema>;

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const { login, signup, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || "/dashboard";

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { email: "", password: "", name: "", confirmPassword: "" },
  });

  const handleLogin = async (data: LoginFormData) => {
    const success = await login({ email: data.email, password: data.password });
    if (success) {
      navigate(from, { replace: true });
    }
  };

  const handleSignup = async (data: SignupFormData) => {
    const success = await signup({
      email: data.email,
      password: data.password,
      name: data.name,
    });
    if (success) {
      navigate(from, { replace: true });
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    loginForm.reset();
    signupForm.reset();
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-neon-purple/10 blur-[120px]" />
        <div className="absolute -bottom-1/4 -right-1/4 h-1/2 w-1/2 rounded-full bg-neon-cyan/10 blur-[120px]" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative w-full max-w-md">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-neon neon-glow-purple">
            <Zap className="h-8 w-8 text-background" />
          </div>
          <h1 className="text-3xl font-bold text-gradient">Gusion</h1>
          <p className="mt-2 text-muted-foreground">AI-Powered Online Judge</p>
        </div>

        <div className="glass-card gradient-border p-8">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {mode === "login"
                ? "Enter your credentials to continue"
                : "Sign up to start your coding journey"}
            </p>
          </div>

          {mode === "login" ? (
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            placeholder="you@example.com"
                            className="border-glass-border bg-glass-bg/50 pl-10 focus:border-primary focus:ring-primary"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="border-glass-border bg-glass-bg/50 pl-10 pr-10 focus:border-primary focus:ring-primary"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="btn-neon w-full text-foreground" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                <FormField
                  control={signupForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            placeholder="John Doe"
                            className="border-glass-border bg-glass-bg/50 pl-10 focus:border-primary focus:ring-primary"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            placeholder="you@example.com"
                            className="border-glass-border bg-glass-bg/50 pl-10 focus:border-primary focus:ring-primary"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="border-glass-border bg-glass-bg/50 pl-10 pr-10 focus:border-primary focus:ring-primary"
                            {...field}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={signupForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="border-glass-border bg-glass-bg/50 pl-10 focus:border-primary focus:ring-primary"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="btn-neon w-full text-foreground" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
            </Form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="font-medium text-primary hover:underline"
              >
                {mode === "login" ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## src/pages/Dashboard.tsx
```tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { LayoutGrid, List, Search, Loader2, AlertCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { problemsApi, normalizeProblem, Problem } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

type ViewMode = "cards" | "table";
type DifficultyFilter = "ALL" | "EASY" | "MEDIUM" | "HARD";

const STORAGE_KEY = "gusion_dashboard_view";

export default function Dashboard() {
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return (stored as ViewMode) || "cards";
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<DifficultyFilter>("ALL");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, viewMode);
  }, [viewMode]);

  const { data: problemsData, isLoading, error } = useQuery({
    queryKey: ["problems"],
    queryFn: () => problemsApi.getAll(),
  });

  const problems = problemsData?.content?.map(normalizeProblem) || [];

  const filteredProblems = problems.filter((problem) => {
    const matchesSearch =
      problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      problem.slug.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty =
      difficultyFilter === "ALL" || problem.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gradient">Problem Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            Practice coding problems and improve your skills with AI-powered feedback
          </p>
        </div>

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-glass-border bg-glass-bg/50 pl-10"
              />
            </div>

            <Select
              value={difficultyFilter}
              onValueChange={(value) => setDifficultyFilter(value as DifficultyFilter)}
            >
              <SelectTrigger className="w-32 border-glass-border bg-glass-bg/50">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent className="glass-card border-glass-border">
                <SelectItem value="ALL">All</SelectItem>
                <SelectItem value="EASY">Easy</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HARD">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-glass-border bg-glass-bg/50 p-1">
            <Button
              variant={viewMode === "cards" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("cards")}
              className={viewMode === "cards" ? "bg-primary" : ""}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
              className={viewMode === "table" ? "bg-primary" : ""}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {isLoading && (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading problems...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-center">
              <AlertCircle className="h-12 w-12 text-destructive" />
              <div>
                <h3 className="text-lg font-semibold">Failed to load problems</h3>
                <p className="text-muted-foreground">Please check your connection and try again.</p>
              </div>
              <Button onClick={() => window.location.reload()}>Retry</Button>
            </div>
          </div>
        )}

        {!isLoading && !error && (
          <>
            {filteredProblems.length === 0 ? (
              <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-muted-foreground">No problems found matching your criteria.</p>
              </div>
            ) : viewMode === "cards" ? (
              <ProblemCards problems={filteredProblems} />
            ) : (
              <ProblemTable problems={filteredProblems} />
            )}
          </>
        )}
      </div>
    </Layout>
  );
}

function DifficultyBadge({ difficulty }: { difficulty: Problem["difficulty"] }) {
  const variants: Record<Problem["difficulty"], string> = {
    EASY: "badge-easy",
    MEDIUM: "badge-medium",
    HARD: "badge-hard",
  };

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[difficulty]}`}>
      {difficulty.charAt(0) + difficulty.slice(1).toLowerCase()}
    </span>
  );
}

function ProblemCards({ problems }: { problems: ReturnType<typeof normalizeProblem>[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {problems.map((problem, index) => (
        <Link
          key={problem.id || problem.slug}
          to={`/problem/${problem.slug}`}
          className="glass-card-hover group p-6"
        >
          <div className="mb-4 flex items-start justify-between">
            <span className="text-sm text-muted-foreground">#{index + 1}</span>
            <DifficultyBadge difficulty={problem.difficulty} />
          </div>

          <h3 className="mb-2 text-lg font-semibold transition-colors group-hover:text-primary">
            {problem.title}
          </h3>

          <div className="mt-4 flex flex-wrap gap-2">
            {problem.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-muted/50 text-xs">{tag}</Badge>
            ))}
            {problem.tags.length > 3 && (
              <Badge variant="secondary" className="bg-muted/50 text-xs">+{problem.tags.length - 3}</Badge>
            )}
          </div>

          {problem.acceptanceRate !== undefined && (
            <div className="mt-4 text-sm text-muted-foreground">
              Acceptance: {problem.acceptanceRate.toFixed(1)}%
            </div>
          )}
        </Link>
      ))}
    </div>
  );
}

function ProblemTable({ problems }: { problems: ReturnType<typeof normalizeProblem>[] }) {
  return (
    <div className="glass-card overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-glass-border hover:bg-transparent">
            <TableHead className="w-16">#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className="w-24">Difficulty</TableHead>
            <TableHead className="hidden md:table-cell">Tags</TableHead>
            <TableHead className="w-24 hidden sm:table-cell">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {problems.map((problem, index) => (
            <TableRow
              key={problem.id || problem.slug}
              className="border-glass-border transition-colors hover:bg-muted/30"
            >
              <TableCell className="font-mono text-muted-foreground">{index + 1}</TableCell>
              <TableCell>
                <Link
                  to={`/problem/${problem.slug}`}
                  className="font-medium transition-colors hover:text-primary"
                >
                  {problem.title}
                </Link>
              </TableCell>
              <TableCell>
                <DifficultyBadge difficulty={problem.difficulty} />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex flex-wrap gap-1">
                  {problem.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-muted/50 text-xs">{tag}</Badge>
                  ))}
                  {problem.tags.length > 2 && (
                    <span className="text-xs text-muted-foreground">+{problem.tags.length - 2}</span>
                  )}
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <span className="text-muted-foreground">—</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
```

## src/pages/Arena.tsx
```tsx
import { useState, useEffect, useRef, forwardRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import MonacoEditor from "@/components/arena/MonacoEditor";
import {
  Play, Send, RotateCcw, Lightbulb, ChevronLeft, Loader2, AlertCircle,
  CheckCircle2, XCircle, Clock, Cpu, X, Sparkles, Save, Cloud,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { problemsApi, normalizeProblem, TestCase } from "@/lib/api";
import { useSubmission, getVerdictInfo, getStatusInfo } from "@/hooks/useSubmission";
import { useAIHint } from "@/hooks/useAIHint";
import { useRunCode } from "@/hooks/useRunCode";
import { useCodePersistence, formatSaveTime } from "@/hooks/useCodePersistence";
import { SubmissionHistory } from "@/components/arena/SubmissionHistory";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  ResizableHandle, ResizablePanel, ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const SUPPORTED_LANGUAGES = [
  { value: "JAVA", label: "Java", monaco: "java" },
  { value: "PYTHON", label: "Python", monaco: "python" },
  { value: "JAVASCRIPT", label: "JavaScript", monaco: "javascript" },
  { value: "TYPESCRIPT", label: "TypeScript", monaco: "typescript" },
  { value: "CPP", label: "C++", monaco: "cpp" },
  { value: "GO", label: "Go", monaco: "go" },
];

const LANGUAGE_TEMPLATES: Record<string, string> = {
  "JAVA": `import java.util.*;
import java.io.*;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        solve(scanner);
    }

    // ✅ WRITE YOUR LOGIC HERE
    public static void solve(Scanner scanner) {
        // TODO: Read input using 'scanner' and print output
        
    }
}`,

  "PYTHON": `import sys

# ✅ WRITE YOUR LOGIC HERE
def solve():
    # TODO: Read input from sys.stdin and print output
    pass

if __name__ == "__main__":
    solve()`,

  "CPP": `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

// ✅ WRITE YOUR LOGIC HERE
void solve() {
    // TODO: Read input using cin and print output
    
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    solve();
    return 0;
}`
};

export default function Arena() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [language, setLanguage] = useState("JAVA");
  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState<"input" | "output" | "verdict">("input");
  const [showHintPanel, setShowHintPanel] = useState(false);
  const [customInput, setCustomInput] = useState("1 2");

  const { data: problem, isLoading, error } = useQuery({
    queryKey: ["problem", slug],
    queryFn: () => problemsApi.getBySlug(slug!),
    enabled: !!slug,
  });

  const normalizedProblem = problem ? normalizeProblem(problem) : null;

  useEffect(() => {
    if (problem?.examples?.[0]?.input) {
      setCustomInput(problem.examples[0].input);
    }
  }, [problem]);

  const { hint, isStreaming, error: hintError, level, startHintStream, stopStream, nextHintLevel, maxLevel } = useAIHint({
    problemId: problem?.id || "",
  });

  const submission = useSubmission({
    onComplete: (result) => {
      setActiveTab("verdict");
      if (problem?.id) {
        queryClient.invalidateQueries({ queryKey: ["submissionHistory", problem.id] });
      }
      if (result.verdict === "WA") {
        setShowHintPanel(true);
      }
    },
  });

  const runCode = useRunCode();
  const codePersistence = useCodePersistence(problem?.id || "", language);

  const isMac = typeof navigator !== "undefined" && navigator.platform.toUpperCase().indexOf("MAC") >= 0;
  const modKey = isMac ? "⌘" : "Ctrl";

  useEffect(() => {
    if (!problem) return;

    const saved = codePersistence.loadSavedCode();
    if (saved && saved.language === language && saved.code.trim().length > 0) {
      setCode(saved.code);
      return;
    }

    if (problem.starterCode) {
      const starter = problem.starterCode[language] || problem.starterCode[language.toLowerCase()];
      if (starter && starter.trim()) {
        setCode(starter);
        return;
      }
    }

    const langKey = language.toUpperCase();
    const template = LANGUAGE_TEMPLATES[langKey];
    
    if (template) {
      setCode(template);
    } else {
      setCode(`// No starter code available for ${language}`);
    }
  }, [problem, language]);

  useEffect(() => {
    if (code && problem?.id) {
      codePersistence.saveCode(code);
    }
  }, [code, problem?.id]);

  const runningRef = useRef(false);
  const submittingRef = useRef(false);

  const handleRun = async () => {
    if (!problem?.id || !code.trim() || runningRef.current) return;
    runningRef.current = true;
    setActiveTab("output");
    try {
      await runCode.run(problem.id, language, code, customInput);
    } finally {
      runningRef.current = false;
    }
  };

  const handleSubmit = async () => {
    if (!problem?.id || !code.trim() || submittingRef.current) return;
    submittingRef.current = true;
    setActiveTab("verdict");
    runCode.reset();
    try {
      await submission.submit(problem.id, language, code);
    } finally {
      submittingRef.current = false;
    }
  };

  const handleReset = () => {
    if (problem?.starterCode) {
      const langKey = language.toLowerCase();
      setCode(problem.starterCode[langKey] || problem.starterCode[language] || "");
      codePersistence.clearSavedCode();
    }
    submission.reset();
    runCode.reset();
  };

  const handleGetHint = () => {
    setShowHintPanel(true);
    if (!hint && !isStreaming) {
      startHintStream(1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMod = isMac ? e.metaKey : e.ctrlKey;
      
      if (isMod && e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (!runCode.isRunning && !submission.isSubmitting) handleRun();
      }
      
      if (isMod && e.shiftKey && e.key === "Enter") {
        e.preventDefault();
        if (!submission.isSubmitting && !runCode.isRunning) handleSubmit();
      }
      
      if (isMod && e.key === "h") {
        e.preventDefault();
        handleGetHint();
      }
      
      if (e.key === "Escape" && showHintPanel) {
        e.preventDefault();
        setShowHintPanel(false);
        stopStream();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMac, showHintPanel, runCode.isRunning, submission.isSubmitting, problem?.id, code, language]);

  if (isLoading) {
    return (
      <Layout showFooter={false}>
        <div className="flex h-[calc(100vh-64px)] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (error || !normalizedProblem) {
    return (
      <Layout showFooter={false}>
        <div className="flex h-[calc(100vh-64px)] flex-col items-center justify-center gap-4">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <h2 className="text-xl font-semibold">Problem not found</h2>
          <Button onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showFooter={false}>
      <div className="h-[calc(100vh-64px)]">
        <div className="hidden h-full md:block">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={40} minSize={25}>
              <ProblemPanel problem={normalizedProblem} onBack={() => navigate("/dashboard")} />
            </ResizablePanel>

            <ResizableHandle className="w-2 bg-border/50 hover:bg-primary/50 transition-colors" />

            <ResizablePanel defaultSize={60} minSize={35}>
              <div className="flex h-full flex-col">
                <EditorToolbar
                  language={language}
                  onLanguageChange={setLanguage}
                  onRun={handleRun}
                  onSubmit={handleSubmit}
                  onReset={handleReset}
                  onHint={handleGetHint}
                  isSubmitting={submission.isSubmitting}
                  isRunning={runCode.isRunning}
                  modKey={modKey}
                  isSaving={codePersistence.isSaving}
                  lastSaved={codePersistence.lastSaved}
                />

                <div className="flex-1 border-b border-border">
                  <MonacoEditor
                    height="100%"
                    language={SUPPORTED_LANGUAGES.find((l) => l.value === language)?.monaco || "java"}
                    value={code}
                    onChange={(value) => setCode(value || "")}
                    theme="vs-dark"
                    options={{
                      fontSize: 14,
                      fontFamily: "'JetBrains Mono', monospace",
                      minimap: { enabled: false },
                      padding: { top: 16 },
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                    }}
                  />
                </div>

                <ConsolePanel
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                  customInput={customInput}
                  onCustomInputChange={setCustomInput}
                  submission={submission}
                  output={runCode.output}
                  runError={runCode.error}
                  isRunning={runCode.isRunning}
                />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        <div className="flex h-full flex-col md:hidden">
          <ScrollArea className="flex-1">
            <ProblemPanel problem={normalizedProblem} onBack={() => navigate("/dashboard")} />
          </ScrollArea>

          <div className="border-t border-border">
            <EditorToolbar
              language={language}
              onLanguageChange={setLanguage}
              onRun={handleRun}
              onSubmit={handleSubmit}
              onReset={handleReset}
              onHint={handleGetHint}
              isSubmitting={submission.isSubmitting}
              isRunning={runCode.isRunning}
              modKey={modKey}
              isSaving={codePersistence.isSaving}
              lastSaved={codePersistence.lastSaved}
              compact
            />
          </div>

          <div className="h-64 border-t border-border">
            <MonacoEditor
              height="100%"
              language={SUPPORTED_LANGUAGES.find((l) => l.value === language)?.monaco || "java"}
              value={code}
              onChange={(value) => setCode(value || "")}
              theme="vs-dark"
              options={{
                fontSize: 13,
                fontFamily: "'JetBrains Mono', monospace",
                minimap: { enabled: false },
                padding: { top: 8 },
                scrollBeyondLastLine: false,
              }}
            />
          </div>

          <div className="h-48 border-t border-border">
            <ConsolePanel
              activeTab={activeTab}
              onTabChange={setActiveTab}
              customInput={customInput}
              onCustomInputChange={setCustomInput}
              submission={submission}
              output={runCode.output}
              runError={runCode.error}
              isRunning={runCode.isRunning}
              compact
            />
          </div>
        </div>

        {showHintPanel && (
          <HintPanel
            hint={hint}
            isStreaming={isStreaming}
            error={hintError}
            level={level}
            maxLevel={maxLevel}
            onClose={() => {
              setShowHintPanel(false);
              stopStream();
            }}
            onNextLevel={nextHintLevel}
            onRetry={() => startHintStream(level)}
          />
        )}
      </div>
    </Layout>
  );
}

function ProblemPanel({
  problem,
  onBack,
}: {
  problem: ReturnType<typeof normalizeProblem>;
  onBack: () => void;
}) {
  const difficultyClass = {
    EASY: "badge-easy",
    MEDIUM: "badge-medium",
    HARD: "badge-hard",
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6">
        <button
          onClick={onBack}
          className="mb-4 flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Problems
        </button>

        <div className="mb-6">
          <div className="mb-2 flex items-center gap-3">
            <h1 className="text-2xl font-bold">{problem.title}</h1>
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${difficultyClass[problem.difficulty]}`}>
              {problem.difficulty.charAt(0) + problem.difficulty.slice(1).toLowerCase()}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {problem.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-muted/50">{tag}</Badge>
            ))}
          </div>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="mb-6 text-foreground/90 leading-relaxed whitespace-pre-wrap">
            {problem.description || "No description available."}
          </div>

          {problem.examples && problem.examples.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-3 text-lg font-semibold">Examples</h3>
              {problem.examples.map((example, idx) => (
                <div key={idx} className="mb-4 rounded-lg bg-muted/30 p-4">
                  <div className="mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Input:</span>
                    <pre className="mt-1 rounded bg-background/50 p-2 text-sm font-mono">{example.input}</pre>
                  </div>
                  <div className="mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Output:</span>
                    <pre className="mt-1 rounded bg-background/50 p-2 text-sm font-mono">{example.output}</pre>
                  </div>
                  {example.explanation && (
                    <div>
                      <span className="text-sm font-medium text-muted-foreground">Explanation:</span>
                      <p className="mt-1 text-sm text-foreground/80">{example.explanation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {problem.constraints && problem.constraints.length > 0 && (
            <div>
              <h3 className="mb-3 text-lg font-semibold">Constraints</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80">
                {problem.constraints.map((constraint, idx) => (
                  <li key={idx} className="font-mono">{constraint}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </ScrollArea>
  );
}

function KbdBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <kbd className={cn(
      "ml-1.5 hidden rounded bg-muted/50 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-block",
      className
    )}>
      {children}
    </kbd>
  );
}

interface EditorToolbarProps {
  language: string;
  onLanguageChange: (lang: string) => void;
  onRun: () => void;
  onSubmit: () => void;
  onReset: () => void;
  onHint: () => void;
  isSubmitting: boolean;
  isRunning: boolean;
  modKey: string;
  isSaving?: boolean;
  lastSaved?: Date | null;
  compact?: boolean;
}

const EditorToolbar = forwardRef<HTMLDivElement, EditorToolbarProps>(({
  language, onLanguageChange, onRun, onSubmit, onReset, onHint,
  isSubmitting, isRunning, modKey, isSaving = false, lastSaved = null, compact = false,
}, ref) => {
  return (
    <div ref={ref} className={cn("flex items-center justify-between border-b border-border bg-card/50 px-4", compact ? "py-2" : "py-3")}>
      <div className="flex items-center gap-3">
        <Select value={language} onValueChange={onLanguageChange}>
          <SelectTrigger className="w-32 border-glass-border bg-glass-bg/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="glass-card border-glass-border">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        {!compact && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {isSaving ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Saving...</span>
              </>
            ) : lastSaved ? (
              <>
                <Cloud className="h-3 w-3 text-success" />
                <span>Saved {formatSaveTime(lastSaved)}</span>
              </>
            ) : null}
          </div>
        )}

        {!compact && LANGUAGE_TEMPLATES[language] && (
          <span className="text-xs text-muted-foreground italic">
            Main is pre-configured. Focus on <code className="text-neon-cyan">solve()</code>
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size={compact ? "sm" : "default"} onClick={onHint}
          className="text-neon-cyan hover:text-neon-cyan hover:bg-neon-cyan/10">
          <Lightbulb className="h-4 w-4 mr-1" />
          {!compact && "Hint"}
          {!compact && <KbdBadge>{modKey}+H</KbdBadge>}
        </Button>

        <Button variant="ghost" size={compact ? "sm" : "default"} onClick={onReset}>
          <RotateCcw className="h-4 w-4 mr-1" />
          {!compact && "Reset"}
        </Button>

        <Button variant="outline" size={compact ? "sm" : "default"} onClick={onRun}
          disabled={isRunning || isSubmitting}
          className="border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan">
          {isRunning ? (
            <>
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              {!compact && "Running..."}
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-1" />
              {!compact && "Run"}
              {!compact && <KbdBadge>{modKey}+↵</KbdBadge>}
            </>
          )}
        </Button>

        <Button size={compact ? "sm" : "default"} onClick={onSubmit}
          disabled={isSubmitting || isRunning} className="btn-neon text-foreground">
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-1 animate-spin" />
              {!compact && "Submitting..."}
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-1" />
              {!compact && "Submit"}
              {!compact && <KbdBadge className="bg-primary/20">{modKey}+⇧+↵</KbdBadge>}
            </>
          )}
        </Button>
      </div>
    </div>
  );
});

interface ConsolePanelProps {
  activeTab: "input" | "output" | "verdict";
  onTabChange: (tab: "input" | "output" | "verdict") => void;
  customInput: string;
  onCustomInputChange: (value: string) => void;
  submission: ReturnType<typeof useSubmission>;
  output: string | null;
  runError: string | null;
  isRunning: boolean;
  compact?: boolean;
}

const ConsolePanel = forwardRef<HTMLDivElement, ConsolePanelProps>(({
  activeTab, onTabChange, customInput, onCustomInputChange,
  submission, output, runError, isRunning, compact = false,
}, ref) => {
  return (
    <div ref={ref} className={cn("flex flex-col bg-card/30", compact ? "h-full" : "h-48")}>
      <Tabs value={activeTab} onValueChange={(v) => onTabChange(v as "input" | "output" | "verdict")} className="flex h-full flex-col">
        <TabsList className="h-10 w-full justify-start rounded-none border-b border-border bg-transparent px-2">
          <TabsTrigger value="input" className="data-[state=active]:bg-muted">Input</TabsTrigger>
          <TabsTrigger value="output" className="data-[state=active]:bg-muted">
            Output
            {output && !isRunning && <CheckCircle2 className="ml-1.5 h-3 w-3 text-success" />}
          </TabsTrigger>
          <TabsTrigger value="verdict" className="data-[state=active]:bg-muted">
            Verdict
            {submission.result?.verdict && (
              submission.result.verdict === "AC" 
                ? <CheckCircle2 className="ml-1.5 h-3 w-3 text-success" />
                : <XCircle className="ml-1.5 h-3 w-3 text-destructive" />
            )}
          </TabsTrigger>
        </TabsList>

        <ScrollArea className="flex-1">
          <TabsContent value="input" className="m-0 h-full">
            <textarea
              value={customInput}
              onChange={(e) => onCustomInputChange(e.target.value)}
              placeholder="Enter your custom input here..."
              className="h-full w-full resize-none bg-background p-4 font-mono text-sm focus:outline-none"
              spellCheck={false}
            />
          </TabsContent>

          <TabsContent value="output" className="m-0 p-4">
            <OutputDisplay output={output} error={runError} isRunning={isRunning} />
          </TabsContent>

          <TabsContent value="verdict" className="m-0 p-4">
            <VerdictDisplay submission={submission} />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
});

const OutputDisplay = forwardRef<HTMLDivElement, { output: string | null; error: string | null; isRunning: boolean }>(({ output, error, isRunning }, ref) => {
  if (isRunning) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Running...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-destructive">
          <XCircle className="h-5 w-5" />
          <span className="font-medium">Error</span>
        </div>
        <pre className="rounded-lg bg-destructive/10 p-3 text-sm font-mono text-destructive overflow-x-auto whitespace-pre-wrap">{error}</pre>
      </div>
    );
  }

  if (!output) {
    return <p className="text-sm text-muted-foreground">Click "Run" to execute your code with the custom input.</p>;
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-success">
        <CheckCircle2 className="h-5 w-5" />
        <span className="font-medium">Output</span>
      </div>
      <pre className="rounded-lg bg-muted/30 p-3 text-sm font-mono overflow-x-auto whitespace-pre-wrap">{output}</pre>
    </div>
  );
});
OutputDisplay.displayName = "OutputDisplay";

const VerdictDisplay = forwardRef<HTMLDivElement, { submission: ReturnType<typeof useSubmission> }>(({ submission }, ref) => {
  const { status, result, isSubmitting, error } = submission;

  if (error) {
    return (
      <div className="flex items-center gap-2 text-destructive">
        <XCircle className="h-5 w-5" />
        <span>{error}</span>
      </div>
    );
  }

  if (!status && !isSubmitting) {
    return <p className="text-sm text-muted-foreground">Submit your code to see the verdict.</p>;
  }

  const steps = ["QUEUED", "COMPILING", "RUNNING", "COMPLETED"] as const;
  const currentStep = status ? getStatusInfo(status).step : 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {steps.map((step, idx) => {
          const isActive = idx === currentStep && status !== "COMPLETED";
          const isComplete = idx < currentStep || status === "COMPLETED";
          
          return (
            <div key={step} className="flex items-center gap-2">
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-medium transition-all",
                isComplete ? "bg-success text-success-foreground"
                  : isActive ? "bg-primary text-primary-foreground animate-pulse"
                  : "bg-muted text-muted-foreground"
              )}>
                {isComplete ? <CheckCircle2 className="h-4 w-4" />
                  : isActive ? <Loader2 className="h-4 w-4 animate-spin" />
                  : idx + 1}
              </div>
              {idx < steps.length - 1 && (
                <div className={cn("h-0.5 w-8 transition-colors", isComplete ? "bg-success" : "bg-muted")} />
              )}
            </div>
          );
        })}
      </div>

      {result && result.verdict && (
        <div className={cn(
          "rounded-lg border p-4",
          result.verdict === "AC" ? "border-success/30 bg-success/10" : "border-destructive/30 bg-destructive/10"
        )}>
          <div className="flex items-center gap-3">
            {result.verdict === "AC" ? (
              <CheckCircle2 className="h-8 w-8 text-success" />
            ) : (
              <XCircle className="h-8 w-8 text-destructive" />
            )}
            <div>
              <h3 className={cn("text-lg font-semibold", getVerdictInfo(result.verdict).color)}>
                {getVerdictInfo(result.verdict).label}
              </h3>
              <p className="text-sm text-muted-foreground">
                {getVerdictInfo(result.verdict).description}
              </p>
            </div>
          </div>

          {(result.runtime !== undefined || result.memory !== undefined) && (
            <div className="mt-4 flex gap-6 text-sm">
              {result.runtime !== undefined && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{result.runtime} ms</span>
                </div>
              )}
              {result.memory !== undefined && (
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-muted-foreground" />
                  <span>{(result.memory / 1024).toFixed(1)} MB</span>
                </div>
              )}
            </div>
          )}

          {result.failedTestCase && (
            <div className="mt-4 rounded-lg bg-destructive/10 p-3">
              <h4 className="mb-2 text-sm font-medium text-destructive">Failed Test Case</h4>
              <div className="space-y-1 text-sm font-mono">
                <div><span className="text-muted-foreground">Input: </span>{result.failedTestCase.input}</div>
                <div><span className="text-muted-foreground">Expected: </span>{result.failedTestCase.expected}</div>
                <div><span className="text-muted-foreground">Your Output: </span>{result.failedTestCase.actual}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
});
VerdictDisplay.displayName = "VerdictDisplay";

function HintPanel({
  hint, isStreaming, error, level, maxLevel, onClose, onNextLevel, onRetry,
}: {
  hint: string; isStreaming: boolean; error: string | null; level: number;
  maxLevel: number; onClose: () => void; onNextLevel: () => void; onRetry: () => void;
}) {
  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 max-w-[calc(100vw-32px)]">
      <div className="glass-card gradient-border overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between border-b border-glass-border bg-glass-bg/80 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-neon">
              <Sparkles className="h-4 w-4 text-background" />
            </div>
            <div>
              <h3 className="font-semibold text-gradient">AI Mentor</h3>
              <p className="text-xs text-muted-foreground">Hint Level {level}/{maxLevel}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="h-64 p-4">
          {error ? (
            <div className="flex flex-col items-center gap-3 py-4 text-center">
              <AlertCircle className="h-8 w-8 text-destructive" />
              <p className="text-sm text-muted-foreground">{error}</p>
              <Button size="sm" onClick={onRetry}>Try Again</Button>
            </div>
          ) : hint ? (
            <div className="prose prose-sm prose-invert max-w-none">
              <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
                {hint}
                {isStreaming && <span className="animate-pulse">▊</span>}
              </p>
            </div>
          ) : isStreaming ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Thinking...</span>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Click to get a hint from AI Mentor.</p>
          )}
        </ScrollArea>

        {hint && !isStreaming && level < maxLevel && (
          <div className="border-t border-glass-border bg-glass-bg/50 px-4 py-3">
            <Button size="sm" variant="outline" onClick={onNextLevel} className="w-full">
              <Lightbulb className="h-4 w-4 mr-2" />
              Get More Help (Level {level + 1})
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
```

## src/pages/Leaderboard.tsx
```tsx
import { useQuery } from "@tanstack/react-query";
import { Trophy, Medal, Award, Loader2, AlertCircle, Users } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { leaderboardApi } from "@/lib/api";
import { cn } from "@/lib/utils";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function Leaderboard() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => leaderboardApi.getLeaderboard(0, 50),
  });

  const entries = data?.content || [];

  const getRankDisplay = (rank: number) => {
    if (rank === 1) return <div className="flex items-center justify-center"><Trophy className="h-5 w-5 text-yellow-500" /></div>;
    if (rank === 2) return <div className="flex items-center justify-center"><Medal className="h-5 w-5 text-gray-400" /></div>;
    if (rank === 3) return <div className="flex items-center justify-center"><Award className="h-5 w-5 text-amber-600" /></div>;
    return <span className="text-muted-foreground font-mono">{rank}</span>;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-neon">
              <Trophy className="h-6 w-6 text-background" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gradient">Leaderboard</h1>
              <p className="text-muted-foreground">Top coders ranked by problems solved</p>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground">Loading leaderboard...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-center">
              <AlertCircle className="h-12 w-12 text-destructive" />
              <div>
                <h3 className="text-lg font-semibold">Failed to load leaderboard</h3>
                <p className="text-muted-foreground">Please check your connection and try again.</p>
              </div>
              <Button onClick={() => refetch()}>Retry</Button>
            </div>
          </div>
        )}

        {!isLoading && !error && entries.length === 0 && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-center">
              <Users className="h-12 w-12 text-muted-foreground/50" />
              <div>
                <h3 className="text-lg font-semibold">No rankings yet</h3>
                <p className="text-muted-foreground">Be the first to solve problems and appear on the leaderboard!</p>
              </div>
            </div>
          </div>
        )}

        {!isLoading && !error && entries.length > 0 && (
          <div className="glass-card overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-glass-border hover:bg-transparent">
                  <TableHead className="w-20 text-center">Rank</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead className="text-center">Problems Solved</TableHead>
                  {entries[0]?.totalSubmissions !== undefined && (
                    <TableHead className="text-center hidden sm:table-cell">Total Submissions</TableHead>
                  )}
                  {entries[0]?.acceptanceRate !== undefined && (
                    <TableHead className="text-center hidden md:table-cell">Acceptance Rate</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {entries.map((entry, index) => {
                  const rank = entry.rank || index + 1;
                  const isTopThree = rank <= 3;
                  
                  return (
                    <TableRow
                      key={entry.email}
                      className={cn(
                        "border-glass-border transition-colors",
                        isTopThree ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/30"
                      )}
                    >
                      <TableCell className="text-center">{getRankDisplay(rank)}</TableCell>
                      <TableCell>
                        <div>
                          <div className={cn("font-medium", isTopThree && "text-primary")}>
                            {entry.name || entry.email.split("@")[0]}
                          </div>
                          <div className="text-xs text-muted-foreground">{entry.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={cn(
                          "inline-flex items-center justify-center rounded-full px-3 py-1 text-sm font-semibold",
                          isTopThree ? "bg-primary/20 text-primary" : "bg-muted text-foreground"
                        )}>
                          {entry.problemsSolved}
                        </span>
                      </TableCell>
                      {entry.totalSubmissions !== undefined && (
                        <TableCell className="text-center text-muted-foreground hidden sm:table-cell">
                          {entry.totalSubmissions}
                        </TableCell>
                      )}
                      {entry.acceptanceRate !== undefined && (
                        <TableCell className="text-center hidden md:table-cell">
                          <span className={cn(
                            "text-sm",
                            entry.acceptanceRate >= 70 ? "text-success"
                              : entry.acceptanceRate >= 40 ? "text-warning"
                              : "text-muted-foreground"
                          )}>
                            {entry.acceptanceRate.toFixed(1)}%
                          </span>
                        </TableCell>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            
            {data && data.totalElements > entries.length && (
              <div className="border-t border-glass-border px-4 py-3 text-center text-sm text-muted-foreground">
                Showing top {entries.length} of {data.totalElements} users
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
```

## src/pages/NotFound.tsx
```tsx
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">Return to Home</a>
      </div>
    </div>
  );
};

export default NotFound;
```

## src/pages/admin/ProblemManager.tsx
```tsx
import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Plus, Trash2, Eye, EyeOff, Loader2, Save, ChevronRight, FileCode,
  TestTube, AlertCircle, Pencil, Upload, FileJson, X,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import {
  problemsApi, CreateProblemRequest, CreateTestCaseRequest, Problem, TestCase,
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

function generateSlug(title: string): string {
  return title.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}

type FormMode = "create" | "edit" | null;

export default function ProblemManager() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const isAdmin = user?.role === "ADMIN" || true;

  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [formMode, setFormMode] = useState<FormMode>(null);

  const { data: problemsData, isLoading: loadingProblems } = useQuery({
    queryKey: ["admin-problems"],
    queryFn: () => problemsApi.getAll(0, 100),
  });

  const deleteProblemMutation = useMutation({
    mutationFn: (problemId: string) => problemsApi.delete(problemId),
    onSuccess: () => {
      toast({ title: "Problem Deleted" });
      setSelectedProblem(null);
      queryClient.invalidateQueries({ queryKey: ["admin-problems"] });
    },
    onError: (error: Error) => {
      toast({ title: "Failed to Delete", description: error.message, variant: "destructive" });
    },
  });

  if (!isAdmin) {
    return (
      <Layout>
        <div className="container mx-auto flex h-[60vh] items-center justify-center">
          <div className="text-center">
            <AlertCircle className="mx-auto h-16 w-16 text-destructive" />
            <h1 className="mt-4 text-2xl font-bold">Access Denied</h1>
            <p className="mt-2 text-muted-foreground">You don't have permission to access the admin panel.</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gradient">Problem Manager</h1>
            <p className="mt-1 text-muted-foreground">Create and manage coding problems and test cases</p>
          </div>
          <Button onClick={() => { setFormMode("create"); setSelectedProblem(null); }} className="btn-neon text-foreground">
            <Plus className="mr-2 h-4 w-4" />
            Add Problem
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="glass-card border-glass-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCode className="h-5 w-5 text-primary" />
                Problems ({problemsData?.content?.length || 0})
              </CardTitle>
              <CardDescription>Select a problem to manage its test cases</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                {loadingProblems ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : (
                  <div className="space-y-2">
                    {problemsData?.content?.map((problem) => (
                      <ProblemListItem
                        key={problem.id}
                        problem={problem}
                        isSelected={selectedProblem?.id === problem.id}
                        onSelect={() => { setSelectedProblem(problem); setFormMode(null); }}
                        onEdit={() => { setSelectedProblem(problem); setFormMode("edit"); }}
                        onDelete={() => deleteProblemMutation.mutate(problem.id)}
                        isDeleting={deleteProblemMutation.isPending}
                      />
                    ))}
                    {(!problemsData?.content || problemsData.content.length === 0) && (
                      <p className="py-8 text-center text-muted-foreground">No problems yet. Create your first one!</p>
                    )}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
          </Card>

          {formMode === "create" ? (
            <ProblemForm mode="create" onSuccess={(problem) => { setFormMode(null); setSelectedProblem(problem); queryClient.invalidateQueries({ queryKey: ["admin-problems"] }); }} onCancel={() => setFormMode(null)} />
          ) : formMode === "edit" && selectedProblem ? (
            <ProblemForm mode="edit" problem={selectedProblem} onSuccess={(problem) => { setFormMode(null); setSelectedProblem(problem); queryClient.invalidateQueries({ queryKey: ["admin-problems"] }); }} onCancel={() => setFormMode(null)} />
          ) : selectedProblem ? (
            <TestCaseManager problem={selectedProblem} />
          ) : (
            <Card className="glass-card border-glass-border flex items-center justify-center">
              <div className="py-16 text-center">
                <TestTube className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">Select a problem to manage test cases</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}

function ProblemListItem({ problem, isSelected, onSelect, onEdit, onDelete, isDeleting }: {
  problem: Problem; isSelected: boolean; onSelect: () => void; onEdit: () => void; onDelete: () => void; isDeleting: boolean;
}) {
  const difficultyClass = { EASY: "badge-easy", MEDIUM: "badge-medium", HARD: "badge-hard" };

  return (
    <div className={cn("rounded-lg border p-3 transition-all", isSelected ? "border-primary bg-primary/10" : "border-glass-border bg-glass-bg/30 hover:bg-glass-bg/50")}>
      <div className="flex items-start justify-between gap-2">
        <button onClick={onSelect} className="flex-1 text-left">
          <h3 className="font-medium">{problem.title || problem.slug}</h3>
          <p className="mt-1 text-xs text-muted-foreground font-mono">/{problem.slug}</p>
        </button>
        <div className="flex items-center gap-1">
          <Badge className={difficultyClass[problem.difficulty]}>{problem.difficulty}</Badge>
          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); onEdit(); }}>
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:text-destructive" onClick={(e) => e.stopPropagation()}>
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Problem?</AlertDialogTitle>
                <AlertDialogDescription>This will permanently delete "{problem.title || problem.slug}" and all its test cases.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete} disabled={isDeleting} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                  {isDeleting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      {problem.tags && problem.tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {problem.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>
      )}
    </div>
  );
}

function ProblemForm({ mode, problem, onSuccess, onCancel }: {
  mode: "create" | "edit"; problem?: Problem; onSuccess: (problem: Problem) => void; onCancel: () => void;
}) {
  const { toast } = useToast();
  const [title, setTitle] = useState(problem?.title || "");
  const [description, setDescription] = useState(problem?.description || "");
  const [difficulty, setDifficulty] = useState<"EASY" | "MEDIUM" | "HARD">(problem?.difficulty || "EASY");
  const [tags, setTags] = useState(problem?.tags?.join(", ") || "");
  const [cpuLimit, setCpuLimit] = useState("2000");
  const [memoryLimit, setMemoryLimit] = useState("256000");
  const [starterCode, setStarterCode] = useState(problem?.starterCode?.java || "");
  const [starterLang, setStarterLang] = useState("java");

  const slug = mode === "create" ? generateSlug(title) : problem?.slug || "";

  const createMutation = useMutation({
    mutationFn: (data: CreateProblemRequest) => problemsApi.create(data),
    onSuccess: (newProblem) => { toast({ title: "Problem Created", description: `Created "${newProblem.title}"` }); onSuccess(newProblem); },
    onError: (error: Error) => { toast({ title: "Failed to Create", description: error.message, variant: "destructive" }); },
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<CreateProblemRequest>) => problemsApi.update(problem!.id, data),
    onSuccess: (updatedProblem) => { toast({ title: "Problem Updated", description: `Updated "${updatedProblem.title}"` }); onSuccess(updatedProblem); },
    onError: (error: Error) => { toast({ title: "Failed to Update", description: error.message, variant: "destructive" }); },
  });

  const isPending = createMutation.isPending || updateMutation.isPending;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast({ title: "Validation Error", description: "Title and description are required", variant: "destructive" });
      return;
    }

    const starterCodeObj: Record<string, string> = {};
    if (starterCode.trim()) starterCodeObj[starterLang] = starterCode;

    const data = {
      title: title.trim(),
      slug: mode === "create" ? slug : undefined,
      description: description.trim(),
      difficulty,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      cpuLimit: parseInt(cpuLimit) || 2000,
      memoryLimit: parseInt(memoryLimit) || 256000,
      starterCode: Object.keys(starterCodeObj).length > 0 ? starterCodeObj : undefined,
    };

    if (mode === "create") createMutation.mutate(data as CreateProblemRequest);
    else updateMutation.mutate(data);
  };

  return (
    <Card className="glass-card border-glass-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {mode === "create" ? <Plus className="h-5 w-5 text-neon-cyan" /> : <Pencil className="h-5 w-5 text-neon-purple" />}
          {mode === "create" ? "Create New Problem" : "Edit Problem"}
        </CardTitle>
        <CardDescription>
          {mode === "create" ? "Fill in the details to create a new coding problem" : `Editing: ${problem?.title || problem?.slug}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Merge Sort" className="bg-glass-bg/50 border-glass-border" />
            {slug && <p className="text-xs text-muted-foreground">Slug: <code className="rounded bg-muted px-1">{slug}</code>{mode === "edit" && " (read-only)"}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (Markdown)</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Problem description with examples..." rows={6} className="bg-glass-bg/50 border-glass-border font-mono text-sm" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>Difficulty</Label>
              <Select value={difficulty} onValueChange={(v) => setDifficulty(v as typeof difficulty)}>
                <SelectTrigger className="bg-glass-bg/50 border-glass-border"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="EASY">Easy</SelectItem>
                  <SelectItem value="MEDIUM">Medium</SelectItem>
                  <SelectItem value="HARD">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input id="tags" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Array, Sorting, Divide & Conquer" className="bg-glass-bg/50 border-glass-border" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="cpuLimit">CPU Limit (ms)</Label>
              <Input id="cpuLimit" type="number" value={cpuLimit} onChange={(e) => setCpuLimit(e.target.value)} className="bg-glass-bg/50 border-glass-border" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="memoryLimit">Memory Limit (KB)</Label>
              <Input id="memoryLimit" type="number" value={memoryLimit} onChange={(e) => setMemoryLimit(e.target.value)} className="bg-glass-bg/50 border-glass-border" />
            </div>
          </div>

          <Collapsible>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <ChevronRight className="mr-2 h-4 w-4 transition-transform [[data-state=open]>&]:rotate-90" />
                Starter Code (Optional)
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 pt-2">
              <Select value={starterLang} onValueChange={setStarterLang}>
                <SelectTrigger className="w-32 bg-glass-bg/50 border-glass-border"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-background border-border">
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                </SelectContent>
              </Select>
              <Textarea value={starterCode} onChange={(e) => setStarterCode(e.target.value)} placeholder="public class Solution { ... }" rows={8} className="bg-glass-bg/50 border-glass-border font-mono text-sm" />
            </CollapsibleContent>
          </Collapsible>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="ghost" onClick={onCancel} disabled={isPending}>Cancel</Button>
            <Button type="submit" className="btn-neon text-foreground flex-1" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {mode === "create" ? "Creating..." : "Saving..."}
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  {mode === "create" ? "Create Problem" : "Save Changes"}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function TestCaseManager({ problem }: { problem: Problem }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [bulkImportText, setBulkImportText] = useState("");
  const [testCases, setTestCases] = useState<Array<{
    id?: string; input: string; expectedOutput: string; hidden: boolean; isNew?: boolean;
  }>>([]);

  const { data: fetchedTestCases, isLoading: loadingTestCases } = useQuery({
    queryKey: ["test-cases", problem.id],
    queryFn: () => problemsApi.getTestCases(problem.id),
    enabled: !!problem.id,
  });

  useEffect(() => {
    if (fetchedTestCases) {
      setTestCases(fetchedTestCases.map((tc, idx) => ({
        id: `tc-${idx}`, input: tc.input, expectedOutput: tc.output, hidden: tc.hidden || false,
      })));
    }
  }, [fetchedTestCases]);

  const addTestCaseMutation = useMutation({
    mutationFn: (data: CreateTestCaseRequest) => problemsApi.addTestCase(problem.id, data),
    onSuccess: () => { toast({ title: "Test Case Added" }); queryClient.invalidateQueries({ queryKey: ["test-cases", problem.id] }); },
    onError: (error: Error) => { toast({ title: "Failed to Add Test Case", description: error.message, variant: "destructive" }); },
  });

  const deleteTestCaseMutation = useMutation({
    mutationFn: (testCaseId: string) => problemsApi.deleteTestCase(problem.id, testCaseId),
    onSuccess: () => { toast({ title: "Test Case Deleted" }); queryClient.invalidateQueries({ queryKey: ["test-cases", problem.id] }); },
    onError: (error: Error) => { toast({ title: "Failed to Delete Test Case", description: error.message, variant: "destructive" }); },
  });

  const addNewTestCase = () => {
    setTestCases([...testCases, { input: "", expectedOutput: "", hidden: false, isNew: true }]);
  };

  const updateTestCase = (index: number, field: string, value: string | boolean) => {
    const updated = [...testCases];
    updated[index] = { ...updated[index], [field]: value };
    setTestCases(updated);
  };

  const removeTestCase = (index: number) => {
    const tc = testCases[index];
    if (tc.isNew) setTestCases(testCases.filter((_, i) => i !== index));
  };

  const saveTestCase = (index: number) => {
    const tc = testCases[index];
    if (!tc.input.trim() || !tc.expectedOutput.trim()) {
      toast({ title: "Validation Error", description: "Input and expected output are required", variant: "destructive" });
      return;
    }
    addTestCaseMutation.mutate({ input: tc.input.trim(), expectedOutput: tc.expectedOutput.trim(), hidden: tc.hidden });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => { setBulkImportText(event.target?.result as string); setShowBulkImport(true); };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const processBulkImport = async () => {
    try {
      let parsed: Array<{ input: string; expectedOutput?: string; expected_output?: string; output?: string; hidden?: boolean }>;
      try { parsed = JSON.parse(bulkImportText); } catch {
        const lines = bulkImportText.trim().split("\n");
        const hasHeader = lines[0]?.toLowerCase().includes("input");
        const dataLines = hasHeader ? lines.slice(1) : lines;
        parsed = dataLines.map((line) => {
          const parts = line.split(",").map((p) => p.trim());
          return { input: parts[0] || "", expectedOutput: parts[1] || "", hidden: parts[2]?.toLowerCase() === "true" };
        });
      }

      if (!Array.isArray(parsed) || parsed.length === 0) throw new Error("Invalid format");

      let added = 0;
      for (const tc of parsed) {
        const expectedOutput = tc.expectedOutput || tc.expected_output || tc.output || "";
        if (tc.input && expectedOutput) {
          await problemsApi.addTestCase(problem.id, { input: tc.input, expectedOutput, hidden: tc.hidden || false });
          added++;
        }
      }

      toast({ title: "Bulk Import Complete", description: `Added ${added} test cases` });
      setShowBulkImport(false);
      setBulkImportText("");
      queryClient.invalidateQueries({ queryKey: ["test-cases", problem.id] });
    } catch (error) {
      toast({ title: "Import Failed", description: "Invalid JSON or CSV format.", variant: "destructive" });
    }
  };

  return (
    <>
      <Card className="glass-card border-glass-border">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5 text-neon-purple" />
                Test Cases
              </CardTitle>
              <CardDescription>Managing test cases for: <strong>{problem.title || problem.slug}</strong></CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <input ref={fileInputRef} type="file" accept=".json,.csv,.txt" onChange={handleFileUpload} className="hidden" />
              <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()}>
                <Upload className="mr-1 h-4 w-4" />Import
              </Button>
              <Button size="sm" onClick={addNewTestCase} variant="outline">
                <Plus className="mr-1 h-4 w-4" />Add
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[450px]">
            {loadingTestCases ? (
              <div className="flex items-center justify-center py-8"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
            ) : testCases.length === 0 ? (
              <div className="py-12 text-center">
                <TestTube className="mx-auto h-10 w-10 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">No test cases yet</p>
                <div className="mt-4 flex justify-center gap-2">
                  <Button size="sm" onClick={addNewTestCase}><Plus className="mr-1 h-4 w-4" />Add Test Case</Button>
                  <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()}><Upload className="mr-1 h-4 w-4" />Bulk Import</Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {testCases.map((tc, index) => (
                  <div key={tc.id || index} className="rounded-lg border border-glass-border bg-glass-bg/30 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Test Case #{index + 1}</span>
                        {tc.hidden ? (
                          <Badge variant="secondary" className="text-xs"><EyeOff className="mr-1 h-3 w-3" />Hidden</Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs"><Eye className="mr-1 h-3 w-3" />Visible</Badge>
                        )}
                        {tc.isNew && <Badge className="bg-neon-cyan/20 text-neon-cyan text-xs">New</Badge>}
                      </div>
                      <div className="flex items-center gap-1">
                        {tc.isNew && (
                          <Button size="sm" variant="ghost" onClick={() => saveTestCase(index)} disabled={addTestCaseMutation.isPending} className="text-success hover:text-success">
                            <Save className="h-4 w-4" />
                          </Button>
                        )}
                        {tc.isNew ? (
                          <Button size="sm" variant="ghost" onClick={() => removeTestCase(index)} className="text-destructive hover:text-destructive">
                            <X className="h-4 w-4" />
                          </Button>
                        ) : (
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="ghost" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Test Case?</AlertDialogTitle>
                                <AlertDialogDescription>This will permanently delete test case #{index + 1}.</AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => tc.id && deleteTestCaseMutation.mutate(tc.id)} disabled={deleteTestCaseMutation.isPending} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Input</Label>
                        <Textarea value={tc.input} onChange={(e) => updateTestCase(index, "input", e.target.value)} placeholder={"5\n1 2 3 4 5"} rows={3} className="bg-background/50 border-border font-mono text-sm" disabled={!tc.isNew} />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">Expected Output</Label>
                        <Textarea value={tc.expectedOutput} onChange={(e) => updateTestCase(index, "expectedOutput", e.target.value)} placeholder="15" rows={2} className="bg-background/50 border-border font-mono text-sm" disabled={!tc.isNew} />
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox id={`hidden-${index}`} checked={tc.hidden} onCheckedChange={(checked) => updateTestCase(index, "hidden", !!checked)} disabled={!tc.isNew} />
                        <Label htmlFor={`hidden-${index}`} className="text-sm cursor-pointer">Hidden test case (used for grading, not shown to users)</Label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>

      <Dialog open={showBulkImport} onOpenChange={setShowBulkImport}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2"><FileJson className="h-5 w-5" />Bulk Import Test Cases</DialogTitle>
            <DialogDescription>Paste or edit JSON/CSV content below. Expected formats:</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="rounded-lg bg-muted p-3">
                <p className="font-semibold mb-1">JSON Format:</p>
                <pre className="text-muted-foreground overflow-auto">{`[
  {"input": "5", "expectedOutput": "120", "hidden": false},
  {"input": "10", "expectedOutput": "3628800", "hidden": true}
]`}</pre>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <p className="font-semibold mb-1">CSV Format:</p>
                <pre className="text-muted-foreground overflow-auto">{`input,expectedOutput,hidden
5,120,false
10,3628800,true`}</pre>
              </div>
            </div>
            <Textarea value={bulkImportText} onChange={(e) => setBulkImportText(e.target.value)} placeholder="Paste JSON or CSV content here..." rows={10} className="font-mono text-sm" />
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowBulkImport(false)}>Cancel</Button>
            <Button onClick={processBulkImport}><Upload className="mr-2 h-4 w-4" />Import Test Cases</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
```
