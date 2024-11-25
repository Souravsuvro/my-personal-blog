import { IconType } from 'react-icons';

export interface Experience {
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string[];
}

export interface ExperienceData {
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string[];
  technologies?: string[];
  achievements?: string[];
  role?: string;
  type?: 'full-time' | 'part-time' | 'contract' | 'internship';
  skills?: string[];
  team?: {
    size: number;
    role: string;
  };
}
