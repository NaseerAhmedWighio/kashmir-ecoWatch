'use client';

import React, { useState } from 'react';
import { CircleMarker, Popup } from 'react-leaflet';
import lakesData from '@/data/geojson/lakes.geojson' assert { type: 'json' };
import wetlandsData from '@/data/geojson/wetlands.geojson' assert { type: 'json' };

interface WaterBodyLayerProps {
  visible?: boolean;
  onFeatureClick?: (feature: any) => void;
}

const waterQualityColors: Record<string, string> = {
  excellent: '#22d3ee',  // cyan-400
  good: '#3b82f6',       // blue-500
  moderate: '#f59e0b',   // amber-500
  poor: '#ef4444',       // red-500
  critical: '#dc2626',   // red-600
};

export function WaterBodyLayer({ visible = true, onFeatureClick }: WaterBodyLayerProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (!visible) return null;

  // Combine lakes and wetlands
  const allWaterBodies = [...lakesData.features, ...wetlandsData.features];

  return (
    <>
      {allWaterBodies.map((feature) => {
        const [lng, lat] = feature.geometry.coordinates;
        const type = feature.properties.type;
        const qualityStatus = feature.properties.waterQualityStatus || 'good';
        const color = waterQualityColors[qualityStatus] || '#3b82f6';
        const isHovered = hoveredId === feature.properties.id;
        const isWetland = type === 'wetland';
        const isRamsar = feature.properties.ramsarSite;

        return (
          <CircleMarker
            key={feature.properties.id}
            center={[lat, lng]}
            radius={isHovered ? (isWetland ? 12 : 14) : (isWetland ? 8 : 10)}
            pathOptions={{
              fillColor: isWetland ? '#06b6d4' : color,
              color: isRamsar ? '#ffffff' : '#ffffff80',
              weight: isHovered ? 3 : (isRamsar ? 2 : 1),
              fillOpacity: isHovered ? 0.8 : 0.5,
              dashArray: isRamsar ? '4, 4' : undefined,
            }}
            eventHandlers={{
              mouseover: () => setHoveredId(feature.properties.id),
              mouseout: () => setHoveredId(null),
              click: () => {
                onFeatureClick?.({
                  type,
                  name: feature.properties.name,
                  slug: feature.properties.slug,
                  district: feature.properties.district,
                  area: feature.properties.area_km2,
                  elevation: feature.properties.elevation_m,
                  category: feature.properties.category,
                  verificationStatus: qualityStatus,
                  description: `${feature.properties.name} is a ${feature.properties.category} in ${feature.properties.district} district. ${isRamsar ? 'Designated as a Ramsar Site of international importance.' : ''}`,
                  metrics: [
                    { label: 'Area', value: `${feature.properties.area_km2} km²` },
                    { label: 'Elevation', value: `${feature.properties.elevation_m}m` },
                    ...(feature.properties.watershed ? [{ label: 'Watershed', value: feature.properties.watershed }] : []),
                  ],
                });
              },
            }}
          >
            <Popup closeButton={false} autoClose={true}>
              <div className="min-w-[150px]">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  {isWetland ? 'Wetland' : 'Lake'}
                  {isRamsar && (
                    <span className="ml-2 px-1.5 py-0.5 bg-blue-500/20 text-blue-400 text-[9px] rounded">
                      Ramsar
                    </span>
                  )}
                </div>
                <div className="text-sm font-bold text-white">{feature.properties.name}</div>
                <div className="text-xs text-slate-400">{feature.properties.district} District</div>
                {feature.properties.area_km2 && (
                  <div className="text-xs text-slate-500 mt-1">
                    {feature.properties.area_km2} km²
                  </div>
                )}
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </>
  );
}
