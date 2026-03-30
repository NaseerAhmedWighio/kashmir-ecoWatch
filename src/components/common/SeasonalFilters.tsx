'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import * as Icons from 'lucide-react';
import { SeasonType, ElevationZone, DistrictKashmir, HabitatType } from '@/types/seasonal-ecology';

interface SeasonalFiltersProps {
  districts?: DistrictKashmir[];
  elevationZones?: ElevationZone[];
  seasons?: SeasonType[];
  habitatTypes?: HabitatType[];
  additionalFilters?: { label: string; options: string[] }[];
  onFilterChange?: (filters: SeasonalFilterState) => void;
}

export interface SeasonalFilterState {
  selectedDistricts: string[];
  selectedElevationZones: string[];
  selectedSeasons: string[];
  selectedHabitats: string[];
  additionalFilters: { [key: string]: string[] };
  searchQuery: string;
}

const ALL_DISTRICTS: DistrictKashmir[] = [
  'srinagar', 'anantnag', 'baramulla', 'budgam', 'kupwara', 'pulwama', 
  'shopian', 'bandipora', 'ganderbal', 'kulgam', 'rambhan', 'kishtwar', 
  'doda', 'poonch', 'rajouri', 'udhampur', 'kathua', 'samba'
];

const ALL_ELEVATION_ZONES: ElevationZone[] = [
  'lowland', 'mid-elevation', 'highland', 'alpine', 'nival'
];

const ALL_SEASONS: SeasonType[] = [
  'spring', 'summer', 'monsoon', 'autumn', 'winter', 'pre-spring'
];

const formatLabel = (value: string) => {
  return value.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
};

export const SeasonalFilters: React.FC<SeasonalFiltersProps> = ({
  districts = ALL_DISTRICTS,
  elevationZones = ALL_ELEVATION_ZONES,
  seasons = ALL_SEASONS,
  habitatTypes = [],
  additionalFilters = [],
  onFilterChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filterState, setFilterState] = useState<SeasonalFilterState>({
    selectedDistricts: [],
    selectedElevationZones: [],
    selectedSeasons: [],
    selectedHabitats: [],
    additionalFilters: {},
    searchQuery: '',
  });

  const toggleDistrict = (district: string) => {
    const newDistricts = filterState.selectedDistricts.includes(district)
      ? filterState.selectedDistricts.filter(d => d !== district)
      : [...filterState.selectedDistricts, district];
    
    const newState = { ...filterState, selectedDistricts: newDistricts };
    setFilterState(newState);
    onFilterChange?.(newState);
  };

  const toggleElevationZone = (zone: string) => {
    const newZones = filterState.selectedElevationZones.includes(zone)
      ? filterState.selectedElevationZones.filter(z => z !== zone)
      : [...filterState.selectedElevationZones, zone];
    
    const newState = { ...filterState, selectedElevationZones: newZones };
    setFilterState(newState);
    onFilterChange?.(newState);
  };

  const toggleSeason = (season: string) => {
    const newSeasons = filterState.selectedSeasons.includes(season)
      ? filterState.selectedSeasons.filter(s => s !== season)
      : [...filterState.selectedSeasons, season];
    
    const newState = { ...filterState, selectedSeasons: newSeasons };
    setFilterState(newState);
    onFilterChange?.(newState);
  };

  const clearAllFilters = () => {
    const newState: SeasonalFilterState = {
      selectedDistricts: [],
      selectedElevationZones: [],
      selectedSeasons: [],
      selectedHabitats: [],
      additionalFilters: {},
      searchQuery: '',
    };
    setFilterState(newState);
    onFilterChange?.(newState);
  };

  const activeFilterCount = 
    filterState.selectedDistricts.length +
    filterState.selectedElevationZones.length +
    filterState.selectedSeasons.length +
    filterState.selectedHabitats.length;

  return (
    <Card className="border border-white/5 bg-slate-900/50 backdrop-blur-sm">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
              <Icons.Filter className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Filters</h3>
              {activeFilterCount > 0 && (
                <p className="text-xs text-slate-400">{activeFilterCount} active</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {activeFilterCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                <Icons.X className="w-3.5 h-3.5 mr-1" />
                Clear All
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? (
                <>
                  <Icons.ChevronUp className="w-3.5 h-3.5 mr-1" />
                  Less
                </>
              ) : (
                <>
                  <Icons.ChevronDown className="w-3.5 h-3.5 mr-1" />
                  More
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-4">
          <div className="relative">
            <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              value={filterState.searchQuery}
              onChange={(e) => {
                const newState = { ...filterState, searchQuery: e.target.value };
                setFilterState(newState);
                onFilterChange?.(newState);
              }}
              className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-white/5 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>
        </div>

        {/* Quick Filters (Always Visible) */}
        <div className="mb-4">
          <p className="text-xs text-slate-400 mb-2">Seasons</p>
          <div className="flex flex-wrap gap-1.5">
            {seasons.map((season) => (
              <Badge
                key={season}
                variant={filterState.selectedSeasons.includes(season) ? 'success' : 'default'}
                size="sm"
                onClick={() => toggleSeason(season)}
                className="cursor-pointer transition-all"
              >
                {formatLabel(season)}
              </Badge>
            ))}
          </div>
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="space-y-4 animate-in slide-in-from-top-2 duration-200">
            {/* Districts */}
            <div>
              <p className="text-xs text-slate-400 mb-2">Districts</p>
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto">
                {districts.map((district) => (
                  <Badge
                    key={district}
                    variant={filterState.selectedDistricts.includes(district) ? 'info' : 'default'}
                    size="sm"
                    onClick={() => toggleDistrict(district)}
                    className="cursor-pointer transition-all"
                  >
                    {formatLabel(district)}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Elevation Zones */}
            <div>
              <p className="text-xs text-slate-400 mb-2">Elevation Zones</p>
              <div className="flex flex-wrap gap-1.5">
                {elevationZones.map((zone) => (
                  <Badge
                    key={zone}
                    variant={filterState.selectedElevationZones.includes(zone) ? 'warning' : 'default'}
                    size="sm"
                    onClick={() => toggleElevationZone(zone)}
                    className="cursor-pointer transition-all"
                  >
                    {formatLabel(zone)}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Habitats (if provided) */}
            {habitatTypes.length > 0 && (
              <div>
                <p className="text-xs text-slate-400 mb-2">Habitat Types</p>
                <div className="flex flex-wrap gap-1.5">
                  {habitatTypes.map((habitat) => (
                    <Badge
                      key={habitat}
                      variant={filterState.selectedHabitats.includes(habitat) ? 'default' : 'default'}
                      size="sm"
                      onClick={() => {
                        const newHabitats = filterState.selectedHabitats.includes(habitat)
                          ? filterState.selectedHabitats.filter(h => h !== habitat)
                          : [...filterState.selectedHabitats, habitat];
                        const newState = { ...filterState, selectedHabitats: newHabitats };
                        setFilterState(newState);
                        onFilterChange?.(newState);
                      }}
                      className="cursor-pointer transition-all"
                    >
                      {formatLabel(habitat)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Filters */}
            {additionalFilters.map((filter, idx) => (
              <div key={idx}>
                <p className="text-xs text-slate-400 mb-2">{filter.label}</p>
                <div className="flex flex-wrap gap-1.5">
                  {filter.options.map((option) => (
                    <Badge
                      key={option}
                      variant={filterState.additionalFilters[filter.label]?.includes(option) ? 'default' : 'default'}
                      size="sm"
                      onClick={() => {
                        const current = filterState.additionalFilters[filter.label] || [];
                        const updated = current.includes(option)
                          ? current.filter(o => o !== option)
                          : [...current, option];
                        const newAdditional = { ...filterState.additionalFilters, [filter.label]: updated };
                        const newState = { ...filterState, additionalFilters: newAdditional };
                        setFilterState(newState);
                        onFilterChange?.(newState);
                      }}
                      className="cursor-pointer transition-all"
                    >
                      {formatLabel(option)}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Active Filters Summary */}
        {activeFilterCount > 0 && (
          <div className="mt-4 pt-4 border-t border-white/5">
            <div className="flex flex-wrap gap-2">
              {filterState.selectedSeasons.map((season) => (
                <Badge key={season} variant="success" size="sm">
                  {formatLabel(season)}
                  <button
                    onClick={() => toggleSeason(season)}
                    className="ml-1 hover:text-white"
                  >
                    <Icons.X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
              {filterState.selectedDistricts.map((district) => (
                <Badge key={district} variant="info" size="sm">
                  {formatLabel(district)}
                  <button
                    onClick={() => toggleDistrict(district)}
                    className="ml-1 hover:text-white"
                  >
                    <Icons.X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
              {filterState.selectedElevationZones.map((zone) => (
                <Badge key={zone} variant="warning" size="sm">
                  {formatLabel(zone)}
                  <button
                    onClick={() => toggleElevationZone(zone)}
                    className="ml-1 hover:text-white"
                  >
                    <Icons.X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
