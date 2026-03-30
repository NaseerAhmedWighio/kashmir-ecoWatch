// Seasonal Ecology Types for Kashmir Environmental Intelligence Platform

export type SeasonType = 'spring' | 'summer' | 'monsoon' | 'autumn' | 'winter' | 'pre-spring';
export type ElevationZone = 'lowland' | 'mid-elevation' | 'highland' | 'alpine' | 'nival';
export type HabitatType = 'wetland' | 'forest' | 'meadow' | 'orchard' | 'riverine' | 'lake' | 'mountain' | 'valley' | 'alpine';
export type DistrictKashmir = 'srinagar' | 'anantnag' | 'baramulla' | 'budgam' | 'kupwara' | 'pulwama' | 'shopian' | 'bandipora' | 'ganderbal' | 'kulgam' | 'rambhan' | 'kishtwar' | 'doda' | 'poonch' | 'rajouri' | 'udhampur' | 'kathua' | 'samba';

export interface SeasonalTimingWindow {
  startMonth: number; // 1-12
  endMonth: number; // 1-12
  peakMonths?: number[];
  description: string;
}

export interface SeasonalLandscape {
  id: string;
  slug: string;
  name: string;
  category: 'valley' | 'orchard-belt' | 'alpine' | 'wetland-complex' | 'forest-landscape' | 'river-valley' | 'mountain-range';
  description: string;
  longDescription: string;
  districts: DistrictKashmir[];
  elevationZone: ElevationZone;
  elevationRange?: { min: number; max: number }; // meters
  area?: number; // km²
  primarySeasons: SeasonType[];
  keyFeatures: string[];
  ecologicalSignificance: string;
  seasonalDynamics: string;
  associatedSpecies?: string[];
  associatedWaterBodies?: string[];
  linkedTrails?: string[];
  coordinates?: { lat: number; lng: number };
  imageCredit?: string;
}

export interface BloomZone {
  id: string;
  slug: string;
  name: string;
  bloomType: 'orchard' | 'wildflower' | 'alpine-meadow' | 'wetland-flora' | 'medicinal-plant' | 'garden' | 'forest-understory';
  description: string;
  longDescription: string;
  primarySpecies: string[];
  districts: DistrictKashmir[];
  elevationZone: ElevationZone;
  elevationRange?: { min: number; max: number };
  bloomWindow: SeasonalTimingWindow;
  peakBloomPeriod: string;
  pollinators?: string[];
  ecologicalRole: string;
  culturalSignificance?: string;
  linkedLandscapes?: string[];
  linkedTrails?: string[];
  coordinates?: { lat: number; lng: number };
  imageCredit?: string;
}

export interface MigrationWindow {
  id: string;
  slug: string;
  name: string;
  wetlandType: 'marsh' | 'lake' | 'oxbow' | 'reservoir' | 'stream' | 'wetland-complex';
  description: string;
  longDescription: string;
  district: DistrictKashmir;
  primarySpecies: string[];
  migrationType: 'breeding' | 'wintering' | 'passage' | 'resident';
  arrivalWindow: SeasonalTimingWindow;
  departureWindow?: SeasonalTimingWindow;
  peakPresenceMonths: number[];
  populationEstimate?: string;
  habitatFeatures: string[];
  threats: string[];
  conservationMeasures?: string[];
  birdingRoutes?: string[];
  relatedSightings?: string[];
  coordinates?: { lat: number; lng: number };
  imageCredit?: string;
}

export interface PollinatorWindow {
  id: string;
  slug: string;
  name: string;
  pollinatorGroup: 'bee' | 'bumblebee' | 'butterfly' | 'moth' | 'fly' | 'beetle' | 'bird' | 'bat';
  description: string;
  longDescription: string;
  associatedBlooms: string[];
  districts: DistrictKashmir[];
  activityWindow: SeasonalTimingWindow;
  peakActivityMonths: number[];
  habitatTypes: HabitatType[];
  linkedAgriculturalLandscapes?: string[];
  linkedOrchards?: string[];
  linkedMeadows?: string[];
  ecologicalImportance: string;
  threats?: string[];
  coordinates?: { lat: number; lng: number };
  imageCredit?: string;
}

export interface PhenologyRecord {
  id: string;
  slug: string;
  recordType: 'flowering' | 'leaf-emergence' | 'fruit-set' | 'leaf-fall' | 'bird-arrival' | 'bird-departure' | 'breeding' | 'migration' | 'hibernation';
  title: string;
  description: string;
  longDescription: string;
  speciesName?: string;
  speciesCommonName?: string;
  taxonomicGroup?: 'mammals' | 'birds' | 'plants' | 'insects' | 'amphibians';
  districts: DistrictKashmir[];
  elevationZone: ElevationZone;
  observedTiming: SeasonalTimingWindow;
  historicalBaseline?: string;
  climateSensitivity?: 'low' | 'medium' | 'high';
  verificationStatus: 'verified' | 'provisional' | 'citizen-science';
  dataSources: string[];
  linkedBloomZones?: string[];
  linkedHabitats?: string[];
  coordinates?: { lat: number; lng: number };
  imageCredit?: string;
}

export interface HabitatSignal {
  id: string;
  slug: string;
  name: string;
  signalType: 'wetland-expansion' | 'wetland-contraction' | 'reedbed-growth' | 'forest-green-up' | 'forest-senescence' | 'meadow-emergence' | 'snow-retreat' | 'ice-formation';
  description: string;
  longDescription: string;
  districts: DistrictKashmir[];
  elevationZone: ElevationZone;
  seasonalTiming: SeasonalTimingWindow;
  ecologicalDrivers: string[];
  climateIndicators: string[];
  linkedWaterBodies?: string[];
  linkedSpecies?: string[];
  monitoringParameters?: string[];
  coordinates?: { lat: number; lng: number };
  imageCredit?: string;
}

export interface WaterTransition {
  id: string;
  slug: string;
  name: string;
  waterbodyType: 'lake' | 'wetland' | 'river' | 'stream' | 'spring' | 'glacier-fed' | 'reservoir';
  description: string;
  longDescription: string;
  district: DistrictKashmir;
  transitionType: 'high-flow' | 'low-flow' | 'flood-pulse' | 'seasonal-filling' | 'seasonal-drawdown' | 'ice-cover' | 'ice-melt';
  seasonalTiming: SeasonalTimingWindow;
  hydrologicalMetrics: {
    avgDepthChange?: number; // meters
    areaChange?: number; // percentage
    flowRateChange?: string;
  };
  ecologicalImpacts: string[];
  linkedSpecies?: string[];
  linkedHabitats?: string[];
  floodBufferingRole?: string;
  coordinates?: { lat: number; lng: number };
  imageCredit?: string;
}

export interface SpeciesActivity {
  id: string;
  slug: string;
  speciesName: string;
  speciesCommonName: string;
  taxonomicGroup: 'mammals' | 'birds' | 'plants' | 'insects' | 'amphibians' | 'fish';
  activityType: 'breeding' | 'migration' | 'flowering' | 'fruiting' | 'foraging' | 'hibernation' | 'visibility-peak';
  description: string;
  longDescription: string;
  districts: DistrictKashmir[];
  elevationZone: ElevationZone;
  activityWindow: SeasonalTimingWindow;
  peakMonths: number[];
  habitatTypes: HabitatType[];
  protectedAreas?: string[];
  linkedSightings?: string[];
  conservationContext?: string;
  coordinates?: { lat: number; lng: number };
  imageCredit?: string;
}

export interface ClimateWindow {
  id: string;
  slug: string;
  name: string;
  windowType: 'winter-restriction' | 'spring-opening' | 'summer-access' | 'autumn-observation' | 'monsoon-limitation' | 'field-readiness';
  description: string;
  longDescription: string;
  districts: DistrictKashmir[];
  elevationZone: ElevationZone;
  timingWindow: SeasonalTimingWindow;
  accessibilityConditions: string[];
  visibilityConditions: string;
  fieldReadinessIndicators: string[];
  linkedTrails?: string[];
  linkedRiskMonitoring?: string[];
  coordinates?: { lat: number; lng: number };
  imageCredit?: string;
}

export interface SeasonalReport {
  id: string;
  slug: string;
  title: string;
  reportType: 'scientific-study' | 'field-survey' | 'monitoring-report' | 'phenology-dataset' | 'climate-assessment' | 'biodiversity-inventory';
  description: string;
  longDescription: string;
  publicationDate: string;
  authors: string[];
  organization?: string;
  linkedDistricts: DistrictKashmir[];
  linkedSpecies?: string[];
  linkedGeographies?: string[];
  seasonalFocus: SeasonType[];
  keywords: string[];
  downloadUrl?: string;
  citationFormat: string;
  imageCredit?: string;
}

export interface SeasonalMetric {
  label: string;
  value: number | string;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  icon: string;
}

export interface SeasonalNavigationCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  count?: number;
  link: string;
  color: string;
  featured?: boolean;
}

export interface KashmirDistrictSeason {
  district: DistrictKashmir;
  primarySeasons: SeasonType[];
  keyLandscapes: number;
  bloomZones: number;
  migrationWindows: number;
  highlights: string[];
}
