'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Droplets, ArrowRight, TrendingUp, MapPin, Clock, AlertTriangle, Waves, Eye
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { liveAlerts, advisories } from '@/data/risk-monitoring';
import { AlertSeverity } from '@/types/alerts';

const floodAlerts = liveAlerts.filter(a => 
  a.hazardCategory === 'Flood & Flash Flood' || 
  a.type.includes('Flood') || 
  a.type.includes('River')
);

const riverSystems = [
  { name: 'Jhelum', status: 'Rising', level: 'Warning Level', trend: 'increasing' as const, flow: '2,450 m³/s' },
  { name: 'Kishanganga', status: 'Watch', level: 'Below Threshold', trend: 'stable' as const, flow: '890 m³/s' },
  { name: 'Lidder', status: 'Normal', level: 'Safe', trend: 'stable' as const, flow: '450 m³/s' },
  { name: 'Sind', status: 'Normal', level: 'Safe', trend: 'decreasing' as const, flow: '520 m³/s' },
  { name: 'Chenab', status: 'Watch', level: 'Monitoring', trend: 'increasing' as const, flow: '1,780 m³/s' },
];

const flashFloodCorridors = [
  { name: 'Kupwara Basin', risk: 'High', rainfall: 'Heavy', history: '3 events (2024)' },
  { name: 'Bandipora Catchment', risk: 'Moderate', rainfall: 'Moderate', history: '1 event (2024)' },
  { name: 'Srinagar Urban', risk: 'High', rainfall: 'Urban Drainage', history: '5 events (2024)' },
  { name: 'Baramulla Lowlands', risk: 'Moderate', rainfall: 'Moderate', history: '2 events (2024)' },
];

const districtFloodRisk = [
  { district: 'Srinagar', risk: 'High', alerts: 8, rivers: 'Jhelum', settlements: 'Downtown, Hazratbal' },
  { district: 'Baramulla', risk: 'High', alerts: 6, rivers: 'Jhelum, Kishanganga', settlements: 'Uri, Rafiabad' },
  { district: 'Kupwara', risk: 'Moderate', alerts: 4, rivers: 'Kishanganga', settlements: 'Karnah, Lolab' },
  { district: 'Bandipora', risk: 'Moderate', alerts: 5, rivers: 'Wular Outflow', settlements: 'Ajas, Hajin' },
  { district: 'Ganderbal', risk: 'Low', alerts: 2, rivers: 'Sind', settlements: 'Kangan, Gund' },
];

const getRiskBadge = (risk: string) => {
  switch (risk) {
    case 'Critical': return <Badge variant="danger" size="sm">{risk}</Badge>;
    case 'High': return <Badge variant="warning" size="sm">{risk}</Badge>;
    case 'Moderate': return <Badge variant="info" size="sm">{risk}</Badge>;
    case 'Low': return <Badge variant="success" size="sm">{risk}</Badge>;
    default: return null;
  }
};

export default function FloodFlashFloodPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">{/* Hero Section */}
      <section className="relative pt-20 md:pt-48 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-cyan-950/30 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <a href="/risk-monitoring" className="hover:text-white transition-colors">Risk & Monitoring</a>
              <span>/</span>
              <a href="/risk-monitoring/hazard-risks" className="hover:text-white transition-colors">Hazard Risks</a>
              <span>/</span>
              <span className="text-white font-medium">Flood & Flash Flood</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-2xl">
                <Droplets className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">River & Inundation Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Flood & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Flash Flood</span> Risk
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              River overflow monitoring, flash flood corridors, inundation risk assessment, 
              and drainage stress intelligence across Kashmir's hydrological systems.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white shadow-xl"
                onClick={() => router.push('/risk-monitoring/live-alerts')}
              >
                <AlertTriangle className="w-5 h-5 mr-2" />
                View Flood Alerts
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                onClick={() => router.push('/risk-monitoring/hazard-risks')}
              >
                Back to Hazard Risks
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Active Flood Alerts */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Active Flood Alerts</h2>
          </div>
          <div className="space-y-4">
            {floodAlerts.map((alert, idx) => (
              <motion.div key={alert.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}>
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-lg ${alert.severity === AlertSeverity.CRITICAL ? 'bg-red-500/20' : alert.severity === AlertSeverity.SERIOUS ? 'bg-orange-500/20' : 'bg-amber-500/20'} flex items-center justify-center`}>
                        <Droplets className={`w-6 h-6 ${alert.severity === AlertSeverity.CRITICAL ? 'text-red-400' : alert.severity === AlertSeverity.SERIOUS ? 'text-orange-400' : 'text-amber-400'}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-base font-bold text-white mb-1">{alert.type}</h3>
                        <div className="flex items-center gap-4 text-sm text-slate-400 mb-2">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{alert.location}, {alert.district}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(alert.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-slate-400">{alert.description}</p>
                      </div>
                    </div>
                    <Badge variant={alert.severity === AlertSeverity.CRITICAL ? 'danger' : alert.severity === AlertSeverity.SERIOUS ? 'warning' : 'info'} size="sm">
                      {alert.severity.toUpperCase()}
                    </Badge>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* River System Status */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <Waves className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">River System Status</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">River</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Water Level</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Flow Rate</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Trend</th>
                </tr>
              </thead>
              <tbody>
                {riverSystems.map((river) => (
                  <tr key={river.name} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 text-sm font-medium text-white">{river.name}</td>
                    <td className="py-3 px-4">
                      <Badge variant={river.status === 'Normal' ? 'success' : river.status === 'Watch' ? 'warning' : 'danger'} size="sm">
                        {river.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-300">{river.level}</td>
                    <td className="py-3 px-4 text-sm text-slate-300">{river.flow}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <TrendingUp className={`w-3 h-3 ${river.trend === 'increasing' ? 'text-red-400' : river.trend === 'decreasing' ? 'text-green-400' : 'text-slate-400'}`} />
                        <span className={`text-xs ${river.trend === 'increasing' ? 'text-red-400' : river.trend === 'decreasing' ? 'text-green-400' : 'text-slate-400'}`}>
                          {river.trend}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* District Flood Risk Rankings */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">District Flood Risk Rankings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Rank</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">District</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Risk Level</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Alerts</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">River Systems</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Vulnerable Settlements</th>
                </tr>
              </thead>
              <tbody>
                {districtFloodRisk.map((d, idx) => (
                  <tr key={d.district} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 text-sm text-slate-400">#{idx + 1}</td>
                    <td className="py-3 px-4 text-sm font-medium text-white">{d.district}</td>
                    <td className="py-3 px-4">{getRiskBadge(d.risk)}</td>
                    <td className="py-3 px-4 text-sm text-slate-300">{d.alerts}</td>
                    <td className="py-3 px-4 text-xs text-slate-400">{d.rivers}</td>
                    <td className="py-3 px-4 text-xs text-slate-400">{d.settlements}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Flash Flood Corridors */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <Eye className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Flash Flood Corridors</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {flashFloodCorridors.map((corridor, idx) => (
              <Card key={corridor.name} className="glass-intense border-white/10 p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-sm font-bold text-white">{corridor.name}</h3>
                  {getRiskBadge(corridor.risk)}
                </div>
                <div className="space-y-2 text-xs text-slate-400">
                  <div className="flex items-center justify-between">
                    <span>Rainfall:</span>
                    <span className="text-white">{corridor.rainfall}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>History (2024):</span>
                    <span className="text-white">{corridor.history}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Active Advisories */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-bold text-white">Active Flood Advisories</h2>
          </div>
          <div className="space-y-4">
            {advisories.filter(a => a.hazardCategory.includes('Flood')).map((advisory, idx) => (
              <Card key={advisory.id} className="glass-intense border-white/10 p-5">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={advisory.type === 'warning' ? 'danger' : advisory.type === 'watch' ? 'warning' : 'info'} size="sm">
                      {advisory.type.toUpperCase()}
                    </Badge>
                    <h3 className="text-sm font-bold text-white">{advisory.title}</h3>
                  </div>
                </div>
                <p className="text-xs text-slate-400 mb-2">{advisory.description}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{advisory.district}</span>
                  <span>Valid until: {new Date(advisory.validUntil).toLocaleDateString()}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
