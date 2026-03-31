'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Bell, ArrowRight,
  Map, Shield, Activity, TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const responseModules = [
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

export default function ResponseOperationsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-48 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/50 via-purple-950/30 to-slate-950" />
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
              <span className="text-white font-medium">Response & Operations</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-2xl">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <Badge variant="default" size="lg">Operational Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Response & <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">Operations</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Emergency response coordination, live alerts, incident management,
              and operational intelligence for effective risk mitigation
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-xl"
                onClick={() => router.push('/risk-monitoring/live-alerts-advisories')}
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

      {/* Response Modules Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {responseModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card
                  className="glass-light border-white/10 hover:border-purple-500/30 transition-all p-5 h-full cursor-pointer group"
                  onClick={() => router.push(module.route)}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <module.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors line-clamp-2">
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
                  <div className="flex items-center text-xs font-medium text-purple-400 group-hover:text-purple-300 transition-colors">
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
