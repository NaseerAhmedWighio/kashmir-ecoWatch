import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  className = '',
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-300 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            {leftIcon}
          </div>
        )}
        <input
          className={`w-full px-4 py-2.5 rounded-lg bg-slate-900/50 border ${
            error ? 'border-red-500' : 'border-white/10'
          } text-white placeholder-slate-500 focus:outline-none focus:ring-2 ${
            error ? 'focus:ring-red-500' : 'focus:ring-blue-500'
          } focus:border-transparent transition-all ${
            leftIcon ? 'pl-10' : ''
          } ${
            rightIcon ? 'pr-10' : ''
          } ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
