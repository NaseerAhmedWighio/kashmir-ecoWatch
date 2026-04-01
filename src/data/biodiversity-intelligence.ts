// Biodiversity Intelligence Data Service
// Habitat systems, district biodiversity, and conservation analytics

import type { KashmirDistrict, HabitatType } from './trails-sightings';
import type {
  HabitatPressureIndex,
  VulnerabilityTrendPoint,
  PressureTrend,
} from '../types/biodiversity';

// ============================================================================
// HABITAT BIODIVERSITY DATA (ENHANCED)
// ============================================================================

export interface HabitatBiodiversity {
  id: string;
  slug: string;
  name: string;
  description: string;
  areaKm2: number;
  percentOfKashmir: number;
  districts: KashmirDistrict[];
  speciesCount: number;
  endemicSpecies: number;
  threatenedSpecies: number;
  migratorySpecies: number;
  byTaxonomicGroup: {
    mammals: number;
    birds: number;
    fish: number;
    plants: number;
    medicinalPlants: number;
  };
  protectedAreaOverlap: number;
  ramserSites?: number;
  vulnerabilityScore: 'low' | 'medium' | 'high' | 'critical';
  pressureIndex: HabitatPressureIndex;
  vulnerabilityTrend: VulnerabilityTrendPoint[];
  riskDrivers: string[];
  speciesList: string[];
  relatedProtectedAreas: string[];
  relatedWaterSystems?: string[];
  relatedTrails?: string[];
  flagshipSpecies: string[];
  imageUrl?: string;
}

export const habitatBiodiversityData: HabitatBiodiversity[] = [
  {
    id: 'forest-biodiversity',
    slug: 'forest-biodiversity',
    name: 'Forest Biodiversity',
    description: 'Temperate, coniferous, and oak forests supporting Kashmir\'s terrestrial wildlife including Hangul, Markhor, bears, and pheasants.',
    areaKm2: 8934,
    percentOfKashmir: 40.2,
    districts: ['Srinagar', 'Anantnag', 'Kupwara', 'Baramulla', 'Kishtwar', 'Doda', 'Kulgam', 'Pulwama'],
    speciesCount: 1456,
    endemicSpecies: 23,
    threatenedSpecies: 34,
    migratorySpecies: 67,
    byTaxonomicGroup: {
      mammals: 45,
      birds: 189,
      fish: 12,
      plants: 1156,
      medicinalPlants: 54
    },
    protectedAreaOverlap: 3420,
    vulnerabilityScore: 'medium',
    pressureIndex: {
      habitatSlug: 'forest-biodiversity',
      overallScore: 58,
      trend: 'declining',
      drivers: {
        habitatFragmentation: 65,
        loggingPressure: 58,
        grazingPressure: 52,
        climateChange: 48,
        pollution: 23,
        hydrologicalChange: 34,
        humanDisturbance: 61,
      },
      mitigationActions: [
        'Forest corridor restoration',
        'Sustainable logging practices',
        'Grazing management zones',
        'Community forest protection',
      ],
      lastAssessmentDate: '2023-12-01',
    },
    vulnerabilityTrend: [
      { year: 2018, score: 45, assessment: 'Moderate pressure' },
      { year: 2019, score: 48, assessment: 'Increasing fragmentation' },
      { year: 2020, score: 51, assessment: 'Logging pressure up' },
      { year: 2021, score: 53, assessment: 'Climate impacts visible' },
      { year: 2022, score: 55, assessment: 'Grazing expansion' },
      { year: 2023, score: 58, assessment: 'Cumulative pressures' },
    ],
    riskDrivers: ['Habitat fragmentation', 'Logging pressure', 'Grazing', 'Climate change'],
    speciesList: ['hangul', 'markhor', 'himalayan-black-bear', 'western-tragopan', 'himalayan-monals'],
    relatedProtectedAreas: ['dachigam-national-park', 'overa-aru-wildlife-sanctuary', 'hirpora-wildlife-sanctuary'],
    relatedTrails: ['dachigam-hangul-trail', 'overa-aru-wildlife-circuit'],
    flagshipSpecies: ['hangul', 'markhor', 'himalayan-black-bear', 'western-tragopan'],
    imageUrl: '/images/habitats/forest-biodiversity.jpg'
  },
  
  {
    id: 'wetland-biodiversity',
    slug: 'wetland-biodiversity',
    name: 'Wetland Biodiversity',
    description: 'Lakes, marshes, and Ramsar wetlands supporting migratory waterbirds, aquatic species, and wetland-dependent flora.',
    areaKm2: 1247,
    percentOfKashmir: 5.6,
    districts: ['Srinagar', 'Ganderbal', 'Baramulla', 'Budgam', 'Anantnag'],
    speciesCount: 892,
    endemicSpecies: 8,
    threatenedSpecies: 23,
    migratorySpecies: 234,
    byTaxonomicGroup: {
      mammals: 12,
      birds: 312,
      fish: 23,
      plants: 456,
      medicinalPlants: 12
    },
    protectedAreaOverlap: 456,
    ramserSites: 3,
    vulnerabilityScore: 'high',
    pressureIndex: {
      habitatSlug: 'wetland-biodiversity',
      overallScore: 76,
      trend: 'declining',
      drivers: {
        habitatFragmentation: 72,
        loggingPressure: 15,
        grazingPressure: 34,
        climateChange: 58,
        pollution: 82,
        hydrologicalChange: 85,
        humanDisturbance: 78,
      },
      mitigationActions: [
        'Wetland restoration',
        'Pollution control',
        'Encroachment removal',
        'Ramsar site management',
      ],
      lastAssessmentDate: '2023-12-01',
    },
    vulnerabilityTrend: [
      { year: 2018, score: 65, assessment: 'Moderate-high pressure' },
      { year: 2019, score: 68, assessment: 'Encroachment increasing' },
      { year: 2020, score: 70, assessment: 'Pollution levels up' },
      { year: 2021, score: 72, assessment: 'Eutrophication visible' },
      { year: 2022, score: 74, assessment: 'Water extraction up' },
      { year: 2023, score: 76, assessment: 'Critical wetland stress' },
    ],
    riskDrivers: ['Encroachment', 'Pollution', 'Eutrophication', 'Water extraction', 'Climate change'],
    speciesList: ['wetland-bird-group', 'sarus-crane'],
    relatedProtectedAreas: ['hokersar-wetland', 'shallabugh-wetland'],
    relatedWaterSystems: ['hokersar', 'shallabugh', 'manasbal-lake'],
    relatedTrails: ['hokersar-wetland-boardwalk', 'shallabugh-crane-sanctuary-trail', 'manasbal-lake-birding-circuit'],
    flagshipSpecies: ['sarus-crane', 'wetland-bird-group'],
    imageUrl: '/images/habitats/wetland-biodiversity.jpg'
  },

  {
    id: 'alpine-biodiversity',
    slug: 'alpine-biodiversity',
    name: 'Alpine Biodiversity',
    description: 'High-altitude meadows, cryosphere, and alpine ecosystems supporting specialized flora and fauna adapted to extreme conditions.',
    areaKm2: 4567,
    percentOfKashmir: 20.5,
    districts: ['Kishtwar', 'Doda', 'Anantnag', 'Kupwara'],
    speciesCount: 678,
    endemicSpecies: 45,
    threatenedSpecies: 18,
    migratorySpecies: 34,
    byTaxonomicGroup: {
      mammals: 18,
      birds: 67,
      fish: 8,
      plants: 534,
      medicinalPlants: 51
    },
    protectedAreaOverlap: 2340,
    vulnerabilityScore: 'high',
    pressureIndex: {
      habitatSlug: 'alpine-biodiversity',
      overallScore: 68,
      trend: 'declining',
      drivers: {
        habitatFragmentation: 45,
        loggingPressure: 12,
        grazingPressure: 67,
        climateChange: 89,
        pollution: 23,
        hydrologicalChange: 56,
        humanDisturbance: 52,
      },
      mitigationActions: [
        'Grazing management',
        'Climate adaptation',
        'Tourism regulation',
        'Alpine meadow protection',
      ],
      lastAssessmentDate: '2023-12-01',
    },
    vulnerabilityTrend: [
      { year: 2018, score: 58, assessment: 'Moderate pressure' },
      { year: 2019, score: 60, assessment: 'Glacial retreat accelerating' },
      { year: 2020, score: 62, assessment: 'Tourism pressure up' },
      { year: 2021, score: 64, assessment: 'Grazing expansion' },
      { year: 2022, score: 66, assessment: 'Climate impacts severe' },
      { year: 2023, score: 68, assessment: 'Alpine ecosystem stress' },
    ],
    riskDrivers: ['Climate change', 'Glacial retreat', 'Overgrazing', 'Tourism pressure'],
    speciesList: ['himalayan-brown-bear', 'snow-leopard', 'alpine-flora-group'],
    relatedProtectedAreas: ['hemis-national-park', 'kishtwar-national-park'],
    relatedTrails: ['kolahoi-glacier-expedition', 'tarsar-marsar-bloom-trek'],
    flagshipSpecies: ['himalayan-brown-bear', 'snow-leopard', 'alpine-flora-group'],
    imageUrl: '/images/habitats/alpine-biodiversity.jpg'
  },

  {
    id: 'river-stream-biodiversity',
    slug: 'river-stream-biodiversity',
    name: 'River & Stream Biodiversity',
    description: 'Freshwater ecosystems including Jhelum, Indus tributaries, and cold-water streams supporting aquatic biodiversity.',
    areaKm2: 892,
    percentOfKashmir: 4.0,
    districts: ['Srinagar', 'Anantnag', 'Baramulla', 'Kupwara', 'Kishtwar'],
    speciesCount: 456,
    endemicSpecies: 12,
    threatenedSpecies: 15,
    migratorySpecies: 23,
    byTaxonomicGroup: {
      mammals: 8,
      birds: 89,
      fish: 23,
      plants: 289,
      medicinalPlants: 8
    },
    protectedAreaOverlap: 234,
    vulnerabilityScore: 'medium',
    pressureIndex: {
      habitatSlug: 'river-stream-biodiversity',
      overallScore: 54,
      trend: 'stable',
      drivers: {
        habitatFragmentation: 48,
        loggingPressure: 23,
        grazingPressure: 45,
        climateChange: 52,
        pollution: 67,
        hydrologicalChange: 72,
        humanDisturbance: 48,
      },
      mitigationActions: [
        'Riparian buffer restoration',
        'Pollution reduction',
        'Sustainable fishing',
        'Flow regime management',
      ],
      lastAssessmentDate: '2023-12-01',
    },
    vulnerabilityTrend: [
      { year: 2018, score: 52, assessment: 'Moderate pressure' },
      { year: 2019, score: 52, assessment: 'Stable conditions' },
      { year: 2020, score: 53, assessment: 'Pollution concerns' },
      { year: 2021, score: 53, assessment: 'Flow alterations' },
      { year: 2022, score: 54, assessment: 'Climate impacts' },
      { year: 2023, score: 54, assessment: 'Stable but pressured' },
    ],
    riskDrivers: ['Water pollution', 'Overfishing', 'Hydrological alteration', 'Climate change'],
    speciesList: ['snow-trout-group', 'trout-systems'],
    relatedProtectedAreas: [],
    relatedWaterSystems: ['jhelum-river', 'indus-river', 'lidder-river'],
    relatedTrails: ['betaab-valley-meadow-walk'],
    flagshipSpecies: ['snow-trout-group', 'trout-systems'],
    imageUrl: '/images/habitats/river-biodiversity.jpg'
  },

  {
    id: 'meadow-grassland-biodiversity',
    slug: 'meadow-grassland-biodiversity',
    name: 'Meadow & Grassland Biodiversity',
    description: 'Valley meadows (margs), pasture lands, and grassland ecosystems supporting ungulates, birds, and wildflower diversity.',
    areaKm2: 2345,
    percentOfKashmir: 10.5,
    districts: ['Anantnag', 'Srinagar', 'Ganderbal', 'Baramulla', 'Kupwara'],
    speciesCount: 734,
    endemicSpecies: 18,
    threatenedSpecies: 12,
    migratorySpecies: 89,
    byTaxonomicGroup: {
      mammals: 23,
      birds: 134,
      fish: 4,
      plants: 512,
      medicinalPlants: 23
    },
    protectedAreaOverlap: 890,
    vulnerabilityScore: 'medium',
    pressureIndex: {
      habitatSlug: 'meadow-grassland-biodiversity',
      overallScore: 52,
      trend: 'stable',
      drivers: {
        habitatFragmentation: 48,
        loggingPressure: 18,
        grazingPressure: 78,
        climateChange: 45,
        pollution: 28,
        hydrologicalChange: 34,
        humanDisturbance: 56,
      },
      mitigationActions: [
        'Grazing rotation',
        'Meadow restoration',
        'Invasive species control',
        'Pasture management',
      ],
      lastAssessmentDate: '2023-12-01',
    },
    vulnerabilityTrend: [
      { year: 2018, score: 48, assessment: 'Moderate pressure' },
      { year: 2019, score: 49, assessment: 'Grazing pressure stable' },
      { year: 2020, score: 50, assessment: 'Agricultural conversion' },
      { year: 2021, score: 51, assessment: 'Invasive species' },
      { year: 2022, score: 51, assessment: 'Climate variability' },
      { year: 2023, score: 52, assessment: 'Stable management needed' },
    ],
    riskDrivers: ['Grazing pressure', 'Agricultural conversion', 'Climate change', 'Invasive species'],
    speciesList: ['hangul', 'himalayan-monals'],
    relatedProtectedAreas: ['dachigam-national-park', 'overa-aru-wildlife-sanctuary'],
    relatedTrails: ['betaab-valley-meadow-walk'],
    flagshipSpecies: ['hangul', 'himalayan-monals'],
    imageUrl: '/images/habitats/meadow-biodiversity.jpg'
  }
];

// ============================================================================
// DISTRICT BIODIVERSITY DATA (ENHANCED)
// ============================================================================

export type ConflictLevel = 'low' | 'medium' | 'high' | 'critical';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface DistrictBiodiversity {
  district: string;
  totalSpecies: number;
  mammals: number;
  birds: number;
  fish: number;
  plants: number;
  medicinalPlants: number;
  threatenedSpecies: number;
  endemicSpecies: number;
  migratorySpecies: number;
  primaryHabitats: string[];
  protectedAreaCoverage: number;
  biodiversityHotspots: string[];
  wetlandBirdConcentration?: number;
  alpineBiodiversityScore?: number;
  medicinalPlantLandscapes?: string[];
  habitatLossRisk: RiskLevel;
  humanWildlifeConflict: ConflictLevel;
  speciesList: string[];
  endemicSpeciesList: string[];
  threatenedSpeciesList: string[];
  relatedProtectedAreas: string[];
  relatedTrails: string[];
  monitoringSites?: string[];
  lastSurveyYear?: number;
}

export const districtBiodiversityData: DistrictBiodiversity[] = [
  {
    district: 'Srinagar',
    totalSpecies: 892,
    mammals: 23,
    birds: 312,
    fish: 12,
    plants: 489,
    medicinalPlants: 18,
    threatenedSpecies: 18,
    endemicSpecies: 8,
    migratorySpecies: 156,
    primaryHabitats: ['wetland', 'temperate-forest', 'riparian'],
    protectedAreaCoverage: 234,
    biodiversityHotspots: ['Dachigam National Park', 'Hokersar Wetland', 'Manasbal Lake'],
    wetlandBirdConcentration: 234,
    medicinalPlantLandscapes: ['Dachigam forests'],
    habitatLossRisk: 'medium',
    humanWildlifeConflict: 'medium',
    speciesList: ['hangul', 'wetland-bird-group', 'himalayan-black-bear'],
    endemicSpeciesList: ['hangul'],
    threatenedSpeciesList: ['hangul', 'himalayan-black-bear'],
    relatedProtectedAreas: ['dachigam-national-park', 'hokersar-wetland'],
    relatedTrails: ['dachigam-hangul-trail', 'hokersar-wetland-boardwalk'],
    monitoringSites: ['Dachigam NP', 'Hokersar WLS'],
    lastSurveyYear: 2023,
  },
  {
    district: 'Anantnag',
    totalSpecies: 734,
    mammals: 28,
    birds: 234,
    fish: 15,
    plants: 412,
    medicinalPlants: 28,
    threatenedSpecies: 23,
    endemicSpecies: 12,
    migratorySpecies: 89,
    primaryHabitats: ['temperate-forest', 'alpine-meadow', 'coniferous-forest'],
    protectedAreaCoverage: 567,
    biodiversityHotspots: ['Overa-Aru Wildlife Sanctuary', 'Betaab Valley', 'Kokernag'],
    alpineBiodiversityScore: 87,
    medicinalPlantLandscapes: ['Kishtwar highlands', 'Dachigam slopes'],
    habitatLossRisk: 'medium',
    humanWildlifeConflict: 'high',
    speciesList: ['hangul', 'musk-deer', 'western-tragopan', 'kashmir-flycatcher'],
    endemicSpeciesList: ['kashmir-flycatcher'],
    threatenedSpeciesList: ['hangul', 'musk-deer', 'western-tragopan'],
    relatedProtectedAreas: ['overa-aru-wildlife-sanctuary'],
    relatedTrails: ['overa-aru-wildlife-circuit', 'betaab-valley-meadow-walk', 'tarsar-marsar-bloom-trek'],
    monitoringSites: ['Overa-Aru WLS'],
    lastSurveyYear: 2023,
  },
  {
    district: 'Kishtwar',
    totalSpecies: 623,
    mammals: 34,
    birds: 189,
    fish: 8,
    plants: 356,
    medicinalPlants: 36,
    threatenedSpecies: 28,
    endemicSpecies: 18,
    migratorySpecies: 45,
    primaryHabitats: ['alpine-meadow', 'coniferous-forest', 'high-altitude-desert'],
    protectedAreaCoverage: 892,
    biodiversityHotspots: ['Kishtwar National Park', 'High Alpine Meadows'],
    alpineBiodiversityScore: 94,
    medicinalPlantLandscapes: ['Kishtwar highlands', 'Alpine slopes'],
    habitatLossRisk: 'low',
    humanWildlifeConflict: 'medium',
    speciesList: ['himalayan-brown-bear', 'snow-leopard', 'western-tragopan', 'aconitum-heterophyllum'],
    endemicSpeciesList: [],
    threatenedSpeciesList: ['himalayan-brown-bear', 'snow-leopard', 'western-tragopan'],
    relatedProtectedAreas: ['kishtwar-national-park'],
    relatedTrails: ['kolahoi-glacier-expedition'],
    monitoringSites: ['Kishtwar NP'],
    lastSurveyYear: 2023,
  },
  {
    district: 'Kupwara',
    totalSpecies: 534,
    mammals: 28,
    birds: 178,
    fish: 6,
    plants: 289,
    medicinalPlants: 23,
    threatenedSpecies: 18,
    endemicSpecies: 8,
    migratorySpecies: 67,
    primaryHabitats: ['coniferous-forest', 'rocky-slope', 'alpine-meadow'],
    protectedAreaCoverage: 456,
    biodiversityHotspots: ['Hirpora Wildlife Sanctuary', 'Karakoram ranges'],
    alpineBiodiversityScore: 82,
    medicinalPlantLandscapes: ['Hirpora slopes'],
    habitatLossRisk: 'medium',
    humanWildlifeConflict: 'high',
    speciesList: ['markhor', 'serow', 'himalayan-monals'],
    endemicSpeciesList: [],
    threatenedSpeciesList: ['markhor', 'serow'],
    relatedProtectedAreas: ['hirpora-wildlife-sanctuary'],
    relatedTrails: ['hirpora-markhor-sanctuary-trail'],
    monitoringSites: ['Hirpora WLS'],
    lastSurveyYear: 2023,
  },
  {
    district: 'Ganderbal',
    totalSpecies: 489,
    mammals: 18,
    birds: 234,
    fish: 12,
    plants: 212,
    medicinalPlants: 13,
    threatenedSpecies: 12,
    endemicSpecies: 6,
    migratorySpecies: 134,
    primaryHabitats: ['wetland', 'alpine-meadow', 'riparian'],
    protectedAreaCoverage: 234,
    biodiversityHotspots: ['Manasbal Lake', 'Sind Valley'],
    wetlandBirdConcentration: 178,
    habitatLossRisk: 'medium',
    humanWildlifeConflict: 'low',
    speciesList: ['wetland-bird-group', 'himalayan-monals'],
    endemicSpeciesList: [],
    threatenedSpeciesList: [],
    relatedProtectedAreas: [],
    relatedTrails: ['manasbal-lake-birding-circuit'],
    monitoringSites: ['Manasbal Lake'],
    lastSurveyYear: 2023,
  },
  {
    district: 'Kulgam',
    totalSpecies: 412,
    mammals: 21,
    birds: 156,
    fish: 8,
    plants: 198,
    medicinalPlants: 29,
    threatenedSpecies: 15,
    endemicSpecies: 7,
    migratorySpecies: 52,
    primaryHabitats: ['temperate-forest', 'alpine-meadow', 'riparian'],
    protectedAreaCoverage: 312,
    biodiversityHotspots: ['Verinag', 'Dachigam slopes'],
    alpineBiodiversityScore: 76,
    medicinalPlantLandscapes: ['Verinag forests'],
    habitatLossRisk: 'medium',
    humanWildlifeConflict: 'high',
    speciesList: ['himalayan-black-bear', 'musk-deer'],
    endemicSpeciesList: [],
    threatenedSpeciesList: ['himalayan-black-bear', 'musk-deer'],
    relatedProtectedAreas: ['overa-aru-wildlife-sanctuary'],
    relatedTrails: [],
    monitoringSites: ['Verinag WLS'],
    lastSurveyYear: 2022,
  },
  {
    district: 'Pulwama',
    totalSpecies: 378,
    mammals: 18,
    birds: 145,
    fish: 7,
    plants: 178,
    medicinalPlants: 30,
    threatenedSpecies: 12,
    endemicSpecies: 5,
    migratorySpecies: 48,
    primaryHabitats: ['temperate-forest', 'agricultural', 'riparian'],
    protectedAreaCoverage: 189,
    biodiversityHotspots: ['Acharabal', 'Lidder Valley'],
    medicinalPlantLandscapes: ['Acharabal forests'],
    habitatLossRisk: 'high',
    humanWildlifeConflict: 'high',
    speciesList: ['himalayan-black-bear', 'kashmir-flycatcher'],
    endemicSpeciesList: ['kashmir-flycatcher'],
    threatenedSpeciesList: ['himalayan-black-bear'],
    relatedProtectedAreas: [],
    relatedTrails: [],
    monitoringSites: [],
    lastSurveyYear: 2022,
  },
  {
    district: 'Shopian',
    totalSpecies: 345,
    mammals: 16,
    birds: 134,
    fish: 5,
    plants: 167,
    medicinalPlants: 23,
    threatenedSpecies: 10,
    endemicSpecies: 4,
    migratorySpecies: 42,
    primaryHabitats: ['temperate-forest', 'alpine-meadow', 'agricultural'],
    protectedAreaCoverage: 156,
    biodiversityHotspots: ['Kungwattan', 'Shikargah'],
    alpineBiodiversityScore: 68,
    habitatLossRisk: 'high',
    humanWildlifeConflict: 'medium',
    speciesList: ['himalayan-monals'],
    endemicSpeciesList: [],
    threatenedSpeciesList: [],
    relatedProtectedAreas: [],
    relatedTrails: [],
    monitoringSites: [],
    lastSurveyYear: 2022,
  },
  {
    district: 'Budgam',
    totalSpecies: 423,
    mammals: 19,
    birds: 167,
    fish: 8,
    plants: 201,
    medicinalPlants: 28,
    threatenedSpecies: 14,
    endemicSpecies: 6,
    migratorySpecies: 78,
    primaryHabitats: ['temperate-forest', 'wetland', 'alpine-meadow'],
    protectedAreaCoverage: 267,
    biodiversityHotspots: ['Yusmarg', 'Tosamaidan'],
    wetlandBirdConcentration: 89,
    alpineBiodiversityScore: 72,
    habitatLossRisk: 'medium',
    humanWildlifeConflict: 'medium',
    speciesList: ['hangul', 'wetland-bird-group'],
    endemicSpeciesList: [],
    threatenedSpeciesList: ['hangul'],
    relatedProtectedAreas: [],
    relatedTrails: ['yusmarg-meadow-trail'],
    monitoringSites: ['Yusmarg'],
    lastSurveyYear: 2023,
  },
  {
    district: 'Baramulla',
    totalSpecies: 567,
    mammals: 24,
    birds: 189,
    fish: 11,
    plants: 312,
    medicinalPlants: 31,
    threatenedSpecies: 16,
    endemicSpecies: 9,
    migratorySpecies: 98,
    primaryHabitats: ['temperate-forest', 'wetland', 'riparian'],
    protectedAreaCoverage: 378,
    biodiversityHotspots: ['Razdan Pass', 'Wular Lake', 'Manasbal'],
    wetlandBirdConcentration: 156,
    habitatLossRisk: 'medium',
    humanWildlifeConflict: 'medium',
    speciesList: ['markhor', 'wetland-bird-group', 'himalayan-monals'],
    endemicSpeciesList: [],
    threatenedSpeciesList: ['markhor'],
    relatedProtectedAreas: ['hokersar-wetland'],
    relatedTrails: ['wular-lake-birding-trail'],
    monitoringSites: ['Wular Lake', 'Manasbal Lake'],
    lastSurveyYear: 2023,
  },
  {
    district: 'Bandipora',
    totalSpecies: 389,
    mammals: 21,
    birds: 145,
    fish: 9,
    plants: 189,
    medicinalPlants: 25,
    threatenedSpecies: 13,
    endemicSpecies: 7,
    migratorySpecies: 67,
    primaryHabitats: ['temperate-forest', 'alpine-meadow', 'wetland'],
    protectedAreaCoverage: 289,
    biodiversityHotspots: ['Wular North', 'Gurez Valley'],
    wetlandBirdConcentration: 78,
    alpineBiodiversityScore: 74,
    habitatLossRisk: 'medium',
    humanWildlifeConflict: 'medium',
    speciesList: ['hangul', 'wetland-bird-group'],
    endemicSpeciesList: [],
    threatenedSpeciesList: ['hangul'],
    relatedProtectedAreas: [],
    relatedTrails: ['gurez-valley-trail'],
    monitoringSites: ['Wular Lake'],
    lastSurveyYear: 2023,
  },
  {
    district: 'Doda',
    totalSpecies: 512,
    mammals: 29,
    birds: 167,
    fish: 7,
    plants: 278,
    medicinalPlants: 31,
    threatenedSpecies: 21,
    endemicSpecies: 14,
    migratorySpecies: 38,
    primaryHabitats: ['temperate-forest', 'alpine-meadow', 'coniferous-forest'],
    protectedAreaCoverage: 456,
    biodiversityHotspots: ['Bhaderwah', 'Seoj Meadow'],
    alpineBiodiversityScore: 88,
    medicinalPlantLandscapes: ['Bhaderwah highlands'],
    habitatLossRisk: 'low',
    humanWildlifeConflict: 'medium',
    speciesList: ['himalayan-brown-bear', 'musk-deer', 'snow-leopard'],
    endemicSpeciesList: [],
    threatenedSpeciesList: ['himalayan-brown-bear', 'musk-deer', 'snow-leopard'],
    relatedProtectedAreas: [],
    relatedTrails: ['bhaderwah-meadow-trek'],
    monitoringSites: ['Bhaderwah'],
    lastSurveyYear: 2023,
  },
  {
    district: 'Ramban',
    totalSpecies: 367,
    mammals: 18,
    birds: 123,
    fish: 6,
    plants: 198,
    medicinalPlants: 22,
    threatenedSpecies: 11,
    endemicSpecies: 8,
    migratorySpecies: 34,
    primaryHabitats: ['temperate-forest', 'coniferous-forest', 'alpine-meadow'],
    protectedAreaCoverage: 234,
    biodiversityHotspots: ['Banihal Pass', 'Margan Top'],
    alpineBiodiversityScore: 79,
    habitatLossRisk: 'medium',
    humanWildlifeConflict: 'medium',
    speciesList: ['himalayan-black-bear', 'himalayan-monals'],
    endemicSpeciesList: [],
    threatenedSpeciesList: ['himalayan-black-bear'],
    relatedProtectedAreas: [],
    relatedTrails: ['banihal-pass-trek'],
    monitoringSites: [],
    lastSurveyYear: 2022,
  },
  {
    district: 'Rajouri',
    totalSpecies: 445,
    mammals: 23,
    birds: 156,
    fish: 7,
    plants: 234,
    medicinalPlants: 25,
    threatenedSpecies: 14,
    endemicSpecies: 6,
    migratorySpecies: 45,
    primaryHabitats: ['temperate-forest', 'subtropical', 'coniferous-forest'],
    protectedAreaCoverage: 312,
    biodiversityHotspots: ['Lachipora', 'Nowshera'],
    habitatLossRisk: 'medium',
    humanWildlifeConflict: 'high',
    speciesList: ['himalayan-black-bear', 'leopard'],
    endemicSpeciesList: [],
    threatenedSpeciesList: ['himalayan-black-bear'],
    relatedProtectedAreas: [],
    relatedTrails: [],
    monitoringSites: ['Lachipora WLS'],
    lastSurveyYear: 2023,
  },
  {
    district: 'Poonch',
    totalSpecies: 398,
    mammals: 21,
    birds: 145,
    fish: 6,
    plants: 201,
    medicinalPlants: 25,
    threatenedSpecies: 12,
    endemicSpecies: 5,
    migratorySpecies: 38,
    primaryHabitats: ['temperate-forest', 'subtropical', 'alpine-meadow'],
    protectedAreaCoverage: 278,
    biodiversityHotspots: ['Loran', 'Mendhar'],
    habitatLossRisk: 'medium',
    humanWildlifeConflict: 'high',
    speciesList: ['himalayan-black-bear', 'ghoral'],
    endemicSpeciesList: [],
    threatenedSpeciesList: ['himalayan-black-bear'],
    relatedProtectedAreas: [],
    relatedTrails: [],
    monitoringSites: [],
    lastSurveyYear: 2022,
  },
  {
    district: 'Kathua',
    totalSpecies: 423,
    mammals: 22,
    birds: 167,
    fish: 9,
    plants: 198,
    medicinalPlants: 27,
    threatenedSpecies: 13,
    endemicSpecies: 4,
    migratorySpecies: 56,
    primaryHabitats: ['subtropical', 'temperate-forest', 'riparian'],
    protectedAreaCoverage: 289,
    biodiversityHotspots: ['Ramnagar', 'Billawar'],
    habitatLossRisk: 'high',
    humanWildlifeConflict: 'high',
    speciesList: ['himalayan-black-bear', 'elephant'],
    endemicSpeciesList: [],
    threatenedSpeciesList: ['himalayan-black-bear'],
    relatedProtectedAreas: [],
    relatedTrails: [],
    monitoringSites: ['Ramnagar'],
    lastSurveyYear: 2023,
  },
];

// ============================================================================
// CONSERVATION ANALYTICS DATA
// ============================================================================

export interface ConservationAnalytics {
  byTaxon: {
    mammals: {
      total: number;
      CR: number;
      EN: number;
      VU: number;
      primaryThreats: string[];
    };
    birds: {
      total: number;
      CR: number;
      EN: number;
      VU: number;
      primaryThreats: string[];
    };
    medicinalPlants: {
      total: number;
      CR: number;
      EN: number;
      VU: number;
      primaryThreats: string[];
    };
  };
  wlpa1972Schedule: {
    scheduleI: number;
    scheduleII: number;
    scheduleIII: number;
    scheduleIV: number;
  };
  prioritySpecies: Array<{
    species: string;
    commonName: string;
    reason: 'endemic' | 'critically-endangered' | 'flagship' | 'keystone';
    habitats: string[];
    districts: KashmirDistrict[];
  }>;
  hotspots: Array<{
    name: string;
    district: KashmirDistrict;
    habitat: string;
    threatenedSpeciesCount: number;
    primaryThreats: string[];
    relatedRisks: string[];
  }>;
  riskDrivers: {
    habitatFragmentation: number;
    hydrologicalChange: number;
    forestFire: number;
    climateChange: number;
    humanWildlifeConflict: number;
  };
}

export const conservationAnalyticsData: ConservationAnalytics = {
  byTaxon: {
    mammals: {
      total: 67,
      CR: 1,
      EN: 8,
      VU: 23,
      primaryThreats: ['Habitat fragmentation', 'Poaching', 'Human-wildlife conflict', 'Climate change']
    },
    birds: {
      total: 312,
      CR: 2,
      EN: 12,
      VU: 45,
      primaryThreats: ['Habitat loss', 'Wetland degradation', 'Climate change', 'Disturbance']
    },
    medicinalPlants: {
      total: 127,
      CR: 3,
      EN: 18,
      VU: 34,
      primaryThreats: ['Overharvesting', 'Habitat loss', 'Climate change', 'Unregulated trade']
    }
  },
  wlpa1972Schedule: {
    scheduleI: 45, // Highest protection
    scheduleII: 34,
    scheduleIII: 67,
    scheduleIV: 89
  },
  prioritySpecies: [
    {
      species: 'hangul',
      commonName: 'Hangul (Kashmir Stag)',
      reason: 'critically-endangered',
      habitats: ['temperate-forest', 'riverine-forest'],
      districts: ['Srinagar', 'Ganderbal', 'Anantnag']
    },
    {
      species: 'kashmir-flycatcher',
      commonName: 'Kashmir Flycatcher',
      reason: 'endemic',
      habitats: ['oak-forest', 'mixed-deciduous'],
      districts: ['Srinagar', 'Anantnag', 'Pulwama']
    },
    {
      species: 'markhor',
      commonName: 'Markhor',
      reason: 'flagship',
      habitats: ['rocky-slope', 'alpine-scrub'],
      districts: ['Kupwara', 'Baramulla']
    },
    {
      species: 'western-tragopan',
      commonName: 'Western Tragopan',
      reason: 'endemic',
      habitats: ['oak-forest', 'rhododendron'],
      districts: ['Anantnag', 'Kulgam', 'Kishtwar']
    },
    {
      species: 'snow-leopard',
      commonName: 'Snow Leopard',
      reason: 'keystone',
      habitats: ['high-altitude-desert', 'alpine-meadow'],
      districts: ['Kishtwar'] as KashmirDistrict[]
    }
  ],
  hotspots: [
    {
      name: 'Dachigam National Park',
      district: 'Srinagar',
      habitat: 'Temperate Forest',
      threatenedSpeciesCount: 12,
      primaryThreats: ['Habitat fragmentation', 'Human disturbance', 'Feral dogs'],
      relatedRisks: ['human-wildlife-conflict', 'forest-fire-risks']
    },
    {
      name: 'Hokersar Wetland',
      district: 'Srinagar',
      habitat: 'Wetland',
      threatenedSpeciesCount: 8,
      primaryThreats: ['Encroachment', 'Pollution', 'Eutrophication'],
      relatedRisks: ['water-pollution', 'hydrological-risks']
    },
    {
      name: 'Overa-Aru Wildlife Sanctuary',
      district: 'Anantnag',
      habitat: 'Temperate Forest / Alpine',
      threatenedSpeciesCount: 15,
      primaryThreats: ['Poaching', 'Habitat degradation', 'Climate change'],
      relatedRisks: ['human-wildlife-conflict', 'climate-change']
    },
    {
      name: 'Kishtwar High Alps',
      district: 'Kishtwar',
      habitat: 'Alpine / Cryosphere',
      threatenedSpeciesCount: 10,
      primaryThreats: ['Glacial retreat', 'Climate change', 'Tourism pressure'],
      relatedRisks: ['glacier-cryosphere-risks', 'climate-change']
    }
  ],
  riskDrivers: {
    habitatFragmentation: 45,
    hydrologicalChange: 34,
    forestFire: 23,
    climateChange: 67,
    humanWildlifeConflict: 38
  }
};

// ============================================================================
// DATA ACCESS FUNCTIONS
// ============================================================================

export const getHabitatBiodiversity = {
  all: () => habitatBiodiversityData,
  bySlug: (slug: string) => habitatBiodiversityData.find(h => h.slug === slug),
  byVulnerability: (score: 'low' | 'medium' | 'high' | 'critical') => 
    habitatBiodiversityData.filter(h => h.vulnerabilityScore === score),
  byDistrict: (district: KashmirDistrict) => 
    habitatBiodiversityData.filter(h => h.districts.includes(district))
};

export const getDistrictBiodiversity = {
  all: () => districtBiodiversityData,
  byDistrict: (district: KashmirDistrict) => 
    districtBiodiversityData.find(d => d.district === district),
  bySpeciesRichness: (minSpecies: number) => 
    districtBiodiversityData.filter(d => d.totalSpecies >= minSpecies),
  byWetlandBirds: () => 
    districtBiodiversityData.filter(d => d.wetlandBirdConcentration !== undefined),
  byAlpine: () => 
    districtBiodiversityData.filter(d => d.alpineBiodiversityScore !== undefined)
};

export const getConservationAnalytics = () => conservationAnalyticsData;

// ============================================================================
// METRICS
// ============================================================================

export const biodiversityIntelligenceMetrics = {
  totalHabitats: 5,
  totalDistricts: 16,
  habitatAreaTotal: 18985, // km2
  speciesByHabitat: {
    forest: 1456,
    wetland: 892,
    alpine: 678,
    riverine: 456,
    meadow: 734
  },
  threatenedByHabitat: {
    forest: 34,
    wetland: 23,
    alpine: 18,
    riverine: 15,
    meadow: 12
  },
  highVulnerabilityHabitats: 2,
  conservationHotspots: 4,
  prioritySpecies: 5
};
