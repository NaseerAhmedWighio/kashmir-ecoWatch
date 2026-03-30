'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Eye, MapPin, Calendar, ArrowRight, Camera, Filter, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const wildlifeSightings = [
  { id: 'ws-1', species: 'Hangul (Kashmir Stag)', scientificName: 'Cervus hanglu', status: 'CR', location: 'Dachigam National Park', district: 'Srinagar', date: '2024-03-26', observer: 'Dr. A. Rashid', verified: true },
  { id: 'ws-2', species: 'Snow Leopard', scientificName: 'Panthera uncia', status: 'VU', location: 'Hemis National Park', district: 'Leh', date: '2024-03-25', observer: 'Field Team Alpha', verified: true },
  { id: 'ws-3', species: 'Markhor', scientificName: 'Capra falconeri', status: 'NT', location: 'Kajinag Range', district: 'Budgam', date: '2024-03-24', observer: 'Forest Dept', verified: true },
  { id: 'ws-4', species: 'Musk Deer', scientificName: 'Moschus cupreus', status: 'EN', location: 'Overa-Aru WLS', district: 'Anantnag', date: '2024-03-23', observer: 'Citizen Scientist', verified: false },
  { id: 'ws-5', species: 'Brown Bear', scientificName: 'Ursus arctos', status: 'LC', location: 'Gulmarg', district: 'Baramulla', date: '2024-03-22', observer: 'Trekker', verified: true },
  { id: 'ws-6', species: 'Himalayan Wolf', scientificName: 'Canis lupus', status: 'VU', location: 'Gurez Valley', district: 'Bandipora', date: '2024-03-21', observer: 'Local Resident', verified: false },
];

export default function WildlifeSightingsPage() {
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
                <Eye className="w-8 h-8 text-white" />
              </div>
              <Badge variant="warning" size="lg">Mammal Observations</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">Wildlife <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Sightings</span></h1>
            <p className="text-xl text-slate-400 mb-8">Mammal observations including Hangul, Snow Leopard, Markhor, and other iconic species from across Kashmir</p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600" onClick={() => router.push('/trails-sightings')}><ArrowRight className="w-5 h-5 mr-2" />Back to Trails</Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white" onClick={() => router.push('/submit-sighting')}><Camera className="w-5 h-5 mr-2" />Submit Sighting</Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-8 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="border-white/20 text-white" icon={<Filter className="w-4 h-4" />}>Filter</Button>
              <Button variant="outline" size="sm" className="border-white/20 text-white" icon={<Search className="w-4 h-4" />}>Search</Button>
            </div>
            <div className="text-sm text-slate-400"><span className="text-white font-semibold">{wildlifeSightings.length}</span> sightings</div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wildlifeSightings.map((sighting, i) => (
              <motion.div key={sighting.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-amber-500/30 transition-all p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{sighting.species}</h3>
                      <div className="text-xs text-slate-500 italic">{sighting.scientificName}</div>
                    </div>
                    <Badge variant={sighting.status === 'CR' || sighting.status === 'EN' ? 'danger' : sighting.status === 'VU' ? 'warning' : 'info'} size="sm">{sighting.status}</Badge>
                  </div>
                  <div className="space-y-2 text-sm text-slate-400 mb-3">
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-amber-400" />{sighting.location}, {sighting.district}</div>
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-amber-400" />{new Date(sighting.date).toLocaleDateString()}</div>
                    <div className="flex items-center gap-2"><Eye className="w-4 h-4 text-amber-400" />{sighting.observer}</div>
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
