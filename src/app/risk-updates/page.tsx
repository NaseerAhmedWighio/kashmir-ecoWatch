'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AlertTriangle, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const riskUpdates = [
  { id: 'ru-1', title: 'Flood Risk Elevated in Jhelum Basin', category: 'Flood', severity: 'moderate' as const, date: '2024-03-28', summary: 'Increased flow levels due to upstream precipitation and snowmelt' },
  { id: 'ru-2', title: 'Landslide Risk Remains High on NH44', category: 'Landslide', severity: 'high' as const, date: '2024-03-27', summary: 'Slope instability continues following recent rainfall' },
  { id: 'ru-3', title: 'Forest Fire Risk Increasing', category: 'Wildfire', severity: 'moderate' as const, date: '2024-03-26', summary: 'Dry conditions and rising temperatures elevate fire risk' },
  { id: 'ru-4', title: 'GLOF Risk Assessment Updated', category: 'Glacier', severity: 'low' as const, date: '2024-03-25', summary: 'Kolahoi glacial lake monitoring shows stable conditions' },
];

export default function RiskUpdatesPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      <section className="relative pt-20 md:pt-28 pb-16 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/50 via-orange-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-2xl">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <Badge variant="danger" size="lg">Risk Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Risk <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Updates</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Latest risk assessments, hazard updates, and situational awareness
              briefings for disaster preparedness and response
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="space-y-4">
            {riskUpdates.map((u, i) => (
              <motion.div key={u.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        u.severity === 'high' ? 'bg-red-500/20' : u.severity === 'moderate' ? 'bg-amber-500/20' : 'bg-slate-500/20'
                      }`}>
                        <TrendingUp className={`w-6 h-6 ${
                          u.severity === 'high' ? 'text-red-400' : u.severity === 'moderate' ? 'text-amber-400' : 'text-slate-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-white">{u.title}</h3>
                          <Badge variant="outline" size="sm">{u.category}</Badge>
                        </div>
                        <p className="text-sm text-slate-400 mb-2">{u.summary}</p>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Clock className="w-3 h-3" />
                          {new Date(u.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </div>
                      </div>
                    </div>
                    <Badge variant={u.severity === 'high' ? 'danger' : u.severity === 'moderate' ? 'warning' : 'info'} size="sm">{u.severity}</Badge>
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
