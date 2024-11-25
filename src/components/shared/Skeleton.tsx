import React from 'react';
import styled, { keyframes } from 'styled-components';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
}

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const SkeletonBase = styled.div<SkeletonProps>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '1rem'};
  border-radius: ${({ borderRadius }) => borderRadius || '0.25rem'};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.background.secondary} 25%,
    ${({ theme }) => theme.colors.background.tertiary} 37%,
    ${({ theme }) => theme.colors.background.secondary} 63%
  );
  background-size: 400% 100%;
  animation: ${shimmer} 1.4s ease infinite;
`;

export const Skeleton: React.FC<SkeletonProps> = (props) => {
  return <SkeletonBase {...props} />;
};

export default Skeleton;
