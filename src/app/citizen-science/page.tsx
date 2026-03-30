'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Users, Eye, Camera, Book, ArrowRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const opportunities = [
  { icon: Eye, title: 'Wildlife Monitoring', description: 'Track and document wildlife populations and distributions', volunteers: 234 },
  { icon: Camera, title: 'Photo Documentation', description: 'Capture seasonal changes, species, and habitat conditions', volunteers: 189 },
  { icon: Book, title: 'Data Verification', description: 'Help verify and validate submitted observations', volunteers: 67 },
  { icon: Users, title: 'Community Outreach', description: 'Engage local communities in conservation efforts', volunteers: 145 },
];

export default function CitizenSciencePage() {
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
                <Users className="w-8 h-8 text-white" />
              </div>
              <Badge variant="success" size="lg">Community Participation</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Citizen <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Science</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Join a growing community of citizen scientists contributing to
              Kashmir's environmental monitoring and conservation efforts
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600" onClick={() => router.push('/submit-sighting')}>
                Start Contributing
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Ways to Participate</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {opportunities.map((opp, i) => (
              <motion.div key={opp.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-intense border-white/10 p-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mb-4">
                    <opp.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{opp.title}</h3>
                  <p className="text-sm text-slate-400 mb-4">{opp.description}</p>
                  <div className="text-xs text-slate-500">{opp.volunteers} volunteers</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <Card className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border-white/10 overflow-hidden">
            <div className="relative p-12 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-teal-600/20" />
              <div className="relative z-10">
                <Heart className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-white mb-4">Make a Difference</h2>
                <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                  Your observations and contributions help build a comprehensive
                  picture of Kashmir's environment for better conservation decisions
                </p>
                <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600" onClick={() => router.push('/submit-sighting')}>
                  Start Contributing Today
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
