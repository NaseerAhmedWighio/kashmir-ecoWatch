'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, FileText, MapPin, Activity, Shield, Droplet, Footprints, AlertTriangle, Book } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { searchAll } from '@/data';
import { useRouter } from 'next/navigation';

interface SearchResult {
  species?: any[];
  protectedAreas?: any[];
  waterBodies?: any[];
  trails?: any[];
  districts?: any[];
  alerts?: any[];
  reports?: any[];
}

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (query.length >= 2) {
      setIsLoading(true);
      // Simulate API delay
      setTimeout(() => {
        const searchResults = searchAll(query);
        setResults(searchResults);
        setIsLoading(false);
      }, 300);
    } else {
      setResults(null);
    }
  }, [query]);

  const getResultCount = (results: SearchResult | null) => {
    if (!results) return 0;
    return (
      (results.species?.length || 0) +
      (results.protectedAreas?.length || 0) +
      (results.waterBodies?.length || 0) +
      (results.trails?.length || 0) +
      (results.districts?.length || 0) +
      (results.alerts?.length || 0) +
      (results.reports?.length || 0)
    );
  };

  const getIconForType = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      species: <Activity className="w-4 h-4" />,
      protectedAreas: <Shield className="w-4 h-4" />,
      waterBodies: <Droplet className="w-4 h-4" />,
      trails: <Footprints className="w-4 h-4" />,
      districts: <MapPin className="w-4 h-4" />,
      alerts: <AlertTriangle className="w-4 h-4" />,
      reports: <Book className="w-4 h-4" />,
    };
    return icons[type] || <MapPin className="w-4 h-4" />;
  };

  const getRouteForType = (type: string, slug: string) => {
    const routes: Record<string, string> = {
      species: `/biodiversity/${slug}`,
      protectedAreas: `/protected-network/${slug}`,
      waterBodies: `/water-systems/lakes/${slug}`,
      trails: `/trails-sightings/hiking-trails/${slug}`,
      districts: `/districts/${slug}`,
      alerts: `/risk-monitoring/live-alerts-advisories`,
      reports: `/library/reports/${slug}`,
    };
    return routes[type] || '#';
  };

  const handleSelect = (type: string, slug: string) => {
    setIsOpen(false);
    setQuery('');
    router.push(getRouteForType(type, slug));
  };

  const hasResults = results && getResultCount(results) > 0;

  return (
    <>
      {/* Search trigger in navigation */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative group flex items-center gap-2 px-4 py-2 rounded-lg glass-light border border-white/10 text-sm text-slate-400 hover:text-white hover:border-forest-500/50 transition-all"
      >
        <Search className="w-4 h-4" />
        <span>Search...</span>
        <kbd className="hidden md:inline-flex px-2 py-0.5 text-xs bg-white/5 rounded border border-white/10">
          ⌘K
        </kbd>
      </button>

      {/* Search overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Search modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-3xl glass-intense border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              {/* Search input */}
              <div className="flex items-center gap-4 p-4 border-b border-white/5">
                <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search species, protected areas, lakes, trails, districts, reports..."
                  className="flex-1 bg-transparent border-none outline-none text-white text-lg placeholder-slate-500"
                  autoFocus
                />
                {query && (
                  <button
                    onClick={() => {
                      setQuery('');
                      inputRef.current?.focus();
                    }}
                    className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                )}
              </div>

              {/* Results */}
              <div className="max-h-[60vh] overflow-y-auto">
                {isLoading && (
                  <div className="p-12 text-center">
                    <div className="w-8 h-8 border-2 border-forest-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-slate-400">Searching...</p>
                  </div>
                )}

                {!isLoading && !hasResults && query.length >= 2 && (
                  <div className="p-12 text-center">
                    <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400">No results found for "{query}"</p>
                    <p className="text-sm text-slate-500 mt-2">Try different keywords or check spelling</p>
                  </div>
                )}

                {!isLoading && hasResults && (
                  <div className="p-4 space-y-6">
                    {/* Species */}
                    {results?.species && results.species.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Activity className="w-4 h-4 text-purple-400" />
                          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Species ({results.species.length})
                          </span>
                        </div>
                        <div className="space-y-2">
                          {results.species.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => handleSelect('species', item.slug)}
                              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors text-left group"
                            >
                              <div>
                                <div className="font-medium text-white group-hover:text-forest-300 transition-colors">
                                  {item.name}
                                </div>
                                <div className="text-sm text-slate-500">{item.scientificName}</div>
                              </div>
                              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-forest-400 transition-colors" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Protected Areas */}
                    {results?.protectedAreas && results.protectedAreas.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Shield className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Protected Areas ({results.protectedAreas.length})
                          </span>
                        </div>
                        <div className="space-y-2">
                          {results.protectedAreas.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => handleSelect('protectedAreas', item.slug)}
                              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors text-left group"
                            >
                              <div>
                                <div className="font-medium text-white group-hover:text-forest-300 transition-colors">
                                  {item.name}
                                </div>
                                <div className="text-sm text-slate-500">{item.district}</div>
                              </div>
                              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-forest-400 transition-colors" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Water Bodies */}
                    {results?.waterBodies && results.waterBodies.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Droplet className="w-4 h-4 text-blue-400" />
                          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Water Bodies ({results.waterBodies.length})
                          </span>
                        </div>
                        <div className="space-y-2">
                          {results.waterBodies.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => handleSelect('waterBodies', item.slug)}
                              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors text-left group"
                            >
                              <div>
                                <div className="font-medium text-white group-hover:text-forest-300 transition-colors">
                                  {item.name}
                                </div>
                                <div className="text-sm text-slate-500">{item.district}</div>
                              </div>
                              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-forest-400 transition-colors" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Districts */}
                    {results?.districts && results.districts.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Districts ({results.districts.length})
                          </span>
                        </div>
                        <div className="space-y-2">
                          {results.districts.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => handleSelect('districts', item.slug)}
                              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors text-left group"
                            >
                              <div>
                                <div className="font-medium text-white group-hover:text-forest-300 transition-colors">
                                  {item.name}
                                </div>
                                <div className="text-sm text-slate-500">District</div>
                              </div>
                              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-forest-400 transition-colors" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Alerts */}
                    {results?.alerts && results.alerts.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <AlertTriangle className="w-4 h-4 text-red-400" />
                          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Alerts ({results.alerts.length})
                          </span>
                        </div>
                        <div className="space-y-2">
                          {results.alerts.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => handleSelect('alerts', item.slug)}
                              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors text-left group"
                            >
                              <div>
                                <div className="font-medium text-white group-hover:text-forest-300 transition-colors">
                                  {item.title}
                                </div>
                                <div className="text-sm text-slate-500">{item.location}</div>
                              </div>
                              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-forest-400 transition-colors" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Reports */}
                    {results?.reports && results.reports.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <Book className="w-4 h-4 text-amber-400" />
                          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                            Reports ({results.reports.length})
                          </span>
                        </div>
                        <div className="space-y-2">
                          {results.reports.map((item) => (
                            <button
                              key={item.id}
                              onClick={() => handleSelect('reports', item.slug)}
                              className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors text-left group"
                            >
                              <div>
                                <div className="font-medium text-white group-hover:text-forest-300 transition-colors">
                                  {item.title}
                                </div>
                                <div className="text-sm text-slate-500">{item.year}</div>
                              </div>
                              <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-forest-400 transition-colors" />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Footer */}
              {!isLoading && !query && (
                <div className="p-4 border-t border-white/5">
                  <p className="text-xs text-slate-500 text-center">
                    Search across species, protected areas, water bodies, trails, districts, alerts, and reports
                  </p>
                </div>
              )}

              {/* Results count */}
              {!isLoading && hasResults && (
                <div className="p-4 border-t border-white/5 bg-white/[0.02]">
                  <p className="text-xs text-slate-500 text-center">
                    {getResultCount(results)} result{getResultCount(results) !== 1 ? 's' : ''} found
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
