'use client';

import React, { useState, useEffect } from 'react';
import { MetricCard } from '@/components/ui/MetricCard';
import { liveMetrics } from '@/lib/data';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function LiveMetricRibbon() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById('metric-ribbon');
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    const container = document.getElementById('metric-ribbon');
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setScrollPosition(scrollLeft);
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const container = document.getElementById('metric-ribbon');
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative bg-white dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 py-4 overflow-hidden">
      {/* Gradient fades on sides */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10" />
      
      {/* Section header */}
      <div className="container mx-auto px-4 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Live Intelligence
          </span>
        </div>
      </div>

      {/* Scroll controls */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 z-20">
        <Button
          variant="outline"
          size="sm"
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={`rounded-full shadow-lg ${!canScrollLeft && 'opacity-0'}`}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="absolute top-1/2 right-0 -translate-y-1/2 z-20">
        <Button
          variant="outline"
          size="sm"
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className={`rounded-full shadow-lg ${!canScrollRight && 'opacity-0'}`}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Metrics scroll container */}
      <div
        id="metric-ribbon"
        className="flex items-center gap-0 overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {liveMetrics.map((metric, index) => (
          <MetricCard
            key={index}
            label={metric.label}
            value={metric.value}
            unit={metric.unit}
            trend={metric.trend}
            trendValue={metric.trendValue}
            className="flex-shrink-0"
          />
        ))}
      </div>

      {/* Hide scrollbar styles */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
