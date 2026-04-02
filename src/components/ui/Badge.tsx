import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export function Badge({ children, variant = 'default', size = 'md', className, onClick }: BadgeProps) {
  const variants = {
    default: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200',
    secondary: 'bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200',
    success: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    warning: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    danger: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    info: 'bg-glacier-100 dark:bg-glacier-900/30 text-glacier-700 dark:text-glacier-400',
    outline: 'bg-transparent border border-slate-600 text-slate-400',
  };

  const sizes = {
    sm: 'text-[8px] px-2 py-0.5 md:text-xs text-center',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      onClick={onClick}
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        variants[variant],
        sizes[size],
        className,
        onClick && 'cursor-pointer hover:opacity-80 transition-opacity'
      )}
    >
      {children}
    </span>
  );
}
