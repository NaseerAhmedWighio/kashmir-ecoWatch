'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown } from 'lucide-react';
import { FieldReport, ReportStatus, ReportType } from '@/types';

interface FilterState {
  year: string;
  district: string;
  module: string;
  reportType: string;
  source: string;
  status: string;
}

interface FilterBarProps {
  reports: FieldReport[];
  years: number[];
  districts: string[];
  modules: string[];
  sources: string[];
  onFilterChange: (filteredReports: FieldReport[]) => void;
}

const statusLabels: Record<ReportStatus, string> = {
  'reviewed': 'Reviewed',
  'field-verified': 'Field Verified',
  'preliminary': 'Preliminary',
  'technical-assessment': 'Technical Assessment',
  'monthly-bulletin': 'Monthly Bulletin',
  'archived': 'Archived',
  'restricted': 'Restricted / Sensitive',
};

const typeLabels: Record<ReportType, string> = {
  'field-survey': 'Field Survey',
  'technical-report': 'Technical Report',
  'monthly-bulletin': 'Monthly Bulletin',
  'risk-assessment': 'Risk Assessment',
  'environmental-impact': 'Environmental Impact',
  'species-survey': 'Species Survey',
  'wetland-assessment': 'Wetland Assessment',
  'seasonal-report': 'Seasonal Report',
};

export function FilterBar({ reports, years, districts, modules, sources, onFilterChange }: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    year: 'all',
    district: 'all',
    module: 'all',
    reportType: 'all',
    source: 'all',
    status: 'all',
  });
  const [showFilters, setShowFilters] = useState(true);

  const activeFilterCount = useMemo(() => {
    return Object.values(filters).filter(v => v !== 'all').length;
  }, [filters]);

  const applyFilters = (newFilters: FilterState) => {
    let filtered = [...reports];

    if (newFilters.year !== 'all') {
      filtered = filtered.filter(r => new Date(r.date).getFullYear().toString() === newFilters.year);
    }
    if (newFilters.district !== 'all') {
      filtered = filtered.filter(r => r.districts.includes(newFilters.district));
    }
    if (newFilters.module !== 'all') {
      filtered = filtered.filter(r => r.modules.includes(newFilters.module));
    }
    if (newFilters.reportType !== 'all') {
      filtered = filtered.filter(r => r.reportType === newFilters.reportType);
    }
    if (newFilters.source !== 'all') {
      filtered = filtered.filter(r => r.source === newFilters.source);
    }
    if (newFilters.status !== 'all') {
      filtered = filtered.filter(r => r.status === newFilters.status);
    }

    // Sort by date descending
    filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    onFilterChange(filtered);
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      year: 'all',
      district: 'all',
      module: 'all',
      reportType: 'all',
      source: 'all',
      status: 'all',
    };
    setFilters(clearedFilters);
    applyFilters(clearedFilters);
  };

  const filterOptions = [
    {
      key: 'year' as keyof FilterState,
      label: 'Year',
      options: [{ value: 'all', label: 'All Years' }, ...years.map(y => ({ value: y.toString(), label: y.toString() }))],
    },
    {
      key: 'district' as keyof FilterState,
      label: 'District',
      options: [{ value: 'all', label: 'All Districts' }, ...districts.map(d => ({ value: d, label: d }))],
    },
    {
      key: 'module' as keyof FilterState,
      label: 'Module',
      options: [{ value: 'all', label: 'All Modules' }, ...modules.map(m => ({ value: m, label: m }))],
    },
    {
      key: 'reportType' as keyof FilterState,
      label: 'Type',
      options: [{ value: 'all', label: 'All Types' }, ...Object.entries(typeLabels).map(([value, label]) => ({ value, label }))],
    },
    {
      key: 'source' as keyof FilterState,
      label: 'Source',
      options: [{ value: 'all', label: 'All Sources' }, ...sources.map(s => ({ value: s, label: s }))],
    },
    {
      key: 'status' as keyof FilterState,
      label: 'Status',
      options: [{ value: 'all', label: 'All Statuses' }, ...Object.entries(statusLabels).map(([value, label]) => ({ value, label }))],
    },
  ];

  return (
    <section className="py-6 border-b border-white/10 bg-slate-900/30">
      <div className="container mx-auto px-6">
        {/* Filter Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white">Filter Reports</h3>
            {activeFilterCount > 0 && (
              <span className="px-2 py-1 text-xs font-bold bg-amber-500 text-slate-950 rounded-full">
                {activeFilterCount} active
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-1 px-3 py-1.5 text-sm text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-3 h-3" />
                Clear all
              </button>
            )}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Filter Grid */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {filterOptions.map((filter) => (
                  <div key={filter.key} className="relative">
                    <select
                      value={filters[filter.key]}
                      onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                      className="w-full px-3 py-2.5 bg-slate-900/80 border border-white/10 rounded-lg text-sm text-white appearance-none cursor-pointer hover:border-white/20 focus:border-amber-500/50 focus:outline-none focus:ring-1 focus:ring-amber-500/20 transition-all"
                    >
                      {filter.options.map(opt => (
                        <option key={opt.value} value={opt.value} className="bg-slate-900 text-white">
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 pointer-events-none">
                      {filter.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
