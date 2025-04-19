import React from "react";

/**
 * ErrorBoundary component to catch and handle errors gracefully.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {React.ReactElement} ErrorBoundary component
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div
          className="flex flex-col items-center justify-center min-h-[400px] p-4 text-center"
          role="alert"
          aria-live="assertive"
        >
          <h2 className="text-xl font-semibold text-red-600 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">
            We apologize for the inconvenience. Please try refreshing the page
            or contact support if the problem persists.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Refresh Page
          </button>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <div className="mt-8 p-4 bg-gray-100 rounded-md text-left overflow-auto max-w-full">
              <h3 className="text-lg font-semibold mb-2">Error Details:</h3>
              <pre className="text-sm text-red-600 whitespace-pre-wrap">
                {this.state.error.toString()}
              </pre>
              {this.state.errorInfo && (
                <pre className="text-xs text-gray-600 mt-2 whitespace-pre-wrap">
                  {this.state.errorInfo.componentStack}
                </pre>
              )}
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
