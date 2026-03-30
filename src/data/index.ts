// Centralized data service for the entire platform
// This provides structured mock data that is API-ready

export interface Entity {
  id: string;
  slug: string;
  name: string;
  description: string;
  type: string;
  category?: string;
  status?: string;
  verificationStatus?: 'verified' | 'reviewed' | 'community' | 'under-review';
  createdAt: string;
  updatedAt: string;
}

export interface Species extends Entity {
  type: 'species';
  scientificName: string;
  commonName: string;
  localName?: string;
  taxonomicGroup: 'mammals' | 'birds' | 'fish' | 'reptiles' | 'amphibians' | 'insects' | 'plants';
  conservationStatus: 'LC' | 'NT' | 'VU' | 'EN' | 'CR' | 'EW' | 'EX';
  habitat: string[];
  elevationRange: { min: number; max: number };
  districts: string[];
  protectedAreas?: string[];
  seasonality?: string;
  threats?: string[];
  imageUrl?: string;
}

export interface ProtectedArea extends Entity {
  type: 'protected_area';
  category: 'national_park' | 'wildlife_sanctuary' | 'conservation_reserve' | 'wetland_reserve';
  area: number; // in km²
  district: string;
  established: number;
  ecosystems: string[];
  keySpecies: string[];
  trails?: string[];
  imageUrl?: string;
}

export interface WaterBody extends Entity {
  type: 'lake' | 'wetland' | 'river' | 'spring' | 'glacier';
  category: string;
  area?: number;
  depth?: number;
  elevation: number;
  district: string;
  watershed?: string;
  waterQuality?: {
    pH: number;
    dissolvedOxygen: number;
    turbidity: number;
  };
  threats?: string[];
  imageUrl?: string;
}

export interface Trail extends Entity {
  type: 'trail';
  trailType: 'hiking' | 'eco-trail' | 'birding' | 'bloom' | 'wetland';
  distance: number; // in km
  duration: string;
  difficulty: 'easy' | 'moderate' | 'difficult';
  elevationGain: number;
  district: string;
  habitats: string[];
  bestSeason: string[];
  permitRequired: boolean;
  imageUrl?: string;
}

export interface District {
  id: string;
  slug: string;
  name: string;
  area: number;
  population: number;
  headquarters: string;
  ecologicalSummary: {
    protectedAreas: number;
    waterBodies: number;
    forestCover: number;
    speciesCount: number;
  };
  environmentalScore: number;
  hazards?: string[];
  imageUrl?: string;
}

export interface Alert {
  id: string;
  slug: string;
  type: 'wetland_encroachment' | 'air_quality' | 'trail_closure' | 'water_anomaly' | 'avalanche' | 'landslide' | 'wildlife_conflict';
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  status: 'active' | 'monitoring' | 'resolved';
  location: string;
  district: string;
  affectedEntity?: {
    type: string;
    slug: string;
    name: string;
  };
  timestamp: string;
  updatedAt: string;
}

export interface Report {
  id: string;
  slug: string;
  title: string;
  type: 'scientific' | 'management_plan' | 'eia' | 'policy' | 'atlas';
  year: number;
  authors: string[];
  abstract: string;
  topics: string[];
  linkedEntities?: {
    type: string;
    slug: string;
    name: string;
  }[];
  downloadUrl?: string;
}

export interface DashboardData {
  id: string;
  name: string;
  description: string;
  metrics: Array<{
    label: string;
    value: number | string;
    unit?: string;
    trend?: 'up' | 'down' | 'stable';
    trendValue?: number;
  }>;
  chartData: Array<{
    label: string;
    value: number;
    timestamp?: string;
  }>;
}

// Mock Data Collections
export const speciesData: Species[] = [
  {
    id: 'hangul',
    slug: 'hangul',
    name: 'Hangul (Kashmir Stag)',
    scientificName: 'Cervus hanglu hanglu',
    commonName: 'Kashmir Stag',
    localName: 'Hangul',
    description: 'Endangered subspecies of elk, state animal of Jammu and Kashmir. Found only in Dachigam National Park and surrounding areas.',
    type: 'species',
    taxonomicGroup: 'mammals',
    conservationStatus: 'CR',
    habitat: ['Temperate forests', 'Alpine meadows', 'Riverine forests'],
    elevationRange: { min: 1800, max: 3500 },
    districts: ['Srinagar', 'Ganderbal'],
    protectedAreas: ['dachigam'],
    seasonality: 'Year-round resident',
    threats: ['Habitat loss', 'Poaching', 'Predation', 'Disease'],
    verificationStatus: 'verified',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-03-26T10:00:00Z',
  },
  {
    id: 'snow-leopard',
    slug: 'snow-leopard',
    name: 'Snow Leopard',
    scientificName: 'Panthera uncia',
    commonName: 'Snow Leopard',
    localName: 'Barfani Tendua',
    description: 'Elusive high-altitude cat, flagship species of Himalayan ecosystems.',
    type: 'species',
    taxonomicGroup: 'mammals',
    conservationStatus: 'VU',
    habitat: ['Alpine zones', 'Rocky terrain', 'High altitude deserts'],
    elevationRange: { min: 3000, max: 5500 },
    districts: ['Kargil', 'Leh', 'Kishtwar'],
    protectedAreas: ['hemis', 'kishtwar'],
    seasonality: 'Year-round resident',
    threats: ['Poaching', 'Retaliatory killing', 'Climate change'],
    verificationStatus: 'verified',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-03-25T14:00:00Z',
  },
  {
    id: 'himlayan-monals',
    slug: 'himlayan-monals',
    name: 'Himalayan Monal',
    scientificName: 'Lophophorus impejanus',
    commonName: 'Himalayan Monal',
    localName: 'Danphe',
    description: 'Colorful pheasant species, state bird of Himachal Pradesh.',
    type: 'species',
    taxonomicGroup: 'birds',
    conservationStatus: 'LC',
    habitat: ['Temperate forests', 'Alpine meadows', 'Rhododendron forests'],
    elevationRange: { min: 2500, max: 4500 },
    districts: ['Srinagar', 'Anantnag', 'Kulgam'],
    protectedAreas: ['dachigam', 'overa-aru'],
    seasonality: 'Summer breeder',
    threats: ['Habitat degradation', 'Hunting'],
    verificationStatus: 'verified',
    createdAt: '2024-02-10T00:00:00Z',
    updatedAt: '2024-03-24T09:00:00Z',
  },
];

export const protectedAreasData: ProtectedArea[] = [
  {
    id: 'dachigam',
    slug: 'dachigam-national-park',
    name: 'Dachigam National Park',
    description: 'Critical habitat for endangered Hangul deer and diverse Himalayan ecosystems. Located 22 km from Srinagar.',
    type: 'protected_area',
    category: 'national_park',
    area: 141,
    district: 'Srinagar',
    established: 1981,
    ecosystems: ['Temperate forests', 'Alpine meadows', 'Riverine forests'],
    keySpecies: ['hangul', 'himlayan-monals', 'brown-bear'],
    trails: ['dachigam-upper', 'dachigam-lower'],
    verificationStatus: 'verified',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-26T08:00:00Z',
  },
  {
    id: 'hemis',
    slug: 'hemis-national-park',
    name: 'Hemis National Park',
    description: 'Largest national park in South Asia, famous for snow leopards.',
    type: 'protected_area',
    category: 'national_park',
    area: 4400,
    district: 'Leh',
    established: 1981,
    ecosystems: ['High altitude desert', 'Alpine zones', 'River valleys'],
    keySpecies: ['snow-leopard', 'tibetan-argali', 'kiang'],
    verificationStatus: 'verified',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-25T12:00:00Z',
  },
];

export const waterBodiesData: WaterBody[] = [
  {
    id: 'dal-lake',
    slug: 'dal-lake',
    name: 'Dal Lake',
    description: 'Iconic urban wetland with unique floating gardens and biodiversity. Second largest lake in J&K.',
    type: 'lake',
    category: 'Urban lake',
    area: 18,
    depth: 6,
    elevation: 1583,
    district: 'Srinagar',
    watershed: 'Jhelum Basin',
    waterQuality: {
      pH: 7.2,
      dissolvedOxygen: 6.8,
      turbidity: 12,
    },
    threats: ['Eutrophication', 'Encroachment', 'Pollution', 'Invasive species'],
    verificationStatus: 'verified',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-26T07:00:00Z',
  },
  {
    id: 'hokersar',
    slug: 'hokersar-wetland',
    name: 'Hokersar Wetland',
    description: 'Ramsar site and critical wetland for migratory birds. Located north of Srinagar.',
    type: 'wetland',
    category: 'Ramsar site',
    area: 13.75,
    elevation: 1585,
    district: 'Srinagar',
    watershed: 'Jhelum Basin',
    waterQuality: {
      pH: 7.4,
      dissolvedOxygen: 7.2,
      turbidity: 8,
    },
    threats: ['Eutrophication', 'Encroachment', 'Siltation'],
    verificationStatus: 'verified',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-25T16:00:00Z',
  },
];

export const trailsData: Trail[] = [
  {
    id: 'tarsar-marsar',
    slug: 'tarsar-marsar-trek',
    name: 'Tarsar Marsar Trek',
    description: 'High-altitude alpine trail connecting pristine glacial lakes. One of Kashmir\'s most beautiful treks.',
    type: 'trail',
    trailType: 'hiking',
    distance: 32,
    duration: '5 days',
    difficulty: 'moderate',
    elevationGain: 1200,
    district: 'Anantnag',
    habitats: ['Temperate forests', 'Alpine meadows', 'Glacial zones'],
    bestSeason: ['June', 'July', 'August', 'September'],
    permitRequired: true,
    verificationStatus: 'verified',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-03-24T10:00:00Z',
  },
];

export const districtsData: District[] = [
  {
    id: 'srinagar',
    slug: 'srinagar',
    name: 'Srinagar',
    area: 2228,
    population: 1269751,
    headquarters: 'Srinagar',
    ecologicalSummary: {
      protectedAreas: 2,
      waterBodies: 47,
      forestCover: 23,
      speciesCount: 312,
    },
    environmentalScore: 72,
    hazards: ['Urban flooding', 'Air pollution', 'Wetland encroachment'],
  },
  {
    id: 'anantnag',
    slug: 'anantnag',
    name: 'Anantnag',
    area: 3981,
    population: 1078692,
    headquarters: 'Anantnag',
    ecologicalSummary: {
      protectedAreas: 3,
      waterBodies: 89,
      forestCover: 34,
      speciesCount: 428,
    },
    environmentalScore: 84,
    hazards: ['Landslide', 'Flash floods'],
  },
];

export const alertsData: Alert[] = [
  {
    id: 'alert-1',
    slug: 'wetland-encroachment-hokersar',
    type: 'wetland_encroachment',
    title: 'Wetland Encroachment Alert',
    description: 'Illegal construction detected near protected wetland boundary. Satellite imagery confirms 2.3 hectares affected.',
    severity: 'high',
    status: 'active',
    location: 'Hokersar Wetland, Srinagar',
    district: 'Srinagar',
    affectedEntity: {
      type: 'wetland',
      slug: 'hokersar-wetland',
      name: 'Hokersar Wetland',
    },
    timestamp: '2024-03-26T08:30:00Z',
    updatedAt: '2024-03-26T09:00:00Z',
  },
  {
    id: 'alert-2',
    slug: 'air-quality-advisory-srinagar',
    type: 'air_quality',
    title: 'Air Quality Advisory',
    description: 'Moderate AQI levels expected due to temperature inversion. Sensitive groups advised to limit outdoor activities.',
    severity: 'medium',
    status: 'active',
    location: 'Srinagar Urban Area',
    district: 'Srinagar',
    timestamp: '2024-03-26T07:00:00Z',
    updatedAt: '2024-03-26T07:00:00Z',
  },
  {
    id: 'alert-3',
    slug: 'trail-closure-kolahoi',
    type: 'trail_closure',
    title: 'Trail Closure - Landslide Risk',
    description: 'Temporary closure due to unstable terrain after heavy rainfall. Expected to reopen in 48-72 hours.',
    severity: 'high',
    status: 'active',
    location: 'Kolahoi Base Camp Trail',
    district: 'Anantnag',
    affectedEntity: {
      type: 'trail',
      slug: 'kolahoi-base-camp',
      name: 'Kolahoi Base Camp Trail',
    },
    timestamp: '2024-03-25T16:45:00Z',
    updatedAt: '2024-03-26T08:00:00Z',
  },
];

export const reportsData: Report[] = [
  {
    id: 'report-1',
    slug: 'wetland-conservation-strategy',
    title: 'Wetland Conservation Strategy for Kashmir Valley',
    type: 'scientific',
    year: 2023,
    authors: ['Dr. A. Rashid', 'Dr. S. Bhat'],
    abstract: 'Comprehensive assessment of wetland ecosystems in Kashmir Valley with conservation recommendations.',
    topics: ['Wetlands', 'Conservation', 'Biodiversity', 'Water Quality'],
    linkedEntities: [
      { type: 'wetland', slug: 'hokersar-wetland', name: 'Hokersar Wetland' },
      { type: 'wetland', slug: 'dal-lake', name: 'Dal Lake' },
    ],
  },
];

// Data access functions
export const getData = {
  species: {
    all: () => speciesData,
    bySlug: (slug: string) => speciesData.find(s => s.slug === slug),
    byTaxonomicGroup: (group: string) => speciesData.filter(s => s.taxonomicGroup === group),
    byConservationStatus: (status: string) => speciesData.filter(s => s.conservationStatus === status),
  },
  protectedAreas: {
    all: () => protectedAreasData,
    bySlug: (slug: string) => protectedAreasData.find(pa => pa.slug === slug),
    byCategory: (category: string) => protectedAreasData.filter(pa => pa.category === category),
    byDistrict: (district: string) => protectedAreasData.filter(pa => pa.district === district),
  },
  waterBodies: {
    all: () => waterBodiesData,
    bySlug: (slug: string) => waterBodiesData.find(wb => wb.slug === slug),
    byType: (type: string) => waterBodiesData.filter(wb => wb.type === type),
    byDistrict: (district: string) => waterBodiesData.filter(wb => wb.district === district),
  },
  trails: {
    all: () => trailsData,
    bySlug: (slug: string) => trailsData.find(t => t.slug === slug),
    byType: (type: string) => trailsData.filter(t => t.trailType === type),
    byDistrict: (district: string) => trailsData.filter(t => t.district === district),
  },
  districts: {
    all: () => districtsData,
    bySlug: (slug: string) => districtsData.find(d => d.slug === slug),
  },
  alerts: {
    all: () => alertsData,
    bySlug: (slug: string) => alertsData.find(a => a.slug === slug),
    bySeverity: (severity: string) => alertsData.filter(a => a.severity === severity),
    byType: (type: string) => alertsData.filter(a => a.type === type),
    active: () => alertsData.filter(a => a.status === 'active'),
  },
  reports: {
    all: () => reportsData,
    bySlug: (slug: string) => reportsData.find(r => r.slug === slug),
    byTopic: (topic: string) => reportsData.filter(r => r.topics.includes(topic)),
  },
};

// Search function
export const searchAll = (query: string) => {
  const lowerQuery = query.toLowerCase();
  
  return {
    species: speciesData.filter(s => 
      s.name.toLowerCase().includes(lowerQuery) ||
      s.scientificName.toLowerCase().includes(lowerQuery) ||
      s.commonName.toLowerCase().includes(lowerQuery)
    ),
    protectedAreas: protectedAreasData.filter(pa => 
      pa.name.toLowerCase().includes(lowerQuery)
    ),
    waterBodies: waterBodiesData.filter(wb => 
      wb.name.toLowerCase().includes(lowerQuery)
    ),
    trails: trailsData.filter(t => 
      t.name.toLowerCase().includes(lowerQuery)
    ),
    districts: districtsData.filter(d => 
      d.name.toLowerCase().includes(lowerQuery)
    ),
    alerts: alertsData.filter(a => 
      a.title.toLowerCase().includes(lowerQuery) ||
      a.description.toLowerCase().includes(lowerQuery)
    ),
    reports: reportsData.filter(r => 
      r.title.toLowerCase().includes(lowerQuery) ||
      r.abstract.toLowerCase().includes(lowerQuery)
    ),
  };
};
