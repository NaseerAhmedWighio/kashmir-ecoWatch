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
  Shield, Droplet, Mountain, Flower2, Search, Filter
} from 'lucide-react';
import { motion } from 'framer-motion';
import { biodiversityMetrics, mammalsData, birdsData, getBiodiversityData } from '@/data/biodiversity';
import { RED_DATA_METRICS, PRIORITY_KASHMIR_SPECIES } from '@/data/red-data-book-kashmir';
import { useRouter } from 'next/navigation';

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
  { id: 'habitat', label: 'By Habitat', icon: Leaf, href: '/biodiversity?filter=habitat' },
  { id: 'protected-area', label: 'By Protected Area', icon: Map, href: '/protected-areas' },
  { id: 'district', label: 'By District', icon: Map, href: '/districts' },
  { id: 'season', label: 'By Season', icon: TrendingUp, href: '/seasonal-ecology' },
  { id: 'conservation', label: 'By Conservation Status', icon: Shield, href: '/biodiversity/threatened-species' },
  { id: 'sightings', label: 'By Sightings', icon: Eye, href: '/trails-sightings/sightings' },
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
      <div className="relative pt-24 pb-16 overflow-hidden">
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

      {/* Explore by Intelligence Mode */}
      <div className="container mx-auto px-6 py-16 bg-slate-900/50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-glacier-500 rounded-full" />
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Alternative Exploration
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Explore by Intelligence Mode
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {exploreModes.map((mode, index) => (
            <motion.a
              key={mode.id}
              href={mode.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group p-6 rounded-xl glass-light border border-white/5 hover:border-forest-500/50 transition-all card-intelligence text-center"
            >
              <mode.icon className="w-8 h-8 text-slate-500 group-hover:text-forest-400 transition-colors mx-auto mb-3" />
              <div className="text-sm font-medium text-white group-hover:text-forest-300 transition-colors">
                {mode.label}
              </div>
            </motion.a>
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

      {/* Red Data Book - Threatened Species */}
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Conservation Priority
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Red Data Book Threatened Fauna
          </h2>
          <p className="text-slate-400 max-w-2xl">
            Species facing extinction threats in Kashmir. Source: Red Data Book on Jammu and Kashmir Fauna.
          </p>
        </motion.div>

        {/* Red Data Metrics */}
        <Card className="bg-gradient-to-r from-red-500/10 via-amber-500/10 to-orange-500/10 border border-red-500/30 p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{RED_DATA_METRICS.total}</div>
              <div className="text-xs text-slate-400 uppercase">Threatened Species</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{RED_DATA_METRICS.byTaxon.mammals}</div>
              <div className="text-xs text-slate-400 uppercase">Mammals</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{RED_DATA_METRICS.byTaxon.birds}</div>
              <div className="text-xs text-slate-400 uppercase">Birds</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{RED_DATA_METRICS.byIUCNStatus.endangered}</div>
              <div className="text-xs text-slate-400 uppercase">Endangered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{RED_DATA_METRICS.prioritySpecies}</div>
              <div className="text-xs text-slate-400 uppercase">Priority Species</div>
            </div>
          </div>
        </Card>

        {/* Priority Species Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRIORITY_KASHMIR_SPECIES.slice(0, 6).map((species, idx) => (
            <motion.div
              key={species.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="glass-intense border-emerald-500/30 p-6 bg-emerald-500/5 h-full">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="success" size="sm">
                    <Shield className="w-3 h-3 mr-1" />
                    Priority Kashmir Species
                  </Badge>
                  <Badge variant="danger" size="sm">{species.iucn1996Status}</Badge>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{species.commonName}</h3>
                <div className="text-sm text-slate-400 mb-4">{species.conservationTheme}</div>
                <div className="flex items-center gap-2 text-xs">
                  <Badge variant="outline" size="sm" className="border-white/20 text-white">
                    WLPA: {species.wildlifeProtectionAct1972Status}
                  </Badge>
                  <Badge variant="outline" size="sm" className="border-white/20 text-white capitalize">
                    {species.taxonGroup}
                  </Badge>
                </div>
                <Button
                  size="sm"
                  className="w-full mt-4 bg-gradient-to-r from-emerald-600 to-emerald-500"
                  icon={<ArrowRight className="w-4 h-4" />}
                  onClick={() => router.push(`/biodiversity/threatened-species`)}
                >
                  View Details
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button
            variant="outline"
            className="border-red-500/30 text-red-400 hover:bg-red-500/10"
            icon={<ArrowRight className="w-5 h-5" />}
            onClick={() => router.push('/biodiversity/threatened-species')}
          >
            Explore All Threatened Species
          </Button>
        </div>
      </div>

      {/* Related Intelligence */}
      <div className="container mx-auto px-6 py-16 bg-slate-900/50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full" />
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Cross-Module Integration
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Related Intelligence
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: 'Protected Areas', count: 47, href: '/protected-areas', description: 'National Parks, Sanctuaries, Reserves' },
            { title: 'Water Systems', count: 1253, href: '/water-systems', description: 'Lakes, Wetlands, Rivers, Springs' },
            { title: 'Sightings', count: 4521, href: '/trails-sightings/sightings', description: 'Wildlife observations & records' },
            { title: 'Research Library', count: 1893, href: '/research-library', description: 'Scientific reports & studies' },
          ].map((item, idx) => (
            <motion.a
              key={idx}
              href={item.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group p-6 rounded-xl glass-light border border-white/5 hover:border-forest-500/50 transition-all card-intelligence"
            >
              <div className="text-3xl font-bold text-white mb-2 group-hover:text-forest-300 transition-colors">
                {item.count.toLocaleString()}
              </div>
              <div className="text-lg font-semibold text-white mb-2">{item.title}</div>
              <div className="text-sm text-slate-400">{item.description}</div>
            </motion.a>
          ))}
        </div>
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
