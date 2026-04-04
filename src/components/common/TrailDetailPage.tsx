'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  MapPin, Activity, ArrowRight, ChevronRight, TrendingUp,
  AlertTriangle, Book, FileText, Eye, Calendar, Mountain,
  Droplet, Leaf, Shield, Navigation as NavIcon, Clock,
  Thermometer, Ruler, Users, Target, CheckCircle, Footprints,
  Bird, Flower2, Sun, Wind, Info
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Trail } from '@/data/protected-network';

interface TrailDetailPageProps {
  trail: Trail;
  relatedTrails?: Trail[];
}

export function TrailDetailPage({ trail, relatedTrails = [] }: TrailDetailPageProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<'overview' | 'route' | 'ecology' | 'seasonality' | 'safety' | 'sightings'>('overview');

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'success';
      case 'Moderate': return 'warning';
      case 'Challenging': return 'danger';
      default: return 'default';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Birding Trail': return 'from-purple-500 to-purple-600';
      case 'Eco-Trail': return 'from-emerald-500 to-emerald-600';
      case 'Interpretation Trail': return 'from-blue-500 to-blue-600';
      case 'Trekking Route': return 'from-amber-500 to-amber-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Book },
    { id: 'route', label: 'Route Map', icon: MapPin },
    { id: 'ecology', label: 'Ecology', icon: Leaf },
    { id: 'seasonality', label: 'Seasonality', icon: Calendar },
    { id: 'safety', label: 'Safety & Access', icon: Shield },
    { id: 'sightings', label: 'Sightings', icon: Eye },
  ];

  return (
    <main className="min-h-screen bg-slate-950">{/* Hero */}
      <div className="relative pt-48 pb-12 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br from-amber-600/15 to-slate-900`} />
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
              <button onClick={() => router.push('/protected-network/trails-and-sightings')} className="hover:text-white transition-colors">
                Trails & Sightings
              </button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">{trail.name}</span>
            </nav>

            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getTypeColor(trail.type)} text-white flex items-center justify-center shadow-lg`}>
                    <Footprints className="w-6 h-6" />
                  </div>
                  <Badge variant={getDifficultyColor(trail.difficulty)} size="lg">
                    {trail.difficulty}
                  </Badge>
                  <Badge variant="info" size="lg">
                    {trail.type}
                  </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                  {trail.name}
                </h1>
                <p className="text-xl text-slate-400 max-w-3xl mb-6">
                  {trail.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    className="bg-gradient-to-r from-amber-600 to-amber-500"
                    icon={<MapPin className="w-5 h-5" />}
                  >
                    Start Trail
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white"
                    icon={<Eye className="w-5 h-5" />}
                  >
                    View Sightings
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
                      <div className="text-lg font-bold text-white">{trail.length}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mountain className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Elevation</div>
                      <div className="text-lg font-bold text-white">{trail.elevation.min}-{trail.elevation.max}m</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Best Season</div>
                      <div className="text-lg font-bold text-white text-xs">{trail.bestSeason.split(' ')[0]}</div>
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
                { label: 'Length', value: trail.length, icon: Ruler },
                { label: 'Difficulty', value: trail.difficulty, icon: TrendingUp },
                { label: 'Elevation Min', value: `${trail.elevation.min}m`, icon: Mountain },
                { label: 'Elevation Max', value: `${trail.elevation.max}m`, icon: Mountain },
                { label: 'Wildlife', value: trail.wildlife.length, icon: Activity },
                { label: 'Highlights', value: trail.highlights.length, icon: Eye },
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
                    ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white'
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
                  <h2 className="text-2xl font-bold text-white mb-4">Trail Overview</h2>
                  <p className="text-slate-400 leading-relaxed mb-6">{trail.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Protected Area</div>
                      <div className="text-white font-medium">{trail.protectedArea}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Trail Type</div>
                      <div className="text-white font-medium">{trail.type}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Length</div>
                      <div className="text-white font-medium">{trail.length}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Difficulty</div>
                      <div className="text-white font-medium">{trail.difficulty}</div>
                    </div>
                  </div>
                </Card>

                <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
                  <h2 className="text-2xl font-bold text-white mb-4">Trail Highlights</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {trail.highlights.map((highlight, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                          <Eye className="w-5 h-5 text-amber-400" />
                        </div>
                        <div className="text-white font-medium">{highlight}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
                  <h3 className="text-lg font-bold text-white mb-4">Wildlife Species</h3>
                  <div className="space-y-2">
                    {trail.wildlife.map((species, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <Bird className="w-4 h-4 text-amber-400" />
                        <span className="text-sm text-white capitalize">{species.replace(/-/g, ' ')}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
                  <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full border-white/20 text-white justify-start" icon={<MapPin className="w-4 h-4" />}>
                      Download GPX
                    </Button>
                    <Button variant="outline" size="sm" className="w-full border-white/20 text-white justify-start" icon={<Eye className="w-4 h-4" />}>
                      Log Sighting
                    </Button>
                    <Button variant="outline" size="sm" className="w-full border-white/20 text-white justify-start" icon={<Info className="w-4 h-4" />}>
                      Trail Guide
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'route' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-6">Route Map & Elevation</h2>
              <div className="relative h-96 rounded-xl bg-gradient-to-br from-amber-500/10 to-slate-800/50 border border-white/10 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-amber-500 mx-auto mb-3" />
                  <p className="text-slate-400 text-sm">Interactive trail map</p>
                  <p className="text-slate-500 text-xs mt-1">{trail.protectedArea}</p>
                  <p className="text-slate-500 text-xs">Elevation: {trail.elevation.min}m - {trail.elevation.max}m</p>
                </div>
              </div>
            </Card>

            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-4">Elevation Profile</h2>
              <div className="h-32 rounded-xl bg-slate-800/50 border border-white/5 flex items-end justify-between p-4 gap-2">
                {[40, 55, 70, 85, 100, 90, 75, 60, 50, 45].map((height, idx) => (
                  <div
                    key={idx}
                    className="w-full bg-gradient-to-t from-amber-600 to-amber-400 rounded-t"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-slate-500">
                <span>Start ({trail.elevation.min}m)</span>
                <span>Peak ({trail.elevation.max}m)</span>
                <span>End ({trail.elevation.min}m)</span>
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
              <h2 className="text-2xl font-bold text-white mb-6">Trail Ecology</h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                This trail passes through diverse ecosystems within {trail.protectedArea}, offering opportunities 
                to observe unique flora and fauna in their natural habitat.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <div className="flex items-center gap-3 mb-2">
                    <Leaf className="w-5 h-5 text-emerald-400" />
                    <h3 className="font-semibold text-white">Habitat Types</h3>
                  </div>
                  <p className="text-sm text-slate-400">Temperate forests, alpine meadows, and riparian zones</p>
                </div>
                <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
                  <div className="flex items-center gap-3 mb-2">
                    <Bird className="w-5 h-5 text-purple-400" />
                    <h3 className="font-semibold text-white">Wildlife Value</h3>
                  </div>
                  <p className="text-sm text-slate-400">High biodiversity with {trail.wildlife.length} key species</p>
                </div>
              </div>
            </Card>

            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-4">Species Along Trail</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {trail.wildlife.map((species, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                        <Bird className="w-5 h-5 text-amber-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white capitalize">{species.replace(/-/g, ' ')}</h3>
                    </div>
                    <Badge variant="info" size="sm">Possible Sighting</Badge>
                  </div>
                ))}
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
              <h2 className="text-2xl font-bold text-white mb-6">Best Time to Visit</h2>
              <div className="p-6 rounded-xl bg-gradient-to-r from-amber-500/10 to-slate-800/50 border border-amber-500/30 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <Sun className="w-6 h-6 text-amber-400" />
                  <h3 className="text-xl font-bold text-white">{trail.bestSeason}</h3>
                </div>
                <p className="text-slate-400">
                  This is the optimal time for visiting the trail, with favorable weather conditions 
                  and highest wildlife activity.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5 text-center">
                  <Sun className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                  <div className="text-xs text-slate-500 uppercase">Spring</div>
                  <div className="text-white font-medium">Good</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5 text-center">
                  <Sun className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                  <div className="text-xs text-slate-500 uppercase">Summer</div>
                  <div className="text-white font-medium">Best</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5 text-center">
                  <Wind className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                  <div className="text-xs text-slate-500 uppercase">Autumn</div>
                  <div className="text-white font-medium">Good</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5 text-center">
                  <Thermometer className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-xs text-slate-500 uppercase">Winter</div>
                  <div className="text-white font-medium">Limited</div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'safety' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-6">Safety Notes & Access</h2>
              <div className="space-y-4 mb-6">
                {trail.safetyNotes.map((note, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-400 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-white mb-1">{note}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-4">Access Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                  <div className="text-xs text-slate-500 uppercase mb-1">Starting Point</div>
                  <div className="text-white font-medium">{trail.protectedArea} Entrance</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                  <div className="text-xs text-slate-500 uppercase mb-1">Permit Required</div>
                  <div className="text-white font-medium">Yes (Park Entry)</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                  <div className="text-xs text-slate-500 uppercase mb-1">Guide Recommended</div>
                  <div className="text-white font-medium">{trail.difficulty === 'Challenging' ? 'Yes' : 'Optional'}</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                  <div className="text-xs text-slate-500 uppercase mb-1">Mobile Coverage</div>
                  <div className="text-white font-medium">Limited</div>
                </div>
              </div>
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
              <h2 className="text-2xl font-bold text-white mb-6">Recent Sightings on Trail</h2>
              <div className="space-y-4">
                {trail.wildlife.slice(0, 4).map((species, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-800/50 border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                        <Eye className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white capitalize">{species.replace(/-/g, ' ')}</h3>
                        <p className="text-sm text-slate-400">Verified sighting</p>
                      </div>
                    </div>
                    <Badge variant="success" size="sm">Confirmed</Badge>
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
                <Button className="bg-gradient-to-r from-amber-600 to-amber-500" icon={<Eye className="w-5 h-5" />}>
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
          <Card className="bg-gradient-to-r from-amber-600 to-amber-500 border-0 p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Explore More Trails</h3>
                <p className="text-white/80">Discover other trails and birding routes across Kashmir</p>
              </div>
              <Button size="lg" className="bg-white/20 text-white border-0" icon={<ArrowRight className="w-5 h-5" />}>
                View All Trails
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      <AdvancedFooter />
    </main>
  );
}
