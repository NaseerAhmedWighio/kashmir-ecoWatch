'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  HeartPulse, Map, BarChart3, ChevronRight, AlertTriangle,
  FileText, ArrowRight, Activity, Clock,
  MapPin, ExternalLink, Droplets, Fish, Waves,
  Bug, Skull, ThermometerSun
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const healthSignalCards = [
  {
    title: 'Fish Kill Events',
    location: 'Multiple water bodies',
    severity: 'critical' as const,
    verified: true,
    count: 8,
    lastReported: '4h ago',
    icon: Fish,
    description: 'Mass fish mortality indicating water quality degradation',
  },
  {
    title: 'Stagnant Water Zones',
    location: 'Urban wetlands, drains',
    severity: 'warning' as const,
    verified: true,
    count: 23,
    lastReported: '1d ago',
    icon: Waves,
    description: 'Standing water creating vector breeding habitats',
  },
  {
    title: 'Odor Complaints',
    location: 'Srinagar, Anantnag',
    severity: 'warning' as const,
    verified: true,
    count: 34,
    lastReported: '6h ago',
    icon: ThermometerSun,
    description: 'Foul odor from sewage, decomposition, industrial discharge',
  },
  {
    title: 'Algal Bloom Detection',
    location: 'Dal Lake, Wular',
    severity: 'danger' as const,
    verified: true,
    count: 5,
    lastReported: '8h ago',
    icon: Droplets,
    description: 'Harmful algal blooms depleting dissolved oxygen',
  },
  {
    title: 'Vector Breeding Sites',
    location: 'Wetland periphery',
    severity: 'danger' as const,
    verified: false,
    count: 12,
    lastReported: '2d ago',
    icon: Bug,
    description: 'Mosquito breeding zones near stagnant water bodies',
  },
  {
    title: 'Bio-Indicator Monitoring',
    location: 'Kashmir valley',
    severity: 'info' as const,
    verified: true,
    count: 6,
    lastReported: '3d ago',
    icon: HeartPulse,
    description: 'Sentinel species health reflecting ecosystem stress',
  },
];

const districtHealthSignals = [
  { district: 'Srinagar', signals: 42, criticalSignals: 8, fishKill: 3, odorReports: 14, stagnantWater: 9, algalBloom: 2 },
  { district: 'Anantnag', signals: 18, criticalSignals: 3, fishKill: 2, odorReports: 5, stagnantWater: 4, algalBloom: 1 },
  { district: 'Baramulla', signals: 12, criticalSignals: 2, fishKill: 1, odorReports: 3, stagnantWater: 3, algalBloom: 0 },
  { district: 'Pulwama', signals: 15, criticalSignals: 4, fishKill: 1, odorReports: 6, stagnantWater: 5, algalBloom: 1 },
  { district: 'Budgam', signals: 8, criticalSignals: 1, fishKill: 0, odorReports: 2, stagnantWater: 3, algalBloom: 0 },
  { district: 'Ganderbal', signals: 9, criticalSignals: 2, fishKill: 1, odorReports: 2, stagnantWater: 2, algalBloom: 1 },
  { district: 'Kupwara', signals: 5, criticalSignals: 0, fishKill: 0, odorReports: 1, stagnantWater: 2, algalBloom: 0 },
  { district: 'Shopian', signals: 6, criticalSignals: 1, fishKill: 0, odorReports: 1, stagnantWater: 2, algalBloom: 0 },
];

const environmentalHealthAdvisories = [
  {
    title: 'Fish Kill Alert — Dal Lake Periphery',
    source: 'Aquatic Health Monitoring',
    status: 'Active',
    desc: 'Mass fish mortality detected in 3 zones of Dal Lake. Water sampling reveals low dissolved oxygen (3.2 mg/L) and elevated ammonia. Immediate aeration and source investigation required.',
    issued: '4h ago',
    icon: Fish,
  },
  {
    title: 'Stagnant Water Vector Risk — Rajbagh Drain',
    source: 'Urban Health Signals',
    status: 'Advisory',
    desc: 'Prolonged water stagnation in Rajbagh main drain creating mosquito breeding habitat. 23 confirmed stagnant zones. Larvicidal treatment and drain clearance recommended before monsoon.',
    issued: '1 day ago',
    icon: Waves,
  },
  {
    title: 'Odor Pollution — Industrial Zone Ganderbal',
    source: 'Community Reports',
    status: 'Monitoring',
    desc: 'Persistent foul odor from industrial effluent discharge zone. 12 resident complaints in past week. Source tracing and enforcement action recommended.',
    issued: '2 days ago',
    icon: ThermometerSun,
  },
  {
    title: 'Harmful Algal Bloom — Wular Lake Sector 4',
    source: 'Satellite Detection',
    status: 'Active',
    desc: 'Cyanobacteria bloom detected via Sentinel-2 imagery covering 2.3 hectares. Toxin risk to aquatic life and human health. Water contact advisory issued for downstream communities.',
    issued: '8h ago',
    icon: Droplets,
  },
];

const recentIncidents = [
  { type: 'Fish Kill — Dal Lake Zone 2', location: 'Hazratbal basin, Srinagar', severity: 'Critical', time: '4h ago', verified: true },
  { type: 'Odor Pollution Spike', location: 'Nowgam industrial area', severity: 'High', time: '6h ago', verified: true },
  { type: 'Algal Bloom Detected', location: 'Wular Lake Sector 4', severity: 'Critical', time: '8h ago', verified: true },
  { type: 'Stagnant Water Complaint', location: 'Rajbagh drain, Srinagar', severity: 'Moderate', time: '1 day ago', verified: true },
  { type: 'Vector Breeding Site', location: 'Lidder riverbank, Anantnag', severity: 'High', time: '2 days ago', verified: false },
];

export default function EnvironmentalHealthPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">{/* Hero */}
      <section className="relative pt-48 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/30 via-orange-900/20 to-slate-950" />
        <div className="absolute inset-0 bg-grid opacity-10" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <button onClick={() => router.push('/')} className="hover:text-white transition-colors">Home</button>
              <ChevronRight className="w-4 h-4" />
              <button onClick={() => router.push('/environmental-monitoring')} className="hover:text-white transition-colors">Environmental Monitoring</button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">Environmental Health</span>
            </nav>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl">
                <HeartPulse className="w-8 h-8 text-white" />
              </div>
              <Badge variant="warning" size="lg">Health Signal Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Environmental <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">Health</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Monitoring ecosystem health signals — fish kills, odor pollution, stagnant water,
              algal blooms, and vector breeding sites across Kashmir&apos;s water bodies and urban zones
            </p>
          </motion.div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { label: 'Active Signals', value: '115', sub: 'Last 7 days', color: 'text-amber-400' },
              { label: 'Fish Kill Events', value: '8', sub: 'Valley-wide', color: 'text-red-400' },
              { label: 'Odor Complaints', value: '34', sub: 'Urban zones', color: 'text-orange-400' },
              { label: 'Stagnant Water Zones', value: '30', sub: 'Vector risk', color: 'text-amber-400' },
              { label: 'Algal Blooms', value: '5', sub: 'Active detection', color: 'text-cyan-400' },
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
                <Map className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Health Signal Hotspot Map</h3>
              </div>
              <Button size="sm" variant="outline" className="border-white/20 text-white" onClick={() => router.push('/environmental-monitoring/dashboards')}>
                <BarChart3 className="w-4 h-4 mr-2" />
                Open Dashboard
              </Button>
            </div>
            <div className="h-80 bg-gradient-to-br from-amber-900/20 to-orange-900/10 flex items-center justify-center border-t border-white/5">
              <div className="text-center">
                <Map className="w-14 h-14 text-amber-800 mx-auto mb-3" />
                <p className="text-slate-400 text-sm mb-1">Interactive environmental health signal map with hotspot layers</p>
                <p className="text-slate-500 text-xs">Fish kills • Odor zones • Stagnant water • Algal blooms • Vector sites</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Health Signal Cards */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Environmental Health Signal Matrix</h2>
            <p className="text-slate-400">Active health indicators, severity, and verified incident count</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {healthSignalCards.map((card, i) => (
              <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow flex-shrink-0">
                        <card.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">{card.title}</h3>
                        <p className="text-xs text-slate-400">{card.count} incidents • {card.lastReported}</p>
                      </div>
                    </div>
                    <Badge variant={card.severity} size="sm">{card.severity}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span>{card.location}</span>
                    </div>
                    <p className="text-xs text-slate-500">{card.description}</p>
                    {card.verified ? (
                      <Badge variant="success" size="sm" className="text-xs mt-1">Verified</Badge>
                    ) : (
                      <Badge variant="warning" size="sm" className="text-xs mt-1">Unverified</Badge>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* District Health Signals Table */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <Activity className="w-6 h-6 text-amber-400" />
              District Health Signal Profiles
            </h2>
            <p className="text-slate-400">Signal count, fish kills, odor reports, and algal bloom detection by district</p>
          </motion.div>

          <Card className="glass-intense border-white/10 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">District</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Signals</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Critical</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Fish Kill</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Odor</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Stagnant</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Algal Bloom</th>
                </tr>
              </thead>
              <tbody>
                {districtHealthSignals.map((d, i) => (
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
                      <Badge variant={d.signals >= 30 ? 'danger' : d.signals >= 15 ? 'warning' : 'success'} size="sm">
                        {d.signals}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`text-xs font-bold ${d.criticalSignals >= 5 ? 'text-red-400' : d.criticalSignals >= 2 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {d.criticalSignals}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-slate-300">{d.fishKill}</td>
                    <td className="py-3 px-4 text-center text-slate-300">{d.odorReports}</td>
                    <td className="py-3 px-4 text-center text-slate-300">{d.stagnantWater}</td>
                    <td className="py-3 px-4 text-center">
                      {d.algalBloom > 0 ? (
                        <Badge variant="danger" size="sm">{d.algalBloom}</Badge>
                      ) : (
                        <span className="text-xs text-emerald-400">None</span>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </section>

      {/* Health Advisories */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              Environmental Health Advisories
            </h2>
            <p className="text-slate-400">Active alerts and intervention recommendations for ecosystem health threats</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {environmentalHealthAdvisories.map((advisory, i) => (
              <motion.div key={advisory.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-600/20 flex items-center justify-center">
                        <advisory.icon className="w-4 h-4 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">{advisory.title}</h3>
                        <p className="text-xs text-slate-500">{advisory.source}</p>
                      </div>
                    </div>
                    <Badge variant={advisory.status === 'Active' ? 'danger' : advisory.status === 'Monitoring' ? 'warning' : 'info'} size="sm">
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
              <FileText className="w-6 h-6 text-amber-400" />
              Recent Health Signal Incidents
            </h2>
            <p className="text-slate-400">Latest verified ecosystem health events and community reports</p>
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
              { label: 'Drinking Water', href: '/environmental-monitoring/drinking-water', desc: 'Contamination alerts & supply', icon: ExternalLink, color: 'from-cyan-500 to-teal-600' },
              { label: 'Sewage & Wastewater', href: '/environmental-monitoring/sewage-wastewater', desc: 'Overflow and discharge monitoring', icon: ExternalLink, color: 'from-blue-500 to-cyan-600' },
              { label: 'Bio-Waste', href: '/environmental-monitoring/bio-waste', desc: 'Organic waste & decomposition', icon: ExternalLink, color: 'from-emerald-500 to-green-600' },
              { label: 'Dashboards', href: '/environmental-monitoring/dashboards', desc: 'District comparison & stress maps', icon: ExternalLink, color: 'from-violet-500 to-purple-600' },
            ].map((link, i) => (
              <motion.div key={link.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group" onClick={() => router.push(link.href)}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center shadow flex-shrink-0`}>
                      <link.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">{link.label}</h3>
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
