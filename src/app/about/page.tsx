'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Leaf, Target, Users, Mail, ArrowRight, Book, Shield, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const missionCards = [
  { icon: Target, title: 'Our Mission', description: 'To provide comprehensive environmental intelligence for conservation and sustainable development in Kashmir', href: '/about/mission' },
  { icon: Users, title: 'Our Team', description: 'A dedicated team of scientists, researchers, and conservationists', href: '/about/partners' },
  { icon: Database, title: 'Data Sources', description: 'Transparent sourcing from government agencies and research institutions', href: '/about/data-sources' },
  { icon: Book, title: 'Methodology', description: 'Rigorous scientific methods and verification processes', href: '/about/methodology' },
  { icon: Shield, title: 'Verification', description: 'Multi-layer verification ensuring data accuracy and reliability', href: '/about/verification' },
  { icon: Leaf, title: 'Privacy', description: 'Commitment to data privacy and ethical information handling', href: '/about/privacy' },
];

export default function AboutPage() {
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
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Institutional Information</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Kashmir EcoWatch</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              A Kashmir Diaspora-Supported Initiative for Environmental Intelligence
              and Scientific Stewardship, supported by Dr. Kumar Foundation USA
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600" onClick={() => router.push('/about/mission')}>
                Our Mission
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white" onClick={() => router.push('/about/contact')}>
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h2 className="text-3xl font-bold text-white mb-6">Learn More About Us</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {missionCards.map((card, i) => (
              <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-emerald-500/30 transition-all p-6 cursor-pointer group" onClick={() => router.push(card.href)}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mb-4">
                    <card.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">{card.title}</h3>
                  <p className="text-sm text-slate-400 mb-4">{card.description}</p>
                  <div className="flex items-center text-xs font-medium text-emerald-400 group-hover:text-emerald-300 transition-colors">
                    <span>Learn More</span>
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
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
