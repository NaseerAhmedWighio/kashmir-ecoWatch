'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Activity, MapPin, Shield, TrendingUp, ArrowRight, Search, Filter, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { getSpeciesProfiles } from '@/data/protected-network';

export default function SpeciesIntelligencePage() {
  const router = useRouter();
  const speciesList = getSpeciesProfiles.all();

  const getStatusColor = (status: string) => {
    if (status.includes('CR')) return 'danger';
    if (status.includes('EN')) return 'danger';
    if (status.includes('VU')) return 'warning';
    if (status.includes('NT')) return 'info';
    return 'success';
  };

  return (
    <main className="min-h-screen bg-slate-950">{/* Header */}
      <div className="pt-48 pb-12 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <button onClick={() => router.push('/protected-network')} className="hover:text-white transition-colors">
              Protected Network
            </button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white font-medium">Species Intelligence</span>
          </nav>

          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-6 h-6 text-purple-400" />
            <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">
              Ecological Intelligence
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
            Species Intelligence
          </h1>
          <p className="text-xl text-slate-400 mb-8">
            Protected area overlap analysis, species distribution, and habitat associations across Kashmir's conservation network
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-gradient-to-r from-purple-600 to-purple-500" icon={<Search className="w-5 h-5" />}>
              Search Species
            </Button>
            <Button variant="outline" className="border-white/20 text-white" icon={<MapPin className="w-5 h-5" />}>
              Distribution Maps
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Metrics */}
      <div className="container mx-auto px-6 -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-intense border-white/10 p-6" padding="none">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
              {[
                { label: 'Species Profiles', value: speciesList.length, icon: Activity },
                { label: 'Endangered', value: speciesList.filter(s => s.conservationStatus.includes('CR') || s.conservationStatus.includes('EN')).length, icon: Shield },
                { label: 'PA Habitat Records', value: speciesList.reduce((acc, s) => acc + s.protectedAreas.length, 0), icon: MapPin },
                { label: 'Conservation Focus', value: 'High', icon: TrendingUp },
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

      {/* Content */}
      <div className="container mx-auto px-6 py-12 space-y-8">
        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-white/20 text-white" icon={<Filter className="w-4 h-4" />}>
              Filters
            </Button>
            <span className="text-sm text-slate-400">
              <strong className="text-white">{speciesList.length}</strong> species profiles
            </span>
          </div>
        </motion.div>

        {/* Species Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {speciesList.map((species, index) => (
            <motion.a
              key={species.id}
              href={`/protected-network/species-intelligence/${species.slug}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="block group"
            >
              <Card className="h-full card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={getStatusColor(species.conservationStatus)} size="sm">
                        {species.conservationStatus.split(' ')[0]}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                      {species.name}
                    </h3>
                    <p className="text-sm text-slate-400 italic">{species.scientificName}</p>
                  </div>
                </div>

                {/* Protected Area Overlap */}
                <div className="mb-4">
                  <div className="text-xs text-slate-500 uppercase mb-2">Protected Area Overlap</div>
                  <div className="flex flex-wrap gap-2">
                    {species.protectedAreas.slice(0, 3).map((pa, idx) => (
                      <Badge key={idx} variant="default" size="sm">
                        {pa.replace(/-/g, ' ')}
                      </Badge>
                    ))}
                    {species.protectedAreas.length > 3 && (
                      <Badge variant="default" size="sm">
                        +{species.protectedAreas.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Threats & Conservation */}
                <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                  <div className="flex items-center gap-1">
                    <AlertTriangle className="w-4 h-4" />
                    <span>{species.threats.length} threats</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    <span>{species.conservationMeasures.length} measures</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-purple-400 group-hover:text-purple-300 transition-colors">
                  <span>View Species Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </motion.a>
          ))}
        </div>
      </div>

      <AdvancedFooter />
    </main>
  );
}

// Import AlertTriangle
import { AlertTriangle } from 'lucide-react';
