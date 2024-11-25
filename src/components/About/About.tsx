import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaGitAlt, FaDocker } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiGraphql, SiAmazonaws } from 'react-icons/si';

const Section = styled.section`
  padding: 6rem 0;
  background: ${({ theme }) => theme.colors.background.secondary};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Content = styled.div`
  h2 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: 1.5rem;
  }
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  
  &::before {
    content: '';
    display: block;
    padding-top: 66.67%; 
  }

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const TechStack = styled.div`
  margin-top: 2rem;
`;

const TechTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const TechItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: 12px;
  transition: all 0.3s ease;

  svg {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.primary};
  }

  span {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 600;
`;

const About: React.FC = () => {
  const techStack = [
    { icon: <FaReact />, name: 'React' },
    { icon: <SiTypescript />, name: 'TypeScript' },
    { icon: <FaNodeJs />, name: 'Node.js' },
    { icon: <SiNextdotjs />, name: 'Next.js' },
    { icon: <SiGraphql />, name: 'GraphQL' },
    { icon: <FaGitAlt />, name: 'Git' },
    { icon: <FaDocker />, name: 'Docker' },
    { icon: <SiAmazonaws />, name: 'AWS' },
  ];

  return (
    <Section>
      <Container>
        <Grid>
          <ImageContainer
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80"
              alt="Modern workstation with laptop and coding setup"
            />
          </ImageContainer>
          <Content>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2>About Me</h2>
              <p>
                Hi there! I'm a <Highlight>Full Stack Developer</Highlight> with a passion for building 
                beautiful, functional, and user-friendly web applications. With over 
                <Highlight> 5 years</Highlight> of experience in web development, I specialize in 
                creating modern applications using cutting-edge technologies.
              </p>
              <p>
                I love working on challenging projects that push my boundaries and allow me 
                to learn new things. My approach combines <Highlight>clean code practices</Highlight>, 
                <Highlight> performance optimization</Highlight>, and <Highlight>user-centered design</Highlight> 
                to create exceptional digital experiences.
              </p>
              <TechStack>
                <TechTitle>Technologies I Work With</TechTitle>
                <TechGrid>
                  {techStack.map((tech, index) => (
                    <TechItem
                      key={tech.name}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      {tech.icon}
                      <span>{tech.name}</span>
                    </TechItem>
                  ))}
                </TechGrid>
              </TechStack>
            </motion.div>
          </Content>
        </Grid>
      </Container>
    </Section>
  );
};

export default About;
