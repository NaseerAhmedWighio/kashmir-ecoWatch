'use client';

import React from 'react';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { fisheriesData, WaterEntity } from '@/data/water-systems';

export default function FisheriesPage() {
  const districts = Array.from(new Set(fisheriesData.map(f => f.district)));
  const categories = Array.from(new Set(fisheriesData.map(f => f.category)));
  const fisheryTypes = Array.from(new Set(fisheriesData.map(f => f.fisheryData?.fisheryType).filter(Boolean)));

  return (
    <WaterEntityListingPage
      title="All Fisheries and Aquatic Life"
      description="Native fish systems, trout systems, snow trout systems, aquatic ecology, lake fisheries, stream fisheries, wetland aquatic communities, and biodiversity linked to freshwater habitats."
      icon="Fish"
      color="from-violet-500 to-purple-600"
      entities={fisheriesData}
      entityType="Fisheries"
      filters={{
        districts,
        categories,
        additionalFilters: [{ key: 'fisheryType', label: 'Fishery Type', options: fisheryTypes }],
      }}
      getEntitySlug={(entity) => `/water-systems/fisheries/${entity.slug}`}
      getCategory={(entity) => entity.category}
      renderAdditionalInfo={(entity) => (
        entity.fisheryData && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {entity.fisheryData.fishSpecies.slice(0, 4).map((species, idx) => (
                <span key={idx} className="text-xs px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {species.replace(/-/g, ' ')}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-3 text-xs text-slate-400">
              <span>Type: <span className="text-white capitalize">{entity.fisheryData.fisheryType}</span></span>
              <span>Productivity: <span className="text-white capitalize">{entity.fisheryData.productivity}</span></span>
            </div>
          </div>
        )
      )}
    />
  );
}
