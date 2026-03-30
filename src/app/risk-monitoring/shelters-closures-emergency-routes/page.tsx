'use client';
import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Map, ArrowRight, Home, Route } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const emergencyInfo = [
  { id: 'sc-1', type: 'Emergency Shelters', count: 156, coverage: 'All Districts', status: 'ready' as const },
  { id: 'sc-2', type: 'Road Closures (Active)', count: 3, locations: ['Zoji La', 'Sinthan Top', 'Margan Top'], status: 'active' as const },
  { id: 'sc-3', type: 'Evacuation Routes', count: 47, coverage: 'High-Risk Zones', status: 'mapped' as const },
];

export default function SheltersClosuresEmergencyRoutesPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-950/50 via-emerald-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl"><Map className="w-8 h-8 text-white" /></div>
              <Badge variant="success" size="lg">Emergency Planning</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Shelters, <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Closures & Emergency Routes</span></h1>
            <p className="text-xl text-slate-400 mb-8">Emergency shelter locations, road closures, and evacuation route planning</p>
            <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-600" onClick={() => router.push('/risk-monitoring')}><ArrowRight className="w-5 h-5 mr-2" />Back to Risk Monitoring</Button>
          </motion.div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyInfo.map((e, i) => (
              <motion.div key={e.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                      {e.type.includes('Shelter') ? <Home className="w-5 h-5 text-slate-400" /> : <Route className="w-5 h-5 text-slate-400" />}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{e.type}</h3>
                      <div className="text-xs text-slate-500">{e.coverage || 'Multiple Locations'}</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-3">{e.count}</div>
                  {e.locations && <div className="text-xs text-slate-400 mb-3">{e.locations.join(', ')}</div>}
                  <Badge variant={e.status === 'ready' ? 'success' : e.status === 'active' ? 'danger' : 'info'} size="sm">{e.status}</Badge>
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
