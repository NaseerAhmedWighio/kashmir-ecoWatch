'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Database, Upload, FileText, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const contributionTypes = [
  { icon: Database, title: 'Research Data', description: 'Share research datasets, survey results, and monitoring data', route: '/contribute-data' },
  { icon: Upload, title: 'Field Observations', description: 'Submit field notes, species sightings, and ecological records', route: '/submit-sighting' },
  { icon: FileText, title: 'Reports & Documents', description: 'Contribute technical reports, management plans, and publications', route: '/library' },
];

export default function ContributeDataPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-teal-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl">
                <Database className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Data Contribution</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Contribute <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Data</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Share your research data, field observations, and environmental
              documentation to strengthen Kashmir's conservation intelligence
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contributionTypes.map((type, i) => (
              <motion.div key={type.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-intense border-white/10 p-6 cursor-pointer hover:border-emerald-500/30 transition-all" onClick={() => router.push(type.route)}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mb-4">
                    <type.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{type.title}</h3>
                  <p className="text-sm text-slate-400 mb-4">{type.description}</p>
                  <div className="flex items-center text-xs font-medium text-emerald-400">
                    <span>Contribute</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
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
