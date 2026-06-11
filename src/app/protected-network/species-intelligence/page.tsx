'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Activity, MapPin, Shield, TrendingUp, ArrowRight, Search, Filter, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { getSpeciesProfiles } from '@/data/protected-network';
import { Heading } from '@/components/common/Heading';

export default function SpeciesIntelligencePage() {
  const speciesList = getSpeciesProfiles.all();

  const getStatusColor = (status: string) => {
    if (status.includes('CR')) return 'danger';
    if (status.includes('EN')) return 'danger';
    if (status.includes('VU')) return 'warning';
    if (status.includes('NT')) return 'info';
    return 'success';
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title={<><span className="block whitespace-nowrap">Kashmir Species</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Intelligence Network</span></>}
        subtitle="Species distribution, protected-area overlap, and habitat association analysis across Kashmir's conservation network. Covers mammals, birds, plants, and aquatic species with conservation status, range data, and ecological sensitivity indicators."
        icon={<Activity className="w-6 h-6 text-emerald-400" />}
        label="Species Intelligence"
        breadcrumbs={[{ label: 'Species Intelligence' }]}
        images={['/images/protected-network.png', '/images/bear.png', '/images/tiger.png', '/images/markhor.png']}
        actions={
          <>
            <Button className="bg-gradient-to-r from-purple-600 to-purple-500" icon={<Search className="w-5 h-5" />}>
              Search Species
            </Button>
            <Button variant="outline" className="border-white/20 text-white" icon={<MapPin className="w-5 h-5" />}>
              Distribution Maps
            </Button>
          </>
        }
      />

      {/* Metrics */}
      <div className="container mx-auto px-6 -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-intense border-white/10 p-4 lg:p-5" padding="none">
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-1 sm:gap-2">
              {[
                { label: 'Species Profiles', value: speciesList.length, icon: Activity },
                { label: 'Endangered', value: speciesList.filter(s => s.conservationStatus.includes('CR') || s.conservationStatus.includes('EN')).length, icon: Shield },
                { label: 'PA Habitat Records', value: speciesList.reduce((acc, s) => acc + s.protectedAreas.length, 0), icon: MapPin },
                { label: 'Conservation Focus', value: 'High', icon: TrendingUp },
                { label: 'Vulnerable', value: speciesList.filter(s => s.conservationStatus.includes('VU')).length, icon: Shield },
                { label: 'Mammal Profiles', value: speciesList.filter(s => s.group === 'Mammals').length, icon: Activity },
                { label: 'Bird Profiles', value: speciesList.filter(s => s.group === 'Birds').length, icon: MapPin },
                { label: 'PA Network', value: 47, icon: TrendingUp },
              ].map((metric, idx) => (
                <div key={idx} className="py-2 px-1 lg:py-3 lg:px-2 rounded-xl text-center min-w-0">
                  <metric.icon className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                  <div className="text-base sm:text-lg lg:text-base xl:text-lg font-bold text-white tabular-nums leading-tight truncate">
                    {metric.value}
                  </div>
                  <div className="text-[9px] sm:text-[10px] lg:text-[9px] xl:text-[10px] text-slate-500 uppercase tracking-wide mt-0.5 leading-tight break-words">
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
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
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

                <div className="mt-4 flex justify-end">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition-colors text-sm font-medium text-white">
                    View Species Details
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Card>
            </motion.a>
          ))}
        </div>
      </div>

      
    </main>
  );
}

