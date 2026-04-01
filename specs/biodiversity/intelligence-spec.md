# Biodiversity Intelligence System - Specification

## Overview

Transform the Biodiversity module from a species showcase into a **full biodiversity intelligence system** with habitat-level analytics, district-level intelligence, endemic species tracking, migration patterns, pressure/vulnerability indices, distribution mapping, and source verification.

---

## 1. Scope and Dependencies

### 1.1 In Scope

#### Habitat Intelligence
- **Habitat Intelligence Band** with 5 ecosystem types:
  - Wetland Biodiversity
  - Forest Biodiversity
  - Alpine Biodiversity
  - Riverine Biodiversity
  - Meadow / Grassland Biodiversity
- Habitat-specific species lists (not just counts)
- Habitat detail pages with full analytics
- Habitat vulnerability scoring with trend data
- Risk driver correlation per habitat

#### District Biodiversity Intelligence
- Complete all **16 districts** (currently only 5 populated)
- District biodiversity pages with:
  - Species richness metrics
  - Threatened species concentration
  - Endemic species registry
  - Habitat breakdown
  - Protected area coverage
  - Human-wildlife conflict index
  - Biodiversity hotspots

#### Endemic / Kashmir-Priority Species
- Endemic species registry (species unique to Kashmir/Himalayas)
- Kashmir-priority species filter
- Endemism analysis by habitat and district
- Conservation priority scoring

#### Migration Significance Layer
- Migration patterns visualization
- Seasonal occurrence calendar
- Flyway mapping for migratory birds
- Migration window tracking (arrival/departure)
- Migratory species concentration by habitat

#### Habitat Pressure + Vulnerability View
- Cumulative pressure index per habitat
- Vulnerability scoring with historical trends
- Risk driver severity analysis
- Threat mitigation tracking
- Habitat health dashboard

#### Species Distribution Logic
- Distribution by district
- Distribution by habitat
- Distribution by season
- GIS-based occurrence mapping
- Density heatmaps
- Range polygons

#### Source-Age / Verification Distinction
- Data source metadata (inventory reference, monitoring signal, sighting-supported, legacy)
- Verification workflow (verified, reviewed, community, pending)
- Data quality flags
- Citation tracking
- Source age indicators

#### Biodiversity Risk & Monitoring
- Risk dashboard with temporal trends
- Monitoring protocols
- Abundance indices
- Threat severity scoring
- Conservation action tracking

### 1.2 Out of Scope

- Backend database migration (Phase 2)
- Real-time API integration with external systems (IUCN, GBIF)
- Mobile app for field data collection
- Machine learning species identification
- Citizen scientist gamification features

### 1.3 External Dependencies

| Dependency | Owner | Status |
|------------|-------|--------|
| Red Data Book on J&K Fauna (IUCN 1996) | IUCN | Data available |
| Wildlife Protection Act 1972 | Govt. of India | Data available |
| Protected Area Network Data | J&K Wildlife Dept. | Partial |
| Species Sighting Data | Community/Experts | Available via trails-sightings.ts |
| Habitat Classification | Internal | Defined in trails-sightings.ts |
| District Boundaries | Survey of India | Defined in trails-sightings.ts |

---

## 2. Key Decisions and Rationale

### 2.1 Data Architecture

**Decision:** Maintain static TypeScript data files with strongly-typed models, prepare for future API migration.

**Options Considered:**
1. Migrate to PostgreSQL + PostGIS immediately
2. Keep static files with API abstraction layer
3. Hybrid: Static files now, API migration later

**Rationale:** Option 3 chosen because:
- Current static files provide excellent TypeScript safety
- No backend infrastructure ready yet
- Easy to migrate data models to API later
- Allows rapid iteration on data structure

**Principle:** Smallest viable change, reversible architecture.

### 2.2 Habitat Intelligence Design

**Decision:** Expand habitat cards to include species lists and habitat detail pages.

**Rationale:**
- Current cards show aggregated counts only
- Users need to see which species belong to each habitat
- Habitat detail pages enable deeper conservation analysis

### 2.3 District Intelligence Completion

**Decision:** Complete all 16 districts with consistent data model.

**Rationale:**
- Current 5/16 districts creates incomplete picture
- District-level planning requires full coverage
- Enables district-wise biodiversity reporting

### 2.4 Endemic Species Tracking

**Decision:** Add `endemismStatus` field to species and create endemic species registry.

**Rationale:**
- Endemism is critical for conservation prioritization
- Kashmir has unique Himalayan species
- No existing endemic filter in current system

### 2.5 Migration Visualization

**Decision:** Implement seasonal calendar and flyway visualization.

**Rationale:**
- Migration timing is crucial for wetland management
- Current `MigrationWindow` type is defined but not visualized
- Seasonal patterns inform conservation actions

### 2.6 Source Verification

**Decision:** Add `DataSource` type with verification workflow.

**Rationale:**
- Data quality varies across sources
- Red Data Book has source metadata, general species don't
- Verification status builds trust in sightings

---

## 3. Interfaces and API Contracts

### 3.1 New Data Models

#### 3.1.1 Endemism Status
```typescript
type EndemismStatus = 
  | 'kashmir-endemic'      // Unique to Kashmir region
  | 'himalayan-endemic'    // Himalayan range only
  | 'northwest-himalayan'  // NW Himalayas (J&K, HP, Uttarakhand)
  | 'trans-himalayan'      // Ladakh, Tibet plateau
  | 'widely-distributed'   // Not endemic
```

#### 3.1.2 Data Source
```typescript
interface DataSource {
  type: 'inventory' | 'monitoring' | 'sighting' | 'legacy';
  reference?: string;           // Citation or report name
  year?: number;                // Source year
  verifiedBy?: string;          // Expert name
  verificationDate?: string;    // ISO date
  qualityFlag?: 'high' | 'medium' | 'low' | 'unverified';
  confidence?: number;          // 0-100
}
```

#### 3.1.3 Migration Window (Enhanced)
```typescript
interface MigrationWindow {
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  arrivalMonth?: number;        // 1-12
  departureMonth?: number;      // 1-12
  peakPresence?: number[];      // Array of months [10, 11, 12, 1, 2]
  migrationType: 'breeder' | 'winter-visitor' | 'summer-visitor' | 'passage-migrant';
  flyway?: 'central-asian' | 'east-asian' | 'west-asian';
  concentration?: 'low' | 'medium' | 'high' | 'very-high';
}
```

#### 3.1.4 Habitat Pressure Index
```typescript
interface HabitatPressureIndex {
  habitatSlug: string;
  overallScore: number;         // 0-100 (100 = highest pressure)
  trend: 'improving' | 'stable' | 'declining';
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
```

#### 3.1.5 Species Distribution Point
```typescript
interface SpeciesDistributionPoint {
  district: KashmirDistrict;
  habitat: HabitatType;
  protectedArea?: string;
  elevation: number;            // meters
  coordinates?: { lat: number; lng: number };
  occurrenceType: 'confirmed' | 'probable' | 'possible';
  source: DataSource;
  recordedDate?: string;        // ISO date
  observerType?: 'expert' | 'field-team' | 'citizen-scientist';
}
```

#### 3.1.6 Enhanced Species Model
```typescript
interface BiodiversitySpecies {
  // Existing fields...
  endemismStatus: EndemismStatus;
  dataSource: DataSource;
  distributionPoints: SpeciesDistributionPoint[];
  migrationWindow?: MigrationWindow;
  pressureIndex?: number;       // 0-100
  conservationPriority?: number; // 1-10 (10 = highest)
}
```

### 3.2 Public API Functions (Data Access Layer)

```typescript
// Endemic Species
getEndemicSpecies(endemismLevel: EndemismStatus): BiodiversitySpecies[]
getKashmirPrioritySpecies(): BiodiversitySpecies[]

// Habitat Intelligence
getHabitatSpeciesList(habitatSlug: string): BiodiversitySpecies[]
getHabitatPressureIndex(habitatSlug: string): HabitatPressureIndex
getHabitatVulnerabilityTrend(habitatSlug: string): { year: number; score: number }[]

// District Intelligence
getDistrictSpeciesList(district: KashmirDistrict): BiodiversitySpecies[]
getDistrictEndemicSpecies(district: KashmirDistrict): BiodiversitySpecies[]
getDistrictThreatenedSpecies(district: KashmirDistrict): BiodiversitySpecies[]

// Migration
getMigratorySpecies(season: Season): BiodiversitySpecies[]
getMigrationCalendar(): { month: number; species: BiodiversitySpecies[] }[]
getFlywayData(flyway: 'central-asian' | 'east-asian' | 'west-asian'): BiodiversitySpecies[]

// Distribution
getSpeciesDistribution(speciesSlug: string): SpeciesDistributionPoint[]
getDistrictSpeciesDensity(district: KashmirDistrict): number
getHabitatSpeciesDensity(habitat: HabitatType): number

// Source Verification
getSpeciesBySourceType(sourceType: DataSource['type']): BiodiversitySpecies[]
getUnverifiedSpecies(): BiodiversitySpecies[]
getSpeciesByQualityFlag(qualityFlag: DataSource['qualityFlag']): BiodiversitySpecies[]

// Monitoring
getBiodiversityRiskDashboard(): RiskDashboardData
getThreatSeverityAnalysis(): ThreatAnalysis[]
getMonitoringProtocols(speciesSlug: string): MonitoringProtocol[]
```

### 3.3 Error Taxonomy

| Error Code | Status | Description |
|------------|--------|-------------|
| `SPECIES_NOT_FOUND` | 404 | Species slug not found |
| `HABITAT_NOT_FOUND` | 404 | Habitat slug not found |
| `DISTRICT_NOT_FOUND` | 404 | District name not valid |
| `INVALID_FILTER` | 400 | Filter parameter invalid |
| `DATA_UNAVAILABLE` | 503 | Data source temporarily unavailable |

---

## 4. Non-Functional Requirements (NFRs)

### 4.1 Performance

| Metric | Target | Measurement |
|--------|--------|-------------|
| Page load time (biodiversity hub) | < 2s | Lighthouse |
| Species detail page load | < 1.5s | Lighthouse |
| Filter response time | < 300ms | User interaction |
| Distribution map render | < 500ms | Performance API |
| Time to interactive | < 3s | Lighthouse |

### 4.2 Reliability

- **Availability:** 99% (static site, high reliability expected)
- **Data consistency:** All species data must be validated at build time
- **Error recovery:** Graceful degradation for missing data

### 4.3 Security

- No sensitive data exposure (species locations for sensitive species)
- Sensitivity-based data masking for critical habitats
- No authentication required (public information)

### 4.4 Cost

- Static hosting (Vercel/Netlify) - minimal cost
- No database costs in Phase 1
- CDN for asset delivery

---

## 5. Data Management and Migration

### 5.1 Source of Truth

- **Primary:** `src/data/biodiversity.ts` - Core species database
- **Secondary:** `src/data/red-data-book-kashmir.ts` - Threatened species
- **Tertiary:** `src/data/biodiversity-intelligence.ts` - Aggregated metrics
- **Supporting:** `src/data/trails-sightings.ts` - Field observations

### 5.2 Schema Evolution

- All new fields are optional with defaults
- Backward compatibility maintained
- Migration scripts for data updates

### 5.3 Data Retention

- All historical data retained
- Version tracking for Red Data Book entries
- Source citation preserved

---

## 6. Operational Readiness

### 6.1 Observability

- Build-time data validation
- Runtime type checking with TypeScript
- Console warnings for missing data

### 6.2 Alerting

- Build failures for data validation errors
- 404 monitoring for broken species links

### 6.3 Deployment

- Vercel deployment (existing)
- Incremental static regeneration
- Preview deployments for testing

---

## 7. Risk Analysis and Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Data quality issues | Medium | Source verification, quality flags |
| Incomplete district data | Medium | Phased rollout, clear labeling |
| Performance degradation with large datasets | Low | Pagination, lazy loading |
| Sensitive species location exposure | High | Sensitivity-based masking |
| Data model complexity | Medium | Strong typing, documentation |

---

## 8. Evaluation and Validation

### 8.1 Definition of Done

- [ ] All 16 districts have biodiversity data
- [ ] Habitat detail pages implemented
- [ ] Endemic species registry functional
- [ ] Migration calendar visualization working
- [ ] Source verification fields populated
- [ ] Distribution mapping implemented
- [ ] Risk dashboard showing trends
- [ ] All new components have tests
- [ ] Accessibility audit passed (WCAG 2.1 AA)
- [ ] Performance budget met

### 8.2 Output Validation

- TypeScript compilation without errors
- ESLint passes
- All links resolve (no 404s)
- Data models validated at build time

---

## 9. Acceptance Criteria

### Habitat Intelligence
- [ ] Each habitat card links to a detail page
- [ ] Habitat detail page shows species list (not just count)
- [ ] Habitat pressure index displayed with trend
- [ ] Risk drivers correlated with affected species

### District Intelligence
- [ ] All 16 districts have data
- [ ] District pages show species richness, threatened, endemic counts
- [ ] District habitat breakdown visible
- [ ] Human-wildlife conflict index displayed

### Endemic Species
- [ ] Endemic species filter works across all views
- [ ] Endemic species registry page exists
- [ ] Endemism status shown on species cards

### Migration
- [ ] Seasonal calendar shows species by month
- [ ] Flyway information displayed for migratory birds
- [ ] Migration type (breeder, winter-visitor, etc.) shown

### Pressure/Vulnerability
- [ ] Cumulative pressure score per habitat
- [ ] Historical trend visualization
- [ ] Mitigation actions listed

### Distribution
- [ ] Species distribution points mapped
- [ ] District-level density shown
- [ ] Habitat-level density shown
- [ ] Seasonal distribution changes visible

### Source Verification
- [ ] Source type displayed (inventory, monitoring, sighting, legacy)
- [ ] Verification status shown
- [ ] Quality flag visible
- [ ] Citation/reference linked

### Risk & Monitoring
- [ ] Risk dashboard with temporal trends
- [ ] Threat severity scoring visible
- [ ] Monitoring protocols documented

---

## 10. Implementation Phases

### Phase 1: Data Model Expansion (Week 1)
- Add new fields to species model
- Complete district data for all 16 districts
- Add endemic species tracking
- Enhance migration data

### Phase 2: Habitat Intelligence (Week 2)
- Habitat detail pages
- Species lists per habitat
- Pressure index implementation
- Vulnerability trends

### Phase 3: District Intelligence (Week 3)
- District pages
- District species lists
- Endemic species by district
- Human-wildlife conflict layer

### Phase 4: Distribution & Mapping (Week 4)
- GIS-based distribution mapping
- Density heatmaps
- Seasonal distribution changes

### Phase 5: Source Verification (Week 5)
- Data source metadata
- Verification workflow
- Quality flags
- Citation tracking

### Phase 6: Risk & Monitoring (Week 6)
- Risk dashboard
- Threat severity analysis
- Monitoring protocols
- Temporal trends

### Phase 7: Integration & Polish (Week 7)
- Update taxon pages
- Enhance species detail pages
- Cross-module links
- Performance optimization

---

## 11. Success Metrics

| Metric | Baseline | Target |
|--------|----------|--------|
| Species with complete data | 67% | 95% |
| Districts with data | 5/16 | 16/16 |
| Habitat detail coverage | 0% | 100% |
| Endemic species tracked | 0 | All |
| Migration data completeness | 10% | 80% |
| Source verification coverage | 5% | 90% |
| User engagement (time on page) | 2:30 | 4:00 |
| Return visitors | 15% | 30% |

---

## 12. Cross-Module Integration

### Trails & Sightings
- Link species to sighting records
- Show recent sightings on species pages
- Verification workflow integration

### Protected Areas
- Species occurrence in protected areas
- Habitat overlap analysis
- Conservation action tracking

### Water Systems
- Wetland biodiversity integration
- Riverine species tracking
- Hydrological impact analysis

### Climate
- Climate change impact on habitats
- Species vulnerability to climate
- Phenological shifts (migration timing)

### Communities
- Community conservation programs
- Human-wildlife conflict reports
- Citizen science contributions

---

## Appendix A: Current Data Summary

### Species Counts
- Total: 2,847
- Mammals: 67
- Birds: 312
- Fish: 23
- Plants: 1,834
- Medicinal Plants: 127
- Threatened: 89

### Habitat Coverage
- Forest: 8,934 km² (40.2%)
- Wetland: 1,247 km² (5.6%)
- Alpine: 4,567 km² (20.5%)
- River/Stream: 892 km² (4.0%)
- Meadow/Grassland: 2,345 km² (10.5%)

### District Coverage (Current)
- Populated: 5/16 (Srinagar, Anantnag, Kishtwar, Kupwara, Ganderbal)
- Missing: 11 districts

### Conservation Intelligence
- Red Data Book species: 37
- Priority Kashmir species: 5
- Protected areas: 47
- Conservation hotspots: 4
