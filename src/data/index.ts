import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  readTime: string;
  tags: string[];
}

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
    name: 'Blog',
    path: '/#blog'
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

export interface Skill {
  name: string;
  category: 'Web Development' | 'Design Tools' | 'Video & Animation';
  level: number;
  description: string;
}

export const skills: Skill[] = [
  {
    name: "React",
    category: "Web Development",
    level: 5,
    description: "Building modern web applications with React and its ecosystem"
  },
  {
    name: "TypeScript",
    category: "Web Development",
    level: 4,
    description: "Developing type-safe applications with enhanced developer experience"
  },
  {
    name: "Node.js",
    category: "Web Development",
    level: 4,
    description: "Creating scalable backend services and APIs"
  },
  {
    name: "Next.js",
    category: "Web Development",
    level: 4,
    description: "Developing SEO-friendly, server-side rendered React applications"
  },
  {
    name: "GraphQL",
    category: "Web Development",
    level: 3,
    description: "Building efficient, flexible APIs with GraphQL"
  },
  {
    name: "Vue.js",
    category: "Web Development",
    level: 4,
    description: "Creating dynamic user interfaces with Vue.js ecosystem"
  },
  {
    name: "TailwindCSS",
    category: "Web Development",
    level: 4,
    description: "Crafting responsive UIs with utility-first CSS framework"
  },
  {
    name: "Figma",
    category: "Design Tools",
    level: 4,
    description: "Creating modern UI/UX designs and prototypes"
  },
  {
    name: "Adobe XD",
    category: "Design Tools",
    level: 3,
    description: "Designing user interfaces and interactive prototypes"
  },
  {
    name: "Photoshop",
    category: "Design Tools",
    level: 4,
    description: "Image editing and graphic design for web assets"
  },
  {
    name: "Illustrator",
    category: "Design Tools",
    level: 3,
    description: "Vector graphics and logo design"
  },
  {
    name: "After Effects",
    category: "Video & Animation",
    level: 3,
    description: "Creating motion graphics and visual effects"
  },
  {
    name: "Premiere Pro",
    category: "Video & Animation",
    level: 4,
    description: "Video editing and post-production"
  }
];

export interface Project {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  category: 'Web Development' | 'Mobile Development' | 'UI/UX Design';
}

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    description: "A modern e-commerce analytics dashboard with real-time data visualization, inventory management, and sales tracking features.",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
    githubUrl: "https://github.com/yourusername/ecommerce-dashboard",
    liveUrl: "https://ecommerce-dashboard-demo.com",
    category: "Web Development"
  },
  {
    id: 2,
    title: "AI-Powered Task Manager",
    description: "Smart task management application that uses AI to prioritize tasks, suggest optimal schedules, and improve productivity.",
    coverImage: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    technologies: ["Next.js", "OpenAI API", "MongoDB", "Styled Components"],
    githubUrl: "https://github.com/yourusername/ai-task-manager",
    liveUrl: "https://ai-task-manager-demo.com",
    category: "Web Development"
  },
  {
    id: 3,
    title: "Social Media Analytics Platform",
    description: "Comprehensive social media analytics platform that provides insights, engagement metrics, and content performance analysis.",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    technologies: ["Vue.js", "Node.js", "PostgreSQL", "D3.js"],
    githubUrl: "https://github.com/yourusername/social-analytics",
    liveUrl: "https://social-analytics-demo.com",
    category: "Web Development"
  }
];

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

export const experiences: ExperienceData[] = [
  {
    id: 'exp-1',
    company: 'Sofilite LLC',
    position: 'Web Designer',
    location: '8700 Stonebrook Pkwy #34, Frisco, TX 75034, United States',
    startDate: 'Jul 2023',
    endDate: 'Present',
    description: 'Led development of scalable web applications frontend using Figma, React and TypeScript.',
    skills: ['React', 'TypeScript', 'Figma', 'Canva'],
    url: 'https://www.sofilite.com/'
  },
  {
    id: 'exp-2',
    company: 'Worldwide Services',
    position: 'Full Stack Developer',
    location: 'Remote',
    startDate: 'Jan 2023',
    endDate: 'Jul 2023',
    description: 'Developed and maintained full-stack financial applications using modern technologies.',
    skills: ['Vue.js', 'Laravel', 'MongoDB'],
    url: 'www.worldwidesvc.com'
  }
];

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  readTime: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Building a Modern React Portfolio with TypeScript",
    slug: "building-modern-react-portfolio",
    excerpt: "A deep dive into creating a performant and type-safe portfolio website using React, TypeScript, and Styled Components.",
    content: `
# Building a Modern React Portfolio with TypeScript

In this post, I'll share my experience and insights from building this portfolio website using modern web technologies. We'll explore the benefits of TypeScript, the power of Styled Components, and how to create smooth animations with Framer Motion.

## Why TypeScript?

TypeScript has become an essential tool in modern web development. Here's why I chose it for this project:

1. Better Developer Experience
2. Catch Errors Early
3. Enhanced IDE Support
4. Improved Code Maintainability

## Styling with Styled Components

Styled Components has been a game-changer for styling React applications. It allows us to:

- Write CSS in JavaScript
- Create reusable styled components
- Use props for dynamic styling
- Implement theming easily

## Animation with Framer Motion

Adding smooth animations can greatly enhance user experience. Framer Motion makes it easy to:

- Create page transitions
- Animate components on mount
- Handle gesture animations
- Implement scroll animations

## Project Structure

Here's how I organized the project:

\`\`\`
src/
  ├── components/
  ├── pages/
  ├── styles/
  ├── types/
  └── utils/
\`\`\`

## Key Features

1. **Responsive Design**
   - Mobile-first approach
   - Fluid typography
   - Adaptive layouts

2. **Performance Optimization**
   - Code splitting
   - Image optimization
   - Lazy loading

3. **Dark Mode Support**
   - System preference detection
   - Smooth theme transitions
   - Persistent user preference

4. **Accessibility**
   - Semantic HTML
   - ARIA attributes
   - Keyboard navigation

## Technical Implementation

### Theme System

\`\`\`typescript
const theme = {
  colors: {
    primary: '#0070f3',
    secondary: '#00f7ff',
    background: {
      light: '#ffffff',
      dark: '#000000'
    }
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px'
  }
};
\`\`\`

### Animation Example

\`\`\`typescript
const fadeInVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};
\`\`\`

## Conclusion

Building a portfolio with React and TypeScript has been an excellent learning experience. The combination of these modern tools has helped create a performant and maintainable website.

Feel free to explore the [source code](https://github.com/yourusername/portfolio) and reach out if you have any questions!
    `,
    coverImage: "/images/blog/portfolio.jpg",
    date: "2023-12-15",
    readTime: "8 min read",
    tags: ["React", "TypeScript", "Web Development", "Portfolio"]
  },
  {
    id: 2,
    title: "Getting Started with React and TypeScript",
    slug: "getting-started-with-react-typescript",
    excerpt: "Learn how to set up a new React project with TypeScript and understand the basics of type-safe components.",
    content: `
# Getting Started with React and TypeScript

TypeScript has become an essential tool in modern React development. In this guide, we'll explore how to set up a new React project with TypeScript and understand the basics of creating type-safe components.

## Setting Up Your Project

First, let's create a new React project with TypeScript support using Vite:

\`\`\`bash
npm create vite@latest my-react-app -- --template react-ts
cd my-react-app
npm install
\`\`\`

## Understanding TypeScript in React

TypeScript adds static typing to JavaScript, which helps catch errors early in development. Here's a simple example of a typed React component:

\`\`\`typescript
interface ButtonProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};
\`\`\`

## Benefits of TypeScript

1. Better IDE support
2. Catch errors early
3. Improved code documentation
4. Enhanced refactoring capabilities

Stay tuned for more advanced TypeScript and React patterns!
    `,
    coverImage: "/images/blog/typescript-react.jpg",
    date: "2023-12-01",
    readTime: "5 min read",
    tags: ["React", "TypeScript", "Web Development"]
  },
  {
    id: 3,
    title: "Modern CSS Techniques Every Developer Should Know",
    slug: "modern-css-techniques",
    excerpt: "Explore the latest CSS features and techniques that can enhance your web development workflow.",
    content: `
# Modern CSS Techniques Every Developer Should Know

CSS has evolved significantly over the years, introducing powerful features that make web development more efficient and enjoyable. Let's explore some modern CSS techniques that you should be using in your projects.

## CSS Grid Layout

CSS Grid has revolutionized how we create layouts:

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
\`\`\`

## CSS Custom Properties (Variables)

Variables make your styles more maintainable:

\`\`\`css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
}

.button {
  background-color: var(--primary-color);
  border: 1px solid var(--primary-color);
}
\`\`\`

## Modern Selectors

Take advantage of powerful selectors:

\`\`\`css
/* Select all elements that contain "grid" in their class */
[class*="grid"] {
  display: grid;
}

/* Style the first letter of a paragraph */
p::first-letter {
  font-size: 2em;
  font-weight: bold;
}
\`\`\`

Stay tuned for more CSS tips and tricks!
    `,
    coverImage: "/images/blog/modern-css.jpg",
    date: "2023-12-05",
    readTime: "4 min read",
    tags: ["CSS", "Web Development", "Frontend"]
  }
];
