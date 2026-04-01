// Trails & Sightings Intelligence Functions
// Enhanced ecological access and field intelligence

import type {
  TrailIntelligence,
  SightingIntelligence,
  VerificationStatus,
  ObserverType,
  KashmirDistrict,
  HabitatType,
} from './trails-sightings';

import { getTrailsData, getSightingsData } from './trails-sightings';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type TrailCondition = 'excellent' | 'good' | 'fair' | 'poor' | 'hazardous';

export type HazardType = 
  | 'steep' 
  | 'loose-rocks' 
  | 'exposure' 
  | 'water-crossing' 
  | 'wildlife' 
  | 'snow' 
  | 'ice' 
  | 'avalanche' 
  | 'crevasse';

export type HazardSeverity = 'low' | 'moderate' | 'high' | 'critical';

export type AnomalyType = 
  | 'range-extension' 
  | 'first-district' 
  | 'critically-endangered' 
  | 'phenology-anomaly' 
  | 'unusual-behavior' 
  | 'climate-indicator';

export type ObserverLevel = 'novice' | 'active' | 'expert' | 'master';

export interface TrailConditionReport {
  id: string;
  trailSlug: string;
  reportedBy: string;
  reportedDate: string;
  condition: {
    overall: TrailCondition;
    surface: 'dry' | 'muddy' | 'snow-covered' | 'rocky' | 'vegetated';
    visibility: 'clear' | 'moderate' | 'poor' | 'obstructed';
    infrastructure: 'intact' | 'damaged' | 'missing';
  };
  hazards: {
    type: HazardType;
    severity: HazardSeverity;
    location: string;
    description: string;
  }[];
  photos?: {
    url: string;
    caption: string;
    timestamp: string;
  }[];
  maintenance: {
    needed: boolean;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    description: string;
  };
  verified: boolean;
  verifiedBy?: string;
  verificationDate?: string;
}

export interface ObserverProfile {
  id: string;
  name: string;
  type: ObserverType;
  joinedDate: string;
  stats: {
    totalSightings: number;
    verifiedSightings: number;
    speciesIdentified: number;
    districtsVisited: number;
    trailsVisited: number;
    contributionStreak: number;
    lastActive: string;
  };
  expertise: {
    taxonomicGroups: string[];
    districts: string[];
    speciesSpecialties: string[];
  };
  recognition: {
    level: ObserverLevel;
    badges: string[];
    verificationsContributed: number;
  };
}

export interface AnomalyRecord {
  id: string;
  sightingSlug: string;
  anomalyType: AnomalyType;
  speciesName: string;
  district: string;
  observationDate: string;
  anomalyDetails: {
    expectedRange: string;
    observedLocation: string;
    deviationKm?: number;
    significance: 'moderate' | 'high' | 'critical';
  };
  expertReview?: {
    reviewedBy: string;
    reviewDate: string;
    assessment: 'confirmed' | 'questionable' | 'misidentification';
    notes: string;
  };
  alertSent: boolean;
  published: boolean;
}

export interface FieldNote {
  id: string;
  slug: string;
  title: string;
  linkedTrail?: string;
  linkedSighting?: string;
  linkedDistrict?: string;
  author: {
    name: string;
    type: ObserverType;
  };
  content: {
    narrative: string;
    structuredData?: {
      weather: string;
      temperature?: number;
      habitat?: string;
      speciesCount?: number;
      behavior?: string;
    };
  };
  media: {
    photos: { url: string; caption: string }[];
    audio: { url: string; caption: string }[];
  };
  location: {
    lat: number;
    lng: number;
    elevation: number;
  };
  timestamp: string;
  visibility: 'public' | 'private' | 'research-only';
}

// ============================================================================
// TRAIL CONDITION REPORTING
// ============================================================================

const trailConditionReports: TrailConditionReport[] = [
  {
    id: 'tcr-001',
    trailSlug: 'dachigam-hangul-trail',
    reportedBy: 'field-team-1',
    reportedDate: '2024-03-15',
    condition: {
      overall: 'good',
      surface: 'dry',
      visibility: 'clear',
      infrastructure: 'intact',
    },
    hazards: [
      { type: 'steep', severity: 'moderate', location: 'Km 2.5', description: 'Steep ascent with loose rocks' },
    ],
    photos: [
      { url: '/photos/trail-condition-1.jpg', caption: 'Trail condition at Km 2', timestamp: '2024-03-15' },
    ],
    maintenance: {
      needed: true,
      priority: 'medium',
      description: 'Trail markers need replacement at junction',
    },
    verified: true,
    verifiedBy: 'ranger-srinagar',
    verificationDate: '2024-03-16',
  },
  {
    id: 'tcr-002',
    trailSlug: 'hokersar-wetland-boardwalk',
    reportedBy: 'expert-ornithologist',
    reportedDate: '2024-03-18',
    condition: {
      overall: 'excellent',
      surface: 'dry',
      visibility: 'clear',
      infrastructure: 'intact',
    },
    hazards: [],
    photos: [],
    maintenance: {
      needed: false,
      priority: 'low',
      description: '',
    },
    verified: true,
  },
  {
    id: 'tcr-003',
    trailSlug: 'kolahoi-glacier-expedition',
    reportedBy: 'guide-kashmir',
    reportedDate: '2024-03-10',
    condition: {
      overall: 'hazardous',
      surface: 'snow-covered',
      visibility: 'poor',
      infrastructure: 'damaged',
    },
    hazards: [
      { type: 'crevasse', severity: 'critical', location: 'Upper glacier', description: 'Multiple crevasses near summit' },
      { type: 'avalanche', severity: 'high', location: 'North face', description: 'Avalanche risk due to recent snowfall' },
      { type: 'ice', severity: 'high', location: 'Throughout', description: 'Ice axes and crampons required' },
    ],
    photos: [],
    maintenance: {
      needed: true,
      priority: 'urgent',
      description: 'Route marking damaged, guide ropes need replacement',
    },
    verified: true,
    verifiedBy: 'mountain-guide-association',
    verificationDate: '2024-03-11',
  },
];

export function getTrailConditions(trailSlug: string): TrailConditionReport[] {
  return trailConditionReports.filter((r) => r.trailSlug === trailSlug);
}

export function getRecentConditionUpdates(district?: string): TrailConditionReport[] {
  // Get trails in district if specified
  let trails = getTrailsData.all();
  if (district) {
    trails = trails.filter((t) => t.district.includes(district as KashmirDistrict));
  }
  
  const trailSlugs = trails.map((t) => t.slug);
  
  return trailConditionReports
    .filter((r) => trailSlugs.includes(r.trailSlug))
    .sort((a, b) => new Date(b.reportedDate).getTime() - new Date(a.reportedDate).getTime())
    .slice(0, 10);
}

export function submitConditionReport(report: Omit<TrailConditionReport, 'verified' | 'verifiedBy' | 'verificationDate'>): string {
  const newReport: TrailConditionReport = {
    ...report,
    verified: false,
  };
  trailConditionReports.unshift(newReport);
  return newReport.id;
}

// ============================================================================
// OBSERVER ANALYTICS
// ============================================================================

const observerProfiles: ObserverProfile[] = [
  {
    id: 'obs-001',
    name: 'Dr. Javaid Iqbal',
    type: 'expert',
    joinedDate: '2020-01-15',
    stats: {
      totalSightings: 342,
      verifiedSightings: 312,
      speciesIdentified: 89,
      districtsVisited: 12,
      trailsVisited: 28,
      contributionStreak: 45,
      lastActive: '2024-03-20',
    },
    expertise: {
      taxonomicGroups: ['birds', 'mammals'],
      districts: ['srinagar', 'anantnag', 'kupwara'],
      speciesSpecialties: ['kashmir-flycatcher', 'hangul', 'western-tragopan'],
    },
    recognition: {
      level: 'master',
      badges: ['Bird Expert', 'Mammal Specialist', 'Conservation Champion', '100-Day Streak'],
      verificationsContributed: 156,
    },
  },
  {
    id: 'obs-002',
    name: 'Amina Bhat',
    type: 'field-team',
    joinedDate: '2021-06-20',
    stats: {
      totalSightings: 189,
      verifiedSightings: 178,
      speciesIdentified: 56,
      districtsVisited: 8,
      trailsVisited: 22,
      contributionStreak: 28,
      lastActive: '2024-03-19',
    },
    expertise: {
      taxonomicGroups: ['plants', 'medicinal-plants'],
      districts: ['anantnag', 'pulwama', 'kishtwar'],
      speciesSpecialties: ['aconitum-heterophyllum', 'saussurea-costus'],
    },
    recognition: {
      level: 'expert',
      badges: ['Plant Expert', 'Medicinal Plant Guardian', '50-Day Streak'],
      verificationsContributed: 67,
    },
  },
  {
    id: 'obs-003',
    name: 'Mohammad Yaseen',
    type: 'citizen-scientist',
    joinedDate: '2023-03-10',
    stats: {
      totalSightings: 67,
      verifiedSightings: 45,
      speciesIdentified: 34,
      districtsVisited: 4,
      trailsVisited: 12,
      contributionStreak: 12,
      lastActive: '2024-03-18',
    },
    expertise: {
      taxonomicGroups: ['birds'],
      districts: ['srinagar', 'ganderbal'],
      speciesSpecialties: ['wetland-birds'],
    },
    recognition: {
      level: 'active',
      badges: ['Wetland Watcher', 'Rising Star'],
      verificationsContributed: 8,
    },
  },
];

export function getObserverProfile(observerId: string): ObserverProfile | null {
  return observerProfiles.find((o) => o.id === observerId) || null;
}

export function getObserverLeaderboard(district?: string): ObserverProfile[] {
  let observers = [...observerProfiles];
  
  // Filter by district if specified
  if (district) {
    observers = observers.filter((o) => o.expertise.districts.includes(district));
  }
  
  // Sort by total sightings
  return observers.sort((a, b) => b.stats.totalSightings - a.stats.totalSightings);
}

export function getObserverActivityByDistrict(district: string): ObserverProfile[] {
  return observerProfiles
    .filter((o) => o.expertise.districts.includes(district))
    .sort((a, b) => b.stats.totalSightings - a.stats.totalSightings);
}

export function calculateObserverLevel(sightings: number): ObserverLevel {
  if (sightings >= 200) return 'master';
  if (sightings >= 50) return 'expert';
  if (sightings >= 10) return 'active';
  return 'novice';
}

// ============================================================================
// ANOMALY DETECTION
// ============================================================================

const anomalyRecords: AnomalyRecord[] = [
  {
    id: 'anomaly-001',
    sightingSlug: 'snow-leopard-kishtwar-2024',
    anomalyType: 'critically-endangered',
    speciesName: 'Snow Leopard',
    district: 'kishtwar',
    observationDate: '2024-03-05',
    anomalyDetails: {
      expectedRange: 'High altitude zones above 3000m',
      observedLocation: 'Kishtwar National Park, 2800m',
      significance: 'critical',
    },
    expertReview: {
      reviewedBy: 'Dr. Javaid Iqbal',
      reviewDate: '2024-03-06',
      assessment: 'confirmed',
      notes: 'Camera trap confirmation. First record in this sector in 5 years.',
    },
    alertSent: true,
    published: true,
  },
  {
    id: 'anomaly-002',
    sightingSlug: 'kashmir-flycatcher-early-2024',
    anomalyType: 'phenology-anomaly',
    speciesName: 'Kashmir Flycatcher',
    district: 'anantnag',
    observationDate: '2024-03-01',
    anomalyDetails: {
      expectedRange: 'Typical arrival: mid-April',
      observedLocation: 'Overa-Aru Wildlife Sanctuary',
      deviationKm: 0,
      significance: 'high',
    },
    expertReview: {
      reviewedBy: 'Dr. Javaid Iqbal',
      reviewDate: '2024-03-02',
      assessment: 'confirmed',
      notes: 'Earliest arrival on record. 45 days earlier than historical average. Potential climate indicator.',
    },
    alertSent: true,
    published: true,
  },
  {
    id: 'anomaly-003',
    sightingSlug: 'hangul-budgam-2024',
    anomalyType: 'first-district',
    speciesName: 'Hangul (Kashmir Stag)',
    district: 'budgam',
    observationDate: '2024-02-28',
    anomalyDetails: {
      expectedRange: 'Srinagar, Ganderbal, Anantnag only',
      observedLocation: 'Budgam district, forest zone',
      deviationKm: 25,
      significance: 'critical',
    },
    expertReview: {
      reviewedBy: 'Wildlife Department',
      reviewDate: '2024-03-01',
      assessment: 'questionable',
      notes: 'Requires additional verification. Possible dispersal from Dachigam population.',
    },
    alertSent: true,
    published: false,
  },
];

export function getAnomalyRecords(anomalyType?: string): AnomalyRecord[] {
  let anomalies = [...anomalyRecords];
  
  if (anomalyType) {
    anomalies = anomalies.filter((a) => a.anomalyType === anomalyType);
  }
  
  return anomalies.sort((a, b) => new Date(b.observationDate).getTime() - new Date(a.observationDate).getTime());
}

export function getRecentAnomalies(district?: string): AnomalyRecord[] {
  let anomalies = getAnomalyRecords();
  
  if (district) {
    anomalies = anomalies.filter((a) => a.district === district);
  }
  
  return anomalies.slice(0, 5);
}

export function submitAnomalyAlert(sightingSlug: string, anomalyType: AnomalyType): string {
  const sighting = getSightingsData.all().find((s) => s.slug === sightingSlug);
  if (!sighting) throw new Error('Sighting not found');
  
  const newAnomaly: AnomalyRecord = {
    id: `anomaly-${Date.now()}`,
    sightingSlug,
    anomalyType,
    speciesName: sighting.speciesName,
    district: sighting.district,
    observationDate: sighting.observationDate,
    anomalyDetails: {
      expectedRange: 'To be determined',
      observedLocation: sighting.location,
      significance: 'high',
    },
    alertSent: false,
    published: false,
  };
  
  anomalyRecords.unshift(newAnomaly);
  return newAnomaly.id;
}

// ============================================================================
// FIELD NOTES
// ============================================================================

const fieldNotes: FieldNote[] = [
  {
    id: 'fn-001',
    slug: 'hangul-behavior-dachigam',
    title: 'Hangul Rutting Behavior Observation',
    linkedTrail: 'dachigam-hangul-trail',
    linkedDistrict: 'srinagar',
    author: {
      name: 'Dr. Javaid Iqbal',
      type: 'expert',
    },
    content: {
      narrative: 'Observed typical rutting behavior in male Hangul. Antler displays, territorial marking, and vocalizations recorded. Group consisted of 1 male and 3 females.',
      structuredData: {
        weather: 'Clear',
        temperature: 12,
        habitat: 'temperate-forest',
        speciesCount: 4,
        behavior: 'rutting',
      },
    },
    media: {
      photos: [
        { url: '/photos/hangul-rut-1.jpg', caption: 'Male displaying antlers' },
        { url: '/photos/hangul-rut-2.jpg', caption: 'Group composition' },
      ],
      audio: [
        { url: '/audio/hangul-vocalization.mp3', caption: 'Rutting vocalization' },
      ],
    },
    location: {
      lat: 34.0833,
      lng: 75.0833,
      elevation: 2400,
    },
    timestamp: '2024-03-10T08:30:00Z',
    visibility: 'research-only',
  },
  {
    id: 'fn-002',
    slug: 'wetland-bird-migration-hokersar',
    title: 'Peak Migration at Hokersar',
    linkedTrail: 'hokersar-wetland-boardwalk',
    linkedDistrict: 'srinagar',
    author: {
      name: 'Mohammad Yaseen',
      type: 'citizen-scientist',
    },
    content: {
      narrative: 'Exceptional migration day with over 5000 waterfowl counted. Species included Greylag Goose, Common Teal, Northern Pintail, and Red-crested Pochard. Peak activity between 0700-0900 hours.',
      structuredData: {
        weather: 'Partly cloudy',
        temperature: 8,
        habitat: 'wetland',
        speciesCount: 12,
        behavior: 'migration',
      },
    },
    media: {
      photos: [
        { url: '/photos/hokersar-migration-1.jpg', caption: 'Flock taking off' },
        { url: '/photos/hokersar-migration-2.jpg', caption: 'Wetland panorama' },
      ],
      audio: [],
    },
    location: {
      lat: 34.1167,
      lng: 74.8167,
      elevation: 1585,
    },
    timestamp: '2024-03-15T07:30:00Z',
    visibility: 'public',
  },
];

export function getTrailFieldNotes(trailSlug: string): FieldNote[] {
  return fieldNotes.filter((n) => n.linkedTrail === trailSlug);
}

export function getSightingFieldNotes(sightingSlug: string): FieldNote[] {
  return fieldNotes.filter((n) => n.linkedSighting === sightingSlug);
}

export function getDistrictFieldNotes(district: string): FieldNote[] {
  return fieldNotes.filter((n) => n.linkedDistrict === district);
}

export function submitFieldNote(note: Omit<FieldNote, 'id'>): string {
  const newNote: FieldNote = {
    ...note,
    id: `fn-${Date.now()}`,
  };
  fieldNotes.unshift(newNote);
  return newNote.id;
}

// ============================================================================
// MAP DATA
// ============================================================================

export function getTrailGeoJSON(trailSlug: string): any {
  const trail = getTrailsData.all().find((t) => t.slug === trailSlug);
  if (!trail) return null;
  
  // Simplified GeoJSON representation
  return {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          name: trail.name,
          difficulty: trail.difficulty,
          length: trail.length.value,
          duration: trail.duration,
          elevationGain: trail.elevationGain.value,
        },
        geometry: {
          type: 'Point',
          coordinates: [75, 34], // Simplified - in real implementation would use actual trail coordinates
        },
      },
    ],
  };
}

export function getSightingHeatmapData(district?: string): any[] {
  let sightings = getSightingsData.all();
  
  if (district) {
    sightings = sightings.filter((s) => s.district === district);
  }
  
  return sightings.map((s) => ({
    lat: 34, // Simplified - in real implementation would use actual coordinates
    lng: 75,
    weight: s.verificationStatus === 'verified' ? 1.0 : 0.5,
    species: s.speciesName,
  }));
}

export function getElevationProfile(trailSlug: string): { distance: number; elevation: number }[] {
  // Simulated elevation profile (in real implementation, this would come from SRTM/ASTER data)
  const trail = getTrailsData.all().find((t) => t.slug === trailSlug);
  if (!trail) return [];
  
  const length = trail.length.value;
  const elevationGain = trail.elevationGain.value;
  const baseElevation = trail.altitudeBand.min;
  
  return Array.from({ length: 20 }, (_, i) => ({
    distance: (i / 19) * length,
    elevation: baseElevation + Math.sin((i / 19) * Math.PI) * elevationGain,
  }));
}

// ============================================================================
// EXPORT ALL ORIGINAL DATA
// ============================================================================

export { getTrailsData, getSightingsData } from './trails-sightings';
