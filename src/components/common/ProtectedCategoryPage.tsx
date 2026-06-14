'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Pagination } from '@/components/ui/Pagination';
import { Select } from '@/components/ui/Select';
import { TabBar } from '@/components/common/TabBar';
import * as Icons from 'lucide-react';
import {
  MapPin, Activity, ArrowRight, Search, Filter, Shield,
  Grid3X3, List, Map, TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Heading } from '@/components/common/Heading';

interface ProtectedArea {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  area: number;
  district: string;
  established: number;
  ecosystems: string[];
  keySpecies: string[];
}

interface ProtectedCategoryPageProps {
  title: string | React.ReactNode;
  subtitle: string;
  icon: keyof typeof import('lucide-react');
  color: string;
  areas: ProtectedArea[];
  metrics: Array<{ label: string; value: number | string; icon: keyof typeof import('lucide-react') }>;
  sourceData?: {
    title: string;
    count: number;
    totalArea: number;
  };
  tabs?: Array<{ key: string; label: string; description: string }>;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  districtOptions?: string[];
}

export function ProtectedCategoryPage({
  title,
  subtitle,
  icon: iconName,
  color,
  areas,
  metrics,
  sourceData,
  tabs,
  activeTab,
  onTabChange,
  districtOptions,
}: ProtectedCategoryPageProps) {
  const Icon = (Icons as any)[iconName] || Icons.MapPin;
  const router = useRouter();
  const [viewMode, setViewMode] = React.useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedDistrict, setSelectedDistrict] = React.useState('all');
  const [selectedScope, setSelectedScope] = React.useState('all');
  const [currentPage, setCurrentPage] = React.useState(1);
  const PAGE_SIZE = 6;

  const districts = useMemo(() => {
    if (districtOptions) return districtOptions;
    return Array.from(new Set(areas.map(a => a.district).filter(Boolean))).sort();
  }, [areas, districtOptions]);

  const scopes = useMemo(() => {
    return Array.from(new Set(areas.map((a: any) => a.scope).filter(Boolean))).sort();
  }, [areas]);

  const filteredAreas = useMemo(() => {
    return areas.filter(area => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query ||
        area.name.toLowerCase().includes(query) ||
        area.district.toLowerCase().includes(query) ||
        area.description.toLowerCase().includes(query) ||
        (area as any).flagshipSpecies?.toLowerCase().includes(query);

      const matchesDistrict = selectedDistrict === 'all' || area.district === selectedDistrict;
      const matchesScope = selectedScope === 'all' || (area as any).scope === selectedScope;

      return matchesSearch && matchesDistrict && matchesScope;
    });
  }, [areas, searchQuery, selectedDistrict, selectedScope]);

  const totalPages = Math.max(1, Math.ceil(filteredAreas.length / PAGE_SIZE));
  const paginatedAreas = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredAreas.slice(start, start + PAGE_SIZE);
  }, [filteredAreas, currentPage]);

  useEffect(() => { setCurrentPage(1); }, [searchQuery, selectedDistrict, selectedScope]);

  // Sync scope filter with tabs
  useEffect(() => {
    if (!tabs || !onTabChange || selectedScope === 'all') return;
    const match = tabs.find(t => t.label === selectedScope);
    if (match && match.key !== activeTab) onTabChange(match.key);
  }, [selectedScope, tabs, activeTab, onTabChange]);

  // Sync tab change with scope filter — handled inline in <TabBar> onTabChange

  const getCategoryIcon = (category: string) => {
    const map: Record<string, string> = {
      national_park: 'Trees',
      wildlife_sanctuary: 'Bird',
      wetland_reserve: 'Droplets',
      conservation_reserve: 'Leaf',
    };
    return map[category] || 'MapPin';
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title={title}
        subtitle={subtitle}
        icon={<Icon className={`w-6 h-6 ${color.includes('emerald') ? 'text-emerald-400' : 'text-slate-400'}`} />}
        label="Protected Network"
        gridOverlay
        images={['/images/protected-network.png', '/images/bear.png', '/images/tiger.png', '/images/markhor.png']}
        actions={
          <>
            <a href="/protected-network/atlas">
              <Button size="lg" className={`bg-${color}`} icon={<Search className="w-5 h-5" />}>
                Search
              </Button>
            </a>
            <a href="/protected-network/atlas">
              <Button size="lg" variant="outline" className="border-white/20 text-white" icon={<Map className="w-5 h-5" />}>
                Distribution Map
              </Button>
            </a>
          </>
        }
      />

      {/* Metrics */}
      <div className="container mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-intense border-white/10" padding="sm">
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              {metrics.map((metric, idx) => {
                const MetricIcon = (Icons as any)[metric.icon] || Icons.MapPin;
                return (
                  <div key={idx} className="py-2.5 px-2 lg:py-3 lg:px-3 rounded-xl text-center min-w-0">
                    <MetricIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 mx-auto mb-1" />
                    <div className="text-sm sm:text-base lg:text-sm xl:text-base font-bold text-white tabular-nums leading-tight truncate">
                      {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-slate-500 uppercase tracking-wide mt-0.5 leading-tight break-words">
                      {metric.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Tab + Filters — single row */}
      <TabBar
        tabs={tabs || []}
        activeTab={activeTab || ''}
        onTabChange={(key) => {
          onTabChange?.(key);
          const tab = tabs?.find(t => t.key === key);
          if (tab && key !== 'all') setSelectedScope(tab.label);
          else setSelectedScope('all');
        }}
        onScopeSync={(label) => setSelectedScope(label)}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(f => !f)}
        filteredCount={filteredAreas.length}
        totalCount={areas.length}
        countLabel="areas"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Content */}
      <div className="container mx-auto px-6 py-8 space-y-6">
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 glass-intense border border-white/10 rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6 relative z-30 overflow-visible"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Search Text</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search name, district, or species..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">District</label>
              <Select
                value={selectedDistrict}
                onChange={setSelectedDistrict}
                options={[
                  { value: 'all', label: 'All Districts' },
                  ...districts.map(d => ({ value: d, label: d })),
                ]}
                placeholder="All Districts"
              />
            </div>

            {scopes.length > 0 && (
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Ecological Scope</label>
                <Select
                  value={selectedScope}
                  onChange={setSelectedScope}
                  options={[
                    { value: 'all', label: 'All Scopes' },
                    ...scopes.map(s => ({ value: s, label: s })),
                  ]}
                  placeholder="All Scopes"
                />
              </div>
            )}
          </motion.div>
        )}

        {/* Protected Areas Grid/List */}
        {filteredAreas.length > 0 ? (
          <>
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 xl:gap-6' : 'space-y-3 sm:space-y-4'}>
              {paginatedAreas.map((area, index) => {
                const CatIcon = (Icons as any)[getCategoryIcon(area.category)] || Icons.MapPin;
                return (
                  <motion.a
                    key={area.id}
                    href={`/protected-network/${area.category === 'national_park' ? 'national-parks' : area.category === 'wildlife_sanctuary' ? 'wildlife-sanctuaries' : area.category === 'wetland_reserve' ? 'wetland-reserves' : area.category === 'conservation_reserve' ? 'conservation-reserves' : 'bird-and-habitat-areas'}/${area.slug}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`${viewMode === 'grid' ? 'h-full' : ''} block group`}
                  >
                    <Card className="h-full flex flex-col overflow-hidden card-intelligence bg-white/5 border border-white/10 hover:border-emerald-500/30" padding="none">
                      <div
                        className="relative h-44 bg-[#160C27] transition-all overflow-hidden"
                        style={area.imageUrl ? { backgroundImage: `url(${area.imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : undefined}
                      >
                        {!area.imageUrl && (
                          <div className="absolute inset-0 bg-white/[0.05] group-hover:bg-white/10 transition-all" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-b from-[#160C27]/80 via-[#160C27]/60 to-[#160C27]/80" />
                        <div className="absolute top-4 left-4 flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                            <CatIcon className="w-4 h-4 text-emerald-400" />
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <div className="flex flex-wrap gap-1.5 mb-2">
                            <Badge variant="info" size="sm" className="capitalize">
                              {area.category.replace('_', ' ')}
                            </Badge>
                            {(area as any).scope && (
                              <Badge variant="default" size="sm">{(area as any).scope}</Badge>
                            )}
                            {(area as any).legalStatus && (area as any).legalStatus !== 'Verified' && (
                              <Badge variant="warning" size="sm">{(area as any).legalStatus}</Badge>
                            )}
                          </div>
                          <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                            {area.name}
                          </h3>
                        </div>
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <p className="text-sm text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                          {area.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400">
                          <div className="min-w-0">
                            <div className="text-[10px] text-slate-500 uppercase tracking-wider">Area</div>
                            <div className="text-white font-semibold tabular-nums">{area.area > 0 ? `${area.area.toLocaleString()} km²` : 'TBC'}</div>
                          </div>
                          <div className="min-w-0">
                            <div className="text-[10px] text-slate-500 uppercase tracking-wider">District</div>
                            <div className="text-white font-semibold">{area.district}</div>
                          </div>
                          {(area as any).flagshipSpecies && (
                            <div className="min-w-0">
                              <div className="text-[10px] text-slate-500 uppercase tracking-wider">Flagship</div>
                              <div className="text-white font-semibold text-sm truncate max-w-[140px]">{(area as any).flagshipSpecies}</div>
                            </div>
                          )}
                        </div>
                        {(area as any).altitudeRange && (
                          <div className="mt-2 text-xs text-slate-400">
                            <span className="text-slate-500 uppercase text-[10px] tracking-wider">Altitude: </span>{(area as any).altitudeRange}
                          </div>
                        )}
                        {(area as any).dataStatus && (
                          <div className="text-[10px] text-slate-500 italic mt-1">{(area as any).dataStatus}</div>
                        )}
                        <div className="mt-auto pt-4 border-t border-white/[0.06] flex justify-end">
                          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-500  transition-all duration-300 text-sm font-medium text-white shadow-md shadow-emerald-500/20">
                            View Details
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </Card>
                  </motion.a>
                );
              })}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={filteredAreas.length}
              pageSize={PAGE_SIZE}
            />
          </>
        ) : (
          <div className="text-center py-24">
            <Shield className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No protected areas found</h3>
            <p className="text-slate-400 mb-4">Try adjusting your filters</p>
            <Button
              variant="outline"
              className="border-white/20 text-white"
              onClick={() => {
                setSearchQuery('');
                setSelectedDistrict('all');
                setSelectedScope('all');
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {/* Source Information */}
      {sourceData && (
        <div className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="glass-light border-white/10 p-6">
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-emerald-500 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">Source Data</h3>
                  <p className="text-slate-400 text-sm mb-3">{sourceData.title}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Total Records:</span>{' '}
                      <span className="text-white font-medium">{sourceData.count}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Total Area:</span>{' '}
                      <span className="text-white font-medium">{sourceData.totalArea.toFixed(2)} kmÂ²</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      )}
    </main>
  );
}
