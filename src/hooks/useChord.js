import { useRef } from "react";

export default function useChord(onSuccess, timeoutDuration = 2000) {
  const chordActive = useRef(false);
  const timerRef = useRef(null);

  const handleChord = (event, isModifier) => {
    // Step 1: Ctrl+K or Cmd+K
    if (isModifier && event.key === "k") {
      event.preventDefault();

      chordActive.current = true;

      // Clear existing timer
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      // Start 2-second timer
      timerRef.current = setTimeout(() => {
        chordActive.current = false;
      }, timeoutDuration);

      return true;
    }

    // Step 2: Ctrl+C or Cmd+C (if chord active)
    if (chordActive.current && isModifier && event.key === "c") {
      event.preventDefault();

      chordActive.current = false;

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      onSuccess();
      return true;
    }

    return false;
  };

  return handleChord;
}
