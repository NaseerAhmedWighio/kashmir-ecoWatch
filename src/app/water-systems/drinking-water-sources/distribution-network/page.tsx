'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Droplets, Droplet, Map, AlertTriangle, Database,
  CheckCircle, XCircle, Clock, ArrowRight, BookOpen,
  ExternalLink, Wrench, Activity, Users, TrendingDown,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const districtNetworks = [
  {
    district: 'Srinagar',
    totalPipelineKm: 680,
    agingPipelineKm: 420,
    esrs: 55,
    totalCapacityMld: 28,
    leakageRate: '42%',
    coverage: '78%',
    supplyHours: '4-6 hrs/day',
    status: 'partial',
    keyIssues: ['Aging GI/CI pipes', 'High NRW losses', 'Intermittent supply', 'Sewage contamination in distribution'],
  },
  {
    district: 'Anantnag',
    totalPipelineKm: 320,
    agingPipelineKm: 180,
    esrs: 28,
    totalCapacityMld: 15,
    leakageRate: '35%',
    coverage: '65%',
    supplyHours: '3-5 hrs/day',
    status: 'partial',
    keyIssues: ['Spring source variability', 'Pipeline corrosion', 'Uneven distribution'],
  },
  {
    district: 'Baramulla',
    totalPipelineKm: 380,
    agingPipelineKm: 210,
    esrs: 32,
    totalCapacityMld: 18,
    leakageRate: '38%',
    coverage: '60%',
    supplyHours: '3-4 hrs/day',
    status: 'partial',
    keyIssues: ['Long transmission distances', 'Terrain challenges', 'Aging infrastructure'],
  },
  {
    district: 'Ganderbal',
    totalPipelineKm: 220,
    agingPipelineKm: 130,
    esrs: 18,
    totalCapacityMld: 10,
    leakageRate: '40%',
    coverage: '45%',
    supplyHours: '2-4 hrs/day',
    status: 'partial',
    keyIssues: ['Limited coverage in rural areas', 'Iron contamination in pipes', 'Power supply issues'],
  },
  {
    district: 'Pulwama',
    totalPipelineKm: 260,
    agingPipelineKm: 140,
    esrs: 22,
    totalCapacityMld: 12,
    leakageRate: '36%',
    coverage: '55%',
    supplyHours: '3-5 hrs/day',
    status: 'operational',
    keyIssues: ['Pipeline leakage', 'Seasonal water quality issues'],
  },
  {
    district: 'Budgam',
    totalPipelineKm: 200,
    agingPipelineKm: 120,
    esrs: 16,
    totalCapacityMld: 8,
    leakageRate: '44%',
    coverage: '50%',
    supplyHours: '2-3 hrs/day',
    status: 'partial',
    keyIssues: ['Highest leakage rate', 'Spring decline affecting supply', 'Aging distribution'],
  },
  {
    district: 'Kupwara',
    totalPipelineKm: 180,
    agingPipelineKm: 110,
    esrs: 14,
    totalCapacityMld: 7,
    leakageRate: '41%',
    coverage: '40%',
    supplyHours: '2-3 hrs/day',
    status: 'partial',
    keyIssues: ['Lowest coverage', 'Rural access gaps', 'Seasonal source drying'],
  },
  {
    district: 'Shopian',
    totalPipelineKm: 140,
    agingPipelineKm: 80,
    esrs: 10,
    totalCapacityMld: 5,
    leakageRate: '33%',
    coverage: '48%',
    supplyHours: '3-4 hrs/day',
    status: 'operational',
    keyIssues: ['Limited capacity', 'Agricultural runoff contamination'],
  },
];

const statusColors: Record<string, string> = {
  operational: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  partial: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
};

const nrwBreakdown = [
  { category: 'Physical Losses (leakages)', percentage: 22, color: 'bg-red-500' },
  { category: 'Commercial Losses (theft, metering)', percentage: 12, color: 'bg-orange-500' },
  { category: 'Unauthorized Consumption', percentage: 6, color: 'bg-amber-500' },
  { category: 'Accounted For (Revenue Water)', percentage: 60, color: 'bg-emerald-500' },
];

export default function DistributionNetworkPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = districtNetworks.filter(d => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return d.district.toLowerCase().includes(q);
  });

  const totals = {
    pipeline: districtNetworks.reduce((s, d) => s + d.totalPipelineKm, 0),
    aging: districtNetworks.reduce((s, d) => s + d.agingPipelineKm, 0),
    esrs: districtNetworks.reduce((s, d) => s + d.esrs, 0),
    capacity: districtNetworks.reduce((s, d) => s + d.totalCapacityMld, 0),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-950/50 via-purple-950/30 to-blue-950/50" />
        <div className="relative container mx-auto px-4 md:px-6 py-12 md:py-16">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <Link href="/water-systems" className="hover:text-white transition-colors">Water Systems</Link>
            <span className="text-slate-600">/</span>
            <Link href="/water-systems/drinking-water-sources" className="hover:text-white transition-colors">Drinking Water Sources</Link>
            <span className="text-slate-600">/</span>
            <span className="text-white">Distribution Network</span>
          </nav>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Droplets className="w-7 h-7 text-white" />
              </div>
              <Badge variant="outline" className="border-indigo-400/30 text-indigo-400 text-xs">Distribution Intelligence</Badge>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Distribution Network Analysis
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl mb-6 leading-relaxed">
              Comprehensive mapping of Kashmir's drinking water distribution infrastructure —
              pipeline networks, elevated storage reservoirs, leakage analysis, and non-revenue
              water assessment across all districts.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <Link href="/water-systems/drinking-water-sources">
                <Button variant="outline" className="border-white/20 text-white">← Drinking Water Sources</Button>
              </Link>
              <Link href="/water-systems/drinking-water-sources/water-treatment">
                <Button variant="outline" className="border-white/20 text-white">Water Treatment <ExternalLink className="w-4 h-4 ml-2" /></Button>
              </Link>
            </div>

            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-indigo-300 font-medium mb-1">Infrastructure Challenge</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    The distribution network suffers from aging GI/CI pipelines, with an estimated
                    {(totals.aging / totals.pipeline * 100).toFixed(0)}% of pipelines classified as aging. Non-revenue water losses
                    average 35-45%, significantly above the WHO benchmark of 15%. The ESRO EIA Report
                    notes that "there is no proper water or land use policy of the State," compounding
                    distribution infrastructure challenges.
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <StatCard label="Total Pipeline" value={`${totals.pipeline.toLocaleString()} km`} color="text-blue-400" />
            <StatCard label="Aging Pipeline" value={`${totals.aging.toLocaleString()} km`} color="text-red-400" />
            <StatCard label="Total ESRs" value={totals.esrs.toString()} color="text-purple-400" />
            <StatCard label="Total Capacity" value={`${totals.capacity} MLD`} color="text-cyan-400" />
            <StatCard label="Avg Leakage" value="35-45%" color="text-orange-400" />
            <StatCard label="Districts Covered" value={districtNetworks.length.toString()} color="text-emerald-400" />
          </div>
        </div>
      </section>

      {/* NRW Analysis */}
      <section className="container mx-auto px-4 md:px-6 py-10">
        <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-red-400" />
          Non-Revenue Water Analysis
        </h2>
        <p className="text-sm text-slate-400 mb-6">Kashmir's average NRW rate of 35-45% represents a significant loss of treated water</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="glass-intense border-white/10 p-5">
            <h3 className="text-sm font-semibold text-white mb-4">NRW Breakdown</h3>
            <div className="space-y-3">
              {nrwBreakdown.map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">{item.category}</span>
                    <span className="text-white font-medium">{item.percentage}%</span>
                  </div>
                  <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full transition-all`} style={{ width: `${item.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="glass-intense border-white/10 p-5">
            <h3 className="text-sm font-semibold text-white mb-4">Impact Assessment</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Water Loss Volume</p>
                  <p className="text-slate-400 text-xs">Estimated {Math.round(totals.capacity * 0.4)} MLD lost to NRW daily — enough to serve ~500,000 people</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Revenue Impact</p>
                  <p className="text-slate-400 text-xs">Annual revenue loss estimated at ₹15-25 crores across all districts</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Energy Waste</p>
                  <p className="text-slate-400 text-xs">Pumping and treatment energy wasted on lost water — estimated 30% of total energy cost</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* District Network Table */}
      <section className="container mx-auto px-4 md:px-6 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input type="text" placeholder="Search districts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-xs text-slate-400 uppercase tracking-wider">District</th>
                <th className="text-right py-3 px-4 text-xs text-slate-400 uppercase tracking-wider">Pipeline (km)</th>
                <th className="text-right py-3 px-4 text-xs text-slate-400 uppercase tracking-wider">Aging (km)</th>
                <th className="text-right py-3 px-4 text-xs text-slate-400 uppercase tracking-wider">ESRs</th>
                <th className="text-right py-3 px-4 text-xs text-slate-400 uppercase tracking-wider">Capacity (MLD)</th>
                <th className="text-right py-3 px-4 text-xs text-slate-400 uppercase tracking-wider">Leakage</th>
                <th className="text-right py-3 px-4 text-xs text-slate-400 uppercase tracking-wider">Coverage</th>
                <th className="text-right py-3 px-4 text-xs text-slate-400 uppercase tracking-wider">Supply Hrs</th>
                <th className="text-center py-3 px-4 text-xs text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d, i) => (
                <motion.tr key={d.district} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 text-white font-medium">{d.district}</td>
                  <td className="py-3 px-4 text-right text-slate-300">{d.totalPipelineKm}</td>
                  <td className="py-3 px-4 text-right text-red-400">{d.agingPipelineKm}</td>
                  <td className="py-3 px-4 text-right text-slate-300">{d.esrs}</td>
                  <td className="py-3 px-4 text-right text-slate-300">{d.totalCapacityMld}</td>
                  <td className="py-3 px-4 text-right text-orange-400">{d.leakageRate}</td>
                  <td className="py-3 px-4 text-right text-slate-300">{d.coverage}</td>
                  <td className="py-3 px-4 text-right text-slate-300">{d.supplyHours}</td>
                  <td className="py-3 px-4 text-center">
                    <Badge className={`${statusColors[d.status]} border text-[10px]`}>{d.status}</Badge>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Key Issues */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((d, i) => (
            <Card key={d.district} className="glass-intense border-white/10 p-4">
              <h4 className="text-sm font-semibold text-white mb-2">{d.district} — Key Issues</h4>
              <ul className="space-y-1">
                {d.keyIssues.map((issue, j) => (
                  <li key={j} className="text-xs text-slate-400 flex items-start gap-2">
                    <span className="w-1 h-1 bg-red-400 rounded-full mt-1.5 flex-shrink-0" />
                    {issue}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-500">Distribution Network Intelligence — Kashmir Environmental Intelligence Platform</div>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <Link href="/water-systems/drinking-water-sources" className="hover:text-white transition-colors">Drinking Water Sources</Link>
              <Link href="/water-systems/drinking-water-sources/water-treatment" className="hover:text-white transition-colors">Water Treatment</Link>
              <Link href="/water-systems" className="hover:text-white transition-colors">All Water Systems</Link>
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
