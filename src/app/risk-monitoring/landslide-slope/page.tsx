'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Mountain, ArrowRight, TrendingUp, MapPin, Clock, AlertTriangle, Shield, AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { liveAlerts, districtRiskProfiles } from '@/data/risk-monitoring';
import { AlertSeverity } from '@/types/alerts';

const landslideAlerts = liveAlerts.filter(a => a.hazardCategory === 'Landslide & Slope' || a.type.includes('Landslide'));

const highRiskCorridors = [
  { name: 'Z-Morh Corridor (KM 42)', district: 'Anantnag', risk: 'Critical', factors: 'Active slide, heavy traffic, fresh debris', status: 'Partially Blocked' },
  { name: 'Srinagar-Jammu Highway (NH44)', district: 'Anantnag', risk: 'High', factors: 'Steep slopes, rainfall, geological fault', status: 'Restricted' },
  { name: 'Sonamarg Road (KM 18)', district: 'Ganderbal', risk: 'High', factors: 'Avalanche debris, slope instability', status: 'Closed' },
  { name: 'Kupwara-Tangdhar Road', district: 'Kupwara', risk: 'Moderate', factors: 'Snow melt, terrain vulnerability', status: 'Limited Access' },
  { name: 'Shopian-Keller Road', district: 'Shopian', risk: 'Moderate', factors: 'Soil saturation, historical slides', status: 'Open - Monitor' },
];

const slopeIndicators = [
  { indicator: 'Rainfall Threshold', value: '85mm (24h)', status: 'Warning' },
  { indicator: 'Soil Saturation', value: '78%', status: 'High' },
  { indicator: 'Recent Seismic Impact', value: 'M3.8 (Pulwama)', status: 'Monitoring' },
  { indicator: 'Vegetation Cover', value: 'Stable', status: 'Normal' },
];

export default function LandslideSlopePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950"><section className="relative pt-20 md:pt-48 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/50 via-orange-950/30 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <a href="/risk-monitoring" className="hover:text-white transition-colors">Risk & Monitoring</a>
              <span>/</span>
              <a href="/risk-monitoring/hazard-risks" className="hover:text-white transition-colors">Hazard Risks</a>
              <span>/</span>
              <span className="text-white font-medium">Landslide & Slope</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl">
                <Mountain className="w-8 h-8 text-white" />
              </div>
              <Badge variant="warning" size="lg">Slope Instability Intelligence</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Landslide & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Slope</span> Risk
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              Slope instability monitoring, landslide-prone corridors, road vulnerability intelligence, 
              and hill/mountain risk assessment across Kashmir's terrain.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-xl" onClick={() => router.push('/risk-monitoring/live-alerts')}>
                <AlertTriangle className="w-5 h-5 mr-2" />View Alerts
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => router.push('/risk-monitoring/hazard-risks')}>Back to Hazard Risks</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Active Landslide Alerts */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-bold text-white">Active Landslide Alerts</h2>
          </div>
          <div className="space-y-4">
            {landslideAlerts.map((alert, idx) => (
              <motion.div key={alert.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}>
                <Card className="glass-intense border-white/10 border-l-4 border-l-amber-500 p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-white mb-1">{alert.type}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-400 mb-2">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{alert.location}, {alert.district}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(alert.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-slate-400">{alert.description}</p>
                    </div>
                    <Badge variant={alert.severity === AlertSeverity.CRITICAL ? 'danger' : 'warning'} size="sm">{alert.severity.toUpperCase()}</Badge>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* High-Risk Terrain Segments */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-bold text-white">High-Risk Terrain Corridors</h2>
          </div>
          <div className="space-y-4">
            {highRiskCorridors.map((corridor, idx) => (
              <Card key={corridor.name} className="glass-intense border-white/10 p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">{corridor.name}</h3>
                    <span className="text-xs text-slate-500">{corridor.district}</span>
                  </div>
                  <Badge variant={corridor.risk === 'Critical' ? 'danger' : corridor.risk === 'High' ? 'warning' : 'info'} size="sm">{corridor.risk}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                  <div><span className="text-slate-500">Risk Factors:</span> {corridor.factors}</div>
                  <div><span className="text-slate-500">Status:</span> <span className="text-white">{corridor.status}</span></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Slope Stability Indicators */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-bold text-white">Slope Stability Indicators</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {slopeIndicators.map((indicator, idx) => (
              <Card key={indicator.indicator} className="glass-intense border-white/10 p-5 text-center">
                <div className="text-xs text-slate-400 mb-2">{indicator.indicator}</div>
                <div className="text-2xl font-bold text-white mb-1">{indicator.value}</div>
                <Badge variant={indicator.status === 'Warning' || indicator.status === 'High' ? 'warning' : 'success'} size="sm">{indicator.status}</Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
