'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  MapPin, Activity, ArrowRight, ChevronRight, TrendingUp,
  AlertTriangle, Book, FileText, Eye, Calendar, Mountain,
  Droplet, Leaf, Shield, Navigation as NavIcon, Clock,
  Thermometer, Ruler, Users, Target, CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Corridor } from '@/data/protected-network';

interface CorridorDetailPageProps {
  corridor: Corridor;
  relatedCorridors?: Corridor[];
}

export function CorridorDetailPage({ corridor, relatedCorridors = [] }: CorridorDetailPageProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<'overview' | 'ecology' | 'threats' | 'conservation' | 'related'>('overview');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'from-red-500 to-red-600';
      case 'High': return 'from-amber-500 to-orange-600';
      case 'Medium': return 'from-blue-500 to-cyan-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Degraded': return 'warning';
      case 'Threatened': return 'danger';
      default: return 'default';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Book },
    { id: 'ecology', label: 'Ecology & Species', icon: Activity },
    { id: 'threats', label: 'Threats', icon: AlertTriangle },
    { id: 'conservation', label: 'Conservation', icon: Shield },
    { id: 'related', label: 'Related Corridors', icon: MapPin },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero */}
      <div className="relative pt-48 pb-12 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br from-pink-600/15 to-slate-900`} />
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
              <button onClick={() => router.push('/protected-network/corridors-and-connectivity')} className="hover:text-white transition-colors">
                Corridors & Connectivity
              </button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">{corridor.name}</span>
            </nav>

            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getPriorityColor(corridor.priority)} text-white flex items-center justify-center shadow-lg`}>
                    <MapPin className="w-6 h-6" />
                  </div>
                  <Badge variant={getStatusColor(corridor.status)} size="lg">
                    {corridor.status}
                  </Badge>
                  <Badge variant={corridor.priority === 'Critical' ? 'danger' : corridor.priority === 'High' ? 'warning' : 'info'} size="lg">
                    {corridor.priority} Priority
                  </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                  {corridor.name}
                </h1>
                <p className="text-xl text-slate-400 max-w-3xl mb-6">
                  {corridor.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    className="bg-gradient-to-r from-pink-600 to-pink-500"
                    icon={<MapPin className="w-5 h-5" />}
                  >
                    View on Map
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white"
                    icon={<FileText className="w-5 h-5" />}
                  >
                    Corridor Assessment
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <Card className="glass-intense border-white/10 p-6 hidden lg:block">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Ruler className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Length</div>
                      <div className="text-lg font-bold text-white">{corridor.length}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Type</div>
                      <div className="text-lg font-bold text-white">{corridor.type}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Districts</div>
                      <div className="text-lg font-bold text-white">{corridor.districts.length}</div>
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
                { label: 'Length', value: corridor.length, icon: Ruler },
                { label: 'Connected PAs', value: corridor.connectedAreas.length, icon: MapPin },
                { label: 'Districts', value: corridor.districts.length, icon: Shield },
                { label: 'Key Species', value: corridor.keySpecies.length, icon: Activity },
                { label: 'Threats', value: corridor.threats.length, icon: AlertTriangle },
                { label: 'Priority', value: corridor.priority, icon: Target },
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
                    ? 'bg-gradient-to-r from-pink-600 to-pink-500 text-white'
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
                  <h2 className="text-2xl font-bold text-white mb-4">Corridor Overview</h2>
                  <p className="text-slate-400 leading-relaxed mb-6">{corridor.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Corridor Type</div>
                      <div className="text-white font-medium">{corridor.type}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Length</div>
                      <div className="text-white font-medium">{corridor.length}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Status</div>
                      <div className="text-white font-medium">{corridor.status}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Priority</div>
                      <div className="text-white font-medium">{corridor.priority}</div>
                    </div>
                  </div>
                </Card>

                <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
                  <h2 className="text-2xl font-bold text-white mb-4">Connected Protected Areas</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {corridor.connectedAreas.map((area, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-slate-800/50 border border-white/5 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-pink-400" />
                        </div>
                        <div>
                          <div className="text-white font-medium">{area.replace(/-/g, ' ')}</div>
                          <div className="text-xs text-slate-500 uppercase">Linked Area</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
                  <h3 className="text-lg font-bold text-white mb-4">Districts Covered</h3>
                  <div className="space-y-2">
                    {corridor.districts.map((district, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <Shield className="w-4 h-4 text-pink-400" />
                        <span className="text-sm text-white">{district}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
                  <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full border-white/20 text-white justify-start" icon={<FileText className="w-4 h-4" />}>
                      View Assessment
                    </Button>
                    <Button variant="outline" size="sm" className="w-full border-white/20 text-white justify-start" icon={<AlertTriangle className="w-4 h-4" />}>
                      View Threats
                    </Button>
                    <Button variant="outline" size="sm" className="w-full border-white/20 text-white justify-start" icon={<MapPin className="w-4 h-4" />}>
                      View on Map
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'ecology' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-6">Key Species Using Corridor</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {corridor.keySpecies.map((species, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                        <Activity className="w-5 h-5 text-pink-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white capitalize">{species.replace(/-/g, ' ')}</h3>
                    </div>
                    <Badge variant="info" size="sm">Movement Species</Badge>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-4">Corridor Function</h2>
              <p className="text-slate-400 leading-relaxed mb-4">
                This corridor facilitates critical wildlife movement between protected areas, enabling genetic exchange, 
                seasonal migration, and range expansion for multiple species.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                  <div className="text-xs text-slate-500 uppercase mb-1">Movement Type</div>
                  <div className="text-white font-medium">{corridor.type}</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                  <div className="text-xs text-slate-500 uppercase mb-1">Species Count</div>
                  <div className="text-white font-medium">{corridor.keySpecies.length} key species</div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'threats' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-6">Corridor Threats</h2>
              <div className="space-y-4">
                {corridor.threats.map((threat, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-white mb-1">{threat}</h3>
                        <p className="text-sm text-slate-400">Threat to corridor connectivity and species movement</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'conservation' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-6">Conservation Measures</h2>
              <div className="space-y-4">
                {corridor.conservationMeasures.map((measure, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-white mb-1">{measure}</h3>
                        <p className="text-sm text-slate-400">Active conservation intervention</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-4">Conservation Priority</h2>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${getPriorityColor(corridor.priority)} text-white`}>
                <Target className="w-5 h-5" />
                <span className="font-bold">{corridor.priority} Priority Corridor</span>
              </div>
              <p className="text-slate-400 mt-4">
                This corridor has been identified as {corridor.priority.toLowerCase()} priority for conservation action 
                due to its critical role in maintaining landscape connectivity.
              </p>
            </Card>
          </motion.div>
        )}

        {activeTab === 'related' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-6">Related Corridors</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedCorridors.slice(0, 4).map((related, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-pink-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">{related.name}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span>Length: {related.length}</span>
                      <span>Priority: {related.priority}</span>
                    </div>
                  </div>
                ))}
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
          <Card className="bg-gradient-to-r from-pink-600 to-pink-500 border-0 p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Explore Connectivity Intelligence</h3>
                <p className="text-white/80">Discover more corridors and landscape connectivity data</p>
              </div>
              <Button size="lg" className="bg-white/20 text-white border-0" icon={<ArrowRight className="w-5 h-5" />}>
                View All Corridors
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      <AdvancedFooter />
    </main>
  );
}
