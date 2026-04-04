'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  BarChart3, Leaf, Bird, Mountain, Fish, Sprout,
  Shield, Eye, TrendingUp, ArrowRight, Building2,
  AlertTriangle, Activity
} from 'lucide-react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { biodiversityMetrics, mammalsData, birdsData, fishData, plantsData, medicinalPlantsData, threatenedSpeciesData } from '@/data/biodiversity';
import { getHabitatBiodiversity, getDistrictBiodiversity, biodiversityIntelligenceMetrics } from '@/data/biodiversity-intelligence';
import { getBiodiversityRiskDashboard, getSpeciesCount, getThreatSeverityAnalysis } from '@/data/biodiversity-access';
import { sightingIntelligenceData } from '@/data/trails-sightings';

// ============================================================================
// DATA COMPUTATIONS
// ============================================================================

function computeConservationStatusBreakdown() {
  const allSpecies = [...mammalsData, ...birdsData, ...fishData, ...plantsData, ...medicinalPlantsData];
  const breakdown: Record<string, number> = { CR: 0, EN: 0, VU: 0, NT: 0, LC: 0 };
  allSpecies.forEach(s => {
    if (breakdown[s.conservationStatus] !== undefined) {
      breakdown[s.conservationStatus]++;
    }
  });
  return breakdown;
}

function computeSightingsByVerification() {
  const sightings = sightingIntelligenceData;
  return {
    verified: sightings.filter(s => s.verificationStatus === 'verified').length,
    reviewed: sightings.filter(s => s.verificationStatus === 'reviewed').length,
    community: sightings.filter(s => s.verificationStatus === 'community').length,
    pending: sightings.filter(s => s.verificationStatus === 'pending').length,
  };
}

function computeSightingsByDistrict() {
  const sightings = sightingIntelligenceData;
  const byDistrict: Record<string, number> = {};
  sightings.forEach(s => {
    byDistrict[s.district] = (byDistrict[s.district] || 0) + 1;
  });
  return Object.entries(byDistrict)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);
}

function computeSightingsBySeason() {
  const sightings = sightingIntelligenceData;
  const bySeason: Record<string, number> = { spring: 0, summer: 0, autumn: 0, winter: 0 };
  sightings.forEach(s => {
    if (bySeason[s.season] !== undefined) {
      bySeason[s.season]++;
    }
  });
  return bySeason;
}

function computeSpeciesByTaxon() {
  return [
    { label: 'Mammals', count: biodiversityMetrics.mammals, icon: Mountain, color: 'from-blue-500 to-blue-600', bgBar: 'bg-blue-500' },
    { label: 'Birds', count: biodiversityMetrics.birds, icon: Bird, color: 'from-emerald-500 to-emerald-600', bgBar: 'bg-emerald-500' },
    { label: 'Fish', count: biodiversityMetrics.fish, icon: Fish, color: 'from-cyan-500 to-cyan-600', bgBar: 'bg-cyan-500' },
    { label: 'Plants', count: biodiversityMetrics.plants, icon: Sprout, color: 'from-green-500 to-green-600', bgBar: 'bg-green-500' },
    { label: 'Medicinal', count: biodiversityMetrics.medicinalPlants, icon: Leaf, color: 'from-teal-500 to-teal-600', bgBar: 'bg-teal-500' },
  ];
}

const conservationStatusColors: Record<string, string> = {
  CR: 'bg-red-500',
  EN: 'bg-orange-500',
  VU: 'bg-amber-500',
  NT: 'bg-yellow-500',
  LC: 'bg-green-500',
};

const conservationStatusLabels: Record<string, string> = {
  CR: 'Critically Endangered',
  EN: 'Endangered',
  VU: 'Vulnerable',
  NT: 'Near Threatened',
  LC: 'Least Concern',
};

const seasonColors: Record<string, string> = {
  spring: 'from-green-400 to-emerald-500',
  summer: 'from-yellow-400 to-amber-500',
  autumn: 'from-orange-400 to-red-500',
  winter: 'from-blue-400 to-indigo-500',
};

const seasonLabels: Record<string, string> = {
  spring: 'Spring (Mar-May)',
  summer: 'Summer (Jun-Aug)',
  autumn: 'Autumn (Sep-Nov)',
  winter: 'Winter (Dec-Feb)',
};

const subPageLinks = [
  { label: 'Species Directory', href: '/biodiversity', icon: Leaf },
  { label: 'Mammals', href: '/biodiversity/mammals', icon: Mountain },
  { label: 'Birds', href: '/biodiversity/birds', icon: Bird },
  { label: 'Fish & Aquatic Life', href: '/biodiversity/fish', icon: Fish },
  { label: 'Plants & Flora', href: '/biodiversity/plants', icon: Sprout },
  { label: 'Medicinal Flora', href: '/biodiversity/medicinal-plants', icon: Leaf },
  { label: 'Threatened Species', href: '/biodiversity/threatened-species', icon: Shield },
  { label: 'Wildlife Sightings', href: '/biodiversity/wildlife-sightings', icon: Eye },
  { label: 'Risk Dashboard', href: '/biodiversity/risk-dashboard', icon: AlertTriangle },
  { label: 'District Profiles', href: '/biodiversity/overview', icon: Building2 },
];

// ============================================================================
// PAGE COMPONENT
// ============================================================================

export default function BiodiversityDashboardsPage() {
  const router = useRouter();

  const statusBreakdown = computeConservationStatusBreakdown();
  const sightingsVerification = computeSightingsByVerification();
  const sightingsByDistrict = computeSightingsByDistrict();
  const sightingsBySeason = computeSightingsBySeason();
  const speciesByTaxon = computeSpeciesByTaxon();
  const habitats = getHabitatBiodiversity.all();
  const districts = getDistrictBiodiversity.all();
  const riskDashboard = getBiodiversityRiskDashboard();
  const topThreats = getThreatSeverityAnalysis().slice(0, 8);
  const speciesCount = getSpeciesCount();

  const totalSightings = sightingsVerification.verified + sightingsVerification.reviewed + sightingsVerification.community + sightingsVerification.pending;
  const maxTaxonCount = Math.max(...speciesByTaxon.map(t => t.count));
  const maxDistrictSightings = sightingsByDistrict.length > 0 ? sightingsByDistrict[0][1] : 1;
  const maxHabitatSpecies = habitats.length > 0 ? Math.max(...habitats.map(h => h.speciesCount)) : 1;

  const tempTrend = riskDashboard.temporalTrend;
  const maxRiskScore = tempTrend.length > 0 ? Math.max(...tempTrend.map(t => t.riskScore)) : 100;

  const threatSeverityColors: Record<string, string> = {
    critical: 'bg-red-500',
    high: 'bg-orange-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500',
  };

  const threatSeverityTextColors: Record<string, string> = {
    critical: 'text-red-400',
    high: 'text-orange-400',
    medium: 'text-yellow-400',
    low: 'text-green-400',
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero */}
      <div className="relative pt-20 md:pt-40 pb-12 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-sky-900/10 to-slate-950" />
        <div className="absolute inset-0 bg-grid opacity-10" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                Analytics & Trends
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
              Biodiversity Dashboards
            </h1>
            <p className="text-lg text-slate-400 mb-6 leading-relaxed">
              Comprehensive analytics covering {biodiversityMetrics.totalSpecies.toLocaleString()} species across {biodiversityIntelligenceMetrics.totalHabitats} habitat systems and {biodiversityIntelligenceMetrics.totalDistricts} districts — species composition, conservation status distribution,
              sightings trends, district comparisons, habitat diversity, and threat analysis.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                icon={<TrendingUp className="w-4 h-4" />}
                onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}
              >
                View Analytics
              </Button>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                icon={<ArrowRight className="w-4 h-4" />}
                onClick={() => router.push('/biodiversity/risk-dashboard')}
              >
                Risk Dashboard
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 space-y-16">

        {/* ================================================================ */}
        {/* OVERVIEW METRICS ROW */}
        {/* ================================================================ */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <Activity className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Overview Metrics</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Species */}
            <Card className="glass-intense border-white/10 bg-slate-900/60" padding="md">
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Total Species</h3>
              </div>
              <div className="text-4xl font-black text-white mb-4">{biodiversityMetrics.totalSpecies.toLocaleString()}</div>
              <div className="space-y-2">
                {speciesByTaxon.map(taxon => (
                  <div key={taxon.label} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <taxon.icon className="w-3.5 h-3.5 text-slate-500" />
                      <span className="text-slate-400">{taxon.label}</span>
                    </div>
                    <span className="text-white font-mono">{taxon.count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Active Sightings */}
            <Card className="glass-intense border-white/10 bg-slate-900/60" padding="md">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-sky-400" />
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Active Sightings</h3>
              </div>
              <div className="text-4xl font-black text-white mb-4">{totalSightings.toLocaleString()}</div>
              <div className="space-y-2">
                {[
                  { label: 'Verified', count: sightingsVerification.verified, color: 'bg-emerald-500' },
                  { label: 'Reviewed', count: sightingsVerification.reviewed, color: 'bg-blue-500' },
                  { label: 'Community', count: sightingsVerification.community, color: 'bg-violet-500' },
                  { label: 'Pending', count: sightingsVerification.pending, color: 'bg-amber-500' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                    <span className="text-xs text-slate-400 flex-1">{item.label}</span>
                    <span className="text-xs text-white font-mono">{item.count}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Threatened Species */}
            <Card className="glass-intense border-white/10 bg-slate-900/60" padding="md">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-red-400" />
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Threatened Species</h3>
              </div>
              <div className="text-4xl font-black text-white mb-4">{speciesCount.threatened}</div>
              <div className="space-y-2">
                {Object.entries(statusBreakdown).filter(([k]) => ['CR', 'EN', 'VU'].includes(k)).map(([status, count]) => (
                  <div key={status} className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${conservationStatusColors[status]}`} />
                    <span className="text-xs text-slate-400 flex-1">{status}</span>
                    <span className="text-xs text-white font-mono">{count}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-white/5 mt-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">NT (Near Threatened)</span>
                    <span className="text-slate-300 font-mono">{statusBreakdown.NT}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-1">
                    <span className="text-slate-500">LC (Least Concern)</span>
                    <span className="text-slate-300 font-mono">{statusBreakdown.LC}</span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Habitat Coverage */}
            <Card className="glass-intense border-white/10 bg-slate-900/60" padding="md">
              <div className="flex items-center gap-2 mb-4">
                <Mountain className="w-5 h-5 text-amber-400" />
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Habitat Coverage</h3>
              </div>
              <div className="text-4xl font-black text-white mb-1">{biodiversityIntelligenceMetrics.habitatAreaTotal.toLocaleString()}</div>
              <div className="text-xs text-slate-500 mb-4">total km² monitored</div>
              <div className="space-y-2">
                {habitats.map(h => (
                  <div key={h.slug} className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 truncate mr-2">{h.name.replace(' Biodiversity', '')}</span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-white font-mono">{h.areaKm2.toLocaleString()} km²</span>
                      <span className="text-slate-500 w-10 text-right">{h.percentOfKashmir}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 1. SPECIES COMPOSITION */}
        {/* ================================================================ */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Species Composition</h2>
              <p className="text-sm text-slate-400">Species count by taxonomic group</p>
            </div>
          </div>

          <Card className="glass-intense border-white/10 bg-slate-900/60" padding="lg">
            <div className="space-y-4">
              {speciesByTaxon.map((taxon, idx) => {
                const pct = maxTaxonCount > 0 ? (taxon.count / maxTaxonCount) * 100 : 0;
                return (
                  <motion.div
                    key={taxon.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.08 }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-3">
                        <taxon.icon className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-medium text-slate-200">{taxon.label}</span>
                      </div>
                      <span className="text-lg font-bold text-white font-mono">{taxon.count.toLocaleString()}</span>
                    </div>
                    <div className="h-8 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: idx * 0.1 }}
                        className={`h-full bg-gradient-to-r ${taxon.color} rounded-full flex items-center justify-end pr-3`}
                      >
                        <span className="text-xs text-white/80 font-medium">
                          {((taxon.count / biodiversityMetrics.totalSpecies) * 100).toFixed(1)}%
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </section>

        {/* ================================================================ */}
        {/* 2. CONSERVATION STATUS DISTRIBUTION */}
        {/* ================================================================ */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Conservation Status Distribution</h2>
              <p className="text-sm text-slate-400">IUCN Red List categories across all species</p>
            </div>
          </div>

          <Card className="glass-intense border-white/10 bg-slate-900/60" padding="lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Status bars */}
              <div className="space-y-5">
                {Object.entries(statusBreakdown).map(([status, count], idx) => {
                  const maxStatusCount = Math.max(...Object.values(statusBreakdown));
                  const pct = maxStatusCount > 0 ? (count / maxStatusCount) * 100 : 0;
                  return (
                    <motion.div
                      key={status}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${conservationStatusColors[status]}`} />
                          <div>
                            <span className="text-sm font-bold text-white">{status}</span>
                            <span className="text-xs text-slate-500 ml-2">{conservationStatusLabels[status]}</span>
                          </div>
                        </div>
                        <span className="text-lg font-bold text-white font-mono">{count}</span>
                      </div>
                      <div className="h-6 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: idx * 0.1 }}
                          className={`h-full ${conservationStatusColors[status]} rounded-full`}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Threatened summary */}
              <div className="bg-white/5 rounded-xl p-6">
                <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4">Threat Summary</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">CR + EN + VU (Threatened)</span>
                    <span className="text-xl font-bold text-red-400">{speciesCount.threatened}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Endemic Species</span>
                    <span className="text-xl font-bold text-amber-400">{speciesCount.endemic}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Migratory Species</span>
                    <span className="text-xl font-bold text-sky-400">{speciesCount.migratory}</span>
                  </div>
                  <div className="pt-3 border-t border-white/10">
                    <div className="text-xs text-slate-500">
                      {((speciesCount.threatened / speciesCount.total) * 100).toFixed(1)}% of all recorded species are threatened
                    </div>
                  </div>
                </div>

                {/* Mini stacked bar */}
                <div className="mt-6">
                  <div className="text-xs text-slate-500 mb-2">Status composition</div>
                  <div className="h-4 bg-white/5 rounded-full overflow-hidden flex">
                    {Object.entries(statusBreakdown).map(([status, count]) => {
                      const total = Object.values(statusBreakdown).reduce((a, b) => a + b, 0);
                      const pct = total > 0 ? (count / total) * 100 : 0;
                      return (
                        <div
                          key={status}
                          className={`${conservationStatusColors[status]} transition-all`}
                          style={{ width: `${pct}%` }}
                          title={`${status}: ${count}`}
                        />
                      );
                    })}
                  </div>
                  <div className="flex gap-3 mt-2 flex-wrap">
                    {Object.entries(statusBreakdown).map(([status]) => (
                      <div key={status} className="flex items-center gap-1">
                        <div className={`w-2 h-2 rounded-full ${conservationStatusColors[status]}`} />
                        <span className="text-[10px] text-slate-500">{status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* ================================================================ */}
        {/* 3. SIGHTINGS TRENDS */}
        {/* ================================================================ */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Sightings Trends</h2>
              <p className="text-sm text-slate-400">Observation patterns by verification, district, and season</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* By Verification Status */}
            <Card className="glass-intense border-white/10 bg-slate-900/60" padding="md">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Eye className="w-4 h-4" />
                By Verification Status
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Verified', count: sightingsVerification.verified, color: 'bg-emerald-500' },
                  { label: 'Reviewed', count: sightingsVerification.reviewed, color: 'bg-blue-500' },
                  { label: 'Community', count: sightingsVerification.community, color: 'bg-violet-500' },
                  { label: 'Pending', count: sightingsVerification.pending, color: 'bg-amber-500' },
                ].map((item, idx) => {
                  const maxV = Math.max(sightingsVerification.verified, sightingsVerification.reviewed, sightingsVerification.community, sightingsVerification.pending);
                  const pct = maxV > 0 ? (item.count / maxV) * 100 : 0;
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${item.color}`} />
                          <span className="text-xs text-slate-300">{item.label}</span>
                        </div>
                        <span className="text-sm font-bold text-white font-mono">{item.count}</span>
                      </div>
                      <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: idx * 0.05 }}
                          className={`h-full ${item.color} rounded-full`}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>

            {/* By District */}
            <Card className="glass-intense border-white/10 bg-slate-900/60" padding="md">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                By District (Top 8)
              </h3>
              <div className="space-y-3">
                {sightingsByDistrict.map(([district, count], idx) => {
                  const pct = maxDistrictSightings > 0 ? (count / maxDistrictSightings) * 100 : 0;
                  return (
                    <motion.div
                      key={district}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-xs text-slate-300 truncate mr-2">{district}</span>
                        <span className="text-xs text-white font-mono flex-shrink-0">{count}</span>
                      </div>
                      <div className="h-2.5 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: idx * 0.05 }}
                          className="h-full bg-gradient-to-r from-sky-500 to-blue-500 rounded-full"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>

            {/* By Season */}
            <Card className="glass-intense border-white/10 bg-slate-900/60" padding="md">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                By Season
              </h3>
              <div className="space-y-4">
                {Object.entries(sightingsBySeason).map(([season, count], idx) => {
                  const maxS = Math.max(...Object.values(sightingsBySeason));
                  const pct = maxS > 0 ? (count / maxS) * 100 : 0;
                  return (
                    <motion.div
                      key={season}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-300">{seasonLabels[season]}</span>
                        <span className="text-sm font-bold text-white font-mono">{count}</span>
                      </div>
                      <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: idx * 0.05 }}
                          className={`h-full bg-gradient-to-r ${seasonColors[season]} rounded-full`}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </div>
        </section>

        {/* ================================================================ */}
        {/* 4. DISTRICT BIODIVERSITY COMPARISON */}
        {/* ================================================================ */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">District Biodiversity Comparison</h2>
              <p className="text-sm text-slate-400">Top districts by total species richness</p>
            </div>
          </div>

          <Card className="glass-intense border-white/10 bg-slate-900/60" padding="lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {districts
                .sort((a, b) => b.totalSpecies - a.totalSpecies)
                .slice(0, 10)
                .map((district, idx) => {
                  const maxDistrict = districts.reduce((max, d) => Math.max(max, d.totalSpecies), 0);
                  const pct = maxDistrict > 0 ? (district.totalSpecies / maxDistrict) * 100 : 0;
                  const barColor = idx < 3 ? 'from-amber-500 to-orange-500' : idx < 6 ? 'from-violet-500 to-purple-500' : 'from-slate-500 to-slate-600';
                  return (
                    <motion.div
                      key={district.district}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.04 }}
                      className="flex items-center gap-4"
                    >
                      <div className="w-6 text-right">
                        <span className="text-xs font-bold text-slate-500">#{idx + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-slate-200 truncate">{district.district}</span>
                          <div className="flex items-center gap-3 flex-shrink-0 ml-2">
                            <span className="text-xs text-slate-500">{district.threatenedSpecies} threatened</span>
                            <span className="text-sm font-bold text-white font-mono">{district.totalSpecies}</span>
                          </div>
                        </div>
                        <div className="h-4 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.04 }}
                            className={`h-full bg-gradient-to-r ${barColor} rounded-full`}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </Card>
        </section>

        {/* ================================================================ */}
        {/* 5. HABITAT SPECIES DISTRIBUTION */}
        {/* ================================================================ */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <Mountain className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Habitat Species Distribution</h2>
              <p className="text-sm text-slate-400">Species count by habitat system with threatened species overlay</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {habitats.map((habitat, idx) => {
              const pct = maxHabitatSpecies > 0 ? (habitat.speciesCount / maxHabitatSpecies) * 100 : 0;
              const threatPct = habitat.speciesCount > 0 ? (habitat.threatenedSpecies / habitat.speciesCount) * 100 : 0;
              const vulnerabilityColors: Record<string, string> = {
                low: 'from-green-500 to-emerald-500',
                medium: 'from-yellow-500 to-amber-500',
                high: 'from-orange-500 to-red-500',
                critical: 'from-red-600 to-red-800',
              };
              return (
                <motion.div
                  key={habitat.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <Card className="glass-intense border-white/10 bg-slate-900/60 h-full" padding="md">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-sm font-semibold text-white">{habitat.name}</h3>
                      <Badge
                        variant={habitat.vulnerabilityScore === 'critical' ? 'critical' : habitat.vulnerabilityScore === 'high' ? 'danger' : habitat.vulnerabilityScore === 'medium' ? 'warning' : 'success'}
                        size="sm"
                      >
                        {habitat.vulnerabilityScore}
                      </Badge>
                    </div>

                    <div className="text-3xl font-black text-white mb-1">{habitat.speciesCount.toLocaleString()}</div>
                    <div className="text-xs text-slate-500 mb-4">total species</div>

                    {/* Bar */}
                    <div className="h-3 bg-white/5 rounded-full overflow-hidden mb-4">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.08 }}
                        className={`h-full bg-gradient-to-r ${vulnerabilityColors[habitat.vulnerabilityScore]} rounded-full`}
                      />
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-sm font-bold text-white">{habitat.endemicSpecies}</div>
                        <div className="text-[10px] text-slate-500 uppercase">Endemic</div>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-red-400">{habitat.threatenedSpecies}</div>
                        <div className="text-[10px] text-slate-500 uppercase">Threatened</div>
                      </div>
                      <div>
                        <div className="text-sm font-bold text-sky-400">{habitat.migratorySpecies}</div>
                        <div className="text-[10px] text-slate-500 uppercase">Migratory</div>
                      </div>
                    </div>

                    {/* Area */}
                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                      <span className="text-slate-500">{habitat.areaKm2.toLocaleString()} km²</span>
                      <span className="text-slate-500">{habitat.percentOfKashmir}% of Kashmir</span>
                    </div>

                    {/* Taxon breakdown */}
                    <div className="mt-3 space-y-1">
                      {Object.entries(habitat.byTaxonomicGroup).filter(([, v]) => v > 0).map(([taxon, count]) => (
                        <div key={taxon} className="flex items-center justify-between text-xs">
                          <span className="text-slate-500 capitalize">{taxon === 'medicinalPlants' ? 'Medicinal' : taxon}</span>
                          <span className="text-slate-300 font-mono">{count}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ================================================================ */}
        {/* 6. THREAT ANALYSIS */}
        {/* ================================================================ */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Threat Analysis</h2>
              <p className="text-sm text-slate-400">Top threats by severity and species impact</p>
            </div>
          </div>

          <Card className="glass-intense border-white/10 bg-slate-900/60" padding="lg">
            <div className="space-y-3">
              {topThreats.map((threat, idx) => {
                const maxThreatCount = topThreats.length > 0 ? topThreats[0].affectedSpeciesCount : 1;
                const pct = maxThreatCount > 0 ? (threat.affectedSpeciesCount / maxThreatCount) * 100 : 0;
                return (
                  <motion.div
                    key={threat.threatType}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.04 }}
                    className="flex items-center gap-4 p-3 bg-white/5 rounded-lg"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-slate-400">{idx + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-slate-200 truncate mr-2">{threat.threatType}</span>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <span className={`text-xs font-semibold capitalize ${threatSeverityTextColors[threat.severity]}`}>
                            {threat.severity}
                          </span>
                          <span className="text-sm font-bold text-white font-mono">{threat.affectedSpeciesCount}</span>
                        </div>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: idx * 0.04 }}
                          className={`h-full ${threatSeverityColors[threat.severity]} rounded-full`}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </Card>
        </section>

        {/* ================================================================ */}
        {/* 7. TEMPORAL TRENDS */}
        {/* ================================================================ */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Temporal Risk Trends</h2>
              <p className="text-sm text-slate-400">Biodiversity risk score trajectory over time</p>
            </div>
          </div>

          <Card className="glass-intense border-white/10 bg-slate-900/60" padding="lg">
            <div className="flex items-end gap-3 h-48">
              {tempTrend.map((point, idx) => {
                const heightPct = maxRiskScore > 0 ? (point.riskScore / maxRiskScore) * 100 : 0;
                const barColor = point.riskScore >= 50 ? 'from-red-500 to-red-600' : 'from-amber-500 to-yellow-500';
                return (
                  <motion.div
                    key={point.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex-1 flex flex-col items-center justify-end h-full"
                  >
                    <div className="text-xs text-slate-400 mb-2 font-mono">{point.riskScore}</div>
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: `${heightPct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className={`w-full max-w-[60px] bg-gradient-to-t ${barColor} rounded-t-lg min-h-[8px]`}
                    />
                    <div className="text-xs text-slate-500 mt-2">{point.year}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* Priority Actions */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                Priority Conservation Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {riskDashboard.priorityActions.map((action, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                    <span className="text-emerald-400 font-bold text-sm flex-shrink-0">{idx + 1}.</span>
                    <span className="text-xs text-slate-300">{action}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </section>

        {/* ================================================================ */}
        {/* CROSS-LINKS TO SUB-PAGES */}
        {/* ================================================================ */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-500 to-slate-600 flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Explore Biodiversity</h2>
              <p className="text-sm text-slate-400">Navigate to specialized biodiversity pages</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {subPageLinks.map((link, idx) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04 }}
                onClick={() => router.push(link.href)}
                className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-emerald-500/30 transition-all text-left group"
              >
                <link.icon className="w-5 h-5 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-sm font-semibold text-white">{link.label}</div>
                <div className="flex items-center gap-1 mt-2 text-xs text-slate-500 group-hover:text-emerald-400 transition-colors">
                  <span>Explore</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </motion.button>
            ))}
          </div>
        </section>

        {/* ================================================================ */}
        {/* EXPORT / SHARE */}
        {/* ================================================================ */}
        <section>
          <Card className="glass-intense border-white/10 bg-gradient-to-r from-emerald-900/20 to-sky-900/20" padding="lg">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Export & Share Analytics</h3>
                <p className="text-sm text-slate-400">Download biodiversity data reports and share insights</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/5"
                  onClick={() => alert('Export feature coming soon')}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Export PDF Report
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/5"
                  onClick={() => alert('Export feature coming soon')}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Download CSV
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/5"
                  onClick={() => alert('Share feature coming soon')}
                >
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Share Dashboard
                </Button>
              </div>
            </div>
          </Card>
        </section>

      </div>

      <AdvancedFooter />
    </main>
  );
}
