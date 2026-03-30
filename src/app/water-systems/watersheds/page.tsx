'use client';

import React from 'react';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { watershedsData, WaterEntity } from '@/data/water-systems';

export default function WatershedsPage() {
  const districts = Array.from(new Set(watershedsData.map(w => w.district)));
  const categories = Array.from(new Set(watershedsData.map(w => w.category)));

  return (
    <WaterEntityListingPage
      title="All Watersheds of Kashmir"
      description="Major and minor watersheds, sub-watersheds, spring catchments, lake catchments, river basins, upper catchments, and downstream-linked hydrological units."
      icon="Map"
      color="from-amber-500 to-orange-600"
      entities={watershedsData}
      entityType="Watersheds"
      filters={{
        districts,
        categories,
      }}
      getEntitySlug={(entity) => `/water-systems/watersheds/${entity.slug}`}
      getCategory={(entity) => entity.category}
      getSecondaryMetric={(entity) => {
        if (entity.area) {
          return { label: 'Area', value: `${entity.area} km²`, icon: "Map" as const };
        }
        return null;
      }}
    />
  );
}
