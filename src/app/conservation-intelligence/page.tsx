'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Network, BookOpen, ExternalLink, ArrowRight,
  Users, Leaf, Trees, Droplet, Fish, Mountain,
  Pill, FileText, Map, ChevronRight,
  Target, GitBranch, Globe, Layers,
  AlertTriangle, CheckCircle, Scale,
  Activity, Eye, TrendingUp, Sliders,
  HelpCircle, Compass, Thermometer, Sparkles,
  Search, Info, Database, Play, CheckCircle2,
  AlertCircle, ArrowUpRight, Flame, Clock
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Heading } from '@/components/common/Heading';
import { Select } from '@/components/ui/Select';

// ============================================================
// DATA: ESRO Conservation Networks (Legacy Preservation)
// ============================================================
const conservationNetworks = [
  {
    id: 'bcn',
    name: 'Biodiversity Conservation Network',
    acronym: 'BCN',
    esroFile: 'bcn_eienkashmir.htm',
    description: 'Comprehensive biodiversity conservation framework covering wildlife, plants, fisheries, medicinal plants, and human-wildlife conflict management across Kashmir.',
    color: 'from-emerald-500 to-teal-600',
    icon: Leaf,
    subPrograms: [
      {
        name: 'Council for Wildlife Protection & Research',
        acronym: 'CWPR',
        description: 'Wildlife species protection, research coordination, and conservation policy development.',
        icon: Shield,
        color: 'from-green-500 to- emerald-700',
      },
      {
        name: 'Council for Plant Protection & Research',
        acronym: 'CPPR',
        description: 'Flora conservation, botanical research, and endangered plant species protection.',
        icon: Trees,
        color: 'from-teal-500 to-cyan-600',
      },
      {
        name: 'Wildlife Human Conflict Management Programme',
        acronym: 'WHCMP',
        description: 'Mitigation strategies for human-wildlife conflict, compensation frameworks, and community safety.',
        icon: AlertTriangle,
        color: 'from-amber-500 to-orange-600',
      },
      {
        name: 'Chinar Conservation Network',
        acronym: 'CCN',
        description: 'Protection and regeneration of Kashmir\'s iconic Chinar trees (Platanus orientalis) heritage.',
        icon: Trees,
        color: 'from-red-500 to-rose-600',
      },
      {
        name: 'Fisheries Conservation & Protection Council',
        acronym: 'FCPC',
        description: 'Aquatic biodiversity conservation, fish species protection, and sustainable fisheries management.',
        icon: Fish,
        color: 'from-blue-500 to-indigo-600',
      },
      {
        name: 'Conservation Alliance for Medicinal Plants',
        acronym: 'CAMP',
        description: 'Medicinal plant conservation, sustainable harvesting, and traditional knowledge preservation.',
        icon: Pill,
        color: 'from-purple-500 to-violet-600',
      },
    ],
    ecoWatchMapping: [
      { module: 'Biodiversity Intelligence', path: '/biodiversity', description: 'Species database, threat monitoring, conservation analytics' },
      { module: 'Protected Network', path: '/protected-network', description: 'Protected areas, corridors, species monitoring' },
      { module: 'Risk Monitoring: Human-Wildlife Conflict', path: '/risk-monitoring/human-wildlife-conflict', description: 'Conflict incidents, mitigation strategies' },
      { module: 'Water Systems: Fisheries', path: '/water-systems', description: 'Aquatic biodiversity, fish conservation' },
    ],
  },
  {
    id: 'cank',
    name: 'Climate Action Network Kashmir',
    acronym: 'CANK',
    esroFile: 'cank_eienkashmir.htm',
    description: 'Regional climate action coordination network addressing climate change impacts, mitigation strategies, and adaptation planning for Kashmir Valley.',
    color: 'from-sky-500 to-blue-600',
    icon: Globe,
    subPrograms: [],
    ecoWatchMapping: [
      { module: 'Risk Monitoring: Global Warming Impacts', path: '/risk-monitoring/global-warming-impacts', description: 'Temperature trends, climate impact assessment' },
      { module: 'Risk Monitoring: Glacier & Cryosphere', path: '/risk-monitoring/glacier-cryosphere-risks', description: 'Glacier retreat, snow cover monitoring' },
      { module: 'Seasonal Ecology', path: '/seasonal-ecology', description: 'Phenology shifts, seasonal pattern changes' },
    ],
  },
  {
    id: 'thcnp',
    name: 'Trans-Himalaya Conservation Network Plan',
    acronym: 'THCNP',
    esroFile: 'thcnp_eienkashmir.htm',
    description: 'Cross-border conservation planning for Trans-Himalayan ecosystems, high-altitude biodiversity, and landscape-level ecological connectivity.',
    color: 'from-violet-500 to-purple-600',
    icon: Mountain,
    subPrograms: [],
    ecoWatchMapping: [
      { module: 'Protected Network: Atlas', path: '/protected-network/atlas', description: 'Spatial conservation planning, landscape mapping' },
      { module: 'Protected Network: Corridors', path: '/protected-network/corridors-and-connectivity', description: 'Ecological connectivity, corridor protection' },
      { module: 'Biodiversity: Threatened Species', path: '/biodiversity/threatened-species', description: 'Trans-Himalayan threatened species monitoring' },
    ],
  },
  {
    id: 'cpep',
    name: 'Conservation & Peace Environment Programme',
    acronym: 'CPEP',
    esroFile: 'cpep_eienkashmir.htm',
    description: 'Environment-peacebuilding initiative integrating conservation with community development, sustainable livelihoods, and conflict-sensitive environmental management.',
    color: 'from-amber-500 to-orange-600',
    icon: Scale,
    subPrograms: [],
    ecoWatchMapping: [
      { module: 'Risk Monitoring: Incident Reports', path: '/risk-monitoring/incident-reports', description: 'Environmental incident documentation' },
      { module: 'Field Reports', path: '/field-reports', description: 'Community-based environmental reporting' },
      { module: 'About: Partners', path: '/about/partners', description: 'Multi-stakeholder conservation partnerships' },
    ],
  },
];

const researchPartners = [
  { domain: 'Wildlife Biology', count: 8, expertise: 'Species ecology, population monitoring, habitat assessment' },
  { domain: 'Forestry', count: 6, expertise: 'Forest management, silviculture, forest ecology' },
  { domain: 'Agriculture', count: 5, expertise: 'Crop systems, agroecology, sustainable agriculture' },
  { domain: 'Natural History', count: 4, expertise: 'Taxonomy, biogeography, ecological documentation' },
  { domain: 'Taxonomy', count: 4, expertise: 'Species identification, classification, systematics' },
  { domain: 'Fisheries', count: 4, expertise: 'Aquatic ecology, fish biology, fisheries management' },
  { domain: 'Tourism', count: 3, expertise: 'Ecotourism, sustainable tourism, visitor management' },
  { domain: 'Zoology', count: 4, expertise: 'Animal biology, behavior, physiology' },
  { domain: 'Biotechnology', count: 3, expertise: 'Genetic analysis, conservation genetics, molecular tools' },
  { domain: 'Protected Area Management', count: 4, expertise: 'PA planning, management effectiveness, monitoring' },
];

// ============================================================
// DATA: 32 KEW Models Registry
// ============================================================
interface KewModel {
  id: number;
  tier: number;
  tierName: string;
  name: string;
  description: string;
  metrics: string[];
  outputType: string;
  recommended: boolean;
}

const kewModels: KewModel[] = [
  // Tier 1: Core Intelligence Engines
  {
    id: 1,
    tier: 1,
    tierName: 'Core Intelligence Engines',
    name: 'Protected Area Health Index (PAHI)',
    description: 'Calculates overall health scores for protected areas using weighted indices: Habitat Integrity (20%), Species Richness (20%), Threat Pressure (20%), Monitoring Coverage (15%), Connectivity Value (15%), and Research Coverage (10%).',
    metrics: ['Habitat Integrity (20%)', 'Species Richness (20%)', 'Threat Pressure (20%)', 'Monitoring Coverage (15%)', 'Connectivity Value (15%)', 'Research Coverage (10%)'],
    outputType: 'PAHI Score (0-100) & Health Status (e.g. Excellent, Good, Fair, Critical)',
    recommended: true,
  },
  {
    id: 2,
    tier: 1,
    tierName: 'Core Intelligence Engines',
    name: 'Conservation Priority Index (CPI)',
    description: 'Ranks and prioritizes conservation zones requiring urgent management intervention based on active threat level, encroachment rate, species sensitivity, and habitat decline.',
    metrics: ['Threat Severity', 'Encroachment Records', 'Species Sensitivity', 'Habitat Decline'],
    outputType: 'CPI Score (0-100) & Intervention Priority Level',
    recommended: true,
  },
  {
    id: 3,
    tier: 1,
    tierName: 'Core Intelligence Engines',
    name: 'Species Conservation Index (SCI)',
    description: 'Tracks conservation status of key wildlife, assessing population trend, protected area coverage, active monitoring intensity, habitat fragmentation, and threat levels.',
    metrics: ['Population Trend', 'Protected Area Overlap', 'Monitoring Intensity', 'Habitat Fragmentation', 'Threat Level'],
    outputType: 'SCI Score (0-100) per Species',
    recommended: true,
  },
  {
    id: 4,
    tier: 1,
    tierName: 'Core Intelligence Engines',
    name: 'Habitat Integrity Index',
    description: 'Assesses local ecosystem health and condition, evaluating water quality, canopy cover, fragmentation, vegetation health, and human encroachment.',
    metrics: ['Water Quality', 'Fragmentation Index', 'Vegetation Canopy Cover', 'Encroachment Alerts'],
    outputType: 'Integrity Score (0-100)',
    recommended: true,
  },
  {
    id: 5,
    tier: 1,
    tierName: 'Core Intelligence Engines',
    name: 'Corridor Integrity Index',
    description: 'Evaluates viability and connectivity of wildlife corridors across landscape linkages, analyzing road crossings, land use change, and structural fragmentation.',
    metrics: ['Connectivity Value', 'Structural Fragmentation', 'Road Crossing Incidents', 'Land Use Change Index'],
    outputType: 'Corridor Score (0-100) & Viability Rating',
    recommended: true,
  },

  // Tier 2: Advanced Spatial Intelligence
  {
    id: 6,
    tier: 2,
    tierName: 'Advanced Spatial Intelligence',
    name: 'Species-Habitat Suitability Model',
    description: 'Spatial modeling predicting potential species distribution (where they SHOULD exist) rather than just where they have been observed. Uses elevation, forest canopy, water systems, and human disturbance overlays.',
    metrics: ['Elevation Model', 'Forest Canopy Cover', 'Hydrographic Distances', 'Disturbance Mapping'],
    outputType: 'Potential Habitat Map Layer & Grid Suitability Score',
    recommended: true,
  },
  {
    id: 7,
    tier: 2,
    tierName: 'Advanced Spatial Intelligence',
    name: 'Species Expansion Model',
    description: 'Predicts potential wildlife range expansion and migration shifts over 5, 10, and 20-year horizons based on climate change, restoration progress, and corridor viability.',
    metrics: ['Habitat Suitability Shifts', 'Corridor Connectivity', 'Community Pressures', 'Water Availability Trends'],
    outputType: 'Expansion Projection Maps & Range Risk Factors',
    recommended: false,
  },
  {
    id: 8,
    tier: 2,
    tierName: 'Advanced Spatial Intelligence',
    name: 'Climate Vulnerability Model',
    description: 'Assesses vulnerability of species, habitats, and protected areas under various IPCC climate scenarios, highlighting high-altitude risks, temperature anomalies, and phenology shifts.',
    metrics: ['Temperature Anomalies', 'Precipitation Variation', 'Glacial Runoff Profiles', 'Invasive Range Expansion'],
    outputType: 'Risk Rating (High / Moderate / Low) & Climate Resilience Plan',
    recommended: true,
  },
  {
    id: 9,
    tier: 2,
    tierName: 'Advanced Spatial Intelligence',
    name: 'Wetland Vulnerability Model',
    description: 'Evaluates wetland ecosystem risk levels based on water loss rates, peripheral agricultural encroachment, nutrient pollution, and migratory bird decline signals.',
    metrics: ['Water Level Decline', 'Siltation Rate', 'Pollution Index', 'Migratory Bird Trends'],
    outputType: 'Wetland Risk Score (0-100) & Vulnerability Report',
    recommended: false,
  },
  {
    id: 10,
    tier: 2,
    tierName: 'Advanced Spatial Intelligence',
    name: 'Forest Fragmentation Model',
    description: 'Automatically analyzes satellite canopy data to identify isolated forests, habitat islands, and shrinking forest blocks, signaling genetic isolation risks.',
    metrics: ['Canopy Density', 'Patch Size Distribution', 'Edge-to-Interior Ratio', 'Connectivity Gaps'],
    outputType: 'Fragmentation Map & Isolated Patch Registry',
    recommended: false,
  },

  // Tier 3: Threat Intelligence
  {
    id: 11,
    tier: 3,
    tierName: 'Threat Intelligence',
    name: 'Encroachment Detection Engine',
    description: 'Compares seasonal high-resolution satellite imagery (e.g. 2025 vs 2026) to automatically detect unauthorized buildings, road expansions, and agricultural sprawl inside protected boundaries.',
    metrics: ['Satellite Imagery Comparison', 'Building footprints detected', 'New road tracks (km)', 'Agricultural encroachment (Ha)'],
    outputType: 'Encroachment Alerts, Difference Maps & Coordinate Logs',
    recommended: true,
  },
  {
    id: 12,
    tier: 3,
    tierName: 'Threat Intelligence',
    name: 'Conservation Alert Engine',
    description: 'Triggers automated alerts when critical habitat loss, illegal logging, or fire activity is detected in core conservation landscapes.',
    metrics: ['Thermal anomalies', 'Canopy loss detection', 'Field patrol reports'],
    outputType: 'Conservation Alerts (e.g. Habitat loss detected at Khrew Conservation Reserve)',
    recommended: false,
  },
  {
    id: 13,
    tier: 3,
    tierName: 'Threat Intelligence',
    name: 'Illegal Activity Risk Model',
    description: 'Predictive modeling mapping hotspots of poaching risk, illegal logging, and land encroachment based on past incident locations, road access, and ranger patrol density.',
    metrics: ['Historical incident rates', 'Distance to roads', 'Ranger patrol frequency', 'Socio-economic indicators'],
    outputType: 'Illegal Activity Hotspot Map & Risk Probability',
    recommended: false,
  },
  {
    id: 14,
    tier: 3,
    tierName: 'Threat Intelligence',
    name: 'Human-Wildlife Conflict Model',
    description: 'Predicts zones of potential wildlife-human conflict (bear sightings, leopard crop damage, livestock predation) to support mitigation planning and community early warning.',
    metrics: ['Crop damage records', 'Livestock grazing overlap', 'Fringe settlement density', 'Seasonal movement patterns'],
    outputType: 'Conflict Zone Maps & Community Mitigation Plans',
    recommended: false,
  },

  // Tier 4: Species Intelligence
  {
    id: 15,
    tier: 4,
    tierName: 'Species Intelligence',
    name: 'Protected Area Dependence Model',
    description: 'Quantifies the legal and physical dependence of key species on existing protected networks (e.g., Hangul dependency of 87% on Dachigam Landscape).',
    metrics: ['Seasonal range overlap', 'Core breeding sites inside PAs', 'Resource dependency values'],
    outputType: 'Dependency Percentage & Critical Range Map',
    recommended: false,
  },
  {
    id: 16,
    tier: 4,
    tierName: 'Species Intelligence',
    name: 'Species Overlap Model',
    description: 'Overlays range distribution models of multiple species (e.g., Hangul, Asiatic Black Bear, Leopard) to detect multispecies hotspots and co-occurrence dynamics.',
    metrics: ['Sightings correlation', 'Habitat sharing indices', 'Predator-prey overlap'],
    outputType: 'Overlap Density Map & Co-occurrence Index',
    recommended: false,
  },
  {
    id: 17,
    tier: 4,
    tierName: 'Species Intelligence',
    name: 'Keystone Species Engine',
    description: 'Identifies the top 50 keystone species essential for ecosystem stability and ecological functioning across Kashmir conservation landscapes.',
    metrics: ['Trophic network centrality', 'Functional trait redundancy', 'Ecosystem engineering impact'],
    outputType: 'Keystone Species Scorecard & Priority Checklist',
    recommended: false,
  },
  {
    id: 18,
    tier: 4,
    tierName: 'Species Intelligence',
    name: 'Flagship Species Dashboard',
    description: 'Centralized status updates for Kashmir\'s core flagship species: Hangul, Snow Leopard, Markhor, Black-necked Crane, and Western Tragopan.',
    metrics: ['Population size', 'Active threats', 'Conservation actions', 'Public sighting logs'],
    outputType: 'Flagship Species Status Dashboard',
    recommended: false,
  },

  // Tier 5: Research Intelligence
  {
    id: 19,
    tier: 5,
    tierName: 'Research Intelligence',
    name: 'Research Gap Engine',
    description: 'Analyzes publications, reports, and field data logs to identify species and protected areas that are critically under-researched.',
    metrics: ['Publication count after 2015', 'Researcher site visits', 'Data completeness score'],
    outputType: 'Under-Studied Species Registry & Site Recommendations',
    recommended: true,
  },
  {
    id: 20,
    tier: 5,
    tierName: 'Research Intelligence',
    name: 'Monitoring Gap Engine',
    description: 'Cross-references active field programs to highlight protected areas with zero active ground patrols, telemetry monitoring, or citizen science coverage.',
    metrics: ['Ranger logs', 'Citizen science submissions', 'Telemetry tracker count'],
    outputType: 'Unmonitored Areas Warning Map & Gap Analysis',
    recommended: false,
  },
  {
    id: 21,
    tier: 5,
    tierName: 'Research Intelligence',
    name: 'Data Confidence Engine',
    description: 'Applies a confidence rating (High, Medium, Low) to every biodiversity and environmental record, filtering out noise from citizen science data.',
    metrics: ['Source validation status', 'Observer experience rating', 'Geographic precision'],
    outputType: 'Confidence Score (High / Medium / Low) per Record',
    recommended: false,
  },

  // Tier 6: Visitor & Observation Intelligence
  {
    id: 22,
    tier: 6,
    tierName: 'Visitor & Observation Intelligence',
    name: 'Biodiversity Hotspot Ranking',
    description: 'Automatically ranks and maps the top 100 biodiversity hotspots in Kashmir based on species richness, endemic presence, and habitat condition.',
    metrics: ['Species density', 'Rare species occurrences', 'Habitat condition score'],
    outputType: 'Top 100 Hotspots Registry & Travel Advisories',
    recommended: false,
  },
  {
    id: 23,
    tier: 6,
    tierName: 'Visitor & Observation Intelligence',
    name: 'Best Birding Site Ranking',
    description: 'Ranks bird-watching locations dynamically using eBird and local sighting data, filtered by seasonal migrations.',
    metrics: ['Bird species counts', 'Migratory sightings logs', 'Accessibility indices'],
    outputType: 'Best Birding Locations Grid & Seasonal Guide',
    recommended: false,
  },
  {
    id: 24,
    tier: 6,
    tierName: 'Visitor & Observation Intelligence',
    name: 'Seasonal Wildlife Calendar',
    description: 'Provides a seasonal calendar predicting peaks of wildlife movements and bird migrations (e.g. March: Migratory Geese, May: Kashmir Flycatcher, July: Monal breeding, November: Waterfowl arrival).',
    metrics: ['Migration dates', 'Sighting frequencies', 'Breeding season models'],
    outputType: 'Interactive Seasonal Calendar Interface',
    recommended: false,
  },

  // Tier 7: Executive Dashboards
  {
    id: 25,
    tier: 7,
    tierName: 'Executive Dashboards',
    name: 'State of Kashmir Biodiversity Dashboard',
    description: 'A unified executive view compiling protected areas, species status, wetland health indicators, corridors, and threat levels on a single control screen.',
    metrics: ['PA Status indicators', 'Species index trend', 'Wetland health indicators', 'Threat alarm count'],
    outputType: 'Executive Dashboard Panel',
    recommended: false,
  },
  {
    id: 26,
    tier: 7,
    tierName: 'Executive Dashboards',
    name: 'State of Wetlands Dashboard',
    description: 'Tracks water levels, siltation rates, and biodiversity counts across Kashmir\'s primary wetlands (Wular, Hokersar, Shallabugh, Hygam).',
    metrics: ['Water surface area', 'Silt depth', 'Waterfowl count', 'Encroachment area'],
    outputType: 'Wetland Health Status Tracker',
    recommended: false,
  },
  {
    id: 27,
    tier: 7,
    tierName: 'Executive Dashboards',
    name: 'State of Hangul Dashboard',
    description: 'A dedicated dashboard detailing Dachigam Hangul population counts, seasonal migration routes, threat incidents, and genetics data.',
    metrics: ['Population count', 'Movement logs', 'Foraging availability', 'Threat alerts'],
    outputType: 'Hangul Conservation Dashboard',
    recommended: false,
  },
  {
    id: 28,
    tier: 7,
    tierName: 'Executive Dashboards',
    name: 'State of Snow Leopard Dashboard',
    description: 'Tracks snow leopard populations, camera trap sightings, high-altitude habitat corridors, and human-wildlife conflict zones in Kashmir/Ladakh boundary zones.',
    metrics: ['Camera trap count', 'Verified sightings', 'Conflict reports', 'Corridor integrity'],
    outputType: 'Snow Leopard Range Dashboard',
    recommended: false,
  },

  // Tier 8: KEW Model Analysts
  {
    id: 29,
    tier: 8,
    tierName: 'KEW Model Analysts',
    name: 'KEW Conservation Analyst',
    description: 'Queries database and alerts to dynamically answer questions regarding protected area deterioration, listing affected indicators and root causes.',
    metrics: ['Index drift analysis', 'Multi-source alerts correlation', 'Risk ranking engines'],
    outputType: 'Deterioration Report & Spatial Recommendations',
    recommended: true,
  },
  {
    id: 30,
    tier: 8,
    tierName: 'KEW Model Analysts',
    name: 'KEW Species Analyst',
    description: 'Ecological spatial modeling engine that answers queries about potential expansion areas, migration corridors, and barriers for key species.',
    metrics: ['Corridor integrity indicators', 'Suitability map transitions', 'Anthropogenic obstacles'],
    outputType: 'Expansion Suitability Map & Priority Interventions Report',
    recommended: false,
  },
  {
    id: 31,
    tier: 8,
    tierName: 'KEW Model Analysts',
    name: 'KEW Threat Analyst',
    description: 'Evaluates wetland vulnerability using historical data models to rank lakes and marshes by encroachment and water loss probability.',
    metrics: ['Wetland Risk Scores', 'Siltation rate projections', 'Socio-environmental pressures'],
    outputType: 'Wetland Vulnerability Report & Dredging Priority List',
    recommended: false,
  },
  {
    id: 32,
    tier: 8,
    tierName: 'KEW Model Analysts',
    name: 'KEW Research Assistant',
    description: 'Cross-references academic and field report repositories to catalog and display evidence, publications, and plans related to specific protected areas.',
    metrics: ['Academic publication database', 'Policy and planning documents', 'Telemetry and field archives'],
    outputType: 'Evidence Index & Bibliography Map (e.g. studies after 2015)',
    recommended: false,
  }
];

const dashboardKPIs = [
  { label: 'Active Monitoring Records', value: '1,000+', icon: Activity, desc: 'Real-time telemetry and patrol entries' },
  { label: 'Threat Incidents Logged', value: '500+', icon: AlertTriangle, desc: 'Encroachment, poaching & wildfire events' },
  { label: 'Protected Areas Monitored', value: '80+', icon: Shield, desc: 'Core, trans-divisional & transboundary' },
  { label: 'Habitat Assessments', value: '300+', icon: Leaf, desc: 'Hydrology, flora & health logs' },
  { label: 'Encroachment Records', value: '150+', icon: Layers, desc: 'Remote-sensing & verified alerts' },
  { label: 'Wildlife Corridors Assessed', value: '12+', icon: GitBranch, desc: 'Connectivity & landscape linkage scores' },
  { label: 'Active Field Patrolling', value: '5,000+ km', icon: Mountain, desc: 'Tracked ranger patrols across network' },
  { label: 'Community Engagement Index', value: '85/100', icon: Users, desc: 'Participatory monitoring rating' },
];

// ============================================================
// MAIN PAGE COMPONENT
// ============================================================
export default function ConservationIntelligencePage() {
  const [activeTab, setActiveTab] = useState<'playground' | 'registry' | 'esro'>('playground');
  const [selectedModel, setSelectedModel] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTier, setSelectedTier] = useState<number | 'all'>('all');

  // --- MODEL PLAYGROUND STATES ---
  // 1. PAHI Calculator
  const [pahiPA, setPahiPA] = useState('Dachigam');
  const [pahiWeights, setPahiWeights] = useState({
    habitat: 20,
    species: 20,
    threat: 20,
    monitoring: 15,
    connectivity: 15,
    research: 10
  });

  const pahiPABase: Record<string, Record<string, number>> = {
    Dachigam: { habitat: 92, species: 95, threat: 15, monitoring: 88, connectivity: 90, research: 85 },
    Hokersar: { habitat: 65, species: 78, threat: 75, monitoring: 70, connectivity: 60, research: 80 },
    Wular: { habitat: 70, species: 72, threat: 68, monitoring: 65, connectivity: 68, research: 75 },
    Gulmarg: { habitat: 85, species: 82, threat: 30, monitoring: 75, connectivity: 80, research: 70 },
  };

  const handlePahiWeightChange = (key: keyof typeof pahiWeights, value: number) => {
    setPahiWeights(prev => ({ ...prev, [key]: value }));
  };

  const calculatePahi = () => {
    const base = pahiPABase[pahiPA] || pahiPABase.Dachigam;
    const w = pahiWeights;
    const totalW = w.habitat + w.species + w.threat + w.monitoring + w.connectivity + w.research;
    if (totalW === 0) return 0;
    
    const threatScore = Math.max(0, 100 - base.threat);

    const score = Math.round(
      (base.habitat * w.habitat +
       base.species * w.species +
       threatScore * w.threat +
       base.monitoring * w.monitoring +
       base.connectivity * w.connectivity +
       base.research * w.research) / totalW
    );
    return score;
  };

  const getPahiRating = (score: number) => {
    if (score >= 85) return { label: 'Excellent', color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' };
    if (score >= 70) return { label: 'Good', color: 'text-green-400 border-green-500/20 bg-green-500/5' };
    if (score >= 50) return { label: 'Fair', color: 'text-amber-400 border-amber-500/20 bg-amber-500/5' };
    return { label: 'Critical', color: 'text-red-400 border-red-500/20 bg-red-500/5' };
  };

  // 2. CPI Calculator
  const [cpiArea, setCpiArea] = useState('Hokersar');
  const [cpiValues, setCpiValues] = useState({
    threats: 85,
    encroachment: 90,
    sensitivity: 88,
    decline: 82
  });

  const cpiDefaults: Record<string, typeof cpiValues> = {
    Hokersar: { threats: 90, encroachment: 95, sensitivity: 92, decline: 90 },
    Wular: { threats: 80, encroachment: 85, sensitivity: 80, decline: 75 },
    Dachigam: { threats: 25, encroachment: 15, sensitivity: 95, decline: 20 },
    Khrew: { threats: 75, encroachment: 68, sensitivity: 82, decline: 60 }
  };

  const handleCpiAreaChange = (area: string) => {
    setCpiArea(area);
    if (cpiDefaults[area]) {
      setCpiValues(cpiDefaults[area]);
    }
  };

  const calculateCpi = () => {
    const v = cpiValues;
    return Math.round((v.threats * 0.3) + (v.encroachment * 0.3) + (v.sensitivity * 0.25) + (v.decline * 0.15));
  };

  // 3. SCI Index
  const [sciSpecies, setSciSpecies] = useState('Hangul');
  const [sciValues, setSciValues] = useState({
    popTrend: 90,
    paCoverage: 85,
    monitoring: 95,
    fragmentation: 88,
    threatLevel: 80
  });

  const sciDefaults: Record<string, typeof sciValues> = {
    Hangul: { popTrend: 95, paCoverage: 92, monitoring: 98, fragmentation: 90, threatLevel: 85 },
    'Snow Leopard': { popTrend: 80, paCoverage: 70, monitoring: 75, fragmentation: 85, threatLevel: 72 },
    Markhor: { popTrend: 75, paCoverage: 68, monitoring: 70, fragmentation: 78, threatLevel: 65 },
    'Black-necked Crane': { popTrend: 82, paCoverage: 80, monitoring: 85, fragmentation: 72, threatLevel: 60 }
  };

  const handleSciSpeciesChange = (species: string) => {
    setSciSpecies(species);
    if (sciDefaults[species]) {
      setSciValues(sciDefaults[species]);
    }
  };

  const calculateSci = () => {
    const v = sciValues;
    const fragFactor = 100 - v.fragmentation;
    const threatFactor = 100 - v.threatLevel;
    return Math.round((v.popTrend * 0.25) + (v.paCoverage * 0.2) + (v.monitoring * 0.2) + (fragFactor * 0.15) + (threatFactor * 0.2));
  };

  // 4. Habitat Integrity
  const [habitatName, setHabitatName] = useState('Wular Wetland');
  const [habitatValues, setHabitatValues] = useState({
    waterQuality: 65,
    connectivity: 70,
    vegetation: 68,
    encroachment: 80
  });

  const calculateHabitatIntegrity = () => {
    const v = habitatValues;
    const encroachmentFactor = 100 - v.encroachment;
    return Math.round((v.waterQuality * 0.3) + (v.connectivity * 0.25) + (v.vegetation * 0.25) + (encroachmentFactor * 0.2));
  };

  // 5. Corridor Integrity
  const [corridorName, setCorridorName] = useState('Dachigam-Overa');
  const [corridorValues, setCorridorValues] = useState({
    connectivity: 88,
    fragmentation: 35,
    roadCrossings: 45,
    landUseChange: 30
  });

  const calculateCorridorIntegrity = () => {
    const v = corridorValues;
    const fragFactor = 100 - v.fragmentation;
    const roadFactor = 100 - v.roadCrossings;
    const landFactor = 100 - v.landUseChange;
    return Math.round((v.connectivity * 0.35) + (fragFactor * 0.25) + (roadFactor * 0.2) + (landFactor * 0.2));
  };

  // 6. Species-Habitat Suitability Grid Simulation
  const [suitSpecies, setSuitSpecies] = useState('Hangul');
  const [suitLayers, setSuitLayers] = useState({
    elevation: true,
    forest: true,
    water: true,
    disturbance: false
  });
  const [selectedCell, setSelectedCell] = useState<{ r: number; c: number; suitability: number } | null>(null);

  const getSuitabilityGrid = () => {
    const grid: number[][] = [];
    const seed = suitSpecies === 'Hangul' ? 12 : 34;
    for (let r = 0; r < 6; r++) {
      grid[r] = [];
      for (let c = 0; c < 6; c++) {
        let base = Math.sin((r * c + seed) * 0.5) * 40 + 50;
        
        if (suitLayers.elevation) base += 10;
        if (suitLayers.forest) base += 12;
        if (suitLayers.water) base += 8;
        if (suitLayers.disturbance) {
          if (r === 2 || c === 3) base -= 45;
        }
        
        grid[r][c] = Math.min(100, Math.max(0, Math.round(base)));
      }
    }
    return grid;
  };

  // 7. Encroachment Detection Engine Comparison Slider
  const [encroachmentArea, setEncroachmentArea] = useState('Khrew');
  const [compareYear, setCompareYear] = useState<number>(2026);

  const encroachmentData: Record<string, {
    buildings2025: number; buildings2026: number;
    roads2025: number; roads2026: number;
    agri2025: number; agri2026: number;
    logs: string[];
  }> = {
    Khrew: {
      buildings2025: 14, buildings2026: 28,
      roads2025: 4.2, roads2026: 6.8,
      agri2025: 35.4, agri2026: 48.2,
      logs: [
        'Alert: Quarry structural buildup at Coordinates [34.1204, 74.9654]',
        'Alert: New agricultural clearing at [34.1145, 74.9702]',
        'Alert: Forest road extension (1.2km) in buffer zone [34.1350, 74.9810]'
      ]
    },
    Hokersar: {
      buildings2025: 8, buildings2026: 18,
      roads2025: 2.1, roads2026: 3.5,
      agri2025: 112.5, agri2026: 135.8,
      logs: [
        'Alert: Siltation bund expansion at Coordinates [34.1088, 74.7212]',
        'Alert: Residential construction encroachment boundary [34.1121, 74.7305]',
        'Alert: Drainage canal altered near wetlands [34.0990, 74.7180]'
      ]
    }
  };

  // 8. Climate Vulnerability Scenario
  const [climateTarget, setClimateTarget] = useState('Hangul');
  const [climateScenario, setClimateScenario] = useState<'mod' | 'high' | 'ext'>('high');

  const climateReports: Record<string, Record<'mod' | 'high' | 'ext', {
    risk: 'Low' | 'Moderate' | 'High';
    factors: { label: string; value: number }[];
    summary: string;
  }>> = {
    Hangul: {
      mod: { risk: 'Moderate', factors: [{ label: 'High Altitude Meadow Loss', value: 45 }, { label: 'Phenology Shift', value: 50 }], summary: 'Moderate contraction of high alpine meadow foraging range. Rutting seasons shifted by 4-6 days.' },
      high: { risk: 'High', factors: [{ label: 'High Altitude Meadow Loss', value: 75 }, { label: 'Phenology Shift', value: 82 }, { label: 'Invasive Plant Spread', value: 60 }], summary: 'Critical loss of alpine grazing grounds. Hangul migration routes forced higher, increasing calf mortality.' },
      ext: { risk: 'High', factors: [{ label: 'High Altitude Meadow Loss', value: 92 }, { label: 'Phenology Shift', value: 96 }, { label: 'Alpine Forest Retreat', value: 78 }], summary: 'Extreme risk. 92% loss of suitable summer habitat. Genetic isolation threshold breached.' }
    },
    Hokersar: {
      mod: { risk: 'Moderate', factors: [{ label: 'Siltation Speedup', value: 40 }, { label: 'Dry Spells Duration', value: 52 }], summary: 'Extended autumn drying periods affect initial waterfowl arrivals.' },
      high: { risk: 'High', factors: [{ label: 'Siltation Speedup', value: 72 }, { label: 'Dry Spells Duration', value: 80 }, { label: 'Eutrophication Speed', value: 85 }], summary: 'Severe eutrophication. Marshy patches drying up permanently, causing 25% migratory habitat contraction.' },
      ext: { risk: 'High', factors: [{ label: 'Complete Wetland Desiccation', value: 95 }, { label: 'Thermal Stress Index', value: 90 }], summary: 'Complete ecosystem collapse. Wetland turns into seasonal clay flats. Primary flyway path lost.' }
    }
  };

  // 9. Research & Monitoring Gap Engine
  const [researchGapFocus, setResearchGapFocus] = useState<'species' | 'pa'>('species');

  const researchGaps = {
    species: [
      { name: 'Kashmir Musk Deer (Moschus cupreus)', gap: 'High', publications: 2, lastStudy: '2016', confidence: 'Low' },
      { name: 'Western Tragopan (Tragopan melanocephalus)', gap: 'High', publications: 3, lastStudy: '2018', confidence: 'Low' },
      { name: 'Asiatic Black Bear (Ursus thibetanus)', gap: 'Low', publications: 18, lastStudy: '2025', confidence: 'High' },
      { name: 'Kashmir Stag (Hangul)', gap: 'Low', publications: 42, lastStudy: '2026', confidence: 'High' }
    ],
    pa: [
      { name: 'Khrew Conservation Reserve', gap: 'High', publications: 1, lastStudy: '2014', confidence: 'Low' },
      { name: 'Wangath Conservation Reserve', gap: 'High', publications: 0, lastStudy: 'N/A', confidence: 'Low' },
      { name: 'Overa-Aru Wildlife Sanctuary', gap: 'Medium', publications: 7, lastStudy: '2021', confidence: 'Medium' },
      { name: 'Dachigam National Park', gap: 'Low', publications: 85, lastStudy: '2026', confidence: 'High' }
    ]
  };

  // 10. KEW Model Analyst (QA Dialog Center)
  const [analystQuestion, setAnalystQuestion] = useState<string | null>(null);
  const [analystOutput, setAnalystOutput] = useState<{ title: string; html: string } | null>(null);
  const [isAnalystLoading, setIsAnalystLoading] = useState(false);

  const triggerAnalystQuery = (question: string) => {
    setIsAnalystLoading(true);
    setAnalystQuestion(question);
    setAnalystOutput(null);
    
    setTimeout(() => {
      setIsAnalystLoading(false);
      if (question.includes('deteriorating')) {
        setAnalystOutput({
          title: 'KEW Conservation Analyst Report: Deteriorating Protected Areas',
          html: `
            <div class="space-y-4 text-slate-300">
              <div class="p-3 border border-red-500/20 bg-red-500/5 rounded-lg flex items-start gap-2">
                <span class="text-red-400 font-bold">⚠️ CRITICAL ACTION ALERT:</span>
                <p class="text-sm">Wetlands and Conservation Reserves show the highest rates of ecosystem deterioration.</p>
              </div>
              <table class="w-full text-left border-collapse text-xs">
                <thead>
                  <tr class="border-b border-white/10 text-slate-400">
                    <th class="py-2">Protected Area</th>
                    <th class="py-2">PAHI Trend</th>
                    <th class="py-2">Primary Disturbance</th>
                    <th class="py-2">Action Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b border-white/[0.06]">
                    <td class="py-2 font-semibold text-white">Hokersar Wetland</td>
                    <td class="py-2 text-red-400 font-mono">74 &rarr; 58 (Decline)</td>
                    <td class="py-2 text-slate-400">Siltation, Encroachment</td>
                    <td class="py-2"><span class="px-2 py-0.5 rounded bg-red-500/20 text-red-300 text-[10px]">Urgent Dredging</span></td>
                  </tr>
                  <tr class="border-b border-white/[0.06]">
                    <td class="py-2 font-semibold text-white">Khrew Conservation Reserve</td>
                    <td class="py-2 text-red-400 font-mono">81 &rarr; 69 (Decline)</td>
                    <td class="py-2 text-slate-400">Stone Quarry Sprawl</td>
                    <td class="py-2"><span class="px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 text-[10px]">Quarry Buffer Fencing</span></td>
                  </tr>
                  <tr class="border-b border-white/[0.06]">
                    <td class="py-2 font-semibold text-white">Wular Lake Reserve</td>
                    <td class="py-2 text-amber-400 font-mono">76 &rarr; 72 (Decline)</td>
                    <td class="py-2 text-slate-400">Agricultural Encroachment</td>
                    <td class="py-2"><span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px]">Hydrological Restore</span></td>
                  </tr>
                </tbody>
              </table>
              <div class="text-sm space-y-2">
                <h4 class="font-bold text-white">Model Reasoning:</h4>
                <p>Telemetry data from the <em>eIEN Kashmir</em> network indicates high sedimentation runs due to construction in peripheral catchment zones. Remote sensing detects a 14% increase in building footprints near Hokersar. Protected Area Health Index recommends immediate boundary consolidation.</p>
              </div>
            </div>
          `
        });
      } else if (question.includes('range')) {
        setAnalystOutput({
          title: 'KEW Species Analyst Report: Hangul Range Expansion Scenarios',
          html: `
            <div class="space-y-4 text-slate-300 text-sm">
              <p>The Kashmir Stag (Hangul) population is currently <strong>87% dependent on the Dachigam National Park landscape</strong>, creating extreme genetic bottleneck risks.</p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="bg-[#1b1232] border border-white/5 p-3 rounded-lg">
                  <h4 class="font-bold text-emerald-400 mb-1">Target Sector 1: Overa-Aru</h4>
                  <p class="text-xs">High suitability matching (85/100) via Species-Habitat Suitability model. Offers sub-alpine meadow corridors.</p>
                </div>
                <div class="bg-[#1b1232] border border-white/5 p-3 rounded-lg">
                  <h4 class="font-bold text-emerald-400 mb-1">Target Sector 2: Wangath</h4>
                  <p class="text-xs">Moderate suitability (74/100). Essential buffer connecting Ganderbal alpine belts.</p>
                </div>
              </div>
              <div class="p-3 border border-emerald-500/20 bg-emerald-500/5 rounded-lg">
                <h4 class="font-semibold text-white text-xs mb-1">Critical Expansion Barriers Detected:</h4>
                <ul class="list-disc pl-4 text-xs space-y-1 text-slate-400">
                  <li>Highway road-crossing corridor fractures near Tral sub-valleys.</li>
                  <li>Overgrazing of alpine meadows by migratory herds, degrading forage resources.</li>
                  <li>Siltation and forest fragmentation along key Jhelum riparian routes.</li>
                </ul>
              </div>
              <p class="text-xs text-slate-500">Output generated using Species-Habitat Suitability and Corridor Integrity Index models.</p>
            </div>
          `
        });
      } else if (question.includes('wetlands')) {
        setAnalystOutput({
          title: 'KEW Threat Analyst Report: Wetland Vulnerability Assessment',
          html: `
            <div class="space-y-4 text-slate-300 text-sm">
              <p>Wetland Vulnerability Model ranks the major Kashmir marshes by risk index (0-100), measuring water loss, siltation run rates, bird presence, and peripheral encroachment:</p>
              <div class="space-y-3">
                <div>
                  <div class="flex justify-between text-xs font-semibold mb-1">
                    <span class="text-white">1. Hokersar Wetland Reserve</span>
                    <span class="text-red-400 font-mono">92/100 (Critical)</span>
                  </div>
                  <div class="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div class="h-full bg-red-500" style="width: 92%"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-xs font-semibold mb-1">
                    <span class="text-white">2. Wular Lake Wetland</span>
                    <span class="text-orange-400 font-mono">78/100 (High)</span>
                  </div>
                  <div class="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div class="h-full bg-orange-500" style="width: 78%"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-xs font-semibold mb-1">
                    <span class="text-white">3. Hygam Wetland Reserve</span>
                    <span class="text-orange-400 font-mono">74/100 (High)</span>
                  </div>
                  <div class="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div class="h-full bg-orange-500" style="width: 74%"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between text-xs font-semibold mb-1">
                    <span class="text-white">4. Shallabugh Wetland Reserve</span>
                    <span class="text-amber-400 font-mono">68/100 (Moderate)</span>
                  </div>
                  <div class="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div class="h-full bg-amber-500" style="width: 68%"></div>
                  </div>
                </div>
              </div>
              <p class="text-xs text-slate-400 leading-relaxed">Wetland health indices suggest that Hokersar is the most critical wetland due to historical water flow alteration and weed infestation. Management plans recommend immediate water regulation gates installation.</p>
            </div>
          `
        });
      } else {
        setAnalystOutput({
          title: 'KEW Research Assistant: Studies on Dachigam NP (Post-2015)',
          html: `
            <div class="space-y-4 text-slate-300 text-sm">
              <p>Found <strong>4 primary peer-reviewed publications</strong> in the eIEN and Kashmir University archive for Dachigam National Park since 2015:</p>
              <div class="space-y-3 font-mono text-xs">
                <div class="p-3 border border-white/5 bg-[#1b1232] rounded">
                  <div class="text-emerald-400 font-bold mb-1">[Study 1, 2018]</div>
                  <div class="text-white font-semibold mb-1">Hangul Population Dynamics & Habitat Overlap with Livestock Grazing</div>
                  <div class="text-slate-400">Journal of Mountain Ecology &mdash; Telemetry tracking results showing range contraction during spring breeding.</div>
                </div>
                <div class="p-3 border border-white/5 bg-[#1b1232] rounded">
                  <div class="text-emerald-400 font-bold mb-1">[Study 2, 2021]</div>
                  <div class="text-white font-semibold mb-1">Climate Change Impacts on alpine Meadow Phenology in Dachigam-Overa</div>
                  <div class="text-slate-400">Kashmir University Environmental Series &mdash; Identifies shifts in grass species composition and alpine meadow desiccation.</div>
                </div>
                <div class="p-3 border border-white/5 bg-[#1b1232] rounded">
                  <div class="text-emerald-400 font-bold mb-1">[Study 3, 2024]</div>
                  <div class="text-white font-semibold mb-1">Remote Sensing Assessment of Forest Canopy & Fragmentation in Dachigam</div>
                  <div class="text-slate-400">eIEN Research Archive &mdash; Spatial maps tracking degradation in boundary buffer zone forests.</div>
                </div>
                <div class="p-3 border border-white/5 bg-[#1b1232] rounded">
                  <div class="text-emerald-400 font-bold mb-1">[Study 4, 2025]</div>
                  <div class="text-white font-semibold mb-1">GPS Telemetry of Kashmir Stag Migration Routes & Corridor Connectivity</div>
                  <div class="text-slate-400">CWPR Telemetry Bulletins &mdash; Identifies corridors connecting Dachigam to Overa-Aru sanctuary.</div>
                </div>
              </div>
            </div>
          `
        });
      }
    }, 1200);
  };

  const filteredModels = kewModels.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          model.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = selectedTier === 'all' ? true : model.tier === selectedTier;
    return matchesSearch && matchesTier;
  });

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      
      {/* Breadcrumb */}
      <nav className="container mx-auto px-6 pt-24 md:pt-32 pb-4" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-slate-500">
          <li>
            <Link href="/" className="hover:text-slate-300 transition-colors">
              Home
            </Link>
          </li>
          <li>
            <ChevronRight className="w-4 h-4" />
          </li>
          <li className="text-slate-300 font-medium">Conservation Intelligence</li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <Compass className="w-6 h-6 text-emerald-400" />
            <span className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-slate-400">
              Conservation Intelligence Center
            </span>
          </div>

          <h1 className="max-w-xl text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white mb-4 sm:mb-6 leading-tight tracking-tight">
            Kashmir Monitoring
            <span className="block bg-gradient-to-r from-emerald-400 via-teal-400 to-green-400 bg-clip-text text-transparent">
              & Threat Intelligence
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-400 mb-8 leading-relaxed max-w-3xl">
            Pressure signals, encroachment records, habitat assessments, ecological disturbance indicators,
            conservation alerts, and management intelligence across Kashmir Core, Trans-Divisional, and Transboundary
            conservation landscapes. Supporting threat mapping, risk prioritization, field monitoring, restoration planning,
            and protected-area management.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <Button
              size="lg"
              className={`${activeTab === 'playground' ? 'bg-gradient-to-r from- emerald-700 to-teal-600' : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'}`}
              onClick={() => setActiveTab('playground')}
              icon={<Sliders className="w-5 h-5" />}
            >
              Model Playground
            </Button>
            <Button
              size="lg"
              className={`${activeTab === 'registry' ? 'bg-gradient-to-r from- emerald-700 to-teal-600' : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'}`}
              onClick={() => setActiveTab('registry')}
              icon={<Database className="w-5 h-5" />}
            >
              32 KEW Models Registry
            </Button>
            <Button
              size="lg"
              className={`${activeTab === 'esro' ? 'bg-gradient-to-r from- emerald-700 to-teal-600' : 'bg-white/5 border-white/10 hover:bg-white/10 text-white'}`}
              onClick={() => setActiveTab('esro')}
              icon={<BookOpen className="w-5 h-5" />}
            >
              ESRO Heritage Archives
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Operational Dashboard KPIs */}
      <section className="container mx-auto px-4 sm:px-6 -mt-8 relative z-20 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            Operational Intelligence Dashboard
          </h2>
          
          <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {dashboardKPIs.map((kpi, idx) => (
              <Card 
                key={idx} 
                className="glass-intense border-white/10"
                padding="sm"
              >
                <div className="py-2.5 px-2 lg:py-3 lg:px-3 rounded-xl text-center min-w-0">
                  <kpi.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 mx-auto mb-1" />
                  <div className="text-sm sm:text-base lg:text-sm xl:text-base font-bold text-white tabular-nums leading-tight truncate">
                    {kpi.value}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 uppercase tracking-wide mt-0.5 leading-tight break-words">
                    {kpi.label}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Main Tab Content */}
      <section className="container mx-auto px-6 pb-24">
        
        {/* ============================================================ */}
        {/* TAB 1: MODEL PLAYGROUND (TOP 10 RECOMMENDED MODELS) */}
        {/* ============================================================ */}
        {activeTab === 'playground' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left selector menu of the 10 models */}
            <div className="lg:col-span-4 space-y-3">
              <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Top 10 Recommended Models
                </h3>
                <p className="text-xs text-slate-500">
                  Select and run one of the recommended models below to simulate local environmental intelligence indicators.
                </p>
              </div>

              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {kewModels.filter(m => m.recommended).map((model, idx) => (
                  <button
                    key={model.id}
                    onClick={() => {
                      setSelectedModel(model.id);
                      setAnalystOutput(null);
                    }}
                    className={`w-full text-left p-3 rounded-lg border transition-all duration-200 flex items-center justify-between group ${
                      selectedModel === model.id
                        ? 'bg-gradient-to-r from-emerald-950/40 to-teal-950/40 border-emerald-500/50 text-white'
                        : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded flex items-center justify-center font-bold text-xs ${
                        selectedModel === model.id ? 'bg-emerald-50 text-slate-950' : 'bg-white/5 text-slate-400'
                      }`}>
                        {idx + 1}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold truncate group-hover:text-emerald-300 transition-colors">
                          {model.name}
                        </div>
                        <div className="text-[10px] text-slate-500 truncate">
                          {model.tierName}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Interactive Simulator Pane */}
            <div className="lg:col-span-8">
              <Card className="border border-white/10 bg-white/5 h-full" padding="lg">
                
                {/* Active Model Title */}
                {(() => {
                  const m = kewModels.find(item => item.id === selectedModel);
                  if (!m) return null;
                  return (
                    <div className="space-y-6">
                      <div className="flex justify-between items-start pb-4 border-b border-white/[0.06]">
                        <div>
                          <Badge variant="success" size="sm" className="mb-2">Recommended Engine</Badge>
                          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Target className="w-6 h-6 text-emerald-400" />
                            {m.name}
                          </h2>
                          <p className="text-slate-400 text-sm mt-1 max-w-xl">
                            {m.description}
                          </p>
                        </div>
                        <Badge variant="outline" size="sm" className="border-white/10 text-slate-500">Tier {m.tier}</Badge>
                      </div>

                      {/* --- SIMULATORS --- */}
                      
                      {/* 1. PAHI Calculator */}
                      {selectedModel === 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          {/* Controls */}
                          <div className="space-y-4">
                            <div>
                              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Select Protected Area
                              </label>
                              <Select
                                value={pahiPA}
                                onChange={(value) => setPahiPA(value)}
                                options={[
                                  { value: 'Dachigam', label: 'Dachigam National Park' },
                                  { value: 'Hokersar', label: 'Hokersar Wetland Reserve' },
                                  { value: 'Wular', label: 'Wular Lake Wetland' },
                                  { value: 'Gulmarg', label: 'Gulmarg Wildlife Sanctuary' },
                                ]}
                              />
                            </div>

                            <div className="space-y-3 pt-2">
                              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Indicator Weights (Total impact)
                              </h4>
                              {Object.entries(pahiWeights).map(([key, val]) => (
                                <div key={key} className="space-y-1">
                                  <div className="flex justify-between text-xs text-slate-400">
                                    <span className="capitalize">{key.replace('species', 'Species Richness').replace('threat', 'Threat Pressure').replace('monitoring', 'Monitoring').replace('connectivity', 'Connectivity').replace('research', 'Research')}</span>
                                    <span>{val}%</span>
                                  </div>
                                  <input
                                    type="range"
                                    min="0"
                                    max="40"
                                    value={val}
                                    onChange={(e) => handlePahiWeightChange(key as any, parseInt(e.target.value))}
                                    className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Output Gauge */}
                          <div className="flex flex-col items-center justify-center bg-black/20 rounded-xl p-6 border border-white/5 text-center relative overflow-hidden">
                            <div className="absolute top-2 right-2">
                              <Info className="w-4 h-4 text-slate-600 hover:text-slate-400 cursor-pointer" />
                            </div>

                            <span className="text-xs text-slate-500 uppercase tracking-wider mb-2">Calculated Health Index</span>
                            
                            {/* Radial Gauge */}
                            <div className="relative w-36 h-36 flex items-center justify-center mb-4">
                              <svg className="w-full h-full transform -rotate-90">
                                <circle cx="72" cy="72" r="62" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="transparent" />
                                <circle
                                  cx="72"
                                  cy="72"
                                  r="62"
                                  stroke="#10b981"
                                  strokeWidth="8"
                                  fill="transparent"
                                  strokeDasharray={2 * Math.PI * 62}
                                  strokeDashoffset={2 * Math.PI * 62 * (1 - calculatePahi() / 100)}
                                  className="transition-all duration-300"
                                />
                              </svg>
                              <div className="absolute text-center">
                                <span className="text-3xl font-extrabold text-white">{calculatePahi()}</span>
                                <span className="text-xs text-slate-500 block">/100</span>
                              </div>
                            </div>

                            <div className={`px-4 py-1 rounded-full border text-xs font-bold ${getPahiRating(calculatePahi()).color}`}>
                              Rating: {getPahiRating(calculatePahi()).label}
                            </div>

                            <div className="text-[11px] text-slate-400 mt-4 leading-relaxed max-w-xs">
                              For <strong>{pahiPA}</strong>, the index is calculated dynamically across field records and remote monitoring points.
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 2. CPI Priority Calculator */}
                      {selectedModel === 2 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <div>
                              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Select Area Sector
                              </label>
                              <Select
                                value={cpiArea}
                                onChange={(value) => handleCpiAreaChange(value)}
                                options={[
                                  { value: 'Hokersar', label: 'Hokersar Wetland Reserve' },
                                  { value: 'Wular', label: 'Wular Lake reserve' },
                                  { value: 'Dachigam', label: 'Dachigam National Park' },
                                  { value: 'Khrew', label: 'Khrew Conservation Reserve' },
                                ]}
                              />
                            </div>

                            <div className="space-y-3">
                              {Object.entries(cpiValues).map(([key, val]) => (
                                <div key={key} className="space-y-1">
                                  <div className="flex justify-between text-xs text-slate-400">
                                    <span className="capitalize">{key.replace('decline', 'Habitat Decline').replace('sensitivity', 'Species Sensitivity')}</span>
                                    <span>{val}/100</span>
                                  </div>
                                  <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={val}
                                    onChange={(e) => setCpiValues(prev => ({ ...prev, [key]: parseInt(e.target.value) }))}
                                    className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="bg-black/20 rounded-xl p-6 border border-white/5 flex flex-col justify-between">
                            <div className="text-center pb-4 border-b border-white/[0.06]">
                              <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Conservation Priority Index (CPI)</span>
                              <span className="text-4xl font-extrabold text-white">{calculateCpi()}</span>
                              <span className="text-slate-500 text-xs font-semibold block mt-1">
                                Priority Level:{' '}
                                <span className={calculateCpi() >= 80 ? 'text-red-400' : calculateCpi() >= 60 ? 'text-orange-400' : 'text-emerald-400'}>
                                  {calculateCpi() >= 80 ? 'Critical' : calculateCpi() >= 60 ? 'High' : 'Moderate'}
                                </span>
                              </span>
                            </div>

                            <div className="pt-4 space-y-3">
                              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Required Interventions:</h4>
                              <ul className="text-xs text-slate-400 space-y-1 list-disc pl-4">
                                {calculateCpi() >= 80 ? (
                                  <>
                                    <li>Establish absolute boundary fencing within 30 days.</li>
                                    <li>Deploy permanent ranger patrol units.</li>
                                    <li>Initiate legal proceedings for encroachment clearances.</li>
                                  </>
                                ) : calculateCpi() >= 60 ? (
                                  <>
                                    <li>Expand water level and quality sensors.</li>
                                    <li>Setup local community buffer-zone council.</li>
                                    <li>Initiate afforestation/grassland restoration.</li>
                                  </>
                                ) : (
                                  <>
                                    <li>Continue seasonal fauna monitoring.</li>
                                    <li>Perform annual habitat condition checks.</li>
                                  </>
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 3. SCI Index */}
                      {selectedModel === 3 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <div>
                              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Select Species
                              </label>
                              <Select
                                value={sciSpecies}
                                onChange={(value) => handleSciSpeciesChange(value)}
                                options={[
                                  { value: 'Hangul', label: 'Hangul (Kashmir Stag)' },
                                  { value: 'Snow Leopard', label: 'Snow Leopard' },
                                  { value: 'Markhor', label: 'Markhor' },
                                  { value: 'Black-necked Crane', label: 'Black-necked Crane' },
                                ]}
                              />
                            </div>

                            <div className="space-y-3">
                              {Object.entries(sciValues).map(([key, val]) => (
                                <div key={key} className="space-y-1">
                                  <div className="flex justify-between text-xs text-slate-400">
                                    <span className="capitalize">{key.replace('popTrend', 'Population Trend').replace('paCoverage', 'PA Coverage').replace('monitoring', 'Monitoring Intensity').replace('fragmentation', 'Habitat Fragmentation').replace('threatLevel', 'Threat Level')}</span>
                                    <span>{val}/100</span>
                                  </div>
                                  <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={val}
                                    onChange={(e) => setSciValues(prev => ({ ...prev, [key]: parseInt(e.target.value) }))}
                                    className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="bg-black/20 rounded-xl p-6 border border-white/5 flex flex-col justify-between text-center">
                            <div>
                              <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Species Conservation Index</span>
                              <span className="text-5xl font-black text-emerald-400">{calculateSci()}</span>
                              <div className="text-xs text-slate-400 mt-2">
                                Status: <span className="text-white font-bold">{sciSpecies} ({calculateSci() >= 85 ? 'Highly Managed' : 'Vulnerable'})</span>
                              </div>
                            </div>

                            <div className="p-4 border border-white/5 rounded-lg bg-black/10 text-left mt-4">
                              <h4 className="text-xs font-bold text-white uppercase mb-2">Indicator Analysis:</h4>
                              <div className="space-y-1 text-xs text-slate-400">
                                <div className="flex justify-between">
                                  <span>Population Stability:</span>
                                  <span className="text-white font-semibold">{sciValues.popTrend >= 80 ? 'Stable' : 'Declining'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Monitoring Coverage:</span>
                                  <span className="text-white font-semibold">{sciValues.monitoring >= 85 ? 'Adequate' : 'Gaps Exist'}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span>Habitat Risk:</span>
                                  <span className="text-white font-semibold">{sciValues.fragmentation >= 70 ? 'High Fragmentation' : 'Low Fragmentation'}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 4. Habitat Integrity Index */}
                      {selectedModel === 4 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <div>
                              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Select Habitat Type
                              </label>
                              <Select
                                value={habitatName}
                                onChange={(value) => setHabitatName(value)}
                                options={[
                                  { value: 'Wular Wetland', label: 'Wular Wetland Systems' },
                                  { value: 'Dachigam Alpine Meadow', label: 'Dachigam Sub-Alpine Grasslands' },
                                  { value: 'Jhelum Riparian Corridor', label: 'Jhelum Riverine Floods Zones' },
                                ]}
                              />
                            </div>

                            <div className="space-y-3">
                              {Object.entries(habitatValues).map(([key, val]) => (
                                <div key={key} className="space-y-1">
                                  <div className="flex justify-between text-xs text-slate-400">
                                    <span className="capitalize">{key.replace('waterQuality', 'Water Quality').replace('connectivity', 'Connectivity').replace('vegetation', 'Vegetation Cover').replace('encroachment', 'Encroachment Pressure')}</span>
                                    <span>{val}/100</span>
                                  </div>
                                  <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={val}
                                    onChange={(e) => setHabitatValues(prev => ({ ...prev, [key]: parseInt(e.target.value) }))}
                                    className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="bg-black/20 rounded-xl p-6 border border-white/5 flex flex-col justify-center items-center text-center">
                            <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Habitat Integrity Index</span>
                            <span className="text-5xl font-bold text-white mb-2">{calculateHabitatIntegrity()}</span>
                            <div className={`px-3 py-1 rounded text-xs font-semibold ${calculateHabitatIntegrity() >= 75 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                              {calculateHabitatIntegrity() >= 75 ? 'Optimal Condition' : 'Disturbed Condition'}
                            </div>
                            <p className="text-[11px] text-slate-400 mt-4 leading-relaxed max-w-xs">
                              Continuous satellite analysis evaluates structural fragmentation and vegetation canopy fluctuations every 16 days.
                            </p>
                          </div>
                        </div>
                      )}

                      {/* 5. Corridor Integrity Index */}
                      {selectedModel === 5 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <div>
                              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Select Connectivity Corridor
                              </label>
                              <Select
                                value={corridorName}
                                onChange={(value) => setCorridorName(value)}
                                options={[
                                  { value: 'Dachigam-Overa', label: 'Dachigam - Tral - Overa Corridor' },
                                  { value: 'Kishtwar-Kailash', label: 'Kishtwar High-Altitude Passages' },
                                ]}
                              />
                            </div>

                            <div className="space-y-3">
                              {Object.entries(corridorValues).map(([key, val]) => (
                                <div key={key} className="space-y-1">
                                  <div className="flex justify-between text-xs text-slate-400">
                                    <span className="capitalize">{key.replace('connectivity', 'Structural Connectivity').replace('fragmentation', 'Path Fragmentation').replace('roadCrossings', 'Road Crossings').replace('landUseChange', 'Land Use Change')}</span>
                                    <span>{val}/100</span>
                                  </div>
                                  <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={val}
                                    onChange={(e) => setCorridorValues(prev => ({ ...prev, [key]: parseInt(e.target.value) }))}
                                    className="w-full h-1 bg-white/5 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="bg-black/20 rounded-xl p-6 border border-white/5 flex flex-col justify-center items-center text-center">
                            <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Corridor Integrity Score</span>
                            <span className="text-5xl font-extrabold text-emerald-400 mb-2">{calculateCorridorIntegrity()}</span>
                            <div className="text-xs text-slate-300 font-semibold">
                              Viability: {calculateCorridorIntegrity() >= 80 ? 'Highly Functional' : calculateCorridorIntegrity() >= 50 ? 'Compromised' : 'Severely Fractured'}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 6. Species-Habitat Suitability Model */}
                      {selectedModel === 6 && (
                        <div className="space-y-6">
                          <div className="flex flex-wrap items-center justify-between gap-4 bg-black/20 p-4 rounded-xl border border-white/5">
                            <div className="flex gap-4">
                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Species Target</label>
                                <Select
                                  value={suitSpecies}
                                  onChange={(value) => { setSuitSpecies(value); setSelectedCell(null); }}
                                  options={[
                                    { value: 'Hangul', label: 'Hangul (Kashmir Stag)' },
                                    { value: 'Snow Leopard', label: 'Snow Leopard' },
                                  ]}
                                />
                              </div>
                            </div>
                            
                            {/* Layer Toggles */}
                            <div className="flex flex-wrap gap-4 text-xs">
                              {Object.entries(suitLayers).map(([layer, checked]) => (
                                <label key={layer} className="flex items-center gap-1.5 cursor-pointer text-slate-300 hover:text-white">
                                  <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={(e) => { setSuitLayers(prev => ({ ...prev, [layer]: e.target.checked })); setSelectedCell(null); }}
                                    className="rounded bg-white/5 border-white/10 text-emerald-500 accent-emerald-500"
                                  />
                                  <span className="capitalize">{layer.replace('disturbance', 'Human Disturbance')}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Visual Grid Map */}
                            <div>
                              <div className="text-xs font-bold text-slate-400 mb-2 uppercase">Spatial Suitability Grid Map (Kashmir Landscape)</div>
                              <div className="grid grid-cols-6 gap-1.5 bg-white/5 p-4 rounded-xl border border-white/5">
                                {getSuitabilityGrid().map((row, r) => 
                                  row.map((val, c) => (
                                    <button
                                      key={`${r}-${c}`}
                                      onClick={() => setSelectedCell({ r, c, suitability: val })}
                                      className={`w-full aspect-square rounded transition-all border ${
                                        val >= 75
                                          ? 'bg-emerald-500/20 border-emerald-500/40 hover:bg-emerald-500/35'
                                          : val >= 50
                                            ? 'bg-amber-500/20 border-amber-500/40 hover:bg-amber-500/35'
                                            : 'bg-red-500/20 border-red-500/40 hover:bg-red-500/35'
                                      } ${selectedCell?.r === r && selectedCell?.c === c ? 'ring-2 ring-white scale-95' : ''}`}
                                    />
                                  ))
                                )}
                              </div>
                              <div className="flex items-center gap-4 text-[10px] text-slate-500 mt-2">
                                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-500/20 border border-emerald-500/40" /> High Suitability ({'>'}75)</span>
                                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-500/20 border border-amber-500/40" /> Moderate suitability (50-74)</span>
                                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-red-500/20 border border-red-500/40" /> Poor suitability ({'<'}50)</span>
                              </div>
                            </div>

                            {/* Details Card */}
                            <div className="bg-black/20 p-5 rounded-xl border border-white/5 flex flex-col justify-between">
                              <div>
                                <h4 className="font-bold text-white text-sm mb-3">Model Analysis & Pixel Inspection</h4>
                                {selectedCell ? (
                                  <div className="space-y-3 text-xs text-slate-300">
                                    <div className="flex justify-between border-b border-white/[0.06] pb-1">
                                      <span>Coordinates Sector:</span>
                                      <span className="font-mono text-white">Sect-{selectedCell.r * 10 + selectedCell.c}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/[0.06] pb-1">
                                      <span>Estimated Altitude:</span>
                                      <span className="text-white">{(2300 + (selectedCell.r * 340) - (selectedCell.c * 120))}m</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/[0.06] pb-1">
                                      <span>Model Suitability Score:</span>
                                      <span className="font-bold text-emerald-400">{selectedCell.suitability}/100</span>
                                    </div>
                                    <div className="text-[11px] text-slate-400 mt-2">
                                      {selectedCell.suitability >= 75
                                        ? `Highly suitable for ${suitSpecies}. Pristine vegetation, optimal water availability, and zero infrastructure crossings.`
                                        : selectedCell.suitability >= 50
                                          ? 'Moderate suitability. Secondary food plants present, but contains minor fragmentation limits.'
                                          : 'Poor suitability. Human settlements, active road networks, or quarry operations severely degrade movement potential.'}
                                    </div>
                                  </div>
                                ) : (
                                  <p className="text-xs text-slate-500 italic">
                                    Click any square on the spatial grid to inspect localized suitability indices.
                                  </p>
                                )}
                              </div>
                              <div className="pt-4 border-t border-white/[0.06] text-[11px] text-slate-500 leading-normal">
                                potential habitat layers are generated using multi-spectral satellite imagery and historical telemetry observations.
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 7. Encroachment Detection Engine */}
                      {selectedModel === 11 && (
                        <div className="space-y-6">
                          <div className="flex justify-between items-center bg-black/20 p-4 rounded-xl border border-white/5">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Select Study Area</label>
                              <Select
                                value={encroachmentArea}
                                onChange={(value) => setEncroachmentArea(value)}
                                options={[
                                  { value: 'Khrew', label: 'Khrew Conservation Reserve' },
                                  { value: 'Hokersar', label: 'Hokersar Wetland' },
                                ]}
                              />
                            </div>
                            
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-slate-400 font-bold">Slide to Compare Year:</span>
                              <div className="flex border border-white/10 rounded overflow-hidden">
                                <button
                                  onClick={() => setCompareYear(2025)}
                                  className={`px-3 py-1 text-xs font-semibold ${compareYear === 2025 ? 'bg- emerald-700 text-white' : 'bg-black/30 text-slate-400'}`}
                                >
                                  2025 Baseline
                                </button>
                                <button
                                  onClick={() => setCompareYear(2026)}
                                  className={`px-3 py-1 text-xs font-semibold ${compareYear === 2026 ? 'bg- emerald-700 text-white' : 'bg-black/30 text-slate-400'}`}
                                >
                                  2026 Detected
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Imagery Comparison Mock */}
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex flex-col justify-center items-center relative overflow-hidden h-[250px]">
                              {compareYear === 2025 ? (
                                <div className="text-center space-y-2">
                                  <div className="w-32 h-32 rounded-full border-2 border-emerald-500/20 bg-gradient-to-br from-emerald-900/40 to-teal-900/40 flex items-center justify-center text-emerald-400 text-xs">
                                    Pristine Canopy
                                  </div>
                                  <div className="text-xs text-slate-400 font-semibold">2025 baseline mapping</div>
                                </div>
                              ) : (
                                <div className="text-center space-y-2">
                                  <div className="w-32 h-32 rounded-full border-2 border-red-500/50 bg-gradient-to-br from-red-950/40 to-amber-950/40 flex items-center justify-center text-red-400 text-xs relative animate-pulse">
                                    Anomaly Detected
                                    <div className="absolute top-1 right-1 w-3.5 h-3.5 bg-red-500 rounded-full" />
                                  </div>
                                  <div className="text-xs text-red-400 font-semibold">2026 structural differences</div>
                                </div>
                              )}
                            </div>

                            {/* Alert Log and stats */}
                            <div className="bg-black/20 p-5 rounded-xl border border-white/5 space-y-4">
                              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Detection Statistics (2025 vs 2026)</h4>
                              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                                <div className="bg-[#1b1232] p-2 rounded border border-white/5">
                                  <span className="text-slate-500 text-[10px] block">Buildings</span>
                                  <span className="text-white font-bold text-sm">
                                    {compareYear === 2026 ? encroachmentData[encroachmentArea].buildings2026 : encroachmentData[encroachmentArea].buildings2025}
                                  </span>
                                  <span className="text-[9px] text-red-400 block mt-0.5">+{encroachmentData[encroachmentArea].buildings2026 - encroachmentData[encroachmentArea].buildings2025} new</span>
                                </div>
                                <div className="bg-[#1b1232] p-2 rounded border border-white/5">
                                  <span className="text-slate-500 text-[10px] block">Roads (km)</span>
                                  <span className="text-white font-bold text-sm">
                                    {compareYear === 2026 ? encroachmentData[encroachmentArea].roads2026 : encroachmentData[encroachmentArea].roads2025}
                                  </span>
                                  <span className="text-[9px] text-red-400 block mt-0.5">+{Math.round((encroachmentData[encroachmentArea].roads2026 - encroachmentData[encroachmentArea].roads2025) * 10) / 10}km</span>
                                </div>
                                <div className="bg-[#1b1232] p-2 rounded border border-white/5">
                                  <span className="text-slate-500 text-[10px] block">Agriculture (Ha)</span>
                                  <span className="text-white font-bold text-sm">
                                    {compareYear === 2026 ? encroachmentData[encroachmentArea].agri2026 : encroachmentData[encroachmentArea].agri2025}
                                  </span>
                                  <span className="text-[9px] text-red-400 block mt-0.5">+{Math.round((encroachmentData[encroachmentArea].agri2026 - encroachmentData[encroachmentArea].agri2025) * 10) / 10}ha</span>
                                </div>
                              </div>

                              <div className="pt-2">
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Difference Engine Log</span>
                                <div className="space-y-1">
                                  {encroachmentData[encroachmentArea].logs.map((log, idx) => (
                                    <div key={idx} className="text-[10px] font-mono text-red-400 bg-red-500/5 p-1.5 rounded border border-red-500/10">
                                      {log}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 8. Climate Vulnerability Model */}
                      {selectedModel === 8 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="space-y-4">
                            <div>
                              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Select Target Asset
                              </label>
                              <Select
                                value={climateTarget}
                                onChange={(value) => setClimateTarget(value)}
                                options={[
                                  { value: 'Hangul', label: 'Hangul (Species Target)' },
                                  { value: 'Hokersar', label: 'Hokersar Wetland (Habitat Target)' },
                                ]}
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                Climate Warming Scenario
                              </label>
                              <div className="grid grid-cols-3 gap-2">
                                {[
                                  { id: 'mod', label: '+1.5°C' },
                                  { id: 'high', label: '+2.5°C' },
                                  { id: 'ext', label: '+4.0°C' }
                                ].map(sc => (
                                  <button
                                    key={sc.id}
                                    onClick={() => setClimateScenario(sc.id as any)}
                                    className={`p-2 rounded text-xs font-bold border transition-colors ${
                                      climateScenario === sc.id
                                        ? 'bg- emerald-700 border-emerald-500 text-white'
                                        : 'bg-black/30 border-white/5 text-slate-400 hover:border-white/10'
                                    }`}
                                  >
                                    {sc.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="bg-black/20 p-5 rounded-xl border border-white/5 flex flex-col justify-between">
                            <div>
                              <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Target Climate Risk</span>
                              <div className="flex items-center gap-2 mb-3">
                                <span className={`text-xl font-bold ${
                                  climateReports[climateTarget]?.[climateScenario]?.risk === 'High' ? 'text-red-400' : 'text-amber-400'
                                }`}>
                                  {climateReports[climateTarget]?.[climateScenario]?.risk} Risk
                                </span>
                              </div>
                              <p className="text-xs text-slate-300 leading-relaxed bg-[#1b1232] p-3 rounded border border-white/5">
                                {climateReports[climateTarget]?.[climateScenario]?.summary}
                              </p>
                            </div>

                            <div className="space-y-2 pt-4">
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Warming Impact Metrics:</span>
                              {climateReports[climateTarget]?.[climateScenario]?.factors.map((fact, idx) => (
                                <div key={idx} className="space-y-1">
                                  <div className="flex justify-between text-[11px] text-slate-400">
                                    <span>{fact.label}</span>
                                    <span>{fact.value}% stress</span>
                                  </div>
                                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-50" style={{ width: `${fact.value}%` }}></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 9. Research & Monitoring Gap Engine */}
                      {selectedModel === 19 && (
                        <div className="space-y-6">
                          <div className="flex justify-between items-center bg-black/20 p-4 rounded-xl border border-white/5">
                            <span className="text-xs text-slate-400 font-bold">Select Filter Category:</span>
                            <div className="flex border border-white/10 rounded overflow-hidden">
                              <button
                                onClick={() => setResearchGapFocus('species')}
                                className={`px-4 py-1 text-xs font-semibold ${researchGapFocus === 'species' ? 'bg- emerald-700 text-white' : 'bg-black/30 text-slate-400'}`}
                              >
                                Species Research Gaps
                              </button>
                              <button
                                onClick={() => setResearchGapFocus('pa')}
                                className={`px-4 py-1 text-xs font-semibold ${researchGapFocus === 'pa' ? 'bg- emerald-700 text-white' : 'bg-black/30 text-slate-400'}`}
                              >
                                Protected Area Gaps
                              </button>
                            </div>
                          </div>

                          <div className="bg-black/20 rounded-xl border border-white/5 overflow-hidden">
                            <table className="w-full text-left border-collapse text-xs">
                              <thead>
                                <tr className="border-b border-white/10 bg-white/5 text-slate-400">
                                  <th className="p-3">Target Name</th>
                                  <th className="p-3">Gap Level</th>
                                  <th className="p-3">Post-2015 Papers</th>
                                  <th className="p-3">Last Scientific Study</th>
                                  <th className="p-3">Data Confidence</th>
                                </tr>
                              </thead>
                              <tbody>
                                {researchGaps[researchGapFocus].map((item, idx) => (
                                  <tr key={idx} className="border-b border-white/[0.06] hover:bg-white/5 transition-colors">
                                    <td className="p-3 font-semibold text-white">{item.name}</td>
                                    <td className="p-3">
                                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                        item.gap === 'High' ? 'bg-red-500/20 text-red-300' : item.gap === 'Medium' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                                      }`}>
                                        {item.gap}
                                      </span>
                                    </td>
                                    <td className="p-3 text-slate-300 font-mono">{item.publications}</td>
                                    <td className="p-3 text-slate-400">{item.lastStudy}</td>
                                    <td className="p-3 font-semibold text-slate-300">{item.confidence}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}

                      {/* 10. KEW Conservation Analyst (QA Center) */}
                      {selectedModel === 29 && (
                        <div className="space-y-6">
                          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                              Select a query to execute on the KEW Model:
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                              {[
                                'Which protected areas are deteriorating?',
                                'Where can Hangul range expand?',
                                'Which wetlands are most vulnerable?',
                                'Show all studies on Dachigam after 2015'
                              ].map((q, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => triggerAnalystQuery(q)}
                                  className={`p-3 rounded-lg border text-xs text-left transition-all flex items-center justify-between gap-3 ${
                                    analystQuestion === q
                                      ? 'border-emerald-500 bg-emerald-500/10 text-white'
                                      : 'border-white/5 bg-black/30 text-slate-300 hover:border-white/10 hover:text-white'
                                  }`}
                                >
                                  <span>{q}</span>
                                  <Play className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Chat Output */}
                          <div className="bg-white/5 rounded-xl p-5 border border-white/5 min-h-[200px] flex flex-col justify-center">
                            {isAnalystLoading ? (
                              <div className="text-center space-y-2 py-8">
                                <motion.div 
                                  animate={{ rotate: 360 }}
                                  transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                                  className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto"
                                />
                                <p className="text-xs text-slate-400 italic">KEW conservation network modeling active, scanning indices...</p>
                              </div>
                            ) : analystOutput ? (
                              <div className="space-y-4">
                                <h4 className="text-sm font-bold text-white border-b border-white/[0.06] pb-2 flex items-center gap-2">
                                  <Sparkles className="w-4 h-4 text-emerald-400" />
                                  {analystOutput.title}
                                </h4>
                                <div 
                                  className="text-xs leading-relaxed"
                                  dangerouslySetInnerHTML={{ __html: analystOutput.html }} 
                                />
                              </div>
                            ) : (
                              <div className="text-center text-slate-500 py-8 text-xs">
                                <Info className="w-8 h-8 text-slate-700 mx-auto mb-2" />
                                Select one of the pre-set queries above to request automatic calculations and evidence scans.
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}

              </Card>
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 2: ALL 32 KEW MODELS REGISTRY */}
        {/* ============================================================ */}
        {activeTab === 'registry' && (
          <div className="space-y-6">
            
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/5 border border-white/10 p-4 rounded-xl">
              {/* Search */}
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search 32 models..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/5 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:border-emerald-500/50 outline-none"
                />
              </div>

              {/* Tiers Filter */}
              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  onClick={() => setSelectedTier('all')}
                  className={`px-3 py-1.5 rounded-lg border transition-all ${selectedTier === 'all' ? 'bg- emerald-700 text-white border-emerald-500' : 'bg-white/5 border-white/5 text-slate-400'}`}
                >
                  All Tiers
                </button>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(tier => (
                  <button
                    key={tier}
                    onClick={() => setSelectedTier(tier)}
                    className={`px-3 py-1.5 rounded-lg border transition-all ${selectedTier === tier ? 'bg- emerald-700 text-white border-emerald-500' : 'bg-white/5 border-white/5 text-slate-400'}`}
                  >
                    Tier {tier}
                  </button>
                ))}
              </div>
            </div>

            {/* Models Table/List */}
            <div className="space-y-4">
              {filteredModels.map((model) => (
                <Card 
                  key={model.id} 
                  className="card-intelligence border border-white/10 bg-white/5 p-5 hover:border-emerald-500/30 transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <Badge variant="outline" size="sm" className="border-white/10 text-slate-400">
                          Tier {model.tier}: {model.tierName}
                        </Badge>
                        {model.recommended && (
                          <Badge variant="success" size="sm" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                            Highly Recommended
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                        {model.name}
                      </h3>
                      <p className="text-slate-400 text-xs mt-1 max-w-3xl leading-relaxed">
                        {model.description}
                      </p>
                    </div>

                    <div className="flex-shrink-0 text-left sm:text-right text-xs">
                      <div className="text-slate-500">Output Signature</div>
                      <div className="text-emerald-400 font-semibold mt-0.5 font-mono">{model.outputType}</div>
                    </div>
                  </div>

                  {/* Metrics sub-strip */}
                  <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap gap-x-6 gap-y-2 text-xs text-slate-500">
                    <span className="font-bold uppercase tracking-wider text-[10px] text-slate-600">Model Input Metrics:</span>
                    {model.metrics.map((met, idx) => (
                      <span key={idx} className="flex items-center gap-1">
                        <span className="w-1 h-1 bg-emerald-500 rounded-full" />
                        {met}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}

              {filteredModels.length === 0 && (
                <div className="text-center py-12 text-slate-500 text-sm">
                  No models matching filters. Reset search queries.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================ */}
        {/* TAB 3: ESRO HERITAGE ARCHIVES & HISTORY */}
        {/* ============================================================ */}
        {activeTab === 'esro' && (
          <div className="space-y-12">
            
            {/* Attributions */}
            <div className="bg-gradient-to-r from-emerald-900/10 to-teal-900/10 border border-emerald-500/10 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Environmental Development & Research Organisation (ESRO) Legacy</h3>
                  <p className="text-slate-400 text-sm leading-relaxed max-w-4xl">
                    EcoWatch integrates and digitalizes archives of ESRO, which operated four interconnected 
                    conservation networks in Kashmir. Led by a specialist board of 45 members covering wildlife, 
                    livestock, agriculture, forestry, taxonomy, fisheries, and biotechnology, their archives provide 
                    the core scientific baselines for our active model structures.
                  </p>
                  <p className="text-slate-500 text-xs mt-2">
                    Source: eIEN Kashmir monitoring archive files (bcn_eienkashmir.htm, cank_eienkashmir.htm, thcnp_eienkashmir.htm, cpep_eienkashmir.htm)
                  </p>
                </div>
              </div>
            </div>

            {/* ESRO Networks Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {conservationNetworks.map((network) => {
                const Icon = network.icon;
                return (
                  <Card key={network.id} className="border border-white/10 bg-white/5 p-5 h-full flex flex-col justify-between">
                    <div>
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${network.color} text-white flex items-center justify-center shadow-lg flex-shrink-0`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="info" size="sm">{network.acronym}</Badge>
                            <Badge variant="outline" size="sm" className="border-white/10 text-slate-500">ESRO ARCHIVE</Badge>
                          </div>
                          <h3 className="text-lg font-bold text-white">{network.name}</h3>
                          <p className="text-[10px] text-slate-500 font-mono">Source File: {network.esroFile}</p>
                        </div>
                      </div>

                      <p className="text-slate-400 text-xs leading-relaxed mb-4">{network.description}</p>

                      {/* Sub-programs */}
                      {network.subPrograms.length > 0 && (
                        <div className="mb-4">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Network Sub-programs</span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {network.subPrograms.map((prog, pIdx) => (
                              <div key={pIdx} className="bg-black/20 p-2.5 rounded border border-white/5 text-xs">
                                <div className="font-semibold text-emerald-400">{prog.acronym}</div>
                                <div className="text-[10px] text-slate-500 mb-1 leading-tight">{prog.name}</div>
                                <p className="text-[10px] text-slate-400 leading-normal">{prog.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-white/[0.06]">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">EcoWatch Module Intersections</span>
                      <div className="flex flex-wrap gap-2">
                        {network.ecoWatchMapping.map((mapItem, mIdx) => (
                          <Link 
                            key={mIdx} 
                            href={mapItem.path}
                            className="text-[10px] px-2.5 py-1 rounded bg-[#1f163b] text-slate-300 hover:text-emerald-300 hover:border-emerald-500/30 border border-white/5 transition-all"
                          >
                            {mapItem.module}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Specialists Panel */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-400" />
                Specialist Research Framework
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {researchPartners.map((part, idx) => (
                  <Card key={idx} className="border border-white/10 bg-white/5 p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-semibold text-white">{part.domain}</span>
                        <span className="text-sm font-black text-emerald-400 font-mono">{part.count} experts</span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {part.expertise}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

          </div>
        )}

      </section>

      {/* CTA Bottom Section */}
      <section className="container mx-auto px-6 py-12 border-t border-white/[0.06]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Network className="w-6 h-6" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Operationalize Spatial Intelligence
          </h2>
          <p className="text-sm text-slate-400 mb-6 max-w-xl mx-auto">
            Integrate calculations directly with telemetry maps, corridors, and protected areas registries across the platform.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              variant="outline"
              className="border-white/10 hover:bg-white/5 text-white"
            >
              <Link href="/protected-network/atlas">GIS Atlas Map</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/10 hover:bg-white/5 text-white"
            >
              <Link href="/protected-network/registry">Protected Areas Registry</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/10 hover:bg-white/5 text-white"
            >
              <Link href="/protected-network/monitoring-and-threats">Conservation Alerts</Link>
            </Button>
          </div>
        </motion.div>
      </section>

    </main>
  );
}
