'use client';

import React from 'react';
import { Search, MapPin, Shield, Droplet, Footprints, TreePine, Building } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { SearchResult } from '@/lib/atlas-search';

interface SearchResultsDropdownProps {
  results: Record<string, SearchResult[]>;
  isOpen: boolean;
  onSelect: (result: SearchResult) => void;
  onClose: () => void;
}

const getTypeIcon = (type: string) => {
  const icons: Record<string, React.ReactNode> = {
    species: <TreePine className="h-4 w-4" />,
    protected_area: <Shield className="h-4 w-4" />,
    lake: <Droplet className="h-4 w-4" />,
    wetland: <Droplet className="h-4 w-4" />,
    trail: <Footprints className="h-4 w-4" />,
    district: <Building className="h-4 w-4" />,
  };
  return icons[type] || <MapPin className="h-4 w-4" />;
};

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    species: 'text-purple-400 bg-purple-500/10',
    protected_area: 'text-emerald-400 bg-emerald-500/10',
    lake: 'text-blue-400 bg-blue-500/10',
    wetland: 'text-cyan-400 bg-cyan-500/10',
    trail: 'text-amber-400 bg-amber-500/10',
    district: 'text-slate-400 bg-slate-500/10',
  };
  return colors[type] || 'text-slate-400 bg-slate-500/10';
};

export function SearchResultsDropdown({
  results,
  isOpen,
  onSelect,
  onClose,
}: SearchResultsDropdownProps) {
  const [selectedIndex, setSelectedIndex] = React.useState(-1);

  // Flatten results for keyboard navigation
  const allResults = React.useMemo(() => {
    const flattened: SearchResult[] = [];
    Object.entries(results).forEach(([_, items]) => {
      flattened.push(...items);
    });
    return flattened;
  }, [results]);

  // Handle keyboard navigation
  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, allResults.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        onSelect(allResults[selectedIndex]);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, allResults, selectedIndex, onSelect, onClose]);

  if (!isOpen || Object.values(results).every(r => r.length === 0)) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute top-full left-0 right-0 mt-2 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden z-[500]"
      >
        <div className="max-h-96 overflow-y-auto">
          {Object.entries(results).map(([type, items]) => {
            if (items.length === 0) return null;

            return (
              <div key={type} className="border-b border-white/5 last:border-0">
                <div className="px-4 py-2 bg-white/5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {type.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </div>
                {items.map((result, idx) => {
                  const globalIndex = allResults.findIndex(r => r.id === result.id);
                  const isSelected = globalIndex === selectedIndex;

                  return (
                    <button
                      key={result.id}
                      onClick={() => onSelect(result)}
                      onMouseEnter={() => setSelectedIndex(globalIndex)}
                      className={`w-full px-4 py-3 flex items-start gap-3 transition-colors ${
                        isSelected ? 'bg-white/5' : 'hover:bg-white/5'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${getTypeColor(result.type)}`}>
                        {getTypeIcon(result.type)}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-medium text-white text-sm">{result.name}</div>
                        <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                          {result.description}
                        </div>
                        {result.district && (
                          <div className="text-xs text-slate-500 mt-1">
                            {result.district}
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
