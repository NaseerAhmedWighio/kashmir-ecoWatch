'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MapPin, Calendar, ArrowRight, FileText, ClipboardList } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const fieldRecords = [
  { id: 'fr-1', title: 'Trail Condition Update - Tarsar Marsar', type: 'Trail Report', location: 'Tarsar Marsar Trek', district: 'Anantnag', date: '2024-03-25', author: 'Trek Leader', summary: 'Trail cleared up to 3km, snow line at 3200m' },
  { id: 'fr-2', title: 'Habitat Assessment - Dachigam Lower', type: 'Habitat Notes', location: 'Dachigam NP', district: 'Srinagar', date: '2024-03-23', author: 'Researcher', summary: 'Good vegetation cover, water sources adequate' },
  { id: 'fr-3', title: 'Weather Observation - Gulmarg', type: 'Weather Log', location: 'Gulmarg', district: 'Baramulla', date: '2024-03-22', author: 'Observer', summary: 'Clear skies, visibility excellent, temp 12°C' },
];

export default function TrailFieldRecordsPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-slate-950"><section className="relative pt-48 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-teal-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Field Documentation</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Trail <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Field Records</span></h1>
            <p className="text-xl text-slate-400 mb-8">General field observations, trail conditions, and ecological notes from the field</p>
            <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600" onClick={() => router.push('/trails-sightings')}><ArrowRight className="w-5 h-5 mr-2" />Back to Trails</Button>
          </motion.div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fieldRecords.map((record, i) => (
              <motion.div key={record.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-emerald-500/30 transition-all p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{record.title}</h3>
                      <div className="text-xs text-slate-500">{record.type}</div>
                    </div>
                    <Badge variant="outline" size="sm">{record.type}</Badge>
                  </div>
                  <p className="text-sm text-slate-400 mb-3">{record.summary}</p>
                  <div className="space-y-2 text-sm text-slate-400 mb-3">
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-emerald-400" />{record.location}, {record.district}</div>
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-emerald-400" />{new Date(record.date).toLocaleDateString()}</div>
                    <div className="flex items-center gap-2"><ClipboardList className="w-4 h-4 text-emerald-400" />{record.author}</div>
                  </div>
                  <Button size="sm" variant="outline" className="border-white/20 text-white w-full h-9">View Full Record</Button>
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
