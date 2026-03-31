'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Leaf, ArrowRight,
  Shield, AlertTriangle, Target, Fish, Bird, Activity
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const biodiversityModules = [
  {
    id: 'biodiversity-risk-intelligence',
    title: 'Biodiversity Risk Intelligence',
    description: 'Habitat vulnerability, threatened species, and ecological pressure tracking',
    icon: Leaf,
    color: 'from-emerald-500 to-green-600',
    route: '/risk-monitoring/biodiversity-risk-intelligence',
    features: ['Habitat Risk', 'Species Threat', 'Protected Areas', 'Cross-Link']
  },
  {
    id: 'red-data-species-vulnerability',
    title: 'Red Data / Species Vulnerability',
    description: 'Threatened Kashmir fauna/flora and habitat vulnerability assessments',
    icon: Shield,
    color: 'from-amber-500 to-red-600',
    route: '/risk-monitoring/red-data-species-vulnerability',
    features: ['IUCN Status', 'Population', 'Habitat', 'Threat Overlap']
  },
  {
    id: 'human-wildlife-conflict',
    title: 'Human-Wildlife Conflict',
    description: 'Leopard/bear conflict, livestock depredation, and settlement-edge risk',
    icon: AlertTriangle,
    color: 'from-amber-500 to-orange-600',
    route: '/risk-monitoring/human-wildlife-conflict',
    features: ['Conflict Records', 'District Profiles', 'Response', 'Mitigation']
  },
  {
    id: 'wildlife-mortality-kill-records',
    title: 'Wildlife Mortality / Kill Records',
    description: 'Roadkill, poaching, electrocution, and conflict-linked deaths',
    icon: Target,
    color: 'from-red-500 to-orange-600',
    route: '/risk-monitoring/wildlife-mortality-kill-records',
    features: ['Mortality Records', 'Cause Analysis', 'District Profile', 'Hotspots']
  },
  {
    id: 'fish-kill-monitoring',
    title: 'Fish Kill Monitoring',
    description: 'Lake/river fish mortality, oxygen depletion, and pollution-linked kills',
    icon: Fish,
    color: 'from-blue-500 to-cyan-600',
    route: '/risk-monitoring/fish-kill-monitoring',
    features: ['Kill Events', 'Cause Analysis', 'Economic Loss', 'Bloom Link']
  },
  {
    id: 'bird-migration-monitoring',
    title: 'Bird Migration Monitoring',
    description: 'Hokersar, Hygam, Shallabugh, Wular wetland migration tracking',
    icon: Bird,
    color: 'from-blue-500 to-indigo-600',
    route: '/risk-monitoring/bird-migration-monitoring',
    features: ['Migration Windows', 'Wetland Status', 'Species', 'Routes']
  },
  {
    id: 'bird-mortality-kill-monitoring',
    title: 'Bird Mortality / Kill Monitoring',
    description: 'Wetland bird mortality, poisoning, collision, and disease clusters',
    icon: Bird,
    color: 'from-red-500 to-orange-600',
    route: '/risk-monitoring/bird-mortality-kill-monitoring',
    features: ['Mortality Records', 'Cause Analysis', 'Wetland Risk', 'Disease']
  },
  {
    id: 'ecosystem-stress-mortality-signals',
    title: 'Ecosystem Stress & Mortality',
    description: 'Cross-system ecological stress and integrated mortality signal detection',
    icon: Activity,
    color: 'from-red-500 to-amber-600',
    route: '/risk-monitoring/ecosystem-stress-mortality-signals',
    features: ['Stress Signals', 'Mortality Trends', 'District Profile', 'Cross-System']
  },
];

export default function BiodiversityRisksPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-48 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-green-950/30 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <a href="/risk-monitoring" className="hover:text-white transition-colors">Risk & Monitoring</a>
              <span>/</span>
              <span className="text-white font-medium">Biodiversity Risks</span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-2xl">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <Badge variant="success" size="lg">Ecological Vulnerability</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Biodiversity <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">Risks</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Species vulnerability tracking, habitat risk assessment, mortality monitoring,
              and ecological intelligence for Kashmir's biodiversity conservation
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-xl"
                onClick={() => router.push('/risk-monitoring/biodiversity-risk-intelligence')}
              >
                <Leaf className="w-5 h-5 mr-2" />
                Biodiversity Intelligence
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                onClick={() => router.push('/risk-monitoring')}
              >
                Back to Overview
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Biodiversity Modules Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {biodiversityModules.map((module, index) => (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card
                  className="glass-intense border-white/10 hover:border-emerald-500/30 transition-all p-5 h-full cursor-pointer group"
                  onClick={() => router.push(module.route)}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <module.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {module.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mb-3 line-clamp-2 leading-relaxed">
                    {module.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {module.features.slice(0, 2).map((feature, fIdx) => (
                      <Badge key={fIdx} variant="outline" size="sm" className="text-xs border-white/10">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center text-xs font-medium text-emerald-400 group-hover:text-emerald-300 transition-colors">
                    <span>Access Module</span>
                    <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
