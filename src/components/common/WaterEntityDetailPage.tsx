'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  MapPin, Droplet, Activity, ArrowRight, ChevronRight, TrendingUp,
  AlertTriangle, Book, FileText, Eye, Calendar, Thermometer,
  Wind, Leaf, Shield, Navigation as NavIcon, Ruler, Info,
  BarChart3, CheckCircle, Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { WaterEntity, WaterQualityData, HydrologicalData } from '@/data/water-systems';
import { NwiaClassificationBadge } from '@/components/water/NwiaClassificationPanel';

interface WaterEntityDetailPageProps {
  entity: WaterEntity;
  relatedEntities?: WaterEntity[];
}

export function WaterEntityDetailPage({ entity, relatedEntities = [] }: WaterEntityDetailPageProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<'overview' | 'quality' | 'hydrology' | 'biodiversity' | 'threats' | 'related'>('overview');

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lake': return 'from-blue-500 to-cyan-600';
      case 'wetland': return 'from-sky-500 to-blue-600';
      case 'river': return 'from-indigo-500 to-purple-600';
      case 'stream': return 'from-cyan-500 to-teal-600';
      case 'spring': return 'from-emerald-500 to-green-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lake': return Droplet;
      case 'wetland': return Droplet;
      case 'river': return Wind;
      case 'stream': return Wind;
      case 'spring': return Droplet;
      default: return Info;
    }
  };

  const TypeIcon = getTypeIcon(entity.type);

  const getQualityBadge = (status: string) => {
    switch (status) {
      case 'excellent': return 'success';
      case 'good': return 'success';
      case 'moderate': return 'warning';
      case 'poor': return 'warning';
      case 'critical': return 'danger';
      default: return 'default';
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Book },
    { id: 'quality', label: 'Water Quality', icon: Thermometer },
    { id: 'hydrology', label: 'Hydrology', icon: BarChart3 },
    { id: 'biodiversity', label: 'Biodiversity', icon: Activity },
    { id: 'threats', label: 'Threats', icon: AlertTriangle },
    { id: 'related', label: 'Related', icon: MapPin },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero */}
      <div className="relative pt-24 pb-12 overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${getTypeColor(entity.type)} opacity-15`} />
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <button onClick={() => router.push('/water-systems')} className="hover:text-white transition-colors">
                Water Systems
              </button>
              <ChevronRight className="w-4 h-4" />
              <button 
                onClick={() => router.push(`/water-systems/${entity.type === 'river' || entity.type === 'stream' ? 'rivers' : entity.type === 'spring' ? 'springs' : entity.type === 'wetland' ? 'wetlands' : 'lakes'}`)} 
                className="hover:text-white transition-colors capitalize"
              >
                {entity.type === 'river' || entity.type === 'stream' ? 'Rivers & Streams' : entity.type === 'spring' ? 'Springs' : entity.type === 'wetland' ? 'Wetlands' : 'Lakes'}
              </button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">{entity.name}</span>
            </nav>

            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getTypeColor(entity.type)} text-white flex items-center justify-center shadow-lg`}>
                    <TypeIcon className="w-6 h-6" />
                  </div>
                  <Badge variant="info" size="lg">
                    {entity.category}
                  </Badge>
                  {entity.waterQuality && (
                    <Badge variant={getQualityBadge(entity.waterQuality.status)} size="lg">
                      {entity.waterQuality.status.toUpperCase()}
                    </Badge>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                  {entity.name}
                </h1>
                <p className="text-xl text-slate-400 max-w-3xl mb-6">
                  {entity.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    className={`bg-gradient-to-r ${getTypeColor(entity.type)}`}
                    icon={<MapPin className="w-5 h-5" />}
                  >
                    View on Map
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
                      <div className="text-xs text-slate-500 uppercase">District</div>
                      <div className="text-lg font-bold text-white">{entity.district}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Ruler className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Elevation</div>
                      <div className="text-lg font-bold text-white">{entity.elevation}m</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Droplet className="w-5 h-5 text-slate-400" />
                    <div>
                      <div className="text-xs text-slate-500 uppercase">Watershed</div>
                      <div className="text-lg font-bold text-white text-xs">{entity.watershed}</div>
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
                { label: 'Elevation', value: `${entity.elevation}m`, icon: Ruler },
                { label: 'District', value: entity.district.split(' ')[0], icon: MapPin },
                { label: 'pH Level', value: entity.waterQuality?.pH.toFixed(1) || 'N/A', icon: Thermometer },
                { label: 'Dissolved O₂', value: `${entity.waterQuality?.dissolvedOxygen || 'N/A'} mg/L`, icon: Wind },
                { label: 'Quality', value: entity.waterQuality?.status || 'N/A', icon: CheckCircle },
                { label: 'Flood Risk', value: entity.hydrologicalData?.floodRisk || 'N/A', icon: AlertTriangle },
                { label: 'Biodiversity', value: entity.biodiversity?.length || 0, icon: Activity },
                { label: 'Threats', value: entity.threats?.length || 0, icon: AlertTriangle },
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
                    ? `bg-gradient-to-r ${getTypeColor(entity.type)} text-white`
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
                  <p className="text-slate-400 leading-relaxed mb-6">{entity.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Type</div>
                      <div className="text-white font-medium capitalize">{entity.type}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Category</div>
                      <div className="text-white font-medium">{entity.category}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">District</div>
                      <div className="text-white font-medium">{entity.district}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Watershed</div>
                      <div className="text-white font-medium">{entity.watershed}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Elevation</div>
                      <div className="text-white font-medium">{entity.elevation}m</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Area</div>
                      <div className="text-white font-medium">{entity.area ? `${entity.area} km²` : entity.length ? `${entity.length} km` : 'N/A'}</div>
                    </div>
                  </div>
                </Card>

                {/* NWIA Classification */}
                {(entity.nwiaCode || entity.nwiaSignificance) && (
                  <NwiaClassificationBadge nwiaCode={entity.nwiaCode} nwiaSignificance={entity.nwiaSignificance} />
                )}

                <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
                  <h2 className="text-2xl font-bold text-white mb-4">Location</h2>
                  <div className="relative h-64 rounded-xl bg-gradient-to-br from-blue-500/10 to-slate-800/50 border border-white/10 flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                      <p className="text-slate-400 text-sm">Interactive map view</p>
                      <p className="text-slate-500 text-xs mt-1">
                        {entity.coordinates?.lat.toFixed(4)}, {entity.coordinates?.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="space-y-6">
                <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
                  <h3 className="text-lg font-bold text-white mb-4">Quick Stats</h3>
                  <div className="space-y-3">
                    {entity.area && (
                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <span className="text-sm text-slate-400">Area</span>
                        <span className="text-white font-medium">{entity.area} km²</span>
                      </div>
                    )}
                    {entity.length && (
                      <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                        <span className="text-sm text-slate-400">Length</span>
                        <span className="text-white font-medium">{entity.length} km</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <span className="text-sm text-slate-400">Elevation</span>
                      <span className="text-white font-medium">{entity.elevation}m</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/5 transition-colors">
                      <span className="text-sm text-slate-400">Biodiversity</span>
                      <span className="text-white font-medium">{entity.biodiversity?.length} species</span>
                    </div>
                  </div>
                </Card>

                <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
                  <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full border-white/20 text-white justify-start" icon={<FileText className="w-4 h-4" />}>
                      View Conservation Report
                    </Button>
                    <Button variant="outline" size="sm" className="w-full border-white/20 text-white justify-start" icon={<Eye className="w-4 h-4" />}>
                      View Sightings
                    </Button>
                    <Button variant="outline" size="sm" className="w-full border-white/20 text-white justify-start" icon={<AlertTriangle className="w-4 h-4" />}>
                      Report Issue
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'quality' && entity.waterQuality && (
          <WaterQualityTab waterQuality={entity.waterQuality} />
        )}

        {activeTab === 'hydrology' && entity.hydrologicalData && (
          <HydrologyTab hydrology={entity.hydrologicalData} type={entity.type} />
        )}

        {activeTab === 'biodiversity' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-6">Biodiversity</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {entity.biodiversity?.map((species, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                        <Activity className="w-5 h-5 text-emerald-400" />
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

        {activeTab === 'threats' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
              <h2 className="text-2xl font-bold text-white mb-6">Threats</h2>
              <div className="space-y-4">
                {entity.threats?.map((threat, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-white mb-1 capitalize">{threat.replace(/-/g, ' ')}</h3>
                        <p className="text-sm text-slate-400">Environmental threat requiring attention</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
              <h2 className="text-2xl font-bold text-white mb-6">Related Water Bodies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedEntities.slice(0, 4).map((related, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getTypeColor(related.type)} flex items-center justify-center`}>
                        <Droplet className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">{related.name}</h3>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <span>{related.district}</span>
                      <span>{related.elevation}m</span>
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
          <Card className={`bg-gradient-to-r ${getTypeColor(entity.type)} border-0 p-8`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Explore More Water Systems</h3>
                <p className="text-white/80">Discover lakes, wetlands, rivers, and springs across Kashmir</p>
              </div>
              <Button size="lg" className="bg-white/20 text-white border-0" icon={<ArrowRight className="w-5 h-5" />}>
                View All Water Bodies
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      <AdvancedFooter />
    </main>
  );
}

// Water Quality Tab Component
function WaterQualityTab({ waterQuality }: { waterQuality: WaterQualityData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
        <h2 className="text-2xl font-bold text-white mb-6">Water Quality Parameters</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: 'pH Level', value: waterQuality.pH, unit: '', status: waterQuality.pH >= 6.5 && waterQuality.pH <= 8.5 ? 'good' : 'warning' },
            { label: 'Dissolved Oxygen', value: waterQuality.dissolvedOxygen, unit: 'mg/L', status: waterQuality.dissolvedOxygen >= 6 ? 'good' : 'warning' },
            { label: 'Turbidity', value: waterQuality.turbidity, unit: 'NTU', status: waterQuality.turbidity <= 5 ? 'good' : 'warning' },
            { label: 'Conductivity', value: waterQuality.conductivity, unit: 'μS/cm', status: 'neutral' },
            { label: 'Temperature', value: waterQuality.temperature, unit: '°C', status: 'neutral' },
            { label: 'Nitrates', value: waterQuality.nitrates, unit: 'mg/L', status: waterQuality.nitrates <= 1 ? 'good' : 'warning' },
            { label: 'Phosphates', value: waterQuality.phosphates, unit: 'mg/L', status: waterQuality.phosphates <= 0.1 ? 'good' : 'warning' },
            { label: 'BOD', value: waterQuality.biologicalOxygenDemand, unit: 'mg/L', status: waterQuality.biologicalOxygenDemand <= 3 ? 'good' : 'warning' },
            { label: 'TDS', value: waterQuality.totalDissolvedSolids, unit: 'mg/L', status: 'neutral' },
            { label: 'Fecal Coliform', value: waterQuality.fecalColiform, unit: 'CFU/100mL', status: waterQuality.fecalColiform <= 200 ? 'good' : 'warning' },
          ].map((param, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
              <div className="text-xs text-slate-500 uppercase mb-1">{param.label}</div>
              <div className="text-2xl font-bold text-white">
                {param.value} <span className="text-sm text-slate-500">{param.unit}</span>
              </div>
              <div className={`text-xs mt-2 capitalize ${
                param.status === 'good' ? 'text-emerald-400' : param.status === 'warning' ? 'text-amber-400' : 'text-slate-500'
              }`}>
                {param.status === 'good' ? 'Within Range' : param.status === 'warning' ? 'Caution' : 'N/A'}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
        <h2 className="text-2xl font-bold text-white mb-4">Quality Trends</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5 text-center">
            <div className="text-xs text-slate-500 uppercase mb-2">pH Trend</div>
            <div className={`text-lg font-bold ${
              waterQuality.trends?.pH === 'improving' ? 'text-emerald-400' : 
              waterQuality.trends?.pH === 'declining' ? 'text-red-400' : 'text-slate-400'
            }`}>
              {waterQuality.trends?.pH?.toUpperCase() || 'STABLE'}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5 text-center">
            <div className="text-xs text-slate-500 uppercase mb-2">Oxygen Trend</div>
            <div className={`text-lg font-bold ${
              waterQuality.trends?.dissolvedOxygen === 'improving' ? 'text-emerald-400' : 
              waterQuality.trends?.dissolvedOxygen === 'declining' ? 'text-red-400' : 'text-slate-400'
            }`}>
              {waterQuality.trends?.dissolvedOxygen?.toUpperCase() || 'STABLE'}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5 text-center">
            <div className="text-xs text-slate-500 uppercase mb-2">Turbidity Trend</div>
            <div className={`text-lg font-bold ${
              waterQuality.trends?.turbidity === 'improving' ? 'text-emerald-400' : 
              waterQuality.trends?.turbidity === 'declining' ? 'text-red-400' : 'text-slate-400'
            }`}>
              {waterQuality.trends?.turbidity?.toUpperCase() || 'STABLE'}
            </div>
          </div>
        </div>
      </Card>

      <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Last Tested</h3>
            <p className="text-slate-400">
              <Calendar className="w-4 h-4 inline mr-2" />
              {new Date(waterQuality.lastTested).toLocaleDateString()}
            </p>
          </div>
          <Badge variant={getQualityBadge(waterQuality.status)} size="lg">
            Overall: {waterQuality.status.toUpperCase()}
          </Badge>
        </div>
      </Card>
    </motion.div>
  );
}

// Hydrology Tab Component
function HydrologyTab({ hydrology, type }: { hydrology: HydrologicalData; type: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <Card className="card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
        <h2 className="text-2xl font-bold text-white mb-6">Hydrological Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hydrology.flowRate && (
            <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
              <div className="flex items-center gap-3 mb-2">
                <Wind className="w-5 h-5 text-blue-400" />
                <div className="text-xs text-slate-500 uppercase">Flow Rate</div>
              </div>
              <div className="text-2xl font-bold text-white">{hydrology.flowRate} m³/s</div>
            </div>
          )}
          {hydrology.discharge && (
            <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
              <div className="flex items-center gap-3 mb-2">
                <Droplet className="w-5 h-5 text-blue-400" />
                <div className="text-xs text-slate-500 uppercase">Annual Discharge</div>
              </div>
              <div className="text-2xl font-bold text-white">{hydrology.discharge.toLocaleString()} M m³/year</div>
            </div>
          )}
          {hydrology.rechargeRate && (
            <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="w-5 h-5 text-blue-400" />
                <div className="text-xs text-slate-500 uppercase">Recharge Rate</div>
              </div>
              <div className="text-2xl font-bold text-white">{hydrology.rechargeRate} mm/year</div>
            </div>
          )}
          {hydrology.waterLevel && (
            <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
              <div className="flex items-center gap-3 mb-2">
                <Ruler className="w-5 h-5 text-blue-400" />
                <div className="text-xs text-slate-500 uppercase">Water Level</div>
              </div>
              <div className="text-2xl font-bold text-white">{hydrology.waterLevel}m</div>
            </div>
          )}
          {hydrology.drainageArea && (
            <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
              <div className="flex items-center gap-3 mb-2">
                <MapPin className="w-5 h-5 text-blue-400" />
                <div className="text-xs text-slate-500 uppercase">Drainage Area</div>
              </div>
              <div className="text-2xl font-bold text-white">{hydrology.drainageArea.toLocaleString()} km²</div>
            </div>
          )}
          <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <div className="text-xs text-slate-500 uppercase">Seasonal Variation</div>
            </div>
            <div className="text-2xl font-bold text-white capitalize">{hydrology.seasonalVariation}</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
            <div className="flex items-center gap-3 mb-2">
              <Droplet className="w-5 h-5 text-blue-400" />
              <div className="text-xs text-slate-500 uppercase">Water Source</div>
            </div>
            <div className="text-2xl font-bold text-white capitalize">{hydrology.source}</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-800/50 border border-white/5">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-blue-400" />
              <div className="text-xs text-slate-500 uppercase">Flood Risk</div>
            </div>
            <div className={`text-2xl font-bold capitalize ${
              hydrology.floodRisk === 'critical' ? 'text-red-400' :
              hydrology.floodRisk === 'high' ? 'text-orange-400' :
              hydrology.floodRisk === 'moderate' ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              {hydrology.floodRisk}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function getQualityBadge(status: string) {
  switch (status) {
    case 'excellent': return 'success';
    case 'good': return 'success';
    case 'moderate': return 'warning';
    case 'poor': return 'warning';
    case 'critical': return 'danger';
    default: return 'default';
  }
}
