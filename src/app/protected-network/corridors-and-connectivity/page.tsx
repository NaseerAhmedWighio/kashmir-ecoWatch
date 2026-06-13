'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Map, TrendingUp, ArrowRight, Search, Activity, Filter, Grid3X3, List, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { getCorridors } from '@/data/protected-network';
import { Heading } from '@/components/common/Heading';
import { Pagination } from '@/components/ui/Pagination';
import { Select } from '@/components/ui/Select';

export default function CorridorsPage() {
  const corridors = getCorridors.all();

  const [activeTab, setActiveTab] = useState<'core' | 'trans' | 'extended'>('core');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedScope, setSelectedScope] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 6;

  const districtsList = useMemo(() => {
    const districts = new Set<string>();
    corridors.forEach(c => {
      if (c.districts) {
        c.districts.forEach(d => districts.add(d));
      }
    });
    return Array.from(districts).sort();
  }, [corridors]);

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

  const coreCount = useMemo(() => corridors.filter(c => c.scope === 'Kashmir Core').length, [corridors]);
  const transCount = useMemo(() => corridors.filter(c => c.scope === 'Trans-Divisional').length, [corridors]);
  const extendedCount = useMemo(() => corridors.filter(c => c.scope === 'Transboundary / Extended').length, [corridors]);

  const TABS = [
    { key: 'core', label: 'Kashmir Core', description: `Valley core protected areas, wetland networks, and high-density zones — ${coreCount} corridors` },
    { key: 'trans', label: 'Trans-Divisional', description: `Jammu, Pir Panjal, Kishtwar, and Ladakh sectors — ${transCount} corridors` },
    { key: 'extended', label: 'Transboundary / Extended', description: `Extended Himalayan and Karakoram zones, Neelum, AJK, and Gilgit — ${extendedCount} corridors` },
  ] as const;

  const filteredCorridors = useMemo(() => {
    return corridors.filter(corridor => {
      // 1. Tab scope filter
      const tabScope = activeTab === 'core' ? 'Kashmir Core'
                     : activeTab === 'trans' ? 'Trans-Divisional'
                     : 'Transboundary / Extended';
      
      const corridorScope = corridor.scope;
      const matchesTab = corridorScope === tabScope;

      // 2. Search Text
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        corridor.name.toLowerCase().includes(query) ||
        corridor.type.toLowerCase().includes(query) ||
        corridor.description.toLowerCase().includes(query);

      // 3. District Dropdown
      const matchesDistrict = selectedDistrict === 'all' || (corridor.districts && corridor.districts.includes(selectedDistrict));

      // 4. Ecological Scope Dropdown
      const matchesScopeDropdown = selectedScope === 'all' || corridorScope === selectedScope;

      return matchesTab && matchesSearch && matchesDistrict && matchesScopeDropdown;
    });
  }, [corridors, activeTab, searchQuery, selectedDistrict, selectedScope]);

  const totalPages = Math.max(1, Math.ceil(filteredCorridors.length / PAGE_SIZE));
  const paginatedCorridors = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredCorridors.slice(start, start + PAGE_SIZE);
  }, [filteredCorridors, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDistrict, selectedScope, activeTab]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'danger';
      case 'High': return 'warning';
      case 'Medium': return 'info';
      default: return 'default';
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

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title={<><span className="block whitespace-nowrap">Kashmir Corridors</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">and Connectivity</span></>}
        subtitle="Landscape connectivity and habitat linkage analysis across Kashmir's protected area network. Identifies wildlife corridors, fragmentation zones, ecological bottlenecks, and movement pathways for conservation planning and spatial management."
        icon={<Map className="w-6 h-6 text-emerald-400" />}
        label="Ecological Intelligence"
        breadcrumbs={[{ label: 'Corridors & Connectivity' }]}
        images={['/images/protected-network.png', '/images/bear.png', '/images/tiger.png', '/images/markhor.png']}
        actions={
          <>
            <Button className="bg-gradient-to-r from-emerald-600 to-emerald-500" icon={<Search className="w-5 h-5" />}>Search Corridors</Button>
            <Button variant="outline" className="border-white/20 text-white" icon={<Map className="w-5 h-5" />}>Connectivity Map</Button>
          </>
        }
      />

      {/* Metrics */}
      <div className="container mx-auto px-6 -mt-8 relative z-20 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass-intense border-white/10 p-4 lg:p-5" padding="none">
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-1 sm:gap-2">
              {[
                { label: 'Identified Corridors', value: corridors.length, icon: Map },
                { label: 'Critical Priority', value: corridors.filter(c => c.priority === 'Critical').length, icon: TrendingUp },
                { label: 'Total Length', value: '287 km', icon: Search },
                { label: 'Active Status', value: corridors.filter(c => c.status === 'Active').length, icon: Activity },
                { label: 'Degraded', value: corridors.filter(c => c.status === 'Degraded').length, icon: TrendingUp },
                { label: 'Threatened', value: corridors.filter(c => c.status === 'Threatened').length, icon: Map },
                { label: 'PA Connections', value: 24, icon: Activity },
                { label: 'Frag. Zones', value: 11, icon: Search },
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
      <div className="container mx-auto px-6 mt-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Tabs */}
          <div className="flex items-center gap-2 p-1 glass-intense border border-white/10 rounded-xl">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => { setActiveTab(tab.key); setSelectedScope(tab.label); }}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.key
                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active tab description */}
          <span className="text-xs text-slate-500 hidden lg:block flex-1 px-4 truncate">
            {TABS.find(t => t.key === activeTab)!.description}
          </span>

          {/* Filters + count + view mode toggle */}
          <div className="flex items-center gap-3 ml-auto">
            <Button variant="outline" className="border-white/20 text-white" icon={<Filter className="w-4 h-4" />} onClick={() => setShowFilters(f => !f)}>
              {showFilters ? 'Hide Filters' : 'Filters'}
            </Button>
            <span className="text-sm text-slate-400 whitespace-nowrap">
              <strong className="text-white">{filteredCorridors.length}</strong> of <strong className="text-white">{corridors.length}</strong> corridors
            </span>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400'} icon={<Grid3X3 className="w-4 h-4" />} />
              <Button variant="ghost" size="sm" onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400'} icon={<List className="w-4 h-4" />} />
            </div>
          </div>
        </div>
      </div>

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
                  placeholder="Search corridor name, type..."
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

        {/* Corridors Grid/List */}
        {filteredCorridors.length > 0 ? (
          <>
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 xl:gap-6' : 'space-y-4'}>
              {paginatedCorridors.map((corridor, index) => (
              <motion.a
                key={corridor.id}
                href={`/protected-network/corridors-and-connectivity/${corridor.slug}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`${viewMode === 'grid' ? 'h-full' : ''} block group`}
              >
                <Card 
                  className={`${viewMode === 'grid' ? 'h-full flex flex-col justify-between' : ''} card-intelligence border border-white/10 bg-white/5 hover:border-emerald-500/30 transition-all duration-300`} 
                  padding="lg"
                >
                  {viewMode === 'grid' ? (
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge variant={getPriorityColor(corridor.priority)} size="sm">
                            {corridor.priority} Priority
                          </Badge>
                          <Badge variant={getStatusColor(corridor.status)} size="sm">
                            {corridor.status}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">{corridor.name}</h3>
                        <p className="text-xs text-slate-400 mt-2 mb-3 line-clamp-2 leading-relaxed">{corridor.description}</p>
                        <div className="flex items-center gap-6 text-xs text-slate-500">
                          <span>Type: <strong className="text-slate-400">{corridor.type}</strong></span>
                          <span>Length: <strong className="text-slate-400">{corridor.length}</strong></span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/[0.06] flex justify-end">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 shadow-md shadow-emerald-500/20 transition-colors text-sm font-medium text-white">
                          View Details
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <Badge variant={getPriorityColor(corridor.priority)} size="sm">
                            {corridor.priority} Priority
                          </Badge>
                          <Badge variant={getStatusColor(corridor.status)} size="sm">
                            {corridor.status}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">{corridor.name}</h3>
                        <p className="text-xs text-slate-400 mt-2 mb-3 line-clamp-2 leading-relaxed">{corridor.description}</p>
                        <div className="flex items-center gap-6 text-xs text-slate-500">
                          <span>Type: <strong className="text-slate-400">{corridor.type}</strong></span>
                          <span>Length: <strong className="text-slate-400">{corridor.length}</strong></span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-emerald-500 group-hover:text-emerald-400 transition-colors ml-4 flex-shrink-0" icon={<ArrowRight className="w-4 h-4" />} />
                    </div>
                  )}
                </Card>
              </motion.a>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            totalItems={filteredCorridors.length}
            pageSize={PAGE_SIZE}
          />
        </>
        ) : (
          <div className="text-center py-24">
            <Shield className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No corridors found</h3>
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

      <AdvancedFooter />
    </main>
  );
}
