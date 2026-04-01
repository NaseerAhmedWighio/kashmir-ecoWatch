# Trails & Sightings Module Upgrade - Architecture Plan

## Overview

This document provides the detailed architectural plan for upgrading the Trails & Sightings module from a directory-style page to a fully developed **Kashmir ecological access, field observation, and citizen-science intelligence system**.

---

## 1. Architecture Decision Record

### Decision: Intelligence Band Architecture

**Status:** Approved

**Context:**
The current Trails & Sightings page uses a flat card-based directory structure that lacks the depth and integration of modules like Water Systems and Risk & Monitoring.

**Decision:**
Implement an 8-band architecture that provides progressive disclosure of complexity:

1. **Hero + Command Surface** - Repositioned messaging, key metrics, primary CTAs
2. **Trail Intelligence Overview** - Enhanced trail cards with full ecological metadata
3. **Sighting Intelligence Overview** - Analytical sighting breakdowns with verification states
4. **Map-Linked Ecological Access Preview** - Interactive map with trails, sightings, districts
5. **Seasonal Windows and Route Conditions** - Temporal access logic and condition signals
6. **Recent Verified Field Intelligence** - Kashmir-only filtered recent sightings
7. **Contribution and Verification Workflow** - Citizen science pathways
8. **Linked District / Habitat / Protected-Area Intelligence** - Cross-module navigation

**Consequences:**
- ✅ Clear visual hierarchy and information architecture
- ✅ Supports multiple user personas (casual visitor, researcher, field observer)
- ✅ Enables modular future enhancements
- ⚠️ Requires careful performance management (lazy loading essential)
- ⚠️ More complex state management for filters and cross-band interactions

---

## 2. Component Architecture

### 2.1 Page Structure

```
/trails-sightings/page.tsx (Hub Page)
├── Navigation (shared)
├── HeroSection (Band 1)
├── MetricsRibbon (Band 1)
├── TrailIntelligenceOverview (Band 2)
│   └── TrailIntelligenceCard[] (new component)
├── SightingIntelligenceOverview (Band 3)
│   └── SightingAggregationPanel[] (new component)
├── MapPreviewSection (Band 4)
│   └── MapIntelligenceCore (shared)
├── SeasonalWindowsSection (Band 5)
│   └── SeasonalWindowDisplay[] (new component)
├── RecentVerifiedSightings (Band 6)
│   └── SightingCard[] (enhanced)
├── ContributionWorkflow (Band 7)
│   └── CTA cards
├── CrossModuleLinkStrip (Band 8)
│   └── ModuleLinkCard[] (new component)
└── AdvancedFooter (shared)
```

### 2.2 Component Inventory

#### New Components

| Component | File | Purpose | Dependencies |
|-----------|------|---------|--------------|
| `TrailIntelligenceCard` | `@/components/trails/TrailIntelligenceCard.tsx` | Enhanced trail card with ecological metadata | Card, Badge, Button |
| `SightingAggregationPanel` | `@/components/sightings/SightingAggregationPanel.tsx` | Analytical sighting breakdown | Card, Badge, Progress |
| `SeasonalWindowDisplay` | `@/components/trails/SeasonalWindowDisplay.tsx` | Season + access condition logic | Badge, Tooltip |
| `CrossModuleLinkStrip` | `@/components/sections/CrossModuleLinkStrip.tsx` | Navigation to related modules | Card, Button |
| `DistrictHabitatFilter` | `@/components/filters/DistrictHabitatFilter.tsx` | Filter controls | Select, Badge |
| `VerificationStatusBadge` | `@/components/sightings/VerificationStatusBadge.tsx` | Enhanced verification indicators | Badge |
| `SensitivityMask` | `@/components/sightings/SensitivityMask.tsx` | Sensitive data display | Tooltip, Badge |

#### Enhanced Existing Components

| Component | File | Enhancement |
|-----------|------|-------------|
| `MapPreviewSection` | `@/components/sections/MapPreviewSection.tsx` | Add trail layers, sighting heatmaps |
| `SightingCard` | `@/components/sightings/SightingCard.tsx` | Add district, habitat, verification details |

---

## 3. Data Architecture

### 3.1 Data Models

See `spec.md` Section 3 for complete TypeScript interfaces:

- `TrailIntelligence` - Core trail data model
- `SightingIntelligence` - Core sighting data model
- `SightingAggregation` - Analytical aggregation model
- `TrailCategory`, `KashmirDistrict`, `HabitatType` - Type definitions

### 3.2 Data Sources

```typescript
// New data service to be created
src/data/trails-sightings.ts

Export structure:
- trailIntelligenceData: TrailIntelligence[]
- sightingIntelligenceData: SightingIntelligence[]
- sightingAggregations: SightingAggregation[]
- kashmirDistricts: KashmirDistrict[]
- habitatTypes: HabitatType[]
- seasonalWindows: SeasonalWindow[]
```

### 3.3 Kashmir-Only Filtering

```typescript
// Geographic validation utility
src/lib/geo/kashmir-validation.ts

Functions:
- validateKashmirOnly(location): boolean
- validateDistrict(district): district is KashmirDistrict
- maskSensitiveCoordinates(coords): ObfuscatedCoordinates
```

---

## 4. Integration Architecture

### 4.1 Cross-Module Links

**Outbound Links from Trails & Sightings:**

| Target Module | Link Type | Context |
|---------------|-----------|---------|
| Protected Areas | Trail → PA | Trails within protected areas |
| Biodiversity | Trail/Sighting → Species | Related species profiles |
| Water Systems | Trail → Wetland/Water Body | Wetland trails, aquatic sightings |
| Seasonal Ecology | Trail → Migration/Bloom | Seasonal windows, phenology |
| Risk & Monitoring | Trail → Risk Profile | High-altitude trail risks |
| District Profiles | Trail/Sighting → District | District-level intelligence |
| Atlas | Map → Full Map | Deep link to interactive map |

**Inbound Links to Trails & Sightings:**

| Source Module | Link Type | Context |
|---------------|-----------|---------|
| Protected Areas | PA → Trails | Trails within each PA |
| Biodiversity | Species → Sightings | Sighting records per species |
| Water Systems | Wetland → Birding Trails | Wetland-associated trails |
| District Profiles | District → Trails/Sightings | Local ecological access |

### 4.2 Link Implementation

```typescript
// Centralized link registry
src/lib/links/module-links.ts

interface ModuleLink {
  targetModule: string;
  label: string;
  getUrl: (context: any) => string;
  icon: LucideIcon;
  enabled: boolean;
}

// Usage in components
const links = getModuleLinks('trails-sightings', {
  district: 'Srinagar',
  species: 'hangul',
  protectedArea: 'dachigam'
});
```

---

## 5. State Management

### 5.1 Client-Side State

```typescript
// Filter state (URL-synced where possible)
interface TrailsSightingsFilters {
  // Trail filters
  trailCategories: TrailCategory[];
  districts: KashmirDistrict[];
  habitats: HabitatType[];
  trailClass: TrailClass[];
  accessStatus: AccessStatus[];
  difficulty: Difficulty[];
  
  // Sighting filters
  taxonomicGroups: TaxonomicGroup[];
  verificationStatus: VerificationStatus[];
  season: Season[];
  
  // Temporal filters
  seasonWindow: string[]; // Month names
  
  // Geographic
  selectedDistrict: KashmirDistrict | null;
  selectedHabitat: HabitatType | null;
  
  // Map state
  mapZoom: number;
  mapCenter: [number, number];
}
```

### 5.2 State Persistence

- **URL Query Params:** Filters (for shareability)
- **Session Storage:** Map state, expanded panels
- **Local Storage:** User preferences (default view, density)

---

## 6. Performance Strategy

### 6.1 Loading Strategy

| Component | Loading Strategy | Fallback |
|-----------|------------------|----------|
| Hero Section | Eager | None |
| Metrics Ribbon | Eager | Skeleton |
| Trail Intelligence | Lazy (below fold) | Skeleton cards |
| Sighting Intelligence | Lazy | Skeleton panels |
| Map Preview | Lazy (intersection observer) | Static image + "Load Map" button |
| Seasonal Windows | Lazy | Skeleton strips |
| Recent Sightings | Lazy (pagination) | Skeleton cards |
| Contribution CTA | Eager | None |
| Cross-Module Links | Lazy | Simplified list |

### 6.2 Data Fetching

```typescript
// React Query for server state
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
      refetchOnWindowFocus: false,
    },
  },
});

// Example query
const useTrails = (filters: TrailsFilters) => {
  return useQuery({
    queryKey: ['trails', filters],
    queryFn: () => fetchTrails(filters),
  });
};
```

### 6.3 Image Optimization

```typescript
// Next.js Image component with blur placeholder
<Image
  src={trail.imageUrl}
  alt={trail.name}
  fill
  className="object-cover"
  placeholder="blur"
  blurDataURL={generateBlurPlaceholder(trail.imageUrl)}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
/>
```

---

## 7. Security & Privacy

### 7.1 Sensitive Data Handling

```typescript
// Coordinate obfuscation for sensitive species
function obfuscateCoordinates(
  coords: [number, number],
  sensitivity: 'low' | 'medium' | 'high' | 'critical'
): [number, number] {
  const obfuscationRadius = {
    low: 0,      // Exact location
    medium: 100, // ~100m
    high: 1000,  // ~1km
    critical: 5000 // ~5km (district-level only)
  };
  
  const radius = obfuscationRadius[sensitivity];
  if (radius === 0) return coords;
  
  // Add random offset within radius
  return addRandomOffset(coords, radius);
}
```

### 7.2 User-Generated Content

| Risk | Mitigation |
|------|------------|
| Inappropriate submissions | Moderation queue, user reporting |
| Location privacy | Automatic coordinate obfuscation |
| Species harassment | Expert review before publication |
| Spam/bot submissions | Rate limiting, CAPTCHA |

---

## 8. Testing Strategy

### 8.1 Unit Tests

```typescript
// Example: Kashmir validation
describe('validateKashmirOnly', () => {
  it('should accept Srinagar coordinates', () => {
    expect(validateKashmirOnly({ lat: 34.0837, lng: 74.7973 })).toBe(true);
  });
  
  it('should reject Leh coordinates', () => {
    expect(validateKashmirOnly({ lat: 34.1526, lng: 77.5771 })).toBe(false);
  });
});

// Example: Coordinate obfuscation
describe('obfuscateCoordinates', () => {
  it('should not modify low-sensitivity coordinates', () => {
    const coords: [number, number] = [34.0837, 74.7973];
    expect(obfuscateCoordinates(coords, 'low')).toEqual(coords);
  });
  
  it('should obfuscate critical-sensitivity coordinates', () => {
    const coords: [number, number] = [34.0837, 74.7973];
    const obfuscated = obfuscateCoordinates(coords, 'critical');
    expect(obfuscated).not.toEqual(coords);
  });
});
```

### 8.2 Integration Tests

```typescript
// Example: Cross-module navigation
describe('Cross-Module Navigation', () => {
  it('should navigate from trail to protected area', async () => {
    render(<TrailIntelligenceCard trail={dachigamTrail} />);
    
    const paLink = screen.getByText('Dachigam National Park');
    fireEvent.click(paLink);
    
    expect(router.push).toHaveBeenCalledWith('/protected-areas/dachigam-national-park');
  });
});
```

### 8.3 E2E Tests

```typescript
// Example: Trail discovery workflow
describe('Trail Discovery Workflow', () => {
  it('should filter trails by district and show results', async () => {
    page.goto('/trails-sightings');
    
    await page.selectOption('[data-testid="district-filter"]', 'Srinagar');
    await page.selectOption('[data-testid="habitat-filter"]', 'temperate-forest');
    
    await expect(page.locator('[data-testid="trail-card"]')).toHaveCount(12);
    await expect(page.locator('[data-testid="trail-card"]').first())
      .toContainText('Dachigam Forest Trail');
  });
});
```

---

## 9. Deployment Plan

### 9.1 Phased Rollout

| Phase | Features | Target Date | Success Criteria |
|-------|----------|-------------|------------------|
| 1 | Data models, core page structure | Week 1 | Build passes, no TypeScript errors |
| 2 | Trail intelligence cards | Week 2 | All trail metadata displayed correctly |
| 3 | Sighting aggregation panels | Week 3 | Analytical breakdowns functional |
| 4 | Map preview integration | Week 4 | Map renders with trail/sighting layers |
| 5 | Seasonal windows + filters | Week 5 | Filter logic working, seasonal data displayed |
| 6 | Cross-module linking | Week 6 | All 7 module links functional |
| 7 | Polish + performance | Week 7 | Lighthouse > 90, all NFRs met |
| 8 | Production deployment | Week 8 | Zero critical bugs, user acceptance |

### 9.2 Feature Flags

```typescript
// Feature flag configuration
const TRAILS_MODULE_FLAGS = {
  // Core features (always on after deployment)
  enableTrailIntelligence: true,
  enableSightingIntelligence: true,
  
  // Map features (can be toggled for performance)
  enableMapPreview: true,
  enableSightingHeatmap: true,
  
  // Advanced features (gradual rollout)
  enableSeasonalWindows: true,
  enableCrossModuleLinks: true,
  enableVerifiedSightings: true,
  
  // Beta features (testing)
  enableRouteConditionReports: false,
  enableObserverLeaderboard: false,
};
```

---

## 10. Monitoring & Observability

### 10.1 Key Metrics

```typescript
// Analytics events to track
const ANALYTICS_EVENTS = {
  // Engagement
  TRAIL_CARD_CLICK: 'trail_card_click',
  SIGHTING_PANEL_EXPAND: 'sighting_panel_expand',
  MAP_INTERACTION: 'map_interaction',
  FILTER_APPLY: 'filter_apply',
  
  // Navigation
  CROSS_MODULE_NAVIGATION: 'cross_module_navigation',
  TRAIL_DETAIL_VIEW: 'trail_detail_view',
  SIGHTING_DETAIL_VIEW: 'sighting_detail_view',
  
  // Conversion
  SUBMIT_SIGHTING_CTA_CLICK: 'submit_sighting_cta_click',
  CITIZEN_SCIENCE_CTA_CLICK: 'citizen_science_cta_click',
  
  // Performance
  MAP_LOAD_TIME: 'map_load_time',
  FILTER_RESPONSE_TIME: 'filter_response_time',
};
```

### 10.2 Error Tracking

```typescript
// Error boundaries and reporting
class TrailsSightingsErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to error tracking service
    errorTracker.captureException(error, {
      extra: {
        component: errorInfo.componentStack,
        route: window.location.pathname,
      },
    });
  }
}
```

---

## 11. Risks & Mitigations

### 11.1 Technical Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Map performance degradation | High | Medium | Lazy loading, static fallback, tile caching |
| Data model complexity | Medium | Medium | Incremental implementation, thorough testing |
| Cross-module link rot | Low | Medium | Centralized link registry, automated checks |
| Filter state management | Medium | Low | URL-synced state, clear reset mechanisms |

### 11.2 Content Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Incomplete trail metadata | High | High | Progressive enhancement, "Add Info" CTAs |
| Non-Kashmir sightings in public view | High | Medium | Strict validation, moderation workflow |
| Sensitive species exposure | Critical | Low | Expert review, coordinate obfuscation |
| Outdated seasonal windows | Medium | Medium | Seasonal update reminders, automated alerts |

---

## 12. Success Metrics

### 12.1 Quantitative Metrics

| Metric | Baseline | Target | Measurement |
|--------|----------|--------|-------------|
| Page Views | Current | +50% | Analytics |
| Time on Page | Current | +40% | Analytics |
| Trail Card CTR | N/A | >15% | Event tracking |
| Sighting Panel Expansion | N/A | >20% | Event tracking |
| Cross-Module Navigation | N/A | >10% of users | Funnel analysis |
| Submission Conversion | Current | +30% | A/B test |
| Lighthouse Score | Current | >90 | Lighthouse CI |

### 12.2 Qualitative Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| User Satisfaction | >4.5/5 | Post-visit survey |
| Perceived Intelligence Depth | "Much deeper" | User interviews |
| Design Quality | "Premium, scientific" | Design review |
| Cross-Module Cohesion | "Seamless" | UX audit |

---

## 13. Open Questions

### 13.1 Data Availability

- [ ] Do we have existing trail metadata in a database, or should we seed with mock data?
- [ ] What is the source of truth for sighting records?
- [ ] Are seasonal windows manually curated or algorithmically determined?

### 13.2 Workflow Integration

- [ ] How does the verification workflow integrate with existing user management?
- [ ] Who are the designated experts for species verification?
- [ ] What is the SLA for verification turnaround?

### 13.3 Geographic Scope

- [ ] Should we show a clear boundary map of "Kashmir region" for user reference?
- [ ] How do we handle border-disputed areas?
- [ ] Should Leh/Ladakh have a separate module or be hidden entirely?

---

## 14. Next Steps

1. **Review and approve this architecture plan**
2. **Create data service file** (`src/data/trails-sightings.ts`) with seed data
3. **Implement core TypeScript interfaces** (types file)
4. **Build new components** (TrailIntelligenceCard, SightingAggregationPanel, etc.)
5. **Refactor main page** with 8-band structure
6. **Implement Kashmir-only filtering**
7. **Add cross-module links**
8. **Test and iterate**

---

## References

- [Specification Document](./spec.md) - Complete requirements and acceptance criteria
- [Water Systems Architecture](../water-systems/plan.md) - Reference implementation
- [Biodiversity Data Model](../../src/data/biodiversity.ts) - Species data patterns
- [Constitution](../../.specify/memory/constitution.md) - Project principles
