---
id: 50
title: Red Data Book Kashmir Fauna Integration
stage: impl
date: 2026-03-30T18:00:00Z
surface: agent
model: qwen-code
feature: biodiversity
branch: main
user: naseer
command: Integrate Kashmir Red Data Book threatened fauna dataset
labels: ["biodiversity", "red-data-book", "threatened-species", "kashmir", "conservation", "iucn"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - src/data/red-data-book-kashmir.ts
  - src/app/biodiversity/threatened-species/page.tsx
  - src/app/biodiversity/page.tsx
tests:
  - TypeScript compilation
  - Build verification
---

## Prompt

Integrate the Kashmir-specific Red Data Book fauna dataset into the Biodiversity module. This is a data integration task requiring:

1. Use ONLY Kashmir-related species (37 total: 23 mammals, 10 birds, 4 reptiles/amphibians)
2. Normalize "Do" values to actual IUCN and WLPA statuses
3. Create filterable threatened species registry
4. Highlight 7 priority Kashmir species (Hangul, Western Tragopan, Kashmir Flycatcher, etc.)
5. Present conservation context (45% mammals threatened, 34% Schedule I)
6. Maintain Kashmir-specific focus - no generic Himalayan fauna
7. Use premium UI with status chips, taxon filters, and conservation intelligence

Source: Red Data Book on Jammu and Kashmir Fauna (provided source image/text)

## Response snapshot

Successfully integrated Kashmir-specific Red Data Book threatened fauna:

### 1. New Data Service (`src/data/red-data-book-kashmir.ts`)
- **37 threatened species records** normalized:
  - 23 Threatened Mammals: Snow Leopard, Kashmir Stag, Pir Panjal Markhor, Himalayan Black/Brown Bears, Kashmir Woolly Flying Squirrel, etc.
  - 10 Threatened Birds: Western Tragopan, Kashmir Flycatcher, White-fronted Goose, Black-necked Crane, Long-billed Vulture, etc.
  - 4 Reptiles/Amphibians: Indian Rock Python, Northern-headed Softshell Turtle, Indian Tent Turtle, Central Asian Cobra

- **Status normalization**: All "Do" values replaced with actual preceding statuses
- **Priority species flagged**: 7 flagship species (Kashmir Stag, Western Tragopan, Kashmir Flycatcher, Kashmir Woolly Flying Squirrel, Small Kashmir Flying Squirrel, Pir Panjal Markhor, Snow Leopard, Himalayan Black Bear)
- **Source metadata**: Conservation context, threat summary, species counts
- **Data access functions**: byTaxonGroup, byIUCNStatus, bySchedule, prioritySpecies, search
- **Metrics functions**: Total by taxon, IUCN status, Schedule, conservation gaps

### 2. Threatened Species Page (`/biodiversity/threatened-species`)
- **Full registry browser** with:
  - Taxon filter (All/Mammals/Birds/Reptiles-Amphibians)
  - IUCN status filter (Endangered/Vulnerable/Intermediate/Data Deficient)
  - Search by name or conservation theme
  - Priority species toggle
  - Conservation context banner (45% mammals threatened statistic)
  - Metrics bar (total, by taxon, priority, endangered, Schedule I, gaps)
  - Individual species cards with IUCN and WLPA badges
  - Source reference panel

### 3. Updated Biodiversity Overview
- Added Red Data Book section with:
  - Metrics summary card (37 species, 23 mammals, 10 birds, 4 endangered, 7 priority)
  - 6 priority species highlight cards
  - Link to full threatened species registry
  - Conservation context messaging

### 4. Kashmir-Facing Focus
- All 37 species filtered for Kashmir relevance
- 7 priority species highlighted as flagship conservation taxa
- Conservation gaps identified (species with IUCN status but not Schedule I)
- Source presented as historical reference (IUCN 1996, WLPA 1972)

### 5. UI Components
- IUCN status badges (Endangered=danger, Vulnerable=warning, etc.)
- WLPA Schedule badges (Schedule I=danger, Schedule II=warning, etc.)
- Taxon group icons (Leaf=mammals, Bird=birds, Turtle=reptiles)
- Priority species highlighting with emerald borders
- Conservation context banner with threat tags

## Outcome

- ✅ Impact: Complete threatened fauna dataset with 37 Kashmir-relevant species
- 🧪 Tests: TypeScript compilation successful
- 📁 Files: 3 files created/modified
- 🔁 Next prompts: Add species detail pages, integrate with protected areas overlap
- 🧠 Reflection: Successfully maintained Kashmir-specific focus; normalized all "Do" values

## Evaluation notes (flywheel)

- Failure modes observed: None significant
- Graders run and results: TypeScript compilation passed
- Prompt variant (if applicable): Kashmir-only data integration
- Next experiment: Add species detail page scaffolding for all 37 threatened species
