'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { WaterEntityDetailPageComponent } from '@/components/common/WaterEntityDetailPageComponent';
import { wetlandsData } from '@/data/water-systems';

export default function WetlandDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const wetland = wetlandsData.find(w => w.slug === slug);

  if (!wetland) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Wetland Not Found</h1>
          <p className="text-slate-400">The wetland you're looking for doesn't exist or has been removed.</p>
        </div>
      </main>
    );
  }

  const relatedWetlands = wetlandsData.filter(w => w.id !== wetland.id && w.district === wetland.district).slice(0, 4);

  return (
    <WaterEntityDetailPageComponent
      entity={wetland}
      relatedEntities={relatedWetlands}
      color="from-sky-500 to-blue-600"
      icon="Waves"
      backRoute="/water-systems"
      listRoute="/water-systems/wetlands"
    />
  );
}
