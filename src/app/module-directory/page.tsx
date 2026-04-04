'use client';

import React, { useRef } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Leaf, Shield, Droplet, Factory, AlertTriangle, Upload, Building2, Compass,
  ArrowRight, Grid3x3, Bird, Fish, Flower2, Mountain, Map, Calendar,
  Eye, TrendingUp, FileText, Bell, Phone, BookOpen, Users, Scale,
  Landmark, Gavel, ShieldCheck, HandCoins, Database, Scale as ScaleIcon,
  Accessibility, LandPlot, MapPin, Route, Waves, Flame, Zap,
  Droplets, TestTube, Factory as FactoryIcon, Trash2, Recycle,
  Wind, Thermometer, Info, Search, ListFilter
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface ModuleItem {
  name: string;
  route: string;
  description: string;
  icon?: React.ElementType;
}

interface ModuleGroup {
  id: string;
  title: string;
  description: string;
  badge: string;
  icon: React.ElementType;
  gradient: string;
  modules: ModuleItem[];
}

const moduleGroups: ModuleGroup[] = [
  {
    id: 'biodiversity',
    title: 'Biodiversity Intelligence',
    description: 'Complete species database, habitat monitoring, and ecological intelligence across Kashmir.',
    badge: 'Biodiversity',
    icon: Leaf,
    gradient: 'from-emerald-500 to-teal-600',
    modules: [
      { name: 'Species Directory', route: '/biodiversity', description: 'Complete biodiversity database', icon: Search },
      { name: 'Mammals', route: '/biodiversity/mammals', description: 'Ungulates, carnivores, primates', icon: Mountain },
      { name: 'Birds', route: '/biodiversity/birds', description: 'Resident and migratory species', icon: Bird },
      { name: 'Fish & Aquatic Life', route: '/biodiversity/fish', description: 'Freshwater and aquatic biodiversity', icon: Fish },
      { name: 'Plants & Flora', route: '/biodiversity/plants', description: 'Vascular plants and vegetation', icon: Flower2 },
      { name: 'Medicinal Flora', route: '/biodiversity/medicinal-plants', description: 'Traditional medicinal plants', icon: Leaf },
      { name: 'Threatened Species', route: '/biodiversity/threatened-species', description: 'CR, EN, VU conservation taxa', icon: Shield },
      { name: 'Wildlife Sightings', route: '/biodiversity/wildlife-sightings', description: 'Verified and community observations', icon: Eye },
      { name: 'Birding Hotspots', route: '/biodiversity/birding-hotspots', description: 'Prime observation areas', icon: MapPin },
      { name: 'Migration Windows', route: '/biodiversity/migration-windows', description: 'Migratory bird timing', icon: Calendar },
      { name: 'Pollinator Activity', route: '/biodiversity/pollinator-activity', description: 'Pollinator watch periods', icon: Leaf },
      { name: 'Phenology & Flowering', route: '/biodiversity/phenology-flowering', description: 'Seasonal flowering records', icon: Flower2 },
      { name: 'Habitat Signals', route: '/biodiversity/habitat-signals', description: 'Habitat stress and transitions', icon: FactoryIcon },
      { name: 'Seasonal Species Activity', route: '/biodiversity/seasonal-activity', description: 'Breeding and activity windows', icon: Calendar },
      { name: 'District Biodiversity Profiles', route: '/biodiversity/district-profiles', description: 'Regional intelligence', icon: Map },
      { name: 'Biodiversity Dashboards', route: '/biodiversity/dashboards', description: 'Analytics and trends', icon: TrendingUp },
      { name: 'Biodiversity Overview', route: '/biodiversity/overview', description: 'Module command center', icon: Info },
    ],
  },
  {
    id: 'protected-areas',
    title: 'Protected Areas',
    description: 'Protected area network, conservation landscapes, and habitat preservation intelligence.',
    badge: 'Protected Areas',
    icon: Shield,
    gradient: 'from-amber-500 to-orange-600',
    modules: [
      { name: 'Network Overview', route: '/protected-network', description: 'Complete protected area system', icon: Map },
      { name: 'Protected Area Atlas', route: '/protected-network/atlas', description: 'Interactive GIS mapping', icon: MapPin },
      { name: 'National Parks', route: '/protected-network/national-parks', description: 'Core conservation landscapes', icon: Mountain },
      { name: 'Wildlife Sanctuaries', route: '/protected-network/wildlife-sanctuaries', description: 'Protected habitats', icon: Leaf },
      { name: 'Wetland Reserves', route: '/protected-network/wetland-reserves', description: 'Marsh and bird conservation', icon: Droplets },
      { name: 'Conservation Reserves', route: '/protected-network/conservation-reserves', description: 'Community landscapes', icon: Users },
      { name: 'Bird & Habitat Areas', route: '/protected-network/bird-and-habitat-areas', description: 'Important bird areas', icon: Bird },
      { name: 'Species Intelligence', route: '/protected-network/species-intelligence', description: 'PA overlap and distribution', icon: Search },
      { name: 'Corridors & Connectivity', route: '/protected-network/corridors-and-connectivity', description: 'Landscape linkages', icon: Route },
      { name: 'Trails & Sightings', route: '/protected-network/trails-and-sightings', description: 'Field observations', icon: Eye },
      { name: 'Monitoring & Threats', route: '/protected-network/monitoring-and-threats', description: 'Conservation alerts', icon: AlertTriangle },
      { name: 'Reports & Plans', route: '/protected-network/reports-and-plans', description: 'Management documents', icon: FileText },
    ],
  },
  {
    id: 'water-systems',
    title: 'Water Systems',
    description: 'Hydrological intelligence, water quality monitoring, and aquatic ecosystem management.',
    badge: 'Water Systems',
    icon: Droplet,
    gradient: 'from-cyan-500 to-blue-600',
    modules: [
      { name: 'Overview', route: '/water-systems', description: 'Complete hydrological intelligence', icon: Droplets },
      { name: 'Lakes', route: '/water-systems/lakes', description: 'Major, minor, urban and high-altitude lakes', icon: MapPin },
      { name: 'Wetlands', route: '/water-systems/wetlands', description: 'Marshes, floodplain and Ramsar wetlands', icon: Droplets },
      { name: 'Rivers & Streams', route: '/water-systems/rivers', description: 'Major rivers, tributaries and streams', icon: Waves },
      { name: 'Springs', route: '/water-systems/springs', description: 'Perennial, seasonal and community springs', icon: Droplet },
      { name: 'Watersheds', route: '/water-systems/watersheds', description: 'Basins, catchments and hydrological units', icon: Map },
      { name: 'Glaciers & Cryosphere', route: '/water-systems/glaciers', description: 'Glaciers and snow-fed systems', icon: Mountain },
      { name: 'Drinking Water Sources', route: '/water-systems/drinking-water-sources', description: 'Spring and surface supply vulnerability', icon: TestTube },
      { name: 'Water Quality', route: '/water-systems/water-quality', description: 'Quality monitoring and trends', icon: TestTube },
      { name: 'Algal Bloom Intelligence', route: '/water-systems/algal-bloom-intelligence', description: 'Eutrophication and bloom risk', icon: FactoryIcon },
      { name: 'Aquatic Life & Fisheries', route: '/water-systems/fisheries', description: 'Fish species and fishery management', icon: Fish },
      { name: 'Restoration & Rejuvenation', route: '/water-systems/restoration', description: 'Conservation and restoration projects', icon: Leaf },
      { name: 'Flood & Hydrological Risk', route: '/water-systems/flood-risk', description: 'Flood zones and hazard assessment', icon: AlertTriangle },
      { name: 'Water Systems Dashboards', route: '/water-systems/dashboards', description: 'Analytics, trends and heatmaps', icon: TrendingUp },
    ],
  },
  {
    id: 'environmental-monitoring',
    title: 'Environmental Monitoring',
    description: 'Environmental intelligence command center, pollution tracking, and infrastructure monitoring.',
    badge: 'Environmental Monitoring',
    icon: Factory,
    gradient: 'from-violet-500 to-purple-600',
    modules: [
      { name: 'Overview', route: '/environmental-monitoring', description: 'Environmental intelligence command center', icon: Info },
      { name: 'Solid Waste', route: '/environmental-monitoring/solid-waste', description: 'Dumping, landfill stress, open waste', icon: Trash2 },
      { name: 'Bio-Waste', route: '/environmental-monitoring/bio-waste', description: 'Organic waste, decomposition zones', icon: Recycle },
      { name: 'Sewage & Wastewater', route: '/environmental-monitoring/sewage-wastewater', description: 'Overflow, outfalls, untreated discharge', icon: Droplets },
      { name: 'Drinking Water', route: '/environmental-monitoring/drinking-water', description: 'Contamination alerts, supply issues', icon: TestTube },
      { name: 'Critical Water Infrastructure', route: '/environmental-monitoring/critical-infrastructure', description: 'Intake points, treatment plants, reservoirs', icon: FactoryIcon },
      { name: 'Air Pollution', route: '/environmental-monitoring/air-pollution', description: 'AQI, particulate, smoke, burning', icon: Wind },
      { name: 'Environmental Health Signals', route: '/environmental-monitoring/environmental-health', description: 'Odor, fish kill, stagnant water', icon: Thermometer },
      { name: 'Utility Incidents & Advisories', route: '/environmental-monitoring/utility-incidents', description: 'Service failures, emergency notices', icon: Bell },
      { name: 'Environmental Monitoring Dashboards', route: '/environmental-monitoring/dashboards', description: 'District comparison and stress heatmaps', icon: TrendingUp },
    ],
  },
  {
    id: 'risk-monitoring',
    title: 'Risk & Monitoring',
    description: 'Risk intelligence command center, hazard monitoring, and emergency response tracking.',
    badge: 'Risk & Monitoring',
    icon: AlertTriangle,
    gradient: 'from-red-500 to-rose-600',
    modules: [
      { name: 'Overview', route: '/risk-monitoring', description: 'Risk intelligence command center', icon: Info },
      { name: 'Hazard Risks', route: '/risk-monitoring/hazard-risks', description: 'Multi-hazard monitoring', icon: AlertTriangle },
      { name: 'Pollution Stress', route: '/risk-monitoring/pollution-stress', description: 'Environmental pollution', icon: FactoryIcon },
      { name: 'Biodiversity Risks', route: '/risk-monitoring/biodiversity-risks', description: 'Species and habitat threats', icon: Leaf },
      { name: 'Response & Operations', route: '/risk-monitoring/response-operations', description: 'Emergency response tracking', icon: Phone },
      { name: 'Live Alerts & Advisories', route: '/risk-monitoring/live-alerts-advisories', description: 'Real-time alert feed', icon: Bell },
      { name: 'Risk Updates', route: '/risk-updates', description: 'Historical risk documentation', icon: FileText },
      { name: 'Risk Dashboards', route: '/risk-monitoring/dashboards', description: 'Integrated risk analytics', icon: TrendingUp },
      { name: 'District Risk Profiles', route: '/risk-monitoring/district-risk-profiles', description: 'District-level risk intelligence', icon: Map },
      { name: 'Environmental Incident Risk', route: '/risk-monitoring/environmental-incident-risk', description: 'Incident aggregation', icon: AlertTriangle },
      { name: 'Flood & Flash Flood Risks', route: '/risk-monitoring/flood-flash-flood-risks', description: 'Flood monitoring', icon: Droplets },
      { name: 'Landslide & Slope Risks', route: '/risk-monitoring/landslide-slope-risks', description: 'Slope stability tracking', icon: Mountain },
      { name: 'Avalanche & Winter Risks', route: '/risk-monitoring/avalanche-winter-risks', description: 'Winter hazard monitoring', icon: Eye },
      { name: 'Forest Fire Risks', route: '/risk-monitoring/forest-fire-risks', description: 'Fire danger assessment', icon: Flame },
      { name: 'Glacier & Cryosphere Risks', route: '/risk-monitoring/glacier-cryosphere-risks', description: 'Glacial threat monitoring', icon: Mountain },
      { name: 'Hydrological Risks', route: '/risk-monitoring/hydrological-risks', description: 'River and basin risk tracking', icon: Waves },
      { name: 'Earthquake Risks', route: '/risk-monitoring/earthquake-risks', description: 'Seismic event monitoring', icon: Zap },
      { name: 'Shelters, Closures & Emergency Routes', route: '/risk-monitoring/shelters-closures-emergency-routes', description: 'Operational status', icon: Route },
      { name: 'Critical Infrastructure Response', route: '/risk-monitoring/critical-infrastructure-response', description: 'Infrastructure monitoring', icon: ShieldCheck },
    ],
  },
  {
    id: 'contribution-pathways',
    title: 'Contribution Pathways',
    description: 'Citizen science, data submission, and public participation programs.',
    badge: 'Contribution',
    icon: Upload,
    gradient: 'from-sky-500 to-indigo-600',
    modules: [
      { name: 'Report an Issue', route: '/report-issue', description: 'Environmental incident reporting', icon: AlertTriangle },
      { name: 'Submit a Sighting', route: '/submit-sighting', description: 'Wildlife and species observation logging', icon: Eye },
      { name: 'Contribute Data', route: '/contribute-data', description: 'Dataset and research submission', icon: Database },
      { name: 'Citizen Science', route: '/citizen-science', description: 'Public participation programs', icon: Users },
      { name: 'Contribution Hub', route: '/contribute', description: 'Central contribution gateway', icon: Upload },
      { name: 'Contribution Guidelines', route: '/contribute-guidelines', description: 'Evidence standards and submission rules', icon: FileText },
    ],
  },
  {
    id: 'institutional-reference',
    title: 'Institutional & Reference',
    description: 'Platform governance, methodology, legal framework, and reference materials.',
    badge: 'Institutional',
    icon: Building2,
    gradient: 'from-slate-500 to-zinc-600',
    modules: [
      { name: 'About', route: '/about', description: 'Platform overview and direction', icon: Info },
      { name: 'Mission', route: '/about/mission', description: 'Platform purpose and vision', icon: TargetIcon },
      { name: 'Contact', route: '/about/contact', description: 'Contact and coordination', icon: Phone },
      { name: 'Partners', route: '/about/partners', description: 'Institutional engagement', icon: Users },
      { name: 'Governance', route: '/about/governance', description: 'Governance and advisory structure', icon: Landmark },
      { name: 'Support & Sponsorship', route: '/about/support-sponsorship', description: 'Institutional backing', icon: HandCoins },
      { name: 'Data Sources', route: '/about/data-sources', description: 'Evidence origins and sourcing', icon: Database },
      { name: 'Methodology', route: '/about/methodology', description: 'Review logic and classification', icon: ScaleIcon },
      { name: 'Verification Model', route: '/about/verification', description: 'Confidence assessment framework', icon: ShieldCheck },
      { name: 'Privacy', route: '/privacy', description: 'Data handling and user privacy', icon: Shield },
      { name: 'Terms of Use', route: '/terms', description: 'Platform use and legal framework', icon: Gavel },
      { name: 'Accessibility', route: '/accessibility', description: 'Inclusive access statement', icon: Accessibility },
      { name: 'Library', route: '/library', description: 'Research and reference materials', icon: BookOpen },
      { name: 'Atlas', route: '/atlas', description: 'Ecological atlas and mapping', icon: Map },
      { name: 'Districts', route: '/districts', description: 'District profiles and intelligence', icon: MapPin },
    ],
  },
  {
    id: 'navigation-discovery',
    title: 'Navigation & Discovery',
    description: 'Platform navigation tools, live mapping, and historical records.',
    badge: 'Navigation',
    icon: Compass,
    gradient: 'from-teal-500 to-cyan-600',
    modules: [
      { name: 'Module Directory', route: '/module-directory', description: 'This page', icon: Grid3x3 },
      { name: 'Entity Explorer', route: '/entity-explorer', description: 'Browse and filter entities', icon: ListFilter },
      { name: 'Live Incident Map', route: '/live-incident-map', description: 'Real-time incident mapping', icon: Map },
      { name: 'Alert Archive', route: '/alert-archive', description: 'Historical alert records', icon: FileText },
    ],
  },
];

// Target icon component (since we need it but can't import it directly)
function TargetIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}

const totalModules = moduleGroups.reduce((acc, group) => acc + group.modules.length, 0);
const totalCategories = moduleGroups.length;
const contributionModules = moduleGroups.find(g => g.id === 'contribution-pathways')?.modules.length || 0;
const riskModules = moduleGroups.find(g => g.id === 'risk-monitoring')?.modules.length || 0;

export default function ModuleDirectoryPage() {
  const router = useRouter();
  const firstGroupRef = useRef<HTMLDivElement>(null);

  const scrollToModules = () => {
    firstGroupRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-20 md:pt-48 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-teal-950/30 to-slate-950" />
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <Grid3x3 className="w-6 h-6 text-violet-400" />
              <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                Platform Modules
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Module Directory
            </h1>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
              Complete system index of all Kashmir EcoWatch modules, intelligence layers, and operational pathways.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-violet-500 to-indigo-600"
                onClick={scrollToModules}
              >
                <Grid3x3 className="w-5 h-5 mr-2" />
                Browse All Modules
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-12 border-y border-white/5 bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Modules', value: totalModules, icon: Grid3x3, color: 'text-violet-400' },
              { label: 'Categories', value: totalCategories, icon: ListFilter, color: 'text-emerald-400' },
              { label: 'Contribution Pathways', value: contributionModules, icon: Upload, color: 'text-sky-400' },
              { label: 'Risk Modules', value: riskModules, icon: AlertTriangle, color: 'text-red-400' },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <stat.icon className={`w-8 h-8 ${stat.color} mx-auto mb-3`} />
                <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Module Groups */}
      {moduleGroups.map((group, groupIndex) => (
        <section
          key={group.id}
          ref={groupIndex === 0 ? firstGroupRef : undefined}
          className={`py-16 ${groupIndex % 2 === 0 ? 'bg-slate-950' : 'bg-gradient-to-b from-slate-950 to-slate-900'}`}
        >
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${group.gradient} flex items-center justify-center shadow-lg`}>
                  <group.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <Badge variant="info" className="mb-1">{group.badge}</Badge>
                  <h2 className="text-3xl md:text-4xl font-bold text-white">{group.title}</h2>
                </div>
              </div>
              <p className="text-slate-400 max-w-3xl text-lg">
                {group.description}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {group.modules.map((mod, modIndex) => {
                const Icon = mod.icon || Compass;
                return (
                  <motion.div
                    key={mod.route}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: modIndex * 0.03 }}
                  >
                    <Card
                      className="glass-intense border-white/10 hover:border-white/20 p-5 cursor-pointer transition-all group h-full"
                      onClick={() => router.push(mod.route)}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${group.gradient} flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors mb-1">
                            {mod.name}
                          </h3>
                          <p className="text-sm text-slate-400 leading-relaxed">
                            {mod.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-violet-400 group-hover:text-violet-300 transition-colors mt-auto">
                        <span>Open Module</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      <AdvancedFooter />
    </main>
  );
}
