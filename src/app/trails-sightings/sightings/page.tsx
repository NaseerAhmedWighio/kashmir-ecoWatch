'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Eye, MapPin, Calendar, Camera, ArrowRight, Filter, Search,
  Shield, Bird, Trees, Flower2, Droplets
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { VerificationStatusBadge } from '@/components/sightings/VerificationStatusBadge';
import { getSightingsData, kashmirValidation } from '@/data/trails-sightings';

export default function SightingsPage() {
  const router = useRouter();

  // Get all sightings and filter to Kashmir only
  const allSightings = getSightingsData.all();
  const kashmirSightings = allSightings.filter(s => kashmirValidation.isKashmirDistrict(s.district));

  // Group by category for filtering
  const categories = [
    { id: 'all', label: 'All Sightings', icon: Eye, count: kashmirSightings.length },
    { id: 'bird-sightings', label: 'Birds', icon: Bird, count: kashmirSightings.filter(s => s.category === 'bird-sightings').length },
    { id: 'wildlife-sightings', label: 'Wildlife', icon: Trees, count: kashmirSightings.filter(s => s.category === 'wildlife-sightings').length },
    { id: 'plant-phenology-sightings', label: 'Plants', icon: Flower2, count: kashmirSightings.filter(s => s.category === 'plant-phenology-sightings').length },
    { id: 'aquatic-wetland-sightings', label: 'Aquatic', icon: Droplets, count: kashmirSightings.filter(s => s.category === 'aquatic-wetland-sightings').length },
  ];

  const [activeCategory, setActiveCategory] = React.useState('all');

  const filteredSightings = activeCategory === 'all'
    ? kashmirSightings
    : kashmirSightings.filter(s => s.category === activeCategory);

  return (
    <main className="min-h-screen bg-slate-950">{/* Hero Section */}
      <section className="relative pt-20 md:pt-48 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/50 via-orange-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <Badge variant="warning" size="lg">Field Observation Database</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Wildlife <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Sightings</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Comprehensive database of verified wildlife observations, bird sightings,
              and ecological field records from across Kashmir
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-xl"
                onClick={() => router.push('/submit-sighting')}
              >
                <Camera className="w-5 h-5 mr-2" />
                Submit Sighting
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                onClick={() => router.push('/atlas?layer=sightings')}
              >
                View on Map
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            <Filter className="w-5 h-5 text-slate-400 flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-amber-500/20 border-amber-500/50 text-amber-400 border'
                    : 'bg-white/5 border-white/10 text-slate-400 border hover:border-white/30'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{cat.label}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  activeCategory === cat.id
                    ? 'bg-amber-500/30 text-amber-200'
                    : 'bg-slate-500/30 text-slate-300'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Sightings Grid */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSightings.map((sighting, index) => (
              <motion.div
                key={sighting.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-light border-white/10 hover:border-amber-500/30 transition-all overflow-hidden group h-full">
                  <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Camera className="w-12 h-12 text-slate-600" />
                    </div>
                    <div className="absolute top-3 right-3">
                      <VerificationStatusBadge status={sighting.verificationStatus} />
                    </div>
                    {sighting.isSensitive && (
                      <div className="absolute top-3 left-3">
                        <Badge size="sm" className="bg-red-500/20 text-red-400 border-red-500/30">
                          <Shield className="w-3 h-3 mr-1" />
                          Sensitive
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-400 transition-colors">
                      {sighting.speciesName}
                    </h3>
                    <div className="space-y-2 text-sm text-slate-400">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-amber-400" />
                        {sighting.location}, {sighting.district}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-amber-400" />
                        {new Date(sighting.observationDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-amber-400" />
                        {sighting.observerType.replace('-', ' ')}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredSightings.length === 0 && (
            <div className="text-center py-20">
              <Eye className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 text-lg">No sightings found in this category</p>
            </div>
          )}
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
