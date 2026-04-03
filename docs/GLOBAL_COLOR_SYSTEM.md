# Kashmir EcoWatch Global Color System

## Executive Summary

Kashmir EcoWatch is a **scientific environmental intelligence platform**. The visual system must reflect:
- **Scientific authority** — calm, trustworthy, data-driven
- **Real-time monitoring** — live feeds, alerts, operational awareness
- **Ecological focus** — biodiversity, water, protected areas, climate

### Core Principle: State-First, Not Module-First

❌ **Wrong**: Water page = blue theme, Biodiversity = green theme, Risk = orange theme  
✅ **Correct**: Scientific Base + Module Accent + Semantic Status

---

## 1. Universal Visual Governance Model

### Three Universal States

| State | Purpose | Usage |
|-------|---------|-------|
| **Scientific Base** | Default surface for all content | Cards, panels, tables, dashboards, scorecards |
| **Monitoring** | Caution signals | Watchlists, quality decline, moderate risk, stress indicators |
| **Alert/Critical** | Emergency signals | Live alerts, critical warnings, hazard escalation |

---

## 2. Color Palettes

### 2.1 Institutional Colors (Brand Identity)

These are **restrained** branding colors for platform identity.

| Token | Value | Usage |
|-------|-------|-------|
| `forest-500` | `#2d8f6f` | Primary brand, navigation, hero accents |
| `forest-600` | `#1f7359` | Hover states, active indicators |
| `forest-700` | `#1a5c48` | Deep accents, borders |
| `glacier-500` | `#2d7fb0` | Secondary brand, water intelligence |
| `glacier-600` | `#1f6691` | Glacier hover states |
| `glacier-700` | `#1a5275` | Deep water accents |

**Do:**
- Use for logo context, section dividers, inactive chart highlights
- Apply as subtle hover lines and icon accents

**Don't:**
- Use for status indicators
- Apply to whole page backgrounds
- Mix with semantic colors

---

### 2.2 Ecological Module Accents (Category Identity)

These are **light** category accents for module identification.

| Module | Accent | Usage |
|--------|--------|-------|
| Protected Areas | `forest-500` | Parks, sanctuaries, reserves |
| Biodiversity | `emerald-400` | Species, ecosystems, threatened fauna/flora |
| Water Systems | `glacier-500` | Lakes, wetlands, rivers, watersheds |
| Seasonal Ecology | `amber-400` | Phenology, seasonal shifts |
| Trails & Sightings | `teal-400` | Touring, field observations |
| Risk & Monitoring | `orange-400` | Hazard feeds, monitoring dashboards |

**Do:**
- Use for small tabs, icons, map layer toggles
- Apply as 1-2px accent lines on cards
- Use in chart series differentiation

**Don't:**
- Overpower semantic status colors
- Use for warnings or alerts
- Apply to text that needs high contrast

---

### 2.3 Semantic Status Colors (Operational Meaning)

These **override all other colors** when status communication is needed.

#### Status Hierarchy

| Status | Token | Background | Border | Text | Usage |
|--------|-------|------------|--------|------|-------|
| **Stable** | `status-stable` | `bg-emerald-900/20` | `border-emerald-700` | `text-emerald-400` | Normal operations, verified data, good quality |
| **Monitoring** | `status-monitoring` | `bg-amber-900/20` | `border-amber-700` | `text-amber-400` | Active watch, quality decline, moderate risk |
| **Warning** | `status-warning` | `bg-orange-900/20` | `border-orange-700` | `text-orange-400` | Elevated risk, deteriorating conditions |
| **Critical** | `status-critical` | `bg-red-900/20` | `border-red-700` | `text-red-400` | Emergency, severe events, immediate action |
| **Informational** | `status-info` | `bg-glacier-900/20` | `border-glacier-700` | `text-glacier-400` | General updates, neutral data |
| **Resolved** | `status-resolved` | `bg-slate-700/30` | `border-slate-600` | `text-slate-400` | Closed incidents, historical data |

#### Badge Variants (Semantic)

```tsx
<Badge variant="stable">Stable</Badge>
<Badge variant="monitoring">Active Monitoring</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="critical">Critical</Badge>
<Badge variant="info">Informational</Badge>
<Badge variant="resolved">Resolved</Badge>
```

#### Alert Severity Indicators

```css
/* Critical Alert Card */
.alert-critical {
  background: linear-gradient(135deg, rgba(220, 38, 38, 0.15), rgba(220, 38, 38, 0.05));
  border-left: 4px solid #dc2626;
}

/* Warning Alert Card */
.alert-warning {
  background: linear-gradient(135deg, rgba(234, 88, 12, 0.15), rgba(234, 88, 12, 0.05));
  border-left: 4px solid #ea580c;
}

/* Monitoring Card */
.alert-monitoring {
  background: linear-gradient(135deg, rgba(217, 119, 6, 0.15), rgba(217, 119, 6, 0.05));
  border-left: 4px solid #d97706;
}

/* Stable/Normal Card */
.alert-stable {
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.03));
  border-left: 4px solid #10b981;
}
```

---

### 2.4 Neutral Base (Surface System)

A **deep observatory dark base** for scientific readability.

| Surface | Token | Value | Usage |
|---------|-------|-------|-------|
| Surface 0 | `--surface-0` | `#020617` | App background (slate-950) |
| Surface 1 | `--surface-1` | `#0f172a` | Section background (slate-900) |
| Surface 2 | `--surface-2` | `#1e293b` | Card background (slate-800) |
| Surface 3 | `--surface-3` | `#334155` | Elevated panel (slate-700) |
| Surface 4 | `--surface-4` | `#475569` | Active/selected (slate-600) |

---

### 2.5 Text Hierarchy

| Role | Token | Light Mode | Dark Mode | Usage |
|------|-------|------------|-----------|-------|
| Primary | `--text-primary` | `#0f172a` | `#f1f5f9` | Headings, primary content |
| Secondary | `--text-secondary` | `#334155` | `#cbd5e1` | Body text, descriptions |
| Muted | `--text-muted` | `#64748b` | `#64748b` | Support text, timestamps |
| Inverse | `--text-inverse` | `#ffffff` | `#020617` | Text on dark backgrounds |
| Disabled | `--text-disabled` | `#94a3b8` | `#475569` | Disabled states |

---

## 3. Component Rules

### 3.1 Cards

**Default Card (Scientific Base)**
```tsx
<div className="bg-slate-800/50 border border-slate-700 rounded-lg">
  {/* Content */}
</div>
```

**Status Card (Semantic Override)**
```tsx
<div className="bg-amber-900/20 border border-amber-700 rounded-lg">
  <Badge variant="monitoring">Active Monitoring</Badge>
  {/* Content */}
</div>
```

**Module-Accented Card**
```tsx
<div className="bg-slate-800/50 border-l-4 border-glacier-500 rounded-lg">
  {/* Water Systems content */}
</div>
```

---

### 3.2 Buttons

| Type | Style | Usage |
|------|-------|-------|
| Primary | `bg-forest-600 hover:bg-forest-500 text-white` | Main CTAs, confirm actions |
| Secondary | `bg-slate-700 hover:bg-slate-600 text-slate-200` | Secondary actions, filters |
| Ghost | `bg-transparent hover:bg-slate-800 text-slate-400` | Tertiary actions, cancels |
| Danger | `bg-red-700 hover:bg-red-600 text-white` | Delete, emergency actions |
| Status | Semantic color | Alert actions, status changes |

---

### 3.3 Tables

**Header Row**
```tsx
<th className="bg-slate-800 border-b border-slate-700 text-slate-300">
```

**Data Row**
```tsx
<td className="bg-slate-900/50 border-b border-slate-800 text-slate-400">
```

**Status Row (Semantic)**
```tsx
<tr className="bg-amber-900/10 border-l-4 border-amber-600">
  <td><Badge variant="monitoring">Monitoring</Badge></td>
</tr>
```

---

### 3.4 Badges

**Size Scale**
- `sm`: 8px font, 2px padding — Inline labels, dense tables
- `md`: 12px font, 6px/10px padding — Default usage
- `lg`: 14px font, 8px/12px padding — Hero sections, standalone

**Variant Mapping**
```tsx
const badgeVariants = {
  stable: 'bg-emerald-900/30 text-emerald-400 border border-emerald-700/50',
  monitoring: 'bg-amber-900/30 text-amber-400 border border-amber-700/50',
  warning: 'bg-orange-900/30 text-orange-400 border border-orange-700/50',
  critical: 'bg-red-900/30 text-red-400 border border-red-700/50',
  info: 'bg-glacier-900/30 text-glacier-400 border border-glacier-700/50',
  resolved: 'bg-slate-700/50 text-slate-400 border border-slate-600',
  default: 'bg-slate-700 text-slate-300',
};
```

---

### 3.5 Map Overlays

**Layer Indicators**
```tsx
// Active layer toggle
<div className="flex items-center gap-2 px-3 py-1.5 rounded bg-forest-900/50 border border-forest-700">
  <div className="w-2 h-2 rounded-full bg-forest-500 animate-pulse" />
  <span className="text-forest-300 text-sm">Protected Areas</span>
</div>
```

**Alert Markers**
```tsx
// Critical alert marker
<div className="relative">
  <div className="w-4 h-4 rounded-full bg-red-600 border-2 border-white shadow-lg" />
  <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-75" />
</div>
```

---

## 4. Contrast Rules

### Minimum WCAG AA Compliance

| Text Size | Minimum Ratio |
|-----------|---------------|
| Normal (<18px) | 4.5:1 |
| Large (≥18px) | 3:1 |

### Approved Text-on-Background Combinations

| Background | Approved Text Colors |
|------------|---------------------|
| `slate-900` | `slate-100`, `slate-200`, `slate-300`, `forest-300`, `glacier-300` |
| `slate-800` | `slate-100`, `slate-200`, `forest-300`, `glacier-300`, `emerald-300` |
| `emerald-900/30` | `emerald-300`, `emerald-400`, `white` |
| `amber-900/30` | `amber-300`, `amber-400`, `white` |
| `red-900/30` | `red-300`, `red-400`, `white` |

### ❌ Forbidden Combinations

- `amber-400` on `slate-800` (fails contrast)
- `slate-500` on `slate-900` (too muted)
- `forest-600` on `slate-800` (insufficient contrast)
- Any colored text on colored backgrounds without verification

---

## 5. Do's and Don'ts

### ✅ Do

1. **Use semantic colors for status communication**
   ```tsx
   <Badge variant="critical">Critical Flood Alert</Badge>
   ```

2. **Keep module accents subtle**
   ```tsx
   <div className="border-l-4 border-glacier-500">Water Systems Card</div>
   ```

3. **Maintain one neutral base across all pages**
   ```tsx
   <div className="bg-slate-900">Page Background</div>
   ```

4. **Prioritize text contrast**
   ```tsx
   <p className="text-slate-300">Readable body text</p>
   ```

5. **Use status colors consistently**
   - `critical` = red everywhere (alerts, floods, species threat)
   - `monitoring` = amber everywhere (watchlists, stress)
   - `stable` = emerald everywhere (normal, verified)

---

### ❌ Don't

1. **Don't color whole pages by module**
   ```tsx
   // ❌ Wrong
   <div className="bg-blue-900">Water Systems Page</div>
   
   // ✅ Correct
   <div className="bg-slate-900 border-l-4 border-glacier-500">
     Water Systems Page
   </div>
   ```

2. **Don't invent new status colors per page**
   ```tsx
   // ❌ Wrong - page-specific orange
   <Badge className="bg-custom-orange">Warning</Badge>
   
   // ✅ Correct - semantic orange
   <Badge variant="warning">Warning</Badge>
   ```

3. **Don't use module colors for alerts**
   ```tsx
   // ❌ Wrong - using forest green for critical
   <Badge className="bg-forest-600">Critical Alert</Badge>
   
   // ✅ Correct - semantic red for critical
   <Badge variant="critical">Critical Alert</Badge>
   ```

4. **Don't place low-contrast text on tinted backgrounds**
   ```tsx
   // ❌ Wrong
   <div className="bg-amber-900/30">
     <p className="text-slate-500">Hard to read</p>
   </div>
   
   // ✅ Correct
   <div className="bg-amber-900/30">
     <p className="text-amber-300">Easy to read</p>
   </div>
   ```

---

## 6. Developer Token System

### CSS Variables (globals.css)

```css
:root {
  /* Surface System */
  --surface-0: 2, 6, 23;      /* slate-950 */
  --surface-1: 15, 23, 42;    /* slate-900 */
  --surface-2: 30, 41, 59;    /* slate-800 */
  --surface-3: 51, 65, 85;    /* slate-700 */
  --surface-4: 71, 85, 105;   /* slate-600 */
  
  /* Text System */
  --text-primary: 241, 245, 249;    /* slate-100 */
  --text-secondary: 203, 213, 225;  /* slate-300 */
  --text-muted: 100, 116, 139;      /* slate-500 */
  --text-inverse: 2, 6, 23;         /* slate-950 */
  
  /* Semantic Status Colors */
  --status-stable: 16, 185, 129;       /* emerald-500 */
  --status-monitoring: 217, 119, 6;    /* amber-600 */
  --status-warning: 234, 88, 12;       /* orange-600 */
  --status-critical: 220, 38, 38;      /* red-600 */
  --status-info: 45, 127, 176;         /* glacier-600 */
  --status-resolved: 100, 116, 139;    /* slate-500 */
}
```

### Tailwind Config Extension

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        // Semantic status colors
        status: {
          stable: 'rgb(var(--status-stable) / <alpha-value>)',
          monitoring: 'rgb(var(--status-monitoring) / <alpha-value>)',
          warning: 'rgb(var(--status-warning) / <alpha-value>)',
          critical: 'rgb(var(--status-critical) / <alpha-value>)',
          info: 'rgb(var(--status-info) / <alpha-value>)',
          resolved: 'rgb(var(--status-resolved) / <alpha-value>)',
        },
        // Surface colors
        surface: {
          0: 'rgb(var(--surface-0) / <alpha-value>)',
          1: 'rgb(var(--surface-1) / <alpha-value>)',
          2: 'rgb(var(--surface-2) / <alpha-value>)',
          3: 'rgb(var(--surface-3) / <alpha-value>)',
          4: 'rgb(var(--surface-4) / <alpha-value>)',
        },
      },
    },
  },
}
```

---

## 7. Migration Guide

### From Old Badge Variants to New Semantic System

| Old Variant | New Variant | Notes |
|-------------|-------------|-------|
| `success` | `stable` | For normal/verified states |
| `warning` | `monitoring` | For active watch states |
| `danger` | `critical` | For emergency states |
| `info` | `info` | Unchanged |
| N/A | `warning` | New: elevated risk |
| N/A | `resolved` | New: closed/historical |

### From Module Colors to Semantic

```tsx
// Before
<Badge className="bg-forest-600">Normal</Badge>
<Badge className="bg-amber-500">Watch</Badge>
<Badge className="bg-red-600">Alert</Badge>

// After
<Badge variant="stable">Normal</Badge>
<Badge variant="monitoring">Watch</Badge>
<Badge variant="critical">Alert</Badge>
```

---

## 8. Quick Reference Card

```
┌─────────────────────────────────────────────────────────┐
│           KASHMIR ECOWATCH COLOR SYSTEM                 │
├─────────────────────────────────────────────────────────┤
│  BASE: slate-950 → slate-800 (surfaces)                 │
│  ACCENT: forest-500, glacier-500 (module identity)      │
│  STATUS: emerald, amber, orange, red (meaning)          │
├─────────────────────────────────────────────────────────┤
│  Stable     → emerald-400 on emerald-900/20             │
│  Monitoring → amber-400 on amber-900/20                 │
│  Warning    → orange-400 on orange-900/20               │
│  Critical   → red-400 on red-900/20                     │
│  Info       → glacier-400 on glacier-900/20             │
│  Resolved   → slate-400 on slate-700/30                 │
├─────────────────────────────────────────────────────────┤
│  TEXT: slate-100 (primary), slate-300 (secondary)       │
│  Never use slate-500 or lower on dark backgrounds       │
└─────────────────────────────────────────────────────────┘
```

---

## 9. Implementation Checklist

- [ ] Add CSS variables to `globals.css`
- [ ] Extend Tailwind config with semantic colors
- [ ] Update `Badge.tsx` with new variants
- [ ] Audit all pages for contrast failures
- [ ] Replace module-specific alert colors with semantic variants
- [ ] Update all card components to use surface system
- [ ] Verify all badge text meets WCAG AA
- [ ] Document component usage examples

---

**Version:** 1.0  
**Last Updated:** 2026-04-03  
**Owner:** Environmental Intelligence Platform Design System
