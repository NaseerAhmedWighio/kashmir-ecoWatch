'use client';

import React, { useState } from 'react';
import { intelligenceCards } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import {
  Map, Leaf, Shield, Droplet, Cloud, Sun, Footprints, Book,
  ArrowRight, Layers, Activity, Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: Record<string, React.ReactNode> = {
  map: <Map className="w-6 h-6" />,
  leaf: <Leaf className="w-6 h-6" />,
  shield: <Shield className="w-6 h-6" />,
  droplet: <Droplet className="w-6 h-6" />,
  cloud: <Cloud className="w-6 h-6" />,
  sun: <Sun className="w-6 h-6" />,
  footprints: <Footprints className="w-6 h-6" />,
  book: <Book className="w-6 h-6" />,
};

const colorMap: Record<string, string> = {
  forest: 'from-emerald-500 to-teal-600',
  glacier: 'from-sky-500 to-blue-600',
  earth: 'from-amber-600 to-orange-700',
  slate: 'from-slate-500 to-slate-700',
  alert: 'from-amber-500 to-orange-600',
};

export function AsymmetricModuleSurface() {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const router = useRouter();

  // Create asymmetric layout by varying sizes
  const getModuleSize = (index: number) => {
    if (index === 0) return 'col-span-1 md:col-span-2 lg:col-span-2 row-span-2';
    if (index === 1) return 'col-span-1 md:col-span-1 lg:col-span-1 row-span-1';
    if (index === 2) return 'col-span-1 md:col-span-1 lg:col-span-1 row-span-1';
    if (index === 3) return 'col-span-1 md:col-span-2 lg:col-span-1 row-span-1';
    if (index === 4) return 'col-span-1 md:col-span-1 lg:col-span-1 row-span-1';
    if (index === 5) return 'col-span-1 md:col-span-1 lg:col-span-1 row-span-1';
    if (index === 6) return 'col-span-1 md:col-span-2 lg:col-span-2 row-span-1';
    if (index === 7) return 'col-span-1 md:col-span-1 lg:col-span-1 row-span-1';
    return 'col-span-1';
  };

  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-forest-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-glacier-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-forest-500 rounded-full signal-pulse" />
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Intelligence Domains
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                Modular Intelligence Surface
              </h2>
              <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
                Access specialized ecological intelligence systems with integrated data layers, 
                monitoring dashboards, and analytical tools across all environmental domains.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => router.push('/risk-monitoring')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg glass-light border border-white/10 text-sm text-slate-300 hover:text-white hover:border-forest-500/50 transition-all"
              >
                <Layers className="w-4 h-4" />
                <span>View All Modules</span>
              </button>
              <button 
                onClick={() => router.push('/risk-monitoring/dashboards')}
                className="flex items-center gap-2 px-4 py-2 rounded-lg glass-light border border-white/10 text-sm text-slate-300 hover:text-white hover:border-forest-500/50 transition-all"
              >
                <Activity className="w-4 h-4" />
                <span>Activity Log</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {intelligenceCards.map((card, index) => {
            const sizeClass = getModuleSize(index);
            const isHovered = hoveredModule === card.id;
            const Icon = iconMap[card.icon];

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className={`${sizeClass} group`}
                onMouseEnter={() => setHoveredModule(card.id)}
                onMouseLeave={() => setHoveredModule(null)}
              >
                <div className={`relative h-full glass-light rounded-2xl border border-white/5 overflow-hidden card-intelligence ${
                  index === 0 ? 'bg-gradient-to-br from-forest-900/20 to-slate-900/20' : ''
                }`}>
                  {/* Gradient accent */}
                  <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${colorMap[card.color]} opacity-5 rounded-bl-full transition-opacity duration-500 ${isHovered && 'opacity-15'}`} />

                  {/* Content container */}
                  <div className="relative h-full p-6 flex flex-col">
                    {/* Icon and header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorMap[card.color]} text-white flex items-center justify-center shadow-lg ${index === 0 ? 'glow-forest' : ''}`}>
                        {Icon}
                      </div>
                      {index === 0 && (
                        <div className="flex items-center gap-1 px-2 py-1 rounded-full glass-light border border-white/10">
                          <Zap className="w-3 h-3 text-amber-400" />
                          <span className="text-xs text-amber-400 font-medium">Featured</span>
                        </div>
                      )}
                    </div>

                    {/* Title and description */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-forest-300 transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">
                        {card.description}
                      </p>
                    </div>

                    {/* Metrics */}
                    <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5">
                      {card.metrics.map((metric, idx) => (
                        <div key={idx}>
                          <div className="text-lg font-bold text-white tabular-nums">
                            {metric.value.toLocaleString()}
                          </div>
                          <div className="text-xs text-slate-500 uppercase tracking-wider">
                            {metric.unit || metric.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Action bar */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                      <button 
                        onClick={() => router.push(card.link)}
                        className="flex items-center gap-2 text-sm font-medium text-forest-400 hover:text-forest-300 transition-colors group/btn"
                      >
                        <span>Access Module</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                      <div 
                        onClick={() => router.push(card.link)}
                        className="w-8 h-8 rounded-lg glass-light border border-white/10 flex items-center justify-center group-hover:border-forest-500/50 transition-colors cursor-pointer"
                      >
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-forest-400 transition-colors" />
                      </div>
                    </div>

                  </div>

                  {/* Hover border glow */}
                  <div className={`absolute inset-0 border-2 border-transparent rounded-2xl transition-colors duration-300 ${isHovered && 'border-forest-500/30'}`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom action strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 flex items-center justify-between glass-light rounded-xl p-6 border border-white/10"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-forest-500 to-glacier-600 flex items-center justify-center">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Complete Module Directory</h3>
              <p className="text-sm text-slate-400">Access all 24 intelligence modules across 5 ecological pillars</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="border-white/20 text-white hover:border-forest-400"
            onClick={() => router.push('/risk-monitoring')}
          >
            Browse Directory
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
