import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Loading from '../Loading';
import { ErrorFallback } from './ErrorFallback';

interface SuspenseBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  errorFallback?: React.ComponentType<{ error: Error; resetErrorBoundary: () => void }>;
}

export const SuspenseBoundary: React.FC<SuspenseBoundaryProps> = ({
  children,
  fallback = <Loading />,
  errorFallback = ErrorFallback,
}) => {
  return (
    <ErrorBoundary FallbackComponent={errorFallback}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default SuspenseBoundary;
