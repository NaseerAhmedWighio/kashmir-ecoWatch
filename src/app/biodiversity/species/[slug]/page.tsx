'use client';

import React, { useState } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { 
  ArrowLeft, MapPin, Activity, Shield, TrendingUp, Calendar,
  ExternalLink, Share2, Heart, Download, Map, Eye, AlertTriangle,
  Book, FileText, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getBiodiversityData } from '@/data/biodiversity';
import { useParams, useRouter } from 'next/navigation';

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'distribution', label: 'Distribution' },
  { id: 'ecology', label: 'Ecology' },
  { id: 'seasonality', label: 'Seasonality' },
  { id: 'threats', label: 'Threats' },
  { id: 'conservation', label: 'Conservation' },
  { id: 'sightings', label: 'Sightings' },
  { id: 'reports', label: 'Reports' },
];

export default function SpeciesDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');

  const species = getBiodiversityData.all.bySlug(params.slug as string);

  if (!species) {
    return (
      <main className="min-h-screen bg-slate-950"><div className="pt-48 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Species not found</h1>
          <Button onClick={() => router.push('/biodiversity')}>Back to Biodiversity</Button>
        </div>
        <AdvancedFooter />
      </main>
    );
  }

  const getConservationStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      CR: 'bg-red-500',
      EN: 'bg-red-400',
      VU: 'bg-amber-500',
      NT: 'bg-yellow-500',
      LC: 'bg-emerald-500',
    };
    return colors[status] || 'bg-slate-500';
  };

  const getConservationStatusBadge = (status: string) => {
    const variants: Record<string, 'danger' | 'warning' | 'info' | 'success'> = {
      CR: 'danger',
      EN: 'danger',
      VU: 'warning',
      NT: 'info',
      LC: 'success',
    };
    return variants[status] || 'info';
  };

  return (
    <main className="min-h-screen bg-slate-950">{/* Hero */}
      <div className="relative pt-48 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Back button */}
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </button>

            {/* Header content */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Badge variant={getConservationStatusBadge(species.conservationStatus)} size="sm">
                    {species.conservationStatus}
                  </Badge>
                  <Badge variant="info" size="sm" className="capitalize">
                    {species.taxonomicGroup.replace('-', ' ')}
                  </Badge>
                  {species.sensitivity === 'critical' || species.sensitivity === 'high' ? (
                    <Badge variant="default" size="sm" className="bg-red-500/20 text-red-400 border border-red-500/30">
                      <Shield className="w-3 h-3 mr-1" />
                      Sensitive
                    </Badge>
                  ) : null}
                </div>

                <h1 className="text-5xl md:text-6xl font-black text-white mb-2">
                  {species.commonName}
                </h1>
                <p className="text-2xl text-slate-400 italic mb-6">
                  {species.scientificName}
                </p>

                {species.localName && (
                  <p className="text-slate-500 mb-6">
                    Local name: <span className="text-slate-300">{species.localName}</span>
                  </p>
                )}

                <p className="text-lg text-slate-300 mb-8 max-w-3xl leading-relaxed">
                  {species.description}
                </p>

                {/* Quick facts */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="p-4 rounded-xl glass-light border border-white/5">
                    <div className="text-xs text-slate-500 uppercase mb-1">Elevation</div>
                    <div className="text-white font-semibold">
                      {species.elevationRange.min}m - {species.elevationRange.max}m
                    </div>
                  </div>
                  <div className="p-4 rounded-xl glass-light border border-white/5">
                    <div className="text-xs text-slate-500 uppercase mb-1">Habitats</div>
                    <div className="text-white font-semibold">{species.habitats.length} types</div>
                  </div>
                  <div className="p-4 rounded-xl glass-light border border-white/5">
                    <div className="text-xs text-slate-500 uppercase mb-1">Districts</div>
                    <div className="text-white font-semibold">{species.districts.length} districts</div>
                  </div>
                  <div className="p-4 rounded-xl glass-light border border-white/5">
                    <div className="text-xs text-slate-500 uppercase mb-1">Sightings</div>
                    <div className="text-white font-semibold">{species.verifiedSightings || 0} verified</div>
                  </div>
                </div>

                {/* Primary CTAs */}
                <div className="flex flex-wrap gap-4">
                  <Button className="bg-gradient-to-r from-forest-600 to-forest-500" icon={<Map className="w-5 h-5" />}>
                    Open Distribution Map
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white" icon={<Eye className="w-5 h-5" />}>
                    View Sightings
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white" icon={<FileText className="w-5 h-5" />}>
                    Related Reports
                  </Button>
                </div>
              </div>

              {/* Visual panel */}
              <div className="w-full lg:w-96">
                <Card className="overflow-hidden border border-white/10" padding="none">
                  <div className="relative h-64 bg-gradient-to-br from-purple-500/20 to-slate-800/50">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Activity className="w-24 h-24 text-slate-600" />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="px-3 py-2 rounded-lg glass-intense inline-block">
                        <span className="text-xs text-slate-400">Taxonomic Group</span>
                        <div className="text-white font-semibold capitalize">{species.taxonomicGroup}</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                        <Heart className="w-4 h-4" />
                        <span>Save</span>
                      </button>
                      <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                        <Share2 className="w-4 h-4" />
                        <span>Share</span>
                      </button>
                      <button className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                        <Download className="w-4 h-4" />
                        <span>Export</span>
                      </button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 z-40 bg-slate-950/95 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                  activeTab === tab.id
                    ? 'text-forest-400 border-forest-500'
                    : 'text-slate-400 border-transparent hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Overview */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card className="glass-light border-white/5 p-8" padding="none">
                  <h2 className="text-2xl font-bold text-white mb-4">Species Overview</h2>
                  <p className="text-slate-300 leading-relaxed mb-6">{species.description}</p>
                  <p className="text-slate-300 leading-relaxed">{species.ecologicalRole}</p>
                </Card>

                {/* Habitats */}
                <Card className="glass-light border-white/5 p-8" padding="none">
                  <h3 className="text-xl font-bold text-white mb-4">Habitats</h3>
                  <div className="flex flex-wrap gap-2">
                    {species.habitats.map((habitat, idx) => (
                      <Badge key={idx} variant="default" className="px-4 py-2">
                        {habitat}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Quick Facts */}
                <Card className="glass-light border-white/5 p-6" padding="none">
                  <h3 className="text-lg font-bold text-white mb-4">Quick Facts</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Conservation Status</div>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getConservationStatusColor(species.conservationStatus)}`} />
                        <span className="text-white font-medium">{species.conservationStatus}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Elevation Range</div>
                      <div className="text-white font-medium">
                        {species.elevationRange.min}m - {species.elevationRange.max}m
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase mb-1">Sensitivity</div>
                      <div className="text-white font-medium capitalize">{species.sensitivity}</div>
                    </div>
                  </div>
                </Card>

                {/* Districts */}
                <Card className="glass-light border-white/5 p-6" padding="none">
                  <h3 className="text-lg font-bold text-white mb-4">Districts</h3>
                  <div className="space-y-2">
                    {species.districts.map((district, idx) => (
                      <button
                        key={idx}
                        onClick={() => router.push(`/districts/${district.toLowerCase()}`)}
                        className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-white/5 transition-colors text-left group"
                      >
                        <span className="text-slate-300 group-hover:text-white transition-colors">{district}</span>
                        <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-forest-400 transition-colors" />
                      </button>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </motion.div>
        )}

        {/* Distribution */}
        {activeTab === 'distribution' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="glass-light border-white/5 p-8" padding="none">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Distribution Map</h2>
                <Button variant="outline" size="sm" className="border-white/20 text-white" icon={<Map className="w-4 h-4" />}>
                  Open Full Atlas
                </Button>
              </div>
              <div className="relative h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden">
                {/* Simulated map */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Map className="w-24 h-24 text-slate-600" />
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="p-4 rounded-xl glass-intense">
                    <div className="text-sm text-slate-400 mb-2">Protected Area Overlap</div>
                    <div className="flex flex-wrap gap-2">
                      {species.protectedAreas.map((pa, idx) => (
                        <Badge key={idx} variant="default">
                          {pa.replace(/-/g, ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Ecology */}
        {activeTab === 'ecology' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="glass-light border-white/5 p-8" padding="none">
              <h2 className="text-2xl font-bold text-white mb-4">Ecological Role</h2>
              <p className="text-slate-300 leading-relaxed mb-6">{species.ecologicalRole}</p>
              
              <h3 className="text-xl font-bold text-white mb-4">Habitat Associations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {species.habitats.map((habitat, idx) => (
                  <div key={idx} className="p-4 rounded-xl glass-light border border-white/5">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-forest-400" />
                      <span className="text-white font-medium">{habitat}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Seasonality */}
        {activeTab === 'seasonality' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="glass-light border-white/5 p-8" padding="none">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-6 h-6 text-forest-400" />
                <h2 className="text-2xl font-bold text-white">Seasonality & Phenology</h2>
              </div>
              <p className="text-slate-300 leading-relaxed">{species.seasonality}</p>
            </Card>
          </motion.div>
        )}

        {/* Threats */}
        {activeTab === 'threats' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="glass-light border-white/5 p-8" padding="none">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
                <h2 className="text-2xl font-bold text-white">Threats & Pressures</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {species.threats.map((threat, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <span className="text-white font-medium">{threat}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Conservation */}
        {activeTab === 'conservation' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Card className="glass-light border-white/5 p-8" padding="none">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="w-6 h-6 text-emerald-400" />
                <h2 className="text-2xl font-bold text-white">Conservation Status</h2>
              </div>
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-4 h-4 rounded-full ${getConservationStatusColor(species.conservationStatus)}`} />
                <div>
                  <div className="text-2xl font-bold text-white">{species.conservationStatus}</div>
                  <div className="text-sm text-slate-400">IUCN Red List Category</div>
                </div>
              </div>
              
              {species.conservationMeasures && species.conservationMeasures.length > 0 && (
                <>
                  <h3 className="text-xl font-bold text-white mb-4">Conservation Measures</h3>
                  <div className="space-y-2">
                    {species.conservationMeasures.map((measure, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                        <Shield className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                        <span className="text-white">{measure}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        )}

        {/* Sightings */}
        {activeTab === 'sightings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="glass-light border-white/5 p-8" padding="none">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Eye className="w-6 h-6 text-purple-400" />
                  <h2 className="text-2xl font-bold text-white">Verified Sightings</h2>
                </div>
                <Button className="bg-gradient-to-r from-forest-600 to-forest-500" icon={<Eye className="w-4 h-4" />}>
                  View All Sightings
                </Button>
              </div>
              <div className="text-center py-12">
                <div className="text-6xl font-bold text-white mb-2">{species.verifiedSightings || 0}</div>
                <div className="text-slate-400 mb-6">verified observations recorded</div>
                <p className="text-sm text-slate-500">
                  Note: Exact locations are masked for sensitive species to prevent disturbance
                </p>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Reports */}
        {activeTab === 'reports' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="glass-light border-white/5 p-8" padding="none">
              <div className="flex items-center gap-3 mb-6">
                <Book className="w-6 h-6 text-amber-400" />
                <h2 className="text-2xl font-bold text-white">Related Reports & References</h2>
              </div>
              {species.references && species.references.length > 0 ? (
                <div className="space-y-4">
                  {species.references.map((ref, idx) => (
                    <div key={idx} className="p-4 rounded-xl glass-light border border-white/5">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-medium mb-1">Scientific Report {idx + 1}</div>
                          <div className="text-sm text-slate-400">Research Library Reference</div>
                        </div>
                        <Button variant="outline" size="sm" className="border-white/20 text-white" icon={<ExternalLink className="w-4 h-4" />}>
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400">
                  No specific reports available for this species
                </div>
              )}
            </Card>
          </motion.div>
        )}
      </div>

      <AdvancedFooter />
    </main>
  );
}
