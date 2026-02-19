import { useEffect, useRef } from "react";

function EventDashboard({ logs }) {
  const logContainerRef = useRef(null);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop =
        logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div
      ref={logContainerRef}
      data-test-id="event-log-list"
      style={{
        flex: 1,
        overflowY: "auto",
        fontSize: "13px",
        padding: "15px",
        backgroundColor: "#181818",
        borderRadius: "6px",
        border: "1px solid #2a2a2a",
        boxShadow: "inset 0 0 5px rgba(0,0,0,0.4)",
        fontFamily: "monospace",
      }}
    >
      {logs.length === 0 && (
        <div
          style={{
            color: "#666",
            fontStyle: "italic",
            opacity: 0.8,
          }}
        >
          No keyboard events yet...
        </div>
      )}

      {logs.map((log, index) => (
        <div
          key={index}
          data-test-id="event-log-entry"
          style={{
            marginBottom: "8px",
            padding: "6px 8px",
            backgroundColor: "#1f1f1f",
            borderRadius: "4px",
            color: "#9cdcfe",
            wordBreak: "break-word",
            borderLeft: "3px solid #0e639c",
            transition: "background 0.2s ease",
          }}
        >
          {log}
        </div>
      ))}
    </div>
  );
}

export default EventDashboard;
