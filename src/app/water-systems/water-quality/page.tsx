'use client';

import React from 'react';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { waterQualitySites, WaterEntity } from '@/data/water-systems';

export default function WaterQualityPage() {
  const districts = Array.from(new Set(waterQualitySites.map(w => w.district)));
  const categories = Array.from(new Set(waterQualitySites.map(w => w.category)));

  return (
    <WaterEntityListingPage
      title="Water Quality Monitoring Sites"
      description="Lake quality, wetland quality, river and stream quality, spring quality, catchment-linked water stress, and site-based monitoring and trends."
      icon="Thermometer"
      color="from-teal-500 to-cyan-600"
      entities={waterQualitySites}
      entityType="Quality Sites"
      filters={{
        districts,
        categories,
        qualityStatuses: ['excellent', 'good', 'moderate', 'poor', 'critical'],
      }}
      getEntitySlug={(entity) => `/water-systems/water-quality/${entity.slug}`}
      getCategory={(entity) => entity.category}
      renderAdditionalInfo={(entity) => (
        entity.waterQuality && (
          <div className="mb-4 p-3 rounded-lg bg-slate-800/50 border border-white/5">
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-slate-500">Dissolved O₂</span>
                <div className="text-white font-semibold">{entity.waterQuality.dissolvedOxygen} mg/L</div>
              </div>
              <div>
                <span className="text-slate-500">Turbidity</span>
                <div className="text-white font-semibold">{entity.waterQuality.turbidity} NTU</div>
              </div>
              <div>
                <span className="text-slate-500">BOD</span>
                <div className="text-white font-semibold">{entity.waterQuality.biologicalOxygenDemand} mg/L</div>
              </div>
            </div>
          </div>
        )
      )}
    />
  );
}
