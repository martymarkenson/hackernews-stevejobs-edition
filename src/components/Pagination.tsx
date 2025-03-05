'use client';

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages?: number;
}

export default function Pagination({ currentPage }: PaginationProps) {
  return (
    <div className="pagination">
      <a href={currentPage > 1 ? `?page=${currentPage - 1}` : '#'} className={currentPage === 1 ? 'disabled' : ''}>
        &laquo; Previous
      </a>
      <a href="#" className="active">{currentPage}</a>
      <a href={`?page=${currentPage + 1}`}>Next &raquo;</a>
    </div>
  );
} 