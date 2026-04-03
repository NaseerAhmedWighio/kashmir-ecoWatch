# Kashmir EcoWatch — Universal Design System

## Executive Summary

**Kashmir EcoWatch should look like a scientific observatory platform first, and a thematic environmental website second.**

This design system establishes a **semantic, state-first** visual architecture that prioritizes operational clarity over decorative module-based coloring. The system is built on three core principles:

1. **Scientific Base** — One neutral, deep observatory foundation across all modules
2. **Module Accent** — Subtle domain identity that never overpowers semantic states
3. **Semantic Status** — Universal meaning for alerts, monitoring, and ecological states

---

## Core Problem Statement

### Current Issue: Module-Based Coloring

The platform currently risks visual inconsistency through:
- Different pages inventing their own color systems
- Module identity colors competing with status colors
- Ambiguous badge and alert semantics
- Text legibility failures on tinted backgrounds
- Inconsistent monitoring and alert surfaces

### Solution: Semantic State-First Architecture

All visual decisions flow from **ecological state**, not module identity:
- **Stable Intelligence** → Base scientific surfaces
- **Monitoring / Caution** → Active watch states
- **Critical / Alerts** → Emergency and escalation states

---

## 1. Surface Hierarchy

Use exactly **5 surface levels** platform-wide. Do not invent module-specific surfaces.

| Surface | Usage | CSS Variable | Tailwind Class |
|---------|-------|--------------|----------------|
| **Surface 0** | App background, main canvas | `--surface-0` | `bg-surface-0` |
| **Surface 1** | Section backgrounds, panels | `--surface-1` | `bg-surface-1` |
| **Surface 2** | Card backgrounds, elevated panels | `--surface-2` | `bg-surface-2` |
| **Surface 3** | Drawers, modals, active panels | `--surface-3` | `bg-surface-3` |
| **Surface 4** | Selected, focused, active states | `--surface-4` | `bg-surface-4` |

### Dark Observatory Base (Default)

```css
:root {
  --surface-0: #020617;      /* Deep slate — main canvas */
  --surface-1: #0f172a;      /* Section panels */
  --surface-2: #1e293b;      /* Cards */
  --surface-3: #334155;      /* Elevated / drawers */
  --surface-4: #475569;      /* Active / selected */
}
```

### Light Base (Optional, for specific dashboards)

```css
[data-theme="light"] {
  --surface-0: #f8fafc;
  --surface-1: #f1f5f9;
  --surface-2: #ffffff;
  --surface-3: #e2e8f0;
  --surface-4: #cbd5e1;
}
```

### Rules

- **Never** use module colors as surface backgrounds
- **Never** tint cards by module identity
- Surface contrast must maintain WCAG AA minimum (4.5:1 for text)
- Surfaces are **neutral** — semantic states overlay on top

---

## 2. Text Hierarchy

Use exactly **4 text roles** platform-wide.

| Role | Usage | CSS Variable | Dark Value | Light Value |
|------|-------|--------------|------------|-------------|
| **Primary** | Headings, key metrics | `--text-primary` | `#f8fafc` | `#0f172a` |
| **Secondary** | Body text, labels | `--text-secondary` | `#cbd5e1` | `#334155` |
| **Muted** | Support text, captions | `--text-muted` | `#64748b` | `#64748b` |
| **Inverse** | Text on dark/colored bg | `--text-inverse` | `#020617` | `#ffffff` |

### Typography Scale

```css
/* Font Families */
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;

/* Font Sizes */
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Rules

- **Primary text** on surfaces 0–3
- **Inverse text** only on semantic state backgrounds or dark overlays
- **Muted text** never on surfaces 3+ (contrast failure risk)
- Metric labels always use **Secondary** or **Muted**, never Primary

---

## 3. Semantic Status Palette

This is the **most critical** part of the system. Status colors **override** all module accents.

### Platform-Wide Status Definitions

| Status | Meaning | Usage | CSS Variable | Hex (Dark) | Hex (Light) |
|--------|---------|-------|--------------|------------|-------------|
| **Informational** | Neutral data, guidance | Info cards, help text | `--status-info` | `#38bdf8` | `#0284c7` |
| **Stable** | Normal operations, verified | Scorecards, healthy systems | `--status-stable` | `#34d399` | `#059669` |
| **Monitoring** | Active watch, caution | Watchlists, stress indicators | `--status-monitoring` | `#fbbf24` | `#d97706` |
| **Warning** | Degradation, moderate risk | Quality decline, pending review | `--status-warning` | `#f97316` | `#ea580c` |
| **Critical** | Escalation, emergency | Live alerts, hazard escalation | `--status-critical` | `#ef4444` | `#dc2626` |
| **Resolved** | Incident closed, recovered | Post-event reports | `--status-resolved` | `#a78bfa` | `#7c3aed` |

### Semantic State Tokens

Each status includes surface, border, and text variants:

```css
/* Example: Critical State */
--status-critical-surface: rgba(239, 68, 68, 0.1);   /* 10% opacity */
--status-critical-border: rgba(239, 68, 68, 0.3);    /* 30% opacity */
--status-critical-text: #ef4444;
--status-critical-text-inverse: #ffffff;
```

### Status Application Rules

1. **Status overrides module accent** — A critical flood warning uses Critical red, not Water blue
2. **Consistent across modules** — "Critical" looks identical on Water, Biodiversity, and Risk pages
3. **Never invent new status hues** — Use only the 6 defined statuses
4. **Surface tinting** — Use 10% opacity for card backgrounds, 30% for borders

### Usage Examples

```tsx
// ✅ Correct: Semantic state drives color
<Badge variant="critical">CRITICAL</Badge>
<Card className="bg-status-critical-surface border-status-critical-border">

// ❌ Wrong: Module identity drives color
<Badge variant="water-critical">CRITICAL</Badge>  // Don't do this
```

---

## 4. Module Accent Palette

Module accents provide **subtle domain identity** without competing with semantic states.

### Defined Module Accents

| Module | Accent Color | CSS Variable | Hex | Usage |
|--------|--------------|--------------|-----|-------|
| **Biodiversity** | Emerald | `--accent-biodiversity` | `#10b981` | Icons, tabs, map layers |
| **Water Systems** | Sky | `--accent-water` | `#0ea5e9` | Icons, tabs, map layers |
| **Protected Areas** | Forest | `--accent-protected` | `#059669` | Icons, tabs, map layers |
| **Seasonal Ecology** | Amber | `--accent-seasonal` | `#f59e0b` | Icons, tabs, map layers |
| **Trails & Sightings** | Teal | `--accent-trails` | `#14b8a6` | Icons, tabs, map layers |
| **Risk Monitoring** | Orange | `--accent-risk` | `#f97316` | Icons, tabs, map layers |
| **Districts** | Slate | `--accent-districts` | `#64748b` | Icons, tabs, map layers |
| **Atlas / GIS** | Indigo | `--accent-atlas` | `#6366f1` | Icons, tabs, map layers |

### Module Accent Rules

1. **Small applications only** — Icons, tabs, hover lines, map toggles
2. **Never on cards or surfaces** — Do not tint entire modules
3. **Never on badges or alerts** — Semantic states override
4. **Low saturation preferred** — Use 400–500 weight, not 900

### Correct Usage

```tsx
// ✅ Tab indicator
<Tab className="border-b-2 border-accent-water" />

// ✅ Icon accent
<WaterIcon className="text-accent-water" />

// ✅ Map layer toggle
<LayerToggle activeColor="accent-biodiversity" />

// ❌ Card background (WRONG)
<Card className="bg-accent-water/10">  // Don't do this

// ❌ Alert badge (WRONG)
<Badge variant="biodiversity-warning">  // Don't do this
```

---

## 5. Badge System

One unified badge scale platform-wide.

### Badge Variants

| Variant | Background | Border | Text | Usage |
|---------|------------|--------|------|-------|
| **Default** | `--surface-3` | `--surface-4` | `--text-secondary` | Neutral labels |
| **Stable** | `--status-stable-surface` | `--status-stable-border` | `--status-stable` | Normal, verified, healthy |
| **Monitoring** | `--status-monitoring-surface` | `--status-monitoring-border` | `--status-monitoring` | Active watch, caution |
| **Warning** | `--status-warning-surface` | `--status-warning-border` | `--status-warning` | Moderate risk, decline |
| **Critical** | `--status-critical-surface` | `--status-critical-border` | `--status-critical` | Emergency, escalation |
| **Info** | `--status-info-surface` | `--status-info-border` | `--status-info` | Informational, guidance |
| **Outline** | Transparent | `--surface-4` | `--text-muted` | Secondary metadata |

### Badge Sizes

| Size | Font | Padding | Usage |
|------|------|---------|-------|
| **XS** | 10px (0.625rem) | `px-1.5 py-0.5` | Inline labels, dense tables |
| **SM** | 11px (0.6875rem) | `px-2 py-0.5` | Chip filters, tags |
| **MD** | 12px (0.75rem) | `px-2.5 py-1` | Default badges |
| **LG** | 14px (0.875rem) | `px-3 py-1.5` | Hero stats, featured |

### Badge Rules

1. **Text must be the status color** — Not white, not inverse
2. **Background is 10% opacity** — Never solid status colors
3. **Border is 30% opacity** — Creates depth without heaviness
4. **One badge style per status** — No module variants

### Implementation

```tsx
interface BadgeProps {
  variant: 'default' | 'stable' | 'monitoring' | 'warning' | 'critical' | 'info' | 'outline';
  size: 'xs' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

// Example usage
<Badge variant="critical" size="md">CRITICAL</Badge>
<Badge variant="monitoring" size="sm">Active Monitoring</Badge>
<Badge variant="stable" size="xs">Verified</Badge>
```

---

## 6. Button System

One primary, one secondary, one outline, one ghost.

### Button Variants

| Variant | Background | Hover | Text | Usage |
|---------|------------|-------|------|-------|
| **Primary** | `--status-stable` | `--status-stable-hover` | `--text-inverse` | Main CTAs, confirm |
| **Secondary** | `--surface-3` | `--surface-4` | `--text-primary` | Secondary actions |
| **Outline** | Transparent | `--surface-1` | `--text-secondary` | Tertiary actions, filters |
| **Ghost** | Transparent | `--surface-2` | `--text-secondary` | Icon buttons, nav |

### Critical/Danger Actions

For destructive actions (delete, remove, revoke):

| Variant | Background | Hover | Text |
|---------|------------|-------|------|
| **Danger** | `--status-critical` | `--status-critical-hover` | `--text-inverse` |

### Button Sizes

| Size | Padding | Font | Icon Gap |
|------|---------|------|----------|
| **SM** | `px-3 py-1.5` | 0.875rem | 0.25rem |
| **MD** | `px-4 py-2` | 0.875rem | 0.375rem |
| **LG** | `px-6 py-2.5` | 1rem | 0.5rem |

### Button Rules

1. **Primary uses Stable green** — Not module accents
2. **Danger uses Critical red** — Only for destructive actions
3. **Outline and Ghost are neutral** — No colored borders except hover
4. **Disabled state is uniform** — `opacity-50 cursor-not-allowed`

---

## 7. Card and Panel System

### Card Anatomy

```
┌─────────────────────────────────────┐
│ [Header: Title + Badge + Actions]   │ ← Surface 2, border Surface 4
├─────────────────────────────────────┤
│ [Content: Metrics, charts, text]    │ ← Text hierarchy applies
├─────────────────────────────────────┤
│ [Footer: CTAs, metadata]            │ ← Muted text, outline buttons
└─────────────────────────────────────┘
```

### Card Variants

| Variant | Background | Border | Usage |
|---------|------------|--------|-------|
| **Default** | `--surface-2` | `--surface-4` | Standard cards |
| **Elevated** | `--surface-3` | `--surface-4` | Drawers, modals |
| **Stable** | `--status-stable-surface` | `--status-stable-border` | Verified data |
| **Monitoring** | `--status-monitoring-surface` | `--status-monitoring-border` | Watch states |
| **Warning** | `--status-warning-surface` | `--status-warning-border` | Risk alerts |
| **Critical** | `--status-critical-surface` | `--status-critical-border` | Emergency |

### Card Rules

1. **Default is neutral** — No module tinting
2. **Semantic variants use status tokens** — Not module accents
3. **Header badge drives meaning** — Badge variant matches card variant
4. **Text contrast is non-negotiable** — Test all combinations

### Example

```tsx
<Card variant="monitoring">
  <CardHeader>
    <CardTitle>Wetland Stress Watch</CardTitle>
    <Badge variant="monitoring">Active Monitoring</Badge>
  </CardHeader>
  <CardContent>
    <Metric label="Stress Level" value="Moderate" />
    <Chart data={stressData} accentColor="accent-water" />
  </CardContent>
  <CardFooter>
    <Button variant="outline">View Details</Button>
    <Button variant="primary">Take Action</Button>
  </CardFooter>
</Card>
```

---

## 8. Table and Dashboard System

### Table Structure

| Element | Background | Border | Text |
|---------|------------|--------|------|
| **Header** | `--surface-1` | `--surface-4` (bottom) | `--text-secondary` |
| **Row** | Transparent | `--surface-4` (bottom) | `--text-primary` |
| **Row Hover** | `--surface-1` | — | — |
| **Selected Row** | `--surface-2` | `--status-stable-border` (left, 3px) | — |

### Status Rows

When a table row represents a status (e.g., alert, risk level):

| Status | Left Border | Background Tint |
|--------|-------------|-----------------|
| Stable | `--status-stable` (3px) | `--status-stable-surface` |
| Monitoring | `--status-monitoring` (3px) | `--status-monitoring-surface` |
| Warning | `--status-warning` (3px) | `--status-warning-surface` |
| Critical | `--status-critical` (3px) | `--status-critical-surface` |

### Dashboard Grid Rules

1. **Uniform card sizes** — Use 12-column grid, cards span 3/4/6/12
2. **Consistent gaps** — `gap-4` (1rem) on all dashboards
3. **Metric cards are neutral** — Status is conveyed by badge, not background
4. **Charts use module accents** — But status overlays use semantic colors

---

## 9. Map Overlay Rules

### Map Layer Toggles

| State | Color | Usage |
|-------|-------|-------|
| **Inactive** | `--surface-4` | Layer not selected |
| **Active** | `--accent-{module}` | Layer selected (biodiversity, water, etc.) |
| **Alert Layer** | `--status-critical` | Hazard overlay active |

### Map Markers

| Marker Type | Color | Size |
|-------------|-------|------|
| **Entity** | `--accent-{module}` | 12px |
| **Alert** | `--status-critical` | 16px, pulse |
| **Monitoring** | `--status-monitoring` | 14px |
| **Verified** | `--status-stable` | 12px, checkmark |

### Map Popup Cards

Map popups follow card rules:
- Background: `--surface-2`
- Border: `--surface-4`
- Title: `--text-primary`
- Badge: Semantic status variant

---

## 10. Contrast and Accessibility Rules

### Minimum Contrast Ratios

| Element | Ratio | Test Method |
|---------|-------|-------------|
| **Primary Text** | 4.5:1 | WCAG AA |
| **Secondary Text** | 4.5:1 | WCAG AA |
| **Muted Text** | 3:1 | WCAG AA (minimum) |
| **Badge Text** | 4.5:1 | On tinted backgrounds |
| **Button Text** | 4.5:1 | All states |

### Forbidden Combinations

❌ **Never use:**
- Muted text on Surface 3 or higher
- White text on status surfaces without 90%+ opacity background
- Module accent text on status surfaces
- Status colors as large surface backgrounds (>50% of viewport)

### Required Testing

Before deploying any module:
1. Test all badges in dark and light mode
2. Test all buttons in hover, focus, disabled states
3. Test table rows with status tints
4. Test map popup legibility
5. Run automated WCAG check (axe, Lighthouse)

---

## 11. Do and Don't Examples

### ✅ DO: Semantic State Drives Color

```tsx
// Alert card uses Critical state, not module color
<Card variant="critical">
  <Badge variant="critical">CRITICAL</Badge>
  <Title>Spring Vulnerability Alert</Title>
</Card>

// Water module card with Monitoring state
<Card variant="monitoring">
  <Badge variant="monitoring">Active Monitoring</Badge>
  <Icon className="text-accent-water" />  {/* Module accent is small */}
  <Title>Algal Bloom Activity</Title>
</Card>
```

### ❌ DON'T: Module Identity Drives Color

```tsx
// Wrong: Module-specific critical variant
<Card className="bg-water-critical/10">  // Don't invent module statuses
  <Badge variant="water-critical">CRITICAL</Badge>  // Use semantic variant
</Card>

// Wrong: Entire page tinted by module
<Page className="bg-biodiversity-50">  // Keep surfaces neutral
  <Text className="text-biodiversity-900">  // Contrast will fail
</Page>
```

### ✅ DO: Consistent Badge Hierarchy

```tsx
// All modules use the same badge semantics
<Badge variant="stable">Normal</Badge>
<Badge variant="monitoring">Active Monitoring</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="critical">Critical</Badge>
```

### ❌ DON'T: Inconsistent Badge Variants

```tsx
// Wrong: Different modules, different badge meanings
<Badge variant="water-warning">Warning</Badge>   // Don't namespace statuses
<Badge variant="bio-warning">Caution</Badge>     // Same meaning, different name
<Badge variant="risk-alert">Critical</Badge>     // Use platform standard
```

---

## 12. Migration Guide

### Phase 1: Audit Current Usage

1. Search for all `bg-*` classes on cards and panels
2. Identify all badge variants in use
3. Map current button variants
4. Document text color failures (muted on tinted, white on colored)

### Phase 2: Define CSS Variables

Add to `globals.css`:
- Surface tokens (`--surface-0` through `--surface-4`)
- Text tokens (`--text-primary`, `--text-secondary`, etc.)
- Status tokens (surface, border, text for each status)
- Module accent tokens

### Phase 3: Update Tailwind Config

Extend `theme.colors` with semantic tokens:
```js
colors: {
  surface: { 0: 'var(--surface-0)', 1: 'var(--surface-1)', ... },
  status: {
    stable: 'var(--status-stable)',
    monitoring: 'var(--status-monitoring)',
    ...
  },
  accent: {
    biodiversity: 'var(--accent-biodiversity)',
    water: 'var(--accent-water)',
    ...
  }
}
```

### Phase 4: Component Updates

1. **Badge** — Replace variants with semantic states
2. **Button** — Standardize to 4 variants + danger
3. **Card** — Add variant prop with semantic options
4. **Typography** — Enforce 4 text roles

### Phase 5: Page-Level Refactors

For each module page:
1. Remove module-specific surface tints
2. Replace with neutral surfaces
3. Add module accent to icons/tabs only
4. Ensure all badges use semantic variants
5. Test contrast in dark and light mode

### Phase 6: Validation

1. Run Lighthouse accessibility audit
2. Manual review of all alert surfaces
3. Badge consistency check across modules
4. Button state testing (hover, focus, disabled)

---

## 13. Token Naming Convention

### CSS Variables

```css
/* Surfaces */
--surface-0
--surface-1
--surface-2
--surface-3
--surface-4

/* Text */
--text-primary
--text-secondary
--text-muted
--text-inverse

/* Status (6 states) */
--status-{state}              /* Main color */
--status-{state}-surface      /* 10% opacity background */
--status-{state}-border       /* 30% opacity border */
--status-{state}-hover        /* Darkened for hover */

/* Module Accents (8 modules) */
--accent-biodiversity
--accent-water
--accent-protected
--accent-seasonal
--accent-trails
--accent-risk
--accent-districts
--accent-atlas
```

### Tailwind Classes

```ts
bg-surface-0, bg-surface-1, ...
text-primary, text-secondary, text-muted, text-inverse
bg-status-stable, border-status-monitoring, text-status-critical
text-accent-water, border-accent-biodiversity, ...
```

---

## 14. Summary: The Three Laws

### Law 1: Surface Neutrality

> All surfaces are neutral. Module identity never tints backgrounds.

### Law 2: Semantic Supremacy

> Semantic status colors override module accents. A critical alert is always red, regardless of module.

### Law 3: Accent Restraint

> Module accents are small: icons, tabs, map layers, hover lines. Never cards, badges, or alerts.

---

## Appendix A: Quick Reference Card

| Element | Use This | Not This |
|---------|----------|----------|
| **Page Background** | `bg-surface-0` | `bg-biodiversity-50` |
| **Card Background** | `bg-surface-2` | `bg-water-100` |
| **Alert Card** | `bg-status-critical-surface` | `bg-red-500` |
| **Badge** | `variant="critical"` | `variant="danger"` |
| **Primary Button** | `variant="primary"` (Stable green) | `variant="brand"` |
| **Module Icon** | `text-accent-water` | `text-blue-500` |
| **Heading Text** | `text-primary` | `text-white` |
| **Body Text** | `text-secondary` | `text-slate-300` |
| **Caption Text** | `text-muted` | `text-slate-500` |

---

## Appendix B: Status Mapping

| Current Label | Map To | Notes |
|---------------|--------|-------|
| Normal, Fair, Good | `stable` | All healthy states |
| Active Monitoring, Watch | `monitoring` | Caution, not panic |
| Medium, Moderate | `warning` | Degradation detected |
| High, Severe | `warning` or `critical` | Context-dependent |
| Critical, Emergency | `critical` | Immediate action |
| Resolved, Recovered | `resolved` | Post-event |
| Info, Guidance | `info` | Non-urgent |

---

**Document Version:** 1.0  
**Last Updated:** 2026-04-03  
**Owner:** Design System Working Group  
**Next Review:** After module migration (Phase 5)
