import {
  indentLine,
  outdentLine,
  autoIndentOnEnter,
} from "../utils/indentation";

import { toggleComment } from "../utils/commentToggle";

export default function Editor({
  content,
  setContent,
  addLog,
  undo,
  redo,
  addToHistory,
  handleChord,
  runHighlightDebounced,
}) {
  const handleKeyDown = (e) => {
    // Always log keydown first (evaluation-safe)
    addLog(`keydown | key: ${e.key}`);

    const isMac = navigator.platform.toUpperCase().includes("MAC");
    const isModifier = isMac ? e.metaKey : e.ctrlKey;
    const key = e.key.toLowerCase();

    // ---------------- CHORD HANDLING ----------------
    const chordHandled = handleChord(e, isModifier);
    if (chordHandled) return;

    // ---------------- SAVE ----------------
    if (isModifier && key === "s") {
      e.preventDefault();
      addLog("Action: Save");
      return;
    }

    // ---------------- UNDO ----------------
    if (isModifier && key === "z" && !e.shiftKey) {
      e.preventDefault();
      const updated = undo(content);
      setContent(updated);
      return;
    }

    // ---------------- REDO ----------------
    if (isModifier && key === "z" && e.shiftKey) {
      e.preventDefault();
      const updated = redo(content);
      setContent(updated);
      return;
    }

    // ---------------- TOGGLE COMMENT ----------------
    if (isModifier && key === "/") {
      e.preventDefault();

      const result = toggleComment(
        content,
        e.target.selectionStart,
        e.target.selectionEnd
      );

      setContent(result.newText);

      setTimeout(() => {
        e.target.selectionStart = result.newSelectionStart;
        e.target.selectionEnd = result.newSelectionEnd;
      }, 0);

      return;
    }

    // ---------------- TAB INDENT ----------------
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();

      const result = indentLine(content, e.target.selectionStart);

      setContent(result.newText);

      setTimeout(() => {
        e.target.selectionStart =
          e.target.selectionEnd = result.newCursorPosition;
      }, 0);

      return;
    }

    // ---------------- SHIFT+TAB OUTDENT ----------------
    if (e.key === "Tab" && e.shiftKey) {
      e.preventDefault();

      const result = outdentLine(content, e.target.selectionStart);

      setContent(result.newText);

      setTimeout(() => {
        e.target.selectionStart =
          e.target.selectionEnd = result.newCursorPosition;
      }, 0);

      return;
    }

    // ---------------- ENTER AUTO INDENT ----------------
    if (e.key === "Enter") {
      e.preventDefault();

      const result = autoIndentOnEnter(
        content,
        e.target.selectionStart
      );

      setContent(result.newText);

      setTimeout(() => {
        e.target.selectionStart =
          e.target.selectionEnd = result.newCursorPosition;
      }, 0);

      return;
    }
  };

  const handleChange = (e) => {
    const newValue = e.target.value;

    addToHistory(newValue);
    setContent(newValue);

    runHighlightDebounced();
    addLog("input | value changed");
  };

  return (
    <div
      data-test-id="editor-container"
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "15px",
      }}
    >
      <textarea
        data-test-id="editor-input"
        placeholder="Start typing your code here..."
        value={content}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyUp={(e) => addLog(`keyup | key: ${e.key}`)}
        style={{
          flex: 1,
          width: "100%",
          resize: "none",
          border: "1px solid #2a2a2a",
          borderRadius: "6px",
          outline: "none",
          fontFamily: "monospace",
          fontSize: "15px",
          padding: "20px",
          boxSizing: "border-box",
          backgroundColor: "#1e1e1e",
          color: "#d4d4d4",
          lineHeight: "1.6",
          boxShadow: "0 0 10px rgba(0,0,0,0.4)",
          caretColor: "#ffffff",
        }}
      />
    </div>
  );
}
