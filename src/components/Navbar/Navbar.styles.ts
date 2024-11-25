import styled from 'styled-components';
import { Link, NavLink as RouterNavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ThemeProps {
  $scrolled?: boolean;
  $isDark?: boolean;
}

export const Nav = styled.nav<{ $scrolled: boolean; $isDark: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: ${({ theme, $scrolled }) =>
    $scrolled ? theme.colors.background.primary : 'transparent'};
  backdrop-filter: ${({ $scrolled }) =>
    $scrolled ? 'blur(8px)' : 'none'};
  transition: all 0.3s ease;
  box-shadow: ${({ $scrolled }) =>
    $scrolled ? '0 2px 4px rgba(0,0,0,0.1)' : 'none'};
`;

export const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Brand = styled(Link)<ThemeProps>`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: 700;
  color: ${({ $scrolled, $isDark }) => 
    $scrolled ? '#0070f3' : ($isDark ? '#fff' : '#0070f3')};
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

export const NavLinks = styled.div<ThemeProps>`
  display: flex;
  gap: 2rem;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const NavItem = styled.div<ThemeProps>`
  a {
    color: ${({ $scrolled, $isDark }) => 
      $scrolled ? '#0070f3' : ($isDark ? '#fff' : '#0070f3')};
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
    padding: 0.5rem;
    position: relative;

    &:hover {
      opacity: 0.8;
    }

    &.active {
      opacity: 1;
      font-weight: 600;
      color: ${({ $scrolled, $isDark }) => 
        $scrolled ? '#0070f3' : ($isDark ? '#fff' : '#0070f3')};
      text-shadow: ${({ $scrolled }) => 
        $scrolled ? 'none' : '0 0 10px rgba(255,255,255,0.3)'};
    }
  }
`;

export const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ThemeToggle = styled.button<ThemeProps>`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $scrolled, $isDark }) => 
    $scrolled ? '#0070f3' : ($isDark ? '#fff' : '#0070f3')};
  transition: color 0.3s ease;
  font-size: 1.25rem;

  &:hover {
    opacity: 0.8;
  }
`;

export const MobileMenuButton = styled.button<ThemeProps>`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  color: ${({ $scrolled, $isDark }) => 
    $scrolled ? '#0070f3' : ($isDark ? '#fff' : '#0070f3')};
  font-size: 1.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }

  &:hover {
    opacity: 0.8;
  }
`;

export const MobileMenu = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.background.primary};
  padding: 1.5rem;
  border-radius: 0 0 1rem 1rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  backdrop-filter: blur(8px);
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const MobileNavItem = styled.div`
  a {
    color: ${({ theme }) => theme.colors.text.primary};
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    display: block;
    background: transparent;

    &:hover {
      background: ${({ theme }) => theme.colors.background.secondary};
      opacity: 1;
    }

    &.active {
      font-weight: 600;
      color: ${({ theme }) => theme.colors.primary};
      background: ${({ theme }) => theme.colors.background.secondary};
    }
  }
`;