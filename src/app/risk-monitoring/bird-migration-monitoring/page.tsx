'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Bird, ArrowRight, Map, TrendingUp, Activity, Calendar,
  Filter, Layers, Eye
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const migrationData = [
  { id: 'bm-1', wetland: 'Hokersar', district: 'Srinagar', species: 'Common Teal', count: '12,000+', status: 'Peak Arrival', period: 'Oct-Mar' },
  { id: 'bm-2', wetland: 'Hygam', district: 'Baramulla', species: 'Mallard', count: '8,500+', status: 'Active', period: 'Oct-Mar' },
  { id: 'bm-3', wetland: 'Shallabugh', district: 'Ganderbal', species: 'Greylag Goose', count: '5,000+', status: 'Peak Arrival', period: 'Nov-Feb' },
  { id: 'bm-4', wetland: 'Wular Lake', district: 'Bandipora', species: 'Northern Pintail', count: '15,000+', status: 'Active', period: 'Oct-Mar' },
  { id: 'bm-5', wetland: 'Manasbal Lake', district: 'Ganderbal', species: 'Common Pochard', count: '3,500+', status: 'Moderate', period: 'Nov-Mar' },
  { id: 'bm-6', wetland: 'Dal Lake', district: 'Srinagar', species: 'Various Waterfowl', count: '6,000+', status: 'Active', period: 'Oct-Apr' },
];

const migratorySpecies = [
  { species: 'Common Teal', origin: 'Siberia/Central Asia', arrival: 'October', departure: 'March', peakCount: '25,000+', conservationStatus: 'Least Concern' },
  { species: 'Mallard', origin: 'Northern Asia', arrival: 'October', departure: 'March', peakCount: '18,000+', conservationStatus: 'Least Concern' },
  { species: 'Northern Pintail', origin: 'Siberia', arrival: 'November', departure: 'February', peakCount: '20,000+', conservationStatus: 'Least Concern' },
  { species: 'Greylag Goose', origin: 'Central Asia', arrival: 'November', departure: 'February', peakCount: '8,000+', conservationStatus: 'Least Concern' },
  { species: 'Common Pochard', origin: 'Northern Europe/Asia', arrival: 'November', departure: 'March', peakCount: '6,000+', conservationStatus: 'Vulnerable' },
  { species: 'Red-Crested Pochard', origin: 'Southern Europe/Asia', arrival: 'October', departure: 'March', peakCount: '4,000+', conservationStatus: 'Least Concern' },
];

const wetlandFilters = [
  { wetland: 'Hokersar', district: 'Srinagar', avgVisitors: '45,000', sensitivity: 'High', status: 'Protected' },
  { wetland: 'Hygam', district: 'Baramulla', avgVisitors: '28,000', sensitivity: 'High', status: 'Protected' },
  { wetland: 'Shallabugh', district: 'Ganderbal', avgVisitors: '22,000', sensitivity: 'Critical', status: 'Protected' },
  { wetland: 'Wular Lake', district: 'Bandipora', avgVisitors: '55,000', sensitivity: 'High', status: 'Ramsar' },
  { wetland: 'Manasbal Lake', district: 'Ganderbal', avgVisitors: '18,000', sensitivity: 'Moderate-High', status: 'Protected' },
  { wetland: 'Dal Lake', district: 'Srinagar', avgVisitors: '35,000', sensitivity: 'Moderate', status: 'Protected' },
];

const migrationWindows = [
  { window: 'Early Arrival (Sep-Oct)', activity: 'Scouting species arrive', species: 'Greylag Goose, Mallard', status: 'Beginning' },
  { window: 'Peak Season (Nov-Feb)', activity: 'Maximum diversity and numbers', species: 'All major species', status: 'Peak' },
  { window: 'Late Season (Mar-Apr)', activity: 'Departure begins', species: 'Common Teal, Pochard', status: 'Declining' },
  { window: 'Off Season (May-Aug)', activity: 'Resident species only', species: 'Local waterfowl', status: 'Minimal' },
];

export default function BirdMigrationMonitoringPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-indigo-950/30 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl">
                <Bird className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Migration Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Bird Migration <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Monitoring</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Hokersar, Hygam, Shallabugh, Wular wetland monitoring, seasonal migration windows,
              arrival/departure intelligence, migratory species tracking, and route/wetland sensitivity analysis
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-xl"
                onClick={() => router.push('/risk-monitoring/dashboards')}
              >
                <Activity className="w-5 h-5 mr-2" />
                View Migration Dashboard
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                onClick={() => router.push('/risk-monitoring')}
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Back to Risk Monitoring
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Ribbon */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">203K</div>
              <div className="text-sm text-slate-400 mb-1">Total Birds (Peak)</div>
              <div className="text-xs text-emerald-400">Oct-Mar Season</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-indigo-400 mb-2">45+</div>
              <div className="text-sm text-slate-400 mb-1">Migratory Species</div>
              <div className="text-xs text-indigo-400">Recorded</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">6</div>
              <div className="text-sm text-slate-400 mb-1">Key Wetlands</div>
              <div className="text-xs text-emerald-400">Monitored</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-amber-400 mb-2">Peak</div>
              <div className="text-sm text-slate-400 mb-1">Current Season</div>
              <div className="text-xs text-amber-400">Nov-Feb</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">6</div>
              <div className="text-sm text-slate-400 mb-1">Month Window</div>
              <div className="text-xs text-slate-500">Oct-Mar</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter Row */}
      <section className="py-8 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              <Filter className="w-3 h-3 mr-2" />
              All Wetlands
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Hokersar
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Hygam
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Shallabugh
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Wular
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Manasbal
            </Badge>
          </div>
        </div>
      </section>

      {/* Wetland Migration Status */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Wetland Migration Status</h2>
            <p className="text-slate-400">Current migratory bird activity at key Kashmir wetlands</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {migrationData.map((record, index) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{record.wetland}</h3>
                      <div className="text-xs text-slate-500">{record.district}</div>
                    </div>
                    <Badge
                      variant={record.status === 'Peak Arrival' ? 'success' : 
                               record.status === 'Active' ? 'info' : 'outline'}
                      size="sm"
                    >
                      {record.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Species</span>
                      <span className="text-white font-medium">{record.species}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Count</span>
                      <span className="text-blue-400 font-medium">{record.count}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Period</span>
                      <span className="text-slate-400">{record.period}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Migratory Species Panel */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Key Migratory Species</h2>
            <p className="text-slate-400">Origin, timing, and conservation status of major migratory birds</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {migratorySpecies.map((species, index) => (
              <motion.div
                key={species.species}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-light border-white/10 p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-bold text-white">{species.species}</h3>
                    <Badge
                      variant={species.conservationStatus === 'Vulnerable' ? 'warning' : 'success'}
                      size="sm"
                    >
                      {species.conservationStatus === 'Least Concern' ? 'LC' : species.conservationStatus}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-500 mb-3">{species.origin}</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Arrival</span>
                      <span className="text-white">{species.arrival}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Departure</span>
                      <span className="text-white">{species.departure}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Peak Count</span>
                      <span className="text-blue-400">{species.peakCount}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Migration Windows */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Migration Window Calendar</h2>
            <p className="text-slate-400">Seasonal migration timing and activity patterns</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {migrationWindows.map((window, index) => (
              <motion.div
                key={window.window}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-light border-white/10 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-5 h-5 text-blue-400" />
                    <h3 className="text-xs font-bold text-white">{window.window}</h3>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">{window.activity}</p>
                  <div className="text-xs text-slate-500 mb-3">{window.species}</div>
                  <Badge
                    variant={window.status === 'Peak' ? 'success' : 
                             window.status === 'Beginning' ? 'info' : 'outline'}
                    size="sm"
                  >
                    {window.status}
                  </Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Preview Panel */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Map className="w-6 h-6 text-blue-400" />
                <div>
                  <h2 className="text-xl font-bold text-white">Bird Migration Map Preview</h2>
                  <p className="text-sm text-slate-400">Wetland locations, migration routes, and species distribution</p>
                </div>
              </div>
              <div className="relative h-80 bg-gradient-to-br from-blue-900/50 to-indigo-900/30 rounded-xl flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <Layers className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 mb-4">Interactive migration map with wetland and route overlays</p>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-indigo-600"
                    onClick={() => router.push('/risk-monitoring/dashboards')}
                  >
                    <Map className="w-5 h-5 mr-2" />
                    Open Full Map
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Related Intelligence */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Related Intelligence</h2>
            <p className="text-slate-400">Cross-linked bird and wetland monitoring</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              className="glass-light border-white/10 hover:border-red-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/bird-mortality-kill-monitoring')}
            >
              <Bird className="w-8 h-8 text-red-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                Bird Mortality Monitoring
              </h3>
              <p className="text-xs text-slate-400">
                Wetland bird mortality tracking
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-blue-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/water-pollution')}
            >
              <Activity className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Water Pollution
              </h3>
              <p className="text-xs text-slate-400">
                Wetland health and water quality
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-emerald-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/seasonal-ecology')}
            >
              <Calendar className="w-8 h-8 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                Seasonal Ecology
              </h3>
              <p className="text-xs text-slate-400">
                Migration season patterns
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-blue-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/dashboards')}
            >
              <Activity className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Risk Dashboards
              </h3>
              <p className="text-xs text-slate-400">
                Migration monitoring dashboards
              </p>
            </Card>
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
