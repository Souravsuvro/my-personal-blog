import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMoon, FiSun, FiMenu, FiX, FiCode, FiCpu } from 'react-icons/fi';

interface TechStack {
  name: string;
  icon: string;
}

interface Work {
  title: string;
  tech: string;
  image: string;
}

const currentTechStack: TechStack[] = [
  { name: 'React', icon: '⚛️' },
  { name: 'TypeScript', icon: '📘' },
  { name: 'Next.js', icon: '▲' },
  { name: 'Tailwind', icon: '🎨' },
];

const latestWorks: Work[] = [
  {
    title: 'MarketFlick AI',
    tech: 'Next.js + AI',
    image: '/images/latestwork/marketflickai-landing-page-design.png'
  },
  {
    title: 'Finance Dashboard',
    tech: 'React + TypeScript',
    image: '/images/latestwork/finance-app-dashboard.png'
  },
  {
    title: 'E-commerce Platform',
    tech: 'Next.js + TailwindCSS',
    image: '/images/latestwork/ecommerce-design.png'
  }
];

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const [currentTech, setCurrentTech] = useState(0);
  const [showWorkPreview, setShowWorkPreview] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Handle cursor follow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Rotate tech stack
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTech((prev) => (prev + 1) % currentTechStack.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleNavigation = useCallback((path: string) => {
    setIsOpen(false);
    if (location.pathname === '/') {
      const sectionId = path.split('#')[1];
      if (sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  }, [location.pathname]);

  const toggleMatrix = () => {
    setShowMatrix(true);
    setTimeout(() => setShowMatrix(false), 2000);
  };

  return (
    <>
      <div ref={cursorRef} className="cursor-follow hidden lg:block" />
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'py-2' : 'py-4'
        } glassmorphism`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className={`flex items-center space-x-3 group ${showMatrix ? 'matrix-animation' : ''}`}
              onClick={toggleMatrix}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className={`relative w-12 h-12 rounded-xl overflow-hidden ${
                  theme === 'dark' ? 'bg-gray-800' : 'bg-white'
                } shadow-lg`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                    S
                  </span>
                </div>
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                  Sourav Sarker
                </h1>
                <div className="tech-stack-item">
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    Currently working with {currentTechStack[currentTech].icon} {currentTechStack[currentTech].name}
                  </p>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden desktop:flex items-center space-x-1">
              <Link
                to="/"
                className="nav-link-active px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                onClick={() => handleNavigation('/')}
              >
                🏠 Home
              </Link>
              <Link
                to="/#about"
                className="nav-link px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                onClick={() => handleNavigation('/#about')}
              >
                👨‍💻 About
              </Link>
              <Link
                to="/#latest-works"
                className="nav-link px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 relative"
                onClick={() => handleNavigation('/#latest-works')}
                onMouseEnter={() => setShowWorkPreview(true)}
                onMouseLeave={() => setShowWorkPreview(false)}
              >
                🚀 Latest Works
                {/* Work Preview Popup */}
                <AnimatePresence>
                  {showWorkPreview && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-3 w-80 p-4 rounded-xl shadow-2xl glassmorphism border border-gray-200/10"
                      style={{ top: '100%', zIndex: 60 }}
                    >
                      <div className="mb-2">
                        <h3 className="text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Recent Projects</h3>
                      </div>
                      <div className="space-y-3">
                        {latestWorks.map((work, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="group flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100/10 transition-all duration-200"
                          >
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                              <img
                                src={work.image}
                                alt={work.title}
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div>
                              <h3 className="text-sm font-medium group-hover:text-indigo-400 transition-colors duration-200">{work.title}</h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-gray-300 transition-colors duration-200">{work.tech}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Link>
              <Link
                to="/#contact"
                className="nav-link px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                onClick={() => handleNavigation('/#contact')}
              >
                📬 Contact
              </Link>
              <Link
                to="/blog"
                className="nav-link-active px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                onClick={() => handleNavigation('/blog')}
              >
                ✍️ Blog
              </Link>

              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <FiSun className="w-5 h-5" />
                ) : (
                  <FiMoon className="w-5 h-5" />
                )}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="desktop:hidden flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <FiSun className="w-5 h-5" />
                ) : (
                  <FiMoon className="w-5 h-5" />
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <FiX className="w-6 h-6" />
                ) : (
                  <FiMenu className="w-6 h-6" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: '100vh' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="desktop:hidden fixed inset-0 top-[64px] bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg z-50 overflow-y-auto"
              >
                <motion.div 
                  className="flex flex-col items-center justify-start min-h-[calc(100vh-64px)] pt-8 pb-12 space-y-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    to="/"
                    className="mobile-nav-link flex items-center space-x-3 px-6 py-3 w-full max-w-sm rounded-xl text-lg font-medium transition-all duration-200 hover:bg-primary-50 dark:hover:bg-gray-800"
                    onClick={() => {
                      handleNavigation('/');
                      setIsOpen(false);
                    }}
                  >
                    <span className="text-2xl">🏠</span>
                    <span>Home</span>
                  </Link>
                  <Link
                    to="/#about"
                    className="mobile-nav-link flex items-center space-x-3 px-6 py-3 w-full max-w-sm rounded-xl text-lg font-medium transition-all duration-200 hover:bg-primary-50 dark:hover:bg-gray-800"
                    onClick={() => {
                      handleNavigation('/#about');
                      setIsOpen(false);
                    }}
                  >
                    <span className="text-2xl">👨‍💻</span>
                    <span>About</span>
                  </Link>
                  <Link
                    to="/#latest-works"
                    className="mobile-nav-link flex items-center space-x-3 px-6 py-3 w-full max-w-sm rounded-xl text-lg font-medium transition-all duration-200 hover:bg-primary-50 dark:hover:bg-gray-800"
                    onClick={() => {
                      handleNavigation('/#latest-works');
                      setIsOpen(false);
                    }}
                  >
                    <span className="text-2xl">🚀</span>
                    <span>Latest Works</span>
                  </Link>
                  <Link
                    to="/#contact"
                    className="mobile-nav-link flex items-center space-x-3 px-6 py-3 w-full max-w-sm rounded-xl text-lg font-medium transition-all duration-200 hover:bg-primary-50 dark:hover:bg-gray-800"
                    onClick={() => {
                      handleNavigation('/#contact');
                      setIsOpen(false);
                    }}
                  >
                    <span className="text-2xl">📬</span>
                    <span>Contact</span>
                  </Link>
                  <Link
                    to="/blog"
                    className="mobile-nav-link flex items-center space-x-3 px-6 py-3 w-full max-w-sm rounded-xl text-lg font-medium transition-all duration-200 hover:bg-primary-50 dark:hover:bg-gray-800"
                    onClick={() => {
                      handleNavigation('/blog');
                      setIsOpen(false);
                    }}
                  >
                    <span className="text-2xl">✍️</span>
                    <span>Blog</span>
                  </Link>

                  {/* Current Tech Stack Display */}
                  <div className="mt-8 px-6 w-full max-w-sm">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-primary-50/50 to-primary-100/50 dark:from-gray-800/50 dark:to-gray-700/50">
                      <h3 className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-3">
                        Currently Working With
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {currentTechStack.map((tech, index) => (
                          <motion.span
                            key={index}
                            className="px-3 py-1 rounded-lg text-sm bg-white/80 dark:bg-gray-800/80 shadow-sm"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            {tech.icon} {tech.name}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
