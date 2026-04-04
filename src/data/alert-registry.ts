// Live Alerts & Advisories Registry
// Realistic operational alert data for Kashmir EcoWatch

export type AlertSeverity = 'low' | 'moderate' | 'high' | 'critical';
export type AlertStatus = 'active' | 'monitoring' | 'expired' | 'resolved';
export type AlertCategory = 'flood' | 'landslide' | 'avalanche' | 'fire' | 'air-quality' | 'heatwave' | 'earthquake' | 'storm';
export type AlertSource = 'institutional' | 'platform-reviewed' | 'under-monitoring' | 'expert-verified';

export interface AlertUpdate {
  timestamp: string;
  action: string;
  note: string;
}

export interface PublicGuidance {
  summary: string;
  actions: string[];
  travelImpact: string;
  urgency: 'precautionary' | 'urgent' | 'advisory';
}

export interface AlertItem {
  id: string;
  title: string;
  category: AlertCategory;
  severity: AlertSeverity;
  status: AlertStatus;
  
  // Location & Scope
  district: string;
  affectedArea: string;
  corridor?: string;
  
  // Timing
  issued: string;
  updated: string;
  expires: string;
  
  // Source & Verification
  source: AlertSource;
  issuedBy: string;
  
  // Content
  summary: string;
  cause: string;
  
  // Public Guidance
  guidance: PublicGuidance;
  
  // Module & Map Links
  relatedModule: string;
  relatedModulePath: string;
  mapLink?: string;
  
  // Update History
  updates: AlertUpdate[];
  
  // Metadata
  tags: string[];
}

// Current date helper
const now = new Date();
const daysAgo = (days: number) => {
  const d = new Date(now);
  d.setDate(d.getDate() - days);
  return d.toISOString();
};
const daysFromNow = (days: number) => {
  const d = new Date(now);
  d.setDate(d.getDate() + days);
  return d.toISOString();
};
const formatRelative = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const alertRegistry: AlertItem[] = [
  {
    id: 'alert-flood-001',
    title: 'Flood Advisory — Jhelum Basin',
    category: 'flood',
    severity: 'moderate',
    status: 'active',
    district: 'Srinagar',
    affectedArea: 'Jhelum River Basin, downstream stretches',
    corridor: 'Jhelum Basin Corridor',
    issued: daysAgo(0),
    updated: daysAgo(0),
    expires: daysFromNow(2),
    source: 'institutional',
    issuedBy: 'J&K State Disaster Management Authority',
    summary: 'Moderate flood advisory issued for Jhelum Basin following sustained rainfall and elevated water levels at key monitoring stations. Water levels remain below danger mark but warrant continued monitoring.',
    cause: 'Sustained rainfall over 72-hour period causing elevated river levels across Jhelum Basin. Snowmelt from upper catchments contributing to flow augmentation.',
    guidance: {
      summary: 'Residents and visitors in low-lying flood-prone areas should remain vigilant and monitor official updates. No immediate evacuation required at this stage.',
      actions: [
        'Monitor official route status and weather updates',
        'Avoid low-lying flood-prone stretches during peak flow hours',
        'Keep emergency contact numbers accessible',
        'Secure livestock and movable property in vulnerable zones'
      ],
      travelImpact: 'Minor delays possible on riverside routes. Most highways remain open.',
      urgency: 'advisory'
    },
    relatedModule: 'risk-monitoring',
    relatedModulePath: '/risk-monitoring',
    mapLink: '/atlas?layer=flood-risk&basin=jhelum',
    updates: [
      { timestamp: daysAgo(0), action: 'Advisory Issued', note: 'Flood advisory activated based on IMD rainfall forecasts and current river levels.' },
    ],
    tags: ['flood', 'jhelum', 'advisory', 'srinagar', 'river-levels']
  },
  {
    id: 'alert-landslide-001',
    title: 'Landslide Warning — Z-Morh Corridor',
    category: 'landslide',
    severity: 'high',
    status: 'active',
    district: 'Ganderbal',
    affectedArea: 'Z-Morh Highway, landslide-prone slopes between Kangan and Gund',
    corridor: 'Z-Morh Highway Corridor',
    issued: daysAgo(1),
    updated: daysAgo(0),
    expires: daysFromNow(1),
    source: 'expert-verified',
    issuedBy: 'Geological Survey of India / J&K Roads Division',
    summary: 'High-severity landslide warning for Z-Morh corridor following heavy rainfall and slope instability. Multiple slip zones identified. Traffic restrictions in place.',
    cause: 'Intense rainfall triggering slope instability along vulnerable sections. Geological survey confirms active movement on previously identified landslide zones.',
    guidance: {
      summary: 'Exercise extreme caution along Z-Morh corridor. Non-essential travel should be postponed. Monitor official route status before departure.',
      actions: [
        'Postpone non-essential travel along Z-Morh Highway',
        'Use alternative routes where available',
        'Monitor official road status bulletins',
        'Avoid stopping near identified slope failure zones',
        'Report any new ground cracks or slope movement to authorities'
      ],
      travelImpact: 'Significant. Highway partially restricted. Expect delays and diversions.',
      urgency: 'urgent'
    },
    relatedModule: 'risk-monitoring',
    relatedModulePath: '/risk-monitoring',
    mapLink: '/atlas?layer=landslide-risk&corridor=z-morh',
    updates: [
      { timestamp: daysAgo(1), action: 'Warning Issued', note: 'Initial landslide warning based on rainfall threshold exceedance and slope stability models.' },
      { timestamp: daysAgo(0), action: 'Status Updated', note: 'Two active slip zones confirmed. Traffic movement restricted to daylight hours with caution.' },
    ],
    tags: ['landslide', 'z-morh', 'warning', 'ganderbal', 'highway', 'slope-stability']
  },
  {
    id: 'alert-heatwave-001',
    title: 'Heatwave Advisory — Srinagar Valley',
    category: 'heatwave',
    severity: 'moderate',
    status: 'monitoring',
    district: 'Srinagar',
    affectedArea: 'Srinagar Valley and surrounding urban areas',
    issued: daysAgo(2),
    updated: daysAgo(1),
    expires: daysFromNow(1),
    source: 'platform-reviewed',
    issuedBy: 'India Meteorological Department / Kashmir EcoWatch',
    summary: 'Moderate heatwave conditions expected to persist through the week. Maximum temperatures 3-4°C above normal. Vulnerable populations advised to take precautions.',
    cause: 'High-pressure system causing subsidence and reduced cloud cover. Temperatures significantly above seasonal normals for this period.',
    guidance: {
      summary: 'Limit outdoor exposure during peak heat hours. Stay hydrated and seek cool environments. Check on elderly and vulnerable individuals.',
      actions: [
        'Avoid direct exposure during peak heat (11 AM - 4 PM)',
        'Stay hydrated and carry water during outdoor activities',
        'Wear light, breathable clothing',
        'Check on elderly neighbors and those with heat-sensitive conditions',
        'Avoid strenuous outdoor work during midday hours'
      ],
      travelImpact: 'Minimal. Travel is safe but plan for heat during outdoor activities.',
      urgency: 'precautionary'
    },
    relatedModule: 'environmental-monitoring',
    relatedModulePath: '/environmental-monitoring',
    updates: [
      { timestamp: daysAgo(2), action: 'Advisory Issued', note: 'Heatwave advisory based on IMD forecast of above-normal temperatures.' },
      { timestamp: daysAgo(1), action: 'Under Monitoring', note: 'Conditions persisting. Temperature records confirm 3-4°C above normal. Advisory remains in effect.' },
    ],
    tags: ['heatwave', 'advisory', 'srinagar', 'temperature', 'public-health']
  },
  {
    id: 'alert-avalanche-001',
    title: 'Avalanche Warning — Zoji La Pass',
    category: 'avalanche',
    severity: 'high',
    status: 'expired',
    district: 'Kargil',
    affectedArea: 'Zoji La Pass and adjoining slopes',
    corridor: 'Zoji La Pass Corridor',
    issued: daysAgo(8),
    updated: daysAgo(5),
    expires: daysAgo(3),
    source: 'institutional',
    issuedBy: 'Snow and Avalanche Study Establishment (SASE)',
    summary: 'High avalanche risk warning for Zoji La Pass region following heavy snowfall and unstable snowpack conditions. Warning has now expired as conditions stabilized.',
    cause: 'Heavy snowfall deposition on weak layers created unstable snowpack. Subsequent consolidation and favorable weather reduced avalanche hazard.',
    guidance: {
      summary: 'This advisory has expired. Conditions have stabilized. Normal transit through Zoji La is possible, but remain cautious of residual snow on slopes.',
      actions: [
        'Normal transit permitted with standard precautions',
        'Remain aware of residual snow instability on steep slopes',
        'Carry basic avalanche safety equipment if venturing off established routes',
        'Monitor updated forecasts before high-altitude travel'
      ],
      travelImpact: 'None. Highway open for normal transit.',
      urgency: 'advisory'
    },
    relatedModule: 'risk-monitoring',
    relatedModulePath: '/risk-monitoring',
    mapLink: '/atlas?layer=avalanche-risk&pass=zoji-la',
    updates: [
      { timestamp: daysAgo(8), action: 'Warning Issued', note: 'High avalanche danger following 80cm fresh snowfall in 48 hours.' },
      { timestamp: daysAgo(5), action: 'Status Updated', note: 'Snowpack stabilizing. Hazard decreasing but residual risk remains.' },
      { timestamp: daysAgo(3), action: 'Warning Expired', note: 'Avalanche hazard reduced to moderate. Warning expired. Standard precautions advised.' },
    ],
    tags: ['avalanche', 'zoji-la', 'warning', 'expired', 'snowpack']
  },
  {
    id: 'alert-fire-001',
    title: 'Forest Fire Risk — Pir Panjal Range',
    category: 'fire',
    severity: 'high',
    status: 'active',
    district: 'Kulgam',
    affectedArea: 'Pir Panjal forest ranges, dry slope sections',
    issued: daysAgo(1),
    updated: daysAgo(0),
    expires: daysFromNow(3),
    source: 'platform-reviewed',
    issuedBy: 'J&K Forest Department / Kashmir EcoWatch Risk Monitor',
    summary: 'Elevated forest fire risk detected across Pir Panjal range sections due to dry conditions, high temperatures, and accumulated fuel load. Satellite hotspots identified in two locations.',
    cause: 'Extended dry period with minimal rainfall. High daytime temperatures drying vegetation. Satellite-detected thermal anomalies suggest active fire starts in remote sections.',
    guidance: {
      summary: 'Avoid forested areas and dry slope corridors. Report any smoke or fire sightings immediately. Do not attempt to approach active fire zones.',
      actions: [
        'Avoid non-essential travel through forested hill areas',
        'Report smoke or fire sightings to Forest Department immediately',
        'Do not attempt to approach or combat active fires without training',
        'Keep windows closed if smoke drift affects residential areas',
        'Monitor air quality updates if downwind of fire zones'
      ],
      travelImpact: 'Moderate. Forest routes and hill trails should be avoided. Main highways remain open.',
      urgency: 'urgent'
    },
    relatedModule: 'risk-monitoring',
    relatedModulePath: '/risk-monitoring',
    mapLink: '/atlas?layer=fire-risk&range=pir-panjal',
    updates: [
      { timestamp: daysAgo(1), action: 'Risk Alert Issued', note: 'Fire risk elevated based on weather conditions and fuel load assessment.' },
      { timestamp: daysAgo(0), action: 'Hotspots Detected', note: 'Two thermal anomalies detected via satellite. Ground verification underway.' },
    ],
    tags: ['fire', 'forest', 'pir-panjal', 'kulgam', 'satellite', 'hotspot']
  },
  {
    id: 'alert-air-001',
    title: 'Air Quality Alert — Srinagar Urban Area',
    category: 'air-quality',
    severity: 'moderate',
    status: 'active',
    district: 'Srinagar',
    affectedArea: 'Srinagar urban agglomeration and suburban areas',
    issued: daysAgo(0),
    updated: daysAgo(0),
    expires: daysFromNow(1),
    source: 'institutional',
    issuedBy: 'J&K State Pollution Control Board',
    summary: 'Moderate to poor air quality expected due to temperature inversion and reduced wind speeds. AQI levels approaching upper-moderate range. Sensitive groups should limit prolonged outdoor exposure.',
    cause: 'Temperature inversion trapping pollutants near surface. Low wind speeds reducing dispersion. Vehicular emissions and biomass burning contributing to particulate load.',
    guidance: {
      summary: 'Sensitive individuals should limit prolonged outdoor activities. General public should monitor symptoms and reduce exposure if experiencing respiratory discomfort.',
      actions: [
        'Sensitive groups (asthma, respiratory conditions) should limit outdoor exposure',
        'Keep windows closed during early morning and late evening hours',
        'Use masks if experiencing irritation in high-traffic areas',
        'Avoid outdoor exercise during peak pollution hours',
        'Monitor children and elderly for respiratory symptoms'
      ],
      travelImpact: 'None. Travel unaffected, but limit time in high-traffic areas if sensitive.',
      urgency: 'precautionary'
    },
    relatedModule: 'environmental-monitoring',
    relatedModulePath: '/environmental-monitoring',
    updates: [
      { timestamp: daysAgo(0), action: 'Alert Issued', note: 'Air quality alert based on SPCB monitoring data showing rising PM2.5 and PM10 levels.' },
    ],
    tags: ['air-quality', 'srinagar', 'pollution', 'aqi', 'health-advisory']
  },
];

// Computed properties
export const getActiveAlerts = () => alertRegistry.filter(a => a.status === 'active');
export const getMonitoringAlerts = () => alertRegistry.filter(a => a.status === 'monitoring');
export const getExpiredAlerts = () => alertRegistry.filter(a => a.status === 'expired');
export const getResolvedAlerts = () => alertRegistry.filter(a => a.status === 'resolved');

export const getAlertsByCategory = (category: AlertCategory) => alertRegistry.filter(a => a.category === category);
export const getAlertsBySeverity = (severity: AlertSeverity) => alertRegistry.filter(a => a.severity === severity);
export const getAlertsByDistrict = (district: string) => alertRegistry.filter(a => a.district === district);
export const getAlertsBySource = (source: AlertSource) => alertRegistry.filter(a => a.source === source);

export const getAlertById = (id: string) => alertRegistry.find(a => a.id === id);

export const getAlertStats = () => ({
  total: alertRegistry.length,
  active: getActiveAlerts().length,
  monitoring: getMonitoringAlerts().length,
  expired: getExpiredAlerts().length,
  highSeverity: alertRegistry.filter(a => a.severity === 'high' || a.severity === 'critical').length,
  districtsAffected: new Set(alertRegistry.filter(a => a.status === 'active' || a.status === 'monitoring').map(a => a.district)).size,
});

export const categoryLabels: Record<AlertCategory, string> = {
  flood: 'Flood',
  landslide: 'Landslide',
  avalanche: 'Avalanche',
  fire: 'Forest Fire',
  'air-quality': 'Air Quality',
  heatwave: 'Heatwave',
  earthquake: 'Earthquake',
  storm: 'Storm',
};

export const categoryColors: Record<AlertCategory, string> = {
  flood: 'from-blue-500 to-cyan-500',
  landslide: 'from-amber-500 to-orange-500',
  avalanche: 'from-slate-400 to-blue-400',
  fire: 'from-red-500 to-orange-500',
  'air-quality': 'from-purple-500 to-pink-500',
  heatwave: 'from-yellow-500 to-amber-500',
  earthquake: 'from-stone-500 to-stone-600',
  storm: 'from-indigo-500 to-purple-500',
};

export const severityDisplayLabels: Record<AlertSeverity, string> = {
  low: 'Low',
  moderate: 'Moderate',
  high: 'High',
  critical: 'Critical',
};

export const severityColors: Record<AlertSeverity, string> = {
  low: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  moderate: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  critical: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export const statusDisplayLabels: Record<AlertStatus, string> = {
  active: 'Active',
  monitoring: 'Under Monitoring',
  expired: 'Expired',
  resolved: 'Resolved',
};

export const statusColors: Record<AlertStatus, string> = {
  active: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  monitoring: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  expired: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  resolved: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
};

export const sourceDisplayLabels: Record<AlertSource, string> = {
  institutional: 'Institutionally Sourced',
  'platform-reviewed': 'Platform Reviewed',
  'under-monitoring': 'Under Monitoring',
  'expert-verified': 'Expert Verified',
};

export const urgencyLabels: Record<PublicGuidance['urgency'], string> = {
  precautionary: 'Precautionary',
  urgent: 'Urgent Action Required',
  advisory: 'Advisory',
};
