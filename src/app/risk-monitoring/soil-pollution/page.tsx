'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Mountain, AlertTriangle, Map, BarChart3,
  Activity, Beaker, ExternalLink, ArrowRight, BookOpen,
  Shield, Droplet, Wind, Trees, FlaskConical
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

// ─── ESRO Soil Degradation Statistics ────────────────────────────────────────
// Source: erc_eia_report_eienkashmir.htm — Environmental Impact Assessment Report J&K
// Source: bcn_cfpr_eienkashmir_vital_stat_wastelands.htm — Wasteland Classification

const degradationStats = [
  { label: 'Degraded Area', value: '7 MHA', sub: '31.6% of total area', color: 'text-amber-400' },
  { label: 'Water Erosion', value: '24.6%', sub: 'Topsoil loss & terrain deformation', color: 'text-blue-400' },
  { label: 'Wind Erosion', value: '6.1%', sub: 'Ladakh region', color: 'text-orange-400' },
  { label: 'Waterlogging & Flooding', value: '0.9%', sub: 'Valley floor', color: 'text-cyan-400' },
  { label: 'Stable Terrain', value: '11.7%', sub: 'No degradation', color: 'text-emerald-400' },
  { label: 'Soil Families', value: '66', sub: 'Across 4 orders, 9 suborders', color: 'text-yellow-400' },
];

// ─── Soil Degradation by Type (ESRO) ─────────────────────────────────────────
const degradationByType = [
  {
    type: 'Water Erosion',
    icon: Droplet,
    area: '24.6% of total area',
    severity: 'High',
    color: 'from-blue-600 to-cyan-600',
    borderColor: 'border-blue-500/30',
    iconColor: 'text-blue-400',
    description: 'Topsoil loss, terrain deformation, and gully formation across the Himalayan foothills and valley slopes.',
    details: [
      { label: 'High Severity', value: '56% of erosion area', badge: 'danger' as const },
      { label: 'Medium Severity', value: '33% of erosion area', badge: 'warning' as const },
      { label: 'Mechanisms', value: 'Sheet, rill & gully erosion' },
      { label: 'Primary Zones', value: 'Pir Panjal, Great Himalayan slopes' },
      { label: 'Impact', value: 'Agricultural yield decline, sedimentation of waterbodies' },
    ],
    esroSource: 'erc_eia_report_eienkashmir.htm — 56% high severity, 33% medium severity of water erosion area',
  },
  {
    type: 'Wind Erosion',
    icon: Wind,
    area: '6.1% of total area',
    severity: 'Medium-High',
    color: 'from-orange-600 to-amber-600',
    borderColor: 'border-orange-500/30',
    iconColor: 'text-orange-400',
    description: 'Predominantly affects the cold desert regions of Ladakh, driven by high-velocity winds and sparse vegetation cover.',
    details: [
      { label: 'Medium Severity', value: '63% of erosion area', badge: 'warning' as const },
      { label: 'High Severity', value: '34% of erosion area', badge: 'danger' as const },
      { label: 'Primary Zones', value: 'Leh & Kargil (Ladakh)' },
      { label: 'Drivers', value: 'Sparse vegetation, high wind velocity, aridity' },
      { label: 'Impact', value: 'Topsoil stripping, desertification advance' },
    ],
    esroSource: 'erc_eia_report_eienkashmir.htm — 63% medium severity, 34% high severity of wind erosion area',
  },
  {
    type: 'Waterlogging & Flooding',
    icon: Mountain,
    area: '0.9% of total area',
    severity: 'Moderate',
    color: 'from-cyan-600 to-teal-600',
    borderColor: 'border-cyan-500/30',
    iconColor: 'text-cyan-400',
    description: 'Low-lying valley floors and floodplain areas experiencing seasonal waterlogging and flood-induced soil saturation.',
    details: [
      { label: 'Primary Zones', value: 'Jhelum floodplain, South Kashmir' },
      { label: 'Seasonal Peak', value: 'Spring snowmelt & monsoon' },
      { label: 'Mechanisms', value: 'Drainage congestion, river overflow' },
      { label: 'Impact', value: 'Crop damage, soil salinization risk' },
      { label: 'Affected Districts', value: 'Anantnag, Pulwama, Srinagar, Budgam' },
    ],
    esroSource: 'erc_eia_report_eienkashmir.htm — 0.9% area affected by waterlogging and flooding in valley',
  },
];

// ─── Regional Soil Profiles (ESRO) ───────────────────────────────────────────
const regionalProfiles = [
  {
    region: 'Leh (Ladakh)',
    badge: 'Cold Desert',
    badgeVariant: 'warning' as const,
    soilType: 'Arid soils, skeletal, low organic matter',
    surveyCoverage: '96 villages surveyed',
    organicCarbon: 'Only 15% samples had high organic carbon',
    nitrogen: 'Generally low — slow mineralization in cold climate',
    micronutrients: 'Zinc deficient in 48% of samples; >60% deficient in micro-nutrients (except Cu)',
    overall: 'Low fertility status, cold-limited mineralization',
    color: 'from-amber-700 to-yellow-800',
  },
  {
    region: 'Kargil (Ladakh)',
    badge: 'Cold Temperate',
    badgeVariant: 'info' as const,
    soilType: 'Mountain soils, better developed than Leh',
    surveyCoverage: '50 villages surveyed',
    organicCarbon: '32% samples had high organic carbon (vs 15% in Leh)',
    nitrogen: 'Low to moderate — cold climate limits mineralization',
    micronutrients: 'Zinc deficient in 48%; micro-nutrient deficiency >60% (except Cu)',
    overall: 'Superior to Leh in nutrient status across all parameters',
    color: 'from-emerald-700 to-teal-800',
  },
  {
    region: 'Kashmir Valley',
    badge: 'Alluvial & Loamy',
    badgeVariant: 'success' as const,
    soilType: 'Deep alluvium, Karewa deposits, loamy soils',
    surveyCoverage: 'Extensive agricultural zones',
    organicCarbon: 'Moderate — declining in intensively farmed areas',
    nitrogen: 'Moderate but declining with continuous cropping',
    micronutrients: 'Zinc deficiency emerging; pesticide contamination in orchard belts',
    overall: 'Most fertile region — under stress from chemical loading and erosion',
    color: 'from-green-700 to-emerald-800',
  },
  {
    region: 'Jammu & Shivaliks',
    badge: 'Subtropical',
    badgeVariant: 'danger' as const,
    soilType: 'Lateritic, red & yellow soils, eroded Shivalik foothills',
    surveyCoverage: 'Foothill and terai zones',
    organicCarbon: 'Low to moderate — high temperature accelerates decomposition',
    nitrogen: 'Low — high leaching in subtropical climate',
    micronutrients: 'Variable — deficiency increasing with intensive agriculture',
    overall: 'High erosion vulnerability on Shivalik slopes; fertility declining',
    color: 'from-red-700 to-orange-800',
  },
];

// ─── Soil Fertility Status (ESRO) ────────────────────────────────────────────
const fertilityData = [
  {
    category: 'Organic Carbon',
    icon: Trees,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-400/10',
    items: [
      { metric: 'Leh — High OC Samples', value: '15%', status: 'critical' },
      { metric: 'Kargil — High OC Samples', value: '32%', status: 'warning' },
      { metric: 'Kargil vs Leh', value: 'Kargil superior', status: 'info' },
    ],
  },
  {
    category: 'Nitrogen (N)',
    icon: Beaker,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    items: [
      { metric: 'Overall Status', value: 'Generally Low', status: 'warning' },
      { metric: 'Cause', value: 'Slow mineralization in cold climate', status: 'danger' },
      { metric: 'Leh & Kargil', value: 'Low to very low', status: 'danger' },
    ],
  },
  {
    category: 'Zinc (Zn)',
    icon: FlaskConical,
    color: 'text-amber-400',
    bgColor: 'bg-amber-400/10',
    items: [
      { metric: 'Deficient Samples', value: '48%', status: 'danger' },
      { metric: 'Regions Affected', value: 'Leh, Kargil, Valley', status: 'warning' },
      { metric: 'Impact', value: 'Crop yield limitation', status: 'warning' },
    ],
  },
  {
    category: 'Micro-nutrients',
    icon: Activity,
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    items: [
      { metric: 'Deficient Samples', value: '>60% (except Cu)', status: 'danger' },
      { metric: 'Copper Status', value: 'Adequate in most areas', status: 'success' },
      { metric: 'Trend', value: 'Widening deficiency', status: 'warning' },
    ],
  },
];

// ─── Chemical Contamination (ESRO) ───────────────────────────────────────────
const contaminationData = [
  {
    source: 'Pesticide Contamination',
    icon: AlertTriangle,
    severity: 'High',
    color: 'text-red-400',
    borderColor: 'border-red-500/30',
    description: 'Heavy pesticide use in apple orchards across Kashmir Valley. Organochlorine and organophosphate compounds detected in soil and groundwater.',
    affectedAreas: 'Apple orchard belts — Shopian, Pulwama, Anantnag, Baramulla',
    impacts: [
      'Soil microbiome disruption',
      'Groundwater contamination',
      'Bioaccumulation in food chain',
      'Non-target organism mortality',
    ],
  },
  {
    source: 'Fertilizer Overuse',
    icon: Beaker,
    severity: 'High',
    color: 'text-orange-400',
    borderColor: 'border-orange-500/30',
    description: 'Excessive chemical fertilizer application in intensively cultivated areas. NPK imbalance leading to soil acidification and nutrient depletion.',
    affectedAreas: 'Intensively farmed districts — Srinagar, Budgam, Pulwama, Anantnag',
    impacts: [
      'NPK imbalance and soil acidification',
      'Micronutrient depletion',
      'Surface and subsurface water pollution',
      'Soil organic matter decline',
    ],
  },
  {
    source: 'Heavy Metal Contamination',
    icon: FlaskConical,
    severity: 'Moderate',
    color: 'text-amber-400',
    borderColor: 'border-amber-500/30',
    description: 'Industrial discharge, urban runoff, and waste dumping contributing to heavy metal accumulation in peri-urban and industrial area soils.',
    affectedAreas: 'Srinagar peri-urban, Budgam industrial zones, highway corridors',
    impacts: [
      'Lead, cadmium, and chromium accumulation',
      'Soil toxicity for plant growth',
      'Food safety risks',
      'Long-term remediation challenge',
    ],
  },
];

// ─── Agricultural Impact Assessment (ESRO) ───────────────────────────────────
const agriculturalImpact = [
  { indicator: 'Soil Degradation Coverage', value: '31.6%', detail: '7 MHA of total area affected', severity: 'critical' as const },
  { indicator: 'Water Erosion Severity', value: '24.6%', detail: '56% high, 33% medium severity', severity: 'critical' as const },
  { indicator: 'Wind Erosion (Ladakh)', value: '6.1%', detail: '63% medium, 34% high severity', severity: 'warning' as const },
  { indicator: 'Zinc Deficiency', value: '48%', detail: 'Of all soil samples tested', severity: 'warning' as const },
  { indicator: 'Micro-nutrient Deficiency', value: '>60%', detail: 'All except copper', severity: 'danger' as const },
  { indicator: 'Low Organic Carbon (Leh)', value: '85%', detail: 'Samples below high OC threshold', severity: 'danger' as const },
  { indicator: 'Low Organic Carbon (Kargil)', value: '68%', detail: 'Samples below high OC threshold', severity: 'warning' as const },
  { indicator: 'Stable (Non-degraded) Area', value: '11.7%', detail: 'Only this area has stable terrain', severity: 'info' as const },
];

// ─── District-Level Soil Intelligence ────────────────────────────────────────
const districtIntelligence = [
  {
    district: 'Leh',
    region: 'Ladakh',
    soilOrders: 'Aridisols, Entisols',
    degradationPrimary: 'Wind erosion (6.1% regional)',
    fertilityStatus: 'Very Low',
    organicCarbon: '15% high OC',
    keyIssue: 'Cold desert — slow mineralization, zinc deficiency',
    surveyVillages: 96,
    badgeVariant: 'warning' as const,
  },
  {
    district: 'Kargil',
    region: 'Ladakh',
    soilOrders: 'Inceptisols, Entisols',
    degradationPrimary: 'Wind erosion (moderate)',
    fertilityStatus: 'Low-Moderate',
    organicCarbon: '32% high OC',
    keyIssue: 'Superior to Leh but still deficient in Zn and micronutrients',
    surveyVillages: 50,
    badgeVariant: 'info' as const,
  },
  {
    district: 'Srinagar',
    region: 'Kashmir Valley',
    soilOrders: 'Alfisols, Inceptisols',
    degradationPrimary: 'Waterlogging, urban waste',
    fertilityStatus: 'Moderate (declining)',
    organicCarbon: 'Moderate',
    keyIssue: 'Peri-urban contamination, waste dumping, waterlogging',
    surveyVillages: null,
    badgeVariant: 'warning' as const,
  },
  {
    district: 'Pulwama',
    region: 'Kashmir Valley',
    soilOrders: 'Inceptisols, Alfisols',
    degradationPrimary: 'Pesticide contamination',
    fertilityStatus: 'Moderate',
    organicCarbon: 'Moderate',
    keyIssue: 'Apple orchard pesticide loading, fertilizer overuse',
    surveyVillages: null,
    badgeVariant: 'danger' as const,
  },
  {
    district: 'Anantnag',
    region: 'Kashmir Valley',
    soilOrders: 'Inceptisols, Entisols',
    degradationPrimary: 'Water erosion, flooding',
    fertilityStatus: 'Moderate',
    organicCarbon: 'Moderate',
    keyIssue: 'Flood-affected, erosion on slopes, orchard contamination',
    surveyVillages: null,
    badgeVariant: 'warning' as const,
  },
  {
    district: 'Baramulla',
    region: 'Kashmir Valley',
    soilOrders: 'Inceptisols, Alfisols',
    degradationPrimary: 'Water erosion (moderate)',
    fertilityStatus: 'Moderate-Good',
    organicCarbon: 'Moderate',
    keyIssue: 'Forest-rich but slopes vulnerable to erosion',
    surveyVillages: null,
    badgeVariant: 'success' as const,
  },
  {
    district: 'Jammu / Shivaliks',
    region: 'Jammu',
    soilOrders: 'Alfisols, Ultisols',
    degradationPrimary: 'Water erosion (severe on Shivaliks)',
    fertilityStatus: 'Low-Moderate',
    organicCarbon: 'Low to moderate',
    keyIssue: 'Shivalik slope erosion, subtropical leaching',
    surveyVillages: null,
    badgeVariant: 'danger' as const,
  },
];

// ─── Policy Recommendations ──────────────────────────────────────────────────
const policyRecommendations = [
  {
    title: 'Soil Health Monitoring Network',
    priority: 'Critical',
    priorityVariant: 'danger' as const,
    description: 'Establish district-level soil testing laboratories with regular monitoring of organic carbon, NPK, zinc, and micronutrient levels. Integrate with ESRO baseline data.',
    actions: [
      'Deploy mobile soil testing labs across all 20 districts',
      'Establish baseline soil health index per district',
      'Create real-time soil quality dashboard linked to ESRO data',
      'Map zinc and micronutrient deficiency hotspots',
    ],
  },
  {
    title: 'Sustainable Orchard Management',
    priority: 'High',
    priorityVariant: 'warning' as const,
    description: 'Address pesticide and fertilizer contamination in apple orchards through integrated pest management (IPM) and organic transition programs.',
    actions: [
      'Ban highly toxic organochlorine pesticides in orchard zones',
      'Promote integrated pest management (IPM) for apple growers',
      'Establish buffer zones between orchards and water sources',
      'Monitor groundwater for pesticide residues',
    ],
  },
  {
    title: 'Erosion Control & Watershed Management',
    priority: 'High',
    priorityVariant: 'warning' as const,
    description: 'Implement watershed-scale erosion control measures on water-erosion affected slopes (24.6% area) and wind-erosion zones in Ladakh (6.1% area).',
    actions: [
      'Construct contour bunds and check dams on erosion-prone slopes',
      'Implement afforestation on degraded Shivalik and Pir Panjal slopes',
      'Establish windbreaks in Ladakh wind-erosion zones',
      'Restore degraded karewa lands in the Valley',
    ],
  },
  {
    title: 'Ladakh Soil Fertility Program',
    priority: 'High',
    priorityVariant: 'warning' as const,
    description: 'Address critical soil fertility deficits in Leh (15% high OC) and Kargil (32% high OC) through targeted organic matter enhancement and zinc supplementation.',
    actions: [
      'Distribute zinc-enriched fertilizers to deficient villages',
      'Promote composting and green manure in cold desert agriculture',
      'Expand soil fertility survey from 146 to all villages',
      'Develop cold-climate specific nutrient management protocols',
    ],
  },
  {
    title: 'Soil Classification & Mapping',
    priority: 'Medium',
    priorityVariant: 'info' as const,
    description: 'Complete comprehensive soil taxonomy mapping for all 4 orders, 9 suborders, 15 great groups, 27 sub-groups, and 66 families identified in J&K.',
    actions: [
      'Digitize and GIS-map all 66 soil family distributions',
      'Update soil taxonomy with contemporary survey data',
      'Create district-level soil profile databases',
      'Link soil classification to agricultural zoning',
    ],
  },
];

// ─── Soil Taxonomy Summary (ESRO) ────────────────────────────────────────────
const soilTaxonomy = [
  { level: 'Orders', count: 4, examples: 'Aridisols, Entisols, Inceptisols, Alfisols' },
  { level: 'Suborders', count: 9, examples: 'Orthents, Ochrepts, Ustalfs, etc.' },
  { level: 'Great Groups', count: 15, examples: 'Haplargids, Cryochrepts, etc.' },
  { level: 'Sub-groups', count: 27, examples: 'Typic, Lithic, Pachic, etc.' },
  { level: 'Families', count: 66, examples: 'Particle size, mineralogy, temperature' },
];

// ─── Main Page Component ─────────────────────────────────────────────────────
export default function SoilPollutionPage() {
  const [activeDegradationTab, setActiveDegradationTab] = useState(0);

  return (
    <main className="min-h-screen bg-slate-950">
      {/* ── Hero Section ──────────────────────────────────────────────────── */}
      <section className="relative pt-48 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/50 via-yellow-950/30 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl"
          >
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/risk-monitoring" className="hover:text-white transition-colors">Risk Monitoring</Link>
              <span>/</span>
              <span className="text-white font-medium">Soil Pollution & Degradation</span>
            </nav>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-600 to-yellow-700 flex items-center justify-center shadow-2xl">
                <Mountain className="w-8 h-8 text-white" />
              </div>
              <Badge variant="warning" size="lg">Soil Pollution & Degradation Monitoring</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Soil Pollution <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">& Degradation</span>
            </h1>

            <p className="text-xl text-slate-400 mb-4 leading-relaxed max-w-3xl">
              Comprehensive soil health intelligence covering erosion, nutrient depletion,
              chemical contamination, and land degradation across Jammu & Kashmir — sourced from
              the ESRO Environmental Impact Assessment and Council for Plant Protection archives.
            </p>

            <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
              <BookOpen className="w-4 h-4" />
              <span>Data sourced from ESRO legacy archive: <code className="text-amber-400/80">erc_eia_report_eienkashmir.htm</code> and <code className="text-amber-400/80">bcn_cfpr_eienkashmir_vital_stat_wastelands.htm</code></span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-yellow-700 hover:from-amber-700 hover:to-yellow-800 text-white shadow-xl"
                onClick={() => window.location.href = '/risk-monitoring/dashboards'}
              >
                <Activity className="w-5 h-5 mr-2" />
                View Soil Dashboard
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                onClick={() => window.location.href = '/risk-monitoring/pollution-stress'}
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Back to Pollution & Stress
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                onClick={() => window.location.href = '/risk-monitoring'}
              >
                Overview
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Key Stats Ribbon ──────────────────────────────────────────────── */}
      <section className="py-12 border-y border-white/5 bg-gradient-to-b from-slate-950 to-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {degradationStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="text-center"
              >
                <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                <div className="text-sm text-slate-400 mb-1">{stat.label}</div>
                <div className="text-xs text-slate-500">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <p className="text-xs text-slate-600">
              Source: ESRO EIA Report — erc_eia_report_eienkashmir.htm
            </p>
          </div>
        </div>
      </section>

      {/* ── Soil Degradation Analysis by Type ─────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold text-white mb-2">Soil Degradation Analysis by Type</h2>
            <p className="text-slate-400 max-w-2xl">
              31.6% of J&K area (7 MHA) is affected by degradation. Water erosion dominates at 24.6%,
              followed by wind erosion at 6.1% and waterlogging at 0.9%.
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-3 mb-8">
            {degradationByType.map((item, index) => (
              <button
                key={item.type}
                onClick={() => setActiveDegradationTab(index)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeDegradationTab === index
                    ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.type}
              </button>
            ))}
          </div>

          {/* Active Tab Content */}
          {degradationByType.map((item, index) => (
            activeDegradationTab === index && (
              <motion.div
                key={item.type}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`glass-intense ${item.borderColor} p-8`}>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{item.type}</h3>
                          <Badge variant={item.severity === 'High' ? 'danger' : item.severity === 'Medium-High' ? 'warning' : 'info'} size="sm">
                            {item.severity} Severity
                          </Badge>
                        </div>
                      </div>
                      <p className="text-slate-300 mb-4 leading-relaxed">{item.description}</p>
                      <div className="text-sm text-slate-400 mb-2">
                        <span className="text-white font-semibold">Area Affected:</span> {item.area}
                      </div>
                      <div className="flex items-center gap-2 mt-4 text-xs text-slate-500">
                        <ExternalLink className="w-3 h-3" />
                        <span>{item.esroSource}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-3">Degradation Details</h4>
                      {item.details.map((detail, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-white/5">
                          <span className="text-sm text-slate-400">{detail.label}</span>
                          {detail.badge ? (
                            <Badge variant={detail.badge} size="sm">{detail.value}</Badge>
                          ) : (
                            <span className="text-sm text-white font-medium">{detail.value}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            )
          ))}
        </div>
      </section>

      {/* ── Soil Taxonomy Classification ──────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-3xl font-bold text-white mb-2">Soil Taxonomy Classification</h2>
            <p className="text-slate-400 max-w-2xl">
              J&K soils span 4 orders, 9 suborders, 15 great groups, 27 sub-groups, and 66 families —
              reflecting the region's extraordinary geological and climatic diversity.
            </p>
            <p className="text-xs text-slate-600 mt-2">Source: ESRO EIA Report — erc_eia_report_eienkashmir.htm</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {soilTaxonomy.map((item, index) => (
              <motion.div
                key={item.level}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-amber-500/20 p-5 text-center">
                  <div className="text-4xl font-bold text-amber-400 mb-2">{item.count}</div>
                  <div className="text-sm font-semibold text-white mb-1">{item.level}</div>
                  <div className="text-xs text-slate-500">{item.examples}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Regional Soil Profiles ────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold text-white mb-2">Regional Soil Profiles</h2>
            <p className="text-slate-400 max-w-2xl">
              Soil characteristics vary dramatically across J&K's five physiographic regions —
              from the cold desert of Ladakh to the subtropical Shivalik foothills.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {regionalProfiles.map((profile, index) => (
              <motion.div
                key={profile.region}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${profile.color}`} />
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-bold text-white">{profile.region}</h3>
                        <Badge variant={profile.badgeVariant} size="sm">{profile.badge}</Badge>
                      </div>
                      {profile.surveyCoverage && (
                        <div className="text-right">
                          <div className="text-xs text-slate-500">Survey</div>
                          <div className="text-sm text-amber-400 font-semibold">{profile.surveyCoverage}</div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Soil Type</span>
                        <span className="text-white text-sm">{profile.soilType}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Organic Carbon</span>
                        <span className="text-amber-400 text-sm">{profile.organicCarbon}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Nitrogen</span>
                        <span className="text-blue-400 text-sm">{profile.nitrogen}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Micronutrients</span>
                        <span className="text-purple-400 text-sm">{profile.micronutrients}</span>
                      </div>
                      <div className="pt-2 border-t border-white/5">
                        <span className="text-xs text-slate-500">Overall: </span>
                        <span className="text-sm text-white">{profile.overall}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Soil Fertility Status ─────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold text-white mb-2">Soil Fertility Status</h2>
            <p className="text-slate-400 max-w-2xl">
              Nutrient analysis from ESRO soil fertility surveys — Leh (96 villages) and Kargil (50 villages).
              Kargil soils are superior to Leh in all nutrient parameters.
            </p>
            <p className="text-xs text-slate-600 mt-2">
              Source: ESRO EIA Report — Ladakh soil fertility survey data
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {fertilityData.map((fertility, index) => (
              <motion.div
                key={fertility.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg ${fertility.bgColor} flex items-center justify-center`}>
                      <fertility.icon className={`w-5 h-5 ${fertility.color}`} />
                    </div>
                    <h3 className="text-sm font-bold text-white">{fertility.category}</h3>
                  </div>
                  <div className="space-y-3">
                    {fertility.items.map((item, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <span className="text-xs text-slate-400">{item.metric}</span>
                        <Badge
                          variant={
                            item.status === 'critical' ? 'critical' :
                            item.status === 'danger' ? 'danger' :
                            item.status === 'warning' ? 'warning' :
                            item.status === 'success' ? 'success' : 'info'
                          }
                          size="sm"
                        >
                          {item.value}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Chemical Contamination ────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold text-white mb-2">Chemical Contamination</h2>
            <p className="text-slate-400 max-w-2xl">
              Pesticide and fertilizer contamination from apple orchards, industrial discharge,
              and urban waste dumping — threatening soil health and groundwater quality.
            </p>
            <p className="text-xs text-slate-600 mt-2">
              Source: ESRO EIA Report — erc_eia_report_eienkashmir.htm — "excessive use of chemical fertilizers and pesticides in vegetable and fruit crops is polluting the surface and sub-surface water sources"
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contaminationData.map((item, index) => (
              <motion.div
                key={item.source}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className={`glass-intense ${item.borderColor} p-6 h-full`}>
                  <div className="flex items-center gap-3 mb-4">
                    <item.icon className={`w-6 h-6 ${item.color}`} />
                    <div>
                      <h3 className="text-sm font-bold text-white">{item.source}</h3>
                      <Badge
                        variant={item.severity === 'High' ? 'danger' : 'warning'}
                        size="sm"
                      >
                        {item.severity}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 mb-4 leading-relaxed">{item.description}</p>
                  <div className="text-xs text-slate-500 mb-3">
                    <span className="text-slate-400 font-medium">Affected Areas: </span>
                    {item.affectedAreas}
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Key Impacts</div>
                    {item.impacts.map((impact, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <AlertTriangle className={`w-3 h-3 mt-0.5 shrink-0 ${item.color}`} />
                        <span>{impact}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Agricultural Impact Assessment ────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold text-white mb-2">Agricultural Impact Assessment</h2>
            <p className="text-slate-400 max-w-2xl">
              Key indicators of soil degradation impact on agricultural productivity and ecosystem health across J&K.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {agriculturalImpact.map((item, index) => (
              <motion.div
                key={item.indicator}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
              >
                <Card className="glass-intense border-white/10 p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xs font-semibold text-slate-300">{item.indicator}</h3>
                    <Badge
                      variant={
                        item.severity === 'critical' ? 'critical' :
                        item.severity === 'danger' ? 'danger' :
                        item.severity === 'warning' ? 'warning' : 'info'
                      }
                      size="sm"
                    >
                      {item.severity}
                    </Badge>
                  </div>
                  <div className={`text-2xl font-bold mb-1 ${
                    item.severity === 'critical' ? 'text-red-400' :
                    item.severity === 'danger' ? 'text-red-400' :
                    item.severity === 'warning' ? 'text-amber-400' : 'text-blue-400'
                  }`}>
                    {item.value}
                  </div>
                  <div className="text-xs text-slate-500">{item.detail}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── District-Level Soil Intelligence ──────────────────────────────── */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-3xl font-bold text-white mb-2">District-Level Soil Intelligence</h2>
            <p className="text-slate-400 max-w-2xl">
              Soil classification, degradation patterns, and fertility status by district —
              integrating ESRO survey data with regional environmental profiles.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {districtIntelligence.map((district, index) => (
              <motion.div
                key={district.district}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5 h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-base font-bold text-white">{district.district}</h3>
                      <Badge variant={district.badgeVariant} size="sm">{district.region}</Badge>
                    </div>
                    {district.surveyVillages && (
                      <div className="text-right">
                        <div className="text-xs text-slate-500">Surveyed</div>
                        <div className="text-sm text-amber-400 font-bold">{district.surveyVillages} villages</div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Soil Orders</span>
                      <span className="text-white text-xs">{district.soilOrders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Degradation</span>
                      <span className="text-amber-400 text-xs">{district.degradationPrimary}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Fertility</span>
                      <span className="text-white text-xs">{district.fertilityStatus}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Organic Carbon</span>
                      <span className="text-emerald-400 text-xs">{district.organicCarbon}</span>
                    </div>
                    <div className="pt-2 border-t border-white/5">
                      <span className="text-xs text-slate-500">Key Issue: </span>
                      <span className="text-xs text-slate-300">{district.keyIssue}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Policy Recommendations ────────────────────────────────────────── */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-amber-400" />
              <h2 className="text-3xl font-bold text-white">Policy Recommendations</h2>
            </div>
            <p className="text-slate-400 max-w-2xl">
              Evidence-based interventions derived from ESRO soil degradation analysis and fertility survey findings.
            </p>
          </motion.div>

          <div className="space-y-6">
            {policyRecommendations.map((rec, index) => (
              <motion.div
                key={rec.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className="glass-intense border-white/10 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-white">{rec.title}</h3>
                      <Badge variant={rec.priorityVariant} size="sm" className="mt-1">{rec.priority} Priority</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300 mb-4 leading-relaxed">{rec.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {rec.actions.map((action, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                        <span>{action}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Map Preview Panel ─────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Map className="w-6 h-6 text-amber-400" />
                <div>
                  <h2 className="text-xl font-bold text-white">Soil Degradation & Contamination Map</h2>
                  <p className="text-sm text-slate-400">Degradation zones, fertility survey locations, and contamination hotspot layers</p>
                </div>
              </div>
              <div className="relative h-80 bg-gradient-to-br from-amber-900/40 to-yellow-900/20 rounded-xl flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 mb-2">Interactive soil degradation map with erosion zones, fertility survey points,</p>
                  <p className="text-slate-400 mb-4">and contamination hotspots across J&K</p>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-amber-600 to-yellow-700"
                    onClick={() => window.location.href = '/risk-monitoring/dashboards'}
                  >
                    <Map className="w-5 h-5 mr-2" />
                    Open Full Map
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ── ESRO Source Attribution ───────────────────────────────────────── */}
      <section className="py-12 border-t border-white/5">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-amber-500/20 p-6">
            <div className="flex items-start gap-4">
              <BookOpen className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
              <div>
                <h3 className="text-sm font-bold text-white mb-2">ESRO Legacy Data Sources</h3>
                <p className="text-sm text-slate-400 mb-3">
                  All soil degradation and fertility data on this page is sourced from the eIEN Kashmir
                  Centre for Environment Studies archive (ESRO), preserved and modernized by the
                  Kashmir Environmental Intelligence Platform.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="text-slate-500">
                    <span className="text-amber-400 font-semibold">Primary Source:</span>{' '}
                    <code className="text-slate-300">erc_eia_report_eienkashmir.htm</code> — Environmental
                    Impact Assessment Report for J&K State (835 lines)
                  </div>
                  <div className="text-slate-500">
                    <span className="text-amber-400 font-semibold">Secondary Source:</span>{' '}
                    <code className="text-slate-300">bcn_cfpr_eienkashmir_vital_stat_wastelands.htm</code> —
                    Wasteland Classification & Land Degradation
                  </div>
                </div>
                <div className="mt-3 text-xs text-slate-600">
                  Note: ESRO data represents baseline environmental conditions documented in the 2004-2010 era.
                  Contemporary verification against NBSS&LUP, FSI, and state agriculture department data is recommended.
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* ── Related Intelligence ──────────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Related Intelligence</h2>
            <p className="text-slate-400">Cross-linked environmental monitoring systems</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              className="glass-light border-white/10 hover:border-blue-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => window.location.href = '/risk-monitoring/water-pollution'}
            >
              <Droplet className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Water Pollution
              </h3>
              <p className="text-xs text-slate-400">
                Runoff, pesticide leaching, and groundwater contamination linkage
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-emerald-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => window.location.href = '/risk-monitoring/pollution-stress'}
            >
              <FlaskConical className="w-8 h-8 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                Pollution & Stress
              </h3>
              <p className="text-xs text-slate-400">
                Comprehensive pollution stress across all environmental media
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-amber-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => window.location.href = '/research-library/environmental-impact-assessment'}
            >
              <BookOpen className="w-8 h-8 text-amber-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                EIA Research Library
              </h3>
              <p className="text-xs text-slate-400">
                Full ESRO Environmental Impact Assessment Report
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-blue-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => window.location.href = '/risk-monitoring/dashboards'}
            >
              <Activity className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Risk Dashboards
              </h3>
              <p className="text-xs text-slate-400">
                Environmental quality dashboards and real-time monitoring
              </p>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
