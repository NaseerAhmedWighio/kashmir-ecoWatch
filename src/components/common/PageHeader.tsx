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
    <div className="pt-20 md:pt-28 pb-12 md:pb-16 container mx-auto px-6">
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
          <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">
            Protected Network
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-white mb-4">{title}</h1>
        <p className="text-xl text-slate-400 mb-8">{subtitle}</p>

        {/* Actions */}
        {actions && <div className="flex flex-wrap gap-4">{actions}</div>}
      </motion.div>
    </div>
  );
}
