'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import {
  Map, BookOpen, Leaf, ArrowRight, Compass, Layers, Search, ChevronDown, ChevronUp, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const intelligencePaths = [
  {
    id: 'spatial-analysis',
    title: 'Spatial Analysis',
    description: 'Interactive GIS atlas with multi-layer ecological intelligence',
    icon: Map,
    color: 'from-blue-500 to-indigo-600',
    route: '/atlas',
    bestFor: 'Atlas-based ecological exploration',
    dataType: 'Layers, boundaries, habitats, monitoring overlays',
    resultType: 'Interactive spatial visualizations & measurements',
    cta: 'Open Map Workspace',
  },
  {
    id: 'regional-profiles',
    title: 'Regional Profiles',
    description: 'District-level ecological health assessments and risk indicators',
    icon: Compass,
    color: 'from-emerald-500 to-green-600',
    route: '/districts',
    bestFor: 'Regional environmental health tracking',
    dataType: 'Scorecards, comparisons, local ecological data',
    resultType: 'Comprehensive district ecological reports',
    cta: 'View District Profiles',
  },
  {
    id: 'thematic-monitoring',
    title: 'Thematic Monitoring',
    description: 'Domain-specific tracking: biodiversity, water, pollution, hazards',
    icon: Layers,
    color: 'from-violet-500 to-purple-600',
    route: '/biodiversity',
    bestFor: 'Specialized ecological domain research',
    dataType: 'Thematic modules, time-series data, indicators',
    resultType: 'Focused environmental monitoring dashboards',
    cta: 'Access Thematic Data',
  },
];

const quickStartTips = [
  {
    icon: Search,
    title: 'Use Global Search',
    description: 'Press ⌘K or click search to find species, locations, and data instantly',
  },
  {
    icon: BookOpen,
    title: 'Read Documentation',
    description: 'Learn how to use each module with guided tutorials and examples',
  },
  {
    icon: Leaf,
    title: 'Contribute Data',
    description: 'Submit sightings, report issues, or join citizen science programs',
  },
];

export function OnboardingStrip() {
  const router = useRouter();
  const [showTips, setShowTips] = useState(false);

  return (
    <section className="pt-16 md:pt-20 pb-16 md:pb-20 bg-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Intelligence pathways */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <div className="text-center mb-6 sm:mb-8 px-4 sm:px-0">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              Choose Your Intelligence Path
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
              Select an exploration pathway aligned with your research objectives
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {intelligencePaths.map((pathway, index) => (
              <motion.div
                key={pathway.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-light border-white/10 hover:border-white/20 transition-all p-4 sm:p-6 h-full group cursor-pointer">
                  {/* Header */}
                  <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-5">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${pathway.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <pathway.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors mb-1 break-words">
                        {pathway.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        {pathway.description}
                      </p>
                    </div>
                  </div>

                  {/* Intelligence metadata */}
                  <div className="space-y-3 mb-4 sm:mb-5">
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider flex-shrink-0">
                        Best for
                      </span>
                      <span className="text-xs sm:text-sm text-slate-300">
                        {pathway.bestFor}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider flex-shrink-0">
                        Data type
                      </span>
                      <span className="text-xs sm:text-sm text-slate-300">
                        {pathway.dataType}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[10px] sm:text-xs font-semibold text-slate-500 uppercase tracking-wider flex-shrink-0">
                        Result type
                      </span>
                      <span className="text-xs sm:text-sm text-slate-300">
                        {pathway.resultType}
                      </span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    size="sm"
                    className={`w-full bg-gradient-to-r ${pathway.color} hover:opacity-90 text-white text-xs sm:text-sm`}
                    onClick={() => router.push(pathway.route)}
                  >
                    <span>{pathway.cta}</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Collapsible quick start tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="glass-intense border-white/10">
            <button
              onClick={() => setShowTips(!showTips)}
              className="w-full p-4 sm:p-6 md:p-8 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-emerald-400" />
                <div className="text-left">
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Quick Start Guide
                  </h3>
                  <p className="text-xs text-slate-400">
                    Essential tips for getting started
                  </p>
                </div>
              </div>
              {showTips ? (
                <ChevronUp className="w-5 h-5 text-slate-400" />
              ) : (
                <ChevronDown className="w-5 h-5 text-slate-400" />
              )}
            </button>

            <AnimatePresence>
              {showTips && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 sm:px-6 md:px-8 pb-6 sm:pb-8 pt-0 border-t border-white/10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pt-4 sm:pt-6">
                      {quickStartTips.map((tip, index) => (
                        <div key={index} className="flex items-start gap-3 sm:gap-4">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center flex-shrink-0">
                            <tip.icon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-bold text-white mb-1 break-words">
                              {tip.title}
                            </h4>
                            <p className="text-xs text-slate-400 leading-relaxed">
                              {tip.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
