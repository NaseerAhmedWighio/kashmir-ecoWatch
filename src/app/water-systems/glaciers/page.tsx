'use client';

import React from 'react';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { glaciersData, WaterEntity } from '@/data/water-systems';

export default function GlaciersPage() {
  const districts = Array.from(new Set(glaciersData.map(g => g.district)));
  const categories = Array.from(new Set(glaciersData.map(g => g.category)));

  return (
    <WaterEntityListingPage
      title="All Glaciers and Cryosphere of Kashmir"
      description="Glaciers, glacial lakes, snow-fed systems, seasonal snow cover logic, high-altitude cryosphere-linked catchments, and downstream hydrological dependence."
      icon="Mountain"
      color="from-slate-400 to-slate-600"
      entities={glaciersData}
      entityType="Glaciers"
      filters={{
        districts,
        categories,
      }}
      getEntitySlug={(entity) => `/water-systems/glaciers/${entity.slug}`}
      getCategory={(entity) => entity.category}
      getSecondaryMetric={(entity) => {
        if (entity.area) {
          return { label: 'Area', value: `${entity.area} km²`, icon: 'Mountain' as const };
        }
        return null;
      }}
    />
  );
}
