'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import {
  Droplet, Shield, AlertTriangle, TrendingUp, Map,
  Users, Activity, Eye, FileText, ArrowRight, Search,
  Filter, X, CheckCircle, AlertCircle, XCircle, Clock,
  Beaker, Droplets, CloudRain, Database, ExternalLink,
  Building2, BookOpen, Wrench, AlertOctagon
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  drinkingWaterSources, drinkingWaterStats,
  waterQualityChallenges, infrastructureData,
  policyRecommendations,
  type DrinkingWaterSource, type DrinkingWaterSourceType
} from '@/data/drinking-water-sources';

const statusColors: Record<string, string> = {
  operational: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  partial: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'non-functional': 'bg-red-500/20 text-red-400 border-red-500/30',
  'under-upgrade': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

const qualityColors: Record<string, string> = {
  safe: 'bg-emerald-500/20 text-emerald-400',
  'at-risk': 'bg-amber-500/20 text-amber-400',
  contaminated: 'bg-red-500/20 text-red-400',
  unknown: 'bg-slate-500/20 text-slate-400',
};

const severityColors: Record<string, string> = {
  Critical: 'text-red-400 bg-red-500/10 border-red-500/20',
  High: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
  Medium: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
  Low: 'text-green-400 bg-green-500/10 border-green-500/20',
};

const typeIcons: Record<string, React.ElementType> = {
  spring: Droplet,
  'river-intake': Map,
  'lake-intake': Droplet,
  groundwater: Database,
  'piped-supply': Droplets,
  'community-tank': Droplet,
  'tube-well': Database,
  'rainwater-harvest': CloudRain,
};

const subPages = [
  {
    id: 'water-treatment',
    title: 'Water Treatment Plants',
    description: 'Treatment infrastructure, processes, and capacity across Kashmir',
    icon: Beaker,
    color: 'from-cyan-500 to-blue-600',
    route: '/water-systems/drinking-water-sources/water-treatment',
  },
  {
    id: 'distribution-network',
    title: 'Distribution Network',
    description: 'Pipeline infrastructure, storage facilities, and non-revenue water analysis',
    icon: Droplets,
    color: 'from-indigo-500 to-purple-600',
    route: '/water-systems/drinking-water-sources/distribution-network',
  },
  {
    id: 'water-quality-testing',
    title: 'Water Quality Testing',
    description: 'Testing protocols, parameters, and contamination monitoring',
    icon: Beaker,
    color: 'from-teal-500 to-emerald-600',
    route: '/water-systems/drinking-water-sources/water-quality-testing',
  },
  {
    id: 'rainwater-harvesting',
    title: 'Rainwater Harvesting',
    description: 'Rainwater collection, recharge structures, and groundwater augmentation',
    icon: CloudRain,
    color: 'from-sky-500 to-blue-600',
    route: '/water-systems/drinking-water-sources/rainwater-harvesting',
  },
  {
    id: 'groundwater',
    title: 'Groundwater Intelligence',
    description: 'Aquifer mapping, water table monitoring, and tube well networks',
    icon: Database,
    color: 'from-amber-500 to-orange-600',
    route: '/water-systems/drinking-water-sources/groundwater',
  },
  {
    id: 'piped-water-supply',
    title: 'Piped Water Supply',
    description: 'PHED network coverage, supply monitoring, and service levels',
    icon: Droplets,
    color: 'from-green-500 to-emerald-600',
    route: '/water-systems/drinking-water-sources/piped-water-supply',
  },
];

export default function DrinkingWaterSourcesPage() {
  const router = useRouter();
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedQuality, setSelectedQuality] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const districts = Array.from(new Set(drinkingWaterSources.map(s => s.district)));
  const types = Array.from(new Set(drinkingWaterSources.map(s => s.type)));

  const filteredSources = drinkingWaterSources.filter(source => {
    if (selectedDistrict !== 'all' && source.district !== selectedDistrict) return false;
    if (selectedStatus !== 'all' && source.status !== selectedStatus) return false;
    if (selectedQuality !== 'all' && source.waterQualityStatus !== selectedQuality) return false;
    if (selectedType !== 'all' && source.type !== selectedType) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        source.name.toLowerCase().includes(q) ||
        source.description.toLowerCase().includes(q) ||
        source.district.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-48 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-cyan-950/30 to-emerald-950/50" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full" />
              <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                Drinking Water Intelligence
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Drinking Water Sources of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Kashmir</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Comprehensive monitoring and intelligence framework for Kashmir's drinking water sources —
              springs, river intakes, groundwater schemes, and piped supply networks. Sourced from the
              ESRO/eIEN Kashmir environmental archive and augmented with real-time monitoring data.
            </p>

            {/* ESRO Attribution */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-300 font-medium mb-1">Data Source: ESRO/eIEN Kashmir Archive</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    This module is built from the Environmental Systems Research Organization (ESRO) Kashmir archive,
                    including the Environmental Impact Assessment (EIA) Report and comprehensive ecological surveys.
                    Key findings on drinking water challenges — including sewage contamination, spring depletion,
                    pesticide pollution, and the absence of a state water policy — are directly sourced from
                    ESRO's documented evidence.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/water-systems">
                <Button variant="outline" className="border-white/20 text-white">
                  ← All Water Systems
                </Button>
              </Link>
              <Link href="/water-systems/water-quality">
                <Button variant="outline" className="border-white/20 text-white">
                  Water Quality <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-white/5 bg-slate-900/50">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            <StatCard icon={Droplet} label="Total Sources" value={drinkingWaterStats.totalSources.toString()} color="text-blue-400" />
            <StatCard icon={CheckCircle} label="Operational" value={drinkingWaterStats.operational.toString()} color="text-emerald-400" />
            <StatCard icon={Clock} label="Partial" value={drinkingWaterStats.partial.toString()} color="text-amber-400" />
            <StatCard icon={XCircle} label="Non-Functional" value={drinkingWaterStats.nonFunctional.toString()} color="text-red-400" />
            <StatCard icon={Wrench} label="Under Upgrade" value={drinkingWaterStats.underUpgrade.toString()} color="text-blue-400" />
            <StatCard icon={Shield} label="Safe Quality" value={drinkingWaterStats.safe.toString()} color="text-emerald-400" />
            <StatCard icon={AlertTriangle} label="At Risk" value={drinkingWaterStats.atRisk.toString()} color="text-orange-400" />
            <StatCard icon={Users} label="Population Served" value={formatPopulation(drinkingWaterStats.totalPopulationServed)} color="text-purple-400" />
          </div>
        </div>
      </section>

      {/* Sub-Pages Navigation */}
      <section className="container mx-auto px-4 md:px-6 py-10">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Database className="w-5 h-5 text-blue-400" />
          Drinking Water Sub-Modules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {subPages.map((page, i) => (
            <motion.div
              key={page.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={page.route} className="block h-full">
                <Card className="glass-intense border-white/10 p-5 h-full hover:border-white/20 transition-all group cursor-pointer">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${page.color} flex items-center justify-center flex-shrink-0`}>
                      <page.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">{page.title}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{page.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-blue-400 group-hover:text-blue-300 transition-colors">
                    Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 md:px-6 pb-6">
        <div className="flex flex-wrap items-center gap-3 mb-4">
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
              placeholder="Search drinking water sources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50"
            />
          </div>

          <div className="text-sm text-slate-400">
            {filteredSources.length} of {drinkingWaterSources.length} sources
          </div>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-slate-800/50 border border-white/10 rounded-lg p-4 mb-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FilterSelect
                label="District"
                value={selectedDistrict}
                onChange={setSelectedDistrict}
                options={[{ value: 'all', label: 'All Districts' }, ...districts.map(d => ({ value: d, label: d }))]}
              />
              <FilterSelect
                label="Status"
                value={selectedStatus}
                onChange={setSelectedStatus}
                options={[
                  { value: 'all', label: 'All Statuses' },
                  { value: 'operational', label: 'Operational' },
                  { value: 'partial', label: 'Partial' },
                  { value: 'non-functional', label: 'Non-Functional' },
                  { value: 'under-upgrade', label: 'Under Upgrade' },
                ]}
              />
              <FilterSelect
                label="Water Quality"
                value={selectedQuality}
                onChange={setSelectedQuality}
                options={[
                  { value: 'all', label: 'All' },
                  { value: 'safe', label: 'Safe' },
                  { value: 'at-risk', label: 'At Risk' },
                  { value: 'contaminated', label: 'Contaminated' },
                  { value: 'unknown', label: 'Unknown' },
                ]}
              />
              <FilterSelect
                label="Source Type"
                value={selectedType}
                onChange={setSelectedType}
                options={[{ value: 'all', label: 'All Types' }, ...types.map(t => ({ value: t, label: t.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) }))]}
              />
            </div>
            <div className="mt-3 flex justify-end">
              <Button
                variant="ghost"
                className="text-slate-400 hover:text-white"
                onClick={() => {
                  setSelectedDistrict('all');
                  setSelectedStatus('all');
                  setSelectedQuality('all');
                  setSelectedType('all');
                  setSearchQuery('');
                }}
                icon={<X className="w-4 h-4" />}
              >
                Clear Filters
              </Button>
            </div>
          </motion.div>
        )}
      </section>

      {/* Source Cards */}
      <section className="container mx-auto px-4 md:px-6 pb-10">
        <div className="space-y-4">
          {filteredSources.map((source, i) => (
            <SourceCard key={source.id} source={source} index={i} />
          ))}
          {filteredSources.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No drinking water sources match your filters.</p>
              <Button
                variant="ghost"
                className="text-blue-400 mt-2"
                onClick={() => {
                  setSelectedDistrict('all');
                  setSelectedStatus('all');
                  setSelectedQuality('all');
                  setSelectedType('all');
                  setSearchQuery('');
                }}
              >
                Clear all filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Water Quality Challenges */}
      <section className="border-t border-white/5 bg-slate-900/30">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            Critical Water Quality Challenges
          </h2>
          <p className="text-sm text-slate-400 mb-8">
            Documented in the ESRO Environmental Impact Assessment Report for Jammu & Kashmir
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {waterQualityChallenges.map((challenge, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5 h-full">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-sm font-semibold text-white">{challenge.title}</h3>
                    <Badge className={`${severityColors[challenge.severity]} border text-xs`}>
                      {challenge.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400 mb-3 leading-relaxed">{challenge.description}</p>
                  <div className="space-y-2">
                    <div className="text-xs">
                      <span className="text-slate-500">Affected: </span>
                      <span className="text-slate-300">{challenge.affectedSources}</span>
                    </div>
                    <div className="text-xs text-blue-400/70 italic border-l-2 border-blue-500/20 pl-2">
                      Source: {challenge.esroSource}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure Overview */}
      <section className="container mx-auto px-4 md:px-6 py-12">
        <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <Wrench className="w-5 h-5 text-amber-400" />
          Drinking Water Infrastructure
        </h2>
        <p className="text-sm text-slate-400 mb-8">
          Current state of water treatment, distribution, and storage infrastructure
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfrastructureCard
            title="Water Treatment Plants"
            icon={Beaker}
            data={[
              { label: 'Total Plants', value: infrastructureData.treatmentPlants.total.toString() },
              { label: 'Functional', value: infrastructureData.treatmentPlants.functional.toString(), color: 'text-emerald-400' },
              { label: 'Need Upgrade', value: infrastructureData.treatmentPlants.needsUpgrade.toString(), color: 'text-amber-400' },
              { label: 'Non-Functional', value: infrastructureData.treatmentPlants.nonFunctional.toString(), color: 'text-red-400' },
            ]}
            description={infrastructureData.treatmentPlants.description}
          />
          <InfrastructureCard
            title="Distribution Network"
            icon={Droplets}
            data={[
              { label: 'Total Pipeline', value: `${infrastructureData.distributionNetwork.totalPipelineKm} km` },
              { label: 'Aging Pipeline', value: `${infrastructureData.distributionNetwork.agingPipelineKm} km`, color: 'text-amber-400' },
              { label: 'Leakage Rate', value: infrastructureData.distributionNetwork.leakageRate, color: 'text-red-400' },
            ]}
            description={infrastructureData.distributionNetwork.description}
          />
          <InfrastructureCard
            title="Storage Facilities"
            icon={Database}
            data={[
              { label: 'Total ESRs', value: infrastructureData.storageFacilities.totalESRs.toString() },
              { label: 'Total Capacity', value: `${infrastructureData.storageFacilities.totalCapacityMld} MLD` },
            ]}
            description={infrastructureData.storageFacilities.description}
          />
        </div>
      </section>

      {/* Policy Recommendations */}
      <section className="border-t border-white/5 bg-slate-900/30">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <FileText className="w-5 h-5 text-green-400" />
            Policy Recommendations
          </h2>
          <p className="text-sm text-slate-400 mb-8">
            Priority actions based on ESRO environmental assessment findings
          </p>

          <div className="space-y-4">
            {policyRecommendations.map((rec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      rec.priority === 'Critical' ? 'bg-red-500/20' :
                      rec.priority === 'High' ? 'bg-orange-500/20' : 'bg-amber-500/20'
                    }`}>
                      <span className={`text-sm font-bold ${
                        rec.priority === 'Critical' ? 'text-red-400' :
                        rec.priority === 'High' ? 'text-orange-400' : 'text-amber-400'
                      }`}>
                        {i + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-white">{rec.action}</h3>
                        <Badge className={`${severityColors[rec.priority]} border text-[10px]`}>
                          {rec.priority}
                        </Badge>
                        <Badge variant="outline" className="border-slate-600 text-slate-400 text-[10px]">
                          {rec.timeline}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-400 mb-2 leading-relaxed">{rec.description}</p>
                      <p className="text-xs text-blue-400/60 italic">ESRO Basis: {rec.esroBasis}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}

// ─── Sub-Components ───

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

function FilterSelect({ label, value, onChange, options }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="text-xs text-slate-400 mb-1 block">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-blue-500/50 appearance-none"
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value} className="bg-slate-800 text-white">{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

function SourceCard({ source, index }: { source: DrinkingWaterSource; index: number }) {
  const TypeIcon = typeIcons[source.type] || Droplet;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.03 }}
    >
      <Card className="glass-intense border-white/10 p-5 hover:border-white/15 transition-all">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center flex-shrink-0">
            <TypeIcon className="w-5 h-5 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h3 className="text-sm font-semibold text-white">{source.name}</h3>
              <Badge className={`${statusColors[source.status]} border text-[10px]`}>
                {source.status}
              </Badge>
              <Badge className={`${qualityColors[source.waterQualityStatus]} text-[10px]`}>
                {source.waterQualityStatus}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-2">
              <span className="flex items-center gap-1">
                <Map className="w-3 h-3" /> {source.district}
              </span>
              <span className="flex items-center gap-1">
                <Activity className="w-3 h-3" /> {source.type.replace(/-/g, ' ')}
              </span>
              {source.populationServed && (
                <span className="flex items-center gap-1">
                  <Users className="w-3 h-3" /> {source.populationServed.toLocaleString()} people
                </span>
              )}
            </div>

            <p className="text-xs text-slate-400 leading-relaxed mb-3">{source.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div className="text-xs">
                <span className="text-slate-500">Source: </span>
                <span className="text-slate-300">{source.source}</span>
              </div>
              {source.capacity && (
                <div className="text-xs">
                  <span className="text-slate-500">Capacity: </span>
                  <span className="text-slate-300">{source.capacity}</span>
                </div>
              )}
              <div className="text-xs md:col-span-2">
                <span className="text-slate-500">Infrastructure: </span>
                <span className="text-slate-300">{source.infrastructure}</span>
              </div>
            </div>

            {source.challenges.length > 0 && (
              <div className="mb-3">
                <span className="text-xs text-slate-500 mb-1 block">Key Challenges:</span>
                <div className="flex flex-wrap gap-1.5">
                  {source.challenges.map((c, i) => (
                    <span key={i} className="text-[10px] bg-red-500/10 text-red-400/80 px-2 py-0.5 rounded-full border border-red-500/10">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {source.esroSource && (
              <div className="text-[10px] text-blue-400/50 italic border-l-2 border-blue-500/10 pl-2">
                ESRO Source: {source.esroSource}
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function InfrastructureCard({ title, icon: Icon, data, description }: {
  title: string;
  icon: React.ElementType;
  data: { label: string; value: string; color?: string }[];
  description: string;
}) {
  return (
    <Card className="glass-intense border-white/10 p-5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h3 className="text-sm font-semibold text-white">{title}</h3>
      </div>
      <div className="space-y-3 mb-4">
        {data.map((item, i) => (
          <div key={i} className="flex items-center justify-between">
            <span className="text-xs text-slate-400">{item.label}</span>
            <span className={`text-sm font-bold ${item.color || 'text-white'}`}>{item.value}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
    </Card>
  );
}

function formatPopulation(pop: number): string {
  if (pop >= 1000000) return `${(pop / 1000000).toFixed(1)}M`;
  if (pop >= 1000) return `${(pop / 1000).toFixed(0)}K`;
  return pop.toString();
}
