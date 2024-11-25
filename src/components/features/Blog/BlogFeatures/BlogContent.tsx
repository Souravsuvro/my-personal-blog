import React, { useMemo } from 'react';
import styled from 'styled-components';
import BlogGrid from '../BlogGrid/BlogGrid';
import Pagination from '@/components/shared/Pagination/Pagination';
import CategoryFilter from '../CategoryFilter/CategoryFilter';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';
import { categories } from '@/data/categories';

const POSTS_PER_PAGE = 6;

const ContentContainer = styled.div`
  margin-top: 2rem;
`;

const Stats = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing['6']};
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const StatItem = styled.span`
  &:not(:last-child)::after {
    content: '•';
    margin-left: 1rem;
    margin-right: 1rem;
    opacity: 0.5;
  }
`;

interface BlogContentProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  paginatedPosts: BlogPost[];
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

const BlogContent: React.FC<BlogContentProps> = ({
  selectedCategory,
  onCategoryChange,
  paginatedPosts,
  totalPages,
  currentPage,
  onPageChange,
  isLoading
}) => {
  const stats = useMemo(() => {
    return {
      totalPosts: paginatedPosts.length,
      totalViews: paginatedPosts.reduce((acc, post) => acc + (post.views || 0), 0),
      totalLikes: paginatedPosts.reduce((acc, post) => acc + (post.likes || 0), 0)
    };
  }, [paginatedPosts]);

  // Calculate post counts for each category
  const postCounts = useMemo(() => {
    const counts: Record<string, number> = { all: paginatedPosts.length };
    paginatedPosts.forEach(post => {
      post.categories.forEach(categoryId => {
        counts[categoryId] = (counts[categoryId] || 0) + 1;
      });
    });
    return counts;
  }, [paginatedPosts]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <ContentContainer>
      <Stats>
        <StatItem>{stats.totalPosts} Articles</StatItem>
        <StatItem>{stats.totalViews.toLocaleString()} Views</StatItem>
        <StatItem>{stats.totalLikes.toLocaleString()} Likes</StatItem>
      </Stats>
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onCategoryChange}
        postCounts={postCounts}
      />
      <BlogGrid posts={paginatedPosts} isLoading={isLoading} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </ContentContainer>
  );
};

export default BlogContent;
