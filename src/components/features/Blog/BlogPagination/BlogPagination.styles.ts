import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';

export const PaginationContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing['2']};
  margin: ${({ theme }) => theme.spacing['8']} 0;
`;

type PaginationButtonProps = {
  $active?: boolean;
  $disabled?: boolean;
};

const activeStyles = css`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background.primary};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primary}ee;
  }
`;

const disabledStyles = css`
  opacity: 0.5;
  cursor: not-allowed;
  
  &:hover {
    transform: none !important;
  }
`;

export const PaginationButton = styled(motion.button)<PaginationButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  padding: ${({ theme }) => `${theme.spacing['2']} ${theme.spacing['3']}`};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.background.tertiary};
  }

  ${({ $active }) => $active && activeStyles}
  ${({ $disabled }) => $disabled && disabledStyles}

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const PageInfo = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  margin: 0 ${({ theme }) => theme.spacing['4']};
`;
