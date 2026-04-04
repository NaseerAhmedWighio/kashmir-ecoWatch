'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import {
  Leaf, Map, Activity, Eye, TrendingUp, ArrowRight,
  Shield, Droplet, Mountain, Flower2, Search, Filter,
  Layers, Building2, Calendar, BookOpen, Bird, Fish,
  Sprout, AlertTriangle, BarChart3, Clock, MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { biodiversityMetrics } from '@/data/biodiversity';
import {
  getHabitatBiodiversity,
  getDistrictBiodiversity,
  biodiversityIntelligenceMetrics
} from '@/data/biodiversity-intelligence';
import {
  getMigrationWindows,
  getPollinatorWindows,
  getPhenologyRecords,
  getHabitatSignals,
  getSpeciesActivities
} from '@/data/seasonal-ecology';
import { getBiodiversityRiskDashboard } from '@/data/biodiversity-access';

// Sub-module link groups
const speciesGroup = [
  { id: 'directory', label: 'Species Directory', href: '/biodiversity', icon: Leaf, desc: 'Browse all species' },
  { id: 'mammals', label: 'Mammals', href: '/biodiversity/mammals', icon: Mountain, desc: `${biodiversityMetrics.mammals} species` },
  { id: 'birds', label: 'Birds', href: '/biodiversity/birds', icon: Bird, desc: `${biodiversityMetrics.birds} species` },
  { id: 'fish', label: 'Fish & Aquatic Life', href: '/biodiversity/fish', icon: Fish, desc: `${biodiversityMetrics.fish} species` },
  { id: 'plants', label: 'Plants & Flora', href: '/biodiversity/plants', icon: Sprout, desc: `${biodiversityMetrics.plants} species` },
  { id: 'medicinal', label: 'Medicinal Flora', href: '/biodiversity/medicinal-plants', icon: Flower2, desc: `${biodiversityMetrics.medicinalPlants} species` },
  { id: 'threatened', label: 'Priority & Threatened', href: '/biodiversity/threatened-species', icon: Shield, desc: `${biodiversityMetrics.threatened} species` },
];

const observationGroup = [
  { id: 'sightings', label: 'Wildlife Sightings', href: '/biodiversity/wildlife-sightings', icon: Eye, desc: 'Recent observations' },
  { id: 'hotspots', label: 'Birding & Observation Hotspots', href: '/biodiversity/birding-hotspots', icon: MapPin, desc: 'Prime observation areas' },
  { id: 'migration', label: 'Migration Windows', href: '/biodiversity/migration-windows', icon: Clock, desc: 'Active migration periods' },
  { id: 'pollinator', label: 'Pollinator Activity', href: '/biodiversity/pollinator-activity', icon: Activity, desc: 'Pollinator watch periods' },
  { id: 'phenology', label: 'Phenology & Flowering', href: '/biodiversity/phenology-flowering', icon: Flower2, desc: 'Flowering records' },
  { id: 'habitat', label: 'Habitat Signals', href: '/biodiversity/habitat-signals', icon: Layers, desc: 'Habitat stress patterns' },
  { id: 'seasonal', label: 'Seasonal Species Activity', href: '/biodiversity/seasonal-activity', icon: Calendar, desc: 'Breeding & activity windows' },
];

const intelligenceGroup = [
  { id: 'overview', label: 'Overview', href: '/biodiversity', icon: BarChart3, desc: 'Module command center' },
  { id: 'district', label: 'District Biodiversity Profiles', href: '/biodiversity/district-profiles', icon: Building2, desc: 'Regional intelligence' },
  { id: 'dashboards', label: 'Dashboards', href: '/biodiversity/dashboards', icon: BarChart3, desc: 'Analytics & trends' },
];

export default function BiodiversityOverviewPage() {
  const router = useRouter();
  
  // Pull seasonal ecology data for overview highlights
  const migrationWindows = getMigrationWindows();
  const pollinatorWindows = getPollinatorWindows();
  const phenologyRecords = getPhenologyRecords();
  const habitatSignals = getHabitatSignals();
  const speciesActivities = getSpeciesActivities();

  // Active migration periods
  const activeMigrations = migrationWindows.filter(m => {
    const currentMonth = new Date().getMonth() + 1;
    return m.peakPresenceMonths.includes(currentMonth);
  });

  // Recent phenology records
  const recentPhenology = phenologyRecords.slice(0, 4);

  return (
    <main className="min-h-screen bg-slate-950">{/* Hero */}
      <div className="relative md:pb-16 md:pb-20 overflow-hidden">
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
              Species, Habitat & Observation Intelligence
            </h1>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
              Kashmir's comprehensive biodiversity database — species records, habitat intelligence,
              wildlife sightings, migration timing, phenology, and conservation priority tracking.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-forest-600 to-forest-500"
                icon={<Leaf className="w-5 h-5" />}
                onClick={() => router.push('/biodiversity')}
              >
                Species Directory
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white"
                icon={<Eye className="w-5 h-5" />}
                onClick={() => router.push('/biodiversity/wildlife-sightings')}
              >
                Wildlife Sightings
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white"
                icon={<BarChart3 className="w-5 h-5" />}
                onClick={() => router.push('/biodiversity/dashboards')}
              >
                Dashboards
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Live Metrics Bar */}
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
                { label: 'Birds', value: biodiversityMetrics.birds, icon: Bird },
                { label: 'Mammals', value: biodiversityMetrics.mammals, icon: Mountain },
                { label: 'Fish & Aquatic', value: biodiversityMetrics.fish, icon: Fish },
                { label: 'Plants & Flora', value: biodiversityMetrics.plants, icon: Sprout },
                { label: 'Medicinal Flora', value: biodiversityMetrics.medicinalPlants, icon: Flower2 },
                { label: 'Threatened', value: biodiversityMetrics.threatened, icon: Shield },
                { label: 'Active Migrations', value: activeMigrations.length, icon: Clock },
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

      {/* Module Navigation - 3 Groups */}
      <div className="container mx-auto px-6 py-16">
        {/* Species Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Species
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Species Directory & Taxonomic Groups
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {speciesGroup.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => router.push(item.href)}
              className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-emerald-500/30 transition-all text-left group"
            >
              <item.icon className="w-6 h-6 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
              <div className="font-semibold text-white text-sm mb-1">{item.label}</div>
              <div className="text-xs text-slate-500">{item.desc}</div>
            </motion.button>
          ))}
        </div>

        {/* Observation & Ecology Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-sky-500 rounded-full" />
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Observation & Ecology
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Wildlife Sightings, Migration & Ecological Records
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {observationGroup.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => router.push(item.href)}
              className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-sky-500/30 transition-all text-left group"
            >
              <item.icon className="w-6 h-6 text-sky-400 mb-3 group-hover:scale-110 transition-transform" />
              <div className="font-semibold text-white text-sm mb-1">{item.label}</div>
              <div className="text-xs text-slate-500">{item.desc}</div>
            </motion.button>
          ))}
        </div>

        {/* Intelligence Group */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-violet-500 rounded-full" />
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Intelligence
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            District Profiles & Analytics Dashboards
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {intelligenceGroup.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => router.push(item.href)}
              className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 hover:border-violet-500/30 transition-all text-left group"
            >
              <item.icon className="w-6 h-6 text-violet-400 mb-3 group-hover:scale-110 transition-transform" />
              <div className="font-semibold text-white text-sm mb-1">{item.label}</div>
              <div className="text-xs text-slate-500">{item.desc}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Active Migration Periods */}
      <div className="container mx-auto px-6 py-16 bg-gradient-to-b from-slate-950 to-sky-950/20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Active Migration Periods</h2>
                <p className="text-slate-400">Current migratory bird activity across Kashmir wetlands</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5"
              onClick={() => router.push('/biodiversity/migration-windows')}
            >
              View Migration Calendar
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {migrationWindows.slice(0, 4).map((mw) => (
            <Card key={mw.id} className="border border-white/10 bg-slate-900/50" padding="md">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-white text-sm">{mw.name}</h3>
                  <div className="text-xs text-slate-500 capitalize">{mw.district}</div>
                </div>
                <Badge variant="default" className="text-xs bg-sky-500/20 text-sky-300">
                  {mw.migrationType}
                </Badge>
              </div>
              <div className="text-xs text-slate-400 mb-2">
                Peak: {mw.peakPresenceMonths.map(m => new Date(2026, m - 1).toLocaleString('default', { month: 'short' })).join(', ')}
              </div>
              <div className="text-xs text-slate-500">
                {mw.primarySpecies.slice(0, 3).join(', ')}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Phenology & Flowering */}
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
                <Flower2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Recent Phenology & Flowering Records</h2>
                <p className="text-slate-400">Latest flowering, breeding, and seasonal activity observations</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5"
              onClick={() => router.push('/biodiversity/phenology-flowering')}
            >
              All Phenology Records
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentPhenology.map((record) => (
            <Card key={record.id} className="border border-white/10 bg-slate-900/50" padding="md">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-sm mb-1">{record.title}</h3>
                  {record.speciesCommonName && (
                    <div className="text-xs text-slate-400">{record.speciesCommonName}</div>
                  )}
                </div>
                <Badge variant="default" className="text-xs bg-emerald-500/20 text-emerald-300 capitalize">
                  {record.recordType.replace('-', ' ')}
                </Badge>
              </div>
              <div className="text-xs text-slate-500">
                Districts: {record.districts.slice(0, 2).join(', ')}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Status: <span className="text-slate-300 capitalize">{record.verificationStatus.replace('-', ' ')}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Habitat Signals Alert Band */}
      <div className="container mx-auto px-6 py-16 bg-gradient-to-b from-slate-950 to-amber-950/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Habitat Signal Alerts</h2>
                <p className="text-slate-400">Seasonal habitat transitions and stress indicators</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5"
              onClick={() => router.push('/biodiversity/habitat-signals')}
            >
              All Habitat Signals
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {habitatSignals.slice(0, 3).map((signal) => (
            <Card key={signal.id} className="border border-white/10 bg-slate-900/50" padding="md">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-white text-sm">{signal.name}</h3>
                <Badge variant="default" className="text-xs bg-amber-500/20 text-amber-300 capitalize">
                  {signal.signalType.replace('-', ' ')}
                </Badge>
              </div>
              <p className="text-xs text-slate-400 mb-3 line-clamp-2">{signal.description}</p>
              <div className="text-xs text-slate-500">
                Districts: {signal.districts.slice(0, 3).join(', ')}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* District Biodiversity Leaders */}
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">District Biodiversity Leaders</h2>
                <p className="text-slate-400">Top districts by species richness and conservation significance</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5"
              onClick={() => router.push('/biodiversity/district-profiles')}
            >
              All District Profiles
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {getDistrictBiodiversity.all().slice(0, 8).map((district) => (
            <button
              key={district.district}
              onClick={() => router.push(`/biodiversity/district/${district.district.toLowerCase().replace(/\s+/g, '-')}`)}
              className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all text-left"
            >
              <div className="text-2xl font-bold text-white">{district.totalSpecies}</div>
              <div className="text-xs text-slate-400 truncate">{district.district}</div>
              <div className="text-xs text-slate-500 mt-1">
                {district.threatenedSpecies} threatened
              </div>
            </button>
          ))}
        </div>
      </div>

      <AdvancedFooter />
    </main>
  );
}
