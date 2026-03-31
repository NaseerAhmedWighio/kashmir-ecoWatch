'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Database, ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const dataSources = [
  { category: 'Government Agencies', sources: ['J&K Forest Department', 'MoEFCC', 'IMD', 'CPCB', 'Survey of India'] },
  { category: 'Research Institutions', sources: ['Wildlife Institute of India', 'Botanical Survey of India', 'Zoological Survey of India'] },
  { category: 'International Databases', sources: ['IUCN Red List', 'GBIF', ' Ramsar Sites Information System'] },
  { category: 'Field Data', sources: ['Citizen Science Contributions', 'Research Surveys', 'Monitoring Networks'] },
];

export default function DataSourcesPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      <section className="relative pt-20 md:pt-28 pb-16 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-teal-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl">
                <Database className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Data Provenance</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Data <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Sources</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              All environmental data on Kashmir EcoWatch is sourced from verified
              government agencies, research institutions, and field monitoring networks
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dataSources.map((group, i) => (
              <motion.div key={group.category} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-intense border-white/10 p-6">
                  <h3 className="text-lg font-bold text-white mb-4">{group.category}</h3>
                  <ul className="space-y-2">
                    {group.sources.map((source, j) => (
                      <li key={source} className="flex items-center gap-2 text-sm text-slate-400">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        {source}
                      </li>
                    ))}
                  </ul>
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
