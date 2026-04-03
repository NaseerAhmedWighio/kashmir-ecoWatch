# Kashmir EcoWatch — Design System

## Scientific Observatory Visual Architecture

This design system establishes a **semantic, state-first** visual architecture for the Kashmir Environmental Intelligence Platform.

---

## Quick Start

### 1. Read the Core Document

Start here: **[UNIVERSAL_DESIGN_SYSTEM.md](./UNIVERSAL_DESIGN_SYSTEM.md)**

This contains:
- The three laws of semantic visual architecture
- Surface hierarchy (5 levels)
- Text hierarchy (4 roles)
- Semantic status palette (6 states)
- Module accent palette (8 modules)
- Component rules (badges, buttons, cards, tables)

### 2. Copy-Paste Examples

Need to implement something now? See: **[USAGE_EXAMPLES.md](./USAGE_EXAMPLES.md)**

Includes:
- All badge variants with sizes
- All button variants with icons
- Card patterns (neutral and status-based)
- Table patterns with status rows
- Map overlay patterns
- Dashboard grid patterns
- Module-specific examples (Water, Biodiversity, Risk)

### 3. Migrating Existing Code

Have legacy components to update? See: **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)**

Includes:
- Audit scripts
- Variant mapping (old → new)
- Page-by-page migration plan
- Testing checklist
- Rollback plan

---

## The Three Laws

### Law 1: Surface Neutrality

> All surfaces are neutral. Module identity never tints backgrounds.

```tsx
// ✅ Correct
<Card className="bg-surface-2">

// ❌ Wrong
<Card className="bg-water-100">
```

### Law 2: Semantic Supremacy

> Semantic status colors override module accents. A critical alert is always red, regardless of module.

```tsx
// ✅ Correct — Critical uses status-critical, not water-critical
<Badge variant="critical">CRITICAL</Badge>

// ❌ Wrong — Don't namespace statuses
<Badge variant="water-critical">CRITICAL</Badge>
```

### Law 3: Accent Restraint

> Module accents are small: icons, tabs, map layers, hover lines. Never cards, badges, or alerts.

```tsx
// ✅ Correct — Module accent is small (icon only)
<Icon className="text-accent-water" />
<Badge variant="monitoring">Active Monitoring</Badge>

// ❌ Wrong — Module accent dominates
<Card className="bg-accent-water/10">
```

---

## Core Files

| File | Purpose |
|------|---------|
| `UNIVERSAL_DESIGN_SYSTEM.md` | Core guidelines, principles, rules |
| `USAGE_EXAMPLES.md` | Copy-paste code examples |
| `MIGRATION_GUIDE.md` | Step-by-step migration plan |
| `src/app/globals.css` | CSS variables (design tokens) |
| `tailwind.config.js` | Tailwind color mappings |
| `src/components/ui/Badge.tsx` | Semantic badge component |
| `src/components/ui/Button.tsx` | Semantic button component |

---

## Design Tokens

### Surfaces (5 levels)

```css
--surface-0: #020617;  /* Main canvas */
--surface-1: #0f172a;  /* Section panels */
--surface-2: #1e293b;  /* Cards */
--surface-3: #334155;  /* Elevated */
--surface-4: #475569;  /* Active/selected */
```

### Text (4 roles)

```css
--text-primary: #f8fafc;    /* Headings, metrics */
--text-secondary: #cbd5e1;  /* Body, labels */
--text-muted: #64748b;      /* Captions, support */
--text-inverse: #020617;    /* On colored backgrounds */
```

### Status (6 states)

```css
--status-info: #38bdf8;         /* Informational */
--status-stable: #34d399;       /* Normal, healthy */
--status-monitoring: #fbbf24;   /* Active watch */
--status-warning: #f97316;      /* Moderate risk */
--status-critical: #ef4444;     /* Emergency */
--status-resolved: #a78bfa;     /* Recovered */
```

### Module Accents (8 modules)

```css
--accent-biodiversity: #10b981;   /* Emerald */
--accent-water: #0ea5e9;          /* Sky */
--accent-protected: #059669;      /* Forest */
--accent-seasonal: #f59e0b;       /* Amber */
--accent-trails: #14b8a6;         /* Teal */
--accent-risk: #f97316;           /* Orange */
--accent-districts: #64748b;      /* Slate */
--accent-atlas: #6366f1;          /* Indigo */
```

---

## Component Usage

### Badge

```tsx
import { Badge } from '@/components/ui/Badge';

<Badge variant="stable">Normal</Badge>
<Badge variant="monitoring">Active Monitoring</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="critical">CRITICAL</Badge>
<Badge variant="info">Informational</Badge>
<Badge variant="outline">Metadata</Badge>
```

### Button

```tsx
import { Button } from '@/components/ui/Button';

<Button variant="primary">Main Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="outline">Tertiary Action</Button>
<Button variant="ghost">Icon Button</Button>
<Button variant="danger">Destructive Action</Button>
```

---

## Status Mapping

| Legacy Labels | New Variant | When to Use |
|---------------|-------------|-------------|
| Normal, Fair, Good | `stable` | Healthy operations |
| Active Monitoring, Watch | `monitoring` | Caution, not panic |
| Medium, Moderate | `warning` | Degradation detected |
| High, Severe | `warning` or `critical` | Context-dependent |
| Critical, Emergency | `critical` | Immediate action |
| Resolved, Recovered | `resolved` | Post-event |
| Info, Guidance | `info` | Non-urgent |

---

## Testing Checklist

Before deploying:

- [ ] Badges use semantic variants (not module-specific)
- [ ] Cards use neutral surfaces (not module-colored)
- [ ] Module accents only on icons/tabs/map layers
- [ ] Text contrast passes WCAG AA (4.5:1)
- [ ] Muted text not on Surface 3+
- [ ] Buttons use correct variants
- [ ] Lighthouse accessibility ≥90

---

## Philosophy

**Kashmir EcoWatch should look like a scientific observatory platform first, and a thematic environmental website second.**

This means:
- **Operational clarity** over decorative richness
- **Semantic consistency** over module identity
- **Accessibility** over aesthetic experimentation
- **Trust** through visual discipline

---

## Version

- **Current:** 1.0
- **Last Updated:** 2026-04-03
- **Status:** Ready for implementation

---

## Need Help?

1. Check `USAGE_EXAMPLES.md` for copy-paste patterns
2. Check `MIGRATION_GUIDE.md` for step-by-step updates
3. Check `UNIVERSAL_DESIGN_SYSTEM.md` for core principles

---

**Built for the Kashmir Environmental Intelligence Platform**  
**Scientific. Spatial. Real-time.**
