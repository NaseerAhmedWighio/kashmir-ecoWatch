# Kashmir EcoWatch — Complete Responsiveness Fix Prompt

> **Usage:** Feed this prompt to your AI coding assistant (Claude Code, Cursor, Copilot, etc.) along with your full codebase. It covers every page, every section, every card pattern, and every known bug category found through deep analysis of https://kashmir-eco-watch.vercel.app/

---

## CONTEXT

You are a senior frontend engineer. Fix ALL responsiveness, layout, spacing, overflow, and visual-consistency issues across the entire Kashmir EcoWatch Next.js 14 + Tailwind CSS codebase. The site is a multi-page environmental intelligence platform with a dark theme. Apply changes systematically, not page-by-page in isolation.

**Breakpoints to target:**
- `xs`: 320px–479px (small phones)
- `sm`: 480px–639px (large phones)
- `md`: 640px–767px (small tablets)
- `lg`: 768px–1023px (large tablets / small laptops)
- `xl`: 1024px–1279px (desktop)
- `2xl`: 1280px+ (wide desktop)

---

## SECTION 1 — GLOBAL / SITE-WIDE FIXES

### 1.1 — Root Container & Horizontal Overflow
```
- Add `overflow-x: hidden` to both <html> and <body>.
- Every top-level page wrapper must use `w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12`.
- Remove any hard-coded `width` values in px on wrapper divs; replace with `w-full` + `max-w-*`.
- Audit every section for elements with `translate-x`, negative margins, or absolute positioning that bleeds outside the viewport on mobile.
```

### 1.2 — Global Typography Scale
```
- Standardize heading sizes across ALL pages using this exact scale:
  Page Hero h1:     text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold
  Section h2:       text-xl sm:text-2xl md:text-3xl font-semibold
  Card h3:          text-base sm:text-lg font-semibold
  Card h4/subtitle: text-sm font-medium
  Body text:        text-sm sm:text-base
  Small/meta text:  text-xs sm:text-sm
- Ensure NO heading on any page is smaller than its sub-heading at any breakpoint.
- All headings must use `leading-tight` or `leading-snug`; body text uses `leading-relaxed`.
- Apply `truncate` or `line-clamp-2` to card titles that overflow their container on small screens.
```

### 1.3 — Global Spacing Tokens
```
- Section vertical padding: `py-10 sm:py-14 md:py-16 lg:py-20`
- Section inner gap (between heading and content): `mt-6 sm:mt-8 md:mt-10`
- Card padding: `p-4 sm:p-5 md:p-6` (apply consistently — no card should have p-3 while a sibling has p-8)
- Card gap in grids: `gap-4 sm:gap-5 md:gap-6`
- Stat/badge gap inside cards: `gap-2 sm:gap-3`
```

### 1.4 — Navigation (Header)
```
- Desktop nav links must not wrap. If they don't fit at lg, collapse into a hamburger at md and below.
- Hamburger menu: full-width mobile dropdown with `w-full px-4 py-3` per link, `text-sm font-medium`.
- Logo + nav must be in a flex row with `items-center justify-between` at all times.
- Mobile menu overlay must have `z-50` and cover full viewport height.
- Active link indicator must be visible on mobile menu too.
- Nav must be `sticky top-0 z-40` with a backdrop-blur on scroll.
```

### 1.5 — Footer
```
- Footer grid: `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8`
- Footer columns must NOT overflow or collapse into single column accidentally on md screens.
- Social icons row: `flex flex-col sm:flex-row flex-wrap gap-3` — they must not overflow on xs.
- Footer bottom bar (copyright + links): `flex flex-col sm:flex-row items-center justify-between gap-3 text-xs`
- The legal disclaimer paragraph must have `text-xs leading-relaxed` and proper padding — it currently may overflow on mobile.
```

---

## SECTION 2 — HOME PAGE (`/`)

### 2.1 — Hero Section
```
- Hero headline: `text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight`
- Subtitle paragraph: `text-sm sm:text-base md:text-lg max-w-2xl mx-auto text-center`
- Hero CTA buttons: stack vertically on xs/sm (`flex flex-col sm:flex-row gap-3`), each button `w-full sm:w-auto`
- The "Live Environmental Intelligence System Active" badge: `text-xs px-3 py-1 rounded-full` — ensure it doesn't overflow on 320px screens
- Hero keyboard shortcut badge (`Enter`): must be `inline-flex items-center gap-1 text-xs`
```

### 2.2 — Stats Row (Species Indexed / Protected Areas / Water Bodies / Monitoring Stations)
```
- Grid: `grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5`
- Each stat card: `p-4 sm:p-5 rounded-xl flex flex-col items-center text-center gap-1`
- Stat number: `text-2xl sm:text-3xl font-bold`
- Stat label: `text-xs sm:text-sm text-center`
- "+156 / +2 / Active / Online" badges: `text-xs px-2 py-0.5 rounded` — must sit on one line, use `whitespace-nowrap`
- Source note below stats: `text-xs text-center mt-3 px-2`
```

### 2.3 — Intelligence Domains Grid (Module Cards)
```
- Section header with "View All Modules" button: `flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3`
- Module grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5`
- Each module card: `p-4 sm:p-5 rounded-xl flex flex-col gap-3 h-full`
- Card title (h3): `text-base font-semibold line-clamp-1`
- Card description: `text-sm leading-relaxed line-clamp-3`
- "Access Module" button: `mt-auto w-full text-sm py-2 rounded-lg` — must be at card bottom via flex column
- "Ecological Atlas" featured card: its "42 Layers / 100% Access" badges must be `flex flex-wrap gap-2 text-xs`
```

### 2.4 — Live Intelligence Panels (Alert Feed Cards)
```
- Section filter tabs (All Feeds / Critical / Warnings): `flex flex-wrap gap-2 text-xs sm:text-sm`
- Panel grid: `grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5`
- Each panel card: `p-4 sm:p-5 rounded-xl`
- Panel header row (title + badge): `flex items-start justify-between gap-2 flex-wrap`
- "WARNING / CRITICAL / NORMAL" status badge: `text-xs px-2 py-0.5 rounded whitespace-nowrap`
- "3 active items / Updated 2m ago" meta: `text-xs flex flex-wrap items-center gap-2`
- Individual alert rows inside panel: `flex items-start justify-between gap-2 py-2`
- Alert title: `text-sm flex-1 min-w-0 truncate` — must NOT push severity badge off screen
- Severity badge (HIGH/MEDIUM): `text-xs px-2 py-0.5 rounded whitespace-nowrap flex-shrink-0`
- District + date meta below alert: `text-xs flex flex-wrap gap-2`
- "View All [panel name]" link: `text-xs mt-3 block text-right`
- "Configure Alert Preferences" card: full width `w-full`, button `w-full sm:w-auto`
```

### 2.5 — Intelligence Path Cards (Spatial Analysis / Regional Profiles / etc.)
```
- Grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5`
- Each card: `p-5 sm:p-6 rounded-xl flex flex-col gap-3 h-full`
- "Best for / Data type / Result type" label rows: `flex flex-col gap-1` with label `text-xs font-medium` and value `text-sm`
- CTA button: `mt-auto w-full py-2 text-sm rounded-lg`
```

### 2.6 — District Ecological Scorecards
```
- "Highest Score / Most Biodiversity-Rich / Most Improved / Highest Risk" summary row:
  `grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4` — on xs must be 2-column, NOT 1-column
- Each summary badge: `p-3 sm:p-4 rounded-xl text-center`
- District cards grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5`
- Each district card: `p-4 sm:p-5 rounded-xl`
- Score badge: `text-xl sm:text-2xl font-bold`
- Stats row (Wetlands / Protected / Species): `flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm`
- Each stat: `flex flex-col items-center` — number bold, label xs
- Status row (Declining/Stable + Risk): `flex flex-wrap gap-2 items-center text-xs`
- "Strength / Challenge" tags: `flex flex-wrap gap-2 text-xs mt-2`
- "View Profile" button: `w-full text-sm py-2 mt-3 rounded-lg`
```

### 2.7 — Featured Ecological Entities
```
- Category filter tabs: `flex flex-wrap gap-2 text-xs sm:text-sm overflow-x-auto` — no horizontal scroll bar visible
- Entity grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5`
- Each entity card: `p-4 sm:p-5 rounded-xl`
- Entity type badge (Protected Area / Water Body / Species / Bloom Zone / Trail / District): `text-xs px-2 py-0.5 rounded whitespace-nowrap`
- Stats row (area / population / km / days etc.): `flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm`
- Each stat unit: value `font-bold text-sm sm:text-base`, unit label `text-xs`
- "View Details" button: `w-full text-sm py-2 mt-3 rounded-lg`
- "Category Overview" summary row at bottom: `grid grid-cols-3 sm:grid-cols-5 gap-2 text-xs text-center`
```

### 2.8 — Public Participation Intelligence
```
- Summary stats row (342 Issues / 1256 Sightings / 89 Datasets / 2847 Members):
  `grid grid-cols-2 md:grid-cols-4 gap-4`
- District Participation Heatmap:
  - District list: `flex flex-col gap-2`
  - Each district row: `flex items-center justify-between gap-3 flex-wrap`
  - District name: `text-sm font-medium flex-shrink-0`
  - Contribution count: `font-bold text-sm`
  - "234 members / 87% resolved": `text-xs flex gap-2 flex-wrap`
  - Intensity legend: `flex flex-wrap gap-2 items-center text-xs mt-3`
- "Increasing / Decreasing" badge row: `flex gap-3 text-xs`
- Contribution Pathways grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4`
- Each pathway card: `p-4 sm:p-5 rounded-xl flex flex-col gap-2 h-full`
- "Get Involved" button: `mt-auto w-full py-2 text-sm rounded-lg`
- Reported Issues table: on mobile becomes stacked cards instead of table rows
  - Each issue: `flex flex-col gap-1 p-3 rounded-lg border`
  - Title: `text-sm font-medium`
  - Meta row (location + numbers): `flex flex-wrap gap-2 text-xs`
- Sightings list: `grid grid-cols-2 sm:grid-cols-4 gap-3`
- Each sighting: `p-3 rounded-lg text-center`
  - Species name: `text-sm font-medium`
  - Type badge: `text-xs`
- Datasets list: each entry `flex flex-col gap-1 p-3 rounded-lg`
- Citizen Science members: `flex flex-col gap-3`
  - Each member row: `flex items-center gap-3`
  - Rank number: `text-sm font-bold w-5 flex-shrink-0`
  - Name: `text-sm font-medium flex-1 min-w-0 truncate`
  - Location + sightings: `text-xs flex-shrink-0`
- Recent Community Activity feed: each item `flex items-start gap-3 py-2`
  - Icon: `flex-shrink-0`
  - Text block: `flex-1 min-w-0`
  - Title: `text-sm line-clamp-2`
  - Meta: `text-xs flex flex-wrap gap-2`
- District Participation Rates: `flex flex-col gap-2`
  - Each row: `flex items-center justify-between gap-2`
  - District: `text-sm flex-1`
  - Numbers: `text-sm font-bold flex-shrink-0`
  - Verified: `text-xs flex-shrink-0`
  - Trend arrow: `flex-shrink-0`
```

### 2.9 — Advanced Dashboard Previews
```
- Dashboard card grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5`
- Air Quality card: stat row `flex flex-wrap gap-4 text-sm`
- Each KPI: value `text-2xl font-bold`, label `text-xs`
- District Ecological Scorecards mini-table: `flex flex-col gap-2` with `flex justify-between` per row
```

### 2.10 — Alert & Response System
```
- Filter bar + Subscribe button: `flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3`
- Tab row (All / Critical / Warning / Info): `flex flex-wrap gap-2 text-xs sm:text-sm`
- Alert list: `flex flex-col gap-3`
- Each alert item: `p-4 rounded-xl flex flex-col gap-2`
  - Header: `flex items-start justify-between gap-2 flex-wrap`
  - Title: `text-sm font-medium flex-1 min-w-0`
  - Severity badge: `text-xs px-2 py-0.5 flex-shrink-0 whitespace-nowrap`
  - Location + time: `text-xs flex flex-wrap gap-2`
- Alert Summary card: `grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm`
- "Report an Issue" quick buttons: `flex flex-wrap gap-2`
  - Each tag button: `text-xs px-3 py-1.5 rounded-full whitespace-nowrap`
  - On xs, allow 2 per row using flex-wrap — must NOT overflow horizontally
```

---

## SECTION 3 — BIODIVERSITY PAGE (`/biodiversity`)

### 3.1 — Hero / Page Header
```
- Stats row (2847 Species / 47 PAs / 4521 Sightings / 89 Threatened / 127 Medicinal / 312 Birds / 67 Mammals / 23 Fish):
  `grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4`
  On xs/sm: show only 4 key stats, hide the rest behind "Show More" or use 2-column grid for all 8
- CTA buttons: `flex flex-col sm:flex-row gap-3`
```

### 3.2 — Biodiversity Categories (Taxonomic Group Cards)
```
- Grid: `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5`
- Each category card (Mammals / Birds / Fish / Plants / Medicinal Plants / Threatened):
  `p-4 sm:p-5 rounded-xl flex flex-col gap-2 h-full`
- Category title: `text-sm sm:text-base font-semibold`
- Species count badge: `text-xs font-bold`
- Habitat tags row: `flex flex-wrap gap-1 mt-1`
  Each tag: `text-xs px-2 py-0.5 rounded-full whitespace-nowrap`
- "Explore [X]" button: `mt-auto w-full text-xs sm:text-sm py-2 rounded-lg`
```

### 3.3 — Habitat Intelligence Cards
```
- Grid: `grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6`
- Each habitat card (Forest / Wetland / Alpine / River / Meadow):
  `p-5 sm:p-6 rounded-xl flex flex-col gap-4`
- Header row: `flex items-start justify-between gap-2`
  - Title: `text-base sm:text-lg font-semibold flex-1`
  - Area badge: `text-xs flex-shrink-0`
  - Threat level pill: `text-xs px-2 py-0.5 rounded whitespace-nowrap`
- Description: `text-sm leading-relaxed`
- Taxonomic Breakdown sub-section: `grid grid-cols-3 sm:grid-cols-5 gap-2 text-xs text-center`
  Each: label `block`, count `font-bold block`
- Districts row: `flex flex-wrap gap-1.5 text-xs`
  Each district chip: `px-2 py-0.5 rounded whitespace-nowrap`
- Threats row: `flex flex-wrap gap-1.5 text-xs`
- Protected Area overlap: `flex items-center gap-2 text-xs mt-2`
- "Explore [Habitat] Biodiversity" button: `w-full py-2 text-sm rounded-lg mt-auto`
```

### 3.4 — Distribution Intelligence (6 pathway cards)
```
- Grid: `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4`
- Each card: `p-3 sm:p-4 rounded-xl text-center flex flex-col gap-1`
- Count badge: `text-lg sm:text-xl font-bold`
- Label: `text-xs leading-tight`
- Sub-label: `text-xs`
- "Explore By X" button: `text-xs py-1.5 mt-2 rounded-lg w-full`
```

### 3.5 — Featured Species Cards
```
- Grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6`
- Each species card: `p-5 sm:p-6 rounded-xl flex flex-col gap-3`
- Header: IUCN badge + "Sensitive" badge + taxon tag — `flex flex-wrap gap-2 items-center`
  IUCN badge (CR/EN/VU/NT/LC): `text-xs font-bold px-2 py-0.5 rounded whitespace-nowrap`
  "Sensitive" badge: `text-xs px-2 py-0.5 rounded whitespace-nowrap`
  Taxon (mammals/birds): `text-xs`
- Species name (common): `text-base sm:text-lg font-semibold`
- Scientific name: `text-xs italic`
- "X districts / Y habitats / Z sightings" mini-stats: `flex flex-col sm:flex-row flex-wrap gap-3 text-xs sm:text-sm`
- Description: `text-sm leading-relaxed line-clamp-4`
- Elevation range: `text-xs flex items-center gap-1`
- Primary Threats: `flex flex-wrap gap-1.5 mt-2`
  Each threat chip: `text-xs px-2 py-0.5 rounded whitespace-nowrap`
  "+2" overflow chip: same style
- "View Details" button: `w-full py-2 text-sm rounded-lg mt-auto`
```

### 3.6 — Conservation Intelligence
```
- "Threat Patterns by Taxon" section:
  Each taxon block: `p-4 rounded-xl flex flex-col gap-2`
  Status breakdown (CR/EN/VU counts): `flex flex-wrap gap-2 text-xs`
  Each count: `font-bold` label + plain text
- "Legal Protection" grid: `grid grid-cols-2 sm:grid-cols-4 gap-3 text-center`
  Schedule number: `text-2xl font-bold`, label: `text-xs`
- "Priority Kashmir Species" list: `flex flex-col gap-2`
  Each: `flex items-center justify-between gap-2`
  Name: `text-sm font-medium flex-1`
  Status badge: `text-xs flex-shrink-0`
- "Conservation Hotspots" list: each `p-3 rounded-xl flex flex-col gap-1`
  Name + district: `flex justify-between items-start gap-2 flex-wrap`
  Threatened count: `text-sm font-bold flex-shrink-0`
  Threats: `text-xs flex-wrap`
- "Risk Driver Correlation": `flex flex-col gap-2`
  Each driver: `flex items-center justify-between gap-2`
  Driver name: `text-sm flex-1`
  "X species affected": `text-xs font-bold flex-shrink-0`
```

### 3.7 — District Biodiversity Intelligence
```
- Grid: `grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4`
- Each district cell: `p-3 sm:p-4 rounded-xl text-center`
- Species count: `text-lg sm:text-xl font-bold`
- District name: `text-xs font-medium`
- "X threatened": `text-xs`
- Trend arrow: `text-xs`
```

---

## SECTION 4 — WATER SYSTEMS PAGE (`/water-systems`)

### 4.1 — Hero Stats Row
```
- Grid: `grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-3`
- On xs: show `grid-cols-3` — 3 per row across 3 rows
- Quality indicators (Excellent/Good/Moderate/Poor/Critical): `grid grid-cols-3 sm:grid-cols-5 gap-2 text-xs text-center mt-4`
```

### 4.2 — Water System Category Cards (Lakes / Wetlands / Rivers / Springs / Watersheds etc.)
```
- Grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6`
- Each category card: `p-5 sm:p-6 rounded-xl flex flex-col gap-3 h-full`
- Header: count badge + title `flex items-start justify-between gap-2`
- Count badge: `text-xs px-2 py-0.5 rounded whitespace-nowrap flex-shrink-0`
- Title (h3): `text-base sm:text-lg font-semibold flex-1`
- Description: `text-sm leading-relaxed`
- Tag pills row (Water Quality / Biodiversity / Hydrology / Threats):
  `flex flex-wrap gap-1.5 text-xs`
  Each: `px-2 py-0.5 rounded whitespace-nowrap`
- "Explore All [X]" button: `mt-auto w-full py-2 text-sm rounded-lg`
```

### 4.3 — Lake Health Scorecards
```
- Grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5`
- Each lake card: `p-4 sm:p-5 rounded-xl flex flex-col gap-3`
- Header: name + health status badge `flex items-start justify-between gap-2`
- Health badge (FAIR/GOOD/POOR): `text-xs px-2 py-0.5 rounded whitespace-nowrap flex-shrink-0`
- Score: `text-2xl sm:text-3xl font-bold`
- Parameter bars (Water Quality / Trophic State / Biodiversity):
  Each: label `text-xs`, progress bar `w-full h-1.5 rounded-full`, value `text-xs text-right`
  Container: `flex flex-col gap-2`
```

### 4.4 — District Water Intelligence
```
- Grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5`
- Each district block: `p-4 sm:p-5 rounded-xl`
- District name + avg health: `flex items-center justify-between gap-2`
- Water body count row (Lakes/Wetlands/Rivers/Springs):
  `grid grid-cols-4 gap-2 text-xs text-center mt-3`
  Each: count `text-lg font-bold`, type `text-xs`
- Quality distribution: `flex flex-wrap gap-1.5 text-xs mt-2`
- "Restoration Projects" count: `text-xs mt-1`
```

### 4.5 — Spring Vulnerability & Wetland Condition
```
- Two-column layout: `grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6`
- Each sub-section: `flex flex-col gap-3`
- Each item card: `p-3 sm:p-4 rounded-xl flex flex-col gap-2`
- Name + vulnerability label: `flex items-center justify-between gap-2 flex-wrap`
- Name: `text-sm font-medium flex-1`
- Status badge (VULNERABLE/POOR/FAIR): `text-xs px-2 py-0.5 rounded whitespace-nowrap flex-shrink-0`
- Meta (discharge / climate / score / ramsar): `text-xs flex flex-wrap gap-2`
```

### 4.6 — River Corridor Stress
```
- Grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`
- Each river card: `p-4 rounded-xl flex flex-col gap-2`
- Name + stress badge: `flex items-center justify-between gap-2`
- Stats row (Buffer Width / Urban Coverage / Dams):
  `flex flex-col sm:flex-row flex-wrap gap-3 text-xs sm:text-sm`
  Each: label `text-xs`, value `font-bold`
```

---

## SECTION 5 — PROTECTED NETWORK PAGE (`/protected-network`)

### 5.1 — Network Statistics Row
```
- `grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4`
- Each stat: `p-3 rounded-xl text-center`
- Value: `text-xl sm:text-2xl font-bold`
- Label: `text-xs`
- "12.8% Coverage" wide stat: `col-span-3 sm:col-span-1` on xs
```

### 5.2 — Category Cards (National Parks / Sanctuaries / Wetlands etc.)
```
- Grid: `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5`
- Each card: `p-4 sm:p-5 rounded-xl flex flex-col gap-2 h-full`
- Count badge: `text-2xl sm:text-3xl font-bold`
- Type label: `text-xs`
- Title: `text-sm sm:text-base font-semibold`
- Description: `text-xs sm:text-sm leading-relaxed line-clamp-3`
- "Explore" button: `mt-auto w-full py-2 text-xs sm:text-sm rounded-lg`
```

### 5.3 — Ecological Intelligence Layers
```
- Grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5`
- Each intelligence card: `p-4 sm:p-5 rounded-xl flex flex-col gap-2 h-full`
- Icon + title: `flex items-start gap-3`
- Count badge: `text-sm font-bold`
```

### 5.4 — Featured Protected Areas
```
- Grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6`
- Each PA card: `p-5 sm:p-6 rounded-xl flex flex-col gap-3 h-full`
- Category badge (national park / wetland reserve): `text-xs px-2 py-0.5 rounded whitespace-nowrap`
- Title: `text-base sm:text-lg font-semibold`
- Description: `text-sm leading-relaxed line-clamp-3`
- Meta row (Area / District / Established):
  `grid grid-cols-3 gap-3 text-center mt-2`
  Each: value `text-sm font-bold`, label `text-xs`
- "View Details" button: `mt-auto w-full py-2 text-sm rounded-lg`
```

---

## SECTION 6 — ENVIRONMENTAL MONITORING, FIELD REPORTS, RISK & MONITORING PAGES

### 6.1 — Common Dashboard Layout
```
- All dashboard metric cards: `grid grid-cols-2 sm:grid-cols-4 gap-4`
- Each metric card: `p-4 sm:p-5 rounded-xl`
- Metric value: `text-2xl sm:text-3xl font-bold`
- Metric label: `text-xs sm:text-sm`
- Status badge: `text-xs px-2 py-0.5 rounded whitespace-nowrap mt-1`
- Trend indicator: `text-xs flex items-center gap-1`
```

### 6.2 — Field Reports / Data Tables → Mobile Cards
```
On screens < md, all data tables MUST become stacked card lists:
- Each row becomes: `p-4 rounded-xl border flex flex-col gap-2 mb-3`
- Table header labels become inline labels: `text-xs font-medium` before each value
- Action buttons: `flex flex-wrap gap-2 mt-2`
```

### 6.3 — Contribute Page (`/contribute`)
```
- Contribution pathway cards: `grid grid-cols-1 sm:grid-cols-2 gap-5`
- Form sections: `flex flex-col gap-4 max-w-2xl mx-auto`
- Each form field: `flex flex-col gap-1`
  Label: `text-sm font-medium`
  Input: `w-full px-3 py-2 text-sm rounded-lg`
- Form submit button: `w-full sm:w-auto px-6 py-2.5 text-sm rounded-lg`
```

---

## SECTION 7 — CARD SYSTEM CONSISTENCY AUDIT

Apply these rules globally to ALL card components:

### 7.1 — Card Padding Standardization
```
Every card MUST have ONE of these padding profiles, and all cards of the same visual weight must share the same profile:
  PRIMARY (module/entity/species/PA cards):  p-4 sm:p-5 md:p-6
  SECONDARY (stat/metric/small info cards):  p-3 sm:p-4
  COMPACT (tags/chips/badges):               px-2 py-0.5 sm:px-3 sm:py-1
```

### 7.2 — Card Min-Height & Overflow
```
- All grid cards must be `h-full` with parent using `items-stretch`.
- Card content must use `flex flex-col` so "View Details" / "Access Module" / "Explore" CTA buttons always sit at the bottom via `mt-auto`.
- Never use fixed heights (h-48, h-64, etc.) on cards — this causes overflow on mobile. Use `min-h-*` if needed.
- All card text that might overflow: use `overflow-hidden` on the card + `truncate` or `line-clamp-*` on text.
```

### 7.3 — Badge & Tag Overflow Prevention
```
- ALL inline badge/tag rows MUST use: `flex flex-wrap gap-1.5`
- Individual tags: `whitespace-nowrap text-xs` — never let a tag wrap mid-word
- When 3+ tags exist, the last visible ones should be cut with a "+N more" chip
- Tags must NOT cause parent card to grow wider than its grid column
```

### 7.4 — Stat Triplets / Quadruplets Inside Cards
```
Pattern appears on: district cards, species cards, habitat cards, water cards, PA cards.
Fix: `flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4` for the stat row.
Each stat unit: `flex flex-col items-center min-w-[48px]`
  Value: `text-sm sm:text-base font-bold leading-tight`
  Unit label: `text-xs leading-tight text-center`
On xs screens if 4+ stats, use `grid grid-cols-4` with truncated labels.
```

---

## SECTION 8 — BUTTONS & INTERACTIVE ELEMENTS

### 8.1 — Button Sizing Consistency
```
PRIMARY BUTTONS (hero CTAs): `px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl font-medium`
SECONDARY BUTTONS (section CTAs): `px-4 sm:px-5 py-2 sm:py-2.5 text-sm rounded-lg font-medium`
CARD BUTTONS ("View Details" / "Access Module" / "Explore"): `w-full py-2 text-sm rounded-lg font-medium`
ICON BUTTONS: `p-2 rounded-lg` minimum touch target 44×44px
FILTER TABS: `px-3 py-1.5 text-xs sm:text-sm rounded-lg`
TAG/CHIP BUTTONS: `px-3 py-1 text-xs rounded-full whitespace-nowrap`
```

### 8.2 — Touch Targets (Mobile Critical)
```
- Every clickable element must have a minimum touch area of 44×44px.
- If visual size is smaller, add padding to meet 44px minimum.
- Specific cases:
  - Nav links in mobile menu: `py-3` minimum
  - Social icons in footer: `p-2` minimum
  - Filter tabs: `py-2` minimum on mobile
  - "View All" links: `py-2` minimum
```

### 8.3 — Button Text Wrapping
```
- All buttons must use `whitespace-nowrap` unless they are explicitly full-width.
- Buttons in a flex row: `flex-shrink-0` to prevent shrinking below content width.
- If a button row can't fit on one line, switch to `flex-col` at the appropriate breakpoint.
```

---

## SECTION 9 — OVERFLOW & OVERFLOW-X BUGS

### 9.1 — Identified Overflow Sources
```
- Stats rows with 8+ items on mobile — fix with 2 or 3 column grid (see above per-section)
- Badge clusters inside cards — use flex-wrap (see Section 7.3)
- Long district/species names — use truncate with title attribute
- Horizontal scroll caused by absolute-positioned hero elements — clip with overflow-hidden on section
- Tables not converted to cards on mobile — see Section 6.2
- Footer 5-column grid collapsing badly on md — see Section 1.5
- Alert severity + location text on one line overflowing — use flex-wrap (see Section 2.4)
- Navigation items not fitting at lg — hamburger at md (see Section 1.4)
```

### 9.2 — Overlapping Elements
```
- Sticky nav z-index: `z-40`. Page content: `z-0`. Modals/overlays: `z-50`. Tooltips: `z-60`.
- Any card with a status indicator positioned absolute: ensure parent has `relative overflow-hidden`
- Hero badge positioned over headline: ensure `position: relative` stacking context on hero container
- Map/chart containers: `max-w-full overflow-hidden` wrapper always
```

---

## SECTION 10 — SPAN & INLINE ELEMENT BUGS

```
- All `<span>` used as chip/badge: `inline-flex items-center` (NOT just `inline`) to prevent misalignment with neighbors
- Status indicator dots (colored circles): `inline-block w-2 h-2 rounded-full flex-shrink-0 mt-0.5` — use `mt-0.5` to align with first line of adjacent text
- Numeric spans in stat cards: `tabular-nums` to prevent layout shift as numbers update
- Icon + text combos inside spans: always `inline-flex items-center gap-1`
- Trend arrows (↑↓→): wrap in `<span aria-hidden="true">` with `sr-only` text for accessibility
- Multi-word labels that must stay together: `whitespace-nowrap` on the parent span
- Long single-word scientific names (Cervus hanglu hanglu): `break-words` or `overflow-wrap: break-word`
```

---

## SECTION 11 — SPECIFIC COMPONENT BUG FIXES

### Wetland Stress Watch Panel
```
Issue: "Hokersar Wetland - Eutrophication Risk" title too long for small cards
Fix: `.panel-alert-title { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }`
Or Tailwind: `line-clamp-2`
Severity badge (HIGH/MEDIUM): must be `flex-shrink-0 self-start` so it stays top-right
District + date row must be `flex-wrap` to stack date below district on xs
```

### Air Quality Intelligence Card
```
AQI "156 / +12% / 142 / 24" stats: `grid grid-cols-2 sm:grid-cols-4 gap-3` inside the card
"Current AQI: Moderate" badge: must be full-width on mobile, `w-full text-center`
```

### District Ecological Scorecard Summary Row
```
"Kupwara 83 score" / "Anantnag 312 species" / "Baramulla Improving" / "Pulwama Moderate-High":
On xs, these 4 summary badges may overflow. Fix: `grid grid-cols-2 gap-3` always.
Each badge title: `text-xs leading-tight`, subtitle: `font-bold text-sm sm:text-base`
```

### Live Dashboard Preview Cards
```
"Active zones: 67" and "Total: 4,521" use bold in markdown — ensure these are actual `<strong>` or `font-bold` spans, not broken markdown rendering.
```

### Report an Issue Quick Buttons (Alert Section)
```
Buttons: Pollution Complaint / Illegal Dumping / Wildlife Sighting / Habitat Damage / Water Quality Issue
On mobile these 5 buttons MUST wrap gracefully: `flex flex-wrap gap-2`
Each: `px-3 py-1.5 text-xs rounded-full whitespace-nowrap border`
```

### NWIA Wetland Classification Table
```
Convert to responsive stats grid: `grid grid-cols-2 sm:grid-cols-4 gap-4`
Each: value `text-xl font-bold`, label `text-xs`
```

---

## SECTION 12 — PERFORMANCE & MOBILE POLISH

```
- Add `will-change: transform` only on animated elements (hero badge, notification dots)
- Use CSS `content-visibility: auto` on below-fold sections for mobile performance
- Ensure all images have `width` and `height` attributes to prevent CLS
- Map containers: add `min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]` with loading skeleton
- Loading skeleton for live data panels: `animate-pulse bg-white/5 rounded`
- Remove any `transition-all` (expensive) — replace with specific `transition-colors duration-200` or `transition-transform duration-200`
```

---

## SECTION 13 — FINAL CHECKLIST BEFORE DEPLOY

Run through this checklist at each breakpoint (320px, 480px, 640px, 768px, 1024px, 1280px):

```
[ ] No horizontal scrollbar at any breakpoint
[ ] All card grids reflow correctly (1→2→3→4 columns)
[ ] All h1/h2/h3 sizes are proportional and don't overlap
[ ] All badge/tag rows wrap, no overflow
[ ] All buttons have minimum 44px touch target
[ ] CTA buttons in cards are at card bottom (flex-col + mt-auto)
[ ] Nav collapses to hamburger on md and below
[ ] Footer columns reflow to 2-col on sm
[ ] Alert severity badges stay on same line as title (flex-shrink-0)
[ ] Stats in hero section don't overflow on xs (2-col grid)
[ ] No absolute-positioned elements bleed outside viewport
[ ] District cards' "Strength/Challenge" tags wrap properly
[ ] Species card scientific names don't overflow (break-words)
[ ] All table views convert to card stacks on mobile
[ ] Map containers have min-height and loading state
[ ] Social icon row in footer wraps on xs
[ ] All form inputs are full-width on mobile
```

---

*Generated by deep analysis of https://kashmir-eco-watch.vercel.app/ — covers Home, Biodiversity, Water Systems, Protected Network, Environmental Monitoring, Field Reports, Contribute, and Risk & Monitoring pages.*
