'use client';

import React from 'react';
import type { DistrictWaterIntelligence } from '@/data/hydrological-intelligence';

interface DistrictWaterCardProps {
  intelligence: DistrictWaterIntelligence;
}

const DistrictWaterCard: React.FC<DistrictWaterCardProps> = ({ intelligence }) => {
  const getHealthColor = (score: number) => {
    if (score >= 75) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    if (score >= 40) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">{intelligence.district}</h3>
        <div className={`px-3 py-1 rounded-full text-sm font-bold ${getHealthColor(intelligence.averageHealthScore)}`}>
          Avg Health: {intelligence.averageHealthScore}
        </div>
      </div>

      {/* Water Body Counts */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        <WaterBodyCount label="Lakes" count={intelligence.waterBodies.lakes} color="bg-blue-500" />
        <WaterBodyCount label="Wetlands" count={intelligence.waterBodies.wetlands} color="bg-green-500" />
        <WaterBodyCount label="Rivers" count={intelligence.waterBodies.rivers} color="bg-cyan-500" />
        <WaterBodyCount label="Springs" count={intelligence.waterBodies.springs} color="bg-purple-500" />
        <WaterBodyCount label="Total" count={intelligence.waterBodies.total} color="bg-gray-500" />
      </div>

      {/* Water Quality Status */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Water Quality Distribution</h4>
        <div className="flex h-3 rounded-full overflow-hidden bg-gray-200">
          {renderQualityBar(intelligence.waterQualityStatus)}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <QualityLegend status="excellent" count={intelligence.waterQualityStatus.excellent} />
          <QualityLegend status="good" count={intelligence.waterQualityStatus.good} />
          <QualityLegend status="moderate" count={intelligence.waterQualityStatus.moderate} />
          <QualityLegend status="poor" count={intelligence.waterQualityStatus.poor} />
          <QualityLegend status="critical" count={intelligence.waterQualityStatus.critical} />
        </div>
      </div>

      {/* Critical Water Bodies */}
      {intelligence.criticalWaterBodies.length > 0 && (
        <div className="mb-4 p-3 bg-red-50 rounded-lg border border-red-200">
          <div className="text-sm font-semibold text-red-800 mb-2">⚠️ Critical Water Bodies</div>
          <div className="text-xs text-red-700">
            {intelligence.criticalWaterBodies.join(', ')}
          </div>
        </div>
      )}

      {/* Restoration */}
      {intelligence.restorationProjects > 0 && (
        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold text-green-800">Restoration Projects</div>
            <div className="text-lg font-bold text-green-700">{intelligence.restorationProjects}</div>
          </div>
          {intelligence.restorationInvestments > 0 && (
            <div className="text-xs text-green-600 mt-1">
              Investment: ₹{(intelligence.restorationInvestments / 1000).toFixed(1)}M
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Helper Components

const WaterBodyCount: React.FC<{
  label: string;
  count: number;
  color: string;
}> = ({ label, count, color }) => (
  <div className="text-center">
    <div className={`${color} text-white rounded-lg py-2 mb-1`}>
      <div className="text-lg font-bold">{count}</div>
    </div>
    <div className="text-xs text-gray-600">{label}</div>
  </div>
);

const renderQualityBar = (status: DistrictWaterIntelligence['waterQualityStatus']) => {
  const total =
    status.excellent + status.good + status.moderate + status.poor + status.critical;
  if (total === 0) return <div className="text-xs text-gray-500 w-full text-center">No data</div>;

  const getWidth = (count: number) => `${(count / total) * 100}%`;

  return (
    <>
      <div className="bg-emerald-500" style={{ width: getWidth(status.excellent) }} title="Excellent" />
      <div className="bg-green-500" style={{ width: getWidth(status.good) }} title="Good" />
      <div className="bg-yellow-500" style={{ width: getWidth(status.moderate) }} title="Moderate" />
      <div className="bg-orange-500" style={{ width: getWidth(status.poor) }} title="Poor" />
      <div className="bg-red-500" style={{ width: getWidth(status.critical) }} title="Critical" />
    </>
  );
};

const QualityLegend: React.FC<{
  status: string;
  count: number;
}> = ({ status, count }) => {
  if (count === 0) return null;

  const colors: Record<string, string> = {
    excellent: 'bg-emerald-100 text-emerald-800',
    good: 'bg-green-100 text-green-800',
    moderate: 'bg-yellow-100 text-yellow-800',
    poor: 'bg-orange-100 text-orange-800',
    critical: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${colors[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}: {count}
    </span>
  );
};

export default DistrictWaterCard;
