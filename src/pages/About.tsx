import React from 'react';
import { SEO } from '@/components/SEO';
import { StructuredData, PersonStructuredData } from '@/components/StructuredData';
import { useResponsive } from '@/utils/responsiveUtils';

const About: React.FC = () => {
  const { isMobile, isTablet, isDesktop } = useResponsive();

  return (
    <main className="container mx-auto px-4">
      <SEO 
        title="About Me - Your Name" 
        description="Professional profile and personal journey"
      />
      
      <StructuredData 
        type="Person" 
        data={PersonStructuredData} 
      />

      <header className="text-center my-8">
        <h1 className={`
          ${isMobile ? 'text-2xl' : 'text-4xl'} 
          font-bold text-primary-dark
        `}>
          About Me
        </h1>
      </header>

      <section className="grid md:grid-cols-2 gap-8">
        <article className="prose">
          <h2>Professional Journey</h2>
          <p>Detailed description of your professional experience...</p>
        </article>

        <aside className="bg-gray-100 p-4 rounded">
          <h3>Quick Facts</h3>
          <ul>
            <li>🏢 Current Role</li>
            <li>🎓 Education</li>
            <li>🌍 Location</li>
          </ul>
        </aside>
      </section>

      <footer className="mt-12 text-center">
        <p>Let's connect and collaborate!</p>
      </footer>
    </main>
  );
};

export default About;
