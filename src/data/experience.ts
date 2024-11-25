interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  type: string;
  description: string;
  technologies: string[];
  link?: string;
}

export const experiences: Experience[] = [
  {
    company: "Sofilite LLC",
    role: "Creative Web Designer",
    duration: "Jan 2023–Now",
    location: "Texas, USA",
    type: "Full-time",
    description: "Leading the design and development of modern web applications, focusing on creating exceptional user experiences and implementing best practices in web development.",
    technologies: ["React", "TypeScript", "Next.js", "Styled Components", "Framer Motion", "TailwindCSS"],
    link: "https://sofilite.com"
  },
  {
    company: "Worldwide Services",
    role: "Web Designer and IT Support",
    duration: "Jan 2023–Jul 2023",
    location: "London, UK",
    type: "Contract",
    description: "Developed and maintained responsive web applications while providing comprehensive IT support. Implemented modern design principles and ensured optimal performance across platforms.",
    technologies: ["React", "JavaScript", "HTML/CSS", "WordPress", "UI/UX Design", "System Administration"],
    link: "https://worldwide-services.com"
  },
  {
    company: "Friends Cars Ltd",
    role: "Web Developer and IT Support",
    duration: "2022–2023",
    location: "Lingfield, UK",
    type: "Full-time",
    description: "Spearheaded web development projects and managed IT infrastructure. Created custom solutions to streamline business operations and enhance customer experience.",
    technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap", "WordPress", "Network Administration"],
    link: "https://friendscars.co.uk"
  },
  {
    company: "Krittim Tech",
    role: "CEO & Lead Developer",
    duration: "Sep 2019–Now",
    location: "Syl, Bangladesh",
    type: "Founder",
    description: "Founded and leading a technology company specializing in web development and software solutions. Overseeing project development, client relations, and technical innovation.",
    technologies: ["React", "Node.js", "MongoDB", "Express", "AWS", "Project Management"],
    link: "https://krittimtech.com"
  }
];
