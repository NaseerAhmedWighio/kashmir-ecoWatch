'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Droplets, ArrowRight, Map, AlertTriangle, Activity, Waves,
  TrendingUp, Filter, Layers, Droplet
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const waterQualityData = [
  { id: 'wq-1', waterbody: 'Dal Lake', type: 'Lake', district: 'Srinagar', wqi: 62, status: 'fair' as const, trophicState: 'Eutrophic', primaryConcern: 'Nutrient Loading' },
  { id: 'wq-2', waterbody: 'Wular Lake', type: 'Lake', district: 'Bandipora', wqi: 71, status: 'good' as const, trophicState: 'Mesotrophic', primaryConcern: 'Sedimentation' },
  { id: 'wq-3', waterbody: 'Manasbal Lake', type: 'Lake', district: 'Ganderbal', wqi: 58, status: 'fair' as const, trophicState: 'Eutrophic', primaryConcern: 'Algal Bloom Risk' },
  { id: 'wq-4', waterbody: 'Anchar Lake', type: 'Lake', district: 'Srinagar', wqi: 45, status: 'poor' as const, trophicState: 'Hypereutrophic', primaryConcern: 'Sewage Inflow' },
  { id: 'wq-5', waterbody: 'Hokersar Wetland', type: 'Wetland', district: 'Srinagar', wqi: 54, status: 'fair' as const, trophicState: 'Eutrophic', primaryConcern: 'Agricultural Runoff' },
  { id: 'wq-6', waterbody: 'Jhelum River (Srinagar)', type: 'River', district: 'Srinagar', wqi: 68, status: 'fair' as const, trophicState: 'N/A', primaryConcern: 'Urban Discharge' },
  { id: 'wq-7', waterbody: 'Lidder River', type: 'River', district: 'Anantnag', wqi: 82, status: 'good' as const, trophicState: 'N/A', primaryConcern: 'Low' },
  { id: 'wq-8', waterbody: 'Spring - Kokernag', type: 'Spring', district: 'Anantnag', wqi: 88, status: 'excellent' as const, trophicState: 'N/A', primaryConcern: 'Low' },
];

const pollutionTypes = [
  { type: 'Sewage & Wastewater', impact: 'High', description: 'Untreated domestic sewage inflow' },
  { type: 'Agricultural Runoff', impact: 'High', description: 'Fertilizers, pesticides, sediments' },
  { type: 'Solid Waste Dumping', impact: 'Moderate', description: 'Lakeshore and wetland edge dumping' },
  { type: 'Religious Offerings', impact: 'Moderate', description: 'Idols, flowers, non-biodegradable materials' },
  { type: 'Tourism Pressure', impact: 'Moderate', description: 'Houseboat waste, tourist activity' },
];

const lakeHealthStatus = [
  { lake: 'Dal Lake', area: '18 km²', degradation: '45% loss since 1911', encroachment: 'High', conservationStatus: 'Critical' },
  { lake: 'Wular Lake', area: '189 km²', degradation: '30% loss since 1911', encroachment: 'Moderate', conservationStatus: 'Vulnerable' },
  { lake: 'Manasbal Lake', area: '2.8 km²', degradation: '25% loss since 1911', encroachment: 'Moderate', conservationStatus: 'Vulnerable' },
  { lake: 'Anchar Lake', area: '8 km²', degradation: '60% loss since 1911', encroachment: 'Critical', conservationStatus: 'Critical' },
];

const districtSummary = [
  { district: 'Srinagar', waterbodies: 12, avgWQI: 58, trend: 'declining' as const, criticalSites: 4 },
  { district: 'Ganderbal', waterbodies: 8, avgWQI: 72, trend: 'stable' as const, criticalSites: 1 },
  { district: 'Anantnag', waterbodies: 15, avgWQI: 78, trend: 'stable' as const, criticalSites: 2 },
  { district: 'Bandipora', waterbodies: 6, avgWQI: 69, trend: 'stable' as const, criticalSites: 1 },
  { district: 'Budgam', waterbodies: 9, avgWQI: 64, trend: 'declining' as const, criticalSites: 2 },
];

export default function WaterPollutionPage() {
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
              <a href="/risk-monitoring/pollution-stress" className="hover:text-white transition-colors">Pollution & Stress</a>
              <span>/</span>
              <span className="text-white font-medium">Water Pollution</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-2xl">
                <Droplets className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Water Quality Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Water Pollution <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Risk & Monitoring</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Lake eutrophication, sewage and runoff indicators, river and stream contamination,
              spring contamination signals, and wetland degradation monitoring across Kashmir
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-xl"
                onClick={() => router.push('/risk-monitoring/dashboards')}
              >
                <Activity className="w-5 h-5 mr-2" />
                View Water Dashboard
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
              <div className="text-4xl font-bold text-blue-400 mb-2">50</div>
              <div className="text-sm text-slate-400 mb-1">Waterbodies Monitored</div>
              <div className="text-xs text-slate-500">Lakes, Rivers, Springs</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-amber-400 mb-2">67</div>
              <div className="text-sm text-slate-400 mb-1">Avg WQI (Valley)</div>
              <div className="text-xs text-amber-400">Fair Condition</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-red-400 mb-2">8</div>
              <div className="text-sm text-slate-400 mb-1">Critical Sites</div>
              <div className="text-xs text-red-400">Immediate Action</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-orange-400 mb-2">4</div>
              <div className="text-sm text-slate-400 mb-1">Eutrophic Lakes</div>
              <div className="text-xs text-orange-400">Algal Bloom Risk</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-emerald-400 mb-2">24/7</div>
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
              All Types
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Lakes
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Rivers
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Wetlands
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Springs
            </Badge>
          </div>
        </div>
      </section>

      {/* District Water Quality Summary */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">District Water Quality Summary</h2>
            <p className="text-slate-400">Average WQI and trend analysis by district</p>
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
                      <div className="text-xs text-slate-500">{item.waterbodies} waterbodies</div>
                    </div>
                    <Badge
                      variant={item.avgWQI >= 80 ? 'success' : item.avgWQI >= 60 ? 'warning' : 'danger'}
                      size="sm"
                    >
                      WQI {item.avgWQI}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className={`w-4 h-4 ${
                      item.trend === 'declining' ? 'text-red-400' : 'text-slate-400'
                    }`} />
                    <span className={`text-sm ${
                      item.trend === 'declining' ? 'text-red-400' : 'text-slate-400'
                    }`}>
                      {item.trend === 'declining' ? 'Declining' : 'Stable'}
                    </span>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">
                    {item.criticalSites} critical sites
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Water Quality Records */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Recent Water Quality Records</h2>
            <p className="text-slate-400">Latest water quality index readings across Kashmir waterbodies</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {waterQualityData.map((record, index) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-sm font-bold text-white">{record.waterbody}</h3>
                      <div className="text-xs text-slate-500">{record.district}</div>
                    </div>
                    <Badge
                      variant={
                        record.status === 'excellent' ? 'success' :
                        record.status === 'good' ? 'success' :
                        record.status === 'fair' ? 'warning' : 'danger'
                      }
                      size="sm"
                    >
                      WQI {record.wqi}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-400 mb-2">{record.type}</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Trophic</span>
                      <span className="text-white">{record.trophicState}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Concern</span>
                      <span className="text-amber-400">{record.primaryConcern}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lake Health Status */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Major Lake Health Status</h2>
            <p className="text-slate-400">Historical degradation and conservation status of Kashmir's major lakes</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {lakeHealthStatus.map((lake, index) => (
              <motion.div
                key={lake.lake}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-light border-white/10 p-5">
                  <h3 className="text-sm font-bold text-white mb-2">{lake.lake}</h3>
                  <div className="text-xs text-slate-400 mb-3">Area: {lake.area}</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Degradation</span>
                      <span className="text-red-400">{lake.degradation}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Encroachment</span>
                      <span className={lake.encroachment === 'Critical' ? 'text-red-400' : 'text-amber-400'}>
                        {lake.encroachment}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Status</span>
                      <Badge
                        variant={lake.conservationStatus === 'Critical' ? 'danger' : 'warning'}
                        size="sm"
                      >
                        {lake.conservationStatus}
                      </Badge>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pollution Types */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Water Pollution Sources</h2>
            <p className="text-slate-400">Primary contamination sources affecting Kashmir waterbodies</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {pollutionTypes.map((item, index) => (
              <motion.div
                key={item.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Droplet className={`w-5 h-5 ${
                      item.impact === 'High' ? 'text-red-400' : 'text-amber-400'
                    }`} />
                    <h3 className="text-sm font-bold text-white">{item.type}</h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">{item.description}</p>
                  <Badge
                    variant={item.impact === 'High' ? 'danger' : 'warning'}
                    size="sm"
                  >
                    {item.impact} Impact
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
                  <h2 className="text-xl font-bold text-white">Water Quality Map Preview</h2>
                  <p className="text-sm text-slate-400">Waterbody locations, WQI layers, and contamination hotspots</p>
                </div>
              </div>
              <div className="relative h-80 bg-gradient-to-br from-blue-900/50 to-cyan-900/30 rounded-xl flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <Layers className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 mb-4">Interactive water quality map with lake boundaries and monitoring points</p>
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
            <p className="text-slate-400">Cross-linked environmental monitoring systems</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              className="glass-light border-white/10 hover:border-emerald-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/algal-bloom-monitoring')}
            >
              <Waves className="w-8 h-8 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                Algal Bloom Monitoring
              </h3>
              <p className="text-xs text-slate-400">
                Eutrophication and bloom alerts
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-blue-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/fish-kill-monitoring')}
            >
              <Droplets className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Fish Kill Monitoring
              </h3>
              <p className="text-xs text-slate-400">
                Water quality linked mortality events
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-amber-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/water-systems')}
            >
              <Waves className="w-8 h-8 text-amber-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
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
