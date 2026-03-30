---
id: 7
title: Risk Monitoring Menu Structure Reorganization
stage: impl
date_iso: 2026-03-31
surface: agent
model: qwen-code
feature: risk-monitoring
branch: main
user: Naseer Ahmed
command: Reorganize Risk & Monitoring navigation menu into hierarchical category structure with Overview, Hazard Risks, Pollution & Stress, Biodiversity Risks, Response & Operations, Live Alerts, and Dashboards
labels: ["risk-monitoring", "navigation", "menu-restructure", "hierarchy", "ux-improvement"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml:
  - src/components/sections/Navigation.tsx
  - src/app/risk-monitoring/page.tsx
  - src/app/risk-monitoring/hazard-risks/page.tsx
  - src/app/risk-monitoring/pollution-stress/page.tsx
  - src/app/risk-monitoring/biodiversity-risks/page.tsx
  - src/app/risk-monitoring/response-operations/page.tsx
  - src/app/risk-monitoring/disaster-risks/page.tsx
  - src/app/risk-monitoring/flood-flash-flood-risks/page.tsx
  - src/app/risk-monitoring/landslide-slope-risks/page.tsx
  - src/app/risk-monitoring/avalanche-winter-risks/page.tsx
  - src/app/risk-monitoring/earthquake-risks/page.tsx
  - src/app/risk-monitoring/forest-fire-risks/page.tsx
  - src/app/risk-monitoring/glacier-cryosphere-risks/page.tsx
  - src/app/risk-monitoring/hydrological-risks/page.tsx
  - src/app/risk-monitoring/environmental-monitoring/page.tsx
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
  - src/app/risk-monitoring/incident-reports/page.tsx
  - src/app/risk-monitoring/district-risk-profiles/page.tsx
  - src/app/risk-monitoring/critical-infrastructure-response/page.tsx
  - src/app/risk-monitoring/shelters-closures-emergency-routes/page.tsx
tests_yaml:
  - Navigation dropdown renders 7 items correctly
  - Mobile menu renders 7 items correctly
  - Category pages render with correct breadcrumbs
  - All submodule pages have parent category breadcrumbs
  - TypeScript compilation passes with no errors
prompt_text: |
  Implement new top-level menu structure for Risk & Monitoring section.

  ==================================================
  NEW MENU STRUCTURE
  ==================================================

  Under Risk & Monitoring, keep only these items in this exact order:

  1. Overview
     Tag: Risk monitoring dashboard

  2. Hazard Risks
     Tag: Multi-hazard risk systems

  3. Pollution & Stress
     Tag: Environmental pressure monitoring

  4. Biodiversity Risks
     Tag: Ecological vulnerability tracking

  5. Response & Operations
     Tag: Response and operational intelligence

  6. Live Alerts
     Tag: Real-time warnings

  7. Dashboards
     Tag: Risk monitoring dashboards

  ==================================================
  REMOVE FROM FIRST SCREEN
  ==================================================

  Remove old direct first-screen entries:
  - Disaster Risks
  - Flood Risks
  - Landslide Risks

  These should be reorganized under Hazard Risks category.

  ==================================================
  CONTENT ARCHITECTURE
  ==================================================

  Hazard Risks should contain:
  - Disaster Risks
  - Flood & Flash Flood Risks
  - Landslide & Slope Risks
  - Avalanche & Winter Risks
  - Earthquake Risks
  - Forest Fire Risks
  - Glacier & Cryosphere Risks
  - Hydrological Risks

  Pollution & Stress should contain:
  - Environmental Monitoring
  - Air Pollution
  - Water Pollution
  - Noise Pollution
  - Soil Pollution
  - Climate Change
  - Global Warming Impacts
  - Algal Bloom Monitoring

  Biodiversity Risks should contain:
  - Biodiversity Risk Intelligence
  - Red Data / Species Vulnerability
  - Human-Wildlife Conflict
  - Wildlife Mortality / Kill Records
  - Fish Kill Monitoring
  - Bird Migration Monitoring
  - Bird Mortality / Kill Monitoring
  - Ecosystem Stress & Mortality

  Response & Operations should contain:
  - Live Alerts & Advisories
  - Incident Reports
  - District Risk Profiles
  - Critical Infrastructure & Response
  - Shelters
  - Closures & Emergency Routes
  - Risk Dashboards

  ==================================================
  REQUIRED BEHAVIOR
  ==================================================

  - Overview acts as top-level landing page
  - Hazard Risks, Pollution & Stress, Biodiversity Risks, and Response & Operations behave as category parents
  - Each parent category opens dedicated category page with submodule cards
  - Live Alerts and Dashboards remain direct top-level items
  - Navigation feels hierarchical, not flat list

  ==================================================
  IMPLEMENTATION
  ==================================================

  1. Update Navigation.tsx desktop dropdown with 7 items
  2. Update Navigation.tsx mobile submenu with 7 items
  3. Create 4 category pages:
     - /risk-monitoring/hazard-risks
     - /risk-monitoring/pollution-stress
     - /risk-monitoring/biodiversity-risks
     - /risk-monitoring/response-operations
  4. Update main overview page with 6 category cards
  5. Add breadcrumbs to all 28 submodule pages
  6. Verify all internal links point to correct routes

  ==================================================
  UX REQUIREMENTS
  ==================================================

  Design should feel:
  - Modern and compact
  - Structured and hierarchical
  - Enterprise-grade
  - Easy to scan
  - Consistent across all pages

response_text: |
  Implementation completed successfully.

  CHANGES MADE:

  1. Navigation.tsx Updated:
     - Desktop dropdown: 7 items (Overview, Hazard Risks, Pollution & Stress, Biodiversity Risks, Response & Operations, Live Alerts, Dashboards)
     - Mobile submenu: 7 items with same structure
     - Removed old direct links (Disaster Risks, Flood Risks, Landslide Risks)

  2. Category Pages Created (4 new pages):
     - /risk-monitoring/hazard-risks (8 hazard modules)
     - /risk-monitoring/pollution-stress (8 pollution modules)
     - /risk-monitoring/biodiversity-risks (8 biodiversity modules)
     - /risk-monitoring/response-operations (6 response modules)

  3. Overview Page Updated:
     - New 6-card category layout
     - Each card shows category name, description, module count
     - Quick access to all major categories

  4. Submodule Pages Updated (28 pages):
     - Added breadcrumbs to all pages
     - Parent category references added
     - "Back to" buttons point to parent categories
     - Overview buttons added for quick navigation

  5. Route Integrity:
     - All existing routes preserved
     - No broken links
     - TypeScript compilation passes

  NAVIGATION FLOW:

  Risk & Monitoring (Overview)
  ├── Hazard Risks (category page)
  │   ├── Disaster Risks
  │   ├── Flood & Flash Flood Risks
  │   ├── Landslide & Slope Risks
  │   ├── Avalanche & Winter Risks
  │   ├── Earthquake Risks
  │   ├── Forest Fire Risks
  │   ├── Glacier & Cryosphere Risks
  │   └── Hydrological Risks
  ├── Pollution & Stress (category page)
  │   ├── Environmental Monitoring
  │   ├── Air Pollution
  │   ├── Water Pollution
  │   ├── Noise Pollution
  │   ├── Soil Pollution
  │   ├── Climate Change
  │   ├── Global Warming Impacts
  │   └── Algal Bloom Monitoring
  ├── Biodiversity Risks (category page)
  │   ├── Biodiversity Risk Intelligence
  │   ├── Red Data / Species Vulnerability
  │   ├── Human-Wildlife Conflict
  │   ├── Wildlife Mortality / Kill Records
  │   ├── Fish Kill Monitoring
  │   ├── Bird Migration Monitoring
  │   ├── Bird Mortality / Kill Monitoring
  │   └── Ecosystem Stress & Mortality
  ├── Response & Operations (category page)
  │   ├── Live Alerts & Advisories
  │   ├── Incident Reports
  │   ├── District Risk Profiles
  │   ├── Critical Infrastructure & Response
  │   ├── Shelters, Closures & Emergency Routes
  │   └── Risk Dashboards
  ├── Live Alerts (direct)
  └── Dashboards (direct)

  VERIFICATION:
  - TypeScript compilation: PASSED
  - Navigation structure: CORRECT
  - Breadcrumbs: ADDED to all 28 submodule pages
  - Category pages: 4 created with correct module listings
  - Overview page: 6 category cards rendering correctly
outcome: |
  Menu reorganization completed successfully. The Risk & Monitoring section now has a clean, hierarchical structure with 7 top-level items and proper category pages for Hazard Risks, Pollution & Stress, Biodiversity Risks, and Response & Operations. All 28 submodule pages have breadcrumbs and parent category references. Navigation feels intentional and enterprise-grade.
