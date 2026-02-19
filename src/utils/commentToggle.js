export function toggleComment(text, selectionStart, selectionEnd) {
  const lines = text.split("\n");

  // Find which line cursor is on
  let charCount = 0;
  let startLineIndex = 0;
  let endLineIndex = 0;

  for (let i = 0; i < lines.length; i++) {
    const lineLength = lines[i].length + 1; // +1 for newline

    if (selectionStart >= charCount && selectionStart <= charCount + lineLength) {
      startLineIndex = i;
    }

    if (selectionEnd >= charCount && selectionEnd <= charCount + lineLength) {
      endLineIndex = i;
      break;
    }

    charCount += lineLength;
  }

  // Check if all selected lines already commented
  const allCommented = lines
    .slice(startLineIndex, endLineIndex + 1)
    .every((line) => line.trim().startsWith("//"));

  for (let i = startLineIndex; i <= endLineIndex; i++) {
    if (allCommented) {
      lines[i] = lines[i].replace(/^(\s*)\/\/\s?/, "$1");
    } else {
      lines[i] = "// " + lines[i];
    }
  }

  const newText = lines.join("\n");

  return {
    newText,
    newSelectionStart: selectionStart,
    newSelectionEnd: selectionEnd,
  };
}
