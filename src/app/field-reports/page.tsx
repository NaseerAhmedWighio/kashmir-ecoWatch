'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { FileText, MapPin, Calendar, ArrowRight, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const reports = [
  { id: 'fr-1', title: 'Monthly Environmental Bulletin - March 2024', type: 'Monthly Report', author: 'EcoWatch Team', date: '2024-03-25', pages: 42 },
  { id: 'fr-2', title: 'Winter Wildlife Survey 2023-24', type: 'Field Report', author: 'Wildlife Dept', date: '2024-03-15', pages: 78 },
  { id: 'fr-3', title: 'Wetland Health Assessment - Dal-Nigeen', type: 'Technical Report', author: 'LAWDA', date: '2024-03-10', pages: 56 },
  { id: 'fr-4', title: 'Forest Fire Season Preview 2024', type: 'Risk Assessment', author: 'Forest Dept', date: '2024-03-01', pages: 34 },
];

export default function FieldReportsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      <section className="relative pt-20 md:pt-48 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/50 via-orange-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <Badge variant="warning" size="lg">Field Documentation</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Field <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Reports</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Field reports, survey findings, and technical assessments from
              environmental monitoring and conservation activities across Kashmir
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reports.map((r, i) => (
              <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-amber-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-white mb-1">{r.title}</h3>
                      <div className="text-sm text-slate-400 mb-2">{r.author} • {r.date}</div>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                        <Badge variant="outline" size="sm">{r.type}</Badge>
                        <span>{r.pages} pages</span>
                      </div>
                      <Button size="sm" variant="outline" className="border-white/20 text-white h-9" icon={<Download className="w-4 h-4" />}>
                        Download PDF
                      </Button>
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
