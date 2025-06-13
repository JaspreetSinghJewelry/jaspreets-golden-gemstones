
import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Error boundary component with proper TypeScript types
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error('Error boundary caught error:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo);
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
          backgroundColor: '#f8f9fa',
          fontFamily: 'Arial, sans-serif'
        }}>
          <h1 style={{ color: '#333', marginBottom: '20px' }}>Something went wrong.</h1>
          <p style={{ color: '#666', marginBottom: '20px', textAlign: 'center' }}>
            We're sorry, but something went wrong. Please try refreshing the page.
          </p>
          <pre style={{ 
            backgroundColor: '#f5f5f5', 
            padding: '10px', 
            borderRadius: '4px', 
            fontSize: '12px', 
            maxWidth: '80%', 
            overflow: 'auto',
            marginBottom: '20px'
          }}>
            {this.state.error?.message || 'Unknown error'}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Function to safely render the app
const renderApp = () => {
  try {
    const rootElement = document.getElementById('root');
    if (!rootElement) {
      console.error('Root element not found');
      return;
    }

    const root = createRoot(rootElement);
    
    root.render(
      <StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StrictMode>
    );
    
    console.log('App rendered successfully');
  } catch (error) {
    console.error('Failed to render app:', error);
    // Fallback rendering without StrictMode
    const rootElement = document.getElementById('root');
    if (rootElement) {
      const root = createRoot(rootElement);
      root.render(<div>Application failed to load. Please refresh the page.</div>);
    }
  }
};

// Render the app
renderApp();
