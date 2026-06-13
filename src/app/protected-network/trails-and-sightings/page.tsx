'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Footprints,
  Eye,
  MapPin,
  ArrowRight,
  Search,
  Calendar,
  Map as MapIcon,
  Filter,
  Grid3X3,
  List,
  Shield,
  Activity,
  Camera,
  Link as LinkIcon,
  Database,
  FileText,
  Globe,
  AlertTriangle,
  Info,
  Clock,
  Compass,
  CheckCircle2,
  Users,
  Download
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heading } from '@/components/common/Heading';
import { Pagination } from '@/components/ui/Pagination';
import { Select } from '@/components/ui/Select';
import {
  trailsObservationsData,
  mockObservations,
  verificationLevels,
  observationTypes,
  dataQualityLabels,
  TrailRouteRecord,
  ObservationRecord,
  trailsReportsData
} from '@/data/trails-observations';
import { getReports, getProtectedAreas } from '@/data/protected-network';

const MAIN_TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'trails', label: 'Trails Explorer' },
  { key: 'sightings', label: 'Wildlife Sightings' },
  { key: 'birding', label: 'Birding Routes' },
  { key: 'sites', label: 'Observation Sites' },
  { key: 'traps', label: 'Camera Traps' },
  { key: 'seasonal', label: 'Seasonal Activity' },
  { key: 'citizen', label: 'Citizen Science' },
  { key: 'monitoring', label: 'Monitoring Links' },
  { key: 'spatial', label: 'Spatial Data' },
  { key: 'reports', label: 'Reports' },
] as const;

type MainTabKey = typeof MAIN_TABS[number]['key'];

export default function TrailsAndSightingsPage() {
  const [activeMainTab, setActiveMainTab] = useState<MainTabKey>('overview');
  
  // States for Trails Explorer
  const [activeScopeTab, setActiveScopeTab] = useState<'core' | 'trans' | 'extended'>('core');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedScope, setSelectedScope] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const PAGE_SIZE = 6;
  
  // State for inspecting a specific trail in detail
  const [inspectedTrailId, setInspectedTrailId] = useState<string | null>(null);

  // States for Sightings
  const [sightingsFilterGroup, setSightingsFilterGroup] = useState<string>('all');
  const [sightingsFilterVerify, setSightingsFilterVerify] = useState<string>('all');
  const [observations, setObservations] = useState<ObservationRecord[]>(mockObservations);

  // Citizen Science Form State
  const [obsForm, setObsForm] = useState({
    speciesCommonName: '',
    speciesScientificName: '',
    speciesGroup: 'Mammal',
    district: '',
    observationType: 'Direct Sighting',
    latitude: '',
    longitude: '',
    elevation: '',
    observerName: '',
    observerType: 'Citizen Scientist',
    notes: '',
    evidenceType: 'Geotagged Photo',
    publicVisibility: 'Public',
    photoUrl: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [recentSubmissions, setRecentSubmissions] = useState<ObservationRecord[]>([]);

  const handleGeoLocate = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setObsForm(prev => ({
            ...prev,
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6),
            elevation: position.coords.altitude ? Math.round(position.coords.altitude).toString() : '1585'
          }));
          setFormErrors(prev => {
            const copy = { ...prev };
            delete copy.latitude;
            delete copy.longitude;
            return copy;
          });
        },
        () => {
          const randomLat = (34.08 + Math.random() * 0.2).toFixed(6);
          const randomLng = (74.78 + Math.random() * 0.2).toFixed(6);
          setObsForm(prev => ({
            ...prev,
            latitude: randomLat,
            longitude: randomLng,
            elevation: '1585'
          }));
        }
      );
    }
  };

  const handleObsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    if (!obsForm.speciesCommonName.trim()) errors.speciesCommonName = 'Species name is required';
    if (!obsForm.district.trim()) errors.district = 'District/region is required';
    if (!obsForm.observerName.trim()) errors.observerName = 'Observer name is required';
    
    const latVal = parseFloat(obsForm.latitude);
    const lngVal = parseFloat(obsForm.longitude);
    if (!obsForm.latitude || isNaN(latVal) || latVal < 32.0 || latVal > 37.0) {
      errors.latitude = 'Latitude must be in J&K bounds (32.0 to 37.0)';
    }
    if (!obsForm.longitude || isNaN(lngVal) || lngVal < 72.0 || lngVal > 80.0) {
      errors.longitude = 'Longitude must be in J&K bounds (72.0 to 80.0)';
    }
    if (!obsForm.notes.trim() || obsForm.notes.trim().length < 10) {
      errors.notes = 'Provide notes (minimum 10 characters)';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const newRecord: ObservationRecord = {
      observation_id: `OBS-JK-${Math.floor(100 + Math.random() * 900)}`,
      observation_type: obsForm.observationType as any,
      species_common_name: obsForm.speciesCommonName,
      species_scientific_name: obsForm.speciesScientificName || `${obsForm.speciesCommonName.split(' ')[0] || 'Unidentified'} sp.`,
      species_group: obsForm.speciesGroup as any,
      date: new Date().toISOString().split('T')[0],
      season: 'Summer',
      time_of_day: `Daytime (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`,
      observer_name: obsForm.observerName,
      observer_type: obsForm.observerType,
      verification_status: 'Pending Review',
      evidence_type: obsForm.evidenceType,
      photo_url: obsForm.photoUrl || '/images/default_obs.jpg',
      trail_id: 'citizen-science-inbound',
      route_name: 'Field Sighting',
      protected_area_link: '',
      habitat_type: 'Montane habitat',
      district_or_region: obsForm.district,
      ecological_scope: latVal > 34.5 ? 'Kashmir Core' : 'Trans-Divisional',
      latitude: latVal,
      longitude: lngVal,
      elevation_m: obsForm.elevation ? parseInt(obsForm.elevation) : 1585,
      sensitivity_level: obsForm.speciesGroup === 'Mammal' ? 'High' : 'Moderate',
      public_visibility: obsForm.publicVisibility as any,
      linked_species_profile: '',
      linked_monitoring_record: '',
      linked_report: '',
      notes: obsForm.notes
    };

    setObservations(prev => [newRecord, ...prev]);
    setRecentSubmissions(prev => [newRecord, ...prev]);
    setFormSubmitted(true);
    setObsForm({
      speciesCommonName: '',
      speciesScientificName: '',
      speciesGroup: 'Mammal',
      district: '',
      observationType: 'Direct Sighting',
      latitude: '',
      longitude: '',
      elevation: '',
      observerName: '',
      observerType: 'Citizen Scientist',
      notes: '',
      evidenceType: 'Geotagged Photo',
      publicVisibility: 'Public',
      photoUrl: ''
    });
    setFormErrors({});
    
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };

  const handleDownloadGPS = (e: React.MouseEvent, trailId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (typeof window !== 'undefined') {
      const isRegistered = window.localStorage.getItem('kew_member_registered') === 'true';
      if (isRegistered) {
        alert(`Initiating secure academic download for GPX path "${trailId}"...`);
      } else {
        window.location.href = `/protected-network/trails-and-sightings/request?slug=${trailId}`;
      }
    }
  };

  const handleReportDownload = (e: React.MouseEvent, slug: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (typeof window !== 'undefined') {
      const isRegistered = window.localStorage.getItem('kew_member_registered') === 'true';
      if (isRegistered) {
        alert(`Initiating secure academic download for document "${slug}"...`);
      } else {
        window.location.href = `/protected-network/trails-and-sightings/request?slug=${slug}`;
      }
    }
  };

  const allReports = useMemo(() => {
    return trailsReportsData;
  }, []);

  const filteredReports = useMemo(() => {
    return allReports.filter(report => {
      // 1. Tab scope filter
      const tabScope = activeScopeTab === 'core' ? 'Kashmir Core'
                     : activeScopeTab === 'trans' ? 'Trans-Divisional'
                     : 'Transboundary / Extended';
      
      const scopesOfReport: string[] = [];
      report.linkedAreas.forEach(slug => {
        const pa = getProtectedAreas.bySlug(slug);
        if (pa && pa.scope) scopesOfReport.push(pa.scope);
      });
      if (scopesOfReport.length === 0) scopesOfReport.push('Kashmir Core'); // fallback
      
      const matchesTab = scopesOfReport.includes(tabScope);

      // 2. Search Text
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        report.title.toLowerCase().includes(query) ||
        report.type.toLowerCase().includes(query) ||
        report.description.toLowerCase().includes(query) ||
        report.authors.some(a => a.toLowerCase().includes(query)) ||
        report.linkedAreas.some(slug => slug.replace(/-/g, ' ').toLowerCase().includes(query));

      // 3. District Dropdown
      const districtsOfReport: string[] = [];
      report.linkedAreas.forEach(slug => {
        const pa = getProtectedAreas.bySlug(slug);
        if (pa && pa.district) districtsOfReport.push(pa.district);
      });
      const matchesDistrict = selectedDistrict === 'all' || districtsOfReport.includes(selectedDistrict);

      // 4. Ecological Scope Dropdown
      const matchesScopeDropdown = selectedScope === 'all' || scopesOfReport.includes(selectedScope);

      return matchesTab && matchesSearch && matchesDistrict && matchesScopeDropdown;
    });
  }, [allReports, activeScopeTab, searchQuery, selectedDistrict, selectedScope]);

  // Dynamic districts list from our trail dataset
  const districtsList = useMemo(() => {
    const districts = new Set<string>();
    trailsObservationsData.forEach(t => {
      if (t.district_or_region) districts.add(t.district_or_region);
    });
    return Array.from(districts).sort();
  }, []);

  // Filtered trails for the Explorer tab
  const filteredTrails = useMemo(() => {
    return trailsObservationsData.filter(trail => {
      // 1. Tab scope filter
      const tabScope = activeScopeTab === 'core' ? 'Kashmir Core'
                     : activeScopeTab === 'trans' ? 'Trans-Divisional'
                     : 'Transboundary / Extended';
      const matchesTab = trail.ecological_scope === tabScope;

      // 2. Search Text
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch = !query || 
        trail.trail_name.toLowerCase().includes(query) ||
        trail.route_type.toLowerCase().includes(query) ||
        (trail.field_intelligence && trail.field_intelligence.toLowerCase().includes(query)) ||
        trail.target_species.some(s => s.toLowerCase().includes(query));

      // 3. District Dropdown
      const matchesDistrict = selectedDistrict === 'all' || trail.district_or_region === selectedDistrict;

      // 4. Ecological Scope Dropdown
      const matchesScopeDropdown = selectedScope === 'all' || trail.ecological_scope === selectedScope;

      return matchesTab && matchesSearch && matchesDistrict && matchesScopeDropdown;
    });
  }, [activeScopeTab, searchQuery, selectedDistrict, selectedScope]);

  const totalPages = Math.max(1, Math.ceil(filteredTrails.length / PAGE_SIZE));
  const paginatedTrails = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredTrails.slice(start, start + PAGE_SIZE);
  }, [filteredTrails, currentPage]);

  const scopeToTabMap: Record<string, 'core' | 'trans' | 'extended'> = {
    'Kashmir Core': 'core',
    'Trans-Divisional': 'trans',
    'Transboundary / Extended': 'extended',
  };

  useEffect(() => {
    if (selectedScope !== 'all' && scopeToTabMap[selectedScope]) {
      setActiveScopeTab(scopeToTabMap[selectedScope]);
    }
  }, [selectedScope]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDistrict, selectedScope, activeScopeTab]);

  // Filtered birding routes (specifically categorised as birding or containing bird species)
  const birdingRoutes = useMemo(() => {
    return trailsObservationsData.filter(trail => 
      trail.route_type.toLowerCase().includes('bird') || 
      trail.target_species.some(s => ['kashmir flycatcher', 'pheasant', 'monal', 'snowcock', 'gull', 'goose', 'duck', 'crane'].includes(s.toLowerCase()))
    );
  }, []);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'success';
      case 'Moderate': return 'warning';
      case 'Challenging': return 'danger';
      default: return 'default';
    }
  };

  const getSensitivityColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'critical':
      case 'very high':
        return 'bg-red-500/20 text-red-400 border border-red-500/30';
      case 'high':
        return 'bg-orange-500/20 text-orange-400 border border-orange-500/30';
      case 'moderate':
        return 'bg-amber-500/20 text-amber-400 border border-amber-500/30';
      default:
        return 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
    }
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Heading
        title={<><span className="block whitespace-nowrap">Kashmir Trails and</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Sightings Network</span></>}
        subtitle="Protected-area trails, ecological routes, birding paths, wildlife observation zones, and verified field sightings across Kashmir Core, Trans-Divisional, and Transboundary conservation landscapes. Integrates species observations, seasonal activity, visitor-use pressure, monitoring evidence, and protected-area profile links."
        icon={<Footprints className="w-6 h-6 text-emerald-400" />}
        label="Recreation & Observation"
        breadcrumbs={[{ label: 'Trails & Sightings' }]}
        images={['/images/protected-network.png', '/images/bear.png', '/images/tiger.png', '/images/markhor.png']}
        actions={
          <>
            <Button className="bg-gradient-to-r from-emerald-600 to-emerald-500" icon={<Activity className="w-5 h-5" />} onClick={() => setActiveMainTab('citizen')}>
              Log Field Observation
            </Button>
            <Button variant="outline" className="border-white/20 text-white" icon={<Database className="w-5 h-5" />} onClick={() => setActiveMainTab('spatial')}>
              Spatial Layers
            </Button>
          </>
        }
      />

      {/* KPI Dashboard */}
      <div className="container mx-auto px-6 -mt-8 relative z-20 mb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass-intense border-white/10 p-4 lg:p-5" padding="none">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
              {[
                { label: 'Trail & Route Records', value: '300+', icon: Footprints },
                { label: 'Observation Sites', value: '250+', icon: Compass },
                { label: 'Verified Sightings', value: '50,000+', icon: CheckCircle2 },
                { label: 'Bird Obs Records', value: '100,000+', icon: Eye },
                { label: 'Species Recorded', value: '1,500+', icon: Shield },
                { label: 'Protected Areas Linked', value: '80+', icon: LinkIcon },
                { label: 'Field Contributors', value: '1,000+', icon: Users },
                { label: 'Monitoring Routes', value: '100+', icon: Activity },
              ].map((metric, idx) => (
                <div key={idx} className="py-2 px-1 lg:py-3 lg:px-2 rounded-xl text-center min-w-0 bg-white/5 border border-white/5 shadow-inner">
                  <metric.icon className="w-4 h-4 text-emerald-500 mx-auto mb-1" />
                  <div className="text-sm sm:text-base lg:text-base xl:text-lg font-bold text-white tabular-nums leading-tight truncate">
                    {metric.value}
                  </div>
                  <div className="text-[9px] sm:text-[10px] lg:text-[9px] xl:text-[10px] text-slate-400 uppercase tracking-wide mt-0.5 leading-tight break-words">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Main Scientific Tabs navigation */}
      <div className="container mx-auto px-6 mb-6">
        <div className="flex flex-wrap gap-2 p-1.5 glass-intense border border-white/10 rounded-2xl overflow-x-auto scrollbar-hide">
          {MAIN_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveMainTab(tab.key);
                setInspectedTrailId(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all whitespace-nowrap ${
                activeMainTab === tab.key
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Rendering based on Tab */}
      <div className="container mx-auto px-6 py-6 min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMainTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
          >
            {/* OVERVIEW TAB */}
            {activeMainTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Card 1: Summary */}
                  <Card className="border border-white/10 bg-white/5 text-white p-6 h-full flex flex-col justify-between" padding="none">
                    <div>
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-emerald-400" />
                        Observation Platform Summary
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed mb-4">
                        The Kashmir Trails and Sightings Network functions as a high-fidelity spatial database designed to record, audit, and analyze wildlife movement and biodiversity indexes across the Himalayan region. Built specifically for conservation ecologists, forest management divisions, and research groups, the system tracks ecological corridors and indicator species population trends.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                          <h4 className="font-semibold text-emerald-400 text-sm mb-1">Active Observation Modalities</h4>
                          <p className="text-xs text-slate-400 leading-normal">
                            Direct sight logs, camera trap indices, environmental audio recordings, tracks/signs matching, and nesting surveys.
                          </p>
                        </div>
                        <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                          <h4 className="font-semibold text-emerald-400 text-sm mb-1">Taxonomic Indexes Supported</h4>
                          <p className="text-xs text-slate-400 leading-normal">
                            Strict coverage of Himalayan mammals, alpine avifauna checklists, endemic plant phenology records, and riverine macroinvertebrates.
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Card 2: eBird Integration */}
                  <Card className="border border-white/10 bg-white/5 text-white p-6 h-full flex flex-col justify-between" padding="none">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400">
                        <Globe className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-white">eBird Global Database Integration</h3>
                          <Badge variant="info">Future Core Feed</Badge>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed mt-2 mb-4">
                          To scale avian observation logging, we are integrating eBird API connectivity. eBird is the world’s largest biodiversity-related citizen science project, capturing billions of bird-record datapoints globally. By syncing, Kashmir field observers can import eBird checklists directly, aligning local tracking with global scientific standards for research, education, and avian conservation.
                        </p>
                        <div className="flex flex-wrap gap-4 text-xs text-emerald-400/90 font-medium">
                          <span>• eBird API Sync Ready</span>
                          <span>• Global Flyway Alignments</span>
                          <span>• Automated Checklist Imports</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Card 3: Verification Levels */}
                  <Card className="border border-white/10 bg-white/5 text-white p-6 h-full flex flex-col justify-between" padding="none">
                    <div>
                      <h3 className="text-base font-bold mb-4 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-emerald-400" />
                        Verification Levels
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                        {verificationLevels.map((vl, idx) => (
                          <div key={idx} className="text-xs bg-white/5 p-3 rounded-xl border border-white/5">
                            <span className="font-semibold text-white block mb-0.5">{vl.label}</span>
                            <span className="text-slate-400 leading-normal">{vl.meaning}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>

                  {/* Card 4: Camera Traps status */}
                  <Card className="border border-white/10 bg-white/5 text-white p-6 h-full flex flex-col justify-between" padding="none">
                    <div>
                      <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                        <Camera className="w-4 h-4 text-emerald-400" />
                        Camera Trapping Feeds
                      </h3>
                      <p className="text-slate-400 text-xs leading-normal mb-4">
                        Real-time status of motion-activated camera arrays mapping sensitive wildlife corridors.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-xs">
                          <span className="text-slate-400 block mb-1">CT-DC-01 (Dachigam)</span>
                          <span className="text-emerald-400 font-semibold">ONLINE</span>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-xs">
                          <span className="text-slate-400 block mb-1">CT-HP-03 (Hirpora)</span>
                          <span className="text-emerald-400 font-semibold">ONLINE</span>
                        </div>
                        <div className="p-3 rounded-lg bg-white/5 border border-white/5 text-xs">
                          <span className="text-slate-400 block mb-1">CT-KHT-09 (Kishtwar)</span>
                          <span className="text-amber-400 font-semibold">MAINTENANCE</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {/* TRAILS EXPLORER TAB */}
            {activeMainTab === 'trails' && (
              <div className="space-y-6">
                {/* 3 Scope Tabs + Filter Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 p-1 glass-intense border border-white/10 rounded-xl">
                    {[
                      { key: 'core', label: 'Kashmir Core' },
                      { key: 'trans', label: 'Trans-Divisional' },
                      { key: 'extended', label: 'Transboundary / Extended' }
                    ].map(tab => (
                      <button
                        key={tab.key}
                        onClick={() => {
                          setActiveScopeTab(tab.key as any);
                          setSelectedScope(tab.label);
                          setInspectedTrailId(null);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                          activeScopeTab === tab.key
                            ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 ml-auto">
                    <Button variant="outline" size="sm" className="border-white/20 text-white" icon={<Filter className="w-4 h-4" />} onClick={() => setShowFilters(f => !f)}>
                      {showFilters ? 'Hide Filters' : 'Filters'}
                    </Button>
                    <span className="text-xs text-slate-400 whitespace-nowrap">
                      <strong className="text-white">{filteredTrails.length}</strong> of <strong className="text-white">{trailsObservationsData.length}</strong> routes
                    </span>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400'} icon={<Grid3X3 className="w-4 h-4" />} />
                      <Button variant="ghost" size="sm" onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400'} icon={<List className="w-4 h-4" />} />
                    </div>
                  </div>
                </div>

                {/* Toggleable Drawer Filters */}
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 glass-intense border border-white/10 rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                  >
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Search Text</label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="text"
                          placeholder="Search trail name, target species..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">District / Region</label>
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
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Ecological Scope</label>
                      <Select
                        value={selectedScope}
                        onChange={setSelectedScope}
                        options={[
                          { value: 'all', label: 'All Scopes' },
                          ...['Kashmir Core', 'Trans-Divisional', 'Transboundary / Extended'].map(s => ({ value: s, label: s })),
                        ]}
                        placeholder="All Scopes"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Inspected Trail Panel (Detailed View) */}
                {inspectedTrailId && (
                  <Card className="border border-emerald-500/30 bg-white/5 text-white p-6 relative" padding="none">
                    <button
                      className="absolute top-4 right-4 text-slate-400 hover:text-white text-xs font-bold bg-white/5 px-2.5 py-1 rounded"
                      onClick={() => setInspectedTrailId(null)}
                    >
                      Close Details
                    </button>
                    {(() => {
                      const t = trailsObservationsData.find(tr => tr.trail_id === inspectedTrailId);
                      if (!t) return null;
                      return (
                        <div className="space-y-4">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <Badge variant="info">{t.route_type}</Badge>
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${getSensitivityColor(t.habitat_sensitivity)}`}>
                                Sensitivity: {t.habitat_sensitivity}
                              </span>
                              <Badge variant="default">{t.data_quality}</Badge>
                            </div>
                            <h3 className="text-2xl font-bold text-white">{t.trail_name}</h3>
                            <p className="text-xs text-slate-400 mt-0.5">District/Region: <strong className="text-white">{t.district_or_region}</strong> | Linked Protected Area: <strong className="text-white">{t.linked_protected_area}</strong></p>
                          </div>

                          {t.field_intelligence && (
                            <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-sm leading-relaxed text-slate-200">
                              <h4 className="font-semibold text-emerald-400 text-xs uppercase tracking-wider mb-2">Field Intelligence</h4>
                              {t.field_intelligence}
                            </div>
                          )}

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                            <div className="space-y-2">
                              <div>
                                <span className="text-slate-400 block">Primary Target Species:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {t.target_species.map((s, idx) => (
                                    <span key={idx} className="bg-white/5 px-2 py-0.5 rounded text-slate-200 border border-white/5">{s}</span>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <span className="text-slate-400 block">Monitoring Route Elements:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {(t.routes || [t.trail_name]).map((r, idx) => (
                                    <span key={idx} className="bg-emerald-500/10 px-2 py-0.5 rounded text-emerald-300 border border-emerald-500/10">{r}</span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <span className="text-slate-400 block">Est. Length:</span>
                                  <strong className="text-white text-sm">{t.estimated_length_km} km</strong>
                                </div>
                                <div>
                                  <span className="text-slate-400 block">Elevation Range:</span>
                                  <strong className="text-white text-sm">{t.elevation_min_m}m - {t.elevation_max_m}m</strong>
                                </div>
                                <div>
                                  <span className="text-slate-400 block">Permit:</span>
                                  <strong className="text-white text-sm">{t.permit_required ? 'Required' : 'None'}</strong>
                                </div>
                                <div>
                                  <span className="text-slate-400 block">Visitor Use Pressure:</span>
                                  <strong className="text-white text-sm">{t.visitor_pressure}</strong>
                                </div>
                              </div>
                              <div>
                                <span className="text-slate-400 block">Monitoring Status:</span>
                                <span className="text-emerald-400 font-semibold">{t.monitoring_status}</span>
                              </div>
                              <div className="pt-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full border-white/20 text-white hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-colors"
                                  icon={<Download className="w-4 h-4" />}
                                  onClick={(e) => handleDownloadGPS(e, t.trail_id)}
                                >
                                  Download GPX / Spatial Data
                                </Button>
                              </div>
                            </div>
                          </div>

                          {t.highlights && t.highlights.length > 0 && (
                            <div>
                              <span className="text-xs text-slate-400 block mb-1.5 uppercase tracking-wider font-semibold">Key Highlights Mapped</span>
                              <div className="flex flex-wrap gap-2">
                                {t.highlights.map((h, idx) => (
                                  <span key={idx} className="text-xs bg-amber-500/10 text-amber-400 px-3 py-1 rounded-lg border border-amber-500/20 font-medium">
                                    ★ {h}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </Card>
                )}

                {/* Trails Grid/List Render */}
                {filteredTrails.length > 0 ? (
                  <>
                  <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 xl:gap-6' : 'space-y-4'}>
                    {paginatedTrails.map((trail, index) => (
                      <motion.div
                        key={trail.trail_id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className={`${viewMode === 'grid' ? 'h-full flex flex-col' : ''} block cursor-pointer`}
                        onClick={() => setInspectedTrailId(trail.trail_id)}
                      >
                        <Card className={`${viewMode === 'grid' ? 'h-full flex flex-col justify-between' : ''} card-intelligence border border-white/10 bg-white/5 hover:border-emerald-500/30 transition-all duration-300`} padding="lg">
                          <div>
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex flex-wrap items-center gap-1.5">
                                <Badge variant="info" className="text-[10px] py-0.5">{trail.route_type.split(' ')[0]}</Badge>
                                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${getSensitivityColor(trail.habitat_sensitivity)}`}>
                                  Sens: {trail.habitat_sensitivity}
                                </span>
                              </div>
                              <Badge variant={getDifficultyColor(trail.difficulty)} size="sm">{trail.difficulty}</Badge>
                            </div>
                            
                            <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">{trail.trail_name}</h3>
                            <p className="text-xs text-slate-400 mb-2 truncate">District: {trail.district_or_region} | {trail.linked_protected_area}</p>

                            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 mb-3 bg-white/5 p-2 rounded-lg">
                              <span>Length: <strong className="text-white">{trail.estimated_length_km} km</strong></span>
                              <span>Elev: <strong className="text-white">{trail.elevation_min_m}m - {trail.elevation_max_m}m</strong></span>
                              <span>Permit: <strong className="text-white">{trail.permit_required ? 'Required' : 'No'}</strong></span>
                              <span>Pressure: <strong className="text-white">{trail.visitor_pressure}</strong></span>
                            </div>

                            <div className="mb-2">
                              <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-1">Target Species</span>
                              <div className="flex flex-wrap gap-1">
                                {trail.target_species.slice(0, 3).map((s, sidx) => (
                                  <span key={sidx} className="bg-white/5 px-1.5 py-0.5 text-[10px] rounded text-slate-300 truncate">{s}</span>
                                ))}
                                {trail.target_species.length > 3 && (
                                  <span className="bg-white/5 px-1.5 py-0.5 text-[10px] rounded text-slate-500 font-bold">+{trail.target_species.length - 3}</span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 pt-3 border-t border-white/[0.06] flex items-center justify-between">
                            <button
                              onClick={(e) => handleDownloadGPS(e, trail.trail_id)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded bg-white/5 hover:bg-emerald-500/10 text-slate-300 hover:text-emerald-400 border border-white/10 hover:border-emerald-500/30 transition-all"
                            >
                              <Download className="w-3.5 h-3.5 text-emerald-500" />
                              GPX
                            </button>
                            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold hover:text-emerald-300 transition-colors">
                              Inspect Field Intel
                              <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    totalItems={filteredTrails.length}
                    pageSize={PAGE_SIZE}
                  />
                </>
                ) : (
                  <div className="text-center py-20 bg-white/5 rounded-xl border border-white/5">
                    <Shield className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-white">No scientific routes found</h3>
                    <p className="text-slate-400 text-xs mb-4">Try relaxing search parameters</p>
                    <Button variant="outline" className="border-white/20 text-white" onClick={() => {
                      setSearchQuery('');
                      setSelectedDistrict('all');
                      setSelectedScope('all');
                    }}>Reset Search Filters</Button>
                  </div>
                )}
              </div>
            )}

            {/* WILDLIFE SIGHTINGS TAB */}
            {activeMainTab === 'sightings' && (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-400">Class:</span>
                    <div className="flex gap-1.5">
                      {['all', 'Mammal', 'Bird', 'Reptile'].map(grp => (
                        <button
                          key={grp}
                          onClick={() => setSightingsFilterGroup(grp)}
                          className={`text-xs px-2.5 py-1 rounded-md transition-all ${
                            sightingsFilterGroup === grp
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {grp === 'all' ? 'All Groups' : grp}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-auto">
                    <span className="text-xs font-semibold text-slate-400">Verification:</span>
                    <select
                      value={sightingsFilterVerify}
                      onChange={(e) => setSightingsFilterVerify(e.target.value)}
                      className="text-xs bg-white/5 border border-white/10 text-white rounded px-2 py-1 focus:outline-none"
                    >
                      <option value="all">All Levels</option>
                      <option value="Verified">Verified Only</option>
                      <option value="Staff Confirmed">Staff Confirmed</option>
                      <option value="Community Confirmed">Community Confirmed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {observations
                    .filter(obs => sightingsFilterGroup === 'all' || obs.species_group === sightingsFilterGroup)
                    .filter(obs => sightingsFilterVerify === 'all' || obs.verification_status === sightingsFilterVerify)
                    .map((obs, index) => (
                      <motion.div
                        key={obs.observation_id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Card className="border border-white/10 bg-white/5 text-white p-5" padding="none">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-mono text-emerald-400">{obs.observation_id}</span>
                                <Badge variant="info" className="text-[9px]">{obs.observation_type}</Badge>
                                <span className="bg-emerald-500/20 text-emerald-400 text-[9px] px-2 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
                                  {obs.verification_status}
                                </span>
                              </div>
                              <h3 className="text-lg font-bold text-white mt-1">{obs.species_common_name}</h3>
                              <p className="text-xs text-slate-400 italic">{obs.species_scientific_name}</p>
                            </div>
                          </div>

                          <p className="text-xs text-slate-300 bg-white/5 p-3 rounded-lg leading-relaxed mb-4">
                            {obs.notes}
                          </p>

                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[11px] text-slate-400">
                            <span>Observer: <strong className="text-slate-200">{obs.observer_name}</strong></span>
                            <span>Season: <strong className="text-slate-200">{obs.season} | {obs.time_of_day}</strong></span>
                            <span>Location: <strong className="text-slate-200">{obs.district_or_region} ({obs.elevation_m}m)</strong></span>
                            <span>Scope: <strong className="text-slate-200">{obs.ecological_scope}</strong></span>
                          </div>

                          <div className="mt-4 pt-3 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-500">
                            <span>Coords: {obs.latitude.toFixed(3)}°N, {obs.longitude.toFixed(3)}°E ({obs.public_visibility})</span>
                            <span className="text-emerald-400 font-semibold cursor-pointer hover:underline">Inspect Metadata ↗</span>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                </div>
              </div>
            )}

            {/* BIRDING ROUTES TAB */}
            {activeMainTab === 'birding' && (
              <div className="space-y-6">
                <Card className="border border-white/10 bg-white/5 text-white p-6" padding="none">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-2">
                    <Globe className="w-5 h-5 text-emerald-400" />
                    Kashmir Avian Migration & Breeding Route Monitoring
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    This module tracks avian nesting, migration pathways, and breeding routes, specifically targeting endemic species like the **Kashmir Flycatcher** and alpine indicators like the **Himalayan Monal**. Integrated with bird conservation registries.
                  </p>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {birdingRoutes.map((route, idx) => (
                    <motion.div
                      key={route.trail_id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Card className="border border-white/10 bg-white/5 p-5 h-full flex flex-col" padding="none">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="info">{route.route_type}</Badge>
                            <span className="text-xs text-emerald-400 font-semibold">{route.seasonal_window}</span>
                          </div>
                          <h4 className="text-base font-bold text-white">{route.trail_name}</h4>
                          <p className="text-xs text-slate-400 mb-3">{route.district_or_region} | {route.linked_protected_area}</p>
                          <p className="text-xs text-slate-300 bg-white/5 p-3 rounded-lg leading-relaxed mb-4">
                            {route.field_intelligence}
                          </p>
                        </div>
                        <div className="mt-auto pt-3 border-t border-white/[0.06]">
                          <span className="text-[10px] text-slate-500 block mb-1">Target Avian Species</span>
                          <div className="flex flex-wrap gap-1">
                            {route.target_species.map((s, sidx) => (
                              <span key={sidx} className="bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded text-[10px] border border-emerald-500/10 font-medium">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* OBSERVATION SITES TAB */}
            {activeMainTab === 'sites' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {trailsObservationsData.filter(t => t.route_type.toLowerCase().includes('network') || t.route_type.toLowerCase().includes('system')).map((site, idx) => (
                    <Card key={idx} className="border border-white/10 bg-white/5 p-5 flex flex-col justify-between" padding="none">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="default">Observation Site</Badge>
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${getSensitivityColor(site.habitat_sensitivity)}`}>
                            {site.habitat_sensitivity}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white">{site.trail_name}</h4>
                        <p className="text-xs text-slate-400 mb-3">{site.district_or_region}</p>
                        <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                          {site.field_intelligence}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-white/[0.06] text-[11px] text-slate-400 space-y-1">
                        <div>Visitor Pressure: <span className="text-amber-400 font-bold">{site.visitor_pressure}</span></div>
                        <div>Elevation: <span className="text-white">{site.elevation_min_m}m - {site.elevation_max_m}m</span></div>
                        <div>Modality: <span className="text-emerald-400 font-semibold">{site.monitoring_status}</span></div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* CAMERA TRAPS TAB */}
            {activeMainTab === 'traps' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { id: 'CAM-DT-01', location: 'Lower Dachigam', status: 'Online', battery: '84%', triggers: 1242, target: 'Hangul / Black Bear' },
                    { id: 'CAM-DT-04', location: 'Dagwan River Upper', status: 'Online', battery: '92%', triggers: 341, target: 'Musk Deer / Leopard' },
                    { id: 'CAM-HP-03', location: 'Hirpora Cliff Pass', status: 'Online', battery: '78%', triggers: 512, target: 'Markhor' },
                    { id: 'CAM-KHT-09', location: 'Renai Catchment', status: 'Maintenance', battery: '12%', triggers: 3108, target: 'Snow Leopard / Ibex' },
                    { id: 'CAM-DEO-02', location: 'Sheosar Meadow', status: 'Online', battery: '90%', triggers: 94, target: 'Brown Bear / Marmot' },
                    { id: 'CAM-SHM-01', location: 'Shimshal Gorge', status: 'Online', battery: '82%', triggers: 412, target: 'Snow Leopard' },
                  ].map((ct, idx) => (
                    <Card key={idx} className="border border-white/10 bg-white/5 p-4 text-white" padding="none">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs text-emerald-400 font-bold">{ct.id}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          ct.status === 'Online' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {ct.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm mb-1">{ct.location}</h4>
                      <div className="space-y-1 text-xs text-slate-400 mt-3">
                        <div className="flex justify-between"><span>Battery Level:</span><strong className="text-slate-200">{ct.battery}</strong></div>
                        <div className="flex justify-between"><span>Capture Triggers:</span><strong className="text-slate-200">{ct.triggers}</strong></div>
                        <div className="flex justify-between"><span>Target Species:</span><strong className="text-emerald-400">{ct.target}</strong></div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* SEASONAL ACTIVITY TAB */}
            {activeMainTab === 'seasonal' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  {[
                    { season: 'Spring (April - June)', active: 'Hangul calving activity in Dachigam lower valleys; Kashmir Flycatcher breeding nest constructions across Aru Valley & Zabarwan.' },
                    { season: 'Summer (July - September)', active: 'High altitude alpine pasture grazing (Hangul, Ibex, Markhor); Black-necked Crane nesting in Changthang wetlands (Ladakh).' },
                    { season: 'Autumn (October - November)', active: 'Himalayan Brown Bear intensive foraging prior to hibernation; Raptor migration passes along the Pir Panjal corridors; early winter waterfowl arrivals.' },
                    { season: 'Winter (December - March)', active: 'Mass Siberian & Central Asian waterfowl staging at Hokersar, Shallabugh, and Wular wetlands; Markhor and snow leopards descend to gorge floors.' },
                  ].map((sa, idx) => (
                    <Card key={idx} className="border border-white/10 bg-white/5 p-5" padding="none">
                      <h4 className="font-bold text-base text-emerald-400 mb-2 flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {sa.season}
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">{sa.active}</p>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* CITIZEN SCIENCE TAB */}
            {activeMainTab === 'citizen' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Submit Observation Form */}
                  <Card className="border border-white/10 bg-white/5 p-6 text-white" padding="none">
                    <form onSubmit={handleObsSubmit} className="space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">Submit Field Observation Record</h3>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed">
                          Log verified wildlife or plant records. Submissions are pushed to the regional verification pipeline.
                        </p>
                      </div>

                      {formSubmitted && (
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-400 text-xs flex items-center gap-2 animate-fadeIn">
                          <CheckCircle2 className="w-4 h-4 shrink-0" />
                          <span>Record submitted to the local verification queue successfully!</span>
                        </div>
                      )}

                      <div className="space-y-3 text-xs">
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-slate-400 mb-1">Species Common Name *</label>
                            <input 
                              type="text" 
                              placeholder="e.g. Hangul" 
                              value={obsForm.speciesCommonName}
                              onChange={(e) => setObsForm(prev => ({ ...prev, speciesCommonName: e.target.value }))}
                              className={`w-full p-2 rounded bg-slate-950 border ${formErrors.speciesCommonName ? 'border-red-500/50' : 'border-white/10'} text-white outline-none focus:border-emerald-500/50`}
                            />
                            {formErrors.speciesCommonName && (
                              <span className="text-[10px] text-red-400 mt-1 block">{formErrors.speciesCommonName}</span>
                            )}
                          </div>
                          <div>
                            <label className="block text-slate-400 mb-1">Species Scientific Name (Optional)</label>
                            <input 
                              type="text" 
                              placeholder="e.g. Cervus hanglu" 
                              value={obsForm.speciesScientificName}
                              onChange={(e) => setObsForm(prev => ({ ...prev, speciesScientificName: e.target.value }))}
                              className="w-full p-2 rounded bg-slate-950 border border-white/10 text-white outline-none focus:border-emerald-500/50"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-slate-400 mb-1">Species Group</label>
                            <select 
                              value={obsForm.speciesGroup}
                              onChange={(e) => setObsForm(prev => ({ ...prev, speciesGroup: e.target.value }))}
                              className="w-full p-2 rounded bg-slate-950 border border-white/10 text-white outline-none"
                            >
                              <option>Mammal</option>
                              <option>Bird</option>
                              <option>Plant</option>
                              <option>Reptile</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-slate-400 mb-1">Observation Type</label>
                            <select 
                              value={obsForm.observationType}
                              onChange={(e) => setObsForm(prev => ({ ...prev, observationType: e.target.value }))}
                              className="w-full p-2 rounded bg-slate-950 border border-white/10 text-white outline-none"
                            >
                              {observationTypes.map(ot => <option key={ot}>{ot}</option>)}
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-slate-400 mb-1">District / Region *</label>
                            <input 
                              type="text" 
                              placeholder="e.g. Srinagar" 
                              value={obsForm.district}
                              onChange={(e) => setObsForm(prev => ({ ...prev, district: e.target.value }))}
                              className={`w-full p-2 rounded bg-slate-950 border ${formErrors.district ? 'border-red-500/50' : 'border-white/10'} text-white outline-none focus:border-emerald-500/50`}
                            />
                            {formErrors.district && (
                              <span className="text-[10px] text-red-400 mt-1 block">{formErrors.district}</span>
                            )}
                          </div>
                          <div>
                            <label className="block text-slate-400 mb-1">Evidence Type</label>
                            <select 
                              value={obsForm.evidenceType}
                              onChange={(e) => setObsForm(prev => ({ ...prev, evidenceType: e.target.value }))}
                              className="w-full p-2 rounded bg-slate-950 border border-white/10 text-white outline-none"
                            >
                              <option value="Geotagged Photo">Geotagged Photo</option>
                              <option value="Audio Recording">Audio Recording</option>
                              <option value="Tracks/Scat/Signs">Tracks/Scat/Signs</option>
                              <option value="Visual Confirmation">Visual Confirmation</option>
                              <option value="Specimen Sample">Specimen Sample</option>
                            </select>
                          </div>
                        </div>

                        {/* Coordinates Field */}
                        <div className="p-3 rounded-lg bg-slate-950 border border-white/5 space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                              GPS Coordinates *
                            </span>
                            <button 
                              type="button" 
                              onClick={handleGeoLocate}
                              className="px-2.5 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 font-semibold border border-emerald-500/20 flex items-center gap-1 transition-colors"
                            >
                              <Compass className="w-3 h-3" />
                              Auto-Locate
                            </button>
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <label className="block text-slate-500 mb-0.5 text-[9px] uppercase tracking-wider">Latitude (°N)</label>
                              <input 
                                type="text" 
                                placeholder="e.g. 34.1450" 
                                value={obsForm.latitude}
                                onChange={(e) => setObsForm(prev => ({ ...prev, latitude: e.target.value }))}
                                className={`w-full p-2 rounded bg-slate-900 border ${formErrors.latitude ? 'border-red-500/40' : 'border-white/5'} text-white outline-none focus:border-emerald-500/50`}
                              />
                            </div>
                            <div>
                              <label className="block text-slate-500 mb-0.5 text-[9px] uppercase tracking-wider">Longitude (°E)</label>
                              <input 
                                type="text" 
                                placeholder="e.g. 75.0420" 
                                value={obsForm.longitude}
                                onChange={(e) => setObsForm(prev => ({ ...prev, longitude: e.target.value }))}
                                className={`w-full p-2 rounded bg-slate-900 border ${formErrors.longitude ? 'border-red-500/40' : 'border-white/5'} text-white outline-none focus:border-emerald-500/50`}
                              />
                            </div>
                            <div>
                              <label className="block text-slate-500 mb-0.5 text-[9px] uppercase tracking-wider">Elevation (m)</label>
                              <input 
                                type="text" 
                                placeholder="e.g. 1850" 
                                value={obsForm.elevation}
                                onChange={(e) => setObsForm(prev => ({ ...prev, elevation: e.target.value }))}
                                className="w-full p-2 rounded bg-slate-900 border border-white/5 text-white outline-none focus:border-emerald-500/50"
                              />
                            </div>
                          </div>
                          {(formErrors.latitude || formErrors.longitude) && (
                            <span className="text-[10px] text-red-400 block">{formErrors.latitude || formErrors.longitude}</span>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-slate-400 mb-1">Observer Name *</label>
                            <input 
                              type="text" 
                              placeholder="Your full name" 
                              value={obsForm.observerName}
                              onChange={(e) => setObsForm(prev => ({ ...prev, observerName: e.target.value }))}
                              className={`w-full p-2 rounded bg-slate-950 border ${formErrors.observerName ? 'border-red-500/50' : 'border-white/10'} text-white outline-none focus:border-emerald-500/50`}
                            />
                            {formErrors.observerName && (
                              <span className="text-[10px] text-red-400 mt-1 block">{formErrors.observerName}</span>
                            )}
                          </div>
                          <div>
                            <label className="block text-slate-400 mb-1">Observer Class</label>
                            <select 
                              value={obsForm.observerType}
                              onChange={(e) => setObsForm(prev => ({ ...prev, observerType: e.target.value }))}
                              className="w-full p-2 rounded bg-slate-950 border border-white/10 text-white outline-none"
                            >
                              <option value="Citizen Scientist">Citizen Scientist</option>
                              <option value="Registered Ranger">Registered Ranger</option>
                              <option value="Research Wildlife Biologist">Research Biologist</option>
                              <option value="University Student">University Student</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-slate-400 mb-1">Geographic Masking</label>
                            <select 
                              value={obsForm.publicVisibility}
                              onChange={(e) => setObsForm(prev => ({ ...prev, publicVisibility: e.target.value }))}
                              className="w-full p-2 rounded bg-slate-950 border border-white/10 text-white outline-none"
                            >
                              <option value="Public">Public (Exact coordinates)</option>
                              <option value="Generalized">Generalized (Fuzzed for safety)</option>
                              <option value="Hidden">Hidden (Critical species only)</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-slate-400 mb-1">Reference Image URL (Optional)</label>
                            <input 
                              type="text" 
                              placeholder="e.g. /images/obs_1.jpg" 
                              value={obsForm.photoUrl}
                              onChange={(e) => setObsForm(prev => ({ ...prev, photoUrl: e.target.value }))}
                              className="w-full p-2 rounded bg-slate-950 border border-white/10 text-white outline-none focus:border-emerald-500/50"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-slate-400 mb-1">Observation Notes & Description *</label>
                          <textarea 
                            rows={3} 
                            placeholder="Describe numbers, age, gender, behaviors, or habitat signs observed..." 
                            value={obsForm.notes}
                            onChange={(e) => setObsForm(prev => ({ ...prev, notes: e.target.value }))}
                            className={`w-full p-2 rounded bg-slate-950 border ${formErrors.notes ? 'border-red-500/50' : 'border-white/10'} text-white outline-none focus:border-emerald-500/50 resize-none`}
                          />
                          {formErrors.notes && (
                            <span className="text-[10px] text-red-400 mt-1 block">{formErrors.notes}</span>
                          )}
                        </div>
                      </div>

                      <Button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 shadow-md shadow-emerald-500/20 mt-2">
                        Submit Sighting to Verification Queue
                      </Button>
                    </form>
                  </Card>

                  {/* Verification Queue & eBird Info */}
                  <div className="space-y-6 flex flex-col justify-between h-full">
                    {/* Live Verification Queue widget */}
                    <Card className="border border-white/10 bg-white/5 p-6 text-white flex-1" padding="none">
                      <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                        <Shield className="w-5 h-5 text-emerald-400" />
                        Live Verification Pipeline
                      </h3>
                      <p className="text-xs text-slate-400 mb-4 leading-normal font-medium">
                        To maintain high database standards, inbound citizen science records must pass the local validation checks before listing publicly.
                      </p>

                      <div className="space-y-4">
                        {recentSubmissions.length === 0 ? (
                          <div className="border border-dashed border-white/10 rounded-xl p-6 text-center text-slate-500 flex flex-col items-center justify-center min-h-[180px]">
                            <Clock className="w-8 h-8 text-slate-600 mb-2 animate-pulse" />
                            <h4 className="text-xs font-semibold text-slate-400">Queue is Empty</h4>
                            <p className="text-[10px] max-w-xs mt-1 leading-relaxed">
                              Your submitted sightings during this session will appear here in real-time as they go through classification checks.
                            </p>
                          </div>
                        ) : (
                          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                            <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold">Live Session Inbound ({recentSubmissions.length})</span>
                            {recentSubmissions.map((sub) => (
                              <div key={sub.observation_id} className="p-3.5 rounded-lg bg-slate-950 border border-white/5 space-y-2">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="text-sm font-bold text-white">{sub.species_common_name}</h4>
                                    <span className="text-[9px] text-slate-500 font-mono">{sub.observation_id} • {sub.observation_type}</span>
                                  </div>
                                  <span className="px-2 py-0.5 rounded-full text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 font-semibold animate-pulse">
                                    In Review
                                  </span>
                                </div>

                                <div className="space-y-1.5 pt-1.5 border-t border-white/[0.06] text-[10px]">
                                  <div className="flex justify-between">
                                    <span className="text-slate-500">Quality Checks:</span>
                                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                                      GPS & Date Verified
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-500">Taxonomy Audit:</span>
                                    <span className="text-slate-400">Awaiting expert review</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-500">Regional Queue Pos:</span>
                                    <strong className="text-white">#12 in division</strong>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </Card>

                    {/* eBird Integration Status */}
                    <Card className="border border-white/10 bg-white/5 p-6 text-white h-full flex flex-col justify-between" padding="none">
                      <div>
                        <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                          <Globe className="w-5 h-5 text-emerald-400" />
                          eBird API Sync Architecture
                        </h3>
                        <p className="text-xs text-slate-300 leading-relaxed mb-4">
                          Our platform utilizes standard eBird taxonomy formats to support automated ingestion of checklists submitted from within Kashmir divisions. Field birding records undergo verification via eBird regional editors before sync, ensuring citizen science data remains scientifically verified.
                        </p>
                      </div>
                      <div className="space-y-2 text-xs bg-white/5 p-4 rounded-xl border border-white/5 mt-4">
                        <div className="flex justify-between border-b border-white/5 pb-1.5"><span>Target API Pipeline:</span><strong className="text-emerald-400 font-mono">ebird.org/api/v2</strong></div>
                        <div className="flex justify-between border-b border-white/5 pb-1.5"><span>Taxonomy Standard:</span><strong className="text-slate-300">Clements Checklist 2024</strong></div>
                        <div className="flex justify-between border-b border-white/5 pb-1.5"><span>Data Sync Window:</span><strong className="text-slate-300">Daily Automated Batch</strong></div>
                        <div className="flex justify-between"><span>Integration Status:</span><strong className="text-amber-400">Pipeline Configured</strong></div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* MONITORING LINKS TAB */}
            {activeMainTab === 'monitoring' && (
              <div className="space-y-6">
                <div className="space-y-4">
                  {trailsObservationsData.slice(0, 8).map((t, idx) => (
                    <Card key={idx} className="border border-white/10 bg-white/5 p-4 text-white flex items-center justify-between" padding="none">
                      <div>
                        <h4 className="font-bold text-sm">{t.trail_name} - Monitoring Link</h4>
                        <span className="text-xs text-slate-400">Status: <strong className="text-emerald-400">{t.monitoring_status}</strong></span>
                      </div>
                      <Badge variant="default">{t.data_quality}</Badge>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* SPATIAL DATA TAB */}
            {activeMainTab === 'spatial' && (
              <div className="space-y-6">
                <Card className="border border-white/10 bg-white/5 p-5 text-white" padding="none">
                  <h3 className="text-base font-bold mb-3 flex items-center gap-2">
                    <MapIcon className="w-5 h-5 text-emerald-400" />
                    GIS Spatial Layer Index
                  </h3>
                  <div className="space-y-3">
                    {trailsObservationsData.slice(0, 10).map((t, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs border-b border-white/5 pb-2 last:border-0 last:pb-0">
                        <div>
                          <strong className="text-slate-200">{t.trail_name}</strong>
                          <span className="text-slate-500 block">Min/Max Altitude: {t.elevation_min_m}m - {t.elevation_max_m}m</span>
                        </div>
                        <Badge variant="default" className="text-[10px] font-mono">{t.map_layer_status}</Badge>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {/* REPORTS TAB */}
            {activeMainTab === 'reports' && (
              <div className="space-y-6">
                {/* Scope tabs + toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2 p-1 glass-intense border border-white/10 rounded-xl">
                    {[
                      { key: 'core', label: 'Kashmir Core' },
                      { key: 'trans', label: 'Trans-Divisional' },
                      { key: 'extended', label: 'Transboundary / Extended' }
                    ].map(tab => (
                      <button
                        key={tab.key}
                        onClick={() => {
                          setActiveScopeTab(tab.key as any);
                          setSelectedScope(tab.label);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                          activeScopeTab === tab.key
                            ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-3 ml-auto">
                    <Button variant="outline" size="sm" className="border-white/20 text-white" icon={<Filter className="w-4 h-4" />} onClick={() => setShowFilters(f => !f)}>
                      {showFilters ? 'Hide Filters' : 'Filters'}
                    </Button>
                    <span className="text-xs text-slate-400 whitespace-nowrap">
                      <strong className="text-white">{filteredReports.length}</strong> of <strong className="text-white">{allReports.length}</strong> documents
                    </span>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm" onClick={() => setViewMode('grid')} className={viewMode === 'grid' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400'} icon={<Grid3X3 className="w-4 h-4" />} />
                      <Button variant="ghost" size="sm" onClick={() => setViewMode('list')} className={viewMode === 'list' ? 'bg-emerald-500/20 text-emerald-400' : 'text-slate-400'} icon={<List className="w-4 h-4" />} />
                    </div>
                  </div>
                </div>

                {/* Filters */}
                {showFilters && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 glass-intense border border-white/10 rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
                  >
                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Search Text</label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                          type="text"
                          placeholder="Search report title, authors..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">District / Region</label>
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
                      <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Ecological Scope</label>
                      <Select
                        value={selectedScope}
                        onChange={setSelectedScope}
                        options={[
                          { value: 'all', label: 'All Scopes' },
                          ...['Kashmir Core', 'Trans-Divisional', 'Transboundary / Extended'].map(s => ({ value: s, label: s })),
                        ]}
                        placeholder="All Scopes"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Grid or List */}
                {filteredReports.length > 0 ? (
                  <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 xl:gap-6' : 'space-y-4'}>
                    {filteredReports.map((report, index) => (
                      <motion.div
                        key={report.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`${viewMode === 'grid' ? 'h-full' : ''} block group cursor-pointer`}
                        onClick={(e) => handleReportDownload(e, report.slug)}
                      >
                        <Card className={`${viewMode === 'grid' ? 'h-full flex flex-col justify-between' : ''} card-intelligence border border-white/10 bg-white/5 hover:border-emerald-500/30 transition-all duration-300`} padding="lg">
                          {viewMode === 'grid' ? (
                            <div className="flex flex-col h-full justify-between">
                              <div>
                                <div className="flex items-start gap-4 mb-4">
                                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-500 bg-opacity-20 flex items-center justify-center flex-shrink-0">
                                    <FileText className="w-6 h-6 text-emerald-400" />
                                  </div>
                                  <div>
                                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-2">{report.title}</h3>
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                      <Badge variant="info" size="sm" className="capitalize">{report.type}</Badge>
                                      <Badge variant="default" size="sm">{report.year}</Badge>
                                    </div>
                                  </div>
                                </div>
                                <p className="text-xs text-slate-400 mb-3 line-clamp-3">{report.description}</p>
                                <div className="text-xs text-slate-500 mb-3">
                                  <span>Authors: <strong className="text-slate-300">{report.authors.slice(0, 2).join(', ')}{report.authors.length > 2 ? ' + more' : ''}</strong></span>
                                </div>
                              </div>
                              <div className="mt-4 pt-4 border-t border-white/[0.06] flex justify-end">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-white/20 text-white group-hover:border-emerald-500/50 transition-colors"
                                  icon={<Download className="w-4 h-4" />}
                                  onClick={(e) => handleReportDownload(e, report.slug)}
                                >
                                  Download
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-500 bg-opacity-20 flex items-center justify-center flex-shrink-0">
                                  <FileText className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div>
                                  <div className="flex flex-wrap items-center gap-3 mb-2">
                                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">{report.title}</h3>
                                    <Badge variant="info" size="sm" className="capitalize">{report.type}</Badge>
                                    <Badge variant="default" size="sm">{report.year}</Badge>
                                  </div>
                                  <p className="text-sm text-slate-400 mb-3">{report.description}</p>
                                  <div className="flex items-center gap-4 text-xs text-slate-500">
                                    <span>Authors: <strong className="text-slate-300">{report.authors.slice(0, 2).join(', ')}{report.authors.length > 2 ? ' + more' : ''}</strong></span>
                                  </div>
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-white/20 text-white group-hover:border-emerald-500/50 transition-colors flex-shrink-0 ml-4"
                                icon={<Download className="w-4 h-4" />}
                                onClick={(e) => handleReportDownload(e, report.slug)}
                              >
                                Download
                              </Button>
                            </div>
                          )}
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-white/5 rounded-xl border border-white/5">
                    <Shield className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                    <h3 className="text-lg font-bold text-white">No reports found</h3>
                    <p className="text-slate-400 text-xs mb-4">Try relaxing search parameters</p>
                    <Button variant="outline" className="border-white/20 text-white" onClick={() => {
                      setSearchQuery('');
                      setSelectedDistrict('all');
                      setSelectedScope('all');
                    }}>Reset Search Filters</Button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AdvancedFooter />
    </main>
  );
}
