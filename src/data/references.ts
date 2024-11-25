interface Reference {
  title: string;
  url: string;
  description: string;
  category: string;
}

export const references: Record<string, Reference[]> = {
  "React & TypeScript": [
    {
      title: "React TypeScript Cheatsheet",
      url: "https://react-typescript-cheatsheet.netlify.app/",
      description: "Comprehensive cheatsheet for using TypeScript with React, including best practices and common patterns.",
      category: "Documentation"
    },
    {
      title: "Official TypeScript Documentation",
      url: "https://www.typescriptlang.org/docs/handbook/react.html",
      description: "Official TypeScript documentation for React, covering type definitions and integration.",
      category: "Documentation"
    },
    {
      title: "Create React App TypeScript Documentation",
      url: "https://create-react-app.dev/docs/adding-typescript/",
      description: "Official guide for adding TypeScript to Create React App projects.",
      category: "Setup Guide"
    },
    {
      title: "Microsoft's TypeScript-React-Starter",
      url: "https://github.com/microsoft/TypeScript-React-Starter",
      description: "Microsoft's official starter template for React with TypeScript.",
      category: "Starter Template"
    },
    {
      title: "React + TypeScript: Component Patterns",
      url: "https://fettblog.eu/typescript-react-component-patterns/",
      description: "In-depth guide to React component patterns with TypeScript.",
      category: "Best Practices"
    }
  ],
  
  "CSS Layout": [
    {
      title: "MDN CSS Grid Guide",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout",
      description: "Comprehensive guide to CSS Grid Layout from Mozilla Developer Network.",
      category: "Documentation"
    },
    {
      title: "MDN Flexbox Guide",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout",
      description: "Complete guide to CSS Flexbox from Mozilla Developer Network.",
      category: "Documentation"
    },
    {
      title: "CSS-Tricks Complete Guide to Flexbox",
      url: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
      description: "Visual guide to CSS Flexbox with examples and use cases.",
      category: "Tutorial"
    },
    {
      title: "CSS-Tricks Complete Guide to Grid",
      url: "https://css-tricks.com/snippets/css/complete-guide-grid/",
      description: "Comprehensive visual guide to CSS Grid with practical examples.",
      category: "Tutorial"
    },
    {
      title: "Grid by Example",
      url: "https://gridbyexample.com/",
      description: "Collection of examples and patterns for CSS Grid layouts.",
      category: "Examples"
    }
  ],
  
  "Next.js": [
    {
      title: "Next.js Documentation",
      url: "https://nextjs.org/docs",
      description: "Official Next.js documentation covering all features and APIs.",
      category: "Documentation"
    },
    {
      title: "Next.js 14 Release Notes",
      url: "https://nextjs.org/blog/next-14",
      description: "Official release notes for Next.js 14, detailing new features and improvements.",
      category: "Release Notes"
    },
    {
      title: "React Server Components Documentation",
      url: "https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components",
      description: "Official React documentation on Server Components.",
      category: "Documentation"
    },
    {
      title: "Vercel Blog: Next.js App Router",
      url: "https://vercel.com/blog/next-js-app-router-parallel-routes",
      description: "Detailed explanation of the Next.js App Router and parallel routes.",
      category: "Blog Post"
    },
    {
      title: "Next.js Learn Course",
      url: "https://nextjs.org/learn",
      description: "Official interactive course for learning Next.js fundamentals.",
      category: "Tutorial"
    }
  ],
  
  "Git & Version Control": [
    {
      title: "Git Documentation",
      url: "https://git-scm.com/doc",
      description: "Official Git documentation with complete command reference.",
      category: "Documentation"
    },
    {
      title: "Atlassian Git Workflows Guide",
      url: "https://www.atlassian.com/git/tutorials/comparing-workflows",
      description: "Comprehensive guide to different Git workflows from Atlassian.",
      category: "Tutorial"
    },
    {
      title: "GitHub Flow Guide",
      url: "https://guides.github.com/introduction/flow/",
      description: "GitHub's recommended workflow for collaboration.",
      category: "Best Practices"
    },
    {
      title: "Trunk Based Development",
      url: "https://trunkbaseddevelopment.com/",
      description: "Detailed guide to trunk-based development practices.",
      category: "Methodology"
    },
    {
      title: "Conventional Commits",
      url: "https://www.conventionalcommits.org/",
      description: "Specification for adding human and machine-readable meaning to commit messages.",
      category: "Convention"
    },
    {
      title: "Git Best Practices",
      url: "https://github.com/git-tips/tips",
      description: "Collection of Git tips and best practices from the community.",
      category: "Best Practices"
    }
  ],
  
  "Additional Resources": [
    {
      title: "Web.dev",
      url: "https://web.dev/",
      description: "Google's resource for modern web development guidance.",
      category: "Learning Platform"
    },
    {
      title: "Smashing Magazine",
      url: "https://www.smashingmagazine.com/",
      description: "Professional web design and development articles.",
      category: "Magazine"
    },
    {
      title: "Frontend Masters",
      url: "https://frontendmasters.com/",
      description: "Advanced web development courses and workshops.",
      category: "Learning Platform"
    },
    {
      title: "JavaScript Weekly",
      url: "https://javascriptweekly.com/",
      description: "Weekly newsletter of JavaScript news and articles.",
      category: "Newsletter"
    },
    {
      title: "React Status",
      url: "https://react.statuscode.com/",
      description: "Weekly roundup of React news and articles.",
      category: "Newsletter"
    }
  ]
};
