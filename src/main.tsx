
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add error handling for the root element
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Root element not found');
}

// Add global error handler
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

try {
  const root = createRoot(rootElement);
  root.render(<App />);
} catch (error) {
  console.error('Error rendering app:', error);
  // Fallback content
  rootElement.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column; font-family: Arial, sans-serif;">
      <h1 style="color: #001c39; margin-bottom: 1rem;">Jaspreet Singh Jewelry</h1>
      <p style="color: #666;">Loading application...</p>
    </div>
  `;
}
