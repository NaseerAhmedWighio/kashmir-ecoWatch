'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { FileText, Download, ArrowRight, Search, Filter, Book, Grid3X3, List, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { getReports, getProtectedAreas } from '@/data/protected-network';
import { Heading } from '@/components/common/Heading';
import { Pagination } from '@/components/ui/Pagination';
import { Select } from '@/components/ui/Select';
import { ScopeTabBar } from '@/components/common/ScopeTabBar';

export default function ReportsPage() {
  const reports = getReports.all();

  const [activeTab, setActiveTab] = useState<'all' | 'core' | 'trans' | 'extended'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedScope, setSelectedScope] = useState('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 6;

  const handleDownload = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (typeof window !== 'undefined') {
      const isRegistered = window.localStorage.getItem('kew_member_registered') === 'true';
      if (isRegistered) {
        alert(`Initiating secure academic download for document "${slug}"...`);
      } else {
        window.location.href = `/protected-network/reports-and-plans/request?slug=${slug}`;
      }
    }
  };

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
    return reports.filter(r => r.linkedAreas.some(slug => paLookup.get(slug)?.scope === 'Kashmir Core') || r.linkedAreas.length === 0).length;
  }, [reports, paLookup]);

  const transCount = useMemo(() => {
    return reports.filter(r => r.linkedAreas.some(slug => paLookup.get(slug)?.scope === 'Trans-Divisional')).length;
  }, [reports, paLookup]);

  const extendedCount = useMemo(() => {
    return reports.filter(r => r.linkedAreas.some(slug => paLookup.get(slug)?.scope === 'Transboundary / Extended')).length;
  }, [reports, paLookup]);

  const TABS = [
    { key: 'all', label: 'All', description: 'Show all items across all ecological zones' },
    { key: 'core', label: 'Kashmir Core', description: `Valley core protected areas, wetland networks, and high-density zones — ${coreCount} documents` },
    { key: 'trans', label: 'Trans-Divisional', description: `Jammu, Pir Panjal, Kishtwar, and Ladakh high-altitude sectors — ${transCount} documents` },
    { key: 'extended', label: 'Transboundary / Extended', description: `Extended Himalayan and Karakoram zones, Neelum, AJK, and Gilgit — ${extendedCount} documents` },
  ] as const;

  const filteredReports = useMemo(() => {
    return reports.filter(report => {
      // 1. Tab scope filter
      const scopesOfReport = [];
      report.linkedAreas.forEach(slug => {
        const pa = paLookup.get(slug);
        if (pa && pa.scope) scopesOfReport.push(pa.scope);
      });
      if (scopesOfReport.length === 0) scopesOfReport.push('Kashmir Core'); // fallback
      
      const matchesTab = activeTab === 'all' || scopesOfReport.includes(
        activeTab === 'core' ? 'Kashmir Core'
        : activeTab === 'trans' ? 'Trans-Divisional'
        : 'Transboundary / Extended'
      );

      // 2. Search Text
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        report.title.toLowerCase().includes(query) ||
        report.type.toLowerCase().includes(query) ||
        report.description.toLowerCase().includes(query) ||
        report.authors.some(a => a.toLowerCase().includes(query)) ||
        report.linkedAreas.some(slug => slug.replace(/-/g, ' ').toLowerCase().includes(query));

      // 3. District Dropdown
      const districtsOfReport = [];
      report.linkedAreas.forEach(slug => {
        const pa = paLookup.get(slug);
        if (pa && pa.district) districtsOfReport.push(pa.district);
      });
      const matchesDistrict = selectedDistrict === 'all' || districtsOfReport.includes(selectedDistrict);

      // 4. Ecological Scope Dropdown
      const matchesScopeDropdown = selectedScope === 'all' || scopesOfReport.includes(selectedScope);

      return matchesTab && matchesSearch && matchesDistrict && matchesScopeDropdown;
    });
  }, [reports, activeTab, searchQuery, selectedDistrict, selectedScope, paLookup]);

  const totalPages = Math.max(1, Math.ceil(filteredReports.length / PAGE_SIZE));
  const paginatedReports = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredReports.slice(start, start + PAGE_SIZE);
  }, [filteredReports, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDistrict, selectedScope, activeTab]);

  const getTypeColor = (_type: string) => {
    return 'from- emerald-700 to-emerald-500';
  };

  const handleBulkExport = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const isRegistered = window.localStorage.getItem('kew_member_registered') === 'true';
      if (isRegistered) {
        alert('Initiating bulk download for all conservation reports and management plans (ZIP)...');
      } else {
        window.location.href = '/protected-network/reports-and-plans/request?slug=bulk-export';
      }
    }
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title={<><span className="block whitespace-nowrap">Reports and</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Plans</span></>}
        subtitle="Scientific reports, management plans, monitoring documents, and research publications for Kashmir's protected areas. Records are linked to individual protected areas and conservation themes."
        icon={<Book className="w-6 h-6 text-emerald-400" />}
        label="Evidence Intelligence"
        breadcrumbs={[{ label: 'Reports & Plans' }]}
        images={['/images/protected-network.png', '/images/bear.png', '/images/tiger.png', '/images/markhor.png']}
        actions={
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
            <Button className="bg-emerald-700 hover:bg-emerald-500 w-full sm:w-auto justify-center" icon={<Book className="w-5 h-5" />}>Publish Report</Button>
            <Button 
              variant="outline" 
              className="border-white/20 text-white w-full sm:w-auto justify-center" 
              icon={<Download className="w-5 h-5" />}
              onClick={handleBulkExport}
            >
              Bulk Export
            </Button>
          </div>
        }
      />

      <div className="container mx-auto px-4 sm:px-6 -mt-8 relative z-20 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass-intense border-white/10" padding="none">
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-8">
              {[
                { label: 'Total Documents', value: reports.length, icon: FileText },
                { label: 'Management Plans', value: reports.filter(r => r.type === 'Management Plan').length, icon: Book },
                { label: 'Scientific Reports', value: reports.filter(r => r.type === 'Scientific Report').length, icon: Search },
                { label: 'Monitoring Data', value: reports.filter(r => r.type === 'Monitoring Data').length, icon: Download },
                { label: 'Core Documents', value: coreCount, icon: FileText },
                { label: 'PAs Covered', value: new Set(reports.flatMap(r => r.linkedAreas || [])).size, icon: Book },
                { label: 'Most Recent', value: Math.max(...reports.map(r => r.year || 2024)), icon: Search },
                { label: 'Extended Docs', value: extendedCount, icon: Download },
              ].map((metric, idx) => (
                <div key={idx} className="py-3 px-1.5 sm:py-4 sm:px-2 rounded-xl text-center min-w-0 border-b border-white/[0.04] last:border-b-0 xs:border-b-0">
                  <metric.icon className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 mx-auto mb-1.5" />
                  <div className="text-sm sm:text-base lg:text-sm xl:text-base font-bold text-white tabular-nums leading-tight truncate">
                    {metric.value}
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
        filteredCount={filteredReports.length}
        totalCount={reports.length}
        countLabel="documents"
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-4 sm:space-y-6">
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 sm:p-5 glass-intense border border-white/10 rounded-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
          >
            <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Search Text</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search report title, authors..."
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

        {filteredReports.length > 0 ? (
          <>
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 xl:gap-6' : 'space-y-4'}>
              {paginatedReports.map((report, index) => (
              <motion.a
                key={report.id}
                href={`/protected-network/reports-and-plans/${report.slug}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`${viewMode === 'grid' ? 'h-full' : ''} block group`}
              >
                <Card className={`${viewMode === 'grid' ? 'h-full flex flex-col justify-between' : ''} card-intelligence border border-white/10 bg-white/5 hover:border-emerald-500/30 transition-all duration-300`} padding="lg">
                  {viewMode === 'grid' ? (
                    <div className="flex flex-col h-full justify-between p-4 sm:p-5">
                      <div>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-3">
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${getTypeColor(report.type)} bg-opacity-20 flex items-center justify-center flex-shrink-0`}>
                            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug">{report.title}</h3>
                            <div className="flex flex-wrap gap-1.5 mt-1.5">
                              <Badge variant="info" size="sm" className="capitalize">{report.type}</Badge>
                              <Badge variant="default" size="sm">{report.year}</Badge>
                            </div>
                          </div>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-400 mb-3 line-clamp-3 leading-relaxed">{report.description}</p>
                        <div className="text-xs text-slate-500 mb-3">
                          <span>Authors: <strong className="text-slate-300">{report.authors.slice(0, 2).join(', ')}{report.authors.length > 2 ? ' + more' : ''}</strong></span>
                        </div>
                        {report.linkedAreas && report.linkedAreas.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {report.linkedAreas.slice(0, 2).map((area, idx) => (
                              <Badge key={idx} variant="default" size="sm" className="truncate max-w-[140px]">
                                {area.replace(/-/g, ' ')}
                              </Badge>
                            ))}
                            {report.linkedAreas.length > 2 && (
                              <Badge variant="default" size="sm">
                                +{report.linkedAreas.length - 2}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/[0.06]">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-white/20 text-white hover:border-emerald-500/50 transition-colors w-full"
                          icon={<Download className="w-4 h-4" />}
                          onClick={(e) => handleDownload(e, report.slug)}
                        >
                          Download
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                      <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${getTypeColor(report.type)} bg-opacity-20 flex items-center justify-center flex-shrink-0 mt-0.5`}>
                          <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3 mb-1.5">
                            <h3 className="text-sm sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">{report.title}</h3>
                            <div className="flex flex-wrap items-center gap-1.5">
                              <Badge variant="info" size="sm" className="capitalize">{report.type}</Badge>
                              <Badge variant="default" size="sm">{report.year}</Badge>
                            </div>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-400 mb-2 line-clamp-2">{report.description}</p>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                            <span className="truncate max-w-full">Authors: <strong className="text-slate-300">{report.authors.slice(0, 2).join(', ')}{report.authors.length > 2 ? ' + more' : ''}</strong></span>
                          </div>
                          {report.linkedAreas && report.linkedAreas.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              {report.linkedAreas.slice(0, 2).map((area, idx) => (
                                <Badge key={idx} variant="default" size="sm">
                                  {area.replace(/-/g, ' ')}
                                </Badge>
                              ))}
                              {report.linkedAreas.length > 2 && (
                                <Badge variant="default" size="sm">
                                  +{report.linkedAreas.length - 2}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-white/20 text-white hover:border-emerald-500/50 transition-colors w-full sm:w-auto shrink-0"
                        icon={<Download className="w-4 h-4" />}
                        onClick={(e) => handleDownload(e, report.slug)}
                      >
                        Download
                      </Button>
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
            totalItems={filteredReports.length}
            pageSize={PAGE_SIZE}
          />
        </>
        ) : (
          <div className="text-center py-16 sm:py-24">
            <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-slate-700 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-bold text-white mb-2">No documents found</h3>
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

