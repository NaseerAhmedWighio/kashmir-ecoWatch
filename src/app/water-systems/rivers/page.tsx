'use client';

import React from 'react';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { riversData, WaterEntity } from '@/data/water-systems';

export default function RiversPage() {
  const districts = Array.from(new Set(riversData.map(r => r.district)));
  const categories = Array.from(new Set(riversData.map(r => r.category)));

  return (
    <WaterEntityListingPage
      title="All Rivers and Streams of Kashmir"
      description="Complete inventory of major rivers, tributaries, district streams, cold-water streams, drainage-linked natural channels, and ecologically significant flow systems."
      icon="Wind"
      color="from-indigo-500 to-purple-600"
      entities={riversData}
      entityType="Rivers & Streams"
      filters={{
        districts,
        categories,
        qualityStatuses: ['excellent', 'good', 'moderate', 'poor', 'critical'],
      }}
      getEntitySlug={(entity) => `/water-systems/rivers/${entity.slug}`}
      getCategory={(entity) => entity.category}
      getSecondaryMetric={(entity) => {
        if (entity.length) {
          return { label: 'Length', value: `${entity.length} km`, icon: 'Wind' as const };
        }
        return null;
      }}
    />
  );
}
