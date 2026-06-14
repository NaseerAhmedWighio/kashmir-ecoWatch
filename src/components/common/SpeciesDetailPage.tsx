'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Activity, ArrowRight, ChevronRight, MapPin, Shield,
  Calendar, Leaf, AlertTriangle, CheckCircle, Eye,
  FileText, Book, TrendingUp, Bird, Layers, Map, Download
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { SpeciesProfile, getProtectedAreas } from '@/data/protected-network';
import { BackgroundCarousel } from '@/components/ui/BackgroundCarousel';

interface SpeciesDetailPageProps {
  species: SpeciesProfile;
  relatedSpecies?: SpeciesProfile[];
}

export function SpeciesDetailPage({ species, relatedSpecies = [] }: SpeciesDetailPageProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState<
    'overview' | 'taxonomy' | 'distribution' | 'protected-areas' | 'habitats' | 'threats' | 'monitoring' | 'research' | 'spatial-data' | 'conservation-priority'
  >('overview');

  const handleDownload = (e: React.MouseEvent, layerName: string, fileName: string) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const isRegistered = window.localStorage.getItem('kew_member_registered') === 'true';
      if (isRegistered) {
        alert(`Initiating secure academic download for spatial dataset "${layerName}" (${fileName})...`);
      } else {
        router.push(`/protected-network/trails-and-sightings/request?slug=${species.slug}`);
      }
    }
  };

  const getStatusColor = (status: string) => {
    if (status.includes('CR')) return 'from-red-600 to-red-700';
    if (status.includes('EN')) return 'from-orange-500 to-red-600';
    if (status.includes('VU')) return 'from-amber-500 to-orange-600';
    if (status.includes('NT')) return 'from-blue-500 to-cyan-600';
    return 'from-emerald-500 to- emerald-700';
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
    { id: 'taxonomy', label: 'Taxonomy', icon: Bird },
    { id: 'distribution', label: 'Distribution', icon: Map },
    { id: 'protected-areas', label: 'Protected Area Overlap', icon: MapPin },
    { id: 'habitats', label: 'Habitats', icon: Leaf },
    { id: 'threats', label: 'Threats', icon: AlertTriangle },
    { id: 'monitoring', label: 'Monitoring', icon: Eye },
    { id: 'research', label: 'Research', icon: FileText },
    { id: 'spatial-data', label: 'Spatial Data', icon: Layers },
    { id: 'conservation-priority', label: 'Conservation Priority', icon: Shield },
  ];

  // Resolve relationships with Protected Area Network
  const mappedPAs = species.protectedAreas.map(slug => {
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
      scope: 'Kashmir Network',
      categoryLabel: 'Protected Area',
      href: '#'
    };
  });

  // Resolve associated wetlands
  const mappedWetlands = (species.associatedWetlands || []).map(slug => {
    const area = getProtectedAreas.wetlandReserves().find(wa => wa.slug === slug || wa.id === slug) || getProtectedAreas.bySlug(slug);
    if (area) {
      return {
        slug: area.slug,
        name: area.name,
        scope: area.scope,
        categoryLabel: 'Wetland Reserve',
        href: `/protected-network/wetland-reserves/${area.slug}`
      };
    }
    return {
      slug,
      name: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      scope: 'Kashmir Network',
      categoryLabel: 'Wetland Reserve',
      href: `/protected-network/wetland-reserves/${slug}`
    };
  });

  // Resolve associated bird habitats
  const mappedBirdHabitats = (species.associatedBirdHabitats || []).map(slug => {
    const area = getProtectedAreas.birdHabitatAreas().find(iba => iba.slug === slug || iba.id === slug) || getProtectedAreas.bySlug(slug);
    if (area) {
      return {
        slug: area.slug,
        name: area.name,
        scope: area.scope,
        categoryLabel: 'Bird & Habitat Area',
        href: `/protected-network/bird-and-habitat-areas/${area.slug}`
      };
    }
    return {
      slug,
      name: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      scope: 'Kashmir Network',
      categoryLabel: 'Bird & Habitat Area',
      href: `/protected-network/bird-and-habitat-areas/${slug}`
    };
  });

  // Resolve associated corridors
  const mappedCorridors = (species.associatedCorridors || []).map(slug => {
    return {
      slug,
      name: slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      scope: 'Connectivity Corridor',
      categoryLabel: 'Wildlife Corridor',
      href: `/protected-network/corridors-and-connectivity`
    };
  });

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
              <button onClick={() => router.push('/protected-network/species-intelligence')} className="hover:text-white transition-colors">
                Species Intelligence
              </button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">{species.name}</span>
            </nav>

            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getStatusColor(species.conservationStatus)} text-white flex items-center justify-center shadow-lg`}>
                    <Bird className="w-6 h-6" />
                  </div>
                  <Badge variant={getStatusBadge(species.conservationStatus)} size="lg">
                    {species.conservationStatus}
                  </Badge>
                  {(species.isEndemic || species.endemicStatus) && (
                    <Badge variant="success" size="lg">
                      {species.endemicStatus || 'Endemic to Kashmir'}
                    </Badge>
                  )}
                </div>
                <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight tracking-tight">
                  {species.name}
                </h1>
                <p className="text-sm md:text-base lg:text-lg text-slate-300 max-w-3xl mb-6 leading-relaxed">
                  {species.description}
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    className={`bg-gradient-to-r ${getStatusColor(species.conservationStatus)}`}
                    icon={<Eye className="w-5 h-5" />}
                    onClick={() => setActiveTab('monitoring')}
                  >
                    View Monitoring
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/5"
                    icon={<FileText className="w-5 h-5" />}
                    onClick={() => setActiveTab('research')}
                  >
                    Research & Studies
                  </Button>
                </div>
              </div>

              {/* Quick Stats sidebar */}
              <Card className="card-intelligence border border-white/10 bg-transparent backdrop-blur-sm shadow-xl p-6 w-full lg:max-w-xs shrink-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-emerald-500" />
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider">PA Overlap</div>
                      <div className="text-lg font-bold text-white">
                        {(species.protectedAreas.length + (species.associatedWetlands?.length || 0) + (species.associatedBirdHabitats?.length || 0))} Sites
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-emerald-500" />
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider">Threat Signals</div>
                      <div className="text-lg font-bold text-white">{species.threats.length} Active</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-emerald-500" />
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-wider">Sensitivity</div>
                      <div className="text-lg font-bold text-white">{species.ecologicalSensitivity || 'N/A'}</div>
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
                { label: 'Group / Category', value: species.group || 'Species', icon: Bird },
                { label: 'Protected Areas', value: `${species.protectedAreas.length} Overlaps`, icon: MapPin },
                { label: 'Ecological Sensitivity', value: species.ecologicalSensitivity || 'N/A', icon: Activity },
                { label: 'Monitoring Status', value: species.monitoringStatus || 'Active', icon: Eye },
                { label: 'Research Coverage', value: species.researchCoverage || 'High', icon: Book },
                { label: 'Population Trend', value: species.populationTrend || 'Stable', icon: TrendingUp },
              ].map((metric, idx) => (
                <div key={idx} className="text-center p-4 border-r border-white/5 last:border-r-0 lg:even:border-r">
                  <metric.icon className="w-5 h-5 text-emerald-500 mx-auto mb-2" />
                  <div className="text-lg font-bold text-white truncate">
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
                    ? `bg- emerald-700 text-white shadow-lg shadow-emerald-900/30`
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
                    <h2 className="text-2xl font-bold text-white mb-4">Identity & Profile</h2>
                    <p className="text-slate-400 leading-relaxed mb-6">{species.description}</p>
                    
                    {species.localNames && species.localNames.length > 0 && (
                      <div className="mb-6 p-4 rounded-xl bg-slate-800/40 border border-white/10">
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-2">Local & Regional Names</div>
                        <div className="flex flex-wrap gap-2">
                          {species.localNames.map((name, idx) => (
                            <Badge key={idx} variant="default" className="bg-slate-900 border border-white/10 text-slate-300">
                              {name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/[0.06]">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Scientific Name</div>
                        <div className="text-white font-medium italic text-lg">{species.scientificName}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Conservation Status</div>
                        <div className="text-white font-medium text-lg">{species.conservationStatus}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Taxonomic Group</div>
                        <div className="text-white font-medium text-lg">{species.group || 'N/A'}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Biogeographical Status</div>
                        <div className="text-white font-medium text-lg">{species.endemicStatus || (species.isEndemic ? 'Endemic to Kashmir' : 'Native')}</div>
                      </div>
                    </div>
                  </Card>

                  <Card className="card-intelligence border border-white/10 bg-slate-900/50" padding="lg">
                    <h2 className="text-2xl font-bold text-white mb-4">Seasonality & Life Cycle</h2>
                    <p className="text-slate-400 leading-relaxed mb-4">{species.seasonality}</p>
                    <div className="p-4 rounded-xl bg-slate-800/40 border border-white/10 flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span className="text-sm text-slate-400">Behavioral and movement cycles are monitored relative to seasonality across conservation zones.</span>
                    </div>
                  </Card>
                </div>

                {/* Sidebar Intelligence */}
                <div className="space-y-6">
                  <Card className="card-intelligence border border-white/10 bg-slate-900/50" padding="lg">
                    <h3 className="text-lg font-bold text-white mb-4">Key Intelligence Indicators</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-slate-500 uppercase tracking-wider">Ecological Sensitivity</span>
                          <span className="text-white font-bold">{species.ecologicalSensitivity || 'N/A'}</span>
                        </div>
                        <div className="w-full bg-slate-850 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-emerald-500 h-1.5 rounded-full"
                            style={{ width: `${parseInt(species.ecologicalSensitivity || '70')}%` }}
                          />
                        </div>
                      </div>

                      <div className="pt-3 border-t border-white/[0.06] flex justify-between items-center">
                        <span className="text-xs text-slate-500 uppercase tracking-wider">Monitoring</span>
                        <Badge variant={species.monitoringStatus === 'Active' ? 'success' : 'default'} size="sm">
                          {species.monitoringStatus || 'Passive'}
                        </Badge>
                      </div>

                      <div className="pt-3 border-t border-white/[0.06] flex justify-between items-center">
                        <span className="text-xs text-slate-500 uppercase tracking-wider">Research Coverage</span>
                        <span className="text-sm text-white font-semibold">{species.researchCoverage || 'Medium'}</span>
                      </div>

                      <div className="pt-3 border-t border-white/[0.06] flex justify-between items-center">
                        <span className="text-xs text-slate-500 uppercase tracking-wider">Population Trend</span>
                        <span className={`text-sm font-semibold flex items-center gap-1 ${
                          species.populationTrend === 'Increasing' ? 'text-emerald-400' :
                          species.populationTrend === 'Decreasing' ? 'text-red-400' : 'text-slate-300'
                        }`}>
                          <TrendingUp className="w-3.5 h-3.5" />
                          {species.populationTrend || 'Stable'}
                        </span>
                      </div>

                      <div className="pt-3 border-t border-white/[0.06] flex justify-between items-center">
                        <span className="text-xs text-slate-500 uppercase tracking-wider">Data Quality Rating</span>
                        <Badge variant={species.dataQuality === 'Verified' ? 'success' : 'warning'} size="sm">
                          {species.dataQuality || 'Verified'}
                        </Badge>
                      </div>
                    </div>
                  </Card>

                  <Card className="card-intelligence border border-white/10 bg-slate-900/50" padding="lg">
                    <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                    <div className="space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-white/20 text-white justify-start hover:bg-white/5"
                        icon={<Eye className="w-4 h-4" />}
                        onClick={() => setActiveTab('monitoring')}
                      >
                        Active Cameras & Collars
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full border-white/20 text-white justify-start hover:bg-white/5"
                        icon={<Layers className="w-4 h-4" />}
                        onClick={() => setActiveTab('spatial-data')}
                      >
                        Download GIS Layers
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'taxonomy' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="card-intelligence border border-white/10 bg-slate-900/50" padding="lg">
                <h2 className="text-2xl font-bold text-white mb-6">Scientific Taxonomy & Classification</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {[
                    { level: 'Class', value: species.class, desc: 'Major taxonomic rank containing organisms sharing a common structural and developmental plan.' },
                    { level: 'Order', value: species.order, desc: 'Rank below class and above family, grouping related families.' },
                    { level: 'Family', value: species.family, desc: 'Rank below order, grouping one or more genera.' },
                    { level: 'Genus', value: species.genus, desc: 'Rank used in biological classification of living and fossil organisms.' },
                    { level: 'Species', value: species.species, desc: 'The basic unit of classification and taxonomic rank.' },
                  ].map((tax, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-white/10 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] text-emerald-500 uppercase tracking-widest font-black mb-1">{tax.level}</div>
                        <div className="text-xl font-bold text-white tracking-tight">{tax.value || 'N/A'}</div>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-4 leading-normal">{tax.desc}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-6 rounded-xl bg-slate-900 border border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Scientific Binomial Name</div>
                    <div className="text-2xl font-bold text-emerald-450 italic font-mono">{species.scientificName}</div>
                  </div>
                  <div className="sm:text-right">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Taxonomic Group</div>
                    <div className="text-lg font-bold text-white">{species.group || 'N/A'}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'distribution' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="card-intelligence border border-white/10 bg-slate-900/50" padding="lg">
                <h2 className="text-2xl font-bold text-white mb-6">GIS Distribution & Habitat Range</h2>
                <p className="text-slate-400 leading-relaxed mb-6">{species.distribution}</p>

                <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-4">Geographic Presence</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
                  {[
                    { label: 'Kashmir Core', present: species.kashmirCorePresence },
                    { label: 'Jammu', present: species.jammuPresence },
                    { label: 'Ladakh', present: species.ladakhPresence },
                    { label: 'AJK', present: species.ajkPresence },
                    { label: 'Gilgit-Baltistan', present: species.gilgitBaltistanPresence },
                  ].map((loc, idx) => (
                    <div key={idx} className={`p-3 rounded-lg border text-center ${
                      loc.present 
                        ? 'bg-emerald-950/20 border-emerald-500/30 text-white font-medium' 
                        : 'bg-slate-900/50 border-white/5 text-slate-600'
                    }`}>
                      <div className="text-xs">{loc.label}</div>
                      <div className="text-[10px] mt-1 uppercase tracking-wider font-bold">
                        {loc.present ? '✓ Present' : '✗ Absent'}
                      </div>
                    </div>
                  ))}
                </div>

                {species.scopePresence && species.scopePresence.length > 0 && (
                  <div className="mb-6 flex flex-wrap gap-2 items-center">
                    <span className="text-xs text-slate-500 uppercase tracking-wider">Ecological Scope presence:</span>
                    {species.scopePresence.map((scope, idx) => (
                      <Badge key={idx} variant="info" size="sm">
                        {scope}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Distribution GIS Map Placeholder */}
                <div className="relative h-96 rounded-xl bg-slate-900 border border-white/15 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-grid opacity-10" />
                  <div className="absolute top-4 left-4 z-10 glass-intense border border-white/10 p-3 rounded-lg text-xs space-y-1">
                    <div className="font-bold text-white">GIS Distribution Model</div>
                    <div className="text-slate-400">Grid Resolution: 30m</div>
                    <div className="text-slate-400">Projection: WGS 84 / UTM 43N</div>
                  </div>
                  <div className="text-center p-6 relative z-10">
                    <Map className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                    <p className="text-white font-bold text-lg">Interactive Distribution Overlay</p>
                    <p className="text-slate-400 text-sm max-w-md mx-auto mt-2">
                      Range bounds mapped based on sightings, telemetry coordinates, and camera traps across protected landscapes.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'habitats' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="card-intelligence border border-white/10 bg-slate-900/50" padding="lg">
                <h2 className="text-2xl font-bold text-white mb-6">Habitat Association & Ecology</h2>
                <p className="text-slate-400 leading-relaxed mb-6">{species.ecology}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Leaf className="w-5 h-5 text-emerald-400" />
                      <h3 className="font-semibold text-white">Ecological Niche</h3>
                    </div>
                    <p className="text-sm text-slate-300">
                      Functions as an indicator species reflecting ecosystem health and landscape continuity in the region.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="w-5 h-5 text-emerald-400" />
                      <h3 className="font-semibold text-white">Habitat Types Utilized</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {species.habitatTypes?.map((habitat, idx) => (
                        <Badge key={idx} variant="default" size="sm">
                          {habitat}
                        </Badge>
                      )) || <span className="text-sm text-slate-500">Temperate forest zones</span>}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'protected-areas' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="card-intelligence border border-white/10 bg-slate-900/50" padding="lg">
                <h2 className="text-2xl font-bold text-white mb-4">Protected Area Network Overlap</h2>
                <p className="text-slate-400 leading-relaxed mb-6">
                  The species has verified occurrences and records inside the following protected area units. Click any sanctuary or park to open its full profile and ecological atlas.
                </p>

                {mappedPAs.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-4">Core Protected Areas (National Parks & Sanctuaries)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {mappedPAs.map((pa, idx) => (
                        <motion.a
                          key={idx}
                          href={pa.href}
                          className="block p-4 rounded-xl bg-slate-900/80 border border-white/10 hover:border-emerald-500/30 hover:bg-slate-900 transition-all duration-300 group"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-emerald-950/30 flex items-center justify-center shrink-0 border border-white/10">
                              <MapPin className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                              <h4 className="text-white font-bold group-hover:text-emerald-300 transition-colors text-sm">
                                {pa.name}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] text-slate-500 uppercase tracking-wider">{pa.categoryLabel}</span>
                                <span className="text-slate-600">•</span>
                                <span className="text-[10px] text-slate-400">{pa.scope}</span>
                              </div>
                            </div>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                )}

                {mappedWetlands.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-4">Wetland Reserves & Waterbodies</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {mappedWetlands.map((pa, idx) => (
                        <motion.a
                          key={idx}
                          href={pa.href}
                          className="block p-4 rounded-xl bg-slate-900/80 border border-white/10 hover:border-emerald-500/30 hover:bg-slate-900 transition-all duration-300 group"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-emerald-950/30 flex items-center justify-center shrink-0 border border-white/10">
                              <MapPin className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                              <h4 className="text-white font-bold group-hover:text-emerald-300 transition-colors text-sm">
                                {pa.name}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] text-slate-500 uppercase tracking-wider">{pa.categoryLabel}</span>
                                <span className="text-slate-600">•</span>
                                <span className="text-[10px] text-slate-400">{pa.scope}</span>
                              </div>
                            </div>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                )}

                {mappedBirdHabitats.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-4">Important Bird & Habitat Areas (IBAs)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {mappedBirdHabitats.map((pa, idx) => (
                        <motion.a
                          key={idx}
                          href={pa.href}
                          className="block p-4 rounded-xl bg-slate-900/80 border border-white/10 hover:border-emerald-500/30 hover:bg-slate-900 transition-all duration-300 group"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-emerald-950/30 flex items-center justify-center shrink-0 border border-white/10">
                              <MapPin className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                              <h4 className="text-white font-bold group-hover:text-emerald-300 transition-colors text-sm">
                                {pa.name}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] text-slate-500 uppercase tracking-wider">{pa.categoryLabel}</span>
                                <span className="text-slate-600">•</span>
                                <span className="text-[10px] text-slate-400">{pa.scope}</span>
                              </div>
                            </div>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                )}

                {mappedCorridors.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-4">Wildlife Corridors & Movement Systems</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {mappedCorridors.map((pa, idx) => (
                        <motion.a
                          key={idx}
                          href={pa.href}
                          className="block p-4 rounded-xl bg-slate-900/80 border border-white/10 hover:border-emerald-500/30 hover:bg-slate-900 transition-all duration-300 group"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-emerald-950/30 flex items-center justify-center shrink-0 border border-white/10">
                              <MapPin className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                              <h4 className="text-white font-bold group-hover:text-emerald-300 transition-colors text-sm">
                                {pa.name}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-[10px] text-slate-500 uppercase tracking-wider">{pa.categoryLabel}</span>
                                <span className="text-slate-600">•</span>
                                <span className="text-[10px] text-slate-400">{pa.scope}</span>
                              </div>
                            </div>
                          </div>
                        </motion.a>
                      ))}
                    </div>
                  </div>
                )}

                {mappedPAs.length === 0 && mappedWetlands.length === 0 && mappedBirdHabitats.length === 0 && mappedCorridors.length === 0 && (
                  <p className="text-slate-500 text-sm italic">No associated protected areas documented in data records.</p>
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
                <h2 className="text-2xl font-bold text-white mb-6">Ecosystem Threat Analysis</h2>
                <div className="space-y-4">
                  {species.threats.map((threat, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-red-950/10 border border-red-500/20 hover:border-red-500/35 transition-colors">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                          <h3 className="font-bold text-white mb-1">{threat}</h3>
                          <p className="text-xs text-slate-400">
                            Critical threat source. Requires monitoring and spatial buffers within the overlapping protected zone networks.
                          </p>
                        </div>
                      </div>
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
              <Card className="card-intelligence border border-white/10 bg-slate-900/50" padding="lg">
                <h2 className="text-2xl font-bold text-white mb-4">Active Monitoring & Field Surveys</h2>
                <p className="text-slate-400 leading-relaxed mb-6">
                  {species.monitoringDetail || 'Ecological monitoring involves camera traps, radio telemetry, field census, and habitat quality sampling.'}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-xl bg-slate-800/40 border border-white/10">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Monitoring Level</div>
                    <div className="flex items-center gap-2">
                      <Badge variant={species.monitoringStatus === 'Active' ? 'success' : 'default'}>
                        {species.monitoringStatus || 'Active'}
                      </Badge>
                      <span className="text-xs text-slate-400">Regular field census</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/40 border border-white/10">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-2">Primary Equipment</div>
                    <div className="text-sm font-semibold text-white">Camera Traps, Telemetry Collars, GPS Records</div>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-4">Conservation Interventions</h3>
                <div className="space-y-3">
                  {species.conservationMeasures.map((measure, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-emerald-950/10 border border-emerald-500/10">
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span className="text-sm text-slate-300">{measure}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === 'research' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="card-intelligence border border-white/10 bg-slate-900/50" padding="lg">
                <h2 className="text-2xl font-bold text-white mb-4">Scientific Publications & Assessments</h2>
                <p className="text-slate-400 leading-relaxed mb-6">
                  {species.researchDetail || 'Ongoing scientific and genetic studies focus on species range shifts, corridor connectivity, and threat mitigation models.'}
                </p>

                <div className="p-4 rounded-xl bg-slate-800/40 border border-white/10 mb-6">
                  <div className="text-xs text-slate-500 uppercase tracking-wider mb-1.5">Research Coverage Level</div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                      species.researchCoverage === 'High' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {species.researchCoverage || 'Medium'} Coverage
                    </span>
                    <span className="text-xs text-slate-400">Indexed in regional databases</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-4">Cited Bibliography & Studies</h3>
                <div className="space-y-3 mb-6">
                  {[
                    { title: `Habitat Suitability Modeling and Corridor Identification for ${species.name} in Kashmir`, journal: 'Himalayan Journal of Ecology (2024)', status: 'Published' },
                    { title: `Genetic Diversity and Population Structure Analysis of ${species.name} Across Protected Area Network`, journal: 'Conservation Genetics & Research (2022)', status: 'Published' },
                    { title: `Assessing the Impact of Climatic Shifts and Grazing Pressures on ${species.name} Forage Availability`, journal: 'Himalayan Science Review (2025)', status: 'In Review' }
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

                {(species.sourcePrimary || species.sourceSecondary || species.lastVerifiedDate) && (
                  <div className="pt-6 border-t border-white/[0.06]">
                    <h3 className="text-lg font-bold text-white mb-4">Scientific Database Metadata</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {species.sourcePrimary && (
                        <div className="p-4 rounded-xl bg-slate-900 border border-white/10">
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Primary Source</div>
                          <div className="text-white font-semibold break-words text-sm">{species.sourcePrimary}</div>
                        </div>
                      )}
                      {species.sourceSecondary && (
                        <div className="p-4 rounded-xl bg-slate-900 border border-white/10">
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Secondary Source</div>
                          <div className="text-white font-semibold break-words text-sm">{species.sourceSecondary}</div>
                        </div>
                      )}
                      {species.lastVerifiedDate && (
                        <div className="p-4 rounded-xl bg-slate-900 border border-white/10">
                          <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Last Scientific Audit</div>
                          <div className="text-white font-semibold text-sm">{species.lastVerifiedDate}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
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
                <h2 className="text-2xl font-bold text-white mb-4">Spatial Layers & GIS Downloads</h2>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Access GIS data catalog mapping species occurrences, range boundaries, and key migration vectors. Data formats are provided in ESRI shapefile and GeoJSON formats.
                </p>

                <div className="space-y-4">
                  {[
                    { name: 'Range Boundary Polygon Layer', file: `${species.slug}_range_boundary.shp.zip`, size: '1.4 MB', type: 'Vector / Polygon' },
                    { name: 'Occurrence Point Coordinates Dataset', file: `${species.slug}_occurrences.geojson`, size: '340 KB', type: 'Vector / Point' },
                    { name: 'Habitat Suitability Raster Index', file: `${species.slug}_suitability_model.tif`, size: '8.2 MB', type: 'Raster / TIFF' }
                  ].map((layer, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-slate-900/90 transition-colors">
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

          {activeTab === 'conservation-priority' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <Card className="card-intelligence border border-white/10 bg-slate-900/50" padding="lg">
                <h2 className="text-2xl font-bold text-white mb-6">Conservation Protection & Legal Status</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 xl:gap-6 mb-8">
                  <div className="p-4 rounded-xl bg-slate-900 border border-white/10">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">IUCN Red List Status</div>
                    <div className="text-xl font-bold text-white">{species.conservationStatus}</div>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Global standard for classifying species extinction risks.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-slate-900 border border-white/10">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">CITES Listing</div>
                    <div className="text-xl font-bold text-white">{species.citesStatus || 'Not Listed'}</div>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Convention on International Trade in Endangered Species of Wild Fauna and Flora.
                    </p>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-slate-900 border border-white/10">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Wildlife Protection Act (WPA)</div>
                    <div className="text-xl font-bold text-white">{species.wildlifeProtectionStatus || 'Schedule I'}</div>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Legal protective schedule assigned under local wildlife protection framework.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-white/10">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Endemic Status</div>
                    <div className="text-xl font-bold text-white">{species.endemicStatus || (species.isEndemic ? 'Endemic' : 'Native')}</div>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Species restriction or localization within specific geographic confines.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-white/10">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Migratory Status</div>
                    <div className="text-xl font-bold text-white">{species.migratoryStatus || 'Resident'}</div>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      Seasonal movement patterns and migratory behaviors.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-white/10">
                    <div className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Population Status</div>
                    <div className="text-xl font-bold text-white">{species.populationStatus || 'Monitored'}</div>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      State or health rating of the species population across the scope.
                    </p>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-4">Population Trends & Dynamics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="p-4 rounded-xl bg-slate-800/40 border border-white/10">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Current Trend</div>
                    <div className={`text-xl font-bold ${
                      species.populationTrend === 'Increasing' ? 'text-emerald-400' :
                      species.populationTrend === 'Decreasing' ? 'text-red-400' : 'text-white'
                    }`}>
                      {species.populationTrend || 'Stable'}
                    </div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-800/40 border border-white/10 md:col-span-2">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Distribution Status</div>
                    <div className="text-white font-medium">Verified Range Occurrence</div>
                  </div>
                </div>

                <p className="text-slate-400 leading-relaxed mb-6">
                  {species.populationDetail || 'Detailed census and monitoring estimates are tracked annually to evaluate density, habitat capacity, and seasonal movement.'}
                </p>

                {/* Population Trend Chart Mock */}
                <div className="h-48 rounded-xl bg-slate-900/60 border border-white/10 flex items-end p-4 justify-between gap-2 overflow-hidden relative">
                  <div className="absolute top-4 left-4 z-10">
                    <div className="text-xs text-slate-500 uppercase tracking-wider">Historical Population Index</div>
                  </div>
                  {[35, 42, 38, 45, 52, 49, 58, 62, 60, 65, 72, 70].map((height, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-emerald-500/20 hover:bg-emerald-500/40 transition-colors rounded-t"
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-[9px] text-slate-500 mt-1">{2015 + idx}</span>
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
          <Card className={`bg-gradient-to-r ${getStatusColor(species.conservationStatus)} border-0 p-8`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">Explore Related Species Profiles</h3>
                <p className="text-white/80">View species data across similar ecological niches and taxonomic categories.</p>
              </div>
              <Button
                size="lg"
                className="bg-white/20 text-white border-0 hover:bg-white/30 shrink-0"
                icon={<ArrowRight className="w-5 h-5" />}
                onClick={() => router.push('/protected-network/species-intelligence')}
              >
                Back to Directory
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

       
    </main>
  );
}
