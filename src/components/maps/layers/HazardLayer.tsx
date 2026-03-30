'use client';

import React, { useState } from 'react';
import { CircleMarker, Popup } from 'react-leaflet';
import * as L from 'leaflet';
import { alertsData } from '@/data';

interface HazardLayerProps {
  visible?: boolean;
  onFeatureClick?: (feature: any) => void;
}

const hazardSeverityColors: Record<string, string> = {
  high: '#ef4444',    // red-500
  medium: '#f59e0b',  // amber-500
  low: '#22c55e',     // green-500
};

const hazardTypeIcons: Record<string, string> = {
  wetland_encroachment: '🏗️',
  air_quality: '💨',
  trail_closure: '🚫',
  water_anomaly: '💧',
  avalanche: '🏔️',
  landslide: '⛰️',
  wildlife_conflict: '🐾',
};

export function HazardLayer({ visible = true, onFeatureClick }: HazardLayerProps) {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  if (!visible) return null;

  const handleHazardClick = (alert: any) => {
    if (onFeatureClick) {
      onFeatureClick({
        type: 'hazard',
        ...alert,
      });
    }
  };

  // Get active alerts only
  const activeAlerts = alertsData.filter(a => a.status === 'active');

  return (
    <>
      {activeAlerts.map((alert) => {
        // Use district center coordinates for now
        const districtCoords: Record<string, [number, number]> = {
          'Srinagar': [34.0837, 74.7973],
          'Anantnag': [33.7311, 75.1511],
          'Baramulla': [34.2092, 74.3419],
          'Budgam': [34.0155, 74.5210],
          'Bandipora': [34.4167, 74.6333],
          'Kupwara': [34.5333, 74.2500],
          'Pulwama': [33.8667, 74.8833],
          'Shopian': [33.7167, 74.7833],
          'Ganderbal': [34.2333, 74.9333],
          'Kulgam': [33.6500, 75.0167],
        };

        const coords = districtCoords[alert.district] || [34.0837, 74.7973];
        const color = hazardSeverityColors[alert.severity] || hazardSeverityColors.medium;
        const isHovered = hoveredFeature === alert.id;
        const icon = hazardTypeIcons[alert.type] || '⚠️';

        return (
          <CircleMarker
            key={alert.id}
            center={coords}
            radius={isHovered ? 14 : 12}
            pathOptions={{
              color: color,
              fillColor: color,
              fillOpacity: 0.6,
              weight: 3,
              dashArray: alert.severity === 'high' ? undefined : '5, 5',
            }}
            eventHandlers={{
              mouseover: () => setHoveredFeature(alert.id),
              mouseout: () => setHoveredFeature(null),
              click: () => handleHazardClick(alert),
            }}
          >
            <Popup>
              <div className="p-2 min-w-[250px]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{icon}</span>
                  <h3 className="font-semibold text-slate-900 flex-1">{alert.title}</h3>
                </div>
                <p className="text-sm text-slate-600 mb-2">{alert.description}</p>
                <div className="mt-2 space-y-1 text-xs text-slate-500">
                  <p>Location: {alert.location}</p>
                  <p>District: {alert.district}</p>
                  <p>Severity: <span className="font-medium" style={{ color }}>{alert.severity}</span></p>
                  <p>Status: <span className="font-medium text-emerald-600">{alert.status}</span></p>
                </div>
                {alert.affectedEntity && (
                  <div className="mt-2 pt-2 border-t border-slate-200">
                    <p className="text-xs font-medium text-slate-700">Affected:</p>
                    <p className="text-xs text-slate-500">{alert.affectedEntity.name}</p>
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
