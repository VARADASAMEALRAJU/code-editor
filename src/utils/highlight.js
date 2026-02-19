let highlightCallCount = 0;

export function runHighlight() {
  // Simulate expensive computation
  highlightCallCount++;
}

export function getHighlightCallCount() {
  return highlightCallCount;
}

export function resetHighlightCount() {
  highlightCallCount = 0;
}
