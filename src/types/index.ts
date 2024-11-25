import { IconType } from 'react-icons';
import { ExperienceData } from '../components/Experience/types';
import { ReactNode } from 'react';

export * from './domain';
export * from './props';
export * from './components';
export * from './blog';

// Re-export common types
export type { ReactNode } from 'react';
export type { IconType } from 'react-icons';

export type { ExperienceData };

export interface Experience {
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string[];
}

export interface SocialLink {
  name: string;
  url: string;
  Icon: IconType;
}

export interface AboutText {
  greeting: string;
  introduction: string;
  description: string[];
}

export interface NavLink {
  name: string;
  path: string;
  title: string;
  icon?: IconType;
}

export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon?: React.ReactNode;
  title?: string;
}

export interface TagProps {
  name: string;
  count?: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: 'Web Development' | 'App Development' | 'Web Design' | 'UI/UX Design' | 'Machine Learning' | 'Artificial Intelligence';
}

export interface Skill {
  id: string;
  name: string;
  icon: ReactNode;
  level: number;
  category: string;
  description?: string;
  yearsOfExperience?: number;
  certifications?: {
    name: string;
    issuer: string;
    date: string;
    url?: string;
  }[];
  projects?: string[]; // Reference to project IDs
}

export interface Contact {
  email: string;
  phone?: string;
  location: {
    city: string;
    country: string;
    timezone?: string;
  };
  availability?: {
    status: 'available' | 'busy' | 'not-available';
    message?: string;
  };
  social: {
    github: string;
    linkedin: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    medium?: string;
  };
  preferredContact?: 'email' | 'phone' | 'social';
  languages?: {
    language: string;
    level: 'native' | 'fluent' | 'intermediate' | 'basic';
  }[];
}

export interface SEO {
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  url: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  twitterHandle?: string;
  publishedAt?: string;
  modifiedAt?: string;
}

export interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon?: ReactNode;
  external?: boolean;
  children?: MenuItem[];
}

export interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone?: string;
  location: string;
  bio: string;
  avatar?: string;
  resume?: string;
  socialLinks: SocialLink[];
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
  data?: any;
}
