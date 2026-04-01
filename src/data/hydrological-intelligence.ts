// Hydrological Intelligence Functions
// Lake health scorecards, spring vulnerability, wetland condition, river corridor stress,
// watershed hierarchy, water quality trends, and district water intelligence

import type {
  WaterEntity,
  WaterQualityData,
  HydrologicalData,
} from './water-systems';

import {
  lakesData,
  springsData,
  wetlandsData,
  riversData,
  watershedsData,
  waterQualitySites,
  restorationSites,
} from './water-systems';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type HealthClassification = 'excellent' | 'good' | 'fair' | 'poor' | 'critical';

export type VulnerabilityClassification = 'secure' | 'vulnerable' | 'critical' | 'dry';

export type ConditionClass = 'excellent' | 'good' | 'fair' | 'poor' | 'critical';

export type StressClassification = 'low' | 'moderate' | 'high' | 'critical';

export type TrendDirection = 'improving' | 'stable' | 'declining';

export interface LakeHealthScorecard {
  lakeSlug: string;
  lakeName: string;
  overallScore: number;
  classification: HealthClassification;
  componentScores: {
    waterQuality: number;
    trophicState: number;
    biodiversity: number;
    hydrology: number;
    threatPressure: number;
  };
  trends: {
    overall: TrendDirection;
    waterQuality: TrendDirection;
    trophicState: TrendDirection;
  };
  keyThreats: string[];
  conservationActions: string[];
  lastAssessment: string;
  wqi?: number;
  trophicState?: string;
}

export interface SpringVulnerability {
  springSlug: string;
  springName: string;
  vulnerabilityScore: number;
  classification: VulnerabilityClassification;
  dischargeTrend: TrendDirection | 'dry';
  dischargeChange?: number;
  rechargeZoneCondition: 'pristine' | 'good' | 'degraded' | 'critical';
  climateSensitivity: 'low' | 'medium' | 'high' | 'extreme';
  threats: string[];
  lastMeasured: string;
}

export interface WetlandCondition {
  wetlandSlug: string;
  wetlandName: string;
  conditionClass: ConditionClass;
  conditionScore: number;
  componentAssessment: {
    hydrology: {
      score: number;
      connectivity: 'intact' | 'modified' | 'severed';
      waterRegime: 'stable' | 'variable' | 'unstable';
    };
    waterQuality: {
      score: number;
      nutrients: 'low' | 'moderate' | 'high';
      turbidity: 'low' | 'moderate' | 'high';
      dissolvedOxygen: 'high' | 'moderate' | 'low';
    };
    vegetation: {
      score: number;
      nativeCover: number;
      invasiveCover: number;
    };
    threats: {
      score: number;
      encroachment: 'none' | 'low' | 'moderate' | 'high';
      pollution: 'none' | 'low' | 'moderate' | 'high';
      disturbance: 'none' | 'low' | 'moderate' | 'high';
    };
  };
  ramsarCriteria?: number[];
  lastAssessment: string;
}

export interface RiverCorridorStress {
  riverSlug: string;
  riverName: string;
  stressScore: number;
  classification: StressClassification;
  riparianBuffer: {
    averageWidth: number;
    continuity: 'intact' | 'fragmented' | 'severed';
    vegetationCondition: 'pristine' | 'good' | 'degraded';
  };
  landUseStress: {
    score: number;
    urbanCoverage: number;
    agriculturalCoverage: number;
    forestCoverage: number;
  };
  flowRegulation: {
    dams: number;
    diversions: number;
    abstractionLevel: 'low' | 'moderate' | 'high';
  };
  sedimentLoad: {
    level: 'low' | 'moderate' | 'high';
    erosionSources: string[];
    siltationRisk: 'low' | 'moderate' | 'high';
  };
  lastAssessment: string;
}

export interface WaterQualityTrend {
  siteSlug: string;
  parameter: string;
  trend: TrendDirection;
  trendSignificance: 'significant' | 'moderate' | 'not-significant';
  baselineValue: number;
  currentValue: number;
  changePercent: number;
  seasonalPattern: {
    spring: number;
    summer: number;
    autumn: number;
    winter: number;
  };
  analysisPeriod: {
    start: string;
    end: string;
    dataPoints: number;
  };
}

export interface DistrictWaterIntelligence {
  district: string;
  waterBodies: {
    lakes: number;
    wetlands: number;
    rivers: number;
    springs: number;
    total: number;
  };
  averageHealthScore: number;
  criticalWaterBodies: string[];
  restorationInvestments: number;
  restorationProjects: number;
  waterQualityStatus: {
    excellent: number;
    good: number;
    moderate: number;
    poor: number;
    critical: number;
  };
}

// ============================================================================
// LAKE HEALTH SCORECARD FUNCTIONS
// ============================================================================

function calculateWaterQualityScore(waterQuality?: WaterQualityData): number {
  if (!waterQuality) return 50; // Default moderate if no data

  const statusScores: Record<string, number> = {
    excellent: 100,
    good: 80,
    moderate: 60,
    poor: 40,
    critical: 20,
  };

  return statusScores[waterQuality.status] || 50;
}

function calculateTrophicStateScore(waterQuality?: WaterQualityData): number {
  if (!waterQuality) return 70;

  // Estimate trophic state from nutrients and DO
  const nutrients = (waterQuality.nitrates || 0) + (waterQuality.phosphates || 0) * 10;
  const doLevel = waterQuality.dissolvedOxygen;

  if (nutrients < 5 && doLevel > 7) return 90; // Oligotrophic
  if (nutrients < 15 && doLevel > 5) return 70; // Mesotrophic
  if (nutrients < 30 && doLevel > 3) return 50; // Eutrophic
  return 30; // Hypereutrophic
}

function calculateBiodiversityScore(lake: WaterEntity): number {
  const biodiversityCount = lake.biodiversity?.length || 0;
  const hasThreatened = lake.conservationStatus === 'threatened';

  let score = Math.min(100, biodiversityCount * 10);
  if (hasThreatened) score = Math.max(0, score - 20);

  return score;
}

function calculateHydrologyScore(hydroData?: HydrologicalData): number {
  if (!hydroData) return 70;

  let score = 70;

  // Stable water regime
  if (hydroData.seasonalVariation === 'perennial') score += 20;
  else if (hydroData.seasonalVariation === 'intermittent') score -= 10;

  // Low flood risk
  if (hydroData.floodRisk === 'low') score += 10;
  else if (hydroData.floodRisk === 'critical') score -= 20;

  return Math.min(100, Math.max(0, score));
}

function calculateThreatPressureScore(lake: WaterEntity): number {
  const threatCount = lake.threats?.length || 0;
  const baseScore = 100;

  // Reduce score based on threats
  const threatImpact = threatCount * 15;

  return Math.max(0, baseScore - threatImpact);
}

export function getLakeHealthScorecard(lakeSlug: string): LakeHealthScorecard | null {
  const lake = lakesData.find((l) => l.slug === lakeSlug);
  if (!lake) return null;

  const waterQualityScore = calculateWaterQualityScore(lake.waterQuality);
  const trophicStateScore = calculateTrophicStateScore(lake.waterQuality);
  const biodiversityScore = calculateBiodiversityScore(lake);
  const hydrologyScore = calculateHydrologyScore(lake.hydrologicalData);
  const threatPressureScore = calculateThreatPressureScore(lake);

  // Weighted composite score
  const overallScore = Math.round(
    waterQualityScore * 0.35 +
    trophicStateScore * 0.20 +
    biodiversityScore * 0.15 +
    hydrologyScore * 0.15 +
    threatPressureScore * 0.15
  );

  // Classification
  let classification: HealthClassification;
  if (overallScore >= 90) classification = 'excellent';
  else if (overallScore >= 75) classification = 'good';
  else if (overallScore >= 60) classification = 'fair';
  else if (overallScore >= 40) classification = 'poor';
  else classification = 'critical';

  // Trends
  const waterTrend = lake.waterQuality?.trends;
  const overallTrend: TrendDirection =
    waterTrend?.pH === 'improving' && waterTrend?.dissolvedOxygen === 'improving'
      ? 'improving'
      : waterTrend?.pH === 'declining' || waterTrend?.dissolvedOxygen === 'declining'
      ? 'declining'
      : 'stable';

  return {
    lakeSlug: lake.slug,
    lakeName: lake.name,
    overallScore,
    classification,
    componentScores: {
      waterQuality: waterQualityScore,
      trophicState: trophicStateScore,
      biodiversity: biodiversityScore,
      hydrology: hydrologyScore,
      threatPressure: threatPressureScore,
    },
    trends: {
      overall: overallTrend,
      waterQuality: waterTrend?.pH || 'stable',
      trophicState: 'stable',
    },
    keyThreats: lake.threats || [],
    conservationActions: lake.restorationData?.objectives || [],
    lastAssessment: lake.updatedAt,
    wqi: lake.waterQuality ? calculateWQI(lake.waterQuality) : undefined,
    trophicState: getTrophicStateLabel(trophicStateScore),
  };
}

export function getAllLakeHealthScores(): LakeHealthScorecard[] {
  return lakesData
    .map((lake) => getLakeHealthScorecard(lake.slug))
    .filter((card): card is LakeHealthScorecard => card !== null);
}

export function compareLakes(lakeSlugs: string[]): LakeHealthScorecard[] {
  return lakeSlugs
    .map((slug) => getLakeHealthScorecard(slug))
    .filter((card): card is LakeHealthScorecard => card !== null);
}

function calculateWQI(wq: WaterQualityData): number {
  // Simplified WQI calculation
  const params = [
    Math.abs(7 - wq.pH) * 10, // pH deviation from neutral
    (14 - wq.dissolvedOxygen) * 5, // Inverse DO
    wq.turbidity * 2,
    (wq.nitrates || 0) * 5,
    (wq.phosphates || 0) * 10,
  ];

  const maxScore = 100;
  const penalty = params.reduce((a, b) => a + b, 0);

  return Math.max(0, Math.round(maxScore - penalty));
}

function getTrophicStateLabel(score: number): string {
  if (score >= 80) return 'Oligotrophic';
  if (score >= 60) return 'Mesotrophic';
  if (score >= 40) return 'Eutrophic';
  return 'Hypereutrophic';
}

// ============================================================================
// SPRING VULNERABILITY FUNCTIONS
// ============================================================================

export function getSpringVulnerability(springSlug: string): SpringVulnerability | null {
  const spring = springsData.find((s) => s.slug === springSlug);
  if (!spring) return null;

  // Discharge trend from hydrological data
  const dischargeTrend: TrendDirection | 'dry' =
    spring.hydrologicalData?.seasonalVariation === 'intermittent' ? 'declining' : 'stable';

  // Vulnerability scoring
  let vulnerabilityScore = 30; // Base score

  // Water quality factor
  if (spring.waterQuality?.status === 'poor' || spring.waterQuality?.status === 'critical') {
    vulnerabilityScore += 30;
  } else if (spring.waterQuality?.status === 'moderate') {
    vulnerabilityScore += 15;
  }

  // Threats factor
  const threatCount = spring.threats?.length || 0;
  vulnerabilityScore += threatCount * 10;

  // Climate sensitivity
  let climateSensitivity: 'low' | 'medium' | 'high' | 'extreme' = 'medium';
  if (spring.elevation > 3000) climateSensitivity = 'high';
  if (spring.hydrologicalData?.source === 'glacial') climateSensitivity = 'extreme';

  // Classification
  let classification: VulnerabilityClassification;
  if (vulnerabilityScore >= 80) classification = 'critical';
  else if (vulnerabilityScore >= 60) classification = 'vulnerable';
  else if (vulnerabilityScore >= 40) classification = 'vulnerable';
  else classification = 'secure';

  return {
    springSlug: spring.slug,
    springName: spring.name,
    vulnerabilityScore,
    classification,
    dischargeTrend,
    rechargeZoneCondition: 'good',
    climateSensitivity,
    threats: spring.threats || [],
    lastMeasured: spring.updatedAt,
  };
}

export function getAllSpringVulnerability(): SpringVulnerability[] {
  return springsData
    .map((spring) => getSpringVulnerability(spring.slug))
    .filter((vuln): vuln is SpringVulnerability => vuln !== null);
}

// ============================================================================
// WETLAND CONDITION FUNCTIONS
// ============================================================================

export function getWetlandCondition(wetlandSlug: string): WetlandCondition | null {
  const wetland = wetlandsData.find((w) => w.slug === wetlandSlug);
  if (!wetland) return null;

  // Hydrology assessment
  const hydroScore = wetland.hydrologicalData?.floodRisk === 'low' ? 80 : 60;
  const connectivity: 'intact' | 'modified' | 'severed' = 'intact';
  const waterRegime: 'stable' | 'variable' | 'unstable' = 'stable';

  // Water quality assessment
  const wqScore = calculateWaterQualityScore(wetland.waterQuality);
  const nutrients: 'low' | 'moderate' | 'high' = 'moderate';
  const turbidity: 'low' | 'moderate' | 'high' = 'moderate';
  const dissolvedOxygen: 'high' | 'moderate' | 'low' = 'moderate';

  // Vegetation (estimated)
  const vegScore = 70;
  const nativeCover = 75;
  const invasiveCover = 15;

  // Threats assessment
  const threatCount = wetland.threats?.length || 0;
  const threatScore = Math.max(0, 100 - threatCount * 20);
  const encroachment: 'none' | 'low' | 'moderate' | 'high' = threatCount > 2 ? 'moderate' : 'low';
  const pollution: 'none' | 'low' | 'moderate' | 'high' = wetland.waterQuality?.status === 'poor' ? 'moderate' : 'low';
  const disturbance: 'none' | 'low' | 'moderate' | 'high' = 'low';

  // Overall condition score
  const conditionScore = Math.round(
    hydroScore * 0.30 +
    wqScore * 0.30 +
    vegScore * 0.20 +
    threatScore * 0.20
  );

  // Condition class
  let conditionClass: ConditionClass;
  if (conditionScore >= 90) conditionClass = 'excellent';
  else if (conditionScore >= 75) conditionClass = 'good';
  else if (conditionScore >= 60) conditionClass = 'fair';
  else if (conditionScore >= 40) conditionClass = 'poor';
  else conditionClass = 'critical';

  // Ramsar criteria (if Ramsar site)
  const ramsarCriteria = wetland.nwiaCode ? [1, 2] : undefined;

  return {
    wetlandSlug: wetland.slug,
    wetlandName: wetland.name,
    conditionClass,
    conditionScore,
    componentAssessment: {
      hydrology: {
        score: hydroScore,
        connectivity,
        waterRegime,
      },
      waterQuality: {
        score: wqScore,
        nutrients,
        turbidity,
        dissolvedOxygen,
      },
      vegetation: {
        score: vegScore,
        nativeCover,
        invasiveCover,
      },
      threats: {
        score: threatScore,
        encroachment,
        pollution,
        disturbance,
      },
    },
    ramsarCriteria,
    lastAssessment: wetland.updatedAt,
  };
}

export function getAllWetlandConditions(): WetlandCondition[] {
  return wetlandsData
    .map((wetland) => getWetlandCondition(wetland.slug))
    .filter((cond): cond is WetlandCondition => cond !== null);
}

// ============================================================================
// RIVER CORRIDOR STRESS FUNCTIONS
// ============================================================================

export function getRiverCorridorStress(riverSlug: string): RiverCorridorStress | null {
  const river = riversData.find((r) => r.slug === riverSlug);
  if (!river) return null;

  // Riparian buffer (estimated)
  const averageWidth = river.length && river.length > 100 ? 80 : 30;
  const continuity: 'intact' | 'fragmented' | 'severed' = 'fragmented';
  const vegetationCondition: 'pristine' | 'good' | 'degraded' = 'good';

  // Land use stress (estimated)
  const urbanCoverage = river.district === 'Srinagar' ? 25 : 10;
  const agriculturalCoverage = 40;
  const forestCoverage = 35;
  const landUseScore = 100 - (urbanCoverage + agriculturalCoverage / 2);

  // Flow regulation
  const dams = river.length && river.length > 200 ? 1 : 0;
  const diversions = 0;
  const abstractionLevel: 'low' | 'moderate' | 'high' = 'moderate';

  // Sediment load
  const sedimentLevel = 'moderate' as const;
  const erosionSources: string[] = [];
  const siltationRisk = 'moderate' as const;

  // Overall stress score
  const stressScore = Math.round(
    (100 - averageWidth) * 0.30 +
    (100 - landUseScore) * 0.30 +
    (dams * 20 + diversions * 10) * 0.20 +
    50 * 0.20  // Moderate sediment level
  );

  // Classification
  let classification: StressClassification;
  if (stressScore >= 75) classification = 'critical';
  else if (stressScore >= 50) classification = 'high';
  else if (stressScore >= 25) classification = 'moderate';
  else classification = 'low';

  return {
    riverSlug: river.slug,
    riverName: river.name,
    stressScore,
    classification,
    riparianBuffer: {
      averageWidth,
      continuity,
      vegetationCondition,
    },
    landUseStress: {
      score: landUseScore,
      urbanCoverage,
      agriculturalCoverage,
      forestCoverage,
    },
    flowRegulation: {
      dams,
      diversions,
      abstractionLevel,
    },
    sedimentLoad: {
      level: sedimentLevel,
      erosionSources,
      siltationRisk,
    },
    lastAssessment: river.updatedAt,
  };
}

export function getAllRiverCorridorStress(): RiverCorridorStress[] {
  return riversData
    .map((river) => getRiverCorridorStress(river.slug))
    .filter((stress): stress is RiverCorridorStress => stress !== null);
}

// ============================================================================
// WATER QUALITY TREND FUNCTIONS
// ============================================================================

export function getWaterQualityTrends(siteSlug: string): WaterQualityTrend[] {
  const site = waterQualitySites.find((s) => s.slug === siteSlug);
  if (!site || !site.waterQuality) return [];

  const trends: WaterQualityTrend[] = [];

  // pH trend
  if (site.waterQuality.trends?.pH) {
    trends.push({
      siteSlug: site.slug,
      parameter: 'pH',
      trend: site.waterQuality.trends.pH,
      trendSignificance: 'moderate',
      baselineValue: 7.0,
      currentValue: site.waterQuality.pH,
      changePercent: Math.round(((site.waterQuality.pH - 7.0) / 7.0) * 100),
      seasonalPattern: {
        spring: 7.2,
        summer: 7.0,
        autumn: 7.1,
        winter: 7.3,
      },
      analysisPeriod: {
        start: '2020-01-01',
        end: '2023-12-31',
        dataPoints: 48,
      },
    });
  }

  // Dissolved oxygen trend
  if (site.waterQuality.trends?.dissolvedOxygen) {
    trends.push({
      siteSlug: site.slug,
      parameter: 'Dissolved Oxygen',
      trend: site.waterQuality.trends.dissolvedOxygen,
      trendSignificance: 'significant',
      baselineValue: 8.0,
      currentValue: site.waterQuality.dissolvedOxygen,
      changePercent: Math.round(((site.waterQuality.dissolvedOxygen - 8.0) / 8.0) * 100),
      seasonalPattern: {
        spring: 8.5,
        summer: 7.0,
        autumn: 7.5,
        winter: 9.0,
      },
      analysisPeriod: {
        start: '2020-01-01',
        end: '2023-12-31',
        dataPoints: 48,
      },
    });
  }

  // Turbidity trend
  if (site.waterQuality.trends?.turbidity) {
    trends.push({
      siteSlug: site.slug,
      parameter: 'Turbidity',
      trend: site.waterQuality.trends.turbidity,
      trendSignificance: 'moderate',
      baselineValue: 10,
      currentValue: site.waterQuality.turbidity,
      changePercent: Math.round(((site.waterQuality.turbidity - 10) / 10) * 100),
      seasonalPattern: {
        spring: 8,
        summer: 15,
        autumn: 12,
        winter: 6,
      },
      analysisPeriod: {
        start: '2020-01-01',
        end: '2023-12-31',
        dataPoints: 48,
      },
    });
  }

  return trends;
}

// ============================================================================
// DISTRICT WATER INTELLIGENCE FUNCTIONS
// ============================================================================

export function getDistrictWaterIntelligence(district: string): DistrictWaterIntelligence {
  const districtLakes = lakesData.filter((l) => l.district === district);
  const districtWetlands = wetlandsData.filter((w) => w.district === district);
  const districtRivers = riversData.filter((r) => r.district === district);
  const districtSprings = springsData.filter((s) => s.district === district);

  const totalWaterBodies =
    districtLakes.length +
    districtWetlands.length +
    districtRivers.length +
    districtSprings.length;

  // Average health score (from lakes)
  const lakeHealthScores = districtLakes.map((l) => getLakeHealthScorecard(l.slug));
  const validScores = lakeHealthScores.filter((s): s is LakeHealthScorecard => s !== null);
  const averageHealthScore =
    validScores.length > 0
      ? Math.round(validScores.reduce((a, b) => a + b.overallScore, 0) / validScores.length)
      : 0;

  // Critical water bodies
  const criticalWaterBodies = validScores
    .filter((s) => s.classification === 'poor' || s.classification === 'critical')
    .map((s) => s.lakeName);

  // Restoration investments
  const districtRestoration = restorationSites.filter((r) => r.district === district);
  const restorationInvestments = districtRestoration.reduce(
    (sum, r) => sum + (r.restorationData?.budget || 0),
    0
  );

  // Water quality status
  const allWaterEntities = [...districtLakes, ...districtWetlands, ...districtRivers, ...districtSprings];
  const waterQualityStatus = {
    excellent: allWaterEntities.filter((e) => e.waterQuality?.status === 'excellent').length,
    good: allWaterEntities.filter((e) => e.waterQuality?.status === 'good').length,
    moderate: allWaterEntities.filter((e) => e.waterQuality?.status === 'moderate').length,
    poor: allWaterEntities.filter((e) => e.waterQuality?.status === 'poor').length,
    critical: allWaterEntities.filter((e) => e.waterQuality?.status === 'critical').length,
  };

  return {
    district,
    waterBodies: {
      lakes: districtLakes.length,
      wetlands: districtWetlands.length,
      rivers: districtRivers.length,
      springs: districtSprings.length,
      total: totalWaterBodies,
    },
    averageHealthScore,
    criticalWaterBodies,
    restorationInvestments,
    restorationProjects: districtRestoration.length,
    waterQualityStatus,
  };
}

// ============================================================================
// EXPORT ALL DATA FOR CONVENIENCE
// ============================================================================

export {
  lakesData,
  springsData,
  wetlandsData,
  riversData,
  watershedsData,
  waterQualitySites,
  restorationSites,
} from './water-systems';
