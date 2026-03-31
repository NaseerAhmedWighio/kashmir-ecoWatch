'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import * as Icons from 'lucide-react';
import {
  MapPin, Activity, ArrowRight, Search, Filter, Shield,
  Grid3X3, List, Map, TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface ProtectedArea {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  area: number;
  district: string;
  established: number;
  ecosystems: string[];
  keySpecies: string[];
}

interface ProtectedCategoryPageProps {
  title: string;
  subtitle: string;
  icon: keyof typeof import('lucide-react');
  color: string;
  areas: ProtectedArea[];
  metrics: Array<{ label: string; value: number | string; icon: keyof typeof import('lucide-react') }>;
  sourceData?: {
    title: string;
    count: number;
    totalArea: number;
  };
}

export function ProtectedCategoryPage({
  title,
  subtitle,
  icon: iconName,
  color,
  areas,
  metrics,
  sourceData,
}: ProtectedCategoryPageProps) {
  const Icon = (Icons as any)[iconName] || Icons.MapPin;
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      
      {/* Hero */}
      <div className="relative pt-48 pb-12 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-10`} />
        <div className="absolute inset-0 bg-grid opacity-20" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <Icon className={`w-6 h-6 ${color.includes('emerald') ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                Protected Network
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
              {title}
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              {subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className={`bg-gradient-to-r ${color}`}
                icon={<Search className="w-5 h-5" />}
              >
                Search
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 text-white"
                icon={<Map className="w-5 h-5" />}
              >
                Distribution Map
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Metrics */}
      <div className="container mx-auto px-6 -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-intense border-white/10 p-6" padding="none">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
              {metrics.map((metric, idx) => {
                const MetricIcon = (Icons as any)[metric.icon] || Icons.MapPin;
                return (
                  <div key={idx} className="text-center p-4 border-r border-white/5 last:border-r-0">
                    <MetricIcon className="w-5 h-5 text-slate-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white tabular-nums">
                      {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
                    </div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">
                      {metric.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-12 space-y-8">
        {/* Filters and View Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-white/20 text-white"
              icon={<Filter className="w-4 h-4" />}
            >
              Filters
            </Button>
            <span className="text-sm text-slate-400">
              <strong className="text-white">{areas.length}</strong> protected areas
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400'}
              icon={<Grid3X3 className="w-4 h-4" />}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400'}
              icon={<List className="w-4 h-4" />}
            />
          </div>
        </motion.div>

        {/* Protected Areas Grid/List */}
        {areas.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {areas.map((area, index) => (
              <motion.a
                key={area.id}
                href={`/protected-network/${area.category === 'national_park' ? 'national-parks' : area.category === 'wildlife_sanctuary' ? 'wildlife-sanctuaries' : area.category === 'wetland_reserve' ? 'wetland-reserves' : area.category === 'conservation_reserve' ? 'conservation-reserves' : 'bird-and-habitat-areas'}/${area.slug}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="block group"
              >
                <Card className="h-full overflow-hidden card-intelligence border border-white/5 bg-slate-900/50" padding="none">
                  <div className="relative h-40 bg-gradient-to-br from-emerald-500/20 to-slate-800/50">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge variant="info" size="sm" className="mb-2 capitalize">
                        {area.category.replace('_', ' ')}
                      </Badge>
                      <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {area.name}
                      </h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                      {area.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <div>
                        <div className="text-xs text-slate-500 uppercase">Area</div>
                        <div className="text-white font-semibold">{area.area} km²</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase">District</div>
                        <div className="text-white font-semibold">{area.district}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-emerald-400 group-hover:text-emerald-300 transition-colors mt-4 pt-4 border-t border-white/5">
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              </motion.a>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <Shield className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No protected areas found</h3>
            <p className="text-slate-400">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Source Information */}
      {sourceData && (
        <div className="container mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="glass-light border-white/10 p-6">
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-slate-400 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">Source Data</h3>
                  <p className="text-slate-400 text-sm mb-3">{sourceData.title}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-500">Total Records:</span>{' '}
                      <span className="text-white font-medium">{sourceData.count}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Total Area:</span>{' '}
                      <span className="text-white font-medium">{sourceData.totalArea.toFixed(2)} km²</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      )}

      <AdvancedFooter />
    </main>
  );
}
