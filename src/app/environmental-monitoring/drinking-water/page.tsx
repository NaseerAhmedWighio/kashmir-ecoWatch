'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Droplets, Map, BarChart3, ChevronRight, AlertTriangle,
  FileText, ArrowRight, Activity, Clock,
  MapPin, ExternalLink, FlaskConical,
  CloudRain, AlertCircle, Pipette, Waves, Factory
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const districtWaterCards = [
  {
    district: 'Srinagar',
    alertCount: 12,
    qualityStatus: 'Moderate',
    qualityVariant: 'warning' as const,
    serviceReliability: '78%',
    reliabilityVariant: 'warning' as const,
    supplyDisruptions: 4,
    treatmentIssues: 2,
    sourceVulnerability: 'Groundwater + Jhelum abstraction',
  },
  {
    district: 'Anantnag',
    alertCount: 8,
    qualityStatus: 'Moderate',
    qualityVariant: 'warning' as const,
    serviceReliability: '72%',
    reliabilityVariant: 'warning' as const,
    supplyDisruptions: 3,
    treatmentIssues: 1,
    sourceVulnerability: 'Spring-fed system stress',
  },
  {
    district: 'Baramulla',
    alertCount: 6,
    qualityStatus: 'Good',
    qualityVariant: 'success' as const,
    serviceReliability: '85%',
    reliabilityVariant: 'success' as const,
    supplyDisruptions: 2,
    treatmentIssues: 0,
    sourceVulnerability: 'Surface water seasonal variability',
  },
  {
    district: 'Pulwama',
    alertCount: 10,
    qualityStatus: 'Poor',
    qualityVariant: 'danger' as const,
    serviceReliability: '61%',
    reliabilityVariant: 'danger' as const,
    supplyDisruptions: 5,
    treatmentIssues: 3,
    sourceVulnerability: 'Groundwater depletion + contamination',
  },
  {
    district: 'Kupwara',
    alertCount: 4,
    qualityStatus: 'Good',
    qualityVariant: 'success' as const,
    serviceReliability: '88%',
    reliabilityVariant: 'success' as const,
    supplyDisruptions: 1,
    treatmentIssues: 0,
    sourceVulnerability: 'Remote spring systems — limited monitoring',
  },
  {
    district: 'Ganderbal',
    alertCount: 7,
    qualityStatus: 'Moderate',
    qualityVariant: 'warning' as const,
    serviceReliability: '74%',
    reliabilityVariant: 'warning' as const,
    supplyDisruptions: 3,
    treatmentIssues: 1,
    sourceVulnerability: 'Sind River abstraction + seasonal turbidity',
  },
];

const qualityIndicators = [
  { parameter: 'pH', value: '6.8–7.4', status: 'Normal', variant: 'success' as const, icon: Pipette, desc: 'Within WHO acceptable range (6.5–8.5)' },
  { parameter: 'Turbidity', value: '3.2 NTU', status: 'Elevated', variant: 'warning' as const, icon: CloudRain, desc: 'Above 1 NTU threshold in 4 districts' },
  { parameter: 'Coliform Count', value: '18 CFU/100mL', status: 'Contaminated', variant: 'danger' as const, icon: AlertCircle, desc: 'Exceeds 0 CFU standard — Srinagar, Pulwama' },
  { parameter: 'Residual Chlorine', value: '0.3 mg/L', status: 'Low', variant: 'warning' as const, icon: FlaskConical, desc: 'Below 0.5 mg/L minimum in supply network' },
  { parameter: 'Dissolved Oxygen', value: '5.8 mg/L', status: 'Acceptable', variant: 'success' as const, icon: Activity, desc: 'Within acceptable range for drinking water' },
  { parameter: 'Fluoride', value: '0.9 mg/L', status: 'Normal', variant: 'success' as const, icon: FlaskConical, desc: 'Within 1.0 mg/L WHO guideline' },
];

const sourceLinkedAdvisories = [
  {
    title: 'Spring-Fed System Stress — South Kashmir',
    source: 'Springs & Groundwater',
    status: 'Active',
    desc: 'Reduced spring discharge observed across Anantnag and Pulwama belts. 23 springs showing >30% flow reduction compared to 5-year average. Communities advised to implement water conservation measures.',
    issued: '2 days ago',
    icon: CloudRain,
  },
  {
    title: 'Groundwater Depletion — Urban Corridors',
    source: 'Aquifer Monitoring',
    status: 'Monitoring',
    desc: 'Water table decline of 1.2m/year detected in Srinagar urban zone. Borewell dependency increasing. Artificial recharge zones recommended.',
    issued: '5 days ago',
    icon: Droplets,
  },
  {
    title: 'Surface Water Contamination Risk — Jhelum Basin',
    source: 'River Water Quality',
    status: 'Advisory',
    desc: 'Elevated turbidity and bacterial load in Jhelum raw water intakes during monsoon. Enhanced treatment protocols recommended for downstream supply systems.',
    issued: '1 week ago',
    icon: Waves,
  },
  {
    title: 'Treatment Plant Chemical Dosing Alert',
    source: 'Infrastructure Operations',
    status: 'Active',
    desc: 'Residual chlorine levels below standard across 4 district networks. Review of chemical dosing rates and contact time required at treatment facilities.',
    issued: '3 days ago',
    icon: Factory,
  },
];

const communityReports = [
  {
    title: 'Discolored Water Supply — Rajbagh, Srinagar',
    type: 'Contamination',
    severity: 'danger' as const,
    location: 'Rajbagh, Srinagar',
    time: '6h ago',
    verified: true,
    desc: 'Residents report brown discoloration and metallic taste in morning supply. Sample collected for laboratory analysis.',
  },
  {
    title: 'Supply Disruption — Kakapora, Pulwama',
    type: 'Supply Issue',
    severity: 'warning' as const,
    location: 'Kakapora, Pulwama',
    time: '12h ago',
    verified: true,
    desc: 'Intermittent supply for past 3 days. Pipeline damage suspected. Alternative water tankers deployed.',
  },
  {
    title: 'Odor Complaint — Lal Chowkar, Anantnag',
    type: 'Contamination',
    severity: 'warning' as const,
    location: 'Lal Chowk, Anantnag',
    time: '1 day ago',
    verified: false,
    desc: 'Chlorine-like odor reported in treated water supply. Investigation underway to verify dosing levels.',
  },
  {
    title: 'Spring Water Quality — Tral, Pulwama',
    type: 'Contamination',
    severity: 'danger' as const,
    location: 'Tral, Pulwama',
    time: '2 days ago',
    verified: true,
    desc: 'Coliform contamination detected in community spring water source. Boil advisory issued for 120 households.',
  },
  {
    title: 'Low Pressure — Soura, Srinagar',
    type: 'Supply Issue',
    severity: 'monitoring' as const,
    location: 'Soura, Srinagar',
    time: '3 days ago',
    verified: true,
    desc: 'Consistent low pressure in distribution network. Possible subsurface leak or pump underperformance.',
  },
];

const recentIncidents = [
  { type: 'Coliform Exceedance', location: 'Rajbagh supply zone, Srinagar', severity: 'Critical', time: '6h ago', verified: true },
  { type: 'Turbidity Spike', location: 'Ganderbal treatment plant', severity: 'High', time: '8h ago', verified: true },
  { type: 'Pipeline Rupture', location: 'Kakapora main line, Pulwama', severity: 'Critical', time: '12h ago', verified: true },
  { type: 'Chlorine Dosing Low', location: 'Baramulla district network', severity: 'Moderate', time: '1 day ago', verified: true },
  { type: 'Spring Contamination', location: 'Tral community spring, Pulwama', severity: 'Critical', time: '2 days ago', verified: true },
];

export default function DrinkingWaterPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-48 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-teal-900/20 to-slate-950" />
        <div className="absolute inset-0 bg-grid opacity-10" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <button onClick={() => router.push('/')} className="hover:text-white transition-colors">Home</button>
              <ChevronRight className="w-4 h-4" />
              <button onClick={() => router.push('/environmental-monitoring')} className="hover:text-white transition-colors">Environmental Monitoring</button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">Drinking Water</span>
            </nav>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center shadow-2xl">
                <Droplets className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Water Supply Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Drinking <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-400">Water</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Monitoring drinking water quality, supply reliability, contamination events,
              and source vulnerability across Kashmir&apos;s district water supply networks
            </p>
          </motion.div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { label: 'Active Alerts', value: '47', sub: 'Last 24 hours', color: 'text-cyan-400' },
              { label: 'Districts Monitored', value: '6', sub: 'Kashmir Valley', color: 'text-teal-400' },
              { label: 'Quality Samples', value: '284', sub: 'This week', color: 'text-slate-300' },
              { label: 'Supply Disruptions', value: '18', sub: 'Active incidents', color: 'text-amber-400' },
              { label: 'Avg Reliability', value: '76%', sub: 'Kashmir avg', color: 'text-emerald-400' },
            ].map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }} className="text-center">
                <div className={`text-3xl md:text-4xl font-bold ${m.color} mb-1`}>{m.value}</div>
                <div className="text-sm text-slate-400">{m.label}</div>
                <div className="text-xs text-slate-500">{m.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Preview */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 overflow-hidden">
            <div className="p-6 flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Map className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">District Water Quality Map</h3>
              </div>
              <Button size="sm" variant="outline" className="border-white/20 text-white" onClick={() => router.push('/environmental-monitoring/dashboards')}>
                <BarChart3 className="w-4 h-4 mr-2" />
                Open Dashboard
              </Button>
            </div>
            <div className="h-80 bg-gradient-to-br from-cyan-900/20 to-teal-900/10 flex items-center justify-center border-t border-white/5">
              <div className="text-center">
                <Map className="w-14 h-14 text-cyan-800 mx-auto mb-3" />
                <p className="text-slate-400 text-sm mb-1">Interactive drinking water quality map with district-level monitoring</p>
                <p className="text-slate-500 text-xs">Quality stations • Supply networks • Contamination points • Source locations</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* District Water Alert Cards */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">District Water Alert Matrix</h2>
            <p className="text-slate-400">Active alert count, quality status, and service reliability by district</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {districtWaterCards.map((card, i) => (
              <motion.div key={card.district} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center shadow flex-shrink-0">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">{card.district}</h3>
                        <p className="text-xs text-slate-400">{card.alertCount} active alerts</p>
                      </div>
                    </div>
                    <Badge variant={card.qualityVariant} size="sm">{card.qualityStatus}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Service Reliability</span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              parseInt(card.serviceReliability) >= 80 ? 'bg-emerald-400' : parseInt(card.serviceReliability) >= 70 ? 'bg-amber-400' : 'bg-red-400'
                            }`}
                            style={{ width: `${card.serviceReliability}` }}
                          />
                        </div>
                        <Badge variant={card.reliabilityVariant} size="sm">{card.serviceReliability}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Supply Disruptions</span>
                      <span className="text-slate-300 font-medium">{card.supplyDisruptions} events</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Treatment Issues</span>
                      <span className={card.treatmentIssues > 0 ? 'text-amber-400 font-medium' : 'text-emerald-400 font-medium'}>{card.treatmentIssues}</span>
                    </div>
                    <div className="pt-2 border-t border-white/5">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <AlertTriangle className="w-3 h-3 text-amber-400 flex-shrink-0" />
                        <span>{card.sourceVulnerability}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Indicators */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <FlaskConical className="w-6 h-6 text-teal-400" />
              Water Quality Indicators
            </h2>
            <p className="text-slate-400">Key physico-chemical parameters and contamination status</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {qualityIndicators.map((indicator, i) => (
              <motion.div key={indicator.parameter} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center">
                        <indicator.icon className="w-4 h-4 text-teal-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">{indicator.parameter}</h3>
                        <p className="text-lg font-black text-teal-300">{indicator.value}</p>
                      </div>
                    </div>
                    <Badge variant={indicator.variant} size="sm">{indicator.status}</Badge>
                  </div>
                  <p className="text-xs text-slate-400">{indicator.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Source-Linked Advisories */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <CloudRain className="w-6 h-6 text-cyan-400" />
              Source-Linked Advisories
            </h2>
            <p className="text-slate-400">Spring-fed system stress, groundwater depletion, and surface water contamination</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sourceLinkedAdvisories.map((advisory, i) => (
              <motion.div key={advisory.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-teal-600/20 flex items-center justify-center">
                        <advisory.icon className="w-4 h-4 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">{advisory.title}</h3>
                        <p className="text-xs text-slate-500">{advisory.source}</p>
                      </div>
                    </div>
                    <Badge variant={advisory.status === 'Active' ? 'danger' : advisory.status === 'Monitoring' ? 'warning' : 'info'} size="sm">
                      {advisory.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400 mb-3 leading-relaxed">{advisory.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Issued: {advisory.issued}</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Reports */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <FileText className="w-6 h-6 text-cyan-400" />
              Community Reports
            </h2>
            <p className="text-slate-400">Recent contamination and supply disruption reports from residents</p>
          </motion.div>

          <Card className="glass-intense border-white/10 p-5">
            <div className="space-y-4">
              {communityReports.map((report, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="py-3 border-b border-white/5 last:border-0 last:pb-0"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white font-medium">{report.title}</span>
                      {report.verified ? (
                        <Badge variant="success" size="sm" className="text-xs">Verified</Badge>
                      ) : (
                        <Badge variant="warning" size="sm" className="text-xs">Pending</Badge>
                      )}
                    </div>
                    <Badge variant={report.severity} size="sm" className="text-xs">{report.type}</Badge>
                  </div>
                  <p className="text-xs text-slate-400 mb-1.5">{report.desc}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{report.location}</span>
                    </div>
                    <span className="text-slate-600">|</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{report.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Recent Incident Feed */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              Recent Drinking Water Incidents
            </h2>
            <p className="text-slate-400">Latest verified contamination and supply failure events</p>
          </motion.div>

          <Card className="glass-intense border-white/10 p-5">
            <div className="space-y-4">
              {recentIncidents.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="py-3 border-b border-white/5 last:border-0 last:pb-0"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-white font-medium">{r.type}</span>
                    <div className="flex items-center gap-2">
                      {r.verified ? (
                        <Badge variant="success" size="sm" className="text-xs">Verified</Badge>
                      ) : (
                        <Badge variant="warning" size="sm" className="text-xs">Pending</Badge>
                      )}
                      <Badge variant={r.severity === 'Critical' ? 'critical' : r.severity === 'High' ? 'danger' : 'warning'} size="sm" className="text-xs">
                        {r.severity}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{r.location}</span>
                    </div>
                    <span className="text-slate-600">|</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{r.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Related Actions</h2>
            <p className="text-slate-400">Explore connected water and environmental monitoring domains</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Critical Water Infrastructure', href: '/environmental-monitoring/critical-infrastructure', desc: 'Intake points, treatment plants, reservoirs', icon: ExternalLink, color: 'from-indigo-500 to-blue-600' },
              { label: 'Sewage & Wastewater', href: '/environmental-monitoring/sewage-wastewater', desc: 'Overflow and discharge monitoring', icon: ExternalLink, color: 'from-blue-500 to-cyan-600' },
              { label: 'Environmental Health', href: '/environmental-monitoring/environmental-health', desc: 'Health signal monitoring', icon: ExternalLink, color: 'from-amber-500 to-orange-600' },
              { label: 'Water Systems', href: '/water-systems', desc: 'Complete hydrological intelligence', icon: ExternalLink, color: 'from-cyan-500 to-teal-600' },
            ].map((link, i) => (
              <motion.div key={link.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group" onClick={() => router.push(link.href)}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center shadow flex-shrink-0`}>
                      <link.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">{link.label}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{link.desc}</p>
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
