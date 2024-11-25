import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi';
import Button from '../Button';

const FallbackContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing['8']};
  text-align: center;
  min-height: 300px;
`;

const IconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 48px;
  margin-bottom: ${({ theme }) => theme.spacing['4']};
`;

const Title = styled.h2`
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing['4']};
`;

const Message = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing['6']};
  max-width: 500px;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing['4']};
`;

interface ErrorFallbackProps {
  error: Error;
  componentStack?: string;
  eventId?: string;
  resetError?: () => void;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  componentStack,
  eventId,
  resetError,
}) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <FallbackContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <IconWrapper>
        <FiAlertTriangle />
      </IconWrapper>
      <Title>Something went wrong</Title>
      <Message>
        {error.message || 'An unexpected error occurred'}
        {eventId && (
          <small>
            Error ID: {eventId}
          </small>
        )}
      </Message>
      <ButtonGroup>
        {resetError && (
          <Button
            onClick={resetError}
            variant="primary"
            leftIcon={<FiRefreshCw />}
          >
            Try again
          </Button>
        )}
        <Button
          onClick={handleRefresh}
          variant="secondary"
        >
          Refresh page
        </Button>
      </ButtonGroup>
      {process.env.NODE_ENV === 'development' && componentStack && (
        <pre
          style={{
            marginTop: '2rem',
            padding: '1rem',
            background: '#f5f5f5',
            borderRadius: '4px',
            overflow: 'auto',
            fontSize: '0.875rem',
            textAlign: 'left',
          }}
        >
          {componentStack}
        </pre>
      )}
    </FallbackContainer>
  );
};

export default ErrorFallback;
