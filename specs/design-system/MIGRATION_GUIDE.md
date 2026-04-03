# Migration Guide — Kashmir EcoWatch Design System

## Overview

This guide walks you through migrating existing components and pages from the legacy module-based coloring to the new semantic design system.

---

## Phase 1: Audit (1-2 days)

### 1.1 Find All Color Usage

Run these searches in your codebase:

```bash
# Find all bg-* classes on cards/panels
grep -r "bg-\w*-\d00" src/components src/app

# Find all badge variants
grep -r "variant=\"\w*\"" src/components/ui/Badge.tsx

# Find all button variants
grep -r "variant=\"\w*\"" src/components/ui/Button.tsx

# Find text color usage
grep -r "text-white\|text-black\|text-slate" src/components src/app
```

### 1.2 Document Current Patterns

Create a spreadsheet tracking:
- Component name
- Current color usage
- Module association
- Issues (contrast failures, inconsistent badges)

### 1.3 Identify High-Priority Pages

Priority order for migration:
1. **Risk Monitoring** — Most critical for semantic consistency
2. **Homepage Live Panels** — Highest visibility
3. **Water Systems** — Complex module with multiple states
4. **Biodiversity** — Species status consistency
5. **Protected Areas** — Park/reserve cards
6. **Districts** — Scorecard consistency
7. **Atlas** — Map overlay consistency
8. **Other modules** — Seasonal, Trails, etc.

---

## Phase 2: Foundation (1 day)

### 2.1 Add CSS Variables to `globals.css`

The new `globals.css` is already created. Verify it includes:
- [ ] Surface tokens (`--surface-0` through `--surface-4`)
- [ ] Text tokens (`--text-primary`, etc.)
- [ ] Status tokens (6 states × 4 variants each)
- [ ] Module accent tokens (8 modules)

### 2.2 Update Tailwind Config

The new `tailwind.config.js` is already updated. Verify it includes:
- [ ] `surface.*` colors referencing CSS variables
- [ ] `text.*` colors referencing CSS variables
- [ ] `status.*` colors with surface, border, hover variants
- [ ] `accent.*` colors for modules

### 2.3 Update Core Components

Already completed:
- [x] `Badge.tsx` — Semantic variants
- [x] `Button.tsx` — Semantic variants

Still to update:
- [ ] `Card.tsx` — Add variant prop (optional enhancement)
- [ ] Any custom alert components
- [ ] Any custom table components

---

## Phase 3: Component Migration (2-3 days)

### 3.1 Badge Migration

**Find all badge usage:**

```bash
grep -r "<Badge" src/components src/app --include="*.tsx"
```

**Replace variants:**

| Old Variant | New Variant | Action |
|-------------|-------------|--------|
| `success` | `stable` | Rename |
| `warning` | `warning` | Keep (semantics match) |
| `danger` | `critical` | Rename for clarity |
| `info` | `info` | Keep |
| `default` | `default` | Keep |
| `secondary` | `outline` | Consider context |
| Any custom (e.g., `water-alert`) | Semantic equivalent | Replace |

**Example migration:**

```tsx
// BEFORE
<Badge variant="success">Normal</Badge>
<Badge variant="danger">Critical</Badge>
<Badge variant="water-warning">Flood Watch</Badge>  // Custom variant

// AFTER
<Badge variant="stable">Normal</Badge>
<Badge variant="critical">Critical</Badge>
<Badge variant="warning">Flood Watch</Badge>  // Semantic variant
```

### 3.2 Button Migration

**Find all button usage:**

```bash
grep -r "<Button" src/components src/app --include="*.tsx"
```

**Replace variants:**

| Old Variant | New Variant | Notes |
|-------------|-------------|-------|
| `primary` | `primary` | Keep (now uses stable green) |
| `secondary` | `secondary` | Keep |
| `outline` | `outline` | Keep |
| `ghost` | `ghost` | Keep |
| `danger` | `danger` | Keep (now uses critical red) |
| Any custom | Closest semantic match | Replace |

**Example migration:**

```tsx
// BEFORE
<Button variant="primary">Submit</Button>  // Was gradient
<Button variant="danger">Delete</Button>   // Was red

// AFTER (no code change needed, semantics updated)
<Button variant="primary">Submit</Button>  // Now stable green
<Button variant="danger">Delete</Button>   // Now critical red
```

### 3.3 Card Migration

**Find all card usage:**

```bash
grep -r "bg-\w*-\d00\|bg-\w*/" src/components src/app --include="*.tsx"
```

**Replace module backgrounds with neutral surfaces:**

```tsx
// BEFORE
<Card className="bg-water-100">
<Card className="bg-biodiversity-50">
<Card className="bg-red-500">  // Alert card

// AFTER
<Card className="bg-surface-2">  // Neutral default
<Card className="bg-surface-2">  // Neutral default
<Card className="bg-status-critical-surface border-status-critical-border">  // Semantic alert
```

---

## Phase 4: Page Migration (3-5 days)

### 4.1 Homepage Migration

**Changes needed:**

```tsx
// Live panels — use semantic surfaces
<section className="bg-surface-1">  // Was module-colored
  <Card className="bg-surface-2 border-surface-4">
    <Badge variant="critical">Live Alert</Badge>
  </Card>
</section>

// District scorecards — neutral backgrounds
<section className="bg-surface-0">
  <Card className="bg-surface-2">
    <Badge variant="stable">Good</Badge>
  </Card>
</section>
```

### 4.2 Risk Monitoring Migration

**Critical priority — this module defines semantic consistency:**

```tsx
// Alert cards — semantic surfaces
<Card className="bg-status-critical-surface border-status-critical-border">
  <Badge variant="critical">CRITICAL</Badge>
</Card>

<Card className="bg-status-warning-surface border-status-warning-border">
  <Badge variant="warning">Warning</Badge>
</Card>

// Dashboard metrics — neutral with status accents
<Card className="bg-surface-2 border-surface-4">
  <div className="text-status-critical">12 Active Alerts</div>
</Card>
```

### 4.3 Water Systems Migration

```tsx
// Normal water quality — stable state
<Card className="bg-surface-2 border-surface-4">
  <DropIcon className="text-accent-water" />  // Module accent
  <Badge variant="stable">Good</Badge>
</Card>

// Algal bloom — monitoring state
<Card className="bg-status-monitoring-surface border-status-monitoring-border">
  <WavesIcon className="text-status-monitoring" />  // Status color
  <Badge variant="monitoring">Active Monitoring</Badge>
</Card>

// Flood risk — warning/critical state
<Card className="bg-status-warning-surface border-status-warning-border">
  <AlertTriangleIcon className="text-status-warning" />
  <Badge variant="warning">Flood Watch</Badge>
</Card>
```

### 4.4 Biodiversity Migration

```tsx
// Species cards — neutral with module accent
<Card className="bg-surface-2 border-surface-4">
  <BirdIcon className="text-accent-biodiversity" />
  <Badge variant="stable">Verified</Badge>
</Card>

// Threatened species — semantic status
<Card className="bg-status-critical-surface border-status-critical-border">
  <PawIcon className="text-status-critical" />
  <Badge variant="critical">Critically Endangered</Badge>
</Card>
```

---

## Phase 5: Validation (1-2 days)

### 5.1 Automated Testing

**Run accessibility audits:**

```bash
# Lighthouse CI
npm run lighthouse

# axe-core (if installed)
npm run test:accessibility
```

**Target scores:**
- Lighthouse Accessibility: ≥90
- WCAG AA contrast: Pass all checks

### 5.2 Manual Testing Checklist

For each migrated page:

- [ ] **Badge consistency**
  - [ ] All badges use semantic variants (stable, monitoring, warning, critical, info)
  - [ ] No module-specific variants
  - [ ] Text color matches badge variant
  - [ ] Background is 10% opacity, border is 30%

- [ ] **Card consistency**
  - [ ] Default cards use `bg-surface-2`
  - [ ] Alert cards use `bg-status-*-surface`
  - [ ] No module-colored backgrounds
  - [ ] Borders use `border-surface-4` or `border-status-*-border`

- [ ] **Button consistency**
  - [ ] Primary uses stable green
  - [ ] Danger uses critical red
  - [ ] Outline and ghost are neutral
  - [ ] Hover states work correctly

- [ ] **Text contrast**
  - [ ] Primary text on surfaces 0–2: Passes 4.5:1
  - [ ] Secondary text on surfaces 0–2: Passes 4.5:1
  - [ ] Muted text not on surfaces 3+
  - [ ] No white text on colored backgrounds (use `text-inverse`)

- [ ] **Module accents**
  - [ ] Only on icons, tabs, map layers
  - [ ] Not on cards, badges, alerts
  - [ ] Consistent across module

### 5.3 Visual Regression Testing

If you have Percy, Chromatic, or similar:

```bash
npm run test:visual
```

Compare before/after screenshots for:
- Homepage live panels
- Risk monitoring dashboards
- Water systems cards
- Biodiversity species lists
- District scorecards

---

## Phase 6: Rollout (Ongoing)

### 6.1 Feature Flag (Optional)

If you want to test gradually:

```tsx
// Add data attribute to HTML tag for testing
<html data-theme="new-design-system">
```

Use CSS to scope new styles:

```css
[data-theme="new-design-system"] {
  /* New design system styles */
}
```

### 6.2 Team Training

Share these documents with your team:
1. `UNIVERSAL_DESIGN_SYSTEM.md` — Core guidelines
2. `USAGE_EXAMPLES.md` — Copy-paste examples
3. This migration guide

Conduct a 1-hour walkthrough covering:
- Why semantic > module-based
- The 3 laws (surface neutrality, semantic supremacy, accent restraint)
- Badge and button changes
- Common mistakes to avoid

### 6.3 Documentation Updates

Update these as you migrate:

- [ ] Component Storybook stories (if using)
- [ ] README.md with design system link
- [ ] Contributing guidelines
- [ ] Onboarding docs for new developers

---

## Common Migration Issues

### Issue 1: "Text disappears on colored cards"

**Problem:** White text on module-colored background

**Solution:**
```tsx
// BEFORE
<Card className="bg-water-500">
  <h3 className="text-white">Water Quality</h3>  // Disappears in some contexts

// AFTER
<Card className="bg-surface-2">
  <h3 className="text-primary">Water Quality</h3>  // Always visible
```

### Issue 2: "Badge looks inconsistent across pages"

**Problem:** Different badge styles for same status

**Solution:**
```tsx
// BEFORE (inconsistent)
<Page1> <Badge variant="success">Normal</Badge> </Page1>
<Page2> <Badge variant="water-normal">Normal</Badge> </Page2>

// AFTER (consistent)
<Page1> <Badge variant="stable">Normal</Badge> </Page1>
<Page2> <Badge variant="stable">Normal</Badge> </Page2>
```

### Issue 3: "Alert doesn't feel urgent"

**Problem:** Module accent dilutes critical status

**Solution:**
```tsx
// BEFORE
<Card className="bg-water-100">
  <Badge variant="water-critical">Critical</Badge>  // Module dilutes meaning

// AFTER
<Card className="bg-status-critical-surface border-status-critical-border">
  <Badge variant="critical">CRITICAL</Badge>  // Semantic status dominates
```

### Issue 4: "Button colors don't match"

**Problem:** Primary button uses brand gradient, danger uses red

**Solution:**
```tsx
// BEFORE
<Button variant="primary">  // Gradient
<Button variant="danger">   // Red

// AFTER (unified semantics)
<Button variant="primary">  // Stable green (same meaning everywhere)
<Button variant="danger">   // Critical red (only for destructive)
```

---

## Rollback Plan

If issues arise:

1. **Revert CSS variables** — Comment out new tokens in `globals.css`
2. **Revert components** — Restore old `Badge.tsx` and `Button.tsx` from Git
3. **Revert Tailwind config** — Restore old color definitions

```bash
git checkout HEAD -- src/app/globals.css
git checkout HEAD -- src/components/ui/Badge.tsx
git checkout HEAD -- src/components/ui/Button.tsx
git checkout HEAD -- tailwind.config.js
```

---

## Success Metrics

After migration, you should see:

### Visual Consistency
- [ ] Same status looks identical across all modules
- [ ] No module "color silos"
- [ ] Alert surfaces immediately recognizable

### Accessibility
- [ ] Lighthouse Accessibility ≥90
- [ ] All text passes WCAG AA contrast
- [ ] No user reports of "invisible text"

### Developer Experience
- [ ] Fewer questions about "which color for this?"
- [ ] Faster component implementation
- [ ] Clearer code reviews ("use semantic variant")

### User Experience
- [ ] Faster recognition of alerts
- [ ] Clearer understanding of status
- [ ] More trust in platform (consistent, professional)

---

## Timeline Summary

| Phase | Duration | Owner | Status |
|-------|----------|-------|--------|
| 1. Audit | 1-2 days | Dev Lead | Pending |
| 2. Foundation | 1 day | Dev Lead | Complete |
| 3. Components | 2-3 days | Frontend Team | In Progress |
| 4. Pages | 3-5 days | Frontend Team | Pending |
| 5. Validation | 1-2 days | QA Team | Pending |
| 6. Rollout | Ongoing | All | Pending |

**Total Estimated Time:** 8-14 days

---

**Last Updated:** 2026-04-03  
**Version:** 1.0  
**Owner:** Design System Working Group
