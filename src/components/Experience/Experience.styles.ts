import styled from 'styled-components';
import { motion } from 'framer-motion';

export const ExperienceSection = styled.section`
  padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.md}`};
  background: ${({ theme }) => theme.colors.background.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.sm}`};
  }
`;

export const ExperienceContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.xl} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg} 0;
  }
`;

export const SectionTitle = styled(motion.h2)`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  color: ${({ theme }) => theme.colors.text.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const Timeline = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md};

  &::before {
    content: '';
    position: absolute;
    width: 2px;
    background: ${({ theme }) => theme.colors.primary};
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0.3;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      left: 15px;
    }
  }
`;

export const TimelineItem = styled(motion.div)<{ isEven: boolean }>`
  display: flex;
  justify-content: ${({ isEven }) => (isEven ? 'flex-start' : 'flex-end')};
  padding-bottom: ${({ theme }) => theme.spacing.xl};
  width: 100%;
  position: relative;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    justify-content: flex-start;
    padding-left: 45px;
    padding-bottom: ${({ theme }) => theme.spacing.lg};
  }

  &::before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.primary};
    left: 50%;
    transform: translateX(-50%);
    top: 15px;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      left: 8px;
      width: 14px;
      height: 14px;
    }
  }
`;

export const TimelineContent = styled.div<{ isEven: boolean }>`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  width: 45%;
  position: relative;
  box-shadow: ${({ theme }) => theme.shadows.md};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: calc(100% - 15px);
    padding: ${({ theme }) => theme.spacing.md};
  }

  &::before {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background: ${({ theme }) => theme.colors.background.secondary};
    transform: rotate(45deg);
    top: 15px;
    ${({ isEven }) => (isEven ? 'right: -10px' : 'left: -10px')};

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      left: -8px;
      width: 16px;
      height: 16px;
      top: 13px;
    }
  }
`;

export const JobTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

export const Company = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  font-weight: ${({ theme }) => theme.fontWeights.medium};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

export const Duration = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const Location = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-style: italic;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: 1.6;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    line-height: 1.5;
  }
`;

export const AchievementsList = styled.ul`
  margin: 0;
  padding-left: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding-left: ${({ theme }) => theme.spacing.md};
  }
`;

export const Achievement = styled.li`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  line-height: 1.5;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    margin-bottom: ${({ theme }) => theme.spacing.xxs};
  }

  &::marker {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
