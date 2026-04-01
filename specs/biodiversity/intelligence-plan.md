# Biodiversity Intelligence System - Architecture Plan

## 1. System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                     Biodiversity Intelligence                    │
│                          System                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌───────────────┐   ┌─────────────────┐   ┌─────────────────┐
│   Data Layer  │   │  Component Tree │   │   Navigation    │
│               │   │                 │   │   Structure     │
│ - Types       │   │ - Pages         │   │                 │
│ - Models      │   │ - Components    │   │ - Hub           │
│ - Functions   │   │ - Cards         │   │ - Detail Pages  │
│ - Constants   │   │ - Filters       │   │ - Category      │
└───────────────┘   └─────────────────┘   └─────────────────┘
```

---

## 2. Data Model Architecture

### 2.1 Type Definitions (`src/types/biodiversity.ts`)

```typescript
// NEW FILE - Central type definitions for biodiversity intelligence

// Endemism Status
export type EndemismStatus = 
  | 'kashmir-endemic'
  | 'himalayan-endemic'
  | 'northwest-himalayan'
  | 'trans-himalayan'
  | 'widely-distributed';

// Data Source Type
export type DataSourceType = 'inventory' | 'monitoring' | 'sighting' | 'legacy';

// Data Quality Flag
export type DataQualityFlag = 'high' | 'medium' | 'low' | 'unverified';

// Data Source Interface
export interface DataSource {
  type: DataSourceType;
  reference?: string;
  year?: number;
  verifiedBy?: string;
  verificationDate?: string;
  qualityFlag?: DataQualityFlag;
  confidence?: number; // 0-100
}

// Migration Type
export type MigrationType = 'breeder' | 'winter-visitor' | 'summer-visitor' | 'passage-migrant';

// Flyway
export type Flyway = 'central-asian' | 'east-asian' | 'west-asian';

// Enhanced Migration Window
export interface MigrationWindow {
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  arrivalMonth?: number;
  departureMonth?: number;
  peakPresence?: number[];
  migrationType: MigrationType;
  flyway?: Flyway;
  concentration?: 'low' | 'medium' | 'high' | 'very-high';
}

// Species Distribution Point
export interface SpeciesDistributionPoint {
  district: KashmirDistrict;
  habitat: HabitatType;
  protectedArea?: string;
  elevation: number;
  coordinates?: { lat: number; lng: number };
  occurrenceType: 'confirmed' | 'probable' | 'possible';
  source: DataSource;
  recordedDate?: string;
  observerType?: 'expert' | 'field-team' | 'citizen-scientist';
}

// Habitat Pressure Index
export interface HabitatPressureIndex {
  habitatSlug: string;
  overallScore: number; // 0-100
  trend: 'improving' | 'stable' | 'declining';
  drivers: {
    habitatFragmentation: number;
    loggingPressure: number;
    grazingPressure: number;
    climateChange: number;
    pollution: number;
    hydrologicalChange: number;
    humanDisturbance: number;
  };
  mitigationActions?: string[];
  lastAssessmentDate: string;
}

// Vulnerability Trend Point
export interface VulnerabilityTrendPoint {
  year: number;
  score: number;
  assessment?: string;
}

// Conservation Priority Level
export type ConservationPriority = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

// Enhanced Biodiversity Species
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
  habitats: HabitatType[];
  elevationRange: { min: number; max: number };
  districts: KashmirDistrict[];
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
  pressureIndex?: number;
  
  // Media & Relations
  imageUrl?: string;
  relatedSpecies?: string[];
  references?: string[];
}

// Taxonomic Group
export type TaxonomicGroup = 'mammals' | 'birds' | 'fish' | 'plants' | 'medicinal-plants' | 'reptiles-amphibians';

// IUCN Status
export type IUCNStatus = 'LC' | 'NT' | 'VU' | 'EN' | 'CR' | 'EW' | 'EX';

// Sensitivity Level
export type SensitivityLevel = 'low' | 'medium' | 'high' | 'critical';

// Habitat Biodiversity (Enhanced)
export interface HabitatBiodiversity {
  id: string;
  slug: string;
  name: string;
  description: string;
  
  // Area
  areaKm2: number;
  percentOfKashmir: number;
  districts: KashmirDistrict[];
  
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
  
  // Species Lists (NEW)
  speciesList: string[]; // Array of species slugs
  flagshipSpecies: string[];
  
  // Relations
  relatedProtectedAreas: string[];
  relatedWaterSystems?: string[];
  relatedTrails?: string[];
  
  // Media
  imageUrl?: string;
}

// District Biodiversity (Enhanced)
export interface DistrictBiodiversity {
  district: KashmirDistrict;
  
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
  primaryHabitats: HabitatType[];
  protectedAreaCoverage: number; // km²
  
  // Hotspots
  biodiversityHotspots: string[];
  wetlandBirdConcentration?: number;
  alpineBiodiversityScore?: number;
  medicinalPlantLandscapes?: string[];
  
  // Risk
  habitatLossRisk: 'low' | 'medium' | 'high' | 'critical';
  humanWildlifeConflict: 'low' | 'medium' | 'high' | 'critical';
  
  // Species Lists (NEW)
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

// Threat Analysis
export interface ThreatAnalysis {
  threatType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  affectedSpeciesCount: number;
  affectedHabitats: string[];
  affectedDistricts: KashmirDistrict[];
  trend: 'increasing' | 'stable' | 'decreasing';
  mitigationActions?: string[];
}

// Risk Dashboard Data
export interface RiskDashboardData {
  overallRiskScore: number; // 0-100
  riskByTaxon: {
    mammals: number;
    birds: number;
    fish: number;
    plants: number;
  };
  riskByHabitat: Record<string, number>;
  riskByDistrict: Record<KashmirDistrict, number>;
  topThreats: ThreatAnalysis[];
  priorityActions: string[];
  temporalTrend: { year: number; riskScore: number }[];
}

// Monitoring Protocol
export interface MonitoringProtocol {
  speciesSlug: string;
  protocol: string;
  frequency: 'weekly' | 'monthly' | 'quarterly' | 'annually';
  responsibleAgency: string;
  indicators: string[];
  lastAssessment?: string;
  nextAssessment?: string;
}
```

### 2.2 Data Access Layer (`src/data/biodiversity-access.ts`)

```typescript
// NEW FILE - Centralized data access functions

import { biodiversityData } from './biodiversity';
import { habitatBiodiversity } from './biodiversity-intelligence';
import { districtBiodiversity } from './biodiversity-intelligence';
import type {
  BiodiversitySpecies,
  HabitatBiodiversity,
  DistrictBiodiversity,
  EndemismStatus,
  MigrationWindow,
  DataSourceType,
  DataQualityFlag,
  RiskDashboardData,
  ThreatAnalysis,
} from '../types/biodiversity';

// ============= Endemic Species =============

export function getEndemicSpecies(endemismLevel?: EndemismStatus): BiodiversitySpecies[] {
  const allSpecies = getAllSpecies();
  const endemic = allSpecies.filter(s => 
    s.endemismStatus !== 'widely-distributed'
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

// ============= Habitat Intelligence =============

export function getHabitatSpeciesList(habitatSlug: string): BiodiversitySpecies[] {
  const habitat = habitatBiodiversity.find(h => h.slug === habitatSlug);
  if (!habitat || !habitat.speciesList) return [];
  
  return habitat.speciesList
    .map(slug => getSpeciesBySlug(slug))
    .filter((s): s is BiodiversitySpecies => s !== null);
}

export function getHabitatPressureIndex(habitatSlug: string) {
  const habitat = habitatBiodiversity.find(h => h.slug === habitatSlug);
  return habitat?.pressureIndex || null;
}

export function getHabitatVulnerabilityTrend(habitatSlug: string) {
  const habitat = habitatBiodiversity.find(h => h.slug === habitatSlug);
  return habitat?.vulnerabilityTrend || [];
}

// ============= District Intelligence =============

export function getDistrictSpeciesList(district: string): BiodiversitySpecies[] {
  const districtData = districtBiodiversity.find(d => d.district === district);
  if (!districtData || !districtData.speciesList) return [];
  
  return districtData.speciesList
    .map(slug => getSpeciesBySlug(slug))
    .filter((s): s is BiodiversitySpecies => s !== null);
}

export function getDistrictEndemicSpecies(district: string): BiodiversitySpecies[] {
  const districtData = districtBiodiversity.find(d => d.district === district);
  if (!districtData || !districtData.endemicSpeciesList) return [];
  
  return districtData.endemicSpeciesList
    .map(slug => getSpeciesBySlug(slug))
    .filter((s): s is BiodiversitySpecies => s !== null);
}

export function getDistrictThreatenedSpecies(district: string): BiodiversitySpecies[] {
  const districtData = districtBiodiversity.find(d => d.district === district);
  if (!districtData || !districtData.threatenedSpeciesList) return [];
  
  return districtData.threatenedSpeciesList
    .map(slug => getSpeciesBySlug(slug))
    .filter((s): s is BiodiversitySpecies => s !== null);
}

// ============= Migration =============

export function getMigratorySpecies(season?: string): BiodiversitySpecies[] {
  const allSpecies = getAllSpecies();
  const migratory = allSpecies.filter(s => s.migrationWindow !== undefined);
  
  if (!season) return migratory;
  return migratory.filter(s => s.migrationWindow?.season === season);
}

export function getMigrationCalendar() {
  const months = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    species: [] as BiodiversitySpecies[],
  }));
  
  const migratory = getMigratorySpecies();
  
  migratory.forEach(species => {
    const window = species.migrationWindow;
    if (!window) return;
    
    if (window.peakPresence) {
      window.peakPresence.forEach(month => {
        months[month - 1].species.push(species);
      });
    } else if (window.arrivalMonth && window.departureMonth) {
      for (let m = window.arrivalMonth; m <= window.departureMonth; m++) {
        months[m - 1].species.push(species);
      }
    }
  });
  
  return months;
}

export function getFlywayData(flyway: string): BiodiversitySpecies[] {
  const migratory = getMigratorySpecies();
  return migratory.filter(s => s.migrationWindow?.flyway === flyway);
}

// ============= Distribution =============

export function getSpeciesDistribution(speciesSlug: string) {
  const species = getSpeciesBySlug(speciesSlug);
  return species?.distributionPoints || [];
}

export function getDistrictSpeciesDensity(district: string): number {
  const districtData = districtBiodiversity.find(d => d.district === district);
  return districtData?.totalSpecies || 0;
}

export function getHabitatSpeciesDensity(habitat: string): number {
  const habitatData = habitatBiodiversity.find(h => h.slug === habitat);
  return habitatData?.speciesCount || 0;
}

// ============= Source Verification =============

export function getSpeciesBySourceType(sourceType: DataSourceType): BiodiversitySpecies[] {
  const allSpecies = getAllSpecies();
  return allSpecies.filter(s => s.dataSource.type === sourceType);
}

export function getUnverifiedSpecies(): BiodiversitySpecies[] {
  const allSpecies = getAllSpecies();
  return allSpecies.filter(s => 
    s.dataSource.qualityFlag === 'unverified' ||
    s.dataSource.qualityFlag === undefined
  );
}

export function getSpeciesByQualityFlag(qualityFlag: DataQualityFlag): BiodiversitySpecies[] {
  const allSpecies = getAllSpecies();
  return allSpecies.filter(s => s.dataSource.qualityFlag === qualityFlag);
}

// ============= Monitoring =============

export function getBiodiversityRiskDashboard(): RiskDashboardData {
  // Aggregate risk data from all sources
  const allSpecies = getAllSpecies();
  const threatened = allSpecies.filter(s => 
    ['VU', 'EN', 'CR'].includes(s.conservationStatus)
  );
  
  const riskByTaxon = {
    mammals: threatened.filter(s => s.taxonomicGroup === 'mammals').length,
    birds: threatened.filter(s => s.taxonomicGroup === 'birds').length,
    fish: threatened.filter(s => s.taxonomicGroup === 'fish').length,
    plants: threatened.filter(s => s.taxonomicGroup === 'plants').length,
  };
  
  return {
    overallRiskScore: calculateOverallRisk(allSpecies),
    riskByTaxon,
    riskByHabitat: {},
    riskByDistrict: {},
    topThreats: [],
    priorityActions: [],
    temporalTrend: [],
  };
}

export function getThreatSeverityAnalysis(): ThreatAnalysis[] {
  const allSpecies = getAllSpecies();
  const threatCounts = new Map<string, number>();
  
  allSpecies.forEach(species => {
    species.threats.forEach(threat => {
      threatCounts.set(threat, (threatCounts.get(threat) || 0) + 1);
    });
  });
  
  return Array.from(threatCounts.entries())
    .map(([threatType, count]) => ({
      threatType,
      severity: count > 50 ? 'critical' : count > 20 ? 'high' : count > 5 ? 'medium' : 'low',
      affectedSpeciesCount: count,
      affectedHabitats: [],
      affectedDistricts: [],
      trend: 'stable' as const,
    }));
}

// ============= Helper Functions =============

function getAllSpecies(): BiodiversitySpecies[] {
  return [
    ...biodiversityData.mammals.all(),
    ...biodiversityData.birds.all(),
    ...biodiversityData.fish.all(),
    ...biodiversityData.plants.all(),
    ...biodiversityData.medicinalPlants.all(),
  ];
}

function getSpeciesBySlug(slug: string): BiodiversitySpecies | null {
  const all = getAllSpecies();
  return all.find(s => s.slug === slug) || null;
}

function calculateOverallRisk(species: BiodiversitySpecies[]): number {
  const threatened = species.filter(s => 
    ['VU', 'EN', 'CR'].includes(s.conservationStatus)
  ).length;
  
  return Math.round((threatened / species.length) * 100);
}
```

---

## 3. Component Architecture

### 3.1 Component Hierarchy

```
biodiversity/
├── pages/
│   ├── BiodiversityHubPage (main)
│   ├── HabitatDetailPage (NEW)
│   ├── DistrictDetailPage (NEW)
│   ├── EndemicSpeciesPage (NEW)
│   ├── MigrationCalendarPage (NEW)
│   ├── RiskDashboardPage (NEW)
│   ├── ThreatenedSpeciesPage (existing)
│   ├── TaxonCategoryPage (existing)
│   └── SpeciesDetailPage (existing, enhanced)
│
├── components/
│   ├── intelligence/
│   │   ├── HabitatIntelligenceCard (existing, enhanced)
│   │   ├── HabitatDetailPanel (NEW)
│   │   ├── DistrictBiodiversityCard (NEW)
│   │   ├── DistrictDetailPanel (NEW)
│   │   ├── EndemicSpeciesRegistry (NEW)
│   │   ├── EndemicSpeciesCard (NEW)
│   │   ├── MigrationCalendar (NEW)
│   │   ├── MigrationSpeciesCard (NEW)
│   │   ├── PressureIndexGauge (NEW)
│   │   ├── VulnerabilityTrendChart (NEW)
│   │   ├── DistributionMap (NEW)
│   │   ├── SpeciesDensityHeatmap (NEW)
│   │   ├── SourceVerificationBadge (NEW)
│   │   ├── DataQualityIndicator (NEW)
│   │   ├── RiskDashboard (NEW)
│   │   ├── ThreatSeverityChart (NEW)
│   │   └── MonitoringProtocolCard (NEW)
│   │
│   ├── filters/
│   │   ├── BiodiversityFilters (existing, enhanced)
│   │   ├── EndemismFilter (NEW)
│   │   ├── MigrationFilter (NEW)
│   │   ├── SourceTypeFilter (NEW)
│   │   └── QualityFlagFilter (NEW)
│   │
│   └── common/
│       ├── BiodiversityCard (existing, enhanced)
│       ├── BiodiversityCategoryPage (existing)
│       └── SpeciesDetailPage (existing, enhanced)
```

### 3.2 New Component Specifications

#### 3.2.1 HabitatDetailPanel
**Purpose:** Display comprehensive habitat intelligence

**Props:**
```typescript
interface HabitatDetailPanelProps {
  habitat: HabitatBiodiversity;
}
```

**Features:**
- Habitat overview with area, districts
- Species list with filtering
- Pressure index gauge
- Vulnerability trend chart
- Risk drivers correlation
- Flagship species showcase
- Related protected areas

#### 3.2.2 DistrictDetailPanel
**Purpose:** Display district-level biodiversity intelligence

**Props:**
```typescript
interface DistrictDetailPanelProps {
  district: DistrictBiodiversity;
}
```

**Features:**
- District overview with metrics
- Species richness breakdown
- Endemic species list
- Threatened species list
- Habitat breakdown pie chart
- Protected area coverage
- Human-wildlife conflict index
- Biodiversity hotspots map

#### 3.2.3 EndemicSpeciesRegistry
**Purpose:** Browse and filter endemic species

**Props:**
```typescript
interface EndemicSpeciesRegistryProps {
  endemismLevel?: EndemismStatus;
}
```

**Features:**
- Filter by endemism level
- Grid of endemic species cards
- Endemism map visualization
- Conservation priority sorting
- Taxonomic breakdown

#### 3.2.4 MigrationCalendar
**Purpose:** Visualize seasonal migration patterns

**Props:**
```typescript
interface MigrationCalendarProps {
  year?: number;
}
```

**Features:**
- 12-month calendar view
- Species presence indicators
- Migration type color coding
- Flyway filtering
- Concentration heat map

#### 3.2.5 PressureIndexGauge
**Purpose:** Display habitat pressure score

**Props:**
```typescript
interface PressureIndexGaugeProps {
  pressureIndex: HabitatPressureIndex;
}
```

**Features:**
- Circular gauge (0-100)
- Color-coded severity
- Trend indicator
- Driver breakdown

#### 3.2.6 DistributionMap
**Purpose:** Map species distribution points

**Props:**
```typescript
interface DistributionMapProps {
  points: SpeciesDistributionPoint[];
  center?: { lat: number; lng: number };
  zoom?: number;
}
```

**Features:**
- Interactive map (Leaflet/Mapbox)
- Occurrence type markers
- District boundaries
- Habitat overlay
- Elevation contours

#### 3.2.7 SourceVerificationBadge
**Purpose:** Display data source and verification status

**Props:**
```typescript
interface SourceVerificationBadgeProps {
  dataSource: DataSource;
}
```

**Features:**
- Source type icon
- Verification status
- Quality flag color
- Citation tooltip

#### 3.2.8 RiskDashboard
**Purpose:** Display biodiversity risk analytics

**Props:**
```typescript
interface RiskDashboardProps {
  data: RiskDashboardData;
}
```

**Features:**
- Overall risk score
- Risk by taxon chart
- Risk by habitat map
- Top threats list
- Temporal trend graph
- Priority actions

---

## 4. Navigation Structure

### 4.1 Route Hierarchy

```
/biodiversity                          # Hub page
├── /habitat/[slug]                    # Habitat detail (NEW)
│   ├── /forest-biodiversity
│   ├── /wetland-biodiversity
│   ├── /alpine-biodiversity
│   ├── /riverine-biodiversity
│   └── /grassland-biodiversity
│
├── /district/[slug]                   # District detail (NEW)
│   ├── /srinagar
│   ├── /anantnag
│   ├── /kishtwar
│   └── ... (all 16 districts)
│
├── /endemic-species                   # Endemic registry (NEW)
├── /migration-calendar                # Migration visualization (NEW)
├── /risk-dashboard                    # Risk analytics (NEW)
│
├── /threatened-species                # Red Data Book (existing)
│
├── /[taxon]                           # Taxon category pages
│   ├── /mammals
│   ├── /birds
│   ├── /fish
│   ├── /plants
│   └── /medicinal-plants
│
└── /species/[slug]                    # Species detail (enhanced)
    └── /hangul
    └── /kashmir-flycatcher
    └── ...
```

### 4.2 Cross-Module Links

```
/biodiversity
├── → /trails/[slug]                   # Linked trails in habitat
├── → /protected-areas/[slug]          # Linked protected areas
├── → /water-systems/[slug]            # Linked water systems
├── → /climate/habitat-risk            # Climate impact on habitat
└── → /communities/conservation        # Community programs
```

---

## 5. File Structure

### 5.1 New Files to Create

```
src/
├── types/
│   └── biodiversity.ts                # NEW - Type definitions
│
├── data/
│   ├── biodiversity-access.ts         # NEW - Data access layer
│   ├── endemic-species.ts            # NEW - Endemic species registry
│   ├── migration-data.ts             # NEW - Migration patterns
│   ├── district-biodiversity-complete.ts  # NEW - All 16 districts
│   └── habitat-pressure-indices.ts   # NEW - Pressure data
│
├── components/
│   └── biodiversity/
│       ├── intelligence/
│       │   ├── HabitatDetailPanel.tsx      # NEW
│       │   ├── DistrictDetailPanel.tsx     # NEW
│       │   ├── EndemicSpeciesRegistry.tsx  # NEW
│       │   ├── EndemicSpeciesCard.tsx      # NEW
│       │   ├── MigrationCalendar.tsx       # NEW
│       │   ├── MigrationSpeciesCard.tsx    # NEW
│       │   ├── PressureIndexGauge.tsx      # NEW
│       │   ├── VulnerabilityTrendChart.tsx # NEW
│       │   ├── DistributionMap.tsx         # NEW
│       │   ├── SpeciesDensityHeatmap.tsx   # NEW
│       │   ├── SourceVerificationBadge.tsx # NEW
│       │   ├── DataQualityIndicator.tsx    # NEW
│       │   ├── RiskDashboard.tsx           # NEW
│       │   ├── ThreatSeverityChart.tsx     # NEW
│       │   └── MonitoringProtocolCard.tsx  # NEW
│       │
│       └── filters/
│           ├── EndemismFilter.tsx          # NEW
│           ├── MigrationFilter.tsx         # NEW
│           ├── SourceTypeFilter.tsx        # NEW
│           └── QualityFlagFilter.tsx       # NEW
│
└── app/
    └── biodiversity/
        ├── habitat/
        │   └── [slug]/
        │       └── page.tsx                # NEW - Habitat detail
        │
        ├── district/
        │   └── [slug]/
        │       └── page.tsx                # NEW - District detail
        │
        ├── endemic-species/
        │   └── page.tsx                    # NEW - Endemic registry
        │
        ├── migration-calendar/
        │   └── page.tsx                    # NEW - Migration calendar
        │
        └── risk-dashboard/
            └── page.tsx                    # NEW - Risk dashboard
```

### 5.2 Files to Enhance

```
src/
├── data/
│   ├── biodiversity.ts               # ENHANCE - Add new fields
│   └── biodiversity-intelligence.ts  # ENHANCE - Complete districts
│
├── components/
│   ├── biodiversity/
│   │   ├── HabitatIntelligenceCard.tsx   # ENHANCE - Add links
│   │   └── ConservationAnalyticsPanel.tsx # ENHANCE - Add trends
│   │
│   └── common/
│       ├── BiodiversityCard.tsx          # ENHANCE - Add endemism
│       └── SpeciesDetailPage.tsx         # ENHANCE - Add tabs
│
└── app/
    └── biodiversity/
        ├── page.tsx                      # ENHANCE - Add new bands
        └── species/[slug]/page.tsx       # ENHANCE - Add tabs
```

---

## 6. State Management

### 6.1 Client State (React Context)

```typescript
// BiodiversityFilterContext
interface BiodiversityFilterState {
  taxonomicGroup: TaxonomicGroup | null;
  conservationStatus: IUCNStatus | null;
  endemismStatus: EndemismStatus | null;
  habitat: HabitatType | null;
  district: KashmirDistrict | null;
  migrationType: MigrationType | null;
  sourceType: DataSourceType | null;
  qualityFlag: DataQualityFlag | null;
}

// Actions
function setTaxonomicGroup(group: TaxonomicGroup | null)
function setConservationStatus(status: IUCNStatus | null)
function setEndemismStatus(status: EndemismStatus | null)
function setHabitat(habitat: HabitatType | null)
function setDistrict(district: KashmirDistrict | null)
function resetFilters()
```

### 6.2 Server State (Static Generation)

All data is statically generated at build time. No runtime fetching.

---

## 7. Performance Strategy

### 7.1 Code Splitting

- Lazy load distribution maps
- Lazy load migration calendar
- Lazy load risk dashboard charts

### 7.2 Data Pagination

- Species lists paginated (20 per page)
- District species paginated
- Migration calendar virtualized

### 7.3 Image Optimization

- Next.js Image component
- WebP format
- Lazy loading
- Responsive sizes

---

## 8. Accessibility

### 8.1 WCAG 2.1 AA Compliance

- Color contrast for conservation status badges
- Keyboard navigation for filters
- Screen reader labels for charts
- Focus management for modals
- Skip links for repeated navigation

### 8.2 Chart Accessibility

- Text alternatives for all visualizations
- Data tables as fallback
- High contrast mode support

---

## 9. Testing Strategy

### 9.1 Unit Tests

- Data access functions
- Filter logic
- Conservation status calculations

### 9.2 Component Tests

- BiodiversityCard rendering
- Filter interactions
- Distribution map markers

### 9.3 Integration Tests

- Habitat detail page flow
- District page navigation
- Species detail tabs

### 9.4 E2E Tests

- Filter combinations
- Cross-module navigation
- Mobile responsiveness

---

## 10. Security Considerations

### 10.1 Sensitive Species Protection

- Mask exact coordinates for critical species
- Generalize location data for sensitive habitats
- Delayed publication for recent sightings

### 10.2 Data Integrity

- Build-time validation
- Type safety enforcement
- Reference integrity checks

---

## 11. Deployment Strategy

### 11.1 Build Process

```bash
# Validate data
npm run validate:data

# Build
npm run build

# Verify output
npm run verify:links
```

### 11.2 Environment Variables

```env
# No sensitive env vars required
# Optional:
NEXT_PUBLIC_SITE_URL=https://example.com
NEXT_PUBLIC_ANALYTICS_ID=xxx
```

---

## 12. Monitoring & Observability

### 12.1 Build-Time Checks

- TypeScript compilation
- ESLint validation
- Data model validation
- Link checking

### 12.2 Runtime Monitoring

- 404 tracking
- Performance metrics
- User interaction analytics

---

## 13. Rollback Plan

### 13.1 Feature Flags

- Habitat detail pages
- District pages
- Endemic registry
- Migration calendar
- Risk dashboard

### 13.2 Rollback Steps

1. Revert git commit
2. Redeploy previous version
3. Verify functionality

---

## 14. Success Metrics

### 14.1 Technical

- Build time < 5 minutes
- Bundle size < 2MB
- Lighthouse score > 90

### 14.2 User

- Time on page > 4 minutes
- Return visitors > 30%
- Filter usage > 50%

### 14.3 Data

- Species completeness > 95%
- District coverage 100%
- Source verification > 90%
