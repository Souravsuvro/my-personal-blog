import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const PageContainer = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.primary};
  padding-top: 80px;
`;

const ProjectsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 3rem 1rem;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, #00a8ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
`;

const Subtitle = styled(motion.p)`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ProjectsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
`;

const ProjectCard = styled(motion.div)`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 3rem;
  align-items: center;
  padding: 2rem;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: 1rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      ${({ theme }) => `${theme.colors.primary}10`},
      transparent
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  &:nth-child(even) {
    grid-template-columns: 1fr 1.2fr;

    @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
      grid-template-columns: 1fr;
    }
  }
`;

const ProjectImage = styled(motion.div)<{ imageUrl: string }>`
  width: 100%;
  height: 350px;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  border-radius: 0.5rem;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.2);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      transparent,
      ${({ theme }) => theme.colors.background.secondary}
    );
    opacity: 0.1;
  }
`;

const ProjectContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProjectTitle = styled.h2`
  font-size: 2rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 0.5rem;
`;

const ProjectDescription = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const TechTag = styled.span`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => `${theme.colors.primary}15`};
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-weight: 500;
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ProjectLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  background: ${({ theme }) => `${theme.colors.primary}10`};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => `${theme.colors.primary}20`};
    transform: translateY(-2px);
  }

  svg {
    font-size: 1.2em;
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const Projects: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: "Personal Portfolio Website",
      description: "A modern and interactive portfolio website built with React, TypeScript, and Framer Motion. Features include smooth animations, responsive design, and dynamic content loading.",
      image: "/images/portfolio.png",
      technologies: ["React", "TypeScript", "Styled Components", "Framer Motion"],
      github: "https://github.com/yourusername/portfolio",
      demo: "https://your-portfolio.com"
    },
    {
      id: 2,
      title: "E-commerce Dashboard",
      description: "A comprehensive dashboard for managing e-commerce operations. Includes features like real-time analytics, inventory management, and order processing.",
      image: "/images/dashboard.png",
      technologies: ["Next.js", "Node.js", "MongoDB", "Material-UI"],
      github: "https://github.com/yourusername/ecommerce-dashboard",
      demo: "https://dashboard-demo.com"
    },
    {
      id: 3,
      title: "AI Code Assistant",
      description: "An intelligent code assistant that helps developers write better code faster. Uses machine learning to provide context-aware suggestions and code completion.",
      image: "/images/ai-assistant.png",
      technologies: ["Python", "TensorFlow", "FastAPI", "React"],
      github: "https://github.com/yourusername/ai-assistant",
      demo: "https://ai-assistant-demo.com"
    },
    {
      id: 4,
      title: "Social Media Analytics Platform",
      description: "A platform for analyzing social media engagement and performance metrics. Provides detailed insights and automated reporting features.",
      image: "/images/analytics.png",
      technologies: ["Vue.js", "Django", "PostgreSQL", "D3.js"],
      github: "https://github.com/yourusername/social-analytics",
      demo: "https://analytics-demo.com"
    },
    {
      id: 5,
      title: "Real-time Chat Application",
      description: "A modern chat application with real-time messaging, file sharing, and video calls. Built with WebSocket technology for instant communication.",
      image: "/images/chat-app.png",
      technologies: ["React", "Socket.io", "Express", "WebRTC"],
      github: "https://github.com/yourusername/chat-app",
      demo: "https://chat-app-demo.com"
    }
  ];

  return (
    <PageContainer>
      <Helmet>
        <title>Projects - Sourav Suvra</title>
        <meta
          name="description"
          content="Explore my software engineering projects showcasing expertise in web development, AI, and cloud technologies."
        />
      </Helmet>
      <ProjectsContainer>
        <Header>
          <Title
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Featured Projects
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            A collection of projects that showcase my passion for building innovative solutions
            and my expertise in modern web technologies.
          </Subtitle>
        </Header>
        <ProjectsGrid
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              variants={cardVariants}
            >
              <ProjectImage imageUrl={project.image} />
              <ProjectContent>
                <ProjectTitle>{project.title}</ProjectTitle>
                <ProjectDescription>{project.description}</ProjectDescription>
                <TechStack>
                  {project.technologies.map((tech, index) => (
                    <TechTag key={index}>{tech}</TechTag>
                  ))}
                </TechStack>
                <ProjectLinks>
                  {project.github && (
                    <ProjectLink
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaGithub /> View Code
                    </ProjectLink>
                  )}
                  {project.demo && (
                    <ProjectLink
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </ProjectLink>
                  )}
                </ProjectLinks>
              </ProjectContent>
            </ProjectCard>
          ))}
        </ProjectsGrid>
      </ProjectsContainer>
    </PageContainer>
  );
};

export default Projects;
