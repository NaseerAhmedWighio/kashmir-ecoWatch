'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Factory, ArrowRight, Wind, Droplets, AlertTriangle,
  Thermometer, Mountain, Eye, Activity, BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const infrastructureModules = [
  {
    id: 'air-pollution',
    title: 'Air Pollution',
    description: 'District-wise AQI intelligence, seasonal inversion, and transport corridor pollution',
    icon: Wind,
    color: 'from-gray-500 to-slate-600',
    route: '/risk-monitoring/air-pollution',
    features: ['AQI Monitoring', 'District Profiles', 'Seasonal Patterns', 'Health Overlap']
  },
  {
    id: 'water-pollution',
    title: 'Water Pollution',
    description: 'Lake eutrophication, sewage/runoff indicators, and wetland degradation',
    icon: Droplets,
    color: 'from-blue-500 to-cyan-600',
    route: '/risk-monitoring/water-pollution',
    features: ['WQI Monitoring', 'Lake Health', 'Contamination', 'Eutrophication']
  },
  {
    id: 'noise-pollution',
    title: 'Noise Pollution',
    description: 'Urban/tourism corridor noise and wildlife habitat disturbance',
    icon: AlertTriangle,
    color: 'from-amber-500 to-orange-600',
    route: '/risk-monitoring/noise-pollution',
    features: ['Noise Levels', 'Traffic Corridors', 'Wildlife Impact', 'Tourism Zones']
  },
  {
    id: 'soil-pollution',
    title: 'Soil Pollution',
    description: 'Agricultural/industrial contamination and land degradation hotspots',
    icon: Mountain,
    color: 'from-amber-600 to-yellow-700',
    route: '/risk-monitoring/soil-pollution',
    features: ['Contamination', 'Land Degradation', 'Agricultural', 'Industrial']
  },
  {
    id: 'climate-change',
    title: 'Climate Change',
    description: 'Glacier retreat, snowline shifts, and seasonal instability signals',
    icon: Thermometer,
    color: 'from-red-500 to-orange-600',
    route: '/risk-monitoring/climate-change',
    features: ['Temp Trends', 'Glacier Retreat', 'Seasonal Shifts', 'Impact Areas']
  },
  {
    id: 'global-warming',
    title: 'Global Warming Impacts',
    description: 'Warming-linked impacts on glaciers, springs, wetlands, and species',
    icon: Thermometer,
    color: 'from-orange-500 to-red-600',
    route: '/risk-monitoring/global-warming-impacts',
    features: ['Ecosystem Response', 'Biodiversity', 'Hydrology', 'Cross-System']
  },
];

export default function EnvironmentalInfrastructurePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-48 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/50 via-orange-950/30 to-slate-950" />
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl">
                <Factory className="w-8 h-8 text-white" />
              </div>
              <Badge variant="warning" size="lg">Infrastructure Monitoring</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Environmental <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Infrastructure</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Comprehensive monitoring of air quality, water pollution, soil contamination, noise levels,
              and climate change signals across Kashmir&apos;s urban and ecological landscapes
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-xl"
                onClick={() => router.push('/risk-monitoring/dashboards')}
              >
                <BarChart3 className="w-5 h-5 mr-2" />
                View Dashboard
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                onClick={() => router.push('/risk-monitoring/live-alerts-advisories')}
              >
                <AlertTriangle className="w-5 h-5 mr-2" />
                Live Alerts
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Ribbon */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-amber-400 mb-2">6</div>
              <div className="text-sm text-slate-400 mb-1">Monitoring Domains</div>
              <div className="text-xs text-slate-500">Air, Water, Soil, Noise, Climate</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-red-400 mb-2">20</div>
              <div className="text-sm text-slate-400 mb-1">Districts Monitored</div>
              <div className="text-xs text-red-400">All Kashmir Districts</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-orange-400 mb-2">147</div>
              <div className="text-sm text-slate-400 mb-1">Monitoring Stations</div>
              <div className="text-xs text-orange-400">Ground + Satellite</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-sm text-slate-400 mb-1">Continuous Monitoring</div>
              <div className="text-xs text-emerald-400">Real-time Signals</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Module Cards */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Monitoring Modules</h2>
            <p className="text-slate-400">Environmental infrastructure intelligence domains</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {infrastructureModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card
                  className="glass-intense border-white/10 hover:border-white/20 transition-all p-6 h-full group cursor-pointer"
                  onClick={() => router.push(module.route)}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <module.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors mb-2 break-words">
                        {module.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {module.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {module.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <Button
                    size="sm"
                    className={`w-full bg-gradient-to-r ${module.color} hover:opacity-90 text-white text-sm`}
                    onClick={() => router.push(module.route)}
                  >
                    <span>Explore Module</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="glass-intense border-white/10 p-8">
              <div className="flex items-center gap-4 mb-6">
                <Activity className="w-8 h-8 text-amber-400" />
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">About Environmental Infrastructure</h3>
                  <p className="text-sm text-slate-400">
                    Why this module matters for Kashmir&apos;s environmental governance
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-sm font-bold text-white mb-2">Public Health Signals</h4>
                  <p className="text-sm text-slate-400">
                    Air quality, water contamination, and noise pollution directly impact community health outcomes
                    across urban and rural Kashmir.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-2">Climate Vulnerability</h4>
                  <p className="text-sm text-slate-400">
                    Temperature trends, glacier retreat, and seasonal shifts signal Kashmir&apos;s sensitivity
                    to global warming patterns.
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white mb-2">Governance Intelligence</h4>
                  <p className="text-sm text-slate-400">
                    District-level pollution profiles and environmental stress data support evidence-based
                    policy and enforcement decisions.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
