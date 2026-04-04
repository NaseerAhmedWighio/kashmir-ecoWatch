/**
 * Risk Intelligence Updates - Structured Data Registry
 *
 * Comprehensive risk update assessments, situational awareness briefings,
 * and evolving hazard outlooks for the Kashmir Environmental Intelligence Platform.
 *
 * This module provides the data layer for the Risk Updates page, distinct from
 * Alerts & Advisories (urgent public warnings) and Monitoring Overview (real-time sensor data).
 *
 * Risk Updates focus on:
 * - Evolving risk interpretation and situational awareness
 * - Hazard outlook shifts and assessment changes
 * - Preparedness guidance and monitoring escalation
 * - Cross-system intelligence synthesis
 */

// ============================================================================
// Type Definitions
// ============================================================================

export type HazardType =
  | 'flood'
  | 'landslide'
  | 'wildfire'
  | 'glacier-glof'
  | 'avalanche'
  | 'earthquake'
  | 'environmental-incident'
  | 'hydrological'
  | 'seismic';

export type RiskTrend =
  | 'increasing'
  | 'stable'
  | 'elevated'
  | 'improving'
  | 'under-watch';

export type RiskSeverity = 'critical' | 'high' | 'moderate' | 'low' | 'monitoring';

export type UpdateStatus = 'active' | 'archived' | 'under-review';

export type LinkedAlertStatus = 'none' | 'advisory-active' | 'warning-active' | 'watch-active' | 'resolved';

export interface AffectedGeography {
  type: 'district' | 'basin' | 'corridor' | 'region';
  name: string;
  severity: RiskSeverity;
}

export interface RiskDriver {
  factor: string;
  description: string;
  influence: 'primary' | 'secondary' | 'contributing';
}

export interface LinkedResource {
  type: 'alert' | 'monitoring' | 'field-report' | 'dashboard' | 'atlas' | 'district-profile';
  title: string;
  href: string;
}

export interface UpdateHistoryEntry {
  date: string;
  action: 'created' | 'updated' | 'severity-changed' | 'archived';
  note: string;
  author: string;
}

export interface PreparednessNote {
  audience: 'public' | 'authorities' | 'emergency-services' | 'municipal';
  action: string;
  priority: 'immediate' | 'short-term' | 'ongoing';
}

export interface RiskUpdate {
  id: string;
  title: string;
  hazardType: HazardType;
  severity: RiskSeverity;
  trend: RiskTrend;
  status: UpdateStatus;
  
  // Geography
  affectedGeographies: AffectedGeography[];
  basin?: string;
  corridor?: string;
  
  // Assessment
  assessmentSummary: string;
  fullAssessmentNote: string;
  riskDrivers: RiskDriver[];
  
  // Links to other systems
  linkedAlertStatus: LinkedAlertStatus;
  linkedResources: LinkedResource[];
  
  // Metadata
  updatedAt: string;
  createdAt: string;
  updateHistory: UpdateHistoryEntry[];
  
  // Preparedness
  preparednessNotes: PreparednessNote[];
  publicGuidance?: string;
  
  // Map context
  mapCenter?: [number, number];
  mapZoom?: number;
  
  // Tags
  tags: string[];
}

// ============================================================================
// Label Maps
// ============================================================================

export const hazardTypeLabels: Record<HazardType, string> = {
  'flood': 'Flood',
  'landslide': 'Landslide',
  'wildfire': 'Wildfire',
  'glacier-glof': 'Glacier / GLOF',
  'avalanche': 'Avalanche',
  'earthquake': 'Earthquake',
  'environmental-incident': 'Environmental Incident',
  'hydrological': 'Hydrological',
  'seismic': 'Seismic',
};

export const hazardTypeColors: Record<HazardType, string> = {
  'flood': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'landslide': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'wildfire': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'glacier-glof': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  'avalanche': 'bg-slate-400/20 text-slate-300 border-slate-400/30',
  'earthquake': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'environmental-incident': 'bg-red-500/20 text-red-400 border-red-500/30',
  'hydrological': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  'seismic': 'bg-violet-500/20 text-violet-400 border-violet-500/30',
};

export const riskTrendLabels: Record<RiskTrend, string> = {
  'increasing': 'Increasing',
  'stable': 'Stable',
  'elevated': 'Elevated',
  'improving': 'Improving',
  'under-watch': 'Under Watch',
};

export const riskTrendIcons: Record<RiskTrend, string> = {
  'increasing': 'trending-up',
  'stable': 'minus',
  'elevated': 'alert-triangle',
  'improving': 'trending-down',
  'under-watch': 'eye',
};

export const riskTrendColors: Record<RiskTrend, string> = {
  'increasing': 'text-red-400',
  'stable': 'text-slate-400',
  'elevated': 'text-amber-400',
  'improving': 'text-emerald-400',
  'under-watch': 'text-blue-400',
};

export const severityLabels: Record<RiskSeverity, string> = {
  'critical': 'Critical',
  'high': 'High',
  'moderate': 'Moderate',
  'low': 'Low',
  'monitoring': 'Monitoring',
};

export const severityColors: Record<RiskSeverity, string> = {
  'critical': 'bg-red-500/20 text-red-400 border-red-500/30',
  'high': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'moderate': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'low': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'monitoring': 'bg-slate-500/20 text-slate-400 border-slate-500/30',
};

export const linkedAlertStatusLabels: Record<LinkedAlertStatus, string> = {
  'none': 'No Active Alert',
  'advisory-active': 'Advisory Active',
  'warning-active': 'Warning Active',
  'watch-active': 'Watch Active',
  'resolved': 'Alert Resolved',
};

// ============================================================================
// Risk Update Registry
// ============================================================================

export const riskUpdates: RiskUpdate[] = [
  {
    id: 'ru-001',
    title: 'Flood Risk Elevated in Jhelum Basin',
    hazardType: 'flood',
    severity: 'moderate',
    trend: 'elevated',
    status: 'active',
    affectedGeographies: [
      { type: 'basin', name: 'Jhelum Basin', severity: 'moderate' },
      { type: 'district', name: 'Srinagar', severity: 'moderate' },
      { type: 'district', name: 'Anantnag', severity: 'low' },
      { type: 'district', name: 'Baramulla', severity: 'moderate' },
    ],
    basin: 'Jhelum Basin',
    assessmentSummary: 'Increased flow levels due to upstream precipitation and accelerated snowmelt. River levels approaching seasonal thresholds.',
    fullAssessmentNote: `The Jhelum Basin is experiencing elevated flood risk due to a combination of factors including above-normal precipitation in upstream catchments and accelerated snowmelt from higher elevations. River flow levels at key monitoring stations have risen above seasonal averages but remain below flood stage thresholds.
    
    Snowpack data from the upper catchment indicates above-average accumulation this winter, which, combined with rising temperatures, is contributing to increased baseflow. Rainfall events in the past 72 hours have added surface runoff to the system.
    
    The risk is expected to remain elevated through the next 5-7 days, with potential escalation if significant precipitation occurs. Low-lying areas along the river corridor should maintain heightened awareness.`,
    riskDrivers: [
      { factor: 'Upstream Precipitation', description: 'Above-normal rainfall in upper catchment areas over the past 72 hours', influence: 'primary' },
      { factor: 'Snowmelt Acceleration', description: 'Rising temperatures accelerating snowpack melt in higher elevations', influence: 'primary' },
      { factor: 'Seasonal Baseflow', description: 'Natural seasonal increase in river flow during spring transition', influence: 'secondary' },
    ],
    linkedAlertStatus: 'advisory-active',
    linkedResources: [
      { type: 'alert', title: 'Flood Advisory - Jhelum Basin', href: '/alerts#flood-advisory-jhelum' },
      { type: 'monitoring', title: 'Flood & Flash Flood Monitoring', href: '/risk-monitoring/flood-flash-flood' },
      { type: 'field-report', title: 'River Level Field Assessment', href: '/field-reports#river-level-assessment' },
      { type: 'atlas', title: 'Jhelum Basin Flood Hazard Map', href: '/atlas#flood-hazard' },
    ],
    updatedAt: '2024-03-28T14:30:00Z',
    createdAt: '2024-03-25T09:00:00Z',
    updateHistory: [
      { date: '2024-03-25T09:00:00Z', action: 'created', note: 'Initial risk assessment issued', author: 'Risk Analysis Team' },
      { date: '2024-03-27T11:00:00Z', action: 'updated', note: 'Risk level elevated from Low to Moderate', author: 'Senior Hydrologist' },
      { date: '2024-03-28T14:30:00Z', action: 'updated', note: 'Assessment updated with latest flow data', author: 'Risk Analysis Team' },
    ],
    preparednessNotes: [
      { audience: 'public', action: 'Monitor river levels and stay informed via official channels', priority: 'ongoing' },
      { audience: 'municipal', action: 'Review flood preparedness plans and ensure drainage systems are clear', priority: 'short-term' },
      { audience: 'authorities', action: 'Pre-position emergency response resources in vulnerable areas', priority: 'short-term' },
    ],
    publicGuidance: 'Residents in low-lying areas along the Jhelum corridor should monitor local conditions and be prepared to respond to official advisories. No immediate evacuation is necessary, but awareness should be maintained.',
    mapCenter: [34.0837, 74.7973],
    mapZoom: 10,
    tags: ['jhelum', 'flood-risk', 'spring-melt', 'river-monitoring'],
  },
  {
    id: 'ru-002',
    title: 'Landslide Risk Remains High on NH44 Corridor',
    hazardType: 'landslide',
    severity: 'high',
    trend: 'stable',
    status: 'active',
    affectedGeographies: [
      { type: 'corridor', name: 'NH44 Highway', severity: 'high' },
      { type: 'district', name: 'Anantnag', severity: 'high' },
      { type: 'district', name: 'Ramban', severity: 'high' },
    ],
    corridor: 'NH44',
    assessmentSummary: 'Slope instability continues following recent rainfall. Multiple active slide zones monitored. Traffic management in place.',
    fullAssessmentNote: `The NH44 corridor continues to experience elevated landslide risk following significant rainfall events in recent weeks. Multiple active landslide zones are being monitored along the highway corridor, particularly in the Z-Morh section and adjacent slopes.
    
    Geological assessments indicate that soil moisture content remains above normal thresholds, reducing slope stability margins. Fresh debris movement has been observed in at least three distinct zones along the corridor.
    
    Traffic management protocols are active, with convoy systems and intermittent closures implemented during high-risk periods. Heavy vehicle movement is being monitored as it can exacerbate slope instability.
    
    The risk level is expected to remain high until sustained dry conditions allow slope stabilization. Continuous monitoring is in place with field teams deployed to critical sections.`,
    riskDrivers: [
      { factor: 'Recent Rainfall', description: 'Significant precipitation events saturating slope materials', influence: 'primary' },
      { factor: 'Geological Vulnerability', description: 'Inherently unstable slopes along the highway corridor', influence: 'primary' },
      { factor: 'Traffic Loading', description: 'Heavy vehicle movement adding dynamic stress to marginal slopes', influence: 'contributing' },
    ],
    linkedAlertStatus: 'warning-active',
    linkedResources: [
      { type: 'alert', title: 'Landslide Warning - Z-Morh', href: '/alerts#landslide-zmorh' },
      { type: 'monitoring', title: 'Landslide & Slope Monitoring', href: '/risk-monitoring/landslide-slope' },
      { type: 'field-report', title: 'NH44 Field Inspection Report', href: '/field-reports#nh44-inspection' },
      { type: 'dashboard', title: 'Slope Stability Dashboard', href: '/risk-monitoring/dashboards' },
    ],
    updatedAt: '2024-03-28T12:00:00Z',
    createdAt: '2024-03-20T08:00:00Z',
    updateHistory: [
      { date: '2024-03-20T08:00:00Z', action: 'created', note: 'Initial assessment following rainfall event', author: 'Geological Survey Team' },
      { date: '2024-03-24T10:00:00Z', action: 'updated', note: 'New slide zone identified at KM 42', author: 'Field Team' },
      { date: '2024-03-28T12:00:00Z', action: 'updated', note: 'Risk level maintained at High, conditions stable', author: 'Senior Geologist' },
    ],
    preparednessNotes: [
      { audience: 'public', action: 'Avoid travel during heavy rain. Follow convoy system instructions.', priority: 'ongoing' },
      { audience: 'emergency-services', action: 'Maintain rapid response capacity for slide zone clearance', priority: 'ongoing' },
      { audience: 'authorities', action: 'Continue traffic management and slope monitoring protocols', priority: 'ongoing' },
    ],
    publicGuidance: 'Travelers on NH44 should expect delays and follow all traffic management instructions. Avoid the corridor during heavy rainfall if possible. Monitor highway status updates before travel.',
    mapCenter: [33.7333, 75.1833],
    mapZoom: 11,
    tags: ['nh44', 'landslide', 'slope-stability', 'highway-corridor', 'z-morh'],
  },
  {
    id: 'ru-003',
    title: 'Forest Fire Risk Increasing Across Multiple Districts',
    hazardType: 'wildfire',
    severity: 'moderate',
    trend: 'increasing',
    status: 'active',
    affectedGeographies: [
      { type: 'district', name: 'Baramulla', severity: 'moderate' },
      { type: 'district', name: 'Anantnag', severity: 'moderate' },
      { type: 'district', name: 'Shopian', severity: 'low' },
      { type: 'district', name: 'Kupwara', severity: 'moderate' },
    ],
    assessmentSummary: 'Dry conditions and rising temperatures elevating fire risk. Active fire in Kerni Forest Range under control.',
    fullAssessmentNote: `Forest fire risk is increasing across multiple districts as dry conditions persist and temperatures continue to rise. The combination of low soil moisture, accumulated dry biomass, and favorable wind conditions is creating elevated fire weather indices.
    
    An active forest fire in the Kerni Forest Range of Baramulla district has been brought under control through coordinated firefighting efforts, but smoke continues to affect visibility in the area. This incident highlights the current risk level.
    
    Fire weather models indicate that risk will continue to increase over the next 7-10 days if dry conditions persist. Historical fire data shows this period typically marks the beginning of the primary fire season in Kashmir's forested zones.
    
    Firefighting resources are being pre-positioned, and community awareness programs are being activated in high-risk forest-adjacent settlements.`,
    riskDrivers: [
      { factor: 'Dry Conditions', description: 'Extended dry period reducing fuel moisture content', influence: 'primary' },
      { factor: 'Rising Temperatures', description: 'Above-normal temperatures increasing fire weather risk', influence: 'primary' },
      { factor: 'Fuel Load', description: 'Accumulated dry biomass from previous season', influence: 'secondary' },
    ],
    linkedAlertStatus: 'advisory-active',
    linkedResources: [
      { type: 'alert', title: 'Forest Fire Advisory', href: '/alerts#forest-fire-advisory' },
      { type: 'monitoring', title: 'Forest Fire Monitoring', href: '/risk-monitoring/forest-fire' },
      { type: 'field-report', title: 'Kerni Fire Incident Report', href: '/field-reports#kerni-fire' },
      { type: 'atlas', title: 'Forest Fire Risk Map', href: '/atlas#fire-risk' },
    ],
    updatedAt: '2024-03-28T10:15:00Z',
    createdAt: '2024-03-26T07:00:00Z',
    updateHistory: [
      { date: '2024-03-26T07:00:00Z', action: 'created', note: 'Seasonal fire risk assessment initiated', author: 'Fire Weather Team' },
      { date: '2024-03-27T16:00:00Z', action: 'updated', note: 'Kerni Fire incident added, risk elevated', author: 'Incident Commander' },
      { date: '2024-03-28T10:15:00Z', action: 'updated', note: 'Trend changed to Increasing, multi-district outlook', author: 'Risk Analysis Team' },
    ],
    preparednessNotes: [
      { audience: 'public', action: 'Report smoke or fire immediately. No open fires in forested areas.', priority: 'immediate' },
      { audience: 'municipal', action: 'Clear defensible space around settlements adjacent to forests', priority: 'short-term' },
      { audience: 'emergency-services', action: 'Pre-position firefighting resources in high-risk zones', priority: 'immediate' },
    ],
    publicGuidance: 'Residents near forested areas should maintain vigilance and report any smoke or fire signs immediately. Do not conduct any open burning. Clear vegetation around your property to create defensible space.',
    mapCenter: [34.2167, 74.3500],
    mapZoom: 9,
    tags: ['forest-fire', 'fire-weather', 'kerni-forest', 'dry-conditions'],
  },
  {
    id: 'ru-004',
    title: 'GLOF Risk Assessment Updated for Kolahoi Glacier Region',
    hazardType: 'glacier-glof',
    severity: 'low',
    trend: 'under-watch',
    status: 'active',
    affectedGeographies: [
      { type: 'district', name: 'Ganderbal', severity: 'low' },
      { type: 'region', name: 'Kolahoi Glacier Region', severity: 'low' },
      { type: 'basin', name: 'Lidder River Basin', severity: 'low' },
    ],
    basin: 'Lidder River Basin',
    assessmentSummary: 'Kolahoi glacial lake monitoring shows stable conditions. Satellite surveillance ongoing with no immediate risk indicators.',
    fullAssessmentNote: `The Glacial Lake Outburst Flood (GLOF) risk assessment for the Kolahoi Glacier region has been updated following the latest satellite imagery analysis and field observations. Current conditions indicate stable glacial lake configurations with no immediate outburst risk indicators.
    
    Satellite data shows gradual glacial retreat consistent with long-term trends, but no rapid lake expansion or moraine instability has been detected. Water levels in proglacial lakes remain within seasonal norms.
    
    However, the assessment notes that continued warming trends and accelerated glacial melt observed this season warrant sustained monitoring. The region remains under satellite surveillance with automated change detection protocols active.
    
    Historical GLOF events in similar Himalayan settings underscore the importance of maintaining vigilance even when current risk appears low. Early warning systems downstream should be maintained in operational status.`,
    riskDrivers: [
      { factor: 'Glacial Retreat', description: 'Long-term glacial retreat creating new proglacial lakes', influence: 'primary' },
      { factor: 'Seasonal Melt', description: 'Above-average melt rates this season increasing water volumes', influence: 'secondary' },
      { factor: 'Moraine Stability', description: 'Terminal moraine integrity at key glacial lakes', influence: 'primary' },
    ],
    linkedAlertStatus: 'none',
    linkedResources: [
      { type: 'monitoring', title: 'Glacier & Cryosphere Monitoring', href: '/risk-monitoring/glacier-cryosphere' },
      { type: 'atlas', title: 'Glacial Lake Map', href: '/atlas#glacial-lakes' },
      { type: 'dashboard', title: 'Cryosphere Dashboard', href: '/risk-monitoring/dashboards' },
    ],
    updatedAt: '2024-03-28T08:00:00Z',
    createdAt: '2024-03-22T10:00:00Z',
    updateHistory: [
      { date: '2024-03-22T10:00:00Z', action: 'created', note: 'Quarterly GLOF risk assessment cycle', author: 'Glaciology Team' },
      { date: '2024-03-28T08:00:00Z', action: 'updated', note: 'Latest satellite analysis incorporated, conditions stable', author: 'Remote Sensing Analyst' },
    ],
    preparednessNotes: [
      { audience: 'authorities', action: 'Maintain downstream early warning systems', priority: 'ongoing' },
      { audience: 'municipal', action: 'Include GLOF scenarios in emergency preparedness planning', priority: 'ongoing' },
    ],
    publicGuidance: 'Current GLOF risk is assessed as Low. Communities in the Lidder River Basin should be aware of natural warning signs (sudden water level changes, unusual sounds from glacier areas) and report them to authorities.',
    mapCenter: [34.2167, 75.4333],
    mapZoom: 12,
    tags: ['glof', 'kolahoi-glacier', 'glacial-lakes', 'lidder-basin', 'satellite-monitoring'],
  },
  {
    id: 'ru-005',
    title: 'Avalanche Risk Transitioning in High-Altitude Zones',
    hazardType: 'avalanche',
    severity: 'high',
    trend: 'improving',
    status: 'active',
    affectedGeographies: [
      { type: 'district', name: 'Gulmarg', severity: 'high' },
      { type: 'district', name: 'Ganderbal', severity: 'moderate' },
      { type: 'region', name: 'Pir Panjal Range', severity: 'high' },
    ],
    assessmentSummary: 'Avalanche danger decreasing as temperatures moderate and new snow loading stabilizes. Backcountry risk remains considerable.',
    fullAssessmentNote: `The avalanche risk in Kashmir's high-altitude zones is showing signs of improvement as the season transitions. Recent warming temperatures have helped stabilize new snow from earlier storm cycles, and the overall snowpack structure is becoming more settled.
    
    However, considerable avalanche danger persists in specific terrain: steep wind-loaded slopes, areas near recent avalanche activity, and aspects receiving direct solar radiation during afternoon hours. Several large avalanche cycles were recorded in the past week, particularly in the Gulmarg backcountry and Sonamarg approach.
    
    The improving trend is encouraging, but the risk remains High for backcountry travelers. Alpine start conditions (cold, clear mornings) can create temporary instabilities that resolve as temperatures warm.
    
    Road closure status remains in effect for several high-altitude routes where avalanche debris has not been fully cleared or where ongoing avalanche risk prevents safe clearance operations.`,
    riskDrivers: [
      { factor: 'Temperature Moderation', description: 'Warming trend helping to stabilize recent snow', influence: 'primary' },
      { factor: 'Wind Loading', description: 'Persistent wind slabs on lee aspects', influence: 'secondary' },
      { factor: 'Solar Radiation', description: 'Afternoon sun creating localized instability on sunny aspects', influence: 'contributing' },
    ],
    linkedAlertStatus: 'warning-active',
    linkedResources: [
      { type: 'alert', title: 'Avalanche Warning - Gulmarg', href: '/alerts#avalanche-gulmarg' },
      { type: 'monitoring', title: 'Avalanche & Winter Monitoring', href: '/risk-monitoring/avalanche-winter' },
      { type: 'field-report', title: 'Sonamarg Road Avalanche Report', href: '/field-reports#sonamarg-avalanche' },
      { type: 'atlas', title: 'Avalanche Hazard Map', href: '/atlas#avalanche-hazard' },
    ],
    updatedAt: '2024-03-28T06:30:00Z',
    createdAt: '2024-03-15T07:00:00Z',
    updateHistory: [
      { date: '2024-03-15T07:00:00Z', action: 'created', note: 'Winter avalanche season assessment', author: 'Avalanche Forecast Center' },
      { date: '2024-03-22T08:00:00Z', action: 'updated', note: 'Major storm cycle added, risk elevated to Critical', author: 'Avalanche Forecast Center' },
      { date: '2024-03-28T06:30:00Z', action: 'updated', note: 'Trend changed to Improving, risk downgraded to High', author: 'Senior Forecaster' },
    ],
    preparednessNotes: [
      { audience: 'public', action: 'Avoid backcountry travel. Stay on maintained, open routes only.', priority: 'immediate' },
      { audience: 'emergency-services', action: 'Continue clearance operations where safe to do so', priority: 'ongoing' },
      { audience: 'authorities', action: 'Maintain road closure protocols until debris cleared', priority: 'ongoing' },
    ],
    publicGuidance: 'Backcountry travel is strongly discouraged. All recreational activities should remain on maintained, open routes. Follow all closure signs and advisory notices. Avalanche risk changes rapidly with weather conditions.',
    mapCenter: [34.0489, 74.3807],
    mapZoom: 11,
    tags: ['avalanche', 'gulmarg', 'sonamarg', 'winter-hazards', 'backcountry'],
  },
];

// ============================================================================
// Computed Data & Utility Functions
// ============================================================================

export function getActiveUpdates(): RiskUpdate[] {
  return riskUpdates.filter(u => u.status === 'active');
}

export function getHighSeverityUpdates(): RiskUpdate[] {
  return riskUpdates.filter(u => u.severity === 'high' || u.severity === 'critical');
}

export function getUpdatesByHazard(hazard: HazardType): RiskUpdate[] {
  return riskUpdates.filter(u => u.hazardType === hazard);
}

export function getUpdatesByDistrict(district: string): RiskUpdate[] {
  return riskUpdates.filter(u =>
    u.affectedGeographies.some(g => g.type === 'district' && g.name === district)
  );
}

export function getUpdatesBySeverity(severity: RiskSeverity): RiskUpdate[] {
  return riskUpdates.filter(u => u.severity === severity);
}

export function getUpdatesByTrend(trend: RiskTrend): RiskUpdate[] {
  return riskUpdates.filter(u => u.trend === trend);
}

export function getDistinctDistricts(): string[] {
  const districts = new Set<string>();
  riskUpdates.forEach(u => {
    u.affectedGeographies
      .filter(g => g.type === 'district')
      .forEach(g => districts.add(g.name));
  });
  return Array.from(districts).sort();
}

export function getDistinctBasins(): string[] {
  const basins = new Set<string>();
  riskUpdates.forEach(u => {
    if (u.basin) basins.add(u.basin);
  });
  return Array.from(basins).sort();
}

export function getDistinctCorridors(): string[] {
  const corridors = new Set<string>();
  riskUpdates.forEach(u => {
    if (u.corridor) corridors.add(u.corridor);
  });
  return Array.from(corridors).sort();
}

export function getRiskUpdateById(id: string): RiskUpdate | undefined {
  return riskUpdates.find(u => u.id === id);
}

export function getSummaryStats() {
  const active = getActiveUpdates();
  return {
    totalUpdates: riskUpdates.length,
    activeUpdates: active.length,
    highSeverity: active.filter(u => u.severity === 'high' || u.severity === 'critical').length,
    districtsAffected: getDistinctDistricts().length,
    latestAssessment: riskUpdates.length > 0
      ? riskUpdates.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())[0].updatedAt
      : null,
  };
}
