---
id: 49
title: Replace Seasonal Ecology with Environmental Infrastructure
stage: impl
date: 2026-04-04T00:00:00Z
surface: agent
model: qwen-code
feature: navigation
branch: main
user: naseerahmed
command: Restructure platform: replace Seasonal Ecology top-level module with Environmental Infrastructure Monitoring
labels: ["navigation", "seasonal-ecology", "environmental-infrastructure", "information-architecture", "restructuring"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - src/components/sections/Navigation.tsx
  - src/components/sections/PremiumStickyHeader.tsx
  - src/app/environmental-infrastructure/page.tsx
  - src/app/risk-monitoring/pollution-stress/page.tsx
tests: []
---

## Prompt

Restructure the platform by replacing the "Seasonal Ecology" top-level navigation module with "Environmental Infrastructure Monitoring".

**Rationale:**
Seasonal Ecology in its present form reads more like a research and interpretive ecology layer (phenology, migration, pollination, bloom cycles, habitat timing) than a high-priority operational intelligence system. The homepage already gives high visibility to Pollution & Environmental Stress, wetland stress watch, algal bloom activity, and air quality signals — making Environmental Infrastructure Monitoring a much stronger top-level pillar.

**What was done:**

1. **Navigation.tsx changes:**
   - Replaced `{ label: 'Seasonal Ecology', href: '/seasonal-ecology' }` with `{ label: 'Environmental Infrastructure', href: '/environmental-infrastructure' }`
   - Replaced entire Seasonal Ecology dropdown (11 subitems) with Environmental Infrastructure dropdown:
     - Overview → `/environmental-infrastructure`
     - Air Pollution → `/risk-monitoring/air-pollution`
     - Water Pollution → `/risk-monitoring/water-pollution`
     - Noise Pollution → `/risk-monitoring/noise-pollution`
     - Soil Pollution → `/risk-monitoring/soil-pollution`
     - Climate Change → `/risk-monitoring/climate-change`
     - Global Warming Impacts → `/risk-monitoring/global-warming-impacts`
   - Added new icon imports: Factory, Recycle, Building2, Trash2, Pipe, Stethoscope

2. **PremiumStickyHeader.tsx changes:**
   - Same navItems replacement
   - Replaced `case 'Seasonal Ecology'` with `case 'Environmental Infrastructure'` in getDropdownItems()
   - Added Factory, Recycle icon imports

3. **New Environmental Infrastructure overview page:**
   - Created `/environmental-infrastructure/page.tsx`
   - Hero: "Environmental Infrastructure" with amber-orange gradient
   - Metrics ribbon: 6 monitoring domains, 20 districts, 147 stations, 24/7 monitoring
   - 6 module cards: Air Pollution, Water Pollution, Noise Pollution, Soil Pollution, Climate Change, Global Warming Impacts
   - About section: Public Health Signals, Climate Vulnerability, Governance Intelligence

4. **Seasonal Ecology pages kept but orphaned:**
   - All 14 pages under `/seasonal-ecology/` remain at their routes (not deleted)
   - No longer accessible from navigation dropdowns
   - Future migration to Biodiversity/Water Systems/Trails/Research Library is planned

5. **Previous related changes (this session):**
   - Moved Algal Bloom from Risk & Monitoring to Water Systems as "Algal Bloom Intelligence"
   - Removed Algal Bloom entry from Pollution & Stress page
   - Fixed WaterEntityListingPage to show 4 filters in single row

**New top-level architecture:**
1. Protected Areas — Protected landscapes, reserves, ecological protection zones
2. Biodiversity — Species, habitats, migration, pollination, phenology, ecological behavior
3. Water Systems — Lakes, wetlands, rivers, springs, water quality, blooms, hydrological transitions
4. Environmental Infrastructure — Air/water/soil/noise pollution, climate change, global warming impacts
5. Trails & Sightings — Field routes, seasonal access, ecological observation corridors, reporting
6. Risk & Monitoring — Hazards, alerts, advisories, live incidents, district risk, emergency operations

## Response

Replaced Seasonal Ecology with Environmental Infrastructure Monitoring across all navigation components. Created new overview page with 6 pollution/climate monitoring modules. Seasonal Ecology pages remain accessible at their routes but are orphaned from navigation.

**Key architectural decision:**
Do NOT delete seasonal content — keep it at existing routes for now. Future work will redistribute relevant seasonal pieces (migration, pollination → Biodiversity; bloom zones, water transitions → Water Systems; climate windows → Trails; reports → Research Library).

## Outcome

Successfully restructured top-level navigation from 6 modules to 6 modules (replaced one, not added). Environmental Infrastructure Monitoring is now a first-class citizen alongside Water Systems, Biodiversity, and Risk & Monitoring. Platform identity shifted from research-oriented to operational monitoring-oriented.
