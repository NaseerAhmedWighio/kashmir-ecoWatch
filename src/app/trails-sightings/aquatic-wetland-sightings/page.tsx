'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Droplets, MapPin, Calendar, ArrowRight, Camera, Fish } from 'lucide-react';
import { motion } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import { useRouter } from 'next/navigation';

const aquaticSightings = [
  { id: 'as-1', species: 'Brown Trout', scientificName: 'Salmo trutta', type: 'Fish', location: 'Lidder River', district: 'Anantnag', date: '2024-03-22', observer: 'Angler', verified: true },
  { id: 'as-2', species: 'Snow Trout', scientificName: 'Schizothorax richardsonii', type: 'Native Fish', location: 'Jhelum River', district: 'Srinagar', date: '2024-03-20', observer: 'Researcher', verified: true },
  { id: 'as-3', species: 'Kashmir Frog', scientificName: 'Nanorana vicina', type: 'Amphibian', location: 'Wular Lake', district: 'Bandipora', date: '2024-03-18', observer: 'Student', verified: false },
];

export default function AquaticWetlandSightingsPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title={<>Aquatic & <span className="text-emerald-400">Wetland Sightings</span></>}
        subtitle="Fish, amphibians, aquatic plants, and wetland-dependent species observations"
        icon={
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl">
            <Droplets className="w-5 h-5 md:w-8 md:h-8 text-white" />
          </div>
        }
        badge={<Badge variant="info" size="lg">Aquatic Species</Badge>}
        actions={
          <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600" onClick={() => router.push('/trails-sightings')}><ArrowRight className="w-5 h-5 mr-2" />Back to Trails</Button>
        }
      />
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aquaticSightings.map((sighting, i) => (
              <motion.div key={sighting.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-cyan-500/30 transition-all p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{sighting.species}</h3>
                      <div className="text-xs text-slate-500 italic">{sighting.scientificName}</div>
                    </div>
                    <Badge variant="outline" size="sm">{sighting.type}</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-slate-400 mb-3">
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-cyan-400" />{sighting.location}, {sighting.district}</div>
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-cyan-400" />{new Date(sighting.date).toLocaleDateString()}</div>
                    <div className="flex items-center gap-2"><Fish className="w-4 h-4 text-cyan-400" />{sighting.observer}</div>
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
