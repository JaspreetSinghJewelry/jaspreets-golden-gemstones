
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log("[DEBUG] Entry: main.tsx starting");

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

try {
  createRoot(rootElement).render(<App />);
  console.log("[DEBUG] App rendered successfully");
} catch (error) {
  console.error("[ERROR] Failed to render app:", error);
  rootElement.innerHTML = `
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#fff;font-family:Arial,sans-serif;">
      <h1 style="color:#c00;font-size:2em;margin-bottom:16px;">Application Error</h1>
      <p style="color:#666;margin-bottom:16px;">Failed to load the application</p>
      <button onclick="window.location.reload()" style="padding:8px 16px;background:#007bff;color:white;border:none;border-radius:4px;cursor:pointer;">
        Reload Page
      </button>
    </div>
  `;
}
