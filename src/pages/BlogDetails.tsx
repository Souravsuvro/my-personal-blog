import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getBlogContent, getBlogBySlug, getBlogPosts } from '../data/blogContents';
import { useTheme } from '../context/ThemeContext';
import { BlogPost } from '../data/blogPosts';
import SocialShareButtons from '../components/SocialShareButtons';

// Custom type for code block props
interface CodeBlockProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

// Custom type for blog content
interface BlogContent {
  content: string;
}

const BlogDetails: React.FC = () => {
  const { theme } = useTheme();
  const [blogContent, setBlogContent] = useState<string | null>(null);
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const blogPosts = getBlogPosts();

  // Custom components for markdown rendering
  const components = {
    code({ inline, className, children, ...props }: CodeBlockProps) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={theme === 'dark' ? oneDark : {
            ...oneDark,
            'code[class*="language-"]': {
              color: '#333',
              background: '#f4f4f4',
            },
            'pre[class*="language-"]': {
              background: '#f4f4f4',
              color: '#333',
            },
          }}
          language={match[1]}
          PreTag="div"
          className={`rounded-lg shadow-lg my-4 ${
            theme === 'dark' 
              ? 'bg-gray-800 text-white' 
              : 'bg-gray-100 text-gray-800'
          }`}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code 
          className={`${className} ${
            theme === 'dark'
              ? 'bg-gray-800 text-[#FFB800]'
              : 'bg-gray-200 text-gray-800'
          } px-2 py-1 rounded-md text-sm font-mono`} 
          {...props}
        >
          {children}
        </code>
      );
    },
    h1: ({...props}) => (
      <h1 
        className={`text-3xl font-bold mt-8 mb-4 
        border-b-2 pb-2 leading-tight ${
          theme === 'dark' 
            ? 'text-[#FFB800] border-[#FFB800]/20' 
            : 'text-gray-900 border-gray-300'
        }`} 
        {...props} 
      />
    ),
    h2: ({...props}) => (
      <h2 
        className={`text-2xl font-semibold mt-6 mb-3 
        border-b pb-1 leading-tight ${
          theme === 'dark'
            ? 'text-[#FFB800] border-[#FFB800]/10'
            : 'text-gray-900 border-gray-300'
        }`} 
        {...props} 
      />
    ),
    h3: ({...props}) => (
      <h3 
        className={`text-xl font-semibold mt-4 mb-2 leading-tight ${
          theme === 'dark' 
            ? 'text-[#FFB800]' 
            : 'text-gray-900'
        }`} 
        {...props} 
      />
    ),
    p: ({...props}) => (
      <p 
        className={`text-base leading-relaxed mb-4 ${
          theme === 'dark' 
            ? 'text-white' 
            : 'text-gray-800'
        }`} 
        {...props} 
      />
    ),
    ul: ({...props}) => (
      <ul 
        className={`list-disc list-outside space-y-2 pl-6 mb-4 ${
          theme === 'dark' 
            ? 'text-white' 
            : 'text-gray-800'
        }`} 
        {...props} 
      />
    ),
    ol: ({...props}) => (
      <ol 
        className={`list-decimal list-outside space-y-2 pl-6 mb-4 ${
          theme === 'dark' 
            ? 'text-white' 
            : 'text-gray-800'
        }`} 
        {...props} 
      />
    ),
    li: ({...props}) => (
      <li 
        className={`text-base leading-relaxed ${
          theme === 'dark' 
            ? 'text-white' 
            : 'text-gray-800'
        }`} 
        {...props} 
      />
    ),
    blockquote: ({...props}) => (
      <blockquote 
        className={`border-l-4 pl-4 py-2 my-4 
        italic relative ${
          theme === 'dark'
            ? 'border-[#FFB800] bg-gray-800/50 text-white/80'
            : 'border-gray-500 bg-gray-100/50 text-gray-700'
        }`}
        {...props}
      >
        {props.children}
      </blockquote>
    ),
    a: ({...props}) => (
      <a 
        className={`underline ${
          theme === 'dark'
            ? 'text-[#FFB800] hover:text-[#FFD700]'
            : 'text-blue-700 hover:text-blue-900'
        }`} 
        target="_blank" 
        rel="noopener noreferrer"
        {...props} 
      />
    ),
    strong: ({...props}) => (
      <strong 
        className={`${
          theme === 'dark' 
            ? 'text-[#FFB800]' 
            : 'text-gray-900 font-semibold'
        }`} 
        {...props} 
      />
    ),
    em: ({...props}) => (
      <em 
        className={`${
          theme === 'dark' 
            ? 'text-white/80' 
            : 'text-gray-700 italic'
        }`} 
        {...props} 
      />
    ),
  };

  useEffect(() => {
    const fetchBlogDetails = async () => {
      if (slug) {
        const post = getBlogBySlug(slug);
        if (post) {
          setBlogPost(post);
          
          // Fetch cover image
          try {
            let imageUrl: string | null = null;
            if (typeof post.coverImage === 'function') {
              imageUrl = await post.coverImage();
            } else if (typeof post.coverImage === 'string') {
              imageUrl = post.coverImage;
            }
            
            if (imageUrl) {
              setCoverImage(imageUrl);
            }
          } catch (error) {
            console.error('Error fetching cover image:', error);
          }

          // Get blog content
          const content = getBlogContent(slug);
          setBlogContent(content);
        } else {
          // Redirect to 404 if blog post not found
          navigate('/not-found');
        }
      }
    };

    fetchBlogDetails();
  }, [slug, navigate]);

  // Function to get previous and next blog posts
  const getPreviousAndNextPosts = () => {
    if (!blogPost) return { previousPost: null, nextPost: null };
    
    const currentIndex = blogPosts.findIndex(post => post.id === blogPost.id);
    
    return {
      previousPost: currentIndex > 0 ? blogPosts[currentIndex - 1] : null,
      nextPost: currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null
    };
  };

  // Destructure previous and next posts
  const { previousPost, nextPost } = getPreviousAndNextPosts();

  if (!blogPost || !blogContent) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center"
      >
        <div className="text-center">
          <div 
            className={`animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 ${
              theme === 'dark' 
                ? 'border-[#FFB800]' 
                : 'border-gray-800'
            }`}
          />
          <p className={`mt-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
            Loading blog post...
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 px-4 md:px-8 lg:px-16 xl:px-24"
    >
      <div className="container mx-auto max-w-4xl">
        {/* Blog Post Header */}
        <div className="mb-8">
          {coverImage && (
            <div className="mb-6 w-full overflow-hidden rounded-lg shadow-lg">
              <img 
                src={coverImage} 
                alt={blogPost.title} 
                className={`w-full h-48 md:h-64 lg:h-96 object-cover ${
                  theme === 'dark'
                    ? 'border-2 border-[#FFB800]/20'
                    : 'border border-gray-300'
                }`}
              />
            </div>
          )}
          
          <h1 
            className={`text-2xl md:text-3xl lg:text-4xl font-bold mb-4 ${
              theme === 'dark' 
                ? 'text-[#FFB800]' 
                : 'text-gray-900'
            }`}
          >
            {blogPost.title}
          </h1>
          
          <div 
            className={`flex flex-wrap items-center space-x-2 md:space-x-4 mb-6 text-sm md:text-base ${
              theme === 'dark' 
                ? 'text-white/80' 
                : 'text-gray-700'
            }`}
          >
            <span>{blogPost.author}</span>
            <span className="hidden md:inline">•</span>
            <span>{blogPost.publishedDate}</span>
            <span className="hidden md:inline">•</span>
            <span>{blogPost.readTime} min read</span>
          </div>
        </div>

        {/* Blog Content */}
        <article 
          className={`prose max-w-full ${
            theme === 'dark' 
              ? 'prose-invert prose-dark' 
              : 'prose-light'
          } prose-sm md:prose-base lg:prose-lg 
            prose-headings:font-bold 
            prose-a:text-blue-600 
            prose-a:no-underline 
            hover:prose-a:underline 
            prose-img:rounded-lg 
            prose-img:shadow-lg`}
        >
          <ReactMarkdown 
            components={components}
          >
            {blogContent}
          </ReactMarkdown>
        </article>

        {/* Social Share Buttons */}
        {blogPost && (
          <SocialShareButtons 
            title={blogPost.title} 
            url={window.location.href} 
          />
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8 space-x-4">
          {/* Back to Blogs Button */}
          <Link 
            to="/blog" 
            className="flex items-center text-primary-600 dark:text-primary-400 hover:underline"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                clipRule="evenodd" 
              />
            </svg>
            Back to Blogs
          </Link>

          {/* Previous and Next Post Navigation */}
          <div className="flex space-x-4">
            {previousPost && (
              <Link
                to={`/blog/${previousPost.slug}`}
                className="flex items-center text-primary-600 dark:text-primary-400 hover:underline"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-2" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
                Read Previous Post
              </Link>
            )}

            {nextPost && (
              <Link
                to={`/blog/${nextPost.slug}`}
                className="flex items-center text-primary-600 dark:text-primary-400 hover:underline"
              >
                Read Next Post
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10.293 15.707a1 1 0 010-1.414L14.586 10H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 111.414-1.414l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0z" 
                    clipRule="evenodd" 
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogDetails;
