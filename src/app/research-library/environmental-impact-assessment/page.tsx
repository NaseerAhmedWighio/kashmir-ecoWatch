'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen, FileText, Droplet, Mountain, Trees, Waves,
  AlertTriangle, Map, Users, Activity, ExternalLink,
  ArrowRight, Shield, Database, Beaker, BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

// ─── Animation variants ────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: 'easeOut' },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

// ─── Data: Key Findings ────────────────────────────────────────────────
const keyFindings = [
  {
    icon: Droplet,
    title: 'Water Resources',
    finding: 'Springs, wells & baulies are drying up across J&K',
    details: [
      'Sewage and drain water contaminating drinking sources',
      'Pesticide pollution in surface & groundwater',
      'Rainfall: 600–900mm (Srinagar), 1000–1100mm (Jammu), 100–300mm (Ladakh)',
    ],
    color: 'from-blue-500 to-cyan-400',
    bgGlow: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
  {
    icon: Mountain,
    title: 'Soil Degradation',
    finding: '7 MHA (31.6% of state area) affected by degradation',
    details: [
      '24.6% affected by water erosion',
      '6.1% affected by wind erosion',
      'Leh & Kargil: severe wind erosion; Kashmir: water erosion; Jammu: both',
    ],
    color: 'from-amber-500 to-orange-400',
    bgGlow: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
  },
  {
    icon: Trees,
    title: 'Forest Degradation',
    finding: '20,433 km² forest area — 54% dense / 46% open',
    details: [
      '2,669 forest fires recorded 1990–2000',
      'J&K has 2nd highest deforestation rate in India',
      'Gujjar/Bakarwal grazing pressure on alpine pastures',
    ],
    color: 'from-emerald-500 to-green-400',
    bgGlow: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
  },
  {
    icon: Waves,
    title: 'Wetland Threats',
    finding: 'Dal Lake & major wetlands face unprecedented pollution',
    details: [
      'Unsustainable development encroaching water bodies',
      'Eutrophication from sewage & agricultural runoff',
      'Shrinking surface area of major lakes',
    ],
    color: 'from-cyan-500 to-teal-400',
    bgGlow: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
  },
  {
    icon: Activity,
    title: 'Biodiversity Erosion',
    finding: 'Species extinction & habitat destruction accelerating',
    details: [
      'Habitat fragmentation from infrastructure',
      'Human-wildlife conflict rising',
      'Loss of endemic species in alpine zones',
    ],
    color: 'from-violet-500 to-purple-400',
    bgGlow: 'bg-violet-500/10',
    borderColor: 'border-violet-500/20',
  },
  {
    icon: Users,
    title: 'Socio-Economic Impact',
    finding: 'Rural livelihoods & agriculture under severe stress',
    details: [
      'Water-borne diseases from contaminated sources',
      'Agricultural yield declining from soil degradation',
      'Pastoralist communities losing grazing lands',
    ],
    color: 'from-rose-500 to-pink-400',
    bgGlow: 'bg-rose-500/10',
    borderColor: 'border-rose-500/20',
  },
];

// ─── Data: Report Sections ─────────────────────────────────────────────
const reportSections = [
  {
    number: 1,
    title: 'Precipitation & Water Resources',
    icon: Droplet,
    gradient: 'from-blue-600 to-cyan-500',
    content: (
      <div className="space-y-4 text-slate-300">
        <p>
          The J&K state exhibits extreme precipitation gradients driven by topography and
          monsoon-western disturbance interactions. The ESRO/eIEN report documents rainfall
          patterns critical to understanding water availability across the three regions.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { region: 'Srinagar (Kashmir Valley)', rainfall: '600–900 mm', season: 'Spring + Monsoon' },
            { region: 'Jammu (Outer Plains)', rainfall: '1000–1100 mm', season: 'Monsoon dominant' },
            { region: 'Ladakh (Trans-Himalaya)', rainfall: '100–300 mm', season: 'Winter snow' },
          ].map((r) => (
            <div
              key={r.region}
              className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-4"
            >
              <p className="text-sm font-semibold text-white">{r.region}</p>
              <p className="text-2xl font-bold text-blue-400 mt-1">{r.rainfall}</p>
              <p className="text-xs text-slate-400 mt-1">{r.season}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
          <p className="text-sm font-semibold text-amber-300 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Critical Finding
          </p>
          <p className="text-sm mt-1">
            Springs, wells, and baulies (traditional water sources) are drying up across the
            Kashmir Valley. Contamination from sewage and drain water, combined with pesticide
            leaching, has severely compromised drinking water quality. The report documents
            widespread pollution in both surface and groundwater systems.
          </p>
        </div>
      </div>
    ),
  },
  {
    number: 2,
    title: 'Soil Degradation',
    icon: Mountain,
    gradient: 'from-amber-600 to-orange-500',
    content: (
      <div className="space-y-4 text-slate-300">
        <p>
          Soil degradation in J&K affects <strong className="text-white">7 MHA (31.6% of the
          state&apos;s total area)</strong>, making it one of the most significantly affected
          regions in India. The ESRO assessment breaks down degradation by type and region.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total Degraded', value: '7 MHA', pct: '31.6%', color: 'text-amber-400' },
            { label: 'Water Erosion', value: '—', pct: '24.6%', color: 'text-blue-400' },
            { label: 'Wind Erosion', value: '—', pct: '6.1%', color: 'text-orange-400' },
            { label: 'Other Causes', value: '—', pct: '0.9%', color: 'text-slate-400' },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-slate-700 bg-slate-800/50 p-3 text-center"
            >
              <p className="text-xs text-slate-400">{s.label}</p>
              <p className={`text-xl font-bold mt-1 ${s.color}`}>
                {s.value !== '—' ? s.value : s.pct}
              </p>
              {s.value !== '—' && <p className="text-xs text-slate-500">{s.pct} of degraded</p>}
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <h5 className="text-sm font-semibold text-white">Regional Breakdown</h5>
          {[
            { region: 'Leh (Ladakh)', issues: 'Wind erosion, glacial silt deposition, cold desert conditions' },
            { region: 'Kargil (Ladakh)', issues: 'Wind erosion, steep slope degradation, limited soil cover' },
            { region: 'Kashmir Valley', issues: 'Water erosion from hills, pesticide contamination (DDT, BHC, Endosulfan)' },
            { region: 'Jammu Plains', issues: 'Water & wind erosion, agricultural chemical loading' },
          ].map((r) => (
            <div key={r.region} className="flex gap-3 items-start rounded-lg border border-slate-700/50 bg-slate-800/30 p-3">
              <Map className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-white">{r.region}</p>
                <p className="text-xs text-slate-400">{r.issues}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    number: 3,
    title: 'Livestock-Related Degradation',
    icon: Users,
    gradient: 'from-orange-600 to-red-500',
    content: (
      <div className="space-y-4 text-slate-300">
        <p>
          Livestock grazing, particularly by the Gujjar and Bakarwal pastoralist communities,
          exerts significant pressure on alpine pastures (margs) and forest understory. The
          ESRO report documents the intersection of traditional pastoralism with modern
          environmental stressors.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              title: 'Overgrazing Impact',
              desc: 'Alpine meadows (margs) degraded by sustained grazing pressure, reducing grassland biodiversity and soil stability.',
            },
            {
              title: 'Pesticide Contamination',
              desc: 'DDT, BHC, and Endosulfan detected in soil and water systems. These persistent organic pollutants bioaccumulate through the food chain.',
            },
            {
              title: 'Nutrient Loading',
              desc: 'Livestock waste contributes to nutrient loading in water bodies, accelerating eutrophication in Dal Lake and other wetlands.',
            },
            {
              title: 'Soil Compaction',
              desc: 'Heavy grazing pressure on slopes leads to soil compaction, reducing infiltration and increasing surface runoff and erosion.',
            },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-xl border border-orange-500/20 bg-orange-500/5 p-4"
            >
              <p className="text-sm font-semibold text-white">{c.title}</p>
              <p className="text-xs text-slate-400 mt-1">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    number: 4,
    title: 'Forest Degradation',
    icon: Trees,
    gradient: 'from-emerald-600 to-green-500',
    content: (
      <div className="space-y-4 text-slate-300">
        <p>
          Jammu & Kashmir holds <strong className="text-white">20,433 km² of forest area</strong>,
          split between <strong className="text-emerald-400">54% dense forest</strong> and{' '}
          <strong className="text-emerald-400">46% open forest</strong>. Despite this significant
          cover, the state records the <strong className="text-red-400">2nd highest deforestation
          rate in India</strong>.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Total Forest', value: '20,433 km²', color: 'text-emerald-400' },
            { label: 'Dense Forest', value: '54%', color: 'text-green-400' },
            { label: 'Open Forest', value: '46%', color: 'text-yellow-400' },
            { label: 'Fires (1990–2000)', value: '2,669', color: 'text-red-400' },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-center"
            >
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-slate-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <p className="text-sm font-semibold text-red-300 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" /> Alarm: 2nd Highest Deforestation in India
          </p>
          <p className="text-sm mt-1">
            The ESRO report identifies J&K as having the second-highest deforestation rate in
            India. Drivers include illegal logging, infrastructure expansion, settlement growth,
            and conversion of forest land for agriculture. Forest fires (2,669 events in a single
            decade) compound this loss, particularly in coniferous zones.
          </p>
        </div>
        <div className="space-y-2">
          <h5 className="text-sm font-semibold text-white">Fire Impact by Zone</h5>
          {[
            { zone: 'Coniferous Belt (Pine, Fir, Deodar)', risk: 'High — most fires recorded' },
            { zone: 'Broadleaf (Oak, Maple)', risk: 'Moderate — seasonal fires' },
            { zone: 'Alpine Scrub', risk: 'Low-Moderate — limited fuel load' },
            { zone: 'Riverine Forests', risk: 'Low — high moisture content' },
          ].map((z) => (
            <div key={z.zone} className="flex justify-between items-center rounded-lg border border-slate-700/50 bg-slate-800/30 p-3">
              <p className="text-sm text-white">{z.zone}</p>
              <Badge variant="outline" className="text-xs">{z.risk}</Badge>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    number: 5,
    title: 'Threats to Wetlands',
    icon: Waves,
    gradient: 'from-cyan-600 to-teal-500',
    content: (
      <div className="space-y-4 text-slate-300">
        <p>
          The wetlands of Kashmir — particularly Dal Lake, Wular Lake, Manasbal, and
          Hokersar — face unprecedented threats from pollution, encroachment, and unsustainable
          development. The ESRO report documents systematic degradation of these critical
          ecosystems.
        </p>
        <div className="space-y-3">
          {[
            {
              name: 'Dal Lake',
              threat: 'Eutrophication from sewage inflow, weed proliferation, houseboat pollution',
              status: 'Critical',
              statusColor: 'text-red-400',
              statusBg: 'bg-red-500/10',
              statusBorder: 'border-red-500/20',
            },
            {
              name: 'Wular Lake',
              threat: 'Siltation from catchment erosion, willow plantation encroachment',
              status: 'Severe',
              statusColor: 'text-orange-400',
              statusBg: 'bg-orange-500/10',
              statusBorder: 'border-orange-500/20',
            },
            {
              name: 'Manasbal Lake',
              threat: 'Agricultural runoff, nutrient loading, weed infestation',
              status: 'High Risk',
              statusColor: 'text-amber-400',
              statusBg: 'bg-amber-500/10',
              statusBorder: 'border-amber-500/20',
            },
            {
              name: 'Hokersar Wetland',
              threat: 'Habitat degradation, water regime alteration, migratory bird disruption',
              status: 'Moderate',
              statusColor: 'text-yellow-400',
              statusBg: 'bg-yellow-500/10',
              statusBorder: 'border-yellow-500/20',
            },
          ].map((w) => (
            <div
              key={w.name}
              className={`rounded-xl border ${w.statusBorder} ${w.statusBg} p-4`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">{w.name}</p>
                  <p className="text-xs text-slate-400 mt-1">{w.threat}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${w.statusBg} ${w.statusColor} border ${w.statusBorder}`}>
                  {w.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    number: 6,
    title: 'Socio-Economic Issues',
    icon: Users,
    gradient: 'from-rose-600 to-pink-500',
    content: (
      <div className="space-y-4 text-slate-300">
        <p>
          Environmental degradation in J&K has direct and measurable impacts on human health,
          rural livelihoods, and agricultural productivity. The ESRO report links ecological
          decline to socio-economic vulnerability across the state.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              title: 'Water-Borne Diseases',
              desc: 'Contaminated drinking water sources have led to increased incidence of gastrointestinal diseases, particularly in rural areas dependent on springs and wells.',
              icon: Beaker,
            },
            {
              title: 'Agricultural Decline',
              desc: 'Soil degradation and pesticide contamination have reduced agricultural yields. Orchards and paddy fields face dual stress from chemical loading and erosion.',
              icon: BarChart3,
            },
            {
              title: 'Pastoralist Livelihoods',
              desc: 'Gujjar and Bakarwal communities face shrinking grazing lands as alpine meadows degrade and forest access is restricted.',
              icon: Mountain,
            },
            {
              title: 'Fisheries Impact',
              desc: 'Wetland pollution and eutrophication have damaged fish populations in Dal, Wular, and other lake ecosystems, affecting local fishing communities.',
              icon: Waves,
            },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4"
            >
              <c.icon className="w-5 h-5 text-rose-400 mb-2" />
              <p className="text-sm font-semibold text-white">{c.title}</p>
              <p className="text-xs text-slate-400 mt-1">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

// ─── Data: District Profiles ───────────────────────────────────────────
const districtProfiles = [
  {
    district: 'Srinagar',
    region: 'Kashmir',
    rainfall: '600–900 mm',
    keyIssues: ['Dal Lake eutrophication', 'Urban encroachment', 'Sewage contamination', 'Wetland shrinkage'],
    icon: Waves,
  },
  {
    district: 'Anantnag',
    region: 'Kashmir',
    rainfall: '700–900 mm',
    keyIssues: ['Spring depletion', 'Forest fire risk', 'Orchard chemical loading', 'Hill slope erosion'],
    icon: Droplet,
  },
  {
    district: 'Baramulla',
    region: 'Kashmir',
    rainfall: '700–900 mm',
    keyIssues: ['Wular Lake siltation', 'Willow encroachment', 'Deforestation', 'Floodplain degradation'],
    icon: Trees,
  },
  {
    district: 'Leh',
    region: 'Ladakh',
    rainfall: '100–300 mm',
    keyIssues: ['Cold desert conditions', 'Wind erosion', 'Glacial retreat', 'Pasture degradation'],
    icon: Mountain,
  },
  {
    district: 'Kargil',
    region: 'Ladakh',
    rainfall: '100–300 mm',
    keyIssues: ['Steep slope erosion', 'Limited soil cover', 'Glacial silt', 'Sparse vegetation'],
    icon: Mountain,
  },
  {
    district: 'Jammu',
    region: 'Jammu',
    rainfall: '1000–1100 mm',
    keyIssues: ['Water + wind erosion', 'Agricultural chemical loading', 'Siwalik deforestation', 'Urban expansion'],
    icon: AlertTriangle,
  },
];

// ─── Data: Policy Recommendations ──────────────────────────────────────
const policyRecommendations = [
  {
    priority: 'Critical',
    title: 'Water Source Protection',
    desc: 'Immediate mapping and protection of springs, wells, and baulies. Establish sewage interception before discharge into water bodies. Ban pesticide use in catchment areas.',
    icon: Shield,
  },
  {
    priority: 'Critical',
    title: 'Wetland Restoration',
    desc: 'Launch comprehensive Dal Lake and Wular Lake restoration programs. Remove encroachments, establish sewage treatment, and implement weed management.',
    icon: Waves,
  },
  {
    priority: 'High',
    title: 'Forest Fire Management',
    desc: 'Deploy early warning systems for fire-prone zones. Community-based fire management with 2,669 historical fire events as baseline for risk modeling.',
    icon: AlertTriangle,
  },
  {
    priority: 'High',
    title: 'Soil Conservation',
    desc: 'Implement erosion control measures across 7 MHA of degraded land. Transition away from persistent pesticides (DDT, BHC, Endosulfan) to integrated pest management.',
    icon: Mountain,
  },
  {
    priority: 'Medium',
    title: 'Pastoralist Support',
    desc: 'Develop sustainable grazing management plans for Gujjar and Bakarwal communities. Restore alpine meadows through rotational grazing protocols.',
    icon: Users,
  },
  {
    priority: 'Medium',
    title: 'Biodiversity Monitoring',
    desc: 'Establish systematic biodiversity monitoring across all districts. Track species decline, habitat fragmentation, and human-wildlife conflict patterns.',
    icon: Activity,
  },
];

// ─── Main Page Component ───────────────────────────────────────────────
export default function EnvironmentalImpactAssessmentPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Background gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Breadcrumb ──────────────────────────────────────────── */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/research-library" className="hover:text-white transition-colors">Research Library</Link>
          <span>/</span>
          <span className="text-slate-200">Environmental Impact Assessment</span>
        </nav>

        {/* ── Hero ────────────────────────────────────────────────── */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-10"
        >
          <motion.div variants={fadeInUp} className="flex items-center gap-3 mb-4">
            <Badge variant="outline" className="border-blue-500/30 text-blue-400 bg-blue-500/10">
              <BookOpen className="w-3.5 h-3.5 mr-1.5" />
              Research Library
            </Badge>
            <Badge variant="outline" className="border-amber-500/30 text-amber-400 bg-amber-500/10">
              ESRO Archive
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight"
          >
            Environmental Impact Assessment Report
            <span className="block text-xl sm:text-2xl font-normal text-slate-400 mt-2">
              Jammu & Kashmir — Baseline Environmental Data
            </span>
          </motion.h1>

          <motion.p variants={fadeInUp} className="mt-4 text-slate-400 max-w-3xl text-base leading-relaxed">
            Comprehensive environmental impact assessment sourced from the ESRO/eIEN Kashmir
            archive. This report documents baseline conditions across water resources, soil
            degradation, forest cover, wetland health, biodiversity, and socio-economic
            conditions throughout Jammu & Kashmir.
          </motion.p>
        </motion.section>

        {/* ── ESRO Attribution Box ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mb-10 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-sm p-5"
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Database className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-300">ESRO Attribution — ESRO/eIEN Kashmir Archive</p>
              <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                This Environmental Impact Assessment is sourced from the <strong className="text-slate-200">Environmental
                Data Resource Observatory (ESRO)</strong> legacy archive, originally hosted on the eIEN Kashmir
                platform. The data represents baseline environmental conditions documented through field surveys,
                satellite analysis, and government records. All findings have been preserved from the original
                ESRO report and attributed to their source.
              </p>
              <div className="flex flex-wrap gap-2 mt-3">
                <Badge variant="outline" className="text-xs border-emerald-500/30 text-emerald-400 bg-emerald-500/10">
                  Source: ESRO/eIEN
                </Badge>
                <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-400 bg-blue-500/10">
                  Type: Environmental Impact Assessment
                </Badge>
                <Badge variant="outline" className="text-xs border-violet-500/30 text-violet-400 bg-violet-500/10">
                  Status: Archived — Preserved
                </Badge>
                <Badge variant="outline" className="text-xs border-amber-500/30 text-amber-400 bg-amber-500/10">
                  Verification: Cross-referenced
                </Badge>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Key Findings Summary Cards ──────────────────────────── */}
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-xl font-bold text-white mb-1">Key Findings Summary</h2>
          <p className="text-sm text-slate-400 mb-5">Critical environmental indicators from the ESRO baseline assessment</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {keyFindings.map((kf, i) => (
              <motion.div
                key={kf.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
                className={`rounded-2xl border ${kf.borderColor} bg-slate-900/80 backdrop-blur-sm overflow-hidden group hover:border-opacity-40 transition-all duration-300`}
              >
                <div className={`h-1 bg-gradient-to-r ${kf.color}`} />
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-9 h-9 rounded-lg ${kf.bgGlow} flex items-center justify-center`}>
                      <kf.icon className={`w-5 h-5 bg-gradient-to-r ${kf.color} bg-clip-text`} style={{ color: 'currentColor' }} />
                    </div>
                    <h3 className="text-sm font-semibold text-white">{kf.title}</h3>
                  </div>
                  <p className="text-sm text-slate-200 font-medium mb-3">{kf.finding}</p>
                  <ul className="space-y-1.5">
                    {kf.details.map((d) => (
                      <li key={d} className="text-xs text-slate-400 flex items-start gap-2">
                        <ArrowRight className="w-3 h-3 text-slate-500 mt-0.5 flex-shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Report Sections (Detailed Breakdown) ────────────────── */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-1">Report Sections — Detailed Breakdown</h2>
          <p className="text-sm text-slate-400 mb-6">Section-by-section analysis of the ESRO Environmental Impact Assessment</p>

          <div className="space-y-6">
            {reportSections.map((section, i) => (
              <motion.div
                key={section.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm overflow-hidden"
              >
                {/* Section Header */}
                <div className={`h-1 bg-gradient-to-r ${section.gradient}`} />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${section.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                      {section.number}
                    </div>
                    <div className="flex items-center gap-2">
                      <section.icon className={`w-5 h-5 bg-gradient-to-r ${section.gradient} bg-clip-text`} style={{ color: 'currentColor' }} />
                      <h3 className="text-lg font-bold text-white">{section.title}</h3>
                    </div>
                  </div>

                  {section.content}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── District-Level Environmental Profiles ───────────────── */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-1">District-Level Environmental Profiles</h2>
          <p className="text-sm text-slate-400 mb-6">Environmental conditions extracted from ESRO findings by district</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {districtProfiles.map((dp, i) => (
              <motion.div
                key={dp.district}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm p-5 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
                    <dp.icon className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{dp.district}</p>
                    <p className="text-xs text-slate-500">{dp.region} Region</p>
                  </div>
                </div>

                <div className="rounded-lg bg-slate-800/50 border border-slate-700/50 px-3 py-2 mb-3">
                  <p className="text-xs text-slate-400">Annual Rainfall</p>
                  <p className="text-base font-bold text-blue-400">{dp.rainfall}</p>
                </div>

                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-slate-400">Key Environmental Issues</p>
                  {dp.keyIssues.map((issue) => (
                    <div key={issue} className="flex items-start gap-2">
                      <AlertTriangle className="w-3 h-3 text-amber-500 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-slate-300">{issue}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Policy Recommendations ──────────────────────────────── */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-1">Policy Recommendations</h2>
          <p className="text-sm text-slate-400 mb-6">Derived from ESRO environmental impact findings</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {policyRecommendations.map((rec, i) => (
              <motion.div
                key={rec.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: i * 0.05, duration: 0.35 }}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm p-5"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center">
                      <rec.icon className="w-4 h-4 text-blue-400" />
                    </div>
                    <h3 className="text-sm font-semibold text-white">{rec.title}</h3>
                  </div>
                  <Badge
                    variant="outline"
                    className={`text-xs flex-shrink-0 ${
                      rec.priority === 'Critical'
                        ? 'border-red-500/30 text-red-400 bg-red-500/10'
                        : rec.priority === 'High'
                        ? 'border-amber-500/30 text-amber-400 bg-amber-500/10'
                        : 'border-blue-500/30 text-blue-400 bg-blue-500/10'
                    }`}
                  >
                    {rec.priority}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{rec.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── Research Library Metadata ───────────────────────────── */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <FileText className="w-5 h-5 text-slate-400" />
              <h3 className="text-lg font-bold text-white">Research Library Metadata</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Source', value: 'ESRO / eIEN Kashmir Archive', icon: Database },
                { label: 'Document Type', value: 'Environmental Impact Assessment', icon: FileText },
                { label: 'Geographic Scope', value: 'Jammu & Kashmir (All 3 Regions)', icon: Map },
                { label: 'Verification Status', value: 'Cross-Referenced & Preserved', icon: Shield },
                { label: 'Topics Covered', value: 'Water, Soil, Forest, Wetlands, Biodiversity, Socio-Economic', icon: BookOpen },
                { label: 'Data Sources', value: 'Field Surveys, Satellite, Government Records', icon: BarChart3 },
                { label: 'Key Statistics', value: '7 MHA degraded, 2,669 fires, 20,433 km² forest', icon: Activity },
                { label: 'Archive Status', value: 'Preserved from ESRO Legacy Platform', icon: ExternalLink },
              ].map((meta) => (
                <div key={meta.label} className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <meta.icon className="w-3.5 h-3.5 text-slate-500" />
                    <p className="text-xs text-slate-500 font-medium">{meta.label}</p>
                  </div>
                  <p className="text-sm text-slate-200">{meta.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Bottom CTA ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-slate-800 bg-gradient-to-r from-blue-500/5 to-emerald-500/5 backdrop-blur-sm p-8 text-center"
        >
          <h3 className="text-xl font-bold text-white mb-2">Explore the Full Research Library</h3>
          <p className="text-sm text-slate-400 max-w-xl mx-auto mb-5">
            This EIA report is part of a comprehensive environmental research archive.
            Browse all preserved documents and assessments.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/research-library">
              <Button variant="primary" size="md" icon={<BookOpen className="w-4 h-4" />}>
                Browse Research Library
              </Button>
            </Link>
            <Link href="/districts">
              <Button variant="outline" size="md" icon={<Map className="w-4 h-4" />}>
                District Profiles
              </Button>
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
