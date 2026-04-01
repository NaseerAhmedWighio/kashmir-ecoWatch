// Biodiversity Intelligence Type Definitions
// Enhanced types for full biodiversity intelligence system

// ============================================================================
// ENDEMISM STATUS
// ============================================================================

export type EndemismStatus = 
  | 'kashmir-endemic'      // Unique to Kashmir region
  | 'himalayan-endemic'    // Himalayan range only
  | 'northwest-himalayan'  // NW Himalayas (J&K, HP, Uttarakhand)
  | 'trans-himalayan'      // Ladakh, Tibet plateau
  | 'widely-distributed';  // Not endemic

// ============================================================================
// DATA SOURCE & VERIFICATION
// ============================================================================

export type DataSourceType = 'inventory' | 'monitoring' | 'sighting' | 'legacy';

export type DataQualityFlag = 'high' | 'medium' | 'low' | 'unverified';

export type VerificationStatus = 'verified' | 'reviewed' | 'community' | 'pending';

export interface DataSource {
  type: DataSourceType;
  reference?: string;           // Citation or report name
  year?: number;                // Source year
  verifiedBy?: string;          // Expert name
  verificationDate?: string;    // ISO date
  qualityFlag?: DataQualityFlag;
  confidence?: number;          // 0-100
}

// ============================================================================
// MIGRATION
// ============================================================================

export type MigrationType = 'breeder' | 'winter-visitor' | 'summer-visitor' | 'passage-migrant';

export type Flyway = 'central-asian' | 'east-asian' | 'west-asian';

export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export interface MigrationWindow {
  season: Season;
  arrivalMonth?: number;        // 1-12
  departureMonth?: number;      // 1-12
  peakPresence?: number[];      // Array of months [10, 11, 12, 1, 2]
  migrationType: MigrationType;
  flyway?: Flyway;
  concentration?: 'low' | 'medium' | 'high' | 'very-high';
}

// ============================================================================
// SPECIES DISTRIBUTION
// ============================================================================

export type OccurrenceType = 'confirmed' | 'probable' | 'possible';

export type ObserverType = 'expert' | 'field-team' | 'citizen-scientist';

export interface SpeciesDistributionPoint {
  district: string;
  habitat: string;
  protectedArea?: string;
  elevation: number;            // meters
  coordinates?: { lat: number; lng: number };
  occurrenceType: OccurrenceType;
  source: DataSource;
  recordedDate?: string;        // ISO date
  observerType?: ObserverType;
}

// ============================================================================
// HABITAT PRESSURE & VULNERABILITY
// ============================================================================

export type PressureTrend = 'improving' | 'stable' | 'declining';

export type ThreatTrend = 'increasing' | 'stable' | 'decreasing';

export type ThreatSeverity = 'low' | 'medium' | 'high' | 'critical';

export interface HabitatPressureIndex {
  habitatSlug: string;
  overallScore: number;         // 0-100 (100 = highest pressure)
  trend: PressureTrend;
  drivers: {
    habitatFragmentation: number;    // 0-100
    loggingPressure: number;         // 0-100
    grazingPressure: number;         // 0-100
    climateChange: number;           // 0-100
    pollution: number;               // 0-100
    hydrologicalChange: number;      // 0-100
    humanDisturbance: number;        // 0-100
  };
  mitigationActions?: string[];
  lastAssessmentDate: string;
}

export interface VulnerabilityTrendPoint {
  year: number;
  score: number;
  assessment?: string;
}

// ============================================================================
// CONSERVATION PRIORITY
// ============================================================================

export type ConservationPriority = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type SensitivityLevel = 'low' | 'medium' | 'high' | 'critical';

export type IUCNStatus = 'LC' | 'NT' | 'VU' | 'EN' | 'CR' | 'EW' | 'EX';

export type TaxonomicGroup = 'mammals' | 'birds' | 'fish' | 'plants' | 'medicinal-plants' | 'reptiles-amphibians';

// ============================================================================
// ENHANCED SPECIES MODEL
// ============================================================================

export interface BiodiversitySpecies {
  // Core Identity
  id: string;
  slug: string;
  commonName: string;
  scientificName: string;
  localName?: string;
  taxonomicGroup: TaxonomicGroup;
  category?: string;
  
  // Conservation
  conservationStatus: IUCNStatus;
  sensitivity: SensitivityLevel;
  endemismStatus: EndemismStatus;
  conservationPriority?: ConservationPriority;
  
  // Description
  description: string;
  ecologicalRole: string;
  
  // Distribution
  habitats: string[];
  elevationRange: { min: number; max: number };
  districts: string[];
  protectedAreas: string[];
  distributionPoints: SpeciesDistributionPoint[];
  
  // Ecology
  seasonality?: string;
  migrationWindow?: MigrationWindow;
  threats: string[];
  conservationMeasures?: string[];
  
  // Data Quality
  dataSource: DataSource;
  verifiedSightings?: number;
  pressureIndex?: number;       // 0-100
  
  // Media & Relations
  imageUrl?: string;
  relatedSpecies?: string[];
  references?: string[];
}

// ============================================================================
// HABITAT BIODIVERSITY (ENHANCED)
// ============================================================================

export interface HabitatBiodiversity {
  id: string;
  slug: string;
  name: string;
  description: string;
  
  // Area
  areaKm2: number;
  percentOfKashmir: number;
  districts: string[];
  
  // Species Metrics
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
  
  // Protection
  protectedAreaOverlap: number;
  ramserSites?: number;
  
  // Vulnerability
  vulnerabilityScore: 'low' | 'medium' | 'high' | 'critical';
  pressureIndex: HabitatPressureIndex;
  vulnerabilityTrend: VulnerabilityTrendPoint[];
  riskDrivers: string[];
  
  // Species Lists
  speciesList: string[];        // Array of species slugs
  flagshipSpecies: string[];
  
  // Relations
  relatedProtectedAreas: string[];
  relatedWaterSystems?: string[];
  relatedTrails?: string[];
  
  // Media
  imageUrl?: string;
}

// ============================================================================
// DISTRICT BIODIVERSITY (ENHANCED)
// ============================================================================

export type ConflictLevel = 'low' | 'medium' | 'high' | 'critical';

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface DistrictBiodiversity {
  district: string;
  
  // Species Counts
  totalSpecies: number;
  mammals: number;
  birds: number;
  fish: number;
  plants: number;
  medicinalPlants: number;
  
  // Conservation
  threatenedSpecies: number;
  endemicSpecies: number;
  migratorySpecies: number;
  
  // Habitats
  primaryHabitats: string[];
  protectedAreaCoverage: number; // km²
  
  // Hotspots
  biodiversityHotspots: string[];
  wetlandBirdConcentration?: number;
  alpineBiodiversityScore?: number;
  medicinalPlantLandscapes?: string[];
  
  // Risk
  habitatLossRisk: RiskLevel;
  humanWildlifeConflict: ConflictLevel;
  
  // Species Lists
  speciesList: string[];
  endemicSpeciesList: string[];
  threatenedSpeciesList: string[];
  
  // Relations
  relatedProtectedAreas: string[];
  relatedTrails: string[];
  
  // Monitoring
  monitoringSites?: string[];
  lastSurveyYear?: number;
}

// ============================================================================
// THREAT & RISK ANALYTICS
// ============================================================================

export interface ThreatAnalysis {
  threatType: string;
  severity: ThreatSeverity;
  affectedSpeciesCount: number;
  affectedHabitats: string[];
  affectedDistricts: string[];
  trend: ThreatTrend;
  mitigationActions?: string[];
}

export interface RiskDashboardData {
  overallRiskScore: number;     // 0-100
  riskByTaxon: {
    mammals: number;
    birds: number;
    fish: number;
    plants: number;
  };
  riskByHabitat: Record<string, number>;
  riskByDistrict: Record<string, number>;
  topThreats: ThreatAnalysis[];
  priorityActions: string[];
  temporalTrend: { year: number; riskScore: number }[];
}

// ============================================================================
// MONITORING
// ============================================================================

export type MonitoringFrequency = 'weekly' | 'monthly' | 'quarterly' | 'annually';

export interface MonitoringProtocol {
  speciesSlug: string;
  protocol: string;
  frequency: MonitoringFrequency;
  responsibleAgency: string;
  indicators: string[];
  lastAssessment?: string;
  nextAssessment?: string;
  status?: 'on-time' | 'overdue' | 'upcoming';
}

// ============================================================================
// MIGRATION CALENDAR
// ============================================================================

export interface MigrationMonth {
  month: number;                // 1-12
  name: string;                 // January, February, etc.
  species: BiodiversitySpecies[];
  peakSpecies: BiodiversitySpecies[];
}

export interface MigrationCalendarData {
  year: number;
  months: MigrationMonth[];
  totalMigratorySpecies: number;
  byFlyway: {
    centralAsian: number;
    eastAsian: number;
    westAsian: number;
  };
  byType: {
    breeder: number;
    winterVisitor: number;
    summerVisitor: number;
    passageMigrant: number;
  };
}

// ============================================================================
// FILTER STATE
// ============================================================================

export interface BiodiversityFilterState {
  taxonomicGroup: TaxonomicGroup | null;
  conservationStatus: IUCNStatus | null;
  endemismStatus: EndemismStatus | null;
  habitat: string | null;
  district: string | null;
  migrationType: MigrationType | null;
  sourceType: DataSourceType | null;
  qualityFlag: DataQualityFlag | null;
  verificationStatus: VerificationStatus | null;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface SpeciesCount {
  total: number;
  mammals: number;
  birds: number;
  fish: number;
  plants: number;
  medicinalPlants: number;
  threatened: number;
  endemic: number;
  migratory: number;
}
