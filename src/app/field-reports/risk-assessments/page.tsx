'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { ReportCard } from '@/components/field-reports/ReportCard';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import {
  FileText, Calendar, MapPin, Layers, BookOpen, TrendingUp,
  Database, ArrowLeft, AlertTriangle, ExternalLink, Users,
  Flame, Shield, CloudRain, TriangleAlert, Eye, Siren
} from 'lucide-react';
import { motion } from 'framer-motion';
import { fieldReportsRegistry } from '@/data/field-reports-registry';

const REPORT_TYPE = 'risk-assessment';

function getReportsByType(type: string) {
  return fieldReportsRegistry.filter(r => r.reportType === type).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function isCurrentYear(date: string) {
  return new Date(date).getFullYear() >= 2025;
}

function isEsroArchive(report: any) {
  return report.id.startsWith('fr-esro-');
}

export default function RiskAssessmentsPage() {
  const router = useRouter();
  const allReports = getReportsByType(REPORT_TYPE);
  const currentReports = allReports.filter(r => isCurrentYear(r.date) && !isEsroArchive(r));
  const esroReports = allReports.filter(r => isEsroArchive(r));
  const archiveReports = allReports.filter(r => !isCurrentYear(r.date) && !isEsroArchive(r));

  const allDistricts = new Set<string>();
  const allModules = new Set<string>();
  const allSources = new Set<string>();
  const allEntities = new Set<string>();
  allReports.forEach(r => {
    r.districts.forEach(d => allDistricts.add(d));
    r.modules.forEach(m => allModules.add(m));
    allSources.add(r.source);
    r.entities.forEach(e => allEntities.add(e));
  });

  const yearRange = allReports.length > 0
    ? `${Math.min(...allReports.map(r => new Date(r.date).getFullYear()))}–${Math.max(...allReports.map(r => new Date(r.date).getFullYear()))}`
    : 'N/A';

  // Risk assessment highlights from ESRO data
  const riskHighlights = [
    { label: 'Fire Risk Zones', value: '12+', icon: Flame, desc: 'High-risk forest divisions identified' },
    { label: 'Conflict Areas', value: '8', icon: TriangleAlert, desc: 'Human-wildlife conflict hotspots' },
    { label: 'Risk Models', value: '4', icon: Shield, desc: 'Composite risk assessment frameworks' },
    { label: 'Early Warning Systems', value: 'Active', icon: Eye, desc: 'Fire, conflict, disaster monitoring' },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-48 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/60 via-orange-950/40 to-slate-950" />
        <div className="absolute top-32 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <button
              onClick={() => router.push('/field-reports')}
              className="flex items-center gap-2 text-slate-400 hover:text-red-400 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to All Field Reports</span>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-2xl">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <Badge variant="outline" size="lg" className="border-red-500/30 text-red-400">Risk & Early Warning</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Risk <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Assessments</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Forest fire risk forecasts, human-wildlife conflict assessments, disaster vulnerability analyses,
              and environmental hazard evaluations. From pre-season fire risk modeling to wildlife conflict mitigation —
              powered by ESRO's foundational risk monitoring networks and early warning systems.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Assessments', value: allReports.length, icon: FileText },
                { label: 'Current Reports', value: currentReports.length, icon: TrendingUp },
                { label: 'Districts Covered', value: allDistricts.size, icon: MapPin },
                { label: 'Year Range', value: yearRange, icon: Calendar },
              ].map((stat, i) => (
                <Card key={i} className="glass-intense border-red-500/10 p-4">
                  <stat.icon className="w-5 h-5 text-red-400 mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-500">{stat.label}</div>
                </Card>
              ))}
            </div>

            {/* Risk Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {riskHighlights.map((item, i) => (
                <Card key={i} className="glass-intense border-red-500/10 p-4">
                  <item.icon className="w-5 h-5 text-red-400 mb-2" />
                  <div className="text-2xl font-bold text-red-400">{item.value}</div>
                  <div className="text-xs text-white font-medium">{item.label}</div>
                  <div className="text-xs text-slate-500 mt-1">{item.desc}</div>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Current Reports */}
      {currentReports.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Current Risk Assessments</h2>
                  <p className="text-sm text-slate-500">Latest fire risk forecasts and hazard evaluations (2024–2026)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentReports.map((report, i) => (
                  <ReportCard key={report.id} report={report} index={i} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ESRO Archive */}
      {esroReports.length > 0 && (
        <section className="py-16 md:py-20 border-t border-white/10 bg-slate-900/20">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-500/30 flex items-center justify-center">
                  <Database className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">ESRO Archive: Risk & Hazard Assessments</h2>
                  <p className="text-sm text-slate-500">Foundational risk data from eIEN Kashmir Fire Monitoring Network & Conflict Management Programs (2005–2007)</p>
                </div>
              </div>

              {/* ESRO Source Attribution */}
              <Card className="glass-intense border-amber-500/10 p-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-amber-400 mb-2">ESRO Risk Data Sources</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-3">
                      Risk assessment data sourced from the <strong className="text-white">eIEN Kashmir Fire Monitoring Network</strong>,
                      the <strong className="text-white">CWPR Wildlife Human Conflict Management Programme</strong>, and the
                      <strong className="text-white"> State Disaster Risk Reduction Framework</strong>.
                      These represent the foundational baseline for forest fire risk modeling, human-wildlife conflict
                      hotspots, and environmental hazard vulnerability — documenting fire incident patterns, fuel moisture
                      indices, crop raiding zones, and highway mortality corridors across Kashmir.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                      <div className="px-3 py-2 bg-red-500/5 border border-red-500/10 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Flame className="w-4 h-4 text-red-400" />
                          <span className="text-xs font-semibold text-red-400">Fire Monitoring Network</span>
                        </div>
                        <p className="text-xs text-slate-500">Fire incident statistics, fuel moisture analysis, risk zone mapping across Tangmarg, Kupwara, Rajouri divisions</p>
                      </div>
                      <div className="px-3 py-2 bg-orange-500/5 border border-orange-500/10 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <TriangleAlert className="w-4 h-4 text-orange-400" />
                          <span className="text-xs font-semibold text-orange-400">Conflict Management</span>
                        </div>
                        <p className="text-xs text-slate-500">Bear conflict incidents, crop damage assessment, highway mortality, compensation claim analysis</p>
                      </div>
                      <div className="px-3 py-2 bg-amber-500/5 border border-amber-500/10 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Shield className="w-4 h-4 text-amber-400" />
                          <span className="text-xs font-semibold text-amber-400">Disaster Risk Framework</span>
                        </div>
                        <p className="text-xs text-slate-500">Vulnerability mapping, early warning systems, community-based monitoring and mitigation strategies</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {esroReports.map((report, i) => (
                  <ReportCard key={report.id} report={report} index={i} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Archive Reports */}
      {archiveReports.length > 0 && (
        <section className="py-16 md:py-20 border-t border-white/10">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-slate-500/10 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Archived Assessments</h2>
                  <p className="text-sm text-slate-500">Historical risk evaluations from earlier monitoring periods</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {archiveReports.map((report, i) => (
                  <ReportCard key={report.id} report={report} index={i} />
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Risk Assessment Types */}
      <section className="py-16 md:py-20 border-t border-white/10 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Risk Assessment Categories</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <Card className="glass-intense border-red-500/10 p-6">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
                  <Flame className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Forest Fire Risk</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Pre-season fire risk assessments using fuel moisture indices, precipitation deficit analysis,
                  historical burn patterns (2010-2025), and satellite thermal anomaly detection.
                </p>
              </Card>

              <Card className="glass-intense border-orange-500/10 p-6">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                  <TriangleAlert className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Human-Wildlife Conflict</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Bear conflict incident documentation, crop raiding damage assessment, highway mortality
                  surveys, and compensation claim analysis across conflict-prone districts.
                </p>
              </Card>

              <Card className="glass-intense border-amber-500/10 p-6">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-4">
                  <CloudRain className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Climate & Weather Hazards</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Extreme weather event risk, avalanche forecasting, flood vulnerability mapping,
                  and precipitation anomaly analysis for disaster preparedness.
                </p>
              </Card>

              <Card className="glass-intense border-yellow-500/10 p-6">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center mb-4">
                  <Siren className="w-5 h-5 text-yellow-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Early Warning Systems</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Fire early warning network activation protocols, wildlife alert triggers,
                  community-based monitoring systems, and emergency response coordination.
                </p>
              </Card>

              <Card className="glass-intense border-red-500/10 p-6">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
                  <Eye className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Risk Zone Mapping</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  GIS-based risk zone mapping using composite indices, vulnerability hotspot
                  identification, and priority area designation for resource allocation.
                </p>
              </Card>

              <Card className="glass-intense border-orange-500/10 p-6">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
                  <Shield className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Mitigation Strategies</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Enhanced patrol schedules, community-based conflict management, compensation
                  program evaluation, and mitigation strategy effectiveness assessment.
                </p>
              </Card>
            </div>

            {/* Methodology */}
            <Card className="glass-intense border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-red-400" />
                Assessment Methodology
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-red-400 mb-2">Current Assessments (2024–2026)</h4>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-start gap-2"><span className="text-red-400 mt-1">•</span>Composite risk modeling using fuel moisture indices</li>
                    <li className="flex items-start gap-2"><span className="text-red-400 mt-1">•</span>Satellite thermal anomaly detection and GIS overlay analysis</li>
                    <li className="flex items-start gap-2"><span className="text-red-400 mt-1">•</span>Historical pattern analysis with 15-year baselines</li>
                    <li className="flex items-start gap-2"><span className="text-red-400 mt-1">•</span>Community-based monitoring integration and early warning activation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-amber-400 mb-2">ESRO Archive (2005–2007)</h4>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">•</span>Fire incident documentation from eIEN Kashmir network</li>
                    <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">•</span>Wildlife-human conflict incident surveys and compensation analysis</li>
                    <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">•</span>Fuel moisture analysis and precipitation deficit assessment</li>
                    <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">•</span>State disaster risk framework development and vulnerability mapping</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Coverage */}
      <section className="py-16 md:py-20 border-t border-white/10">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-red-400" />
                  <h3 className="text-xl font-bold text-white">Districts Covered</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Array.from(allDistricts).sort().map(d => (
                    <span key={d} className="px-3 py-1.5 text-sm bg-red-500/10 text-red-400 rounded-lg border border-red-500/20">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Layers className="w-5 h-5 text-orange-400" />
                  <h3 className="text-xl font-bold text-white">Platform Modules Fed</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Array.from(allModules).sort().map(m => (
                    <span key={m} className="px-3 py-1.5 text-sm bg-orange-500/10 text-orange-400 rounded-lg border border-orange-500/20">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Risk Entities */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <h3 className="text-xl font-bold text-white">Risk Zones & Entities</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from(allEntities).sort().map(e => (
                  <span key={e} className="px-3 py-1.5 text-sm bg-red-500/5 text-red-300 rounded-lg border border-red-500/10">
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-20 border-t border-white/10 bg-slate-900/20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Risk Assessment Evolution</h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500/30 via-red-500/30 to-orange-500/30" />
              <div className="space-y-6">
                {[
                  { period: '2005–2006', label: 'ESRO Foundation', desc: 'eIEN Kashmir fire monitoring network established, wildlife conflict management programs initiated, disaster risk framework developed', color: 'bg-amber-500' },
                  { period: '2007', label: 'Fire Statistics Integration', desc: 'Fire incident data compiled across forest divisions, risk zone mapping initiated with GIS overlay analysis', color: 'bg-amber-500' },
                  { period: '2024', label: 'Pre-Season Assessment', desc: 'Forest Fire Season Preview 2024 — high-risk zones identified in Tangmarg, Kupwara, Rajouri with enhanced patrol recommendations', color: 'bg-red-500' },
                  { period: '2026', label: 'Current Operations', desc: 'Spring/Summer 2026 Fire Risk Assessment — elevated risk predicted for May-June due to below-normal winter precipitation, priority zones in Kupwara and Tangmarg', color: 'bg-orange-500' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 relative">
                    <div className={`w-3 h-3 rounded-full ${item.color} mt-2 flex-shrink-0 z-10`} />
                    <Card className="glass-intense border-white/10 p-4 flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-white">{item.period}</span>
                        <span className="text-sm font-semibold text-red-400">{item.label}</span>
                      </div>
                      <p className="text-sm text-slate-400">{item.desc}</p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
