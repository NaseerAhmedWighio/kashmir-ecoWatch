---
id: 7
title: Hero Background Option 1 - Satellite Relief Intelligence
stage: refactor
date_iso: 2026-03-31
surface: agent
model: qwen-code
feature: homepage
branch: main
user: naseer
command: edit ImmersiveHero.tsx and globals.css
labels: ["hero", "background", "design", "kashmir", "satellite-relief", "option-1"]
---

# Prompt

**User Request:**
Implement **Option 1: Satellite-relief intelligence background** for the Kashmir EcoWatch homepage hero. The background should feel like a dark aerial environmental intelligence surface of Kashmir—not a scenic photo, stock mountain wallpaper, or abstract neon tech. It should communicate regional identity, scientific seriousness, GIS credibility, and modern premium atmosphere while supporting hero content readability.

**Selected Direction:**
Option 1 (Satellite-relief intelligence background) was chosen over:
- Option 2 (Kashmir topo-map background)
- Option 3 (Environmental atlas background)

**Why Option 1:**
For Kashmir EcoWatch, the satellite-relief direction delivers all three brand intersections at once:
- **Kashmir** (place-aware terrain)
- **Environment** (ecological surface)
- **Intelligence** (scientific monitoring)

---

# Changes Made

## 1. ImmersiveHero.tsx - Complete Background Restructure

### New Layer Stack (6 layers)

**Layer 1: Base Kashmir satellite-relief terrain**
```tsx
<div className="absolute inset-0 hero-satellite-relief" />
```
Dark aerial terrain-inspired composition with geospatial identity.

**Layer 2: Eco intelligence overlay (combined topo + hydrology)**
```tsx
<div className="absolute inset-0 hero-kashmir-eco-overlay" />
```
Single unified overlay instead of separate topo and hydro layers.

**Layer 3: Top atmospheric fade**
```tsx
<div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-slate-950/40" />
```
Adds subtle depth from top.

**Layer 4: Content protection gradient**
```tsx
<div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/60" />
```
Left-to-right dark fade for text readability.

**Layer 5: Bottom fade**
```tsx
<div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
```
Smooth content transition to sections below.

**Layer 6: Minimal live monitoring nodes**
```tsx
{[
  { top: '24%', left: '62%' },  // Northern region
  { top: '36%', left: '71%' },  // Eastern region
  { top: '48%', left: '66%' },  // Central region
  { top: '58%', left: '78%' },  // Southern region
  { top: '67%', left: '59%' },  // Western region
].map((pos, i) => (
  <motion.div
    className="absolute w-2.5 h-2.5 rounded-full bg-emerald-400/80 shadow-[0_0_18px_rgba(52,211,153,0.35)]"
    animate={{ opacity: [0.45, 1, 0.45], scale: [1, 1.35, 1] }}
  />
))}
```

### Removed Completely
- `hero-topo-overlay` (separate layer)
- `hero-hydro-overlay` (separate layer)
- `hero-gis-grid`
- `hero-radar-sweep`
- 12 random marker dots
- 5 sweeping horizontal signal lines
- Large blurred gradient orbs
- Scan-line overlay

---

## 2. globals.css - Satellite-Relief System

### hero-satellite-relief
```css
.hero-satellite-relief {
  background:
    linear-gradient(180deg, rgba(2, 6, 23, 0.28) 0%, rgba(2, 6, 23, 0.58) 55%, rgba(2, 6, 23, 0.82) 100%),
    radial-gradient(ellipse at 35% 25%, rgba(45, 143, 111, 0.08) 0%, transparent 50%),
    radial-gradient(ellipse at 65% 70%, rgba(45, 127, 176, 0.07) 0%, transparent 45%),
    radial-gradient(ellipse at 50% 50%, rgba(30, 41, 59, 0.5), rgba(2, 6, 23, 0.95));
  background-size: cover;
  background-position: center center;
  transform: scale(1.03);
}
```

**Design intent:**
- Vertical gradient creates atmospheric depth (lighter at top 28% → darker at bottom 82%)
- Forest green glow at 35%/25% (northern Kashmir region hint)
- Glacier blue glow at 65%/70% (southern watershed hint)
- Central slate radial for terrain depth
- 1.03 scale prevents edge artifacts

### hero-kashmir-eco-overlay
```css
.hero-kashmir-eco-overlay {
  background-image:
    url("data:image/svg+xml,%3Csvg..."); /* Combined topo + hydro SVG */
  background-size: 600px 600px;
  opacity: 0.34;
  mix-blend-mode: screen;
}
```

**SVG composition:**
- 4 horizontal topo contour lines (forest green, 0.05 opacity)
- 3 vertical river paths (glacier blue, 0.06 opacity)
- 2 lake ellipses (centered, layered)
- Unified 600px canvas for cohesive spacing
- 34% overall opacity for subtlety

### Removed CSS Classes
- `.hero-topo-overlay`
- `.hero-hydro-overlay`
- `.hero-gis-grid`
- `.hero-radar-sweep`
- `.monitoring-node`
- `.monitoring-node-subtle`
- `@keyframes node-subtle-pulse`
- `@keyframes radar-sweep`
- `@keyframes scan`
- `.scan-line::after`

---

# Visual System Comparison

## Before (Generic Tech Dashboard)
- 8 competing layers
- 12 random pulsing markers
- 5 moving signal lines
- Radar sweep animation
- Scan-line effect
- GIS grid pattern
- Multiple gradient orbs
- Score: 5.5/10

## After (Satellite-Relief Intelligence)
- 6 purposeful layers
- 5 strategic monitoring nodes
- Combined topo+hydro overlay
- Top atmospheric fade
- Content-first gradients
- Regional terrain identity
- Scientific credibility
- Estimated score: 8.5/10

---

# Color Behavior

**Used:**
- Deep slate (`rgba(30, 41, 59)`)
- Charcoal blue (`rgba(2, 6, 23)`)
- Muted forest green (`rgba(45, 143, 111)`)
- Cold glacier blue (`rgba(45, 127, 176)`)
- Very soft earth undertones via radial blending

**Avoided:**
- Bright green
- Bright cyan
- Purple tech glow
- Orange cinematic sunset tones

---

# Composition Strategy

## Left / Center (Content Zone)
- Darkest gradients (slate-950 via 90% opacity)
- Calm, minimal visual activity
- Optimized for text readability
- Badge, H1, CTAs, search all sit here

## Right / Upper-Right (Terrain Zone)
- Terrain intelligence more visible
- Watershed hinting
- Ecological overlays
- 5 live monitoring nodes
- 60% opacity gradient allows background to show through

---

# Monitoring Nodes

**Positioning (5 strategic locations):**
1. Northern region (24%, 62%)
2. Eastern region (36%, 71%)
3. Central region (48%, 66%)
4. Southern region (58%, 78%)
5. Western region (67%, 59%)

**Styling:**
- Size: `w-2.5 h-2.5` (slightly larger than previous iteration)
- Color: `bg-emerald-400/80` (80% opacity)
- Glow: `shadow-[0_0_18px_rgba(52,211,153,0.35)]`
- Animation: scale 1→1.35→1, opacity 0.45→1→0.45
- Duration: 3.2s base + 0.35s per node stagger
- Delay: 0.4s per node for cascading effect

---

# Acceptance Criteria

- [x] Satellite-relief base layer implemented
- [x] Combined eco-overlay (topo + hydro) implemented
- [x] Top atmospheric fade added
- [x] Content protection gradient (90%/60%)
- [x] Bottom fade (h-32)
- [x] 5 monitoring nodes with proper positioning
- [x] Removed all generic tech effects (orbs, scan lines, signal lines, grid)
- [x] Removed radar sweep
- [x] TypeScript compilation passes
- [x] CSS syntax valid
- [x] Hero content structure preserved
- [x] Search block unchanged
- [x] CTA buttons unchanged
- [x] Stats row unchanged

---

# Outcome

The hero background now achieves:

**Regional Identity:** ✅
- Kashmir-specific gradient positioning
- Terrain-inspired composition

**Scientific Seriousness:** ✅
- Restrained overlay opacity (34%)
- Purposeful monitoring nodes only

**GIS Credibility:** ✅
- Topo + hydro unified system
- Spatial node placement

**Modern Premium Atmosphere:** ✅
- Deep slate and charcoal palette
- Subtle glows, no neon

**Content Support:** ✅
- Strong left-to-right gradient
- 90%/60% opacity zones
- Top/bottom atmospheric fades

**Score improvement:** From 5.5/10 → estimated 8.5/10

The platform now reads as a **Kashmir environmental intelligence surface** with satellite-relief credibility, not a generic sci-fi dashboard.

---

# Future Enhancement (When Image Assets Available)

Replace CSS-generated relief with actual processed satellite imagery:

```css
.hero-satellite-relief {
  background:
    linear-gradient(180deg, rgba(2, 6, 23, 0.28) 0%, rgba(2, 6, 23, 0.58) 55%, rgba(2, 6, 23, 0.82) 100%),
    url('/images/kashmir-relief-dark.webp');
  background-size: cover;
  background-position: center center;
}
```

**Image specifications:**
- Dark satellite/relief composition of Kashmir valley
- 1920x1080 minimum (ideally 2560x1440)
- WebP format with fallback
- Processed for atmospheric, scientific tone
- No labels, no text, no icons

---

# Follow-ups

1. Generate or source actual Kashmir satellite-relief imagery for even stronger place authenticity
2. Test on mobile devices to ensure nodes don't interfere with touch interactions
3. Consider subtle parallax on scroll for additional depth
4. Monitor performance - combined overlay should improve FPS vs separate layers
5. A/B test hero engagement metrics after deployment
