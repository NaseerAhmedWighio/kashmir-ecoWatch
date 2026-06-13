'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Activity, MapPin, Shield, TrendingUp, ArrowRight, Search, Filter, AlertTriangle, Grid3X3, List, Map as MapIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { getSpeciesProfiles, getProtectedAreas } from '@/data/protected-network';
import { Heading } from '@/components/common/Heading';
import { Pagination } from '@/components/ui/Pagination';
import { Select } from '@/components/ui/Select';
import { TabBar } from '@/components/common/TabBar';

export default function SpeciesIntelligencePage() {
  const speciesList = getSpeciesProfiles.all();

  const [activeTab, setActiveTab] = useState<'core' | 'trans' | 'extended'>('core');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedScope, setSelectedScope] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 6;

  const allPAs = useMemo(() => {
    return [
      ...getProtectedAreas.nationalParks(),
      ...getProtectedAreas.wildlifeSanctuaries(),
      ...getProtectedAreas.wetlandReserves(),
      ...getProtectedAreas.conservationReserves(),
      ...getProtectedAreas.birdHabitatAreas()
    ];
  }, []);

  const paLookup = useMemo(() => new Map(allPAs.map(pa => [pa.slug, pa])), [allPAs]);

  const districtsList = useMemo(() => {
    const districts = new Set<string>();
    allPAs.forEach(pa => {
      if (pa.district) districts.add(pa.district);
    });
    return Array.from(districts).sort();
  }, [allPAs]);

  const scopesList = ['Kashmir Core', 'Trans-Divisional', 'Transboundary / Extended'];

  const scopeToTabMap: Record<string, 'core' | 'trans' | 'extended'> = {
    'Kashmir Core': 'core',
    'Trans-Divisional': 'trans',
    'Transboundary / Extended': 'extended',
  };

  useEffect(() => {
    if (selectedScope !== 'all' && scopeToTabMap[selectedScope]) {
      setActiveTab(scopeToTabMap[selectedScope]);
    }
  }, [selectedScope]);

  const coreCount = useMemo(() => {
    return speciesList.filter(s => s.protectedAreas.some(slug => paLookup.get(slug)?.scope === 'Kashmir Core')).length;
  }, [speciesList, paLookup]);

  const transCount = useMemo(() => {
    return speciesList.filter(s => s.protectedAreas.some(slug => paLookup.get(slug)?.scope === 'Trans-Divisional')).length;
  }, [speciesList, paLookup]);

  const extendedCount = useMemo(() => {
    return speciesList.filter(s => s.protectedAreas.some(slug => paLookup.get(slug)?.scope === 'Transboundary / Extended')).length;
  }, [speciesList, paLookup]);

  const TABS = [
    { key: 'core', label: 'Kashmir Core', description: `Valley core protected areas, wetland networks, and high-density zones — ${coreCount} species` },
    { key: 'trans', label: 'Trans-Divisional', description: `Jammu, Pir Panjal, Kishtwar, and Ladakh sectors — ${transCount} species` },
    { key: 'extended', label: 'Transboundary / Extended', description: `Extended Himalayan and Karakoram zones, Neelum, AJK, and Gilgit — ${extendedCount} species` },
  ] as const;

  const filteredSpecies = useMemo(() => {
    return speciesList.filter(species => {
      // 1. Tab scope filter
      const scopesOfSpecies = [];
      species.protectedAreas.forEach(slug => {
        const pa = paLookup.get(slug);
        if (pa && pa.scope) scopesOfSpecies.push(pa.scope);
      });
      if (scopesOfSpecies.length === 0) scopesOfSpecies.push('Kashmir Core');
      
      const tabScope = activeTab === 'core' ? 'Kashmir Core' 
                     : activeTab === 'trans' ? 'Trans-Divisional' 
                     : 'Transboundary / Extended';
      const matchesTab = scopesOfSpecies.includes(tabScope);

      // 2. Search Text
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        species.name.toLowerCase().includes(query) ||
        species.scientificName.toLowerCase().includes(query) ||
        species.description.toLowerCase().includes(query) ||
        species.protectedAreas.some(pa => pa.replace(/-/g, ' ').toLowerCase().includes(query));

      // 3. District Dropdown
      const districtsOfSpecies = [];
      species.protectedAreas.forEach(slug => {
        const pa = paLookup.get(slug);
        if (pa && pa.district) districtsOfSpecies.push(pa.district);
      });
      const matchesDistrict = selectedDistrict === 'all' || districtsOfSpecies.includes(selectedDistrict);

      // 4. Ecological Scope Dropdown
      const matchesScopeDropdown = selectedScope === 'all' || scopesOfSpecies.includes(selectedScope);

      return matchesTab && matchesSearch && matchesDistrict && matchesScopeDropdown;
    });
  }, [speciesList, activeTab, searchQuery, selectedDistrict, selectedScope, paLookup]);

  const totalPages = Math.max(1, Math.ceil(filteredSpecies.length / PAGE_SIZE));
  const paginatedSpecies = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredSpecies.slice(start, start + PAGE_SIZE);
  }, [filteredSpecies, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDistrict, selectedScope, activeTab]);

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
            <Button className="bg-gradient-to-r from-emerald-600 to-emerald-500" icon={<Search className="w-5 h-5" />}>
              Search Species
            </Button>
            <Button variant="outline" className="border-white/20 text-white" icon={<MapIcon className="w-5 h-5" />}>
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
                { label: 'Mammal Profiles', value: speciesList.filter(s => s.group === 'Mammal').length, icon: Activity },
                { label: 'Bird Profiles', value: speciesList.filter(s => s.group === 'Bird').length, icon: MapPin },
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

      {/* Tab + Filters — single row */}
      <TabBar
        tabs={TABS as any}
        activeTab={activeTab}
        onTabChange={(key) => setActiveTab(key as 'core' | 'trans' | 'extended')}
        onScopeSync={(label) => setSelectedScope(label)}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(f => !f)}
        filteredCount={filteredSpecies.length}
        totalCount={speciesList.length}
        countLabel="species"
      />

        {/* Content */}
      <div className="container mx-auto px-6 py-8 space-y-6">
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 glass-intense border border-white/10 rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Search Text</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search species name, scientific name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">District</label>
              <Select
                value={selectedDistrict}
                onChange={setSelectedDistrict}
                options={[
                  { value: 'all', label: 'All Districts' },
                  ...districtsList.map(d => ({ value: d, label: d })),
                ]}
                placeholder="All Districts"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Ecological Scope</label>
              <Select
                value={selectedScope}
                onChange={setSelectedScope}
                options={[
                  { value: 'all', label: 'All Scopes' },
                  ...scopesList.map(s => ({ value: s, label: s })),
                ]}
                placeholder="All Scopes"
              />
            </div>
          </motion.div>
        )}

        {/* Species Cards */}
        {filteredSpecies.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 xl:gap-6">
              {paginatedSpecies.map((species, index) => (
              <motion.a
                key={species.id}
                href={`/protected-network/species-intelligence/${species.slug}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="h-full block group"
              >
                <Card className="h-full flex flex-col justify-between card-intelligence border border-white/10 bg-white/5 hover:border-emerald-500/30 transition-all duration-300" padding="lg">
                  <div>
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
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/[0.06] flex justify-end">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 shadow-md shadow-emerald-500/20 transition-colors text-sm font-medium text-white">
                      View Species Details
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Card>
              </motion.a>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredSpecies.length}
            pageSize={PAGE_SIZE}
          />
        </>
        ) : (
          <div className="text-center py-24">
            <Shield className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No species profiles found</h3>
            <p className="text-slate-400 mb-4">Try adjusting your filters</p>
            <Button
              variant="outline"
              className="border-white/20 text-white"
              onClick={() => {
                setSearchQuery('');
                setSelectedDistrict('all');
                setSelectedScope('all');
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      
    </main>
  );
}

