'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Map, Leaf, BarChart3, ArrowRight, Radar, Satellite, Activity, Search, X, Shield, Droplet, Footprints, AlertTriangle, Book, Database } from 'lucide-react';
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

export function ImmersiveHero() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const router = useRouter();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (query.length >= 2) {
      setIsLoading(true);
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
    setIsSearchOpen(false);
    setQuery('');
    router.push(getRouteForType(type, slug));
  };

  const hasResults = results && getResultCount(results) > 0;

  const suggestionChips = [
    { label: 'Protected Areas', icon: Shield, query: 'protected areas' },
    { label: 'Species', icon: Activity, query: 'hangul' },
    { label: 'Water Bodies', icon: Droplet, query: 'dal lake' },
    { label: 'Districts', icon: Map, query: 'srinagar' },
    { label: 'Trails', icon: Footprints, query: 'trails' },
    { label: 'Alerts', icon: AlertTriangle, query: 'flood' },
  ];

  const exampleSearches = [
    { label: 'Dachigam', type: 'National Park' },
    { label: 'Dal Lake', type: 'Water Body' },
    { label: 'Hangul', type: 'Species' },
    { label: 'Srinagar', type: 'District' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Layer 1: Base Kashmir satellite-relief terrain - dark aerial environmental intelligence surface */}
      <div 
        className="absolute inset-0 hero-satellite-relief" 
        style={{
          backgroundImage: `url('/background.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Layer 2: Eco intelligence overlay - topo + hydrology combined */}
      <div className="absolute inset-0 hero-kashmir-eco-overlay" />

      {/* Layer 3: Top atmospheric fade - subtle depth from top */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-slate-950/40" />

      {/* Layer 4: Content protection gradient - left to right dark fade for readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/60" />

      {/* Layer 5: Bottom fade for smooth content transition */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />

      {/* Layer 6: Cursor spotlight effect - reveals background on hover */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 250px at ${cursorPos.x}px ${cursorPos.y}px, transparent 0%, rgba(2, 6, 23, 0.85) 100%)`,
        }}
      />

      {/* Layer 7: Minimal live monitoring nodes - 5 strategic locations */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { top: '24%', left: '62%' },  // Northern region
          { top: '36%', left: '71%' },  // Eastern region
          { top: '48%', left: '66%' },  // Central region
          { top: '58%', left: '78%' },  // Southern region
          { top: '67%', left: '59%' },  // Western region
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400/80 shadow-[0_0_18px_rgba(52,211,153,0.35)]"
            style={{
              top: pos.top,
              left: pos.left,
            }}
            initial={{ opacity: 0.45, scale: 1 }}
            animate={{ opacity: [0.45, 1, 0.45], scale: [1, 1.35, 1] }}
            transition={{
              duration: 3.2 + i * 0.35,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut'
            }}
          />
        ))}
      </div> */}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32">
        <div className="max-w-[96rem] mx-auto">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-light border border-white/10 mb-8"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-[0.50rem] md:text-xs font-medium text-slate-300 tracking-wide uppercase">
              Live Environmental Intelligence System Active
            </span>
            <Radar className="w-4 h-4 text-emerald-400" />
          </motion.div>

          {/* Main title - Unified Branding */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight tracking-tight"
          >
            Kashmir{' '}
            <span className="gradient-text text-glow">EcoWatch</span>
          </motion.h1>

          {/* Positioning statement - Full institutional line */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-slate-400 mb-4 max-w-3xl leading-relaxed text-balance"
          >
            by Dr. Kumar Foundation USA — Environmental Intelligence Platform for Kashmir
          </motion.p>
          
          {/* Product descriptor */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base md:text-lg text-slate-500 mb-12 max-w-3xl leading-relaxed text-balance"
          >
            A scientific, spatial, and real-time ecological intelligence system for biodiversity,
            water, pollution, seasonal ecology, and disaster monitoring across Kashmir
          </motion.p>

          {/* Primary actions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Button
              size="lg"
              icon={<Map className="w-5 h-5" />}
              className="group relative overflow-hidden bg-gradient-to-r from-forest-600 to-forest-500 hover:from-forest-500 hover:to-forest-400 text-white shadow-2xl glow-forest"
              onClick={() => router.push('/atlas')}
            >
              <span className="relative z-10">Open Atlas</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-forest-400 to-forest-300 opacity-0 group-hover:opacity-20 transition-opacity" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              icon={<Leaf className="w-5 h-5" />}
              className="border-white/20 text-white hover:border-forest-400 hover:text-forest-300 glass-light backdrop-blur-xl"
              onClick={() => router.push('/risk-monitoring')}
            >
              Explore Intelligence
            </Button>

            <Button
              size="lg"
              variant="outline"
              icon={<BarChart3 className="w-5 h-5" />}
              className="border-white/20 text-white hover:border-glacier-400 hover:text-glacier-300 glass-light backdrop-blur-xl"
              onClick={() => router.push('/risk-monitoring/dashboards')}
            >
              Live Dashboards
            </Button>
          </motion.div>

          {/* Intelligence Search Block */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 md:mt-14 lg:mt-16 max-w-4xl"
          >
            {/* Search input */}
            <div className="relative">
              <div className="flex items-center gap-4 p-4 rounded-2xl glass-intense border border-white/10 shadow-2xl backdrop-blur-xl focus-within:border-forest-500/50 focus-within:ring-2 focus-within:ring-forest-500/20 transition-all">
                <Search className="w-4 h-4 md:w-6 md:h-6 text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsSearchOpen(true)}
                  placeholder="Search districts, species, lakes, wetlands, trails, alerts..."
                  className="flex-1 bg-transparent border-none outline-none text-white text-base md:text-lg placeholder-slate-500"
                />
                {query && (
                  <button
                    onClick={() => {
                      setQuery('');
                      setIsSearchOpen(true);
                    }}
                    className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                )}
                <kbd className="hidden md:inline-flex px-3 py-1.5 text-xs bg-white/5 rounded border border-white/10 text-slate-400">
                  Enter
                </kbd>
              </div>

              {/* Search results dropdown */}
              <AnimatePresence>
                {isSearchOpen && (query.length >= 2 || !query) && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 right-0 mt-3 rounded-2xl glass-intense border border-white/10 shadow-2xl overflow-hidden z-50"
                  >
                    <div className="max-h-[500px] overflow-y-auto">
                      {isLoading && (
                        <div className="p-12 text-center">
                          <div className="w-8 h-8 border-2 border-forest-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                          <p className="text-slate-400">Searching intelligence...</p>
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
                              <div className="flex items-center gap-2 mb-3 px-2">
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
                                    className="w-full flex items-center justify-between p-1 md:p-3 rounded-lg hover:bg-white/5 transition-colors text-left group"
                                  >
                                    <div>
                                      <div className="font-medium text-white group-hover:text-forest-300 transition-colors">
                                        {item.name}
                                      </div>
                                      <div className="text-xs md:text-sm text-slate-500">{item.scientificName}</div>
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
                              <div className="flex items-center gap-2 mb-3 px-2">
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
                              <div className="flex items-center gap-2 mb-3 px-2">
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
                              <div className="flex items-center gap-2 mb-3 px-2">
                                <Map className="w-4 h-4 text-slate-400" />
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
                              <div className="flex items-center gap-2 mb-3 px-2">
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
                              <div className="flex items-center gap-2 mb-3 px-2">
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

                      {/* Empty state with suggestions */}
                      {!isLoading && !query && (
                        <div className="p-6">
                          {/* Quick chips */}
                          <div className="flex flex-wrap gap-2 mb-6">
                            {suggestionChips.map((chip) => (
                              <button
                                key={chip.label}
                                onClick={() => {
                                  setQuery(chip.query);
                                  setIsSearchOpen(true);
                                }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-light border border-white/10 text-sm text-slate-300 hover:text-white hover:border-forest-500/50 transition-all"
                              >
                                <chip.icon className="w-4 h-4" />
                                {chip.label}
                              </button>
                            ))}
                          </div>

                          {/* Example searches */}
                          <div>
                            <p className="text-xs text-slate-500 uppercase tracking-wider mb-3">Try searching</p>
                            <div className="grid grid-cols-2 gap-3">
                              {exampleSearches.map((example) => (
                                <button
                                  key={example.label}
                                  onClick={() => {
                                    setQuery(example.label.toLowerCase());
                                    setIsSearchOpen(true);
                                  }}
                                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors text-left group"
                                >
                                  <Search className="w-4 h-4 text-slate-500 group-hover:text-forest-400 transition-colors" />
                                  <div>
                                    <div className="text-sm font-medium text-white group-hover:text-forest-300 transition-colors">
                                      {example.label}
                                    </div>
                                    <div className="text-xs text-slate-500">{example.type}</div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Footer hint */}
                          <div className="mt-6 pt-4 border-t border-white/5">
                            <p className="text-xs text-slate-500 text-center">
                              Search across species, protected areas, water bodies, trails, districts, alerts, and reports
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Results count */}
                    {!isLoading && hasResults && (
                      <div className="p-4 border-t border-white/5 bg-white/[0.02]">
                        <p className="text-xs text-slate-500 text-center">
                          {getResultCount(results)} result{getResultCount(results) !== 1 ? 's' : ''} found
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Quick stats with live indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl"
          >
            {[
              { value: '2,847', label: 'Species Indexed', icon: Leaf, trend: '+156' },
              { value: '47', label: 'Protected Areas', icon: Map, trend: '+2' },
              { value: '1,253', label: 'Water Bodies', icon: Activity, trend: 'Active' },
              { value: '234', label: 'Monitoring Stations', icon: Satellite, trend: 'Online' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                className="glass-light rounded-xl p-5 border border-white/10 hover:border-forest-500/30 transition-all duration-300 card-intelligence"
              >
                <div className="flex items-start justify-between mb-3">
                  <stat.icon className="w-5 h-5 text-slate-500" />
                  <span className="text-xs text-emerald-400 font-mono">{stat.trend}</span>
                </div>
                <div className="text-3xl font-bold text-white mb-1 metric-live">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Source/Status credibility line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-8 max-w-4xl"
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-light border border-white/10">
              <Database className="w-4 h-4 text-blue-400" />
              <span className="text-[8px] md:text-xs text-slate-400">
                Source-integrated metrics updated by module — mix of reference inventories, field surveys, and live monitoring layers
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs uppercase tracking-widest text-slate-500">Explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-slate-600 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-3 bg-gradient-to-b from-forest-400 to-glacier-400 rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </section>
  );
}
