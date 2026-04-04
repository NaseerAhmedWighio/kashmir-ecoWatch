'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Archive, Search, Filter, Calendar, Clock, MapPin, AlertTriangle,
  ChevronDown, BarChart3, FileText, ShieldAlert, Info
} from 'lucide-react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

interface ArchivedAlert {
  id: string;
  title: string;
  type: string;
  hazardCategory: string;
  district: string;
  severity: 'critical' | 'serious' | 'moderate' | 'low';
  status: 'resolved' | 'expired' | 'archived';
  issuedAt: string;
  resolvedAt: string;
  duration: string;
  description: string;
  actions: string[];
}

const archivedAlerts: ArchivedAlert[] = [
  {
    id: 'arch-001',
    title: 'Major Flood Event - Jhelum Basin 2023',
    type: 'Flood Warning',
    hazardCategory: 'Flood & Flash Flood',
    district: 'Srinagar',
    severity: 'critical',
    status: 'resolved',
    issuedAt: '2023-09-05T06:00:00Z',
    resolvedAt: '2023-09-12T18:00:00Z',
    duration: '7 days',
    description: 'River Jhelum exceeded danger level at multiple gauge points. Flood gates opened. Multiple low-lying areas affected. Emergency response activated across the valley.',
    actions: ['Evacuation of low-lying areas', 'Flood gate management', 'Emergency shelter activation', 'Continuous monitoring'],
  },
  {
    id: 'arch-002',
    title: 'Avalanche Season Closure - Winter 2023-24',
    type: 'Avalanche Advisory',
    hazardCategory: 'Avalanche & Winter',
    district: 'Gulmarg',
    severity: 'critical',
    status: 'expired',
    issuedAt: '2023-12-15T06:00:00Z',
    resolvedAt: '2024-03-20T18:00:00Z',
    duration: '96 days',
    description: 'Season-long avalanche advisory for Gulmarg backcountry. Multiple high-danger periods recorded. Season ended with above-average snowpack.',
    actions: ['Backcountry access restrictions', 'Daily danger rating updates', 'Rescue team standby', 'Route closure management'],
  },
  {
    id: 'arch-003',
    title: 'Forest Fire Outbreak - Spring 2024',
    type: 'Forest Fire Alert',
    hazardCategory: 'Forest Fire',
    district: 'Baramulla',
    severity: 'serious',
    status: 'resolved',
    issuedAt: '2024-03-10T08:00:00Z',
    resolvedAt: '2024-03-18T14:00:00Z',
    duration: '8 days',
    description: 'Multiple forest fire incidents across Baramulla district during dry spell. Firefighting teams deployed to Kerni and surrounding ranges.',
    actions: ['Firefighting deployment', 'Smoke monitoring', 'Community alert system', 'Weather watch'],
  },
  {
    id: 'arch-004',
    title: 'Earthquake Event - M5.2 Kupwara',
    type: 'Seismic Event',
    hazardCategory: 'Earthquake',
    district: 'Kupwara',
    severity: 'serious',
    status: 'resolved',
    issuedAt: '2024-01-22T14:30:00Z',
    resolvedAt: '2024-01-22T20:00:00Z',
    duration: '5.5 hours',
    description: 'Magnitude 5.2 earthquake centered near Kupwara. Felt across the valley. No major structural damage. Multiple aftershocks monitored.',
    actions: ['Structural assessment', 'Aftershock monitoring', 'Public communication', 'Hospital standby verification'],
  },
  {
    id: 'arch-005',
    title: 'Landslide Blocks Highway - Z-Morh',
    type: 'Landslide Warning',
    hazardCategory: 'Landslide & Slope',
    district: 'Anantnag',
    severity: 'critical',
    status: 'resolved',
    issuedAt: '2023-08-15T10:00:00Z',
    resolvedAt: '2023-08-22T16:00:00Z',
    duration: '7 days',
    description: 'Major landslide at Z-Morh corridor blocking Srinagar-Jammu highway. Clearance operations took one week. Traffic diverted to alternate routes.',
    actions: ['Highway closure', 'Traffic diversion', 'Clearance operations', 'Slope stabilization assessment'],
  },
  {
    id: 'arch-006',
    title: 'Sewage Emergency - Hazratbal STP Failure',
    type: 'Environmental Incident',
    hazardCategory: 'Environmental Incident Risk',
    district: 'Srinagar',
    severity: 'critical',
    status: 'resolved',
    issuedAt: '2024-02-10T09:00:00Z',
    resolvedAt: '2024-02-25T12:00:00Z',
    duration: '15 days',
    description: 'Major sewage treatment plant failure at Hazratbal. Raw sewage discharge into Dal Lake catchment. Emergency repairs completed and water quality monitoring continued.',
    actions: ['Emergency repair activation', 'Water quality testing', 'Public health advisory', 'Alternative treatment routing'],
  },
  {
    id: 'arch-007',
    title: 'Air Quality Emergency - Srinagar Winter',
    type: 'Air Quality Alert',
    hazardCategory: 'Air Pollution',
    district: 'Srinagar',
    severity: 'serious',
    status: 'resolved',
    issuedAt: '2024-01-05T06:00:00Z',
    resolvedAt: '2024-01-15T18:00:00Z',
    duration: '10 days',
    description: 'AQI reached hazardous levels during winter inversion period. Sensitive groups advised to limit outdoor exposure. School closures recommended.',
    actions: ['AQI monitoring intensification', 'Public health advisory', 'School closure recommendation', 'Vehicle restriction consideration'],
  },
  {
    id: 'arch-008',
    title: 'Glacial Lake Outburst Risk - Kolahoi',
    type: 'Glacial Risk Alert',
    hazardCategory: 'Glacier & Cryosphere',
    district: 'Ganderbal',
    severity: 'moderate',
    status: 'archived',
    issuedAt: '2023-07-01T06:00:00Z',
    resolvedAt: '2023-09-30T18:00:00Z',
    duration: '91 days',
    description: 'Elevated glacial lake formation risk at Kolahoi Glacier during melt season. Satellite monitoring active. Downstream communities notified.',
    actions: ['Satellite monitoring activation', 'Downstream community notification', 'Hydrological monitoring', 'Emergency planning review'],
  },
  {
    id: 'arch-009',
    title: 'Flash Flood - Lidder Valley',
    type: 'Flash Flood Warning',
    hazardCategory: 'Flood & Flash Flood',
    district: 'Anantnag',
    severity: 'serious',
    status: 'resolved',
    issuedAt: '2023-07-20T14:00:00Z',
    resolvedAt: '2023-07-23T10:00:00Z',
    duration: '3 days',
    description: 'Flash flood event in Lidder Valley following intense rainfall. Tourist areas affected. Emergency evacuation of riverside camps completed.',
    actions: ['Riverside evacuation', 'Tourist area closure', 'Emergency response deployment', 'Damage assessment'],
  },
  {
    id: 'arch-010',
    title: 'Algal Bloom Advisory - Dal Lake',
    type: 'Water Quality Advisory',
    hazardCategory: 'Water Quality',
    district: 'Srinagar',
    severity: 'moderate',
    status: 'resolved',
    issuedAt: '2023-06-10T06:00:00Z',
    resolvedAt: '2023-07-05T18:00:00Z',
    duration: '25 days',
    description: 'Algal bloom detected in Dal Lake. Water quality parameters monitored. Nutrient loading assessment conducted.',
    actions: ['Water quality monitoring', 'Bloom extent mapping', 'Nutrient source investigation', 'Public communication'],
  },
  {
    id: 'arch-011',
    title: 'Winter Storm Warning - High Altitude Zones',
    type: 'Winter Storm Advisory',
    hazardCategory: 'Avalanche & Winter',
    district: 'Gulmarg, Ganderbal',
    severity: 'serious',
    status: 'resolved',
    issuedAt: '2024-02-01T06:00:00Z',
    resolvedAt: '2024-02-08T18:00:00Z',
    duration: '7 days',
    description: 'Heavy snowfall expected across high-altitude zones. Road closures anticipated. Emergency shelters activated in Gulmarg and Sonamarg.',
    actions: ['Travel advisory issuance', 'Emergency shelter activation', 'Supply chain prepositioning', 'Communication system verification'],
  },
  {
    id: 'arch-012',
    title: 'Fish Kill Event - Wular Lake',
    type: 'Ecological Incident',
    hazardCategory: 'Environmental Incident Risk',
    district: 'Bandipora',
    severity: 'moderate',
    status: 'resolved',
    issuedAt: '2023-11-15T10:00:00Z',
    resolvedAt: '2023-11-22T16:00:00Z',
    duration: '7 days',
    description: 'Mass fish kill event at Wular Lake. Water quality testing indicated low dissolved oxygen. Investigation into agricultural runoff sources conducted.',
    actions: ['Water quality testing', 'Fish kill documentation', 'Source investigation', 'Community livelihood support assessment'],
  },
];

const severityConfig = {
  critical: { border: 'border-red-500/30', bg: 'bg-red-500/10', text: 'text-red-400', label: 'Critical' },
  serious: { border: 'border-orange-500/30', bg: 'bg-orange-500/10', text: 'text-orange-400', label: 'Serious' },
  moderate: { border: 'border-amber-500/30', bg: 'bg-amber-500/10', text: 'text-amber-400', label: 'Moderate' },
  low: { border: 'border-blue-500/30', bg: 'bg-blue-500/10', text: 'text-blue-400', label: 'Low' },
};

const statusConfig = {
  resolved: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', label: 'Resolved' },
  expired: { bg: 'bg-slate-500/10', text: 'text-slate-400', label: 'Expired' },
  archived: { bg: 'bg-indigo-500/10', text: 'text-indigo-400', label: 'Archived' },
};

const categoryOptions = [
  { value: 'all', label: 'All Categories' },
  { value: 'flood', label: 'Flood & Flash Flood' },
  { value: 'avalanche', label: 'Avalanche & Winter' },
  { value: 'fire', label: 'Forest Fire' },
  { value: 'earthquake', label: 'Earthquake' },
  { value: 'landslide', label: 'Landslide & Slope' },
  { value: 'environmental', label: 'Environmental' },
  { value: 'air', label: 'Air Pollution' },
  { value: 'water', label: 'Water Quality' },
  { value: 'glacial', label: 'Glacier & Cryosphere' },
];

function matchesCategory(hazardCategory: string, filter: string): boolean {
  if (filter === 'all') return true;
  const lower = hazardCategory.toLowerCase();
  switch (filter) {
    case 'flood': return lower.includes('flood');
    case 'avalanche': return lower.includes('avalanche') || lower.includes('winter');
    case 'fire': return lower.includes('fire');
    case 'earthquake': return lower.includes('earthquake');
    case 'landslide': return lower.includes('landslide') || lower.includes('slope');
    case 'environmental': return lower.includes('environmental') || lower.includes('incident');
    case 'air': return lower.includes('air') || lower.includes('pollution');
    case 'water': return lower.includes('water');
    case 'glacial': return lower.includes('glacier') || lower.includes('cryosphere');
    default: return true;
  }
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function AlertArchivePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filtered = archivedAlerts
    .filter((alert) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        !q ||
        alert.title.toLowerCase().includes(q) ||
        alert.description.toLowerCase().includes(q) ||
        alert.district.toLowerCase().includes(q);
      const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
      const matchesStatus = statusFilter === 'all' || alert.status === statusFilter;
      const matchesCategory = matchesCategory(alert.hazardCategory, categoryFilter);
      return matchesSearch && matchesSeverity && matchesStatus && matchesCategory;
    })
    .sort((a, b) => new Date(b.issuedAt).getTime() - new Date(a.issuedAt).getTime());

  const totalArchived = archivedAlerts.length;
  const resolvedCount = archivedAlerts.filter((a) => a.status === 'resolved').length;
  const expiredCount = archivedAlerts.filter((a) => a.status === 'expired').length;
  const archivedCount = archivedAlerts.filter((a) => a.status === 'archived').length;
  const avgDuration = '18.5 days';
  const longestEvent = '96 days';

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="pt-20 md:pt-48 pb-16 md:pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-indigo-950/30 to-slate-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">
              <Archive className="w-4 h-4 text-indigo-400" />
              <span className="text-sm text-indigo-300">Historical Records</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">
              <span className="bg-gradient-to-r from-indigo-400 to-slate-300 bg-clip-text text-transparent">
                Alert Archive
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Searchable historical record of all alerts, advisories, and hazard warnings issued through Kashmir EcoWatch monitoring systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Summary Strip */}
      <section className="py-8 border-y border-white/5 bg-slate-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4"
          >
            <div className="glass-intense border-white/10 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Archive className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-400 uppercase tracking-wider">Total Archived</span>
              </div>
              <p className="text-2xl font-bold text-white">{totalArchived}</p>
            </div>
            <div className="glass-intense border-white/10 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <ShieldAlert className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-slate-400 uppercase tracking-wider">Resolved</span>
              </div>
              <p className="text-2xl font-bold text-emerald-400">{resolvedCount}</p>
            </div>
            <div className="glass-intense border-white/10 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-xs text-slate-400 uppercase tracking-wider">Expired</span>
              </div>
              <p className="text-2xl font-bold text-slate-400">{expiredCount}</p>
            </div>
            <div className="glass-intense border-white/10 rounded-xl p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <BarChart3 className="w-4 h-4 text-indigo-400" />
                <span className="text-xs text-slate-400 uppercase tracking-wider">Avg Duration</span>
              </div>
              <p className="text-2xl font-bold text-indigo-400">{avgDuration}</p>
            </div>
            <div className="glass-intense border-white/10 rounded-xl p-4 text-center col-span-2 md:col-span-1">
              <div className="flex items-center justify-center gap-2 mb-1">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-slate-400 uppercase tracking-wider">Longest Event</span>
              </div>
              <p className="text-2xl font-bold text-amber-400">{longestEvent}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Controls */}
      <section className="py-8 border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-4"
          >
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search by title, description, or district..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-900/80 border border-white/10 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all"
              />
            </div>

            {/* Severity Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="appearance-none pl-9 pr-10 py-3 bg-slate-900/80 border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all cursor-pointer"
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="serious">Serious</option>
                <option value="moderate">Moderate</option>
                <option value="low">Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none px-4 pr-10 py-3 bg-slate-900/80 border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all cursor-pointer"
              >
                <option value="all">All Statuses</option>
                <option value="resolved">Resolved</option>
                <option value="expired">Expired</option>
                <option value="archived">Archived</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="appearance-none px-4 pr-10 py-3 bg-slate-900/80 border border-white/10 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all cursor-pointer"
              >
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>
          </motion.div>

          {/* Results count */}
          <div className="mt-4 flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-500" />
            <span className="text-sm text-slate-400">
              Showing <span className="text-white font-medium">{filtered.length}</span> of {totalArchived} archived alerts
            </span>
          </div>
        </div>
      </section>

      {/* Alert List */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {filtered.map((alert, index) => {
              const sev = severityConfig[alert.severity];
              const stat = statusConfig[alert.status];
              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => router.push('/risk-updates')}
                  className={`glass-intense border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-white/20 transition-all group`}
                >
                  <div className={`border-l-4 ${sev.border} p-5 md:p-6`}>
                    {/* Header row */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-3">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge className={`${sev.bg} ${sev.text} border ${sev.border}`}>
                            {sev.label}
                          </Badge>
                          <Badge className={`${stat.bg} ${stat.text}`}>
                            {stat.label}
                          </Badge>
                          <span className="text-xs text-slate-500 font-mono">{alert.id}</span>
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-indigo-300 transition-colors">
                          {alert.title}
                        </h3>
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="flex flex-wrap items-center gap-4 mb-3 text-sm text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{alert.district}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Issued: {formatDate(alert.issuedAt)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Resolved: {formatDate(alert.resolvedAt)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Duration: {alert.duration}</span>
                      </div>
                    </div>

                    {/* Type badge */}
                    <div className="mb-3">
                      <Badge variant="outline" className="text-xs">
                        {alert.type} — {alert.hazardCategory}
                      </Badge>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-400 leading-relaxed mb-4">
                      {alert.description}
                    </p>

                    {/* Actions */}
                    <div>
                      <h4 className="text-xs uppercase tracking-wider text-slate-500 mb-2">Actions Taken</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {alert.actions.map((action, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center py-16"
            >
              <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-300 mb-2">No alerts found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* About This Archive */}
      <section className="py-12 md:py-16 border-t border-white/5 bg-slate-900/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-intense border-white/10 rounded-xl p-6 md:p-8 max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <Info className="w-5 h-5 text-indigo-400" />
              </div>
              <h2 className="text-xl md:text-2xl font-semibold text-white">About This Archive</h2>
            </div>

            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                The Alert Archive serves as a comprehensive historical record of all environmental alerts, advisories,
                and hazard warnings issued through the Kashmir EcoWatch monitoring systems. Every alert that transitions
                from active status is preserved here for research, analysis, and institutional memory.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">Retention Policy</h3>
                  <p className="text-sm">
                    All alerts are retained indefinitely in the archive. Resolved alerts include full lifecycle data
                    from issuance through resolution, including actions taken and outcome assessments.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">Alert Lifecycle</h3>
                  <p className="text-sm">
                    Alerts flow from <span className="text-amber-400">Active</span> on the monitoring dashboard to{' '}
                    <span className="text-emerald-400">Resolved</span> or <span className="text-slate-400">Expired</span>
                    status, and are then automatically archived. Critical incidents include post-event analysis reports.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">Using This Archive</h3>
                <p className="text-sm">
                  Search and filter by severity, status, hazard category, or keyword. Each alert card links to the
                  Risk Updates page for detailed incident reports and response documentation. Researchers and
                  policymakers can use this archive to identify patterns, assess response effectiveness, and
                  inform future preparedness planning.
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
