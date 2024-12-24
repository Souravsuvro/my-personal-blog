import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { FaAward, FaExternalLinkAlt, FaCode } from 'react-icons/fa';

interface Certificate {
  id: number;
  name: string;
  issuer: string;
  credentialUrl: string;
  description: string;
  skills: string[];
}

const certificates: Certificate[] = [
  {
    id: 1,
    name: "Web Design",
    issuer: "FreeCodeCamp",
    credentialUrl: "https://www.freecodecamp.org/certification/YOUR_USERNAME/responsive-web-design",
    description: "Mastery in creating visually appealing and user-friendly web interfaces with modern design principles.",
    skills: ["UI/UX", "CSS3", "Responsive Design", "Web Accessibility", "Design Systems"]
  },
  {
    id: 2,
    name: "Web Development",
    issuer: "FreeCodeCamp",
    credentialUrl: "https://www.freecodecamp.org/certification/YOUR_USERNAME/javascript-algorithms-and-data-structures",
    description: "Advanced web development skills including JavaScript programming, algorithms, and front-end development.",
    skills: ["JavaScript", "HTML5", "DOM Manipulation", "APIs", "Web Applications"]
  },
  {
    id: 3,
    name: "Front End Mastery",
    issuer: "Udemy",
    credentialUrl: "https://www.udemy.com/certificate/YOUR_CERTIFICATE_ID",
    description: "Advanced front-end development course covering modern frameworks and best practices.",
    skills: ["React", "TypeScript", "Redux", "Next.js", "Tailwind CSS"]
  }
];

const CertificateCard: React.FC<{ certificate: Certificate; index: number }> = ({ certificate, index }) => {
  const { theme } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative p-8 ${theme === 'light' 
        ? 'bg-white hover:bg-gray-50' 
        : 'bg-[#1a1a1a] hover:bg-[#222222]'} 
        rounded-2xl transition-all duration-300 transform hover:-translate-y-1
        before:absolute before:inset-0 before:rounded-2xl before:transition-all
        before:border before:border-transparent hover:before:border-[#FFB800]
        before:duration-300 overflow-hidden`}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br from-[#FFB800] to-orange-600" />

      {/* Certificate Icon and External Link */}
      <div className="relative flex items-start justify-between mb-6">
        <div className={`w-20 h-20 rounded-2xl overflow-hidden ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'} 
          flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
        >
          <FaAward size={32} className="text-[#FFB800]" />
        </div>
        <a 
          href={certificate.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`p-3 rounded-xl ${theme === 'light' 
            ? 'bg-gray-100 hover:bg-gray-200' 
            : 'bg-gray-800 hover:bg-gray-700'} 
            text-[#FFB800] transition-all duration-300 transform hover:scale-110`}
        >
          <FaExternalLinkAlt size={20} />
        </a>
      </div>

      {/* Certificate Content */}
      <div className="relative">
        <h3 className={`text-2xl font-bold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}
          group-hover:text-[#FFB800] transition-colors duration-300 line-clamp-2`}>
          {certificate.name}
        </h3>
        
        <div className="mb-4">
          <span className={`text-base font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
            {certificate.issuer}
          </span>
        </div>

        <p className={`text-base mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} line-clamp-2`}>
          {certificate.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {certificate.skills.map((skill, skillIndex) => (
            <span
              key={skillIndex}
              className={`flex items-center text-sm px-4 py-1.5 rounded-full
                ${theme === 'light'
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}
                transition-colors duration-300`}
            >
              <FaCode className="mr-2" size={12} />
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Certificates: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <section id="certificates" className={`py-20 ${theme === 'light' ? 'bg-white' : 'bg-[#111111]'}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
            Certifications
          </h2>
          <p className={`text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
            Professional certifications and achievements
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((certificate, index) => (
            <CertificateCard
              key={certificate.id}
              certificate={certificate}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
