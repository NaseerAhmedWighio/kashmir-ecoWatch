'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { WaterEntityDetailPageComponent } from '@/components/common/WaterEntityDetailPageComponent';
import { floodRiskZones } from '@/data/water-systems';

export default function FloodRiskDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const zone = floodRiskZones.find(f => f.slug === slug);

  if (!zone) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Flood Risk Zone Not Found</h1>
          <p className="text-slate-400">The flood risk zone you're looking for doesn't exist or has been removed.</p>
        </div>
      </main>
    );
  }

  const relatedZones = floodRiskZones.filter(f => f.id !== zone.id && f.district === zone.district).slice(0, 4);

  return (
    <WaterEntityDetailPageComponent
      entity={zone}
      relatedEntities={relatedZones}
      color="from-red-500 to-rose-600"
      icon="AlertTriangle"
      backRoute="/water-systems"
      listRoute="/water-systems/flood-risk"
    />
  );
}
