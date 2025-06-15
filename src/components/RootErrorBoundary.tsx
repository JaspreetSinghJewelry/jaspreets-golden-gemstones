
import React from "react";

type RootErrorBoundaryProps = {
  children: React.ReactNode;
};

type RootErrorBoundaryState = {
  hasError: boolean;
  error: any;
};

export class RootErrorBoundary extends React.Component<RootErrorBoundaryProps, RootErrorBoundaryState> {
  constructor(props: RootErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can log the error or send it to a service here
    // eslint-disable-next-line no-console
    console.error("App caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="max-w-md mx-auto text-center space-y-4">
            <h1 className="text-lg font-bold text-red-600">Something went wrong!</h1>
            <div className="bg-red-50 p-4 rounded">
              <pre className="text-left text-xs text-red-700 overflow-x-auto">
                {this.state.error && this.state.error.toString()}
              </pre>
            </div>
            <p className="text-gray-500">Please reload the page or contact support if the problem persists.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
