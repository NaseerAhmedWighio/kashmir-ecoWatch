'use client';

import { useState, useEffect } from 'react';

interface UseScrolledHeaderOptions {
  /** Scroll threshold in pixels to trigger compact state (default: 50) */
  threshold?: number;
  /** Enable smooth transition delay on scroll up (default: true) */
  smoothTransition?: boolean;
}

/**
 * Premium scroll-reactive header hook
 * Tracks scroll position and direction for intelligent header state management
 */
export function useScrolledHeader(options: UseScrolledHeaderOptions = {}) {
  const { threshold = 50, smoothTransition = true } = options;
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    let compactTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const direction = currentScrollY > lastScrollY ? 'down' : 'up';
          const isBelowThreshold = currentScrollY > threshold;

          // Update scroll direction
          setScrollDirection(direction);
          setLastScrollY(currentScrollY);
          setIsScrolled(isBelowThreshold);

          // Compact state logic with smooth transition
          if (smoothTransition) {
            if (isBelowThreshold && direction === 'down') {
              // Scroll down past threshold - compact immediately
              clearTimeout(compactTimeout);
              setIsCompact(true);
            } else if (direction === 'up') {
              // Scroll up - delay expansion for premium feel
              clearTimeout(compactTimeout);
              compactTimeout = setTimeout(() => {
                if (window.scrollY <= threshold) {
                  setIsCompact(false);
                }
              }, 150);
            }
          } else {
            setIsCompact(isBelowThreshold);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check
    if (typeof window !== 'undefined') {
      const initialScroll = window.scrollY;
      setIsScrolled(initialScroll > threshold);
      setIsCompact(initialScroll > threshold);
      setLastScrollY(initialScroll);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(compactTimeout);
    };
  }, [threshold, lastScrollY, smoothTransition]);

  return {
    isScrolled,
    isCompact,
    scrollDirection,
    headerState: isCompact ? 'compact' : isScrolled ? 'transitioning' : 'expanded',
  };
}
