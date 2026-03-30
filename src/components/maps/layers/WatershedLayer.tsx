'use client';

import React, { useState } from 'react';
import { Circle, Popup } from 'react-leaflet';
import * as L from 'leaflet';
import { watershedsData } from '@/data/water-systems';

interface WatershedLayerProps {
  visible?: boolean;
  onFeatureClick?: (feature: any) => void;
}

export function WatershedLayer({ visible = true, onFeatureClick }: WatershedLayerProps) {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  if (!visible) return null;

  const handleWatershedClick = (watershed: any) => {
    if (onFeatureClick) {
      onFeatureClick({
        type: 'watershed',
        ...watershed,
      });
    }
  };

  const style = (feature: any, isHovered: boolean) => ({
    fillColor: isHovered ? '#3b82f6' : '#60a5fa',
    color: isHovered ? '#ffffff' : '#93c5fd',
    weight: isHovered ? 3 : 1,
    fillOpacity: isHovered ? 0.4 : 0.15,
    dashArray: '5, 5',
  });

  return (
    <>
      {watershedsData.map((watershed) => {
        const coordinates = watershed.coordinates;
        if (!coordinates) return null;

        // Simplified representation as circles (in production, use actual watershed boundaries)
        const radius = watershed.area ? Math.sqrt(watershed.area) * 1000 : 5000;
        const isHovered = hoveredFeature === watershed.id;

        return (
          <Circle
            key={watershed.id}
            center={[coordinates.lat, coordinates.lng]}
            radius={radius}
            pathOptions={style(watershed, isHovered)}
            eventHandlers={{
              mouseover: () => setHoveredFeature(watershed.id),
              mouseout: () => setHoveredFeature(null),
              click: () => handleWatershedClick(watershed),
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-semibold text-slate-900">{watershed.name}</h3>
                <p className="text-sm text-slate-600">{watershed.category}</p>
                <div className="mt-2 space-y-1 text-xs text-slate-500">
                  <p>District: {watershed.district}</p>
                  <p>Area: {watershed.area ? `${watershed.area} km²` : 'N/A'}</p>
                  <p>Elevation: {watershed.elevation ? `${watershed.elevation}m` : 'N/A'}</p>
                </div>
              </div>
            </Popup>
          </Circle>
        );
      })}
    </>
  );
}
