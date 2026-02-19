import { useState, useEffect } from "react";

import Editor from "./components/Editor";
import EventDashboard from "./components/EventDashboard";

import useHistory from "./hooks/useHistory";
import useChord from "./hooks/useChord";
import useDebounce from "./hooks/useDebounce";

import { runHighlight, getHighlightCallCount } from "./utils/highlight";

function App() {
  const [content, setContent] = useState("");
  const [logs, setLogs] = useState([]);

  const {
    addToHistory,
    undo,
    redo,
    getHistorySize,
  } = useHistory("");

  const addLog = (message) => {
    setLogs((prev) => [...prev, message]);
  };

  const runHighlightDebounced = useDebounce(() => {
    runHighlight();
  }, 150);

  const handleChord = useChord(() => {
    addLog("Action: Chord Success");
  });

  useEffect(() => {
    window.getEditorState = () => ({
      content,
      historySize: getHistorySize(),
    });

    window.getHighlightCallCount = () =>
      getHighlightCallCount();
  }, [content, getHistorySize]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#1e1e1e",
        color: "#ffffff",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "12px 20px",
          borderBottom: "1px solid #333",
          fontWeight: "bold",
          fontSize: "14px",
          letterSpacing: "1px",
          backgroundColor: "#111",
        }}
      >
        VARADA SAMEAL RAJU | High-Performance Code Editor
      </div>

      {/* Main Layout */}
      <div style={{ display: "flex", flex: 1 }}>
        {/* Editor Panel */}
        <div
          style={{
            flex: 1,
            padding: "20px",
            borderRight: "1px solid #333",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3 style={{ margin: "0 0 15px 0" }}>Editor</h3>

          <div style={{ flex: 1 }}>
            <Editor
              content={content}
              setContent={setContent}
              addLog={addLog}
              undo={undo}
              redo={redo}
              addToHistory={addToHistory}
              handleChord={handleChord}
              runHighlightDebounced={runHighlightDebounced}
            />
          </div>
        </div>

        {/* Event Dashboard Panel */}
        <div
          data-test-id="event-dashboard"
          style={{
            width: "40%",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3 style={{ margin: "0 0 15px 0" }}>Event Log</h3>

          <div style={{ flex: 1, overflowY: "auto" }}>
            <EventDashboard logs={logs} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
