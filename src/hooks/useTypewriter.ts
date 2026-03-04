import { useState, useEffect, useRef } from "react";

interface UseTypewriterOptions {
  text: string;
  speed?: number; // ms per character
  enabled?: boolean;
}

export function useTypewriter({ text, speed = 18, enabled = true }: UseTypewriterOptions) {
  const [displayed, setDisplayed] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const prevTextRef = useRef("");

  useEffect(() => {
    if (!enabled) {
      setDisplayed(text);
      setIsTyping(false);
      return;
    }

    // If text changed, animate the new portion
    const prev = prevTextRef.current;
    if (text === prev) return;

    // If text is a continuation (starts with prev), only animate the new part
    const startFrom = text.startsWith(prev) ? prev.length : 0;
    if (startFrom === 0) {
      setDisplayed("");
    }

    setIsTyping(true);
    let idx = startFrom;

    const interval = setInterval(() => {
      idx++;
      setDisplayed(text.slice(0, idx));
      if (idx >= text.length) {
        clearInterval(interval);
        setIsTyping(false);
        prevTextRef.current = text;
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, enabled]);

  return { displayed, isTyping };
}
