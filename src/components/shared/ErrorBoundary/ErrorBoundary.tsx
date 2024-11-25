import React, { Component, ErrorInfo, ReactNode } from 'react';
import { withTheme, DefaultTheme } from 'styled-components';
import { ErrorContainer } from './ErrorBoundary.styles';
import { logError } from '@/utils/error';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  theme: DefaultTheme;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  resetCondition?: any;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundaryComponent extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to error tracking service
    logError(error, errorInfo);
    
    // Call onError callback if provided
    this.props.onError?.(error, errorInfo);
  }

  public componentDidUpdate(prevProps: Props): void {
    // Reset error state if resetCondition changes
    if (
      this.state.hasError &&
      prevProps.resetCondition !== this.props.resetCondition
    ) {
      this.setState({
        hasError: false,
        error: null,
      });
    }
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <h2>Something went wrong</h2>
          <p>
            We apologize for the inconvenience. Please try refreshing the page or
            contact support if the problem persists.
          </p>
          <button onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export const ErrorBoundary = withTheme(ErrorBoundaryComponent);
export default ErrorBoundary;
