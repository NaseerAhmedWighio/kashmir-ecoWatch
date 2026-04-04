'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Leaf, Map, BarChart3, Eye, ChevronRight, AlertTriangle,
  Droplets, Wind, MapPin, TrendingUp, Shield, ExternalLink,
  Clock, FileText, ArrowRight, Activity, Skull, Factory
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const exposureRiskCards = [
  {
    title: 'Slaughter Waste Accumulation',
    zone: 'Zadibal, Srinagar',
    district: 'Srinagar',
    riskLevel: 'critical' as const,
    verified: true,
    waterLinkage: 'Connected to Brari Nambal outflow',
    odorReports: 23,
    icon: Skull,
    description: 'Unprocessed slaughterhouse organic waste near residential zones',
  },
  {
    title: 'Market Organic Waste Zone',
    zone: 'Lal Chowk Market Periphery',
    district: 'Srinagar',
    riskLevel: 'high' as const,
    verified: true,
    waterLinkage: 'Runoff into Khushal Sar lake',
    odorReports: 18,
    icon: Factory,
    description: 'Decomposing vegetable and fruit waste from wholesale market',
  },
  {
    title: 'Decomposition Near Settlements',
    zone: 'Nowhatta Ward',
    district: 'Srinagar',
    riskLevel: 'high' as const,
    verified: true,
    waterLinkage: 'Adjacent to underground water table',
    odorReports: 31,
    icon: Wind,
    description: 'Mixed organic decomposition within 200m of dense habitation',
  },
  {
    title: 'Fish Market Bio-Waste',
    zone: 'Tral Fish Market',
    district: 'Pulwama',
    riskLevel: 'moderate' as const,
    verified: false,
    waterLinkage: 'Direct discharge to Arapath stream',
    odorReports: 9,
    icon: Droplets,
    description: 'Daily organic fish waste without proper containment',
  },
  {
    title: 'Agricultural Residue Burn Zone',
    zone: 'Sopore Orchards',
    district: 'Baramulla',
    riskLevel: 'moderate' as const,
    verified: true,
    waterLinkage: 'Runoff enters Jhelum tributaries',
    odorReports: 7,
    icon: AlertTriangle,
    description: 'Seasonal crop and orchard waste with incomplete decomposition',
  },
];

const waterContaminationData = [
  {
    waterBody: 'Dal Lake — Nigeen Basin',
    proximity: '120m from nearest bio-waste source',
    pathway: 'Surface runoff during precipitation events',
    riskLevel: 'high' as const,
    verified: true,
    lastAssessment: '2d ago',
  },
  {
    waterBody: 'Brari Nambal Outflow',
    proximity: 'Direct discharge point identified',
    pathway: 'Municipal drain carrying slaughter waste effluent',
    riskLevel: 'critical' as const,
    verified: true,
    lastAssessment: '1d ago',
  },
  {
    waterBody: 'Khushal Sar Lake',
    proximity: '300m from market waste zone',
    pathway: 'Leachate migration through soil layers',
    riskLevel: 'moderate' as const,
    verified: false,
    lastAssessment: '5d ago',
  },
  {
    waterBody: 'Arapath Stream, Pulwama',
    proximity: 'Adjacent to fish market',
    pathway: 'Direct organic waste discharge',
    riskLevel: 'high' as const,
    verified: true,
    lastAssessment: '3d ago',
  },
  {
    waterBody: 'Jhelum — Sopore Stretch',
    proximity: '450m from agricultural residue zone',
    pathway: 'Seasonal monsoon wash-off from orchards',
    riskLevel: 'low' as const,
    verified: true,
    lastAssessment: '1w ago',
  },
];

const verificationSummary = {
  total: 47,
  verified: 34,
  pending: 13,
  verifiedPercent: 72,
};

const recentReports = [
  { type: 'Slaughter Waste Discharge', location: 'Zadibal drain, Srinagar', severity: 'Critical', time: '1h ago', verified: true },
  { type: 'Market Organic Waste', location: 'Lal Chowk periphery, Srinagar', severity: 'High', time: '4h ago', verified: true },
  { type: 'Decomposition Odor Nuisance', location: 'Nowhatta residential ward', severity: 'High', time: '6h ago', verified: true },
  { type: 'Fish Market Runoff', location: 'Tral, Pulwama', severity: 'Moderate', time: '10h ago', verified: false },
  { type: 'Agricultural Residue', location: 'Sopore orchard belt, Baramulla', severity: 'Moderate', time: '2d ago', verified: true },
];

export default function BioWastePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">{/* Hero */}
      <section className="relative pt-48 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-green-900/20 to-slate-950" />
        <div className="absolute inset-0 bg-grid opacity-10" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <button onClick={() => router.push('/')} className="hover:text-white transition-colors">Home</button>
              <ChevronRight className="w-4 h-4" />
              <button onClick={() => router.push('/environmental-monitoring')} className="hover:text-white transition-colors">Environmental Monitoring</button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">Bio-Waste</span>
            </nav>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-2xl">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <Badge variant="success" size="lg">Organic Waste Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Bio-<span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-green-400">Waste</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Monitoring organic waste accumulation, slaughter waste discharge, market decomposition zones,
              and bio-contamination pathways across Kashmir&apos;s ecological and residential interfaces
            </p>
          </motion.div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { label: 'Exposure Risk Zones', value: '47', sub: 'Mapped locations', color: 'text-emerald-400' },
              { label: 'Verified Incidents', value: '34', sub: 'Last 7 days', color: 'text-slate-300' },
              { label: 'Critical Alerts', value: '8', sub: 'Immediate action', color: 'text-red-400' },
              { label: 'Water Body Linkages', value: '12', sub: 'Contamination pathways', color: 'text-cyan-400' },
              { label: 'Verification Rate', value: '72%', sub: 'Kashmir avg', color: 'text-emerald-400' },
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

      {/* Exposure Risk Indicators */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Exposure Risk Indicators</h2>
            <p className="text-slate-400">Unsafe organic waste accumulation zones and decomposition areas near settlements</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {exposureRiskCards.map((card, i) => (
              <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow flex-shrink-0">
                      <card.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">{card.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{card.description}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <MapPin className="w-3 h-3" />
                        <span>{card.zone}, {card.district}</span>
                      </div>
                      <Badge variant={card.riskLevel} size="sm">{card.riskLevel}</Badge>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Droplets className="w-3 h-3 text-cyan-500" />
                      <span>{card.waterLinkage}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Wind className="w-3 h-3" />
                        <span>{card.odorReports} odor/nuisance reports</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        {card.verified ? (
                          <>
                            <Shield className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Verified</span>
                          </>
                        ) : (
                          <>
                            <Shield className="w-3 h-3 text-amber-400" />
                            <span className="text-amber-400">Pending</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Water Contamination Linkage */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <Droplets className="w-6 h-6 text-cyan-400" />
              Water Contamination Linkage
            </h2>
            <p className="text-slate-400">Proximity analysis and contamination pathways from bio-waste to water bodies</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {waterContaminationData.map((w, i) => (
              <motion.div key={w.waterBody} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">{w.waterBody}</h3>
                      <p className="text-xs text-slate-400 mt-1">{w.proximity}</p>
                    </div>
                    <Badge variant={w.riskLevel} size="sm">{w.riskLevel}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-slate-400">
                      <span className="text-slate-500">Pathway: </span>
                      {w.pathway}
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-slate-400">
                        <Activity className="w-3 h-3" />
                        <span>Assessed {w.lastAssessment}</span>
                      </div>
                      {w.verified ? (
                        <div className="flex items-center gap-1.5">
                          <Shield className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400">Verified</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <Shield className="w-3 h-3 text-amber-400" />
                          <span className="text-amber-400">Pending</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification States Summary */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <Shield className="w-6 h-6 text-emerald-400" />
              Verification States Summary
            </h2>
            <p className="text-slate-400">Data quality and verification progress across bio-waste reports</p>
          </motion.div>

          <Card className="glass-intense border-white/10 p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{verificationSummary.total}</div>
                <div className="text-sm text-slate-400">Total Reports</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400 mb-1">{verificationSummary.verified}</div>
                <div className="text-sm text-slate-400">Verified</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400 mb-1">{verificationSummary.pending}</div>
                <div className="text-sm text-slate-400">Pending Review</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-1">{verificationSummary.verifiedPercent}%</div>
                <div className="text-sm text-slate-400">Verification Rate</div>
              </div>
            </div>
            <div className="mt-6">
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full" style={{ width: `${verificationSummary.verifiedPercent}%` }} />
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-2">
                <span>Verified ({verificationSummary.verified})</span>
                <span>Pending ({verificationSummary.pending})</span>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Recent Reports Feed */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <FileText className="w-6 h-6 text-emerald-400" />
              Recent Bio-Waste Reports
            </h2>
            <p className="text-slate-400">Latest verified and pending organic waste intelligence reports</p>
          </motion.div>

          <Card className="glass-intense border-white/10 p-5">
            <div className="space-y-4">
              {recentReports.map((r, i) => (
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
            <p className="text-slate-400">Explore connected environmental monitoring domains</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Solid Waste', href: '/environmental-monitoring/solid-waste', desc: 'Dumping & landfill intelligence', icon: ExternalLink, color: 'from-gray-500 to-slate-600' },
              { label: 'Sewage & Wastewater', href: '/environmental-monitoring/sewage-wastewater', desc: 'Discharge & outfall monitoring', icon: ExternalLink, color: 'from-blue-500 to-cyan-600' },
              { label: 'Environmental Health', href: '/environmental-monitoring/environmental-health', desc: 'Health signal monitoring', icon: ExternalLink, color: 'from-amber-500 to-orange-600' },
              { label: 'Water Systems', href: '/environmental-monitoring/water-systems', desc: 'River, lake & wetland data', icon: ExternalLink, color: 'from-emerald-500 to-green-600' },
            ].map((link, i) => (
              <motion.div key={link.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group" onClick={() => router.push(link.href)}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center shadow flex-shrink-0`}>
                      <link.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">{link.label}</h3>
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
