'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  AlertTriangle, ArrowRight, Map, TrendingUp, Activity, Shield,
  Filter, Layers, Target
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const conflictRecords = [
  { id: 'hwc-1', species: 'Leopard', district: 'Srinagar', location: 'Forest-Settlement Edge', incidents: 12, severity: 'High', type: 'Livestock Depredation' },
  { id: 'hwc-2', species: 'Black Bear', district: 'Anantnag', location: 'Agricultural Fields', incidents: 8, severity: 'Moderate', type: 'Crop Raiding' },
  { id: 'hwc-3', species: 'Leopard', district: 'Pulwama', location: 'Village Periphery', incidents: 15, severity: 'High', type: 'Livestock Depredation' },
  { id: 'hwc-4', species: 'Black Bear', district: 'Baramulla', location: 'Orchard Areas', incidents: 6, severity: 'Moderate', type: 'Crop Raiding' },
  { id: 'hwc-5', species: 'Hangul', district: 'Ganderbal', location: 'Dachigam Buffer', incidents: 2, severity: 'Low', type: 'Habitat Pressure' },
  { id: 'hwc-6', species: 'Leopard', district: 'Budgam', location: 'Settlement Edge', incidents: 10, severity: 'High', type: 'Livestock Depredation' },
];

const conflictTypes = [
  { type: 'Livestock Depredation', frequency: 'High', primarySpecies: 'Leopard, Black Bear', impact: 'Economic loss, retaliatory killing' },
  { type: 'Crop Raiding', frequency: 'Moderate-High', primarySpecies: 'Black Bear, Wild Boar', impact: 'Agricultural damage, livelihood loss' },
  { type: 'Settlement Incursion', frequency: 'Moderate', primarySpecies: 'Leopard', impact: 'Human safety risk, panic' },
  { type: 'Habitat Pressure', frequency: 'Low-Moderate', primarySpecies: 'Hangul, Musk Deer', impact: 'Species stress, range contraction' },
];

const districtConflictProfile = [
  { district: 'Srinagar', totalIncidents: 28, primarySpecies: 'Leopard', trend: 'increasing' as const, hotspots: 8 },
  { district: 'Anantnag', totalIncidents: 22, primarySpecies: 'Black Bear', trend: 'stable' as const, hotspots: 6 },
  { district: 'Pulwama', totalIncidents: 25, primarySpecies: 'Leopard', trend: 'increasing' as const, hotspots: 7 },
  { district: 'Baramulla', totalIncidents: 18, primarySpecies: 'Black Bear', trend: 'stable' as const, hotspots: 5 },
  { district: 'Ganderbal', totalIncidents: 15, primarySpecies: 'Leopard', trend: 'stable' as const, hotspots: 4 },
  { district: 'Budgam', totalIncidents: 20, primarySpecies: 'Leopard', trend: 'increasing' as const, hotspots: 6 },
];

const responseGuidance = [
  { scenario: 'Leopard Sighting Near Settlement', action: 'Maintain distance, secure livestock, alert forest department', urgency: 'High' },
  { scenario: 'Bear Crop Raiding', action: 'Install deterrents, avoid confrontation, report incident', urgency: 'Moderate' },
  { scenario: 'Injured Wildlife', action: 'Do not approach, contact wildlife rescue immediately', urgency: 'Critical' },
  { scenario: 'Wildlife Corridor Sighting', action: 'Report location, avoid disturbance, support corridor protection', urgency: 'Moderate' },
];

export default function HumanWildlifeConflictPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/50 via-orange-950/30 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <a href="/risk-monitoring" className="hover:text-white transition-colors">Risk & Monitoring</a>
              <span>/</span>
              <a href="/risk-monitoring/biodiversity-risks" className="hover:text-white transition-colors">Biodiversity Risks</a>
              <span>/</span>
              <span className="text-white font-medium">Human-Wildlife Conflict</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-2xl">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <Badge variant="warning" size="lg">Conflict Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Human-Wildlife <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Conflict</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Leopard and black bear conflict monitoring, livestock depredation tracking, crop raiding incidents,
              settlement-edge conflict zones, Hangul pressure landscapes, and district conflict profiles across Kashmir
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white shadow-xl"
                onClick={() => router.push('/risk-monitoring/dashboards')}
              >
                <Activity className="w-5 h-5 mr-2" />
                View Conflict Dashboard
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                onClick={() => router.push('/risk-monitoring/biodiversity-risks')}
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Back to Biodiversity Risks
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                onClick={() => router.push('/risk-monitoring')}
              >
                Overview
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
              <div className="text-4xl font-bold text-amber-400 mb-2">128</div>
              <div className="text-sm text-slate-400 mb-1">Total Incidents (YTD)</div>
              <div className="text-xs text-red-400">+15% vs last year</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-red-400 mb-2">73</div>
              <div className="text-sm text-slate-400 mb-1">Livestock Loss</div>
              <div className="text-xs text-red-400">Depredation</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-orange-400 mb-2">42</div>
              <div className="text-sm text-slate-400 mb-1">Crop Raiding</div>
              <div className="text-xs text-orange-400">Incidents</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">36</div>
              <div className="text-sm text-slate-400 mb-1">Conflict Hotspots</div>
              <div className="text-xs text-amber-400">Identified</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">6</div>
              <div className="text-sm text-slate-400 mb-1">Districts Affected</div>
              <div className="text-xs text-slate-500">Monitored</div>
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
              All Species
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Leopard
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Black Bear
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Hangul
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Livestock Depredation
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Crop Raiding
            </Badge>
          </div>
        </div>
      </section>

      {/* District Conflict Profiles */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">District Conflict Profiles</h2>
            <p className="text-slate-400">Human-wildlife conflict incidents and trends by district</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {districtConflictProfile.map((item, index) => (
              <motion.div
                key={item.district}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{item.district}</h3>
                      <div className="text-xs text-slate-500">{item.hotspots} hotspots</div>
                    </div>
                    <Badge variant="warning" size="sm">
                      {item.totalIncidents} incidents
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Primary Species</span>
                      <span className="text-white font-medium">{item.primarySpecies}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className={`w-4 h-4 ${
                        item.trend === 'increasing' ? 'text-red-400' : 'text-slate-400'
                      }`} />
                      <span className={`text-sm ${
                        item.trend === 'increasing' ? 'text-red-400' : 'text-slate-400'
                      }`}>
                        {item.trend === 'increasing' ? 'Increasing' : 'Stable'}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Conflict Records */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Recent Conflict Records</h2>
            <p className="text-slate-400">Latest human-wildlife conflict incidents across Kashmir</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conflictRecords.map((record, index) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{record.species}</h3>
                      <div className="text-xs text-slate-500">{record.district}</div>
                    </div>
                    <Badge
                      variant={record.severity === 'High' ? 'danger' : 
                               record.severity === 'Moderate' ? 'warning' : 'info'}
                      size="sm"
                    >
                      {record.severity}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Location</span>
                      <span className="text-white font-medium">{record.location}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Type</span>
                      <span className="text-amber-400 font-medium">{record.type}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Incidents</span>
                      <span className="text-red-400 font-medium">{record.incidents}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conflict Types */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Conflict Types & Patterns</h2>
            <p className="text-slate-400">Major categories of human-wildlife conflict in Kashmir</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {conflictTypes.map((item, index) => (
              <motion.div
                key={item.type}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-light border-white/10 p-5">
                  <h3 className="text-sm font-bold text-white mb-2">{item.type}</h3>
                  <div className="text-xs text-slate-400 mb-2">Frequency: {item.frequency}</div>
                  <div className="text-xs text-slate-500 mb-3">Species: {item.primarySpecies}</div>
                  <p className="text-xs text-slate-400">{item.impact}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Response Guidance */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Response Guidance</h2>
            <p className="text-slate-400">Recommended actions for different conflict scenarios</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {responseGuidance.map((guidance, index) => (
              <motion.div
                key={guidance.scenario}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5">
                  <h3 className="text-xs font-bold text-white mb-3">{guidance.scenario}</h3>
                  <p className="text-xs text-slate-400 mb-3">{guidance.action}</p>
                  <Badge
                    variant={guidance.urgency === 'Critical' ? 'danger' : 
                             guidance.urgency === 'High' ? 'warning' : 'info'}
                    size="sm"
                  >
                    {guidance.urgency}
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
                <Map className="w-6 h-6 text-amber-400" />
                <div>
                  <h2 className="text-xl font-bold text-white">Conflict Map Preview</h2>
                  <p className="text-sm text-slate-400">Conflict hotspots, species distribution, and settlement-edge risk zones</p>
                </div>
              </div>
              <div className="relative h-80 bg-gradient-to-br from-amber-900/50 to-orange-900/30 rounded-xl flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <Layers className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 mb-4">Interactive conflict map with incident locations and risk zones</p>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-amber-500 to-orange-600"
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
            <p className="text-slate-400">Cross-linked biodiversity and conflict monitoring</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              className="glass-light border-white/10 hover:border-red-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/wildlife-mortality-kill-records')}
            >
              <Target className="w-8 h-8 text-red-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                Wildlife Mortality
              </h3>
              <p className="text-xs text-slate-400">
                Conflict-linked mortality records
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-emerald-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/biodiversity-risk-intelligence')}
            >
              <Shield className="w-8 h-8 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                Biodiversity Risk
              </h3>
              <p className="text-xs text-slate-400">
                Species vulnerability and habitat risk
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-green-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/protected-areas')}
            >
              <Activity className="w-8 h-8 text-green-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                Protected Areas
              </h3>
              <p className="text-xs text-slate-400">
                Protected area and corridor network
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
                Conflict monitoring dashboards
              </p>
            </Card>
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
