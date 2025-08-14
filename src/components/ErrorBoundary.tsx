import React from 'react';

type State = { hasError: boolean };

export class ErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() { return { hasError: true }; }

  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container">
          <h2>Something went wrong.</h2>
          <p>Try refreshing the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
