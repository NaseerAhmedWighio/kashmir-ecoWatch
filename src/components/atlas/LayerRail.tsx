'use client';

import React from 'react';
import { Layers, Eye, EyeOff, ChevronRight, Filter, MapPin, Mountain, Droplet, TreePine, Shield, AlertTriangle, Footprints, Flower } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';

interface LayerGroup {
  id: string;
  label: string;
  icon: React.ReactNode;
  layers: LayerItem[];
}

interface LayerItem {
  id: string;
  label: string;
  color: string;
  count?: number;
  visible: boolean;
}

interface LayerRailProps {
  isOpen?: boolean;
  onClose?: () => void;
  layers: LayerGroup[];
  onToggleLayer: (groupId: string, layerId: string) => void;
  activeFilters?: Array<{ label: string; value: string }>;
  onRemoveFilter?: (index: number) => void;
}

const getIcon = (iconName: string) => {
  const icons: Record<string, React.ReactNode> = {
    boundaries: <MapPin className="h-4 w-4" />,
    water: <Droplet className="h-4 w-4" />,
    biodiversity: <TreePine className="h-4 w-4" />,
    seasonal: <Flower className="h-4 w-4" />,
    trails: <Footprints className="h-4 w-4" />,
    risk: <AlertTriangle className="h-4 w-4" />,
  };
  return icons[iconName] || <Layers className="h-4 w-4" />;
};

export function LayerRail({
  isOpen = true,
  onClose,
  layers,
  onToggleLayer,
  activeFilters = [],
  onRemoveFilter,
}: LayerRailProps) {
  const [expandedGroups, setExpandedGroups] = React.useState<Record<string, boolean>>({
    boundaries: true,
    water: true,
    biodiversity: false,
    seasonal: false,
    trails: false,
    risk: false,
  });

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[300] md:hidden"
            onClick={onClose}
          />

          {/* Rail panel */}
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-16 bottom-0 w-80 bg-slate-900/95 backdrop-blur-xl border-r border-white/10 z-[301] overflow-y-auto"
          >
            <div className="p-4 space-y-4">
              {/* Active Filters */}
              {activeFilters.length > 0 && (
                <div className="pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Filter className="h-4 w-4 text-slate-400" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Active Filters
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeFilters.map((filter, idx) => (
                      <Badge
                        key={idx}
                        variant="info"
                        size="sm"
                        className="cursor-pointer hover:bg-red-500/20 hover:text-red-400"
                      >
                        {filter.label}: {filter.value}
                        <button
                          onClick={() => onRemoveFilter?.(idx)}
                          className="ml-1 hover:text-red-400"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Layer Groups */}
              {layers.map((group) => (
                <div key={group.id} className="border-b border-white/5 last:border-0 pb-4 last:pb-0">
                  {/* Group Header */}
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className="w-full flex items-center justify-between gap-2 py-2 hover:bg-white/5 rounded-lg px-2 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">{getIcon(group.id)}</span>
                      <span className="text-sm font-semibold text-white uppercase tracking-wider">
                        {group.label}
                      </span>
                    </div>
                    <ChevronRight
                      className={`h-4 w-4 text-slate-500 transition-transform ${
                        expandedGroups[group.id] ? 'rotate-90' : ''
                      }`}
                    />
                  </button>

                  {/* Group Layers */}
                  <AnimatePresence>
                    {expandedGroups[group.id] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-2 space-y-1">
                          {group.layers.map((layer) => (
                            <button
                              key={layer.id}
                              onClick={() => onToggleLayer(group.id, layer.id)}
                              className="w-full flex items-center justify-between gap-3 py-2 px-2 rounded-lg hover:bg-white/5 transition-colors group"
                            >
                              <div className="flex items-center gap-3 flex-1">
                                <div
                                  className={`w-2.5 h-2.5 rounded-full ${layer.color} ${
                                    layer.visible ? '' : 'opacity-30'
                                  }`}
                                />
                                <span
                                  className={`text-sm ${
                                    layer.visible ? 'text-white' : 'text-slate-500'
                                  }`}
                                >
                                  {layer.label}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                {layer.count !== undefined && (
                                  <span className="text-xs text-slate-500 tabular-nums">
                                    {layer.count.toLocaleString()}
                                  </span>
                                )}
                                {layer.visible ? (
                                  <Eye className="h-4 w-4 text-emerald-400" />
                                ) : (
                                  <EyeOff className="h-4 w-4 text-slate-600" />
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
