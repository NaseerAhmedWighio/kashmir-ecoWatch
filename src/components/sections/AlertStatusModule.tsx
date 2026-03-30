'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { alerts } from '@/lib/data';
import { 
  AlertTriangle, 
  Bell, 
  MapPin, 
  Calendar, 
  Clock,
  ChevronRight,
  Filter,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';

export function AlertStatusModule() {
  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-500 animate-pulse';
      case 'medium':
        return 'bg-amber-500';
      case 'low':
        return 'bg-blue-500';
      default:
        return 'bg-slate-500';
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
    <section className="py-16 md:py-24 bg-white dark:bg-slate-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Alert header - spans all columns on desktop */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Live Monitoring
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
                  Active Alerts & Advisories
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-2xl">
                  Real-time environmental alerts, hazard warnings, and monitoring 
                  anomalies requiring attention.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" icon={<Filter className="w-4 h-4" />}>
                  Filter
                </Button>
                <Button size="sm" icon={<Bell className="w-4 h-4" />}>
                  Subscribe to Alerts
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Alert list - 2 columns */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              {alerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <Card 
                    className={`group cursor-pointer transition-all hover:shadow-lg ${
                      alert.severity === 'high' 
                        ? 'border-l-4 border-l-red-500' 
                        : alert.severity === 'medium'
                        ? 'border-l-4 border-l-amber-500'
                        : 'border-l-4 border-l-blue-500'
                    }`}
                    padding="md"
                  >
                    <div className="flex items-start gap-4">
                      {/* Status indicator */}
                      <div className={`flex-shrink-0 w-3 h-3 rounded-full ${getSeverityStyles(alert.severity)}`} />
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <div>
                            <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-forest-600 dark:group-hover:text-forest-400 transition-colors">
                              {alert.title}
                            </h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                              {alert.description}
                            </p>
                          </div>
                          <Badge 
                            variant={alert.severity === 'high' ? 'danger' : alert.severity === 'medium' ? 'warning' : 'info'}
                            size="sm"
                          >
                            {alert.severity}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          {alert.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              <span>{alert.location}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{getTimeAgo(alert.timestamp)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Arrow */}
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {/* View all */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="mt-6"
            >
              <Button variant="outline" className="w-full" icon={<Bell className="w-4 h-4" />}>
                View All Alerts
              </Button>
            </motion.div>
          </div>

          {/* Status summary - right sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {/* Summary card */}
              <Card padding="lg">
                <CardHeader className="mb-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Alert Summary
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { label: 'High Severity', count: 3, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950/20' },
                      { label: 'Medium Severity', count: 8, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/20' },
                      { label: 'Low Severity', count: 6, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/20' },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className={`flex items-center justify-between p-3 rounded-lg ${item.bg}`}
                      >
                        <span className={`text-sm font-medium ${item.color}`}>
                          {item.label}
                        </span>
                        <span className={`text-lg font-bold ${item.color}`}>
                          {item.count}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Resolved (24h)
                      </span>
                      <span className="text-lg font-bold text-emerald-500">
                        12
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Avg Response Time
                      </span>
                      <span className="text-lg font-bold text-slate-900 dark:text-white">
                        2.4h
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick actions */}
              <Card padding="lg">
                <CardHeader className="mb-4">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Report an Issue
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Submit field observations or environmental concerns
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[
                      'Pollution Complaint',
                      'Illegal Dumping',
                      'Wildlife Sighting',
                      'Habitat Damage',
                      'Water Quality Issue',
                    ].map((category) => (
                      <button
                        key={category}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-between group"
                      >
                        <span className="text-slate-700 dark:text-slate-300">
                          {category}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </button>
                    ))}
                  </div>
                  <Button className="w-full mt-4" icon={<AlertTriangle className="w-4 h-4" />}>
                    Submit Report
                  </Button>
                </CardContent>
              </Card>

              {/* Verification status */}
              <Card padding="lg">
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      Data Verification
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    All alerts are verified through multiple sources including 
                    monitoring stations, field reports, and satellite data.
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full bg-gradient-to-br from-forest-400 to-forest-600 border-2 border-white dark:border-slate-800"
                        />
                      ))}
                    </div>
                    <span>+23 verifiers active</span>
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
