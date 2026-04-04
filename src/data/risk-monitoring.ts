/**
 * Risk & Monitoring Intelligence - Mock Data
 * 
 * Comprehensive hazard, alert, advisory, and operational response data
 * for the Risk & Monitoring module across Kashmir
 */

import { AlertSeverity, AlertStatus, AlertPublicStatus, AlertConfidenceState, AlertCategory } from '@/types/alerts';

// ============================================================================
// District Risk Data
// ============================================================================

export interface DistrictRiskProfile {
  district: string;
  riskLevel: 'critical' | 'high' | 'moderate' | 'low';
  riskTrend: 'increasing' | 'stable' | 'decreasing';
  activeAlerts: number;
  dominantHazards: string[];
  infrastructureConcerns: number;
  advisoryStatus: string;
  lastUpdated: string;
}

export const districtRiskProfiles: DistrictRiskProfile[] = [
  {
    district: 'Srinagar',
    riskLevel: 'high',
    riskTrend: 'increasing',
    activeAlerts: 8,
    dominantHazards: ['Flood', 'Urban Waterlogging', 'Environmental Incident'],
    infrastructureConcerns: 12,
    advisoryStatus: 'Flood Advisory Active',
    lastUpdated: '2024-03-28T10:30:00Z',
  },
  {
    district: 'Anantnag',
    riskLevel: 'moderate',
    riskTrend: 'stable',
    activeAlerts: 5,
    dominantHazards: ['Landslide', 'Flash Flood'],
    infrastructureConcerns: 7,
    advisoryStatus: 'Slope Stability Watch',
    lastUpdated: '2024-03-28T09:15:00Z',
  },
  {
    district: 'Baramulla',
    riskLevel: 'high',
    riskTrend: 'increasing',
    activeAlerts: 9,
    dominantHazards: ['Flood', 'Avalanche', 'Forest Fire'],
    infrastructureConcerns: 15,
    advisoryStatus: 'Multi-Hazard Warning',
    lastUpdated: '2024-03-28T11:00:00Z',
  },
  {
    district: 'Gulmarg',
    riskLevel: 'critical',
    riskTrend: 'increasing',
    activeAlerts: 12,
    dominantHazards: ['Avalanche', 'Heavy Snow', 'Road Closure'],
    infrastructureConcerns: 8,
    advisoryStatus: 'Avalanche Warning - Red Flag',
    lastUpdated: '2024-03-28T12:00:00Z',
  },
  {
    district: 'Kupwara',
    riskLevel: 'high',
    riskTrend: 'stable',
    activeAlerts: 7,
    dominantHazards: ['Avalanche', 'Landslide', 'Forest Fire'],
    infrastructureConcerns: 10,
    advisoryStatus: 'Winter Hazard Advisory',
    lastUpdated: '2024-03-28T10:45:00Z',
  },
  {
    district: 'Pulwama',
    riskLevel: 'moderate',
    riskTrend: 'decreasing',
    activeAlerts: 3,
    dominantHazards: ['Flash Flood', 'Seismic'],
    infrastructureConcerns: 4,
    advisoryStatus: 'Monitoring',
    lastUpdated: '2024-03-28T08:30:00Z',
  },
  {
    district: 'Shopian',
    riskLevel: 'moderate',
    riskTrend: 'stable',
    activeAlerts: 4,
    dominantHazards: ['Landslide', 'Forest Fire'],
    infrastructureConcerns: 5,
    advisoryStatus: 'Slope Watch',
    lastUpdated: '2024-03-28T09:00:00Z',
  },
  {
    district: 'Budgam',
    riskLevel: 'low',
    riskTrend: 'stable',
    activeAlerts: 2,
    dominantHazards: ['Seismic', 'Urban Flooding'],
    infrastructureConcerns: 3,
    advisoryStatus: 'General Monitoring',
    lastUpdated: '2024-03-28T07:45:00Z',
  },
  {
    district: 'Ganderbal',
    riskLevel: 'high',
    riskTrend: 'increasing',
    activeAlerts: 10,
    dominantHazards: ['Avalanche', 'Glacial Risk', 'Landslide'],
    infrastructureConcerns: 11,
    advisoryStatus: 'High-Altitude Warning',
    lastUpdated: '2024-03-28T11:30:00Z',
  },
  {
    district: 'Bandipora',
    riskLevel: 'moderate',
    riskTrend: 'stable',
    activeAlerts: 6,
    dominantHazards: ['Flood', 'Landslide'],
    infrastructureConcerns: 6,
    advisoryStatus: 'River Watch Advisory',
    lastUpdated: '2024-03-28T10:00:00Z',
  },
];

// ============================================================================
// Live Alert Data
// ============================================================================

export interface LiveAlert {
  id: string;
  type: string;
  hazardCategory: string;
  district: string;
  location: string;
  severity: AlertSeverity;
  status: AlertStatus;
  publicStatus: AlertPublicStatus;
  confidenceState: AlertConfidenceState;
  timestamp: string;
  description: string;
  coordinates: [number, number];
  verified: boolean;
  escalationHistory?: string[];
  advisoryLink?: string;
}

export const liveAlerts: LiveAlert[] = [
  {
    id: 'alert-001',
    type: 'Avalanche Warning',
    hazardCategory: 'Avalanche & Winter',
    district: 'Gulmarg',
    location: 'Apharwat Peak Zone',
    severity: AlertSeverity.CRITICAL,
    status: AlertStatus.ACTIVE_NOW,
    publicStatus: AlertPublicStatus.ACTIVELY_CHANGING,
    confidenceState: AlertConfidenceState.INSTITUTIONALLY_REVIEWED,
    timestamp: '2024-03-28T12:00:00Z',
    description: 'High avalanche danger reported above 3000m. Multiple slab avalanches detected. All backcountry travel strongly discouraged.',
    coordinates: [34.0489, 74.3807],
    verified: true,
    escalationHistory: ['Initial Report', 'Field Verification', 'Institutional Review', 'Critical Warning Issued'],
    advisoryLink: '/risk-monitoring/avalanche-winter',
  },
  {
    id: 'alert-002',
    type: 'Flood Advisory',
    hazardCategory: 'Flood & Flash Flood',
    district: 'Srinagar',
    location: 'Jhelum River - Downtown',
    severity: AlertSeverity.SERIOUS,
    status: AlertStatus.ACTIVE_NOW,
    publicStatus: AlertPublicStatus.COMMUNITY_CONFIRMED,
    confidenceState: AlertConfidenceState.COMMUNITY_CONFIRMED,
    timestamp: '2024-03-28T10:30:00Z',
    description: 'River levels rising above normal. Low-lying areas advised to monitor conditions. Flood gates being adjusted.',
    coordinates: [34.0837, 74.7973],
    verified: true,
    advisoryLink: '/risk-monitoring/flood-flash-flood',
  },
  {
    id: 'alert-003',
    type: 'Landslide Warning',
    hazardCategory: 'Landslide & Slope',
    district: 'Anantnag',
    location: 'Z-Morh Corridor, KM 42',
    severity: AlertSeverity.CRITICAL,
    status: AlertStatus.ACTIVE_NOW,
    publicStatus: AlertPublicStatus.ACTIVELY_CHANGING,
    confidenceState: AlertConfidenceState.STRONGLY_CONFIRMED,
    timestamp: '2024-03-28T08:30:00Z',
    description: 'Active landslide zone with fresh debris. Road partially blocked. Heavy vehicle movement causing additional instability.',
    coordinates: [33.7333, 75.1833],
    verified: true,
    escalationHistory: ['Citizen Report', 'Field Team Dispatched', 'Warning Issued'],
    advisoryLink: '/risk-monitoring/landslide-slope',
  },
  {
    id: 'alert-004',
    type: 'Forest Fire Alert',
    hazardCategory: 'Forest Fire',
    district: 'Baramulla',
    location: 'Kerni Forest Range',
    severity: AlertSeverity.SERIOUS,
    status: AlertStatus.ACTIVE_NOW,
    publicStatus: AlertPublicStatus.COMMUNITY_CONFIRMED,
    confidenceState: AlertConfidenceState.COMMUNITY_CONFIRMED,
    timestamp: '2024-03-28T11:15:00Z',
    description: 'Active forest fire in progress. Smoke visible from multiple locations. Firefighting teams deployed.',
    coordinates: [34.2167, 74.3500],
    verified: true,
    advisoryLink: '/risk-monitoring/forest-fire',
  },
  {
    id: 'alert-005',
    type: 'Seismic Event',
    hazardCategory: 'Earthquake',
    district: 'Pulwama',
    location: 'Tral Region',
    severity: AlertSeverity.MODERATE,
    status: AlertStatus.PARTIALLY_ACTIVE,
    publicStatus: AlertPublicStatus.COMMUNITY_CONFIRMED,
    confidenceState: AlertConfidenceState.INSTITUTIONALLY_REVIEWED,
    timestamp: '2024-03-28T06:45:00Z',
    description: 'Magnitude 3.8 earthquake recorded. No structural damage reported. Monitoring for aftershocks.',
    coordinates: [33.8667, 74.9500],
    verified: true,
    advisoryLink: '/risk-monitoring/earthquake',
  },
  {
    id: 'alert-006',
    type: 'Sewage Overflow Emergency',
    hazardCategory: 'Environmental Incident Risk',
    district: 'Srinagar',
    location: 'Hazratbal Sewage Treatment Plant',
    severity: AlertSeverity.CRITICAL,
    status: AlertStatus.ACTIVE_NOW,
    publicStatus: AlertPublicStatus.ACTIVELY_CHANGING,
    confidenceState: AlertConfidenceState.STRONGLY_CONFIRMED,
    timestamp: '2024-03-28T09:00:00Z',
    description: 'Major sewage overflow into Dal Lake catchment. Water quality severely impacted. Emergency response activated.',
    coordinates: [34.1234, 74.8567],
    verified: true,
    escalationHistory: ['Public Report', 'Water Quality Test', 'Emergency Classification', 'Response Deployed'],
    advisoryLink: '/risk-monitoring/environmental-incident-risk',
  },
  {
    id: 'alert-007',
    type: 'Glacial Lake Monitoring',
    hazardCategory: 'Glacier & Cryosphere',
    district: 'Ganderbal',
    location: 'Kolahoi Glacier Region',
    severity: AlertSeverity.MODERATE,
    status: AlertStatus.UNCERTAIN,
    publicStatus: AlertPublicStatus.NEEDS_VERIFICATION,
    confidenceState: AlertConfidenceState.EARLY_COMMUNITY_SIGNAL,
    timestamp: '2024-03-28T07:30:00Z',
    description: 'Increased glacial melt observed. Potential glacial lake formation detected via satellite imagery.',
    coordinates: [34.2167, 75.4333],
    verified: false,
    advisoryLink: '/risk-monitoring/glacier-cryosphere',
  },
  {
    id: 'alert-008',
    type: 'Flash Flood Watch',
    hazardCategory: 'Flood & Flash Flood',
    district: 'Kupwara',
    location: 'Kishanganga River Basin',
    severity: AlertSeverity.SERIOUS,
    status: AlertStatus.ACTIVE_NOW,
    publicStatus: AlertPublicStatus.REPORTED,
    confidenceState: AlertConfidenceState.UNVERIFIED,
    timestamp: '2024-03-28T11:45:00Z',
    description: 'Heavy rainfall in catchment area. Flash flood watch issued for downstream communities.',
    coordinates: [34.3500, 74.2500],
    verified: false,
    advisoryLink: '/risk-monitoring/flood-flash-flood',
  },
  {
    id: 'alert-009',
    type: 'River Overflow Risk',
    hazardCategory: 'Hydrological Risk',
    district: 'Bandipora',
    location: 'Wular Lake Outflow',
    severity: AlertSeverity.MODERATE,
    status: AlertStatus.PARTIALLY_ACTIVE,
    publicStatus: AlertPublicStatus.COMMUNITY_CONFIRMED,
    confidenceState: AlertConfidenceState.COMMUNITY_CONFIRMED,
    timestamp: '2024-03-28T10:00:00Z',
    description: 'Water levels approaching warning threshold. Overflow risk to adjacent wetlands and agricultural areas.',
    coordinates: [34.3167, 74.6333],
    verified: true,
    advisoryLink: '/risk-monitoring/hydrological-risk',
  },
  {
    id: 'alert-010',
    type: 'Road Closure - Avalanche',
    hazardCategory: 'Avalanche & Winter',
    district: 'Ganderbal',
    location: 'Sonamarg Road, KM 18',
    severity: AlertSeverity.CRITICAL,
    status: AlertStatus.ACTIVE_NOW,
    publicStatus: AlertPublicStatus.ACTIVELY_CHANGING,
    confidenceState: AlertConfidenceState.INSTITUTIONALLY_REVIEWED,
    timestamp: '2024-03-28T08:00:00Z',
    description: 'Road completely blocked by avalanche debris. Clearance operations suspended due to ongoing avalanche risk.',
    coordinates: [34.3000, 75.2833],
    verified: true,
    advisoryLink: '/risk-monitoring/shelters-closures-emergency-routes',
  },
];

// ============================================================================
// Hazard Category Summary
// ============================================================================

export interface HazardCategorySummary {
  id: string;
  name: string;
  icon: string;
  activeAlerts: number;
  riskLevel: 'critical' | 'high' | 'moderate' | 'low';
  districts: string[];
  trend: 'increasing' | 'stable' | 'decreasing';
  route: string;
}

export const hazardCategorySummaries: HazardCategorySummary[] = [
  {
    id: 'flood-flash-flood',
    name: 'Flood & Flash Flood',
    icon: 'Droplets',
    activeAlerts: 15,
    riskLevel: 'high',
    districts: ['Srinagar', 'Baramulla', 'Kupwara', 'Bandipora'],
    trend: 'increasing',
    route: '/risk-monitoring/flood-flash-flood',
  },
  {
    id: 'landslide-slope',
    name: 'Landslide & Slope',
    icon: 'Mountain',
    activeAlerts: 12,
    riskLevel: 'high',
    districts: ['Anantnag', 'Shopian', 'Ganderbal', 'Kupwara'],
    trend: 'stable',
    route: '/risk-monitoring/landslide-slope',
  },
  {
    id: 'avalanche-winter',
    name: 'Avalanche & Winter',
    icon: 'Snowflake',
    activeAlerts: 18,
    riskLevel: 'critical',
    districts: ['Gulmarg', 'Ganderbal', 'Kupwara', 'Baramulla'],
    trend: 'increasing',
    route: '/risk-monitoring/avalanche-winter',
  },
  {
    id: 'earthquake',
    name: 'Earthquake',
    icon: 'Zap',
    activeAlerts: 3,
    riskLevel: 'moderate',
    districts: ['Pulwama', 'Budgam', 'Srinagar'],
    trend: 'stable',
    route: '/risk-monitoring/earthquake',
  },
  {
    id: 'forest-fire',
    name: 'Forest Fire',
    icon: 'Flame',
    activeAlerts: 8,
    riskLevel: 'high',
    districts: ['Baramulla', 'Anantnag', 'Shopian', 'Kupwara'],
    trend: 'increasing',
    route: '/risk-monitoring/forest-fire',
  },
  {
    id: 'glacier-cryosphere',
    name: 'Glacier & Cryosphere',
    icon: 'Mountain',
    activeAlerts: 4,
    riskLevel: 'moderate',
    districts: ['Ganderbal', 'Kupwara', 'Baramulla'],
    trend: 'stable',
    route: '/risk-monitoring/glacier-cryosphere',
  },
  {
    id: 'hydrological-risk',
    name: 'Hydrological Risk',
    icon: 'Waves',
    activeAlerts: 9,
    riskLevel: 'moderate',
    districts: ['Bandipora', 'Srinagar', 'Baramulla'],
    trend: 'stable',
    route: '/risk-monitoring/hydrological-risk',
  },
  {
    id: 'environmental-incident',
    name: 'Environmental Incident Risk',
    icon: 'AlertTriangle',
    activeAlerts: 6,
    riskLevel: 'high',
    districts: ['Srinagar', 'Anantnag', 'Baramulla'],
    trend: 'increasing',
    route: '/risk-monitoring/environmental-incident-risk',
  },
];

// ============================================================================
// Critical Infrastructure Data
// ============================================================================

export interface CriticalInfrastructure {
  id: string;
  name: string;
  type: 'hospital' | 'shelter' | 'bridge' | 'treatment_plant' | 'power_station' | 'communication';
  district: string;
  status: 'operational' | 'stressed' | 'critical' | 'closed';
  coordinates: [number, number];
  lastInspection: string;
  concerns?: string[];
}

export const criticalInfrastructure: CriticalInfrastructure[] = [
  {
    id: 'infra-001',
    name: 'SMHS Hospital',
    type: 'hospital',
    district: 'Srinagar',
    status: 'operational',
    coordinates: [34.0837, 74.8237],
    lastInspection: '2024-03-27',
  },
  {
    id: 'infra-002',
    name: 'Hazratbal Sewage Treatment Plant',
    type: 'treatment_plant',
    district: 'Srinagar',
    status: 'critical',
    coordinates: [34.1234, 74.8567],
    lastInspection: '2024-03-28',
    concerns: ['Overflow Active', 'Capacity Exceeded', 'Emergency Response Deployed'],
  },
  {
    id: 'infra-003',
    name: 'Amira Kadal Bridge',
    type: 'bridge',
    district: 'Srinagar',
    status: 'stressed',
    coordinates: [34.0820, 74.7950],
    lastInspection: '2024-03-26',
    concerns: ['High Water Flow', 'Structural Monitoring Active'],
  },
  {
    id: 'infra-004',
    name: 'Gulmarg Emergency Shelter',
    type: 'shelter',
    district: 'Gulmarg',
    status: 'operational',
    coordinates: [34.0489, 74.3807],
    lastInspection: '2024-03-28',
  },
  {
    id: 'infra-005',
    name: 'Sonamarg Communication Tower',
    type: 'communication',
    district: 'Ganderbal',
    status: 'critical',
    coordinates: [34.3000, 75.2833],
    lastInspection: '2024-03-27',
    concerns: ['Avalanche Damage', 'Service Disrupted', 'Repair Team Dispatched'],
  },
  {
    id: 'infra-006',
    name: 'Uri Power Station',
    type: 'power_station',
    district: 'Baramulla',
    status: 'operational',
    coordinates: [34.3167, 74.2500],
    lastInspection: '2024-03-25',
  },
];

// ============================================================================
// Shelter & Emergency Route Data
// ============================================================================

export interface EmergencyRoute {
  id: string;
  name: string;
  type: 'route' | 'shelter' | 'closure';
  district: string;
  status: 'open' | 'restricted' | 'closed';
  coordinates: [number, number];
  description: string;
  alternativeAvailable: boolean;
}

export const emergencyRoutes: EmergencyRoute[] = [
  {
    id: 'route-001',
    name: 'Srinagar-Jammu Highway',
    type: 'route',
    district: 'Anantnag',
    status: 'restricted',
    coordinates: [33.7333, 75.1833],
    description: 'Intermittent closures due to landslide risk at Z-Morh. Convoy system active.',
    alternativeAvailable: true,
  },
  {
    id: 'route-002',
    name: 'Sonamarg Road',
    type: 'closure',
    district: 'Ganderbal',
    status: 'closed',
    coordinates: [34.3000, 75.2833],
    description: 'Closed due to avalanche. No estimated reopening date.',
    alternativeAvailable: false,
  },
  {
    id: 'route-003',
    name: 'Gulmarg Emergency Shelter',
    type: 'shelter',
    district: 'Baramulla',
    status: 'open',
    coordinates: [34.0489, 74.3807],
    description: 'Capacity: 200 persons. Currently housing 85 evacuees.',
    alternativeAvailable: true,
  },
  {
    id: 'route-004',
    name: 'Kupwara-Tangdhar Road',
    type: 'route',
    district: 'Kupwara',
    status: 'restricted',
    coordinates: [34.3500, 74.2500],
    description: 'Limited access due to snow. 4WD vehicles only.',
    alternativeAvailable: true,
  },
  {
    id: 'route-005',
    name: 'Pahalgam Emergency Shelter',
    type: 'shelter',
    district: 'Anantnag',
    status: 'open',
    coordinates: [34.0167, 75.3167],
    description: 'Capacity: 150 persons. Currently at 40% capacity.',
    alternativeAvailable: true,
  },
];

// ============================================================================
// Dashboard Statistics
// ============================================================================

export interface RiskDashboardStats {
  totalActiveAlerts: number;
  criticalAlerts: number;
  highAlerts: number;
  moderateAlerts: number;
  lowAlerts: number;
  incidentsToday: number;
  advisoriesIssued: number;
  closuresActive: number;
  districtsMonitored: number;
  infrastructureStressed: number;
  trendData: {
    alertsLast7Days: number[];
    incidentsLast7Days: number[];
  };
}

export const riskDashboardStats: RiskDashboardStats = {
  totalActiveAlerts: 89,
  criticalAlerts: 12,
  highAlerts: 23,
  moderateAlerts: 38,
  lowAlerts: 16,
  incidentsToday: 8,
  advisoriesIssued: 15,
  closuresActive: 7,
  districtsMonitored: 20,
  infrastructureStressed: 9,
  trendData: {
    alertsLast7Days: [67, 72, 78, 85, 82, 87, 89],
    incidentsLast7Days: [5, 7, 6, 9, 8, 7, 8],
  },
};

// ============================================================================
// Recent Incidents
// ============================================================================

export interface RecentIncident {
  id: string;
  title: string;
  type: string;
  district: string;
  severity: AlertSeverity;
  status: 'active' | 'monitoring' | 'resolved';
  timestamp: string;
  description: string;
}

export const recentIncidents: RecentIncident[] = [
  {
    id: 'inc-001',
    title: 'Major Sewage Overflow - Hazratbal',
    type: 'Environmental Incident',
    district: 'Srinagar',
    severity: AlertSeverity.CRITICAL,
    status: 'active',
    timestamp: '2024-03-28T09:00:00Z',
    description: 'Emergency response activated after major sewage overflow into Dal Lake catchment area.',
  },
  {
    id: 'inc-002',
    title: 'Avalanche Blocks Sonamarg Road',
    type: 'Avalanche',
    district: 'Ganderbal',
    severity: AlertSeverity.CRITICAL,
    status: 'active',
    timestamp: '2024-03-28T08:00:00Z',
    description: 'Large avalanche debris blocking Sonamarg road. Clearance operations suspended.',
  },
  {
    id: 'inc-003',
    title: 'Forest Fire in Kerni Range',
    type: 'Forest Fire',
    district: 'Baramulla',
    severity: AlertSeverity.SERIOUS,
    status: 'active',
    timestamp: '2024-03-28T11:15:00Z',
    description: 'Active forest fire with firefighting teams deployed. Smoke affecting visibility.',
  },
  {
    id: 'inc-004',
    title: 'Landslide at Z-Morh Corridor',
    type: 'Landslide',
    district: 'Anantnag',
    severity: AlertSeverity.CRITICAL,
    status: 'monitoring',
    timestamp: '2024-03-28T08:30:00Z',
    description: 'Active landslide zone with ongoing monitoring. Traffic restricted.',
  },
  {
    id: 'inc-005',
    title: 'Earthquake - Tral Region',
    type: 'Earthquake',
    district: 'Pulwama',
    severity: AlertSeverity.MODERATE,
    status: 'resolved',
    timestamp: '2024-03-28T06:45:00Z',
    description: 'Magnitude 3.8 earthquake. No damage reported. Monitoring for aftershocks.',
  },
];

// ============================================================================
// Advisory Data
// ============================================================================

export interface Advisory {
  id: string;
  title: string;
  type: 'warning' | 'watch' | 'advisory' | 'information';
  hazardCategory: string;
  district: string;
  issuedAt: string;
  validUntil: string;
  description: string;
  actions: string[];
}

export const advisories: Advisory[] = [
  {
    id: 'adv-001',
    title: 'Avalanche Warning - Gulmarg Backcountry',
    type: 'warning',
    hazardCategory: 'Avalanche & Winter',
    district: 'Gulmarg',
    issuedAt: '2024-03-28T06:00:00Z',
    validUntil: '2024-03-29T06:00:00Z',
    description: 'Considerable to high avalanche danger. Natural and human-triggered avalanches likely.',
    actions: ['Avoid steep terrain', 'Stay on maintained trails', 'Carry avalanche safety equipment', 'Check daily forecast'],
  },
  {
    id: 'adv-002',
    title: 'Flood Watch - Jhelum Basin',
    type: 'watch',
    hazardCategory: 'Flood & Flash Flood',
    district: 'Srinagar',
    issuedAt: '2024-03-28T08:00:00Z',
    validUntil: '2024-03-30T08:00:00Z',
    description: 'Rising water levels due to snowmelt and rainfall. Monitor low-lying areas.',
    actions: ['Monitor river levels', 'Prepare emergency supplies', 'Stay informed via official channels'],
  },
  {
    id: 'adv-003',
    title: 'Air Quality Advisory - Srinagar Urban',
    type: 'advisory',
    hazardCategory: 'Environmental Incident Risk',
    district: 'Srinagar',
    issuedAt: '2024-03-28T07:00:00Z',
    validUntil: '2024-03-28T20:00:00Z',
    description: 'AQI expected to reach unhealthy levels. Sensitive groups should limit outdoor exposure.',
    actions: ['Limit outdoor activities', 'Use masks if necessary', 'Keep windows closed', 'Monitor AQI updates'],
  },
  {
    id: 'adv-004',
    title: 'Forest Fire Danger - High',
    type: 'watch',
    hazardCategory: 'Forest Fire',
    district: 'Baramulla',
    issuedAt: '2024-03-27T06:00:00Z',
    validUntil: '2024-03-29T18:00:00Z',
    description: 'Dry conditions and strong winds creating high fire danger in forested areas.',
    actions: ['No open fires', 'Report smoke immediately', 'Clear defensible space', 'Prepare evacuation routes'],
  },
];
