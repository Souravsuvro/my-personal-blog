import React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isFullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const getButtonStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case 'primary':
      return css`
        background: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.background.primary};
        border: 2px solid ${({ theme }) => theme.colors.primary};

        &:hover:not(:disabled) {
          background: transparent;
          color: ${({ theme }) => theme.colors.primary};
        }
      `;
    case 'secondary':
      return css`
        background: ${({ theme }) => theme.colors.secondary};
        color: ${({ theme }) => theme.colors.text.primary};
        border: 2px solid ${({ theme }) => theme.colors.secondary};

        &:hover:not(:disabled) {
          background: transparent;
          color: ${({ theme }) => theme.colors.secondary};
        }
      `;
    case 'outline':
      return css`
        background: transparent;
        color: ${({ theme }) => theme.colors.text.primary};
        border: 2px solid ${({ theme }) => theme.colors.text.primary};

        &:hover:not(:disabled) {
          background: ${({ theme }) => theme.colors.text.primary};
          color: ${({ theme }) => theme.colors.background.primary};
        }
      `;
    case 'ghost':
      return css`
        background: transparent;
        color: ${({ theme }) => theme.colors.text.primary};
        border: 2px solid transparent;

        &:hover:not(:disabled) {
          background: ${({ theme }) => theme.colors.background.secondary};
        }
      `;
    default:
      return '';
  }
};

const getButtonSize = (size: ButtonSize) => {
  switch (size) {
    case 'sm':
      return css`
        padding: ${({ theme }) => `${theme.spacing['2']} ${theme.spacing['4']}`};
        font-size: ${({ theme }) => theme.fontSizes.sm};
      `;
    case 'lg':
      return css`
        padding: ${({ theme }) => `${theme.spacing['4']} ${theme.spacing['8']}`};
        font-size: ${({ theme }) => theme.fontSizes.lg};
      `;
    default:
      return css`
        padding: ${({ theme }) => `${theme.spacing['3']} ${theme.spacing['6']}`};
        font-size: ${({ theme }) => theme.fontSizes.md};
      `;
  }
};

const StyledButton = styled(motion.button)<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing['2']};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  transition: all ${({ theme }) => theme.transitions.speed} ${({ theme }) => theme.transitions.curve};
  cursor: pointer;
  width: ${({ isFullWidth }) => isFullWidth ? '100%' : 'auto'};
  white-space: nowrap;
  position: relative;
  overflow: hidden;

  ${({ variant = 'primary' }) => getButtonStyles(variant)}
  ${({ size = 'md' }) => getButtonSize(size)}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const LoadingSpinner = styled(motion.div)`
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-bottom-color: transparent;
  border-radius: 50%;
`;

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isFullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  ...props
}) => {
  const loadingAnimation = {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear'
    }
  };

  return (
    <StyledButton
      variant={variant}
      size={size}
      isFullWidth={isFullWidth}
      disabled={isLoading || props.disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {isLoading ? (
        <LoadingSpinner animate={loadingAnimation} />
      ) : (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      )}
    </StyledButton>
  );
};

export default Button;
