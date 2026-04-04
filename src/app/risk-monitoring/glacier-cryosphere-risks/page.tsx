'use client';
import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Waves, ArrowRight, Thermometer } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const glacierRisks = [
  { id: 'gr-1', name: 'Kolahoi Glacial Lake', district: 'Anantnag', riskLevel: 'moderate' as const, elevation: '4200m', type: 'GLOF Potential' },
  { id: 'gr-2', name: 'Harmukh Glacier', district: 'Ganderbal', riskLevel: 'low' as const, elevation: '4600m', type: 'Retreat Monitoring' },
  { id: 'gr-3', name: 'Sheshnag Glacial System', district: 'Anantnag', riskLevel: 'moderate' as const, elevation: '3800m', type: 'Lake Expansion' },
];

export default function GlacierCryosphereRisksPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-slate-950"><section className="relative pt-48 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/50 via-blue-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <a href="/risk-monitoring" className="hover:text-white transition-colors">Risk & Monitoring</a>
              <span>/</span>
              <a href="/risk-monitoring/hazard-risks" className="hover:text-white transition-colors">Hazard Risks</a>
              <span>/</span>
              <span className="text-white font-medium">Glacier & Cryosphere Risks</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl"><Waves className="w-8 h-8 text-white" /></div>
              <Badge variant="info" size="lg">Cryosphere Hazards</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Glacier & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Cryosphere Risks</span></h1>
            <p className="text-xl text-slate-400 mb-8">Glacial lake monitoring, GLOF risk, and cryosphere changes</p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600" onClick={() => router.push('/risk-monitoring/hazard-risks')}><ArrowRight className="w-5 h-5 mr-2" />Back to Hazard Risks</Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => router.push('/risk-monitoring')}>Overview</Button>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {glacierRisks.map((z, i) => (
              <motion.div key={z.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div><h3 className="text-lg font-bold text-white">{z.name}</h3><div className="text-xs text-slate-500">{z.district} • {z.elevation}</div></div>
                    <Badge variant={z.riskLevel === 'moderate' ? 'warning' : 'info'} size="sm">{z.riskLevel}</Badge>
                  </div>
                  <div className="text-sm text-slate-400">Type: {z.type}</div>
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
