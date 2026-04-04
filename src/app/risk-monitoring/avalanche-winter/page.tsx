'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AlertTriangle, ArrowRight, MapPin, Clock, Snowflake, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { liveAlerts, emergencyRoutes } from '@/data/risk-monitoring';
import { AlertSeverity } from '@/types/alerts';

const avalancheAlerts = liveAlerts.filter(a => a.hazardCategory === 'Avalanche & Winter' || a.type.includes('Avalanche'));
const winterClosures = emergencyRoutes.filter(r => r.status === 'closed' || r.type === 'closure');

const avalancheZones = [
  { zone: 'Apharwat Peak (Gulmarg)', elevation: '3000m+', risk: 'Critical', aspect: 'N, NE', recentEvents: '5 slab avalanches' },
  { zone: 'Sonamarg Highlands', elevation: '2800m+', risk: 'High', aspect: 'All aspects', recentEvents: '3 natural avalanches' },
  { zone: 'Kupwara Highlands', elevation: '2500m+', risk: 'High', aspect: 'N, W', recentEvents: '2 human-triggered' },
  { zone: 'Ganderbal Mountains', elevation: '3200m+', risk: 'Moderate', aspect: 'E, SE', recentEvents: 'Monitoring' },
];

export default function AvalancheWinterPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      <section className="relative pt-20 md:pt-48 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-blue-950/40 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <a href="/risk-monitoring" className="hover:text-white transition-colors">Risk & Monitoring</a>
              <span>/</span>
              <a href="/risk-monitoring/hazard-risks" className="hover:text-white transition-colors">Hazard Risks</a>
              <span>/</span>
              <span className="text-white font-medium">Avalanche & Winter</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-400 to-blue-600 flex items-center justify-center shadow-2xl">
                <Snowflake className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Winter Hazard Intelligence</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Avalanche & <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-blue-400">Winter</span> Risk
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              Avalanche exposure monitoring, winter access interruption, route safety intelligence, 
              and season-linked emergency tracking across Kashmir's high-altitude zones.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-slate-500 to-blue-600 text-white shadow-xl" onClick={() => router.push('/risk-monitoring/live-alerts')}>
                <AlertTriangle className="w-5 h-5 mr-2" />View Alerts
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => router.push('/risk-monitoring/hazard-risks')}>Back to Hazard Risks</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Avalanche Risk Zones */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <Eye className="w-6 h-6 text-slate-400" />
            <h2 className="text-2xl font-bold text-white">Avalanche Exposure Zones</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {avalancheZones.map((zone, idx) => (
              <Card key={zone.zone} className="glass-intense border-white/10 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">{zone.zone}</h3>
                    <span className="text-xs text-slate-500">Elevation: {zone.elevation}</span>
                  </div>
                  <Badge variant={zone.risk === 'Critical' ? 'danger' : zone.risk === 'High' ? 'warning' : 'info'} size="sm">{zone.risk}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                  <div><span className="text-slate-500">Aspect:</span> {zone.aspect}</div>
                  <div><span className="text-slate-500">Recent:</span> <span className="text-white">{zone.recentEvents}</span></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Active Avalanche Alerts */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-slate-400" />
            <h2 className="text-2xl font-bold text-white">Active Avalanche Alerts</h2>
          </div>
          <div className="space-y-4">
            {avalancheAlerts.map((alert, idx) => (
              <motion.div key={alert.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}>
                <Card className="glass-intense border-white/10 border-l-4 border-l-slate-400 p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-white mb-1">{alert.type}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-400 mb-2">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{alert.location}, {alert.district}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(alert.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-slate-400">{alert.description}</p>
                    </div>
                    <Badge variant={alert.severity === AlertSeverity.CRITICAL ? 'danger' : 'warning'} size="sm">{alert.severity.toUpperCase()}</Badge>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Route Closures */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-6 h-6 text-red-400" />
            <h2 className="text-2xl font-bold text-white">Route Closures & Access</h2>
          </div>
          <div className="space-y-4">
            {winterClosures.map((route, idx) => (
              <Card key={route.id} className="glass-intense border-white/10 p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">{route.name}</h3>
                    <span className="text-xs text-slate-500">{route.district}</span>
                  </div>
                  <Badge variant={route.status === 'closed' ? 'danger' : route.status === 'restricted' ? 'warning' : 'success'} size="sm">{route.status.toUpperCase()}</Badge>
                </div>
                <p className="text-xs text-slate-400 mb-2">{route.description}</p>
                <div className="text-xs text-slate-500">
                  <span className="text-slate-500">Alternative Available:</span> <span className={route.alternativeAvailable ? 'text-green-400' : 'text-red-400'}>{route.alternativeAvailable ? 'Yes' : 'No'}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
