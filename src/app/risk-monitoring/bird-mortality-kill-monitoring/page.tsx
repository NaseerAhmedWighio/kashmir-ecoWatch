'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Bird, ArrowRight, Map, TrendingUp, Activity, AlertTriangle,
  Filter, Layers, Target
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const birdMortalityRecords = [
  { id: 'bm-1', wetland: 'Hokersar', district: 'Srinagar', species: 'Common Teal', count: 45, cause: 'Poisoning', date: '2025-03-12', severity: 'Critical' },
  { id: 'bm-2', wetland: 'Dal Lake', district: 'Srinagar', species: 'Various Waterfowl', count: 28, cause: 'Contamination', date: '2025-03-05', severity: 'High' },
  { id: 'bm-3', wetland: 'Wular Lake', district: 'Bandipora', species: 'Northern Pintail', count: 18, cause: 'Collision', date: '2025-02-28', severity: 'Moderate' },
  { id: 'bm-4', wetland: 'Manasbal Lake', district: 'Ganderbal', species: 'Common Pochard', count: 12, cause: 'Disease', date: '2025-02-20', severity: 'Moderate' },
  { id: 'bm-5', wetland: 'Hygam', district: 'Baramulla', species: 'Mallard', count: 8, cause: 'Habitat Pressure', date: '2025-02-15', severity: 'Low' },
];

const mortalityCauses = [
  { cause: 'Poisoning/Contamination', count: 18, percentage: '32%', linkage: 'Pesticide runoff, deliberate poisoning', severity: 'Critical' },
  { cause: 'Collision', count: 15, percentage: '27%', linkage: 'Power lines, structures, vehicles', severity: 'High' },
  { cause: 'Disease Outbreak', count: 12, percentage: '21%', linkage: 'Avian diseases, crowded conditions', severity: 'High' },
  { cause: 'Habitat Pressure', count: 8, percentage: '14%', linkage: 'Wetland degradation, disturbance', severity: 'Moderate' },
  { cause: 'Natural/Unknown', count: 3, percentage: '6%', linkage: 'Natural mortality, undetermined', severity: 'Low' },
];

const wetlandRiskProfile = [
  { wetland: 'Hokersar', district: 'Srinagar', totalDeaths: 52, primaryCause: 'Poisoning', riskLevel: 'Critical' },
  { wetland: 'Dal Lake', district: 'Srinagar', totalDeaths: 38, primaryCause: 'Contamination', riskLevel: 'High' },
  { wetland: 'Wular Lake', district: 'Bandipora', totalDeaths: 25, primaryCause: 'Collision', riskLevel: 'Moderate' },
  { wetland: 'Manasbal Lake', district: 'Ganderbal', totalDeaths: 18, primaryCause: 'Disease', riskLevel: 'Moderate' },
  { wetland: 'Hygam', district: 'Baramulla', totalDeaths: 15, primaryCause: 'Habitat Pressure', riskLevel: 'Moderate' },
  { wetland: 'Shallabugh', district: 'Ganderbal', totalDeaths: 12, primaryCause: 'Contamination', riskLevel: 'Low-Moderate' },
];

export default function BirdMortalityKillMonitoringPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/50 via-orange-950/30 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-2xl">
                <Bird className="w-8 h-8 text-white" />
              </div>
              <Badge variant="danger" size="lg">Avian Mortality Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Bird Mortality <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">/ Kill Monitoring</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Wetland bird mortality tracking, collision and habitat pressure deaths,
              poisoning/contamination events, disease clusters, and seasonal bird kill anomaly detection
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white shadow-xl"
                onClick={() => router.push('/risk-monitoring/dashboards')}
              >
                <Activity className="w-5 h-5 mr-2" />
                View Mortality Dashboard
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                onClick={() => router.push('/risk-monitoring')}
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Back to Risk Monitoring
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Ribbon */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-red-400 mb-2">56</div>
              <div className="text-sm text-slate-400 mb-1">Deaths (YTD)</div>
              <div className="text-xs text-red-400">+22% vs last year</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-red-400 mb-2">18</div>
              <div className="text-sm text-slate-400 mb-1">Poisoning Cases</div>
              <div className="text-xs text-red-400">Critical</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-orange-400 mb-2">15</div>
              <div className="text-sm text-slate-400 mb-1">Collision Deaths</div>
              <div className="text-xs text-orange-400">27% of Total</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-amber-400 mb-2">6</div>
              <div className="text-sm text-slate-400 mb-1">Wetlands Affected</div>
              <div className="text-xs text-amber-400">Monitored</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">3</div>
              <div className="text-sm text-slate-400 mb-1">Disease Clusters</div>
              <div className="text-xs text-red-400">Active</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter Row */}
      <section className="py-8 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              <Filter className="w-3 h-3 mr-2" />
              All Causes
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Poisoning
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Collision
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Disease
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Habitat Pressure
            </Badge>
          </div>
        </div>
      </section>

      {/* Wetland Risk Profiles */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Wetland Bird Mortality Risk Profiles</h2>
            <p className="text-slate-400">Bird mortality records and risk levels by wetland</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wetlandRiskProfile.map((item, index) => (
              <motion.div
                key={item.wetland}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{item.wetland}</h3>
                      <div className="text-xs text-slate-500">{item.district}</div>
                    </div>
                    <Badge
                      variant={item.riskLevel === 'Critical' ? 'danger' : 
                               item.riskLevel === 'High' ? 'warning' : 'info'}
                      size="sm"
                    >
                      {item.riskLevel}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Total Deaths</span>
                      <span className="text-red-400 font-medium">{item.totalDeaths}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Primary Cause</span>
                      <span className="text-white font-medium">{item.primaryCause}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Mortality Records */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Recent Bird Mortality Records</h2>
            <p className="text-slate-400">Latest bird mortality incidents across Kashmir wetlands</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {birdMortalityRecords.map((record, index) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{record.wetland}</h3>
                      <div className="text-xs text-slate-500">{record.district}</div>
                    </div>
                    <Badge
                      variant={record.severity === 'Critical' ? 'danger' : 
                               record.severity === 'High' ? 'warning' : 'info'}
                      size="sm"
                    >
                      {record.severity}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Species</span>
                      <span className="text-white font-medium">{record.species}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Cause</span>
                      <span className="text-red-400 font-medium">{record.cause}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Count</span>
                      <span className="text-amber-400 font-medium">{record.count}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Date</span>
                      <span className="text-slate-400">{record.date}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mortality Cause Analysis */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Mortality Cause Analysis</h2>
            <p className="text-slate-400">Primary causes and environmental linkages</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {mortalityCauses.map((item, index) => (
              <motion.div
                key={item.cause}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-light border-white/10 p-5">
                  <h3 className="text-xs font-bold text-white mb-2">{item.cause}</h3>
                  <div className="text-2xl font-bold text-red-400 mb-2">{item.percentage}</div>
                  <p className="text-xs text-slate-400 mb-3">{item.linkage}</p>
                  <Badge
                    variant={item.severity === 'Critical' ? 'danger' : 
                             item.severity === 'High' ? 'warning' : 'info'}
                    size="sm"
                  >
                    {item.severity}
                  </Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Preview Panel */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Map className="w-6 h-6 text-red-400" />
                <div>
                  <h2 className="text-xl font-bold text-white">Bird Mortality Map Preview</h2>
                  <p className="text-sm text-slate-400">Wetland mortality hotspots and cause layers</p>
                </div>
              </div>
              <div className="relative h-80 bg-gradient-to-br from-red-900/50 to-orange-900/30 rounded-xl flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <Layers className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 mb-4">Interactive bird mortality map with wetland and cause overlays</p>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-red-500 to-orange-600"
                    onClick={() => router.push('/risk-monitoring/dashboards')}
                  >
                    <Map className="w-5 h-5 mr-2" />
                    Open Full Map
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Related Intelligence */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Related Intelligence</h2>
            <p className="text-slate-400">Cross-linked bird and wetland monitoring</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              className="glass-light border-white/10 hover:border-blue-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/bird-migration-monitoring')}
            >
              <Bird className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Bird Migration Monitoring
              </h3>
              <p className="text-xs text-slate-400">
                Migration patterns and wetland use
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-blue-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/water-pollution')}
            >
              <AlertTriangle className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Water Pollution
              </h3>
              <p className="text-xs text-slate-400">
                Contamination-linked mortality
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-emerald-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/seasonal-ecology')}
            >
              <Activity className="w-8 h-8 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                Seasonal Ecology
              </h3>
              <p className="text-xs text-slate-400">
                Seasonal mortality patterns
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-blue-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/dashboards')}
            >
              <Activity className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Risk Dashboards
              </h3>
              <p className="text-xs text-slate-400">
                Bird mortality dashboards
              </p>
            </Card>
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
