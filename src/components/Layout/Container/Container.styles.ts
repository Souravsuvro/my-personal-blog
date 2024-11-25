import styled, { css } from 'styled-components';
import type { ContainerSize } from '@/types';

type ContainerProps = {
  $size: ContainerSize;
  $fluid?: boolean;
};

const containerSizes = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

export const StyledContainer = styled.div<ContainerProps>`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: ${({ theme }) => theme.spacing['4']};
  padding-right: ${({ theme }) => theme.spacing['4']};

  ${({ $fluid, $size }) =>
    !$fluid &&
    css`
      max-width: ${containerSizes[$size]};
    `}

  @media (min-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-left: ${({ theme }) => theme.spacing['6']};
    padding-right: ${({ theme }) => theme.spacing['6']};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    padding-left: ${({ theme }) => theme.spacing['8']};
    padding-right: ${({ theme }) => theme.spacing['8']};
  }
`;
