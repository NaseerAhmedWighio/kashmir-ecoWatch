'use client';
import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Zap, ArrowRight, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const seismicZones = [
  { id: 'eq-1', name: 'Srinagar Urban Area', district: 'Srinagar', zone: 'Zone IV', riskLevel: 'high' as const, population: '1.2M' },
  { id: 'eq-2', name: 'Baramulla Region', district: 'Baramulla', zone: 'Zone IV', riskLevel: 'high' as const, population: '850K' },
  { id: 'eq-3', name: 'Anantag Valley', district: 'Anantnag', zone: 'Zone IV', riskLevel: 'moderate' as const, population: '620K' },
];

export default function EarthquakeRisksPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      <section className="relative pt-48 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/50 via-indigo-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <a href="/risk-monitoring" className="hover:text-white transition-colors">Risk & Monitoring</a>
              <span>/</span>
              <a href="/risk-monitoring/hazard-risks" className="hover:text-white transition-colors">Hazard Risks</a>
              <span>/</span>
              <span className="text-white font-medium">Earthquake Risks</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-2xl"><Zap className="w-8 h-8 text-white" /></div>
              <Badge variant="info" size="lg">Seismic Hazards</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Earthquake <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Risks</span></h1>
            <p className="text-xl text-slate-400 mb-8">Seismic hazard assessment, fault line mapping, and building vulnerability</p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-purple-500 to-indigo-600" onClick={() => router.push('/risk-monitoring/hazard-risks')}><ArrowRight className="w-5 h-5 mr-2" />Back to Hazard Risks</Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => router.push('/risk-monitoring')}>Overview</Button>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {seismicZones.map((z, i) => (
              <motion.div key={z.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div><h3 className="text-lg font-bold text-white">{z.name}</h3><div className="text-xs text-slate-500">{z.district}</div></div>
                    <Badge variant="outline" size="sm">{z.zone}</Badge>
                  </div>
                  <div className="text-sm text-slate-400 mb-2">Population: {z.population}</div>
                  <Badge variant={z.riskLevel === 'high' ? 'danger' : 'warning'} size="sm">{z.riskLevel} Risk</Badge>
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
