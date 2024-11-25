export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  coverImage?: string;
  categories?: BlogCategory[];
  tags?: string[];
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

export interface BlogListProps {
  posts: BlogPost[];
  title?: string;
  description?: string;
  isHomePage?: boolean;
  searchQuery?: string;
  hideHeader?: boolean;
}

export interface BlogCardProps {
  post: BlogPost;
}
