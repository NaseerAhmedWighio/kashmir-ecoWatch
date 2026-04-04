'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Zap, ArrowRight, AlertTriangle, MapPin, Clock, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { liveAlerts } from '@/data/risk-monitoring';
import { AlertSeverity } from '@/types/alerts';

const earthquakeAlerts = liveAlerts.filter(a => a.hazardCategory === 'Earthquake' || a.type.includes('Earthquake') || a.type.includes('Seismic'));

const seismicZones = [
  { zone: 'Zone V (High Damage Risk)', districts: 'Kupwara, Baramulla, Bandipora', risk: 'Very High' },
  { zone: 'Zone IV (High Risk)', districts: 'Srinagar, Anantnag, Pulwama, Shopian', risk: 'High' },
  { zone: 'Zone III (Moderate Risk)', districts: 'Budgam, Ganderbal', risk: 'Moderate' },
];

const recentEvents = [
  { date: '2024-03-28', magnitude: '3.8', location: 'Tral, Pulwama', depth: '12 km', impact: 'No damage' },
  { date: '2024-03-15', magnitude: '2.9', location: 'Uri, Baramulla', depth: '8 km', impact: 'Felt lightly' },
  { date: '2024-02-28', magnitude: '4.2', location: 'Karnah, Kupwara', depth: '15 km', impact: 'Minor cracks' },
];

export default function EarthquakePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950"><section className="relative pt-20 md:pt-48 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/50 via-indigo-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <a href="/risk-monitoring" className="hover:text-white transition-colors">Risk & Monitoring</a>
              <span>/</span>
              <a href="/risk-monitoring/hazard-risks" className="hover:text-white transition-colors">Hazard Risks</a>
              <span>/</span>
              <span className="text-white font-medium">Earthquake</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-2xl">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <Badge variant="outline" size="lg" className="border-purple-500/30 text-purple-400">Seismic Exposure & Readiness</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Earthquake <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Risk</span>
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              Seismic exposure monitoring, vulnerable zone assessment, infrastructure sensitivity tracking, 
              and emergency readiness information across Kashmir's seismic zones.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-xl" onClick={() => router.push('/risk-monitoring/live-alerts')}>
                <AlertTriangle className="w-5 h-5 mr-2" />View Alerts
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => router.push('/risk-monitoring/hazard-risks')}>Back to Hazard Risks</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Seismic Zones */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Seismic Exposure Zones</h2>
          </div>
          <div className="space-y-4">
            {seismicZones.map((zone, idx) => (
              <Card key={zone.zone} className="glass-intense border-white/10 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">{zone.zone}</h3>
                    <span className="text-xs text-slate-400">Districts: {zone.districts}</span>
                  </div>
                  <Badge variant={zone.risk === 'Very High' ? 'danger' : zone.risk === 'High' ? 'warning' : 'info'} size="sm">{zone.risk}</Badge>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Seismic Events */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Recent Seismic Events</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Date</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Magnitude</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Location</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Depth</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Impact</th>
                </tr>
              </thead>
              <tbody>
                {recentEvents.map((event, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3 px-4 text-sm text-slate-300">{event.date}</td>
                    <td className="py-3 px-4 text-sm text-white font-bold">M{event.magnitude}</td>
                    <td className="py-3 px-4 text-sm text-slate-300">{event.location}</td>
                    <td className="py-3 px-4 text-sm text-slate-400">{event.depth}</td>
                    <td className="py-3 px-4 text-xs text-slate-400">{event.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Earthquake Alerts */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Active Seismic Alerts</h2>
          </div>
          <div className="space-y-4">
            {earthquakeAlerts.map((alert, idx) => (
              <Card key={alert.id} className="glass-intense border-white/10 border-l-4 border-l-purple-500 p-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-white mb-1">{alert.type}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-400 mb-2">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{alert.location}, {alert.district}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(alert.timestamp).toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-slate-400">{alert.description}</p>
                  </div>
                  <Badge variant="info" size="sm">{alert.severity.toUpperCase()}</Badge>
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
