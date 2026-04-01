// Conservation Analytics Panel Component
// Enhanced Red Data Book section with threat patterns and legal status

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ConservationAnalytics } from '@/data/biodiversity-intelligence';
import {
  Shield, AlertTriangle, TrendingUp, MapPin, Leaf,
  ArrowRight, Activity, Scale, Target
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ConservationAnalyticsPanelProps {
  analytics: ConservationAnalytics;
  onViewAll?: () => void;
}

const iucnColors = {
  CR: 'bg-red-500 text-white',
  EN: 'bg-orange-500 text-white',
  VU: 'bg-amber-500 text-white',
  NT: 'bg-lime-500 text-white',
  LC: 'bg-emerald-500 text-white'
};

const reasonColors = {
  endemic: 'from-violet-500 to-purple-600',
  'critically-endangered': 'from-red-500 to-rose-600',
  flagship: 'from-amber-500 to-orange-600',
  keystone: 'from-emerald-500 to-teal-600'
};

export function ConservationAnalyticsPanel({ analytics, onViewAll }: ConservationAnalyticsPanelProps) {
  const totalThreatened = 
    analytics.byTaxon.mammals.CR + analytics.byTaxon.mammals.EN + analytics.byTaxon.mammals.VU +
    analytics.byTaxon.birds.CR + analytics.byTaxon.birds.EN + analytics.byTaxon.birds.VU +
    analytics.byTaxon.medicinalPlants.CR + analytics.byTaxon.medicinalPlants.EN + analytics.byTaxon.medicinalPlants.VU;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass-intense border-white/10 overflow-hidden">
        {/* Threat Patterns by Taxon */}
        <div className="p-6 pb-4 border-b border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Threat Patterns by Taxon</h3>
              <p className="text-sm text-slate-400">Conservation status breakdown</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Mammals */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-white">Mammals</span>
                <Badge variant="outline" size="sm" className="border-emerald-500/30 text-emerald-400">
                  {analytics.byTaxon.mammals.total} species
                </Badge>
              </div>
              <div className="flex gap-2 mb-3">
                {analytics.byTaxon.mammals.CR > 0 && (
                  <Badge size="sm" className={iucnColors.CR}>CR: {analytics.byTaxon.mammals.CR}</Badge>
                )}
                {analytics.byTaxon.mammals.EN > 0 && (
                  <Badge size="sm" className={iucnColors.EN}>EN: {analytics.byTaxon.mammals.EN}</Badge>
                )}
                {analytics.byTaxon.mammals.VU > 0 && (
                  <Badge size="sm" className={iucnColors.VU}>VU: {analytics.byTaxon.mammals.VU}</Badge>
                )}
              </div>
              <div className="text-xs text-slate-400">
                Primary: {analytics.byTaxon.mammals.primaryThreats.slice(0, 2).join(', ')}
              </div>
            </div>
            
            {/* Birds */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-sky-500/10 to-blue-500/10 border border-sky-500/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-white">Birds</span>
                <Badge variant="outline" size="sm" className="border-sky-500/30 text-sky-400">
                  {analytics.byTaxon.birds.total} species
                </Badge>
              </div>
              <div className="flex gap-2 mb-3">
                {analytics.byTaxon.birds.CR > 0 && (
                  <Badge size="sm" className={iucnColors.CR}>CR: {analytics.byTaxon.birds.CR}</Badge>
                )}
                {analytics.byTaxon.birds.EN > 0 && (
                  <Badge size="sm" className={iucnColors.EN}>EN: {analytics.byTaxon.birds.EN}</Badge>
                )}
                {analytics.byTaxon.birds.VU > 0 && (
                  <Badge size="sm" className={iucnColors.VU}>VU: {analytics.byTaxon.birds.VU}</Badge>
                )}
              </div>
              <div className="text-xs text-slate-400">
                Primary: {analytics.byTaxon.birds.primaryThreats.slice(0, 2).join(', ')}
              </div>
            </div>
            
            {/* Medicinal Plants */}
            <div className="p-4 rounded-lg bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-white">Medicinal Plants</span>
                <Badge variant="outline" size="sm" className="border-amber-500/30 text-amber-400">
                  {analytics.byTaxon.medicinalPlants.total} species
                </Badge>
              </div>
              <div className="flex gap-2 mb-3">
                {analytics.byTaxon.medicinalPlants.CR > 0 && (
                  <Badge size="sm" className={iucnColors.CR}>CR: {analytics.byTaxon.medicinalPlants.CR}</Badge>
                )}
                {analytics.byTaxon.medicinalPlants.EN > 0 && (
                  <Badge size="sm" className={iucnColors.EN}>EN: {analytics.byTaxon.medicinalPlants.EN}</Badge>
                )}
                {analytics.byTaxon.medicinalPlants.VU > 0 && (
                  <Badge size="sm" className={iucnColors.VU}>VU: {analytics.byTaxon.medicinalPlants.VU}</Badge>
                )}
              </div>
              <div className="text-xs text-slate-400">
                Primary: {analytics.byTaxon.medicinalPlants.primaryThreats.slice(0, 2).join(', ')}
              </div>
            </div>
          </div>
        </div>
        
        {/* Legal Protection & Priority Species */}
        <div className="p-6 pb-4 border-b border-white/5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* WLPA Schedule */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-5 h-5 text-violet-400" />
                <h4 className="text-lg font-bold text-white">Legal Protection (WLPA 1972)</h4>
              </div>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { schedule: 'Schedule I', value: analytics.wlpa1972Schedule.scheduleI, color: 'text-red-400' },
                  { schedule: 'Schedule II', value: analytics.wlpa1972Schedule.scheduleII, color: 'text-orange-400' },
                  { schedule: 'Schedule III', value: analytics.wlpa1972Schedule.scheduleIII, color: 'text-amber-400' },
                  { schedule: 'Schedule IV', value: analytics.wlpa1972Schedule.scheduleIV, color: 'text-emerald-400' },
                ].map((item) => (
                  <div key={item.schedule} className="text-center p-3 rounded-lg bg-white/5 border border-white/5">
                    <div className={`text-2xl font-bold ${item.color}`}>{item.value}</div>
                    <div className="text-xs text-slate-500 mt-1">{item.schedule}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Priority Species */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-5 h-5 text-amber-400" />
                <h4 className="text-lg font-bold text-white">Priority Kashmir Species</h4>
              </div>
              <div className="space-y-2">
                {analytics.prioritySpecies.slice(0, 4).map((priority) => (
                  <div key={priority.species} className="p-2 rounded-lg bg-white/5 border border-white/5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${reasonColors[priority.reason]}`} />
                        <span className="text-sm font-medium text-white">{priority.commonName}</span>
                      </div>
                      <Badge variant="outline" size="sm" className="text-xs border-white/10 capitalize">
                        {priority.reason.replace('-', ' ')}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Conservation Hotspots */}
        <div className="p-6 pb-4 border-b border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-5 h-5 text-red-400" />
            <h4 className="text-lg font-bold text-white">Conservation Hotspots</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {analytics.hotspots.map((hotspot) => (
              <div key={hotspot.name} className="p-4 rounded-lg bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20">
                <div className="text-sm font-bold text-white mb-2">{hotspot.name}</div>
                <div className="text-xs text-slate-400 mb-2">{hotspot.district}</div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" size="sm" className="text-xs border-red-500/30 text-red-400">
                    <Shield className="w-3 h-3 mr-1" />
                    {hotspot.threatenedSpeciesCount} threatened
                  </Badge>
                </div>
                <div className="text-xs text-slate-500">
                  {hotspot.primaryThreats.slice(0, 2).join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Risk Drivers */}
        <div className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-orange-400" />
            <h4 className="text-lg font-bold text-white">Risk Driver Correlation</h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: 'Habitat Fragmentation', value: analytics.riskDrivers.habitatFragmentation, color: 'text-red-400' },
              { label: 'Hydrological Change', value: analytics.riskDrivers.hydrologicalChange, color: 'text-blue-400' },
              { label: 'Forest Fire', value: analytics.riskDrivers.forestFire, color: 'text-amber-400' },
              { label: 'Climate Change', value: analytics.riskDrivers.climateChange, color: 'text-orange-400' },
              { label: 'Human-Wildlife Conflict', value: analytics.riskDrivers.humanWildlifeConflict, color: 'text-violet-400' },
            ].map((driver) => (
              <div key={driver.label} className="text-center p-3 rounded-lg bg-white/5 border border-white/5">
                <div className={`text-2xl font-bold ${driver.color}`}>{driver.value}</div>
                <div className="text-xs text-slate-500 mt-1">{driver.label}</div>
                <div className="text-xs text-slate-600">species affected</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* CTA */}
        <div className="p-6 pt-4 border-t border-white/5">
          <Button
            variant="outline"
            className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10"
            icon={<ArrowRight className="w-5 h-5" />}
            onClick={onViewAll}
          >
            Explore All Threatened Species
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
