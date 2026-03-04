import { useState, useCallback } from "react";
import { apiClient, ApiError } from "@/lib/api";
import { toast } from "@/hooks/use-toast";

export interface AIAnalysisResponse {
  feedback: string;
  complexity: string;
  hintLevel1: string;
  hintLevel2: string;
  hintLevel3: string;
}

interface UseAIHintOptions {
  problemId: string;
}

export function useAIHint({ problemId }: UseAIHintOptions) {
  const [analysis, setAnalysis] = useState<AIAnalysisResponse | null>(null);
  const [revealedLevel, setRevealedLevel] = useState(0); // 0 = only feedback, 1-3 = hint levels
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAnalysis = useCallback(
    async (submissionId: string) => {
      setIsLoading(true);
      setError(null);
      setAnalysis(null);
      setRevealedLevel(0);

      try {
        const data = await apiClient<AIAnalysisResponse>(
          `/api/ai/analysis/${submissionId}`,
          { requiresAuth: true, includeUserId: true }
        );
        setAnalysis(data);
      } catch (err) {
        if (err instanceof ApiError && err.status === 404) {
          const message = "AI Service is offline (Controller Missing).";
          setError(message);
          toast({
            title: "AI Service Unavailable",
            description: message,
            variant: "destructive",
          });
        } else {
          setError((err as Error).message);
        }
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const revealNextLevel = useCallback(() => {
    setRevealedLevel((prev) => Math.min(prev + 1, 3));
  }, []);

  const clearAnalysis = useCallback(() => {
    setAnalysis(null);
    setRevealedLevel(0);
    setError(null);
  }, []);

  return {
    analysis,
    revealedLevel,
    isLoading,
    error,
    fetchAnalysis,
    revealNextLevel,
    clearAnalysis,
    maxLevel: 3,
  };
}
