/**
 * Community Alert Network - Confidence Scoring & Trust Weighting Utilities
 * 
 * Core algorithms for:
 * - Alert confidence calculation
 * - Contributor trust scoring
 * - Confirmation weight computation
 * - Alert state transitions
 */

import {
  Alert,
  AlertConfidenceState,
  AlertPublicStatus,
  ConfirmationActionType,
  ContributorTier,
  AlertLifecycleStage,
  AlertExpiryCategory,
  AlertDisplay,
  AlertCategory,
  AlertSeverity,
} from '@/types/alerts';

// ============================================================================
// Constants & Configuration
// ============================================================================

/**
 * Contributor tier trust weights (0.0 - 1.0)
 * Used to weight confirmations based on reporter reliability
 */
export const CONTRIBUTOR_TIER_WEIGHTS: Record<ContributorTier, number> = {
  [ContributorTier.NEW_CONTRIBUTOR]: 0.3,
  [ContributorTier.ACTIVE_CONTRIBUTOR]: 0.5,
  [ContributorTier.RELIABLE_CONTRIBUTOR]: 0.7,
  [ContributorTier.TRUSTED_LOCAL_OBSERVER]: 0.85,
  [ContributorTier.VERIFIED_VOLUNTEER]: 0.9,
  [ContributorTier.PARTNER_INSTITUTIONAL_OBSERVER]: 1.0,
};

/**
 * Confidence state score ranges
 */
export const CONFIDENCE_STATE_RANGES: Record<AlertConfidenceState, [number, number]> = {
  [AlertConfidenceState.UNVERIFIED]: [0, 25],
  [AlertConfidenceState.EARLY_COMMUNITY_SIGNAL]: [25, 50],
  [AlertConfidenceState.COMMUNITY_CONFIRMED]: [50, 75],
  [AlertConfidenceState.STRONGLY_CONFIRMED]: [75, 90],
  [AlertConfidenceState.INSTITUTIONALLY_REVIEWED]: [90, 100],
  [AlertConfidenceState.CONFLICTED]: [20, 45],
  [AlertConfidenceState.STALE]: [10, 30],
  [AlertConfidenceState.RESOLVED]: [0, 20],
};

/**
 * Confirmation action impact on confidence score
 */
export const CONFIRMATION_IMPACT: Record<ConfirmationActionType, number> = {
  [ConfirmationActionType.STILL_ACTIVE]: 8,
  [ConfirmationActionType.WORSENED]: 12,
  [ConfirmationActionType.REDUCED]: -3,
  [ConfirmationActionType.CLEARED]: -15,
  [ConfirmationActionType.MOVED_SLIGHTLY]: 2,
  [ConfirmationActionType.INCORRECT_REPORT]: -20,
  [ConfirmationActionType.ADD_UPDATE]: 5,
};

/**
 * Expiry configuration by category
 */
export const ALERT_EXPIRY_CONFIG: Record<AlertExpiryCategory, {
  minMinutes: number;
  maxMinutes: number;
  refreshThresholdMinutes: number;
  staleThresholdMinutes: number;
}> = {
  [AlertExpiryCategory.FAST_MOVING]: {
    minMinutes: 30,
    maxMinutes: 120,
    refreshThresholdMinutes: 15,
    staleThresholdMinutes: 90,
  },
  [AlertExpiryCategory.MEDIUM]: {
    minMinutes: 360, // 6 hours
    maxMinutes: 1440, // 24 hours
    refreshThresholdMinutes: 120,
    staleThresholdMinutes: 720, // 12 hours
  },
  [AlertExpiryCategory.SLOW_ECOLOGICAL]: {
    minMinutes: 1440, // 24 hours
    maxMinutes: 4320, // 72 hours
    refreshThresholdMinutes: 360,
    staleThresholdMinutes: 2160, // 36 hours
  },
};

/**
 * Category labels and display metadata
 */
export const ALERT_CATEGORY_METADATA: Record<AlertCategory, {
  label: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
}> = {
  [AlertCategory.HAZARD]: {
    label: 'Hazard',
    description: 'Natural hazards and dangerous conditions',
    icon: 'TriangleAlert',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
  },
  [AlertCategory.ENVIRONMENTAL]: {
    label: 'Environmental',
    description: 'Pollution, contamination, and ecological threats',
    icon: 'Droplet',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
  },
  [AlertCategory.BIODIVERSITY_WILDLIFE]: {
    label: 'Biodiversity & Wildlife',
    description: 'Wildlife sightings, biodiversity events',
    icon: 'Bird',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
  },
  [AlertCategory.MOBILITY_ACCESS]: {
    label: 'Mobility & Access',
    description: 'Route conditions, closures, and access issues',
    icon: 'Route',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
  },
  [AlertCategory.PUBLIC_SAFETY]: {
    label: 'Public Safety',
    description: 'Emergency situations and public hazards',
    icon: 'ShieldAlert',
    color: 'text-rose-600',
    bgColor: 'bg-rose-600/10',
    borderColor: 'border-rose-600/30',
  },
};

/**
 * Severity metadata
 */
export const SEVERITY_METADATA: Record<AlertSeverity, {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
}> = {
  [AlertSeverity.LOW]: {
    label: 'Low',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    icon: 'Circle',
  },
  [AlertSeverity.MODERATE]: {
    label: 'Moderate',
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    icon: 'Triangle',
  },
  [AlertSeverity.SERIOUS]: {
    label: 'Serious',
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
    icon: 'TriangleAlert',
  },
  [AlertSeverity.CRITICAL]: {
    label: 'Critical',
    color: 'text-red-600',
    bgColor: 'bg-red-600/10',
    borderColor: 'border-red-600/30',
    icon: 'OctagonAlert',
  },
};

/**
 * Confidence state metadata
 */
export const CONFIDENCE_METADATA: Record<AlertConfidenceState, {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  description: string;
}> = {
  [AlertConfidenceState.UNVERIFIED]: {
    label: 'Unverified',
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/10',
    borderColor: 'border-gray-500/30',
    description: 'Awaiting initial verification',
  },
  [AlertConfidenceState.EARLY_COMMUNITY_SIGNAL]: {
    label: 'Early Signal',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    description: 'Initial community reports received',
  },
  [AlertConfidenceState.COMMUNITY_CONFIRMED]: {
    label: 'Confirmed',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    description: 'Multiple community confirmations',
  },
  [AlertConfidenceState.STRONGLY_CONFIRMED]: {
    label: 'Strongly Confirmed',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-600/10',
    borderColor: 'border-emerald-600/30',
    description: 'High confidence from multiple sources',
  },
  [AlertConfidenceState.INSTITUTIONALLY_REVIEWED]: {
    label: 'Institutionally Reviewed',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    borderColor: 'border-violet-500/30',
    description: 'Verified by authorities or partners',
  },
  [AlertConfidenceState.CONFLICTED]: {
    label: 'Conflicted',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
    description: 'Conflicting reports received',
  },
  [AlertConfidenceState.STALE]: {
    label: 'Stale',
    color: 'text-gray-500',
    bgColor: 'bg-gray-500/10',
    borderColor: 'border-gray-500/30',
    description: 'Not recently confirmed',
  },
  [AlertConfidenceState.RESOLVED]: {
    label: 'Resolved',
    color: 'text-slate-500',
    bgColor: 'bg-slate-500/10',
    borderColor: 'border-slate-500/30',
    description: 'Issue has been resolved',
  },
};

/**
 * Public status metadata
 */
export const PUBLIC_STATUS_METADATA: Record<AlertPublicStatus, {
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
}> = {
  [AlertPublicStatus.REPORTED]: {
    label: 'Reported',
    color: 'text-gray-400',
    bgColor: 'bg-gray-500/10',
    borderColor: 'border-gray-500/30',
  },
  [AlertPublicStatus.NEEDS_VERIFICATION]: {
    label: 'Needs Verification',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
  },
  [AlertPublicStatus.COMMUNITY_CONFIRMED]: {
    label: 'Community Confirmed',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
  },
  [AlertPublicStatus.ACTIVELY_CHANGING]: {
    label: 'Actively Changing',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30',
  },
  [AlertPublicStatus.CONFLICTED]: {
    label: 'Conflicted',
    color: 'text-amber-600',
    bgColor: 'bg-amber-600/10',
    borderColor: 'border-amber-600/30',
  },
  [AlertPublicStatus.REDUCED]: {
    label: 'Reduced',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
  },
  [AlertPublicStatus.CLEARED]: {
    label: 'Cleared',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-600/10',
    borderColor: 'border-emerald-600/30',
  },
  [AlertPublicStatus.RESOLVED]: {
    label: 'Resolved',
    color: 'text-slate-500',
    bgColor: 'bg-slate-500/10',
    borderColor: 'border-slate-500/30',
  },
  [AlertPublicStatus.ARCHIVED]: {
    label: 'Archived',
    color: 'text-gray-600',
    bgColor: 'bg-gray-600/10',
    borderColor: 'border-gray-600/30',
  },
};

/**
 * Reconfirmation actions configuration
 */
export const RECONFIRMATION_ACTIONS: Record<ConfirmationActionType, {
  label: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  requiresNote: boolean;
  requiresEvidence: boolean;
}> = {
  [ConfirmationActionType.STILL_ACTIVE]: {
    label: 'Still Active',
    description: 'Condition persists unchanged',
    icon: 'CircleCheck',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    requiresNote: false,
    requiresEvidence: false,
  },
  [ConfirmationActionType.WORSENED]: {
    label: 'Worsened',
    description: 'Condition has intensified',
    icon: 'TrendingUp',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
    requiresNote: false,
    requiresEvidence: false,
  },
  [ConfirmationActionType.REDUCED]: {
    label: 'Reduced',
    description: 'Condition has improved',
    icon: 'TrendingDown',
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    requiresNote: false,
    requiresEvidence: false,
  },
  [ConfirmationActionType.CLEARED]: {
    label: 'Cleared',
    description: 'No longer present',
    icon: 'Check',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-600/10',
    requiresNote: false,
    requiresEvidence: false,
  },
  [ConfirmationActionType.MOVED_SLIGHTLY]: {
    label: 'Moved',
    description: 'Location shifted slightly',
    icon: 'Move',
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    requiresNote: true,
    requiresEvidence: false,
  },
  [ConfirmationActionType.INCORRECT_REPORT]: {
    label: 'Incorrect',
    description: 'Report is mistaken or false',
    icon: 'CircleX',
    color: 'text-red-600',
    bgColor: 'bg-red-600/10',
    requiresNote: true,
    requiresEvidence: false,
  },
  [ConfirmationActionType.ADD_UPDATE]: {
    label: 'Add Update',
    description: 'Add new information',
    icon: 'Plus',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
    requiresNote: true,
    requiresEvidence: false,
  },
};

// ============================================================================
// Confidence Scoring Functions
// ============================================================================

/**
 * Calculate base confidence score from confirmations
 */
export function calculateBaseConfidenceScore(
  confirmations: Alert['confirmations']
): number {
  const { stillActive, worsened, reduced, cleared, moved, incorrect, updates } = confirmations;

  // Positive contributions
  let score = 0;
  score += stillActive * CONFIRMATION_IMPACT[ConfirmationActionType.STILL_ACTIVE];
  score += worsened * CONFIRMATION_IMPACT[ConfirmationActionType.WORSENED];
  score += updates * CONFIRMATION_IMPACT[ConfirmationActionType.ADD_UPDATE];
  score += moved * CONFIRMATION_IMPACT[ConfirmationActionType.MOVED_SLIGHTLY];

  // Negative contributions
  score += reduced * CONFIRMATION_IMPACT[ConfirmationActionType.REDUCED];
  score += cleared * CONFIRMATION_IMPACT[ConfirmationActionType.CLEARED];
  score += incorrect * CONFIRMATION_IMPACT[ConfirmationActionType.INCORRECT_REPORT];

  // Diminishing returns for high confirmation counts
  const totalConfirmations = stillActive + worsened + reduced + cleared + moved + incorrect + updates;
  if (totalConfirmations > 10) {
    score *= 0.8; // 20% reduction for spam prevention
  }

  return Math.max(0, Math.min(100, score));
}

/**
 * Calculate weighted confidence score considering contributor trust
 */
export function calculateWeightedConfidenceScore(
  confirmations: Alert['confirmations'],
  avgTrustWeight: number = 0.5
): number {
  const baseScore = calculateBaseConfidenceScore(confirmations);
  
  // Trust weight multiplier (0.5 - 1.5 range)
  const trustMultiplier = 0.5 + avgTrustWeight;
  
  return Math.max(0, Math.min(100, baseScore * trustMultiplier));
}

/**
 * Determine confidence state from score
 */
export function getConfidenceStateFromScore(score: number): AlertConfidenceState {
  if (score >= 90) return AlertConfidenceState.INSTITUTIONALLY_REVIEWED;
  if (score >= 75) return AlertConfidenceState.STRONGLY_CONFIRMED;
  if (score >= 50) return AlertConfidenceState.COMMUNITY_CONFIRMED;
  if (score >= 25) return AlertConfidenceState.EARLY_COMMUNITY_SIGNAL;
  return AlertConfidenceState.UNVERIFIED;
}

/**
 * Check if alert is stale based on time since last confirmation
 */
export function isAlertStale(alert: Alert): boolean {
  const config = ALERT_EXPIRY_CONFIG[alert.expiryCategory];
  const now = new Date();
  const lastConfirmed = alert.lastConfirmedAt || alert.createdAt;
  const minutesSinceConfirmation = (now.getTime() - lastConfirmed.getTime()) / (1000 * 60);

  return minutesSinceConfirmation > config.staleThresholdMinutes;
}

/**
 * Calculate time decay factor for confidence
 */
export function calculateTimeDecayFactor(alert: Alert): number {
  const config = ALERT_EXPIRY_CONFIG[alert.expiryCategory];
  const now = new Date();
  const lastConfirmed = alert.lastConfirmedAt || alert.createdAt;
  const minutesSinceConfirmation = (now.getTime() - lastConfirmed.getTime()) / (1000 * 60);

  // Linear decay from 1.0 to 0.5 over the stale threshold period
  const decayRate = 0.5 / config.staleThresholdMinutes;
  const decay = Math.max(0.5, 1.0 - (minutesSinceConfirmation * decayRate));

  return decay;
}

/**
 * Update alert confidence based on new confirmation
 */
export function updateAlertConfidence(
  alert: Alert,
  actionType: ConfirmationActionType,
  trustWeight: number
): { newScore: number; newState: AlertConfidenceState } {
  // Apply action impact weighted by trust
  const impact = CONFIRMATION_IMPACT[actionType] * trustWeight;
  
  // Apply time decay to existing score
  const decayedScore = alert.confidenceScore * calculateTimeDecayFactor(alert);
  
  // Calculate new score
  const newScore = Math.max(0, Math.min(100, decayedScore + impact));
  
  // Determine new state
  let newState = getConfidenceStateFromScore(newScore);
  
  // Special handling for conflicted state
  const totalConfirmations = Object.values(alert.confirmations).reduce((a, b) => a + b, 0);
  const contradictionRatio = (alert.confirmations.incorrect + alert.confirmations.cleared) / 
    Math.max(1, totalConfirmations);
  
  if (contradictionRatio > 0.3 && newState !== AlertConfidenceState.RESOLVED) {
    newState = AlertConfidenceState.CONFLICTED;
  }

  return { newScore, newState };
}

// ============================================================================
// Trust Scoring Functions
// ============================================================================

/**
 * Calculate contributor trust score from history
 */
export function calculateTrustScore(
  totalReports: number,
  confirmedReports: number,
  contradictedReports: number,
  falseReports: number
): number {
  if (totalReports === 0) return 50; // Default for new users

  // Base accuracy rate
  const accuracyRate = confirmedReports / Math.max(1, totalReports);
  
  // Penalty for false reports (heavy penalty)
  const falseReportPenalty = falseReports * 10;
  
  // Penalty for contradictions
  const contradictionPenalty = contradictedReports * 3;
  
  // Experience bonus (diminishing returns)
  const experienceBonus = Math.min(10, Math.log10(totalReports + 1) * 5);
  
  // Calculate final score
  let score = (accuracyRate * 80) - falseReportPenalty - contradictionPenalty + experienceBonus;
  
  return Math.max(0, Math.min(100, score));
}

/**
 * Determine contributor tier from trust score and activity
 */
export function getContributorTier(
  trustScore: number,
  totalReports: number,
  isVerified: boolean,
  isInstitutional: boolean
): ContributorTier {
  if (isInstitutional) {
    return ContributorTier.PARTNER_INSTITUTIONAL_OBSERVER;
  }
  
  if (isVerified && trustScore >= 80 && totalReports >= 20) {
    return ContributorTier.VERIFIED_VOLUNTEER;
  }
  
  if (trustScore >= 75 && totalReports >= 15) {
    return ContributorTier.TRUSTED_LOCAL_OBSERVER;
  }
  
  if (trustScore >= 60 && totalReports >= 5) {
    return ContributorTier.RELIABLE_CONTRIBUTOR;
  }
  
  if (totalReports >= 2) {
    return ContributorTier.ACTIVE_CONTRIBUTOR;
  }
  
  return ContributorTier.NEW_CONTRIBUTOR;
}

/**
 * Get trust weight for a contributor tier
 */
export function getTrustWeightForTier(tier: ContributorTier): number {
  return CONTRIBUTOR_TIER_WEIGHTS[tier];
}

// ============================================================================
// Alert Display Computation
// ============================================================================

/**
 * Format time ago string
 */
export function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}

/**
 * Compute display fields for an alert
 */
export function computeAlertDisplay(alert: Alert, userLat?: number, userLng?: number): AlertDisplay {
  // Calculate distance if user location provided
  let distanceFromUserKm: number | undefined;
  if (userLat !== undefined && userLng !== undefined) {
    const R = 6371; // Earth radius in km
    const dLat = ((alert.location.coordinates.latitude - userLat) * Math.PI) / 180;
    const dLng = ((alert.location.coordinates.longitude - userLng) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((userLat * Math.PI) / 180) *
        Math.cos((alert.location.coordinates.latitude * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    distanceFromUserKm = R * c;
  }

  // Check for new updates (last 15 minutes)
  const fifteenMinsAgo = new Date(now().getTime() - 15 * 60 * 1000);
  const hasNewUpdates = (alert.lastConfirmedAt || alert.updatedAt) > fifteenMinsAgo;

  // Expiry warning
  let expiryWarning: string | undefined;
  const timeToExpiry = alert.expiresAt.getTime() - now().getTime();
  if (timeToExpiry < 30 * 60 * 1000 && !alert.isExpired) { // Less than 30 mins
    const minsLeft = Math.floor(timeToExpiry / (1000 * 60));
    expiryWarning = `Expires in ${minsLeft}m`;
  }

  return {
    ...alert,
    timeAgo: formatTimeAgo(alert.timeObserved),
    lastConfirmedAgo: alert.lastConfirmedAt ? formatTimeAgo(alert.lastConfirmedAt) : undefined,
    distanceFromUserKm,
    confidenceLabel: CONFIDENCE_METADATA[alert.confidenceState].label,
    confidenceColor: CONFIDENCE_METADATA[alert.confidenceState].color,
    severityLabel: SEVERITY_METADATA[alert.severity].label,
    severityColor: SEVERITY_METADATA[alert.severity].color,
    categoryIcon: ALERT_CATEGORY_METADATA[alert.category].icon,
    categoryColor: ALERT_CATEGORY_METADATA[alert.category].color,
    expiryWarning,
    hasNewUpdates,
  };
}

/**
 * Get current time (exported for testing)
 */
export function now(): Date {
  return new Date();
}

// ============================================================================
// Alert State Transition Functions
// ============================================================================

/**
 * Determine next public status based on confirmations and confidence
 */
export function getNextPublicStatus(alert: Alert): AlertPublicStatus {
  // Check if resolved
  if (alert.confirmations.cleared >= 3 && alert.confidenceState === AlertConfidenceState.RESOLVED) {
    return AlertPublicStatus.RESOLVED;
  }

  // Check if cleared
  if (alert.confirmations.cleared > alert.confirmations.stillActive) {
    return AlertPublicStatus.CLEARED;
  }

  // Check if conflicted
  if (alert.confidenceState === AlertConfidenceState.CONFLICTED) {
    return AlertPublicStatus.CONFLICTED;
  }

  // Check if actively changing
  if (alert.confirmations.worsened > 0 || alert.confirmations.reduced > 0) {
    return AlertPublicStatus.ACTIVELY_CHANGING;
  }

  // Check if reduced
  if (alert.confirmations.reduced > 0 && alert.confirmations.reduced >= alert.confirmations.worsened) {
    return AlertPublicStatus.REDUCED;
  }

  // Default based on confidence
  switch (alert.confidenceState) {
    case AlertConfidenceState.UNVERIFIED:
      return AlertPublicStatus.REPORTED;
    case AlertConfidenceState.EARLY_COMMUNITY_SIGNAL:
      return AlertPublicStatus.NEEDS_VERIFICATION;
    case AlertConfidenceState.COMMUNITY_CONFIRMED:
    case AlertConfidenceState.STRONGLY_CONFIRMED:
      return AlertPublicStatus.COMMUNITY_CONFIRMED;
    case AlertConfidenceState.INSTITUTIONALLY_REVIEWED:
      return AlertPublicStatus.COMMUNITY_CONFIRMED;
    default:
      return AlertPublicStatus.REPORTED;
  }
}

/**
 * Determine next lifecycle stage
 */
export function getNextLifecycleStage(alert: Alert): AlertLifecycleStage {
  if (alert.isExpired || alert.publicStatus === AlertPublicStatus.ARCHIVED) {
    return AlertLifecycleStage.ARCHIVED;
  }

  if (alert.publicStatus === AlertPublicStatus.RESOLVED) {
    return AlertLifecycleStage.RESOLVED;
  }

  if (alert.confirmations.worsened > 0 || alert.severity === AlertSeverity.CRITICAL) {
    return AlertLifecycleStage.INTENSIFIED;
  }

  if (alert.confirmations.stillActive >= 2) {
    return AlertLifecycleStage.RECONFIRMED;
  }

  if (alert.publicStatus !== AlertPublicStatus.REPORTED) {
    return AlertLifecycleStage.PUBLISHED;
  }

  return AlertLifecycleStage.SUBMITTED;
}

// ============================================================================
// Duplicate Detection
// ============================================================================

/**
 * Check if two alerts are potential duplicates
 */
export function arePotentialDuplicates(
  alert1: Alert,
  alert2: Alert,
  distanceThresholdKm: number = 0.5,
  timeThresholdHours: number = 2
): boolean {
  // Same alert ID - not duplicates
  if (alert1.id === alert2.id) return false;

  // Different categories - not duplicates
  if (alert1.category !== alert2.category) return false;

  // Different subtypes - not duplicates
  if (alert1.subtype !== alert2.subtype) return false;

  // Check distance
  const R = 6371;
  const dLat = ((alert2.location.coordinates.latitude - alert1.location.coordinates.latitude) * Math.PI) / 180;
  const dLng = ((alert2.location.coordinates.longitude - alert1.location.coordinates.longitude) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((alert1.location.coordinates.latitude * Math.PI) / 180) *
      Math.cos((alert2.location.coordinates.latitude * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distanceKm = R * c;

  if (distanceKm > distanceThresholdKm) return false;

  // Check time proximity
  const timeDiffHours = Math.abs(
    alert1.timeObserved.getTime() - alert2.timeObserved.getTime()
  ) / (1000 * 60 * 60);

  if (timeDiffHours > timeThresholdHours) return false;

  return true;
}

// ============================================================================
// Reconfirmation Prompt Logic
// ============================================================================

/**
 * Determine if user should be prompted for reconfirmation
 */
export function shouldPromptForReconfirmation(
  alert: Alert,
  userDistanceKm: number,
  userTier: ContributorTier,
  isMovingTowardAlert: boolean
): boolean {
  // Don't prompt for expired or archived alerts
  if (alert.isExpired || alert.publicStatus === AlertPublicStatus.ARCHIVED) {
    return false;
  }

  // Don't prompt if too far (unless moving toward)
  if (userDistanceKm > 3 && !isMovingTowardAlert) {
    return false;
  }

  // Prompt if alert needs verification
  if (alert.confidenceState === AlertConfidenceState.UNVERIFIED) {
    return userDistanceKm <= 3;
  }

  // Prompt if alert is stale
  if (isAlertStale(alert)) {
    return userDistanceKm <= 2;
  }

  // Prompt trusted users for low-confidence alerts
  if (userTier === ContributorTier.TRUSTED_LOCAL_OBSERVER ||
      userTier === ContributorTier.VERIFIED_VOLUNTEER ||
      userTier === ContributorTier.PARTNER_INSTITUTIONAL_OBSERVER) {
    return userDistanceKm <= 5;
  }

  // Standard prompt for nearby users
  return userDistanceKm <= 1;
}
