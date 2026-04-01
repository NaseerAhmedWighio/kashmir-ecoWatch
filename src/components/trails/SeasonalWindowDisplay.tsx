// Seasonal Window Display Component
// Shows seasonal access windows and route conditions

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SeasonalWindow } from '@/data/trails-sightings';
import {
  Calendar, Clock, TrendingUp, AlertTriangle, CheckCircle,
  Leaf, Snowflake, Sun, Wind, ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SeasonalWindowDisplayProps {
  window: SeasonalWindow;
  compact?: boolean;
}

const seasonIcons = {
  spring: Leaf,
  summer: Sun,
  autumn: Wind,
  winter: Snowflake
};

const statusColors = {
  optimal: 'from-emerald-500 to-green-600',
  good: 'from-lime-500 to-green-600',
  fair: 'from-amber-500 to-orange-600',
  poor: 'from-orange-500 to-red-600',
  closed: 'from-red-500 to-rose-600'
};

const statusBadgeColors = {
  optimal: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  good: 'bg-lime-500/20 text-lime-400 border-lime-500/30',
  fair: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  poor: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  closed: 'bg-red-500/20 text-red-400 border-red-500/30'
};

const monthGroups = {
  Q1: ['January', 'February', 'March'],
  Q2: ['April', 'May', 'June'],
  Q3: ['July', 'August', 'September'],
  Q4: ['October', 'November', 'December']
};

export function SeasonalWindowDisplay({ window, compact = false }: SeasonalWindowDisplayProps) {
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const isCurrentMonth = window.months.includes(currentMonth);
  
  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="p-3 rounded-lg bg-white/5 border border-white/5"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-white">{window.name}</span>
          </div>
          <Badge 
            size="sm" 
            className={statusBadgeColors[window.accessConditions.status]}
          >
            {window.accessConditions.status}
          </Badge>
        </div>
        <p className="text-xs text-slate-400 mb-2">{window.description}</p>
        <div className="flex flex-wrap gap-1">
          {window.months.slice(0, 4).map((month) => (
            <Badge 
              key={month} 
              variant="outline" 
              size="sm" 
              className={`text-xs border-white/10 ${
                month === currentMonth ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : ''
              }`}
            >
              {month.slice(0, 3)}
            </Badge>
          ))}
          {window.months.length > 4 && (
            <Badge variant="outline" size="sm" className="text-xs border-white/10 text-slate-500">
              +{window.months.length - 4}
            </Badge>
          )}
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="glass-intense border-white/10 hover:border-white/20 transition-all overflow-hidden">
        {/* Header with Status */}
        <div className="relative p-6 pb-4">
          <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${statusColors[window.accessConditions.status]}`} />
          
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${statusColors[window.accessConditions.status]} flex items-center justify-center shadow-lg`}>
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{window.name}</h3>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  {isCurrentMonth && (
                    <Badge size="sm" className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Active Now
                    </Badge>
                  )}
                  <Badge size="sm" className={statusBadgeColors[window.accessConditions.status]}>
                    {window.accessConditions.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-slate-400 leading-relaxed">
            {window.description}
          </p>
        </div>
        
        {/* Month Timeline */}
        <div className="px-6 pb-4">
          <div className="text-xs font-medium text-slate-500 mb-3 uppercase tracking-wider">
            Seasonal Window
          </div>
          <div className="grid grid-cols-12 gap-1">
            {Object.values(monthGroups).flat().map((month) => {
              const isInWindow = window.months.includes(month);
              const isOptimal = window.months.includes(month);
              const isCurrent = month === currentMonth;
              
              return (
                <div
                  key={month}
                  className={`relative h-8 rounded-md flex items-center justify-center text-xs font-medium transition-all ${
                    isCurrent
                      ? 'bg-white text-slate-900 ring-2 ring-emerald-500'
                      : isInWindow
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-600'
                  }`}
                >
                  {month.slice(0, 3)}
                  {isCurrent && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Access Conditions */}
        <div className="px-6 pb-4">
          <div className="p-4 rounded-lg bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-sky-400" />
              <span className="text-sm font-medium text-white">Access Conditions</span>
            </div>
            <p className="text-sm text-slate-400">{window.accessConditions.notes}</p>
          </div>
        </div>
        
        {/* Associated Trails & Events */}
        {(window.associatedTrails.length > 0 || window.associatedEvents.length > 0) && (
          <div className="px-6 pb-6">
            <div className="grid grid-cols-2 gap-4">
              {window.associatedTrails.length > 0 && (
                <div>
                  <div className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">
                    Featured Trails
                  </div>
                  <div className="space-y-1">
                    {window.associatedTrails.slice(0, 3).map((trail, idx) => (
                      <div key={idx} className="text-sm text-slate-400 flex items-center gap-2">
                        <ArrowRight className="w-3 h-3 text-emerald-400" />
                        {trail.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {window.associatedEvents.length > 0 && (
                <div>
                  <div className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">
                    Natural Events
                  </div>
                  <div className="space-y-1">
                    {window.associatedEvents.slice(0, 3).map((event, idx) => (
                      <div key={idx} className="text-sm text-slate-400 flex items-center gap-2">
                        <Leaf className="w-3 h-3 text-amber-400" />
                        {event.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
}
