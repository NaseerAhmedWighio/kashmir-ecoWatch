'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import {
  Map, TrendingUp, Award, AlertTriangle, Leaf, Droplet,
  ArrowRight, Shield, Activity
} from 'lucide-react';
import { motion } from 'framer-motion';

const districtData = [
  {
    name: 'Srinagar',
    ecologicalScore: 72,
    riskLevel: 'Moderate-High',
    wetlands: 8,
    protectedAreas: 3,
    speciesCount: 245,
    trend: 'declining',
    strength: 'Wetland Diversity',
    challenge: 'Urban Pressure',
    route: '/districts/srinagar',
  },
  {
    name: 'Anantnag',
    ecologicalScore: 78,
    riskLevel: 'Moderate',
    wetlands: 5,
    protectedAreas: 4,
    speciesCount: 312,
    trend: 'stable',
    strength: 'Biodiversity Rich',
    challenge: 'HWC Pressure',
    route: '/districts/anantnag',
  },
  {
    name: 'Baramulla',
    ecologicalScore: 75,
    riskLevel: 'Moderate',
    wetlands: 6,
    protectedAreas: 2,
    speciesCount: 278,
    trend: 'improving',
    strength: 'Wular Lake',
    challenge: 'Agricultural Runoff',
    route: '/districts/baramulla',
  },
  {
    name: 'Ganderbal',
    ecologicalScore: 81,
    riskLevel: 'Low-Moderate',
    wetlands: 4,
    protectedAreas: 5,
    speciesCount: 298,
    trend: 'stable',
    strength: 'Protected Areas',
    challenge: 'Tourism Pressure',
    route: '/districts/ganderbal',
  },
  {
    name: 'Kupwara',
    ecologicalScore: 83,
    riskLevel: 'Low',
    wetlands: 2,
    protectedAreas: 4,
    speciesCount: 267,
    trend: 'stable',
    strength: 'Forest Cover',
    challenge: 'Remote Access',
    route: '/districts/kupwara',
  },
  {
    name: 'Pulwama',
    ecologicalScore: 69,
    riskLevel: 'Moderate-High',
    wetlands: 3,
    protectedAreas: 1,
    speciesCount: 198,
    trend: 'declining',
    strength: 'Agricultural Zone',
    challenge: 'Habitat Loss',
    route: '/districts/pulwama',
  },
];

const superlatives = [
  { label: 'Highest Ecological Score', district: 'Kupwara', score: 83, icon: Award, color: 'text-emerald-400' },
  { label: 'Most Biodiversity-Rich', district: 'Anantnag', count: 312, icon: Activity, color: 'text-purple-400' },
  { label: 'Most Improved', district: 'Baramulla', trend: 'improving', icon: TrendingUp, color: 'text-blue-400' },
  { label: 'Highest Risk', district: 'Pulwama', risk: 'Moderate-High', icon: AlertTriangle, color: 'text-red-400' },
];

export function DistrictIntelligenceStrip() {
  const router = useRouter();

  return (
    <section className="pt-16 md:pt-20 pb-16 md:pb-20 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 bg-blue-500 rounded-full signal-pulse" />
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Regional Intelligence
            </span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
                District Ecological Scorecards
              </h2>
              <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
                Compare ecological health, biodiversity richness, risk levels,
                and conservation status across Kashmir's districts.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-white/20 text-white hover:border-blue-400"
              icon={<Map className="w-4 h-4" />}
              onClick={() => router.push('/districts')}
            >
              View All Districts
            </Button>
          </div>
        </motion.div>

        {/* Superlatives Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {superlatives.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-light border-white/10 p-5 text-center">
                  <item.icon className={`w-6 h-6 ${item.color} mx-auto mb-3`} />
                  <div className="text-xs text-slate-400 mb-2">{item.label}</div>
                  <div className="text-lg font-bold text-white mb-1">{item.district}</div>
                  <div className="text-xs text-slate-500">
                    {'score' in item && `${item.score} score`}
                    {'count' in item && `${item.count} species`}
                    {'trend' in item && 'Improving'}
                    {'risk' in item && item.risk}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* District Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {districtData.map((district, index) => (
            <motion.div
              key={district.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="glass-intense border-white/10 hover:border-blue-500/30 transition-all p-6 group cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                      {district.name}
                    </h3>
                    <div className="text-xs text-slate-500">District</div>
                  </div>
                  <Badge
                    variant={
                      district.ecologicalScore >= 80 ? 'success' :
                      district.ecologicalScore >= 70 ? 'warning' : 'danger'
                    }
                    size="sm"
                  >
                    Score: {district.ecologicalScore}
                  </Badge>
                </div>

                {/* Metrics grid */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <Droplet className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                    <div className="text-lg font-bold text-white">{district.wetlands}</div>
                    <div className="text-xs text-slate-500">Wetlands</div>
                  </div>
                  <div className="text-center">
                    <Shield className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
                    <div className="text-lg font-bold text-white">{district.protectedAreas}</div>
                    <div className="text-xs text-slate-500">Protected</div>
                  </div>
                  <div className="text-center">
                    <Activity className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                    <div className="text-lg font-bold text-white">{district.speciesCount}</div>
                    <div className="text-xs text-slate-500">Species</div>
                  </div>
                </div>

                {/* Trend */}
                <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/5">
                  <TrendingUp className={`w-4 h-4 ${
                    district.trend === 'improving' ? 'text-emerald-400' :
                    district.trend === 'declining' ? 'text-red-400' : 'text-slate-400'
                  }`} />
                  <span className={`text-xs ${
                    district.trend === 'improving' ? 'text-emerald-400' :
                    district.trend === 'declining' ? 'text-red-400' : 'text-slate-400'
                  }`}>
                    {district.trend === 'improving' ? 'Improving' :
                     district.trend === 'declining' ? 'Declining' : 'Stable'}
                  </span>
                  <span className="text-xs text-slate-600">•</span>
                  <span className="text-xs text-slate-400">{district.riskLevel} Risk</span>
                </div>

                {/* Strength & Challenge */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-3 h-3 text-emerald-400" />
                    <span className="text-xs text-slate-400">Strength:</span>
                    <span className="text-xs text-white">{district.strength}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3 text-amber-400" />
                    <span className="text-xs text-slate-400">Challenge:</span>
                    <span className="text-xs text-white">{district.challenge}</span>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  className="w-full border-white/20 text-white hover:border-blue-400 group-hover:bg-blue-500/10"
                  onClick={() => router.push(district.route)}
                >
                  <span>View Profile</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
