# Kashmir EcoWatch - Remediation Master Record

**Date:** 2026-04-02  
**Type:** Remediation Specification  
**Priority:** Critical → High → Medium  
**Status:** In Progress

---

## Executive Summary

This document serves as the master remediation specification for the Kashmir Environmental Intelligence Platform. It identifies critical route failures, content trust issues, UI/UX inconsistencies, and structural gaps that impact platform credibility and user trust.

### Audit Scope
- Route integrity (500 errors, 404s, broken navigation)
- Content freshness (stale 2024 timestamps, outdated metrics)
- UI consistency (footers, breadcrumbs, terminology)
- Mobile responsiveness (320px–430px breakpoint coverage)
- CTA fulfillment (promise-to-destination alignment)

---

## Critical Findings by Severity

### 🔴 P0 - Route Integrity (Immediate Trust Damage)

| Route | Issue | Impact | Fix Priority |
|-------|-------|--------|--------------|
| `/atlas` | 500 Error (Node.js 24 SSL bug) | Core platform feature inaccessible | **IMMEDIATE** |
| `/trails-sightings/sightings` | 404 (Route exists but may have import issues) | Wildlife sightings database unreachable | **IMMEDIATE** |
| `/water-systems/wetlands` | Referenced in nav but page missing | Navigation promise broken | High |
| `/water-systems/rivers` | Referenced in nav but page missing | Navigation promise broken | High |
| `/water-systems/springs` | Referenced in nav but page missing | Navigation promise broken | High |
| `/water-systems/glaciers` | Referenced in nav but page missing | Navigation promise broken | High |
| `/water-systems/water-quality` | Referenced in nav but page missing | Navigation promise broken | High |
| `/water-systems/fisheries` | Referenced in nav but page missing | Navigation promise broken | High |
| `/water-systems/flood-risk` | Referenced in nav but page missing | Navigation promise broken | High |
| `/water-systems/restoration` | Referenced in nav but page missing | Navigation promise broken | High |

### 🟠 P1 - Content Trust (Stale Data)

| Location | Issue | Impact |
|----------|-------|--------|
| `src/lib/data.ts` | Timestamps hardcoded to March 2024 | Platform appears abandoned |
| `src/data/water-systems.ts` | `lastTested` dates in 2024 | Water quality data appears stale |
| `src/data/biodiversity-access.ts` | `nextAssessment` dates in 2024 | Conservation tracking appears outdated |
| Homepage metrics | Static values since 2024 | Live intelligence ribbon misleading |
| Alert timestamps | March 2024 dates | Alert system appears non-functional |

### 🟡 P2 - UI/UX Consistency

| Issue | Location | Impact |
|-------|----------|--------|
| Breadcrumb duplication | Multiple risk-monitoring pages | Visual clutter, UX confusion |
| Footer link gaps | Some pages use `Footer`, others `AdvancedFooter` | Inconsistent navigation |
| Terminology inconsistency | "Protected Areas" vs "Protected Network" | Cognitive load increase |
| Label inconsistency | "Sightings" vs "Wildlife Sightings" | Search/filter confusion |
| Timestamp formats | Mixed `toLocaleDateString` patterns | Professional polish reduced |

### 🟢 P3 - Structural Depth

| Page | Issue | Impact |
|------|-------|--------|
| Directory pages | Thin content (metric cards only) | Reduced SEO value, user engagement |
| Detail pages | Missing related entities | Cross-navigation opportunities lost |
| Geographic discipline | Non-Kashmir locations may appear | Platform positioning weakened |

---

## Page-by-Page Remediation Matrix

### 1. Homepage (`/`)

**Current State:**
- 9-section hero-to-footer flow
- Live metric ribbon with static 2024 data
- 8 intelligence module cards
- Map preview with layer toggle
- 5 expandable insight panels
- 6 dashboard preview charts
- Featured entity showcase
- Alert status module

**Issues:**
- All timestamps reference 2024
- Metrics are static, not "live"
- Dashboard charts use mock data
- Alert feed shows stale entries

**Fixes Required:**

| Priority | Fix | Notes |
|----------|-----|-------|
| P1 | Update all timestamps to 2026 | Use relative dates (`3 days ago`) |
| P1 | Refresh metric values | Align with actual database counts |
| P2 | Add "Last updated" chip | Show data freshness indicator |
| P3 | Add "Report Data Issue" CTA | Enable citizen correction pathway |

**Mobile Notes:**
- Metric ribbon should collapse to 2 rows at 320px
- Dashboard charts should stack 1-column below 768px
- Insight panels should be full-width on mobile

---

### 2. Atlas (`/atlas`)

**Current State:**
- `page.tsx` imports `AtlasClient`
- `AtlasClient.tsx` renders full-screen map with layers
- Layer rail with 6 groups (Boundaries, Water, Cryosphere, Biodiversity, Trails, Risk)
- Top command bar with search
- Floating chips, legend card, coordinate display

**Issues:**
- **500 Error** - Node.js 24 SSL certificate bug blocks build
- Map may not render if Leaflet fails to load
- Layer count badges may not match actual GeoJSON features

**Fixes Required:**

| Priority | Fix | Notes |
|----------|-----|-------|
| P0 | **Downgrade Node.js to v22 LTS** | Required to complete build |
| P1 | Add layer loading states | Show skeleton while GeoJSON loads |
| P2 | Add "Layer Unavailable" fallback | Graceful degradation for missing data |
| P3 | Add feature count to legend | Show actual vs. expected counts |

**Mobile Notes:**
- Layer rail should be bottom sheet on mobile
- Legend should collapse to icon-only on small screens
- Coordinate display should hide below 375px

---

### 3. Trails & Sightings (`/trails-sightings`)

**Current State:**
- Overview page with trail categories
- Links to sub-pages (hiking, birding, wildlife)
- Sighting submission CTA

**Issues:**
- Sub-page `/trails-sightings/sightings` exists but may have import errors
- Navigation dropdown shows 5 items, but more exist
- Some trail categories lack dedicated pages

**Fixes Required:**

| Priority | Fix | Notes |
|----------|-----|-------|
| P0 | Verify `/trails-sightings/sightings` renders | Check imports, data access |
| P1 | Align nav dropdown with actual pages | Remove broken links |
| P2 | Add trail difficulty badges | Easy/Moderate/Difficult classification |
| P3 | Add seasonal availability chips | "Open Now", "Seasonal", "Closed" |

---

### 4. Water Systems (`/water-systems`)

**Current State:**
- Overview page with water body metrics
- Links to lakes, wetlands, rivers, springs, watersheds
- Water quality monitoring section

**Issues:**
- Navigation dropdown shows 10 sub-pages, most don't exist
- `/water-systems/lakes` exists but may be thin
- Water quality data has 2024 timestamps

**Fixes Required:**

| Priority | Fix | Notes |
|----------|-----|-------|
| P0 | Create missing sub-pages or remove nav links | Either build or prune |
| P1 | Update water quality timestamps | Use 2026 dates or "Recent" |
| P2 | Add water body type badges | "Natural", "Artificial", "Urban" |
| P3 | Add seasonal level indicators | "High", "Normal", "Low" |

**Recommended Approach:**
Create placeholder pages for all nav items with:
- Hero section with icon
- Metric summary
- "Content coming soon" message
- CTA to related existing pages

---

### 5. Biodiversity (`/biodiversity`)

**Current State:**
- Species database with filters
- Sub-pages: mammals, birds, fish, plants, medicinal plants, threatened species
- Dynamic routes: `/biodiversity/species/[slug]`, `/biodiversity/district/[slug]`, `/biodiversity/habitat/[slug]`

**Issues:**
- Species detail pages may have breadcrumb duplication
- Migration calendar has 2024 dates
- Risk dashboard may not align with actual threats

**Fixes Required:**

| Priority | Fix | Notes |
|----------|-----|-------|
| P1 | Update migration calendar to 2026 | Use current year |
| P2 | Standardize breadcrumbs | Home > Biodiversity > [Type] > [Name] |
| P3 | Add conservation status badges | IUCN Red List categories |

---

### 6. Risk & Monitoring (`/risk-monitoring`)

**Current State:**
- 30+ sub-pages covering all risk categories
- Each page has breadcrumb, hero, content sections
- Dashboard previews with charts

**Issues:**
- Breadcrumb duplication (inline + component)
- Some pages have identical structure (copy-paste)
- Hazard risk pages may lack actual hazard data

**Fixes Required:**

| Priority | Fix | Notes |
|----------|-----|-------|
| P2 | Remove duplicate breadcrumbs | Keep one consistent pattern |
| P2 | Standardize page templates | Use shared component |
| P3 | Add risk level indicators | Low/Medium/High/Critical |

---

### 7. Seasonal Ecology (`/seasonal-ecology`)

**Current State:**
- Overview with seasonal patterns
- Sub-pages: bloom-mapping, migration-windows, phenology-records, etc.
- Catch-all route `[...catchall]` for unknown paths

**Issues:**
- Catch-all route may mask 404s
- Bloom mapping has 2024 dates
- Migration calendar needs annual update

**Fixes Required:**

| Priority | Fix | Notes |
|----------|-----|-------|
| P1 | Update bloom calendar to 2026 | Current spring season |
| P2 | Add catch-all redirect to 404 page | Better UX than blank page |
| P3 | Add "Peak Season" indicators | Best viewing windows |

---

### 8. Protected Network (`/protected-network`)

**Current State:**
- Protected area overview
- Sub-pages: national-parks, wildlife-sanctuaries, wetland-reserves, etc.
- Atlas sub-page with GIS view

**Issues:**
- Navigation shows 11 sub-pages, verify all exist
- Protected area counts may not match actual data
- Corridors & connectivity page may lack data

**Fixes Required:**

| Priority | Fix | Notes |
|----------|-----|-------|
| P1 | Verify all nav links resolve | Fix or remove broken links |
| P2 | Add protection level badges | "National", "State", "Community" |
| P3 | Add visitor info chips | "Open", "Permit Required", "Closed" |

---

### 9. About / Contact / Partners / Contribute

**Current State:**
- `/about` - Platform overview
- `/about/contact` - Contact form
- `/about/partners` - Partner showcase
- `/contribute-data` - Data submission
- `/submit-sighting` - Wildlife sighting form
- `/report-issue` - Issue reporting

**Issues:**
- Contact form may not have backend handler
- Partner page may lack actual partner data
- Contribution pathways may not have fulfillment

**Fixes Required:**

| Priority | Fix | Notes |
|----------|-----|-------|
| P1 | Add form submission states | Success/error messages |
| P2 | Add partner logos and descriptions | Build credibility |
| P3 | Add contribution guidelines | What data is accepted |

---

## Global Issues (Cross-Cutting)

### 1. Stale 2024 Content

**Pattern:**
```typescript
// Bad
timestamp: new Date('2024-03-26')
lastTested: '2024-03-15'
nextAssessment: '2024-09-01'

// Good
timestamp: new Date('2026-04-01')
lastTested: '2026-03-28'
nextAssessment: '2026-06-01'
```

**Fix Strategy:**
- Search all `.ts` and `.tsx` files for `2024`
- Replace with 2026 dates (Q1-Q2)
- Use relative dates where possible (`3 days ago`)

### 2. Footer Inconsistency

**Pattern:**
- Some pages import `Footer`
- Others import `AdvancedFooter`
- May have different link structures

**Fix Strategy:**
- Standardize on `AdvancedFooter` everywhere
- Remove `Footer` component or alias to `AdvancedFooter`

### 3. Breadcrumb Duplication

**Pattern:**
```tsx
// Some pages have both:
<BreadcrumbComponent />
<div className="breadcrumb">Home > Page</div>
```

**Fix Strategy:**
- Use single breadcrumb component
- Create shared `PageHeader` component with breadcrumb built-in

### 4. Terminology Inconsistency

**Current Variants:**
- "Protected Areas" vs "Protected Network"
- "Sightings" vs "Wildlife Sightings" vs "Field Sightings"
- "Water Bodies" vs "Water Systems" vs "Hydrology"

**Fix Strategy:**
- Create terminology glossary
- Update nav, breadcrumbs, and page titles to match
- Use singular for detail pages, plural for lists

---

## CTA Fulfillment Audit

### Promise-to-Destination Mapping

| CTA Text | Source Page | Destination | Status | Fix |
|----------|-------------|-------------|--------|-----|
| "Open Atlas" | Homepage | `/atlas` | ✅ Works | — |
| "Explore Biodiversity" | Homepage | `/biodiversity` | ✅ Works | — |
| "View Dashboards" | Homepage | `/risk-monitoring/dashboards` | ⚠️ Verify | Check page exists |
| "Submit Sighting" | Multiple | `/submit-sighting` | ✅ Works | — |
| "Report an Issue" | Footer | `/report-issue` | ⚠️ Verify | Check form works |
| "Contribute Data" | Footer | `/contribute-data` | ⚠️ Verify | Check form works |
| "View on Map" | Sightings | `/atlas?layer=sightings` | ⚠️ Verify | Check query param works |
| "Details →" | Dashboard cards | Various | ⚠️ Verify | Check all links resolve |

---

## Mobile QA Standards

### Breakpoint Coverage

| Breakpoint | Min Width | Target Devices | Requirements |
|------------|-----------|----------------|--------------|
| `320px` | 320px | iPhone SE (1st gen), Small Android | Single column, collapsed nav |
| `375px` | 375px | iPhone 12/13/14 Mini | Metric chips 2-row |
| `390px` | 390px | iPhone 12/13/14 Pro | Standard mobile layout |
| `412px` | 412px | Pixel, Large Android | Dashboard 2-column |
| `430px` | 430px | iPhone 14 Pro Max | Full mobile experience |

### Component-Specific Rules

**Navigation:**
- Hamburger menu below 1024px
- Full-screen overlay on mobile
- Touch targets min 44x44px

**Metric Chips:**
- 2 rows below 375px
- Horizontal scroll with snap above 375px
- Hide labels, show icons only below 320px

**Dashboard Charts:**
- Single column below 640px
- 2-column 640px–1024px
- Full width above 1024px

**Cards:**
- Full width below 640px
- 2-column 640px–1024px
- 3-column above 1024px

**Map:**
- Full-screen on mobile
- Bottom sheet layer controls
- Floating action buttons for zoom

---

## Implementation Order

### Phase 1: Route Integrity (Days 1–2)

1. **Downgrade Node.js to v22 LTS**
   ```bash
   # Install Node.js 22 from https://nodejs.org/
   node -v  # Verify v22.x.x
   npm install  # Reinstall dependencies
   npm run build  # Should complete successfully
   ```

2. **Fix `/atlas` 500 error**
   - Verify build completes
   - Test map rendering
   - Check all layer toggles

3. **Verify `/trails-sightings/sightings`**
   - Check imports
   - Verify data access
   - Test category filters

4. **Create missing Water Systems pages**
   - Create placeholder pages for all nav items
   - Add "Coming Soon" messaging
   - Link to related existing pages

### Phase 2: Content Freshness (Days 3–4)

1. **Update all 2024 timestamps to 2026**
   - Search: `2024` → Replace: `2026`
   - Use relative dates where possible

2. **Refresh metric values**
   - Align with actual data counts
   - Add "Last updated" indicators

3. **Update alert feeds**
   - Replace 2024 alerts with 2026 entries
   - Use realistic scenarios

### Phase 3: UI Consistency (Days 5–6)

1. **Standardize footers**
   - Use `AdvancedFooter` everywhere
   - Verify all links resolve

2. **Fix breadcrumb duplication**
   - Create shared `PageHeader` component
   - Remove inline breadcrumbs

3. **Align terminology**
   - Update nav labels
   - Fix page titles
   - Standardize breadcrumbs

### Phase 4: Structural Depth (Days 7–10)

1. **Expand directory pages**
   - Add introductory content
   - Include filter/sort controls
   - Add related entity links

2. **Enrich detail pages**
   - Add "Related Entities" section
   - Include "Quick Facts" sidebar
   - Add image gallery placeholder

3. **Geographic discipline**
   - Verify all locations are Kashmir-only
   - Add district badges
   - Include coordinate metadata

### Phase 5: Mobile Optimization (Days 11–12)

1. **Chip compression**
   - 2-row layout below 375px
   - Icon-only mode below 320px

2. **Metadata collapse**
   - Hide secondary info on mobile
   - Use expandable sections

3. **Breakpoint QA**
   - Test 320px, 375px, 390px, 412px, 430px
   - Verify touch targets (44px min)
   - Check scroll behavior

---

## Completion Checklist

### Route Integrity
- [ ] `/atlas` loads without 500 error
- [ ] `/trails-sightings/sightings` loads without 404
- [ ] All nav dropdown links resolve
- [ ] No console errors on any page

### Content Freshness
- [ ] No 2024 timestamps visible
- [ ] All metrics show 2026 dates
- [ ] Alert feed has recent entries
- [ ] "Last updated" chips present

### UI Consistency
- [ ] All pages use `AdvancedFooter`
- [ ] Breadcrumbs standardized
- [ ] Terminology consistent
- [ ] Label formats aligned

### Structural Depth
- [ ] Directory pages have intro content
- [ ] Detail pages have related entities
- [ ] All locations are Kashmir-only
- [ ] Geographic metadata present

### Mobile Optimization
- [ ] Navigation works at 320px
- [ ] Metric chips readable at 320px
- [ ] Charts stack properly below 640px
- [ ] Touch targets meet 44px minimum

### CTA Fulfillment
- [ ] All CTAs lead to working pages
- [ ] Forms have success states
- [ ] Map query params work
- [ ] External links valid

---

## Deferred Enhancements (Post-Remediation)

### Phase 2 (Future)
- Real-time data feeds from APIs
- User authentication and profiles
- Advanced search with filters
- Compare mode for entities
- Seasonal mode switching

### Phase 3 (Future)
- AI-assisted recommendations
- Automated alert generation
- Citizen reporting workflow
- Admin dashboard
- Analytics integration

---

## Risk Mitigation

### Technical Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Node.js version conflicts | Build failures | Document required version in README |
| GeoJSON load failures | Map errors | Add loading states and fallbacks |
| TypeScript errors | Build blockers | Run `tsc --noEmit` before build |

### Content Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Stale data returns | Trust loss | Add data freshness indicators |
| Non-Kashmir locations | Positioning damage | Add geographic validation |
| Broken external links | Credibility loss | Add link checker to CI |

---

## Success Metrics

### Quantitative
- 0 route errors (500, 404)
- 100% nav link resolution
- < 2s page load time
- > 90 Lighthouse score

### Qualitative
- Platform appears "live" and maintained
- Navigation feels intuitive
- Content inspires trust
- Mobile experience is polished

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-04-02 | AI Assistant | Initial remediation spec |

---

**Next Steps:**
1. Execute Phase 1 (Route Integrity) immediately
2. Create PHR for this spec in `history/prompts/general/`
3. Begin Node.js downgrade and build verification
