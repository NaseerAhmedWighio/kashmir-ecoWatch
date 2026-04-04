---
id: 13
title: Footer Upgrade and Six New Pages
stage: general
date_iso: 2026-04-04
surface: agent
model: qwen-code
feature: none
branch: main
user: naseer
command: footer-upgrade-and-new-pages
labels: ["footer", "module-directory", "entity-explorer", "live-incident-map", "alert-archive", "contribution-guidelines", "governance", "support-sponsorship"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - src/components/sections/AdvancedFooter.tsx
  - src/components/sections/Footer.tsx
  - src/app/module-directory/page.tsx
  - src/app/entity-explorer/page.tsx
  - src/app/live-incident-map/page.tsx
  - src/app/alert-archive/page.tsx
  - src/app/contribute-guidelines/page.tsx
  - src/app/about/governance/page.tsx
  - src/app/about/support-sponsorship/page.tsx
tests_yaml: |
  - TypeScript compilation check
  - Page rendering verification
prompt_text: |
  Update the footer with a new 6-column structure:
  - Platform: Atlas, Dashboards, Library, District Profiles, Module Directory, Entity Explorer
  - Monitoring: Alerts & Advisories, Monitoring Overview, Field Reports, Risk Updates, Live Incident Map, Alert Archive
  - Data & Trust: Data Sources, Methodology, Verification Model, Sensitivity & Privacy, Terms of Use, Accessibility Statement
  - Contribute: Report an Issue, Submit Sighting, Contribute Data, Citizen Science, Contribute Hub, Contribution Guidelines
  - Institution: About, Mission, Contact, Partners, Governance, Support & Sponsorship

  Then build 6 new pages:
  1. Module Directory - complete index of all platform modules organized in 8 groups
  2. Entity Explorer - browse-and-filter system for protected areas, water bodies, species, districts, monitoring zones
  3. Live Incident Map - real-time spatial view of active incidents with severity/status filters
  4. Alert Archive - searchable historical alert and advisory records
  5. Contribution Guidelines - evidence standards, submission rules, review logic, sensitivity rules
  6. Governance - governance structure, advisory framework, team organization, expert committee
  7. Support & Sponsorship - institutional backing, diaspora support, Dr. Kumar Foundation USA
response_text: |
  Updated AdvancedFooter and Footer with 6-column structure adding: Module Directory, Entity Explorer, Live Incident Map, Alert Archive, Terms of Use, Accessibility Statement, Contribute Hub, Contribution Guidelines, Governance, Support & Sponsorship.

  Built 7 new pages:
  - Module Directory: 8 groups, 95 total modules, card grid with icons and descriptions
  - Entity Explorer: 46 entities, 6 filter tabs, text search, icon mapping
  - Live Incident Map: 12 incidents, severity/status filters, summary strip, route mapping
  - Alert Archive: 12 historical alerts, 4 filter dropdowns, sorted by date, lifecycle explanation
  - Contribution Guidelines: evidence standards, acceptable submissions, pathway rules, review pipeline, sensitivity rules, conduct agreement
  - Governance: governance structure, team organization, advisory framework, leadership/oversight
  - Support & Sponsorship: Dr. Kumar Foundation USA, diaspora support, sponsorship framework, transparency
outcome: |
  Footer upgraded to 6-column structure. Seven new institutional pages created covering module discovery, entity browsing, live operations, historical records, contributor guidance, governance, and sponsorship.
---
