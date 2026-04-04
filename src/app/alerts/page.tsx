'use client';

import React, { useState, useMemo } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import {
  Bell, AlertTriangle, Clock, Calendar, ArrowRight, Filter, X,
  MapPin, Shield, TrendingUp, CheckCircle2, AlertCircle,
  Droplets, Mountain, Snowflake, Flame, Wind, ThermometerSun,
  ChevronDown, ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  alertRegistry, getAlertStats, getActiveAlerts, getExpiredAlerts, getMonitoringAlerts,
  categoryLabels, categoryColors, severityDisplayLabels, severityColors,
  statusDisplayLabels, statusColors, sourceDisplayLabels, urgencyLabels,
  AlertItem, AlertSeverity, AlertStatus, AlertCategory
} from '@/data/alert-registry';
import { cn } from '@/lib/utils';

const categoryIcons: Record<AlertCategory, React.ElementType> = {
  flood: Droplets,
  landslide: Mountain,
  avalanche: Snowflake,
  fire: Flame,
  'air-quality': Wind,
  heatwave: ThermometerSun,
  earthquake: AlertTriangle,
  storm: Wind,
};

const districtList = Array.from(new Set(alertRegistry.map(a => a.district)));

export default function AlertsPage() {
  const router = useRouter();
  const stats = getAlertStats();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'monitoring' | 'expired'>('all');
  const [filters, setFilters] = useState<{
    severities: AlertSeverity[];
    categories: AlertCategory[];
    districts: string[];
  }>({
    severities: [],
    categories: [],
    districts: [],
  });

  // Filter alerts based on tab and filters
  const filteredAlerts = useMemo(() => {
    let result = [...alertRegistry];

    // Tab filter
    if (activeTab === 'active') {
      result = result.filter(a => a.status === 'active');
    } else if (activeTab === 'monitoring') {
      result = result.filter(a => a.status === 'monitoring');
    } else if (activeTab === 'expired') {
      result = result.filter(a => a.status === 'expired');
    }

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.affectedArea.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q)) ||
        a.district.toLowerCase().includes(q)
      );
    }

    // Severity filter
    if (filters.severities.length > 0) {
      result = result.filter(a => filters.severities.includes(a.severity));
    }

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter(a => filters.categories.includes(a.category));
    }

    // District filter
    if (filters.districts.length > 0) {
      result = result.filter(a => filters.districts.includes(a.district));
    }

    // Sort: active first, then by severity (critical > high > moderate > low), then by date
    const severityOrder: Record<AlertSeverity, number> = {
      critical: 0,
      high: 1,
      moderate: 2,
      low: 3,
    };

    result.sort((a, b) => {
      const statusOrder = { active: 0, monitoring: 1, expired: 2, resolved: 3 };
      if (statusOrder[a.status] !== statusOrder[b.status]) {
        return statusOrder[a.status] - statusOrder[b.status];
      }
      if (severityOrder[a.severity] !== severityOrder[b.severity]) {
        return severityOrder[a.severity] - severityOrder[b.severity];
      }
      return new Date(b.issued).getTime() - new Date(a.issued).getTime();
    });

    return result;
  }, [activeTab, searchQuery, filters]);

  const toggleFilter = <K extends keyof typeof filters>(key: K, value: typeof filters[K][number]) => {
    setFilters(prev => {
      const current = prev[key];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [key]: updated };
    });
  };

  const clearFilters = () => {
    setFilters({ severities: [], categories: [], districts: [] });
    setSearchQuery('');
  };

  const hasActiveFilters = 
    searchQuery || 
    filters.severities.length > 0 || 
    filters.categories.length > 0 || 
    filters.districts.length > 0;

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-48 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/50 via-rose-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-2xl">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <Badge variant="danger" size="lg">Risk & Monitoring</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Live Alerts & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-400">Advisories</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Public-facing live alert stream for Kashmir EcoWatch — real-time hazard alerts, 
              weather advisories, and emergency notifications for public safety and disaster preparedness.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Summary Strip */}
      <section className="py-8 bg-slate-900/50 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-1">{stats.active}</div>
              <div className="text-sm text-slate-400">Active Alerts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-1">{stats.monitoring}</div>
              <div className="text-sm text-slate-400">Under Monitoring</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-slate-400 mb-1">{stats.expired}</div>
              <div className="text-sm text-slate-400">Expired / Archived</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-400 mb-1">{stats.highSeverity}</div>
              <div className="text-sm text-slate-400">High Severity</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-1">{stats.districtsAffected}</div>
              <div className="text-sm text-slate-400">Districts Affected</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs & Controls */}
      <section className="py-8 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Tabs */}
            <div className="flex items-center gap-2">
              {[
                { key: 'all', label: 'All Alerts', count: alertRegistry.length },
                { key: 'active', label: 'Active', count: stats.active },
                { key: 'monitoring', label: 'Monitoring', count: stats.monitoring },
                { key: 'expired', label: 'Archived', count: stats.expired },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    activeTab === tab.key
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
                  )}
                >
                  {tab.label}
                  <span className="ml-2 text-xs opacity-70">{tab.count}</span>
                </button>
              ))}
            </div>

            {/* Search & Filter */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="flex-1 md:flex-none md:w-80 relative">
                <Bell className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  type="text"
                  placeholder="Search alerts by title, area, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-slate-900/50 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:border-red-500/50 focus:ring-2 focus:ring-red-500/20"
                />
              </div>
              <Button
                size="sm"
                variant="outline"
                className={cn(
                  "border-white/20 text-white",
                  hasActiveFilters && "border-red-500/50 bg-red-500/10"
                )}
                icon={hasActiveFilters ? <CheckCircle2 className="w-4 h-4" /> : <Filter className="w-4 h-4" />}
                onClick={() => setShowFilters(!showFilters)}
              >
                Filters
              </Button>
            </div>
          </div>

          {/* Active Filters Display */}
          <AnimatePresence>
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap gap-2 mt-4"
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
                {filters.severities.map(s => (
                  <Badge
                    key={s}
                    variant="outline"
                    size="sm"
                    className={cn("cursor-pointer", severityColors[s])}
                    onClick={() => toggleFilter('severities', s)}
                  >
                    {severityDisplayLabels[s]} <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
                {filters.categories.map(c => (
                  <Badge
                    key={c}
                    variant="outline"
                    size="sm"
                    className="cursor-pointer bg-slate-500/20 text-slate-400 border-slate-500/30"
                    onClick={() => toggleFilter('categories', c)}
                  >
                    {categoryLabels[c]} <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
                {filters.districts.map(d => (
                  <Badge
                    key={d}
                    variant="outline"
                    size="sm"
                    className="cursor-pointer bg-purple-500/20 text-purple-400 border-purple-500/30"
                    onClick={() => toggleFilter('districts', d)}
                  >
                    {d} <X className="w-3 h-3 ml-1" />
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
        </div>
      </section>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="py-8 bg-slate-900/50 border-b border-white/5"
          >
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Severity Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Severity
                  </h3>
                  <div className="space-y-2">
                    {(['critical', 'high', 'moderate', 'low'] as AlertSeverity[]).map(severity => (
                      <label key={severity} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.severities.includes(severity)}
                          onChange={() => toggleFilter('severities', severity)}
                          className="w-4 h-4 rounded border-white/20 bg-slate-800 text-red-500 focus:ring-red-500/20"
                        />
                        <span className={cn("text-sm px-2 py-0.5 rounded border", severityColors[severity])}>
                          {severityDisplayLabels[severity]}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Category Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    Hazard Type
                  </h3>
                  <div className="space-y-2">
                    {(['flood', 'landslide', 'avalanche', 'fire', 'air-quality', 'heatwave'] as AlertCategory[]).map(category => {
                      const Icon = categoryIcons[category];
                      return (
                        <label key={category} className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={filters.categories.includes(category)}
                            onChange={() => toggleFilter('categories', category)}
                            className="w-4 h-4 rounded border-white/20 bg-slate-800 text-red-500 focus:ring-red-500/20"
                          />
                          <Icon className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-300">{categoryLabels[category]}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* District Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    District
                  </h3>
                  <div className="space-y-2">
                    {districtList.map(district => (
                      <label key={district} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.districts.includes(district)}
                          onChange={() => toggleFilter('districts', district)}
                          className="w-4 h-4 rounded border-white/20 bg-slate-800 text-red-500 focus:ring-red-500/20"
                        />
                        <MapPin className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-slate-300">{district}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Alert Feed */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-16">
              <AlertCircle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No Alerts Found</h3>
              <p className="text-slate-400 mb-6">
                {hasActiveFilters 
                  ? 'Try adjusting your filters or search terms.'
                  : 'No alerts match the selected criteria.'}
              </p>
              {hasActiveFilters && (
                <Button onClick={clearFilters} variant="outline" className="border-white/20 text-white">
                  Clear All Filters
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredAlerts.map((alert, i) => (
                <AlertCard key={alert.id} alert={alert} index={i} onClick={() => router.push(`/alerts/${alert.id}`)} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Archive Section Link */}
      <section className="py-12 bg-slate-900/30 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-white mb-3">Alert Archive & History</h3>
            <p className="text-slate-400 mb-6">
              Browse past alerts and track how hazard conditions have evolved over time. 
              Search and filter historical alerts by date, location, or severity.
            </p>
            <Button 
              variant="outline" 
              className="border-white/20 text-white" 
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={() => setActiveTab('expired')}
            >
              View Expired & Archived Alerts
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <AdvancedFooter />
    </main>
  );
}

// Alert Card Component
function AlertCard({ alert, index, onClick }: { alert: AlertItem; index: number; onClick: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const severityColor = severityColors[alert.severity];
  const statusColor = statusColors[alert.status];
  const categoryGradient = categoryColors[alert.category];
  const Icon = categoryIcons[alert.category];
  const isActive = alert.status === 'active' || alert.status === 'monitoring';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card 
        className={cn(
          "glass-intense border-white/10 cursor-pointer transition-all hover:border-white/20",
          isActive ? "hover:border-red-500/30" : "opacity-75 hover:opacity-100"
        )}
        onClick={onClick}
      >
        <div className="p-5">
          {/* Header Row */}
          <div className="flex items-start gap-4 mb-4">
            {/* Icon */}
            <div className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br",
              categoryGradient
            )}>
              <Icon className="w-6 h-6 text-white" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="text-lg font-bold text-white">{alert.title}</h3>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={cn("px-2 py-0.5 rounded text-xs font-medium border", severityColor)}>
                    {severityDisplayLabels[alert.severity]}
                  </span>
                  <span className={cn("px-2 py-0.5 rounded text-xs font-medium border", statusColor)}>
                    {statusDisplayLabels[alert.status]}
                  </span>
                </div>
              </div>

              {/* Location & Source */}
              <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {alert.affectedArea}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Shield className="w-3.5 h-3.5" />
                  {sourceDisplayLabels[alert.source]}
                </span>
              </div>

              {/* Timing */}
              <div className="flex items-center gap-6 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Issued: {new Date(alert.issued).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Expires: {new Date(alert.expires).toLocaleDateString('en-US', { 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Summary (always visible) */}
          <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
            {alert.summary}
          </p>

          {/* Expandable Guidance Section */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="w-full flex items-center justify-between py-3 px-4 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors mb-4"
          >
            <span className="text-sm font-medium text-slate-300">
              {expanded ? 'Hide' : 'Show'} Public Guidance & Actions
            </span>
            {expanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 rounded-lg bg-slate-800/50 border border-white/5 space-y-4 mb-4">
                  {/* Urgency Badge */}
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" size="sm" className={cn(
                      alert.guidance.urgency === 'urgent' ? "border-red-500/50 text-red-400" :
                      alert.guidance.urgency === 'precautionary' ? "border-amber-500/50 text-amber-400" :
                      "border-blue-500/50 text-blue-400"
                    )}>
                      {urgencyLabels[alert.guidance.urgency]}
                    </Badge>
                  </div>

                  {/* Guidance Summary */}
                  <p className="text-sm text-slate-300 leading-relaxed">{alert.guidance.summary}</p>

                  {/* Recommended Actions */}
                  <div>
                    <h4 className="text-xs font-semibold text-slate-400 mb-2">Recommended Actions</h4>
                    <ul className="space-y-1.5">
                      {alert.guidance.actions.slice(0, 3).map((action, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>{action}</span>
                        </li>
                      ))}
                      {alert.guidance.actions.length > 3 && (
                        <li className="text-xs text-slate-500 italic">
                          +{alert.guidance.actions.length - 3} more actions (see full details)
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Travel Impact */}
                  <div className="flex items-start gap-2 text-sm text-slate-400 pt-2 border-t border-white/5">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-medium text-slate-300">Travel Impact: </span>
                      {alert.guidance.travelImpact}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Row */}
          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500">
                District: <span className="text-purple-400 font-medium">{alert.district}</span>
              </span>
              <span className="text-xs text-slate-600">•</span>
              <span className="text-xs text-slate-500">
                Updated: {new Date(alert.updated).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric'
                })}
              </span>
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              className="border-white/20 text-white h-8"
              onClick={(e) => {
                e.stopPropagation();
                onClick();
              }}
            >
              View Details
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
