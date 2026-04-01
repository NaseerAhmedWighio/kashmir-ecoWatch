---
id: 47
title: "Bloom Mapping Architecture Separation"
stage: "refactor"
date_iso: "2026-04-01"
surface: "agent"
model: "qwen-code"
feature: "seasonal-ecology"
branch: "main"
user: "Naseer Ahmed"
command: "Refactor bloom mapping information architecture"
labels: ["information-architecture", "bloom-mapping", "algal-bloom", "seasonal-ecology", "risk-monitoring", "cross-linking"]
links:
  spec: "null"
  ticket: "null"
  adr: "null"
  pr: "null"
files_yaml: |
  - src/app/seasonal-ecology/bloom-mapping/page.tsx
  - src/app/risk-monitoring/algal-bloom-monitoring/page.tsx
tests_yaml: |
  - Manual verification via build output
  - Visual inspection of cross-link cards
---

# Bloom Mapping Architecture Separation

## User Request

Separate "Bloom Mapping" into two distinct intelligence paths:

1. **Floral Bloom** (Seasonal Ecology) - phenology, flowering landscapes, orchard blooms
2. **Algal Bloom** (Risk & Monitoring / Water Systems) - eutrophication, lake stress, water quality

**Key Decision:** Do NOT merge both under one undifferentiated "Bloom Mapping" page because they represent different ecological systems:
- Floral bloom = phenology and seasonal timing
- Algal bloom = water pollution and ecological stress monitoring

## Implementation

### Changes Made

#### 1. Seasonal Ecology → Bloom Mapping Page
**File:** `src/app/seasonal-ecology/bloom-mapping/page.tsx`

- ✅ Updated subtitle to explicitly state: **"Floral bloom zones and flowering landscapes across Kashmir"**
- ✅ Added cross-link card at bottom of page pointing to Algal Bloom Monitoring
- ✅ Card messaging: "Not all bloom signals are floral" - directs users to lake eutrophication monitoring
- ✅ Focus areas maintained: orchard blooms, alpine meadows, medicinal plants, pollinator-linked bloom timing

#### 2. Risk & Monitoring → Algal Bloom Monitoring Page
**File:** `src/app/risk-monitoring/algal-bloom-monitoring/page.tsx`

- ✅ Added cross-link card pointing to Seasonal Ecology → Floral Bloom Mapping
- ✅ Enhanced "Related Intelligence" section with Seasonal Ecology card (first position)
- ✅ Card messaging clarifies distinction: "While algal blooms indicate water stress, floral blooms represent Kashmir's seasonal phenology"
- ✅ Focus areas: Dal Lake, Wular Lake, Manasbal Lake, Anchar Lake, Nigeen Lake, eutrophication, bloom intensity, fish kill linkage

### Architecture Summary

```
Seasonal Ecology (/seasonal-ecology)
└── Bloom Mapping (/seasonal-ecology/bloom-mapping)
    └── Subtitle: "Floral bloom zones and flowering landscapes across Kashmir"
    └── Cross-link → /risk-monitoring/algal-bloom-monitoring

Risk & Monitoring (/risk-monitoring)
└── Algal Bloom Monitoring (/risk-monitoring/algal-bloom-monitoring)
    └── Subtitle: "Eutrophication and lake bloom signals across Kashmir's major water bodies"
    └── Cross-link → /seasonal-ecology/bloom-mapping
```

### Cross-Linking Strategy

**On Bloom Mapping (Floral):**
- Card with Waves icon (emerald/teal theme)
- Message: "Looking for Lake Algal Bloom & Eutrophication Signals?"
- Explains: "Not all bloom signals are floral"
- Links to: Water Systems, Algal Bloom Monitoring

**On Algal Bloom Monitoring (Water Stress):**
- Card with Flower2 icon (pink/rose theme)
- Message: "Explore Floral Bloom Zones & Flowering Landscapes"
- Explains: "While algal blooms indicate water stress, floral blooms represent seasonal phenology"
- Links to: Seasonal Ecology, Bloom Mapping

## Acceptance Criteria

- [x] Floral bloom subtitle explicitly mentions "Floral bloom zones"
- [x] Algal bloom remains separate under Risk & Monitoring
- [x] Cross-link card on Bloom Mapping → Algal Bloom Monitoring
- [x] Cross-link card on Algal Bloom Monitoring → Seasonal Ecology
- [x] Both pages maintain distinct ecological focus (phenology vs. water quality)
- [x] Build completes without errors

## Outcome

Successfully separated the two bloom intelligence systems while maintaining intelligent cross-linking:

1. **Clear Separation:** Users will not be confused because each page has a distinct focus and subtitle
2. **Intelligent Linking:** Users looking for the "other" bloom type can easily navigate via prominent cross-link cards
3. **Scientific Accuracy:** Maintains proper distinction between phenology (floral) and eutrophication (algal) monitoring
4. **Kashmir Lake Focus:** Algal bloom monitoring explicitly covers Dal Lake, Wular Lake, Manasbal Lake, Anchar Lake, and Nigeen Lake

## Follow-ups

- Consider adding similar cross-link cards on the main Seasonal Ecology hub page
- Potentially add algal bloom data to Water Systems pages with links back to Risk & Monitoring
- Monitor user navigation patterns to see if cross-linking reduces confusion
