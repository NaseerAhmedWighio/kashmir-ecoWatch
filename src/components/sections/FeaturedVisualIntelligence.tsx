'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { featuredEntities } from '@/lib/data';
import { 
  MapPin, 
  Mountain, 
  Trees, 
  Flower2, 
  Footprints, 
  Building2,
  ArrowRight,
  Heart,
  Share2
} from 'lucide-react';
import { motion } from 'framer-motion';

const typeConfig: Record<string, { icon: React.ReactNode; color: string; label: string }> = {
  protected_area: { 
    icon: <Mountain className="w-4 h-4" />, 
    color: 'bg-emerald-500',
    label: 'Protected Area'
  },
  lake: { 
    icon: <Trees className="w-4 h-4" />, 
    color: 'bg-blue-500',
    label: 'Water Body'
  },
  species: { 
    icon: <Heart className="w-4 h-4" />, 
    color: 'bg-purple-500',
    label: 'Species'
  },
  bloom: { 
    icon: <Flower2 className="w-4 h-4" />, 
    color: 'bg-pink-500',
    label: 'Bloom Zone'
  },
  trail: { 
    icon: <Footprints className="w-4 h-4" />, 
    color: 'bg-amber-500',
    label: 'Trail'
  },
  district: { 
    icon: <Building2 className="w-4 h-4" />, 
    color: 'bg-slate-500',
    label: 'District'
  },
};

export function FeaturedVisualIntelligence() {
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
              Featured Intelligence
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Explore Featured Entities
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
                Discover key ecological assets, critical habitats, and significant 
                environmental features across Kashmir.
              </p>
            </div>
            <Button size="lg" variant="outline" icon={<ArrowRight className="w-5 h-5" />}>
              Browse All Entities
            </Button>
          </div>
        </motion.div>

        {/* Featured entities grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredEntities.map((entity, index) => {
            const config = typeConfig[entity.type];
            
            return (
              <motion.div
                key={entity.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card className="overflow-hidden group h-full" padding="none" hover>
                  {/* Image placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 overflow-hidden">
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />
                    
                    {/* Simulated image - gradient based on type */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${
                      entity.type === 'protected_area' ? 'from-forest-400 to-forest-700' :
                      entity.type === 'lake' ? 'from-blue-400 to-blue-700' :
                      entity.type === 'species' ? 'from-purple-400 to-purple-700' :
                      entity.type === 'bloom' ? 'from-pink-400 to-pink-700' :
                      entity.type === 'trail' ? 'from-amber-400 to-amber-700' :
                      'from-slate-400 to-slate-700'
                    } opacity-80 group-hover:scale-110 transition-transform duration-500`} />
                    
                    {/* Type badge */}
                    <div className="absolute top-3 left-3 z-20">
                      <Badge className={`${config.color} text-white border-0`}>
                        {config.icon}
                        <span className="ml-1.5">{config.label}</span>
                      </Badge>
                    </div>

                    {/* Action buttons */}
                    <div className="absolute top-3 right-3 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
                        <Heart className="w-4 h-4 text-white" />
                      </button>
                      <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
                        <Share2 className="w-4 h-4 text-white" />
                      </button>
                    </div>

                    {/* Name overlay */}
                    <div className="absolute bottom-3 left-3 right-3 z-20">
                      <h3 className="text-lg font-bold text-white mb-1">
                        {entity.name}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-5">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                      {entity.description}
                    </p>

                    {/* Metrics */}
                    <div className="flex items-center gap-4 mb-4">
                      {entity.metrics.map((metric, idx) => (
                        <div key={idx} className="flex items-baseline gap-1">
                          <span className="text-lg font-bold text-slate-900 dark:text-white">
                            {metric.value.toLocaleString()}
                          </span>
                          <span className="text-xs text-slate-500">
                            {metric.unit || ''}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Action */}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full group-hover:border-forest-500 group-hover:text-forest-600 dark:group-hover:text-forest-400 transition-colors"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Quick navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12"
        >
          <Card padding="lg" className="bg-gradient-to-r from-forest-600 to-glacier-600 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold mb-2">
                  Explore by Geography
                </h3>
                <p className="text-forest-100 text-sm max-w-xl">
                  Browse ecological intelligence by district, watershed, protected area, 
                  or custom geographical boundaries.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Districts', 'Watersheds', 'Protected Areas', 'Wildlife Corridors', 'Bloom Zones'].map((item) => (
                  <button
                    key={item}
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-colors text-sm font-medium"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
