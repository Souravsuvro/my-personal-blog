import { ReactNode } from 'react';

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
  proficiency?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  lastUsed?: string;
  relatedSkills?: string[];
  resources?: {
    title: string;
    url: string;
    type: 'documentation' | 'tutorial' | 'course' | 'article';
  }[];
}
