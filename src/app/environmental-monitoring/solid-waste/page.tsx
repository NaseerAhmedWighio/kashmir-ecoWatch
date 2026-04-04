'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Trash2, Map, BarChart3, Eye, ChevronRight, AlertTriangle,
  Flame, Factory, FileText, ArrowRight, Activity, Clock,
  MapPin, TrendingUp, Shield, ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const hotspotCards = [
  {
    title: 'Illegal Dumping Sites',
    location: 'Multiple districts',
    severity: 'critical' as const,
    verified: true,
    count: 14,
    lastReported: '1h ago',
    icon: MapPin,
    description: 'Unsanctioned waste accumulation in ecological zones',
  },
  {
    title: 'Landfill Stress',
    location: 'Srinagar, Ganderbal border',
    severity: 'critical' as const,
    verified: true,
    count: 3,
    lastReported: '3h ago',
    icon: Factory,
    description: 'Capacity exceedance at designated landfill sites',
  },
  {
    title: 'Open Waste Accumulation',
    location: 'Urban corridors, Anantnag',
    severity: 'warning' as const,
    verified: true,
    count: 8,
    lastReported: '5h ago',
    icon: Trash2,
    description: 'Unmanaged waste in public spaces and waterways',
  },
  {
    title: 'Waste Burning Locations',
    location: 'Pulwama, Budgam',
    severity: 'danger' as const,
    verified: false,
    count: 5,
    lastReported: '8h ago',
    icon: Flame,
    description: 'Open burning events with air quality impact',
  },
  {
    title: 'Municipal Collection Gaps',
    location: 'Baramulla, Kupwara',
    severity: 'warning' as const,
    verified: true,
    count: 6,
    lastReported: '12h ago',
    icon: AlertTriangle,
    description: 'Areas with irregular or absent waste collection',
  },
  {
    title: 'District Comparison Index',
    location: 'Kashmir-wide',
    severity: 'info' as const,
    verified: true,
    count: 8,
    lastReported: '1d ago',
    icon: BarChart3,
    description: 'Cross-district waste management performance',
  },
];

const districtWasteData = [
  { district: 'Srinagar', incidents: 18, trend: 'worsening' as const, collectionRate: '72%', landfillLoad: '94%' },
  { district: 'Anantnag', incidents: 9, trend: 'stable' as const, collectionRate: '65%', landfillLoad: '71%' },
  { district: 'Baramulla', incidents: 7, trend: 'improving' as const, collectionRate: '68%', landfillLoad: '58%' },
  { district: 'Pulwama', incidents: 8, trend: 'worsening' as const, collectionRate: '61%', landfillLoad: '67%' },
  { district: 'Budgam', incidents: 5, trend: 'stable' as const, collectionRate: '70%', landfillLoad: '52%' },
  { district: 'Ganderbal', incidents: 3, trend: 'stable' as const, collectionRate: '74%', landfillLoad: '45%' },
  { district: 'Kupwara', incidents: 4, trend: 'improving' as const, collectionRate: '58%', landfillLoad: '41%' },
  { district: 'Shopian', incidents: 2, trend: 'stable' as const, collectionRate: '63%', landfillLoad: '38%' },
];

const recentReports = [
  { type: 'Illegal Dumping', location: 'Near Dal Lake periphery, Srinagar', severity: 'High', time: '1h ago', verified: true },
  { type: 'Landfill Overflow', location: 'Karasu landfill, Ganderbal', severity: 'Critical', time: '3h ago', verified: true },
  { type: 'Open Waste Burning', location: 'Tral town, Pulwama', severity: 'High', time: '8h ago', verified: false },
  { type: 'Collection Failure', location: 'Sopore municipal area, Baramulla', severity: 'Moderate', time: '12h ago', verified: true },
  { type: 'Waste in Waterway', location: 'Lidder riverbank, Anantnag', severity: 'High', time: '1d ago', verified: true },
];

export default function SolidWastePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">{/* Hero */}
      <section className="relative pt-48 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/60 via-slate-900/40 to-slate-950" />
        <div className="absolute inset-0 bg-grid opacity-10" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <button onClick={() => router.push('/')} className="hover:text-white transition-colors">Home</button>
              <ChevronRight className="w-4 h-4" />
              <button onClick={() => router.push('/environmental-monitoring')} className="hover:text-white transition-colors">Environmental Monitoring</button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">Solid Waste</span>
            </nav>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-500 to-slate-600 flex items-center justify-center shadow-2xl">
                <Trash2 className="w-8 h-8 text-white" />
              </div>
              <Badge variant="warning" size="lg">Waste Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Solid <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-slate-400">Waste</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Tracking illegal dumping, landfill stress, open waste accumulation, burning events,
              and municipal collection performance across Kashmir districts
            </p>
          </motion.div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { label: 'Active Hotspots', value: '42', sub: 'Mapped & tracked', color: 'text-gray-400' },
              { label: 'Verified Incidents', value: '36', sub: 'Last 7 days', color: 'text-slate-300' },
              { label: 'Critical Alerts', value: '5', sub: 'Immediate action', color: 'text-red-400' },
              { label: 'Avg Collection Rate', value: '66%', sub: 'Kashmir avg', color: 'text-amber-400' },
              { label: 'Landfill Stress', value: '3', sub: 'Near capacity', color: 'text-orange-400' },
            ].map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }} className="text-center">
                <div className={`text-3xl md:text-4xl font-bold ${m.color} mb-1`}>{m.value}</div>
                <div className="text-sm text-slate-400">{m.label}</div>
                <div className="text-xs text-slate-500">{m.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hotspot Cards */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Waste Pressure Intelligence</h2>
            <p className="text-slate-400">Real-time waste system stress indicators across monitored zones</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hotspotCards.map((card, i) => (
              <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-500 to-slate-600 flex items-center justify-center shadow flex-shrink-0">
                      <card.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white group-hover:text-gray-300 transition-colors">{card.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{card.description}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <MapPin className="w-3 h-3" />
                        <span>{card.location}</span>
                      </div>
                      <Badge variant={card.severity} size="sm">{card.severity}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Activity className="w-3 h-3" />
                        <span>{card.count} incidents</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <Clock className="w-3 h-3" />
                        <span>{card.lastReported}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      {card.verified ? (
                        <>
                          <Shield className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Verified</span>
                        </>
                      ) : (
                        <>
                          <Shield className="w-3 h-3 text-amber-400" />
                          <span className="text-amber-400">Pending verification</span>
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Preview */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 overflow-hidden">
            <div className="p-6 flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Map className="w-5 h-5 text-gray-400" />
                <h3 className="text-lg font-bold text-white">Waste Pressure & Accumulation Map</h3>
              </div>
              <Button size="sm" variant="outline" className="border-white/20 text-white" onClick={() => router.push('/environmental-monitoring/dashboards')}>
                <BarChart3 className="w-4 h-4 mr-2" />
                Open Dashboard
              </Button>
            </div>
            <div className="h-72 bg-gradient-to-br from-gray-900/50 to-slate-900/50 flex items-center justify-center border-t border-white/5">
              <div className="text-center">
                <Map className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400 text-sm mb-1">Interactive waste intelligence map with dumping, landfill, and accumulation layers</p>
                <p className="text-slate-500 text-xs">Illegal dumping • Landfill stress • Open waste • Burning events • Collection gaps</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* District Comparison Table */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">District Waste Performance</h2>
            <p className="text-slate-400">Cross-district comparison of waste management indicators</p>
          </motion.div>

          <Card className="glass-intense border-white/10 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">District</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Incidents (7d)</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Trend</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Collection Rate</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Landfill Load</th>
                </tr>
              </thead>
              <tbody>
                {districtWasteData.map((d, i) => (
                  <motion.tr
                    key={d.district}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          d.incidents >= 10 ? 'bg-red-400' : d.incidents >= 6 ? 'bg-amber-400' : 'bg-emerald-400'
                        }`} />
                        <span className="text-white font-medium">{d.district}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center text-slate-300">{d.incidents}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <TrendingUp className={`w-3.5 h-3.5 ${
                          d.trend === 'worsening' ? 'text-red-400 rotate-180' : d.trend === 'improving' ? 'text-emerald-400' : 'text-slate-500'
                        }`} />
                        <Badge variant={d.trend === 'worsening' ? 'danger' : d.trend === 'improving' ? 'success' : 'default'} size="sm" className="text-xs">
                          {d.trend}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`font-medium ${
                        parseInt(d.collectionRate) >= 70 ? 'text-emerald-400' : parseInt(d.collectionRate) >= 60 ? 'text-amber-400' : 'text-red-400'
                      }`}>
                        {d.collectionRate}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              parseInt(d.landfillLoad) >= 80 ? 'bg-red-400' : parseInt(d.landfillLoad) >= 60 ? 'bg-amber-400' : 'bg-emerald-400'
                            }`}
                            style={{ width: d.landfillLoad }}
                          />
                        </div>
                        <span className="text-slate-300 text-xs">{d.landfillLoad}</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </section>

      {/* Recent Reports Feed */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <FileText className="w-6 h-6 text-gray-400" />
              Recent Reports Feed
            </h2>
            <p className="text-slate-400">Latest verified and pending waste intelligence reports</p>
          </motion.div>

          <Card className="glass-intense border-white/10 p-5">
            <div className="space-y-4">
              {recentReports.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="py-3 border-b border-white/5 last:border-0 last:pb-0"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white font-medium">{r.type}</span>
                      {r.verified ? (
                        <Badge variant="success" size="sm" className="text-xs">Verified</Badge>
                      ) : (
                        <Badge variant="warning" size="sm" className="text-xs">Pending</Badge>
                      )}
                    </div>
                    <Badge variant={r.severity === 'Critical' ? 'critical' : r.severity === 'High' ? 'danger' : 'warning'} size="sm" className="text-xs">
                      {r.severity}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{r.location}</span>
                    </div>
                    <span className="text-slate-600">|</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{r.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Related Advisories */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              Related Advisories
            </h2>
            <p className="text-slate-400">Active notices and guidance from environmental authorities</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { title: 'Landfill Capacity Advisory — Srinagar', status: 'Active', desc: 'Karasu landfill approaching maximum capacity. Diversion protocols activated for Ganderbal and Budgam zones.', issued: '2 days ago' },
              { title: 'Waste Burning Alert — Pulwama District', status: 'Monitoring', desc: 'Increased open burning events detected near agricultural zones. Air quality impact assessment underway.', issued: '5 days ago' },
              { title: 'Collection Schedule Update — Baramulla', status: 'Resolved', desc: 'Municipal collection frequency restored to normal schedule in Sopore and Uri subdivisions.', issued: '1 week ago' },
              { title: 'Waterway Contamination Risk — Anantnag', status: 'Active', desc: 'Waste accumulation along Lidder riverbank poses contamination risk. Cleanup operations initiated.', issued: '3 days ago' },
            ].map((advisory, i) => (
              <motion.div key={advisory.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-bold text-white group-hover:text-gray-300 transition-colors">{advisory.title}</h3>
                    <Badge variant={advisory.status === 'Active' ? 'danger' : advisory.status === 'Monitoring' ? 'warning' : 'success'} size="sm">
                      {advisory.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400 mb-3 leading-relaxed">{advisory.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Issued: {advisory.issued}</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Related Actions</h2>
            <p className="text-slate-400">Contribute to waste intelligence or explore related domains</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Report an Issue', href: '/report-issue', desc: 'Submit waste-related hazards', icon: AlertTriangle, color: 'from-red-500 to-orange-600' },
              { label: 'Contribute Data', href: '/contribute-data', desc: 'Add verified observations', icon: Eye, color: 'from-emerald-500 to-green-600' },
              { label: 'Sewage & Wastewater', href: '/environmental-monitoring/sewage-wastewater', desc: 'Discharge & outfall monitoring', icon: ExternalLink, color: 'from-blue-500 to-cyan-600' },
              { label: 'Environmental Health', href: '/environmental-monitoring/environmental-health', desc: 'Health signal monitoring', icon: ExternalLink, color: 'from-amber-500 to-orange-600' },
            ].map((link, i) => (
              <motion.div key={link.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group" onClick={() => router.push(link.href)}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center shadow flex-shrink-0`}>
                      <link.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white group-hover:text-gray-300 transition-colors">{link.label}</h3>
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
