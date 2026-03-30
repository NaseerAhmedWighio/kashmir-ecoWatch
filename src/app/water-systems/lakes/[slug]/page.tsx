'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { WaterEntityDetailPageComponent } from '@/components/common/WaterEntityDetailPageComponent';
import { lakesData } from '@/data/water-systems';

export default function LakeDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const lake = lakesData.find(l => l.slug === slug);

  if (!lake) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Lake Not Found</h1>
          <p className="text-slate-400">The lake you're looking for doesn't exist or has been removed.</p>
        </div>
      </main>
    );
  }

  const relatedLakes = lakesData.filter(l => l.id !== lake.id && l.district === lake.district).slice(0, 4);

  return (
    <WaterEntityDetailPageComponent
      entity={lake}
      relatedEntities={relatedLakes}
      color="from-blue-500 to-cyan-600"
      icon="Droplet"
      backRoute="/water-systems"
      listRoute="/water-systems/lakes"
    />
  );
}
