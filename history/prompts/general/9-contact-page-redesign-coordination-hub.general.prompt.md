---
id: 9
title: Contact Page Redesign to Coordination Hub
stage: general
date_iso: 2026-04-04
surface: agent
model: qwen-code
feature: none
branch: main
user: naseer
command: rebuild-contact-page
labels: ["contact-page", "ui-redesign", "trust", "routing", "forms"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files_yaml: |
  - src/app/about/contact/page.tsx
tests_yaml: |
  - TypeScript compilation check
  - Page rendering verification
prompt_text: |
  Yes. It is weak.

  The page is too thin, too generic, and too low-trust for what Kashmir EcoWatch is trying to be. Right now it is basically a small contact stub with four items only: a general line of copy, one email, one phone placeholder, one location, and a single "Report Now" support action. Then it drops into the standard footer. That is not enough for a platform that presents itself as an environmental intelligence and scientific stewardship system.

  [Full detailed prompt describing: hero with trust panel, 8 contact pathway cards, smart contact form with inquiry type routing, action shortcuts grid, institutional coordination block, local contact block, response expectations, FAQ section, and removal of all kashmir-environment.org emails.]
response_text: |
  Rebuilt the contact page into a comprehensive Contact & Coordination Hub with:
  - Hero section with trust panel (official domain, response handling, urgent reporting note)
  - 8 context-based contact pathway cards (general, partnerships, experts, data, reports, citizen science, verification, privacy)
  - Smart contact router form with inquiry type dropdown and dynamic guidance panel
  - 6 action shortcuts (report issue, submit sighting, contribute data, institutional onboarding, expert participation, trusted network)
  - Institutional coordination block with 3 dedicated cards
  - Regional coordination base (location, phone, email)
  - Before You Contact Us and Response Expectations sections
  - FAQ accordion with 6 questions
  - All emails updated to kashmir-ecowatch.com domain
outcome: |
  Page transformed from thin 4-card stub to full 8-section coordination hub matching platform's environmental intelligence role.
---
