'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Activity, ArrowRight, Map, TrendingUp, AlertTriangle,
  Layers, Eye, Heart
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const ecosystemStressSignals = [
  { signal: 'Wetland Shrinkage Acceleration', severity: 'Critical', description: '15% area loss in past 20 years, accelerating', linkedSystems: ['Water', 'Biodiversity', 'Climate'] },
  { signal: 'Forest Health Decline', severity: 'High', description: 'Oak dieback, conifer stress from warming and drought', linkedSystems: ['Forests', 'Climate', 'Biodiversity'] },
  { signal: 'Algal Bloom Frequency Increase', severity: 'High', description: 'Eutrophication accelerating in major lakes', linkedSystems: ['Water', 'Pollution', 'Climate'] },
  { signal: 'Spring Discharge Variability', severity: 'Moderate-High', description: 'Traditional spring flows becoming unpredictable', linkedSystems: ['Hydrology', 'Climate', 'Water'] },
  { signal: 'Fish Kill Event Increase', severity: 'High', description: '18% increase in fish mortality events', linkedSystems: ['Water', 'Pollution', 'Biodiversity'] },
  { signal: 'Bird Population Anomalies', severity: 'Moderate', description: 'Migratory bird count variations, timing shifts', linkedSystems: ['Biodiversity', 'Climate', 'Wetlands'] },
  { signal: 'Wildlife Mortality Increase', severity: 'High', description: '12% increase in wildlife deaths (YTD)', linkedSystems: ['Biodiversity', 'HWC', 'Infrastructure'] },
  { signal: 'Phenology Mismatch', severity: 'Moderate', description: 'Flowering-pollinator timing disruption', linkedSystems: ['Biodiversity', 'Climate', 'Agriculture'] },
];

const mortalitySignals = [
  { type: 'Aquatic Mortality', trend: 'Increasing', count: 34, change: '+18%', primaryDriver: 'Oxygen Depletion, Pollution' },
  { type: 'Bird Mortality', trend: 'Increasing', count: 56, change: '+22%', primaryDriver: 'Poisoning, Collision' },
  { type: 'Wildlife Mortality', trend: 'Increasing', count: 80, change: '+12%', primaryDriver: 'Roadkill, Conflict' },
  { type: 'Forest Mortality', trend: 'Stable-High', count: 'N/A', change: 'Ongoing', primaryDriver: 'Drought, Disease' },
];

const stressByDistrict = [
  { district: 'Srinagar', stressLevel: 'Critical', primaryStressors: ['Wetland Loss', 'Pollution', 'Urban Pressure'], mortalityEvents: 45 },
  { district: 'Ganderbal', stressLevel: 'High', primaryStressors: ['Bloom Events', 'Tourism Pressure'], mortalityEvents: 22 },
  { district: 'Anantnag', stressLevel: 'Moderate-High', primaryStressors: ['HWC', 'Hydrology Changes'], mortalityEvents: 28 },
  { district: 'Baramulla', stressLevel: 'Moderate', primaryStressors: ['Wetland Stress', 'Agricultural Runoff'], mortalityEvents: 18 },
  { district: 'Pulwama', stressLevel: 'Moderate-High', primaryStressors: ['Agricultural Stress', 'HWC'], mortalityEvents: 24 },
  { district: 'Budgam', stressLevel: 'High', primaryStressors: ['Industrial Pressure', 'Habitat Loss'], mortalityEvents: 26 },
];

export default function EcosystemStressMortalitySignalsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/50 via-amber-950/30 to-slate-950" />
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
              <span className="text-white font-medium">Ecosystem Stress & Mortality Signals</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-amber-600 flex items-center justify-center shadow-2xl">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <Badge variant="danger" size="lg">Ecosystem Health Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Ecosystem Stress <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-400">& Mortality Signals</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Cross-system ecological stress monitoring, mortality signal detection, ecosystem health assessment,
              and integrated environmental risk analysis across Kashmir's interconnected ecological systems
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-amber-600 hover:from-red-600 hover:to-amber-700 text-white shadow-xl"
                onClick={() => router.push('/risk-monitoring/dashboards')}
              >
                <Activity className="w-5 h-5 mr-2" />
                View Ecosystem Dashboard
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
              <div className="text-4xl font-bold text-red-400 mb-2">8</div>
              <div className="text-sm text-slate-400 mb-1">Critical Signals</div>
              <div className="text-xs text-red-400">Active</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-amber-400 mb-2">170</div>
              <div className="text-sm text-slate-400 mb-1">Total Mortality</div>
              <div className="text-xs text-red-400">YTD Events</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-red-400 mb-2">15%</div>
              <div className="text-sm text-slate-400 mb-1">Wetland Loss</div>
              <div className="text-xs text-red-400">20 Years</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-orange-400 mb-2">6</div>
              <div className="text-sm text-slate-400 mb-1">Districts Stressed</div>
              <div className="text-xs text-orange-400">Affected</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-sm text-slate-400 mb-1">Monitoring Status</div>
              <div className="text-xs text-emerald-400">Active</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ecosystem Stress Signals */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Ecosystem Stress Signals</h2>
            <p className="text-slate-400">Cross-system ecological stress indicators and linked systems</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecosystemStressSignals.map((signal, index) => (
              <motion.div
                key={signal.signal}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-light border-white/10 p-5">
                  <h3 className="text-xs font-bold text-white mb-2">{signal.signal}</h3>
                  <p className="text-xs text-slate-400 mb-3">{signal.description}</p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {signal.linkedSystems.map((system, sIdx) => (
                      <Badge key={sIdx} variant="outline" size="sm" className="text-xs border-blue-500/30 text-blue-400">
                        {system}
                      </Badge>
                    ))}
                  </div>
                  <Badge
                    variant={signal.severity === 'Critical' ? 'danger' : 
                             signal.severity === 'High' ? 'warning' : 'info'}
                    size="sm"
                  >
                    {signal.severity}
                  </Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mortality Signal Trends */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Mortality Signal Trends</h2>
            <p className="text-slate-400">Cross-system mortality patterns and primary drivers</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mortalitySignals.map((item, index) => (
              <motion.div
                key={item.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5">
                  <h3 className="text-sm font-bold text-white mb-2">{item.type}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className={`w-4 h-4 ${
                      item.trend === 'Increasing' ? 'text-red-400' : 'text-amber-400'
                    }`} />
                    <span className={`text-xs ${
                      item.trend === 'Increasing' ? 'text-red-400' : 'text-amber-400'
                    }`}>
                      {item.trend}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Count</span>
                      <span className="text-white">{item.count}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Change</span>
                      <span className="text-red-400">{item.change}</span>
                    </div>
                    <div className="text-xs text-slate-500 pt-2 border-t border-white/10">
                      <span className="block mb-1">Primary Driver:</span>
                      <span className="text-amber-400">{item.primaryDriver}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* District Stress Profile */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">District Ecosystem Stress Profile</h2>
            <p className="text-slate-400">Ecosystem stress levels and mortality events by district</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stressByDistrict.map((item, index) => (
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
                      <div className="text-xs text-slate-500">{item.mortalityEvents} mortality events</div>
                    </div>
                    <Badge
                      variant={item.stressLevel === 'Critical' ? 'danger' : 
                               item.stressLevel === 'High' ? 'warning' : 'info'}
                      size="sm"
                    >
                      {item.stressLevel}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-slate-400 mb-2">Primary Stressors:</div>
                    <div className="flex flex-wrap gap-1">
                      {item.primaryStressors.map((stressor, sIdx) => (
                        <Badge key={sIdx} variant="outline" size="sm" className="text-xs border-red-500/30 text-red-400">
                          {stressor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-System Integration */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Cross-System Integration</h2>
            <p className="text-slate-400">How ecosystem stress signals interconnect across Kashmir's environment</p>
          </motion.div>

          <Card className="glass-intense border-white/10 p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Heart className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-sm font-bold text-white mb-2">Aquatic Systems</h3>
                <p className="text-xs text-slate-400">
                  Wetland shrinkage → Algal blooms → Oxygen depletion → Fish kills → Bird mortality → Ecosystem collapse
                </p>
              </div>
              <div className="text-center">
                <Activity className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-sm font-bold text-white mb-2">Terrestrial Systems</h3>
                <p className="text-xs text-slate-400">
                  Forest stress → Habitat degradation → Wildlife displacement → HWC increase → Mortality rise → Biodiversity loss
                </p>
              </div>
              <div className="text-center">
                <AlertTriangle className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-sm font-bold text-white mb-2">Climate Systems</h3>
                <p className="text-xs text-slate-400">
                  Warming → Snowline rise → Glacier retreat → Flow changes → Spring variability → Ecosystem stress
                </p>
              </div>
            </div>
          </Card>
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
                  <h2 className="text-xl font-bold text-white">Ecosystem Stress Map Preview</h2>
                  <p className="text-sm text-slate-400">Cross-system stress layers and mortality hotspots</p>
                </div>
              </div>
              <div className="relative h-80 bg-gradient-to-br from-red-900/50 to-amber-900/30 rounded-xl flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <Layers className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 mb-4">Interactive ecosystem stress map with multi-system overlays</p>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-red-500 to-amber-600"
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
            <p className="text-slate-400">Cross-linked ecosystem and environmental monitoring</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              className="glass-light border-white/10 hover:border-emerald-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/biodiversity-risk-intelligence')}
            >
              <Activity className="w-8 h-8 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                Biodiversity Risk
              </h3>
              <p className="text-xs text-slate-400">
                Biodiversity stress and vulnerability
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-blue-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/water-pollution')}
            >
              <Activity className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Water Systems
              </h3>
              <p className="text-xs text-slate-400">
                Aquatic ecosystem health
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-red-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/climate-change')}
            >
              <Activity className="w-8 h-8 text-red-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                Climate Change
              </h3>
              <p className="text-xs text-slate-400">
                Climate-linked ecosystem stress
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
                Ecosystem health dashboards
              </p>
            </Card>
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
