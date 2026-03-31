'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  MapPin, Activity, Shield, TrendingUp, ArrowRight,
  Calendar, Mountain, Droplet, Leaf, Eye, FileText,
  AlertTriangle, Navigation as NavIcon, Book, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ProtectedArea } from '@/data/protected-network';

interface ProtectedAreaDetailPageProps {
  area: ProtectedArea;
  relatedAreas?: ProtectedArea[];
}

export function ProtectedAreaDetailPage({ area, relatedAreas = [] }: ProtectedAreaDetailPageProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<'overview' | 'habitats' | 'species' | 'monitoring' | 'trails' | 'reports'>('overview');

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'national_park': return 'from-emerald-500 to-teal-600';
      case 'wildlife_sanctuary': return 'from-blue-500 to-cyan-600';
      case 'wetland_reserve': return 'from-sky-500 to-blue-600';
      case 'conservation_reserve': return 'from-amber-500 to-orange-600';
      case 'iba': return 'from-purple-500 to-pink-600';
      default: return 'from-slate-500 to-slate-700';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'national_park': return Mountain;
      case 'wildlife_sanctuary': return Shield;
      case 'wetland_reserve': return Droplet;
      case 'conservation_reserve': return Leaf;
      case 'iba': return Activity;
      default: return MapPin;
    }
  };

  const CategoryIcon = getCategoryIcon(area.category);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Book },
    { id: 'habitats', label: 'Habitats', icon: Leaf },
    { id: 'species', label: 'Species', icon: Activity },
    { id: 'monitoring', label: 'Monitoring', icon: AlertTriangle },
    { id: 'trails', label: 'Trails', icon: NavIcon },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero */}
      <div className="relative pt-48 pb-12 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${getCategoryColor(area.category)} opacity-15`} />
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
              <button
                onClick={() => router.push(`/protected-network/${area.category === 'national_park' ? 'national-parks' : area.category === 'wildlife_sanctuary' ? 'wildlife-sanctuaries' : area.category === 'wetland_reserve' ? 'wetland-reserves' : area.category === 'conservation_reserve' ? 'conservation-reserves' : 'bird-and-habitat-areas'}`)}
                className="hover:text-white transition-colors capitalize"
              >
                {area.category.replace('_', ' ')}
              </button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">{area.name}</span>
            </nav>

            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getCategoryColor(area.category)} text-white flex items-center justify-center shadow-lg`}>
                    <CategoryIcon className="w-6 h-6" />
                  </div>
                  <Badge variant="info" size="lg" className="capitalize">
                    {area.category.replace('_', ' ')}
                  </Badge>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                  {area.name}
                </h1>
                <p className="text-xl text-slate-400 max-w-3xl mb-6">
                  {area.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    className={`bg-gradient-to-r ${getCategoryColor(area.category)}`}
                    icon={<MapPin className="w-5 h-5" />}
                  >
                    View on Map
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white"
                    icon={<FileText className="w-5 h-5" />}
                  >
                    Management Plan
                  </Button>
                </div>
              </div>

              {/* Quick Stats */}
              <Card className="glass-intense border-white/10 p-6 hidden lg:block">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Area</div>
                      <div className="text-lg font-bold text-white">{area.area} km²</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Established</div>
                      <div className="text-lg font-bold text-white">{area.established}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500 uppercase">District</div>
                      <div className="text-lg font-bold text-white">{area.district}</div>
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
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
              {[
                { label: 'Area', value: `${area.area} km²`, icon: MapPin },
                { label: 'Ecosystems', value: area.ecosystems.length, icon: Leaf },
                { label: 'Key Species', value: area.keySpecies.length, icon: Activity },
                { label: 'Protection', value: 'High', icon: Shield },
                { label: 'Access', value: 'Moderate', icon: NavIcon },
                { label: 'Threats', value: '3', icon: AlertTriangle },
                { label: 'Trails', value: '5', icon: Eye },
                { label: 'Reports', value: '12', icon: FileText },
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
                    ? `bg-gradient-to-r ${getCategoryColor(area.category)} text-white`
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
                  <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                  <p className="text-slate-400 leading-relaxed mb-6">{area.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Location</div>
                      <div className="text-white font-medium">{area.district} District</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Established</div>
                      <div className="text-white font-medium">{area.established}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Total Area</div>
                      <div className="text-white font-medium">{area.area} km²</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Protection Status</div>
                      <div className="text-white font-medium capitalize">{area.category.replace('_', ' ')}</div>
                    </div>
                  </div>
                </Card>

                <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
                  <h2 className="text-2xl font-bold text-white mb-4">Spatial Context</h2>
                  <div className="relative h-64 rounded-xl bg-gradient-to-br from-emerald-500/10 to-slate-800/50 border border-white/10 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                      <p className="text-slate-400 text-sm">Interactive map view</p>
                      <p className="text-slate-500 text-xs mt-1">{area.latitude?.toFixed(2)}, {area.longitude?.toFixed(2)}</p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
                  <h3 className="text-lg font-bold text-white mb-4">Key Species</h3>
                  <div className="space-y-3">
                    {area.keySpecies.map((species, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                          <Activity className="w-4 h-4 text-emerald-400" />
                        </div>
                        <span className="text-sm text-white capitalize">{species.replace(/-/g, ' ')}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
                  <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full border-white/20 text-white justify-start" icon={<FileText className="w-4 h-4" />}>
                      View Management Plan
                    </Button>
                    <Button variant="outline" size="sm" className="w-full border-white/20 text-white justify-start" icon={<Eye className="w-4 h-4" />}>
                      View Sightings
                    </Button>
                    <Button variant="outline" size="sm" className="w-full border-white/20 text-white justify-start" icon={<AlertTriangle className="w-4 h-4" />}>
                      View Threats
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'habitats' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-6">Ecosystems & Habitats</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {area.ecosystems.map((ecosystem, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                        <Leaf className="w-5 h-5 text-emerald-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">{ecosystem}</h3>
                    </div>
                    <p className="text-sm text-slate-400">Critical habitat supporting diverse flora and fauna within the protected area.</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'species' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-6">Protected Area Species</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {area.keySpecies.map((species, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                        <Activity className="w-5 h-5 text-purple-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white capitalize">{species.replace(/-/g, ' ')}</h3>
                    </div>
                    <Badge variant="info" size="sm">Present</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'monitoring' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-6">Monitoring & Threats</h2>
              <div className="space-y-4">
                {[
                  { title: 'Habitat Fragmentation', severity: 'medium', description: 'Edge effects from surrounding land use' },
                  { title: 'Human Disturbance', severity: 'low', description: 'Tourism and local activity pressure' },
                  { title: 'Climate Sensitivity', severity: 'medium', description: 'Temperature and precipitation shifts' },
                ].map((threat, idx) => (
                  <div key={idx} className={`p-4 rounded-xl border ${
                    threat.severity === 'high' ? 'bg-red-500/10 border-red-500/30' :
                    threat.severity === 'medium' ? 'bg-amber-500/10 border-amber-500/30' :
                    'bg-blue-500/10 border-blue-500/30'
                  }`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-white mb-1">{threat.title}</h3>
                        <p className="text-sm text-slate-400">{threat.description}</p>
                      </div>
                      <Badge variant={threat.severity === 'high' ? 'danger' : threat.severity === 'medium' ? 'warning' : 'info'} size="sm">
                        {threat.severity.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'trails' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-6">Trails & Routes</h2>
              <div className="space-y-4">
                {[
                  { name: 'Main Interpretation Trail', length: '3.5 km', difficulty: 'Easy' },
                  { name: 'Forest Loop Trail', length: '5 km', difficulty: 'Moderate' },
                  { name: 'Summit View Trail', length: '8 km', difficulty: 'Challenging' },
                ].map((trail, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-800/50 border border-white/5 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-white mb-1">{trail.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span>Length: {trail.length}</span>
                        <span>Difficulty: {trail.difficulty}</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-emerald-400" icon={<ArrowRight className="w-4 h-4" />} />
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {activeTab === 'reports' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-6">Reports & Documents</h2>
              <div className="space-y-4">
                {[
                  { title: 'Management Plan 2024-2029', type: 'Management Plan', year: 2024 },
                  { title: 'Ecological Assessment Report', type: 'Scientific Report', year: 2023 },
                  { title: 'Species Monitoring Summary', type: 'Monitoring Data', year: 2024 },
                ].map((report, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-800/50 border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-amber-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{report.title}</h3>
                        <div className="text-sm text-slate-400">{report.type} • {report.year}</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-white/20 text-white" icon={<FileText className="w-4 h-4" />}>
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Related Protected Areas */}
        {relatedAreas.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Related Protected Areas</h2>
              <Button variant="ghost" size="sm" className="text-emerald-400" icon={<ArrowRight className="w-4 h-4" />}>
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedAreas.slice(0, 3).map((related) => (
                <motion.a
                  key={related.id}
                  href={`/protected-network/${related.category === 'national_park' ? 'national-parks' : related.category === 'wildlife_sanctuary' ? 'wildlife-sanctuaries' : 'wetland-reserves'}/${related.slug}`}
                  className="block group"
                  whileHover={{ y: -4 }}
                >
                  <Card className="h-full card-intelligence border border-white/5 bg-slate-900/50" padding="none">
                    <div className="relative h-32 bg-gradient-to-br from-emerald-500/20 to-slate-800/50">
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {related.name}
                        </h3>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span>{related.area} km²</span>
                        <span>{related.district}</span>
                      </div>
                    </div>
                  </Card>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card className={`bg-gradient-to-r ${getCategoryColor(area.category)} border-0 p-8`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Explore More Intelligence</h3>
                <p className="text-white/80">Discover species, corridors, and monitoring data for this protected area</p>
              </div>
              <Button size="lg" className="bg-white/20 text-white border-0" icon={<ArrowRight className="w-5 h-5" />}>
                View Intelligence
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      <AdvancedFooter />
    </main>
  );
}
