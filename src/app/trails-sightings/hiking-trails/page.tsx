'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Mountain, MapPin, Clock, TrendingUp, ArrowRight, Search, Filter, Map, Footprints
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const hikingTrails = [
  {
    id: 'ht-1',
    name: 'Tarsar Marsar Trek',
    district: 'Anantnag',
    distance: 32,
    duration: '5 days',
    difficulty: 'moderate' as const,
    elevation: 1200,
    bestSeason: 'May - September',
    description: 'Iconic twin lake trek through alpine meadows with views of Kolahoi Peak',
    features: ['Alpine Lakes', 'Meadow Camps', 'Panoramic Views', 'Moderate Fitness Required']
  },
  {
    id: 'ht-2',
    name: 'Kolahoi Base Camp',
    district: 'Anantnag',
    distance: 14,
    duration: '2 days',
    difficulty: 'difficult' as const,
    elevation: 800,
    bestSeason: 'June - September',
    description: 'Challenging trek to the base of Kashmir\'s highest peak (5,425m)',
    features: ['Glacier Views', 'Rocky Terrain', 'High Altitude', 'Technical Sections']
  },
  {
    id: 'ht-3',
    name: 'Harmukh Base Camp',
    district: 'Ganderbal',
    distance: 24,
    duration: '3 days',
    difficulty: 'difficult' as const,
    elevation: 1400,
    bestSeason: 'July - September',
    description: 'Sacred mountain trek with challenging ascent and spiritual significance',
    features: ['Sacred Peak', 'Alpine Terrain', 'Lake Gangabal', 'Pilgrimage Route']
  },
  {
    id: 'ht-4',
    name: 'Vishansar Krishansar Lake Trek',
    district: 'Kupwara',
    distance: 28,
    duration: '4 days',
    difficulty: 'moderate' as const,
    elevation: 1100,
    bestSeason: 'June - August',
    description: 'Twin alpine lakes surrounded by wildflower meadows and snow-capped peaks',
    features: ['Twin Lakes', 'Wildflower Meadows', 'Trout Fishing', 'Nomad Camps']
  },
  {
    id: 'ht-5',
    name: 'Gadsar Lake Trek',
    district: 'Kupwara',
    distance: 22,
    duration: '3 days',
    difficulty: 'moderate' as const,
    elevation: 950,
    bestSeason: 'May - September',
    description: 'Lake of snakes, famous for its unique shape and crystal-clear waters',
    features: ['Alpine Lake', 'Wildlife Spotting', 'Meadow Walks', 'Photography']
  },
  {
    id: 'ht-6',
    name: 'Bandipora Gurez Trek',
    district: 'Bandipora',
    distance: 45,
    duration: '6 days',
    difficulty: 'difficult' as const,
    elevation: 1800,
    bestSeason: 'June - September',
    description: 'Remote valley trek through pristine landscapes near the Line of Control',
    features: ['Remote Valley', 'Cultural Experience', 'Diverse Landscapes', 'Border Region']
  },
];

export default function HikingTrailsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">{/* Hero Section */}
      <section className="relative pt-48 pb-20 overflow-hidden">
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
                <Mountain className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Multi-day Treks & Day Hikes</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Hiking <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Trails</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Multi-day treks and day hikes across Kashmir's mountains, valleys, and alpine meadows.
              From challenging high-altitude routes to scenic valley walks.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-xl"
                onClick={() => router.push('/trails-sightings')}
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Back to Trails & Sightings
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                onClick={() => router.push('/trails-sightings/trail-field-records')}
              >
                <Map className="w-5 h-5 mr-2" />
                View Trail Records
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/5"
                icon={<Filter className="w-4 h-4" />}
              >
                Filter
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-white hover:bg-white/5"
                icon={<Search className="w-4 h-4" />}
              >
                Search
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>Showing</span>
              <span className="text-white font-semibold">{hikingTrails.length}</span>
              <span>trails</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trails Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hikingTrails.map((trail, index) => (
              <motion.div
                key={trail.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 hover:border-emerald-500/30 transition-all overflow-hidden group">
                  <div className="aspect-video bg-gradient-to-br from-emerald-900/50 to-teal-900/50 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Mountain className="w-16 h-16 text-emerald-600/50" />
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge
                        variant={
                          trail.difficulty === 'moderate'
                            ? 'warning'
                            : 'danger'
                        }
                        size="sm"
                      >
                        {trail.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {trail.name}
                    </h3>
                    <p className="text-sm text-slate-400 mb-3 line-clamp-2">
                      {trail.description}
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-sm text-slate-400 mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-400" />
                        {trail.district}
                      </div>
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-400" />
                        {trail.distance} km
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-emerald-400" />
                        {trail.duration}
                      </div>
                      <div className="flex items-center gap-2">
                        <Mountain className="w-4 h-4 text-emerald-400" />
                        +{trail.elevation}m
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {trail.features.slice(0, 3).map((feature, fIdx) => (
                        <Badge key={fIdx} variant="outline" size="sm" className="text-xs border-white/10">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-white/5">
                      <span>Best: {trail.bestSeason}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/5 h-8"
                        onClick={() => router.push(`/trails-sightings/hiking-trails/${trail.id.replace('ht-', '')}`)}
                      >
                        Details
                      </Button>
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
                  Record Your Hiking Experience
                </h2>
                <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
                  Share trail conditions, photos, and observations to help fellow hikers
                  and contribute to trail monitoring
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-xl"
                    onClick={() => router.push('/trails-sightings/trail-field-records')}
                  >
                    <Map className="w-5 h-5 mr-2" />
                    Submit Trail Record
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/5"
                    onClick={() => router.push('/trails-sightings')}
                  >
                    <Footprints className="w-5 h-5 mr-2" />
                    Browse All Trails & Sightings
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
