'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft, MapPin, Activity, BarChart3, Shield, ExternalLink, 
  Share2, Bookmark, Info, Clock, Database, AlertTriangle,
  TrendingUp, Layers, Zap
} from 'lucide-react';
import {
  monitoringRegistry, getNetworkById, statusDisplayLabels, statusColors,
  categoryLabels, categoryGradients, cadenceLabels, sourceLabels, dataAvailabilityLabels
} from '@/data/monitoring-registry';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

export default function MonitoringDetailPage() {
  const params = useParams();
  const router = useRouter();
  const networkId = params.id as string;

  const network = getNetworkById(networkId);

  if (!network) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <Activity className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Monitoring Network Not Found</h1>
          <p className="text-slate-400 mb-6">The monitoring network you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => router.push('/monitoring-overview')} icon={<ArrowLeft className="w-5 h-5" />}>
            Back to Monitoring Overview
          </Button>
        </div>
      </main>
    );
  }

  const statusColor = statusColors[network.status];
  const gradient = categoryGradients[network.category];

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Sticky Navigation Bar */}
      <section className="border-b border-white/5 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.push('/monitoring-overview')}
              icon={<ArrowLeft className="w-5 h-5" />}
              className="text-slate-400 hover:text-white"
            >
              Back to Monitoring Overview
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                icon={<Share2 className="w-4 h-4" />}
                className="text-slate-400 hover:text-white"
              >
                Share
              </Button>
              <Button
                variant="ghost"
                size="sm"
                icon={<Bookmark className="w-4 h-4" />}
                className="text-slate-400 hover:text-white"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/30 via-green-950/20 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl"
          >
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className={cn("px-3 py-1 rounded-full text-sm font-medium border", statusColor)}>
                {statusDisplayLabels[network.status]}
              </span>
              <Badge variant="outline" size="lg">
                {categoryLabels[network.category]}
              </Badge>
              <Badge variant="secondary" size="sm">
                {cadenceLabels[network.cadence]}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              {network.name}
            </h1>

            {/* Meta Information */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <BarChart3 className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-500 mb-1">Stations / Nodes</div>
                  <div className="text-2xl font-bold text-white">{network.stationCount}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-500 mb-1">Coverage</div>
                  <div className="text-sm text-white font-medium">{network.coverage}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-500 mb-1">Update Cadence</div>
                  <div className="text-sm text-white font-medium">{cadenceLabels[network.cadence]}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Database className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-500 mb-1">Data Availability</div>
                  <div className="text-sm text-white font-medium">{dataAvailabilityLabels[network.dataAvailability]}</div>
                </div>
              </div>
            </div>

            {/* Operator & Source */}
            <div className="flex items-center gap-4 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                {sourceLabels[network.source]}
              </span>
              <span className="text-slate-600">•</span>
              <span>Operated by: {network.operatedBy}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Network Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="glass-intense border-white/10 p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    Network Overview
                  </h2>
                  <p className="text-slate-300 leading-relaxed mb-4">{network.description}</p>
                  <div className="pt-4 border-t border-white/5">
                    <h3 className="text-sm font-semibold text-white mb-2">What Is Monitored</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{network.whatIsMonitored}</p>
                  </div>
                </Card>
              </motion.div>

              {/* Parameters Tracked */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="glass-intense border-white/10 p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Parameters Tracked
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {network.parametersTracked.map((param, i) => (
                      <Badge key={i} variant="secondary" size="sm" className="text-xs">
                        {param}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Coverage Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="glass-intense border-white/10 p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Spatial Coverage
                  </h2>
                  <div className="space-y-4">
                    {network.coverageDetails.districts && network.coverageDetails.districts.length > 0 && (
                      <div>
                        <div className="text-xs text-slate-500 mb-2">Districts Covered</div>
                        <div className="flex flex-wrap gap-2">
                          {network.coverageDetails.districts.map((district, i) => (
                            <a
                              key={i}
                              href={`/districts/${district.toLowerCase()}`}
                              className="px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 border border-purple-500/20 transition-colors"
                            >
                              {district}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                    {network.coverageDetails.basins && network.coverageDetails.basins.length > 0 && (
                      <div>
                        <div className="text-xs text-slate-500 mb-2">Basins Covered</div>
                        <div className="flex flex-wrap gap-2">
                          {network.coverageDetails.basins.map((basin, i) => (
                            <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                              {basin}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {network.coverageDetails.protectedAreas && network.coverageDetails.protectedAreas.length > 0 && (
                      <div>
                        <div className="text-xs text-slate-500 mb-2">Protected Areas</div>
                        <div className="flex flex-wrap gap-2">
                          {network.coverageDetails.protectedAreas.map((pa, i) => (
                            <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              {pa}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {network.coverageDetails.altitudeRange && (
                      <div>
                        <div className="text-xs text-slate-500 mb-2">Altitude Range</div>
                        <div className="text-sm text-white">{network.coverageDetails.altitudeRange}</div>
                      </div>
                    )}
                    {network.coverageDetails.urbanCoverage && (
                      <div>
                        <div className="text-xs text-slate-500 mb-2">Urban Coverage</div>
                        <div className="text-sm text-white">{network.coverageDetails.urbanCoverage}</div>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>

              {/* Alerts Generated */}
              {network.generatesAlerts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="glass-intense border-white/10 p-6">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Alert Generation
                    </h2>
                    <div className="space-y-3">
                      {network.generatesAlerts.map((alert, i) => (
                        <div key={i} className="p-4 rounded-lg bg-slate-800/50 border border-white/5">
                          <div className="flex items-start justify-between mb-2">
                            <div className="font-semibold text-white">{alert.type}</div>
                            <Badge variant={alert.severity === 'critical' || alert.severity === 'high' ? 'danger' : alert.severity === 'moderate' ? 'warning' : 'info'} size="sm">
                              {alert.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-400">{alert.description}</p>
                        </div>
                      ))}
                    </div>
                    <a
                      href="/alerts"
                      className="mt-4 flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Live Alerts
                    </a>
                  </Card>
                </motion.div>
              )}

              {/* Limitations */}
              {network.limitations && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card className="glass-intense border-amber-500/20 bg-amber-500/5 p-6">
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <Info className="w-5 h-5" />
                      Coverage Limitations
                    </h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{network.limitations}</p>
                  </Card>
                </motion.div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Network Classification */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="glass-intense border-white/10 p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Network Classification</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Status</div>
                      <span className={cn("px-2 py-1 rounded text-sm font-medium border", statusColor)}>
                        {statusDisplayLabels[network.status]}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Monitoring Cadence</div>
                      <div className="text-sm text-white font-medium">{cadenceLabels[network.cadence]}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Source Type</div>
                      <div className="text-sm text-white font-medium">{sourceLabels[network.source]}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Data Availability</div>
                      <div className="text-sm text-white font-medium">{dataAvailabilityLabels[network.dataAvailability]}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Module Links */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="glass-intense border-white/10 p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Layers className="w-5 h-5" />
                    Feeds Platform Modules
                  </h3>
                  <div className="space-y-3">
                    {network.feedsModules.map((module, i) => (
                      <a
                        key={i}
                        href={module.modulePath}
                        className="block p-4 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 transition-colors"
                      >
                        <div className="text-sm font-semibold text-indigo-400 mb-1">{module.moduleName}</div>
                        <div className="text-xs text-slate-400">{module.contributionType}</div>
                      </a>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Dashboard Links */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="glass-intense border-white/10 p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Linked Dashboards
                  </h3>
                  <div className="space-y-3">
                    {network.feedsDashboards.map((dashboard, i) => (
                      <a
                        key={i}
                        href={dashboard.path}
                        className="block p-4 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/20 transition-colors"
                      >
                        <div className="text-sm font-semibold text-emerald-400 mb-1">{dashboard.name}</div>
                        <div className="text-xs text-slate-400">{dashboard.description}</div>
                      </a>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Data & Quality */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="glass-intense border-white/10 p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5" />
                    Data & Quality
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Historical Data From</div>
                      <div className="text-sm text-white font-medium">{network.historicalDataFrom}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Quality Assurance</div>
                      <div className="text-sm text-slate-300">{network.qualityAssurance}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Last Updated</div>
                      <div className="text-sm text-white font-medium">
                        {new Date(network.lastUpdated).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Operator */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="glass-intense border-white/10 p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Network Operator
                  </h3>
                  <div className="text-sm text-white font-medium mb-2">{network.operatedBy}</div>
                  <div className="text-xs text-slate-400">{sourceLabels[network.source]}</div>
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Network operations follow institutional standards with platform review and validation.
                    </p>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
