import { ReactNode } from 'react';
import { IconType } from 'react-icons';



// Layout Component Props
export interface LayoutProps {
  children: ReactNode;
}

export interface ContainerProps {
  children: ReactNode;
  fluid?: boolean;
  className?: string;
}

export interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  background?: 'primary' | 'secondary' | 'transparent';
}

// Navigation Component Props
export interface NavItemProps {
  label: string;
  path: string;
  icon?: IconType;
  external?: boolean;
}

export interface NavbarProps {
  transparent?: boolean;
}

// Button Component Props
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isFullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

// Card Component Props
export interface CardProps {
  children: ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
  className?: string;
  onClick?: () => void;
}

// Input Component Props
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  isInvalid?: boolean;
}

// Modal Component Props
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

// Toast Component Props
export interface ToastProps {
  id: string;
  title?: string;
  description: string;
  status?: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
  isClosable?: boolean;
}

// Loading Component Props
export type LoadingSize = 'sm' | 'md' | 'lg' | 'xl';

export interface LoadingProps {
  size?: LoadingSize;
  color?: string;
  fullscreen?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// SEO Component Props
export interface SEOProps {
  title: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

// Theme Toggle Props
export interface ThemeToggleProps {
  className?: string;
}

// Animation Props
export interface AnimateOnScrollProps {
  children: ReactNode;
  animation?: 'fadeIn' | 'fadeInUp' | 'fadeInDown' | 'scaleIn';
  duration?: number;
  delay?: number;
}

// Icon Props
export interface IconProps {
  icon: IconType;
  size?: number;
  color?: string;
  className?: string;
}

// Dropdown Props
export interface DropdownProps {
  trigger: ReactNode;
  children: ReactNode;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  offset?: number;
  className?: string;
}

// Tooltip Props
export interface TooltipProps {
  content: string;
  children: ReactNode;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
  className?: string;
}

// Badge Props
export interface BadgeProps {
  children: ReactNode;
  variant?: 'solid' | 'outline' | 'subtle';
  colorScheme?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
