'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { TabBar } from '@/components/common/TabBar';

interface Tab {
  key: string;
  label: string;
  description: string;
}

interface ScopeTabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
  onScopeChange?: (scope: string) => void;
  showFilters?: boolean;
  onToggleFilters?: () => void;
  filteredCount?: number;
  totalCount?: number;
  countLabel?: string;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
}

export function ScopeTabBar({
  tabs,
  activeTab,
  onTabChange,
  onScopeChange,
  showFilters,
  onToggleFilters,
  filteredCount,
  totalCount,
  countLabel,
  viewMode,
  onViewModeChange,
}: ScopeTabBarProps) {
  const [selectedScope, setSelectedScope] = useState('all');

  const scopeToTabMap = useMemo(() => {
    const map: Record<string, string> = {};
    tabs.forEach((tab) => {
      if (tab.key !== 'all') map[tab.label] = tab.key;
    });
    return map;
  }, [tabs]);

  useEffect(() => {
    if (selectedScope !== 'all' && scopeToTabMap[selectedScope]) {
      onTabChange(scopeToTabMap[selectedScope]);
    }
  }, [selectedScope, scopeToTabMap, onTabChange]);

  const updateScope = (scope: string) => {
    setSelectedScope(scope);
    onScopeChange?.(scope);
  };

  return (
    <TabBar
      tabs={tabs}
      activeTab={activeTab}
      onTabChange={(key) => {
        onTabChange(key);
        const tab = tabs.find(t => t.key === key);
        updateScope(tab && key !== 'all' ? tab.label : 'all');
      }}
      onScopeSync={(label) => updateScope(label)}
      showFilters={showFilters}
      onToggleFilters={onToggleFilters}
      filteredCount={filteredCount}
      totalCount={totalCount}
      countLabel={countLabel}
      viewMode={viewMode}
      onViewModeChange={onViewModeChange}
    />
  );
}
