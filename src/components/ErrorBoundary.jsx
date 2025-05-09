import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50 dark:bg-blue-1-dark">
          <div className="bg-white dark:bg-blue-2-dark p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-50 mb-4">Something went wrong</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We're sorry, but something went wrong. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-1 text-blue-50 px-4 py-2 rounded-md hover:bg-blue-2 dark:bg-blue-50 dark:text-blue-1-dark dark:hover:bg-blue-200"
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

export default ErrorBoundary; 