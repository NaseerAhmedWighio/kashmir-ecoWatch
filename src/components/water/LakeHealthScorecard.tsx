'use client';

import React from 'react';
import type { LakeHealthScorecard, HealthClassification } from '@/data/hydrological-intelligence';

interface LakeHealthScorecardProps {
  scorecard: LakeHealthScorecard;
  compact?: boolean;
}

const LakeHealthScorecardComponent: React.FC<LakeHealthScorecardProps> = ({
  scorecard,
  compact = false,
}) => {
  const getClassificationColor = (classification: HealthClassification) => {
    const colors = {
      excellent: 'from-emerald-500 to-green-600',
      good: 'from-green-500 to-teal-600',
      fair: 'from-yellow-500 to-amber-600',
      poor: 'from-orange-500 to-red-600',
      critical: 'from-red-600 to-red-800',
    };
    return colors[classification];
  };

  const getClassificationBadgeColor = (classification: HealthClassification) => {
    const colors = {
      excellent: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      good: 'bg-green-100 text-green-800 border-green-300',
      fair: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      poor: 'bg-orange-100 text-orange-800 border-orange-300',
      critical: 'bg-red-100 text-red-800 border-red-300',
    };
    return colors[classification];
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 75) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getBarColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 75) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  if (compact) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-800">{scorecard.lakeName}</h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold border ${getClassificationBadgeColor(
              scorecard.classification
            )}`}
          >
            {scorecard.classification.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className={`text-3xl font-bold ${getScoreColor(scorecard.overallScore)}`}>
              {scorecard.overallScore}
            </div>
            <div className="text-xs text-gray-600">Health Score</div>
          </div>

          <div className="flex-1 space-y-2">
            <ComponentBar label="Water Quality" score={scorecard.componentScores.waterQuality} />
            <ComponentBar label="Trophic State" score={scorecard.componentScores.trophicState} />
            <ComponentBar label="Biodiversity" score={scorecard.componentScores.biodiversity} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className={`bg-gradient-to-r ${getClassificationColor(scorecard.classification)} p-6 text-white`}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{scorecard.lakeName}</h2>
            <p className="text-white/80 text-sm mt-1">Lake Health Assessment</p>
          </div>
          <div className="text-right">
            <div className="text-5xl font-bold">{scorecard.overallScore}</div>
            <div className="text-white/80 text-sm">out of 100</div>
          </div>
        </div>
      </div>

      {/* Classification Badge */}
      <div className="p-4 bg-gray-50 border-b">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Overall Health Classification</span>
          <span
            className={`px-4 py-2 rounded-lg text-sm font-bold border ${getClassificationBadgeColor(
              scorecard.classification
            )}`}
          >
            {scorecard.classification.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Component Scores */}
      <div className="p-6">
        <h3 className="font-bold text-gray-800 mb-4">Component Scores</h3>
        <div className="space-y-4">
          <ComponentBar
            label="Water Quality"
            score={scorecard.componentScores.waterQuality}
            description="Based on WQI and water parameters"
          />
          <ComponentBar
            label="Trophic State"
            score={scorecard.componentScores.trophicState}
            description={`Status: ${scorecard.trophicState || 'Normal'}`}
          />
          <ComponentBar
            label="Biodiversity"
            score={scorecard.componentScores.biodiversity}
            description="Species richness and integrity"
          />
          <ComponentBar
            label="Hydrology"
            score={scorecard.componentScores.hydrology}
            description="Water regime stability"
          />
          <ComponentBar
            label="Threat Pressure"
            score={scorecard.componentScores.threatPressure}
            description="Inverse threat impact score"
          />
        </div>
      </div>

      {/* Trends */}
      <div className="p-6 bg-gray-50 border-t">
        <h3 className="font-bold text-gray-800 mb-4">Health Trends</h3>
        <div className="grid grid-cols-3 gap-4">
          <TrendIndicator
            label="Overall"
            trend={scorecard.trends.overall}
          />
          <TrendIndicator
            label="Water Quality"
            trend={scorecard.trends.waterQuality}
          />
          <TrendIndicator
            label="Trophic State"
            trend={scorecard.trends.trophicState}
          />
        </div>
      </div>

      {/* Key Threats */}
      {scorecard.keyThreats.length > 0 && (
        <div className="p-6 border-t">
          <h3 className="font-bold text-gray-800 mb-3">Key Threats</h3>
          <div className="flex flex-wrap gap-2">
            {scorecard.keyThreats.map((threat, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm border border-red-200"
              >
                {threat}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Conservation Actions */}
      {scorecard.conservationActions.length > 0 && (
        <div className="p-6 bg-green-50 border-t">
          <h3 className="font-bold text-green-800 mb-3">Conservation Actions</h3>
          <ul className="space-y-2">
            {scorecard.conservationActions.map((action, index) => (
              <li key={index} className="text-green-700 text-sm flex items-start gap-2">
                <span className="text-green-600 mt-0.5">✓</span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t text-xs text-gray-600 flex items-center justify-between">
        <span>Last Assessment: {new Date(scorecard.lastAssessment).toLocaleDateString()}</span>
        {scorecard.wqi && (
          <span>WQI: {scorecard.wqi}</span>
        )}
      </div>
    </div>
  );
};

// Helper Components

const ComponentBar: React.FC<{
  label: string;
  score: number;
  description?: string;
}> = ({ label, score, description }) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 75) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getBarColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 75) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className={`text-sm font-bold ${getScoreColor(score)}`}>{score}</span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getBarColor(score)} transition-all duration-500`}
          style={{ width: `${score}%` }}
        />
      </div>
      {description && <div className="text-xs text-gray-500 mt-1">{description}</div>}
    </div>
  );
};

const TrendIndicator: React.FC<{
  label: string;
  trend: 'improving' | 'stable' | 'declining';
}> = ({ label, trend }) => {
  const config = {
    improving: { icon: '↑', color: 'text-green-600', bg: 'bg-green-100' },
    stable: { icon: '→', color: 'text-yellow-600', bg: 'bg-yellow-100' },
    declining: { icon: '↓', color: 'text-red-600', bg: 'bg-red-100' },
  };

  const { icon, color, bg } = config[trend];

  return (
    <div className={`${bg} rounded-lg p-3 text-center`}>
      <div className={`text-xl font-bold ${color}`}>{icon}</div>
      <div className="text-xs text-gray-600 mt-1">{label}</div>
      <div className={`text-xs font-medium ${color} capitalize`}>{trend}</div>
    </div>
  );
};

export default LakeHealthScorecardComponent;
