---
id: 51
title: Create Environmental Monitoring Domain Pages
stage: impl
date: 2026-04-04T12:00:00Z
surface: agent
model: qwen-code
feature: environmental-monitoring
branch: main
user: naseerahmed
command: Create drinking-water, critical-infrastructure, air-pollution, environmental-health, utility-incidents, and dashboards pages for Environmental Monitoring module
labels: ["environmental-monitoring", "page-creation", "navigation", "information-architecture", "drinking-water", "critical-infrastructure", "air-pollution", "environmental-health", "utility-incidents", "dashboards"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - src/app/environmental-monitoring/air-pollution/page.tsx
  - src/app/environmental-monitoring/environmental-health/page.tsx
  - src/app/environmental-monitoring/utility-incidents/page.tsx
  - src/app/environmental-monitoring/dashboards/page.tsx
  - src/app/environmental-infrastructure/page.tsx (deleted)
tests: []
---

## Prompt

Resume and complete the Environmental Monitoring module implementation by creating the remaining domain-specific pages and cleaning up legacy infrastructure.

**Context:**
The Environmental Monitoring module was previously named "Environmental Infrastructure" and has been renamed in navigation. Several pages (solid-waste, bio-waste, sewage-wastewater, drinking-water, critical-infrastructure, overview) already existed. Four pages were still missing: air-pollution, environmental-health, utility-incidents, and dashboards.

**Tasks completed:**

1. **Verified existing pages (already complete):**
   - ✅ `/environmental-monitoring/` overview page (command-center landing)
   - ✅ `/environmental-monitoring/solid-waste` page
   - ✅ `/environmental-monitoring/bio-waste` page
   - ✅ `/environmental-monitoring/sewage-wastewater` page
   - ✅ `/environmental-monitoring/drinking-water` page (551 lines)
   - ✅ `/environmental-monitoring/critical-infrastructure` page (542 lines)

2. **Created new pages (this task):**
   - ✅ `/environmental-monitoring/air-pollution` page (405 lines)
     - Pollutant indicator cards (PM2.5, PM10, NO₂, SO₂, O₃, CO)
     - District air quality profiles table with AQI, trends, dominant pollutants
     - Emission source advisories (heating, traffic, construction, crop burning)
     - Recent incident feed with verification badges
   - ✅ `/environmental-monitoring/environmental-health` page (434 lines)
     - Health signal matrix (fish kills, stagnant water, odor, algal blooms, vector sites, bio-indicators)
     - District health signal profiles table
     - Environmental health advisories with source attribution
     - Recent health incident feed
   - ✅ `/environmental-monitoring/utility-incidents` page (443 lines)
     - Incident type matrix (water failures, sewage overflows, power disruptions, emergency notices, infrastructure damage, citizen complaints)
     - District incident profiles table
     - Active advisories and emergency notices
     - Recent utility incident feed
   - ✅ `/environmental-monitoring/dashboards` page (431 lines)
     - Quick analytics ribbon (stress index, compliance rate, active monitors, data availability)
     - Analytics dashboard modules grid (6 dashboard types with status badges)
     - District aggregate profiles table with stress index visualization
     - Dashboard feature highlights (real-time monitoring, predictive analytics, geospatial intelligence)
     - Coming soon section (biodiversity risk, climate impact, citizen science, export tools)

3. **Navigation verification:**
   - ✅ Navigation.tsx already updated with "Environmental Monitoring" label (not "Environmental Infrastructure")
   - ✅ All 9 sub-pages linked in navigation dropdown

4. **Cleanup:**
   - ✅ Deleted old `/environmental-infrastructure/` directory (legacy page)
   - ✅ No orphaned routes remain

**Design pattern followed:**
All pages follow consistent architecture:
- Hero section with gradient background, breadcrumb nav, title, icon, badge, description
- Metrics ribbon with 5 key indicators
- Map preview placeholder (80% of pages)
- Domain-specific content cards/tables
- Source-linked advisories or incident feeds
- Cross-links section (4 related domain pages)
- AdvancedFooter

**Color scheme per domain:**
- Drinking Water: cyan/teal
- Critical Infrastructure: indigo/blue
- Solid Waste: gray/slate
- Bio-Waste: emerald/green
- Sewage/Wastewater: blue/cyan
- Air Pollution: slate/gray
- Environmental Health: amber/orange
- Utility Incidents: red/rose
- Dashboards: violet/purple

**New top-level Environmental Monitoring structure:**
1. Overview (command-center) → `/environmental-monitoring`
2. Solid Waste → `/environmental-monitoring/solid-waste`
3. Bio-Waste → `/environmental-monitoring/bio-waste`
4. Sewage & Wastewater → `/environmental-monitoring/sewage-wastewater`
5. Drinking Water → `/environmental-monitoring/drinking-water`
6. Critical Water Infrastructure → `/environmental-monitoring/critical-infrastructure`
7. Air Pollution → `/environmental-monitoring/air-pollution`
8. Environmental Health Signals → `/environmental-monitoring/environmental-health`
9. Utility Incidents & Advisories → `/environmental-monitoring/utility-incidents`
10. Dashboards → `/environmental-monitoring/dashboards`

## Response

Created 4 new pages (air-pollution, environmental-health, utility-incidents, dashboards) completing the Environmental Monitoring module. Verified 6 existing pages were already complete. Deleted legacy environmental-infrastructure directory. All 10 domain pages now follow consistent design patterns with cross-linking.
