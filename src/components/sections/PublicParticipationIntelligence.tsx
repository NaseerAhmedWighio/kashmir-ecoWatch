'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import {
  AlertTriangle, Eye, Database, Users, ArrowRight,
  TrendingUp, CheckCircle2, Clock, MapPin, Activity
} from 'lucide-react';
import { motion } from 'framer-motion';
import { participationMetrics as metrics, recentActivity, districtParticipation } from '@/data/contribution-intelligence';
import { ParticipationMetricsStrip } from '@/components/participation/ParticipationMetricsStrip';
import { ContributionHeatmap } from '@/components/participation/ContributionHeatmap';
import { ReportedIssuesDashboard } from '@/components/participation/ReportedIssuesDashboard';
import { SightingsIntelligence } from '@/components/participation/SightingsIntelligence';
import { ContributedDatasets } from '@/components/participation/ContributedDatasets';
import { CitizenScienceTracking } from '@/components/participation/CitizenScienceTracking';

const contributionPathways = [
  {
    id: 'report-issue',
    title: 'Report an Issue',
    purpose: 'Report environmental hazards, pollution, or ecological concerns',
    icon: AlertTriangle,
    color: 'from-red-500 to-orange-600',
    route: '/report-issue',
    count: metrics.totalIssues,
    newCount: metrics.newThisWeek,
    newLabel: 'New this week',
  },
  {
    id: 'submit-sighting',
    title: 'Submit Sighting',
    purpose: 'Document wildlife, bird, or species sightings for research',
    icon: Eye,
    color: 'from-emerald-500 to-green-600',
    route: '/submit-sighting',
    count: metrics.totalSightings,
    newCount: metrics.newThisMonth,
    newLabel: 'This month',
  },
  {
    id: 'contribute-data',
    title: 'Contribute Data',
    purpose: 'Share research datasets, monitoring data, or field observations',
    icon: Database,
    color: 'from-blue-500 to-indigo-600',
    route: '/contribute-data',
    count: metrics.totalDatasets,
    newCount: 12,
    newLabel: 'New datasets',
  },
  {
    id: 'citizen-science',
    title: 'Citizen Science',
    purpose: 'Join community monitoring programs and volunteer initiatives',
    icon: Users,
    color: 'from-violet-500 to-purple-600',
    route: '/citizen-science',
    count: metrics.totalMembers,
    newCount: 34,
    newLabel: 'New volunteers',
  },
];

export function PublicParticipationIntelligence() {
  const router = useRouter();

  return (
    <section className="pt-16 md:pt-20 pb-16 md:pb-20 bg-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Activity className="w-5 h-5 text-emerald-400" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full signal-pulse" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Live Intelligence Layer
            </span>
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 sm:mb-4 tracking-tight">
                Public Participation Intelligence
              </h2>
              <p className="text-slate-400 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed">
                Real-time community-contributed environmental data, citizen science programs,
                and public participation across Kashmir's ecological monitoring network.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="border-white/20 text-white w-full sm:w-auto text-xs sm:text-sm" onClick={() => router.push('/report-issue')}>
                <AlertTriangle className="w-4 h-4 mr-2" />
                Report Issue
              </Button>
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 w-full sm:w-auto text-xs sm:text-sm" onClick={() => router.push('/submit-sighting')}>
                <Eye className="w-4 h-4 mr-2" />
                Submit Sighting
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Live Metrics Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <ParticipationMetricsStrip variant="default" />
        </motion.div>

        {/* Contribution Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <ContributionHeatmap />
        </motion.div>

        {/* Contribution Pathway Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white">Contribution Pathways</h3>
            <Button variant="ghost" size="sm" className="text-indigo-400 w-full sm:w-auto text-xs sm:text-sm" onClick={() => router.push('/contribute-data')}>
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {contributionPathways.map((pathway, index) => (
              <motion.div
                key={pathway.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-light border-white/10 hover:border-white/20 transition-all p-4 sm:p-6 h-full group">
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${pathway.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <pathway.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xl sm:text-2xl font-bold text-white mb-1">
                        {pathway.count.toLocaleString()}
                      </div>
                      <div className="text-xs text-emerald-400 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {pathway.newCount} {pathway.newLabel}
                      </div>
                    </div>
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {pathway.title}
                  </h4>
                  <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                    {pathway.purpose}
                  </p>
                  <Button
                    size="sm"
                    className={`w-full bg-gradient-to-r ${pathway.color} hover:opacity-90 text-white text-xs sm:text-sm`}
                    onClick={() => router.push(pathway.route)}
                  >
                    <span>Get Involved</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Live Intelligence Dashboards */}
        <div className="space-y-8 sm:space-y-10 md:space-y-12">
          {/* Reported Issues Intelligence */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-6">
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
                  Reported Issues Intelligence
                </h3>
                <p className="text-slate-400 text-sm mt-1">Track, verify, and resolve community-reported environmental issues</p>
              </div>
              <Button variant="outline" className="border-white/20 text-white w-full sm:w-auto text-xs sm:text-sm" onClick={() => router.push('/report-issue')}>
                View All Issues
              </Button>
            </div>
            <ReportedIssuesDashboard compact />
          </motion.div>

          {/* Submitted Sightings Intelligence */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-6">
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                  <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                  Submitted Sightings Intelligence
                </h3>
                <p className="text-slate-400 text-sm mt-1">Wildlife and biodiversity observations from citizen scientists</p>
              </div>
              <Button variant="outline" className="border-white/20 text-white w-full sm:w-auto text-xs sm:text-sm" onClick={() => router.push('/trails-sightings')}>
                View All Sightings
              </Button>
            </div>
            <SightingsIntelligence compact />
          </motion.div>

          {/* Contributed Datasets Intelligence */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-6">
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                  <Database className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                  Contributed Datasets Intelligence
                </h3>
                <p className="text-slate-400 text-sm mt-1">Research data and monitoring datasets from the community</p>
              </div>
              <Button variant="outline" className="border-white/20 text-white w-full sm:w-auto text-xs sm:text-sm" onClick={() => router.push('/library')}>
                View Library
              </Button>
            </div>
            <ContributedDatasets compact />
          </motion.div>

          {/* Citizen Science Tracking */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-6">
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                  Citizen Science Enrollment & Activity
                </h3>
                <p className="text-slate-400 text-sm mt-1">Community members driving environmental monitoring</p>
              </div>
              <Button variant="outline" className="border-white/20 text-white w-full sm:w-auto text-xs sm:text-sm" onClick={() => router.push('/citizen-science')}>
                Join Program
              </Button>
            </div>
            <CitizenScienceTracking compact />
          </motion.div>
        </div>

        {/* Recent Activity & District Coverage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-8 sm:mt-10 md:mt-12 items-stretch">
          {/* Recent Participation Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col min-h-0"
          >
            <h3 className="text-lg sm:text-xl font-bold text-white mb-4 flex items-center gap-2 flex-shrink-0 px-1">
              <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
              Recent Community Activity
            </h3>
            <Card className="glass-light border-white/10 flex-1">
              <div className="divide-y divide-white/[0.06]">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex gap-3 px-5 py-4 min-h-[72px]">
                    <div className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                      activity.type === 'issue' ? 'bg-red-400' :
                      activity.type === 'sighting' ? 'bg-emerald-400' :
                      activity.type === 'dataset' ? 'bg-blue-400' : 'bg-purple-400'
                    }`} />
                    <div className="flex flex-col justify-center min-w-0 flex-1">
                      <p className="text-sm text-white leading-snug">{activity.title}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                        <Badge variant="outline" size="sm" className="h-5 text-xs">
                          {activity.type}
                        </Badge>
                        <span className="text-xs text-slate-500">{activity.district}</span>
                        <span className="text-xs text-slate-600">•</span>
                        <span className="text-xs text-slate-500">{activity.timestamp}</span>
                        <span className="text-xs text-slate-600">•</span>
                        <span className="text-xs text-slate-500">by {activity.contributor}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* District Coverage Snapshot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col min-h-0"
          >
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-2 flex-shrink-0 px-1">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
              District Participation Rates
            </h3>
            <Card className="glass-light border-white/10 flex-1">
              <div className="divide-y divide-white/[0.06]">
                {districtParticipation.slice(0, 6).map((item) => (
                  <div key={item.district} className="flex items-center justify-between gap-3 px-5 py-4 min-h-[72px]">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                        item.trend === 'increasing' ? 'bg-emerald-400' :
                        item.trend === 'decreasing' ? 'bg-red-400' : 'bg-blue-400'
                      }`} />
                      <span className="truncate text-sm sm:text-base font-medium text-white">{item.district}</span>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <div className="text-right flex flex-col justify-center">
                        <div className="text-lg sm:text-xl font-semibold text-white leading-tight">{item.totalContributions}</div>
                        <div className="text-xs sm:text-sm text-slate-500">{item.verifiedContributions} verified</div>
                      </div>
                      <Badge
                        variant={item.trend === 'increasing' ? 'success' :
                                 item.trend === 'decreasing' ? 'danger' : 'info'}
                        size="sm"
                        className="shrink-0"
                      >
                        {item.trend === 'increasing' ? '↑' : item.trend === 'decreasing' ? '↓' : '→'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
