
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Global root error log if JS totally fails
try {
  console.log("[DEBUG] Entry: main.tsx about to render App");
  createRoot(document.getElementById("root")!).render(<App />);
  console.log("[DEBUG] main.tsx render after root");
} catch (e) {
  const root = document.getElementById("root");
  if (root) {
    root.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#fff;">
        <h1 style="color:#c00;font-size:2em;">Fatal client error!</h1>
        <pre style="color:#600;background:#fee;padding:1em;border-radius:8px;max-width:90vw;overflow:auto;">${e?.toString?.() || "Unknown error"}</pre>
        <div style="color:#888;margin-top:8px;">See your browser console for more info</div>
      </div>
    `;
  }
  // Still throw for upper stack trace but user sees error
  throw e;
}
