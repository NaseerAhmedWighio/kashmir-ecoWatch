'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { ReportCard } from '@/components/field-reports/ReportCard';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import {
  FileText, Calendar, MapPin, Layers, BookOpen, TrendingUp,
  Database, ArrowLeft, FlaskConical, ExternalLink, Users,
  Microscope, Beaker, Ruler, TestTube, Mountain, Droplets
} from 'lucide-react';
import { motion } from 'framer-motion';
import { fieldReportsRegistry } from '@/data/field-reports-registry';

const REPORT_TYPE = 'technical-report';

function getReportsByType(type: string) {
  return fieldReportsRegistry.filter(r => r.reportType === type).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function isCurrentYear(date: string) {
  return new Date(date).getFullYear() >= 2025;
}

function isEsroArchive(report: any) {
  return report.id.startsWith('fr-esro-');
}

export default function TechnicalReportsPage() {
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

  // Technical report highlights from ESRO data
  const technicalHighlights = [
    { label: 'Glacial Studies', value: '6', icon: Mountain, desc: 'Kolahoi, Thajiwas & alpine glacier assessments' },
    { label: 'Water Quality Labs', value: '28', icon: Beaker, desc: 'Physico-chemical parameters tested' },
    { label: 'Hydrological Models', value: '4', icon: Droplets, desc: 'Mass balance & downstream impact modeling' },
    { label: 'Technical Papers', value: '12+', icon: TestTube, desc: 'Peer-reviewed environmental research' },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-48 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/60 via-violet-950/40 to-slate-950" />
        <div className="absolute top-32 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <button
              onClick={() => router.push('/field-reports')}
              className="flex items-center gap-2 text-slate-400 hover:text-purple-400 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to All Field Reports</span>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-2xl">
                <FlaskConical className="w-8 h-8 text-white" />
              </div>
              <Badge variant="outline" size="lg" className="border-purple-500/30 text-purple-400">Scientific Research</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-400">Reports</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              In-depth scientific studies, glacial retreat assessments, water quality analyses, hydrological impact models,
              and peer-reviewed environmental research. From Kolahoi Glacier multi-temporal analysis to Sind River water quality
              surveys — advanced technical intelligence from ESRO's scientific research programs.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Reports', value: allReports.length, icon: FileText },
                { label: 'Current Reports', value: currentReports.length, icon: TrendingUp },
                { label: 'Districts Covered', value: allDistricts.size, icon: MapPin },
                { label: 'Year Range', value: yearRange, icon: Calendar },
              ].map((stat, i) => (
                <Card key={i} className="glass-intense border-purple-500/10 p-4">
                  <stat.icon className="w-5 h-5 text-purple-400 mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-500">{stat.label}</div>
                </Card>
              ))}
            </div>

            {/* Technical Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {technicalHighlights.map((item, i) => (
                <Card key={i} className="glass-intense border-purple-500/10 p-4">
                  <item.icon className="w-5 h-5 text-purple-400 mb-2" />
                  <div className="text-2xl font-bold text-purple-400">{item.value}</div>
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
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Current Technical Reports</h2>
                  <p className="text-sm text-slate-500">Recent scientific studies and technical assessments (2024–2025)</p>
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
                  <h2 className="text-2xl font-bold text-white">ESRO Archive: Technical & Scientific Studies</h2>
                  <p className="text-sm text-slate-500">Foundational research from University of Kashmir Earth Sciences, Water Resources Dept & ESRO Scientific Programs (2005–2007)</p>
                </div>
              </div>

              {/* ESRO Source Attribution */}
              <Card className="glass-intense border-amber-500/10 p-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-amber-400 mb-2">ESRO Technical Research Sources</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-3">
                      Technical reports sourced from the <strong className="text-white">Earth Sciences Department, University of Kashmir</strong>,
                      the <strong className="text-white">Water Resources Department Scientific Division</strong>, and the
                      <strong className="text-white"> ESRO Glaciology & Hydrology Research Program</strong>.
                      These represent foundational baseline studies including glacial mass balance assessments,
                      multi-temporal satellite imagery analysis (2000-2007), water quality laboratory testing
                      for 28+ physico-chemical parameters, and hydrological impact modeling for Kashmir's
                      critical river systems and glacial-fed watersheds.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                      <div className="px-3 py-2 bg-purple-500/5 border border-purple-500/10 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Mountain className="w-4 h-4 text-purple-400" />
                          <span className="text-xs font-semibold text-purple-400">Glaciology Studies</span>
                        </div>
                        <p className="text-xs text-slate-500">Kolahoi Glacier retreat (180m since 2000), Thajiwas Glacier assessment, mass balance modeling, GPS field validation</p>
                      </div>
                      <div className="px-3 py-2 bg-blue-500/5 border border-blue-500/10 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Beaker className="w-4 h-4 text-blue-400" />
                          <span className="text-xs font-semibold text-blue-400">Water Quality Labs</span>
                        </div>
                        <p className="text-xs text-slate-500">28-parameter physico-chemical analysis, heavy metal testing (AAS), continuous turbidity monitoring, grab sampling</p>
                      </div>
                      <div className="px-3 py-2 bg-cyan-500/5 border border-cyan-500/10 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Droplets className="w-4 h-4 text-cyan-400" />
                          <span className="text-xs font-semibold text-cyan-400">Hydrological Models</span>
                        </div>
                        <p className="text-xs text-slate-500">Downstream impact modeling, accumulation-area ratio method, Lidder River hydrology, Jhelum basin assessment</p>
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
                  <h2 className="text-2xl font-bold text-white">Archived Technical Reports</h2>
                  <p className="text-sm text-slate-500">Historical scientific studies from earlier research periods</p>
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

      {/* Technical Study Categories */}
      <section className="py-16 md:py-20 border-t border-white/10 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                <FlaskConical className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Technical Study Categories</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <Card className="glass-intense border-purple-500/10 p-6">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                  <Mountain className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Glacial Retreat Analysis</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Multi-temporal satellite imagery time-series (2000-2025), GPS field surveys of terminus position,
                  mass balance modeling using accumulation-area ratio method.
                </p>
              </Card>

              <Card className="glass-intense border-blue-500/10 p-6">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <Beaker className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Water Quality Laboratory</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Grab sampling at monitoring stations, laboratory analysis for 28 physico-chemical parameters,
                  heavy metal testing using Atomic Absorption Spectroscopy (AAS).
                </p>
              </Card>

              <Card className="glass-intense border-cyan-500/10 p-6">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4">
                  <Droplets className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Hydrological Impact Modeling</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Downstream hydrological impact modeling, glacial meltwater contribution analysis,
                  river discharge assessments, and watershed characterization.
                </p>
              </Card>

              <Card className="glass-intense border-indigo-500/10 p-6">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
                  <Microscope className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Satellite Imagery Analysis</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Landsat and Sentinel-2 imagery analysis (82+ scenes), remote sensing integration,
                  temporal change detection, and GIS-based spatial analysis.
                </p>
              </Card>

              <Card className="glass-intense border-teal-500/10 p-6">
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center mb-4">
                  <TestTube className="w-5 h-5 text-teal-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Continuous Monitoring</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Continuous turbidity monitoring at 5 stations, real-time water quality sensors,
                  automated data logging, and threshold-based alerting systems.
                </p>
              </Card>

              <Card className="glass-intense border-violet-500/10 p-6">
                <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center mb-4">
                  <Ruler className="w-5 h-5 text-violet-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Field Validation Surveys</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  GPS-based field validation of satellite observations, ground-truthing surveys,
                  terrain-based measurement verification, and accuracy assessment.
                </p>
              </Card>
            </div>

            {/* Methodology */}
            <Card className="glass-intense border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-purple-400" />
                Technical Methodology
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-purple-400 mb-2">Current Studies (2024–2025)</h4>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-start gap-2"><span className="text-purple-400 mt-1">•</span>Landsat and Sentinel-2 imagery analysis (82 scenes for Kolahoi)</li>
                    <li className="flex items-start gap-2"><span className="text-purple-400 mt-1">•</span>GPS-based field validation of glacier terminus position</li>
                    <li className="flex items-start gap-2"><span className="text-purple-400 mt-1">•</span>Grab sampling at 15 stations along Sind River course</li>
                    <li className="flex items-start gap-2"><span className="text-purple-400 mt-1">•</span>Mass balance modeling using accumulation-area ratio method</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-amber-400 mb-2">ESRO Archive (2005–2007)</h4>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">•</span>Kolahoi Glacier baseline assessment (2000-2007 imagery)</li>
                    <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">•</span>28-parameter water quality lab analysis for Jhelum basin</li>
                    <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">•</span>Heavy metal testing using AAS at University of Kashmir labs</li>
                    <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">•</span>Downstream hydrological impact modeling for Lidder River</li>
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
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <h3 className="text-xl font-bold text-white">Districts Covered</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Array.from(allDistricts).sort().map(d => (
                    <span key={d} className="px-3 py-1.5 text-sm bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/20">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Layers className="w-5 h-5 text-violet-400" />
                  <h3 className="text-xl font-bold text-white">Platform Modules Fed</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Array.from(allModules).sort().map(m => (
                    <span key={m} className="px-3 py-1.5 text-sm bg-violet-500/10 text-violet-400 rounded-lg border border-violet-500/20">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Technical Entities */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <FlaskConical className="w-5 h-5 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Technical Study Entities</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from(allEntities).sort().map(e => (
                  <span key={e} className="px-3 py-1.5 text-sm bg-purple-500/5 text-purple-300 rounded-lg border border-purple-500/10">
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
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Technical Research Evolution</h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500/30 via-purple-500/30 to-violet-500/30" />
              <div className="space-y-6">
                {[
                  { period: '2005–2007', label: 'ESRO Foundation', desc: 'Kolahoi Glacier baseline assessment (2000-2007), Jhelum basin water quality lab analysis (28 parameters), Lidder River hydrological modeling at University of Kashmir', color: 'bg-amber-500' },
                  { period: '2015–2020', label: 'Accelerated Retreat Period', desc: 'Kolahoi Glacier retreat acceleration observed, multi-temporal satellite analysis initiated, enhanced GPS field validation protocols', color: 'bg-purple-500' },
                  { period: '2025', label: 'Enhanced Technical Studies', desc: 'Kolahoi Glacier multi-temporal analysis (92 pages), Sind River water quality survey (15 stations, 28 parameters), heavy metal testing using AAS', color: 'bg-purple-500' },
                  { period: '2026', label: 'Current Operations', desc: 'Continued glacier monitoring, downstream hydrological impact assessments, integration with climate indicators module, peer-reviewed research publication', color: 'bg-violet-500' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 relative">
                    <div className={`w-3 h-3 rounded-full ${item.color} mt-2 flex-shrink-0 z-10`} />
                    <Card className="glass-intense border-white/10 p-4 flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-white">{item.period}</span>
                        <span className="text-sm font-semibold text-purple-400">{item.label}</span>
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
