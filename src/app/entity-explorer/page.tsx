'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Search, Shield, Droplet, Leaf, MapPin, AlertTriangle,
  ChevronRight, Layers
} from 'lucide-react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Shield,
  Droplet,
  Leaf,
  MapPin,
  AlertTriangle,
};

interface Entity {
  name: string;
  category: string;
  type: string;
  district: string;
  description: string;
  route: string;
  icon: string;
}

const entities: Entity[] = [
  // Protected Areas
  { name: 'Dachigam National Park', category: 'Protected Areas', type: 'National Park', district: 'Srinagar', description: 'Home to the Hangul (Kashmir Stag) and critical Himalayan biodiversity.', route: '/protected-network/national-parks#dachigam', icon: 'Shield' },
  { name: 'Hemis National Park', category: 'Protected Areas', type: 'National Park', district: 'Ladakh', description: 'High-altitude park known for snow leopard population.', route: '/protected-network/national-parks#hemis', icon: 'Shield' },
  { name: 'Kishtwar National Park', category: 'Protected Areas', type: 'National Park', district: 'Kishtwar', description: 'Alpine ecosystems and brown bear habitat.', route: '/protected-network/national-parks#kishtwar', icon: 'Shield' },
  { name: 'Gulmarg Wildlife Sanctuary', category: 'Protected Areas', type: 'Wildlife Sanctuary', district: 'Baramulla', description: 'Musk deer, brown bear, and alpine meadow ecosystems.', route: '/protected-network/wildlife-sanctuaries#gulmarg', icon: 'Shield' },
  { name: 'Overa-Aru Wildlife Sanctuary', category: 'Protected Areas', type: 'Wildlife Sanctuary', district: 'Anantnag', description: 'Hangul, musk deer, and high-altitude biodiversity.', route: '/protected-network/wildlife-sanctuaries#overa-aru', icon: 'Shield' },
  { name: 'Hokersar Wetland', category: 'Protected Areas', type: 'Wetland Reserve', district: 'Srinagar', description: 'Critical migratory bird wetland on the Central Asian Flyway.', route: '/protected-network/wetland-reserves#hokersar', icon: 'Shield' },
  { name: 'Hygam Wetland', category: 'Protected Areas', type: 'Wetland Reserve', district: 'Baramulla', description: 'Important bird habitat and aquatic ecosystem.', route: '/protected-network/wetland-reserves#hygam', icon: 'Shield' },
  { name: 'Mirgund Wildlife Reserve', category: 'Protected Areas', type: 'Conservation Reserve', district: 'Budgam', description: 'Community-linked conservation landscape.', route: '/protected-network/conservation-reserves#mirgund', icon: 'Shield' },

  // Water Bodies
  { name: 'Dal Lake', category: 'Water Bodies', type: 'Lake', district: 'Srinagar', description: 'Iconic urban lake with houseboat culture and aquatic biodiversity.', route: '/water-systems/lakes#dal', icon: 'Droplet' },
  { name: 'Wular Lake', category: 'Water Bodies', type: 'Lake', district: 'Bandipora', description: 'Largest freshwater lake in India and critical flood buffer.', route: '/water-systems/lakes#wular', icon: 'Droplet' },
  { name: 'Manasbal Lake', category: 'Water Bodies', type: 'Lake', district: 'Ganderbal', description: 'Deep water lake known for aquatic vegetation and bird life.', route: '/water-systems/lakes#manasbal', icon: 'Droplet' },
  { name: 'Gangabal Lake', category: 'Water Bodies', type: 'High-Altitude Lake', district: 'Ganderbal', description: 'Glacial lake at the base of Mount Haramukh.', route: '/water-systems/lakes#gangabal', icon: 'Droplet' },
  { name: 'Tso Moriri', category: 'Water Bodies', type: 'High-Altitude Lake', district: 'Ladakh', description: 'Endorheic high-altitude lake and Ramsar site.', route: '/water-systems/lakes#tso-moriri', icon: 'Droplet' },
  { name: 'Jhelum River', category: 'Water Bodies', type: 'River', district: 'Valley-wide', description: 'Primary river of the Kashmir Valley and flood corridor.', route: '/water-systems/rivers#jhelum', icon: 'Droplet' },
  { name: 'Lidder River', category: 'Water Bodies', type: 'River', district: 'Anantnag', description: 'Major tributary flowing through Pahalgam.', route: '/water-systems/rivers#lidder', icon: 'Droplet' },
  { name: 'Sind River', category: 'Water Bodies', type: 'River', district: 'Ganderbal', description: 'Major tributary from the north, critical for irrigation.', route: '/water-systems/rivers#sind', icon: 'Droplet' },
  { name: 'Kishanganga River', category: 'Water Bodies', type: 'River', district: 'Kupwara', description: 'Transboundary river with hydroelectric significance.', route: '/water-systems/rivers#kishanganga', icon: 'Droplet' },

  // Species
  { name: 'Hangul (Kashmir Stag)', category: 'Species', type: 'Mammal - CR', district: 'Srinagar, Anantnag', description: 'Critically endangered subspecies of Central Asian red deer.', route: '/biodiversity/threatened-species#hangul', icon: 'Leaf' },
  { name: 'Snow Leopard', category: 'Species', type: 'Mammal - VU', district: 'High-altitude zones', description: 'Elusive high-altitude predator and flagship species.', route: '/biodiversity/threatened-species#snow-leopard', icon: 'Leaf' },
  { name: 'Musk Deer', category: 'Species', type: 'Mammal - EN', district: 'Gulmarg, Overa-Aru', description: 'Endangered species threatened by poaching.', route: '/biodiversity/threatened-species#musk-deer', icon: 'Leaf' },
  { name: 'Himalayan Brown Bear', category: 'Species', type: 'Mammal - VU', district: 'High-altitude zones', description: 'Vulnerable bear species in alpine and subalpine zones.', route: '/biodiversity/mammals#brown-bear', icon: 'Leaf' },
  { name: 'Black-Necked Crane', category: 'Species', type: 'Bird - VU', district: 'Ladakh', description: 'Sacred high-altitude crane and cultural symbol.', route: '/biodiversity/birds#black-necked-crane', icon: 'Leaf' },
  { name: 'Western Tragopan', category: 'Species', type: 'Bird - VU', district: 'Forest zones', description: 'Vulnerable pheasant and state bird of Himachal.', route: '/biodiversity/birds#western-tragopan', icon: 'Leaf' },
  { name: 'Schaube Goosander', category: 'Species', type: 'Bird - Migratory', district: 'Wetlands', description: 'Migratory waterfowl using Kashmir wetland systems.', route: '/biodiversity/birds#schaube-goosander', icon: 'Leaf' },
  { name: 'Snow Trout (Schizothorax)', category: 'Species', type: 'Fish - Endemic', district: 'Rivers and lakes', description: 'Endemic cold-water fish of Himalayan rivers.', route: '/biodiversity/fish#snow-trout', icon: 'Leaf' },
  { name: 'Himalayan Yew (Taxus wallichiana)', category: 'Species', type: 'Plant - EN', district: 'Forest zones', description: 'Endangered medicinal tree threatened by overharvesting.', route: '/biodiversity/medicinal-plants#himalayan-yew', icon: 'Leaf' },
  { name: 'Saffron Crocus (Crocus sativus)', category: 'Species', type: 'Plant - Cultivated', district: 'Pulwama, Budgam', description: 'Cultivated spice crop of economic and cultural significance.', route: '/biodiversity/plants#saffron', icon: 'Leaf' },

  // Districts
  { name: 'Srinagar', category: 'Districts', type: 'District', district: 'Srinagar', description: 'Summer capital and most populous district, urban environmental stress.', route: '/districts#srinagar', icon: 'MapPin' },
  { name: 'Anantnag', category: 'Districts', type: 'District', district: 'Anantnag', description: 'Southern gateway with Lidder valley and forest ecosystems.', route: '/districts#anantnag', icon: 'MapPin' },
  { name: 'Baramulla', category: 'Districts', type: 'District', district: 'Baramulla', description: 'Northern district with Wular Lake and flood corridor.', route: '/districts#baramulla', icon: 'MapPin' },
  { name: 'Gulmarg', category: 'Districts', type: 'Tourism Zone', district: 'Baramulla', description: 'High-altitude tourism and winter sports destination.', route: '/districts#gulmarg', icon: 'MapPin' },
  { name: 'Kupwara', category: 'Districts', type: 'District', district: 'Kupwara', description: 'Border district with Line of Control and forest coverage.', route: '/districts#kupwara', icon: 'MapPin' },
  { name: 'Ganderbal', category: 'Districts', type: 'District', district: 'Ganderbal', description: 'Glacial headwaters and high-altitude biodiversity.', route: '/districts#ganderbal', icon: 'MapPin' },
  { name: 'Pulwama', category: 'Districts', type: 'District', district: 'Pulwama', description: 'Agricultural heartland and saffron cultivation zone.', route: '/districts#pulwama', icon: 'MapPin' },
  { name: 'Bandipora', category: 'Districts', type: 'District', district: 'Bandipora', description: 'Wular Lake district and riverine ecosystems.', route: '/districts#bandipora', icon: 'MapPin' },
  { name: 'Shopian', category: 'Districts', type: 'District', district: 'Shopian', description: 'Apple-growing region with slope stability concerns.', route: '/districts#shopian', icon: 'MapPin' },
  { name: 'Budgam', category: 'Districts', type: 'District', district: 'Budgam', description: 'Central valley district with seismic exposure.', route: '/districts#budgam', icon: 'MapPin' },

  // Monitoring Zones
  { name: 'Jhelum Basin Flood Zone', category: 'Monitoring Zones', type: 'Hydrological Zone', district: 'Valley-wide', description: 'Primary flood risk corridor for the Kashmir Valley.', route: '/risk-monitoring/flood-flash-flood', icon: 'AlertTriangle' },
  { name: 'Z-Morh Landslide Corridor', category: 'Monitoring Zones', type: 'Slope Risk Zone', district: 'Anantnag, Ganderbal', description: 'Critical highway corridor with recurring landslide activity.', route: '/risk-monitoring/landslide-slope', icon: 'AlertTriangle' },
  { name: 'Pir Panjal Avalanche Zone', category: 'Monitoring Zones', type: 'Winter Risk Zone', district: 'Gulmarg, Kupwara', description: 'High avalanche danger areas during winter season.', route: '/risk-monitoring/avalanche-winter', icon: 'AlertTriangle' },
  { name: 'Urban Air Quality Zone - Srinagar', category: 'Monitoring Zones', type: 'Air Monitoring Zone', district: 'Srinagar', description: 'Urban AQI monitoring for particulate and combustion signals.', route: '/risk-monitoring/air-pollution', icon: 'AlertTriangle' },
  { name: 'Dal Lake Water Quality Zone', category: 'Monitoring Zones', type: 'Water Quality Zone', district: 'Srinagar', description: 'Lake water quality, eutrophication, and sewage impact monitoring.', route: '/risk-monitoring/water-pollution', icon: 'AlertTriangle' },
  { name: 'Forest Fire Corridor', category: 'Monitoring Zones', type: 'Fire Risk Zone', district: 'Baramulla, Anantnag', description: 'Forest fire danger zones during dry season.', route: '/risk-monitoring/forest-fire', icon: 'AlertTriangle' },
];

const tabs = [
  'All Entities',
  'Protected Areas',
  'Water Bodies',
  'Species',
  'Districts',
  'Monitoring Zones',
];

type BadgeVariant = 'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'outline' | 'stable' | 'monitoring' | 'critical';

function getCategoryBadgeVariant(category: string): BadgeVariant {
  switch (category) {
    case 'Protected Areas': return 'info';
    case 'Water Bodies': return 'success';
    case 'Species': return 'warning';
    case 'Districts': return 'secondary';
    case 'Monitoring Zones': return 'danger';
    default: return 'default';
  }
}

function getTypeBadgeVariant(type: string): BadgeVariant {
  if (type.includes('CR') || type.includes('EN')) return 'critical';
  if (type.includes('VU')) return 'warning';
  if (type.includes('Lake') || type.includes('River')) return 'info';
  if (type.includes('Risk') || type.includes('Fire') || type.includes('Flood')) return 'danger';
  return 'secondary';
}

export default function EntityExplorerPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('All Entities');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEntities = entities.filter((entity) => {
    const matchesTab = activeTab === 'All Entities' || entity.category === activeTab;
    const matchesSearch =
      searchQuery === '' ||
      entity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entity.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entity.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entity.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const IconComponent = (iconName: string) => {
    const Icon = iconMap[iconName] || Layers;
    return <Icon className="w-5 h-5" />;
  };

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero Section */}
      <section className="pt-20 md:pt-48 pb-16 md:pb-24 bg-gradient-to-br from-blue-950/50 via-sky-950/30 to-slate-950 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/30 mb-6">
              <Search className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">Browse & Filter</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Entity Explorer
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Browse and filter all ecological entities across Kashmir EcoWatch — protected areas, water bodies, species, districts, trails, and monitoring zones.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs & Search */}
      <section className="py-8 bg-slate-900/50 border-y border-white/5 sticky top-0 z-40 backdrop-blur-md">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 md:items-center md:justify-between">
            {/* Tabs */}
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab
                      ? 'bg-blue-500/20 text-blue-400 border-b-2 border-blue-400'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search entities..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-white/10 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Entity Count */}
      <section className="py-6 bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-slate-400">
            Showing <span className="text-white font-medium">{filteredEntities.length}</span> of{' '}
            <span className="text-white font-medium">{entities.length}</span> entities
          </p>
        </div>
      </section>

      {/* Entity Grid */}
      <section className="py-12 md:py-16 bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {filteredEntities.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <Layers className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-300 mb-2">No entities found</h3>
              <p className="text-slate-500">Try adjusting your filters or search terms.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredEntities.map((entity, index) => {
                const Icon = iconMap[entity.icon] || Layers;
                return (
                  <motion.div
                    key={entity.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Card
                      className="glass-intense border-white/10 h-full flex flex-col"
                      onClick={() => router.push(entity.route)}
                    >
                      {/* Card Header */}
                      <div className="flex items-start gap-3 mb-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-400/20 flex items-center justify-center text-blue-400">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-white truncate">
                            {entity.name}
                          </h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant={getCategoryBadgeVariant(entity.category)} size="sm">
                              {entity.category}
                            </Badge>
                            <Badge variant={getTypeBadgeVariant(entity.type)} size="sm">
                              {entity.type}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* District */}
                      <div className="flex items-center gap-2 mb-3 text-sm text-slate-400">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{entity.district}</span>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-slate-300 leading-relaxed mb-4 flex-1">
                        {entity.description}
                      </p>

                      {/* Action */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/5">
                        <span className="text-xs text-slate-500">Entity</span>
                        <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300">
                          View Entity
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
