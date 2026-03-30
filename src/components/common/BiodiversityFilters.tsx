'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Filter, X, ChevronDown } from 'lucide-react';

interface BiodiversityFiltersProps {
  filters: {
    conservationStatus?: string[];
    habitat?: string[];
    district?: string[];
    elevation?: string;
    season?: string;
    sensitivity?: string;
  };
  onFilterChange: (filters: any) => void;
  onReset: () => void;
  resultCount: number;
}

const conservationStatuses = [
  { id: 'CR', label: 'Critically Endangered', color: 'bg-red-500' },
  { id: 'EN', label: 'Endangered', color: 'bg-red-400' },
  { id: 'VU', label: 'Vulnerable', color: 'bg-amber-500' },
  { id: 'NT', label: 'Near Threatened', color: 'bg-yellow-500' },
  { id: 'LC', label: 'Least Concern', color: 'bg-emerald-500' },
];

const habitats = [
  'Temperate forests',
  'Alpine meadows',
  'Wetlands',
  'Riverine forests',
  'Rocky terrain',
  'Mountain slopes',
  'Forest edges',
];

const districts = [
  'Srinagar',
  'Anantnag',
  'Baramulla',
  'Kulgam',
  'Pulwama',
  'Ganderbal',
  'Kupwara',
  'Kishtwar',
  'Doda',
  'Kargil',
];

export function BiodiversityFilters({ filters, onFilterChange, onReset, resultCount }: BiodiversityFiltersProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleConservationStatus = (status: string) => {
    const current = filters.conservationStatus || [];
    const updated = current.includes(status)
      ? current.filter(s => s !== status)
      : [...current, status];
    onFilterChange({ ...filters, conservationStatus: updated });
  };

  const toggleHabitat = (habitat: string) => {
    const current = filters.habitat || [];
    const updated = current.includes(habitat)
      ? current.filter(h => h !== habitat)
      : [...current, habitat];
    onFilterChange({ ...filters, habitat: updated });
  };

  const activeFilterCount = 
    (filters.conservationStatus?.length || 0) +
    (filters.habitat?.length || 0) +
    (filters.district?.length || 0) +
    (filters.elevation ? 1 : 0) +
    (filters.season ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Filter bar header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setIsOpen(!isOpen)}
            className={`border-white/20 text-white ${isOpen ? 'bg-forest-500/20 border-forest-500/50' : ''}`}
            icon={<Filter className="w-4 h-4" />}
          >
            Filters
            {activeFilterCount > 0 && (
              <Badge variant="default" size="sm" className="ml-2 bg-forest-500">
                {activeFilterCount}
              </Badge>
            )}
          </Button>
          <span className="text-sm text-slate-400">
            <strong className="text-white">{resultCount}</strong> results
          </span>
        </div>
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-slate-400 hover:text-white"
            icon={<X className="w-4 h-4" />}
          >
            Reset
          </Button>
        )}
      </div>

      {/* Expanded filters */}
      {isOpen && (
        <div className="p-6 rounded-xl glass-light border border-white/5 space-y-6">
          {/* Conservation Status */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Conservation Status
            </h4>
            <div className="flex flex-wrap gap-2">
              {conservationStatuses.map((status) => (
                <button
                  key={status.id}
                  onClick={() => toggleConservationStatus(status.id)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    filters.conservationStatus?.includes(status.id)
                      ? 'bg-forest-500/20 text-forest-400 border border-forest-500/50'
                      : 'glass-light border border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full ${status.color}`} />
                  {status.label}
                </button>
              ))}
            </div>
          </div>

          {/* Habitat */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Habitat
            </h4>
            <div className="flex flex-wrap gap-2">
              {habitats.map((habitat) => (
                <button
                  key={habitat}
                  onClick={() => toggleHabitat(habitat)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    filters.habitat?.includes(habitat)
                      ? 'bg-forest-500/20 text-forest-400 border border-forest-500/50'
                      : 'glass-light border border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {habitat}
                </button>
              ))}
            </div>
          </div>

          {/* District */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              District
            </h4>
            <div className="flex flex-wrap gap-2">
              {districts.map((district) => (
                <button
                  key={district}
                  onClick={() => toggleHabitat(district)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    filters.district?.includes(district)
                      ? 'bg-forest-500/20 text-forest-400 border border-forest-500/50'
                      : 'glass-light border border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {district}
                </button>
              ))}
            </div>
          </div>

          {/* Elevation Range */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              Elevation Range
            </h4>
            <div className="flex gap-2">
              {[
                { id: 'low', label: 'Low (0-1500m)' },
                { id: 'mid', label: 'Mid (1500-3000m)' },
                { id: 'high', label: 'High (3000m+)' },
              ].map((range) => (
                <button
                  key={range.id}
                  onClick={() => onFilterChange({ ...filters, elevation: range.id })}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    filters.elevation === range.id
                      ? 'bg-forest-500/20 text-forest-400 border border-forest-500/50'
                      : 'glass-light border border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active filter chips */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {filters.conservationStatus?.map((status) => (
            <Badge
              key={status}
              variant="default"
              className="bg-forest-500/20 text-forest-400 border border-forest-500/30 cursor-pointer"
              onClick={() => toggleConservationStatus(status)}
            >
              {status}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
          {filters.habitat?.map((habitat) => (
            <Badge
              key={habitat}
              variant="default"
              className="bg-forest-500/20 text-forest-400 border border-forest-500/30 cursor-pointer"
              onClick={() => toggleHabitat(habitat)}
            >
              {habitat}
              <X className="w-3 h-3 ml-1" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
