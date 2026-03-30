'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import {
  Map, BookOpen, Leaf, ArrowRight, Compass, Layers, Search
} from 'lucide-react';
import { motion } from 'framer-motion';

const pathways = [
  {
    id: 'explore-map',
    title: 'Explore by Map',
    description: 'Interactive GIS atlas with ecological layers, species distribution, and protected areas',
    icon: Map,
    color: 'from-blue-500 to-indigo-600',
    route: '/atlas',
    features: ['Spatial Analysis', 'Layer Controls', 'Measurement Tools'],
  },
  {
    id: 'explore-district',
    title: 'Explore by District',
    description: 'District-level ecological profiles, risk assessments, and conservation status',
    icon: Compass,
    color: 'from-emerald-500 to-green-600',
    route: '/districts',
    features: ['Scorecards', 'Comparisons', 'Local Data'],
  },
  {
    id: 'explore-theme',
    title: 'Explore by Theme',
    description: 'Browse by ecological domain: biodiversity, water, pollution, seasons, and hazards',
    icon: Layers,
    color: 'from-violet-500 to-purple-600',
    route: '/biodiversity',
    features: ['Thematic Modules', 'Research Data', 'Monitoring'],
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

  return (
    <section className="py-16 bg-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-10" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Main pathways */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-3">
              How to Use Kashmir EcoWatch
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Choose your exploration pathway or dive straight into the data
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pathways.map((pathway, index) => (
              <motion.div
                key={pathway.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card
                  className="glass-light border-white/10 hover:border-white/20 transition-all p-6 h-full group cursor-pointer"
                  onClick={() => window.location.href = pathway.route}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pathway.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <pathway.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors mb-2">
                        {pathway.title}
                      </h3>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {pathway.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {pathway.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1 rounded-full glass-light border border-white/10 text-xs text-slate-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <Button
                    size="sm"
                    className={`w-full bg-gradient-to-r ${pathway.color} hover:opacity-90 text-white`}
                    onClick={() => router.push(pathway.route)}
                  >
                    <span>Start Exploring</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick start tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="glass-intense border-white/10 p-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-white mb-2">
                Quick Start Tips
              </h3>
              <p className="text-sm text-slate-400">
                Get the most out of Kashmir EcoWatch with these helpful tips
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickStartTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center flex-shrink-0">
                    <tip.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">
                      {tip.title}
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {tip.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
