
import React from "react";

type Props = {
  children: React.ReactNode;
  label: string;
};
type State = {
  hasError: boolean;
  error: any;
};

export class SectionErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // eslint-disable-next-line no-console
    console.error(`[SectionErrorBoundary - ${this.props.label}]`, error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-100 border border-red-400 rounded p-3 text-xs text-red-900 my-3">
          <div className="font-bold mb-1">Failed to render {this.props.label}</div>
          <pre>
            {this.state.error ? String(this.state.error) : "Unknown error"}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
