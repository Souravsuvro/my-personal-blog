import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Button from '../Button';

const ErrorContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing['8']};
  text-align: center;
  min-height: 300px;
`;

const ErrorTitle = styled.h2`
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: ${({ theme }) => theme.spacing['4']};
`;

const ErrorMessage = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing['6']};
`;

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <ErrorContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <ErrorTitle>Something went wrong</ErrorTitle>
      <ErrorMessage>{error.message}</ErrorMessage>
      <Button onClick={resetErrorBoundary} variant="primary">
        Try again
      </Button>
    </ErrorContainer>
  );
};

export default ErrorFallback;
