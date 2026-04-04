'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  BarChart3, Map, TrendingUp, ChevronRight, AlertTriangle,
  FileText, ArrowRight, Activity, Clock,
  MapPin, ExternalLink, Layers, PieChart,
  Eye, Database, Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const dashboardModules = [
  {
    title: 'District Comparison Dashboard',
    description: 'Side-by-side performance metrics across all Kashmir districts with trend analysis',
    icon: BarChart3,
    color: 'from-violet-500 to-purple-600',
    metrics: ['AQI', 'Water Quality', 'Waste Management', 'Infrastructure Health'],
    status: 'Live',
    statusVariant: 'success' as const,
  },
  {
    title: 'Environmental Stress Heatmap',
    description: 'Geospatial visualization of cumulative environmental stress indicators',
    icon: Layers,
    color: 'from-red-500 to-orange-600',
    metrics: ['Stress Index', 'Hotspot Detection', 'Risk Layers', 'Temporal Analysis'],
    status: 'Live',
    statusVariant: 'success' as const,
  },
  {
    title: 'Water Systems Intelligence',
    description: 'Hydrological monitoring across rivers, lakes, springs, and groundwater systems',
    icon: Database,
    color: 'from-cyan-500 to-teal-600',
    metrics: ['Flow Rates', 'Quality Parameters', 'Source Mapping', 'Contamination Tracking'],
    status: 'Live',
    statusVariant: 'success' as const,
  },
  {
    title: 'Air Quality Trends',
    description: 'Historical and real-time air quality analysis with forecasting models',
    icon: Globe,
    color: 'from-slate-500 to-gray-600',
    metrics: ['AQI Trends', 'Pollutant Breakdown', 'Source Attribution', 'Health Impact'],
    status: 'Live',
    statusVariant: 'success' as const,
  },
  {
    title: 'Waste Management Tracker',
    description: 'Solid waste, bio-waste, and sewage treatment performance monitoring',
    icon: PieChart,
    color: 'from-emerald-500 to-green-600',
    metrics: ['Collection Rates', 'Treatment Capacity', 'Dumping Sites', 'Recycling Index'],
    status: 'Beta',
    statusVariant: 'warning' as const,
  },
  {
    title: 'Infrastructure Asset Registry',
    description: 'Complete inventory of water infrastructure with condition assessment',
    icon: Eye,
    color: 'from-indigo-500 to-blue-600',
    metrics: ['Asset Count', 'Health Index', 'Maintenance Status', 'Failure Risk'],
    status: 'Live',
    statusVariant: 'success' as const,
  },
];

const districtAggregateData = [
  { district: 'Srinagar', overallStress: 78, stressVariant: 'danger' as const, aqi: 187, waterQuality: 'Poor', wasteMgmt: '72%', infraHealth: '68%', incidentCount: 87 },
  { district: 'Anantnag', overallStress: 62, stressVariant: 'warning' as const, aqi: 142, waterQuality: 'Moderate', wasteMgmt: '65%', infraHealth: '65%', incidentCount: 43 },
  { district: 'Baramulla', overallStress: 48, stressVariant: 'success' as const, aqi: 98, waterQuality: 'Good', wasteMgmt: '68%', infraHealth: '78%', incidentCount: 28 },
  { district: 'Pulwama', overallStress: 71, stressVariant: 'danger' as const, aqi: 156, waterQuality: 'Poor', wasteMgmt: '61%', infraHealth: '58%', incidentCount: 54 },
  { district: 'Budgam', overallStress: 52, stressVariant: 'warning' as const, aqi: 118, waterQuality: 'Moderate', wasteMgmt: '70%', infraHealth: '68%', incidentCount: 23 },
  { district: 'Ganderbal', overallStress: 45, stressVariant: 'success' as const, aqi: 76, waterQuality: 'Good', wasteMgmt: '74%', infraHealth: '71%', incidentCount: 19 },
  { district: 'Kupwara', overallStress: 38, stressVariant: 'success' as const, aqi: 64, waterQuality: 'Good', wasteMgmt: '58%', infraHealth: '81%', incidentCount: 14 },
  { district: 'Shopian', overallStress: 42, stressVariant: 'success' as const, aqi: 71, waterQuality: 'Good', wasteMgmt: '63%', infraHealth: '62%', incidentCount: 16 },
];

const quickAnalytics = [
  {
    title: 'Environmental Stress Index',
    value: '64/100',
    status: 'Moderate-High',
    variant: 'warning' as const,
    trend: '↗ +3.2%',
    desc: 'Composite stress score across all monitored environmental domains',
  },
  {
    title: 'District Compliance Rate',
    value: '67%',
    status: 'Below Target',
    variant: 'warning' as const,
    trend: '→ Stable',
    desc: 'Percentage of districts meeting minimum environmental quality standards',
  },
  {
    title: 'Total Active Monitors',
    value: '247',
    status: 'Operational',
    variant: 'success' as const,
    trend: '↗ +12 this month',
    desc: 'Active sensors, stations, and reporting systems across Kashmir',
  },
  {
    title: 'Data Availability',
    value: '94.2%',
    status: 'Excellent',
    variant: 'success' as const,
    trend: '↗ +0.8%',
    desc: 'Percentage of expected data points successfully captured',
  },
];

export default function DashboardsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">{/* Hero */}
      <section className="relative pt-48 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-purple-900/20 to-slate-950" />
        <div className="absolute inset-0 bg-grid opacity-10" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <button onClick={() => router.push('/')} className="hover:text-white transition-colors">Home</button>
              <ChevronRight className="w-4 h-4" />
              <button onClick={() => router.push('/environmental-monitoring')} className="hover:text-white transition-colors">Environmental Monitoring</button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">Dashboards</span>
            </nav>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-2xl">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Analytics & Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Environmental <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-purple-400">Dashboards</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Comprehensive analytics dashboards with district comparison, stress heatmaps,
              trend analysis, and real-time environmental intelligence across all monitoring domains
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Analytics */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {quickAnalytics.map((m, i) => (
              <motion.div key={m.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }} className="text-center">
                <div className="text-sm text-slate-400 mb-1">{m.title}</div>
                <div className={`text-3xl md:text-4xl font-bold ${
                  m.variant === 'success' ? 'text-emerald-400' :
                  m.variant === 'warning' ? 'text-amber-400' :
                  'text-red-400'
                } mb-1`}>{m.value}</div>
                <div className="text-xs text-slate-500">{m.status} • {m.trend}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Modules */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <Layers className="w-6 h-6 text-violet-400" />
              Analytics Dashboard Modules
            </h2>
            <p className="text-slate-400">Interactive dashboards for environmental intelligence and decision support</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardModules.map((module, i) => (
              <motion.div key={module.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-6 cursor-pointer group h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center shadow-lg`}>
                        <module.icon className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant={module.statusVariant} size="sm">{module.status}</Badge>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">{module.title}</h3>
                  <p className="text-sm text-slate-400 mb-4 leading-relaxed">{module.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {module.metrics.map((metric) => (
                      <Badge key={metric} variant="info" size="sm" className="text-xs">{metric}</Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* District Aggregate Table */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-violet-400" />
              District Aggregate Profiles
            </h2>
            <p className="text-slate-400">Composite environmental stress scores and key performance indicators by district</p>
          </motion.div>

          <Card className="glass-intense border-white/10 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">District</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Stress Index</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">AQI</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Water Quality</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Waste Mgmt</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Infra Health</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Incidents</th>
                </tr>
              </thead>
              <tbody>
                {districtAggregateData.map((d, i) => (
                  <motion.tr
                    key={d.district}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <span className="text-white font-medium">{d.district}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              d.overallStress >= 70 ? 'bg-red-400' :
                              d.overallStress >= 50 ? 'bg-amber-400' :
                              'bg-emerald-400'
                            }`}
                            style={{ width: `${d.overallStress}%` }}
                          />
                        </div>
                        <Badge variant={d.stressVariant} size="sm">{d.overallStress}</Badge>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`text-xs font-bold ${
                        d.aqi >= 150 ? 'text-red-400' :
                        d.aqi >= 100 ? 'text-amber-400' :
                        'text-emerald-400'
                      }`}>
                        {d.aqi}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant={d.waterQuality === 'Good' ? 'success' : d.waterQuality === 'Moderate' ? 'warning' : 'danger'} size="sm">
                        {d.waterQuality}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center text-slate-300">{d.wasteMgmt}</td>
                    <td className="py-3 px-4 text-center text-slate-300">{d.infraHealth}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`text-xs font-bold ${
                        d.incidentCount >= 50 ? 'text-red-400' :
                        d.incidentCount >= 25 ? 'text-amber-400' :
                        'text-emerald-400'
                      }`}>
                        {d.incidentCount}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <Activity className="w-6 h-6 text-violet-400" />
              Dashboard Features
            </h2>
            <p className="text-slate-400">Advanced analytics capabilities for environmental intelligence</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Real-Time Monitoring',
                desc: 'Live data feeds from 247+ active monitoring stations across Kashmir with sub-hourly updates',
                icon: Activity,
                color: 'from-cyan-500 to-teal-600',
              },
              {
                title: 'Predictive Analytics',
                desc: 'Machine learning models forecasting AQI trends, contamination events, and infrastructure failures',
                icon: TrendingUp,
                color: 'from-violet-500 to-purple-600',
              },
              {
                title: 'Geospatial Intelligence',
                desc: 'Interactive maps with heat layers, hotspot detection, and district boundary analysis tools',
                icon: Map,
                color: 'from-indigo-500 to-blue-600',
              },
            ].map((feature, i) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-6 h-full">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Coming Soon</h2>
            <p className="text-slate-400">Additional analytics modules under development</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Biodiversity Risk Dashboard', desc: 'Species vulnerability, habitat stress, and conservation effectiveness tracking', status: 'In Development' },
              { title: 'Climate Impact Analytics', desc: 'Long-term climate trend analysis and impact assessment on Kashmir ecosystems', status: 'Planned' },
              { title: 'Citizen Science Integration', desc: 'Community-reported data validation and participation analytics', status: 'In Development' },
              { title: 'Export & Reporting Tools', desc: 'PDF report generation, CSV export, and API access for research institutions', status: 'Planned' },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 p-5 opacity-75">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-sm font-bold text-white">{item.title}</h3>
                      <p className="text-xs text-slate-400 mt-1">{item.desc}</p>
                    </div>
                    <Badge variant="info" size="sm">{item.status}</Badge>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Related Actions</h2>
            <p className="text-slate-400">Explore domain-specific monitoring pages</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Solid Waste', href: '/environmental-monitoring/solid-waste', desc: 'Dumping & landfill stress', icon: ExternalLink, color: 'from-gray-500 to-slate-600' },
              { label: 'Drinking Water', href: '/environmental-monitoring/drinking-water', desc: 'Quality & supply intelligence', icon: ExternalLink, color: 'from-cyan-500 to-teal-600' },
              { label: 'Air Pollution', href: '/environmental-monitoring/air-pollution', desc: 'AQI & pollutant tracking', icon: ExternalLink, color: 'from-slate-500 to-gray-600' },
              { label: 'Utility Incidents', href: '/environmental-monitoring/utility-incidents', desc: 'Emergency & service failures', icon: ExternalLink, color: 'from-red-500 to-rose-600' },
            ].map((link, i) => (
              <motion.div key={link.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group" onClick={() => router.push(link.href)}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center shadow flex-shrink-0`}>
                      <link.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors">{link.label}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{link.desc}</p>
                    </div>
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
