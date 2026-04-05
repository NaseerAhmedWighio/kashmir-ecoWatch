'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import {
  FileText, Calendar, Download, ArrowLeft, MapPin, Layers, Users,
  FlaskConical, Link2, Shield, Clock, Eye, FileCheck, AlertTriangle,
  ExternalLink, BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getReportById } from '@/data/field-reports-registry';
import { FieldReport, ReportStatus, ConfidenceLevel } from '@/types';

const statusConfig: Record<ReportStatus, { label: string; color: string; bgColor: string; icon: React.ElementType }> = {
  'reviewed': { label: 'Reviewed', color: 'text-blue-400', bgColor: 'bg-blue-500/10 border-blue-500/30', icon: FileCheck },
  'field-verified': { label: 'Field Verified', color: 'text-emerald-400', bgColor: 'bg-emerald-500/10 border-emerald-500/30', icon: Shield },
  'preliminary': { label: 'Preliminary', color: 'text-yellow-400', bgColor: 'bg-yellow-500/10 border-yellow-500/30', icon: Clock },
  'technical-assessment': { label: 'Technical Assessment', color: 'text-purple-400', bgColor: 'bg-purple-500/10 border-purple-500/30', icon: FlaskConical },
  'monthly-bulletin': { label: 'Monthly Bulletin', color: 'text-cyan-400', bgColor: 'bg-cyan-500/10 border-cyan-500/30', icon: FileText },
  'archived': { label: 'Archived', color: 'text-slate-400', bgColor: 'bg-slate-500/10 border-slate-500/30', icon: Clock },
  'restricted': { label: 'Restricted / Sensitive', color: 'text-red-400', bgColor: 'bg-red-500/10 border-red-500/30', icon: AlertTriangle },
};

const typeLabels: Record<FieldReport['reportType'], string> = {
  'field-survey': 'Field Survey',
  'technical-report': 'Technical Report',
  'monthly-bulletin': 'Monthly Bulletin',
  'risk-assessment': 'Risk Assessment',
  'environmental-impact': 'Environmental Impact',
  'species-survey': 'Species Survey',
  'wetland-assessment': 'Wetland Assessment',
  'seasonal-report': 'Seasonal Report',
};

const confidenceConfig: Record<ConfidenceLevel, { label: string; color: string }> = {
  'high': { label: 'High Confidence', color: 'text-emerald-400' },
  'moderate': { label: 'Moderate Confidence', color: 'text-yellow-400' },
  'low': { label: 'Low Confidence', color: 'text-red-400' },
  'pending-review': { label: 'Pending Review', color: 'text-slate-400' },
};

export default function ReportDetailPage() {
  const params = useParams();
  const router = useRouter();
  const reportId = params.id as string;
  const report = getReportById(reportId);

  if (!report) {
    return (
      <main className="min-h-screen bg-slate-950">
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-6 text-center">
            <FileText className="w-20 h-20 text-slate-700 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-white mb-4">Report Not Found</h1>
            <p className="text-slate-400 mb-8">The requested field report does not exist or has been removed.</p>
            <Button onClick={() => router.push('/field-reports')} icon={<ArrowLeft className="w-4 h-4" />}>
              Back to Field Reports
            </Button>
          </div>
        </section>
        <AdvancedFooter />
      </main>
    );
  }

  const status = statusConfig[report.status];
  const confidence = confidenceConfig[report.confidence];
  const StatusIcon = status.icon;

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Top Bar */}
      <section className="relative pt-20 md:pt-48 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/50 via-orange-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <button
              onClick={() => router.push('/field-reports')}
              className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Field Reports</span>
            </button>

            <div className="flex items-start gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl flex-shrink-0">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <Badge variant="warning" size="lg">Field Intelligence</Badge>
                  <span className={`px-3 py-1 text-sm font-semibold border rounded flex items-center gap-2 ${status.bgColor} ${status.color}`}>
                    <StatusIcon className="w-4 h-4" />
                    {status.label}
                  </span>
                  <Badge variant="outline" size="lg">{typeLabels[report.reportType]}</Badge>
                  {report.visibility === 'restricted' && (
                    <Badge variant="danger" size="lg">Restricted</Badge>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                  {report.title}
                </h1>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Abstract */}
              <Card className="glass-intense border-white/10 p-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-amber-400" />
                  Abstract
                </h2>
                <p className="text-slate-300 leading-relaxed">{report.summary}</p>
              </Card>

              {/* Methodology */}
              <Card className="glass-intense border-white/10 p-6">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <FlaskConical className="w-5 h-5 text-blue-400" />
                  Methodology
                </h2>
                <p className="text-slate-300 leading-relaxed">{report.methodology}</p>
              </Card>

              {/* Entities Covered */}
              {report.entities.length > 0 && (
                <Card className="glass-intense border-white/10 p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-emerald-400" />
                    Entities Covered
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {report.entities.map(entity => (
                      <span key={entity} className="px-3 py-1.5 text-sm bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">
                        {entity}
                      </span>
                    ))}
                  </div>
                </Card>
              )}

              {/* Related Evidence */}
              {(report.relatedReports || report.relatedAlerts) && (
                <Card className="glass-intense border-white/10 p-6">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Link2 className="w-5 h-5 text-purple-400" />
                    Related Evidence
                  </h2>
                  <div className="space-y-4">
                    {report.relatedReports && report.relatedReports.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-slate-400 mb-2">Related Reports</h3>
                        <div className="space-y-2">
                          {report.relatedReports.map(relatedId => {
                            const related = getReportById(relatedId);
                            return related ? (
                              <button
                                key={relatedId}
                                onClick={() => router.push(`/field-reports/${relatedId}`)}
                                className="w-full text-left px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
                              >
                                <div className="text-sm font-medium text-white">{related.title}</div>
                                <div className="text-xs text-slate-500 mt-1">
                                  {new Date(related.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                                </div>
                              </button>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}

                    {report.relatedAlerts && report.relatedAlerts.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-slate-400 mb-2">Related Alerts</h3>
                        <div className="space-y-2">
                          {report.relatedAlerts.map(alertId => (
                            <div key={alertId} className="px-4 py-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                              <div className="flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-orange-400" />
                                <span className="text-sm font-medium text-orange-400">{alertId}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Metadata Card */}
              <Card className="glass-intense border-white/10 p-6 sticky top-24">
                <h3 className="text-lg font-bold text-white mb-6">Report Metadata</h3>
                
                <div className="space-y-5">
                  {/* Source */}
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Source Organization</div>
                    <div className="text-sm font-medium text-white">{report.source}</div>
                  </div>

                  {/* Date */}
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Publication Date</div>
                    <div className="text-sm text-white flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      {new Date(report.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>

                  {/* Page Count */}
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Length</div>
                    <div className="text-sm text-white">{report.pages} pages</div>
                  </div>

                  {/* File Size */}
                  {report.fileSize && (
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">File Size</div>
                      <div className="text-sm text-white">{report.fileSize}</div>
                    </div>
                  )}

                  {/* Confidence */}
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Confidence Level</div>
                    <div className={`text-sm font-semibold ${confidence.color} flex items-center gap-2`}>
                      <Eye className="w-4 h-4" />
                      {confidence.label}
                    </div>
                  </div>

                  {/* Review Info */}
                  {report.reviewedBy && (
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Reviewed By</div>
                      <div className="text-sm text-white">{report.reviewedBy}</div>
                      {report.reviewDate && (
                        <div className="text-xs text-slate-500 mt-1">
                          {new Date(report.reviewDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Last Updated */}
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Last Updated</div>
                    <div className="text-sm text-white">
                      {new Date(report.lastUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/10 my-6" />

                {/* Districts */}
                {report.districts.length > 0 && (
                  <div className="mb-6">
                    <div className="text-xs text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      Districts Covered
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {report.districts.map(district => (
                        <span key={district} className="px-2 py-1 text-xs bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">
                          {district}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modules */}
                {report.modules.length > 0 && (
                  <div className="mb-6">
                    <div className="text-xs text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                      <Layers className="w-3 h-3" />
                      Related Modules
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {report.modules.map(module => (
                        <span key={module} className="px-2 py-1 text-xs bg-blue-500/10 text-blue-400 rounded border border-blue-500/20">
                          {module}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tags */}
                {report.tags.length > 0 && (
                  <div className="mb-6">
                    <div className="text-xs text-slate-500 uppercase tracking-wide mb-3">Tags</div>
                    <div className="flex flex-wrap gap-2">
                      {report.tags.slice(0, 8).map(tag => (
                        <span key={tag} className="px-2 py-1 text-xs bg-slate-500/10 text-slate-400 rounded border border-slate-500/20">
                          {tag}
                        </span>
                      ))}
                      {report.tags.length > 8 && (
                        <span className="px-2 py-1 text-xs text-slate-500">+{report.tags.length - 8} more</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Divider */}
                <div className="border-t border-white/10 my-6" />

                {/* Download Actions */}
                <div className="space-y-3">
                  {report.downloadUrl && (
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700"
                      icon={<Download className="w-5 h-5" />}
                    >
                      Download PDF ({report.fileSize || 'File'})
                    </Button>
                  )}
                  {report.previewAvailable && (
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full border-white/20 text-white hover:border-amber-500/50"
                      icon={<ExternalLink className="w-5 h-5" />}
                    >
                      Preview Online
                    </Button>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
