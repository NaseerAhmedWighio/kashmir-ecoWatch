'use client';

import React, { useState } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Bell, ArrowRight, AlertTriangle, Clock, MapPin, Filter,
  Search, ChevronDown, Eye, Shield, AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { liveAlerts } from '@/data/risk-monitoring';
import { AlertSeverity, AlertConfidenceState } from '@/types/alerts';

const hazardTypes = [
  'All Hazards',
  'Flood & Flash Flood',
  'Landslide & Slope',
  'Avalanche & Winter',
  'Earthquake',
  'Forest Fire',
  'Glacier & Cryosphere',
  'Hydrological Risk',
  'Environmental Incident',
];

const districts = ['All Districts', 'Srinagar', 'Anantnag', 'Baramulla', 'Gulmarg', 'Kupwara', 'Pulwama', 'Shopian', 'Budgam', 'Ganderbal', 'Bandipora'];

const getSeverityConfig = (severity: AlertSeverity) => {
  switch (severity) {
    case AlertSeverity.CRITICAL:
      return { bg: 'bg-red-500/10', border: 'border-l-red-500', badge: 'danger' as const, text: 'text-red-400', label: 'CRITICAL' };
    case AlertSeverity.SERIOUS:
      return { bg: 'bg-orange-500/10', border: 'border-l-orange-500', badge: 'warning' as const, text: 'text-orange-400', label: 'SERIOUS' };
    case AlertSeverity.MODERATE:
      return { bg: 'bg-amber-500/10', border: 'border-l-amber-500', badge: 'info' as const, text: 'text-amber-400', label: 'MODERATE' };
    case AlertSeverity.LOW:
      return { bg: 'bg-blue-500/10', border: 'border-l-blue-500', badge: 'secondary' as const, text: 'text-blue-400', label: 'LOW' };
  }
};

const getConfidenceBadge = (state: AlertConfidenceState) => {
  const config = {
    [AlertConfidenceState.INSTITUTIONALLY_REVIEWED]: { label: '✓ Verified', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
    [AlertConfidenceState.STRONGLY_CONFIRMED]: { label: '✓✓ Strong', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    [AlertConfidenceState.COMMUNITY_CONFIRMED]: { label: '✓ Confirmed', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    [AlertConfidenceState.EARLY_COMMUNITY_SIGNAL]: { label: '~ Under Review', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    [AlertConfidenceState.UNVERIFIED]: { label: '? Unverified', color: 'bg-slate-500/20 text-slate-400 border-slate-500/30' },
  };
  const cfg = config[state] || config[AlertConfidenceState.UNVERIFIED];
  return (
    <span className={`text-xs px-2 py-1 rounded border ${cfg.color}`}>
      {cfg.label}
    </span>
  );
};

const timeAgo = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor(diff / (1000 * 60));
  
  if (hours > 24) return `${Math.floor(hours / 24)}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return `${minutes}m ago`;
};

export default function LiveAlertsPage() {
  const router = useRouter();
  const [selectedHazard, setSelectedHazard] = useState('All Hazards');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredAlerts = liveAlerts.filter(alert => {
    const matchesHazard = selectedHazard === 'All Hazards' || alert.hazardCategory === selectedHazard;
    const matchesDistrict = selectedDistrict === 'All Districts' || alert.district === selectedDistrict;
    const matchesSearch = searchQuery === '' || 
      alert.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesHazard && matchesDistrict && matchesSearch;
  });

  const alertStats = {
    total: liveAlerts.length,
    critical: liveAlerts.filter(a => a.severity === AlertSeverity.CRITICAL).length,
    serious: liveAlerts.filter(a => a.severity === AlertSeverity.SERIOUS).length,
    verified: liveAlerts.filter(a => a.verified).length,
    unverified: liveAlerts.filter(a => !a.verified).length,
  };

  return (
    <main className="min-h-screen bg-slate-950">{/* Hero Section */}
      <section className="relative pt-20 md:pt-48 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/60 via-rose-950/40 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center shadow-2xl animate-pulse">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <Badge variant="danger" size="lg">Real-Time Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
              Live <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-400">Alerts</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Real-time hazard warnings, emergency notifications, and public advisories. 
              The operational nerve center of Kashmir's environmental intelligence platform.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white shadow-xl"
                onClick={() => router.push('/risk-monitoring')}
              >
                <ArrowRight className="w-5 h-5 mr-2 rotate-180" />
                Back to Overview
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                onClick={() => router.push('/report-issue')}
              >
                <AlertTriangle className="w-5 h-5 mr-2" />
                Report Incident
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Alert Statistics Ribbon */}
      <section className="py-8 border-y border-white/5 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { label: 'Total Active', value: alertStats.total, color: 'text-white' },
              { label: 'Critical', value: alertStats.critical, color: 'text-red-400' },
              { label: 'Serious', value: alertStats.serious, color: 'text-orange-400' },
              { label: 'Verified', value: alertStats.verified, color: 'text-green-400' },
              { label: 'Under Review', value: alertStats.unverified, color: 'text-amber-400' },
            ].map((stat, idx) => (
              <div key={stat.label} className="text-center">
                <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Controls */}
      <section className="py-6 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
              <ChevronDown className={`w-3 h-3 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search alerts by type, location, or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-900 border border-white/10 rounded-lg text-sm text-slate-300 placeholder:text-slate-500 focus:outline-none focus:border-red-500/50"
              />
            </div>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5"
            >
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">Hazard Type</label>
                <select
                  value={selectedHazard}
                  onChange={(e) => setSelectedHazard(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-red-500/50"
                >
                  {hazardTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">District</label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-white/10 rounded-lg text-sm text-slate-300 focus:outline-none focus:border-red-500/50"
                >
                  {districts.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Alert Feed */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white">
              Active Alerts Feed
              <span className="text-slate-500 text-sm ml-2">({filteredAlerts.length} alerts)</span>
            </h2>
          </div>

          <div className="space-y-4">
            {filteredAlerts.map((alert, idx) => {
              const severityConfig = getSeverityConfig(alert.severity);
              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card
                    className={`glass-intense border-l-4 ${severityConfig.border} hover:border-white/20 transition-all cursor-pointer group`}
                    onClick={() => alert.advisoryLink && router.push(alert.advisoryLink)}
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-4 flex-1">
                          <div className={`w-12 h-12 rounded-lg ${severityConfig.bg} flex items-center justify-center flex-shrink-0`}>
                            <AlertTriangle className={`w-6 h-6 ${severityConfig.text}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2 flex-wrap">
                              <Badge variant={severityConfig.badge} size="sm">
                                {severityConfig.label}
                              </Badge>
                              <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors">
                                {alert.type}
                              </h3>
                              {alert.escalationHistory && alert.escalationHistory.length > 0 && (
                                <Badge variant="outline" size="sm" className="border-orange-500/30 text-orange-400">
                                  ↑ Escalated
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm text-slate-400 mb-2 flex-wrap">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {alert.location}, {alert.district}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {timeAgo(new Date(alert.timestamp))}
                              </span>
                            </div>

                            <p className="text-sm text-slate-400 line-clamp-2 mb-3">
                              {alert.description}
                            </p>

                            <div className="flex items-center gap-3 flex-wrap">
                              {getConfidenceBadge(alert.confidenceState)}
                              {alert.verified && (
                                <span className="flex items-center gap-1 text-xs text-green-400">
                                  <Shield className="w-3 h-3" />
                                  Verified
                                </span>
                              )}
                              {alert.advisoryLink && (
                                <span className="text-xs text-blue-400 flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  View Details
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {alert.escalationHistory && alert.escalationHistory.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-white/5">
                          <div className="text-xs text-slate-500 mb-1">Escalation History:</div>
                          <div className="flex items-center gap-2 flex-wrap">
                            {alert.escalationHistory.map((step, stepIdx) => (
                              <span key={stepIdx} className="text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded">
                                {step}
                                {stepIdx < alert.escalationHistory!.length - 1 && ' →'}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {filteredAlerts.length === 0 && (
            <div className="text-center py-20">
              <AlertCircle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-400 mb-2">No Active Alerts</h3>
              <p className="text-sm text-slate-500">No alerts match your current filters</p>
            </div>
          )}
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
