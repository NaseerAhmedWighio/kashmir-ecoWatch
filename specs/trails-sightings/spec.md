# Trails & Sightings Module Upgrade Specification

## Executive Summary

**Current State:** The Trails & Sightings module exists as a functional directory-style page with trail categories, sighting categories, basic metrics, and recent sightings. However, it lacks the intelligence depth, architectural maturity, and cross-module integration present in stronger modules like Risk & Monitoring, Water Systems, and Protected Areas.

**Target State:** A fully developed **Kashmir ecological access, field observation, and citizen-science intelligence system** with layered interpretation, district context, map logic, monitoring signals, workflow depth, and platform-wide integration.

---

## 1. Scope and Dependencies

### 1.1 In Scope

#### Core Module Upgrades
- **Hero + Command Surface:** Repositioned as Kashmir ecological access and field intelligence
- **Trail Intelligence Overview:** Enhanced trail cards with district, habitat, altitude, season window, access status, sensitivity, related species/PA
- **Sighting Intelligence Overview:** Analytical sighting categories with verified vs community counts, district distribution, seasonal concentration
- **Map-Linked Ecological Access Preview:** Interactive map showing trail networks, sighting hotspots, district boundaries
- **Seasonal Windows and Route Conditions:** Seasonality logic, access windows, route condition signals
- **Recent Verified Field Intelligence:** Filtered Kashmir-only sightings with verification states
- **Contribution and Verification Workflow:** Enhanced citizen science pathways
- **Linked District / Habitat / Protected-Area Intelligence:** Cross-module navigation

#### Data Models
- Trail intelligence schema with full metadata
- Sighting intelligence schema with verification workflow
- Kashmir-only filtering logic
- Cross-module reference system

#### User Workflows
- Trail discovery with intelligence layers
- Sighting exploration with analytical filters
- Field observation submission
- Verification workflow participation
- Cross-module navigation

### 1.2 Out of Scope

- Backend API development (assumed existing or mock data)
- Mobile application development
- Real-time GPS tracking features
- User authentication system overhaul
- Payment or permit processing systems

### 1.3 External Dependencies

| Dependency | Type | Owner | Status |
|------------|------|-------|--------|
| Biodiversity Data Service | Internal | Biodiversity Module | Available |
| Protected Areas Data | Internal | Protected Areas Module | Available |
| District Profiles | Internal | District Intelligence | Available |
| Water Systems Data | Internal | Water Systems Module | Available |
| Seasonal Ecology Data | Internal | Seasonal Ecology Module | Available |
| Risk & Monitoring Alerts | Internal | Risk Module | Available |
| Atlas Map Components | Internal | Atlas Module | Available |
| NWIA Classification | Reference | National Wetland Inventory | Available |

---

## 2. Key Decisions and Rationale

### 2.1 Module Positioning Decision

**Options Considered:**
1. Keep as citizen-science and trail discovery portal (current)
2. Elevate to ecological access and field intelligence system (recommended)
3. Merge with Biodiversity module entirely

**Selected Option:** Option 2

**Rationale:**
- Maintains module identity while adding scientific depth
- Enables cross-module linking without redundancy
- Supports both citizen scientists and researchers
- Aligns with platform's intelligence-first philosophy

### 2.2 Intelligence Band Architecture

**Decision:** Implement 8 distinct intelligence bands with clear hierarchy

**Bands:**
1. Hero + Command Surface
2. Trail Intelligence Overview
3. Sighting Intelligence Overview
4. Map-Linked Ecological Access Preview
5. Seasonal Windows and Route Conditions
6. Recent Verified Field Intelligence
7. Contribution and Verification Workflow
8. Linked District / Habitat / Protected-Area Intelligence

**Rationale:**
- Mirrors successful patterns from Water Systems and Risk & Monitoring
- Provides progressive disclosure of complexity
- Supports multiple user personas (casual visitor, researcher, field observer)
- Enables modular future enhancements

### 2.3 Kashmir-Only Content Policy

**Decision:** Enforce strict Kashmir-only filtering for public-facing content

**Implementation:**
- Exclude Leh/Hemis and other non-Kashmir locations from public views
- Maintain internal data for research purposes
- Add geographic validation to submission workflow
- Display clear geographic scope messaging

**Rationale:**
- Maintains platform's Kashmir-focused identity
- Prevents user confusion about geographic scope
- Aligns with mandate and branding
- Reduces data quality issues

### 2.4 Trail Intelligence Hierarchy

**Decision:** Implement tiered trail classification beyond flat category cards

**Trail Classes:**
- **Flagship Ecological Routes:** High-profile, well-managed trails with rich interpretation
- **Sensitive Routes:** Restricted access, high ecological sensitivity
- **Wetland Observation Routes:** Water-linked trails with aquatic focus
- **Seasonal Bloom/Migration Routes:** Time-limited access windows
- **Protected-Area Routes:** Permit-required, managed access
- **High-Altitude Expedition Routes:** Technical difficulty, risk factors

**Rationale:**
- Provides clearer user expectations
- Enables access control and sensitivity messaging
- Supports seasonal management
- Aligns with conservation objectives

---

## 3. Interfaces and API Contracts

### 3.1 Trail Intelligence Schema

```typescript
interface TrailIntelligence {
  // Core Identity
  id: string;
  slug: string;
  name: string;
  trailClass: 'flagship' | 'sensitive' | 'wetland' | 'seasonal' | 'protected-area' | 'high-altitude';
  category: TrailCategory;
  
  // Geographic Context
  district: KashmirDistrict[];
  habitat: HabitatType[];
  altitudeBand: { min: number; max: number; unit: 'meters' };
  coordinates: GeoJSON.LineString;
  
  // Temporal Logic
  seasonWindow: {
    optimal: string[]; // ['April', 'May', 'June']
    accessible: string[];
    closed: string[];
    reason?: string;
  };
  
  // Access & Sensitivity
  accessStatus: 'open' | 'restricted' | 'closed' | 'permit-required';
  sensitivity: 'low' | 'medium' | 'high' | 'critical';
  sensitivityNotes?: string;
  permissions?: {
    required: boolean;
    authority: string;
    process?: string;
  };
  
  // Ecological Linkages
  relatedSpecies: string[]; // Species slugs
  relatedProtectedArea?: string; // PA slug
  relatedBloom?: string; // Bloom event slug
  relatedMigration?: string; // Migration event slug
  relatedWetland?: string; // Wetland slug
  
  // Route Intelligence
  routeType: 'loop' | 'out-and-back' | 'point-to-point' | 'circuit';
  difficulty: 'easy' | 'moderate' | 'difficult' | 'technical';
  length: { value: number; unit: 'km' };
  duration: { min: number; max: number; unit: 'hours' };
  elevationGain: { value: number; unit: 'meters' };
  
  // Condition Signals
  routeCondition: {
    status: 'excellent' | 'good' | 'fair' | 'poor' | 'hazardous';
    lastUpdated: string;
    notes?: string;
    hazards?: string[];
  };
  
  // Observer Activity
  observerActivity: {
    totalObservers: number;
    activeThisMonth: number;
    totalSightings: number;
    verifiedSightings: number;
  };
  
  // Metadata
  description: string;
  features: string[];
  imageUrl?: string;
  lastVerified: string;
}

type TrailCategory = 
  | 'hiking'
  | 'eco'
  | 'birding'
  | 'wetland'
  | 'bloom'
  | 'forest-meadow'
  | 'glacier-high-altitude'
  | 'protected-area';

type KashmirDistrict = 
  | 'Srinagar' | 'Anantnag' | 'Kulgam' | 'Pulwama' | 'Shopian'
  | 'Budgam' | 'Baramulla' | 'Kupwara' | 'Ganderbal' | 'Bandipora'
  | 'Kishtwar' | 'Doda' | 'Ramban' | 'Rajouri' | 'Poonch' | 'Kathua';

type HabitatType = 
  | 'temperate-forest'
  | 'coniferous-forest'
  | 'alpine-meadow'
  | 'wetland'
  | 'riverine'
  | 'rocky-slope'
  | 'glacial'
  | 'high-altitude-desert';
```

### 3.2 Sighting Intelligence Schema

```typescript
interface SightingIntelligence {
  // Core Identity
  id: string;
  slug: string;
  speciesName: string;
  speciesSlug: string;
  taxonomicGroup: TaxonomicGroup;
  
  // Geographic Context
  district: KashmirDistrict;
  location: string;
  habitat: HabitatType;
  coordinates: GeoJSON.Point;
  altitude: { value: number; unit: 'meters' };
  
  // Temporal Data
  observationDate: string;
  season: Season;
  
  // Verification Workflow
  verificationStatus: 'verified' | 'reviewed' | 'community' | 'pending';
  verifiedBy?: string; // Expert/authority name
  verificationDate?: string;
  isSensitive: boolean;
  sensitivityReason?: string;
  
  // Observer Data
  observerType: 'expert' | 'field-team' | 'citizen-scientist';
  observerName?: string; // Anonymized if citizen
  observationMethod: 'visual' | 'camera-trap' | 'audio' | 'track' | 'scat' | 'other';
  
  // Ecological Context
  behaviorObserved?: string;
  groupSize?: number;
  habitatCondition?: string;
  associatedSpecies?: string[];
  
  // Linkages
  linkedTrail?: string; // Trail slug
  linkedProtectedArea?: string; // PA slug
  linkedEvent?: string; // Migration/bloom event
  
  // Media & Evidence
  hasPhoto: boolean;
  photoCount?: number;
  hasAudio: boolean;
  hasVideo: boolean;
  
  // Data Quality
  confidenceLevel: 'high' | 'medium' | 'low';
  notes?: string;
  
  // Kashmir-Only Enforcement
  isKashmirOnly: boolean; // Validation flag
}

type TaxonomicGroup = 'mammals' | 'birds' | 'fish' | 'plants' | 'medicinal-plants' | 'amphibians' | 'reptiles';
type Season = 'spring' | 'summer' | 'autumn' | 'winter';
```

### 3.3 Sighting Aggregation Schema

```typescript
interface SightingAggregation {
  categoryId: string;
  title: string;
  totalCount: number;
  
  // Verification Breakdown
  verifiedCount: number;
  reviewedCount: number;
  communityCount: number;
  pendingCount: number;
  
  // District Distribution
  byDistrict: Record<KashmirDistrict, number>;
  
  // Seasonal Concentration
  bySeason: Record<Season, number>;
  
  // Habitat Linkage
  byHabitat: Record<HabitatType, number>;
  
  // High-Value Records
  highValueRecords: Array<{
    species: string;
    location: string;
    district: KashmirDistrict;
    date: string;
    significance: string;
  }>;
  
  // Recent Verified (Kashmir-only)
  recentVerified: SightingIntelligence[];
}
```

### 3.4 Error Taxonomy

| Error Code | Status | Description | User Message |
|------------|--------|-------------|--------------|
| `TRAIL_NOT_FOUND` | 404 | Requested trail does not exist | "This trail could not be found" |
| `SIGHTING_NOT_FOUND` | 404 | Requested sighting does not exist | "This sighting could not be found" |
| `LOCATION_OUT_OF_SCOPE` | 400 | Location is outside Kashmir | "This location is outside the Kashmir region" |
| `ACCESS_RESTRICTED` | 403 | Trail/sighting has restricted access | "Access to this content requires permission" |
| `SENSITIVE_DATA_MASKED` | 200 | Sensitive data partially hidden | "Some location details are hidden to protect sensitive species" |
| `SEASONAL_CLOSURE` | 400 | Trail closed for season | "This trail is currently closed for the season" |
| `VERIFICATION_PENDING` | 200 | Sighting awaiting verification | "This sighting is pending expert verification" |

---

## 4. Non-Functional Requirements (NFRs) and Budgets

### 4.1 Performance

| Metric | Target | Measurement |
|--------|--------|-------------|
| Page Load Time (LCP) | < 2.5s | Lab + Field |
| Time to Interactive (TTI) | < 3.5s | Lab |
| First Input Delay (FID) | < 100ms | Field |
| Cumulative Layout Shift (CLS) | < 0.1 | Lab + Field |
| API Response Time (p95) | < 500ms | Backend |
| Map Render Time | < 1.5s | Lab |

### 4.2 Reliability

| Metric | Target | Notes |
|--------|--------|-------|
| Uptime SLA | 99.5% | Excluding planned maintenance |
| Error Rate | < 0.5% | 5xx errors / total requests |
| Data Freshness | < 24h | For time-sensitive data |
| Cache Hit Rate | > 80% | CDN + Edge caching |

### 4.3 Security

| Requirement | Implementation |
|-------------|----------------|
| Input Validation | Zod schemas for all user inputs |
| XSS Prevention | React escaping + CSP headers |
| CSRF Protection | Next.js built-in + custom tokens |
| Rate Limiting | API route protection |
| Sensitive Data Masking | Coordinate obfuscation for critical species |
| Geographic Validation | Kashmir-only enforcement at API layer |

### 4.4 Accessibility

| Standard | Target |
|----------|--------|
| WCAG Level | AA |
| Keyboard Navigation | Full support |
| Screen Reader | ARIA labels + semantic HTML |
| Color Contrast | 4.5:1 minimum |
| Focus Indicators | Visible focus rings |

### 4.5 Cost Considerations

| Resource | Unit Cost Target | Monthly Budget |
|----------|------------------|----------------|
| CDN Egress | $0.05/GB | $50 |
| API Calls | $0.01/1000 | $20 |
| Map Tiles | Included (self-hosted) | $0 |
| Image Storage | $0.02/GB | $10 |

---

## 5. Data Management and Migration

### 5.1 Source of Truth

| Data Type | Primary Source | Update Frequency |
|-----------|----------------|------------------|
| Trail Metadata | Trails Database | Weekly |
| Sighting Records | Observation Database | Real-time |
| District Boundaries | Government GIS | Static |
| Habitat Classifications | NWIA + Field Surveys | Quarterly |
| Seasonal Windows | Phenology Database | Seasonal |
| Route Conditions | Field Reports + User Submissions | Daily |
| Verification Status | Expert Review System | Real-time |

### 5.2 Data Validation Rules

```typescript
// Kashmir-Only Validation
function validateKashmirOnly(location: Location): boolean {
  const kashmirBounds = {
    north: 34.8,
    south: 32.5,
    east: 75.8,
    west: 73.5
  };
  return (
    location.lat >= kashmirBounds.south &&
    location.lat <= kashmirBounds.north &&
    location.lng >= kashmirBounds.west &&
    location.lng <= kashmirBounds.east
  );
}

// Sensitivity Masking
function maskSensitiveData(sighting: SightingIntelligence): SightingIntelligence {
  if (sighting.isSensitive) {
    return {
      ...sighting,
      coordinates: obfuscateCoordinates(sighting.coordinates),
      location: generalizeLocation(sighting.location)
    };
  }
  return sighting;
}
```

### 5.3 Data Retention

| Data Type | Retention Period | Archive Policy |
|-----------|------------------|----------------|
| Verified Sightings | Permanent | Archive after 5 years |
| Pending Sightings | 90 days | Delete if not verified |
| User Submissions | 2 years | Anonymize after 1 year |
| Route Conditions | 1 year | Rolling window |
| Observer Activity | 5 years | Aggregate after 1 year |

---

## 6. Operational Readiness

### 6.1 Observability

**Metrics to Track:**
- Page views per trail/sighting category
- Filter usage (district, habitat, season)
- Submission conversion rate
- Verification turnaround time
- Cross-module navigation clicks
- Map interaction events

**Logging Requirements:**
- All API requests with response times
- Verification workflow events
- User submissions (anonymized)
- Error events with stack traces

### 6.2 Alerting

| Alert | Threshold | On-Call |
|-------|-----------|---------|
| API Error Rate | > 1% for 5min | Backend Team |
| Page Load Time | p95 > 4s | Frontend Team |
| Submission Failures | > 10/hour | Platform Team |
| Data Validation Errors | > 50/hour | Data Team |

### 6.3 Runbooks

**Required Runbooks:**
1. Trail Data Update Procedure
2. Sighting Verification Workflow
3. Sensitive Data Handling
4. User Submission Moderation
5. Cross-Module Link Maintenance
6. Seasonal Window Updates

### 6.4 Deployment Strategy

| Environment | Purpose | Update Frequency |
|-------------|---------|------------------|
| Development | Feature development | Continuous |
| Staging | QA + UAT | Per release |
| Production | Live module | Bi-weekly |

**Rollback Plan:**
- Feature flags for major changes
- Instant rollback via Vercel deployments
- Data migration rollback scripts

---

## 7. Risk Analysis and Mitigation

### 7.1 Top Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| **Sensitive Species Exposure** | High | Medium | Coordinate obfuscation, expert review before publication |
| **Geographic Scope Creep** | Medium | High | Strict validation, clear messaging, moderation workflow |
| **Data Quality Issues** | Medium | Medium | Verification workflow, user reputation system |
| **Performance Degradation** | Medium | Low | Lazy loading, pagination, CDN caching |
| **Cross-Module Link Rot** | Low | Medium | Automated link checking, centralized reference system |

### 7.2 Blast Radius

- **Module-Specific Changes:** Limited to `/trails-sightings/*` routes
- **Data Model Changes:** May affect Biodiversity, Protected Areas modules
- **Cross-Module Links:** Bidirectional dependencies require coordination

### 7.3 Kill Switches

```typescript
// Feature Flag Example
const TRAILS_MODULE_FLAGS = {
  enableMapPreview: true,
  enableSeasonalWindows: true,
  enableCrossModuleLinks: true,
  enableUserSubmissions: true,
  enableVerifiedSightings: true,
};
```

---

## 8. Evaluation and Validation

### 8.1 Definition of Done

**Code Quality:**
- [ ] TypeScript strict mode compliance
- [ ] ESLint + Prettier passing
- [ ] No console errors in development
- [ ] All components have prop types

**Testing:**
- [ ] Unit tests for data validation functions
- [ ] Integration tests for cross-module links
- [ ] E2E tests for key user workflows
- [ ] Accessibility audit passing

**Documentation:**
- [ ] Component documentation
- [ ] API documentation
- [ ] User guide for submission workflow
- [ ] Admin guide for verification

**Performance:**
- [ ] Lighthouse score > 90
- [ ] All NFR budgets met
- [ ] No regression in Core Web Vitals

### 8.2 Output Validation

**Visual Design:**
- [ ] Consistent with Water Systems / Risk & Monitoring
- [ ] Premium, modern, compact aesthetic
- [ ] Responsive across all breakpoints
- [ ] Dark mode optimized

**Intelligence Depth:**
- [ ] All 8 intelligence bands implemented
- [ ] Trail cards show full metadata
- [ ] Sighting aggregations show analytical breakdowns
- [ ] Cross-module links functional and contextual

**Kashmir-Only Enforcement:**
- [ ] No Leh/Hemis in public views
- [ ] Geographic validation on submissions
- [ ] Clear scope messaging

---

## 9. Acceptance Criteria

### 9.1 Functional Acceptance

- [ ] Module repositioned as "Kashmir Ecological Access & Field Intelligence"
- [ ] 8 intelligence bands implemented with clear visual hierarchy
- [ ] Trail cards display: district, habitat, altitude, season window, access status, sensitivity, related species/PA
- [ ] Sighting categories show: verified vs community counts, district distribution, seasonal concentration
- [ ] Map preview shows trail networks + sighting hotspots with district boundaries
- [ ] Seasonal windows displayed with access condition logic
- [ ] Recent sightings filtered to Kashmir-only (no Leh/Hemis)
- [ ] Cross-module links to all 7 target modules functional
- [ ] Contribution workflow清晰 with verification pathway

### 9.2 Design Acceptance

- [ ] Premium, modern, compact design language
- [ ] Scientific aesthetic maintained
- [ ] Interactive elements clearly signposted
- [ ] Globally aligned with Kashmir EcoWatch design system
- [ ] Increased intelligence depth without visual clutter

### 9.3 Technical Acceptance

- [ ] TypeScript strict mode compliance
- [ ] All NFR budgets met
- [ ] Accessibility WCAG AA compliance
- [ ] No console errors
- [ ] Build passes without warnings

---

## 10. Appendix: Component Inventory

### 10.1 New Components Required

| Component | Purpose | Priority |
|-----------|---------|----------|
| `TrailIntelligenceCard` | Enhanced trail card with full metadata | P0 |
| `SightingAggregationPanel` | Analytical sighting breakdown | P0 |
| `MapPreviewSection` | Interactive map preview | P0 |
| `SeasonalWindowDisplay` | Season + access condition logic | P1 |
| `DistrictHabitatFilter` | Filter controls for trails/sightings | P1 |
| `CrossModuleLinkStrip` | Navigation to related modules | P1 |
| `VerificationStatusBadge` | Enhanced verification indicators | P2 |
| `SensitivityMask` | Sensitive data display component | P2 |

### 10.2 Existing Components to Reuse

| Component | Source Module | Adaptation Needed |
|-----------|---------------|-------------------|
| `Navigation` | Global | None |
| `AdvancedFooter` | Global | None |
| `Card` | UI Kit | None |
| `Badge` | UI Kit | None |
| `Button` | UI Kit | None |
| `MetricCard` | UI Kit | None |
| `MapPreviewSection` | Atlas | Minor styling |
| `DistrictIntelligenceStrip` | District Profiles | Minor adaptation |

---

## 11. Implementation Phases

### Phase 1: Foundation (P0)
- Data models and types
- Kashmir-only filtering logic
- Core page structure with 8 bands
- Trail intelligence cards
- Sighting aggregation panels

### Phase 2: Intelligence Layers (P1)
- Map preview integration
- Seasonal windows display
- District/habitat filters
- Cross-module linking

### Phase 3: Workflow Enhancement (P2)
- Verification workflow UI
- Sensitivity masking
- Enhanced contribution CTAs
- Analytics instrumentation

### Phase 4: Polish & Optimization (P3)
- Performance optimization
- Accessibility audit
- Visual polish
- Documentation

---

## References

- [Water Systems Module](../water-systems/spec.md) - Reference for data-rich module design
- [Risk & Monitoring Module](../risk-monitoring/) - Reference for multi-category architecture
- [Biodiversity Data Service](../../src/data/biodiversity.ts) - Species data integration
- [NWIA Classification](../../src/data/nwia-references.ts) - Wetland classification reference
