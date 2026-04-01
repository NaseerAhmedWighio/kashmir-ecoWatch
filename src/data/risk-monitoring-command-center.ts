// Risk & Monitoring Command Center Functions
// Operational intelligence for real-time risk monitoring and response

import type {
  RiskDashboardData,
  ThreatAnalysis,
} from '../types/biodiversity';

import { getBiodiversityRiskDashboard, getThreatSeverityAnalysis } from '../data/biodiversity-access';
import { getDistrictWaterIntelligence } from '../data/hydrological-intelligence';
import { getSeasonalDashboardData } from '../data/seasonal-intelligence';

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export type RiskCategory = 'hazard' | 'pollution' | 'biodiversity' | 'response';

export type SeverityLevel = 'critical' | 'high' | 'moderate' | 'low';

export type IncidentStatus = 'active' | 'monitoring' | 'resolved' | 'closed';

export type WatchStatus = 'normal' | 'elevated' | 'high' | 'critical';

export type EscalationLevel = 1 | 2 | 3 | 4;

export interface ActiveRiskSnapshot {
  timestamp: string;
  overallRiskScore: number;
  riskByCategory: {
    hazard: number;
    pollution: number;
    biodiversity: number;
    response: number;
  };
  trend: {
    overall: 'increasing' | 'stable' | 'decreasing';
    hazard: 'increasing' | 'stable' | 'decreasing';
    pollution: 'increasing' | 'stable' | 'decreasing';
    biodiversity: 'increasing' | 'stable' | 'decreasing';
  };
  last24Hours: {
    newIncidents: number;
    resolvedIncidents: number;
    escalatedIncidents: number;
    criticalIncidents: number;
  };
  districtsUnderWatch: number;
  alertAgeDistribution: {
    '<1day': number;
    '1-3days': number;
    '3-7days': number;
    '>7days': number;
  };
}

export interface DistrictWatchEntry {
  district: string;
  rank: number;
  overallRiskScore: number;
  watchStatus: WatchStatus;
  weekOverWeekChange: number;
  categoryScores: {
    hazard: number;
    pollution: number;
    biodiversity: number;
  };
  activeIncidents: number;
  criticalIncidents: string[];
  hotspotCorridors: string[];
  responseCapacity: 'adequate' | 'stretched' | 'overwhelmed';
  lastUpdated: string;
}

export interface HotspotCorridor {
  id: string;
  name: string;
  type: 'wildlife-conflict' | 'pollution' | 'mortality' | 'multi-hazard';
  severity: 'moderate' | 'high' | 'critical';
  location: {
    districts: string[];
    coordinates: { lat: number; lng: number }[];
  };
  characteristics: {
    length: number;
    width: number;
    area: number;
  };
  riskFactors: string[];
  affectedEntities: {
    species?: string[];
    infrastructure?: string[];
    communities?: string[];
  };
  incidents: {
    last30Days: number;
    last90Days: number;
    lastYear: number;
  };
  mitigationMeasures: string[];
  monitoringStatus: 'active' | 'periodic' | 'inactive';
}

export interface LiveIncident {
  id: string;
  slug: string;
  category: RiskCategory;
  subcategory: string;
  severity: SeverityLevel;
  status: IncidentStatus;
  escalationLevel: EscalationLevel;
  title: string;
  description: string;
  location: {
    district: string;
    specificLocation: string;
    coordinates?: { lat: number; lng: number };
  };
  timeline: {
    reported: string;
    verified: string;
    lastUpdated: string;
    resolved?: string;
  };
  impact: {
    affectedArea?: number;
    affectedPopulation?: number;
    casualties?: number;
    economicLoss?: number;
  };
  response: {
    teamsDeployed: number;
    resourcesAllocated: string[];
    actionsTaken: string[];
    nextSteps: string[];
  };
  alerts: {
    sent: boolean;
    recipients: string[];
    channels: string[];
  };
  relatedEntities: {
    waterBody?: string;
    protectedArea?: string;
    trail?: string;
    species?: string;
  };
}

export interface EscalationRule {
  id: string;
  name: string;
  trigger: {
    type: 'severity' | 'age' | 'multiplicity' | 'cross-category';
    condition: string;
    threshold?: number;
  };
  action: {
    escalateTo: EscalationLevel;
    notify: string[];
    actions: string[];
  };
  active: boolean;
}

export interface ResponsePlaybook {
  id: string;
  incidentType: string;
  version: string;
  lastUpdated: string;
  classification: {
    categories: string[];
    severityLevels: SeverityLevel[];
  };
  initialAssessment: {
    checklist: string[];
    requiredInformation: string[];
    timeLimit: number;
  };
  notificationMatrix: {
    level1: string[];
    level2: string[];
    level3: string[];
    level4: string[];
  };
  responseActions: {
    immediate: string[];
    shortTerm: string[];
    mediumTerm: string[];
    longTerm: string[];
  };
  resources: {
    teams: string[];
    equipment: string[];
    facilities: string[];
  };
  escalationCriteria: string[];
  deEscalationCriteria: string[];
  postIncident: {
    reviewRequired: boolean;
    reportingRequirements: string[];
    lessonsLearned: boolean;
  };
}

// ============================================================================
// MOCK DATA FOR DEMONSTRATION
// ============================================================================

const liveIncidents: LiveIncident[] = [
  {
    id: 'inc-001',
    slug: 'hwc-leopard-srinagar-2024-03-20',
    category: 'biodiversity',
    subcategory: 'human-wildlife-conflict',
    severity: 'high',
    status: 'active',
    escalationLevel: 3,
    title: 'Leopard Sighting in Residential Area',
    description: 'Adult leopard spotted in residential area of Srinagar. Multiple eyewitness reports. Animal appears healthy but stressed.',
    location: {
      district: 'srinagar',
      specificLocation: 'Rajbagh Residential Area',
      coordinates: { lat: 34.0667, lng: 74.8 },
    },
    timeline: {
      reported: '2024-03-20T06:30:00Z',
      verified: '2024-03-20T07:00:00Z',
      lastUpdated: '2024-03-20T09:15:00Z',
    },
    impact: {
      affectedArea: 2,
      affectedPopulation: 5000,
      casualties: 0,
    },
    response: {
      teamsDeployed: 3,
      resourcesAllocated: ['Tranquilizer gun', 'Capture cage', 'Veterinary team'],
      actionsTaken: ['Area cordoned off', 'Residents alerted', 'Schools closed'],
      nextSteps: ['Capture and relocate', 'Public awareness'],
    },
    alerts: {
      sent: true,
      recipients: ['Wildlife Dept', 'Local Police', 'District Admin'],
      channels: ['SMS', 'Email', 'Phone'],
    },
    relatedEntities: {
      species: 'leopard',
      protectedArea: 'dachigam-national-park',
    },
  },
  {
    id: 'inc-002',
    slug: 'algal-bloom-dal-2024-03-19',
    category: 'pollution',
    subcategory: 'algal-bloom',
    severity: 'moderate',
    status: 'monitoring',
    escalationLevel: 2,
    title: 'Algal Bloom Detected in Dal Lake',
    description: 'Moderate algal bloom detected in northern sector of Dal Lake. Water quality parameters being monitored.',
    location: {
      district: 'srinagar',
      specificLocation: 'Dal Lake - Northern Sector',
      coordinates: { lat: 34.1167, lng: 74.8833 },
    },
    timeline: {
      reported: '2024-03-19T10:00:00Z',
      verified: '2024-03-19T11:30:00Z',
      lastUpdated: '2024-03-20T08:00:00Z',
    },
    impact: {
      affectedArea: 5,
      affectedPopulation: 50000,
    },
    response: {
      teamsDeployed: 2,
      resourcesAllocated: ['Water testing kit', 'Skimmer boats'],
      actionsTaken: ['Water sampling', 'Bloom mapping'],
      nextSteps: ['Nutrient analysis', 'Mitigation planning'],
    },
    alerts: {
      sent: true,
      recipients: ['LAWDA', 'Pollution Control Board'],
      channels: ['Email', 'Dashboard'],
    },
    relatedEntities: {
      waterBody: 'dal-lake',
    },
  },
  {
    id: 'inc-003',
    slug: 'fish-kill-anantnag-2024-03-18',
    category: 'biodiversity',
    subcategory: 'fish-kill',
    severity: 'critical',
    status: 'active',
    escalationLevel: 4,
    title: 'Massive Fish Kill in Lidder River',
    description: 'Large-scale fish mortality reported in Lidder River near Anantnag. Estimated 500+ fish affected. Suspected pollution event.',
    location: {
      district: 'anantnag',
      specificLocation: 'Lidder River, Achabal stretch',
      coordinates: { lat: 33.9, lng: 75.15 },
    },
    timeline: {
      reported: '2024-03-18T14:00:00Z',
      verified: '2024-03-18T15:30:00Z',
      lastUpdated: '2024-03-20T10:00:00Z',
    },
    impact: {
      affectedArea: 10,
      affectedPopulation: 10000,
      casualties: 500,
      economicLoss: 500000,
    },
    response: {
      teamsDeployed: 5,
      resourcesAllocated: ['Water testing lab', 'Fisheries team', 'Pollution control team'],
      actionsTaken: ['Water sampling', 'Dead fish collection', 'Source investigation'],
      nextSteps: ['Identify pollution source', 'Restocking plan', 'Compensation assessment'],
    },
    alerts: {
      sent: true,
      recipients: ['Fisheries Dept', 'Pollution Control Board', 'District Admin', 'Health Dept'],
      channels: ['SMS', 'Email', 'Phone', 'Dashboard'],
    },
    relatedEntities: {
      waterBody: 'lidder-river',
    },
  },
  {
    id: 'inc-004',
    slug: 'air-quality-srinagar-2024-03-20',
    category: 'pollution',
    subcategory: 'air-quality',
    severity: 'moderate',
    status: 'active',
    escalationLevel: 2,
    title: 'Poor Air Quality in Srinagar',
    description: 'AQI reached 178 (Moderate category) due to temperature inversion and vehicle emissions.',
    location: {
      district: 'srinagar',
      specificLocation: 'City-wide',
    },
    timeline: {
      reported: '2024-03-20T07:00:00Z',
      verified: '2024-03-20T07:30:00Z',
      lastUpdated: '2024-03-20T09:00:00Z',
    },
    impact: {
      affectedPopulation: 1200000,
    },
    response: {
      teamsDeployed: 1,
      resourcesAllocated: ['Air quality monitors'],
      actionsTaken: ['Public advisory issued', 'School activities restricted'],
      nextSteps: ['Continue monitoring', 'Source apportionment study'],
    },
    alerts: {
      sent: true,
      recipients: ['Health Dept', 'Education Dept', 'Public'],
      channels: ['SMS', 'Social Media', 'Dashboard'],
    },
    relatedEntities: {},
  },
  {
    id: 'inc-005',
    slug: 'landslide-kupwara-2024-03-17',
    category: 'hazard',
    subcategory: 'landslide',
    severity: 'high',
    status: 'monitoring',
    escalationLevel: 3,
    title: 'Landslide Blocks NH-701',
    description: 'Landslide triggered by heavy rainfall has blocked National Highway 701 near Kupwara. Traffic diverted.',
    location: {
      district: 'kupwara',
      specificLocation: 'NH-701, Km 45',
      coordinates: { lat: 34.5, lng: 74.25 },
    },
    timeline: {
      reported: '2024-03-17T18:00:00Z',
      verified: '2024-03-17T18:30:00Z',
      lastUpdated: '2024-03-20T06:00:00Z',
    },
    impact: {
      affectedArea: 0.5,
      affectedPopulation: 25000,
      casualties: 0,
    },
    response: {
      teamsDeployed: 4,
      resourcesAllocated: ['Earth movers', 'JCB machines', 'Traffic police'],
      actionsTaken: ['Road clearing', 'Traffic diversion', 'Slope stabilization'],
      nextSteps: ['Complete clearing', 'Permanent restoration'],
    },
    alerts: {
      sent: true,
      recipients: ['PWD', 'Traffic Police', 'District Admin'],
      channels: ['SMS', 'Email', 'Radio'],
    },
    relatedEntities: {},
  },
];

const hotspotCorridors: HotspotCorridor[] = [
  {
    id: 'hc-001',
    name: 'Dachigam Human-Wildlife Conflict Corridor',
    type: 'wildlife-conflict',
    severity: 'high',
    location: {
      districts: ['srinagar', 'ganderbal'],
      coordinates: [
        { lat: 34.0833, lng: 75.0833 },
        { lat: 34.15, lng: 75.15 },
      ],
    },
    characteristics: {
      length: 15,
      width: 3,
      area: 45,
    },
    riskFactors: [
      'High leopard density',
      'Residential encroachment',
      'Livestock grazing',
      'Tourism pressure',
    ],
    affectedEntities: {
      species: ['leopard', 'hangul'],
      communities: ['Rajbagh', 'Channapora', 'Harwan'],
    },
    incidents: {
      last30Days: 8,
      last90Days: 23,
      lastYear: 89,
    },
    mitigationMeasures: [
      'Predator-proof enclosures',
      'Community awareness programs',
      'Rapid response teams',
      'Compensation scheme',
    ],
    monitoringStatus: 'active',
  },
  {
    id: 'hc-002',
    name: 'Jhelum River Pollution Corridor',
    type: 'pollution',
    severity: 'critical',
    location: {
      districts: ['srinagar', 'budgam'],
      coordinates: [
        { lat: 34.05, lng: 74.75 },
        { lat: 34.15, lng: 74.85 },
      ],
    },
    characteristics: {
      length: 25,
      width: 1,
      area: 25,
    },
    riskFactors: [
      'Sewage discharge',
      'Agricultural runoff',
      'Solid waste dumping',
      'Religious offerings',
    ],
    affectedEntities: {
      species: ['snow-trout', 'common-carp'],
      communities: ['Srinagar urban', 'Budgam'],
      infrastructure: ['Water treatment plants', 'Bridges'],
    },
    incidents: {
      last30Days: 12,
      last90Days: 34,
      lastYear: 156,
    },
    mitigationMeasures: [
      'Sewage treatment upgrade',
      'River cleaning drives',
      'Industrial effluent monitoring',
      'Public awareness',
    ],
    monitoringStatus: 'active',
  },
  {
    id: 'hc-003',
    name: 'Kishtwar Mortality Hotspot',
    type: 'mortality',
    severity: 'high',
    location: {
      districts: ['kishtwar'],
      coordinates: [
        { lat: 33.3, lng: 75.75 },
      ],
    },
    characteristics: {
      length: 20,
      width: 5,
      area: 100,
    },
    riskFactors: [
      'High altitude stress',
      'Limited forage',
      'Predation pressure',
      'Climate change impacts',
    ],
    affectedEntities: {
      species: ['snow-leopard', 'himalayan-brown-bear', 'musk-deer'],
    },
    incidents: {
      last30Days: 3,
      last90Days: 12,
      lastYear: 45,
    },
    mitigationMeasures: [
      'Habitat restoration',
      'Anti-poaching patrols',
      'Camera trap monitoring',
      'Community conservation',
    ],
    monitoringStatus: 'active',
  },
  {
    id: 'hc-004',
    name: 'Srinagar Multi-Hazard Zone',
    type: 'multi-hazard',
    severity: 'critical',
    location: {
      districts: ['srinagar'],
      coordinates: [
        { lat: 34.0833, lng: 74.8 },
      ],
    },
    characteristics: {
      length: 10,
      width: 8,
      area: 80,
    },
    riskFactors: [
      'Flood prone',
      'High pollution',
      'Urban heat island',
      'Seismic zone',
      'High population density',
    ],
    affectedEntities: {
      communities: ['Srinagar urban'],
      infrastructure: ['Hospitals', 'Schools', 'Power stations'],
    },
    incidents: {
      last30Days: 25,
      last90Days: 78,
      lastYear: 312,
    },
    mitigationMeasures: [
      'Flood management',
      'Air quality improvement',
      'Emergency preparedness',
      'Infrastructure hardening',
    ],
    monitoringStatus: 'active',
  },
];

const escalationRules: EscalationRule[] = [
  {
    id: 'rule-001',
    name: 'Critical Severity Auto-Escalation',
    trigger: {
      type: 'severity',
      condition: 'severity == critical',
    },
    action: {
      escalateTo: 4,
      notify: ['District Commissioner', 'Department Head', 'State Control Room'],
      actions: ['Activate emergency response', 'Issue public advisory'],
    },
    active: true,
  },
  {
    id: 'rule-002',
    name: 'High Severity Escalation',
    trigger: {
      type: 'severity',
      condition: 'severity == high',
    },
    action: {
      escalateTo: 3,
      notify: ['District Officer', 'Department Head'],
      actions: ['Deploy response team', 'Notify stakeholders'],
    },
    active: true,
  },
  {
    id: 'rule-003',
    name: 'Stale Incident Escalation (>7 days)',
    trigger: {
      type: 'age',
      condition: 'lastUpdated > 7 days',
      threshold: 7,
    },
    action: {
      escalateTo: 3,
      notify: ['Department Head', 'Quality Assurance'],
      actions: ['Flag for review', 'Request status update'],
    },
    active: true,
  },
  {
    id: 'rule-004',
    name: 'Multiple Incidents Escalation',
    trigger: {
      type: 'multiplicity',
      condition: 'incidents_in_category >= 3',
      threshold: 3,
    },
    action: {
      escalateTo: 3,
      notify: ['Department Head', 'Coordination Committee'],
      actions: ['Coordinate response', 'Resource allocation review'],
    },
    active: true,
  },
  {
    id: 'rule-005',
    name: 'Cross-Category Escalation',
    trigger: {
      type: 'cross-category',
      condition: 'active_categories >= 3',
      threshold: 3,
    },
    action: {
      escalateTo: 4,
      notify: ['Chief Secretary', 'State Disaster Authority'],
      actions: ['Activate state response', 'Inter-departmental coordination'],
    },
    active: true,
  },
];

const responsePlaybooks: ResponsePlaybook[] = [
  {
    id: 'playbook-hwc',
    incidentType: 'human-wildlife-conflict',
    version: '2.1',
    lastUpdated: '2024-01-15',
    classification: {
      categories: ['biodiversity'],
      severityLevels: ['moderate', 'high', 'critical'],
    },
    initialAssessment: {
      checklist: [
        'Species identification',
        'Location verification',
        'Human safety assessment',
        'Animal behavior assessment',
        'Nearby population density',
      ],
      requiredInformation: [
        'Species',
        'Exact location',
        'Number of animals',
        'Behavior observed',
        'Human injuries (if any)',
      ],
      timeLimit: 30,
    },
    notificationMatrix: {
      level1: ['Range Officer'],
      level2: ['Range Officer', 'Divisional Forest Officer'],
      level3: ['Range Officer', 'DFO', 'Wildlife Warden', 'District Admin'],
      level4: ['All Level 3', 'Chief Secretary', 'State Control Room'],
    },
    responseActions: {
      immediate: [
        'Cordon off area',
        'Evacuate if necessary',
        'Deploy rapid response team',
        'Alert nearby hospitals',
      ],
      shortTerm: [
        'Capture/relocate animal',
        'Treat injured (human/animal)',
        'Investigate cause',
        'Compensation assessment',
      ],
      mediumTerm: [
        'Habitat assessment',
        'Community awareness',
        'Preventive measures',
        'Monitoring setup',
      ],
      longTerm: [
        'Habitat restoration',
        'Corridor protection',
        'Long-term monitoring',
        'Policy review',
      ],
    },
    resources: {
      teams: ['Rapid Response Team', 'Veterinary Team', 'Capture Team'],
      equipment: ['Tranquilizer guns', 'Capture cages', 'Radio sets', 'Vehicles'],
      facilities: ['Veterinary hospital', 'Rescue center', 'Holding facility'],
    },
    escalationCriteria: [
      'Human casualty',
      'Multiple animals',
      'Urban area',
      'Repeat offender',
      'Protected species',
    ],
    deEscalationCriteria: [
      'Animal successfully relocated',
      'No further sightings in 48 hours',
      'Community safety assured',
    ],
    postIncident: {
      reviewRequired: true,
      reportingRequirements: ['Incident report', 'Action taken report', 'Compensation report'],
      lessonsLearned: true,
    },
  },
  {
    id: 'playbook-fish-kill',
    incidentType: 'fish-kill',
    version: '1.5',
    lastUpdated: '2024-02-20',
    classification: {
      categories: ['biodiversity', 'pollution'],
      severityLevels: ['moderate', 'high', 'critical'],
    },
    initialAssessment: {
      checklist: [
        'Extent of mortality',
        'Species affected',
        'Water quality parameters',
        'Potential pollution sources',
        'Weather conditions',
      ],
      requiredInformation: [
        'Location',
        'Number of fish affected',
        'Species',
        'Water appearance',
        'Odor',
      ],
      timeLimit: 60,
    },
    notificationMatrix: {
      level1: ['Fisheries Officer'],
      level2: ['Fisheries Officer', 'Pollution Control Board'],
      level3: ['Fisheries Dept', 'PCB', 'District Admin', 'Health Dept'],
      level4: ['All Level 3', 'State Pollution Control Board', 'NGT'],
    },
    responseActions: {
      immediate: [
        'Water sampling',
        'Dead fish collection',
        'Source identification',
        'Public health advisory',
      ],
      shortTerm: [
        'Lab analysis',
        'Pollution source control',
        'Compensation assessment',
        'Restocking plan',
      ],
      mediumTerm: [
        'Ecosystem recovery',
        'Pollution prevention',
        'Monitoring enhancement',
        'Community engagement',
      ],
      longTerm: [
        'Water quality improvement',
        'Habitat restoration',
        'Policy advocacy',
        'Research studies',
      ],
    },
    resources: {
      teams: ['Fisheries Team', 'Water Quality Lab', 'Enforcement Team'],
      equipment: ['Water testing kits', 'Boats', 'Collection equipment'],
      facilities: ['Laboratory', 'Fisheries station', 'Cold storage'],
    },
    escalationCriteria: [
      'Large-scale mortality (>100 fish)',
      'Protected species affected',
      'Drinking water source',
      'Suspected industrial pollution',
    ],
    deEscalationCriteria: [
      'Source controlled',
      'Water quality normal',
      'No further mortality',
    ],
    postIncident: {
      reviewRequired: true,
      reportingRequirements: ['Incident report', 'Lab analysis', 'Action report'],
      lessonsLearned: true,
    },
  },
  {
    id: 'playbook-algal-bloom',
    incidentType: 'algal-bloom',
    version: '1.3',
    lastUpdated: '2024-01-30',
    classification: {
      categories: ['pollution', 'water-systems'],
      severityLevels: ['moderate', 'high', 'critical'],
    },
    initialAssessment: {
      checklist: [
        'Bloom extent',
        'Bloom type (if visible)',
        'Water quality parameters',
        'Weather conditions',
        'Recent nutrient inputs',
      ],
      requiredInformation: [
        'Location',
        'Coverage area',
        'Color',
        'Odor',
        'Water body use',
      ],
      timeLimit: 120,
    },
    notificationMatrix: {
      level1: ['Lake Manager'],
      level2: ['Lake Manager', 'Pollution Control Board'],
      level3: ['LAWDA', 'PCB', 'Health Dept', 'Tourism Dept'],
      level4: ['All Level 3', 'State Env Dept', 'NGT'],
    },
    responseActions: {
      immediate: [
        'Water sampling',
        'Bloom mapping',
        'Public advisory',
        'Recreational restrictions',
      ],
      shortTerm: [
        'Toxin analysis',
        'Nutrient analysis',
        'Source identification',
        'Mitigation planning',
      ],
      mediumTerm: [
        'Bloom control measures',
        'Nutrient reduction',
        'Aeration',
        'Monitoring enhancement',
      ],
      longTerm: [
        'Watershed management',
        'Nutrient loading reduction',
        'Ecosystem restoration',
        'Policy measures',
      ],
    },
    resources: {
      teams: ['Water Quality Team', 'Lake Management', 'Enforcement'],
      equipment: ['Testing kits', 'Boats', 'Skimmers', 'Aerators'],
      facilities: ['Laboratory', 'Lake office', 'Treatment facilities'],
    },
    escalationCriteria: [
      'Toxic bloom confirmed',
      'Drinking water source',
      'Large coverage (>50% of water body)',
      'Human health impacts',
    ],
    deEscalationCriteria: [
      'Bloom dissipated',
      'Toxin levels safe',
      'Water quality normal',
    ],
    postIncident: {
      reviewRequired: true,
      reportingRequirements: ['Incident report', 'Lab analysis', 'Mitigation report'],
      lessonsLearned: true,
    },
  },
];

// ============================================================================
// ACTIVE RISK SNAPSHOT
// ============================================================================

export function getActiveRiskSnapshot(): ActiveRiskSnapshot {
  const now = new Date();
  const dashboard = getBiodiversityRiskDashboard();
  const seasonalData = getSeasonalDashboardData();
  
  // Calculate category scores (simplified for demo)
  const hazardScore = 45;
  const pollutionScore = 58;
  const biodiversityScore = dashboard.overallRiskScore;
  const responseScore = 72; // Inverted - higher is better
  
  const overallRisk = Math.round(
    hazardScore * 0.30 +
    pollutionScore * 0.25 +
    biodiversityScore * 0.25 +
    (100 - responseScore) * 0.20
  );
  
  // Calculate 24-hour changes (simulated)
  const last24Hours = {
    newIncidents: 5,
    resolvedIncidents: 2,
    escalatedIncidents: 3,
    criticalIncidents: 1,
  };
  
  // Districts under watch
  const districtsUnderWatch = 4;
  
  // Alert age distribution
  const alertAgeDistribution = {
    '<1day': 2,
    '1-3days': 2,
    '3-7days': 1,
    '>7days': 0,
  };
  
  return {
    timestamp: now.toISOString(),
    overallRiskScore: overallRisk,
    riskByCategory: {
      hazard: hazardScore,
      pollution: pollutionScore,
      biodiversity: biodiversityScore,
      response: responseScore,
    },
    trend: {
      overall: 'stable',
      hazard: 'stable',
      pollution: 'increasing',
      biodiversity: 'stable',
    },
    last24Hours,
    districtsUnderWatch,
    alertAgeDistribution,
  };
}

// ============================================================================
// DISTRICT WATCH LEADERBOARD
// ============================================================================

export function getDistrictWatchLeaderboard(): DistrictWatchEntry[] {
  const districts = [
    'srinagar', 'anantnag', 'baramulla', 'budgam', 'kupwara',
    'pulwama', 'shopian', 'bandipora', 'ganderbal', 'kulgam',
    'kishtwar', 'doda', 'ramban', 'rajouri', 'poonch', 'kathua',
  ];
  
  return districts.map((district, index) => {
    const waterIntel = getDistrictWaterIntelligence(district);
    const riskScore = 100 - waterIntel.averageHealthScore;
    
    let watchStatus: WatchStatus = 'normal';
    if (riskScore > 80) watchStatus = 'critical';
    else if (riskScore > 60) watchStatus = 'high';
    else if (riskScore > 40) watchStatus = 'elevated';
    
    let responseCapacity: 'adequate' | 'stretched' | 'overwhelmed' = 'adequate';
    if (riskScore > 70) responseCapacity = 'stretched';
    if (riskScore > 90) responseCapacity = 'overwhelmed';
    
    return {
      district,
      rank: index + 1,
      overallRiskScore: riskScore,
      watchStatus,
      weekOverWeekChange: Math.floor(Math.random() * 10) - 5,
      categoryScores: {
        hazard: Math.floor(Math.random() * 60) + 20,
        pollution: Math.floor(Math.random() * 60) + 20,
        biodiversity: Math.floor(Math.random() * 60) + 20,
      },
      activeIncidents: liveIncidents.filter(i => i.location.district === district && i.status === 'active').length,
      criticalIncidents: liveIncidents
        .filter(i => i.location.district === district && i.severity === 'critical')
        .map(i => i.slug),
      hotspotCorridors: hotspotCorridors
        .filter(c => c.location.districts.includes(district))
        .map(c => c.name),
      responseCapacity,
      lastUpdated: new Date().toISOString(),
    };
  }).sort((a, b) => b.overallRiskScore - a.overallRiskScore);
}

export function getDistrictWatchStatus(district: string): DistrictWatchEntry | null {
  const leaderboard = getDistrictWatchLeaderboard();
  return leaderboard.find(d => d.district === district) || null;
}

// ============================================================================
// HOTSPOT CORRIDORS
// ============================================================================

export function getHotspotCorridors(type?: string): HotspotCorridor[] {
  if (type) {
    return hotspotCorridors.filter(c => c.type === type);
  }
  return hotspotCorridors;
}

export function getCorridorIncidents(corridorId: string): LiveIncident[] {
  const corridor = hotspotCorridors.find(c => c.id === corridorId);
  if (!corridor) return [];
  
  return liveIncidents.filter(i =>
    corridor.location.districts.includes(i.location.district)
  );
}

// ============================================================================
// LIVE INCIDENT FEED
// ============================================================================

export interface IncidentFilters {
  category?: RiskCategory;
  severity?: SeverityLevel;
  status?: IncidentStatus;
  district?: string;
  escalationLevel?: EscalationLevel;
}

export function getLiveIncidents(filters?: IncidentFilters): LiveIncident[] {
  let incidents = [...liveIncidents];
  
  if (filters?.category) {
    incidents = incidents.filter(i => i.category === filters.category);
  }
  
  if (filters?.severity) {
    incidents = incidents.filter(i => i.severity === filters.severity);
  }
  
  if (filters?.status) {
    incidents = incidents.filter(i => i.status === filters.status);
  }
  
  if (filters?.district) {
    incidents = incidents.filter(i => i.location.district === filters.district);
  }
  
  if (filters?.escalationLevel) {
    incidents = incidents.filter(i => i.escalationLevel === filters.escalationLevel);
  }
  
  return incidents.sort((a, b) =>
    new Date(b.timeline.lastUpdated).getTime() - new Date(a.timeline.lastUpdated).getTime()
  );
}

export function getIncidentBySlug(slug: string): LiveIncident | null {
  return liveIncidents.find(i => i.slug === slug) || null;
}

export function submitIncident(incident: Partial<LiveIncident>): string {
  const newIncident: LiveIncident = {
    ...incident as LiveIncident,
    id: `inc-${Date.now()}`,
    slug: `incident-${Date.now()}`,
    escalationLevel: incident.severity === 'critical' ? 4 :
                     incident.severity === 'high' ? 3 :
                     incident.severity === 'moderate' ? 2 : 1,
    status: 'active',
    timeline: {
      reported: new Date().toISOString(),
      verified: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
    },
    alerts: {
      sent: false,
      recipients: [],
      channels: [],
    },
    response: {
      teamsDeployed: 0,
      resourcesAllocated: [],
      actionsTaken: [],
      nextSteps: [],
    },
  };
  
  liveIncidents.unshift(newIncident);
  return newIncident.id;
}

export function updateIncidentStatus(slug: string, status: IncidentStatus): void {
  const incident = liveIncidents.find(i => i.slug === slug);
  if (incident) {
    incident.status = status;
    incident.timeline.lastUpdated = new Date().toISOString();
    if (status === 'resolved') {
      incident.timeline.resolved = new Date().toISOString();
    }
  }
}

export function escalateIncident(slug: string, level: EscalationLevel): void {
  const incident = liveIncidents.find(i => i.slug === slug);
  if (incident) {
    incident.escalationLevel = level;
    incident.timeline.lastUpdated = new Date().toISOString();
  }
}

// ============================================================================
// ESCALATION LOGIC
// ============================================================================

export function getEscalationRules(): EscalationRule[] {
  return escalationRules;
}

export function evaluateEscalation(incident: LiveIncident): EscalationRule[] {
  const applicableRules: EscalationRule[] = [];
  
  escalationRules.forEach(rule => {
    if (!rule.active) return;
    
    const trigger = rule.trigger;
    
    if (trigger.type === 'severity' && trigger.condition.includes(incident.severity)) {
      applicableRules.push(rule);
    }
    
    if (trigger.type === 'age') {
      const ageInDays = (Date.now() - new Date(incident.timeline.lastUpdated).getTime()) / (1000 * 60 * 60 * 24);
      if (ageInDays > (trigger.threshold || 7)) {
        applicableRules.push(rule);
      }
    }
  });
  
  return applicableRules;
}

// ============================================================================
// RESPONSE PLAYBOOKS
// ============================================================================

export function getResponsePlaybook(incidentType: string): ResponsePlaybook | null {
  return responsePlaybooks.find(p => p.incidentType === incidentType) || null;
}

export function getAllPlaybooks(): ResponsePlaybook[] {
  return responsePlaybooks;
}

// ============================================================================
// EXPORT ALL
// ============================================================================

export { getBiodiversityRiskDashboard, getThreatSeverityAnalysis } from '../data/biodiversity-access';
