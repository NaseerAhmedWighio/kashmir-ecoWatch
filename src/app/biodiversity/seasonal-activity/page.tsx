'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Calendar, Bird, Mountain, Fish, Flower2, ArrowRight, Activity, Clock, Sprout } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { getSpeciesActivities, SpeciesActivity } from '@/data/seasonal-ecology';

const taxonIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  mammals: Mountain,
  birds: Bird,
  plants: Sprout,
  insects: Activity,
  amphibians: Fish,
  fish: Fish,
};

const activityTypeColors: Record<string, string> = {
  breeding: 'bg-emerald-500/20 text-emerald-300',
  migration: 'bg-sky-500/20 text-sky-300',
  flowering: 'bg-pink-500/20 text-pink-300',
  fruiting: 'bg-amber-500/20 text-amber-300',
  foraging: 'bg-orange-500/20 text-orange-300',
  hibernation: 'bg-slate-500/20 text-slate-300',
  'visibility-peak': 'bg-violet-500/20 text-violet-300',
};

export default function SeasonalActivityPage() {
  const router = useRouter();
  const [filterTaxon, setFilterTaxon] = useState<string>('all');
  const [filterActivity, setFilterActivity] = useState<string>('all');

  const activities = getSpeciesActivities();
  const taxa = [...new Set(activities.map(a => a.taxonomicGroup))];
  const activityTypes = [...new Set(activities.map(a => a.activityType))];

  const filteredActivities = activities.filter(a => {
    if (filterTaxon !== 'all' && a.taxonomicGroup !== filterTaxon) return false;
    if (filterActivity !== 'all' && a.activityType !== filterActivity) return false;
    return true;
  });

  const breedingCount = activities.filter(a => a.activityType === 'breeding').length;
  const migrationCount = activities.filter(a => a.activityType === 'migration').length;
  const floweringCount = activities.filter(a => a.activityType === 'flowering').length;

  // Monthly activity heatmap
  const monthlyCounts = Array(12).fill(0).map((_, mi) => {
    const month = mi + 1;
    return activities.filter(a => a.peakMonths.includes(month)).length;
  });
  const maxMonthly = Math.max(...monthlyCounts, 1);

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      <div className="relative pt-20 md:pt-32 pb-12 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-emerald-900/10 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-6 h-6 text-violet-400" />
              <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">Biodiversity Intelligence</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Seasonal Species Activity</h1>
            <p className="text-lg text-slate-400 mb-6">
              Breeding periods, activity windows, appearance/disappearance timing, altitudinal movement cues, and seasonal behavior notes.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" variant="outline" className="border-white/20 text-white" icon={<Clock className="w-5 h-5" />} onClick={() => router.push('/biodiversity/migration-windows')}>
                Migration Windows
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white" icon={<Flower2 className="w-5 h-5" />} onClick={() => router.push('/biodiversity/phenology-flowering')}>
                Phenology Records
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-6 relative z-20">
        <Card className="glass-intense border-white/10 p-5" padding="none">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Activity Records', value: activities.length, icon: Calendar },
              { label: 'Breeding Periods', value: breedingCount, icon: Flower2, color: 'text-emerald-400' },
              { label: 'Migration Events', value: migrationCount, icon: Bird, color: 'text-sky-400' },
              { label: 'Taxa Covered', value: taxa.length, icon: Mountain },
              { label: 'Peak Month Activity', value: Math.max(...monthlyCounts), icon: Activity, color: 'text-amber-400' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-3 border-r border-white/5 last:border-r-0">
                <stat.icon className={`w-5 h-5 ${'color' in stat ? (stat as any).color : 'text-violet-400'} mx-auto mb-1`} />
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Monthly Heatmap */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Monthly Activity Heatmap</h2>
          <div className="grid grid-cols-12 gap-1">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, mi) => (
              <div key={month} className="text-center">
                <div className="text-xs text-slate-400 mb-1">{month}</div>
                <div className="h-20 bg-slate-900/50 rounded border border-white/5 relative overflow-hidden">
                  <div
                    className="absolute bottom-0 w-full bg-violet-500/30 transition-all"
                    style={{ height: `${(monthlyCounts[mi] / maxMonthly) * 100}%` }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-medium">
                    {monthlyCounts[mi]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <Card className="border border-white/10 bg-slate-900/50 mb-8" padding="md">
          <div className="flex flex-wrap gap-4">
            <select value={filterTaxon} onChange={e => setFilterTaxon(e.target.value)} className="px-3 py-2 text-sm rounded-lg bg-slate-800/50 border border-white/10 text-white outline-none">
              <option value="all">All Taxa</option>
              {taxa.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
            <select value={filterActivity} onChange={e => setFilterActivity(e.target.value)} className="px-3 py-2 text-sm rounded-lg bg-slate-800/50 border border-white/10 text-white outline-none">
              <option value="all">All Activity Types</option>
              {activityTypes.map(t => <option key={t} value={t}>{t.replace(/-/g, ' ')}</option>)}
            </select>
          </div>
        </Card>

        {/* Activity Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((a, i) => {
            const IconComponent = taxonIcons[a.taxonomicGroup] || Activity;
            return (
              <motion.div key={a.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <Card className="border border-white/10 bg-slate-900/30 hover:bg-slate-900/50 transition-all h-full" padding="md">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center shrink-0">
                      <IconComponent className="w-5 h-5 text-violet-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white text-sm">{a.speciesName}</h3>
                      <div className="text-xs text-slate-500">{a.speciesCommonName}</div>
                    </div>
                    <Badge className={`text-xs ${activityTypeColors[a.activityType] || 'bg-slate-700/50 text-slate-300'}`}>
                      {a.activityType.replace(/-/g, ' ')}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-xs text-slate-400">
                    <div>
                      <span className="text-slate-500">Activity Window:</span>{' '}
                      <span className="text-slate-300">Month {a.activityWindow.startMonth}–{a.activityWindow.endMonth}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Peak:</span>{' '}
                      <span className="text-slate-300">{a.peakMonths.map(m => new Date(2026, m-1).toLocaleString('default', {month:'short'})).join(', ')}</span>
                    </div>
                    <div><span className="text-slate-500">Districts:</span> {a.districts.slice(0, 3).join(', ')}</div>
                    <div><span className="text-slate-500">Habitats:</span> {a.habitatTypes.slice(0, 2).join(', ')}</div>
                    {a.protectedAreas && a.protectedAreas.length > 0 && (
                      <div><span className="text-slate-500">Protected Areas:</span> {a.protectedAreas.slice(0, 2).join(', ')}</div>
                    )}
                    {a.conservationContext && (
                      <p className="text-slate-500 line-clamp-2 mt-1">{a.conservationContext}</p>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      <AdvancedFooter />
    </main>
  );
}
