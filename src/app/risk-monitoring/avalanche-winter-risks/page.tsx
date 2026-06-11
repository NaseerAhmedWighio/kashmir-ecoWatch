'use client';
import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import { AlertTriangle, ArrowRight, Snowflake } from 'lucide-react';
import { motion } from 'framer-motion';

const avalancheZones = [
  { id: 'av-1', name: 'Gulmarg Ski Area', district: 'Baramulla', riskLevel: 'moderate' as const, elevation: '2650m', status: 'monitoring' as const },
  { id: 'av-2', name: 'Zoji La Pass', district: 'Kargil', riskLevel: 'high' as const, elevation: '3528m', status: 'active' as const },
  { id: 'av-3', name: 'Banihal Pass', district: 'Ramban', riskLevel: 'moderate' as const, elevation: '2832m', status: 'monitoring' as const },
];

export default function AvalancheWinterRisksPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        breadcrumbs={[{ label: 'Risk & Monitoring', href: '/risk-monitoring' }, { label: 'Hazard Risks', href: '/risk-monitoring/hazard-risks' }, { label: 'Avalanche & Winter Risks' }]}
        title={<>Avalanche & <span className="text-emerald-400">Winter Risks</span></>}
        subtitle="Snow avalanche forecasting, winter hazard monitoring, and road closure tracking"
        icon={
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center shadow-2xl"><Snowflake className="w-5 h-5 md:w-8 md:h-8 text-white" /></div>
        }
        badge={<Badge variant="info" size="lg">Winter Hazards</Badge>}
      />
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
      
    </main>
  );
}
