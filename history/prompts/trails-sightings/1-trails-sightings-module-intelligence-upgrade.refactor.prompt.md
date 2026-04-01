---
id: 1
title: Trails & Sightings Module Intelligence Upgrade
stage: refactor
date_iso: 2026-04-01
surface: agent
model: qwen-code
feature: trails-sightings
branch: main
user: Naseer Ahmed
command: npm run build
labels: ["module-upgrade", "intelligence-depth", "trails", "sightings", "citizen-science", "kashmir-only"]
links:
  SPEC: specs/trails-sightings/spec.md
  PLAN: specs/trails-sightings/plan.md
  ADR: null
  PR: null
files_yaml:
  created:
    - specs/trails-sightings/spec.md
    - specs/trails-sightings/plan.md
    - src/data/trails-sightings.ts
    - src/components/trails/TrailIntelligenceCard.tsx
    - src/components/sightings/SightingAggregationPanel.tsx
    - src/components/trails/SeasonalWindowDisplay.tsx
    - src/components/sections/CrossModuleLinkStrip.tsx
    - src/components/sightings/VerificationStatusBadge.tsx
    - src/components/sightings/SensitivityMask.tsx
  modified:
    - src/app/trails-sightings/page.tsx
tests_yaml:
  - npm run build (passed)
prompt_text: |
  I audited the Trails & Sightings hub page, and your judgment is right: it is functionally present, but not developed to the same depth, intelligence density, and architectural maturity as stronger modules like Risk & Monitoring, Water Systems, or Protected Areas.

  Current issue:
  The module exists, but it still feels more like a category directory and citizen-science landing page than a fully developed ecological intelligence system.

  Current page already includes:
  - hero
  - metrics
  - trail-type cards
  - sighting-type cards
  - recent wildlife sightings
  - contribution CTA

  But it is still too flat, too directory-like, and not deeply integrated into the rest of the platform.

  WHAT MUST BE IMPROVED:

  1. Reposition the module as: Kashmir ecological access, field observation, and citizen-science intelligence

  2. Strengthen the page structure into clear intelligence bands:
     - hero + command surface
     - trail intelligence overview
     - sighting intelligence overview
     - map-linked ecological access preview
     - seasonal windows and route conditions
     - recent verified field intelligence
     - contribution and verification workflow
     - related district / habitat / protected-area intelligence

  3. Add a real intelligence layer to trail cards:
     - district
     - habitat
     - altitude band
     - season window
     - access status
     - sensitivity flag
     - related protected area
     - related species
     - related bloom / migration / wetland logic

  4. Add a stronger analytical layer to sightings:
     - verified vs community-submitted
     - district distribution
     - seasonal concentration
     - habitat linkage
     - route-linked records
     - sensitive record masking
     - high-value recent observations

  5. Enforce Kashmir-only public-facing logic.
     Do not foreground non-Kashmir records such as Leh/Hemis in the public Kashmir-facing module view.

  6. Cross-link this module strongly with:
     - Protected Areas
     - Biodiversity
     - Water Systems
     - Seasonal Ecology
     - Risk & Monitoring
     - District Profiles
     - Atlas

  DESIGN RULE:
  Keep the design system: premium, modern, compact, scientific, interactive, globally aligned with Kashmir EcoWatch

  But increase: intelligence depth, module maturity, workflow richness, cross-module usefulness

  FINAL GOAL:
  Make /trails-sightings feel like a fully developed Kashmir ecological access and field intelligence module, not just a good-looking directory of trails and sightings.
response_text: |
  Successfully upgraded the Trails & Sightings module from a directory-style page to a fully developed Kashmir ecological access and field intelligence system.

  ## Key Changes:

  ### 1. Architecture (8 Intelligence Bands)
  - Band 1: Hero + Command Surface - Repositioned as "Kashmir Ecological Access & Field Intelligence"
  - Band 1b: Metrics Ribbon - 5 key metrics (trails, sightings, observers, verified, districts)
  - Band 2: Trail Intelligence Overview - Enhanced cards with full ecological metadata
  - Band 3: Sighting Intelligence Overview - Analytical panels with verification breakdowns
  - Band 4: Map-Linked Ecological Access Preview - Interactive map placeholder with intelligence panel
  - Band 5: Seasonal Windows - Access conditions and optimal timing displays
  - Band 6: Recent Verified Field Intelligence - Kashmir-only filtered sightings
  - Band 7: Contribution & Verification Workflow - 3-step citizen science pathway
  - Band 8: Cross-Module Link Strip - Navigation to 7 related modules

  ### 2. Data Models (src/data/trails-sightings.ts)
  - TrailIntelligence interface with 20+ fields including district, habitat, altitude, season window, access status, sensitivity, related species/PA
  - SightingIntelligence interface with verification workflow, observer types, sensitivity masking
  - SightingAggregation for analytical breakdowns by district, season, habitat
  - Kashmir-only validation utilities with coordinate obfuscation for sensitive species
  - 10 flagship trail records with full metadata
  - 10 sighting records (all Kashmir-only, no Leh/Hemis)
  - 5 seasonal window definitions
  - 5 sighting aggregations with verification breakdowns

  ### 3. New Components
  - TrailIntelligenceCard: Enhanced card showing altitude, duration, season window, route condition, observer activity, sensitivity, access status
  - SightingAggregationPanel: Analytical panel with verification breakdown, district/habitat distributions, seasonal peaks, high-value records
  - SeasonalWindowDisplay: Month-by-month timeline, access conditions, associated trails/events
  - CrossModuleLinkStrip: Links to Protected Areas, Biodiversity, Water Systems, Seasonal Ecology, Risk & Monitoring, District Profiles, Atlas
  - VerificationStatusBadge: Verified/Reviewed/Community/Pending status indicators
  - SensitivityMask: Sensitive data masking with reveal functionality

  ### 4. Kashmir-Only Enforcement
  - All sighting records validated against KashmirDistrict type (16 districts)
  - No Leh/Hemis or other non-Kashmir locations in public view
  - Geographic bounds validation (lat: 32.5-34.8, lng: 73.5-75.8)
  - Coordinate obfuscation for sensitive species based on sensitivity level

  ### 5. Cross-Module Integration
  - Protected Areas: Trail links to related protected areas
  - Biodiversity: Species-linked trails and sightings
  - Water Systems: Wetland trails and aquatic sightings
  - Seasonal Ecology: Seasonal windows with bloom/migration events
  - Risk & Monitoring: High-altitude trail risk indicators
  - District Profiles: District-filtered trails and sightings
  - Atlas: Map preview with deep linking

  ## Build Status
  ✓ Build passed successfully (npm run build)
  ✓ TypeScript compilation successful
  ✓ Linting passed
  ✓ All routes generated (119 pages)

  ## Files Created/Modified
  - Created: 9 new files (spec, plan, data service, 6 components)
  - Modified: 1 file (page.tsx)
  - Total: ~1600 lines of new code

  ## Acceptance Criteria Met
  ✓ Module repositioned as ecological access & field intelligence
  ✓ 8 intelligence bands implemented with clear hierarchy
  ✓ Trail cards show full metadata (district, habitat, altitude, season, access, sensitivity)
  ✓ Sighting panels show analytical breakdowns (verified vs community, districts, seasons)
  ✓ Map preview with ecological access intelligence
  ✓ Seasonal windows with access conditions
  ✓ Kashmir-only filtering (no Leh/Hemis in public view)
  ✓ Cross-module links to all 7 target modules
  ✓ Premium, modern, scientific design maintained
  ✓ Build passes without errors
outcome: |
  The Trails & Sightings module has been successfully elevated from a directory-style page to a fully developed ecological intelligence system matching the architectural maturity of Water Systems and Risk & Monitoring modules.

  Key improvements:
  - Intelligence depth increased with 8 distinct bands
  - Trail cards now show 20+ metadata fields
  - Sighting panels provide analytical breakdowns
  - Kashmir-only enforcement prevents non-Kashmir content
  - Cross-module linking enables platform-wide navigation
  - Verification workflow clearly communicated
  - Seasonal windows guide user timing

  The module now feels like a scientific intelligence surface rather than a simple directory.
evaluation: |
  Success metrics to track post-deployment:
  - Time on page (target: +40% increase)
  - Trail card CTR (target: >15%)
  - Sighting panel expansion (target: >20%)
  - Cross-module navigation (target: >10% of users)
  - Submission conversion (target: +30%)
  - Lighthouse score (target: >90)

  Follow-up tasks:
  - Add actual map integration with trail layers
  - Implement real-time filtering by district/habitat
  - Connect to backend API for live data
  - Add user authentication for submissions
  - Implement expert verification workflow UI
  - Add trail condition reporting feature
