'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Factory, ArrowRight, Map, BarChart3, Eye,
  Trash2, Droplets, Wind, AlertTriangle, Waves,
  Building2, Cloud, Shield, Activity, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const submodules = [
  { name: 'Solid Waste', href: '/environmental-monitoring/solid-waste', icon: Trash2, color: 'from-gray-500 to-slate-600', status: '8 hotspots', statusColor: 'warning' },
  { name: 'Bio-Waste', href: '/environmental-monitoring/bio-waste', icon: Cloud, color: 'from-emerald-500 to-green-600', status: '3 zones', statusColor: 'info' },
  { name: 'Sewage & Wastewater', href: '/environmental-monitoring/sewage-wastewater', icon: Droplets, color: 'from-blue-500 to-cyan-600', status: '5 outfalls active', statusColor: 'danger' },
  { name: 'Drinking Water', href: '/environmental-monitoring/drinking-water', icon: Waves, color: 'from-cyan-500 to-teal-600', status: '2 advisories', statusColor: 'warning' },
  { name: 'Critical Water Infrastructure', href: '/environmental-monitoring/critical-infrastructure', icon: Building2, color: 'from-indigo-500 to-blue-600', status: '12 assets', statusColor: 'info' },
  { name: 'Air Pollution', href: '/environmental-monitoring/air-pollution', icon: Wind, color: 'from-slate-500 to-gray-600', status: 'AQI: Moderate', statusColor: 'info' },
  { name: 'Environmental Health', href: '/environmental-monitoring/environmental-health', icon: Shield, color: 'from-amber-500 to-orange-600', status: '6 signals', statusColor: 'warning' },
  { name: 'Utility Incidents', href: '/environmental-monitoring/utility-incidents', icon: AlertTriangle, color: 'from-red-500 to-orange-600', status: '3 active', statusColor: 'danger' },
  { name: 'Dashboards', href: '/environmental-monitoring/dashboards', icon: BarChart3, color: 'from-violet-500 to-purple-600', status: 'Analytics', statusColor: 'default' },
];

const districtStress = [
  { district: 'Srinagar', stress: 'High', alerts: 12, trend: 'worsening' as const },
  { district: 'Anantnag', stress: 'Moderate', alerts: 7, trend: 'stable' as const },
  { district: 'Baramulla', stress: 'Moderate', alerts: 5, trend: 'improving' as const },
  { district: 'Pulwama', stress: 'Moderate', alerts: 6, trend: 'worsening' as const },
  { district: 'Budgam', stress: 'Low', alerts: 3, trend: 'stable' as const },
  { district: 'Ganderbal', stress: 'Low', alerts: 2, trend: 'stable' as const },
];

const recentReports = [
  { type: 'Sewage Overflow', location: 'Dal Lake periphery, Srinagar', severity: 'High', time: '2h ago', verified: true },
  { type: 'Open Waste Burning', location: 'Nowhatta, Srinagar', severity: 'Moderate', time: '5h ago', verified: true },
  { type: 'Drinking Water Contamination', location: 'Kulgam town', severity: 'High', time: '8h ago', verified: false },
  { type: 'Bio-Waste Accumulation', location: 'Market area, Anantnag', severity: 'Low', time: '1d ago', verified: true },
  { type: 'Air Quality Event', location: 'Traffic corridor, Baramulla', severity: 'Moderate', time: '1d ago', verified: true },
];

export default function EnvironmentalMonitoringOverview() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-48 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/50 via-orange-950/30 to-slate-950" />
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <button onClick={() => router.push('/')} className="hover:text-white transition-colors">Home</button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">Environmental Monitoring</span>
            </nav>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl">
                <Factory className="w-8 h-8 text-white" />
              </div>
              <Badge variant="warning" size="lg">Environmental Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Environmental <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Monitoring</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Monitoring waste systems, sewage, drinking water, air pollution, environmental stress,
              and public ecological service risks across Kashmir
            </p>
          </motion.div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { label: 'Active Alerts', value: '38', sub: 'District-wide', color: 'text-red-400' },
              { label: 'Sewage Outfalls', value: '5', sub: 'Active discharge', color: 'text-blue-400' },
              { label: 'Waste Hotspots', value: '8', sub: 'Mapped & verified', color: 'text-amber-400' },
              { label: 'AQI Status', value: 'Mod', sub: 'Kashmir avg', color: 'text-emerald-400' },
              { label: 'Water Advisories', value: '2', sub: 'Active notices', color: 'text-cyan-400' },
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

      {/* Submodules Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Monitoring Domains</h2>
            <p className="text-slate-400">Access all environmental intelligence submodules</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {submodules.map((mod, i) => (
              <motion.div key={mod.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.03 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group" onClick={() => router.push(mod.href)}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${mod.color} flex items-center justify-center shadow flex-shrink-0`}>
                      <mod.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">{mod.name}</h3>
                        <Badge variant={mod.statusColor as any} size="sm" className="text-xs">{mod.status}</Badge>
                      </div>
                      <p className="text-xs text-slate-400">{mod.desc || 'Environmental intelligence module'}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* District Stress + Recent Reports */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* District Stress */}
            <div>
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-amber-400" />
                District Stress Overview
              </h2>
              <Card className="glass-intense border-white/10 p-5">
                <div className="space-y-3">
                  {districtStress.map((d) => (
                    <div key={d.district} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0 last:pb-0">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${
                          d.stress === 'High' ? 'bg-red-400' : d.stress === 'Moderate' ? 'bg-amber-400' : 'bg-emerald-400'
                        }`} />
                        <span className="text-sm text-white font-medium">{d.district}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400">{d.alerts} alerts</span>
                        <Badge variant={d.stress === 'High' ? 'danger' : d.stress === 'Moderate' ? 'warning' : 'success'} size="sm">{d.stress}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Recent Reports */}
            <div>
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-400" />
                Recent Verified Reports
              </h2>
              <Card className="glass-intense border-white/10 p-5">
                <div className="space-y-3">
                  {recentReports.map((r, i) => (
                    <div key={i} className="py-2 border-b border-white/5 last:border-0 last:pb-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-white font-medium">{r.type}</span>
                        <div className="flex items-center gap-2">
                          {r.verified && <Badge variant="success" size="sm" className="text-xs">Verified</Badge>}
                          <Badge variant={r.severity === 'High' ? 'danger' : 'warning'} size="sm" className="text-xs">{r.severity}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Map className="w-3 h-3" />
                        <span>{r.location}</span>
                        <span className="text-slate-600">•</span>
                        <span>{r.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Preview */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 overflow-hidden">
            <div className="p-6 flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Map className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Environmental Assets & Pressure Map</h3>
              </div>
              <Button size="sm" variant="outline" className="border-white/20 text-white" onClick={() => router.push('/environmental-monitoring/dashboards')}>
                <BarChart3 className="w-4 h-4 mr-2" />
                Open Dashboard
              </Button>
            </div>
            <div className="h-72 bg-gradient-to-br from-amber-900/30 to-slate-900/50 flex items-center justify-center border-t border-white/5">
              <div className="text-center">
                <Map className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400 text-sm mb-1">Interactive environmental asset map with waste, sewage, and air quality layers</p>
                <p className="text-slate-500 text-xs">Solid waste • Bio-waste • Sewage outfalls • Drinking water • Air quality stations</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Escalation Logic Note */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-amber-500/20 p-6">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-amber-400 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-bold text-white mb-1">Escalation to Risk & Monitoring</h3>
                <p className="text-sm text-slate-400">
                  When environmental conditions cross critical thresholds — landfill fires, major sewage overflows,
                  severe AQI events, unsafe drinking water contamination — they are escalated and mirrored into
                  the <span className="text-white font-medium">Risk & Monitoring</span> module for emergency response.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
