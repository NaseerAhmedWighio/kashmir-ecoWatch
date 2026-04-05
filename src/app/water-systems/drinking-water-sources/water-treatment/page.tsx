'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Beaker, Droplet, Shield, AlertTriangle, Map,
  CheckCircle, XCircle, Clock, ArrowRight, BookOpen,
  ExternalLink, Wrench, Filter, Activity, Users,
  Search, X, Flame, Thermometer, Settings
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const treatmentPlants = [
  {
    id: 'wtp-001',
    name: 'Nishat Water Treatment Plant',
    district: 'Srinagar',
    capacity: '30 MLD',
    technology: 'Rapid Sand Filtration + Chlorination',
    status: 'operational',
    yearCommissioned: 1998,
    populationServed: 250000,
    source: 'Jehlum River intake',
    challenges: ['Raw water turbidity spikes', 'Aging filtration beds', 'Chlorine dosing inconsistency'],
    esroNote: 'Part of Srinagar water supply system documented in ESRO EIA Report',
  },
  {
    id: 'wtp-002',
    name: 'Kokernag Treatment Plant',
    district: 'Anantnag',
    capacity: '15 MLD',
    technology: 'Slow Sand Filtration + Chlorination',
    status: 'operational',
    yearCommissioned: 2005,
    populationServed: 120000,
    source: 'Kokernag Spring Complex',
    challenges: ['Seasonal discharge variation', 'Filter media replacement needed'],
    esroNote: 'Spring-fed treatment — source quality generally good',
  },
  {
    id: 'wtp-003',
    name: 'Baramulla Water Treatment Plant',
    district: 'Baramulla',
    capacity: '20 MLD',
    technology: 'Rapid Sand Filtration + Chlorination',
    status: 'operational',
    yearCommissioned: 2001,
    populationServed: 150000,
    source: 'Jehlum River intake',
    challenges: ['Seasonal turbidity in raw water', 'Aging infrastructure', 'Power supply interruptions'],
    esroNote: 'ESRO: "poor quality of drinking water, discharge of sewage in water bodies"',
  },
  {
    id: 'wtp-004',
    name: 'Ganderbal Package Plant',
    district: 'Ganderbal',
    capacity: '5 MLD',
    technology: 'Package Treatment Plant (MBR)',
    status: 'partial',
    yearCommissioned: 2018,
    populationServed: 60000,
    source: 'Groundwater (tube wells)',
    challenges: ['Membrane fouling', 'Spare parts availability', 'Skilled operator shortage'],
    esroNote: 'ESRO: groundwater quality concerns with iron and manganese',
  },
  {
    id: 'wtp-005',
    name: 'Pulwama Treatment Plant',
    district: 'Pulwama',
    capacity: '10 MLD',
    technology: 'Rapid Sand Filtration + UV + Chlorination',
    status: 'operational',
    yearCommissioned: 2012,
    populationServed: 80000,
    source: 'Mixed (surface + groundwater)',
    challenges: ['UV lamp replacement cycles', 'Intermittent raw water supply'],
    esroNote: 'Mixed source requires multi-barrier treatment approach',
  },
  {
    id: 'wtp-006',
    name: 'Kupwara Treatment Plant',
    district: 'Kupwara',
    capacity: '8 MLD',
    technology: 'Rapid Sand Filtration + Chlorination',
    status: 'partial',
    yearCommissioned: 2008,
    populationServed: 45000,
    source: 'Groundwater (tube wells)',
    challenges: ['Iron removal inadequate', 'No manganese treatment', 'Aging filtration'],
    esroNote: 'ESRO: "water borne diseases like cholera and Jaundice"',
  },
  {
    id: 'wtp-007',
    name: 'Budgam Legacy Plant',
    district: 'Budgam',
    capacity: '6 MLD',
    technology: 'Slow Sand Filtration',
    status: 'needs-upgrade',
    yearCommissioned: 1985,
    populationServed: 35000,
    source: 'Spring water (Budgam springs)',
    challenges: ['Very aging infrastructure', 'No disinfection stage', 'Filter bed degradation'],
    esroNote: 'ESRO: springs drying up, source protection needed',
  },
  {
    id: 'wtp-008',
    name: 'Anantnag Urban WTP',
    district: 'Anantnag',
    capacity: '12 MLD',
    technology: 'Rapid Sand Filtration + Chlorination',
    status: 'operational',
    yearCommissioned: 2003,
    populationServed: 100000,
    source: 'Verinag Spring + groundwater',
    challenges: ['Capacity constraints during peak season', 'Chlorine storage safety'],
    esroNote: 'Spring source provides relatively good raw water quality',
  },
];

const technologies = [
  {
    name: 'Rapid Sand Filtration',
    description: 'Conventional treatment using rapid sand filters to remove suspended particles, turbidity, and some pathogens. Most common treatment technology in Kashmir.',
    plants: 28,
    efficiency: '85-92%',
    suitableFor: 'Surface water with moderate turbidity',
    limitations: 'Requires regular backwashing, does not remove dissolved contaminants',
  },
  {
    name: 'Slow Sand Filtration',
    description: 'Biological filtration process using a biological layer (schmutzdecke) on sand surface. Effective for pathogen removal without chemical disinfection.',
    plants: 8,
    efficiency: '90-99% (bacteria)',
    suitableFor: 'Spring water and low-turbidity sources',
    limitations: 'Large land area required, slow filtration rate, sensitive to turbidity',
  },
  {
    name: 'Chlorination',
    description: 'Chemical disinfection using chlorine (gas, liquid, or tablet) to kill pathogens and provide residual protection in the distribution system.',
    plants: 40,
    efficiency: '99.9% (bacteria/virus)',
    suitableFor: 'All water sources — primary or residual disinfection',
    limitations: 'DBP formation (trihalomethanes), taste/odor issues, ineffective against protozoa',
  },
  {
    name: 'UV Treatment',
    description: 'Ultraviolet radiation disinfection that inactivates bacteria, viruses, and protozoa without adding chemicals to the water.',
    plants: 5,
    efficiency: '99.99% (all pathogens)',
    suitableFor: 'Groundwater and pre-treated surface water',
    limitations: 'No residual protection, requires clear water (low turbidity), electricity dependent',
  },
  {
    name: 'Package Treatment Plants (MBR)',
    description: 'Compact membrane bioreactor systems combining biological treatment with membrane filtration. Suitable for small communities and institutional settings.',
    plants: 4,
    efficiency: '95-99%',
    suitableFor: 'Small communities, institutions, remote areas',
    limitations: 'High energy consumption, membrane fouling, requires skilled operation',
  },
];

const statusColors: Record<string, string> = {
  operational: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  partial: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  'needs-upgrade': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'non-functional': 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default function WaterTreatmentPage() {
  const [selectedDistrict, setSelectedDistrict] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const districts = Array.from(new Set(treatmentPlants.map(p => p.district)));

  const filtered = treatmentPlants.filter(p => {
    if (selectedDistrict !== 'all' && p.district !== selectedDistrict) return false;
    if (selectedStatus !== 'all' && p.status !== selectedStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.district.toLowerCase().includes(q) || p.technology.toLowerCase().includes(q);
    }
    return true;
  });

  const stats = {
    total: treatmentPlants.length,
    operational: treatmentPlants.filter(p => p.status === 'operational').length,
    partial: treatmentPlants.filter(p => p.status === 'partial').length,
    needsUpgrade: treatmentPlants.filter(p => p.status === 'needs-upgrade').length,
    nonFunctional: treatmentPlants.filter(p => p.status === 'non-functional').length,
    totalCapacity: '106 MLD',
    totalServed: '840,000',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-950/50 via-blue-950/30 to-teal-950/50" />
        <div className="relative container mx-auto px-4 md:px-6 py-12 md:py-16">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <Link href="/water-systems" className="hover:text-white transition-colors">Water Systems</Link>
            <span className="text-slate-600">/</span>
            <Link href="/water-systems/drinking-water-sources" className="hover:text-white transition-colors">Drinking Water Sources</Link>
            <span className="text-slate-600">/</span>
            <span className="text-white">Water Treatment</span>
          </nav>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Beaker className="w-7 h-7 text-white" />
              </div>
              <Badge variant="outline" className="border-cyan-400/30 text-cyan-400 text-xs">Water Treatment Intelligence</Badge>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Water Treatment Plants of Kashmir
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl mb-6 leading-relaxed">
              Comprehensive inventory of drinking water treatment infrastructure across Kashmir —
              from conventional rapid sand filtration to modern membrane bioreactor systems.
              Tracking capacity, technology, operational status, and treatment efficiency.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <Link href="/water-systems/drinking-water-sources">
                <Button variant="outline" className="border-white/20 text-white">← Drinking Water Sources</Button>
              </Link>
              <Link href="/water-systems/drinking-water-sources/water-quality-testing">
                <Button variant="outline" className="border-white/20 text-white">Water Quality Testing <ExternalLink className="w-4 h-4 ml-2" /></Button>
              </Link>
              <Link href="/water-systems/drinking-water-sources/distribution-network">
                <Button variant="outline" className="border-white/20 text-white">Distribution Network <ExternalLink className="w-4 h-4 ml-2" /></Button>
              </Link>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-cyan-300 font-medium mb-1">ESRO Archive Finding</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    The ESRO Environmental Impact Assessment Report documents that water treatment infrastructure
                    in Kashmir faces significant challenges — including raw water pollution from sewage discharge,
                    inadequate treatment capacity, aging infrastructure, and absence of standardized water quality
                    monitoring protocols. Many treatment plants operate below design capacity due to raw water
                    quality issues.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/5 bg-slate-900/50">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            <StatCard label="Total Plants" value={stats.total.toString()} color="text-blue-400" />
            <StatCard label="Operational" value={stats.operational.toString()} color="text-emerald-400" />
            <StatCard label="Partial" value={stats.partial.toString()} color="text-amber-400" />
            <StatCard label="Needs Upgrade" value={stats.needsUpgrade.toString()} color="text-orange-400" />
            <StatCard label="Total Capacity" value={stats.totalCapacity} color="text-cyan-400" />
            <StatCard label="Population Served" value={stats.totalServed} color="text-purple-400" />
            <StatCard label="Technologies" value="5" color="text-teal-400" />
          </div>
        </div>
      </section>

      {/* Treatment Technologies */}
      <section className="container mx-auto px-4 md:px-6 py-10">
        <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <Settings className="w-5 h-5 text-cyan-400" />
          Treatment Technologies
        </h2>
        <p className="text-sm text-slate-400 mb-6">Five treatment technologies deployed across Kashmir's water treatment infrastructure</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {technologies.map((tech, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Card className="glass-intense border-white/10 p-5 h-full">
                <h3 className="text-sm font-semibold text-white mb-2">{tech.name}</h3>
                <p className="text-xs text-slate-400 mb-3 leading-relaxed">{tech.description}</p>
                <div className="space-y-1.5 text-xs mb-3">
                  <div className="flex justify-between"><span className="text-slate-500">Plants Using:</span><span className="text-white font-medium">{tech.plants}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Efficiency:</span><span className="text-emerald-400 font-medium">{tech.efficiency}</span></div>
                </div>
                <div className="text-xs space-y-1">
                  <div><span className="text-slate-500">Best for: </span><span className="text-slate-300">{tech.suitableFor}</span></div>
                  <div><span className="text-slate-500">Limitations: </span><span className="text-amber-400/80">{tech.limitations}</span></div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Filters */}
      <section className="container mx-auto px-4 md:px-6 pb-6">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input type="text" placeholder="Search treatment plants..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50" />
          </div>
          <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}
            className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-500/50">
            <option value="all" className="bg-slate-800">All Districts</option>
            {districts.map(d => <option key={d} value={d} className="bg-slate-800">{d}</option>)}
          </select>
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-500/50">
            <option value="all" className="bg-slate-800">All Statuses</option>
            <option value="operational" className="bg-slate-800">Operational</option>
            <option value="partial" className="bg-slate-800">Partial</option>
            <option value="needs-upgrade" className="bg-slate-800">Needs Upgrade</option>
          </select>
          <div className="text-sm text-slate-400">{filtered.length} of {treatmentPlants.length} plants</div>
        </div>
      </section>

      {/* Plant Cards */}
      <section className="container mx-auto px-4 md:px-6 pb-10">
        <div className="space-y-4">
          {filtered.map((plant, i) => (
            <motion.div key={plant.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
              <Card className="glass-intense border-white/10 p-5 hover:border-white/15 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center flex-shrink-0">
                    <Beaker className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-sm font-semibold text-white">{plant.name}</h3>
                      <Badge className={`${statusColors[plant.status]} border text-[10px]`}>{plant.status.replace(/-/g, ' ')}</Badge>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mb-2">
                      <span className="flex items-center gap-1"><Map className="w-3 h-3" /> {plant.district}</span>
                      <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> {plant.capacity}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {plant.populationServed.toLocaleString()} people</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Since {plant.yearCommissioned}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs mb-3">
                      <div><span className="text-slate-500">Technology: </span><span className="text-slate-300">{plant.technology}</span></div>
                      <div><span className="text-slate-500">Source: </span><span className="text-slate-300">{plant.source}</span></div>
                    </div>
                    {plant.challenges.length > 0 && (
                      <div className="mb-2">
                        <span className="text-xs text-slate-500 mb-1 block">Challenges:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {plant.challenges.map((c, j) => (
                            <span key={j} className="text-[10px] bg-red-500/10 text-red-400/80 px-2 py-0.5 rounded-full border border-red-500/10">{c}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="text-[10px] text-cyan-400/50 italic border-l-2 border-cyan-500/10 pl-2">{plant.esroNote}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No treatment plants match your filters.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-500">Water Treatment Intelligence — Kashmir Environmental Intelligence Platform</div>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <Link href="/water-systems/drinking-water-sources" className="hover:text-white transition-colors">Drinking Water Sources</Link>
              <Link href="/water-systems/water-quality" className="hover:text-white transition-colors">Water Quality</Link>
              <Link href="/risk-monitoring/water-pollution" className="hover:text-white transition-colors">Water Pollution</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-white/5 border border-white/5 rounded-lg p-3">
      <span className="text-[10px] text-slate-400 uppercase tracking-wider">{label}</span>
      <div className={`text-lg font-bold ${color}`}>{value}</div>
    </div>
  );
}
