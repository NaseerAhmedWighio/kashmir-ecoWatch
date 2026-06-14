'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { BackgroundCarousel, CarouselHandle } from '@/components/ui/BackgroundCarousel';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface HeadingProps {
  title: React.ReactNode;
  subtitle: string;
  icon: React.ReactNode;
  label?: string;
  badge?: React.ReactNode;
  images?: string[];
  breadcrumbs?: Breadcrumb[];
  actions?: React.ReactNode;
  gridOverlay?: boolean;
  className?: string;
  contentClassName?: string;
}

function DotsRow({ index, total, onGoTo }: { index: number; total: number; onGoTo: (i: number) => void }) {
  if (total <= 1) return null;
  return (
    <div className="flex items-center justify-center gap-3 py-4">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          onClick={() => onGoTo(i)}
          className={cn(
            'w-2.5 h-2.5 rounded-full transition-all duration-300',
            i === index
              ? 'bg-white scale-125 shadow-[0_0_8px_rgba(255,255,255,0.5)]'
              : 'bg-white/40 hover:bg-white/60'
          )}
          aria-label={`Slide ${i + 1}`}
          type="button"
        />
      ))}
    </div>
  );
}

export function Heading({
  title,
  subtitle,
  icon,
  label,
  badge,
  images = ['/images/protected-network.png'],
  breadcrumbs,
  actions,
  gridOverlay = false,
  className,
  contentClassName,
}: HeadingProps) {
  const router = useRouter();
  const carouselRef = useRef<CarouselHandle>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  return (
    <div className={cn('relative bg-[#160C27] overflow-hidden', className)}>
      <BackgroundCarousel
        ref={carouselRef}
        images={images}
        onIndexChange={setCarouselIndex}
      />

      {gridOverlay && (
        <div className="absolute inset-0 bg-grid" />
      )}

      <div className={cn('relative pt-20 sm:pt-24 md:pt-28 lg:pt-48 pb-0 lg:pb-20 container mx-auto px-6', contentClassName)}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center gap-1 text-xs md:text-sm text-slate-400 mb-6">
              {breadcrumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  {idx > 0 && <span className="text-slate-600">/</span>}
                  {crumb.href ? (
                    <button
                      onClick={() => router.push(crumb.href)}
                      className="hover:text-white transition-colors"
                    >
                      {crumb.label}
                    </button>
                  ) : (
                    <span className="text-white font-medium">{crumb.label}</span>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-3 mb-6">
            <div className='mb-2 w-4 h-4 sm:w-3 sm:h-3 md:w-4 md:h-4'>
            {icon}
            </div>
            {badge ? badge : label ? (
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-slate-400">
                {label}
              </span>
            ) : null}
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-6xl font-black text-white mb-4 sm:mb-6 leading-[1.15] tracking-tight overflow-visible pb-1">
            {title}
          </h1>

          {subtitle && (
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-400 mb-8 leading-relaxed max-w-3xl line-clamp-3">
              {subtitle}
            </p>
          )}

          {actions && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center flex-wrap gap-3 pb-16 sm:pb-0 [&_button]:w-full sm:[&_button]:w-auto [&_a]:w-full sm:[&_a]:w-auto">
              {actions}
            </div>
          )}
        </motion.div>

        <div className="lg:hidden">
          <DotsRow
            index={carouselIndex}
            total={images.length}
            onGoTo={(i) => carouselRef.current?.goTo(i)}
          />
        </div>
      </div>
    </div>
  );
}
