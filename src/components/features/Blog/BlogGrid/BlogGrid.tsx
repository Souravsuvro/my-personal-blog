import React from 'react';
import { motion } from 'framer-motion';
import BlogCard from '../BlogCard/BlogCard';
import { Skeleton } from '@/components/shared/Skeleton';
import Button from '@/components/shared/Button';
import type { BlogGridProps } from '@/types/blog';
import { stagger, fadeInUp } from '@/utils/animations';
import { Grid, LoadingContainer, EmptyState } from './BlogGrid.styles';

export const BlogGrid: React.FC<BlogGridProps> = ({
  posts,
  isLoading = false,
  emptyStateTitle = 'No posts found',
  emptyStateMessage = 'Try adjusting your search or filters to find what you\'re looking for.',
  emptyStateAction,
}) => {
  if (isLoading) {
    return (
      <LoadingContainer>
        {[...Array(6)].map((_, index) => (
          <Skeleton key={index} height="400px" />
        ))}
      </LoadingContainer>
    );
  }

  if (!posts?.length) {
    return (
      <EmptyState>
        <motion.div variants={fadeInUp} initial="hidden" animate="visible">
          <h3>{emptyStateTitle}</h3>
          <p>{emptyStateMessage}</p>
          {emptyStateAction && (
            <Button onClick={emptyStateAction.onClick}>
              {emptyStateAction.label}
            </Button>
          )}
        </motion.div>
      </EmptyState>
    );
  }

  return (
    <Grid as={motion.div} variants={stagger} initial="hidden" animate="visible">
      {posts.map((post, index) => (
        <BlogCard
          key={post.id}
          post={post}
          variant={index === 0 ? 'featured' : 'default'}
        />
      ))}
    </Grid>
  );
};

export default BlogGrid;
