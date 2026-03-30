'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { GlobalSearch } from '@/components/common/GlobalSearch';
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
  Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Protected Areas', href: '/protected-network', icon: Shield, hasDropdown: true },
  { label: 'Biodiversity', href: '/biodiversity', icon: Leaf, hasDropdown: true },
  { label: 'Water Systems', href: '/water-systems', hasDropdown: true },
  { label: 'Seasonal Ecology', href: '/seasonal-ecology', icon: Calendar, hasDropdown: true },
  { label: 'Trails & Sightings', href: '/trails-sightings', icon: Footprints, hasDropdown: true },
  { label: 'Risk & Monitoring', href: '/risk-monitoring', icon: AlertTriangle, hasDropdown: true },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass-intense shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-4 group">
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-forest-500 to-glacier-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 glow-forest">
              <Leaf className="w-7 h-7 text-white" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full signal-pulse" />
            </div>
            <div className="hidden md:block">
              <h1 className="text-base font-bold text-white tracking-wide">
                Kashmir EcoWatch
              </h1>
              <p className="text-xs text-slate-400 tracking-wide">
                by Dr. Kumar Foundation USA
              </p>
            </div>
          </a>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-200 cursor-pointer ${
                    item.hasDropdown ? 'hover:bg-white/10' : ''
                  }`}
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
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
                    className="absolute top-full left-0 mt-2 w-72 glass-intense rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50"
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
                    className="absolute top-full left-0 mt-2 w-80 glass-intense rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50"
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
                    className="absolute top-full left-0 mt-2 w-80 glass-intense rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50"
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

                {/* Seasonal Ecology Dropdown */}
                {item.hasDropdown && activeDropdown === item.label && item.label === 'Seasonal Ecology' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-80 glass-intense rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50"
                  >
                    <div className="p-3 border-b border-white/5">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Seasonal Ecology
                        </span>
                      </div>
                    </div>
                    <div className="py-2">
                      <Link
                        href="/seasonal-ecology"
                        className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 cursor-pointer"
                      >
                        <span className="font-medium">🍂 Overview</span>
                        <span className="block text-xs text-slate-500 mt-0.5">Kashmir seasonal intelligence</span>
                      </Link>
                      {[
                        { name: 'Seasonal Landscapes', href: '/seasonal-ecology/seasonal-landscapes', desc: 'Landscape-scale seasonal patterns' },
                        { name: 'Bloom Mapping', href: '/seasonal-ecology/bloom-mapping', desc: 'Flowering zones & calendars' },
                        { name: 'Migration Windows', href: '/seasonal-ecology/migration-windows', desc: 'Bird migration timing' },
                        { name: 'Pollinator Windows', href: '/seasonal-ecology/pollinator-windows', desc: 'Pollinator activity periods' },
                        { name: 'Phenology Records', href: '/seasonal-ecology/phenology-records', desc: 'Seasonal observation records' },
                        { name: 'Habitat Signals', href: '/seasonal-ecology/habitat-signals', desc: 'Seasonal habitat changes' },
                        { name: 'Water Transitions', href: '/seasonal-ecology/water-transitions', desc: 'Wetland & water shifts' },
                        { name: 'Species Activity', href: '/seasonal-ecology/species-activity', desc: 'Seasonal species behavior' },
                        { name: 'Climate Windows', href: '/seasonal-ecology/climate-windows', desc: 'Access & visibility windows' },
                        { name: 'Reports & References', href: '/seasonal-ecology/reports-references', desc: 'Evidence & documentation' },
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

                {/* Trails & Sightings Dropdown */}
                {item.hasDropdown && activeDropdown === item.label && item.label === 'Trails & Sightings' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-72 glass-intense rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50"
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

                {/* Risk & Monitoring Dropdown */}
                {item.hasDropdown && activeDropdown === item.label && item.label === 'Risk & Monitoring' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-72 glass-intense rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50"
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
                      {[
                        { name: 'Disaster Risks', href: '/risk-monitoring/disaster-risks', desc: 'Multi-hazard assessment' },
                        { name: 'Flood Risks', href: '/risk-monitoring/flood-flash-flood-risks', desc: 'Flood & flash flood zones' },
                        { name: 'Landslide Risks', href: '/risk-monitoring/landslide-slope-risks', desc: 'Slope stability monitoring' },
                        { name: 'Live Alerts', href: '/risk-monitoring/live-alerts-advisories', desc: 'Real-time warnings' },
                        { name: 'Dashboards', href: '/risk-monitoring/dashboards', desc: 'Risk monitoring dashboards' },
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
              </div>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Global Search */}
            <GlobalSearch />

            {/* Alerts */}
            <Button variant="ghost" size="sm" className="relative text-slate-300 hover:text-white">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full signal-pulse" />
            </Button>

            {/* Settings */}
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
              <Settings className="w-5 h-5" />
            </Button>

            {/* Profile */}
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
              <User className="w-5 h-5" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass-intense border-t border-white/10"
          >
            <div className="container mx-auto px-6 py-6 space-y-3">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon && <item.icon className="w-5 h-5" />}
                      {item.label}
                    </div>
                    {item.hasDropdown && (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </Link>
                  {/* Protected Areas Mobile Submenu */}
                  {item.hasDropdown && item.label === 'Protected Areas' && (
                    <div className="ml-8 mt-2 space-y-1">
                      <Link
                        href="/protected-network"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        🗺️ Network Overview
                      </Link>
                      <Link
                        href="/protected-network/atlas"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        📍 Protected Area Atlas
                      </Link>
                      <Link
                        href="/protected-network/national-parks"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        National Parks
                      </Link>
                      <Link
                        href="/protected-network/wildlife-sanctuaries"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Wildlife Sanctuaries
                      </Link>
                      <Link
                        href="/protected-network/wetland-reserves"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Wetland Reserves
                      </Link>
                      <Link
                        href="/protected-network/conservation-reserves"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Conservation Reserves
                      </Link>
                      <Link
                        href="/protected-network/bird-and-habitat-areas"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Bird & Habitat Areas
                      </Link>
                      <Link
                        href="/protected-network/species-intelligence"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Species Intelligence
                      </Link>
                      <Link
                        href="/protected-network/corridors-and-connectivity"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Corridors & Connectivity
                      </Link>
                      <Link
                        href="/protected-network/trails-and-sightings"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Trails & Sightings
                      </Link>
                      <Link
                        href="/protected-network/monitoring-and-threats"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Monitoring & Threats
                      </Link>
                      <Link
                        href="/protected-network/reports-and-plans"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Reports & Plans
                      </Link>
                    </div>
                  )}
                  {/* Biodiversity Mobile Submenu */}
                  {item.hasDropdown && item.label === 'Biodiversity' && (
                    <div className="ml-8 mt-2 space-y-1">
                      <Link
                        href="/biodiversity"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        📊 All Species
                      </Link>
                      <Link
                        href="/biodiversity/mammals"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Mammals
                      </Link>
                      <Link
                        href="/biodiversity/birds"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Birds
                      </Link>
                      <Link
                        href="/biodiversity/fish"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Fish
                      </Link>
                      <Link
                        href="/biodiversity/plants"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Plants
                      </Link>
                      <Link
                        href="/biodiversity/medicinal-plants"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Medicinal Plants
                      </Link>
                      <Link
                        href="/biodiversity/threatened-species"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Threatened Species
                      </Link>
                    </div>
                  )}
                  {/* Water Systems Mobile Submenu */}
                  {item.hasDropdown && item.label === 'Water Systems' && (
                    <div className="ml-8 mt-2 space-y-1">
                      <Link
                        href="/water-systems"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        💧 Overview
                      </Link>
                      <Link
                        href="/water-systems/lakes"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        All Lakes
                      </Link>
                      <Link
                        href="/water-systems/wetlands"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        All Wetlands
                      </Link>
                      <Link
                        href="/water-systems/rivers"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Rivers & Streams
                      </Link>
                      <Link
                        href="/water-systems/springs"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        All Springs
                      </Link>
                      <Link
                        href="/water-systems/watersheds"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        All Watersheds
                      </Link>
                      <Link
                        href="/water-systems/glaciers"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Glaciers & Cryosphere
                      </Link>
                      <Link
                        href="/water-systems/water-quality"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Water Quality
                      </Link>
                      <Link
                        href="/water-systems/fisheries"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Fisheries & Aquatic Life
                      </Link>
                      <Link
                        href="/water-systems/flood-risk"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Flood & Hydrological Risk
                      </Link>
                      <Link
                        href="/water-systems/restoration"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Restoration & Rejuvenation
                      </Link>
                    </div>
                  )}
                  {/* Seasonal Ecology Mobile Submenu */}
                  {item.hasDropdown && item.label === 'Seasonal Ecology' && (
                    <div className="ml-8 mt-2 space-y-1">
                      <Link
                        href="/seasonal-ecology"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        🍂 Overview
                      </Link>
                      <Link
                        href="/seasonal-ecology/seasonal-landscapes"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Seasonal Landscapes
                      </Link>
                      <Link
                        href="/seasonal-ecology/bloom-mapping"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Bloom Mapping
                      </Link>
                      <Link
                        href="/seasonal-ecology/migration-windows"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Migration Windows
                      </Link>
                      <Link
                        href="/seasonal-ecology/pollinator-windows"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Pollinator Windows
                      </Link>
                      <Link
                        href="/seasonal-ecology/phenology-records"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Phenology Records
                      </Link>
                      <Link
                        href="/seasonal-ecology/habitat-signals"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Habitat Signals
                      </Link>
                      <Link
                        href="/seasonal-ecology/water-transitions"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Water Transitions
                      </Link>
                      <Link
                        href="/seasonal-ecology/species-activity"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Species Activity
                      </Link>
                      <Link
                        href="/seasonal-ecology/climate-windows"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Climate Windows
                      </Link>
                      <Link
                        href="/seasonal-ecology/reports-references"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Reports & References
                      </Link>
                    </div>
                  )}
                  {/* Trails & Sightings Mobile Submenu */}
                  {item.hasDropdown && item.label === 'Trails & Sightings' && (
                    <div className="ml-8 mt-2 space-y-1">
                      <Link
                        href="/trails-sightings"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        👣 Overview
                      </Link>
                      <Link
                        href="/trails-sightings/sightings"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        All Sightings
                      </Link>
                      <Link
                        href="/trails-sightings/trails"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Ecological Trails
                      </Link>
                      <Link
                        href="/trails-sightings/submit"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Submit Sighting
                      </Link>
                      <Link
                        href="/trails-sightings/maps"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Trail Maps
                      </Link>
                    </div>
                  )}
                  {/* Risk & Monitoring Mobile Submenu */}
                  {item.hasDropdown && item.label === 'Risk & Monitoring' && (
                    <div className="ml-8 mt-2 space-y-1">
                      <Link
                        href="/risk-monitoring"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        ⚠️ Overview
                      </Link>
                      <Link
                        href="/risk-monitoring/flood-flash-flood-risks"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Flood Risk
                      </Link>
                      <Link
                        href="/risk-monitoring/forest-fire-risks"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Wildfire Monitoring
                      </Link>
                      <Link
                        href="/risk-monitoring/landslide-slope-risks"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Landslide Risk
                      </Link>
                      <Link
                        href="/risk-monitoring/disaster-risks"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Climate Hazards
                      </Link>
                      <Link
                        href="/risk-monitoring/live-alerts-advisories"
                        className="block px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors"
                      >
                        Early Warning
                      </Link>
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-3 pl-10 rounded-lg glass-light border border-white/10 outline-none text-sm text-white"
                  />
                  <Search className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
                <Button className="w-full">Access Platform</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
