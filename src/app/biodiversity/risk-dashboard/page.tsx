'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  AlertTriangle, BarChart3, Shield, Mountain, Building2, MapPin, Activity
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { getBiodiversityRiskDashboard, getThreatSeverityAnalysis } from '@/data/biodiversity-access';
import PressureIndexGauge from '@/components/biodiversity/intelligence/PressureIndexGauge';
import VulnerabilityTrendChart from '@/components/biodiversity/intelligence/VulnerabilityTrendChart';

const RiskDashboardPage: React.FC = () => {
  const dashboard = getBiodiversityRiskDashboard();
  const threats = getThreatSeverityAnalysis();

  const riskLevel = dashboard.overallRiskScore >= 75
    ? 'critical'
    : dashboard.overallRiskScore >= 50
    ? 'high'
    : dashboard.overallRiskScore >= 25
    ? 'moderate'
    : 'low';

  const riskLabel = dashboard.overallRiskScore >= 75
    ? 'Critical Risk'
    : dashboard.overallRiskScore >= 50
    ? 'High Risk'
    : dashboard.overallRiskScore >= 25
    ? 'Moderate Risk'
    : 'Low Risk';

  const riskBadgeVariant = riskLevel === 'critical' ? 'critical' : riskLevel === 'high' ? 'danger' : riskLevel === 'moderate' ? 'warning' : 'success';

  const scoreColor = dashboard.overallRiskScore >= 50 ? 'text-red-400' : 'text-amber-400';

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="relative pt-20 sm:pt-24 md:pt-28 lg:pt-48 pb-4 sm:pb-8 md:pb-12 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[#160C27]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <Link href="/biodiversity" className="hover:text-white transition-colors">Biodiversity</Link>
              <span>/</span>
              <span className="text-white font-medium">Risk Dashboard</span>
            </div>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 sm:mb-6 leading-tight tracking-tight">
              Biodiversity Risk Dashboard
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Comprehensive risk analytics showing threat patterns, vulnerability trends, and conservation priorities across Kashmir&apos;s biodiversity.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12 space-y-16">
        {/* Overall Risk Score */}
        <section>
          <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Overall Risk Assessment</h2>
              <p className="text-sm text-slate-400">Aggregate biodiversity risk score and temporal trend</p>
            </div>
          </div>

          <Card className="glass-intense border-white/10 bg-slate-900/60" padding="lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className={`text-6xl font-bold ${scoreColor}`}>
                    {dashboard.overallRiskScore}
                  </div>
                  <div className="text-slate-400 mt-2">out of 100</div>
                  <div className="mt-2">
                    <Badge variant={riskBadgeVariant} size="lg">{riskLabel}</Badge>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <h3 className="font-semibold text-slate-300 mb-3">Risk Trend Over Time</h3>
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
          </Card>
        </section>

        {/* Risk by Taxon & Priority Actions */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Threatened Species by Taxon</h2>
                  <p className="text-sm text-slate-400">Number of threatened species per taxonomic group</p>
                </div>
              </div>

              <Card className="glass-intense border-white/10 bg-slate-900/60" padding="lg">
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
              </Card>
            </div>

            <div>
              <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Priority Conservation Actions</h2>
                  <p className="text-sm text-slate-400">Recommended actions based on current risk assessment</p>
                </div>
              </div>

              <Card className="glass-intense border-white/10 bg-slate-900/60" padding="lg">
                <div className="space-y-3">
                  {dashboard.priorityActions.map((action, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg"
                    >
                      <span className="text-emerald-400 font-bold">{index + 1}.</span>
                      <span className="text-slate-200">{action}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Top Threats */}
        <section>
          <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Top Threats Analysis</h2>
              <p className="text-sm text-slate-400">Highest severity threats affecting biodiversity</p>
            </div>
          </div>

          <Card className="glass-intense border-white/10 bg-slate-900/60" padding="lg">
            <div className="space-y-4">
              {threats.slice(0, 8).map((threat, index) => (
                <ThreatRow key={threat.threatType} threat={threat} rank={index + 1} />
              ))}
            </div>
          </Card>
        </section>

        {/* Risk by Habitat */}
        <section>
          <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <Mountain className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Risk by Habitat</h2>
              <p className="text-sm text-slate-400">Threatened species count per habitat type</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {Object.entries(dashboard.riskByHabitat).map(([habitat, count]) => (
              <HabitatRiskCard
                key={habitat}
                habitat={habitat}
                count={count}
              />
            ))}
          </div>
        </section>

        {/* Risk by District */}
        <section>
          <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Risk by District</h2>
              <p className="text-sm text-slate-400">Top districts by threatened species count</p>
            </div>
          </div>

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
        </section>

        {/* Conservation Hotspots */}
        <section>
          <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Conservation Hotspots</h2>
              <p className="text-sm text-slate-400">Key areas requiring immediate conservation attention</p>
            </div>
          </div>

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
        </section>

        {/* Monitoring Status */}
        <section>
          <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Monitoring Status</h2>
              <p className="text-sm text-slate-400">Current monitoring compliance and schedule adherence</p>
            </div>
          </div>

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
        </section>
      </div>
    </main>
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
        <span className="font-medium text-slate-300">{label}</span>
        <span className="text-sm text-slate-400">
          {count} / {total} threatened ({percentage}%)
        </span>
      </div>
      <div className="h-4 bg-white/10 rounded-full overflow-hidden">
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

  const trendColors: Record<string, string> = {
    increasing: 'text-red-400',
    stable: 'text-slate-400',
    decreasing: 'text-green-400',
  };

  return (
    <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-slate-400">
        {rank}
      </div>
      <div className="flex-1">
        <div className="font-medium text-slate-200">{threat.threatType}</div>
        <div className="text-sm text-slate-400">
          Affecting {threat.affectedSpeciesCount} species
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${severityColors[threat.severity]}`}>
          {threat.severity.toUpperCase()}
        </span>
        <span className={`text-sm capitalize ${trendColors[threat.trend] || 'text-slate-400'}`}>{threat.trend}</span>
      </div>
    </div>
  );
};

const HabitatRiskCard: React.FC<{
  habitat: string;
  count: number;
}> = ({ habitat, count }) => {
  const level = count >= 30 ? 'critical' : count >= 20 ? 'high' : count >= 10 ? 'medium' : 'low';
  const borderColors: Record<string, string> = {
    critical: 'border-red-500/30',
    high: 'border-orange-500/30',
    medium: 'border-yellow-500/30',
    low: 'border-green-500/30',
  };

  const badgeVariant = level === 'critical' ? 'critical' : level === 'high' ? 'danger' : level === 'medium' ? 'warning' : 'success';

  return (
    <Card className={`glass-intense border-white/10 bg-slate-900/60 border-t-2 ${borderColors[level]}`} padding="md">
      <div className="text-sm text-slate-400 capitalize mb-1">
        {habitat.replace(/-/g, ' ')}
      </div>
      <div className="text-3xl font-bold text-white">{count}</div>
      <div className="text-xs text-slate-500 mt-1">threatened species</div>
      <div className="mt-2">
        <Badge variant={badgeVariant} size="sm">{level} risk</Badge>
      </div>
    </Card>
  );
};

const DistrictRiskCard: React.FC<{
  district: string;
  count: number;
}> = ({ district, count }) => (
  <Card className="glass-intense border-white/10 bg-slate-900/60 text-center" padding="sm">
    <div className="text-2xl font-bold text-white">{count}</div>
    <div className="text-xs text-slate-400 mt-1 truncate">{district}</div>
  </Card>
);

const HotspotCard: React.FC<{
  name: string;
  district: string;
  threatenedCount: number;
  primaryThreat: string;
  level: 'critical' | 'high' | 'medium' | 'low';
}> = ({ name, district, threatenedCount, primaryThreat, level }) => {
  const borderColors: Record<string, string> = {
    critical: 'border-red-500/30',
    high: 'border-orange-500/30',
    medium: 'border-yellow-500/30',
    low: 'border-green-500/30',
  };

  const badgeVariant = level === 'critical' ? 'critical' : level === 'high' ? 'danger' : level === 'medium' ? 'warning' : 'success';

  return (
    <Card className={`glass-intense border-white/10 bg-slate-900/60 border-t-2 ${borderColors[level]}`} padding="md">
      <div className="flex items-center justify-between mb-2">
        <Badge variant={badgeVariant} size="sm">{level}</Badge>
      </div>
      <div className="font-semibold text-white mb-1">{name}</div>
      <div className="text-sm text-slate-400 mb-2">{district}</div>
      <div className="text-xs text-slate-500">
        {threatenedCount} threatened species
      </div>
      <div className="text-xs text-slate-500 mt-1">
        Primary: {primaryThreat}
      </div>
    </Card>
  );
};

const MonitoringCard: React.FC<{
  status: string;
  label: string;
  count: number;
  color: string;
}> = ({ status, label, count, color }) => (
  <Card className="glass-intense border-white/10 bg-slate-900/60 text-center" padding="md">
    <div className={`w-4 h-4 rounded-full ${color} mx-auto mb-2`} />
    <div className="text-3xl font-bold text-white">{count}</div>
    <div className="text-sm text-slate-400 mt-1">{label}</div>
  </Card>
);

export default RiskDashboardPage;
