'use client';

import React from 'react';
import Link from 'next/link';
import { getBiodiversityRiskDashboard, getThreatSeverityAnalysis } from '@/data/biodiversity-access';
import PressureIndexGauge from '@/components/biodiversity/intelligence/PressureIndexGauge';
import VulnerabilityTrendChart from '@/components/biodiversity/intelligence/VulnerabilityTrendChart';

const RiskDashboardPage: React.FC = () => {
  const dashboard = getBiodiversityRiskDashboard();
  const threats = getThreatSeverityAnalysis();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-700 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-4">
            <Link href="/biodiversity" className="hover:underline">
              Biodiversity
            </Link>
            <span>/</span>
            <span className="text-red-100">Risk Dashboard</span>
          </div>

          <h1 className="text-4xl font-bold mb-4">Biodiversity Risk Dashboard</h1>
          <p className="text-xl text-red-100 max-w-3xl">
            Comprehensive risk analytics showing threat patterns, vulnerability trends, 
            and conservation priorities across Kashmir&apos;s biodiversity.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Overall Risk Score */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Overall Risk Assessment</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className={`text-6xl font-bold ${
                  dashboard.overallRiskScore >= 50 ? 'text-red-600' : 'text-yellow-600'
                }`}>
                  {dashboard.overallRiskScore}
                </div>
                <div className="text-gray-600 mt-2">out of 100</div>
                <div className={`mt-2 px-4 py-2 rounded-full text-sm font-medium ${
                  dashboard.overallRiskScore >= 50
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {dashboard.overallRiskScore >= 75
                    ? '🔴 Critical Risk'
                    : dashboard.overallRiskScore >= 50
                    ? '🟠 High Risk'
                    : dashboard.overallRiskScore >= 25
                    ? '🟡 Moderate Risk'
                    : '🟢 Low Risk'}
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <h3 className="font-semibold text-gray-700 mb-3">Risk Trend Over Time</h3>
              <div className="h-48">
                <VulnerabilityTrendChart
                  trend={dashboard.temporalTrend.map((t) => ({
                    year: t.year,
                    score: t.riskScore,
                  }))}
                  height={180}
                  showLabels={false}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Risk by Taxon */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Threatened Species by Taxon
            </h2>
            <div className="space-y-4">
              <TaxonRiskBar
                label="Mammals"
                count={dashboard.riskByTaxon.mammals}
                total={67}
                color="bg-blue-500"
              />
              <TaxonRiskBar
                label="Birds"
                count={dashboard.riskByTaxon.birds}
                total={312}
                color="bg-green-500"
              />
              <TaxonRiskBar
                label="Fish"
                count={dashboard.riskByTaxon.fish}
                total={23}
                color="bg-cyan-500"
              />
              <TaxonRiskBar
                label="Plants"
                count={dashboard.riskByTaxon.plants}
                total={1834}
                color="bg-emerald-500"
              />
            </div>
          </div>

          {/* Priority Actions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Priority Conservation Actions
            </h2>
            <div className="space-y-3">
              {dashboard.priorityActions.map((action, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-green-50 rounded-lg"
                >
                  <span className="text-green-600 font-bold">{index + 1}.</span>
                  <span className="text-gray-800">{action}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Threats */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Top Threats Analysis</h2>
          <div className="space-y-4">
            {threats.slice(0, 8).map((threat, index) => (
              <ThreatRow key={threat.threatType} threat={threat} rank={index + 1} />
            ))}
          </div>
        </div>

        {/* Risk by Habitat */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Risk by Habitat
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.entries(dashboard.riskByHabitat).map(([habitat, count]) => (
              <HabitatRiskCard
                key={habitat}
                habitat={habitat}
                count={count}
              />
            ))}
          </div>
        </div>

        {/* Risk by District */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Risk by District
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {Object.entries(dashboard.riskByDistrict)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 8)
              .map(([district, count]) => (
                <DistrictRiskCard
                  key={district}
                  district={district}
                  count={count}
                />
              ))}
          </div>
        </div>

        {/* Conservation Hotspots */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Conservation Hotspots
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <HotspotCard
              name="Dachigam National Park"
              district="Srinagar"
              threatenedCount={12}
              primaryThreat="Habitat fragmentation"
              level="critical"
            />
            <HotspotCard
              name="Hokersar Wetland"
              district="Srinagar"
              threatenedCount={8}
              primaryThreat="Encroachment"
              level="high"
            />
            <HotspotCard
              name="Overa-Aru WLS"
              district="Anantnag"
              threatenedCount={15}
              primaryThreat="Poaching"
              level="critical"
            />
            <HotspotCard
              name="Kishtwar High Alps"
              district="Kishtwar"
              threatenedCount={10}
              primaryThreat="Climate change"
              level="high"
            />
          </div>
        </div>

        {/* Monitoring Status */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Monitoring Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MonitoringCard
              status="on-time"
              label="On Schedule"
              count={12}
              color="bg-green-500"
            />
            <MonitoringCard
              status="upcoming"
              label="Due Soon"
              count={5}
              color="bg-yellow-500"
            />
            <MonitoringCard
              status="overdue"
              label="Overdue"
              count={2}
              color="bg-red-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components

const TaxonRiskBar: React.FC<{
  label: string;
  count: number;
  total: number;
  color: string;
}> = ({ label, count, total, color }) => {
  const percentage = Math.round((count / total) * 100);

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="text-sm text-gray-600">
          {count} / {total} threatened ({percentage}%)
        </span>
      </div>
      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

const ThreatRow: React.FC<{
  threat: {
    threatType: string;
    severity: string;
    affectedSpeciesCount: number;
    trend: string;
  };
  rank: number;
}> = ({ threat, rank }) => {
  const severityColors: Record<string, string> = {
    critical: 'bg-red-500',
    high: 'bg-orange-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500',
  };

  return (
    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
        {rank}
      </div>
      <div className="flex-1">
        <div className="font-medium text-gray-800">{threat.threatType}</div>
        <div className="text-sm text-gray-600">
          Affecting {threat.affectedSpeciesCount} species
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${severityColors[threat.severity]}`}>
          {threat.severity.toUpperCase()}
        </span>
        <span className="text-sm text-gray-500 capitalize">{threat.trend}</span>
      </div>
    </div>
  );
};

const HabitatRiskCard: React.FC<{
  habitat: string;
  count: number;
}> = ({ habitat, count }) => {
  const level = count >= 30 ? 'critical' : count >= 20 ? 'high' : count >= 10 ? 'medium' : 'low';
  const colors: Record<string, string> = {
    critical: 'bg-red-100 border-red-300',
    high: 'bg-orange-100 border-orange-300',
    medium: 'bg-yellow-100 border-yellow-300',
    low: 'bg-green-100 border-green-300',
  };

  return (
    <div className={`p-4 rounded-lg border-2 ${colors[level]}`}>
      <div className="text-sm text-gray-600 capitalize mb-1">
        {habitat.replace(/-/g, ' ')}
      </div>
      <div className="text-3xl font-bold text-gray-800">{count}</div>
      <div className="text-xs text-gray-500 mt-1">threatened species</div>
    </div>
  );
};

const DistrictRiskCard: React.FC<{
  district: string;
  count: number;
}> = ({ district, count }) => (
  <div className="text-center p-3 bg-gray-50 rounded-lg">
    <div className="text-2xl font-bold text-gray-800">{count}</div>
    <div className="text-xs text-gray-600 mt-1 truncate">{district}</div>
  </div>
);

const HotspotCard: React.FC<{
  name: string;
  district: string;
  threatenedCount: number;
  primaryThreat: string;
  level: 'critical' | 'high' | 'medium' | 'low';
}> = ({ name, district, threatenedCount, primaryThreat, level }) => {
  const colors: Record<string, string> = {
    critical: 'bg-red-50 border-red-200',
    high: 'bg-orange-50 border-orange-200',
    medium: 'bg-yellow-50 border-yellow-200',
    low: 'bg-green-50 border-green-200',
  };

  const indicators: Record<string, string> = {
    critical: '🔴',
    high: '🟠',
    medium: '🟡',
    low: '🟢',
  };

  return (
    <div className={`p-4 rounded-lg border-2 ${colors[level]}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xl">{indicators[level]}</span>
        <span className="text-xs text-gray-500 capitalize">{level}</span>
      </div>
      <div className="font-semibold text-gray-800 mb-1">{name}</div>
      <div className="text-sm text-gray-600 mb-2">{district}</div>
      <div className="text-xs text-gray-500">
        {threatenedCount} threatened species
      </div>
      <div className="text-xs text-gray-500 mt-1">
        Primary: {primaryThreat}
      </div>
    </div>
  );
};

const MonitoringCard: React.FC<{
  status: string;
  label: string;
  count: number;
  color: string;
}> = ({ status, label, count, color }) => (
  <div className="p-4 bg-gray-50 rounded-lg text-center">
    <div className={`w-4 h-4 rounded-full ${color} mx-auto mb-2`} />
    <div className="text-3xl font-bold text-gray-800">{count}</div>
    <div className="text-sm text-gray-600 mt-1">{label}</div>
  </div>
);

export default RiskDashboardPage;
