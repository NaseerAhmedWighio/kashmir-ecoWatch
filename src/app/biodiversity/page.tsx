'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { EntityDrawer } from '@/components/common/EntityDrawer';
import { BiodiversityCard } from '@/components/common/BiodiversityCard';
import {
  Leaf, Map, Activity, Eye, TrendingUp, ArrowRight,
  Shield, Droplet, Mountain, Flower2, Search, Filter,
  Layers, Building2, Calendar, BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';
import { biodiversityMetrics, mammalsData, birdsData, getBiodiversityData } from '@/data/biodiversity';
import { RED_DATA_METRICS, PRIORITY_KASHMIR_SPECIES } from '@/data/red-data-book-kashmir';
import { useRouter } from 'next/navigation';

// New Components
import { HabitatIntelligenceCard } from '@/components/biodiversity/HabitatIntelligenceCard';
import { ConservationAnalyticsPanel } from '@/components/biodiversity/ConservationAnalyticsPanel';
import { EnhancedExploreModeCard } from '@/components/biodiversity/EnhancedExploreModeCard';
import { CrossModuleLinkStrip } from '@/components/sections/CrossModuleLinkStrip';

// New Data
import {
  getHabitatBiodiversity,
  getDistrictBiodiversity,
  getConservationAnalytics,
  biodiversityIntelligenceMetrics
} from '@/data/biodiversity-intelligence';

const categoryCards = [
  {
    id: 'mammals',
    title: 'Mammals',
    icon: Mountain,
    count: biodiversityMetrics.mammals,
    description: 'Terrestrial mammals including endangered ungulates, carnivores, and small mammals',
    color: 'from-emerald-500 to-teal-600',
    href: '/biodiversity/mammals',
    habitats: ['Forests', 'Alpine', 'Mountain'],
  },
  {
    id: 'birds',
    title: 'Birds',
    icon: Activity,
    count: biodiversityMetrics.birds,
    description: 'Resident and migratory birds across wetlands, forests, and alpine zones',
    color: 'from-sky-500 to-blue-600',
    href: '/biodiversity/birds',
    habitats: ['Wetlands', 'Forests', 'Alpine'],
  },
  {
    id: 'fish',
    title: 'Fish',
    icon: Droplet,
    count: biodiversityMetrics.fish,
    description: 'Freshwater fish and aquatic biodiversity in rivers, lakes, and streams',
    color: 'from-cyan-500 to-blue-600',
    href: '/biodiversity/fish',
    habitats: ['Rivers', 'Lakes', 'Streams'],
  },
  {
    id: 'plants',
    title: 'Plants',
    icon: Flower2,
    count: biodiversityMetrics.plants,
    description: 'Vascular plants, flora across forest, alpine, and wetland ecosystems',
    color: 'from-green-500 to-emerald-600',
    href: '/biodiversity/plants',
    habitats: ['Forests', 'Alpine', 'Wetlands'],
  },
  {
    id: 'medicinal',
    title: 'Medicinal Plants',
    icon: Leaf,
    count: biodiversityMetrics.medicinalPlants,
    description: 'Traditional medicinal flora with conservation-sensitive harvesting',
    color: 'from-amber-500 to-orange-600',
    href: '/biodiversity/medicinal-plants',
    habitats: ['Alpine', 'Forests'],
  },
  {
    id: 'threatened',
    title: 'Threatened Species',
    icon: Shield,
    count: biodiversityMetrics.threatened,
    description: 'Priority conservation species: Critically Endangered, Endangered, Vulnerable',
    color: 'from-red-500 to-rose-600',
    href: '/biodiversity/threatened-species',
    habitats: ['All'],
  },
];

const exploreModes = [
  { 
    id: 'habitat', 
    label: 'By Habitat', 
    icon: Leaf, 
    href: '/biodiversity?filter=habitat',
    description: 'Explore species by ecosystem type',
    count: 5,
    countLabel: 'habitats',
    color: 'from-emerald-500 to-teal-600'
  },
  { 
    id: 'protected-area', 
    label: 'By Protected Area', 
    icon: Map, 
    href: '/protected-areas',
    description: 'Biodiversity within PAs',
    count: 47,
    countLabel: 'areas',
    color: 'from-amber-500 to-orange-600'
  },
  { 
    id: 'district', 
    label: 'By District', 
    icon: Building2, 
    href: '/districts',
    description: 'District-level biodiversity',
    count: 16,
    countLabel: 'districts',
    color: 'from-violet-500 to-purple-600'
  },
  { 
    id: 'season', 
    label: 'By Season', 
    icon: Calendar, 
    href: '/seasonal-ecology',
    description: 'Seasonal occurrence patterns',
    count: 4,
    countLabel: 'seasons',
    color: 'from-pink-500 to-rose-600'
  },
  { 
    id: 'conservation', 
    label: 'By Conservation Status', 
    icon: Shield, 
    href: '/biodiversity/threatened-species',
    description: 'IUCN & WLPA filtering',
    count: 89,
    countLabel: 'threatened',
    color: 'from-red-500 to-rose-600'
  },
  { 
    id: 'sightings', 
    label: 'By Sightings', 
    icon: Eye, 
    href: '/trails-sightings',
    description: 'Field observations',
    count: 4521,
    countLabel: 'records',
    color: 'from-sky-500 to-blue-600'
  },
];

export default function BiodiversityPage() {
  const router = useRouter();
  const [selectedEntity, setSelectedEntity] = useState<any>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const featuredSpecies = [
    getBiodiversityData.mammals.bySlug('hangul'),
    getBiodiversityData.mammals.bySlug('markhor'),
    getBiodiversityData.birds.bySlug('kashmir-flycatcher'),
    getBiodiversityData.birds.bySlug('himalayan-monals'),
    getBiodiversityData.fish.bySlug('snow-trout-group'),
    getBiodiversityData.medicinalPlants.bySlug('aconitum-heterophyllum'),
  ].filter(Boolean);

  const handleQuickView = (species: any) => {
    setSelectedEntity({
      type: 'species',
      name: species.commonName,
      description: species.description,
      slug: species.slug,
      status: species.conservationStatus,
      district: species.districts.join(', '),
      metrics: [
        { label: 'Elevation', value: `${species.elevationRange.min}-${species.elevationRange.max}m` },
        { label: 'Habitats', value: species.habitats.length },
      ],
    });
    setDrawerOpen(true);
  };

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative pt-20 md:pt-48 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-900/20 via-purple-900/10 to-slate-950" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-6 h-6 text-forest-400" />
              <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                Biodiversity Intelligence
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Species, Habitats & Ecological Intelligence
            </h1>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
              Comprehensive species database with distribution, habitat associations, 
              seasonal patterns, conservation status, and ecological relevance across Kashmir
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-forest-600 to-forest-500"
                icon={<Leaf className="w-5 h-5" />}
              >
                Browse All Species
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 text-white"
                icon={<Map className="w-5 h-5" />}
              >
                Biodiversity Atlas
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 text-white"
                icon={<Eye className="w-5 h-5" />}
              >
                View Sightings
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Live Metrics */}
      <div className="container mx-auto px-6 -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-intense border-white/10 p-6" padding="none">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
              {[
                { label: 'Species Indexed', value: biodiversityMetrics.totalSpecies, icon: Activity },
                { label: 'Protected Areas', value: biodiversityMetrics.protectedAreaOverlap, icon: Map },
                { label: 'Active Sightings', value: biodiversityMetrics.activeSightings, icon: Eye },
                { label: 'Threatened Taxa', value: biodiversityMetrics.threatened, icon: Shield },
                { label: 'Medicinal Plants', value: biodiversityMetrics.medicinalPlants, icon: Leaf },
                { label: 'Bird Records', value: biodiversityMetrics.birds, icon: Activity },
                { label: 'Mammals', value: biodiversityMetrics.mammals, icon: Mountain },
                { label: 'Fish Species', value: biodiversityMetrics.fish, icon: Droplet },
              ].map((metric, idx) => (
                <div key={idx} className="text-center p-4 border-r border-white/5 last:border-r-0">
                  <metric.icon className="w-5 h-5 text-slate-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white tabular-nums">
                    {metric.value.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Category Modules */}
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-forest-500 rounded-full" />
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Explore by Taxonomic Group
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Biodiversity Categories
          </h2>
          <p className="text-slate-400 max-w-2xl">
            Access specialized intelligence for each taxonomic group with habitat associations, 
            conservation status, and distribution data
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryCards.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <a href={category.href} className="block group h-full">
                <Card
                  className="group h-full card-intelligence cursor-pointer border border-white/5 bg-slate-900/50"
                  padding="lg"
                >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} text-white flex items-center justify-center shadow-lg`}>
                    <category.icon className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-forest-300 transition-colors">
                      {category.title}
                    </h3>
                    <div className="text-3xl font-bold text-white">
                      {category.count.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-500 uppercase">species</div>
                  </div>
                </div>
                <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                  {category.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {category.habitats.map((habitat, idx) => (
                    <Badge key={idx} variant="default" size="sm">
                      {habitat}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm font-medium text-forest-400 group-hover:text-forest-300 transition-colors">
                  <span>Explore {category.title}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      {/* =========================================================
          HABITAT INTELLIGENCE BAND
          ========================================================= */}
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Habitat Intelligence</h2>
                <p className="text-slate-400">Ecosystem-level biodiversity patterns</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5"
              onClick={() => router.push('/biodiversity?filter=habitat')}
            >
              View All Habitats
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {getHabitatBiodiversity.all().map((habitat, index) => (
            <HabitatIntelligenceCard 
              key={habitat.id} 
              habitat={habitat}
              onClick={(h) => router.push(`/biodiversity/habitats/${h.slug}`)}
            />
          ))}
        </div>
      </div>

      {/* =========================================================
          EXPLORE BY INTELLIGENCE MODE (ENHANCED)
          ========================================================= */}
      <div className="container mx-auto px-6 py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Distribution Intelligence</h2>
              <p className="text-slate-400">Multiple pathways to explore biodiversity</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exploreModes.map((mode, index) => (
            <EnhancedExploreModeCard
              key={mode.id}
              {...mode}
              delay={index * 0.05}
            />
          ))}
        </div>
      </div>

      {/* Featured Species Strip */}
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full" />
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Featured Intelligence
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured Species
            </h2>
            <p className="text-slate-400 max-w-2xl">
              Iconic and conservation-significant species representing Kashmir's biodiversity heritage
            </p>
          </div>
          <Button 
            variant="outline" 
            className="border-white/20 text-white"
            icon={<ArrowRight className="w-5 h-5" />}
          >
            View All Species
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredSpecies.map((species, index) => (
            species && (
              <BiodiversityCard
                key={species.id}
                species={species}
                onQuickView={handleQuickView}
              />
            )
          ))}
        </div>
      </div>

      {/* =========================================================
          CONSERVATION INTELLIGENCE (RED DATA BOOK UPGRADE)
          ========================================================= */}
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-white">Conservation Intelligence</h2>
              <p className="text-slate-400">Threatened species, legal protection, and vulnerability patterns</p>
            </div>
          </div>
        </motion.div>

        <ConservationAnalyticsPanel 
          analytics={getConservationAnalytics()}
          onViewAll={() => router.push('/biodiversity/threatened-species')}
        />
      </div>

      {/* =========================================================
          CROSS-MODULE INTELLIGENCE (EXPANDED)
          ========================================================= */}
      <div className="container mx-auto px-6 py-16 bg-slate-900/50">
        <CrossModuleLinkStrip 
          context={{
            habitat: 'temperate-forest',
          }}
        />
      </div>

      {/* Entity Drawer */}
      {selectedEntity && (
        <EntityDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          entity={selectedEntity}
        />
      )}

      <AdvancedFooter />
    </main>
  );
}
