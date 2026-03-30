'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { WaterEntityDetailPageComponent } from '@/components/common/WaterEntityDetailPageComponent';
import { fisheriesData } from '@/data/water-systems';

export default function FisheryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const fishery = fisheriesData.find(f => f.slug === slug);

  if (!fishery) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Fishery Not Found</h1>
          <p className="text-slate-400">The fishery you're looking for doesn't exist or has been removed.</p>
        </div>
      </main>
    );
  }

  const relatedFisheries = fisheriesData.filter(f => f.id !== fishery.id && f.district === fishery.district).slice(0, 4);

  return (
    <WaterEntityDetailPageComponent
      entity={fishery}
      relatedEntities={relatedFisheries}
      color="from-violet-500 to-purple-600"
      icon="Fish"
      backRoute="/water-systems"
      listRoute="/water-systems/fisheries"
    />
  );
}
