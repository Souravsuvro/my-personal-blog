import { useState, useEffect, useMemo } from 'react';
import { BlogPost } from '@/types/blog';
import { blogPosts } from '@/data/blogPosts';

interface UseBlogPostsReturn {
  posts: BlogPost[];
  isLoading: boolean;
  error: Error | null;
  stats: {
    totalViews: number;
    totalLikes: number;
    totalPosts: number;
  };
}

const CACHE_KEY = 'blogPosts';
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

interface CacheEntry {
  timestamp: number;
  data: BlogPost[];
}

export const useBlogPosts = (): UseBlogPostsReturn => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        // Check cache first
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { timestamp, data }: CacheEntry = JSON.parse(cached);
          const isValid = Date.now() - timestamp < CACHE_DURATION;
          
          if (isValid) {
            setPosts(data);
            setIsLoading(false);
            return;
          }
        }

        // Simulate network delay in development
        if (process.env.NODE_ENV === 'development') {
          await new Promise(resolve => setTimeout(resolve, 500));
        }

        // Set the blog posts
        setPosts(blogPosts);
        
        // Cache the posts
        const cacheEntry: CacheEntry = {
          timestamp: Date.now(),
          data: blogPosts
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheEntry));
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load blog posts'));
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  const stats = useMemo(() => ({
    totalViews: posts.reduce((acc, post) => acc + (post.views || 0), 0),
    totalLikes: posts.reduce((acc, post) => acc + (post.likes || 0), 0),
    totalPosts: posts.length
  }), [posts]);

  return { posts, isLoading, error, stats };
};

export default useBlogPosts;
