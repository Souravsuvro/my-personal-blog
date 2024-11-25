import styled from 'styled-components';
import { motion } from 'framer-motion';

export const CategoryTag = styled(motion.button)`
  background-color: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 2rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.text.onPrimary};
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;
