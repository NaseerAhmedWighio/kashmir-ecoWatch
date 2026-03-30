'use client';

import React from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';

// Fix Leaflet default icon issue with Next.js (only run on client)
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });
}

// Kashmir-centered viewport
const KASHMIR_CENTER: [number, number] = [34.0837, 74.7973];
const KASHMIR_ZOOM = 8;

interface AtlasMapProps {
  children?: React.ReactNode;
  className?: string;
  onMapReady?: (map: L.Map) => void;
}

// Component to handle map events and expose map instance
function MapController({ onMapReady }: { onMapReady?: (map: L.Map) => void }) {
  const map = useMap();

  React.useEffect(() => {
    if (onMapReady) {
      onMapReady(map);
    }
  }, [map, onMapReady]);

  return null;
}

export function AtlasMap({ children, className, onMapReady }: AtlasMapProps) {
  const [mapInstance, setMapInstance] = React.useState<L.Map | null>(null);

  // Pass map instance to parent via onMapReady callback
  React.useEffect(() => {
    if (mapInstance && onMapReady) {
      onMapReady(mapInstance);
    }
  }, [mapInstance, onMapReady]);

  return (
    <div className={`relative h-full w-full ${className || ''}`}>
      <MapContainer
        center={KASHMIR_CENTER}
        zoom={KASHMIR_ZOOM}
        minZoom={6}
        maxZoom={16}
        zoomControl={false} // We'll add custom controls
        className="h-full w-full bg-slate-950"
        style={{ background: '#0f172a' }}
      >
        {/* Dark matter basemap for premium scientific theme */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          subdomains="abcd"
          maxZoom={20}
        />

        {/* Expose map instance */}
        <MapController onMapReady={onMapReady} />

        {/* Render child layers */}
        {children}
      </MapContainer>
    </div>
  );
}

// Export Kashmir constants for use in other components
export { KASHMIR_CENTER, KASHMIR_ZOOM };
