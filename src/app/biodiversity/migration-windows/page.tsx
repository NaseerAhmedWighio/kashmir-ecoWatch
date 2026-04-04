'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import {
  Clock, Calendar, MapPin, Bird, ArrowRight, Filter, Eye, Waves
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { getMigrationWindows, MigrationWindow } from '@/data/seasonal-ecology';

export default function MigrationWindowsPage() {
  const router = useRouter();
  const [filterDistrict, setFilterDistrict] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const windows = getMigrationWindows();
  const filteredWindows = windows.filter(w => {
    if (filterDistrict !== 'all' && w.district !== filterDistrict) return false;
    if (filterType !== 'all' && w.migrationType !== filterType) return false;
    return true;
  });

  const currentMonth = new Date().getMonth() + 1;
  const activeWindows = windows.filter(w => w.peakPresenceMonths.includes(currentMonth));

  const districts = [...new Set(windows.map(w => w.district))];
  const migrationTypes = [...new Set(windows.map(w => w.migrationType))];

  const totalEstimatedPop = windows.reduce((sum, w) => {
    const match = w.populationEstimate?.match(/([\d,]+)/);
    return sum + (match ? parseInt(match[1].replace(/,/g, '')) : 0);
  }, 0);

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero */}
      <div className="relative pt-20 md:pt-32 pb-12 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/20 via-blue-900/10 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-6 h-6 text-sky-400" />
              <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">Biodiversity Intelligence</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Migration Windows</h1>
            <p className="text-lg text-slate-400 mb-6">
              Migratory bird timing across Kashmir wetlands — resident vs migratory patterns,
              district timing differences, and current migration status.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="bg-gradient-to-r from-sky-600 to-sky-500" icon={<Bird className="w-5 h-5" />} onClick={() => router.push('/biodiversity/wildlife-sightings')}>
                View Related Sightings
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white" icon={<Eye className="w-5 h-5" />} onClick={() => router.push('/submit-sighting')}>
                Submit Sighting
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="container mx-auto px-6 -mt-6 relative z-20">
        <Card className="glass-intense border-white/10 p-5" padding="none">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Total Windows', value: windows.length, icon: Clock },
              { label: 'Active Now', value: activeWindows.length, icon: Bird, color: 'text-emerald-400' },
              { label: 'Wetland Sites', value: windows.length, icon: Waves },
              { label: 'Est. Population', value: totalEstimatedPop > 1000 ? `${(totalEstimatedPop / 1000).toFixed(0)}K+` : `${totalEstimatedPop}+`, icon: Eye },
              { label: 'Migration Types', value: migrationTypes.length, icon: Calendar },
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-3 border-r border-white/5 last:border-r-0">
                <stat.icon className={`w-5 h-5 ${'color' in stat ? (stat as any).color : 'text-sky-400'} mx-auto mb-1`} />
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Filters + Grid */}
      <div className="container mx-auto px-6 py-8">
        <Card className="border border-white/10 bg-slate-900/50 mb-8" padding="md">
          <div className="flex flex-wrap gap-4">
            <select value={filterDistrict} onChange={e => setFilterDistrict(e.target.value)} className="px-3 py-2 text-sm rounded-lg bg-slate-800/50 border border-white/10 text-white outline-none">
              <option value="all">All Districts</option>
              {districts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <select value={filterType} onChange={e => setFilterType(e.target.value)} className="px-3 py-2 text-sm rounded-lg bg-slate-800/50 border border-white/10 text-white outline-none">
              <option value="all">All Types</option>
              {migrationTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWindows.map((w, i) => (
            <motion.div key={w.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="border border-white/10 bg-slate-900/30 hover:bg-slate-900/50 hover:border-sky-500/30 transition-all h-full" padding="md">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-white text-sm">{w.name}</h3>
                    <div className="text-xs text-slate-500 flex items-center gap-1"><MapPin className="w-3 h-3" />{w.district}</div>
                  </div>
                  <Badge className="text-xs bg-sky-500/20 text-sky-300 capitalize">{w.migrationType}</Badge>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <div className="text-slate-500 mb-1">Arrival</div>
                    <div className="text-slate-300">{w.arrivalWindow.description}</div>
                  </div>
                  {w.departureWindow && (
                    <div>
                      <div className="text-slate-500 mb-1">Departure</div>
                      <div className="text-slate-300">{w.departureWindow.description}</div>
                    </div>
                  )}
                  <div>
                    <div className="text-slate-500 mb-1">Peak Presence</div>
                    <div className="flex gap-1 flex-wrap">
                      {w.peakPresenceMonths.map(m => (
                        <Badge key={m} className={`text-xs ${m === currentMonth ? 'bg-emerald-500/30 text-emerald-200' : 'bg-slate-700/50 text-slate-300'}`}>
                          {new Date(2026, m - 1).toLocaleString('default', { month: 'short' })}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {w.populationEstimate && (
                    <div className="text-slate-400">Population: <span className="text-white">{w.populationEstimate}</span></div>
                  )}
                  <div className="text-slate-500 line-clamp-2">{w.primarySpecies.slice(0, 4).join(', ')}</div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5">
                  <button onClick={() => router.push('/biodiversity/wildlife-sightings')} className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1">
                    View Sightings <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <AdvancedFooter />
    </main>
  );
}
