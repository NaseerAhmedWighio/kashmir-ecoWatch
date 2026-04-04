'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft, MapPin, Clock, Calendar, AlertTriangle, Shield, 
  ExternalLink, Share2, Bookmark, AlertCircle, Info, Route,
  TrendingUp, TrendingDown, CheckCircle2, XCircle
} from 'lucide-react';
import { 
  alertRegistry, getAlertById, categoryLabels, severityDisplayLabels, 
  severityColors, statusDisplayLabels, statusColors, sourceDisplayLabels,
  urgencyLabels
} from '@/data/alert-registry';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

export default function AlertDetailPage() {
  const params = useParams();
  const router = useRouter();
  const alertId = params.id as string;

  const alert = getAlertById(alertId);

  if (!alert) {
    return (
      <main className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Alert Not Found</h1>
          <p className="text-slate-400 mb-6">The alert you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => router.push('/alerts')} icon={<ArrowLeft className="w-5 h-5" />}>
            Back to Alerts
          </Button>
        </div>
      </main>
    );
  }

  const severityColor = severityColors[alert.severity];
  const statusColor = statusColors[alert.status];
  const isActive = alert.status === 'active' || alert.status === 'monitoring';

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Sticky Navigation Bar */}
      <section className="border-b border-white/5 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.push('/alerts')}
              icon={<ArrowLeft className="w-5 h-5" />}
              className="text-slate-400 hover:text-white"
            >
              Back to Live Alerts
            </Button>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                icon={<Share2 className="w-4 h-4" />}
                className="text-slate-400 hover:text-white"
              >
                Share
              </Button>
              <Button
                variant="ghost"
                size="sm"
                icon={<Bookmark className="w-4 h-4" />}
                className="text-slate-400 hover:text-white"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-rose-950/20 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl"
          >
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className={cn("px-3 py-1 rounded-full text-sm font-medium border", severityColor)}>
                {severityDisplayLabels[alert.severity]}
              </span>
              <span className={cn("px-3 py-1 rounded-full text-sm font-medium border", statusColor)}>
                {statusDisplayLabels[alert.status]}
              </span>
              <Badge variant="outline" size="lg">
                {categoryLabels[alert.category]}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
              {alert.title}
            </h1>

            {/* Meta Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-500 mb-1">Affected Area</div>
                  <div className="text-sm text-white font-medium">{alert.affectedArea}</div>
                  {alert.corridor && (
                    <div className="text-xs text-slate-400 mt-1">Corridor: {alert.corridor}</div>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-500 mb-1">Issued</div>
                  <div className="text-sm text-white font-medium">
                    {new Date(alert.issued).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-slate-400 mt-0.5" />
                <div>
                  <div className="text-xs text-slate-500 mb-1">Expires</div>
                  <div className="text-sm text-white font-medium">
                    {new Date(alert.expires).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Source Badge */}
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Shield className="w-4 h-4" />
              <span>{sourceDisplayLabels[alert.source]}</span>
              <span className="text-slate-600">•</span>
              <span>Issued by: {alert.issuedBy}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Situation Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="glass-intense border-white/10 p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    Situation Summary
                  </h2>
                  <p className="text-slate-300 leading-relaxed mb-4">{alert.summary}</p>
                  <div className="pt-4 border-t border-white/5">
                    <h3 className="text-sm font-semibold text-white mb-2">Cause / Context</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{alert.cause}</p>
                  </div>
                </Card>
              </motion.div>

              {/* Public Guidance */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className={cn(
                  "glass-intense border p-6",
                  alert.guidance.urgency === 'urgent' 
                    ? "border-red-500/30 bg-red-500/5" 
                    : alert.guidance.urgency === 'precautionary'
                    ? "border-amber-500/30 bg-amber-500/5"
                    : "border-blue-500/30 bg-blue-500/5"
                )}>
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Public Guidance — What Should You Do?
                  </h2>
                  
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" size="sm" className={cn(
                        alert.guidance.urgency === 'urgent' ? "border-red-500/50 text-red-400" :
                        alert.guidance.urgency === 'precautionary' ? "border-amber-500/50 text-amber-400" :
                        "border-blue-500/50 text-blue-400"
                      )}>
                        {urgencyLabels[alert.guidance.urgency]}
                      </Badge>
                    </div>
                    <p className="text-slate-300 leading-relaxed">{alert.guidance.summary}</p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-white">Recommended Actions</h3>
                    <ul className="space-y-2">
                      {alert.guidance.actions.map((action, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-start gap-2 text-sm text-slate-400">
                      <Route className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-slate-300">Travel Impact: </span>
                        {alert.guidance.travelImpact}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Update History */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="glass-intense border-white/10 p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Update History
                  </h2>
                  <div className="space-y-4">
                    {alert.updates.map((update, i) => (
                      <div key={i} className="pb-4 border-b border-white/5 last:border-0 last:pb-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {i === 0 ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <TrendingUp className="w-4 h-4 text-blue-400" />
                            )}
                            <span className="text-sm font-semibold text-white">{update.action}</span>
                          </div>
                          <span className="text-xs text-slate-500">
                            {new Date(update.timestamp).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">{update.note}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="glass-intense border-white/10 p-6">
                  <h3 className="text-lg font-bold text-white mb-3">Keywords & Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {alert.tags.map((tag, i) => (
                      <Badge key={i} variant="secondary" size="sm">{tag}</Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Alert Classification */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="glass-intense border-white/10 p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Alert Classification</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Category</div>
                      <div className="text-sm text-white font-medium">{categoryLabels[alert.category]}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Severity</div>
                      <span className={cn("px-2 py-1 rounded text-sm font-medium border", severityColor)}>
                        {severityDisplayLabels[alert.severity]}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Status</div>
                      <span className={cn("px-2 py-1 rounded text-sm font-medium border", statusColor)}>
                        {statusDisplayLabels[alert.status]}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Urgency</div>
                      <div className="text-sm text-white font-medium">{urgencyLabels[alert.guidance.urgency]}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Geographic Scope */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="glass-intense border-white/10 p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Geographic Scope
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">District</div>
                      <a
                        href={`/districts/${alert.district.toLowerCase()}`}
                        className="text-sm text-purple-400 hover:text-purple-300 font-medium"
                      >
                        {alert.district}
                      </a>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Affected Area</div>
                      <div className="text-sm text-white">{alert.affectedArea}</div>
                    </div>
                    {alert.corridor && (
                      <div>
                        <div className="text-xs text-slate-500 mb-1">Corridor</div>
                        <div className="text-sm text-white">{alert.corridor}</div>
                      </div>
                    )}
                  </div>
                  {alert.mapLink && (
                    <a
                      href={alert.mapLink}
                      className="mt-4 flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View on Risk Map
                    </a>
                  )}
                </Card>
              </motion.div>

              {/* Validity Window */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="glass-intense border-white/10 p-6">
                  <h3 className="text-lg font-bold text-white mb-4">Validity Window</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5" />
                      <div>
                        <div className="text-xs text-slate-500">Issued</div>
                        <div className="text-sm text-white">
                          {new Date(alert.issued).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5" />
                      <div>
                        <div className="text-xs text-slate-500">Last Updated</div>
                        <div className="text-sm text-white">
                          {new Date(alert.updated).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "w-2 h-2 rounded-full mt-1.5",
                        isActive ? "bg-amber-400" : "bg-slate-500"
                      )} />
                      <div>
                        <div className="text-xs text-slate-500">Expires</div>
                        <div className="text-sm text-white">
                          {new Date(alert.expires).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  {alert.status === 'expired' && (
                    <div className="mt-4 p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
                      <div className="flex items-center gap-2 text-sm text-slate-400">
                        <XCircle className="w-4 h-4" />
                        <span>This alert has expired. Conditions have stabilized.</span>
                      </div>
                    </div>
                  )}
                </Card>
              </motion.div>

              {/* Source & Verification */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="glass-intense border-white/10 p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Source & Verification
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Issued By</div>
                      <div className="text-sm text-white font-medium">{alert.issuedBy}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Verification State</div>
                      <span className="text-sm text-slate-300">{sourceDisplayLabels[alert.source]}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <p className="text-xs text-slate-500 leading-relaxed">
                      This alert has been classified according to our verification framework. 
                      <a href="/about/verification" className="text-indigo-400 hover:text-indigo-300 ml-1">Learn more</a>.
                    </p>
                  </div>
                </Card>
              </motion.div>

              {/* Related Module */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="glass-intense border-white/10 p-6">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Related Monitoring
                  </h3>
                  <a
                    href={alert.relatedModulePath}
                    className="block p-4 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 transition-colors"
                  >
                    <div className="text-sm font-semibold text-indigo-400 mb-1">
                      {alert.relatedModule === 'risk-monitoring' ? 'Risk & Monitoring' : 'Environmental Monitoring'}
                    </div>
                    <div className="text-xs text-slate-400">
                      View related monitoring data and risk streams
                    </div>
                  </a>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
