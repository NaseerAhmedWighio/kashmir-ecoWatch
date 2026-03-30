'use client';

import React, { useEffect, useState } from 'react';
import { GeoJSON } from 'react-leaflet';
import * as L from 'leaflet';
import districtsData from '@/data/geojson/districts.geojson' assert { type: 'json' };

interface DistrictLayerProps {
  visible?: boolean;
  onFeatureClick?: (feature: any) => void;
}

export function DistrictLayer({ visible = true, onFeatureClick }: DistrictLayerProps) {
  const [hoveredFeature, setHoveredFeature] = useState<any>(null);

  const style = (feature: any) => ({
    fillColor: 'transparent',
    color: hoveredFeature?.properties.id === feature.properties.id ? '#ffffff' : '#ffffff40',
    weight: hoveredFeature?.properties.id === feature.properties.id ? 2 : 1,
    fillOpacity: hoveredFeature?.properties.id === feature.properties.id ? 0.1 : 0.02,
    dashArray: '4, 4',
  });

  const onEachFeature = (feature: any, layer: L.Layer) => {
    layer.on({
      mouseover: (e) => {
        setHoveredFeature(feature);
        const target = e.target as L.Path;
        target.setStyle({
          weight: 2,
          fillOpacity: 0.1,
        });
      },
      mouseout: (e) => {
        setHoveredFeature(null);
        const target = e.target as L.Path;
        target.setStyle({
          weight: 1,
          fillOpacity: 0.02,
        });
      },
      click: () => {
        onFeatureClick?.({
          type: 'district',
          name: feature.properties.name,
          district: feature.properties.name,
          slug: feature.properties.id,
          area: feature.properties.area_km2,
          population: feature.properties.population,
          headquarters: feature.properties.headquarters,
          description: `${feature.properties.name} district in Kashmir Valley.`,
        });
      },
    });

    // Add label at centroid
    const centroid = getCentroid(feature.geometry.coordinates);
    if (centroid) {
      const label = L.marker(centroid, {
        icon: L.divIcon({
          className: 'district-label',
          html: `<span style="
            color: #94a3b8;
            font-size: 10px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            text-shadow: 0 1px 2px rgba(0,0,0,0.8);
            pointer-events: none;
          ">${feature.properties.name}</span>`,
          iconSize: [100, 20],
          iconAnchor: [50, 10],
        }),
      });
      // We'll add this to a layer group in the parent
    }
  };

  if (!visible) return null;

  return (
    <GeoJSON
      key="districts"
      data={districtsData}
      style={style}
      onEachFeature={onEachFeature}
    />
  );
}

// Helper to calculate centroid of polygon
function getCentroid(coordinates: number[][][]): [number, number] | null {
  if (!coordinates || coordinates.length === 0) return null;
  
  const ring = coordinates[0];
  let sumLat = 0;
  let sumLng = 0;
  
  ring.forEach(([lng, lat]) => {
    sumLat += lat;
    sumLng += lng;
  });
  
  return [sumLat / ring.length, sumLng / ring.length];
}
