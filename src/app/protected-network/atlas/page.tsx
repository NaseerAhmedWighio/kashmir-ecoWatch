'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Map, Layers, Search, Filter, Download, Share2, Maximize2, Crosshair, Eye, EyeOff, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { getProtectedAreas } from '@/data/protected-network';

const mapLayers = [
  { id: 'national-parks', label: 'National Parks', color: 'bg-emerald-500', visible: true, count: 3 },
  { id: 'wildlife-sanctuaries', label: 'Wildlife Sanctuaries', color: 'bg-blue-500', visible: true, count: 15 },
  { id: 'wetland-reserves', label: 'Wetland Reserves', color: 'bg-sky-500', visible: true, count: 5 },
  { id: 'conservation-reserves', label: 'Conservation Reserves', color: 'bg-amber-500', visible: false, count: 8 },
  { id: 'bird-areas', label: 'Bird & Habitat Areas', color: 'bg-purple-500', visible: false, count: 16 },
  { id: 'corridors', label: 'Connectivity Corridors', color: 'bg-pink-500', visible: false, count: 23 },
];

export default function ProtectedAreaAtlasPage() {
  const [layers, setLayers] = React.useState(mapLayers);
  const [zoom, setZoom] = React.useState(10);

  const toggleLayer = (id: string) => {
    setLayers(layers.map(layer => 
      layer.id === id ? { ...layer, visible: !layer.visible } : layer
    ));
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      
      {/* Header */}
      <div className="pt-48 pb-6 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Map className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Spatial Intelligence
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Protected Area Atlas
            </h1>
            <p className="text-slate-400 max-w-2xl text-lg">
              Interactive GIS mapping of all protected landscapes across Kashmir
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="border-white/20 text-white" icon={<Share2 className="w-4 h-4" />}>
              Share
            </Button>
            <Button variant="outline" size="sm" className="border-white/20 text-white" icon={<Download className="w-4 h-4" />}>
              Export
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-emerald-600 to-emerald-500" icon={<Maximize2 className="w-4 h-4" />}>
              Full Screen
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Map Container */}
      <div className="container mx-auto px-6 pb-12">
        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <div className="relative h-[calc(100vh-280px)] min-h-[600px] bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950">
            {/* Map Surface */}
            <div className="absolute inset-0 overflow-hidden">
              {/* Grid */}
              <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="atlasGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#atlasGrid)" />
              </svg>

              {/* Protected Area Markers */}
              {layers.filter(l => l.visible).map(layer => (
                <React.Fragment key={layer.id}>
                  {layer.id === 'national-parks' && (
                    <>
                      {getProtectedAreas.nationalParks().map((pa, i) => (
                        <div
                          key={pa.id}
                          className="absolute w-32 h-32 border-2 border-emerald-500/30 rounded-lg bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-400/50 transition-all cursor-pointer group"
                          style={{
                            top: `${30 + i * 15}%`,
                            left: `${40 + i * 20}%`,
                          }}
                        >
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="px-3 py-1.5 rounded-lg glass-intense text-xs font-medium text-white whitespace-nowrap">
                              {pa.name}
                            </span>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                  {layer.id === 'wildlife-sanctuaries' && (
                    <>
                      {getProtectedAreas.wildlifeSanctuaries().map((pa, i) => (
                        <div
                          key={pa.id}
                          className="absolute w-24 h-24 border-2 border-blue-500/30 rounded-lg bg-blue-500/5 hover:bg-blue-500/10 transition-all cursor-pointer"
                          style={{
                            top: `${40 + i * 12}%`,
                            left: `${35 + i * 18}%`,
                          }}
                        />
                      ))}
                    </>
                  )}
                  {layer.id === 'wetland-reserves' && (
                    <>
                      {getProtectedAreas.wetlandReserves().map((pa, i) => (
                        <div
                          key={pa.id}
                          className="absolute w-16 h-12 bg-sky-500/20 rounded-full hover:bg-sky-500/30 transition-all cursor-pointer"
                          style={{
                            top: `${45 + i * 8}%`,
                            left: `${45 + i * 15}%`,
                          }}
                        />
                      ))}
                    </>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Controls - Top Right */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
              <Card className="glass-intense border-white/10 p-1" padding="none">
                <div className="flex flex-col">
                  <button onClick={() => setZoom(z => z + 1)} className="p-3 hover:bg-white/5 rounded-lg transition-colors">
                    <Plus className="w-5 h-5 text-white" />
                  </button>
                  <div className="h-px bg-white/10" />
                  <button onClick={() => setZoom(z => Math.max(1, z - 1))} className="p-3 hover:bg-white/5 rounded-lg transition-colors">
                    <Minus className="w-5 h-5 text-white" />
                  </button>
                </div>
              </Card>
              <Card className="glass-intense border-white/10 p-1" padding="none">
                <button className="p-3 hover:bg-white/5 rounded-lg transition-colors">
                  <Crosshair className="w-5 h-5 text-white" />
                </button>
              </Card>
            </div>

            {/* Layer Panel - Right */}
            <div className="absolute top-36 right-4 w-72 glass-intense border border-white/10 rounded-xl overflow-hidden z-20">
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
                    onClick={() => toggleLayer(layer.id)}
                    className="flex items-center justify-between gap-3 p-2.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-3 h-3 rounded ${layer.color} ${layer.visible ? '' : 'opacity-30'}`} />
                      <span className={`text-sm ${layer.visible ? 'text-white' : 'text-slate-500'}`}>
                        {layer.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 tabular-nums">
                        {layer.count}
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
            </div>

            {/* Search - Top */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
              <Card className="glass-intense border-white/10 min-w-[400px]" padding="none">
                <div className="flex items-center gap-3 px-4 py-3">
                  <Search className="w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search protected areas, districts, species..."
                    className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-slate-500"
                  />
                </div>
              </Card>
            </div>

            {/* Info - Bottom Left */}
            <div className="absolute bottom-4 left-4 z-20">
              <Card className="glass-intense border-white/10" padding="sm">
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-4">
                    <span className="text-slate-500">Zoom</span>
                    <span className="font-mono text-white">{zoom}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-slate-500">Active Layers</span>
                    <span className="font-mono text-white">{layers.filter(l => l.visible).length}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-slate-500">Total PAs</span>
                    <span className="font-mono text-emerald-400">47</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <AdvancedFooter />
    </main>
  );
}
