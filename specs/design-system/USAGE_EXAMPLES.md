# Kashmir EcoWatch — Design System Usage Examples

## Quick Start

This document provides copy-paste examples for implementing the semantic design system across all modules.

---

## 1. Badge Examples

### All Status Variants

```tsx
import { Badge } from '@/components/ui/Badge';

// Stable — Normal operations, verified data
<Badge variant="stable">Normal</Badge>
<Badge variant="stable">Verified</Badge>
<Badge variant="stable">Good</Badge>
<Badge variant="stable">Fair</Badge>

// Monitoring — Active watch, caution
<Badge variant="monitoring">Active Monitoring</Badge>
<Badge variant="monitoring">Under Review</Badge>
<Badge variant="monitoring">Watch List</Badge>

// Warning — Moderate risk, degradation
<Badge variant="warning">Warning</Badge>
<Badge variant="warning">Moderate Risk</Badge>
<Badge variant="warning">Declining</Badge>

// Critical — Emergency, escalation
<Badge variant="critical">CRITICAL</Badge>
<Badge variant="critical">Emergency</Badge>
<Badge variant="critical">High Risk</Badge>
<Badge variant="critical" className="animate-pulse-critical">Live Alert</Badge>

// Info — Informational, guidance
<Badge variant="info">Informational</Badge>
<Badge variant="info">New</Badge>
<Badge variant="info">Updated</Badge>

// Outline — Secondary metadata
<Badge variant="outline">Data Source</Badge>
<Badge variant="outline">2024</Badge>
<Badge variant="outline">Verified</Badge>
```

### All Sizes

```tsx
// XS — Dense tables, inline labels
<Badge variant="stable" size="xs">Normal</Badge>

// SM — Chip filters, tags
<Badge variant="monitoring" size="sm">Active</Badge>

// MD — Default (most common)
<Badge variant="warning" size="md">Warning</Badge>

// LG — Hero stats, featured
<Badge variant="critical" size="lg">CRITICAL</Badge>
```

### Status Mapping (Legacy → New)

```tsx
// OLD → NEW mapping
// "Normal", "Fair", "Good" → variant="stable"
<Badge variant="stable">Normal</Badge>

// "Active Monitoring", "Watch" → variant="monitoring"
<Badge variant="monitoring">Active Monitoring</Badge>

// "Medium", "Moderate" → variant="warning"
<Badge variant="warning">Moderate</Badge>

// "High", "Severe" → variant="warning" or "critical" (context-dependent)
<Badge variant="warning">High</Badge>
<Badge variant="critical">Severe</Badge>

// "Critical", "Emergency" → variant="critical"
<Badge variant="critical">Critical</Badge>

// "Resolved", "Recovered" → variant="resolved"
<Badge variant="resolved">Resolved</Badge>
```

---

## 2. Button Examples

### All Variants

```tsx
import { Button } from '@/components/ui/Button';
import { ArrowRight, Download, Trash2 } from 'lucide-react';

// Primary — Main CTAs, confirm actions (uses Stable green)
<Button variant="primary">View Details</Button>
<Button variant="primary">Take Action</Button>
<Button variant="primary">Submit Report</Button>

// Secondary — Secondary actions
<Button variant="secondary">Learn More</Button>
<Button variant="secondary">Download Data</Button>

// Outline — Tertiary actions, filters
<Button variant="outline">Filter</Button>
<Button variant="outline">Export</Button>
<Button variant="outline">View All</Button>

// Ghost — Icon buttons, navigation
<Button variant="ghost" icon={<Download className="w-4 h-4" />} />
<Button variant="ghost">Close</Button>

// Danger — Destructive actions ONLY
<Button variant="danger" icon={<Trash2 className="w-4 h-4" />}>
  Delete
</Button>
<Button variant="danger">Revoke Access</Button>
```

### With Icons

```tsx
// Icon + Text
<Button variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
  Continue
</Button>

// Icon only
<Button variant="ghost" icon={<Download className="w-4 h-4" />} />

// Right icon
<Button variant="secondary">
  Download Report
  <ArrowRight className="w-4 h-4 ml-2" />
</Button>
```

### All Sizes

```tsx
// SM — Compact UI
<Button variant="primary" size="sm">Save</Button>

// MD — Default
<Button variant="primary" size="md">Submit</Button>

// LG — Hero CTAs
<Button variant="primary" size="lg">Explore Atlas</Button>
```

---

## 3. Card Examples

### Default Card (Neutral)

```tsx
<Card className="bg-surface-2 border-surface-4">
  <CardHeader>
    <CardTitle>Dal Lake Water Quality</CardTitle>
    <Badge variant="stable">Normal</Badge>
  </CardHeader>
  <CardContent>
    <Metric label="pH Level" value="7.2" />
    <Metric label="Dissolved Oxygen" value="8.5 mg/L" />
  </CardContent>
  <CardFooter>
    <Button variant="outline">View History</Button>
    <Button variant="primary">Full Report</Button>
  </CardFooter>
</Card>
```

### Status Cards (Semantic)

```tsx
// Monitoring Card
<Card className="bg-status-monitoring-surface border-status-monitoring-border">
  <CardHeader>
    <CardTitle>Wetland Stress Watch</CardTitle>
    <Badge variant="monitoring">Active Monitoring</Badge>
  </CardHeader>
  <CardContent>
    <p className="text-text-secondary">
      Elevated nutrient levels detected in Hokersar Wetland
    </p>
  </CardContent>
</Card>

// Warning Card
<Card className="bg-status-warning-surface border-status-warning-border">
  <CardHeader>
    <CardTitle>Algal Bloom Activity</CardTitle>
    <Badge variant="warning">Warning</Badge>
  </CardHeader>
  <CardContent>
    <p className="text-text-secondary">
      Moderate algal bloom detected. Water quality declining.
    </p>
  </CardContent>
</Card>

// Critical Card
<Card className="bg-status-critical-surface border-status-critical-border">
  <CardHeader>
    <CardTitle>Spring Vulnerability Alert</CardTitle>
    <Badge variant="critical">CRITICAL</Badge>
  </CardHeader>
  <CardContent>
    <p className="text-text-secondary">
      Kokernag spring shows critical flow reduction. Immediate assessment required.
    </p>
    <Button variant="danger" className="mt-4">
      Initiate Response
    </Button>
  </CardContent>
</Card>
```

### Module Accent on Cards (Correct Usage)

```tsx
// ✅ CORRECT: Neutral card with module accent icon
<Card className="bg-surface-2 border-surface-4">
  <CardHeader>
    <div className="flex items-center gap-2">
      <WaterIcon className="w-5 h-5 text-accent-water" />
      <CardTitle>Jhelum River Levels</CardTitle>
    </div>
    <Badge variant="stable">Normal</Badge>
  </CardHeader>
</Card>

// ❌ WRONG: Module-colored card background
<Card className="bg-accent-water/10">  {/* Don't do this */}
  <Badge variant="water-monitoring">  {/* Don't namespace statuses */}
</Card>
```

---

## 4. Typography Examples

### Text Hierarchy

```tsx
// Primary — Headings, key metrics
<h1 className="text-primary">Biodiversity Dashboard</h1>
<Metric value="2,847" className="text-primary" />

// Secondary — Body text, labels
<p className="text-secondary">
  Species observations across Kashmir's protected areas
</p>
<label className="text-secondary">District</label>

// Muted — Support text, captions
<span className="text-muted">Last updated 2 hours ago</span>
<p className="text-muted">Data source: J&K Wildlife Department</p>

// Inverse — Text on colored backgrounds
<Card className="bg-status-critical-surface">
  <p className="text-inverse">Critical alert text</p>
</Card>
```

### Heading Scale

```tsx
<h1 className="text-4xl font-bold text-primary">Page Title</h1>        {/* 36px */}
<h2 className="text-3xl font-bold text-primary">Section</h2>           {/* 30px */}
<h3 className="text-2xl font-bold text-primary">Subsection</h3>        {/* 24px */}
<h4 className="text-xl font-bold text-primary">Card Title</h4>         {/* 20px */}
<h5 className="text-lg font-bold text-primary">Group</h5>              {/* 18px */}
<h6 className="text-base font-bold text-primary">Label</h6>            {/* 16px */}
```

---

## 5. Table Examples

### Default Table

```tsx
<table className="w-full">
  <thead>
    <tr className="border-b border-surface-4">
      <th className="text-left text-secondary py-3 px-4">Species</th>
      <th className="text-left text-secondary py-3 px-4">District</th>
      <th className="text-left text-secondary py-3 px-4">Status</th>
      <th className="text-left text-secondary py-3 px-4">Population</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-surface-4 hover:bg-surface-1">
      <td className="text-primary py-3 px-4">Hangul Deer</td>
      <td className="text-primary py-3 px-4">Kupwara</td>
      <td className="py-3 px-4">
        <Badge variant="critical">Critical</Badge>
      </td>
      <td className="text-primary py-3 px-4">~160</td>
    </tr>
    <tr className="border-b border-surface-4 hover:bg-surface-1">
      <td className="text-primary py-3 px-4">Snow Leopard</td>
      <td className="text-primary py-3 px-4">Kargil</td>
      <td className="py-3 px-4">
        <Badge variant="monitoring">Active Monitoring</Badge>
      </td>
      <td className="text-primary py-3 px-4">~200</td>
    </tr>
  </tbody>
</table>
```

### Status Row Styling

```tsx
// Critical row with left border accent
<tr className="border-l-4 border-l-status-critical bg-status-critical-surface">
  <td className="text-primary py-3 px-4">Spring #42</td>
  <td className="text-primary py-3 px-4">Kokernag</td>
  <td className="py-3 px-4">
    <Badge variant="critical">CRITICAL</Badge>
  </td>
</tr>

// Monitoring row
<tr className="border-l-4 border-l-status-monitoring bg-status-monitoring-surface">
  <td className="text-primary py-3 px-4">Wetland</td>
  <td className="text-primary py-3 px-4">Hokersar</td>
  <td className="py-3 px-4">
    <Badge variant="monitoring">Monitoring</Badge>
  </td>
</tr>
```

---

## 6. Map Overlay Examples

### Map Layer Toggle

```tsx
// Inactive layer
<button className="p-2 rounded bg-surface-3 text-text-secondary hover:bg-surface-4">
  <LayersIcon className="w-5 h-5" />
  <span>Biodiversity</span>
</button>

// Active layer (module accent)
<button className="p-2 rounded bg-surface-4 text-accent-biodiversity border-l-2 border-accent-biodiversity">
  <LayersIcon className="w-5 h-5" />
  <span>Biodiversity</span>
</button>

// Alert layer active (semantic status)
<button className="p-2 rounded bg-status-critical-surface text-status-critical border-l-2 border-status-critical">
  <AlertTriangleIcon className="w-5 h-5" />
  <span>Live Alerts</span>
</button>
```

### Map Markers

```tsx
// Entity marker (module accent)
<div className="w-3 h-3 rounded-full bg-accent-biodiversity" />

// Alert marker (critical status, pulsing)
<div className="w-4 h-4 rounded-full bg-status-critical animate-pulse-critical" />

// Monitoring marker
<div className="w-3.5 h-3.5 rounded-full bg-status-monitoring" />

// Verified marker
<div className="w-3 h-3 rounded-full bg-status-stable" />
```

### Map Popup

```tsx
<MapPopup lat={34.0836} lng={74.7973}>
  <Card className="bg-surface-2 border-surface-4 max-w-xs">
    <CardHeader>
      <CardTitle className="text-base">Dal Lake</CardTitle>
      <Badge variant="monitoring">Active Monitoring</Badge>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-secondary">
        Water quality parameters within normal range. Continued monitoring for algal activity.
      </p>
    </CardContent>
    <CardFooter>
      <Button variant="outline" size="sm">View Details</Button>
    </CardFooter>
  </Card>
</MapPopup>
```

---

## 7. Dashboard Examples

### Metric Cards

```tsx
// Neutral metric card (most common)
<Card className="bg-surface-2 border-surface-4">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm text-secondary">Total Protected Areas</p>
      <p className="text-3xl text-primary font-bold">47</p>
    </div>
    <div className="p-3 rounded-full bg-accent-protected/10">
      <ShieldIcon className="w-6 h-6 text-accent-protected" />
    </div>
  </div>
</Card>

// Status metric card
<Card className="bg-status-critical-surface border-status-critical-border">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm text-status-critical">Active Alerts</p>
      <p className="text-3xl text-status-critical font-bold">12</p>
    </div>
    <div className="p-3 rounded-full bg-status-critical/20">
      <AlertTriangleIcon className="w-6 h-6 text-status-critical" />
    </div>
  </div>
</Card>
```

### Dashboard Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Metric cards span 1 column each */}
  <MetricCard title="Protected Areas" value="47" accent="protected" />
  <MetricCard title="Species Tracked" value="847" accent="biodiversity" />
  <MetricCard title="Water Bodies" value="234" accent="water" />
  <MetricCard title="Active Alerts" value="12" status="critical" />
  
  {/* Main chart spans 2 columns */}
  <Card className="lg:col-span-2 bg-surface-2 border-surface-4">
    <CardTitle>Trends</CardTitle>
    <Chart data={data} />
  </Card>
  
  {/* Side panel spans 1 column */}
  <Card className="lg:col-span-1 bg-surface-2 border-surface-4">
    <CardTitle>Recent Alerts</CardTitle>
    <AlertList />
  </Card>
  
  {/* Full-width table */}
  <Card className="lg:col-span-4 bg-surface-2 border-surface-4">
    <CardTitle>District Summary</CardTitle>
    <DistrictTable />
  </Card>
</div>
```

---

## 8. Module-Specific Examples

### Water Systems Module

```tsx
// Water card with correct accent usage
<Card className="bg-surface-2 border-surface-4">
  <CardHeader>
    <div className="flex items-center gap-2">
      <DropIcon className="w-5 h-5 text-accent-water" />
      <CardTitle>Lake Quality Index</CardTitle>
    </div>
    <Badge variant="stable">Good</Badge>
  </CardHeader>
  <CardContent>
    <Chart 
      data={qualityData} 
      lineColor="var(--accent-water)"  // Module accent for chart
    />
  </CardContent>
</Card>

// Flood warning (semantic status overrides module accent)
<Card className="bg-status-warning-surface border-status-warning-border">
  <CardHeader>
    <div className="flex items-center gap-2">
      <WavesIcon className="w-5 h-5 text-status-warning" />  {/* Status, not water */}
      <CardTitle>Flood Risk Alert</CardTitle>
    </div>
    <Badge variant="warning">Warning</Badge>
  </CardHeader>
</Card>
```

### Biodiversity Module

```tsx
// Species card
<Card className="bg-surface-2 border-surface-4">
  <CardHeader>
    <div className="flex items-center gap-2">
      <BirdIcon className="w-5 h-5 text-accent-biodiversity" />
      <CardTitle>Black-Necked Crane</CardTitle>
    </div>
    <Badge variant="monitoring">Active Monitoring</Badge>
  </CardHeader>
  <CardContent>
    <p className="text-secondary text-sm">
      Migration season active. Sightings reported in Changthang.
    </p>
  </CardContent>
</Card>

// Critical species alert
<Card className="bg-status-critical-surface border-status-critical-border">
  <CardHeader>
    <div className="flex items-center gap-2">
      <PawIcon className="w-5 h-5 text-status-critical" />
      <CardTitle>Hangul Population Critical</CardTitle>
    </div>
    <Badge variant="critical">CRITICAL</Badge>
  </CardHeader>
</Card>
```

### Risk Monitoring Module

```tsx
// Risk dashboard uses semantic colors directly
<Card className="bg-surface-2 border-surface-4">
  <CardHeader>
    <div className="flex items-center gap-2">
      <AlertTriangleIcon className="w-5 h-5 text-accent-risk" />
      <CardTitle>Multi-Hazard Overview</CardTitle>
    </div>
  </CardHeader>
  <CardContent>
    <div className="space-y-3">
      <RiskRow level="critical" label="Earthquake Risk" />
      <RiskRow level="warning" label="Flood Risk" />
      <RiskRow level="monitoring" label="Landslide Watch" />
      <RiskRow level="stable" label="Fire Risk" />
    </div>
  </CardContent>
</Card>

function RiskRow({ level, label }) {
  return (
    <div className="flex items-center justify-between p-3 rounded bg-surface-1">
      <span className="text-secondary">{label}</span>
      <Badge variant={level}>{level.toUpperCase()}</Badge>
    </div>
  );
}
```

---

## 9. Do's and Don'ts

### ✅ DO: Semantic State Drives Color

```tsx
// Correct: Critical alert uses status-critical, not module color
<Card className="bg-status-critical-surface border-status-critical-border">
  <Badge variant="critical">CRITICAL</Badge>
  <Title>Spring Vulnerability</Title>
</Card>

// Correct: Module accent is small (icon only)
<Card className="bg-surface-2 border-surface-4">
  <Icon className="text-accent-water" />
  <Badge variant="monitoring">Active Monitoring</Badge>
  <Title>Algal Bloom Watch</Title>
</Card>
```

### ❌ DON'T: Module Identity Drives Color

```tsx
// Wrong: Module-specific variant
<Badge variant="water-critical">CRITICAL</Badge>  // Don't namespace statuses

// Wrong: Module-colored card
<Card className="bg-biodiversity-100">  // Surfaces must be neutral

// Wrong: White text on status surface without proper contrast
<Card className="bg-status-critical-surface">
  <p className="text-white">  // Use text-inverse instead
</Card>
```

---

## 10. Quick Reference

### Class Name Mapping

| Purpose | Use This | Not This |
|---------|----------|----------|
| Page background | `bg-surface-0` | `bg-slate-900` |
| Card background | `bg-surface-2` | `bg-white` |
| Alert card | `bg-status-critical-surface` | `bg-red-500` |
| Badge | `variant="critical"` | `variant="danger"` |
| Primary button | `variant="primary"` | `variant="brand"` |
| Module icon | `text-accent-water` | `text-blue-500` |
| Heading | `text-primary` | `text-white` |
| Body text | `text-secondary` | `text-slate-300` |
| Caption | `text-muted` | `text-slate-500` |

### Status Mapping

| Legacy Label | New Variant | Notes |
|--------------|-------------|-------|
| Normal, Fair, Good | `stable` | All healthy states |
| Active Monitoring, Watch | `monitoring` | Caution, not panic |
| Medium, Moderate | `warning` | Degradation detected |
| High, Severe | `warning` or `critical` | Context-dependent |
| Critical, Emergency | `critical` | Immediate action |
| Resolved, Recovered | `resolved` | Post-event |
| Info, Guidance | `info` | Non-urgent |

---

## 11. Testing Checklist

Before deploying any module:

- [ ] All badges use semantic variants (stable, monitoring, warning, critical, info)
- [ ] No module-specific badge variants (e.g., `water-warning`, `bio-critical`)
- [ ] Cards use neutral surfaces (`bg-surface-2`) or semantic surfaces (`bg-status-*`)
- [ ] No module-colored card backgrounds
- [ ] Module accents only on icons, tabs, map layers
- [ ] Text contrast passes WCAG AA (4.5:1 for primary/secondary text)
- [ ] Muted text not on Surface 3+ backgrounds
- [ ] Buttons use correct variants (primary=stable, danger=critical)
- [ ] All states tested: hover, focus, disabled
- [ ] Dark mode tested (if applicable)
- [ ] Lighthouse accessibility score ≥90

---

**Last Updated:** 2026-04-03  
**Version:** 1.0  
**See Also:** `UNIVERSAL_DESIGN_SYSTEM.md`
