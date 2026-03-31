'use client';
import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Map, ArrowRight, FileText, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const incidents = [
  { id: 'ir-1', type: 'Landslide', location: 'Z-Morh, Ganderbal', date: '2024-03-27', severity: 'moderate' as const, casualties: 0, status: 'cleared' as const },
  { id: 'ir-2', type: 'Flash Flood', location: 'Lidder Valley, Anantnag', date: '2024-03-20', severity: 'minor' as const, casualties: 0, status: 'resolved' as const },
  { id: 'ir-3', type: 'Forest Fire', location: 'Gulmarg Range, Baramulla', date: '2024-03-15', severity: 'moderate' as const, casualties: 0, status: 'contained' as const },
];

export default function IncidentReportsPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      <section className="relative pt-48 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/50 via-orange-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <a href="/risk-monitoring" className="hover:text-white transition-colors">Risk & Monitoring</a>
              <span>/</span>
              <a href="/risk-monitoring/response-operations" className="hover:text-white transition-colors">Response & Operations</a>
              <span>/</span>
              <span className="text-white font-medium">Incident Reports</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl"><Map className="w-8 h-8 text-white" /></div>
              <Badge variant="warning" size="lg">Incident Database</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Incident <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Reports</span></h1>
            <p className="text-xl text-slate-400 mb-8">Documented hazard incidents, damage assessments, and response records</p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600" onClick={() => router.push('/risk-monitoring/response-operations')}><ArrowRight className="w-5 h-5 mr-2" />Back to Response & Operations</Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => router.push('/risk-monitoring')}>Overview</Button>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="space-y-4">
            {incidents.map((i, idx) => (
              <motion.div key={i.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}>
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${i.severity === 'moderate' ? 'bg-amber-500/20' : 'bg-slate-500/20'}`}>
                        <FileText className={`w-6 h-6 ${i.severity === 'moderate' ? 'text-amber-400' : 'text-slate-400'}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">{i.type}</h3>
                        <div className="text-sm text-slate-400 mb-2">{i.location}</div>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{i.date}</span>
                          <span>Casualties: {i.casualties}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={i.status === 'cleared' ? 'success' : i.status === 'resolved' ? 'info' : 'warning'} size="sm">{i.status}</Badge>
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
