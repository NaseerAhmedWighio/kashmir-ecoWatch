# District Profiles: Kashmir-Only, Richer, Comparable - Specification

## Overview

Transform District Profiles from administrative cards into **comprehensive ecological intelligence profiles** with Kashmir-only default mode, structured ecological/hydrological/biodiversity/risk data, district comparison capabilities, and evidence-based reporting.

---

## 1. Scope and Dependencies

### 1.1 In Scope

#### Kashmir-Only Default Mode
- Default view: 10 Kashmir Valley districts only
- Toggle: "Show All J&K" (16 districts)
- Clear labeling of geographic scope
- Valley totals for comparison baseline

#### Administrative + Ecological + Hydrological + Biodiversity + Risk Structure
- **Administrative**: Area, population, headquarters, tehsils, blocks
- **Ecological**: Forest cover, protected areas, ecosystem services
- **Hydrological**: Watershed hierarchy, water bodies, flow regimes, groundwater
- **Biodiversity**: Species richness, endemism, threatened species, habitats
- **Risk**: Multi-hazard risk stack, vulnerability, exposure

#### District Comparison Mode
- Multi-select comparison (2-4 districts)
- Side-by-side scorecards
- Radar charts for metrics
- Difference highlighting
- Ranking across categories

#### District Score Breakdown
- Overall environmental score (0-100)
- Component scores with weights:
  - Ecological Health (30%)
  - Biodiversity Richness (25%)
  - Water Security (20%)
  - Risk Level (15%, inverted)
  - Conservation Status (10%)
- Sub-component breakdown for each

#### Top Strengths / Top Pressures / Priority Actions
- **Strengths**: Ecological assets, conservation successes, unique features
- **Pressures**: Cumulative threats, risk factors, degradation drivers
- **Actions**: Priority conservation interventions, policy needs

#### District Seasonal Signature
- Seasonal landscapes by season
- Bloom calendar
- Migration windows
- Agricultural activities
- Access status by season
- Tourism potential by season
- Climate summary (temp, precipitation)

#### District Water Signature
- Watershed hierarchy (basin → sub-basin → catchment)
- Water body inventory (lakes, wetlands, rivers, springs)
- Flow regimes (perennial/seasonal/intermittent)
- Groundwater levels and trends
- Water quality distribution
- Water stress index
- Restoration investments

#### District Species Richness
- Total species count
- Breakdown by taxon (mammals, birds, fish, plants, medicinal plants)
- Endemism rate (% endemic)
- Threatened species rate (% threatened)
- Diversity indices (Shannon, Simpson)
- Species-area relationship

#### District Risk Stack
- Flood risk (score, trend, alerts)
- Landslide risk (score, trend, alerts)
- Forest fire risk (score, trend, alerts)
- Seismic risk (zone, score)
- Climate risk (exposure, sensitivity, adaptive capacity)
- Multi-hazard overlay

#### District Evidence and Reports
- Scientific reports linked to district
- Management plans
- Environmental Impact Assessments
- Policy documents
- Datasets available
- Monitoring data summary

### 1.2 Out of Scope

- Real-time sensor data integration (Phase 2)
- Detailed socioeconomic data (beyond basic demographics)
- Land use/land cover mapping (Phase 2)
- Infrastructure inventory (Phase 2)

### 1.3 External Dependencies

| Dependency | Owner | Status |
|------------|-------|--------|
| Census Data | Registrar General of India | Available |
| Forest Survey | Forest Survey of India | Available |
| Protected Area Data | J&K Wildlife Dept | Available |
| Water Quality Data | J&K PCB | Partial |
| Hazard Maps | NDMA/SDMA | Available |

---

## 2. Key Decisions and Rationale

### 2.1 Geographic Scope

**Decision:** Default to 10 Kashmir Valley districts, with toggle for 16-district view.

**Kashmir Valley (10):**
Srinagar, Anantnag, Baramulla, Budgam, Ganderbal, Kulgam, Kupwara, Pulwama, Shopian, Bandipora

**Extended J&K (6 additional):**
Doda, Ramban, Rajouri, Poonch, Kathua, Kishtwar

**Rationale:**
- Aligns with user mental model of "Kashmir"
- Ecologically coherent (Kashmir Valley ecosystem)
- Allows expansion for users who need broader context

### 2.2 Score Calculation

**Decision:** Weighted composite score with transparent methodology.

**Formula:**
```
Overall Score = (
  Ecological Health × 0.30 +
  Biodiversity Richness × 0.25 +
  Water Security × 0.20 +
  (100 - Risk Level) × 0.15 +
  Conservation Status × 0.10
)
```

**Rationale:**
- Ecological health as primary driver (30%)
- Biodiversity as key indicator (25%)
- Water security critical for Kashmir (20%)
- Risk as mitigating factor (15%)
- Conservation effort recognition (10%)

### 2.3 Comparison Framework

**Decision:** Enable 2-4 district comparison with visual highlighting.

**Rationale:**
- 2 districts: Direct comparison
- 3-4 districts: Regional analysis
- More than 4: Information overload
- Visual highlighting aids quick comprehension

### 2.4 Evidence Linking

**Decision:** Link existing reports/datasets to districts via metadata.

**Rationale:**
- Leverages existing documentation
- Provides credibility to scores
- Enables deeper research
- No new data creation required

---

## 3. Interfaces and API Contracts

### 3.1 Enhanced District Interface

```typescript
interface DistrictProfile {
  // Administrative
  id: string;
  slug: string;
  name: string;
  area: { value: number; unit: 'km²' };
  population: { total: number; density: number; year: number };
  headquarters: string;
  tehsils: string[];
  blocks: string[];
  
  // Geographic Scope
  region: 'kashmir-valley' | 'jammu' | 'ladakh';
  inKashmirValley: boolean;
  
  // Ecological
  ecological: {
    forestCover: { area: number; percentage: number };
    protectedAreas: { count: number; area: number; percentage: number };
    ecosystemServices: string[];
    carbonStock: number; // tonnes
  };
  
  // Hydrological
  hydrological: {
    watershedHierarchy: {
      basin: string;
      subBasin: string;
      catchment: string;
    };
    waterBodies: {
      lakes: number;
      wetlands: number;
      rivers: number;
      springs: number;
      total: number;
      area: number; // km²
    };
    flowRegimes: {
      perennial: number;
      seasonal: number;
      intermittent: number;
    };
    groundwater: {
      level: number; // meters below ground
      trend: 'increasing' | 'stable' | 'declining';
    };
    waterQuality: {
      excellent: number;
      good: number;
      moderate: number;
      poor: number;
      critical: number;
    };
    waterStressIndex: number; // 0-100
  };
  
  // Biodiversity
  biodiversity: {
    totalSpecies: number;
    byTaxon: {
      mammals: number;
      birds: number;
      fish: number;
      plants: number;
      medicinalPlants: number;
    };
    endemism: {
      count: number;
      rate: number; // percentage
    };
    threatened: {
      count: number;
      rate: number; // percentage
      byIUCN: {
        CR: number;
        EN: number;
        VU: number;
      };
    };
    diversityIndices: {
      shannon: number;
      simpson: number;
    };
    primaryHabitats: string[];
    biodiversityHotspots: string[];
  };
  
  // Risk Stack
  riskStack: {
    flood: {
      score: number;
      trend: 'increasing' | 'stable' | 'decreasing';
      alerts: number;
    };
    landslide: {
      score: number;
      trend: 'increasing' | 'stable' | 'decreasing';
      alerts: number;
    };
    forestFire: {
      score: number;
      trend: 'increasing' | 'stable' | 'decreasing';
      alerts: number;
    };
    seismic: {
      zone: number;
      score: number;
    };
    climate: {
      exposure: number;
      sensitivity: number;
      adaptiveCapacity: number;
    };
  };
  
  // Score Breakdown
  scores: {
    overall: number;
    ecologicalHealth: number;
    biodiversityRichness: number;
    waterSecurity: number;
    riskLevel: number;
    conservationStatus: number;
  };
  
  // Strengths, Pressures, Actions
  strengths: string[];
  pressures: string[];
  priorityActions: string[];
  
  // Seasonal Signature
  seasonalSignature: {
    spring: DistrictSeasonalSignature;
    summer: DistrictSeasonalSignature;
    autumn: DistrictSeasonalSignature;
    winter: DistrictSeasonalSignature;
  };
  
  // Evidence
  evidence: {
    reports: string[]; // Report slugs
    managementPlans: string[];
    eiAs: string[];
    policyDocuments: string[];
    datasets: string[];
  };
  
  // Monitoring
  monitoring: {
    lastSurvey: string;
    activeProjects: number;
    sensors: number;
  };
  
  // Metadata
  lastUpdated: string;
  dataQuality: 'high' | 'medium' | 'low';
}
```

### 3.2 Data Access Functions

```typescript
// District Profiles
getDistrictProfile(slug: string): DistrictProfile | null
getAllDistrictProfiles(kashmirOnly?: boolean): DistrictProfile[]
compareDistricts(slugs: string[]): DistrictProfile[]

// Score Calculations
calculateDistrictScore(profile: DistrictProfile): number
calculateEcologicalHealth(profile: DistrictProfile): number
calculateBiodiversityRichness(profile: DistrictProfile): number
calculateWaterSecurity(profile: DistrictProfile): number
calculateRiskLevel(profile: DistrictProfile): number
calculateConservationStatus(profile: DistrictProfile): number

// Comparison
getDistrictRankings(metric: string): { district: string; value: number; rank: number }[]
getDistrictDifferences(districts: DistrictProfile[]): DifferenceReport
```

---

## 4. Implementation Phases

### Phase 1: Data Model Enhancement (Week 1)
- Enhance DistrictProfile interface
- Add score calculation functions
- Populate all 16 districts with complete data

### Phase 2: Kashmir-Only Mode (Week 2)
- Add filter toggle
- Implement geographic scope labeling
- Calculate valley totals for baseline

### Phase 3: Comparison Mode (Week 3)
- Multi-select UI
- Side-by-side scorecards
- Radar chart visualization
- Difference highlighting

### Phase 4: Score Breakdown (Week 4)
- Component score calculation
- Sub-component breakdown
- Visualization of score composition

### Phase 5: Strengths/Pressures/Actions (Week 5)
- Structured arrays per district
- UI display components
- Priority ranking

### Phase 6: Risk Stack (Week 6)
- Multi-risk assessment
- Trend tracking
- Alert integration

### Phase 7: Evidence Linking (Week 7)
- Report metadata enhancement
- District linking
- Evidence archive UI

---

## 5. Acceptance Criteria

### Kashmir-Only Mode
- [ ] Default view shows 10 Valley districts
- [ ] Toggle switches to 16 districts
- [ ] Geographic scope clearly labeled
- [ ] Valley totals displayed

### District Comparison
- [ ] Multi-select works (2-4 districts)
- [ ] Side-by-side display functional
- [ ] Radar charts render correctly
- [ ] Differences highlighted

### Score Breakdown
- [ ] Overall score calculated correctly
- [ ] Component scores visible
- [ ] Weights documented
- [ ] Sub-components expandable

### Strengths/Pressures/Actions
- [ ] Arrays populated for all districts
- [ ] Display clear and scannable
- [ ] Priority ranking visible

### Risk Stack
- [ ] All 5 risk categories present
- [ ] Scores calculated
- [ ] Trends displayed
- [ ] Alerts integrated

### Evidence Linking
- [ ] Reports linked to districts
- [ ] Evidence archive accessible
- [ ] Links functional

---

## 6. Cross-Module Integration

### Protected Areas
- PA count and area per district
- PA management plans linked
- Species occurrence by district

### Water Systems
- Water body inventory
- Water quality data
- Restoration projects

### Biodiversity
- Species lists by district
- Endemism and threatened rates
- Habitat distribution

### Seasonal Ecology
- Seasonal signatures
- Bloom calendars
- Migration windows

### Risk Monitoring
- Hazard risk scores
- Incident counts
- Alert integration

### Trails & Sightings
- Trail networks
- Sighting density
- Observer activity

---

## 7. Success Metrics

| Metric | Baseline | Target |
|--------|----------|--------|
| Districts with complete data | 2/16 | 16/16 |
| Score breakdown visibility | 0% | 100% |
| Comparison mode usage | N/A | 500+/month |
| Evidence documents linked | 0 | 50+ |
| User engagement (time) | 1:30 | 5:00 |
| Return visitors | 10% | 35% |

---

## 8. Risk Analysis

| Risk | Impact | Mitigation |
|------|--------|------------|
| Data gaps for some districts | Medium | Use proxy indicators, document limitations |
| Score methodology disputes | Low | Transparent documentation, expert review |
| Information overload | Medium | Progressive disclosure, visual hierarchy |
| Performance with comparisons | Low | Lazy loading, optimized queries |

---

## 9. Operational Readiness

### Data Updates
- Census data: Every 10 years
- Forest cover: Every 2 years
- Species counts: Annual
- Risk scores: Quarterly
- Alerts: Real-time

### Documentation
- Score methodology document
- Data source citations
- Limitations disclosure
- Update schedule

### Quality Assurance
- Data validation checks
- Expert review of scores
- Community feedback mechanism
- Error correction workflow
