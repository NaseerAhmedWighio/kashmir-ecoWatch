'use client';

import React, { useState } from 'react';
import { CircleMarker, Popup } from 'react-leaflet';
import * as L from 'leaflet';

interface SightingLayerProps {
  visible?: boolean;
  onFeatureClick?: (feature: any) => void;
}

// Mock wildlife sightings data (in production, this would come from an API)
const mockSightingsData = [
  {
    id: 'sighting-1',
    species: 'Hangul (Kashmir Stag)',
    scientificName: 'Cervus hanglu hanglu',
    location: 'Dachigam National Park',
    district: 'Srinagar',
    coordinates: { lat: 34.1500, lng: 74.8500 },
    timestamp: '2024-03-25T08:30:00Z',
    count: 3,
    habitat: 'Temperate forest',
    verified: true,
  },
  {
    id: 'sighting-2',
    species: 'Snow Leopard',
    scientificName: 'Panthera uncia',
    location: 'Gurez Valley',
    district: 'Bandipora',
    coordinates: { lat: 34.7000, lng: 74.8500 },
    timestamp: '2024-03-24T14:15:00Z',
    count: 1,
    habitat: 'Alpine zone',
    verified: true,
  },
  {
    id: 'sighting-3',
    species: 'Himalayan Monal',
    scientificName: 'Lophophorus impejanus',
    location: 'Aru Valley',
    district: 'Anantnag',
    coordinates: { lat: 33.8833, lng: 75.2500 },
    timestamp: '2024-03-23T10:00:00Z',
    count: 5,
    habitat: 'Rhododendron forest',
    verified: true,
  },
  {
    id: 'sighting-4',
    species: 'Brown Bear',
    scientificName: 'Ursus arctos isabellinus',
    location: 'Kishtwar High Altitude National Park',
    district: 'Kishtwar',
    coordinates: { lat: 33.2833, lng: 75.8167 },
    timestamp: '2024-03-22T16:45:00Z',
    count: 2,
    habitat: 'Alpine meadows',
    verified: false,
  },
];

const speciesColors: Record<string, string> = {
  'Hangul (Kashmir Stag)': '#ef4444',    // CR - red
  'Snow Leopard': '#f59e0b',             // VU - amber
  'Himalayan Monal': '#22c55e',          // LC - green
  'Brown Bear': '#f59e0b',               // VU - amber
};

export function SightingLayer({ visible = true, onFeatureClick }: SightingLayerProps) {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  if (!visible) return null;

  const handleSightingClick = (sighting: any) => {
    if (onFeatureClick) {
      onFeatureClick({
        type: 'sighting',
        ...sighting,
      });
    }
  };

  return (
    <>
      {mockSightingsData.map((sighting) => {
        const coordinates = sighting.coordinates;
        if (!coordinates) return null;

        const color = speciesColors[sighting.species] || '#64748b';
        const isHovered = hoveredFeature === sighting.id;

        return (
          <CircleMarker
            key={sighting.id}
            center={[coordinates.lat, coordinates.lng]}
            radius={isHovered ? 12 : 10}
            pathOptions={{
              color: color,
              fillColor: color,
              fillOpacity: 0.8,
              weight: 3,
              dashArray: sighting.verified ? undefined : '3, 3',
            }}
            eventHandlers={{
              mouseover: () => setHoveredFeature(sighting.id),
              mouseout: () => setHoveredFeature(null),
              click: () => handleSightingClick(sighting),
            }}
          >
            <Popup>
              <div className="p-2 min-w-[250px]">
                <h3 className="font-semibold text-slate-900">{sighting.species}</h3>
                <p className="text-xs text-slate-500 italic">{sighting.scientificName}</p>
                <div className="mt-2 space-y-1 text-xs text-slate-500">
                  <p>Location: {sighting.location}</p>
                  <p>District: {sighting.district}</p>
                  <p>Count: <span className="font-medium">{sighting.count}</span></p>
                  <p>Habitat: {sighting.habitat}</p>
                  <p>Date: {new Date(sighting.timestamp).toLocaleDateString()}</p>
                  <p>
                    Status:{' '}
                    <span className={`font-medium ${sighting.verified ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {sighting.verified ? 'Verified' : 'Unverified'}
                    </span>
                  </p>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </>
  );
}
