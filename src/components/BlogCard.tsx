import * as React from 'react';
import { Link } from 'react-router-dom';
import { FaClock, FaTag, FaImage, FaSpinner } from "react-icons/fa";
import { useTheme } from '@/context/ThemeContext';
import { BlogPost } from '../data/blogPosts';

interface BlogCardProps {
  post: BlogPost;
  variant?: 'default' | 'featured' | 'compact';
}

const BlogCard: React.FC<BlogCardProps> = ({ post, variant = 'default' }) => {
  const { theme } = useTheme();
  const [imageUrl, setImageUrl] = React.useState<string>('');
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [imageError, setImageError] = React.useState<boolean>(false);

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
        setImageError(true);
        setIsLoading(false);
      }
    };

    loadImage();
  }, [post.coverImage]);

  const renderImage = () => {
    if (isLoading) {
      return (
        <div className={`w-full h-full flex items-center justify-center ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}>
          <FaSpinner className={`${theme === 'light' ? 'text-gray-400' : 'text-gray-600'} text-4xl animate-spin`} />
        </div>
      );
    }

    if (imageError || !imageUrl) {
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
    default: `group overflow-hidden ${theme === 'light' 
      ? 'bg-white border border-gray-200 hover:border-[#FFB800]' 
      : 'bg-[#1a1a1a] border border-gray-800 hover:border-[#FFB800]'} 
      rounded-xl shadow-sm hover:shadow-lg transition-all duration-300`,
    featured: `group overflow-hidden ${theme === 'light'
      ? 'bg-white border-2 border-[#FFB800]'
      : 'bg-[#1a1a1a] border-2 border-[#FFB800]'}
      rounded-xl shadow-lg hover:shadow-xl transition-all duration-300`,
    compact: `group overflow-hidden ${theme === 'light'
      ? 'bg-white border border-gray-200'
      : 'bg-[#1a1a1a] border border-gray-800'}
      rounded-lg hover:shadow-md transition-all duration-300`
  };

  const renderCard = () => {
    const baseCard = (
      <div className={cardClasses[variant]}>
        <div className="relative h-48 overflow-hidden">
          {renderImage()}
          <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:opacity-0" />
        </div>
        <div className="p-6">
          <div className={`flex items-center text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} mb-2`}>
            <FaClock className="mr-2" />
            <span>{post.readTime} min read</span>
            <span className="mx-2">•</span>
            <FaTag className="mr-2" />
            <span>{post.categories.join(', ')}</span>
          </div>
          <h3 className={`text-xl font-bold ${theme === 'light' ? 'text-gray-900' : 'text-white'} mb-3 group-hover:text-[#FFB800] transition-colors duration-300`}>
            {post.title}
          </h3>
          <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-300'} mb-4 line-clamp-2`}>
            {post.excerpt}
          </p>
          <Link 
            to={`/blog/${post.slug}`} 
            className="inline-flex items-center text-[#FFB800] hover:underline"
          >
            Read More
            <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    );

    return (
      <Link to={`/blog/${post.slug}`} className="block h-full">
        {baseCard}
      </Link>
    );
  };

  return renderCard();
};

export default BlogCard;
