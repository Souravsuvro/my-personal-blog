import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import type { Project } from '@/data/projects';
import {
  Card,
  ImageContainer,
  Image,
  Content,
  Title,
  Description,
  TechStack,
  TechItem,
  Links,
  LinkButton
} from './ProjectCard.styles';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card
      as={motion.article}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <ImageContainer>
        <Image
          src={project.image}
          alt={project.title}
          loading="lazy"
        />
      </ImageContainer>
      <Content>
        <Title>{project.title}</Title>
        <Description>{project.description}</Description>
        <TechStack>
          {project.technologies.map((tech, index) => (
            <TechItem key={index}>{tech}</TechItem>
          ))}
        </TechStack>
        <Links>
          {project.liveUrl && (
            <LinkButton
              as="a"
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaExternalLinkAlt /> Live Demo
            </LinkButton>
          )}
          {project.githubUrl && (
            <LinkButton
              as="a"
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub /> GitHub
            </LinkButton>
          )}
        </Links>
      </Content>
    </Card>
  );
};

export default ProjectCard;
