'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Map as MapIcon, Layers, Search, Plus, Minus, Navigation, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const mapLayers = [
  { id: 'protected-areas', label: 'Protected Areas', color: 'bg-emerald-500', visible: true },
  { id: 'wetlands', label: 'Wetlands', color: 'bg-blue-500', visible: true },
  { id: 'trails', label: 'Trails', color: 'bg-amber-500', visible: false },
  { id: 'sightings', label: 'Sightings', color: 'bg-purple-500', visible: true },
  { id: 'bloom-zones', label: 'Bloom Zones', color: 'bg-pink-500', visible: false },
  { id: 'hazards', label: 'Hazard Zones', color: 'bg-red-500', visible: true },
];

export function MapPreviewSection() {
  const [layers, setLayers] = useState(mapLayers);
  const [zoom, setZoom] = useState(10);

  const toggleLayer = (id: string) => {
    setLayers(layers.map(layer => 
      layer.id === id ? { ...layer, visible: !layer.visible } : layer
    ));
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setZoom(prev => direction === 'in' ? prev + 1 : prev - 1);
  };

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
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
            <div className="w-2 h-2 bg-glacier-500 rounded-full" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Spatial Intelligence
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
                Interactive Ecological Atlas
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
                Explore Kashmir's ecosystems through advanced GIS mapping with 
                multi-layer spatial intelligence and real-time monitoring overlays.
              </p>
            </div>
            <Button size="lg" icon={<MapIcon className="w-5 h-5" />}>
              Open Full Atlas
            </Button>
          </div>
        </motion.div>

        {/* Map container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <Card className="overflow-hidden" padding="none">
            <div className="relative h-[600px] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
              {/* Simulated map background */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Grid pattern */}
                <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="mapGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                      <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#mapGrid)" />
                </svg>

                {/* Simulated terrain features */}
                <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-forest-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-glacier-500/10 rounded-full blur-3xl" />
                
                {/* Simulated water bodies */}
                <div className="absolute top-1/3 left-1/2 w-32 h-24 bg-blue-400/20 rounded-full blur-xl transform -rotate-12" />
                <div className="absolute bottom-1/2 left-1/3 w-40 h-16 bg-blue-400/20 rounded-full blur-xl transform rotate-6" />

                {/* Simulated layer markers */}
                {layers.filter(l => l.visible).map(layer => (
                  <React.Fragment key={layer.id}>
                    {layer.id === 'protected-areas' && (
                      <>
                        <div className="absolute top-1/4 left-1/4 w-24 h-24 border-2 border-emerald-500/40 rounded-lg bg-emerald-500/5" />
                        <div className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-emerald-500/40 rounded-lg bg-emerald-500/5" />
                      </>
                    )}
                    {layer.id === 'wetlands' && (
                      <>
                        <div className="absolute top-1/3 left-1/2 w-16 h-12 bg-blue-500/30 rounded-full" />
                        <div className="absolute bottom-1/3 left-1/3 w-20 h-10 bg-blue-500/30 rounded-full" />
                      </>
                    )}
                    {layer.id === 'sightings' && (
                      <>
                        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-purple-500 rounded-full animate-pulse" />
                        <div className="absolute top-1/2 left-2/3 w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-300" />
                        <div className="absolute bottom-1/4 left-1/2 w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-500" />
                      </>
                    )}
                    {layer.id === 'hazards' && (
                      <>
                        <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-red-500 rounded-sm rotate-45 animate-pulse" />
                        <div className="absolute bottom-1/3 right-1/3 w-4 h-4 bg-red-500 rounded-sm rotate-45 animate-pulse delay-700" />
                      </>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Map controls - Top right */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Card className="p-2" padding="none">
                  <div className="flex flex-col">
                    <button
                      onClick={() => handleZoom('in')}
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <Plus className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                    </button>
                    <div className="h-px bg-slate-200 dark:bg-slate-700" />
                    <button
                      onClick={() => handleZoom('out')}
                      className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <Minus className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                    </button>
                  </div>
                </Card>
                
                <Card className="p-2" padding="none">
                  <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                    <Navigation className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                  </button>
                </Card>
              </div>

              {/* Search - Top left */}
              <div className="absolute top-4 left-4">
                <Card className="p-2 min-w-[300px]" padding="none">
                  <div className="flex items-center gap-2 px-2">
                    <Search className="w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search locations, species, layers..."
                      className="flex-1 bg-transparent border-none outline-none text-sm py-2 text-slate-700 dark:text-slate-300 placeholder-slate-400"
                    />
                  </div>
                </Card>
              </div>

              {/* Layer toggle - Bottom left */}
              <div className="absolute bottom-4 left-4">
                <Card padding="sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Layers className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                      Map Layers
                    </span>
                  </div>
                  <div className="space-y-2">
                    {layers.map(layer => (
                      <div
                        key={layer.id}
                        className="flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded px-2 py-1.5 transition-colors"
                        onClick={() => toggleLayer(layer.id)}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded ${layer.color}`} />
                          <span className="text-sm text-slate-700 dark:text-slate-300">
                            {layer.label}
                          </span>
                        </div>
                        {layer.visible ? (
                          <Eye className="w-4 h-4 text-slate-500" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Map info - Bottom right */}
              <div className="absolute bottom-4 right-4">
                <Card padding="sm">
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between gap-8">
                      <span className="text-slate-500">Zoom Level</span>
                      <span className="font-mono text-slate-700 dark:text-slate-300">{zoom}</span>
                    </div>
                    <div className="flex items-center justify-between gap-8">
                      <span className="text-slate-500">Active Layers</span>
                      <span className="font-mono text-slate-700 dark:text-slate-300">
                        {layers.filter(l => l.visible).length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-8">
                      <span className="text-slate-500">Features</span>
                      <span className="font-mono text-slate-700 dark:text-slate-300">2,847</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Center CTA */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Button size="lg" className="shadow-2xl" icon={<MapIcon className="w-5 h-5" />}>
                    Launch Interactive Atlas
                  </Button>
                </motion.div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
        >
          {[
            { label: 'Total Layers', value: '42', icon: Layers },
            { label: 'Spatial Coverage', value: '100%', icon: MapIcon },
            { label: 'Active Features', value: '12,847', icon: Eye },
            { label: 'Updates Today', value: '156', icon: Plus },
          ].map((stat, index) => (
            <Card key={index} className="text-center" padding="md">
              <stat.icon className="w-5 h-5 mx-auto mb-2 text-slate-400" />
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
