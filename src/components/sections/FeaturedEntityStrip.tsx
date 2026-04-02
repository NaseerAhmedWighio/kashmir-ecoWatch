'use client';

import React, { useState, useMemo } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Carousel } from '@/components/ui/Carousel';
import { useRouter } from 'next/navigation';
import { featuredEntities } from '@/lib/data';
import {
  MapPin, Mountain, Flower2, Footprints, Building2,
  ArrowRight, Heart, Share2, ArrowUpRight, Info,
  Shield, Droplet, Leaf, Ruler, Activity, TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================================
// Type Configuration
// ============================================================================

const typeConfig: Record<string, {
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  label: string;
  gradient: string;
}> = {
  protected_area: {
    icon: <Mountain className="w-4 h-4" />,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500',
    label: 'Protected Area',
    gradient: 'bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800',
  },
  lake: {
    icon: <Droplet className="w-4 h-4" />,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500',
    label: 'Water Body',
    gradient: 'bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-800',
  },
  species: {
    icon: <Heart className="w-4 h-4" />,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500',
    label: 'Species',
    gradient: 'bg-gradient-to-br from-purple-600 via-purple-700 to-pink-800',
  },
  bloom: {
    icon: <Flower2 className="w-4 h-4" />,
    color: 'text-pink-400',
    bgColor: 'bg-pink-500',
    label: 'Bloom Zone',
    gradient: 'bg-gradient-to-br from-pink-600 via-pink-700 to-rose-800',
  },
  trail: {
    icon: <Footprints className="w-4 h-4" />,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500',
    label: 'Trail',
    gradient: 'bg-gradient-to-br from-amber-600 via-amber-700 to-orange-800',
  },
  district: {
    icon: <Building2 className="w-4 h-4" />,
    color: 'text-slate-400',
    bgColor: 'bg-slate-500',
    label: 'District',
    gradient: 'bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800',
  },
};

// ============================================================================
// Tab Definitions
// ============================================================================

const tabs = [
  { id: 'all', label: 'All', icon: MapPin },
  { id: 'protected_areas', label: 'Protected Areas', icon: Shield },
  { id: 'water_bodies', label: 'Water Bodies', icon: Droplet },
  { id: 'species', label: 'Species', icon: Leaf },
  { id: 'districts', label: 'Districts', icon: Building2 },
  { id: 'trails', label: 'Trails', icon: Footprints },
];

// ============================================================================
// Entity Card Component
// ============================================================================

interface EntityCardProps {
  entity: typeof featuredEntities[0];
  onNavigate: (link: string) => void;
}

function EntityCard({ entity, onNavigate }: EntityCardProps) {
  const config = typeConfig[entity.type];

  return (
    <Card
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-xl hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:shadow-forest-500/10"
      padding="none"
    >
      {/* Card wrapper for consistent sizing */}
      <div className="flex flex-col h-full">
        {/* Visual Header */}
        <div className={`relative h-40 sm:h-44 ${config.gradient} flex-shrink-0`}>
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id={`grid-${entity.id}`} width="16" height="16" patternUnits="userSpaceOnUse">
                  <path d="M0 16h16V0H0z" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#grid-${entity.id})`} />
            </svg>
          </div>

          {/* Radial gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

          {/* Type Badge */}
          <div className="absolute top-3 left-3 z-10">
            <Badge className={`${config.bgColor} text-white border-0 backdrop-blur-md shadow-lg`}>
              {config.icon}
              <span className="ml-1.5 text-xs font-semibold">{config.label}</span>
            </Badge>
          </div>

          {/* Quick Actions (hover only) */}
          <div className="absolute top-3 right-3 z-10 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              className="p-2 rounded-lg bg-white/15 backdrop-blur-md hover:bg-white/25 transition-colors group/btn"
              aria-label="Save to favorites"
              type="button"
            >
              <Heart className="w-4 h-4 text-white group-hover/btn:scale-110 transition-transform" />
            </button>
            <button
              className="p-2 rounded-lg bg-white/15 backdrop-blur-md hover:bg-white/25 transition-colors group/btn"
              aria-label="Share entity"
              type="button"
            >
              <Share2 className="w-4 h-4 text-white group-hover/btn:scale-110 transition-transform" />
            </button>
          </div>

          {/* Entity Name */}
          <div className="absolute bottom-3 left-3 right-3 z-10">
            <h3 className="text-lg sm:text-xl font-bold text-white drop-shadow-lg line-clamp-2 leading-tight">
              {entity.name}
            </h3>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col">
          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-400 mb-4 line-clamp-2 leading-relaxed flex-shrink-0">
            {entity.description}
          </p>

          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4 flex-shrink-0">
            {entity.metrics.map((metric, idx) => (
              <div key={idx} className="text-center p-2 rounded-lg bg-slate-800/50 border border-white/5">
                <div className="flex items-center justify-center gap-1 mb-1">
                  {metric.unit === 'km²' || metric.unit === 'km' ? (
                    <Ruler className="w-3 h-3 text-forest-400" />
                  ) : metric.unit === '%' ? (
                    <TrendingUp className="w-3 h-3 text-blue-400" />
                  ) : (
                    <Activity className="w-3 h-3 text-purple-400" />
                  )}
                </div>
                <div className="text-base sm:text-lg font-bold text-white tabular-nums">
                  {metric.value.toLocaleString()}
                </div>
                <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider mt-0.5">
                  {metric.unit || metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Action Bar */}
          <div className="mt-auto pt-4 border-t border-white/10 flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-white/20 text-white hover:border-forest-400 hover:bg-forest-500/10 text-xs sm:text-sm font-medium transition-all"
              onClick={() => onNavigate(entity.link)}
            >
              View Details
              <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Button>
            <button
              className="p-2 rounded-lg bg-slate-800/50 border border-white/10 hover:border-forest-500/50 hover:bg-forest-500/10 transition-all group/btn"
              aria-label={`More info about ${entity.name}`}
              type="button"
            >
              <Info className="w-4 h-4 text-slate-400 group-hover/btn:text-forest-400 transition-colors" />
            </button>
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-forest-500/0 group-hover:border-forest-500/30 transition-colors duration-300 pointer-events-none" />
    </Card>
  );
}

// ============================================================================
// Category Summary Card Component
// ============================================================================

interface CategorySummaryProps {
  tab: typeof tabs[0];
  isActive: boolean;
  count: number;
  onClick: () => void;
}

function CategorySummary({ tab, isActive, count, onClick }: CategorySummaryProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`p-3 sm:p-4 rounded-xl border transition-all duration-300 text-center w-full ${
        isActive
          ? 'border-forest-500/50 bg-forest-500/10 shadow-lg shadow-forest-500/10'
          : 'border-white/5 bg-slate-900/50 hover:border-white/20 hover:bg-slate-800/50'
      }`}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      type="button"
    >
      <tab.icon className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 transition-colors ${
        isActive ? 'text-forest-400' : 'text-slate-500'
      }`} />
      <div className="text-xl sm:text-2xl font-bold text-white tabular-nums">{count}</div>
      <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider mt-1">
        {tab.label}
      </div>
    </motion.button>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function FeaturedEntityStrip() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');

  // Filter entities based on active tab
  const filteredEntities = useMemo(() => {
    if (activeTab === 'all') return featuredEntities;
    
    const typeMap: Record<string, string> = {
      protected_areas: 'protected_area',
      water_bodies: 'lake',
      species: 'species',
      districts: 'district',
      trails: 'trail',
    };
    
    const targetType = typeMap[activeTab];
    return featuredEntities.filter(e => e.type === targetType);
  }, [activeTab]);

  // Calculate counts for each category
  const counts = useMemo(() => {
    const baseCounts = {
      all: featuredEntities.length,
      protected_areas: featuredEntities.filter(e => e.type === 'protected_area').length,
      water_bodies: featuredEntities.filter(e => e.type === 'lake').length,
      species: featuredEntities.filter(e => e.type === 'species').length,
      districts: featuredEntities.filter(e => e.type === 'district').length,
      trails: featuredEntities.filter(e => e.type === 'trail').length,
    };
    return baseCounts;
  }, []);

  return (
    <section className="pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 bg-slate-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute bottom-0 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-forest-500/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-0 w-48 h-48 sm:w-72 sm:h-72 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-8 sm:mb-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              {/* Signal indicator */}
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-2 h-2 bg-forest-500 rounded-full signal-pulse shadow-lg shadow-forest-500/50" />
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                  Featured Intelligence
                </span>
              </div>
              
              {/* Title and Description */}
              <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 tracking-tight leading-tight">
                Featured Ecological Entities
              </h2>
              <p className="text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
                Discover key ecological assets, critical habitats, and significant
                environmental features with comprehensive intelligence profiles.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex-shrink-0">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-white/20 text-white hover:border-forest-400 hover:bg-forest-500/10 text-sm font-medium transition-all"
                icon={<ArrowRight className="w-5 h-5" />}
                onClick={() => router.push('/biodiversity')}
              >
                Browse All Entities
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 sm:mb-8"
        >
          {/* Scrollable Tab List */}
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            <div
              className="flex items-center gap-2 p-1.5 sm:gap-3 sm:p-2 glass-light rounded-xl sm:rounded-2xl border border-white/10 w-fit min-w-max"
              role="tablist"
              aria-label="Entity categories"
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${tab.id}`}
                    className={`px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-forest-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                      isActive
                        ? 'bg-forest-500 text-white shadow-lg shadow-forest-500/30 border border-forest-400'
                        : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                    type="button"
                  >
                    <tab.icon className={`w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 ${
                      isActive ? 'text-white' : ''
                    }`} />
                    <span className="hidden md:inline">{tab.label}</span>
                    <span className="md:hidden">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Carousel with Entity Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              id={`panel-${activeTab}`}
              role="tabpanel"
              aria-labelledby={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {filteredEntities.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-slate-800/50 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-slate-600" />
                  </div>
                  <p className="text-slate-400 text-sm sm:text-base">
                    No entities found in this category
                  </p>
                </div>
              ) : (
                <Carousel
                  itemWidth={{ mobile: 280, tablet: 300, desktop: 340 }}
                  gap="gap-3 sm:gap-4 md:gap-6"
                  showArrows={true}
                  ariaLabel="Featured entities carousel"
                  className="px-1"
                >
                  {filteredEntities.map((entity) => (
                    <div
                      key={entity.id}
                      className="flex-shrink-0 w-[280px] sm:w-[300px] md:w-[340px] snap-start"
                    >
                      <EntityCard entity={entity} onNavigate={router.push} />
                    </div>
                  ))}
                </Carousel>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Category Summary Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Category Overview
            </span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {tabs.filter(t => t.id !== 'all').map((tab) => (
              <CategorySummary
                key={tab.id}
                tab={tab}
                isActive={activeTab === tab.id}
                count={counts[tab.id as keyof typeof counts]}
                onClick={() => setActiveTab(tab.id)}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
