import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { PaginationContainer, PageButton, PageEllipsis } from './Pagination.styles';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const renderPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    // Always show first page
    if (startPage > 1) {
      pages.push(
        <PageButton key={1} onClick={() => onPageChange(1)}>
          1
        </PageButton>
      );
      if (startPage > 2) {
        pages.push(<PageEllipsis key="ellipsis-1">...</PageEllipsis>);
      }
    }

    // Add pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PageButton key={i} active={currentPage === i} onClick={() => onPageChange(i)}>
          {i}
        </PageButton>
      );
    }

    // Always show last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(<PageEllipsis key="ellipsis-2">...</PageEllipsis>);
      }
      pages.push(
        <PageButton key={totalPages} onClick={() => onPageChange(totalPages)}>
          {totalPages}
        </PageButton>
      );
    }

    return pages;
  };

  return (
    <PaginationContainer>
      <PageButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FiChevronLeft />
      </PageButton>
      {renderPageNumbers()}
      <PageButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FiChevronRight />
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;
