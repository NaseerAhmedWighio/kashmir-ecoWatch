'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  AlertTriangle, Activity, Bell, TrendingUp, ArrowRight,
  Shield, Mountain, Leaf
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const categoryCards = [
  {
    id: 'hazard-risks',
    title: 'Hazard Risks',
    description: 'Multi-hazard risk systems',
    icon: Mountain,
    color: 'from-red-500 to-orange-600',
    route: '/risk-monitoring/hazard-risks',
    moduleCount: 8,
    modules: ['Disaster Risks', 'Flood & Flash Flood', 'Landslide & Slope', 'Avalanche & Winter', 'Earthquake', 'Forest Fire', 'Glacier & Cryosphere', 'Hydrological']
  },
  {
    id: 'pollution-stress',
    title: 'Pollution & Stress',
    description: 'Environmental pressure monitoring',
    icon: Activity,
    color: 'from-emerald-500 to-green-600',
    route: '/risk-monitoring/pollution-stress',
    moduleCount: 8,
    modules: ['Environmental Monitoring', 'Air Pollution', 'Water Pollution', 'Noise Pollution', 'Soil Pollution', 'Climate Change', 'Global Warming', 'Algal Bloom']
  },
  {
    id: 'biodiversity-risks',
    title: 'Biodiversity Risks',
    description: 'Ecological vulnerability tracking',
    icon: Leaf,
    color: 'from-emerald-500 to-green-600',
    route: '/risk-monitoring/biodiversity-risks',
    moduleCount: 8,
    modules: ['Biodiversity Intelligence', 'Red Data Species', 'Human-Wildlife Conflict', 'Wildlife Mortality', 'Fish Kill', 'Bird Migration', 'Bird Mortality', 'Ecosystem Stress']
  },
  {
    id: 'response-operations',
    title: 'Response & Operations',
    description: 'Response and operational intelligence',
    icon: Shield,
    color: 'from-violet-500 to-purple-600',
    route: '/risk-monitoring/response-operations',
    moduleCount: 6,
    modules: ['Live Alerts', 'Incident Reports', 'District Risk Profiles', 'Critical Infrastructure', 'Shelters & Routes', 'Risk Dashboards']
  },
  {
    id: 'live-alerts',
    title: 'Live Alerts',
    description: 'Real-time warnings',
    icon: Bell,
    color: 'from-red-500 to-rose-600',
    route: '/risk-monitoring/live-alerts-advisories',
    moduleCount: 1,
    modules: ['Real-time Alerts', 'Weather Advisories', 'Emergency Notices']
  },
  {
    id: 'dashboards',
    title: 'Dashboards',
    description: 'Risk monitoring dashboards',
    icon: TrendingUp,
    color: 'from-violet-500 to-purple-600',
    route: '/risk-monitoring/dashboards',
    moduleCount: 1,
    modules: ['Live Dashboards', 'Risk Trends', 'Multi-hazard View', 'Analytics']
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
      <section className="relative pt-20 md:pt-28 pb-16 md:pb-12 overflow-hidden">
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

      {/* Category Cards Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Risk Intelligence Categories</h2>
                <p className="text-slate-400">Navigate through organized risk monitoring systems</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryCards.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card
                  className="glass-intense border-white/10 hover:border-white/20 transition-all p-6 h-full cursor-pointer group"
                  onClick={() => router.push(category.route)}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <category.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                        {category.title}
                      </h3>
                      <p className="text-sm text-slate-400 mt-1">
                        {category.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                        Modules
                      </span>
                      <span className="text-xs font-bold text-white bg-white/10 px-2 py-1 rounded">
                        {category.moduleCount}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {category.modules.slice(0, 3).map((module, mIdx) => (
                        <Badge key={mIdx} variant="outline" size="sm" className="text-xs border-white/10">
                          {module}
                        </Badge>
                      ))}
                      {category.modules.length > 3 && (
                        <Badge variant="outline" size="sm" className="text-xs border-white/10 text-slate-500">
                          +{category.modules.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-xs font-medium text-red-400 group-hover:text-red-300 transition-colors">
                    <span>Explore Category</span>
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
