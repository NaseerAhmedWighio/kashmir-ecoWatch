'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Flower2, MapPin, ArrowRight, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const bloomTrails = [
  { id: 'blt-1', name: 'Tulip Garden Trail', district: 'Srinagar', distance: 2, season: 'March - April', highlights: ['Tulip Varieties', 'Lake Views', 'Photography'] },
  { id: 'blt-2', name: 'Kokernag Flower Walk', district: 'Anantnag', distance: 3, season: 'April - June', highlights: ['Botanical Gardens', 'Trout Streams', 'Terraced Gardens'] },
  { id: 'blt-3', name: 'Yusmarg Alpine Bloom', district: 'Budgam', distance: 5, season: 'May - July', highlights: ['Alpine Flowers', 'Meadow Views', 'Picnic Spots'] },
];

export default function BloomTrailsPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      <section className="relative pt-48 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-950/50 via-rose-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-2xl">
                <Flower2 className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Seasonal Flower Routes</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Bloom <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">Trails</span></h1>
            <p className="text-xl text-slate-400 mb-8">Seasonal flower trails showcasing Kashmir's wildflower diversity and bloom calendars</p>
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-rose-600" onClick={() => router.push('/trails-sightings')}><ArrowRight className="w-5 h-5 mr-2" />Back to Trails</Button>
          </motion.div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bloomTrails.map((trail, i) => (
              <motion.div key={trail.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-intense border-white/10 hover:border-pink-500/30 transition-all p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center"><Sun className="w-6 h-6 text-white" /></div>
                    <div><h3 className="text-lg font-bold text-white">{trail.name}</h3><div className="text-xs text-slate-500">{trail.district}</div></div>
                  </div>
                  <div className="text-sm text-slate-400 mb-3">{trail.distance} km • {trail.season}</div>
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
