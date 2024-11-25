import React, { useState, lazy, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import DynamicImport from '@/components/shared/DynamicImport/DynamicImport';
import ErrorBoundary from '@/components/shared/ErrorBoundary/ErrorBoundary';
import { useBlogPosts } from '@/hooks/useBlogPosts';

const BlogHeader = lazy(() => import('@/components/features/Blog/BlogFeatures/BlogHeader'));
const BlogContent = lazy(() => import('@/components/features/Blog/BlogFeatures/BlogContent'));

const POSTS_PER_PAGE = 6;

const BlogSection = styled.section`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.primary};
  position: relative;
  padding-top: 80px; // Account for navbar height
`;

const Container = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 2rem 0;
  }
`;

const Blog: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { posts, isLoading, error } = useBlogPosts();
  
  const filteredPosts = useMemo(() => {
    if (selectedCategory === 'all') return posts;
    return posts.filter(post => post.categories.includes(selectedCategory));
  }, [selectedCategory, posts]);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, endIndex);
  }, [currentPage, filteredPosts]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  if (error) {
    return (
      <BlogSection>
        <Container>
          <h2>Error loading blog posts</h2>
          <p>{error.message}</p>
        </Container>
      </BlogSection>
    );
  }

  return (
    <>
      <Helmet>
        <title>Blog | Sourav Suvra</title>
        <meta name="description" content="Read my thoughts on software development, technology, and more." />
      </Helmet>
      <BlogSection>
        <Container>
          <ErrorBoundary>
            <DynamicImport>
              <BlogHeader />
            </DynamicImport>
          </ErrorBoundary>
          <ErrorBoundary>
            <DynamicImport>
              <BlogContent
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                paginatedPosts={paginatedPosts}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
                isLoading={isLoading}
              />
            </DynamicImport>
          </ErrorBoundary>
        </Container>
      </BlogSection>
    </>
  );
};

export default Blog;
