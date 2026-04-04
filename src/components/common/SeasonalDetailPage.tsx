'use client';

import React, { useState } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import * as Icons from 'lucide-react';
import { SeasonalLandscape, BloomZone, MigrationWindow, PollinatorWindow, PhenologyRecord, HabitatSignal, WaterTransition, SpeciesActivity, ClimateWindow, SeasonalReport } from '@/types/seasonal-ecology';

interface SeasonalDetailPageProps {
  entity: SeasonalLandscape | BloomZone | MigrationWindow | PollinatorWindow | PhenologyRecord | HabitatSignal | WaterTransition | SpeciesActivity | ClimateWindow | SeasonalReport;
  variant: 'landscape' | 'bloom' | 'migration' | 'pollinator' | 'phenology' | 'habitat' | 'water' | 'species' | 'climate' | 'report';
  breadcrumbs: { label: string; href?: string }[];
  tabs: { id: string; label: string; icon: string }[];
  children: (activeTab: string) => React.ReactNode;
  relatedIntelligence?: { title: string; description: string; link: string; icon: string }[];
}

const formatLabel = (value: string) => {
  return value.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
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

export const SeasonalDetailPage: React.FC<SeasonalDetailPageProps> = ({
  entity,
  variant,
  breadcrumbs,
  tabs,
  children,
  relatedIntelligence = [],
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || 'overview');

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

  const getLongDescription = () => {
    if ('longDescription' in entity) return entity.longDescription;
    return getDescription();
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

  const getElevationInfo = () => {
    const zone = 'elevationZone' in entity ? entity.elevationZone : null;
    const range = 'elevationRange' in entity ? entity.elevationRange : null;
    return { zone, range };
  };

  const getQuickFacts = () => {
    const facts: { label: string; value: string }[] = [];

    if ('area' in entity && entity.area) {
      facts.push({ label: 'Area', value: `${entity.area} km²` });
    }
    if ('populationEstimate' in entity && entity.populationEstimate) {
      facts.push({ label: 'Population', value: entity.populationEstimate });
    }
    if ('peakBloomPeriod' in entity && entity.peakBloomPeriod) {
      facts.push({ label: 'Peak Bloom', value: entity.peakBloomPeriod });
    }
    if ('verificationStatus' in entity && entity.verificationStatus) {
      facts.push({ label: 'Status', value: formatLabel(entity.verificationStatus) });
    }
    if ('climateSensitivity' in entity && entity.climateSensitivity) {
      facts.push({ label: 'Climate Sensitivity', value: formatLabel(entity.climateSensitivity) });
    }
    if ('category' in entity && entity.category) {
      facts.push({ label: 'Category', value: formatLabel(entity.category) });
    }
    if ('bloomType' in entity && entity.bloomType) {
      facts.push({ label: 'Bloom Type', value: formatLabel(entity.bloomType) });
    }
    if ('wetlandType' in entity && entity.wetlandType) {
      facts.push({ label: 'Wetland Type', value: formatLabel(entity.wetlandType) });
    }
    if ('migrationType' in entity && entity.migrationType) {
      facts.push({ label: 'Migration Type', value: formatLabel(entity.migrationType) });
    }
    if ('pollinatorGroup' in entity && entity.pollinatorGroup) {
      facts.push({ label: 'Pollinator Group', value: formatLabel(entity.pollinatorGroup) });
    }
    if ('recordType' in entity && entity.recordType) {
      facts.push({ label: 'Record Type', value: formatLabel(entity.recordType) });
    }
    if ('signalType' in entity && entity.signalType) {
      facts.push({ label: 'Signal Type', value: formatLabel(entity.signalType) });
    }
    if ('transitionType' in entity && entity.transitionType) {
      facts.push({ label: 'Transition Type', value: formatLabel(entity.transitionType) });
    }
    if ('activityType' in entity && entity.activityType) {
      facts.push({ label: 'Activity Type', value: formatLabel(entity.activityType) });
    }
    if ('windowType' in entity && entity.windowType) {
      facts.push({ label: 'Window Type', value: formatLabel(entity.windowType) });
    }
    if ('reportType' in entity && entity.reportType) {
      facts.push({ label: 'Report Type', value: formatLabel(entity.reportType) });
    }
    if ('taxonomicGroup' in entity && entity.taxonomicGroup) {
      facts.push({ label: 'Taxonomic Group', value: formatLabel(entity.taxonomicGroup) });
    }
    if ('waterbodyType' in entity && entity.waterbodyType) {
      facts.push({ label: 'Waterbody Type', value: formatLabel(entity.waterbodyType) });
    }

    return facts;
  };

  const getTimingInfo = () => {
    const timingFields = [
      'bloomWindow', 'activityWindow', 'observedTiming', 'seasonalTiming',
      'timingWindow', 'arrivalWindow', 'departureWindow'
    ];
    
    for (const field of timingFields) {
      if (field in entity) {
        const timing = (entity as any)[field];
        if (timing?.description) return timing.description;
        if (timing?.startMonth && timing?.endMonth) {
          const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          return `${months[timing.startMonth - 1]} - ${months[timing.endMonth - 1]}`;
        }
      }
    }
    return null;
  };

  const name = getName();
  const description = getDescription();
  const longDescription = getLongDescription();
  const districts = getDistricts();
  const seasons = getSeasons();
  const elevationInfo = getElevationInfo();
  const quickFacts = getQuickFacts();
  const timingInfo = getTimingInfo();

  const getGradientForVariant = () => {
    const gradients: { [key: string]: string } = {
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
    return gradients[variant] || gradients.landscape;
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

  const IconComponent = (Icons as any)[getIconForVariant()] || Icons.Mountain;

  return (
    <main className="min-h-screen bg-slate-950">{/* Hero Section */}
      <div className="relative pt-48 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <Icons.ChevronRight className="w-4 h-4" />}
                {crumb.href ? (
                  <a href={crumb.href} className="hover:text-emerald-400 transition-colors">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-white">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Title Block */}
          <div className="flex items-start gap-4 mb-6">
            <div className={`p-3 rounded-xl bg-gradient-to-br ${getGradientForVariant()} border border-white/10`}>
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{name}</h1>
              <p className="text-slate-300">{description}</p>
            </div>
          </div>

          {/* Quick Facts Chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {quickFacts.slice(0, 6).map((fact, idx) => (
              <div key={idx} className="px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/50">
                <span className="text-xs text-slate-400">{fact.label}: </span>
                <span className="text-xs text-white font-medium">{fact.value}</span>
              </div>
            ))}
          </div>

          {/* Districts and Seasons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {districts.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {districts.slice(0, 5).map((district, idx) => (
                  <Badge key={idx} variant="info" size="sm">
                    {formatLabel(district)}
                  </Badge>
                ))}
                {districts.length > 5 && (
                  <Badge variant="info" size="sm">+{districts.length - 5}</Badge>
                )}
              </div>
            )}
            {seasons.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {seasons.map((season, idx) => (
                  <Badge key={idx} variant={getSeasonBadgeVariant(season)} size="sm">
                    {formatLabel(season)}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Timing Info */}
          {timingInfo && (
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <Icons.Calendar className="w-4 h-4" />
              <span>{timingInfo}</span>
            </div>
          )}

          {/* Elevation Info */}
          {elevationInfo.zone && (
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <Icons.Mountain className="w-4 h-4" />
              <span>{formatLabel(elevationInfo.zone)}</span>
              {elevationInfo.range && (
                <span className="text-slate-500">
                  ({elevationInfo.range.min}m - {elevationInfo.range.max}m)
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Sticky Tab Navigation */}
      <div className="sticky top-16 z-40 bg-slate-950/95 backdrop-blur-xl border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 overflow-x-auto py-2">
            {tabs.map((tab) => {
              const TabIcon = (Icons as any)[tab.icon] || Icons.FileText;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children(activeTab)}
      </div>

      {/* Related Intelligence */}
      {relatedIntelligence.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h2 className="text-xl font-semibold text-white mb-6">Related Intelligence</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedIntelligence.map((item, idx) => {
              const RelatedIcon = (Icons as any)[item.icon] || Icons.Link;
              return (
                <a
                  key={idx}
                  href={item.link}
                  className="group"
                >
                  <Card className="glass-intense border-slate-700/50 hover:border-emerald-500/30 transition-all h-full">
                    <div className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-slate-800/50 group-hover:bg-emerald-500/20 transition-colors">
                          <RelatedIcon className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* CTA Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Card className="glass-intense border-slate-700/50 bg-gradient-to-r from-emerald-950/50 to-teal-950/50">
          <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                Contribute to Seasonal Ecology Data
              </h3>
              <p className="text-sm text-slate-300">
                Help us document Kashmir's seasonal patterns through citizen science
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="md">
                <Icons.Upload className="w-4 h-4 mr-2" />
                Submit Observation
              </Button>
              <Button variant="primary" size="md">
                <Icons.FileText className="w-4 h-4 mr-2" />
                View Reports
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <AdvancedFooter />
    </main>
  );
};
