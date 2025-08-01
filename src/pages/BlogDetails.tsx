// src/pages/BlogDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FaClock, FaCalendar, FaTag, FaArrowLeft, FaShare } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { getBlogBySlug } from '../data/blogPosts';
import { getBlogContent } from '../data/blogContent';
import SocialShareButtons from '../components/SocialShareButtons';
import StructuredData from '../components/StructuredData';

const BlogDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { theme } = useTheme();
  const [imageUrl, setImageUrl] = useState('');
  const [isImageLoading, setIsImageLoading] = useState(true);

  if (!slug) {
    return <Navigate to="/blog" replace />;
  }

  const blogPost = getBlogBySlug(slug);
  const blogContent = getBlogContent(slug);

  if (!blogPost) {
    return <Navigate to="/404" replace />;
  }

  // Load cover image
  useEffect(() => {
    const loadImage = async () => {
      try {
        const image = typeof blogPost.coverImage === 'function' 
          ? await blogPost.coverImage() 
          : blogPost.coverImage;
        setImageUrl(image);
        setIsImageLoading(false);
      } catch (error) {
        console.error('Error loading blog post image:', error);
        setIsImageLoading(false);
      }
    };

    loadImage();
  }, [blogPost.coverImage]);

  // Generate SEO data
  const canonicalUrl = `https://www.souravsuvra.com/blog/${slug}`;
  const ogImageUrl = imageUrl || 'https://www.souravsuvra.com/og-image.png';
  
  // Generate article schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blogPost.title,
    "description": blogPost.excerpt,
    "image": ogImageUrl,
    "author": {
      "@type": "Person",
      "name": blogPost.author.name,
      "url": "https://www.souravsuvra.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sourav Suvra",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.souravsuvra.com/favicon.svg"
      }
    },
    "datePublished": blogPost.publishedDate,
    "dateModified": blogPost.publishedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl
    },
    "keywords": blogPost.tags.join(", "),
    "articleSection": blogPost.categories[0],
    "wordCount": blogContent?.content ? blogContent.content.split(' ').length : 1000,
    "timeRequired": `PT${blogPost.readTime}M`
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{blogPost.title} | Sourav Suvra - Full Stack Developer</title>
        <meta name="description" content={blogPost.excerpt} />
        <meta name="keywords" content={blogPost.tags.join(', ')} />
        <meta name="author" content={blogPost.author.name} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={blogPost.title} />
        <meta property="og:description" content={blogPost.excerpt} />
        <meta property="og:image" content={ogImageUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Sourav Suvra" />
        <meta property="article:published_time" content={blogPost.publishedDate} />
        <meta property="article:author" content={blogPost.author.name} />
        <meta property="article:section" content={blogPost.categories[0]} />
        {blogPost.tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blogPost.title} />
        <meta name="twitter:description" content={blogPost.excerpt} />
        <meta name="twitter:image" content={ogImageUrl} />
        <meta name="twitter:creator" content="@souravsuvra" />

        {/* Additional SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="bingbot" content="index, follow" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      <article className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        {/* Navigation */}
        <nav className="container mx-auto px-4 py-6">
          <Link 
            to="/blog" 
            className={`inline-flex items-center space-x-2 ${theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} transition-colors`}
          >
            <FaArrowLeft />
            <span>Back to Blogs</span>
          </Link>
        </nav>

        {/* Article Header */}
        <header className="container mx-auto px-4 mb-8">
          {/* Featured Image */}
          {!isImageLoading && imageUrl && (
            <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={imageUrl}
                alt={blogPost.title}
                className="w-full h-64 md:h-96 object-cover"
                loading="eager"
              />
            </div>
          )}

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {blogPost.categories.map(category => (
              <span
                key={category}
                className={`px-3 py-1 text-sm rounded-full ${theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'}`}
              >
                {category}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {blogPost.title}
          </h1>

          {/* Article Meta */}
          <div className={`flex flex-wrap items-center gap-6 text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
            <div className="flex items-center space-x-2">
              <img
                src={blogPost.author.avatar}
                alt={blogPost.author.name}
                className="w-8 h-8 rounded-full"
              />
              <span>{blogPost.author.name}</span>
            </div>
            <div className="flex items-center space-x-1">
              <FaCalendar />
              <time dateTime={blogPost.publishedDate}>
                {new Date(blogPost.publishedDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
            <div className="flex items-center space-x-1">
              <FaClock />
              <span>{blogPost.readTime} min read</span>
            </div>
          </div>

          {/* Social Share */}
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {blogPost.tags.map(tag => (
                <span
                  key={tag}
                  className={`px-2 py-1 text-xs rounded ${theme === 'dark' ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'}`}
                >
                  <FaTag className="inline mr-1" />
                  {tag}
                </span>
              ))}
            </div>
            <SocialShareButtons 
              url={canonicalUrl}
              title={blogPost.title}
              description={blogPost.excerpt}
            />
          </div>
        </header>

        {/* Article Content */}
        <main className="container mx-auto px-4">
          <div className={`prose prose-lg max-w-4xl mx-auto ${theme === 'dark' ? 'prose-invert' : ''}`}>
            {blogContent ? (
              <div dangerouslySetInnerHTML={{ __html: blogContent.content }} />
            ) : (
              <div className="text-center py-16">
                <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
                <p className="text-gray-600 mb-8">Sorry, the content for this blog post could not be found.</p>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="max-w-4xl mx-auto mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between">
              <Link 
                to="/blog"
                className={`px-6 py-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'} transition-colors`}
              >
                ← Read Previous Post
              </Link>
              <Link 
                to="/blog"
                className={`px-6 py-3 rounded-lg ${theme === 'dark' ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'} transition-colors`}
              >
                Read Next Post →
              </Link>
            </div>
          </nav>
        </main>
      </article>
    </>
  );
};

export default BlogDetails;
