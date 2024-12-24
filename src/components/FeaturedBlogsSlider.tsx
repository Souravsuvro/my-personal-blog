import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { getFeaturedBlogs, BlogPost } from '../data/blogPosts';
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaImage, 
  FaSpinner, 
  FaClock, 
  FaTag 
} from 'react-icons/fa';

const FeaturedBlogsSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredBlogs = getFeaturedBlogs();
  const [autoplayInterval, setAutoplayInterval] = useState<NodeJS.Timeout | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % featuredBlogs.length);
  }, [featuredBlogs.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + featuredBlogs.length) % featuredBlogs.length);
  }, [featuredBlogs.length]);

  // Autoplay functionality
  useEffect(() => {
    const startAutoplay = () => {
      const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
      setAutoplayInterval(interval);
      return () => clearInterval(interval);
    };

    const cleanup = startAutoplay();
    return () => {
      cleanup();
      if (autoplayInterval) clearInterval(autoplayInterval);
    };
  }, [nextSlide]);

  const slideVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.7, 
        ease: "easeInOut" 
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      transition: { 
        duration: 0.7, 
        ease: "easeInOut" 
      } 
    }
  };

  return (
    <section className="featured-blogs bg-white dark:bg-[rgb(30_30_30/var(--tw-bg-opacity,1))] py-16">
      <div className="container mx-auto px-4 relative">
        <div className="flex justify-between items-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-[#113768] dark:text-white"
          >
            Featured Blogs
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link 
              to="/blog" 
              className="text-[#113768] hover:text-[#FFB800] dark:text-white dark:hover:text-[#FFB800] flex items-center 
              transition-colors duration-300 text-lg font-semibold"
            >
              View All Posts
              <FaChevronRight className="ml-2 animate-pulse" />
            </Link>
          </motion.div>
        </div>

        <div className="relative w-full overflow-hidden rounded-2xl shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentSlide}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              <FeaturedBlogCard 
                blog={featuredBlogs[currentSlide]} 
                onNext={nextSlide}
                onPrev={prevSlide}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center mt-8 space-x-3">
          {featuredBlogs.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-[#FFB800] scale-125' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Featured Blog Card Component
const FeaturedBlogCard: React.FC<{ 
  blog: BlogPost, 
  onNext: () => void, 
  onPrev: () => void 
}> = ({ blog, onNext, onPrev }) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [imageError, setImageError] = useState<boolean>(false);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const image = typeof blog.coverImage === 'function' 
          ? await blog.coverImage() 
          : blog.coverImage;
        
        setImageUrl(image);
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading featured blog image:', error);
        setImageError(true);
        setIsLoading(false);
      }
    };

    loadImage();
  }, [blog.coverImage]);

  const renderImage = () => {
    if (isLoading) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <FaSpinner className="text-[#113768] text-4xl animate-spin" />
        </div>
      );
    }

    if (imageError || !imageUrl) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-200">
          <FaImage className="text-gray-500 text-4xl" />
        </div>
      );
    }

    return (
      <img 
        src={imageUrl} 
        alt={blog.title} 
        className="w-full h-full object-cover filter brightness-75 hover:brightness-100 
        transition-all duration-500 ease-in-out transform hover:scale-105"
      />
    );
  };

  return (
    <div className="grid md:grid-cols-2 gap-0 items-stretch bg-white rounded-2xl overflow-hidden 
    shadow-2xl border-2 border-gray-200">
      {/* Blog Image with Navigation Overlay */}
      <div className="relative h-[500px] overflow-hidden group">
        {renderImage()}
        
        {/* Mobile Navigation */}
        <div className="absolute inset-0 md:hidden flex">
          <button 
            onClick={onPrev}
            className="w-1/2 h-full bg-transparent hover:bg-gray-200 
            transition-colors duration-300 flex items-center justify-start pl-4"
          >
            <FaChevronLeft className="text-[#113768] text-2xl opacity-50 group-hover:opacity-100" />
          </button>
          <button 
            onClick={onNext}
            className="w-1/2 h-full bg-transparent hover:bg-gray-200 
            transition-colors duration-300 flex items-center justify-end pr-4"
          >
            <FaChevronRight className="text-[#113768] text-2xl opacity-50 group-hover:opacity-100" />
          </button>
        </div>
      </div>

      {/* Blog Content */}
      <div className="p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center text-sm text-gray-600 mb-4">
            <FaClock className="mr-2 text-[#113768]" />
            <span>{blog.publishedDate}</span>
            <span className="mx-2">•</span>
            <FaTag className="mr-2 text-[#113768]" />
            <span>{blog.readTime} min read</span>
          </div>

          <h3 className="text-3xl font-bold text-[#113768] mb-4 hover:text-[#FFB800] 
          transition-colors duration-300">{blog.title}</h3>
          
          <p className="text-gray-700 mb-6 line-clamp-3 italic">{blog.excerpt}</p>
          
          <div className="flex items-center space-x-2 mb-6">
            {blog.tags.slice(0, 3).map(tag => (
              <span 
                key={tag} 
                className="bg-gray-100 px-3 py-1 rounded-full text-sm 
                text-[#113768] hover:bg-gray-200 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <Link 
          to={`/blog/${blog.slug}`} 
          className="inline-flex items-center text-[#113768] hover:text-[#FFB800] 
          text-lg font-semibold group transition-colors duration-300"
        >
          Read More
          <FaChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default FeaturedBlogsSlider;
