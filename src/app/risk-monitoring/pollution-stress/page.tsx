'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Activity, ArrowRight,
  Droplets, Wind, Thermometer, Sprout
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const pollutionModules = [
  {
    id: 'environmental-monitoring',
    title: 'Environmental Monitoring',
    description: 'Air quality, water quality, and ecosystem health monitoring',
    icon: Activity,
    color: 'from-emerald-500 to-green-600',
    route: '/risk-monitoring/environmental-monitoring',
    features: ['Air Quality', 'Water Quality', 'Ecosystem Health', 'Pollution Tracking']
  },
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
    icon: Activity,
    color: 'from-amber-500 to-orange-600',
    route: '/risk-monitoring/noise-pollution',
    features: ['Noise Levels', 'Traffic Corridors', 'Wildlife Impact', 'Tourism Zones']
  },
  {
    id: 'soil-pollution',
    title: 'Soil Pollution',
    description: 'Agricultural/industrial contamination and land degradation hotspots',
    icon: Sprout,
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
    id: 'global-warming-impacts',
    title: 'Global Warming Impacts',
    description: 'Warming-linked impacts on glaciers, springs, wetlands, and species',
    icon: Thermometer,
    color: 'from-orange-500 to-red-600',
    route: '/risk-monitoring/global-warming-impacts',
    features: ['Ecosystem Response', 'Biodiversity', 'Hydrology', 'Cross-System']
  },
];

export default function PollutionStressPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">{/* Hero Section */}
      <section className="relative pt-48 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-green-950/30 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <a href="/risk-monitoring" className="hover:text-white transition-colors">Risk & Monitoring</a>
              <span>/</span>
              <span className="text-white font-medium">Pollution & Stress</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-2xl">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <Badge variant="success" size="lg">Environmental Pressure</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Pollution & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">Stress</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Environmental quality monitoring, pollution tracking, and climate stress
              assessment across air, water, soil, and ecosystem domains
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-xl"
                onClick={() => router.push('/risk-monitoring/environmental-monitoring')}
              >
                <Activity className="w-5 h-5 mr-2" />
                Environmental Monitoring
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                onClick={() => router.push('/risk-monitoring')}
              >
                Back to Overview
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pollution Modules Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pollutionModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card
                  className="glass-light border-white/10 hover:border-emerald-500/30 transition-all p-5 h-full cursor-pointer group"
                  onClick={() => router.push(module.route)}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <module.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {module.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mb-3 line-clamp-2 leading-relaxed">
                    {module.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {module.features.slice(0, 2).map((feature, fIdx) => (
                      <Badge key={fIdx} variant="outline" size="sm" className="text-xs border-white/10">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center text-xs font-medium text-emerald-400 group-hover:text-emerald-300 transition-colors">
                    <span>Access Module</span>
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
