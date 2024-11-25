import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useBlogPosts from '@/hooks/useBlogPosts';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';

const Section = styled.section`
  padding: 4rem 0;
  background: ${({ theme }) => theme.colors.background.secondary};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: 1rem;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 1.1rem;
`;

const SliderContainer = styled.div`
  position: relative;
  overflow: hidden;
  padding: 2rem 0;
`;

const SliderTrack = styled(motion.div)`
  display: flex;
  gap: 2rem;
`;

const BlogCard = styled(motion.div)`
  flex: 0 0 calc(33.333% - 1.33rem);
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    flex: 0 0 calc(50% - 1rem);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex: 0 0 100%;
  }
`;

const BlogImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const BlogContent = styled.div`
  padding: 1.5rem;
`;

const BlogTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const BlogExcerpt = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text.tertiary};
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;
`;

const DotsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

const ControlButton = styled.button<{ active?: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${({ theme, active }) => 
    active ? theme.colors.primary : theme.colors.text.tertiary};
  opacity: ${({ active }) => (active ? 1 : 0.5)};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const ViewAllButton = styled.button`
  padding: 0.75rem 2rem;
  border-radius: 2rem;
  border: none;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}, ${({ theme }) => theme.colors.secondary});
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

const FeaturedBlogs: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { posts, isLoading } = useBlogPosts();
  const navigate = useNavigate();

  const featuredPosts = posts.filter(post => post.featured).slice(0, 6);
  const totalPages = Math.ceil(featuredPosts.length / 3);

  const handleDotClick = (index: number) => {
    setCurrentPage(index);
  };

  const handleCardClick = (slug: string) => {
    navigate(`/blog/${slug}`);
  };

  const handleViewAllClick = () => {
    navigate('/blog');
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 5000);

    return () => clearInterval(timer);
  }, [totalPages]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <Section>
      <Container>
        <Header>
          <Title>Featured Articles</Title>
          <Subtitle>Discover our most popular and insightful blog posts</Subtitle>
        </Header>
        <SliderContainer>
          <AnimatePresence mode="wait">
            <SliderTrack
              key={currentPage}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              {featuredPosts
                .slice(currentPage * 3, (currentPage + 1) * 3)
                .map((post) => (
                  <BlogCard
                    key={post.id}
                    onClick={() => handleCardClick(post.slug)}
                    whileHover={{ y: -5 }}
                  >
                    <BlogImage src={post.coverImage} alt={post.title} />
                    <BlogContent>
                      <BlogTitle>{post.title}</BlogTitle>
                      <BlogExcerpt>{post.excerpt}</BlogExcerpt>
                      <BlogMeta>
                        <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                        <span>{post.readingTime}</span>
                      </BlogMeta>
                    </BlogContent>
                  </BlogCard>
                ))}
            </SliderTrack>
          </AnimatePresence>
        </SliderContainer>
        <Controls>
          <DotsContainer>
            {Array.from({ length: totalPages }).map((_, index) => (
              <ControlButton
                key={index}
                active={currentPage === index}
                onClick={() => handleDotClick(index)}
              />
            ))}
          </DotsContainer>
          <ViewAllButton onClick={handleViewAllClick}>
            View All Articles
          </ViewAllButton>
        </Controls>
      </Container>
    </Section>
  );
};

export default FeaturedBlogs;
