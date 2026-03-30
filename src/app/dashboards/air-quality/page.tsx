'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import {
  Wind, Droplets, Flower, PawPrint, TrendingUp, AlertTriangle,
  ArrowRight, Download, Share2, Calendar, Filter, Activity
} from 'lucide-react';
import { motion } from 'framer-motion';
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

export default function AirQualityDashboard() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      
      {/* Page header */}
      <div className="pt-24 pb-8 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Wind className="w-5 h-5 text-slate-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Air Quality Dashboard
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Air Quality Intelligence
            </h1>
            <p className="text-slate-400 max-w-2xl text-lg">
              Real-time AQI monitoring, trend analysis, and health advisories across Kashmir
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-white/20 text-white" icon={<Calendar className="w-4 h-4" />}>
              Date Range
            </Button>
            <Button variant="outline" size="sm" className="border-white/20 text-white" icon={<Filter className="w-4 h-4" />}>
              Filters
            </Button>
            <Button variant="outline" size="sm" className="border-white/20 text-white" icon={<Download className="w-4 h-4" />}>
              Export
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Dashboard content */}
      <div className="container mx-auto px-6 pb-12 space-y-6">
        {/* Metric cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass-light border-white/5 p-6" padding="none">
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
            <Card className="glass-light border-white/5 p-6" padding="none">
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
            <Card className="glass-light border-white/5 p-6" padding="none">
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
            <Card className="glass-light border-white/5 p-6" padding="none">
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

        {/* Main chart */}
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

        {/* District comparison */}
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

        {/* Health advisories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="glass-light border-white/5 p-6" padding="lg">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-bold text-white">Health Advisories</h2>
            </div>
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
      </div>

      <AdvancedFooter />
    </main>
  );
}
