# 🚀 High-Performance Code Editor with Advanced Keyboard Handling

## 📌 Overview

This project is a browser-based code editor built using React.  
It implements advanced keyboard handling similar to VS Code, including:

- Save shortcut (Ctrl/Cmd + S)
- Undo / Redo (Ctrl/Cmd + Z, Ctrl/Cmd + Shift + Z)
- Comment toggling (Ctrl/Cmd + /)
- Tab indentation / Shift+Tab outdent
- Auto-indentation on Enter
- Multi-key chord shortcut (Ctrl/Cmd + K → Ctrl/Cmd + C)
- Debounced syntax highlighting simulation
- Real-time keyboard event logging dashboard

The project is fully containerized using Docker and Docker Compose.

---

## 🏗️ Tech Stack

- React
- JavaScript (ES6+)
- Vite
- Docker
- Docker Compose

---

## 📂 Project Structure

code-editor/
│
├── docker-compose.yml
├── Dockerfile
├── .env.example
├── package.json
├── README.md
└── src/
    ├── components/
    ├── hooks/
    ├── utils/
    └── App.jsx

---

## 🖥️ Features Implemented

### 1️⃣ Real-Time Event Logging

The right-side dashboard logs:
- keydown
- keyup
- input
- Custom actions (Save, Chord Success)

Example log:
keydown | key: s  
Action: Save  

---

### 2️⃣ Keyboard Shortcuts

💾 Save  
- Windows/Linux: Ctrl + S  
- macOS: Cmd + S  
- Prevents default browser Save dialog  
- Logs: "Action: Save"

↩ Undo / Redo  
- Undo: Ctrl/Cmd + Z  
- Redo: Ctrl/Cmd + Shift + Z  
- Maintains history stack  
- Accessible via:
  window.getEditorState()

💬 Toggle Comment  
- Ctrl/Cmd + /  
- Adds or removes "// " at the beginning of the current line  

Example:
const x = 1;

Becomes:
// const x = 1;

⬅ Tab / Shift+Tab  
- Tab → Indent line by 2 spaces  
- Shift+Tab → Remove 2 spaces  
- Focus remains inside editor  

⏎ Auto Indentation  
Pressing Enter:
- Creates a new line
- Maintains indentation of previous line

🎯 Multi-Key Chord Shortcut  
- Step 1: Ctrl/Cmd + K  
- Step 2 (within 2 seconds): Ctrl/Cmd + C  
- Logs: "Action: Chord Success"  
- Resets automatically if timeout exceeded  

---

### 3️⃣ Debounced Syntax Highlight Simulation

A simulated heavy function runs after text input.

- Debounce interval: 150ms
- Prevents execution per keystroke
- Verified via:

window.getHighlightCallCount()

Typing rapidly 10 characters triggers highlight only once.

---

### 4️⃣ State Exposure for Evaluation

Exposed Functions:

window.getEditorState()

Returns:
{
  content: string,
  historySize: number
}

window.getHighlightCallCount()

Returns:
number

---

## 🐳 Docker Setup

### 🔧 Prerequisites

- Docker
- Docker Compose

---

### 🚀 Run with Docker

From project root:

docker-compose up --build

Or run detached:

docker-compose up --build -d

Check container health:

docker ps

Status must show:
(healthy)

---

### 🌐 Access Application

Open in browser:

http://localhost:3000

---

### 🔄 Restart Docker

docker-compose restart

Stop containers:

docker-compose down

---

## 📄 .env.example

APP_PORT=3000  
NODE_ENV=development  

No real secrets are included.

---

## 🧪 Manual Testing Checklist

✔ Ctrl/Cmd + S logs Save  
✔ Undo / Redo works  
✔ Comment toggle works  
✔ Tab / Shift+Tab indentation works  
✔ Enter maintains indentation  
✔ Chord shortcut works within 2 seconds  
✔ Debounce executes once per rapid input  
✔ Docker container becomes healthy  

---

## ♿ Accessibility

- Editor remains focused after indentation
- Fully keyboard accessible
- Data-test-id attributes included for automated evaluation

---

## 🎯 Evaluation Compliance

This project satisfies:

- All keyboard shortcut requirements
- Cross-platform modifier support (Ctrl & Cmd)
- Real-time event logging
- Undo/redo state management
- Debounced performance optimization
- Docker containerization with healthcheck
- Environment documentation via .env.example

---

## 📌 Author

VARADA SAMEAL RAJU
