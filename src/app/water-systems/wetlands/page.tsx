'use client';

import React from 'react';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { wetlandsData, WaterEntity } from '@/data/water-systems';
import { NwiaClassificationPanel } from '@/components/water/NwiaClassificationPanel';
import { Card } from '@/components/ui/Card';

export default function WetlandsPage() {
  const districts = Array.from(new Set(wetlandsData.map(w => w.district)));
  const categories = Array.from(new Set(wetlandsData.map(w => w.category)));

  return (
    <main className="min-h-screen bg-slate-950">
      <WaterEntityListingPage
        title="All Wetlands of Kashmir"
        description="Comprehensive inventory of all marshes, floodplain wetlands, shallow-water habitats, reedbeds, bird-use wetlands, Ramsar-linked wetlands, and district-level wetland landscapes."
        icon="Waves"
        color="from-sky-500 to-blue-600"
        entities={wetlandsData}
        entityType="Wetlands"
        filters={{
          districts,
          categories,
          qualityStatuses: ['excellent', 'good', 'moderate', 'poor', 'critical'],
        }}
        getEntitySlug={(entity) => `/water-systems/wetlands/${entity.slug}`}
        getCategory={(entity) => entity.category}
      />
      
      {/* NWIA Classification Reference Section */}
      <div className="container mx-auto px-6 py-12">
        <NwiaClassificationPanel variant="detailed" />
      </div>
    </main>
  );
}
