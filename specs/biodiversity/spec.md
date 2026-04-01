# Biodiversity Module Intelligence Upgrade Specification

## Executive Summary

**Current State:** The Biodiversity module is already a good intelligence module with strong hero, metrics, taxonomic categories, featured species, Red Data Book section, and cross-module links. However, it still feels more like a **species intelligence showcase** than a fully mature **Kashmir biodiversity intelligence system**.

**Target State:** A comprehensive **Kashmir biodiversity intelligence, conservation status, habitat systems, and ecological distribution platform** with habitat-led intelligence, district biodiversity patterns, enhanced conservation analytics, and deeper cross-module integration.

---

## 1. Scope and Dependencies

### 1.1 In Scope

#### Core Module Upgrades
- **Hero + Biodiversity Command Surface:** Enhanced with search, quick chips, stronger positioning
- **Taxonomic Intelligence:** Existing 6 category cards (preserved and enhanced)
- **Habitat Intelligence (NEW):** Forest, Wetland, Alpine, Riverine, Meadow biodiversity cards
- **Conservation Intelligence:** Upgraded Red Data Book section with threat patterns, legal status, vulnerability hotspots
- **Distribution Intelligence:** Enhanced "Explore by Intelligence Mode" with district, PA, season, status pathways
- **Cross-Module Intelligence:** Expanded links to 8 modules (Protected Areas, Water Systems, Seasonal Ecology, Risk & Monitoring, Trails & Sightings, District Profiles, Atlas, Research Library)

#### Data Enhancements
- Habitat system aggregation data
- District biodiversity intelligence
- Conservation threat patterns by taxon
- Legal protection status mapping
- Vulnerability indicators and risk drivers

#### User Workflows
- Habitat-based exploration
- District biodiversity discovery
- Conservation status filtering
- Threatened species research
- Cross-module navigation

### 1.2 Out of Scope

- Backend API development (assumed existing or mock data)
- Species detail page overhaul
- New taxonomic group additions
- Mobile application development
- User authentication changes

### 1.3 External Dependencies

| Dependency | Type | Owner | Status |
|------------|------|-------|--------|
| Red Data Book Data | Internal | Biodiversity Module | Available |
| Protected Areas Data | Internal | Protected Areas Module | Available |
| Water Systems Data | Internal | Water Systems Module | Available |
| District Profiles | Internal | District Intelligence | Available |
| Seasonal Ecology Data | Internal | Seasonal Ecology Module | Available |
| Risk & Monitoring | Internal | Risk Module | Available |
| Trails & Sightings | Internal | Trails Module | Available |
| Atlas Map Components | Internal | Atlas Module | Available |

---

## 2. Key Decisions and Rationale

### 2.1 Module Positioning Decision

**Options Considered:**
1. Keep as species intelligence showcase (current)
2. Elevate to full biodiversity intelligence system (recommended)
3. Merge habitat and conservation into single view

**Selected Option:** Option 2

**Rationale:**
- Preserves existing strengths while adding depth
- Habitat intelligence addresses ecological system storytelling gap
- Conservation intelligence upgrade leverages Red Data Book investment
- Distribution intelligence enables district/PA/season exploration

### 2.2 Habitat Intelligence Architecture

**Decision:** Add 5 habitat-system cards as major intelligence band

**Habitat Systems:**
- **Forest Biodiversity:** Temperate, coniferous, oak forests
- **Wetland Biodiversity:** Lakes, marshes, Ramsar sites
- **Alpine Biodiversity:** High-altitude meadows, cryosphere
- **River & Stream Biodiversity:** Freshwater ecosystems
- **Meadow & Grassland Biodiversity:** Valley meadows, pasture lands

**Rationale:**
- Addresses "too species-card driven" critique
- Makes ecological systems visible
- Enables habitat-based research workflows
- Cross-links to Water Systems, Protected Areas

### 2.3 Conservation Intelligence Enhancement

**Decision:** Upgrade Red Data Book section into analytical conservation band

**Enhancements:**
- Threat pattern by taxon visualization
- Legal vs source status (WLPA 1972)
- Endemic/Kashmir-priority species flags
- Habitats under pressure indicators
- Cross-links to risk drivers (hydrology, fire, fragmentation, climate)

**Rationale:**
- Leverages existing Red Data Book investment
- Adds analytical depth beyond card listing
- Connects biodiversity to Risk & Monitoring
- Supports conservation prioritization

### 2.4 Distribution Intelligence Upgrade

**Decision:** Transform "Explore by Intelligence Mode" from thin tabs to decision layer

**Enhanced Modes:**
- **By Habitat:** Links to habitat intelligence
- **By Protected Area:** PA-focused biodiversity
- **By District:** District biodiversity profiles
- **By Season:** Seasonal occurrence patterns
- **By Conservation Status:** IUCN/WLPA filtering
- **By Sightings:** Field observation linkage

**Rationale:**
- Addresses "too thin" critique
- Provides multiple entry points
- Supports different user mental models
- Enables cross-module navigation

### 2.5 District Biodiversity Intelligence

**Decision:** Add district-level biodiversity analytics

**Metrics:**
- Most species-rich districts
- Wetland bird districts
- Alpine biodiversity districts
- Threatened species concentration
- Medicinal plant landscapes

**Rationale:**
- Addresses geographic intelligence gap
- Links to District Profiles module
- Enables local-level conservation
- Supports district-level planning

---

## 3. Interfaces and API Contracts

### 3.1 Habitat Intelligence Schema

```typescript
interface HabitatBiodiversity {
  id: string;
  slug: string;
  name: string;
  description: string;
  
  // Coverage
  areaKm2: number;
  percentOfKashmir: number;
  districts: KashmirDistrict[];
  
  // Biodiversity Metrics
  speciesCount: number;
  endemicSpecies: number;
  threatenedSpecies: number;
  migratorySpecies: number;
  
  // Taxonomic Breakdown
  byTaxonomicGroup: {
    mammals: number;
    birds: number;
    fish: number;
    plants: number;
    medicinalPlants: number;
  };
  
  // Conservation Status
  protectedAreaOverlap: number; // km2
  ramserSites?: number;
  vulnerabilityScore: 'low' | 'medium' | 'high' | 'critical';
  
  // Risk Drivers
  riskDrivers: string[];
  
  // Linkages
  relatedProtectedAreas: string[];
  relatedWaterSystems?: string[];
  relatedTrails?: string[];
  
  // Featured Species
  flagshipSpecies: string[]; // Species slugs
  
  imageUrl?: string;
}
```

### 3.2 District Biodiversity Schema

```typescript
interface DistrictBiodiversity {
  district: KashmirDistrict;
  
  // Species Richness
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
  protectedAreaCoverage: number; // km2
  
  // Hotspots
  biodiversityHotspots: string[];
  wetlandBirdConcentration?: number;
  alpineBiodiversityScore?: number;
  medicinalPlantLandscapes?: string[];
  
  // Risk
  habitatLossRisk: 'low' | 'medium' | 'high';
  humanWildlifeConflict: 'low' | 'medium' | 'high';
  
  // Linkages
  relatedProtectedAreas: string[];
  relatedTrails: string[];
}
```

### 3.3 Conservation Intelligence Schema

```typescript
interface ConservationAnalytics {
  // Threat Patterns by Taxon
  byTaxon: {
    mammals: {
      total: number;
      CR: number;
      EN: number;
      VU: number;
      primaryThreats: string[];
    };
    birds: { /* same structure */ };
    // ...
  };
  
  // Legal Protection Status
  wlpa1972Schedule: {
    scheduleI: number; // Highest protection
    scheduleII: number;
    scheduleIII: number;
    scheduleIV: number;
  };
  
  // Kashmir Priority Species
  prioritySpecies: Array<{
    species: string;
    reason: 'endemic' | 'critically-endangered' | 'flagship' | 'keystone';
    habitats: string[];
    districts: KashmirDistrict[];
  }>;
  
  // Vulnerability Hotspots
  hotspots: Array<{
    name: string;
    district: KashmirDistrict;
    habitat: HabitatType;
    threatenedSpeciesCount: number;
    primaryThreats: string[];
    relatedRisks: string[]; // Links to Risk & Monitoring
  }>;
  
  // Risk Driver Correlation
  riskDrivers: {
    habitatFragmentation: number; // Species affected
    hydrologicalChange: number;
    forestFire: number;
    climateChange: number;
    humanWildlifeConflict: number;
  };
}
```

---

## 4. Non-Functional Requirements

### 4.1 Performance

| Metric | Target |
|--------|--------|
| Page Load (LCP) | < 2.5s |
| Time to Interactive | < 3.5s |
| Lighthouse Score | > 90 |

### 4.2 Accessibility

| Standard | Target |
|----------|--------|
| WCAG Level | AA |
| Keyboard Navigation | Full support |

### 4.3 Kashmir-Only Content

- All species must have Kashmir distribution
- No generic Himalayan species without Kashmir records
- District-level specificity required
- Protected Area references must be Kashmir PAs

---

## 5. Data Management

### 5.1 Source of Truth

| Data Type | Primary Source |
|-----------|----------------|
| Species Data | `src/data/biodiversity.ts` |
| Red Data Book | `src/data/red-data-book-kashmir.ts` |
| Habitat Systems | Derived from species habitats |
| District Data | Aggregated from species districts |
| Protected Areas | Protected Areas Module |

### 5.2 Data Validation

- All species must have valid `districts` array
- Conservation status must match IUCN/WLPA
- Habitat assignments must be consistent
- District names must match `KashmirDistrict` type

---

## 6. Operational Readiness

### 6.1 Observability

**Metrics to Track:**
- Habitat card CTR
- District exploration usage
- Conservation section engagement
- Cross-module navigation clicks

### 6.2 Feature Flags

```typescript
const BIODIVERSITY_FLAGS = {
  enableHabitatIntelligence: true,
  enableDistrictBiodiversity: true,
  enableConservationAnalytics: true,
  enableCrossModuleLinks: true,
};
```

---

## 7. Risk Analysis

### 7.1 Top Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Data inconsistency | Medium | Validation at build time |
| Performance degradation | Low | Lazy loading, pagination |
| Content drift (non-Kashmir) | Medium | Strict validation rules |

---

## 8. Evaluation and Validation

### 8.1 Definition of Done

- [ ] 6 intelligence bands implemented
- [ ] Habitat intelligence cards (5 cards)
- [ ] Conservation analytics upgraded
- [ ] District biodiversity data populated
- [ ] Cross-module links (8 modules)
- [ ] Build passes without errors
- [ ] Lighthouse score > 90

### 8.2 Acceptance Criteria

**Functional:**
- [ ] Module repositioned as biodiversity intelligence system
- [ ] Habitat Intelligence band visible with 5 habitat cards
- [ ] Red Data Book section shows threat patterns, legal status
- [ ] "Explore by Intelligence Mode" enhanced with counts/descriptions
- [ ] District biodiversity intelligence surfaced
- [ ] Cross-module links to all 8 modules

**Design:**
- [ ] Premium, modern, scientific aesthetic maintained
- [ ] Consistent with Water Systems / Trails & Sightings upgrades
- [ ] Clear visual hierarchy

**Technical:**
- [ ] TypeScript strict mode compliance
- [ ] No console errors
- [ ] Build passes

---

## 9. Implementation Phases

### Phase 1: Foundation (P0)
- Habitat intelligence data model
- District biodiversity aggregation
- Conservation analytics schema

### Phase 2: Components (P1)
- HabitatIntelligenceCard component
- DistrictBiodiversityPanel component
- ConservationAnalyticsPanel component
- EnhancedExploreModeCard component

### Phase 3: Page Integration (P2)
- Add Habitat Intelligence band
- Upgrade Red Data Book section
- Enhance "Explore by Intelligence Mode"
- Expand cross-module links

### Phase 4: Polish (P3)
- Performance optimization
- Accessibility audit
- Visual polish

---

## References

- [Trails & Sightings Spec](../trails-sightings/spec.md) - Similar upgrade pattern
- [Biodiversity Data](../../src/data/biodiversity.ts) - Existing species data
- [Red Data Book](../../src/data/red-data-book-kashmir.ts) - Conservation data
