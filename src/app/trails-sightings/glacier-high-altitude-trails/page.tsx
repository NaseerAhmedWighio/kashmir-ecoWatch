'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Snowflake, MapPin, ArrowRight, Mountain } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const glacierTrails = [
  { id: 'ght-1', name: 'Kolahoi Glacier Approach', district: 'Anantnag', distance: 18, elevation: 4500, highlights: ['Glacier Views', 'High Altitude', 'Technical Terrain'] },
  { id: 'ght-2', name: 'Harmukh Glacier Trek', district: 'Ganderbal', distance: 22, elevation: 5142, highlights: ['Sacred Peak', 'Glacial Lake', 'Challenging Route'] },
  { id: 'ght-3', name: 'Sheshnag Glacier Walk', district: 'Anantnag', distance: 14, elevation: 3800, highlights: ['Alpine Lake', 'Glacier Views', 'Pilgrimage Route'] },
];

export default function GlacierHighAltitudeTrailsPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      <section className="relative pt-48 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-800/50 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center shadow-2xl">
                <Snowflake className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">High Elevation Routes</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Glacier & <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-slate-500">High Altitude Trails</span></h1>
            <p className="text-xl text-slate-400 mb-8">High-elevation routes to glaciers, snowfields, and trans-Himalayan landscapes</p>
            <Button size="lg" className="bg-gradient-to-r from-slate-500 to-slate-600" onClick={() => router.push('/trails-sightings')}><ArrowRight className="w-5 h-5 mr-2" />Back to Trails</Button>
          </motion.div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {glacierTrails.map((trail, i) => (
              <motion.div key={trail.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-intense border-white/10 hover:border-slate-500/30 transition-all p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center"><Mountain className="w-6 h-6 text-white" /></div>
                    <div><h3 className="text-lg font-bold text-white">{trail.name}</h3><div className="text-xs text-slate-500">{trail.district}</div></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-slate-400 mb-3">
                    <span>{trail.distance} km</span><span>{trail.elevation}m elevation</span>
                  </div>
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
