import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFoundSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
  padding: 2rem;
`;

const Container = styled.div`
  text-align: center;
  max-width: 600px;
`;

const Title = styled(motion.h1)`
  font-size: clamp(3rem, 10vw, 6rem);
  color: var(--primary);
  margin-bottom: 1rem;
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1.25rem, 3vw, 1.5rem);
  color: var(--text-secondary);
  margin-bottom: 2rem;
`;

const HomeLink = styled(motion(Link))`
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--primary);
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 500;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const NotFound: React.FC = () => {
  return (
    <NotFoundSection>
      <Container>
        <Title
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          404
        </Title>
        <Subtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Oops! The page you're looking for doesn't exist.
        </Subtitle>
        <HomeLink
          to="/"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Back to Home
        </HomeLink>
      </Container>
    </NotFoundSection>
  );
};

export default NotFound;
