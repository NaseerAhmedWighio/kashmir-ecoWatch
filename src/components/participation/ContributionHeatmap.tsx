'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { DistrictParticipation, districtParticipation } from '@/data/contribution-intelligence';
import { MapPin, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContributionHeatmapProps {
  compact?: boolean;
  onSelectDistrict?: (district: string) => void;
}

const intensityColors: Record<string, string> = {
  'very-high': 'bg-emerald-500',
  'high': 'bg-green-500',
  'medium': 'bg-blue-500',
  'low': 'bg-amber-500',
  'very-low': 'bg-slate-500',
};

const getIntensityLevel = (contributions: number, max: number): string => {
  const ratio = contributions / max;
  if (ratio >= 0.8) return 'very-high';
  if (ratio >= 0.6) return 'high';
  if (ratio >= 0.4) return 'medium';
  if (ratio >= 0.2) return 'low';
  return 'very-low';
};

export function ContributionHeatmap({ compact = false, onSelectDistrict }: ContributionHeatmapProps) {
  const maxContributions = Math.max(...districtParticipation.map(d => d.totalContributions));

  if (compact) {
    return (
      <Card className="glass-intense border-white/10 p-6">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-emerald-400" />
          District Participation Heatmap
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {districtParticipation.slice(0, 8).map((district) => {
            const intensity = getIntensityLevel(district.totalContributions, maxContributions);
            return (
              <div
                key={district.district}
                className={cn(
                  "rounded-lg p-2 text-center cursor-pointer hover:opacity-80 transition-opacity",
                  intensityColors[intensity],
                  "bg-opacity-20 border border-white/10"
                )}
                onClick={() => onSelectDistrict?.(district.district)}
              >
                <div className="text-xs font-medium text-white truncate">{district.district}</div>
                <div className="text-xs text-slate-300">{district.totalContributions}</div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Low</span>
            <div className="flex gap-1">
              <div className="w-4 h-4 rounded bg-slate-500/20" />
              <div className="w-4 h-4 rounded bg-amber-500/20" />
              <div className="w-4 h-4 rounded bg-blue-500/20" />
              <div className="w-4 h-4 rounded bg-green-500/20" />
              <div className="w-4 h-4 rounded bg-emerald-500/20" />
            </div>
            <span className="text-xs text-slate-400">High</span>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass-intense border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <MapPin className="w-6 h-6 text-emerald-400" />
          District Participation Heatmap
        </h3>
        <Badge variant="info" size="sm">
          {districtParticipation.length} Districts
        </Badge>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        {districtParticipation.map((district) => {
          const intensity = getIntensityLevel(district.totalContributions, maxContributions);
          const TrendIcon = district.trend === 'increasing' ? TrendingUp : district.trend === 'decreasing' ? TrendingDown : Minus;
          const trendColor = district.trend === 'increasing' ? 'text-emerald-400' : district.trend === 'decreasing' ? 'text-red-400' : 'text-slate-400';

          return (
            <div
              key={district.district}
              className={cn(
                "rounded-xl p-4 cursor-pointer hover:scale-105 transition-all border",
                intensityColors[intensity],
                "bg-opacity-10 hover:bg-opacity-20 border-white/10"
              )}
              onClick={() => onSelectDistrict?.(district.district)}
            >
              <div className="flex items-center justify-between mb-2">
                <MapPin className={cn("w-4 h-4", trendColor)} />
                <TrendIcon className={cn("w-3 h-3", trendColor)} />
              </div>
              <div className="text-sm font-bold text-white mb-1 truncate">{district.district}</div>
              <div className="text-2xl font-bold text-white mb-1">{district.totalContributions}</div>
              <div className="text-xs text-slate-400">contributions</div>
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                <span className="text-xs text-slate-500">{district.members} members</span>
                <Badge variant="outline" size="sm" className="text-xs">
                  {district.resolutionRate}% resolved
                </Badge>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/10">
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">Intensity:</span>
          <div className="flex gap-1">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-slate-500/30" />
              <span className="text-xs text-slate-500">&lt;20%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-amber-500/30" />
              <span className="text-xs text-slate-500">20-40%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-blue-500/30" />
              <span className="text-xs text-slate-500">40-60%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-green-500/30" />
              <span className="text-xs text-slate-500">60-80%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-emerald-500/30" />
              <span className="text-xs text-slate-500">80%+</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-emerald-400" />
            Increasing
          </span>
          <span className="flex items-center gap-1">
            <TrendingDown className="w-3 h-3 text-red-400" />
            Decreasing
          </span>
        </div>
      </div>
    </Card>
  );
}

export function DistrictParticipationCard({ district }: { district: DistrictParticipation }) {
  const maxContributions = Math.max(...districtParticipation.map(d => d.totalContributions));
  const intensity = getIntensityLevel(district.totalContributions, maxContributions);
  const TrendIcon = district.trend === 'increasing' ? TrendingUp : district.trend === 'decreasing' ? TrendingDown : Minus;
  const trendColor = district.trend === 'increasing' ? 'text-emerald-400' : district.trend === 'decreasing' ? 'text-red-400' : 'text-slate-400';

  return (
    <Card className="glass-intense border-white/10 p-5">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center", intensityColors[intensity], "bg-opacity-20")}>
            <MapPin className={cn("w-5 h-5", intensityColors[intensity].replace('bg-', 'text-'))} />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">{district.district}</h4>
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <TrendIcon className={cn("w-3 h-3", trendColor)} />
              {district.trend === 'increasing' ? 'Growing' : district.trend === 'decreasing' ? 'Declining' : 'Stable'}
            </div>
          </div>
        </div>
        <Badge variant="outline" size="sm" className="text-xs">
          {district.resolutionRate}% resolved
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Total Contributions</span>
          <span className="text-white font-semibold">{district.totalContributions}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Verified</span>
          <span className="text-emerald-400 font-semibold">{district.verifiedContributions}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Pending</span>
          <span className="text-amber-400 font-semibold">{district.pendingContributions}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Active Members</span>
          <span className="text-blue-400 font-semibold">{district.activeMembers}/{district.members}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-2 bg-slate-800 rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all", intensityColors[intensity])}
          style={{ width: `${(district.totalContributions / maxContributions) * 100}%` }}
        />
      </div>
    </Card>
  );
}
