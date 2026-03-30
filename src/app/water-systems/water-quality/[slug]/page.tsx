'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { WaterEntityDetailPageComponent } from '@/components/common/WaterEntityDetailPageComponent';
import { waterQualitySites } from '@/data/water-systems';

export default function WaterQualityDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const site = waterQualitySites.find(w => w.slug === slug);

  if (!site) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Quality Site Not Found</h1>
          <p className="text-slate-400">The water quality monitoring site you're looking for doesn't exist or has been removed.</p>
        </div>
      </main>
    );
  }

  const relatedSites = waterQualitySites.filter(w => w.id !== site.id && w.district === site.district).slice(0, 4);

  return (
    <WaterEntityDetailPageComponent
      entity={site}
      relatedEntities={relatedSites}
      color="from-teal-500 to-cyan-600"
      icon="Thermometer"
      backRoute="/water-systems"
      listRoute="/water-systems/water-quality"
    />
  );
}
