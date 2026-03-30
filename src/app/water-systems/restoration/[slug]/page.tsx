'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { WaterEntityDetailPageComponent } from '@/components/common/WaterEntityDetailPageComponent';
import { restorationSites } from '@/data/water-systems';

export default function RestorationDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const site = restorationSites.find(r => r.slug === slug);

  if (!site) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Restoration Site Not Found</h1>
          <p className="text-slate-400">The restoration site you're looking for doesn't exist or has been removed.</p>
        </div>
      </main>
    );
  }

  const relatedSites = restorationSites.filter(r => r.id !== site.id && r.district === site.district).slice(0, 4);

  return (
    <WaterEntityDetailPageComponent
      entity={site}
      relatedEntities={relatedSites}
      color="from-lime-500 to-green-600"
      icon="Hammer"
      backRoute="/water-systems"
      listRoute="/water-systems/restoration"
    />
  );
}
