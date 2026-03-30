'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Shield, Lock, Eye, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const privacyPrinciples = [
  { icon: Lock, title: 'Data Protection', description: 'Personal information is encrypted and stored securely with access controls' },
  { icon: Eye, title: 'Transparency', description: 'Clear communication about what data is collected and how it is used' },
  { icon: Shield, title: 'Minimal Collection', description: 'Only essential data is collected, with clear purpose and consent' },
  { icon: Database, title: 'Limited Retention', description: 'Data is retained only as long as necessary for stated purposes' },
];

export default function PrivacyPage() {
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
                <Shield className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Data Privacy</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Sensitivity & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Privacy</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Commitment to protecting personal information and ensuring ethical
              handling of all data submitted to Kashmir EcoWatch
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {privacyPrinciples.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-intense border-white/10 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center flex-shrink-0">
                      <p.icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white mb-2">{p.title}</h3>
                      <p className="text-sm text-slate-400">{p.description}</p>
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
