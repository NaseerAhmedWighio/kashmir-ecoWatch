'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Bird, MapPin, ArrowRight, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const birdingTrails = [
  { id: 'bt-1', name: 'Hokersar Wetland Trail', district: 'Srinagar', distance: 4, species: '150+', bestSeason: 'Oct - Mar', highlights: ['Migratory Waterfowl', 'Wetland Birds', 'Photography Blinds'] },
  { id: 'bt-2', name: 'Wular Lake Bird Trail', district: 'Bandipora', distance: 6, species: '200+', bestSeason: 'Sep - Apr', highlights: ['Ramsar Site', 'Large Water Bodies', 'Winter Migrants'] },
  { id: 'bt-3', name: 'Dachigam Bird Walk', district: 'Srinagar', distance: 3, species: '120+', bestSeason: 'Apr - Sep', highlights: ['Forest Birds', 'Endemic Species', 'Breeding Season'] },
];

export default function BirdingTrailsPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      <section className="relative pt-48 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-950/50 via-blue-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-2xl">
                <Bird className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Prime Birdwatching Routes</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Birding <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">Trails</span></h1>
            <p className="text-xl text-slate-400 mb-8">Prime birdwatching routes through Kashmir's wetlands, forests, and migratory corridors</p>
            <Button size="lg" className="bg-gradient-to-r from-sky-500 to-blue-600" onClick={() => router.push('/trails-sightings')}><ArrowRight className="w-5 h-5 mr-2" />Back to Trails</Button>
          </motion.div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {birdingTrails.map((trail, i) => (
              <motion.div key={trail.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-intense border-white/10 hover:border-sky-500/30 transition-all p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center"><Bird className="w-6 h-6 text-white" /></div>
                    <div><h3 className="text-lg font-bold text-white">{trail.name}</h3><div className="text-xs text-slate-500">{trail.district}</div></div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm text-slate-400 mb-3">
                    <span>{trail.distance} km</span><span>{trail.species} species</span><span>{trail.bestSeason}</span>
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
