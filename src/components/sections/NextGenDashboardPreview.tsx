'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  LineChart, Line, BarChart, Bar, AreaChart, Area, ComposedChart,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
  ScatterChart, Scatter, Cell
} from 'recharts';
import { 
  Wind, Droplets, Flower, PawPrint, TrendingUp, ArrowRight,
  AlertTriangle, Activity, Zap, Target
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  airQualityData, 
  waterQualityData, 
  bloomActivityData, 
  sightingActivityData,
  districtComparisonData 
} from '@/lib/data';

const chartColors = {
  forest: { primary: '#10b981', secondary: '#34d399', glow: 'rgba(16, 185, 129, 0.3)' },
  glacier: { primary: '#0ea5e9', secondary: '#38bdf8', glow: 'rgba(14, 165, 233, 0.3)' },
  amber: { primary: '#f59e0b', secondary: '#fbbf24', glow: 'rgba(245, 158, 11, 0.3)' },
  purple: { primary: '#a855f7', secondary: '#c084fc', glow: 'rgba(168, 85, 247, 0.3)' },
  red: { primary: '#ef4444', secondary: '#f87171', glow: 'rgba(239, 68, 68, 0.3)' },
};

export function NextGenDashboardPreview() {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-5 h-5 text-purple-400 signal-pulse" />
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Monitoring Intelligence
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                Advanced Dashboard Previews
              </h2>
              <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
                Real-time environmental monitoring with trend analysis, anomaly detection, 
                predictive modeling, and spatial intelligence integration.
              </p>
            </div>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:border-forest-400" icon={<ArrowRight className="w-5 h-5" />}>
              All Dashboards
            </Button>
          </div>
        </motion.div>

        {/* Dashboard grid - asymmetric layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Air Quality - Large card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="glass-light border-white/5 h-full" padding="lg">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-500 to-slate-700 text-white flex items-center justify-center shadow-lg">
                    <Wind className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Air Quality Intelligence</h3>
                    <p className="text-sm text-slate-400">AQI trends across monitoring stations</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="warning" size="sm">Moderate</Badge>
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white" icon={<ArrowRight className="w-4 h-4" />} />
                </div>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={airQualityData}>
                    <defs>
                      <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={chartColors.forest.primary} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={chartColors.forest.primary} stopOpacity={0} />
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
                    <ReferenceLine y={100} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Threshold', fill: '#ef4444', fontSize: 12 }} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={chartColors.forest.primary}
                      strokeWidth={3}
                      fill="url(#aqiGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/5">
                {[
                  { label: 'Current AQI', value: '156', status: 'moderate' },
                  { label: '24h Change', value: '+12%', status: 'warning' },
                  { label: 'Weekly Avg', value: '142', status: 'normal' },
                  { label: 'Stations', value: '24', status: 'active' },
                ].map((metric, idx) => (
                  <div key={idx}>
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">{metric.label}</div>
                    <div className="text-2xl font-bold text-white">{metric.value}</div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Water Quality */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="glass-light border-white/5 h-full" padding="lg">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-glacier-500 to-glacier-700 text-white flex items-center justify-center shadow-lg glow-glacier">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Water Quality pH</h3>
                    <p className="text-sm text-slate-400">Major water bodies</p>
                  </div>
                </div>
                <Badge variant="info" size="sm">Normal</Badge>
              </div>

              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={waterQualityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                    <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#64748b' }} stroke="#64748b" />
                    <YAxis domain={[6, 8]} tick={{ fontSize: 12, fill: '#64748b' }} stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                      }}
                    />
                    <ReferenceLine y={7} stroke="#10b981" strokeDasharray="3 3" />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={chartColors.glacier.primary}
                      strokeWidth={3}
                      dot={{ fill: chartColors.glacier.primary, r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 pt-6 border-t border-white/5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-slate-500 uppercase mb-1">Avg pH Level</div>
                    <div className="text-2xl font-bold text-white">7.1</div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-forest-400" icon={<ArrowRight className="w-4 h-4" />} />
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Bloom Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="glass-light border-white/5 h-full" padding="lg">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center shadow-lg">
                    <Flower className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Bloom Activity</h3>
                    <p className="text-sm text-slate-400">Seasonal flowering patterns</p>
                  </div>
                </div>
                <Badge variant="success" size="sm">Peak Season</Badge>
              </div>

              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={bloomActivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                    <XAxis dataKey="label" tick={{ fontSize: 12, fill: '#64748b' }} stroke="#64748b" />
                    <YAxis tick={{ fontSize: 12, fill: '#64748b' }} stroke="#64748b" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                      }}
                    />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {bloomActivityData.map((entry, index) => (
                        <Cell key={index} fill={index === 2 ? chartColors.amber.primary : `${chartColors.amber.primary}66`} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 pt-6 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-slate-400">Active zones: <strong className="text-white">67</strong></span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Sighting Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="glass-light border-white/5 h-full" padding="lg">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-700 text-white flex items-center justify-center shadow-lg">
                    <PawPrint className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Sighting Activity</h3>
                    <p className="text-sm text-slate-400">Wildlife observations</p>
                  </div>
                </div>
                <Badge variant="info" size="sm">High Activity</Badge>
              </div>

              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={sightingActivityData}>
                    <defs>
                      <linearGradient id="sightingGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={chartColors.purple.primary} stopOpacity={0.4} />
                        <stop offset="95%" stopColor={chartColors.purple.primary} stopOpacity={0} />
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
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={chartColors.purple.primary}
                      strokeWidth={3}
                      fill="url(#sightingGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 pt-6 border-t border-white/5">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-slate-400">Total: <strong className="text-white">4,521</strong></span>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* District Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="glass-light border-white/5 h-full" padding="lg">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-forest-500 to-forest-700 text-white flex items-center justify-center shadow-lg glow-forest">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">District Ecological Scorecards</h3>
                    <p className="text-sm text-slate-400">Environmental health index comparison</p>
                  </div>
                </div>
                <Badge variant="success" size="sm">Good Avg: 77.7</Badge>
              </div>

              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={districtComparisonData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                    <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12, fill: '#64748b' }} stroke="#64748b" />
                    <YAxis dataKey="label" type="category" tick={{ fontSize: 12, fill: '#64748b' }} stroke="#64748b" width={80} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(15, 23, 42, 0.95)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                      }}
                    />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]} fill={chartColors.forest.primary} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/5">
                {[
                  { label: 'Highest', district: 'Ganderbal', score: 88 },
                  { label: 'Lowest', district: 'Baramulla', score: 68 },
                  { label: 'Most Improved', district: 'Anantnag', score: '+12%' },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="text-xs text-slate-500 uppercase mb-1">{item.label}</div>
                    <div className="text-sm text-white font-medium">{item.district}</div>
                    <div className="text-lg font-bold text-forest-400">{item.score}</div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
