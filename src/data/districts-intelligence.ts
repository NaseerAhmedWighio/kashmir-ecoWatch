// District Profiles Intelligence Functions
// Enhanced district profiles with ecological, hydrological, biodiversity, and risk intelligence

import type {
  DistrictProfile,
  DistrictSeasonalSignature,
  TrendDirection,
} from '../types/districts';

import { getDistrictBiodiversity } from '../data/biodiversity-intelligence';
import { getDistrictWaterIntelligence } from '../data/hydrological-intelligence';
import { getDistrictSeasonalSignature } from '../data/seasonal-intelligence';
import { getHotspotCorridors, getLiveIncidents, getActiveRiskSnapshot } from '../data/risk-monitoring-command-center';
import { getLakeHealthScorecard } from '../data/hydrological-intelligence';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type DistrictRegion = 'kashmir-valley' | 'jammu' | 'ladakh';

export interface DistrictDifferenceReport {
  comparedDistricts: string[];
  differences: {
    category: string;
    leader: string;
    values: { district: string; value: number }[];
    percentDifference: number;
  }[];
}

// ============================================================================
// DISTRICT DATA
// ============================================================================

const districtsData: DistrictProfile[] = [
  {
    id: 'srinagar',
    slug: 'srinagar',
    name: 'Srinagar',
    region: 'kashmir-valley',
    inKashmirValley: true,
    area: { value: 2228, unit: 'km²' },
    population: { total: 1269751, density: 570, year: 2011 },
    headquarters: 'Srinagar',
    tehsils: ['Srinagar', 'Badgam', 'Pattan', 'Rafiabad'],
    blocks: ['Srinagar', 'Badgam', 'Pattan', 'Rafiabad', 'Chadoora'],
    ecological: {
      forestCover: { area: 892, percentage: 40.0 },
      protectedAreas: { count: 3, area: 234, percentage: 10.5 },
      ecosystemServices: ['Water purification', 'Flood regulation', 'Carbon sequestration', 'Tourism'],
      carbonStock: 2500000,
    },
    hydrological: {
      watershedHierarchy: {
        basin: 'Indus Basin',
        subBasin: 'Jhelum Basin',
        catchment: 'Srinagar Catchment',
      },
      waterBodies: {
        lakes: 4,
        wetlands: 3,
        rivers: 2,
        springs: 8,
        total: 17,
        area: 185,
      },
      flowRegimes: {
        perennial: 8,
        seasonal: 6,
        intermittent: 3,
      },
      groundwater: {
        level: 5.2,
        trend: 'decreasing' as TrendDirection,
      },
      waterQuality: {
        excellent: 2,
        good: 5,
        moderate: 7,
        poor: 3,
        critical: 0,
      },
      waterStressIndex: 58,
    },
    biodiversity: {
      totalSpecies: 892,
      byTaxon: {
        mammals: 23,
        birds: 312,
        fish: 12,
        plants: 489,
        medicinalPlants: 18,
      },
      endemism: {
        count: 8,
        rate: 0.9,
      },
      threatened: {
        count: 18,
        rate: 2.0,
        byIUCN: {
          CR: 1,
          EN: 5,
          VU: 12,
        },
      },
      diversityIndices: {
        shannon: 3.45,
        simpson: 0.89,
      },
      primaryHabitats: ['wetland', 'temperate-forest', 'riparian'],
      biodiversityHotspots: ['Dachigam National Park', 'Hokersar Wetland', 'Manasbal Lake'],
    },
    riskStack: {
      flood: {
        score: 72,
        trend: 'increasing',
        alerts: 2,
      },
      landslide: {
        score: 45,
        trend: 'stable',
        alerts: 0,
      },
      forestFire: {
        score: 38,
        trend: 'stable',
        alerts: 1,
      },
      seismic: {
        zone: 5,
        score: 85,
      },
      climate: {
        exposure: 65,
        sensitivity: 58,
        adaptiveCapacity: 45,
      },
    },
    scores: {
      overall: 68,
      ecologicalHealth: 72,
      biodiversityRichness: 75,
      waterSecurity: 62,
      riskLevel: 58,
      conservationStatus: 70,
    },
    strengths: [
      'Highest wetland bird concentration in Kashmir',
      'Dachigam National Park - Hangul habitat',
      'Multiple Ramsar sites (Hokersar, Shallabugh)',
      'Strong protected area network',
      'Rich medicinal plant diversity',
    ],
    pressures: [
      'Urban encroachment on wetlands',
      'Water pollution in Dal Lake',
      'High seismic risk (Zone 5)',
      'Flood prone areas',
      'Human-wildlife conflict in Dachigam fringe',
    ],
    priorityActions: [
      'Wetland conservation and restoration',
      'Pollution control in water bodies',
      'Flood management infrastructure',
      'Hangul conservation program',
      'Urban planning with ecological sensitivity',
    ],
    seasonalSignature: {
      spring: {
        district: 'srinagar',
        season: 'spring',
        primaryLandscapes: ['Dal Lake', 'Mughal Gardens', 'Dachigam'],
        bloomEvents: [
          { name: 'Almond Bloom', timing: { startMonth: 3, endMonth: 4, peakMonths: [3], description: 'March' }, location: 'Badamwari' },
          { name: 'Cherry Bloom', timing: { startMonth: 4, endMonth: 4, peakMonths: [4], description: 'April' }, location: 'Mughal Gardens' },
        ],
        migrationEvents: [
          { name: 'Waterfowl Departure', species: 'Migratory Ducks', timing: { startMonth: 3, endMonth: 4, peakMonths: [3], description: 'March-April' }, location: 'Hokersar', type: 'departure' },
        ],
        agriculturalActivities: [],
        accessStatus: 'open',
        tourismPotential: 'peak',
        climateSummary: 'Pleasant with occasional rain',
        averageTemp: { min: 8, max: 20 },
        precipitation: 'Moderate (60-80mm)',
      },
      summer: {
        district: 'srinagar',
        season: 'summer',
        primaryLandscapes: ['Dal Lake', 'Shankaracharya', 'Dachigam'],
        bloomEvents: [],
        migrationEvents: [],
        agriculturalActivities: [],
        accessStatus: 'open',
        tourismPotential: 'peak',
        climateSummary: 'Warm and pleasant',
        averageTemp: { min: 15, max: 30 },
        precipitation: 'Low (30-40mm)',
      },
      autumn: {
        district: 'srinagar',
        season: 'autumn',
        primaryLandscapes: ['Chinar trees', 'Mughal Gardens'],
        bloomEvents: [],
        migrationEvents: [
          { name: 'Waterfowl Arrival', species: 'Migratory Ducks', timing: { startMonth: 10, endMonth: 11, peakMonths: [11], description: 'October-November' }, location: 'Hokersar', type: 'arrival' },
        ],
        agriculturalActivities: [],
        accessStatus: 'open',
        tourismPotential: 'high',
        climateSummary: 'Cool with colorful foliage',
        averageTemp: { min: 10, max: 22 },
        precipitation: 'Moderate (40-60mm)',
      },
      winter: {
        district: 'srinagar',
        season: 'winter',
        primaryLandscapes: ['Snow-covered Dal', 'Frozen wetlands'],
        bloomEvents: [],
        migrationEvents: [],
        agriculturalActivities: [],
        accessStatus: 'limited',
        tourismPotential: 'moderate',
        climateSummary: 'Cold with occasional snowfall',
        averageTemp: { min: -2, max: 10 },
        precipitation: 'Moderate-High (snow)',
      },
    },
    evidence: {
      reports: ['district-profile-srinagar-2023', 'wetland-assessment-dal-2023'],
      managementPlans: ['dachigam-management-plan', 'hokersar-conservation-plan'],
      eiAs: ['srinagar-development-eia', 'wetland-encroachment-study'],
      policyDocuments: ['kashmir-valley-master-plan', 'wetland-conservation-policy'],
      datasets: ['srinagar-land-use', 'water-quality-monitoring', 'species-distribution'],
    },
    monitoring: {
      lastSurvey: '2023-12-01',
      activeProjects: 8,
      sensors: 12,
    },
    lastUpdated: '2024-03-20',
    dataQuality: 'high',
  },
  {
    id: 'anantnag',
    slug: 'anantnag',
    name: 'Anantnag',
    region: 'kashmir-valley',
    inKashmirValley: true,
    area: { value: 3574, unit: 'km²' },
    population: { total: 1078692, density: 302, year: 2011 },
    headquarters: 'Anantnag',
    tehsils: ['Anantnag', 'Pahalgam', 'Bijbehara', 'Dooru', 'Kokernag', 'Shangus'],
    blocks: ['Anantnag', 'Pahalgam', 'Bijbehara', 'Dooru', 'Kokernag', 'Shangus', 'Qazigund'],
    ecological: {
      forestCover: { area: 1785, percentage: 50.0 },
      protectedAreas: { count: 2, area: 567, percentage: 15.9 },
      ecosystemServices: ['Water regulation', 'Biodiversity conservation', 'Carbon sequestration', 'Tourism', 'Agriculture'],
      carbonStock: 4200000,
    },
    hydrological: {
      watershedHierarchy: {
        basin: 'Indus Basin',
        subBasin: 'Jhelum Basin',
        catchment: 'Lidder Catchment',
      },
      waterBodies: {
        lakes: 2,
        wetlands: 1,
        rivers: 3,
        springs: 15,
        total: 21,
        area: 95,
      },
      flowRegimes: {
        perennial: 12,
        seasonal: 6,
        intermittent: 3,
      },
      groundwater: {
        level: 8.5,
        trend: 'stable',
      },
      waterQuality: {
        excellent: 8,
        good: 9,
        moderate: 4,
        poor: 0,
        critical: 0,
      },
      waterStressIndex: 35,
    },
    biodiversity: {
      totalSpecies: 734,
      byTaxon: {
        mammals: 28,
        birds: 234,
        fish: 15,
        plants: 412,
        medicinalPlants: 28,
      },
      endemism: {
        count: 12,
        rate: 1.6,
      },
      threatened: {
        count: 23,
        rate: 3.1,
        byIUCN: {
          CR: 1,
          EN: 8,
          VU: 14,
        },
      },
      diversityIndices: {
        shannon: 3.62,
        simpson: 0.91,
      },
      primaryHabitats: ['temperate-forest', 'alpine-meadow', 'coniferous-forest'],
      biodiversityHotspots: ['Overa-Aru Wildlife Sanctuary', 'Betaab Valley', 'Kokernag'],
    },
    riskStack: {
      flood: {
        score: 45,
        trend: 'stable',
        alerts: 0,
      },
      landslide: {
        score: 58,
        trend: 'increasing',
        alerts: 1,
      },
      forestFire: {
        score: 52,
        trend: 'stable',
        alerts: 2,
      },
      seismic: {
        zone: 5,
        score: 85,
      },
      climate: {
        exposure: 58,
        sensitivity: 52,
        adaptiveCapacity: 48,
      },
    },
    scores: {
      overall: 72,
      ecologicalHealth: 78,
      biodiversityRichness: 76,
      waterSecurity: 75,
      riskLevel: 55,
      conservationStatus: 75,
    },
    strengths: [
      'Overa-Aru Wildlife Sanctuary - High biodiversity',
      'Lidder River - Pristine water quality',
      'Kokernag springs - Excellent water quality',
      'High forest cover (50%)',
      'Rich medicinal plant landscapes',
      'Betaab Valley - Tourism and ecology balance',
    ],
    pressures: [
      'Human-wildlife conflict (highest in Kashmir)',
      'Landslide risk in hilly areas',
      'Tourism pressure in sensitive areas',
      'Forest fire risk',
      'Seismic Zone 5',
    ],
    priorityActions: [
      'Human-wildlife conflict mitigation',
      'Landslide hazard zonation and management',
      'Sustainable tourism planning',
      'Forest fire prevention',
      'Medicinal plant conservation',
    ],
    seasonalSignature: {
      spring: {
        district: 'anantnag',
        season: 'spring',
        primaryLandscapes: ['Kokernag', 'Betaab Valley', 'Overa-Aru'],
        bloomEvents: [],
        migrationEvents: [],
        agriculturalActivities: [],
        accessStatus: 'open',
        tourismPotential: 'high',
        climateSummary: 'Pleasant with occasional rain',
        averageTemp: { min: 10, max: 22 },
        precipitation: 'Moderate (70-90mm)',
      },
      summer: {
        district: 'anantnag',
        season: 'summer',
        primaryLandscapes: ['Pahalgam', 'Betaab Valley', 'Aru'],
        bloomEvents: [],
        migrationEvents: [],
        agriculturalActivities: [],
        accessStatus: 'open',
        tourismPotential: 'peak',
        climateSummary: 'Cool and pleasant',
        averageTemp: { min: 15, max: 28 },
        precipitation: 'Low (40-50mm)',
      },
      autumn: {
        district: 'anantnag',
        season: 'autumn',
        primaryLandscapes: ['Overa-Aru', 'Lidder Valley'],
        bloomEvents: [],
        migrationEvents: [],
        agriculturalActivities: [],
        accessStatus: 'open',
        tourismPotential: 'moderate',
        climateSummary: 'Cool with clear skies',
        averageTemp: { min: 8, max: 20 },
        precipitation: 'Low (30-40mm)',
      },
      winter: {
        district: 'anantnag',
        season: 'winter',
        primaryLandscapes: ['Snow-covered Pahalgam', 'Frozen streams'],
        bloomEvents: [],
        migrationEvents: [],
        agriculturalActivities: [],
        accessStatus: 'limited',
        tourismPotential: 'low',
        climateSummary: 'Cold with heavy snowfall in upper reaches',
        averageTemp: { min: -5, max: 8 },
        precipitation: 'High (snow)',
      },
    },
    evidence: {
      reports: ['district-profile-anantnag-2023', 'overa-aru-biodiversity-assessment'],
      managementPlans: ['overa-aru-management-plan', 'lidder-watershed-plan'],
      eiAs: ['pahalgam-development-eia'],
      policyDocuments: ['kashmir-valley-master-plan'],
      datasets: ['anantnag-land-use', 'lidder-water-quality', 'overa-aru-species'],
    },
    monitoring: {
      lastSurvey: '2023-11-15',
      activeProjects: 6,
      sensors: 8,
    },
    lastUpdated: '2024-03-20',
    dataQuality: 'high',
  },
];

// Add placeholder data for remaining 14 districts
const remainingDistricts = [
  { slug: 'baramulla', name: 'Baramulla', region: 'kashmir-valley' as DistrictRegion },
  { slug: 'budgam', name: 'Budgam', region: 'kashmir-valley' as DistrictRegion },
  { slug: 'ganderbal', name: 'Ganderbal', region: 'kashmir-valley' as DistrictRegion },
  { slug: 'kulgam', name: 'Kulgam', region: 'kashmir-valley' as DistrictRegion },
  { slug: 'kupwara', name: 'Kupwara', region: 'kashmir-valley' as DistrictRegion },
  { slug: 'pulwama', name: 'Pulwama', region: 'kashmir-valley' as DistrictRegion },
  { slug: 'shopian', name: 'Shopian', region: 'kashmir-valley' as DistrictRegion },
  { slug: 'bandipora', name: 'Bandipora', region: 'kashmir-valley' as DistrictRegion },
  { slug: 'doda', name: 'Doda', region: 'jammu' as DistrictRegion },
  { slug: 'ramban', name: 'Ramban', region: 'jammu' as DistrictRegion },
  { slug: 'rajouri', name: 'Rajouri', region: 'jammu' as DistrictRegion },
  { slug: 'poonch', name: 'Poonch', region: 'jammu' as DistrictRegion },
  { slug: 'kathua', name: 'Kathua', region: 'jammu' as DistrictRegion },
  { slug: 'kishtwar', name: 'Kishtwar', region: 'jammu' as DistrictRegion },
];

// Generate placeholder profiles for remaining districts
remainingDistricts.forEach((d, index) => {
  const bioData = getDistrictBiodiversity.byDistrict(d.slug as any);
  const waterData = getDistrictWaterIntelligence(d.slug);
  
  districtsData.push({
    id: d.slug,
    slug: d.slug,
    name: d.name,
    region: d.region,
    inKashmirValley: d.region === 'kashmir-valley',
    area: { value: 2000 + index * 200, unit: 'km²' },
    population: { total: 500000 + index * 50000, density: 250 + index * 20, year: 2011 },
    headquarters: d.name,
    tehsils: [d.name],
    blocks: [d.name],
    ecological: {
      forestCover: { area: 800, percentage: 40.0 },
      protectedAreas: { count: 2, area: 300, percentage: 15.0 },
      ecosystemServices: ['Water regulation', 'Biodiversity conservation'],
      carbonStock: 2000000,
    },
    hydrological: {
      watershedHierarchy: {
        basin: 'Indus Basin',
        subBasin: 'Jhelum Basin',
        catchment: `${d.name} Catchment`,
      },
      waterBodies: {
        lakes: waterData.waterBodies.lakes,
        wetlands: waterData.waterBodies.wetlands,
        rivers: waterData.waterBodies.rivers,
        springs: waterData.waterBodies.springs,
        total: waterData.waterBodies.total,
        area: 95,
      },
      flowRegimes: {
        perennial: 10,
        seasonal: 5,
        intermittent: 3,
      },
      groundwater: {
        level: 6.0,
        trend: 'stable',
      },
      waterQuality: waterData.waterQualityStatus,
      waterStressIndex: 45,
    },
    biodiversity: bioData ? {
      totalSpecies: bioData.totalSpecies,
      byTaxon: {
        mammals: bioData.mammals,
        birds: bioData.birds,
        fish: bioData.fish,
        plants: bioData.plants,
        medicinalPlants: bioData.medicinalPlants,
      },
      endemism: {
        count: bioData.endemicSpecies,
        rate: (bioData.endemicSpecies / bioData.totalSpecies) * 100,
      },
      threatened: {
        count: bioData.threatenedSpecies,
        rate: (bioData.threatenedSpecies / bioData.totalSpecies) * 100,
        byIUCN: { CR: 1, EN: 5, VU: 10 },
      },
      diversityIndices: {
        shannon: 3.5,
        simpson: 0.9,
      },
      primaryHabitats: bioData.primaryHabitats,
      biodiversityHotspots: bioData.biodiversityHotspots,
    } : {
      totalSpecies: 500,
      byTaxon: { mammals: 20, birds: 150, fish: 10, plants: 300, medicinalPlants: 20 },
      endemism: { count: 5, rate: 1.0 },
      threatened: { count: 15, rate: 3.0, byIUCN: { CR: 0, EN: 3, VU: 12 } },
      diversityIndices: { shannon: 3.2, simpson: 0.85 },
      primaryHabitats: ['temperate-forest'],
      biodiversityHotspots: [],
    },
    riskStack: {
      flood: { score: 50, trend: 'stable', alerts: 0 },
      landslide: { score: 50, trend: 'stable', alerts: 0 },
      forestFire: { score: 45, trend: 'stable', alerts: 1 },
      seismic: { zone: 5, score: 85 },
      climate: { exposure: 60, sensitivity: 55, adaptiveCapacity: 50 },
    },
    scores: {
      overall: 65,
      ecologicalHealth: 70,
      biodiversityRichness: 68,
      waterSecurity: 65,
      riskLevel: 60,
      conservationStatus: 65,
    },
    strengths: ['Rich biodiversity', 'Good forest cover'],
    pressures: ['Climate change', 'Development pressure'],
    priorityActions: ['Conservation planning', 'Sustainable development'],
    seasonalSignature: {
      spring: {
        district: d.slug,
        season: 'spring',
        primaryLandscapes: [],
        bloomEvents: [],
        migrationEvents: [],
        agriculturalActivities: [],
        accessStatus: 'open',
        tourismPotential: 'high',
        climateSummary: 'Pleasant',
        averageTemp: { min: 10, max: 22 },
        precipitation: 'Moderate',
      },
      summer: {
        district: d.slug,
        season: 'summer',
        primaryLandscapes: [],
        bloomEvents: [],
        migrationEvents: [],
        agriculturalActivities: [],
        accessStatus: 'open',
        tourismPotential: 'peak',
        climateSummary: 'Warm',
        averageTemp: { min: 15, max: 30 },
        precipitation: 'Low',
      },
      autumn: {
        district: d.slug,
        season: 'autumn',
        primaryLandscapes: [],
        bloomEvents: [],
        migrationEvents: [],
        agriculturalActivities: [],
        accessStatus: 'open',
        tourismPotential: 'high',
        climateSummary: 'Cool',
        averageTemp: { min: 8, max: 22 },
        precipitation: 'Moderate',
      },
      winter: {
        district: d.slug,
        season: 'winter',
        primaryLandscapes: [],
        bloomEvents: [],
        migrationEvents: [],
        agriculturalActivities: [],
        accessStatus: 'limited',
        tourismPotential: 'moderate',
        climateSummary: 'Cold',
        averageTemp: { min: -2, max: 10 },
        precipitation: 'Moderate-High',
      },
    },
    evidence: {
      reports: [],
      managementPlans: [],
      eiAs: [],
      policyDocuments: [],
      datasets: [],
    },
    monitoring: {
      lastSurvey: '2023-06-01',
      activeProjects: 3,
      sensors: 5,
    },
    lastUpdated: '2024-03-20',
    dataQuality: 'medium',
  });
});

// ============================================================================
// DATA ACCESS FUNCTIONS
// ============================================================================

export function getDistrictProfile(slug: string): DistrictProfile | null {
  return districtsData.find(d => d.slug === slug) || null;
}

export function getAllDistrictProfiles(kashmirOnly: boolean = true): DistrictProfile[] {
  if (kashmirOnly) {
    return districtsData.filter(d => d.inKashmirValley);
  }
  return districtsData;
}

export function getKashmirValleyDistricts(): DistrictProfile[] {
  return districtsData.filter(d => d.inKashmirValley);
}

export function getAllJAndKDistricts(): DistrictProfile[] {
  return districtsData;
}

// ============================================================================
// SCORE CALCULATIONS
// ============================================================================

export function calculateDistrictScore(profile: DistrictProfile): number {
  const ecologicalHealth = calculateEcologicalHealth(profile);
  const biodiversityRichness = calculateBiodiversityRichness(profile);
  const waterSecurity = calculateWaterSecurity(profile);
  const riskLevel = calculateRiskLevel(profile);
  const conservationStatus = calculateConservationStatus(profile);
  
  return Math.round(
    ecologicalHealth * 0.30 +
    biodiversityRichness * 0.25 +
    waterSecurity * 0.20 +
    (100 - riskLevel) * 0.15 +
    conservationStatus * 0.10
  );
}

export function calculateEcologicalHealth(profile: DistrictProfile): number {
  const forestScore = Math.min(100, profile.ecological.forestCover.percentage * 2);
  const paScore = Math.min(100, profile.ecological.protectedAreas.percentage * 5);
  const carbonScore = Math.min(100, profile.ecological.carbonStock / 50000);
  
  return Math.round((forestScore + paScore + carbonScore) / 3);
}

export function calculateBiodiversityRichness(profile: DistrictProfile): number {
  const speciesScore = Math.min(100, profile.biodiversity.totalSpecies / 10);
  const endemismScore = profile.biodiversity.endemism.rate * 10;
  const diversityScore = profile.biodiversity.diversityIndices.shannon * 20;
  
  return Math.round((speciesScore + endemismScore + diversityScore) / 3);
}

export function calculateWaterSecurity(profile: DistrictProfile): number {
  const quantityScore = Math.min(100, profile.hydrological.waterBodies.total * 5);
  const qualityScore = (
    profile.hydrological.waterQuality.excellent * 100 +
    profile.hydrological.waterQuality.good * 80 +
    profile.hydrological.waterQuality.moderate * 60 +
    profile.hydrological.waterQuality.poor * 40 +
    profile.hydrological.waterQuality.critical * 20
  ) / (profile.hydrological.waterBodies.total || 1);
  const stressScore = 100 - profile.hydrological.waterStressIndex;
  
  return Math.round((quantityScore + qualityScore + stressScore) / 3);
}

export function calculateRiskLevel(profile: DistrictProfile): number {
  const floodRisk = profile.riskStack.flood.score;
  const landslideRisk = profile.riskStack.landslide.score;
  const fireRisk = profile.riskStack.forestFire.score;
  const seismicRisk = profile.riskStack.seismic.score;
  const climateRisk = (profile.riskStack.climate.exposure + profile.riskStack.climate.sensitivity - profile.riskStack.climate.adaptiveCapacity) / 2;
  
  return Math.round((floodRisk + landslideRisk + fireRisk + seismicRisk + climateRisk) / 5);
}

export function calculateConservationStatus(profile: DistrictProfile): number {
  const paCoverage = profile.ecological.protectedAreas.percentage * 5;
  const threatenedRate = profile.biodiversity.threatened.rate;
  const conservationScore = Math.max(0, 100 - threatenedRate * 10);
  
  return Math.round((paCoverage + conservationScore) / 2);
}

// ============================================================================
// COMPARISON FUNCTIONS
// ============================================================================

export function compareDistricts(slugs: string[]): DistrictProfile[] {
  return slugs
    .map(slug => getDistrictProfile(slug))
    .filter((d): d is DistrictProfile => d !== null);
}

export function getDistrictRankings(metric: string): { district: string; value: number; rank: number }[] {
  const rankings = districtsData.map(d => {
    let value = 0;
    
    switch (metric) {
      case 'overall':
        value = d.scores.overall;
        break;
      case 'biodiversity':
        value = d.biodiversity.totalSpecies;
        break;
      case 'forest-cover':
        value = d.ecological.forestCover.percentage;
        break;
      case 'water-security':
        value = d.scores.waterSecurity;
        break;
      case 'risk':
        value = 100 - calculateRiskLevel(d);
        break;
      default:
        value = d.scores.overall;
    }
    
    return { district: d.slug, value, rank: 0 };
  });
  
  rankings.sort((a, b) => b.value - a.value);
  rankings.forEach((r, i) => r.rank = i + 1);
  
  return rankings;
}

export function getDistrictDifferences(districts: DistrictProfile[]): DistrictDifferenceReport {
  const differences: DistrictDifferenceReport['differences'] = [];
  
  // Compare overall scores
  const overallValues = districts.map(d => ({ district: d.slug, value: d.scores.overall }));
  const maxOverall = Math.max(...overallValues.map(v => v.value));
  const minOverall = Math.min(...overallValues.map(v => v.value));
  
  differences.push({
    category: 'Overall Score',
    leader: districts.find(d => d.scores.overall === maxOverall)?.slug || '',
    values: overallValues,
    percentDifference: Math.round(((maxOverall - minOverall) / minOverall) * 100),
  });
  
  // Compare biodiversity
  const bioValues = districts.map(d => ({ district: d.slug, value: d.biodiversity.totalSpecies }));
  const maxBio = Math.max(...bioValues.map(v => v.value));
  const minBio = Math.min(...bioValues.map(v => v.value));
  
  differences.push({
    category: 'Species Richness',
    leader: districts.find(d => d.biodiversity.totalSpecies === maxBio)?.slug || '',
    values: bioValues,
    percentDifference: Math.round(((maxBio - minBio) / minBio) * 100),
  });
  
  // Compare water security
  const waterValues = districts.map(d => ({ district: d.slug, value: d.scores.waterSecurity }));
  const maxWater = Math.max(...waterValues.map(v => v.value));
  const minWater = Math.min(...waterValues.map(v => v.value));
  
  differences.push({
    category: 'Water Security',
    leader: districts.find(d => d.scores.waterSecurity === maxWater)?.slug || '',
    values: waterValues,
    percentDifference: Math.round(((maxWater - minWater) / minWater) * 100),
  });
  
  return {
    comparedDistricts: districts.map(d => d.slug),
    differences,
  };
}

// ============================================================================
// EXPORT ALL
// ============================================================================

export { districtsData };
