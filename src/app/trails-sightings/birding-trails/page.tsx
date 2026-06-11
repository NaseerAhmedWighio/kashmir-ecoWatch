'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Bird, MapPin, ArrowRight, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
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
      <Heading
        title={<>Birding <span className="text-emerald-400">Trails</span></>}
        subtitle="Prime birdwatching routes through Kashmir's wetlands, forests, and migratory corridors"
        icon={
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-2xl">
            <Bird className="w-5 h-5 md:w-8 md:h-8 text-white" />
          </div>
        }
        badge={<Badge variant="info" size="lg">Prime Birdwatching Routes</Badge>}
        actions={
          <Button size="lg" className="bg-gradient-to-r from-sky-500 to-blue-600" onClick={() => router.push('/trails-sightings')}><ArrowRight className="w-5 h-5 mr-2" />Back to Trails</Button>
        }
      />
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
      
    </main>
  );
}
