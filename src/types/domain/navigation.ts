import { IconType } from 'react-icons';
import { ReactNode } from 'react';

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
  icon?: ReactNode;
  title?: string;
}

export interface MenuItem {
  id: string;
  label: string;
  path: string;
  icon?: ReactNode;
  external?: boolean;
  children?: MenuItem[];
}

export interface BreadcrumbItem {
  label: string;
  path: string;
  icon?: IconType;
}

export interface NavigationState {
  currentPath: string;
  previousPath?: string;
  breadcrumbs: BreadcrumbItem[];
  isMenuOpen: boolean;
  isMobileMenuOpen: boolean;
}
