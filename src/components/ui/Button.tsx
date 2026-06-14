import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  icon?: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  className,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap';

  const variants = {
    primary: 'bg-emerald-700 hover:bg-emerald-500 text-white shadow-lg hover:shadow-xl focus:ring-emerald-500',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-white shadow-md hover:shadow-lg focus:ring-slate-500',
    outline: 'border-2 border- emerald-700/30 text- emerald-700 hover:bg-emerald-700 hover:text-white bg-transparent transition-all duration-200',
    ghost: 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs sm:text-sm gap-1.5',
    md: 'px-4 py-2 sm:px-5 sm:py-2.5 text-sm gap-2',
    lg: 'px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base gap-2 rounded-xl',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
