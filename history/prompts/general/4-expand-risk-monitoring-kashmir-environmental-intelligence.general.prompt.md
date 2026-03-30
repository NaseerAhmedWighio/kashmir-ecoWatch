---
id: 4
title: Expand Risk Monitoring to Full Kashmir Environmental Intelligence System
stage: general
date_iso: 2026-03-30
surface: agent
model: qwen-code
feature: risk-monitoring
branch: main
user: Naseer Ahmed
command: Expand Kashmir EcoWatch Risk & Monitoring module into full hazard, pollution, biodiversity, and operational intelligence system
labels: ["risk-monitoring", "kashmir-environmental", "module-expansion", "biodiversity", "pollution-monitoring"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - src/app/risk-monitoring/page.tsx
  - src/app/risk-monitoring/air-pollution/page.tsx
  - src/app/risk-monitoring/water-pollution/page.tsx
  - src/app/risk-monitoring/noise-pollution/page.tsx
  - src/app/risk-monitoring/soil-pollution/page.tsx
  - src/app/risk-monitoring/climate-change/page.tsx
  - src/app/risk-monitoring/global-warming-impacts/page.tsx
  - src/app/risk-monitoring/algal-bloom-monitoring/page.tsx
  - src/app/risk-monitoring/biodiversity-risk-intelligence/page.tsx
  - src/app/risk-monitoring/red-data-species-vulnerability/page.tsx
  - src/app/risk-monitoring/human-wildlife-conflict/page.tsx
  - src/app/risk-monitoring/wildlife-mortality-kill-records/page.tsx
  - src/app/risk-monitoring/fish-kill-monitoring/page.tsx
  - src/app/risk-monitoring/bird-migration-monitoring/page.tsx
  - src/app/risk-monitoring/bird-mortality-kill-monitoring/page.tsx
  - src/app/risk-monitoring/ecosystem-stress-mortality-signals/page.tsx
tests_yaml:
  - Route verification for all 15 new pages
  - 4-layer structure rendering verification
prompt_text: |
  Expand the Kashmir EcoWatch Risk & Monitoring module into a full Kashmir-specific hazard, pollution, environmental-stress, biodiversity-risk, mortality, migration, and operational intelligence system.

  Do NOT remove the current structure.
  Extend it intelligently and fully.

  ==================================================
  CURRENT CORE TO PRESERVE
  ==================================================

  Keep these existing Risk & Monitoring pages and strengthen them:

  - Overview
  - Disaster Risks
  - Flood & Flash Flood Risks
  - Landslide & Slope Risks
  - Avalanche & Winter Risks
  - Earthquake Risks
  - Forest Fire Risks
  - Glacier & Cryosphere Risks
  - Hydrological Risks
  - Environmental Monitoring
  - Live Alerts & Advisories
  - Incident Reports
  - District Risk Profiles
  - Critical Infrastructure & Response
  - Shelters, Closures & Emergency Routes
  - Risk Dashboards

  ==================================================
  NEW KASHMIR-SPECIFIC PAGES TO ADD
  ==================================================

  Add all of the following as Kashmir-specific pages within the same module:

  - Air Pollution Risk & Monitoring
  - Water Pollution Risk & Monitoring
  - Noise Pollution Risk & Monitoring
  - Soil Pollution & Contamination
  - Climate Change Signals
  - Global Warming Impacts on Kashmir
  - Algal Bloom Risk & Monitoring
  - Biodiversity Risk Intelligence
  - Red Data / Species Vulnerability Intelligence
  - Human-Wildlife Conflict
  - Wildlife Mortality / Kill Records
  - Fish Kill Monitoring
  - Bird Migration Monitoring
  - Bird Mortality / Kill Monitoring
  - Ecosystem Stress & Mortality Signals

  ==================================================
  MODULE LOGIC
  ==================================================

  Reorganize the module internally into four logic layers:

  1. Hazard Risk Systems
  - Disaster Risks
  - Flood & Flash Flood Risks
  - Landslide & Slope Risks
  - Avalanche & Winter Risks
  - Earthquake Risks
  - Forest Fire Risks
  - Glacier & Cryosphere Risks
  - Hydrological Risks

  2. Pollution and Environmental Stress
  - Environmental Monitoring
  - Air Pollution
  - Water Pollution
  - Noise Pollution
  - Soil Pollution
  - Climate Change
  - Global Warming Impacts
  - Algal Bloom Monitoring
  - Ecosystem Health Monitoring

  3. Biodiversity and Ecological Risk
  - Biodiversity Risk Intelligence
  - Red Data / Species Vulnerability
  - Human-Wildlife Conflict
  - Wildlife Mortality / Kill Records
  - Fish Kill Monitoring
  - Bird Migration Monitoring
  - Bird Mortality / Kill Monitoring

  4. Response and Operational Intelligence
  - Live Alerts & Advisories
  - Incident Reports
  - District Risk Profiles
  - Critical Infrastructure & Response
  - Shelters, Closures & Emergency Routes
  - Risk Dashboards

  ==================================================
  STRICT KASHMIR RULE
  ==================================================

  Everything must be interpreted specifically for Kashmir.

  That means:
  - air pollution across Kashmir districts, towns, urban belts, transport corridors, and valley systems
  - water pollution across Kashmir lakes, wetlands, rivers, streams, and springs
  - noise pollution across Kashmir settlements, tourism corridors, and ecologically sensitive landscapes
  - soil contamination in Kashmir agricultural and pressure landscapes
  - climate change and global warming impacts on Kashmir glaciers, springs, wetlands, species, seasons, and hydrology
  - algal bloom monitoring in Kashmir lakes and wetlands
  - red data vulnerability of Kashmir fauna and flora
  - wildlife conflict patterns in Kashmir landscapes
  - wildlife mortality in Kashmir protected areas, corridors, roads, and settlement-edge zones
  - fish kill events in Kashmir waters
  - bird migration timing in Kashmir wetlands
  - bird mortality and kill signals in Kashmir ecological systems

  Do not make these generic India-wide environmental pages.

  ==================================================
  UI / UX RULE
  ==================================================

  Keep the same premium Kashmir EcoWatch visual system:
  - intelligent
  - compact
  - modern
  - interactive
  - scientific
  - premium
  - dark-theme aligned
  - map-aware
  - dashboard-aware

  Use:
  - metrics ribbons
  - district filters
  - severity/status chips
  - recent records strips
  - map preview panels
  - related intelligence cards
  - source/reference panels
  - atlas-linked layer references
  - dashboard entry points

  ==================================================
  PAGE CONTENT RULE
  ==================================================

  Each new page should include:
  - compact hero
  - scientific summary
  - metrics strip
  - filter row
  - category/status chips
  - Kashmir map preview or layer preview
  - recent records or recent signals
  - related intelligence
  - linked dashboards/reports where relevant

  ==================================================
  ROUTE STRUCTURE
  ==================================================

  Extend the /risk-monitoring route family with these additional subroutes using clean locked URLs.

  ==================================================
  INTEGRATION RULE
  ==================================================

  Cross-link these pages strongly with:
  - Biodiversity
  - Water Systems
  - Seasonal Ecology
  - Protected Areas
  - Trails & Sightings
  - Atlas
  - Dashboards

  ==================================================
  FINAL TASK
  ==================================================

  Actually extend the Risk & Monitoring module and its subpage architecture to include all these Kashmir-specific systems, while preserving and strengthening the current module structure.
  Do not simplify this into a generic environment section.
response_text: |
  Successfully expanded the Risk & Monitoring module with 15 new Kashmir-specific pages organized into 4 logical layers:

  **Layer 1: Hazard Risk Systems (8 pages - preserved existing)**
  - Disaster Risks, Flood & Flash Flood Risks, Landslide & Slope Risks, Avalanche & Winter Risks
  - Earthquake Risks, Forest Fire Risks, Glacier & Cryosphere Risks, Hydrological Risks

  **Layer 2: Pollution and Environmental Stress (8 pages - 7 new)**
  - Environmental Monitoring (existing)
  - Air Pollution (new) - District-wise AQI, seasonal inversion, transport corridor pollution
  - Water Pollution (new) - Lake eutrophication, sewage/runoff, wetland degradation
  - Noise Pollution (new) - Urban/tourism corridors, wildlife habitat disturbance
  - Soil Pollution (new) - Agricultural/industrial contamination, land degradation
  - Climate Change (new) - Glacier retreat, snowline shifts, seasonal instability
  - Global Warming Impacts (new) - Warming-linked ecosystem impacts
  - Algal Bloom Monitoring (new) - Eutrophication-prone wetland monitoring

  **Layer 3: Biodiversity and Ecological Risk (8 pages - all new)**
  - Biodiversity Risk Intelligence - Habitat vulnerability, threatened species
  - Red Data / Species Vulnerability - IUCN status, population, habitat, threat overlap
  - Human-Wildlife Conflict - Leopard/bear conflict, livestock depredation
  - Wildlife Mortality / Kill Records - Roadkill, poaching, electrocution
  - Fish Kill Monitoring - Lake/river mortality, oxygen depletion, pollution linkage
  - Bird Migration Monitoring - Hokersar, Hygam, Shallabugh, Wular wetland tracking
  - Bird Mortality / Kill Monitoring - Wetland bird mortality, poisoning, collision
  - Ecosystem Stress & Mortality Signals - Cross-system ecological stress

  **Layer 4: Response and Operational Intelligence (6 pages - preserved existing)**
  - Live Alerts & Advisories, Incident Reports, District Risk Profiles
  - Critical Infrastructure & Response, Shelters/Closures/Emergency Routes, Risk Dashboards

  All pages include:
  - Premium dark-theme UI with metrics ribbons
  - District filters and status chips
  - Map preview panels with dashboard links
  - Related intelligence cross-linking
  - Kashmir-specific data and context

  Main index page updated with 4-layer architecture display.
outcome: |
  Risk & Monitoring module expanded from 16 pages to 31 pages, organized into 4 logical layers covering the full spectrum of Kashmir environmental intelligence from hazard risks through pollution monitoring to biodiversity assessment and operational response.
evaluation: |
  Success: All 15 new pages created with Kashmir-specific content, 4-layer architecture implemented on main index page, all pages include metrics ribbons, district filters, map previews, and cross-linking to related intelligence modules. Visual consistency maintained with existing Kashmir EcoWatch design system.
