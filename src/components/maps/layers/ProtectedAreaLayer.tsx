'use client';

import React, { useState } from 'react';
import { CircleMarker, Popup } from 'react-leaflet';
import * as L from 'leaflet';
import protectedAreasData from '@/data/geojson/protected-areas.json';

interface ProtectedAreaLayerProps {
  visible?: boolean;
  onFeatureClick?: (feature: any) => void;
}

const categoryColors: Record<string, string> = {
  national_park: '#10b981',      // emerald-500
  wildlife_sanctuary: '#3b82f6', // blue-500
  wetland_reserve: '#06b6d4',    // cyan-500
  conservation_reserve: '#f59e0b', // amber-500
  iba: '#a855f7',                // purple-500
};

const categoryLabels: Record<string, string> = {
  national_park: 'National Park',
  wildlife_sanctuary: 'Wildlife Sanctuary',
  wetland_reserve: 'Wetland Reserve',
  conservation_reserve: 'Conservation Reserve',
  iba: 'Bird Habitat Area',
};

export function ProtectedAreaLayer({ visible = true, onFeatureClick }: ProtectedAreaLayerProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (!visible) return null;

  return (
    <>
      {protectedAreasData.features.map((feature) => {
        const [lng, lat] = feature.geometry.coordinates;
        const category = feature.properties.category;
        const color = categoryColors[category] || '#64748b';
        const isHovered = hoveredId === feature.properties.id;

        return (
          <CircleMarker
            key={feature.properties.id}
            center={[lat, lng]}
            radius={isHovered ? 14 : 10}
            pathOptions={{
              fillColor: color,
              color: '#ffffff',
              weight: isHovered ? 3 : 2,
              fillOpacity: isHovered ? 0.8 : 0.6,
            }}
            eventHandlers={{
              mouseover: () => setHoveredId(feature.properties.id),
              mouseout: () => setHoveredId(null),
              click: () => {
                onFeatureClick?.({
                  type: 'protected_area',
                  category,
                  name: feature.properties.name,
                  slug: feature.properties.slug,
                  district: feature.properties.district,
                  area: feature.properties.area_km2,
                  established: feature.properties.established,
                  keySpecies: feature.properties.keySpecies,
                  description: `${feature.properties.name} is a ${categoryLabels[category] || 'protected area'} in ${feature.properties.district} district, established in ${feature.properties.established}.`,
                });
              },
            }}
          >
            <Popup closeButton={false} autoClose={true}>
              <div className="min-w-[150px]">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  {categoryLabels[category] || 'Protected Area'}
                </div>
                <div className="text-sm font-bold text-white">{feature.properties.name}</div>
                <div className="text-xs text-slate-400">{feature.properties.district} District</div>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </>
  );
}
