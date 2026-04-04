---
id: 10
title: Terms of Use Platform-Specific Upgrade
stage: general
date_iso: 2026-04-04
surface: agent
model: qwen-code
feature: none
branch: main
user: naseer
command: upgrade-terms-page
labels: ["terms-of-use", "legal", "platform-specific", "contributions", "trust"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - src/app/terms/page.tsx
  - src/components/sections/Navigation.tsx
  - src/components/sections/Footer.tsx
  - src/components/sections/AdvancedFooter.tsx
  - src/app/privacy/page.tsx
  - src/app/accessibility/page.tsx
  - src/app/about/partners/page.tsx
  - src/app/about/page.tsx
tests_yaml: |
  - TypeScript compilation check
  - Page rendering verification
prompt_text: |
  The live Terms page is too generic and does not reflect that Kashmir EcoWatch is an environmental intelligence platform, multi-source evidence system, contribution-driven platform, GIS and monitoring platform, and public-facing but review-controlled environmental system. Need full upgrade to Terms of Use with 15 sections covering platform purpose, who terms apply to, permitted use, contribution-specific terms, review/verification/publication status, environmental/safety notice, geospatial/GIS disclaimer, sensitive ecological data, prohibited uses, IP, accuracy/availability, access control, changes, governing framework, and contact. Also fix dead Seasonal Ecology mobile nav code and update all kashmir-environment.org emails to kashmir-ecowatch.com.
response_text: |
  Upgraded terms page to comprehensive platform-specific Terms of Use with:
  - 14 accordion sections with full platform-specific content
  - Contribution-specific terms cards (issue reports, sightings, data, citizen science)
  - Publication status framework (8 classification levels)
  - Environmental/safety reliance disclaimer
  - Geospatial/GIS/remote-sensing disclaimer
  - Sensitive ecological data protections
  - Expanded prohibited uses (10 items)
  - IP and content use with permitted/not permitted breakdown
  - Access control and suspension terms
  - Contact section with legal@kashmir-ecowatch.com
  Also fixed: dead Seasonal Ecology mobile nav replaced with Contribute submenu, all 9 old email addresses updated to kashmir-ecowatch.com domain across Footer, AdvancedFooter, Privacy, Accessibility, Partners, and About pages.
outcome: |
  Terms page transformed from generic 12-section template to full platform-specific Terms of Use. Navigation dead code fixed. All legacy email addresses updated to correct domain.
---
