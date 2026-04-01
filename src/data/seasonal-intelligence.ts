// Seasonal Intelligence Functions
// Enhanced seasonal ecology with anomaly detection, climate shifts, agriculture, and alerts

import type {
  PhenologyAnomaly,
  ClimateShiftIndicator,
  AgriculturalWindow,
  SeasonalAlert,
  SeasonalDashboardData,
  DistrictSeasonalSignature,
  AnomalyClassification,
  SeasonType,
  BloomZone,
  MigrationWindow,
} from '../types/seasonal-ecology';

import { getSeasonalEcologyData, kashmirDistrictSeasons } from './seasonal-ecology';

// Get data from access functions
const bloomZones: BloomZone[] = getSeasonalEcologyData.blooms.all();
const migrationWindows: MigrationWindow[] = getSeasonalEcologyData.migration.all();
const phenologyRecords = getSeasonalEcologyData.phenology.all();

// ============================================================================
// PHENOLOGY ANOMALY DETECTION
// ============================================================================

function calculateAnomalyDays(baseline: string, current: string): number {
  const baselineDate = new Date(baseline);
  const currentDate = new Date(current);
  const diffTime = currentDate.getTime() - baselineDate.getTime();
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
}

function classifyAnomaly(anomalyDays: number): AnomalyClassification {
  const absAnomaly = Math.abs(anomalyDays);
  if (absAnomaly < 7) return 'normal';
  if (anomalyDays < 0 && absAnomaly < 14) return 'early';
  if (anomalyDays > 0 && absAnomaly < 14) return 'late';
  if (anomalyDays < 0 && absAnomaly < 21) return 'significantly-early';
  if (anomalyDays > 0 && absAnomaly < 21) return 'significantly-late';
  return 'extremely-shifted';
}

export function getPhenologyAnomalies(district?: string): PhenologyAnomaly[] {
  const currentYear = new Date().getFullYear();
  
  return phenologyRecords
    .filter((record) => !district || record.districts.includes(district as any))
    .filter((record) => record.historicalBaseline)
    .map((record) => {
      // Extract baseline date from historical baseline text (simplified)
      const baselineMatch = record.historicalBaseline?.match(/(\d{4}-\d{2}-\d{2})/);
      const baselineDate = baselineMatch ? baselineMatch[0] : `${currentYear - 1}-01-01`;
      
      // Simulate current year observation (in real implementation, this would come from data)
      const anomalyDays = Math.floor(Math.random() * 30) - 15; // -15 to +15 days
      const currentDate = new Date(new Date(baselineDate).getTime() + anomalyDays * 24 * 60 * 60 * 1000);
      
      return {
        recordSlug: record.slug,
        recordType: record.recordType,
        speciesOrEvent: record.speciesCommonName || record.title,
        district: record.districts[0],
        baselineDate: baselineDate,
        currentYearDate: currentDate.toISOString().split('T')[0],
        anomalyDays,
        classification: classifyAnomaly(anomalyDays),
        climateCorrelation: {
          temperatureAnomaly: (Math.random() - 0.5) * 2, // -1 to +1 °C
          precipitationAnomaly: (Math.random() - 0.5) * 20, // -10% to +10%
        },
        ecologicalImpacts: [],
        monitoringStatus: Math.abs(anomalyDays) > 14 ? 'concern' : 'active',
      };
    });
}

export function getPhenologyTrend(recordSlug: string): { year: number; date: string }[] {
  // Simulated trend data (in real implementation, this would come from historical records)
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 10 }, (_, i) => ({
    year: currentYear - 9 + i,
    date: new Date(currentYear - 9 + i, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
  }));
}

// ============================================================================
// CLIMATE-SHIFT INDICATORS
// ============================================================================

export function getClimateShiftIndicators(): ClimateShiftIndicator[] {
  return [
    {
      indicator: 'Spring Onset',
      unit: 'days from Jan 1',
      baseline: { period: '1980-2010', value: 90 },
      current: { year: 2024, value: 85 },
      trend: {
        changePerDecade: -1.7,
        direction: 'decreasing',
        significance: 'significant',
      },
      ecologicalImpacts: ['Earlier bloom', 'Pollinator mismatch risk', 'Extended growing season'],
      visualizationType: 'line',
    },
    {
      indicator: 'Autumn Arrival',
      unit: 'days from Jan 1',
      baseline: { period: '1980-2010', value: 270 },
      current: { year: 2024, value: 275 },
      trend: {
        changePerDecade: 1.5,
        direction: 'increasing',
        significance: 'moderate',
      },
      ecologicalImpacts: ['Later leaf fall', 'Extended tourism season', 'Delayed dormancy'],
      visualizationType: 'line',
    },
    {
      indicator: 'Growing Season Length',
      unit: 'days',
      baseline: { period: '1980-2010', value: 180 },
      current: { year: 2024, value: 190 },
      trend: {
        changePerDecade: 3.3,
        direction: 'increasing',
        significance: 'significant',
      },
      ecologicalImpacts: ['Increased productivity', 'Water stress risk', 'Pest pressure'],
      visualizationType: 'bar',
    },
    {
      indicator: 'Average Temperature',
      unit: '°C',
      baseline: { period: '1980-2010', value: 13.2 },
      current: { year: 2024, value: 14.1 },
      trend: {
        changePerDecade: 0.3,
        direction: 'increasing',
        significance: 'significant',
      },
      ecologicalImpacts: ['Species range shifts', 'Snowpack reduction', 'Heat stress'],
      visualizationType: 'line',
    },
    {
      indicator: 'Snowpack Depth',
      unit: 'cm',
      baseline: { period: '1980-2010', value: 120 },
      current: { year: 2024, value: 95 },
      trend: {
        changePerDecade: -8.3,
        direction: 'decreasing',
        significance: 'significant',
      },
      ecologicalImpacts: ['Reduced water availability', 'Earlier melt', 'Stream flow changes'],
      visualizationType: 'bar',
    },
    {
      indicator: 'Precipitation',
      unit: 'mm/year',
      baseline: { period: '1980-2010', value: 650 },
      current: { year: 2024, value: 620 },
      trend: {
        changePerDecade: -10,
        direction: 'decreasing',
        significance: 'moderate',
      },
      ecologicalImpacts: ['Drought risk', 'Agricultural stress', 'Wetland decline'],
      visualizationType: 'bar',
    },
    {
      indicator: 'Extreme Heat Days',
      unit: 'days/year >30°C',
      baseline: { period: '1980-2010', value: 15 },
      current: { year: 2024, value: 22 },
      trend: {
        changePerDecade: 2.3,
        direction: 'increasing',
        significance: 'significant',
      },
      ecologicalImpacts: ['Heat stress', 'Crop damage', 'Human health risk'],
      visualizationType: 'bar',
    },
    {
      indicator: 'Glacier Mass Balance',
      unit: 'm water equivalent',
      baseline: { period: '1980-2010', value: -0.5 },
      current: { year: 2024, value: -0.8 },
      trend: {
        changePerDecade: -0.1,
        direction: 'decreasing',
        significance: 'significant',
      },
      ecologicalImpacts: ['Long-term water security', 'GLOF risk', 'Stream flow changes'],
      visualizationType: 'line',
    },
  ];
}

// ============================================================================
// AGRICULTURAL WINDOWS
// ============================================================================

export function getAgriculturalWindows(cropType?: string): AgriculturalWindow[] {
  const windows: AgriculturalWindow[] = [
    {
      slug: 'almond-srinagar',
      cropType: 'almond',
      district: 'srinagar',
      phenologicalStages: {
        budBurst: { startMonth: 2, endMonth: 3, peakMonths: [3], description: 'Early March' },
        bloom: { startMonth: 3, endMonth: 4, peakMonths: [3], description: 'Mid-March to early April' },
        fruitSet: { startMonth: 4, endMonth: 5, peakMonths: [4], description: 'April' },
        fruitDevelopment: { startMonth: 5, endMonth: 7, peakMonths: [6], description: 'May-July' },
        harvest: { startMonth: 7, endMonth: 8, peakMonths: [8], description: 'August' },
      },
      climateRequirements: {
        chillingHours: 800,
        growingDegreeDays: 1200,
        frostRisk: 'high',
      },
      pollinatorAlignment: {
        primaryPollinators: ['honey-bee', 'wild-bee'],
        pollinatorWindow: { startMonth: 3, endMonth: 4, peakMonths: [3], description: 'March-April' },
        alignmentStatus: 'aligned',
      },
      advisories: ['Frost protection during bloom', 'Ensure pollinator habitat', 'Monitor irrigation'],
    },
    {
      slug: 'apple-srinagar',
      cropType: 'apple',
      district: 'srinagar',
      phenologicalStages: {
        budBurst: { startMonth: 3, endMonth: 4, peakMonths: [3], description: 'Late March' },
        bloom: { startMonth: 4, endMonth: 5, peakMonths: [4], description: 'April' },
        fruitSet: { startMonth: 5, endMonth: 6, peakMonths: [5], description: 'May' },
        fruitDevelopment: { startMonth: 6, endMonth: 9, peakMonths: [7, 8], description: 'June-September' },
        harvest: { startMonth: 9, endMonth: 11, peakMonths: [10], description: 'September-October' },
      },
      climateRequirements: {
        chillingHours: 1200,
        growingDegreeDays: 1400,
        frostRisk: 'moderate',
      },
      pollinatorAlignment: {
        primaryPollinators: ['honey-bee', 'bumblebee'],
        pollinatorWindow: { startMonth: 4, endMonth: 5, peakMonths: [4], description: 'April-May' },
        alignmentStatus: 'aligned',
      },
      advisories: ['Thinning for quality', 'Pest monitoring', 'Pre-harvest irrigation management'],
    },
    {
      slug: 'cherry-srinagar',
      cropType: 'cherry',
      district: 'srinagar',
      phenologicalStages: {
        budBurst: { startMonth: 3, endMonth: 4, peakMonths: [3], description: 'March' },
        bloom: { startMonth: 4, endMonth: 4, peakMonths: [4], description: 'Early April' },
        fruitSet: { startMonth: 4, endMonth: 5, peakMonths: [5], description: 'May' },
        fruitDevelopment: { startMonth: 5, endMonth: 6, peakMonths: [6], description: 'June' },
        harvest: { startMonth: 6, endMonth: 7, peakMonths: [6], description: 'June-July' },
      },
      climateRequirements: {
        chillingHours: 1000,
        growingDegreeDays: 1100,
        frostRisk: 'high',
      },
      pollinatorAlignment: {
        primaryPollinators: ['honey-bee'],
        pollinatorWindow: { startMonth: 4, endMonth: 4, peakMonths: [4], description: 'April' },
        alignmentStatus: 'mismatch-risk',
      },
      advisories: ['Bird netting', 'Frost protection', 'Early harvest for premium market'],
    },
    {
      slug: 'peach-pulwama',
      cropType: 'peach',
      district: 'pulwama',
      phenologicalStages: {
        budBurst: { startMonth: 3, endMonth: 4, peakMonths: [3], description: 'March' },
        bloom: { startMonth: 4, endMonth: 4, peakMonths: [4], description: 'April' },
        fruitSet: { startMonth: 4, endMonth: 5, peakMonths: [5], description: 'May' },
        fruitDevelopment: { startMonth: 5, endMonth: 7, peakMonths: [6, 7], description: 'June-July' },
        harvest: { startMonth: 7, endMonth: 8, peakMonths: [7], description: 'July-August' },
      },
      climateRequirements: {
        chillingHours: 900,
        growingDegreeDays: 1300,
        frostRisk: 'moderate',
      },
      pollinatorAlignment: {
        primaryPollinators: ['honey-bee', 'wild-bee'],
        pollinatorWindow: { startMonth: 4, endMonth: 5, peakMonths: [4], description: 'April-May' },
        alignmentStatus: 'aligned',
      },
      advisories: ['Summer pruning', 'Irrigation during fruit development', 'Pest monitoring'],
    },
    {
      slug: 'walnut-kishtwar',
      cropType: 'walnut',
      district: 'kishtwar',
      phenologicalStages: {
        budBurst: { startMonth: 4, endMonth: 5, peakMonths: [4], description: 'April' },
        bloom: { startMonth: 5, endMonth: 5, peakMonths: [5], description: 'May' },
        fruitSet: { startMonth: 5, endMonth: 6, peakMonths: [6], description: 'June' },
        fruitDevelopment: { startMonth: 6, endMonth: 9, peakMonths: [7, 8], description: 'July-September' },
        harvest: { startMonth: 9, endMonth: 10, peakMonths: [10], description: 'October' },
      },
      climateRequirements: {
        chillingHours: 1500,
        growingDegreeDays: 1600,
        frostRisk: 'low',
      },
      pollinatorAlignment: {
        primaryPollinators: ['wind'],
        pollinatorWindow: { startMonth: 5, endMonth: 5, peakMonths: [5], description: 'May' },
        alignmentStatus: 'aligned',
      },
      advisories: ['Late frost monitoring', 'Harvest timing for quality', 'Post-harvest drying'],
    },
    {
      slug: 'apricot-kargil',
      cropType: 'apricot',
      district: 'kishtwar',
      phenologicalStages: {
        budBurst: { startMonth: 3, endMonth: 4, peakMonths: [3], description: 'March' },
        bloom: { startMonth: 4, endMonth: 4, peakMonths: [4], description: 'April' },
        fruitSet: { startMonth: 4, endMonth: 5, peakMonths: [5], description: 'May' },
        fruitDevelopment: { startMonth: 5, endMonth: 7, peakMonths: [6, 7], description: 'June-July' },
        harvest: { startMonth: 7, endMonth: 8, peakMonths: [7], description: 'July-August' },
      },
      climateRequirements: {
        chillingHours: 1000,
        growingDegreeDays: 1200,
        frostRisk: 'high',
      },
      pollinatorAlignment: {
        primaryPollinators: ['honey-bee', 'wild-bee'],
        pollinatorWindow: { startMonth: 4, endMonth: 5, peakMonths: [4], description: 'April-May' },
        alignmentStatus: 'aligned',
      },
      advisories: ['Frost protection', 'Irrigation management', 'Drying for preservation'],
    },
  ];

  if (cropType) {
    return windows.filter((w) => w.cropType === cropType);
  }

  return windows;
}

export function getOrchardBloomCalendar(district: string): AgriculturalWindow[] {
  return getAgriculturalWindows().filter((w) => w.district === district);
}

export function getPollinatorAlignmentStatus(): { aligned: number; mismatchRisk: number; critical: number } {
  const windows = getAgriculturalWindows();
  return {
    aligned: windows.filter((w) => w.pollinatorAlignment.alignmentStatus === 'aligned').length,
    mismatchRisk: windows.filter((w) => w.pollinatorAlignment.alignmentStatus === 'mismatch-risk').length,
    critical: windows.filter((w) => w.pollinatorAlignment.alignmentStatus === 'critical-mismatch').length,
  };
}

// ============================================================================
// SEASONAL ALERTS
// ============================================================================

export function getSeasonalAlerts(season?: SeasonType): SeasonalAlert[] {
  const alerts: SeasonalAlert[] = [
    {
      id: 'frost-risk-spring-2024',
      type: 'frost-risk',
      severity: 'high',
      title: 'Late Frost Risk During Orchard Bloom',
      description: 'Temperature forecasts indicate potential frost events during peak almond and cherry bloom in Srinagar and Pulwama districts.',
      affectedDistricts: ['srinagar', 'pulwama', 'budgam'],
      affectedSeasons: ['spring'],
      affectedEntities: ['almond-srinagar', 'cherry-srinagar'],
      validFrom: '2024-03-15',
      validUntil: '2024-04-15',
      recommendedActions: [
        'Deploy frost protection measures (smudge pots, sprinklers)',
        'Monitor temperature forecasts daily',
        'Consider delayed irrigation to slow bud development',
      ],
      linkedRiskMonitoring: '/risk-monitoring/hydrological-risks',
    },
    {
      id: 'migration-peak-hokersar-2024',
      type: 'migration-peak',
      severity: 'moderate',
      title: 'Peak Migration at Hokersar Wetland',
      description: 'Waterfowl migration is at peak intensity with over 50,000 birds recorded. Optimal birding conditions through March.',
      affectedDistricts: ['srinagar'],
      affectedSeasons: ['spring'],
      affectedEntities: ['hokersar-migration'],
      validFrom: '2024-02-01',
      validUntil: '2024-03-31',
      recommendedActions: [
        'Plan birding visits during early morning hours',
        'Maintain safe distances from roosting areas',
        'Report unusual mortality events',
      ],
      linkedRiskMonitoring: '/risk-monitoring/bird-migration-monitoring',
    },
    {
      id: 'fire-risk-summer-2024',
      type: 'fire-risk',
      severity: 'high',
      title: 'Elevated Forest Fire Risk',
      description: 'Dry conditions and high temperatures create elevated fire risk in forested areas of Kupwara and Baramulla.',
      affectedDistricts: ['kupwara', 'baramulla', 'anantnag'],
      affectedSeasons: ['summer'],
      affectedEntities: ['forest-landscape-kupwara'],
      validFrom: '2024-06-01',
      validUntil: '2024-08-31',
      recommendedActions: [
        'Avoid open flames in forest areas',
        'Report smoke or fire immediately',
        'Follow local fire restrictions',
      ],
      linkedRiskMonitoring: '/risk-monitoring/forest-fire-risks',
    },
    {
      id: 'access-closure-winter-2024',
      type: 'access-closure',
      severity: 'critical',
      title: 'High-Altitude Route Closures',
      description: 'Winter snowfall has closed high-altitude routes including Tarsar-Marsar trek and Kolahoi Glacier expedition routes.',
      affectedDistricts: ['anantnag', 'kishtwar'],
      affectedSeasons: ['winter'],
      affectedEntities: ['tarsar-marsar-trek', 'kolahoi-glacier-expedition'],
      validFrom: '2024-11-01',
      validUntil: '2024-05-31',
      recommendedActions: [
        'Do not attempt closed routes',
        'Check with local authorities before travel',
        'Plan alternative low-altitude treks',
      ],
      linkedRiskMonitoring: '/risk-monitoring/glacier-cryosphere-risks',
    },
    {
      id: 'pollinator-mismatch-2024',
      type: 'pollinator-mismatch',
      severity: 'moderate',
      title: 'Bloom-Pollinator Timing Mismatch Risk',
      description: 'Early bloom due to warm spring may outpace pollinator emergence in cherry orchards.',
      affectedDistricts: ['srinagar', 'pulwama'],
      affectedSeasons: ['spring'],
      affectedEntities: ['cherry-srinagar'],
      validFrom: '2024-03-01',
      validUntil: '2024-04-30',
      recommendedActions: [
        'Consider managed pollinator deployment',
        'Monitor pollinator activity daily',
        'Document phenological observations',
      ],
      linkedRiskMonitoring: '/risk-monitoring/biodiversity-risks',
    },
  ];

  if (season) {
    return alerts.filter((a) => a.affectedSeasons.includes(season));
  }

  return alerts;
}

export function getActiveAlerts(district?: string): SeasonalAlert[] {
  const now = new Date();
  return getSeasonalAlerts().filter((alert) => {
    const validFrom = new Date(alert.validFrom);
    const validUntil = new Date(alert.validUntil);
    const inDateRange = now >= validFrom && now <= validUntil;
    const inDistrict = !district || alert.affectedDistricts.includes(district);
    return inDateRange && inDistrict;
  });
}

// ============================================================================
// SEASONAL DASHBOARD
// ============================================================================

export function getSeasonalDashboardData(): SeasonalDashboardData {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  
  // Determine current season
  let currentSeason: SeasonType = 'spring';
  if (currentMonth >= 3 && currentMonth <= 5) currentSeason = 'spring';
  else if (currentMonth >= 6 && currentMonth <= 8) currentSeason = 'summer';
  else if (currentMonth >= 9 && currentMonth <= 11) currentSeason = 'autumn';
  else currentSeason = 'winter';

  const activeBloomZones = bloomZones.filter((zone) => {
    const bloomStart = zone.bloomWindow.startMonth;
    const bloomEnd = zone.bloomWindow.endMonth;
    return currentMonth >= bloomStart && currentMonth <= bloomEnd;
  }).length;

  const activeMigrationWindows = migrationWindows.filter((window) => {
    const peakMonths = window.peakPresenceMonths;
    return peakMonths.includes(currentMonth);
  }).length;

  const activeAgriculturalWindows = getAgriculturalWindows().filter((window) => {
    const bloomStart = window.phenologicalStages.bloom.startMonth;
    const harvestEnd = window.phenologicalStages.harvest.endMonth;
    return currentMonth >= bloomStart && currentMonth <= harvestEnd;
  }).length;

  const activeAlerts = getActiveAlerts().length;
  const anomaliesDetected = getPhenologyAnomalies().filter((a) => a.classification !== 'normal').length;

  return {
    currentSeason,
    currentMonth,
    activeBloomZones,
    activeMigrationWindows,
    activeAgriculturalWindows,
    activeAlerts,
    anomaliesDetected,
    districtSummaries: kashmirDistrictSeasons.slice(0, 5).map((d) => ({
      district: d.district,
      season: currentSeason,
      primaryLandscapes: [],
      bloomEvents: [],
      migrationEvents: [],
      agriculturalActivities: [],
      accessStatus: 'open',
      tourismPotential: 'high',
      climateSummary: 'Current conditions',
      averageTemp: { min: 10, max: 25 },
      precipitation: 'Moderate',
    })),
    upcomingEvents: [
      {
        name: 'Almond Bloom Peak',
        type: 'bloom',
        timing: { startMonth: 3, endMonth: 4, peakMonths: [3], description: 'March-April' },
        district: 'srinagar',
      },
      {
        name: 'Waterfowl Migration Peak',
        type: 'migration',
        timing: { startMonth: 2, endMonth: 3, peakMonths: [3], description: 'February-March' },
        district: 'srinagar',
      },
      {
        name: 'Apple Bloom',
        type: 'bloom',
        timing: { startMonth: 4, endMonth: 5, peakMonths: [4], description: 'April-May' },
        district: 'srinagar',
      },
    ],
    climateIndicators: [
      { name: 'Temperature', currentValue: 14.1, unit: '°C', status: 'above-normal', trend: 'increasing' },
      { name: 'Snowpack', currentValue: 95, unit: 'cm', status: 'below-normal', trend: 'decreasing' },
      { name: 'Precipitation', currentValue: 620, unit: 'mm', status: 'normal', trend: 'stable' },
    ],
  };
}

// ============================================================================
// DISTRICT SEASONAL SIGNATURES
// ============================================================================

export function getDistrictSeasonalSignature(district: string, season: SeasonType): DistrictSeasonalSignature | null {
  const districtData = kashmirDistrictSeasons.find((d) => d.district === district);
  if (!districtData) return null;

  // Generate signature based on season
  return {
    district,
    season,
    primaryLandscapes: ['Valley', 'Orchard Belt'],
    bloomEvents: season === 'spring' ? [
      { name: 'Almond Bloom', timing: { startMonth: 3, endMonth: 4, peakMonths: [3], description: 'March' }, location: district },
      { name: 'Cherry Bloom', timing: { startMonth: 4, endMonth: 4, peakMonths: [4], description: 'April' }, location: district },
    ] : [],
    migrationEvents: season === 'spring' ? [
      { name: 'Waterfowl Arrival', species: 'Migratory Ducks', timing: { startMonth: 2, endMonth: 3, peakMonths: [3], description: 'Feb-Mar' }, location: district, type: 'arrival' },
    ] : [],
    agriculturalActivities: [
      { activity: 'Orchard Management', timing: { startMonth: 3, endMonth: 5, peakMonths: [4], description: 'Spring activities' }, district },
    ],
    accessStatus: season === 'winter' ? 'limited' : 'open',
    tourismPotential: season === 'spring' ? 'peak' : 'high',
    climateSummary: `Typical ${season} conditions`,
    averageTemp: { min: season === 'winter' ? -2 : 10, max: season === 'summer' ? 30 : 20 },
    precipitation: season === 'spring' ? 'Moderate' : 'Low',
  };
}
