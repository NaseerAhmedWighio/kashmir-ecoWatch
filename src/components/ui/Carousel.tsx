'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CarouselProps {
  children: React.ReactNode;
  className?: string;
  itemWidth?: {
    mobile: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: string;
  showArrows?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  snapAlign?: 'start' | 'center' | 'end';
  ariaLabel?: string;
}

export function Carousel({
  children,
  className,
  itemWidth = { mobile: 280, tablet: 300, desktop: 320 },
  gap = 'gap-3 sm:gap-4 md:gap-6',
  showArrows = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  snapAlign = 'start',
  ariaLabel = 'Carousel',
}: CarouselProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const getScrollAmount = useCallback(() => {
    if (!containerRef.current) return 300;
    const containerWidth = containerRef.current.clientWidth;
    // Scroll by approximately one item width based on breakpoint
    if (containerWidth >= 1024) return itemWidth.desktop || itemWidth.tablet || itemWidth.mobile;
    if (containerWidth >= 768) return itemWidth.tablet || itemWidth.mobile;
    return itemWidth.mobile;
  }, [itemWidth]);

  // Calculate visible items on client-side only
  useEffect(() => {
    const calculateVisibleItems = () => {
      const itemWidthTotal = itemWidth.mobile + (parseInt(gap.split(' ')[0]?.replace('gap-', '') || '12') * 4);
      if (typeof window !== 'undefined') {
        setVisibleItems(Math.floor(window.innerWidth / itemWidthTotal));
      }
    };

    calculateVisibleItems();
    window.addEventListener('resize', calculateVisibleItems);
    return () => window.removeEventListener('resize', calculateVisibleItems);
  }, [itemWidth.mobile, gap]);

  const checkScrollPosition = useCallback(() => {
    if (!containerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    setScrollPosition(scrollLeft);
    setIsAtStart(scrollLeft < 10);
    setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
  }, []);

  useEffect(() => {
    checkScrollPosition();
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      window.addEventListener('resize', checkScrollPosition);
      return () => {
        container.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', checkScrollPosition);
      };
    }
  }, [checkScrollPosition]);

  // Auto-play functionality
  useEffect(() => {
    if (autoPlay && !isDragging) {
      autoPlayRef.current = setInterval(() => {
        if (!containerRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          // At end, scroll to start
          containerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll next
          containerRef.current.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        }
      }, autoPlayInterval);

      return () => {
        if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      };
    }
  }, [autoPlay, autoPlayInterval, isDragging, getScrollAmount]);

  const scrollLeft_fn = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    }
  }, [getScrollAmount]);

  const scrollRight = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    }
  }, [getScrollAmount]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current || document.activeElement !== containerRef.current) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollLeft_fn();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollRight();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [scrollLeft_fn, scrollRight]);

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    if (containerRef.current) {
      setScrollLeft(containerRef.current.scrollLeft);
    }
    // Pause autoplay while dragging
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const x = e.touches[0].clientX;
    const walk = (x - startX) * 1.5; // Scroll speed multiplier
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    if (containerRef.current) {
      setScrollLeft(containerRef.current.scrollLeft);
    }
    containerRef.current?.style.setProperty('cursor', 'grabbing');
    // Pause autoplay while dragging
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.clientX;
    const walk = (x - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    containerRef.current?.style.setProperty('cursor', 'grab');
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  return (
    <div className={cn('relative group', className)}>
      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <button
            onClick={scrollLeft_fn}
            disabled={isAtStart}
            className={cn(
              'absolute left-0 top-1/2 -translate-y-1/2 z-20',
              'w-10 h-10 sm:w-12 sm:h-12 rounded-full',
              'bg-slate-900/90 backdrop-blur-sm border border-white/20',
              'flex items-center justify-center',
              'transition-all duration-300 ease-out',
              'hover:bg-forest-600 hover:border-forest-500 hover:scale-110',
              'focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2 focus:ring-offset-slate-900',
              'shadow-lg',
              isAtStart && 'opacity-0 cursor-not-allowed pointer-events-none',
              'group-hover:opacity-100 opacity-0'
            )}
            aria-label="Previous items"
            type="button"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>

          <button
            onClick={scrollRight}
            disabled={isAtEnd}
            className={cn(
              'absolute right-0 top-1/2 -translate-y-1/2 z-20',
              'w-10 h-10 sm:w-12 sm:h-12 rounded-full',
              'bg-slate-900/90 backdrop-blur-sm border border-white/20',
              'flex items-center justify-center',
              'transition-all duration-300 ease-out',
              'hover:bg-forest-600 hover:border-forest-500 hover:scale-110',
              'focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2 focus:ring-offset-slate-900',
              'shadow-lg',
              isAtEnd && 'opacity-50 cursor-not-allowed',
              'group-hover:opacity-100 opacity-0'
            )}
            aria-label="Next items"
            type="button"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
        </>
      )}

      {/* Carousel Container */}
      <div
        ref={containerRef}
        className={cn(
          'flex overflow-x-auto scrollbar-hide',
          gap,
          'pb-4 -mb-4', // Allow shadow overflow
          snapAlign === 'center' && 'snap-center',
          snapAlign === 'end' && 'snap-end',
          snapAlign === 'start' && 'snap-start'
        )}
        style={{
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        role="region"
        aria-label={ariaLabel}
        aria-roledescription="carousel"
        tabIndex={0}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>

      {/* Scroll indicators (dots) - optional, shown on mobile */}
      <div className="flex justify-center gap-2 mt-4 sm:hidden">
        {(() => {
          const dotCount = Math.ceil(React.Children.count(children) / visibleItems);
          return Array.from({ length: dotCount }, (_, index) => {
            const isActive = scrollPosition < (index + 1) * itemWidth.mobile;
            return (
              <button
                key={index}
                onClick={() => containerRef.current?.scrollTo({
                  left: index * itemWidth.mobile,
                  behavior: 'smooth'
                })}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-300',
                  isActive ? 'bg-forest-500 w-4' : 'bg-slate-600'
                )}
                aria-label={`Go to slide ${index + 1}`}
                type="button"
              />
            );
          });
        })()}
      </div>
    </div>
  );
}
