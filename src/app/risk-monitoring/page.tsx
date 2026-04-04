'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  AlertTriangle, Activity, Bell, TrendingUp, ArrowRight,
  Shield, Mountain, Droplets, Waves, Flame, Zap, MapPin, Clock,
  AlertCircle, Eye, FileText, Phone
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  liveAlerts,
  districtRiskProfiles,
  hazardCategorySummaries,
  advisories,
  recentIncidents,
  riskDashboardStats,
  criticalInfrastructure
} from '@/data/risk-monitoring';
import { AlertSeverity } from '@/types/alerts';

const submodules = [
  { id: 'live-alerts', name: 'Live Alerts', icon: Bell, color: 'from-red-500 to-rose-600', route: '/risk-monitoring/live-alerts', desc: 'Critical alerts & warnings' },
  { id: 'hazard-risks', name: 'Hazard Risks', icon: AlertTriangle, color: 'from-orange-500 to-red-600', route: '/risk-monitoring/hazard-risks', desc: 'Umbrella hazard classification' },
  { id: 'flood-flash-flood', name: 'Flood & Flash Flood', icon: Droplets, color: 'from-blue-500 to-cyan-600', route: '/risk-monitoring/flood-flash-flood', desc: 'River overflow & inundation watch' },
  { id: 'landslide-slope', name: 'Landslide & Slope', icon: Mountain, color: 'from-amber-500 to-orange-600', route: '/risk-monitoring/landslide-slope', desc: 'Slope instability & road risk' },
  { id: 'avalanche-winter', name: 'Avalanche & Winter', icon: Eye, color: 'from-slate-400 to-blue-600', route: '/risk-monitoring/avalanche-winter', desc: 'Avalanche exposure & winter access' },
  { id: 'earthquake', name: 'Earthquake', icon: Zap, color: 'from-purple-500 to-indigo-600', route: '/risk-monitoring/earthquake', desc: 'Seismic exposure & readiness' },
  { id: 'forest-fire', name: 'Forest Fire', icon: Flame, color: 'from-orange-500 to-red-600', route: '/risk-monitoring/forest-fire', desc: 'Active fires & fire-prone zones' },
  { id: 'glacier-cryosphere', name: 'Glacier & Cryosphere', icon: Mountain, color: 'from-cyan-500 to-blue-600', route: '/risk-monitoring/glacier-cryosphere', desc: 'Glacier-linked environmental risk' },
  { id: 'hydrological-risk', name: 'Hydrological Risk', icon: Waves, color: 'from-teal-500 to-cyan-600', route: '/risk-monitoring/hydrological-risk', desc: 'Water system instability & overflow' },
  { id: 'environmental-incident-risk', name: 'Environmental Incident Risk', icon: AlertCircle, color: 'from-red-600 to-rose-700', route: '/risk-monitoring/environmental-incident-risk', desc: 'Pollution emergencies & escalation' },
  { id: 'district-risk-profiles', name: 'District Risk Profiles', icon: MapPin, color: 'from-emerald-500 to-green-600', route: '/risk-monitoring/district-risk-profiles', desc: 'District-wise operational risk' },
  { id: 'critical-infrastructure-response', name: 'Critical Infrastructure & Response', icon: Shield, color: 'from-violet-500 to-purple-600', route: '/risk-monitoring/critical-infrastructure-response', desc: 'Emergency facilities & response nodes' },
  { id: 'shelters-closures-emergency-routes', name: 'Shelters, Closures & Routes', icon: FileText, color: 'from-indigo-500 to-blue-600', route: '/risk-monitoring/shelters-closures-emergency-routes', desc: 'Safe routes & operational mobility' },
  { id: 'dashboards', name: 'Dashboards', icon: TrendingUp, color: 'from-pink-500 to-rose-600', route: '/risk-monitoring/dashboards', desc: 'Live risk & incident dashboards' },
];

const getSeverityColor = (severity: AlertSeverity) => {
  switch (severity) {
    case AlertSeverity.CRITICAL: return { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/50' };
    case AlertSeverity.SERIOUS: return { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/50' };
    case AlertSeverity.MODERATE: return { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/50' };
    case AlertSeverity.LOW: return { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/50' };
  }
};

const getRiskLevelBadge = (level: string) => {
  switch (level) {
    case 'critical': return <Badge variant="danger" size="sm">Critical</Badge>;
    case 'high': return <Badge variant="warning" size="sm">High</Badge>;
    case 'moderate': return <Badge variant="info" size="sm">Moderate</Badge>;
    case 'low': return <Badge variant="success" size="sm">Low</Badge>;
    default: return null;
  }
};

export default function RiskMonitoringOverviewPage() {
  const router = useRouter();

  const criticalAlerts = liveAlerts.filter(a => a.severity === AlertSeverity.CRITICAL).slice(0, 4);
  const topDistricts = districtRiskProfiles.sort((a, b) => {
    const order = { critical: 0, high: 1, moderate: 2, low: 3 };
    return order[a.riskLevel] - order[b.riskLevel];
  }).slice(0, 8);

  return (
    <main className="min-h-screen bg-slate-950">{/* Hero Section */}
      <section className="relative pt-20 md:pt-48 pb-12 md:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/50 via-orange-950/30 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-2xl">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <Badge variant="danger" size="lg">Command Center</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Risk & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Monitoring</span> Intelligence
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Monitoring hazards, advisories, environmental emergencies, district risk, response signals, 
              and operational alerts across Kashmir
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white shadow-xl"
                onClick={() => router.push('/risk-monitoring/live-alerts')}
              >
                <Bell className="w-5 h-5 mr-2" />
                View Live Alerts
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                onClick={() => router.push('/risk-monitoring/district-risk-profiles')}
              >
                <MapPin className="w-5 h-5 mr-2" />
                District Risk
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                onClick={() => router.push('/report-issue')}
              >
                <AlertTriangle className="w-5 h-5 mr-2" />
                Report Hazard
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Critical Alerts Ribbon */}
      {criticalAlerts.length > 0 && (
        <section className="py-8 border-y border-red-500/20 bg-red-950/20">
          <div className="container mx-auto px-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <h2 className="text-sm font-bold text-red-400 uppercase tracking-wider">Critical Active Alerts</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {criticalAlerts.map((alert, idx) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card
                    className="glass-intense border-red-500/30 p-4 cursor-pointer hover:border-red-500/50 transition-all"
                    onClick={() => alert.advisoryLink && router.push(alert.advisoryLink)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <Badge variant="danger" size="sm">{alert.type}</Badge>
                      <span className="text-xs text-slate-500">{alert.district}</span>
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-2">{alert.description}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(alert.timestamp).toLocaleString()}</span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Status Board - Key Metrics */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { label: 'Active Alerts', value: riskDashboardStats.totalActiveAlerts, icon: Bell, color: 'text-red-400' },
              { label: 'Critical', value: riskDashboardStats.criticalAlerts, icon: AlertTriangle, color: 'text-red-500' },
              { label: 'Districts Monitored', value: riskDashboardStats.districtsMonitored, icon: MapPin, color: 'text-blue-400' },
              { label: 'Active Advisories', value: riskDashboardStats.advisoriesIssued, icon: FileText, color: 'text-amber-400' },
              { label: 'Infrastructure Stressed', value: riskDashboardStats.infrastructureStressed, icon: Shield, color: 'text-orange-400' },
            ].map((metric, idx) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="text-center"
              >
                <metric.icon className={`w-6 h-6 ${metric.color} mx-auto mb-2`} />
                <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
                <div className="text-xs text-slate-400">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hazard Category Summary */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <AlertTriangle className="w-6 h-6 text-red-400" />
            <h2 className="text-2xl font-bold text-white">Hazard Category Status</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {hazardCategorySummaries.map((hazard, idx) => (
              <motion.div
                key={hazard.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card
                  className="glass-intense border-white/10 hover:border-white/20 p-5 cursor-pointer transition-all"
                  onClick={() => router.push(hazard.route)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
                        <AlertTriangle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">{hazard.name}</h3>
                        <span className="text-xs text-slate-500">{hazard.activeAlerts} active alerts</span>
                      </div>
                    </div>
                    {getRiskLevelBadge(hazard.riskLevel)}
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{hazard.districts.length} districts</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className={`w-3 h-3 ${hazard.trend === 'increasing' ? 'text-red-400' : hazard.trend === 'decreasing' ? 'text-green-400' : 'text-slate-400'}`} />
                      <span>{hazard.trend}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* District Risk Status Board */}
      <section className="py-16 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <MapPin className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">District Risk Status</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">District</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Risk Level</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Alerts</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Dominant Hazards</th>
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Trend</th>
                </tr>
              </thead>
              <tbody>
                {topDistricts.map((district, idx) => (
                  <tr
                    key={district.district}
                    className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition-colors"
                    onClick={() => router.push('/risk-monitoring/district-risk-profiles')}
                  >
                    <td className="py-3 px-4 text-sm font-medium text-white">{district.district}</td>
                    <td className="py-3 px-4">{getRiskLevelBadge(district.riskLevel)}</td>
                    <td className="py-3 px-4 text-sm text-slate-300">{district.activeAlerts}</td>
                    <td className="py-3 px-4 text-xs text-slate-400">{district.dominantHazards.slice(0, 2).join(', ')}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <TrendingUp className={`w-3 h-3 ${district.riskTrend === 'increasing' ? 'text-red-400' : district.riskTrend === 'decreasing' ? 'text-green-400' : 'text-slate-400'}`} />
                        <span className={`text-xs ${district.riskTrend === 'increasing' ? 'text-red-400' : district.riskTrend === 'decreasing' ? 'text-green-400' : 'text-slate-400'}`}>
                          {district.riskTrend}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Active Advisories */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <FileText className="w-6 h-6 text-amber-400" />
            <h2 className="text-2xl font-bold text-white">Active Advisories</h2>
          </div>
          <div className="space-y-4">
            {advisories.slice(0, 4).map((advisory, idx) => (
              <motion.div
                key={advisory.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge
                          variant={advisory.type === 'warning' ? 'danger' : advisory.type === 'watch' ? 'warning' : 'info'}
                          size="sm"
                        >
                          {advisory.type.toUpperCase()}
                        </Badge>
                        <h3 className="text-sm font-bold text-white">{advisory.title}</h3>
                      </div>
                      <p className="text-xs text-slate-400 mb-2">{advisory.description}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{advisory.district}</span>
                        <span>Valid until: {new Date(advisory.validUntil).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Incidents */}
      <section className="py-16 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <Activity className="w-6 h-6 text-red-400" />
            <h2 className="text-2xl font-bold text-white">Recent Incidents</h2>
          </div>
          <div className="space-y-3">
            {recentIncidents.slice(0, 5).map((incident, idx) => {
              const severityColors = getSeverityColor(incident.severity);
              return (
                <motion.div
                  key={incident.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className={`glass-intense border-l-4 ${severityColors.border} p-4`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="text-sm font-bold text-white">{incident.title}</h3>
                          <Badge variant={incident.status === 'active' ? 'danger' : incident.status === 'monitoring' ? 'warning' : 'success'} size="sm">
                            {incident.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-400 mb-2">{incident.description}</p>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{incident.district}</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(incident.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Links to All Submodules */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-6 h-6 text-violet-400" />
            <h2 className="text-2xl font-bold text-white">Risk Intelligence Submodules</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {submodules.map((mod, idx) => (
              <motion.div
                key={mod.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card
                  className="glass-intense border-white/10 hover:border-white/20 p-5 cursor-pointer transition-all group"
                  onClick={() => router.push(mod.route)}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${mod.color} flex items-center justify-center flex-shrink-0`}>
                      <mod.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">{mod.name}</h3>
                      <p className="text-xs text-slate-400">{mod.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-xs font-medium text-red-400 group-hover:text-red-300 transition-colors">
                    <span>Access Module</span>
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 relative overflow-hidden">
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-950/40 via-orange-950/20 to-slate-950/50" />
            <div className="absolute inset-0 bg-grid opacity-10" />
            
            <div className="relative z-10 p-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl mx-auto"
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-2xl">
                    <Phone className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Report a Hazard or Emergency</h2>
                <p className="text-slate-400 mb-8 max-w-2xl mx-auto text-lg">
                  Help improve risk monitoring by reporting hazards, incidents, and emergency situations in your area
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white shadow-xl"
                    onClick={() => router.push('/report-issue')}
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Report Emergency
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/5"
                    onClick={() => router.push('/risk-monitoring/live-alerts')}
                  >
                    <Bell className="w-5 h-5 mr-2" />
                    View All Alerts
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/5"
                    onClick={() => router.push('/submit-sighting')}
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    Submit a Sighting
                  </Button>
                </div>
              </motion.div>
            </div>
          </Card>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
