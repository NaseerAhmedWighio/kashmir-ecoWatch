'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Building2, MapPin, Shield, ArrowRight, Bird, Mountain, Fish, Sprout, AlertTriangle, Leaf, Search, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { getDistrictBiodiversity, DistrictBiodiversity } from '@/data/biodiversity-intelligence';
import { biodiversityMetrics } from '@/data/biodiversity';

const riskColors: Record<string, string> = {
  low: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  medium: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  high: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  critical: 'bg-red-500/20 text-red-300 border-red-500/30',
};

const conflictColors: Record<string, string> = {
  low: 'bg-green-500/20 text-green-300',
  medium: 'bg-yellow-500/20 text-yellow-300',
  high: 'bg-orange-500/20 text-orange-300',
  critical: 'bg-red-500/20 text-red-300',
};

export default function DistrictProfilesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const districts = getDistrictBiodiversity.all();

  const filteredDistricts = districts.filter(d =>
    !searchQuery || d.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalSpecies = districts.reduce((sum, d) => sum + d.totalSpecies, 0);
  const avgSpecies = districts.length > 0 ? Math.round(totalSpecies / districts.length) : 0;
  const highestRichness = districts.length > 0 ? [...districts].sort((a, b) => b.totalSpecies - a.totalSpecies)[0] : null;
  const mostThreatened = districts.length > 0 ? [...districts].sort((a, b) => b.threatenedSpecies - a.threatenedSpecies)[0] : null;

  // Top 5 for comparison table
  const top5 = [...districts].sort((a, b) => b.totalSpecies - a.totalSpecies).slice(0, 5);

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      <div className="relative pt-20 md:pt-32 pb-12 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-purple-900/10 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-6 h-6 text-violet-400" />
              <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">Biodiversity Intelligence</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">District Biodiversity Profiles</h1>
            <p className="text-lg text-slate-400 mb-6">
              Regional biodiversity intelligence — species richness, key habitats, sightings volume,
              migration significance, conservation concerns, and data gaps.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-violet-600 to-violet-500" icon={<BarChart3 className="w-5 h-5" />} onClick={() => router.push('/biodiversity/dashboards')}>
              View Analytics Dashboard
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 -mt-6 relative z-20">
        <Card className="glass-intense border-white/10 p-5" padding="none">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Total Districts', value: districts.length, icon: Building2 },
              { label: 'Total Species', value: totalSpecies, icon: Leaf },
              { label: 'Avg Species/District', value: avgSpecies, icon: MapPin },
              { label: 'Highest Richness', value: highestRichness?.district || '—', icon: Mountain, isText: true },
              { label: 'Most Threatened', value: mostThreatened?.district || '—', icon: AlertTriangle, isText: true },
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-3 border-r border-white/5 last:border-r-0">
                <stat.icon className={`w-5 h-5 text-violet-400 mx-auto mb-1`} />
                <div className={`text-xl font-bold text-white ${(stat as any).isText ? 'text-sm' : ''}`}>{stat.value}</div>
                <div className="text-xs text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Search */}
        <Card className="border border-white/10 bg-slate-900/50 mb-8" padding="md">
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" placeholder="Search districts..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-slate-800/50 border border-white/10 text-white placeholder:text-slate-500 outline-none focus:border-violet-500/50" />
          </div>
        </Card>

        {/* Top 5 Comparison Table */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Top 5 Districts by Species Richness</h2>
          <Card className="border border-white/10 bg-slate-900/30 overflow-x-auto" padding="md">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-2 px-3 text-slate-400 font-medium">District</th>
                  <th className="text-right py-2 px-3 text-slate-400 font-medium">Total</th>
                  <th className="text-right py-2 px-3 text-slate-400 font-medium"><Mountain className="w-3 h-3 inline" /> Mammals</th>
                  <th className="text-right py-2 px-3 text-slate-400 font-medium"><Bird className="w-3 h-3 inline" /> Birds</th>
                  <th className="text-right py-2 px-3 text-slate-400 font-medium"><Fish className="w-3 h-3 inline" /> Fish</th>
                  <th className="text-right py-2 px-3 text-slate-400 font-medium"><Sprout className="w-3 h-3 inline" /> Plants</th>
                  <th className="text-right py-2 px-3 text-slate-400 font-medium"><Shield className="w-3 h-3 inline" /> Threatened</th>
                  <th className="text-right py-2 px-3 text-slate-400 font-medium">Risk</th>
                </tr>
              </thead>
              <tbody>
                {top5.map((d, i) => (
                  <tr key={d.district} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-2 px-3 text-white font-medium">{d.district}</td>
                    <td className="py-2 px-3 text-right text-white font-bold">{d.totalSpecies}</td>
                    <td className="py-2 px-3 text-right text-slate-300">{d.mammals}</td>
                    <td className="py-2 px-3 text-right text-slate-300">{d.birds}</td>
                    <td className="py-2 px-3 text-right text-slate-300">{d.fish}</td>
                    <td className="py-2 px-3 text-right text-slate-300">{d.plants}</td>
                    <td className="py-2 px-3 text-right text-orange-300">{d.threatenedSpecies}</td>
                    <td className="py-2 px-3 text-right">
                      <Badge className={`text-xs border ${riskColors[d.habitatLossRisk]}`}>{d.habitatLossRisk}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* District Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDistricts.map((d, i) => (
            <motion.div key={d.district} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Card className="border border-white/10 bg-slate-900/30 hover:bg-slate-900/50 hover:border-violet-500/30 transition-all h-full" padding="md">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-white text-lg">{d.district}</h3>
                    <div className="text-3xl font-black text-violet-400">{d.totalSpecies}</div>
                    <div className="text-xs text-slate-500">total species</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                  <div className="text-slate-400"><Mountain className="w-3 h-3 inline mr-1" />{d.mammals} mammals</div>
                  <div className="text-slate-400"><Bird className="w-3 h-3 inline mr-1" />{d.birds} birds</div>
                  <div className="text-slate-400"><Fish className="w-3 h-3 inline mr-1" />{d.fish} fish</div>
                  <div className="text-slate-400"><Sprout className="w-3 h-3 inline mr-1" />{d.plants} plants</div>
                  <div className="text-orange-300"><Shield className="w-3 h-3 inline mr-1" />{d.threatenedSpecies} threatened</div>
                  <div className="text-emerald-300"><Leaf className="w-3 h-3 inline mr-1" />{d.endemicSpecies} endemic</div>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <div className="text-slate-500 mb-1">Primary Habitats</div>
                    <div className="flex flex-wrap gap-1">
                      {d.primaryHabitats.slice(0, 3).map(h => (
                        <Badge key={h} className="text-xs bg-slate-700/50 text-slate-300">{h}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-slate-500">Habitat Loss:</span>{' '}
                      <Badge className={`text-xs border ${riskColors[d.habitatLossRisk]}`}>{d.habitatLossRisk}</Badge>
                    </div>
                    <div>
                      <span className="text-slate-500">HWC:</span>{' '}
                      <Badge className={`text-xs ${conflictColors[d.humanWildlifeConflict]}`}>{d.humanWildlifeConflict}</Badge>
                    </div>
                  </div>
                  {d.biodiversityHotspots.length > 0 && (
                    <div className="text-slate-500">Hotspots: {d.biodiversityHotspots.slice(0, 2).join(', ')}</div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-white/5">
                  <button onClick={() => router.push(`/biodiversity/district/${d.district.toLowerCase().replace(/\s+/g, '-')}`)} className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1">
                    View Full Profile <ArrowRight className="w-3 h-3" />
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
