'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Map, TrendingUp, ArrowRight, Search, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { getCorridors } from '@/data/protected-network';

export default function CorridorsPage() {
  const router = useRouter();
  const corridors = getCorridors.all();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'danger';
      case 'High': return 'warning';
      case 'Medium': return 'info';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Degraded': return 'warning';
      case 'Threatened': return 'danger';
      default: return 'default';
    }
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      <div className="pt-24 pb-12 container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <button onClick={() => router.push('/protected-network')} className="hover:text-white transition-colors">
              Protected Network
            </button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Corridors & Connectivity</span>
          </nav>

          <div className="flex items-center gap-2 mb-4">
            <Map className="w-6 h-6 text-pink-400" />
            <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">Ecological Intelligence</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">Corridors & Connectivity</h1>
          <p className="text-xl text-slate-400 mb-8">Landscape continuity, movement value, and habitat linkage analysis for wildlife conservation</p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-gradient-to-r from-pink-600 to-pink-500" icon={<Search className="w-5 h-5" />}>Search Corridors</Button>
            <Button variant="outline" className="border-white/20 text-white" icon={<Map className="w-5 h-5" />}>Connectivity Map</Button>
          </div>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Identified Corridors', value: corridors.length },
            { label: 'Critical Priority', value: corridors.filter(c => c.priority === 'Critical').length },
            { label: 'Total Length', value: '287 km' },
            { label: 'Active Status', value: corridors.filter(c => c.status === 'Active').length },
          ].map((metric, idx) => (
            <Card key={idx} className="glass-light border-white/5 p-6" padding="none">
              <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-sm text-slate-500 uppercase">{metric.label}</div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6">
          {corridors.map((corridor, index) => (
            <motion.a
              key={corridor.id}
              href={`/protected-network/corridors-and-connectivity/${corridor.slug}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="block group"
            >
              <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-white group-hover:text-pink-300 transition-colors">{corridor.name}</h3>
                      <Badge variant={getPriorityColor(corridor.priority)} size="sm">
                        {corridor.priority} Priority
                      </Badge>
                      <Badge variant={getStatusColor(corridor.status)} size="sm">
                        {corridor.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-slate-400">
                      <span>Type: <strong className="text-white">{corridor.type}</strong></span>
                      <span>Length: <strong className="text-white">{corridor.length}</strong></span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-pink-400 group-hover:text-pink-300 transition-colors" icon={<ArrowRight className="w-4 h-4" />} />
                </div>
              </Card>
            </motion.a>
          ))}
        </div>
      </div>

      <AdvancedFooter />
    </main>
  );
}
