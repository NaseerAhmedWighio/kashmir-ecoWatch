'use client';

import { useParams } from 'next/navigation';
import { SeasonalDetailPage } from '@/components/common/SeasonalDetailPage';
import { getSeasonalEcologyData } from '@/data/seasonal-ecology';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import * as Icons from 'lucide-react';

export default function SeasonalEcologyGenericDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const pathSegment = params['*']?.[0] || 'phenology-records';

  // Try to find entity in different data collections
  let entity: any = null;
  let variant: any = 'phenology';
  let title = '';
  let baseRoute = '';

  // Check each collection
  entity = getSeasonalEcologyData.phenology.bySlug(slug);
  if (entity) { variant = 'phenology'; title = 'Phenology Records'; baseRoute = '/seasonal-ecology/phenology-records'; }

  if (!entity) { entity = getSeasonalEcologyData.habitatSignals.bySlug(slug);
    if (entity) { variant = 'habitat'; title = 'Habitat Signals'; baseRoute = '/seasonal-ecology/habitat-signals'; }
  }

  if (!entity) { entity = getSeasonalEcologyData.waterTransitions.bySlug(slug);
    if (entity) { variant = 'water'; title = 'Water Transitions'; baseRoute = '/seasonal-ecology/water-transitions'; }
  }

  if (!entity) { entity = getSeasonalEcologyData.speciesActivity.bySlug(slug);
    if (entity) { variant = 'species'; title = 'Species Activity'; baseRoute = '/seasonal-ecology/species-activity'; }
  }

  if (!entity) { entity = getSeasonalEcologyData.climateWindows.bySlug(slug);
    if (entity) { variant = 'climate'; title = 'Climate Windows'; baseRoute = '/seasonal-ecology/climate-windows'; }
  }

  if (!entity) { entity = getSeasonalEcologyData.reports.bySlug(slug);
    if (entity) { variant = 'report'; title = 'Reports & References'; baseRoute = '/seasonal-ecology/reports-references'; }
  }

  if (!entity) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Entity Not Found</h1>
          <p className="text-slate-400">The requested entity could not be found.</p>
        </div>
      </div>
    );
  }

  const getTabsForVariant = () => {
    switch (variant) {
      case 'phenology':
        return [
          { id: 'overview', label: 'Overview', icon: 'FileText' },
          { id: 'timing', label: 'Observed Timing', icon: 'Calendar' },
          { id: 'verification', label: 'Verification', icon: 'CheckCircle' },
          { id: 'location', label: 'Location', icon: 'MapPin' },
        ];
      case 'habitat':
        return [
          { id: 'overview', label: 'Overview', icon: 'FileText' },
          { id: 'drivers', label: 'Ecological Drivers', icon: 'Radar' },
          { id: 'monitoring', label: 'Monitoring', icon: 'Activity' },
          { id: 'location', label: 'Location', icon: 'MapPin' },
        ];
      case 'water':
        return [
          { id: 'overview', label: 'Overview', icon: 'FileText' },
          { id: 'hydrology', label: 'Hydrology', icon: 'Droplets' },
          { id: 'ecology', label: 'Ecological Impacts', icon: 'Leaf' },
          { id: 'location', label: 'Location', icon: 'MapPin' },
        ];
      case 'species':
        return [
          { id: 'overview', label: 'Overview', icon: 'FileText' },
          { id: 'activity', label: 'Activity Patterns', icon: 'Activity' },
          { id: 'habitat', label: 'Habitat', icon: 'Trees' },
          { id: 'location', label: 'Location', icon: 'MapPin' },
        ];
      case 'climate':
        return [
          { id: 'overview', label: 'Overview', icon: 'FileText' },
          { id: 'conditions', label: 'Conditions', icon: 'Cloud' },
          { id: 'access', label: 'Access & Readiness', icon: 'Route' },
          { id: 'location', label: 'Location', icon: 'MapPin' },
        ];
      case 'report':
        return [
          { id: 'overview', label: 'Overview', icon: 'FileText' },
          { id: 'metadata', label: 'Metadata', icon: 'Database' },
          { id: 'citation', label: 'Citation', icon: 'Quote' },
          { id: 'related', label: 'Related', icon: 'Link' },
        ];
      default:
        return [
          { id: 'overview', label: 'Overview', icon: 'FileText' },
          { id: 'details', label: 'Details', icon: 'FileText' },
          { id: 'location', label: 'Location', icon: 'MapPin' },
        ];
    }
  };

  const getRelatedIntelligence = () => {
    const base = [
      { title: 'Seasonal Ecology Hub', description: 'Explore all seasonal data', link: '/seasonal-ecology', icon: 'Calendar' },
      { title: 'Biodiversity', description: 'Species information', link: '/biodiversity', icon: 'PawPrint' },
      { title: 'Water Systems', description: 'Hydrological data', link: '/water-systems', icon: 'Droplets' },
    ];
    return base;
  };

  const renderTabContent = (activeTab: string) => {
    if (variant === 'phenology') {
      const record = entity as any;
      return (
        <>
          {activeTab === 'overview' && (
            <Card className="glass-intense border-slate-700/50">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Phenology Record Overview</h2>
                <p className="text-slate-300 mb-6">{record.longDescription}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Species</h3>
                    <p className="text-slate-300">{record.speciesCommonName || record.speciesName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">Record Type</h3>
                    <Badge variant="default" size="md">{record.recordType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</Badge>
                  </div>
                </div>
              </div>
            </Card>
          )}
          {activeTab === 'timing' && (
            <Card className="glass-intense border-slate-700/50">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Observed Timing</h2>
                <p className="text-slate-300 mb-4">{record.observedTiming.description}</p>
                {record.historicalBaseline && (
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-white mb-2">Historical Baseline</h3>
                    <p className="text-slate-300">{record.historicalBaseline}</p>
                  </div>
                )}
              </div>
            </Card>
          )}
          {activeTab === 'verification' && (
            <Card className="glass-intense border-slate-700/50">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Verification Status</h2>
                <Badge variant={record.verificationStatus === 'verified' ? 'success' : 'info'} size="lg">
                  {record.verificationStatus.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-white mb-2">Data Sources</h3>
                  <div className="flex flex-wrap gap-2">
                    {record.dataSources.map((source: string, idx: number) => (
                      <Badge key={idx} variant="default" size="sm">{source}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}
          {activeTab === 'location' && renderLocationCard(entity)}
        </>
      );
    }

    if (variant === 'habitat') {
      const signal = entity as any;
      return (
        <>
          {activeTab === 'overview' && (
            <Card className="glass-intense border-slate-700/50">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Habitat Signal Overview</h2>
                <p className="text-slate-300 mb-6">{signal.longDescription}</p>
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3">Signal Type</h3>
                  <Badge variant="default" size="md">{signal.signalType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</Badge>
                </div>
              </div>
            </Card>
          )}
          {activeTab === 'drivers' && (
            <Card className="glass-intense border-slate-700/50">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Ecological Drivers</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-2">Ecological Drivers</h3>
                    <div className="flex flex-wrap gap-2">
                      {signal.ecologicalDrivers.map((driver: string, idx: number) => (
                        <Badge key={idx} variant="default" size="sm">{driver}</Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-2">Climate Indicators</h3>
                    <div className="flex flex-wrap gap-2">
                      {signal.climateIndicators.map((indicator: string, idx: number) => (
                        <Badge key={idx} variant="info" size="sm">{indicator}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
          {activeTab === 'monitoring' && (
            <Card className="glass-intense border-slate-700/50">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-white mb-4">Monitoring Parameters</h2>
                <div className="flex flex-wrap gap-2">
                  {signal.monitoringParameters?.map((param: string, idx: number) => (
                    <Badge key={idx} variant="default" size="sm">{param}</Badge>
                  )) || <span className="text-slate-400">No monitoring parameters specified</span>}
                </div>
              </div>
            </Card>
          )}
          {activeTab === 'location' && renderLocationCard(entity)}
        </>
      );
    }

    // Default content for other variants
    return (
      <Card className="glass-intense border-slate-700/50">
        <div className="p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Details</h2>
          <p className="text-slate-300">{entity.longDescription || entity.description}</p>
        </div>
      </Card>
    );
  };

  const renderLocationCard = (ent: any) => (
    <Card className="glass-intense border-slate-700/50">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Location</h2>
        <div className="space-y-4">
          {ent.districts && ent.districts.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-white mb-2">Districts</h3>
              <div className="flex flex-wrap gap-2">
                {ent.districts.map((d: string, idx: number) => (
                  <Badge key={idx} variant="info" size="sm">{d.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</Badge>
                ))}
              </div>
            </div>
          )}
          {ent.district && (
            <div>
              <h3 className="text-sm font-semibold text-white mb-2">District</h3>
              <Badge variant="info" size="md">{ent.district.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</Badge>
            </div>
          )}
          {ent.coordinates && (
            <div>
              <h3 className="text-sm font-semibold text-white mb-2">Coordinates</h3>
              <p className="text-slate-300">{ent.coordinates.lat.toFixed(4)}°N, {ent.coordinates.lng.toFixed(4)}°E</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );

  return (
    <SeasonalDetailPage
      entity={entity}
      variant={variant}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Seasonal Ecology', href: '/seasonal-ecology' },
        { label: title, href: baseRoute },
        { label: entity.name || entity.title },
      ]}
      tabs={getTabsForVariant()}
      relatedIntelligence={getRelatedIntelligence()}
    >
      {renderTabContent}
    </SeasonalDetailPage>
  );
}
