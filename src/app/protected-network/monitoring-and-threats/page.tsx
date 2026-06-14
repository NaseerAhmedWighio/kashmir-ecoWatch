'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { AlertTriangle, Activity, Bell, ArrowRight, TrendingUp, Search, Filter, Grid3X3, List, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { getThreats, getProtectedAreas } from '@/data/protected-network';
import { Heading } from '@/components/common/Heading';
import { Pagination } from '@/components/ui/Pagination';
import { Select } from '@/components/ui/Select';
import { ScopeTabBar } from '@/components/common/ScopeTabBar';

export default function MonitoringPage() {
  const threats = getThreats.all();

  const [activeTab, setActiveTab] = useState<'all' | 'core' | 'trans' | 'extended'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedScope, setSelectedScope] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
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

  const coreCount = useMemo(() => {
    return threats.filter(t => t.affectedAreas.some(slug => paLookup.get(slug)?.scope === 'Kashmir Core') || t.affectedAreas.length === 0).length;
  }, [threats, paLookup]);

  const transCount = useMemo(() => {
    return threats.filter(t => t.affectedAreas.some(slug => paLookup.get(slug)?.scope === 'Trans-Divisional')).length;
  }, [threats, paLookup]);

  const extendedCount = useMemo(() => {
    return threats.filter(t => t.affectedAreas.some(slug => paLookup.get(slug)?.scope === 'Transboundary / Extended')).length;
  }, [threats, paLookup]);

  const TABS = [
    { key: 'all', label: 'All', description: 'Show all items across all ecological zones' },
    { key: 'core', label: 'Kashmir Core', description: `Valley core protected areas, wetland networks, and high-density zones — ${coreCount} alerts` },
    { key: 'trans', label: 'Trans-Divisional', description: `Jammu, Pir Panjal, Kishtwar, and Ladakh high-altitude sectors — ${transCount} alerts` },
    { key: 'extended', label: 'Transboundary / Extended', description: `Extended Himalayan and Karakoram zones, Neelum, AJK, and Gilgit — ${extendedCount} alerts` },
  ] as const;

  const filteredThreats = useMemo(() => {
    return threats.filter(threat => {
      // 1. Tab scope filter
      const scopesOfThreat = [];
      threat.affectedAreas.forEach(slug => {
        const pa = paLookup.get(slug);
        if (pa && pa.scope) scopesOfThreat.push(pa.scope);
      });
      if (scopesOfThreat.length === 0) scopesOfThreat.push('Kashmir Core'); // fallback
      
      const matchesTab = activeTab === 'all' || scopesOfThreat.includes(
        activeTab === 'core' ? 'Kashmir Core'
        : activeTab === 'trans' ? 'Trans-Divisional'
        : 'Transboundary / Extended'
      );

      // 2. Search Text
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        threat.name.toLowerCase().includes(query) ||
        threat.type.toLowerCase().includes(query) ||
        threat.description.toLowerCase().includes(query) ||
        threat.affectedAreas.some(slug => slug.replace(/-/g, ' ').toLowerCase().includes(query));

      // 3. District Dropdown
      const districtsOfThreat = [];
      threat.affectedAreas.forEach(slug => {
        const pa = paLookup.get(slug);
        if (pa && pa.district) districtsOfThreat.push(pa.district);
      });
      const matchesDistrict = selectedDistrict === 'all' || districtsOfThreat.includes(selectedDistrict);

      // 4. Ecological Scope Dropdown
      const matchesScopeDropdown = selectedScope === 'all' || scopesOfThreat.includes(selectedScope);

      return matchesTab && matchesSearch && matchesDistrict && matchesScopeDropdown;
    });
  }, [threats, activeTab, searchQuery, selectedDistrict, selectedScope, paLookup]);

  const totalPages = Math.max(1, Math.ceil(filteredThreats.length / PAGE_SIZE));
  const paginatedThreats = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredThreats.slice(start, start + PAGE_SIZE);
  }, [filteredThreats, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDistrict, selectedScope, activeTab]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'alert-critical';
      case 'high': return 'alert-critical';
      case 'medium': return 'alert-warning';
      default: return 'alert-info';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical': return 'danger';
      case 'high': return 'danger';
      case 'medium': return 'warning';
      default: return 'info';
    }
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title={<><span className="block whitespace-nowrap">Kashmir Monitoring</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">and Threats</span></>}
        subtitle="Pressure signals, encroachment records, habitat condition assessments, and active conservation alerts across Kashmir's protected areas. Data feeds into threat mapping and management planning."
        icon={<Bell className="w-6 h-6 text-emerald-400" />}
        label="Conservation Intelligence"
        breadcrumbs={[{ label: 'Monitoring & Threats' }]}
        images={['/images/protected-network.png', '/images/bear.png', '/images/tiger.png', '/images/markhor.png']}
        actions={
          <>
            <Button className="bg-emerald-400" icon={<Bell className="w-5 h-5" />}>Subscribe to Alerts</Button>
            <Button variant="outline" className="border-white/20 text-white" icon={<TrendingUp className="w-5 h-5" />}>View Trends</Button>
          </>
        }
      />

      <div className="container mx-auto px-4 sm:px-6 -mt-8 relative z-20 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass-intense border-white/10" padding="sm">
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              {[
                { label: 'Active Alerts', value: threats.length, icon: Bell },
                { label: 'Critical Threats', value: threats.filter(t => t.severity === 'critical').length, icon: AlertTriangle },
                { label: 'Monitoring Stations', value: '234', icon: Activity },
                { label: 'Resolved (30d)', value: '34', icon: TrendingUp },
                { label: 'Core Area Alerts', value: coreCount, icon: Bell },
                { label: 'Trans-Div alerts', value: transCount, icon: AlertTriangle },
                { label: 'Transboundary alerts', value: extendedCount, icon: Activity },
                { label: 'Unmitigated', value: threats.filter(t => t.mitigationStrategies.length === 0).length, icon: TrendingUp },
              ].map((metric, idx) => (
                <div key={idx} className="py-2.5 px-2 lg:py-3 lg:px-3 rounded-xl text-center min-w-0">
                  <metric.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 mx-auto mb-1" />
                  <div className="text-sm sm:text-base lg:text-sm xl:text-base font-bold text-white tabular-nums leading-tight truncate">
                    {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 uppercase tracking-wide mt-0.5 leading-tight break-words">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Tab + Filters — single row */}
      <ScopeTabBar
        tabs={TABS as any}
        activeTab={activeTab}
        onTabChange={(key) => setActiveTab(key as 'all' | 'core' | 'trans' | 'extended')}
        onScopeChange={setSelectedScope}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters(f => !f)}
        filteredCount={filteredThreats.length}
        totalCount={threats.length}
        countLabel="threat alerts"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
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
                  placeholder="Search threat name, affected areas..."
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

        {filteredThreats.length > 0 ? (
          <>
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 xl:gap-6' : 'space-y-4'}>
              {paginatedThreats.map((threat, index) => (
              <motion.a
                key={threat.id}
                href={`/protected-network/monitoring-and-threats/${threat.slug}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`${viewMode === 'grid' ? 'h-full' : ''} block group`}
              >
                <Card className={`${viewMode === 'grid' ? 'h-full flex flex-col justify-between' : ''} card-intelligence border border-white/10 bg-white/5 hover:border-emerald-500/30 transition-all duration-300 p-6 ${getSeverityColor(threat.severity)} group-hover:scale-[1.01] transition-transform`}>
                  {viewMode === 'grid' ? (
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <div className="flex items-start gap-4 mb-3">
                          <div className={`w-3 h-3 rounded-full mt-2 shrink-0 ${
                            threat.severity === 'critical' ? 'signal-pulse bg-red-500' :
                            threat.severity === 'high' ? 'signal-pulse bg-red-500' :
                            threat.severity === 'medium' ? 'signal-pulse bg-amber-500' :
                            'signal-pulse bg-blue-500'
                          }`} />
                          <div>
                            <h3 className="font-semibold text-white mb-1 group-hover:text-emerald-300 transition-colors">{threat.name}</h3>
                            <span className="inline-block mt-1">
                              <Badge variant={getSeverityBadge(threat.severity)} size="sm">
                                {threat.severity.toUpperCase()}
                              </Badge>
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-300 mb-3 line-clamp-3">{threat.description}</p>
                        <div className="text-xs text-slate-400">
                          <span>{threat.affectedAreas.length} affected areas</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/[0.06] flex justify-end">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg- emerald-700 hover:bg- emerald-500  shadow-md shadow-emerald-500/20 transition-colors text-sm font-medium text-white">
                          View Intel
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className={`w-3 h-3 rounded-full mt-2 ${
                          threat.severity === 'critical' ? 'signal-pulse bg-red-500' :
                          threat.severity === 'high' ? 'signal-pulse bg-red-500' :
                          threat.severity === 'medium' ? 'signal-pulse bg-amber-500' :
                          'signal-pulse bg-blue-500'
                        }`} />
                        <div>
                          <h3 className="font-semibold text-white mb-1 group-hover:text-emerald-300 transition-colors">{threat.name}</h3>
                          <p className="text-sm text-slate-300 mb-2">{threat.description}</p>
                          <div className="flex items-center gap-4 text-xs text-slate-400">
                            <span>{threat.affectedAreas.length} affected areas</span>
                            <span>•</span>
                            <Badge variant={getSeverityBadge(threat.severity)} size="sm">
                              {threat.severity.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-slate-400 group-hover:text-white transition-colors" icon={<ArrowRight className="w-4 h-4" />} />
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
            totalItems={filteredThreats.length}
            pageSize={PAGE_SIZE}
          />
        </>
        ) : (
          <div className="text-center py-24">
            <Shield className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No threat alerts found</h3>
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

