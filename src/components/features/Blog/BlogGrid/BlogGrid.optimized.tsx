import React, { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntersectionObserver, useLazyImage, withMemoization } from '@/utils/performance';
import type { BlogGridProps, BlogPost } from '@/types/blog';
import { fadeInUp, stagger } from '@/utils/animations';
import BlogCard from '../BlogCard';
import {
  GridContainer,
  EmptyState,
  LoadingContainer,
} from './BlogGrid.styles';

const ITEMS_PER_PAGE = 12;
const SCROLL_THRESHOLD = 0.8;

const MemoizedBlogCard = withMemoization(BlogCard, 'BlogCard');

const BlogGridComponent: React.FC<BlogGridProps> = ({
  posts,
  loading,
  error,
  onLoadMore,
}) => {
  const [displayedPosts, setDisplayedPosts] = useState<BlogPost[]>(
    posts.slice(0, ITEMS_PER_PAGE)
  );
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Intersection observer for infinite scroll
  useIntersectionObserver(
    loadMoreRef,
    {
      threshold: SCROLL_THRESHOLD,
      rootMargin: '100px',
    },
    (entry) => {
      if (entry.isIntersecting && hasMore && !loading) {
        handleLoadMore();
      }
    }
  );

  // Handle load more with throttling
  const handleLoadMore = useCallback(() => {
    const currentLength = displayedPosts.length;
    const nextPosts = posts.slice(
      currentLength,
      currentLength + ITEMS_PER_PAGE
    );

    if (nextPosts.length > 0) {
      setDisplayedPosts((prev) => [...prev, ...nextPosts]);
      if (nextPosts.length < ITEMS_PER_PAGE) {
        setHasMore(false);
      }
    } else {
      setHasMore(false);
    }

    onLoadMore?.();
  }, [displayedPosts.length, posts, onLoadMore]);

  // Error state
  if (error) {
    return (
      <EmptyState>
        <h3>Error loading posts</h3>
        <p>{error}</p>
      </EmptyState>
    );
  }

  // Empty state
  if (!loading && displayedPosts.length === 0) {
    return (
      <EmptyState>
        <h3>No posts found</h3>
        <p>Try adjusting your search criteria</p>
      </EmptyState>
    );
  }

  return (
    <>
      <GridContainer
        variants={stagger}
        initial="hidden"
        animate="visible"
        viewport={{ once: true }}
      >
        <AnimatePresence mode="popLayout">
          {displayedPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={fadeInUp}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <MemoizedBlogCard post={post} />
            </motion.div>
          ))}
        </AnimatePresence>
      </GridContainer>

      {/* Loading state */}
      {loading && (
        <LoadingContainer>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Loading more posts...
          </motion.div>
        </LoadingContainer>
      )}

      {/* Infinite scroll trigger */}
      {hasMore && !loading && <div ref={loadMoreRef} style={{ height: 20 }} />}
    </>
  );
};

export const BlogGrid = withMemoization(BlogGridComponent, 'BlogGrid');
export default BlogGrid;
