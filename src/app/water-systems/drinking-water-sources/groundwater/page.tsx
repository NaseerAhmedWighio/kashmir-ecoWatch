'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Database, Droplet, Map, AlertTriangle, TrendingDown,
  ArrowRight, BookOpen, ExternalLink, Shield, Activity,
  CheckCircle, XCircle, AlertCircle, Search, Users
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const aquiferData = {
  name: 'Karewa Aquifer System',
  type: 'Unconfined to semi-confined alluvial aquifer',
  formation: 'Pleistocene-Holocene Karewa deposits (clay, silt, sand, gravel)',
  thickness: '50-300 meters (variable by district)',
  depth: '5-50m below ground level (shallow), 50-150m (deep)',
  recharge: 'Rainfall infiltration, snowmelt, seepage from canals/lakes',
  discharge: 'Springs, baseflow to rivers, evapotranspiration, well abstraction',
  yield: '5-20 m³/hr (shallow wells), 20-100 m³/hr (deep tube wells)',
  waterLevelTrend: 'Declining in 6 of 10 districts',
};

const districtGroundwater = [
  { district: 'Srinagar', waterTableM: 8.5, trend: 'declining', tubeWells: 1200, yield: '25-60 m³/hr', quality: 'at-risk', contamination: ['Iron', 'Bacterial'], springs: 45 },
  { district: 'Anantnag', waterTableM: 12.0, trend: 'stable', tubeWells: 800, yield: '30-80 m³/hr', quality: 'safe', contamination: [], springs: 78 },
  { district: 'Baramulla', waterTableM: 15.0, trend: 'declining', tubeWells: 650, yield: '20-50 m³/hr', quality: 'at-risk', contamination: ['Iron', 'Manganese'], springs: 52 },
  { district: 'Ganderbal', waterTableM: 18.0, trend: 'declining', tubeWells: 400, yield: '15-40 m³/hr', quality: 'at-risk', contamination: ['Iron', 'Manganese', 'Turbidity'], springs: 38 },
  { district: 'Pulwama', waterTableM: 10.0, trend: 'stable', tubeWells: 700, yield: '25-55 m³/hr', quality: 'safe', contamination: ['Nitrate (low)'], springs: 42 },
  { district: 'Budgam', waterTableM: 14.0, trend: 'declining', tubeWells: 500, yield: '20-45 m³/hr', quality: 'at-risk', contamination: ['Iron', 'Bacterial'], springs: 35 },
  { district: 'Kupwara', waterTableM: 20.0, trend: 'declining', tubeWells: 300, yield: '15-35 m³/hr', quality: 'unknown', contamination: ['Unknown (no testing)'], springs: 28 },
  { district: 'Shopian', waterTableM: 11.0, trend: 'stable', tubeWells: 350, yield: '25-50 m³/hr', quality: 'safe', contamination: [], springs: 32 },
];

const qualityColors: Record<string, string> = {
  safe: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'at-risk': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  unknown: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
};

const trendColors: Record<string, string> = {
  declining: 'text-red-400',
  stable: 'text-emerald-400',
  rising: 'text-blue-400',
};

export default function GroundwaterPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = districtGroundwater.filter(d => {
    if (!searchQuery) return true;
    return d.district.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const totals = {
    tubeWells: districtGroundwater.reduce((s, d) => s + d.tubeWells, 0),
    springs: districtGroundwater.reduce((s, d) => s + d.springs, 0),
    declining: districtGroundwater.filter(d => d.trend === 'declining').length,
    stable: districtGroundwater.filter(d => d.trend === 'stable').length,
    safe: districtGroundwater.filter(d => d.quality === 'safe').length,
    atRisk: districtGroundwater.filter(d => d.quality === 'at-risk').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-950/50 via-orange-950/30 to-yellow-950/50" />
        <div className="relative container mx-auto px-4 md:px-6 py-12 md:py-16">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <Link href="/water-systems" className="hover:text-white transition-colors">Water Systems</Link>
            <span className="text-slate-600">/</span>
            <Link href="/water-systems/drinking-water-sources" className="hover:text-white transition-colors">Drinking Water Sources</Link>
            <span className="text-slate-600">/</span>
            <span className="text-white">Groundwater</span>
          </nav>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Database className="w-7 h-7 text-white" />
              </div>
              <Badge variant="outline" className="border-amber-400/30 text-amber-400 text-xs">Groundwater Intelligence</Badge>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Groundwater Intelligence — Karewa Aquifer System
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl mb-6 leading-relaxed">
              Comprehensive monitoring and mapping of Kashmir's groundwater resources — the Karewa
              aquifer system that sustains millions. The ESRO EIA Report warns that
              &ldquo;water resources like springs, wells, baulies are drying up&rdquo; due to
              reduced recharge and climate change impacts.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <Link href="/water-systems/drinking-water-sources">
                <Button variant="outline" className="border-white/20 text-white">← Drinking Water Sources</Button>
              </Link>
              <Link href="/water-systems/drinking-water-sources/rainwater-harvesting">
                <Button variant="outline" className="border-white/20 text-white">Rainwater Harvesting <ExternalLink className="w-4 h-4 ml-2" /></Button>
              </Link>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-amber-300 font-medium mb-1">ESRO Critical Finding</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    &ldquo;As the major share of precious rainwater is lost as run off without recharging
                    groundwater, the water resources like springs, wells, baulies are drying up. Due to
                    climate change, the glaciers are receding at a very fast rate and snow-fed areas are
                    facing increasing aridity.&rdquo; — ESRO EIA Report for Jammu & Kashmir
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
            <StatCard label="Total Tube Wells" value={totals.tubeWells.toLocaleString()} color="text-amber-400" />
            <StatCard label="Monitored Springs" value={totals.springs.toString()} color="text-blue-400" />
            <StatCard label="Declining WT" value={totals.declining.toString()} color="text-red-400" />
            <StatCard label=" Stable WT" value={totals.stable.toString()} color="text-emerald-400" />
            <StatCard label="Safe Quality" value={totals.safe.toString()} color="text-emerald-400" />
            <StatCard label="At Risk" value={totals.atRisk.toString()} color="text-orange-400" />
            <StatCard label="Aquifer Type" value="Karewa" color="text-purple-400" />
          </div>
        </div>
      </section>

      {/* Aquifer Profile */}
      <section className="container mx-auto px-4 md:px-6 py-10">
        <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <Database className="w-5 h-5 text-amber-400" />
          Karewa Aquifer Profile
        </h2>
        <p className="text-sm text-slate-400 mb-6">The geological foundation of Kashmir's groundwater resources</p>

        <Card className="glass-intense border-white/10 p-5 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: 'Aquifer Name', value: aquiferData.name },
              { label: 'Type', value: aquiferData.type },
              { label: 'Formation', value: aquiferData.formation },
              { label: 'Thickness', value: aquiferData.thickness },
              { label: 'Depth Range', value: aquiferData.depth },
              { label: 'Recharge Sources', value: aquiferData.recharge },
              { label: 'Discharge Mechanisms', value: aquiferData.discharge },
              { label: 'Well Yield', value: aquiferData.yield },
              { label: 'Water Level Trend', value: aquiferData.waterLevelTrend, color: 'text-red-400' },
            ].map((item, i) => (
              <div key={i}>
                <span className="text-xs text-slate-500 block mb-0.5">{item.label}</span>
                <span className={`text-sm text-white ${item.color || ''}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Contamination Risks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="glass-intense border-white/10 p-5">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              Contamination Risks
            </h3>
            <div className="space-y-3">
              {[
                { contaminant: 'Iron (Fe)', severity: 'High', description: 'Widespread in Karewa aquifer, causes aesthetic and taste issues. Affects 40% of tube wells.', source: 'Natural geological + anthropogenic' },
                { contaminant: 'Manganese (Mn)', severity: 'Medium', description: 'Co-occurs with iron, neurological risk at high concentrations. Found in Ganderbal, Baramulla.', source: 'Natural geological' },
                { contaminant: 'Bacterial Contamination', severity: 'Critical', description: 'Coliform and E.coli in shallow wells due to sewage infiltration. Srinagar, Budgam most affected.', source: 'Sewage infiltration, poor well construction' },
                { contaminant: 'Nitrates (NO₃)', severity: 'Medium', description: 'Agricultural fertilizer runoff and septic tank seepage. Elevated in Pulwama orchard belt.', source: 'Agricultural + domestic sewage' },
                { contaminant: 'Arsenic (As)', severity: 'Low (risk)', description: 'Not yet detected at concerning levels but monitoring recommended for alluvial aquifers.', source: 'Potential — requires monitoring' },
              ].map((c, i) => (
                <div key={i} className="border-l-2 border-red-500/20 pl-3">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium text-white">{c.contaminant}</span>
                    <Badge className={`text-[10px] ${
                      c.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                      c.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                      c.severity === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>{c.severity}</Badge>
                  </div>
                  <p className="text-xs text-slate-400">{c.description}</p>
                  <p className="text-[10px] text-slate-500 italic">Source: {c.source}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="glass-intense border-white/10 p-5">
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-orange-400" />
              Water Table Decline Analysis
            </h3>
            <div className="space-y-3 text-sm">
              <p className="text-slate-300">
                <span className="text-slate-500">Districts with declining trend:</span>{' '}
                <span className="text-red-400 font-bold">{totals.declining} of {districtGroundwater.length}</span>
              </p>
              <div className="space-y-2">
                {districtGroundwater.filter(d => d.trend === 'declining').map(d => (
                  <div key={d.district} className="flex items-center justify-between">
                    <span className="text-slate-300">{d.district}</span>
                    <span className="text-amber-400">{d.waterTableM}m bgl</span>
                  </div>
                ))}
              </div>
              <div className="bg-orange-500/10 border border-orange-500/20 rounded p-3 text-xs text-slate-300">
                <strong className="text-orange-400">Cause: </strong>
                Reduced rainfall recharge, increased abstraction, loss of recharge areas to urbanization,
                and declining snowfall contribution to aquifer recharge.
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* District Table */}
      <section className="container mx-auto px-4 md:px-6 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input type="text" placeholder="Search districts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-xs text-slate-400 uppercase tracking-wider">District</th>
                <th className="text-right py-3 px-4 text-xs text-slate-400 uppercase tracking-wider">Water Table (m)</th>
                <th className="text-center py-3 px-4 text-xs text-slate-400 uppercase tracking-wider">Trend</th>
                <th className="text-right py-3 px-4 text-xs text-slate-400 uppercase tracking-wider">Tube Wells</th>
                <th className="text-right py-3 px-4 text-xs text-slate-400 uppercase tracking-wider">Yield</th>
                <th className="text-center py-3 px-4 text-xs text-slate-400 uppercase tracking-wider">Quality</th>
                <th className="text-left py-3 px-4 text-xs text-slate-400 uppercase tracking-wider">Contamination</th>
                <th className="text-right py-3 px-4 text-xs text-slate-400 uppercase tracking-wider">Springs</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d, i) => (
                <motion.tr key={d.district} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 text-white font-medium">{d.district}</td>
                  <td className="py-3 px-4 text-right text-slate-300">{d.waterTableM}</td>
                  <td className={`py-3 px-4 text-center font-medium ${trendColors[d.trend]}`}>{d.trend}</td>
                  <td className="py-3 px-4 text-right text-slate-300">{d.tubeWells}</td>
                  <td className="py-3 px-4 text-right text-slate-300">{d.yield}</td>
                  <td className="py-3 px-4 text-center">
                    <Badge className={`${qualityColors[d.quality]} border text-[10px]`}>{d.quality}</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {d.contamination.map((c, j) => (
                        <span key={j} className="text-[10px] bg-red-500/10 text-red-400 px-1.5 py-0.5 rounded">{c}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right text-blue-400">{d.springs}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-500">Groundwater Intelligence — Kashmir Environmental Intelligence Platform</div>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <Link href="/water-systems/drinking-water-sources" className="hover:text-white transition-colors">Drinking Water Sources</Link>
              <Link href="/water-systems/drinking-water-sources/rainwater-harvesting" className="hover:text-white transition-colors">Rainwater Harvesting</Link>
              <Link href="/water-systems/springs" className="hover:text-white transition-colors">Springs</Link>
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
