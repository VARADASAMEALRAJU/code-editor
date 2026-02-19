import { useRef } from "react";

export default function useHistory(initialValue = "") {
  const undoStack = useRef([initialValue]);
  const redoStack = useRef([]);

  const addToHistory = (currentValue) => {
    undoStack.current.push(currentValue);
    redoStack.current = [];
  };

  const undo = (currentValue) => {
    if (undoStack.current.length > 1) {
      const previous = undoStack.current.pop();
      redoStack.current.push(currentValue);
      return undoStack.current[undoStack.current.length - 1];
    }
    return currentValue;
  };

  const redo = (currentValue) => {
    if (redoStack.current.length > 0) {
      const next = redoStack.current.pop();
      undoStack.current.push(currentValue);
      return next;
    }
    return currentValue;
  };

  const getHistorySize = () => undoStack.current.length;

  return {
    addToHistory,
    undo,
    redo,
    getHistorySize,
  };
}
