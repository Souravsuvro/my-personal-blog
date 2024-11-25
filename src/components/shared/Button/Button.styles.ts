import styled, { css } from 'styled-components';
import type { ButtonProps } from '@/types';

type ButtonContainerProps = {
  $variant: NonNullable<ButtonProps['variant']>;
  $size: NonNullable<ButtonProps['size']>;
  $isFullWidth: boolean;
  $isLoading: boolean;
};

const sizeStyles = {
  xs: css`
    padding: ${({ theme }) => `${theme.spacing['1']} ${theme.spacing['2']}`};
    font-size: ${({ theme }) => theme.fontSizes.xs};
  `,
  sm: css`
    padding: ${({ theme }) => `${theme.spacing['2']} ${theme.spacing['3']}`};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  `,
  md: css`
    padding: ${({ theme }) => `${theme.spacing['3']} ${theme.spacing['4']}`};
    font-size: ${({ theme }) => theme.fontSizes.md};
  `,
  lg: css`
    padding: ${({ theme }) => `${theme.spacing['4']} ${theme.spacing['6']}`};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  `,
  xl: css`
    padding: ${({ theme }) => `${theme.spacing['5']} ${theme.spacing['8']}`};
    font-size: ${({ theme }) => theme.fontSizes.xl};
  `,
};

const variantStyles = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background.primary};
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primary}ee;
    }
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.background.primary};
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.secondary}ee;
    }
  `,
  outline: css`
    background: transparent;
    border: 2px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primary}11;
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.text.primary};
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.background.secondary};
    }
  `,
  link: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.primary};
    padding: 0;
    &:hover:not(:disabled) {
      text-decoration: underline;
    }
  `,
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing['2']};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease;
  width: ${({ $isFullWidth }) => ($isFullWidth ? '100%' : 'auto')};
  
  ${({ $size }) => sizeStyles[$size]};
  ${({ $variant }) => variantStyles[$variant]};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    
    &.left {
      margin-right: ${({ theme }) => theme.spacing['1']};
    }
    
    &.right {
      margin-left: ${({ theme }) => theme.spacing['1']};
    }
  }

  .loading {
    width: 1em;
    height: 1em;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
