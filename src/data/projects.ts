import { Project } from '../types';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'other';
}

export const projects: Project[] = [
  {
    id: '1',
    title: 'Personal Portfolio Website',
    description: 'A modern, responsive portfolio website built with React, TypeScript, and Styled Components. Features dark mode, blog functionality, and smooth animations.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    technologies: ['React', 'TypeScript', 'Styled Components', 'Framer Motion'],
    liveUrl: 'https://souravsuvra.com',
    githubUrl: 'https://github.com/souravsuvra/portfolio',
    featured: true,
    category: 'frontend'
  },
  {
    id: '2',
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce solution with features like product management, cart functionality, payment integration, and order tracking.',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
    liveUrl: 'https://ecommerce-demo.souravsuvra.com',
    githubUrl: 'https://github.com/souravsuvra/ecommerce',
    featured: true,
    category: 'fullstack'
  },
  {
    id: '3',
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates, team workspaces, and progress tracking.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    technologies: ['React', 'Firebase', 'Material-UI', 'Redux'],
    liveUrl: 'https://taskmanager.souravsuvra.com',
    githubUrl: 'https://github.com/souravsuvra/taskmanager',
    featured: true,
    category: 'frontend'
  },
  {
    id: '4',
    title: 'Weather Dashboard',
    description: 'Real-time weather monitoring dashboard with location-based forecasts, historical data, and weather alerts.',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    technologies: ['React', 'OpenWeather API', 'Chart.js', 'Tailwind CSS'],
    liveUrl: 'https://weather.souravsuvra.com',
    githubUrl: 'https://github.com/souravsuvra/weather',
    featured: false,
    category: 'frontend'
  },
  {
    id: '5',
    title: 'Social Media API',
    description: 'RESTful API for a social media platform with features like user authentication, posts, comments, and real-time notifications.',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
    technologies: ['Node.js', 'Express', 'MongoDB', 'Socket.io', 'JWT'],
    githubUrl: 'https://github.com/souravsuvra/social-api',
    featured: false,
    category: 'backend'
  }
];
