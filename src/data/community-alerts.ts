/**
 * Community Alert Network - Static Data Layer
 * 
 * Sample alerts across all categories for the Kashmir EcoWatch platform
 */

import {
  Alert,
  AlertCategory,
  AlertSubtypeHazard,
  AlertSubtypeEnvironmental,
  AlertSubtypeBiodiversity,
  AlertSubtypeMobility,
  AlertSubtypePublicSafety,
  AlertSeverity,
  AlertStatus,
  AlertPublicStatus,
  AlertConfidenceState,
  AlertLifecycleStage,
  VisibilityScope,
  DirectionalRelevance,
  EvidenceType,
  ReporterType,
  ContributorTier,
  AlertExpiryCategory,
  AlertLocation,
  AlertEvidence,
} from '@/types/alerts';

// ============================================================================
// Helper Functions
// ============================================================================

const now = new Date();
const minutesAgo = (mins: number) => new Date(now.getTime() - mins * 60 * 1000);
const hoursAgo = (hours: number) => new Date(now.getTime() - hours * 60 * 60 * 1000);

function createLocation(
  lat: number,
  lng: number,
  district: string,
  village?: string,
  landmark?: string
): AlertLocation {
  return {
    type: 'point',
    coordinates: { latitude: lat, longitude: lng },
    address: {
      village,
      district,
      landmark,
    },
  };
}

// ============================================================================
// Sample Evidence
// ============================================================================

const sampleEvidence: AlertEvidence[] = [
  {
    id: 'ev-001',
    alertId: 'alert-001',
    mediaType: EvidenceType.PHOTO,
    fileUrl: '/alerts/landslide-sonamarg-001.jpg',
    thumbnailUrl: '/alerts/thumbs/landslide-sonamarg-001.jpg',
    caption: 'Debris covering approximately half the road width',
    capturedAt: minutesAgo(20),
    uploadedAt: minutesAgo(18),
    contributorId: 'user-001',
    verified: false,
  },
  {
    id: 'ev-002',
    alertId: 'alert-002',
    mediaType: EvidenceType.VIDEO,
    fileUrl: '/alerts/wildlife-dachigam-001.mp4',
    thumbnailUrl: '/alerts/thumbs/wildlife-dachigam-001.jpg',
    caption: 'Herd crossing the trail, approximately 8-10 animals',
    capturedAt: minutesAgo(45),
    uploadedAt: minutesAgo(42),
    contributorId: 'user-002',
    verified: false,
  },
  {
    id: 'ev-003',
    alertId: 'alert-003',
    mediaType: EvidenceType.PHOTO,
    fileUrl: '/alerts/sewage-dal-001.jpg',
    thumbnailUrl: '/alerts/thumbs/sewage-dal-001.jpg',
    caption: 'Dark discharge visible at inlet point',
    capturedAt: hoursAgo(2),
    uploadedAt: hoursAgo(1.5),
    contributorId: 'user-003',
    verified: false,
  },
  {
    id: 'ev-004',
    alertId: 'alert-005',
    mediaType: EvidenceType.PHOTO,
    fileUrl: '/alerts/floodwater-jhelum-001.jpg',
    thumbnailUrl: '/alerts/thumbs/floodwater-jhelum-001.jpg',
    caption: 'Water level rising near embankment',
    capturedAt: minutesAgo(35),
    uploadedAt: minutesAgo(30),
    contributorId: 'user-005',
    verified: false,
  },
];

// ============================================================================
// Sample Alerts - All Categories
// ============================================================================

export const communityAlerts: Alert[] = [
  // --------------------------------------------------------------------------
  // HAZARD ALERTS
  // --------------------------------------------------------------------------
  {
    id: 'alert-001',
    category: AlertCategory.HAZARD,
    subtype: AlertSubtypeHazard.LANDSLIDE,
    title: 'Landslide debris reported near Sonamarg Road',
    description: 'Debris covering approximately half the road width. Small vehicles passing slowly. Heavy machinery requested for clearance.',
    severity: AlertSeverity.SERIOUS,
    status: AlertStatus.ACTIVE_NOW,
    publicStatus: AlertPublicStatus.COMMUNITY_CONFIRMED,
    confidenceState: AlertConfidenceState.COMMUNITY_CONFIRMED,
    lifecycleStage: AlertLifecycleStage.RECONFIRMED,
    location: createLocation(34.2986, 75.3242, 'Ganderbal', 'Gund', 'Near Sonamarg Road'),
    district: 'Ganderbal',
    timeObserved: minutesAgo(20),
    createdAt: minutesAgo(18),
    updatedAt: minutesAgo(5),
    expiresAt: hoursAgo(-6), // 6 hours from now
    visibilityScope: VisibilityScope.PUBLIC,
    directionalRelevance: DirectionalRelevance.BOTH_DIRECTIONS,
    primaryEvidence: sampleEvidence[0],
    evidenceCount: 3,
    safetyContext: {
      passableWithCaution: true,
      blocked: false,
      dangerousToPass: false,
      avoidArea: false,
      pedestrianOnly: false,
      vehicleMovementPossible: true,
    },
    reporter: {
      id: 'user-001',
      type: ReporterType.LOCAL_RESIDENT,
      tier: ContributorTier.RELIABLE_CONTRIBUTOR,
      anonymized: false,
    },
    confirmations: {
      stillActive: 4,
      worsened: 1,
      reduced: 0,
      cleared: 0,
      moved: 0,
      incorrect: 0,
      updates: 2,
    },
    confidenceScore: 72,
    lastConfirmedAt: minutesAgo(5),
    expiryCategory: AlertExpiryCategory.MEDIUM,
    isExpired: false,
    requiresModeration: false,
    escalatedToInstitutions: false,
    tags: ['road', 'landslide', 'sonamarg', 'ganderbal'],
  },
  {
    id: 'alert-002',
    category: AlertCategory.HAZARD,
    subtype: AlertSubtypeHazard.ROCKFALL,
    title: 'Rockfall activity near Zoji La pass',
    description: 'Multiple rockfall incidents reported in the last hour. Caution advised for vehicles moving through the section.',
    severity: AlertSeverity.MODERATE,
    status: AlertStatus.ACTIVE_NOW,
    publicStatus: AlertPublicStatus.NEEDS_VERIFICATION,
    confidenceState: AlertConfidenceState.EARLY_COMMUNITY_SIGNAL,
    lifecycleStage: AlertLifecycleStage.PUBLISHED,
    location: createLocation(34.3833, 75.2167, 'Ganderbal', 'Zoji La', 'Near pass summit'),
    district: 'Ganderbal',
    timeObserved: minutesAgo(55),
    createdAt: minutesAgo(50),
    updatedAt: minutesAgo(45),
    expiresAt: hoursAgo(-2), // 2 hours from now
    visibilityScope: VisibilityScope.PUBLIC,
    directionalRelevance: DirectionalRelevance.BOTH_DIRECTIONS,
    evidenceCount: 1,
    safetyContext: {
      passableWithCaution: true,
      blocked: false,
      dangerousToPass: true,
      avoidArea: false,
      pedestrianOnly: false,
      vehicleMovementPossible: true,
    },
    reporter: {
      id: 'user-006',
      type: ReporterType.DRIVER,
      tier: ContributorTier.ACTIVE_CONTRIBUTOR,
      anonymized: true,
    },
    confirmations: {
      stillActive: 2,
      worsened: 0,
      reduced: 0,
      cleared: 0,
      moved: 0,
      incorrect: 0,
      updates: 0,
    },
    confidenceScore: 45,
    lastConfirmedAt: minutesAgo(30),
    expiryCategory: AlertExpiryCategory.FAST_MOVING,
    isExpired: false,
    requiresModeration: false,
    escalatedToInstitutions: false,
    tags: ['rockfall', 'zoji-la', 'ganderbal', 'caution'],
  },
  {
    id: 'alert-003',
    category: AlertCategory.HAZARD,
    subtype: AlertSubtypeHazard.BLACK_ICE,
    title: 'Black ice formation on Gulmarg Road',
    description: 'Black ice patches observed on shaded sections of the road. Early morning travelers advised extreme caution.',
    severity: AlertSeverity.MODERATE,
    status: AlertStatus.ACTIVE_NOW,
    publicStatus: AlertPublicStatus.COMMUNITY_CONFIRMED,
    confidenceState: AlertConfidenceState.STRONGLY_CONFIRMED,
    lifecycleStage: AlertLifecycleStage.RECONFIRMED,
    location: createLocation(34.0488, 74.3803, 'Baramulla', 'Tangmarg', 'Gulmarg Road'),
    district: 'Baramulla',
    timeObserved: hoursAgo(1),
    createdAt: hoursAgo(0.75),
    updatedAt: minutesAgo(15),
    expiresAt: hoursAgo(-4), // 4 hours from now
    visibilityScope: VisibilityScope.PUBLIC,
    directionalRelevance: DirectionalRelevance.BOTH_DIRECTIONS,
    evidenceCount: 2,
    safetyContext: {
      passableWithCaution: true,
      blocked: false,
      dangerousToPass: true,
      avoidArea: false,
      pedestrianOnly: false,
      vehicleMovementPossible: true,
    },
    reporter: {
      id: 'user-007',
      type: ReporterType.DRIVER,
      tier: ContributorTier.TRUSTED_LOCAL_OBSERVER,
      anonymized: false,
    },
    confirmations: {
      stillActive: 6,
      worsened: 0,
      reduced: 1,
      cleared: 0,
      moved: 0,
      incorrect: 0,
      updates: 3,
    },
    confidenceScore: 85,
    lastConfirmedAt: minutesAgo(15),
    expiryCategory: AlertExpiryCategory.FAST_MOVING,
    isExpired: false,
    requiresModeration: false,
    escalatedToInstitutions: false,
    tags: ['black-ice', 'gulmarg', 'baramulla', 'winter-hazard'],
  },
  {
    id: 'alert-004',
    category: AlertCategory.HAZARD,
    subtype: AlertSubtypeHazard.FALLEN_TREES,
    title: 'Fallen tree blocking trail near Pahalgam',
    description: 'Large poplar tree fallen across the main trail. Pedestrian passage possible with difficulty. Vehicle access blocked.',
    severity: AlertSeverity.LOW,
    status: AlertStatus.PARTIALLY_ACTIVE,
    publicStatus: AlertPublicStatus.NEEDS_VERIFICATION,
    confidenceState: AlertConfidenceState.UNVERIFIED,
    lifecycleStage: AlertLifecycleStage.SUBMITTED,
    location: createLocation(34.0167, 75.3333, 'Anantnag', 'Pahalgam', 'Lidder Valley Trail'),
    district: 'Anantnag',
    timeObserved: minutesAgo(90),
    createdAt: minutesAgo(85),
    updatedAt: minutesAgo(85),
    expiresAt: hoursAgo(-12), // 12 hours from now
    visibilityScope: VisibilityScope.PUBLIC,
    directionalRelevance: DirectionalRelevance.BOTH_DIRECTIONS,
    evidenceCount: 1,
    safetyContext: {
      passableWithCaution: true,
      blocked: false,
      dangerousToPass: false,
      avoidArea: false,
      pedestrianOnly: true,
      vehicleMovementPossible: false,
    },
    reporter: {
      id: 'user-008',
      type: ReporterType.TRAVELER,
      tier: ContributorTier.NEW_CONTRIBUTOR,
      anonymized: true,
    },
    confirmations: {
      stillActive: 0,
      worsened: 0,
      reduced: 0,
      cleared: 0,
      moved: 0,
      incorrect: 0,
      updates: 0,
    },
    confidenceScore: 25,
    expiryCategory: AlertExpiryCategory.MEDIUM,
    isExpired: false,
    requiresModeration: false,
    escalatedToInstitutions: false,
    tags: ['fallen-tree', 'pahalgam', 'anantnag', 'trail'],
  },

  // --------------------------------------------------------------------------
  // ENVIRONMENTAL ALERTS
  // --------------------------------------------------------------------------
  {
    id: 'alert-005',
    category: AlertCategory.ENVIRONMENTAL,
    subtype: AlertSubtypeEnvironmental.SEWAGE_DISCHARGE,
    title: 'Possible sewage discharge in Dal Lake inlet',
    description: 'Dark discharge visible at inlet point near Hazratbal. Strong odor present. Water discoloration spreading.',
    severity: AlertSeverity.SERIOUS,
    status: AlertStatus.ACTIVE_NOW,
    publicStatus: AlertPublicStatus.COMMUNITY_CONFIRMED,
    confidenceState: AlertConfidenceState.COMMUNITY_CONFIRMED,
    lifecycleStage: AlertLifecycleStage.RECONFIRMED,
    location: createLocation(34.1125, 74.8322, 'Srinagar', 'Hazratbal', 'Dal Lake Inlet'),
    district: 'Srinagar',
    timeObserved: hoursAgo(2),
    createdAt: hoursAgo(1.5),
    updatedAt: minutesAgo(25),
    expiresAt: hoursAgo(-18), // 18 hours from now
    visibilityScope: VisibilityScope.PUBLIC,
    directionalRelevance: DirectionalRelevance.BOTH_DIRECTIONS,
    primaryEvidence: sampleEvidence[2],
    evidenceCount: 4,
    safetyContext: {
      passableWithCaution: false,
      blocked: false,
      dangerousToPass: false,
      avoidArea: true,
      pedestrianOnly: false,
      vehicleMovementPossible: false,
    },
    reporter: {
      id: 'user-003',
      type: ReporterType.LOCAL_RESIDENT,
      tier: ContributorTier.RELIABLE_CONTRIBUTOR,
      anonymized: false,
    },
    confirmations: {
      stillActive: 5,
      worsened: 2,
      reduced: 0,
      cleared: 0,
      moved: 1,
      incorrect: 0,
      updates: 3,
    },
    confidenceScore: 78,
    lastConfirmedAt: minutesAgo(25),
    expiryCategory: AlertExpiryCategory.MEDIUM,
    isExpired: false,
    requiresModeration: true,
    moderationStatus: 'under_review',
    escalatedToInstitutions: true,
    tags: ['sewage', 'dal-lake', 'srinagar', 'water-contamination'],
  },
  {
    id: 'alert-006',
    category: AlertCategory.ENVIRONMENTAL,
    subtype: AlertSubtypeEnvironmental.FISH_KILL,
    title: 'Fish mortality observed in Jhelum tributary',
    description: 'Multiple dead fish spotted along 200m stretch of riverbank. Species appear to be native carp. Investigation needed.',
    severity: AlertSeverity.SERIOUS,
    status: AlertStatus.ACTIVE_NOW,
    publicStatus: AlertPublicStatus.NEEDS_VERIFICATION,
    confidenceState: AlertConfidenceState.EARLY_COMMUNITY_SIGNAL,
    lifecycleStage: AlertLifecycleStage.PUBLISHED,
    location: createLocation(33.9667, 74.8167, 'Anantnag', 'Khanabal', 'Jhelum Tributary'),
    district: 'Anantnag',
    timeObserved: hoursAgo(3),
    createdAt: hoursAgo(2.5),
    updatedAt: hoursAgo(1),
    expiresAt: hoursAgo(-20), // 20 hours from now
    visibilityScope: VisibilityScope.PUBLIC,
    directionalRelevance: DirectionalRelevance.BOTH_DIRECTIONS,
    evidenceCount: 2,
    safetyContext: {
      passableWithCaution: false,
      blocked: false,
      dangerousToPass: false,
      avoidArea: true,
      pedestrianOnly: false,
      vehicleMovementPossible: false,
    },
    reporter: {
      id: 'user-009',
      type: ReporterType.FIELD_RESEARCHER,
      tier: ContributorTier.VERIFIED_VOLUNTEER,
      anonymized: false,
    },
    confirmations: {
      stillActive: 2,
      worsened: 1,
      reduced: 0,
      cleared: 0,
      moved: 0,
      incorrect: 0,
      updates: 1,
    },
    confidenceScore: 52,
    lastConfirmedAt: hoursAgo(1),
    expiryCategory: AlertExpiryCategory.MEDIUM,
    isExpired: false,
    requiresModeration: true,
    moderationStatus: 'pending',
    escalatedToInstitutions: false,
    tags: ['fish-kill', 'jhelum', 'anantnag', 'water-quality'],
  },
  {
    id: 'alert-007',
    category: AlertCategory.ENVIRONMENTAL,
    subtype: AlertSubtypeEnvironmental.ILLEGAL_DUMPING,
    title: 'Illegal dumping site near Achabal Garden',
    description: 'Accumulated waste including plastic, construction debris. Site appears to be used regularly. Ground contamination risk.',
    severity: AlertSeverity.MODERATE,
    status: AlertStatus.PARTIALLY_ACTIVE,
    publicStatus: AlertPublicStatus.COMMUNITY_CONFIRMED,
    confidenceState: AlertConfidenceState.STRONGLY_CONFIRMED,
    lifecycleStage: AlertLifecycleStage.RECONFIRMED,
    location: createLocation(33.8833, 75.1667, 'Anantnag', 'Achabal', 'Near Achabal Garden'),
    district: 'Anantnag',
    timeObserved: hoursAgo(5),
    createdAt: hoursAgo(4.5),
    updatedAt: hoursAgo(2),
    expiresAt: hoursAgo(-48), // 48 hours from now
    visibilityScope: VisibilityScope.PUBLIC,
    directionalRelevance: DirectionalRelevance.BOTH_DIRECTIONS,
    evidenceCount: 3,
    safetyContext: {
      passableWithCaution: true,
      blocked: false,
      dangerousToPass: false,
      avoidArea: true,
      pedestrianOnly: false,
      vehicleMovementPossible: true,
    },
    reporter: {
      id: 'user-010',
      type: ReporterType.VOLUNTEER,
      tier: ContributorTier.TRUSTED_LOCAL_OBSERVER,
      anonymized: false,
    },
    confirmations: {
      stillActive: 4,
      worsened: 1,
      reduced: 0,
      cleared: 0,
      moved: 0,
      incorrect: 0,
      updates: 2,
    },
    confidenceScore: 81,
    lastConfirmedAt: hoursAgo(2),
    expiryCategory: AlertExpiryCategory.SLOW_ECOLOGICAL,
    isExpired: false,
    requiresModeration: false,
    escalatedToInstitutions: false,
    tags: ['illegal-dumping', 'achabal', 'anantnag', 'waste'],
  },

  // --------------------------------------------------------------------------
  // BIODIVERSITY & WILDLIFE ALERTS
  // --------------------------------------------------------------------------
  {
    id: 'alert-008',
    category: AlertCategory.BIODIVERSITY_WILDLIFE,
    subtype: AlertSubtypeBiodiversity.WILDLIFE_CROSSING,
    title: 'Wildlife crossing observed near Dachigam lower trail',
    description: 'Herd of hangul (Kashmir stag) crossing the main trail. Approximately 8-10 animals including 2 calves. Tourists maintaining distance.',
    severity: AlertSeverity.LOW,
    status: AlertStatus.ACTIVE_NOW,
    publicStatus: AlertPublicStatus.COMMUNITY_CONFIRMED,
    confidenceState: AlertConfidenceState.STRONGLY_CONFIRMED,
    lifecycleStage: AlertLifecycleStage.RECONFIRMED,
    location: createLocation(34.1167, 75.0333, 'Srinagar', 'Dachigam', 'Lower Trail'),
    district: 'Srinagar',
    timeObserved: minutesAgo(45),
    createdAt: minutesAgo(42),
    updatedAt: minutesAgo(20),
    expiresAt: hoursAgo(-1), // 1 hour from now
    visibilityScope: VisibilityScope.PUBLIC,
    directionalRelevance: DirectionalRelevance.BOTH_DIRECTIONS,
    primaryEvidence: sampleEvidence[1],
    evidenceCount: 3,
    safetyContext: {
      passableWithCaution: true,
      blocked: false,
      dangerousToPass: false,
      avoidArea: false,
      pedestrianOnly: true,
      vehicleMovementPossible: false,
    },
    reporter: {
      id: 'user-002',
      type: ReporterType.VOLUNTEER,
      tier: ContributorTier.VERIFIED_VOLUNTEER,
      anonymized: false,
    },
    confirmations: {
      stillActive: 5,
      worsened: 0,
      reduced: 2,
      cleared: 1,
      moved: 1,
      incorrect: 0,
      updates: 2,
    },
    confidenceScore: 88,
    lastConfirmedAt: minutesAgo(20),
    expiryCategory: AlertExpiryCategory.FAST_MOVING,
    isExpired: false,
    requiresModeration: false,
    escalatedToInstitutions: false,
    tags: ['wildlife', 'hangul', 'dachigam', 'srinagar', 'crossing'],
  },
  {
    id: 'alert-009',
    category: AlertCategory.BIODIVERSITY_WILDLIFE,
    subtype: AlertSubtypeBiodiversity.INJURED_ANIMAL,
    title: 'Injured leopard spotted near Overa Wildlife Sanctuary',
    description: 'Adult leopard with visible leg injury. Moving slowly. Forest department has been notified. Avoid area for animal recovery.',
    severity: AlertSeverity.CRITICAL,
    status: AlertStatus.ACTIVE_NOW,
    publicStatus: AlertPublicStatus.ACTIVELY_CHANGING,
    confidenceState: AlertConfidenceState.INSTITUTIONALLY_REVIEWED,
    lifecycleStage: AlertLifecycleStage.INTENSIFIED,
    location: createLocation(33.8667, 75.2167, 'Anantnag', 'Overa', 'Near Sanctuary Boundary'),
    district: 'Anantnag',
    timeObserved: hoursAgo(4),
    createdAt: hoursAgo(3.5),
    updatedAt: minutesAgo(10),
    expiresAt: hoursAgo(-2), // 2 hours from now
    visibilityScope: VisibilityScope.PUBLIC,
    directionalRelevance: DirectionalRelevance.BOTH_DIRECTIONS,
    evidenceCount: 2,
    safetyContext: {
      passableWithCaution: false,
      blocked: false,
      dangerousToPass: true,
      avoidArea: true,
      pedestrianOnly: false,
      vehicleMovementPossible: true,
    },
    reporter: {
      id: 'user-011',
      type: ReporterType.RANGER,
      tier: ContributorTier.PARTNER_INSTITUTIONAL_OBSERVER,
      anonymized: false,
    },
    confirmations: {
      stillActive: 3,
      worsened: 1,
      reduced: 0,
      cleared: 0,
      moved: 1,
      incorrect: 0,
      updates: 4,
    },
    confidenceScore: 95,
    lastConfirmedAt: minutesAgo(10),
    expiryCategory: AlertExpiryCategory.FAST_MOVING,
    isExpired: false,
    requiresModeration: false,
    moderationStatus: 'approved',
    escalatedToInstitutions: true,
    tags: ['leopard', 'injured-animal', 'overa', 'anantnag', 'critical'],
  },
  {
    id: 'alert-010',
    category: AlertCategory.BIODIVERSITY_WILDLIFE,
    subtype: AlertSubtypeBiodiversity.BIRD_CONGREGATION,
    title: 'Unusual bird congregation at Hokersar Wetland',
    description: 'Large flock of migratory birds (estimated 500+) including rare species. Birdwatchers advised. Photography permitted from designated hides.',
    severity: AlertSeverity.LOW,
    status: AlertStatus.ACTIVE_NOW,
    publicStatus: AlertPublicStatus.COMMUNITY_CONFIRMED,
    confidenceState: AlertConfidenceState.COMMUNITY_CONFIRMED,
    lifecycleStage: AlertLifecycleStage.RECONFIRMED,
    location: createLocation(34.1667, 74.8333, 'Srinagar', 'Hokersar', 'Wetland Reserve'),
    district: 'Srinagar',
    timeObserved: hoursAgo(6),
    createdAt: hoursAgo(5.5),
    updatedAt: hoursAgo(3),
    expiresAt: hoursAgo(-18), // 18 hours from now
    visibilityScope: VisibilityScope.PUBLIC,
    directionalRelevance: DirectionalRelevance.BOTH_DIRECTIONS,
    evidenceCount: 5,
    safetyContext: {
      passableWithCaution: true,
      blocked: false,
      dangerousToPass: false,
      avoidArea: false,
      pedestrianOnly: true,
      vehicleMovementPossible: false,
    },
    reporter: {
      id: 'user-012',
      type: ReporterType.FIELD_RESEARCHER,
      tier: ContributorTier.RELIABLE_CONTRIBUTOR,
      anonymized: false,
    },
    confirmations: {
      stillActive: 7,
      worsened: 0,
      reduced: 0,
      cleared: 0,
      moved: 0,
      incorrect: 0,
      updates: 3,
    },
    confidenceScore: 82,
    lastConfirmedAt: hoursAgo(3),
    expiryCategory: AlertExpiryCategory.MEDIUM,
    isExpired: false,
    requiresModeration: false,
    escalatedToInstitutions: false,
    tags: ['birds', 'migration', 'hokersar', 'srinagar', 'wetland'],
  },

  // --------------------------------------------------------------------------
  // MOBILITY & ACCESS ALERTS
  // --------------------------------------------------------------------------
  {
    id: 'alert-011',
    category: AlertCategory.MOBILITY_ACCESS,
    subtype: AlertSubtypeMobility.ROUTE_BLOCKED,
    title: 'Route blocked near Z-Morh tunnel construction',
    description: 'Heavy vehicle movement for construction. Road temporarily closed for blasting operation. Expected delay 45-60 minutes.',
    severity: AlertSeverity.MODERATE,
    status: AlertStatus.ACTIVE_NOW,
    publicStatus: AlertPublicStatus.COMMUNITY_CONFIRMED,
    confidenceState: AlertConfidenceState.STRONGLY_CONFIRMED,
    lifecycleStage: AlertLifecycleStage.RECONFIRMED,
    location: createLocation(34.2833, 75.3000, 'Ganderbal', 'Kangan', 'Z-Morh Tunnel'),
    district: 'Ganderbal',
    timeObserved: minutesAgo(30),
    createdAt: minutesAgo(28),
    updatedAt: minutesAgo(8),
    expiresAt: hoursAgo(-2), // 2 hours from now
    visibilityScope: VisibilityScope.PUBLIC,
    directionalRelevance: DirectionalRelevance.BOTH_DIRECTIONS,
    evidenceCount: 2,
    safetyContext: {
      passableWithCaution: false,
      blocked: true,
      dangerousToPass: true,
      avoidArea: true,
      pedestrianOnly: false,
      vehicleMovementPossible: false,
    },
    reporter: {
      id: 'user-013',
      type: ReporterType.DRIVER,
      tier: ContributorTier.ACTIVE_CONTRIBUTOR,
      anonymized: true,
    },
    confirmations: {
      stillActive: 8,
      worsened: 0,
      reduced: 0,
      cleared: 0,
      moved: 0,
      incorrect: 0,
      updates: 4,
    },
    confidenceScore: 91,
    lastConfirmedAt: minutesAgo(8),
    expiryCategory: AlertExpiryCategory.FAST_MOVING,
    isExpired: false,
    requiresModeration: false,
    escalatedToInstitutions: false,
    tags: ['route-blocked', 'z-morh', 'ganderbal', 'construction'],
  },
  {
    id: 'alert-012',
    category: AlertCategory.MOBILITY_ACCESS,
    subtype: AlertSubtypeMobility.TRAIL_CLOSURE,
    title: 'Trail closure at Great Lakes Trek - Section 3',
    description: 'Section 3 closed due to landslide risk. Alternative route marked. Trekkers advised to register at checkpoint and follow guide instructions.',
    severity: AlertSeverity.SERIOUS,
    status: AlertStatus.PARTIALLY_ACTIVE,
    publicStatus: AlertPublicStatus.COMMUNITY_CONFIRMED,
    confidenceState: AlertConfidenceState.INSTITUTIONALLY_REVIEWED,
    lifecycleStage: AlertLifecycleStage.RECONFIRMED,
    location: createLocation(34.3500, 75.4000, 'Ganderbal', 'Naranag', 'Great Lakes Trek'),
    district: 'Ganderbal',
    timeObserved: hoursAgo(8),
    createdAt: hoursAgo(7.5),
    updatedAt: hoursAgo(2),
    expiresAt: hoursAgo(-48), // 48 hours from now
    visibilityScope: VisibilityScope.PUBLIC,
    directionalRelevance: DirectionalRelevance.BOTH_DIRECTIONS,
    evidenceCount: 3,
    safetyContext: {
      passableWithCaution: false,
      blocked: true,
      dangerousToPass: true,
      avoidArea: true,
      pedestrianOnly: true,
      vehicleMovementPossible: false,
    },
    reporter: {
      id: 'user-014',
      type: ReporterType.RANGER,
      tier: ContributorTier.PARTNER_INSTITUTIONAL_OBSERVER,
      anonymized: false,
    },
    confirmations: {
      stillActive: 6,
      worsened: 0,
      reduced: 0,
      cleared: 0,
      moved: 0,
      incorrect: 0,
      updates: 5,
    },
    confidenceScore: 96,
    lastConfirmedAt: hoursAgo(2),
    expiryCategory: AlertExpiryCategory.MEDIUM,
    isExpired: false,
    requiresModeration: false,
    moderationStatus: 'approved',
    escalatedToInstitutions: true,
    tags: ['trail-closure', 'great-lakes-trek', 'ganderbal', 'landslide-risk'],
  },
  {
    id: 'alert-013',
    category: AlertCategory.MOBILITY_ACCESS,
    subtype: AlertSubtypeMobility.HEAVY_CONGESTION,
    title: 'Heavy congestion at Lal Chowk intersection',
    description: 'Traffic buildup due to signal malfunction. Police directing traffic. Expect 20-30 minute delays. Alternative routes via Residency Road advised.',
    severity: AlertSeverity.LOW,
    status: AlertStatus.ACTIVE_NOW,
    publicStatus: AlertPublicStatus.COMMUNITY_CONFIRMED,
    confidenceState: AlertConfidenceState.COMMUNITY_CONFIRMED,
    lifecycleStage: AlertLifecycleStage.RECONFIRMED,
    location: createLocation(34.0833, 74.8000, 'Srinagar', 'Lal Chowk', 'Main Intersection'),
    district: 'Srinagar',
    timeObserved: minutesAgo(15),
    createdAt: minutesAgo(12),
    updatedAt: minutesAgo(5),
    expiresAt: hoursAgo(-1), // 1 hour from now
    visibilityScope: VisibilityScope.PUBLIC,
    directionalRelevance: DirectionalRelevance.BOTH_DIRECTIONS,
    evidenceCount: 1,
    safetyContext: {
      passableWithCaution: true,
      blocked: false,
      dangerousToPass: false,
      avoidArea: false,
      pedestrianOnly: false,
      vehicleMovementPossible: true,
    },
    reporter: {
      id: 'user-015',
      type: ReporterType.CITIZEN,
      tier: ContributorTier.NEW_CONTRIBUTOR,
      anonymized: true,
    },
    confirmations: {
      stillActive: 5,
      worsened: 1,
      reduced: 0,
      cleared: 0,
      moved: 0,
      incorrect: 0,
      updates: 1,
    },
    confidenceScore: 68,
    lastConfirmedAt: minutesAgo(5),
    expiryCategory: AlertExpiryCategory.FAST_MOVING,
    isExpired: false,
    requiresModeration: false,
    escalatedToInstitutions: false,
    tags: ['congestion', 'lal-chowk', 'srinagar', 'traffic'],
  },

  // --------------------------------------------------------------------------
  // PUBLIC SAFETY ALERTS
  // --------------------------------------------------------------------------
  {
    id: 'alert-014',
    category: AlertCategory.PUBLIC_SAFETY,
    subtype: AlertSubtypePublicSafety.RESCUE_OPERATION,
    title: 'Rescue operation underway at Apharwat Peak',
    description: 'Tourist injured in skiing accident. Helicopter rescue in progress. Area temporarily restricted. Other skiers advised to maintain distance.',
    severity: AlertSeverity.CRITICAL,
    status: AlertStatus.ACTIVE_NOW,
    publicStatus: AlertPublicStatus.ACTIVELY_CHANGING,
    confidenceState: AlertConfidenceState.INSTITUTIONALLY_REVIEWED,
    lifecycleStage: AlertLifecycleStage.INTENSIFIED,
    location: createLocation(34.0500, 74.3667, 'Baramulla', 'Gulmarg', 'Apharwat Peak'),
    district: 'Baramulla',
    timeObserved: minutesAgo(40),
    createdAt: minutesAgo(35),
    updatedAt: minutesAgo(5),
    expiresAt: hoursAgo(-2), // 2 hours from now
    visibilityScope: VisibilityScope.PUBLIC,
    directionalRelevance: DirectionalRelevance.BOTH_DIRECTIONS,
    evidenceCount: 2,
    safetyContext: {
      passableWithCaution: false,
      blocked: false,
      dangerousToPass: true,
      avoidArea: true,
      pedestrianOnly: true,
      vehicleMovementPossible: false,
    },
    reporter: {
      id: 'user-016',
      type: ReporterType.RANGER,
      tier: ContributorTier.PARTNER_INSTITUTIONAL_OBSERVER,
      anonymized: false,
    },
    confirmations: {
      stillActive: 4,
      worsened: 1,
      reduced: 0,
      cleared: 0,
      moved: 0,
      incorrect: 0,
      updates: 6,
    },
    confidenceScore: 98,
    lastConfirmedAt: minutesAgo(5),
    expiryCategory: AlertExpiryCategory.FAST_MOVING,
    isExpired: false,
    requiresModeration: false,
    moderationStatus: 'approved',
    escalatedToInstitutions: true,
    tags: ['rescue', 'apharwat', 'gulmarg', 'baramulla', 'emergency'],
  },
  {
    id: 'alert-015',
    category: AlertCategory.PUBLIC_SAFETY,
    subtype: AlertSubtypePublicSafety.UNSAFE_WATER_CROSSING,
    title: 'Unsafe water crossing at Lidder River ford',
    description: 'Water level high due to recent rainfall. Current strong. Crossing not recommended. Use bridge 500m downstream instead.',
    severity: AlertSeverity.MODERATE,
    status: AlertStatus.ACTIVE_NOW,
    publicStatus: AlertPublicStatus.COMMUNITY_CONFIRMED,
    confidenceState: AlertConfidenceState.COMMUNITY_CONFIRMED,
    lifecycleStage: AlertLifecycleStage.RECONFIRMED,
    location: createLocation(34.0200, 75.3400, 'Anantnag', 'Pahalgam', 'Lidder River Ford'),
    district: 'Anantnag',
    timeObserved: hoursAgo(1),
    createdAt: hoursAgo(0.75),
    updatedAt: minutesAgo(30),
    expiresAt: hoursAgo(-5), // 5 hours from now
    visibilityScope: VisibilityScope.PUBLIC,
    directionalRelevance: DirectionalRelevance.BOTH_DIRECTIONS,
    evidenceCount: 2,
    safetyContext: {
      passableWithCaution: false,
      blocked: false,
      dangerousToPass: true,
      avoidArea: true,
      pedestrianOnly: true,
      vehicleMovementPossible: false,
    },
    reporter: {
      id: 'user-017',
      type: ReporterType.VOLUNTEER,
      tier: ContributorTier.TRUSTED_LOCAL_OBSERVER,
      anonymized: false,
    },
    confirmations: {
      stillActive: 4,
      worsened: 0,
      reduced: 1,
      cleared: 0,
      moved: 0,
      incorrect: 0,
      updates: 2,
    },
    confidenceScore: 76,
    lastConfirmedAt: minutesAgo(30),
    expiryCategory: AlertExpiryCategory.FAST_MOVING,
    isExpired: false,
    requiresModeration: false,
    escalatedToInstitutions: false,
    tags: ['unsafe-crossing', 'lidder', 'pahalgam', 'anantnag', 'river'],
  },
];

// ============================================================================
// Export Helpers
// ============================================================================

export function getAlertById(id: string): Alert | undefined {
  return communityAlerts.find((a) => a.id === id);
}

export function getAlertsByCategory(category: AlertCategory): Alert[] {
  return communityAlerts.filter((a) => a.category === category);
}

export function getAlertsByDistrict(district: string): Alert[] {
  return communityAlerts.filter((a) => a.district === district);
}

export function getAlertsBySeverity(severity: AlertSeverity): Alert[] {
  return communityAlerts.filter((a) => a.severity === severity);
}

export function getActiveAlerts(): Alert[] {
  return communityAlerts.filter(
    (a) => !a.isExpired && a.publicStatus !== AlertPublicStatus.ARCHIVED
  );
}

export function getAlertsRequiringVerification(): Alert[] {
  return communityAlerts.filter(
    (a) =>
      a.publicStatus === AlertPublicStatus.NEEDS_VERIFICATION ||
      a.confidenceState === AlertConfidenceState.UNVERIFIED
  );
}

export function getEscalatedAlerts(): Alert[] {
  return communityAlerts.filter((a) => a.escalatedToInstitutions);
}

export function getAlertsByCoordinates(
  alerts: Alert[],
  lat: number,
  lng: number,
  radiusKm: number = 5
): Alert[] {
  const toRadians = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371; // Earth's radius in km

  return alerts.filter((alert) => {
    const dLat = toRadians(alert.location.coordinates.latitude - lat);
    const dLng = toRadians(alert.location.coordinates.longitude - lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat)) *
        Math.cos(toRadians(alert.location.coordinates.latitude)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance <= radiusKm;
  });
}

export const alertStats = {
  total: communityAlerts.length,
  active: getActiveAlerts().length,
  byCategory: {
    [AlertCategory.HAZARD]: getAlertsByCategory(AlertCategory.HAZARD).length,
    [AlertCategory.ENVIRONMENTAL]: getAlertsByCategory(AlertCategory.ENVIRONMENTAL).length,
    [AlertCategory.BIODIVERSITY_WILDLIFE]: getAlertsByCategory(AlertCategory.BIODIVERSITY_WILDLIFE).length,
    [AlertCategory.MOBILITY_ACCESS]: getAlertsByCategory(AlertCategory.MOBILITY_ACCESS).length,
    [AlertCategory.PUBLIC_SAFETY]: getAlertsByCategory(AlertCategory.PUBLIC_SAFETY).length,
  },
  bySeverity: {
    [AlertSeverity.CRITICAL]: getAlertsBySeverity(AlertSeverity.CRITICAL).length,
    [AlertSeverity.SERIOUS]: getAlertsBySeverity(AlertSeverity.SERIOUS).length,
    [AlertSeverity.MODERATE]: getAlertsBySeverity(AlertSeverity.MODERATE).length,
    [AlertSeverity.LOW]: getAlertsBySeverity(AlertSeverity.LOW).length,
  },
  requiringVerification: getAlertsRequiringVerification().length,
  escalated: getEscalatedAlerts().length,
};

export default communityAlerts;
