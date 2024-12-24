import * as React from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { FiMoon, FiSun, FiMenu, FiX, FiHome, FiUser, FiEdit3, FiCode, FiSend } from 'react-icons/fi';
import { motion } from 'framer-motion';

const navItems = [
  { name: 'Home', path: '/', icon: FiHome },
  { name: 'About', path: '/#about', icon: FiUser },
  { name: 'Blog', path: '/blog', icon: FiEdit3 },
  { name: 'Projects', path: '/#projects', icon: FiCode },
  { name: 'Contact', path: '/#contact', icon: FiSend },
];

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleNavigation = (path: string) => {
    setIsMobileMenuOpen(false);
    
    // If section link is clicked and we're on home page, just scroll
    if (path === '/#about' && location.pathname === '/') {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (path === '/#projects' && location.pathname === '/') {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (path === '/#contact' && location.pathname === '/') {
      const contactSection = document.getElementById('contact-section');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="navbar__container fixed w-full top-0 z-50 shadow-sm">
      <nav className={`navbar__wrapper px-4 py-4 ${theme === 'dark' ? 'bg-[#1E1E1E] text-white' : 'bg-white text-black'} transition-colors duration-300`}>
        <div className="navbar__content container mx-auto flex justify-between items-center">
          {/* Logo and Brand */}
          <div className="navbar__branding flex items-center space-x-3">
            <div className={`navbar__logo-container w-10 h-10 rounded-lg flex items-center justify-center 
              transition-all duration-300 
              ${theme === 'dark' 
                ? 'bg-gradient-to-br from-[#FFB800] via-[#FFA500] to-[#FF6347] text-black' 
                : 'bg-gradient-to-br from-[#113768] via-[#1E40AF] to-[#2563EB] text-white'} 
              hover:scale-110 hover:rotate-6`}>
              <span className="navbar__logo-text font-bold text-xl">SS</span>
            </div>
            <div>
              <h1 className={`navbar__title text-lg font-bold tracking-tight 
                ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                Sourav Suvra
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">
                Full Stack Developer and Digital Marketing Enthusiast
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar__desktop-menu hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`text-sm font-medium hover:text-[#FFB800] transition-colors duration-300 relative 
                  after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#FFB800] 
                  hover:after:w-full after:transition-all after:duration-300 
                  ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}
              >
                <item.icon className="w-4 h-4 mr-2 inline-block" />
                {item.name}
              </Link>
            ))}
            {/* Theme Switch for Desktop */}
            <button 
              onClick={toggleTheme} 
              className="navbar__theme-toggle focus:outline-none p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors group"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? 
                <FiSun className="w-5 h-5 text-[#FFB800] group-hover:rotate-180 transition-transform duration-300" /> : 
                <FiMoon className="w-5 h-5 text-gray-600 group-hover:rotate-180 transition-transform duration-300" />
              }
            </button>
          </div>

          {/* Mobile Menu Controls */}
          <div className="navbar__mobile-controls flex md:hidden items-center space-x-2">
            <button 
              onClick={toggleTheme} 
              className="navbar__theme-toggle p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? 
                <FiSun className="w-5 h-5 text-[#FFB800]" /> : 
                <FiMoon className="w-5 h-5 text-gray-600" />
              }
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="navbar__mobile-menu-toggle p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? 
                <FiX className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`} /> : 
                <FiMenu className={`w-5 h-5 ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`} />
              }
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`navbar__mobile-menu fixed inset-0 z-50 md:hidden ${theme === 'dark' ? 'bg-[#1E1E1E]/95' : 'bg-white/95'} backdrop-blur-sm`}
          >
            {/* Close button */}
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors group"
              aria-label="Close menu"
            >
              <FiX className={`w-6 h-6 group-hover:rotate-180 transition-transform duration-300 ${theme === 'dark' ? 'text-white' : 'text-gray-600'}`} />
            </motion.button>

            <div className="h-full flex items-center justify-center">
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ staggerChildren: 0.1 }}
                className="flex flex-col items-center space-y-6"
              >
                {navItems.map((item) => (
                  <motion.div
                    key={item.path}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={`text-xl font-medium py-2 px-4 hover:text-[#FFB800] transition-colors duration-300 relative 
                        flex items-center space-x-3
                        after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-[#FFB800] 
                        hover:after:w-full after:transition-all after:duration-300 
                        ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}
                    >
                      <item.icon className="w-6 h-6 mr-2" />
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
                {/* Theme Switch for Mobile */}
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleTheme} 
                  className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors group"
                  aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                >
                  {theme === 'dark' ? 
                    <FiSun className="w-6 h-6 text-[#FFB800] group-hover:rotate-180 transition-transform duration-300" /> : 
                    <FiMoon className="w-6 h-6 text-gray-600 group-hover:rotate-180 transition-transform duration-300" />
                  }
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
