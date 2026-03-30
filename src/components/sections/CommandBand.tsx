'use client';

import React, { useState, useEffect, useRef } from 'react';
import { liveMetrics } from '@/lib/data';
import { ChevronLeft, ChevronRight, TrendingUp, TrendingDown, Minus, Activity, Radar } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

export function CommandBand() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setScrollPosition(scrollLeft);
      setCanScrollLeft(scrollLeft > 50);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 50);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      handleScroll();
    }
    return () => container?.removeEventListener('scroll', handleScroll);
  }, []);

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-3 h-3 text-emerald-400" />;
      case 'down':
        return <TrendingDown className="w-3 h-3 text-red-400" />;
      default:
        return <Minus className="w-3 h-3 text-slate-500" />;
    }
  };

  return (
    <section className="relative bg-slate-900/80 backdrop-blur-xl border-y border-white/5 py-6 overflow-hidden">
      {/* Gradient fades */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-20" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-20" />

      {/* Section label */}
      <div className="container mx-auto px-6 mb-4">
        <div className="flex items-center gap-2">
          <Radar className="w-4 h-4 text-emerald-400 signal-pulse" />
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Live Intelligence Feed
          </span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>
      </div>

      {/* Scroll controls */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 z-30">
        <Button
          variant="outline"
          size="sm"
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={`rounded-lg glass-light border-white/10 text-white hover:border-forest-400 transition-all ${
            !canScrollLeft && 'opacity-0 pointer-events-none'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="absolute top-1/2 right-4 -translate-y-1/2 z-30">
        <Button
          variant="outline"
          size="sm"
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className={`rounded-lg glass-light border-white/10 text-white hover:border-forest-400 transition-all ${
            !canScrollRight && 'opacity-0 pointer-events-none'
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Metrics scroll container */}
      <div
        ref={containerRef}
        className="flex items-center gap-3 overflow-x-auto scrollbar-hide scroll-smooth px-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {liveMetrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex-shrink-0"
          >
            <div className="group relative glass-light rounded-xl p-4 border border-white/5 min-w-[180px] hover:border-forest-500/30 transition-all duration-300 card-intelligence cursor-pointer">
              {/* Live indicator */}
              <div className="absolute top-3 right-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>

              {/* Value */}
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-white tabular-nums">
                  {metric.value.toLocaleString()}
                </span>
                {metric.unit && (
                  <span className="text-xs text-slate-500 font-medium">
                    {metric.unit}
                  </span>
                )}
              </div>

              {/* Label */}
              <div className="text-xs text-slate-400 uppercase tracking-wider mb-3">
                {metric.label}
              </div>

              {/* Trend */}
              {metric.trend && metric.trendValue !== undefined && (
                <div className="flex items-center gap-2">
                  {getTrendIcon(metric.trend)}
                  <span className={`text-xs font-medium ${
                    metric.trend === 'up' ? 'text-emerald-400' :
                    metric.trend === 'down' ? 'text-red-400' :
                    'text-slate-500'
                  }`}>
                    {metric.trend === 'up' && '+'}
                    {metric.trendValue} new
                  </span>
                </div>
              )}

              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-forest-500/0 to-glacier-500/0 group-hover:from-forest-500/5 group-hover:to-glacier-500/5 transition-all duration-300 rounded-xl" />
            </div>
          </motion.div>
        ))}

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: liveMetrics.length * 0.05 }}
          className="flex-shrink-0"
        >
          <div className="glass-light rounded-xl p-4 border border-dashed border-white/10 min-w-[180px] flex items-center justify-center cursor-pointer hover:border-forest-500/50 transition-all duration-300">
            <div className="text-center">
              <Activity className="w-6 h-6 text-slate-500 mx-auto mb-2" />
              <span className="text-xs text-slate-400 uppercase tracking-wider">
                View All Metrics
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Hide scrollbar */}
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
