export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  social: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  updatedAt?: string;
  author: Author;
  categories: string[];
  views: number;
  likes: number;
  readingTime?: string;
  featured?: boolean;
}

export interface BlogGridProps {
  posts: BlogPost[];
  isLoading?: boolean;
  emptyStateTitle?: string;
  emptyStateMessage?: string;
  emptyStateAction?: {
    label: string;
    onClick: () => void;
  };
}

export interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured';
}
