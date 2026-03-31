'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Shield,
  Search,
  Filter,
  TrendingUp,
  AlertTriangle,
  Leaf,
  Bird,
  Turtle,
  ArrowRight,
  ChevronRight,
  BarChart3,
  Info,
  Target,
  Book
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  RedDataSpecies,
  getRedDataSpecies,
  getRedDataMetrics,
  RED_DATA_SOURCE_METADATA,
  PRIORITY_KASHMIR_SPECIES,
  RED_DATA_METRICS
} from '@/data/red-data-book-kashmir';

type TaxonFilter = 'All' | 'mammals' | 'birds' | 'reptiles-amphibians';
type StatusFilter = 'All' | 'Endangered' | 'Vulnerable' | 'Intermediate' | 'Data Deficient';

export default function ThreatenedSpeciesPage() {
  const router = useRouter();
  const [taxonFilter, setTaxonFilter] = useState<TaxonFilter>('All');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showPriorityOnly, setShowPriorityOnly] = useState(false);

  // Get filtered data
  const allData = getRedDataSpecies.all();
  
  const filteredData = allData.filter(sp => {
    const matchesTaxon = taxonFilter === 'All' || sp.taxonGroup === taxonFilter;
    const matchesStatus = statusFilter === 'All' || sp.iucn1996Status === statusFilter;
    const matchesSearch = searchTerm === '' || 
      sp.commonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sp.conservationTheme.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = !showPriorityOnly || sp.prioritySpecies;
    return matchesTaxon && matchesStatus && matchesSearch && matchesPriority;
  });

  const metrics = getRedDataMetrics();

  const getTaxonIcon = (group: string) => {
    switch (group) {
      case 'mammals': return Leaf;
      case 'birds': return Bird;
      case 'reptiles-amphibians': return Turtle;
      default: return Info;
    }
  };

  const getTaxonColor = (group: string) => {
    switch (group) {
      case 'mammals': return 'from-emerald-500 to-green-600';
      case 'birds': return 'from-sky-500 to-blue-600';
      case 'reptiles-amphibians': return 'from-amber-500 to-orange-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  const getIUCNBadgeColor = (status: string) => {
    switch (status) {
      case 'Endangered': return 'danger';
      case 'Vulnerable': return 'warning';
      case 'Intermediate': return 'info';
      case 'Data Deficient': return 'default';
      default: return 'default';
    }
  };

  const getScheduleBadgeColor = (schedule: string) => {
    switch (schedule) {
      case 'Schedule I': return 'danger';
      case 'Schedule II': return 'warning';
      case 'Schedule III': return 'info';
      default: return 'default';
    }
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero */}
      <div className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-amber-600/20 to-slate-900 opacity-50" />
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <button onClick={() => router.push('/biodiversity')} className="hover:text-white transition-colors">
                Biodiversity
              </button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">Threatened Species</span>
            </nav>

            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-amber-600 flex items-center justify-center shadow-lg">
                    <AlertTriangle className="w-7 h-7 text-white" />
                  </div>
                  <Badge variant="danger" size="lg">
                    Conservation Alert
                  </Badge>
                </div>
                <h1 className="text-5xl font-black text-white mb-4">
                  Threatened Fauna of Kashmir
                </h1>
                <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
                  Red Data Book species facing extinction threats in Kashmir. Filter by taxon group, conservation status, and priority species for targeted biodiversity intelligence.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Conservation Context Banner */}
      <div className="container mx-auto px-6 mt-10 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-r from-red-500/10 via-amber-500/10 to-orange-500/10 border border-red-500/30 p-6">
            <div className="flex items-start gap-4">
              <Book className="w-6 h-6 text-red-400 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">Conservation Context</h3>
                <p className="text-slate-300 text-sm mb-3">
                  {RED_DATA_SOURCE_METADATA.conservationContext.summary}
                </p>
                <div className="flex flex-wrap gap-2">
                  {RED_DATA_SOURCE_METADATA.conservationContext.threats.map((threat, idx) => (
                    <Badge key={idx} variant="outline" size="sm" className="border-red-500/30 text-red-400 text-xs">
                      {threat}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Metrics Bar */}
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="glass-intense border-white/10 p-6" padding="none">
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
              {[
                { label: 'Total Species', value: metrics.total, icon: Shield },
                { label: 'Mammals', value: metrics.byTaxon.mammals, icon: Leaf },
                { label: 'Birds', value: metrics.byTaxon.birds, icon: Bird },
                { label: 'Reptiles', value: metrics.byTaxon.reptilesAmphibians, icon: Turtle },
                { label: 'Priority', value: metrics.prioritySpecies, icon: Target },
                { label: 'Endangered', value: metrics.byIUCNStatus.endangered, icon: AlertTriangle },
                { label: 'Vulnerable', value: metrics.byIUCNStatus.vulnerable, icon: TrendingUp },
                { label: 'Schedule I', value: metrics.bySchedule.scheduleI, icon: Book },
                { label: 'Conservation Gaps', value: metrics.conservationGaps.iucnButNotScheduleI, icon: Info },
                { label: 'Data Source', value: '1996', icon: BarChart3 },
              ].map((metric, idx) => (
                <div key={idx} className="text-center p-3 border-r border-white/5 last:border-r-0">
                  <metric.icon className="w-5 h-5 text-slate-500 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white tabular-nums">
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

      {/* Filters */}
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="glass-intense border-white/10 p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              {/* Search */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search species by name or conservation theme..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-900/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Taxon Filter */}
              <select
                value={taxonFilter}
                onChange={(e) => setTaxonFilter(e.target.value as TaxonFilter)}
                className="px-4 py-2.5 rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="All">All Taxon Groups</option>
                <option value="mammals">Mammals</option>
                <option value="birds">Birds</option>
                <option value="reptiles-amphibians">Reptiles & Amphibians</option>
              </select>

              {/* IUCN Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
                className="px-4 py-2.5 rounded-lg bg-slate-900/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="All">All IUCN Statuses</option>
                <option value="Endangered">Endangered</option>
                <option value="Vulnerable">Vulnerable</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Data Deficient">Data Deficient</option>
              </select>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <Filter className="w-4 h-4" />
                <span>
                  Showing <span className="text-white font-semibold">{filteredData.length}</span> of{' '}
                  <span className="text-white font-semibold">{allData.length}</span> threatened species
                </span>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPriorityOnly}
                  onChange={(e) => setShowPriorityOnly(e.target.checked)}
                  className="w-4 h-4 rounded bg-slate-900 border-white/10 text-red-500 focus:ring-red-500"
                />
                <span className="text-sm text-slate-400">Priority Kashmir Species Only</span>
              </label>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
              <Badge variant="outline" size="sm" className="border-red-500/30 text-red-400">
                <AlertTriangle className="w-3 h-3 mr-1" />
                EN: {metrics.byIUCNStatus.endangered}
              </Badge>
              <Badge variant="outline" size="sm" className="border-amber-500/30 text-amber-400">
                <TrendingUp className="w-3 h-3 mr-1" />
                VU: {metrics.byIUCNStatus.vulnerable}
              </Badge>
              <Badge variant="outline" size="sm" className="border-blue-500/30 text-blue-400">
                <Info className="w-3 h-3 mr-1" />
                DD: {metrics.byIUCNStatus.dataDeficient}
              </Badge>
              <Badge variant="outline" size="sm" className="border-emerald-500/30 text-emerald-400">
                <Target className="w-3 h-3 mr-1" />
                Priority: {metrics.prioritySpecies}
              </Badge>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Priority Species Highlight */}
      {PRIORITY_KASHMIR_SPECIES.length > 0 && !showPriorityOnly && (
        <div className="container mx-auto px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-emerald-400" />
              <h3 className="text-lg font-bold text-white">Priority Kashmir Species</h3>
              <Badge variant="success" size="sm">{PRIORITY_KASHMIR_SPECIES.length} flagship species</Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {PRIORITY_KASHMIR_SPECIES.slice(0, 6).map((species) => {
                const TaxonIcon = getTaxonIcon(species.taxonGroup);
                return (
                  <Card key={species.id} className="glass-intense border-emerald-500/30 p-4 bg-emerald-500/5">
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getTaxonColor(species.taxonGroup)} flex items-center justify-center`}>
                        <TaxonIcon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-bold text-white">{species.commonName}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={getIUCNBadgeColor(species.iucn1996Status)} size="sm" className="text-xs">
                            {species.iucn1996Status}
                          </Badge>
                          <Badge variant={getScheduleBadgeColor(species.wildlifeProtectionAct1972Status)} size="sm" className="text-xs">
                            {species.wildlifeProtectionAct1972Status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </motion.div>
        </div>
      )}

      {/* Species Grid */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((species, idx) => {
            const TaxonIcon = getTaxonIcon(species.taxonGroup);
            
            return (
              <motion.div
                key={species.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.02 }}
              >
                <Card className={`glass-intense border-white/10 p-6 h-full hover:border-white/20 transition-all ${
                  species.prioritySpecies ? 'border-emerald-500/30 bg-emerald-500/5' : ''
                }`}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getTaxonColor(species.taxonGroup)} flex items-center justify-center flex-shrink-0`}>
                      <TaxonIcon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {species.prioritySpecies && (
                          <Badge variant="success" size="sm" className="text-xs">
                            <Target className="w-3 h-3 mr-1" />
                            Priority
                          </Badge>
                        )}
                        <Badge variant="outline" size="sm" className="border-white/20 text-white text-xs capitalize">
                          {species.taxonGroup.replace('-', ' & ')}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-bold text-white truncate">{species.commonName}</h3>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">IUCN (1996)</span>
                      <Badge variant={getIUCNBadgeColor(species.iucn1996Status)} size="sm">
                        {species.iucn1996Status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">WLPA 1972</span>
                      <Badge variant={getScheduleBadgeColor(species.wildlifeProtectionAct1972Status)} size="sm">
                        {species.wildlifeProtectionAct1972Status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-slate-400">Theme:</span>
                      <span className="text-slate-300 text-xs">{species.conservationTheme}</span>
                    </div>
                  </div>

                  {species.sourceNotes && species.sourceNotes.length > 0 && (
                    <div className="mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                      <ul className="text-xs text-amber-200 space-y-1">
                        {species.sourceNotes.map((note, idx) => (
                          <li key={idx}>• {note}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <Button
                    size="sm"
                    className={`w-full ${
                      species.prioritySpecies 
                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-500' 
                        : 'bg-gradient-to-r from-red-600 to-amber-600'
                    }`}
                    icon={<ArrowRight className="w-4 h-4" />}
                    onClick={() => router.push(`/biodiversity/species/${species.slug}`)}
                  >
                    View Details
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {filteredData.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <AlertTriangle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No threatened species found</h3>
            <p className="text-slate-400">Try adjusting your search or filters</p>
          </motion.div>
        )}
      </div>

      {/* Source Information */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="glass-light border-white/10 p-6">
            <div className="flex items-start gap-4">
              <Book className="w-6 h-6 text-slate-400 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">Source Reference</h3>
                <p className="text-slate-400 text-sm mb-3">
                  {RED_DATA_SOURCE_METADATA.sourceTitle}
                </p>
                <div className="text-sm text-slate-500">
                  <p className="mb-2">
                    <strong className="text-slate-400">Note:</strong> This data represents historical Red Data Book listings (IUCN 1996) and Wildlife Protection Act 1972 schedules. 
                    Use as source-based conservation reference and biodiversity intelligence context.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <span className="text-slate-500">Total Species:</span>{' '}
                      <span className="text-white font-medium">{RED_DATA_SOURCE_METADATA.speciesCounts.total}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Priority Species:</span>{' '}
                      <span className="text-white font-medium">{RED_DATA_SOURCE_METADATA.speciesCounts.prioritySpecies}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <AdvancedFooter />
    </main>
  );
}
