'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  AlertTriangle, Activity, Bell, Map, TrendingUp, ArrowRight,
  Shield, Droplets, Mountain, Flame, Zap, Waves
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const riskModules = [
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

const monitoringModules = [
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
    id: 'live-alerts-advisories',
    title: 'Live Alerts & Advisories',
    description: 'Real-time hazard alerts, weather advisories, and emergency notifications',
    icon: Bell,
    color: 'from-red-500 to-rose-600',
    route: '/risk-monitoring/live-alerts-advisories',
    features: ['Real-time Alerts', 'Weather Advisories', 'Emergency Notices', 'SMS Integration']
  },
  {
    id: 'incident-reports',
    title: 'Incident Reports',
    description: 'Documented hazard incidents, damage assessments, and response records',
    icon: Map,
    color: 'from-amber-500 to-orange-600',
    route: '/risk-monitoring/incident-reports',
    features: ['Incident Database', 'Damage Reports', 'Response Records', 'Lessons Learned']
  },
  {
    id: 'district-risk-profiles',
    title: 'District Risk Profiles',
    description: 'District-level risk assessments, vulnerability profiles, and preparedness status',
    icon: Shield,
    color: 'from-indigo-500 to-purple-600',
    route: '/risk-monitoring/district-risk-profiles',
    features: ['District Profiles', 'Risk Scores', 'Vulnerability', 'Preparedness Status']
  },
  {
    id: 'critical-infrastructure-response',
    title: 'Critical Infrastructure & Response',
    description: 'Critical facility monitoring, emergency response coordination, and resource tracking',
    icon: Activity,
    color: 'from-blue-500 to-indigo-600',
    route: '/risk-monitoring/critical-infrastructure-response',
    features: ['Facility Monitoring', 'Response Teams', 'Resource Tracking', 'Coordination']
  },
  {
    id: 'shelters-closures-emergency-routes',
    title: 'Shelters, Closures & Emergency Routes',
    description: 'Emergency shelter locations, road closures, and evacuation route planning',
    icon: Map,
    color: 'from-green-500 to-emerald-600',
    route: '/risk-monitoring/shelters-closures-emergency-routes',
    features: ['Shelter Maps', 'Road Closures', 'Evacuation Routes', 'Emergency Planning']
  },
  {
    id: 'dashboards',
    title: 'Risk Dashboards',
    description: 'Comprehensive risk monitoring dashboards with real-time data and trends',
    icon: TrendingUp,
    color: 'from-violet-500 to-purple-600',
    route: '/risk-monitoring/dashboards',
    features: ['Live Dashboards', 'Risk Trends', 'Multi-hazard View', 'Analytics']
  },
];

const stats = [
  { label: 'Active Alerts', value: '23', trend: 'up', trendValue: 8 },
  { label: 'Risk Zones Monitored', value: '147', trend: 'up', trendValue: 12 },
  { label: 'Incidents (YTD)', value: '89', trend: 'down', trendValue: 15 },
  { label: 'Districts Covered', value: '20', trend: 'up', trendValue: 5 },
];

export default function RiskMonitoringPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/50 via-orange-950/30 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-2xl">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <Badge variant="danger" size="lg">Multi-Hazard Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Risk & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Monitoring</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Comprehensive multi-hazard risk monitoring, early warning systems, and emergency response coordination
              for natural and environmental hazards across Kashmir
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white shadow-xl"
                onClick={() => router.push('/risk-monitoring/live-alerts-advisories')}
              >
                <Bell className="w-5 h-5 mr-2" />
                View Active Alerts
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                onClick={() => router.push('/risk-monitoring/dashboards')}
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Risk Dashboard
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-slate-400 mb-1">{stat.label}</div>
                <div className={`text-xs flex items-center justify-center gap-1 ${
                  stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  <TrendingUp className="w-3 h-3" />
                  {stat.trendValue}% this month
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Modules */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-3">Risk Monitoring</h2>
            <p className="text-slate-400">Natural hazard risk assessment and monitoring systems</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {riskModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card
                  className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 h-full cursor-pointer group"
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
                    <span>Learn More</span>
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Monitoring Modules */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-3">Environmental Monitoring</h2>
            <p className="text-slate-400">Real-time monitoring, alerts, and response coordination</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {monitoringModules.map((module, index) => (
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

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <Card className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border-white/10 overflow-hidden">
            <div className="relative p-12 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-orange-600/20" />
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Report a Hazard or Emergency
                </h2>
                <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
                  Help improve risk monitoring by reporting hazards, incidents,
                  and emergency situations in your area
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white shadow-xl"
                    onClick={() => router.push('/report-issue')}
                  >
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Report Hazard
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/5"
                    onClick={() => router.push('/risk-monitoring/live-alerts-advisories')}
                  >
                    <Bell className="w-5 h-5 mr-2" />
                    View Alerts
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
