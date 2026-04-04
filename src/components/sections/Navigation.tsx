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
  Pipe,
  Stethoscope,
  Upload
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Protected Areas', href: '/protected-network', hasDropdown: true },
  { label: 'Biodiversity', href: '/biodiversity', hasDropdown: true },
  { label: 'Trails & Sightings', href: '/trails-sightings', hasDropdown: true },
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
                    className="absolute top-full left-0 w-64 sm:w-72 max-w-[calc(100vw-2rem)] glass-intense rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50 pt-2"
                  >
                    <div className="p-3 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <Leaf className="w-4 h-4 text-forest-400" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Biodiversity
                        </span>
                      </div>
                    </div>
                    <div className="py-2">
                      <Link
                        href="/biodiversity"
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer"
                      >
                        <span className="font-medium">📊 All Species</span>
                        <span className="block text-xs text-slate-500 mt-0.5">Browse complete biodiversity database</span>
                      </Link>
                      {[
                        { name: 'Mammals', href: '/biodiversity/mammals', desc: 'Ungulates, carnivores & more' },
                        { name: 'Birds', href: '/biodiversity/birds', desc: 'Resident & migratory species' },
                        { name: 'Fish', href: '/biodiversity/fish', desc: 'Aquatic biodiversity' },
                        { name: 'Plants', href: '/biodiversity/plants', desc: 'Flora & vegetation' },
                        { name: 'Medicinal Plants', href: '/biodiversity/medicinal-plants', desc: 'Traditional medicinal flora' },
                        { name: 'Threatened Species', href: '/biodiversity/threatened-species', desc: 'Priority conservation taxa' },
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
                        { name: 'All Lakes', href: '/water-systems/lakes', icon: Droplet, desc: 'Major, minor, urban & high-altitude lakes', color: 'text-blue-400' },
                        { name: 'All Wetlands', href: '/water-systems/wetlands', icon: Waves, desc: 'Marshes, floodplain & Ramsar wetlands', color: 'text-sky-400' },
                        { name: 'Rivers & Streams', href: '/water-systems/rivers', icon: Wind, desc: 'Major rivers, tributaries & streams', color: 'text-indigo-400' },
                        { name: 'All Springs', href: '/water-systems/springs', icon: Droplet, desc: 'Perennial, seasonal & community springs', color: 'text-emerald-400' },
                        { name: 'All Watersheds', href: '/water-systems/watersheds', icon: Map, desc: 'Basins, catchments & hydrological units', color: 'text-amber-400' },
                        { name: 'Glaciers & Cryosphere', href: '/water-systems/glaciers', icon: Mountain, desc: 'Glaciers & snow-fed systems', color: 'text-slate-400' },
                        { name: 'Water Quality', href: '/water-systems/water-quality', icon: Thermometer, desc: 'Quality monitoring & trends', color: 'text-teal-400' },
                        { name: 'Algal Bloom Intelligence', href: '/water-systems/algal-bloom-intelligence', icon: Waves, desc: 'Eutrophication & bloom risk monitoring', color: 'text-emerald-400' },
                        { name: 'Fisheries & Aquatic Life', href: '/water-systems/fisheries', icon: Fish, desc: 'Fish species & fishery management', color: 'text-violet-400' },
                        { name: 'Flood & Hydrological Risk', href: '/water-systems/flood-risk', icon: AlertTriangle, desc: 'Flood zones & hazard assessment', color: 'text-red-400' },
                        { name: 'Restoration & Rejuvenation', href: '/water-systems/restoration', icon: Hammer, desc: 'Conservation & restoration projects', color: 'text-lime-400' },
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

                {/* Trails & Sightings Dropdown */}
                {item.hasDropdown && activeDropdown === item.label && item.label === 'Trails & Sightings' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-64 sm:w-72 max-w-[calc(100vw-2rem)] glass-intense rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50 pt-2"
                  >
                    <div className="p-3 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <Footprints className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Trails & Sightings
                        </span>
                      </div>
                    </div>
                    <div className="py-2">
                      <Link
                        href="/trails-sightings"
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer"
                      >
                        <span className="font-medium">👣 Overview</span>
                        <span className="block text-xs text-slate-500 mt-0.5">Field observations & trails</span>
                      </Link>
                      {[
                        { name: 'Hiking Trails', href: '/trails-sightings/hiking-trails', desc: 'Multi-day treks & day hikes' },
                        { name: 'Birding Trails', href: '/trails-sightings/birding-trails', desc: 'Prime birdwatching routes' },
                        { name: 'Wildlife Sightings', href: '/trails-sightings/wildlife-sightings', desc: 'Mammal observations' },
                        { name: 'Bird Sightings', href: '/trails-sightings/bird-sightings', desc: 'Avian records' },
                        { name: 'Submit Sighting', href: '/submit-sighting', desc: 'Contribute observations' },
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
                    className="absolute top-full left-0 w-72 sm:w-80 max-w-[calc(100vw-2rem)] glass-intense rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50 pt-2"
                  >
                    <div className="p-3 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Risk & Monitoring
                        </span>
                      </div>
                    </div>
                    <div className="py-2">
                      <Link
                        href="/risk-monitoring"
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer"
                      >
                        <span className="font-medium">⚠️ Overview</span>
                        <span className="block text-xs text-slate-500 mt-0.5">Risk monitoring dashboard</span>
                      </Link>
                      <Link
                        href="/risk-monitoring/hazard-risks"
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer"
                      >
                        <span className="font-medium">🏔️ Hazard Risks</span>
                        <span className="block text-xs text-slate-500 mt-0.5">Multi-hazard risk systems</span>
                      </Link>
                      <Link
                        href="/risk-monitoring/pollution-stress"
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer"
                      >
                        <span className="font-medium">🌫️ Pollution & Stress</span>
                        <span className="block text-xs text-slate-500 mt-0.5">Environmental pressure monitoring</span>
                      </Link>
                      <Link
                        href="/risk-monitoring/biodiversity-risks"
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer"
                      >
                        <span className="font-medium">🦌 Biodiversity Risks</span>
                        <span className="block text-xs text-slate-500 mt-0.5">Ecological vulnerability tracking</span>
                      </Link>
                      <Link
                        href="/risk-monitoring/response-operations"
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer"
                      >
                        <span className="font-medium">🚨 Response & Operations</span>
                        <span className="block text-xs text-slate-500 mt-0.5">Response and operational intelligence</span>
                      </Link>
                      <Link
                        href="/risk-monitoring/live-alerts-advisories"
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer"
                      >
                        <span className="font-medium">🔔 Live Alerts</span>
                        <span className="block text-xs text-slate-500 mt-0.5">Real-time warnings</span>
                      </Link>
                      <Link
                        href="/risk-monitoring/dashboards"
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                      >
                        <span className="font-medium">📊 Dashboards</span>
                        <span className="block text-xs text-slate-500 mt-0.5">Risk monitoring dashboards</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="hidden xl:flex items-center gap-1">
            {/* Alerts */}
            <Button variant="ghost" size="sm" className="relative text-slate-300 hover:text-white p-1.5 sm:p-2">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full signal-pulse" />
            </Button>

            {/* Settings */}
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white p-1.5 sm:p-2">
              <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>

            {/* Profile */}
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white p-1.5 sm:p-2">
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
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

                                  {item.label === 'Seasonal Ecology' && (
                                    <>
                                      <Link href="/seasonal-ecology" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        🍂 Overview
                                      </Link>
                                      <Link href="/seasonal-ecology/seasonal-landscapes" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Seasonal Landscapes
                                      </Link>
                                      <Link href="/seasonal-ecology/bloom-mapping" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Bloom Mapping
                                      </Link>
                                      <Link href="/seasonal-ecology/migration-windows" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Migration Windows
                                      </Link>
                                      <Link href="/seasonal-ecology/pollinator-windows" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Pollinator Windows
                                      </Link>
                                      <Link href="/seasonal-ecology/phenology-records" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Phenology Records
                                      </Link>
                                      <Link href="/seasonal-ecology/habitat-signals" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Habitat Signals
                                      </Link>
                                      <Link href="/seasonal-ecology/water-transitions" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Water Transitions
                                      </Link>
                                      <Link href="/seasonal-ecology/species-activity" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Species Activity
                                      </Link>
                                      <Link href="/seasonal-ecology/climate-windows" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Climate Windows
                                      </Link>
                                      <Link href="/seasonal-ecology/reports-references" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Reports & References
                                      </Link>
                                    </>
                                  )}

                                  {item.label === 'Trails & Sightings' && (
                                    <>
                                      <Link href="/trails-sightings" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        👣 Overview
                                      </Link>
                                      <Link href="/trails-sightings/hiking-trails" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Hiking Trails
                                      </Link>
                                      <Link href="/trails-sightings/birding-trails" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Birding Trails
                                      </Link>
                                      <Link href="/trails-sightings/wildlife-sightings" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Wildlife Sightings
                                      </Link>
                                      <Link href="/trails-sightings/bird-sightings" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Bird Sightings
                                      </Link>
                                      <Link href="/submit-sighting" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded transition-colors">
                                        Submit Sighting
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
