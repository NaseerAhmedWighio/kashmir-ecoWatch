'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Flower2, Calendar, MapPin, Leaf, ArrowRight, Search, Sprout } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { getPhenologyRecords, PhenologyRecord } from '@/data/seasonal-ecology';

const recordTypeColors: Record<string, string> = {
  flowering: 'bg-pink-500/20 text-pink-300',
  'leaf-emergence': 'bg-green-500/20 text-green-300',
  'fruit-set': 'bg-amber-500/20 text-amber-300',
  'leaf-fall': 'bg-orange-500/20 text-orange-300',
  'bird-arrival': 'bg-sky-500/20 text-sky-300',
  'bird-departure': 'bg-blue-500/20 text-blue-300',
  breeding: 'bg-emerald-500/20 text-emerald-300',
  migration: 'bg-violet-500/20 text-violet-300',
  hibernation: 'bg-slate-500/20 text-slate-300',
};

export default function PhenologyFloweringPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterDistrict, setFilterDistrict] = useState<string>('all');

  const records = getPhenologyRecords();
  const recordTypes = [...new Set(records.map(r => r.recordType))];
  const districts = [...new Set(records.flatMap(r => r.districts))];

  const filteredRecords = records.filter(r => {
    if (filterType !== 'all' && r.recordType !== filterType) return false;
    if (filterDistrict !== 'all' && !r.districts.includes(filterDistrict as any)) return false;
    if (searchQuery && !r.title.toLowerCase().includes(searchQuery.toLowerCase()) && !(r.speciesCommonName || '').toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const floweringCount = records.filter(r => r.recordType === 'flowering').length;
  const birdArrivalCount = records.filter(r => r.recordType === 'bird-arrival' || r.recordType === 'bird-departure').length;
  const breedingCount = records.filter(r => r.recordType === 'breeding').length;

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      <div className="relative pt-20 md:pt-32 pb-12 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-emerald-900/10 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Flower2 className="w-6 h-6 text-pink-400" />
              <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">Biodiversity Intelligence</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Phenology & Flowering Records</h1>
            <p className="text-lg text-slate-400 mb-6">
              Flowering timing, seasonal observations, first bloom observations, and climate-linked phenology records across Kashmir.
            </p>
            <Button size="lg" variant="outline" className="border-white/20 text-white" icon={<Calendar className="w-5 h-5" />} onClick={() => router.push('/biodiversity/seasonal-activity')}>
              View Seasonal Activity
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-6 relative z-20">
        <Card className="glass-intense border-white/10 p-5" padding="none">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Total Records', value: records.length, icon: Calendar },
              { label: 'Flowering Events', value: floweringCount, icon: Flower2, color: 'text-pink-400' },
              { label: 'Bird Arrival/Departure', value: birdArrivalCount, icon: Leaf, color: 'text-sky-400' },
              { label: 'Breeding Records', value: breedingCount, icon: Sprout, color: 'text-emerald-400' },
              { label: 'Districts', value: districts.length, icon: MapPin },
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-3 border-r border-white/5 last:border-r-0">
                <stat.icon className={`w-5 h-5 ${'color' in stat ? (stat as any).color : 'text-pink-400'} mx-auto mb-1`} />
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Search + Filters */}
        <Card className="border border-white/10 bg-slate-900/50 mb-8" padding="md">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input type="text" placeholder="Search records..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder:text-slate-500 outline-none focus:border-pink-500/50" />
            </div>
            <select value={filterType} onChange={e => setFilterType(e.target.value)} className="px-3 py-2 text-sm rounded-lg bg-slate-800/50 border border-white/10 text-white outline-none">
              <option value="all">All Types</option>
              {recordTypes.map(t => <option key={t} value={t}>{t.replace(/-/g, ' ')}</option>)}
            </select>
            <select value={filterDistrict} onChange={e => setFilterDistrict(e.target.value)} className="px-3 py-2 text-sm rounded-lg bg-slate-800/50 border border-white/10 text-white outline-none">
              <option value="all">All Districts</option>
              {districts.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </Card>

        {/* Records Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecords.map((r, i) => (
            <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Card className="border border-white/10 bg-slate-900/30 hover:bg-slate-900/50 transition-all h-full" padding="md">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white text-sm">{r.title}</h3>
                    {r.speciesCommonName && <div className="text-xs text-slate-500">{r.speciesCommonName}</div>}
                  </div>
                  <Badge className={`text-xs ${recordTypeColors[r.recordType] || 'bg-slate-700/50 text-slate-300'}`}>
                    {r.recordType.replace(/-/g, ' ')}
                  </Badge>
                </div>

                <div className="space-y-2 text-xs text-slate-400">
                  <div className="flex items-center gap-1"><MapPin className="w-3 h-3" />{r.districts.slice(0, 3).join(', ')}</div>
                  <div>
                    <span className="text-slate-500">Timing:</span>{' '}
                    <span className="text-slate-300">Month {r.observedTiming.startMonth}–{r.observedTiming.endMonth}</span>
                    {r.observedTiming.peakMonths && r.observedTiming.peakMonths.length > 0 && (
                      <span className="text-slate-500"> (Peak: {r.observedTiming.peakMonths.map(m => new Date(2026, m-1).toLocaleString('default', {month:'short'})).join(', ')})</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-500">Status:</span>
                    <Badge className="text-xs bg-slate-700/50 text-slate-300 capitalize">{r.verificationStatus.replace('-', ' ')}</Badge>
                    {r.climateSensitivity && (
                      <Badge className="text-xs bg-amber-500/20 text-amber-300 capitalize">Climate: {r.climateSensitivity}</Badge>
                    )}
                  </div>
                  {r.dataSources.length > 0 && (
                    <div className="text-slate-500">Sources: {r.dataSources.slice(0, 2).join(', ')}</div>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredRecords.length === 0 && (
          <Card className="border border-white/10 bg-slate-900/30 text-center py-12" padding="md">
            <Flower2 className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No records found</h3>
            <p className="text-sm text-slate-400">Try adjusting your search or filters.</p>
          </Card>
        )}
      </div>

      <AdvancedFooter />
    </main>
  );
}
