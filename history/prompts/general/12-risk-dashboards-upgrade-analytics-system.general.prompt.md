---
id: 12
title: Risk Dashboards Upgrade to Analytics System
stage: general
date_iso: 2026-04-04
surface: agent
model: qwen-code
feature: none
branch: main
user: naseer
command: upgrade-risk_dashboards-page
labels: ["risk-dashboards", "analytics", "dashboard-grouping", "module-routing", "intelligence"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - src/app/risk-monitoring/dashboards/page.tsx
tests_yaml: |
  - TypeScript compilation check
  - Page rendering verification
  - Dashboard card count (17 total)
prompt_text: |
  The live Risk Dashboards page uses old architecture (Seasonal Ecology, Trails & Sightings in nav), has a flat 6-card dashboard list with only title/category/metrics/live, no summary strip, no dashboard grouping, no status logic, no module routing, no platform role explanation, and Air Quality Index not framed as risk-facing. Need full restructure into 4 grouped sections (Strategic Overview, Hazard, Environmental Escalation, Operational) with 17 dashboard cards each showing: name, type, description, metrics count, status badge (Live/Periodic/Analytical/Under Expansion), feeds/modules, open CTA. Add top summary strip (active signals, districts under watch, open incidents, live alert-linked dashboards, last updated). Add "How dashboards support the platform" section. Rename Air Quality Index to Air Risk Signals. Keep existing trend charts.
response_text: |
  Rebuilt Risk Dashboards page into full Risk Analytics system with:
  - Hero with breadcrumb, "Risk Analytics" badge, "Risk Dashboards" title, integrated copy
  - Top summary strip: Active High-Risk Signals (89), Districts Under Watch (20), Open Incidents (8), Live Alert-Linked Dashboards (7), Last Updated (Live)
  - "How Dashboards Support the Platform" section explaining synthesis role
  - 4 grouped dashboard sections with 17 total cards:
    Strategic Overview (3): Multi-Hazard Overview, District Risk Scores, District Operations Summary
    Hazard Dashboards (6): Flood Risk, Landslide Monitoring, Avalanche & Winter, Forest Fire, Glacier & Cryosphere, Hydrological Risk
    Environmental Escalation (4): Air Risk Signals, Environmental Incident Risk, Water Quality Escalation, Sewage & Wastewater Event
    Operational Dashboards (4): Incident Response Tracker, Closures & Route Status, Advisory Timeline, Field Response Status
  - Each card: icon, name, type, description, metrics count, status badge, feeds tags, open CTA
  - Status types: Live (7), Periodic (5), Analytical (1), Under Expansion (1) — no uniform "live" treatment
  - Module routing on every card (e.g., Flood Risk → Water Systems + Risk & Monitoring + Alerts)
  - Air Quality Index renamed to "Air Risk Signals" framed as escalation-facing complement to Air & Noise Monitoring
  - Kept existing alert trend and incident volume bar charts with descriptions
outcome: |
  Page transformed from 6 flat placeholder cards into 17-card grouped analytics system with summary strip, status logic, module routing, and platform role explanation.
---
