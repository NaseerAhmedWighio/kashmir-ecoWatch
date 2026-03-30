'use client';

import React from 'react';
import { X, ExternalLink, MapPin, Calendar, Activity, Shield, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface EntityDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  entity: {
    type: string;
    name: string;
    description: string;
    status?: string;
    location?: string;
    district?: string;
    metrics?: Array<{ label: string; value: string | number }>;
    slug: string;
  };
}

export function EntityDrawer({ isOpen, onClose, entity }: EntityDrawerProps) {
  const router = useRouter();

  const getTypeConfig = (type: string) => {
    const configs: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
      species: { label: 'Species', color: 'bg-purple-500', icon: <Activity className="w-4 h-4" /> },
      protected_area: { label: 'Protected Area', color: 'bg-emerald-500', icon: <Shield className="w-4 h-4" /> },
      lake: { label: 'Lake', color: 'bg-blue-500', icon: <MapPin className="w-4 h-4" /> },
      wetland: { label: 'Wetland', color: 'bg-cyan-500', icon: <MapPin className="w-4 h-4" /> },
      trail: { label: 'Trail', color: 'bg-amber-500', icon: <MapPin className="w-4 h-4" /> },
      district: { label: 'District', color: 'bg-slate-500', icon: <MapPin className="w-4 h-4" /> },
      spring: { label: 'Spring', color: 'bg-sky-500', icon: <MapPin className="w-4 h-4" /> },
    };
    return configs[type] || { label: 'Entity', color: 'bg-slate-500', icon: <MapPin className="w-4 h-4" /> };
  };

  const typeConfig = getTypeConfig(entity.type);

  const handleViewDetails = () => {
    onClose();
    // Route based on entity type
    const routes: Record<string, string> = {
      species: '/biodiversity',
      protected_area: '/protected-areas',
      lake: '/water-systems/lakes',
      wetland: '/water-systems/wetlands',
      trail: '/trails-sightings/trails',
      district: '/districts',
      spring: '/water-systems/springs',
    };
    router.push(`${routes[entity.type] || '/'}/${entity.slug}`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-slate-900 border-l border-white/10 z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-xl border-b border-white/10 p-6 z-10">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${typeConfig.color} flex items-center justify-center`}>
                    {typeConfig.icon}
                  </div>
                  <div>
                    <Badge variant="info" size="sm" className="mb-1">
                      {typeConfig.label}
                    </Badge>
                    <h2 className="text-xl font-bold text-white">{entity.name}</h2>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <p className="text-slate-300 leading-relaxed">{entity.description}</p>
              </div>

              {/* Location */}
              {entity.location && (
                <div className="glass-light rounded-xl p-4 border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Location</span>
                  </div>
                  <p className="text-white font-medium">{entity.location}</p>
                  {entity.district && (
                    <p className="text-sm text-slate-400 mt-1">{entity.district} District</p>
                  )}
                </div>
              )}

              {/* Metrics */}
              {entity.metrics && entity.metrics.length > 0 && (
                <div className="glass-light rounded-xl p-4 border border-white/5">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Key Metrics</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {entity.metrics.map((metric, idx) => (
                      <div key={idx}>
                        <div className="text-xs text-slate-500 uppercase mb-1">{metric.label}</div>
                        <div className="text-lg font-bold text-white">{metric.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Status */}
              {entity.status && (
                <div className="glass-light rounded-xl p-4 border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Status</span>
                  </div>
                  <Badge variant="info">{entity.status}</Badge>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
                <Button
                  onClick={handleViewDetails}
                  className="w-full bg-gradient-to-r from-forest-600 to-forest-500"
                  icon={<ExternalLink className="w-4 h-4" />}
                >
                  View Full Details
                </Button>
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="w-full border-white/20 text-white"
                >
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
