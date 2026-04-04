'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, MapPin, Layers, Clock, Calendar } from 'lucide-react';

interface SummaryStats {
  totalReports: number;
  districtCoverage: number;
  moduleCoverage: number;
  recentAdditions: { id: string; title: string; date: string }[];
  yearRange: string;
  activeYear: number;
}

interface SummaryStripProps {
  stats: SummaryStats;
}

export function SummaryStrip({ stats }: SummaryStripProps) {
  const metrics = [
    {
      icon: FileText,
      label: 'Total Reports',
      value: stats.totalReports.toString(),
      color: 'from-amber-500 to-orange-500',
      bgColor: 'bg-amber-500/10',
    },
    {
      icon: MapPin,
      label: 'District Coverage',
      value: `${stats.districtCoverage} districts`,
      color: 'from-emerald-500 to-green-500',
      bgColor: 'bg-emerald-500/10',
    },
    {
      icon: Layers,
      label: 'Module Coverage',
      value: `${stats.moduleCoverage} modules`,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      icon: Calendar,
      label: 'Archive Span',
      value: stats.yearRange,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
    },
  ];

  return (
    <section className="py-8 md:py-12 border-b border-white/10 bg-slate-950/50">
      <div className="container mx-auto px-6">
        {/* Main Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div className={`${metric.bgColor} backdrop-blur-sm border border-white/10 rounded-xl p-4 md:p-5`}>
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${metric.color} flex items-center justify-center flex-shrink-0`}>
                    <metric.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                      {metric.value}
                    </div>
                    <div className="text-xs md:text-sm text-slate-400">
                      {metric.label}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recent Additions */}
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Clock className="w-4 h-4 text-amber-400" />
          <span className="font-medium">Recent additions:</span>
          <div className="flex gap-3 flex-wrap">
            {stats.recentAdditions.map((report, i) => (
              <span key={report.id} className="text-slate-500">
                {report.title}
                <span className="text-slate-600 ml-1">({new Date(report.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })})</span>
                {i < stats.recentAdditions.length - 1 && <span className="ml-3 text-slate-700">•</span>}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
