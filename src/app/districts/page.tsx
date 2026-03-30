'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Map, MapPin, TrendingUp, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const districts = [
  { id: 'd1', name: 'Srinagar', area: '2228 km²', population: '1.27M', tehsils: 8, riskScore: 72 },
  { id: 'd2', name: 'Anantnag', area: '3574 km²', population: '1.08M', tehsils: 12, riskScore: 75 },
  { id: 'd3', name: 'Baramulla', area: '4243 km²', population: '1.01M', tehsils: 11, riskScore: 68 },
  { id: 'd4', name: 'Budgam', area: '1371 km²', population: '755K', tehsils: 8, riskScore: 65 },
  { id: 'd5', name: 'Ganderbal', area: '2742 km²', population: '297K', tehsils: 7, riskScore: 82 },
  { id: 'd6', name: 'Kulgam', area: '410 km²', population: '424K', tehsils: 6, riskScore: 70 },
  { id: 'd7', name: 'Kupwara', area: '2379 km²', population: '875K', tehsils: 9, riskScore: 74 },
  { id: 'd8', name: 'Pulwama', area: '1090 km²', population: '560K', tehsils: 7, riskScore: 67 },
  { id: 'd9', name: 'Ramban', area: '1330 km²', population: '283K', tehsils: 6, riskScore: 78 },
  { id: 'd10', name: 'Leh', area: '45110 km²', population: '147K', tehsils: 4, riskScore: 58 },
  { id: 'd11', name: 'Kargil', area: '21664 km²', population: '140K', tehsils: 5, riskScore: 62 },
  { id: 'd12', name: 'Doda', area: '8961 km²', population: '410K', tehsils: 10, riskScore: 71 },
];

export default function DistrictsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-teal-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl">
                <Map className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Administrative Profiles</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              District <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Profiles</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Comprehensive district-level profiles with demographic, geographic,
              and environmental risk data for all districts of Jammu & Kashmir
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {districts.map((d, i) => (
              <motion.div key={d.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-emerald-500/30 transition-all p-5 cursor-pointer group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-emerald-400" />
                      <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">{d.name}</h3>
                    </div>
                    <Badge variant={d.riskScore > 70 ? 'danger' : d.riskScore > 60 ? 'warning' : 'info'} size="sm">
                      Risk: {d.riskScore}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm text-slate-400">
                    <div className="flex items-center justify-between">
                      <span>Area</span>
                      <span className="text-white">{d.area}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Population</span>
                      <span className="text-white">{d.population}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Tehsils</span>
                      <span className="text-white">{d.tehsils}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <Button size="sm" variant="outline" className="border-white/20 text-white w-full h-9" onClick={() => router.push(`/districts/${d.id}`)}>
                      View Profile
                    </Button>
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
