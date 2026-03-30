'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Shield, CheckCircle, Eye, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const verificationLevels = [
  { level: 'Verified', icon: CheckCircle, description: 'Data verified by official sources or domain experts', color: 'text-emerald-400' },
  { level: 'Reviewed', icon: Eye, description: 'Data reviewed by platform moderators for accuracy', color: 'text-amber-400' },
  { level: 'Community', icon: Users, description: 'Community-contributed data pending expert verification', color: 'text-slate-400' },
];

export default function VerificationPage() {
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
              <Badge variant="info" size="lg">Data Quality</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Verification <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Model</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Multi-layer verification process ensuring data accuracy, reliability,
              and trustworthiness across all environmental information
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {verificationLevels.map((v, i) => (
              <motion.div key={v.level} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-intense border-white/10 p-6 text-center">
                  <v.icon className={`w-12 h-12 ${v.color} mx-auto mb-4`} />
                  <h3 className="text-lg font-bold text-white mb-2">{v.level}</h3>
                  <p className="text-sm text-slate-400">{v.description}</p>
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
