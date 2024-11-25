import React, { useState, useCallback } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import debounce from 'lodash/debounce';
import type { BlogSearchProps } from '@/types/blog';
import { fadeInUp } from '@/utils/animations';
import {
  SearchContainer,
  SearchInputWrapper,
  SearchInput,
  SearchIcon,
  ClearButton,
} from './BlogSearch.styles';

export const BlogSearch: React.FC<BlogSearchProps> = ({
  onSearch,
  placeholder = 'Search blog posts...',
  debounceMs = 300,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Debounce the search callback
  const debouncedSearch = useCallback(
    debounce((term: string) => {
      onSearch(term);
    }, debounceMs),
    [onSearch, debounceMs]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <SearchContainer variants={fadeInUp} initial="hidden" animate="visible">
      <SearchInputWrapper>
        <SearchIcon>
          <FiSearch />
        </SearchIcon>
        <SearchInput
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearchChange}
          aria-label="Search blog posts"
        />
        {searchTerm && (
          <ClearButton
            onClick={handleClear}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Clear search"
          >
            <FiX />
          </ClearButton>
        )}
      </SearchInputWrapper>
    </SearchContainer>
  );
};

export default BlogSearch;
