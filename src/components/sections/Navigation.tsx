'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import {
  Leaf,
  Menu,
  X,
  Map,
  Database,
  BarChart3,
  Book,
  ChevronDown,
  Globe,
  Bell,
  Settings,
  User,
  Shield,
  Search,
  Droplet,
  Waves,
  Wind,
  Mountain,
  Thermometer,
  Fish,
  AlertTriangle,
  Hammer,
  Calendar,
  Footprints,
  Factory,
  Recycle,
  Building2,
  Trash2,
  Droplets,
  Stethoscope,
  Upload,
  Languages,
  Sun,
  Moon,
  Eye,
  Accessibility as A11yIcon,
  ArrowRight,
  TrendingUp,
  Clock,
  MapPin,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Protected Areas', href: '/protected-network', hasDropdown: true },
  { label: 'Biodiversity', href: '/biodiversity', hasDropdown: true },
  { label: 'Water Systems', href: '/water-systems', hasDropdown: true },
  { label: 'Environmental Monitoring', href: '/environmental-monitoring', hasDropdown: true },
  { label: 'Contribute', href: '/contribute', hasDropdown: true },
  { label: 'Risk & Monitoring', href: '/risk-monitoring', hasDropdown: true },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [expandedMobileSubmenus, setExpandedMobileSubmenus] = useState<Set<string>>(new Set());

  // Utility cluster state
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [alertsOpen, setAlertsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [activePanel, setActivePanel] = useState<'search' | 'alerts' | 'profile' | 'preferences' | null>(null);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      // Prevent iOS rubber band scrolling
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard shortcut for search (Cmd/Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setActivePanel(searchOpen ? null : 'search');
        setSearchOpen(!searchOpen);
      }
      if (e.key === 'Escape') {
        setActivePanel(null);
        setSearchOpen(false);
        setAlertsOpen(false);
        setProfileOpen(false);
        setPreferencesOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  // Click outside to close panels
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-utility-panel]') && !target.closest('[data-utility-trigger]')) {
        setActivePanel(null);
        setSearchOpen(false);
        setAlertsOpen(false);
        setProfileOpen(false);
        setPreferencesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMobileSubmenu = (label: string) => {
    setExpandedMobileSubmenus(prev => {
      const next = new Set(prev);
      if (next.has(label)) {
        next.delete(label);
      } else {
        next.add(label);
      }
      return next;
    });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass-intense shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="relative flex items-center group">
            <img
              src="/kew_LOGO.png"
              alt="Kashmir EcoWatch Logo"
              className="w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem] lg:w-[5rem] lg:h-[5rem] object-contain"
            />
            
          </a>

          {/* Desktop navigation */}
          <nav className="hidden xl:flex items-center gap-0.5">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-2.5 py-2 rounded-lg text-xs lg:text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer ${
                    item.hasDropdown ? 'hover:bg-white/10' : ''
                  }`}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </Link>

                {/* Biodiversity Dropdown */}
                {item.hasDropdown && activeDropdown === item.label && item.label === 'Biodiversity' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-80 sm:w-96 max-w-[calc(100vw-2rem)] glass-intense rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50 pt-2 max-h-[80vh] overflow-y-auto"
                  >
                    <div className="p-3 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-forest-400" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Biodiversity Intelligence
                        </span>
                      </div>
                    </div>
                    
                    {/* Species Group */}
                    <div className="py-2 border-b border-white/5">
                      <div className="px-4 py-1.5 bg-emerald-500/10">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">Species</span>
                      </div>
                      {[
                        { name: 'Species Directory', href: '/biodiversity', desc: 'Browse complete database' },
                        { name: 'Mammals', href: '/biodiversity/mammals', desc: 'Ungulates, carnivores & more' },
                        { name: 'Birds', href: '/biodiversity/birds', desc: 'Resident & migratory species' },
                        { name: 'Fish & Aquatic Life', href: '/biodiversity/fish', desc: 'Freshwater & aquatic biodiversity' },
                        { name: 'Plants & Flora', href: '/biodiversity/plants', desc: 'Vascular plants & vegetation' },
                        { name: 'Medicinal Flora', href: '/biodiversity/medicinal-plants', desc: 'Traditional medicinal plants' },
                        { name: 'Priority & Threatened Species', href: '/biodiversity/threatened-species', desc: 'CR, EN, VU conservation taxa' },
                      ].map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                        >
                          <span className="font-medium">{subitem.name}</span>
                          <span className="block text-xs text-slate-500 mt-0.5">{subitem.desc}</span>
                        </Link>
                      ))}
                    </div>

                    {/* Observation & Ecology Group */}
                    <div className="py-2 border-b border-white/5">
                      <div className="px-4 py-1.5 bg-sky-500/10">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-sky-400">Observation & Ecology</span>
                      </div>
                      {[
                        { name: 'Wildlife Sightings', href: '/biodiversity/wildlife-sightings', desc: 'Verified & community observations' },
                        { name: 'Birding & Observation Hotspots', href: '/biodiversity/birding-hotspots', desc: 'Prime observation areas' },
                        { name: 'Migration Windows', href: '/biodiversity/migration-windows', desc: 'Migratory bird timing' },
                        { name: 'Pollinator Activity', href: '/biodiversity/pollinator-activity', desc: 'Pollinator watch periods' },
                        { name: 'Phenology & Flowering Records', href: '/biodiversity/phenology-flowering', desc: 'Flowering & seasonal records' },
                        { name: 'Habitat Signals', href: '/biodiversity/habitat-signals', desc: 'Habitat stress & transitions' },
                        { name: 'Seasonal Species Activity', href: '/biodiversity/seasonal-activity', desc: 'Breeding & activity windows' },
                      ].map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                        >
                          <span className="font-medium">{subitem.name}</span>
                          <span className="block text-xs text-slate-500 mt-0.5">{subitem.desc}</span>
                        </Link>
                      ))}
                    </div>

                    {/* Intelligence Group */}
                    <div className="py-2">
                      <div className="px-4 py-1.5 bg-violet-500/10">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-violet-400">Intelligence</span>
                      </div>
                      {[
                        { name: 'Overview', href: '/biodiversity/overview', desc: 'Module command center' },
                        { name: 'District Biodiversity Profiles', href: '/biodiversity/district-profiles', desc: 'Regional intelligence' },
                        { name: 'Dashboards', href: '/biodiversity/dashboards', desc: 'Analytics & trends' },
                      ].map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                        >
                          <span className="font-medium">{subitem.name}</span>
                          <span className="block text-xs text-slate-500 mt-0.5">{subitem.desc}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Protected Areas Dropdown */}
                {item.hasDropdown && activeDropdown === item.label && item.label === 'Protected Areas' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-72 sm:w-80 max-w-[calc(100vw-2rem)] glass-intense rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50 pt-2"
                  >
                    <div className="p-3 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-forest-400" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Protected Areas
                        </span>
                      </div>
                    </div>
                    <div className="py-2">
                      <Link
                        href="/protected-network"
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer"
                      >
                        <span className="font-medium">🗺️ Network Overview</span>
                        <span className="block text-xs text-slate-500 mt-0.5">Complete protected area system</span>
                      </Link>
                      <Link
                        href="/protected-network/atlas"
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer"
                      >
                        <span className="font-medium">📍 Protected Area Atlas</span>
                        <span className="block text-xs text-slate-500 mt-0.5">Interactive GIS mapping</span>
                      </Link>
                      {[
                        { name: 'National Parks', href: '/protected-network/national-parks', desc: 'Core conservation landscapes' },
                        { name: 'Wildlife Sanctuaries', href: '/protected-network/wildlife-sanctuaries', desc: 'Protected habitats' },
                        { name: 'Wetland Reserves', href: '/protected-network/wetland-reserves', desc: 'Marsh & bird conservation' },
                        { name: 'Conservation Reserves', href: '/protected-network/conservation-reserves', desc: 'Community landscapes' },
                        { name: 'Bird & Habitat Areas', href: '/protected-network/bird-and-habitat-areas', desc: 'Important bird areas' },
                        { name: 'Species Intelligence', href: '/protected-network/species-intelligence', desc: 'PA overlap & distribution' },
                        { name: 'Corridors & Connectivity', href: '/protected-network/corridors-and-connectivity', desc: 'Landscape linkages' },
                        { name: 'Trails & Sightings', href: '/protected-network/trails-and-sightings', desc: 'Field observations' },
                        { name: 'Monitoring & Threats', href: '/protected-network/monitoring-and-threats', desc: 'Conservation alerts' },
                        { name: 'Reports & Plans', href: '/protected-network/reports-and-plans', desc: 'Management documents' },
                      ].map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                        >
                          <span className="font-medium">{subitem.name}</span>
                          <span className="block text-xs text-slate-500 mt-0.5">{subitem.desc}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Water Systems Dropdown */}
                {item.hasDropdown && activeDropdown === item.label && item.label === 'Water Systems' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-72 sm:w-80 max-w-[calc(100vw-2rem)] glass-intense rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50 pt-2"
                  >
                    <div className="p-3 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <Droplet className="w-4 h-4 text-blue-400" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Water Systems
                        </span>
                      </div>
                    </div>
                    <div className="py-2">
                      <Link
                        href="/water-systems"
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer"
                      >
                        <span className="font-medium">💧 Overview</span>
                        <span className="block text-xs text-slate-500 mt-0.5">Complete hydrological intelligence</span>
                      </Link>
                      {[
                        { name: 'Lakes', href: '/water-systems/lakes', icon: Droplet, desc: 'Major, minor, urban & high-altitude lakes', color: 'text-blue-400' },
                        { name: 'Wetlands', href: '/water-systems/wetlands', icon: Waves, desc: 'Marshes, floodplain & Ramsar wetlands', color: 'text-sky-400' },
                        { name: 'Rivers & Streams', href: '/water-systems/rivers', icon: Wind, desc: 'Major rivers, tributaries & streams', color: 'text-indigo-400' },
                        { name: 'Springs', href: '/water-systems/springs', icon: Droplet, desc: 'Perennial, seasonal & community springs', color: 'text-emerald-400' },
                        { name: 'Watersheds', href: '/water-systems/watersheds', icon: Map, desc: 'Basins, catchments & hydrological units', color: 'text-amber-400' },
                        { name: 'Glaciers & Cryosphere', href: '/water-systems/glaciers', icon: Mountain, desc: 'Glaciers & snow-fed systems', color: 'text-slate-400' },
                        { name: 'Drinking Water Sources', href: '/water-systems/drinking-water-sources', icon: Droplet, desc: 'Spring & surface supply vulnerability', color: 'text-cyan-400' },
                        { name: 'Water Quality', href: '/water-systems/water-quality', icon: Thermometer, desc: 'Quality monitoring & trends', color: 'text-teal-400' },
                        { name: 'Algal Bloom Intelligence', href: '/water-systems/algal-bloom-intelligence', icon: Waves, desc: 'Eutrophication & bloom risk monitoring', color: 'text-emerald-400' },
                        { name: 'Aquatic Life & Fisheries', href: '/water-systems/fisheries', icon: Fish, desc: 'Fish species & fishery management', color: 'text-violet-400' },
                        { name: 'Restoration & Rejuvenation', href: '/water-systems/restoration', icon: Hammer, desc: 'Conservation & restoration projects', color: 'text-lime-400' },
                        { name: 'Flood & Hydrological Risk', href: '/water-systems/flood-risk', icon: AlertTriangle, desc: 'Flood zones & hazard assessment', color: 'text-red-400' },
                        { name: 'Dashboards', href: '/water-systems/dashboards', icon: BarChart3, desc: 'Analytics, trends & heatmaps', color: 'text-orange-400' },
                      ].map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <subitem.icon className={`w-3.5 h-3.5 ${subitem.color}`} />
                            <span className="font-medium">{subitem.name}</span>
                          </div>
                          <span className="block text-xs text-slate-500 mt-0.5">{subitem.desc}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Environmental Monitoring Dropdown */}
                {item.hasDropdown && activeDropdown === item.label && item.label === 'Environmental Monitoring' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-72 sm:w-80 max-w-[calc(100vw-2rem)] glass-intense rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50 pt-2"
                  >
                    <div className="p-3 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <Factory className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Environmental Monitoring
                        </span>
                      </div>
                    </div>
                    <div className="py-2">
                      <Link
                        href="/environmental-monitoring"
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer"
                      >
                        <span className="font-medium">🏗️ Overview</span>
                        <span className="block text-xs text-slate-500 mt-0.5">Environmental intelligence command center</span>
                      </Link>
                      {[
                        { name: 'Solid Waste', href: '/environmental-monitoring/solid-waste', desc: 'Dumping, landfill stress, open waste', color: 'text-gray-400' },
                        { name: 'Bio-Waste', href: '/environmental-monitoring/bio-waste', desc: 'Organic waste, decomposition zones', color: 'text-emerald-400' },
                        { name: 'Sewage & Wastewater', href: '/environmental-monitoring/sewage-wastewater', desc: 'Overflow, outfalls, untreated discharge', color: 'text-blue-400' },
                        { name: 'Drinking Water', href: '/environmental-monitoring/drinking-water', desc: 'Contamination alerts, supply issues', color: 'text-cyan-400' },
                        { name: 'Critical Water Infrastructure', href: '/environmental-monitoring/critical-infrastructure', desc: 'Intake points, treatment plants, reservoirs', color: 'text-indigo-400' },
                        { name: 'Air Pollution', href: '/environmental-monitoring/air-pollution', desc: 'AQI, particulate, smoke, burning', color: 'text-slate-400' },
                        { name: 'Environmental Health Signals', href: '/environmental-monitoring/environmental-health', desc: 'Odor, fish kill, stagnant water', color: 'text-amber-400' },
                        { name: 'Utility Incidents & Advisories', href: '/environmental-monitoring/utility-incidents', desc: 'Service failures, emergency notices', color: 'text-red-400' },
                        { name: 'Dashboards', href: '/environmental-monitoring/dashboards', desc: 'District comparison & stress heatmaps', color: 'text-violet-400' },
                      ].map((subitem, i) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="block px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${
                              subitem.color.includes('gray') ? 'from-gray-400 to-gray-500' :
                              subitem.color.includes('emerald') ? 'from-emerald-400 to-green-500' :
                              subitem.color.includes('blue') ? 'from-blue-400 to-cyan-500' :
                              subitem.color.includes('cyan') ? 'from-cyan-400 to-teal-500' :
                              subitem.color.includes('indigo') ? 'from-indigo-400 to-blue-500' :
                              subitem.color.includes('slate') ? 'from-slate-400 to-gray-500' :
                              subitem.color.includes('amber') ? 'from-amber-400 to-orange-500' :
                              subitem.color.includes('red') ? 'from-red-400 to-red-500' :
                              'from-violet-400 to-purple-500'
                            }`} />
                            <span className="font-medium text-xs">{subitem.name}</span>
                          </div>
                          <span className="block text-xs text-slate-500 ml-3.5">{subitem.desc}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Contribute Dropdown */}
                {item.hasDropdown && activeDropdown === item.label && item.label === 'Contribute' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-72 sm:w-80 max-w-[calc(100vw-2rem)] glass-intense rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50 pt-2"
                  >
                    <div className="p-3 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <Upload className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Contribute
                        </span>
                      </div>
                    </div>
                    <div className="py-2">
                      <Link
                        href="/contribute"
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer"
                      >
                        <span className="font-medium">🌐 Contribute Hub</span>
                        <span className="block text-xs text-slate-500 mt-0.5">All contribution pathways</span>
                      </Link>
                      {[
                        { name: 'Report an Issue', href: '/report-issue', desc: 'Emergency & hazard reporting' },
                        { name: 'Submit a Sighting', href: '/submit-sighting', desc: 'Wildlife & ecological observations' },
                        { name: 'Contribute Data', href: '/contribute-data', desc: 'Structured datasets & research' },
                        { name: 'Citizen Science', href: '/citizen-science', desc: 'Programs & recurring roles' },
                      ].map((subitem) => (
                        <Link
                          key={subitem.name}
                          href={subitem.href}
                          className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                        >
                          <span className="font-medium">{subitem.name}</span>
                          <span className="block text-xs text-slate-500 mt-0.5">{subitem.desc}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Risk & Monitoring Dropdown */}
                {item.hasDropdown && activeDropdown === item.label && item.label === 'Risk & Monitoring' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-80 sm:w-96 max-w-[calc(100vw-2rem)] glass-intense rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50 pt-2"
                  >
                    <div className="p-3 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Risk & Monitoring
                        </span>
                      </div>
                    </div>
                    <div className="py-2 max-h-[70vh] overflow-y-auto">
                      <Link
                        href="/risk-monitoring"
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer"
                      >
                        <span className="font-medium">🎯 Overview</span>
                        <span className="block text-xs text-slate-500 mt-0.5">Command center</span>
                      </Link>
                      <Link
                        href="/risk-monitoring/live-alerts"
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer"
                      >
                        <span className="font-medium">🚨 Live Alerts</span>
                        <span className="block text-xs text-slate-500 mt-0.5">Critical alerts & warnings</span>
                      </Link>
                      <Link
                        href="/risk-monitoring/hazard-risks"
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer"
                      >
                        <span className="font-medium">⚠️ Hazard Risks</span>
                        <span className="block text-xs text-slate-500 mt-0.5">Umbrella hazard classification</span>
                      </Link>
                      <Link
                        href="/risk-monitoring/flood-flash-flood"
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer"
                      >
                        <span className="font-medium">🌊 Flood & Flash Flood</span>
                        <span className="block text-xs text-slate-500 mt-0.5">River overflow & inundation watch</span>
                      </Link>
                      <Link
                        href="/risk-monitoring/landslide-slope"
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer"
                      >
                        <span className="font-medium">🏔️ Landslide & Slope</span>
                        <span className="block text-xs text-slate-500 mt-0.5">Slope instability & road risk</span>
                      </Link>
                      <Link
                        href="/risk-monitoring/avalanche-winter"
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer"
                      >
                        <span className="font-medium">❄️ Avalanche & Winter</span>
                        <span className="block text-xs text-slate-500 mt-0.5">Avalanche exposure & winter access</span>
                      </Link>
                      <Link
                        href="/risk-monitoring/earthquake"
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer"
                      >
                        <span className="font-medium">🌍 Earthquake</span>
                        <span className="block text-xs text-slate-500 mt-0.5">Seismic exposure & readiness</span>
                      </Link>
                      <Link
                        href="/risk-monitoring/forest-fire"
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer"
                      >
                        <span className="font-medium">🔥 Forest Fire</span>
                        <span className="block text-xs text-slate-500 mt-0.5">Active fires & fire-prone zones</span>
                      </Link>
                      <Link
                        href="/risk-monitoring/glacier-cryosphere"
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer"
                      >
                        <span className="font-medium">🧊 Glacier & Cryosphere</span>
                        <span className="block text-xs text-slate-500 mt-0.5">Glacier-linked environmental risk</span>
                      </Link>
                      <Link
                        href="/risk-monitoring/hydrological-risk"
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer"
                      >
                        <span className="font-medium">💧 Hydrological Risk</span>
                        <span className="block text-xs text-slate-500 mt-0.5">Water system instability & overflow</span>
                      </Link>
                      <Link
                        href="/risk-monitoring/environmental-incident-risk"
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer"
                      >
                        <span className="font-medium">☣️ Environmental Incident Risk</span>
                        <span className="block text-xs text-slate-500 mt-0.5">Pollution emergencies & escalation</span>
                      </Link>
                      <Link
                        href="/risk-monitoring/district-risk-profiles"
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer"
                      >
                        <span className="font-medium">📍 District Risk Profiles</span>
                        <span className="block text-xs text-slate-500 mt-0.5">District-wise operational risk</span>
                      </Link>
                      <Link
                        href="/risk-monitoring/critical-infrastructure-response"
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer"
                      >
                        <span className="font-medium">🏗️ Critical Infrastructure & Response</span>
                        <span className="block text-xs text-slate-500 mt-0.5">Emergency facilities & response nodes</span>
                      </Link>
                      <Link
                        href="/risk-monitoring/shelters-closures-emergency-routes"
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer"
                      >
                        <span className="font-medium">🛤️ Shelters, Closures & Emergency Routes</span>
                        <span className="block text-xs text-slate-500 mt-0.5">Safe routes & operational mobility</span>
                      </Link>
                      <Link
                        href="/risk-monitoring/dashboards"
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer"
                      >
                        <span className="font-medium">📊 Dashboards</span>
                        <span className="block text-xs text-slate-500 mt-0.5">Live risk & incident dashboards</span>
                      </Link>
                      <Link
                        href="/risk-updates"
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <span className="font-medium">📋 Risk Updates</span>
                        <span className="block text-xs text-slate-500 mt-0.5">Situational awareness & assessments</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side utility cluster: Search → Alerts → Profile → Preferences */}
          <div className="hidden xl:flex items-center gap-0.5">
            {/* Search */}
            <button
              data-utility-trigger="search"
              onClick={() => { setActivePanel(searchOpen ? null : 'search'); setSearchOpen(!searchOpen); setAlertsOpen(false); setProfileOpen(false); setPreferencesOpen(false); }}
              className={`relative p-2 rounded-lg transition-all duration-200 ${activePanel === 'search' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Alerts */}
            <button
              data-utility-trigger="alerts"
              onClick={() => { setActivePanel(alertsOpen ? null : 'alerts'); setAlertsOpen(!alertsOpen); setSearchOpen(false); setProfileOpen(false); setPreferencesOpen(false); }}
              className={`relative p-2 rounded-lg transition-all duration-200 ${activePanel === 'alerts' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              aria-label="Alerts"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Profile */}
            <button
              data-utility-trigger="profile"
              onClick={() => { setActivePanel(profileOpen ? null : 'profile'); setProfileOpen(!profileOpen); setSearchOpen(false); setAlertsOpen(false); setPreferencesOpen(false); }}
              className={`relative p-2 rounded-lg transition-all duration-200 ${activePanel === 'profile' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              aria-label="Profile"
            >
              <User className="w-5 h-5" />
            </button>

            {/* Preferences */}
            <button
              data-utility-trigger="preferences"
              onClick={() => { setActivePanel(preferencesOpen ? null : 'preferences'); setPreferencesOpen(!preferencesOpen); setSearchOpen(false); setAlertsOpen(false); setProfileOpen(false); }}
              className={`relative p-2 rounded-lg transition-all duration-200 ${activePanel === 'preferences' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
              aria-label="Preferences"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden p-1.5 sm:p-2 rounded-lg hover:bg-white/5 transition-colors"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-drawer"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            ) : (
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* ─── Utility Panels ──────────────────────────────────────────────── */}

      {/* Search Modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            data-utility-panel="search"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-start justify-center pt-32"
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => { setSearchOpen(false); setActivePanel(null); }} />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              className="relative w-full max-w-2xl mx-4 glass-intense rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search modules, districts, species, alerts..."
                  className="flex-1 bg-transparent text-white placeholder-slate-500 outline-none text-sm"
                  autoFocus
                />
                <kbd className="hidden sm:inline-flex items-center px-2 py-1 rounded bg-white/10 text-xs text-slate-400 font-mono">Esc</kbd>
              </div>
              {/* Quick results */}
              <div className="p-4 max-h-80 overflow-y-auto">
                {!searchQuery ? (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Trending Searches</h4>
                      <div className="flex flex-wrap gap-2">
                        {['Hangul', 'Dal Lake', 'Flood Risk', 'Srinagar', 'Snow Leopard'].map((q) => (
                          <button key={q} onClick={() => setSearchQuery(q)} className="px-3 py-1.5 rounded-full bg-white/5 text-xs text-slate-300 hover:bg-white/10 hover:text-white transition-colors">
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Browse by Module</h4>
                      <div className="grid grid-cols-2 gap-1.5">
                        {[
                          { label: 'Biodiversity', href: '/biodiversity', icon: Leaf },
                          { label: 'Water Systems', href: '/water-systems', icon: Droplet },
                          { label: 'Protected Areas', href: '/protected-network', icon: Shield },
                          { label: 'Risk Dashboards', href: '/risk-monitoring/dashboards', icon: BarChart3 },
                          { label: 'Atlas', href: '/atlas', icon: Map },
                          { label: 'Library', href: '/library', icon: Book },
                        ].map((m) => (
                          <Link key={m.label} href={m.href} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group">
                            <m.icon className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                            <span className="text-xs text-slate-300 group-hover:text-white transition-colors">{m.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {[
                      { label: 'Biodiversity — Species Directory', href: '/biodiversity', type: 'Module', icon: Leaf },
                      { label: 'District — Srinagar', href: '/districts#srinagar', type: 'District', icon: MapPin },
                      { label: 'Alert — Sewage Overflow Hazratbal', href: '/risk-monitoring/live-alerts', type: 'Alert', icon: Bell },
                      { label: 'Water System — Dal Lake', href: '/water-systems/lakes#dal', type: 'Water Body', icon: Droplet },
                      { label: 'Species — Hangul (Kashmir Stag)', href: '/biodiversity/threatened-species#hangul', type: 'Species', icon: Leaf },
                    ].filter(r => r.label.toLowerCase().includes(searchQuery.toLowerCase())).map((result, i) => (
                      <Link key={i} href={result.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors group">
                        <result.icon className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors shrink-0" />
                        <span className="text-sm text-slate-300 group-hover:text-white transition-colors flex-1 truncate">{result.label}</span>
                        <span className="text-xs text-slate-600">{result.type}</span>
                      </Link>
                    ))}
                    {searchQuery && ![
                      { label: 'Biodiversity — Species Directory', href: '/biodiversity' },
                      { label: 'District — Srinagar', href: '/districts#srinagar' },
                    ].some(r => r.label.toLowerCase().includes(searchQuery.toLowerCase())) && (
                      <p className="text-sm text-slate-500 py-4 text-center">No results for "{searchQuery}"</p>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Alerts Drawer */}
      <AnimatePresence>
        {alertsOpen && (
          <motion.div
            data-utility-panel="alerts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex justify-end"
          >
            <div className="absolute inset-0 bg-black/40" onClick={() => { setAlertsOpen(false); setActivePanel(null); }} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-sm glass-intense border-l border-white/10 shadow-2xl overflow-y-auto"
            >
              <div className="sticky top-0 bg-slate-950/90 backdrop-blur-sm border-b border-white/10 px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-red-400" />
                  <h3 className="text-sm font-bold text-white">Platform Alerts</h3>
                </div>
                <button onClick={() => { setAlertsOpen(false); setActivePanel(null); }} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 space-y-4">
                {/* Active Alerts */}
                <div>
                  <h4 className="text-xs font-semibold text-red-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500" /> Active Alerts
                  </h4>
                  <div className="space-y-2">
                    {[
                      { title: 'Avalanche Warning — Gulmarg', district: 'Gulmarg', time: '2h ago', severity: 'critical' },
                      { title: 'Sewage Overflow — Hazratbal', district: 'Srinagar', time: '4h ago', severity: 'critical' },
                      { title: 'Forest Fire — Kerni Range', district: 'Baramulla', time: '6h ago', severity: 'serious' },
                    ].map((alert, i) => (
                      <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="text-xs font-medium text-white group-hover:text-emerald-400 transition-colors leading-tight">{alert.title}</p>
                          <span className={`text-xs px-1.5 py-0.5 rounded shrink-0 ${alert.severity === 'critical' ? 'bg-red-500/10 text-red-400' : 'bg-orange-500/10 text-orange-400'}`}>{alert.severity}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <MapPin className="w-3 h-3" />
                          <span>{alert.district}</span>
                          <Clock className="w-3 h-3 ml-1" />
                          <span>{alert.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Under Monitoring */}
                <div>
                  <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" /> Under Monitoring
                  </h4>
                  <div className="space-y-2">
                    {[
                      { title: 'Glacial Melt — Kolahoi', district: 'Ganderbal', time: '8h ago' },
                      { title: 'River Levels — Wular Outflow', district: 'Bandipora', time: '10h ago' },
                    ].map((item, i) => (
                      <div key={i} className="p-3 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer group">
                        <p className="text-xs font-medium text-white group-hover:text-amber-400 transition-colors mb-1">{item.title}</p>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <MapPin className="w-3 h-3" />
                          <span>{item.district}</span>
                          <Clock className="w-3 h-3 ml-1" />
                          <span>{item.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* View All */}
                <Link href="/risk-monitoring/live-alerts-advisories" className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-colors group">
                  <span>View All Alerts</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Dropdown */}
      <AnimatePresence>
        {profileOpen && (
          <motion.div
            data-utility-panel="profile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60]"
            onClick={() => { setProfileOpen(false); setActivePanel(null); }}
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute top-16 right-4 sm:right-8 lg:right-[calc(50%-32rem)] w-72 glass-intense rounded-xl border border-white/10 shadow-2xl overflow-hidden"
              style={{ right: '2rem' }}
            >
              <div className="px-5 py-4 border-b border-white/10">
                <h3 className="text-sm font-bold text-white">Sign In</h3>
                <p className="text-xs text-slate-400 mt-1">Access your workspace and contributions</p>
              </div>
              <div className="p-4 space-y-2">
                <Button className="w-full text-sm bg-emerald-600 hover:bg-emerald-700 text-white">
                  Sign In
                </Button>
                <Button variant="outline" className="w-full text-sm border-white/20 text-white">
                  Create Account
                </Button>
                <div className="pt-2 border-t border-white/5">
                  <Button variant="ghost" className="w-full text-sm text-slate-400 hover:text-white">
                    Continue as Guest
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences Panel */}
      <AnimatePresence>
        {preferencesOpen && (
          <motion.div
            data-utility-panel="preferences"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex justify-end"
          >
            <div className="absolute inset-0 bg-black/40" onClick={() => { setPreferencesOpen(false); setActivePanel(null); }} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-sm glass-intense border-l border-white/10 shadow-2xl overflow-y-auto"
            >
              <div className="sticky top-0 bg-slate-950/90 backdrop-blur-sm border-b border-white/10 px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-slate-400" />
                  <h3 className="text-sm font-bold text-white">Preferences</h3>
                </div>
                <button onClick={() => { setPreferencesOpen(false); setActivePanel(null); }} className="text-slate-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 space-y-5">
                {/* Accessibility */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <A11yIcon className="w-3.5 h-3.5" /> Accessibility
                  </h4>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between p-2.5 rounded-lg bg-white/5 cursor-pointer">
                      <span className="text-xs text-slate-300">High Contrast Mode</span>
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-8 h-5 rounded-full bg-white/10 peer-checked:bg-emerald-500 relative transition-colors">
                        <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform peer-checked:translate-x-3" />
                      </div>
                    </label>
                    <Link href="/accessibility" className="flex items-center gap-2 px-2.5 py-2 rounded-lg hover:bg-white/5 transition-colors group">
                      <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                      <span className="text-xs text-slate-400 group-hover:text-white transition-colors">Accessibility Statement</span>
                    </Link>
                  </div>
                </div>

                {/* Language */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <Languages className="w-3.5 h-3.5" /> Language
                  </h4>
                  <div className="space-y-1.5">
                    {['English', 'Urdu', 'Hindi'].map((lang) => (
                      <label key={lang} className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${lang === 'English' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-slate-400'}`}>
                        <input type="radio" name="language" defaultChecked={lang === 'English'} className="sr-only" />
                        <div className={`w-3 h-3 rounded-full border ${lang === 'English' ? 'border-emerald-400 bg-emerald-400' : 'border-slate-500'}`} />
                        <span className="text-xs">{lang}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Display */}
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3 flex items-center gap-2">
                    <Eye className="w-3.5 h-3.5" /> Display
                  </h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setDarkMode(true)}
                      className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs transition-colors ${darkMode ? 'bg-white/10 text-white border border-white/20' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                    >
                      <Moon className="w-3.5 h-3.5" /> Dark
                    </button>
                    <button
                      onClick={() => setDarkMode(false)}
                      className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs transition-colors ${!darkMode ? 'bg-white/10 text-white border border-white/20' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
                    >
                      <Sun className="w-3.5 h-3.5" /> Light
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile menu overlay and drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 z-50 xl:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              id="mobile-menu-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="fixed inset-y-0 left-0 w-[85%] sm:w-[75%] max-w-[280px] sm:max-w-[320px] bg-slate-900 z-[51] xl:hidden shadow-2xl flex flex-col h-dvh"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              {/* Drawer header - shrink-0 to prevent shrinking */}
              <div className="shrink-0 flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4 border-b border-white/10">
                <div className="flex items-center gap-2 sm:gap-3">
                  <img
                    src="/kew_LOGO.png"
                    alt="Kashmir EcoWatch"
                    className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
                  />
                  
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 sm:p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Scrollable menu content - flex-1 min-h-0 overflow-y-auto for proper scrolling */}
              <nav
                className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-2 sm:px-3 py-3 sm:py-4 space-y-0.5 [webkit-overflow-scrolling:touch]"
                role="navigation"
                aria-label="Mobile navigation"
              >
                {navItems.map((item) => {
                  const isExpanded = expandedMobileSubmenus.has(item.label);
                  return (
                    <div key={item.label} className="border-b border-white/5 last:border-0">
                      {/* Parent menu item */}
                      {item.hasDropdown ? (
                        <>
                          <button
                            onClick={() => toggleMobileSubmenu(item.label)}
                            className="w-full flex items-center justify-between gap-2 sm:gap-3 px-2 sm:px-3 py-3 sm:py-3.5 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer text-sm sm:text-base font-medium"
                            aria-expanded={isExpanded}
                            aria-controls={`submenu-${item.label.replace(/\s+/g, '-').toLowerCase()}`}
                          >
                            <span>{item.label}</span>
                            <ChevronDown
                              className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${
                                isExpanded ? 'rotate-180' : ''
                              }`}
                            />
                          </button>

                          {/* Collapsible submenu */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                id={`submenu-${item.label.replace(/\s+/g, '-').toLowerCase()}`}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                                role="menu"
                                aria-label={`${item.label} submenu`}
                              >
                                <div className="ml-2 sm:ml-4 mt-2 mb-3 space-y-0.5">
                                  {/* Render submenu items based on category */}
                                  {item.label === 'Protected Areas' && (
                                    <>
                                      <Link href="/protected-network" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        🗺️ Network Overview
                                      </Link>
                                      <Link href="/protected-network/atlas" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        📍 Protected Area Atlas
                                      </Link>
                                      <Link href="/protected-network/national-parks" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        National Parks
                                      </Link>
                                      <Link href="/protected-network/wildlife-sanctuaries" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Wildlife Sanctuaries
                                      </Link>
                                      <Link href="/protected-network/wetland-reserves" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Wetland Reserves
                                      </Link>
                                      <Link href="/protected-network/conservation-reserves" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Conservation Reserves
                                      </Link>
                                      <Link href="/protected-network/bird-and-habitat-areas" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Bird & Habitat Areas
                                      </Link>
                                      <Link href="/protected-network/species-intelligence" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Species Intelligence
                                      </Link>
                                      <Link href="/protected-network/corridors-and-connectivity" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Corridors & Connectivity
                                      </Link>
                                      <Link href="/protected-network/trails-and-sightings" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Trails & Sightings
                                      </Link>
                                      <Link href="/protected-network/monitoring-and-threats" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Monitoring & Threats
                                      </Link>
                                      <Link href="/protected-network/reports-and-plans" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Reports & Plans
                                      </Link>
                                    </>
                                  )}

                                  {item.label === 'Biodiversity' && (
                                    <>
                                      <Link href="/biodiversity" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        📊 All Species
                                      </Link>
                                      <Link href="/biodiversity/mammals" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Mammals
                                      </Link>
                                      <Link href="/biodiversity/birds" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Birds
                                      </Link>
                                      <Link href="/biodiversity/fish" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Fish
                                      </Link>
                                      <Link href="/biodiversity/plants" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Plants
                                      </Link>
                                      <Link href="/biodiversity/medicinal-plants" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Medicinal Plants
                                      </Link>
                                      <Link href="/biodiversity/threatened-species" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Threatened Species
                                      </Link>
                                    </>
                                  )}

                                  {item.label === 'Water Systems' && (
                                    <>
                                      <Link href="/water-systems" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        💧 Overview
                                      </Link>
                                      <Link href="/water-systems/lakes" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        All Lakes
                                      </Link>
                                      <Link href="/water-systems/wetlands" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        All Wetlands
                                      </Link>
                                      <Link href="/water-systems/rivers" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Rivers & Streams
                                      </Link>
                                      <Link href="/water-systems/springs" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        All Springs
                                      </Link>
                                      <Link href="/water-systems/watersheds" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        All Watersheds
                                      </Link>
                                      <Link href="/water-systems/glaciers" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Glaciers & Cryosphere
                                      </Link>
                                      <Link href="/water-systems/water-quality" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Water Quality
                                      </Link>
                                      <Link href="/water-systems/fisheries" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Fisheries & Aquatic Life
                                      </Link>
                                      <Link href="/water-systems/flood-risk" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Flood & Hydrological Risk
                                      </Link>
                                      <Link href="/water-systems/restoration" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Restoration & Rejuvenation
                                      </Link>
                                    </>
                                  )}

                                  {item.label === 'Contribute' && (
                                    <>
                                      <Link href="/contribute" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        🌿 Overview
                                      </Link>
                                      <Link href="/report-issue" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Report an Issue
                                      </Link>
                                      <Link href="/submit-sighting" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Submit a Sighting
                                      </Link>
                                      <Link href="/contribute-data" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Contribute Data
                                      </Link>
                                      <Link href="/citizen-science" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Citizen Science
                                      </Link>
                                    </>
                                  )}

                                  {item.label === 'Risk & Monitoring' && (
                                    <>
                                      <Link href="/risk-monitoring" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        ⚠️ Overview
                                      </Link>
                                      <Link href="/risk-monitoring/hazard-risks" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        🏔️ Hazard Risks
                                      </Link>
                                      <Link href="/risk-monitoring/pollution-stress" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        🌫️ Pollution & Stress
                                      </Link>
                                      <Link href="/risk-monitoring/biodiversity-risks" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        🦌 Biodiversity Risks
                                      </Link>
                                      <Link href="/risk-monitoring/response-operations" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        🚨 Response & Operations
                                      </Link>
                                      <Link href="/risk-monitoring/live-alerts-advisories" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        🔔 Live Alerts
                                      </Link>
                                      <Link href="/risk-updates" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        📋 Risk Updates
                                      </Link>
                                      <Link href="/risk-monitoring/dashboards" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        📊 Dashboards
                                      </Link>
                                    </>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className="block px-3 py-4 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-base font-medium"
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  );
                })}

                {/* Footer actions */}
                <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-white/10 space-y-3 sm:space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pl-9 sm:pl-10 rounded-lg bg-white/5 border border-white/10 outline-none text-xs sm:text-sm text-white placeholder:text-slate-500 focus:border-white/20 focus:bg-white/10 transition-colors"
                    />
                    <Search className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500 absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2" />
                  </div>
                  <Button className="w-full text-sm sm:text-base">Access Platform</Button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
