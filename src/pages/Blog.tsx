import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { blogPosts, BlogPost } from '../data/blogPosts';
import BlogCard from '../components/BlogCard';
import { useTheme } from '@/context/ThemeContext';

const Blog: React.FC = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get unique categories
  const categories = ['All', ...new Set(blogPosts.flatMap(post => post.categories))];

  // Filter blogs based on search and category
  const filteredBlogs = blogPosts.filter(post => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || post.categories.includes(selectedCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`blog-page min-h-screen ${theme === 'light' ? 'bg-gray-50' : 'bg-[#111111]'} transition-colors duration-300`}>
      {/* Hero Section */}
      <div className={`py-20 ${theme === 'light' ? 'bg-white' : 'bg-[#1a1a1a]'} border-b ${theme === 'light' ? 'border-gray-200' : 'border-gray-800'}`}>
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-4xl md:text-5xl font-bold text-center mb-4 ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}
          >
            Tech Insights & Thoughts
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-center text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-300'}`}
          >
            Exploring the latest in web development, design, and technology
          </motion.p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        {/* Search and Filter Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              placeholder="Search blogs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`flex-1 px-6 py-3 rounded-full ${theme === 'light' 
                ? 'bg-white border border-gray-200 text-gray-900 focus:border-[#FFB800]' 
                : 'bg-[#2a2a2a] border border-gray-700 text-white focus:border-[#FFB800]'} 
                focus:outline-none focus:ring-2 focus:ring-[#FFB800] transition-all duration-300`}
            />
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`md:w-48 px-6 py-3 rounded-full ${theme === 'light'
                ? 'bg-white border border-gray-200 text-gray-900 focus:border-[#FFB800]'
                : 'bg-[#2a2a2a] border border-gray-700 text-white focus:border-[#FFB800]'}
                focus:outline-none focus:ring-2 focus:ring-[#FFB800] transition-all duration-300`}
            >
              {categories.map(category => (
                <option 
                  key={category} 
                  value={category} 
                  className={theme === 'light' ? 'text-gray-900' : 'text-white'}
                >
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((post: BlogPost, index: number) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <BlogCard 
                  post={post} 
                  variant={index === 0 ? 'featured' : 'default'} 
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-16 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}
          >
            <p className="text-2xl">No blogs found matching your search.</p>
            <p className="mt-4">Try different keywords or categories.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Blog;
