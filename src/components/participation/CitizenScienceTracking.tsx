'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { citizenScienceMembers, CitizenScienceMember, getParticipationByDistrict } from '@/data/contribution-intelligence';
import { Users, Star, Calendar, MapPin, TrendingUp, Award, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CitizenScienceTrackingProps {
  compact?: boolean;
  district?: string;
}

const badgeColors: Record<string, string> = {
  'Expert Contributor': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'Bird Specialist': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Top 10 2024': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Community Guardian': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'Issue Reporter': 'bg-red-500/20 text-red-400 border-red-500/30',
  'Newcomer': 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  'Wildlife Photographer': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
};

export function CitizenScienceTracking({ compact = false, district }: CitizenScienceTrackingProps) {
  const members = district
    ? citizenScienceMembers.filter(m => m.district === district)
    : citizenScienceMembers;

  const totalMembers = citizenScienceMembers.length;
  const activeMembers = citizenScienceMembers.filter(m => m.status === 'active').length;

  const topContributors = [...members].sort(
    (a, b) => (b.contributions.issues + b.contributions.sightings + b.contributions.datasets) -
              (a.contributions.issues + a.contributions.sightings + a.contributions.datasets)
  ).slice(0, 5);

  if (compact) {
    return (
      <Card className="glass-intense border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-400" />
            Citizen Science Members
          </h3>
          <Badge variant="secondary" size="sm">{activeMembers} active</Badge>
        </div>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{totalMembers}</div>
            <div className="text-xs text-slate-400">Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-400">{activeMembers}</div>
            <div className="text-xs text-slate-400">Active</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">
              {members.reduce((acc, m) => acc + m.contributions.sightings, 0)}
            </div>
            <div className="text-xs text-slate-400">Sightings</div>
          </div>
        </div>
        <div className="space-y-3">
          {topContributors.slice(0, 3).map((member, index) => (
            <div key={member.id} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-xs font-bold text-white">
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-white">{member.name}</div>
                <div className="text-xs text-slate-400">{member.district}</div>
              </div>
              <div className="text-xs text-slate-400">
                {member.contributions.sightings} sightings
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="glass-intense border-white/10 p-5 text-center">
          <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <div className="text-3xl font-bold text-white mb-1">{totalMembers}</div>
          <div className="text-sm text-slate-400">Total Members</div>
        </Card>
        <Card className="glass-intense border-white/10 p-5 text-center">
          <Activity className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
          <div className="text-3xl font-bold text-white mb-1">{activeMembers}</div>
          <div className="text-sm text-slate-400">Active Members</div>
        </Card>
        <Card className="glass-intense border-white/10 p-5 text-center">
          <Award className="w-8 h-8 text-amber-400 mx-auto mb-2" />
          <div className="text-3xl font-bold text-white mb-1">
            {members.reduce((acc, m) => acc + m.badges.length, 0)}
          </div>
          <div className="text-sm text-slate-400">Badges Earned</div>
        </Card>
        <Card className="glass-intense border-white/10 p-5 text-center">
          <TrendingUp className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <div className="text-3xl font-bold text-white mb-1">
            {members.reduce((acc, m) => acc + m.contributions.sightings + m.contributions.issues + m.contributions.datasets, 0)}
          </div>
          <div className="text-sm text-slate-400">Total Contributions</div>
        </Card>
      </div>

      {/* Top Contributors */}
      <Card className="glass-intense border-white/10 p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-400" />
          Top Contributors
        </h3>
        <div className="space-y-3">
          {topContributors.map((member, index) => {
            const totalContributions = member.contributions.issues + member.contributions.sightings + member.contributions.datasets;
            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white">{member.name}</div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {member.district}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Joined {new Date(member.joinedDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-white">{totalContributions}</div>
                      <div className="text-xs text-slate-400">contributions</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs">
                    <span className="text-emerald-400">{member.contributions.sightings} sightings</span>
                    <span className="text-red-400">{member.contributions.issues} issues</span>
                    <span className="text-blue-400">{member.contributions.datasets} datasets</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Card>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map((member, index) => {
          const totalContributions = member.contributions.issues + member.contributions.sightings + member.contributions.datasets;
          return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="glass-intense border-white/10 p-5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-lg font-bold text-white flex-shrink-0">
                    {member.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-bold text-white mb-1">{member.name}</h4>
                    <div className="flex items-center gap-1 text-xs text-slate-400">
                      <MapPin className="w-3 h-3" />
                      {member.district}
                    </div>
                  </div>
                  <Badge variant={member.status === 'active' ? 'success' : 'secondary'} size="sm">
                    {member.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center p-2 rounded-lg bg-slate-800/50">
                    <div className="text-lg font-bold text-emerald-400">{member.contributions.sightings}</div>
                    <div className="text-xs text-slate-500">Sightings</div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-slate-800/50">
                    <div className="text-lg font-bold text-red-400">{member.contributions.issues}</div>
                    <div className="text-xs text-slate-500">Issues</div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-slate-800/50">
                    <div className="text-lg font-bold text-blue-400">{member.contributions.datasets}</div>
                    <div className="text-xs text-slate-500">Datasets</div>
                  </div>
                </div>

                {member.badges.length > 0 && (
                  <div>
                    <div className="text-xs text-slate-500 mb-2">Badges & Recognition</div>
                    <div className="flex flex-wrap gap-1">
                      {member.badges.slice(0, 3).map(badge => (
                        <Badge
                          key={badge}
                          variant="outline"
                          size="sm"
                          className={cn("text-xs", badgeColors[badge] || "border-white/20 text-slate-400")}
                        >
                          <Award className="w-3 h-3 mr-0.5" />
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
