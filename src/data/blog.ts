import { BlogPost } from '../types/blog';
import { author } from './author';

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Modern Web Applications with React and TypeScript',
    slug: 'building-modern-web-applications-react-typescript',
    excerpt: 'Learn how to leverage React and TypeScript to build scalable, type-safe web applications with modern best practices.',
    content: `
# Building Modern Web Applications with React and TypeScript

React and TypeScript have become the go-to combination for building modern web applications. In this comprehensive guide, we'll explore why this pairing is so powerful and how to make the most of it.

## Why TypeScript with React?

TypeScript adds static typing to JavaScript, which brings several benefits to React development:
- Catch errors early in development
- Better IDE support with intelligent code completion
- Improved code maintainability
- Self-documenting code through type definitions

## Getting Started

First, create a new React project with TypeScript:

\`\`\`bash
npx create-react-app my-app --template typescript
\`\`\`

## Key Concepts

### 1. Type-Safe Props

\`\`\`typescript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary' }) => {
  return (
    <button className={variant} onClick={onClick}>
      {label}
    </button>
  );
};
\`\`\`

### 2. Custom Hooks with TypeScript

\`\`\`typescript
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Implementation
}
\`\`\`

## Best Practices

1. Always define proper interfaces for your props
2. Use discriminated unions for complex state
3. Leverage TypeScript's utility types
4. Keep types close to where they're used

## Conclusion

React with TypeScript provides a robust foundation for building modern web applications. The initial setup cost is outweighed by the long-term benefits of type safety and improved developer experience.

## References
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [Official TypeScript Documentation](https://www.typescriptlang.org/docs/handbook/react.html)
- [Create React App TypeScript Documentation](https://create-react-app.dev/docs/adding-typescript/)
- [Microsoft's TypeScript-React-Starter](https://github.com/microsoft/TypeScript-React-Starter)
    `,
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
    publishedAt: '2024-01-15',
    updatedAt: '2024-01-15',
    author: {
      id: author.id,
      name: author.name,
      avatar: author.avatar,
      bio: author.bio,
      social: author.social
    },
    categories: ['web-development', 'react', 'typescript'],
    views: 1250,
    likes: 89
  },
  {
    id: '2',
    title: 'Mastering CSS Grid and Flexbox for Modern Layouts',
    slug: 'mastering-css-grid-flexbox-modern-layouts',
    excerpt: 'A deep dive into CSS Grid and Flexbox, exploring how to create responsive, dynamic layouts for modern websites.',
    content: `
# Mastering CSS Grid and Flexbox for Modern Layouts

CSS Grid and Flexbox are two powerful layout systems that have revolutionized how we build web layouts. Let's explore how to use them effectively.

## CSS Grid

### Grid Container Properties

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
\`\`\`

### Grid Areas

\`\`\`css
.grid-container {
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}
\`\`\`

## Flexbox

### Basic Flex Container

\`\`\`css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

### Flex Items

\`\`\`css
.flex-item {
  flex: 1;
  margin: 10px;
}
\`\`\`

## Combining Grid and Flexbox

The real power comes from knowing when to use each:
- Grid for 2D layouts (rows and columns)
- Flexbox for 1D layouts (rows OR columns)

## Best Practices

1. Use Grid for page-level layouts
2. Use Flexbox for component-level layouts
3. Consider mobile-first approach
4. Test across different screen sizes

## Resources
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [Grid by Example](https://gridbyexample.com/)
    `,
    coverImage: 'https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b',
    publishedAt: '2024-01-10',
    updatedAt: '2024-01-10',
    author: {
      id: author.id,
      name: author.name,
      avatar: author.avatar,
      bio: author.bio,
      social: author.social
    },
    categories: ['css', 'web-development'],
    views: 980,
    likes: 76
  },
  {
    id: '3',
    title: 'Getting Started with Next.js 14 and Server Components',
    slug: 'getting-started-nextjs-14-server-components',
    excerpt: 'Explore the latest features of Next.js 14, including Server Components, and learn how to build faster, more efficient web applications.',
    content: `
# Getting Started with Next.js 14 and Server Components

Next.js 14 introduces groundbreaking features that change how we build React applications. Let's dive into the most important aspects.

## What's New in Next.js 14?

- Improved Server Components
- Parallel Routes
- Intercepting Routes
- Server Actions (Beta)
- Turbopack improvements

## Server Components

### Understanding Server Components

Server Components allow you to:
- Reduce client-side JavaScript
- Access backend resources directly
- Improve initial page load
- Better SEO

### Example Implementation

\`\`\`typescript
// app/page.tsx
async function BlogPosts() {
  const posts = await getPosts(); // Direct database access

  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
\`\`\`

## App Router

### New File-System Based Router

\`\`\`
app/
  layout.tsx
  page.tsx
  blog/
    [slug]/
      page.tsx
    page.tsx
\`\`\`

## Data Fetching

### Server-Side Data Fetching

\`\`\`typescript
async function getData() {
  const res = await fetch('https://api.example.com/data');
  return res.json();
}
\`\`\`

## Best Practices

1. Use Server Components by default
2. Client Components when needed for interactivity
3. Implement proper loading states
4. Optimize images with next/image

## Conclusion

Next.js 14 represents a significant step forward in React development, offering improved performance and developer experience through Server Components and other new features.

## References
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js 14 Release Notes](https://nextjs.org/blog/next-14)
- [Next.js Learn Course](https://nextjs.org/learn)
    `,
    coverImage: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3',
    publishedAt: '2024-01-05',
    updatedAt: '2024-01-05',
    author: {
      id: author.id,
      name: author.name,
      avatar: author.avatar,
      bio: author.bio,
      social: author.social
    },
    categories: ['frameworks', 'react', 'nextjs'],
    views: 850,
    likes: 67
  },
  {
    id: '4',
    title: 'Advanced Git Workflows for Team Collaboration',
    slug: 'advanced-git-workflows-team-collaboration',
    excerpt: 'Learn advanced Git techniques and workflows to improve team collaboration and maintain a clean, efficient development process.',
    content: `
# Advanced Git Workflows for Team Collaboration

Effective Git workflows are crucial for team success. Let's explore advanced techniques to improve collaboration and code quality.

## Git Flow vs. Trunk-Based Development

### Git Flow
- Main/Master branch
- Develop branch
- Feature branches
- Release branches
- Hotfix branches

### Trunk-Based Development
- Single main branch
- Short-lived feature branches
- Frequent integration

## Advanced Git Commands

### Interactive Rebase

\`\`\`bash
# Cleanup commits before pushing
git rebase -i HEAD~3
\`\`\`

### Cherry-Picking

\`\`\`bash
# Apply specific commits to another branch
git cherry-pick <commit-hash>
\`\`\`

## Best Practices

### Commit Messages

\`\`\`
feat: add new login functionality

- Implement OAuth2 authentication
- Add remember me option
- Update user session handling

Closes #123
\`\`\`

### Branch Naming

\`\`\`
feature/user-authentication
bugfix/login-error
hotfix/security-patch
\`\`\`

## Advanced Techniques

### Git Hooks

\`\`\`bash
#!/bin/sh
# pre-commit hook
npm run lint && npm test
\`\`\`

### Git Aliases

\`\`\`bash
[alias]
  st = status
  co = checkout
  br = branch
  ci = commit
\`\`\`

## Conclusion

Mastering Git workflows and advanced techniques can significantly improve team productivity and code quality. Choose the workflow that best fits your team's needs and consistently follow best practices.

## References
- [Trunk Based Development](https://trunkbaseddevelopment.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Best Practices](https://github.com/git-tips/tips)
    `,
    coverImage: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498',
    publishedAt: '2024-01-01',
    updatedAt: '2024-01-01',
    author: {
      id: author.id,
      name: author.name,
      avatar: author.avatar,
      bio: author.bio,
      social: author.social
    },
    categories: ['development-tools', 'git', 'workflow'],
    views: 620,
    likes: 45
  },
];
