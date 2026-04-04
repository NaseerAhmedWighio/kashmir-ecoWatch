'use client';

import React, { useState, useMemo } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { ReportCard } from '@/components/field-reports/ReportCard';
import { FilterBar } from '@/components/field-reports/FilterBar';
import { SummaryStrip } from '@/components/field-reports/SummaryStrip';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { FileText, BookOpen, Link2, Shield, Database, AlertTriangle, BarChart3, MapPin } from 'lucide-react';
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
