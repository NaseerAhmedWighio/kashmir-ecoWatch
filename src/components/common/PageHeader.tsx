'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ChevronRight, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface PageHeaderProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  breadcrumbs?: Array<{ label: string; href: string }>;
  actions?: React.ReactNode;
}

export function PageHeader({ icon, title, subtitle, breadcrumbs, actions }: PageHeaderProps) {
  return (
    <div className="pt-20 sm:pt-24 md:pt-28 lg:pt-48 pb-4 sm:pb-8 md:pb-12 lg:pb-20 container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl"
      >
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <Link href="/" className="flex items-center gap-1 hover:text-white transition-colors">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight className="w-4 h-4" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-white font-medium">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Icon and Title */}
        <div className="flex items-center gap-2 mb-4">
          {icon}
          <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-400">
            Protected Network
          </span>
        </div>
        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 sm:mb-6 leading-tight tracking-tight max-w-xl">{title}</h1>
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-400 mb-8 leading-relaxed max-w-3xl">{subtitle}</p>

        {/* Actions */}
        {actions && <div className="flex flex-col sm:flex-row flex-wrap gap-4">{actions}</div>}
      </motion.div>
    </div>
  );
}
