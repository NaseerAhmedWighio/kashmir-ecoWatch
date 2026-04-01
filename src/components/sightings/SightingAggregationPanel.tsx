// Sighting Aggregation Panel Component
// Analytical sighting breakdown with verification states and distributions

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SightingAggregation } from '@/data/trails-sightings';
import {
  Eye, MapPin, Calendar, Leaf, TrendingUp, CheckCircle,
  Clock, Users, AlertTriangle, ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SightingAggregationPanelProps {
  aggregation: SightingAggregation;
  onClick?: (aggregation: SightingAggregation) => void;
}

const verificationColors = {
  verified: 'bg-emerald-500 text-white',
  reviewed: 'bg-amber-500 text-white',
  community: 'bg-sky-500 text-white',
  pending: 'bg-slate-500 text-white'
};

export function SightingAggregationPanel({ aggregation, onClick }: SightingAggregationPanelProps) {
  const totalVerified = aggregation.verifiedCount + aggregation.reviewedCount;
  const verificationRate = Math.round((totalVerified / aggregation.totalCount) * 100);
  
  // Get top 3 districts
  const topDistricts = Object.entries(aggregation.byDistrict)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  
  // Get top 3 habitats
  const topHabitats = Object.entries(aggregation.byHabitat)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
  
  // Get peak season
  const peakSeason = Object.entries(aggregation.bySeason)
    .sort((a, b) => b[1] - a[1])[0];
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="glass-light border-white/10 hover:border-emerald-500/30 transition-all p-6 cursor-pointer group h-full"
        onClick={() => onClick?.(aggregation)}
      >
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
              {aggregation.title}
            </h3>
            <Badge variant="info" size="lg">{aggregation.totalCount.toLocaleString()}</Badge>
          </div>
          <p className="text-sm text-slate-400">Total observations</p>
        </div>
        
        {/* Verification Breakdown */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-white">Verification Status</span>
            </div>
            <Badge variant="outline" size="sm" className="border-emerald-500/30 text-emerald-400">
              {verificationRate}% verified
            </Badge>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {[
              { status: 'verified', count: aggregation.verifiedCount, label: 'Verified' },
              { status: 'reviewed', count: aggregation.reviewedCount, label: 'Reviewed' },
              { status: 'community', count: aggregation.communityCount, label: 'Community' },
              { status: 'pending', count: aggregation.pendingCount, label: 'Pending' }
            ].map((item) => (
              <div key={item.status} className="text-center">
                <div className={`text-2xl font-bold ${verificationColors[item.status as keyof typeof verificationColors].replace('bg-', 'text-').split(' ')[0]}`}>
                  {item.count.toLocaleString()}
                </div>
                <div className="text-xs text-slate-500 mt-1">{item.label}</div>
              </div>
            ))}
          </div>
          
          {/* Verification Progress Bar */}
          <div className="mt-3 h-2 bg-slate-800 rounded-full overflow-hidden flex">
            <div 
              className="bg-emerald-500 h-full transition-all"
              style={{ width: `${(aggregation.verifiedCount / aggregation.totalCount) * 100}%` }}
            />
            <div 
              className="bg-amber-500 h-full transition-all"
              style={{ width: `${(aggregation.reviewedCount / aggregation.totalCount) * 100}%` }}
            />
            <div 
              className="bg-sky-500 h-full transition-all"
              style={{ width: `${(aggregation.communityCount / aggregation.totalCount) * 100}%` }}
            />
            <div 
              className="bg-slate-500 h-full transition-all"
              style={{ width: `${(aggregation.pendingCount / aggregation.totalCount) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Geographic & Habitat Distribution */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* District Distribution */}
          <div className="p-3 rounded-lg bg-white/5 border border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-sky-400" />
              <span className="text-xs font-medium text-slate-400">Top Districts</span>
            </div>
            <div className="space-y-2">
              {topDistricts.map(([district, count], idx) => (
                <div key={district} className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">{district}</span>
                  <Badge variant="outline" size="sm" className="text-xs border-white/10">
                    {count.toLocaleString()}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
          
          {/* Habitat Distribution */}
          <div className="p-3 rounded-lg bg-white/5 border border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-medium text-slate-400">Top Habitats</span>
            </div>
            <div className="space-y-2">
              {topHabitats.map(([habitat, count], idx) => (
                <div key={habitat} className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 capitalize">{habitat.replace('-', ' ')}</span>
                  <Badge variant="outline" size="sm" className="text-xs border-white/10">
                    {count.toLocaleString()}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Seasonal Concentration */}
        <div className="p-3 rounded-lg bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-white">Seasonal Peak</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-white capitalize">{peakSeason?.[0] || 'N/A'}</div>
              <div className="text-xs text-slate-400">Peak season</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-amber-400">{peakSeason?.[1].toLocaleString() || 0}</div>
              <div className="text-xs text-slate-400">sightings</div>
            </div>
          </div>
        </div>
        
        {/* High-Value Records */}
        {aggregation.highValueRecords.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-white">High-Value Records</span>
            </div>
            <div className="space-y-2">
              {aggregation.highValueRecords.slice(0, 2).map((record, idx) => (
                <div key={idx} className="p-2 rounded-lg bg-white/5 border border-white/5">
                  <div className="text-sm font-semibold text-white mb-1">{record.species}</div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{record.location}, {record.district}</span>
                    <span>{record.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Recent Verified Preview */}
        {aggregation.recentVerified.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-white">Recent Verified</span>
            </div>
            <div className="space-y-2">
              {aggregation.recentVerified.slice(0, 2).map((sighting) => (
                <div key={sighting.id} className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <div className="text-sm font-semibold text-white mb-1">{sighting.speciesName}</div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{sighting.location}</span>
                    <span>{sighting.observationDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* CTA */}
        <div className="flex items-center text-sm font-medium text-emerald-400 group-hover:text-emerald-300 transition-colors">
          <span>Explore {aggregation.title}</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </Card>
    </motion.div>
  );
}
