'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Trees, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const forestMeadowTrails = [
  { id: 'fmt-1', name: 'Aru Valley Meadow Walk', district: 'Anantnag', distance: 6, type: 'Alpine Marg', highlights: ['Pastoral Landscapes', 'Wildflowers', 'Mountain Views'] },
  { id: 'fmt-2', name: 'Betaab Valley Forest Trail', district: 'Anantnag', distance: 4, type: 'Coniferous Forest', highlights: ['Pine Forests', 'Film Location', 'Picnic Areas'] },
  { id: 'fmt-3', name: 'Yusmarg Circuit', district: 'Budgam', distance: 8, type: 'Meadow Complex', highlights: ['Alpine Meadows', 'Doodhganga River', 'Horse Riding'] },
];

export default function ForestMeadowTrailsPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-lime-950/50 via-green-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lime-500 to-green-600 flex items-center justify-center shadow-2xl">
                <Trees className="w-8 h-8 text-white" />
              </div>
              <Badge variant="success" size="lg">Forests & Alpine Meadows</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Forest & <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-400">Meadow Trails</span></h1>
            <p className="text-xl text-slate-400 mb-8">Trails through dense forests and expansive alpine meadows (margs)</p>
            <Button size="lg" className="bg-gradient-to-r from-lime-500 to-green-600" onClick={() => router.push('/trails-sightings')}><ArrowRight className="w-5 h-5 mr-2" />Back to Trails</Button>
          </motion.div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forestMeadowTrails.map((trail, i) => (
              <motion.div key={trail.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-intense border-white/10 hover:border-lime-500/30 transition-all p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-lime-500 to-green-600 flex items-center justify-center"><Trees className="w-6 h-6 text-white" /></div>
                    <div><h3 className="text-lg font-bold text-white">{trail.name}</h3><div className="text-xs text-slate-500">{trail.district} • {trail.type}</div></div>
                  </div>
                  <div className="text-sm text-slate-400 mb-3">{trail.distance} km</div>
                  <div className="flex flex-wrap gap-1">{trail.highlights.map((h, j) => <Badge key={j} variant="outline" size="sm" className="text-xs border-white/10">{h}</Badge>)}</div>
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
