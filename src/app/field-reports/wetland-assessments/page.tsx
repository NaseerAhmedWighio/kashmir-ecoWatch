'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { ReportCard } from '@/components/field-reports/ReportCard';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import {
  FileText, Calendar, MapPin, Layers, BookOpen, TrendingUp,
  Database, ArrowLeft, Droplets, ExternalLink, Users, Waves,
  Fish, Leaf, AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { fieldReportsRegistry } from '@/data/field-reports-registry';

const REPORT_TYPE = 'wetland-assessment';

function getReportsByType(type: string) {
  return fieldReportsRegistry.filter(r => r.reportType === type).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function isCurrentYear(date: string) {
  return new Date(date).getFullYear() >= 2025;
}

function isEsroArchive(report: any) {
  return report.id.startsWith('fr-esro-');
}

export default function WetlandAssessmentsPage() {
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

  // Key wetland parameters from ESRO data
  const wetlandHighlights = [
    { label: 'Major Wetlands Assessed', value: '8+', icon: Waves, desc: 'Dal, Nigeen, Wular, Anchar, Hokarsara, Hygam, Mirgund + alpine' },
    { label: 'Water Quality Stations', value: '12+', icon: Droplets, desc: 'Monitoring stations across Dal-Nigeen system' },
    { label: 'Assessment Methods', value: '6', icon: Leaf, desc: 'Water sampling, macrophyte, nutrient, biodiversity, hydrological' },
    { label: 'Key Concern', value: 'Eutrophication', icon: AlertTriangle, desc: 'Nutrient loading at Telbal inlet, sewage impacts' },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-48 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/60 via-teal-950/40 to-slate-950" />
        <div className="absolute top-32 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <button
              onClick={() => router.push('/field-reports')}
              className="flex items-center gap-2 text-slate-400 hover:text-blue-400 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to All Field Reports</span>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-600 flex items-center justify-center shadow-2xl">
                <Droplets className="w-8 h-8 text-white" />
              </div>
              <Badge variant="outline" size="lg" className="border-blue-500/30 text-blue-400">Water Systems Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Wetland <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Assessments</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Comprehensive wetland health evaluations covering water quality, macrophyte coverage, nutrient loading,
              biodiversity indicators, and hydrological functions. From Dal-Nigeen system monitoring to high altitude
              alpine wetlands — tracing two decades of wetland intelligence from the ESRO archive.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Assessments', value: allReports.length, icon: FileText },
                { label: 'Current Reports', value: currentReports.length, icon: TrendingUp },
                { label: 'Districts Covered', value: allDistricts.size, icon: MapPin },
                { label: 'Year Range', value: yearRange, icon: Calendar },
              ].map((stat, i) => (
                <Card key={i} className="glass-intense border-blue-500/10 p-4">
                  <stat.icon className="w-5 h-5 text-blue-400 mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-500">{stat.label}</div>
                </Card>
              ))}
            </div>

            {/* Wetland Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {wetlandHighlights.map((item, i) => (
                <Card key={i} className="glass-intense border-blue-500/10 p-4">
                  <item.icon className="w-5 h-5 text-blue-400 mb-2" />
                  <div className="text-xl font-bold text-blue-400">{item.value}</div>
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
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-teal-600 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Current Wetland Assessments</h2>
                  <p className="text-sm text-slate-500">Recent wetland health evaluations (2024–2025)</p>
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
                  <h2 className="text-2xl font-bold text-white">ESRO Archive: Wetland & Water Resources</h2>
                  <p className="text-sm text-slate-500">Foundational wetland assessments from eIEN Kashmir Water & Wetland Monitoring Network (2005–2007)</p>
                </div>
              </div>

              {/* ESRO Source Attribution */}
              <Card className="glass-intense border-amber-500/10 p-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-amber-400 mb-2">ESRO Wetland Data Sources</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-3">
                      Wetland assessment data sourced from the <strong className="text-white">eIEN Kashmir Water & Wetland Monitoring Network</strong>,
                      the <strong className="text-white">CFPR & CWPR Joint Wetland Assessment Program</strong>, and the
                      <strong className="text-white"> Trans Himalaya Conservation Network Plan (THCNP)</strong>.
                      These represent the foundational baseline for Dal Lake, Wular Lake, Nigeen Lake, and high altitude
                      wetland systems — documenting water quality parameters, macrophyte proliferation, nutrient dynamics,
                      and water resource depletion trends.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                      <div className="px-3 py-2 bg-blue-500/5 border border-blue-500/10 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Waves className="w-4 h-4 text-blue-400" />
                          <span className="text-xs font-semibold text-blue-400">Jhelum Basin Assessment</span>
                        </div>
                        <p className="text-xs text-slate-500">Dal, Wular, Nigeen, Anchar lakes + Hokarsara, Hygam, Mirgund wetlands. 96-page comprehensive evaluation</p>
                      </div>
                      <div className="px-3 py-2 bg-blue-500/5 border border-blue-500/10 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Droplets className="w-4 h-4 text-blue-400" />
                          <span className="text-xs font-semibold text-blue-400">Dal-Nigeen Health</span>
                        </div>
                        <p className="text-xs text-slate-500">Multi-parameter water quality, macrophyte biomass, Secchi depth, sewage/wastewater inflow, benthic organisms</p>
                      </div>
                      <div className="px-3 py-2 bg-blue-500/5 border border-blue-500/10 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Leaf className="w-4 h-4 text-blue-400" />
                          <span className="text-xs font-semibold text-blue-400">Alpine Wetlands</span>
                        </div>
                        <p className="text-xs text-slate-500">High altitude glacial tarns, alpine lake wetlands, Kolahoi glacier-fed systems, Pir Panjal meadow wetlands</p>
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
                  <p className="text-sm text-slate-500">Historical wetland evaluations from earlier monitoring periods</p>
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

      {/* Wetland Parameters */}
      <section className="py-16 md:py-20 border-t border-white/10 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-teal-600 flex items-center justify-center">
                <Droplets className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Wetland Assessment Parameters</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <Card className="glass-intense border-blue-500/10 p-6">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <Droplets className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Water Quality</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Physico-chemical parameters: dissolved oxygen, pH, turbidity, electrical conductivity,
                  temperature, total dissolved solids at 10-12 monitoring stations.
                </p>
              </Card>

              <Card className="glass-intense border-teal-500/10 p-6">
                <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center mb-4">
                  <Leaf className="w-5 h-5 text-teal-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Macrophyte Coverage</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Aquatic vegetation mapping through boat-based transects, quadrat sampling,
                  and drone surveys. Floating gardens (Radh) and emergent vegetation assessment.
                </p>
              </Card>

              <Card className="glass-intense border-cyan-500/10 p-6">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4">
                  <AlertTriangle className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Nutrient Loading</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Nitrogen and phosphorus loading calculations from Telbal Nallah inflow and outflow.
                  Eutrophication early warning signs and sewage/wastewater impact assessment.
                </p>
              </Card>

              <Card className="glass-intense border-indigo-500/10 p-6">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
                  <Fish className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Biodiversity Indicators</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Avian, fish, and aquatic invertebrate surveys. Benthic organism sampling
                  and wetland-dependent species population monitoring.
                </p>
              </Card>

              <Card className="glass-intense border-sky-500/10 p-6">
                <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center mb-4">
                  <Waves className="w-5 h-5 text-sky-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Hydrological Functions</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Wetland extent mapping, water level tracking, Secchi depth measurements,
                  glacial meltwater contribution analysis for high altitude systems.
                </p>
              </Card>

              <Card className="glass-intense border-emerald-500/10 p-6">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Catchment Analysis</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Catchment area land use analysis, inflow/outflow measurements,
                  watershed characterization, and pollution source identification.
                </p>
              </Card>
            </div>

            {/* Methodology */}
            <Card className="glass-intense border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                Assessment Methodology
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-blue-400 mb-2">Current Assessments (2024–2025)</h4>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-start gap-2"><span className="text-blue-400 mt-1">•</span>Multi-parameter water quality analysis at 10-12 stations</li>
                    <li className="flex items-start gap-2"><span className="text-blue-400 mt-1">•</span>Macrophyte coverage via drone surveys and ground-truthing</li>
                    <li className="flex items-start gap-2"><span className="text-blue-400 mt-1">•</span>Nutrient loading from inflow/outflow measurements</li>
                    <li className="flex items-start gap-2"><span className="text-blue-400 mt-1">•</span>6-week assessment periods with comparative baselines</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-amber-400 mb-2">ESRO Archive (2005–2007)</h4>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">•</span>Jhelum Basin wetland extent mapping via field surveys + remote sensing</li>
                    <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">•</span>Dal-Nigeen multi-parameter water quality at established stations</li>
                    <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">•</span>High altitude wetland surveys during favorable weather windows</li>
                    <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">•</span>Water resource depletion: spring discharge, groundwater well data</li>
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
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <h3 className="text-xl font-bold text-white">Districts Covered</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Array.from(allDistricts).sort().map(d => (
                    <span key={d} className="px-3 py-1.5 text-sm bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20">
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Layers className="w-5 h-5 text-teal-400" />
                  <h3 className="text-xl font-bold text-white">Platform Modules Fed</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Array.from(allModules).sort().map(m => (
                    <span key={m} className="px-3 py-1.5 text-sm bg-teal-500/10 text-teal-400 rounded-lg border border-teal-500/20">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Wetland Entities */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Waves className="w-5 h-5 text-blue-400" />
                <h3 className="text-xl font-bold text-white">Wetland Systems Documented</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from(allEntities).sort().map(e => (
                  <span key={e} className="px-3 py-1.5 text-sm bg-blue-500/5 text-blue-300 rounded-lg border border-blue-500/10">
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
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Wetland Monitoring Evolution</h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500/30 via-blue-500/30 to-teal-500/30" />
              <div className="space-y-6">
                {[
                  { period: '2005', label: 'Alpine Wetland Baseline', desc: 'THCNP high altitude wetland surveys — glacial tarns, alpine lakes, Kolahoi-fed systems in Greater Himalaya and Pir Panjal', color: 'bg-amber-500' },
                  { period: '2006–2007', label: 'ESRO Foundation', desc: 'Jhelum Basin comprehensive assessment (8 wetlands), Dal-Nigeen health evaluation with early eutrophication warnings, water depletion risk assessment', color: 'bg-amber-500' },
                  { period: '2024', label: 'Assessment Resumption', desc: 'Dal-Nigeen wetland health assessment (86 pages) — water quality improvements noted, nitrogen reduction at 3 of 5 stations', color: 'bg-blue-500' },
                  { period: '2025', label: 'Current Operations', desc: 'Moderate-improving overall system health rating, continued multi-station monitoring with drone surveys and comparative baselines', color: 'bg-teal-500' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 relative">
                    <div className={`w-3 h-3 rounded-full ${item.color} mt-2 flex-shrink-0 z-10`} />
                    <Card className="glass-intense border-white/10 p-4 flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-white">{item.period}</span>
                        <span className="text-sm font-semibold text-blue-400">{item.label}</span>
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
