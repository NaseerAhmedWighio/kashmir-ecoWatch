'use client';

import React, { useState, useMemo } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Map, AlertTriangle, Activity, Eye, CheckCircle, Filter, MapPin,
  Clock, ExternalLink, Info
} from 'lucide-react';

interface Incident {
  id: string;
  title: string;
  type: string;
  district: string;
  location: string;
  severity: 'critical' | 'serious' | 'moderate' | 'low';
  status: 'active' | 'monitoring' | 'responding' | 'resolved';
  timestamp: string;
  description: string;
  coordinates: [number, number];
}

const incidents: Incident[] = [
  {
    id: 'inc-001',
    title: 'Sewage Overflow - Hazratbal',
    type: 'Environmental Incident',
    district: 'Srinagar',
    location: 'Hazratbal STP Zone',
    severity: 'critical',
    status: 'responding',
    timestamp: '2024-03-28T09:00:00Z',
    description: 'Major sewage overflow into Dal Lake catchment. Emergency response activated. Water quality severely impacted downstream.',
    coordinates: [34.1234, 74.8567],
  },
  {
    id: 'inc-002',
    title: 'Avalanche - Sonamarg Road',
    type: 'Avalanche',
    district: 'Ganderbal',
    location: 'Sonamarg Highway, KM 18',
    severity: 'critical',
    status: 'active',
    timestamp: '2024-03-28T08:00:00Z',
    description: 'Large avalanche debris completely blocking Sonamarg road. Clearance operations suspended due to ongoing risk.',
    coordinates: [34.3000, 75.2833],
  },
  {
    id: 'inc-003',
    title: 'Forest Fire - Kerni Range',
    type: 'Forest Fire',
    district: 'Baramulla',
    location: 'Kerni Forest Zone',
    severity: 'serious',
    status: 'responding',
    timestamp: '2024-03-28T11:15:00Z',
    description: 'Active forest fire with firefighting teams deployed. Smoke visible from multiple locations affecting visibility.',
    coordinates: [34.2167, 74.3500],
  },
  {
    id: 'inc-004',
    title: 'Landslide - Z-Morh Corridor',
    type: 'Landslide',
    district: 'Anantnag',
    location: 'Z-Morh, KM 42',
    severity: 'critical',
    status: 'monitoring',
    timestamp: '2024-03-28T08:30:00Z',
    description: 'Active landslide zone with fresh debris. Road partially blocked. Heavy vehicle movement causing additional instability.',
    coordinates: [33.7333, 75.1833],
  },
  {
    id: 'inc-005',
    title: 'River Level Rising - Jhelum',
    type: 'Flood Risk',
    district: 'Srinagar',
    location: 'Jhelum River - Downtown',
    severity: 'serious',
    status: 'monitoring',
    timestamp: '2024-03-28T10:30:00Z',
    description: 'River levels rising above normal. Low-lying areas advised to monitor conditions. Flood gates being adjusted.',
    coordinates: [34.0837, 74.7973],
  },
  {
    id: 'inc-006',
    title: 'Glacial Melt Signal - Kolahoi',
    type: 'Glacial Risk',
    district: 'Ganderbal',
    location: 'Kolahoi Glacier Region',
    severity: 'moderate',
    status: 'monitoring',
    timestamp: '2024-03-28T07:30:00Z',
    description: 'Increased glacial melt observed. Potential glacial lake formation detected via satellite imagery.',
    coordinates: [34.2167, 75.4333],
  },
  {
    id: 'inc-007',
    title: 'Flash Flood Watch - Kishanganga',
    type: 'Flash Flood',
    district: 'Kupwara',
    location: 'Kishanganga Basin',
    severity: 'serious',
    status: 'active',
    timestamp: '2024-03-28T11:45:00Z',
    description: 'Heavy rainfall in catchment area. Flash flood watch issued for downstream communities.',
    coordinates: [34.3500, 74.2500],
  },
  {
    id: 'inc-008',
    title: 'River Overflow Risk - Wular',
    type: 'Hydrological Risk',
    district: 'Bandipora',
    location: 'Wular Lake Outflow',
    severity: 'moderate',
    status: 'monitoring',
    timestamp: '2024-03-28T10:00:00Z',
    description: 'Water levels approaching warning threshold. Overflow risk to adjacent wetlands and agricultural areas.',
    coordinates: [34.3167, 74.6333],
  },
  {
    id: 'inc-009',
    title: 'Earthquake - Tral Region',
    type: 'Seismic Event',
    district: 'Pulwama',
    location: 'Tral, Magnitude 3.8',
    severity: 'low',
    status: 'resolved',
    timestamp: '2024-03-28T06:45:00Z',
    description: 'Magnitude 3.8 earthquake recorded. No structural damage reported. Monitoring for aftershocks.',
    coordinates: [33.8667, 74.9500],
  },
  {
    id: 'inc-010',
    title: 'Algal Bloom Risk - Manasbal',
    type: 'Water Quality',
    district: 'Ganderbal',
    location: 'Manasbal Lake',
    severity: 'moderate',
    status: 'monitoring',
    timestamp: '2024-03-28T09:30:00Z',
    description: 'Early signs of algal bloom detected. Water quality parameters being monitored closely.',
    coordinates: [34.1833, 74.8500],
  },
  {
    id: 'inc-011',
    title: 'Air Quality Spike - Srinagar Urban',
    type: 'Air Pollution',
    district: 'Srinagar',
    location: 'City Center Monitoring',
    severity: 'serious',
    status: 'active',
    timestamp: '2024-03-28T12:00:00Z',
    description: 'AQI reached unhealthy levels in urban core. Sensitive groups advised to limit outdoor exposure.',
    coordinates: [34.0837, 74.8237],
  },
  {
    id: 'inc-012',
    title: 'Road Closure - Tangdhar',
    type: 'Winter Closure',
    district: 'Kupwara',
    location: 'Kupwara-Tangdhar Road',
    severity: 'moderate',
    status: 'active',
    timestamp: '2024-03-28T07:00:00Z',
    description: 'Limited access due to snow accumulation. 4WD vehicles only. Alternative route available.',
    coordinates: [34.3500, 74.2500],
  },
];

const routeMap: Record<string, string> = {
  'Environmental Incident': '/risk-monitoring/environmental-incident-risk',
  'Avalanche': '/risk-monitoring/avalanche-winter',
  'Forest Fire': '/risk-monitoring/forest-fire',
  'Landslide': '/risk-monitoring/landslide-slope',
  'Flood Risk': '/risk-monitoring/flood-flash-flood',
  'Glacial Risk': '/risk-monitoring/glacier-cryosphere',
  'Flash Flood': '/risk-monitoring/flood-flash-flood',
  'Hydrological Risk': '/risk-monitoring/hydrological-risk',
  'Seismic Event': '/risk-monitoring/earthquake',
  'Water Quality': '/risk-monitoring/water-pollution',
  'Air Pollution': '/risk-monitoring/air-pollution',
  'Winter Closure': '/risk-monitoring/shelters-closures-emergency-routes',
};

const severityColors = {
  critical: { border: 'border-red-500/30', badge: 'bg-red-500/10 text-red-400', bar: 'bg-red-500' },
  serious: { border: 'border-orange-500/30', badge: 'bg-orange-500/10 text-orange-400', bar: 'bg-orange-500' },
  moderate: { border: 'border-amber-500/30', badge: 'bg-amber-500/10 text-amber-400', bar: 'bg-amber-500' },
  low: { border: 'border-blue-500/30', badge: 'bg-blue-500/10 text-blue-400', bar: 'bg-blue-500' },
};

const statusColors = {
  active: 'bg-red-500/10 text-red-400',
  monitoring: 'bg-amber-500/10 text-amber-400',
  responding: 'bg-emerald-500/10 text-emerald-400',
  resolved: 'bg-slate-500/10 text-slate-400',
};

function formatTimestamp(ts: string): string {
  const date = new Date(ts);
  return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function IncidentCard({ incident }: { incident: Incident }) {
  const router = useRouter();
  const colors = severityColors[incident.severity];
  const statusColor = statusColors[incident.status];
  const route = routeMap[incident.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div
        className={`glass-intense border-white/10 border rounded-xl overflow-hidden cursor-pointer hover:border-white/20 transition-all group ${colors.border}`}
        onClick={() => route && router.push(route)}
      >
        {/* Severity indicator bar */}
        <div className={`h-1 ${colors.bar}`} />

        <div className="p-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex-1">
              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider ${colors.badge} mb-2`}>
                {incident.type}
              </span>
              <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors leading-tight">
                {incident.title}
              </h3>
            </div>
            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider ${statusColor} flex-shrink-0`}>
              {incident.status}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{incident.district} - {incident.location}</span>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-3">
            {incident.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <div className="flex items-center gap-3 text-[11px] text-slate-500">
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{formatTimestamp(incident.timestamp)}</span>
              </div>
              <div className="flex items-center gap-1 font-mono">
                <span>{incident.coordinates[0].toFixed(2)}</span>
                <span>,</span>
                <span>{incident.coordinates[1].toFixed(2)}</span>
              </div>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function LiveIncidentMapPage() {
  const router = useRouter();
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const stats = useMemo(() => ({
    active: incidents.filter(i => i.status === 'active').length,
    responding: incidents.filter(i => i.status === 'responding').length,
    monitoring: incidents.filter(i => i.status === 'monitoring').length,
    resolved: incidents.filter(i => i.status === 'resolved').length,
  }), []);

  const filteredIncidents = useMemo(() => {
    return incidents.filter(inc => {
      const severityMatch = severityFilter === 'all' || inc.severity === severityFilter;
      const statusMatch = statusFilter === 'all' || inc.status === statusFilter;
      return severityMatch && statusMatch;
    });
  }, [severityFilter, statusFilter]);

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-48 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/50 via-orange-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-2xl">
                <Map className="w-8 h-8 text-white" />
              </div>
              <Badge variant="danger" size="lg">Live Operations</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Live Incident <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Map</span>
            </h1>

            <p className="text-xl text-slate-400 leading-relaxed max-w-3xl">
              Real-time spatial view of active environmental incidents, field reports, and hazard events across Kashmir.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Summary Strip */}
      <section className="border-y border-white/5 bg-slate-950">
        <div className="container mx-auto px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="glass-intense border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-xs text-slate-400 uppercase tracking-wider">Active</span>
              </div>
              <p className="text-2xl font-black text-white">{stats.active}</p>
            </div>
            <div className="glass-intense border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-slate-400 uppercase tracking-wider">Responding</span>
              </div>
              <p className="text-2xl font-black text-white">{stats.responding}</p>
            </div>
            <div className="glass-intense border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Eye className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-slate-400 uppercase tracking-wider">Monitoring</span>
              </div>
              <p className="text-2xl font-black text-white">{stats.monitoring}</p>
            </div>
            <div className="glass-intense border-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-400 uppercase tracking-wider">Resolved</span>
              </div>
              <p className="text-2xl font-black text-white">{stats.resolved}</p>
            </div>
            <div className="glass-intense border-white/10 rounded-xl p-4 col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-400 uppercase tracking-wider">Last Updated</span>
              </div>
              <p className="text-sm font-bold text-white">Mar 28, 12:00 PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Controls */}
      <section className="border-b border-white/5 bg-slate-950/50">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-medium text-slate-300">Filters:</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-500 uppercase tracking-wider">Severity</label>
                <select
                  value={severityFilter}
                  onChange={(e) => setSeverityFilter(e.target.value)}
                  className="bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
                >
                  <option value="all">All</option>
                  <option value="critical">Critical</option>
                  <option value="serious">Serious</option>
                  <option value="moderate">Moderate</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs text-slate-500 uppercase tracking-wider">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-slate-900 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-500/50"
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="monitoring">Monitoring</option>
                  <option value="responding">Responding</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
            </div>
            <div className="ml-auto text-xs text-slate-500">
              Showing <span className="text-white font-medium">{filteredIncidents.length}</span> of {incidents.length} incidents
            </div>
          </div>
        </div>
      </section>

      {/* Incident Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredIncidents.map((incident) => (
              <IncidentCard key={incident.id} incident={incident} />
            ))}
          </div>
          {filteredIncidents.length === 0 && (
            <div className="text-center py-16">
              <MapPin className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-lg text-slate-400">No incidents match the selected filters.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => { setSeverityFilter('all'); setStatusFilter('all'); }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* How This Map Works */}
      <section className="border-t border-white/5 bg-slate-900/50">
        <div className="container mx-auto px-6 py-16 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="glass-intense border-white/10 rounded-xl p-8 md:p-10 max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 flex items-center justify-center">
                  <Info className="w-5 h-5 text-red-400" />
                </div>
                <h2 className="text-2xl font-bold text-white">How This Map Works</h2>
              </div>

              <div className="space-y-4 text-slate-400 leading-relaxed">
                <p>
                  The Live Incident Map aggregates real-time environmental incidents from multiple sources across the Kashmir EcoWatch platform:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Alerts & Advisories</strong> — Automated alerts from monitoring systems, sensor networks, and satellite detection trigger incident entries.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Field Reports</strong> — Ground intelligence from field teams, verified community submissions, and partner agencies add spatial context.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Activity className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Risk Monitoring Systems</strong> — Continuous risk assessments across environmental, hydrological, seismic, and atmospheric modules feed updates.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Eye className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span><strong className="text-white">Incident Lifecycle</strong> — Each incident tracks through active, monitoring, responding, and resolved stages with timestamped updates.</span>
                  </li>
                </ul>
                <p className="text-sm text-slate-500 pt-2">
                  Click any incident card to navigate to the detailed risk monitoring page for that incident type.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
