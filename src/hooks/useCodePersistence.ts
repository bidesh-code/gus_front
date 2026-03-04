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

  // Load saved code for this problem + language
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

  // Save code to localStorage (debounced)
  const saveCode = useCallback((code: string) => {
    if (!problemId || !code.trim()) return;

    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    setIsSaving(true);

    // Debounce save
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

  // Clear saved code for this problem + language
  const clearSavedCode = useCallback(() => {
    if (!problemId || !language) return;
    
    try {
      localStorage.removeItem(getStorageKey(problemId, language));
      setLastSaved(null);
    } catch (error) {
      console.warn("Failed to clear saved code:", error);
    }
  }, [problemId, language]);

  // Check if there's saved code that differs from starter code
  const hasSavedCode = useCallback((starterCode: string): boolean => {
    const saved = loadSavedCode();
    return saved !== null && saved.code !== starterCode;
  }, [loadSavedCode]);

  // Cleanup timeout on unmount
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

// Format relative time for display
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
