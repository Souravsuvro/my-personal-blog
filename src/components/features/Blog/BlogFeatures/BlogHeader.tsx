import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
  position: relative;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: block;
  text-align: center;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 600px;
  margin: 0 auto;
`;

const BlogHeader: React.FC = () => {
  return (
    <Header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Title>Blog & Articles</Title>
      <Subtitle>
        Thoughts, tutorials, and insights about web development, software engineering, and technology.
      </Subtitle>
    </Header>
  );
};

export default BlogHeader;
