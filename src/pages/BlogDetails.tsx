import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getBlogContent } from '../data/blogContents';

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
  const [blogContent, setBlogContent] = useState<string | null>(null);
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();

  // Custom components for markdown rendering
  const components = {
    code({ inline, className, children, ...props }: CodeBlockProps) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          className="rounded-lg shadow-lg my-4"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code 
          className={`${className} bg-gray-800 text-[#FFB800] px-2 py-1 rounded-md text-sm font-mono`} 
          {...props}
        >
          {children}
        </code>
      );
    },
    h1: ({...props}) => (
      <h1 
        className="text-3xl font-bold text-[#FFB800] mt-8 mb-4 
        border-b-2 border-[#FFB800]/20 pb-2 leading-tight" 
        {...props} 
      />
    ),
    h2: ({...props}) => (
      <h2 
        className="text-2xl font-semibold text-[#FFB800] mt-6 mb-3 
        border-b border-[#FFB800]/10 pb-1 leading-tight" 
        {...props} 
      />
    ),
    h3: ({...props}) => (
      <h3 
        className="text-xl font-semibold mt-4 mb-2 leading-tight" 
        {...props} 
      />
    ),
    p: ({...props}) => (
      <p 
        className="text-white text-base leading-relaxed mb-4" 
        {...props} 
      />
    ),
    ul: ({...props}) => (
      <ul 
        className="list-disc list-outside text-white space-y-2 pl-6 mb-4" 
        {...props} 
      />
    ),
    ol: ({...props}) => (
      <ol 
        className="list-decimal list-outside text-white space-y-2 pl-6 mb-4" 
        {...props} 
      />
    ),
    li: ({...props}) => (
      <li 
        className="text-white text-base leading-relaxed" 
        {...props} 
      />
    ),
    blockquote: ({...props}) => (
      <blockquote 
        className="border-l-4 border-[#FFB800] pl-4 py-2 my-4 
        bg-gray-800/50 italic text-white/80 relative"
        {...props}
      >
        {props.children}
      </blockquote>
    ),
    a: ({...props}) => (
      <a 
        className="text-[#FFB800] hover:underline transition-colors duration-300"
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    ),
    strong: ({...props}) => (
      <strong 
        className="font-bold text-[#FFB800]" 
        {...props} 
      />
    ),
    em: ({...props}) => (
      <em 
        className="italic text-white/80" 
        {...props} 
      />
    ),
  };

  useEffect(() => {
    const fetchBlogContent = async () => {
      try {
        // Fetch blog content based on slug
        if (slug) {
          const content = getBlogContent(slug);
          setBlogContent(content);
        }
      } catch (error) {
        console.error('Error fetching blog content:', error);
        navigate('/blog');
      }
    };

    fetchBlogContent();
  }, [slug, navigate]);

  if (!blogContent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="blog-details bg-[#1a1a1a] min-h-screen text-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <button 
          onClick={() => window.history.back()}
          className="flex items-center text-[#FFB800] hover:text-white 
          mb-8 text-lg font-semibold group transition-colors duration-300"
        >
          <span className="mr-2 group-hover:translate-x-[-5px] transition-transform">←</span>
          Back to Blogs
        </button>

        <ReactMarkdown 
          components={components}
        >
          {blogContent}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default BlogDetails;
