import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-xl);
  background: var(--bg-primary);
  color: var(--text-primary);
  text-align: center;
`;

const ErrorTitle = styled.h1`
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin-bottom: var(--space-lg);
  color: var(--error);
`;

const ErrorMessage = styled.p`
  font-size: var(--font-md);
  margin-bottom: var(--space-xl);
  color: var(--text-secondary);
  max-width: 600px;
`;

const RetryButton = styled.button`
  background: var(--primary);
  color: var(--bg-primary);
  border: none;
  padding: var(--space-md) var(--space-xl);
  border-radius: var(--radius-full);
  cursor: pointer;
  font-size: var(--font-md);
  transition: var(--transition-normal);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  &:active {
    transform: translateY(0);
  }
`;

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>Oops! Something went wrong</ErrorTitle>
          <ErrorMessage>
            {this.state.error?.message || 'An unexpected error occurred. Please try again.'}
          </ErrorMessage>
          <RetryButton onClick={() => window.location.reload()}>
            Retry
          </RetryButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
