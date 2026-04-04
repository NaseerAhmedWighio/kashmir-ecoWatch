'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  ArrowLeft, AlertTriangle, TrendingUp, TrendingDown, Minus, Eye,
  MapPin, Calendar, Clock, Link as LinkIcon, FileText, Activity,
  Map, Shield, Info, BookOpen, Users
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter, useParams } from 'next/navigation';
import {
  getRiskUpdateById,
  hazardTypeLabels,
  hazardTypeColors,
  riskTrendLabels,
  riskTrendColors,
  severityLabels,
  severityColors,
  linkedAlertStatusLabels,
  RiskUpdate,
} from '@/data/risk-updates-intelligence';
import { cn } from '@/lib/utils';

const trendIcons: Record<string, React.ElementType> = {
  'increasing': TrendingUp,
  'stable': Minus,
  'elevated': AlertTriangle,
  'improving': TrendingDown,
  'under-watch': Eye,
};

function RiskUpdateDetail({ update }: { update: RiskUpdate }) {
  const router = useRouter();
  const TrendIcon = trendIcons[update.trend] || Minus;

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Header */}
      <section className="relative pt-20 md:pt-48 pb-12 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/50 via-orange-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl"
          >
            <Button
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white mb-6"
              icon={<ArrowLeft className="w-4 h-4" />}
              onClick={() => router.push('/risk-updates')}
            >
              Back to Risk Updates
            </Button>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Badge
                variant="outline"
                size="lg"
                className={cn("text-sm", hazardTypeColors[update.hazardType])}
              >
                {hazardTypeLabels[update.hazardType]}
              </Badge>
              <Badge
                variant="outline"
                size="lg"
                className={cn("text-sm", severityColors[update.severity])}
              >
                {severityLabels[update.severity]}
              </Badge>
              <div className="flex items-center gap-2">
                <TrendIcon className={cn("w-5 h-5", riskTrendColors[update.trend])} />
                <span className={cn("text-sm font-medium", riskTrendColors[update.trend])}>
                  {riskTrendLabels[update.trend]}
                </span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
              {update.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Updated: {new Date(update.updatedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Created: {new Date(update.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
              {update.linkedAlertStatus !== 'none' && (
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-indigo-400" />
                  Alert Status: <span className="text-indigo-400 font-medium">{linkedAlertStatusLabels[update.linkedAlertStatus]}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl">
            {/* Main Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Assessment Summary */}
              <Card className="glass-intense border-white/10 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-5 h-5 text-indigo-400" />
                  <h2 className="text-xl font-bold text-white">Assessment Summary</h2>
                </div>
                <div className="prose prose-invert max-w-none">
                  {update.fullAssessmentNote.split('\n\n').map((paragraph, i) => (
                    <p key={i} className="text-slate-300 leading-relaxed mb-4 last:mb-0">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </Card>

              {/* Risk Drivers */}
              <Card className="glass-intense border-white/10 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Activity className="w-5 h-5 text-amber-400" />
                  <h2 className="text-xl font-bold text-white">Risk Drivers</h2>
                </div>
                <div className="space-y-4">
                  {update.riskDrivers.map((driver, i) => (
                    <div key={i} className="border-l-2 border-indigo-500/30 pl-4">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-white">{driver.factor}</h3>
                        <Badge
                          variant="outline"
                          size="sm"
                          className={cn(
                            "text-xs",
                            driver.influence === 'primary'
                              ? "border-red-500/30 text-red-400 bg-red-500/10"
                              : driver.influence === 'secondary'
                              ? "border-amber-500/30 text-amber-400 bg-amber-500/10"
                              : "border-slate-500/30 text-slate-400 bg-slate-500/10"
                          )}
                        >
                          {driver.influence}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-400">{driver.description}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Preparedness Notes */}
              <Card className="glass-intense border-white/10 p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <h2 className="text-xl font-bold text-white">Preparedness Guidance</h2>
                </div>
                <div className="space-y-4">
                  {update.preparednessNotes.map((note, i) => (
                    <div key={i} className="bg-slate-900/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Users className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-semibold text-white capitalize">{note.audience}</span>
                        <Badge
                          variant="outline"
                          size="sm"
                          className={cn(
                            "text-xs ml-auto",
                            note.priority === 'immediate'
                              ? "border-red-500/30 text-red-400 bg-red-500/10"
                              : note.priority === 'short-term'
                              ? "border-amber-500/30 text-amber-400 bg-amber-500/10"
                              : "border-slate-500/30 text-slate-400 bg-slate-500/10"
                          )}
                        >
                          {note.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-300">{note.action}</p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Public Guidance */}
              {update.publicGuidance && (
                <Card className="glass-intense border-indigo-500/20 bg-indigo-500/5 p-6">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-indigo-400 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">Public Guidance</h3>
                      <p className="text-sm text-slate-300 leading-relaxed">{update.publicGuidance}</p>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Affected Geographies */}
              <Card className="glass-intense border-white/10 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-red-400" />
                  <h3 className="text-lg font-bold text-white">Affected Areas</h3>
                </div>
                <div className="space-y-3">
                  {update.affectedGeographies.map((geo, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-white font-medium">{geo.name}</div>
                        <div className="text-xs text-slate-500 capitalize">{geo.type}</div>
                      </div>
                      <Badge
                        variant="outline"
                        size="sm"
                        className={cn("text-xs", severityColors[geo.severity])}
                      >
                        {severityLabels[geo.severity]}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Linked Resources */}
              {update.linkedResources.length > 0 && (
                <Card className="glass-intense border-white/10 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <LinkIcon className="w-5 h-5 text-blue-400" />
                    <h3 className="text-lg font-bold text-white">Linked Resources</h3>
                  </div>
                  <div className="space-y-2">
                    {update.linkedResources.map((resource, i) => (
                      <Button
                        key={i}
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start text-left text-slate-300 hover:text-white hover:bg-white/5 h-auto py-3"
                        onClick={() => router.push(resource.href)}
                      >
                        <div className="flex items-start gap-2 flex-1">
                          <FileText className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="text-sm font-medium">{resource.title}</div>
                            <div className="text-xs text-slate-500 capitalize">{resource.type}</div>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </Card>
              )}

              {/* Update History */}
              <Card className="glass-intense border-white/10 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                  <h3 className="text-lg font-bold text-white">Update History</h3>
                </div>
                <div className="space-y-4">
                  {update.updateHistory.map((entry, i) => (
                    <div key={i} className="relative pl-4 border-l-2 border-slate-700">
                      <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-indigo-500" />
                      <div className="text-xs text-slate-500 mb-1">
                        {new Date(entry.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </div>
                      <div className="text-sm text-white font-medium mb-1">{entry.action.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
                      <div className="text-xs text-slate-400">{entry.note}</div>
                      <div className="text-xs text-slate-600 mt-1">{entry.author}</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Tags */}
              {update.tags.length > 0 && (
                <Card className="glass-intense border-white/10 p-6">
                  <h3 className="text-sm font-semibold text-white mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {update.tags.map((tag, i) => (
                      <Badge key={i} variant="outline" size="sm" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}

export default function RiskUpdateDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const update = getRiskUpdateById(id);

  if (!update) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Risk Update Not Found</h1>
          <p className="text-slate-400 mb-6">
            The risk update you're looking for doesn't exist or has been archived.
          </p>
          <Button onClick={() => window.location.href = '/risk-updates'}>
            Return to Risk Updates
          </Button>
        </div>
      </main>
    );
  }

  return <RiskUpdateDetail update={update} />;
}
