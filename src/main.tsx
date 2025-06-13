
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

console.log('Starting React application...');

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error('Root element not found');
  throw new Error('Root element not found');
}

try {
  const root = createRoot(rootElement);
  console.log('React root created successfully');
  
  root.render(<App />);
  console.log('App rendered successfully');
} catch (error) {
  console.error('Error rendering app:', error);
  
  // Fallback error display
  if (rootElement) {
    rootElement.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: Arial, sans-serif; color: #e74c3c;">
        <div style="text-align: center; max-width: 400px; padding: 20px;">
          <h1 style="margin-bottom: 20px;">Something went wrong</h1>
          <p style="margin-bottom: 20px;">We're experiencing technical difficulties. Please try refreshing the page.</p>
          <button onclick="window.location.reload()" style="background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;">
            Refresh Page
          </button>
        </div>
      </div>
    `;
  }
}
