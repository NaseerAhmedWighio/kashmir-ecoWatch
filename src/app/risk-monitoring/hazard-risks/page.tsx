'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  AlertTriangle, ArrowRight, Droplets, Mountain, Flame, Zap, Waves,
  TrendingUp, MapPin, Clock, Bell
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { hazardCategorySummaries, districtRiskProfiles } from '@/data/risk-monitoring';

const hazardModules = [
  {
    id: 'flood-flash-flood',
    title: 'Flood & Flash Flood',
    description: 'River overflow zones, flash flood corridors, and inundation monitoring',
    icon: Droplets,
    color: 'from-blue-500 to-cyan-600',
    route: '/risk-monitoring/flood-flash-flood',
  },
  {
    id: 'landslide-slope',
    title: 'Landslide & Slope',
    description: 'Slope instability, landslide-prone corridors, and road vulnerability',
    icon: Mountain,
    color: 'from-amber-500 to-orange-600',
    route: '/risk-monitoring/landslide-slope',
  },
  {
    id: 'avalanche-winter',
    title: 'Avalanche & Winter',
    description: 'Avalanche exposure, winter access, and snow disruption',
    icon: AlertTriangle,
    color: 'from-slate-400 to-blue-600',
    route: '/risk-monitoring/avalanche-winter',
  },
  {
    id: 'earthquake',
    title: 'Earthquake',
    description: 'Seismic exposure, vulnerable zones, and infrastructure sensitivity',
    icon: Zap,
    color: 'from-purple-500 to-indigo-600',
    route: '/risk-monitoring/earthquake',
  },
  {
    id: 'forest-fire',
    title: 'Forest Fire',
    description: 'Active fire events, fire-prone zones, and smoke visibility',
    icon: Flame,
    color: 'from-orange-500 to-red-600',
    route: '/risk-monitoring/forest-fire',
  },
  {
    id: 'glacier-cryosphere',
    title: 'Glacier & Cryosphere',
    description: 'Glacier-linked risk, cryosphere sensitivity, and glacial lakes',
    icon: Waves,
    color: 'from-cyan-500 to-blue-600',
    route: '/risk-monitoring/glacier-cryosphere',
  },
  {
    id: 'hydrological-risk',
    title: 'Hydrological Risk',
    description: 'Water system instability, overflow pressure, and hydrological anomalies',
    icon: Droplets,
    color: 'from-teal-500 to-cyan-600',
    route: '/risk-monitoring/hydrological-risk',
  },
  {
    id: 'environmental-incident',
    title: 'Environmental Incident Risk',
    description: 'Pollution emergencies, toxic discharge, and escalated environmental events',
    icon: AlertTriangle,
    color: 'from-red-600 to-rose-700',
    route: '/risk-monitoring/environmental-incident-risk',
  },
];

const getRiskLevelBadge = (level: string) => {
  switch (level) {
    case 'critical': return <Badge variant="danger" size="sm">Critical</Badge>;
    case 'high': return <Badge variant="warning" size="sm">High</Badge>;
    case 'moderate': return <Badge variant="info" size="sm">Moderate</Badge>;
    case 'low': return <Badge variant="success" size="sm">Low</Badge>;
    default: return null;
  }
};

export default function HazardRisksPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 md:pt-48 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/50 via-orange-950/30 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <a href="/risk-monitoring" className="hover:text-white transition-colors">Risk & Monitoring</a>
              <span>/</span>
              <span className="text-white font-medium">Hazard Risks</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-2xl">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <Badge variant="danger" size="lg">Umbrella Classification</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Hazard <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Risks</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Multi-hazard classification and risk assessment across Kashmir's diverse environmental threats.
              Active hazard status, district vulnerability, and routes to specialized monitoring.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white shadow-xl"
                onClick={() => router.push('/risk-monitoring/live-alerts')}
              >
                <Bell className="w-5 h-5 mr-2" />
                View Live Alerts
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

      {/* Hazard Classification Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <h2 className="text-2xl font-bold text-white">Active Hazard Categories</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hazardModules.map((module, idx) => {
              const summary = hazardCategorySummaries.find(h => h.id === module.id);
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card
                    className="glass-intense border-white/10 hover:border-white/20 p-5 h-full cursor-pointer group transition-all"
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
                    <p className="text-xs text-slate-400 mb-3 line-clamp-2">{module.description}</p>
                    {summary && (
                      <div className="space-y-2 mb-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Active Alerts</span>
                          <span className="text-white font-bold">{summary.activeAlerts}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Risk Level</span>
                          {getRiskLevelBadge(summary.riskLevel)}
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-500">Trend</span>
                          <div className="flex items-center gap-1">
                            <TrendingUp className={`w-3 h-3 ${summary.trend === 'increasing' ? 'text-red-400' : summary.trend === 'decreasing' ? 'text-green-400' : 'text-slate-400'}`} />
                            <span className={summary.trend === 'increasing' ? 'text-red-400' : summary.trend === 'decreasing' ? 'text-green-400' : 'text-slate-400'}>
                              {summary.trend}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center text-xs font-medium text-red-400 group-hover:text-red-300 transition-colors">
                      <span>View Details</span>
                      <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* District Vulnerability Summary */}
      <section className="py-16 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">District Vulnerability Summary</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">District</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Risk Level</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Alerts</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Dominant Hazards</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Trend</th>
                </tr>
              </thead>
              <tbody>
                {districtRiskProfiles.sort((a, b) => a.activeAlerts - b.activeAlerts).reverse().slice(0, 10).map((district) => (
                  <tr key={district.district} className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-white">{district.district}</td>
                    <td className="py-3 px-4">{getRiskLevelBadge(district.riskLevel)}</td>
                    <td className="py-3 px-4 text-sm text-slate-300">{district.activeAlerts}</td>
                    <td className="py-3 px-4 text-xs text-slate-400">{district.dominantHazards.slice(0, 2).join(', ')}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <TrendingUp className={`w-3 h-3 ${district.riskTrend === 'increasing' ? 'text-red-400' : district.riskTrend === 'decreasing' ? 'text-green-400' : 'text-slate-400'}`} />
                        <span className={`text-xs ${district.riskTrend === 'increasing' ? 'text-red-400' : district.riskTrend === 'decreasing' ? 'text-green-400' : 'text-slate-400'}`}>
                          {district.riskTrend}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
