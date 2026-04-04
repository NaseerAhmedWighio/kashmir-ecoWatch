'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Target, ArrowRight, Map, TrendingUp, Activity, AlertTriangle,
  Filter, Layers, Eye
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const mortalityRecords = [
  { id: 'wm-1', species: 'Leopard', district: 'Pulwama', cause: 'Roadkill', location: 'NH-44 Corridor', date: '2025-03-15', severity: 'High' },
  { id: 'wm-2', species: 'Black Bear', district: 'Anantnag', cause: 'Electrocution', location: 'Orchard Area', date: '2025-03-10', severity: 'High' },
  { id: 'wm-3', species: 'Leopard', district: 'Srinagar', cause: 'Conflict-Linked', location: 'Settlement Edge', date: '2025-03-05', severity: 'Critical' },
  { id: 'wm-4', species: 'Wild Boar', district: 'Budgam', cause: 'Roadkill', location: 'Srinagar-Baramulla Road', date: '2025-02-28', severity: 'Moderate' },
  { id: 'wm-5', species: 'Musk Deer', district: 'Ganderbal', cause: 'Poaching', location: 'Forest Zone', date: '2025-02-20', severity: 'Critical' },
  { id: 'wm-6', species: 'Himalayan Wolf', district: 'Kupwara', cause: 'Retaliatory Killing', location: 'High Altitude', date: '2025-02-15', severity: 'Critical' },
];

const mortalityCauses = [
  { cause: 'Roadkill', count: 28, percentage: '35%', trend: 'increasing' as const, primarySpecies: 'Leopard, Wild Boar, Porcupine' },
  { cause: 'Electrocution', count: 15, percentage: '19%', trend: 'stable' as const, primarySpecies: 'Black Bear, Leopard' },
  { cause: 'Poaching', count: 12, percentage: '15%', trend: 'declining' as const, primarySpecies: 'Musk Deer, Hangul' },
  { cause: 'Retaliatory Killing', count: 10, percentage: '13%', trend: 'stable' as const, primarySpecies: 'Leopard, Wolf' },
  { cause: 'Conflict-Linked Deaths', count: 8, percentage: '10%', trend: 'increasing' as const, primarySpecies: 'Leopard, Black Bear' },
  { cause: 'Natural/Habitat-Linked', count: 7, percentage: '8%', trend: 'stable' as const, primarySpecies: 'Various' },
];

const districtMortalityProfile = [
  { district: 'Srinagar', totalDeaths: 18, primaryCause: 'Roadkill', trend: 'increasing' as const, criticalSpecies: 3 },
  { district: 'Anantnag', totalDeaths: 15, primaryCause: 'Electrocution', trend: 'stable' as const, criticalSpecies: 2 },
  { district: 'Pulwama', totalDeaths: 14, primaryCause: 'Roadkill', trend: 'increasing' as const, criticalSpecies: 2 },
  { district: 'Baramulla', totalDeaths: 12, primaryCause: 'Roadkill', trend: 'stable' as const, criticalSpecies: 1 },
  { district: 'Ganderbal', totalDeaths: 10, primaryCause: 'Poaching', trend: 'declining' as const, criticalSpecies: 2 },
  { district: 'Kupwara', totalDeaths: 11, primaryCause: 'Retaliatory Killing', trend: 'stable' as const, criticalSpecies: 1 },
];

export default function WildlifeMortalityKillRecordsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">{/* Hero Section */}
      <section className="relative pt-48 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/50 via-orange-950/30 to-slate-950" />
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
              <span className="text-white font-medium">Wildlife Mortality / Kill Records</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-2xl">
                <Target className="w-8 h-8 text-white" />
              </div>
              <Badge variant="danger" size="lg">Mortality Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Wildlife Mortality <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">/ Kill Records</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Roadkill, poaching, electrocution, habitat-linked mortality, conflict-linked deaths,
              and protected area/corridor-linked incident monitoring across Kashmir landscapes
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
              <div className="text-4xl font-bold text-red-400 mb-2">80</div>
              <div className="text-sm text-slate-400 mb-1">Total Deaths (YTD)</div>
              <div className="text-xs text-red-400">+12% vs last year</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-orange-400 mb-2">28</div>
              <div className="text-sm text-slate-400 mb-1">Roadkill Deaths</div>
              <div className="text-xs text-orange-400">35% of Total</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-red-400 mb-2">12</div>
              <div className="text-sm text-slate-400 mb-1">Poaching Cases</div>
              <div className="text-xs text-red-400">Critical</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-amber-400 mb-2">11</div>
              <div className="text-sm text-slate-400 mb-1">Critical Species</div>
              <div className="text-xs text-amber-400">Affected</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">6</div>
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
              Roadkill
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Electrocution
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Poaching
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Conflict-Linked
            </Badge>
          </div>
        </div>
      </section>

      {/* District Mortality Profiles */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">District Mortality Profiles</h2>
            <p className="text-slate-400">Wildlife mortality records and trends by district</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {districtMortalityProfile.map((item, index) => (
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
                      <div className="text-xs text-slate-500">{item.criticalSpecies} critical species</div>
                    </div>
                    <Badge variant="danger" size="sm">
                      {item.totalDeaths} deaths
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Primary Cause</span>
                      <span className="text-white font-medium">{item.primaryCause}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className={`w-4 h-4 ${
                        item.trend === 'increasing' ? 'text-red-400' : 'text-slate-400'
                      }`} />
                      <span className={`text-sm ${
                        item.trend === 'increasing' ? 'text-red-400' : 'text-slate-400'
                      }`}>
                        {item.trend === 'increasing' ? 'Increasing' : 'Stable'}
                      </span>
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
            <h2 className="text-2xl font-bold text-white mb-2">Recent Mortality Records</h2>
            <p className="text-slate-400">Latest wildlife mortality incidents across Kashmir</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mortalityRecords.map((record, index) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{record.species}</h3>
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
                      <span className="text-slate-400">Location</span>
                      <span className="text-white font-medium">{record.location}</span>
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

      {/* Mortality Causes Analysis */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Mortality Cause Analysis</h2>
            <p className="text-slate-400">Breakdown of wildlife mortality by cause and affected species</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mortalityCauses.map((item, index) => (
              <motion.div
                key={item.cause}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-light border-white/10 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-sm font-bold text-white">{item.cause}</h3>
                    <Badge variant="danger" size="sm">{item.count}</Badge>
                  </div>
                  <div className="text-2xl font-bold text-red-400 mb-2">{item.percentage}</div>
                  <p className="text-xs text-slate-400 mb-3">{item.primarySpecies}</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className={`w-4 h-4 ${
                      item.trend === 'increasing' ? 'text-red-400' :
                      item.trend === 'declining' ? 'text-emerald-400' : 'text-slate-400'
                    }`} />
                    <span className={`text-xs ${
                      item.trend === 'increasing' ? 'text-red-400' :
                      item.trend === 'declining' ? 'text-emerald-400' : 'text-slate-400'
                    }`}>
                      {item.trend === 'increasing' ? 'Increasing' :
                       item.trend === 'declining' ? 'Declining' : 'Stable'}
                    </span>
                  </div>
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
                  <h2 className="text-xl font-bold text-white">Mortality Map Preview</h2>
                  <p className="text-sm text-slate-400">Mortality hotspots, roadkill corridors, and protected area incidents</p>
                </div>
              </div>
              <div className="relative h-80 bg-gradient-to-br from-red-900/50 to-orange-900/30 rounded-xl flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <Layers className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 mb-4">Interactive mortality map with incident locations and cause layers</p>
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
            <p className="text-slate-400">Cross-linked mortality and biodiversity monitoring</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              className="glass-light border-white/10 hover:border-amber-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/human-wildlife-conflict')}
            >
              <AlertTriangle className="w-8 h-8 text-amber-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                Human-Wildlife Conflict
              </h3>
              <p className="text-xs text-slate-400">
                Conflict-linked mortality tracking
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-emerald-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/biodiversity-risk-intelligence')}
            >
              <Target className="w-8 h-8 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                Biodiversity Risk
              </h3>
              <p className="text-xs text-slate-400">
                Species vulnerability and mortality risk
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-green-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/protected-areas')}
            >
              <Activity className="w-8 h-8 text-green-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                Protected Areas
              </h3>
              <p className="text-xs text-slate-400">
                Protected area mortality incidents
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
                Mortality monitoring dashboards
              </p>
            </Card>
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
