'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { FileText, ArrowRight, MapPin, AlertTriangle, Shield, Home, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { emergencyRoutes } from '@/data/risk-monitoring';

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'open': return <Badge variant="success" size="sm">Open</Badge>;
    case 'restricted': return <Badge variant="warning" size="sm">Restricted</Badge>;
    case 'closed': return <Badge variant="danger" size="sm">Closed</Badge>;
    default: return null;
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'route': return <MapPin className="w-5 h-5 text-blue-400" />;
    case 'shelter': return <Home className="w-5 h-5 text-green-400" />;
    case 'closure': return <XCircle className="w-5 h-5 text-red-400" />;
    default: return <FileText className="w-5 h-5 text-slate-400" />;
  }
};

export default function SheltersClosuresEmergencyRoutesPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      <section className="relative pt-20 md:pt-48 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-blue-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <a href="/risk-monitoring" className="hover:text-white transition-colors">Risk & Monitoring</a>
              <span>/</span>
              <span className="text-white font-medium">Shelters, Closures & Emergency Routes</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-2xl">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <Badge variant="outline" size="lg" className="border-indigo-500/30 text-indigo-400">Safe Routes & Operational Mobility</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Shelters, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Closures</span> & Emergency Routes
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              Closure tracking, emergency shelter status, restricted access monitoring, safe route intelligence, 
              and operational mobility support across Kashmir's transportation network.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-xl" onClick={() => router.push('/risk-monitoring/live-alerts')}>
                <AlertTriangle className="w-5 h-5 mr-2" />View Active Alerts
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => router.push('/risk-monitoring')}>Back to Overview</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Route & Shelter Summary Stats */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Routes', value: emergencyRoutes.filter(r => r.type === 'route').length, icon: MapPin, color: 'text-blue-400' },
              { label: 'Open Shelters', value: emergencyRoutes.filter(r => r.type === 'shelter' && r.status === 'open').length, icon: Home, color: 'text-green-400' },
              { label: 'Active Closures', value: emergencyRoutes.filter(r => r.type === 'closure' || r.status === 'closed').length, icon: XCircle, color: 'text-red-400' },
              { label: 'Restricted Access', value: emergencyRoutes.filter(r => r.status === 'restricted').length, icon: Shield, color: 'text-amber-400' },
            ].map((stat, idx) => (
              <div key={stat.label} className="text-center">
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
                <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Routes & Closures List */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Routes & Closures</h2>
          </div>
          <div className="space-y-4">
            {emergencyRoutes.filter(r => r.type === 'route' || r.type === 'closure').map((route, idx) => (
              <Card key={route.id} className="glass-intense border-white/10 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    {getTypeIcon(route.type)}
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1">{route.name}</h3>
                      <span className="text-xs text-slate-500">{route.district}</span>
                    </div>
                  </div>
                  {getStatusBadge(route.status)}
                </div>
                <p className="text-xs text-slate-400 mb-2">{route.description}</p>
                <div className="text-xs text-slate-500">
                  <span className="text-slate-500">Alternative Available:</span>{' '}
                  <span className={route.alternativeAvailable ? 'text-green-400' : 'text-red-400'}>
                    {route.alternativeAvailable ? 'Yes' : 'No'}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Shelters */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <Home className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-bold text-white">Emergency Shelters</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {emergencyRoutes.filter(r => r.type === 'shelter').map((shelter, idx) => (
              <Card key={shelter.id} className="glass-intense border-white/10 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    {getTypeIcon(shelter.type)}
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1">{shelter.name}</h3>
                      <span className="text-xs text-slate-500">{shelter.district}</span>
                    </div>
                  </div>
                  {getStatusBadge(shelter.status)}
                </div>
                <p className="text-xs text-slate-400">{shelter.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
