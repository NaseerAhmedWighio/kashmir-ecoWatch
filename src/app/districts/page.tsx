'use client';

import React, { useState, useMemo } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import {
  Map, MapPin, TrendingUp, Filter, X, Leaf, Droplets, AlertTriangle,
  FileText, Activity, Shield, Info, BarChart3
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  getAllDistrictIntelligence,
  getDistrictSummaryStats,
  sortDistricts,
  DistrictIntelligenceSummary,
  DistrictSortKey,
  DistrictFilterRegion,
  DistrictFilterRiskLevel,
} from '@/data/district-intelligence-aggregator';
import { DistrictCard, DistrictStats } from '@/components/districts/DistrictCard';
import { cn } from '@/lib/utils';

export default function DistrictsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [region, setRegion] = useState<DistrictFilterRegion>('kashmir-valley');
  const [riskLevel, setRiskLevel] = useState<DistrictFilterRiskLevel>('all');
  const [sortBy, setSortBy] = useState<DistrictSortKey>('name');

  const stats = useMemo(() => getDistrictSummaryStats(), []);
  
  const allDistricts = useMemo(() => {
    return getAllDistrictIntelligence(region);
  }, [region]);

  const filteredDistricts = useMemo(() => {
    let result = [...allDistricts];

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(d =>
        d.profile.name.toLowerCase().includes(q) ||
        d.environmentalSummary.toLowerCase().includes(q) ||
        d.keyHighlights.some(h => h.toLowerCase().includes(q))
      );
    }

    // Risk level filter
    if (riskLevel !== 'all') {
      result = result.filter(d => d.riskLevel === riskLevel);
    }

    // Sort
    result = sortDistricts(result, sortBy);

    return result;
  }, [allDistricts, searchQuery, riskLevel, sortBy]);

  const activeFilterCount = [
    region !== 'kashmir-valley',
    riskLevel !== 'all',
    searchQuery !== '',
  ].filter(Boolean).length;

  const regionLabels: Record<DistrictFilterRegion, string> = {
    'all': 'All Regions',
    'kashmir-valley': 'Kashmir Valley',
    'jammu': 'Jammu',
    'ladakh': 'Ladakh',
  };

  const riskLevelLabels: Record<DistrictFilterRiskLevel, string> = {
    'all': 'All Levels',
    'critical': 'Critical',
    'high': 'High',
    'moderate': 'Moderate',
    'low': 'Low',
  };

  const sortLabels: Record<DistrictSortKey, string> = {
    'name': 'Name',
    'risk-high': 'Highest Risk',
    'risk-low': 'Lowest Risk',
    'population': 'Population',
    'area': 'Area',
    'biodiversity': 'Biodiversity',
    'water-security': 'Water Security',
    'alerts': 'Most Alerts',
    'evidence': 'Most Evidence',
  };

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-48 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-teal-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl">
                <Map className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">District Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              District <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Profiles</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-4xl">
              Integrated district-level environmental intelligence bringing together ecological systems, water networks,
              monitoring, risk, evidence, and public contribution across the platform.
            </p>

            <p className="text-sm text-slate-500 mb-8">
              <strong className="text-slate-400">Geographic Scope:</strong> Currently covering Kashmir Valley districts, with select profiles from Jammu Division and Ladakh.
              Expanded J&K coverage in progress.
            </p>

            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search districts by name, environmental features, or highlights..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <Button
                size="lg"
                variant="outline"
                className={cn(
                  "border-white/20 text-white min-w-[140px]",
                  activeFilterCount > 0 && "border-emerald-500/50 bg-emerald-500/10"
                )}
                icon={activeFilterCount > 0 ? <Shield className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
                onClick={() => setShowFilters(!showFilters)}
              >
                {activeFilterCount > 0 ? `${activeFilterCount} Filters` : 'Filters'}
              </Button>
            </div>

            {/* Active Filters Display */}
            <AnimatePresence>
              {activeFilterCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-2 mb-6"
                >
                  {region !== 'kashmir-valley' && (
                    <Badge
                      variant="outline"
                      size="sm"
                      className="cursor-pointer bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                      onClick={() => setRegion('kashmir-valley')}
                    >
                      Region: {regionLabels[region]} <X className="w-3 h-3 ml-1" />
                    </Badge>
                  )}
                  {riskLevel !== 'all' && (
                    <Badge
                      variant="outline"
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => setRiskLevel('all')}
                    >
                      Risk: {riskLevel} <X className="w-3 h-3 ml-1" />
                    </Badge>
                  )}
                  {searchQuery && (
                    <Badge
                      variant="secondary"
                      size="sm"
                      className="cursor-pointer bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                      onClick={() => setSearchQuery('')}
                    >
                      Search: "{searchQuery}" <X className="w-3 h-3 ml-1" />
                    </Badge>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Summary Stats */}
            <DistrictStats
              totalDistricts={stats.totalDistricts}
              highestRiskDistrict={stats.highestRiskDistrict}
              mostBiodiverseDistrict={stats.mostBiodiverseDistrict}
              mostMonitoredDistrict={stats.mostMonitoredDistrict}
              districtsActiveAlerts={stats.districtsActiveAlerts}
            />
          </motion.div>
        </div>
      </section>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="py-8 bg-slate-900/50"
          >
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Region Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <Map className="w-4 h-4" />
                    Region / Division
                  </h3>
                  <div className="space-y-2">
                    {(['kashmir-valley', 'jammu', 'ladakh', 'all'] as DistrictFilterRegion[]).map(r => (
                      <label key={r} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="region"
                          checked={region === r}
                          onChange={() => setRegion(r)}
                          className="w-4 h-4 border-white/20 bg-slate-800 text-emerald-500 focus:ring-emerald-500/20"
                        />
                        <span className="text-sm text-slate-300">{regionLabels[r]}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Risk Level Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Risk Level
                  </h3>
                  <div className="space-y-2">
                    {(['all', 'critical', 'high', 'moderate', 'low'] as DistrictFilterRiskLevel[]).map(level => (
                      <label key={level} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="riskLevel"
                          checked={riskLevel === level}
                          onChange={() => setRiskLevel(level)}
                          className="w-4 h-4 border-white/20 bg-slate-800 text-emerald-500 focus:ring-emerald-500/20"
                        />
                        <span className="text-sm text-slate-300 capitalize">{riskLevelLabels[level]}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div className="lg:col-span-2">
                  <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Sort By
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(sortLabels) as DistrictSortKey[]).map(key => (
                      <button
                        key={key}
                        onClick={() => setSortBy(key)}
                        className={cn(
                          "text-sm px-3 py-2 rounded-lg text-left transition-colors",
                          sortBy === key
                            ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-transparent"
                        )}
                      >
                        {sortLabels[key]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* District Cards */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">District Intelligence Profiles</h2>
              <p className="text-slate-400">
                {filteredDistricts.length} district{filteredDistricts.length !== 1 ? 's' : ''} found
                {activeFilterCount > 0 ? ' (filtered)' : ''}
              </p>
            </div>
          </div>

          {filteredDistricts.length === 0 ? (
            <div className="text-center py-16">
              <Map className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No Districts Found</h3>
              <p className="text-slate-400 mb-6">
                Try adjusting your filters to see more results.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDistricts.map((summary, i) => (
                <DistrictCard key={summary.profile.slug} summary={summary} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Risk Score Explanation */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-indigo-500/20 bg-indigo-500/5 p-8 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <Info className="w-8 h-8 text-indigo-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">How District Risk Is Interpreted</h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                  <strong className="text-white">Risk Score</strong> reflects a composite of environmental, hazard, hydrological, ecological,
                  and monitoring-linked stress indicators used for comparative district-level interpretation.
                </p>
                <div className="space-y-3 text-sm text-slate-400">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-1.5" />
                    <span><strong className="text-white">Flood Risk:</strong> River overflow potential, flash flood exposure, historical incident patterns</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0 mt-1.5" />
                    <span><strong className="text-white">Landslide & Slope:</strong> Terrain instability, road vulnerability, slope saturation levels</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0 mt-1.5" />
                    <span><strong className="text-white">Forest Fire:</strong> Fire weather indices, fuel dryness, historical fire frequency</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0 mt-1.5" />
                    <span><strong className="text-white">Seismic Exposure:</strong> Earthquake zone classification, infrastructure readiness</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0 mt-1.5" />
                    <span><strong className="text-white">Climate Vulnerability:</strong> Exposure, sensitivity, and adaptive capacity composite index</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* How District Profiles Support the Platform */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-8 h-8 text-indigo-400" />
              <h2 className="text-3xl font-bold text-white">How District Profiles Support the Platform</h2>
            </div>

            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              District profiles serve as the regional intelligence entry layer, synthesizing all major platform
              systems into unified, place-based intelligence profiles for each administrative district.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: Leaf,
                  title: 'Biodiversity Intelligence',
                  description: 'Species inventories, habitat mapping, threatened species tracking, and protected area overlap analysis.',
                  color: 'from-emerald-500/20 to-teal-500/20',
                  textColor: 'text-emerald-400',
                },
                {
                  icon: Droplets,
                  title: 'Water Systems',
                  description: 'Lake health, river flow, wetland extent, groundwater trends, and water quality monitoring.',
                  color: 'from-blue-500/20 to-indigo-500/20',
                  textColor: 'text-blue-400',
                },
                {
                  icon: Activity,
                  title: 'Environmental Monitoring',
                  description: 'Air quality, pollution signals, waste management, and environmental health indicators.',
                  color: 'from-purple-500/20 to-pink-500/20',
                  textColor: 'text-purple-400',
                },
                {
                  icon: AlertTriangle,
                  title: 'Risk & Monitoring',
                  description: 'Multi-hazard risk, active alerts, emergency response capacity, and infrastructure vulnerability.',
                  color: 'from-red-500/20 to-orange-500/20',
                  textColor: 'text-red-400',
                },
                {
                  icon: FileText,
                  title: 'Evidence Library',
                  description: 'Linked research studies, field reports, assessments, and policy documents.',
                  color: 'from-amber-500/20 to-orange-500/20',
                  textColor: 'text-amber-400',
                },
                {
                  icon: Map,
                  title: 'Spatial & Atlas Context',
                  description: 'GIS mapping, hazard overlays, habitat boundaries, and administrative boundaries.',
                  color: 'from-cyan-500/20 to-blue-500/20',
                  textColor: 'text-cyan-400',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="glass-intense border-white/10 p-6 h-full hover:border-white/20 transition-all">
                    <div className={cn(
                      "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4",
                      item.color
                    )}>
                      <item.icon className={cn("w-6 h-6", item.textColor)} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
