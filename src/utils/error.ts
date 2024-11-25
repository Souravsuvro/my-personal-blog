import type { ErrorInfo } from 'react';

interface ErrorMetadata {
  timestamp: string;
  url: string;
  userAgent: string;
  [key: string]: any;
}

/**
 * Log error to error tracking service and console
 */
export const logError = (error: Error, errorInfo?: ErrorInfo): void => {
  const metadata: ErrorMetadata = {
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
    errorInfo,
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.group('Error caught by ErrorBoundary:');
    console.error(error);
    console.info('Error Info:', errorInfo);
    console.info('Metadata:', metadata);
    console.groupEnd();
  }

  // TODO: Send to error tracking service (e.g., Sentry)
  // sendToErrorTrackingService(error, metadata);
};

/**
 * Create a custom error with additional context
 */
export class AppError extends Error {
  public code: string;
  public metadata: Record<string, any>;

  constructor(
    message: string,
    code: string = 'UNKNOWN_ERROR',
    metadata: Record<string, any> = {}
  ) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.metadata = metadata;

    // Maintain proper stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }
  }

  public toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      metadata: this.metadata,
      stack: this.stack,
    };
  }
}

/**
 * Create API error with status code
 */
export class APIError extends AppError {
  public status: number;

  constructor(
    message: string,
    status: number = 500,
    code: string = 'API_ERROR',
    metadata: Record<string, any> = {}
  ) {
    super(message, code, metadata);
    this.name = 'APIError';
    this.status = status;
  }

  public toJSON() {
    return {
      ...super.toJSON(),
      status: this.status,
    };
  }
}

/**
 * Create validation error
 */
export class ValidationError extends AppError {
  public field?: string;

  constructor(
    message: string,
    field?: string,
    metadata: Record<string, any> = {}
  ) {
    super(message, 'VALIDATION_ERROR', metadata);
    this.name = 'ValidationError';
    this.field = field;
  }

  public toJSON() {
    return {
      ...super.toJSON(),
      field: this.field,
    };
  }
}

/**
 * Handle async errors in components
 */
export const withErrorHandling =
  <T extends (...args: any[]) => Promise<any>>(
    fn: T,
    errorHandler?: (error: Error) => void
  ) =>
  async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    try {
      return await fn(...args);
    } catch (error) {
      if (errorHandler) {
        errorHandler(error as Error);
      } else {
        logError(error as Error);
      }
      throw error;
    }
  };
