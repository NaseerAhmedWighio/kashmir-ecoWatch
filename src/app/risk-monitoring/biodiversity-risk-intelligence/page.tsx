'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Leaf, ArrowRight, Map, TrendingUp, Activity, Shield,
  AlertTriangle, Layers, Target, Droplets
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const biodiversityRisks = [
  { risk: 'Habitat Fragmentation', severity: 'Critical', description: 'Road corridors and development dividing wildlife habitats', affectedSpecies: 45 },
  { risk: 'Climate-Linked Stress', severity: 'High', description: 'Warming temperatures affecting species distribution', affectedSpecies: 38 },
  { risk: 'Human-Wildlife Conflict', severity: 'High', description: 'Settlement expansion into wildlife corridors', affectedSpecies: 22 },
  { risk: 'Pollution Impact', severity: 'Moderate-High', description: 'Air, water, and soil pollution affecting ecosystem health', affectedSpecies: 56 },
  { risk: 'Invasive Species', severity: 'Moderate', description: 'Non-native species outcompeting native flora and fauna', affectedSpecies: 28 },
  { risk: 'Overexploitation', severity: 'Moderate', description: 'Unsustainable harvesting and poaching pressure', affectedSpecies: 15 },
];

const threatenedSpecies = [
  { species: 'Kashmir Stag (Hangul)', status: 'Critically Endangered', population: '~180', habitat: 'Dachigam NP', trend: 'Stable' },
  { species: 'Snow Leopard', status: 'Vulnerable', population: '~200', habitat: 'High Altitude', trend: 'Declining' },
  { species: 'Musk Deer', status: 'Endangered', population: '~500', habitat: 'Forest Zones', trend: 'Declining' },
  { species: 'Brown Bear', status: 'Vulnerable', population: '~800', habitat: 'Forest-Alpine', trend: 'Stable' },
  { species: 'Leopard', status: 'Vulnerable', population: '~450', habitat: 'Forest-Settlement Edge', trend: 'Stable' },
  { species: 'Himalayan Wolf', status: 'Vulnerable', population: '~100', habitat: 'High Altitude', trend: 'Declining' },
];

const habitatVulnerability = [
  { habitat: 'Alpine Meadows', vulnerability: 'High', threat: 'Climate change, grazing pressure', area: '2,500 km²' },
  { habitat: 'Temperate Forests', vulnerability: 'Moderate-High', threat: 'Logging, fragmentation', area: '8,200 km²' },
  { habitat: 'Wetlands', vulnerability: 'Critical', threat: 'Encroachment, pollution, shrinkage', area: '450 km²' },
  { habitat: 'River Systems', vulnerability: 'Moderate', threat: 'Pollution, flow alteration', area: '1,200 km' },
];

export default function BiodiversityRiskIntelligencePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-green-950/30 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-2xl">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <Badge variant="success" size="lg">Biodiversity Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Biodiversity <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">Risk Intelligence</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Comprehensive biodiversity risk assessment, habitat vulnerability analysis, threatened species monitoring,
              and ecological pressure tracking across Kashmir's protected areas and landscapes
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-xl"
                onClick={() => router.push('/risk-monitoring/dashboards')}
              >
                <Activity className="w-5 h-5 mr-2" />
                View Biodiversity Dashboard
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
              <div className="text-4xl font-bold text-red-400 mb-2">6</div>
              <div className="text-sm text-slate-400 mb-1">Critical Risks</div>
              <div className="text-xs text-red-400">Monitored</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-amber-400 mb-2">204</div>
              <div className="text-sm text-slate-400 mb-1">Species Affected</div>
              <div className="text-xs text-amber-400">All Risks</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-red-400 mb-2">~180</div>
              <div className="text-sm text-slate-400 mb-1">Hangul Population</div>
              <div className="text-xs text-red-400">Critical</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-orange-400 mb-2">4</div>
              <div className="text-sm text-slate-400 mb-1">Habitat Types</div>
              <div className="text-xs text-orange-400">Vulnerable</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">20+</div>
              <div className="text-sm text-slate-400 mb-1">Protected Areas</div>
              <div className="text-xs text-emerald-400">Monitored</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Biodiversity Risk Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Biodiversity Risk Factors</h2>
            <p className="text-slate-400">Major threats to Kashmir's biodiversity and affected species counts</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {biodiversityRisks.map((risk, index) => (
              <motion.div
                key={risk.risk}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-light border-white/10 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-sm font-bold text-white">{risk.risk}</h3>
                    <Badge
                      variant={risk.severity === 'Critical' ? 'danger' : 
                               risk.severity === 'High' ? 'warning' : 'info'}
                      size="sm"
                    >
                      {risk.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400 mb-3">{risk.description}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <Target className="w-3 h-3 text-amber-400" />
                    <span className="text-slate-400">{risk.affectedSpecies} species affected</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Threatened Species Panel */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Threatened Species of Kashmir</h2>
            <p className="text-slate-400">Conservation status and population trends of key species</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {threatenedSpecies.map((species, index) => (
              <motion.div
                key={species.species}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-bold text-white">{species.species}</h3>
                    <Badge
                      variant={species.status === 'Critically Endangered' ? 'danger' : 
                               species.status === 'Endangered' ? 'warning' : 'info'}
                      size="sm"
                    >
                      {species.status.split(' ')[0]}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-500 mb-3">{species.status}</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Population</span>
                      <span className="text-white">{species.population}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Habitat</span>
                      <span className="text-emerald-400">{species.habitat}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Trend</span>
                      <span className={species.trend === 'Declining' ? 'text-red-400' : 'text-emerald-400'}>
                        {species.trend}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Habitat Vulnerability */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Habitat Vulnerability Assessment</h2>
            <p className="text-slate-400">Vulnerability status of Kashmir's major habitat types</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {habitatVulnerability.map((habitat, index) => (
              <motion.div
                key={habitat.habitat}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-light border-white/10 p-5">
                  <h3 className="text-sm font-bold text-white mb-2">{habitat.habitat}</h3>
                  <div className="text-xs text-slate-400 mb-3">Area: {habitat.area}</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Vulnerability</span>
                      <Badge
                        variant={habitat.vulnerability === 'Critical' ? 'danger' : 
                                 habitat.vulnerability === 'High' ? 'warning' : 'info'}
                        size="sm"
                      >
                        {habitat.vulnerability}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Threat</span>
                      <span className="text-amber-400 line-clamp-2">{habitat.threat}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Linkage Analysis */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Cross-System Risk Overlap</h2>
            <p className="text-slate-400">How biodiversity risks intersect with other environmental stressors</p>
          </motion.div>

          <Card className="glass-intense border-white/10 p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Shield className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-sm font-bold text-white mb-2">Fire Overlap</h3>
                <p className="text-xs text-slate-400">
                  Forest fire risks → Habitat destruction → Species displacement → Biodiversity loss
                </p>
              </div>
              <div className="text-center">
                <Droplets className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-sm font-bold text-white mb-2">Hydrology Overlap</h3>
                <p className="text-xs text-slate-400">
                  Wetland shrinkage → Aquatic habitat loss → Waterbird decline → Ecosystem collapse
                </p>
              </div>
              <div className="text-center">
                <AlertTriangle className="w-12 h-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-sm font-bold text-white mb-2">Climate Overlap</h3>
                <p className="text-xs text-slate-400">
                  Warming → Habitat shift → Species stress → Range compression → Extinction risk
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Map Preview Panel */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Map className="w-6 h-6 text-emerald-400" />
                <div>
                  <h2 className="text-xl font-bold text-white">Biodiversity Risk Map Preview</h2>
                  <p className="text-sm text-slate-400">Species distribution, habitat vulnerability, and risk overlap layers</p>
                </div>
              </div>
              <div className="relative h-80 bg-gradient-to-br from-emerald-900/50 to-green-900/30 rounded-xl flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <Layers className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 mb-4">Interactive biodiversity map with protected areas and species ranges</p>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-emerald-500 to-green-600"
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
            <p className="text-slate-400">Cross-linked biodiversity and environmental monitoring</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              className="glass-light border-white/10 hover:border-amber-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/red-data-species-vulnerability')}
            >
              <Shield className="w-8 h-8 text-amber-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                Red Data / Species Vulnerability
              </h3>
              <p className="text-xs text-slate-400">
                Detailed species vulnerability assessments
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-amber-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/human-wildlife-conflict')}
            >
              <AlertTriangle className="w-8 h-8 text-amber-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                Human-Wildlife Conflict
              </h3>
              <p className="text-xs text-slate-400">
                Conflict patterns and mitigation
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-green-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/protected-areas')}
            >
              <Leaf className="w-8 h-8 text-green-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                Protected Areas
              </h3>
              <p className="text-xs text-slate-400">
                Protected area network database
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
                Biodiversity risk dashboards
              </p>
            </Card>
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
