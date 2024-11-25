import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCalendar, FiClock, FiEye, FiHeart } from 'react-icons/fi';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { blogPosts } from '@/data/blogPosts';
import { categories } from '@/data/categories';
import { fadeIn } from '@/utils/animations';
import { formatDate } from '@/utils/date';
import { Container } from '@/components/shared/Container/Container';
import { PageTitle } from '@/components/shared/PageTitle/PageTitle';
import { CategoryTag } from '@/components/shared/CategoryTag';
import { Button } from '@/components/shared/Button/Button';
import ShareButtons from '@/components/features/Blog/ShareButtons/ShareButtons';

const BlogPostContainer = styled(motion.article)`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const BackButton = styled(Button)`
  margin: 2rem 0;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  
  &:hover {
    transform: translateX(-4px);
    transition: transform 0.2s ease-in-out;
  }
`;

const CoverImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 1rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Categories = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

const Content = styled.div`
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.8;
  font-size: 1.1rem;

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.text.primary};
    margin: 2rem 0 1rem;
    line-height: 1.4;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.75rem;
  }

  p {
    margin: 1.5rem 0;
  }

  ul, ol {
    margin: 1.5rem 0;
    padding-left: 2rem;
  }

  li {
    margin: 0.5rem 0;
  }

  pre {
    margin: 1.5rem 0;
    padding: 1rem;
    border-radius: 0.5rem;
    background: ${({ theme }) => theme.colors.background.secondary};
    overflow-x: auto;
  }

  code {
    font-family: 'Fira Code', monospace;
    font-size: 0.9em;
  }

  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    border-bottom: 1px solid transparent;
    
    &:hover {
      border-bottom-color: ${({ theme }) => theme.colors.primary};
      opacity: 0.8;
    }

    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.primary};
      outline-offset: 2px;
    }
  }

  blockquote {
    margin: 1.5rem 0;
    padding: 1rem 1.5rem;
    border-left: 4px solid ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.background.secondary};
    font-style: italic;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    margin: 1.5rem 0;
  }

  hr {
    margin: 2rem 0;
    border: none;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const AuthorSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

const AuthorAvatar = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 50%;
`;

const AuthorInfo = styled.div`
  flex: 1;
`;

const AuthorName = styled.h3`
  margin: 0 0 0.5rem;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const AuthorBio = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: 0.9rem;
  line-height: 1.6;
`;

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <Container>
        <PageTitle>Post Not Found</PageTitle>
        <BackButton 
          onClick={() => navigate('/blog')}
          variant="ghost"
          size="md"
          leftIcon={<FiArrowLeft />}
        >
          Back to Blog
        </BackButton>
      </Container>
    );
  }

  const categoryNames = post.categories.map(
    (categoryId) => categories.find((cat) => cat.id === categoryId)?.name || categoryId
  );

  const currentUrl = window.location.href;

  return (
    <Container>
      <BlogPostContainer
        initial="hidden"
        animate="visible"
        variants={fadeIn}
      >
        <BackButton 
          onClick={() => navigate('/blog')}
          variant="ghost"
          size="md"
          leftIcon={<FiArrowLeft />}
        >
          Back to Blog
        </BackButton>

        <PageTitle>{post.title}</PageTitle>

        <MetaInfo>
          <MetaItem>
            <FiCalendar />
            {formatDate(post.publishedAt)}
          </MetaItem>
          <MetaItem>
            <FiClock />
            {post.readingTime}
          </MetaItem>
          <MetaItem>
            <FiEye />
            {post.views} views
          </MetaItem>
          <MetaItem>
            <FiHeart />
            {post.likes} likes
          </MetaItem>
        </MetaInfo>

        <Categories>
          {categoryNames.map((category) => (
            <CategoryTag
              key={category}
              onClick={() => navigate(`/blog/category/${category.toLowerCase()}`)}
            >
              {category}
            </CategoryTag>
          ))}
        </Categories>

        {post.coverImage && (
          <CoverImage src={post.coverImage} alt={post.title} />
        )}

        <Content>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              a({node, children, href, ...props}) {
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...props}
                  >
                    {children}
                  </a>
                );
              }
            }}
          >
            {post.content}
          </ReactMarkdown>

          <ShareButtons
            url={currentUrl}
            title={post.title}
            description={post.excerpt || post.title}
          />
        </Content>

        <AuthorSection>
          <AuthorAvatar src={post.author.avatar} alt={post.author.name} />
          <AuthorInfo>
            <AuthorName>{post.author.name}</AuthorName>
            <AuthorBio>{post.author.bio}</AuthorBio>
          </AuthorInfo>
        </AuthorSection>
      </BlogPostContainer>
    </Container>
  );
};

export default BlogPost;
