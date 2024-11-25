import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '@/context/ThemeContext';
import {
  Nav,
  NavContainer,
  Brand,
  NavLinks,
  NavItem,
  NavActions,
  ThemeToggle,
  MobileMenuButton,
  MobileMenu,
  MobileNavItem
} from './Navbar.styles';

interface NavItemType {
  id: string;
  label: string;
  path: string;
  isScroll?: boolean;
}

const navItems: NavItemType[] = [
  { id: 'home', label: 'Home', path: '/#hero', isScroll: true },
  { id: 'experience', label: 'Experience', path: '/#experience', isScroll: true },
  { id: 'projects', label: 'Projects', path: '/projects', isScroll: false },
  { id: 'live-projects', label: 'Live Projects', path: '/live-projects' },
  { id: 'blog', label: 'Blog', path: '/blog' },
  { id: 'contact', label: 'Contact', path: '/#contact', isScroll: true }
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  // Handle scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
      }, 100);
    }
  };

  // Handle initial scroll when page loads with hash
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const sectionId = location.hash.slice(1);
      scrollToSection(sectionId);
    }
  }, [location]);

  const handleNavClick = async (item: NavItemType, e: React.MouseEvent) => {
    if (item.isScroll) {
      e.preventDefault();
      const sectionId = item.path.split('#')[1];
      
      if (location.pathname !== '/') {
        // If we're not on the homepage, navigate first then scroll
        navigate('/');
        setTimeout(() => scrollToSection(sectionId), 100);
      } else {
        // If we're already on the homepage, just scroll
        scrollToSection(sectionId);
      }
    }
  };

  return (
    <Nav ref={navRef} $scrolled={scrolled} $isDark={isDark}>
      <NavContainer>
        <Brand
          to="/#hero"
          $scrolled={scrolled}
          $isDark={isDark}
          onClick={(e) => handleNavClick({ id: 'home', label: 'Home', path: '/#hero', isScroll: true }, e)}
        >
          Sourav Suvra
        </Brand>
        <NavLinks $isDark={isDark} $scrolled={scrolled}>
          {navItems.map((item) => (
            <NavItem key={item.id} $isDark={isDark} $scrolled={scrolled}>
              <NavLink
                to={item.path}
                className={({ isActive }) => (isActive && !item.isScroll ? 'active' : '')}
                onClick={(e) => handleNavClick(item, e)}
              >
                {item.label}
              </NavLink>
            </NavItem>
          ))}
        </NavLinks>
        <NavActions>
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ThemeToggle
              onClick={toggleTheme}
              $isDark={isDark}
              $scrolled={scrolled}
            >
              {isDark ? <FiSun /> : <FiMoon />}
            </ThemeToggle>
          </motion.div>
          <MobileMenuButton
            $isDark={isDark}
            $scrolled={scrolled}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </MobileMenuButton>
        </NavActions>
      </NavContainer>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'tween', duration: 0.2 }}
          >
            {navItems.map((item) => (
              <MobileNavItem key={item.id}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive && !item.isScroll ? 'active' : '')}
                  onClick={(e) => {
                    handleNavClick(item, e);
                    setMobileMenuOpen(false);
                  }}
                >
                  {item.label}
                </NavLink>
              </MobileNavItem>
            ))}
          </MobileMenu>
        )}
      </AnimatePresence>
    </Nav>
  );
};

export default Navbar;
