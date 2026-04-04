'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Flame, ArrowRight, AlertTriangle, MapPin, Clock, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { liveAlerts } from '@/data/risk-monitoring';
import { AlertSeverity } from '@/types/alerts';

const fireAlerts = liveAlerts.filter(a => a.hazardCategory === 'Forest Fire' || a.type.includes('Fire'));

const fireProneZones = [
  { zone: 'Kerni Forest Range', district: 'Baramulla', risk: 'High', status: 'Active Fire', area: '45 hectares at risk' },
  { zone: 'Gulmarg Wildlife Sanctuary', district: 'Baramulla', risk: 'High', status: 'Watch', area: '120 hectares monitored' },
  { zone: 'Dachigam National Park', district: 'Srinagar', risk: 'Moderate', status: 'Monitoring', area: '200 hectares protected' },
  { zone: 'Overa-Aru Sanctuary', district: 'Anantnag', risk: 'Moderate', status: 'Stable', area: '85 hectares at risk' },
];

export default function ForestFirePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950"><section className="relative pt-20 md:pt-48 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-950/50 via-red-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <a href="/risk-monitoring" className="hover:text-white transition-colors">Risk & Monitoring</a>
              <span>/</span>
              <a href="/risk-monitoring/hazard-risks" className="hover:text-white transition-colors">Hazard Risks</a>
              <span>/</span>
              <span className="text-white font-medium">Forest Fire</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-2xl">
                <Flame className="w-8 h-8 text-white" />
              </div>
              <Badge variant="warning" size="lg">Active Fire Intelligence</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Forest <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">Fire</span> Risk
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              Active fire event monitoring, fire-prone zone mapping, smoke visibility tracking, 
              forest pressure intelligence, and district fire status across Kashmir.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-xl" onClick={() => router.push('/risk-monitoring/live-alerts')}>
                <AlertTriangle className="w-5 h-5 mr-2" />View Fire Alerts
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => router.push('/risk-monitoring/hazard-risks')}>Back to Hazard Risks</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Active Fire Alerts */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-orange-400" />
            <h2 className="text-2xl font-bold text-white">Active Fire Alerts</h2>
          </div>
          <div className="space-y-4">
            {fireAlerts.map((alert, idx) => (
              <motion.div key={alert.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}>
                <Card className="glass-intense border-white/10 border-l-4 border-l-orange-500 p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-white mb-1">{alert.type}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-400 mb-2">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{alert.location}, {alert.district}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(alert.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-slate-400">{alert.description}</p>
                    </div>
                    <Badge variant={alert.severity === AlertSeverity.CRITICAL ? 'danger' : alert.severity === AlertSeverity.SERIOUS ? 'warning' : 'info'} size="sm">{alert.severity.toUpperCase()}</Badge>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Fire-Prone Zones */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <Eye className="w-6 h-6 text-orange-400" />
            <h2 className="text-2xl font-bold text-white">Fire-Prone Zones</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fireProneZones.map((zone, idx) => (
              <Card key={zone.zone} className="glass-intense border-white/10 p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">{zone.zone}</h3>
                    <span className="text-xs text-slate-500">{zone.district}</span>
                  </div>
                  <Badge variant={zone.risk === 'High' ? 'warning' : 'info'} size="sm">{zone.risk}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                  <div><span className="text-slate-500">Status:</span> <span className="text-white">{zone.status}</span></div>
                  <div><span className="text-slate-500">Area:</span> <span className="text-white">{zone.area}</span></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* District Fire Status */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-6 h-6 text-orange-400" />
            <h2 className="text-2xl font-bold text-white">District Fire Status</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">District</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Active Fires</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Risk Level</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { district: 'Baramulla', fires: 2, risk: 'High', status: 'Active Response' },
                  { district: 'Anantnag', fires: 0, risk: 'Moderate', status: 'Monitoring' },
                  { district: 'Shopian', fires: 1, risk: 'High', status: 'Watch' },
                  { district: 'Kupwara', fires: 0, risk: 'Moderate', status: 'Stable' },
                ].map((d, idx) => (
                  <tr key={d.district} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3 px-4 text-sm font-medium text-white">{d.district}</td>
                    <td className="py-3 px-4 text-sm text-slate-300">{d.fires}</td>
                    <td className="py-3 px-4"><Badge variant={d.risk === 'High' ? 'warning' : 'info'} size="sm">{d.risk}</Badge></td>
                    <td className="py-3 px-4 text-xs text-slate-400">{d.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
