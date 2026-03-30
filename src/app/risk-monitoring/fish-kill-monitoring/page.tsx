'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Fish, ArrowRight, Map, TrendingUp, Activity, Droplets,
  Filter, Layers, AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const fishKillEvents = [
  { id: 'fk-1', waterbody: 'Dal Lake', district: 'Srinagar', date: '2025-03-18', severity: 'High', estimatedLoss: '2,500 kg', cause: 'Oxygen Depletion' },
  { id: 'fk-2', waterbody: 'Anchar Lake', district: 'Srinagar', date: '2025-03-10', severity: 'Critical', estimatedLoss: '4,000 kg', cause: 'Pollution-Linked' },
  { id: 'fk-3', waterbody: 'Manasbal Lake', district: 'Ganderbal', date: '2025-02-28', severity: 'Moderate', estimatedLoss: '800 kg', cause: 'Algal Bloom' },
  { id: 'fk-4', waterbody: 'Jhelum River (Srinagar)', district: 'Srinagar', date: '2025-02-20', severity: 'Moderate', estimatedLoss: '600 kg', cause: 'Pollution-Linked' },
  { id: 'fk-5', waterbody: 'Wular Lake', district: 'Bandipora', date: '2025-02-15', severity: 'Low', estimatedLoss: '200 kg', cause: 'Natural' },
  { id: 'fk-6', waterbody: 'Lidder River', district: 'Anantnag', date: '2025-02-05', severity: 'Low', estimatedLoss: '150 kg', cause: 'Natural' },
];

const killCauses = [
  { cause: 'Oxygen Depletion', count: 12, percentage: '35%', linkage: 'Algal bloom, stagnation, temperature', severity: 'High' },
  { cause: 'Pollution-Linked', count: 10, percentage: '29%', linkage: 'Sewage, agricultural runoff, industrial', severity: 'Critical' },
  { cause: 'Algal Bloom', count: 7, percentage: '20%', linkage: 'Eutrophication, nutrient loading', severity: 'High' },
  { cause: 'Natural/Seasonal', count: 5, percentage: '16%', linkage: 'Temperature stress, spawning', severity: 'Low-Moderate' },
];

const districtSummary = [
  { district: 'Srinagar', totalEvents: 15, totalLoss: '8,500 kg', primaryCause: 'Pollution-Linked', trend: 'worsening' as const },
  { district: 'Ganderbal', totalEvents: 6, totalLoss: '1,800 kg', primaryCause: 'Algal Bloom', trend: 'stable' as const },
  { district: 'Anantnag', totalEvents: 4, totalLoss: '600 kg', primaryCause: 'Natural', trend: 'stable' as const },
  { district: 'Bandipora', totalEvents: 3, totalLoss: '450 kg', primaryCause: 'Natural', trend: 'stable' as const },
  { district: 'Budgam', totalEvents: 5, totalLoss: '1,200 kg', primaryCause: 'Oxygen Depletion', trend: 'worsening' as const },
];

const seasonalPattern = [
  { season: 'Winter (Dec-Feb)', risk: 'Low-Moderate', description: 'Cold stress, reduced oxygen solubility' },
  { season: 'Spring (Mar-May)', risk: 'Moderate', description: 'Temperature transition, algal growth begins' },
  { season: 'Summer (Jun-Aug)', risk: 'Critical', description: 'Peak algal bloom, oxygen depletion, pollution concentration' },
  { season: 'Autumn (Sep-Nov)', risk: 'Moderate-High', description: 'Residual bloom effects, temperature stress' },
];

export default function FishKillMonitoringPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-cyan-950/30 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <a href="/risk-monitoring" className="hover:text-white transition-colors">Risk & Monitoring</a>
              <span>/</span>
              <a href="/risk-monitoring/biodiversity-risks" className="hover:text-white transition-colors">Biodiversity Risks</a>
              <span>/</span>
              <span className="text-white font-medium">Fish Kill Monitoring</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-2xl">
                <Fish className="w-8 h-8 text-white" />
              </div>
              <Badge variant="warning" size="lg">Aquatic Mortality Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Fish Kill <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Monitoring</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Lake and river fish mortality events, oxygen depletion monitoring, pollution-linked kills,
              algal bloom linkage, seasonal mortality patterns, and aquaculture impact tracking across Kashmir waters
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-xl"
                onClick={() => router.push('/risk-monitoring/dashboards')}
              >
                <Activity className="w-5 h-5 mr-2" />
                View Fish Kill Dashboard
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                onClick={() => router.push('/risk-monitoring/biodiversity-risks')}
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Back to Biodiversity Risks
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                onClick={() => router.push('/risk-monitoring')}
              >
                Overview
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
              <div className="text-4xl font-bold text-red-400 mb-2">34</div>
              <div className="text-sm text-slate-400 mb-1">Events (YTD)</div>
              <div className="text-xs text-red-400">+18% vs last year</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-amber-400 mb-2">12.5T</div>
              <div className="text-sm text-slate-400 mb-1">Estimated Loss</div>
              <div className="text-xs text-amber-400">Total Kg</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-red-400 mb-2">10</div>
              <div className="text-sm text-slate-400 mb-1">Pollution-Linked</div>
              <div className="text-xs text-red-400">Critical</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-orange-400 mb-2">7</div>
              <div className="text-sm text-slate-400 mb-1">Algal Bloom</div>
              <div className="text-xs text-orange-400">Bloom-Linked</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">5</div>
              <div className="text-sm text-slate-400 mb-1">Districts Affected</div>
              <div className="text-xs text-slate-500">Monitored</div>
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
              Oxygen Depletion
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Pollution
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Algal Bloom
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Natural
            </Badge>
          </div>
        </div>
      </section>

      {/* District Fish Kill Summary */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">District Fish Kill Summary</h2>
            <p className="text-slate-400">Fish mortality events and economic loss by district</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {districtSummary.map((item, index) => (
              <motion.div
                key={item.district}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{item.district}</h3>
                      <div className="text-xs text-slate-500">{item.totalEvents} events</div>
                    </div>
                    <Badge variant="danger" size="sm">
                      {item.totalLoss}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Primary Cause</span>
                      <span className="text-white font-medium">{item.primaryCause}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className={`w-4 h-4 ${
                        item.trend === 'worsening' ? 'text-red-400' : 'text-slate-400'
                      }`} />
                      <span className={`text-sm ${
                        item.trend === 'worsening' ? 'text-red-400' : 'text-slate-400'
                      }`}>
                        {item.trend === 'worsening' ? 'Worsening' : 'Stable'}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Fish Kill Events */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Recent Fish Kill Events</h2>
            <p className="text-slate-400">Latest fish mortality incidents across Kashmir waterbodies</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fishKillEvents.map((record, index) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{record.waterbody}</h3>
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
                      <span className="text-slate-400">Cause</span>
                      <span className="text-red-400 font-medium">{record.cause}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Estimated Loss</span>
                      <span className="text-amber-400 font-medium">{record.estimatedLoss}</span>
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

      {/* Kill Cause Analysis */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Fish Kill Cause Analysis</h2>
            <p className="text-slate-400">Primary causes and environmental linkages</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {killCauses.map((item, index) => (
              <motion.div
                key={item.cause}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-light border-white/10 p-5">
                  <h3 className="text-sm font-bold text-white mb-2">{item.cause}</h3>
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

      {/* Seasonal Pattern */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Seasonal Fish Kill Pattern</h2>
            <p className="text-slate-400">Fish mortality risk variation across seasons in Kashmir</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasonalPattern.map((item, index) => (
              <motion.div
                key={item.season}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5">
                  <h3 className="text-sm font-bold text-white mb-2">{item.season}</h3>
                  <p className="text-xs text-slate-400 mb-3">{item.description}</p>
                  <Badge
                    variant={
                      item.risk === 'Critical' ? 'danger' :
                      item.risk === 'High' ? 'warning' :
                      item.risk === 'Moderate-High' ? 'warning' : 'info'
                    }
                    size="sm"
                  >
                    {item.risk}
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
                <Map className="w-6 h-6 text-blue-400" />
                <div>
                  <h2 className="text-xl font-bold text-white">Fish Kill Map Preview</h2>
                  <p className="text-sm text-slate-400">Waterbody fish mortality events and cause layers</p>
                </div>
              </div>
              <div className="relative h-80 bg-gradient-to-br from-blue-900/50 to-cyan-900/30 rounded-xl flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <Layers className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 mb-4">Interactive fish kill map with waterbody and cause overlays</p>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-cyan-600"
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
            <p className="text-slate-400">Cross-linked water quality and ecological monitoring</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              className="glass-light border-white/10 hover:border-emerald-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/algal-bloom-monitoring')}
            >
              <Fish className="w-8 h-8 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                Algal Bloom Monitoring
              </h3>
              <p className="text-xs text-slate-400">
                Bloom-linked fish mortality
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-blue-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/water-pollution')}
            >
              <Droplets className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Water Pollution
              </h3>
              <p className="text-xs text-slate-400">
                Pollution-linked mortality events
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-blue-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/water-systems')}
            >
              <Activity className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Water Systems
              </h3>
              <p className="text-xs text-slate-400">
                Comprehensive waterbody database
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
                Water quality dashboards
              </p>
            </Card>
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
