'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  AlertTriangle, ArrowRight,
  Droplets, Mountain, Flame, Zap, Waves, Wind
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const hazardModules = [
  {
    id: 'disaster-risks',
    title: 'Disaster Risks',
    description: 'Multi-hazard risk assessment and monitoring across Kashmir',
    icon: AlertTriangle,
    color: 'from-red-500 to-orange-600',
    route: '/risk-monitoring/disaster-risks',
    features: ['All Hazards', 'Risk Maps', 'Vulnerability', 'Preparedness']
  },
  {
    id: 'flood-flash-flood-risks',
    title: 'Flood & Flash Flood Risks',
    description: 'River flooding, flash flood corridors, and GLOF risk monitoring',
    icon: Droplets,
    color: 'from-blue-500 to-cyan-600',
    route: '/risk-monitoring/flood-flash-flood-risks',
    features: ['Floodplain Maps', 'Flash Zones', 'GLOF Risk', 'Early Warning']
  },
  {
    id: 'landslide-slope-risks',
    title: 'Landslide & Slope Risks',
    description: 'Slope stability, landslide susceptibility, and road corridor monitoring',
    icon: Mountain,
    color: 'from-amber-500 to-orange-600',
    route: '/risk-monitoring/landslide-slope-risks',
    features: ['Susceptibility Maps', 'Slope Sensors', 'Road Corridors', 'Rainfall Thresholds']
  },
  {
    id: 'avalanche-winter-risks',
    title: 'Avalanche & Winter Risks',
    description: 'Snow avalanche forecasting, winter hazard monitoring, and road closure tracking',
    icon: AlertTriangle,
    color: 'from-slate-400 to-slate-600',
    route: '/risk-monitoring/avalanche-winter-risks',
    features: ['Avalanche Forecast', 'Snow Pack', 'Road Closures', 'Winter Preparedness']
  },
  {
    id: 'earthquake-risks',
    title: 'Earthquake Risks',
    description: 'Seismic hazard assessment, fault line mapping, and building vulnerability',
    icon: Zap,
    color: 'from-purple-500 to-indigo-600',
    route: '/risk-monitoring/earthquake-risks',
    features: ['Seismic Zones', 'Fault Lines', 'Building Risk', 'Preparedness']
  },
  {
    id: 'forest-fire-risks',
    title: 'Forest Fire Risks',
    description: 'Wildfire risk assessment, hotspot detection, and burn scar monitoring',
    icon: Flame,
    color: 'from-orange-500 to-red-600',
    route: '/risk-monitoring/forest-fire-risks',
    features: ['Fire Risk Index', 'Hotspot Detection', 'Burn Scars', 'Prevention']
  },
  {
    id: 'glacier-cryosphere-risks',
    title: 'Glacier & Cryosphere Risks',
    description: 'Glacial lake monitoring, GLOF risk, and cryosphere changes',
    icon: Waves,
    color: 'from-cyan-500 to-blue-600',
    route: '/risk-monitoring/glacier-cryosphere-risks',
    features: ['GLOF Risk', 'Glacier Retreat', 'Lake Monitoring', 'Climate Impact']
  },
  {
    id: 'hydrological-risks',
    title: 'Hydrological Risks',
    description: 'Water-related hazards, drought monitoring, and water security',
    icon: Droplets,
    color: 'from-teal-500 to-cyan-600',
    route: '/risk-monitoring/hydrological-risks',
    features: ['Drought Watch', 'Water Stress', 'Flow Anomalies', 'Security Assessment']
  },
];

export default function HazardRisksPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-48 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/50 via-orange-950/30 to-slate-950" />
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
              <span className="text-white font-medium">Hazard Risks</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-2xl">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <Badge variant="danger" size="lg">Multi-Hazard Systems</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Hazard <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Risks</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Comprehensive multi-hazard risk monitoring systems covering natural disasters,
              geophysical hazards, and climate-related risks across Kashmir
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white shadow-xl"
                onClick={() => router.push('/risk-monitoring/disaster-risks')}
              >
                <AlertTriangle className="w-5 h-5 mr-2" />
                Explore Disaster Risks
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

      {/* Hazard Modules Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hazardModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card
                  className="glass-intense border-white/10 hover:border-red-500/30 transition-all p-5 h-full cursor-pointer group"
                  onClick={() => router.push(module.route)}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <module.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors line-clamp-2">
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
                  <div className="flex items-center text-xs font-medium text-red-400 group-hover:text-red-300 transition-colors">
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
