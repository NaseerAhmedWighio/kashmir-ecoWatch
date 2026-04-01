# Biodiversity Intelligence System - Implementation Tasks

## Task Breakdown Structure

This document breaks down the Biodiversity Intelligence System implementation into small, testable tasks with clear acceptance criteria.

---

## Phase 1: Data Model Expansion (Week 1)

### Task 1.1: Create Biodiversity Type Definitions
**File:** `src/types/biodiversity.ts`

**Description:** Create comprehensive TypeScript type definitions for all biodiversity intelligence features.

**Acceptance Criteria:**
- [ ] All types from architecture plan are defined
- [ ] TypeScript compilation passes without errors
- [ ] Types are exported and importable
- [ ] JSDoc comments for complex types

**Test Cases:**
```typescript
// Type checking tests
- EndemismStatus type accepts valid values
- DataSource interface requires type field
- MigrationWindow requires season and migrationType
- HabitatPressureIndex drivers sum to overallScore
```

**Dependencies:** None

---

### Task 1.2: Enhance Species Data Model
**File:** `src/data/biodiversity.ts`

**Description:** Add new fields to existing species data: `endemismStatus`, `dataSource`, `distributionPoints`, `migrationWindow`, `pressureIndex`, `conservationPriority`.

**Acceptance Criteria:**
- [ ] All mammal species (67) updated with new fields
- [ ] All bird species (312) updated with new fields
- [ ] All fish species (23) updated with new fields
- [ ] All plant species (1,834) updated with new fields
- [ ] All medicinal plants (127) updated with new fields
- [ ] Default values provided for optional fields
- [ ] No breaking changes to existing code

**Test Cases:**
```typescript
// Data validation tests
- Every species has endemismStatus defined
- Every species has dataSource.type defined
- Species with migration have migrationWindow defined
- Distribution points have valid district references
- Elevation ranges are within Kashmir bounds (300-6000m)
```

**Dependencies:** Task 1.1

---

### Task 1.3: Create Data Access Layer
**File:** `src/data/biodiversity-access.ts`

**Description:** Implement centralized data access functions for endemic species, habitat intelligence, district intelligence, migration, distribution, and source verification.

**Acceptance Criteria:**
- [ ] `getEndemicSpecies()` function works with/without filter
- [ ] `getKashmirPrioritySpecies()` returns priority species
- [ ] `getHabitatSpeciesList()` returns species for habitat
- [ ] `getDistrictSpeciesList()` returns species for district
- [ ] `getMigratorySpecies()` filters by season
- [ ] `getMigrationCalendar()` returns 12-month data
- [ ] `getSpeciesDistribution()` returns distribution points
- [ ] `getSpeciesBySourceType()` filters correctly
- [ ] All functions have TypeScript types

**Test Cases:**
```typescript
// Function tests
- getEndemicSpecies() returns non-empty array
- getEndemicSpecies('kashmir-endemic') filters correctly
- getHabitatSpeciesList('forest-biodiversity') returns species
- getMigratorySpecies('winter') returns winter visitors
- getMigrationCalendar() returns 12 months
- getSpeciesDistribution('hangul') returns valid points
```

**Dependencies:** Tasks 1.1, 1.2

---

### Task 1.4: Complete District Biodiversity Data
**File:** `src/data/biodiversity-intelligence.ts`

**Description:** Add biodiversity data for all 11 missing districts (currently 5/16 complete).

**Districts to Complete:**
- Kulgam, Pulwama, Shopian, Budgam, Baramulla
- Bandipora, Doda, Ramban, Rajouri, Poonch, Kathua

**Acceptance Criteria:**
- [ ] All 16 districts have complete data
- [ ] Each district has: totalSpecies, mammals, birds, fish, plants, medicinalPlants
- [ ] Each district has: threatenedSpecies, endemicSpecies, migratorySpecies counts
- [ ] Each district has: primaryHabitats array
- [ ] Each district has: protectedAreaCoverage in km²
- [ ] Each district has: biodiversityHotspots list
- [ ] Each district has: habitatLossRisk level
- [ ] Each district has: humanWildlifeConflict level
- [ ] Each district has: speciesList, endemicSpeciesList, threatenedSpeciesList
- [ ] Each district has: relatedProtectedAreas, relatedTrails

**Test Cases:**
```typescript
// Data completeness tests
- All 16 districts exist in districtBiodiversity array
- Every district has totalSpecies > 0
- Every district has at least one primaryHabitat
- District species lists reference valid species slugs
- Protected area references are valid
```

**Dependencies:** Task 1.2

---

## Phase 2: Habitat Intelligence (Week 2)

### Task 2.1: Create Habitat Detail Page
**File:** `src/app/biodiversity/habitat/[slug]/page.tsx`

**Description:** Create dynamic route page for habitat detail views.

**Acceptance Criteria:**
- [ ] Page renders for all 5 habitats
- [ ] Habitat overview section with area, districts, description
- [ ] Species list section with filtering
- [ ] Pressure index section with gauge visualization
- [ ] Vulnerability trend section with chart
- [ ] Risk drivers section with correlated species
- [ ] Flagship species showcase
- [ ] Related protected areas section
- [ ] Cross-module links (trails, water systems)
- [ ] Breadcrumb navigation
- [ ] SEO metadata (title, description, OG tags)

**Test Cases:**
```typescript
// Page tests
- /biodiversity/habitat/forest-biodiversity renders
- /biodiversity/habitat/wetland-biodiversity renders
- Habitat not found shows 404
- Species list filters work
- Pressure index displays correctly
```

**Dependencies:** Tasks 1.1, 1.3, 2.2

---

### Task 2.2: Create HabitatDetailPanel Component
**File:** `src/components/biodiversity/intelligence/HabitatDetailPanel.tsx`

**Description:** Reusable component for displaying habitat intelligence details.

**Acceptance Criteria:**
- [ ] Accepts `HabitatBiodiversity` prop
- [ ] Displays habitat metrics (area, species count, etc.)
- [ ] Shows taxonomic breakdown
- [ ] Lists districts with habitat presence
- [ ] Displays pressure index
- [ ] Shows vulnerability trend chart
- [ ] Lists risk drivers
- [ ] Shows flagship species carousel
- [ ] Links to related protected areas
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Accessible (ARIA labels, keyboard navigation)

**Test Cases:**
```typescript
// Component tests
- Renders with valid habitat data
- Pressure gauge shows correct score
- Vulnerability trend chart renders
- Species list is filterable
- Links navigate correctly
```

**Dependencies:** Tasks 1.1, 1.3

---

### Task 2.3: Create PressureIndexGauge Component
**File:** `src/components/biodiversity/intelligence/PressureIndexGauge.tsx`

**Description:** Circular gauge component for displaying habitat pressure score.

**Acceptance Criteria:**
- [ ] Displays score 0-100 on circular gauge
- [ ] Color-coded: green (0-25), yellow (26-50), orange (51-75), red (76-100)
- [ ] Shows trend indicator (up/down/stable arrow)
- [ ] Displays driver breakdown on hover
- [ ] Animated gauge fill
- [ ] Accessible (screen reader description)
- [ ] Responsive sizing

**Test Cases:**
```typescript
// Component tests
- Gauge renders with score 0
- Gauge renders with score 100
- Colors change based on score
- Trend arrow shows correct direction
- Tooltip displays driver details
```

**Dependencies:** Task 1.1

---

### Task 2.4: Create VulnerabilityTrendChart Component
**File:** `src/components/biodiversity/intelligence/VulnerabilityTrendChart.tsx`

**Description:** Line chart showing habitat vulnerability over time.

**Acceptance Criteria:**
- [ ] Displays vulnerability score by year
- [ ] Line chart with smooth curve
- [ ] X-axis: years (e.g., 2018-2024)
- [ ] Y-axis: vulnerability score (0-100)
- [ ] Data points with tooltips
- [ ] Trend line annotation
- [ ] Color matches pressure index
- [ ] Responsive chart (recharts library)

**Test Cases:**
```typescript
// Component tests
- Chart renders with 5+ data points
- Tooltip shows year and score
- Trend line is visible
- Chart resizes responsively
```

**Dependencies:** Task 1.1

---

### Task 2.5: Enhance Habitat Intelligence Card
**File:** `src/components/biodiversity/HabitatIntelligenceCard.tsx`

**Description:** Add link to habitat detail page and enhance with pressure index preview.

**Acceptance Criteria:**
- [ ] Card is clickable, navigates to `/biodiversity/habitat/[slug]`
- [ ] Shows pressure index preview (mini gauge or score)
- [ ] Shows vulnerability trend preview (sparkline)
- [ ] Maintains existing metrics display
- [ ] Hover effect indicates clickability
- [ ] Accessible link (proper ARIA)

**Test Cases:**
```typescript
// Component tests
- Card click navigates to detail page
- Pressure index displays
- Trend sparkline renders
- Card is keyboard navigable
```

**Dependencies:** Tasks 2.2, 2.3

---

## Phase 3: District Intelligence (Week 3)

### Task 3.1: Create District Detail Page
**File:** `src/app/biodiversity/district/[slug]/page.tsx`

**Description:** Create dynamic route page for district biodiversity detail views.

**Acceptance Criteria:**
- [ ] Page renders for all 16 districts
- [ ] District overview with key metrics
- [ ] Species richness breakdown (by taxon)
- [ ] Endemic species list section
- [ ] Threatened species list section
- [ ] Habitat breakdown pie chart
- [ ] Protected area coverage map
- [ ] Human-wildlife conflict index
- [ ] Biodiversity hotspots list
- [ ] Related trails and protected areas
- [ ] Breadcrumb navigation
- [ ] SEO metadata

**Test Cases:**
```typescript
// Page tests
- /biodiversity/district/srinagar renders
- /biodiversity/district/kishtwar renders
- District not found shows 404
- All sections display correctly
- Charts render without errors
```

**Dependencies:** Tasks 1.1, 1.3, 1.4

---

### Task 3.2: Create DistrictDetailPanel Component
**File:** `src/components/biodiversity/intelligence/DistrictDetailPanel.tsx`

**Description:** Reusable component for displaying district biodiversity intelligence.

**Acceptance Criteria:**
- [ ] Accepts `DistrictBiodiversity` prop
- [ ] Displays district metrics grid
- [ ] Shows taxonomic breakdown bar chart
- [ ] Lists endemic species with cards
- [ ] Lists threatened species with cards
- [ ] Displays habitat pie chart
- [ ] Shows protected area coverage
- [ ] Displays HWC conflict index badge
- [ ] Lists biodiversity hotspots
- [ ] Links to related areas and trails
- [ ] Responsive and accessible

**Test Cases:**
```typescript
// Component tests
- Renders with valid district data
- Pie chart shows habitat breakdown
- Species lists are paginated
- Links navigate correctly
- Mobile layout works
```

**Dependencies:** Tasks 1.1, 1.3, 1.4

---

### Task 3.3: Create DistrictBiodiversityCard Component
**File:** `src/components/biodiversity/intelligence/DistrictBiodiversityCard.tsx`

**Description:** Summary card for district biodiversity (for hub page).

**Acceptance Criteria:**
- [ ] Displays district name
- [ ] Shows total species count
- [ ] Shows threatened species count
- [ ] Shows endemic species count
- [ ] Shows primary habitats (icons)
- [ ] Shows HWC conflict level badge
- [ ] Clickable, links to district page
- [ ] Hover effect
- [ ] Responsive grid layout

**Test Cases:**
```typescript
// Component tests
- Card renders with district data
- Counts display correctly
- Link navigates to detail page
- Card is keyboard navigable
```

**Dependencies:** Task 3.2

---

## Phase 4: Endemic Species Intelligence (Week 4)

### Task 4.1: Create Endemic Species Registry Page
**File:** `src/app/biodiversity/endemic-species/page.tsx`

**Description:** Browse and filter endemic species of Kashmir.

**Acceptance Criteria:**
- [ ] Page title: "Endemic Species of Kashmir"
- [ ] Introduction explaining endemism
- [ ] Filter by endemism level (Kashmir, Himalayan, NW Himalayan, Trans-Himalayan)
- [ ] Filter by taxonomic group
- [ ] Filter by conservation status
- [ ] Grid of endemic species cards
- [ ] Endemism map visualization
- [ ] Conservation priority sorting
- [ ] Export/download option (PDF/CSV)
- [ ] Breadcrumb navigation
- [ ] SEO metadata

**Test Cases:**
```typescript
// Page tests
- Page renders with endemic species
- Filters work correctly
- Map visualization displays
- Species cards link to detail pages
- Export generates file
```

**Dependencies:** Tasks 1.1, 1.2, 1.3

---

### Task 4.2: Create EndemicSpeciesRegistry Component
**File:** `src/components/biodiversity/intelligence/EndemicSpeciesRegistry.tsx`

**Description:** Main component for browsing endemic species.

**Acceptance Criteria:**
- [ ] Accepts optional `endemismLevel` prop
- [ ] Displays filter controls
- [ ] Shows species grid with pagination
- [ ] Displays endemism map (Kashmir region)
- [ ] Shows taxonomic breakdown
- [ ] Sortable by name, priority, status
- [ ] Search functionality
- [ ] Responsive grid (3 cols desktop, 2 tablet, 1 mobile)

**Test Cases:**
```typescript
// Component tests
- Registry renders with all endemic species
- Filter by endemism level works
- Pagination works
- Search filters correctly
- Map highlights districts
```

**Dependencies:** Tasks 1.1, 1.3

---

### Task 4.3: Create EndemicSpeciesCard Component
**File:** `src/components/biodiversity/intelligence/EndemicSpeciesCard.tsx`

**Description:** Species card with endemism information.

**Acceptance Criteria:**
- [ ] Displays species image
- [ ] Shows common and scientific name
- [ ] Shows endemism badge (color-coded)
- [ ] Shows conservation status badge
- [ ] Shows conservation priority (1-10)
- [ ] Shows endemic districts
- [ ] Link to species detail page
- [ ] Hover effect
- [ ] Accessible

**Test Cases:**
```typescript
// Component tests
- Card renders with species data
- Endemism badge shows correct level
- Priority displays correctly
- Link navigates to detail page
```

**Dependencies:** Tasks 1.1, 1.2

---

### Task 4.4: Add Endemism Filter to BiodiversityFilters
**File:** `src/components/common/BiodiversityFilters.tsx`

**Description:** Enhance existing filter component with endemism filter.

**Acceptance Criteria:**
- [ ] New filter section: "Endemism Status"
- [ ] Options: All, Kashmir Endemic, Himalayan Endemic, NW Himalayan, Trans-Himalayan
- [ ] Multi-select capability
- [ ] Filter state persists
- [ ] Clear all filters button
- [ ] Mobile-friendly accordion

**Test Cases:**
```typescript
// Component tests
- Endemism filter renders
- Selecting filter updates results
- Multiple filters can be selected
- Clear all resets filters
```

**Dependencies:** Task 1.1

---

## Phase 5: Migration Intelligence (Week 5)

### Task 5.1: Create Migration Calendar Page
**File:** `src/app/biodiversity/migration-calendar/page.tsx`

**Description:** Visualize seasonal migration patterns.

**Acceptance Criteria:**
- [ ] 12-month calendar view
- [ ] Species presence indicators per month
- [ ] Color coding by migration type (breeder, winter visitor, summer visitor, passage migrant)
- [ ] Flyway filter (Central Asian, East Asian, West Asian)
- [ ] Taxon filter
- [ ] Species count per month
- [ ] Peak migration highlights
- [ ] Concentration heat map
- [ ] Species detail links
- [ ] SEO metadata

**Test Cases:**
```typescript
// Page tests
- Calendar renders all 12 months
- Species indicators display
- Filter by migration type works
- Filter by flyway works
- Heat map shows concentration
```

**Dependencies:** Tasks 1.1, 1.2, 1.3

---

### Task 5.2: Create MigrationCalendar Component
**File:** `src/components/biodiversity/intelligence/MigrationCalendar.tsx`

**Description:** Calendar visualization for migration patterns.

**Acceptance Criteria:**
- [ ] Displays 12 months in grid (3x4 or 4x3)
- [ ] Each month shows species count
- [ ] Each month has species indicators (dots/badges)
- [ ] Color coding by migration type
- [ ] Hover tooltip shows species list
- [ ] Click month to filter
- [ ] Flyway legend
- [ ] Responsive layout
- [ ] Accessible (table structure)

**Test Cases:**
```typescript
// Component tests
- Calendar renders 12 months
- Species counts are correct
- Tooltips show species names
- Month click filters view
- Colors match migration types
```

**Dependencies:** Tasks 1.1, 1.3

---

### Task 5.3: Create MigrationSpeciesCard Component
**File:** `src/components/biodiversity/intelligence/MigrationSpeciesCard.tsx`

**Description:** Species card with migration information.

**Acceptance Criteria:**
- [ ] Displays species image
- [ ] Shows common and scientific name
- [ ] Shows migration type badge
- [ ] Shows flyway badge
- [ ] Shows season window (arrival-departure)
- [ ] Shows peak presence months
- [ ] Shows concentration level
- [ ] Link to species detail
- [ ] Accessible

**Test Cases:**
```typescript
// Component tests
- Card renders with migration data
- Migration window displays correctly
- Flyway badge shows correct value
- Link navigates to detail page
```

**Dependencies:** Tasks 1.1, 1.2

---

### Task 5.4: Add Migration Filter to BiodiversityFilters
**File:** `src/components/common/BiodiversityFilters.tsx`

**Description:** Add migration-related filters.

**Acceptance Criteria:**
- [ ] Filter: Migration Type (breeder, winter visitor, summer visitor, passage migrant)
- [ ] Filter: Flyway (Central Asian, East Asian, West Asian)
- [ ] Filter: Season (spring, summer, autumn, winter)
- [ ] Filter: Concentration (low, medium, high, very high)
- [ ] Multi-select capability
- [ ] Filter state persists

**Test Cases:**
```typescript
// Component tests
- Migration filters render
- Selecting filter updates results
- Multiple filters work together
```

**Dependencies:** Task 1.1

---

## Phase 6: Distribution & Mapping (Week 6)

### Task 6.1: Create DistributionMap Component
**File:** `src/components/biodiversity/intelligence/DistributionMap.tsx`

**Description:** Interactive map showing species distribution points.

**Acceptance Criteria:**
- [ ] Uses Leaflet or Mapbox GL
- [ ] Displays Kashmir region map
- [ ] Shows district boundaries
- [ ] Plots distribution points as markers
- [ ] Marker color by occurrence type (confirmed, probable, possible)
- [ ] Marker size by elevation
- [ ] Popup on marker click (location details)
- [ ] Layer control (districts, habitats, protected areas)
- [ ] Zoom and pan controls
- [ ] Responsive container
- [ ] Accessible (keyboard pan/zoom)

**Test Cases:**
```typescript
// Component tests
- Map renders with Kashmir region
- Distribution points display as markers
- Marker colors match occurrence types
- Popup shows location details
- Layers toggle correctly
```

**Dependencies:** Tasks 1.1, 1.2

---

### Task 6.2: Create SpeciesDensityHeatmap Component
**File:** `src/components/biodiversity/intelligence/SpeciesDensityHeatmap.tsx`

**Description:** Heatmap visualization of species density by district/habitat.

**Acceptance Criteria:**
- [ ] Displays Kashmir map
- [ ] Heat overlay shows species density
- [ ] Color gradient: green (low) to red (high)
- [ ] Toggle between district/habitat view
- [ ] Legend with density ranges
- [ ] Tooltip on hover (district name, count)
- [ ] Responsive
- [ ] Accessible alternative (data table)

**Test Cases:**
```typescript
// Component tests
- Heatmap renders over Kashmir
- Colors match density values
- Toggle switches views
- Tooltip shows correct data
- Data table alternative works
```

**Dependencies:** Tasks 1.1, 1.3

---

### Task 6.3: Add Distribution Tab to Species Detail Page
**File:** `src/app/biodiversity/species/[slug]/page.tsx`

**Description:** Enhance species detail page with distribution visualization.

**Acceptance Criteria:**
- [ ] New tab: "Distribution" (or enhance existing)
- [ ] Shows DistributionMap component
- [ ] Shows elevation range
- [ ] Shows district list with occurrence type
- [ ] Shows habitat associations
- [ ] Shows protected area occurrences
- [ ] Seasonal distribution toggle (if data available)
- [ ] Download distribution data (GeoJSON)

**Test Cases:**
```typescript
// Page tests
- Distribution tab renders
- Map shows correct points
- District list is accurate
- Elevation range displays
- Download generates GeoJSON
```

**Dependencies:** Tasks 6.1, 1.2

---

## Phase 7: Source Verification (Week 7)

### Task 7.1: Create SourceVerificationBadge Component
**File:** `src/components/biodiversity/intelligence/SourceVerificationBadge.tsx`

**Description:** Display data source and verification status.

**Acceptance Criteria:**
- [ ] Shows source type icon (inventory, monitoring, sighting, legacy)
- [ ] Shows verification status (verified, reviewed, community, pending)
- [ ] Shows quality flag badge (high, medium, low, unverified)
- [ ] Tooltip with citation/reference
- [ ] Shows year if available
- [ ] Shows verifier name if available
- [ ] Color-coded quality flag
- [ ] Accessible

**Test Cases:**
```typescript
// Component tests
- Badge renders with all source types
- Icons match source types
- Quality flag colors are correct
- Tooltip shows citation
```

**Dependencies:** Task 1.1

---

### Task 7.2: Create DataQualityIndicator Component
**File:** `src/components/biodiversity/intelligence/DataQualityIndicator.tsx`

**Description:** Overall data quality summary for species/habitat.

**Acceptance Criteria:**
- [ ] Shows overall quality score (0-100)
- [ ] Shows confidence level
- [ ] Lists data sources contributing
- [ ] Shows verification status summary
- [ ] Shows last update date
- [ ] Color-coded (green/yellow/red)
- [ ] Tooltip with breakdown

**Test Cases:**
```typescript
// Component tests
- Indicator renders with score
- Colors match quality level
- Sources list is accurate
- Date displays correctly
```

**Dependencies:** Task 1.1

---

### Task 7.3: Add Source Type Filter
**File:** `src/components/common/BiodiversityFilters.tsx`

**Description:** Add source type and quality flag filters.

**Acceptance Criteria:**
- [ ] Filter: Source Type (inventory, monitoring, sighting, legacy)
- [ ] Filter: Quality Flag (high, medium, low, unverified)
- [ ] Filter: Verification Status (verified, reviewed, community, pending)
- [ ] Multi-select capability
- [ ] Filter state persists

**Test Cases:**
```typescript
// Component tests
- Source filters render
- Selecting filter updates results
- Filters work with other filters
```

**Dependencies:** Task 1.1

---

### Task 7.4: Update Species Data with Source Metadata
**File:** `src/data/biodiversity.ts`

**Description:** Populate `dataSource` field for all species.

**Acceptance Criteria:**
- [ ] All Red Data Book species have source metadata
- [ ] All species with sightings have `type: 'sighting'`
- [ ] All species from surveys have `type: 'inventory'`
- [ ] All monitored species have `type: 'monitoring'`
- [ ] Legacy data marked appropriately
- [ ] Quality flags assigned based on source
- [ ] References/citations added

**Test Cases:**
```typescript
// Data tests
- All species have dataSource.type
- Red Data Book species have references
- Sighting species have verifiedBy
- Quality flags are assigned
```

**Dependencies:** Task 1.2

---

## Phase 8: Risk & Monitoring Dashboard (Week 8)

### Task 8.1: Create Risk Dashboard Page
**File:** `src/app/biodiversity/risk-dashboard/page.tsx`

**Description:** Comprehensive biodiversity risk analytics dashboard.

**Acceptance Criteria:**
- [ ] Overall risk score display
- [ ] Risk by taxon chart (bar)
- [ ] Risk by habitat map (choropleth)
- [ ] Risk by district map (choropleth)
- [ ] Top threats list with severity
- [ ] Temporal trend graph (line)
- [ ] Priority actions list
- [ ] Conservation hotspots
- [ ] Export dashboard (PDF)
- [ ] Auto-refresh option
- [ ] SEO metadata

**Test Cases:**
```typescript
// Page tests
- Dashboard renders all sections
- Risk scores calculate correctly
- Charts display data
- Maps show risk distribution
- Export generates PDF
```

**Dependencies:** Tasks 1.1, 1.3

---

### Task 8.2: Create RiskDashboard Component
**File:** `src/components/biodiversity/intelligence/RiskDashboard.tsx`

**Description:** Main dashboard component for risk analytics.

**Acceptance Criteria:**
- [ ] Accepts `RiskDashboardData` prop
- [ ] Displays overall risk score gauge
- [ ] Shows risk by taxon bar chart
- [ ] Shows risk by habitat heatmap
- [ ] Shows risk by district map
- [ ] Lists top threats with severity badges
- [ ] Shows temporal trend line chart
- [ ] Lists priority actions
- [ ] Responsive grid layout
- [ ] Refresh button
- [ ] Export button

**Test Cases:**
```typescript
// Component tests
- Dashboard renders with data
- Gauges show correct scores
- Charts render correctly
- Maps display risk levels
- Export works
```

**Dependencies:** Tasks 1.1, 1.3

---

### Task 8.3: Create ThreatSeverityChart Component
**File:** `src/components/biodiversity/intelligence/ThreatSeverityChart.tsx`

**Description:** Bar chart showing threat severity analysis.

**Acceptance Criteria:**
- [ ] Horizontal bar chart
- [ ] Threats sorted by affected species count
- [ ] Color by severity (green, yellow, orange, red)
- [ ] X-axis: number of species
- [ ] Y-axis: threat names
- [ ] Tooltip with details
- [ ] Click to filter species
- [ ] Responsive

**Test Cases:**
```typescript
// Component tests
- Chart renders with threats
- Bars sorted by count
- Colors match severity
- Tooltip shows details
- Click filters view
```

**Dependencies:** Tasks 1.1, 1.3

---

### Task 8.4: Create MonitoringProtocolCard Component
**File:** `src/components/biodiversity/intelligence/MonitoringProtocolCard.tsx`

**Description:** Display monitoring protocol for species.

**Acceptance Criteria:**
- [ ] Shows protocol name
- [ ] Shows frequency badge
- [ ] Shows responsible agency
- [ ] Lists indicators
- [ ] Shows last assessment date
- [ ] Shows next assessment date
- [ ] Status indicator (on-time, overdue, upcoming)
- [ ] Link to protocol details
- [ ] Accessible

**Test Cases:**
```typescript
// Component tests
- Card renders with protocol data
- Frequency badge displays
- Dates format correctly
- Status indicator is accurate
```

**Dependencies:** Task 1.1

---

### Task 8.5: Enhance ConservationAnalyticsPanel
**File:** `src/components/biodiversity/ConservationAnalyticsPanel.tsx`

**Description:** Add risk trends and monitoring data.

**Acceptance Criteria:**
- [ ] Add temporal risk trend section
- [ ] Add monitoring protocols list
- [ ] Add threat severity breakdown
- [ ] Add conservation action tracking
- [ ] Update with new data access functions
- [ ] Maintain existing functionality

**Test Cases:**
```typescript
// Component tests
- Panel renders with enhanced data
- Trends display correctly
- Protocols list is accurate
```

**Dependencies:** Tasks 1.3, 8.2

---

## Phase 9: Integration & Polish (Week 9)

### Task 9.1: Update Biodiversity Hub Page
**File:** `src/app/biodiversity/page.tsx`

**Description:** Add new intelligence bands to main hub.

**Acceptance Criteria:**
- [ ] Add District Intelligence band (16 cards)
- [ ] Add Endemic Species band (featured endemic species)
- [ ] Add Migration Intelligence band (calendar preview)
- [ ] Add Risk Dashboard band (risk summary)
- [ ] Enhance Habitat Intelligence band (links to detail pages)
- [ ] Update metrics with new counts
- [ ] Improve navigation structure
- [ ] Add search functionality
- [ ] Responsive layout
- [ ] Performance optimized

**Test Cases:**
```typescript
// Page tests
- Hub page renders all bands
- Cards link to correct pages
- Metrics are accurate
- Search works
- Page loads < 2s
```

**Dependencies:** All previous tasks

---

### Task 9.2: Enhance Taxon Category Pages
**File:** `src/app/biodiversity/[taxon]/page.tsx`

**Description:** Add new filters and intelligence to category pages.

**Acceptance Criteria:**
- [ ] Add endemism filter
- [ ] Add migration filter
- [ ] Add source type filter
- [ ] Add quality flag filter
- [ ] Show endemism breakdown for taxon
- [ ] Show migration breakdown for taxon
- [ ] Show distribution map for taxon
- [ ] Update species cards with new badges
- [ ] Maintain existing functionality

**Test Cases:**
```typescript
// Page tests
- Category page renders
- New filters work
- Breakdown charts display
- Species cards show badges
```

**Dependencies:** Tasks 4.4, 5.4, 7.3

---

### Task 9.3: Enhance Species Detail Page
**File:** `src/app/biodiversity/species/[slug]/page.tsx`

**Description:** Add new tabs and information sections.

**Acceptance Criteria:**
- [ ] Add "Data Quality" tab (source, verification, quality flag)
- [ ] Enhance "Distribution" tab with map
- [ ] Add "Migration" section (for migratory species)
- [ ] Add "Endemism" section (for endemic species)
- [ ] Add "Monitoring" section (protocols)
- [ ] Add "Pressure Index" (if applicable)
- [ ] Update all sections with new data
- [ ] Maintain existing 8 tabs
- [ ] Responsive tabs
- [ ] SEO optimized

**Test Cases:**
```typescript
// Page tests
- Species page renders all tabs
- Data quality tab shows source
- Distribution tab shows map
- Migration tab shows calendar
- Tabs are keyboard navigable
```

**Dependencies:** Tasks 6.3, 7.1, 8.4

---

### Task 9.4: Add Cross-Module Links
**Files:** Multiple

**Description:** Link biodiversity module to other modules.

**Acceptance Criteria:**
- [ ] Habitat pages link to related trails
- [ ] Habitat pages link to related water systems
- [ ] Species pages link to related protected areas
- [ ] District pages link to related climate data
- [ ] Risk dashboard links to community conservation
- [ ] All links are bidirectional
- [ ] Links open in appropriate tabs
- [ ] Breadcrumbs work across modules

**Test Cases:**
```typescript
// Integration tests
- Habitat → Trail link works
- Species → Protected Area link works
- District → Climate link works
- Bidirectional links function
```

**Dependencies:** All previous tasks

---

### Task 9.5: Performance Optimization
**Files:** Multiple

**Description:** Optimize performance across all new features.

**Acceptance Criteria:**
- [ ] Lazy load distribution maps
- [ ] Lazy load migration calendar
- [ ] Lazy load risk dashboard charts
- [ ] Implement pagination for species lists
- [ ] Virtualize long lists
- [ ] Optimize images (WebP, responsive)
- [ ] Minimize bundle size
- [ ] Enable ISR for dynamic pages
- [ ] Lighthouse score > 90
- [ ] Time to interactive < 3s

**Test Cases:**
```typescript
// Performance tests
- Lighthouse performance > 90
- Bundle size < 2MB
- Map lazy loads on scroll
- Lists paginate correctly
- Images optimized
```

**Dependencies:** All previous tasks

---

### Task 9.6: Accessibility Audit
**Files:** All components

**Description:** Ensure WCAG 2.1 AA compliance.

**Acceptance Criteria:**
- [ ] All interactive elements keyboard accessible
- [ ] All images have alt text
- [ ] All charts have text alternatives
- [ ] Color contrast meets AA standards
- [ ] Focus indicators visible
- [ ] Skip links present
- [ ] ARIA labels on complex widgets
- [ ] Screen reader testing passed
- [ ] No accessibility errors (axe-core)

**Test Cases:**
```typescript
// Accessibility tests
- axe-core reports 0 errors
- Keyboard navigation works
- Screen reader announces correctly
- Contrast ratios pass
```

**Dependencies:** All previous tasks

---

### Task 9.7: Testing & Documentation
**Files:** Multiple

**Description:** Add tests and documentation.

**Acceptance Criteria:**
- [ ] Unit tests for all data access functions
- [ ] Component tests for all new components
- [ ] Integration tests for all pages
- [ ] E2E tests for critical flows
- [ ] README.md for biodiversity module
- [ ] Component Storybook stories
- [ ] API documentation
- [ ] User guide for new features

**Test Cases:**
```typescript
// Test coverage
- Unit test coverage > 80%
- Component tests for all components
- E2E tests pass
- Documentation is complete
```

**Dependencies:** All previous tasks

---

## Summary Checklist

### Data Layer
- [ ] Type definitions created
- [ ] Species data enhanced
- [ ] Data access functions implemented
- [ ] District data completed (16/16)

### Habitat Intelligence
- [ ] Habitat detail page
- [ ] HabitatDetailPanel component
- [ ] PressureIndexGauge component
- [ ] VulnerabilityTrendChart component
- [ ] Habitat cards enhanced

### District Intelligence
- [ ] District detail page
- [ ] DistrictDetailPanel component
- [ ] DistrictBiodiversityCard component

### Endemic Species
- [ ] Endemic registry page
- [ ] EndemicSpeciesRegistry component
- [ ] EndemicSpeciesCard component
- [ ] Endemism filter added

### Migration Intelligence
- [ ] Migration calendar page
- [ ] MigrationCalendar component
- [ ] MigrationSpeciesCard component
- [ ] Migration filters added

### Distribution & Mapping
- [ ] DistributionMap component
- [ ] SpeciesDensityHeatmap component
- [ ] Distribution tab added to species pages

### Source Verification
- [ ] SourceVerificationBadge component
- [ ] DataQualityIndicator component
- [ ] Source filters added
- [ ] Data populated with source metadata

### Risk & Monitoring
- [ ] Risk dashboard page
- [ ] RiskDashboard component
- [ ] ThreatSeverityChart component
- [ ] MonitoringProtocolCard component
- [ ] ConservationAnalyticsPanel enhanced

### Integration
- [ ] Hub page updated
- [ ] Taxon pages enhanced
- [ ] Species detail pages enhanced
- [ ] Cross-module links added
- [ ] Performance optimized
- [ ] Accessibility audit passed
- [ ] Tests and documentation complete

---

## Acceptance Criteria Summary

### Functional Requirements
- [ ] All 16 districts have biodiversity data
- [ ] All 5 habitats have detail pages with species lists
- [ ] Endemic species registry is functional
- [ ] Migration calendar shows 12 months
- [ ] Distribution maps display correctly
- [ ] Source verification is visible
- [ ] Risk dashboard shows analytics
- [ ] All filters work correctly

### Non-Functional Requirements
- [ ] Page load < 2s
- [ ] Lighthouse score > 90
- [ ] Bundle size < 2MB
- [ ] Accessibility AA compliant
- [ ] Mobile responsive
- [ ] Cross-browser compatible

### Data Quality
- [ ] Species completeness > 95%
- [ ] District coverage 100%
- [ ] Source verification > 90%
- [ ] No broken links
- [ ] No TypeScript errors
- [ ] No ESLint errors
