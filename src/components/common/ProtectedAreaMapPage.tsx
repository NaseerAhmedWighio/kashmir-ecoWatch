'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  ArrowLeft, MapPin, Mountain, Globe, Layers, Link2,
  Shield, Calendar, Eye, ChevronRight, Info
} from 'lucide-react';
import { ProtectedArea } from '@/data/protected-network';

// ── Dynamic Leaflet imports (no SSR) ─────────────────────────────────────────
const MapContainer = dynamic(() => import('react-leaflet').then(m => m.MapContainer), { ssr: false });
const TileLayer    = dynamic(() => import('react-leaflet').then(m => m.TileLayer),    { ssr: false });
const Marker       = dynamic(() => import('react-leaflet').then(m => m.Marker),       { ssr: false });
const Popup        = dynamic(() => import('react-leaflet').then(m => m.Popup),        { ssr: false });
const Circle       = dynamic(() => import('react-leaflet').then(m => m.Circle),       { ssr: false });

// Inject Leaflet CSS once on mount
function LeafletCSS() {
  React.useEffect(() => {
    if (document.getElementById('leaflet-css')) return;
    const link = document.createElement('link');
    link.id = 'leaflet-css';
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);
    // Fix default marker icons for Next.js
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const L = require('leaflet');
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }, []);
  return null;
}

// ── Tile layer URLs ───────────────────────────────────────────────────────────
const TILE_LAYERS: Record<string, { url: string; attribution: string }> = {
  'Street View': {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
  },
  'Terrain View': {
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '© <a href="https://opentopomap.org">OpenTopoMap</a> contributors',
  },
  'Satellite View': {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '© Esri, DigitalGlobe, GeoEye, Earthstar Geographics',
  },
  'Protected Areas': {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
  },
};

// ── Per-park connectivity data ────────────────────────────────────────────────
const CONNECTIVITY: Record<string, Array<{ name: string; type: string; distance: string }>> = {
  'dachigam-national-park': [
    { name: 'Overa-Aru Wildlife Sanctuary', type: 'Wildlife Sanctuary', distance: '~65 km SE' },
    { name: 'Sindh Valley Habitat Network', type: 'Informal Corridor',  distance: '~30 km NE' },
    { name: 'Upper Himalayan Habitat Network', type: 'Transboundary', distance: 'Extended' },
  ],
  'kazinag-national-park': [
    { name: 'Limber Wildlife Sanctuary', type: 'Wildlife Sanctuary', distance: '~15 km E' },
    { name: 'Lachipora Wildlife Sanctuary', type: 'Wildlife Sanctuary', distance: '~30 km N' },
  ],
};

// ── Props ────────────────────────────────────────────────────────────────────
interface Props {
  area: ProtectedArea;
  backHref: string;
  categoryLabel: string;
  categoryHref: string;
}

// ── Component ─────────────────────────────────────────────────────────────────
export function ProtectedAreaMapPage({ area, backHref, categoryLabel, categoryHref }: Props) {
  const router = useRouter();
  const [activeLayer, setActiveLayer] = useState('Street View');
  const a = area as any;

  const lat = area.latitude  ?? 34.15;
  const lng = area.longitude ?? 75.05;
  const tile = TILE_LAYERS[activeLayer];
  const connections = CONNECTIVITY[area.slug] ?? [];

  const CARD = 'bg-white/5 border border-white/10';

  return (
    <main className="min-h-screen bg-slate-950">
      <LeafletCSS />

      {/* ── COMPACT HERO ── */}
      <div className="bg-white/[0.03] backdrop-blur-xl pt-20 pb-8">
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-5">
            <button onClick={() => router.push('/protected-network')} className="hover:text-white transition-colors">Protected Network</button>
            <ChevronRight className="w-3 h-3" />
            <button onClick={() => router.push(categoryHref)} className="hover:text-white transition-colors">{categoryLabel}</button>
            <ChevronRight className="w-3 h-3" />
            <button onClick={() => router.push(backHref)} className="hover:text-white transition-colors">{area.name}</button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Map</span>
          </nav>

          <div className="flex items-start justify-between gap-6">
            <div>
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-3"
              >
                <ArrowLeft className="w-4 h-4" /> Back to park profile
              </button>
              <h1 className="text-2xl sm:text-3xl font-black text-white mb-1">{area.name}</h1>
              <p className="text-sm text-slate-400">Spatial boundary, elevation, and connectivity view</p>
            </div>
            {/* Quick stat pills */}
            <div className="hidden sm:flex items-center gap-2 flex-wrap justify-end">
              {[
                { label: 'Area', value: area.area > 0 ? `${area.area} km²` : 'TBC' },
                { label: 'District', value: area.district },
                { label: 'Coords', value: `${lat.toFixed(2)}°N ${lng.toFixed(2)}°E` },
              ].map(pill => (
                <div key={pill.label} className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-center">
                  <div className="text-[9px] text-slate-500 uppercase">{pill.label}</div>
                  <div className="text-xs font-semibold text-white">{pill.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── LAYER SELECTOR ── */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-slate-500 uppercase tracking-wider mr-1">Layer:</span>
          {Object.keys(TILE_LAYERS).map(layer => (
            <button
              key={layer}
              onClick={() => setActiveLayer(layer)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeLayer === layer
                  ? 'bg- emerald-700 text-white shadow'
                  : 'bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {layer}
            </button>
          ))}
        </div>
      </div>

      {/* ── MAP + SIDEBAR ── */}
      <div className="container mx-auto px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="rounded-xl overflow-hidden border border-white/10" style={{ height: 520 }}>
              <MapContainer
                center={[lat, lng]}
                zoom={10}
                style={{ height: '100%', width: '100%' }}
                scrollWheelZoom={true}
              >
                <TileLayer url={tile.url} attribution={tile.attribution} />
                <Circle
                  center={[lat, lng]}
                  radius={area.area > 0 ? Math.sqrt(area.area * 1_000_000 / Math.PI) : 8000}
                  pathOptions={{ color: '#10b981', fillColor: '#10b981', fillOpacity: 0.12, weight: 2 }}
                />
                <Marker position={[lat, lng]}>
                  <Popup>
                    <div style={{ fontFamily: 'sans-serif', minWidth: 160 }}>
                      <strong>{area.name}</strong><br />
                      Area: {area.area > 0 ? `${area.area} km²` : 'TBC'}<br />
                      District: {area.district}<br />
                      Est: {area.established}
                    </div>
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
            <div className="mt-2 text-[10px] text-slate-600 px-1">
              Map data © OpenStreetMap contributors. Circle represents approximate park extent. Boundary layer pending GIS integration.
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Spatial Intelligence */}
            <Card className={`${CARD} p-5`}>
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-500" /> Spatial Intelligence
              </h3>
              <div className="space-y-3">
                {[
                  { icon: MapPin,    label: 'Coordinates',         value: `${lat.toFixed(4)}°N, ${lng.toFixed(4)}°E` },
                  { icon: Mountain,  label: 'Elevation Range',     value: a.altitudeRange ?? 'Under verification' },
                  { icon: Globe,     label: 'Biogeographic Zone',  value: 'Western Himalaya' },
                  { icon: Shield,    label: 'Boundary Status',     value: a.dataStatus ?? 'Under review' },
                  { icon: MapPin,    label: 'District',            value: area.district },
                  { icon: Calendar,  label: 'Established',         value: String(area.established) },
                ].map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-2.5">
                    <Icon className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-[9px] text-slate-500 uppercase">{label}</div>
                      <div className="text-xs font-semibold text-white">{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Connectivity */}
            <Card className={`${CARD} p-5`}>
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Link2 className="w-4 h-4 text-emerald-500" /> Connectivity
              </h3>
              {connections.length > 0 ? (
                <div className="space-y-2.5">
                  {connections.map((c, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-white/3 border border-white/5">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <span className="text-xs text-emerald-400">↔</span>
                        <span className="text-xs font-semibold text-white">{c.name}</span>
                      </div>
                      <div className="text-[10px] text-slate-500">{c.type} · {c.distance}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-slate-500 italic">Connectivity mapping under compilation for this park.</div>
              )}
            </Card>

            {/* Legend */}
            <Card className={`${CARD} p-5`}>
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                <Info className="w-4 h-4 text-emerald-500" /> Map Legend
              </h3>
              <div className="space-y-2">
                {[
                  { color: 'bg-emerald-500/40 border-emerald-500', label: 'Park approximate boundary' },
                  { color: 'bg-blue-500/40 border-blue-500',       label: 'Park centroid marker' },
                  { color: 'bg-slate-500/40 border-slate-400 border-dashed', label: 'Connectivity corridors (planned)' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-5 h-3 rounded border ${item.color} shrink-0`} />
                    <span className="text-[11px] text-slate-400">{item.label}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
