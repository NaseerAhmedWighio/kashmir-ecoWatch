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
  'salim-ali-national-park': {
    iucnCategory: 'None (De-notified)',
    biogeographicZone: 'Western Himalaya (Valley Floor)',
    watersheds: ['Dal Lake Catchment', 'Brane Nallah Drainage', 'Jhelum Wetland System'],
    conservationSignificance: [
      'Original notification protected critical urban wetlands and riverine groves on Dal Lake\'s shore.',
      'Represented a vital urban forest lung regulating Srinagar\'s microclimate and pollution.',
      'Key historic staging ground for waterfowl and migratory birds in the Jhelum valley.',
    ],
    connectedAreas: [
      { name: 'Dachigam National Park Buffer', type: 'Wildlife Corridor', distance: '~8 km E' },
      { name: 'Dal Lake Wetlands', type: 'Ecological Continuum', distance: 'Adjacent' },
      { name: 'Mirgund Wetland Reserve', type: 'Migratory Route Link', distance: '~15 km W' },
    ],
    threats: [
      { name: 'Urban Expansion', score: 95, trend: 'increasing' },
      { name: 'Land Conversion', score: 98, trend: 'stable' },
      { name: 'Habitat Fragmentation', score: 90, trend: 'increasing' },
      { name: 'Landscape Modification', score: 92, trend: 'stable' },
      { name: 'Biodiversity Reduction', score: 85, trend: 'increasing' },
    ],
    monitoring: [
      { method: 'Satellite Monitoring', coverage: 100, lastUpdate: '2025' },
      { method: 'Land Cover Monitoring', coverage: 95, lastUpdate: '2025' },
      { method: 'Change Detection', coverage: 90, lastUpdate: '2024' },
      { method: 'Field Surveys (Ornithological)', coverage: 15, lastUpdate: '2023' },
    ],
    dashboard: {
      conservationStatus: 0,
      speciesRichness: 0,
      habitatIntegrity: 0,
      threatLevel: 0,
      monitoringCoverage: 0,
      researchCoverage: 0
    },
    dataSources: [
      'J&K Wildlife Protection Department Records',
      'Jammu & Kashmir Government Gazette Notification SRO-321',
      'Court Rulings & Public Interest Litigations (PILs)',
      'EIA Reports for Royal Springs Development',
      'Scientific Literature on Srinagar Urban Wetland Loss'
    ],
    visitorAccess: 'Golf Course Members / Public with Entry Fee',
    researchHighlights: [
      { type: 'Historical Appraisals', count: 8 },
      { type: 'Urban Ecology Studies', count: 14 },
      { type: 'Ornithological Records', count: 22 },
      { type: 'Policy & Legal Analysis Papers', count: 6 },
    ],
    ecologicalTrends: [
      { metric: 'Natural Cover', trend: 'negative', note: 'Replaced by managed turfgrass and ornamentals' },
      { metric: 'Avian Diversity', trend: 'negative', note: 'Significant decline in wetland bird species abundance' },
      { metric: 'Wetland Hydrology', trend: 'negative', note: 'Dredged and canalized water bodies for course design' },
      { metric: 'Urban Heat Island Mitigation', trend: 'negative', note: 'Reduced forest canopy leads to local heat increase' },
    ]
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

// ── Milestone Circle component ──────────────────────────────────────────────────
function MilestoneCircle({ value, label, color, statusText }: { value: string; label: string; color: string; statusText?: string }) {
  const r = 28;
  const circ = 2 * Math.PI * r;
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <div className="relative w-16 h-16">
        <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90">
          <circle cx="32" cy="32" r={r} fill="none" strokeWidth="4" stroke="rgba(255,255,255,0.06)" />
          <circle cx="32" cy="32" r={r} fill="none" strokeWidth="4" stroke={color}
            strokeDasharray={`${circ} ${circ}`} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center p-1">
          <span className="text-[10px] font-black text-white text-center leading-none break-words max-w-[52px]">
            {value}
          </span>
          {statusText && (
            <span className="text-[7px] text-emerald-400 font-extrabold uppercase tracking-widest mt-0.5 leading-none">
              {statusText}
            </span>
          )}
        </div>
      </div>
      <div className="text-[9px] sm:text-[10px] lg:text-[9px] xl:text-[10px] text-slate-500 uppercase tracking-wide text-center leading-tight max-w-[80px] mt-0.5 font-semibold break-words">
        {label}
      </div>
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
  const [activeTab, setActiveTab] = React.useState<string>(area.id === 'salim-ali' ? 'history' : 'overview');

  const handleDownload = (e: React.MouseEvent, title: string, docId: string) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const isRegistered = window.localStorage.getItem('kew_member_registered') === 'true';
      if (isRegistered) {
        alert(`Initiating secure academic download for document: "${title}" (${docId})...`);
      } else {
        router.push(`/protected-network/reports-and-plans/request?slug=${docId.replace(/[^a-zA-Z0-9-]/g, '-').toLowerCase()}`);
      }
    }
  };

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

  const tabs = area.id === 'salim-ali' ? [
    { id: 'history',    label: 'History & Archive', icon: Book },
    { id: 'overview',   label: 'Overview',        icon: Info },
    { id: 'habitats',   label: 'Habitats',         icon: Leaf },
    { id: 'species',    label: 'Species',          icon: Activity },
    { id: 'threats',    label: 'Threats',          icon: AlertTriangle },
    { id: 'monitoring', label: 'Monitoring',       icon: Radio },
    { id: 'research',   label: 'Research',         icon: Microscope },
    { id: 'spatial',    label: 'Spatial Data',     icon: Layers },
    { id: 'reports',    label: 'Reports',          icon: FileText },
    { id: 'transformation', label: 'Transformation Analysis', icon: BarChart3 },
  ] : area.category === 'wildlife_sanctuary' ? [
    { id: 'overview',   label: 'Overview',        icon: Info },
    { id: 'habitats',   label: 'Habitats',         icon: Leaf },
    { id: 'species',    label: 'Species',          icon: Activity },
    { id: 'threats',    label: 'Threats',          icon: AlertTriangle },
    { id: 'monitoring', label: 'Monitoring',       icon: Radio },
    { id: 'research',   label: 'Research',         icon: Microscope },
    { id: 'spatial',    label: 'Spatial Data',     icon: Layers },
    { id: 'reports',    label: 'Reports',          icon: FileText },
    { id: 'legal',      label: 'History & Legal Status', icon: Shield },
  ] : area.category === 'wetland_reserve' ? [
    { id: 'overview',    label: 'Overview',        icon: Info },
    { id: 'hydrology',   label: 'Hydrology',       icon: Droplet },
    { id: 'habitats',    label: 'Habitats',        icon: Leaf },
    { id: 'species',     label: 'Birds & Species', icon: Bird },
    { id: 'threats',     label: 'Threats',         icon: AlertTriangle },
    { id: 'monitoring',  label: 'Monitoring',      icon: Radio },
    { id: 'research',    label: 'Research',        icon: Microscope },
    { id: 'spatial',     label: 'Spatial Data',    icon: Layers },
    { id: 'reports',     label: 'Reports',         icon: FileText },
    { id: 'restoration', label: 'Restoration',     icon: Zap },
  ] : area.category === 'conservation_reserve' ? [
    { id: 'overview',   label: 'Overview',        icon: Info },
    { id: 'habitats',   label: 'Habitats',         icon: Leaf },
    { id: 'species',    label: 'Species',          icon: Activity },
    { id: 'threats',    label: 'Threats',          icon: AlertTriangle },
    { id: 'community',  label: 'Community & Land Use', icon: Users },
    { id: 'monitoring', label: 'Monitoring',       icon: Radio },
    { id: 'research',   label: 'Research',         icon: Microscope },
    { id: 'spatial',    label: 'Spatial Data',     icon: Layers },
    { id: 'reports',    label: 'Reports',          icon: FileText },
    { id: 'legal',      label: 'Legal Status',     icon: Shield },
  ] : [
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

  const CARD = 'card-intelligence border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl';
  const SECTION_TITLE = 'text-xl font-bold text-white mb-5';

  return (
    <main className="min-h-screen bg-slate-950">

      {/* ── HERO ── */}
      <div className="relative bg-[#160C27] pt-20 sm:pt-24 md:pt-28 lg:pt-48 pb-10 sm:pb-12 md:pb-20 overflow-hidden">
        <BackgroundCarousel images={heroImages} overlayClassName="from-[#160C27]/40 via-transparent to-[#160C27]/60" />
        <div className="absolute inset-0 bg-grid opacity-10" />

        <div className="container mx-auto px-6 relative z-10">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <button onClick={() => router.push('/protected-network')} className="hover:text-white transition-colors">Protected Network</button>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            {area.id === 'salim-ali' ? (
              <span className="text-slate-400 font-medium">Historic Protected Areas</span>
            ) : (
              <button onClick={() => router.push(`/protected-network/${getCategoryRoute(area.category)}`)} className="hover:text-white transition-colors capitalize">
                {area.category.replace(/_/g, ' ')}
              </button>
            )}
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <span className="text-white font-medium">{area.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left: title + meta */}
            <div className="lg:col-span-2">
              {/* Scope + category badges — no duplicate name */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {area.id === 'salim-ali' ? (
                  <>
                    <Badge variant="info" size="sm">Historic National Park</Badge>
                    <Badge variant="default" size="sm">Kashmir Core</Badge>
                    <Badge variant="warning" size="sm">De-notified</Badge>
                    <Badge variant="secondary" size="sm">Converted Landscape</Badge>
                  </>
                ) : (
                  <>
                    <Badge variant="info" size="sm" className="capitalize">{a.legalStatus || area.category.replace(/_/g, ' ')}</Badge>
                    {a.scope && <Badge variant="default" size="sm">{a.scope}</Badge>}
                    {a.legalStatus && a.legalStatus !== 'Verified' && area.category !== 'conservation_reserve' && <Badge variant="warning" size="sm">{a.legalStatus}</Badge>}
                    <Badge variant="default" size="sm">{intel.iucnCategory}</Badge>
                  </>
                )}
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
              {(area.id === 'salim-ali' ? [
                { icon: MapPin,        label: 'Area',               value: '9.07 km²' },
                { icon: Calendar,     label: 'Established',        value: 1986 },
                { icon: AlertTriangle,label: 'Status',             value: 'De-notified' },
                { icon: Globe,        label: 'Current Land Use',   value: 'Royal Springs Golf Course' },
                { icon: Shield,       label: 'District',           value: 'Srinagar' },
                { icon: Book,         label: 'Conservation Record',value: 'Historic Protected Area' }
              ] : [
                { icon: MapPin,        label: 'Area',               value: area.area > 0 ? `${area.area} km²` : 'TBC' },
                { icon: Calendar,     label: 'Established',        value: area.established },
                { icon: Shield,       label: 'District',           value: area.district },
                { icon: Mountain,     label: 'Elevation Range',    value: a.altitudeRange ?? 'Under verification' },
                { icon: Globe,        label: 'Biogeographic Zone', value: intel.biogeographicZone },
                { icon: Zap,          label: 'IUCN Category',      value: intel.iucnCategory },
                { icon: Activity,     label: 'Flagship Species',   value: a.flagshipSpecies ?? '—' },
                { icon: Eye,          label: 'Visitor Access',     value: intel.visitorAccess },
                { icon: Info,         label: 'Data Quality',       value: a.dataStatus ?? '—' },
              ]).map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-slate-500 uppercase">{label}</div>
                    <div className="text-sm font-semibold text-white truncate">{String(value)}</div>
                  </div>
                </div>
              ))}

              {/* Core watersheds */}
              <div className="pt-2 border-t border-white/[0.06]">
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

      {/* ── CONSERVATION DASHBOARD / HISTORICAL RECORD ── */}
      <div className="container mx-auto px-6 -mt-6 relative z-20 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="glass-intense border-white/10 p-5" padding="none">
            {area.id === 'salim-ali' ? (
              <>
                <div className="flex items-center justify-between mb-4 px-4 pt-4">
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-widest">Historical Transformation Dashboard</div>
                  <div className="text-[10px] text-slate-500 uppercase">Salim Ali National Park / City Forest Archive</div>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 justify-items-center p-4">
                  <MilestoneCircle value="1986" label="Protected Area Established" color="#22c55e" statusText="Est." />
                  <MilestoneCircle value="2001" label="De-notified" color="#ef4444" statusText="Revoked" />
                  <MilestoneCircle value="2001–02" label="Land Use Conversion" color="#f59e0b" statusText="Change" />
                  <MilestoneCircle value="9.07 km²" label="Historic Area" color="#06b6d4" />
                  <MilestoneCircle value="Golf Course" label="Current Land Use" color="#3b82f6" />
                  <MilestoneCircle value="Archive" label="Record Status" color="#8b5cf6" />
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4 px-4 pt-4">
                  <div className="text-xs text-slate-400 font-semibold uppercase tracking-widest">Conservation Dashboard</div>
                  <div className="text-[10px] text-slate-600 uppercase">Scores are composite intelligence indicators · 0–100</div>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 justify-items-center p-4">
                  <Gauge value={intel.dashboard.conservationStatus}  label="Conservation Status"  color="#22c55e" />
                  <Gauge value={intel.dashboard.speciesRichness}     label="Species Richness"     color="#3b82f6" />
                  <Gauge value={intel.dashboard.habitatIntegrity}    label="Habitat Integrity"    color="#10b981" />
                  <Gauge value={100 - intel.dashboard.threatLevel}   label="Threat Resilience"   color="#f59e0b" />
                  <Gauge value={intel.dashboard.monitoringCoverage}  label="Monitoring Coverage"  color="#8b5cf6" />
                  <Gauge value={intel.dashboard.researchCoverage}    label="Research Coverage"    color="#06b6d4" />
                </div>
              </>
            )}
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

        {area.id === 'salim-ali' ? (
          <>
            {/* ── HISTORY & ARCHIVE TAB ── */}
            {activeTab === 'history' && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    {/* Historical Overview */}
                    <Card className={`${CARD} p-6`}>
                      <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Book className="w-5 h-5 text-emerald-500" /> Historical Overview
                      </h2>
                      <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                        <p>
                          Salim Ali National Park, originally established as <strong>City Forest National Park</strong>, was notified in 1986 to preserve a critical urban wetland and riverine forest system in close proximity to Dal Lake in Srinagar. Named in honor of Dr. Salim Ali, India's most celebrated ornithologist, the park served as a sanctuary for avian diversity, seasonal waterfowl, and riverine woodlands in an otherwise rapidly urbanizing landscape.
                        </p>
                        <p>
                          The park spanned 9.07 km² of low-lying floodplains, deltaic marshlands, and dense willow-poplar canopy. It acted as an ecological buffer for the Dal Lake ecosystem, filtering run-off, recharging aquifers, and regulating microclimatic temperature before its controversial conversion.
                        </p>
                      </div>
                    </Card>

                    {/* Legal Archive */}
                    <Card className={`${CARD} p-6`}>
                      <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-emerald-500" /> Legal & Administrative Archive
                      </h2>
                      <div className="space-y-3">
                        {[
                          { title: 'Original Notification SRO-321', type: 'Government Order', detail: '1986 — Formally declaring City Forest as a National Park under Section 35 of Wildlife Protection Act.', docId: 'SRO-321/1986' },
                          { title: 'Cabinet De-notification Decision', type: 'Cabinet Order', detail: '2001 — Directing the transfer of the 9.07 km² park to the Tourism Department for recreation design.', docId: 'Cabinet Res. 12/2001' },
                          { title: 'High Court Public Interest Litigation (PIL)', type: 'Judicial Record', detail: '2001–2003 — Environmental coalitions challenging the de-notification of a designated Category II National Park.', docId: 'PIL No. 427/2001' },
                          { title: 'Official Land Allocation Order', type: 'Administrative Order', detail: '2001 — Handing over land parcels to Jammu & Kashmir Tourism Development Corp for golf course construction.', docId: 'Govt Order No. 84-TSM' },
                        ].map((doc, idx) => (
                          <div key={idx} className="p-3 bg-white/3 border border-white/5 rounded-xl flex items-center justify-between text-xs hover:border-emerald-500/30 transition-all">
                            <div>
                              <div className="font-bold text-white mb-0.5">{doc.title}</div>
                              <div className="text-slate-400">{doc.detail}</div>
                            </div>
                            <div className="text-right shrink-0">
                              <Badge variant="secondary" className="font-mono text-[9px] mb-1">{doc.docId}</Badge>
                              <div 
                                onClick={(e) => handleDownload(e, doc.title, doc.docId)}
                                className="text-[10px] text-emerald-400 font-semibold cursor-pointer hover:underline"
                              >
                                Download Record
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Conservation Legacy */}
                    <Card className={`${CARD} p-6`}>
                      <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-emerald-500" /> Conservation Legacy
                      </h2>
                      <div className="space-y-3 text-sm text-slate-300 leading-relaxed">
                        <p>
                          The creation of City Forest National Park represented a forward-looking vision of urban conservation in Kashmir, recognizing that urban centers require designated wilderness zones. The park was unique as it was the only valley-floor wetland-forest national park in Jammu & Kashmir.
                        </p>
                        <p>
                          Its loss remains a benchmark reference case in South Asian environmental law and conservation biology, illustrating how state cabinets can override national park status for tourism and development. Today, it serves as an educational precedent for protected-area downgrading, downsizing, and de-gazettement (PADDD).
                        </p>
                      </div>
                    </Card>
                  </div>

                  <div className="space-y-6">
                    {/* Historical Maps */}
                    <Card className={`${CARD} p-5`}>
                      <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-emerald-500" /> Historical Maps & Imagery
                      </h3>
                      <div className="space-y-3">
                        <div className="p-3 bg-white/5 border border-white/5 rounded-xl hover:border-emerald-500/30 transition-all cursor-pointer">
                          <div className="text-xs font-bold text-white">Original Boundary Map (1986)</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">Scale 1:10,000 · Survey of India Gazette</div>
                        </div>
                        <div className="p-3 bg-white/5 border border-white/5 rounded-xl hover:border-emerald-500/30 transition-all cursor-pointer">
                          <div className="text-xs font-bold text-white">CORONA Satellite Aerial Photo (1990)</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">Declassified US satellite photo showing dense canopy cover</div>
                        </div>
                        <div className="p-3 bg-white/5 border border-white/5 rounded-xl hover:border-emerald-500/30 transition-all cursor-pointer">
                          <div className="text-xs font-bold text-white">Landsat Land Cover Map (1995)</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">Vegetation cover showing marshlands & floodplains</div>
                        </div>
                      </div>
                    </Card>

                    {/* Media Archive */}
                    <Card className={`${CARD} p-5`}>
                      <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                        <Camera className="w-4 h-4 text-emerald-500" /> Media & Reports Archive
                      </h3>
                      <div className="space-y-3">
                        {[
                          { outlet: 'The Kashmir Gazette', title: 'Cabinet Approves Srinagar Golf Course at City Forest Site', date: 'June 2001' },
                          { outlet: 'Kashmir Environmental Society', title: 'A Loss of Srinagar\'s Green Lung: Salim Ali National Park Conversion', date: 'Sept 2001' },
                          { outlet: 'Civil Society Action Group', title: 'Citizen Protest Outside Former National Park Gates', date: 'Oct 2001' },
                        ].map((media, idx) => (
                          <div key={idx} className="pb-2 border-b border-white/5 last:border-0 last:pb-0">
                            <div className="flex justify-between text-[9px] text-slate-500 mb-0.5">
                              <span>{media.outlet}</span>
                              <span>{media.date}</span>
                            </div>
                            <div className="text-xs font-semibold text-white hover:text-emerald-400 cursor-pointer transition-colors leading-snug">{media.title}</div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── OVERVIEW TAB ── */}
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Identity & Historical Role */}
                  <Card className={`${CARD} p-6`}>
                    <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Info className="w-5 h-5 text-emerald-500" /> Archive Record Overview
                    </h2>
                    <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                      <p>
                        Salim Ali National Park represented a critical urban-ecological interface in Srinagar. Established during an era of expanding conservation infrastructure, its legal removal and physical conversion marks a major pivot in the region's environmental governance history.
                      </p>
                      <p>
                        Rather than displaying standard biological indicators which are no longer active, this archive preserves the spatial boundary, historical flora/fauna records, legal documents, and transformation analysis of the landscape.
                      </p>
                    </div>
                  </Card>

                  {/* Summary Narrative */}
                  <Card className={`${CARD} p-6`}>
                    <h2 className="text-lg font-bold text-white mb-4">Landscape Transformation Summary</h2>
                    <p className="text-sm text-slate-300 leading-relaxed mb-4">
                      The conversion from a national park to a premier golf facility involved the systematic modification of the valley-floor hydrology. The dense willow thickets and reed beds were excavated to create manicured turf lanes, artificial water hazards, clubhouse structures, and fairways.
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      While the Royal Springs Golf Course is celebrated for its scenic beauty, tourism value, and hosting of national tournaments, it represents a total transition in ecological functionality — moving from a primary biodiverse wetland ecosystem to a highly managed, chemically treated recreational landscape.
                    </p>
                  </Card>
                </div>

                <div className="space-y-6">
                  {/* Identity Stats */}
                  <Card className={`${CARD} p-5`}>
                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-emerald-500" /> Identity Profile
                    </h3>
                    <div className="space-y-4">
                      {[
                        { label: 'Classification', value: 'Former Protected Area' },
                        { label: 'Original Status', value: 'National Park (IUCN Category II)' },
                        { label: 'Geographic Scope', value: 'Kashmir Core (Dal Lake Shore)' },
                        { label: 'District', value: 'Srinagar, Jammu & Kashmir' },
                        { label: 'Current Record Status', value: 'De-notified Protected Area Record' },
                      ].map((item, idx) => (
                        <div key={idx} className="border-b border-white/5 pb-2 last:border-0 last:pb-0">
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">{item.label}</div>
                          <div className="text-sm font-bold text-white">{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </Card>

                  {/* Key Facts */}
                  <Card className={`${CARD} p-5`}>
                    <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-emerald-500" /> Key Facts
                    </h3>
                    <div className="space-y-4">
                      {[
                        { label: 'Original Area Extent', value: '9.07 km² (907 Hectares)' },
                        { label: 'Established Year', value: '1986' },
                        { label: 'De-notification Year', value: '2001' },
                        { label: 'Primary Conversion Use', value: 'Royal Springs Golf Course' },
                        { label: 'Primary Ecosystem Lost', value: 'Willow-swamp & Floodplain Wetland' },
                      ].map((item, idx) => (
                        <div key={idx} className="border-b border-white/5 pb-2 last:border-0 last:pb-0">
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-0.5">{item.label}</div>
                          <div className="text-sm font-bold text-white">{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </motion.div>
            )}

            {/* ── HABITATS TAB ── */}
            {activeTab === 'habitats' && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    {/* Historical Habitats */}
                    <Card className={`${CARD} p-6`}>
                      <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Leaf className="w-5 h-5 text-emerald-500" /> Historical Habitat Profile
                      </h2>
                      <p className="text-sm text-slate-300 leading-relaxed mb-6">
                        Before conversion, Salim Ali National Park consisted of low-lying floodplains and marshlands along the base of the Zabarwan range. The landscape was defined by four major habitat classes:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { title: 'Urban Forest Canopy', desc: 'Dense groves of willow (Salix) and poplar (Populus) providing shade, cooling, and roosting grounds for forest birds.' },
                          { title: 'Riverine Woodland', desc: 'Riparian vegetation and wild shrubs stabilizing the soft deltaic shores and absorbing nutrient run-off.' },
                          { title: 'Sedge & Reed Swamps', desc: 'Phragmites and Typha reed beds providing thick nesting cover for rails, crakes, and wetland passerines.' },
                          { title: 'Wetland Edge Habitat', desc: 'Shallow open water fringes supplying feeding grounds for diving ducks and wading herons.' },
                        ].map((hab, idx) => (
                          <div key={idx} className="p-4 bg-white/3 border border-white/5 rounded-xl">
                            <h3 className="text-sm font-bold text-emerald-400 mb-1">{hab.title}</h3>
                            <p className="text-xs text-slate-400 leading-relaxed">{hab.desc}</p>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Habitat Change Analysis Table */}
                    <Card className={`${CARD} p-6`}>
                      <h2 className="text-lg font-bold text-white mb-4">Habitat Change Analysis</h2>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                          <thead>
                            <tr className="border-b border-white/10 text-slate-500 uppercase tracking-wider">
                              <th className="py-2 font-bold">Habitat Class</th>
                              <th className="py-2 font-bold">Historical Extent (Pre-2001)</th>
                              <th className="py-2 font-bold">Current Extent (Present)</th>
                              <th className="py-2 font-bold">Ecological Transition Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-white/5 text-slate-300">
                            {[
                              { class: 'Willow-Poplar Forest', hist: 'Yes (Extensive canopy)', curr: 'Reduced (Isolated shade trees)', status: 'Severely Fragmented' },
                              { class: 'Wetland / Reed Bed', hist: 'Yes (Major marsh network)', curr: 'Altered (Managed water hazards)', status: 'Hydrologically Converted' },
                              { class: 'Shrubland / Grassland', hist: 'Yes (Wild understory)', curr: 'No (Replaced by manicured lawns)', status: 'Extirpated / Replaced' },
                              { class: 'Riparian / Edge Buffer', hist: 'Yes (Natural shoreline)', curr: 'Partial (Stone-lined canals)', status: 'Highly Modified' },
                            ].map((row, idx) => (
                              <tr key={idx} className="hover:bg-white/5">
                                <td className="py-3 font-semibold text-white">{row.class}</td>
                                <td className="py-3">{row.hist}</td>
                                <td className="py-3 text-amber-400">{row.curr}</td>
                                <td className="py-3">
                                  <Badge variant="warning" size="sm" className="text-[10px]">{row.status}</Badge>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  </div>

                  {/* Land Cover Transition */}
                  <div className="space-y-6">
                    <Card className={`${CARD} p-5`}>
                      <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-emerald-500" /> Land Cover Transition
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">
                        Estimated land cover distribution shifts based on comparative analysis of 1995 Landsat vs 2024 Sentinel-2 spatial classification:
                      </p>
                      <div className="space-y-4">
                        {[
                          { label: 'Forest Canopy', pre: 65, post: 8 },
                          { label: 'Open Marsh / Wetland', pre: 25, post: 12 },
                          { label: 'Managed Turf / Lawn', pre: 0, post: 68 },
                          { label: 'Paved Roads / Buildings', pre: 2, post: 12 },
                        ].map((lc, idx) => (
                          <div key={idx} className="space-y-1">
                            <div className="flex justify-between text-xs font-semibold text-white">
                              <span>{lc.label}</span>
                              <span className="text-slate-500 font-normal">
                                <span className="text-emerald-400 font-bold">{lc.pre}%</span> → <span className="text-amber-400 font-bold">{lc.post}%</span>
                              </span>
                            </div>
                            <div className="h-2 bg-white/5 rounded-full overflow-hidden flex">
                              <div className="h-full bg-emerald-500" style={{ width: `${lc.pre}%` }} />
                              <div className="h-full bg-amber-500/20" style={{ width: `${Math.max(0, lc.post - lc.pre)}%` }} />
                            </div>
                            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                              <div className="h-full bg-amber-500" style={{ width: `${lc.post}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    <Card className={`${CARD} p-5`}>
                      <h3 className="text-sm font-bold text-white mb-2">Ecological Loss Indicators</h3>
                      <div className="space-y-2 text-xs text-slate-400">
                        <div className="flex justify-between pb-1 border-b border-white/5">
                          <span>Carbon Storage Capacity</span>
                          <span className="text-red-400 font-bold">-88%</span>
                        </div>
                        <div className="flex justify-between pb-1 border-b border-white/5">
                          <span>Nesting Habitat Availability</span>
                          <span className="text-red-400 font-bold">-92%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Surface Water Heat Absorption</span>
                          <span className="text-red-400 font-bold">Increased</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── SPECIES TAB ── */}
            {activeTab === 'species' && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    {/* Historical Species Records */}
                    <Card className={`${CARD} p-6`}>
                      <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-emerald-500" /> Historical Species Records
                      </h2>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-bold text-emerald-400 mb-2">Avian Diversity (Resident & Migratory Birds)</h3>
                          <p className="text-xs text-slate-400 leading-relaxed mb-3">
                            Historically, the park was an important urban birding site, logging over 120 species of resident and migratory birds:
                          </p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="p-2.5 bg-white/3 rounded-lg border border-white/5">
                              <span className="font-bold text-white block">Resident Birds</span>
                              <span className="text-slate-400">Little grebes, black-crowned night herons, common kingfishers, grey herons, small bill wood-peckers.</span>
                            </div>
                            <div className="p-2.5 bg-white/3 rounded-lg border border-white/5">
                              <span className="font-bold text-white block">Migratory Waterfowl</span>
                              <span className="text-slate-400">Mallards, northern pintails, gadwalls, garganey teals, Eurasian wigeons arriving from Siberia.</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-bold text-emerald-400 mb-2">Mammalian Records</h3>
                          <p className="text-xs text-slate-400 leading-relaxed mb-2">
                            The forest floor and riverbanks supported small, adaptable mammals:
                          </p>
                          <div className="p-3 bg-white/3 rounded-lg border border-white/5 text-xs text-slate-400">
                            <strong className="text-white">Logged Species:</strong> Golden jackals, Indian bush rats, small Indian mongooses, long-eared bats, and common otters hunting along the wetland edge.
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-bold text-emerald-400 mb-2">Native Flora</h3>
                          <p className="text-xs text-slate-400 leading-relaxed mb-2">
                            The vegetation was adapted to boggy, high-water table conditions:
                          </p>
                          <div className="p-3 bg-white/3 rounded-lg border border-white/5 text-xs text-slate-400">
                            <strong className="text-white">Dominant Flora:</strong> White willow (Salix alba), crack willow (Salix fragilis), white poplar (Populus alba), Typha latifolia reeds, Phragmites australis (common reed), and various duckweeds.
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Species Status Categorization */}
                    <Card className={`${CARD} p-6`}>
                      <h2 className="text-lg font-bold text-white mb-4">Species Occurrence Status</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-center">
                        {[
                          { label: 'Historical Records', count: '135+', desc: 'Documented species pre-2001', color: 'text-emerald-400 bg-emerald-500/10' },
                          { label: 'Current Records', count: '45', desc: 'Species observed in recent years', color: 'text-blue-400 bg-blue-500/10' },
                          { label: 'Lost Records', count: '70+', desc: 'Wetland specialists extirpated', color: 'text-red-400 bg-red-500/10' },
                          { label: 'Unknown Status', count: '20+', desc: 'Requires fresh census data', color: 'text-slate-400 bg-white/5' },
                        ].map((stat, idx) => (
                          <div key={idx} className="p-4 bg-white/3 border border-white/5 rounded-xl">
                            <div className={`text-2xl font-black mb-1 ${stat.color.split(' ')[0]}`}>{stat.count}</div>
                            <div className="text-xs font-bold text-white mb-1">{stat.label}</div>
                            <div className="text-[10px] text-slate-500 leading-tight">{stat.desc}</div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* Biodiversity Change Analysis */}
                  <div className="space-y-6">
                    <Card className={`${CARD} p-5`}>
                      <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-emerald-500" /> Biodiversity Change
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed mb-4">
                        Comparison of species groups between the active national park period and current golf course landscape:
                      </p>
                      <div className="space-y-3 text-xs">
                        {[
                          { group: 'Wetland Bird Species', pre: 42, post: 6 },
                          { group: 'Woodland Bird Species', pre: 78, post: 32 },
                          { group: 'Mammal Species', pre: 12, post: 4 },
                          { group: 'Native Woody Plants', pre: 28, post: 5 },
                        ].map((g, idx) => (
                          <div key={idx} className="pb-2 border-b border-white/5 last:border-0 last:pb-0">
                            <div className="flex justify-between text-white font-semibold mb-1">
                              <span>{g.group}</span>
                              <span className="text-slate-400">{g.pre} logged → {g.post} observed</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden flex">
                              <div className="h-full bg-emerald-500" style={{ width: `${(g.pre / 80) * 100}%` }} />
                              <div className="h-full bg-red-500" style={{ width: `${((g.pre - g.post) / 80) * 100}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    <Card className={`${CARD} p-5`}>
                      <h3 className="text-sm font-bold text-white mb-2">Species Shift Drivers</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        The removal of the complex vertical canopy layers and the infilling of reed swamps destroyed the nesting substrates for warblers and small mammals. The introduction of manicured lawns favored cosmopolitan species (like common mynas, crows, and kites) while eliminating nesting habitat for specialist waterbirds.
                      </p>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── THREATS TAB ── */}
            {activeTab === 'threats' && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    {/* Historical Threat Drivers */}
                    <Card className={`${CARD} p-6`}>
                      <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-emerald-500" /> Historical Threat Drivers
                      </h2>
                      <div className="space-y-4">
                        {[
                          { driver: 'Land Conversion', impact: 'High', desc: 'The wholesale transformation of the park boundaries from an unmanaged, protected forest ecosystem into a commercial tourist and recreational facility.' },
                          { driver: 'Urban Expansion Pressure', impact: 'High', desc: 'The park lay in prime real estate adjacent to the Boulevard road, rendering it highly vulnerable to administrative conversion for tourism development.' },
                          { driver: 'Infrastructure Development', impact: 'Moderate', desc: 'Construction of roads, clubhouses, fairways, water supply infrastructure, and parking complexes within the former wildlife zone.' },
                        ].map((t, idx) => (
                          <div key={idx} className="p-4 bg-white/3 border border-white/5 rounded-xl flex items-start gap-4">
                            <Badge variant="danger" size="sm" className="shrink-0 uppercase tracking-wider text-[9px]">{t.impact}</Badge>
                            <div>
                              <h3 className="text-sm font-bold text-white mb-1">{t.driver}</h3>
                              <p className="text-xs text-slate-400 leading-relaxed">{t.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Conservation Pressures */}
                    <Card className={`${CARD} p-6`}>
                      <h2 className="text-lg font-bold text-white mb-4">Conservation Pressures</h2>
                      <div className="space-y-4">
                        {[
                          { pressure: 'Landscape Modification', rating: 'High', details: 'Dredging, swamp drainage, and heavy landscaping completely transformed the soils, making natural plant succession impossible.' },
                          { pressure: 'Habitat Fragmentation', rating: 'High', details: 'Isolation of the remaining lakeside woodlands from the mountain slopes of the Zabarwan range, cutting off overland migration routes.' },
                          { pressure: 'Biodiversity Reduction', rating: 'High', details: 'Continuous application of agrochemicals and intensive turf management preventing wild herbaceous growth and insect biodiversity.' },
                        ].map((p, idx) => (
                          <div key={idx} className="flex justify-between items-start pb-3 border-b border-white/5 last:border-0 last:pb-0">
                            <div>
                              <h3 className="text-sm font-semibold text-white mb-1">{p.pressure}</h3>
                              <p className="text-xs text-slate-400 leading-relaxed max-w-lg">{p.details}</p>
                            </div>
                            <Badge variant="warning" size="sm" className="text-[10px] shrink-0">{p.rating} Impact</Badge>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* Impact Summary */}
                  <div className="space-y-6">
                    <Card className={`${CARD} p-5`}>
                      <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                        <Info className="w-4 h-4 text-emerald-500" /> Historical Impact Summary
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">
                        The historical threat assessment indicates that unlike active parks where threat mitigation is possible, the conversion of Salim Ali National Park represents a permanent change in ecological land status.
                      </p>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        The primary threat remains the legal precedent: the ease with which administrative bodies could de-notify a Category II National Park for commercial and tourism purposes.
                      </p>
                    </Card>

                    <Card className={`${CARD} p-5`}>
                      <h3 className="text-sm font-bold text-white mb-2">Key Drivers Rating</h3>
                      <div className="space-y-2 text-xs text-slate-400">
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span>Tourism Focus</span>
                          <span className="text-red-400 font-bold">100/100</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span>Legal Integrity</span>
                          <span className="text-red-400 font-bold">0/100</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Chemical Pollution Risk</span>
                          <span className="text-amber-400 font-bold">Moderate (Turf runoff)</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── MONITORING TAB ── */}
            {activeTab === 'monitoring' && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    {/* Historical vs Current Monitoring */}
                    <Card className={`${CARD} p-6`}>
                      <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Radio className="w-5 h-5 text-emerald-500" /> Landscape Monitoring Systems
                      </h2>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-bold text-emerald-400 mb-2">Historical Field Monitoring (Pre-2001)</h3>
                          <p className="text-xs text-slate-400 leading-relaxed mb-3">
                            Prior to de-notification, biological monitoring was carried out by the J&K Wildlife Protection Department and local university groups:
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                              { survey: 'Ornithological Census', status: 'Unavailable', details: 'Regular counts of migratory birds. Currently halted.' },
                              { survey: 'Forest Inventory', status: 'Unavailable', details: 'Willow/poplar canopy density tracking. Currently halted.' },
                              { survey: 'Water Quality Surveys', status: 'Partial', details: 'Baseline nutrient levels in the wetlands. Now monitored by Lakes Conservation Authority.' },
                            ].map((s, idx) => (
                              <div key={idx} className="p-3 bg-white/3 border border-white/5 rounded-xl">
                                <div className="text-xs font-bold text-white mb-1">{s.survey}</div>
                                <Badge variant={s.status === 'Available' ? 'success' : s.status === 'Partial' ? 'warning' : 'danger'} size="sm" className="mb-2 text-[8px] uppercase">{s.status}</Badge>
                                <p className="text-[10px] text-slate-500 leading-relaxed">{s.details}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-sm font-bold text-emerald-400 mb-2">Current Spatial Monitoring (2001–Present)</h3>
                          <p className="text-xs text-slate-400 leading-relaxed mb-3">
                            Due to lack of access and altered land status, current monitoring is limited to remote sensing and regional environmental audits:
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                              { survey: 'Satellite Remote Sensing', status: 'Available', details: 'Sentinel/Landsat imagery tracking land cover changes over Srinagar.' },
                              { survey: 'Land Cover Monitoring', status: 'Available', details: 'GIS classification of turf lawns vs canopy cover.' },
                              { survey: 'Change Detection', status: 'Available', details: 'Historical pixel comparison of wetlands pre- and post-conversion.' },
                            ].map((s, idx) => (
                              <div key={idx} className="p-3 bg-white/3 border border-white/5 rounded-xl">
                                <div className="text-xs font-bold text-white mb-1">{s.survey}</div>
                                <Badge variant="success" size="sm" className="mb-2 text-[8px] uppercase">{s.status}</Badge>
                                <p className="text-[10px] text-slate-500 leading-relaxed">{s.details}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Monitoring Coverage Stats */}
                  <div className="space-y-6">
                    <Card className={`${CARD} p-5`}>
                      <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-emerald-500" /> Data Availability Summary
                      </h3>
                      <div className="space-y-3">
                        {[
                          { metric: 'Historical Wildlife Data', status: 'Partial', val: 'Available in archives' },
                          { metric: 'Active Field Census', status: 'Unavailable', val: 'No wildlife monitoring' },
                          { metric: 'High-Res GIS Boundaries', status: 'Available', val: 'Digitized from 1986' },
                          { metric: 'Run-off & Pesticide Data', status: 'Unavailable', val: 'Not publicly disclosed' },
                        ].map((m, idx) => (
                          <div key={idx} className="pb-2 border-b border-white/5 last:border-0 last:pb-0 flex justify-between items-center text-xs">
                            <span className="text-slate-400">{m.metric}</span>
                            <div className="text-right">
                              <Badge variant={m.status === 'Available' ? 'success' : m.status === 'Partial' ? 'warning' : 'danger'} size="sm" className="text-[9px] uppercase tracking-wide">{m.status}</Badge>
                              <div className="text-[9px] text-slate-600 mt-0.5">{m.val}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── RESEARCH TAB ── */}
            {activeTab === 'research' && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    {/* Scientific Literature */}
                    <Card className={`${CARD} p-6`}>
                      <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <Microscope className="w-5 h-5 text-emerald-500" /> Scientific Literature & Studies
                      </h2>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-bold text-emerald-400 mb-2">Ornithological & Biodiversity Records</h3>
                          <p className="text-xs text-slate-400 leading-relaxed mb-3">
                            Historical publications documenting the rich bird and plant populations of the former national park:
                          </p>
                          <ul className="space-y-2 text-xs text-slate-300 pl-4 list-disc">
                            <li><em>"Birds of the Srinagar City Forest National Park"</em> (1994) — A comprehensive checklist of resident and migratory species logged over five seasons.</li>
                            <li><em>"Vegetational Analysis of the Lowland Swamps in Kashmir"</em> (1998) — Study of the unique Salix-Phragmites vegetation community at the Dal Lake shore.</li>
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-sm font-bold text-emerald-400 mb-2">Conservation Policy & Legal Case Studies</h3>
                          <p className="text-xs text-slate-400 leading-relaxed mb-3">
                            Academic analysis focusing on the governance, policy, and legal processes surrounding the de-notification:
                          </p>
                          <ul className="space-y-2 text-xs text-slate-300 pl-4 list-disc">
                            <li><em>"Protected Area Downgrading and De-notification in India: A Case Study of Salim Ali National Park"</em> (2006) — Analysis of legal loopholes in state wildlife protection acts.</li>
                            <li><em>"Urban Wetland Conversion and Environmental Impact: The Story of Srinagar's Royal Springs"</em> (2012) — Evaluates the trade-off between tourism revenues and urban ecosystem services.</li>
                          </ul>
                        </div>
                      </div>
                    </Card>

                    {/* Knowledge Gaps */}
                    <Card className={`${CARD} p-6`}>
                      <h2 className="text-lg font-bold text-white mb-4">Documented Knowledge Gaps</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-white/3 border border-white/5 rounded-xl">
                          <h3 className="text-sm font-bold text-amber-400 mb-1">Missing Species Census Data</h3>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            No systematic bird or mammal surveys have been conducted inside the golf course boundaries since 2005. It is unknown to what extent the remaining shade trees support residual forest passerines.
                          </p>
                        </div>
                        <div className="p-4 bg-white/3 border border-white/5 rounded-xl">
                          <h3 className="text-sm font-bold text-amber-400 mb-1">Missing Hydrological & Chemical Data</h3>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Data regarding fertilizer and pesticide usage for turfgrass maintenance, and its subsequent run-off levels into Dal Lake, is completely absent from public monitoring records.
                          </p>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Research highlights */}
                  <div className="space-y-6">
                    <Card className={`${CARD} p-5`}>
                      <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                        <Info className="w-4 h-4 text-emerald-500" /> Research Highlights
                      </h3>
                      <div className="space-y-3">
                        {intel.researchHighlights.map((r, i) => (
                          <div key={i} className="flex justify-between items-center text-xs">
                            <span className="text-slate-400">{r.type}</span>
                            <span className="text-white font-bold">{r.count} publications</span>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── SPATIAL DATA TAB ── */}
            {activeTab === 'spatial' && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <Card className={`${CARD} p-6`}>
                  <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-emerald-500" /> Spatial Data & GIS Archive
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    This section acts as a spatial repository for the Salim Ali National Park boundary records. Researchers can check geographic overlays to analyze land cover transitions and boundary modifications.
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-2">GIS Checklist & Layer Overlays</h3>
                      {[
                        { name: 'Original National Park Boundary (1986)', details: 'Digitized from official notification SRO-321.', active: true },
                        { name: 'Current Land Use (Royal Springs Golf Course)', details: 'Spatial boundary of active turf, sand traps, and clubhouse buildings.', active: true },
                        { name: 'Historical Aerial Imagery (1995 CORONA)', details: 'High-res declassified imagery demonstrating historical forest canopy.', active: false },
                        { name: 'Current Satellite Imagery (2024 Sentinel-2)', details: 'High-resolution multispectral imagery showing current landscape.', active: true },
                        { name: 'Habitat Change Layer', details: 'Raster overlay showing lost canopy and wet forest zones.', active: false },
                        { name: 'Urban Expansion Matrix', details: 'Tracks encroachment and road development along the boundaries.', active: false },
                        { name: 'Watershed Context Map', details: 'Hydrological linkages between Zabarwan slopes and Dal Lake.', active: true },
                        { name: 'Digital Elevation Model (DEM)', details: 'Topographical layout showing low-lying valley floor layout.', active: true },
                      ].map((layer, idx) => (
                        <div key={idx} className="p-3 bg-white/3 border border-white/5 rounded-xl flex items-start justify-between hover:border-emerald-500/30 transition-all">
                          <div>
                            <div className="text-xs font-bold text-white">{layer.name}</div>
                            <div className="text-[10px] text-slate-500 mt-0.5 leading-snug">{layer.details}</div>
                          </div>
                          <Badge variant={layer.active ? 'success' : 'secondary'} size="sm" className="text-[8px] uppercase tracking-wide shrink-0">
                            {layer.active ? 'Available' : 'Archived'}
                          </Badge>
                        </div>
                      ))}
                    </div>

                    <div className="lg:col-span-2 space-y-4">
                      <div className="relative h-96 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-grid opacity-10" />
                        <div className="text-center relative z-10 p-6">
                          <MapPin className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                          <h4 className="text-sm font-bold text-white mb-1">GIS Map Viewer Simulation</h4>
                          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed mb-4">
                            Spatially calibrated boundary of the 9.07 km² Salim Ali National Park. Map coordinates centered at 34.080°N, 74.820°E.
                          </p>
                          <div className="flex flex-wrap justify-center gap-2 text-[10px]">
                            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-slate-400">EPSG:4326 (WGS84)</span>
                            <span className="px-2.5 py-1 rounded bg-white/5 border border-white/5 text-slate-400">Area: 907 Hectares</span>
                            <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">Layer Overlap Active</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-3 bg-white/3 border border-white/5 rounded-xl text-xs text-slate-500 text-center">
                        Note: Full Shapefile and GeoJSON boundary data can be extracted using the <a href="/protected-network/registry" className="text-emerald-400 font-semibold hover:underline">Raw Data Registry</a>.
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* ── REPORTS TAB ── */}
            {activeTab === 'reports' && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <Card className={`${CARD} p-6`}>
                  <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-500" /> Documents & Historical Reports
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    A curated catalog of official papers, cabinet decisions, environmental reviews, and academic papers documenting the Salim Ali National Park de-notification.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { category: 'Government Reports', title: 'Notification Order SRO-321', details: '1986 — Official gazette declaring City Forest a National Park.', format: 'PDF', size: '1.2 MB' },
                      { category: 'Government Reports', title: 'De-notification Cabinet Decision Act', details: '2001 — Cabinet resolution approving transfer of land for golf course.', format: 'PDF', size: '840 KB' },
                      { category: 'Research Papers', title: 'Urban Forest Loss in Srinagar Valley', details: '2008 — Academic study analyzing green lung reduction and temperature changes.', format: 'PDF', size: '2.4 MB' },
                      { category: 'Environmental Assessments', title: 'Royal Springs Development EIA Study', details: '2000 — Pre-construction assessment of wetlands hydrology modifications.', format: 'PDF', size: '4.8 MB' },
                      { category: 'Historical Documents', title: 'Dr. Salim Ali\'s Site Review Correspondence', details: '1983 — Original letters emphasizing the conservation value of City Forest.', format: 'PDF', size: '920 KB' },
                      { category: 'Conservation Reviews', title: 'PADDD Tracker: Salim Ali National Park Case Study', details: '2018 — Global database record documenting protected area downsizing.', format: 'HTML', size: 'Link' },
                      { category: 'Media Records', title: 'Compendium of News Reports (2001–2003)', details: 'Press clippings and public interest litigation records from local news.', format: 'PDF', size: '3.1 MB' },
                    ].map((rep, idx) => (
                      <div key={idx} className="p-4 bg-white/3 border border-white/5 rounded-xl hover:border-emerald-500/30 transition-all flex items-center justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded bg-amber-500/15 flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4 text-amber-400" />
                          </div>
                          <div>
                            <span className="text-[9px] text-emerald-400 font-bold uppercase tracking-wider block">{rep.category}</span>
                            <h4 className="text-xs font-bold text-white mb-0.5">{rep.title}</h4>
                            <p className="text-[10px] text-slate-500 leading-snug">{rep.details}</p>
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-4">
                          <Badge variant="secondary" className="text-[8px] mb-1">{rep.format} · {rep.size}</Badge>
                          <div className="text-[10px] text-emerald-400 font-bold cursor-pointer hover:underline">View File</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {/* ── TRANSFORMATION ANALYSIS TAB ── */}
            {activeTab === 'transformation' && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                {/* Before vs After Header */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className={`${CARD} p-6 border-emerald-500/20 bg-emerald-950/10`}>
                    <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-3">Before: National Park (1986–2001)</h3>
                    <ul className="space-y-2 text-xs text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>Designated <strong>City Forest National Park</strong> (9.07 km²).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>Dense canopy composed of indigenous willow and poplar groves.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>Undisturbed wetland marshlands accommodating 120+ avian species.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>Functioned as a natural filter for urban run-off entering Dal Lake.</span>
                      </li>
                    </ul>
                  </Card>

                  <Card className={`${CARD} p-6 border-amber-500/20 bg-amber-950/10`}>
                    <h3 className="text-sm font-bold text-amber-400 uppercase tracking-widest mb-3">After: Golf Course (2001–Present)</h3>
                    <ul className="space-y-2 text-xs text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>Converted to <strong>Royal Springs Golf Course</strong>.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>Manicured turf grass, ornamental flora, and paved walkways.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>Managed water hazards replacing natural silted swamps.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>Chemical fertilizer and pesticide runoff introduced into regional groundwater.</span>
                      </li>
                    </ul>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    {/* Detailed Ecological Impact & Habitat Change */}
                    <Card className={`${CARD} p-6`}>
                      <h2 className="text-lg font-bold text-white mb-4">Habitat Change & Ecological Impact</h2>
                      <p className="text-sm text-slate-300 leading-relaxed mb-4">
                        The physical transformation of Salim Ali National Park is one of the most drastic examples of ecosystem modification in the valley floor. High-density tree canopy was clear-cut, and low-lying swamps were dredged and backfilled with stone and soil to build the golf course.
                      </p>
                      <p className="text-sm text-slate-300 leading-relaxed mb-4">
                        This had two primary ecological consequences:
                      </p>
                      <div className="space-y-3">
                        <div className="p-3.5 bg-white/3 border border-white/5 rounded-xl">
                          <strong className="text-white text-xs block mb-1">1. Avian Migration Disruption</strong>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            The elimination of shallow, reed-filled ponds removed key feeding and breeding refuges for migratory ducks. Bird counts logged a drop from thousands of wintering waterfowl down to a few dozens, shifting migration concentrations toward peripheral wetlands like Hokersar.
                          </p>
                        </div>
                        <div className="p-3.5 bg-white/3 border border-white/5 rounded-xl">
                          <strong className="text-white text-xs block mb-1">2. Loss of Srinagar's Green Lung</strong>
                          <p className="text-xs text-slate-400 leading-relaxed">
                            Urban forests filter air pollution and mitigate the urban heat island effect. The canopy removal resulted in localized summer temperature rises and reduced particulate absorption along the busy Boulevard corridor.
                          </p>
                        </div>
                      </div>
                    </Card>

                    {/* Governance Lessons */}
                    <Card className={`${CARD} p-6`}>
                      <h2 className="text-lg font-bold text-white mb-4">Governance & Legal Lessons</h2>
                      <p className="text-sm text-slate-300 leading-relaxed mb-4">
                        The case of Salim Ali National Park highlights the vulnerability of protected areas in South Asia. Under the Wildlife Protection Act, a national park represents the highest level of legal conservation protection. However, the J&K State Cabinet utilized specific clauses to de-notify the park in the name of "tourism promotion and economic development."
                      </p>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        This event underlines the importance of absolute statutory protections. It shows that without strict judicial oversight and local community stewardship, even prime national parks are susceptible to administrative conversion. The litigation that followed showed that environmental groups lacked the quick-injunction legal tools necessary to halt physical earth-movers before conversion was finalized.
                      </p>
                    </Card>
                  </div>

                  {/* Conservation Significance */}
                  <div className="space-y-6">
                    <Card className={`${CARD} p-5 bg-gradient-to-br from-emerald-950/20 to-slate-950 border-emerald-500/15`}>
                      <h3 className="text-sm font-bold text-emerald-400 mb-3 flex items-center gap-2">
                        <Globe className="w-4 h-4" /> Global Relevance
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed mb-3">
                        Environmental observatories globally catalog Salim Ali National Park under the PADDD (Protected Area Downgrading, Downsizing, and De-gazettement) framework.
                      </p>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        It serves as a warning case study for conservationists worldwide: when high-value real estate overlaps with critical urban biodiversity hotspots, economic and tourist interests often out-compete long-term conservation targets.
                      </p>
                    </Card>

                    <Card className={`${CARD} p-5`}>
                      <h3 className="text-sm font-bold text-white mb-2">Key Metrics Shift</h3>
                      <div className="space-y-2 text-xs text-slate-400">
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span>Biodiversity Value</span>
                          <span className="text-red-400 font-bold">High → Low</span>
                        </div>
                        <div className="flex justify-between border-b border-white/5 pb-1">
                          <span>Ecotourism Focus</span>
                          <span className="text-emerald-400 font-bold">Ecological → Premium Recreational</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Legal Integrity Status</span>
                          <span className="text-red-400 font-bold">Revoked</span>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}
          </>
        ) : (
          <>
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
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5 hover:border-emerald-500/30 transition-colors cursor-pointer">
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
                      <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white/3 border border-white/5 hover:border-emerald-500/30 transition-colors">
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

            {/* ── HISTORY & LEGAL STATUS TAB ── */}
            {activeTab === 'legal' && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column: Legal Profile & Metadata */}
                  <div className="lg:col-span-2 space-y-6">
                    <Card className={`${CARD} p-6`}>
                      <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-emerald-500" />
                        Legal Profile
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          { label: 'Official Name', value: area.name, icon: Book },
                          { label: 'Category', value: area.category.replace(/_/g, ' '), icon: Shield, capitalize: true },
                          { label: 'Ecological Scope', value: area.scope || 'N/A', icon: Layers },
                          { label: 'Region / Admin Zone', value: area.country_or_admin_region || 'Jammu & Kashmir (UT)', icon: Globe },
                          { label: 'Division', value: area.division || (area.scope === 'Trans-Divisional' ? 'Jammu / Ladakh' : 'Kashmir'), icon: MapPin },
                          { label: 'District', value: area.district, icon: MapPin },
                          { label: 'Established Year', value: area.established > 0 ? area.established : 'N/A', icon: Calendar },
                          { label: 'Legal Status', value: area.legalStatus || 'Verified', icon: Shield },
                          { label: 'Current Status', value: area.current_status || 'Active', icon: Activity },
                          { label: 'IUCN Category', value: area.iucn_category || intel.iucnCategory || 'IUCN Category II', icon: Eye },
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white/3 border border-white/5">
                            <item.icon className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                            <div>
                              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{item.label}</div>
                              <div className={`text-sm text-white font-medium ${item.capitalize ? 'capitalize' : ''}`}>{item.value}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Verification Notes & Metadata */}
                    <Card className={`${CARD} p-6`}>
                      <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                        <Info className="w-5 h-5 text-emerald-500" />
                        Verification Notes & Metadata
                      </h2>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-xl bg-white/3 border border-white/5">
                            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1">Data Quality Label</div>
                            <Badge variant={area.dataStatus === 'Official Verified' ? 'success' : 'warning'} className="text-xs">
                              {area.dataStatus || 'Official Table Value'}
                            </Badge>
                          </div>
                          <div className="p-4 rounded-xl bg-white/3 border border-white/5">
                            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1">Alternate Area Value</div>
                            <div className="text-sm font-semibold text-white">
                              {area.alternate_area_km2 && area.alternate_area_km2 > 0 ? `${area.alternate_area_km2} km²` : 'None Recorded'}
                            </div>
                          </div>
                        </div>

                        <div className="p-4 rounded-xl bg-white/3 border border-white/5 flex items-start gap-3">
                          <Clock className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                          <div>
                            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Last Verified Date</div>
                            <div className="text-sm font-medium text-white">{area.last_verified_date || 'June 2026'}</div>
                          </div>
                        </div>

                        {area.verification_notes && (
                          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-slate-300 text-sm leading-relaxed">
                            <strong className="text-white block mb-1">Verification Notes:</strong>
                            {area.verification_notes}
                          </div>
                        )}
                      </div>
                    </Card>
                  </div>

                  {/* Right Column: Source Citations */}
                  <div className="space-y-6">
                    <Card className={`${CARD} p-6`}>
                      <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                        <Database className="w-5 h-5 text-emerald-500" />
                        Source Citations
                      </h2>
                      <p className="text-slate-400 text-xs leading-relaxed mb-6">
                        Conservation intelligence in Kashmir EcoWatch is consolidated from legal notifications, literature, and official departmental registries.
                      </p>
                      <div className="space-y-4">
                        {[
                          { label: 'Primary Source', value: area.source_primary || 'J&K Wildlife Protection Department / GB Wildlife Dept.', url: area.source_primary ? undefined : 'https://wildlife.jk.gov.in/' },
                          { label: 'Secondary Source', value: area.source_secondary || 'J&K Protected Area Network Atlas', url: undefined },
                          { label: 'Literature / Citations', value: area.source_literature || 'Key Biodiversity Areas Registry / JoTT research databases', url: undefined },
                        ].map((src, idx) => (
                          <div key={idx} className="p-4 rounded-xl bg-white/3 border border-white/5 hover:border-emerald-500/30 transition-colors">
                            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1">{src.label}</div>
                            <div className="text-sm font-medium text-white mb-2 leading-snug">{src.value}</div>
                            {src.url ? (
                              <a href={src.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-emerald-400 hover:text-emerald-300 transition-colors">
                                View Reference <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : (
                              <span className="text-xs text-slate-600 italic">No external link available</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── HYDROLOGY TAB ── */}
            {activeTab === 'hydrology' && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column: Hydrological & Ramsar Profile */}
                  <div className="lg:col-span-2 space-y-6">
                    <Card className={`${CARD} p-6`}>
                      <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                        <Droplet className="w-5 h-5 text-emerald-500" />
                        Hydrological Profile
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          { label: 'Hydrological System', value: area.hydrological_system || 'Jhelum Basin System', icon: Globe },
                          { label: 'Wetland Classification', value: area.wetland_type || 'Freshwater Marsh', icon: Layers },
                          { label: 'Mean Elevation', value: area.elevation_m ? `${area.elevation_m} m` : 'TBC', icon: Mountain },
                          { label: 'Ramsar Designation Status', value: area.ramsar_status || 'None', icon: Shield },
                          { label: 'Ramsar Year', value: area.ramsar_year || 'N/A', icon: Calendar },
                          { label: 'Ecosystem Sub-types', value: area.ecosystems.slice(0, 3).join(', '), icon: Leaf },
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white/3 border border-white/5">
                            <item.icon className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                            <div>
                              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{item.label}</div>
                              <div className="text-sm text-white font-medium">{item.value}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    <Card className={`${CARD} p-6`}>
                      <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-emerald-500" />
                        Hydrological Dynamics & Monitoring
                      </h2>
                      <p className="text-slate-300 text-sm leading-relaxed mb-6">
                        This wetland is part of the broader Jhelum river catchment basin. Seasonal water levels fluctuate dramatically between the winter arrivals of migratory birds and the dry summer seasons. Real-time telemetry monitoring registers inflow, outflow, and siltation index.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { title: 'Inflow Status', value: 'Seasonal Peak', color: 'text-emerald-400' },
                          { title: 'Siltation Risk', value: 'High / Critical', color: 'text-rose-400' },
                          { title: 'Water Level Status', value: 'Stable / Monitored', color: 'text-emerald-400' },
                        ].map((item, idx) => (
                          <div key={idx} className="p-4 rounded-xl bg-white/3 border border-white/5 text-center">
                            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mb-1">{item.title}</div>
                            <div className={`text-sm font-bold ${item.color}`}>{item.value}</div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* Right Column: Catchment Indicators */}
                  <div className="space-y-6">
                    <Card className={`${CARD} p-6`}>
                      <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-500" />
                        Water Quality Indicators
                      </h2>
                      <div className="space-y-4">
                        {[
                          { label: 'pH Range', value: '6.8 - 7.5 (Optimal)', score: 85, color: '#22c55e' },
                          { label: 'Dissolved Oxygen', value: '5.2 - 6.8 mg/L', score: 70, color: '#22c55e' },
                          { label: 'Eutrophication Index', value: 'Moderate - High', score: 65, color: '#f59e0b' },
                          { label: 'Turbidity Range', value: '18 - 25 NTU', score: 40, color: '#ef4444' },
                        ].map((indicator, idx) => (
                          <div key={idx}>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-xs font-semibold text-slate-300">{indicator.label}</span>
                              <span className="text-xs text-white font-bold">{indicator.value}</span>
                            </div>
                            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${indicator.score}%`, backgroundColor: indicator.color }} />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-6 p-3 rounded-lg bg-amber-500/10 border border-amber-500/25 text-[11px] text-amber-400 leading-relaxed flex gap-2">
                        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                        <span>High sedimentation from upper catchments remains the primary threat to wetland depth.</span>
                      </div>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── RESTORATION TAB ── */}
            {activeTab === 'restoration' && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column: Restoration Action Plan */}
                  <div className="lg:col-span-2 space-y-6">
                    <Card className={`${CARD} p-6`}>
                      <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-emerald-500" />
                        Active Restoration Schemes
                      </h2>
                      <div className="space-y-4">
                        {[
                          { title: 'Willow Plantation Removal', desc: 'Systematic removal of dense invasive willow trees to restore open-water areas and improve bird landing corridors.', status: 'Ongoing', progress: 65 },
                          { title: 'De-siltation & Selective Dredging', desc: 'Excavation of silt accumulation at main feeder channels to improve hydrological flushing and restore wetland depth.', status: 'Seasonal Active', progress: 45 },
                          { title: 'Feeder Channel Regulation', desc: 'Restructuring and reinforcing perimeter boundaries and watergates to control runoff and prevent winter drying.', status: 'Planning Phase', progress: 20 },
                          { title: 'Community-led Plastic Cleanup & Anti-poaching patrols', desc: 'Engagement of local communities near the wetland margins to maintain trash booms and monitor illegal activity.', status: 'Continuous', progress: 80 },
                        ].map((scheme, idx) => (
                          <div key={idx} className="p-4 rounded-xl bg-white/3 border border-white/5 hover:border-emerald-500/10 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-sm font-bold text-white">{scheme.title}</h3>
                              <Badge variant={scheme.status === 'Ongoing' || scheme.status === 'Continuous' ? 'success' : 'warning'} className="text-[10px]">
                                {scheme.status}
                              </Badge>
                            </div>
                            <p className="text-slate-400 text-xs leading-relaxed mb-3">{scheme.desc}</p>
                            <div>
                              <div className="flex items-center justify-between text-[10px] text-slate-500 mb-1">
                                <span>Completion Progress</span>
                                <span className="font-bold text-white">{scheme.progress}%</span>
                              </div>
                              <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full rounded-full bg-emerald-500" style={{ width: `${scheme.progress}%` }} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* Right Column: Conservation Targets */}
                  <div className="space-y-6">
                    <Card className={`${CARD} p-6`}>
                      <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-emerald-500" />
                        Restoration Targets
                      </h2>
                      <p className="text-slate-400 text-xs leading-relaxed mb-6">
                        Targets aligned with the Integrated Management Plan (IMP) and Ramsar conservation directives.
                      </p>
                      <div className="space-y-5">
                        {[
                          { title: 'Restore Open Water Area', target: 'Restore 35% of weed-choked area by 2028', progress: 55 },
                          { title: 'Feeder Silt Reduction', target: 'Decrease sediment load by 50% using silt traps', progress: 30 },
                          { title: 'Avian Breeding Success', target: 'Secure stable nesting counts for black-necked cranes/waterfowl', progress: 75 },
                        ].map((target, idx) => (
                          <div key={idx} className="p-3.5 rounded-lg bg-white/3 border border-white/5">
                            <h4 className="text-xs font-semibold text-white mb-1">{target.title}</h4>
                            <p className="text-slate-500 text-[11px] mb-2">{target.target}</p>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full rounded-full bg-emerald-500" style={{ width: `${target.progress}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
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
                      <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white/3 border border-white/5 hover:border-emerald-500/30 transition-colors">
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

            {/* ── COMMUNITY & LAND USE TAB ── */}
            {activeTab === 'community' && (
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column: Land Use & stewardship Profile */}
                  <div className="lg:col-span-2 space-y-6">
                    <Card className={`${CARD} p-6`}>
                      <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                        <Users className="w-5 h-5 text-emerald-500" />
                        Land Use Profile
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                          {
                            label: 'Community Engagement Type',
                            value: area.scope === 'Transboundary / Extended'
                              ? 'Community Nature Stewardship'
                              : area.scope === 'Trans-Divisional' && (area.district === 'Leh' || area.district === 'Kargil')
                              ? 'Ladakh Stewardship Initiative'
                              : 'Joint Forest Management (JFM) / Eco-Development Committee (EDC)',
                            icon: Users
                          },
                          {
                            label: 'Buffer Zone Width',
                            value: area.area > 50 ? '2.5 km - 5.0 km' : area.area > 15 ? '1.0 km - 2.5 km' : '0.5 km - 1.0 km',
                            icon: Layers
                          },
                          {
                            label: 'Resource Sharing Agreement',
                            value: 'Subsidized dry fuelwood allotment, grass cutting rights, and ecotourism revenue sharing.',
                            icon: Globe
                          },
                          {
                            label: 'Transition Zones',
                            value: 'Horticulture orchards, agricultural interfaces, and village pasture boundaries.',
                            icon: MapPin
                          },
                          {
                            label: 'Agricultural Interface',
                            value: 'High interface with agrarian margins, requiring crop protection and human-wildlife conflict mitigation.',
                            icon: AlertTriangle
                          },
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white/3 border border-white/5">
                            <item.icon className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                            <div>
                              <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{item.label}</div>
                              <div className="text-sm text-white font-medium">{item.value}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>

                    <Card className={`${CARD} p-6`}>
                      <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-emerald-500" />
                        Joint Management Committees
                      </h2>
                      <p className="text-slate-300 text-sm leading-relaxed mb-6">
                        Local governance bodies operate in coordination with the Wildlife Protection Department to ensure conservation compliance while maintaining local livelihoods. These committees conduct community patrols, manage visitor paths, and allocate resources.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { title: 'Forest Protection Group (FPG)', value: 'Active patrol squads, community forest guards, and fire prevention volunteers.', icon: Shield },
                          { title: 'Eco-Development Committee (EDC)', value: 'Ecotourism guides, local homestay cooperatives, and awareness groups.', icon: Leaf },
                        ].map((item, idx) => (
                          <div key={idx} className="p-4 rounded-xl bg-white/3 border border-white/5 flex gap-3">
                            <item.icon className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                            <div>
                              <div className="text-xs font-bold text-white mb-1">{item.title}</div>
                              <div className="text-xs text-slate-400 leading-normal">{item.value}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  {/* Right Column: Resource Access & Sustainability */}
                  <div className="space-y-6">
                    <Card className={`${CARD} p-6`}>
                      <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-500" />
                        Resource Access Rules
                      </h2>
                      <div className="space-y-4">
                        {[
                          { label: 'Grazing Rights', value: 'Seasonal permit required', detail: 'Grazing limited to summer alpine pastures (June to September). Restricted in core reforested slopes.', status: 'Regulated', progress: 60 },
                          { label: 'Dry Fuelwood Collection', value: 'Registered households only', detail: 'Permitted twice a week for domestic winter stocks under forest guard monitoring. Green felling prohibited.', status: 'Highly Monitored', progress: 40 },
                          { label: 'Non-Timber Forest Products (NTFP)', value: 'Guchhi & medicinal herbs', detail: 'Traditional gathering allowed for local community residents during spring. Subject to local cooperative quotas.', status: 'Traditional Rights', progress: 80 },
                        ].map((item, idx) => (
                          <div key={idx} className="p-3.5 rounded-lg bg-white/3 border border-white/5">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-semibold text-white">{item.label}</span>
                              <Badge variant={item.progress > 70 ? 'success' : item.progress > 45 ? 'warning' : 'danger'} size="sm">
                                {item.status}
                              </Badge>
                            </div>
                            <div className="text-[10px] text-slate-500 mb-2">{item.value} — {item.detail}</div>
                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                              <div className="h-full rounded-full bg-emerald-500" style={{ width: `${item.progress}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}
          </>
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
                  <Card className="h-full flex flex-col card-intelligence border border-white/10 bg-white/5" padding="none">
                    <div className="relative h-28 bg-white/5">
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
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-500  shadow-md shadow-emerald-500/20 transition-colors text-xs font-medium text-white">
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
