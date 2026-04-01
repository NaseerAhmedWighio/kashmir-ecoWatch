// District Profiles Type Definitions

import type { SeasonType, AccessStatus, TourismPotential } from './seasonal-ecology';

export type DistrictRegion = 'kashmir-valley' | 'jammu' | 'ladakh';

export type DataQuality = 'high' | 'medium' | 'low';

export type TrendDirection = 'increasing' | 'stable' | 'decreasing';

export interface DistrictProfile {
  // Administrative
  id: string;
  slug: string;
  name: string;
  region: DistrictRegion;
  inKashmirValley: boolean;
  area: { value: number; unit: 'km²' };
  population: { total: number; density: number; year: number };
  headquarters: string;
  tehsils: string[];
  blocks: string[];
  
  // Ecological
  ecological: {
    forestCover: { area: number; percentage: number };
    protectedAreas: { count: number; area: number; percentage: number };
    ecosystemServices: string[];
    carbonStock: number;
  };
  
  // Hydrological
  hydrological: {
    watershedHierarchy: {
      basin: string;
      subBasin: string;
      catchment: string;
    };
    waterBodies: {
      lakes: number;
      wetlands: number;
      rivers: number;
      springs: number;
      total: number;
      area: number;
    };
    flowRegimes: {
      perennial: number;
      seasonal: number;
      intermittent: number;
    };
    groundwater: {
      level: number;
      trend: TrendDirection;
    };
    waterQuality: {
      excellent: number;
      good: number;
      moderate: number;
      poor: number;
      critical: number;
    };
    waterStressIndex: number;
  };
  
  // Biodiversity
  biodiversity: {
    totalSpecies: number;
    byTaxon: {
      mammals: number;
      birds: number;
      fish: number;
      plants: number;
      medicinalPlants: number;
    };
    endemism: {
      count: number;
      rate: number;
    };
    threatened: {
      count: number;
      rate: number;
      byIUCN: {
        CR: number;
        EN: number;
        VU: number;
      };
    };
    diversityIndices: {
      shannon: number;
      simpson: number;
    };
    primaryHabitats: string[];
    biodiversityHotspots: string[];
  };
  
  // Risk Stack
  riskStack: {
    flood: {
      score: number;
      trend: TrendDirection;
      alerts: number;
    };
    landslide: {
      score: number;
      trend: TrendDirection;
      alerts: number;
    };
    forestFire: {
      score: number;
      trend: TrendDirection;
      alerts: number;
    };
    seismic: {
      zone: number;
      score: number;
    };
    climate: {
      exposure: number;
      sensitivity: number;
      adaptiveCapacity: number;
    };
  };
  
  // Score Breakdown
  scores: {
    overall: number;
    ecologicalHealth: number;
    biodiversityRichness: number;
    waterSecurity: number;
    riskLevel: number;
    conservationStatus: number;
  };
  
  // Strengths, Pressures, Actions
  strengths: string[];
  pressures: string[];
  priorityActions: string[];
  
  // Seasonal Signature
  seasonalSignature: {
    spring: DistrictSeasonalSignature;
    summer: DistrictSeasonalSignature;
    autumn: DistrictSeasonalSignature;
    winter: DistrictSeasonalSignature;
  };
  
  // Evidence
  evidence: {
    reports: string[];
    managementPlans: string[];
    eiAs: string[];
    policyDocuments: string[];
    datasets: string[];
  };
  
  // Monitoring
  monitoring: {
    lastSurvey: string;
    activeProjects: number;
    sensors: number;
  };
  
  // Metadata
  lastUpdated: string;
  dataQuality: DataQuality;
}

export interface DistrictSeasonalSignature {
  district: string;
  season: SeasonType;
  primaryLandscapes: string[];
  bloomEvents: BloomEvent[];
  migrationEvents: MigrationEvent[];
  agriculturalActivities: AgriculturalActivity[];
  accessStatus: AccessStatus;
  tourismPotential: TourismPotential;
  climateSummary: string;
  averageTemp: { min: number; max: number };
  precipitation: string;
}

export interface BloomEvent {
  name: string;
  timing: {
    startMonth: number;
    endMonth: number;
    peakMonths?: number[];
    description: string;
  };
  location: string;
}

export interface MigrationEvent {
  name: string;
  species: string;
  timing: {
    startMonth: number;
    endMonth: number;
    peakMonths?: number[];
    description: string;
  };
  location: string;
  type: 'arrival' | 'departure' | 'peak';
}

export interface AgriculturalActivity {
  activity: string;
  timing: {
    startMonth: number;
    endMonth: number;
    peakMonths?: number[];
    description: string;
  };
  location: string;
}

export interface DistrictDifferenceReport {
  comparedDistricts: string[];
  differences: {
    category: string;
    leader: string;
    values: { district: string; value: number }[];
    percentDifference: number;
  }[];
}
