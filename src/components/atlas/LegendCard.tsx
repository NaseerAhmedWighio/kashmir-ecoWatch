'use client';

import React from 'react';
import { Layers } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface LegendItem {
  label: string;
  color: string;
  shape?: 'circle' | 'square' | 'line' | 'polygon';
  count?: number;
}

interface LegendCardProps {
  title?: string;
  items: LegendItem[];
  visible?: boolean;
}

export function LegendCard({ title = 'Legend', items, visible = true }: LegendCardProps) {
  if (!visible) return null;

  return (
    <Card className="glass-intense border-white/10 p-3" padding="none">
      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-white/10">
        <Layers className="h-4 w-4 text-slate-400" />
        <span className="text-xs font-semibold uppercase tracking-wider text-white">
          {title}
        </span>
      </div>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3">
            {/* Symbol */}
            <div
              className={`flex items-center justify-center ${
                item.shape === 'line' ? 'w-6 h-0.5' : 'w-3 h-3'
              } ${item.color} ${
                item.shape === 'square' ? 'rounded-sm' : item.shape === 'line' ? '' : 'rounded-full'
              }`}
              style={
                item.shape === 'line'
                  ? { backgroundColor: item.color.replace('bg-', '') }
                  : undefined
              }
            />
            {/* Label */}
            <span className="text-xs text-slate-300 flex-1">{item.label}</span>
            {/* Count */}
            {item.count !== undefined && (
              <Badge variant="secondary" size="sm">
                {item.count.toLocaleString()}
              </Badge>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
