import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import type { BlogPaginationProps } from '@/types/blog';
import { PaginationContainer, PaginationButton, PageInfo } from './BlogPagination.styles';

export const BlogPagination: React.FC<BlogPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}) => {
  const getVisiblePages = () => {
    const pages: number[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);
    let start = Math.max(currentPage - halfVisible, 1);
    let end = Math.min(start + maxVisiblePages - 1, totalPages);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const visiblePages = getVisiblePages();

  return (
    <PaginationContainer>
      <PaginationButton
        onClick={() => handlePageChange(currentPage - 1)}
        $disabled={currentPage === 1}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Previous page"
      >
        <FiChevronLeft />
      </PaginationButton>

      {visiblePages[0] > 1 && (
        <>
          <PaginationButton
            onClick={() => handlePageChange(1)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            1
          </PaginationButton>
          {visiblePages[0] > 2 && <PageInfo>...</PageInfo>}
        </>
      )}

      {visiblePages.map((page) => (
        <PaginationButton
          key={page}
          onClick={() => handlePageChange(page)}
          $active={page === currentPage}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {page}
        </PaginationButton>
      ))}

      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
            <PageInfo>...</PageInfo>
          )}
          <PaginationButton
            onClick={() => handlePageChange(totalPages)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {totalPages}
          </PaginationButton>
        </>
      )}

      <PaginationButton
        onClick={() => handlePageChange(currentPage + 1)}
        $disabled={currentPage === totalPages}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Next page"
      >
        <FiChevronRight />
      </PaginationButton>
    </PaginationContainer>
  );
};

export default BlogPagination;
