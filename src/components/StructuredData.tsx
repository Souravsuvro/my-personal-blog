import React from 'react';
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type: 'Person' | 'Organization' | 'WebSite' | 'Article' | 'BlogPosting';
  data: any;
}

export const StructuredData: React.FC<StructuredDataProps> = ({ type, data }) => {
  const generateJsonLd = () => {
    const baseStructure = {
      '@context': 'https://schema.org',
      '@type': type,
    };

    const mergedData = { ...baseStructure, ...data };

    return JSON.stringify(mergedData);
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {generateJsonLd()}
      </script>
    </Helmet>
  );
};

// Example Usage Types
export const PersonStructuredData = {
  name: 'Your Name',
  jobTitle: 'Software Engineer',
  alumniOf: 'Your University',
  url: 'https://yourwebsite.com',
  sameAs: [
    'https://linkedin.com/in/yourprofile',
    'https://github.com/yourusername'
  ]
};

export const WebsiteStructuredData = {
  name: 'Your Personal Portfolio',
  url: 'https://yourwebsite.com',
  description: 'Personal portfolio showcasing projects and blog',
  publisher: {
    '@type': 'Person',
    name: 'Your Name'
  }
};
