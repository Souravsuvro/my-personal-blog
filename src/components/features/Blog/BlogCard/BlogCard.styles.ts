import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Card = styled(motion.article)<{ $variant?: 'default' | 'featured' | 'compact' }>`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  border: 1px solid ${({ theme }) => theme.colors.border};

  ${({ $variant }) =>
    $variant === 'featured' &&
    `
    grid-column: 1 / -1;
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 2rem;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      grid-template-columns: 1fr;
    }
  `}

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.background.primary};

    img {
      transform: scale(1.05);
    }
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; // 16:9 aspect ratio
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background.tertiary};
`;

export const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
`;

export const Content = styled.div`
  padding: ${({ theme }) => theme.spacing['6']};
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: ${({ theme }) => theme.spacing['4']};
`;

export const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing['2']};
  margin-bottom: ${({ theme }) => theme.spacing['2']};
`;

export const Tag = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['1']};
  padding: ${({ theme }) => `${theme.spacing['1']} ${theme.spacing['3']}`};
  background: ${({ theme }) => `${theme.colors.primary}15`};
  color: ${({ theme }) => theme.colors.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  text-decoration: none;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.background.primary};
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

export const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.4;
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing['2']};

  a {
    color: ${({ theme }) => theme.colors.text.primary};
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;

export const Excerpt = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.6;
  margin: 0;
  flex: 1;
`;

export const Meta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing['4']};
  margin-top: ${({ theme }) => theme.spacing['4']};
  padding-top: ${({ theme }) => theme.spacing['4']};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text.tertiary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['2']};

  svg {
    width: 16px;
    height: 16px;
    opacity: 0.7;
  }
`;
