import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Layout from '../../components/Layout/Layout';
import Blog from '../../components/Blog/Blog';
import { blogPosts } from '../../data/blogPosts';

const BlogPageContainer = styled.main`
  min-height: 100vh;
  background: var(--background-primary);
`;

const BlogPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Blog - Sourav Sarker Suvra</title>
        <meta
          name="description"
          content="Read my thoughts and insights on web development, design, and technology."
        />
      </Helmet>
      <Layout>
        <BlogPageContainer>
          <Blog posts={blogPosts} />
        </BlogPageContainer>
      </Layout>
    </>
  );
};

export default BlogPage;
