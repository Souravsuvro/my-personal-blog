import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '@/context/ThemeContext';
import { FaBuilding, FaCalendar, FaMapMarkerAlt, FaCode, FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight, FaPlay, FaPause } from 'react-icons/fa';

interface Company {
  id: number;
  name: string;
  role: string;
  period: string;
  location: string;
  description: string;
  technologies: string[];
  logo: string;
  website: string;
  achievements: string[];
}

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  videoUrl: string;
  githubUrl: string;
  liveUrl: string;
  thumbnail: string;
}

const companies: Company[] = [
  {
    id: 1,
    name: "Worldwide Services",
    role: "Full Stack Developer",
    period: "2020 - 2022",
    location: " 92A Plumstead High Street, London, SE18",
    description: "Led development of scalable cloud solutions and microservices architecture for enterprise clients.",
    technologies: ["React", "Node.js", "MongoDB"],
    logo: "/images/company_logo1.png",
    website: "#",
    achievements: [
      "Reduced system latency by 40% through optimization",
      "Led a team of 5 developers",
      "Implemented CI/CD pipeline"
    ]
  },
  {
    id: 2,
    name: "Sofilite LLC",
    role: "Web Designer and Developer",
    period: "2022 - 2023",
    location: "8700 Stonebrook Pkwy #34, Frisco, TX 75034, United States",
    description: "Developed and maintained enterprise-level web applications using modern technologies.",
    technologies: ["Vue.js", "Python", "Docker", "PostgreSQL"],
    logo: "/images/company_logo2.png",
    website: "#",
    achievements: [
      "Increased user engagement by 60%",
      "Developed 3 major features",
      "Mentored junior developers"
    ]
  },
  {
    id: 3,
    name: "Friends Cars",
    role: "Full StackWeb Developer and IT Support",
    period: "2023 - Now",
    location: "11B Enterprise Way, Edenbridge TN8 6HF, United Kingdom",
    description: "Built innovative solutions for fintech clients focusing on security and performance.",
    technologies: ["Angular", "Java", "Spring Boot", "MongoDB"],
    logo: "/images/company_logo3.png",
    website: "#",
    achievements: [
      "Implemented secure payment gateway",
      "Reduced bug reports by 45%",
      "Improved API response time"
    ]
  }
];

const projects: Project[] = [
  {
    id: 1,
    title: "AI-Powered Task Manager",
    description: "An intelligent task management system with AI-driven prioritization and smart categorization.",
    technologies: ["React", "Node.js", "OpenAI API", "MongoDB"],
    videoUrl: "/videos/portfolio.webm",
    githubUrl: "https://github.com/yourusername/project1",
    liveUrl: "https://project1-demo.com",
    thumbnail: "/images/project1-thumb.jpg"
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description: "A full-featured online shopping platform with real-time inventory and secure payments.",
    technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
    videoUrl: "/videos/ecommerce.webm",
    githubUrl: "https://github.com/yourusername/project2",
    liveUrl: "https://project2-demo.com",
    thumbnail: "/images/project2-thumb.jpg"
  },
  {
    id: 3,
    title: "Social Media Dashboard",
    description: "A comprehensive analytics dashboard for social media management and monitoring.",
    technologies: ["Vue.js", "Python", "Django", "Redis"],
    videoUrl: "/videos/video.1.webm",
    githubUrl: "https://github.com/yourusername/project3",
    liveUrl: "https://project3-demo.com",
    thumbnail: "/images/project3-thumb.jpg"
  }
];

const CompanyCard: React.FC<{ company: Company; index: number }> = ({ company, index }) => {
  const { theme } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative p-6 lg:p-8 ${theme === 'light' 
        ? 'bg-white hover:bg-gray-50' 
        : 'bg-[#1a1a1a] hover:bg-[#222222]'} 
        rounded-2xl transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl
        before:absolute before:inset-0 before:rounded-2xl before:transition-all
        before:border before:border-transparent hover:before:border-[#FFB800]
        before:duration-300 overflow-hidden`}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br from-[#FFB800] to-orange-600" />

      <div className="relative flex flex-col sm:flex-row items-start justify-between mb-6 lg:mb-8 gap-4">
        <div className={`w-20 h-20 lg:w-24 lg:h-24 rounded-2xl overflow-hidden ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'} 
          flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
        >
          {company.logo ? (
            <img 
              src={company.logo} 
              alt={`${company.name} logo`}
              className="w-16 h-16 lg:w-20 lg:h-20 object-contain"
            />
          ) : (
            <FaBuilding size={40} className="text-[#FFB800]" />
          )}
        </div>
        <div className="flex flex-col items-start sm:items-end text-sm w-full sm:w-auto">
          <div className="flex items-center text-[#FFB800] mb-2">
            <FaCalendar className="mr-1" size={14} />
            <span className="whitespace-nowrap">{company.period}</span>
          </div>
          <div className="inline-flex items-center justify-end gap-1">
            <FaMapMarkerAlt size={14} className="text-[#FFB800]" />
            <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} break-words`}>
              {company.location}
            </span>
          </div>
        </div>
      </div>

      <div className="relative">
        <h3 className={`text-2xl font-bold mb-2 ${theme === 'light' ? 'text-gray-900' : 'text-white'}
          group-hover:text-[#FFB800] transition-colors duration-300`}>
          {company.name}
        </h3>
        
        <div className="flex items-center space-x-3 mb-4">
          <span className={`text-lg font-medium ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
            {company.role}
          </span>
        </div>

        <p className={`text-base mb-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
          {company.description}
        </p>

        <div className="mb-6">
          <h4 className={`text-sm font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
            Key Achievements
          </h4>
          <ul className="space-y-2">
            {company.achievements.map((achievement, index) => (
              <li 
                key={index}
                className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} 
                  flex items-center space-x-2`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFB800]" />
                <span>{achievement}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-2">
          {company.technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className={`flex items-center text-sm px-3 py-1 rounded-full
                ${theme === 'light'
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}
                transition-colors duration-300`}
            >
              <FaCode className="mr-2" size={12} />
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedProjectsSlider: React.FC = () => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const togglePlayPause = () => {
    if (videoRef) {
      if (isPlaying) {
        videoRef.pause();
      } else {
        const playPromise = videoRef.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              // Video started playing
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error('Error playing video:', error);
              // Handle autoplay restrictions or other errors
              setIsPlaying(false);
            });
        }
      }
    }
  };

  useEffect(() => {
    if (videoRef) {
      videoRef.pause();
      setIsPlaying(false);
    }
  }, [currentIndex]);

  return (
    <div className="relative">
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-900">
        <video
          ref={setVideoRef}
          key={projects[currentIndex].videoUrl}  
          src={projects[currentIndex].videoUrl}
          poster={projects[currentIndex].thumbnail}
          className="w-full h-full object-cover"
          onEnded={() => setIsPlaying(false)}
          playsInline
          muted  
          preload="metadata"
        >
          <source 
            src={projects[currentIndex].videoUrl} 
            type="video/webm" 
          />
          Your browser does not support the video tag.
        </video>
        
        <div className="absolute inset-0 bg-black bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
          <button
            onClick={togglePlayPause}
            className="p-4 rounded-full bg-[#FFB800] text-white hover:bg-[#FFA500] transition-colors duration-300"
          >
            {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} />}
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
          <h3 className="text-2xl font-bold text-white mb-2">
            {projects[currentIndex].title}
          </h3>
          <p className="text-gray-200 mb-4">
            {projects[currentIndex].description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {projects[currentIndex].technologies.map((tech, index) => (
              <span
                key={index}
                className={`text-sm px-4 py-1.5 rounded-full
                  ${theme === 'light'
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}
                  transition-colors duration-300`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-[#FFB800] transition-colors duration-300"
      >
        <FaChevronLeft size={24} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-[#FFB800] transition-colors duration-300"
      >
        <FaChevronRight size={24} />
      </button>

      <div className="flex justify-center mt-8 space-x-2">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              index === currentIndex ? 'bg-[#FFB800]' : 'bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const Projects: React.FC = () => {
  const { theme } = useTheme();

  return (
    <section 
      id="projects" 
      className={`py-20 ${theme === 'light' ? 'bg-white' : 'bg-[#111111]'}`}
    >
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl font-bold mb-4 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            Featured Projects
          </h2>
          <p className={`text-xl ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            Showcasing innovative solutions and creative problem-solving
          </p>
        </motion.div>

        <FeaturedProjectsSlider />
      </div>
    </section>
  );
};

export default Projects;
