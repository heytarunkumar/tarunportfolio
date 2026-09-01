import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled React Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black text-[#E8DFD8] flex items-center justify-center p-6 font-mono text-xs">
          <div className="max-w-md w-full p-6 border border-red-500/40 bg-[#0A0806] rounded-sm space-y-4 shadow-2xl">
            <div className="flex items-center space-x-2 text-red-400">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span className="font-bold uppercase tracking-widest text-sm">PORTFOLIO APPLICATION EXCEPTION</span>
            </div>
            <p className="text-[#C4B5A5] leading-relaxed">
              An unhandled runtime error occurred during client execution.
            </p>
            <div className="p-3 bg-[#120F0C] border border-[#8C6D4F]/30 text-red-300 text-[11px] overflow-x-auto font-mono">
              {this.state.error?.toString() || 'Unknown runtime error'}
            </div>
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  localStorage.clear();
                  window.location.href = '/';
                }
              }}
              className="w-full py-3 border border-[#D4AF37] bg-[#D4AF37] text-black font-bold uppercase tracking-widest hover:bg-[#E2C054]"
            >
              RESET APPLICATION STATE &amp; RELOAD ↗
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
