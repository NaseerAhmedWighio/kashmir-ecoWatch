'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Users, Globe, Heart, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const partners = [
  { name: 'Dr. Kumar Foundation USA', type: 'Primary Supporter', description: 'Providing foundational support for environmental intelligence initiatives' },
  { name: 'J&K Forest Department', type: 'Government Partner', description: 'Collaboration on conservation and forest monitoring' },
  { name: 'Wildlife Institute of India', type: 'Research Partner', description: 'Scientific collaboration on biodiversity assessment' },
  { name: 'MoEFCC', type: 'Government Partner', description: 'Ministry of Environment, Forest and Climate Change' },
  { name: 'Local NGOs', type: 'Community Partners', description: 'Grassroots conservation organizations across Kashmir' },
  { name: 'Research Institutions', type: 'Academic Partners', description: 'Universities and research centers supporting data collection' },
];

export default function PartnersPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      <section className="relative pt-20 md:pt-48 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-teal-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl">
                <Users className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Collaboration Network</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Partners</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Kashmir EcoWatch works in collaboration with government agencies,
              research institutions, and community organizations to advance
              environmental conservation
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner, i) => (
              <motion.div key={partner.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 p-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mb-4">
                    {partner.type.includes('Government') ? <Globe className="w-5 h-5 text-emerald-400" /> : partner.type.includes('Research') || partner.type.includes('Academic') ? <Heart className="w-5 h-5 text-emerald-400" /> : <Users className="w-5 h-5 text-emerald-400" />}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{partner.name}</h3>
                  <Badge variant="outline" size="sm" className="mb-3">{partner.type}</Badge>
                  <p className="text-sm text-slate-400">{partner.description}</p>
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
