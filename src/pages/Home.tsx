import React, { useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import Projects from '../components/Projects';
import About from '../components/About';
import Contact from '../components/Contact';
import { SEO } from '../components/SEO';
import { useScroll } from '../contexts/ScrollContext';
import Hero from '../components/Hero';
import FeaturedBlogsSlider from '../components/FeaturedBlogsSlider';

const Home: React.FC = () => {
  const { projectsRef, contactRef } = useScroll();

  const renderWithRef = useCallback((
    ref: React.RefObject<HTMLDivElement | null>, 
    Component: React.ComponentType
  ) => {
    const safeRef = useMemo(() => {
      if (ref.current) {
        return ref as React.RefObject<HTMLDivElement>;
      }
      return { current: null };
    }, [ref]);

    return (
      <div ref={safeRef.current ? safeRef : undefined}>
        <Component />
      </div>
    );
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className=""
    >
      <SEO title="Sourav Sarker - Portfolio" />
      <Hero />
      <About />
      {renderWithRef(projectsRef, Projects)}
      <FeaturedBlogsSlider />
      {renderWithRef(contactRef, Contact)}
    </motion.div>
  );
};

export default Home;