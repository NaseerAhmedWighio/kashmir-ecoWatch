// Habitat Intelligence Card Component
// Displays habitat system biodiversity with metrics and linkages

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { HabitatBiodiversity } from '@/data/biodiversity-intelligence';
import {
  Leaf, MapPin, Shield, AlertTriangle, TrendingUp,
  ArrowRight, Droplet, Mountain, Flower2
} from 'lucide-react';
import { motion } from 'framer-motion';

interface HabitatIntelligenceCardProps {
  habitat: HabitatBiodiversity;
  onClick?: (habitat: HabitatBiodiversity) => void;
}

const vulnerabilityColors = {
  low: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  medium: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  critical: 'bg-red-500/20 text-red-400 border-red-500/30'
};

const habitatIcons = {
  'forest-biodiversity': Leaf,
  'wetland-biodiversity': Droplet,
  'alpine-biodiversity': Mountain,
  'river-stream-biodiversity': Droplet,
  'meadow-grassland-biodiversity': Flower2
};

export function HabitatIntelligenceCard({ habitat, onClick }: HabitatIntelligenceCardProps) {
  const Icon = habitatIcons[habitat.slug as keyof typeof habitatIcons] || Leaf;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        className="glass-intense border-white/10 hover:border-emerald-500/30 transition-all overflow-hidden cursor-pointer group h-full"
        onClick={() => onClick?.(habitat)}
      >
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {habitat.name}
                </h3>
                <div className="text-xs text-slate-400">
                  {habitat.areaKm2.toLocaleString()} km² ({habitat.percentOfKashmir}%)
                </div>
              </div>
            </div>
            
            <Badge size="sm" className={vulnerabilityColors[habitat.vulnerabilityScore]}>
              <AlertTriangle className="w-3 h-3 mr-1" />
              {habitat.vulnerabilityScore}
            </Badge>
          </div>
          
          <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
            {habitat.description}
          </p>
        </div>
        
        {/* Species Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-center">
            <div className="text-lg font-bold text-white">{habitat.speciesCount.toLocaleString()}</div>
            <div className="text-xs text-slate-500">Species</div>
          </div>
          <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-center">
            <div className="text-lg font-bold text-amber-400">{habitat.threatenedSpecies}</div>
            <div className="text-xs text-slate-500">Threatened</div>
          </div>
          <div className="p-2 rounded-lg bg-white/5 border border-white/5 text-center">
            <div className="text-lg font-bold text-sky-400">{habitat.migratorySpecies}</div>
            <div className="text-xs text-slate-500">Migratory</div>
          </div>
        </div>
        
        {/* Taxonomic Breakdown */}
        <div className="mb-4">
          <div className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">
            Taxonomic Breakdown
          </div>
          <div className="space-y-2">
            {[
              { label: 'Mammals', value: habitat.byTaxonomicGroup.mammals, color: 'text-emerald-400' },
              { label: 'Birds', value: habitat.byTaxonomicGroup.birds, color: 'text-sky-400' },
              { label: 'Fish', value: habitat.byTaxonomicGroup.fish, color: 'text-cyan-400' },
              { label: 'Plants', value: habitat.byTaxonomicGroup.plants, color: 'text-green-400' },
              { label: 'Medicinal', value: habitat.byTaxonomicGroup.medicinalPlants, color: 'text-amber-400' },
            ].map((taxon) => (
              <div key={taxon.label} className="flex items-center justify-between text-sm">
                <span className="text-slate-400">{taxon.label}</span>
                <span className={`font-semibold ${taxon.color}`}>{taxon.value}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Districts */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-3 h-3 text-slate-500" />
            <span className="text-xs font-medium text-slate-500 uppercase">Districts</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {habitat.districts.slice(0, 4).map((district) => (
              <Badge key={district} variant="outline" size="sm" className="text-xs border-white/10 text-slate-400">
                {district}
              </Badge>
            ))}
            {habitat.districts.length > 4 && (
              <Badge variant="outline" size="sm" className="text-xs border-white/10 text-slate-500">
                +{habitat.districts.length - 4}
              </Badge>
            )}
          </div>
        </div>
        
        {/* Risk Drivers */}
        {habitat.riskDrivers.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-3 h-3 text-orange-400" />
              <span className="text-xs font-medium text-slate-500 uppercase">Threats</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {habitat.riskDrivers.slice(0, 3).map((driver, idx) => (
                <Badge key={idx} variant="outline" size="sm" className="text-xs border-orange-500/30 text-orange-400">
                  {driver}
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {/* Protected Area Overlap */}
        <div className="p-3 rounded-lg bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-slate-400">Protected Area</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-amber-400">{habitat.protectedAreaOverlap.toLocaleString()}</div>
              <div className="text-xs text-slate-500">km² overlap</div>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="flex items-center text-sm font-medium text-emerald-400 group-hover:text-emerald-300 transition-colors">
          <span>Explore {habitat.name.split(' ')[0]} Biodiversity</span>
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </div>
      </Card>
    </motion.div>
  );
}
