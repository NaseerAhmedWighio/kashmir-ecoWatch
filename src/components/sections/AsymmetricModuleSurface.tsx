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

  const isFeaturedCard = (index: number) => index === 0;
  const isWideCard = (index: number) => index === 3 || index === 6;

  return (
    <section className="pt-12 sm:pt-16 md:pt-20 lg:pt-24 xl:pt-32 pb-8 sm:pb-12 md:pb-16 bg-slate-950 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-forest-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-glacier-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-3 sm:px-4 md:px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8 md:mb-10 lg:mb-12"
        >
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-forest-500 rounded-full signal-pulse" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-slate-400">
              Intelligence Domains
            </span>
          </div>
          <div className="flex flex-col gap-3 sm:gap-4">
            <div>
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 sm:mb-3 tracking-tight">
                Modular Intelligence Surface
              </h2>
              <p className="text-slate-400 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed">
                Access specialized ecological intelligence systems with integrated data layers,
                monitoring dashboards, and analytical tools across all environmental domains.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push('/risk-monitoring')}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg glass-light border border-white/10 text-xs sm:text-sm text-slate-300 hover:text-white hover:border-forest-500/50 transition-all flex-shrink-0"
              >
                <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">View All Modules</span>
                <span className="xs:hidden">View All</span>
              </button>
              <button
                onClick={() => router.push('/risk-monitoring/dashboards')}
                className="hidden sm:flex items-center gap-1.5 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg glass-light border border-white/10 text-xs sm:text-sm text-slate-300 hover:text-white hover:border-forest-500/50 transition-all"
              >
                <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Activity Log</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[120px] sm:auto-rows-[150px] md:auto-rows-[200px]">
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
                onClick={() => router.push(card.link)}
              >
                <div
                  className={`relative h-full glass-light rounded-xl sm:rounded-2xl border border-white/5 overflow-hidden card-intelligence cursor-pointer ${
                    index === 0 ? 'bg-gradient-to-br from-forest-900/20 to-slate-900/20' : ''
                  }`}
                >
                  {/* Gradient accent */}
                  <div className={`absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br ${colorMap[card.color]} opacity-5 rounded-bl-full transition-opacity duration-500 ${isHovered && 'opacity-15'}`} />

                  {/* Content container */}
                  <div className="relative h-full p-3 sm:p-4 md:p-6 flex flex-col justify-between">
                    {/* Top section: Icon, Title, Description */}
                    <div>
                      {/* Icon and header */}
                      <div className="flex items-start justify-between mb-2 sm:mb-3 md:mb-4">
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${colorMap[card.color]} text-white flex items-center justify-center shadow-lg ${index === 0 ? 'glow-forest' : ''}`}>
                          {Icon}
                        </div>
                        {index === 0 && (
                          <div className="flex items-center gap-1 px-1 sm:px-1.5 md:px-2 py-0.5 sm:py-1 rounded-full glass-light border border-white/10">
                            <Zap className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-amber-400" />
                            <span className="text-[9px] sm:text-[10px] md:text-xs text-amber-400 font-medium">Featured</span>
                          </div>
                        )}
                      </div>

                      {/* Title and description */}
                      <div className="mb-2 sm:mb-3 md:mb-4">
                        <h3 className={`font-bold text-white mb-1.5 sm:mb-2 group-hover:text-forest-300 transition-colors ${index === 0 ? 'text-base sm:text-lg md:text-xl' : 'text-sm sm:text-base md:text-lg'}`}>
                          {card.title}
                        </h3>
                        <p className={`text-slate-400 leading-relaxed ${index === 0 ? 'text-xs sm:text-sm' : 'text-[10px] sm:text-xs'}`}>
                          {card.description}
                        </p>
                      </div>
                    </div>

                    {/* Bottom section: Metrics, Action bar with Access Button - only for featured card */}
                    {isFeaturedCard(index) && (
                      <div className="space-y-2 sm:space-y-3">
                        {/* Metrics with top border */}
                        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-3 border-t border-white/5">
                          {card.metrics.map((metric, idx) => (
                            <div key={idx}>
                              <div className="text-base sm:text-lg md:text-xl font-bold text-white tabular-nums">
                                {metric.value.toLocaleString()}
                              </div>
                              <div className="text-[9px] sm:text-[10px] md:text-xs text-slate-500 uppercase tracking-wider">
                                {metric.unit || metric.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Action bar with top border - Access Module button on left, arrow on right */}
                        <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-white/5">
                          <button
                            className="flex items-center gap-1 sm:gap-1.5 md:gap-2 text-xs sm:text-sm font-medium text-forest-400 hover:text-forest-300 transition-colors group/btn"
                          >
                            <span>Access Module</span>
                            <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 group-hover/btn:translate-x-1 transition-transform" />
                          </button>
                          <div
                            className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg glass-light border border-white/10 flex items-center justify-center group-hover:border-forest-500/50 transition-colors"
                          >
                            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-slate-400 group-hover:text-forest-400 transition-colors" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Access Module Button - for non-featured cards only */}
                    {!isFeaturedCard(index) && (
                      <button
                        className="flex items-center gap-1 sm:gap-1.5 md:gap-2 text-xs sm:text-sm font-medium text-forest-400 hover:text-forest-300 transition-colors group/btn"
                      >
                        <span>Access Module</span>
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    )}

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
          className="mt-6 sm:mt-8 md:mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-between glass-light rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-white/10"
        >
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-forest-500 to-glacier-600 flex items-center justify-center">
              <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm md:text-base font-bold text-white">Complete Module Directory</h3>
              <p className="text-[10px] sm:text-xs md:text-sm text-slate-400">Access all 24 intelligence modules across 5 ecological pillars</p>
            </div>
          </div>
          <Button
            variant="outline"
            className="border-white/20 text-white hover:border-forest-400 text-xs sm:text-sm md:text-base w-full sm:w-auto"
            onClick={() => router.push('/risk-monitoring')}
          >
            Browse Directory
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1.5 sm:ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
