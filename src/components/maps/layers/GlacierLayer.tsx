'use client';

import React, { useState } from 'react';
import { Circle, CircleMarker, Popup } from 'react-leaflet';
import * as L from 'leaflet';
import { glaciersData } from '@/data/water-systems';

interface GlacierLayerProps {
  visible?: boolean;
  onFeatureClick?: (feature: any) => void;
}

export function GlacierLayer({ visible = true, onFeatureClick }: GlacierLayerProps) {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  if (!visible) return null;

  const handleGlacierClick = (glacier: any) => {
    if (onFeatureClick) {
      onFeatureClick({
        type: 'glacier',
        ...glacier,
      });
    }
  };

  return (
    <>
      {glaciersData.map((glacier) => {
        const coordinates = glacier.coordinates;
        if (!coordinates) return null;

        const isHovered = hoveredFeature === glacier.id;
        const radius = glacier.area ? Math.sqrt(glacier.area) * 500 : 3000;

        return (
          <Circle
            key={glacier.id}
            center={[coordinates.lat, coordinates.lng]}
            radius={radius}
            pathOptions={{
              color: isHovered ? '#ffffff' : '#e0f2fe',
              fillColor: '#f0f9ff',
              fillOpacity: isHovered ? 0.5 : 0.3,
              weight: isHovered ? 3 : 2,
              dashArray: '5, 5',
            }}
            eventHandlers={{
              mouseover: () => setHoveredFeature(glacier.id),
              mouseout: () => setHoveredFeature(null),
              click: () => handleGlacierClick(glacier),
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-semibold text-slate-900">{glacier.name}</h3>
                <p className="text-sm text-slate-600">{glacier.category}</p>
                <div className="mt-2 space-y-1 text-xs text-slate-500">
                  <p>District: {glacier.district}</p>
                  <p>Area: {glacier.area ? `${glacier.area} km²` : 'N/A'}</p>
                  <p>Elevation: {glacier.elevation ? `${glacier.elevation}m` : 'N/A'}</p>
                  <p>Source: {glacier.hydrologicalData?.source || 'glacial'}</p>
                </div>
                {glacier.threats && glacier.threats.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-slate-200">
                    <p className="text-xs font-medium text-red-600">Threats:</p>
                    <p className="text-xs text-slate-500">{glacier.threats.join(', ')}</p>
                  </div>
                )}
              </div>
            </Popup>
          </Circle>
        );
      })}
    </>
  );
}
