import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import CodeRain from './CodeRain';

const HeroSection = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: ${({ theme }) => `${theme.spacing['3xl']} ${theme.spacing.md}`};
  background: #1a1a1a; 
  position: relative;
  overflow: hidden;
  padding-top: calc(70px + ${({ theme }) => theme.spacing['3xl']});
  margin-top: 0;
  width: 100%;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing.xl} ${theme.spacing.sm}`};
    padding-top: calc(60px + ${({ theme }) => theme.spacing.xl});
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.xs}`};
    padding-top: calc(60px + ${({ theme }) => theme.spacing.lg});
  }
`;

const Container = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  padding: 0 ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
    grid-template-areas: 
      "image"
      "content";
    gap: 40px;
    text-align: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 30px;
    padding: 0 ${({ theme }) => theme.spacing.sm};
  }
`;

const HeroContent = styled.div`
  position: relative;
  width: 100%;
  z-index: 1;
`;

const HeroInnerContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-area: content;
    align-items: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    gap: 1.2rem;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 1rem;
  }
`;

const ImageContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-area: image;
    max-height: 400px;
  }
`;

const ProfileImage = styled.img`
  width: 320px;
  height: 320px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 280px;
    height: 280px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 220px;
    height: 220px;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
  }
`;

const Greeting = styled(motion.span)`
  color: #ffffff; 
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  line-height: 1.2;
  margin: 0.5rem 0;
  color: #ffffff;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: clamp(2rem, 4vw, 2.5rem);
    margin: 0.3rem 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: clamp(1.8rem, 3.5vw, 2rem);
  }
  
  span {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const Subtitle = styled(motion.p)`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: #e0e0e0; 
  line-height: 1.6;
  margin-bottom: 1rem;
  max-width: 600px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    margin: 0 auto;
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: 500px;
    line-height: 1.5;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.md};
    max-width: 100%;
  }
`;

const CTAContainer = styled(motion.div)`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: 0.8rem;
    width: 100%;
    max-width: 300px;
  }
`;

const PrimaryButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border-radius: 8px;
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-decoration: none;
  transition: all 0.3s ease;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    padding: 0.7rem 1.5rem;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 112, 243, 0.3);
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.primary};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: white;
  }
`;

const SocialLinks = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  margin-top: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    justify-content: center;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 2rem;
    margin-top: 1.5rem;
  }
`;

const SocialLink = styled.a`
  color: #ffffff; 
  font-size: 1.5rem;
  transition: all 0.3s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

const CodeRainWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 100%;
  z-index: 0;
  opacity: 0.4;
`;

const Hero: React.FC = () => {
  return (
    <HeroSection id="hero">
      <CodeRainWrapper>
        <CodeRain />
      </CodeRainWrapper>
      <HeroContent>
        <Container>
          <HeroInnerContent
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Greeting
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Hello, I'm
            </Greeting>
            <Title
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Sourav Suvra
              <br />
              <span>Full Stack Developer</span>
            </Title>
            <Subtitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              I build exceptional digital experiences that combine elegant design with powerful functionality
            </Subtitle>
            <CTAContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <PrimaryButton href="#contact">Get in Touch</PrimaryButton>
              <SecondaryButton href="#projects">View My Work</SecondaryButton>
            </CTAContainer>
            <SocialLinks
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <SocialLink href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                <FiGithub />
              </SocialLink>
              <SocialLink href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
                <FiLinkedin />
              </SocialLink>
              <SocialLink href="mailto:your.email@example.com">
                <FiMail />
              </SocialLink>
            </SocialLinks>
          </HeroInnerContent>
          <ImageContainer
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <picture>
              <source 
                srcSet="/images/profile-640.webp 640w, 
                        /images/profile-768.webp 768w, 
                        /images/profile-1024.webp 1024w, 
                        /images/profile-1280.webp 1280w, 
                        /images/profile-1920.webp 1920w"
                type="image/webp"
              />
              <ProfileImage 
                src="/images/profile.png" 
                alt="Sourav Suvra"
                loading="eager"
              />
            </picture>
          </ImageContainer>
        </Container>
      </HeroContent>
    </HeroSection>
  );
};

export default Hero;
