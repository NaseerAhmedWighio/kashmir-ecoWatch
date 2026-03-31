'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Bell, AlertTriangle, Clock, Calendar, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const alerts = [
  { id: 'a1', type: 'Flood Advisory', location: 'Jhelum Basin', severity: 'moderate' as const, issued: '2024-03-28 10:00', expires: '2024-03-29 18:00', status: 'active' as const },
  { id: 'a2', type: 'Landslide Warning', location: 'Z-Morh Corridor', severity: 'high' as const, issued: '2024-03-28 08:30', expires: '2024-03-28 20:00', status: 'active' as const },
  { id: 'a3', type: 'Heatwave Alert', location: 'Srinagar Valley', severity: 'moderate' as const, issued: '2024-03-27 14:00', expires: '2024-03-28 18:00', status: 'monitoring' as const },
  { id: 'a4', type: 'Avalanche Warning', location: 'Zoji La Pass', severity: 'high' as const, issued: '2024-03-26 06:00', expires: '2024-03-28 06:00', status: 'expired' as const },
];

export default function AlertsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      <section className="relative pt-20 md:pt-28 pb-16 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/50 via-rose-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-2xl">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <Badge variant="danger" size="lg">Emergency Notifications</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Alerts & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-400">Advisories</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Real-time hazard alerts, weather advisories, and emergency notifications
              for public safety and disaster preparedness
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="space-y-4">
            {alerts.map((alert, i) => (
              <motion.div key={alert.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        alert.severity === 'high' ? 'bg-red-500/20' : 'bg-amber-500/20'
                      }`}>
                        <AlertTriangle className={`w-6 h-6 ${
                          alert.severity === 'high' ? 'text-red-400' : 'text-amber-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-white">{alert.type}</h3>
                          <Badge variant={alert.severity === 'high' ? 'danger' : 'warning'} size="sm">{alert.severity}</Badge>
                          <Badge variant={alert.status === 'active' ? 'danger' : alert.status === 'monitoring' ? 'warning' : 'info'} size="sm">{alert.status}</Badge>
                        </div>
                        <div className="text-sm text-slate-400 mb-2">{alert.location}</div>
                        <div className="flex items-center gap-6 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />Issued: {alert.issued}</span>
                          <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />Expires: {alert.expires}</span>
                        </div>
                      </div>
                    </div>
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
