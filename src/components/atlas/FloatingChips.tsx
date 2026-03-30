'use client';

import React from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

interface Chip {
  id: string;
  label: string;
  value?: string;
  removable?: boolean;
}

interface FloatingChipsProps {
  chips: Chip[];
  onRemove?: (id: string) => void;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

export function FloatingChips({ chips, onRemove, position = 'bottom-left' }: FloatingChipsProps) {
  const positionClasses = {
    'top-left': 'top-20 left-4',
    'top-right': 'top-20 right-4',
    'bottom-left': 'bottom-20 left-4',
    'bottom-right': 'bottom-20 right-4',
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-[350] flex flex-col gap-2`}>
      {chips.map((chip) => (
        <motion.div
          key={chip.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/90 backdrop-blur-sm border border-white/10 shadow-lg"
        >
          <span className="text-xs text-slate-400">{chip.label}</span>
          {chip.value && (
            <span className="text-xs font-semibold text-white">{chip.value}</span>
          )}
          {chip.removable && onRemove && (
            <button
              onClick={() => onRemove(chip.id)}
              className="ml-1 text-slate-500 hover:text-white transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </motion.div>
      ))}
    </div>
  );
}
