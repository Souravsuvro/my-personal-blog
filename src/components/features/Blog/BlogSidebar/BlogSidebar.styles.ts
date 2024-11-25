import styled from 'styled-components';
import { motion } from 'framer-motion';

export const SidebarContainer = styled(motion.aside)`
  width: 100%;
  max-width: 320px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: 100%;
  }
`;

export const SidebarSection = styled.section`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing['6']};
  margin-bottom: ${({ theme }) => theme.spacing['6']};
`;

export const SectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing['4']};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const TagsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing['2']};
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

  span {
    opacity: 0.7;
  }
`;

export const PopularPostsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing['4']};
`;

export const PopularPost = styled(motion.a)`
  display: flex;
  gap: ${({ theme }) => theme.spacing['3']};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const PostThumbnail = styled.div`
  width: 80px;
  height: 60px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const PostInfo = styled.div`
  flex: 1;
`;

export const PostTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-bottom: ${({ theme }) => theme.spacing['1']};
  color: ${({ theme }) => theme.colors.text.primary};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['2']};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.tertiary};

  svg {
    width: 14px;
    height: 14px;
  }
`;
