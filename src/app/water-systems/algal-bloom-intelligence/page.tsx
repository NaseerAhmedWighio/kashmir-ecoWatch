'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Waves, ArrowRight, Map, AlertTriangle, Activity, Droplets,
  TrendingUp, Filter, Layers, Eye, Leaf, Flower2, Thermometer, Fish
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const algalBloomData = [
  { id: 'ab-1', waterbody: 'Dal Lake', district: 'Srinagar', bloomStatus: 'Active', severity: 'High', coverage: '35%', dominant: 'Microcystis' },
  { id: 'ab-2', waterbody: 'Manasbal Lake', district: 'Ganderbal', bloomStatus: 'Developing', severity: 'Moderate', coverage: '18%', dominant: 'Anabaena' },
  { id: 'ab-3', waterbody: 'Anchar Lake', district: 'Srinagar', bloomStatus: 'Active', severity: 'Critical', coverage: '55%', dominant: 'Microcystis' },
  { id: 'ab-4', waterbody: 'Hokersar Wetland', district: 'Srinagar', bloomStatus: 'Low Risk', severity: 'Low', coverage: '5%', dominant: 'None' },
  { id: 'ab-5', waterbody: 'Wular Lake', district: 'Bandipora', bloomStatus: 'Monitoring', severity: 'Low', coverage: '8%', dominant: 'None' },
];

const bloomFactors = [
  { factor: 'Nutrient Loading', contribution: '40%', description: 'Nitrogen and phosphorus from sewage and agriculture' },
  { factor: 'Water Temperature', contribution: '25%', description: 'Warmer waters accelerate algal growth' },
  { factor: 'Stagnant Conditions', contribution: '20%', description: 'Low water circulation in lakes' },
  { factor: 'Sunlight Exposure', contribution: '10%', description: 'Extended photoperiod in summer' },
  { factor: 'pH Changes', contribution: '5%', description: 'Alkaline conditions favor cyanobacteria' },
];

const seasonalRisk = [
  { season: 'Spring (Mar-May)', risk: 'Moderate', description: 'Warming begins, nutrient runoff from agriculture' },
  { season: 'Summer (Jun-Aug)', risk: 'Critical', description: 'Peak temperatures, optimal bloom conditions' },
  { season: 'Autumn (Sep-Nov)', risk: 'Moderate-High', description: 'Residual blooms, cooling begins' },
  { season: 'Winter (Dec-Feb)', risk: 'Low', description: 'Cold temperatures suppress algal growth' },
];

const districtSummary = [
  { district: 'Srinagar', waterbodies: 8, activeBlooms: 3, avgSeverity: 'High', trend: 'worsening' as const },
  { district: 'Ganderbal', waterbodies: 5, activeBlooms: 1, avgSeverity: 'Moderate', trend: 'stable' as const },
  { district: 'Bandipora', waterbodies: 4, activeBlooms: 0, avgSeverity: 'Low', trend: 'stable' as const },
  { district: 'Budgam', waterbodies: 6, activeBlooms: 1, avgSeverity: 'Moderate', trend: 'worsening' as const },
];

export default function AlgalBloomMonitoringPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-48 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-green-950/30 to-slate-950" />
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
              <a href="/water-systems" className="hover:text-white transition-colors">Water Systems</a>
              <span>/</span>
              <span className="text-white font-medium">Algal Bloom Intelligence</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-2xl">
                <Waves className="w-8 h-8 text-white" />
              </div>
              <Badge variant="warning" size="lg">Bloom Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Algal Bloom <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">Intelligence</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Eutrophication-prone wetland monitoring, bloom alerts, seasonality tracking,
              risk-level assessment, and aquatic vulnerability intelligence for Kashmir lake systems
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-xl"
                onClick={() => router.push('/water-systems')}
              >
                <Map className="w-5 h-5 mr-2" />
                Open Bloom Map
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                onClick={() => router.push('/water-systems/water-quality')}
              >
                <Droplets className="w-5 h-5 mr-2" />
                Water Quality
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                onClick={() => router.push('/water-systems')}
              >
                All Water Systems
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
              <div className="text-4xl font-bold text-emerald-400 mb-2">23</div>
              <div className="text-sm text-slate-400 mb-1">Waterbodies Monitored</div>
              <div className="text-xs text-slate-500">Lakes & Wetlands</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-red-400 mb-2">4</div>
              <div className="text-sm text-slate-400 mb-1">Active Blooms</div>
              <div className="text-xs text-red-400">2 Critical</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-amber-400 mb-2">8</div>
              <div className="text-sm text-slate-400 mb-1">High Risk Sites</div>
              <div className="text-xs text-amber-400">Eutrophic</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-orange-400 mb-2">55%</div>
              <div className="text-sm text-slate-400 mb-1">Max Coverage</div>
              <div className="text-xs text-red-400">Anchar Lake</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-sm text-slate-400 mb-1">Monitoring Status</div>
              <div className="text-xs text-emerald-400">Satellite + Ground</div>
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
              All Status
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Active
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Developing
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Monitoring
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Low Risk
            </Badge>
          </div>
        </div>
      </section>

      {/* District Bloom Summary */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">District Bloom Summary</h2>
            <p className="text-slate-400">Algal bloom activity and risk by district</p>
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
                      variant={item.avgSeverity === 'Critical' ? 'danger' : 
                               item.avgSeverity === 'High' ? 'warning' : 'success'}
                      size="sm"
                    >
                      {item.avgSeverity}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className={`w-4 h-4 ${
                      item.trend === 'worsening' ? 'text-red-400' : 'text-slate-400'
                    }`} />
                    <span className={`text-sm ${
                      item.trend === 'worsening' ? 'text-red-400' : 'text-slate-400'
                    }`}>
                      {item.trend === 'worsening' ? 'Worsening' : 'Stable'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">
                    {item.activeBlooms} active blooms
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Bloom Records */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Recent Bloom Records</h2>
            <p className="text-slate-400">Latest algal bloom monitoring data from Kashmir waterbodies</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {algalBloomData.map((record, index) => (
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
                        record.severity === 'Critical' ? 'danger' :
                        record.severity === 'High' ? 'warning' :
                        record.severity === 'Moderate' ? 'info' : 'success'
                      }
                      size="sm"
                    >
                      {record.severity}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-400 mb-2">{record.bloomStatus}</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Coverage</span>
                      <span className="text-emerald-400">{record.coverage}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Dominant</span>
                      <span className="text-white">{record.dominant}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bloom Factors */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Bloom Formation Factors</h2>
            <p className="text-slate-400">Primary drivers of algal bloom development in Kashmir lakes</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {bloomFactors.map((factor, index) => (
              <motion.div
                key={factor.factor}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-light border-white/10 p-5">
                  <h3 className="text-xs font-bold text-white mb-2">{factor.factor}</h3>
                  <div className="text-2xl font-bold text-emerald-400 mb-2">{factor.contribution}</div>
                  <p className="text-xs text-slate-400">{factor.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Risk Pattern */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Seasonal Bloom Risk Pattern</h2>
            <p className="text-slate-400">Algal bloom risk variation across seasons in Kashmir</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasonalRisk.map((item, index) => (
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
                      item.risk === 'Moderate-High' ? 'warning' :
                      item.risk === 'Moderate' ? 'info' : 'success'
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
                <Map className="w-6 h-6 text-emerald-400" />
                <div>
                  <h2 className="text-xl font-bold text-white">Algal Bloom Map Preview</h2>
                  <p className="text-sm text-slate-400">Waterbody bloom status, coverage, and risk layers</p>
                </div>
              </div>
              <div className="relative h-80 bg-gradient-to-br from-emerald-900/50 to-green-900/30 rounded-xl flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <Layers className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 mb-4">Interactive bloom monitoring map with satellite imagery overlay</p>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-emerald-500 to-green-600"
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

      {/* Cross-Link Card: Seasonal Ecology - Floral Bloom */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Link href="/seasonal-ecology/bloom-mapping">
            <Card className="glass-intense border-pink-500/30 hover:border-pink-500/50 transition-all cursor-pointer group overflow-hidden">
              <div className="relative p-6 md:p-8">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-950/50 via-rose-950/50 to-slate-950/50" />
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
                
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-2xl">
                      <Flower2 className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant="outline" className="border-pink-500/50 text-pink-400">
                        Related Intelligence
                      </Badge>
                      <Badge variant="success" size="sm">
                        Seasonal Ecology
                      </Badge>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-pink-400 transition-colors">
                      Explore Floral Bloom Zones & Flowering Landscapes
                    </h3>
                    <p className="text-slate-300 mb-4 max-w-3xl">
                      While algal blooms indicate water stress, floral blooms represent Kashmir's seasonal 
                      phenology and flowering cycles. Explore orchard bloom belts, alpine meadow flowering, 
                      medicinal plant zones, and pollinator-linked bloom timing across Kashmir's diverse ecosystems.
                    </p>
                    <div className="flex items-center gap-2 text-pink-400 font-medium">
                      <span>View Floral Bloom Mapping</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="hidden md:flex flex-shrink-0 items-center">
                    <div className="w-12 h-12 rounded-full bg-pink-500/20 border border-pink-500/30 flex items-center justify-center group-hover:bg-pink-500/30 transition-all">
                      <ArrowRight className="w-6 h-6 text-pink-400" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <Card
              className="glass-light border-white/10 hover:border-blue-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/water-systems/lakes')}
            >
              <Droplets className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Lake Profiles
              </h3>
              <p className="text-xs text-slate-400">
                Dal, Wular, Manasbal & lake health intelligence
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-sky-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/water-systems/wetlands')}
            >
              <Waves className="w-8 h-8 text-sky-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">
                Wetland Profiles
              </h3>
              <p className="text-xs text-slate-400">
                Hokersar & wetland ecosystem health
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-teal-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/water-systems/water-quality')}
            >
              <Thermometer className="w-8 h-8 text-teal-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                Water Quality Signal
              </h3>
              <p className="text-xs text-slate-400">
                Water quality trends & eutrophication indicators
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-violet-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/water-systems/fisheries')}
            >
              <Fish className="w-8 h-8 text-violet-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">
                Aquatic Life Risk
              </h3>
              <p className="text-xs text-slate-400">
                Fish populations & aquatic vulnerability
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-indigo-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/water-systems/flood-risk')}
            >
              <AlertTriangle className="w-8 h-8 text-indigo-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                District Water Dashboard
              </h3>
              <p className="text-xs text-slate-400">
                District-level hydrological risk & alerts
              </p>
            </Card>
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
