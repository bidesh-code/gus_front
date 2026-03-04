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
      
      // Backend uses "COMPLETED", also check for "PENDING"
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

  // Cleanup on unmount
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

// Helper to get verdict display info (maps backend short codes to display info)
export function getVerdictInfo(verdict: Verdict): { label: string; color: string; description: string } {
  const verdicts: Record<Verdict, { label: string; color: string; description: string }> = {
    AC: {
      label: "Accepted",
      color: "text-success",
      description: "Your solution passed all test cases!",
    },
    WA: {
      label: "Wrong Answer",
      color: "text-destructive",
      description: "Your output doesn't match the expected result.",
    },
    TLE: {
      label: "Time Limit Exceeded",
      color: "text-warning",
      description: "Your solution took too long to execute.",
    },
    MLE: {
      label: "Memory Limit Exceeded",
      color: "text-warning",
      description: "Your solution used too much memory.",
    },
    RE: {
      label: "Runtime Error",
      color: "text-destructive",
      description: "Your code crashed during execution.",
    },
    CE: {
      label: "Compilation Error",
      color: "text-destructive",
      description: "Your code failed to compile.",
    },
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
