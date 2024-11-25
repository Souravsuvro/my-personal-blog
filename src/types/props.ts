import { ReactNode } from 'react';
import { Theme } from '@/styles/theme/types';
import { Project, Skill, Contact, SEO } from './index';

// Shared Props
export interface BaseProps {
  className?: string;
  id?: string;
  style?: React.CSSProperties;
}

export interface AnimationProps {
  animate?: boolean;
  initial?: boolean | object;
  transition?: object;
  variants?: object;
}

export interface ChildrenProps {
  children: ReactNode;
}

// Layout Props
export interface LayoutProps extends BaseProps {
  theme?: Theme;
}

export interface NavbarProps extends BaseProps {
  transparent?: boolean;
  onMenuClick?: () => void;
}

// Section Props
export interface SectionProps extends BaseProps, AnimationProps {
  title?: string;
  subtitle?: string;
}

// Hero Props
export interface HeroProps extends SectionProps {
  name: string;
  title: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
}

// About Props
export interface AboutProps extends SectionProps {
  content: string;
  image?: string;
  resumeLink?: string;
}

// Skills Props
export interface SkillsProps extends SectionProps {
  skills: Skill[];
  categories?: string[];
}

export interface SkillCardProps extends BaseProps {
  skill: Skill;
  index: number;
}

// Projects Props
export interface ProjectsProps extends SectionProps {
  projects: Project[];
  filter?: string[];
}

export interface ProjectCardProps extends BaseProps {
  project: Project;
  index: number;
}

// Contact Props
export interface ContactProps extends SectionProps {
  contact: Contact;
  formEndpoint?: string;
}

export interface ContactFormProps extends BaseProps {
  onSubmit: (data: any) => void;
  loading?: boolean;
}

// UI Component Props
export interface ButtonProps extends BaseProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isFullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  children?: ReactNode;
}

export interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  icon: ReactNode;
  tooltip?: string;
}

export interface CardProps extends BaseProps, AnimationProps {
  hover?: boolean;
  elevation?: number;
  children: ReactNode;
}

export interface ImageProps extends BaseProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  lazy?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill';
  placeholder?: string;
}

export interface InputProps extends BaseProps {
  type?: string;
  name: string;
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  name: string;
  value: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  cols?: number;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  readOnly?: boolean;
  autoFocus?: boolean;
  spellCheck?: boolean;
  wrap?: 'soft' | 'hard';
}

// Loading Props
export interface LoadingProps extends BaseProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
}

// Error Props
export interface ErrorProps extends BaseProps {
  error?: Error | null;
  message?: string;
  retry?: () => void;
}

// SEO Props
export interface SEOProps extends SEO {
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

// Modal Props
export interface ModalProps extends BaseProps, AnimationProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'small' | 'medium' | 'large';
  children: ReactNode;
}

// Toast Props
export interface ToastProps extends BaseProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose?: () => void;
}

// Theme Props
export interface ThemeProviderProps extends ChildrenProps {
  theme: Theme;
}
