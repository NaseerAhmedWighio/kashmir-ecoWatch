---
id: 49
title: Water Systems Menu Label Cleanup and Reordering
stage: impl
date: 2026-04-04T00:00:00Z
surface: agent
model: qwen-code
feature: water-systems
branch: main
user: naseerahmed
command: Upgrade Water Systems dropdown menu with cleaner labels, reordering, and new items
labels: ["water-systems", "navigation", "ui-cleanup", "menu-restructure"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - src/components/sections/PremiumStickyHeader.tsx
  - src/components/sections/Navigation.tsx
tests:
  - null
---

## Prompt Text

Yes. This Water Systems module is already much stronger than the earlier Biodiversity dropdown, but I would still refine it.

Key changes requested:
1. Remove repeated "All" prefix from Lakes, Wetlands, Springs, Watersheds → use cleaner labels: Lakes, Wetlands, Springs, Watersheds
2. Rename "Fisheries & Aquatic Life" → "Aquatic Life & Fisheries"
3. Add "Drinking Water Sources" (new page)
4. Add "Dashboards" (new page)
5. Reorder items: natural system layers → monitoring/condition → action/intervention → risk → dashboards

## Final upgraded Water Systems menu

- Overview
- Lakes
- Wetlands
- Rivers & Streams
- Springs
- Watersheds
- Glaciers & Cryosphere
- Drinking Water Sources
- Water Quality
- Algal Bloom Intelligence
- Aquatic Life & Fisheries
- Restoration & Rejuvenation
- Flood & Hydrological Risk
- Dashboards

## Response Summary

Updated both `PremiumStickyHeader.tsx` and `Navigation.tsx` Water Systems dropdown menus:

**Label changes:**
- "All Lakes" → "Lakes"
- "All Wetlands" → "Wetlands"
- "All Springs" → "Springs"
- "All Watersheds" → "Watersheds"
- "Fisheries & Aquatic Life" → "Aquatic Life & Fisheries"

**New items added:**
- "Drinking Water Sources" → `/water-systems/drinking-water-sources` (desc: "Spring & surface supply vulnerability")
- "Dashboards" → `/water-systems/dashboards` (desc: "Analytics, trends & heatmaps")

**Reordered** to follow: natural systems → monitoring → intelligence → aquatic life → restoration → risk → dashboards

Both files already had all required icon imports (BarChart3, Droplet, etc.). No new imports needed.

## Outcome

Navigation menu successfully upgraded in both header components. The Water Systems dropdown now uses cleaner labels, includes Drinking Water Sources and Dashboards, and follows a logical intelligence flow from hydrological assets → quality monitoring → ecological intelligence → risk → analytics.
