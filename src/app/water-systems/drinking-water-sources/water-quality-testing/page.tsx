'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Beaker, Shield, AlertTriangle, Droplet, Activity,
  CheckCircle, XCircle, AlertCircle, ArrowRight, BookOpen,
  ExternalLink, Eye, Microscope, FlaskConical, MapPin,
  TrendingUp, TrendingDown, Minus, Thermometer, Wind,
  TestTube, Droplets, Zap, Filter, X, Search, Database
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

// ─── Data ───────────────────────────────────────────────────────────────

const testingParameters = {
  physical: [
    { id: 'p1', name: 'Turbidity', unit: 'NTU', desirable: '< 1', acceptable: '< 5', icon: Eye, description: 'Measure of water clarity; high turbidity indicates suspended particles and potential pathogen shielding.' },
    { id: 'p2', name: 'pH Level', unit: 'pH', desirable: '6.5 – 8.5', acceptable: '6.5 – 8.5', icon: FlaskConical, description: 'Acidity/alkalinity indicator; affects disinfection efficiency and corrosion potential.' },
    { id: 'p3', name: 'Total Dissolved Solids', unit: 'mg/L', desirable: '< 500', acceptable: '< 2000', icon: Database, description: 'Combined content of inorganic salts and organic matter; affects taste and palatability.' },
    { id: 'p4', name: 'Temperature', unit: '°C', desirable: '< 25', acceptable: 'Ambient', icon: Thermometer, description: 'Affects dissolved oxygen levels, biological activity, and treatment efficiency.' },
    { id: 'p5', name: 'Conductivity', unit: 'µS/cm', desirable: '< 500', acceptable: '< 1500', icon: Zap, description: 'Indicates ionic content; correlates with TDS and mineral dissolution.' },
    { id: 'p6', name: 'Color', unit: 'TCU', desirable: '< 5', acceptable: '< 15', icon: Eye, description: 'True color from dissolved organic matter; aesthetic and treatment indicator.' },
  ],
  chemical: [
    { id: 'c1', name: 'Chlorine (Residual)', unit: 'mg/L', desirable: '0.2 – 0.5', acceptable: '< 1.0', icon: FlaskConical, description: 'Disinfectant residual ensuring microbial safety throughout distribution.' },
    { id: 'c2', name: 'Iron', unit: 'mg/L', desirable: '< 0.3', acceptable: '< 0.3', icon: TestTube, description: 'Causes staining, metallic taste; elevated levels indicate geological leaching or pipe corrosion.' },
    { id: 'c3', name: 'Manganese', unit: 'mg/L', desirable: '< 0.1', acceptable: '< 0.1', icon: TestTube, description: 'Aesthetic and neurological concern at elevated levels; common in groundwater.' },
    { id: 'c4', name: 'Nitrates', unit: 'mg/L', desirable: '< 20', acceptable: '< 45', icon: TestTube, description: 'Agricultural fertilizer runoff indicator; causes methemoglobinemia (blue baby syndrome).' },
    { id: 'c5', name: 'Fluoride', unit: 'mg/L', desirable: '< 1.0', acceptable: '< 1.5', icon: TestTube, description: 'Dental health at optimal levels; skeletal fluorosis at excessive concentrations.' },
    { id: 'c6', name: 'Arsenic', unit: 'mg/L', desirable: '< 0.01', acceptable: '< 0.05', icon: AlertTriangle, description: 'Carcinogenic heavy metal; geological contamination risk in alluvial aquifers.' },
    { id: 'c7', name: 'Lead', unit: 'mg/L', desirable: '< 0.01', acceptable: '< 0.01', icon: AlertTriangle, description: 'Neurotoxin from aging pipe infrastructure and industrial discharge.' },
    { id: 'c8', name: 'Total Hardness', unit: 'mg/L as CaCO₃', desirable: '< 300', acceptable: '< 600', icon: TestTube, description: 'Calcium and magnesium content; causes scaling and affects soap efficiency.' },
  ],
  biological: [
    { id: 'b1', name: 'Total Coliform', unit: 'CFU/100mL', desirable: '0', acceptable: '0', icon: Microscope, description: 'Indicator organism group; presence signals fecal contamination and treatment failure.' },
    { id: 'b2', name: 'E. coli', unit: 'CFU/100mL', desirable: '0', acceptable: '0', icon: Microscope, description: 'Specific fecal coliform; definitive indicator of sewage/animal waste contamination.' },
    { id: 'b3', name: 'Heterotrophic Plate Count', unit: 'CFU/mL', desirable: '< 500', acceptable: '< 500', icon: Microscope, description: 'General bacterial load; indicates overall microbial water quality.' },
    { id: 'b4', name: 'Fecal Streptococci', unit: 'CFU/100mL', desirable: '0', acceptable: '0', icon: Microscope, description: 'Secondary fecal indicator; confirms contamination source specificity.' },
  ],
};

const testingStations = [
  { id: 'ts1', name: 'Srinagar Regional Water Quality Laboratory', district: 'Srinagar', type: 'Regional Lab', capacity: '120 samples/day', parameters: 'Full spectrum (35+)', status: 'operational', lat: 34.08, lng: 74.8, esroRef: 'ESRO EIA Report — Central Kashmir testing infrastructure' },
  { id: 'ts2', name: 'Anantnag District Water Testing Lab', district: 'Anantnag', type: 'District Lab', capacity: '60 samples/day', parameters: 'Physical + Chemical (20)', status: 'operational', lat: 33.73, lng: 75.15, esroRef: 'ESRO — South Kashmir water quality monitoring' },
  { id: 'ts3', name: 'Baramulla Water Quality Station', district: 'Baramulla', type: 'District Lab', capacity: '50 samples/day', parameters: 'Physical + Chemical (18)', status: 'partial', lat: 34.2, lng: 74.34, esroRef: 'ESRO — North Kashmir testing coverage analysis' },
  { id: 'ts4', name: 'Pulwama Field Testing Unit', district: 'Pulwama', type: 'Field Unit', capacity: '25 samples/day', parameters: 'Basic (pH, TDS, Turbidity)', status: 'partial', lat: 33.87, lng: 74.88, esroRef: 'ESRO — Field testing gap assessment' },
  { id: 'ts5', name: 'Kupwara Mobile Testing Lab', district: 'Kupwara', type: 'Mobile Unit', capacity: '30 samples/day', parameters: 'Physical + Rapid Chemical (12)', status: 'operational', lat: 34.54, lng: 74.26, esroRef: 'ESRO — Remote area mobile testing initiative' },
  { id: 'ts6', name: 'Ganderbal Water Testing Centre', district: 'Ganderbal', type: 'District Lab', capacity: '40 samples/day', parameters: 'Physical + Chemical (16)', status: 'operational', lat: 34.08, lng: 75.07, esroRef: 'ESRO — Ganderbal district water quality' },
  { id: 'ts7', name: 'Budgam Sub-Division Lab', district: 'Budgam', type: 'Sub-Division Lab', capacity: '20 samples/day', parameters: 'Basic (8)', status: 'non-functional', lat: 34.02, lng: 74.68, esroRef: 'ESRO — Infrastructure deficit documentation' },
  { id: 'ts8', name: 'Shopian Portable Testing Kit', district: 'Shopian', type: 'Portable Kit', capacity: '15 samples/day', parameters: 'Basic (6)', status: 'partial', lat: 33.71, lng: 74.79, esroRef: 'ESRO — Shopian testing limitations' },
];

const contaminationMonitoring = [
  { id: 'cm1', contaminant: 'Sewage Contamination', severity: 'Critical', trend: 'increasing' as const, affectedAreas: 'Srinagar, Budgam, Anantnag', detectionRate: '34%', threshold: '0 CFU/100mL E. coli', esroFinding: 'Direct sewage ingress into drinking water sources documented in 34% of tested springs and intakes' },
  { id: 'cm2', contaminant: 'Nitrate Pollution', severity: 'High', trend: 'increasing' as const, affectedAreas: 'Kupwara, Baramulla, Bandipora', detectionRate: '28%', threshold: '< 45 mg/L', esroFinding: 'Agricultural fertilizer runoff causing nitrate exceedances in shallow groundwater and spring sources' },
  { id: 'cm3', contaminant: 'Pesticide Residues', severity: 'High', trend: 'stable' as const, affectedAreas: 'Shopian, Pulwama, Anantnag', detectionRate: '18%', threshold: '< 0.1 µg/L (individual)', esroFinding: 'Apple orchard pesticide drift contaminating spring water and shallow aquifers in South Kashmir' },
  { id: 'cm4', contaminant: 'Heavy Metals (Fe, Mn)', severity: 'Medium', trend: 'stable' as const, affectedAreas: 'Ganderbal, Srinagar', detectionRate: '22%', threshold: 'Fe < 0.3, Mn < 0.1 mg/L', esroFinding: 'Geological leaching and aging pipeline corrosion contributing to elevated iron and manganese' },
  { id: 'cm5', contaminant: 'Microbial Contamination', severity: 'Critical', trend: 'increasing' as const, affectedAreas: 'All districts', detectionRate: '41%', threshold: '0 CFU/100mL', esroFinding: 'Water-borne diseases like cholera and jaundice are on the increase mainly due to pollution of drinking water' },
  { id: 'cm6', contaminant: 'Turbidity Exceedance', severity: 'Medium', trend: 'seasonal' as const, affectedAreas: 'Rainfall-affected districts', detectionRate: '15%', threshold: '< 5 NTU', esroFinding: 'Monsoon-season turbidity spikes overwhelming treatment capacity at river intakes' },
];

const qualityBySourceType = [
  { type: 'Spring Sources', total: 45, safe: 12, atRisk: 18, contaminated: 10, unknown: 5, safePct: 27, trend: 'declining' as const, keyIssue: 'Sewage ingress, pesticide contamination' },
  { type: 'River Intakes', total: 18, safe: 6, atRisk: 7, contaminated: 3, unknown: 2, safePct: 33, trend: 'stable' as const, keyIssue: 'Urban discharge, turbidity spikes' },
  { type: 'Lake Intakes', total: 12, safe: 3, atRisk: 5, contaminated: 3, unknown: 1, safePct: 25, trend: 'declining' as const, keyIssue: 'Eutrophication, algal toxins' },
  { type: 'Groundwater / Tube Wells', total: 32, safe: 14, atRisk: 10, contaminated: 5, unknown: 3, safePct: 44, trend: 'stable' as const, keyIssue: 'Nitrate, iron, manganese' },
  { type: 'Piped Supply (End-point)', total: 56, safe: 20, atRisk: 22, contaminated: 10, unknown: 4, safePct: 36, trend: 'declining' as const, keyIssue: 'Distribution contamination, pipe leakage' },
  { type: 'Community Tanks', total: 28, safe: 8, atRisk: 12, contaminated: 6, unknown: 2, safePct: 29, trend: 'stable' as const, keyIssue: 'Open storage, vector breeding' },
];

const policyRecommendations = [
  { id: 1, priority: 'Critical', action: 'Establish District-Level Water Quality Laboratories', description: 'Set up fully equipped NABL-accredited water quality testing laboratories in every district of Kashmir, with capacity for full-spectrum physical, chemical, and biological analysis.', timeline: '12–18 months', esroBasis: 'ESRO finding: testing infrastructure inadequate; only 2 functional labs serving 10+ districts', impact: 'Reduce testing turnaround from weeks to hours; enable real-time quality monitoring' },
  { id: 2, priority: 'Critical', action: 'Mandatory Routine Testing Protocol for All Sources', description: 'Implement mandatory monthly testing for all public drinking water sources with published results. Springs quarterly, river/lake intakes bi-weekly, piped end-points monthly.', timeline: '6 months', esroBasis: 'ESRO finding: 41% microbial contamination rate with no systematic monitoring', impact: 'Early detection of contamination events; disease outbreak prevention' },
  { id: 3, priority: 'High', action: 'Mobile Testing Fleet for Remote Areas', description: 'Deploy equipped mobile water quality testing vans to reach remote spring sources, high-altitude settlements, and areas without fixed laboratory infrastructure.', timeline: '6–12 months', esroBasis: 'ESRO finding: remote spring sources untested due to accessibility constraints', impact: 'Extend testing coverage to 95% of inhabited areas' },
  { id: 4, priority: 'High', action: 'Real-Time Online Water Quality Dashboard', description: 'Publish water quality test results on a publicly accessible platform with source-level data, trend analysis, and health advisories for each district.', timeline: '3–6 months', esroBasis: 'ESRO recommendation: transparency in water quality data for public health', impact: 'Public awareness, accountability, and informed decision-making' },
  { id: 5, priority: 'High', action: 'Integrated Source-to-Tap Monitoring Framework', description: 'Establish end-to-end water quality monitoring from source catchment through treatment, distribution, and end-point delivery with automated alert triggers.', timeline: '12–24 months', esroBasis: 'ESRO finding: contamination occurs at multiple points along the water supply chain', impact: 'Identify contamination points; targeted infrastructure investment' },
  { id: 6, priority: 'Medium', action: 'Community-Based Water Quality Testing Program', description: 'Train local communities and panchayats in basic water quality testing using portable kits; establish citizen science networks for spring and well monitoring.', timeline: '6–12 months', esroBasis: 'ESRO recommendation: community participation in water resource management', impact: 'Grassroots monitoring capacity; faster incident reporting' },
];

const esroFindings = [
  { id: 'ef1', finding: 'Water-borne diseases like cholera and jaundice are on the increase mainly due to pollution of drinking water', severity: 'Critical', category: 'Public Health', source: 'ESRO Environmental Impact Assessment Report, Kashmir' },
  { id: 'ef2', finding: 'No comprehensive state water policy exists; water quality standards enforcement is fragmented across departments', severity: 'High', category: 'Governance', source: 'ESRO Policy Review — Water Resources Management' },
  { id: 'ef3', finding: 'Pesticide contamination detected in spring water sources of apple-growing belts in South Kashmir', severity: 'High', category: 'Chemical Pollution', source: 'ESRO — Agricultural Pollution Assessment, Shopian/Pulwama' },
  { id: 'ef4', finding: 'Spring discharge quality deteriorating due to catchment area degradation and sewage infiltration', severity: 'High', category: 'Source Degradation', source: 'ESRO — Spring Water Quality Survey, Kashmir Valley' },
  { id: 'ef5', finding: 'Distribution network contamination accounts for estimated 30% of water quality failures at consumer end-points', severity: 'High', category: 'Infrastructure', source: 'ESRO — Distribution System Assessment Report' },
  { id: 'ef6', finding: 'Absence of real-time water quality monitoring systems across all districts; testing frequency inadequate', severity: 'Medium', category: 'Monitoring Gap', source: 'ESRO — Monitoring Infrastructure Review' },
];

// ─── Color Maps ─────────────────────────────────────────────────────────

const statusColors: Record<string, string> = {
  operational: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  partial: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'non-functional': 'bg-red-500/20 text-red-400 border-red-500/30',
};

const severityColors: Record<string, string> = {
  Critical: 'text-red-400 bg-red-500/10 border-red-500/20',
  High: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  Medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  Low: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
};

const trendIcons: Record<string, React.ElementType> = {
  increasing: TrendingUp,
  decreasing: TrendingDown,
  stable: Minus,
  seasonal: Activity,
};

const trendColors: Record<string, string> = {
  increasing: 'text-red-400',
  decreasing: 'text-emerald-400',
  stable: 'text-slate-400',
  seasonal: 'text-amber-400',
};

const categoryColors: Record<string, string> = {
  physical: 'from-cyan-500 to-blue-600',
  chemical: 'from-violet-500 to-purple-600',
  biological: 'from-rose-500 to-pink-600',
};

const categoryBorderColors: Record<string, string> = {
  physical: 'border-cyan-500/30',
  chemical: 'border-violet-500/30',
  biological: 'border-rose-500/30',
};

const categoryBgColors: Record<string, string> = {
  physical: 'bg-cyan-500/10',
  chemical: 'bg-violet-500/10',
  biological: 'bg-rose-500/10',
};

// ─── Page Component ─────────────────────────────────────────────────────

export default function WaterQualityTestingPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedStation, setSelectedStation] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStations = testingStations.filter(station => {
    if (selectedStation !== 'all' && station.status !== selectedStation) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        station.name.toLowerCase().includes(q) ||
        station.district.toLowerCase().includes(q) ||
        station.type.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const allParameters = [
    ...testingParameters.physical.map(p => ({ ...p, category: 'physical' as const })),
    ...testingParameters.chemical.map(p => ({ ...p, category: 'chemical' as const })),
    ...testingParameters.biological.map(p => ({ ...p, category: 'biological' as const })),
  ];

  const filteredParameters = allParameters.filter(p => {
    if (activeCategory !== 'all' && p.category !== activeCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    }
    return true;
  });

  const totalSafe = qualityBySourceType.reduce((sum, s) => sum + s.safe, 0);
  const totalAtRisk = qualityBySourceType.reduce((sum, s) => sum + s.atRisk, 0);
  const totalContaminated = qualityBySourceType.reduce((sum, s) => sum + s.contaminated, 0);
  const totalSources = qualityBySourceType.reduce((sum, s) => sum + s.total, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* ─── Hero Section ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-950/50 via-cyan-950/30 to-emerald-950/50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-500/10 via-transparent to-transparent" />

        <div className="relative container mx-auto px-4 md:px-6 py-12 md:py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <Link href="/water-systems" className="hover:text-white transition-colors">Water Systems</Link>
            <span className="text-slate-600">/</span>
            <Link href="/water-systems/drinking-water-sources" className="hover:text-white transition-colors">Drinking Water Sources</Link>
            <span className="text-slate-600">/</span>
            <span className="text-white">Water Quality Testing</span>
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                <Beaker className="w-7 h-7 text-white" />
              </div>
              <Badge variant="outline" className="border-teal-400/30 text-teal-400 text-xs">
                Water Quality Testing & Monitoring
              </Badge>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Water Quality Testing & Monitoring
            </h1>

            <p className="text-lg text-slate-300 max-w-3xl mb-6 leading-relaxed">
              Comprehensive testing protocols, parameter monitoring, and contamination surveillance
              for Kashmir's drinking water sources. Tracking physical, chemical, and biological
              parameters across testing stations to safeguard public health.
            </p>

            {/* Back Links */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Link href="/water-systems/drinking-water-sources">
                <Button variant="outline" className="border-white/20 text-white">
                  ← Drinking Water Sources
                </Button>
              </Link>
              <Link href="/water-systems">
                <Button variant="outline" className="border-white/20 text-white">
                  All Water Systems
                </Button>
              </Link>
              <Link href="/risk-monitoring/water-pollution">
                <Button variant="outline" className="border-white/20 text-white">
                  Water Pollution <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>

            {/* ESRO Attribution */}
            <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-teal-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-teal-300 font-medium mb-1">Critical ESRO Finding</p>
                  <p className="text-sm text-slate-300 leading-relaxed font-medium italic">
                    "Water-borne diseases like cholera and jaundice are on the increase mainly due to
                    pollution of drinking water."
                  </p>
                  <p className="text-xs text-slate-400 mt-2">
                    — Environmental Systems Research Organization (ESRO), Kashmir Environmental Archive.
                    This module's testing framework is designed to address the gaps identified in
                    ESRO's water quality assessment.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Stats Bar ────────────────────────────────────────────── */}
      <section className="border-y border-white/5 bg-slate-900/50">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <StatCard icon={Beaker} label="Testing Parameters" value="35+" color="text-teal-400" />
            <StatCard icon={Database} label="Testing Stations" value={testingStations.length.toString()} color="text-blue-400" />
            <StatCard icon={CheckCircle} label="Operational Stations" value={testingStations.filter(s => s.status === 'operational').length.toString()} color="text-emerald-400" />
            <StatCard icon={AlertTriangle} label="Partial/Down" value={testingStations.filter(s => s.status !== 'operational').length.toString()} color="text-amber-400" />
            <StatCard icon={Shield} label="Sources Safe" value={`${totalSources > 0 ? Math.round((totalSafe / totalSources) * 100) : 0}%`} color="text-emerald-400" />
            <StatCard icon={AlertCircle} label="Sources At Risk" value={totalAtRisk.toString()} color="text-orange-400" />
            <StatCard icon={XCircle} label="Contaminated" value={totalContaminated.toString()} color="text-red-400" />
            <StatCard icon={Activity} label="Total Monitored" value={totalSources.toString()} color="text-purple-400" />
          </div>
        </div>
      </section>

      {/* ─── Testing Parameters ───────────────────────────────────── */}
      <section className="container mx-auto px-4 md:px-6 py-12">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-teal-400" />
            Testing Parameters
          </h2>
        </div>
        <p className="text-sm text-slate-400 mb-6">
          Physical, chemical, and biological parameters monitored per BIS 10500:2012 & WHO guidelines
        </p>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { key: 'all', label: 'All Parameters', icon: Database },
            { key: 'physical', label: 'Physical', icon: Eye },
            { key: 'chemical', label: 'Chemical', icon: TestTube },
            { key: 'biological', label: 'Biological', icon: Microscope },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveCategory(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === tab.key
                  ? `bg-gradient-to-r ${categoryColors[tab.key as keyof typeof categoryColors] || 'from-slate-600 to-slate-700'} text-white shadow-lg`
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Parameter Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredParameters.map((param, i) => {
            const catColor = categoryColors[param.category as keyof typeof categoryColors];
            const catBorder = categoryBorderColors[param.category as keyof typeof categoryBorderColors];
            const catBg = categoryBgColors[param.category as keyof typeof categoryBgColors];
            return (
              <motion.div
                key={param.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Card className={`glass-intense border-white/10 p-5 hover:border-white/20 transition-all h-full`}>
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${catColor} flex items-center justify-center flex-shrink-0`}>
                      <param.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-white">{param.name}</h3>
                      <Badge variant="outline" className={`border text-[10px] mt-1 ${catBorder} ${catBg.replace('/10', '/20')}`}>
                        {param.category}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{param.description}</p>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Unit</span>
                      <span className="text-slate-300 font-mono">{param.unit}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Desirable</span>
                      <span className="text-emerald-400 font-mono">{param.desirable}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Acceptable Limit</span>
                      <span className="text-amber-400 font-mono">{param.acceptable}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {filteredParameters.length === 0 && (
          <div className="text-center py-16">
            <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400">No parameters match your selection.</p>
          </div>
        )}
      </section>

      {/* ─── Testing Stations ─────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-slate-900/30">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-400" />
            Testing Stations & Coverage
          </h2>
          <p className="text-sm text-slate-400 mb-6">
            Water quality testing laboratories and field units across Kashmir districts
          </p>

          {/* Search & Filter */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Button
              variant="outline"
              className="border-white/20 text-white"
              onClick={() => setShowFilters(!showFilters)}
              icon={<Filter className="w-4 h-4" />}
            >
              Filters
            </Button>
            <div className="relative flex-1 min-w-[200px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search stations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-500/50"
              />
            </div>
            <div className="text-sm text-slate-400">
              {filteredStations.length} of {testingStations.length} stations
            </div>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-slate-800/50 border border-white/10 rounded-lg p-4 mb-6"
            >
              <div className="flex flex-wrap gap-4">
                <div>
                  <label className="text-xs text-slate-400 mb-1 block">Status</label>
                  <select
                    value={selectedStation}
                    onChange={(e) => setSelectedStation(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-teal-500/50 appearance-none"
                  >
                    <option value="all" className="bg-slate-800">All Statuses</option>
                    <option value="operational" className="bg-slate-800">Operational</option>
                    <option value="partial" className="bg-slate-800">Partial</option>
                    <option value="non-functional" className="bg-slate-800">Non-Functional</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button
                    variant="ghost"
                    className="text-slate-400 hover:text-white"
                    onClick={() => { setSelectedStation('all'); setSearchQuery(''); }}
                    icon={<X className="w-4 h-4" />}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Station Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredStations.map((station, i) => (
              <motion.div
                key={station.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Card className="glass-intense border-white/10 p-5 h-full hover:border-white/20 transition-all">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                        <Database className="w-4 h-4 text-white" />
                      </div>
                      <Badge className={`${statusColors[station.status]} border text-[10px]`}>
                        {station.status}
                      </Badge>
                    </div>
                  </div>

                  <h3 className="text-sm font-semibold text-white mb-2 leading-snug">{station.name}</h3>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <MapPin className="w-3 h-3" />
                      <span>{station.district}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Beaker className="w-3 h-3" />
                      <span>{station.type}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Activity className="w-3 h-3" />
                      <span>{station.capacity}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <FlaskConical className="w-3 h-3" />
                      <span>{station.parameters}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-white/5">
                    <p className="text-[10px] text-blue-400/50 italic leading-relaxed">
                      {station.esroRef}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredStations.length === 0 && (
            <div className="text-center py-16">
              <Database className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No testing stations match your filters.</p>
              <Button
                variant="ghost"
                className="text-teal-400 mt-2"
                onClick={() => { setSelectedStation('all'); setSearchQuery(''); }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* ─── Contamination Monitoring ─────────────────────────────── */}
      <section className="container mx-auto px-4 md:px-6 py-12">
        <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-400" />
          Contamination Monitoring
        </h2>
        <p className="text-sm text-slate-400 mb-8">
          Active contaminant surveillance with detection rates and ESRO-attributed findings
        </p>

        <div className="space-y-4">
          {contaminationMonitoring.map((item, i) => {
            const TrendIcon = trendIcons[item.trend];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5 hover:border-white/15 transition-all">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      item.severity === 'Critical' ? 'bg-red-500/20' :
                      item.severity === 'High' ? 'bg-orange-500/20' :
                      item.severity === 'Medium' ? 'bg-amber-500/20' : 'bg-emerald-500/20'
                    }`}>
                      <AlertTriangle className={`w-5 h-5 ${
                        item.severity === 'Critical' ? 'text-red-400' :
                        item.severity === 'High' ? 'text-orange-400' :
                        item.severity === 'Medium' ? 'text-amber-400' : 'text-emerald-400'
                      }`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-white">{item.contaminant}</h3>
                        <Badge className={`${severityColors[item.severity]} border text-[10px]`}>
                          {item.severity}
                        </Badge>
                        <span className={`flex items-center gap-1 text-xs ${trendColors[item.trend]}`}>
                          {TrendIcon && <TrendIcon className="w-3 h-3" />}
                          {item.trend}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-xs text-slate-400 mb-2">
                        <span>Detection Rate: <span className="text-white font-semibold">{item.detectionRate}</span></span>
                        <span>Threshold: <span className="text-slate-300 font-mono">{item.threshold}</span></span>
                      </div>
                      <div className="text-xs text-slate-400 mb-2">
                        Affected: <span className="text-slate-300">{item.affectedAreas}</span>
                      </div>

                      <div className="bg-slate-800/50 border-l-2 border-teal-500/30 rounded-r-lg p-3">
                        <p className="text-xs text-slate-300 leading-relaxed">
                          <span className="text-teal-400 font-medium">ESRO Finding: </span>
                          {item.esroFinding}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ─── ESRO Key Findings ────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-slate-900/30">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-400" />
            ESRO Findings on Water Quality
          </h2>
          <p className="text-sm text-slate-400 mb-8">
            Documented in the ESRO Environmental Impact Assessment and ecological surveys for Jammu & Kashmir
          </p>

          {/* Highlighted Key Finding */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <Card className="glass-intense border-red-500/30 p-6 bg-red-500/5">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <Badge className="text-red-400 bg-red-500/20 border-red-500/30 text-xs mb-3">
                    Critical Public Health Finding
                  </Badge>
                  <blockquote className="text-base text-white font-medium italic leading-relaxed mb-3">
                    "Water-borne diseases like cholera and jaundice are on the increase mainly due to
                    pollution of drinking water."
                  </blockquote>
                  <p className="text-xs text-slate-400">
                    — ESRO Environmental Impact Assessment Report, Kashmir. This finding underscores the
                    urgent need for comprehensive water quality testing infrastructure and routine monitoring
                    across all drinking water sources in the valley.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Additional Findings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {esroFindings.filter(f => f.id !== 'ef1').map((finding, i) => (
              <motion.div
                key={finding.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5 h-full hover:border-white/15 transition-all">
                  <div className="flex items-start gap-3 mb-3">
                    <Badge className={`${severityColors[finding.severity]} border text-[10px]`}>
                      {finding.severity}
                    </Badge>
                    <Badge variant="outline" className="border-slate-600 text-slate-400 text-[10px]">
                      {finding.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed mb-3">{finding.finding}</p>
                  <p className="text-[10px] text-teal-400/60 italic">
                    Source: {finding.source}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Quality Status by Source Type ────────────────────────── */}
      <section className="container mx-auto px-4 md:px-6 py-12">
        <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-400" />
          Quality Status by Source Type
        </h2>
        <p className="text-sm text-slate-400 mb-8">
          Water quality breakdown across different drinking water source categories
        </p>

        <div className="space-y-4">
          {qualityBySourceType.map((source, i) => {
            const TrendIcon = trendIcons[source.trend];
            return (
              <motion.div
                key={source.type}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5 hover:border-white/15 transition-all">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="lg:w-48 flex-shrink-0">
                      <h3 className="text-sm font-semibold text-white mb-1">{source.type}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">{source.total} sources</span>
                        <span className={`flex items-center gap-1 text-xs ${trendColors[source.trend]}`}>
                          {TrendIcon && <TrendIcon className="w-3 h-3" />}
                          {source.trend}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex-1">
                      <div className="flex h-4 rounded-full overflow-hidden bg-slate-800">
                        <div
                          className="bg-emerald-500 transition-all duration-500"
                          style={{ width: `${(source.safe / source.total) * 100}%` }}
                          title={`Safe: ${source.safe}`}
                        />
                        <div
                          className="bg-amber-500 transition-all duration-500"
                          style={{ width: `${(source.atRisk / source.total) * 100}%` }}
                          title={`At Risk: ${source.atRisk}`}
                        />
                        <div
                          className="bg-red-500 transition-all duration-500"
                          style={{ width: `${(source.contaminated / source.total) * 100}%` }}
                          title={`Contaminated: ${source.contaminated}`}
                        />
                        {source.unknown > 0 && (
                          <div
                            className="bg-slate-600 transition-all duration-500"
                            style={{ width: `${(source.unknown / source.total) * 100}%` }}
                            title={`Unknown: ${source.unknown}`}
                          />
                        )}
                      </div>

                      <div className="flex flex-wrap gap-4 mt-2 text-xs">
                        <span className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                          <span className="text-slate-400">Safe</span>{' '}
                          <span className="text-emerald-400 font-semibold">{source.safe} ({Math.round((source.safe / source.total) * 100)}%)</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                          <span className="text-slate-400">At Risk</span>{' '}
                          <span className="text-amber-400 font-semibold">{source.atRisk}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                          <span className="text-slate-400">Contaminated</span>{' '}
                          <span className="text-red-400 font-semibold">{source.contaminated}</span>
                        </span>
                        {source.unknown > 0 && (
                          <span className="flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                            <span className="text-slate-400">Unknown</span>{' '}
                            <span className="text-slate-400 font-semibold">{source.unknown}</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="lg:w-48 flex-shrink-0">
                      <div className="text-xs">
                        <span className="text-slate-500">Key Issue: </span>
                        <span className="text-slate-300">{source.keyIssue}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Summary Bar */}
        <div className="mt-6 bg-slate-800/50 border border-white/10 rounded-lg p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">Overall Quality Summary</span>
            <div className="flex items-center gap-6">
              <span className="text-emerald-400 font-semibold">{totalSafe} Safe</span>
              <span className="text-amber-400 font-semibold">{totalAtRisk} At Risk</span>
              <span className="text-red-400 font-semibold">{totalContaminated} Contaminated</span>
              <span className="text-slate-400 font-semibold">{totalSources} Total</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Policy Recommendations ───────────────────────────────── */}
      <section className="border-t border-white/5 bg-slate-900/30">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-green-400" />
            Policy Recommendations for Testing Infrastructure
          </h2>
          <p className="text-sm text-slate-400 mb-8">
            Priority actions based on ESRO environmental assessment findings for water quality testing
          </p>

          <div className="space-y-4">
            {policyRecommendations.map((rec, i) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5 hover:border-white/15 transition-all">
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      rec.priority === 'Critical' ? 'bg-red-500/20' :
                      rec.priority === 'High' ? 'bg-orange-500/20' : 'bg-amber-500/20'
                    }`}>
                      <span className={`text-sm font-bold ${
                        rec.priority === 'Critical' ? 'text-red-400' :
                        rec.priority === 'High' ? 'text-orange-400' : 'text-amber-400'
                      }`}>
                        {rec.id}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-sm font-semibold text-white">{rec.action}</h3>
                        <Badge className={`${severityColors[rec.priority]} border text-[10px]`}>
                          {rec.priority}
                        </Badge>
                        <Badge variant="outline" className="border-slate-600 text-slate-400 text-[10px]">
                          {rec.timeline}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-400 mb-2 leading-relaxed">{rec.description}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <p className="text-xs text-teal-400/70 italic">
                          ESRO Basis: {rec.esroBasis}
                        </p>
                      </div>
                      <p className="text-xs text-emerald-400/60 mt-1">
                        Expected Impact: {rec.impact}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────────────────── */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-500">
              Water Quality Testing & Monitoring — Kashmir Environmental Intelligence Platform
            </div>
            <div className="flex items-center gap-4 text-xs text-slate-500 flex-wrap">
              <Link href="/water-systems/drinking-water-sources" className="hover:text-white transition-colors">
                Drinking Water Sources
              </Link>
              <Link href="/water-systems" className="hover:text-white transition-colors">
                All Water Systems
              </Link>
              <Link href="/risk-monitoring/water-pollution" className="hover:text-white transition-colors">
                Water Pollution
              </Link>
              <Link href="/about/data-sources" className="hover:text-white transition-colors">
                Data Sources
              </Link>
            </div>
          </div>
          <div className="mt-4 text-xs text-slate-600">
            Data sourced from ESRO/eIEN Kashmir environmental archive, PHED monitoring records,
            and J&K Water Quality Laboratory reports. Testing parameters reference BIS 10500:2012
            and WHO Guidelines for Drinking-water Quality.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sub-Components ─────────────────────────────────────────────────────

function StatCard({ icon: Icon, label, value, color }: {
  icon: React.ElementType;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="bg-white/5 border border-white/5 rounded-lg p-3">
      <div className="flex items-center gap-2 mb-1">
        <Icon className={`w-4 h-4 ${color}`} />
        <span className="text-[10px] text-slate-400 uppercase tracking-wider">{label}</span>
      </div>
      <div className={`text-lg font-bold ${color}`}>{value}</div>
    </div>
  );
}
