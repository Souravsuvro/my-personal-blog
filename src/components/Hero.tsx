import React from 'react';
import { motion } from 'framer-motion';
import { FaDownload } from 'react-icons/fa';
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiJavascript,
  SiGraphql,
  SiFigma,
  SiTypescript
} from 'react-icons/si';
import { useTheme } from '@/context/ThemeContext';

interface TechBadgeProps {
  icon: React.ReactNode;
  text: string;
  color?: string;
  proficiency?: number;
  className?: string;
}

const TechBadge: React.FC<TechBadgeProps> = ({ 
  icon, 
  text, 
  color = "from-white to-gray-100", 
  proficiency = 0, 
  className = "" 
}) => {
  const { theme } = useTheme();
  
  return (
    <motion.div
      className={`
        relative flex items-center gap-2 
        bg-gradient-to-br ${color} 
        ${theme === 'light' 
          ? 'text-gray-800 shadow-md' 
          : 'text-white bg-opacity-20 backdrop-blur-sm'}
        px-4 py-2 rounded-full 
        transition-all duration-300 
        ease-in-out cursor-pointer
        ${className}
      `}
      whileHover={{ 
        scale: 1.05,
        rotate: 2,
        transition: { type: "spring", stiffness: 300 }
      }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Skill in ${text}`}
    >
      <motion.span 
        className="text-2xl mr-2"
        initial={{ rotate: 0 }}
        animate={{ 
          rotate: [0, -10, 10, -2, 0],
          transition: { 
            duration: 1.5, 
            repeat: Infinity, 
            repeatDelay: 2 
          }
        }}
      >
        {icon}
      </motion.span>
      <span className="text-sm font-medium tracking-tight">{text}</span>
      
      {proficiency > 0 && (
        <motion.div 
          className="absolute bottom-[-4px] left-0 right-0 h-1 bg-white/30 rounded-full overflow-hidden"
        >
          <motion.div 
            className="h-full bg-white"
            initial={{ width: 0 }}
            animate={{ width: `${proficiency}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

const Hero: React.FC = () => {
  const { theme } = useTheme();
  
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Your_Name_Resume.pdf';
    link.click();
  };

  const handleHireMe = () => {
    window.location.href = 'mailto:your.email@example.com';
  };

  const techStack = [
    { 
      icon: <SiReact />, 
      text: "ReactJS", 
      color: "from-blue-500 to-blue-600",
      proficiency: 90 
    },
    { 
      icon: <SiNextdotjs />, 
      text: "NextJS", 
      color: theme === 'light' 
        ? 'from-green-500 to-green-600' 
        : 'from-gray-800 to-gray-900',
      proficiency: 85 
    },
    { 
      icon: <SiTailwindcss />, 
      text: "Tailwind", 
      color: "from-cyan-500 to-cyan-600",
      proficiency: 80 
    },
    { 
      icon: <SiJavascript />, 
      text: "JavaScript", 
      color: "from-yellow-500 to-yellow-600",
      proficiency: 88 
    },
    { 
      icon: <SiGraphql />, 
      text: "GraphQL", 
      color: "from-pink-500 to-pink-600",
      proficiency: 75 
    },
    { 
      icon: <SiFigma />, 
      text: "Figma", 
      color: "from-purple-500 to-purple-600",
      proficiency: 70 
    }
  ];

  return (
    <section className={`min-h-screen flex items-center justify-center py-20 ${theme === 'light' ? 'bg-white' : 'bg-[#111111]'}`}>
      {/* Professional Geometric Background Animation */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Grid Lines */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(90deg, 
                ${theme === 'light' 
                  ? 'rgba(255, 184, 0, 0.1)' 
                  : 'rgba(255, 184, 0, 0.1)'} 1px, transparent 1px),
              linear-gradient(
                ${theme === 'light' 
                  ? 'rgba(255, 184, 0, 0.1)' 
                  : 'rgba(255, 184, 0, 0.1)'} 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}
          animate={{
            backgroundPosition: ['0 0', '30px 30px'],
            transition: {
              duration: 10,
              repeat: Infinity,
              ease: 'linear'
            }
          }}
        />

        {/* Geometric Shapes */}
        {[...Array(8)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-lg opacity-20"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: theme === 'light' 
                ? `rgba(255, 184, 0, ${Math.random() * 0.2 + 0.1})` 
                : `rgba(255, 184, 0, ${Math.random() * 0.1 + 0.05})`,
              borderRadius: `${Math.random() * 50}%`
            }}
            animate={{
              x: [
                `${Math.random() * 50 - 25}px`, 
                `${Math.random() * 50 - 25}px`
              ],
              y: [
                `${Math.random() * 50 - 25}px`, 
                `${Math.random() * 50 - 25}px`
              ],
              rotate: [0, 360],
              scale: [0.8, 1.1, 0.8]
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          />
        ))}

        {/* Gradient Overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: theme === 'light'
              ? 'linear-gradient(135deg, rgba(255, 184, 0, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)'
              : 'linear-gradient(135deg, rgba(255, 184, 0, 0.1) 0%, rgba(17, 17, 17, 0.01) 100%)'
          }}
          animate={{
            opacity: [0.5, 0.7, 0.5],
            transition: {
              duration: 5,
              repeat: Infinity,
              repeatType: 'reverse'
            }
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 flex flex-col justify-center items-center">
        <div className="text-center w-full max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 w-full"
          >
            <div className="flex justify-center items-center">
              <motion.span 
                className="text-4xl md:text-5xl inline-block mr-2"
                animate={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.1, 1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
              >
                👋
              </motion.span>
              <motion.span 
                className="text-yellow-400 inline-block text-2xl md:text-3xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.8, 1]
                }}
                transition={{ 
                  duration: 1,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
              >
                ⚡
              </motion.span>
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`text-4xl md:text-7xl font-bold mb-4 tracking-tight
              ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}
          >
            Hello! I'm <span className="text-[#FFB800] inline-block">Sourav Suvra</span>
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`text-lg md:text-3xl mb-4 font-light
              ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}
          >
            A Full Stack Developer | Digital Marketing Enthusiast
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`flex items-center justify-center gap-2 mb-8
              ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}
          >
            <span className="text-base md:text-lg">with</span>
            <motion.span 
              className={`px-4 py-1.5 rounded-full text-[#FFB800] font-semibold
                ${theme === 'light' ? 'bg-[#FFB800]/10' : 'bg-[#FFB800]/20'}`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              3.9+ Years
            </motion.span>
            <span className="text-base md:text-lg">Experience</span>
          </motion.div>
        </div>

        {/* Profile Image Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full max-w-4xl px-4 pt-16"
        >
          <div className="relative flex justify-center items-center">
            {/* Background Gradient Circle */}
            <motion.div 
              className="absolute w-48 h-48 md:w-80 md:h-80 rounded-full 
                bg-gradient-to-br from-[#FFB800] to-[#FFA500]"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                delay: 0.5
              }}
            />

            {/* Profile Image */}
            <motion.div 
              className="relative w-48 h-48 md:w-80 md:h-80 rounded-full overflow-hidden 
                shadow-2xl z-10"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                delay: 0.5
              }}
            >
              <img
                src="/images/sourav.png"
                alt="Sourav Suvra"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Tech Stack Badges Slider */}
        <motion.div 
          className="absolute inset-x-0 bottom-20 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <motion.div
            className="flex"
            animate={{
              x: [0, `-${(techStack.length * 180)}px`],
              transition: {
                duration: 10,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'linear'
              }
            }}
            whileTap={{ 
              scale: 0.95, 
              transition: { duration: 0.2 } 
            }}
          >
            {[...techStack, ...techStack, ...techStack].map((tech, index) => (
              <TechBadge 
                key={index}
                icon={tech.icon} 
                text={tech.text} 
                color={tech.color}
                proficiency={tech.proficiency}
                className="mx-[30px] flex-shrink-0" 
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
