'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Waves, ArrowRight, AlertTriangle, MapPin, Clock, TrendingUp, Droplets } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { liveAlerts } from '@/data/risk-monitoring';
import { AlertSeverity } from '@/types/alerts';

const hydroAlerts = liveAlerts.filter(a => a.hazardCategory === 'Hydrological Risk' || a.type.includes('River') || a.type.includes('Overflow'));

const waterSystems = [
  { system: 'Wular Lake', status: 'Watch', level: 'Approaching threshold', overflow: 'Risk to adjacent wetlands' },
  { system: 'Dal Lake', status: 'Stressed', level: 'Above normal', overflow: 'Catchment contamination' },
  { system: 'Manasbal Lake', status: 'Normal', level: 'Safe', overflow: 'No risk' },
  { system: 'Anchar Lake', status: 'Watch', level: 'Monitoring', overflow: 'Seasonal overflow possible' },
];

export default function HydrologicalRiskPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      <section className="relative pt-20 md:pt-48 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-950/50 via-cyan-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <a href="/risk-monitoring" className="hover:text-white transition-colors">Risk & Monitoring</a>
              <span>/</span>
              <a href="/risk-monitoring/hazard-risks" className="hover:text-white transition-colors">Hazard Risks</a>
              <span>/</span>
              <span className="text-white font-medium">Hydrological Risk</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-2xl">
                <Waves className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Water System Instability</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Hydrological <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Risk</span>
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              Water system instability monitoring, river and wetland-linked risk assessment, 
              overflow pressure tracking, sudden hydrological anomaly detection, and catchment stress intelligence.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-xl" onClick={() => router.push('/risk-monitoring/live-alerts')}>
                <AlertTriangle className="w-5 h-5 mr-2" />View Alerts
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => router.push('/risk-monitoring/hazard-risks')}>Back to Hazard Risks</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Water System Status */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <Droplets className="w-6 h-6 text-teal-400" />
            <h2 className="text-2xl font-bold text-white">Water System Status</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Water Body</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Status</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Water Level</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase">Overflow Risk</th>
                </tr>
              </thead>
              <tbody>
                {waterSystems.map((ws, idx) => (
                  <tr key={ws.system} className="border-b border-white/5 hover:bg-white/5">
                    <td className="py-3 px-4 text-sm font-medium text-white">{ws.system}</td>
                    <td className="py-3 px-4">
                      <Badge variant={ws.status === 'Normal' ? 'success' : ws.status === 'Watch' ? 'warning' : 'danger'} size="sm">{ws.status}</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-300">{ws.level}</td>
                    <td className="py-3 px-4 text-xs text-slate-400">{ws.overflow}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Hydrological Alerts */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-teal-400" />
            <h2 className="text-2xl font-bold text-white">Hydrological Alerts</h2>
          </div>
          <div className="space-y-4">
            {hydroAlerts.map((alert, idx) => (
              <Card key={alert.id} className="glass-intense border-white/10 border-l-4 border-l-teal-500 p-5">
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
            ))}
          </div>
        </div>
      </section>

      {/* Hydrological Anomaly Detection */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-teal-400" />
            <h2 className="text-2xl font-bold text-white">Hydrological Anomaly Detection</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { indicator: 'Flow Anomaly Index', value: 'Moderate', trend: 'stable' },
              { indicator: 'Catchment Stress', value: 'Elevated', trend: 'increasing' },
              { indicator: 'Wetland Pressure', value: 'Normal', trend: 'stable' },
            ].map((item, idx) => (
              <Card key={item.indicator} className="glass-intense border-white/10 p-5 text-center">
                <div className="text-xs text-slate-400 mb-2">{item.indicator}</div>
                <div className="text-3xl font-bold text-white mb-2">{item.value}</div>
                <div className="flex items-center justify-center gap-1">
                  <TrendingUp className={`w-4 h-4 ${item.trend === 'increasing' ? 'text-red-400' : 'text-slate-400'}`} />
                  <span className={`text-xs ${item.trend === 'increasing' ? 'text-red-400' : 'text-slate-400'}`}>{item.trend}</span>
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
