'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Droplets, Map, BarChart3, Eye, ChevronRight, AlertTriangle,
  Factory, FileText, ArrowRight, Activity, Clock,
  MapPin, TrendingUp, Shield, ExternalLink, Waves, AlertCircle,
  FlaskConical, Construction
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const incidentSeverityCards = [
  {
    title: 'Active Sewage Overflow Sites',
    location: 'Hazratbal, Nigeen, Srinagar',
    district: 'Srinagar',
    severity: 'critical' as const,
    verified: true,
    count: 7,
    lastReported: '45m ago',
    icon: AlertCircle,
    description: 'Raw sewage overflow into Dal Lake feeder channels',
  },
  {
    title: 'STP Performance — Under Capacity',
    location: 'Zadibal, Telbal Srinagar',
    severity: 'danger' as const,
    verified: true,
    count: 3,
    lastReported: '2h ago',
    icon: Factory,
    description: 'Sewage treatment plants operating below design capacity',
  },
  {
    title: 'Drain Outfall Discharge',
    location: 'Nowgam, Safa Kadal drains',
    severity: 'critical' as const,
    verified: true,
    count: 11,
    lastReported: '3h ago',
    icon: Construction,
    description: 'Untreated wastewater discharge through municipal drain outfalls',
  },
  {
    title: 'Untreated Discharge Points',
    location: 'Anantnag town, Pulwama belt',
    severity: 'danger' as const,
    verified: false,
    count: 5,
    lastReported: '6h ago',
    icon: Droplets,
    description: 'Direct untreated sewage release into natural waterways',
  },
  {
    title: 'Wastewater Leakage Zones',
    location: 'Baramulla urban, Sopore',
    severity: 'warning' as const,
    verified: true,
    count: 9,
    lastReported: '8h ago',
    icon: Waves,
    description: 'Sewer line breaches and subsurface leakage near aquifers',
  },
  {
    title: 'Lake Contamination Pathways',
    location: 'Dal Lake, Wular, Anchar',
    severity: 'critical' as const,
    verified: true,
    count: 14,
    lastReported: '1h ago',
    icon: FlaskConical,
    description: 'Identified pathways carrying sewage effluent into lake ecosystems',
  },
];

const impactedWaterBodies = [
  { name: 'Dal Lake', contamination: 'High', status: 'critical' as const, severity: 'Sewage inflow from 7 drain points', verified: true, lastAssessed: '1h ago', eutrophication: 'Advanced' },
  { name: 'Wular Lake', contamination: 'Moderate', status: 'warning' as const, severity: 'Agricultural + sewage mix inflow', verified: true, lastAssessed: '4h ago', eutrophication: 'Moderate' },
  { name: 'Jhelum River — Urban Stretch', contamination: 'High', status: 'danger' as const, severity: 'Raw sewage discharge along Srinagar corridor', verified: true, lastAssessed: '2h ago', eutrophication: 'Elevated' },
  { name: 'Anchar Lake', contamination: 'High', status: 'critical' as const, severity: 'Connected to Dal outflow + direct sewage', verified: false, lastAssessed: '6h ago', eutrophication: 'Advanced' },
  { name: 'Khushal Sar', contamination: 'Moderate', status: 'warning' as const, severity: 'Storm drain sewage + market runoff', verified: true, lastAssessed: '5h ago', eutrophication: 'Moderate' },
  { name: 'Brari Nambal', contamination: 'High', status: 'danger' as const, severity: 'Slaughter + domestic sewage confluence', verified: true, lastAssessed: '3h ago', eutrophication: 'High' },
];

const treatmentAssets = [
  { name: 'Telbal STP', location: 'Telbal, Srinagar', status: 'Operational', capacity: '30 MLD', load: '87%', compliance: 'Partial', district: 'Srinagar' },
  { name: 'Zadibal STP', location: 'Zadibal, Srinagar', status: 'Under Stress', capacity: '18 MLD', load: '94%', compliance: 'Non-compliant', district: 'Srinagar' },
  { name: 'Nowgam STP', location: 'Nowgam, Srinagar', status: 'Operational', capacity: '12 MLD', load: '72%', compliance: 'Compliant', district: 'Srinagar' },
  { name: 'Anantnag STP', location: 'Anantnag town', status: 'Under Stress', capacity: '8 MLD', load: '91%', compliance: 'Partial', district: 'Anantnag' },
  { name: 'Baramulla STP', location: 'Baramulla urban', status: 'Operational', capacity: '10 MLD', load: '65%', compliance: 'Compliant', district: 'Baramulla' },
  { name: 'Sopora STP', location: 'Sopore, Baramulla', status: 'Non-operational', capacity: '6 MLD', load: '0%', compliance: 'N/A', district: 'Baramulla' },
];

const publicAdvisories = [
  { title: 'Dal Lake Sewage Inflow — Contact Advisory', status: 'Active', desc: 'Avoid direct contact with Dal Lake waters. Elevated coliform and nutrient levels detected from multiple sewage inflow points. Fishing and recreational activities restricted.', issued: '1 day ago' },
  { title: 'Wular Lake Nutrient Loading Warning', status: 'Monitoring', desc: 'Increased nitrogen and phosphorus levels detected. Algal bloom risk elevated. Water extraction for domestic use not recommended without treatment.', issued: '3 days ago' },
  { title: 'Jhelum Urban Stretch — Water Quality Alert', status: 'Active', desc: 'Raw sewage discharge along Srinagar corridor has significantly reduced dissolved oxygen. Aquatic life stress observed. Avoid water contact downstream of outfall points.', issued: '2 days ago' },
  { title: 'Anchar Lake Contamination Pathway Identified', status: 'Under Review', desc: 'New sewage pathway from connected drain network confirmed. Water quality sampling underway. Advisory update pending laboratory results.', issued: '5 days ago' },
];

const recentIncidents = [
  { type: 'Raw Sewage Overflow', location: 'Hazratbal drain, Srinagar', severity: 'Critical', time: '45m ago', verified: true },
  { type: 'STP Capacity Exceeded', location: 'Zadibal Treatment Plant', severity: 'Critical', time: '2h ago', verified: true },
  { type: 'Untreated Discharge Detected', location: 'Safakadal outfall, Srinagar', severity: 'High', time: '3h ago', verified: true },
  { type: 'Sewer Line Breach', location: 'Sopore municipal area, Baramulla', severity: 'Moderate', time: '8h ago', verified: false },
  { type: 'Lake Effluent Pathway Confirmed', location: 'Anchar Lake feeder channel', severity: 'High', time: '12h ago', verified: true },
];

export default function SewageWastewaterPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-48 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-cyan-900/20 to-slate-950" />
        <div className="absolute inset-0 bg-grid opacity-10" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <button onClick={() => router.push('/')} className="hover:text-white transition-colors">Home</button>
              <ChevronRight className="w-4 h-4" />
              <button onClick={() => router.push('/environmental-monitoring')} className="hover:text-white transition-colors">Environmental Monitoring</button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">Sewage & Wastewater</span>
            </nav>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-2xl">
                <Droplets className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Sewage Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Sewage &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-400">Wastewater</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Monitoring sewage overflow events, wastewater discharge points, treatment plant performance,
              and contamination pathways across Kashmir&apos;s lakes, rivers, and wetland ecosystems
            </p>
          </motion.div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { label: 'Active Overflow Sites', value: '7', sub: 'Last 24 hours', color: 'text-blue-400' },
              { label: 'Drain Outfalls Tracked', value: '46', sub: 'Kashmir-wide', color: 'text-cyan-400' },
              { label: 'STPs Monitored', value: '6', sub: 'Operational status', color: 'text-slate-300' },
              { label: 'Contamination Pathways', value: '14', sub: 'To water bodies', color: 'text-red-400' },
              { label: 'Verification Rate', value: '78%', sub: 'Kashmir avg', color: 'text-emerald-400' },
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

      {/* Outfall Map Preview */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 overflow-hidden">
            <div className="p-6 flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Map className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold text-white">Sewage Outfall &amp; Discharge Map</h3>
              </div>
              <Button size="sm" variant="outline" className="border-white/20 text-white" onClick={() => router.push('/environmental-monitoring/dashboards')}>
                <BarChart3 className="w-4 h-4 mr-2" />
                Open Dashboard
              </Button>
            </div>
            <div className="h-80 bg-gradient-to-br from-blue-900/20 to-cyan-900/10 flex items-center justify-center border-t border-white/5">
              <div className="text-center">
                <Map className="w-14 h-14 text-blue-800 mx-auto mb-3" />
                <p className="text-slate-400 text-sm mb-1">Interactive sewage intelligence map with outfall, STP, and contamination layers</p>
                <p className="text-slate-500 text-xs">Overflow sites • Drain outfalls • STP locations • Leakage zones • Contamination pathways</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Incident Severity Cards */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Incident Severity Matrix</h2>
            <p className="text-slate-400">Active sewage overflow sites, treatment performance, and contamination indicators</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {incidentSeverityCards.map((card, i) => (
              <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow flex-shrink-0">
                      <card.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">{card.title}</h3>
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

      {/* Impacted Water Body Cross-links */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <Waves className="w-6 h-6 text-cyan-400" />
              Impacted Water Bodies
            </h2>
            <p className="text-slate-400">Contamination status and severity for Kashmir&apos;s lakes and rivers</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {impactedWaterBodies.map((w, i) => (
              <motion.div key={w.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">{w.name}</h3>
                    <Badge variant={w.status} size="sm">{w.contamination} contamination</Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs text-slate-400">{w.severity}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Eutrophication: <span className="text-slate-300">{w.eutrophication}</span></span>
                      <span className="text-slate-500">Assessed {w.lastAssessed}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      {w.verified ? (
                        <>
                          <Shield className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Verified</span>
                        </>
                      ) : (
                        <>
                          <Shield className="w-3 h-3 text-amber-400" />
                          <span className="text-amber-400">Pending</span>
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

      {/* Treatment Asset Status */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <Factory className="w-6 h-6 text-blue-400" />
              Treatment Asset Status
            </h2>
            <p className="text-slate-400">Sewage treatment plant locations, capacity, and compliance across Kashmir districts</p>
          </motion.div>

          <Card className="glass-intense border-white/10 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">STP</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Location</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Capacity</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Load</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Compliance</th>
                </tr>
              </thead>
              <tbody>
                {treatmentAssets.map((stp, i) => (
                  <motion.tr
                    key={stp.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          stp.status === 'Operational' ? 'bg-emerald-400' : stp.status === 'Under Stress' ? 'bg-amber-400' : 'bg-red-400'
                        }`} />
                        <span className="text-white font-medium">{stp.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-xs">{stp.location}</td>
                    <td className="py-3 px-4 text-center">
                      <Badge
                        variant={stp.status === 'Operational' ? 'success' : stp.status === 'Under Stress' ? 'warning' : 'danger'}
                        size="sm"
                        className="text-xs"
                      >
                        {stp.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center text-slate-300">{stp.capacity}</td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              parseInt(stp.load) >= 90 ? 'bg-red-400' : parseInt(stp.load) >= 70 ? 'bg-amber-400' : 'bg-emerald-400'
                            }`}
                            style={{ width: `${stp.load}%` }}
                          />
                        </div>
                        <span className="text-slate-300 text-xs">{stp.load}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`text-xs font-medium ${
                        stp.compliance === 'Compliant' ? 'text-emerald-400' : stp.compliance === 'Non-compliant' ? 'text-red-400' : 'text-amber-400'
                      }`}>
                        {stp.compliance}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </section>

      {/* Public Advisories */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              Public Advisories
            </h2>
            <p className="text-slate-400">Active water quality and sewage contamination advisories</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {publicAdvisories.map((advisory, i) => (
              <motion.div key={advisory.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">{advisory.title}</h3>
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

      {/* Recent Incident Feed */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <FileText className="w-6 h-6 text-blue-400" />
              Recent Sewage Incidents
            </h2>
            <p className="text-slate-400">Latest verified and pending sewage intelligence reports</p>
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

      {/* Cross-links */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Related Actions</h2>
            <p className="text-slate-400">Explore connected environmental monitoring domains</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Water Systems — Lakes', href: '/water-systems/lakes', desc: 'Lake ecosystem intelligence', icon: ExternalLink, color: 'from-cyan-500 to-blue-600' },
              { label: 'Water Systems — Wetlands', href: '/water-systems/wetlands', desc: 'Wetland monitoring & health', icon: ExternalLink, color: 'from-teal-500 to-emerald-600' },
              { label: 'Environmental Health', href: '/environmental-monitoring/environmental-health', desc: 'Health signal monitoring', icon: ExternalLink, color: 'from-amber-500 to-orange-600' },
              { label: 'Drinking Water', href: '/environmental-monitoring/drinking-water', desc: 'Potable water quality', icon: ExternalLink, color: 'from-blue-500 to-indigo-600' },
            ].map((link, i) => (
              <motion.div key={link.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group" onClick={() => router.push(link.href)}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center shadow flex-shrink-0`}>
                      <link.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">{link.label}</h3>
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
