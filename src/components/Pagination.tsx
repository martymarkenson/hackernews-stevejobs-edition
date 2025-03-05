'use client';

import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath = '/',
}: PaginationProps) {
  return (
    <div className="pagination">
      <a href="#" className={currentPage === 1 ? 'active' : ''}>1</a>
      <a href="#" className={currentPage === 2 ? 'active' : ''}>2</a>
      <a href="#" className={currentPage === 3 ? 'active' : ''}>3</a>
      <a href="#" className={currentPage === 4 ? 'active' : ''}>4</a>
      <a href="#" className={currentPage === 5 ? 'active' : ''}>5</a>
      <a href="#">More</a>
    </div>
  );
} 