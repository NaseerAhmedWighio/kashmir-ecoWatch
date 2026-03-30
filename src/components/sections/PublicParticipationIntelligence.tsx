'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  AlertTriangle, Eye, Database, Users, ArrowRight,
  TrendingUp, CheckCircle2, Clock, MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';

// Mock data - replace with real API calls
const participationMetrics = {
  reportedIssues: 342,
  submittedSightings: 1256,
  contributedDatasets: 89,
  citizenScienceMembers: 2847,
  openIssues: 45,
  verifiedIssues: 267,
  resolvedIssues: 30,
  newThisWeek: 23,
  sightingsThisMonth: 156,
  activeDistricts: 18,
};

const contributionPathways = [
  {
    id: 'report-issue',
    title: 'Report an Issue',
    purpose: 'Report environmental hazards, pollution, or ecological concerns',
    icon: AlertTriangle,
    color: 'from-red-500 to-orange-600',
    route: '/report-issue',
    count: participationMetrics.reportedIssues,
    newCount: participationMetrics.newThisWeek,
    newLabel: 'New this week',
  },
  {
    id: 'submit-sighting',
    title: 'Submit Sighting',
    purpose: 'Document wildlife, bird, or species sightings for research',
    icon: Eye,
    color: 'from-emerald-500 to-green-600',
    route: '/submit-sighting',
    count: participationMetrics.submittedSightings,
    newCount: participationMetrics.sightingsThisMonth,
    newLabel: 'This month',
  },
  {
    id: 'contribute-data',
    title: 'Contribute Data',
    purpose: 'Share research datasets, monitoring data, or field observations',
    icon: Database,
    color: 'from-blue-500 to-indigo-600',
    route: '/contribute-data',
    count: participationMetrics.contributedDatasets,
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
    count: participationMetrics.citizenScienceMembers,
    newCount: 34,
    newLabel: 'New volunteers',
  },
];

const recentActivity = [
  { type: 'issue', text: 'Wetland pollution reported in Srinagar', time: '2h ago', district: 'Srinagar' },
  { type: 'sighting', text: 'Black Bear sighting submitted in Dachigam', time: '5h ago', district: 'Srinagar' },
  { type: 'dataset', text: 'Water quality data contributed for Dal Lake', time: '1d ago', district: 'Srinagar' },
  { type: 'member', text: 'New citizen science volunteers enrolled in Ganderbal', time: '1d ago', district: 'Ganderbal' },
  { type: 'sighting', text: 'Common Teal migration sighting in Hokersar', time: '2d ago', district: 'Srinagar' },
];

const districtParticipation = [
  { district: 'Srinagar', contributions: 456, status: 'most-active' },
  { district: 'Anantnag', contributions: 234, status: 'high' },
  { district: 'Baramulla', contributions: 198, status: 'high' },
  { district: 'Ganderbal', contributions: 187, status: 'moderate' },
];

export function PublicParticipationIntelligence() {
  return (
    <section className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Users className="w-5 h-5 text-emerald-400" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full signal-pulse" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Community Intelligence
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                Public Participation Intelligence
              </h2>
              <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
                Community-contributed environmental data, citizen science programs,
                and public participation in Kashmir's ecological monitoring network.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Metrics Ribbon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="glass-intense border-white/10 p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                {participationMetrics.reportedIssues.toLocaleString()}
              </div>
              <div className="text-sm text-slate-400 mb-2">Reported Issues</div>
              <div className="flex items-center justify-center gap-1 text-xs text-emerald-400">
                <TrendingUp className="w-3 h-3" />
                {participationMetrics.newThisWeek} this week
              </div>
            </Card>

            <Card className="glass-intense border-white/10 p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Eye className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                {participationMetrics.submittedSightings.toLocaleString()}
              </div>
              <div className="text-sm text-slate-400 mb-2">Submitted Sightings</div>
              <div className="flex items-center justify-center gap-1 text-xs text-emerald-400">
                <TrendingUp className="w-3 h-3" />
                {participationMetrics.sightingsThisMonth} this month
              </div>
            </Card>

            <Card className="glass-intense border-white/10 p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Database className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                {participationMetrics.contributedDatasets.toLocaleString()}
              </div>
              <div className="text-sm text-slate-400 mb-2">Contributed Datasets</div>
              <div className="flex items-center justify-center gap-1 text-xs text-slate-400">
                <CheckCircle2 className="w-3 h-3" />
                {participationMetrics.verifiedIssues} verified
              </div>
            </Card>

            <Card className="glass-intense border-white/10 p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Users className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                {participationMetrics.citizenScienceMembers.toLocaleString()}
              </div>
              <div className="text-sm text-slate-400 mb-2">Citizen Science Members</div>
              <div className="flex items-center justify-center gap-1 text-xs text-emerald-400">
                <MapPin className="w-3 h-3" />
                {participationMetrics.activeDistricts} districts
              </div>
            </Card>
          </div>
        </motion.div>

        {/* Contribution Pathway Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-white mb-6">Contribution Pathways</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contributionPathways.map((pathway, index) => (
              <motion.div
                key={pathway.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-light border-white/10 hover:border-white/20 transition-all p-6 h-full group">
                  <div className="flex items-start gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pathway.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <pathway.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-2xl font-bold text-white mb-1">
                        {pathway.count.toLocaleString()}
                      </div>
                      <div className="text-xs text-emerald-400 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" />
                        {pathway.newCount} {pathway.newLabel}
                      </div>
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                    {pathway.title}
                  </h4>
                  <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                    {pathway.purpose}
                  </p>
                  <Button
                    size="sm"
                    className={`w-full bg-gradient-to-r ${pathway.color} hover:opacity-90 text-white`}
                    onClick={() => window.location.href = pathway.route}
                  >
                    <span>Get Involved</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity & District Coverage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Participation Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-bold text-white mb-4">Recent Community Activity</h3>
            <Card className="glass-light border-white/10 p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 pb-4 border-b border-white/5 last:border-0 last:pb-0">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-white">{activity.text}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-500">{activity.district}</span>
                        <span className="text-xs text-slate-600">•</span>
                        <span className="text-xs text-slate-500">{activity.time}</span>
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
          >
            <h3 className="text-xl font-bold text-white mb-4">District Participation</h3>
            <Card className="glass-light border-white/10 p-6">
              <div className="space-y-4">
                {districtParticipation.map((item, index) => (
                  <div key={item.district} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        item.status === 'most-active' ? 'bg-emerald-400' :
                        item.status === 'high' ? 'bg-green-400' : 'bg-blue-400'
                      }`} />
                      <span className="text-sm font-medium text-white">{item.district}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-slate-400">{item.contributions} contributions</span>
                      <Badge
                        variant={item.status === 'most-active' ? 'success' : 
                                 item.status === 'high' ? 'success' : 'info'}
                        size="sm"
                      >
                        {item.status === 'most-active' ? 'Most Active' : 
                         item.status === 'high' ? 'High' : 'Moderate'}
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
