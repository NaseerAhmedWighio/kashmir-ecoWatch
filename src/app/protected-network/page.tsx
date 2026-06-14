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
import { Heading } from '@/components/common/Heading';

const categoryCards = [
  {
    id: 'national-parks',
    title: 'National Parks',
    icon: Mountain,
    count: protectedNetworkMetrics.nationalParks,
    description: 'Core mountain and forest conservation landscapes with highest protection status',
    color: 'from- emerald-700 to-emerald-500',
    href: '/protected-network/national-parks',
  },
  {
    id: 'protected-areas',
    title: 'Protected Areas',
    icon: Shield,
    count: protectedNetworkMetrics.totalProtectedAreas,
    description: 'Complete listing of all protected areas across Kashmir with detailed ecological intelligence',
    color: 'from- emerald-700 to-emerald-500',
    href: '/protected-areas',
  },
  {
    id: 'wildlife-sanctuaries',
    title: 'Wildlife Sanctuaries',
    icon: Shield,
    count: protectedNetworkMetrics.wildlifeSanctuaries,
    description: 'Protected habitats for mammals, birds, and mountain biodiversity',
    color: 'from- emerald-700 to-emerald-500',
    href: '/protected-network/wildlife-sanctuaries',
  },
  {
    id: 'wetland-reserves',
    title: 'Wetland Reserves',
    icon: Droplet,
    count: protectedNetworkMetrics.wetlandReserves,
    description: 'Marsh, reedbed, and bird-use conservation systems including Ramsar sites',
    color: 'from- emerald-700 to-emerald-500',
    href: '/protected-network/wetland-reserves',
  },
  {
    id: 'conservation-reserves',
    title: 'Conservation Reserves',
    icon: Leaf,
    count: protectedNetworkMetrics.conservationReserves,
    description: 'Community-involved conservation landscapes and buffer zones',
    color: 'from- emerald-700 to-emerald-500',
    href: '/protected-network/conservation-reserves',
  },
  {
    id: 'bird-and-habitat-areas',
    title: 'Bird & Habitat Areas',
    icon: Activity,
    count: protectedNetworkMetrics.importantBirdAreas,
    description: 'Important Bird and Biodiversity Areas (IBAs) with critical habitats',
    color: 'from- emerald-700 to-emerald-500',
    href: '/protected-network/bird-and-habitat-areas',
  },
  {
    id: 'atlas',
    title: 'Protected Area Atlas',
    icon: Map,
    count: protectedNetworkMetrics.totalProtectedAreas,
    description: 'Interactive GIS mapping of all protected landscapes across Kashmir',
    color: 'from- emerald-700 to-emerald-500',
    href: '/protected-network/atlas',
  },
  {
    id: 'registry',
    title: 'Protected Areas Registry',
    icon: Shield,
    count: protectedNetworkMetrics.totalProtectedAreas,
    description: 'Complete inventory of all protected areas with detailed metadata and source information',
    color: 'from- emerald-700 to-emerald-500',
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
    <main className="min-h-screen bg-slate-950">
      <Heading
        title={<><span className="block whitespace-nowrap">Kashmir Protected</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Area Network</span></>}
        subtitle="A geospatial conservation intelligence layer mapping Kashmir's protected areas, wetlands, wildlife corridors, and sensitive ecosystems. Integrating biodiversity data, habitat assessments, and real-time threat signals for monitoring and spatial analysis."
        icon={<Shield className="w-6 h-6 text-emerald-400" />}
        label="Conservation Intelligence"
        images={['/images/protected-network.png', '/images/bear.png', '/images/tiger.png', '/images/markhor.png']}
        actions={
          <>
            <a href="/protected-network/atlas">
              <Button size="lg" className="bg-emerald-700" icon={<Map className="w-5 h-5" />}>
                Open PA Atlas
              </Button>
            </a>
            <a href="/protected-network/registry">
              <Button size="lg" variant="outline" className="border-white/20 text-white" icon={<TrendingUp className="w-5 h-5" />}>
                Network Statistics
              </Button>
            </a>
          </>
        }
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Protected Network' }]}
      />

      {/* Metrics */}
      <div className="container mx-auto px-4 sm:px-6 -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-intense border-white/10" padding="sm">
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-2">
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
                <div key={idx} className="py-2.5 px-2 lg:py-3 lg:px-3 rounded-xl text-center min-w-0">
                  <metric.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 mx-auto mb-1" />
                  <div className="text-sm sm:text-base lg:text-sm xl:text-base font-bold text-white tabular-nums leading-tight truncate">
                    {metric.value}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 uppercase tracking-wide mt-0.5 leading-tight break-words">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Category Cards */}

      <section className="w-full overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">

          {/* ... heading ... */}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 w-full">
            {categoryCards.map((category, index) => (
              <motion.a
                key={category.id}
                href={category.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="block group w-full min-w-0" // ← min-w-0 prevents flex/grid blowout
              >
                <Card className="p-4 sm:p-5 flex flex-col h-full border border-white/10 bg-white/5 w-full hover:border-emerald-500/30 transition-all duration-300" padding="none">

                  <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 shrink-0`}>
                    <category.icon className="w-5 h-5 text-white" />
                  </div>

                  <h3 className="text-sm font-semibold text-white mb-1.5 group-hover:text-emerald-300 transition-colors leading-snug">
                    {category.title}
                  </h3>
                  <div className="text-2xl sm:text-3xl font-bold text-white leading-none">
                    {category.count.toLocaleString()}
                  </div>
                  <div className="text-[10px] font-semibold tracking-widest text-slate-500 uppercase mt-1 mb-3 sm:mb-4">
                    Areas
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed flex-1 mb-3 sm:mb-4 line-clamp-3">
                    {category.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 group-hover:text-emerald-300 transition-colors">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>

                </Card>
              </motion.a>
            ))}
          </div>
        </div>
      </section>


      {/* Ecological Intelligence */}
      <div className="container mx-auto px-6 py-16 bg-white/[0.02] rounded-3xl border border-white/[0.06]">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
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
              <Card className="h-full card-intelligence border border-white/10 bg-white/5 hover:border-emerald-500/30" padding="lg">
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
          <a href="/protected-areas">
            <Button
              variant="outline"
              className="border-white/20 text-white"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              View All Protected Areas
            </Button>
          </a>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
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
                <Card className="p-5 sm:p-6 flex flex-col gap-3 h-full overflow-hidden card-intelligence border border-white/10 bg-white/5 hover:border-emerald-500/30" padding="none">
                  <div className="relative h-48 bg-[#160C27]">
                    <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/protected-network.png)' }} />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#160C27]/80 via-[#160C27]/60 to-[#160C27]/80" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge variant="info" size="sm" className="mb-2 capitalize text-xs px-2 py-0.5 whitespace-nowrap">
                        {pa.category.replace('_', ' ')}
                      </Badge>
                      <h3 className="text-base sm:text-lg font-semibold text-white">{pa.name}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
                      {pa.description}
                    </p>
                    <div className="grid grid-cols-3 gap-3 text-center mt-2">
                      <div>
                        <div className="text-xs text-slate-500 uppercase">Area</div>
                        <div className="text-sm font-bold text-white">{pa.area} km²</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase">District</div>
                        <div className="text-sm font-bold text-white">{pa.district}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 uppercase">Established</div>
                        <div className="text-sm font-bold text-white">{pa.established}</div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-500  transition-all duration-300 text-sm font-medium text-white shadow-md shadow-emerald-500/20">
                        View Details
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.a>
            )
          ))}
        </div>
      </div>
    </main>
  );
}
