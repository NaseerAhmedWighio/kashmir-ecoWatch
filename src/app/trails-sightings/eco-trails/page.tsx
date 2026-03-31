'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Trees, MapPin, ArrowRight, Leaf, Book } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const ecoTrails = [
  {
    id: 'et-1',
    name: 'Dachigam Interpretive Trail',
    district: 'Srinagar',
    distance: 3.5,
    duration: '2 hours',
    difficulty: 'easy' as const,
    theme: 'Conservation Education',
    description: 'Educational trail through Dachigam showcasing Hangul habitat and conservation efforts',
    highlights: ['Hangul Habitat', 'Conservation Zones', 'Interpretive Signage', 'Guided Tours']
  },
  {
    id: 'et-2',
    name: 'Shalimar Bagh Ecological Walk',
    district: 'Srinagar',
    distance: 2,
    duration: '1 hour',
    difficulty: 'easy' as const,
    theme: 'Mughal Gardens Ecology',
    description: 'Historic Mughal garden showcasing traditional water management and horticulture',
    highlights: ['Mughal Architecture', 'Water Channels', 'Native Plants', 'Historical Ecology']
  },
  {
    id: 'et-3',
    name: 'Manasbal Lake Circuit',
    district: 'Ganderbal',
    distance: 8,
    duration: '3 hours',
    difficulty: 'easy' as const,
    theme: 'Lake Ecosystem',
    description: 'Circular trail around Manasbal Lake showcasing wetland ecology and bird habitats',
    highlights: ['Wetland Ecology', 'Bird Watching', 'Lotus Blooms', 'Village Views']
  },
];

export default function EcoTrailsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      <section className="relative pt-48 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-950/50 via-emerald-950/30 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-2xl">
                <Trees className="w-8 h-8 text-white" />
              </div>
              <Badge variant="success" size="lg">Nature-Focused Routes</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Eco <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">Trails</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Nature-focused trails highlighting Kashmir's ecological diversity,
              conservation areas, and environmental education opportunities
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-green-500 to-emerald-600" onClick={() => router.push('/trails-sightings')}>
                <ArrowRight className="w-5 h-5 mr-2" />
                Back to Trails & Sightings
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ecoTrails.map((trail, index) => (
              <motion.div key={trail.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: index * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-green-500/30 transition-all p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{trail.name}</h3>
                      <div className="text-xs text-slate-500">{trail.district}</div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 mb-3">{trail.description}</p>
                  <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                    <span>{trail.distance} km</span>
                    <span>{trail.duration}</span>
                    <Badge variant="outline" size="sm">{trail.difficulty}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {trail.highlights.map((h, i) => (
                      <Badge key={i} variant="outline" size="sm" className="text-xs border-white/10">{h}</Badge>
                    ))}
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
