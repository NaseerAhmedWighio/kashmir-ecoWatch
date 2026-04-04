'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MapPin, ArrowRight, TrendingUp, AlertTriangle, Bell, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { districtRiskProfiles, liveAlerts } from '@/data/risk-monitoring';

const getRiskBadge = (level: string) => {
  switch (level) {
    case 'critical': return <Badge variant="danger" size="lg">Critical</Badge>;
    case 'high': return <Badge variant="warning" size="lg">High</Badge>;
    case 'moderate': return <Badge variant="info" size="lg">Moderate</Badge>;
    case 'low': return <Badge variant="success" size="lg">Low</Badge>;
    default: return null;
  }
};

export default function DistrictRiskProfilesPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      <section className="relative pt-20 md:pt-48 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-green-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <a href="/risk-monitoring" className="hover:text-white transition-colors">Risk & Monitoring</a>
              <span>/</span>
              <span className="text-white font-medium">District Risk Profiles</span>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-2xl">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <Badge variant="success" size="lg">District-Wise Operational Risk</Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              District <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">Risk</span> Profiles
            </h1>
            <p className="text-xl text-slate-400 mb-8">
              Operational risk intelligence at district level: current risk levels, dominant hazard categories, 
              live alerts, infrastructure concerns, response notes, advisory status, and trend direction.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-xl" onClick={() => router.push('/risk-monitoring/live-alerts')}>
                <Bell className="w-5 h-5 mr-2" />View Live Alerts
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => router.push('/risk-monitoring')}>Back to Overview</Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* District Risk Cards */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {districtRiskProfiles.map((district, idx) => (
              <motion.div key={district.district} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 p-6 cursor-pointer transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">{district.district}</h3>
                      <span className="text-xs text-slate-500">Last updated: {new Date(district.lastUpdated).toLocaleString()}</span>
                    </div>
                    {getRiskBadge(district.riskLevel)}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Active Alerts</div>
                      <div className="text-2xl font-bold text-white">{district.activeAlerts}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Infrastructure Concerns</div>
                      <div className="text-2xl font-bold text-white">{district.infrastructureConcerns}</div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Dominant Hazards</div>
                      <div className="flex flex-wrap gap-1">
                        {district.dominantHazards.map((hazard, hIdx) => (
                          <Badge key={hIdx} variant="outline" size="sm" className="text-xs border-white/10">{hazard}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Advisory Status</div>
                      <div className="text-sm text-slate-300">{district.advisoryStatus}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Risk Trend</div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className={`w-4 h-4 ${district.riskTrend === 'increasing' ? 'text-red-400' : district.riskTrend === 'decreasing' ? 'text-green-400' : 'text-slate-400'}`} />
                        <span className={`text-sm ${district.riskTrend === 'increasing' ? 'text-red-400' : district.riskTrend === 'decreasing' ? 'text-green-400' : 'text-slate-400'}`}>
                          {district.riskTrend}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center text-xs font-medium text-emerald-400 group-hover:text-emerald-300 transition-colors">
                    <span>View Full Profile</span>
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
