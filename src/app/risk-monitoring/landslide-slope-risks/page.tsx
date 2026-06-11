'use client';
import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Mountain, ArrowRight, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import { useRouter } from 'next/navigation';

const landslideZones = [
  { id: 'ls-1', name: 'Z-Morh Corridor', district: 'Ganderbal', riskLevel: 'critical' as const, slope: '45°', lastEvent: '2024-03-15' },
  { id: 'ls-2', name: 'Banihal Pass', district: 'Ramban', riskLevel: 'high' as const, slope: '38°', lastEvent: '2024-02-28' },
  { id: 'ls-3', name: 'Kishtwar-Padar Road', district: 'Kishtwar', riskLevel: 'high' as const, slope: '42°', lastEvent: '2024-03-10' },
];

export default function LandslideSlopeRisksPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title={<>Landslide & <span className="text-emerald-400">Slope Risks</span></>}
        subtitle="Slope stability, landslide susceptibility, and road corridor monitoring"
        icon={
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl"><Mountain className="w-5 h-5 md:w-8 md:h-8 text-white" /></div>
        }
        badge={<Badge variant="warning" size="lg">Slope Hazards</Badge>}
        breadcrumbs={[
          { label: 'Risk & Monitoring', href: '/risk-monitoring' },
          { label: 'Hazard Risks', href: '/risk-monitoring/hazard-risks' },
          { label: 'Landslide & Slope Risks' },
        ]}
        actions={
          <>
            <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600" onClick={() => router.push('/risk-monitoring/hazard-risks')}><ArrowRight className="w-5 h-5 mr-2" />Back to Hazard Risks</Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => router.push('/risk-monitoring')}>Overview</Button>
          </>
        }
      />
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {landslideZones.map((z, i) => (
              <motion.div key={z.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div><h3 className="text-lg font-bold text-white">{z.name}</h3><div className="text-xs text-slate-500">{z.district}</div></div>
                    <Badge variant={z.riskLevel === 'critical' ? 'danger' : 'warning'} size="sm">{z.riskLevel}</Badge>
                  </div>
                  <div className="text-sm text-slate-400 mb-2">Slope: {z.slope}</div>
                  <div className="text-sm text-slate-400">Last Event: {new Date(z.lastEvent).toLocaleDateString()}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
    </main>
  );
}
