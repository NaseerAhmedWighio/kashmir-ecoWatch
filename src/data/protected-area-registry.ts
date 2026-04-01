// Protected Area Management Intelligence Data Service
// Registry + management status, threat status, access status
// Connectivity and corridor intelligence
// Species pressure overlays
// Protection history / legal designation metadata
// Near-settlement / tourism / encroachment watch
// Buffer-zone and access sensitivity

import { KashmirDistrict, HabitatType } from './trails-sightings';

// ============================================================================
// PROTECTED AREA REGISTRY WITH MANAGEMENT INTELLIGENCE
// ============================================================================

export type PAManagementStatus = 'fully-managed' | 'partially-managed' | 'nominally-managed' | 'unmanaged';
export type PAThreatStatus = 'critical' | 'high' | 'medium' | 'low' | 'minimal';
export type PAAccessStatus = 'open' | 'restricted' | 'permit-required' | 'closed' | 'seasonal';
export type PAEncroachmentStatus = 'severe' | 'moderate' | 'low' | 'none';
export type PATourismPressure = 'very-high' | 'high' | 'moderate' | 'low' | 'minimal';

export interface ProtectedAreaRegistry {
  // Core Identity
  id: string;
  slug: string;
  name: string;
  category: 'national_park' | 'wildlife_sanctuary' | 'wetland_reserve' | 'conservation_reserve' | 'game_reserve' | 'iba';
  
  // Legal Designation
  legalDesignation: {
    status: 'notified' | 'proposed' | 'reserve' | 'community-conserved';
    notificationDate?: string;
    notificationNumber?: string;
    legalAct: string;
    amendments?: string[];
  };
  
  // Protection History
  protectionHistory: {
    originallyEstablished: number;
    upgradedToCurrentStatus?: number;
    boundaryChanges?: Array<{
      year: number;
      change: 'expansion' | 'reduction' | 'realignment';
      areaChangeKm2: number;
      reason: string;
    }>;
    managementHandovers?: Array<{
      year: number;
      fromAuthority: string;
      toAuthority: string;
    }>;
  };
  
  // Area & Location
  areaSqKm: number;
  district: KashmirDistrict;
  region: 'Kashmir' | 'Jammu' | 'Ladakh';
  coordinates: { lat: number; lng: number };
  boundaryLengthKm: number;
  
  // Management Status
  managementStatus: {
    status: PAManagementStatus;
    managingAuthority: string;
    fieldStaff: number;
    budgetAllocation?: number; // INR lakhs/year
    managementPlan?: {
      exists: boolean;
      year: number;
      validUntil: number;
      status: 'current' | 'expired' | 'in-preparation';
    };
    infrastructure: {
      rangerStations: number;
      checkPosts: number;
      watchtowers: number;
      interpretationCenters: number;
    };
  };
  
  // Threat Status
  threatStatus: {
    overall: PAThreatStatus;
    threats: Array<{
      type: 'encroachment' | 'poaching' | 'grazing' | 'tourism-pressure' | 'pollution' | 'climate-change' | 'invasive-species' | 'hydrological-change';
      severity: 'critical' | 'high' | 'medium' | 'low';
      description: string;
      affectedAreaPercent: number;
      trend: 'improving' | 'stable' | 'worsening';
    }>;
    lastAssessment: string;
  };
  
  // Access Status
  accessStatus: {
    status: PAAccessStatus;
    restrictions?: string;
    permitRequired?: {
      authority: string;
      process: string;
      fee?: number;
    };
    seasonalClosures?: Array<{
      months: string[];
      reason: string;
      area: string;
    }>;
  };
  
  // Encroachment Watch
  encroachmentWatch: {
    status: PAEncroachmentStatus;
    encroachedAreaKm2?: number;
    encroachmentTypes: string[];
    nearSettlements: Array<{
      name: string;
      distanceKm: number;
      population?: number;
      pressureType: string;
    }>;
    legalCases?: number;
    evictionDrives?: number;
  };
  
  // Tourism Pressure
  tourismPressure: {
    level: PATourismPressure;
    annualVisitors?: number;
    peakSeason: string[];
    tourismZones: number;
    impacts: string[];
    managementMeasures: string[];
  };
  
  // Buffer Zone
  bufferZone: {
    exists: boolean;
    areaKm2?: number;
    status: 'notified' | 'informal' | 'community-managed' | 'none';
    activities: string[];
    restrictions: string[];
  };
  
  // Access Sensitivity
  accessSensitivity: {
    overall: 'critical' | 'high' | 'medium' | 'low';
    factors: Array<{
      factor: 'species-sensitivity' | 'habitat-fragility' | 'cultural-significance' | 'security-concern';
      level: 'critical' | 'high' | 'medium' | 'low';
      notes: string;
    }>;
  };
  
  // Species Pressure Overlay
  speciesPressure: {
    criticalSpecies: Array<{
      species: string;
      commonName: string;
      conservationStatus: string;
      populationTrend: 'increasing' | 'stable' | 'declining';
      pressureLevel: 'high' | 'medium' | 'low';
      keyHabitats: string[];
    }>;
    humanWildlifeConflict: {
      frequency: 'high' | 'medium' | 'low';
      incidentTypes: string[];
      mitigationMeasures: string[];
    };
  };
  
  // Connectivity Intelligence
  connectivity: {
    connectedAreas: string[]; // Other PA slugs
    corridors: Array<{
      name: string;
      type: 'active' | 'degraded' | 'historical';
      width: string;
      length: string;
      status: 'protected' | 'partial' | 'threatened';
      priority: 'critical' | 'high' | 'medium';
    }>;
    landscapeContext: string;
    fragmentationIndex: 'low' | 'medium' | 'high';
  };
  
  // Ecosystems & Habitats
  ecosystems: HabitatType[];
  habitatBreakdown: Array<{
    habitat: HabitatType;
    areaPercent: number;
    condition: 'pristine' | 'good' | 'fair' | 'degraded';
  }>;
  
  // Key Species
  keySpecies: string[]; // Species slugs
  flagshipSpecies: string[];
  
  // Metadata
  description: string;
  significance: string;
  imageUrl?: string;
  lastUpdated: string;
}

// ============================================================================
// KASHMIR PROTECTED AREAS REGISTRY (Sample Data)
// ============================================================================

export const protectedAreaRegistry: ProtectedAreaRegistry[] = [
  {
    id: 'dachigam-np',
    slug: 'dachigam-national-park',
    name: 'Dachigam National Park',
    category: 'national_park',
    
    legalDesignation: {
      status: 'notified',
      notificationDate: '1981-04-15',
      notificationNumber: 'JK-WL-1981/47',
      legalAct: 'Jammu & Kashmir Wildlife (Protection) Act, 1978',
      amendments: ['2005: Boundary realignment']
    },
    
    protectionHistory: {
      originallyEstablished: 1910,
      upgradedToCurrentStatus: 1981,
      boundaryChanges: [
        {
          year: 2005,
          change: 'realignment',
          areaChangeKm2: 2.5,
          reason: 'Settlement resolution'
        }
      ],
      managementHandovers: [
        { year: 1981, fromAuthority: 'Forest Department', toAuthority: 'Wildlife Wing' }
      ]
    },
    
    areaSqKm: 141,
    district: 'Srinagar',
    region: 'Kashmir',
    coordinates: { lat: 34.1167, lng: 75.0667 },
    boundaryLengthKm: 52,
    
    managementStatus: {
      status: 'fully-managed',
      managingAuthority: 'J&K Wildlife Protection Department',
      fieldStaff: 47,
      budgetAllocation: 850,
      managementPlan: {
        exists: true,
        year: 2019,
        validUntil: 2029,
        status: 'current'
      },
      infrastructure: {
        rangerStations: 5,
        checkPosts: 8,
        watchtowers: 12,
        interpretationCenters: 2
      }
    },
    
    threatStatus: {
      overall: 'high',
      threats: [
        {
          type: 'encroachment',
          severity: 'high',
          description: 'Settlement expansion at boundaries',
          affectedAreaPercent: 8,
          trend: 'stable'
        },
        {
          type: 'grazing',
          severity: 'medium',
          description: 'Livestock grazing in core areas',
          affectedAreaPercent: 15,
          trend: 'improving'
        },
        {
          type: 'tourism-pressure',
          severity: 'medium',
          description: 'Unregulated visitor movement',
          affectedAreaPercent: 12,
          trend: 'worsening'
        }
      ],
      lastAssessment: '2024-01'
    },
    
    accessStatus: {
      status: 'permit-required',
      restrictions: 'Core area access restricted',
      permitRequired: {
        authority: 'Chief Wildlife Warden, J&K',
        process: 'Online application 7 days in advance',
        fee: 500
      },
      seasonalClosures: [
        {
          months: ['December', 'January', 'February'],
          reason: 'Hangul rutting season',
          area: 'Upper Dachigam'
        }
      ]
    },
    
    encroachmentWatch: {
      status: 'moderate',
      encroachedAreaKm2: 3.2,
      encroachmentTypes: ['Agricultural expansion', 'Settlement growth', 'Grazing lands'],
      nearSettlements: [
        { name: 'Pantha Chowk', distanceKm: 5, population: 15000, pressureType: 'Urban expansion' },
        { name: 'Kakapora', distanceKm: 8, population: 8000, pressureType: 'Agricultural' }
      ],
      legalCases: 12,
      evictionDrives: 3
    },
    
    tourismPressure: {
      level: 'high',
      annualVisitors: 45000,
      peakSeason: ['April', 'May', 'June', 'September', 'October'],
      tourismZones: 3,
      impacts: ['Habitat disturbance', 'Waste generation', 'Noise pollution'],
      managementMeasures: ['Designated trails', 'Visitor caps', 'Waste collection']
    },
    
    bufferZone: {
      exists: true,
      areaKm2: 45,
      status: 'notified',
      activities: ['Sustainable agriculture', 'Eco-tourism', 'Community forestry'],
      restrictions: ['No industrial activity', 'No hunting', 'Controlled grazing']
    },
    
    accessSensitivity: {
      overall: 'critical',
      factors: [
        {
          factor: 'species-sensitivity',
          level: 'critical',
          notes: 'Hangul critical habitat'
        },
        {
          factor: 'habitat-fragility',
          level: 'high',
          notes: 'Temperate forest ecosystem'
        }
      ]
    },
    
    speciesPressure: {
      criticalSpecies: [
        {
          species: 'hangul',
          commonName: 'Hangul (Kashmir Stag)',
          conservationStatus: 'CR',
          populationTrend: 'stable',
          pressureLevel: 'high',
          keyHabitats: ['Upper Dachigam', 'Riverine forests']
        },
        {
          species: 'himalayan-black-bear',
          commonName: 'Himalayan Black Bear',
          conservationStatus: 'VU',
          populationTrend: 'stable',
          pressureLevel: 'medium',
          keyHabitats: ['Oak forests', 'Fruit-bearing areas']
        }
      ],
      humanWildlifeConflict: {
        frequency: 'medium',
        incidentTypes: ['Crop raiding by bears', 'Livestock predation'],
        mitigationMeasures: ['Solar fences', 'Compensation scheme', 'Awareness programs']
      }
    },
    
    connectivity: {
      connectedAreas: ['overa-aru-wildlife-sanctuary'],
      corridors: [
        {
          name: 'Dachigam-Overa Corridor',
          type: 'degraded',
          width: '2-5 km',
          length: '35 km',
          status: 'threatened',
          priority: 'critical'
        }
      ],
      landscapeContext: 'Western Himalayan temperate forest landscape',
      fragmentationIndex: 'medium'
    },
    
    ecosystems: ['temperate-forest', 'oak-forest', 'alpine-meadow', 'riparian'],
    habitatBreakdown: [
      { habitat: 'temperate-forest', areaPercent: 45, condition: 'good' },
      { habitat: 'oak-forest', areaPercent: 25, condition: 'good' },
      { habitat: 'alpine-meadow', areaPercent: 20, condition: 'pristine' },
      { habitat: 'riparian', areaPercent: 10, condition: 'fair' }
    ],
    
    keySpecies: ['hangul', 'himalayan-black-bear', 'himalayan-monals', 'western-tragopan'],
    flagshipSpecies: ['hangul'],
    
    description: 'Critical habitat for the endangered Hangul (Kashmir Stag). Located 22 km from Srinagar, this protected area represents unique temperate forest ecosystems.',
    significance: 'Last viable habitat for Hangul; biodiversity hotspot of Western Himalayas',
    imageUrl: '/images/pas/dachigam.jpg',
    lastUpdated: '2024-03-20'
  },
  
  {
    id: 'hokersar-wls',
    slug: 'hokersar-wetland',
    name: 'Hokersar Wetland Reserve',
    category: 'wetland_reserve',
    
    legalDesignation: {
      status: 'notified',
      notificationDate: '1986-06-12',
      notificationNumber: 'JK-WL-1986/23',
      legalAct: 'Jammu & Kashmir Wildlife (Protection) Act, 1978',
      amendments: ['2005: Ramsar Site designation']
    },
    
    protectionHistory: {
      originallyEstablished: 1986,
      upgradedToCurrentStatus: 2005,
      boundaryChanges: [],
      managementHandovers: [
        { year: 2005, fromAuthority: 'Forest Department', toAuthority: 'Wetland Management Authority' }
      ]
    },
    
    areaSqKm: 10,
    district: 'Budgam',
    region: 'Kashmir',
    coordinates: { lat: 34.2167, lng: 74.8833 },
    boundaryLengthKm: 14,
    
    managementStatus: {
      status: 'fully-managed',
      managingAuthority: 'J&K Wetland Management Authority',
      fieldStaff: 23,
      budgetAllocation: 450,
      managementPlan: {
        exists: true,
        year: 2020,
        validUntil: 2030,
        status: 'current'
      },
      infrastructure: {
        rangerStations: 2,
        checkPosts: 4,
        watchtowers: 6,
        interpretationCenters: 1
      }
    },
    
    threatStatus: {
      overall: 'critical',
      threats: [
        {
          type: 'encroachment',
          severity: 'critical',
          description: 'Land grabbing at periphery',
          affectedAreaPercent: 12,
          trend: 'worsening'
        },
        {
          type: 'pollution',
          severity: 'high',
          description: 'Agricultural runoff and sewage',
          affectedAreaPercent: 35,
          trend: 'worsening'
        },
        {
          type: 'hydrological-change',
          severity: 'high',
          description: 'Water extraction and siltation',
          affectedAreaPercent: 40,
          trend: 'worsening'
        }
      ],
      lastAssessment: '2024-02'
    },
    
    accessStatus: {
      status: 'restricted',
      restrictions: 'Core wetland area closed; viewing from designated points only',
      permitRequired: {
        authority: 'Wetland Manager, Hokersar',
        process: 'Entry permit at gate',
        fee: 50
      }
    },
    
    encroachmentWatch: {
      status: 'severe',
      encroachedAreaKm2: 1.2,
      encroachmentTypes: ['Agricultural expansion', 'Settlement growth', 'Waste dumping'],
      nearSettlements: [
        { name: 'Hokersar Village', distanceKm: 0.5, population: 3000, pressureType: 'Agricultural' },
        { name: 'Narkara', distanceKm: 2, population: 5000, pressureType: 'Settlement' }
      ],
      legalCases: 28,
      evictionDrives: 5
    },
    
    tourismPressure: {
      level: 'moderate',
      annualVisitors: 12000,
      peakSeason: ['October', 'November', 'December', 'January', 'February', 'March'],
      tourismZones: 2,
      impacts: ['Bird disturbance', 'Waste generation'],
      managementMeasures: ['Designated viewing points', 'Boardwalk only', 'No entry in core']
    },
    
    bufferZone: {
      exists: true,
      areaKm2: 5,
      status: 'community-managed',
      activities: ['Traditional agriculture', 'Controlled grazing'],
      restrictions: ['No construction', 'No industrial activity', 'No hunting']
    },
    
    accessSensitivity: {
      overall: 'high',
      factors: [
        {
          factor: 'habitat-fragility',
          level: 'critical',
          notes: 'Ramsar wetland ecosystem'
        },
        {
          factor: 'species-sensitivity',
          level: 'high',
          notes: 'Migratory waterbird habitat'
        }
      ]
    },
    
    speciesPressure: {
      criticalSpecies: [
        {
          species: 'wetland-bird-group',
          commonName: 'Migratory Waterbirds',
          conservationStatus: 'Various',
          populationTrend: 'declining',
          pressureLevel: 'high',
          keyHabitats: ['Open water', 'Reedbeds', 'Marshy areas']
        }
      ],
      humanWildlifeConflict: {
        frequency: 'low',
        incidentTypes: ['Crop damage by birds'],
        mitigationMeasures: ['Compensation scheme', 'Scaring devices']
      }
    },
    
    connectivity: {
      connectedAreas: ['shallabugh-wetland', 'manasbal-lake'],
      corridors: [],
      landscapeContext: 'Kashmir Valley wetland complex',
      fragmentationIndex: 'high'
    },
    
    ecosystems: ['wetland', 'riparian'],
    habitatBreakdown: [
      { habitat: 'wetland', areaPercent: 70, condition: 'fair' },
      { habitat: 'riparian', areaPercent: 20, condition: 'fair' },
      { habitat: 'scrubland', areaPercent: 10, condition: 'degraded' }
    ],
    
    keySpecies: ['wetland-bird-group', 'sarus-crane'],
    flagshipSpecies: ['sarus-crane'],
    
    description: 'Ramsar wetland site and critical habitat for migratory waterbirds. One of the largest wetlands in Kashmir Valley.',
    significance: 'Ramsar Site; critical migratory bird habitat; flood buffering',
    imageUrl: '/images/pas/hokersar.jpg',
    lastUpdated: '2024-03-22'
  },
  
  {
    id: 'overa-aru-wls',
    slug: 'overa-aru-wildlife-sanctuary',
    name: 'Overa-Aru Wildlife Sanctuary',
    category: 'wildlife_sanctuary',
    
    legalDesignation: {
      status: 'notified',
      notificationDate: '1981-04-15',
      notificationNumber: 'JK-WL-1981/52',
      legalAct: 'Jammu & Kashmir Wildlife (Protection) Act, 1978'
    },
    
    protectionHistory: {
      originallyEstablished: 1981,
      upgradedToCurrentStatus: 1981,
      boundaryChanges: [],
      managementHandovers: []
    },
    
    areaSqKm: 511,
    district: 'Anantnag',
    region: 'Kashmir',
    coordinates: { lat: 33.8833, lng: 75.2167 },
    boundaryLengthKm: 95,
    
    managementStatus: {
      status: 'partially-managed',
      managingAuthority: 'J&K Wildlife Protection Department',
      fieldStaff: 28,
      budgetAllocation: 620,
      managementPlan: {
        exists: true,
        year: 2018,
        validUntil: 2028,
        status: 'current'
      },
      infrastructure: {
        rangerStations: 3,
        checkPosts: 5,
        watchtowers: 8,
        interpretationCenters: 1
      }
    },
    
    threatStatus: {
      overall: 'medium',
      threats: [
        {
          type: 'poaching',
          severity: 'medium',
          description: 'Snaring and illegal hunting',
          affectedAreaPercent: 5,
          trend: 'stable'
        },
        {
          type: 'grazing',
          severity: 'medium',
          description: 'Livestock grazing in meadows',
          affectedAreaPercent: 20,
          trend: 'stable'
        }
      ],
      lastAssessment: '2024-01'
    },
    
    accessStatus: {
      status: 'permit-required',
      permitRequired: {
        authority: 'Divisional Forest Officer, Anantnag',
        process: 'Permit at entry gate',
        fee: 200
      },
      seasonalClosures: [
        {
          months: ['November', 'December', 'January', 'February', 'March'],
          reason: 'Snow closure and wildlife breeding',
          area: 'High altitude areas'
        }
      ]
    },
    
    encroachmentWatch: {
      status: 'low',
      encroachmentTypes: ['Grazing lands'],
      nearSettlements: [
        { name: 'Aru Village', distanceKm: 2, population: 500, pressureType: 'Tourism' }
      ],
      legalCases: 3,
      evictionDrives: 1
    },
    
    tourismPressure: {
      level: 'moderate',
      annualVisitors: 8000,
      peakSeason: ['May', 'June', 'July', 'August', 'September'],
      tourismZones: 2,
      impacts: ['Meadow degradation', 'Waste generation'],
      managementMeasures: ['Designated campsites', 'Waste collection']
    },
    
    bufferZone: {
      exists: true,
      areaKm2: 85,
      status: 'informal',
      activities: ['Traditional grazing', 'Tourism'],
      restrictions: ['No hunting', 'No commercial activity']
    },
    
    accessSensitivity: {
      overall: 'high',
      factors: [
        {
          factor: 'species-sensitivity',
          level: 'critical',
          notes: 'Hangul, Musk Deer, Western Tragopan habitat'
        }
      ]
    },
    
    speciesPressure: {
      criticalSpecies: [
        {
          species: 'hangul',
          commonName: 'Hangul (Kashmir Stag)',
          conservationStatus: 'CR',
          populationTrend: 'stable',
          pressureLevel: 'medium',
          keyHabitats: ['Forest areas', 'Meadows']
        },
        {
          species: 'musk-deer',
          commonName: 'Himalayan Musk Deer',
          conservationStatus: 'EN',
          populationTrend: 'declining',
          pressureLevel: 'high',
          keyHabitats: ['Temperate forests']
        },
        {
          species: 'western-tragopan',
          commonName: 'Western Tragopan',
          conservationStatus: 'VU',
          populationTrend: 'stable',
          pressureLevel: 'medium',
          keyHabitats: ['Oak forests']
        }
      ],
      humanWildlifeConflict: {
        frequency: 'low',
        incidentTypes: ['Crop raiding'],
        mitigationMeasures: ['Compensation scheme']
      }
    },
    
    connectivity: {
      connectedAreas: ['dachigam-national-park', 'kishtwar-national-park'],
      corridors: [
        {
          name: 'Overa-Dachigam Corridor',
          type: 'degraded',
          width: '3-8 km',
          length: '25 km',
          status: 'threatened',
          priority: 'high'
        }
      ],
      landscapeContext: 'Western Himalayan temperate-alpine landscape',
      fragmentationIndex: 'medium'
    },
    
    ecosystems: ['temperate-forest', 'coniferous-forest', 'alpine-meadow', 'oak-forest'],
    habitatBreakdown: [
      { habitat: 'temperate-forest', areaPercent: 35, condition: 'good' },
      { habitat: 'coniferous-forest', areaPercent: 30, condition: 'good' },
      { habitat: 'alpine-meadow', areaPercent: 25, condition: 'pristine' },
      { habitat: 'oak-forest', areaPercent: 10, condition: 'good' }
    ],
    
    keySpecies: ['hangul', 'musk-deer', 'western-tragopan', 'himalayan-monals'],
    flagshipSpecies: ['hangul', 'western-tragopan'],
    
    description: 'Large protected area with diverse habitats from temperate forests to alpine meadows. Important for Hangul and other threatened species.',
    significance: 'Key Hangul habitat; biodiversity corridor; alpine ecosystem',
    imageUrl: '/images/pas/overa-aru.jpg',
    lastUpdated: '2024-03-18'
  }
];

// ============================================================================
// CORRIDOR INTELLIGENCE
// ============================================================================

export interface CorridorIntelligence {
  id: string;
  slug: string;
  name: string;
  type: 'active' | 'degraded' | 'historical' | 'potential';
  length: string;
  width: string;
  status: 'protected' | 'partial' | 'threatened' | 'lost';
  priority: 'critical' | 'high' | 'medium' | 'low';
  
  // Connectivity
  connectedAreas: string[]; // PA slugs
  districts: KashmirDistrict[];
  
  // Landscape Context
  landscapeType: string;
  elevationRange: { min: number; max: number };
  
  // Key Species Movement
  keySpecies: string[];
  movementPatterns: string;
  
  // Threats
  threats: Array<{
    type: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    description: string;
  }>;
  
  // Conservation Measures
  conservationMeasures: string[];
  landUse: string[];
  
  // Legal Status
  legalProtection: 'protected' | 'revenue-land' | 'private' | 'mixed';
  
  // Restoration Potential
  restorationPotential: 'high' | 'medium' | 'low' | 'not-feasible';
  
  description: string;
  lastUpdated: string;
}

export const corridorIntelligenceData: CorridorIntelligence[] = [
  {
    id: 'dachigam-overa-corridor',
    slug: 'dachigam-overa-corridor',
    name: 'Dachigam-Overa Corridor',
    type: 'degraded',
    length: '35 km',
    width: '2-5 km',
    status: 'threatened',
    priority: 'critical',
    
    connectedAreas: ['dachigam-national-park', 'overa-aru-wildlife-sanctuary'],
    districts: ['Srinagar', 'Anantnag'],
    
    landscapeType: 'Temperate forest valley corridor',
    elevationRange: { min: 1800, max: 3200 },
    
    keySpecies: ['hangul', 'himalayan-black-bear', 'leopard'],
    movementPatterns: 'Seasonal altitudinal movement; breeding dispersal',
    
    threats: [
      {
        type: 'Habitat fragmentation',
        severity: 'critical',
        description: 'Road widening and settlement expansion'
      },
      {
        type: 'Agricultural expansion',
        severity: 'high',
        description: 'Orchard and agricultural land conversion'
      }
    ],
    
    conservationMeasures: [
      'Corridor protection notification',
      'Underpasses on highways',
      'Community conservation agreements'
    ],
    
    landUse: ['Forest', 'Agriculture', 'Settlements', 'Orchards'],
    legalProtection: 'mixed',
    restorationPotential: 'medium',
    
    description: 'Critical connectivity corridor between Dachigam and Overa-Aru for Hangul movement.',
    lastUpdated: '2024-03-15'
  }
];

// ============================================================================
// DATA ACCESS FUNCTIONS
// ============================================================================

export const getProtectedAreaRegistry = {
  all: () => protectedAreaRegistry,
  bySlug: (slug: string) => protectedAreaRegistry.find(pa => pa.slug === slug),
  byCategory: (category: string) => protectedAreaRegistry.filter(pa => pa.category === category),
  byDistrict: (district: KashmirDistrict) => protectedAreaRegistry.filter(pa => pa.district === district),
  byManagementStatus: (status: PAManagementStatus) => protectedAreaRegistry.filter(pa => pa.managementStatus.status === status),
  byThreatStatus: (status: PAThreatStatus) => protectedAreaRegistry.filter(pa => pa.threatStatus.overall === status),
  byEncroachmentStatus: (status: PAEncroachmentStatus) => protectedAreaRegistry.filter(pa => pa.encroachmentWatch.status === status),
  kashmirOnly: () => protectedAreaRegistry.filter(pa => pa.region === 'Kashmir')
};

export const getCorridorIntelligence = {
  all: () => corridorIntelligenceData,
  bySlug: (slug: string) => corridorIntelligenceData.find(c => c.slug === slug),
  byPriority: (priority: 'critical' | 'high' | 'medium' | 'low') => corridorIntelligenceData.filter(c => c.priority === priority),
  byStatus: (status: 'protected' | 'partial' | 'threatened' | 'lost') => corridorIntelligenceData.filter(c => c.status === status)
};

// ============================================================================
// METRICS
// ============================================================================

export const protectedAreaRegistryMetrics = {
  total: protectedAreaRegistry.length,
  byCategory: {
    national_park: protectedAreaRegistry.filter(pa => pa.category === 'national_park').length,
    wildlife_sanctuary: protectedAreaRegistry.filter(pa => pa.category === 'wildlife_sanctuary').length,
    wetland_reserve: protectedAreaRegistry.filter(pa => pa.category === 'wetland_reserve').length,
    conservation_reserve: protectedAreaRegistry.filter(pa => pa.category === 'conservation_reserve').length,
    game_reserve: protectedAreaRegistry.filter(pa => pa.category === 'game_reserve').length,
    iba: protectedAreaRegistry.filter(pa => pa.category === 'iba').length
  },
  byManagementStatus: {
    fully: protectedAreaRegistry.filter(pa => pa.managementStatus.status === 'fully-managed').length,
    partially: protectedAreaRegistry.filter(pa => pa.managementStatus.status === 'partially-managed').length,
    nominally: protectedAreaRegistry.filter(pa => pa.managementStatus.status === 'nominally-managed').length,
    unmanaged: protectedAreaRegistry.filter(pa => pa.managementStatus.status === 'unmanaged').length
  },
  byThreatStatus: {
    critical: protectedAreaRegistry.filter(pa => pa.threatStatus.overall === 'critical').length,
    high: protectedAreaRegistry.filter(pa => pa.threatStatus.overall === 'high').length,
    medium: protectedAreaRegistry.filter(pa => pa.threatStatus.overall === 'medium').length,
    low: protectedAreaRegistry.filter(pa => pa.threatStatus.overall === 'low').length
  },
  byEncroachmentStatus: {
    severe: protectedAreaRegistry.filter(pa => pa.encroachmentWatch.status === 'severe').length,
    moderate: protectedAreaRegistry.filter(pa => pa.encroachmentWatch.status === 'moderate').length,
    low: protectedAreaRegistry.filter(pa => pa.encroachmentWatch.status === 'low').length,
    none: protectedAreaRegistry.filter(pa => pa.encroachmentWatch.status === 'none').length
  },
  totalArea: protectedAreaRegistry.reduce((sum, pa) => sum + pa.areaSqKm, 0),
  kashmirArea: protectedAreaRegistry.filter(pa => pa.region === 'Kashmir').reduce((sum, pa) => sum + pa.areaSqKm, 0)
};
