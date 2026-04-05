'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { ReportCard } from '@/components/field-reports/ReportCard';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import {
  FileText, Calendar, MapPin, Layers, BookOpen, TrendingUp,
  Database, ArrowLeft, PawPrint, ExternalLink, Users,
  Bird, Fish, Bug, TreePine, Shield
} from 'lucide-react';
import { motion } from 'framer-motion';
import { fieldReportsRegistry } from '@/data/field-reports-registry';

const REPORT_TYPE = 'species-survey';

function getReportsByType(type: string) {
  return fieldReportsRegistry.filter(r => r.reportType === type).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function isCurrentYear(date: string) {
  return new Date(date).getFullYear() >= 2025;
}

function isEsroArchive(report: any) {
  return report.id.startsWith('fr-esro-');
}

export default function SpeciesSurveysPage() {
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

  // Featured ESRO species data points
  const esroSpeciesHighlights = [
    { label: 'Mammal Species', value: '73', icon: PawPrint, desc: 'Across 54 genera, 21 families, 8 orders' },
    { label: 'High Altitude Species', value: '20', icon: TreePine, desc: 'Cold desert endemic mammals' },
    { label: 'Temperate Species', value: '16', icon: Bird, desc: 'Temperate zone mammals' },
    { label: 'State Endemism', value: '16%', icon: Shield, desc: 'Of Indian mammals found in J&K' },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-48 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/60 via-green-950/40 to-slate-950" />
        <div className="absolute top-32 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-green-500/5 rounded-full blur-3xl" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <button
              onClick={() => router.push('/field-reports')}
              className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to All Field Reports</span>
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-2xl">
                <PawPrint className="w-8 h-8 text-white" />
              </div>
              <Badge variant="outline" size="lg" className="border-emerald-500/30 text-emerald-400">Biodiversity Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Species <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">Surveys</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Wildlife population censuses, species-specific conservation assessments, faunal biodiversity inventories,
              and human-wildlife conflict surveys. From the endangered Hangul and Snow Leopard to comprehensive
              mammalian, avian, fish, and insect biodiversity — powered by ESRO's foundational species data.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: 'Total Surveys', value: allReports.length, icon: FileText },
                { label: 'Current Surveys', value: currentReports.length, icon: TrendingUp },
                { label: 'Districts Covered', value: allDistricts.size, icon: MapPin },
                { label: 'Year Range', value: yearRange, icon: Calendar },
              ].map((stat, i) => (
                <Card key={i} className="glass-intense border-emerald-500/10 p-4">
                  <stat.icon className="w-5 h-5 text-emerald-400 mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-slate-500">{stat.label}</div>
                </Card>
              ))}
            </div>

            {/* ESRO Species Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {esroSpeciesHighlights.map((item, i) => (
                <Card key={i} className="glass-intense border-amber-500/10 p-4">
                  <item.icon className="w-5 h-5 text-amber-400 mb-2" />
                  <div className="text-2xl font-bold text-amber-400">{item.value}</div>
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
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Current Species Surveys</h2>
                  <p className="text-sm text-slate-500">Recent wildlife and biodiversity surveys (2025–2026)</p>
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
                  <h2 className="text-2xl font-bold text-white">ESRO Archive: Species & Faunal Surveys</h2>
                  <p className="text-sm text-slate-500">Foundational biodiversity data from CWPR, SSCC & CAMP programs (2005–2007)</p>
                </div>
              </div>

              {/* ESRO Source Attribution */}
              <Card className="glass-intense border-amber-500/10 p-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-amber-400 mb-2">ESRO Species Data Sources</h3>
                    <p className="text-sm text-slate-400 leading-relaxed mb-3">
                      Species survey data sourced from the <strong className="text-white">Council for Wildlife Protection & Research (CWPR)</strong>
                      including the <strong className="text-white">Faunal Biodiversity Inventory</strong> documenting 73 mammal species across
                      three faunal zones, the <strong className="text-white">Species Specific Conservation Concern (SSCC)</strong> program
                      covering Snow Leopard, Hangul, and bear conflict management, and the
                      <strong className="text-white"> Conservation Alliance for Medicinal Plants (CAMP)</strong>.
                      About 16% of Indian mammals, birds, reptiles, and butterflies are represented in J&K state.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                      <div className="px-3 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <PawPrint className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs font-semibold text-emerald-400">CWPR Faunal Inventory</span>
                        </div>
                        <p className="text-xs text-slate-500">73 mammals, 54 genera, 21 families, 8 orders across cold desert, temperate & sub-tropical zones</p>
                      </div>
                      <div className="px-3 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Shield className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs font-semibold text-emerald-400">SSCC Program</span>
                        </div>
                        <p className="text-xs text-slate-500">Snow Leopard, Hangul, Bear conflict management — species-specific long-term conservation research</p>
                      </div>
                      <div className="px-3 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
                        <div className="flex items-center gap-2 mb-1">
                          <Bug className="w-4 h-4 text-emerald-400" />
                          <span className="text-xs font-semibold text-emerald-400">CAMP & Fish Survey</span>
                        </div>
                        <p className="text-xs text-slate-500">Medicinal plants, fish biodiversity (Schizothorax), insect and butterfly surveys</p>
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
                  <h2 className="text-2xl font-bold text-white">Archived Surveys</h2>
                  <p className="text-sm text-slate-500">Historical species surveys from earlier monitoring periods</p>
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

      {/* Species Coverage Detail */}
      <section className="py-16 md:py-20 border-t border-white/10 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                <PawPrint className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Species Groups Covered</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <Card className="glass-intense border-emerald-500/10 p-6">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                  <PawPrint className="w-5 h-5 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Mammals</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Hangul (Kashmir Stag), Snow Leopard, Markhor, Himalayan Brown Bear, Musk Deer,
                  Leopard Cat, Red Fox, Himalayan Marmot. 73 species across 3 faunal zones.
                </p>
              </Card>

              <Card className="glass-intense border-blue-500/10 p-6">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <Bird className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Birds & Avian Species</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Migratory waterfowl (Bar-headed Goose, Greylag Goose, Common Pochard),
                  resident avian species. Highest contributor to chordate diversity in J&K.
                </p>
              </Card>

              <Card className="glass-intense border-cyan-500/10 p-6">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4">
                  <Fish className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Fish & Aquatic Species</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Schizothorax (Snowtrout) species across Jhelum, Sind, Lidder, and Brengi rivers.
                  Indigenous fish biodiversity and aquatic ecosystem health indicators.
                </p>
              </Card>

              <Card className="glass-intense border-yellow-500/10 p-6">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center mb-4">
                  <Bug className="w-5 h-5 text-yellow-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Insects & Amphibians/Reptiles</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Butterfly species, aquatic insects, amphibian and reptile populations.
                  Documented across Kashmir's three faunal zones.
                </p>
              </Card>

              <Card className="glass-intense border-green-500/10 p-6">
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
                  <TreePine className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Medicinal Plants</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Alpine and temperate medicinal plant species. Community-based conservation
                  programs and sustainable harvesting guidelines for priority species.
                </p>
              </Card>

              <Card className="glass-intense border-red-500/10 p-6">
                <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
                  <Shield className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Endangered Species</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Hangul (state animal), Snow Leopard, Markhor, Musk Deer. Species-specific
                  conservation programs with long-term demographic viability studies.
                </p>
              </Card>
            </div>

            {/* Methodology */}
            <Card className="glass-intense border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                Survey Methodology
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-emerald-400 mb-2">Current Surveys (2025–2026)</h4>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-start gap-2"><span className="text-emerald-400 mt-1">•</span>Point count surveys and transect sampling</li>
                    <li className="flex items-start gap-2"><span className="text-emerald-400 mt-1">•</span>Camera trapping with population modeling (CAPTURE, MARK)</li>
                    <li className="flex items-start gap-2"><span className="text-emerald-400 mt-1">•</span>Direct observation counts and sign surveys</li>
                    <li className="flex items-start gap-2"><span className="text-emerald-400 mt-1">•</span>Species identification verification by expert teams</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-amber-400 mb-2">ESRO Archive (2005–2007)</h4>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">•</span>Comprehensive faunal biodiversity inventory across 3 zones</li>
                    <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">•</span>SSCC long-term species research (Snow Leopard, Hangul)</li>
                    <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">•</span>Wildlife-human conflict incident documentation</li>
                    <li className="flex items-start gap-2"><span className="text-amber-400 mt-1">•</span>Community-based monitoring and ethnobotanical surveys</li>
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

            {/* Key Species Entities */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <PawPrint className="w-5 h-5 text-emerald-400" />
                <h3 className="text-xl font-bold text-white">Key Species & Entities</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {Array.from(allEntities).sort().slice(0, 20).map(e => (
                  <span key={e} className="px-3 py-1.5 text-sm bg-emerald-500/5 text-emerald-300 rounded-lg border border-emerald-500/10">
                    {e}
                  </span>
                ))}
                {allEntities.size > 20 && (
                  <span className="px-3 py-1.5 text-sm text-slate-500">+{allEntities.size - 20} more</span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 md:py-20 border-t border-white/10 bg-slate-900/20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Species Survey Evolution</h2>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-amber-500/30 via-emerald-500/30 to-green-500/30" />
              <div className="space-y-6">
                {[
                  { period: '2005–2007', label: 'ESRO Foundation', desc: 'CWPR Faunal Inventory (73 mammals), SSCC programs for Snow Leopard & Hangul, wildlife conflict management surveys', color: 'bg-amber-500' },
                  { period: '2023–2024', label: 'Baseline Resurvey', desc: 'Winter wildlife census, markhor population census, hangul habitat assessment using modern camera trapping', color: 'bg-slate-500' },
                  { period: '2025', label: 'Enhanced Monitoring', desc: 'Biennial markhor survey (340-380 individuals, 8-10% growth), Hangul assessment (280-310 individuals)', color: 'bg-emerald-500' },
                  { period: '2026', label: 'Current Operations', desc: 'Winter bird migration survey at Hokarsara (187 species), continued species-specific conservation programs', color: 'bg-green-500' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 relative">
                    <div className={`w-3 h-3 rounded-full ${item.color} mt-2 flex-shrink-0 z-10`} />
                    <Card className="glass-intense border-white/10 p-4 flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-white">{item.period}</span>
                        <span className="text-sm font-semibold text-emerald-400">{item.label}</span>
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
