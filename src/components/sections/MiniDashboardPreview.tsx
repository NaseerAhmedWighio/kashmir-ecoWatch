'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  AreaChart, 
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { 
  Wind, 
  Droplets, 
  Flower, 
  PawPrint, 
  TrendingUp, 
  ArrowRight,
  AlertTriangle
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
  forest: { primary: '#16a34a', secondary: '#86efac' },
  glacier: { primary: '#0284c7', secondary: '#7dd3fc' },
  amber: { primary: '#d97706', secondary: '#fcd34d' },
  purple: { primary: '#9333ea', secondary: '#d8b4fe' },
  slate: { primary: '#475569', secondary: '#94a3b8' },
};

export function MiniDashboardPreview() {
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Monitoring Intelligence
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Dashboard Previews
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
                Real-time environmental monitoring dashboards with trend analysis, 
                anomaly detection, and spatial intelligence.
              </p>
            </div>
            <Button size="lg" variant="outline" icon={<ArrowRight className="w-5 h-5" />}>
              View All Dashboards
            </Button>
          </div>
        </motion.div>

        {/* Dashboard grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Air Quality Trend */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card padding="lg" className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-500 to-slate-700 text-white flex items-center justify-center">
                      <Wind className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Air Quality Trend</CardTitle>
                      <CardDescription className="text-xs">AQI average (6 months)</CardDescription>
                    </div>
                  </div>
                  <Badge variant="warning" size="sm">Moderate</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={airQualityData}>
                      <defs>
                        <linearGradient id="aqiGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={chartColors.slate.primary} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={chartColors.slate.primary} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                      <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="#64748b" />
                      <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(15, 23, 42, 0.9)',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#fff',
                        }}
                      />
                      <ReferenceLine y={100} stroke="#ef4444" strokeDasharray="3 3" />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke={chartColors.slate.primary}
                        strokeWidth={2}
                        fill="url(#aqiGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-amber-500" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Current AQI: <strong className="text-slate-900 dark:text-white">156</strong>
                    </span>
                  </div>
                  <button className="text-sm font-medium text-forest-600 dark:text-forest-400 hover:text-forest-700">
                    Details →
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Water Quality pH */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card padding="lg" className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-glacier-500 to-glacier-700 text-white flex items-center justify-center">
                      <Droplets className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Water Quality pH</CardTitle>
                      <CardDescription className="text-xs">Major water bodies</CardDescription>
                    </div>
                  </div>
                  <Badge variant="info" size="sm">Normal</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={waterQualityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                      <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="#64748b" />
                      <YAxis domain={[6, 8]} tick={{ fontSize: 12 }} stroke="#64748b" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(15, 23, 42, 0.9)',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#fff',
                        }}
                      />
                      <ReferenceLine y={7} stroke="#22c55e" strokeDasharray="3 3" />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={chartColors.glacier.primary}
                        strokeWidth={2}
                        dot={{ fill: chartColors.glacier.primary, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Avg pH: <strong className="text-slate-900 dark:text-white">7.1</strong>
                    </span>
                  </div>
                  <button className="text-sm font-medium text-forest-600 dark:text-forest-400 hover:text-forest-700">
                    Details →
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Bloom Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card padding="lg" className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 text-white flex items-center justify-center">
                      <Flower className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Bloom Activity</CardTitle>
                      <CardDescription className="text-xs">Active bloom zones</CardDescription>
                    </div>
                  </div>
                  <Badge variant="success" size="sm">Peak Season</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={bloomActivityData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                      <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="#64748b" />
                      <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(15, 23, 42, 0.9)',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#fff',
                        }}
                      />
                      <Bar
                        dataKey="value"
                        fill={chartColors.amber.primary}
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Active: <strong className="text-slate-900 dark:text-white">67 zones</strong>
                    </span>
                  </div>
                  <button className="text-sm font-medium text-forest-600 dark:text-forest-400 hover:text-forest-700">
                    Details →
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Sighting Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card padding="lg" className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 text-white flex items-center justify-center">
                      <PawPrint className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Sighting Activity</CardTitle>
                      <CardDescription className="text-xs">Wildlife observations</CardDescription>
                    </div>
                  </div>
                  <Badge variant="info" size="sm">High Activity</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sightingActivityData}>
                      <defs>
                        <linearGradient id="sightingGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={chartColors.purple.primary} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={chartColors.purple.primary} stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                      <XAxis dataKey="label" tick={{ fontSize: 12 }} stroke="#64748b" />
                      <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(15, 23, 42, 0.9)',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#fff',
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke={chartColors.purple.primary}
                        strokeWidth={2}
                        fill="url(#sightingGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Total: <strong className="text-slate-900 dark:text-white">4,521</strong>
                    </span>
                  </div>
                  <button className="text-sm font-medium text-forest-600 dark:text-forest-400 hover:text-forest-700">
                    Details →
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* District Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card padding="lg" className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-forest-500 to-forest-700 text-white flex items-center justify-center">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base">District Scorecards</CardTitle>
                      <CardDescription className="text-xs">Environmental health index</CardDescription>
                    </div>
                  </div>
                  <Badge variant="success" size="sm">Good</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={districtComparisonData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" opacity={0.5} />
                      <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} stroke="#64748b" />
                      <YAxis dataKey="label" type="category" tick={{ fontSize: 12 }} stroke="#64748b" width={80} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(15, 23, 42, 0.9)',
                          border: 'none',
                          borderRadius: '8px',
                          color: '#fff',
                        }}
                      />
                      <Bar
                        dataKey="value"
                        fill={chartColors.forest.primary}
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Avg Score: <strong className="text-slate-900 dark:text-white">77.7</strong>
                    </span>
                  </div>
                  <button className="text-sm font-medium text-forest-600 dark:text-forest-400 hover:text-forest-700">
                    Details →
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Alert Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card padding="lg" className="h-full bg-gradient-to-br from-red-50 to-amber-50 dark:from-red-950/20 dark:to-amber-950/20">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-700 text-white flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base">Active Alerts</CardTitle>
                      <CardDescription className="text-xs">Requires attention</CardDescription>
                    </div>
                  </div>
                  <Badge variant="danger" size="sm">17 Active</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: 'Wetland Encroachment', severity: 'high', location: 'Srinagar' },
                    { title: 'Air Quality Advisory', severity: 'medium', location: 'Urban Areas' },
                    { title: 'Trail Closure', severity: 'high', location: 'Kolahoi' },
                    { title: 'Water Quality Anomaly', severity: 'medium', location: 'Jhelum' },
                  ].map((alert, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-slate-800/50"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            alert.severity === 'high' ? 'bg-red-500' : 'bg-amber-500'
                          }`} />
                          <span className="text-sm font-medium text-slate-900 dark:text-white truncate">
                            {alert.title}
                          </span>
                        </div>
                        <span className="text-xs text-slate-500">{alert.location}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400" />
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    View All Alerts
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
