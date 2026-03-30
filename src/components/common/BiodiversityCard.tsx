'use client';

import React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  MapPin, Activity, Shield, TrendingUp, ExternalLink, 
  Heart, Share2, Eye, ArrowRight
} from 'lucide-react';
import type { BiodiversitySpecies } from '@/data/biodiversity';

interface BiodiversityCardProps {
  species: BiodiversitySpecies;
  onQuickView?: (species: BiodiversitySpecies) => void;
  variant?: 'default' | 'compact' | 'featured';
}

export function BiodiversityCard({ species, onQuickView, variant = 'default' }: BiodiversityCardProps) {
  const getConservationStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      CR: 'bg-red-500',
      EN: 'bg-red-400',
      VU: 'bg-amber-500',
      NT: 'bg-yellow-500',
      LC: 'bg-emerald-500',
    };
    return colors[status] || 'bg-slate-500';
  };

  const getConservationStatusBadge = (status: string) => {
    const variants: Record<string, 'danger' | 'warning' | 'info' | 'success'> = {
      CR: 'danger',
      EN: 'danger',
      VU: 'warning',
      NT: 'info',
      LC: 'success',
    };
    return variants[status] || 'info';
  };

  if (variant === 'compact') {
    return (
      <Card className="group border border-white/5 bg-slate-900/50 card-intelligence" padding="sm">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-500/20 to-slate-800/50 flex items-center justify-center flex-shrink-0">
            <Activity className="w-8 h-8 text-purple-400" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <div className={`w-2 h-2 rounded-full ${getConservationStatusColor(species.conservationStatus)}`} />
              <h3 className="font-semibold text-white truncate">{species.commonName}</h3>
            </div>
            <p className="text-xs text-slate-500 italic truncate">{species.scientificName}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onQuickView?.(species)}
            className="text-slate-400 hover:text-forest-400"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group overflow-hidden border border-white/5 bg-slate-900/50 card-intelligence" padding="none">
      {/* Visual header */}
      <div className="relative h-48 bg-gradient-to-br from-purple-500/20 to-slate-800/50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
        
        {/* Conservation status badge */}
        <div className="absolute top-4 left-4 z-10">
          <Badge variant={getConservationStatusBadge(species.conservationStatus)} size="sm">
            {species.conservationStatus}
          </Badge>
        </div>

        {/* Sensitivity indicator */}
        {species.sensitivity === 'critical' || species.sensitivity === 'high' ? (
          <div className="absolute top-4 right-4 z-10">
            <Badge variant="default" size="sm" className="bg-red-500/20 text-red-400 border border-red-500/30">
              <Shield className="w-3 h-3 mr-1" />
              Sensitive
            </Badge>
          </div>
        ) : null}

        {/* Taxonomic group */}
        <div className="absolute bottom-20 left-4 right-4 z-10">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="info" size="sm" className="capitalize">
              {species.taxonomicGroup.replace('-', ' ')}
            </Badge>
            {species.category && (
              <Badge variant="default" size="sm">
                {species.category}
              </Badge>
            )}
          </div>
          <h3 className="text-xl font-bold text-white mb-1">{species.commonName}</h3>
          <p className="text-sm text-slate-400 italic">{species.scientificName}</p>
        </div>

        {/* Hover actions */}
        <div className={`absolute top-4 right-4 z-10 flex gap-2 transition-opacity duration-300 ${
          'opacity-0 group-hover:opacity-100'
        }`}>
          <button className="p-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
            <Heart className="w-4 h-4 text-white" />
          </button>
          <button className="p-2 rounded-lg bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors">
            <Share2 className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Quick metrics */}
        <div className="flex items-center gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{species.districts.length} districts</span>
          </div>
          <div className="flex items-center gap-1">
            <Activity className="w-4 h-4" />
            <span>{species.habitats.length} habitats</span>
          </div>
          {species.verifiedSightings && (
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{species.verifiedSightings} sightings</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-slate-400 line-clamp-2">
          {species.description}
        </p>

        {/* Elevation range */}
        <div className="p-3 rounded-lg glass-light border border-white/5">
          <div className="text-xs text-slate-500 uppercase mb-1">Elevation Range</div>
          <div className="text-sm text-white font-medium">
            {species.elevationRange.min}m - {species.elevationRange.max}m
          </div>
        </div>

        {/* Threats preview */}
        {species.threats && species.threats.length > 0 && (
          <div>
            <div className="text-xs text-slate-500 uppercase mb-2">Primary Threats</div>
            <div className="flex flex-wrap gap-2">
              {species.threats.slice(0, 3).map((threat, idx) => (
                <Badge key={idx} variant="default" size="sm">
                  {threat}
                </Badge>
              ))}
              {species.threats.length > 3 && (
                <Badge variant="default" size="sm">+{species.threats.length - 3}</Badge>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/5">
          <Button
            onClick={() => window.location.href = `/biodiversity/species/${species.slug}`}
            className="flex-1 bg-gradient-to-r from-forest-600 to-forest-500"
            size="sm"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            View Details
          </Button>
          <button
            onClick={() => onQuickView?.(species)}
            className="p-2 rounded-lg glass-light border border-white/10 hover:border-forest-500/50 transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>
    </Card>
  );
}
