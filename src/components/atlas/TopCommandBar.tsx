'use client';

import React from 'react';
import { Search, Share2, Download, Maximize2, SlidersHorizontal, X } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { searchAtlas, SearchResult, getTotalResults } from '@/lib/atlas-search';
import { SearchResultsDropdown } from './SearchResultsDropdown';

interface TopCommandBarProps {
  onSearch?: (query: string) => void;
  onToggleLayers?: () => void;
  layerCount?: number;
  onFeatureSelect?: (feature: SearchResult) => void;
}

export function TopCommandBar({ onSearch, onToggleLayers, layerCount, onFeatureSelect }: TopCommandBarProps) {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [searchResults, setSearchResults] = React.useState<Record<string, SearchResult[]> | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    if (value.length >= 2) {
      const results = searchAtlas(value);
      setSearchResults(results);
      setIsDropdownOpen(getTotalResults(results) > 0);
      onSearch?.(value);
    } else {
      setSearchResults(null);
      setIsDropdownOpen(false);
    }
  };

  const handleSelectResult = (result: SearchResult) => {
    onFeatureSelect?.(result);
    setSearchQuery('');
    setSearchResults(null);
    setIsDropdownOpen(false);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults(null);
    setIsDropdownOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-[400] h-16 bg-slate-900/95 backdrop-blur-xl border-b border-white/10">
      <div className="h-full px-4 md:px-6 flex items-center justify-between gap-4">
        {/* Left: Title & Breadcrumb */}
        <div className="flex items-center gap-3 min-w-fit">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Kashmir EcoWatch
              </span>
              <span className="text-slate-600">/</span>
              <span className="text-xs font-semibold uppercase tracking-widest text-white">
                Atlas
              </span>
            </div>
            <div className="text-sm font-bold text-white mt-0.5">
              Ecological Atlas
            </div>
          </div>
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-xl relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search places, districts, lakes, species, trails..."
              className="w-full h-10 pl-10 pr-10 rounded-lg bg-slate-800/50 border border-white/10 text-sm text-white placeholder-slate-500 outline-none focus:border-forest-500/50 focus:ring-1 focus:ring-forest-500/20 transition-all"
            />
            {searchQuery && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          {/* Search Results Dropdown */}
          {searchResults && (
            <SearchResultsDropdown
              results={searchResults}
              isOpen={isDropdownOpen}
              onSelect={handleSelectResult}
              onClose={() => setIsDropdownOpen(false)}
            />
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Layer count badge */}
          {layerCount !== undefined && (
            <Badge variant="info" size="sm" className="hidden md:flex">
              {layerCount} Active
            </Badge>
          )}

          {/* Toggle layers button (mobile) */}
          <Button
            variant="outline"
            size="sm"
            className="border-white/10 text-white hover:bg-white/5 md:hidden"
            icon={<SlidersHorizontal className="h-4 w-4" />}
            onClick={onToggleLayers}
          />

          {/* Export */}
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex border-white/10 text-white hover:bg-white/5"
            icon={<Download className="h-4 w-4" />}
          >
            Export
          </Button>

          {/* Share */}
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex border-white/10 text-white hover:bg-white/5"
            icon={<Share2 className="h-4 w-4" />}
          >
            Share
          </Button>

          {/* Fullscreen */}
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex border-white/10 text-white hover:bg-white/5"
            icon={<Maximize2 className="h-4 w-4" />}
          />
        </div>
      </div>
    </div>
  );
}
