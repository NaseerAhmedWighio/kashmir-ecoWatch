'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Activity, ArrowRight, Map, AlertTriangle, Volume2,
  TrendingUp, Filter, Layers, Headphones
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const noiseData = [
  { id: 'np-1', location: 'Lal Chowk', district: 'Srinagar', level: 78, status: 'high' as const, source: 'Traffic & Commercial', time: 'Peak Hours' },
  { id: 'np-2', location: 'Residency Road', district: 'Srinagar', level: 72, status: 'high' as const, source: 'Traffic', time: 'Daytime Avg' },
  { id: 'np-3', location: 'Boulevard Road (Dal)', district: 'Srinagar', level: 65, status: 'moderate' as const, source: 'Tourism Traffic', time: 'Daytime Avg' },
  { id: 'np-4', location: 'Gulmarg Tourist Zone', district: 'Baramulla', level: 58, status: 'moderate' as const, source: 'Tourism Activity', time: 'Seasonal Peak' },
  { id: 'np-5', location: 'Pahalgam Valley', district: 'Anantnag', level: 52, status: 'moderate' as const, source: 'Tourism & Transport', time: 'Seasonal Peak' },
  { id: 'np-6', location: 'Dachigam Buffer Zone', district: 'Srinagar', level: 45, status: 'low' as const, source: 'Natural Ambient', time: 'Baseline' },
];

const noiseCategories = [
  { category: 'Traffic Corridors', avgLevel: '70-85 dB', impact: 'High', description: 'NH-44, NH-1, major city roads' },
  { category: 'Commercial Markets', avgLevel: '65-80 dB', impact: 'High', description: 'Lal Chowk, Residency Road, markets' },
  { category: 'Tourism Zones', avgLevel: '55-70 dB', impact: 'Moderate', description: 'Gulmarg, Pahalgam, Sonamarg' },
  { category: 'Residential Areas', avgLevel: '50-65 dB', impact: 'Moderate', description: 'Urban neighborhoods' },
  { category: 'Wildlife Habitats', avgLevel: '35-50 dB', impact: 'Low-Moderate', description: 'Protected area buffers' },
];

type TrendType = 'increasing' | 'decreasing' | 'stable';

interface DistrictSummary {
  district: string;
  avgLevel: number;
  trend: TrendType;
  hotspots: number;
  sensitiveZones: number;
}

const districtSummary: DistrictSummary[] = [
  { district: 'Srinagar', avgLevel: 68, trend: 'increasing', hotspots: 15, sensitiveZones: 8 },
  { district: 'Baramulla', avgLevel: 54, trend: 'decreasing', hotspots: 5, sensitiveZones: 4 },
  { district: 'Anantnag', avgLevel: 52, trend: 'stable', hotspots: 4, sensitiveZones: 5 },
  { district: 'Ganderbal', avgLevel: 48, trend: 'stable', hotspots: 3, sensitiveZones: 6 },
  { district: 'Budgam', avgLevel: 58, trend: 'increasing', hotspots: 6, sensitiveZones: 3 },
];

const healthImpacts = [
  { impact: 'Human Health', severity: 'High', description: 'Hearing loss, stress, sleep disturbance, cardiovascular effects' },
  { impact: 'Wildlife Disturbance', severity: 'High', description: 'Behavioral changes, habitat avoidance, breeding disruption' },
  { impact: 'Tourism Experience', severity: 'Moderate', description: 'Reduced natural ambiance, visitor satisfaction decline' },
];

export default function NoisePollutionPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-48 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/50 via-orange-950/30 to-slate-950" />
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
              <a href="/risk-monitoring/pollution-stress" className="hover:text-white transition-colors">Pollution & Stress</a>
              <span>/</span>
              <span className="text-white font-medium">Noise Pollution</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl">
                <Volume2 className="w-8 h-8 text-white" />
              </div>
              <Badge variant="warning" size="lg">Noise Level Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Noise Pollution <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Risk & Monitoring</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Urban and tourism corridor noise monitoring, traffic and commercial noise assessment,
              sensitive wildlife habitat disturbance tracking, and pilgrimage/event pressure analysis
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-xl"
                onClick={() => router.push('/risk-monitoring/dashboards')}
              >
                <Activity className="w-5 h-5 mr-2" />
                View Noise Dashboard
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                onClick={() => router.push('/risk-monitoring/pollution-stress')}
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Back to Pollution & Stress
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
              <div className="text-4xl font-bold text-red-400 mb-2">78</div>
              <div className="text-sm text-slate-400 mb-1">Peak dB (Lal Chowk)</div>
              <div className="text-xs text-red-400">Above Safe Limit</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-amber-400 mb-2">58</div>
              <div className="text-sm text-slate-400 mb-1">Avg dB (Valley)</div>
              <div className="text-xs text-amber-400">Moderate Level</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">33</div>
              <div className="text-sm text-slate-400 mb-1">Monitoring Zones</div>
              <div className="text-xs text-emerald-400">Active Sensors</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-orange-400 mb-2">33</div>
              <div className="text-sm text-slate-400 mb-1">Noise Hotspots</div>
              <div className="text-xs text-red-400">15 Critical</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-sm text-slate-400 mb-1">Monitoring Status</div>
              <div className="text-xs text-emerald-400">Real-time</div>
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
              All Zones
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Traffic
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Commercial
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Tourism
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Residential
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Wildlife
            </Badge>
          </div>
        </div>
      </section>

      {/* District Noise Summary */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">District Noise Summary</h2>
            <p className="text-slate-400">Average noise levels and sensitive zone overlap by district</p>
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
                      <div className="text-xs text-slate-500">{item.sensitiveZones} sensitive zones</div>
                    </div>
                    <Badge
                      variant={item.avgLevel > 65 ? 'danger' : item.avgLevel > 55 ? 'warning' : 'success'}
                      size="sm"
                    >
                      {item.avgLevel} dB
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className={`w-4 h-4 ${
                      item.trend === 'increasing' ? 'text-red-400' :
                      item.trend === 'decreasing' ? 'text-emerald-400' : 'text-slate-400'
                    }`} />
                    <span className={`text-sm ${
                      item.trend === 'increasing' ? 'text-red-400' :
                      item.trend === 'decreasing' ? 'text-emerald-400' : 'text-slate-400'
                    }`}>
                      {item.trend === 'increasing' ? 'Increasing' :
                       item.trend === 'decreasing' ? 'Decreasing' : 'Stable'}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">
                    {item.hotspots} noise hotspots
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Noise Level Records */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Recent Noise Level Records</h2>
            <p className="text-slate-400">Latest decibel readings across monitoring zones</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {noiseData.map((record, index) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{record.location}</h3>
                      <div className="text-xs text-slate-500">{record.district}</div>
                    </div>
                    <Badge
                      variant={
                        record.status === 'high' ? 'danger' :
                        record.status === 'moderate' ? 'warning' : 'success'
                      }
                      size="sm"
                    >
                      {record.level} dB
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Source</span>
                      <span className="text-white font-medium">{record.source}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Time</span>
                      <span className="text-white font-medium">{record.time}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Noise Categories */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Noise Categories by Zone Type</h2>
            <p className="text-slate-400">Average noise levels and impacts across different zone categories</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {noiseCategories.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-light border-white/10 p-5">
                  <h3 className="text-sm font-bold text-white mb-2">{category.category}</h3>
                  <div className="text-2xl font-bold text-amber-400 mb-2">{category.avgLevel}</div>
                  <p className="text-xs text-slate-400 mb-3">{category.description}</p>
                  <Badge
                    variant={category.impact === 'High' ? 'danger' : 'warning'}
                    size="sm"
                  >
                    {category.impact} Impact
                  </Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Health & Ecological Impacts */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Health & Ecological Impacts</h2>
            <p className="text-slate-400">Effects of noise pollution on human health and wildlife</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {healthImpacts.map((impact, index) => (
              <motion.div
                key={impact.impact}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Headphones className={`w-5 h-5 ${
                      impact.severity === 'High' ? 'text-red-400' : 'text-amber-400'
                    }`} />
                    <h3 className="text-sm font-bold text-white">{impact.impact}</h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">{impact.description}</p>
                  <Badge
                    variant={impact.severity === 'High' ? 'danger' : 'warning'}
                    size="sm"
                  >
                    {impact.severity} Severity
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
                <Map className="w-6 h-6 text-amber-400" />
                <div>
                  <h2 className="text-xl font-bold text-white">Noise Level Map Preview</h2>
                  <p className="text-sm text-slate-400">Zone-wise noise monitoring and sensitive habitat overlap</p>
                </div>
              </div>
              <div className="relative h-80 bg-gradient-to-br from-amber-900/50 to-orange-900/30 rounded-xl flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <Layers className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 mb-4">Interactive noise map with zone boundaries and monitoring points</p>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-amber-500 to-orange-600"
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
            <p className="text-slate-400">Cross-linked environmental monitoring systems</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              className="glass-light border-white/10 hover:border-gray-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/air-pollution')}
            >
              <Activity className="w-8 h-8 text-gray-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-gray-400 transition-colors">
                Air Pollution
              </h3>
              <p className="text-xs text-slate-400">
                Urban air quality and transport corridors
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-emerald-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/biodiversity-risk-intelligence')}
            >
              <Activity className="w-8 h-8 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                Biodiversity Risk
              </h3>
              <p className="text-xs text-slate-400">
                Wildlife habitat disturbance monitoring
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-blue-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/seasonal-ecology')}
            >
              <Activity className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Seasonal Ecology
              </h3>
              <p className="text-xs text-slate-400">
                Tourism season pressure patterns
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
                Environmental quality dashboards
              </p>
            </Card>
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
