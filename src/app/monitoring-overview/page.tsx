'use client';

import React, { useState, useMemo } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Activity, ArrowRight, BarChart3, Map as MapIcon, Layers,
  AlertTriangle, LayoutDashboard, Link as LinkIcon, Calendar,
  MapPin, Droplet, Wind, Mountain, TreePine, Waves,
  ChevronDown, ChevronUp, ExternalLink, Shield, Clock,
  Database, FileText, Eye, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  monitoringRegistry,
  getMonitoringStats,
  statusDisplayLabels,
  statusColors,
  categoryGradients,
  cadenceLabels,
  sourceLabels,
  dataAvailabilityLabels,
  type MonitoringCategory,
  type MonitoringNetwork,
} from '@/data/monitoring-registry';

const categoryIcons: Record<MonitoringCategory, React.ComponentType<{ className?: string }>> = {
  'air-quality': Wind,
  'water-quality': Droplet,
  'seismic': Activity,
  'weather': BarChart3,
  'wildlife': TreePine,
  'glacier': Mountain,
};

const categoryFilters: { id: MonitoringCategory | 'all'; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'all', label: 'All Networks', icon: Globe },
  { id: 'air-quality', label: 'Air Quality', icon: Wind },
  { id: 'water-quality', label: 'Water Quality', icon: Droplet },
  { id: 'seismic', label: 'Seismic', icon: Activity },
  { id: 'weather', label: 'Weather', icon: BarChart3 },
  { id: 'wildlife', label: 'Wildlife', icon: TreePine },
  { id: 'glacier', label: 'Glacier / Cryosphere', icon: Mountain },
];

function MonitoringOverviewPage() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<MonitoringCategory | 'all'>('all');
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const stats = useMemo(() => getMonitoringStats(), []);

  const filteredNetworks = useMemo(() => {
    if (activeFilter === 'all') return monitoringRegistry;
    return monitoringRegistry.filter(n => n.category === activeFilter);
  }, [activeFilter]);

  const toggleExpand = (id: string) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <main className="min-h-screen bg-slate-950">
      {/* ===== HERO ===== */}
      <section className="relative pt-20 md:pt-36 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/60 via-green-950/30 to-slate-950" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-2xl">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Monitoring Intelligence</span>
                <Badge variant="success" size="lg" className="ml-2">Monitoring Overview</Badge>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Monitoring{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">
                Intelligence Overview
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-4 leading-relaxed max-w-3xl">
              Environmental monitoring systems tracking atmospheric, hydrological, seismic,
              meteorological, wildlife, and cryosphere-linked conditions across Kashmir.
            </p>
            <p className="text-sm text-slate-400 max-w-3xl">
              These networks form the platform&apos;s operational sensing layer — feeding alerts,
              dashboards, district profiles, and module-specific intelligence with continuous
              and periodic environmental data.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== SUMMARY STRIP ===== */}
      <section className="pb-12">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4"
          >
            {[
              { label: 'Active Networks', value: stats.activeNetworks.toString(), icon: Activity, gradient: 'from-emerald-500/20 to-green-500/20', text: 'text-emerald-400' },
              { label: 'Total Stations / Nodes', value: stats.totalStations.toString(), icon: MapPin, gradient: 'from-blue-500/20 to-cyan-500/20', text: 'text-blue-400' },
              { label: 'District Coverage', value: `${stats.districtCoverage} districts`, icon: Layers, gradient: 'from-purple-500/20 to-pink-500/20', text: 'text-purple-400' },
              { label: 'Alert-Linked Networks', value: stats.alertLinkedNetworks.toString(), icon: AlertTriangle, gradient: 'from-orange-500/20 to-red-500/20', text: 'text-orange-400' },
              { label: 'Dashboard-Linked Networks', value: stats.dashboardLinkedNetworks.toString(), icon: LayoutDashboard, gradient: 'from-sky-500/20 to-blue-500/20', text: 'text-sky-400' },
            ].map((stat, i) => (
              <Card key={i} className="glass-intense border-white/10 p-5 text-center">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center mx-auto mb-3`}>
                  <stat.icon className={`w-5 h-5 ${stat.text}`} />
                </div>
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== COVERAGE MAP PREVIEW ===== */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Card className="glass-intense border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                      <MapIcon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Monitoring Coverage Map</h3>
                      <p className="text-xs text-slate-400">Spatial distribution of monitoring networks across Kashmir</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" icon={<ExternalLink className="w-4 h-4" />}>
                    Open Atlas
                  </Button>
                </div>
              </div>

              {/* Map Preview Area */}
              <div className="relative h-80 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
                {/* Simulated terrain */}
                <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#mapGrid)" />
                </svg>

                {/* District coverage zones */}
                <div className="absolute top-1/4 left-1/4 w-48 h-48 border border-emerald-500/30 rounded-lg bg-emerald-500/5 flex items-center justify-center">
                  <span className="text-xs text-emerald-400/70 font-mono">Srinagar AQ</span>
                </div>
                <div className="absolute top-1/3 left-1/2 w-56 h-40 border border-blue-500/30 rounded-lg bg-blue-500/5 flex items-center justify-center">
                  <span className="text-xs text-blue-400/70 font-mono">Jhelum Basin WQ</span>
                </div>
                <div className="absolute top-1/6 right-1/4 w-40 h-36 border border-orange-500/30 rounded-lg bg-orange-500/5 flex items-center justify-center">
                  <span className="text-xs text-orange-400/70 font-mono">Seismic Zone IV</span>
                </div>
                <div className="absolute bottom-1/4 left-1/3 w-64 h-32 border border-sky-500/30 rounded-lg bg-sky-500/5 flex items-center justify-center">
                  <span className="text-xs text-sky-400/70 font-mono">Weather Net (All Districts)</span>
                </div>
                <div className="absolute bottom-1/3 right-1/3 w-48 h-44 border border-green-500/30 rounded-lg bg-green-500/5 flex items-center justify-center">
                  <span className="text-xs text-green-400/70 font-mono">Wildlife PAs</span>
                </div>
                <div className="absolute top-1/5 right-1/5 w-32 h-28 border border-slate-400/30 rounded-lg bg-slate-400/5 flex items-center justify-center">
                  <span className="text-xs text-slate-400/70 font-mono">Glacier Zone</span>
                </div>

                {/* Station markers */}
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-lg shadow-emerald-400/30"
                    style={{
                      top: `${20 + (i * 7) % 60}%`,
                      left: `${15 + (i * 13) % 70}%`,
                      animationDelay: `${i * 200}ms`,
                    }}
                  />
                ))}

                {/* Map legend */}
                <div className="absolute bottom-4 left-4">
                  <Card className="p-3 glass-intense border-white/10">
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                        <span className="text-slate-300">Active Station</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                        <span className="text-slate-300">Periodic / Seasonal</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                        <span className="text-slate-300">Water Quality Node</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-orange-400" />
                        <span className="text-slate-300">Seismic Station</span>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Coverage stats overlay */}
                <div className="absolute top-4 right-4">
                  <Card className="p-3 glass-intense border-white/10">
                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center justify-between gap-6">
                        <span className="text-slate-400">District Coverage</span>
                        <span className="text-white font-bold">10</span>
                      </div>
                      <div className="flex items-center justify-between gap-6">
                        <span className="text-slate-400">Basin Coverage</span>
                        <span className="text-white font-bold">3</span>
                      </div>
                      <div className="flex items-center justify-between gap-6">
                        <span className="text-slate-400">Protected Areas</span>
                        <span className="text-white font-bold">5</span>
                      </div>
                      <div className="flex items-center justify-between gap-6">
                        <span className="text-slate-400">Altitude Range</span>
                        <span className="text-white font-bold">200m–5,500m</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ===== FILTER TABS ===== */}
      <section className="pb-8">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {categoryFilters.map((filter) => {
              const Icon = filter.icon;
              const isActive = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 hover:text-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {filter.label}
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== MONITORING NETWORK CARDS ===== */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredNetworks.map((network, i) => {
                const Icon = categoryIcons[network.category];
                const isExpanded = expandedCards.has(network.id);
                const gradient = categoryGradients[network.category];
                const statusLabel = statusDisplayLabels[network.status];
                const statusColor = statusColors[network.status];
                const cadenceLabel = cadenceLabels[network.cadence];
                const sourceLabel = sourceLabels[network.source];
                const dataLabel = dataAvailabilityLabels[network.dataAvailability];

                return (
                  <motion.div
                    key={network.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ delay: i * 0.04 }}
                    layout
                  >
                    <Card className="glass-intense border-white/10 p-0 overflow-hidden">
                      {/* Card Header */}
                      <div className="p-5 md:p-6">
                        <div className="flex items-start gap-4">
                          {/* Icon */}
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>

                          {/* Main Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <h3 className="text-lg md:text-xl font-bold text-white">{network.name}</h3>
                              <Badge className={`${statusColor} border`} size="sm">{statusLabel}</Badge>
                            </div>

                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-400 mb-3">
                              <span className="flex items-center gap-1.5">
                                <MapPin className="w-3.5 h-3.5" />
                                {network.stationCount} stations
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Globe className="w-3.5 h-3.5" />
                                {network.coverage}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                {cadenceLabel}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Shield className="w-3.5 h-3.5" />
                                {sourceLabel}
                              </span>
                            </div>

                            <p className="text-sm text-slate-400 leading-relaxed">{network.description}</p>

                            {/* Quick Actions */}
                            <div className="flex flex-wrap items-center gap-2 mt-4">
                              <button
                                onClick={() => toggleExpand(network.id)}
                                className="flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                              >
                                {isExpanded ? (
                                  <>
                                    <ChevronUp className="w-3.5 h-3.5" />
                                    Hide Details
                                  </>
                                ) : (
                                  <>
                                    <ChevronDown className="w-3.5 h-3.5" />
                                    View Details
                                  </>
                                )}
                              </button>
                              <span className="text-slate-600">|</span>
                              <button
                                onClick={() => router.push(`/monitoring-overview/${network.id}`)}
                                className="flex items-center gap-1.5 text-xs font-medium text-blue-400 hover:text-blue-300 transition-colors"
                              >
                                Full Network Page
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="border-t border-white/5 px-5 md:px-6 py-5">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* What Is Monitored */}
                                <div>
                                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">What Is Monitored</h4>
                                  <p className="text-sm text-slate-300 leading-relaxed mb-3">{network.whatIsMonitored}</p>
                                  <div className="flex flex-wrap gap-1.5">
                                    {network.parametersTracked.map(param => (
                                      <span key={param} className="px-2 py-0.5 rounded text-xs bg-white/5 text-slate-300 border border-white/10">
                                        {param}
                                      </span>
                                    ))}
                                  </div>
                                </div>

                                {/* Coverage Details */}
                                <div>
                                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Coverage Details</h4>
                                  <div className="space-y-2 text-sm">
                                    {network.coverageDetails.districts && (
                                      <div>
                                        <span className="text-slate-500">Districts: </span>
                                        <span className="text-slate-300">{network.coverageDetails.districts.join(', ')}</span>
                                      </div>
                                    )}
                                    {network.coverageDetails.basins && (
                                      <div>
                                        <span className="text-slate-500">Basins: </span>
                                        <span className="text-slate-300">{network.coverageDetails.basins.join(', ')}</span>
                                      </div>
                                    )}
                                    {network.coverageDetails.protectedAreas && (
                                      <div>
                                        <span className="text-slate-500">Protected Areas: </span>
                                        <span className="text-slate-300">{network.coverageDetails.protectedAreas.join(', ')}</span>
                                      </div>
                                    )}
                                    {network.coverageDetails.altitudeRange && (
                                      <div>
                                        <span className="text-slate-500">Altitude Range: </span>
                                        <span className="text-slate-300">{network.coverageDetails.altitudeRange}</span>
                                      </div>
                                    )}
                                    {network.coverageDetails.urbanCoverage && (
                                      <div>
                                        <span className="text-slate-500">Urban Coverage: </span>
                                        <span className="text-slate-300">{network.coverageDetails.urbanCoverage}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Feeds Modules */}
                                <div>
                                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Feeds Modules</h4>
                                  <div className="space-y-1.5">
                                    {network.feedsModules.map(mod => (
                                      <div key={mod.moduleId} className="flex items-center gap-2 text-sm">
                                        <LinkIcon className="w-3.5 h-3.5 text-emerald-400" />
                                        <span className="text-slate-300">{mod.moduleName}</span>
                                        <span className="text-xs text-slate-500">({mod.contributionType})</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Feeds Dashboards */}
                                <div>
                                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Feeds Dashboards</h4>
                                  <div className="space-y-1.5">
                                    {network.feedsDashboards.map(dash => (
                                      <div key={dash.name} className="flex items-center gap-2 text-sm">
                                        <LayoutDashboard className="w-3.5 h-3.5 text-blue-400" />
                                        <span className="text-slate-300">{dash.name}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Alerts Generated */}
                                {network.generatesAlerts.length > 0 && (
                                  <div>
                                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Alerts Generated</h4>
                                    <div className="space-y-1.5">
                                      {network.generatesAlerts.map(alert => (
                                        <div key={alert.type} className="flex items-center gap-2 text-sm">
                                          <AlertTriangle className={`w-3.5 h-3.5 ${
                                            alert.severity === 'critical' ? 'text-red-400' :
                                            alert.severity === 'high' ? 'text-orange-400' :
                                            alert.severity === 'moderate' ? 'text-amber-400' :
                                            'text-blue-400'
                                          }`} />
                                          <span className="text-slate-300">{alert.type}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Data & Quality */}
                                <div>
                                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Data & Quality</h4>
                                  <div className="space-y-1.5 text-sm">
                                    <div>
                                      <span className="text-slate-500">Data Availability: </span>
                                      <span className="text-slate-300">{dataLabel}</span>
                                    </div>
                                    <div>
                                      <span className="text-slate-500">Historical Data From: </span>
                                      <span className="text-slate-300">{network.historicalDataFrom}</span>
                                    </div>
                                    <div>
                                      <span className="text-slate-500">Quality Assurance: </span>
                                      <span className="text-slate-300">{network.qualityAssurance}</span>
                                    </div>
                                    <div>
                                      <span className="text-slate-500">Operated By: </span>
                                      <span className="text-slate-300">{network.operatedBy}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Limitations */}
                              {network.limitations && (
                                <div className="mt-5 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                                  <div className="flex items-start gap-2">
                                    <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                      <h4 className="text-xs font-semibold text-amber-400 mb-1">Coverage Limitations</h4>
                                      <p className="text-sm text-slate-300">{network.limitations}</p>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Last Updated */}
                              <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
                                <Calendar className="w-3.5 h-3.5" />
                                <span>Last updated: {new Date(network.lastUpdated).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ===== HOW MONITORING SUPPORTS THE PLATFORM ===== */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Platform Intelligence Flow</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              How Monitoring Supports the Platform
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Monitoring networks form the foundational data layer that powers every intelligence module
              across the Kashmir Environmental Intelligence Platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: AlertTriangle,
                title: 'Alerts & Advisories',
                description: 'Seismic, air quality, water quality, weather, wildlife conflict, and glacier risk alerts are generated in real-time or near-real-time from monitoring networks.',
                gradient: 'from-orange-500/20 to-red-500/20',
                iconColor: 'text-orange-400',
                networks: 'Seismic, Air, Water, Weather, Wildlife, Glacier',
              },
              {
                icon: LayoutDashboard,
                title: 'Dashboards',
                description: 'Each monitoring network feeds dedicated dashboards with continuous data streams, historical trends, and comparative analytics.',
                gradient: 'from-blue-500/20 to-cyan-500/20',
                iconColor: 'text-blue-400',
                networks: 'All 6 Networks',
              },
              {
                icon: FileText,
                title: 'Evidence Library',
                description: 'Monitoring outputs become structured evidence records — classified by source, method, and confidence — supporting the platform\'s evidence integrity model.',
                gradient: 'from-purple-500/20 to-pink-500/20',
                iconColor: 'text-purple-400',
                networks: 'All Networks',
              },
              {
                icon: MapPin,
                title: 'District Profiles',
                description: 'Weather and seismic data provide district-level climate and hazard context, enriching local environmental profiles with quantitative indicators.',
                gradient: 'from-emerald-500/20 to-green-500/20',
                iconColor: 'text-emerald-400',
                networks: 'Weather, Seismic',
              },
              {
                icon: Database,
                title: 'Module Intelligence',
                description: 'Water quality feeds Water Systems. Wildlife data feeds Biodiversity. Glacier monitoring feeds Water Systems and Risk. Each module consumes its relevant monitoring layer.',
                gradient: 'from-sky-500/20 to-blue-500/20',
                iconColor: 'text-sky-400',
                networks: 'Water → Water Systems, Wildlife → Biodiversity, Glacier → Water + Risk',
              },
              {
                icon: Eye,
                title: 'Field Reports & Verification',
                description: 'Monitoring signals guide field investigations. Anomalous readings, alert triggers, and trend shifts prompt targeted field verification and ground-truthing.',
                gradient: 'from-amber-500/20 to-yellow-500/20',
                iconColor: 'text-amber-400',
                networks: 'All Networks (Event-Driven)',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className="glass-intense border-white/10 p-5 h-full">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4`}>
                    <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-3">{item.description}</p>
                  <div className="text-xs text-slate-500">
                    <span className="font-medium text-slate-400">Networks: </span>
                    {item.networks}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SOURCE & UPDATE NOTE ===== */}
      <section className="pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="glass-intense border-white/10 p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-500/20 to-slate-600/20 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-slate-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-3">Network Sources & Update Notes</h3>
                  <div className="space-y-3 text-sm text-slate-400 leading-relaxed">
                    <p>
                      Monitoring networks on this platform originate from multiple source types:
                    </p>
                    <ul className="list-disc list-inside space-y-1 ml-2">
                      <li><span className="text-slate-300">Institutional Networks</span> — Operated by government agencies (e.g., J&K Pollution Control Board, India Meteorological Department, National Center for Seismology) and providing continuous or scheduled data.</li>
                      <li><span className="text-slate-300">Field-Based Monitoring</span> — Deployed by wildlife departments, research institutions, and university partners through systematic field campaigns.</li>
                      <li><span className="text-slate-300">Hybrid Networks</span> — Combining institutional infrastructure with field-based observation programs and satellite-derived data.</li>
                      <li><span className="text-slate-300">Satellite-Derived Data</span> — Remote sensing products used for glacier monitoring and cryosphere analysis where direct field access is limited.</li>
                    </ul>
                    <p className="mt-3">
                      Station counts and coverage areas reflect the most recent available data. Some networks operate
                      on seasonal cycles (e.g., camera traps, glacier surveys), and counts may represent active deployment
                      periods rather than year-round coverage. Networks marked as <span className="text-amber-400">Periodic Monitoring</span> or{' '}
                      <span className="text-amber-400">Seasonal Coverage</span> should be understood as campaign-based rather than continuous.
                    </p>
                    <p>
                      Where data gaps exist — due to winter inaccessibility, remote terrain, or cloud cover — these are
                      noted in individual network detail pages. The platform is continuously expanding network coverage
                      through institutional partnerships and community-supported monitoring programs.
                    </p>
                    <div className="mt-4 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                      <div className="flex items-center gap-2">
                        <Database className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-blue-300 font-medium">
                          Summary last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </div>
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

export default MonitoringOverviewPage;
