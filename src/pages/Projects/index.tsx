import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import ProjectGrid from '@/components/features/Projects/ProjectGrid/ProjectGrid';
import { Container, Header, Title, Description } from './Projects.styles';

const Projects: React.FC = () => {
  return (
    <Container>
      <Header>
        <Title
          as={motion.h1}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Projects
        </Title>
        <Description
          as={motion.p}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          A showcase of my work, side projects, and experiments. Each project represents a unique challenge and learning experience.
        </Description>
      </Header>
      <ProjectGrid projects={projects} />
    </Container>
  );
};

export default Projects;
