# Kashmir Environmental Intelligence Platform
## Atlas GIS Implementation Plan

**Real GIS Engine • Real Kashmir Geographies • Premium Observatory UI**

---

## 🎯 Implementation Directive

Build a production-grade, Leaflet-powered GIS atlas for Kashmir environmental intelligence with **real spatial data**, **real interactions**, and **premium scientific UI** — eliminating all fake CSS-based pseudo-map logic.

---

## ✅ Corrections Applied

### Phase 1 Scope (Expanded)
- ✅ District boundaries
- ✅ Protected areas
- ✅ Lakes
- ✅ Wetlands

### Route Integration (Earlier)
Feature click flow:
```
hover highlight → drawer open → navigate to real detail page
```

### Locked Route Architecture
Use **actual platform routes**:
- `/protected-network/national-parks/[slug]`
- `/protected-network/wildlife-sanctuaries/[slug]`
- `/protected-network/conservation-reserves/[slug]`
- `/protected-network/wetland-reserves/[slug]`
- `/water-systems/lakes/[slug]`
- `/water-systems/wetlands/[slug]`
- `/biodiversity/species/[slug]`
- `/districts/[slug]`

### No Fake GIS Remnants
**Explicitly remove:**
- ❌ Hardcoded `%` marker positions
- ❌ Fake zoom counters
- ❌ Decorative marker logic as primary map logic
- ❌ CSS-only pseudo-spatial elements

### Kashmir-Specific from Start
- ✅ Kashmir-centered viewport `[34.0837, 74.7973]` zoom 8
- ✅ Kashmir district boundaries
- ✅ Kashmir protected areas
- ✅ Kashmir lakes and wetlands
- ✅ Kashmir place naming and relevance

---

## 📋 Phased Implementation

### **Phase 1A: Leaflet Initialization + Kashmir Viewport + Basemap**

**Goal:** Real GIS engine with Kashmir-centered view

**Tasks:**
1. Initialize `MapContainer` with Kashmir coordinates
2. Set zoom levels: min 6, max 16, default 8
3. Add dark matter basemap (CartoDB Dark)
4. Implement proper projection handling
5. Add map instance state management

**Acceptance Criteria:**
- [ ] Map renders at Kashmir-centered viewport
- [ ] Dark basemap loads correctly
- [ ] Zoom constraints enforced (6-16)
- [ ] No console errors
- [ ] Smooth pan/zoom performance

---

### **Phase 1B: GeoJSON Generation / Ingestion**

**Goal:** Real Kashmir spatial data from existing datasets

**Tasks:**
1. Generate GeoJSON from `src/data/protected-network.ts`
2. Generate GeoJSON from `src/data/water-systems.ts` (lakes, wetlands)
3. Generate GeoJSON from `src/data/index.ts` (districts)
4. Store in `src/data/geojson/` directory
5. Add TypeScript declarations for GeoJSON imports

**GeoJSON Structure:**
```typescript
// districts.geojson
{
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: {
        id: "srinagar",
        name: "Srinagar",
        district: "Srinagar",
        type: "district"
      },
      geometry: {
        type: "Polygon",
        coordinates: [...]
      }
    }
  ]
}
```

**Acceptance Criteria:**
- [ ] All 10 Kashmir districts represented
- [ ] Protected areas with correct categories
- [ ] Lakes and wetlands with coordinates
- [ ] Valid GeoJSON structure
- [ ] TypeScript imports work without errors

---

### **Phase 1C: Render Core Layers**

**Goal:** Display district boundaries, protected areas, lakes, wetlands

**Tasks:**
1. Create `DistrictLayer` component using `GeoJSON` from react-leaflet
2. Create `ProtectedAreaLayer` component with category-based styling
3. Create `WaterBodyLayer` component for lakes and wetlands
4. Implement layer visibility toggles
5. Add proper z-index layering order

**Layer Order (bottom to top):**
1. District boundaries (base layer)
2. Wetlands
3. Lakes
4. Protected areas

**Styling:**
```typescript
// District boundaries
{
  color: '#ffffff40',
  weight: 1,
  fillOpacity: 0.02,
  fillColor: 'transparent'
}

// Protected areas by category
const categoryColors = {
  national_park: '#10b981',
  wildlife_sanctuary: '#3b82f6',
  wetland_reserve: '#06b6d4',
  conservation_reserve: '#f59e0b'
}

// Water bodies
const waterBodyColors = {
  lake: '#3b82f6',
  wetland: '#06b6d4'
}
```

**Acceptance Criteria:**
- [ ] All 4 layer types render correctly
- [ ] Layer visibility toggles work
- [ ] Correct z-index ordering
- [ ] Category-based coloring applied
- [ ] Hover states functional

---

### **Phase 1D: Real Interactions**

**Goal:** Full GIS interaction model

**Tasks:**
1. Implement hover highlight on GeoJSON features
2. Implement click selection with state management
3. Build feature drawer component
4. Add "fit to bounds" functionality
5. Implement pan/zoom controls
6. Connect drawer to real detail routes

**Interaction Flow:**
```typescript
// Hover
onMouseEnter → highlight feature (stroke + fill)
onMouseLeave → reset style

// Click
onClick → set selected feature → open drawer → populate details

// Navigate
onViewDetails → router.push(`/protected-network/national-parks/${slug}`)
```

**Feature Drawer Content:**
- Entity name
- Category badge
- District
- Key metrics (area, elevation, etc.)
- Brief description
- "View Full Details" button → real route

**Acceptance Criteria:**
- [ ] Hover highlight works on all layers
- [ ] Click opens feature drawer
- [ ] Drawer shows correct entity data
- [ ] "View Full Details" navigates to real route
- [ ] Fit-to-bounds zooms to selected feature
- [ ] Pan/zoom controls functional

---

### **Phase 2: Atlas UI Shell**

**Goal:** Premium scientific observatory interface

**Tasks:**
1. Build top bar with search, filters, stats
2. Build left layer rail with toggle controls
3. Build right intelligence drawer (slide-out)
4. Add floating filter chips
5. Add legend component
6. Add map controls (zoom, fit, reset)

**Layout Structure:**
```
┌────────────────────────────────────────────────────┐
│  Top Bar: Search | Filters | Stats | Actions       │
├──────────┬───────────────────────────┬─────────────┤
│ Layer    │                           │ Intelligence│
│ Rail     │     MAP CONTAINER         │ Drawer      │
│ (left)   │     (full height)         │ (right)     │
│          │                           │             │
└──────────┴───────────────────────────┴─────────────┘
```

**Premium UI Elements:**
- Glass morphism backgrounds
- Gradient borders
- Smooth transitions (Framer Motion)
- Dark theme optimized
- Scientific typography

**Acceptance Criteria:**
- [ ] All UI shells render correctly
- [ ] Layer rail toggles layers
- [ ] Intelligence drawer slides smoothly
- [ ] Filter chips update map
- [ ] Legend updates with visible layers
- [ ] Controls respond correctly

---

### **Phase 3: Search + Filters + Route Integration**

**Goal:** Discoverability and navigation

**Tasks:**
1. Implement district search with autocomplete
2. Implement entity search across all types
3. Build filter chips (category, district, status)
4. Connect feature drawer to detail pages
5. Add breadcrumb navigation
6. Implement URL state sync

**Search Architecture:**
```typescript
// Search types
type SearchTarget = 'district' | 'protected_area' | 'lake' | 'wetland' | 'species'

// Search result
interface SearchResult {
  type: SearchTarget
  id: string
  slug: string
  name: string
  district?: string
  coordinates?: { lat: number; lng: number }
}
```

**Filter System:**
```typescript
// Filter state
interface FilterState {
  districts: string[]
  categories: string[]
  types: string[]
  status?: 'verified' | 'reviewed' | 'community'
}

// Apply filters
filteredFeatures = allFeatures.filter(f =>
  filters.districts.includes(f.district) &&
  filters.categories.includes(f.category)
)
```

**Route Integration:**
```typescript
// Feature drawer action
const handleViewDetails = (feature: Feature) => {
  const route = getRouteForFeature(feature)
  router.push(route)
}

// Route mapping
const getRouteForFeature = (feature: Feature): string => {
  switch (feature.type) {
    case 'national_park':
      return `/protected-network/national-parks/${feature.slug}`
    case 'wildlife_sanctuary':
      return `/protected-network/wildlife-sanctuaries/${feature.slug}`
    case 'lake':
      return `/water-systems/lakes/${feature.slug}`
    case 'wetland':
      return `/water-systems/wetlands/${feature.slug}`
    case 'district':
      return `/districts/${feature.slug}`
    default:
      return '/'
  }
}
```

**Acceptance Criteria:**
- [ ] Search returns correct results
- [ ] Search selects and zooms to feature
- [ ] Filter chips update map visibility
- [ ] Drawer "View Details" navigates correctly
- [ ] URL state persists on refresh
- [ ] Breadcrumb shows current location

---

### **Phase 4: Additional GIS Layers**

**Goal:** Complete hydrological and ecological coverage

**Layers to Add:**
1. **Rivers and Streams**
   - Polyline geometry
   - Flow direction indicators
   - Perennial vs seasonal styling

2. **Watersheds**
   - Polygon boundaries
   - Drainage area labels
   - Nested hierarchy display

3. **Trails**
   - Polyline with difficulty coloring
   - Trailhead markers
   - Distance markers

4. **Glaciers / Cryosphere**
   - Polygon with retreat animation
   - Elevation bands
   - Mass balance indicators

5. **Hazard Zones**
   - Flood risk polygons
   - Landslide zones
   - Avalanche paths
   - Real-time alert overlay

6. **Wildlife Sightings**
   - Point markers with species icons
   - Temporal clustering
   - Heat map density

7. **Monitoring Nodes**
   - Station markers
   - Real-time data badges
   - Status indicators (active/offline)

**Acceptance Criteria:**
- [ ] All layers toggle independently
- [ ] Performance remains smooth with all layers
- [ ] Layer grouping in UI (hydrology, ecology, hazards)
- [ ] Correct symbology for each layer type
- [ ] Legend updates dynamically

---

### **Phase 5: Polish**

**Goal:** Production-ready premium experience

**Tasks:**
1. **Export / Share**
   - PNG export with attribution
   - PDF report generation
   - Shareable URL with state

2. **Scale Bar**
   - Dynamic scale based on zoom
   - Metric units (km, m)
   - Position: bottom-left

3. **Coordinate Readout**
   - Mouse position in lat/lng
   - UTM optional toggle
   - Position: bottom-right

4. **Loading States**
   - Skeleton loaders for tiles
   - Progress bar for GeoJSON
   - Spinner for interactions

5. **Premium Transitions**
   - Smooth layer fade-in/out
   - Drawer slide animations
   - Hover glow effects
   - Selection pulse

6. **Timeline Strip (Optional)**
   - Temporal data scrubbing
   - Seasonal toggle (summer/winter)
   - Historical comparison

**Acceptance Criteria:**
- [ ] Export generates high-quality image
- [ ] Scale bar updates on zoom
- [ ] Coordinates accurate to 4 decimals
- [ ] Loading states cover all async operations
- [ ] Animations smooth at 60fps
- [ ] Timeline scrubbing works (if implemented)

---

## 🚫 Anti-Patterns: What NOT to Build

### Fake GIS Remnants (Remove All)
```typescript
// ❌ BAD: Hardcoded CSS markers
<div style={{ left: '45%', top: '30%' }}>Marker</div>

// ❌ BAD: Fake zoom counter
const [zoom, setZoom] = useState(0) // decorative only

// ❌ BAD: Decorative marker logic
markers.map(m => <div className="fake-marker" />)

// ✅ GOOD: Real Leaflet markers
import { Marker, Popup } from 'react-leaflet'
<Marker position={[lat, lng]}>
  <Popup>{content}</Popup>
</Marker>
```

### Generic Routes (Don't Use)
```typescript
// ❌ BAD: Generic routes
/protected-areas/[slug]
/water-bodies/[slug]
/species/[slug]

// ✅ GOOD: Locked platform routes
/protected-network/national-parks/[slug]
/protected-network/wildlife-sanctuaries/[slug]
/water-systems/lakes/[slug]
/water-systems/wetlands/[slug]
/biodiversity/species/[slug]
```

### Non-Kashmir Content (Exclude)
```typescript
// ❌ BAD: Generic India content
wetlands: ['Keoladeo', 'Chilika', 'Loktak']

// ✅ GOOD: Kashmir-specific only
wetlands: ['Hokersar', 'Wular', 'Dal', 'Shallabugh', 'Haigam']
```

---

## 📦 File Structure

```
src/
├── app/
│   └── atlas/
│       └── page.tsx              # Main atlas route
├── components/
│   └── atlas/
│       ├── AtlasShell.tsx        # Main layout container
│       ├── AtlasMap.tsx          # Leaflet map wrapper
│       ├── LayerRail.tsx         # Left layer toggle panel
│       ├── IntelligenceDrawer.tsx # Right info panel
│       ├── SearchBar.tsx         # Search + autocomplete
│       ├── FilterChips.tsx       # Filter controls
│       ├── Legend.tsx            # Map legend
│       ├── MapControls.tsx       # Zoom, fit, reset
│       ├── ScaleBar.tsx          # Scale indicator
│       ├── CoordinateReadout.tsx # Mouse position
│       └── FeatureDrawer.tsx     # Selected feature info
├── components/
│   └── maps/
│       ├── layers/
│       │   ├── DistrictLayer.tsx
│       │   ├── ProtectedAreaLayer.tsx
│       │   ├── WaterBodyLayer.tsx
│       │   ├── RiverLayer.tsx
│       │   ├── WatershedLayer.tsx
│       │   ├── TrailLayer.tsx
│       │   ├── GlacierLayer.tsx
│       │   ├── HazardLayer.tsx
│       │   └── SightingLayer.tsx
│       └── index.ts
├── data/
│   └── geojson/
│       ├── districts.geojson
│       ├── protected-areas.geojson
│       ├── lakes.geojson
│       ├── wetlands.geojson
│       ├── rivers.geojson
│       ├── watersheds.geojson
│       ├── trails.geojson
│       ├── glaciers.geojson
│       ├── hazards.geojson
│       └── sightings.geojson
├── lib/
│   ├── atlas-search.ts           # Search utility
│   ├── atlas-filters.ts          # Filter logic
│   └── geojson-utils.ts          # GeoJSON helpers
└── hooks/
    └── useAtlasState.ts          # Atlas state management
```

---

## 🎨 Design Tokens

### Colors
```typescript
const atlasColors = {
  // Basemaps
  basemap: '#0f172a',        // slate-950
  water: '#1e3a5f',          // Deep blue
  
  // Layers
  districts: '#ffffff40',    // White 25% opacity
  nationalPark: '#10b981',   // emerald-500
  wildlifeSanctuary: '#3b82f6', // blue-500
  wetlandReserve: '#06b6d4', // cyan-500
  conservationReserve: '#f59e0b', // amber-500
  lake: '#3b82f6',           // blue-500
  wetland: '#06b6d4',        // cyan-500
  river: '#60a5fa',          // blue-400
  glacier: '#e0f2fe',        // sky-100
  trail: '#fbbf24',          // amber-400
  hazard: '#ef4444',         // red-500
  
  // UI
  panelBg: 'rgba(15, 23, 42, 0.8)',
  panelBorder: 'rgba(255, 255, 255, 0.1)',
  text: '#f8fafc',
  textMuted: '#94a3b8'
}
```

### Typography
```typescript
const atlasType = {
  fontFamily: 'Inter, system-ui, sans-serif',
  scale: {
    xs: '10px',
    sm: '12px',
    base: '14px',
    lg: '16px',
    xl: '18px',
    '2xl': '24px'
  },
  weights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  }
}
```

### Spacing
```typescript
const atlasSpacing = {
  panelPadding: '16px',
  layerGap: '8px',
  controlSize: '32px',
  drawerWidth: '360px',
  railWidth: '240px'
}
```

---

## 🔧 Technical Requirements

### Dependencies
```json
{
  "leaflet": "^1.9.4",
  "react-leaflet": "^5.0.0",
  "@types/leaflet": "^1.9.12"
}
```

### TypeScript Configuration
```typescript
// next-env.d.ts
declare module '*.geojson' {
  const content: any
  export default content
}
```

### Performance Targets
- Initial map load: < 2s
- Layer toggle: < 100ms
- Feature selection: < 50ms
- Pan/zoom: 60fps
- GeoJSON parsing: < 500ms for 1000 features

### Browser Support
- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile Safari/Chrome

---

## ✅ Success Metrics

### Functional
- [ ] All 5 phases completed
- [ ] Zero TypeScript errors
- [ ] Zero runtime errors
- [ ] All routes navigate correctly
- [ ] All layers toggle correctly

### Performance
- [ ] Lighthouse Performance: > 90
- [ ] First Contentful Paint: < 1.5s
- [ ] Time to Interactive: < 3s
- [ ] Smooth pan/zoom at 60fps

### UX
- [ ] Premium feel matches design system
- [ ] Interactions feel responsive
- [ ] Information hierarchy clear
- [ ] Accessibility: WCAG 2.1 AA

### Data Quality
- [ ] All Kashmir districts represented
- [ ] Protected areas accurate
- [ ] Water bodies correctly classified
- [ ] Coordinates verified
- [ ] No generic India content

---

## 📝 Implementation Notes

### Phase Dependencies
- Phase 1A must complete before 1B
- Phase 1B must complete before 1C
- Phase 1C must complete before 1D
- Phase 2 can parallelize with Phase 1D
- Phase 3 requires Phase 2 UI shell
- Phase 4 requires stable Phase 3
- Phase 5 is final polish pass

### Testing Strategy
1. **Unit Tests**: Utility functions, search, filters
2. **Component Tests**: Individual layers, UI components
3. **Integration Tests**: Map + layers + interactions
4. **E2E Tests**: Full user flows, route navigation

### Rollback Plan
- Feature flag each phase
- Maintain legacy view during transition
- A/B test new atlas with subset of users
- Monitor error rates and performance

---

## 🚀 Next Steps

1. **Approve this implementation plan**
2. **Create PHR for this spec**
3. **Begin Phase 1A implementation**
4. **Test each phase before proceeding**
5. **Document decisions in ADRs as needed**

---

**Kashmir Environmental Intelligence Platform** — Atlas GIS Implementation Plan

*Real GIS • Real Kashmir Data • Premium Observatory UI*
