'use client';

import React, { useState, useMemo } from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { PageHeader } from '@/components/common/PageHeader';
import { SeasonalFilters, SeasonalFilterState } from '@/components/common/SeasonalFilters';
import { SeasonalCard } from '@/components/common/SeasonalCard';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface SeasonalListingPageProps {
  title: string;
  subtitle: string;
  icon: keyof typeof Icons;
  color: string;
  entities: any[];
  entityVariant: 'landscape' | 'bloom' | 'migration' | 'pollinator' | 'phenology' | 'habitat' | 'water' | 'species' | 'climate' | 'report';
  metrics: { label: string; value: number | string; icon: string }[];
  filters?: {
    districts?: string[];
    elevationZones?: string[];
    seasons?: string[];
    additionalFilters?: { label: string; options: string[] }[];
  };
  detailPageBaseRoute: string;
  mapPreviewEnabled?: boolean;
  mapCoordinates?: { lat: number; lng: number; zoom?: number };
}

export const SeasonalListingPage: React.FC<SeasonalListingPageProps> = ({
  title,
  subtitle,
  icon: iconName,
  color,
  entities,
  entityVariant,
  metrics,
  filters,
  detailPageBaseRoute,
  mapPreviewEnabled = true,
  mapCoordinates = { lat: 34.0837, lng: 74.7973, zoom: 9 },
}) => {
  const Icon = (Icons as any)[iconName] || Icons.Mountain;
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterState, setFilterState] = useState<SeasonalFilterState>({
    selectedDistricts: [],
    selectedElevationZones: [],
    selectedSeasons: [],
    selectedHabitats: [],
    additionalFilters: {},
    searchQuery: '',
  });

  const filteredEntities = useMemo(() => {
    return entities.filter((entity) => {
      // Search filter
      if (filterState.searchQuery) {
        const searchLower = filterState.searchQuery.toLowerCase();
        const name = entity.name || entity.title || entity.speciesCommonName || '';
        const description = entity.description || '';
        if (!name.toLowerCase().includes(searchLower) && !description.toLowerCase().includes(searchLower)) {
          return false;
        }
      }

      // District filter
      if (filterState.selectedDistricts.length > 0) {
        const entityDistricts = entity.districts || (entity.district ? [entity.district] : []) || [];
        if (!entityDistricts.some((d: string) => filterState.selectedDistricts.includes(d))) {
          return false;
        }
      }

      // Elevation zone filter
      if (filterState.selectedElevationZones.length > 0) {
        if (!entity.elevationZone || !filterState.selectedElevationZones.includes(entity.elevationZone)) {
          return false;
        }
      }

      // Season filter
      if (filterState.selectedSeasons.length > 0) {
        const entitySeasons = entity.primarySeasons || entity.seasonalFocus || [];
        if (!entitySeasons.some((s: string) => filterState.selectedSeasons.includes(s))) {
          return false;
        }
      }

      return true;
    });
  }, [entities, filterState]);

  const handleFilterChange = (newState: SeasonalFilterState) => {
    setFilterState(newState);
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero Section */}
      <div className="relative pb-16 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        
        {/* Animated Gradient Orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative mx-auto">
          <PageHeader
            breadcrumbs={[
              { label: 'Home', href: '/' },
              { label: 'Seasonal Ecology', href: '/seasonal-ecology' },
              { label: title, href: undefined },
            ]}
            icon={<Icon className="w-8 h-8" />}
            title={title}
            subtitle={subtitle}
          />

          {/* Metrics Bar */}
          <Card className="mx-6 mt-8 border border-white/5 bg-slate-900/50 backdrop-blur-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 p-4">
              {metrics.map((metric, idx) => {
                const MetricIcon = (Icons as any)[metric.icon] || Icons.Mountain;
                return (
                  <div key={idx} className="text-center">
                    <div className="flex justify-center mb-2">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${color} border border-white/10`}>
                        <MetricIcon className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-white">{metric.value}</p>
                    <p className="text-xs text-slate-400">{metric.label}</p>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <SeasonalFilters
                districts={filters?.districts as any}
                elevationZones={filters?.elevationZones as any}
                seasons={filters?.seasons as any}
                additionalFilters={filters?.additionalFilters}
                onFilterChange={handleFilterChange}
              />

              {/* Map Preview */}
              {mapPreviewEnabled && (
                <Card className="mt-6 border border-white/5 bg-slate-900/50 overflow-hidden">
                  <div className="relative h-48 bg-gradient-to-br from-slate-800/50 to-slate-900/50">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Icons.Map className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                        <p className="text-xs text-slate-400">Kashmir Region Map Preview</p>
                        <p className="text-xs text-slate-500 mt-1">
                          {mapCoordinates.lat.toFixed(4)}°N, {mapCoordinates.lng.toFixed(4)}°E
                        </p>
                      </div>
                    </div>
                    {/* Decorative map elements */}
                    <div className="absolute top-4 left-4 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl" />
                    <div className="absolute bottom-4 right-4 w-16 h-16 bg-teal-500/10 rounded-full blur-xl" />
                  </div>
                  <div className="p-3">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Entity Distribution</span>
                      <Badge variant="info" size="sm">{filteredEntities.length} entities</Badge>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Entity Grid */}
          <div className="lg:col-span-3">
            {/* View Controls */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  {filteredEntities.length} {filteredEntities.length === 1 ? 'Entity' : 'Entities'} Found
                </h2>
                <p className="text-sm text-slate-400">
                  Across Kashmir's diverse ecosystems
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-800/50 border border-white/5">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === 'grid'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Icons.Grid3x3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-md transition-all ${
                      viewMode === 'list'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Icons.List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Entity Cards */}
            {filteredEntities.length > 0 ? (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'
                    : 'space-y-4'
                }
              >
                {filteredEntities.map((entity) => (
                  <div
                    key={entity.id || entity.slug}
                    onClick={() => {
                      window.location.href = `${detailPageBaseRoute}/${entity.slug}`;
                    }}
                  >
                    <SeasonalCard entity={entity} variant={entityVariant} />
                  </div>
                ))}
              </div>
            ) : (
              <Card className="border border-white/5 bg-slate-900/50 p-12 text-center">
                <Icons.Search className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">No Entities Found</h3>
                <p className="text-slate-400 mb-4">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={() =>
                    setFilterState({
                      selectedDistricts: [],
                      selectedElevationZones: [],
                      selectedSeasons: [],
                      selectedHabitats: [],
                      additionalFilters: {},
                      searchQuery: '',
                    })
                  }
                  className="text-emerald-400 hover:text-emerald-300 text-sm font-medium"
                >
                  Clear All Filters
                </button>
              </Card>
            )}
          </div>
        </div>
      </div>

      <AdvancedFooter />
    </main>
  );
};
