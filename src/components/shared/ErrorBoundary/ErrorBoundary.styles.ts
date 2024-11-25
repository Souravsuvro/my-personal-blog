import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ErrorContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  min-height: 300px;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: ${({ theme }) => theme.shadows.md};

  h2 {
    color: ${({ theme }) => theme.colors.text.primary};
    margin-bottom: ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }

  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    max-width: 500px;
    line-height: 1.6;
  }

  button {
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background.primary};
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: ${({ theme }) => theme.fontSizes.base};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  }
`;

export const ErrorStack = styled.pre`
  background: ${({ theme }) => theme.colors.background.primary};
  padding: ${({ theme }) => theme.spacing['4']};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: auto;
  max-width: 100%;
  margin-top: ${({ theme }) => theme.spacing['4']};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: left;
`;
