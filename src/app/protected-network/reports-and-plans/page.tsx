'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { FileText, Download, ArrowRight, Search, Filter, Book, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { getReports } from '@/data/protected-network';

export default function ReportsPage() {
  const router = useRouter();
  const reports = getReports.all();

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Management Plan': return 'from-emerald-500 to-emerald-600';
      case 'Scientific Report': return 'from-purple-500 to-purple-600';
      case 'Monitoring Data': return 'from-blue-500 to-blue-600';
      case 'Assessment': return 'from-amber-500 to-amber-600';
      case 'Atlas': return 'from-pink-500 to-pink-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      <div className="pt-48 pb-12 container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <button onClick={() => router.push('/protected-network')} className="hover:text-white transition-colors">
              Protected Network
            </button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Reports & Plans</span>
          </nav>

          <div className="flex items-center gap-2 mb-4">
            <Book className="w-6 h-6 text-amber-400" />
            <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">Evidence & Documentation</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">Reports & Management Plans</h1>
          <p className="text-xl text-slate-400 mb-8">Scientific reports, management plans, monitoring documents, and research publications</p>
          <div className="flex flex-wrap gap-4">
            <div className="relative">
              <input type="text" placeholder="Search reports..." className="w-64 px-4 py-2.5 pl-10 rounded-lg glass-light border border-white/10 focus:border-amber-500/50 outline-none text-sm text-white placeholder-slate-500" />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
            <Button variant="outline" className="border-white/20 text-white" icon={<Filter className="w-4 h-4" />}>Filters</Button>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Documents', value: reports.length },
            { label: 'Management Plans', value: reports.filter(r => r.type === 'Management Plan').length },
            { label: 'Scientific Reports', value: reports.filter(r => r.type === 'Scientific Report').length },
            { label: 'Monitoring Data', value: reports.filter(r => r.type === 'Monitoring Data').length },
          ].map((metric, idx) => (
            <Card key={idx} className="glass-light border-white/5 p-6" padding="none">
              <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-sm text-slate-500 uppercase">{metric.label}</div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6">
          {reports.map((report, index) => (
            <motion.a
              key={report.id}
              href={`/protected-network/reports-and-plans/${report.slug}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="block group"
            >
              <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getTypeColor(report.type)} bg-opacity-20 flex items-center justify-center flex-shrink-0`}>
                      <FileText className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">{report.title}</h3>
                        <Badge variant="info" size="sm" className="capitalize">{report.type}</Badge>
                        <Badge variant="default" size="sm">{report.year}</Badge>
                      </div>
                      <p className="text-sm text-slate-400 mb-3">{report.description}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>Authors: <strong className="text-slate-300">{report.authors.slice(0, 2).join(', ')}{report.authors.length > 2 ? ' + more' : ''}</strong></span>
                      </div>
                      {report.linkedAreas && report.linkedAreas.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {report.linkedAreas.slice(0, 3).map((area, idx) => (
                            <Badge key={idx} variant="default" size="sm">
                              {area.replace(/-/g, ' ')}
                            </Badge>
                          ))}
                          {report.linkedAreas.length > 3 && (
                            <Badge variant="default" size="sm">
                              +{report.linkedAreas.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="border-white/20 text-white group-hover:border-amber-500/50 transition-colors" icon={<Download className="w-4 h-4" />}>
                    Download
                  </Button>
                </div>
              </Card>
            </motion.a>
          ))}
        </div>
      </div>

      <AdvancedFooter />
    </main>
  );
}
