'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Shield, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const protectedAreaTrails = [
  { id: 'pat-1', name: 'Dachigam NP Trail', district: 'Srinagar', distance: 12, type: 'National Park', highlights: ['Hangul Habitat', 'Forest Walks', 'Wildlife Viewing'] },
  { id: 'pat-2', name: 'Hemis NP Trek', district: 'Leh', distance: 35, type: 'National Park', highlights: ['Snow Leopard', 'High Altitude', 'Trans-Himalayan'] },
  { id: 'pat-3', name: 'Overa-Aru WLS Trail', district: 'Anantnag', distance: 18, type: 'Wildlife Sanctuary', highlights: ['Musk Deer', 'Dense Forests', 'Bird Watching'] },
];

export default function ProtectedAreaTrailsPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/50 via-orange-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <Badge variant="warning" size="lg">Conservation Areas</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Protected <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Area Trails</span></h1>
            <p className="text-xl text-slate-400 mb-8">Trails within national parks, wildlife sanctuaries, and conservation reserves</p>
            <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600" onClick={() => router.push('/trails-sightings')}><ArrowRight className="w-5 h-5 mr-2" />Back to Trails</Button>
          </motion.div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {protectedAreaTrails.map((trail, i) => (
              <motion.div key={trail.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-intense border-white/10 hover:border-amber-500/30 transition-all p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center"><Shield className="w-6 h-6 text-white" /></div>
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
