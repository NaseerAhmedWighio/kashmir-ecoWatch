'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { WaterEntityDetailPageComponent } from '@/components/common/WaterEntityDetailPageComponent';
import { watershedsData } from '@/data/water-systems';

export default function WatershedDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const watershed = watershedsData.find(w => w.slug === slug);

  if (!watershed) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Watershed Not Found</h1>
          <p className="text-slate-400">The watershed you're looking for doesn't exist or has been removed.</p>
        </div>
      </main>
    );
  }

  const relatedWatersheds = watershedsData.filter(w => w.id !== watershed.id).slice(0, 4);

  return (
    <WaterEntityDetailPageComponent
      entity={watershed}
      relatedEntities={relatedWatersheds}
      color="from-amber-500 to-orange-600"
      icon="Map"
      backRoute="/water-systems"
      listRoute="/water-systems/watersheds"
    />
  );
}
