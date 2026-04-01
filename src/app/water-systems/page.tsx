'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Droplet, Waves, Wind, Mountain, Map, Thermometer, Fish,
  AlertTriangle, Hammer, ArrowRight, Search, TrendingUp,
  Database, Layers, Activity, Shield, Leaf, Eye, Book
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  lakesData, wetlandsData, riversData, springsData,
  watershedsData, glaciersData, waterQualitySites,
  fisheriesData, floodRiskZones, restorationSites,
  updatedWaterSystemsMetrics
} from '@/data/water-systems';
import { KASHMIR_VALLEY_TOTALS, NWIA_SOURCE_METADATA } from '@/data/nwia-references';
import { NwiaClassificationPanel } from '@/components/water/NwiaClassificationPanel';

// Hydrological Intelligence
import {
  getAllLakeHealthScores,
  getAllSpringVulnerability,
  getAllWetlandConditions,
  getAllRiverCorridorStress,
  getDistrictWaterIntelligence,
} from '@/data/hydrological-intelligence';
import LakeHealthScorecardComponent from '@/components/water/LakeHealthScorecard';
import DistrictWaterCard from '@/components/water/DistrictWaterCard';

const submodules = [
  {
    id: 'lakes',
    title: 'All Lakes',
    description: 'Every major, minor, urban, rural, high-altitude, floodplain, and district-level lake mapped across Kashmir',
    icon: Droplet,
    color: 'from-blue-500 to-cyan-600',
    count: lakesData.length,
    route: '/water-systems/lakes',
    features: ['Water Quality', 'Biodiversity', 'Hydrology', 'Threats Monitoring']
  },
  {
    id: 'wetlands',
    title: 'All Wetlands',
    description: 'Marshes, floodplain wetlands, shallow-water habitats, reedbeds, bird-use wetlands, and Ramsar-linked wetlands',
    icon: Waves,
    color: 'from-sky-500 to-blue-600',
    count: wetlandsData.length,
    route: '/water-systems/wetlands',
    features: ['Ramsar Sites', 'Bird Habitats', 'Flood Buffering', 'Conservation']
  },
  {
    id: 'rivers',
    title: 'All Rivers and Streams',
    description: 'Major rivers, tributaries, district streams, cold-water streams, drainage-linked channels, and flow systems',
    icon: Wind,
    color: 'from-indigo-500 to-purple-600',
    count: riversData.length,
    route: '/water-systems/rivers',
    features: ['Flow Monitoring', 'Fisheries', 'Flood Risk', 'Water Quality']
  },
  {
    id: 'springs',
    title: 'All Springs',
    description: 'Mapped springs, community springs, seasonal springs, perennial springs, springsheds, and recharge-linked systems',
    icon: Droplet,
    color: 'from-emerald-500 to-green-600',
    count: springsData.length,
    route: '/water-systems/springs',
    features: ['Source Protection', 'Recharge Areas', 'Water Quality', 'Community Use']
  },
  {
    id: 'watersheds',
    title: 'All Watersheds',
    description: 'Major and minor watersheds, sub-watersheds, spring catchments, lake catchments, river basins, and hydrological units',
    icon: Map,
    color: 'from-amber-500 to-orange-600',
    count: watershedsData.length,
    route: '/water-systems/watersheds',
    features: ['Catchment Analysis', 'Land Use', 'Erosion Control', 'Water Balance']
  },
  {
    id: 'glaciers',
    title: 'All Glaciers and Cryosphere',
    description: 'Glaciers, glacial lakes, snow-fed systems, seasonal snow cover, high-altitude cryosphere, and downstream dependence',
    icon: Mountain,
    color: 'from-slate-400 to-slate-600',
    count: glaciersData.length,
    route: '/water-systems/glaciers',
    features: ['Glacial Retreat', 'Mass Balance', 'Downstream Flow', 'Climate Impact']
  },
  {
    id: 'water-quality',
    title: 'Water Quality',
    description: 'Lake, wetland, river, stream, and spring quality monitoring with catchment-linked water stress and trends',
    icon: Thermometer,
    color: 'from-teal-500 to-cyan-600',
    count: waterQualitySites.length,
    route: '/water-systems/water-quality',
    features: ['10 Parameters', 'Quality Trends', 'Pollution Tracking', 'Health Assessment']
  },
  {
    id: 'fisheries',
    title: 'All Fisheries and Aquatic Life',
    description: 'Native fish systems, trout systems, snow trout, aquatic ecology, lake fisheries, stream fisheries, and biodiversity',
    icon: Fish,
    color: 'from-violet-500 to-purple-600',
    count: fisheriesData.length,
    route: '/water-systems/fisheries',
    features: ['Species Database', 'Fishery Management', 'Conservation', 'Productivity']
  },
  {
    id: 'flood-risk',
    title: 'Flood and Hydrological Risk',
    description: 'Floodplains, flash-flood corridors, overflow zones, glacial-melt risk, wetland buffering, and hazard sensitivity',
    icon: AlertTriangle,
    color: 'from-red-500 to-rose-600',
    count: floodRiskZones.length,
    route: '/water-systems/flood-risk',
    features: ['Risk Mapping', 'Early Warning', 'Vulnerability', 'Mitigation']
  },
  {
    id: 'restoration',
    title: 'All Restoration and Rejuvenation',
    description: 'Lake restoration, wetland restoration, spring rejuvenation, catchment treatment, and hydrological restoration planning',
    icon: Hammer,
    color: 'from-lime-500 to-green-600',
    count: restorationSites.length,
    route: '/water-systems/restoration',
    features: ['Project Tracking', 'Outcomes', 'Community Involvement', 'Investment']
  },
];

export default function WaterSystemsPage() {
  const router = useRouter();
  const metrics = updatedWaterSystemsMetrics;

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero Section */}
      <div className="relative pt-20 md:pt-48 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-cyan-600/20 to-indigo-600/20 opacity-50" />
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl"
          >
            <Badge variant="info" size="lg" className="mb-4">
              Comprehensive Hydrological Intelligence
            </Badge>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Water Systems
            </h1>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
              Water Systems is a complete hydrological, ecological, aquatic, water-quality, watershed, cryosphere, flood-risk, and restoration intelligence system for all mapped water-related landscapes and processes across Kashmir.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                className="bg-gradient-to-r from-blue-500 to-cyan-600"
                icon={<Search className="w-5 h-5" />}
                onClick={() => router.push('/water-systems/lakes')}
              >
                Explore Water Bodies
              </Button>
              <Button
                variant="outline"
                className="border-white/20 text-white"
                icon={<Database className="w-5 h-5" />}
                onClick={() => router.push('/dashboards/water-systems')}
              >
                View Dashboard
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="container mx-auto px-6 -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-intense border-white/10 p-6" padding="none">
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
              {[
                { label: 'Lakes', value: metrics.totalLakes, icon: Droplet },
                { label: 'Wetlands', value: metrics.totalWetlands, icon: Waves },
                { label: 'Rivers', value: metrics.totalRivers + metrics.totalStreams, icon: Wind },
                { label: 'Springs', value: metrics.totalSprings, icon: Mountain },
                { label: 'Watersheds', value: metrics.totalWatersheds, icon: Map },
                { label: 'Glaciers', value: metrics.totalGlaciers, icon: Layers },
                { label: 'Quality Sites', value: metrics.totalWaterQualitySites, icon: Thermometer },
                { label: 'Fisheries', value: metrics.totalFisheries, icon: Fish },
                { label: 'Flood Zones', value: metrics.totalFloodZones, icon: AlertTriangle },
                { label: 'Restoration', value: metrics.totalRestorationSites, icon: Hammer },
              ].map((metric, idx) => (
                <div key={idx} className="text-center p-3 border-r border-white/5 last:border-r-0">
                  <metric.icon className="w-5 h-5 text-slate-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white tabular-nums">
                    {metric.value}
                  </div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Quality Overview */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
            {[
              { label: 'Excellent', value: metrics.excellentQuality, color: 'from-emerald-500 to-green-600' },
              { label: 'Good', value: metrics.goodQuality, color: 'from-lime-500 to-green-600' },
              { label: 'Moderate', value: metrics.moderateQuality, color: 'from-amber-500 to-orange-600' },
              { label: 'Poor', value: metrics.poorQuality, color: 'from-orange-500 to-red-600' },
              { label: 'Critical', value: metrics.criticalQuality, color: 'from-red-500 to-rose-600' },
            ].map((item, idx) => (
              <Card key={idx} className={`bg-gradient-to-br ${item.color} border-0 p-6`}>
                <div className="text-center">
                  <Thermometer className="w-6 h-6 text-white/80 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-white mb-1">{item.value}</div>
                  <div className="text-sm text-white/80 uppercase tracking-wider">{item.label} Quality</div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Submodules Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {submodules.map((module, idx) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.05 }}
            >
              <Card className="glass-intense border-white/10 p-6 h-full hover:border-white/20 transition-all cursor-pointer group">
                <div className="flex items-start gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                    <module.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {module.title}
                      </h3>
                      <Badge variant="info" size="sm">{module.count} entities</Badge>
                    </div>
                    <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                      {module.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {module.features.map((feature, fIdx) => (
                        <Badge key={fIdx} variant="outline" size="sm" className="text-xs border-white/10 text-slate-400">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white group-hover:bg-white/10 transition-all"
                      icon={<ArrowRight className="w-4 h-4" />}
                      onClick={() => router.push(module.route)}
                    >
                      Explore {module.title}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Key Features Section */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="glass-intense border-white/10 p-8">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Comprehensive Water Intelligence Framework
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Database,
                  title: 'Complete Coverage',
                  description: 'All mapped water entities from major lakes to local springs, river corridors to cryosphere-linked systems',
                  color: 'text-blue-400'
                },
                {
                  icon: Activity,
                  title: 'Scientific Monitoring',
                  description: 'Water quality parameters, hydrological data, biodiversity tracking, and threat assessment',
                  color: 'text-emerald-400'
                },
                {
                  icon: Shield,
                  title: 'Risk Intelligence',
                  description: 'Flood mapping, hazard zones, early warning systems, and vulnerability assessment',
                  color: 'text-amber-400'
                },
                {
                  icon: Leaf,
                  title: 'Restoration Tracking',
                  description: 'Conservation projects, restoration outcomes, community involvement, and investment monitoring',
                  color: 'text-green-400'
                },
                {
                  icon: Map,
                  title: 'Spatial Analysis',
                  description: 'GIS integration, watershed boundaries, catchment analysis, and spatial relationships',
                  color: 'text-purple-400'
                },
                {
                  icon: TrendingUp,
                  title: 'Trend Analysis',
                  description: 'Long-term monitoring, quality trends, climate impact assessment, and predictive modeling',
                  color: 'text-cyan-400'
                },
                {
                  icon: Eye,
                  title: 'Public Access',
                  description: 'Transparent data access, community reporting, educational resources, and stakeholder engagement',
                  color: 'text-pink-400'
                },
                {
                  icon: Layers,
                  title: 'Scalable Architecture',
                  description: 'Designed for expansion, API-ready, data export capabilities, and integration support',
                  color: 'text-indigo-400'
                },
              ].map((feature, idx) => (
                <div key={idx} className="text-center p-4">
                  <feature.icon className={`w-10 h-10 ${feature.color} mx-auto mb-4`} />
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* =========================================================
          HYDROLOGICAL INTELLIGENCE BANDS
          ========================================================= */}
      
      {/* Lake Health Scorecards */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Lake Health Scorecards</h2>
              <p className="text-slate-400">Composite health assessment integrating water quality, trophic state, biodiversity, and threats</p>
            </div>
            <Button
              variant="outline"
              className="border-white/20 text-white"
              onClick={() => router.push('/water-systems/lakes')}
            >
              View All Lakes
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getAllLakeHealthScores().slice(0, 6).map((scorecard) => (
            <LakeHealthScorecardComponent
              key={scorecard.lakeSlug}
              scorecard={scorecard}
              compact
            />
          ))}
        </div>
      </div>

      {/* District Water Intelligence */}
      <div className="container mx-auto px-6 py-12 bg-gradient-to-b from-slate-950 to-blue-950/20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">District Water Intelligence</h2>
              <p className="text-slate-400">Water body distribution, health scores, and restoration investments by district</p>
            </div>
            <Button
              variant="outline"
              className="border-white/20 text-white"
              onClick={() => router.push('/water-systems')}
            >
              View All Districts
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {['Srinagar', 'Anantnag', 'Baramulla', 'Kupwara'].map((district) => (
            <DistrictWaterCard
              key={district}
              intelligence={getDistrictWaterIntelligence(district)}
            />
          ))}
        </div>
      </div>

      {/* Spring Vulnerability & Wetland Condition Summary */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
              <Droplet className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Spring & Wetland Assessment</h2>
              <p className="text-slate-400">Vulnerability and condition monitoring for critical water systems</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Springs Summary */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Spring Vulnerability</h3>
            <div className="space-y-3">
              {getAllSpringVulnerability().slice(0, 5).map((vuln) => (
                <div
                  key={vuln.springSlug}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-white">{vuln.springName}</div>
                    <div className="text-xs text-slate-400">
                      Discharge: {vuln.dischargeTrend} • Climate: {vuln.climateSensitivity}
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      vuln.classification === 'critical'
                        ? 'bg-red-500/20 text-red-400'
                        : vuln.classification === 'vulnerable'
                        ? 'bg-orange-500/20 text-orange-400'
                        : 'bg-green-500/20 text-green-400'
                    }`}
                  >
                    {vuln.classification.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Wetlands Summary */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-4">Wetland Condition</h3>
            <div className="space-y-3">
              {getAllWetlandConditions().slice(0, 5).map((cond) => (
                <div
                  key={cond.wetlandSlug}
                  className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                >
                  <div>
                    <div className="font-medium text-white">{cond.wetlandName}</div>
                    <div className="text-xs text-slate-400">
                      Score: {cond.conditionScore} • Ramsar: {cond.ramsarCriteria ? 'Yes' : 'No'}
                    </div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      cond.conditionClass === 'critical'
                        ? 'bg-red-500/20 text-red-400'
                        : cond.conditionClass === 'poor'
                        ? 'bg-orange-500/20 text-orange-400'
                        : cond.conditionClass === 'fair'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-green-500/20 text-green-400'
                    }`}
                  >
                    {cond.conditionClass.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* River Corridor Stress */}
      <div className="container mx-auto px-6 py-12 bg-gradient-to-b from-slate-950 to-purple-950/20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <Waves className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">River Corridor Stress</h2>
              <p className="text-slate-400">Riparian buffer, land use, flow regulation, and sediment load analysis</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getAllRiverCorridorStress().slice(0, 6).map((stress) => (
            <div
              key={stress.riverSlug}
              className="bg-white/5 border border-white/10 rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-white">{stress.riverName}</h4>
                <span
                  className={`px-2 py-1 rounded text-xs font-bold ${
                    stress.classification === 'critical'
                      ? 'bg-red-500/20 text-red-400'
                      : stress.classification === 'high'
                      ? 'bg-orange-500/20 text-orange-400'
                      : 'bg-green-500/20 text-green-400'
                  }`}
                >
                  {stress.classification.toUpperCase()}
                </span>
              </div>
              <div className="space-y-2 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Buffer Width:</span>
                  <span className="text-white">{stress.riparianBuffer.averageWidth}m</span>
                </div>
                <div className="flex justify-between">
                  <span>Urban Coverage:</span>
                  <span className="text-white">{stress.landUseStress.urbanCoverage}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Dams:</span>
                  <span className="text-white">{stress.flowRegulation.dams}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NWIA Classification Section */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
        >
          <Card className="glass-intense border-white/10 p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Book className="w-6 h-6 text-blue-400" />
                  <h2 className="text-2xl font-bold text-white">NWIA Wetland Classification</h2>
                </div>
                <p className="text-slate-400">
                  National Wetland Inventory and Assessment - Jammu and Kashmir Atlas (2010)
                </p>
              </div>
              <Badge variant="info" size="lg">Kashmir Valley</Badge>
            </div>
            
            {/* NWIA Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-center">
                <div className="text-3xl font-bold text-white">{KASHMIR_VALLEY_TOTALS.totalWetlandAreaHa.toLocaleString()}</div>
                <div className="text-xs text-slate-400 mt-1">Total Wetland (ha)</div>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-sky-500/20 to-blue-500/20 border border-sky-500/30 text-center">
                <div className="text-3xl font-bold text-white">{KASHMIR_VALLEY_TOTALS.totalWetlandAreaKm2.toFixed(2)}</div>
                <div className="text-xs text-slate-400 mt-1">Total Wetland (km²)</div>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 text-center">
                <div className="text-3xl font-bold text-white">{(KASHMIR_VALLEY_TOTALS.lakesPondsAreaHa / 1000).toFixed(1)}k</div>
                <div className="text-xs text-slate-400 mt-1">Lakes/Ponds (ha)</div>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30 text-center">
                <div className="text-3xl font-bold text-white">{(KASHMIR_VALLEY_TOTALS.riverStreamAreaHa / 1000).toFixed(1)}k</div>
                <div className="text-xs text-slate-400 mt-1">Rivers/Streams (ha)</div>
              </div>
              <div className="p-4 rounded-xl bg-gradient-to-br from-slate-500/20 to-slate-600/20 border border-slate-500/30 text-center">
                <div className="text-3xl font-bold text-white">{KASHMIR_VALLEY_TOTALS.totalHighAltitudeLakes.toLocaleString()}</div>
                <div className="text-xs text-slate-400 mt-1">High Altitude Lakes</div>
              </div>
            </div>

            <div className="text-center">
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white"
                icon={<ArrowRight className="w-5 h-5" />}
                onClick={() => router.push('/water-systems/nwia-classification')}
              >
                Explore Classification System
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card className="bg-gradient-to-r from-blue-600 to-cyan-600 border-0 p-8">
            <div className="flex items-center justify-between flex-wrap gap-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Access Detailed Water Intelligence
                </h3>
                <p className="text-white/80">
                  Explore comprehensive data, maps, and analysis for any water system across Kashmir
                </p>
              </div>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="bg-white/20 text-white border-0"
                  icon={<Search className="w-5 h-5" />}
                  onClick={() => router.push('/water-systems/lakes')}
                >
                  Browse All Water Bodies
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white"
                  icon={<Map className="w-5 h-5" />}
                  onClick={() => router.push('/atlas')}
                >
                  View on Atlas
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <AdvancedFooter />
    </main>
  );
}
