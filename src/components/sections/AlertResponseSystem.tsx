'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { alerts } from '@/lib/data';
import {
  AlertTriangle, Bell, MapPin, Calendar, Clock, ChevronRight,
  Filter, CheckCircle2, Shield, Zap, Radio, Activity, ExternalLink,
  TrendingUp, AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';

export function AlertResponseSystem() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  const filteredAlerts = alerts.filter(alert => {
    if (activeFilter === 'all') return true;
    return alert.severity === activeFilter;
  });

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'high':
        return { 
          bg: 'alert-critical', 
          badge: 'danger' as const, 
          pulse: 'bg-red-500',
          icon: <AlertTriangle className="w-5 h-5" />
        };
      case 'medium':
        return { 
          bg: 'alert-warning', 
          badge: 'warning' as const, 
          pulse: 'bg-amber-500',
          icon: <AlertCircle className="w-5 h-5" />
        };
      case 'low':
        return { 
          bg: 'alert-info', 
          badge: 'info' as const, 
          pulse: 'bg-blue-500',
          icon: <Activity className="w-5 h-5" />
        };
      default:
        return { 
          bg: 'alert-info', 
          badge: 'info' as const, 
          pulse: 'bg-slate-500',
          icon: <Activity className="w-5 h-5" />
        };
    }
  };

  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <section className="pt-16 md:pt-20 pb-16 md:pb-20 bg-slate-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 sm:mb-10 md:mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="relative">
              <Bell className="w-5 h-5 text-red-400" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full signal-pulse" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Live Monitoring
            </span>
          </div>
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3 sm:mb-4 tracking-tight">
                Alert & Response System
              </h2>
              <p className="text-slate-400 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed">
                Real-time environmental alerts, hazard warnings, and monitoring
                anomalies with severity classification and response tracking.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" size="sm" className="border-white/20 text-white hover:border-forest-400 w-full sm:w-auto text-xs sm:text-sm" icon={<Filter className="w-4 h-4" />} onClick={() => router.push('/alerts')}>
                Filter
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-red-600 to-red-500 w-full sm:w-auto text-xs sm:text-sm" icon={<Bell className="w-4 h-4" />} onClick={() => router.push('/alerts')}>
                Subscribe to Alerts
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Alert feed - 2 columns */}
          <div className="lg:col-span-2">
              {/* Filter tabs - scrollable on mobile */}
          <div className="flex gap-2 sm:gap-3 mb-6 p-2 sm:p-3 glass-light rounded-xl border border-white/10 overflow-x-auto">
            {[
              { id: 'all', label: 'All Alerts', count: alerts.length },
              { id: 'high', label: 'Critical', count: alerts.filter(a => a.severity === 'high').length },
              { id: 'medium', label: 'Warning', count: alerts.filter(a => a.severity === 'medium').length },
              { id: 'low', label: 'Info', count: alerts.filter(a => a.severity === 'low').length },
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as typeof activeFilter)}
                className={`px-3 py-2 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap flex-shrink-0 ${
                  activeFilter === filter.id
                    ? 'bg-forest-500/20 text-forest-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {filter.label}
                <Badge variant={activeFilter === filter.id ? 'default' : 'default'} size="sm" className="bg-white/10 text-orange-500 flex-shrink-0">
                  {filter.count}
                </Badge>
              </button>
            ))}
          </div>

            {/* Alert list */}
            <motion.div className="space-y-4 sm:space-y-6">
              {filteredAlerts.map((alert, index) => {
                const styles = getSeverityStyles(alert.severity);

                return (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                  >
                    <Card
                      className={`group cursor-pointer transition-all duration-300 ${styles.bg} hover:shadow-lg hover:shadow-red-500/10 card-intelligence`}
                      padding="sm"
                    >

                      {/* Status indicator */}
                      <div className={`flex-shrink-0 w-2.5 h-2.5 sm:w-3 sm:h-3 mb-2 rounded-full ${styles.pulse} signal-pulse mt-1`} />

                      <div className="flex items-start gap-3 sm:gap-4">
                       
                        {/* Icon */}
                        <div className={`flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-white/10 flex items-center justify-center ${styles.pulse.replace('bg-', 'text-')}`}>
                          {styles.icon}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 sm:gap-4 mb-2 flex-wrap">
                            <div className="flex-1 min-w-[200px]">
                              <h4 className="text-sm sm:text-base md:text-lg font-semibold text-white group-hover:text-forest-300 transition-colors break-words">
                                {alert.title}
                              </h4>
                              <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                                {alert.description}
                              </p>
                            </div>
                            <Badge variant={styles.badge} size="sm" className="text-xs px-2 py-1 sm:px-3 inline-flex items-center flex-shrink-0">
                              {alert.severity.toUpperCase()}
                            </Badge>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-slate-400">
                            {alert.location && (
                              <div className="flex items-center gap-1 min-w-0 flex-[1_1_100%] sm:flex-[1_1_auto]">
                                <MapPin className="w-3 h-3 flex-shrink-0" />
                                <span className="truncate">{alert.location}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-1 flex-shrink-0">
                              <Clock className="w-3 h-3 flex-shrink-0" />
                              <span className="whitespace-nowrap">{getTimeAgo(alert.timestamp)}</span>
                            </div>
                          </div>
                        </div>

                        {/* Arrow */}
                        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>

              {/* View all */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-6 sm:mt-8"
            >
              <Button variant="outline" className="w-full border-white/20 text-white hover:border-forest-400" icon={<Bell className="w-4 h-4" />} onClick={() => router.push('/alerts')}>
                View All Alerts
              </Button>
            </motion.div>
          </div>

          {/* Right sidebar - Summary and actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Summary card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="glass-light border-white/5" padding="md">
                <CardHeader className="mb-4 sm:mb-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-bold text-white">Alert Summary</h3>
                    <Radio className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 signal-pulse" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 sm:space-y-3">
                    {[
                      { label: 'Critical', count: 3, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' },
                      { label: 'Warning', count: 8, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
                      { label: 'Informational', count: 6, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className={`flex items-center justify-between p-3 sm:p-4 rounded-xl ${item.bg} border ${item.border}`}
                      >
                        <span className={`text-xs sm:text-sm font-medium ${item.color}`}>
                          {item.label}
                        </span>
                        <span className={`text-lg sm:text-xl font-bold ${item.color}`}>
                          {item.count}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-white/5">
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <span className="text-xs sm:text-sm text-slate-400">Resolved (24h)</span>
                      <span className="flex items-center gap-2 text-base sm:text-lg font-bold text-emerald-400">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        12
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-slate-400">Avg Response Time</span>
                      <span className="text-base sm:text-lg font-bold text-white">2.4h</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Card className="glass-light border-white/5" padding="md">
                <CardHeader className="mb-3 sm:mb-4">
                  <h3 className="text-base sm:text-lg font-bold text-white">Report an Issue</h3>
                  <p className="text-xs sm:text-sm text-slate-400">Submit field observations or environmental concerns</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      { label: 'Pollution Complaint', icon: AlertTriangle },
                      { label: 'Illegal Dumping', icon: AlertCircle },
                      { label: 'Wildlife Sighting', icon: Activity },
                      { label: 'Habitat Damage', icon: Zap },
                      { label: 'Water Quality Issue', icon: Shield },
                    ].map((category) => (
                      <button
                        key={category.label}
                        className="w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-2 sm:gap-3">
                          <category.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-500 group-hover:text-forest-400 transition-colors" />
                          <span className="text-xs sm:text-sm text-slate-300 group-hover:text-white transition-colors">
                            {category.label}
                          </span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-600 group-hover:text-forest-400 transition-colors" />
                      </button>
                    ))}
                  </div>
                  <Button className="w-full mt-3 sm:mt-4 bg-gradient-to-r from-forest-600 to-forest-500 text-xs sm:text-sm" icon={<AlertTriangle className="w-4 h-4" />} onClick={() => router.push('/report-issue')}>
                    Submit Report
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Verification status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Card className="glass-light border-white/5" padding="md">
                <CardContent>
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
                    <h3 className="text-base sm:text-lg font-bold text-white">Data Verification</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 mb-3 sm:mb-4 leading-relaxed">
                    All alerts are verified through multiple sources including
                    monitoring stations, field reports, and satellite data.
                  </p>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-forest-400 to-forest-600 border-2 border-slate-900"
                        />
                      ))}
                    </div>
                    <span className="text-[10px] sm:text-xs text-slate-500">+23 verifiers active</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}

function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}
