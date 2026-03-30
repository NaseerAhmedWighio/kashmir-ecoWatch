'use client';

import React from 'react';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { restorationSites, WaterEntity } from '@/data/water-systems';

export default function RestorationPage() {
  const districts = Array.from(new Set(restorationSites.map(r => r.district)));
  const categories = Array.from(new Set(restorationSites.map(r => r.category)));
  const statuses = Array.from(new Set(restorationSites.map(r => r.restorationData?.status).filter(Boolean)));

  return (
    <WaterEntityListingPage
      title="All Restoration and Rejuvenation Sites"
      description="Lake restoration, wetland restoration, spring rejuvenation, catchment treatment, river and stream rehabilitation, recharge improvement, ecological desiltation, vegetation recovery, and hydrological restoration planning."
      icon="Hammer"
      color="from-lime-500 to-green-600"
      entities={restorationSites}
      entityType="Restoration Sites"
      filters={{
        districts,
        categories,
        additionalFilters: [{ key: 'status', label: 'Status', options: statuses }],
      }}
      getEntitySlug={(entity) => `/water-systems/restoration/${entity.slug}`}
      getCategory={(entity) => entity.category}
      renderAdditionalInfo={(entity) => (
        entity.restorationData && (
          <div className="mb-4">
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
              entity.restorationData.status === 'completed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
              entity.restorationData.status === 'ongoing' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
              'bg-slate-500/20 text-slate-400 border border-slate-500/30'
            }`}>
              {entity.restorationData.status.toUpperCase()}
            </div>
            <div className="text-xs text-slate-400">
              <span className="text-slate-500">Agency:</span> <span className="text-white truncate block">{entity.restorationData.implementingAgency}</span>
            </div>
            {entity.restorationData.areaTreated && (
              <div className="text-xs text-slate-400 mt-1">
                <span className="text-slate-500">Area Treated:</span> <span className="text-white">{entity.restorationData.areaTreated} km²</span>
              </div>
            )}
          </div>
        )
      )}
    />
  );
}
