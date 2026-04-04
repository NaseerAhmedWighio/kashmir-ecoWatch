'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { 
  MapPin, TrendingUp, Activity, Shield, Droplet, Leaf, 
  AlertTriangle, ArrowRight, Download, Share2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { getData } from '@/data';
import { useParams } from 'next/navigation';

export default function DistrictPage() {
  const params = useParams();
  const district = getData.districts.bySlug(params.slug as string);

  if (!district) {
    return (
      <main className="min-h-screen bg-slate-950"><div className="pt-48 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">District not found</h1>
          <Button onClick={() => window.history.back()}>Go Back</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950">{/* Hero header */}
      <div className="relative pt-48 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-forest-900/20 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-slate-400" />
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                District Profile
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
                  {district.name}
                </h1>
                <div className="flex items-center gap-4 text-slate-400">
                  <span>{district.area.toLocaleString()} km²</span>
                  <span>•</span>
                  <span>{district.population.toLocaleString()} residents</span>
                  <span>•</span>
                  <span>{district.headquarters}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" className="border-white/20 text-white" icon={<Share2 className="w-4 h-4" />}>
                  Share
                </Button>
                <Button variant="outline" className="border-white/20 text-white" icon={<Download className="w-4 h-4" />}>
                  Download
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 pb-12 space-y-8">
        {/* Environmental score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="glass-light border-white/5 p-8" padding="none">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Environmental Health Score</h2>
                <p className="text-slate-400">Composite index based on ecological indicators</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-6xl font-black text-forest-400 mb-2">{district.environmentalScore}</div>
                  <div className="text-sm text-slate-500 uppercase tracking-wider">out of 100</div>
                </div>
                <div className="w-32 h-32 relative">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="16"
                      fill="none"
                    />
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      stroke="#10b981"
                      strokeWidth="16"
                      fill="none"
                      strokeDasharray={`${(district.environmentalScore / 100) * 351.68} 351.68`}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Ecological summary grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-light border-white/5 p-6" padding="none">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">{district.ecologicalSummary.protectedAreas}</div>
                  <div className="text-sm text-slate-500 uppercase">Protected Areas</div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-light border-white/5 p-6" padding="none">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                  <Droplet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">{district.ecologicalSummary.waterBodies}</div>
                  <div className="text-sm text-slate-500 uppercase">Water Bodies</div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-light border-white/5 p-6" padding="none">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-forest-500 to-green-600 flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">{district.ecologicalSummary.forestCover}%</div>
                  <div className="text-sm text-slate-500 uppercase">Forest Cover</div>
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="glass-light border-white/5 p-6" padding="none">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">{district.ecologicalSummary.speciesCount}</div>
                  <div className="text-sm text-slate-500 uppercase">Species Count</div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Hazards */}
        {district.hazards && district.hazards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="glass-light border-white/5 p-6" padding="lg">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-amber-400" />
                <h2 className="text-xl font-bold text-white">Environmental Hazards</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {district.hazards.map((hazard, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20"
                  >
                    <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <span className="text-white font-medium">{hazard}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex items-center gap-4 pt-8 border-t border-white/5">
          <Button className="bg-gradient-to-r from-forest-600 to-forest-500" icon={<ArrowRight className="w-4 h-4" />}>
            View All Data
          </Button>
          <Button variant="outline" className="border-white/20 text-white">
            Compare Districts
          </Button>
        </motion.div>
      </div>

      <AdvancedFooter />
    </main>
  );
}
