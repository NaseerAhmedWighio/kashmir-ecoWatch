'use client';
import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Droplets, ArrowRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import { useRouter } from 'next/navigation';

const hydroRisks = [
  { id: 'hr-1', type: 'Drought Watch', region: 'Leh-Kargil', severity: 'high' as const, status: 'active', description: 'Below-average winter precipitation' },
  { id: 'hr-2', type: 'Water Stress', region: 'Srinagar Urban', severity: 'moderate' as const, status: 'monitoring', description: 'Groundwater depletion concerns' },
  { id: 'hr-3', type: 'Flow Anomaly', region: 'Jhelum Basin', severity: 'low' as const, status: 'resolved', description: 'Upstream flow variations' },
];

export default function HydrologicalRisksPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title={<>Hydrological <span className="text-emerald-400">Risks</span></>}
        subtitle="Water-related hazards, drought monitoring, and water security"
        icon={
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-2xl"><Droplets className="w-5 h-5 md:w-8 md:h-8 text-white" /></div>
        }
        badge={<Badge variant="info" size="lg">Water Security</Badge>}
        breadcrumbs={[
          { label: 'Risk & Monitoring', href: '/risk-monitoring' },
          { label: 'Hazard Risks', href: '/risk-monitoring/hazard-risks' },
          { label: 'Hydrological Risks' },
        ]}
        actions={
          <>
            <Button size="lg" className="bg-gradient-to-r from-teal-500 to-cyan-600" onClick={() => router.push('/risk-monitoring/hazard-risks')}><ArrowRight className="w-5 h-5 mr-2" />Back to Hazard Risks</Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => router.push('/risk-monitoring')}>Overview</Button>
          </>
        }
      />
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hydroRisks.map((r, i) => (
              <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div><h3 className="text-lg font-bold text-white">{r.type}</h3><div className="text-xs text-slate-500">{r.region}</div></div>
                    <Badge variant={r.severity === 'high' ? 'danger' : r.severity === 'moderate' ? 'warning' : 'info'} size="sm">{r.severity}</Badge>
                  </div>
                  <p className="text-sm text-slate-400 mb-2">{r.description}</p>
                  <Badge variant={r.status === 'active' ? 'danger' : r.status === 'monitoring' ? 'warning' : 'info'} size="sm">{r.status}</Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
    </main>
  );
}
