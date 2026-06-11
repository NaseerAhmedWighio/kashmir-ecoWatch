'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { BackgroundCarousel } from '@/components/ui/BackgroundCarousel';

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

  return (
    <div className={cn('relative bg-[#160C27] overflow-hidden', className)}>
      <BackgroundCarousel images={images} />

      {gridOverlay && (
        <div className="absolute inset-0 bg-grid" />
      )}

      <div className={cn('relative pt-20 sm:pt-24 md:pt-28 lg:pt-48 pb-4 sm:pb-8 md:pb-12 lg:pb-20 container mx-auto px-6', contentClassName)}>
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
            {icon}
            {badge ? badge : label ? (
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-400">
                {label}
              </span>
            ) : null}
          </div>

          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 sm:mb-6 leading-tight tracking-tight">
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
      </div>
    </div>
  );
}
