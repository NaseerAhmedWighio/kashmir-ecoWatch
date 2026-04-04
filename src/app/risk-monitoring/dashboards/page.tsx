'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  TrendingUp, ArrowRight, Bell, AlertTriangle, MapPin, Activity,
  FileText, Shield, BarChart3, Droplets, Mountain, Flame, Snowflake,
  Zap, Waves, Factory, Trash2, Droplet, Clock, ExternalLink, Layers,
  Target, Route
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { riskDashboardStats, liveAlerts } from '@/data/risk-monitoring';

// ─── Types ──────────────────────────────────────────────────────────────────

type DashboardStatus = 'Live' | 'Periodic' | 'Analytical' | 'Under Expansion';
type DashboardGroup = 'strategic' | 'hazard' | 'environmental' | 'operational';

interface DashboardCard {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  group: DashboardGroup;
  type: string;
  description: string;
  metrics: number;
  status: DashboardStatus;
  feeds: string[];
  route: string;
  color: string;
}

// ─── Dashboard Registry ─────────────────────────────────────────────────────

const DASHBOARDS: DashboardCard[] = [
  // Strategic Overview
  {
    id: 'multi-hazard-overview',
    name: 'Multi-Hazard Overview',
    icon: Layers,
    group: 'strategic',
    type: 'Strategic Overview',
    description: 'Cross-hazard risk synthesis, district-level threat overlap, and system-wide alert aggregation for Kashmir-wide situational awareness.',
    metrics: 24,
    status: 'Live',
    feeds: ['Risk & Monitoring', 'District Profiles', 'Live Alerts'],
    route: '/risk-monitoring',
    color: 'from-red-500 to-rose-600',
  },
  {
    id: 'district-risk-scores',
    name: 'District Risk Scores',
    icon: MapPin,
    group: 'strategic',
    type: 'Strategic Overview',
    description: 'District-wise risk levels, trend directions, dominant hazards, infrastructure concerns, and advisory status across all monitored districts.',
    metrics: 18,
    status: 'Live',
    feeds: ['District Profiles', 'Risk & Monitoring', 'Alert Registry'],
    route: '/risk-monitoring/district-risk-profiles',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'district-operations',
    name: 'District Operations Summary',
    icon: Target,
    group: 'strategic',
    type: 'Strategic Overview',
    description: 'Operational risk posture per district: open incidents, active advisories, closure status, and response capacity indicators.',
    metrics: 12,
    status: 'Periodic',
    feeds: ['Risk & Monitoring', 'Operations', 'Advisories'],
    route: '/risk-monitoring/district-risk-profiles',
    color: 'from-slate-400 to-slate-600',
  },

  // Hazard Dashboards
  {
    id: 'flood-risk',
    name: 'Flood Risk Dashboard',
    icon: Droplets,
    group: 'hazard',
    type: 'Hazard-Specific',
    description: 'Flood signals, basin pressure, corridor vulnerability, river-level thresholds, and district-linked hydrological risk indicators.',
    metrics: 12,
    status: 'Live',
    feeds: ['Water Systems', 'Risk & Monitoring', 'Alerts'],
    route: '/risk-monitoring/flood-flash-flood',
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'landslide-monitoring',
    name: 'Landslide Monitoring',
    icon: Mountain,
    group: 'hazard',
    type: 'Hazard-Specific',
    description: 'Slope instability tracking, debris zones, corridor risk segments, route impact assessment, and slope-stress trend analysis.',
    metrics: 9,
    status: 'Live',
    feeds: ['Risk & Monitoring', 'Route/Closure Systems'],
    route: '/risk-monitoring/landslide-slope',
    color: 'from-amber-600 to-yellow-700',
  },
  {
    id: 'avalanche-winter',
    name: 'Avalanche & Winter Risk',
    icon: Snowflake,
    group: 'hazard',
    type: 'Hazard-Specific',
    description: 'Avalanche danger zones, snow-load stress, winter route closures, high-altitude warnings, and seasonal risk escalation.',
    metrics: 11,
    status: 'Live',
    feeds: ['Risk & Monitoring', 'Shelters & Closures', 'Alerts'],
    route: '/risk-monitoring/avalanche-winter',
    color: 'from-sky-400 to-blue-500',
  },
  {
    id: 'forest-fire',
    name: 'Forest Fire Risk',
    icon: Flame,
    group: 'hazard',
    type: 'Hazard-Specific',
    description: 'Fire danger indices, active fire zones, vegetation stress levels, wind-driven spread potential, and forest-level risk aggregation.',
    metrics: 8,
    status: 'Periodic',
    feeds: ['Risk & Monitoring', 'Alerts', 'Environmental Monitoring'],
    route: '/risk-monitoring/forest-fire',
    color: 'from-orange-500 to-red-600',
  },
  {
    id: 'glacier-cryosphere',
    name: 'Glacier & Cryosphere Risk',
    icon: Mountain,
    group: 'hazard',
    type: 'Hazard-Specific',
    description: 'Glacial melt signals, glacial lake formation risk, cryosphere stress indicators, and downstream hydrological threat linkage.',
    metrics: 6,
    status: 'Analytical',
    feeds: ['Risk & Monitoring', 'Water Systems', 'Satellite Imagery'],
    route: '/risk-monitoring/glacier-cryosphere',
    color: 'from-slate-300 to-blue-400',
  },
  {
    id: 'hydrological-risk',
    name: 'Hydrological Risk',
    icon: Waves,
    group: 'hazard',
    type: 'Hazard-Specific',
    description: 'River basin thresholds, lake overflow risk, watershed stress signals, and catchment-level hydrological monitoring.',
    metrics: 10,
    status: 'Periodic',
    feeds: ['Water Systems', 'Risk & Monitoring', 'Alerts'],
    route: '/risk-monitoring/hydrological-risk',
    color: 'from-teal-500 to-cyan-600',
  },

  // Environmental Escalation
  {
    id: 'air-risk-signals',
    name: 'Air Risk Signals',
    icon: Factory,
    group: 'environmental',
    type: 'Environmental Escalation',
    description: 'Air quality escalation, exposure risk alerts, AQI threshold breaches, and pollution-linked health risk signals. Complements the Air & Noise Monitoring module.',
    metrics: 7,
    status: 'Live',
    feeds: ['Air & Noise Monitoring', 'Alerts', 'Environmental Monitoring'],
    route: '/risk-monitoring/air-pollution',
    color: 'from-gray-500 to-slate-600',
  },
  {
    id: 'environmental-incident',
    name: 'Environmental Incident Risk',
    icon: AlertTriangle,
    group: 'environmental',
    type: 'Environmental Escalation',
    description: 'Field incident aggregation, severity distribution, contamination signals, sewage overflows, fish-kill events, and ecosystem stress indicators.',
    metrics: 14,
    status: 'Live',
    feeds: ['Risk & Monitoring', 'Field Reports', 'Alerts'],
    route: '/risk-monitoring/environmental-incident-risk',
    color: 'from-red-600 to-rose-700',
  },
  {
    id: 'water-quality-escalation',
    name: 'Water Quality Escalation',
    icon: Droplets,
    group: 'environmental',
    type: 'Environmental Escalation',
    description: 'Water quality threshold breaches, contamination events, algal bloom risk signals, and pollution-linked water stress escalation.',
    metrics: 8,
    status: 'Periodic',
    feeds: ['Water Systems', 'Environmental Monitoring', 'Alerts'],
    route: '/risk-monitoring/water-pollution',
    color: 'from-blue-600 to-indigo-600',
  },
  {
    id: 'sewage-wastewater',
    name: 'Sewage & Wastewater Event Dashboard',
    icon: Droplet,
    group: 'environmental',
    type: 'Environmental Escalation',
    description: 'Sewage overflow events, treatment plant stress, wastewater discharge incidents, and lake/river contamination linkage.',
    metrics: 6,
    status: 'Under Expansion',
    feeds: ['Environmental Monitoring', 'Alerts', 'Water Systems'],
    route: '/risk-monitoring/environmental-monitoring',
    color: 'from-emerald-600 to-teal-700',
  },

  // Operational Dashboards
  {
    id: 'incident-response',
    name: 'Incident Response Tracker',
    icon: Activity,
    group: 'operational',
    type: 'Operational',
    description: 'Open incident tracking, response dispatch status, resolution timelines, escalation chains, and field-team operation linkage.',
    metrics: 16,
    status: 'Live',
    feeds: ['Alerts', 'Operations', 'Field Reports'],
    route: '/risk-monitoring/response-operations',
    color: 'from-violet-500 to-purple-600',
  },
  {
    id: 'closures-route-status',
    name: 'Closures & Emergency Route Status',
    icon: Route,
    group: 'operational',
    type: 'Operational',
    description: 'Road closures, shelter availability, emergency route status, alternative access mapping, and winter-season operational state.',
    metrics: 10,
    status: 'Live',
    feeds: ['Risk & Monitoring', 'Shelters & Closures', 'Alerts'],
    route: '/risk-monitoring/shelters-closures-emergency-routes',
    color: 'from-indigo-500 to-blue-600',
  },
  {
    id: 'advisory-timeline',
    name: 'Advisory Timeline',
    icon: Clock,
    group: 'operational',
    type: 'Operational',
    description: 'Advisory issuance history, validity windows, escalation from advisory to warning, and cross-referenced alert linkage.',
    metrics: 8,
    status: 'Periodic',
    feeds: ['Alerts', 'Risk & Monitoring'],
    route: '/risk-monitoring/live-alerts-advisories',
    color: 'from-amber-500 to-yellow-600',
  },
  {
    id: 'field-response-status',
    name: 'Field Response Status',
    icon: Shield,
    group: 'operational',
    type: 'Operational',
    description: 'Infrastructure status overview, resource availability indicators, response capacity assessment, and critical facility stress signals.',
    metrics: 11,
    status: 'Periodic',
    feeds: ['Critical Infrastructure', 'Operations', 'Alerts'],
    route: '/risk-monitoring/critical-infrastructure-response',
    color: 'from-emerald-500 to-green-600',
  },
];

// ─── Group Config ────────────────────────────────────────────────────────────

const GROUP_CONFIG: Record<DashboardGroup, { label: string; badge: string; description: string }> = {
  strategic: {
    label: 'Strategic Overview',
    badge: 'Strategic',
    description: 'System-wide risk synthesis and district-level intelligence aggregation.',
  },
  hazard: {
    label: 'Hazard Dashboards',
    badge: 'Hazard',
    description: 'Hazard-specific monitoring for flood, landslide, avalanche, fire, glacier, and hydrological risks.',
  },
  environmental: {
    label: 'Environmental Escalation',
    badge: 'Environmental',
    description: 'Escalation-facing dashboards for air risk, incident aggregation, water quality, and sewage/wastewater events.',
  },
  operational: {
    label: 'Operational Dashboards',
    badge: 'Operational',
    description: 'Response tracking, closure management, advisory timelines, and field operation status.',
  },
};

// ─── Status Badge Config ─────────────────────────────────────────────────────

const STATUS_COLORS: Record<DashboardStatus, string> = {
  'Live': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Periodic': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Analytical': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  'Under Expansion': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

// ─── Page Component ──────────────────────────────────────────────────────────

export default function DashboardsPage() {
  const router = useRouter();

  // Derived summary metrics
  const liveDashboards = DASHBOARDS.filter(d => d.status === 'Live').length;
  const activeAlerts = riskDashboardStats.totalActiveAlerts;
  const districtsUnderWatch = riskDashboardStats.districtsMonitored;
  const openIncidents = riskDashboardStats.incidentsToday;
  const alertLinkedDashboards = liveDashboards;

  return (
    <main className="min-h-screen bg-slate-950">
      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-20 md:pt-48 pb-12 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/50 via-rose-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <a href="/risk-monitoring" className="hover:text-white transition-colors">Risk & Monitoring</a>
              <span>/</span>
              <span className="text-white font-medium">Risk Analytics</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-2xl">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Risk Analytics</Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Risk <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-400">Dashboards</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-3xl">
              Integrated dashboards for multi-hazard visibility, district risk interpretation, incident response, and evolving environmental risk across Kashmir.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-xl" onClick={() => router.push('/risk-monitoring/live-alerts')}>
                <Bell className="w-5 h-5 mr-2" />Live Alerts
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => router.push('/risk-monitoring')}>Back to Overview</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Top Summary Strip ────────────────────────────────────────────── */}
      <section className="py-10 md:py-14 border-y border-white/5 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {[
              { label: 'Active High-Risk Signals', value: activeAlerts, color: 'text-red-400', icon: AlertTriangle },
              { label: 'Districts Under Watch', value: districtsUnderWatch, color: 'text-amber-400', icon: MapPin },
              { label: 'Open Incidents', value: openIncidents, color: 'text-orange-400', icon: Activity },
              { label: 'Live Alert-Linked Dashboards', value: alertLinkedDashboards, color: 'text-emerald-400', icon: Bell },
              { label: 'Last Updated', value: 'Live', color: 'text-blue-400', icon: Clock, isText: true },
            ].map((stat, idx) => (
              <div key={stat.label} className="text-center">
                <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
                <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-1`}>
                  {stat.isText ? stat.value : stat.value}
                </div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How Dashboards Support the Platform ──────────────────────────── */}
      <section className="py-12 md:py-16 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <Card className="glass-intense border-white/10 p-6">
              <div className="flex items-start gap-4">
                <Layers className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide">System Role</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Risk dashboards synthesize monitoring systems, district profiles, alerts, field reports, and risk interpretation layers to support public visibility, situational awareness, and operational understanding across Kashmir. They serve as the analytical bridge between live signals and structured risk intelligence.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ─── Dashboard Groups ─────────────────────────────────────────────── */}
      {(['strategic', 'hazard', 'environmental', 'operational'] as DashboardGroup[]).map((groupKey, groupIdx) => {
        const group = GROUP_CONFIG[groupKey];
        const groupDashboards = DASHBOARDS.filter(d => d.group === groupKey);

        return (
          <section key={groupKey} className={`py-16 md:py-20 ${groupIdx % 2 === 0 ? 'bg-slate-950' : 'bg-gradient-to-b from-slate-950 to-slate-900'}`}>
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-10"
              >
                <Badge variant="info">{group.badge}</Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-2">
                  {group.label}
                </h2>
                <p className="text-slate-400 max-w-2xl">{group.description}</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {groupDashboards.map((dashboard, i) => (
                  <motion.div
                    key={dashboard.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Card
                      className="glass-intense border-white/10 hover:border-white/20 p-6 cursor-pointer transition-all group flex flex-col h-full"
                      onClick={() => router.push(dashboard.route)}
                    >
                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${dashboard.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                          <dashboard.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors leading-tight">
                              {dashboard.name}
                            </h3>
                          </div>
                          <span className="text-xs text-slate-500 font-medium">{dashboard.type}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-400 leading-relaxed mb-4 flex-grow">
                        {dashboard.description}
                      </p>

                      {/* Meta */}
                      <div className="space-y-3 pt-3 border-t border-white/5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">Metrics</span>
                          <span className="text-xs text-white font-mono">{dashboard.metrics}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-500">Status</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${STATUS_COLORS[dashboard.status]}`}>
                            {dashboard.status}
                          </span>
                        </div>
                        <div>
                          <span className="text-xs text-slate-500 block mb-1">Feeds</span>
                          <div className="flex flex-wrap gap-1">
                            {dashboard.feeds.map((feed) => (
                              <span key={feed} className="text-xs px-1.5 py-0.5 rounded bg-white/5 text-slate-400">
                                {feed}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center text-xs font-medium text-red-400 group-hover:text-red-300 transition-colors mt-4 pt-3 border-t border-white/5">
                        <span>Open Dashboard</span>
                        <ExternalLink className="w-3 h-3 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* ─── Alert Trend Chart ────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-6 h-6 text-red-400" />
              <h2 className="text-2xl font-bold text-white">Alert Trend (Last 7 Days)</h2>
            </div>
            <p className="text-sm text-slate-400">Daily active alert count showing trend direction across the monitoring week.</p>
          </motion.div>
          <Card className="glass-intense border-white/10 p-6">
            <div className="h-64 flex items-end justify-around gap-2">
              {riskDashboardStats.trendData.alertsLast7Days.map((count, idx) => {
                const max = Math.max(...riskDashboardStats.trendData.alertsLast7Days);
                const height = (count / max) * 100;
                const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="text-xs text-slate-400 mb-1">{count}</div>
                    <div
                      className="w-full bg-gradient-to-t from-red-500 to-orange-500 rounded-t transition-all hover:from-red-400 hover:to-orange-400"
                      style={{ height: `${height}%` }}
                    />
                    <div className="text-xs text-slate-500">{days[idx]}</div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </section>

      {/* ─── Incident Volume Chart ────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-2">
              <Activity className="w-6 h-6 text-violet-400" />
              <h2 className="text-2xl font-bold text-white">Incident Volume (Last 7 Days)</h2>
            </div>
            <p className="text-sm text-slate-400">Daily incident count showing field reporting activity and response load.</p>
          </motion.div>
          <Card className="glass-intense border-white/10 p-6">
            <div className="h-64 flex items-end justify-around gap-2">
              {riskDashboardStats.trendData.incidentsLast7Days.map((count, idx) => {
                const max = Math.max(...riskDashboardStats.trendData.incidentsLast7Days);
                const height = (count / max) * 100;
                const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                    <div className="text-xs text-slate-400 mb-1">{count}</div>
                    <div
                      className="w-full bg-gradient-to-t from-violet-500 to-purple-500 rounded-t transition-all hover:from-violet-400 hover:to-purple-400"
                      style={{ height: `${height}%` }}
                    />
                    <div className="text-xs text-slate-500">{days[idx]}</div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────────────────────────── */}
      <AdvancedFooter />
    </main>
  );
}
