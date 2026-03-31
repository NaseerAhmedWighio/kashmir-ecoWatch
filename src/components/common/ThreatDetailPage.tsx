'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  AlertTriangle, ArrowRight, ChevronRight, TrendingUp,
  Shield, FileText, MapPin, Activity, Bell, CheckCircle,
  Target, Eye, Book, Layers, BarChart3
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Threat } from '@/data/protected-network';

interface ThreatDetailPageProps {
  threat: Threat;
  relatedThreats?: Threat[];
}

export function ThreatDetailPage({ threat, relatedThreats = [] }: ThreatDetailPageProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<'overview' | 'indicators' | 'affected' | 'mitigation' | 'dashboard'>('overview');

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'from-red-600 to-red-700';
      case 'high': return 'from-orange-500 to-red-600';
      case 'medium': return 'from-amber-500 to-orange-600';
      default: return 'from-blue-500 to-cyan-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Fragmentation': return Layers;
      case 'Wetland Stress': return MapPin;
      case 'Visitor Pressure': return Users;
      case 'Habitat Degradation': return AlertTriangle;
      case 'Fire': return AlertTriangle;
      default: return AlertTriangle;
    }
  };

  const TypeIcon = getTypeIcon(threat.type);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Book },
    { id: 'indicators', label: 'Signals & Indicators', icon: BarChart3 },
    { id: 'affected', label: 'Affected Areas', icon: MapPin },
    { id: 'mitigation', label: 'Mitigation', icon: CheckCircle },
    { id: 'dashboard', label: 'Dashboard Preview', icon: Target },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero */}
      <div className="relative pt-48 pb-12 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${getSeverityColor(threat.severity)} opacity-15`} />
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <button onClick={() => router.push('/protected-network')} className="hover:text-white transition-colors">
                Protected Network
              </button>
              <ChevronRight className="w-4 h-4" />
              <button onClick={() => router.push('/protected-network/monitoring-and-threats')} className="hover:text-white transition-colors">
                Monitoring & Threats
              </button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">{threat.name}</span>
            </nav>

            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getSeverityColor(threat.severity)} text-white flex items-center justify-center shadow-lg`}>
                    <TypeIcon className="w-6 h-6" />
                  </div>
                  <Badge variant={threat.severity === 'critical' ? 'danger' : threat.severity === 'high' ? 'warning' : 'info'} size="lg">
                    {threat.severity.toUpperCase()} SEVERITY
                  </Badge>
                  <Badge variant="default" size="lg">
                    {threat.type}
                  </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                  {threat.name}
                </h1>
                <p className="text-xl text-slate-400 max-w-3xl mb-6">
                  {threat.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    className={`bg-gradient-to-r ${getSeverityColor(threat.severity)}`}
                    icon={<Bell className="w-5 h-5" />}
                  >
                    Subscribe to Alerts
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white"
                    icon={<FileText className="w-5 h-5" />}
                  >
                    View Assessment
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <Card className="glass-intense border-white/10 p-6 hidden lg:block">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Affected PAs</div>
                      <div className="text-lg font-bold text-white">{threat.affectedAreas.length}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Activity className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Impacted Species</div>
                      <div className="text-lg font-bold text-white">{threat.impactedSpecies.length}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Indicators</div>
                      <div className="text-lg font-bold text-white">{threat.indicators.length}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="container mx-auto px-6 -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-intense border-white/10 p-6" padding="none">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { label: 'Severity', value: threat.severity, icon: AlertTriangle },
                { label: 'Affected PAs', value: threat.affectedAreas.length, icon: MapPin },
                { label: 'Impacted Species', value: threat.impactedSpecies.length, icon: Activity },
                { label: 'Indicators', value: threat.indicators.length, icon: BarChart3 },
                { label: 'Mitigation Strategies', value: threat.mitigationStrategies.length, icon: CheckCircle },
                { label: 'Type', value: threat.type.split(' ')[0], icon: Target },
              ].map((metric, idx) => (
                <div key={idx} className="text-center p-4 border-r border-white/5 last:border-r-0">
                  <metric.icon className="w-5 h-5 text-slate-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white tabular-nums">
                    {metric.value}
                  </div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${getSeverityColor(threat.severity)} text-white`
                    : 'glass-light border border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
                  <h2 className="text-2xl font-bold text-white mb-4">Threat Overview</h2>
                  <p className="text-slate-400 leading-relaxed mb-6">{threat.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Threat Type</div>
                      <div className="text-white font-medium">{threat.type}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Severity Level</div>
                      <div className="text-white font-medium capitalize">{threat.severity}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Affected Areas</div>
                      <div className="text-white font-medium">{threat.affectedAreas.length} protected areas</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Impacted Species</div>
                      <div className="text-white font-medium">{threat.impactedSpecies.length} species</div>
                    </div>
                  </div>
                </Card>

                <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
                  <h2 className="text-2xl font-bold text-white mb-4">Threat Classification</h2>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${getSeverityColor(threat.severity)} text-white mb-4`}>
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-bold">{threat.severity.toUpperCase()} PRIORITY THREAT</span>
                  </div>
                  <p className="text-slate-400">
                    This threat has been classified as {threat.severity} priority based on its spatial extent, 
                    intensity, and potential impact on biodiversity and ecosystem services.
                  </p>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
                  <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full border-white/20 text-white justify-start" icon={<Bell className="w-4 h-4" />}>
                      Subscribe to Alerts
                    </Button>
                    <Button variant="outline" size="sm" className="w-full border-white/20 text-white justify-start" icon={<FileText className="w-4 h-4" />}>
                      View Assessment
                    </Button>
                    <Button variant="outline" size="sm" className="w-full border-white/20 text-white justify-start" icon={<BarChart3 className="w-4 h-4" />}>
                      View Trends
                    </Button>
                  </div>
                </Card>

                <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
                  <h3 className="text-lg font-bold text-white mb-4">Monitoring Status</h3>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <div>
                      <div className="text-white font-medium">Active Monitoring</div>
                      <div className="text-xs text-slate-400">Real-time tracking enabled</div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'indicators' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-6">Signals & Indicators</h2>
              <div className="space-y-4">
                {threat.indicators.map((indicator, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                    <div className="flex items-start gap-3">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        threat.severity === 'critical' ? 'bg-red-500 signal-pulse' :
                        threat.severity === 'high' ? 'bg-orange-500 signal-pulse' :
                        'bg-amber-500 signal-pulse'
                      }`} />
                      <div>
                        <h3 className="font-semibold text-white mb-1">{indicator}</h3>
                        <p className="text-sm text-slate-400">Key indicator for {threat.type.toLowerCase()} monitoring</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-4">Indicator Trends</h2>
              <div className="h-48 rounded-xl bg-slate-800/50 border border-white/5 flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                  <p className="text-slate-400 text-sm">Indicator trend visualization</p>
                  <p className="text-slate-500 text-xs mt-1">Real-time monitoring data</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'affected' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-6">Affected Protected Areas</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {threat.affectedAreas.map((area, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-800/50 border border-white/5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">{area.replace(/-/g, ' ')}</div>
                      <div className="text-xs text-slate-500 uppercase">Protected Area</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-6">Impacted Species</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {threat.impactedSpecies.map((species, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <Activity className="w-5 h-5 text-purple-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white capitalize">{species.replace(/-/g, ' ')}</h3>
                    </div>
                    <Badge variant="warning" size="sm">At Risk</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'mitigation' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-6">Mitigation Strategies</h2>
              <div className="space-y-4">
                {threat.mitigationStrategies.map((strategy, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-white mb-1">{strategy}</h3>
                        <p className="text-sm text-slate-400">Active conservation intervention</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-4">Conservation Response</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                Multiple mitigation strategies are being implemented to address this threat, 
                involving protected area management, community engagement, and policy interventions.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                  <div className="text-xs text-slate-500 uppercase mb-1">Response Status</div>
                  <div className="text-emerald-400 font-medium">Active</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                  <div className="text-xs text-slate-500 uppercase mb-1">Strategies</div>
                  <div className="text-white font-medium">{threat.mitigationStrategies.length} interventions</div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'dashboard' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-6">Monitoring Dashboard Preview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="p-6 rounded-xl bg-gradient-to-br from-red-500/10 to-slate-800/50 border border-red-500/30">
                  <AlertTriangle className="w-8 h-8 text-red-400 mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">HIGH</div>
                  <div className="text-sm text-slate-400">Current Threat Level</div>
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-amber-500/10 to-slate-800/50 border border-amber-500/30">
                  <TrendingUp className="w-8 h-8 text-amber-400 mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">+12%</div>
                  <div className="text-sm text-slate-400">30-Day Trend</div>
                </div>
                <div className="p-6 rounded-xl bg-gradient-to-br from-emerald-500/10 to-slate-800/50 border border-emerald-500/30">
                  <CheckCircle className="w-8 h-8 text-emerald-400 mb-3" />
                  <div className="text-3xl font-bold text-white mb-1">{threat.mitigationStrategies.length}</div>
                  <div className="text-sm text-slate-400">Active Interventions</div>
                </div>
              </div>
              <div className="h-64 rounded-xl bg-slate-800/50 border border-white/5 flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                  <p className="text-slate-400 text-sm">Full dashboard with charts and analytics</p>
                  <p className="text-slate-500 text-xs mt-1">Real-time threat monitoring</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* CTA Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card className={`bg-gradient-to-r ${getSeverityColor(threat.severity)} border-0 p-8`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Access Full Monitoring Dashboard</h3>
                <p className="text-white/80">View real-time data, trends, and conservation responses</p>
              </div>
              <Button size="lg" className="bg-white/20 text-white border-0" icon={<BarChart3 className="w-5 h-5" />}>
                Open Dashboard
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      <AdvancedFooter />
    </main>
  );
}

// Import Users icon that was missing
import { Users } from 'lucide-react';
