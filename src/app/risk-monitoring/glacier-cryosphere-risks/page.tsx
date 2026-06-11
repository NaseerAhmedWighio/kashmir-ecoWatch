'use client';
import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Waves, ArrowRight, Thermometer } from 'lucide-react';
import { motion } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import { useRouter } from 'next/navigation';

const glacierRisks = [
  { id: 'gr-1', name: 'Kolahoi Glacial Lake', district: 'Anantnag', riskLevel: 'moderate' as const, elevation: '4200m', type: 'GLOF Potential' },
  { id: 'gr-2', name: 'Harmukh Glacier', district: 'Ganderbal', riskLevel: 'low' as const, elevation: '4600m', type: 'Retreat Monitoring' },
  { id: 'gr-3', name: 'Sheshnag Glacial System', district: 'Anantnag', riskLevel: 'moderate' as const, elevation: '3800m', type: 'Lake Expansion' },
];

export default function GlacierCryosphereRisksPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title={<>Glacier & <span className="text-emerald-400">Cryosphere Risks</span></>}
        subtitle="Glacial lake monitoring, GLOF risk, and cryosphere changes"
        icon={
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl"><Waves className="w-5 h-5 md:w-8 md:h-8 text-white" /></div>
        }
        badge={<Badge variant="info" size="lg">Cryosphere Hazards</Badge>}
        breadcrumbs={[
          { label: 'Risk & Monitoring', href: '/risk-monitoring' },
          { label: 'Hazard Risks', href: '/risk-monitoring/hazard-risks' },
          { label: 'Glacier & Cryosphere Risks' },
        ]}
        actions={
          <>
            <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600" onClick={() => router.push('/risk-monitoring/hazard-risks')}><ArrowRight className="w-5 h-5 mr-2" />Back to Hazard Risks</Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => router.push('/risk-monitoring')}>Overview</Button>
          </>
        }
      />
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
      
    </main>
  );
}
