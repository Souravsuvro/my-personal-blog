import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import type { CardVariant } from '@/types';

type CardContainerProps = {
  $variant: CardVariant;
  $isHoverable?: boolean;
  $isFullWidth?: boolean;
};

const variantStyles = {
  default: css`
    background: ${({ theme }) => theme.colors.background.secondary};
  `,
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background.primary};
  `,
  secondary: css`
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.background.primary};
  `,
  outline: css`
    background: transparent;
    border: 2px solid ${({ theme }) => theme.colors.border.primary};
  `,
  ghost: css`
    background: transparent;
  `,
};

export const CardContainer = styled(motion.div)<CardContainerProps>`
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing['6']};
  width: ${({ $isFullWidth }) => ($isFullWidth ? '100%' : 'auto')};
  transition: all 0.2s ease;

  ${({ $variant }) => variantStyles[$variant]}

  ${({ $isHoverable }) =>
    $isHoverable &&
    css`
      &:hover {
        transform: translateY(-4px);
        box-shadow: ${({ theme }) => theme.shadows.md};
      }
    `}
`;

export const CardHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['4']};
`;

export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing['2']};
`;

export const CardSubtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

export const CardBody = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['4']};
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing['4']};
`;
