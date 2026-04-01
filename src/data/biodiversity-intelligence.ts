// Biodiversity Intelligence Data Service
// Habitat systems, district biodiversity, and conservation analytics

import { KashmirDistrict, HabitatType } from './trails-sightings';

// ============================================================================
// HABITAT BIODIVERSITY DATA
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
  riskDrivers: string[];
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
    riskDrivers: ['Habitat fragmentation', 'Logging pressure', 'Grazing', 'Climate change'],
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
    riskDrivers: ['Encroachment', 'Pollution', 'Eutrophication', 'Water extraction', 'Climate change'],
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
    districts: ['Kishtwar', 'Doda', 'Anantnag', 'Kupwara'] as KashmirDistrict[],
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
    vulnerabilityScore: 'high' as const,
    riskDrivers: ['Climate change', 'Glacial retreat', 'Overgrazing', 'Tourism pressure'],
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
    districts: ['Srinagar', 'Anantnag', 'Baramulla', 'Kupwara', 'Kishtwar'] as KashmirDistrict[],
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
    vulnerabilityScore: 'medium' as const,
    riskDrivers: ['Water pollution', 'Overfishing', 'Hydrological alteration', 'Climate change'],
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
    riskDrivers: ['Grazing pressure', 'Agricultural conversion', 'Climate change', 'Invasive species'],
    relatedProtectedAreas: ['dachigam-national-park', 'overa-aru-wildlife-sanctuary'],
    relatedTrails: ['betaab-valley-meadow-walk'],
    flagshipSpecies: ['hangul', 'himalayan-monals'],
    imageUrl: '/images/habitats/meadow-biodiversity.jpg'
  }
];

// ============================================================================
// DISTRICT BIODIVERSITY DATA
// ============================================================================

export interface DistrictBiodiversity {
  district: KashmirDistrict;
  totalSpecies: number;
  mammals: number;
  birds: number;
  fish: number;
  plants: number;
  medicinalPlants: number;
  threatenedSpecies: number;
  endemicSpecies: number;
  migratorySpecies: number;
  primaryHabitats: HabitatType[];
  protectedAreaCoverage: number;
  biodiversityHotspots: string[];
  wetlandBirdConcentration?: number;
  alpineBiodiversityScore?: number;
  medicinalPlantLandscapes?: string[];
  habitatLossRisk: 'low' | 'medium' | 'high';
  humanWildlifeConflict: 'low' | 'medium' | 'high';
  relatedProtectedAreas: string[];
  relatedTrails: string[];
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
    relatedProtectedAreas: ['dachigam-national-park', 'hokersar-wetland'],
    relatedTrails: ['dachigam-hangul-trail', 'hokersar-wetland-boardwalk']
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
    relatedProtectedAreas: ['overa-aru-wildlife-sanctuary'],
    relatedTrails: ['overa-aru-wildlife-circuit', 'betaab-valley-meadow-walk', 'tarsar-marsar-bloom-trek']
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
    relatedProtectedAreas: ['kishtwar-national-park'],
    relatedTrails: ['kolahoi-glacier-expedition']
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
    relatedProtectedAreas: ['hirpora-wildlife-sanctuary'],
    relatedTrails: ['hirpora-markhor-sanctuary-trail']
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
    relatedProtectedAreas: [],
    relatedTrails: ['manasbal-lake-birding-circuit']
  }
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
