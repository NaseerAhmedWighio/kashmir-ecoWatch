'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Book, FileText, ArrowRight, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const reports = [
  { id: 'rr-1', title: 'Trails of Kashmir: A Comprehensive Guide', type: 'Field Guide', year: 2023, author: 'Dr. Kumar Foundation', pages: 248, downloads: 1247 },
  { id: 'rr-2', title: 'Wildlife Sightings Annual Report 2023', type: 'Annual Report', year: 2024, author: 'Wildlife Dept', pages: 156, downloads: 892 },
  { id: 'rr-3', title: 'Bird Migration Patterns in Kashmir Wetlands', type: 'Research Paper', year: 2023, author: 'Ornithology Society', pages: 42, downloads: 534 },
  { id: 'rr-4', title: 'Trail Maintenance Best Practices', type: 'Technical Manual', year: 2022, author: 'Tourism Dept', pages: 78, downloads: 421 },
];

export default function ReportsReferencesPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/50 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center shadow-2xl">
                <Book className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Documentation & Research</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Reports & <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-500">References</span></h1>
            <p className="text-xl text-slate-400 mb-8">Scientific reports, field guides, research papers, and reference materials for trails and wildlife</p>
            <Button size="lg" className="bg-gradient-to-r from-slate-500 to-slate-600" onClick={() => router.push('/trails-sightings')}><ArrowRight className="w-5 h-5 mr-2" />Back to Trails</Button>
          </motion.div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map((report, i) => (
              <motion.div key={report.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-slate-500/30 transition-all p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">{report.title}</h3>
                      <div className="text-sm text-slate-400 mb-2">{report.author} • {report.year}</div>
                      <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                        <span>{report.pages} pages</span>
                        <span>{report.downloads} downloads</span>
                        <Badge variant="outline" size="sm">{report.type}</Badge>
                      </div>
                      <Button size="sm" variant="outline" className="border-white/20 text-white h-9" icon={<Download className="w-4 h-4" />}>Download PDF</Button>
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
