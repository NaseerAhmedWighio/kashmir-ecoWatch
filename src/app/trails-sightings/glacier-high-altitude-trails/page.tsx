'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Snowflake, MapPin, ArrowRight, Mountain } from 'lucide-react';
import { motion } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import { useRouter } from 'next/navigation';

const glacierTrails = [
  { id: 'ght-1', name: 'Kolahoi Glacier Approach', district: 'Anantnag', distance: 18, elevation: 4500, highlights: ['Glacier Views', 'High Altitude', 'Technical Terrain'] },
  { id: 'ght-2', name: 'Harmukh Glacier Trek', district: 'Ganderbal', distance: 22, elevation: 5142, highlights: ['Sacred Peak', 'Glacial Lake', 'Challenging Route'] },
  { id: 'ght-3', name: 'Sheshnag Glacier Walk', district: 'Anantnag', distance: 14, elevation: 3800, highlights: ['Alpine Lake', 'Glacier Views', 'Pilgrimage Route'] },
];

export default function GlacierHighAltitudeTrailsPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title={<>Glacier & <span className="text-emerald-400">High Altitude Trails</span></>}
        subtitle="High-elevation routes to glaciers, snowfields, and trans-Himalayan landscapes"
        icon={
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center shadow-2xl">
            <Snowflake className="w-5 h-5 md:w-8 md:h-8 text-white" />
          </div>
        }
        badge={<Badge variant="info" size="lg">High Elevation Routes</Badge>}
        actions={
          <Button size="lg" className="bg-gradient-to-r from-slate-500 to-slate-600" onClick={() => router.push('/trails-sightings')}><ArrowRight className="w-5 h-5 mr-2" />Back to Trails</Button>
        }
        breadcrumbs={[{ label: 'Trails & Sightings', href: '/trails-sightings' }, { label: 'Glacier High Altitude Trails' }]}
      />
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 xl:gap-6">
            {glacierTrails.map((trail, i) => (
              <motion.div key={trail.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Card className="glass-intense border-white/10 hover:border-slate-500/30 transition-all p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center"><Mountain className="w-6 h-6 text-white" /></div>
                    <div><h3 className="text-lg font-bold text-white">{trail.name}</h3><div className="text-xs text-slate-500">{trail.district}</div></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm text-slate-400 mb-3">
                    <span>{trail.distance} km</span><span>{trail.elevation}m elevation</span>
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
