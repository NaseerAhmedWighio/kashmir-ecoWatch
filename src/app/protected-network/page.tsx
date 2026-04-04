'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { 
  Shield, Map, TrendingUp, Activity, Leaf, Mountain, 
  Droplet, ArrowRight, Eye, FileText, AlertTriangle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { protectedNetworkMetrics, getProtectedAreas } from '@/data/protected-network';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const categoryCards = [
  {
    id: 'national-parks',
    title: 'National Parks',
    icon: Mountain,
    count: protectedNetworkMetrics.nationalParks,
    description: 'Core mountain and forest conservation landscapes with highest protection status',
    color: 'from-emerald-500 to-teal-600',
    href: '/protected-network/national-parks',
  },
  {
    id: 'wildlife-sanctuaries',
    title: 'Wildlife Sanctuaries',
    icon: Shield,
    count: protectedNetworkMetrics.wildlifeSanctuaries,
    description: 'Protected habitats for mammals, birds, and mountain biodiversity',
    color: 'from-blue-500 to-cyan-600',
    href: '/protected-network/wildlife-sanctuaries',
  },
  {
    id: 'wetland-reserves',
    title: 'Wetland Reserves',
    icon: Droplet,
    count: protectedNetworkMetrics.wetlandReserves,
    description: 'Marsh, reedbed, and bird-use conservation systems including Ramsar sites',
    color: 'from-sky-500 to-blue-600',
    href: '/protected-network/wetland-reserves',
  },
  {
    id: 'conservation-reserves',
    title: 'Conservation Reserves',
    icon: Leaf,
    count: protectedNetworkMetrics.conservationReserves,
    description: 'Community-involved conservation landscapes and buffer zones',
    color: 'from-amber-500 to-orange-600',
    href: '/protected-network/conservation-reserves',
  },
  {
    id: 'bird-habitat-areas',
    title: 'Bird & Habitat Areas',
    icon: Activity,
    count: protectedNetworkMetrics.importantBirdAreas,
    description: 'Important Bird and Biodiversity Areas (IBAs) with critical habitats',
    color: 'from-purple-500 to-pink-600',
    href: '/protected-network/bird-habitat-areas',
  },
  {
    id: 'atlas',
    title: 'Protected Area Atlas',
    icon: Map,
    count: protectedNetworkMetrics.totalProtectedAreas,
    description: 'Interactive GIS mapping of all protected landscapes across Kashmir',
    color: 'from-slate-500 to-slate-700',
    href: '/protected-network/atlas',
  },
  {
    id: 'registry',
    title: 'Protected Areas Registry',
    icon: Shield,
    count: protectedNetworkMetrics.totalProtectedAreas,
    description: 'Complete inventory of all protected areas with detailed metadata and source information',
    color: 'from-emerald-600 to-green-700',
    href: '/protected-network/registry',
  },
];

const intelligenceCards = [
  {
    title: 'Species Intelligence',
    description: 'Protected-area overlap for key species and habitats',
    icon: Activity,
    href: '/protected-network/species-intelligence',
    metrics: { value: '2,847', label: 'Species with PA overlap' },
  },
  {
    title: 'Corridors & Connectivity',
    description: 'Landscape continuity and habitat linkage analysis',
    icon: Map,
    href: '/protected-network/corridors-and-connectivity',
    metrics: { value: '23', label: 'Identified corridors' },
  },
  {
    title: 'Monitoring & Threats',
    description: 'Pressure signals and conservation alerts',
    icon: AlertTriangle,
    href: '/protected-network/monitoring-and-threats',
    metrics: { value: '17', label: 'Active alerts' },
  },
  {
    title: 'Reports & Plans',
    description: 'Management documents and research',
    icon: FileText,
    href: '/protected-network/reports-and-plans',
    metrics: { value: '156', label: 'Documents' },
  },
];

export default function ProtectedNetworkPage() {
  const router = useRouter();

  const featuredPAs = [
    getProtectedAreas.bySlug('dachigam-national-park'),
    getProtectedAreas.bySlug('hemis-national-park'),
    getProtectedAreas.bySlug('hokersar-wetland'),
  ].filter(Boolean);

  return (
    <main className="min-h-screen bg-slate-950">{/* Hero */}
      <div className="relative pt-48 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-6 h-6 text-emerald-400" />
              <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                Conservation Intelligence
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Protected Network
            </h1>
            <p className="text-xl text-slate-400 mb-8 leading-relaxed">
              Comprehensive protected area system including national parks, wildlife sanctuaries, 
              wetland reserves, and conservation landscapes across Kashmir
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-emerald-600 to-emerald-500"
                icon={<Map className="w-5 h-5" />}
              >
                Open PA Atlas
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/20 text-white"
                icon={<TrendingUp className="w-5 h-5" />}
              >
                Network Statistics
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Metrics */}
      <div className="container mx-auto px-6 -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-intense border-white/10 p-6" padding="none">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
              {[
                { label: 'Total PAs', value: protectedNetworkMetrics.totalProtectedAreas, icon: Shield },
                { label: 'Total Area', value: `${protectedNetworkMetrics.totalArea.toLocaleString()} km²`, icon: Map },
                { label: 'National Parks', value: protectedNetworkMetrics.nationalParks, icon: Mountain },
                { label: 'Sanctuaries', value: protectedNetworkMetrics.wildlifeSanctuaries, icon: Shield },
                { label: 'Wetland Reserves', value: protectedNetworkMetrics.wetlandReserves, icon: Droplet },
                { label: 'Conservation Reserves', value: protectedNetworkMetrics.conservationReserves, icon: Leaf },
                { label: 'IBAs', value: protectedNetworkMetrics.importantBirdAreas, icon: Activity },
                { label: 'Coverage', value: `${protectedNetworkMetrics.coveragePercentage}%`, icon: TrendingUp },
              ].map((metric, idx) => (
                <div key={idx} className="text-center p-4 border-r border-white/5 last:border-r-0">
                  <metric.icon className="w-5 h-5 text-slate-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white tabular-nums">
                    {metric.value}
                  </div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Category Cards */}
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full" />
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Protected Area Categories
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Explore by Category
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryCards.map((category, index) => (
            <motion.a
              key={category.id}
              href={category.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="block group"
            >
              <Card className="h-full card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} text-white flex items-center justify-center shadow-lg`}>
                    <category.icon className="w-7 h-7" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-emerald-300 transition-colors">
                      {category.title}
                    </h3>
                    <div className="text-3xl font-bold text-white">
                      {category.count.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-500 uppercase">areas</div>
                  </div>
                </div>
                <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                  {category.description}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium text-emerald-400 group-hover:text-emerald-300 transition-colors">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Ecological Intelligence */}
      <div className="container mx-auto px-6 py-16 bg-slate-900/50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full" />
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Advanced Intelligence
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ecological Intelligence Layers
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {intelligenceCards.map((card, index) => (
            <motion.a
              key={card.title}
              href={card.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="block group"
            >
              <Card className="h-full card-intelligence border border-white/5 bg-slate-900/50" padding="lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center">
                    <card.icon className="w-6 h-6 text-slate-400 group-hover:text-purple-400 transition-colors" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-400 mb-4">
                  {card.description}
                </p>
                <div className="p-3 rounded-lg glass-light border border-white/5">
                  <div className="text-2xl font-bold text-white">{card.metrics.value}</div>
                  <div className="text-xs text-slate-500 uppercase">{card.metrics.label}</div>
                </div>
              </Card>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Featured Protected Areas */}
      <div className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full" />
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Featured Landscapes
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Featured Protected Areas
            </h2>
          </div>
          <Button
            variant="outline"
            className="border-white/20 text-white"
            icon={<ArrowRight className="w-5 h-5" />}
            onClick={() => router.push('/protected-network/national-parks')}
          >
            View All Protected Areas
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPAs.map((pa: any, index) => (
            pa && (
              <motion.a
                key={pa.id}
                href={`/protected-network/${pa.category === 'wetland_reserve' ? 'wetland-reserves' : pa.category === 'national_park' ? 'national-parks' : 'wildlife-sanctuaries'}/${pa.slug}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="block group"
              >
                <Card className="h-full overflow-hidden card-intelligence border border-white/5 bg-slate-900/50" padding="none">
                  <div className="relative h-48 bg-gradient-to-br from-emerald-500/20 to-slate-800/50">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge variant="info" size="sm" className="mb-2 capitalize">
                        {pa.category.replace('_', ' ')}
                      </Badge>
                      <h3 className="text-xl font-bold text-white">{pa.name}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                      {pa.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-slate-400">
                      <div>
                        <div className="text-xs text-slate-500 uppercase">Area</div>
                        <div className="text-white font-semibold">{pa.area} km²</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase">District</div>
                        <div className="text-white font-semibold">{pa.district}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase">Established</div>
                        <div className="text-white font-semibold">{pa.established}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-emerald-400 group-hover:text-emerald-300 transition-colors mt-4 pt-4 border-t border-white/5">
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Card>
              </motion.a>
            )
          ))}
        </div>
      </div>

      <AdvancedFooter />
    </main>
  );
}
