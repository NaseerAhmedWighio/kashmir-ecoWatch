'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { participationMetrics, calculateVerificationRate, calculateResolutionRate, getTopContributingDistricts } from '@/data/contribution-intelligence';
import { AlertTriangle, Eye, Database, Users, TrendingUp, CheckCircle2, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface ParticipationMetricsStripProps {
  variant?: 'default' | 'compact' | 'detailed';
}

export function ParticipationMetricsStrip({ variant = 'default' }: ParticipationMetricsStripProps) {
  const verificationRate = calculateVerificationRate();
  const resolutionRate = calculateResolutionRate();
  const topDistricts = getTopContributingDistricts();

  if (variant === 'compact') {
    return (
      <div className="grid grid-cols-4 gap-4">
        <Card className="glass-intense border-white/10 p-4 text-center">
          <AlertTriangle className="w-5 h-5 text-red-400 mx-auto mb-1" />
          <div className="text-2xl font-bold text-white">{participationMetrics.totalIssues}</div>
          <div className="text-xs text-slate-400">Issues</div>
        </Card>
        <Card className="glass-intense border-white/10 p-4 text-center">
          <Eye className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
          <div className="text-2xl font-bold text-white">{participationMetrics.totalSightings}</div>
          <div className="text-xs text-slate-400">Sightings</div>
        </Card>
        <Card className="glass-intense border-white/10 p-4 text-center">
          <Database className="w-5 h-5 text-blue-400 mx-auto mb-1" />
          <div className="text-2xl font-bold text-white">{participationMetrics.totalDatasets}</div>
          <div className="text-xs text-slate-400">Datasets</div>
        </Card>
        <Card className="glass-intense border-white/10 p-4 text-center">
          <Users className="w-5 h-5 text-purple-400 mx-auto mb-1" />
          <div className="text-2xl font-bold text-white">{participationMetrics.totalMembers}</div>
          <div className="text-xs text-slate-400">Members</div>
        </Card>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className="space-y-6">
        {/* Main Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="glass-intense border-white/10 p-6">
              <div className="flex items-center justify-between mb-3">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <Badge variant="danger" size="sm">{participationMetrics.pendingIssues} pending</Badge>
              </div>
              <div className="text-4xl font-bold text-white mb-2">{participationMetrics.totalIssues}</div>
              <div className="text-sm text-slate-400 mb-3">Reported Issues</div>
              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3 h-3" />
                  {participationMetrics.verifiedIssues} verified
                </span>
                <span className="text-slate-500">•</span>
                <span className="flex items-center gap-1 text-blue-400">
                  <TrendingUp className="w-3 h-3" />
                  {participationMetrics.newThisWeek} this week
                </span>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="glass-intense border-white/10 p-6">
              <div className="flex items-center justify-between mb-3">
                <Eye className="w-6 h-6 text-emerald-400" />
                <Badge variant="success" size="sm">{participationMetrics.verifiedSightings} verified</Badge>
              </div>
              <div className="text-4xl font-bold text-white mb-2">{participationMetrics.totalSightings}</div>
              <div className="text-sm text-slate-400 mb-3">Submitted Sightings</div>
              <div className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1 text-amber-400">
                  <CheckCircle2 className="w-3 h-3" />
                  {participationMetrics.pendingSightings} pending
                </span>
                <span className="text-slate-500">•</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <TrendingUp className="w-3 h-3" />
                  {participationMetrics.newThisMonth} this month
                </span>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="glass-intense border-white/10 p-6">
              <div className="flex items-center justify-between mb-3">
                <Database className="w-6 h-6 text-blue-400" />
                <Badge variant="info" size="sm">Published</Badge>
              </div>
              <div className="text-4xl font-bold text-white mb-2">{participationMetrics.totalDatasets}</div>
              <div className="text-sm text-slate-400 mb-3">Contributed Datasets</div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Research & monitoring data</span>
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="glass-intense border-white/10 p-6">
              <div className="flex items-center justify-between mb-3">
                <Users className="w-6 h-6 text-purple-400" />
                <Badge variant="secondary" size="sm">{participationMetrics.activeDistricts} districts</Badge>
              </div>
              <div className="text-4xl font-bold text-white mb-2">{participationMetrics.totalMembers}</div>
              <div className="text-sm text-slate-400 mb-3">Citizen Science Members</div>
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <TrendingUp className="w-3 h-3" />
                <span>Community growing</span>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Quality Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-intense border-white/10 p-6">
            <h4 className="text-sm font-semibold text-white mb-4">Verification Rate</h4>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold text-white mb-1">{verificationRate}%</div>
                <div className="text-xs text-slate-400">Of contributions verified</div>
              </div>
              <div className="w-24 h-24 relative">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-slate-800"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(verificationRate / 100) * 251.2} 251.2`}
                    className="text-emerald-400"
                  />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="glass-intense border-white/10 p-6">
            <h4 className="text-sm font-semibold text-white mb-4">Resolution Rate</h4>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-bold text-white mb-1">{resolutionRate}%</div>
                <div className="text-xs text-slate-400">Of issues resolved</div>
              </div>
              <div className="w-24 h-24 relative">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-slate-800"
                  />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${(resolutionRate / 100) * 251.2} 251.2`}
                    className="text-blue-400"
                  />
                </svg>
              </div>
            </div>
          </Card>

          <Card className="glass-intense border-white/10 p-6">
            <h4 className="text-sm font-semibold text-white mb-4">Top Contributing Districts</h4>
            <div className="space-y-2">
              {topDistricts.map((district, index) => (
                <div key={district.district} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-xs font-bold text-slate-500 w-4">#{index + 1}</div>
                    <MapPin className="w-3 h-3 text-emerald-400" />
                    <span className="text-sm text-white">{district.district}</span>
                  </div>
                  <div className="text-sm font-semibold text-white">{district.totalContributions}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <Card className="glass-intense border-white/10 p-6 text-center">
        <AlertTriangle className="w-6 h-6 text-red-400 mx-auto mb-3" />
        <div className="text-4xl font-bold text-white mb-2">{participationMetrics.totalIssues.toLocaleString()}</div>
        <div className="text-sm text-slate-400 mb-2">Reported Issues</div>
        <div className="flex items-center justify-center gap-1 text-xs text-emerald-400">
          <TrendingUp className="w-3 h-3" />
          {participationMetrics.newThisWeek} this week
        </div>
      </Card>

      <Card className="glass-intense border-white/10 p-6 text-center">
        <Eye className="w-6 h-6 text-emerald-400 mx-auto mb-3" />
        <div className="text-4xl font-bold text-white mb-2">{participationMetrics.totalSightings.toLocaleString()}</div>
        <div className="text-sm text-slate-400 mb-2">Submitted Sightings</div>
        <div className="flex items-center justify-center gap-1 text-xs text-emerald-400">
          <TrendingUp className="w-3 h-3" />
          {participationMetrics.newThisMonth} this month
        </div>
      </Card>

      <Card className="glass-intense border-white/10 p-6 text-center">
        <Database className="w-6 h-6 text-blue-400 mx-auto mb-3" />
        <div className="text-4xl font-bold text-white mb-2">{participationMetrics.totalDatasets.toLocaleString()}</div>
        <div className="text-sm text-slate-400 mb-2">Contributed Datasets</div>
        <div className="flex items-center justify-center gap-1 text-xs text-slate-400">
          <CheckCircle2 className="w-3 h-3" />
          {participationMetrics.verifiedIssues} verified
        </div>
      </Card>

      <Card className="glass-intense border-white/10 p-6 text-center">
        <Users className="w-6 h-6 text-purple-400 mx-auto mb-3" />
        <div className="text-4xl font-bold text-white mb-2">{participationMetrics.totalMembers.toLocaleString()}</div>
        <div className="text-sm text-slate-400 mb-2">Citizen Science Members</div>
        <div className="flex items-center justify-center gap-1 text-xs text-emerald-400">
          <MapPin className="w-3 h-3" />
          {participationMetrics.activeDistricts} districts
        </div>
      </Card>
    </div>
  );
}
