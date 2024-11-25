import React, { useState, useCallback } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useDebounce, withMemoization } from '@/utils/performance';
import type { BlogSearchProps } from '@/types/blog';
import { fadeInUp } from '@/utils/animations';
import {
  SearchContainer,
  SearchInputWrapper,
  SearchInput,
  SearchIcon,
  ClearButton,
} from './BlogSearch.styles';

const BlogSearchComponent: React.FC<BlogSearchProps> = ({
  onSearch,
  placeholder = 'Search blog posts...',
  debounceMs = 300,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, debounceMs);

  // Memoize the search callback
  const handleSearch = useCallback(
    (term: string) => {
      onSearch(term);
    },
    [onSearch]
  );

  // Effect to trigger search on debounced value change
  React.useEffect(() => {
    handleSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, handleSearch]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleClear = useCallback(() => {
    setSearchTerm('');
    handleSearch('');
  }, [handleSearch]);

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

export const BlogSearch = withMemoization(BlogSearchComponent, 'BlogSearch');
export default BlogSearch;
