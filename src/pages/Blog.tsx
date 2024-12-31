import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSearch, 
  FaFilter,
  FaTimes,
  FaChevronDown,
  FaFacebook, 
  FaTwitter, 
  FaLinkedin,
  FaArrowLeft,
  FaArrowRight
} from 'react-icons/fa';
import BlogCard from '../components/BlogCard';
import { SEO } from '../components/SEO';
import { useTheme } from '../context/ThemeContext';
import { blogPosts, BlogPost } from '../data/blogPosts';

const POSTS_PER_PAGE = 9;

const Blog: React.FC = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Extract unique categories
  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    blogPosts.forEach(post => {
      post.tags?.forEach(category => categories.add(category));
    });
    return Array.from(categories);
  }, []);

  // Filter and search blog posts
  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !selectedCategory || 
        post.tags?.some(category => 
          category.toLowerCase() === selectedCategory.toLowerCase()
        );
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // Pagination logic
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    return filteredPosts.slice(startIndex, endIndex);
  }, [filteredPosts, currentPage]);

  // Total pages
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory(null);
    setCurrentPage(1);
    setIsFilterOpen(false);
  };

  // Social share function
  const shareOnSocial = useCallback((platform: string, post: BlogPost) => {
    const url = `${window.location.origin}/blog/${post.slug}`;
    const text = `Check out this blog post: ${post.title}`;
    
    let shareUrl = '';
    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(post.title)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  }, []);

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`
        min-h-screen 
        pt-24 
        px-4 
        sm:px-6 
        lg:px-8 
        ${theme === 'light' ? 'bg-gray-50 text-gray-800' : 'bg-gray-900 text-gray-200'}
      `}
    >
      <SEO title="Blog - Sourav Sarker" />
      
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className={`
            text-4xl 
            font-bold 
            mb-4 
            ${theme === 'light' ? 'text-gray-900' : 'text-white'}
          `}>
            My Blog
          </h1>
          <p className={`
            text-lg 
            max-w-2xl 
            mx-auto 
            ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}
          `}>
            Exploring technology, sharing insights, and documenting my journey in software development.
          </p>
        </div>

        {/* Advanced Search and Filter */}
        <div className="mb-12">
          <div className={`
            relative 
            flex 
            items-center 
            rounded-xl 
            shadow-lg 
            ${theme === 'light' 
              ? 'bg-white border-gray-200' 
              : 'bg-gray-800 border-gray-700'}
          `}>
            {/* Search Input */}
            <div className="flex-grow flex items-center p-2">
              <FaSearch className={`
                mx-3 
                ${theme === 'light' ? 'text-gray-400' : 'text-gray-500'}
              `} />
              <input 
                type="text" 
                placeholder="Search blogs..." 
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className={`
                  w-full 
                  bg-transparent 
                  focus:outline-none 
                  ${theme === 'light' 
                    ? 'text-gray-900 placeholder-gray-500' 
                    : 'text-white placeholder-gray-400'}
                `}
              />
            </div>

            {/* Filter Toggle */}
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`
                flex 
                items-center 
                px-4 
                py-2 
                border-l 
                transition-colors 
                duration-300
                ${theme === 'light' 
                  ? 'border-gray-200 text-gray-600 hover:bg-gray-100' 
                  : 'border-gray-700 text-gray-300 hover:bg-gray-700'}
              `}
            >
              <FaFilter className="mr-2" />
              Filters
              <FaChevronDown 
                className={`
                  ml-2 
                  transform 
                  transition-transform 
                  duration-300 
                  ${isFilterOpen ? 'rotate-180' : ''}
                `} 
              />
            </button>

            {/* Reset Button */}
            {(searchTerm || selectedCategory) && (
              <button 
                onClick={resetFilters}
                className={`
                  flex 
                  items-center 
                  justify-center 
                  w-10 
                  h-10 
                  rounded-full 
                  mr-2 
                  transition-colors 
                  duration-300
                  ${theme === 'light' 
                    ? 'text-gray-600 hover:bg-gray-200' 
                    : 'text-gray-300 hover:bg-gray-700'}
                `}
                aria-label="Reset Filters"
              >
                <FaTimes />
              </button>
            )}
          </div>

          {/* Expandable Filters */}
          {isFilterOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className={`
                mt-4 
                p-4 
                rounded-xl 
                shadow-lg 
                ${theme === 'light' 
                  ? 'bg-white border-gray-200' 
                  : 'bg-gray-800 border-gray-700'}
              `}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {allCategories.map(category => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(
                        selectedCategory === category ? null : category
                      );
                      setCurrentPage(1);
                    }}
                    className={`
                      px-4 
                      py-2 
                      rounded-full 
                      text-sm 
                      transition-all 
                      duration-300
                      ${selectedCategory === category 
                        ? 'bg-blue-500 text-white' 
                        : theme === 'light' 
                          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}
                    `}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Filter Summary */}
          {(searchTerm || selectedCategory) && (
            <div className={`
              mt-3 
              text-sm 
              flex 
              items-center 
              justify-between
              ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}
            `}>
              <span>
                {searchTerm && `Searching for "${searchTerm}"`}
                {searchTerm && selectedCategory && ' | '}
                {selectedCategory && `Category: ${selectedCategory}`}
              </span>
              <span>{filteredPosts.length} posts found</span>
            </div>
          )}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-6 mb-12 px-4 sm:px-6 lg:px-8">
          {paginatedPosts.map(post => (
            <motion.div 
              key={post.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <BlogCard 
                post={post} 
                className="h-full w-full" 
              />
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-4 mb-12">
          <button 
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`
              flex 
              items-center 
              px-4 
              py-2 
              rounded-full 
              transition-all 
              duration-300
              ${currentPage === 1 
                ? 'cursor-not-allowed opacity-50' 
                : 'hover:bg-blue-600 hover:text-white'}
              ${theme === 'light' 
                ? 'bg-white text-gray-800 border border-gray-300' 
                : 'bg-gray-800 text-white border border-gray-700'}
            `}
          >
            <FaArrowLeft className="mr-2" /> Previous
          </button>
          
          <span className={`
            ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}
          `}>
            Page {currentPage} of {totalPages}
          </span>
          
          <button 
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`
              flex 
              items-center 
              px-4 
              py-2 
              rounded-full 
              transition-all 
              duration-300
              ${currentPage === totalPages 
                ? 'cursor-not-allowed opacity-50' 
                : 'hover:bg-blue-600 hover:text-white'}
              ${theme === 'light' 
                ? 'bg-white text-gray-800 border border-gray-300' 
                : 'bg-gray-800 text-white border border-gray-700'}
            `}
          >
            Next <FaArrowRight className="ml-2" />
          </button>
        </div>

        {/* No Posts Found */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className={`
              text-xl 
              ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}
            `}>
              No blog posts found. Try different search terms or categories.
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Blog;
