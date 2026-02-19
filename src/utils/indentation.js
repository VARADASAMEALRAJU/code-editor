// Add two spaces at cursor position
export function indentLine(text, cursorPosition) {
  const newText =
    text.slice(0, cursorPosition) + "  " + text.slice(cursorPosition);

  return {
    newText,
    newCursorPosition: cursorPosition + 2,
  };
}


// Remove two spaces from start of current line (if present)
export function outdentLine(text, cursorPosition) {
  const lines = text.split("\n");

  let charCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const lineLength = lines[i].length + 1; // +1 for \n

    if (cursorPosition <= charCount + lineLength) {
      if (lines[i].startsWith("  ")) {
        lines[i] = lines[i].slice(2);

        return {
          newText: lines.join("\n"),
          newCursorPosition: Math.max(cursorPosition - 2, 0),
        };
      }
      break;
    }

    charCount += lineLength;
  }

  return { newText: text, newCursorPosition: cursorPosition };
}


// Auto indent on Enter
export function autoIndentOnEnter(text, cursorPosition) {
  const beforeCursor = text.slice(0, cursorPosition);
  const afterCursor = text.slice(cursorPosition);

  const lines = beforeCursor.split("\n");
  const currentLine = lines[lines.length - 1];

  const indentMatch = currentLine.match(/^\s+/);
  const indentation = indentMatch ? indentMatch[0] : "";

  const newText =
    beforeCursor + "\n" + indentation + afterCursor;

  const newCursorPosition =
    cursorPosition + 1 + indentation.length;

  return {
    newText,
    newCursorPosition,
  };
}
