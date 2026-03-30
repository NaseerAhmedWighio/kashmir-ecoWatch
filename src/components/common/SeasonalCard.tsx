'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import * as Icons from 'lucide-react';
import { SeasonalLandscape, BloomZone, MigrationWindow, PollinatorWindow, PhenologyRecord, HabitatSignal, WaterTransition, SpeciesActivity, ClimateWindow, SeasonalReport } from '@/types/seasonal-ecology';

interface SeasonalCardProps {
  entity: SeasonalLandscape | BloomZone | MigrationWindow | PollinatorWindow | PhenologyRecord | HabitatSignal | WaterTransition | SpeciesActivity | ClimateWindow | SeasonalReport;
  variant?: 'landscape' | 'bloom' | 'migration' | 'pollinator' | 'phenology' | 'habitat' | 'water' | 'species' | 'climate' | 'report';
  onClick?: () => void;
}

const getIconForType = (iconName: string) => {
  const IconComponent = (Icons as any)[iconName] || Icons.Mountain;
  return <IconComponent className="w-5 h-5" />;
};

const getSeasonBadgeVariant = (season: string): 'default' | 'success' | 'warning' | 'danger' | 'info' => {
  const variants: { [key: string]: any } = {
    spring: 'success',
    summer: 'default',
    monsoon: 'info',
    autumn: 'warning',
    winter: 'default',
    'pre-spring': 'success',
  };
  return variants[season] || 'default';
};

export const SeasonalCard: React.FC<SeasonalCardProps> = ({ entity, variant = 'landscape', onClick }) => {
  const getColorForVariant = () => {
    const colors: { [key: string]: string } = {
      landscape: 'from-emerald-500 to-teal-600',
      bloom: 'from-pink-500 to-rose-600',
      migration: 'from-sky-500 to-blue-600',
      pollinator: 'from-amber-500 to-orange-600',
      phenology: 'from-violet-500 to-purple-600',
      habitat: 'from-green-500 to-emerald-600',
      water: 'from-cyan-500 to-blue-600',
      species: 'from-rose-500 to-red-600',
      climate: 'from-yellow-500 to-amber-600',
      report: 'from-slate-500 to-gray-600',
    };
    return colors[variant] || colors.landscape;
  };

  const getIconForVariant = () => {
    const iconMap: { [key: string]: string } = {
      landscape: 'Mountain',
      bloom: 'Flower2',
      migration: 'Bird',
      pollinator: 'Bug',
      phenology: 'Calendar',
      habitat: 'Radar',
      water: 'Droplets',
      species: 'PawPrint',
      climate: 'Sun',
      report: 'FileText',
    };
    return iconMap[variant] || 'Mountain';
  };

  const getName = () => {
    if ('name' in entity) return entity.name;
    if ('title' in entity) return entity.title;
    if ('speciesCommonName' in entity) return entity.speciesCommonName || entity.speciesName;
    return 'Unknown';
  };

  const getDescription = () => {
    if ('description' in entity) return entity.description;
    return '';
  };

  const getDistricts = () => {
    if ('districts' in entity) return entity.districts;
    if ('district' in entity) return [entity.district];
    if ('linkedDistricts' in entity) return entity.linkedDistricts;
    return [];
  };

  const getSeasons = () => {
    if ('primarySeasons' in entity) return entity.primarySeasons;
    if ('seasonalFocus' in entity) return entity.seasonalFocus;
    return [];
  };

  const getElevationZone = () => {
    if ('elevationZone' in entity) return entity.elevationZone;
    return null;
  };

  const getElevationRange = () => {
    if ('elevationRange' in entity && entity.elevationRange) {
      return `${entity.elevationRange.min}m - ${entity.elevationRange.max}m`;
    }
    return null;
  };

  const getTimingInfo = () => {
    if ('bloomWindow' in entity) return entity.bloomWindow.description;
    if ('activityWindow' in entity) return entity.activityWindow.description;
    if ('observedTiming' in entity) return entity.observedTiming.description;
    if ('seasonalTiming' in entity) return entity.seasonalTiming.description;
    if ('timingWindow' in entity) return entity.timingWindow.description;
    if ('arrivalWindow' in entity) return `Arrival: ${(entity as MigrationWindow).arrivalWindow?.description}`;
    return null;
  };

  const getAdditionalMetrics = () => {
    const metrics: { label: string; value: string }[] = [];

    if ('area' in entity && entity.area) {
      metrics.push({ label: 'Area', value: `${entity.area} km²` });
    }
    if ('populationEstimate' in entity && entity.populationEstimate) {
      metrics.push({ label: 'Population', value: entity.populationEstimate });
    }
    if ('peakBloomPeriod' in entity && entity.peakBloomPeriod) {
      metrics.push({ label: 'Peak Bloom', value: entity.peakBloomPeriod });
    }
    if ('verificationStatus' in entity && entity.verificationStatus) {
      metrics.push({ label: 'Status', value: entity.verificationStatus });
    }
    if ('windowType' in entity && entity.windowType) {
      metrics.push({ label: 'Window Type', value: entity.windowType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) });
    }
    if ('signalType' in entity && entity.signalType) {
      metrics.push({ label: 'Signal Type', value: entity.signalType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) });
    }
    if ('transitionType' in entity && entity.transitionType) {
      metrics.push({ label: 'Transition', value: entity.transitionType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) });
    }
    if ('activityType' in entity && entity.activityType) {
      metrics.push({ label: 'Activity', value: entity.activityType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) });
    }
    if ('reportType' in entity && entity.reportType) {
      metrics.push({ label: 'Report Type', value: entity.reportType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) });
    }
    if ('bloomType' in entity && entity.bloomType) {
      metrics.push({ label: 'Bloom Type', value: entity.bloomType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) });
    }
    if ('wetlandType' in entity && entity.wetlandType) {
      metrics.push({ label: 'Wetland Type', value: entity.wetlandType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) });
    }
    if ('migrationType' in entity && entity.migrationType) {
      metrics.push({ label: 'Migration Type', value: entity.migrationType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) });
    }
    if ('pollinatorGroup' in entity && entity.pollinatorGroup) {
      metrics.push({ label: 'Pollinator Group', value: entity.pollinatorGroup.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) });
    }
    if ('recordType' in entity && entity.recordType) {
      metrics.push({ label: 'Record Type', value: entity.recordType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) });
    }
    if ('waterbodyType' in entity && entity.waterbodyType) {
      metrics.push({ label: 'Waterbody Type', value: entity.waterbodyType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) });
    }
    if ('category' in entity && entity.category) {
      metrics.push({ label: 'Category', value: entity.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) });
    }
    if ('taxonomicGroup' in entity && entity.taxonomicGroup) {
      metrics.push({ label: 'Taxonomic Group', value: entity.taxonomicGroup.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) });
    }

    return metrics.slice(0, 2);
  };

  const name = getName();
  const description = getDescription();
  const districts = getDistricts();
  const seasons = getSeasons();
  const elevationRange = getElevationRange();
  const timingInfo = getTimingInfo();
  const additionalMetrics = getAdditionalMetrics();
  const variantColor = getColorForVariant();
  const variantIcon = getIconForVariant();

  return (
    <Card
      className="group relative overflow-hidden border border-white/5 bg-slate-900/50 card-intelligence cursor-pointer"
      onClick={onClick}
    >
      {/* Visual header with variant color accent */}
      <div className={`relative h-40 bg-gradient-to-br ${variantColor} opacity-20 group-hover:opacity-30 transition-opacity overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
        
        {/* Icon watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20">
          {getIconForType(variantIcon)}
        </div>

        {/* Type badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="info" size="sm" className="capitalize">
            {variant}
          </Badge>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-3 left-4 right-4">
          <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
            {name}
          </h3>
          {elevationRange && (
            <p className="text-xs text-slate-400 mt-0.5">{elevationRange}</p>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Description */}
        <p className="text-sm text-slate-400 line-clamp-2">
          {description}
        </p>

        {/* Districts */}
        {districts.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {districts.slice(0, 3).map((district, idx) => (
              <Badge key={idx} variant="info" size="sm">
                {district.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Badge>
            ))}
            {districts.length > 3 && (
              <Badge variant="info" size="sm">+{districts.length - 3}</Badge>
            )}
          </div>
        )}

        {/* Seasons */}
        {seasons.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {seasons.slice(0, 4).map((season, idx) => (
              <Badge key={idx} variant={getSeasonBadgeVariant(season)} size="sm">
                {season.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </Badge>
            ))}
          </div>
        )}

        {/* Metrics */}
        {additionalMetrics.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {additionalMetrics.map((metric, idx) => (
              <div key={idx} className="px-2 py-1 rounded-md bg-slate-800/50 border border-white/5">
                <span className="text-xs text-slate-500">{metric.label}: </span>
                <span className="text-xs text-white font-medium">{metric.value}</span>
              </div>
            ))}
          </div>
        )}

        {/* Timing Info */}
        {timingInfo && (
          <div className="pt-3 border-t border-white/5">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Icons.Calendar className="w-3.5 h-3.5" />
              <span className="line-clamp-1">{timingInfo}</span>
            </div>
          </div>
        )}

        {/* Hover CTA */}
        <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity pt-3 border-t border-white/5">
          <span>View Details</span>
          <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Card>
  );
};
