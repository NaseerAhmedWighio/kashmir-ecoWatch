'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  BarChart3, Map, TrendingUp, Droplet, Waves, Thermometer,
  Activity, ArrowRight, Eye, Database, AlertTriangle, LineChart
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const dashboardModules = [
  {
    title: 'Water Quality Dashboard',
    description: 'Real-time water quality parameters across lakes, rivers, and springs with trend analysis',
    icon: Droplet,
    color: 'from-cyan-500 to-blue-600',
    metrics: ['pH Levels', 'Dissolved Oxygen', 'Turbidity', 'Contaminants'],
    status: 'Live' as const,
    statusVariant: 'success' as const,
    route: '/dashboards/water-quality',
  },
  {
    title: 'Hydrological Monitoring',
    description: 'Flow rates, water levels, and discharge monitoring across all water systems',
    icon: Waves,
    color: 'from-blue-500 to-indigo-600',
    metrics: ['Flow Velocity', 'Discharge Rate', 'Water Level', 'Seasonal Variation'],
    status: 'Live' as const,
    statusVariant: 'success' as const,
  },
  {
    title: 'Lake Health Scorecard',
    description: 'Comprehensive health assessment of all Kashmir lakes with multi-metric scoring',
    icon: Thermometer,
    color: 'from-emerald-500 to-teal-600',
    metrics: ['Trophic State', 'Biodiversity Index', 'Pollution Load', 'Recovery Rate'],
    status: 'Live' as const,
    statusVariant: 'success' as const,
  },
  {
    title: 'Algal Bloom Intelligence',
    description: 'Early warning and monitoring of harmful algal blooms across water bodies',
    icon: Activity,
    color: 'from-amber-500 to-orange-600',
    metrics: ['Chlorophyll-a', 'Cyanobacteria', ' bloom Risk', 'Toxin Levels'],
    status: 'Live' as const,
    statusVariant: 'success' as const,
  },
  {
    title: 'Flood Risk & Forecasting',
    description: 'Real-time flood risk assessment with water level monitoring and forecast models',
    icon: AlertTriangle,
    color: 'from-red-500 to-rose-600',
    metrics: ['Risk Zones', 'Water Level', 'Precipitation', 'Forecast Window'],
    status: 'Beta' as const,
    statusVariant: 'warning' as const,
  },
  {
    title: 'Watershed Intelligence',
    description: 'Catchment-scale analysis of water availability, quality, and ecological health',
    icon: Map,
    color: 'from-green-500 to-emerald-600',
    metrics: ['Catchment Area', 'Runoff Volume', 'Groundwater Recharge', 'Land Use'],
    status: 'Live' as const,
    statusVariant: 'success' as const,
  },
];

const performanceMetrics = [
  { label: 'Monitoring Stations', value: '234', trend: '+12', icon: Database },
  { label: 'Daily Samples', value: '1,847', trend: '+8%', icon: BarChart3 },
  { label: 'Active Alerts', value: '7', trend: '-3', icon: AlertTriangle },
  { label: 'Data Points', value: '2.4M', trend: '+15%', icon: LineChart },
];

const districtWaterStress = [
  { district: 'Srinagar', stress: 78, status: 'High' as const, aqi: 187, waterQuality: 'Poor' as const },
  { district: 'Anantnag', stress: 62, status: 'Moderate' as const, aqi: 142, waterQuality: 'Moderate' as const },
  { district: 'Baramulla', stress: 48, status: 'Low' as const, aqi: 98, waterQuality: 'Good' as const },
  { district: 'Pulwama', stress: 71, status: 'High' as const, aqi: 156, waterQuality: 'Poor' as const },
  { district: 'Budgam', stress: 52, status: 'Moderate' as const, aqi: 118, waterQuality: 'Moderate' as const },
  { district: 'Ganderbal', stress: 45, status: 'Low' as const, aqi: 76, waterQuality: 'Good' as const },
  { district: 'Kupwara', stress: 38, status: 'Low' as const, aqi: 64, waterQuality: 'Good' as const },
  { district: 'Shopian', stress: 42, status: 'Low' as const, aqi: 71, waterQuality: 'Good' as const },
];

export default function WaterSystemsDashboardsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="relative pt-20 sm:pt-24 md:pt-28 lg:pt-48 pb-4 sm:pb-8 md:pb-12 lg:pb-20 overflow-hidden">
        
        <div className="absolute inset-0 bg-[#160C27]" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-6 h-6 text-cyan-400" />
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-400">
                Water Systems Analytics
              </span>
            </div>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 sm:mb-6 leading-tight tracking-tight">
              Water Dashboards
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Real-time analytics, trends, and heatmaps for hydrological monitoring, water quality tracking, 
              and aquatic ecosystem health across Kashmir
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-cyan-600 to-blue-500"
                icon={<BarChart3 className="w-5 h-5" />}
                onClick={() => router.push('/dashboards/water-quality')}
              >
                Open Water Quality Dashboard
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white"
                icon={<Database className="w-5 h-5" />}
                onClick={() => router.push('/water-systems/lakes')}
              >
                Lake Health Scorecard
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-intense border-white/10 p-6" padding="none">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {performanceMetrics.map((metric, idx) => (
                <div key={idx} className="text-center p-4 border-r border-white/5 last:border-r-0">
                  <metric.icon className="w-5 h-5 text-slate-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white tabular-nums">
                    {metric.value}
                  </div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">
                    {metric.label}
                  </div>
                  <div className="text-xs text-emerald-400 mt-1">
                    {metric.trend} this month
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-white mb-8">Available Dashboards</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardModules.map((dash, idx) => (
              <motion.div
                key={dash.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
              >
                <Card className="glass border-white/10 p-6 h-full hover:border-white/20 transition-all duration-300 group cursor-pointer"
                  onClick={() => dash.route && router.push(dash.route)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${dash.color}`}>
                      <dash.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant={dash.statusVariant} size="sm">
                      {dash.status}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{dash.title}</h3>
                  <p className="text-sm text-slate-400 mb-4">{dash.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {dash.metrics.map((metric) => (
                      <span key={metric}
                        className="text-xs px-2 py-1 rounded-full bg-white/5 text-slate-400 border border-white/10"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center text-sm text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>View Dashboard</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass border-white/10 p-6">
            <h2 className="text-xl font-bold text-white mb-4">District Water Stress Index</h2>
            <p className="text-sm text-slate-400 mb-6">Composite water stress scores across Kashmir districts</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 text-slate-400 font-medium">District</th>
                    <th className="text-right py-3 text-slate-400 font-medium">Stress Index</th>
                    <th className="text-right py-3 text-slate-400 font-medium">Status</th>
                    <th className="text-right py-3 text-slate-400 font-medium">AQI</th>
                    <th className="text-right py-3 text-slate-400 font-medium">Water Quality</th>
                  </tr>
                </thead>
                <tbody>
                  {districtWaterStress.map((d) => (
                    <tr key={d.district} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      <td className="py-3 text-white font-medium">{d.district}</td>
                      <td className="py-3 text-right tabular-nums">
                        <span className={`${d.stress > 60 ? 'text-red-400' : d.stress > 50 ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {d.stress}/100
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <Badge variant={d.stress > 60 ? 'danger' : d.stress > 50 ? 'warning' : 'success'} size="sm">
                          {d.status}
                        </Badge>
                      </td>
                      <td className="py-3 text-right text-white tabular-nums">{d.aqi}</td>
                      <td className="py-3 text-right">
                        <Badge variant={d.waterQuality === 'Good' ? 'success' : d.waterQuality === 'Moderate' ? 'warning' : 'danger'} size="sm">
                          {d.waterQuality}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>
      </div>

      
    </main>
  );
}
