# Seasonal Ecology: Deepen Seasonal Intelligence - Specification

## Overview

Enhance the Seasonal Ecology module from a seasonal calendar into a **comprehensive seasonal intelligence system** with season comparison, district signatures, phenology anomaly detection, climate-shift indicators, and integrated seasonal dashboards.

---

## 1. Scope and Dependencies

### 1.1 In Scope

#### Season Comparison Mode
- Side-by-side comparison of all 4 seasons
- District-by-district seasonal patterns
- Ecosystem comparison across seasons
- Bloom progression tracking (spring → summer → autumn)
- Migration wave comparison
- Agricultural calendar comparison (orchard bloom → fruit set → harvest)

#### District Seasonal Signature Cards
- All 18 districts with seasonal profiles
- Primary seasons per district
- Key phenological events by month
- Bloom calendar per district
- Migration windows per district
- Agricultural activities by season
- Tourism/access windows

#### Phenology Anomaly Detection
- Baseline phenology (1980-2010 average)
- Current year observations
- Deviation calculation (days early/late)
- Anomaly classification: Normal, Early, Late, Significantly Shifted
- Climate correlation (temperature anomaly ↔ phenology shift)
- Species-specific sensitivity scoring

#### Season-Linked Access Windows
- Integration with Climate Windows
- Road accessibility by season
- Trail conditions by season
- Field readiness indicators
- Visibility conditions
- Permit requirements by season
- Best visitation windows

#### Agriculture / Orchards Integration
- Orchard bloom calendar (almond, apple, cherry, peach)
- Fruit set windows
- Harvest windows by crop
- Pollinator activity alignment
- Agricultural advisories
- Crop-specific climate sensitivity
- Orchard district mapping

#### Climate-Shift Indicators
- Temperature trend (decadal)
- Precipitation pattern shifts
- Snowpack depth trends
- Glacier retreat indicators
- Spring onset shift (days/decade)
- Autumn arrival shift
- Growing season length change
- Extreme event frequency

#### Season-Linked District Alerts
- Bloom alerts (early/late bloom risk)
- Frost risk alerts (orchard protection)
- Migration alerts (peak bird activity)
- Fire risk alerts (dry season)
- Flood alerts (snowmelt/flood season)
- Access closure alerts (winter)
- Pollinator alerts (bloom-pollinator mismatch)

#### Seasonal Ecology Dashboard
- Current seasonal state
- Active bloom zones
- Active migration windows
- Active agricultural windows
- Climate indicators summary
- Anomaly alerts
- District seasonal map
- Upcoming phenological events

### 1.2 Out of Scope

- Algal bloom tracking (remains in Water Systems / Risk Monitoring)
- Real-time weather forecasting
- Agricultural yield prediction
- Detailed crop management advisories

### 1.3 External Dependencies

| Dependency | Owner | Status |
|------------|-------|--------|
| IMD Climate Data | India Meteorological Dept | Partial integration |
| Phenology Observations | Community/Researchers | Available via phenologyRecords |
| Agricultural Calendars | SKUAST-K | Data needed |
| Bloom Observations | Tourism Dept, Community | Partial |
| Migration Data | Wetlands International | Available via migrationWindows |

---

## 2. Key Decisions and Rationale

### 2.1 Season Comparison Framework

**Decision:** Implement 4-season comparison with district and ecosystem views.

**Rationale:**
- Users need to understand seasonal variation for planning
- District tourism depends on seasonal access
- Agricultural activities are season-specific
- Conservation monitoring requires seasonal baseline

### 2.2 Phenology Anomaly Detection

**Decision:** Use 30-year baseline (1980-2010) for anomaly calculation.

**Formula:**
```
Anomaly (days) = Current Year Event Date - Baseline Average Date
Classification:
  |Anomaly| < 7 days: Normal
  7-14 days: Early/Late
  14-21 days: Significantly Early/Late
  |Anomaly| > 21 days: Extremely Shifted
```

**Rationale:**
- 30-year standard climate baseline
- Week-level thresholds are ecologically meaningful
- Aligns with IPCC anomaly classification

### 2.3 Climate-Shift Indicators

**Decision:** Track 8 key indicators with decadal trends.

**Indicators:**
1. Spring Onset (days from Jan 1)
2. Autumn Arrival (days from Jan 1)
3. Growing Season Length (days)
4. Average Temperature (°C change/decade)
5. Precipitation Pattern (mm change/decade)
6. Snowpack Depth (cm change/decade)
7. Glacier Mass Balance (m water equivalent/decade)
8. Extreme Event Frequency (events/year)

### 2.4 Agriculture Integration

**Decision:** Focus on orchard crops (almond, apple, cherry, peach) as primary agricultural signal.

**Rationale:**
- Orchards are dominant agricultural land use
- Bloom timing is clear phenological indicator
- Climate sensitivity is high (frost risk)
- Tourism linkage (bloom tourism)

### 2.5 Alert Integration

**Decision:** Link seasonal ecology to risk monitoring alert system.

**Alert Types:**
- Bloom Risk (frost damage potential)
- Migration Peak (tourism opportunity)
- Access Window (road/trail status)
- Climate Anomaly (significant deviation)
- Pollinator Mismatch (bloom-pollinator timing)

---

## 3. Interfaces and API Contracts

### 3.1 New Data Models

#### Season Comparison
```typescript
interface SeasonComparison {
  season: Season;
  districts: DistrictSeasonalSignature[];
  activeBloomZones: BloomZone[];
  activeMigrationWindows: MigrationWindow[];
  activeAgriculturalWindows: AgriculturalWindow[];
  climateIndicators: ClimateIndicator[];
  accessWindows: AccessWindow[];
}

interface DistrictSeasonalSignature {
  district: string;
  season: Season;
  primaryLandscapes: string[];
  bloomEvents: BloomEvent[];
  migrationEvents: MigrationEvent[];
  agriculturalActivities: AgriculturalActivity[];
  accessStatus: 'open' | 'limited' | 'closed';
  tourismPotential: 'low' | 'moderate' | 'high' | 'peak';
  climateSummary: string;
}
```

#### Phenology Anomaly
```typescript
interface PhenologyAnomaly {
  recordSlug: string;
  recordType: string;
  speciesOrEvent: string;
  district: string;
  
  baselineDate: string;        // Average date (1980-2010)
  currentYearDate: string;     // Current year observed date
  anomalyDays: number;         // Days early (-) or late (+)
  classification: 'normal' | 'early' | 'late' | 'significantly-early' | 'significantly-late' | 'extremely-shifted';
  
  climateCorrelation?: {
    temperatureAnomaly: number;  // °C from baseline
    precipitationAnomaly: number; // % from baseline
  };
  
  ecologicalImpacts: string[];
  monitoringStatus: 'active' | 'concern' | 'critical';
}
```

#### Climate-Shift Indicator
```typescript
interface ClimateShiftIndicator {
  indicator: string;
  unit: string;
  
  baseline: {
    period: string;            // e.g., "1980-2010"
    value: number;
  };
  
  current: {
    year: number;
    value: number;
  };
  
  trend: {
    changePerDecade: number;
    direction: 'increasing' | 'decreasing' | 'stable';
    significance: 'significant' | 'moderate' | 'not-significant';
  };
  
  ecologicalImpacts: string[];
  visualizationType: 'line' | 'bar' | 'heatmap';
}
```

#### Agricultural Window
```typescript
interface AgriculturalWindow {
  slug: string;
  cropType: 'almond' | 'apple' | 'cherry' | 'peach' | 'walnut' | 'apricot';
  district: string;
  
  phenologicalStages: {
    budBurst: SeasonalTimingWindow;
    bloom: SeasonalTimingWindow;
    fruitSet: SeasonalTimingWindow;
    fruitDevelopment: SeasonalTimingWindow;
    harvest: SeasonalTimingWindow;
  };
  
  climateRequirements: {
    chillingHours: number;     // Hours < 7°C
    growingDegreeDays: number;
    frostRisk: 'low' | 'moderate' | 'high';
  };
  
  pollinatorAlignment: {
    primaryPollinators: string[];
    pollinatorWindow: SeasonalTimingWindow;
    alignmentStatus: 'aligned' | 'mismatch-risk' | 'critical-mismatch';
  };
  
  advisories: string[];
}
```

#### Seasonal Alert
```typescript
interface SeasonalAlert {
  id: string;
  type: 'bloom-risk' | 'frost-risk' | 'migration-peak' | 'access-closure' | 'fire-risk' | 'flood-risk' | 'pollinator-mismatch';
  severity: 'low' | 'moderate' | 'high' | 'critical';
  
  title: string;
  description: string;
  
  affectedDistricts: string[];
  affectedSeasons: Season[];
  affectedEntities: string[];  // Slugs of affected bloom zones, migration windows, etc.
  
  validFrom: string;           // ISO date
  validUntil: string;          // ISO date
  
  recommendedActions: string[];
  linkedRiskMonitoring?: string;  // Link to risk-monitoring page
}
```

### 3.2 Data Access Functions

```typescript
// Season Comparison
getSeasonComparison(season: Season): SeasonComparison
compareSeasons(seasons: Season[]): SeasonComparison[]
getDistrictSeasonalSignature(district: string, season: Season): DistrictSeasonalSignature

// Phenology Anomaly
getPhenologyAnomalies(district?: string): PhenologyAnomaly[]
getPhenologyTrend(recordSlug: string): { year: number; date: string }[]
calculateAnomalyDays(baseline: string, current: string): number

// Climate Shift
getClimateShiftIndicators(): ClimateShiftIndicator[]
getClimateTrend(indicator: string): { year: number; value: number }[]

// Agriculture
getAgriculturalWindows(cropType?: string): AgriculturalWindow[]
getOrchardBloomCalendar(district: string): AgriculturalWindow[]
getPollinatorAlignmentStatus(): { aligned: number; mismatchRisk: number; critical: number }

// Alerts
getSeasonalAlerts(season?: Season): SeasonalAlert[]
getActiveAlerts(district?: string): SeasonalAlert[]

// Dashboard
getSeasonalDashboardData(): SeasonalDashboardData
```

---

## 4. Implementation Phases

### Phase 1: Data Model Enhancement (Week 1)
- Add agricultural windows data
- Add climate-shift indicators data
- Add phenology anomaly detection functions
- Enhance district seasonal data (all 18 districts)

### Phase 2: Season Comparison UI (Week 2)
- Season comparison page
- Side-by-side season cards
- District seasonal signature view
- Ecosystem comparison mode

### Phase 3: Phenology Anomaly Detection (Week 3)
- Anomaly calculation engine
- Anomaly visualization component
- Trend charts for phenology records
- Climate correlation display

### Phase 4: Climate-Shift Dashboard (Week 4)
- Climate indicators dashboard
- Decadal trend visualization
- Impact assessment display
- Integration with phenology anomalies

### Phase 5: Agriculture Integration (Week 5)
- Orchard bloom calendar
- Agricultural window cards
- Pollinator alignment tracking
- Crop-specific advisories

### Phase 6: Alert System Integration (Week 6)
- Seasonal alert generation
- Alert display components
- Integration with risk monitoring
- District alert pages

### Phase 7: Seasonal Dashboard (Week 7)
- Main dashboard with all indicators
- Current seasonal state
- Active windows summary
- Upcoming events calendar
- Anomaly alerts panel

---

## 5. Acceptance Criteria

### Season Comparison
- [ ] All 4 seasons have comparison data
- [ ] All 18 districts have seasonal signatures
- [ ] Side-by-side comparison works
- [ ] Bloom progression visible across seasons

### District Signatures
- [ ] All 18 districts have detailed profiles
- [ ] Monthly phenological events listed
- [ ] Bloom calendar per district
- [ ] Access status by season

### Phenology Anomaly
- [ ] Anomaly calculation accurate (±1 day)
- [ ] Classification thresholds correct
- [ ] Trend charts show 10+ years
- [ ] Climate correlation displayed

### Climate-Shift Indicators
- [ ] All 8 indicators tracked
- [ ] Decadal trends calculated
- [ ] Ecological impacts listed
- [ ] Visualization clear

### Agriculture Integration
- [ ] All 6 crop types have windows
- [ ] Orchard bloom calendar functional
- [ ] Pollinator alignment tracked
- [ ] Advisories displayed

### Alerts
- [ ] All 7 alert types implemented
- [ ] Alert generation logic works
- [ ] District filtering works
- [ ] Links to risk monitoring functional

### Dashboard
- [ ] Current season displayed
- [ ] Active windows summarized
- [ ] Anomaly alerts visible
- [ ] Upcoming events listed

---

## 6. Cross-Module Integration

### Water Systems
- Bloom mapping (floral) distinct from algal blooms
- Water transition linkage
- Wetland migration windows

### Risk Monitoring
- Alert integration (frost, fire, flood)
- Algal bloom cross-reference
- Climate risk linkage

### Biodiversity
- Species activity alignment
- Migration window integration
- Habitat signal correlation

### Districts
- District seasonal profiles
- Access windows by district
- Tourism potential by season

### Trails & Sightings
- Trail accessibility by season
- Seasonal sighting windows
- Bloom trail alignment

---

## 7. Success Metrics

| Metric | Baseline | Target |
|--------|----------|--------|
| Districts with seasonal data | 8 | 18 |
| Phenology records with trends | 0 | 100% |
| Climate indicators tracked | 0 | 8 |
| Agricultural windows | 0 | 6 crops |
| Active alerts | 0 | Real-time |
| User engagement (time on page) | 2:30 | 5:00 |
| Return visitors (seasonal) | 10% | 35% |

---

## 8. Risk Analysis

| Risk | Impact | Mitigation |
|------|--------|------------|
| Limited historical phenology data | High | Use expert knowledge, literature |
| Agricultural data gaps | Medium | Focus on major crops first |
| Alert fatigue | Medium | Tiered severity, smart filtering |
| Climate data inconsistency | High | Document sources, uncertainty |

---

## 9. Operational Readiness

### Monitoring
- Phenology observations: Continuous
- Anomaly calculation: Weekly during growing season
- Climate indicators: Monthly update
- Alert generation: Real-time

### Documentation
- Phenology observation protocols
- Anomaly calculation methodology
- Alert generation criteria
- Agricultural advisory guidelines

### Training
- Community phenology monitoring
- Alert response protocols
- Agricultural advisory dissemination
