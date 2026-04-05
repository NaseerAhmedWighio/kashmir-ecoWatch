'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  AlertTriangle, Map, BarChart3, ExternalLink,
  ArrowRight, BookOpen, Shield, Mountain, Building2, Siren
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { useRouter } from 'next/navigation';

// ============================================================================
// Seismic Zoning Data
// ============================================================================

const seismicZones = [
  {
    zone: 'V',
    label: 'Zone V — Very High Damage Risk',
    color: 'from-red-600 to-red-800',
    textColor: 'text-red-400',
    borderColor: 'border-red-500/50',
    districts: ['Srinagar', 'Anantnag', 'Baramulla', 'Pulwama', 'Shopian', 'Kupwara', 'Bandipora', 'Ganderbal'],
    peakGroundAcceleration: '0.36g',
    description: 'Highest seismic hazard zone. Entire Kashmir Valley falls under Zone V as per IS 1893 (2002) zoning map.',
  },
];

// ============================================================================
// Historical Earthquake Events
// ============================================================================

const historicalEarthquakes = [
  {
    id: 'eq-1',
    date: '2005-10-08',
    magnitude: 7.6,
    epicenter: 'Muzaffarabad, PoK',
    distanceFromKashmir: '~120 km from Srinagar',
    intensity: 'IX (Violent)',
    casualties: '73,000+ killed across region',
    impact: 'Widespread damage in Kashmir Valley. Buildings collapsed in Srinagar, Anantnag, Baramulla. Landslides blocked highways for weeks.',
    severity: 'catastrophic' as const,
  },
  {
    id: 'eq-2',
    date: '1885-05-30',
    magnitude: 6.3,
    epicenter: 'Srinagar',
    distanceFromKashmir: 'Within Valley',
    intensity: 'VIII (Severe)',
    casualties: 'Significant loss of life',
    impact: 'Major destruction in Srinagar city. Many old structures damaged. Ground fissures reported.',
    severity: 'major' as const,
  },
  {
    id: 'eq-3',
    date: '1975-07-29',
    magnitude: 5.5,
    epicenter: 'Kishtwar, Doda',
    distanceFromKashmir: '~150 km',
    intensity: 'VII (Very Strong)',
    casualties: 'Casualties reported',
    impact: 'Damage to structures in Kishtwar and surrounding areas. Felt across Kashmir Valley.',
    severity: 'moderate' as const,
  },
  {
    id: 'eq-4',
    date: '2014-09-18',
    magnitude: 4.8,
    epicenter: 'Gurez, Bandipora',
    distanceFromKashmir: '~80 km',
    intensity: 'V (Moderate)',
    casualties: 'No major casualties',
    impact: 'Felt across northern Kashmir. Minor cracks in buildings in Gurez area.',
    severity: 'minor' as const,
  },
  {
    id: 'eq-5',
    date: '2024-03-28',
    magnitude: 3.8,
    epicenter: 'Tral, Pulwama',
    distanceFromKashmir: '~35 km from Srinagar',
    intensity: 'III-IV (Weak-Light)',
    casualties: 'None reported',
    impact: 'Felt in Tral and surrounding areas. No structural damage. Monitoring for aftershocks.',
    severity: 'minor' as const,
  },
];

// ============================================================================
// District Seismic Profiles
// ============================================================================

const districtSeismicProfiles = [
  { district: 'Srinagar', zone: 'V', buildingsAtRisk: '~45,000', soilType: 'Alluvial (lakebed)', amplificationRisk: 'High', riskLevel: 'high' as const },
  { district: 'Anantnag', zone: 'V', buildingsAtRisk: '~28,000', soilType: 'Karewa + Alluvial', amplificationRisk: 'Moderate-High', riskLevel: 'high' as const },
  { district: 'Baramulla', zone: 'V', buildingsAtRisk: '~32,000', soilType: 'Alluvial + Piedmont', amplificationRisk: 'High', riskLevel: 'high' as const },
  { district: 'Pulwama', zone: 'V', buildingsAtRisk: '~22,000', soilType: 'Karewa Deposits', amplificationRisk: 'Moderate', riskLevel: 'moderate' as const },
  { district: 'Shopian', zone: 'V', buildingsAtRisk: '~15,000', soilType: 'Karewa + Mountainous', amplificationRisk: 'Moderate', riskLevel: 'moderate' as const },
  { district: 'Kupwara', zone: 'V', buildingsAtRisk: '~18,000', soilType: 'Mountainous + Alluvial', amplificationRisk: 'Moderate-High', riskLevel: 'moderate' as const },
  { district: 'Bandipora', zone: 'V', buildingsAtRisk: '~12,000', soilType: 'Alluvial (Wular basin)', amplificationRisk: 'High', riskLevel: 'moderate' as const },
  { district: 'Ganderbal', zone: 'V', buildingsAtRisk: '~16,000', soilType: 'Alluvial + Mountainous', amplificationRisk: 'Moderate-High', riskLevel: 'moderate' as const },
  { district: 'Budgam', zone: 'V', buildingsAtRisk: '~20,000', soilType: 'Karewa + Alluvial', amplificationRisk: 'Moderate', riskLevel: 'moderate' as const },
];

// ============================================================================
// Building Vulnerability Categories
// ============================================================================

const buildingVulnerability = [
  {
    category: 'Mud/Stone Masonry (Unreinforced)',
    prevalence: '~35% of rural structures',
    vulnerability: 'Very High',
    color: 'text-red-400',
    description: 'Most vulnerable. Collapse likely in M6.0+ events. Common in rural Kashmir and old city areas.',
  },
  {
    category: 'Brick Masonry (Unreinforced)',
    prevalence: '~30% of urban structures',
    vulnerability: 'High',
    color: 'text-orange-400',
    description: 'High vulnerability. Prone to out-of-plane wall failure. Common in older Srinagar buildings.',
  },
  {
    category: 'RC Frame (Non-Engineered)',
    prevalence: '~20% of newer urban construction',
    vulnerability: 'Moderate',
    color: 'text-amber-400',
    description: 'Moderate vulnerability. Depends on construction quality. Many buildings lack proper seismic detailing.',
  },
  {
    category: 'RC Shear Wall (Engineered)',
    prevalence: '~10% of institutional buildings',
    vulnerability: 'Low-Moderate',
    color: 'text-blue-400',
    description: 'Best performance. Designed per IS 1893 & IS 13920. Found in hospitals, government buildings.',
  },
  {
    category: 'Timber-Braced (Dhajji Dewari)',
    prevalence: '~5% (heritage structures)',
    vulnerability: 'Low',
    color: 'text-green-400',
    description: 'Traditional Kashmiri timber-laced masonry. Proven seismic resilience in 2005 earthquake.',
  },
];

// ============================================================================
// Fault Systems
// ============================================================================

const faultSystems = [
  {
    name: 'Main Boundary Thrust (MBT)',
    type: 'Reverse/Thrust Fault',
    slipRate: '~2-5 mm/year',
    lastMajorEvent: 'Historical — ongoing strain accumulation',
    significance: 'Primary boundary between Lesser and Higher Himalayas. Source of major historical earthquakes.',
  },
  {
    name: 'Main Central Thrust (MCT)',
    type: 'Reverse/Thrust Fault',
    slipRate: '~1-3 mm/year',
    lastMajorEvent: 'Prehistoric — significant strain accumulation',
    significance: 'Deep crustal fault. Capable of generating M8.0+ events. Major concern for Kashmir.',
  },
  {
    name: 'Himalayan Frontal Thrust (HFT)',
    type: 'Active Thrust Fault',
    slipRate: '~10-20 mm/year',
    lastMajorEvent: 'Segmented — partial ruptures recorded',
    significance: 'Most active fault system. Shallow earthquakes cause maximum surface damage.',
  },
  {
    name: 'Zanskar Fault',
    type: 'Normal/Strike-Slip',
    slipRate: '~1-2 mm/year',
    lastMajorEvent: 'Unknown',
    significance: 'Controls Zanskar range topography. Potential source for damaging intraplate events.',
  },
];

// ============================================================================
// Policy Recommendations
// ============================================================================

const policyRecommendations = [
  {
    priority: 'Critical',
    title: 'Mandatory Seismic Retrofitting of Schools & Hospitals',
    description: 'All schools and hospitals in Zone V must undergo seismic vulnerability assessment and retrofitting within 3 years. Priority to structures built before IS 1893 (2002) code updates.',
    timeline: '1-3 years',
    estimatedCost: 'INR 500-800 Cr',
  },
  {
    priority: 'Critical',
    title: 'Strict Enforcement of Building Codes (IS 1893, IS 13920)',
    description: 'Mandatory seismic design compliance for all new construction. Establish independent structural audit mechanism. Penalize non-compliance.',
    timeline: 'Immediate + ongoing',
    estimatedCost: 'Administrative',
  },
  {
    priority: 'High',
    title: 'District-Level Seismic Microzonation',
    description: 'Detailed microzonation maps for Srinagar, Anantnag, Baramulla, and other urban centers. Identify soil amplification zones and liquefaction-prone areas.',
    timeline: '2-5 years',
    estimatedCost: 'INR 50-100 Cr',
  },
  {
    priority: 'High',
    title: 'Community-Based Earthquake Preparedness',
    description: 'Train community response teams in every tehsil. Conduct annual earthquake drills. Establish neighborhood emergency supply caches.',
    timeline: '1-2 years',
    estimatedCost: 'INR 20-40 Cr',
  },
  {
    priority: 'High',
    title: 'Early Warning System Deployment',
    description: 'Deploy dense seismic sensor network across Kashmir Valley. Integrate with national early warning system. Target 10-30 second advance warning.',
    timeline: '3-5 years',
    estimatedCost: 'INR 100-150 Cr',
  },
  {
    priority: 'Medium',
    title: 'Heritage Structure Preservation & Retrofitting',
    description: 'Identify and retrofit heritage structures using traditional Dhajji Dewari techniques combined with modern engineering. Preserve cultural resilience.',
    timeline: '3-7 years',
    estimatedCost: 'INR 30-50 Cr',
  },
];

// ============================================================================
// Emergency Response Gaps
// ============================================================================

const emergencyResponseGaps = [
  {
    gap: 'Insufficient Seismograph Coverage',
    severity: 'High',
    description: 'Sparse seismic station density in Kashmir Valley delays accurate magnitude and epicenter determination.',
  },
  {
    gap: 'Limited Structural Engineering Capacity',
    severity: 'High',
    description: 'Shortage of trained structural engineers for post-earthquake rapid assessment and retrofitting design.',
  },
  {
    gap: 'Inadequate Emergency Shelter Capacity',
    severity: 'Critical',
    description: 'Current shelter capacity is insufficient for a M7.0+ event. Need 10x expansion of designated safe shelters.',
  },
  {
    gap: 'Communication Infrastructure Vulnerability',
    severity: 'High',
    description: 'Cellular and landline networks vulnerable to seismic damage. No redundant satellite communication backbone.',
  },
  {
    gap: 'Medical Surge Capacity',
    severity: 'Critical',
    description: 'Hospitals lack capacity for mass casualty events. Only 2 trauma centers in the Valley with earthquake-ready infrastructure.',
  },
  {
    gap: 'Search & Rescue Equipment',
    severity: 'Moderate',
    description: 'Limited specialized urban search and rescue (USAR) equipment. Dependence on external NDRF teams with 6-12 hour response time.',
  },
];

// ============================================================================
// Helper Components
// ============================================================================

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function getSeverityBadge(level: string) {
  switch (level) {
    case 'catastrophic':
      return <Badge variant="danger" size="sm">Catastrophic</Badge>;
    case 'major':
      return <Badge variant="danger" size="sm">Major</Badge>;
    case 'moderate':
      return <Badge variant="warning" size="sm">Moderate</Badge>;
    case 'minor':
      return <Badge variant="info" size="sm">Minor</Badge>;
    case 'high':
      return <Badge variant="danger" size="sm">High Risk</Badge>;
    default:
      return <Badge variant="info" size="sm">{level}</Badge>;
  }
}

// ============================================================================
// Main Page Component
// ============================================================================

export default function EarthquakeRiskMonitoringPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">

      {/* ========== HERO SECTION ========== */}
      <section className="relative pt-20 md:pt-48 pb-12 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/60 via-orange-950/30 to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-red-500/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <Link href="/risk-monitoring" className="hover:text-white transition-colors">Risk &amp; Monitoring</Link>
              <span className="text-slate-600">/</span>
              <Link href="/risk-monitoring/hazard-risks" className="hover:text-white transition-colors">Hazard Risks</Link>
              <span className="text-slate-600">/</span>
              <span className="text-white font-medium">Earthquake &amp; Seismic Risk</span>
            </div>

            {/* Title Block */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-2xl">
                <Siren className="w-8 h-8 text-white" />
              </div>
              <Badge variant="danger" size="lg">Zone V — Highest Seismic Hazard</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Earthquake &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Seismic Risk</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              The Kashmir Himalayas sit in Seismic Zone V — India&apos;s highest hazard classification.
              The Indian plate continues thrusting beneath Eurasia at ~2 cm/year, accumulating strain
              that releases as devastating earthquakes. Monitoring, preparedness, and structural
              resilience are critical for the Valley&apos; 20 million+ residents.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white shadow-xl"
                onClick={() => router.push('/risk-monitoring/hazard-risks')}
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Back to Hazard Risks
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                onClick={() => router.push('/risk-monitoring')}
              >
                Overview
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                onClick={() => router.push('/report-issue')}
              >
                <AlertTriangle className="w-5 h-5 mr-2" />
                Report Seismic Event
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== STATS BAR ========== */}
      <section className="py-10 border-y border-white/5 bg-red-950/10">
        <div className="container mx-auto px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { label: 'Seismic Zone', value: 'V', sublabel: 'Highest Hazard (IS 1893)', icon: Map },
              { label: 'Plate Convergence', value: '~2 cm/yr', sublabel: 'Indian → Eurasian plate', icon: Mountain },
              { label: 'Buildings at Risk', value: '~208,000+', sublabel: 'Across all districts', icon: Building2 },
              { label: 'Deadliest Event (2005)', value: 'M7.6', sublabel: '73,000+ killed region-wide', icon: AlertTriangle },
            ].map((stat, idx) => (
              <motion.div key={stat.label} variants={itemVariants} className="text-center">
                <stat.icon className="w-6 h-6 text-red-400 mx-auto mb-2" />
                <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-sm font-semibold text-red-400 mb-0.5">{stat.label}</div>
                <div className="text-xs text-slate-500">{stat.sublabel}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== SEISMIC ZONING ========== */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <Map className="w-6 h-6 text-red-400" />
              <h2 className="text-2xl font-bold text-white">Seismic Zoning — Kashmir in Zone V</h2>
            </div>
            <p className="text-slate-400 max-w-3xl">
              As per the Bureau of Indian Standards (BIS) IS 1893 (2002) seismic zoning map,
              the entire Kashmir Valley falls under Zone V — the highest seismic hazard classification
              in India. This zone is assigned a zone factor of 0.36g peak ground acceleration.
            </p>
          </motion.div>

          {seismicZones.map((zone, idx) => (
            <motion.div
              key={zone.zone}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="glass-intense border-white/10 p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${zone.color} flex items-center justify-center flex-shrink-0`}>
                    <span className="text-2xl font-black text-white">V</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1">{zone.label}</h3>
                    <p className="text-sm text-slate-400 mb-3">{zone.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div>
                        <span className="text-slate-500">Peak Ground Acceleration: </span>
                        <span className="text-red-400 font-semibold">{zone.peakGroundAcceleration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-white mb-3">Districts in Zone V (Kashmir Division):</h4>
                  <div className="flex flex-wrap gap-2">
                    {zone.districts.map((d) => (
                      <Badge key={d} variant="danger" size="sm">{d}</Badge>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========== FAULT SYSTEMS ========== */}
      <section className="py-16 border-y border-white/5">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <Mountain className="w-6 h-6 text-red-400" />
              <h2 className="text-2xl font-bold text-white">Himalayan Thrust Fault Systems</h2>
            </div>
            <p className="text-slate-400 max-w-3xl">
              The Himalayas were formed by the head-on collision of the Indian and Eurasian tectonic plates.
              The Indian plate continues to push northward at ~2 cm/year, building immense pressure that
              releases as earthquakes. Several major thrust faults underlie the Kashmir region.
              <span className="text-slate-500 ml-1">Source: ESRO EIA Report (erc_eienkashmir.htm), THCN (thcnp_eienkashmir.htm)</span>
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {faultSystems.map((fault, idx) => (
              <motion.div key={fault.name} variants={itemVariants}>
                <Card className="glass-intense border-white/10 p-5 h-full">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-base font-bold text-white">{fault.name}</h3>
                    <Badge variant="danger" size="sm">{fault.type}</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-slate-500">Slip Rate: </span>
                      <span className="text-orange-400 font-semibold">{fault.slipRate}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Last Major Event: </span>
                      <span className="text-slate-300">{fault.lastMajorEvent}</span>
                    </div>
                    <p className="text-slate-400 mt-2">{fault.significance}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== HISTORICAL EARTHQUAKES ========== */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <BarChart3 className="w-6 h-6 text-red-400" />
              <h2 className="text-2xl font-bold text-white">Historical Earthquake Events</h2>
            </div>
            <p className="text-slate-400 max-w-3xl">
              Kashmir has experienced significant seismic events throughout recorded history.
              The 2005 Muzaffarabad earthquake remains one of the deadliest in South Asian history.
              The region&apos;s seismic history underscores the persistent and growing threat.
            </p>
          </motion.div>

          <div className="space-y-4">
            {historicalEarthquakes.map((eq, idx) => (
              <motion.div
                key={eq.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.08 }}
              >
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-black text-white">M{eq.magnitude}</div>
                        <div className="text-xs text-slate-500">{new Date(eq.date).getFullYear()}</div>
                      </div>
                      <div className="h-10 w-px bg-white/10" />
                      <div>
                        <h3 className="text-base font-bold text-white">{eq.epicenter}</h3>
                        <div className="text-xs text-slate-500">{eq.distanceFromKashmir}</div>
                      </div>
                    </div>
                    {getSeverityBadge(eq.severity)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                    <div>
                      <span className="text-slate-500">Intensity: </span>
                      <span className="text-orange-400 font-semibold">{eq.intensity}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Casualties: </span>
                      <span className="text-red-400">{eq.casualties}</span>
                    </div>
                  </div>

                  <p className="text-sm text-slate-400">{eq.impact}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BUILDING VULNERABILITY ========== */}
      <section className="py-16 border-y border-white/5">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <Building2 className="w-6 h-6 text-orange-400" />
              <h2 className="text-2xl font-bold text-white">Building Vulnerability Assessment</h2>
            </div>
            <p className="text-slate-400 max-w-3xl">
              Kashmir&apos;s building stock exhibits varying degrees of seismic vulnerability.
              Traditional Dhajji Dewari (timber-braced) construction has demonstrated remarkable
              resilience, while unreinforced masonry poses the greatest risk. An estimated 65%
              of structures lack adequate seismic design provisions.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {buildingVulnerability.map((bv, idx) => (
              <motion.div key={bv.category} variants={itemVariants}>
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-base font-bold text-white">{bv.category}</h3>
                    <span className={`text-sm font-semibold ${bv.color}`}>{bv.vulnerability} Vulnerability</span>
                  </div>
                  <div className="text-sm text-slate-400">
                    <span className="text-slate-500">Prevalence: </span>
                    {bv.prevalence}
                  </div>
                  <p className="text-sm text-slate-400 mt-1">{bv.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== DISTRICT SEISMIC PROFILES ========== */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <Map className="w-6 h-6 text-red-400" />
              <h2 className="text-2xl font-bold text-white">District-Level Seismic Profiles</h2>
            </div>
            <p className="text-slate-400 max-w-3xl">
              All Kashmir districts fall under Zone V. However, local soil conditions,
              building stock composition, and population density create significant variation
              in actual seismic risk at the district level.
            </p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">District</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Zone</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Buildings at Risk</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Soil Type</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Amplification Risk</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Risk Level</th>
                </tr>
              </thead>
              <tbody>
                {districtSeismicProfiles.map((d, idx) => (
                  <motion.tr
                    key={d.district}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-4 text-sm font-medium text-white">{d.district}</td>
                    <td className="py-3 px-4">
                      <Badge variant="danger" size="sm">V</Badge>
                    </td>
                    <td className="py-3 px-4 text-sm text-slate-300">{d.buildingsAtRisk}</td>
                    <td className="py-3 px-4 text-sm text-slate-400">{d.soilType}</td>
                    <td className="py-3 px-4 text-sm text-orange-400">{d.amplificationRisk}</td>
                    <td className="py-3 px-4">
                      {d.riskLevel === 'high'
                        ? <Badge variant="danger" size="sm">High</Badge>
                        : <Badge variant="warning" size="sm">Moderate</Badge>
                      }
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ========== EMERGENCY RESPONSE GAPS ========== */}
      <section className="py-16 border-y border-white/5 bg-red-950/10">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-6 h-6 text-red-400" />
              <h2 className="text-2xl font-bold text-white">Emergency Response Gaps</h2>
            </div>
            <p className="text-slate-400 max-w-3xl">
              Despite Kashmir&apos;s Zone V classification, critical gaps remain in earthquake
              preparedness, response capacity, and recovery infrastructure.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {emergencyResponseGaps.map((gap, idx) => (
              <motion.div key={gap.gap} variants={itemVariants}>
                <Card className="glass-intense border-white/10 p-5 h-full">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-sm font-bold text-white">{gap.gap}</h3>
                    <Badge variant={gap.severity === 'Critical' ? 'danger' : gap.severity === 'High' ? 'warning' : 'info'} size="sm">
                      {gap.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400">{gap.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== POLICY RECOMMENDATIONS ========== */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="w-6 h-6 text-red-400" />
              <h2 className="text-2xl font-bold text-white">Policy Recommendations</h2>
            </div>
            <p className="text-slate-400 max-w-3xl">
              Evidence-based recommendations for strengthening Kashmir&apos;s earthquake resilience,
              informed by the 2005 Muzaffarabad earthquake lessons and ESRO environmental assessments.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {policyRecommendations.map((rec, idx) => (
              <motion.div key={rec.title} variants={itemVariants}>
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-base font-bold text-white">{rec.title}</h3>
                    <Badge variant={rec.priority === 'Critical' ? 'danger' : rec.priority === 'High' ? 'warning' : 'info'} size="sm">
                      {rec.priority} Priority
                    </Badge>
                  </div>
                  <p className="text-sm text-slate-400 mb-3">{rec.description}</p>
                  <div className="flex flex-wrap gap-6 text-xs text-slate-500">
                    <div>
                      <span className="text-slate-600">Timeline: </span>
                      <span className="text-slate-400">{rec.timeline}</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Estimated Cost: </span>
                      <span className="text-slate-400">{rec.estimatedCost}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="py-16 border-t border-white/5">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-orange-950/20 to-slate-950/50" />

            <div className="relative z-10 p-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto"
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-2xl">
                    <Siren className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Earthquake Preparedness Starts With You
                </h2>
                <p className="text-slate-400 mb-8 max-w-2xl mx-auto text-lg">
                  Kashmir is in the highest seismic hazard zone. Every resident should know
                  what to do before, during, and after an earthquake. Report felt tremors,
                  learn safety protocols, and help build a resilient Kashmir.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white shadow-xl"
                    onClick={() => router.push('/report-issue')}
                  >
                    <Siren className="w-5 h-5 mr-2" />
                    Report Felt Tremor
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/5"
                    onClick={() => router.push('/risk-monitoring/hazard-risks')}
                  >
                    <ArrowRight className="w-5 h-5 mr-2" />
                    All Hazard Risks
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/5"
                    onClick={() => router.push('/risk-monitoring/shelters-closures-emergency-routes')}
                  >
                    <Shield className="w-5 h-5 mr-2" />
                    Emergency Routes
                  </Button>
                </div>
              </motion.div>
            </div>
          </Card>
        </div>
      </section>

      {/* ========== ATTRIBUTION ========== */}
      <section className="py-8 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center text-xs text-slate-500 space-y-1">
            <p>
              Seismic risk data sourced from: Bureau of Indian Standards IS 1893 (2002),
              ESRO Environmental Impact Assessment Report (erc_eienkashmir.htm),
              Trans Himalaya Conservation Network (thcnp_eienkashmir.htm),
              and community monitoring data.
            </p>
            <p>
              Historical earthquake records compiled from USGS, IMD, and regional seismic catalogs.
              Building vulnerability estimates are indicative and require professional assessment.
            </p>
            <p className="text-slate-600">
              Kashmir Environmental Intelligence Platform — Seismic Risk Intelligence Module
            </p>
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
