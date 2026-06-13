'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Bird, MapPin, Calendar, ArrowRight, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
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
    <main className="min-h-screen bg-slate-950">
      <Heading
        title={<>Bird <span className="text-emerald-400">Sightings</span></>}
        subtitle="Resident and migratory bird observations from across Kashmir's diverse avian habitats"
        icon={
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shadow-2xl">
            <Bird className="w-5 h-5 md:w-8 md:h-8 text-white" />
          </div>
        }
        badge={<Badge variant="info" size="lg">Avian Observations</Badge>}
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Button size="lg" className="bg-gradient-to-r from-sky-500 to-blue-600" onClick={() => router.push('/trails-sightings')}><ArrowRight className="w-5 h-5 mr-2" />Back to Trails</Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white" onClick={() => router.push('/submit-sighting')}><Camera className="w-5 h-5 mr-2" />Submit Sighting</Button>
          </div>
        }
        breadcrumbs={[{ label: 'Trails & Sightings', href: '/trails-sightings' }, { label: 'Bird Sightings' }]}
      />
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 xl:gap-6">
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
      
    </main>
  );
}
