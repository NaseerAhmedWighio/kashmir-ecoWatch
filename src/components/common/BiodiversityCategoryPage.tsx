'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { EntityDrawer } from '@/components/common/EntityDrawer';
import { BiodiversityCard } from '@/components/common/BiodiversityCard';
import { BiodiversityFilters } from '@/components/common/BiodiversityFilters';
import {
  Leaf, Map, Activity, Eye, TrendingUp, ArrowRight, Search,
  Grid3X3, List, MapPin, Shield, type LucideIcon
} from 'lucide-react';
import * as Icons from 'lucide-react';
import { motion } from 'framer-motion';
import { BiodiversitySpecies, biodiversityMetrics } from '@/data/biodiversity';
import { useRouter } from 'next/navigation';

interface CategoryPageProps {
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  species: BiodiversitySpecies[];
  metrics: Array<{ label: string; value: number; icon: string }>;
  filters: {
    habitats: string[];
    districts: string[];
    conservationStatuses: string[];
  };
}

export function BiodiversityCategoryPage({
  title,
  subtitle,
  icon: iconName,
  color,
  species,
  metrics,
  filters,
}: CategoryPageProps) {
  const Icon = (Icons as any)[iconName] || Icons.Leaf;
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFilters, setActiveFilters] = useState<any>({});
  const [selectedEntity, setSelectedEntity] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleFilterChange = (newFilters: any) => {
    setActiveFilters(newFilters);
  };

  const handleReset = () => {
    setActiveFilters({});
  };

  const handleQuickView = (species: BiodiversitySpecies) => {
    setSelectedEntity({
      type: 'species',
      name: species.commonName,
      description: species.description,
      slug: species.slug,
      status: species.conservationStatus,
      district: species.districts.join(', '),
      metrics: [
        { label: 'Elevation', value: `${species.elevationRange.min}-${species.elevationRange.max}m` },
        { label: 'Habitats', value: species.habitats.length },
      ],
    });
    setDrawerOpen(true);
  };

  const filteredSpecies = species; // Apply filters here based on activeFilters

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      
      {/* Hero */}
      <div className="relative pt-24 pb-12 overflow-hidden">
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
                Biodiversity Intelligence
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
                Search {title}
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
      <div className="container mx-auto px-6 mt-10 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-intense border-white/10 p-6" padding="none">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
              {metrics.map((metric, idx) => {
                const MetricIcon = (Icons as any)[metric.icon] || Icons.Activity;
                return (
                  <div key={idx} className="text-center p-4 border-r border-white/5 last:border-r-0">
                    <MetricIcon className="w-5 h-5 text-slate-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white tabular-nums">
                      {metric.value.toLocaleString()}
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
          <BiodiversityFilters
            filters={activeFilters}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
            resultCount={filteredSpecies.length}
          />
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-forest-500/20 text-forest-400' : 'text-slate-400'}
              icon={<Grid3X3 className="w-4 h-4" />}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode('list')}
              className={viewMode === 'list' ? 'bg-forest-500/20 text-forest-400' : 'text-slate-400'}
              icon={<List className="w-4 h-4" />}
            />
          </div>
        </motion.div>

        {/* Species Grid/List */}
        {filteredSpecies.length > 0 ? (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredSpecies.map((species, index) => (
              <motion.div
                key={species.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <BiodiversityCard
                  species={species}
                  onQuickView={handleQuickView}
                  variant={viewMode === 'list' ? 'compact' : 'default'}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <Leaf className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No species found</h3>
            <p className="text-slate-400 mb-4">Try adjusting your filters</p>
            <Button onClick={handleReset} variant="outline" className="border-white/20 text-white">
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {/* Entity Drawer */}
      {selectedEntity && (
        <EntityDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          entity={selectedEntity}
        />
      )}

      <AdvancedFooter />
    </main>
  );
}
