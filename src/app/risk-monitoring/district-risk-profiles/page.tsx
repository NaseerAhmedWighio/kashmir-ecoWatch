'use client';
import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Shield, ArrowRight, TrendingUp, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const districtProfiles = [
  { id: 'dp-1', district: 'Srinagar', riskScore: 72, primaryRisks: ['Flood', 'Earthquake'], preparedness: 'good' as const },
  { id: 'dp-2', district: 'Baramulla', riskScore: 68, primaryRisks: ['Flood', 'Forest Fire'], preparedness: 'good' as const },
  { id: 'dp-3', district: 'Anantnag', riskScore: 75, primaryRisks: ['Landslide', 'Flash Flood'], preparedness: 'moderate' as const },
  { id: 'dp-4', district: 'Ganderbal', riskScore: 82, primaryRisks: ['Landslide', 'Avalanche'], preparedness: 'moderate' as const },
  { id: 'dp-5', district: 'Leh', riskScore: 58, primaryRisks: ['GLOF', 'Drought'], preparedness: 'good' as const },
  { id: 'dp-6', district: 'Kargil', riskScore: 62, primaryRisks: ['Avalanche', 'Drought'], preparedness: 'moderate' as const },
];

export default function DistrictRiskProfilesPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      <section className="relative pt-48 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-purple-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <a href="/risk-monitoring" className="hover:text-white transition-colors">Risk & Monitoring</a>
              <span>/</span>
              <a href="/risk-monitoring/response-operations" className="hover:text-white transition-colors">Response & Operations</a>
              <span>/</span>
              <span className="text-white font-medium">District Risk Profiles</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl"><Shield className="w-8 h-8 text-white" /></div>
              <Badge variant="info" size="lg">District Assessments</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">District <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Risk Profiles</span></h1>
            <p className="text-xl text-slate-400 mb-8">District-level risk assessments, vulnerability profiles, and preparedness status</p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-600" onClick={() => router.push('/risk-monitoring/response-operations')}><ArrowRight className="w-5 h-5 mr-2" />Back to Response & Operations</Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => router.push('/risk-monitoring')}>Overview</Button>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {districtProfiles.map((d, i) => (
              <motion.div key={d.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-slate-400" />
                      <h3 className="text-lg font-bold text-white">{d.district}</h3>
                    </div>
                    <Badge variant={d.riskScore > 70 ? 'danger' : d.riskScore > 60 ? 'warning' : 'info'} size="sm">Risk: {d.riskScore}</Badge>
                  </div>
                  <div className="text-sm text-slate-400 mb-3">Primary Risks: {d.primaryRisks.join(', ')}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Preparedness</span>
                    <Badge variant={d.preparedness === 'good' ? 'success' : 'warning'} size="sm">{d.preparedness}</Badge>
                  </div>
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
