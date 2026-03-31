'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Target, Eye, Heart, ArrowRight, Globe, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function MissionPage() {
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
                <Target className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Our Purpose</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Mission</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              To empower conservation and sustainable development in Kashmir through
              comprehensive environmental intelligence, scientific rigor, and community engagement
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="glass-intense border-white/10 p-8 h-full">
                <Eye className="w-10 h-10 text-emerald-400 mb-4" />
                <h2 className="text-2xl font-bold text-white mb-4">Vision</h2>
                <p className="text-slate-400 leading-relaxed">
                  A Kashmir where environmental decisions are informed by accurate, accessible,
                  and comprehensive scientific data, ensuring the preservation of our natural
                  heritage for future generations while supporting sustainable livelihoods.
                </p>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <Card className="glass-intense border-white/10 p-8 h-full">
                <Heart className="w-10 h-10 text-emerald-400 mb-4" />
                <h2 className="text-2xl font-bold text-white mb-4">Values</h2>
                <ul className="text-slate-400 space-y-2">
                  <li>• Scientific integrity and rigor</li>
                  <li>• Transparency and accountability</li>
                  <li>• Community engagement and inclusion</li>
                  <li>• Conservation-first approach</li>
                  <li>• Collaborative partnerships</li>
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Strategic Goals</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Data Excellence', description: 'Build and maintain the most comprehensive environmental database for Kashmir' },
              { title: 'Public Access', description: 'Ensure free and open access to environmental information for all stakeholders' },
              { title: 'Scientific Collaboration', description: 'Foster partnerships with research institutions and government agencies' },
            ].map((goal, i) => (
              <motion.div key={goal.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-light border-white/10 p-6">
                  <h3 className="text-lg font-bold text-white mb-3">{goal.title}</h3>
                  <p className="text-sm text-slate-400">{goal.description}</p>
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
