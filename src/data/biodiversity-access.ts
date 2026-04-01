// Biodiversity Data Access Layer
// Centralized functions for biodiversity intelligence queries

import type {
  EndemismStatus,
  DataSourceType,
  DataQualityFlag,
  VerificationStatus,
  HabitatPressureIndex,
  VulnerabilityTrendPoint,
  RiskDashboardData,
  ThreatAnalysis,
  ThreatSeverity,
  ThreatTrend,
  MonitoringProtocol,
  MigrationMonth,
  PaginatedResult,
  SpeciesCount,
  BiodiversitySpecies,
  SpeciesDistributionPoint,
  ConservationPriority,
} from '../types/biodiversity';

import {
  getBiodiversityData as getOriginalBiodiversityData,
  biodiversityMetrics,
  type BiodiversitySpecies as OriginalBiodiversitySpecies,
} from './biodiversity';

import {
  habitatBiodiversityData,
  districtBiodiversityData,
} from './biodiversity-intelligence';

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function getAllSpecies(): BiodiversitySpecies[] {
  const allOriginal: OriginalBiodiversitySpecies[] = [
    ...getOriginalBiodiversityData.mammals.all(),
    ...getOriginalBiodiversityData.birds.all(),
    ...getOriginalBiodiversityData.fish.all(),
    ...getOriginalBiodiversityData.plants.all(),
    ...getOriginalBiodiversityData.medicinalPlants.all(),
  ];

  // Map original species to enhanced species with defaults for new fields
  return allOriginal.map((species): BiodiversitySpecies => ({
    ...species,
    endemismStatus: (species.endemismStatus as EndemismStatus) || 'widely-distributed',
    dataSource: species.dataSource || { type: 'legacy' as DataSourceType, qualityFlag: 'medium' as DataQualityFlag },
    distributionPoints: species.distributionPoints || [],
    conservationPriority: species.conservationPriority as ConservationPriority | undefined,
  }));
}

function getSpeciesBySlug(slug: string): BiodiversitySpecies | null {
  const all = getAllSpecies();
  return all.find(s => s.slug === slug) || null;
}

function calculateOverallRisk(species: BiodiversitySpecies[]): number {
  const threatened = species.filter(s =>
    ['VU', 'EN', 'CR'].includes(s.conservationStatus)
  ).length;

  return species.length > 0
    ? Math.round((threatened / species.length) * 100)
    : 0;
}

// ============================================================================
// ENDEMIC SPECIES
// ============================================================================

export function getEndemicSpecies(endemismLevel?: EndemismStatus): BiodiversitySpecies[] {
  const allSpecies = getAllSpecies();
  const endemic = allSpecies.filter(s =>
    s.endemismStatus && s.endemismStatus !== 'widely-distributed'
  );

  if (!endemismLevel) return endemic;
  return endemic.filter(s => s.endemismStatus === endemismLevel);
}

export function getKashmirPrioritySpecies(): BiodiversitySpecies[] {
  const allSpecies = getAllSpecies();
  return allSpecies.filter(s =>
    s.conservationPriority && s.conservationPriority >= 7
  );
}

export function getEndemicSpeciesByDistrict(district: string): BiodiversitySpecies[] {
  const allSpecies = getAllSpecies();
  return allSpecies.filter(s =>
    s.endemismStatus !== 'widely-distributed' &&
    s.districts.includes(district)
  );
}

// ============================================================================
// HABITAT INTELLIGENCE
// ============================================================================

export function getHabitatSpeciesList(habitatSlug: string): BiodiversitySpecies[] {
  const habitat = habitatBiodiversityData.find(h => h.slug === habitatSlug);
  if (!habitat || !habitat.speciesList || habitat.speciesList.length === 0) {
    // Fallback: filter species by habitat name
    const habitatNameMap: Record<string, string> = {
      'forest-biodiversity': 'forest',
      'wetland-biodiversity': 'wetland',
      'alpine-biodiversity': 'alpine',
      'riverine-biodiversity': 'river',
      'grassland-biodiversity': 'meadow',
    };

    const habitatKeyword = habitatNameMap[habitatSlug];
    if (!habitatKeyword) return [];

    return getAllSpecies().filter(s =>
      s.habitats.some(h => h.toLowerCase().includes(habitatKeyword.toLowerCase()))
    );
  }

  return habitat.speciesList
    .map(slug => getSpeciesBySlug(slug))
    .filter((s): s is BiodiversitySpecies => s !== null);
}

export function getHabitatPressureIndex(habitatSlug: string): HabitatPressureIndex | null {
  const habitat = habitatBiodiversityData.find(h => h.slug === habitatSlug);
  return habitat?.pressureIndex || null;
}

export function getHabitatVulnerabilityTrend(habitatSlug: string): VulnerabilityTrendPoint[] {
  const habitat = habitatBiodiversityData.find(h => h.slug === habitatSlug);
  return habitat?.vulnerabilityTrend || [];
}

export function getAllHabitats() {
  return habitatBiodiversityData;
}

export function getHabitatBySlug(slug: string) {
  return habitatBiodiversityData.find(h => h.slug === slug) || null;
}

// ============================================================================
// DISTRICT INTELLIGENCE
// ============================================================================

export function getDistrictSpeciesList(district: string): BiodiversitySpecies[] {
  const districtData = districtBiodiversityData.find(d => d.district === district);
  if (!districtData || !districtData.speciesList || districtData.speciesList.length === 0) {
    // Fallback: filter species by district
    return getAllSpecies().filter(s => s.districts.includes(district));
  }

  return districtData.speciesList
    .map(slug => getSpeciesBySlug(slug))
    .filter((s): s is BiodiversitySpecies => s !== null);
}

export function getDistrictEndemicSpecies(district: string): BiodiversitySpecies[] {
  const districtData = districtBiodiversityData.find(d => d.district === district);
  if (!districtData || !districtData.endemicSpeciesList || districtData.endemicSpeciesList.length === 0) {
    return getEndemicSpecies().filter(s => s.districts.includes(district));
  }

  return districtData.endemicSpeciesList
    .map(slug => getSpeciesBySlug(slug))
    .filter((s): s is BiodiversitySpecies => s !== null);
}

export function getDistrictThreatenedSpecies(district: string): BiodiversitySpecies[] {
  const districtData = districtBiodiversityData.find(d => d.district === district);
  if (!districtData || !districtData.threatenedSpeciesList || districtData.threatenedSpeciesList.length === 0) {
    return getAllSpecies().filter(s =>
      ['VU', 'EN', 'CR'].includes(s.conservationStatus) &&
      s.districts.includes(district)
    );
  }

  return districtData.threatenedSpeciesList
    .map(slug => getSpeciesBySlug(slug))
    .filter((s): s is BiodiversitySpecies => s !== null);
}

export function getAllDistricts() {
  return districtBiodiversityData;
}

export function getDistrictBySlug(slug: string) {
  return districtBiodiversityData.find(d => d.district === slug) || null;
}

export function getDistrictSpeciesDensity(district: string): number {
  const districtData = districtBiodiversityData.find(d => d.district === district);
  return districtData?.totalSpecies || 0;
}

// ============================================================================
// MIGRATION
// ============================================================================

export function getMigratorySpecies(season?: string): BiodiversitySpecies[] {
  const allSpecies = getAllSpecies();
  const migratory = allSpecies.filter(s => s.migrationWindow !== undefined);

  if (!season) return migratory;
  return migratory.filter(s => s.migrationWindow?.season === season);
}

export function getMigrationCalendar(): MigrationMonth[] {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const months: MigrationMonth[] = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    name: monthNames[i],
    species: [],
    peakSpecies: [],
  }));

  const migratory = getMigratorySpecies();

  migratory.forEach(species => {
    const window = species.migrationWindow;
    if (!window) return;

    if (window.peakPresence) {
      window.peakPresence.forEach(month => {
        if (month >= 1 && month <= 12) {
          months[month - 1].species.push(species);
          if (window.concentration === 'high' || window.concentration === 'very-high') {
            months[month - 1].peakSpecies.push(species);
          }
        }
      });
    } else if (window.arrivalMonth && window.departureMonth) {
      for (let m = window.arrivalMonth; m <= window.departureMonth; m++) {
        const monthIndex = ((m - 1) + 12) % 12; // Handle year wraparound
        months[monthIndex].species.push(species);
      }
    }
  });

  return months;
}

export function getFlywayData(flyway: string): BiodiversitySpecies[] {
  const migratory = getMigratorySpecies();
  return migratory.filter(s => s.migrationWindow?.flyway === flyway);
}

export function getMigrationByType(type: string): BiodiversitySpecies[] {
  const migratory = getMigratorySpecies();
  return migratory.filter(s => s.migrationWindow?.migrationType === type);
}

// ============================================================================
// DISTRIBUTION
// ============================================================================

export function getSpeciesDistribution(speciesSlug: string): SpeciesDistributionPoint[] {
  const species = getSpeciesBySlug(speciesSlug);
  if (!species) return [];

  // If species has distribution points, return them
  if (species.distributionPoints && species.distributionPoints.length > 0) {
    return species.distributionPoints;
  }

  // Otherwise, generate from basic data
  const points: SpeciesDistributionPoint[] = [];

  species.districts.forEach(district => {
    species.habitats.forEach(habitat => {
      points.push({
        district,
        habitat,
        elevation: Math.floor((species.elevationRange.min + species.elevationRange.max) / 2),
        occurrenceType: 'probable',
        source: species.dataSource || { type: 'inventory' },
      });
    });
  });

  return points;
}

export function getHabitatSpeciesDensity(habitat: string): number {
  const habitatData = habitatBiodiversityData.find(h => h.slug === habitat);
  return habitatData?.speciesCount || 0;
}

export function getSpeciesByElevationRange(min: number, max: number): BiodiversitySpecies[] {
  const allSpecies = getAllSpecies();
  return allSpecies.filter(s =>
    s.elevationRange.min <= max &&
    s.elevationRange.max >= min
  );
}

// ============================================================================
// SOURCE VERIFICATION
// ============================================================================

export function getSpeciesBySourceType(sourceType: DataSourceType): BiodiversitySpecies[] {
  const allSpecies = getAllSpecies();
  return allSpecies.filter(s => s.dataSource?.type === sourceType);
}

export function getUnverifiedSpecies(): BiodiversitySpecies[] {
  const allSpecies = getAllSpecies();
  return allSpecies.filter(s =>
    !s.dataSource?.qualityFlag ||
    s.dataSource.qualityFlag === 'unverified'
  );
}

export function getSpeciesByQualityFlag(qualityFlag: DataQualityFlag): BiodiversitySpecies[] {
  const allSpecies = getAllSpecies();
  return allSpecies.filter(s => s.dataSource?.qualityFlag === qualityFlag);
}

export function getVerifiedSpecies(): BiodiversitySpecies[] {
  const allSpecies = getAllSpecies();
  return allSpecies.filter(s =>
    s.dataSource?.qualityFlag === 'high' ||
    s.dataSource?.qualityFlag === 'medium'
  );
}

// ============================================================================
// MONITORING & RISK
// ============================================================================

export function getBiodiversityRiskDashboard(): RiskDashboardData {
  const allSpecies = getAllSpecies();
  const threatened = allSpecies.filter(s =>
    ['VU', 'EN', 'CR'].includes(s.conservationStatus)
  );

  const riskByTaxon = {
    mammals: threatened.filter(s => s.taxonomicGroup === 'mammals').length,
    birds: threatened.filter(s => s.taxonomicGroup === 'birds').length,
    fish: threatened.filter(s => s.taxonomicGroup === 'fish').length,
    plants: threatened.filter(s => s.taxonomicGroup === 'plants').length +
             threatened.filter(s => s.taxonomicGroup === 'medicinal-plants').length,
  };

  // Calculate risk by habitat
  const riskByHabitat: Record<string, number> = {};
  habitatBiodiversityData.forEach(habitat => {
    riskByHabitat[habitat.slug] = habitat.threatenedSpecies;
  });

  // Calculate risk by district
  const riskByDistrict: Record<string, number> = {};
  districtBiodiversityData.forEach(district => {
    riskByDistrict[district.district] = district.threatenedSpecies;
  });

  // Get top threats
  const topThreats = getThreatSeverityAnalysis();

  // Generate temporal trend (simulated)
  const temporalTrend = Array.from({ length: 6 }, (_, i) => ({
    year: 2019 + i,
    riskScore: Math.round(calculateOverallRisk(allSpecies) * (0.95 + Math.random() * 0.1)),
  }));

  return {
    overallRiskScore: calculateOverallRisk(allSpecies),
    riskByTaxon,
    riskByHabitat,
    riskByDistrict,
    topThreats,
    priorityActions: [
      'Protect critical habitats for CR/EN species',
      'Restore degraded wetland ecosystems',
      'Implement anti-poaching measures',
      'Establish wildlife corridors',
      'Community-based conservation programs',
    ],
    temporalTrend,
  };
}

export function getThreatSeverityAnalysis(): ThreatAnalysis[] {
  const allSpecies = getAllSpecies();
  const threatCounts = new Map<string, Set<string>>();

  allSpecies.forEach(species => {
    species.threats.forEach(threat => {
      if (!threatCounts.has(threat)) {
        threatCounts.set(threat, new Set());
      }
      threatCounts.get(threat)!.add(species.id);
    });
  });

  return Array.from(threatCounts.entries())
    .map(([threatType, speciesSet]): ThreatAnalysis => {
      const count = speciesSet.size;
      const severity: ThreatSeverity = count > 50 ? 'critical' : count > 20 ? 'high' : count > 5 ? 'medium' : 'low';
      return {
        threatType,
        severity,
        affectedSpeciesCount: count,
        affectedHabitats: [],
        affectedDistricts: [],
        trend: 'stable' as ThreatTrend,
      };
    })
    .sort((a, b) => b.affectedSpeciesCount - a.affectedSpeciesCount)
    .slice(0, 10);
}

export function getMonitoringProtocols(speciesSlug?: string): MonitoringProtocol[] {
  const protocols: MonitoringProtocol[] = [
    {
      speciesSlug: 'hangul',
      protocol: 'Hangul Population Survey',
      frequency: 'annually',
      responsibleAgency: 'J&K Wildlife Department',
      indicators: ['Population count', 'Fawn recruitment', 'Habitat quality'],
      lastAssessment: '2023-09-01',
      nextAssessment: '2024-09-01',
      status: 'on-time',
    },
    {
      speciesSlug: 'kashmir-flycatcher',
      protocol: 'Kashmir Flycatcher Breeding Survey',
      frequency: 'quarterly',
      responsibleAgency: 'Bombay Natural History Society',
      indicators: ['Nest count', 'Breeding success', 'Habitat occupancy'],
      lastAssessment: '2023-08-01',
      nextAssessment: '2024-04-01',
      status: 'upcoming',
    },
    {
      speciesSlug: 'snow-leopard',
      protocol: 'Snow Leopard Camera Trap Survey',
      frequency: 'annually',
      responsibleAgency: 'Snow Leopard Trust',
      indicators: ['Individual identification', 'Population density', 'Prey abundance'],
      lastAssessment: '2023-06-01',
      nextAssessment: '2024-06-01',
      status: 'on-time',
    },
  ];

  if (speciesSlug) {
    return protocols.filter(p => p.speciesSlug === speciesSlug);
  }

  return protocols;
}

// ============================================================================
// FILTERING & SEARCH
// ============================================================================

export function filterSpecies(options: {
  taxonomicGroup?: string;
  conservationStatus?: string;
  endemismStatus?: EndemismStatus;
  habitat?: string;
  district?: string;
  migrationType?: string;
  sourceType?: DataSourceType;
  qualityFlag?: DataQualityFlag;
}): BiodiversitySpecies[] {
  let results = getAllSpecies();

  if (options.taxonomicGroup) {
    results = results.filter(s => s.taxonomicGroup === options.taxonomicGroup);
  }

  if (options.conservationStatus) {
    results = results.filter(s => s.conservationStatus === options.conservationStatus);
  }

  if (options.endemismStatus) {
    results = results.filter(s => s.endemismStatus === options.endemismStatus);
  }

  if (options.habitat) {
    results = results.filter(s =>
      s.habitats.some(h => h.toLowerCase().includes(options.habitat!.toLowerCase()))
    );
  }

  if (options.district) {
    results = results.filter(s => s.districts.includes(options.district!));
  }

  if (options.migrationType) {
    results = results.filter(s =>
      s.migrationWindow?.migrationType === options.migrationType
    );
  }

  if (options.sourceType) {
    results = results.filter(s => s.dataSource?.type === options.sourceType);
  }

  if (options.qualityFlag) {
    results = results.filter(s => s.dataSource?.qualityFlag === options.qualityFlag);
  }

  return results;
}

export function searchSpecies(query: string): BiodiversitySpecies[] {
  const lowerQuery = query.toLowerCase();
  return getAllSpecies().filter(s =>
    s.commonName.toLowerCase().includes(lowerQuery) ||
    s.scientificName.toLowerCase().includes(lowerQuery) ||
    s.localName?.toLowerCase().includes(lowerQuery)
  );
}

export function paginateResults<T>(
  items: T[],
  page: number = 1,
  pageSize: number = 20
): PaginatedResult<T> {
  const total = items.length;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    items: items.slice(start, end),
    total,
    page,
    pageSize,
    totalPages,
  };
}

// ============================================================================
// SPECIES COUNTS
// ============================================================================

export function getSpeciesCount(): SpeciesCount {
  const allSpecies = getAllSpecies();
  const threatened = allSpecies.filter(s =>
    ['VU', 'EN', 'CR'].includes(s.conservationStatus)
  );
  const endemic = allSpecies.filter(s =>
    s.endemismStatus !== 'widely-distributed'
  );
  const migratory = allSpecies.filter(s => s.migrationWindow !== undefined);

  return {
    total: allSpecies.length,
    mammals: allSpecies.filter(s => s.taxonomicGroup === 'mammals').length,
    birds: allSpecies.filter(s => s.taxonomicGroup === 'birds').length,
    fish: allSpecies.filter(s => s.taxonomicGroup === 'fish').length,
    plants: allSpecies.filter(s => s.taxonomicGroup === 'plants').length,
    medicinalPlants: allSpecies.filter(s => s.taxonomicGroup === 'medicinal-plants').length,
    threatened: threatened.length,
    endemic: endemic.length,
    migratory: migratory.length,
  };
}

// ============================================================================
// EXPORT METRICS
// ============================================================================

export { biodiversityMetrics };
