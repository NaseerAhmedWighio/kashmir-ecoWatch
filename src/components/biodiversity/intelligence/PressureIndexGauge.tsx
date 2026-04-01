'use client';

import React from 'react';
import { HabitatPressureIndex, PressureTrend } from '@/types/biodiversity';

interface PressureIndexGaugeProps {
  pressureIndex: HabitatPressureIndex;
  size?: 'sm' | 'md' | 'lg';
  showDrivers?: boolean;
}

const PressureIndexGauge: React.FC<PressureIndexGaugeProps> = ({
  pressureIndex,
  size = 'md',
  showDrivers = true,
}) => {
  const { overallScore, trend, drivers } = pressureIndex;

  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score <= 25) return { bg: 'bg-green-500', text: 'text-green-600', label: 'Low Pressure' };
    if (score <= 50) return { bg: 'bg-yellow-500', text: 'text-yellow-600', label: 'Moderate Pressure' };
    if (score <= 75) return { bg: 'bg-orange-500', text: 'text-orange-600', label: 'High Pressure' };
    return { bg: 'bg-red-500', text: 'text-red-600', label: 'Critical Pressure' };
  };

  const getTrendIcon = (trend: PressureTrend) => {
    switch (trend) {
      case 'improving':
        return { icon: '↓', color: 'text-green-600', label: 'Improving' };
      case 'stable':
        return { icon: '→', color: 'text-yellow-600', label: 'Stable' };
      case 'declining':
        return { icon: '↑', color: 'text-red-600', label: 'Declining' };
    }
  };

  const colorScheme = getScoreColor(overallScore);
  const trendInfo = getTrendIcon(trend);

  const sizeClasses = {
    sm: { gauge: 'w-24 h-24', text: 'text-lg', drivers: 'text-xs' },
    md: { gauge: 'w-32 h-32', text: 'text-2xl', drivers: 'text-sm' },
    lg: { gauge: 'w-40 h-40', text: 'text-3xl', drivers: 'text-base' },
  };

  // Calculate stroke dasharray for SVG gauge
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (overallScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Gauge */}
      <div className={`relative ${sizeClasses[size].gauge}`}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            className={`${colorScheme.bg} transition-all duration-1000 ease-out`}
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-bold ${sizeClasses[size].text} ${colorScheme.text}`}>
            {overallScore}
          </span>
          <span className="text-xs text-gray-500">/ 100</span>
        </div>
      </div>

      {/* Label and Trend */}
      <div className="text-center">
        <div className={`font-semibold ${colorScheme.text}`}>{colorScheme.label}</div>
        <div className="flex items-center justify-center gap-1 text-sm text-gray-600">
          <span className={`font-bold ${trendInfo.color}`}>{trendInfo.icon}</span>
          <span>Trend: {trendInfo.label}</span>
        </div>
      </div>

      {/* Driver Breakdown */}
      {showDrivers && (
        <div className={`w-full ${sizeClasses[size].drivers}`}>
          <h4 className="font-semibold mb-2 text-gray-700">Pressure Drivers</h4>
          <div className="space-y-2">
            {Object.entries(drivers)
              .filter(([_, value]) => value > 0)
              .sort((a, b) => b[1] - a[1])
              .map(([driver, value]) => (
                <div key={driver} className="flex items-center gap-2">
                  <span className="text-gray-600 capitalize w-32 truncate" title={driver}>
                    {driver.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        value >= 75
                          ? 'bg-red-500'
                          : value >= 50
                          ? 'bg-orange-500'
                          : value >= 25
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                  <span className="text-gray-700 font-medium w-8 text-right">{value}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Mitigation Actions */}
      {pressureIndex.mitigationActions && pressureIndex.mitigationActions.length > 0 && (
        <div className="w-full mt-4 p-3 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 text-sm mb-2">Mitigation Actions</h4>
          <ul className="space-y-1">
            {pressureIndex.mitigationActions.map((action, index) => (
              <li key={index} className="text-blue-700 text-sm flex items-start gap-1">
                <span>✓</span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Last Assessment */}
      {pressureIndex.lastAssessmentDate && (
        <div className="text-xs text-gray-500">
          Last assessed: {new Date(pressureIndex.lastAssessmentDate).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

export default PressureIndexGauge;
