'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface BackgroundCarouselProps {
  images: string[];
  interval?: number;
  className?: string;
}

export function BackgroundCarousel({
  images,
  interval = 5000,
  className,
}: BackgroundCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const next = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [next, interval, images.length]);

  return (
    <>
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${src})`,
            opacity: i === currentIndex ? 1 : 0,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-[#160C27]/80 via-[#160C27]/60 to-[#160C27]/80" />

      {images.length > 1 && (
        <div className={cn('absolute z-20 flex gap-3 left-1/2 -translate-x-1/2 bottom-4 lg:left-auto lg:right-6 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-0 lg:flex-col', className)}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                'w-2.5 h-2.5 rounded-full transition-all duration-300',
                i === currentIndex
                  ? 'bg-white scale-125 shadow-[0_0_8px_rgba(255,255,255,0.5)]'
                  : 'bg-white/40 hover:bg-white/60'
              )}
              aria-label={`Slide ${i + 1}`}
              type="button"
            />
          ))}
        </div>
      )}
    </>
  );
}
