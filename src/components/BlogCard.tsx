import * as React from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaTag, FaImage, FaSpinner, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useTheme } from '../context/ThemeContext';
import { BlogPost } from '../data/blogPosts';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured';
  className?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, variant = "default", className }) => {
  const { theme } = useTheme();
  const [imageUrl, setImageUrl] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isHovered, setIsHovered] = React.useState<boolean>(false);

  React.useEffect(() => {
    const loadImage = async () => {
      try {
        const image = typeof post.coverImage === 'function' 
          ? await post.coverImage() 
          : post.coverImage;
        setImageUrl(image);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading blog post image:', error);
        setIsLoading(false);
      }
    };

    loadImage();
  }, [post.coverImage]);

  // Social sharing function
  const shareOnSocial = (platform: 'facebook' | 'twitter' | 'linkedin') => {
    const baseUrl = window.location.origin;
    const shareUrl = `${baseUrl}/blog/${post.slug}`;
    const text = encodeURIComponent(post.title);

    const socialShareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${text}`,
      linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${text}`
    };

    window.open(socialShareUrls[platform], '_blank', 'width=600,height=400');
  };

  const renderImage = () => {
    if (isLoading) {
      return (
        <div className={`w-full h-full flex items-center justify-center ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}>
          <FaSpinner className={`${theme === 'light' ? 'text-gray-400' : 'text-gray-600'} text-4xl animate-spin`} />
        </div>
      );
    }

    if (!imageUrl) {
      return (
        <div className={`w-full h-full flex items-center justify-center ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}>
          <FaImage className={`${theme === 'light' ? 'text-gray-400' : 'text-gray-600'} text-4xl`} />
        </div>
      );
    }

    return (
      <img 
        src={imageUrl} 
        alt={post.title} 
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    );
  };

  const cardClasses = {
    default: `group overflow-hidden relative ${theme === 'light' 
      ? 'bg-white border border-gray-200 hover:border-[#FFB800]' 
      : 'bg-[#1a1a1a] border border-gray-800 hover:border-[#FFB800]'} 
      rounded-xl shadow-sm hover:shadow-lg transition-all duration-300`,
    featured: `group overflow-hidden relative ${theme === 'light'
      ? 'bg-white border-2 border-[#FFB800]'
      : 'bg-[#1a1a1a] border-2 border-[#FFB800]'}
      rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`
  };

  return (
    <div 
      className={`${className} relative`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link 
        to={`/blog/${post.slug}`} 
        className={`block w-full h-full rounded-lg shadow-lg overflow-hidden ${
          theme === 'light' 
            ? 'bg-white hover:shadow-xl' 
            : 'bg-[#1a1a1a] hover:shadow-2xl'
        } transition-all duration-300`}
      >
        <div className={variant === 'featured' ? cardClasses.featured : cardClasses.default}>
          <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
            {renderImage()}
          </div>
          <div className={`p-4 flex flex-col justify-between h-full`}>
            <div>
              <h3 
                className={`font-bold mb-2 ${
                  theme === 'light' 
                    ? 'text-gray-800 hover:text-primary-600' 
                    : 'text-white hover:text-primary-400'
                } transition-colors duration-300 text-xl`}
              >
                {post.title}
              </h3>
              <p 
                className={`text-sm mb-2 ${
                  theme === 'light' 
                    ? 'text-gray-600' 
                    : 'text-gray-300'
                } line-clamp-3`}
              >
                {post.excerpt}
              </p>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center space-x-2 text-xs">
                <FaClock className={theme === 'light' ? 'text-gray-500' : 'text-gray-400'} />
                <span>{post.readTime} min read</span>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <FaTag className={theme === 'light' ? 'text-gray-500' : 'text-gray-400'} />
                <span>{post.categories[0]}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Social Share Overlay */}
      <div className={`
        absolute 
        top-4 
        right-4 
        flex 
        space-x-2 
        transition-all 
        duration-300 
        ${isHovered ? 'opacity-100' : 'opacity-0'}
        ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}
      `}>
        <button 
          onClick={(e) => {
            e.preventDefault();
            shareOnSocial('facebook');
          }}
          className={`
            p-2 
            rounded-full 
            hover:bg-blue-100 
            dark:hover:bg-blue-900 
            transition-colors 
            duration-300
          `}
          aria-label="Share on Facebook"
        >
          <FaFacebook />
        </button>
        <button 
          onClick={(e) => {
            e.preventDefault();
            shareOnSocial('twitter');
          }}
          className={`
            p-2 
            rounded-full 
            hover:bg-sky-100 
            dark:hover:bg-sky-900 
            transition-colors 
            duration-300
          `}
          aria-label="Share on Twitter"
        >
          <FaTwitter />
        </button>
        <button 
          onClick={(e) => {
            e.preventDefault();
            shareOnSocial('linkedin');
          }}
          className={`
            p-2 
            rounded-full 
            hover:bg-blue-100 
            dark:hover:bg-blue-900 
            transition-colors 
            duration-300
          `}
          aria-label="Share on LinkedIn"
        >
          <FaLinkedin />
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
