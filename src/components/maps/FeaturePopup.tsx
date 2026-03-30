'use client';

import React from 'react';
import { Popup } from 'react-leaflet';
import * as L from 'leaflet';
import { MapPin, Shield, Droplet, Mountain, TreePine } from 'lucide-react';

interface FeaturePopupProps {
  feature: {
    type: string;
    name: string;
    district?: string;
    category?: string;
  };
}

const getFeatureIcon = (type: string, category?: string) => {
  if (type === 'protected_area') {
    if (category === 'national_park') return <Mountain className="h-3 w-3" />;
    if (category === 'wildlife_sanctuary') return <TreePine className="h-3 w-3" />;
    return <Shield className="h-3 w-3" />;
  }
  if (type === 'lake' || type === 'wetland') {
    return <Droplet className="h-3 w-3" />;
  }
  return <MapPin className="h-3 w-3" />;
};

export function FeaturePopup({ feature }: FeaturePopupProps) {
  return (
    <Popup
      closeButton={false}
      autoClose={true}
      closeOnClick={false}
      className="atlas-feature-popup"
    >
      <div className="min-w-[150px]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-slate-400">{getFeatureIcon(feature.type, feature.category)}</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            {feature.type.replace('_', ' ')}
          </span>
        </div>
        <div className="text-sm font-bold text-white mb-0.5">{feature.name}</div>
        {feature.district && (
          <div className="text-xs text-slate-400">{feature.district} District</div>
        )}
      </div>
    </Popup>
  );
}
