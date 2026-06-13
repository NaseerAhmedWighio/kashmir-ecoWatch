'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Flower2, MapPin, ArrowRight, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
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
      <Heading
        title={<>Bloom <span className="text-emerald-400">Trails</span></>}
        subtitle="Seasonal flower trails showcasing Kashmir's wildflower diversity and bloom calendars"
        icon={
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-2xl">
            <Flower2 className="w-5 h-5 md:w-8 md:h-8 text-white" />
          </div>
        }
        badge={<Badge variant="info" size="lg">Seasonal Flower Routes</Badge>}
        actions={
          <Button size="lg" className="bg-gradient-to-r from-pink-500 to-rose-600" onClick={() => router.push('/trails-sightings')}><ArrowRight className="w-5 h-5 mr-2" />Back to Trails</Button>
        }
        breadcrumbs={[{ label: 'Trails & Sightings', href: '/trails-sightings' }, { label: 'Bloom Trails' }]}
      />
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 xl:gap-6">
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
      
    </main>
  );
}
