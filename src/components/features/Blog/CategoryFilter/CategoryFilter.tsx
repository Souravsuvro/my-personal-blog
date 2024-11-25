import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import {
  FilterWrapper,
  FilterContainer,
  CategoryList,
  CategoryButton,
  ScrollButton
} from './CategoryFilter.styles';
import type { Category } from '@/types/blog';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  postCounts: Record<string, number>;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  postCounts,
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScrollability = () => {
    if (listRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollability();
    const list = listRef.current;
    if (list) {
      list.addEventListener('scroll', checkScrollability);
      window.addEventListener('resize', checkScrollability);
      
      return () => {
        list.removeEventListener('scroll', checkScrollability);
        window.removeEventListener('resize', checkScrollability);
      };
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (listRef.current) {
      const scrollAmount = 200;
      const newScrollLeft = direction === 'left'
        ? listRef.current.scrollLeft - scrollAmount
        : listRef.current.scrollLeft + scrollAmount;
      
      listRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <FilterWrapper>
      <AnimatePresence>
        {canScrollLeft && (
          <ScrollButton
            direction="left"
            onClick={() => scroll('left')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FiChevronLeft />
          </ScrollButton>
        )}
      </AnimatePresence>

      <FilterContainer>
        <CategoryList ref={listRef}>
          <CategoryButton
            key="all"
            onClick={() => onSelectCategory('all')}
            $active={selectedCategory === 'all'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            All ({postCounts['all'] || 0})
          </CategoryButton>
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              $active={selectedCategory === category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.name} ({postCounts[category.id] || 0})
            </CategoryButton>
          ))}
        </CategoryList>
      </FilterContainer>

      <AnimatePresence>
        {canScrollRight && (
          <ScrollButton
            direction="right"
            onClick={() => scroll('right')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FiChevronRight />
          </ScrollButton>
        )}
      </AnimatePresence>
    </FilterWrapper>
  );
};

export default CategoryFilter;
