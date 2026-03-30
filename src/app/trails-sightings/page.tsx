'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Footprints, MapPin, TrendingUp, ArrowRight, Plus, Eye, Camera,
  Mountain, Droplets, Flower2, Bird, Trees, Snowflake, Shield
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const trailCategories = [
  {
    id: 'hiking-trails',
    title: 'Hiking Trails',
    description: 'Multi-day treks and day hikes across Kashmir\'s mountains, valleys, and alpine meadows',
    icon: Mountain,
    color: 'from-emerald-500 to-teal-600',
    count: 47,
    route: '/trails-sightings/hiking-trails',
    features: ['Multi-day Treks', 'Day Hikes', 'Alpine Routes', 'Valley Trails']
  },
  {
    id: 'eco-trails',
    title: 'Eco Trails',
    description: 'Nature-focused trails highlighting ecological diversity and conservation areas',
    icon: Trees,
    color: 'from-green-500 to-emerald-600',
    count: 23,
    route: '/trails-sightings/eco-trails',
    features: ['Forest Walks', 'Interpretive Trails', 'Conservation Zones', 'Educational Routes']
  },
  {
    id: 'birding-trails',
    title: 'Birding Trails',
    description: 'Prime birdwatching routes through wetlands, forests, and migratory corridors',
    icon: Bird,
    color: 'from-sky-500 to-blue-600',
    count: 18,
    route: '/trails-sightings/birding-trails',
    features: ['Wetland Birding', 'Forest Birds', 'Migration Routes', 'Rare Species']
  },
  {
    id: 'wetland-trails',
    title: 'Wetland Trails',
    description: 'Trails around Kashmir\'s marshes, lakes, and wetland ecosystems',
    icon: Droplets,
    color: 'from-cyan-500 to-blue-600',
    count: 15,
    route: '/trails-sightings/wetland-trails',
    features: ['Lake Circuits', 'Marsh Walks', 'Bird Sanctuaries', 'Aquatic Ecology']
  },
  {
    id: 'bloom-trails',
    title: 'Bloom Trails',
    description: 'Seasonal flower trails showcasing Kashmir\'s wildflower diversity and bloom calendars',
    icon: Flower2,
    color: 'from-pink-500 to-rose-600',
    count: 12,
    route: '/trails-sightings/bloom-trails',
    features: ['Spring Blooms', 'Alpine Flowers', 'Meadow Walks', 'Phenology Routes']
  },
  {
    id: 'forest-meadow-trails',
    title: 'Forest & Meadow Trails',
    description: 'Trails through dense forests and expansive alpine meadows (margs)',
    icon: Trees,
    color: 'from-lime-500 to-green-600',
    count: 31,
    route: '/trails-sightings/forest-meadow-trails',
    features: ['Coniferous Forests', 'Alpine Margs', 'Wildlife Corridors', 'Pasture Lands']
  },
  {
    id: 'glacier-high-altitude-trails',
    title: 'Glacier & High Altitude Trails',
    description: 'High-elevation routes to glaciers, snowfields, and trans-Himalayan landscapes',
    icon: Snowflake,
    color: 'from-slate-400 to-slate-600',
    count: 8,
    route: '/trails-sightings/glacier-high-altitude-trails',
    features: ['Glacier Treks', 'High Passes', 'Snow Routes', 'Cryosphere Access']
  },
  {
    id: 'protected-area-trails',
    title: 'Protected Area Trails',
    description: 'Trails within national parks, wildlife sanctuaries, and conservation reserves',
    icon: Shield,
    color: 'from-amber-500 to-orange-600',
    count: 34,
    route: '/trails-sightings/protected-area-trails',
    features: ['National Parks', 'Wildlife Sanctuaries', 'Conservation Reserves', 'Buffer Zones']
  },
];

const sightingCategories = [
  {
    id: 'wildlife-sightings',
    title: 'Wildlife Sightings',
    description: 'Mammal observations including Hangul, Snow Leopard, Markhor, and other iconic species',
    icon: Eye,
    color: 'from-amber-500 to-orange-600',
    count: 1247,
    route: '/trails-sightings/wildlife-sightings',
    features: ['Ungulates', 'Carnivores', 'Small Mammals', 'Rare Sightings']
  },
  {
    id: 'bird-sightings',
    title: 'Bird Sightings',
    description: 'Resident and migratory bird observations from across Kashmir\'s diverse avian habitats',
    icon: Bird,
    color: 'from-sky-500 to-blue-600',
    count: 3542,
    route: '/trails-sightings/bird-sightings',
    features: ['Resident Birds', 'Migratory Species', 'Raptors', 'Wetland Birds']
  },
  {
    id: 'plant-phenology-sightings',
    title: 'Plant & Phenology Sightings',
    description: 'Flowering records, leaf-out observations, and seasonal plant lifecycle documentation',
    icon: Flower2,
    color: 'from-pink-500 to-rose-600',
    count: 892,
    route: '/trails-sightings/plant-phenology-sightings',
    features: ['Bloom Records', 'Leaf-out', 'Fruiting Times', 'Seasonal Markers']
  },
  {
    id: 'aquatic-wetland-sightings',
    title: 'Aquatic & Wetland Sightings',
    description: 'Fish, amphibians, aquatic plants, and wetland-dependent species observations',
    icon: Droplets,
    color: 'from-cyan-500 to-blue-600',
    count: 456,
    route: '/trails-sightings/aquatic-wetland-sightings',
    features: ['Fish Species', 'Amphibians', 'Aquatic Plants', 'Wetland Ecology']
  },
  {
    id: 'trail-field-records',
    title: 'Trail Field Records',
    description: 'General field observations, trail conditions, and ecological notes from the field',
    icon: MapPin,
    color: 'from-emerald-500 to-teal-600',
    count: 2183,
    route: '/trails-sightings/trail-field-records',
    features: ['Trail Conditions', 'Habitat Notes', 'Weather Observations', 'General Records']
  },
];

const stats = [
  { label: 'Total Trails', value: '156', trend: 'up', trendValue: 12 },
  { label: 'Wildlife Sightings', value: '2,847', trend: 'up', trendValue: 24 },
  { label: 'Active Observers', value: '423', trend: 'up', trendValue: 8 },
  { label: 'This Month', value: '189', trend: 'down', trendValue: 3 },
];

const recentSightings = [
  {
    id: 'sighting-1',
    species: 'Hangul (Kashmir Stag)',
    location: 'Dachigam National Park',
    district: 'Srinagar',
    date: '2024-03-26',
    observer: 'Dr. A. Rashid',
    verificationStatus: 'verified' as const,
  },
  {
    id: 'sighting-2',
    species: 'Snow Leopard',
    location: 'Hemis National Park',
    district: 'Leh',
    date: '2024-03-25',
    observer: 'Field Team Alpha',
    verificationStatus: 'reviewed' as const,
  },
  {
    id: 'sighting-3',
    species: 'Himalayan Monal',
    location: 'Overa-Aru Wildlife Sanctuary',
    district: 'Anantnag',
    date: '2024-03-24',
    observer: 'Citizen Scientist',
    verificationStatus: 'community' as const,
  },
];

export default function TrailsAndSightingsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-teal-950/30 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl">
                <Footprints className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Citizen Science & Field Observations</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Trails & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Sightings</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Explore Kashmir's ecological trails and contribute wildlife observations
              to build a comprehensive citizen science database for conservation and research
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-xl"
                onClick={() => router.push('/submit-sighting')}
              >
                <Plus className="w-5 h-5 mr-2" />
                Submit Sighting
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                onClick={() => router.push('/trails-sightings/hiking-trails')}
              >
                <Mountain className="w-5 h-5 mr-2" />
                Explore Trails
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Ribbon */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-slate-400 mb-1">{stat.label}</div>
                <div className={`text-xs flex items-center justify-center gap-1 ${
                  stat.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  <TrendingUp className="w-3 h-3" />
                  {stat.trendValue}% this month
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trail Categories */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-3">Explore by Trail Type</h2>
            <p className="text-slate-400">Discover trails matched to your interests and experience level</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trailCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card
                  className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 h-full cursor-pointer group"
                  onClick={() => router.push(category.route)}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <category.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                        {category.title}
                      </h3>
                      <div className="text-xs text-slate-500">{category.count} trails</div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-400 mb-3 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {category.features.slice(0, 3).map((feature, fIdx) => (
                      <Badge key={fIdx} variant="outline" size="sm" className="text-xs border-white/10">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center text-xs font-medium text-emerald-400 group-hover:text-emerald-300 transition-colors">
                    <span>Explore Trails</span>
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sightings Categories */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-3">Browse Sightings by Category</h2>
            <p className="text-slate-400">Field observations from Kashmir's diverse ecosystems</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {sightingCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card
                  className="glass-light border-white/10 hover:border-emerald-500/30 transition-all p-5 text-center cursor-pointer group"
                  onClick={() => router.push(category.route)}
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg mx-auto mb-3`}>
                    <category.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                    {category.title}
                  </h3>
                  <div className="text-2xl font-bold text-emerald-400 mb-2">{category.count.toLocaleString()}</div>
                  <div className="text-xs text-slate-500 mb-3">observations</div>
                  <div className="flex items-center justify-center text-xs font-medium text-emerald-400 group-hover:text-emerald-300 transition-colors">
                    <span>View Sightings</span>
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Sightings */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Recent Wildlife Sightings</h2>
              <p className="text-slate-400">Latest field observations from across Kashmir</p>
            </div>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5"
              onClick={() => router.push('/trails-sightings/wildlife-sightings')}
            >
              View All Sightings
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentSightings.map((sighting, index) => (
              <motion.div
                key={sighting.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="glass-light border-white/10 hover:border-emerald-500/30 transition-all overflow-hidden group">
                  <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Camera className="w-12 h-12 text-slate-600" />
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge
                        variant={
                          sighting.verificationStatus === 'verified'
                            ? 'success'
                            : sighting.verificationStatus === 'reviewed'
                            ? 'warning'
                            : 'info'
                        }
                        size="sm"
                      >
                        {sighting.verificationStatus}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {sighting.species}
                    </h3>
                    <div className="space-y-2 text-sm text-slate-400">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-400" />
                        {sighting.location}, {sighting.district}
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-emerald-400" />
                        {sighting.observer}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <Card className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border-white/10 overflow-hidden">
            <div className="relative p-12 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-teal-600/20" />
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Contribute Your Observations
                </h2>
                <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
                  Help build Kashmir's most comprehensive wildlife and trail database by submitting
                  your field observations, photos, and ecological notes
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-xl"
                    onClick={() => router.push('/submit-sighting')}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Submit a Sighting
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/5"
                    onClick={() => router.push('/citizen-science')}
                  >
                    Learn About Citizen Science
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
