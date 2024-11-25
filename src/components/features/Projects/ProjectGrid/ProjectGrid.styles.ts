import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
`;

export const FilterButton = styled(motion.button)<{ $active?: boolean }>`
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  font-size: ${({ theme }) => theme.fontSizes?.sm || '0.875rem'};
  font-weight: ${({ theme }) => theme.fontWeights?.medium || 500};
  transition: all 0.3s ease;

  background: ${({ theme, $active }) =>
    $active ? theme.colors?.primary : theme.colors?.background?.secondary};
  color: ${({ theme, $active }) =>
    $active ? theme.colors?.white : theme.colors?.text?.primary};

  &:hover {
    background: ${({ theme, $active }) =>
      $active ? theme.colors?.primary_dark : theme.colors?.background?.tertiary};
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;
  
  @media (min-width: ${({ theme }) => theme.breakpoints?.sm || '640px'}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${({ theme }) => theme.breakpoints?.lg || '1024px'}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
