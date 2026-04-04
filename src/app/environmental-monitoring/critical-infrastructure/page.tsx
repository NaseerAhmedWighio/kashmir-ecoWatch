'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Building2, Map, BarChart3, ChevronRight, AlertTriangle,
  FileText, ArrowRight, Activity, Clock,
  MapPin, ExternalLink, Wrench,
  AlertCircle, Droplets, Construction, Factory, Database
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const assetProfileCards = [
  {
    name: 'Telbal Intake Point',
    type: 'Intake Point',
    location: 'Telbal, Srinagar',
    district: 'Srinagar',
    condition: 'Fair',
    conditionVariant: 'warning' as const,
    vulnerability: 'Sedimentation buildup',
    vulnerabilityVariant: 'warning' as const,
    maintenanceStatus: 'Scheduled',
    lastInspection: '5 days ago',
    icon: Droplets,
  },
  {
    name: 'Zadibal Pumping Station',
    type: 'Pumping Station',
    location: 'Zadibal, Srinagar',
    district: 'Srinagar',
    condition: 'Poor',
    conditionVariant: 'danger' as const,
    vulnerability: 'Aging pump motors — 25+ yrs',
    vulnerabilityVariant: 'danger' as const,
    maintenanceStatus: 'Overdue',
    lastInspection: '3 weeks ago',
    icon: Factory,
  },
  {
    name: 'Nowgam Treatment Plant',
    type: 'Treatment Plant',
    location: 'Nowgam, Srinagar',
    district: 'Srinagar',
    condition: 'Good',
    conditionVariant: 'success' as const,
    vulnerability: 'Chemical supply chain risk',
    vulnerabilityVariant: 'monitoring' as const,
    maintenanceStatus: 'Current',
    lastInspection: '2 days ago',
    icon: Factory,
  },
  {
    name: 'Anantnag Reservoir',
    type: 'Reservoir',
    location: 'Anantnag town',
    district: 'Anantnag',
    condition: 'Fair',
    conditionVariant: 'warning' as const,
    vulnerability: 'Structural seepage detected',
    vulnerabilityVariant: 'warning' as const,
    maintenanceStatus: 'In Progress',
    lastInspection: '1 week ago',
    icon: Database,
  },
  {
    name: 'Baramulla Storage System',
    type: 'Storage System',
    location: 'Baramulla urban',
    district: 'Baramulla',
    condition: 'Good',
    conditionVariant: 'success' as const,
    vulnerability: 'Low — recent upgrade',
    vulnerabilityVariant: 'stable' as const,
    maintenanceStatus: 'Current',
    lastInspection: '3 days ago',
    icon: Database,
  },
  {
    name: 'Srinagar Main Supply Node',
    type: 'Supply Node',
    location: 'Rajbagh, Srinagar',
    district: 'Srinagar',
    condition: 'Critical',
    conditionVariant: 'critical' as const,
    vulnerability: 'Pipeline corrosion — failure risk',
    vulnerabilityVariant: 'danger' as const,
    maintenanceStatus: 'Emergency',
    lastInspection: '1 day ago',
    icon: Construction,
  },
];

const districtInfrastructureData = [
  { district: 'Srinagar', totalAssets: 47, criticalAssets: 8, goodCondition: 22, fairCondition: 14, poorCondition: 8, criticalCondition: 3, maintenanceStatus: '72% current' },
  { district: 'Anantnag', totalAssets: 28, criticalAssets: 4, goodCondition: 12, fairCondition: 9, poorCondition: 5, criticalCondition: 2, maintenanceStatus: '65% current' },
  { district: 'Baramulla', totalAssets: 31, criticalAssets: 3, goodCondition: 18, fairCondition: 8, poorCondition: 4, criticalCondition: 1, maintenanceStatus: '78% current' },
  { district: 'Pulwama', totalAssets: 22, criticalAssets: 5, goodCondition: 8, fairCondition: 7, poorCondition: 5, criticalCondition: 2, maintenanceStatus: '58% current' },
  { district: 'Budgam', totalAssets: 19, criticalAssets: 2, goodCondition: 10, fairCondition: 5, poorCondition: 3, criticalCondition: 1, maintenanceStatus: '68% current' },
  { district: 'Ganderbal', totalAssets: 24, criticalAssets: 3, goodCondition: 13, fairCondition: 7, poorCondition: 3, criticalCondition: 1, maintenanceStatus: '71% current' },
  { district: 'Kupwara', totalAssets: 16, criticalAssets: 1, goodCondition: 10, fairCondition: 4, poorCondition: 2, criticalCondition: 0, maintenanceStatus: '81% current' },
  { district: 'Shopian', totalAssets: 13, criticalAssets: 2, goodCondition: 6, fairCondition: 4, poorCondition: 2, criticalCondition: 1, maintenanceStatus: '62% current' },
];

const highRiskFailurePoints = [
  {
    title: 'Zadibal Pump Motor Failure Cascade',
    location: 'Zadibal, Srinagar',
    risk: 'Critical',
    riskVariant: 'critical' as const,
    impact: '18 MLD capacity at risk — 250K+ population',
    scenario: 'Three of five pump motors showing bearing degradation. Complete failure within 60–90 days without replacement.',
    icon: AlertTriangle,
    lastAssessment: '3 days ago',
  },
  {
    title: 'Telbal Intake Sedimentation Blockage',
    location: 'Telbal, Srinagar',
    risk: 'High',
    riskVariant: 'danger' as const,
    impact: 'Primary water source for Srinagar network',
    scenario: 'Accelerated silt deposition reducing intake capacity by 22%. Dredging overdue. Monsoon sediment spike expected.',
    icon: AlertCircle,
    lastAssessment: '1 week ago',
  },
  {
    title: 'Anantnag Reservoir Structural Degradation',
    location: 'Anantnag town',
    risk: 'High',
    riskVariant: 'danger' as const,
    impact: '5 ML storage — town-wide supply disruption',
    scenario: 'Seepage detected in north wall. Structural integrity declining. Emergency repair recommended before monsoon.',
    icon: Building2,
    lastAssessment: '5 days ago',
  },
  {
    title: 'Pulwama Pipeline Corrosion — Main Artery',
    location: 'Pulwama district network',
    risk: 'Critical',
    riskVariant: 'critical' as const,
    impact: 'Main supply artery — 80K+ population',
    scenario: 'CI pipe section from 1980s showing advanced corrosion. 3 leak points in past month. Catastrophic rupture risk.',
    icon: Construction,
    lastAssessment: '2 days ago',
  },
];

const recentIncidents = [
  { type: 'Pump Motor Overheating', location: 'Zadibal Station B, Srinagar', severity: 'Critical', time: '2h ago', verified: true },
  { type: 'Intake Blockage Detected', location: 'Telbal intake channel', severity: 'High', time: '6h ago', verified: true },
  { type: 'Reservoir Seepage Increased', location: 'Anantnag main reservoir', severity: 'High', time: '12h ago', verified: true },
  { type: 'Pipeline Leak — Section 7', location: 'Pulwama main artery', severity: 'Critical', time: '1 day ago', verified: true },
  { type: 'Valve Failure', location: 'Budgam distribution node', severity: 'Moderate', time: '2 days ago', verified: false },
];

export default function CriticalInfrastructurePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-48 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/30 via-blue-900/20 to-slate-950" />
        <div className="absolute inset-0 bg-grid opacity-10" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <button onClick={() => router.push('/')} className="hover:text-white transition-colors">Home</button>
              <ChevronRight className="w-4 h-4" />
              <button onClick={() => router.push('/environmental-monitoring')} className="hover:text-white transition-colors">Environmental Monitoring</button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">Critical Infrastructure</span>
            </nav>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-2xl">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Asset Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Critical Water <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-blue-400">Infrastructure</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Monitoring water infrastructure assets — intake points, pumping stations, treatment plants,
              reservoirs, storage systems, and supply nodes across Kashmir&apos;s water supply network
            </p>
          </motion.div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { label: 'Total Assets Tracked', value: '200', sub: 'Kashmir Valley', color: 'text-indigo-400' },
              { label: 'Critical Condition', value: '11', sub: 'Immediate action', color: 'text-red-400' },
              { label: 'Maintenance Overdue', value: '34', sub: 'Across districts', color: 'text-amber-400' },
              { label: 'Failure Risk Points', value: '4', sub: 'High-priority', color: 'text-orange-400' },
              { label: 'Avg Asset Health', value: '71%', sub: 'Kashmir avg', color: 'text-emerald-400' },
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

      {/* Asset Map Preview */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 overflow-hidden">
            <div className="p-6 flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Map className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-white">Asset Map — Real-Time Preview</h3>
              </div>
              <Button size="sm" variant="outline" className="border-white/20 text-white" onClick={() => router.push('/environmental-monitoring/dashboards')}>
                <BarChart3 className="w-4 h-4 mr-2" />
                Open Dashboard
              </Button>
            </div>
            <div className="h-80 bg-gradient-to-br from-indigo-900/20 to-blue-900/10 flex items-center justify-center border-t border-white/5">
              <div className="text-center">
                <Map className="w-14 h-14 text-indigo-800 mx-auto mb-3" />
                <p className="text-slate-400 text-sm mb-1">Interactive infrastructure asset map with condition and risk layers</p>
                <p className="text-slate-500 text-xs">Intake points • Pumping stations • Treatment plants • Reservoirs • Storage • Supply nodes</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Asset Profile Cards */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Asset Profile Cards</h2>
            <p className="text-slate-400">Key infrastructure assets with condition, vulnerability, and maintenance status</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {assetProfileCards.map((asset, i) => (
              <motion.div key={asset.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow flex-shrink-0">
                        <asset.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">{asset.name}</h3>
                        <p className="text-xs text-slate-400">{asset.type}</p>
                      </div>
                    </div>
                    <Badge variant={asset.conditionVariant} size="sm">{asset.condition}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span>{asset.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Vulnerability</span>
                      <Badge variant={asset.vulnerabilityVariant} size="sm">{asset.vulnerability}</Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Wrench className="w-3 h-3" />
                        <span>Maintenance</span>
                      </div>
                      <span className={`font-medium ${
                        asset.maintenanceStatus === 'Current' ? 'text-emerald-400' :
                        asset.maintenanceStatus === 'Scheduled' ? 'text-blue-400' :
                        asset.maintenanceStatus === 'In Progress' ? 'text-amber-400' :
                        asset.maintenanceStatus === 'Overdue' ? 'text-red-400' :
                        'text-red-500'
                      }`}>
                        {asset.maintenanceStatus}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Last inspection</span>
                      <span>{asset.lastInspection}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* District Infrastructure Profiles */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <Map className="w-6 h-6 text-indigo-400" />
              District Infrastructure Profiles
            </h2>
            <p className="text-slate-400">Asset count, critical asset distribution, and maintenance status by district</p>
          </motion.div>

          <Card className="glass-intense border-white/10 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">District</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Assets</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Critical Assets</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Good</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Fair</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Poor</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Critical</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Maintenance</th>
                </tr>
              </thead>
              <tbody>
                {districtInfrastructureData.map((d, i) => (
                  <motion.tr
                    key={d.district}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <span className="text-white font-medium">{d.district}</span>
                    </td>
                    <td className="py-3 px-4 text-center text-slate-300 font-bold">{d.totalAssets}</td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant={d.criticalAssets >= 5 ? 'danger' : d.criticalAssets >= 3 ? 'warning' : 'success'} size="sm">
                        {d.criticalAssets}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-center text-emerald-400">{d.goodCondition}</td>
                    <td className="py-3 px-4 text-center text-amber-400">{d.fairCondition}</td>
                    <td className="py-3 px-4 text-center text-orange-400">{d.poorCondition}</td>
                    <td className="py-3 px-4 text-center text-red-400">{d.criticalCondition}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`text-xs font-medium ${
                        parseInt(d.maintenanceStatus) >= 75 ? 'text-emerald-400' :
                        parseInt(d.maintenanceStatus) >= 65 ? 'text-amber-400' :
                        'text-red-400'
                      }`}>
                        {d.maintenanceStatus}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </section>

      {/* High-Risk Failure Points */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              High-Risk Failure Points
            </h2>
            <p className="text-slate-400">Critical infrastructure failure scenarios requiring immediate intervention</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {highRiskFailurePoints.map((point, i) => (
              <motion.div key={point.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500/20 to-orange-600/20 flex items-center justify-center">
                        <point.icon className="w-5 h-5 text-red-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white group-hover:text-red-300 transition-colors">{point.title}</h3>
                        <p className="text-xs text-slate-400">{point.impact}</p>
                      </div>
                    </div>
                    <Badge variant={point.riskVariant} size="sm">{point.risk}</Badge>
                  </div>
                  <p className="text-xs text-slate-400 mb-3 leading-relaxed">{point.scenario}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <MapPin className="w-3 h-3" />
                      <span>{point.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      <span>Assessed {point.lastAssessment}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Asset Condition Summary */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <Activity className="w-6 h-6 text-indigo-400" />
              Asset Condition Summary
            </h2>
            <p className="text-slate-400">Distribution of asset health across all tracked infrastructure</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Good', count: 99, percentage: '50%', color: 'text-emerald-400', bg: 'bg-emerald-400', borderColor: 'border-emerald-400/20' },
              { label: 'Fair', count: 58, percentage: '29%', color: 'text-amber-400', bg: 'bg-amber-400', borderColor: 'border-amber-400/20' },
              { label: 'Poor', count: 32, percentage: '16%', color: 'text-orange-400', bg: 'bg-orange-400', borderColor: 'border-orange-400/20' },
              { label: 'Critical', count: 11, percentage: '5%', color: 'text-red-400', bg: 'bg-red-400', borderColor: 'border-red-400/20' },
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className={`glass-intense ${item.borderColor} hover:${item.borderColor.replace('/20', '/40')} transition-all p-5 text-center`}>
                  <div className={`text-4xl font-black ${item.color} mb-2`}>{item.count}</div>
                  <div className="text-sm text-slate-400 mb-1">{item.label}</div>
                  <div className="text-xs text-slate-500 mb-3">{item.percentage} of total</div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.bg}`}
                      style={{ width: item.percentage }}
                    />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Incident / Maintenance Status Feed */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <FileText className="w-6 h-6 text-indigo-400" />
              Incident &amp; Maintenance Feed
            </h2>
            <p className="text-slate-400">Recent infrastructure incidents and maintenance activity</p>
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
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-white font-medium">{r.type}</span>
                      {r.verified ? (
                        <Badge variant="success" size="sm" className="text-xs">Verified</Badge>
                      ) : (
                        <Badge variant="warning" size="sm" className="text-xs">Pending</Badge>
                      )}
                    </div>
                    <Badge variant={r.severity === 'Critical' ? 'critical' : r.severity === 'High' ? 'danger' : 'warning'} size="sm" className="text-xs">
                      {r.severity}
                    </Badge>
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
              { label: 'Drinking Water', href: '/environmental-monitoring/drinking-water', desc: 'Potable water quality & supply', icon: ExternalLink, color: 'from-cyan-500 to-teal-600' },
              { label: 'Sewage & Wastewater', href: '/environmental-monitoring/sewage-wastewater', desc: 'Overflow and discharge monitoring', icon: ExternalLink, color: 'from-blue-500 to-cyan-600' },
              { label: 'Water Systems', href: '/water-systems', desc: 'Complete hydrological intelligence', icon: ExternalLink, color: 'from-indigo-500 to-blue-600' },
              { label: 'Dashboards', href: '/environmental-monitoring/dashboards', desc: 'District comparison & stress maps', icon: ExternalLink, color: 'from-violet-500 to-purple-600' },
            ].map((link, i) => (
              <motion.div key={link.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group" onClick={() => router.push(link.href)}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center shadow flex-shrink-0`}>
                      <link.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">{link.label}</h3>
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
