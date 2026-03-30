import React from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  label: string;
  value: number;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: number;
  className?: string;
  animate?: boolean;
}

export function MetricCard({
  label,
  value,
  unit,
  trend,
  trendValue,
  className,
  animate = true,
}: MetricCardProps) {
  const trendIcons = {
    up: <TrendingUp className="w-3 h-3" />,
    down: <TrendingDown className="w-3 h-3" />,
    stable: <Minus className="w-3 h-3" />,
  };

  const trendColors = {
    up: 'text-emerald-500',
    down: 'text-red-500',
    stable: 'text-slate-400',
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center px-4 py-3 min-w-[100px]',
        'border-r border-slate-200 dark:border-slate-700 last:border-r-0',
        'hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors',
        animate && 'metric-pulse',
        className
      )}
    >
      <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tabular-nums">
        {value.toLocaleString()}
        {unit && <span className="text-sm ml-1 text-slate-500">{unit}</span>}
      </div>
      <div className="text-xs text-slate-600 dark:text-slate-400 mt-1 text-center">
        {label}
      </div>
      {trend && trendValue !== undefined && (
        <div className={cn('flex items-center gap-1 mt-1 text-xs', trendColors[trend])}>
          {trendIcons[trend]}
          <span>{Math.abs(trendValue)} new</span>
        </div>
      )}
    </div>
  );
}
