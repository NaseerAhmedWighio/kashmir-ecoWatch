'use client';
import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AlertTriangle, ArrowRight, Snowflake } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const avalancheZones = [
  { id: 'av-1', name: 'Gulmarg Ski Area', district: 'Baramulla', riskLevel: 'moderate' as const, elevation: '2650m', status: 'monitoring' as const },
  { id: 'av-2', name: 'Zoji La Pass', district: 'Kargil', riskLevel: 'high' as const, elevation: '3528m', status: 'active' as const },
  { id: 'av-3', name: 'Banihal Pass', district: 'Ramban', riskLevel: 'moderate' as const, elevation: '2832m', status: 'monitoring' as const },
];

export default function AvalancheWinterRisksPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-slate-950"><section className="relative pt-48 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/50 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <a href="/risk-monitoring" className="hover:text-white transition-colors">Risk & Monitoring</a>
              <span>/</span>
              <a href="/risk-monitoring/hazard-risks" className="hover:text-white transition-colors">Hazard Risks</a>
              <span>/</span>
              <span className="text-white font-medium">Avalanche & Winter Risks</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center shadow-2xl"><Snowflake className="w-8 h-8 text-white" /></div>
              <Badge variant="info" size="lg">Winter Hazards</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Avalanche & <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-500">Winter Risks</span></h1>
            <p className="text-xl text-slate-400 mb-8">Snow avalanche forecasting, winter hazard monitoring, and road closure tracking</p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-slate-500 to-slate-600" onClick={() => router.push('/risk-monitoring/hazard-risks')}><ArrowRight className="w-5 h-5 mr-2" />Back to Hazard Risks</Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => router.push('/risk-monitoring')}>Overview</Button>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {avalancheZones.map((z, i) => (
              <motion.div key={z.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div><h3 className="text-lg font-bold text-white">{z.name}</h3><div className="text-xs text-slate-500">{z.district} • {z.elevation}</div></div>
                    <Badge variant={z.riskLevel === 'high' ? 'danger' : 'warning'} size="sm">{z.riskLevel}</Badge>
                  </div>
                  <div className="text-sm text-slate-400">Status: <span className="text-white">{z.status}</span></div>
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
