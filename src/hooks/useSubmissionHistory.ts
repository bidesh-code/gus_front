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

// Helper to format time ago
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

// Helper to get execution time (supports both field names from backend)
export function getExecutionTime(submission: SubmissionHistoryItem): number | undefined {
  return submission.executionTime ?? submission.runtime;
}

// Helper to get compact verdict display
export function getCompactVerdictInfo(verdict?: Verdict): { 
  label: string; 
  shortLabel: string;
  className: string;
} {
  if (!verdict) {
    return { label: "Pending", shortLabel: "...", className: "text-muted-foreground" };
  }

  const verdicts: Record<Verdict, { label: string; shortLabel: string; className: string }> = {
    AC: {
      label: "Accepted",
      shortLabel: "AC",
      className: "text-success bg-success/10",
    },
    WA: {
      label: "Wrong Answer",
      shortLabel: "WA",
      className: "text-destructive bg-destructive/10",
    },
    TLE: {
      label: "Time Limit Exceeded",
      shortLabel: "TLE",
      className: "text-warning bg-warning/10",
    },
    MLE: {
      label: "Memory Limit Exceeded",
      shortLabel: "MLE",
      className: "text-warning bg-warning/10",
    },
    RE: {
      label: "Runtime Error",
      shortLabel: "RE",
      className: "text-destructive bg-destructive/10",
    },
    CE: {
      label: "Compilation Error",
      shortLabel: "CE",
      className: "text-destructive bg-destructive/10",
    },
  };

  return verdicts[verdict];
}
