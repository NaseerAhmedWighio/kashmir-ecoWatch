'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { WaterEntityDetailPageComponent } from '@/components/common/WaterEntityDetailPageComponent';
import { riversData } from '@/data/water-systems';

export default function RiverDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const river = riversData.find(r => r.slug === slug);

  if (!river) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">River or Stream Not Found</h1>
          <p className="text-slate-400">The river or stream you're looking for doesn't exist or has been removed.</p>
        </div>
      </main>
    );
  }

  const relatedRivers = riversData.filter(r => r.id !== river.id && r.district === river.district).slice(0, 4);

  return (
    <WaterEntityDetailPageComponent
      entity={river}
      relatedEntities={relatedRivers}
      color="from-indigo-500 to-purple-600"
      icon="Wind"
      backRoute="/water-systems"
      listRoute="/water-systems/rivers"
    />
  );
}
