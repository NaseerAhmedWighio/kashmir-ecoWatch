'use client';

import React, { useState, useMemo } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import {
  AlertTriangle, TrendingUp, Minus, Eye, TrendingDown, Filter, X,
  MapPin, Calendar, ArrowRight, BookOpen, Info, Shield, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  riskUpdates,
  RiskUpdate,
  HazardType,
  RiskSeverity,
  RiskTrend,
  UpdateStatus,
  hazardTypeLabels,
  hazardTypeColors,
  riskTrendLabels,
  riskTrendColors,
  severityLabels,
  severityColors,
  getDistinctDistricts,
  getDistinctBasins,
  getDistinctCorridors,
  getSummaryStats,
} from '@/data/risk-updates-intelligence';
import { RiskUpdateCard, RiskUpdateStats } from '@/components/risk-updates/RiskUpdateCard';
import { cn } from '@/lib/utils';

interface FilterState {
  hazardTypes: HazardType[];
  severities: RiskSeverity[];
  trends: RiskTrend[];
  districts: string[];
  basins: string[];
  corridors: string[];
  status: UpdateStatus[];
}

export default function RiskUpdatesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    hazardTypes: [],
    severities: [],
    trends: [],
    districts: [],
    basins: [],
    corridors: [],
    status: ['active'],
  });

  const stats = useMemo(() => getSummaryStats(), []);
  const districts = useMemo(() => getDistinctDistricts(), []);
  const basins = useMemo(() => getDistinctBasins(), []);
  const corridors = useMemo(() => getDistinctCorridors(), []);

  // Filter logic
  const filteredUpdates = useMemo(() => {
    let result = [...riskUpdates];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(u =>
        u.title.toLowerCase().includes(q) ||
        u.assessmentSummary.toLowerCase().includes(q) ||
        u.tags.some(t => t.toLowerCase().includes(q)) ||
        u.affectedGeographies.some(g => g.name.toLowerCase().includes(q))
      );
    }

    if (filters.hazardTypes.length > 0) {
      result = result.filter(u => filters.hazardTypes.includes(u.hazardType));
    }

    if (filters.severities.length > 0) {
      result = result.filter(u => filters.severities.includes(u.severity));
    }

    if (filters.trends.length > 0) {
      result = result.filter(u => filters.trends.includes(u.trend));
    }

    if (filters.districts.length > 0) {
      result = result.filter(u =>
        u.affectedGeographies.some(g => g.type === 'district' && filters.districts.includes(g.name))
      );
    }

    if (filters.basins.length > 0) {
      result = result.filter(u => u.basin && filters.basins.includes(u.basin));
    }

    if (filters.corridors.length > 0) {
      result = result.filter(u => u.corridor && filters.corridors.includes(u.corridor));
    }

    if (filters.status.length > 0) {
      result = result.filter(u => filters.status.includes(u.status));
    }

    return result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [searchQuery, filters]);

  const toggleFilter = <K extends keyof FilterState>(key: K, value: FilterState[K][number]) => {
    setFilters(prev => {
      const current = prev[key];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [key]: updated };
    });
  };

  const clearFilters = () => {
    setFilters({
      hazardTypes: [],
      severities: [],
      trends: [],
      districts: [],
      basins: [],
      corridors: [],
      status: ['active'],
    });
    setSearchQuery('');
  };

  const hasActiveFilters =
    searchQuery ||
    filters.hazardTypes.length > 0 ||
    filters.severities.length > 0 ||
    filters.trends.length > 0 ||
    filters.districts.length > 0 ||
    filters.basins.length > 0 ||
    filters.corridors.length > 0 ||
    filters.status.length !== 1 ||
    !filters.status.includes('active');

  const activeFilterCount =
    filters.hazardTypes.length +
    filters.severities.length +
    filters.trends.length +
    filters.districts.length +
    filters.basins.length +
    filters.corridors.length +
    (filters.status.length !== 1 || !filters.status.includes('active') ? filters.status.length : 0);

  const trendIcons: Record<string, React.ElementType> = {
    'increasing': TrendingUp,
    'stable': Minus,
    'elevated': TrendingUp,
    'improving': TrendingDown,
    'under-watch': Eye,
  };

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-48 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/50 via-orange-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-2xl">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <Badge variant="danger" size="lg">Risk Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Risk <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Updates</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-4xl">
              Latest hazard assessments, evolving risk outlooks, and situational awareness briefings
              supporting preparedness and environmental monitoring across Kashmir.
            </p>

            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <AlertTriangle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search risk updates by title, assessment, location, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                />
              </div>
              <Button
                size="lg"
                variant="outline"
                className={cn(
                  "border-white/20 text-white min-w-[140px]",
                  hasActiveFilters && "border-red-500/50 bg-red-500/10"
                )}
                icon={hasActiveFilters ? <Shield className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
                onClick={() => setShowFilters(!showFilters)}
              >
                {hasActiveFilters ? `${activeFilterCount} Filters` : 'Filters'}
              </Button>
            </div>

            {/* Active Filters Display */}
            <AnimatePresence>
              {hasActiveFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-2 mb-6"
                >
                  {searchQuery && (
                    <Badge
                      variant="secondary"
                      size="sm"
                      className="cursor-pointer bg-red-500/20 text-red-400 border-red-500/30"
                      onClick={() => setSearchQuery('')}
                    >
                      Search: "{searchQuery}" <X className="w-3 h-3 ml-1" />
                    </Badge>
                  )}
                  {filters.hazardTypes.map(h => (
                    <Badge
                      key={h}
                      variant="outline"
                      size="sm"
                      className={cn("cursor-pointer", hazardTypeColors[h])}
                      onClick={() => toggleFilter('hazardTypes', h)}
                    >
                      {hazardTypeLabels[h]} <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                  {filters.severities.map(s => (
                    <Badge
                      key={s}
                      variant="outline"
                      size="sm"
                      className={cn("cursor-pointer", severityColors[s])}
                      onClick={() => toggleFilter('severities', s)}
                    >
                      {severityLabels[s]} <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-slate-400 hover:text-white h-7"
                    onClick={clearFilters}
                  >
                    Clear all
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Summary Stats */}
            <RiskUpdateStats
              totalUpdates={stats.totalUpdates}
              activeUpdates={stats.activeUpdates}
              highSeverity={stats.highSeverity}
              districtsAffected={stats.districtsAffected}
              latestAssessment={stats.latestAssessment}
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
                {/* Hazard Type Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Hazard Type
                  </h3>
                  <div className="space-y-2">
                    {(Object.keys(hazardTypeLabels) as HazardType[]).map(type => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.hazardTypes.includes(type)}
                          onChange={() => toggleFilter('hazardTypes', type)}
                          className="w-4 h-4 rounded border-white/20 bg-slate-800 text-red-500 focus:ring-red-500/20"
                        />
                        <span className={cn("text-sm px-2 py-0.5 rounded", hazardTypeColors[type])}>
                          {hazardTypeLabels[type]}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Severity Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Severity
                  </h3>
                  <div className="space-y-2">
                    {(Object.keys(severityLabels) as RiskSeverity[]).map(severity => (
                      <label key={severity} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.severities.includes(severity)}
                          onChange={() => toggleFilter('severities', severity)}
                          className="w-4 h-4 rounded border-white/20 bg-slate-800 text-red-500 focus:ring-red-500/20"
                        />
                        <span className={cn("text-sm px-2 py-0.5 rounded", severityColors[severity])}>
                          {severityLabels[severity]}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Trend Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <Activity className="w-4 h-4" />
                    Risk Trend
                  </h3>
                  <div className="space-y-2">
                    {(Object.keys(riskTrendLabels) as RiskTrend[]).map(trend => {
                      const TrendIcon = trendIcons[trend] || Minus;
                      return (
                        <label key={trend} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={filters.trends.includes(trend)}
                            onChange={() => toggleFilter('trends', trend)}
                            className="w-4 h-4 rounded border-white/20 bg-slate-800 text-red-500 focus:ring-red-500/20"
                          />
                          <TrendIcon className={cn("w-4 h-4", riskTrendColors[trend])} />
                          <span className={cn("text-sm", riskTrendColors[trend])}>
                            {riskTrendLabels[trend]}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Status Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Status
                  </h3>
                  <div className="space-y-2">
                    {(['active', 'archived', 'under-review'] as UpdateStatus[]).map(status => (
                      <label key={status} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.status.includes(status)}
                          onChange={() => toggleFilter('status', status)}
                          className="w-4 h-4 rounded border-white/20 bg-slate-800 text-red-500 focus:ring-red-500/20"
                        />
                        <span className="text-sm text-slate-300 capitalize">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* District Filter */}
                {districts.length > 0 && (
                  <div className="lg:col-span-2">
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      District
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {districts.map(district => (
                        <label key={district} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.districts.includes(district)}
                            onChange={() => toggleFilter('districts', district)}
                            className="w-4 h-4 rounded border-white/20 bg-slate-800 text-red-500 focus:ring-red-500/20"
                          />
                          <span className="text-sm text-slate-300">{district}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Basin / Corridor Filter */}
                {(basins.length > 0 || corridors.length > 0) && (
                  <div className="lg:col-span-2">
                    <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Basin / Corridor
                    </h3>
                    <div className="space-y-3">
                      {basins.length > 0 && (
                        <div>
                          <div className="text-xs text-slate-500 mb-2">Basins</div>
                          <div className="grid grid-cols-2 gap-2">
                            {basins.map(basin => (
                              <label key={basin} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={filters.basins.includes(basin)}
                                  onChange={() => toggleFilter('basins', basin)}
                                  className="w-4 h-4 rounded border-white/20 bg-slate-800 text-red-500 focus:ring-red-500/20"
                                />
                                <span className="text-sm text-slate-300">{basin}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                      {corridors.length > 0 && (
                        <div>
                          <div className="text-xs text-slate-500 mb-2">Corridors</div>
                          <div className="grid grid-cols-2 gap-2">
                            {corridors.map(corridor => (
                              <label key={corridor} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={filters.corridors.includes(corridor)}
                                  onChange={() => toggleFilter('corridors', corridor)}
                                  className="w-4 h-4 rounded border-white/20 bg-slate-800 text-red-500 focus:ring-red-500/20"
                                />
                                <span className="text-sm text-slate-300">{corridor}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Risk Updates Feed */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Risk Assessment Feed</h2>
              <p className="text-slate-400">
                {filteredUpdates.length} update{filteredUpdates.length !== 1 ? 's' : ''} found
                {hasActiveFilters ? ' (filtered)' : ''}
              </p>
            </div>
          </div>

          {filteredUpdates.length === 0 ? (
            <div className="text-center py-16">
              <AlertTriangle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No Risk Updates Found</h3>
              <p className="text-slate-400 mb-6">
                {hasActiveFilters
                  ? 'Try adjusting your filters to see more results.'
                  : 'No risk updates are currently available.'}
              </p>
              {hasActiveFilters && (
                <Button variant="outline" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredUpdates.map((update, i) => (
                <RiskUpdateCard key={update.id} update={update} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How Risk Updates Are Used */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-6">
              <Info className="w-8 h-8 text-indigo-400" />
              <h2 className="text-3xl font-bold text-white">How Risk Updates Support the Platform</h2>
            </div>

            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              Risk updates provide situational awareness and evolving hazard assessment. They do not always
              represent an emergency alert, but may inform preparedness, monitoring, district attention,
              and advisory planning.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: AlertTriangle,
                  title: 'Feeds Alerts & Advisories',
                  description: 'Risk assessments trigger or escalate public alerts and official advisories when thresholds are crossed.',
                  color: 'from-red-500/20 to-orange-500/20',
                  textColor: 'text-red-400',
                },
                {
                  icon: Activity,
                  title: 'Informs Monitoring',
                  description: 'Risk outlooks guide monitoring priorities, sensor deployment, and field team focus areas.',
                  color: 'from-blue-500/20 to-indigo-500/20',
                  textColor: 'text-blue-400',
                },
                {
                  icon: BookOpen,
                  title: 'Documents Field Reports',
                  description: 'Assessments are linked to field observations, creating a structured evidence trail for each risk update.',
                  color: 'from-emerald-500/20 to-teal-500/20',
                  textColor: 'text-emerald-400',
                },
                {
                  icon: TrendingUp,
                  title: 'Powers Dashboards',
                  description: 'Risk trends and severity data feed analytical dashboards showing system-wide hazard patterns.',
                  color: 'from-purple-500/20 to-pink-500/20',
                  textColor: 'text-purple-400',
                },
                {
                  icon: MapPin,
                  title: 'District Profiles',
                  description: 'Each update contributes to district-level risk profiles, building long-term hazard intelligence.',
                  color: 'from-amber-500/20 to-orange-500/20',
                  textColor: 'text-amber-400',
                },
                {
                  icon: Shield,
                  title: 'Atlas & Map Context',
                  description: 'Spatial risk data is integrated into the platform Atlas, providing geographic hazard visualization.',
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

            {/* Distinction Note */}
            <Card className="glass-intense border-indigo-500/20 bg-indigo-500/5 p-6 mt-8">
              <div className="flex items-start gap-4">
                <Info className="w-6 h-6 text-indigo-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Risk Updates vs. Alerts & Advisories</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    <strong className="text-white">Alerts & Advisories</strong> are urgent, public-facing warnings for immediate
                    hazards requiring action. <strong className="text-white">Risk Updates</strong> provide evolving risk interpretation,
                    situational awareness, outlook shifts, and assessment changes. They serve as the analytical layer between
                    real-time alerts and deeper hazard submodules, informing preparedness before emergencies develop.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
