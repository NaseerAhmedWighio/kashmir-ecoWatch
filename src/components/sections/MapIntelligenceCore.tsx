'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Map as MapIcon, Layers, Search, Plus, Minus, Navigation, Eye, EyeOff,
  Crosshair, Share2, Download, Maximize2, Filter, Info, ChevronRight,
  MapPin, Droplets, Mountain, AlertTriangle, Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const mapLayers = [
  { id: 'protected-areas', label: 'Protected Areas', color: 'bg-emerald-500', visible: true, count: 47 },
  { id: 'wetlands', label: 'Wetlands', color: 'bg-blue-500', visible: true, count: 1253 },
  { id: 'trails', label: 'Trails', color: 'bg-amber-500', visible: false, count: 156 },
  { id: 'sightings', label: 'Wildlife Sightings', color: 'bg-purple-500', visible: true, count: 4521 },
  { id: 'bloom-zones', label: 'Algal Bloom Zones', color: 'bg-pink-500', visible: false, count: 78 },
  { id: 'hazards', label: 'Hazard Zones', color: 'bg-red-500', visible: true, count: 17 },
  { id: 'monitoring', label: 'Monitoring Stations', color: 'bg-sky-500', visible: true, count: 234 },
  { id: 'watersheds', label: 'Watersheds', color: 'bg-cyan-500', visible: false, count: 89 },
];

const selectedFeatures = [
  {
    id: 'dal-lake',
    name: 'Dal Lake',
    type: 'wetland',
    district: 'Srinagar',
    status: 'Active Monitoring',
    statusColor: 'warning',
    area: '18 km\u00B2',
    wqi: 62,
    bloomRisk: 'Moderate',
    alerts: 2,
    coordinates: '34.08\u00B0N, 74.84\u00B0E',
  },
  {
    id: 'dachigam',
    name: 'Dachigam National Park',
    type: 'protected',
    district: 'Srinagar',
    status: 'Protected',
    statusColor: 'success',
    area: '141 km\u00B2',
    species: 650,
    hangulPopulation: '~180',
    alerts: 0,
    coordinates: '34.15\u00B0N, 75.06\u00B0E',
  },
  {
    id: 'hokersar',
    name: 'Hokersar Wetland',
    type: 'wetland',
    district: 'Srinagar',
    status: 'Bird Migration Active',
    statusColor: 'info',
    area: '13.75 km\u00B2',
    birdCount: '12,000+',
    species: 89,
    alerts: 1,
    coordinates: '34.17\u00B0N, 74.82\u00B0E',
  },
];

export function MapIntelligenceCore() {
  const [layers, setLayers] = useState(mapLayers);
  const [zoom, setZoom] = useState(10);
  const [showLayers, setShowLayers] = useState(true);
  const [selectedFeature, setSelectedFeature] = useState<string | null>('dal-lake');
  const [showMiniDrawer, setShowMiniDrawer] = useState(true);

  const toggleLayer = (id: string) => {
    setLayers(layers.map(layer =>
      layer.id === id ? { ...layer, visible: !layer.visible } : layer
    ));
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setZoom(prev => direction === 'in' ? prev + 1 : prev - 1);
  };

  const getFeatureData = (id: string) => selectedFeatures.find(f => f.id === id);
  const currentFeature = selectedFeature ? getFeatureData(selectedFeature) : null;

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
              <Button 
                size="sm" 
                className="bg-gradient-to-r from-forest-600 to-forest-500" 
                icon={<Maximize2 className="w-4 h-4" />}
                onClick={() => window.location.href = '/atlas'}
              >
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
          className="grid grid-cols-1 lg:grid-cols-4 gap-6"
        >
          {/* Main map area - 3 columns */}
          <div className="lg:col-span-3">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              {/* Map surface */}
              <div className="relative h-[600px] bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950">
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

                  {/* Water body simulations - Highlighted Dal Lake */}
                  <motion.div 
                    className="absolute top-1/3 left-1/2 w-40 h-28 bg-blue-400/25 rounded-full blur-xl transform -rotate-12 cursor-pointer border-2 border-blue-400/50"
                    onClick={() => { setSelectedFeature('dal-lake'); setShowMiniDrawer(true); }}
                    whileHover={{ scale: 1.05 }}
                  />
                  <div className="absolute bottom-1/3 left-1/3 w-48 h-20 bg-blue-400/15 rounded-full blur-xl transform rotate-6" />
                  <div className="absolute top-1/2 right-1/3 w-32 h-16 bg-blue-400/10 rounded-full blur-lg" />

                  {/* Protected areas - Highlighted Dachigam */}
                  <motion.div
                    className="absolute top-1/4 left-1/4 w-32 h-32 border-2 border-emerald-400/50 rounded-lg bg-emerald-500/10 cursor-pointer"
                    onClick={() => { setSelectedFeature('dachigam'); setShowMiniDrawer(true); }}
                    whileHover={{ scale: 1.05, borderColor: 'rgba(52, 211, 153, 0.8)' }}
                  />
                  <div className="absolute top-1/2 left-1/2 w-40 h-40 border-2 border-emerald-500/30 rounded-lg bg-emerald-500/5" />
                  <div className="absolute bottom-1/4 left-1/3 w-28 h-28 border-2 border-emerald-500/30 rounded-lg bg-emerald-500/5" />

                  {/* Wetlands - Highlighted Hokersar */}
                  <motion.div
                    className="absolute top-1/5 left-1/3 w-20 h-14 bg-blue-400/30 rounded-full cursor-pointer border-2 border-blue-400/60"
                    onClick={() => { setSelectedFeature('hokersar'); setShowMiniDrawer(true); }}
                    whileHover={{ scale: 1.1 }}
                  />
                  <div className="absolute bottom-1/3 left-1/3 w-24 h-12 bg-blue-500/20 rounded-full" />
                  <div className="absolute top-1/2 right-1/4 w-16 h-10 bg-blue-500/20 rounded-full" />

                  {/* Layer markers */}
                  {layers.filter(l => l.visible).map(layer => (
                    <React.Fragment key={layer.id}>
                      {layer.id === 'sightings' && (
                        <>
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-3 h-3 bg-purple-500 rounded-full marker-pulse cursor-pointer hover:scale-150 transition-transform"
                              style={{
                                top: `${20 + (i * 12) % 60}%`,
                                left: `${15 + (i * 17) % 70}%`,
                              }}
                              whileHover={{ scale: 1.5 }}
                            />
                          ))}
                        </>
                      )}
                      {layer.id === 'hazards' && (
                        <>
                          <motion.div 
                            className="absolute top-1/3 right-1/4 w-5 h-5 bg-red-500 rounded-sm rotate-45 signal-pulse cursor-pointer"
                            whileHover={{ scale: 1.3, rotate: 0 }}
                          />
                          <div className="absolute bottom-1/3 right-1/3 w-5 h-5 bg-red-500 rounded-sm rotate-45 signal-pulse" />
                        </>
                      )}
                      {layer.id === 'monitoring' && (
                        <>
                          {[...Array(6)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute w-2 h-2 bg-sky-400 rounded-full cursor-pointer hover:scale-150 transition-transform"
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

                {/* Mini Feature Drawer - Left side */}
                <AnimatePresence>
                  {showMiniDrawer && currentFeature && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="absolute top-36 left-4 w-80 glass-intense border border-white/10 rounded-xl overflow-hidden z-20"
                    >
                      {/* Drawer header with feature type icon */}
                      <div className={`p-4 bg-gradient-to-r ${
                        currentFeature.type === 'wetland' ? 'from-blue-600/20 to-blue-800/10' :
                        currentFeature.type === 'protected' ? 'from-emerald-600/20 to-emerald-800/10' :
                        'from-slate-600/20 to-slate-800/10'
                      }`}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            {currentFeature.type === 'wetland' ? (
                              <Droplets className="w-6 h-6 text-blue-400" />
                            ) : currentFeature.type === 'protected' ? (
                              <Mountain className="w-6 h-6 text-emerald-400" />
                            ) : (
                              <MapPin className="w-6 h-6 text-slate-400" />
                            )}
                            <div>
                              <h3 className="text-lg font-bold text-white">{currentFeature.name}</h3>
                              <p className="text-xs text-slate-400">{currentFeature.district} District</p>
                            </div>
                          </div>
                          <button
                            onClick={() => setShowMiniDrawer(false)}
                            className="p-1 rounded hover:bg-white/5 transition-colors"
                          >
                            <ChevronRight className="w-4 h-4 text-slate-400" />
                          </button>
                        </div>
                        
                        {/* Status badge */}
                        <div className="mt-3">
                          <Badge
                            variant={
                              currentFeature.statusColor === 'success' ? 'success' :
                              currentFeature.statusColor === 'warning' ? 'warning' : 'info'
                            }
                            size="sm"
                          >
                            {currentFeature.status}
                          </Badge>
                        </div>
                      </div>

                      {/* Drawer content */}
                      <div className="p-4 space-y-4">
                        {/* Quick stats */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-3 rounded-lg glass-light border border-white/5">
                            <div className="text-xs text-slate-500 mb-1">Area</div>
                            <div className="text-lg font-bold text-white">{currentFeature.area}</div>
                          </div>
                          <div className="p-3 rounded-lg glass-light border border-white/5">
                            <div className="text-xs text-slate-500 mb-1">Coordinates</div>
                            <div className="text-sm font-mono text-white">{currentFeature.coordinates}</div>
                          </div>
                        </div>

                        {/* Feature-specific metrics */}
                        {currentFeature.type === 'wetland' && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-400">Water Quality Index</span>
                              <span className={`font-bold ${
                                (currentFeature as any).wqi >= 70 ? 'text-emerald-400' :
                                (currentFeature as any).wqi >= 50 ? 'text-amber-400' : 'text-red-400'
                              }`}>{(currentFeature as any).wqi}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-400">Bloom Risk</span>
                              <Badge variant="warning" size="sm">{currentFeature.bloomRisk}</Badge>
                            </div>
                            {currentFeature.birdCount && (
                              <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Bird Count</span>
                                <span className="text-blue-400 font-bold">{currentFeature.birdCount}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {currentFeature.type === 'protected' && (
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-400">Species Count</span>
                              <span className="text-emerald-400 font-bold">{(currentFeature as any).species}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-slate-400">Hangul Population</span>
                              <span className="text-amber-400 font-bold">{(currentFeature as any).hangulPopulation}</span>
                            </div>
                          </div>
                        )}

                        {/* Alerts */}
                        {currentFeature.alerts > 0 && (
                          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <AlertTriangle className="w-4 h-4 text-red-400" />
                            <span className="text-sm text-red-400">{currentFeature.alerts} active alert(s)</span>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-forest-600 to-forest-500"
                            onClick={() => window.location.href = `/water-systems/lakes/${currentFeature.id}`}
                          >
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/20 text-white hover:border-forest-400"
                            onClick={() => window.location.href = '/atlas'}
                          >
                            <MapIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

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

                {/* Selected feature indicator */}
                {selectedFeature && (
                  <div className="absolute bottom-20 left-4 z-20">
                    <Card className="glass-intense border border-emerald-500/30 p-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full signal-pulse" />
                        <span className="text-xs text-slate-300">
                          Selected: <span className="font-bold text-white">{currentFeature?.name}</span>
                        </span>
                        <button
                          onClick={() => { setSelectedFeature(null); setShowMiniDrawer(false); }}
                          className="p-1 rounded hover:bg-white/5 transition-colors"
                        >
                          <ChevronRight className="w-3 h-3 text-slate-400" />
                        </button>
                      </div>
                    </Card>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right sidebar - Featured selections - 1 column */}
          <div className="lg:col-span-1 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Card className="glass-intense border-white/10 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white">Featured Locations</h3>
                </div>
                <div className="space-y-3">
                  {selectedFeatures.map((feature) => (
                    <motion.button
                      key={feature.id}
                      onClick={() => { setSelectedFeature(feature.id); setShowMiniDrawer(true); }}
                      className={`w-full p-3 rounded-lg border transition-all text-left ${
                        selectedFeature === feature.id
                          ? 'bg-emerald-500/20 border-emerald-500/50'
                          : 'glass-light border-white/5 hover:border-white/20'
                      }`}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-white">{feature.name}</h4>
                          <p className="text-xs text-slate-500">{feature.district}</p>
                        </div>
                        {selectedFeature === feature.id && (
                          <div className="w-2 h-2 bg-emerald-400 rounded-full signal-pulse" />
                        )}
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <Badge
                          variant={
                            feature.statusColor === 'success' ? 'success' :
                            feature.statusColor === 'warning' ? 'warning' : 'info'
                          }
                          size="sm"
                        >
                          {feature.status}
                        </Badge>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  className="w-full mt-4 border-white/20 text-white hover:border-forest-400"
                  onClick={() => window.location.href = '/atlas'}
                >
                  <MapIcon className="w-4 h-4 mr-2" />
                  Open Full Atlas
                </Button>
              </Card>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-2 gap-3"
            >
              <Card className="glass-light border-white/5 p-4 text-center">
                <MapIcon className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">47</div>
                <div className="text-xs text-slate-500">Protected Areas</div>
              </Card>
              <Card className="glass-light border-white/5 p-4 text-center">
                <Droplets className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">1,253</div>
                <div className="text-xs text-slate-500">Water Bodies</div>
              </Card>
              <Card className="glass-light border-white/5 p-4 text-center">
                <Activity className="w-5 h-5 text-sky-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">234</div>
                <div className="text-xs text-slate-500">Monitoring</div>
              </Card>
              <Card className="glass-light border-white/5 p-4 text-center">
                <AlertTriangle className="w-5 h-5 text-red-400 mx-auto mb-2" />
                <div className="text-xl font-bold text-white">17</div>
                <div className="text-xs text-slate-500">Active Alerts</div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
