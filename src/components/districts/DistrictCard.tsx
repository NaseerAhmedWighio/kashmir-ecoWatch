'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  MapPin, TrendingUp, Droplets, Leaf, AlertTriangle,
  Users, Shield, ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { DistrictIntelligenceSummary } from '@/data/district-intelligence-aggregator';
import { cn } from '@/lib/utils';

interface DistrictCardProps {
  summary: DistrictIntelligenceSummary;
  index?: number;
  compact?: boolean;
}

const riskLevelColors: Record<string, string> = {
  'critical': 'bg-red-500/20 text-red-400 border-red-500/30',
  'high': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'moderate': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'low': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
};

const riskLevelBadgeColors: Record<string, 'danger' | 'warning' | 'info' | 'success'> = {
  'critical': 'danger',
  'high': 'warning',
  'moderate': 'info',
  'low': 'success',
};

export function DistrictCard({ summary, index = 0, compact = false }: DistrictCardProps) {
  const router = useRouter();
  const { profile, riskLevel, environmentalSummary, keyHighlights } = summary;
  
  // Compute active alerts from risk stack
  const activeAlerts = profile.riskStack.flood.alerts + 
                       profile.riskStack.landslide.alerts + 
                       profile.riskStack.forestFire.alerts;

  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        <Card
          className="glass-intense border-white/10 p-4 cursor-pointer hover:border-white/20 transition-all group h-full"
          onClick={() => router.push(`/districts/${profile.slug}`)}
        >
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white line-clamp-1 group-hover:text-emerald-400 transition-colors">
                {profile.name}
              </h3>
            </div>
            <Badge
              variant={riskLevelBadgeColors[riskLevel]}
              size="sm"
              className="text-xs"
            >
              {riskLevel}
            </Badge>
          </div>

          <p className="text-xs text-slate-400 mb-3 line-clamp-2">{environmentalSummary}</p>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <Card className="glass-intense border-white/10 p-6 hover:border-emerald-500/30 transition-all group h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors mb-1">
                {profile.name}
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="capitalize">{profile.region.replace('-', ' ')}</span>
                <span>·</span>
                <span>{profile.tehsils.length} tehsils</span>
              </div>
            </div>
          </div>
          <Badge
            variant={riskLevelBadgeColors[riskLevel]}
            size="sm"
            className={cn("text-xs flex-shrink-0", riskLevelColors[riskLevel])}
          >
            Risk: {profile.scores.riskLevel}
          </Badge>
        </div>

        {/* Environmental Summary */}
        <p className="text-sm text-slate-400 leading-relaxed mb-4 line-clamp-2">
          {environmentalSummary}
        </p>

        {/* Key Highlights */}
        {keyHighlights.length > 0 && (
          <div className="space-y-2 mb-4">
            {keyHighlights.map((highlight, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                <div className="w-1 h-1 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5" />
                <span className="line-clamp-1">{highlight}</span>
              </div>
            ))}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-4 py-4 border-t border-b border-white/5">
          {/* Biodiversity */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-lg font-bold text-white">{profile.biodiversity.totalSpecies}</div>
            <div className="text-xs text-slate-500">Species</div>
          </div>

          {/* Water Systems */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <Droplets className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <div className="text-lg font-bold text-white">{profile.hydrological.waterBodies.total}</div>
            <div className="text-xs text-slate-500">Water Bodies</div>
          </div>

          {/* Alerts */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <AlertTriangle className={cn(
                "w-3.5 h-3.5",
                activeAlerts > 0 ? "text-orange-400" : "text-slate-600"
              )} />
            </div>
            <div className={cn(
              "text-lg font-bold",
              activeAlerts > 0 ? "text-orange-400" : "text-slate-600"
            )}>{activeAlerts}</div>
            <div className="text-xs text-slate-500">Active Alerts</div>
          </div>
        </div>

        {/* Additional Metadata */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <Users className="w-3.5 h-3.5" />
            <span>{(profile.population.total / 1000).toFixed(0)}K pop.</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <Shield className="w-3.5 h-3.5" />
            <span>{profile.ecological.protectedAreas.count} PAs</span>
          </div>
        </div>

        {/* Action */}
        <div className="mt-auto pt-4 border-t border-white/5">
          <Button
            size="sm"
            variant="outline"
            className="border-white/20 text-white w-full h-9 hover:border-emerald-500/50 hover:bg-emerald-500/10"
            onClick={() => router.push(`/districts/${profile.slug}`)}
            icon={<ArrowRight className="w-4 h-4" />}
          >
            View Profile
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

// Summary Stats Component
interface DistrictStatsProps {
  totalDistricts: number;
  highestRiskDistrict: string;
  mostBiodiverseDistrict: string;
  mostMonitoredDistrict: string;
  districtsActiveAlerts: number;
}

export function DistrictStats({
  totalDistricts,
  highestRiskDistrict,
  mostBiodiverseDistrict,
  mostMonitoredDistrict,
  districtsActiveAlerts,
}: DistrictStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-8 border-t border-white/10">
      <div className="text-center">
        <div className="text-3xl font-bold text-white mb-1">{totalDistricts}</div>
        <div className="text-sm text-slate-400">Districts Covered</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-red-400 mb-1">{highestRiskDistrict}</div>
        <div className="text-sm text-slate-400">Highest Risk</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-emerald-400 mb-1">{mostBiodiverseDistrict}</div>
        <div className="text-sm text-slate-400">Most Biodiverse</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-400 mb-1">{mostMonitoredDistrict}</div>
        <div className="text-sm text-slate-400">Most Monitored</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-orange-400 mb-1">{districtsActiveAlerts}</div>
        <div className="text-sm text-slate-400">Active Alert Districts</div>
      </div>
    </div>
  );
}
