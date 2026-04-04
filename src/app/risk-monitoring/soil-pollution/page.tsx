'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Sprout, ArrowRight, Map, AlertTriangle, Activity, Layers as LayersIcon,
  TrendingUp, Filter, FlaskConical, Trash2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const soilQualityData = [
  { id: 'sp-1', location: 'Pulwama Agricultural Zone', district: 'Pulwama', type: 'Agricultural', contaminationLevel: 'Moderate', primaryConcern: 'Pesticide Residue' },
  { id: 'sp-2', location: 'Budgam Industrial Area', district: 'Budgam', type: 'Industrial', contaminationLevel: 'High', primaryConcern: 'Heavy Metals' },
  { id: 'sp-3', location: 'Srinagar Peri-Urban', district: 'Srinagar', type: 'Peri-Urban', contaminationLevel: 'Moderate', primaryConcern: 'Waste Dumping' },
  { id: 'sp-4', location: 'Anantnag Agricultural Belt', district: 'Anantnag', type: 'Agricultural', contaminationLevel: 'Low', primaryConcern: 'Fertilizer Runoff' },
  { id: 'sp-5', location: 'Baramulla Wetland Edge', district: 'Baramulla', type: 'Wetland Edge', contaminationLevel: 'Moderate', primaryConcern: 'Agricultural Runoff' },
  { id: 'sp-6', location: 'Kupwara Forest Edge', district: 'Kupwara', type: 'Forest Edge', contaminationLevel: 'Low', primaryConcern: 'Minimal' },
];

const contaminationTypes = [
  { type: 'Agricultural Contamination', severity: 'High', description: 'Pesticide and fertilizer accumulation in soil' },
  { type: 'Industrial Contamination', severity: 'Critical', description: 'Heavy metals and chemical discharge' },
  { type: 'Waste Dumping Effects', severity: 'High', description: 'Municipal and plastic waste leaching' },
  { type: 'Wetland-Edge Stress', severity: 'Moderate', description: 'Runoff and encroachment impacts' },
  { type: 'Land Degradation', severity: 'Moderate', description: 'Erosion, compaction, nutrient depletion' },
];

const districtSummary = [
  { district: 'Srinagar', contaminatedSites: 8, avgSeverity: 'Moderate', trend: 'worsening' as const, primarySource: 'Urban Waste' },
  { district: 'Pulwama', contaminatedSites: 6, avgSeverity: 'Moderate', trend: 'stable' as const, primarySource: 'Agricultural' },
  { district: 'Budgam', contaminatedSites: 7, avgSeverity: 'High', trend: 'worsening' as const, primarySource: 'Industrial' },
  { district: 'Anantnag', contaminatedSites: 5, avgSeverity: 'Low-Moderate', trend: 'stable' as const, primarySource: 'Agricultural' },
  { district: 'Baramulla', contaminatedSites: 4, avgSeverity: 'Moderate', trend: 'stable' as const, primarySource: 'Wetland Runoff' },
];

const landDegradationHotspots = [
  { hotspot: 'Srinagar Urban Fringe', degradation: 'High', area: '12 km²', cause: 'Construction & Dumping' },
  { hotspot: 'Budgam Industrial Belt', degradation: 'Critical', area: '8 km²', cause: 'Industrial Activity' },
  { hotspot: 'Pulwama Agricultural Zone', degradation: 'Moderate', area: '25 km²', cause: 'Chemical Overuse' },
  { hotspot: 'Anantnag Valley Floor', degradation: 'Low-Moderate', area: '15 km²', cause: 'Erosion' },
];

export default function SoilPollutionPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">{/* Hero Section */}
      <section className="relative pt-48 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/50 via-yellow-950/30 to-slate-950" />
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
              <span className="text-white font-medium">Soil Pollution</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-600 to-yellow-700 flex items-center justify-center shadow-2xl">
                <Sprout className="w-8 h-8 text-white" />
              </div>
              <Badge variant="warning" size="lg">Soil Health Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Soil Pollution <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400">& Contamination</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Agricultural contamination, industrial pollution, waste dumping effects,
              wetland-edge and peri-urban soil stress, and land degradation hotspot monitoring
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-yellow-700 hover:from-amber-700 hover:to-yellow-800 text-white shadow-xl"
                onClick={() => router.push('/risk-monitoring/dashboards')}
              >
                <Activity className="w-5 h-5 mr-2" />
                View Soil Dashboard
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
              <div className="text-4xl font-bold text-amber-400 mb-2">30</div>
              <div className="text-sm text-slate-400 mb-1">Contaminated Sites</div>
              <div className="text-xs text-red-400">7 Critical</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-orange-400 mb-2">5</div>
              <div className="text-sm text-slate-400 mb-1">Districts Monitored</div>
              <div className="text-xs text-emerald-400">Active</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-red-400 mb-2">60</div>
              <div className="text-sm text-slate-400 mb-1">km² Degraded</div>
              <div className="text-xs text-red-400">8 km² Critical</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-yellow-400 mb-2">5</div>
              <div className="text-sm text-slate-400 mb-1">Contamination Types</div>
              <div className="text-xs text-slate-500">Tracked</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-sm text-slate-400 mb-1">Monitoring Status</div>
              <div className="text-xs text-emerald-400">Lab Analysis</div>
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
              Agricultural
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Industrial
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Peri-Urban
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Wetland Edge
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Forest Edge
            </Badge>
          </div>
        </div>
      </section>

      {/* District Soil Contamination Summary */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">District Soil Contamination Summary</h2>
            <p className="text-slate-400">Contaminated sites and primary pollution sources by district</p>
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
                      <div className="text-xs text-slate-500">{item.primarySource}</div>
                    </div>
                    <Badge
                      variant={item.avgSeverity === 'High' || item.avgSeverity === 'Critical' ? 'danger' : 
                               item.avgSeverity === 'Moderate' ? 'warning' : 'success'}
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
                    {item.contaminatedSites} contaminated sites
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Soil Quality Records */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Recent Soil Quality Records</h2>
            <p className="text-slate-400">Latest contamination assessments across Kashmir</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {soilQualityData.map((record, index) => (
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
                        record.contaminationLevel === 'High' || record.contaminationLevel === 'Critical' ? 'danger' :
                        record.contaminationLevel === 'Moderate' ? 'warning' : 'success'
                      }
                      size="sm"
                    >
                      {record.contaminationLevel}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Type</span>
                      <span className="text-white font-medium">{record.type}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Primary Concern</span>
                      <span className="text-amber-400 font-medium">{record.primaryConcern}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contamination Types */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Soil Contamination Types</h2>
            <p className="text-slate-400">Primary sources and severity of soil pollution in Kashmir</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {contaminationTypes.map((item, index) => (
              <motion.div
                key={item.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-light border-white/10 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <FlaskConical className={`w-5 h-5 ${
                      item.severity === 'Critical' ? 'text-red-400' :
                      item.severity === 'High' ? 'text-orange-400' : 'text-amber-400'
                    }`} />
                    <h3 className="text-xs font-bold text-white">{item.type}</h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">{item.description}</p>
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

      {/* Land Degradation Hotspots */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Land Degradation Hotspots</h2>
            <p className="text-slate-400">Critical areas experiencing soil and land quality decline</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {landDegradationHotspots.map((hotspot, index) => (
              <motion.div
                key={hotspot.hotspot}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5">
                  <h3 className="text-sm font-bold text-white mb-2">{hotspot.hotspot}</h3>
                  <div className="text-xs text-slate-400 mb-3">Area: {hotspot.area}</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Degradation</span>
                      <Badge
                        variant={hotspot.degradation === 'Critical' ? 'danger' : 
                                 hotspot.degradation === 'High' ? 'warning' : 'info'}
                        size="sm"
                      >
                        {hotspot.degradation}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Cause</span>
                      <span className="text-amber-400">{hotspot.cause}</span>
                    </div>
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
                <Map className="w-6 h-6 text-amber-400" />
                <div>
                  <h2 className="text-xl font-bold text-white">Soil Contamination Map Preview</h2>
                  <p className="text-sm text-slate-400">Contaminated sites and degradation hotspot layers</p>
                </div>
              </div>
              <div className="relative h-80 bg-gradient-to-br from-amber-900/50 to-yellow-900/30 rounded-xl flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <LayersIcon className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 mb-4">Interactive soil quality map with contamination zones</p>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-amber-600 to-yellow-700"
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
              className="glass-light border-white/10 hover:border-blue-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/water-pollution')}
            >
              <Sprout className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Water Pollution
              </h3>
              <p className="text-xs text-slate-400">
                Runoff and wetland contamination linkage
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-emerald-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/agriculture-soil')}
            >
              <Sprout className="w-8 h-8 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                Agriculture & Soil
              </h3>
              <p className="text-xs text-slate-400">
                Agricultural soil health database
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
                Land use and climate stress overlap
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
