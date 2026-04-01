/**
 * Community Alert Network - TypeScript Type Definitions
 * 
 * A location-aware, community-verified field intelligence system
 * for real-time environmental, hazard, mobility, and ecological alerts
 */

// ============================================================================
// Core Enums
// ============================================================================

export enum AlertCategory {
  HAZARD = 'hazard',
  ENVIRONMENTAL = 'environmental',
  BIODIVERSITY_WILDLIFE = 'biodiversity_wildlife',
  MOBILITY_ACCESS = 'mobility_access',
  PUBLIC_SAFETY = 'public_safety',
}

export enum AlertSubtypeHazard {
  LANDSLIDE = 'landslide',
  ROCKFALL = 'rockfall',
  AVALANCHE_RISK = 'avalanche_risk',
  SNOW_BLOCKAGE = 'snow_blockage',
  BLACK_ICE = 'black_ice',
  FLOODWATER_ROAD = 'floodwater_road',
  RIVER_OVERFLOW = 'river_overflow',
  ROAD_COLLAPSE = 'road_collapse',
  BRIDGE_DAMAGE = 'bridge_damage',
  WILDFIRE_SMOKE = 'wildfire_smoke',
  FALLEN_TREES = 'fallen_trees',
  LOW_VISIBILITY = 'low_visibility',
}

export enum AlertSubtypeEnvironmental {
  ILLEGAL_DUMPING = 'illegal_dumping',
  SEWAGE_DISCHARGE = 'sewage_discharge',
  CHEMICAL_DISCHARGE = 'chemical_discharge',
  FISH_KILL = 'fish_kill',
  BIRD_MORTALITY = 'bird_mortality',
  ALGAL_BLOOM = 'algal_bloom',
  WATER_CONTAMINATION = 'water_contamination',
  UNUSUAL_FOAM = 'unusual_foam',
  WATER_DISCOLORATION = 'water_discoloration',
  FOREST_DEGRADATION = 'forest_degradation',
  FIRE_OUTBREAK = 'fire_outbreak',
  WETLAND_ENCROACHMENT = 'wetland_encroachment',
}

export enum AlertSubtypeBiodiversity {
  WILDLIFE_CROSSING = 'wildlife_crossing',
  INJURED_ANIMAL = 'injured_animal',
  TRAPPED_ANIMAL = 'trapped_animal',
  HUMAN_WILDLIFE_CONFLICT = 'human_wildlife_conflict',
  BIRD_CONGREGATION = 'bird_congregation',
  NESTING_DISTURBANCE = 'nesting_disturbance',
  POACHING_SUSPICION = 'poaching_suspicion',
  UNUSUAL_MIGRATION = 'unusual_migration',
  MASS_MORTALITY = 'mass_mortality',
  INVASIVE_SPECIES = 'invasive_species',
}

export enum AlertSubtypeMobility {
  ROUTE_BLOCKED = 'route_blocked',
  TRAIL_CLOSURE = 'trail_closure',
  TOURIST_SITE_RESTRICTED = 'tourist_site_restricted',
  PERMIT_CHECK_ACTIVE = 'permit_check_active',
  CHECKPOINT_ACTIVE = 'checkpoint_active',
  HEAVY_CONGESTION = 'heavy_congestion',
  PARKING_SATURATION = 'parking_saturation',
  ACCESS_TIMING_RESTRICTION = 'access_timing_restriction',
  UNSAFE_ROUTE = 'unsafe_route',
  DAMAGED_FOOTPATH = 'damaged_footpath',
  BRIDGE_UNSAFE = 'bridge_unsafe',
}

export enum AlertSubtypePublicSafety {
  CROWD_SURGE = 'crowd_surge',
  LOCAL_EMERGENCY = 'local_emergency',
  RESCUE_OPERATION = 'rescue_operation',
  UNSTABLE_STRUCTURE = 'unstable_structure',
  PUBLIC_HAZARD = 'public_hazard',
  EXPOSED_WIRES = 'exposed_wires',
  CONTAMINATION_ZONE = 'contamination_zone',
  FIRE_SPREAD_RISK = 'fire_spread_risk',
  UNSAFE_WATER_CROSSING = 'unsafe_water_crossing',
}

export enum AlertSeverity {
  LOW = 'low',
  MODERATE = 'moderate',
  SERIOUS = 'serious',
  CRITICAL = 'critical',
}

export enum AlertStatus {
  ACTIVE_NOW = 'active_now',
  PARTIALLY_ACTIVE = 'partially_active',
  UNCERTAIN = 'uncertain',
  ALREADY_CLEARING = 'already_clearing',
}

export enum AlertPublicStatus {
  REPORTED = 'reported',
  NEEDS_VERIFICATION = 'needs_verification',
  COMMUNITY_CONFIRMED = 'community_confirmed',
  ACTIVELY_CHANGING = 'actively_changing',
  CONFLICTED = 'conflicted',
  REDUCED = 'reduced',
  CLEARED = 'cleared',
  RESOLVED = 'resolved',
  ARCHIVED = 'archived',
}

export enum AlertConfidenceState {
  UNVERIFIED = 'unverified',
  EARLY_COMMUNITY_SIGNAL = 'early_community_signal',
  COMMUNITY_CONFIRMED = 'community_confirmed',
  STRONGLY_CONFIRMED = 'strongly_confirmed',
  INSTITUTIONALLY_REVIEWED = 'institutionally_reviewed',
  CONFLICTED = 'conflicted',
  STALE = 'stale',
  RESOLVED = 'resolved',
}

export enum VisibilityScope {
  PUBLIC = 'public',
  NEARBY_USERS_ONLY = 'nearby_users_only',
  MODERATORS_ONLY = 'moderators_only',
  INSTITUTIONAL_REVIEW = 'institutional_review',
}

export enum DirectionalRelevance {
  BOTH_DIRECTIONS = 'both_directions',
  NORTHBOUND = 'northbound',
  SOUTHBOUND = 'southbound',
  EASTBOUND = 'eastbound',
  WESTBOUND = 'westbound',
  UPSTREAM = 'upstream',
  DOWNSTREAM = 'downstream',
  DOWNHILL = 'downhill',
  Uphill = 'uphill',
  ACCESS_ROAD_ONLY = 'access_road_only',
  ENTRY_POINT_ONLY = 'entry_point_only',
}

export enum EvidenceType {
  PHOTO = 'photo',
  VIDEO = 'video',
  AUDIO = 'audio',
  NOTE = 'note',
  NONE = 'none',
}

export enum ReporterType {
  CITIZEN = 'citizen',
  TRAVELER = 'traveler',
  DRIVER = 'driver',
  VOLUNTEER = 'volunteer',
  RANGER = 'ranger',
  FIELD_RESEARCHER = 'field_researcher',
  LOCAL_RESIDENT = 'local_resident',
  PARTNER_INSTITUTION = 'partner_institution',
}

export enum ContributorTier {
  NEW_CONTRIBUTOR = 'new_contributor',
  ACTIVE_CONTRIBUTOR = 'active_contributor',
  RELIABLE_CONTRIBUTOR = 'reliable_contributor',
  TRUSTED_LOCAL_OBSERVER = 'trusted_local_observer',
  VERIFIED_VOLUNTEER = 'verified_volunteer',
  PARTNER_INSTITUTIONAL_OBSERVER = 'partner_institutional_observer',
}

export enum ConfirmationActionType {
  STILL_ACTIVE = 'still_active',
  WORSENED = 'worsened',
  REDUCED = 'reduced',
  CLEARED = 'cleared',
  MOVED_SLIGHTLY = 'moved_slightly',
  INCORRECT_REPORT = 'incorrect_report',
  ADD_UPDATE = 'add_update',
}

export enum AlertLifecycleStage {
  SUBMITTED = 'submitted',
  PUBLISHED = 'published',
  RECONFIRMED = 'reconfirmed',
  INTENSIFIED = 'intensified',
  RESOLVED = 'resolved',
  ARCHIVED = 'archived',
}

export enum AlertExpiryCategory {
  FAST_MOVING = 'fast_moving', // 30min - 2hr
  MEDIUM = 'medium', // 6 - 24hr
  SLOW_ECOLOGICAL = 'slow_ecological', // 24 - 72hr
}

// ============================================================================
// Core Interfaces
// ============================================================================

/**
 * Geographic location for an alert
 */
export interface AlertLocation {
  type: 'point' | 'route_segment' | 'area';
  coordinates: {
    latitude: number;
    longitude: number;
  };
  address?: {
    village?: string;
    locality?: string;
    district: string;
    landmark?: string;
  };
  routeInfo?: {
    routeName?: string;
    startMarker?: string;
    endMarker?: string;
    distanceKm?: number;
  };
}

/**
 * Evidence attached to an alert
 */
export interface AlertEvidence {
  id: string;
  alertId: string;
  mediaType: EvidenceType;
  fileUrl: string;
  thumbnailUrl?: string;
  caption?: string;
  capturedAt: Date;
  uploadedAt: Date;
  contributorId: string;
  verified: boolean;
}

/**
 * User confirmation/update on an alert
 */
export interface AlertConfirmation {
  id: string;
  alertId: string;
  userId: string;
  actionType: ConfirmationActionType;
  note?: string;
  evidenceAttached: boolean;
  evidence?: AlertEvidence;
  severityAdjustment?: AlertSeverity;
  locationAdjustment?: AlertLocation;
  createdAt: Date;
  trustWeight: number; // 0.0 - 1.0 based on contributor tier
}

/**
 * Contributor profile for trust scoring
 */
export interface ContributorProfile {
  id: string;
  roleType: ReporterType;
  tier: ContributorTier;
  trustScore: number; // 0.0 - 100.0
  districtAffinity: Record<string, number>; // district -> score
  verificationStatus: 'unverified' | 'email_verified' | 'phone_verified' | 'identity_verified';
  institutionalAffiliation?: string;
  reportHistory: {
    totalReports: number;
    confirmedReports: number;
    contradictedReports: number;
    falseReports: number;
  };
  joinedAt: Date;
  lastActiveAt: Date;
}

/**
 * User subscription for alert notifications
 */
export interface AlertSubscription {
  id: string;
  userId: string;
  district: string;
  categories: AlertCategory[];
  radiusKm: number;
  notificationPreference: {
    push: boolean;
    email: boolean;
    sms: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Main Alert Entity
 */
export interface Alert {
  // Core Identity
  id: string;
  category: AlertCategory;
  subtype: string;
  title: string;
  description: string;
  
  // Status & State
  severity: AlertSeverity;
  status: AlertStatus;
  publicStatus: AlertPublicStatus;
  confidenceState: AlertConfidenceState;
  lifecycleStage: AlertLifecycleStage;
  
  // Location
  location: AlertLocation;
  district: string;
  
  // Timing
  timeObserved: Date;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date;
  
  // Scope & Direction
  visibilityScope: VisibilityScope;
  directionalRelevance: DirectionalRelevance;
  
  // Evidence
  primaryEvidence?: AlertEvidence;
  evidenceCount: number;
  
  // Safety Context
  safetyContext: {
    passableWithCaution: boolean;
    blocked: boolean;
    dangerousToPass: boolean;
    avoidArea: boolean;
    pedestrianOnly: boolean;
    vehicleMovementPossible: boolean;
  };
  
  // Reporter Info
  reporter: {
    id: string;
    type: ReporterType;
    tier: ContributorTier;
    anonymized: boolean;
  };
  
  // Confirmation Tracking
  confirmations: {
    stillActive: number;
    worsened: number;
    reduced: number;
    cleared: number;
    moved: number;
    incorrect: number;
    updates: number;
  };
  
  // Confidence Scoring
  confidenceScore: number; // 0.0 - 100.0
  lastConfirmedAt?: Date;
  
  // Expiry
  expiryCategory: AlertExpiryCategory;
  isExpired: boolean;
  
  // Moderation
  requiresModeration: boolean;
  moderationStatus?: 'pending' | 'under_review' | 'approved' | 'flagged';
  escalatedToInstitutions: boolean;
  
  // Duplicate Handling
  duplicateOf?: string;
  mergedAlertIds?: string[];
  
  // Metadata
  tags: string[];
  externalReferences?: string[];
}

/**
 * Alert with computed fields for UI display
 */
export interface AlertDisplay extends Alert {
  // Computed Display Fields
  timeAgo: string;
  lastConfirmedAgo?: string;
  distanceFromUserKm?: number;
  confidenceLabel: string;
  confidenceColor: string;
  severityLabel: string;
  severityColor: string;
  categoryIcon: string;
  categoryColor: string;
  expiryWarning?: string;
  hasNewUpdates: boolean;
}

/**
 * Alert card props for UI components
 */
export interface AlertCardProps {
  alert: AlertDisplay;
  onConfirm: (alertId: string, action: ConfirmationActionType) => void;
  onViewDetails: (alertId: string) => void;
  onReportDuplicate: (alertId: string) => void;
  isNearby?: boolean;
  compact?: boolean;
}

/**
 * Reconfirmation action props
 */
export interface ReconfirmationAction {
  type: ConfirmationActionType;
  label: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  requiresNote: boolean;
  requiresEvidence: boolean;
}

/**
 * Alert filter state
 */
export interface AlertFilters {
  categories: AlertCategory[];
  severities: AlertSeverity[];
  confidenceStates: AlertConfidenceState[];
  publicStatuses: AlertPublicStatus[];
  districts: string[];
  timeRange: 'last_hour' | 'last_6_hours' | 'last_24_hours' | 'last_72_hours' | 'all';
  hasEvidence: boolean | null;
  requiresVerification: boolean | null;
}

/**
 * Alert statistics for dashboards
 */
export interface AlertStats {
  total: number;
  byCategory: Record<AlertCategory, number>;
  bySeverity: Record<AlertSeverity, number>;
  byConfidence: Record<AlertConfidenceState, number>;
  byDistrict: Record<string, number>;
  byStatus: Record<AlertPublicStatus, number>;
  confirmed24h: number;
  resolved24h: number;
  avgConfidenceScore: number;
  topContributors: Array<{
    userId: string;
    reportsCount: number;
    confirmationRate: number;
  }>;
}

/**
 * Map marker data for alerts
 */
export interface AlertMapMarker {
  alertId: string;
  coordinates: [number, number];
  category: AlertCategory;
  subtype: string;
  severity: AlertSeverity;
  confidenceState: AlertConfidenceState;
  publicStatus: AlertPublicStatus;
  evidenceCount: number;
  lastUpdated: Date;
  icon: string;
  color: string;
  popupContent: {
    title: string;
    summary: string;
    status: string;
    timeAgo: string;
  };
}

// ============================================================================
// Type Guards
// ============================================================================

export function isHazardAlert(alert: Alert): alert is Alert & { subtype: AlertSubtypeHazard } {
  return alert.category === AlertCategory.HAZARD;
}

export function isEnvironmentalAlert(alert: Alert): alert is Alert & { subtype: AlertSubtypeEnvironmental } {
  return alert.category === AlertCategory.ENVIRONMENTAL;
}

export function isBiodiversityAlert(alert: Alert): alert is Alert & { subtype: AlertSubtypeBiodiversity } {
  return alert.category === AlertCategory.BIODIVERSITY_WILDLIFE;
}

export function isMobilityAlert(alert: Alert): alert is Alert & { subtype: AlertSubtypeMobility } {
  return alert.category === AlertCategory.MOBILITY_ACCESS;
}

export function isPublicSafetyAlert(alert: Alert): alert is Alert & { subtype: AlertSubtypePublicSafety } {
  return alert.category === AlertCategory.PUBLIC_SAFETY;
}

// ============================================================================
// Utility Types
// ============================================================================

export type AlertCategoryData = {
  [K in AlertCategory]: {
    label: string;
    description: string;
    icon: string;
    color: string;
    subtypes: Record<string, string>;
  };
};

export type ConfidenceTransition = {
  from: AlertConfidenceState;
  to: AlertConfidenceState;
  trigger: ConfirmationActionType;
  minConfirmations?: number;
};

export type AlertExpiryConfig = {
  [K in AlertExpiryCategory]: {
    minMinutes: number;
    maxMinutes: number;
    refreshThresholdMinutes: number;
  };
};

// ============================================================================
// Reconfirmation Action Configurations
// ============================================================================

export const RECONFIRMATION_ACTIONS: Record<ConfirmationActionType, ReconfirmationAction> = {
  [ConfirmationActionType.STILL_ACTIVE]: {
    type: ConfirmationActionType.STILL_ACTIVE,
    label: 'Still Active',
    description: 'The situation remains unchanged',
    icon: 'CircleCheck',
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    requiresNote: false,
    requiresEvidence: false,
  },
  [ConfirmationActionType.WORSENED]: {
    type: ConfirmationActionType.WORSENED,
    label: 'Worsened',
    description: 'The situation has intensified',
    icon: 'TrendingUp',
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    requiresNote: false,
    requiresEvidence: false,
  },
  [ConfirmationActionType.REDUCED]: {
    type: ConfirmationActionType.REDUCED,
    label: 'Reduced',
    description: 'The situation is improving',
    icon: 'TrendingDown',
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    requiresNote: false,
    requiresEvidence: false,
  },
  [ConfirmationActionType.CLEARED]: {
    type: ConfirmationActionType.CLEARED,
    label: 'Cleared',
    description: 'The issue has been resolved',
    icon: 'Check',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/30',
    requiresNote: false,
    requiresEvidence: false,
  },
  [ConfirmationActionType.MOVED_SLIGHTLY]: {
    type: ConfirmationActionType.MOVED_SLIGHTLY,
    label: 'Moved',
    description: 'Location has shifted slightly',
    icon: 'Move',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    requiresNote: true,
    requiresEvidence: false,
  },
  [ConfirmationActionType.INCORRECT_REPORT]: {
    type: ConfirmationActionType.INCORRECT_REPORT,
    label: 'Incorrect',
    description: 'This report is inaccurate',
    icon: 'CircleX',
    color: 'text-slate-600 dark:text-slate-400',
    bgColor: 'bg-slate-500/10',
    borderColor: 'border-slate-500/30',
    requiresNote: true,
    requiresEvidence: false,
  },
  [ConfirmationActionType.ADD_UPDATE]: {
    type: ConfirmationActionType.ADD_UPDATE,
    label: 'Add Update',
    description: 'Share new information or evidence',
    icon: 'Plus',
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/30',
    requiresNote: false,
    requiresEvidence: true,
  },
};
