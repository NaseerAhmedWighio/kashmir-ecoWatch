'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Layers, AlertTriangle, MapPin, ArrowRight, Leaf, Waves, Mountain } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { getHabitatSignals, HabitatSignal } from '@/data/seasonal-ecology';

const signalTypeColors: Record<string, string> = {
  'wetland-expansion': 'bg-blue-500/20 text-blue-300',
  'wetland-contraction': 'bg-red-500/20 text-red-300',
  'reedbed-growth': 'bg-emerald-500/20 text-emerald-300',
  'forest-green-up': 'bg-green-500/20 text-green-300',
  'forest-senescence': 'bg-amber-500/20 text-amber-300',
  'meadow-emergence': 'bg-lime-500/20 text-lime-300',
  'snow-retreat': 'bg-slate-300/20 text-slate-200',
  'ice-formation': 'bg-cyan-500/20 text-cyan-300',
};

export default function HabitatSignalsPage() {
  const router = useRouter();
  const signals = getHabitatSignals();
  const districts = [...new Set(signals.flatMap(s => s.districts))];
  const signalTypes = [...new Set(signals.map(s => s.signalType))];
  const elevationZones = [...new Set(signals.map(s => s.elevationZone))];

  const activeSignals = signals.filter(s => {
    const currentMonth = new Date().getMonth() + 1;
    return currentMonth >= s.seasonalTiming.startMonth && currentMonth <= s.seasonalTiming.endMonth;
  });

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      <div className="relative pt-20 md:pt-32 pb-12 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-amber-900/10 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-6 h-6 text-emerald-400" />
              <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">Biodiversity Intelligence</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Habitat Signals</h1>
            <p className="text-lg text-slate-400 mb-6">
              Habitat stress, seasonal transitions, use patterns, and suitability shifts across Kashmir's ecosystems.
            </p>
            <Button size="lg" variant="outline" className="border-white/20 text-white" icon={<AlertTriangle className="w-5 h-5" />} onClick={() => router.push('/biodiversity/district-profiles')}>
              View District Profiles
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-6 relative z-20">
        <Card className="glass-intense border-white/10 p-5" padding="none">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Total Signals', value: signals.length, icon: Layers },
              { label: 'Active Now', value: activeSignals.length, icon: AlertTriangle, color: 'text-amber-400' },
              { label: 'Districts Monitored', value: districts.length, icon: MapPin },
              { label: 'Habitat Types', value: signalTypes.length, icon: Leaf },
              { label: 'Critical Alerts', value: signals.filter(s => s.signalType.includes('contraction') || s.signalType.includes('retreat')).length, icon: AlertTriangle, color: 'text-red-400' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-3 border-r border-white/5 last:border-r-0">
                <stat.icon className={`w-5 h-5 ${'color' in stat ? (stat as any).color : 'text-emerald-400'} mx-auto mb-1`} />
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Signal Type Breakdown */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Signal Type Breakdown</h2>
          <div className="flex flex-wrap gap-2">
            {signalTypes.map(st => {
              const count = signals.filter(s => s.signalType === st).length;
              return (
                <Badge key={st} className={`${signalTypeColors[st] || 'bg-slate-700/50 text-slate-300'} text-sm`}>
                  {st.replace(/-/g, ' ')}: {count}
                </Badge>
              );
            })}
          </div>
        </div>

        {/* Signals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {signals.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="border border-white/10 bg-slate-900/30 hover:bg-slate-900/50 transition-all h-full" padding="md">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-sm">{s.name}</h3>
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />{s.districts.slice(0, 2).join(', ')}
                    </div>
                  </div>
                  <Badge className={`text-xs ${signalTypeColors[s.signalType] || 'bg-slate-700/50 text-slate-300'}`}>
                    {s.signalType.replace(/-/g, ' ')}
                  </Badge>
                </div>

                <div className="space-y-2 text-xs text-slate-400">
                  <p className="line-clamp-2">{s.description}</p>
                  <div>
                    <span className="text-slate-500">Timing:</span>{' '}
                    <span className="text-slate-300">Month {s.seasonalTiming.startMonth}–{s.seasonalTiming.endMonth}</span>
                  </div>
                  {s.ecologicalDrivers.length > 0 && (
                    <div><span className="text-slate-500">Drivers:</span> <span className="text-slate-300">{s.ecologicalDrivers.slice(0, 3).join(', ')}</span></div>
                  )}
                  {s.climateIndicators.length > 0 && (
                    <div><span className="text-slate-500">Climate:</span> <span className="text-slate-300">{s.climateIndicators.slice(0, 2).join(', ')}</span></div>
                  )}
                  {s.linkedWaterBodies && s.linkedWaterBodies.length > 0 && (
                    <div className="flex items-center gap-1 text-sky-400"><Waves className="w-3 h-3" />{s.linkedWaterBodies.slice(0, 2).join(', ')}</div>
                  )}
                  {s.linkedSpecies && s.linkedSpecies.length > 0 && (
                    <div className="flex items-center gap-1 text-emerald-400"><Mountain className="w-3 h-3" />{s.linkedSpecies.slice(0, 2).join(', ')}</div>
                  )}
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
