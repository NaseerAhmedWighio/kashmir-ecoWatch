'use client';

import React from 'react';
import { WaterEntityListingPage } from '@/components/common/WaterEntityListingPage';
import { floodRiskZones, WaterEntity } from '@/data/water-systems';

export default function FloodRiskPage() {
  const districts = Array.from(new Set(floodRiskZones.map(f => f.district)));
  const categories = Array.from(new Set(floodRiskZones.map(f => f.category)));
  const riskLevels = Array.from(new Set(floodRiskZones.map(f => f.floodRiskData?.riskLevel).filter(Boolean)));

  return (
    <WaterEntityListingPage
      title="Flood and Hydrological Risk Zones"
      description="Floodplains, flash-flood corridors, overflow zones, glacial-melt-linked risk, wetland flood buffering, riverbank vulnerability, waterlogging zones, and hydrological hazard sensitivity."
      icon="AlertTriangle"
      color="from-red-500 to-rose-600"
      entities={floodRiskZones}
      entityType="Flood Risk Zones"
      filters={{
        districts,
        categories,
        additionalFilters: [{ key: 'riskLevel', label: 'Risk Level', options: riskLevels }],
      }}
      getEntitySlug={(entity) => `/water-systems/flood-risk/${entity.slug}`}
      getCategory={(entity) => entity.category}
      renderAdditionalInfo={(entity) => (
        entity.floodRiskData && (
          <div className="mb-4">
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
              entity.floodRiskData.riskLevel === 'critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
              entity.floodRiskData.riskLevel === 'high' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
              entity.floodRiskData.riskLevel === 'moderate' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
              'bg-green-500/20 text-green-400 border border-green-500/30'
            }`}>
              {entity.floodRiskData.riskLevel.toUpperCase()} RISK
            </div>
            <div className="text-xs text-slate-400">
              <span className="text-slate-500">Flood Type:</span> <span className="text-white">{entity.floodRiskData.floodType.replace(/-/g, ' ')}</span>
            </div>
            {entity.floodRiskData.affectedAreas && (
              <div className="text-xs text-slate-400 mt-1">
                <span className="text-slate-500">Areas:</span> <span className="text-white">{entity.floodRiskData.affectedAreas.slice(0, 3).join(', ')}{entity.floodRiskData.affectedAreas.length > 3 ? '...' : ''}</span>
              </div>
            )}
          </div>
        )
      )}
    />
  );
}
