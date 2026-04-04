'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { TrendingUp, ArrowRight, Bell, AlertTriangle, MapPin, Activity, FileText, Shield, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { riskDashboardStats, hazardCategorySummaries, districtRiskProfiles, liveAlerts } from '@/data/risk-monitoring';
import { AlertSeverity } from '@/types/alerts';

export default function DashboardsPage() {
  const router = useRouter();

  const dashboards = [
    {
      id: 'live-alert',
      name: 'Live Alert Dashboard',
      icon: Bell,
      color: 'from-red-500 to-rose-600',
      description: 'Real-time alert feed with filtering and verification',
      route: '/risk-monitoring/live-alerts',
    },
    {
      id: 'district-risk',
      name: 'District Risk Dashboard',
      icon: MapPin,
      color: 'from-emerald-500 to-green-600',
      description: 'District-wise risk levels, trends, and operational status',
      route: '/risk-monitoring/district-risk-profiles',
    },
    {
      id: 'hazard-trend',
      name: 'Hazard Trend Dashboard',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-600',
      description: 'Hazard category trends, multi-hazard view, and analytics',
      route: '/risk-monitoring/hazard-risks',
    },
    {
      id: 'incident-volume',
      name: 'Incident Volume Dashboard',
      icon: Activity,
      color: 'from-violet-500 to-purple-600',
      description: 'Incident frequency, severity distribution, and response tracking',
      route: '/risk-monitoring/environmental-incident-risk',
    },
    {
      id: 'advisory-closure',
      name: 'Advisory & Closure Dashboard',
      icon: FileText,
      color: 'from-indigo-500 to-blue-600',
      description: 'Active advisories, closures, and emergency route status',
      route: '/risk-monitoring/shelters-closures-emergency-routes',
    },
    {
      id: 'response-readiness',
      name: 'Response Readiness Dashboard',
      icon: Shield,
      color: 'from-cyan-500 to-teal-600',
      description: 'Infrastructure status, resource availability, and response capacity',
      route: '/risk-monitoring/critical-infrastructure-response',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      <section className="relative pt-20 md:pt-48 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-950/50 via-rose-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <a href="/risk-monitoring" className="hover:text-white transition-colors">Risk & Monitoring</a>
              <span>/</span>
              <span className="text-white font-medium">Dashboards</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-2xl">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <Badge variant="outline" size="lg" className="border-pink-500/30 text-pink-400">Live Risk & Incident Dashboards</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Risk <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">Dashboards</span>
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              Comprehensive dashboard suite for live alert monitoring, district risk tracking, hazard trend analysis, 
              incident volume assessment, advisory management, and response readiness evaluation.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-xl" onClick={() => router.push('/risk-monitoring/live-alerts')}>
                <Bell className="w-5 h-5 mr-2" />Live Alerts
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => router.push('/risk-monitoring')}>Back to Overview</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Statistics */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { label: 'Active Alerts', value: riskDashboardStats.totalActiveAlerts, color: 'text-red-400' },
              { label: 'Critical', value: riskDashboardStats.criticalAlerts, color: 'text-red-500' },
              { label: 'Incidents Today', value: riskDashboardStats.incidentsToday, color: 'text-orange-400' },
              { label: 'Advisories', value: riskDashboardStats.advisoriesIssued, color: 'text-amber-400' },
              { label: 'Closures', value: riskDashboardStats.closuresActive, color: 'text-blue-400' },
            ].map((stat, idx) => (
              <div key={stat.label} className="text-center">
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Cards */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboards.map((dashboard, idx) => (
              <motion.div key={dashboard.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                <Card
                  className="glass-intense border-white/10 hover:border-white/20 p-6 cursor-pointer transition-all group"
                  onClick={() => router.push(dashboard.route)}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${dashboard.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <dashboard.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white group-hover:text-pink-400 transition-colors mb-1">
                        {dashboard.name}
                      </h3>
                      <p className="text-xs text-slate-400">{dashboard.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs font-medium text-pink-400 group-hover:text-pink-300 transition-colors">
                    <span>Open Dashboard</span>
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Alert Trend Chart Placeholder */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-pink-400" />
            <h2 className="text-2xl font-bold text-white">Alert Trend (Last 7 Days)</h2>
          </div>
          <Card className="glass-intense border-white/10 p-6">
            <div className="h-64 flex items-end justify-around gap-2">
              {riskDashboardStats.trendData.alertsLast7Days.map((count, idx) => {
                const max = Math.max(...riskDashboardStats.trendData.alertsLast7Days);
                const height = (count / max) * 100;
                const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="text-xs text-slate-400 mb-1">{count}</div>
                    <div
                      className="w-full bg-gradient-to-t from-red-500 to-orange-500 rounded-t transition-all hover:from-red-400 hover:to-orange-400"
                      style={{ height: `${height}%` }}
                    />
                    <div className="text-xs text-slate-500">{days[idx]}</div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </section>

      {/* Incident Volume Chart */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-6 h-6 text-violet-400" />
            <h2 className="text-2xl font-bold text-white">Incident Volume (Last 7 Days)</h2>
          </div>
          <Card className="glass-intense border-white/10 p-6">
            <div className="h-64 flex items-end justify-around gap-2">
              {riskDashboardStats.trendData.incidentsLast7Days.map((count, idx) => {
                const max = Math.max(...riskDashboardStats.trendData.incidentsLast7Days);
                const height = (count / max) * 100;
                const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="text-xs text-slate-400 mb-1">{count}</div>
                    <div
                      className="w-full bg-gradient-to-t from-violet-500 to-purple-500 rounded-t transition-all hover:from-violet-400 hover:to-purple-400"
                      style={{ height: `${height}%` }}
                    />
                    <div className="text-xs text-slate-500">{days[idx]}</div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
