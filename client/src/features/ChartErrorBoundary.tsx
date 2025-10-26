import React from 'react';

class ChartErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Chart Error:', error);
    console.error('Error Info:', errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex-1 bg-white p-6 rounded-xl shadow-2xl min-h-0 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-red-600 mb-2">
              チャートの読み込みに失敗しました
            </h3>
            <p className="text-gray-600 mb-4">
              {this.state.error?.message || 'Unknown error occurred'}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: undefined })}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              再試行
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ChartErrorBoundary;
