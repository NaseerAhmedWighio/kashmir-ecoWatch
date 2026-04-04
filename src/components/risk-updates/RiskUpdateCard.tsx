'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  TrendingUp, TrendingDown, Minus, Eye, AlertTriangle,
  MapPin, Calendar, ArrowRight, Link as LinkIcon, Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  RiskUpdate,
  hazardTypeLabels,
  hazardTypeColors,
  riskTrendLabels,
  riskTrendColors,
  severityLabels,
  severityColors,
  linkedAlertStatusLabels,
} from '@/data/risk-updates-intelligence';
import { cn } from '@/lib/utils';

interface RiskUpdateCardProps {
  update: RiskUpdate;
  index?: number;
  compact?: boolean;
}

const trendIcons: Record<string, React.ElementType> = {
  'increasing': TrendingUp,
  'stable': Minus,
  'elevated': AlertTriangle,
  'improving': TrendingDown,
  'under-watch': Eye,
};

export function RiskUpdateCard({ update, index = 0, compact = false }: RiskUpdateCardProps) {
  const router = useRouter();
  const TrendIcon = trendIcons[update.trend] || Minus;

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <Card
          className="glass-intense border-white/10 p-4 cursor-pointer hover:border-white/20 transition-all group h-full"
          onClick={() => router.push(`/risk-updates/${update.id}`)}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <Badge
              variant="outline"
              size="sm"
              className={cn("text-xs", hazardTypeColors[update.hazardType])}
            >
              {hazardTypeLabels[update.hazardType]}
            </Badge>
            <Badge
              variant="outline"
              size="sm"
              className={cn("text-xs", severityColors[update.severity])}
            >
              {severityLabels[update.severity]}
            </Badge>
          </div>

          <h3 className="text-sm font-bold text-white mb-2 line-clamp-2 group-hover:text-indigo-400 transition-colors">
            {update.title}
          </h3>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Calendar className="w-3 h-3" />
            {new Date(update.updatedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <Card className="glass-intense border-white/10 p-6 hover:border-indigo-500/30 transition-all group">
        <div className="flex items-start gap-4">
          {/* Hazard Icon */}
          <div className={cn(
            "w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0",
            hazardTypeColors[update.hazardType]
          )}>
            <AlertTriangle className="w-7 h-7" />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                {update.title}
              </h3>
              <Badge
                variant="outline"
                size="sm"
                className={cn("text-xs flex-shrink-0", severityColors[update.severity])}
              >
                {severityLabels[update.severity]}
              </Badge>
            </div>

            {/* Metadata Row */}
            <div className="flex flex-wrap items-center gap-3 mb-3 text-xs">
              {/* Hazard Type */}
              <Badge
                variant="outline"
                size="sm"
                className={hazardTypeColors[update.hazardType]}
              >
                {hazardTypeLabels[update.hazardType]}
              </Badge>

              {/* Trend */}
              <div className="flex items-center gap-1.5">
                <TrendIcon className={cn("w-3.5 h-3.5", riskTrendColors[update.trend])} />
                <span className={cn("font-medium", riskTrendColors[update.trend])}>
                  {riskTrendLabels[update.trend]}
                </span>
              </div>

              {/* Date */}
              <div className="flex items-center gap-1.5 text-slate-500">
                <Calendar className="w-3 h-3" />
                {new Date(update.updatedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </div>

            {/* Affected Geography */}
            <div className="flex flex-wrap items-center gap-2 mb-3 text-xs text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              {update.affectedGeographies.slice(0, 3).map((geo, i) => (
                <span key={i} className="text-slate-300">
                  {geo.name}
                  {i < Math.min(update.affectedGeographies.length, 3) - 1 && ', '}
                </span>
              ))}
              {update.affectedGeographies.length > 3 && (
                <span className="text-indigo-400">+{update.affectedGeographies.length - 3} more</span>
              )}
            </div>

            {/* Assessment Summary */}
            <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
              {update.assessmentSummary}
            </p>

            {/* Linked Alert Status */}
            {update.linkedAlertStatus !== 'none' && (
              <div className="flex items-center gap-2 mb-4 text-xs">
                <LinkIcon className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-slate-500">Linked alert status:</span>
                <Badge variant="outline" size="sm" className="text-indigo-400 border-indigo-500/30 bg-indigo-500/10">
                  {linkedAlertStatusLabels[update.linkedAlertStatus]}
                </Badge>
              </div>
            )}

            {/* Action */}
            <Button
              variant="ghost"
              size="sm"
              className="text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 p-0 h-auto"
              onClick={() => router.push(`/risk-updates/${update.id}`)}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Open Assessment
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// Summary Stats Component
interface RiskUpdateStatsProps {
  totalUpdates: number;
  activeUpdates: number;
  highSeverity: number;
  districtsAffected: number;
  latestAssessment: string | null;
}

export function RiskUpdateStats({
  totalUpdates,
  activeUpdates,
  highSeverity,
  districtsAffected,
  latestAssessment,
}: RiskUpdateStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-8 border-t border-white/10">
      <div className="text-center">
        <div className="text-3xl font-bold text-white mb-1">{activeUpdates}</div>
        <div className="text-sm text-slate-400">Active Updates</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-red-400 mb-1">{highSeverity}</div>
        <div className="text-sm text-slate-400">High Severity</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-white mb-1">{districtsAffected}</div>
        <div className="text-sm text-slate-400">Districts Affected</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-amber-400 mb-1">{totalUpdates - activeUpdates}</div>
        <div className="text-sm text-slate-400">Elevated Zones</div>
      </div>
      <div className="text-center col-span-2 md:col-span-1">
        <div className="text-lg font-bold text-white mb-1 flex items-center justify-center gap-2">
          <Clock className="w-4 h-4 text-indigo-400" />
          {latestAssessment
            ? new Date(latestAssessment).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })
            : 'N/A'}
        </div>
        <div className="text-sm text-slate-400">Latest Assessment</div>
      </div>
    </div>
  );
}
