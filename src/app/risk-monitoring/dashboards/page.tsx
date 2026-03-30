'use client';
import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { TrendingUp, ArrowRight, Activity, BarChart3, PieChart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const dashboards = [
  { id: 'db-1', name: 'Multi-Hazard Overview', type: 'Comprehensive', metrics: 24, status: 'live' as const },
  { id: 'db-2', name: 'Flood Risk Dashboard', type: 'Hazard-Specific', metrics: 12, status: 'live' as const },
  { id: 'db-3', name: 'Landslide Monitoring', type: 'Hazard-Specific', metrics: 8, status: 'live' as const },
  { id: 'db-4', name: 'Air Quality Index', type: 'Environmental', metrics: 6, status: 'live' as const },
  { id: 'db-5', name: 'District Risk Scores', type: 'Analytical', metrics: 15, status: 'live' as const },
  { id: 'db-6', name: 'Incident Response Tracker', type: 'Operational', metrics: 10, status: 'live' as const },
];

export default function RiskDashboardsPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/50 via-purple-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-2xl"><TrendingUp className="w-8 h-8 text-white" /></div>
              <Badge variant="info" size="lg">Analytics & Monitoring</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Risk <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">Dashboards</span></h1>
            <p className="text-xl text-slate-400 mb-8">Comprehensive risk monitoring dashboards with real-time data and trends</p>
            <Button size="lg" className="bg-gradient-to-r from-violet-500 to-purple-600" onClick={() => router.push('/risk-monitoring')}><ArrowRight className="w-5 h-5 mr-2" />Back to Risk Monitoring</Button>
          </motion.div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboards.map((d, i) => (
              <motion.div key={d.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-violet-500/30 transition-all p-5 cursor-pointer group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-violet-400" />
                    </div>
                    <Badge variant={d.status === 'live' ? 'success' : 'info'} size="sm">{d.status}</Badge>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-violet-400 transition-colors">{d.name}</h3>
                  <div className="text-sm text-slate-400 mb-3">{d.type}</div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">{d.metrics} metrics</span>
                    <ArrowRight className="w-4 h-4 text-violet-400 group-hover:translate-x-1 transition-transform" />
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
