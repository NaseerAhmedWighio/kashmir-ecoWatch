'use client';

import React, { useState, useMemo } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Shield, Map, Mountain, Droplet, Leaf, Activity,
  ArrowRight, Search, Filter, Grid3X3, List, Eye,
  Trees, Bird, Fish, PawPrint
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Heading } from '@/components/common/Heading';
import { getProtectedAreas, protectedNetworkMetrics } from '@/data/protected-network';

const categoryFilters = [
  { id: 'all', label: 'All Areas', icon: Shield },
  { id: 'national_park', label: 'National Parks', icon: Mountain },
  { id: 'wildlife_sanctuary', label: 'Wildlife Sanctuaries', icon: PawPrint },
  { id: 'wetland_reserve', label: 'Wetland Reserves', icon: Droplet },
  { id: 'conservation_reserve', label: 'Conservation Reserves', icon: Leaf },
  { id: 'iba', label: 'Bird Areas', icon: Bird },
];

const categoryColors: Record<string, string> = {
  national_park: 'from-emerald-500 to-teal-600',
  wildlife_sanctuary: 'from-blue-500 to-cyan-600',
  wetland_reserve: 'from-sky-500 to-blue-600',
  conservation_reserve: 'from-amber-500 to-orange-600',
  iba: 'from-purple-500 to-pink-600',
};

const categoryBadgeColors: Record<string, string> = {
  national_park: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  wildlife_sanctuary: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  wetland_reserve: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
  conservation_reserve: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  iba: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

const categoryLabels: Record<string, string> = {
  national_park: 'National Park',
  wildlife_sanctuary: 'Wildlife Sanctuary',
  wetland_reserve: 'Wetland Reserve',
  conservation_reserve: 'Conservation Reserve',
  iba: 'Important Bird Area',
};

export default function ProtectedAreasPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const allProtectedAreas = useMemo(() => getProtectedAreas.all(), []);

  const filteredAreas = useMemo(() => {
    let areas = allProtectedAreas;
    if (activeFilter !== 'all') {
      areas = areas.filter(pa => pa.category === activeFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      areas = areas.filter(pa =>
        pa.name.toLowerCase().includes(q) ||
        pa.district.toLowerCase().includes(q) ||
        pa.description.toLowerCase().includes(q)
      );
    }
    return areas;
  }, [allProtectedAreas, activeFilter, searchQuery]);

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        label="Conservation Areas"
        title={<><span className="block whitespace-nowrap">Protected</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Areas</span></>}
        subtitle="A structured inventory of Kashmir's national parks, wildlife sanctuaries, wetland reserves, and conservation areas. Each record includes ecological profile, boundary data, and conservation status."
        icon={<Shield className="w-6 h-6 text-emerald-400" />}
        actions={
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <Button
              size="lg"
              className="bg- emerald-700 hover:bg- emerald-500"
              icon={<Map className="w-5 h-5" />}
              onClick={() => router.push('/protected-network/atlas')}
            >
              Open PA Atlas
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white"
              icon={<Activity className="w-5 h-5" />}
              onClick={() => router.push('/protected-network')}
            >
              Protected Network Hub
            </Button>
          </div>
        }
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Protected Areas' }]}
      />

      <div className="container mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-intense border-white/10" padding="sm">
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              {[
                { label: 'Total Areas', value: protectedNetworkMetrics.totalProtectedAreas, icon: Shield },
                { label: 'National Parks', value: protectedNetworkMetrics.nationalParks, icon: Mountain },
                { label: 'Sanctuaries', value: protectedNetworkMetrics.wildlifeSanctuaries, icon: PawPrint },
                { label: 'Wetland Reserves', value: protectedNetworkMetrics.wetlandReserves, icon: Droplet },
                { label: 'Conservation Reserves', value: protectedNetworkMetrics.conservationReserves, icon: Leaf },
              ].map((metric, idx) => (
                <div key={idx} className="py-2.5 px-2 lg:py-3 lg:px-3 rounded-xl text-center min-w-0">
                  <metric.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 mx-auto mb-1" />
                  <div className="text-sm sm:text-base lg:text-sm xl:text-base font-bold text-white tabular-nums leading-tight truncate">
                    {metric.value}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 uppercase tracking-wide mt-0.5 leading-tight break-words">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              placeholder="Search protected areas by name, district, or ecosystem..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl border transition-colors ${viewMode === 'grid' ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' : 'border-white/10 text-slate-500 hover:text-white'}`}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-xl border transition-colors ${viewMode === 'list' ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' : 'border-white/10 text-slate-500 hover:text-white'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categoryFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === filter.id ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'}`}
            >
              <filter.icon className="w-4 h-4" />
              {filter.label}
              <span className="text-xs text-slate-500 ml-1">
                ({activeFilter === filter.id ? allProtectedAreas.length : allProtectedAreas.filter(a => filter.id === 'all' || a.category === filter.id).length})
              </span>
            </button>
          ))}
        </div>

        <motion.div layout className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredAreas.map((pa, idx) => (
            <motion.div
              key={pa.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.03 }}
              layout
              className={viewMode === 'grid' ? 'h-full flex flex-col' : ''}
            >
              <Card
                className={`glass border-white/10 transition-all duration-300 group cursor-pointer hover:border-white/20 ${viewMode === 'list' ? 'flex items-center gap-4 p-4' : 'h-full flex flex-col justify-between p-6'}`}
                onClick={() => router.push(`/protected-areas/${pa.slug}`)}
              >
                {viewMode === 'grid' ? (
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${categoryColors[pa.category] || 'from-slate-500 to-slate-700'} inline-flex mb-4`}>
                        {pa.category === 'national_park' ? <Mountain className="w-6 h-6 text-white" /> :
                         pa.category === 'wildlife_sanctuary' ? <PawPrint className="w-6 h-6 text-white" /> :
                         pa.category === 'wetland_reserve' ? <Droplet className="w-6 h-6 text-white" /> :
                         pa.category === 'conservation_reserve' ? <Leaf className="w-6 h-6 text-white" /> :
                         <Bird className="w-6 h-6 text-white" />}
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-1">{pa.name}</h3>
                      <span className={`inline-block text-xs px-2 py-0.5 rounded-full border ${categoryBadgeColors[pa.category] || ''} mb-3`}>
                        {categoryLabels[pa.category] || pa.category}
                      </span>
                      <p className="text-sm text-slate-400 mb-3 line-clamp-2">{pa.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-slate-500 mt-auto pt-3 border-t border-white/5">
                      <span>{pa.area.toLocaleString()} km²</span>
                      <span>•</span>
                      <span>{pa.district}</span>
                      <span>•</span>
                      <span>Est. {pa.established}</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${categoryColors[pa.category] || 'from-slate-500 to-slate-700'} shrink-0`}>
                      {pa.category === 'national_park' ? <Mountain className="w-5 h-5 text-white" /> :
                       pa.category === 'wildlife_sanctuary' ? <PawPrint className="w-5 h-5 text-white" /> :
                       pa.category === 'wetland_reserve' ? <Droplet className="w-5 h-5 text-white" /> :
                       <Leaf className="w-5 h-5 text-white" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-base font-semibold text-white truncate">{pa.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full border shrink-0 ${categoryBadgeColors[pa.category] || ''}`}>
                          {categoryLabels[pa.category] || pa.category}
                        </span>
                      </div>
                      <p className="text-sm text-slate-400 truncate">{pa.description}</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500 shrink-0">
                      <span className="tabular-nums">{pa.area.toLocaleString()} km²</span>
                      <span>{pa.district}</span>
                      <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                    </div>
                  </>
                )}
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredAreas.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No protected areas match your search</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveFilter('all'); }}
              className="mt-4 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      
    </main>
  );
}
