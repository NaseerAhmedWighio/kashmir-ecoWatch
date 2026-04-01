# Water Systems: Hydrological Intelligence Spine - Specification

## Overview

Transform the Water Systems module from a water body catalog into a **comprehensive hydrological intelligence spine** that integrates lake health assessment, spring vulnerability, wetland condition, river corridor stress, watershed hierarchy, and water quality trend analysis.

---

## 1. Scope and Dependencies

### 1.1 In Scope

#### Lake Health Scorecards
- Composite health scoring (0-100) integrating:
  - Water quality (WQI-based)
  - Trophic state (eutrophication risk)
  - Biodiversity integrity
  - Hydrological stability
  - Threat pressure
- Health classification: Excellent (90-100), Good (75-89), Fair (60-74), Poor (40-59), Critical (<40)
- Lake comparison mode (side-by-side health metrics)
- Temporal health trends

#### Spring Vulnerability Intelligence
- Springshed mapping (recharge area delineation)
- Discharge trend analysis (increasing/stable/declining/dry)
- Recharge zone vulnerability (land use, encroachment, contamination risk)
- Climate sensitivity scoring
- Spring health classification: Secure, Vulnerable, Critical, Dry

#### Wetland Condition Classes
- Condition assessment beyond NWIA classification
- Classes: Excellent, Good, Fair, Poor, Critical
- Assessment criteria:
  - Hydrological integrity (water regime, connectivity)
  - Water quality (nutrients, turbidity, DO)
  - Vegetation condition (native species, invasive cover)
  - Threat pressure (encroachment, pollution, disturbance)
- Ramsar site condition tracking

#### River Corridor Stress Index
- Riparian buffer analysis (width, continuity, vegetation)
- Land use stress (agriculture, urban, industrial in corridor)
- Flow regulation impact (dams, diversions, abstraction)
- Sediment load tracking (erosion, siltation)
- Corridor stress classification: Low, Moderate, High, Critical

#### Watershed Hierarchy
- Nested topology: Basin → Sub-basin → Catchment → Micro-catchment
- Upstream-downstream relationships
- Transboundary watershed tracking
- Watershed health indicators

#### Water Quality Trend Surfaces
- Valley-wide temporal analysis
- Parameter correlations (nutrients ↔ algal blooms)
- Seasonal pattern detection
- Predictive modeling (eutrophication risk)
- Hotspot identification

#### Hydrological Restoration Tracker
- Enhanced restoration project tracking
- Pre/post restoration health comparison
- Restoration effectiveness scoring
- Investment tracking (budget vs. outcomes)

#### District Water Intelligence
- District-specific water cards
- Water body counts by type
- Average health scores
- Critical water bodies
- Restoration investments

### 1.2 Out of Scope

- Real-time sensor integration (Phase 2)
- Groundwater modeling (Phase 2)
- Hydraulic simulation (Phase 2)
- Water rights/allocation tracking

### 1.3 External Dependencies

| Dependency | Owner | Status |
|------------|-------|--------|
| NWIA Wetland Inventory | MoEFCC | Data available |
| Water Quality Monitoring | J&K PCB | Partial integration |
| Ramsar Site Management | Wetlands International | Data available |
| Lake Conservation Plans | LAWDA, Wular Conservation | Partial |
| Spring Inventory | GSD/CGWB | Data available |

---

## 2. Key Decisions and Rationale

### 2.1 Composite Health Scoring

**Decision:** Use weighted multi-criteria scoring for lake health.

**Formula:**
```
Lake Health Score = (
  Water Quality × 0.35 +
  Trophic State × 0.20 +
  Biodiversity × 0.15 +
  Hydrology × 0.15 +
  Threat Pressure × 0.15
)
```

**Rationale:**
- Water quality is primary indicator (35% weight)
- Eutrophication is critical threat (20%)
- Biodiversity reflects ecosystem integrity (15%)
- Hydrology ensures water regime stability (15%)
- Threat pressure indicates future risk (15%)

### 2.2 Spring Vulnerability Framework

**Decision:** Adapt IUCN Springs Classification for Kashmir context.

**Vulnerability Factors:**
- Discharge trend (40% weight)
- Recharge zone condition (30%)
- Water quality (20%)
- Climate exposure (10%)

### 2.3 Wetland Condition Assessment

**Decision:** Combine NWIA classification with Ramsar health assessment.

**Condition Classes:**
- Excellent: Minimal human impact, all functions intact
- Good: Some modification, functions largely intact
- Fair: Moderate modification, some functions impaired
- Poor: Significant modification, key functions impaired
- Critical: Severe modification, functions collapsing

### 2.4 River Corridor Stress

**Decision:** 1km buffer analysis for riparian corridor.

**Stress Indicators:**
- Buffer width (<50m = high stress)
- Land use intensity (urban/agriculture = stress)
- Flow modification (dams/diversions = stress)
- Water quality degradation

### 2.5 Watershed Hierarchy

**Decision:** Implement 4-level hierarchy aligned with CWC classification.

**Levels:**
- Level 1: Basin (e.g., Indus Basin)
- Level 2: Sub-basin (e.g., Jhelum Basin)
- Level 3: Catchment (e.g., Lidder Catchment)
- Level 4: Micro-catchment (e.g., Aru Catchment)

---

## 3. Interfaces and API Contracts

### 3.1 New Data Models

#### Lake Health Scorecard
```typescript
interface LakeHealthScorecard {
  lakeSlug: string;
  overallScore: number;        // 0-100
  classification: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  
  componentScores: {
    waterQuality: number;      // 0-100 (from WQI)
    trophicState: number;      // 0-100 (inverse eutrophication)
    biodiversity: number;      // 0-100 (species richness, threatened)
    hydrology: number;         // 0-100 (water level stability)
    threatPressure: number;    // 0-100 (inverse threat score)
  };
  
  trends: {
    overall: 'improving' | 'stable' | 'declining';
    waterQuality: 'improving' | 'stable' | 'declining';
    trophicState: 'improving' | 'stable' | 'declining';
  };
  
  keyThreats: string[];
  conservationActions: string[];
  lastAssessment: string;      // ISO date
}
```

#### Spring Vulnerability Assessment
```typescript
interface SpringVulnerability {
  springSlug: string;
  vulnerabilityScore: number;  // 0-100 (100 = most vulnerable)
  classification: 'secure' | 'vulnerable' | 'critical' | 'dry';
  
  dischargeTrend: 'increasing' | 'stable' | 'declining' | 'dry';
  dischargeChange?: number;    // % change over baseline
  
  springshedArea?: number;     // km²
  rechargeZoneCondition: 'pristine' | 'good' | 'degraded' | 'critical';
  
  climateSensitivity: 'low' | 'medium' | 'high' | 'extreme';
  
  threats: string[];
  lastMeasured: string;
}
```

#### Wetland Condition Class
```typescript
interface WetlandCondition {
  wetlandSlug: string;
  conditionClass: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  conditionScore: number;      // 0-100
  
  componentAssessment: {
    hydrology: {               // Water regime
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
      nativeCover: number;     // %
      invasiveCover: number;   // %
    };
    threats: {
      score: number;
      encroachment: 'none' | 'low' | 'moderate' | 'high';
      pollution: 'none' | 'low' | 'moderate' | 'high';
      disturbance: 'none' | 'low' | 'moderate' | 'high';
    };
  };
  
  ramsarCriteria?: number[];   // Met Ramsar criteria numbers
  lastAssessment: string;
}
```

#### River Corridor Stress Index
```typescript
interface RiverCorridorStress {
  riverSlug: string;
  stressScore: number;         // 0-100 (100 = highest stress)
  classification: 'low' | 'moderate' | 'high' | 'critical';
  
  riparianBuffer: {
    averageWidth: number;      // meters
    continuity: 'intact' | 'fragmented' | 'severed';
    vegetationCondition: 'pristine' | 'good' | 'degraded';
  };
  
  landUseStress: {
    score: number;
    urbanCoverage: number;     // % of corridor
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
```

#### Watershed Hierarchy
```typescript
interface WatershedHierarchy {
  id: string;
  name: string;
  level: 1 | 2 | 3 | 4;        // Basin, Sub-basin, Catchment, Micro
  parentWatershed?: string;    // ID of parent
  childWatersheds?: string[];  // IDs of children
  
  area: number;                // km²
  perimeter: number;           // km
  
  drainageDensity: number;     // km/km²
  streamOrder: number;         // Strahler order
  
  waterBodies: {
    lakes: number;
    wetlands: number;
    rivers: number;
    springs: number;
  };
  
  healthIndicators: {
    forestCover: number;       // %
    erosionRisk: 'low' | 'moderate' | 'high';
    waterQuality: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  };
  
  transboundary: boolean;
  countries?: string[];
}
```

#### Water Quality Trend
```typescript
interface WaterQualityTrend {
  siteSlug: string;
  parameter: string;           // pH, DO, turbidity, etc.
  
  trend: 'improving' | 'stable' | 'declining';
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
  
  correlationWith?: string[];  // Correlated parameters
  drivingFactors?: string[];
  
  analysisPeriod: {
    start: string;
    end: string;
    dataPoints: number;
  };
}
```

### 3.2 Data Access Functions

```typescript
// Lake Health
getLakeHealthScorecard(lakeSlug: string): LakeHealthScorecard
getAllLakeHealthScores(): LakeHealthScorecard[]
compareLakes(lakeSlugs: string[]): LakeHealthScorecard[]
getLakeHealthTrend(lakeSlug: string): { year: number; score: number }[]

// Spring Vulnerability
getSpringVulnerability(springSlug: string): SpringVulnerability
getAllSpringVulnerability(): SpringVulnerability[]
getSpringsByDischargeTrend(trend: string): WaterEntity[]

// Wetland Condition
getWetlandCondition(wetlandSlug: string): WetlandCondition
getAllWetlandConditions(): WetlandCondition[]
getWetlandsByConditionClass(condition: string): WaterEntity[]

// River Corridor Stress
getRiverCorridorStress(riverSlug: string): RiverCorridorStress
getAllRiverCorridorStress(): RiverCorridorStress[]

// Watershed Hierarchy
getWatershedHierarchy(watershedSlug: string): WatershedHierarchy
getWatershedChildren(watershedSlug: string): WatershedHierarchy[]
getWatershedAncestors(watershedSlug: string): WatershedHierarchy[]
getWatershedWaterBodies(watershedSlug: string): WaterEntity[]

// Water Quality Trends
getWaterQualityTrends(siteSlug: string): WaterQualityTrend[]
getValleyWideWaterQualityTrends(): { parameter: string; trend: string }[]
getWaterQualityCorrelations(): { param1: string; param2: string; correlation: number }[]

// District Water Intelligence
getDistrictWaterIntelligence(district: string): DistrictWaterIntelligence
```

---

## 4. Non-Functional Requirements

### 4.1 Performance

| Metric | Target |
|--------|--------|
| Lake health score calculation | < 100ms |
| Watershed hierarchy rendering | < 500ms |
| Water quality trend analysis | < 1s |
| District water card load | < 300ms |

### 4.2 Data Quality

- All health scores must be reproducible (documented methodology)
- Trend analysis requires minimum 3 data points
- Vulnerability assessments must cite data sources

### 4.3 Accessibility

- All charts must have text alternatives
- Color-blind safe palettes for health classifications
- Keyboard navigation for comparison mode

---

## 5. Implementation Phases

### Phase 1: Lake Health Scorecards (Week 1)
- Implement scoring algorithm
- Create health scorecard component
- Build lake comparison mode
- Update lake detail pages

### Phase 2: Spring Vulnerability (Week 2)
- Springshed mapping data
- Vulnerability scoring
- Spring detail page enhancements
- Discharge trend visualization

### Phase 3: Wetland Condition (Week 3)
- Condition class assessment
- Ramsar site tracking
- Wetland detail enhancements
- NWIA + condition integration

### Phase 4: River Corridor Stress (Week 4)
- Riparian buffer analysis
- Land use stress scoring
- River detail enhancements
- Flow regulation tracking

### Phase 5: Watershed Hierarchy (Week 5)
- Nested topology implementation
- Watershed detail pages
- Upstream-downstream visualization
- Transboundary tracking

### Phase 6: Water Quality Trends (Week 6)
- Temporal analysis engine
- Correlation analysis
- Trend dashboard
- Predictive modeling

### Phase 7: District Intelligence (Week 7)
- District water cards
- Aggregated health metrics
- Restoration investment tracking
- Cross-district comparison

---

## 6. Acceptance Criteria

### Lake Health Scorecards
- [ ] All 14 lakes have health scorecards
- [ ] Scores are reproducible with documented methodology
- [ ] Comparison mode works for 2-4 lakes
- [ ] Health trends show 5-year history

### Spring Vulnerability
- [ ] All 8 springs have vulnerability assessments
- [ ] Discharge trends calculated from monitoring data
- [ ] Springshed boundaries mapped
- [ ] Climate sensitivity scored

### Wetland Condition
- [ ] All 8 wetlands have condition classes
- [ ] Ramsar criteria tracked for Ramsar sites
- [ ] Condition trends available
- [ ] NWIA + condition both displayed

### River Corridor Stress
- [ ] All 12 rivers have stress indices
- [ ] Riparian buffer width measured
- [ ] Land use stress quantified
- [ ] Flow regulation documented

### Watershed Hierarchy
- [ ] 4-level hierarchy implemented
- [ ] Parent-child relationships defined
- [ ] Watershed health indicators calculated
- [ ] Transboundary watersheds flagged

### Water Quality Trends
- [ ] All 6 sites have trend analysis
- [ ] Valley-wide trends dashboard exists
- [ ] Parameter correlations calculated
- [ ] Seasonal patterns identified

### District Intelligence
- [ ] All 16 districts have water cards
- [ ] Health scores aggregated by district
- [ ] Restoration investments tracked
- [ ] Critical water bodies identified

---

## 7. Success Metrics

| Metric | Baseline | Target |
|--------|----------|--------|
| Lakes with health scores | 0 | 14/14 |
| Springs with vulnerability | 0 | 8/8 |
| Wetlands with condition | 0 | 8/8 |
| Rivers with stress index | 0 | 12/12 |
| Watershed hierarchy levels | 1 | 4 |
| Water quality trends | partial | complete |
| User engagement (time on page) | 2:00 | 4:30 |
| Cross-module navigation | low | high |

---

## 8. Cross-Module Integration

### Biodiversity
- Freshwater species linked to water bodies
- Fish kill alerts from water quality
- Migratory bird wetland dependency

### Climate
- Spring discharge as climate indicator
- Glacier melt contribution to rivers
- Water temperature trends

### Risk Monitoring
- Algal bloom integration
- Flood risk from hydrological data
- Pollution source tracking

### Protected Areas
- Ramsar site condition
- Wetland reserve management
- Sanctuary water needs

### Districts
- District water security
- Inter-district water sharing
- Local restoration initiatives

---

## 9. Risk Analysis

| Risk | Impact | Mitigation |
|------|--------|------------|
| Data gaps for springs | Medium | Use proxy indicators, field surveys |
| Inconsistent water quality data | High | Standardize methodology, document limitations |
| Watershed boundary disputes | Medium | Use CWC official boundaries |
| Limited trend data | Medium | Start with available data, expand monitoring |

---

## 10. Operational Readiness

### Monitoring
- Health score recalculation: Monthly
- Trend analysis: Quarterly
- Vulnerability reassessment: Annually

### Documentation
- Methodology documents for all scoring systems
- Data source citations
- Limitations and uncertainty disclosure

### Training
- Staff training on assessment protocols
- Public awareness of health classifications
