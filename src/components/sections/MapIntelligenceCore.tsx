'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
  Map as MapIcon, Layers, Search, Plus, Minus, Navigation, Eye, EyeOff, 
  Crosshair, Share2, Download, Maximize2, Filter, Info
} from 'lucide-react';
import { motion } from 'framer-motion';

const mapLayers = [
  { id: 'protected-areas', label: 'Protected Areas', color: 'bg-emerald-500', visible: true, count: 47 },
  { id: 'wetlands', label: 'Wetlands', color: 'bg-blue-500', visible: true, count: 1253 },
  { id: 'trails', label: 'Trails', color: 'bg-amber-500', visible: false, count: 156 },
  { id: 'sightings', label: 'Wildlife Sightings', color: 'bg-purple-500', visible: true, count: 4521 },
  { id: 'bloom-zones', label: 'Bloom Zones', color: 'bg-pink-500', visible: false, count: 78 },
  { id: 'hazards', label: 'Hazard Zones', color: 'bg-red-500', visible: true, count: 17 },
  { id: 'monitoring', label: 'Monitoring Stations', color: 'bg-sky-500', visible: true, count: 234 },
  { id: 'watersheds', label: 'Watersheds', color: 'bg-cyan-500', visible: false, count: 89 },
];

export function MapIntelligenceCore() {
  const [layers, setLayers] = useState(mapLayers);
  const [zoom, setZoom] = useState(10);
  const [showLayers, setShowLayers] = useState(true);

  const toggleLayer = (id: string) => {
    setLayers(layers.map(layer => 
      layer.id === id ? { ...layer, visible: !layer.visible } : layer
    ));
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setZoom(prev => direction === 'in' ? prev + 1 : prev - 1);
  };

  return (
    <section className="py-24 bg-slate-900 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />

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
            <div className="w-2 h-2 bg-glacier-500 rounded-full signal-pulse" />
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Spatial Intelligence
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                GIS Intelligence Core
              </h2>
              <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
                Advanced geospatial mapping with multi-layer ecological intelligence, 
                real-time monitoring overlays, and spatial analytics across Kashmir.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:border-forest-400" icon={<Share2 className="w-4 h-4" />}>
                Share
              </Button>
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:border-forest-400" icon={<Download className="w-4 h-4" />}>
                Export
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-forest-600 to-forest-500" icon={<Maximize2 className="w-4 h-4" />}>
                Launch Full Atlas
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Map container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            {/* Map surface */}
            <div className="relative h-[700px] bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950">
              {/* Simulated terrain */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Grid overlay */}
                <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="mapGridCore" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#mapGridCore)" />
                </svg>

                {/* Terrain-like gradients */}
                <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-forest-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-glacier-500/10 rounded-full blur-3xl" />
                
                {/* Water body simulations */}
                <div className="absolute top-1/3 left-1/2 w-40 h-28 bg-blue-400/15 rounded-full blur-xl transform -rotate-12" />
                <div className="absolute bottom-1/2 left-1/3 w-48 h-20 bg-blue-400/15 rounded-full blur-xl transform rotate-6" />
                <div className="absolute top-1/2 right-1/3 w-32 h-16 bg-blue-400/10 rounded-full blur-lg" />

                {/* Elevation contours */}
                <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100,200 Q200,150 300,200 T500,200" stroke="white" fill="none" strokeWidth="1" />
                  <path d="M100,250 Q200,200 300,250 T500,250" stroke="white" fill="none" strokeWidth="1" />
                  <path d="M100,300 Q200,250 300,300 T500,300" stroke="white" fill="none" strokeWidth="1" />
                  <path d="M100,350 Q200,300 300,350 T500,350" stroke="white" fill="none" strokeWidth="1" />
                </svg>

                {/* Layer markers */}
                {layers.filter(l => l.visible).map(layer => (
                  <React.Fragment key={layer.id}>
                    {layer.id === 'protected-areas' && (
                      <>
                        <div className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-emerald-500/30 rounded-lg bg-emerald-500/5 animate-pulse" />
                        <div className="absolute top-1/2 left-1/2 w-40 h-40 border-2 border-emerald-500/30 rounded-lg bg-emerald-500/5" />
                        <div className="absolute bottom-1/4 left-1/3 w-28 h-28 border-2 border-emerald-500/30 rounded-lg bg-emerald-500/5" />
                      </>
                    )}
                    {layer.id === 'wetlands' && (
                      <>
                        <div className="absolute top-1/3 left-1/2 w-20 h-14 bg-blue-500/20 rounded-full" />
                        <div className="absolute bottom-1/3 left-1/3 w-24 h-12 bg-blue-500/20 rounded-full" />
                        <div className="absolute top-1/2 right-1/4 w-16 h-10 bg-blue-500/20 rounded-full" />
                      </>
                    )}
                    {layer.id === 'sightings' && (
                      <>
                        {[...Array(8)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-3 h-3 bg-purple-500 rounded-full marker-pulse"
                            style={{
                              top: `${20 + (i * 12) % 60}%`,
                              left: `${15 + (i * 17) % 70}%`,
                            }}
                          />
                        ))}
                      </>
                    )}
                    {layer.id === 'hazards' && (
                      <>
                        <div className="absolute top-1/3 right-1/4 w-5 h-5 bg-red-500 rounded-sm rotate-45 signal-pulse" />
                        <div className="absolute bottom-1/3 right-1/3 w-5 h-5 bg-red-500 rounded-sm rotate-45 signal-pulse" />
                      </>
                    )}
                    {layer.id === 'monitoring' && (
                      <>
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute w-2 h-2 bg-sky-400 rounded-full"
                            style={{
                              top: `${25 + (i * 15) % 50}%`,
                              left: `${20 + (i * 20) % 60}%`,
                            }}
                          />
                        ))}
                      </>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Map controls - Top right */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                <Card className="glass-intense border-white/10 p-1" padding="none">
                  <div className="flex flex-col">
                    <button
                      onClick={() => handleZoom('in')}
                      className="p-3 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <Plus className="w-5 h-5 text-white" />
                    </button>
                    <div className="h-px bg-white/10" />
                    <button
                      onClick={() => handleZoom('out')}
                      className="p-3 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <Minus className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </Card>
                
                <Card className="glass-intense border-white/10 p-1" padding="none">
                  <button className="p-3 hover:bg-white/5 rounded-lg transition-colors">
                    <Crosshair className="w-5 h-5 text-white" />
                  </button>
                </Card>

                <Card className="glass-intense border-white/10 p-1" padding="none">
                  <button 
                    onClick={() => setShowLayers(!showLayers)}
                    className={`p-3 rounded-lg transition-colors ${showLayers ? 'bg-forest-500/20 text-forest-400' : 'hover:bg-white/5 text-white'}`}
                  >
                    <Layers className="w-5 h-5" />
                  </button>
                </Card>
              </div>

              {/* Search - Top center */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
                <Card className="glass-intense border-white/10 min-w-[400px]" padding="none">
                  <div className="flex items-center gap-3 px-4 py-3">
                    <Search className="w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search locations, species, layers, coordinates..."
                      className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-slate-500"
                    />
                    <Badge variant="info" size="sm">GIS</Badge>
                  </div>
                </Card>
              </div>

              {/* Layer panel - Right side */}
              {showLayers && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="absolute top-36 right-4 w-72 glass-intense border border-white/10 rounded-xl overflow-hidden z-20"
                >
                  <div className="p-4 border-b border-white/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-slate-400" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-white">
                          Map Layers
                        </span>
                      </div>
                      <Badge variant="info" size="sm">
                        {layers.filter(l => l.visible).length}/{layers.length}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-3 space-y-1 max-h-80 overflow-y-auto">
                    {layers.map(layer => (
                      <div
                        key={layer.id}
                        className="flex items-center justify-between gap-3 p-2.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group"
                        onClick={() => toggleLayer(layer.id)}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div className={`w-3 h-3 rounded ${layer.color} ${layer.visible ? '' : 'opacity-30'}`} />
                          <span className={`text-sm ${layer.visible ? 'text-white' : 'text-slate-500'}`}>
                            {layer.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-slate-500 tabular-nums">
                            {layer.count.toLocaleString()}
                          </span>
                          {layer.visible ? (
                            <Eye className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <EyeOff className="w-4 h-4 text-slate-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Map info - Bottom left */}
              <div className="absolute bottom-4 left-4 z-20">
                <Card className="glass-intense border-white/10" padding="sm">
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-4">
                      <span className="text-slate-500">Zoom</span>
                      <span className="font-mono text-white">{zoom}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-slate-500">Layers</span>
                      <span className="font-mono text-white">{layers.filter(l => l.visible).length} active</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-slate-500">Features</span>
                      <span className="font-mono text-white">12,847</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-slate-500">Coverage</span>
                      <span className="font-mono text-emerald-400">100%</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Quick filters - Bottom right */}
              <div className="absolute bottom-4 right-4 z-20">
                <Card className="glass-intense border-white/10" padding="sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Filter className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-white">
                      Quick Filters
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['Districts', 'Watersheds', 'Elevation', 'Season'].map((filter) => (
                      <button
                        key={filter}
                        className="px-3 py-1.5 rounded-lg glass-light border border-white/10 text-xs text-slate-300 hover:text-white hover:border-forest-500/50 transition-all"
                      >
                        {filter}
                      </button>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Center CTA overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Card className="glass-intense border-white/20 p-8 text-center">
                    <MapIcon className="w-12 h-12 text-forest-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">
                      Interactive Ecological Atlas
                    </h3>
                    <p className="text-sm text-slate-400 mb-6 max-w-md">
                      Access the full GIS platform with 42+ data layers, spatial analytics, 
                      and real-time monitoring integration
                    </p>
                    <Button size="lg" className="w-full bg-gradient-to-r from-forest-600 to-forest-500" icon={<MapIcon className="w-5 h-5" />}>
                      Launch Full Atlas
                    </Button>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Layer stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 mt-8"
        >
          {[
            { label: 'Total Layers', value: '42', icon: Layers },
            { label: 'Spatial Coverage', value: '100%', icon: MapIcon },
            { label: 'Active Features', value: '12.8K', icon: Eye },
            { label: 'Updates Today', value: '156', icon: Plus },
            { label: 'Protected Areas', value: '47', icon: Shield },
            { label: 'Water Bodies', value: '1,253', icon: Droplet },
            { label: 'Monitoring', value: '234', icon: Activity },
            { label: 'Alerts Active', value: '17', icon: Info },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.03 }}
            >
              <Card className="glass-light border-white/5 text-center p-4 hover:border-forest-500/30 transition-all card-intelligence" padding="none">
                <stat.icon className="w-5 h-5 mx-auto mb-2 text-slate-500" />
                <div className="text-xl font-bold text-white tabular-nums">
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Import missing icons
import { Shield, Droplet, Activity } from 'lucide-react';
