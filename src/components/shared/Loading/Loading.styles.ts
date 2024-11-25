import styled, { keyframes } from 'styled-components';
import type { LoadingSize } from '@/types/components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const sizes = {
  sm: '16px',
  md: '24px',
  lg: '32px',
  xl: '48px',
};

type SpinnerProps = {
  $size: LoadingSize;
  $color?: string;
};

export const Spinner = styled.div<SpinnerProps>`
  width: ${({ $size }) => sizes[$size]};
  height: ${({ $size }) => sizes[$size]};
  border: 2px solid ${({ theme }) => theme.colors.background.secondary};
  border-top-color: ${({ theme, $color }) => $color ?? theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;

export const Container = styled.div<{ $fullscreen?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  width: 100%;
  
  ${({ $fullscreen, theme }) =>
    $fullscreen &&
    `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    min-height: 100vh;
    background: ${theme.colors.background.primary}CC;
    z-index: ${theme.zIndices.modal};
  `}
`;
