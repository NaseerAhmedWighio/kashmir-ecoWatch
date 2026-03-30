# Quick Start Guide

## Overview
This is the homepage for the **Kashmir Environmental Intelligence Platform** - an ultra-modern, scientifically structured environmental monitoring and intelligence platform.

## What You're Looking At

The homepage is a **live ecological intelligence surface** that includes:

### 1. Hero Section (Top)
- Dark gradient background with animated patterns
- Platform title and positioning statement
- 3 primary action buttons
- Quick statistics (4 key metrics)
- Scroll indicator

### 2. Live Metric Ribbon
- Scrolling horizontal bar with 10 environmental metrics
- Shows current values and trends
- Left/right navigation arrows
- Real-time pulse animations

### 3. Intelligence Modules Grid
- 8 cards representing core platform domains
- Each card shows:
  - Domain icon with gradient background
  - Title and description
  - Key metrics
  - "Explore Module" action
- Hover effects with elevation and border highlights

### 4. Interactive Map Preview
- Large map visualization (simulated for now)
- Layer toggle panel (6 layers)
- Zoom controls (+/-)
- Search bar
- Map info panel
- "Launch Interactive Atlas" CTA
- Quick stats below map

### 5. Smart Insight Panels
- 4 expandable panels in 2x2 grid:
  - Wetland Stress Watch
  - Bloom Activity
  - Wildlife Sightings
  - Air Quality Signals
  - Spring Vulnerability
- Click to expand/collapse
- Severity badges (critical, warning, normal, info)
- Individual items with location and timestamp

### 6. Dashboard Previews
- 6 chart cards showing:
  - Air Quality Trend (area chart)
  - Water Quality pH (line chart)
  - Bloom Activity (bar chart)
  - Sighting Activity (area chart)
  - District Scorecards (horizontal bar)
  - Active Alerts (summary list)
- All charts are interactive (hover for details)
- "Details →" links on each

### 7. Featured Entities
- 6 visual cards in 2x3 grid:
  - Dachigam National Park
  - Dal Lake
  - Hangul (Kashmir Stag)
  - Wild Tulip Meadows
  - Tarsar Marsar Trek
  - Srinagar District
- Image placeholders with gradient overlays
- Type badges (Protected Area, Water Body, Species, etc.)
- Metrics and "View Details" button
- Favorite and share icons on hover

### 8. Alert Status Module
- Left side: Alert feed with 5 alerts
  - Color-coded by severity (red/amber/blue)
  - Location and time ago
- Right side: 
  - Alert summary cards
  - Quick report categories
  - Verification status

### 9. Footer
- 6 columns:
  - Brand + contact info + social
  - Platform links
  - Monitoring links
  - Resources
  - Contribute
- Bottom bar with legal links
- Data attribution

## How to Interact

### Navigation
- **Desktop**: Hover over navigation items, click to navigate
- **Mobile**: Tap hamburger menu to open/close

### Scrolling
- Scroll down to see all sections
- Smooth scroll animations trigger on view

### Cards
- Hover over any card to see elevation effect
- Click cards to navigate (links are placeholders)

### Map
- Toggle layers on/off by clicking
- Use + and - buttons to zoom
- Click "Launch Interactive Atlas" (placeholder)

### Insight Panels
- Click panel headers to expand/collapse
- View details in expanded state

### Charts
- Hover over chart points/bars to see tooltips
- Click "Details →" for full dashboard (placeholder)

### Alerts
- Click alert cards to view details (placeholder)
- Use "Filter" and "Subscribe" buttons (placeholders)

## Customization

### Colors
Edit `tailwind.config.js` to change:
- Forest green shades
- Glacier blue shades
- Earth tones
- Alert colors

### Data
Edit `src/lib/data.ts` to update:
- Metric values
- Card content
- Chart data
- Alert items

### Content
All text content is in the component files in `src/components/sections/`

## Next Steps

To make this fully functional:

1. **Connect Backend APIs**
   - Replace mock data in `src/lib/data.ts` with API calls
   - Use React Query or SWR for data fetching

2. **Add Real Maps**
   - Integrate Mapbox GL JS or Leaflet
   - Add GeoJSON layers for ecological data

3. **Implement Routing**
   - Create pages for each module
   - Add dynamic routes for entities

4. **Add Authentication**
   - Implement user login/registration
   - Add role-based access control

5. **Build Admin Panel**
   - Create CMS for content management
   - Add GIS layer upload tools

6. **Enable Reporting**
   - Build issue submission forms
   - Add photo upload functionality
   - Create moderation workflow

## Technical Notes

- **Framework**: Next.js 14 with App Router
- **Rendering**: Static generation (SSG)
- **Styling**: Tailwind CSS with custom config
- **Charts**: Recharts library
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **TypeScript**: Full type safety

## Support

For questions or issues, contact the development team.

---

**Built with ❤️ for Kashmir's environment**
