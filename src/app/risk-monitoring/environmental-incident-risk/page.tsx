'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AlertCircle, ArrowRight, AlertTriangle, MapPin, Clock, TrendingUp, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { liveAlerts, advisories } from '@/data/risk-monitoring';
import { AlertSeverity } from '@/types/alerts';

const environmentalIncidents = liveAlerts.filter(a => 
  a.hazardCategory === 'Environmental Incident Risk' || 
  a.type.includes('Sewage') || 
  a.type.includes('Pollution') ||
  a.type.includes('Contamination')
);

const incidentTypes = [
  { type: 'Sewage Overflows', count: 3, severity: 'Critical', status: 'Emergency Response Active' },
  { type: 'Toxic Discharge', count: 1, severity: 'Serious', status: 'Under Investigation' },
  { type: 'Severe AQI Episodes', count: 5, severity: 'Moderate', status: 'Advisory Issued' },
  { type: 'Landfill Fire Events', count: 2, severity: 'Serious', status: 'Monitoring' },
  { type: 'Unsafe Water Emergencies', count: 2, severity: 'Critical', status: 'Response Deployed' },
  { type: 'Pollution Emergencies', count: 1, severity: 'Serious', status: 'Escalated' },
];

export default function EnvironmentalIncidentRiskPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      <section className="relative pt-20 md:pt-48 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/60 via-rose-950/40 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <a href="/risk-monitoring" className="hover:text-white transition-colors">Risk & Monitoring</a>
              <span>/</span>
              <a href="/risk-monitoring/hazard-risks" className="hover:text-white transition-colors">Hazard Risks</a>
              <span>/</span>
              <span className="text-white font-medium">Environmental Incident Risk</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-rose-700 flex items-center justify-center shadow-2xl">
                <AlertCircle className="w-8 h-8 text-white" />
              </div>
              <Badge variant="danger" size="lg">Pollution & Escalation Intelligence</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Environmental <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-400">Incident</span> Risk
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              Escalated environmental cases from monitoring systems: severe sewage overflows, toxic discharge, 
              severe AQI episodes, landfill fires, unsafe water emergencies, and pollution emergencies.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-red-600 to-rose-700 text-white shadow-xl" onClick={() => router.push('/risk-monitoring/live-alerts')}>
                <AlertTriangle className="w-5 h-5 mr-2" />View Incidents
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => router.push('/risk-monitoring/hazard-risks')}>Back to Hazard Risks</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Incident Type Summary */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-red-400" />
            <h2 className="text-2xl font-bold text-white">Incident Type Summary</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {incidentTypes.map((incident, idx) => (
              <Card key={incident.type} className="glass-intense border-white/10 p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-sm font-bold text-white">{incident.type}</h3>
                  <Badge variant={incident.severity === 'Critical' ? 'danger' : 'warning'} size="sm">{incident.severity}</Badge>
                </div>
                <div className="space-y-2 text-xs text-slate-400">
                  <div className="flex items-center justify-between">
                    <span>Active Cases:</span>
                    <span className="text-white font-bold">{incident.count}</span>
                  </div>
                  <div>
                    <span>Status:</span> <span className="text-slate-300">{incident.status}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Active Environmental Incidents */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <h2 className="text-2xl font-bold text-white">Active Environmental Incidents</h2>
          </div>
          <div className="space-y-4">
            {environmentalIncidents.map((alert, idx) => (
              <motion.div key={alert.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}>
                <Card className="glass-intense border-white/10 border-l-4 border-l-red-600 p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-white mb-1">{alert.type}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-400 mb-2">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{alert.location}, {alert.district}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(alert.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-sm text-slate-400">{alert.description}</p>
                      {alert.escalationHistory && (
                        <div className="mt-2 text-xs text-orange-400">
                          Escalation: {alert.escalationHistory.join(' → ')}
                        </div>
                      )}
                    </div>
                    <Badge variant={alert.severity === AlertSeverity.CRITICAL ? 'danger' : 'warning'} size="sm">{alert.severity.toUpperCase()}</Badge>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Escalation Pathways */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-red-400" />
            <h2 className="text-2xl font-bold text-white">Escalation Pathways</h2>
          </div>
          <Card className="glass-intense border-white/10 p-6">
            <div className="space-y-4">
              {[
                { from: 'Environmental Monitoring', trigger: 'Threshold breach', to: 'Risk & Monitoring', action: 'Immediate escalation' },
                { from: 'Public Reports', trigger: 'Verified severe incident', to: 'Environmental Incident Risk', action: 'Emergency classification' },
                { from: 'Water Systems', trigger: 'Contamination event', to: 'Hydrological Risk', action: 'Advisory issuance' },
                { from: 'Field Reports', trigger: 'Pollution emergency', to: 'District Response', action: 'Response deployment' },
              ].map((pathway, idx) => (
                <div key={idx} className="flex items-center gap-4 text-sm">
                  <div className="flex-1 p-3 bg-slate-900/50 rounded">
                    <div className="text-xs text-slate-500 mb-1">From:</div>
                    <div className="text-white font-medium">{pathway.from}</div>
                  </div>
                  <div className="text-slate-500 text-xs">
                    <div>Trigger:</div>
                    <div className="text-amber-400">{pathway.trigger}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <div className="flex-1 p-3 bg-red-900/20 rounded border border-red-500/20">
                    <div className="text-xs text-slate-500 mb-1">To:</div>
                    <div className="text-white font-medium">{pathway.to}</div>
                    <div className="text-xs text-red-400 mt-1">{pathway.action}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
