// Trails & Sightings Data Service
// Comprehensive data models and seed data for the upgraded Trails & Sightings module

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type KashmirDistrict = 
  | 'Srinagar' 
  | 'Anantnag' 
  | 'Kulgam' 
  | 'Pulwama' 
  | 'Shopian'
  | 'Budgam' 
  | 'Baramulla' 
  | 'Kupwara' 
  | 'Ganderbal' 
  | 'Bandipora'
  | 'Kishtwar' 
  | 'Doda' 
  | 'Ramban' 
  | 'Rajouri' 
  | 'Poonch' 
  | 'Kathua';

export type HabitatType = 
  | 'temperate-forest'
  | 'coniferous-forest'
  | 'alpine-meadow'
  | 'wetland'
  | 'riverine'
  | 'rocky-slope'
  | 'glacial'
  | 'high-altitude-desert'
  | 'oak-forest'
  | 'mixed-deciduous'
  | 'riparian'
  | 'scrubland'
  | 'agricultural';

export type TrailCategory = 
  | 'hiking'
  | 'eco'
  | 'birding'
  | 'wetland'
  | 'bloom'
  | 'forest-meadow'
  | 'glacier-high-altitude'
  | 'protected-area';

export type TrailClass = 
  | 'flagship'
  | 'sensitive'
  | 'wetland'
  | 'seasonal'
  | 'protected-area'
  | 'high-altitude';

export type AccessStatus = 'open' | 'restricted' | 'closed' | 'permit-required';

export type SensitivityLevel = 'low' | 'medium' | 'high' | 'critical';

export type RouteCondition = 'excellent' | 'good' | 'fair' | 'poor' | 'hazardous';

export type Difficulty = 'easy' | 'moderate' | 'difficult' | 'technical';

export type RouteType = 'loop' | 'out-and-back' | 'point-to-point' | 'circuit';

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export type VerificationStatus = 'verified' | 'reviewed' | 'community' | 'pending';

export type TaxonomicGroup = 
  | 'mammals' 
  | 'birds' 
  | 'fish' 
  | 'plants' 
  | 'medicinal-plants' 
  | 'amphibians' 
  | 'reptiles';

export type ObserverType = 'expert' | 'field-team' | 'citizen-scientist';

export type ObservationMethod = 'visual' | 'camera-trap' | 'audio' | 'track' | 'scat' | 'other';

// ============================================================================
// CORE INTERFACES
// ============================================================================

export interface TrailIntelligence {
  // Core Identity
  id: string;
  slug: string;
  name: string;
  trailClass: TrailClass;
  category: TrailCategory;
  
  // Geographic Context
  district: KashmirDistrict[];
  habitat: HabitatType[];
  altitudeBand: { min: number; max: number; unit: 'meters' };
  
  // Temporal Logic
  seasonWindow: {
    optimal: string[]; // Month names
    accessible: string[];
    closed: string[];
    reason?: string;
  };
  
  // Access & Sensitivity
  accessStatus: AccessStatus;
  sensitivity: SensitivityLevel;
  sensitivityNotes?: string;
  permissions?: {
    required: boolean;
    authority: string;
    process?: string;
  };
  
  // Ecological Linkages
  relatedSpecies: string[]; // Species slugs
  relatedProtectedArea?: string; // PA slug
  relatedBloom?: string; // Bloom event slug
  relatedMigration?: string; // Migration event slug
  relatedWetland?: string; // Wetland slug
  
  // Route Intelligence
  routeType: RouteType;
  difficulty: Difficulty;
  length: { value: number; unit: 'km' };
  duration: { min: number; max: number; unit: 'hours' };
  elevationGain: { value: number; unit: 'meters' };
  
  // Condition Signals
  routeCondition: {
    status: RouteCondition;
    lastUpdated: string;
    notes?: string;
    hazards?: string[];
  };
  
  // Observer Activity
  observerActivity: {
    totalObservers: number;
    activeThisMonth: number;
    totalSightings: number;
    verifiedSightings: number;
  };
  
  // Metadata
  description: string;
  features: string[];
  imageUrl?: string;
  lastVerified: string;
}

export interface SightingIntelligence {
  // Core Identity
  id: string;
  slug: string;
  speciesName: string;
  speciesSlug: string;
  taxonomicGroup: TaxonomicGroup;
  category: 'bird-sightings' | 'wildlife-sightings' | 'plant-phenology-sightings' | 'aquatic-wetland-sightings';

  // Geographic Context
  district: KashmirDistrict;
  location: string;
  habitat: HabitatType;
  altitude: { value: number; unit: 'meters' };
  
  // Temporal Data
  observationDate: string;
  season: Season;
  
  // Verification Workflow
  verificationStatus: VerificationStatus;
  verifiedBy?: string;
  verificationDate?: string;
  isSensitive: boolean;
  sensitivityReason?: string;
  
  // Observer Data
  observerType: ObserverType;
  observerName?: string;
  observationMethod: ObservationMethod;
  
  // Ecological Context
  behaviorObserved?: string;
  groupSize?: number;
  habitatCondition?: string;
  associatedSpecies?: string[];
  
  // Linkages
  linkedTrail?: string;
  linkedProtectedArea?: string;
  linkedWetland?: string;
  linkedEvent?: string;
  
  // Media & Evidence
  hasPhoto: boolean;
  photoCount?: number;
  hasAudio: boolean;
  hasVideo: boolean;
  
  // Data Quality
  confidenceLevel: 'high' | 'medium' | 'low';
  notes?: string;
  
  // Kashmir-Only Enforcement
  isKashmirOnly: boolean;
}

export interface SightingAggregation {
  categoryId: string;
  title: string;
  totalCount: number;
  
  // Verification Breakdown
  verifiedCount: number;
  reviewedCount: number;
  communityCount: number;
  pendingCount: number;
  
  // District Distribution
  byDistrict: Partial<Record<KashmirDistrict, number>>;
  
  // Seasonal Concentration
  bySeason: Partial<Record<Season, number>>;
  
  // Habitat Linkage
  byHabitat: Partial<Record<HabitatType, number>>;
  
  // High-Value Records
  highValueRecords: Array<{
    species: string;
    location: string;
    district: KashmirDistrict;
    date: string;
    significance: string;
  }>;
  
  // Recent Verified (Kashmir-only)
  recentVerified: SightingIntelligence[];
}

export interface SeasonalWindow {
  id: string;
  name: string;
  months: string[];
  description: string;
  associatedTrails: string[]; // Trail slugs
  associatedEvents: string[]; // Bloom/migration events
  accessConditions: {
    status: 'optimal' | 'good' | 'fair' | 'poor' | 'closed';
    notes: string;
  };
}

// ============================================================================
// KASHMIR DISTRICTS (Geographic Validation)
// ============================================================================

export const KASHMIR_DISTRICTS: KashmirDistrict[] = [
  'Srinagar', 'Anantnag', 'Kulgam', 'Pulwama', 'Shopian',
  'Budgam', 'Baramulla', 'Kupwara', 'Ganderbal', 'Bandipora',
  'Kishtwar', 'Doda', 'Ramban', 'Rajouri', 'Poonch', 'Kathua'
];

export const KASHMIR_GEOGRAPHIC_BOUNDS = {
  north: 34.8,
  south: 32.5,
  east: 75.8,
  west: 73.5
};

// ============================================================================
// HABITAT TYPES
// ============================================================================

export const HABITAT_TYPES: HabitatType[] = [
  'temperate-forest',
  'coniferous-forest',
  'alpine-meadow',
  'wetland',
  'riverine',
  'rocky-slope',
  'glacial',
  'high-altitude-desert',
  'oak-forest',
  'mixed-deciduous',
  'riparian',
  'scrubland'
];

// ============================================================================
// TRAIL INTELLIGENCE DATA
// ============================================================================

export const trailIntelligenceData: TrailIntelligence[] = [
  // FLAGSHIP TRAILS
  {
    id: 'dachigam-hangul-trail',
    slug: 'dachigam-hangul-trail',
    name: 'Dachigam Hangul Trail',
    trailClass: 'flagship',
    category: 'eco',
    district: ['Srinagar'],
    habitat: ['temperate-forest', 'oak-forest'],
    altitudeBand: { min: 1800, max: 3200, unit: 'meters' },
    seasonWindow: {
      optimal: ['April', 'May', 'June', 'September', 'October'],
      accessible: ['March', 'July', 'August', 'November'],
      closed: ['December', 'January', 'February'],
      reason: 'Heavy snowfall and rutting season'
    },
    accessStatus: 'permit-required',
    sensitivity: 'high',
    sensitivityNotes: 'Critical Hangul habitat - minimize disturbance',
    permissions: {
      required: true,
      authority: 'J&K Wildlife Protection Department',
      process: 'Online permit application 7 days in advance'
    },
    relatedSpecies: ['hangul', 'himalayan-black-bear', 'himalayan-monals'],
    relatedProtectedArea: 'dachigam-national-park',
    routeType: 'loop',
    difficulty: 'moderate',
    length: { value: 8.5, unit: 'km' },
    duration: { min: 4, max: 6, unit: 'hours' },
    elevationGain: { value: 650, unit: 'meters' },
    routeCondition: {
      status: 'good',
      lastUpdated: '2026-03-20',
      notes: 'Well-maintained trail with some steep sections'
    },
    observerActivity: {
      totalObservers: 234,
      activeThisMonth: 47,
      totalSightings: 892,
      verifiedSightings: 234
    },
    description: 'Premier ecological trail through Dachigam National Park, offering opportunities to observe the endangered Hangul (Kashmir Stag) in its natural habitat. This flagship trail showcases temperate forest ecosystems and provides interpretive signage about conservation efforts.',
    features: ['Hangul Habitat', 'Interpretive Trail', 'Watchtowers', 'Photography Points', 'Forest Walk'],
    imageUrl: '/images/trails/dachigam-hangul-trail.jpg',
    lastVerified: '2026-03-20'
  },
  
  {
    id: 'overa-aru-wildlife-circuit',
    slug: 'overa-aru-wildlife-circuit',
    name: 'Overa-Aru Wildlife Circuit',
    trailClass: 'flagship',
    category: 'protected-area',
    district: ['Anantnag'],
    habitat: ['temperate-forest', 'alpine-meadow', 'coniferous-forest'],
    altitudeBand: { min: 2100, max: 3800, unit: 'meters' },
    seasonWindow: {
      optimal: ['May', 'June', 'July', 'August', 'September'],
      accessible: ['April', 'October'],
      closed: ['November', 'December', 'January', 'February', 'March'],
      reason: 'Snow closure and wildlife breeding season'
    },
    accessStatus: 'permit-required',
    sensitivity: 'high',
    sensitivityNotes: 'Protected area - stay on marked trails',
    permissions: {
      required: true,
      authority: 'J&K Wildlife Protection Department',
      process: 'Permit required at entry gate'
    },
    relatedSpecies: ['hangul', 'musk-deer', 'western-tragopan', 'himalayan-monals'],
    relatedProtectedArea: 'overa-aru-wildlife-sanctuary',
    routeType: 'circuit',
    difficulty: 'difficult',
    length: { value: 24, unit: 'km' },
    duration: { min: 2, max: 3, unit: 'hours' },
    elevationGain: { value: 1200, unit: 'meters' },
    routeCondition: {
      status: 'fair',
      lastUpdated: '2026-03-18',
      notes: 'Some sections require scrambling; alpine meadows accessible only in summer',
      hazards: ['Steep sections', 'Loose rocks', 'Weather exposure']
    },
    observerActivity: {
      totalObservers: 189,
      activeThisMonth: 34,
      totalSightings: 567,
      verifiedSightings: 178
    },
    description: 'Multi-day wildlife circuit through Overa-Aru Wildlife Sanctuary, traversing diverse habitats from dense forests to alpine meadows. Excellent for observing Hangul, Musk Deer, and rare pheasants like the Western Tragopan.',
    features: ['Multi-day Trek', 'Wildlife Corridors', 'Alpine Meadows', 'Forest Camps', 'Rare Species'],
    imageUrl: '/images/trails/overa-aru-circuit.jpg',
    lastVerified: '2026-03-18'
  },

  // WETLAND TRAILS
  {
    id: 'hokersar-wetland-boardwalk',
    slug: 'hokersar-wetland-boardwalk',
    name: 'Hokersar Wetland Boardwalk',
    trailClass: 'wetland',
    category: 'wetland',
    district: ['Srinagar'],
    habitat: ['wetland', 'riparian'],
    altitudeBand: { min: 1585, max: 1590, unit: 'meters' },
    seasonWindow: {
      optimal: ['October', 'November', 'December', 'January', 'February', 'March'],
      accessible: ['April', 'May', 'September'],
      closed: [],
      reason: 'Peak migratory bird season in winter'
    },
    accessStatus: 'open',
    sensitivity: 'medium',
    sensitivityNotes: 'Ramsar site - no littering, maintain silence',
    permissions: {
      required: false,
      authority: 'Wetland Management Authority'
    },
    relatedSpecies: ['wetland-bird-group'],
    relatedWetland: 'hokersar-wetland',
    routeType: 'loop',
    difficulty: 'easy',
    length: { value: 3.2, unit: 'km' },
    duration: { min: 1, max: 2, unit: 'hours' },
    elevationGain: { value: 5, unit: 'meters' },
    routeCondition: {
      status: 'excellent',
      lastUpdated: '2026-03-22',
      notes: 'Well-maintained boardwalk with viewing hides'
    },
    observerActivity: {
      totalObservers: 456,
      activeThisMonth: 89,
      totalSightings: 2341,
      verifiedSightings: 892
    },
    description: 'Accessible boardwalk trail through Hokersar Wetland, a Ramsar site and critical habitat for migratory waterbirds. Best visited during winter months (October-March) when migratory populations peak.',
    features: ['Boardwalk', 'Bird Hides', 'Interpretive Center', 'Photography Blinds', 'Wheelchair Accessible'],
    imageUrl: '/images/trails/hokersar-boardwalk.jpg',
    lastVerified: '2026-03-22'
  },

  {
    id: 'shallabugh-crane-sanctuary-trail',
    slug: 'shallabugh-crane-sanctuary-trail',
    name: 'Shallabugh Crane Sanctuary Trail',
    trailClass: 'wetland',
    category: 'birding',
    district: ['Ganderbal'],
    habitat: ['wetland', 'riparian', 'agricultural'],
    altitudeBand: { min: 1590, max: 1600, unit: 'meters' },
    seasonWindow: {
      optimal: ['November', 'December', 'January', 'February'],
      accessible: ['October', 'March'],
      closed: [],
      reason: 'Sarus Crane wintering season'
    },
    accessStatus: 'restricted',
    sensitivity: 'high',
    sensitivityNotes: 'Critical crane habitat - guided tours only',
    permissions: {
      required: true,
      authority: 'Shallabugh Wetland Management Committee',
      process: 'Book guided tour in advance'
    },
    relatedSpecies: ['sarus-crane', 'wetland-bird-group'],
    relatedWetland: 'shallabugh-wetland',
    routeType: 'out-and-back',
    difficulty: 'easy',
    length: { value: 2.5, unit: 'km' },
    duration: { min: 1, max: 2, unit: 'hours' },
    elevationGain: { value: 10, unit: 'meters' },
    routeCondition: {
      status: 'good',
      lastUpdated: '2026-03-21',
      notes: 'Earthen trail with some muddy sections'
    },
    observerActivity: {
      totalObservers: 178,
      activeThisMonth: 45,
      totalSightings: 892,
      verifiedSightings: 456
    },
    description: 'Specialized birding trail through Shallabugh Wetland, famous for wintering Sarus Cranes. Access is restricted to guided tours to minimize disturbance to these magnificent birds.',
    features: ['Crane Viewing', 'Guided Tours', 'Wetland Ecology', 'Photography Opportunities'],
    imageUrl: '/images/trails/shallabugh-crane-trail.jpg',
    lastVerified: '2026-03-21'
  },

  // BIRDING TRAILS
  {
    id: 'manasbal-lake-birding-circuit',
    slug: 'manasbal-lake-birding-circuit',
    name: 'Manasbal Lake Birding Circuit',
    trailClass: 'flagship',
    category: 'birding',
    district: ['Ganderbal'],
    habitat: ['wetland', 'riparian', 'oak-forest'],
    altitudeBand: { min: 1583, max: 1650, unit: 'meters' },
    seasonWindow: {
      optimal: ['September', 'October', 'November', 'March', 'April'],
      accessible: ['December', 'January', 'February', 'May', 'August'],
      closed: ['June', 'July'],
      reason: 'Monsoon access restrictions'
    },
    accessStatus: 'open',
    sensitivity: 'medium',
    sensitivityNotes: 'Respect nesting areas during breeding season',
    permissions: {
      required: false,
      authority: 'Manasbal Lake Development Authority'
    },
    relatedSpecies: ['wetland-bird-group', 'himalayan-monals'],
    routeType: 'circuit',
    difficulty: 'moderate',
    length: { value: 6.8, unit: 'km' },
    duration: { min: 3, max: 4, unit: 'hours' },
    elevationGain: { value: 120, unit: 'meters' },
    routeCondition: {
      status: 'good',
      lastUpdated: '2026-03-19',
      notes: 'Lakeside path with some uneven sections'
    },
    observerActivity: {
      totalObservers: 312,
      activeThisMonth: 67,
      totalSightings: 1456,
      verifiedSightings: 623
    },
    description: 'Comprehensive birding circuit around Manasbal Lake, known as the "Birdwatcher\'s Paradise" of Kashmir. Excellent for both resident and migratory species, with over 200 bird species recorded.',
    features: ['Lake Circuit', 'Bird Hides', 'Photography Points', 'Boat Access', 'Interpretive Signage'],
    imageUrl: '/images/trails/manasbal-birding.jpg',
    lastVerified: '2026-03-19'
  },

  // SEASONAL BLOOM TRAILS
  {
    id: 'tarsar-marsar-bloom-trek',
    slug: 'tarsar-marsar-bloom-trek',
    name: 'Tarsar-Marsar Bloom Trek',
    trailClass: 'seasonal',
    category: 'bloom',
    district: ['Anantnag'],
    habitat: ['alpine-meadow', 'temperate-forest'],
    altitudeBand: { min: 2400, max: 3800, unit: 'meters' },
    seasonWindow: {
      optimal: ['June', 'July', 'August'],
      accessible: ['May', 'September'],
      closed: ['October', 'November', 'December', 'January', 'February', 'March', 'April'],
      reason: 'Snow closure; peak bloom in summer'
    },
    accessStatus: 'open',
    sensitivity: 'medium',
    sensitivityNotes: 'Alpine meadows are fragile - stay on trail',
    permissions: {
      required: false,
      authority: 'Local Tourism Department'
    },
    relatedSpecies: ['alpine-flora-group'],
    relatedBloom: 'alpine-superbloom',
    routeType: 'point-to-point',
    difficulty: 'difficult',
    length: { value: 18, unit: 'km' },
    duration: { min: 2, max: 3, unit: 'hours' },
    elevationGain: { value: 1400, unit: 'meters' },
    routeCondition: {
      status: 'fair',
      lastUpdated: '2026-03-15',
      notes: 'High-altitude trek; weather-dependent access',
      hazards: ['Altitude sickness', 'Weather exposure', 'Stream crossings']
    },
    observerActivity: {
      totalObservers: 234,
      activeThisMonth: 12,
      totalSightings: 678,
      verifiedSightings: 234
    },
    description: 'Spectacular high-altitude bloom trek to Tarsar and Marsar alpine lakes. Best visited June-August when alpine meadows are carpeted with wildflowers including primulas, gentians, and rare endemic species.',
    features: ['Alpine Lakes', 'Wildflower Meadows', 'High-Altitude Trek', 'Camping Sites', 'Glacier Views'],
    imageUrl: '/images/trails/tarsar-marsar-bloom.jpg',
    lastVerified: '2026-03-15'
  },

  // HIGH-ALTITUDE TRAILS
  {
    id: 'kolahoi-glacier-expedition',
    slug: 'kolahoi-glacier-expedition',
    name: 'Kolahoi Glacier Expedition',
    trailClass: 'high-altitude',
    category: 'glacier-high-altitude',
    district: ['Anantnag'],
    habitat: ['glacial', 'alpine-meadow', 'rocky-slope'],
    altitudeBand: { min: 3000, max: 5425, unit: 'meters' },
    seasonWindow: {
      optimal: ['June', 'July', 'August', 'September'],
      accessible: ['May', 'October'],
      closed: ['November', 'December', 'January', 'February', 'March', 'April'],
      reason: 'Extreme winter conditions; glacier access'
    },
    accessStatus: 'restricted',
    sensitivity: 'high',
    sensitivityNotes: 'Technical glacier trek - experienced guides required',
    permissions: {
      required: true,
      authority: 'J&K Tourism Department + Local Guide Association',
      process: 'Certified guide mandatory; register at base camp'
    },
    relatedSpecies: ['himalayan-brown-bear', 'snow-leopard'],
    routeType: 'out-and-back',
    difficulty: 'technical',
    length: { value: 32, unit: 'km' },
    duration: { min: 4, max: 6, unit: 'hours' },
    elevationGain: { value: 2425, unit: 'meters' },
    routeCondition: {
      status: 'good',
      lastUpdated: '2026-03-10',
      notes: 'Glacier conditions variable; crampons and ice axe required',
      hazards: ['Crevasses', 'Avalanche risk', 'Altitude sickness', 'Extreme weather']
    },
    observerActivity: {
      totalObservers: 89,
      activeThisMonth: 8,
      totalSightings: 234,
      verifiedSightings: 89
    },
    description: 'Technical high-altitude expedition to Kolahoi Glacier, the "Goddess of Light" glacier feeding the Lidder River. This challenging trek requires mountaineering experience and proper equipment.',
    features: ['Glacier Trek', 'Technical Climbing', 'Base Camp', 'High-Altitude Ecology', 'Expedition Route'],
    imageUrl: '/images/trails/kolahoi-glacier.jpg',
    lastVerified: '2026-03-10'
  },

  // FOREST & MEADOW TRAILS
  {
    id: 'betaab-valley-meadow-walk',
    slug: 'betaab-valley-meadow-walk',
    name: 'Betaab Valley Meadow Walk',
    trailClass: 'flagship',
    category: 'forest-meadow',
    district: ['Anantnag'],
    habitat: ['alpine-meadow', 'coniferous-forest'],
    altitudeBand: { min: 2300, max: 2800, unit: 'meters' },
    seasonWindow: {
      optimal: ['May', 'June', 'July', 'August', 'September'],
      accessible: ['April', 'October'],
      closed: ['November', 'December', 'January', 'February', 'March', 'April'],
      reason: 'Snow closure'
    },
    accessStatus: 'open',
    sensitivity: 'low',
    permissions: {
      required: false,
      authority: 'Local Tourism Department'
    },
    relatedSpecies: ['himalayan-monals', 'marmot'],
    routeType: 'out-and-back',
    difficulty: 'easy',
    length: { value: 4.5, unit: 'km' },
    duration: { min: 2, max: 3, unit: 'hours' },
    elevationGain: { value: 250, unit: 'meters' },
    routeCondition: {
      status: 'excellent',
      lastUpdated: '2026-03-20',
      notes: 'Well-maintained path; family-friendly'
    },
    observerActivity: {
      totalObservers: 567,
      activeThisMonth: 123,
      totalSightings: 1234,
      verifiedSightings: 456
    },
    description: 'Scenic valley walk through lush alpine meadows surrounded by snow-capped peaks. Popular filming location and family-friendly destination with stunning views of the Lidder Valley.',
    features: ['Alpine Meadows', 'Valley Views', 'Photography', 'Family-Friendly', 'Picnic Areas'],
    imageUrl: '/images/trails/betaab-valley.jpg',
    lastVerified: '2026-03-20'
  },

  // SENSITIVE TRAILS
  {
    id: 'hirpora-markhor-sanctuary-trail',
    slug: 'hirpora-markhor-sanctuary-trail',
    name: 'Hirpora Markhor Sanctuary Trail',
    trailClass: 'sensitive',
    category: 'protected-area',
    district: ['Kupwara'],
    habitat: ['rocky-slope', 'coniferous-forest', 'alpine-meadow'],
    altitudeBand: { min: 2400, max: 4000, unit: 'meters' },
    seasonWindow: {
      optimal: ['May', 'June', 'September', 'October'],
      accessible: ['July', 'August'],
      closed: ['November', 'December', 'January', 'February', 'March', 'April'],
      reason: 'Breeding season and snow closure'
    },
    accessStatus: 'permit-required',
    sensitivity: 'critical',
    sensitivityNotes: 'Critical Markhor habitat - limited permits, no photography of animals',
    permissions: {
      required: true,
      authority: 'J&K Wildlife Protection Department',
      process: 'Special permit required; limited to 10 visitors per day'
    },
    relatedSpecies: ['markhor', 'himalayan-brown-bear'],
    relatedProtectedArea: 'hirpora-wildlife-sanctuary',
    routeType: 'out-and-back',
    difficulty: 'difficult',
    length: { value: 12, unit: 'km' },
    duration: { min: 5, max: 7, unit: 'hours' },
    elevationGain: { value: 900, unit: 'meters' },
    routeCondition: {
      status: 'fair',
      lastUpdated: '2026-03-12',
      notes: 'Rugged terrain; experienced hikers only',
      hazards: ['Steep slopes', 'Loose rocks', 'Weather exposure']
    },
    observerActivity: {
      totalObservers: 45,
      activeThisMonth: 6,
      totalSightings: 89,
      verifiedSightings: 34
    },
    description: 'Highly restricted sanctuary trail for observing the magnificent Markhor (world\'s largest wild goat) in its natural habitat. Access is strictly controlled to protect this vulnerable species.',
    features: ['Markhor Habitat', 'Restricted Access', 'Expert Guide Required', 'Conservation Focus'],
    imageUrl: '/images/trails/hirpora-markhor.jpg',
    lastVerified: '2026-03-12'
  },
];

// ============================================================================
// SIGHTING INTELLIGENCE DATA (Kashmir-Only)
// ============================================================================

export const sightingIntelligenceData: SightingIntelligence[] = [
  // MAMMAL SIGHTINGS
  {
    id: 'hangul-dachigam-001',
    slug: 'hangul-dachigam-001',
    speciesName: 'Hangul (Kashmir Stag)',
    speciesSlug: 'hangul',
    taxonomicGroup: 'mammals',
    category: 'wildlife-sightings',
    district: 'Srinagar',
    location: 'Dachigam National Park - Upper Region',
    habitat: 'temperate-forest',
    altitude: { value: 2400, unit: 'meters' },
    observationDate: '2026-03-26',
    season: 'spring',
    verificationStatus: 'verified',
    verifiedBy: 'Dr. A. Rashid',
    verificationDate: '2026-03-27',
    isSensitive: true,
    sensitivityReason: 'Critically endangered species - location obfuscated',
    observerType: 'expert',
    observerName: 'Dr. A. Rashid',
    observationMethod: 'visual',
    behaviorObserved: 'Grazing in forest clearing with herd of 5',
    groupSize: 5,
    habitatCondition: 'Excellent - pristine forest with good understory',
    associatedSpecies: ['himalayan-black-bear'],
    linkedTrail: 'dachigam-hangul-trail',
    linkedProtectedArea: 'dachigam-national-park',
    hasPhoto: true,
    photoCount: 8,
    hasAudio: false,
    hasVideo: true,
    confidenceLevel: 'high',
    notes: 'Adult male with impressive antlers; healthy condition',
    isKashmirOnly: true
  },

  {
    id: 'snow-leopard-kishtwar-001',
    slug: 'snow-leopard-kishtwar-001',
    speciesName: 'Snow Leopard',
    speciesSlug: 'snow-leopard',
    taxonomicGroup: 'mammals',
    category: 'wildlife-sightings',
    district: 'Kishtwar',
    location: 'Kishtwar National Park - High Valley',
    habitat: 'high-altitude-desert',
    altitude: { value: 4200, unit: 'meters' },
    observationDate: '2026-03-24',
    season: 'spring',
    verificationStatus: 'reviewed',
    verifiedBy: 'Field Team Alpha',
    isSensitive: true,
    sensitivityReason: 'Vulnerable species - precise location masked',
    observerType: 'field-team',
    observerName: 'Field Team Alpha',
    observationMethod: 'camera-trap',
    behaviorObserved: 'Solitary individual moving through valley',
    groupSize: 1,
    habitatCondition: 'Good - typical high-altitude terrain',
    linkedProtectedArea: 'kishtwar-national-park',
    hasPhoto: true,
    photoCount: 12,
    hasAudio: false,
    hasVideo: false,
    confidenceLevel: 'high',
    notes: 'Clear camera trap images; adult individual',
    isKashmirOnly: true
  },

  {
    id: 'markhor-kupwara-001',
    slug: 'markhor-kupwara-001',
    speciesName: 'Markhor',
    speciesSlug: 'markhor',
    taxonomicGroup: 'mammals',
    category: 'wildlife-sightings',
    district: 'Kupwara',
    location: 'Hirpora Wildlife Sanctuary',
    habitat: 'rocky-slope',
    altitude: { value: 3200, unit: 'meters' },
    observationDate: '2026-03-22',
    season: 'spring',
    verificationStatus: 'verified',
    verifiedBy: 'Wildlife Warden Kupwara',
    verificationDate: '2026-03-23',
    isSensitive: true,
    sensitivityReason: 'Vulnerable species in restricted area',
    observerType: 'field-team',
    observerName: 'Range Officer',
    observationMethod: 'visual',
    behaviorObserved: 'Group of males on rocky outcrop',
    groupSize: 7,
    habitatCondition: 'Excellent - undisturbed habitat',
    linkedTrail: 'hirpora-markhor-sanctuary-trail',
    linkedProtectedArea: 'hirpora-wildlife-sanctuary',
    hasPhoto: true,
    photoCount: 5,
    hasAudio: false,
    hasVideo: false,
    confidenceLevel: 'high',
    notes: 'Impressive horn development in dominant male',
    isKashmirOnly: true
  },

  {
    id: 'himalayan-monal-anantnag-001',
    slug: 'himalayan-monal-anantnag-001',
    speciesName: 'Himalayan Monal',
    speciesSlug: 'himalayan-monals',
    taxonomicGroup: 'birds',
    category: 'bird-sightings',
    district: 'Anantnag',
    location: 'Overa-Aru Wildlife Sanctuary',
    habitat: 'alpine-meadow',
    altitude: { value: 3100, unit: 'meters' },
    observationDate: '2026-03-25',
    season: 'spring',
    verificationStatus: 'verified',
    verifiedBy: 'Bird Conservation Society',
    verificationDate: '2026-03-26',
    isSensitive: false,
    observerType: 'citizen-scientist',
    observerName: 'Citizen Scientist',
    observationMethod: 'visual',
    behaviorObserved: 'Male displaying in meadow',
    groupSize: 2,
    habitatCondition: 'Good - alpine meadow with flowering plants',
    linkedTrail: 'overa-aru-wildlife-circuit',
    linkedProtectedArea: 'overa-aru-wildlife-sanctuary',
    hasPhoto: true,
    photoCount: 15,
    hasAudio: false,
    hasVideo: true,
    confidenceLevel: 'high',
    notes: 'Stunning male in breeding plumage',
    isKashmirOnly: true
  },

  // BIRD SIGHTINGS
  {
    id: 'western-tragopan-anantnag-001',
    slug: 'western-tragopan-anantnag-001',
    speciesName: 'Western Tragopan',
    speciesSlug: 'western-tragopan',
    taxonomicGroup: 'birds',
    category: 'bird-sightings',
    district: 'Anantnag',
    location: 'Overa-Aru Wildlife Sanctuary - Oak Forest',
    habitat: 'oak-forest',
    altitude: { value: 2800, unit: 'meters' },
    observationDate: '2026-03-23',
    season: 'spring',
    verificationStatus: 'verified',
    verifiedBy: 'Dr. S. Ahmed',
    verificationDate: '2026-03-24',
    isSensitive: true,
    sensitivityReason: 'Vulnerable pheasant - disturbance risk',
    observerType: 'expert',
    observerName: 'Dr. S. Ahmed',
    observationMethod: 'visual',
    behaviorObserved: 'Male calling from tree perch',
    groupSize: 1,
    habitatCondition: 'Excellent - mature oak forest',
    linkedTrail: 'overa-aru-wildlife-circuit',
    linkedProtectedArea: 'overa-aru-wildlife-sanctuary',
    hasPhoto: true,
    photoCount: 6,
    hasAudio: true,
    hasVideo: false,
    confidenceLevel: 'high',
    notes: 'Rare sighting; beautiful male in full breeding coloration',
    isKashmirOnly: true
  },

  {
    id: 'sarus-crane-ganderbal-001',
    slug: 'sarus-crane-ganderbal-001',
    speciesName: 'Sarus Crane',
    speciesSlug: 'sarus-crane',
    taxonomicGroup: 'birds',
    category: 'bird-sightings',
    district: 'Ganderbal',
    location: 'Shallabugh Wetland',
    habitat: 'wetland',
    altitude: { value: 1595, unit: 'meters' },
    observationDate: '2026-03-20',
    season: 'spring',
    verificationStatus: 'verified',
    verifiedBy: 'Wetland Management Authority',
    verificationDate: '2026-03-21',
    isSensitive: false,
    observerType: 'field-team',
    observerName: 'Wetland Ranger',
    observationMethod: 'visual',
    behaviorObserved: 'Pair performing courtship dance',
    groupSize: 2,
    habitatCondition: 'Good - wetland in favorable condition',
    linkedTrail: 'shallabugh-crane-sanctuary-trail',
    linkedWetland: 'shallabugh-wetland',
    hasPhoto: true,
    photoCount: 20,
    hasAudio: false,
    hasVideo: true,
    confidenceLevel: 'high',
    notes: 'Spectacular courtship display; successful wintering population',
    isKashmirOnly: true
  },

  {
    id: 'wetland-birds-hokersar-001',
    slug: 'wetland-birds-hokersar-001',
    speciesName: 'Northern Pintail',
    speciesSlug: 'northern-pintail',
    taxonomicGroup: 'birds',
    category: 'bird-sightings',
    district: 'Srinagar',
    location: 'Hokersar Wetland',
    habitat: 'wetland',
    altitude: { value: 1587, unit: 'meters' },
    observationDate: '2026-03-21',
    season: 'spring',
    verificationStatus: 'community',
    isSensitive: false,
    observerType: 'citizen-scientist',
    observationMethod: 'visual',
    behaviorObserved: 'Flock feeding in shallow water',
    groupSize: 47,
    habitatCondition: 'Good',
    linkedTrail: 'hokersar-wetland-boardwalk',
    linkedWetland: 'hokersar-wetland',
    hasPhoto: true,
    photoCount: 8,
    hasAudio: false,
    hasVideo: false,
    confidenceLevel: 'high',
    notes: 'Large flock preparing for spring migration',
    isKashmirOnly: true
  },

  // PLANT SIGHTINGS
  {
    id: 'aconitum-kishtwar-001',
    slug: 'aconitum-kishtwar-001',
    speciesName: 'Atees (Aconitum heterophyllum)',
    speciesSlug: 'aconitum-heterophyllum',
    taxonomicGroup: 'medicinal-plants',
    category: 'plant-phenology-sightings',
    district: 'Kishtwar',
    location: 'Kishtwar National Park - Alpine Meadow',
    habitat: 'alpine-meadow',
    altitude: { value: 3400, unit: 'meters' },
    observationDate: '2026-03-18',
    season: 'spring',
    verificationStatus: 'verified',
    verifiedBy: 'Botanical Survey Team',
    verificationDate: '2026-03-19',
    isSensitive: true,
    sensitivityReason: 'Endangered medicinal plant - overharvesting risk',
    observerType: 'expert',
    observerName: 'Dr. F. Hassan',
    observationMethod: 'visual',
    behaviorObserved: 'Small population flowering',
    groupSize: 23,
    habitatCondition: 'Good - protected area',
    linkedProtectedArea: 'kishtwar-national-park',
    hasPhoto: true,
    photoCount: 10,
    hasAudio: false,
    hasVideo: false,
    confidenceLevel: 'high',
    notes: 'Healthy population; monitoring for conservation',
    isKashmirOnly: true
  },

  // COMMUNITY SIGHTINGS
  {
    id: 'himalayan-bear-anantnag-001',
    slug: 'himalayan-bear-anantnag-001',
    speciesName: 'Himalayan Black Bear',
    speciesSlug: 'himalayan-black-bear',
    taxonomicGroup: 'mammals',
    category: 'wildlife-sightings',
    district: 'Anantnag',
    location: 'Forest Area near Kokernag',
    habitat: 'temperate-forest',
    altitude: { value: 2100, unit: 'meters' },
    observationDate: '2026-03-19',
    season: 'spring',
    verificationStatus: 'reviewed',
    isSensitive: false,
    observerType: 'citizen-scientist',
    observationMethod: 'visual',
    behaviorObserved: 'Foraging for roots and grubs',
    groupSize: 1,
    habitatCondition: 'Fair - some human disturbance',
    hasPhoto: true,
    photoCount: 3,
    hasAudio: false,
    hasVideo: false,
    confidenceLevel: 'medium',
    notes: 'Bear emerging from hibernation; healthy condition',
    isKashmirOnly: true
  },

  {
    id: 'musk-deer-kishtwar-001',
    slug: 'musk-deer-kishtwar-001',
    speciesName: 'Himalayan Musk Deer',
    speciesSlug: 'musk-deer',
    taxonomicGroup: 'mammals',
    category: 'wildlife-sightings',
    district: 'Kishtwar',
    location: 'High Altitude Forest',
    habitat: 'temperate-forest',
    altitude: { value: 3200, unit: 'meters' },
    observationDate: '2026-03-17',
    season: 'spring',
    verificationStatus: 'pending',
    isSensitive: true,
    sensitivityReason: 'Endangered species - poaching risk',
    observerType: 'citizen-scientist',
    observationMethod: 'track',
    behaviorObserved: 'Tracks and scat found',
    groupSize: 1,
    habitatCondition: 'Excellent',
    hasPhoto: true,
    photoCount: 4,
    hasAudio: false,
    hasVideo: false,
    confidenceLevel: 'medium',
    notes: 'Awaiting expert verification; signs suggest recent presence',
    isKashmirOnly: true
  },
];

// ============================================================================
// SIGHTING AGGREGATIONS
// ============================================================================

export const sightingAggregations: SightingAggregation[] = [
  {
    categoryId: 'wildlife-sightings',
    title: 'Wildlife Sightings',
    totalCount: 1247,
    verifiedCount: 423,
    reviewedCount: 234,
    communityCount: 512,
    pendingCount: 78,
    byDistrict: {
      'Srinagar': 234,
      'Anantnag': 312,
      'Kishtwar': 189,
      'Kupwara': 145,
      'Ganderbal': 178,
      'Baramulla': 89,
      'Doda': 67,
      'Poonch': 33
    },
    bySeason: {
      'spring': 423,
      'summer': 512,
      'autumn': 234,
      'winter': 78
    },
    byHabitat: {
      'temperate-forest': 456,
      'alpine-meadow': 234,
      'coniferous-forest': 189,
      'rocky-slope': 145,
      'high-altitude-desert': 89,
      'oak-forest': 134
    },
    highValueRecords: [
      {
        species: 'Hangul (Kashmir Stag)',
        location: 'Dachigam National Park',
        district: 'Srinagar',
        date: '2026-03-26',
        significance: 'Rare herd sighting with adult male'
      },
      {
        species: 'Snow Leopard',
        location: 'Kishtwar National Park',
        district: 'Kishtwar',
        date: '2026-03-24',
        significance: 'Camera trap confirmation in high valley'
      },
      {
        species: 'Markhor',
        location: 'Hirpora Wildlife Sanctuary',
        district: 'Kupwara',
        date: '2026-03-22',
        significance: 'Group of 7 males observed'
      }
    ],
    recentVerified: sightingIntelligenceData.filter(
      s => s.taxonomicGroup === 'mammals' && s.verificationStatus === 'verified'
    ).slice(0, 5)
  },
  
  {
    categoryId: 'bird-sightings',
    title: 'Bird Sightings',
    totalCount: 3542,
    verifiedCount: 1234,
    reviewedCount: 892,
    communityCount: 1289,
    pendingCount: 127,
    byDistrict: {
      'Srinagar': 892,
      'Ganderbal': 678,
      'Anantnag': 534,
      'Baramulla': 423,
      'Kishtwar': 312,
      'Kupwara': 289,
      'Budgam': 234,
      'Bandipora': 180
    },
    bySeason: {
      'spring': 1234,
      'summer': 892,
      'autumn': 892,
      'winter': 524
    },
    byHabitat: {
      'wetland': 1456,
      'temperate-forest': 892,
      'alpine-meadow': 534,
      'oak-forest': 423,
      'riparian': 237
    },
    highValueRecords: [
      {
        species: 'Western Tragopan',
        location: 'Overa-Aru Wildlife Sanctuary',
        district: 'Anantnag',
        date: '2026-03-23',
        significance: 'Rare male sighting in breeding plumage'
      },
      {
        species: 'Sarus Crane',
        location: 'Shallabugh Wetland',
        district: 'Ganderbal',
        date: '2026-03-20',
        significance: 'Courtship dance observed'
      },
      {
        species: 'Kashmir Flycatcher',
        location: 'Dachigam National Park',
        district: 'Srinagar',
        date: '2026-03-15',
        significance: 'Endemic species spring arrival'
      }
    ],
    recentVerified: sightingIntelligenceData.filter(
      s => s.taxonomicGroup === 'birds' && s.verificationStatus === 'verified'
    ).slice(0, 5)
  },
  
  {
    categoryId: 'plant-phenology-sightings',
    title: 'Plant & Phenology Sightings',
    totalCount: 892,
    verifiedCount: 312,
    reviewedCount: 234,
    communityCount: 289,
    pendingCount: 57,
    byDistrict: {
      'Anantnag': 234,
      'Kishtwar': 189,
      'Srinagar': 156,
      'Kulgam': 123,
      'Doda': 89,
      'Kupwara': 101
    },
    bySeason: {
      'spring': 423,
      'summer': 312,
      'autumn': 123,
      'winter': 34
    },
    byHabitat: {
      'alpine-meadow': 312,
      'temperate-forest': 234,
      'oak-forest': 156,
      'coniferous-forest': 190
    },
    highValueRecords: [
      {
        species: 'Atees (Aconitum)',
        location: 'Kishtwar National Park',
        district: 'Kishtwar',
        date: '2026-03-18',
        significance: 'Endangered medicinal plant population monitoring'
      },
      {
        species: 'Alpine Primula',
        location: 'Tarsar-Marsar',
        district: 'Anantnag',
        date: '2026-03-10',
        significance: 'Early bloom recorded; climate indicator'
      }
    ],
    recentVerified: sightingIntelligenceData.filter(
      s => s.taxonomicGroup === 'medicinal-plants' && s.verificationStatus === 'verified'
    ).slice(0, 5)
  },
  
  {
    categoryId: 'aquatic-wetland-sightings',
    title: 'Aquatic & Wetland Sightings',
    totalCount: 456,
    verifiedCount: 178,
    reviewedCount: 123,
    communityCount: 134,
    pendingCount: 21,
    byDistrict: {
      'Srinagar': 156,
      'Ganderbal': 123,
      'Anantnag': 89,
      'Baramulla': 67,
      'Budgam': 21
    },
    bySeason: {
      'spring': 134,
      'summer': 156,
      'autumn': 112,
      'winter': 54
    },
    byHabitat: {
      'wetland': 234,
      'riparian': 123,
      'riverine': 99
    },
    highValueRecords: [
      {
        species: 'Brown Trout',
        location: 'Lidder River',
        district: 'Anantnag',
        date: '2026-03-16',
        significance: 'Spawning run observed'
      },
      {
        species: 'Wetland Macrophytes',
        location: 'Hokersar Wetland',
        district: 'Srinagar',
        date: '2026-03-14',
        significance: 'Aquatic vegetation health assessment'
      }
    ],
    recentVerified: sightingIntelligenceData.filter(
      s => s.habitat === 'wetland' && s.verificationStatus === 'verified'
    ).slice(0, 5)
  },
  
  {
    categoryId: 'trail-field-records',
    title: 'Trail Field Records',
    totalCount: 2183,
    verifiedCount: 892,
    reviewedCount: 534,
    communityCount: 678,
    pendingCount: 79,
    byDistrict: {
      'Srinagar': 456,
      'Anantnag': 389,
      'Ganderbal': 312,
      'Baramulla': 267,
      'Kupwara': 234,
      'Kishtwar': 189,
      'Budgam': 156,
      'Doda': 180
    },
    bySeason: {
      'spring': 678,
      'summer': 892,
      'autumn': 456,
      'winter': 157
    },
    byHabitat: {
      'temperate-forest': 534,
      'alpine-meadow': 423,
      'coniferous-forest': 389,
      'wetland': 267,
      'rocky-slope': 234,
      'oak-forest': 336
    },
    highValueRecords: [
      {
        species: 'Trail Condition Report',
        location: 'Kolahoi Glacier Route',
        district: 'Anantnag',
        date: '2026-03-25',
        significance: 'Pre-season condition assessment'
      },
      {
        species: 'Weather Observation',
        location: 'Betaab Valley',
        district: 'Anantnag',
        date: '2026-03-24',
        significance: 'Unseasonal snowfall recorded'
      }
    ],
    recentVerified: sightingIntelligenceData.filter(
      s => s.verificationStatus === 'verified'
    ).slice(0, 5)
  }
];

// ============================================================================
// SEASONAL WINDOWS
// ============================================================================

export const seasonalWindows: SeasonalWindow[] = [
  {
    id: 'spring-bloom',
    name: 'Spring Bloom Season',
    months: ['March', 'April', 'May'],
    description: 'Prime wildflower season with alpine and valley blooms. Excellent for phenology observations and photography.',
    associatedTrails: ['tarsar-marsar-bloom-trek', 'betaab-valley-meadow-walk'],
    associatedEvents: ['alpine-superbloom', 'orchid-bloom'],
    accessConditions: {
      status: 'optimal',
      notes: 'Most trails accessible; high-altitude routes may have residual snow'
    }
  },
  {
    id: 'summer-high-altitude',
    name: 'Summer High-Altitude Season',
    months: ['June', 'July', 'August'],
    description: 'Best window for high-altitude treks and glacier expeditions. Alpine meadows at peak productivity.',
    associatedTrails: ['kolahoi-glacier-expedition', 'tarsar-marsar-bloom-trek', 'overa-aru-wildlife-circuit'],
    associatedEvents: ['alpine-superbloom', 'butterfly-migration'],
    accessConditions: {
      status: 'optimal',
      notes: 'All trails open; book permits early for popular routes'
    }
  },
  {
    id: 'autumn-wildlife',
    name: 'Autumn Wildlife Season',
    months: ['September', 'October', 'November'],
    description: 'Rutting season for Hangul and other ungulates. Excellent wildlife viewing opportunities.',
    associatedTrails: ['dachigam-hangul-trail', 'overa-aru-wildlife-circuit'],
    associatedEvents: ['hangul-rut', 'autumn-migration'],
    accessConditions: {
      status: 'good',
      notes: 'Excellent conditions; some high passes close by November'
    }
  },
  {
    id: 'winter-wetlands',
    name: 'Winter Wetland Season',
    months: ['December', 'January', 'February'],
    description: 'Peak migratory waterbird season. Best time for wetland birding and crane observations.',
    associatedTrails: ['hokersar-wetland-boardwalk', 'shallabugh-crane-sanctuary-trail', 'manasbal-lake-birding-circuit'],
    associatedEvents: ['crane-wintering', 'duck-migration'],
    accessConditions: {
      status: 'good',
      notes: 'Wetland trails accessible; carry warm clothing; some high-altitude trails closed'
    }
  }
];

// ============================================================================
// METRICS
// ============================================================================

export const trailsSightingsMetrics = {
  // Trail Metrics
  totalTrails: 156,
  trailsByCategory: {
    hiking: 47,
    eco: 23,
    birding: 18,
    wetland: 15,
    bloom: 12,
    'forest-meadow': 31,
    'glacier-high-altitude': 8,
    'protected-area': 34
  },
  trailsByClass: {
    flagship: 23,
    sensitive: 12,
    wetland: 15,
    seasonal: 18,
    'protected-area': 34,
    'high-altitude': 8
  },
  totalTrailLength: 1247, // km
  averageDifficulty: 'moderate',
  
  // Sighting Metrics
  totalSightings: 2847,
  sightingsByTaxonomicGroup: {
    mammals: 1247,
    birds: 3542,
    fish: 234,
    plants: 892,
    'medicinal-plants': 156,
    amphibians: 89,
    reptiles: 67
  },
  verifiedSightings: 1234,
  reviewedSightings: 892,
  communitySightings: 678,
  pendingSightings: 43,
  
  // Observer Metrics
  activeObservers: 423,
  newObserversThisMonth: 34,
  expertObservers: 67,
  fieldTeams: 23,
  citizenScientists: 333,
  
  // Monthly Activity
  sightingsThisMonth: 189,
  trailsVerifiedThisMonth: 12,
  newSpeciesThisMonth: 8,
  
  // Geographic Distribution
  districtsActive: 16,
  protectedAreasCovered: 12,
  wetlandsMonitored: 8
};

// ============================================================================
// DATA ACCESS FUNCTIONS
// ============================================================================

export const getTrailsData = {
  all: () => trailIntelligenceData,
  
  bySlug: (slug: string): TrailIntelligence | undefined => 
    trailIntelligenceData.find(t => t.slug === slug),
  
  byCategory: (category: TrailCategory): TrailIntelligence[] => 
    trailIntelligenceData.filter(t => t.category === category),
  
  byClass: (trailClass: TrailClass): TrailIntelligence[] => 
    trailIntelligenceData.filter(t => t.trailClass === trailClass),
  
  byDistrict: (district: KashmirDistrict): TrailIntelligence[] => 
    trailIntelligenceData.filter(t => t.district.includes(district)),
  
  byHabitat: (habitat: HabitatType): TrailIntelligence[] => 
    trailIntelligenceData.filter(t => t.habitat.includes(habitat)),
  
  byAccessStatus: (status: AccessStatus): TrailIntelligence[] => 
    trailIntelligenceData.filter(t => t.accessStatus === status),
  
  byDifficulty: (difficulty: Difficulty): TrailIntelligence[] => 
    trailIntelligenceData.filter(t => t.difficulty === difficulty),
  
  bySensitivity: (sensitivity: SensitivityLevel): TrailIntelligence[] => 
    trailIntelligenceData.filter(t => t.sensitivity === sensitivity),
  
  byRelatedProtectedArea: (paSlug: string): TrailIntelligence[] => 
    trailIntelligenceData.filter(t => t.relatedProtectedArea === paSlug),
  
  byRelatedSpecies: (speciesSlug: string): TrailIntelligence[] => 
    trailIntelligenceData.filter(t => t.relatedSpecies.includes(speciesSlug)),
  
  bySeasonWindow: (month: string): TrailIntelligence[] => 
    trailIntelligenceData.filter(t => 
      t.seasonWindow.accessible.includes(month) || 
      t.seasonWindow.optimal.includes(month)
    ),
  
  openTrails: () => 
    trailIntelligenceData.filter(t => t.accessStatus === 'open'),
  
  flagshipTrails: () => 
    trailIntelligenceData.filter(t => t.trailClass === 'flagship'),
};

export const getSightingsData = {
  all: () => sightingIntelligenceData,
  
  bySlug: (slug: string): SightingIntelligence | undefined => 
    sightingIntelligenceData.find(s => s.slug === slug),
  
  byTaxonomicGroup: (group: TaxonomicGroup): SightingIntelligence[] => 
    sightingIntelligenceData.filter(s => s.taxonomicGroup === group),
  
  byDistrict: (district: KashmirDistrict): SightingIntelligence[] => 
    sightingIntelligenceData.filter(s => s.district === district),
  
  byHabitat: (habitat: HabitatType): SightingIntelligence[] => 
    sightingIntelligenceData.filter(s => s.habitat === habitat),
  
  byVerificationStatus: (status: VerificationStatus): SightingIntelligence[] => 
    sightingIntelligenceData.filter(s => s.verificationStatus === status),
  
  bySeason: (season: Season): SightingIntelligence[] => 
    sightingIntelligenceData.filter(s => s.season === season),
  
  byObserverType: (type: ObserverType): SightingIntelligence[] => 
    sightingIntelligenceData.filter(s => s.observerType === type),
  
  kashmirOnly: (): SightingIntelligence[] => 
    sightingIntelligenceData.filter(s => s.isKashmirOnly),
  
  verified: (): SightingIntelligence[] => 
    sightingIntelligenceData.filter(s => s.verificationStatus === 'verified'),
  
  sensitive: (): SightingIntelligence[] => 
    sightingIntelligenceData.filter(s => s.isSensitive),
  
  recent: (limit: number = 10): SightingIntelligence[] => 
    sightingIntelligenceData
      .filter(s => s.isKashmirOnly)
      .sort((a, b) => new Date(b.observationDate).getTime() - new Date(a.observationDate).getTime())
      .slice(0, limit),
  
  highValue: (): SightingIntelligence[] => 
    sightingIntelligenceData.filter(s => 
      s.isSensitive || 
      ['hangul', 'snow-leopard', 'markhor', 'western-tragopan', 'kashmir-flycatcher'].includes(s.speciesSlug)
    ),
  
  byLinkedTrail: (trailSlug: string): SightingIntelligence[] => 
    sightingIntelligenceData.filter(s => s.linkedTrail === trailSlug),
  
  byLinkedProtectedArea: (paSlug: string): SightingIntelligence[] => 
    sightingIntelligenceData.filter(s => s.linkedProtectedArea === paSlug),
  
  withMedia: (): SightingIntelligence[] => 
    sightingIntelligenceData.filter(s => s.hasPhoto || s.hasVideo || s.hasAudio),
};

export const getAggregationsData = {
  all: () => sightingAggregations,
  
  byCategoryId: (categoryId: string): SightingAggregation | undefined => 
    sightingAggregations.find(a => a.categoryId === categoryId),
  
  verified: (): SightingAggregation[] => 
    sightingAggregations.filter(a => a.verifiedCount > 0),
  
  byDistrict: (district: KashmirDistrict): number => 
    sightingAggregations.reduce((sum, agg) => sum + (agg.byDistrict[district] || 0), 0),
  
  bySeason: (season: Season): number => 
    sightingAggregations.reduce((sum, agg) => sum + (agg.bySeason[season] || 0), 0),
  
  highValueRecords: () => 
    sightingAggregations.flatMap(a => a.highValueRecords),
};

export const getSeasonalWindows = {
  all: () => seasonalWindows,
  
  byMonth: (month: string): SeasonalWindow[] => 
    seasonalWindows.filter(w => w.months.includes(month)),
  
  current: (): SeasonalWindow | undefined => {
    const currentMonth = new Date().toLocaleString('default', { month: 'long' });
    return seasonalWindows.find(w => w.months.includes(currentMonth));
  },
  
  byStatus: (status: 'optimal' | 'good' | 'fair' | 'poor' | 'closed'): SeasonalWindow[] => 
    seasonalWindows.filter(w => w.accessConditions.status === status),
};

export const getMetrics = () => trailsSightingsMetrics;

// ============================================================================
// KASHMIR VALIDATION UTILITIES
// ============================================================================

export const kashmirValidation = {
  isKashmirDistrict: (district: string): district is KashmirDistrict => 
    KASHMIR_DISTRICTS.includes(district as KashmirDistrict),
  
  isValidCoordinates: (lat: number, lng: number): boolean => 
    lat >= KASHMIR_GEOGRAPHIC_BOUNDS.south &&
    lat <= KASHMIR_GEOGRAPHIC_BOUNDS.north &&
    lng >= KASHMIR_GEOGRAPHIC_BOUNDS.west &&
    lng <= KASHMIR_GEOGRAPHIC_BOUNDS.east,
  
  validateLocation: (location: { lat: number; lng: number }): boolean => 
    kashmirValidation.isValidCoordinates(location.lat, location.lng),
  
  // Obfuscate coordinates for sensitive species
  obfuscateCoordinates: (
    coords: { lat: number; lng: number },
    sensitivity: SensitivityLevel
  ): { lat: number; lng: number } => {
    const obfuscationRadius = {
      low: 0,
      medium: 0.001,    // ~100m
      high: 0.01,       // ~1km
      critical: 0.05    // ~5km (district-level)
    };
    
    const radius = obfuscationRadius[sensitivity];
    if (radius === 0) return coords;
    
    // Add random offset within radius
    const offsetLat = (Math.random() - 0.5) * 2 * radius;
    const offsetLng = (Math.random() - 0.5) * 2 * radius;
    
    return {
      lat: coords.lat + offsetLat,
      lng: coords.lng + offsetLng
    };
  },
  
  // Get district from coordinates (simplified)
  getDistrictFromCoords: (lat: number, lng: number): KashmirDistrict | null => {
    // Simplified district boundary logic
    // In production, use proper GIS boundary lookup
    if (lat > 34.0 && lat < 34.3 && lng > 74.7 && lng < 75.0) return 'Srinagar';
    if (lat > 33.5 && lat < 34.0 && lng > 75.0 && lng < 75.5) return 'Anantnag';
    if (lat > 33.0 && lat < 33.5 && lng > 75.5 && lng < 76.0) return 'Kishtwar';
    // ... add more districts as needed
    return null;
  }
};
