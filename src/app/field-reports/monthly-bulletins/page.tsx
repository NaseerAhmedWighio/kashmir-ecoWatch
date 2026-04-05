'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { ReportCard } from '@/components/field-reports/ReportCard';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  FileText, Calendar, MapPin, Layers, BookOpen, TrendingUp,
  Database, ArrowLeft, BarChart3, Clock, ExternalLink, Users,
  CloudRain, Droplets, Wind
} from 'lucide-react';
import { motion } from 'framer-motion';
import { fieldReportsRegistry } from '@/data/field-reports-registry';

const REPORT_TYPE = 'monthly-bulletin';

function getReportsByType(type: string) {
  return fieldReportsRegistry.filter(r => r.reportType === type).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function isCurrentYear(date: string) {
  return new Date(date).getFullYear() >= 2025;
}

function isEsroArchive(report: any) {
  return report.id.startsWith('fr-esro-');
}

export default function MonthlyBulletinsPage() {
  const router = useRouter();
  const allReports = getReportsByType(REPORT_TYPE);
  const currentReports = allReports.filter(r => isCurrentYear(r.date) && !isEsroArchive(r));
  const esroReports = allReports.filter(r => isEsroArchive(r));
  const archiveReports = allReports.filter(r => !isCurrentYear(r.date) && !isEsroArchive(r));

  const allDistricts = new Set<string>();
  const allModules = new Set<string>();
  const allSources = new Set<string>();
  allReports.forEach(r => {
    r.districts.forEach(d => allDistricts.add(d));
    r.modules.forEach(m => allModules.add(m));
    allSources.add(r.source);
  });

  const yearRange = allReports.length > 0
    ? `${Math.min(...allReports.map(r => new Date(r.date).getFullYear()))}–${Math.max(...allReports.map(r => new Date(r.date).getFullYear()))}`
    : 'N/A';

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-48 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/60 via-blue-950/40 to-slate-950" />
        <div className="absolute top-32 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <button
              onClick={() => router.push('/field-reports')}
              className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to All Field Reports</span>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <Badge variant="outline" size="lg" className="border-cyan-500/30 text-cyan-400">Environmental Monitoring</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Monthly <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Environmental Bulletins</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Periodic environmental condition summaries tracking air quality trends, water quality parameters,
              seasonal indicators, and emerging risk patterns across Kashmir Valley. From current monitoring stations
              to the foundational ESRO archive (2005–2007).
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Total Reports', value: allReports.length, icon: FileText },
                { label: 'Current Reports', value: currentReports.length, icon: TrendingUp },
                { label: 'Districts Covered', value: allDistricts.size, icon: MapPin },
                { label: 'Year Range', value: yearRange, icon: Calendar },
              ].map((stat, i) => (
                <Card key={i} className="glass-intense border-cyan-500/10 p-4">
                  <stat.icon className="w-5 h-5 text-cyan-400 mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-500">{stat.label}</div>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Current Reports Section */}
      {currentReports.length > 0 && (
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Current Monitoring Reports</h2>
                  <p className="text-sm text-slate-500">Latest environmental bulletins (2025–2026)</p>
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

      {/* ESRO Archive Section */}
      {esroReports.length > 0 && (
        <section className="py-16 md:py-20 border-t border-white/10 bg-slate-900/20">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-500/30 flex items-center justify-center">
                  <Database className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">ESRO Archive: Monthly Environmental Bulletins</h2>
                  <p className="text-sm text-slate-500">Historical reports from eIEN Kashmir Biodiversity Conservation Network (2005–2007)</p>
                </div>
              </div>

              {/* ESRO Source Attribution */}
              <Card className="glass-intense border-amber-500/10 p-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-amber-400 mb-2">ESRO Archive Source</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-3">
                      These bulletins are sourced from the <strong className="text-white">eIEN Kashmir Biodiversity Conservation Network</strong> archive,
                      specifically from the <strong className="text-white">Council for Forest Protection & Research (CFPR)</strong> and
                      the <strong className="text-white">State Environment Assessment Program</strong>. They document baseline environmental
                      intelligence including soil degradation, forest vital statistics, social forest resources, and wasteland characterization
                      across Kashmir Valley.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {esroReports.map(r => (
                        <span key={r.id} className="px-2 py-1 text-xs bg-amber-500/10 text-amber-400 rounded border border-amber-500/20">
                          {r.source}
                        </span>
                      ))}
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

      {/* Archive Reports (Non-ESRO) */}
      {archiveReports.length > 0 && (
        <section className="py-16 md:py-20 border-t border-white/10">
          <div className="container mx-auto px-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-slate-500/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Archived Reports</h2>
                  <p className="text-sm text-slate-500">Historical bulletins from earlier monitoring periods</p>
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

      {/* What Monthly Bulletins Track */}
      <section className="py-16 md:py-20 border-t border-white/10 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">What Monthly Bulletins Track</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Card className="glass-intense border-cyan-500/10 p-6">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4">
                  <Wind className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Air Quality Trends</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  AQI monitoring across Srinagar, Ganderbal, and Budgam urban airsheds.
                  PM2.5, PM10, and seasonal inversion layer impacts on valley air quality.
                </p>
              </Card>

              <Card className="glass-intense border-blue-500/10 p-6">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <Droplets className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Water Quality Parameters</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Water quality assessments for Dal Lake, Nigeen Lake, Wular Lake, and Jhelum River.
                  Dissolved oxygen, nutrient loading, turbidity, and biological indicators.
                </p>
              </Card>

              <Card className="glass-intense border-teal-500/10 p-6">
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center mb-4">
                  <CloudRain className="w-5 h-5 text-teal-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Environmental Indicators</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Seasonal onset patterns, phenological records, precipitation trends,
                  and emerging risk indicators from multi-source environmental monitoring.
                </p>
              </Card>
            </div>

            {/* Methodology */}
            <Card className="glass-intense border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                Methodology & Data Sources
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-cyan-400 mb-2">Current Monitoring (2025–2026)</h4>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">•</span>Automated data aggregation from 12+ monitoring stations</li>
                    <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">•</span>Satellite imagery analysis (Sentinel-5P, Landsat-9)</li>
                    <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">•</span>Comparative trend analysis using 3-year baselines</li>
                    <li className="flex items-start gap-2"><span className="text-cyan-400 mt-1">•</span>Multi-source environmental data synthesis</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-amber-400 mb-2">ESRO Archive (2005–2007)</h4>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">•</span>CFPR forest inventory and vital statistics surveys</li>
                    <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">•</span>State Environment Assessment multi-domain integration</li>
                    <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">•</span>Wasteland classification and social forest inventories</li>
                    <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">•</span>Fire incident data from eIEN Kashmir monitoring network</li>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-xl font-bold text-white">Districts Covered</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Array.from(allDistricts).sort().map(d => (
                    <span key={d} className="px-3 py-1.5 text-sm bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Layers className="w-5 h-5 text-blue-400" />
                  <h3 className="text-xl font-bold text-white">Platform Modules Fed</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Array.from(allModules).sort().map(m => (
                    <span key={m} className="px-3 py-1.5 text-sm bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Data Sources */}
            <div className="mt-8">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-5 h-5 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Data Sources</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from(allSources).sort().map(s => (
                  <span key={s} className="px-3 py-1.5 text-sm bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20">
                    {s}
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
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Monitoring Evolution Timeline</h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500/30 via-cyan-500/30 to-emerald-500/30" />
              <div className="space-y-6">
                {[
                  { period: '2005–2007', label: 'ESRO Archive Era', desc: 'Foundation: State Environment Assessment, Forest Vital Statistics, Social Forest bulletins from eIEN Kashmir network', color: 'bg-amber-500' },
                  { period: '2024', label: 'Monitoring Resumption', desc: 'Monthly bulletin protocol re-established with station data aggregation and satellite analysis', color: 'bg-slate-500' },
                  { period: '2025', label: 'Enhanced Monitoring', desc: 'Expanded to 12+ monitoring stations with Sentinel-5P integration and 3-year baseline trend analysis', color: 'bg-cyan-500' },
                  { period: '2026', label: 'Current Operations', desc: 'Comprehensive environmental intelligence covering air quality, water quality, and emerging risk indicators', color: 'bg-emerald-500' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 relative">
                    <div className={`w-3 h-3 rounded-full ${item.color} mt-2 flex-shrink-0 z-10`} />
                    <Card className="glass-intense border-white/10 p-4 flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-white">{item.period}</span>
                        <span className="text-sm font-semibold text-cyan-400">{item.label}</span>
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
