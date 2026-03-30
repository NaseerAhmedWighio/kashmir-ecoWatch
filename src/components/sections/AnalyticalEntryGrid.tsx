'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { intelligenceCards } from '@/lib/data';
import { 
  Map, 
  Leaf, 
  Shield, 
  Droplet, 
  Cloud, 
  Sun, 
  Footprints, 
  Book,
  ArrowRight,
  TrendingUp
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
  forest: 'from-forest-500 to-forest-700',
  glacier: 'from-glacier-500 to-glacier-700',
  earth: 'from-earth-500 to-earth-700',
  slate: 'from-slate-500 to-slate-700',
  alert: 'from-amber-500 to-amber-700',
};

export function AnalyticalEntryGrid() {
  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-forest-500 rounded-full" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Intelligence Modules
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Explore by Domain
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
            Access specialized intelligence systems for each ecological domain, 
            with integrated data layers, monitoring dashboards, and analytical tools.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {intelligenceCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="h-full card-hover group relative overflow-hidden" padding="lg">
                {/* Gradient background accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorMap[card.color]} opacity-5 rounded-bl-full transition-opacity group-hover:opacity-10`} />
                
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${colorMap[card.color]} text-white mb-4 shadow-lg`}>
                  {iconMap[card.icon]}
                </div>

                {/* Content */}
                <CardHeader className="mb-4">
                  <CardTitle className="text-lg group-hover:text-forest-600 dark:group-hover:text-forest-400 transition-colors">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {card.description}
                  </CardDescription>
                </CardHeader>

                {/* Metrics */}
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    {card.metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-baseline gap-1">
                        <span className="text-xl font-bold text-slate-900 dark:text-white">
                          {metric.value.toLocaleString()}
                        </span>
                        <span className="text-xs text-slate-500">
                          {metric.unit || metric.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action */}
                  <div className="flex items-center gap-2 text-sm font-medium text-forest-600 dark:text-forest-400 group-hover:gap-3 transition-all">
                    <span>Explore Module</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>

                {/* Hover border */}
                <div className={`absolute inset-0 border-2 border-transparent group-hover:border-${card.color}-500/30 rounded-xl transition-colors pointer-events-none`} />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <button className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-forest-600 dark:hover:text-forest-400 transition-colors group">
            View All Intelligence Modules
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
