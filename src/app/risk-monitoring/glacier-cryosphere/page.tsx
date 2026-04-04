'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Mountain, ArrowRight, AlertTriangle, MapPin, Clock, Waves, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { liveAlerts } from '@/data/risk-monitoring';
import { AlertSeverity } from '@/types/alerts';

const glacierAlerts = liveAlerts.filter(a => a.hazardCategory === 'Glacier & Cryosphere' || a.type.includes('Glacier'));

const glacierRiskAreas = [
  { name: 'Kolahoi Glacier', district: 'Ganderbal', risk: 'Moderate', status: 'Monitoring', concern: 'Increased melt rate, potential GLOF risk' },
  { name: 'Machoi Glacier', district: 'Ganderbal', risk: 'Moderate', status: 'Stable', concern: 'Gradual retreat, lake formation' },
  { name: 'Harmukh Glaciers', district: 'Baramulla', risk: 'Low', status: 'Monitoring', concern: 'Seasonal melt patterns' },
  { name: 'Kupwara Highlands Glaciers', district: 'Kupwara', risk: 'Low', status: 'Stable', concern: 'Cryosphere sensitivity' },
];

export default function GlacierCryospherePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      <section className="relative pt-20 md:pt-48 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/50 via-blue-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <a href="/risk-monitoring" className="hover:text-white transition-colors">Risk & Monitoring</a>
              <span>/</span>
              <a href="/risk-monitoring/hazard-risks" className="hover:text-white transition-colors">Hazard Risks</a>
              <span>/</span>
              <span className="text-white font-medium">Glacier & Cryosphere</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl">
                <Waves className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Glacier-Linked Environmental Risk</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Glacier & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Cryosphere</span>
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              Glacier-linked environmental risk monitoring, cryosphere sensitivity assessment, 
              glacial lake formation tracking, and snow/melt stress indicators across Kashmir's cryosphere.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-xl" onClick={() => router.push('/risk-monitoring/live-alerts')}>
                <AlertTriangle className="w-5 h-5 mr-2" />View Alerts
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => router.push('/risk-monitoring/hazard-risks')}>Back to Hazard Risks</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Glacier Risk Areas */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <Mountain className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-bold text-white">Glacier Risk Areas</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {glacierRiskAreas.map((area, idx) => (
              <Card key={area.name} className="glass-intense border-white/10 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">{area.name}</h3>
                    <span className="text-xs text-slate-500">{area.district}</span>
                  </div>
                  <Badge variant={area.risk === 'High' ? 'warning' : area.risk === 'Moderate' ? 'info' : 'success'} size="sm">{area.risk}</Badge>
                </div>
                <div className="space-y-2 text-xs text-slate-400">
                  <div className="flex items-center justify-between">
                    <span>Status:</span>
                    <span className="text-white">{area.status}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Concern:</span> <span className="text-slate-300">{area.concern}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Glacier Alerts */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-bold text-white">Glacier Monitoring Alerts</h2>
          </div>
          <div className="space-y-4">
            {glacierAlerts.map((alert, idx) => (
              <Card key={alert.id} className="glass-intense border-white/10 border-l-4 border-l-cyan-500 p-5">
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

      {/* Cryosphere Sensitivity Indicators */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-bold text-white">Cryosphere Sensitivity Indicators</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { indicator: 'Glacial Melt Rate', value: '+12%', trend: 'increasing' },
              { indicator: 'Snow Cover Extent', value: '-8%', trend: 'decreasing' },
              { indicator: 'Glacial Lake Formation', value: '3 new', trend: 'increasing' },
            ].map((item, idx) => (
              <Card key={item.indicator} className="glass-intense border-white/10 p-5 text-center">
                <div className="text-xs text-slate-400 mb-2">{item.indicator}</div>
                <div className="text-3xl font-bold text-white mb-2">{item.value}</div>
                <div className="flex items-center justify-center gap-1">
                  <TrendingUp className={`w-4 h-4 ${item.trend === 'increasing' ? 'text-red-400' : 'text-green-400'}`} />
                  <span className={`text-xs ${item.trend === 'increasing' ? 'text-red-400' : 'text-green-400'}`}>{item.trend}</span>
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
