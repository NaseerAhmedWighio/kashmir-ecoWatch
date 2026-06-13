'use client';

import React, { useState } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';
import {
  MapPin, Bird, Eye, Mountain, ArrowRight, Filter, Clock, Shield, Footprints
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { trailIntelligenceData, TrailIntelligence, KashmirDistrict, AccessStatus, Difficulty, Season } from '@/data/trails-sightings';

const accessStatusColors: Record<AccessStatus, string> = {
  open: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  restricted: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  closed: 'bg-red-500/20 text-red-300 border-red-500/30',
  'permit-required': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
};

const difficultyColors: Record<Difficulty, string> = {
  easy: 'bg-green-500/20 text-green-300',
  moderate: 'bg-yellow-500/20 text-yellow-300',
  difficult: 'bg-orange-500/20 text-orange-300',
  technical: 'bg-red-500/20 text-red-300',
};

export default function BirdingHotspotsPage() {
  const router = useRouter();
  const [filterDistrict, setFilterDistrict] = useState<KashmirDistrict | 'all'>('all');
  const [filterAccess, setFilterAccess] = useState<AccessStatus | 'all'>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | 'all'>('all');
  const [filterSeason, setFilterSeason] = useState<Season | 'all'>('all');

  // Filter for birding and wildlife observation trails
  const birdingTrails = trailIntelligenceData.filter(t =>
    t.category === 'birding' ||
    t.category === 'wetland' ||
    t.relatedSpecies.some(s => s.includes('bird') || s.includes('wetland'))
  );

  const filteredTrails = birdingTrails.filter(t => {
    if (filterDistrict !== 'all' && !t.district.includes(filterDistrict)) return false;
    if (filterAccess !== 'all' && t.accessStatus !== filterAccess) return false;
    if (filterDifficulty !== 'all' && t.difficulty !== filterDifficulty) return false;
    if (filterSeason !== 'all' && !t.seasonWindow.optimal.some(m => {
      const seasonMap: Record<Season, string[]> = {
        spring: ['March', 'April', 'May'],
        summer: ['June', 'July', 'August'],
        autumn: ['September', 'October', 'November'],
        winter: ['December', 'January', 'February'],
      };
      return seasonMap[filterSeason]?.includes(m);
    })) return false;
    return true;
  });

  const districts: KashmirDistrict[] = ['Srinagar', 'Anantnag', 'Kulgam', 'Pulwama', 'Shopian', 'Budgam', 'Baramulla', 'Kupwara', 'Ganderbal', 'Bandipora', 'Kishtwar', 'Doda', 'Ramban', 'Rajouri', 'Poonch', 'Kathua'];

  const openCount = birdingTrails.filter(t => t.accessStatus === 'open').length;
  const restrictedCount = birdingTrails.filter(t => t.accessStatus === 'restricted' || t.accessStatus === 'permit-required').length;

  return (
    <main className="min-h-screen bg-slate-950">{/* Hero */}
      <div className="relative pt-20 sm:pt-24 md:pt-28 lg:pt-48 pb-4 sm:pb-8 md:pb-12 lg:pb-20 overflow-hidden bg-[#160C27]">
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-6 h-6 text-teal-400" />
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-400">
                Biodiversity Intelligence
              </span>
            </div>
            <h1 className="max-w-xl text-4xl md:text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 sm:mb-6 leading-tight tracking-tight">
              Birding & Observation Hotspots
            </h1>
            <p className="text-lg text-slate-400 mb-6">
              Prime birding routes, wildlife observation points, and habitat-linked watch zones across Kashmir.
              Season-sensitive observation areas with best-time guidance.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3">
              <Button
                size="lg"
                className="bg-gradient-to-r from-teal-600 to-teal-500"
                icon={<MapPin className="w-5 h-5" />}
                onClick={() => router.push('/biodiversity/wildlife-sightings')}
              >
                View Wildlife Sightings
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white"
                icon={<Eye className="w-5 h-5" />}
                onClick={() => router.push('/submit-sighting')}
              >
                Submit Observation
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="container mx-auto px-6 -mt-6 relative z-20">
        <Card className="glass-intense border-white/10 p-5" padding="none">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Total Hotspots', value: birdingTrails.length, icon: MapPin, color: 'text-white' },
              { label: 'Birding Routes', value: birdingTrails.filter(t => t.category === 'birding').length, icon: Bird, color: 'text-teal-400' },
              { label: 'Wetland Hotspots', value: birdingTrails.filter(t => t.category === 'wetland').length, icon: Eye, color: 'text-sky-400' },
              { label: 'Open Access', value: openCount, icon: Shield, color: 'text-emerald-400' },
              { label: 'Restricted', value: restrictedCount, icon: Filter, color: 'text-amber-400' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-3 border-r border-white/5 last:border-r-0">
                <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-1`} />
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-6 py-8">
        <Card className="border border-white/10 bg-slate-900/50 mb-8" padding="md">
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center">
            <Select
              value={filterDistrict}
              onChange={(value) => setFilterDistrict(value as KashmirDistrict | 'all')}
              options={[
                { value: 'all', label: 'All Districts' },
                ...districts.map(d => ({ value: d, label: d })),
              ]}
            />
            <Select
              value={filterAccess}
              onChange={(value) => setFilterAccess(value as AccessStatus | 'all')}
              options={[
                { value: 'all', label: 'All Access' },
                { value: 'open', label: 'Open' },
                { value: 'restricted', label: 'Restricted' },
                { value: 'permit-required', label: 'Permit Required' },
                { value: 'closed', label: 'Closed' },
              ]}
            />
            <Select
              value={filterDifficulty}
              onChange={(value) => setFilterDifficulty(value as Difficulty | 'all')}
              options={[
                { value: 'all', label: 'All Difficulties' },
                { value: 'easy', label: 'Easy' },
                { value: 'moderate', label: 'Moderate' },
                { value: 'difficult', label: 'Difficult' },
                { value: 'technical', label: 'Technical' },
              ]}
            />
            <Select
              value={filterSeason}
              onChange={(value) => setFilterSeason(value as Season | 'all')}
              options={[
                { value: 'all', label: 'All Seasons' },
                { value: 'spring', label: 'Spring' },
                { value: 'summer', label: 'Summer' },
                { value: 'autumn', label: 'Autumn' },
                { value: 'winter', label: 'Winter' },
              ]}
            />
          </div>
        </Card>

        {/* Hotspots Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 xl:gap-6">
          {filteredTrails.map((trail, index) => (
            <motion.div
              key={trail.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="border border-white/10 bg-slate-900/30 hover:bg-slate-900/50 hover:border-teal-500/30 transition-all h-full" padding="md">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white mb-1">{trail.name}</h3>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <MapPin className="w-3 h-3" />
                      {trail.district.join(', ')}
                    </div>
                  </div>
                  <Badge className={`text-xs border ${accessStatusColors[trail.accessStatus]}`}>
                    {trail.accessStatus.replace('-', ' ')}
                  </Badge>
                </div>

                <div className="space-y-3 text-sm">
                  {/* Season Window */}
                  <div>
                    <div className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Optimal Season
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {trail.seasonWindow.optimal.slice(0, 4).map(m => (
                        <Badge key={m} variant="default" className="text-xs bg-teal-500/20 text-teal-300">{m}</Badge>
                      ))}
                      {trail.seasonWindow.optimal.length > 4 && (
                        <Badge variant="default" className="text-xs bg-slate-700/50 text-slate-300">+{trail.seasonWindow.optimal.length - 4}</Badge>
                      )}
                    </div>
                  </div>

                  {/* Habitats */}
                  <div className="flex flex-wrap gap-1">
                    {trail.habitat.slice(0, 3).map(h => (
                      <Badge key={h} variant="default" className="text-xs bg-slate-700/50 text-slate-300 capitalize">{h.replace('-', ' ')}</Badge>
                    ))}
                  </div>

                  {/* Trail Info */}
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                    <div>
                      <span className="text-slate-500">Difficulty:</span>{' '}
                      <Badge className={difficultyColors[trail.difficulty]}>{trail.difficulty}</Badge>
                    </div>
                    <div>
                      <span className="text-slate-500">Length:</span> {trail.length.value} {trail.length.unit}
                    </div>
                    <div>
                      <span className="text-slate-500">Duration:</span> {trail.duration.min}-{trail.duration.max} {trail.duration.unit}
                    </div>
                    <div>
                      <span className="text-slate-500">Observers:</span> {trail.observerActivity.totalObservers}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="pt-2 border-t border-white/5">
                    <div className="text-xs text-slate-500 mb-1">Key Features</div>
                    <div className="flex flex-wrap gap-1">
                      {trail.features.slice(0, 3).map(f => (
                        <span key={f} className="text-xs text-slate-400 bg-white/5 px-2 py-0.5 rounded">{f}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5">
                  <button
                    onClick={() => router.push(`/biodiversity`)}
                    className="text-xs text-teal-400 hover:text-teal-300 flex items-center gap-1 transition-colors"
                  >
                    View Details <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredTrails.length === 0 && (
          <Card className="border border-white/10 bg-slate-900/30 text-center py-12" padding="md">
            <MapPin className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No hotspots match your filters</h3>
            <p className="text-sm text-slate-400">Try adjusting your filter criteria.</p>
          </Card>
        )}
      </div>

      
    </main>
  );
}
