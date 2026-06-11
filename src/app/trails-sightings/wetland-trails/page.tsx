'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Droplets, MapPin, ArrowRight, Waves } from 'lucide-react';
import { motion } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import { useRouter } from 'next/navigation';

const wetlandTrails = [
  { id: 'wt-1', name: 'Hokersar Circuit', district: 'Srinagar', distance: 5, type: 'Wetland Reserve', highlights: ['Marsh Ecology', 'Bird Sanctuaries', 'Reedbeds'] },
  { id: 'wt-2', name: 'Shalbugh Wetland Walk', district: 'Budgam', distance: 4, type: 'Ramsar-linked', highlights: ['Lotus Blooms', 'Waterfowl', 'Traditional Fishing'] },
  { id: 'wt-3', name: 'Mirgund Lake Trail', district: 'Srinagar', distance: 3, type: 'Urban Wetland', highlights: ['Lake Views', 'Bird Watching', 'Photography'] },
];

export default function WetlandTrailsPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title={<>Wetland <span className="text-emerald-400">Trails</span></>}
        subtitle="Trails around Kashmir's marshes, lakes, and wetland ecosystems"
        icon={
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-2xl">
            <Droplets className="w-5 h-5 md:w-8 md:h-8 text-white" />
          </div>
        }
        badge={<Badge variant="info" size="lg">Wetland Ecosystems</Badge>}
        actions={
          <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600" onClick={() => router.push('/trails-sightings')}><ArrowRight className="w-5 h-5 mr-2" />Back to Trails</Button>
        }
      />
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wetlandTrails.map((trail, i) => (
              <motion.div key={trail.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-intense border-white/10 hover:border-cyan-500/30 transition-all p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center"><Waves className="w-6 h-6 text-white" /></div>
                    <div><h3 className="text-lg font-bold text-white">{trail.name}</h3><div className="text-xs text-slate-500">{trail.district} • {trail.type}</div></div>
                  </div>
                  <div className="text-sm text-slate-400 mb-3">{trail.distance} km circuit</div>
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
