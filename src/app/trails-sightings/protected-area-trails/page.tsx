'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Shield, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
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
      <Heading
        title={<>Protected <span className="text-emerald-400">Area Trails</span></>}
        subtitle="Trails within national parks, wildlife sanctuaries, and conservation reserves"
        icon={
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl">
            <Shield className="w-5 h-5 md:w-8 md:h-8 text-white" />
          </div>
        }
        badge={<Badge variant="warning" size="lg">Conservation Areas</Badge>}
        actions={
          <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600" onClick={() => router.push('/trails-sightings')}><ArrowRight className="w-5 h-5 mr-2" />Back to Trails</Button>
        }
        breadcrumbs={[{ label: 'Trails & Sightings', href: '/trails-sightings' }, { label: 'Protected Area Trails' }]}
      />
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 xl:gap-6">
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
      
    </main>
  );
}
