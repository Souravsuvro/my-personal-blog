import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { blogPosts } from '../../data/blogPosts';
import { fadeUpVariants } from '../../components/shared/animations';

const BlogPostContainer = styled.article`
  max-width: 800px;
  margin: 0 auto;
  padding: 6rem var(--space-xl);

  @media (max-width: 768px) {
    padding: 4rem var(--space-lg);
  }
`;

const Header = styled(motion.header)`
  margin-bottom: var(--space-2xl);
  text-align: center;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3.5rem);
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: var(--space-lg);
  font-weight: ${({ theme }) => theme.fonts.weights.bold};
  line-height: 1.2;
`;

const Meta = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fonts.sizes.md};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  margin-bottom: var(--space-xl);
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: var(--space-sm);
`;

const AuthorImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const AuthorName = styled.span`
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const CoverImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: ${({ theme }) => theme.borders.radius.lg};
  margin-bottom: var(--space-2xl);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Content = styled(motion.div)`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fonts.sizes.lg};
  line-height: 1.8;

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 2em 0 1em;
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
    line-height: 1.3;
  }

  h1 { font-size: 2.5em; }
  h2 { font-size: 2em; }
  h3 { font-size: 1.75em; }
  h4 { font-size: 1.5em; }
  h5 { font-size: 1.25em; }
  h6 { font-size: 1em; }

  p {
    margin-bottom: 1.5em;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    border-bottom: 2px solid transparent;
    transition: border-color 0.3s ease;

    &:hover {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }

  code {
    background: ${({ theme }) => theme.colors.background.tertiary};
    padding: 0.2em 0.4em;
    border-radius: ${({ theme }) => theme.borders.radius.sm};
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.9em;
  }

  pre {
    background: ${({ theme }) => theme.colors.background.tertiary};
    padding: var(--space-lg);
    border-radius: ${({ theme }) => theme.borders.radius.md};
    overflow-x: auto;
    margin: 1.5em 0;

    code {
      background: none;
      padding: 0;
    }
  }

  ul, ol {
    margin: 1.5em 0;
    padding-left: 2em;
  }

  li {
    margin-bottom: 0.5em;
  }

  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.primary};
    padding-left: var(--space-lg);
    margin: 1.5em 0;
    font-style: italic;
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: ${({ theme }) => theme.borders.radius.md};
    margin: 1.5em 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5em 0;
  }

  th, td {
    padding: var(--space-md);
    border: 1px solid ${({ theme }) => theme.colors.border};
    text-align: left;
  }

  th {
    background: ${({ theme }) => theme.colors.background.tertiary};
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
  }
`;

const Tags = styled.div`
  display: flex;
  gap: var(--space-sm);
  margin-top: var(--space-xl);
  flex-wrap: wrap;
  justify-content: center;
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.colors.background.tertiary};
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: 0.5em 1em;
  border-radius: ${({ theme }) => theme.borders.radius.full};
  font-size: ${({ theme }) => theme.fonts.sizes.sm};
`;

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(post => post.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <BlogPostContainer>
      <Header
        initial="hidden"
        animate="visible"
        variants={fadeUpVariants}
      >
        <Title>{post.title}</Title>
        <Meta>
          <AuthorInfo>
            <AuthorImage src={post.author.avatar} alt={post.author.name} />
            <AuthorName>{post.author.name}</AuthorName>
          </AuthorInfo>
          <span>•</span>
          <span>{format(new Date(post.date), 'MMMM dd, yyyy')}</span>
        </Meta>
      </Header>

      {post.coverImage && (
        <CoverImage
          src={post.coverImage}
          alt={post.title}
          loading="lazy"
        />
      )}

      <Content
        initial="hidden"
        animate="visible"
        variants={fadeUpVariants}
      >
        <ReactMarkdown>{post.content}</ReactMarkdown>
        
        {post.tags && post.tags.length > 0 && (
          <Tags>
            {post.tags.map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </Tags>
        )}
      </Content>
    </BlogPostContainer>
  );
};

export default BlogPost;
