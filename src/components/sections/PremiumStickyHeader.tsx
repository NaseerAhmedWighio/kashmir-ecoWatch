'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/common/Logo';
import Link from 'next/link';
import {
  Leaf,
  Menu,
  X,
  Map,
  ChevronDown,
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
  Database,
  BarChart3,
  Book,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrolledHeader } from '@/hooks/useScrolledHeader';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Protected Areas', href: '/protected-network', hasDropdown: true },
  { label: 'Biodiversity', href: '/biodiversity', hasDropdown: true },
  { label: 'Water Systems', href: '/water-systems', hasDropdown: true },
  { label: 'Seasonal Ecology', href: '/seasonal-ecology', hasDropdown: true },
  { label: 'Trails & Sightings', href: '/trails-sightings', hasDropdown: true },
  { label: 'Risk & Monitoring', href: '/risk-monitoring', hasDropdown: true },
];

interface DropdownItem {
  name: string;
  href: string;
  desc?: string;
  icon?: React.ComponentType<{ className?: string }>;
  color?: string;
}

export function PremiumStickyHeader() {
  const { isScrolled, isCompact, scrollDirection } = useScrolledHeader({ threshold: 60, smoothTransition: true });
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedMobileSubmenus, setExpandedMobileSubmenus] = useState<Set<string>>(new Set());
  const [searchOpen, setSearchOpen] = useState(false);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
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

  const getDropdownItems = (label: string): DropdownItem[] => {
    switch (label) {
      case 'Protected Areas':
        return [
          { name: '🗺️ Network Overview', href: '/protected-network', desc: 'Complete protected area system' },
          { name: '📍 Protected Area Atlas', href: '/protected-network/atlas', desc: 'Interactive GIS mapping' },
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
        ];
      case 'Biodiversity':
        return [
          { name: '📊 All Species', href: '/biodiversity', desc: 'Browse complete biodiversity database' },
          { name: 'Mammals', href: '/biodiversity/mammals', desc: 'Ungulates, carnivores & more' },
          { name: 'Birds', href: '/biodiversity/birds', desc: 'Resident & migratory species' },
          { name: 'Fish', href: '/biodiversity/fish', desc: 'Aquatic biodiversity' },
          { name: 'Plants', href: '/biodiversity/plants', desc: 'Flora & vegetation' },
          { name: 'Medicinal Plants', href: '/biodiversity/medicinal-plants', desc: 'Traditional medicinal flora' },
          { name: 'Threatened Species', href: '/biodiversity/threatened-species', desc: 'Priority conservation taxa' },
        ];
      case 'Water Systems':
        return [
          { name: '💧 Overview', href: '/water-systems', desc: 'Complete hydrological intelligence' },
          { name: 'All Lakes', href: '/water-systems/lakes', desc: 'Major, minor, urban & high-altitude lakes' },
          { name: 'All Wetlands', href: '/water-systems/wetlands', desc: 'Marshes, floodplain & Ramsar wetlands' },
          { name: 'Rivers & Streams', href: '/water-systems/rivers', desc: 'Major rivers, tributaries & streams' },
          { name: 'All Springs', href: '/water-systems/springs', desc: 'Perennial, seasonal & community springs' },
          { name: 'All Watersheds', href: '/water-systems/watersheds', desc: 'Basins, catchments & hydrological units' },
          { name: 'Glaciers & Cryosphere', href: '/water-systems/glaciers', desc: 'Glaciers & snow-fed systems' },
          { name: 'Water Quality', href: '/water-systems/water-quality', desc: 'Quality monitoring & trends' },
          { name: 'Fisheries & Aquatic Life', href: '/water-systems/fisheries', desc: 'Fish species & fishery management' },
          { name: 'Flood & Hydrological Risk', href: '/water-systems/flood-risk', desc: 'Flood zones & hazard assessment' },
          { name: 'Restoration & Rejuvenation', href: '/water-systems/restoration', desc: 'Conservation & restoration projects' },
        ];
      case 'Seasonal Ecology':
        return [
          { name: '🍂 Overview', href: '/seasonal-ecology', desc: 'Kashmir seasonal intelligence' },
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
        ];
      case 'Trails & Sightings':
        return [
          { name: '👣 Overview', href: '/trails-sightings', desc: 'Field observations & trails' },
          { name: 'Hiking Trails', href: '/trails-sightings/hiking-trails', desc: 'Multi-day treks & day hikes' },
          { name: 'Birding Trails', href: '/trails-sightings/birding-trails', desc: 'Prime birdwatching routes' },
          { name: 'Wildlife Sightings', href: '/trails-sightings/wildlife-sightings', desc: 'Mammal observations' },
          { name: 'Bird Sightings', href: '/trails-sightings/bird-sightings', desc: 'Avian records' },
          { name: 'Submit Sighting', href: '/submit-sighting', desc: 'Contribute observations' },
        ];
      case 'Risk & Monitoring':
        return [
          { name: '⚠️ Overview', href: '/risk-monitoring', desc: 'Risk monitoring dashboard' },
          { name: '🏔️ Hazard Risks', href: '/risk-monitoring/hazard-risks', desc: 'Multi-hazard risk systems' },
          { name: '🌫️ Pollution & Stress', href: '/risk-monitoring/pollution-stress', desc: 'Environmental pressure monitoring' },
          { name: '🦌 Biodiversity Risks', href: '/risk-monitoring/biodiversity-risks', desc: 'Species threat intelligence' },
          { name: '🚨 Response & Operations', href: '/risk-monitoring/response-operations', desc: 'Response and operational intelligence' },
          { name: '🔔 Live Alerts', href: '/risk-monitoring/live-alerts-advisories', desc: 'Real-time warnings' },
          { name: '📊 Dashboards', href: '/risk-monitoring/dashboards', desc: 'Risk monitoring dashboards' },
        ];
      default:
        return [];
    }
  };

  const renderDropdownItems = (items: DropdownItem[]) => (
    <>
      {items.map((subitem) => (
        <Link
          key={subitem.name}
          href={subitem.href}
          className="block px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
        >
          <span className="font-medium">{subitem.name}</span>
          {subitem.desc && (
            <span className="block text-xs text-slate-500 mt-0.5">{subitem.desc}</span>
          )}
        </Link>
      ))}
    </>
  );

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out',
        // Expanded state (hero)
        !isScrolled && 'bg-transparent',
        // Transitioning state
        isScrolled && !isCompact && 'bg-slate-950/80 backdrop-blur-md border-b border-white/5',
        // Compact sticky state
        isCompact && 'bg-slate-950/95 backdrop-blur-xl shadow-2xl shadow-black/50 border-b border-white/10'
      )}
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div
          className={cn(
            'flex items-center justify-between transition-all duration-300 ease-out',
            // Height transitions
            !isCompact ? 'h-24 md:h-28' : 'h-16 md:h-18'
          )}
        >
          {/* Logo - Premium with variants */}
          <Logo variant={isCompact ? 'compact' : 'expanded'} />

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
                  className={cn(
                    'flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer',
                    activeDropdown === item.label
                      ? 'text-white bg-white/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  )}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown
                      className={cn(
                        'w-3.5 h-3.5 transition-transform duration-200',
                        activeDropdown === item.label && 'rotate-180'
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown Panel */}
                {item.hasDropdown && activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-80 max-w-[calc(100vw-2rem)] mt-2 glass-intense rounded-xl shadow-2xl border border-white/10 overflow-hidden z-50"
                  >
                    {/* Dropdown Header */}
                    <div className="px-4 py-3 border-b border-white/5 bg-gradient-to-r from-slate-900/50 to-slate-800/50">
                      <div className="flex items-center gap-2">
                        {item.label === 'Protected Areas' && <Shield className="w-4 h-4 text-emerald-400" />}
                        {item.label === 'Biodiversity' && <Leaf className="w-4 h-4 text-emerald-400" />}
                        {item.label === 'Water Systems' && <Droplet className="w-4 h-4 text-sky-400" />}
                        {item.label === 'Seasonal Ecology' && <Calendar className="w-4 h-4 text-amber-400" />}
                        {item.label === 'Trails & Sightings' && <Footprints className="w-4 h-4 text-teal-400" />}
                        {item.label === 'Risk & Monitoring' && <AlertTriangle className="w-4 h-4 text-red-400" />}
                        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          {item.label}
                        </span>
                      </div>
                    </div>

                    {/* Dropdown Items */}
                    <div className="py-2 max-h-[70vh] overflow-y-auto">
                      {renderDropdownItems(getDropdownItems(item.label))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="hidden xl:flex items-center gap-1">
            {/* Search toggle */}
            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 'auto', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-48 px-3 py-1.5 pl-9 text-sm rounded-lg bg-slate-800/50 border border-white/10 outline-none text-white placeholder:text-slate-500 focus:border-white/20 focus:bg-slate-800 transition-colors"
                      autoFocus
                      onBlur={() => setSearchOpen(false)}
                    />
                    <Search className="w-4 h-4 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Search button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-slate-300 hover:text-white p-2"
            >
              <Search className="w-5 h-5" />
            </Button>

            {/* Alerts */}
            <Button variant="ghost" size="sm" className="relative text-slate-300 hover:text-white p-2">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </Button>

            {/* Settings */}
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white p-2">
              <Settings className="w-5 h-5" />
            </Button>

            {/* Profile */}
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white p-2">
              <User className="w-5 h-5" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={cn(
              'xl:hidden p-2 rounded-lg transition-colors',
              isCompact ? 'hover:bg-white/10' : 'hover:bg-white/5'
            )}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-drawer"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
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
              className="fixed inset-y-0 left-0 w-[85%] sm:w-[75%] max-w-[320px] bg-slate-900 z-[51] xl:hidden shadow-2xl flex flex-col h-dvh border-r border-white/10"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              {/* Drawer header */}
              <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-white/10">
                <Logo variant="mobile" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Scrollable menu content */}
              <nav
                className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-3 py-4 space-y-0.5"
                role="navigation"
                aria-label="Mobile navigation"
              >
                {navItems.map((item) => {
                  const isExpanded = expandedMobileSubmenus.has(item.label);
                  return (
                    <div key={item.label} className="border-b border-white/5 last:border-0">
                      {item.hasDropdown ? (
                        <>
                          <button
                            onClick={() => toggleMobileSubmenu(item.label)}
                            className="w-full flex items-center justify-between gap-3 px-3 py-4 text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors cursor-pointer text-base font-medium"
                            aria-expanded={isExpanded}
                          >
                            <span>{item.label}</span>
                            <ChevronDown
                              className={cn(
                                'w-5 h-5 transition-transform duration-200',
                                isExpanded && 'rotate-180'
                              )}
                            />
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="ml-4 mt-2 mb-3 space-y-0.5">
                                  {renderDropdownItems(
                                    getDropdownItems(item.label).map(item => ({
                                      ...item,
                                      name: item.name.replace(/^[^\s]+ /, '') // Remove emoji for mobile
                                    }))
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

                {/* Mobile search and actions */}
                <div className="pt-6 mt-6 border-t border-white/10 space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="w-full px-4 py-3 pl-11 rounded-lg bg-white/5 border border-white/10 outline-none text-sm text-white placeholder:text-slate-500 focus:border-white/20 focus:bg-white/10 transition-colors"
                    />
                    <Search className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  </div>
                  <Button className="w-full text-sm">Access Platform</Button>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
