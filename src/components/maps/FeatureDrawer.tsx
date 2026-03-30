'use client';

import React from 'react';
import { X, ExternalLink, MapPin, Calendar, Activity, Shield, TrendingUp, Mountain, Droplet } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface FeatureDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  feature: {
    type: string;
    name: string;
    description: string;
    status?: string;
    location?: string;
    district?: string;
    category?: string;
    area?: number;
    elevation?: number;
    established?: number;
    keySpecies?: string[];
    metrics?: Array<{ label: string; value: string | number }>;
    slug: string;
    verificationStatus?: string;
  };
}

export function FeatureDrawer({ isOpen, onClose, feature }: FeatureDrawerProps) {
  const router = useRouter();

  const getTypeConfig = (type: string, category?: string) => {
    const configs: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
      species: { label: 'Species', color: 'bg-purple-500', icon: <Activity className="h-4 w-4" /> },
      protected_area: { 
        label: category === 'national_park' ? 'National Park' : category === 'wildlife_sanctuary' ? 'Wildlife Sanctuary' : 'Protected Area', 
        color: category === 'national_park' ? 'bg-emerald-500' : 'bg-blue-500', 
        icon: <Shield className="h-4 w-4" /> 
      },
      lake: { label: 'Lake', color: 'bg-blue-500', icon: <Droplet className="h-4 w-4" /> },
      wetland: { label: 'Wetland', color: 'bg-cyan-500', icon: <Droplet className="h-4 w-4" /> },
      trail: { label: 'Trail', color: 'bg-amber-500', icon: <MapPin className="h-4 w-4" /> },
      district: { label: 'District', color: 'bg-slate-500', icon: <MapPin className="h-4 w-4" /> },
      spring: { label: 'Spring', color: 'bg-sky-500', icon: <Droplet className="h-4 w-4" /> },
      glacier: { label: 'Glacier', color: 'bg-indigo-500', icon: <Mountain className="h-4 w-4" /> },
    };
    return configs[type] || { label: 'Entity', color: 'bg-slate-500', icon: <MapPin className="h-4 w-4" /> };
  };

  const typeConfig = getTypeConfig(feature.type, feature.category);

  const getDetailRoute = () => {
    const routes: Record<string, string> = {
      species: '/biodiversity/species',
      protected_area: feature.category === 'national_park' 
        ? '/protected-network/national-parks' 
        : '/protected-network/wildlife-sanctuaries',
      lake: '/water-systems/lakes',
      wetland: '/water-systems/wetlands',
      trail: '/trails-sightings/trails',
      district: '/districts',
      spring: '/water-systems/springs',
      glacier: '/water-systems/glaciers',
    };
    return `${routes[feature.type] || '/'}/${feature.slug}`;
  };

  const handleViewDetails = () => {
    onClose();
    router.push(getDetailRoute());
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[500]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-slate-900 border-l border-white/10 z-[501] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur-xl border-b border-white/10 p-6 z-10">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${typeConfig.color}`}>
                    {typeConfig.icon}
                  </div>
                  <div>
                    <Badge variant="info" size="sm" className="mb-1">
                      {typeConfig.label}
                    </Badge>
                    <h2 className="text-lg font-bold text-white">{feature.name}</h2>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4 p-6">
              {/* Description */}
              <div>
                <p className="text-slate-300 leading-relaxed text-sm">{feature.description}</p>
              </div>

              {/* Quick Facts */}
              {(feature.area || feature.elevation || feature.district || feature.verificationStatus) && (
                <div className="rounded-xl border border-white/5 bg-slate-800/50 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-slate-400" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Quick Facts
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {feature.area && (
                      <div>
                        <div className="mb-1 text-xs text-slate-500 uppercase">Area</div>
                        <div className="text-base font-bold text-white">{feature.area} km²</div>
                      </div>
                    )}
                    {feature.elevation && (
                      <div>
                        <div className="mb-1 text-xs text-slate-500 uppercase">Elevation</div>
                        <div className="text-base font-bold text-white">{feature.elevation}m</div>
                      </div>
                    )}
                    {feature.district && (
                      <div>
                        <div className="mb-1 text-xs text-slate-500 uppercase">District</div>
                        <div className="text-base font-bold text-white">{feature.district}</div>
                      </div>
                    )}
                    {feature.verificationStatus && (
                      <div>
                        <div className="mb-1 text-xs text-slate-500 uppercase">Status</div>
                        <Badge variant="info" size="sm">
                          {feature.verificationStatus}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Additional Metrics */}
              {feature.metrics && feature.metrics.length > 0 && (
                <div className="rounded-xl border border-white/5 bg-slate-800/50 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Activity className="h-4 w-4 text-slate-400" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Key Metrics
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {feature.metrics.map((metric, idx) => (
                      <div key={idx}>
                        <div className="mb-1 text-xs text-slate-500 uppercase">{metric.label}</div>
                        <div className="text-base font-bold text-white">{metric.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Species */}
              {feature.keySpecies && feature.keySpecies.length > 0 && (
                <div className="rounded-xl border border-white/5 bg-slate-800/50 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Shield className="h-4 w-4 text-slate-400" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Key Species
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {feature.keySpecies.map((species, idx) => (
                      <Badge key={idx} variant="secondary" size="sm">
                        {species.replace(/-/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Established */}
              {feature.established && (
                <div className="rounded-xl border border-white/5 bg-slate-800/50 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-slate-400" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Established
                    </span>
                  </div>
                  <div className="text-base font-bold text-white">{feature.established}</div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col gap-3 border-t border-white/10 pt-4">
                <Button
                  onClick={handleViewDetails}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500"
                  icon={<ExternalLink className="h-4 w-4" />}
                >
                  View Full Details
                </Button>
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="w-full border-white/20 text-white hover:bg-white/5"
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
