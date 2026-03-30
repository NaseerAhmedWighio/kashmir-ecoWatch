'use client';

import React, { useState } from 'react';
import { CircleMarker, Popup } from 'react-leaflet';
import * as L from 'leaflet';
import { riversData } from '@/data/water-systems';

interface RiverLayerProps {
  visible?: boolean;
  onFeatureClick?: (feature: any) => void;
}

const riverFlowStyles: Record<string, { color: string; dashArray?: string; weight: number }> = {
  perennial: { color: '#60a5fa', weight: 3 },      // blue-400
  seasonal: { color: '#93c5fd', weight: 2, dashArray: '5, 5' },  // blue-300
  intermittent: { color: '#bfdbfe', weight: 2, dashArray: '3, 3' }, // blue-200
};

export function RiverLayer({ visible = true, onFeatureClick }: RiverLayerProps) {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  if (!visible) return null;

  const handleRiverClick = (river: any) => {
    if (onFeatureClick) {
      onFeatureClick({
        type: 'river',
        ...river,
      });
    }
  };

  return (
    <>
      {riversData.map((river) => {
        const coordinates = river.coordinates;
        if (!coordinates) return null;

        const flowType = river.hydrologicalData?.seasonalVariation || 'perennial';
        const style = riverFlowStyles[flowType] || riverFlowStyles.perennial;

        // For now, render as point markers with river styling
        // In production, this would be actual polyline data from GeoJSON
        return (
          <CircleMarker
            key={river.id}
            center={[coordinates.lat, coordinates.lng]}
            radius={hoveredFeature === river.id ? 8 : 6}
            pathOptions={{
              color: style.color,
              fillColor: style.color,
              fillOpacity: 0.8,
              weight: style.weight,
              dashArray: style.dashArray,
            }}
            eventHandlers={{
              mouseover: () => setHoveredFeature(river.id),
              mouseout: () => setHoveredFeature(null),
              click: () => handleRiverClick(river),
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-slate-900">{river.name}</h3>
                <p className="text-sm text-slate-600">{river.category}</p>
                <p className="text-xs text-slate-500 mt-1">
                  {river.length ? `${river.length} km • ` : ''}
                  {flowType}
                </p>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </>
  );
}
