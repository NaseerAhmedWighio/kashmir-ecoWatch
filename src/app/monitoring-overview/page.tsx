'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Activity, ArrowRight, BarChart3, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const monitoringPrograms = [
  { id: 'mp-1', name: 'Air Quality Monitoring', stations: 12, status: 'active' as const, coverage: 'Valley-wide' },
  { id: 'mp-2', name: 'Water Quality Network', stations: 34, status: 'active' as const, coverage: 'All Basins' },
  { id: 'mp-3', name: 'Seismic Monitoring', stations: 8, status: 'active' as const, coverage: 'Statewide' },
  { id: 'mp-4', name: 'Weather Stations', stations: 47, status: 'active' as const, coverage: 'All Districts' },
  { id: 'mp-5', name: 'Wildlife Camera Traps', stations: 156, status: 'active' as const, coverage: 'Protected Areas' },
  { id: 'mp-6', name: 'Glacier Monitoring', stations: 6, status: 'active' as const, coverage: 'High Altitude' },
];

export default function MonitoringOverviewPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      <section className="relative pt-20 md:pt-28 pb-16 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-green-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-2xl">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <Badge variant="success" size="lg">Monitoring Networks</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Monitoring <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">Overview</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Comprehensive environmental monitoring networks tracking air quality,
              water quality, seismic activity, weather, wildlife, and cryosphere changes
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {monitoringPrograms.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-green-500/20 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-emerald-400" />
                    </div>
                    <Badge variant={p.status === 'active' ? 'success' : 'info'} size="sm">{p.status}</Badge>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{p.name}</h3>
                  <div className="text-sm text-slate-400 mb-3">Stations: {p.stations}</div>
                  <div className="text-xs text-slate-500">Coverage: {p.coverage}</div>
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
