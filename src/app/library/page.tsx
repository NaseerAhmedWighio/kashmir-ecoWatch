'use client';

import React, { useState, useMemo } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import {
  Book, Search, FileText, Download, ArrowRight, Calendar, User,
  MapPin, Layers, Database, FlaskConical, Map, Scroll, BookOpen,
  Waves, Map as MapIcon, TriangleAlert, Droplets, Trees, CloudRain,
  Filter, X, ExternalLink, Link as LinkIcon, Building2, TrendingUp, Star,
  CheckCircle2, AlertCircle, Info, Compass, Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  evidenceRegistry, collections, browseByDistrict, browseByModule, browseByCategory,
  EvidenceItem, Collection, EvidenceCategory, EvidenceSourceType,
  getEvidenceByCollection, getEvidenceByDistrict, getEvidenceByModule, getEvidenceByCategory,
  sourceTypeLabels, confidenceLabels, categoryLabels
} from '@/data/evidence-intelligence';
import { EvidenceCard } from '@/components/library/EvidenceCard';
import { CollectionCard, CollectionsGrid } from '@/components/library/CollectionsSection';
import { BrowseByCategory, BrowseByDistrict, BrowseByModule } from '@/components/library/BrowseSections';
import { cn } from '@/lib/utils';

// Evidence type taxonomy
const evidenceTypes = [
  { id: 'scientific-study', name: 'Scientific Studies', icon: BookOpen, count: 0, description: 'Peer-reviewed journal articles' },
  { id: 'field-survey', name: 'Field Surveys', icon: MapPin, count: 0, description: 'Primary field data collection' },
  { id: 'monitoring-report', name: 'Monitoring Reports', icon: TrendingUp, count: 0, description: 'Time-series monitoring data' },
  { id: 'management-plan', name: 'Management Plans', icon: FileText, count: 0, description: 'Operational/conservation plans' },
  { id: 'assessment', name: 'Assessments', icon: CheckCircle2, count: 0, description: 'Evaluations, status assessments' },
  { id: 'dataset', name: 'Datasets', icon: Database, count: 0, description: 'Raw or processed data' },
  { id: 'map-gis', name: 'Maps & GIS', icon: Map, count: 0, description: 'Spatial data, shapefiles' },
  { id: 'atlas', name: 'Atlases', icon: Book, count: 0, description: 'Comprehensive references' },
  { id: 'eia', name: 'EIAs', icon: AlertCircle, count: 0, description: 'Environmental Impact Assessments' },
  { id: 'policy-document', name: 'Policy Documents', icon: Scroll, count: 0, description: 'Government/NGO policy papers' },
];

// Entity types for reports
const entityTypes = [
  { id: 'species', name: 'Species', icon: BookOpen, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { id: 'lake', name: 'Lakes', icon: Waves, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
  { id: 'wetland', name: 'Wetlands', icon: Waves, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { id: 'district', name: 'Districts', icon: MapIcon, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
  { id: 'protected_area', name: 'Protected Areas', icon: Trees, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' },
  { id: 'spring', name: 'Springs', icon: Droplets, color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/20' },
  { id: 'forest', name: 'Forests', icon: Trees, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  { id: 'glacier', name: 'Glaciers', icon: Waves, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
];

// Source type colors
const sourceTypeColors: Record<string, string> = {
  official: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  academic: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  field: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  citizen: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
};

const confidenceColors: Record<string, string> = {
  high: 'bg-emerald-500/20 text-emerald-400',
  medium: 'bg-amber-500/20 text-amber-400',
  low: 'bg-orange-500/20 text-orange-400',
  unverified: 'bg-slate-500/20 text-slate-400',
};

interface FilterState {
  districts: string[];
  modules: string[];
  evidenceTypes: string[];
  sourceTypes: string[];
  confidenceLevels: string[];
  entities: string[];
}

export default function LibraryPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    districts: [],
    modules: [],
    evidenceTypes: [],
    sourceTypes: [],
    confidenceLevels: [],
    entities: [],
  });
  const [showFilters, setShowFilters] = useState(false);

  // Compute evidence type counts
  const evidenceTypeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    evidenceRegistry.forEach(e => {
      const key = e.category;
      counts[key] = (counts[key] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter evidence based on search and filters
  const filteredEvidence = useMemo(() => {
    let result = [...evidenceRegistry];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(e =>
        e.title.toLowerCase().includes(q) ||
        e.abstract.toLowerCase().includes(q) ||
        e.keywords.some(k => k.toLowerCase().includes(q)) ||
        e.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (filters.districts.length > 0) {
      result = result.filter(e =>
        filters.districts.some(d => e.districts.includes(d) || e.districts.includes('all'))
      );
    }

    if (filters.modules.length > 0) {
      result = result.filter(e =>
        filters.modules.some(m => e.usedInModules.some(um => um.moduleId === m))
      );
    }

    if (filters.sourceTypes.length > 0) {
      result = result.filter(e => filters.sourceTypes.includes(e.sourceType));
    }

    if (filters.confidenceLevels.length > 0) {
      result = result.filter(e => filters.confidenceLevels.includes(e.confidence));
    }

    if (filters.entities.length > 0) {
      result = result.filter(e =>
        filters.entities.some(ent => e.relatedEntities.some(re => re.type === ent))
      );
    }

    return result;
  }, [searchQuery, filters]);

  // Get recent evidence
  const recentEvidence = useMemo(() => {
    return [...evidenceRegistry]
      .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
      .slice(0, 6);
  }, []);

  // Get evidence by entity type
  const getEvidenceByEntityType = (entityType: string) => {
    return evidenceRegistry.filter(e =>
      e.relatedEntities.some(re => re.type === entityType)
    );
  };

  // Toggle filter
  const toggleFilter = (filterType: keyof FilterState, value: string) => {
    setFilters(prev => {
      const current = prev[filterType];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
      return { ...prev, [filterType]: updated };
    });
  };

  const clearFilters = () => {
    setFilters({
      districts: [],
      modules: [],
      evidenceTypes: [],
      sourceTypes: [],
      confidenceLevels: [],
      entities: [],
    });
    setSearchQuery('');
  };

  const hasActiveFilters = Object.values(filters).some(arr => arr.length > 0) || searchQuery;

  return (
    <main className="min-h-screen bg-slate-950">{/* Hero Section - Evidence Intelligence */}
      <section className="relative pt-20 md:pt-48 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-purple-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl">
                <Book className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Evidence Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Evidence <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Intelligence</span> Library
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-4xl">
              A structured evidence and reference system linking environmental studies, monitoring records, datasets, district profiles, GIS resources, and reviewed knowledge inputs across Kashmir EcoWatch.
            </p>

            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search evidence by title, abstract, keywords, or tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder:text-slate-500 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
              <Button
                size="lg"
                variant="outline"
                className={cn(
                  "border-white/20 text-white min-w-[140px]",
                  hasActiveFilters && "border-indigo-500/50 bg-indigo-500/10"
                )}
                icon={hasActiveFilters ? <CheckCircle2 className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
                onClick={() => setShowFilters(!showFilters)}
              >
                {hasActiveFilters ? `${Object.values(filters).flat().length} Filters` : 'Filters'}
              </Button>
            </div>

            {/* Active Filters Display */}
            <AnimatePresence>
              {hasActiveFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap gap-2 mb-6"
                >
                  {searchQuery && (
                    <Badge
                      variant="secondary"
                      size="sm"
                      className="cursor-pointer bg-indigo-500/20 text-indigo-400 border-indigo-500/30"
                      onClick={() => setSearchQuery('')}
                    >
                      Search: "{searchQuery}" <X className="w-3 h-3 ml-1" />
                    </Badge>
                  )}
                  {filters.districts.map(d => (
                    <Badge
                      key={d}
                      variant="outline"
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => toggleFilter('districts', d)}
                    >
                      District: {d} <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                  {filters.sourceTypes.map(s => (
                    <Badge
                      key={s}
                      variant="outline"
                      size="sm"
                      className={cn("cursor-pointer", sourceTypeColors[s])}
                      onClick={() => toggleFilter('sourceTypes', s)}
                    >
                      {sourceTypeLabels[s as keyof typeof sourceTypeLabels]} <X className="w-3 h-3 ml-1" />
                    </Badge>
                  ))}
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-slate-400 hover:text-white h-7"
                    onClick={clearFilters}
                  >
                    Clear all
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Metrics Ribbon */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{evidenceRegistry.length}+</div>
                <div className="text-sm text-slate-400">Evidence Items</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{collections.length}</div>
                <div className="text-sm text-slate-400">Collections</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{browseByDistrict.length}</div>
                <div className="text-sm text-slate-400">Districts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">{browseByModule.length}</div>
                <div className="text-sm text-slate-400">Modules</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filter Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="py-8 bg-slate-900/50"
          >
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Source Type Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Source Type
                  </h3>
                  <div className="space-y-2">
                    {(['official', 'academic', 'field', 'citizen'] as EvidenceSourceType[]).map(type => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.sourceTypes.includes(type)}
                          onChange={() => toggleFilter('sourceTypes', type)}
                          className="w-4 h-4 rounded border-white/20 bg-slate-800 text-indigo-500 focus:ring-indigo-500/20"
                        />
                        <span className={cn("text-sm", sourceTypeColors[type], "px-2 py-0.5 rounded")}>
                          {sourceTypeLabels[type]}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Confidence Level Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Confidence Level
                  </h3>
                  <div className="space-y-2">
                    {(['high', 'medium', 'low', 'unverified'] as const).map(level => (
                      <label key={level} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.confidenceLevels.includes(level)}
                          onChange={() => toggleFilter('confidenceLevels', level)}
                          className="w-4 h-4 rounded border-white/20 bg-slate-800 text-indigo-500 focus:ring-indigo-500/20"
                        />
                        <span className={cn("text-sm", confidenceColors[level], "px-2 py-0.5 rounded")}>
                          {confidenceLabels[level]}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Entity Type Filter */}
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Related Entities
                  </h3>
                  <div className="space-y-2">
                    {entityTypes.map(entity => (
                      <label key={entity.id} className="flex items-center gap-2 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={filters.entities.includes(entity.id)}
                          onChange={() => toggleFilter('entities', entity.id)}
                          className="w-4 h-4 rounded border-white/20 bg-slate-800 text-indigo-500 focus:ring-indigo-500/20"
                        />
                        <entity.icon className={cn("w-4 h-4", entity.color)} />
                        <span className="text-sm text-slate-300">{entity.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Collections Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Evidence Collections</h2>
                <p className="text-slate-400">Curated thematic evidence grouped by topic</p>
              </div>
              <Button variant="ghost" size="sm" className="text-indigo-400" icon={<ArrowRight className="w-4 h-4" />}>
                View All
              </Button>
            </div>
          </motion.div>

          <CollectionsGrid collections={collections} compact={false} />
        </div>
      </section>

      {/* How Evidence Enters the Library */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-2">How Evidence Enters the Library</h2>
            <p className="text-slate-400 max-w-3xl">
              Every item in this library undergoes structured intake and review to ensure scientific rigor, source transparency, and operational relevance.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Building2,
                title: 'Institutional Records',
                description: 'Government reports, policy documents, and official monitoring data from state agencies and regulatory bodies.',
                color: 'from-emerald-500/20 to-teal-500/20',
                borderColor: 'border-emerald-500/30',
                textColor: 'text-emerald-400',
              },
              {
                icon: BookOpen,
                title: 'Research Studies',
                description: 'Peer-reviewed publications, university research outputs, and academic assessments from recognized institutions.',
                color: 'from-blue-500/20 to-indigo-500/20',
                borderColor: 'border-blue-500/30',
                textColor: 'text-blue-400',
              },
              {
                icon: FlaskConical,
                title: 'Monitoring Outputs',
                description: 'Continuous sensor data, water quality records, air quality measurements, and automated monitoring system outputs.',
                color: 'from-purple-500/20 to-pink-500/20',
                borderColor: 'border-purple-500/30',
                textColor: 'text-purple-400',
              },
              {
                icon: MapPin,
                title: 'Field Surveys',
                description: 'Primary data from field observations, ecological surveys, species counts, and ground-truthed environmental assessments.',
                color: 'from-amber-500/20 to-orange-500/20',
                borderColor: 'border-amber-500/30',
                textColor: 'text-amber-400',
              },
              {
                icon: Database,
                title: 'Geospatial & Earth Observation',
                description: 'Satellite imagery analysis, GIS datasets, watershed delineations, and remote sensing-derived intelligence products.',
                color: 'from-cyan-500/20 to-blue-500/20',
                borderColor: 'border-cyan-500/30',
                textColor: 'text-cyan-400',
              },
              {
                icon: Users,
                title: 'Reviewed Community-Supported Evidence',
                description: 'Citizen science data and community monitoring records that pass quality validation and methodological review standards.',
                color: 'from-pink-500/20 to-rose-500/20',
                borderColor: 'border-pink-500/30',
                textColor: 'text-pink-400',
              },
            ].map((pathway, i) => (
              <motion.div
                key={pathway.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-6 h-full hover:border-white/20 transition-all">
                  <div className={cn("w-12 h-12 rounded-xl bg-gradient-to-br", pathway.color, "flex items-center justify-center mb-4")}>
                    <pathway.icon className={cn("w-6 h-6", pathway.textColor)} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{pathway.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{pathway.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse Sections */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <div className="space-y-16">
            {/* Browse by Evidence Type */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Browse by Evidence Type</h2>
                  <p className="text-slate-400">Standardized evidence taxonomy</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {evidenceTypes
                  .filter(type => (evidenceTypeCounts[type.id] || 0) > 0)
                  .map((type, i) => (
                    <motion.div
                      key={type.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Card
                        className="glass-intense border-white/10 p-5 text-center cursor-pointer hover:border-indigo-500/30 transition-all group"
                        onClick={() => toggleFilter('evidenceTypes', type.id)}
                      >
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform",
                          filters.evidenceTypes.includes(type.id)
                            ? "bg-indigo-500/20 border border-indigo-500/30"
                            : "bg-gradient-to-br from-indigo-500/20 to-purple-500/20"
                        )}>
                          <type.icon className={cn("w-6 h-6", filters.evidenceTypes.includes(type.id) ? "text-indigo-400" : "text-indigo-400")} />
                        </div>
                        <div className="text-2xl font-bold text-white mb-1">
                          {evidenceTypeCounts[type.id] || 0}
                        </div>
                        <div className="text-sm text-slate-400 mb-1">{type.name}</div>
                        <div className="text-xs text-slate-500 line-clamp-2">{type.description}</div>
                      </Card>
                    </motion.div>
                  ))}
              </div>
              {Object.values(evidenceTypeCounts).filter(c => c > 0).length < evidenceTypes.length && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-slate-500">
                    Showing {Object.values(evidenceTypeCounts).filter(c => c > 0).length} of {evidenceTypes.length} evidence types. Additional types are being added as the library expands.
                  </p>
                </div>
              )}
            </motion.div>

            {/* Browse by Module */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Browse by Module</h2>
                  <p className="text-slate-400">Evidence organized by platform module — click to explore module-specific intelligence</p>
                </div>
                <Button variant="ghost" size="sm" className="text-indigo-400">
                  View All Modules
                </Button>
              </div>
              <BrowseByModule onModuleClick={(moduleId) => toggleFilter('modules', moduleId)} />
            </motion.div>

            {/* Browse by District */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Browse by District</h2>
                  <p className="text-slate-400">Geographically filtered evidence — click any district to view its evidence profile</p>
                </div>
                <Button variant="ghost" size="sm" className="text-indigo-400">
                  View All Districts
                </Button>
              </div>
              <BrowseByDistrict onDistrictClick={(districtId) => toggleFilter('districts', districtId)} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Reports by Entity Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-2">Reports by Entity</h2>
            <p className="text-slate-400">Evidence linked to species, water bodies, protected areas, and geographic entities. Click any entity to filter the library.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {entityTypes.map((entity, i) => {
              const count = getEvidenceByEntityType(entity.id).length;
              return (
                <motion.div
                  key={entity.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Card
                    className={cn(
                      "glass-intense border-white/10 p-4 text-center cursor-pointer hover:border-white/20 transition-all group",
                      entity.bg
                    )}
                    onClick={() => toggleFilter('entities', entity.id)}
                  >
                    <entity.icon className={cn("w-5 h-5 mx-auto mb-2", entity.color)} />
                    <div className="text-lg font-bold text-white mb-1">{count}</div>
                    <div className={cn("text-xs font-medium mb-1", entity.color)}>{entity.name}</div>
                    <Badge variant="outline" size="sm" className={cn("text-xs", entity.border)}>
                      {filters.entities.includes(entity.id) ? 'Filtering' : `${count} items`}
                    </Badge>
                    {count > 0 && (
                      <div className="mt-2">
                        <a
                          href={`/library?entity=${entity.id}`}
                          className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          View All
                        </a>
                      </div>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Methods and Source-Confidence Layer */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-2">Methods & Source Confidence</h2>
            <p className="text-slate-400 max-w-3xl">
              Every evidence item in this library is classified by source type, confidence level, and methodological approach.
              This transparent framework enables scientific rigor, source traceability, and evidence quality assessment.
            </p>
          </motion.div>

          {/* Explanatory Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="glass-intense border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Source Classes
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className={cn("px-2 py-0.5 rounded text-xs font-medium border inline-block mb-1", sourceTypeColors.official)}>
                    {sourceTypeLabels.official}
                  </span>
                  <p className="text-slate-400 text-xs">Government agencies, regulatory bodies, statutory organizations, and institutional reports with formal review and approval processes.</p>
                </div>
                <div>
                  <span className={cn("px-2 py-0.5 rounded text-xs font-medium border inline-block mb-1", sourceTypeColors.academic)}>
                    {sourceTypeLabels.academic}
                  </span>
                  <p className="text-slate-400 text-xs">Peer-reviewed research from universities, academic institutions, and recognized research organizations with methodological transparency and reproducible protocols.</p>
                </div>
                <div>
                  <span className={cn("px-2 py-0.5 rounded text-xs font-medium border inline-block mb-1", sourceTypeColors.field)}>
                    {sourceTypeLabels.field}
                  </span>
                  <p className="text-slate-400 text-xs">Primary field data collected through systematic surveys, monitoring programs, ground observations, and structured data collection by trained personnel.</p>
                </div>
                <div>
                  <span className={cn("px-2 py-0.5 rounded text-xs font-medium border inline-block mb-1", sourceTypeColors.citizen)}>
                    {sourceTypeLabels.citizen}
                  </span>
                  <p className="text-slate-400 text-xs">Community-contributed data and citizen science inputs that pass quality validation, methodological standards, and expert review before inclusion.</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-xs text-slate-500">
                  Full source classification framework: <a href="/about/data-sources" className="text-indigo-400 hover:text-indigo-300">Data Sources</a>.
                </p>
              </div>
            </Card>

            <Card className="glass-intense border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Star className="w-5 h-5" />
                Confidence Levels
              </h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className={cn("px-2 py-0.5 rounded text-xs font-medium inline-block mb-1", confidenceColors.high)}>
                    {confidenceLabels.high}
                  </span>
                  <p className="text-slate-400 text-xs">Peer-reviewed, institutionally validated, or multi-source verified evidence with rigorous methodology, transparent data collection protocols, and independent expert review.</p>
                </div>
                <div>
                  <span className={cn("px-2 py-0.5 rounded text-xs font-medium inline-block mb-1", confidenceColors.medium)}>
                    {confidenceLabels.medium}
                  </span>
                  <p className="text-slate-400 text-xs">Academic or field-collected data with standard methodological review, documented protocols, and transparent analysis methods. May require additional validation for high-stakes applications.</p>
                </div>
                <div>
                  <span className={cn("px-2 py-0.5 rounded text-xs font-medium inline-block mb-1", confidenceColors.low)}>
                    {confidenceLabels.low}
                  </span>
                  <p className="text-slate-400 text-xs">Preliminary findings, single-source observations, or early-stage assessments requiring additional verification and peer review before definitive conclusions.</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-xs text-slate-500">
                  Confidence assessment aligns with our <a href="/about/verification" className="text-indigo-400 hover:text-indigo-300">Verification Model</a>.
                </p>
              </div>
            </Card>

            <Card className="glass-intense border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <FlaskConical className="w-5 h-5" />
                Methodological Approaches
              </h3>
              <div className="space-y-2">
                <p className="text-xs text-slate-400 leading-relaxed">
                  Each evidence item documents the methods, protocols, and analytical frameworks used in data collection and analysis.
                  This enables reproducibility, cross-study comparison, and methodological transparency.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {Array.from(new Set(evidenceRegistry.flatMap(e => e.methods?.map(m => m.methodName) || []))).slice(0, 10).map((method, i) => (
                    <Badge key={i} variant="secondary" size="sm" className="text-xs">
                      <FlaskConical className="w-3 h-3 mr-1" />
                      {method}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-xs text-slate-500">
                  Full methodology documentation: <a href="/about/methodology" className="text-indigo-400 hover:text-indigo-300">Methodology</a>.
                </p>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Source Type Distribution */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="glass-intense border-white/10 p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  Source Type Distribution
                </h3>
                <div className="space-y-3">
                  {(['official', 'academic', 'field', 'citizen'] as EvidenceSourceType[]).map(type => {
                    const count = evidenceRegistry.filter(e => e.sourceType === type).length;
                    const percentage = Math.round((count / evidenceRegistry.length) * 100);
                    return (
                      <div key={type} className="flex items-center gap-3">
                        <span className={cn("px-2 py-0.5 rounded text-xs font-medium border min-w-[120px]", sourceTypeColors[type])}>
                          {sourceTypeLabels[type]}
                        </span>
                        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={cn("h-full rounded-full", type === 'official' ? 'bg-emerald-500' : type === 'academic' ? 'bg-blue-500' : type === 'field' ? 'bg-amber-500' : 'bg-purple-500')}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-slate-400 min-w-[60px] text-right">{count} ({percentage}%)</span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>

            {/* Confidence Level Distribution */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="glass-intense border-white/10 p-6">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Confidence Level Distribution
                </h3>
                <div className="space-y-3">
                  {(['high', 'medium', 'low', 'unverified'] as const).map(level => {
                    const count = evidenceRegistry.filter(e => e.confidence === level).length;
                    const percentage = Math.round((count / evidenceRegistry.length) * 100);
                    return (
                      <div key={level} className="flex items-center gap-3">
                        <span className={cn("px-2 py-0.5 rounded text-xs font-medium min-w-[140px]", confidenceColors[level])}>
                          {confidenceLabels[level]}
                        </span>
                        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={cn("h-full rounded-full", level === 'high' ? 'bg-emerald-500' : level === 'medium' ? 'bg-amber-500' : level === 'low' ? 'bg-orange-500' : 'bg-slate-500')}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm text-slate-400 min-w-[60px] text-right">{count} ({percentage}%)</span>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Methods Used */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <Card className="glass-intense border-white/10 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <FlaskConical className="w-5 h-5" />
                Methods & Protocols in Use
              </h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(evidenceRegistry.flatMap(e => e.methods?.map(m => m.methodName) || []))).slice(0, 12).map((method, i) => (
                  <Badge key={i} variant="secondary" size="sm" className="text-xs">
                    <FlaskConical className="w-3 h-3 mr-1" />
                    {method}
                  </Badge>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Recent Additions */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Recent Additions</h2>
              <p className="text-slate-400">Latest evidence added to the library</p>
            </div>
            <Button variant="outline" className="border-white/20 text-white" icon={<ArrowRight className="w-4 h-4" />}>
              View All
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentEvidence.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <EvidenceCard
                  evidence={item}
                  variant="default"
                  showModuleLinks={true}
                  showRelatedEntities={true}
                  onClick={() => router.push(`/library/${item.id}`)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Module Integration Block */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-2">Evidence in Modules</h2>
            <p className="text-slate-400">See how library evidence is applied across platform modules — each module uses evidence for specific analytical purposes</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {browseByModule.map((module, i) => {
              const evidence = getEvidenceByModule(module.id);
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="glass-intense border-white/10 p-5 cursor-pointer hover:border-purple-500/30 transition-all group">
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Layers className="w-5 h-5 text-purple-400" />
                      </div>
                      <Badge variant="secondary" size="sm">{evidence.length}</Badge>
                    </div>
                    <h3 className="text-base font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">{module.name}</h3>
                    <p className="text-xs text-slate-500 mb-3">Evidence items linked</p>
                    <a
                      href={module.path}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Open Module
                    </a>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <AdvancedFooter />
    </main>
  );
}
