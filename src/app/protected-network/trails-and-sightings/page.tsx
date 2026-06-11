'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Footprints, Eye, MapPin, ArrowRight, Search, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { getTrails } from '@/data/protected-network';
import { Heading } from '@/components/common/Heading';

export default function TrailsAndSightingsPage() {
  const trails = getTrails.all();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'success';
      case 'Moderate': return 'warning';
      case 'Challenging': return 'danger';
      default: return 'default';
    }
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title={<><span className="block whitespace-nowrap">Trails and</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Sightings</span></>}
        subtitle="Protected area trails, eco-routes, birding paths, and verified wildlife observations logged across Kashmir. Field records are reviewed and linked to protected area and species profiles."
        icon={<Footprints className="w-6 h-6 text-amber-400" />}
        label="Recreation & Observation"
        breadcrumbs={[{ label: 'Trails & Sightings' }]}
        images={['/images/protected-network.png', '/images/bear.png', '/images/tiger.png', '/images/markhor.png']}
        actions={
          <>
            <Button className="bg-gradient-to-r from-amber-600 to-amber-500" icon={<Search className="w-5 h-5" />}>
              Search Trails
            </Button>
            <Button variant="outline" className="border-white/20 text-white" icon={<Eye className="w-5 h-5" />}>
              View All Sightings
            </Button>
          </>
        }
      />

      {/* Metrics */}
      <div className="container mx-auto px-6 -mt-8 relative z-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass-intense border-white/10 p-6" padding="none">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Protected Area Trails', value: trails.length },
                { label: 'Birding Routes', value: trails.filter(t => t.type === 'Birding Trail').length },
                { label: 'Verified Sightings', value: '4,521' },
                { label: 'Active Observers', value: '156' },
              ].map((metric, idx) => (
                <div key={idx} className="text-center p-4 border-r border-white/5 last:border-r-0">
                  <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-sm text-slate-500 uppercase">{metric.label}</div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12 space-y-8">
        {/* Trails Grid */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Protected Area Trails</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trails.map((trail, index) => (
              <motion.a
                key={trail.id}
                href={`/protected-network/trails-and-sightings/${trail.slug}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="block group"
              >
                <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="info" size="sm">{trail.type}</Badge>
                        <Badge variant={getDifficultyColor(trail.difficulty)} size="sm">{trail.difficulty}</Badge>
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">{trail.name}</h3>
                      <p className="text-sm text-slate-400">{trail.protectedArea}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-slate-400 mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      Length: <strong className="text-white">{trail.length}</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      Wildlife: <strong className="text-white">{trail.wildlife.length} species</strong>
                    </span>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition-colors text-sm font-medium text-white">
                      View Trail Details
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Card>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Recent Sightings */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Verified Sightings</h2>
            <Button variant="ghost" size="sm" className="text-amber-400" icon={<ArrowRight className="w-4 h-4" />}>
              View All
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {trails.flatMap(t => t.wildlife.slice(0, 1)).map((species, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                      <Eye className="w-5 h-5 text-amber-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white truncate capitalize">{species.replace(/-/g, ' ')}</div>
                      <div className="text-xs text-slate-400">Verified sighting</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Recent
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      
    </main>
  );
}
