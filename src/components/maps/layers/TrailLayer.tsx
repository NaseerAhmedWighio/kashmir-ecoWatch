'use client';

import React, { useState } from 'react';
import { CircleMarker, Popup } from 'react-leaflet';
import * as L from 'leaflet';
import { trailsData } from '@/data';

interface TrailLayerProps {
  visible?: boolean;
  onFeatureClick?: (feature: any) => void;
}

const trailDifficultyColors: Record<string, string> = {
  easy: '#22c55e',      // green-500
  moderate: '#f59e0b',  // amber-500
  difficult: '#ef4444', // red-500
};

export function TrailLayer({ visible = true, onFeatureClick }: TrailLayerProps) {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  if (!visible) return null;

  const handleTrailClick = (trail: any) => {
    if (onFeatureClick) {
      onFeatureClick({
        type: 'trail',
        ...trail,
      });
    }
  };

  return (
    <>
      {trailsData.map((trail) => {
        const coordinates = trail.district ? { lat: 34.0837, lng: 74.7973 } : undefined;
        if (!coordinates) return null;

        const color = trailDifficultyColors[trail.difficulty] || trailDifficultyColors.moderate;
        const isHovered = hoveredFeature === trail.id;

        return (
          <CircleMarker
            key={trail.id}
            center={[coordinates.lat, coordinates.lng]}
            radius={isHovered ? 10 : 8}
            pathOptions={{
              color: color,
              fillColor: color,
              fillOpacity: 0.8,
              weight: 3,
            }}
            eventHandlers={{
              mouseover: () => setHoveredFeature(trail.id),
              mouseout: () => setHoveredFeature(null),
              click: () => handleTrailClick(trail),
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-semibold text-slate-900">{trail.name}</h3>
                <p className="text-sm text-slate-600">{trail.trailType.replace('-', ' ')}</p>
                <div className="mt-2 space-y-1 text-xs text-slate-500">
                  <p>District: {trail.district}</p>
                  <p>Distance: {trail.distance} km</p>
                  <p>Duration: {trail.duration}</p>
                  <p>Difficulty: <span className="font-medium" style={{ color }}>{trail.difficulty}</span></p>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </>
  );
}
