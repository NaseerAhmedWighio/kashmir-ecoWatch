'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Shield, ArrowRight, AlertTriangle, MapPin, Clock, Activity, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { criticalInfrastructure } from '@/data/risk-monitoring';

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'operational': return <Badge variant="success" size="sm">Operational</Badge>;
    case 'stressed': return <Badge variant="warning" size="sm">Stressed</Badge>;
    case 'critical': return <Badge variant="danger" size="sm">Critical</Badge>;
    case 'closed': return <Badge variant="danger" size="sm">Closed</Badge>;
    default: return null;
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'hospital': return '🏥';
    case 'shelter': return '🏠';
    case 'bridge': return '🌉';
    case 'treatment_plant': return '🏭';
    case 'power_station': return '⚡';
    case 'communication': return '📡';
    default: return '🏗️';
  }
};

export default function CriticalInfrastructureResponsePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      <section className="relative pt-20 md:pt-48 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950/50 via-purple-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <a href="/risk-monitoring" className="hover:text-white transition-colors">Risk & Monitoring</a>
              <span>/</span>
              <span className="text-white font-medium">Critical Infrastructure & Response</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-2xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <Badge variant="outline" size="lg" className="border-violet-500/30 text-violet-400">Emergency Facilities & Response Nodes</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Critical <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-400">Infrastructure</span> & Response
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              Emergency-linked facility monitoring, high-priority response nodes, critical environmental 
              infrastructure under stress, operational routing intelligence, and support asset awareness.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-violet-500 to-purple-600 text-white shadow-xl" onClick={() => router.push('/risk-monitoring/dashboards')}>
                <Activity className="w-5 h-5 mr-2" />View Dashboards
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => router.push('/risk-monitoring')}>Back to Overview</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Infrastructure Status Overview */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-6 h-6 text-violet-400" />
            <h2 className="text-2xl font-bold text-white">Critical Infrastructure Status</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {criticalInfrastructure.map((infra, idx) => (
              <Card key={infra.id} className="glass-intense border-white/10 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-2xl mb-2">{getTypeIcon(infra.type)}</div>
                    <h3 className="text-sm font-bold text-white mb-1">{infra.name}</h3>
                    <span className="text-xs text-slate-500">{infra.district}</span>
                  </div>
                  {getStatusBadge(infra.status)}
                </div>
                
                <div className="space-y-2 text-xs text-slate-400">
                  <div className="flex items-center justify-between">
                    <span>Type:</span>
                    <span className="text-white capitalize">{infra.type.replace('_', ' ')}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Last Inspection:</span>
                    <span className="text-white">{new Date(infra.lastInspection).toLocaleDateString()}</span>
                  </div>
                  {infra.concerns && infra.concerns.length > 0 && (
                    <div>
                      <span className="text-slate-500">Concerns:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {infra.concerns.map((concern, cIdx) => (
                          <Badge key={cIdx} variant="danger" size="sm" className="text-xs">{concern}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Response Node Summary */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-6 h-6 text-violet-400" />
            <h2 className="text-2xl font-bold text-white">Response Node Summary</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Facilities', value: criticalInfrastructure.length, color: 'text-white' },
              { label: 'Operational', value: criticalInfrastructure.filter(i => i.status === 'operational').length, color: 'text-green-400' },
              { label: 'Stressed', value: criticalInfrastructure.filter(i => i.status === 'stressed').length, color: 'text-amber-400' },
              { label: 'Critical/Closed', value: criticalInfrastructure.filter(i => i.status === 'critical' || i.status === 'closed').length, color: 'text-red-400' },
            ].map((stat, idx) => (
              <div key={stat.label} className="text-center">
                <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
