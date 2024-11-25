import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import SolarSystem from '@/components/SolarSystem/SolarSystem';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.primary};
  padding-top: 80px; // Account for navbar
`;

const Header = styled.header`
  padding: ${({ theme }) => theme.spacing['16']} ${({ theme }) => theme.spacing['8']};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['12']} ${({ theme }) => theme.spacing['4']};
  }
`;

const Title = styled(motion.h1)`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: 700;
  margin-bottom: ${({ theme }) => theme.spacing['4']};
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }
`;

const Description = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing['8']};
  padding: ${({ theme }) => theme.spacing['8']};
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: ${({ theme }) => theme.spacing['6']};
    padding: ${({ theme }) => theme.spacing['4']};
  }
`;

const ProjectCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const ProjectHeader = styled.div`
  padding: ${({ theme }) => theme.spacing['4']};
  background: ${({ theme }) => theme.colors.background.tertiary};
`;

const ProjectTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing['2']};
`;

const ProjectDescription = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: 1.5;
`;

const LiveProjects: React.FC = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <PageContainer>
      <Helmet>
        <title>Live Projects - Interactive Demos</title>
        <meta
          name="description"
          content="Explore interactive projects and demos showcasing web development and creative coding."
        />
      </Helmet>

      <Header>
        <Title
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          Interactive Projects
        </Title>
        <Description
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          Explore a collection of interactive projects and demos that showcase the possibilities
          of creative coding and web development. Each project is built with modern technologies
          and designed to be both engaging and educational.
        </Description>
      </Header>

      <ProjectsGrid
        as={motion.div}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <ProjectCard variants={fadeInUp}>
          <ProjectHeader>
            <ProjectTitle>Interactive Solar System</ProjectTitle>
            <ProjectDescription>
              A 3D visualization of our solar system built with Three.js. Explore the planets
              and their orbits in an interactive environment.
            </ProjectDescription>
          </ProjectHeader>
          <SolarSystem />
        </ProjectCard>

        {/* Add more interactive projects here */}
      </ProjectsGrid>
    </PageContainer>
  );
};

export default LiveProjects;
