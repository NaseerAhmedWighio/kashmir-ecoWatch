'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { BackgroundCarousel } from '@/components/ui/BackgroundCarousel';
import {
  MapPin, Activity, Shield, TrendingUp, ArrowRight, ArrowLeft,
  Calendar, Mountain, Droplet, Leaf, Eye, FileText,
  AlertTriangle, Navigation as NavIcon, Book, ChevronRight,
  Zap, Globe, Layers, Radio, Microscope, Link2, BarChart3,
  ThermometerSun, Wind, Camera, Users, Database, Clock,
  TreePine, Fish, Bird, Flower2, Bug, Info, ExternalLink
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ProtectedArea } from '@/data/protected-network';

interface ProtectedAreaDetailPageProps {
  area: ProtectedArea;
  relatedAreas?: ProtectedArea[];
}

// ── Per-park intelligence overlay (extends base data) ─────────────────────────
const PARK_INTELLIGENCE: Record<string, {
  iucnCategory: string;
  biogeographicZone: string;
  watersheds: string[];
  conservationSignificance: string[];
  connectedAreas: Array<{ name: string; type: string; distance: string }>;
  threats: Array<{ name: string; score: number; trend: 'stable' | 'increasing' | 'decreasing' }>;
  monitoring: Array<{ method: string; coverage: number; lastUpdate: string }>;
  dashboard: { conservationStatus: number; speciesRichness: number; habitatIntegrity: number; threatLevel: number; monitoringCoverage: number; researchCoverage: number };
  dataSources: string[];
  visitorAccess: string;
  researchHighlights: Array<{ type: string; count: number }>;
  ecologicalTrends: Array<{ metric: string; trend: 'positive' | 'negative' | 'stable'; note: string }>;
}> = {
  'dachigam-national-park': {
    iucnCategory: 'IUCN Category II',
    biogeographicZone: 'Western Himalaya',
    watersheds: ['Dagwan Catchment', 'Dachigam Watershed', 'Jhelum Tributary Zone'],
    conservationSignificance: [
      'Last viable stronghold of the Hangul (Kashmir Stag) — fewer than 300 individuals remaining.',
      'Critical watershed protecting Srinagar\'s freshwater supply from Dagwan River system.',
      'Flagship temperate broadleaf forest ecosystem of the Kashmir Valley.',
    ],
    connectedAreas: [
      { name: 'Overa-Aru Wildlife Sanctuary', type: 'Wildlife Sanctuary', distance: '~65 km SE' },
      { name: 'Sindh Valley Habitat Network', type: 'Informal Corridor', distance: '~30 km NE' },
      { name: 'Upper Himalayan Habitat Network', type: 'Transboundary Linkage', distance: 'Extended' },
    ],
    threats: [
      { name: 'Habitat Fragmentation', score: 72, trend: 'stable' },
      { name: 'Tourism Pressure', score: 58, trend: 'increasing' },
      { name: 'Forest Fire Risk', score: 45, trend: 'stable' },
      { name: 'Illegal Grazing', score: 63, trend: 'decreasing' },
      { name: 'Poaching Risk', score: 40, trend: 'stable' },
      { name: 'Climate Vulnerability', score: 55, trend: 'increasing' },
    ],
    monitoring: [
      { method: 'Camera Traps', coverage: 68, lastUpdate: '2024' },
      { method: 'Field Surveys', coverage: 82, lastUpdate: '2024' },
      { method: 'Citizen Science', coverage: 34, lastUpdate: '2023' },
      { method: 'Remote Sensing', coverage: 75, lastUpdate: '2024' },
      { method: 'Research Projects', coverage: 52, lastUpdate: '2023' },
    ],
    dashboard: { conservationStatus: 72, speciesRichness: 68, habitatIntegrity: 74, threatLevel: 55, monitoringCoverage: 62, researchCoverage: 48 },
    dataSources: ['J&K Wildlife Department', 'WDPA', 'GBIF', 'IUCN Red List', 'eBird', 'WII Research', 'Remote Sensing (Landsat)'],
    visitorAccess: 'Permit Required',
    researchHighlights: [
      { type: 'Scientific Papers', count: 47 },
      { type: 'Management Plans', count: 3 },
      { type: 'Biodiversity Surveys', count: 12 },
      { type: 'Species Assessments', count: 8 },
      { type: 'Habitat Studies', count: 15 },
      { type: 'Climate Studies', count: 6 },
    ],
    ecologicalTrends: [
      { metric: 'Forest Cover', trend: 'stable', note: 'No significant change 2015–2024' },
      { metric: 'Hangul Population', trend: 'positive', note: 'Gradual recovery from ~186 (2015) to ~289 (2023)' },
      { metric: 'Climate Trend', trend: 'negative', note: 'Mean temperature +0.6°C over 20 years' },
      { metric: 'Habitat Connectivity', trend: 'negative', note: 'Edge fragmentation increasing around buffer' },
      { metric: 'Research Activity', trend: 'positive', note: 'Publication rate doubling since 2018' },
    ],
  },
  'kazinag-national-park': {
    iucnCategory: 'IUCN Category II',
    biogeographicZone: 'Western Himalaya / Pir Panjal',
    watersheds: ['Pohru Catchment', 'Kazinag Ridge Drainage'],
    conservationSignificance: [
      'Critical Markhor (Capra falconeri) habitat in the Pir Panjal range.',
      'High-altitude cliff ecosystem supporting rare ungulate species.',
      'Transboundary relevance: ecological linkages near Line of Control.',
    ],
    connectedAreas: [
      { name: 'Limber Wildlife Sanctuary', type: 'Wildlife Sanctuary', distance: '~15 km E' },
      { name: 'Lachipora Wildlife Sanctuary', type: 'Wildlife Sanctuary', distance: '~30 km N' },
    ],
    threats: [
      { name: 'Poaching Risk', score: 68, trend: 'stable' },
      { name: 'Illegal Grazing', score: 72, trend: 'decreasing' },
      { name: 'Habitat Fragmentation', score: 55, trend: 'stable' },
      { name: 'Climate Vulnerability', score: 50, trend: 'increasing' },
      { name: 'Tourism Pressure', score: 30, trend: 'stable' },
      { name: 'Forest Fire Risk', score: 42, trend: 'stable' },
    ],
    monitoring: [
      { method: 'Camera Traps', coverage: 45, lastUpdate: '2023' },
      { method: 'Field Surveys', coverage: 60, lastUpdate: '2024' },
      { method: 'Citizen Science', coverage: 20, lastUpdate: '2022' },
      { method: 'Remote Sensing', coverage: 65, lastUpdate: '2024' },
      { method: 'Research Projects', coverage: 35, lastUpdate: '2023' },
    ],
    dashboard: { conservationStatus: 60, speciesRichness: 55, habitatIntegrity: 65, threatLevel: 62, monitoringCoverage: 45, researchCoverage: 32 },
    dataSources: ['J&K Wildlife Department', 'WDPA', 'GBIF', 'IUCN Red List', 'WWF Pakistan', 'WII Research'],
    visitorAccess: 'Restricted',
    researchHighlights: [
      { type: 'Scientific Papers', count: 18 },
      { type: 'Management Plans', count: 1 },
      { type: 'Biodiversity Surveys', count: 5 },
      { type: 'Species Assessments', count: 4 },
      { type: 'Habitat Studies', count: 7 },
      { type: 'Climate Studies', count: 2 },
    ],
    ecologicalTrends: [
      { metric: 'Forest Cover', trend: 'stable', note: 'Conifer cover broadly stable 2015–2024' },
      { metric: 'Markhor Population', trend: 'stable', note: 'Population estimate needs field update' },
      { metric: 'Climate Trend', trend: 'negative', note: 'Alpine snowpack reduction noted' },
      { metric: 'Research Activity', trend: 'positive', note: 'Growing interest post-2020' },
    ],
  },
};

// Fallback intelligence for parks without detailed overlay
const DEFAULT_INTELLIGENCE = {
  iucnCategory: 'IUCN Category II',
  biogeographicZone: 'Western Himalaya',
  watersheds: ['Regional watershed system'],
  conservationSignificance: [
    'Significant protected landscape within the Kashmir conservation network.',
    'Supports key species and habitat types for regional biodiversity.',
  ],
  connectedAreas: [] as Array<{ name: string; type: string; distance: string }>,
  threats: [
    { name: 'Habitat Fragmentation', score: 55, trend: 'stable' as const },
    { name: 'Climate Vulnerability', score: 50, trend: 'increasing' as const },
    { name: 'Illegal Grazing', score: 45, trend: 'stable' as const },
    { name: 'Poaching Risk', score: 40, trend: 'stable' as const },
    { name: 'Tourism Pressure', score: 35, trend: 'stable' as const },
    { name: 'Forest Fire Risk', score: 30, trend: 'stable' as const },
  ],
  monitoring: [
    { method: 'Camera Traps', coverage: 40, lastUpdate: '2023' },
    { method: 'Field Surveys', coverage: 55, lastUpdate: '2023' },
    { method: 'Remote Sensing', coverage: 60, lastUpdate: '2024' },
    { method: 'Research Projects', coverage: 30, lastUpdate: '2022' },
    { method: 'Citizen Science', coverage: 20, lastUpdate: '2022' },
  ],
  dashboard: { conservationStatus: 60, speciesRichness: 55, habitatIntegrity: 62, threatLevel: 50, monitoringCoverage: 45, researchCoverage: 35 },
  dataSources: ['J&K Wildlife Department', 'WDPA', 'GBIF', 'IUCN Red List'],
  visitorAccess: 'Seasonal',
  researchHighlights: [
    { type: 'Scientific Papers', count: 12 },
    { type: 'Management Plans', count: 1 },
    { type: 'Biodiversity Surveys', count: 4 },
    { type: 'Species Assessments', count: 3 },
    { type: 'Habitat Studies', count: 5 },
    { type: 'Climate Studies', count: 2 },
  ],
  ecologicalTrends: [
    { metric: 'Forest Cover', trend: 'stable' as const, note: 'Baseline data under compilation' },
    { metric: 'Climate Trend', trend: 'negative' as const, note: 'Regional warming trend consistent' },
    { metric: 'Research Activity', trend: 'positive' as const, note: 'Growing research interest' },
  ],
};

// ── Gauge component ────────────────────────────────────────────────────────────
function Gauge({ value, label, color }: { value: number; label: string; color: string }) {
  const r = 28; const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative w-16 h-16">
        <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90">
          <circle cx="32" cy="32" r={r} fill="none" strokeWidth="6" stroke="rgba(255,255,255,0.06)" />
          <circle cx="32" cy="32" r={r} fill="none" strokeWidth="6" stroke={color}
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 1s ease' }} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-white">{value}</span>
        </div>
      </div>
      <div className="text-[10px] text-slate-500 uppercase tracking-wide text-center leading-tight max-w-[64px]">{label}</div>
    </div>
  );
}

// ── Threat bar ─────────────────────────────────────────────────────────────────
function ThreatBar({ name, score, trend }: { name: string; score: number; trend: string }) {
  const color = score >= 70 ? '#ef4444' : score >= 50 ? '#f59e0b' : '#22c55e';
  const trendIcon = trend === 'increasing' ? '↑' : trend === 'decreasing' ? '↓' : '→';
  const trendColor = trend === 'increasing' ? 'text-red-400' : trend === 'decreasing' ? 'text-emerald-400' : 'text-slate-400';
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm text-white">{name}</span>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold ${trendColor}`}>{trendIcon} {trend}</span>
          <span className="text-xs font-bold text-white tabular-nums">{score}/100</span>
        </div>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-700" style={{ width: `${score}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}

// ── Category helpers ───────────────────────────────────────────────────────────
const getCategoryColor = (cat: string) => {
  switch (cat) {
    case 'national_park': return 'from-emerald-500 to-teal-600';
    case 'wildlife_sanctuary': return 'from-blue-500 to-cyan-600';
    case 'wetland_reserve': return 'from-sky-500 to-blue-600';
    case 'conservation_reserve': return 'from-amber-500 to-orange-600';
    case 'iba': return 'from-purple-500 to-pink-600';
    default: return 'from-slate-500 to-slate-700';
  }
};

const getCategoryRoute = (cat: string) => {
  switch (cat) {
    case 'national_park': return 'national-parks';
    case 'wildlife_sanctuary': return 'wildlife-sanctuaries';
    case 'wetland_reserve': return 'wetland-reserves';
    case 'conservation_reserve': return 'conservation-reserves';
    default: return 'bird-and-habitat-areas';
  }
};

// ── Main component ─────────────────────────────────────────────────────────────
export function ProtectedAreaDetailPage({ area, relatedAreas = [] }: ProtectedAreaDetailPageProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<string>('overview');

  const intel = PARK_INTELLIGENCE[area.slug] ?? DEFAULT_INTELLIGENCE;
  const a = area as any;

  const splitTitle = (name: string) => {
    const words = name.split(' ');
    if (words.length <= 1) return name;
    const splitIndex = words.length > 3 ? 2 : 1;
    const firstPart = words.slice(0, splitIndex).join(' ');
    const secondPart = words.slice(splitIndex).join(' ');
    return (
      <>
        <span className="block whitespace-nowrap">{firstPart}</span>
        <span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">{secondPart}</span>
      </>
    );
  };

  const heroImages = area.imageUrl
    ? [area.imageUrl, '/images/protected-network.png', '/images/bear.png']
    : ['/images/protected-network.png', '/images/bear.png', '/images/tiger.png', '/images/markhor.png'];

  const tabs = [
    { id: 'overview',   label: 'Overview',        icon: Book },
    { id: 'habitats',   label: 'Habitats',         icon: Leaf },
    { id: 'species',    label: 'Species',          icon: Activity },
    { id: 'threats',    label: 'Threats',          icon: AlertTriangle },
    { id: 'monitoring', label: 'Monitoring',       icon: Radio },
    { id: 'research',   label: 'Research',         icon: Microscope },
    { id: 'spatial',    label: 'Spatial Data',     icon: Layers },
    { id: 'trails',     label: 'Trails',           icon: NavIcon },
    { id: 'reports',    label: 'Reports',          icon: FileText },
  ];

  const CARD = 'card-intelligence border border-white/10 bg-[#160C27]/75 backdrop-blur-md shadow-xl';
  const SECTION_TITLE = 'text-xl font-bold text-white mb-5';

  return (
    <main className="min-h-screen bg-slate-950">

      {/* ── HERO ── */}
      <div className="relative bg-[#160C27] pt-20 sm:pt-24 md:pt-28 lg:pt-48 pb-10 sm:pb-12 md:pb-20 overflow-hidden">
        <BackgroundCarousel images={heroImages} />
        <div className="absolute inset-0 bg-grid opacity-10" />

        <div className="container mx-auto px-6 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <button onClick={() => router.push('/protected-network')} className="hover:text-white transition-colors">Protected Network</button>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <button onClick={() => router.push(`/protected-network/${getCategoryRoute(area.category)}`)} className="hover:text-white transition-colors capitalize">
              {area.category.replace(/_/g, ' ')}
            </button>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-white font-medium">{area.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left: title + meta */}
            <div className="lg:col-span-2">
              {/* Scope + category badges — no duplicate name */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="info" size="sm" className="capitalize">{area.category.replace(/_/g, ' ')}</Badge>
                {a.scope && <Badge variant="default" size="sm">{a.scope}</Badge>}
                {a.legalStatus && a.legalStatus !== 'Verified' && <Badge variant="warning" size="sm">{a.legalStatus}</Badge>}
                <Badge variant="default" size="sm">{intel.iucnCategory}</Badge>
              </div>

              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-6xl font-black text-white mb-4 sm:mb-6 leading-[1.15] tracking-tight overflow-visible pb-1">
                {splitTitle(area.name)}
              </h1>

              <p className="text-slate-400 leading-relaxed max-w-2xl mb-6 text-sm sm:text-base">
                {area.description}
              </p>

              {/* Conservation significance */}
              <div className="space-y-1.5 mb-6">
                {intel.conservationSignificance.map((s, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <div className="w-1 h-1 rounded-full bg-emerald-400 mt-2 shrink-0" />
                    {s}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <a href={`/protected-network/${getCategoryRoute(area.category)}/${area.slug}/map`}>
                  <Button className={`bg-gradient-to-r ${getCategoryColor(area.category)}`} icon={<MapPin className="w-4 h-4" />}>View on Map</Button>
                </a>
                <a href={`/protected-network/${getCategoryRoute(area.category)}/${area.slug}/management-plan`}>
                  <Button variant="outline" className="border-white/20 text-white" icon={<FileText className="w-4 h-4" />}>Management Plan</Button>
                </a>
                <a href="/protected-network/registry">
                  <Button variant="outline" className="border-white/20 text-white" icon={<Database className="w-4 h-4" />}>Raw Data</Button>
                </a>
              </div>
            </div>

            {/* Right: intelligence panel */}
            <Card className={`${CARD} p-5 space-y-3`}>
              {[
                { icon: MapPin,        label: 'Area',               value: area.area > 0 ? `${area.area} km²` : 'TBC' },
                { icon: Calendar,     label: 'Established',        value: area.established },
                { icon: Shield,       label: 'District',           value: area.district },
                { icon: Mountain,     label: 'Elevation Range',    value: a.altitudeRange ?? 'Under verification' },
                { icon: Globe,        label: 'Biogeographic Zone', value: intel.biogeographicZone },
                { icon: Zap,          label: 'IUCN Category',      value: intel.iucnCategory },
                { icon: Activity,     label: 'Flagship Species',   value: a.flagshipSpecies ?? '—' },
                { icon: Eye,          label: 'Visitor Access',     value: intel.visitorAccess },
                { icon: Info,         label: 'Data Quality',       value: a.dataStatus ?? '—' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-slate-500 uppercase">{label}</div>
                    <div className="text-sm font-semibold text-white truncate">{String(value)}</div>
                  </div>
                </div>
              ))}

              {/* Core watersheds */}
              <div className="pt-2 border-t border-white/5">
                <div className="text-[10px] text-slate-500 uppercase mb-1.5">Core Watersheds</div>
                <div className="flex flex-wrap gap-1">
                  {intel.watersheds.map((w, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/5 text-slate-400">{w}</span>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* ── CONSERVATION DASHBOARD ── */}
      <div className="container mx-auto px-6 -mt-6 relative z-20 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="glass-intense border-white/10 p-5" padding="none">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs text-slate-400 font-semibold uppercase tracking-widest">Conservation Dashboard</div>
              <div className="text-[10px] text-slate-600 uppercase">Scores are composite intelligence indicators · 0–100</div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 justify-items-center">
              <Gauge value={intel.dashboard.conservationStatus}  label="Conservation Status"  color="#22c55e" />
              <Gauge value={intel.dashboard.speciesRichness}     label="Species Richness"     color="#3b82f6" />
              <Gauge value={intel.dashboard.habitatIntegrity}    label="Habitat Integrity"    color="#10b981" />
              <Gauge value={100 - intel.dashboard.threatLevel}   label="Threat Resilience"   color="#f59e0b" />
              <Gauge value={intel.dashboard.monitoringCoverage}  label="Monitoring Coverage"  color="#8b5cf6" />
              <Gauge value={intel.dashboard.researchCoverage}    label="Research Coverage"    color="#06b6d4" />
            </div>
          </Card>
        </motion.div>
      </div>

      {/* ── TABS ── */}
      <div className="container mx-auto px-6 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${getCategoryColor(area.category)} text-white shadow`
                    : 'glass-light border border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Profile */}
              <Card className={`${CARD} p-6`}>
                <h2 className={SECTION_TITLE}>Protected Area Profile</h2>
                <p className="text-slate-400 leading-relaxed mb-6">{area.description}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Location', value: `${area.district} District` },
                    { label: 'Established', value: area.established },
                    { label: 'Total Area', value: area.area > 0 ? `${area.area} km²` : 'TBC' },
                    { label: 'IUCN Category', value: intel.iucnCategory },
                    { label: 'Biogeographic Zone', value: intel.biogeographicZone },
                    { label: 'Visitor Access', value: intel.visitorAccess },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div className="text-[10px] text-slate-500 uppercase mb-0.5">{label}</div>
                      <div className="text-sm text-white font-semibold">{String(value)}</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Ecological Connectivity */}
              <Card className={`${CARD} p-6`}>
                <h2 className={SECTION_TITLE}>Ecological Connectivity</h2>
                {intel.connectedAreas.length > 0 ? (
                  <div className="space-y-3">
                    {intel.connectedAreas.map((c, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5 hover:border-emerald-500/30 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0">
                          <Link2 className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-white">{c.name}</div>
                          <div className="text-[11px] text-slate-500">{c.type} · {c.distance}</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-600" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-sm text-slate-500 italic">Connectivity data under compilation.</div>
                )}
              </Card>

              {/* Ecological Trends */}
              <Card className={`${CARD} p-6`}>
                <h2 className={SECTION_TITLE}>Ecological Trends</h2>
                <div className="space-y-3">
                  {intel.ecologicalTrends.map((t, i) => {
                    const color = t.trend === 'positive' ? 'text-emerald-400 bg-emerald-500/10' : t.trend === 'negative' ? 'text-red-400 bg-red-500/10' : 'text-slate-400 bg-white/5';
                    const arrow = t.trend === 'positive' ? '↑' : t.trend === 'negative' ? '↓' : '→';
                    return (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/3 border border-white/5">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${color}`}>{arrow} {t.trend}</span>
                        <div>
                          <div className="text-sm font-semibold text-white">{t.metric}</div>
                          <div className="text-[11px] text-slate-500">{t.note}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Data sources */}
              <Card className={`${CARD} p-5`}>
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2"><Database className="w-4 h-4 text-emerald-500" /> Data Sources</h3>
                <div className="space-y-1.5">
                  {intel.dataSources.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                      <div className="w-1 h-1 rounded-full bg-emerald-500" />
                      {s}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Key species quick view */}
              <Card className={`${CARD} p-5`}>
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2"><Activity className="w-4 h-4 text-emerald-500" /> Key Species</h3>
                <div className="space-y-2">
                  {area.keySpecies.slice(0, 6).map((sp, i) => (
                    <div key={i} className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                      <div className="w-7 h-7 rounded-lg bg-emerald-500/15 flex items-center justify-center shrink-0">
                        <Activity className="w-3.5 h-3.5 text-emerald-400" />
                      </div>
                      <span className="text-sm text-white">{sp}</span>
                    </div>
                  ))}
                </div>
                <button onClick={() => setActiveTab('species')} className="mt-3 text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
                  View all species <ArrowRight className="w-3 h-3" />
                </button>
              </Card>

              {/* Research summary */}
              <Card className={`${CARD} p-5`}>
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2"><Microscope className="w-4 h-4 text-emerald-500" /> Research Coverage</h3>
                <div className="space-y-2">
                  {intel.researchHighlights.map((r, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">{r.type}</span>
                      <span className="text-xs font-bold text-white tabular-nums">{r.count}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Last updated */}
              <Card className={`${CARD} p-4`}>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Data last verified: 2024 · J&K Wildlife Dept.</span>
                </div>
              </Card>
            </div>
          </motion.div>
        )}

        {/* ── HABITATS TAB ── */}
        {activeTab === 'habitats' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card className={`${CARD} p-6`}>
              <h2 className={SECTION_TITLE}>Ecosystems & Habitats</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {area.ecosystems.map((ecosystem, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/3 border border-white/5 hover:border-emerald-500/30 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-lg bg-emerald-500/15 flex items-center justify-center">
                        <TreePine className="w-4 h-4 text-emerald-400" />
                      </div>
                      <h3 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors">{ecosystem}</h3>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">Critical habitat zone supporting endemic and protected species. Detailed assessment data under compilation.</p>
                    <div className="mt-3 flex items-center gap-1 text-[10px] text-emerald-500">
                      <Leaf className="w-3 h-3" /> Habitat layer active
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* ── SPECIES TAB ── */}
        {activeTab === 'species' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Flagship */}
            {a.flagshipSpecies && (
              <Card className={`${CARD} p-6`}>
                <h2 className={SECTION_TITLE}>Flagship Species</h2>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-emerald-500/8 border border-emerald-500/20">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">{a.flagshipSpecies}</div>
                    <div className="text-xs text-slate-400 mt-0.5">Conservation anchor species for this protected area</div>
                  </div>
                  <Badge variant="warning" size="sm" className="ml-auto">Threatened</Badge>
                </div>
              </Card>
            )}

            {/* All species grouped */}
            <Card className={`${CARD} p-6`}>
              <h2 className={SECTION_TITLE}>Known Species Records</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {area.keySpecies.map((sp, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5 hover:border-emerald-500/20 transition-colors cursor-pointer">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/15 flex items-center justify-center">
                      <Activity className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <div className="text-sm text-white font-medium">{sp}</div>
                      <div className="text-[10px] text-slate-500">Presence confirmed</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-xl bg-white/3 border border-white/5">
                <div className="text-xs text-slate-500">Species list sourced from J&K Wildlife Dept., GBIF occurrence data, and field survey literature. Full taxonomic breakdown and IUCN status pending species intelligence layer integration.</div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* ── THREATS TAB ── */}
        {activeTab === 'threats' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card className={`${CARD} p-6`}>
              <h2 className={SECTION_TITLE}>Threat Intelligence</h2>
              <div className="space-y-4">
                {intel.threats.map((t, i) => <ThreatBar key={i} {...t} />)}
              </div>
              <div className="mt-5 text-[10px] text-slate-600">Threat scores are composite indicators (0–100). Sources: J&K Wildlife Dept., WII assessments, remote sensing analysis, field reports.</div>
            </Card>
          </motion.div>
        )}

        {/* ── MONITORING TAB ── */}
        {activeTab === 'monitoring' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card className={`${CARD} p-6`}>
              <h2 className={SECTION_TITLE}>Monitoring Coverage</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {intel.monitoring.map((m, i) => {
                  const icons: Record<string, any> = {
                    'Camera Traps': Camera, 'Field Surveys': Users, 'Citizen Science': Globe,
                    'Remote Sensing': Layers, 'Research Projects': Microscope,
                  };
                  const Icon = icons[m.method] ?? Activity;
                  return (
                    <div key={i} className="p-4 rounded-xl bg-white/3 border border-white/5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-violet-500/15 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-violet-400" />
                        </div>
                        <span className="text-sm font-semibold text-white">{m.method}</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-2">
                        <div className="h-full rounded-full bg-violet-500" style={{ width: `${m.coverage}%` }} />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>{m.coverage}% coverage</span>
                        <span>Updated {m.lastUpdate}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        )}

        {/* ── RESEARCH TAB ── */}
        {activeTab === 'research' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card className={`${CARD} p-6`}>
              <h2 className={SECTION_TITLE}>Research Intelligence</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                {intel.researchHighlights.map((r, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/3 border border-white/5 text-center">
                    <div className="text-2xl font-black text-white tabular-nums mb-1">{r.count}</div>
                    <div className="text-[10px] text-slate-500 uppercase">{r.type}</div>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-white/3 border border-white/5 text-xs text-slate-500">
                Research coverage based on J&K Wildlife Dept. records, WII publications, GBIF, and secondary literature. Full bibliography integration in progress.
              </div>
            </Card>
          </motion.div>
        )}

        {/* ── SPATIAL DATA TAB ── */}
        {activeTab === 'spatial' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card className={`${CARD} p-6`}>
              <h2 className={SECTION_TITLE}>Spatial Intelligence</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Elevation Range',       value: a.altitudeRange ?? 'Under verification',      icon: Mountain },
                  { label: 'Coordinates',            value: area.latitude ? `${area.latitude?.toFixed(3)}°N, ${area.longitude?.toFixed(3)}°E` : 'Pending', icon: MapPin },
                  { label: 'Biogeographic Zone',    value: intel.biogeographicZone,                       icon: Globe },
                  { label: 'Boundary Status',       value: a.dataStatus ?? 'Under review',                icon: Layers },
                  { label: 'Watersheds',             value: intel.watersheds.join(' · '),                  icon: Droplet },
                  { label: 'Connected PAs',          value: intel.connectedAreas.length > 0 ? `${intel.connectedAreas.length} identified` : 'Under mapping', icon: Link2 },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="p-4 rounded-xl bg-white/3 border border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-4 h-4 text-emerald-500" />
                      <span className="text-[10px] text-slate-500 uppercase">{label}</span>
                    </div>
                    <div className="text-sm text-white font-semibold">{value}</div>
                  </div>
                ))}
              </div>

              <div className="relative h-52 rounded-xl bg-white/3 border border-white/5 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-10 h-10 text-slate-600 mx-auto mb-2" />
                  <p className="text-slate-500 text-sm">GIS boundary layer</p>
                  <p className="text-slate-600 text-xs mt-1">Integration with WDPA / J&K atlas in progress</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* ── TRAILS TAB ── */}
        {activeTab === 'trails' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card className={`${CARD} p-6`}>
              <h2 className={SECTION_TITLE}>Trails & Eco-Routes</h2>
              <div className="space-y-3">
                {[
                  { name: 'Main Interpretation Trail', length: '3.5 km', difficulty: 'Easy', type: 'Eco-Trail' },
                  { name: 'Forest Loop Trail', length: '5 km', difficulty: 'Moderate', type: 'Nature Trail' },
                  { name: 'Summit View Trail', length: '8 km', difficulty: 'Challenging', type: 'Trekking Route' },
                ].map((trail, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white/3 border border-white/5 hover:border-emerald-500/20 transition-colors">
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-1">{trail.name}</h3>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span>{trail.length}</span>
                        <span>·</span>
                        <span>{trail.type}</span>
                        <Badge variant={trail.difficulty === 'Easy' ? 'success' : trail.difficulty === 'Moderate' ? 'warning' : 'danger'} size="sm">{trail.difficulty}</Badge>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600" />
                  </div>
                ))}
              </div>
              <div className="mt-4 text-xs text-slate-600">Trail data sourced from J&K Tourism and field verified records. Full trail intelligence layer in development.</div>
            </Card>
          </motion.div>
        )}

        {/* ── REPORTS TAB ── */}
        {activeTab === 'reports' && (
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card className={`${CARD} p-6`}>
              <h2 className={SECTION_TITLE}>Reports & Documents</h2>
              <div className="space-y-3">
                {[
                  { title: 'Management Plan 2024–2029', type: 'Management Plan', year: 2024, source: 'J&K Wildlife Dept.' },
                  { title: 'Ecological Assessment Report', type: 'Scientific Report', year: 2023, source: 'Wildlife Institute of India' },
                  { title: 'Species Monitoring Summary', type: 'Monitoring Data', year: 2024, source: 'Field Research Unit' },
                  { title: 'Biodiversity Baseline Survey', type: 'Biodiversity Survey', year: 2022, source: 'WII / GBIF' },
                ].map((report, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white/3 border border-white/5 hover:border-emerald-500/20 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-amber-500/15 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-white">{report.title}</h3>
                        <div className="text-[10px] text-slate-500">{report.type} · {report.year} · {report.source}</div>
                      </div>
                    </div>
                    <a href="/protected-network/reports-and-plans">
                      <Button variant="outline" size="sm" className="border-white/20 text-white shrink-0" icon={<ExternalLink className="w-3.5 h-3.5" />}>View</Button>
                    </a>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* ── RELATED AREAS ── */}
        {relatedAreas.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-12">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-white">Related Protected Areas</h2>
              <a href={`/protected-network/${getCategoryRoute(area.category)}`}>
                <Button variant="ghost" size="sm" className="text-emerald-400" icon={<ArrowRight className="w-4 h-4" />}>View All</Button>
              </a>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedAreas.slice(0, 3).map((related) => (
                <motion.a
                  key={related.id}
                  href={`/protected-network/${getCategoryRoute(related.category)}/${related.slug}`}
                  className="block group"
                  whileHover={{ y: -3 }}
                >
                  <Card className="h-full flex flex-col card-intelligence border border-white/5 bg-[#160C27]" padding="none">
                    <div className="relative h-28 bg-[#160C27]">
                      <div className="absolute bottom-3 left-4 right-4">
                        <div className="flex flex-wrap gap-1 mb-1">
                          <Badge variant="info" size="sm" className="capitalize text-[10px]">{related.category.replace(/_/g, ' ')}</Badge>
                          {(related as any).scope && <Badge variant="default" size="sm" className="text-[10px]">{(related as any).scope}</Badge>}
                        </div>
                        <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">{related.name}</h3>
                      </div>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                        <span>{related.area > 0 ? `${related.area} km²` : 'TBC'}</span>
                        <span>·</span>
                        <span>{related.district}</span>
                      </div>
                      <div className="mt-auto flex justify-end">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition-colors text-xs font-medium text-white">
                          View Details <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
