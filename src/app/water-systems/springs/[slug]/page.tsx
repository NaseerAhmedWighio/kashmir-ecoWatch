'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { WaterEntityDetailPageComponent } from '@/components/common/WaterEntityDetailPageComponent';
import { springsData } from '@/data/water-systems';

export default function SpringDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const spring = springsData.find(s => s.slug === slug);

  if (!spring) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Spring Not Found</h1>
          <p className="text-slate-400">The spring you're looking for doesn't exist or has been removed.</p>
        </div>
      </main>
    );
  }

  const relatedSprings = springsData.filter(s => s.id !== spring.id && s.district === spring.district).slice(0, 4);

  return (
    <WaterEntityDetailPageComponent
      entity={spring}
      relatedEntities={relatedSprings}
      color="from-emerald-500 to-green-600"
      icon="Droplet"
      backRoute="/water-systems"
      listRoute="/water-systems/springs"
    />
  );
}
