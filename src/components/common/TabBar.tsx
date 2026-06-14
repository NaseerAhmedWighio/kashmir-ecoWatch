'use client';

import React from 'react';
import { Filter, Grid3X3, List } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Tab {
  key: string;
  label: string;
  description: string;
}

interface TabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
  onScopeSync?: (label: string) => void;
  showFilters?: boolean;
  onToggleFilters?: () => void;
  filteredCount?: number;
  totalCount?: number;
  countLabel?: string;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
}

export function TabBar({
  tabs,
  activeTab,
  onTabChange,
  onScopeSync,
  showFilters,
  onToggleFilters,
  filteredCount,
  totalCount,
  countLabel,
  viewMode,
  onViewModeChange,
}: TabBarProps) {
  return (
    <div className="container mx-auto px-6 mt-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
        {/* Tabs */}
        <div className="w-full lg:w-auto overflow-x-auto">
          <div className="inline-flex min-w-max items-center gap-2 p-1 glass-intense border border-white/10 rounded-xl">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  onTabChange(tab.key);
                  onScopeSync?.(tab.key === 'all' ? 'all' : tab.label);
                }}
                className={`shrink-0 px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'bg-emerald-700 hover:bg-emerald-500 text-white shadow'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Active tab description */}
        <span className="hidden lg:block flex-1 px-4 text-xs text-slate-500 truncate">
          {tabs.find((t) => t.key === activeTab)?.description}
        </span>

        {/* Filters + count + view mode toggle */}
        {(onToggleFilters || filteredCount !== undefined || viewMode) && (
          <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 lg:ml-auto">
            {onToggleFilters && (
              <Button
                variant="outline"
                className="border-white/20 text-white"
                icon={<Filter className="w-4 h-4" />}
                onClick={onToggleFilters}
              >
                {showFilters ? 'Hide Filters' : 'Filters'}
              </Button>
            )}

            {filteredCount !== undefined && totalCount !== undefined && (
              <span className="text-sm text-slate-400 whitespace-nowrap">
                <strong className="text-white">{filteredCount}</strong> of{' '}
                <strong className="text-white">{totalCount}</strong>{' '}
                {countLabel || 'items'}
              </span>
            )}

            {viewMode && onViewModeChange && (
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewModeChange('grid')}
                  className={
                    viewMode === 'grid'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'text-slate-400'
                  }
                  icon={<Grid3X3 className="w-4 h-4" />}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewModeChange('list')}
                  className={
                    viewMode === 'list'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'text-slate-400'
                  }
                  icon={<List className="w-4 h-4" />}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
