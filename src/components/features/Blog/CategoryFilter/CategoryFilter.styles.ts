import styled from 'styled-components';
import { motion } from 'framer-motion';

export const FilterWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 2rem;
`;

export const FilterContainer = styled.div`
  overflow: hidden;
  margin: 0 40px;
`;

export const CategoryList = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing['2']};
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-behavior: smooth;
  padding: ${({ theme }) => theme.spacing['2']} 0;

  &::-webkit-scrollbar {
    display: none;
  }
`;

interface CategoryButtonProps {
  $active?: boolean;
}

export const CategoryButton = styled(motion.button)<CategoryButtonProps>`
  padding: ${({ theme }) => `${theme.spacing['2']} ${theme.spacing['4']}`};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.background.secondary};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.background.primary : theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme, $active }) =>
      $active ? theme.colors.primary : theme.colors.background.tertiary};
  }
`;

interface ScrollButtonProps {
  direction: 'left' | 'right';
}

export const ScrollButton = styled(motion.button)<ScrollButtonProps>`
  position: absolute;
  top: 50%;
  ${({ direction }) => direction}: 0;
  transform: translateY(-50%);
  width: 32px;
  height: 32px;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;
  
  &:hover {
    background: ${({ theme }) => theme.colors.background.tertiary};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;
