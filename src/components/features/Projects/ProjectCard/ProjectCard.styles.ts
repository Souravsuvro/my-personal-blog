import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Card = styled(motion.article)`
  background: ${({ theme }) => theme.colors?.background?.secondary};
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  overflow: hidden;
`;

export const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

export const Content = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes?.lg || '1.25rem'};
  font-weight: ${({ theme }) => theme.fontWeights?.bold || 700};
  color: ${({ theme }) => theme.colors?.text?.primary};
  margin-bottom: 0.75rem;
`;

export const Description = styled.p`
  color: ${({ theme }) => theme.colors?.text?.secondary};
  font-size: ${({ theme }) => theme.fontSizes?.sm || '0.875rem'};
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex: 1;
`;

export const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

export const TechItem = styled.span`
  background: ${({ theme }) => theme.colors?.background?.primary};
  color: ${({ theme }) => theme.colors?.text?.primary};
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: ${({ theme }) => theme.fontSizes?.xs || '0.75rem'};
  font-weight: ${({ theme }) => theme.fontWeights?.medium || 500};
`;

export const Links = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`;

export const LinkButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: ${({ theme }) => theme.fontSizes?.sm || '0.875rem'};
  font-weight: ${({ theme }) => theme.fontWeights?.medium || 500};
  text-decoration: none;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  background: ${({ theme }) => theme.colors?.background?.primary};
  color: ${({ theme }) => theme.colors?.text?.primary};

  &:hover {
    background: ${({ theme }) => theme.colors?.background?.tertiary};
  }

  svg {
    width: 1em;
    height: 1em;
  }
`;
