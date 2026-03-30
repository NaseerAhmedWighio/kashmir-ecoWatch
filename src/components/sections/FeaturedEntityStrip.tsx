'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { featuredEntities } from '@/lib/data';
import {
  MapPin, Mountain, Trees, Flower2, Footprints, Building2,
  ArrowRight, Heart, Share2, Maximize2, Info, ExternalLink,
  Shield, Droplet, Bird, Leaf
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const typeConfig: Record<string, {
  icon: React.ReactNode;
  color: string;
  label: string;
  gradient: string;
}> = {
  protected_area: {
    icon: <Mountain className="w-4 h-4" />,
    color: 'bg-emerald-500',
    label: 'Protected Area',
    gradient: 'from-emerald-500 to-teal-700'
  },
  lake: {
    icon: <Droplet className="w-4 h-4" />,
    color: 'bg-blue-500',
    label: 'Water Body',
    gradient: 'from-blue-500 to-cyan-700'
  },
  species: {
    icon: <Heart className="w-4 h-4" />,
    color: 'bg-purple-500',
    label: 'Species',
    gradient: 'from-purple-500 to-pink-700'
  },
  bloom: {
    icon: <Flower2 className="w-4 h-4" />,
    color: 'bg-pink-500',
    label: 'Bloom Zone',
    gradient: 'from-pink-500 to-rose-700'
  },
  trail: {
    icon: <Footprints className="w-4 h-4" />,
    color: 'bg-amber-500',
    label: 'Trail',
    gradient: 'from-amber-500 to-orange-700'
  },
  district: {
    icon: <Building2 className="w-4 h-4" />,
    color: 'bg-slate-500',
    label: 'District',
    gradient: 'from-slate-500 to-slate-700'
  },
};

const tabs = [
  { id: 'all', label: 'All Entities', icon: MapPin, count: featuredEntities.length },
  { id: 'protected_areas', label: 'Protected Areas', icon: Shield, count: featuredEntities.filter(e => e.type === 'protected_area').length },
  { id: 'water_bodies', label: 'Water Bodies', icon: Droplet, count: featuredEntities.filter(e => e.type === 'lake').length },
  { id: 'species', label: 'Species', icon: Leaf, count: featuredEntities.filter(e => e.type === 'species').length },
  { id: 'districts', label: 'Districts', icon: Building2, count: featuredEntities.filter(e => e.type === 'district').length },
  { id: 'trails', label: 'Trails', icon: Footprints, count: featuredEntities.filter(e => e.type === 'trail').length },
];

export function FeaturedEntityStrip() {
  const [hoveredEntity, setHoveredEntity] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const filteredEntities = activeTab === 'all' 
    ? featuredEntities 
    : featuredEntities.filter(e => {
        if (activeTab === 'protected_areas') return e.type === 'protected_area';
        if (activeTab === 'water_bodies') return e.type === 'lake';
        if (activeTab === 'species') return e.type === 'species';
        if (activeTab === 'districts') return e.type === 'district';
        if (activeTab === 'trails') return e.type === 'trail';
        return true;
      });

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-forest-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-forest-500 rounded-full signal-pulse" />
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Featured Intelligence
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                Featured Ecological Entities
              </h2>
              <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
                Discover key ecological assets, critical habitats, and significant
                environmental features with deep intelligence profiles.
              </p>
            </div>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:border-forest-400" icon={<ArrowRight className="w-5 h-5" />}>
              Browse All Entities
            </Button>
          </div>
        </motion.div>

        {/* Tab navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-wrap items-center gap-2 p-1 glass-light rounded-xl border border-white/10 inline-flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-forest-500/20 text-forest-400 border border-forest-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden md:inline">{tab.label}</span>
                <span className="md:hidden">{tab.count}</span>
                <Badge 
                  variant={activeTab === tab.id ? 'default' : 'outline'} 
                  size="sm" 
                  className={`ml-1 ${activeTab === tab.id ? 'bg-forest-500/30' : 'border-white/10'}`}
                >
                  {tab.count}
                </Badge>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Entity cards with animation */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {filteredEntities.length === 0 ? (
                <div className="w-full py-12 text-center">
                  <MapPin className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400">No entities found in this category</p>
                </div>
              ) : (
                filteredEntities.map((entity, index) => {
                  const config = typeConfig[entity.type];
                  const isHovered = hoveredEntity === entity.id;

                  return (
                    <motion.div
                      key={entity.id}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                      className="flex-shrink-0 w-[340px]"
                      onMouseEnter={() => setHoveredEntity(entity.id)}
                      onMouseLeave={() => setHoveredEntity(null)}
                    >
                      <Card className="group relative overflow-hidden rounded-2xl border border-white/5 bg-slate-900/50 backdrop-blur-xl card-intelligence" padding="none">
                        {/* Visual layer */}
                        <div className="relative h-48 overflow-hidden">
                          {/* Gradient background based on type */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-80 group-hover:opacity-90 transition-opacity`} />

                          {/* Pattern overlay */}
                          <div className="absolute inset-0 opacity-20">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                              <defs>
                                <pattern id={`pattern-${entity.id}`} width="20" height="20" patternUnits="userSpaceOnUse">
                                  <circle cx="2" cy="2" r="1" fill="white" fillOpacity="0.3" />
                                </pattern>
                              </defs>
                              <rect width="100%" height="100%" fill={`url(#pattern-${entity.id})`} />
                            </svg>
                          </div>

                          {/* Type badge */}
                          <div className="absolute top-4 left-4 z-10">
                            <Badge className={`${config.color} text-white border-0 backdrop-blur-sm`}>
                              {config.icon}
                              <span className="ml-1.5 text-xs font-medium">{config.label}</span>
                            </Badge>
                          </div>

                          {/* Action buttons */}
                          <div className={`absolute top-4 right-4 z-10 flex gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                            <button className="p-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
                              <Heart className="w-4 h-4 text-white" />
                            </button>
                            <button className="p-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
                              <Share2 className="w-4 h-4 text-white" />
                            </button>
                          </div>

                          {/* Name overlay */}
                          <div className="absolute bottom-4 left-4 right-4 z-10">
                            <h3 className="text-xl font-bold text-white mb-1 drop-shadow-lg">
                              {entity.name}
                            </h3>
                          </div>

                          {/* Expand indicator */}
                          <div className={`absolute bottom-4 right-4 z-10 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                              <Maximize2 className="w-5 h-5 text-white" />
                            </div>
                          </div>
                        </div>

                        {/* Content layer */}
                        <div className="p-5">
                          <p className="text-sm text-slate-400 mb-4 line-clamp-2 leading-relaxed">
                            {entity.description}
                          </p>

                          {/* Metrics */}
                          <div className="flex items-center gap-4 mb-4">
                            {entity.metrics.map((metric, idx) => (
                              <div key={idx} className="flex-1">
                                <div className="text-lg font-bold text-white tabular-nums">
                                  {metric.value.toLocaleString()}
                                </div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider">
                                  {metric.unit || ''}
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Action bar */}
                          <div className="flex items-center justify-between pt-4 border-t border-white/5">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-white/20 text-white hover:border-forest-400 flex-1 mr-3"
                              onClick={() => window.location.href = entity.link}
                            >
                              View Details
                            </Button>
                            <button className="p-2 rounded-lg glass-light border border-white/10 hover:border-forest-500/50 transition-colors">
                              <Info className="w-4 h-4 text-slate-400" />
                            </button>
                          </div>
                        </div>

                        {/* Hover border glow */}
                        <div className={`absolute inset-0 border-2 border-transparent rounded-2xl transition-colors duration-300 pointer-events-none ${isHovered && 'border-forest-500/30'}`} />
                      </Card>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          </AnimatePresence>

          {/* Gradient fades */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none z-10" />
        </div>

        {/* Category summary strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {tabs.filter(t => t.id !== 'all').map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-4 rounded-xl glass-light border transition-all text-center ${
                activeTab === tab.id 
                  ? 'border-forest-500/50 bg-forest-500/10' 
                  : 'border-white/5 hover:border-white/20'
              }`}
              whileHover={{ scale: 1.05 }}
            >
              <tab.icon className={`w-6 h-6 mx-auto mb-2 ${
                activeTab === tab.id ? 'text-forest-400' : 'text-slate-500'
              }`} />
              <div className="text-2xl font-bold text-white">{tab.count}</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">
                {tab.label}
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
