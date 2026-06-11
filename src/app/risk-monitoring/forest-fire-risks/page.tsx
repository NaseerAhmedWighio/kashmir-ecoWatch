'use client';
import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Flame, ArrowRight, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import { useRouter } from 'next/navigation';

const fireZones = [
  { id: 'ff-1', name: 'Gulmarg Forest Range', district: 'Baramulla', riskLevel: 'high' as const, area: '245 km²', lastIncident: '2024-02-15' },
  { id: 'ff-2', name: 'Dachigam National Park', district: 'Srinagar', riskLevel: 'moderate' as const, area: '141 km²', lastIncident: '2023-11-20' },
  { id: 'ff-3', name: 'Betaab Valley', district: 'Anantnag', riskLevel: 'high' as const, area: '189 km²', lastIncident: '2024-03-10' },
];

export default function ForestFireRisksPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title={<>Forest <span className="text-emerald-400">Fire Risks</span></>}
        subtitle="Wildfire risk assessment, hotspot detection, and burn scar monitoring"
        icon={
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-2xl"><Flame className="w-5 h-5 md:w-8 md:h-8 text-white" /></div>
        }
        badge={<Badge variant="danger" size="lg">Fire Hazards</Badge>}
        breadcrumbs={[
          { label: 'Risk & Monitoring', href: '/risk-monitoring' },
          { label: 'Hazard Risks', href: '/risk-monitoring/hazard-risks' },
          { label: 'Forest Fire Risks' },
        ]}
        actions={
          <>
            <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-600" onClick={() => router.push('/risk-monitoring/hazard-risks')}><ArrowRight className="w-5 h-5 mr-2" />Back to Hazard Risks</Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => router.push('/risk-monitoring')}>Overview</Button>
          </>
        }
      />
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fireZones.map((z, i) => (
              <motion.div key={z.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div><h3 className="text-lg font-bold text-white">{z.name}</h3><div className="text-xs text-slate-500">{z.district}</div></div>
                    <Badge variant={z.riskLevel === 'high' ? 'danger' : 'warning'} size="sm">{z.riskLevel}</Badge>
                  </div>
                  <div className="text-sm text-slate-400 mb-2">Area: {z.area}</div>
                  <div className="text-sm text-slate-400">Last Incident: {new Date(z.lastIncident).toLocaleDateString()}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
    </main>
  );
}
