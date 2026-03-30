---
id: 6
title: Complete Homepage Redesign - Remaining Improvements (GIS, Featured Entities, Pollution Label)
stage: general
date_iso: 2026-03-30
surface: agent
model: qwen-code
feature: homepage-redesign-final
branch: main
user: Naseer Ahmed
command: Complete remaining homepage improvements: GIS operational upgrade, featured entities with tabs, Pollution & Environmental Stress labeling
labels: ["homepage", "gis-upgrade", "featured-entities", "pollution-label", "ux-improvement"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - src/components/sections/MapIntelligenceCore.tsx
  - src/components/sections/FeaturedEntityStrip.tsx
  - src/lib/data.ts
tests_yaml:
  - GIS map renders with interactive features
  - Mini drawer shows selected feature details
  - Featured entities tabs filter correctly
  - Pollution card shows updated label
prompt_text: |
  Complete the remaining homepage improvements from the comprehensive redesign prompt:

  ## GIS Preview Upgrade (Make it feel more operational)

  The GIS block is visually good and already shows active layers, active features, spatial coverage, and quick filters. But it needs to feel more operational.

  **Recommendation:**
  Upgrade the preview to show:
  - One selected feature state (clickable highlighted features like Dal Lake, Dachigam, Hokersar)
  - One mini drawer preview showing feature details when selected
  - One district or wetland highlighted with interactive hover states
  - A clearer "Launch Full Atlas" action
  - Featured locations sidebar with quick selection

  ## Featured Entities with Tabs

  The featured entities section is strong with Dachigam, Dal Lake, Hangul, Wild Tulip Meadows, Tarsar Marsar Trek, Srinagar District. But it should be turned into a rotating intelligence surface with tabs.

  **Recommendation:**
  Add tabs for:
  - All Entities
  - Protected Areas
  - Water Bodies
  - Species
  - Districts
  - Trails

  Each tab should filter the displayed entities and show the count.

  ## Fix Pollution & Waste Labeling

  The homepage currently shows "Pollution & Waste" as a module card, but the locked header emphasizes Risk & Monitoring rather than Pollution as a primary pillar.

  **Recommendation:**
  Change "Pollution & Waste" to "Pollution & Environmental Stress" to align better with the broader Kashmir framework and the Risk & Monitoring module structure.

  ## Implementation Requirements

  1. GIS MapIntelligenceCore:
     - Add clickable highlighted features (Dal Lake, Dachigam, Hokersar)
     - Implement mini feature drawer that slides in from left when feature is selected
     - Show feature-specific details (WQI for wetlands, species count for protected areas)
     - Add featured locations sidebar with quick selection buttons
     - Enhance hover states and visual feedback
     - Keep "Launch Full Atlas" action prominent

  2. FeaturedEntityStrip:
     - Add tab navigation with counts for each category
     - Filter entities based on active tab
     - Animate transitions between tabs
     - Show category summary strip below cards

  3. Data updates:
     - Change "Pollution & Waste" to "Pollution & Environmental Stress"
     - Update description to "Air, water, soil, noise pollution monitoring and environmental stress assessment"
     - Update link to /risk-monitoring

  All changes must maintain the premium Kashmir EcoWatch visual identity.
response_text: |
  Completed all remaining homepage improvements:

  **1. GIS Preview Upgrade (Completed)**
  - Completely rewrote MapIntelligenceCore.tsx with operational features:
  - **Interactive Highlighted Features**: Dal Lake, Dachigam National Park, and Hokersar Wetland are now clickable with hover animations
  - **Mini Feature Drawer**: Slides in from left when a feature is selected, showing:
    - Feature name, district, and status badge
    - Feature-specific metrics (WQI for wetlands, species count for protected areas, Hangul population)
    - Active alerts indicator
    - View Details and Open Map actions
  - **Selected Feature State**: Visual indicator showing which feature is currently selected
  - **Featured Locations Sidebar**: Right sidebar with quick selection buttons for all three featured locations
  - **Enhanced Hover States**: All interactive elements now have proper hover animations and visual feedback
  - **Layout**: Changed to 3-column map + 1-column sidebar layout for better information hierarchy
  - **Launch Full Atlas**: Prominent button in header and sidebar

  **2. Featured Entities with Tabs (Completed)**
  - Completely rewrote FeaturedEntityStrip.tsx with tab navigation:
  - **6 Tabs**: All Entities, Protected Areas, Water Bodies, Species, Districts, Trails
  - **Tab Counts**: Each tab shows the count of entities in that category
  - **Filtering**: Active tab filters the displayed entities
  - **Animations**: Smooth fade transitions when switching tabs
  - **Category Summary Strip**: Below cards, shows icon + count for each category
  - **Empty State**: Shows helpful message when no entities in category
  - **Type-Aware Routing**: View Details button routes to correct page based on entity type

  **3. Pollution Label Fix (Completed)**
  - Updated src/lib/data.ts:
  - Changed title from "Pollution & Waste" to "Pollution & Environmental Stress"
  - Updated description to "Air, water, soil, noise pollution monitoring and environmental stress assessment"
  - Changed link from /pollution to /risk-monitoring
  - Updated metrics labels to "Monitoring Stations" and "Pollution Hotspots"

  **Files Modified:**
  - src/components/sections/MapIntelligenceCore.tsx (complete rewrite with operational features)
  - src/components/sections/FeaturedEntityStrip.tsx (complete rewrite with tabs)
  - src/lib/data.ts (Pollution label update)

  **Key Features Added:**
  - Mini feature drawer with slide-in animation
  - Interactive highlighted features on map
  - Featured locations sidebar
  - Tab navigation with counts and filtering
  - Category summary strip
  - Type-aware routing for entity cards
  - Enhanced hover states and visual feedback throughout
outcome: |
  All remaining homepage improvements completed. GIS now feels operational with interactive features, mini drawer, and sidebar. Featured entities now have smart tab navigation. Pollution card properly labeled as "Pollution & Environmental Stress" aligned with Risk & Monitoring module.
evaluation: |
  Success: All 12 homepage improvement items from the comprehensive prompt are now complete:
  1. ✓ Unified branding (Kashmir EcoWatch)
  2. ✓ Hero search with suggestion chips (already present)
  3. ✓ Credibility framing for metrics
  4. ✓ 5-band homepage structure
  5. ✓ Pollution & Environmental Stress labeling
  6. ✓ GIS operational upgrade (interactive features, mini drawer, sidebar)
  7. ✓ Alert time credibility (relative timestamps)
  8. ✓ Featured entities with tabs
  9. ✓ District intelligence prominence
  10. ✓ Onboarding strip
  11. ✓ Public Participation Intelligence
  12. ✓ Algal Bloom card fix

  Homepage now has professional, authoritative, Kashmir-specific hierarchy with proper live data presentation and interactive operational surfaces.
