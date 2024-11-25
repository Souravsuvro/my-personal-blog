import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Experience from '../components/Experience/Experience';
import Projects from '../components/Projects/Projects';
import Contact from '../components/Contact/Contact';
import Layout from '../components/Layout/Layout';
import MusicPlayer from '../components/Home/MusicPlayer';
import Blog from '../components/Blog/Blog';

const Main = styled.main`
  position: relative;
  overflow: hidden;
`;

const Home: React.FC = () => {
  console.log('Home page rendering');
  return (
    <>
      <Helmet>
        <title>Sourav Sarker Suvra - Creative Web Designer</title>
        <meta
          name="description"
          content="Creative Web Designer specializing in crafting visually appealing and functional websites. Experienced in web development and IT solutions."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <Layout>
        <Main>
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Blog isPreview={true} />
          <Contact />
          <MusicPlayer />
        </Main>
      </Layout>
    </>
  );
};

export default Home;
