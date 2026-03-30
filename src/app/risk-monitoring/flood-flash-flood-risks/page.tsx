'use client';
import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Droplets, ArrowRight, Map, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const floodZones = [
  { id: 'ff-1', name: 'Jhelum Floodplain', district: 'Srinagar', riskLevel: 'high' as const, area: '45 km²', population: '12,000' },
  { id: 'ff-2', name: 'Lidder Flash Flood Corridor', district: 'Anantnag', riskLevel: 'high' as const, area: '23 km²', population: '8,500' },
  { id: 'ff-3', name: 'GLOF Risk Zone - Kolahoi', district: 'Anantnag', riskLevel: 'moderate' as const, area: '12 km²', population: '2,000' },
];

export default function FloodFlashFloodRisksPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-cyan-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-2xl"><Droplets className="w-8 h-8 text-white" /></div>
              <Badge variant="info" size="lg">Water Hazards</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Flood & <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Flash Flood Risks</span></h1>
            <p className="text-xl text-slate-400 mb-8">River flooding, flash flood corridors, and GLOF risk monitoring</p>
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-cyan-600" onClick={() => router.push('/risk-monitoring')}><ArrowRight className="w-5 h-5 mr-2" />Back to Risk Monitoring</Button>
          </motion.div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {floodZones.map((z, i) => (
              <motion.div key={z.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div><h3 className="text-lg font-bold text-white">{z.name}</h3><div className="text-xs text-slate-500">{z.district}</div></div>
                    <Badge variant={z.riskLevel === 'high' ? 'danger' : 'warning'} size="sm">{z.riskLevel}</Badge>
                  </div>
                  <div className="text-sm text-slate-400 mb-2">Area: {z.area}</div>
                  <div className="text-sm text-slate-400 mb-2">Population at Risk: {z.population}</div>
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
