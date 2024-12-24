import React from 'react';
import { useScroll } from '../contexts/ScrollContext';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Certificates from '../components/Certificates';
import Contact from '../components/Contact';
import FeaturedBlogsSlider from '../components/FeaturedBlogsSlider';

const Home: React.FC = () => {
  const { projectsRef, contactRef } = useScroll();

  return (
    <div>
      <Hero />
      <About />
      <Certificates />
      <div ref={projectsRef}>
        <Projects />
      </div>
      <FeaturedBlogsSlider />
      <div ref={contactRef}>
        <Contact />
      </div>
    </div>
  );
};

export default Home;