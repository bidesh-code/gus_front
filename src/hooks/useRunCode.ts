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
