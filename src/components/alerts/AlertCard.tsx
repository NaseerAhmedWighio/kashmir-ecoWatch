'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  TriangleAlert,
  Droplet,
  Bird,
  Route,
  ShieldAlert,
  MapPin,
  Clock,
  Image as ImageIcon,
  Video,
  Mic,
  FileText,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  CircleCheck,
  Check,
  Move,
  CircleX,
  Plus,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import type {
  AlertDisplay,
  AlertConfidenceState,
  ReconfirmationAction,
} from '@/types/alerts';
import { AlertCategory, AlertSeverity, ConfirmationActionType } from '@/types/alerts';
import {
  RECONFIRMATION_ACTIONS,
  ALERT_CATEGORY_METADATA,
  SEVERITY_METADATA,
  CONFIDENCE_METADATA,
} from '@/lib/alert-utils';

// ============================================================================
// Icon Mapping
// ============================================================================

const CATEGORY_ICONS: Record<AlertCategory, React.ComponentType<{ className?: string }>> = {
  [AlertCategory.HAZARD]: TriangleAlert,
  [AlertCategory.ENVIRONMENTAL]: Droplet,
  [AlertCategory.BIODIVERSITY_WILDLIFE]: Bird,
  [AlertCategory.MOBILITY_ACCESS]: Route,
  [AlertCategory.PUBLIC_SAFETY]: ShieldAlert,
};

const EVIDENCE_ICONS: Record<'photo' | 'video' | 'audio' | 'note', React.ComponentType<{ className?: string }>> = {
  photo: ImageIcon,
  video: Video,
  audio: Mic,
  note: FileText,
};

// ============================================================================
// Types
// ============================================================================

export interface AlertCardProps {
  alert: AlertDisplay;
  onConfirm?: (alertId: string, action: ConfirmationActionType) => void;
  onViewDetails?: (alertId: string) => void;
  onReportDuplicate?: (alertId: string) => void;
  isNearby?: boolean;
  compact?: boolean;
  showActions?: boolean;
  userDistanceKm?: number;
}

// ============================================================================
// Helper Components
// ============================================================================

interface EvidenceBadgeProps {
  count: number;
}

function EvidenceBadge({ count }: EvidenceBadgeProps) {
  if (count === 0) return null;

  return (
    <Badge variant="info" size="sm">
      <ImageIcon className="w-3 h-3 mr-1" />
      {count}
    </Badge>
  );
}

interface ConfidenceIndicatorProps {
  state: AlertConfidenceState;
  score: number;
  size?: 'sm' | 'md';
}

function ConfidenceIndicator({ state, score, size = 'md' }: ConfidenceIndicatorProps) {
  const metadata = CONFIDENCE_METADATA[state];
  
  return (
    <div className={cn('flex items-center gap-1.5', size === 'sm' ? 'text-xs' : 'text-sm')}>
      <div className={cn('flex items-center gap-1', metadata.color)}>
        <CircleCheck className={cn(size === 'sm' ? 'w-3 h-3' : 'w-4 h-4')} />
        <span className="font-medium">{metadata.label}</span>
      </div>
      {size === 'md' && (
        <div className="w-20 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className={cn('h-full rounded-full transition-all', metadata.color.replace('text-', 'bg-'))}
            style={{ width: `${score}%` }}
          />
        </div>
      )}
    </div>
  );
}

interface SeverityBadgeProps {
  severity: AlertSeverity;
}

function SeverityBadge({ severity }: SeverityBadgeProps) {
  const metadata = SEVERITY_METADATA[severity];
  const IconComponent = metadata.icon === 'TriangleAlert' ? TriangleAlert :
                        metadata.icon === 'OctagonAlert' ? ShieldAlert :
                        metadata.icon === 'Triangle' ? TriangleAlert :
                        CircleCheck;

  return (
    <Badge variant={severity === AlertSeverity.CRITICAL ? 'danger' : severity === AlertSeverity.SERIOUS ? 'warning' : 'info'}>
      <IconComponent className="w-3 h-3 mr-1" />
      {metadata.label}
    </Badge>
  );
}

interface TimeDisplayProps {
  timeAgo: string;
  lastConfirmedAgo?: string;
  hasNewUpdates?: boolean;
}

function TimeDisplay({ timeAgo, lastConfirmedAgo, hasNewUpdates }: TimeDisplayProps) {
  return (
    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
      <div className="flex items-center gap-1">
        <Clock className="w-3 h-3" />
        <span>Reported {timeAgo}</span>
      </div>
      {lastConfirmedAgo && (
        <div className="flex items-center gap-1">
          <CircleCheck className="w-3 h-3" />
          <span>Confirmed {lastConfirmedAgo}</span>
          {hasNewUpdates && (
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          )}
        </div>
      )}
    </div>
  );
}

interface DistanceDisplayProps {
  distanceKm?: number;
}

function DistanceDisplay({ distanceKm }: DistanceDisplayProps) {
  if (!distanceKm) return null;

  return (
    <Badge variant="outline" size="sm">
      <MapPin className="w-3 h-3 mr-1" />
      {distanceKm < 1 ? `${Math.round(distanceKm * 1000)}m` : `${distanceKm.toFixed(1)}km`}
    </Badge>
  );
}

// ============================================================================
// Quick Actions Component
// ============================================================================

interface QuickActionsProps {
  alertId: string;
  onConfirm?: (alertId: string, action: ConfirmationActionType) => void;
}

function QuickActions({ alertId, onConfirm }: QuickActionsProps) {
  if (!onConfirm) return null;

  const quickActions: ConfirmationActionType[] = [
    ConfirmationActionType.STILL_ACTIVE,
    ConfirmationActionType.WORSENED,
    ConfirmationActionType.CLEARED,
    ConfirmationActionType.ADD_UPDATE,
  ];

  return (
    <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-200 dark:border-slate-700">
      {quickActions.map((action) => {
        const config = RECONFIRMATION_ACTIONS[action];
        const Icon = config.icon === 'TrendingUp' ? TrendingUp :
                     config.icon === 'TrendingDown' ? TrendingDown :
                     config.icon === 'CircleCheck' ? CircleCheck :
                     config.icon === 'Check' ? Check :
                     config.icon === 'Move' ? Move :
                     config.icon === 'CircleX' ? CircleX :
                     config.icon === 'Plus' ? Plus : CircleCheck;

        return (
          <Button
            key={action}
            variant="ghost"
            size="sm"
            onClick={() => onConfirm(alertId, action)}
            className={cn(
              'text-xs h-8 px-3',
              config.color,
              config.bgColor,
              'hover:opacity-80 transition-opacity'
            )}
          >
            <Icon className="w-3.5 h-3.5 mr-1.5" />
            {config.label}
          </Button>
        );
      })}
    </div>
  );
}

// ============================================================================
// Main AlertCard Component
// ============================================================================

export function AlertCard({
  alert,
  onConfirm,
  onViewDetails,
  onReportDuplicate,
  isNearby = false,
  compact = false,
  showActions = true,
  userDistanceKm,
}: AlertCardProps) {
  const CategoryIcon = CATEGORY_ICONS[alert.category];
  const categoryMeta = ALERT_CATEGORY_METADATA[alert.category];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0, 0, 0.2, 1],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className={cn(
          'overflow-hidden',
          'border-l-4',
          categoryMeta.borderColor,
          alert.expiryWarning && 'animate-pulse',
          isNearby && 'ring-2 ring-amber-500/50'
        )}
        padding="none"
        onClick={() => onViewDetails?.(alert.id)}
      >
        {/* Header Bar */}
        <div className={cn(
          'px-5 py-3 flex items-center justify-between',
          categoryMeta.bgColor,
          'border-b border-slate-200 dark:border-slate-700'
        )}>
          <div className="flex items-center gap-3">
            <div className={cn('p-2 rounded-lg', categoryMeta.bgColor)}>
              <CategoryIcon className={cn('w-5 h-5', categoryMeta.color)} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm leading-tight">
                {alert.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {alert.district}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <SeverityBadge severity={alert.severity} />
            <EvidenceBadge count={alert.evidenceCount} />
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-5 space-y-3">
          {/* Description */}
          <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-2">
            {alert.description}
          </p>

          {/* Metadata Row */}
          <div className="flex items-center flex-wrap gap-2">
            <DistanceDisplay distanceKm={userDistanceKm || alert.distanceFromUserKm} />
            <ConfidenceIndicator
              state={alert.confidenceState}
              score={alert.confidenceScore}
              size={compact ? 'sm' : 'md'}
            />
          </div>

          {/* Time Display */}
          <TimeDisplay
            timeAgo={alert.timeAgo}
            lastConfirmedAgo={alert.lastConfirmedAgo}
            hasNewUpdates={alert.hasNewUpdates}
          />

          {/* Safety Context */}
          {!compact && (
            <div className="flex flex-wrap gap-2 pt-2">
              {alert.safetyContext.blocked && (
                <Badge variant="danger" size="sm">
                  <CircleX className="w-3 h-3 mr-1" />
                  Blocked
                </Badge>
              )}
              {alert.safetyContext.dangerousToPass && (
                <Badge variant="warning" size="sm">
                  <TriangleAlert className="w-3 h-3 mr-1" />
                  Dangerous
                </Badge>
              )}
              {alert.safetyContext.avoidArea && (
                <Badge variant="warning" size="sm">
                  <ShieldAlert className="w-3 h-3 mr-1" />
                  Avoid Area
                </Badge>
              )}
              {alert.safetyContext.passableWithCaution && (
                <Badge variant="info" size="sm">
                  <CircleCheck className="w-3 h-3 mr-1" />
                  Passable with Caution
                </Badge>
              )}
            </div>
          )}

          {/* Expiry Warning */}
          {alert.expiryWarning && (
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs">
              <Clock className="w-3.5 h-3.5" />
              <span className="font-medium">{alert.expiryWarning}</span>
            </div>
          )}

          {/* Nearby Alert Indicator */}
          {isNearby && (
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-medium">
              <MapPin className="w-3.5 h-3.5 animate-pulse" />
              <span>Alert near your location</span>
            </div>
          )}

          {/* Quick Actions */}
          {showActions && (
            <QuickActions alertId={alert.id} onConfirm={onConfirm} />
          )}

          {/* View Details Link */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails?.(alert.id);
              }}
              className="text-sm text-forest-600 dark:text-forest-400 hover:text-forest-700 dark:hover:text-forest-300 font-medium flex items-center gap-1"
            >
              View Details
              <ChevronRight className="w-4 h-4" />
            </button>

            {onReportDuplicate && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onReportDuplicate(alert.id);
                }}
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              >
                Report Duplicate
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// ============================================================================
// Compact Alert Card (for feeds and sidebars)
// ============================================================================

export function CompactAlertCard({
  alert,
  onConfirm,
  onViewDetails,
}: AlertCardProps) {
  const CategoryIcon = CATEGORY_ICONS[alert.category];
  const categoryMeta = ALERT_CATEGORY_METADATA[alert.category];

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Card
        className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        padding="sm"
        onClick={() => onViewDetails?.(alert.id)}
      >
        <div className="flex items-center gap-3">
          <div className={cn('p-1.5 rounded-md', categoryMeta.bgColor)}>
            <CategoryIcon className={cn('w-4 h-4', categoryMeta.color)} />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-slate-900 dark:text-white truncate">
              {alert.title}
            </h4>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <span>{alert.district}</span>
              <span>•</span>
              <span>{alert.timeAgo}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <SeverityBadge severity={alert.severity} />
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// ============================================================================
// Alert Card List Component
// ============================================================================

export interface AlertCardListProps {
  alerts: AlertDisplay[];
  onConfirm?: (alertId: string, action: ConfirmationActionType) => void;
  onViewDetails?: (alertId: string) => void;
  onReportDuplicate?: (alertId: string) => void;
  compact?: boolean;
  userLat?: number;
  userLng?: number;
  emptyMessage?: string;
}

export function AlertCardList({
  alerts,
  onConfirm,
  onViewDetails,
  onReportDuplicate,
  compact = false,
  userLat,
  userLng,
  emptyMessage = 'No alerts to display',
}: AlertCardListProps) {
  if (alerts.length === 0) {
    return (
      <div className="text-center py-12">
        <TriangleAlert className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
        <p className="text-slate-500 dark:text-slate-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => {
        // Calculate distance if user location provided
        let distanceKm: number | undefined;
        if (userLat !== undefined && userLng !== undefined) {
          const R = 6371;
          const dLat = ((alert.location.coordinates.latitude - userLat) * Math.PI) / 180;
          const dLng = ((alert.location.coordinates.longitude - userLng) * Math.PI) / 180;
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((userLat * Math.PI) / 180) *
              Math.cos((alert.location.coordinates.latitude * Math.PI) / 180) *
              Math.sin(dLng / 2) *
              Math.sin(dLng / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          distanceKm = R * c;
        }

        const isNearby = (distanceKm || 999) <= 2;

        return compact ? (
          <CompactAlertCard
            key={alert.id}
            alert={alert}
            onConfirm={onConfirm}
            onViewDetails={onViewDetails}
          />
        ) : (
          <AlertCard
            key={alert.id}
            alert={alert}
            onConfirm={onConfirm}
            onViewDetails={onViewDetails}
            onReportDuplicate={onReportDuplicate}
            isNearby={isNearby}
            userDistanceKm={distanceKm}
          />
        );
      })}
    </div>
  );
}

export default AlertCard;
