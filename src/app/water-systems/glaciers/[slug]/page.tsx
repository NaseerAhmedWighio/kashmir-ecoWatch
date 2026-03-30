'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { WaterEntityDetailPageComponent } from '@/components/common/WaterEntityDetailPageComponent';
import { glaciersData } from '@/data/water-systems';

export default function GlacierDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const glacier = glaciersData.find(g => g.slug === slug);

  if (!glacier) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Glacier Not Found</h1>
          <p className="text-slate-400">The glacier you're looking for doesn't exist or has been removed.</p>
        </div>
      </main>
    );
  }

  const relatedGlaciers = glaciersData.filter(g => g.id !== glacier.id && g.district === glacier.district).slice(0, 4);

  return (
    <WaterEntityDetailPageComponent
      entity={glacier}
      relatedEntities={relatedGlaciers}
      color="from-slate-400 to-slate-600"
      icon="Mountain"
      backRoute="/water-systems"
      listRoute="/water-systems/glaciers"
    />
  );
}
