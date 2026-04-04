'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Siren, Map, BarChart3, ChevronRight, AlertTriangle,
  FileText, ArrowRight, Activity, Clock,
  MapPin, ExternalLink, Phone, Bell, Wrench,
  AlertCircle, Power, Droplets, Flame
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const incidentTypeCards = [
  {
    type: 'Water Supply Failures',
    count: 23,
    severity: 'critical' as const,
    verified: true,
    lastReported: '2h ago',
    icon: Droplets,
    description: 'Pipeline ruptures, pump failures, treatment plant outages',
  },
  {
    type: 'Sewage Overflows',
    count: 14,
    severity: 'danger' as const,
    verified: true,
    lastReported: '4h ago',
    icon: AlertCircle,
    description: 'Untreated sewage discharging into waterways and public spaces',
  },
  {
    type: 'Power Supply Disruptions',
    count: 8,
    severity: 'warning' as const,
    verified: true,
    lastReported: '6h ago',
    icon: Power,
    description: 'Grid failures affecting water treatment and pumping stations',
  },
  {
    type: 'Emergency Service Notices',
    count: 12,
    severity: 'info' as const,
    verified: true,
    lastReported: '8h ago',
    icon: Bell,
    description: 'Scheduled maintenance, boil advisories, service interruptions',
  },
  {
    type: 'Infrastructure Damage',
    count: 6,
    severity: 'danger' as const,
    verified: false,
    lastReported: '1d ago',
    icon: Wrench,
    description: 'Physical damage to pipes, pumps, treatment infrastructure',
  },
  {
    type: 'Citizen Complaints',
    count: 47,
    severity: 'warning' as const,
    verified: true,
    lastReported: '1h ago',
    icon: Phone,
    description: 'Community-reported service failures and environmental hazards',
  },
];

const districtIncidentData = [
  { district: 'Srinagar', incidents: 38, criticalIncidents: 7, waterFailures: 12, sewageOverflows: 8, powerDisruptions: 3, emergencyNotices: 5 },
  { district: 'Anantnag', incidents: 16, criticalIncidents: 3, waterFailures: 5, sewageOverflows: 4, powerDisruptions: 2, emergencyNotices: 2 },
  { district: 'Baramulla', incidents: 11, criticalIncidents: 2, waterFailures: 3, sewageOverflows: 2, powerDisruptions: 1, emergencyNotices: 2 },
  { district: 'Pulwama', incidents: 19, criticalIncidents: 5, waterFailures: 7, sewageOverflows: 5, powerDisruptions: 2, emergencyNotices: 3 },
  { district: 'Budgam', incidents: 9, criticalIncidents: 1, waterFailures: 2, sewageOverflows: 2, powerDisruptions: 1, emergencyNotices: 1 },
  { district: 'Ganderbal', incidents: 7, criticalIncidents: 1, waterFailures: 2, sewageOverflows: 1, powerDisruptions: 1, emergencyNotices: 1 },
  { district: 'Kupwara', incidents: 5, criticalIncidents: 0, waterFailures: 1, sewageOverflows: 1, powerDisruptions: 0, emergencyNotices: 1 },
  { district: 'Shopian', incidents: 6, criticalIncidents: 1, waterFailures: 2, sewageOverflows: 1, powerDisruptions: 1, emergencyNotices: 1 },
];

const activeAdvisories = [
  {
    title: 'Boil Water Advisory — Rajbagh Supply Zone',
    source: 'Water Quality Lab',
    status: 'Active',
    desc: 'Coliform contamination detected in Rajbagh distribution network. All residents advised to boil water for minimum 3 minutes before consumption until further notice. Flush advisory after clearance.',
    issued: '6h ago',
    icon: Droplets,
  },
  {
    title: 'Sewage Overflow Emergency — Nowgam',
    source: 'Municipal Operations',
    status: 'Emergency',
    desc: 'Main sewage line rupture at Nowgam junction discharging into storm drain. Emergency repair crew dispatched. Public advised to avoid contact with contaminated water in 500m radius.',
    issued: '4h ago',
    icon: AlertCircle,
  },
  {
    title: 'Power Failure Impact — Zadibal Pumping Station',
    source: 'Utility Coordination',
    status: 'Monitoring',
    desc: 'Grid failure at Zadibal PS affecting 3 pump motors. Backup generators running at 60% capacity. Supply reduction of 35% expected for 12-18 hours. Water rationing may be implemented.',
    issued: '8h ago',
    icon: Power,
  },
  {
    title: 'Scheduled Maintenance — Baramulla Treatment Plant',
    source: 'Infrastructure Operations',
    status: 'Notice',
    desc: 'Planned maintenance shutdown of filtration unit #2 on April 6, 0600-1400 hrs. Temporary turbidity increase expected. Chemical dosing adjustment in progress to maintain quality standards.',
    issued: '1 day ago',
    icon: Wrench,
  },
  {
    title: 'Pipeline Rupture — Pulwama Main Artery',
    source: 'Emergency Response',
    status: 'Emergency',
    desc: 'Catastrophic failure of 18-inch CI main supply pipe near Pulwama town. Complete supply disruption affecting 80K+ population. Emergency repair underway, estimated restoration 48-72 hours.',
    issued: '12h ago',
    icon: Flame,
  },
];

const recentIncidents = [
  { type: 'Pipeline Rupture', location: 'Pulwama main artery — 18" CI pipe', severity: 'Critical', time: '12h ago', verified: true },
  { type: 'Sewage Overflow', location: 'Nowgam junction, Srinagar', severity: 'Critical', time: '4h ago', verified: true },
  { type: 'Boil Advisory Issued', location: 'Rajbagh supply zone, Srinagar', severity: 'High', time: '6h ago', verified: true },
  { type: 'Power Failure at PS', location: 'Zadibal pumping station', severity: 'High', time: '8h ago', verified: true },
  { type: 'Citizen Complaint Surge', location: 'Tral town, Pulwama — 23 calls', severity: 'Moderate', time: '1 day ago', verified: true },
];

export default function UtilityIncidentsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-48 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 via-rose-900/20 to-slate-950" />
        <div className="absolute inset-0 bg-grid opacity-10" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <button onClick={() => router.push('/')} className="hover:text-white transition-colors">Home</button>
              <ChevronRight className="w-4 h-4" />
              <button onClick={() => router.push('/environmental-monitoring')} className="hover:text-white transition-colors">Environmental Monitoring</button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">Utility Incidents</span>
            </nav>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-2xl">
                <Siren className="w-8 h-8 text-white" />
              </div>
              <Badge variant="danger" size="lg">Emergency Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Utility <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-rose-400">Incidents</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Real-time utility service failures, emergency advisories, infrastructure damage reports,
              and citizen complaint tracking across Kashmir&apos;s water and sanitation utility network
            </p>
          </motion.div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { label: 'Active Incidents', value: '111', sub: 'Last 24 hours', color: 'text-red-400' },
              { label: 'Critical Events', value: '19', sub: 'Emergency response', color: 'text-red-500' },
              { label: 'Active Advisories', value: '5', sub: 'Public notices', color: 'text-amber-400' },
              { label: 'Citizen Complaints', value: '47', sub: 'Last 7 days', color: 'text-orange-400' },
              { label: 'Avg Resolution Time', value: '18h', sub: 'Target: 12h', color: 'text-slate-400' },
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

      {/* Map Preview */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 overflow-hidden">
            <div className="p-6 flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Map className="w-5 h-5 text-red-400" />
                <h3 className="text-lg font-bold text-white">Incident Location Map</h3>
              </div>
              <Button size="sm" variant="outline" className="border-white/20 text-white" onClick={() => router.push('/environmental-monitoring/dashboards')}>
                <BarChart3 className="w-4 h-4 mr-2" />
                Open Dashboard
              </Button>
            </div>
            <div className="h-80 bg-gradient-to-br from-red-900/20 to-rose-900/10 flex items-center justify-center border-t border-white/5">
              <div className="text-center">
                <Map className="w-14 h-14 text-red-800 mx-auto mb-3" />
                <p className="text-slate-400 text-sm mb-1">Interactive utility incident map with real-time event tracking</p>
                <p className="text-slate-500 text-xs">Water failures • Sewage overflows • Power disruptions • Emergency notices</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Incident Type Cards */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Incident Type Matrix</h2>
            <p className="text-slate-400">Active incident counts by utility service category and severity</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {incidentTypeCards.map((card, i) => (
              <motion.div key={card.type} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow flex-shrink-0">
                        <card.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white group-hover:text-red-300 transition-colors">{card.type}</h3>
                        <p className="text-xs text-slate-400">{card.count} incidents • {card.lastReported}</p>
                      </div>
                    </div>
                    <Badge variant={card.severity} size="sm">{card.severity}</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mb-2">{card.description}</p>
                  {card.verified ? (
                    <Badge variant="success" size="sm" className="text-xs">Verified</Badge>
                  ) : (
                    <Badge variant="warning" size="sm" className="text-xs">Unverified</Badge>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* District Incident Table */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <Activity className="w-6 h-6 text-red-400" />
              District Incident Profiles
            </h2>
            <p className="text-slate-400">Incident distribution, critical events, and service failure breakdown by district</p>
          </motion.div>

          <Card className="glass-intense border-white/10 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">District</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Total</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Critical</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Water</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Sewage</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Power</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Notices</th>
                </tr>
              </thead>
              <tbody>
                {districtIncidentData.map((d, i) => (
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
                      <Badge variant={d.incidents >= 30 ? 'danger' : d.incidents >= 15 ? 'warning' : 'success'} size="sm">
                        {d.incidents}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`text-xs font-bold ${d.criticalIncidents >= 5 ? 'text-red-400' : d.criticalIncidents >= 2 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {d.criticalIncidents}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-slate-300">{d.waterFailures}</td>
                    <td className="py-3 px-4 text-center text-slate-300">{d.sewageOverflows}</td>
                    <td className="py-3 px-4 text-center text-slate-300">{d.powerDisruptions}</td>
                    <td className="py-3 px-4 text-center text-slate-300">{d.emergencyNotices}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </section>

      {/* Active Advisories */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <Bell className="w-6 h-6 text-red-400" />
              Active Advisories &amp; Emergency Notices
            </h2>
            <p className="text-slate-400">Public health advisories, emergency notices, and service interruption alerts</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeAdvisories.map((advisory, i) => (
              <motion.div key={advisory.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500/20 to-rose-600/20 flex items-center justify-center">
                        <advisory.icon className="w-4 h-4 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white group-hover:text-red-300 transition-colors">{advisory.title}</h3>
                        <p className="text-xs text-slate-500">{advisory.source}</p>
                      </div>
                    </div>
                    <Badge variant={advisory.status === 'Emergency' ? 'critical' : advisory.status === 'Active' ? 'danger' : advisory.status === 'Monitoring' ? 'warning' : 'info'} size="sm">
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

      {/* Recent Incident Feed */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              Recent Utility Incidents
            </h2>
            <p className="text-slate-400">Latest verified service failures and emergency events</p>
          </motion.div>

          <Card className="glass-intense border-white/10 p-5">
            <div className="space-y-4">
              {recentIncidents.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="py-3 border-b border-white/5 last:border-0 last:pb-0"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-white font-medium">{r.type}</span>
                    <div className="flex items-center gap-2">
                      {r.verified ? (
                        <Badge variant="success" size="sm" className="text-xs">Verified</Badge>
                      ) : (
                        <Badge variant="warning" size="sm" className="text-xs">Pending</Badge>
                      )}
                      <Badge variant={r.severity === 'Critical' ? 'critical' : r.severity === 'High' ? 'danger' : 'warning'} size="sm" className="text-xs">
                        {r.severity}
                      </Badge>
                    </div>
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

      {/* Cross-links */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Related Actions</h2>
            <p className="text-slate-400">Explore connected environmental monitoring domains</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Drinking Water', href: '/environmental-monitoring/drinking-water', desc: 'Quality & supply intelligence', icon: ExternalLink, color: 'from-cyan-500 to-teal-600' },
              { label: 'Critical Infrastructure', href: '/environmental-monitoring/critical-infrastructure', desc: 'Asset condition monitoring', icon: ExternalLink, color: 'from-indigo-500 to-blue-600' },
              { label: 'Sewage & Wastewater', href: '/environmental-monitoring/sewage-wastewater', desc: 'Overflow and discharge tracking', icon: ExternalLink, color: 'from-blue-500 to-cyan-600' },
              { label: 'Dashboards', href: '/environmental-monitoring/dashboards', desc: 'District comparison & stress maps', icon: ExternalLink, color: 'from-violet-500 to-purple-600' },
            ].map((link, i) => (
              <motion.div key={link.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group" onClick={() => router.push(link.href)}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center shadow flex-shrink-0`}>
                      <link.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white group-hover:text-red-300 transition-colors">{link.label}</h3>
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
