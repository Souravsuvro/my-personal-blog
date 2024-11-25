export const aboutText = {
  title: "About Me",
  description: `I'm a passionate web designer and developer with a keen eye for detail and a commitment to delivering exceptional digital experiences. With expertise in both design and development, I bridge the gap between aesthetics and functionality to create websites that not only look beautiful but also perform seamlessly.`,
  intro: `As a versatile web professional, I specialize in transforming complex ideas into elegant, user-friendly digital solutions. My approach combines creative design with robust technical implementation.`,
  features: [
    {
      icon: "code",
      title: "Web Development",
      description: "Building responsive and performant web applications using modern technologies and best practices."
    },
    {
      icon: "paint",
      title: "UI/UX Design",
      description: "Creating intuitive and visually appealing user interfaces that enhance user experience."
    },
    {
      icon: "bulb",
      title: "Digital Strategy",
      description: "Developing comprehensive digital strategies to help businesses achieve their online goals."
    },
    {
      icon: "users",
      title: "Team Collaboration",
      description: "Working effectively with cross-functional teams to deliver successful projects."
    }
  ]
};

interface Skill {
  name: string;
  category: 'Web Development' | 'Design Tools' | 'Video & Animation';
  level: number;
  description?: string;
  relatedSkills?: string[];
}

export const skills: Skill[] = [
  // Web Development
  {
    name: 'React.js',
    category: 'Web Development',
    level: 5,
    description: 'Expert in building scalable web applications with React.js, including hooks, context, and modern patterns.',
    relatedSkills: ['Redux', 'Next.js', 'TypeScript', 'React Router']
  },
  {
    name: 'TypeScript',
    category: 'Web Development',
    level: 4,
    description: 'Strong proficiency in TypeScript for building type-safe applications with improved developer experience.',
    relatedSkills: ['JavaScript', 'Node.js', 'Angular']
  },
  {
    name: 'Node.js',
    category: 'Web Development',
    level: 4,
    description: 'Experienced in building backend services and RESTful APIs using Node.js and Express.',
    relatedSkills: ['Express.js', 'MongoDB', 'REST APIs']
  },
  {
    name: 'HTML5/CSS3',
    category: 'Web Development',
    level: 5,
    description: 'Expert in modern HTML5 and CSS3 features, including Grid, Flexbox, and CSS animations.',
    relatedSkills: ['SASS/SCSS', 'Bootstrap', 'Tailwind CSS']
  },
  {
    name: 'GraphQL',
    category: 'Web Development',
    level: 3,
    description: 'Proficient in building and consuming GraphQL APIs with Apollo Client and Server.',
    relatedSkills: ['Apollo', 'REST APIs', 'API Design']
  },

  // Design Tools
  {
    name: 'Figma',
    category: 'Design Tools',
    level: 4,
    description: 'Proficient in creating modern UI designs, prototypes, and design systems using Figma.',
    relatedSkills: ['Adobe XD', 'Sketch', 'UI Design']
  },
  {
    name: 'Adobe XD',
    category: 'Design Tools',
    level: 4,
    description: 'Experienced in creating wireframes, prototypes, and interactive designs using Adobe XD.',
    relatedSkills: ['Figma', 'UI/UX Design', 'Prototyping']
  },
  {
    name: 'Photoshop',
    category: 'Design Tools',
    level: 3,
    description: 'Skilled in image editing, manipulation, and creating visual assets for web projects.',
    relatedSkills: ['Illustrator', 'Image Editing', 'Visual Design']
  },

  // Video & Animation
  {
    name: 'After Effects',
    category: 'Video & Animation',
    level: 3,
    description: 'Capable of creating engaging motion graphics and animations for web and video projects.',
    relatedSkills: ['Motion Graphics', 'Animation', 'Video Editing']
  },
  {
    name: 'Premiere Pro',
    category: 'Video & Animation',
    level: 3,
    description: 'Experienced in video editing and post-production for web content and promotional materials.',
    relatedSkills: ['Video Editing', 'Color Grading', 'Audio Editing']
  }
];

export const experiences = [
  {
    title: "Senior Frontend Developer",
    company: "Tech Innovators Inc.",
    location: "Remote",
    duration: "2021 - Present",
    description: "Leading frontend development for enterprise web applications, mentoring junior developers, and implementing modern development practices.",
    achievements: [
      "Reduced application load time by 40% through performance optimizations",
      "Implemented automated testing that increased code coverage to 85%",
      "Led the migration from JavaScript to TypeScript across multiple projects"
    ]
  },
  {
    title: "UI/UX Designer",
    company: "Creative Solutions Ltd.",
    location: "London, UK",
    duration: "2019 - 2021",
    description: "Designed user interfaces for web and mobile applications, created design systems, and conducted user research.",
    achievements: [
      "Redesigned main product interface resulting in 25% increase in user engagement",
      "Created comprehensive design system used across 10+ projects",
      "Improved mobile conversion rate by 35% through UX optimizations"
    ]
  },
  {
    title: "Web Developer",
    company: "Digital Agency Co.",
    location: "New York, USA",
    duration: "2017 - 2019",
    description: "Developed responsive websites and web applications for various clients using modern web technologies.",
    achievements: [
      "Successfully delivered 20+ client projects on time and within budget",
      "Implemented responsive design principles improving mobile usability by 45%",
      "Integrated various third-party APIs and payment gateways"
    ]
  }
];

export const projects = [
  {
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform built with React, Node.js, and MongoDB. Includes features like product search, cart management, and secure payments.",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    imageUrl: "/images/projects/ecommerce.jpg",
    liveUrl: "https://example.com/ecommerce",
    githubUrl: "https://github.com/username/ecommerce",
    featured: true
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, team collaboration features, and detailed analytics.",
    technologies: ["React", "Firebase", "Material-UI", "Chart.js"],
    imageUrl: "/images/projects/taskmanager.jpg",
    liveUrl: "https://example.com/taskmanager",
    githubUrl: "https://github.com/username/taskmanager"
  },
  {
    title: "Portfolio Website",
    description: "A modern portfolio website showcasing my work and skills. Built with React and styled-components, featuring smooth animations and responsive design.",
    technologies: ["React", "TypeScript", "Styled Components", "Framer Motion"],
    imageUrl: "/images/projects/portfolio.jpg",
    liveUrl: "https://example.com/portfolio",
    githubUrl: "https://github.com/username/portfolio",
    featured: true
  }
];

export const blogPosts = [
  {
    id: 1,
    title: "Modern Web Development Practices",
    slug: "modern-web-development-practices",
    excerpt: "Exploring the latest trends and best practices in modern web development.",
    content: "Content coming soon...",
    date: "2023-12-01",
    readTime: "5 min",
    image: "/images/blog/web-dev.jpg",
    tags: ["Web Development", "React", "JavaScript"]
  },
  {
    id: 2,
    title: "The Art of UI/UX Design",
    slug: "art-of-ui-ux-design",
    excerpt: "Understanding the principles of creating user-friendly interfaces.",
    content: "Content coming soon...",
    date: "2023-11-15",
    readTime: "4 min",
    image: "/images/blog/ui-ux.jpg",
    tags: ["Design", "UI/UX", "User Experience"]
  },
  {
    id: 3,
    title: "TypeScript Best Practices",
    slug: "typescript-best-practices",
    excerpt: "Tips and tricks for writing better TypeScript code.",
    content: "Content coming soon...",
    date: "2023-11-01",
    readTime: "6 min",
    image: "/images/blog/typescript.jpg",
    tags: ["TypeScript", "JavaScript", "Development"]
  }
];

export const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '#about' },
  { name: 'Projects', path: '#projects' },
  { name: 'Blog', path: '#blog' },
  { name: 'Contact', path: '#contact' }
];

export const socialLinks = [
  { url: 'https://github.com/yourusername' },
  { url: 'https://linkedin.com/in/yourusername' },
  { url: 'https://twitter.com/yourusername' }
];
