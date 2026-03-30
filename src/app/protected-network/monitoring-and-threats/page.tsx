'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AlertTriangle, Activity, Bell, ArrowRight, TrendingUp, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { getThreats } from '@/data/protected-network';

export default function MonitoringPage() {
  const router = useRouter();
  const threats = getThreats.all();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'alert-critical';
      case 'high': return 'alert-critical';
      case 'medium': return 'alert-warning';
      default: return 'alert-info';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical': return 'danger';
      case 'high': return 'danger';
      case 'medium': return 'warning';
      default: return 'info';
    }
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      <div className="pt-24 pb-12 container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <button onClick={() => router.push('/protected-network')} className="hover:text-white transition-colors">
              Protected Network
            </button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Monitoring & Threats</span>
          </nav>

          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-6 h-6 text-amber-400" />
            <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">Conservation Intelligence</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">Monitoring & Threats</h1>
          <p className="text-xl text-slate-400 mb-8">Pressure signals, habitat condition, and conservation alerts across protected areas</p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-gradient-to-r from-amber-600 to-amber-500" icon={<Bell className="w-5 h-5" />}>Subscribe to Alerts</Button>
            <Button variant="outline" className="border-white/20 text-white" icon={<TrendingUp className="w-5 h-5" />}>View Trends</Button>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Active Alerts', value: threats.length, icon: Bell, color: 'text-amber-400' },
            { label: 'Critical Threats', value: threats.filter(t => t.severity === 'critical').length, icon: AlertTriangle, color: 'text-red-400' },
            { label: 'Monitoring Stations', value: '234', icon: Activity, color: 'text-emerald-400' },
            { label: 'Resolved (30d)', value: '34', icon: TrendingUp, color: 'text-emerald-400' },
          ].map((metric, idx) => (
            <Card key={idx} className="glass-light border-white/5 p-6" padding="none">
              <div className="flex items-center justify-between mb-4">
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-sm text-slate-500 uppercase">{metric.label}</div>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          {threats.map((threat, index) => (
            <motion.a
              key={threat.id}
              href={`/protected-network/monitoring-and-threats/${threat.slug}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="block group"
            >
              <Card className={`card-intelligence p-6 ${getSeverityColor(threat.severity)} group-hover:scale-[1.01] transition-transform`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-3 h-3 rounded-full mt-2 ${
                      threat.severity === 'critical' ? 'bg-red-500 signal-pulse' :
                      threat.severity === 'high' ? 'bg-red-500 signal-pulse' :
                      threat.severity === 'medium' ? 'bg-amber-500 signal-pulse' :
                      'bg-blue-500 signal-pulse'
                    }`} />
                    <div>
                      <h3 className="font-semibold text-white mb-1 group-hover:text-white/90 transition-colors">{threat.name}</h3>
                      <p className="text-sm text-slate-300 mb-2">{threat.description}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span>{threat.affectedAreas.length} affected areas</span>
                        <span>•</span>
                        <Badge variant={getSeverityBadge(threat.severity)} size="sm">
                          {threat.severity.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-slate-400 group-hover:text-white transition-colors" icon={<ArrowRight className="w-4 h-4" />} />
                </div>
              </Card>
            </motion.a>
          ))}
        </div>
      </div>

      <AdvancedFooter />
    </main>
  );
}
