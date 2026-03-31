'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Flower2, MapPin, Calendar, ArrowRight, Camera, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const plantSightings = [
  { id: 'ps-1', species: 'Blue Poppy', scientificName: 'Meconopsis aculeata', type: 'Alpine Flower', location: 'Kolahoi Base', district: 'Anantnag', date: '2024-03-20', observer: 'Botanist', verified: true },
  { id: 'ps-2', species: 'Lady Slipper Orchid', scientificName: 'Cypripedium himalaicum', type: 'Orchid', location: 'Gulmarg', district: 'Baramulla', date: '2024-03-18', observer: 'Researcher', verified: true },
  { id: 'ps-3', species: 'Saussurea', scientificName: 'Saussurea obvallata', type: 'Medicinal', location: 'Harmukh', district: 'Ganderbal', date: '2024-03-15', observer: 'Herbalist', verified: false },
];

export default function PlantPhenologySightingsPage() {
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
              <Badge variant="info" size="lg">Plant Lifecycle Records</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Plant & <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">Phenology Sightings</span></h1>
            <p className="text-xl text-slate-400 mb-8">Flowering records, leaf-out observations, and seasonal plant lifecycle documentation</p>
            <Button size="lg" className="bg-gradient-to-r from-pink-500 to-rose-600" onClick={() => router.push('/trails-sightings')}><ArrowRight className="w-5 h-5 mr-2" />Back to Trails</Button>
          </motion.div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plantSightings.map((sighting, i) => (
              <motion.div key={sighting.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-pink-500/30 transition-all p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{sighting.species}</h3>
                      <div className="text-xs text-slate-500 italic">{sighting.scientificName}</div>
                    </div>
                    <Badge variant="outline" size="sm">{sighting.type}</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-slate-400 mb-3">
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-pink-400" />{sighting.location}, {sighting.district}</div>
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-pink-400" />{new Date(sighting.date).toLocaleDateString()}</div>
                    <div className="flex items-center gap-2"><Leaf className="w-4 h-4 text-pink-400" />{sighting.observer}</div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <Badge variant={sighting.verified ? 'success' : 'info'} size="sm">{sighting.verified ? 'Verified' : 'Unverified'}</Badge>
                    <Button size="sm" variant="outline" className="border-white/20 text-white h-8">Details</Button>
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
