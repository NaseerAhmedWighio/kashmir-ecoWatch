'use client';

import React, { useState, useMemo } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { ReportCard } from '@/components/field-reports/ReportCard';
import { FilterBar } from '@/components/field-reports/FilterBar';
import { SummaryStrip } from '@/components/field-reports/SummaryStrip';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { FileText, BookOpen, Link2, Shield, Database, AlertTriangle, BarChart3, MapPin, Calendar, PawPrint, Droplets, Flame, FlaskConical, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  fieldReportsRegistry, getFieldReportStats, getAllDistricts, getAllModules, getAllSources, getAllYears
} from '@/data/field-reports-registry';
import { FieldReport } from '@/types';

export default function FieldReportsPage() {
  const stats = getFieldReportStats();
  const [filteredReports, setFilteredReports] = useState<FieldReport[]>(
    [...fieldReportsRegistry].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  );

  const handleFilterChange = (filtered: FieldReport[]) => {
    setFilteredReports(filtered);
  };

  const districts = getAllDistricts();
  const modules = getAllModules();
  const sources = getAllSources();
  const years = getAllYears();

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-48 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/50 via-orange-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <Badge variant="warning" size="lg">Field Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Field <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Intelligence Reports</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Field reports, survey findings, technical assessments, and monitoring bulletins supporting environmental intelligence across Kashmir. 
              These documents feed evidence layers, district profiles, alerts, and module intelligence throughout the platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Summary Strip */}
      <SummaryStrip stats={stats} />

      {/* Quick Navigation to Report Types */}
      <section className="py-12 md:py-16 border-t border-white/10">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-6xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Browse by Report Type</h2>
                <p className="text-sm text-slate-500">Dedicated pages with detailed data for each intelligence category</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Monthly Bulletins */}
              <a href="/field-reports/monthly-bulletins" className="group">
                <Card className="glass-intense border-cyan-500/10 p-6 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Monthly Environmental Bulletins</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Periodic environmental condition summaries tracking air quality, water quality, and seasonal indicators across Kashmir Valley.
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-2 py-1 text-xs bg-cyan-500/10 text-cyan-400 rounded border border-cyan-500/20">2005–2026</span>
                    <span className="px-2 py-1 text-xs bg-cyan-500/10 text-cyan-400 rounded border border-cyan-500/20">ESRO Archive</span>
                    <span className="px-2 py-1 text-xs bg-cyan-500/10 text-cyan-400 rounded border border-cyan-500/20">Station Data</span>
                  </div>
                </Card>
              </a>

              {/* Species Surveys */}
              <a href="/field-reports/species-surveys" className="group">
                <Card className="glass-intense border-emerald-500/10 p-6 hover:border-emerald-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center flex-shrink-0">
                      <PawPrint className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Species Surveys</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Wildlife population censuses, species conservation assessments, and faunal biodiversity inventories including Hangul, Snow Leopard, and Markhor.
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-2 py-1 text-xs bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">73 Mammal Species</span>
                    <span className="px-2 py-1 text-xs bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">ESRO CWPR</span>
                    <span className="px-2 py-1 text-xs bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">Endangered</span>
                  </div>
                </Card>
              </a>

              {/* Wetland Assessments */}
              <a href="/field-reports/wetland-assessments" className="group">
                <Card className="glass-intense border-blue-500/10 p-6 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                      <Droplets className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">Wetland Assessments</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Comprehensive wetland health evaluations covering water quality, macrophyte coverage, nutrient loading, and biodiversity indicators.
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-2 py-1 text-xs bg-blue-500/10 text-blue-400 rounded border border-blue-500/20">Dal-Nigeen</span>
                    <span className="px-2 py-1 text-xs bg-blue-500/10 text-blue-400 rounded border border-blue-500/20">12+ Stations</span>
                    <span className="px-2 py-1 text-xs bg-blue-500/10 text-blue-400 rounded border border-blue-500/20">Water Quality</span>
                  </div>
                </Card>
              </a>

              {/* Risk Assessments */}
              <a href="/field-reports/risk-assessments" className="group">
                <Card className="glass-intense border-red-500/10 p-6 hover:border-red-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/10 h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                      <Flame className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors">Risk Assessments</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        Forest fire risk forecasts, human-wildlife conflict assessments, and environmental hazard evaluations with early warning systems.
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-red-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-2 py-1 text-xs bg-red-500/10 text-red-400 rounded border border-red-500/20">Fire Risk</span>
                    <span className="px-2 py-1 text-xs bg-red-500/10 text-red-400 rounded border border-red-500/20">Conflict Zones</span>
                    <span className="px-2 py-1 text-xs bg-red-500/10 text-red-400 rounded border border-red-500/20">Early Warning</span>
                  </div>
                </Card>
              </a>

              {/* Technical Reports */}
              <a href="/field-reports/technical-reports" className="group">
                <Card className="glass-intense border-purple-500/10 p-6 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center flex-shrink-0">
                      <FlaskConical className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">Technical Reports</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        In-depth scientific studies, glacial retreat assessments, water quality analyses, and hydrological impact models from research institutions.
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="px-2 py-1 text-xs bg-purple-500/10 text-purple-400 rounded border border-purple-500/20">Glaciers</span>
                    <span className="px-2 py-1 text-xs bg-purple-500/10 text-purple-400 rounded border border-purple-500/20">28 Parameters</span>
                    <span className="px-2 py-1 text-xs bg-purple-500/10 text-purple-400 rounded border border-purple-500/20">Peer-Reviewed</span>
                  </div>
                </Card>
              </a>

              {/* All Reports (Current View) */}
              <Card className="glass-intense border-amber-500/20 p-6 bg-gradient-to-br from-amber-500/5 to-orange-500/5">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0 ring-2 ring-amber-500/50">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-2">All Reports (Current View)</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Comprehensive view of all field intelligence reports with filtering by type, district, year, and source.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-2 py-1 text-xs bg-amber-500/10 text-amber-400 rounded border border-amber-500/20">All Types</span>
                  <span className="px-2 py-1 text-xs bg-amber-500/10 text-amber-400 rounded border border-amber-500/20">Filtered View</span>
                  <span className="px-2 py-1 text-xs bg-amber-500/10 text-amber-400 rounded border border-amber-500/20">Active</span>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <FilterBar
        reports={fieldReportsRegistry}
        years={years}
        districts={districts}
        modules={modules}
        sources={sources}
        onFilterChange={handleFilterChange}
      />

      {/* Reports Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              Reports
              <span className="ml-3 text-sm font-normal text-slate-500">
                {filteredReports.length} of {fieldReportsRegistry.length}
              </span>
            </h2>
          </div>

          {filteredReports.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredReports.map((report, i) => (
                <ReportCard key={report.id} report={report} index={i} />
              ))}
            </div>
          ) : (
            <Card className="glass-intense border-white/10 p-12 text-center">
              <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No reports match your filters</h3>
              <p className="text-slate-400">Try adjusting your filter criteria or clear all filters</p>
            </Card>
          )}
        </div>
      </section>

      {/* How Field Reports Support the Platform */}
      <section className="py-16 md:py-20 border-t border-white/10 bg-slate-900/30">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-5xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                <Link2 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">How Field Reports Support the Platform</h2>
            </div>

            <p className="text-lg text-slate-400 mb-10 leading-relaxed">
              Field reports, surveys, technical assessments, and monitoring bulletins may support evidence layers, district profiles, 
              module intelligence, alerts, risk interpretation, and library collections depending on type, relevance, and review status.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="glass-intense border-white/10 p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center flex-shrink-0">
                    <Database className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Library Collections</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Monthly bulletins, annual summaries, and technical reports are catalogued in the Library with tagging, 
                      cross-references, and searchability for researchers and analysts.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="glass-intense border-white/10 p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Monitoring Overview</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Field reports feed the Monitoring Overview with verified observations, trend data, and longitudinal 
                      assessments across air quality, water systems, and biodiversity indicators.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="glass-intense border-white/10 p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Risk Updates & Alerts</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Risk assessments and fire season reports directly inform the Alerts & Advisories system, 
                      triggering early warnings and mitigation recommendations for vulnerable districts.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="glass-intense border-white/10 p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">District Profiles</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      District-specific reports build localized environmental intelligence profiles, enabling 
                      targeted conservation efforts and resource management at the district level.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="glass-intense border-white/10 p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Module Intelligence</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      Wildlife surveys feed Biodiversity modules, wetland assessments feed Water Systems, 
                      and fire risk reports feed Risk & Monitoring—creating interconnected intelligence layers.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="glass-intense border-white/10 p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Evidence & Verification</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      All reports undergo review and verification processes. Status labels indicate confidence levels, 
                      supporting transparent and traceable environmental intelligence.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
