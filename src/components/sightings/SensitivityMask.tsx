// Sensitivity Mask Component
// Displays sensitive data with appropriate masking and warnings

import React, { useState } from 'react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { SensitivityLevel } from '@/data/trails-sightings';
import { AlertTriangle, Eye, EyeOff, Info, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SensitivityMaskProps {
  sensitivity: SensitivityLevel;
  reason?: string;
  coordinates?: { lat: number; lng: number };
  locationName?: string;
  children?: React.ReactNode;
}

const sensitivityConfig = {
  low: {
    icon: Shield,
    color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    label: 'Low Sensitivity',
    maskLevel: 'none'
  },
  medium: {
    icon: AlertTriangle,
    color: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    label: 'Medium Sensitivity',
    maskLevel: 'partial'
  },
  high: {
    icon: AlertTriangle,
    color: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    label: 'High Sensitivity',
    maskLevel: 'significant'
  },
  critical: {
    icon: AlertTriangle,
    color: 'bg-red-500/20 text-red-400 border-red-500/30',
    label: 'Critical Sensitivity',
    maskLevel: 'full'
  }
};

export function SensitivityMask({ 
  sensitivity, 
  reason,
  coordinates,
  locationName,
  children 
}: SensitivityMaskProps) {
  const [showDetails, setShowDetails] = useState(false);
  const config = sensitivityConfig[sensitivity];
  const Icon = config.icon;
  
  const shouldMask = sensitivity !== 'low';
  const isRevealed = showDetails || sensitivity === 'low';
  
  return (
    <div className="space-y-3">
      {/* Sensitivity Banner */}
      <div className={`p-3 rounded-lg border ${config.color} flex items-start gap-3`}>
        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm font-semibold">{config.label}</span>
            {shouldMask && (
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-xs underline hover:no-underline opacity-80 hover:opacity-100 transition-opacity"
              >
                {isRevealed ? 'Hide Details' : 'Show Details'}
              </button>
            )}
          </div>
          {reason && (
            <p className="text-xs opacity-80 leading-relaxed">{reason}</p>
          )}
        </div>
      </div>
      
      {/* Masked Location Display */}
      {shouldMask && locationName && (
        <AnimatePresence>
          {!isRevealed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3 rounded-lg bg-slate-800/50 border border-slate-700"
            >
              <div className="flex items-center gap-2 text-slate-400">
                <EyeOff className="w-4 h-4" />
                <span className="text-sm">
                  {sensitivity === 'critical' 
                    ? 'Location details hidden to protect sensitive species'
                    : 'Location approximate to protect species habitat'}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
      
      {/* Coordinates Display (Masked or Revealed) */}
      {coordinates && (
        <AnimatePresence>
          {isRevealed ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 rounded-lg bg-white/5 border border-white/5 font-mono text-sm"
            >
              <div className="flex items-center gap-2 text-slate-400 mb-1">
                <Eye className="w-4 h-4" />
                <span>Coordinates</span>
              </div>
              <div className="text-white">
                {coordinates.lat.toFixed(6)}, {coordinates.lng.toFixed(6)}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 rounded-lg bg-slate-800/50 border border-slate-700 font-mono text-sm"
            >
              <div className="flex items-center gap-2 text-slate-500 mb-1">
                <EyeOff className="w-4 h-4" />
                <span>Coordinates Masked</span>
              </div>
              <div className="text-slate-600">
                {sensitivity === 'critical' 
                  ? 'District-level only'
                  : sensitivity === 'high'
                  ? '±1km accuracy'
                  : '±100m accuracy'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
      
      {/* Children Content (May Be Masked) */}
      {children && (
        <div className={shouldMask && !isRevealed ? 'blur-sm select-none pointer-events-none' : ''}>
          {children}
        </div>
      )}
      
      {/* Information Note */}
      {shouldMask && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20"
        >
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-blue-300 leading-relaxed">
              Location data is intentionally obfuscated to protect sensitive species from 
              disturbance, poaching, or habitat degradation. This is standard practice in 
              conservation biology for vulnerable and critically endangered species.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
