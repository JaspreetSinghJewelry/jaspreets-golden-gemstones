
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Enhanced error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error; errorInfo?: string }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error('Error boundary caught error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary details:', error, errorInfo);
    this.setState({ errorInfo: errorInfo.componentStack });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh',
          flexDirection: 'column',
          padding: '20px',
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#f9fafb'
        }}>
          <div style={{ 
            maxWidth: '500px', 
            textAlign: 'center',
            backgroundColor: 'white',
            padding: '40px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h1 style={{ color: '#ef4444', marginBottom: '20px' }}>Oops! Something went wrong</h1>
            <p style={{ color: '#6b7280', marginBottom: '30px' }}>
              We're sorry, but there was an error loading the page. Please try refreshing.
            </p>
            <button 
              onClick={() => {
                this.setState({ hasError: false, error: undefined, errorInfo: undefined });
                window.location.reload();
              }}
              style={{
                padding: '12px 24px',
                backgroundColor: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500'
              }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Safe render function with comprehensive error handling
const renderApp = () => {
  try {
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      console.error('Root element not found');
      document.body.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial, sans-serif;">
          <div style="text-align: center;">
            <h1 style="color: #ef4444;">Application Error</h1>
            <p>Root element not found. Please contact support.</p>
          </div>
        </div>
      `;
      return;
    }

    console.log('Starting app render...');
    
    const root = createRoot(rootElement);
    
    root.render(
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    );
    
    console.log('App rendered successfully');
  } catch (error) {
    console.error('Failed to render app:', error);
    
    // Fallback UI
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; height: 100vh; font-family: Arial, sans-serif; background-color: #f9fafb;">
          <div style="text-align: center; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #ef4444; margin-bottom: 20px;">Application Failed to Load</h1>
            <p style="color: #6b7280; margin-bottom: 30px;">There was an error starting the application. Please refresh the page.</p>
            <button onclick="window.location.reload()" style="padding: 12px 24px; background: #dc2626; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px; font-weight: 500;">
              Refresh Page
            </button>
          </div>
        </div>
      `;
    }
  }
};

// Handle uncaught errors
window.addEventListener('error', (event) => {
  console.error('Uncaught error:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

// Initialize the app
renderApp();
