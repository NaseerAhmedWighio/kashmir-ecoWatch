'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { insightPanels } from '@/lib/data';
import { useRouter } from 'next/navigation';
import {
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Flower,
  PawPrint,
  Wind,
  Droplets,
  MapPin,
  Calendar,
  Clock,
  Bell,
  Activity,
  TrendingUp,
  ExternalLink,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const statusConfig: Record<string, { color: string; glow: string; icon: React.ReactNode }> = {
  critical: { 
    color: 'bg-red-500', 
    glow: 'shadow-red-500/50',
    icon: <AlertTriangle className="w-4 h-4" /> 
  },
  warning: { 
    color: 'bg-amber-500', 
    glow: 'shadow-amber-500/50',
    icon: <AlertTriangle className="w-4 h-4" /> 
  },
  normal: { 
    color: 'bg-emerald-500', 
    glow: 'shadow-emerald-500/50',
    icon: <Activity className="w-4 h-4" /> 
  },
  info: { 
    color: 'bg-blue-500', 
    glow: 'shadow-blue-500/50',
    icon: <Activity className="w-4 h-4" /> 
  },
};

const iconConfig: Record<string, React.ComponentType<{ className?: string }>> = {
  'wetland-stress': Droplets,
  'bloom-activity': Flower,
  'wildlife-sightings': PawPrint,
  'air-quality': Wind,
  'spring-vulnerability': Droplets,
};

export function ExpandableLivePanels() {
  const router = useRouter();
  const [expandedPanel, setExpandedPanel] = useState<string | null>('wetland-stress');
  const [activeTab, setActiveTab] = useState<'all' | 'critical' | 'warning'>('all');

  const togglePanel = (id: string) => {
    setExpandedPanel(expandedPanel === id ? null : id);
  };

  const getSeverityBadge = (severity?: string) => {
    if (!severity) return null;
    const config: Record<string, { variant: 'danger' | 'warning' | 'info'; label: string }> = {
      high: { variant: 'danger', label: 'HIGH' },
      medium: { variant: 'warning', label: 'MEDIUM' },
      low: { variant: 'info', label: 'LOW' },
    };
    return (
      <Badge variant={config[severity]?.variant || 'info'} size="sm">
        {config[severity]?.label}
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

  const filteredPanels = insightPanels.filter(panel => {
    if (activeTab === 'all') return true;
    if (activeTab === 'critical') return panel.status === 'critical';
    if (activeTab === 'warning') return panel.status === 'warning';
    return true;
  });

  return (
    <section className="pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 bg-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-1/4 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-red-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8 md:mb-10"
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 signal-pulse" />
            <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-slate-400">
              Real-time Monitoring
            </span>
          </div>
          <div className="flex flex-col gap-3 sm:gap-4">
            <div>
              <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 sm:mb-3 tracking-tight">
                Live Intelligence Panels
              </h2>
              <p className="text-slate-400 max-w-2xl text-xs sm:text-sm md:text-base leading-relaxed">
                Monitor critical environmental indicators, ecological events, and
                emerging patterns with real-time data feeds and automated alerts.
              </p>
            </div>

            {/* Filter tabs - scrollable on mobile */}
            <div className="flex items-center justify-between gap-1 p-1 glass-light rounded-lg border border-white/10 w-full sm:w-max overflow-x-auto">
              {[
                { id: 'all', label: 'All Feeds' },
                { id: 'critical', label: 'Critical' },
                { id: 'warning', label: 'Warnings' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'bg-forest-500/20 text-forest-400'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Panels grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
          {filteredPanels.map((panel, index) => {
            const status = statusConfig[panel.status];
            const IconComponent = iconConfig[panel.id] || Activity;
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
                  className={`glass-light border transition-all duration-500 overflow-hidden ${
                    isExpanded
                      ? 'border-forest-500/30 shadow-lg shadow-forest-500/10'
                      : 'border-white/5 hover:border-white/10'
                  }`}
                  padding="none"
                >
                  {/* Panel header */}
                  <div
                    className="flex items-center justify-between p-4 sm:p-5 md:p-6 cursor-pointer hover:bg-white/[0.02] transition-colors"
                    onClick={() => togglePanel(panel.id)}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                      {/* Icon with status */}
                      <div className="relative flex-shrink-0">
                        <div className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-forest-500 to-forest-700 text-white flex items-center justify-center shadow-lg ${status.glow}`}>
                          <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                        <div className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${status.color} border-2 border-slate-900 signal-pulse`} />
                      </div>

                      {/* Title and meta */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="text-sm sm:text-base md:text-lg font-bold text-white truncate">
                            {panel.title}
                          </h3>
                          <Badge
                            variant={panel.status === 'critical' ? 'danger' : panel.status === 'warning' ? 'warning' : 'info'}
                            size="sm"
                            className="flex-shrink-0 text-[10px] sm:text-xs"
                          >
                            {panel.status.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-slate-500 flex-wrap">
                          <span>{panel.items.length} active items</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            Updated 2m ago
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Expand indicator */}
                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg glass-light border border-white/10 flex items-center justify-center transition-transform duration-300 flex-shrink-0 ${isExpanded && 'rotate-180'}`}>
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
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
                        <div className="border-t border-white/5" />
                        <div className="p-4 sm:p-5 md:p-6">
                          {/* Description */}
                          <p className="text-xs sm:text-sm text-slate-400 mb-4 sm:mb-6 leading-relaxed">
                            {panel.description}
                          </p>

                          {/* Items list */}
                          <div className="space-y-2 sm:space-y-3">
                            {panel.items.map((item, idx) => (
                              <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/[0.02] border border-white/5 hover:border-forest-500/30 transition-all cursor-pointer"
                              >
                                <div className="flex items-start gap-3 sm:gap-4">
                                  {/* Severity indicator */}
                                  <div className="flex-shrink-0 mt-1">
                                    <div className={`w-2 h-2 rounded-full ${
                                      item.severity === 'high' ? 'bg-red-500 signal-pulse' :
                                      item.severity === 'medium' ? 'bg-amber-500' :
                                      'bg-emerald-500'
                                    }`} />
                                  </div>

                                  {/* Content */}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 sm:gap-4 mb-2 flex-wrap">
                                      <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-forest-300 transition-colors truncate flex-1 min-w-[200px]">
                                        {item.title}
                                      </h4>
                                      {getSeverityBadge(item.severity)}
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[10px] sm:text-xs text-slate-500">
                                      {item.location && (
                                        <div className="flex items-center gap-1 min-w-0 flex-[1_1_100%] sm:flex-[1_1_auto]">
                                          <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                                          <span className="truncate">{item.location}</span>
                                        </div>
                                      )}
                                      <div className="flex items-center gap-1 flex-shrink-0">
                                        <Calendar className="w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0" />
                                        <span className="whitespace-nowrap">{formatDate(item.timestamp)}</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Action */}
                                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600 group-hover:text-forest-400 transition-colors flex-shrink-0" />
                                </div>
                              </motion.div>
                            ))}
                          </div>

                          {/* View all link */}
                          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <button
                              onClick={() => router.push('/risk-monitoring/live-alerts-advisories')}
                              className="flex items-center gap-2 text-xs sm:text-sm font-medium text-forest-400 hover:text-forest-300 transition-colors group w-full sm:w-auto justify-center sm:justify-start"
                            >
                              View All {panel.title.toLowerCase()}
                              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 -rotate-90 group-hover:translate-x-1 transition-transform" />
                            </button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-white/20 text-white hover:border-forest-400 w-full sm:w-auto text-xs sm:text-sm"
                              icon={<TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                              onClick={() => router.push('/risk-monitoring/dashboards')}
                            >
                              Analytics
                            </Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom action strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-6 sm:mt-8 md:mt-12 glass-light rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10"
        >
          <div className="flex flex-col gap-4 sm:gap-6">
            <div className="flex items-start sm:items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-amber-500 to-red-600 flex items-center justify-center shadow-lg flex-shrink-0">
                <Bell className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1">
                  Configure Alert Preferences
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  Set up custom notifications for critical environmental events and monitoring anomalies
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:border-forest-400 w-full sm:w-auto text-xs sm:text-sm"
                icon={<Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                onClick={() => router.push('/alerts')}
              >
                Settings
              </Button>
              <Button
                className="bg-gradient-to-r from-forest-600 to-forest-500 w-full sm:w-auto text-xs sm:text-sm"
                icon={<Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                onClick={() => router.push('/alerts')}
              >
                Subscribe to Alerts
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
