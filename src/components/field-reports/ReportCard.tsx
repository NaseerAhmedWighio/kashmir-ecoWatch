'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FileText, Calendar, Download, ExternalLink, MapPin, Layers } from 'lucide-react';
import { FieldReport, ReportStatus, ReportType } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface ReportCardProps {
  report: FieldReport;
  index?: number;
}

const statusConfig: Record<ReportStatus, { label: string; color: string; bgColor: string }> = {
  'reviewed': { label: 'Reviewed', color: 'text-blue-400', bgColor: 'bg-blue-500/10 border-blue-500/30' },
  'field-verified': { label: 'Field Verified', color: 'text-emerald-400', bgColor: 'bg-emerald-500/10 border-emerald-500/30' },
  'preliminary': { label: 'Preliminary', color: 'text-yellow-400', bgColor: 'bg-yellow-500/10 border-yellow-500/30' },
  'technical-assessment': { label: 'Technical Assessment', color: 'text-purple-400', bgColor: 'bg-purple-500/10 border-purple-500/30' },
  'monthly-bulletin': { label: 'Monthly Bulletin', color: 'text-cyan-400', bgColor: 'bg-cyan-500/10 border-cyan-500/30' },
  'archived': { label: 'Archived', color: 'text-slate-400', bgColor: 'bg-slate-500/10 border-slate-500/30' },
  'restricted': { label: 'Restricted', color: 'text-red-400', bgColor: 'bg-red-500/10 border-red-500/30' },
};

const typeLabels: Record<ReportType, string> = {
  'field-survey': 'Field Survey',
  'technical-report': 'Technical Report',
  'monthly-bulletin': 'Monthly Bulletin',
  'risk-assessment': 'Risk Assessment',
  'environmental-impact': 'Environmental Impact',
  'species-survey': 'Species Survey',
  'wetland-assessment': 'Wetland Assessment',
  'seasonal-report': 'Seasonal Report',
};

export function ReportCard({ report, index = 0 }: ReportCardProps) {
  const router = useRouter();
  const status = statusConfig[report.status];
  const reportYear = new Date(report.date).getFullYear();
  const isArchived = report.status === 'archived' || reportYear <= 2024;
  const isRecent = reportYear >= 2026;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className={`glass-intense p-5 h-full flex flex-col hover:border-amber-500/30 transition-all duration-300 ${
        isArchived ? 'border-white/5 opacity-75 hover:opacity-100' : 'border-white/10'
      }`}>
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
            isArchived 
              ? 'bg-gradient-to-br from-slate-500/20 to-slate-600/20' 
              : 'bg-gradient-to-br from-amber-500/20 to-orange-500/20'
          }`}>
            <FileText className={`w-6 h-6 ${isArchived ? 'text-slate-400' : 'text-amber-400'}`} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className={`text-base font-bold mb-2 line-clamp-2 ${
              isArchived ? 'text-slate-300' : 'text-white'
            }`}>
              {report.title}
            </h3>

            {/* Status Badge */}
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <span className={`px-2 py-0.5 text-xs font-semibold border rounded ${status.bgColor} ${status.color}`}>
                {status.label}
              </span>
              <Badge variant="outline" size="sm">
                {typeLabels[report.reportType]}
              </Badge>
              {isArchived && (
                <span className="px-2 py-0.5 text-xs font-semibold bg-slate-500/10 text-slate-400 border border-slate-500/20 rounded">
                  Archive: {reportYear}
                </span>
              )}
              {isRecent && (
                <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
                  Current
                </span>
              )}
              {report.visibility === 'restricted' && (
                <span className="px-2 py-0.5 text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20 rounded">
                  Restricted
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Summary */}
        <p className="text-sm text-slate-400 mb-4 line-clamp-3 leading-relaxed">
          {report.summary}
        </p>

        {/* Metadata */}
        <div className="space-y-3 mb-4">
          {/* Source & Date */}
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span className="font-medium text-slate-400">{report.source}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(report.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </span>
            <span>•</span>
            <span>{report.pages} pages</span>
          </div>

          {/* Districts */}
          {report.districts.length > 0 && (
            <div className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
              <div className="flex gap-1.5 flex-wrap">
                {report.districts.slice(0, 3).map(district => (
                  <span key={district} className="px-2 py-0.5 text-xs bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20">
                    {district}
                  </span>
                ))}
                {report.districts.length > 3 && (
                  <span className="px-2 py-0.5 text-xs text-slate-500">
                    +{report.districts.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Modules */}
          {report.modules.length > 0 && (
            <div className="flex items-start gap-2">
              <Layers className="w-3.5 h-3.5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="flex gap-1.5 flex-wrap">
                {report.modules.slice(0, 2).map(module => (
                  <span key={module} className="px-2 py-0.5 text-xs bg-blue-500/10 text-blue-400 rounded border border-blue-500/20">
                    {module}
                  </span>
                ))}
                {report.modules.length > 2 && (
                  <span className="px-2 py-0.5 text-xs text-slate-500">
                    +{report.modules.length - 2} more
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex-1 border-white/20 text-white h-9 hover:border-amber-500/50 hover:text-amber-400 transition-colors"
            onClick={() => router.push(`/field-reports/${report.id}`)}
            icon={<ExternalLink className="w-4 h-4" />}
          >
            View Details
          </Button>
          {report.downloadUrl && (
            <Button
              size="sm"
              variant="outline"
              className="border-white/20 text-white h-9 px-3 hover:border-amber-500/50 hover:text-amber-400 transition-colors"
              icon={<Download className="w-4 h-4" />}
            >
              PDF
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
