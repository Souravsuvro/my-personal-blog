import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export interface NavLink {
  name: string;
  path: string;
}

export const navLinks: NavLink[] = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'About',
    path: '/#about'
  },
  {
    name: 'Projects',
    path: '/#projects'
  },
  {
    name: 'Contact',
    path: '/#contact'
  }
];

export interface SocialLink {
  name: string;
  url: string;
  Icon: typeof FaGithub | typeof FaLinkedin | typeof FaTwitter;
}

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/yourusername',
    Icon: FaGithub
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    Icon: FaLinkedin
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/yourusername',
    Icon: FaTwitter
  }
];
