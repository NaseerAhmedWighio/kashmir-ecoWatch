'use client';

import React from 'react';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { springsData, WaterEntity } from '@/data/water-systems';

export default function SpringsPage() {
  const districts = Array.from(new Set(springsData.map(s => s.district)));
  const categories = Array.from(new Set(springsData.map(s => s.category)));

  return (
    <WaterEntityListingPage
      title="All Springs of Kashmir"
      description="Mapped springs, community springs, seasonal springs, perennial springs, springsheds, recharge-linked spring systems, and spring restoration sites."
      icon="Droplet"
      color="from-emerald-500 to-green-600"
      entities={springsData}
      entityType="Springs"
      filters={{
        districts,
        categories,
        qualityStatuses: ['excellent', 'good', 'moderate', 'poor', 'critical'],
      }}
      getEntitySlug={(entity) => `/water-systems/springs/${entity.slug}`}
      getCategory={(entity) => entity.category}
    />
  );
}
