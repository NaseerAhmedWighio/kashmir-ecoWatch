'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CloudRain, Droplet, Database, Map, ArrowRight,
  BookOpen, ExternalLink, Cloud, CloudFog, TrendingUp,
  Shield, AlertTriangle, CheckCircle, Users, Activity
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const rainfallData = [
  { station: 'Srinagar', annualMm: 655, wettestMonth: 'March', driestMonth: 'October', snowDays: 12 },
  { station: 'Gulmarg', annualMm: 1450, wettestMonth: 'February', driestMonth: 'September', snowDays: 60 },
  { station: 'Pahalgam', annualMm: 980, wettestMonth: 'March', driestMonth: 'October', snowDays: 25 },
  { station: 'Qazigund', annualMm: 1100, wettestMonth: 'March', driestMonth: 'November', snowDays: 18 },
  { station: 'Kokernag', annualMm: 920, wettestMonth: 'March', driestMonth: 'October', snowDays: 15 },
  { station: ' Kupwara', annualMm: 850, wettestMonth: 'March', driestMonth: 'October', snowDays: 14 },
];

const harvestingTechniques = [
  {
    name: 'Rooftop Rainwater Harvesting',
    description: 'Collection of rainwater from building rooftops through gutters and downpipes, directed to storage tanks or recharge structures.',
    potential: 'High in urban areas (Srinagar, Anantnag, Baramulla)',
    cost: '₹15,000-50,000 per household',
    yield: '100-500 liters/day per 100m² rooftop',
    implementation: 'Individual buildings, institutions, commercial complexes',
  },
  {
    name: 'Recharge Pits',
    description: 'Excavated pits filled with filter media (boulders, gravel, sand) to facilitate percolation of rainwater into shallow aquifers.',
    potential: 'Medium — suitable for Karewa areas',
    cost: '₹10,000-25,000 per pit',
    yield: 'Recharges 50-100 m³ per monsoon season',
    implementation: 'Community spaces, parks, institutional campuses',
  },
  {
    name: 'Recharge Trenches',
    description: 'Linear excavated trenches along slopes and contour lines to capture surface runoff and promote groundwater recharge.',
    potential: 'High in hilly areas (Pir Panjal foothills)',
    cost: '₹20,000-60,000 per trench',
    yield: 'Variable — depends on catchment area',
    implementation: 'Hill slopes, road margins, agricultural boundaries',
  },
  {
    name: 'Percolation Tanks',
    description: 'Small earthen or masonry dams constructed across streams and nalas to impound rainwater and enhance percolation into underlying aquifers.',
    potential: 'High in watershed areas',
    cost: '₹2-10 lakhs per tank',
    yield: 'Recharges 500-2000 m³ per season',
    implementation: 'Watershed management, rural development programs',
  },
  {
    name: 'Contour Bunding & Terracing',
    description: 'Construction of bunds along contour lines on slopes to reduce runoff velocity, increase infiltration, and prevent soil erosion.',
    potential: 'Very high in agricultural areas',
    cost: '₹5,000-15,000 per hectare',
    yield: 'Reduces runoff by 30-50%, increases infiltration',
    implementation: 'Agricultural lands, orchard areas, watershed projects',
  },
  {
    name: 'Check Dams',
    description: 'Small barriers constructed across seasonal streams to slow water flow, promote sediment deposition, and enhance groundwater recharge.',
    potential: 'High in seasonal stream corridors',
    cost: '₹1-5 lakhs per dam',
    yield: 'Raises water table by 1-3m in vicinity',
    implementation: 'Seasonal streams, rural watershed programs',
  },
];

const districtPotential = [
  { district: 'Srinagar', annualRainfallMm: 655, harvestingPotential: 'Very High', suitableTechniques: ['Rooftop RWH', 'Recharge Pits', 'Percolation Tanks'], urbanCoverage: '85%' },
  { district: 'Anantnag', annualRainfallMm: 920, harvestingPotential: 'Very High', suitableTechniques: ['Rooftop RWH', 'Check Dams', 'Recharge Trenches'], urbanCoverage: '70%' },
  { district: 'Baramulla', annualRainfallMm: 750, harvestingPotential: 'High', suitableTechniques: ['Rooftop RWH', 'Contour Bunding', 'Check Dams'], urbanCoverage: '65%' },
  { district: 'Ganderbal', annualRainfallMm: 680, harvestingPotential: 'High', suitableTechniques: ['Recharge Trenches', 'Check Dams', 'Rooftop RWH'], urbanCoverage: '50%' },
  { district: 'Pulwama', annualRainfallMm: 640, harvestingPotential: 'High', suitableTechniques: ['Contour Bunding', 'Rooftop RWH', 'Percolation Tanks'], urbanCoverage: '60%' },
  { district: 'Budgam', annualRainfallMm: 620, harvestingPotential: 'High', suitableTechniques: ['Rooftop RWH', 'Recharge Pits', 'Contour Bunding'], urbanCoverage: '55%' },
  { district: 'Kupwara', annualRainfallMm: 850, harvestingPotential: 'Very High', suitableTechniques: ['Check Dams', 'Recharge Trenches', 'Contour Bunding'], urbanCoverage: '40%' },
  { district: 'Shopian', annualRainfallMm: 880, harvestingPotential: 'Very High', suitableTechniques: ['Contour Bunding', 'Check Dams', 'Rooftop RWH'], urbanCoverage: '45%' },
];

const potentialColors: Record<string, string> = {
  'Very High': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'High': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'Medium': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
};

export default function RainwaterHarvestingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-sky-950/50 via-blue-950/30 to-cyan-950/50" />
        <div className="relative container mx-auto px-4 md:px-6 py-12 md:py-16">
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-slate-600">/</span>
            <Link href="/water-systems" className="hover:text-white transition-colors">Water Systems</Link>
            <span className="text-slate-600">/</span>
            <Link href="/water-systems/drinking-water-sources" className="hover:text-white transition-colors">Drinking Water Sources</Link>
            <span className="text-slate-600">/</span>
            <span className="text-white">Rainwater Harvesting</span>
          </nav>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
                <CloudRain className="w-7 h-7 text-white" />
              </div>
              <Badge variant="outline" className="border-sky-400/30 text-sky-400 text-xs">Rainwater Intelligence</Badge>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Rainwater Harvesting & Groundwater Recharge
            </h1>
            <p className="text-lg text-slate-300 max-w-3xl mb-6 leading-relaxed">
              Harnessing Kashmir's rainfall (600-1450mm annually) for drinking water augmentation and
              groundwater recharge. The ESRO EIA Report identifies that "rainwater is lost as run off
              without recharging groundwater" — representing a massive untapped opportunity.
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              <Link href="/water-systems/drinking-water-sources">
                <Button variant="outline" className="border-white/20 text-white">← Drinking Water Sources</Button>
              </Link>
              <Link href="/water-systems/drinking-water-sources/groundwater">
                <Button variant="outline" className="border-white/20 text-white">Groundwater <ExternalLink className="w-4 h-4 ml-2" /></Button>
              </Link>
            </div>

            <div className="bg-sky-500/10 border border-sky-500/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-sky-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-sky-300 font-medium mb-1">ESRO Finding: Rainwater Loss</p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    The ESRO Environmental Impact Assessment Report documents: "As the major share of
                    precious rainwater is lost as run off without recharging groundwater, the water
                    resources like springs, wells, baulies are drying up." This finding directly supports
                    the need for systematic rainwater harvesting infrastructure across Kashmir.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Rainfall Stats */}
      <section className="border-y border-white/5 bg-slate-900/50">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
            <Cloud className="w-4 h-4 text-sky-400" />
              Rainfall Data by Station
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {rainfallData.map((r, i) => (
              <Card key={i} className="glass-intense border-white/10 p-3">
                <div className="text-xs text-slate-400 mb-1">{r.station}</div>
                <div className="text-lg font-bold text-sky-400">{r.annualMm}mm</div>
                <div className="text-[10px] text-slate-500 mt-1">Snow: {r.snowDays} days/yr</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Harvesting Techniques */}
      <section className="container mx-auto px-4 md:px-6 py-10">
        <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <CloudRain className="w-5 h-5 text-sky-400" />
          Rainwater Harvesting Techniques
        </h2>
        <p className="text-sm text-slate-400 mb-6">Six techniques suited for Kashmir's hydrological and topographical conditions</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {harvestingTechniques.map((tech, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <Card className="glass-intense border-white/10 p-5 h-full">
                <h3 className="text-sm font-semibold text-white mb-2">{tech.name}</h3>
                <p className="text-xs text-slate-400 mb-3 leading-relaxed">{tech.description}</p>
                <div className="space-y-1.5 text-xs">
                  <div><span className="text-slate-500">Potential: </span><span className="text-emerald-400">{tech.potential}</span></div>
                  <div><span className="text-slate-500">Cost: </span><span className="text-amber-400">{tech.cost}</span></div>
                  <div><span className="text-slate-500">Yield: </span><span className="text-blue-400">{tech.yield}</span></div>
                  <div><span className="text-slate-500">Implementation: </span><span className="text-slate-300">{tech.implementation}</span></div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* District Potential Table */}
      <section className="container mx-auto px-4 md:px-6 pb-10">
        <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
          <Map className="w-5 h-5 text-emerald-400" />
          District-wise Rainwater Harvesting Potential
        </h2>
        <p className="text-sm text-slate-400 mb-6">All districts show High to Very High potential for rainwater harvesting</p>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-xs text-slate-400 uppercase tracking-wider">District</th>
                <th className="text-right py-3 px-4 text-xs text-slate-400 uppercase tracking-wider">Annual Rainfall</th>
                <th className="text-center py-3 px-4 text-xs text-slate-400 uppercase tracking-wider">Potential</th>
                <th className="text-left py-3 px-4 text-xs text-slate-400 uppercase tracking-wider">Suitable Techniques</th>
                <th className="text-right py-3 px-4 text-xs text-slate-400 uppercase tracking-wider">Urban Coverage</th>
              </tr>
            </thead>
            <tbody>
              {districtPotential.map((d, i) => (
                <motion.tr key={d.district} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-3 px-4 text-white font-medium">{d.district}</td>
                  <td className="py-3 px-4 text-right text-sky-400">{d.annualRainfallMm}mm</td>
                  <td className="py-3 px-4 text-center">
                    <Badge className={`${potentialColors[d.harvestingPotential]} border text-[10px]`}>{d.harvestingPotential}</Badge>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {d.suitableTechniques.map((t, j) => (
                        <span key={j} className="text-[10px] bg-sky-500/10 text-sky-400 px-1.5 py-0.5 rounded">{t}</span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right text-slate-300">{d.urbanCoverage}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Benefits & Challenges */}
      <section className="border-t border-white/5 bg-slate-900/30">
        <div className="container mx-auto px-4 md:px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-intense border-white/10 p-5">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                Benefits
              </h3>
              <ul className="space-y-2">
                {[
                  'Supplements dwindling spring and groundwater sources',
                  'Reduces surface runoff and soil erosion',
                  'Cost-effective compared to new water source development',
                  'Can be implemented at individual, community, and watershed scale',
                  'Improves groundwater quality through dilution of contaminants',
                  'Reduces flooding during intense rainfall events',
                  'Supports recharge of Karewa aquifer systems',
                ].map((b, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1 flex-shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="glass-intense border-white/10 p-5">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
                Implementation Challenges
              </h3>
              <ul className="space-y-2">
                {[
                  'Lack of policy mandate for mandatory rainwater harvesting',
                  'Limited awareness and community participation',
                  'Seasonal concentration of rainfall (70% in 3-4 months)',
                  'Maintenance of recharge structures requires institutional support',
                  'Urban space constraints for recharge infrastructure',
                  'No standardized design guidelines for Kashmir conditions',
                  'Funding gaps for large-scale implementation',
                ].map((c, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1 flex-shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-slate-500">Rainwater Harvesting — Kashmir Environmental Intelligence Platform</div>
            <div className="flex items-center gap-4 text-xs text-slate-500">
              <Link href="/water-systems/drinking-water-sources" className="hover:text-white transition-colors">Drinking Water Sources</Link>
              <Link href="/water-systems/drinking-water-sources/groundwater" className="hover:text-white transition-colors">Groundwater</Link>
              <Link href="/water-systems" className="hover:text-white transition-colors">All Water Systems</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
