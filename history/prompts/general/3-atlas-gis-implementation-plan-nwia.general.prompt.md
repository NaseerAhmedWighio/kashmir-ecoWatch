---
id: 3
title: Atlas GIS Implementation Plan with NWIA Source Integration
stage: plan
date: 2026-03-29
surface: agent
model: qwen3.5
feature: atlas
branch: master
user: naseerahmed
command: resume with NWIA source integration and GIS implementation plan
labels: ["atlas", "gis", "leaflet", "water-systems", "implementation-plan"]
links:
  spec: specs/atlas/gis-implementation-plan.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/atlas/gis-implementation-plan.md
  - src/components/maps/AtlasMap.tsx
  - src/components/maps/layers/DistrictLayer.tsx
  - src/components/maps/layers/ProtectedAreaLayer.tsx
  - src/components/maps/layers/WaterBodyLayer.tsx
  - src/data/geojson/districts.geojson
  - src/data/geojson/lakes.geojson
  - src/data/geojson/wetlands.geojson
  - src/data/geojson/protected-areas.geojson
  - next.config.js
  - next-env.d.ts
tests:
  - npm run build
  - npx tsc --noEmit
---

## Prompt

Resume work on the Atlas GIS implementation with these corrections:

1. Phase 1 must render: district boundaries, protected areas, lakes, wetlands
2. Use the real locked route architecture already adopted in the platform
3. Add route integration earlier: feature click → highlight → drawer → real detail page
4. Explicitly remove all fake GIS remnants: hardcoded CSS marker positions, fake zoom counters, decorative marker-based pseudo-map logic
5. Keep the atlas Kashmir-specific from the start: Kashmir viewport, Kashmir district boundaries, Kashmir protected areas, Kashmir lakes and wetlands, Kashmir place relevance
6. Preserve the premium scientific observatory UI while rebuilding on real GIS foundations

Also integrate the NWIA Jammu and Kashmir Atlas as a Kashmir-specific wetland intelligence source for the Water Systems module.

## Response snapshot

Created comprehensive GIS implementation plan at `specs/atlas/gis-implementation-plan.md` with:

- 5-phase implementation structure (1A through 5)
- Real Leaflet GIS engine with Kashmir-centered viewport
- GeoJSON-based layers for districts, protected areas, lakes, wetlands
- Real route integration to locked platform routes
- Premium observatory UI specifications
- Anti-patterns section explicitly banning fake GIS remnants
- Complete file structure and design tokens
- Success metrics and testing strategy

Key corrections applied:
- Phase 1 scope expanded to include districts, protected areas, lakes, wetlands
- Route integration moved earlier in Phase 1D
- Locked routes used: `/protected-network/national-parks/[slug]`, `/water-systems/lakes/[slug]`, etc.
- Explicit "no fake GIS remnants" clause added
- Kashmir-specific content requirement enforced

## Outcome

- ✅ Impact: Created actionable, phased implementation plan for production-grade GIS atlas with real spatial data and Kashmir-specific content
- 🧪 Tests: TypeScript passes, build pending phase implementation
- 📁 Files: 1 new spec file created, existing map components validated
- 🔁 Next prompts: Begin Phase 1A implementation (Leaflet initialization + Kashmir viewport + basemap)
- 🧠 Reflection: Plan balances technical rigor with actionable steps; anti-patterns section prevents regression to fake GIS logic

## Evaluation notes (flywheel)

- Failure modes observed: None during planning phase
- Graders run and results: N/A (planning phase)
- Prompt variant: N/A
- Next experiment: Begin Phase 1A implementation - initialize Leaflet map with Kashmir viewport [34.0837, 74.7973] zoom 8, add CartoDB Dark basemap, verify smooth pan/zoom
