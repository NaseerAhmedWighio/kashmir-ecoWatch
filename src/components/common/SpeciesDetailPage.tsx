'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Activity, ArrowRight, ChevronRight, MapPin, Shield,
  Calendar, Leaf, AlertTriangle, CheckCircle, Eye,
  FileText, Book, TrendingUp, Bird
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { SpeciesProfile } from '@/data/protected-network';

interface SpeciesDetailPageProps {
  species: SpeciesProfile;
  relatedSpecies?: SpeciesProfile[];
}

export function SpeciesDetailPage({ species, relatedSpecies = [] }: SpeciesDetailPageProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<'overview' | 'distribution' | 'ecology' | 'seasonality' | 'threats' | 'conservation' | 'sightings'>('overview');

  const getStatusColor = (status: string) => {
    if (status.includes('CR')) return 'from-red-600 to-red-700';
    if (status.includes('EN')) return 'from-orange-500 to-red-600';
    if (status.includes('VU')) return 'from-amber-500 to-orange-600';
    if (status.includes('NT')) return 'from-blue-500 to-cyan-600';
    return 'from-emerald-500 to-emerald-600';
  };

  const getStatusBadge = (status: string) => {
    if (status.includes('CR')) return 'danger';
    if (status.includes('EN')) return 'danger';
    if (status.includes('VU')) return 'warning';
    if (status.includes('NT')) return 'info';
    return 'success';
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Book },
    { id: 'distribution', label: 'Distribution', icon: MapPin },
    { id: 'ecology', label: 'Ecology', icon: Leaf },
    { id: 'seasonality', label: 'Seasonality', icon: Calendar },
    { id: 'threats', label: 'Threats', icon: AlertTriangle },
    { id: 'conservation', label: 'Conservation', icon: Shield },
    { id: 'sightings', label: 'Sightings', icon: Eye },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero */}
      <div className="relative pt-48 pb-12 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${getStatusColor(species.conservationStatus)} opacity-15`} />
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
              <button onClick={() => router.push('/protected-network/species-intelligence')} className="hover:text-white transition-colors">
                Species Intelligence
              </button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">{species.name}</span>
            </nav>

            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getStatusColor(species.conservationStatus)} text-white flex items-center justify-center shadow-lg`}>
                    <Bird className="w-6 h-6" />
                  </div>
                  <Badge variant={getStatusBadge(species.conservationStatus)} size="lg">
                    {species.conservationStatus}
                  </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                  {species.name}
                </h1>
                <p className="text-xl text-slate-400 max-w-3xl mb-6">
                  {species.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    className={`bg-gradient-to-r ${getStatusColor(species.conservationStatus)}`}
                    icon={<Eye className="w-5 h-5" />}
                  >
                    View Sightings
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white"
                    icon={<FileText className="w-5 h-5" />}
                  >
                    Conservation Report
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <Card className="glass-intense border-white/10 p-6 hidden lg:block">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Protected Areas</div>
                      <div className="text-lg font-bold text-white">{species.protectedAreas.length}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Threats</div>
                      <div className="text-lg font-bold text-white">{species.threats.length}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Conservation Measures</div>
                      <div className="text-lg font-bold text-white">{species.conservationMeasures.length}</div>
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
                { label: 'Status', value: species.conservationStatus.split(' ')[0], icon: Shield },
                { label: 'Protected Areas', value: species.protectedAreas.length, icon: MapPin },
                { label: 'Threats', value: species.threats.length, icon: AlertTriangle },
                { label: 'Conservation', value: species.conservationMeasures.length, icon: CheckCircle },
                { label: 'Scientific Name', value: species.scientificName.split(' ')[0], icon: Book },
                { label: 'Type', value: 'Species', icon: Activity },
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
                    ? `bg-gradient-to-r ${getStatusColor(species.conservationStatus)} text-white`
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
                  <h2 className="text-2xl font-bold text-white mb-4">Species Overview</h2>
                  <p className="text-slate-400 leading-relaxed mb-6">{species.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Scientific Name</div>
                      <div className="text-white font-medium italic">{species.scientificName}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Conservation Status</div>
                      <div className="text-white font-medium">{species.conservationStatus}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Protected Areas</div>
                      <div className="text-white font-medium">{species.protectedAreas.length} areas</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Threat Count</div>
                      <div className="text-white font-medium">{species.threats.length} threats</div>
                    </div>
                  </div>
                </Card>

                <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
                  <h2 className="text-2xl font-bold text-white mb-4">Conservation Summary</h2>
                  <p className="text-slate-400 leading-relaxed mb-4">
                    This species has been identified as a conservation priority with {species.conservationMeasures.length} active 
                    conservation measures in place across its range in Kashmir.
                  </p>
                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${getStatusColor(species.conservationStatus)} text-white`}>
                    <Shield className="w-5 h-5" />
                    <span className="font-bold">Priority Conservation Species</span>
                  </div>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
                  <h3 className="text-lg font-bold text-white mb-4">Protected Areas</h3>
                  <div className="space-y-2">
                    {species.protectedAreas.map((area, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <MapPin className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm text-white">{area.replace(/-/g, ' ')}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
                  <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full border-white/20 text-white justify-start" icon={<Eye className="w-4 h-4" />}>
                      View Sightings
                    </Button>
                    <Button variant="outline" size="sm" className="w-full border-white/20 text-white justify-start" icon={<FileText className="w-4 h-4" />}>
                      Conservation Report
                    </Button>
                    <Button variant="outline" size="sm" className="w-full border-white/20 text-white justify-start" icon={<MapPin className="w-4 h-4" />}>
                      Distribution Map
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'distribution' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-6">Distribution & Range</h2>
              <p className="text-slate-400 leading-relaxed mb-6">{species.distribution}</p>
              <div className="h-64 rounded-xl bg-slate-800/50 border border-white/5 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  <p className="text-slate-400 text-sm">Species distribution map</p>
                  <p className="text-slate-500 text-xs mt-1">{species.protectedAreas.length} protected areas</p>
                </div>
              </div>
            </Card>

            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-4">Protected Area Occurrence</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {species.protectedAreas.map((area, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-800/50 border border-white/5 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">{area.replace(/-/g, ' ')}</div>
                      <div className="text-xs text-slate-500 uppercase">Protected Area</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'ecology' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-6">Ecology & Habitat</h2>
              <p className="text-slate-400 leading-relaxed mb-6">{species.ecology}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <div className="flex items-center gap-3 mb-2">
                    <Leaf className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-semibold text-white">Ecological Role</h3>
                  </div>
                  <p className="text-sm text-slate-400">Key species in ecosystem functioning</p>
                </div>
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    <h3 className="font-semibold text-white">Habitat Type</h3>
                  </div>
                  <p className="text-sm text-slate-400">Temperate forests and alpine zones</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'seasonality' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-6">Seasonal Patterns</h2>
              <div className="p-6 rounded-xl bg-gradient-to-r from-emerald-500/10 to-slate-800/50 border border-emerald-500/30 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="w-6 h-6 text-emerald-400" />
                  <h3 className="text-xl font-bold text-white">{species.seasonality}</h3>
                </div>
                <p className="text-slate-400">
                  Seasonal activity patterns and behavioral cycles for {species.name}.
                </p>
              </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5 text-center">
                  <Leaf className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                  <div className="text-xs text-slate-500 uppercase">Spring</div>
                  <div className="text-white font-medium">Active</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5 text-center">
                  <TrendingUp className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                  <div className="text-xs text-slate-500 uppercase">Summer</div>
                  <div className="text-white font-medium">Breeding</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5 text-center">
                  <Leaf className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                  <div className="text-xs text-slate-500 uppercase">Autumn</div>
                  <div className="text-white font-medium">Active</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5 text-center">
                  <Calendar className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-xs text-slate-500 uppercase">Winter</div>
                  <div className="text-white font-medium">Variable</div>
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
              <h2 className="text-2xl font-bold text-white mb-6">Threats</h2>
              <div className="space-y-4">
                {species.threats.map((threat, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-white mb-1">{threat}</h3>
                        <p className="text-sm text-slate-400">Conservation threat requiring attention</p>
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
                {species.conservationMeasures.map((measure, idx) => (
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
              <h2 className="text-2xl font-bold text-white mb-4">Conservation Status</h2>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${getStatusColor(species.conservationStatus)} text-white mb-4`}>
                <Shield className="w-5 h-5" />
                <span className="font-bold">{species.conservationStatus}</span>
              </div>
              <p className="text-slate-400">
                This species is classified under IUCN Red List category as indicated above, 
                reflecting its global conservation status and extinction risk.
              </p>
            </Card>
          </motion.div>
        )}

        {activeTab === 'sightings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-6">Recent Sightings</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((_, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-800/50 border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                        <Eye className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{species.name}</h3>
                        <p className="text-sm text-slate-400">{species.protectedAreas[0]?.replace(/-/g, ' ')}</p>
                      </div>
                    </div>
                    <Badge variant="success" size="sm">Verified</Badge>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Log Your Sighting</h3>
                  <p className="text-slate-400">Contribute to citizen science by recording your observations</p>
                </div>
                <Button className={`bg-gradient-to-r ${getStatusColor(species.conservationStatus)}`} icon={<Eye className="w-5 h-5" />}>
                  Submit Sighting
                </Button>
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
          <Card className={`bg-gradient-to-r ${getStatusColor(species.conservationStatus)} border-0 p-8`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Explore More Species</h3>
                <p className="text-white/80">Discover other species and their conservation status</p>
              </div>
              <Button size="lg" className="bg-white/20 text-white border-0" icon={<ArrowRight className="w-5 h-5" />}>
                View All Species
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      <AdvancedFooter />
    </main>
  );
}
