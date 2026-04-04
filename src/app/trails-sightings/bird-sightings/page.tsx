'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Bird, MapPin, Calendar, ArrowRight, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const birdSightings = [
  { id: 'bs-1', species: 'Himalayan Monal', scientificName: 'Lophophorus impejanus', status: 'LC', location: 'Gulmarg', district: 'Baramulla', date: '2024-03-26', observer: 'Birdwatcher', verified: true },
  { id: 'bs-2', species: 'Kashmir Flycatcher', scientificName: 'Ficedula subrubra', status: 'VU', location: 'Dachigam NP', district: 'Srinagar', date: '2024-03-25', observer: 'Researcher', verified: true },
  { id: 'bs-3', species: 'Western Tragopan', scientificName: 'Tragopan melanocephalus', status: 'VU', location: 'Overa-Aru WLS', district: 'Anantnag', date: '2024-03-24', observer: 'Forest Guard', verified: true },
  { id: 'bs-4', species: 'Lammergeier', scientificName: 'Gypaetus barbatus', status: 'NT', location: 'Zanskar Valley', district: 'Kargil', date: '2024-03-23', observer: 'Trekker', verified: false },
];

export default function BirdSightingsPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-slate-950"><section className="relative pt-48 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-950/50 via-blue-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-2xl">
                <Bird className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Avian Observations</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Bird <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-400">Sightings</span></h1>
            <p className="text-xl text-slate-400 mb-8">Resident and migratory bird observations from across Kashmir's diverse avian habitats</p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-to-r from-sky-500 to-blue-600" onClick={() => router.push('/trails-sightings')}><ArrowRight className="w-5 h-5 mr-2" />Back to Trails</Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white" onClick={() => router.push('/submit-sighting')}><Camera className="w-5 h-5 mr-2" />Submit Sighting</Button>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {birdSightings.map((sighting, i) => (
              <motion.div key={sighting.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-sky-500/30 transition-all p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{sighting.species}</h3>
                      <div className="text-xs text-slate-500 italic">{sighting.scientificName}</div>
                    </div>
                    <Badge variant={sighting.status === 'VU' ? 'warning' : sighting.status === 'NT' ? 'warning' : 'info'} size="sm">{sighting.status}</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-slate-400 mb-3">
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-sky-400" />{sighting.location}, {sighting.district}</div>
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-sky-400" />{new Date(sighting.date).toLocaleDateString()}</div>
                    <div className="flex items-center gap-2"><Bird className="w-4 h-4 text-sky-400" />{sighting.observer}</div>
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
