import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

type SkeletonContainerProps = {
  $width?: string;
  $height?: string;
  $borderRadius?: string;
};

export const SkeletonContainer = styled.div<SkeletonContainerProps>`
  width: ${({ $width }) => $width ?? '100%'};
  height: ${({ $height }) => $height ?? '20px'};
  border-radius: ${({ $borderRadius, theme }) => $borderRadius ?? theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background.secondary};
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ theme }) => `${theme.colors.background.primary}15`},
      transparent
    );
    background-size: 200% 100%;
    animation: ${shimmer} 1.5s infinite;
  }
`;
