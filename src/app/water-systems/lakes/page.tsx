'use client';

import React, { useState } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import {
  Droplet, MapPin, Search, Filter, ArrowRight, Thermometer,
  Activity, AlertTriangle, Ruler, Eye, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { lakesData, WaterEntity } from '@/data/water-systems';

export default function LakesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedQuality, setSelectedQuality] = useState<string>('all');

  const districts = Array.from(new Set(lakesData.map(l => l.district)));
  const qualityStatuses = ['excellent', 'good', 'moderate', 'poor', 'critical'];

  const filteredLakes = lakesData.filter(lake => {
    const matchesSearch = lake.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lake.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = selectedDistrict === 'all' || lake.district === selectedDistrict;
    const matchesQuality = selectedQuality === 'all' || lake.waterQuality?.status === selectedQuality;
    return matchesSearch && matchesDistrict && matchesQuality;
  });

  const getTypeColor = (category: string) => {
    if (category.includes('High-Altitude') || category.includes('Alpine') || category.includes('Glacial')) {
      return 'from-slate-500 to-slate-600';
    }
    if (category.includes('Urban')) {
      return 'from-blue-500 to-cyan-600';
    }
    if (category.includes('Wetland')) {
      return 'from-sky-500 to-blue-600';
    }
    return 'from-emerald-500 to-green-600';
  };

  const getQualityBadge = (status: string) => {
    switch (status) {
      case 'excellent': return 'success';
      case 'good': return 'success';
      case 'moderate': return 'warning';
      case 'poor': return 'warning';
      case 'critical': return 'danger';
      default: return 'default';
    }
  };

  return (
    <main className="min-h-screen bg-slate-950">{/* Hero */}
      <div className="relative pt-48 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 opacity-50" />
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <button onClick={() => router.push('/water-systems')} className="hover:text-white transition-colors">
                Water Systems
              </button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">All Lakes</span>
            </nav>

            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
                    <Droplet className="w-7 h-7 text-white" />
                  </div>
                  <Badge variant="info" size="lg">{lakesData.length} Lakes</Badge>
                </div>
                <h1 className="text-5xl font-black text-white mb-4">
                  All Lakes of Kashmir
                </h1>
                <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
                  Comprehensive inventory of every major, minor, urban, rural, high-altitude, floodplain, and district-level lake mapped across Kashmir. Includes water quality, biodiversity, hydrology, and threat monitoring.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-intense border-white/10 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <Input
                    placeholder="Search lakes by name or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-900/50 border-white/10 text-white"
                  />
                </div>
              </div>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="px-4 py-2.5 rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Districts</option>
                {districts.map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <select
                value={selectedQuality}
                onChange={(e) => setSelectedQuality(e.target.value)}
                className="px-4 py-2.5 rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Quality Levels</option>
                {qualityStatuses.map(s => (
                  <option key={s} value={s} className="capitalize">{s}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
              <div className="text-sm text-slate-400">
                Showing <span className="text-white font-semibold">{filteredLakes.length}</span> of <span className="text-white font-semibold">{lakesData.length}</span> lakes
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white"
                icon={<Filter className="w-4 h-4" />}
              >
                More Filters
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Lakes Grid */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLakes.map((lake, idx) => (
            <motion.div
              key={lake.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.05 }}
            >
              <Card className="glass-intense border-white/10 p-6 h-full hover:border-white/20 transition-all cursor-pointer group">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getTypeColor(lake.category)} flex items-center justify-center flex-shrink-0`}>
                    <Droplet className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors truncate">
                      {lake.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" size="sm" className="text-xs border-white/10 text-slate-400">
                        {lake.category}
                      </Badge>
                      {lake.waterQuality && (
                        <Badge variant={getQualityBadge(lake.waterQuality.status)} size="sm">
                          {lake.waterQuality.status}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-slate-400 text-sm mb-4 line-clamp-2">
                  {lake.description}
                </p>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-2 rounded-lg bg-slate-800/50">
                    <Ruler className="w-4 h-4 text-slate-500 mx-auto mb-1" />
                    <div className="text-xs text-slate-500">Elevation</div>
                    <div className="text-sm font-bold text-white">{lake.elevation}m</div>
                  </div>
                  {lake.area && (
                    <div className="text-center p-2 rounded-lg bg-slate-800/50">
                      <Droplet className="w-4 h-4 text-slate-500 mx-auto mb-1" />
                      <div className="text-xs text-slate-500">Area</div>
                      <div className="text-sm font-bold text-white">{lake.area} km²</div>
                    </div>
                  )}
                  <div className="text-center p-2 rounded-lg bg-slate-800/50">
                    <Activity className="w-4 h-4 text-slate-500 mx-auto mb-1" />
                    <div className="text-xs text-slate-500">Species</div>
                    <div className="text-sm font-bold text-white">{lake.biodiversity?.length || 0}</div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <MapPin className="w-4 h-4" />
                    <span>{lake.district}</span>
                  </div>
                  {lake.waterQuality && (
                    <div className="flex items-center gap-1 text-sm text-slate-400">
                      <Thermometer className="w-4 h-4" />
                      <span>pH {lake.waterQuality.pH.toFixed(1)}</span>
                    </div>
                  )}
                </div>

                {lake.threats && lake.threats.length > 0 && (
                  <div className="flex items-center gap-2 text-xs text-amber-400 mb-4">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{lake.threats.length} threats identified</span>
                  </div>
                )}

                <Button
                  size="sm"
                  className="w-full bg-gradient-to-r from-blue-500 to-cyan-600"
                  icon={<ArrowRight className="w-4 h-4" />}
                  onClick={() => router.push(`/water-systems/lakes/${lake.slug}`)}
                >
                  View Details
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredLakes.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <Droplet className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No lakes found</h3>
            <p className="text-slate-400">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>

      {/* CTA */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-gradient-to-r from-blue-600 to-cyan-600 border-0 p-8">
            <div className="flex items-center justify-between flex-wrap gap-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Need More Detailed Lake Information?
                </h3>
                <p className="text-white/80">
                  Access comprehensive water quality data, hydrological analysis, and conservation reports
                </p>
              </div>
              <Button
                size="lg"
                className="bg-white/20 text-white border-0"
                icon={<Eye className="w-5 h-5" />}
                onClick={() => router.push('/dashboards/water-systems')}
              >
                View Analytics Dashboard
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      <AdvancedFooter />
    </main>
  );
}
