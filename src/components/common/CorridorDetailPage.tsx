'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  MapPin, Activity, ArrowRight, ChevronRight, TrendingUp,
  AlertTriangle, Book, FileText, Eye, Calendar, Mountain,
  Droplet, Leaf, Shield, Ruler, Target, CheckCircle, Layers,
  Map, AlertOctagon, Ban, Download, ExternalLink, HelpCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Corridor, getFragmentationRecords, getProtectedAreas } from '@/data/protected-network';
import { BackgroundCarousel } from '@/components/ui/BackgroundCarousel';

interface CorridorDetailPageProps {
  corridor: Corridor;
  relatedCorridors?: Corridor[];
}

export function CorridorDetailPage({ corridor, relatedCorridors = [] }: CorridorDetailPageProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<string>('overview');

  const handleDownload = (e: React.MouseEvent, layerName: string, fileName: string) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const isRegistered = window.localStorage.getItem('kew_member_registered') === 'true';
      if (isRegistered) {
        alert(`Initiating secure academic download for spatial dataset "${layerName}" (${fileName})...`);
      } else {
        router.push(`/protected-network/trails-and-sightings/request?slug=${corridor.slug}`);
      }
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'from-red-600 to-red-700';
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
    { id: 'connected-areas', label: 'Connected Areas', icon: MapPin },
    { id: 'species-movement', label: 'Species Movement', icon: Activity },
    { id: 'habitat-linkages', label: 'Habitat Linkages', icon: Layers },
    { id: 'fragmentation', label: 'Fragmentation', icon: Ban },
    { id: 'bottlenecks', label: 'Bottlenecks', icon: AlertTriangle },
    { id: 'threats', label: 'Threats', icon: AlertOctagon },
    { id: 'restoration-priority', label: 'Restoration Priority', icon: Target },
    { id: 'monitoring', label: 'Monitoring', icon: Eye },
    { id: 'spatial-data', label: 'Spatial Data', icon: Map },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  // Resolve connected protected areas links
  const mappedPAs = corridor.connectedAreas.map(slug => {
    const area = getProtectedAreas.bySlug(slug);
    if (area) {
      let routePrefix = '';
      if (area.category === 'national_park') routePrefix = 'national-parks';
      else if (area.category === 'wildlife_sanctuary') routePrefix = 'wildlife-sanctuaries';
      else if (area.category === 'wetland_reserve') routePrefix = 'wetland-reserves';
      else if (area.category === 'conservation_reserve') routePrefix = 'conservation-reserves';
      else if (area.category === 'iba') routePrefix = 'bird-and-habitat-areas';

      return {
        slug,
        name: area.name,
        scope: area.scope,
        categoryLabel: area.category.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        href: `/protected-network/${routePrefix}/${slug}`
      };
    }
    return {
      slug,
      name: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      scope: 'Kashmir PAN',
      categoryLabel: 'Protected Landscape',
      href: '#'
    };
  });

  // Resolve fragmentation records affecting this corridor
  const activeFragmentationHotspots = getFragmentationRecords.all().filter(record =>
    record.affectedCorridors.includes(corridor.slug) || record.affectedCorridors.includes(corridor.id)
  );

  const indicators = [
    { label: 'Connectivity Integrity', value: corridor.connectivityIntegrity || 75, color: 'bg-emerald-500' },
    { label: 'Fragmentation Risk', value: corridor.fragmentationRisk || 40, color: 'bg-red-500' },
    { label: 'Restoration Priority', value: corridor.restorationPriorityScore || 65, color: 'bg-orange-500' },
    { label: 'Species Importance', value: corridor.speciesImportance || 80, color: 'bg-blue-500' },
    { label: 'Climate Resilience', value: corridor.climateResilience || 70, color: 'bg-teal-500' },
    { label: 'Monitoring Coverage', value: corridor.monitoringCoverage || 50, color: 'bg-purple-500' },
  ];

  const heroImages = ['/images/protected-network.png', '/images/bear.png', '/images/tiger.png', '/images/markhor.png'];

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero */}
      <div className="relative bg-[#160C27] pt-20 sm:pt-24 md:pt-28 lg:pt-48 pb-10 sm:pb-12 md:pb-20 overflow-hidden">
        <BackgroundCarousel images={heroImages} overlayClassName="from-[#160C27]/40 via-transparent to-[#160C27]/60" />
        <div className="absolute inset-0 bg-grid opacity-10" />

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

            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getPriorityColor(corridor.priority)} text-white flex items-center justify-center shadow-lg`}>
                    <MapPin className="w-6 h-6" />
                  </div>
                  <Badge variant={getStatusColor(corridor.status)} size="lg">
                    Status: {corridor.status}
                  </Badge>
                  <Badge variant={corridor.priority === 'Critical' ? 'danger' : corridor.priority === 'High' ? 'warning' : 'info'} size="lg">
                    {corridor.priority} Priority Link
                  </Badge>
                </div>
                <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight tracking-tight">
                  {corridor.name}
                </h1>
                <p className="text-sm md:text-base lg:text-lg text-slate-300 max-w-3xl mb-6 leading-relaxed">
                  {corridor.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 shadow-md shadow-emerald-500/20"
                    icon={<Layers className="w-5 h-5" />}
                    onClick={() => setActiveTab('habitat-linkages')}
                  >
                    Habitat Linkages
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/5"
                    icon={<Map className="w-5 h-5" />}
                    onClick={() => setActiveTab('spatial-data')}
                  >
                    Spatial GIS Layers
                  </Button>
                </div>
              </div>

              {/* Quick Score Circle */}
              <Card className="card-intelligence border border-white/10 bg-transparent backdrop-blur-sm shadow-xl p-6 w-full lg:max-w-xs shrink-0 flex flex-col items-center justify-center text-center">
                <div className="relative w-28 h-28 flex items-center justify-center mb-3">
                  {/* Outer circle */}
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="56" cy="56" r="48" stroke="rgba(255,255,255,0.05)" strokeWidth="8" fill="transparent" />
                    <circle
                      cx="56"
                      cy="56"
                      r="48"
                      stroke="#10b981"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray="301.6"
                      strokeDashoffset={301.6 - (301.6 * (corridor.connectivityIndex || 74)) / 100}
                    />
                  </svg>
                  <div className="absolute text-2xl font-black text-white">{corridor.connectivityIndex || 74}%</div>
                </div>
                <div className="text-sm font-bold text-white">Connectivity Index</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">Combined Network Health</div>
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
                { label: 'Corridor Type', value: corridor.type, icon: Target },
                { label: 'Length Corridor', value: corridor.length, icon: Map },
                { label: 'Scope Region', value: corridor.scope || 'Kashmir Core', icon: Mountain },
                { label: 'PAs Connected', value: `${corridor.connectedAreas.length} Sites`, icon: MapPin },
                { label: 'Supported Species', value: `${corridor.keySpecies.length} Species`, icon: Activity },
                { label: 'Active Barriers', value: `${activeFragmentationHotspots.length} Zones`, icon: Ban },
              ].map((metric, idx) => (
                <div key={idx} className="text-center p-4 border-r border-white/5 last:border-r-0 lg:even:border-r">
                  <metric.icon className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
                  <div className="text-base font-bold text-white truncate">
                    {metric.value}
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider mt-1 leading-none">
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
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/30'
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
        <div className="min-h-[400px]">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card className="card-intelligence border border-white/10 bg-slate-900/50" padding="lg">
                    <h2 className="text-2xl font-bold text-white mb-4">Corridor Profile</h2>
                    <p className="text-slate-400 leading-relaxed mb-6">{corridor.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/[0.06]">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Corridor ID</div>
                        <div className="text-white font-medium text-base font-mono">{corridor.corridor_id || `COR-${corridor.id.toUpperCase()}`}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Corridor Type</div>
                        <div className="text-white font-medium text-base">{corridor.corridor_type || corridor.type}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Region Scope</div>
                        <div className="text-white font-medium text-base">{corridor.scope || 'Kashmir Core'}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Estimated Length</div>
                        <div className="text-white font-medium text-base">{corridor.estimated_length_km ? `${corridor.estimated_length_km} km` : corridor.length}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Width / Area Status</div>
                        <div className="text-white font-medium text-base">{corridor.area_or_width_status || 'Variable'}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Traversing Regions</div>
                        <div className="text-white font-medium text-base">{(corridor.admin_regions || corridor.districts).join(', ')}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Start Landscape</div>
                        <div className="text-white font-medium text-base">{corridor.start_landscape || 'Boundary Forest'}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">End Landscape</div>
                        <div className="text-white font-medium text-base">{corridor.end_landscape || 'Refuge Habitat'}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Data Quality</div>
                        <div className="text-white font-medium text-base">
                          <Badge variant={corridor.data_quality === 'Verified' ? 'success' : 'default'} size="sm">
                            {corridor.data_quality || 'Verified'}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Last Verified Date</div>
                        <div className="text-white font-medium text-base">{corridor.last_verified_date || '2025-11-20'}</div>
                      </div>
                    </div>
                  </Card>

                  <Card className="card-intelligence border border-white/10 bg-slate-900/50" padding="lg">
                    <h2 className="text-2xl font-bold text-white mb-4">Habitat Typology</h2>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(corridor.linked_habitats || corridor.habitat_types || corridor.habitatTypes)?.map((habitat, idx) => (
                        <Badge key={idx} variant="info" size="md">
                          {habitat}
                        </Badge>
                      )) || (
                        <span className="text-sm text-slate-500">Temperate forest and meadow corridor transition zones.</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-400">
                      The landscape contains subalpine vegetation, river buffers, or steep rocky cliffs that facilitate migration and shelter for transiting wildlife.
                    </p>
                  </Card>
                </div>

                {/* Sidebar Intelligence Scores */}
                <div className="space-y-6">
                  <Card className="card-intelligence border border-white/10 bg-slate-900/50" padding="lg">
                    <h3 className="text-lg font-bold text-white mb-4">Intelligence Scores</h3>
                    <div className="space-y-4">
                      {indicators.map((indicator, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-slate-500 uppercase tracking-wider">{indicator.label}</span>
                            <span className="text-white font-bold">{indicator.value}/100</span>
                          </div>
                          <div className="w-full bg-slate-850 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`${indicator.color} h-1.5 rounded-full`}
                              style={{ width: `${indicator.value}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'connected-areas' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="card-intelligence border border-white/10 bg-slate-900/50" padding="lg">
                <h2 className="text-2xl font-bold text-white mb-6">Connected Protected Area Network</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mappedPAs.map((pa, idx) => (
                    <motion.a
                      key={idx}
                      href={pa.href}
                      className="p-4 rounded-xl bg-slate-900 border border-white/10 hover:border-emerald-500/30 hover:bg-slate-850/80 transition-all duration-300 flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-950/20 flex items-center justify-center shrink-0 border border-white/10">
                          <MapPin className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white group-hover:text-emerald-300 transition-colors">{pa.name}</h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider">{pa.categoryLabel}</span>
                            <span className="text-slate-600">•</span>
                            <span className="text-[10px] text-slate-400">{pa.scope}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                    </motion.a>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'species-movement' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="card-intelligence border border-white/10 bg-slate-900/50" padding="lg">
                <h2 className="text-2xl font-bold text-white mb-2">Species Connectivity & Movement</h2>
                <p className="text-slate-400 leading-relaxed mb-6">
                  {corridor.connectivity_function || 'Ensures genetic exchange, winter migration, and daily foraging movements for mountain and valley wildlife.'}
                </p>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">Priority Focus Species</h3>
                  <div className="flex flex-wrap gap-2">
                    {(corridor.priority_species || corridor.keySpecies || []).map((species, idx) => (
                      <Badge key={idx} variant="danger" size="md">
                        🌟 {species.replace(/-/g, ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>

                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">Supported Species Network</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {(corridor.linked_species || corridor.keySpecies).map((speciesSlug, idx) => (
                    <motion.a
                      key={idx}
                      href={`/protected-network/species-intelligence/${speciesSlug}`}
                      className="p-4 rounded-xl bg-slate-900 border border-white/10 hover:border-emerald-500/30 hover:bg-slate-850/80 transition-all duration-300 flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-950/20 flex items-center justify-center shrink-0 border border-white/10">
                          <Activity className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white capitalize group-hover:text-emerald-300 transition-colors">
                            {speciesSlug.replace(/-/g, ' ')}
                          </h4>
                          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Priority Taxon</span>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
                    </motion.a>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'habitat-linkages' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="card-intelligence border border-white/10 bg-slate-900/50" padding="lg">
                <h2 className="text-2xl font-bold text-white mb-4">Habitat Typology & Linkages</h2>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Kashmir's terrain requires diverse stepping-stones and continuous habitat complexes to maintain genetic links between isolated mountain networks.
                </p>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-3">Linked Habitat Formations</h3>
                  <div className="flex flex-wrap gap-2">
                    {(corridor.linked_habitats || corridor.habitat_types || corridor.habitatTypes || ['Subalpine Meadow', 'Temperate Forest']).map((habitat, idx) => (
                      <Badge key={idx} variant="info" size="md">
                        {habitat}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Flow Graphic Mock */}
                <div className="relative h-64 rounded-xl bg-slate-900 border border-white/10 overflow-hidden flex items-center justify-center p-6 text-center">
                  <div className="absolute inset-0 bg-grid opacity-10" />
                  <div className="relative z-10">
                    <Layers className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                    <h4 className="text-white font-bold">Resilient Habitat Flow Index</h4>
                    <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                      Circuitscape models rate this corridor zone as a continuous landscape linkage facilitating seasonal migration and seed dispersal.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'fragmentation' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="card-intelligence border border-white/10 bg-slate-900/50" padding="lg">
                <h2 className="text-2xl font-bold text-white mb-2">Habitat Fragmentation Profile</h2>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Analysis of structural and functional fragmentation elements interrupting wildlife movement pathways across this corridor.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column: Metrics */}
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-slate-900 border border-white/10">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block mb-1">Fragmentation Risk Index</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-red-400">{corridor.fragmentationRisk || 45}%</span>
                        <span className="text-xs text-slate-500">structural resistance</span>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900 border border-white/10">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block mb-1">Connectivity Integrity Score</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-emerald-400">{corridor.connectivity_integrity_score || corridor.connectivityIntegrity || 75}/100</span>
                        <span className="text-xs text-slate-500">functional flow rating</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Barriers and Sources */}
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-slate-900 border border-white/10">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block mb-2">Primary Barrier Types</span>
                      <div className="flex flex-wrap gap-1.5">
                        {corridor.barrier_types && corridor.barrier_types.length > 0 ? (
                          corridor.barrier_types.map((barrier, idx) => (
                            <Badge key={idx} variant="danger" size="sm">{barrier}</Badge>
                          ))
                        ) : (
                          (corridor.barrierTypes || []).map((barrier, idx) => (
                            <Badge key={idx} variant="danger" size="sm">{barrier}</Badge>
                          ))
                        )}
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-900 border border-white/10">
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block mb-2">Primary Fragmentation Sources</span>
                      <div className="flex flex-wrap gap-1.5">
                        {corridor.fragmentation_sources && corridor.fragmentation_sources.length > 0 ? (
                          corridor.fragmentation_sources.map((source, idx) => (
                            <Badge key={idx} variant="warning" size="sm">{source}</Badge>
                          ))
                        ) : (
                          <span className="text-xs text-slate-400">No specific fragmentation sources registered.</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'bottlenecks' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="card-intelligence border border-white/10 bg-slate-900/50" padding="lg">
                <h2 className="text-2xl font-bold text-white mb-2">Ecological Bottlenecks</h2>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Specific, localized pressure points where high-intensity human footprints or infrastructure restrict wildlife corridors to narrow, highly vulnerable pinch-points.
                </p>

                {activeFragmentationHotspots.length > 0 ? (
                  <div className="space-y-4">
                    {activeFragmentationHotspots.map((hotspot) => (
                      <div key={hotspot.id} className="p-4 rounded-xl bg-slate-900 border border-white/10 hover:border-emerald-500/30 transition-all duration-300">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-2">
                          <div>
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mr-2">{hotspot.category}</span>
                            <Badge variant={hotspot.impactLevel === 'Critical' ? 'danger' : 'warning'} size="sm">
                              {hotspot.impactLevel} Impact
                            </Badge>
                            <h4 className="text-lg font-bold text-white mt-1">{hotspot.name}</h4>
                          </div>
                          <span className="text-xs text-slate-400 bg-slate-850 px-2 py-1 rounded border border-white/10 self-start">📍 {hotspot.location}</span>
                        </div>
                        <p className="text-sm text-slate-300 mb-3">{hotspot.description}</p>
                        <div className="pt-2 border-t border-white/[0.06]">
                          <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block mb-1">Mitigation Measures</span>
                          <div className="flex flex-wrap gap-1.5">
                            {hotspot.mitigationMeasures.map((measure, mIdx) => (
                              <span key={mIdx} className="text-xs bg-slate-800 border border-white/10 text-slate-300 px-2 py-0.5 rounded">
                                {measure}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border border-dashed border-white/10 rounded-xl bg-slate-900/20">
                    <CheckCircle className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                    <h4 className="text-white font-bold">No Mapped Bottlenecks</h4>
                    <p className="text-slate-400 text-xs mt-1">This corridor maintains continuous landscape linkages with no active physical bottlenecks.</p>
                  </div>
                )}
              </Card>
            </motion.div>
          )}

          {activeTab === 'threats' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="card-intelligence border border-white/10 bg-slate-900/50" padding="lg">
                <h2 className="text-2xl font-bold text-white mb-2">Threat Signals & Risks</h2>
                <p className="text-slate-400 leading-relaxed mb-6">
                  General threat assessment indicates the following active pressure points along the corridor boundaries.
                </p>
                <div className="space-y-4">
                  {corridor.threats.map((threat, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-red-950/10 border border-red-500/20">
                      <div className="flex items-start gap-3">
                        <AlertOctagon className="w-5 h-5 text-red-550 mt-0.5 shrink-0" />
                        <div>
                          <h4 className="font-bold text-white mb-1">{threat}</h4>
                          <p className="text-xs text-slate-400">
                            Active ecological risk interrupting connectivity flow rates.
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'restoration-priority' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="card-intelligence border border-white/10 bg-slate-900/50" padding="lg">
                <h2 className="text-2xl font-bold text-white mb-4">Corridor Restoration Priorities</h2>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Restoring broken linkages requires purchasing land buffers, creating agricultural corridors, implementing grazing rotations, and constructing wildlife overpasses/underpasses.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-emerald-950/10 border border-emerald-500/10">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Restoration Priority</div>
                    <div className="text-lg font-bold text-white">{corridor.restorationPriority || 'High'}</div>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-950/10 border border-emerald-500/10">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Restoration Priority Score</div>
                    <div className="text-lg font-bold text-white">{corridor.restoration_priority_score || corridor.restorationPriorityScore || 65}/100</div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-4">Key Restoration Interventions</h3>
                <div className="space-y-3">
                  {corridor.conservationMeasures.map((measure, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-slate-900 border border-white/10">
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span className="text-sm text-slate-300">{measure}</span>
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
              <Card className="card-intelligence border border-white/10 bg-slate-900/50" padding="lg">
                <h2 className="text-2xl font-bold text-white mb-4">Assessments & Scientific Publications</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-slate-900 border border-white/10">
                    <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Primary Source Authority</span>
                    <span className="text-sm font-semibold text-white">{corridor.source_primary || 'J&K Department of Wildlife Protection'}</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-white/10">
                    <span className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Literature Citation</span>
                    <span className="text-sm font-semibold text-white">{corridor.source_literature || 'WII Wildlife Corridor Reports (2024)'}</span>
                  </div>
                </div>

                <p className="text-slate-400 leading-relaxed mb-6">
                  Ongoing studies focus on corridor viability, landscape genetics, and structural vs. functional connectivity indices inside the Kashmir Protected Area Network.
                </p>

                <div className="space-y-3">
                  {[
                    { title: `Structural and Functional Connectivity Modeling for ${corridor.name}`, journal: corridor.source_literature || 'Journal of Landscape Ecology (2024)', status: 'Indexed' },
                    { title: 'Mitigating Infrastructure Barriers: Design Standards for Wildlife Crossings in Kashmir', journal: 'UT Forest Department Tech Report (2023)', status: 'Approved' }
                  ].map((study, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-slate-900 border border-white/10 flex items-start justify-between gap-4">
                      <div>
                        <h4 className="text-sm font-semibold text-white">{study.title}</h4>
                        <p className="text-xs text-slate-500 mt-1">{study.journal}</p>
                      </div>
                      <Badge variant="default" size="sm" className="shrink-0">{study.status}</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'spatial-data' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="card-intelligence border border-white/10 bg-slate-900/50" padding="lg">
                <h2 className="text-2xl font-bold text-white mb-4">GIS Spatial Layers</h2>
                <div className="p-4 rounded-xl bg-slate-900 border border-white/10 mb-6 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">GIS Layer Status</span>
                    <h4 className="text-base font-bold text-white mt-1">{corridor.gis_layer_status || 'Available'}</h4>
                  </div>
                  <Badge variant={corridor.gis_layer_status === 'Available' ? 'success' : 'default'}>GIS Layer Ready</Badge>
                </div>

                <p className="text-slate-400 leading-relaxed mb-6">
                  Download geospatial vectors mapping corridor boundaries, flow lines, and structural resistance layers.
                </p>

                <div className="space-y-4">
                  {[
                    { name: 'Corridor Centerline Vector', file: `${corridor.slug}_centerline.geojson`, size: '120 KB', type: 'Vector / Line' },
                    { name: 'Resistant Surface Raster Index', file: `${corridor.slug}_resistance_surface.tif`, size: '12.4 MB', type: 'Raster / GeoTIFF' }
                  ].map((layer, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-emerald-950/20 flex items-center justify-center shrink-0 border border-white/10">
                          <Layers className="w-5 h-5 text-emerald-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm">{layer.name}</h4>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                            <span>{layer.file}</span>
                            <span>•</span>
                            <span>{layer.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 self-end sm:self-auto">
                        <span className="text-xs text-slate-500 mr-2">{layer.size}</span>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-white/10 text-white hover:bg-white/5" 
                          icon={<Download className="w-3.5 h-3.5" />}
                          onClick={(e) => handleDownload(e, layer.name, layer.file)}
                        >
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </div>

        {/* CTA Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card className={`bg-gradient-to-r from-emerald-600 to-emerald-800 border-0 p-8`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Explore Connectivity Systems</h3>
                <p className="text-white/80">Browse other corridor routes and landscape fragmentation barriers.</p>
              </div>
              <Button
                size="lg"
                className="bg-white/20 text-white border-0 hover:bg-white/30 shrink-0"
                icon={<ArrowRight className="w-5 h-5" />}
                onClick={() => router.push('/protected-network/corridors-and-connectivity')}
              >
                Back to Directory
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      <AdvancedFooter />
    </main>
  );
}
