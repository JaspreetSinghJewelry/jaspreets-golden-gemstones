import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Show loading immediately while app initializes
const showLoading = () => {
  const rootElement = document.getElementById("root");
  if (rootElement && !rootElement.hasChildNodes()) {
    rootElement.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#fff;font-family:Arial,sans-serif;">
        <div style="width:48px;height:48px;border:3px solid #f3f3f3;border-top:3px solid #c8a157;border-radius:50%;animation:spin 1s linear infinite;"></div>
        <p style="color:#666;margin-top:16px;">Loading Jaspreet Singh Jewelry...</p>
        <style>@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}</style>
      </div>
    `;
  }
};

// Show loading immediately
showLoading();

const rootElement = document.getElementById("root");
if (!rootElement) {
  document.body.innerHTML = `<div style="padding:50px;text-align:center;"><h1>Error: Root element not found</h1></div>`;
} else {
  try {
    const root = createRoot(rootElement);
    root.render(<App />);
  } catch (error) {
    console.error("[ERROR] Failed to render app:", error);
    rootElement.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;background:#fff;font-family:Arial,sans-serif;">
        <h1 style="color:#c00;font-size:1.5em;margin-bottom:16px;">Application Error</h1>
        <p style="color:#666;margin-bottom:16px;">Failed to load the application. Please try refreshing.</p>
        <button onclick="window.location.reload()" style="padding:10px 20px;background:#c8a157;color:white;border:none;border-radius:4px;cursor:pointer;font-size:16px;">
          Reload Page
        </button>
      </div>
    `;
  }
}
