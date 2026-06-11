'use client';
import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import { AlertTriangle, ArrowRight, Map, Shield, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const risks = [
  { id: 'dr-1', type: 'Multi-Hazard', location: 'Kashmir Valley', riskLevel: 'moderate' as const, areas: 12, description: 'Composite risk assessment across all hazards' },
  { id: 'dr-2', type: 'Compound Events', location: 'Jhelum Basin', riskLevel: 'high' as const, areas: 8, description: 'Flood + landslide compound risk zones' },
];

export default function DisasterRisksPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        breadcrumbs={[{ label: 'Risk & Monitoring', href: '/risk-monitoring' }, { label: 'Hazard Risks', href: '/risk-monitoring/hazard-risks' }, { label: 'Disaster Risks' }]}
        title={<>Disaster <span className="text-emerald-400">Risks</span></>}
        subtitle="Multi-hazard risk assessment and monitoring across Kashmir"
        icon={
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-2xl"><AlertTriangle className="w-5 h-5 md:w-8 md:h-8 text-white" /></div>
        }
        badge={<Badge variant="danger" size="lg">All Hazards</Badge>}
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Button size="lg" className="bg-gradient-to-r from-red-500 to-orange-600" onClick={() => router.push('/risk-monitoring/hazard-risks')}><ArrowRight className="w-5 h-5 mr-2" />Back to Hazard Risks</Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => router.push('/risk-monitoring')}>Overview</Button>
          </div>
        }
      />
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {risks.map((r, i) => (
              <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{r.type}</h3>
                      <div className="text-xs text-slate-500">{r.location}</div>
                    </div>
                    <Badge variant={r.riskLevel === 'high' ? 'danger' : 'warning'} size="sm">{r.riskLevel}</Badge>
                  </div>
                  <p className="text-sm text-slate-400 mb-3">{r.description}</p>
                  <div className="text-xs text-slate-500">{r.areas} high-risk zones identified</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
    </main>
  );
}
