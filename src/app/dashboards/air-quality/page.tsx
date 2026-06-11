'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import {
  Wind, Droplets, Flower, PawPrint, TrendingUp, AlertTriangle,
  ArrowRight, Download, Share2, Calendar, Filter, Activity,
  BarChart3, Database
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const airQualityData = [
  { label: 'Jan', value: 142 },
  { label: 'Feb', value: 128 },
  { label: 'Mar', value: 156 },
  { label: 'Apr', value: 98 },
  { label: 'May', value: 76 },
  { label: 'Jun', value: 68 },
];

const waterQualityData = [
  { label: 'Jan', value: 7.2 },
  { label: 'Feb', value: 7.4 },
  { label: 'Mar', value: 6.8 },
  { label: 'Apr', value: 7.1 },
  { label: 'May', value: 7.3 },
  { label: 'Jun', value: 7.0 },
];

const subPageLinks = [
  { label: 'Air Pollution Monitoring', href: '/environmental-monitoring/air-pollution', icon: Wind },
  { label: 'Air Pollution Risk', href: '/risk-monitoring/air-pollution', icon: AlertTriangle },
  { label: 'Environmental Dashboards', href: '/environmental-monitoring/dashboards', icon: BarChart3 },
  { label: 'Risk Monitoring Hub', href: '/risk-monitoring/dashboards', icon: TrendingUp },
  { label: 'Environmental Health', href: '/environmental-monitoring/environmental-health', icon: Database },
  { label: 'Monitoring Overview', href: '/monitoring-overview', icon: Activity },
  { label: 'Water Quality', href: '/environmental-monitoring/drinking-water', icon: Droplets },
  { label: 'Alerts & Advisories', href: '/alerts', icon: Filter },
];

export default function AirQualityDashboard() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-slate-950">{/* Page header */}
      <div className="relative pt-20 sm:pt-24 md:pt-28 lg:pt-48 pb-4 sm:pb-8 md:pb-12 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#160C27]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <Wind className="w-5 h-5 text-emerald-400" />
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-400">
                Air Quality Intelligence
              </span>
            </div>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight tracking-tight">
              Air Quality Intelligence
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Real-time AQI monitoring, trend analysis, and health advisories across Kashmir
            </p>
          </motion.div>
        </div>
      </div>

      {/* Dashboard content */}
      <div className="container mx-auto px-6 py-12 space-y-16">
        {/* Metric cards */}
        <section>
          <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Air Quality Metrics</h2>
              <p className="text-sm text-slate-400">Real-time air quality measurements across monitoring stations</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass-light border-white/5" padding="md">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm text-slate-500 uppercase mb-1">Current AQI</div>
                  <div className="text-4xl font-bold text-white mb-2">156</div>
                  <Badge variant="warning">Moderate</Badge>
                </div>
                <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center">
                  <Wind className="w-6 h-6 text-slate-400" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="w-4 h-4 text-amber-400" />
                <span className="text-slate-400">+12% from yesterday</span>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-light border-white/5" padding="md">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm text-slate-500 uppercase mb-1">PM2.5</div>
                  <div className="text-4xl font-bold text-white mb-2">68</div>
                  <Badge variant="warning">Elevated</Badge>
                </div>
                <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-slate-400" />
                </div>
              </div>
              <div className="text-sm text-slate-400">
                Safe limit: 25 μg/m³
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-light border-white/5" padding="md">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm text-slate-500 uppercase mb-1">PM10</div>
                  <div className="text-4xl font-bold text-white mb-2">142</div>
                  <Badge variant="warning">Elevated</Badge>
                </div>
                <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-slate-400" />
                </div>
              </div>
              <div className="text-sm text-slate-400">
                Safe limit: 50 μg/m³
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-light border-white/5" padding="md">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-sm text-slate-500 uppercase mb-1">Active Stations</div>
                  <div className="text-4xl font-bold text-white mb-2">24</div>
                  <Badge variant="success">Online</Badge>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-900/50 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-emerald-400" />
                </div>
              </div>
              <div className="text-sm text-slate-400">
                2 stations offline
              </div>
            </Card>
          </motion.div>
        </div>
        </section>

        {/* Main chart */}
        <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass-light border-white/5 p-6" padding="lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">AQI Trend (6 Months)</h2>
                <p className="text-sm text-slate-400">Average AQI across all monitoring stations</p>
              </div>
              <Button variant="outline" size="sm" className="border-white/20 text-white" icon={<ArrowRight className="w-4 h-4" />}>
                Full Analysis
              </Button>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={airQualityData}>
                  <defs>
                    <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                  <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#64748b' }} stroke="#64748b" />
                  <YAxis tick={{ fontSize: 12, fill: '#64748b' }} stroke="#64748b" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.95)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      backdropFilter: 'blur(20px)',
                    }}
                  />
                  <ReferenceLine y={100} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Moderate Threshold', fill: '#ef4444', fontSize: 12 }} />
                  <ReferenceLine y={200} stroke="#dc2626" strokeDasharray="3 3" label={{ value: 'Poor Threshold', fill: '#dc2626', fontSize: 12 }} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#f59e0b"
                    strokeWidth={3}
                    fill="url(#aqiGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
        </section>

        {/* District comparison */}
        <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="glass-light border-white/5 p-6" padding="lg">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">District-wise AQI</h2>
                <p className="text-sm text-slate-400">Current air quality across districts</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { district: 'Srinagar', aqi: 156, status: 'Moderate' },
                { district: 'Anantnag', aqi: 78, status: 'Good' },
                { district: 'Baramulla', aqi: 134, status: 'Moderate' },
                { district: 'Kulgam', aqi: 92, status: 'Satisfactory' },
                { district: 'Pulwama', aqi: 118, status: 'Moderate' },
                { district: 'Ganderbal', aqi: 68, status: 'Good' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl glass-light border border-white/5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-white">{item.district}</span>
                    <Badge variant={item.aqi > 100 ? 'warning' : 'success'} size="sm">
                      {item.status}
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{item.aqi}</div>
                  <div className="text-xs text-slate-500">AQI</div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
        </section>

        {/* Health advisories */}
        <section>
          <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Health Advisories</h2>
              <p className="text-sm text-slate-400">Air quality health recommendations for all groups</p>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
          <Card className="glass-light border-white/5" padding="lg">
            <div className="space-y-4">
              {[
                { level: 'Sensitive Groups', advice: 'Limit prolonged outdoor exertion', severity: 'medium' },
                { level: 'General Public', advice: 'Unusually sensitive individuals should consider reducing outdoor activity', severity: 'low' },
                { level: 'Children & Elderly', advice: 'Reduce prolonged or heavy outdoor exertion', severity: 'medium' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border-l-4 ${
                    item.severity === 'high' ? 'bg-red-500/10 border-red-500' :
                    item.severity === 'medium' ? 'bg-amber-500/10 border-amber-500' :
                    'bg-blue-500/10 border-blue-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white mb-1">{item.level}</div>
                      <div className="text-sm text-slate-400">{item.advice}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
        </section>

        {/* Export / Share */}
        <section>
          <Card className="glass-intense border-white/10 bg-gradient-to-r from-amber-900/20 to-yellow-900/20" padding="lg">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Export & Share Analytics</h3>
                <p className="text-sm text-slate-400">Download air quality data reports and share insights</p>
              </div>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => alert('Export feature coming soon')}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Export PDF Report
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => alert('Export feature coming soon')}>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Download CSV
                </Button>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => alert('Share feature coming soon')}>
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Share Dashboard
                </Button>
              </div>
            </div>
          </Card>
        </section>

        {/* Sub-page links */}
        <section>
          <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center">
              <Wind className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Explore Air Quality</h2>
              <p className="text-sm text-slate-400">Navigate to specialized air quality pages</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {subPageLinks.map((link, idx) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04 }}
                onClick={() => router.push(link.href)}
                className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-emerald-500/30 transition-all text-left group"
              >
                <link.icon className="w-5 h-5 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-sm font-semibold text-white">{link.label}</div>
                <div className="flex items-center gap-1 mt-2 text-xs text-slate-500 group-hover:text-emerald-400 transition-colors">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </motion.button>
            ))}
          </div>
        </section>

      </div>

      <AdvancedFooter />
    </main>
  );
}
