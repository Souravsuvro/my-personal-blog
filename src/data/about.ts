interface Skill {
  name: string;
  icon: string;
}

interface Card {
  title: string;
  description: string;
  icon: string;
  skills: Skill[];
}

export const aboutText = {
  title: "About Me",
  subtitle: "Building digital experiences with passion and precision",
  intro: "Hi! I'm Sourav, a passionate web developer and designer with a keen eye for creating beautiful, functional, and user-friendly websites. I specialize in building exceptional digital experiences using modern web technologies. With a strong foundation in both frontend and backend development, I strive to create solutions that are not only visually appealing but also performant and scalable.",
  cards: [
    {
      title: "Frontend Development",
      description: "Creating responsive and interactive user interfaces with modern web technologies",
      icon: "code",
      skills: [
        { name: "React", icon: "react" },
        { name: "TypeScript", icon: "typescript" },
        { name: "Next.js", icon: "nextjs" },
        { name: "Styled Components", icon: "styled" }
      ]
    },
    {
      title: "Backend Development",
      description: "Building robust and scalable server-side applications and APIs",
      icon: "server",
      skills: [
        { name: "Node.js", icon: "nodejs" },
        { name: "Python", icon: "python" },
        { name: "GraphQL", icon: "graphql" },
        { name: "PostgreSQL", icon: "postgresql" }
      ]
    },
    {
      title: "Design & UI/UX",
      description: "Crafting beautiful and intuitive user experiences with attention to detail",
      icon: "design",
      skills: [
        { name: "Figma", icon: "figma" },
        { name: "Adobe XD", icon: "xd" },
        { name: "Photoshop", icon: "photoshop" },
        { name: "Illustrator", icon: "illustrator" }
      ]
    }
  ]
};
