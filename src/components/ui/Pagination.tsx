'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  pageSize: number;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
  className,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);

      if (currentPage <= 3) {
        start = 2;
        end = Math.min(maxVisible, totalPages - 1);
      }
      if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - maxVisible + 1);
        end = totalPages - 1;
      }

      if (start > 2) pages.push('ellipsis');
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push('ellipsis');
      pages.push(totalPages);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={cn('flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 pb-4', className)}>
      <span className="text-xs sm:text-sm text-slate-400 whitespace-nowrap order-2 sm:order-1">
        Showing <strong className="text-white">{startItem.toLocaleString()}</strong>
        {' '}–{' '}
        <strong className="text-white">{endItem.toLocaleString()}</strong>
        {' '}of{' '}
        <strong className="text-white">{totalItems.toLocaleString()}</strong>
        {' '}results
      </span>

      <nav className="flex items-center gap-1 order-1 sm:order-2" aria-label="Pagination">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className={cn(
            'flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200',
            'text-slate-400 hover:text-white hover:bg-white/10',
            'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-400',
            'focus:outline-none focus:ring-2 focus:ring-emerald-500/50'
          )}
          aria-label="Previous page"
          type="button"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1">
          {pageNumbers.map((page, idx) =>
            page === 'ellipsis' ? (
              <span
                key={`ellipsis-${idx}`}
                className="flex items-center justify-center w-9 h-9 text-xs text-slate-500"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={cn(
                  'flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-all duration-200',
                  'focus:outline-none focus:ring-2 focus:ring-emerald-500/50',
                  page === currentPage
                    ? 'bg-emerald-700 hover:bg-emerald-500 text-white shadow-md shadow-emerald-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/10'
                )}
                aria-label={`Page ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
                type="button"
              >
                {page}
              </button>
            )
          )}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={cn(
            'flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-200',
            'text-slate-400 hover:text-white hover:bg-white/10',
            'disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-slate-400',
            'focus:outline-none focus:ring-2 focus:ring-emerald-500/50'
          )}
          aria-label="Next page"
          type="button"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </nav>
    </div>
  );
}
