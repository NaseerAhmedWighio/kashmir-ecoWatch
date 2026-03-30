'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { insightPanels } from '@/lib/data';
import { 
  ChevronDown, 
  ChevronUp, 
  AlertTriangle, 
  Flower, 
  PawPrint, 
  Wind, 
  Droplets,
  MapPin,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  critical: { 
    color: 'bg-red-500', 
    icon: <AlertTriangle className="w-4 h-4" /> 
  },
  warning: { 
    color: 'bg-amber-500', 
    icon: <AlertTriangle className="w-4 h-4" /> 
  },
  normal: { 
    color: 'bg-emerald-500', 
    icon: <Wind className="w-4 h-4" /> 
  },
  info: { 
    color: 'bg-blue-500', 
    icon: <Wind className="w-4 h-4" /> 
  },
};

const iconConfig: Record<string, React.ComponentType<{ className?: string }>> = {
  'wetland-stress': Droplets,
  'bloom-activity': Flower,
  'wildlife-sightings': PawPrint,
  'air-quality': Wind,
  'spring-vulnerability': Droplets,
};

export function SmartInsightPanels() {
  const [expandedPanel, setExpandedPanel] = useState<string | null>('wetland-stress');

  const togglePanel = (id: string) => {
    setExpandedPanel(expandedPanel === id ? null : id);
  };

  const getSeverityBadge = (severity?: string) => {
    if (!severity) return null;
    const config: Record<string, { variant: 'danger' | 'warning' | 'info' }> = {
      high: { variant: 'danger' },
      medium: { variant: 'warning' },
      low: { variant: 'info' },
    };
    return (
      <Badge variant={config[severity]?.variant || 'info'} size="sm">
        {severity}
      </Badge>
    );
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-IN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
              Real-time Intelligence
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Smart Insight Panels
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
            Monitor critical environmental indicators, ecological events, and 
            emerging patterns across Kashmir's ecosystems.
          </p>
        </motion.div>

        {/* Panels grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {insightPanels.map((panel, index) => {
            const status = statusConfig[panel.status];
            const IconComponent = iconConfig[panel.id] || Wind;
            const isExpanded = expandedPanel === panel.id;

            return (
              <motion.div
                key={panel.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'ring-2 ring-forest-500/20' : ''}`}
                  padding="none"
                  hover={false}
                >
                  {/* Panel header */}
                  <div
                    className="flex items-center justify-between p-5 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    onClick={() => togglePanel(panel.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-forest-500 to-forest-700 text-white flex items-center justify-center`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base">{panel.title}</CardTitle>
                          <div className={`w-2 h-2 rounded-full ${status.color} animate-pulse`} />
                        </div>
                        <CardDescription className="text-xs mt-0.5">
                          {panel.items.length} active items
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={panel.status === 'critical' ? 'danger' : panel.status === 'warning' ? 'warning' : 'info'}
                        size="sm"
                      >
                        {panel.status}
                      </Badge>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-slate-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Panel content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="border-t border-slate-200 dark:border-slate-700" />
                        <CardContent>
                          {/* Description */}
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                            {panel.description}
                          </p>

                          {/* Items list */}
                          <div className="space-y-3">
                            {panel.items.map((item, idx) => (
                              <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                              >
                                <div className="flex-shrink-0 mt-0.5">
                                  <div className={`w-2 h-2 rounded-full ${
                                    item.severity === 'high' ? 'bg-red-500' :
                                    item.severity === 'medium' ? 'bg-amber-500' :
                                    'bg-emerald-500'
                                  }`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2 mb-1">
                                    <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                                      {item.title}
                                    </h4>
                                    {getSeverityBadge(item.severity)}
                                  </div>
                                  <div className="flex items-center gap-4 text-xs text-slate-500">
                                    {item.location && (
                                      <div className="flex items-center gap-1">
                                        <MapPin className="w-3 h-3" />
                                        <span>{item.location}</span>
                                      </div>
                                    )}
                                    <div className="flex items-center gap-1">
                                      <Calendar className="w-3 h-3" />
                                      <span>{formatDate(item.timestamp)}</span>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          {/* View all link */}
                          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                            <button className="text-sm font-medium text-forest-600 dark:text-forest-400 hover:text-forest-700 dark:hover:text-forest-300 transition-colors flex items-center gap-1">
                              View All {panel.title.toLowerCase()}
                              <ChevronDown className="w-4 h-4 -rotate-90" />
                            </button>
                          </div>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
