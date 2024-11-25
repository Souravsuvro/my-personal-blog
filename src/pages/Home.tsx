import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Hero from '@/components/Hero/Hero';
import About from '@/components/About/About';
import Experience from '@/components/Experience/Experience';
import FeaturedBlogs from '@/components/features/Home/FeaturedBlogs/FeaturedBlogs';
import Contact from '@/components/Contact/Contact';

const Section = styled.section`
  scroll-margin-top: 80px;
  position: relative;
  
  &#hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }

  &#about {
    background: ${({ theme }) => theme.colors.background.secondary};
    padding: 6rem 0;
  }

  &#experience {
    background: ${({ theme }) => theme.colors.background.primary};
    padding: 6rem 0;
  }

  &#featured-blogs {
    background: ${({ theme }) => theme.colors.background.secondary};
    padding: 6rem 0;
  }

  &#contact {
    background: ${({ theme }) => theme.colors.background.primary};
    padding: 6rem 0;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    &#about,
    &#experience,
    &#featured-blogs,
    &#contact {
      padding: 4rem 0;
    }
  }
`;

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Sourav Suvra - Full Stack Developer</title>
        <meta
          name="description"
          content="Full Stack Developer specializing in React, TypeScript, and Node.js. Explore my portfolio, articles, and more."
        />
      </Helmet>
      <Section id="hero">
        <Hero />
      </Section>
      <Section id="about">
        <About />
      </Section>
      <Section id="experience">
        <Experience />
      </Section>
      <Section id="featured-blogs">
        <FeaturedBlogs />
      </Section>
      <Section id="contact">
        <Contact />
      </Section>
    </>
  );
};

export default Home;
