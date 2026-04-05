'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Droplets, Droplet, Map, Users, AlertTriangle,
  ArrowRight, BookOpen, ExternalLink, Shield, Activity,
  CheckCircle, XCircle, Clock, TrendingDown, Search,
  Home, Building
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const districtSupply = [
  {
    district: 'Srinagar',
    urbanCoverage: '78%',
    ruralCoverage: '35%',
    totalConnections: 185000,
    functionalConnections: 142000,
    supplyFrequency: 'Daily (intermittent)',
    avgSupplyHours: '4-6 hrs/day',
    perCapitaLpcd: 70,
    standardLpcd: 135,
    waterLoss: '42%',
    source: 'Jehlum River + Springs + Groundwater',
    status: 'partial',
    keyIssues: ['Intermittent supply', 'High NRW', 'Aging connections', 'Sewage contamination'],
  },
  {
    district: 'Anantnag',
    urbanCoverage: '72%',
    ruralCoverage: '28%',
    totalConnections: 95000,
    functionalConnections: 76000,
    supplyFrequency: 'Daily (intermittent)',
    avgSupplyHours: '3-5 hrs/day',
    perCapitaLpcd: 65,
    standardLpcd: 135,
    waterLoss: '35%',
    source: 'Kokernag Spring + Verinag Spring + Groundwater',
    status: 'partial',
    keyIssues: ['Spring variability', 'Rural access gap', 'Pipeline corrosion'],
  },
  {
    district: 'Baramulla',
    urbanCoverage: '68%',
    ruralCoverage: '22%',
    totalConnections: 82000,
    functionalConnections: 62000,
    supplyFrequency: 'Alternate days',
    avgSupplyHours: '3-4 hrs/day',
    perCapitaLpcd: 55,
    standardLpcd: 135,
    waterLoss: '38%',
    source: 'Jehlum River + Groundwater',
    status: 'partial',
    keyIssues: ['Long transmission distances', 'Rural coverage deficit', 'Terrain challenges'],
  },
  {
    district: 'Ganderbal',
    urbanCoverage: '55%',
    ruralCoverage: '18%',
    totalConnections: 45000,
    functionalConnections: 32000,
    supplyFrequency: 'Alternate days',
    avgSupplyHours: '2-4 hrs/day',
    perCapitaLpcd: 45,
    standardLpcd: 135,
    waterLoss: '40%',
    source: 'Groundwater (tube wells) + Springs',
    status: 'partial',
    keyIssues: ['Lowest per capita supply', 'Rural access gaps', 'Iron contamination'],
  },
  {
    district: 'Pulwama',
    urbanCoverage: '65%',
    ruralCoverage: '25%',
    totalConnections: 68000,
    functionalConnections: 55000,
    supplyFrequency: 'Daily (intermittent)',
    avgSupplyHours: '3-5 hrs/day',
    perCapitaLpcd: 60,
    standardLpcd: 135,
    waterLoss: '36%',
    source: 'Mixed (surface + groundwater)',
    status: 'operational',
    keyIssues: ['Pipeline leakage', 'Seasonal quality issues'],
  },
  {
    district: 'Budgam',
    urbanCoverage: '58%',
    ruralCoverage: '20%',
    totalConnections: 42000,
    functionalConnections: 30000,
    supplyFrequency: 'Alternate days',
    avgSupplyHours: '2-3 hrs/day',
    perCapitaLpcd: 40,
    standardLpcd: 135,
    waterLoss: '44%',
    source: 'Springs + Groundwater',
    status: 'partial',
    keyIssues: ['Highest water loss', 'Spring decline', 'Aging infrastructure'],
  },
  {
    district: 'Kupwara',
    urbanCoverage: '48%',
    ruralCoverage: '15%',
    totalConnections: 30000,
    functionalConnections: 20000,
    supplyFrequency: 'Alternate days',
    avgSupplyHours: '2-3 hrs/day',
    perCapitaLpcd: 35,
    standardLpcd: 135,
    waterLoss: '41%',
    source: 'Groundwater (tube wells)',
    status: 'partial',
    keyIssues: ['Lowest coverage', 'Rural deficit', 'Seasonal source drying'],
  },
  {
    district: 'Shopian',
    urbanCoverage: '55%',
    ruralCoverage: '22%',
    totalConnections: 28000,
    functionalConnections: 23000,
    supplyFrequency: 'Daily (intermittent)',
    avgSupplyHours: '3-4 hrs/day',
    perCapitaLpcd: 55,
    standardLpcd: 135,
    waterLoss: '33%',
    source: 'Springs + Groundwater',
    status: 'operational',
    keyIssues: ['Limited capacity', 'Agricultural runoff'],
  },
];

const statusColors: Record<string, string> = {
  operational: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  partial: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
};

export default function PipedWaterSupplyPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = districtSupply.filter(d => {
    if (!searchQuery) return true;
    return d.district.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const totals = {
    connections: districtSupply.reduce((s, d) => s + d.totalConnections, 0),
    functional: districtSupply.reduce((s, d) => s + d.functionalConnections, 0),
    avgLpcd: Math.round(districtSupply.reduce((s, d) => s + d.perCapitaLpcd, 0) / districtSupply.length),
    avgLoss: Math.round(districtSupply.reduce((s, d) => s + parseInt(d.waterLoss), 0) / districtSupply.length),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-950/50 via-emerald-950/30 to-teal-950/50" />
        <div className="relative container mx-auto px-4 md:px-6 py-12 md:py-16">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <Link href="/water-systems" className="hover:text-white transition-colors">Water Systems</Link>
            <span className="text-slate-600">/</span>
            <Link href="/water-systems/drinking-water-sources" className="hover:text-white transition-colors">Drinking Water Sources</Link>
            <span className="text-slate-600">/</span>
            <span className="text-white">Piped Water Supply</span>
          </nav>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <Droplets className="w-7 h-7 text-white" />
              </div>
              <Badge variant="outline" className="border-green-400/30 text-green-400 text-xs">Piped Supply Intelligence</Badge>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Piped Water Supply — PHED Network Coverage
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl mb-6 leading-relaxed">
              Comprehensive assessment of Kashmir's piped drinking water supply network managed
              by the Public Health Engineering Department (PHED). Tracking coverage, supply
              reliability, service levels, and infrastructure gaps across all districts.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <Link href="/water-systems/drinking-water-sources">
                <Button variant="outline" className="border-white/20 text-white">← Drinking Water Sources</Button>
              </Link>
              <Link href="/water-systems/drinking-water-sources/distribution-network">
                <Button variant="outline" className="border-white/20 text-white">Distribution Network <ExternalLink className="w-4 h-4 ml-2" /></Button>
              </Link>
            </div>

            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-green-300 font-medium mb-1">Service Level Gap</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    The Bureau of Indian Standards (BIS) recommends 135 liters per capita per day (lpcd)
                    for urban water supply. Kashmir's average of {totals.avgLpcd} lpcd represents only{' '}
                    {Math.round(totals.avgLpcd / 135 * 100)}% of the standard. The ESRO EIA Report notes
                    &ldquo;there is no proper water or land use policy of the State,&rdquo; contributing
                    to this persistent service gap.
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
            <StatCard label="Total Connections" value={totals.connections.toLocaleString()} color="text-green-400" />
            <StatCard label="Functional" value={totals.functional.toLocaleString()} color="text-emerald-400" />
            <StatCard label="Avg Supply (lpcd)" value={totals.avgLpcd.toString()} color="text-amber-400" />
            <StatCard label="Standard (lpcd)" value="135" color="text-blue-400" />
            <StatCard label="Avg Water Loss" value={`${totals.avgLoss}%`} color="text-red-400" />
            <StatCard label="Districts" value={districtSupply.length.toString()} color="text-purple-400" />
          </div>
        </div>
      </section>

      {/* Coverage Analysis */}
      <section className="container mx-auto px-4 md:px-6 py-10">
        <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <Users className="w-5 h-5 text-green-400" />
          Coverage Analysis — Urban vs Rural
        </h2>
        <p className="text-sm text-slate-400 mb-6">Significant urban-rural divide in piped water access persists across all districts</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {districtSupply.map((d, i) => (
            <motion.div key={d.district} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Card className="glass-intense border-white/10 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-white">{d.district}</h3>
                  <Badge className={`${statusColors[d.status]} border text-[10px]`}>{d.status}</Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-400 flex items-center gap-1"><Building className="w-3 h-3" /> Urban</span>
                      <span className="text-green-400 font-medium">{d.urbanCoverage}</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: d.urbanCoverage }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-400 flex items-center gap-1"><Home className="w-3 h-3" /> Rural</span>
                      <span className="text-amber-400 font-medium">{d.ruralCoverage}</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full" style={{ width: d.ruralCoverage }} />
                    </div>
                  </div>
                </div>

                <div className="mt-3 space-y-1 text-xs">
                  <div className="flex justify-between"><span className="text-slate-500">Supply:</span><span className="text-slate-300">{d.avgSupplyHours}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Per Capita:</span><span className="text-amber-400">{d.perCapitaLpcd} lpcd</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Water Loss:</span><span className="text-red-400">{d.waterLoss}</span></div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* District Table */}
      <section className="container mx-auto px-4 md:px-6 pb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input type="text" placeholder="Search districts..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-green-500/50" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-xs text-slate-400 uppercase tracking-wider">District</th>
                <th className="text-right py-3 px-4 text-xs text-slate-400 uppercase tracking-wider">Connections</th>
                <th className="text-right py-3 px-4 text-xs text-slate-400 uppercase tracking-wider">Functional</th>
                <th className="text-right py-3 px-4 text-xs text-slate-400 uppercase tracking-wider">Supply Hrs</th>
                <th className="text-right py-3 px-4 text-xs text-slate-400 uppercase tracking-wider">Per Capita</th>
                <th className="text-right py-3 px-4 text-xs text-slate-400 uppercase tracking-wider">Water Loss</th>
                <th className="text-left py-3 px-4 text-xs text-slate-400 uppercase tracking-wider">Source</th>
                <th className="text-center py-3 px-4 text-xs text-slate-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d, i) => (
                <motion.tr key={d.district} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 text-white font-medium">{d.district}</td>
                  <td className="py-3 px-4 text-right text-slate-300">{d.totalConnections.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-emerald-400">{d.functionalConnections.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-slate-300">{d.avgSupplyHours}</td>
                  <td className="py-3 px-4 text-right text-amber-400">{d.perCapitaLpcd} lpcd</td>
                  <td className="py-3 px-4 text-right text-red-400">{d.waterLoss}</td>
                  <td className="py-3 px-4 text-slate-300 text-xs">{d.source}</td>
                  <td className="py-3 px-4 text-center">
                    <Badge className={`${statusColors[d.status]} border text-[10px]`}>{d.status}</Badge>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Key Issues */}
        <div className="mt-8">
          <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            Infrastructure Gaps & Upgrade Plans
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map((d) => (
              <Card key={d.district} className="glass-intense border-white/10 p-4">
                <h4 className="text-sm font-semibold text-white mb-2">{d.district} — Key Issues</h4>
                <ul className="space-y-1.5">
                  {d.keyIssues.map((issue, j) => (
                    <li key={j} className="text-xs text-slate-400 flex items-start gap-2">
                      <span className="w-1 h-1 bg-amber-400 rounded-full mt-1.5 flex-shrink-0" />
                      {issue}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Policy Recommendations */}
      <section className="border-t border-white/5 bg-slate-900/30">
        <div className="container mx-auto px-4 md:px-6 py-10">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-400" />
            Policy Recommendations
          </h2>
          <div className="space-y-4">
            {[
              { priority: 'Critical', action: 'Achieve 135 lpcd Standard', description: 'Upgrade supply infrastructure to meet BIS standard of 135 lpcd. Current average of {avg} lpcd is only {pct}% of standard. Requires source augmentation, treatment capacity expansion, and NRW reduction.', timeline: '3-5 years' },
              { priority: 'Critical', action: 'Universal Rural Coverage', description: 'Extend piped water supply to rural areas where coverage ranges from 15-35%. Priority districts: Kupwara, Ganderbal, Baramulla.', timeline: '5-10 years' },
              { priority: 'High', action: 'NRW Reduction Program', description: 'Implement active leakage control and pipe replacement program to reduce NRW from {avg}% average to below 20% within 5 years.', timeline: '2-5 years' },
              { priority: 'High', action: '24x7 Continuous Supply', description: 'Transition from intermittent (2-6 hrs/day) to continuous supply through system pressurization, metering, and demand management.', timeline: '5-8 years' },
              { priority: 'Medium', action: 'Smart Metering & Billing', description: 'Deploy smart water meters for all connections to improve billing efficiency, reduce commercial losses, and enable demand-based supply.', timeline: '3-5 years' },
            ].map((rec, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      rec.priority === 'Critical' ? 'bg-red-500/20' :
                      rec.priority === 'High' ? 'bg-orange-500/20' : 'bg-amber-500/20'
                    }`}>
                      <span className={`text-sm font-bold ${
                        rec.priority === 'Critical' ? 'text-red-400' :
                        rec.priority === 'High' ? 'text-orange-400' : 'text-amber-400'
                      }`}>{i + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-white">{rec.action}</h3>
                        <Badge className={`${
                          rec.priority === 'Critical' ? 'bg-red-500/20 text-red-400 border-red-500/20' :
                          rec.priority === 'High' ? 'bg-orange-500/20 text-orange-400 border-orange-500/20' :
                          'bg-amber-500/20 text-amber-400 border-amber-500/20'
                        } border text-[10px]`}>{rec.priority}</Badge>
                        <Badge variant="outline" className="border-slate-600 text-slate-400 text-[10px]">{rec.timeline}</Badge>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {rec.description.replace('{avg}', totals.avgLpcd.toString()).replace('{pct}', Math.round(totals.avgLpcd / 135 * 100).toString())}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-500">Piped Water Supply — Kashmir Environmental Intelligence Platform</div>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <Link href="/water-systems/drinking-water-sources" className="hover:text-white transition-colors">Drinking Water Sources</Link>
              <Link href="/water-systems/drinking-water-sources/distribution-network" className="hover:text-white transition-colors">Distribution Network</Link>
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
