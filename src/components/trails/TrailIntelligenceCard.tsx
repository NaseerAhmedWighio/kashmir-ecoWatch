// Trail Intelligence Card Component
// Enhanced trail card with full ecological metadata

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { TrailIntelligence } from '@/data/trails-sightings';
import {
  MapPin, Mountain, Clock, TrendingUp, AlertTriangle,
  Shield, Calendar, Eye, ArrowRight, Leaf, Droplets
} from 'lucide-react';
import { motion } from 'framer-motion';

interface TrailIntelligenceCardProps {
  trail: TrailIntelligence;
  onClick?: (trail: TrailIntelligence) => void;
}

const difficultyColors = {
  easy: 'from-emerald-500 to-green-600',
  moderate: 'from-lime-500 to-green-600',
  difficult: 'from-amber-500 to-orange-600',
  technical: 'from-red-500 to-rose-600'
};

const sensitivityColors = {
  low: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  critical: 'bg-red-500/20 text-red-400 border-red-500/30'
};

const accessStatusColors = {
  open: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  restricted: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  closed: 'bg-red-500/20 text-red-400 border-red-500/30',
  'permit-required': 'bg-orange-500/20 text-orange-400 border-orange-500/30'
};

const routeConditionColors = {
  excellent: 'text-emerald-400',
  good: 'text-lime-400',
  fair: 'text-amber-400',
  poor: 'text-orange-400',
  hazardous: 'text-red-400'
};

const trailClassIcons = {
  flagship: Shield,
  sensitive: AlertTriangle,
  wetland: Droplets,
  seasonal: Calendar,
  'protected-area': Shield,
  'high-altitude': Mountain
};

export function TrailIntelligenceCard({ trail, onClick }: TrailIntelligenceCardProps) {
  const TrailClassIcon = trailClassIcons[trail.trailClass];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="glass-intense border-white/10 hover:border-emerald-500/30 transition-all overflow-hidden cursor-pointer group h-full"
        onClick={() => onClick?.(trail)}
      >
        {/* Header with Trail Class Badge */}
        <div className="relative mb-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${difficultyColors[trail.difficulty]} flex items-center justify-center shadow-lg`}>
                <Mountain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                  {trail.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <MapPin className="w-3 h-3" />
                  {trail.district.join(', ')}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="outline" size="sm" className="border-white/10 text-xs">
                <TrailClassIcon className="w-3 h-3 mr-1" />
                {trail.trailClass}
              </Badge>
            </div>
          </div>
          
          {/* Access & Sensitivity Status */}
          <div className="flex items-center gap-2 mb-3">
            <Badge 
              size="sm" 
              className={`border ${accessStatusColors[trail.accessStatus]} text-xs`}
            >
              {trail.accessStatus.replace('-', ' ')}
            </Badge>
            
            <Badge 
              size="sm" 
              className={`border ${sensitivityColors[trail.sensitivity]} text-xs`}
            >
              {trail.sensitivity} sensitivity
            </Badge>
            
            {trail.relatedProtectedArea && (
              <Badge variant="outline" size="sm" className="border-amber-500/30 text-amber-400 text-xs">
                <Shield className="w-3 h-3 mr-1" />
                Protected Area
              </Badge>
            )}
          </div>
        </div>
        
        {/* Description */}
        <p className="text-sm text-slate-400 mb-4 line-clamp-2 leading-relaxed">
          {trail.description}
        </p>
        
        {/* Trail Intelligence Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {/* Altitude */}
          <div className="p-2 rounded-lg bg-white/5 border border-white/5">
            <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
              <Mountain className="w-3 h-3" />
              Altitude
            </div>
            <div className="text-sm font-semibold text-white">
              {trail.altitudeBand.min}-{trail.altitudeBand.max}m
            </div>
          </div>
          
          {/* Length & Duration */}
          <div className="p-2 rounded-lg bg-white/5 border border-white/5">
            <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
              <Clock className="w-3 h-3" />
              Duration
            </div>
            <div className="text-sm font-semibold text-white">
              {trail.duration.min}-{trail.duration.max}h
            </div>
          </div>
          
          {/* Season Window */}
          <div className="p-2 rounded-lg bg-white/5 border border-white/5 col-span-2">
            <div className="flex items-center gap-1 text-xs text-slate-500 mb-1">
              <Calendar className="w-3 h-3" />
              Best Time
            </div>
            <div className="text-sm font-semibold text-white">
              {trail.seasonWindow.optimal.slice(0, 3).join(', ')}
              {trail.seasonWindow.optimal.length > 3 && '...'}
            </div>
          </div>
        </div>
        
        {/* Route Condition */}
        <div className="p-3 rounded-lg bg-white/5 border border-white/5 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className={`w-4 h-4 ${routeConditionColors[trail.routeCondition.status]}`} />
              <span className="text-xs text-slate-400">Route Condition</span>
            </div>
            <span className={`text-xs font-semibold ${routeConditionColors[trail.routeCondition.status]}`}>
              {trail.routeCondition.status.toUpperCase()}
            </span>
          </div>
          {trail.routeCondition.hazards && trail.routeCondition.hazards.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {trail.routeCondition.hazards.slice(0, 3).map((hazard, idx) => (
                <Badge key={idx} variant="outline" size="sm" className="text-xs border-red-500/30 text-red-400">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  {hazard}
                </Badge>
              ))}
            </div>
          )}
        </div>
        
        {/* Observer Activity */}
        <div className="p-3 rounded-lg bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-medium text-emerald-400">Observer Activity</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-lg font-bold text-white">{trail.observerActivity.totalObservers}</div>
              <div className="text-xs text-slate-500">Observers</div>
            </div>
            <div>
              <div className="text-lg font-bold text-white">{trail.observerActivity.totalSightings}</div>
              <div className="text-xs text-slate-500">Sightings</div>
            </div>
            <div>
              <div className="text-lg font-bold text-emerald-400">{trail.observerActivity.verifiedSightings}</div>
              <div className="text-xs text-slate-500">Verified</div>
            </div>
          </div>
        </div>
        
        {/* Features */}
        {trail.features.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {trail.features.slice(0, 4).map((feature, idx) => (
              <Badge key={idx} variant="outline" size="sm" className="text-xs border-white/10 text-slate-400">
                {feature}
              </Badge>
            ))}
          </div>
        )}
        
        {/* CTA */}
        <div className="flex items-center text-sm font-medium text-emerald-400 group-hover:text-emerald-300 transition-colors">
          <span>View Trail Intelligence</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </Card>
    </motion.div>
  );
}
