'use client';
import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Activity, ArrowRight, Server, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const infrastructure = [
  { id: 'ci-1', type: 'Hospitals', total: 47, monitored: 42, status: 'operational' as const },
  { id: 'ci-2', type: 'Schools', total: 312, monitored: 285, status: 'operational' as const },
  { id: 'ci-3', type: 'Bridges', total: 89, monitored: 89, status: 'monitoring' as const },
  { id: 'ci-4', type: 'Power Stations', total: 23, monitored: 23, status: 'operational' as const },
];

export default function CriticalInfrastructureResponsePage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-indigo-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl"><Activity className="w-8 h-8 text-white" /></div>
              <Badge variant="info" size="lg">Critical Facilities</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Critical <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Infrastructure & Response</span></h1>
            <p className="text-xl text-slate-400 mb-8">Critical facility monitoring, emergency response coordination, and resource tracking</p>
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-600" onClick={() => router.push('/risk-monitoring')}><ArrowRight className="w-5 h-5 mr-2" />Back to Risk Monitoring</Button>
          </motion.div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {infrastructure.map((i, idx) => (
              <motion.div key={i.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                <Card className="glass-intense border-white/10 p-5 text-center">
                  <Server className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-white mb-2">{i.type}</h3>
                  <div className="text-2xl font-bold text-white mb-1">{i.monitored}/{i.total}</div>
                  <div className="text-xs text-slate-500 mb-3">monitored</div>
                  <Badge variant={i.status === 'operational' ? 'success' : 'info'} size="sm">{i.status}</Badge>
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
