import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'outline' | 'stable' | 'monitoring' | 'critical';
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
    stable: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    monitoring: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    critical: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  };

  const sizes = {
    sm: 'text-[10px] xs:text-xs px-1.5 py-0.5 sm:px-2 sm:py-0.5 text-center whitespace-nowrap',
    md: 'text-xs px-2 py-1 sm:px-2.5 sm:py-1 whitespace-nowrap',
    lg: 'text-xs sm:text-sm px-2.5 py-1 sm:px-3 sm:py-1.5 whitespace-nowrap',
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
