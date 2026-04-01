'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  reportedIssues, ReportedIssue, IssueStatus, getIssuesByStatus,
  participationMetrics
} from '@/data/contribution-intelligence';
import {
  AlertTriangle, CheckCircle2, Clock, Eye, MapPin, Calendar,
  ThumbsUp, MessageSquare, Filter, ArrowUpDown, X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const statusColors: Record<IssueStatus, string> = {
  'pending': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'under-review': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'verified': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'in-progress': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'resolved': 'bg-green-500/20 text-green-400 border-green-500/30',
  'closed': 'bg-slate-500/20 text-slate-400 border-slate-500/30',
};

const statusIcons: Record<IssueStatus, React.ElementType> = {
  'pending': Clock,
  'under-review': Eye,
  'verified': CheckCircle2,
  'in-progress': AlertTriangle,
  'resolved': CheckCircle2,
  'closed': X,
};

const issueTypeIcons: Record<string, React.ElementType> = {
  'wildfire': AlertTriangle,
  'landslide': MapPin,
  'flood': AlertTriangle,
  'wildlife': AlertTriangle,
  'pollution': AlertTriangle,
  'other': AlertTriangle,
};

const issueTypeColors: Record<string, string> = {
  'wildfire': 'from-orange-500 to-red-600',
  'landslide': 'from-amber-500 to-orange-600',
  'flood': 'from-blue-500 to-cyan-600',
  'wildlife': 'from-emerald-500 to-teal-600',
  'pollution': 'from-purple-500 to-indigo-600',
  'other': 'from-slate-500 to-slate-600',
};

interface ReportedIssuesDashboardProps {
  compact?: boolean;
  filterStatus?: IssueStatus;
  onUpdateStatus?: (issueId: string, newStatus: IssueStatus) => void;
}

export function ReportedIssuesDashboard({
  compact = false,
  filterStatus,
  onUpdateStatus
}: ReportedIssuesDashboardProps) {
  const [selectedStatus, setSelectedStatus] = useState<IssueStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<'date' | 'upvotes' | 'status'>('date');
  const [selectedIssue, setSelectedIssue] = useState<ReportedIssue | null>(null);

  const statusFilter = filterStatus || selectedStatus;
  const issues = statusFilter === 'all'
    ? reportedIssues
    : getIssuesByStatus(statusFilter);

  const sortedIssues = [...issues].sort((a, b) => {
    if (sortBy === 'date') return new Date(b.reportedDate).getTime() - new Date(a.reportedDate).getTime();
    if (sortBy === 'upvotes') return b.upvotes - a.upvotes;
    return 0;
  });

  const statusCounts: Record<IssueStatus, number> = {
    'pending': getIssuesByStatus('pending').length,
    'under-review': getIssuesByStatus('under-review').length,
    'verified': getIssuesByStatus('verified').length,
    'in-progress': getIssuesByStatus('in-progress').length,
    'resolved': getIssuesByStatus('resolved').length,
    'closed': getIssuesByStatus('closed').length,
  };

  if (compact) {
    return (
      <Card className="glass-intense border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            Recent Reported Issues
          </h3>
          <Badge variant="danger" size="sm">{statusCounts.pending} pending</Badge>
        </div>
        <div className="space-y-3">
          {sortedIssues.slice(0, 5).map(issue => {
            const TypeIcon = issueTypeIcons[issue.type] || AlertTriangle;
            const StatusIcon = statusIcons[issue.status];
            return (
              <div
                key={issue.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer"
                onClick={() => setSelectedIssue(issue)}
              >
                <div className={cn("w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center flex-shrink-0", issueTypeColors[issue.type])}>
                  <TypeIcon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-semibold text-white truncate">{issue.title}</h4>
                    <StatusIcon className={cn("w-4 h-4", statusColors[issue.status].split(' ')[1])} />
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {issue.location.district}
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" />
                      {issue.upvotes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      {issue.comments}
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
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {(['pending', 'under-review', 'verified', 'in-progress', 'resolved', 'closed'] as IssueStatus[]).map(status => {
          const StatusIcon = statusIcons[status];
          const count = statusCounts[status];
          return (
            <button
              key={status}
              onClick={() => setSelectedStatus(selectedStatus === status ? 'all' : status)}
              className={cn(
                "p-4 rounded-xl border transition-all",
                selectedStatus === status
                  ? statusColors[status]
                  : "border-white/10 hover:border-white/20 bg-slate-800/50"
              )}
            >
              <StatusIcon className={cn("w-5 h-5 mx-auto mb-2", selectedStatus === status ? statusColors[status].split(' ')[1] : "text-slate-400")} />
              <div className="text-2xl font-bold text-white mb-1">{count}</div>
              <div className="text-xs font-medium capitalize text-slate-400">{status.replace('-', ' ')}</div>
            </button>
          );
        })}
      </div>

      {/* Filters and Sort */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-400">
            {sortedIssues.length} issue{sortedIssues.length !== 1 ? 's' : ''} found
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-400">Sort by:</span>
          <Button
            size="sm"
            variant="ghost"
            className={cn("text-xs", sortBy === 'date' ? "text-white bg-slate-800" : "text-slate-400")}
            onClick={() => setSortBy('date')}
          >
            Date
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className={cn("text-xs", sortBy === 'upvotes' ? "text-white bg-slate-800" : "text-slate-400")}
            onClick={() => setSortBy('upvotes')}
          >
            Upvotes
          </Button>
        </div>
      </div>

      {/* Issues List */}
      <div className="space-y-3">
        {sortedIssues.map(issue => {
          const TypeIcon = issueTypeIcons[issue.type] || AlertTriangle;
          const StatusIcon = statusIcons[issue.status];
          return (
            <motion.div
              key={issue.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="glass-intense border-white/10 p-5 hover:border-white/20 transition-all">
                <div className="flex items-start gap-4">
                  <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0", issueTypeColors[issue.type])}>
                    <TypeIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-base font-bold text-white mb-1">{issue.title}</h4>
                        <p className="text-sm text-slate-400 line-clamp-2">{issue.description}</p>
                      </div>
                      <Badge className={cn("border", statusColors[issue.status])}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {issue.status.replace('-', ' ')}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {issue.location.area}, {issue.location.district}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(issue.reportedDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          {issue.upvotes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          {issue.comments}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" className="text-xs text-slate-400">
                          View Details
                        </Button>
                        {onUpdateStatus && issue.status === 'pending' && (
                          <Button
                            size="sm"
                            className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                            onClick={() => onUpdateStatus(issue.id, 'verified')}
                          >
                            Verify
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Issue Detail Modal */}
      <AnimatePresence>
        {selectedIssue && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedIssue(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br", issueTypeColors[selectedIssue.type])}>
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <Badge className={cn("border mb-1", statusColors[selectedIssue.status])}>
                        {selectedIssue.status.replace('-', ' ')}
                      </Badge>
                      <h3 className="text-xl font-bold text-white">{selectedIssue.title}</h3>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => setSelectedIssue(null)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                <p className="text-slate-400 mb-4">{selectedIssue.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Location</div>
                    <div className="text-sm text-white flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {selectedIssue.location.area}, {selectedIssue.location.district}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Reported</div>
                    <div className="text-sm text-white flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(selectedIssue.reportedDate).toLocaleDateString()} by {selectedIssue.reportedBy}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 py-4 border-t border-white/10">
                  <span className="flex items-center gap-1 text-sm text-slate-400">
                    <ThumbsUp className="w-4 h-4" />
                    {selectedIssue.upvotes} upvotes
                  </span>
                  <span className="flex items-center gap-1 text-sm text-slate-400">
                    <MessageSquare className="w-4 h-4" />
                    {selectedIssue.comments} comments
                  </span>
                </div>

                {onUpdateStatus && (
                  <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
                    {selectedIssue.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                          onClick={() => { onUpdateStatus(selectedIssue.id, 'verified'); setSelectedIssue(null); }}
                        >
                          Mark as Verified
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-white/20 text-white"
                          onClick={() => { onUpdateStatus(selectedIssue.id, 'under-review'); setSelectedIssue(null); }}
                        >
                          Under Review
                        </Button>
                      </>
                    )}
                    {selectedIssue.status === 'verified' && (
                      <Button
                        size="sm"
                        className="bg-purple-500/20 text-purple-400 border border-purple-500/30"
                        onClick={() => { onUpdateStatus(selectedIssue.id, 'in-progress'); setSelectedIssue(null); }}
                      >
                        Mark In Progress
                      </Button>
                    )}
                    {selectedIssue.status === 'in-progress' && (
                      <Button
                        size="sm"
                        className="bg-green-500/20 text-green-400 border border-green-500/30"
                        onClick={() => { onUpdateStatus(selectedIssue.id, 'resolved'); setSelectedIssue(null); }}
                      >
                        Mark Resolved
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
