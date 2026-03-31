'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Thermometer, ArrowRight, Map, TrendingUp, Activity, Snowflake,
  Droplets, Leaf, Mountain, Layers
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const warmingImpacts = [
  { impact: 'Glacier Mass Loss', severity: 'Critical', description: 'Kolahoi, Machoi glaciers losing 15-20m ice thickness per decade' },
  { impact: 'Snowpack Reduction', severity: 'High', description: 'Reduced winter snowfall affecting spring water availability' },
  { impact: 'Spring Discharge Variability', severity: 'High', description: 'Traditional spring flows becoming unpredictable' },
  { impact: 'Wetland Evaporation Increase', severity: 'High', description: 'Higher temperatures accelerating wetland water loss' },
  { impact: 'Species Range Shifts', severity: 'Moderate-High', description: 'Alpine species moving upward, valley species stressed' },
  { impact: 'Phenological Mismatch', severity: 'Moderate', description: 'Flowering-pollinator timing disruption' },
  { impact: 'Heat Stress Events', severity: 'Moderate-High', description: 'Increased summer heat waves affecting health and agriculture' },
  { impact: 'Disease Vector Expansion', severity: 'Moderate', description: 'Warmer temperatures enabling new disease vectors' },
];

const ecosystemResponses = [
  { system: 'Alpine Meadows', response: 'Upward Shift', impact: 'Habitat compression at higher elevations', status: 'Vulnerable' },
  { system: 'Temperate Forests', response: 'Species Stress', impact: 'Oak and conifer stress from heat and drought', status: 'Stressed' },
  { system: 'Wetlands', response: 'Shrinkage', impact: 'Reduced water levels, increased eutrophication', status: 'Critical' },
  { system: 'River Systems', response: 'Flow Changes', impact: 'Altered seasonal flows, warmer water temperatures', status: 'Vulnerable' },
  { system: 'Agricultural Zones', response: 'Crop Stress', impact: 'Apple flowering shifts, rice water stress', status: 'Stressed' },
];

const biodiversitySignals = [
  { signal: 'Hangul Habitat Pressure', description: 'Reduced suitable habitat from vegetation shifts', trend: 'Worsening' },
  { signal: 'Bird Migration Shifts', description: 'Arrival timing changes, some species declining', trend: 'Shifting' },
  { signal: 'Alpine Species Compression', description: 'Upward movement with limited higher habitat', trend: 'Critical' },
  { signal: 'Invasive Species Spread', description: 'Warmer conditions enabling invasive expansion', trend: 'Worsening' },
];

export default function GlobalWarmingImpactsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-48 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/50 via-red-950/30 to-slate-950" />
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
              <span className="text-white font-medium">Global Warming Impacts</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-2xl">
                <Thermometer className="w-8 h-8 text-white" />
              </div>
              <Badge variant="danger" size="lg">Warming Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Global Warming <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Impacts on Kashmir</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Comprehensive analysis of warming-linked impacts on Kashmir glaciers, springs, wetlands,
              species, seasons, hydrology, and biodiversity across all ecological systems
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-xl"
                onClick={() => router.push('/risk-monitoring/dashboards')}
              >
                <Activity className="w-5 h-5 mr-2" />
                View Impact Dashboard
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
              <div className="text-4xl font-bold text-red-400 mb-2">15-20m</div>
              <div className="text-sm text-slate-400 mb-1">Ice Loss/Decade</div>
              <div className="text-xs text-red-400">Glacier Thickness</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-amber-400 mb-2">30%</div>
              <div className="text-sm text-slate-400 mb-1">Snowpack Decline</div>
              <div className="text-xs text-amber-400">Since 1990</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-orange-400 mb-2">50+</div>
              <div className="text-sm text-slate-400 mb-1">Species Affected</div>
              <div className="text-xs text-red-400">Range Shifts</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-red-400 mb-2">25%</div>
              <div className="text-sm text-slate-400 mb-1">Wetland Loss</div>
              <div className="text-xs text-red-400">Warming-Linked</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">8</div>
              <div className="text-sm text-slate-400 mb-1">Critical Impacts</div>
              <div className="text-xs text-red-400">Monitored</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Warming Impacts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Global Warming Impacts</h2>
            <p className="text-slate-400">Direct and indirect effects of rising temperatures on Kashmir's systems</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {warmingImpacts.map((impact, index) => (
              <motion.div
                key={impact.impact}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-light border-white/10 p-5">
                  <h3 className="text-sm font-bold text-white mb-2">{impact.impact}</h3>
                  <p className="text-xs text-slate-400 mb-3">{impact.description}</p>
                  <Badge
                    variant={impact.severity === 'Critical' ? 'danger' : 
                             impact.severity === 'High' ? 'warning' : 'info'}
                    size="sm"
                  >
                    {impact.severity}
                  </Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Responses */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Ecosystem Responses to Warming</h2>
            <p className="text-slate-400">How Kashmir's major ecosystems are responding to rising temperatures</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {ecosystemResponses.map((system, index) => (
              <motion.div
                key={system.system}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5">
                  <h3 className="text-xs font-bold text-white mb-2">{system.system}</h3>
                  <div className="text-sm text-amber-400 mb-2">{system.response}</div>
                  <p className="text-xs text-slate-400 mb-3">{system.impact}</p>
                  <Badge
                    variant={system.status === 'Critical' ? 'danger' : 
                             system.status === 'Vulnerable' ? 'warning' : 'info'}
                    size="sm"
                  >
                    {system.status}
                  </Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Biodiversity Signals */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Biodiversity Warming Signals</h2>
            <p className="text-slate-400">Species and habitat responses to warming temperatures</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {biodiversitySignals.map((signal, index) => (
              <motion.div
                key={signal.signal}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-light border-white/10 p-5">
                  <h3 className="text-sm font-bold text-white mb-2">{signal.signal}</h3>
                  <p className="text-xs text-slate-400 mb-3">{signal.description}</p>
                  <div className="flex items-center gap-2">
                    <TrendingUp className={`w-4 h-4 ${
                      signal.trend === 'Worsening' || signal.trend === 'Critical' ? 'text-red-400' : 'text-amber-400'
                    }`} />
                    <span className={`text-xs ${
                      signal.trend === 'Worsening' || signal.trend === 'Critical' ? 'text-red-400' : 'text-amber-400'
                    }`}>
                      {signal.trend}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-System Analysis */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Cross-System Warming Analysis</h2>
            <p className="text-slate-400">Interconnected impacts across Kashmir's ecological systems</p>
          </motion.div>

          <Card className="glass-intense border-white/10 p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Mountain className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-sm font-bold text-white mb-2">Cryosphere System</h3>
                <p className="text-xs text-slate-400">
                  Glacier retreat → Reduced dry season flows → Water security risk → Agricultural stress
                </p>
              </div>
              <div className="text-center">
                <Droplets className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-sm font-bold text-white mb-2">Hydrology System</h3>
                <p className="text-xs text-slate-400">
                  Snowpack decline → Spring variability → Wetland shrinkage → Ecosystem stress
                </p>
              </div>
              <div className="text-center">
                <Leaf className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-sm font-bold text-white mb-2">Biodiversity System</h3>
                <p className="text-xs text-slate-400">
                  Habitat shifts → Species stress → Phenology mismatch → Extinction risk
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
                <Map className="w-6 h-6 text-orange-400" />
                <div>
                  <h2 className="text-xl font-bold text-white">Warming Impact Map Preview</h2>
                  <p className="text-sm text-slate-400">Temperature anomalies, ecosystem vulnerability, and species stress layers</p>
                </div>
              </div>
              <div className="relative h-80 bg-gradient-to-br from-orange-900/50 to-red-900/30 rounded-xl flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <Layers className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 mb-4">Interactive warming impact map with ecosystem vulnerability zones</p>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-red-600"
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
            <p className="text-slate-400">Cross-linked climate and ecological monitoring</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              className="glass-light border-white/10 hover:border-red-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/climate-change')}
            >
              <Thermometer className="w-8 h-8 text-red-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                Climate Change
              </h3>
              <p className="text-xs text-slate-400">
                Climate signals and trend analysis
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-emerald-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/biodiversity-risk-intelligence')}
            >
              <Leaf className="w-8 h-8 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                Biodiversity Risk
              </h3>
              <p className="text-xs text-slate-400">
                Warming-linked species vulnerability
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-blue-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/glacier-cryosphere-risks')}
            >
              <Snowflake className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Glacier & Cryosphere
              </h3>
              <p className="text-xs text-slate-400">
                Ice mass loss and GLOF risk
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
                Comprehensive warming impact dashboards
              </p>
            </Card>
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
