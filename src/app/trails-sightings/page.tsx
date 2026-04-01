'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Footprints, MapPin, TrendingUp, ArrowRight, Plus, Eye, Camera,
  Mountain, Droplets, Flower2, Bird, Trees, Snowflake, Shield,
  Search, Calendar, Layers, Activity
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

// New Components
import { TrailIntelligenceCard } from '@/components/trails/TrailIntelligenceCard';
import { SightingAggregationPanel } from '@/components/sightings/SightingAggregationPanel';
import { SeasonalWindowDisplay } from '@/components/trails/SeasonalWindowDisplay';
import { CrossModuleLinkStrip } from '@/components/sections/CrossModuleLinkStrip';
import { VerificationStatusBadge } from '@/components/sightings/VerificationStatusBadge';

// Data Services
import {
  trailIntelligenceData,
  sightingAggregations,
  seasonalWindows,
  sightingIntelligenceData,
  trailsSightingsMetrics,
  getTrailsData,
  getSightingsData,
  kashmirValidation
} from '@/data/trails-sightings';

export default function TrailsAndSightingsPage() {
  const router = useRouter();
  
  // Get data
  const trails = getTrailsData.all();
  const aggregations = sightingAggregations;
  const seasonalData = seasonalWindows;
  const recentSightings = getSightingsData.recent(6);
  const metrics = trailsSightingsMetrics;
  
  // Kashmir-only filtering (exclude non-Kashmir locations like Leh/Hemis)
  const kashmirSightings = recentSightings.filter(s => kashmirValidation.isKashmirDistrict(s.district));

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* =========================================================
          BAND 1: HERO + COMMAND SURFACE
          ========================================================= */}
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
                <Footprints className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Kashmir Ecological Access & Field Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Trails & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Sightings</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Comprehensive ecological trail intelligence, field observation workflows, and citizen science 
              database for Kashmir's biodiversity conservation and research
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
                <Search className="w-5 h-5 mr-2" />
                Explore Trails
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                onClick={() => router.push('/atlas?layer=trails')}
              >
                <Layers className="w-5 h-5 mr-2" />
                View on Map
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          BAND 1b: METRICS RIBBON
          ========================================================= */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { label: 'Total Trails', value: metrics.totalTrails, sublabel: '156 active' },
              { label: 'Wildlife Sightings', value: '2,847', sublabel: 'verified records' },
              { label: 'Active Observers', value: metrics.activeObservers, sublabel: 'this month' },
              { label: 'Verified Sightings', value: metrics.verifiedSightings, sublabel: 'expert reviewed' },
              { label: 'Districts Covered', value: metrics.districtsActive, sublabel: 'Kashmir-wide' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-slate-400 mb-1">{stat.label}</div>
                <div className="text-xs text-emerald-400">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          BAND 2: TRAIL INTELLIGENCE OVERVIEW
          ========================================================= */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <Mountain className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">Trail Intelligence</h2>
                  <p className="text-slate-400">Ecological access routes with full metadata</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                onClick={() => router.push('/trails-sightings/all-trails')}
              >
                View All Trails
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {getTrailsData.flagshipTrails().slice(0, 4).map((trail, index) => (
              <TrailIntelligenceCard 
                key={trail.id} 
                trail={trail}
                onClick={(t) => router.push(`/trails-sightings/${t.category}/${t.slug}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          BAND 3: SIGHTING INTELLIGENCE OVERVIEW
          ========================================================= */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Sighting Intelligence</h2>
                <p className="text-slate-400">Analytical breakdowns with verification states</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aggregations.map((aggregation, index) => (
              <SightingAggregationPanel
                key={aggregation.categoryId}
                aggregation={aggregation}
                onClick={(a) => router.push(`/trails-sightings/${a.categoryId}`)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          BAND 4: MAP-LINKED ECOLOGICAL ACCESS PREVIEW
          ========================================================= */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="glass-intense border-white/10 overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Map Preview */}
                <div className="relative h-96 lg:h-auto bg-gradient-to-br from-slate-800 to-slate-900">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Layers className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400 mb-4">Interactive Trail & Sighting Map</p>
                      <Button
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/5"
                        onClick={() => router.push('/atlas?layer=trails-sightings')}
                      >
                        Open Full Map
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Decorative Map Elements */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-emerald-500/30 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-teal-500/30 rounded-full blur-3xl" />
                  </div>
                </div>
                
                {/* Intelligence Panel */}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="w-6 h-6 text-emerald-400" />
                    <h3 className="text-2xl font-bold text-white">Ecological Access Map</h3>
                  </div>
                  
                  <p className="text-slate-400 mb-6 leading-relaxed">
                    Interactive spatial intelligence showing trail networks, sighting hotspots, 
                    district boundaries, protected areas, and habitat corridors across Kashmir.
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    {[
                      { label: 'Trail Networks', value: '156 routes', color: 'text-emerald-400' },
                      { label: 'Sighting Hotspots', value: '2,847 records', color: 'text-amber-400' },
                      { label: 'Protected Areas', value: '12 zones', color: 'text-sky-400' },
                      { label: 'District Coverage', value: '16 districts', color: 'text-violet-400' },
                    ].map((item) => (
                      <div key={item.label} className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                        <span className="text-sm text-slate-400">{item.label}</span>
                        <span className={`text-sm font-bold ${item.color}`}>{item.value}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" size="sm" className="border-emerald-500/30 text-emerald-400">
                      <Mountain className="w-3 h-3 mr-1" />
                      Trails Layer
                    </Badge>
                    <Badge variant="outline" size="sm" className="border-amber-500/30 text-amber-400">
                      <Eye className="w-3 h-3 mr-1" />
                      Sightings Heatmap
                    </Badge>
                    <Badge variant="outline" size="sm" className="border-sky-500/30 text-sky-400">
                      <Shield className="w-3 h-3 mr-1" />
                      Protected Areas
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          BAND 5: SEASONAL WINDOWS AND ROUTE CONDITIONS
          ========================================================= */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Seasonal Windows</h2>
                <p className="text-slate-400">Access conditions and optimal timing</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {seasonalData.map((window) => (
              <SeasonalWindowDisplay key={window.id} window={window} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          BAND 6: RECENT VERIFIED FIELD INTELLIGENCE
          ========================================================= */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Recent Verified Sightings</h2>
              <p className="text-slate-400">Latest expert-verified field observations from Kashmir</p>
            </div>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/5"
              onClick={() => router.push('/trails-sightings/all-sightings')}
            >
              View All Sightings
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kashmirSightings.map((sighting, index) => (
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
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                      {sighting.speciesName}
                    </h3>
                    <div className="space-y-2 text-sm text-slate-400">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-emerald-400" />
                        {sighting.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-emerald-400" />
                        {sighting.observationDate}
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-emerald-400" />
                        {sighting.observerType.replace('-', ' ')}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          BAND 7: CONTRIBUTION AND VERIFICATION WORKFLOW
          ========================================================= */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <Card className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 border-white/10 overflow-hidden">
            <div className="relative p-12 text-center">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-teal-600/20" />
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl">
                    <Plus className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <h2 className="text-4xl font-bold text-white mb-4">
                  Contribute Your Observations
                </h2>
                <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
                  Help build Kashmir's most comprehensive wildlife and trail database by submitting
                  your field observations, photos, and ecological notes. Expert verification ensures data quality.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
                  {[
                    {
                      step: '1',
                      title: 'Submit',
                      description: 'Record your sighting with photos, location, and details'
                    },
                    {
                      step: '2',
                      title: 'Verify',
                      description: 'Expert review ensures data quality and accuracy'
                    },
                    {
                      step: '3',
                      title: 'Contribute',
                      description: 'Your data supports conservation and research'
                    }
                  ].map((item) => (
                    <div key={item.step} className="p-6 rounded-xl bg-white/5 border border-white/5">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold mb-3 mx-auto">
                        {item.step}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-400">{item.description}</p>
                    </div>
                  ))}
                </div>
                
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

      {/* =========================================================
          BAND 8: LINKED DISTRICT / HABITAT / PROTECTED-AREA INTELLIGENCE
          ========================================================= */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <CrossModuleLinkStrip 
            context={{
              habitat: 'temperate-forest',
            }}
          />
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
