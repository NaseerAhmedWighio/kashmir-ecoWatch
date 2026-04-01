'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { contributedDatasets, ContributedDataset, DatasetStatus, getDatasetsByStatus } from '@/data/contribution-intelligence';
import { Database, Download, FileText, Calendar, MapPin, ExternalLink, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const statusColors: Record<DatasetStatus, string> = {
  'pending': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'approved': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'published': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
};

const typeIcons: Record<string, React.ElementType> = {
  'research': FileText,
  'monitoring': Database,
  'survey': FileText,
  'observation': Database,
  'gis': MapPin,
};

interface ContributedDatasetsProps {
  compact?: boolean;
  filterStatus?: DatasetStatus;
}

export function ContributedDatasets({ compact = false, filterStatus }: ContributedDatasetsProps) {
  const datasets = filterStatus ? getDatasetsByStatus(filterStatus) : contributedDatasets;

  const statusCounts: Record<DatasetStatus, number> = {
    'pending': getDatasetsByStatus('pending').length,
    'approved': getDatasetsByStatus('approved').length,
    'published': getDatasetsByStatus('published').length,
  };

  if (compact) {
    return (
      <Card className="glass-intense border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-400" />
            Contributed Datasets
          </h3>
          <Badge variant="info" size="sm">{statusCounts.published} published</Badge>
        </div>
        <div className="space-y-3">
          {datasets.slice(0, 5).map(dataset => {
            const TypeIcon = typeIcons[dataset.type] || Database;
            return (
              <div key={dataset.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center flex-shrink-0">
                  <TypeIcon className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-white truncate mb-1">{dataset.title}</h4>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span>{dataset.organization}</span>
                    <span className="flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      {dataset.downloadCount}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <div className="grid grid-cols-3 gap-3">
        {(['pending', 'approved', 'published'] as DatasetStatus[]).map(status => (
          <Card key={status} className={cn("glass-intense border p-4 text-center", statusColors[status])}>
            <div className="text-2xl font-bold text-white mb-1">{statusCounts[status]}</div>
            <div className="text-xs font-medium capitalize">{status}</div>
          </Card>
        ))}
      </div>

      {/* Datasets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {datasets.map(dataset => {
          const TypeIcon = typeIcons[dataset.type] || Database;
          return (
            <motion.div
              key={dataset.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="glass-intense border-white/10 p-5 hover:border-blue-500/30 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center flex-shrink-0">
                    <TypeIcon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-base font-bold text-white mb-1">{dataset.title}</h4>
                        <p className="text-sm text-slate-400 line-clamp-2">{dataset.description}</p>
                      </div>
                      <Badge className={cn("border", statusColors[dataset.status])}>
                        {dataset.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {dataset.district}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(dataset.submittedDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Download className="w-3 h-3" />
                          {dataset.downloadCount}
                        </span>
                      </div>
                      {dataset.url && (
                        <Button size="sm" variant="ghost" className="text-xs text-blue-400">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
