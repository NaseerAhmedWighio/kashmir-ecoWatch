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
    <Card className="group border border-white/5 bg-slate-900/50 card-intelligence flex flex-col gap-3" padding="none">
      <div className="p-5 sm:p-6 flex flex-col gap-3">
        {/* Header: IUCN badge + Sensitive badge + taxon tag + hover actions */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-wrap gap-2 items-center min-w-0">
            <Badge
              variant={getConservationStatusBadge(species.conservationStatus)}
              size="sm"
              className="text-xs font-bold px-2 py-0.5 rounded whitespace-nowrap"
            >
              {species.conservationStatus}
            </Badge>
            {species.sensitivity === 'critical' || species.sensitivity === 'high' ? (
              <Badge
                variant="default"
                size="sm"
                className="text-xs px-2 py-0.5 rounded whitespace-nowrap bg-red-500/20 text-red-400 border border-red-500/30"
              >
                <Shield className="w-3 h-3 mr-1" />
                Sensitive
              </Badge>
            ) : null}
            <span className="text-xs capitalize">{species.taxonomicGroup.replace('-', ' ')}</span>
          </div>
          <div className="flex gap-1 flex-shrink-0">
            <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
              <Heart className="w-4 h-4 text-slate-400" />
            </button>
            <button className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
              <Share2 className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Species name */}
        <h3 className="text-base sm:text-lg font-semibold text-white">{species.commonName}</h3>

        {/* Scientific name */}
        <p className="text-xs italic text-slate-400">{species.scientificName}</p>

        {/* Mini stats: districts / habitats / sightings */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 text-xs sm:text-sm text-slate-400">
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
        <p className="text-sm leading-relaxed text-slate-400 line-clamp-4">
          {species.description}
        </p>

        {/* Elevation range */}
        <div className="text-xs flex items-center gap-1 text-slate-500">
          <span>Elevation: {species.elevationRange.min}m - {species.elevationRange.max}m</span>
        </div>

        {/* Primary Threats */}
        {species.threats && species.threats.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {species.threats.slice(0, 3).map((threat, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-0.5 rounded whitespace-nowrap bg-slate-700/50 text-slate-300"
              >
                {threat}
              </span>
            ))}
            {species.threats.length > 3 && (
              <span className="text-xs px-2 py-0.5 rounded whitespace-nowrap bg-slate-700/50 text-slate-300">
                +{species.threats.length - 3}
              </span>
            )}
          </div>
        )}

        {/* View Details */}
        <Button
          onClick={() => window.location.href = `/biodiversity/species/${species.slug}`}
          className="w-full py-2 text-sm rounded-lg mt-auto bg-gradient-to-r from-forest-600 to-forest-500"
          icon={<ArrowRight className="w-4 h-4" />}
        >
          View Details
        </Button>
      </div>
    </Card>
  );
}
