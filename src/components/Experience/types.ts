import { ReactNode } from 'react';

export interface ExperienceCardProps {
  experience: ExperienceData;
  index: number;
}

export interface ExperienceData {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  skills?: string[];
  logo?: string;
  url?: string;
}

export interface TimelineDotProps {
  icon?: ReactNode;
  animate?: boolean;
}

export interface MetaInfoProps {
  icon: ReactNode;
  text: string;
}

export interface ExperienceSectionProps {
  className?: string;
  id?: string;
}
