'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { submittedSightings, SubmittedSighting, SightingStatus, getSightingsByStatus } from '@/data/contribution-intelligence';
import { Eye, MapPin, Calendar, Camera, CheckCircle2, X, Star, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const statusColors: Record<SightingStatus, string> = {
  'pending': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'verified': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'rejected': 'bg-red-500/20 text-red-400 border-red-500/30',
  'featured': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

const categoryColors: Record<string, string> = {
  'mammal': 'text-emerald-400 bg-emerald-500/10',
  'bird': 'text-blue-400 bg-blue-500/10',
  'reptile': 'text-amber-400 bg-amber-500/10',
  'fish': 'text-cyan-400 bg-cyan-500/10',
  'plant': 'text-green-400 bg-green-500/10',
  'other': 'text-slate-400 bg-slate-500/10',
};

interface SightingsIntelligenceProps {
  compact?: boolean;
  filterStatus?: SightingStatus;
  onVerifySighting?: (sightingId: string) => void;
}

export function SightingsIntelligence({ compact = false, filterStatus, onVerifySighting }: SightingsIntelligenceProps) {
  const [selectedSighting, setSelectedSighting] = useState<SubmittedSighting | null>(null);
  const [statusFilter, setStatusFilter] = useState<SightingStatus | 'all'>('all');

  const activeFilter = filterStatus || statusFilter;
  const sightings = activeFilter === 'all' ? submittedSightings : getSightingsByStatus(activeFilter);

  const statusCounts: Record<SightingStatus, number> = {
    'pending': getSightingsByStatus('pending').length,
    'verified': getSightingsByStatus('verified').length,
    'rejected': getSightingsByStatus('rejected').length,
    'featured': getSightingsByStatus('featured').length,
  };

  if (compact) {
    return (
      <Card className="glass-intense border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-emerald-400" />
            Recent Sightings
          </h3>
          <Badge variant="success" size="sm">{statusCounts.verified} verified</Badge>
        </div>
        <div className="space-y-3">
          {sightings.slice(0, 5).map(sighting => (
            <div
              key={sighting.id}
              className="flex items-start gap-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer"
              onClick={() => setSelectedSighting(sighting)}
            >
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center flex-shrink-0">
                <Camera className="w-5 h-5 text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-white truncate">{sighting.speciesName}</h4>
                  {sighting.status === 'featured' && <Star className="w-4 h-4 text-purple-400 fill-purple-400" />}
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <span className={cn("px-1.5 py-0.5 rounded", categoryColors[sighting.speciesCategory])}>
                    {sighting.speciesCategory}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {sighting.location.district}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {(['pending', 'verified', 'rejected', 'featured'] as SightingStatus[]).map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(statusFilter === status ? 'all' : status)}
            className={cn(
              "p-4 rounded-xl border transition-all",
              statusFilter === status
                ? statusColors[status]
                : "border-white/10 hover:border-white/20 bg-slate-800/50"
            )}
          >
            <div className="text-2xl font-bold text-white mb-1">{statusCounts[status]}</div>
            <div className="text-xs font-medium capitalize text-slate-400">{status}</div>
          </button>
        ))}
      </div>

      {/* Sightings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sightings.map(sighting => (
          <motion.div
            key={sighting.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="glass-intense border-white/10 p-5 hover:border-emerald-500/30 transition-all cursor-pointer" onClick={() => setSelectedSighting(sighting)}>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center flex-shrink-0">
                  <Camera className="w-8 h-8 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-base font-bold text-white mb-1">{sighting.speciesName}</h4>
                      {sighting.scientificName && (
                        <p className="text-xs text-slate-500 italic">{sighting.scientificName}</p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {sighting.status === 'featured' && <Star className="w-4 h-4 text-purple-400 fill-purple-400" />}
                      <Badge className={cn("border", statusColors[sighting.status])}>
                        {sighting.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className={cn("px-1.5 py-0.5 rounded", categoryColors[sighting.speciesCategory])}>
                      {sighting.speciesCategory}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {sighting.location.area}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(sighting.observedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Sighting Detail Modal */}
      <AnimatePresence>
        {selectedSighting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedSighting(null)}
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
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <Badge className={cn("border mb-1", statusColors[selectedSighting.status])}>
                        {selectedSighting.status}
                      </Badge>
                      <h3 className="text-xl font-bold text-white">{selectedSighting.speciesName}</h3>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => setSelectedSighting(null)}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {selectedSighting.scientificName && (
                  <p className="text-sm text-slate-500 italic mb-4">{selectedSighting.scientificName}</p>
                )}

                <p className="text-slate-400 mb-4">{selectedSighting.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Location</div>
                    <div className="text-sm text-white">{selectedSighting.location.area}, {selectedSighting.location.district}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Habitat</div>
                    <div className="text-sm text-white">{selectedSighting.location.habitat || 'N/A'}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Observed</div>
                    <div className="text-sm text-white">{new Date(selectedSighting.observedDate).toLocaleDateString()}</div>
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 mb-1">Submitted By</div>
                    <div className="text-sm text-white">{selectedSighting.submittedBy}</div>
                  </div>
                </div>

                {selectedSighting.count && (
                  <div className="mb-4">
                    <div className="text-xs text-slate-500 mb-1">Count</div>
                    <div className="text-sm text-white">{selectedSighting.count} individual(s)</div>
                  </div>
                )}

                {onVerifySighting && selectedSighting.status === 'pending' && (
                  <div className="flex gap-2 mt-4 pt-4 border-t border-white/10">
                    <Button
                      size="sm"
                      className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      onClick={() => { onVerifySighting(selectedSighting.id); setSelectedSighting(null); }}
                    >
                      <CheckCircle2 className="w-4 h-4 mr-1" />
                      Verify Sighting
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/20 text-white"
                      onClick={() => setSelectedSighting(null)}
                    >
                      Close
                    </Button>
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
