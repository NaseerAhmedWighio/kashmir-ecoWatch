'use client';
import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Activity, ArrowRight, Thermometer, Droplets, Wind } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const monitoringData = [
  { id: 'em-1', type: 'Air Quality', location: 'Srinagar', value: 'AQI 142', status: 'moderate' as const, parameter: 'PM2.5' },
  { id: 'em-2', type: 'Water Quality', location: 'Dal Lake', value: 'WQI 68', status: 'fair' as const, parameter: 'Trophic State' },
  { id: 'em-3', type: 'Ecosystem Health', location: 'Dachigam NP', value: 'Index 0.78', status: 'good' as const, parameter: 'Biodiversity' },
];

export default function EnvironmentalMonitoringPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      <section className="relative pt-48 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-green-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <a href="/risk-monitoring" className="hover:text-white transition-colors">Risk & Monitoring</a>
              <span>/</span>
              <a href="/risk-monitoring/pollution-stress" className="hover:text-white transition-colors">Pollution & Stress</a>
              <span>/</span>
              <span className="text-white font-medium">Environmental Monitoring</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-2xl"><Activity className="w-8 h-8 text-white" /></div>
              <Badge variant="success" size="lg">Environmental Health</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Environmental <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">Monitoring</span></h1>
            <p className="text-xl text-slate-400 mb-8">Air quality, water quality, and ecosystem health monitoring</p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-green-600" onClick={() => router.push('/risk-monitoring/pollution-stress')}><ArrowRight className="w-5 h-5 mr-2" />Back to Pollution & Stress</Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => router.push('/risk-monitoring')}>Overview</Button>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {monitoringData.map((m, i) => (
              <motion.div key={m.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div><h3 className="text-lg font-bold text-white">{m.type}</h3><div className="text-xs text-slate-500">{m.location}</div></div>
                    <Badge variant={m.status === 'good' ? 'success' : m.status === 'moderate' || m.status === 'fair' ? 'warning' : 'danger'} size="sm">{m.status}</Badge>
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">{m.value}</div>
                  <div className="text-sm text-slate-400">Parameter: {m.parameter}</div>
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
