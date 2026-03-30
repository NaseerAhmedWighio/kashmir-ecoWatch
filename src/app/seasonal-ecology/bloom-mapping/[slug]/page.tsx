'use client';

import { useParams } from 'next/navigation';
import { SeasonalDetailPage } from '@/components/common/SeasonalDetailPage';
import { getSeasonalEcologyData } from '@/data/seasonal-ecology';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import * as Icons from 'lucide-react';

export default function BloomMappingDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const bloom = getSeasonalEcologyData.blooms.bySlug(slug);

  if (!bloom) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Bloom Zone Not Found</h1>
          <p className="text-slate-400">The requested bloom zone could not be found.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'FileText' },
    { id: 'timing', label: 'Bloom Timing', icon: 'Calendar' },
    { id: 'ecology', label: 'Ecological Context', icon: 'Leaf' },
    { id: 'location', label: 'Location & Access', icon: 'MapPin' },
    { id: 'related', label: 'Related Intelligence', icon: 'Link' },
  ];

  const relatedIntelligence = [
    {
      title: 'Orchard Bloom Belts',
      description: 'Explore related orchard bloom landscapes',
      link: '/seasonal-ecology/bloom-mapping/valley-orchard-bloom-belt',
      icon: 'TreeDeciduous',
    },
    {
      title: 'Pollinator Windows',
      description: 'View associated pollinator activity',
      link: '/seasonal-ecology/pollinator-windows',
      icon: 'Bug',
    },
    {
      title: 'Seasonal Landscapes',
      description: 'Related landscape-scale patterns',
      link: '/seasonal-ecology/seasonal-landscapes',
      icon: 'Mountain',
    },
  ];

  return (
    <SeasonalDetailPage
      entity={bloom}
      variant="bloom"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Seasonal Ecology', href: '/seasonal-ecology' },
        { label: 'Bloom Mapping', href: '/seasonal-ecology/bloom-mapping' },
        { label: bloom.name },
      ]}
      tabs={tabs}
      relatedIntelligence={relatedIntelligence}
    >
      {(activeTab) => (
        <>
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <Card className="glass-intense border-slate-700/50">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Bloom Zone Overview</h2>
                  <p className="text-slate-300 mb-6">{bloom.longDescription}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-3">Primary Species</h3>
                      <div className="flex flex-wrap gap-2">
                        {bloom.primarySpecies.map((species, idx) => (
                          <Badge key={idx} variant="default" size="sm">
                            {species}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-3">Pollinators</h3>
                      <div className="flex flex-wrap gap-2">
                        {bloom.pollinators?.map((pollinator, idx) => (
                          <Badge key={idx} variant="info" size="sm">
                            {pollinator}
                          </Badge>
                        )) || <span className="text-slate-400 text-sm">No pollinator data available</span>}
                      </div>
                    </div>
                  </div>

                  {bloom.culturalSignificance && (
                    <div className="mt-6 pt-6 border-t border-slate-700/50">
                      <h3 className="text-sm font-semibold text-white mb-2">Cultural Significance</h3>
                      <p className="text-sm text-slate-300">{bloom.culturalSignificance}</p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Bloom Calendar Strip */}
              <Card className="glass-intense border-slate-700/50">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Bloom Calendar</h3>
                  <div className="grid grid-cols-12 gap-2">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, idx) => {
                      const monthNum = idx + 1;
                      const isBloomMonth = monthNum >= bloom.bloomWindow.startMonth && monthNum <= bloom.bloomWindow.endMonth;
                      const isPeakMonth = bloom.bloomWindow.peakMonths?.includes(monthNum);
                      
                      return (
                        <div
                          key={month}
                          className={`text-center p-2 rounded-lg text-xs ${
                            isPeakMonth
                              ? 'bg-pink-500 text-white font-semibold'
                              : isBloomMonth
                              ? 'bg-pink-500/30 text-pink-300'
                              : 'bg-slate-800/50 text-slate-500'
                          }`}
                        >
                          <div className="mb-1">{month}</div>
                          {isPeakMonth && <Icons.Flower2 className="w-3 h-3 mx-auto" />}
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-xs text-slate-400 mt-3 text-center">
                    Peak Bloom: {bloom.peakBloomPeriod}
                  </p>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'timing' && (
            <div className="space-y-6">
              <Card className="glass-intense border-slate-700/50">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Bloom Timing Details</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-2">Bloom Window</h3>
                      <p className="text-slate-300">{bloom.bloomWindow.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-2">Peak Bloom Period</h3>
                      <p className="text-slate-300">{bloom.peakBloomPeriod}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-white mb-2">Elevation Range</h3>
                      <p className="text-slate-300">
                        {bloom.elevationRange?.min}m - {bloom.elevationRange?.max}m ({bloom.elevationZone})
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-white mb-2">Phenological Notes</h3>
                      <p className="text-slate-300">
                        Bloom timing varies by elevation, aspect, and annual weather conditions. 
                        Early season blooms may be affected by late frosts. Climate change is causing 
                        gradual shifts in bloom timing across Kashmir.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'ecology' && (
            <div className="space-y-6">
              <Card className="glass-intense border-slate-700/50">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Ecological Context</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-2">Ecological Role</h3>
                      <p className="text-slate-300">{bloom.ecologicalRole}</p>
                    </div>

                    {bloom.linkedLandscapes && bloom.linkedLandscapes.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-2">Linked Landscapes</h3>
                        <div className="flex flex-wrap gap-2">
                          {bloom.linkedLandscapes.map((landscape, idx) => (
                            <Badge key={idx} variant="default" size="sm">
                              {landscape}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {bloom.linkedTrails && bloom.linkedTrails.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-2">Associated Trails</h3>
                        <div className="flex flex-wrap gap-2">
                          {bloom.linkedTrails.map((trail, idx) => (
                            <Badge key={idx} variant="info" size="sm">
                              {trail}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'location' && (
            <div className="space-y-6">
              <Card className="glass-intense border-slate-700/50">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Location & Access</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-2">Districts</h3>
                      <div className="flex flex-wrap gap-2">
                        {bloom.districts.map((district, idx) => (
                          <Badge key={idx} variant="info" size="sm">
                            {district.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-white mb-2">Elevation Zone</h3>
                      <p className="text-slate-300">
                        {bloom.elevationZone.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        {bloom.elevationRange && ` (${bloom.elevationRange.min}m - ${bloom.elevationRange.max}m)`}
                      </p>
                    </div>

                    {bloom.coordinates && (
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-2">Coordinates</h3>
                        <p className="text-slate-300">
                          {bloom.coordinates.lat.toFixed(4)}°N, {bloom.coordinates.lng.toFixed(4)}°E
                        </p>
                      </div>
                    )}

                    <div>
                      <h3 className="text-sm font-semibold text-white mb-2">Access Notes</h3>
                      <p className="text-slate-300">
                        Access varies by season. Spring bloom period offers best viewing conditions. 
                        Some high-elevation bloom zones require trekking permits.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Map Placeholder */}
              <Card className="glass-intense border-slate-700/50 overflow-hidden">
                <div className="relative h-64 bg-slate-800/50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Icons.Map className="w-12 h-12 text-slate-600 mx-auto mb-2" />
                      <p className="text-sm text-slate-400">Kashmir Region Map</p>
                      {bloom.coordinates && (
                        <p className="text-xs text-slate-500 mt-1">
                          {bloom.coordinates.lat.toFixed(4)}°N, {bloom.coordinates.lng.toFixed(4)}°E
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'related' && (
            <div className="space-y-6">
              <Card className="glass-intense border-slate-700/50">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Related Intelligence</h2>
                  <p className="text-slate-300 mb-6">
                    Explore connected seasonal ecology modules and cross-referenced data.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                      <div className="flex items-center gap-3 mb-2">
                        <Icons.Bug className="w-5 h-5 text-amber-400" />
                        <h3 className="text-sm font-semibold text-white">Pollinator Windows</h3>
                      </div>
                      <p className="text-xs text-slate-400">
                        View associated pollinator activity timing for this bloom zone.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                      <div className="flex items-center gap-3 mb-2">
                        <Icons.Mountain className="w-5 h-5 text-emerald-400" />
                        <h3 className="text-sm font-semibold text-white">Seasonal Landscapes</h3>
                      </div>
                      <p className="text-xs text-slate-400">
                        Explore landscape-scale seasonal patterns in this region.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                      <div className="flex items-center gap-3 mb-2">
                        <Icons.Calendar className="w-5 h-5 text-violet-400" />
                        <h3 className="text-sm font-semibold text-white">Phenology Records</h3>
                      </div>
                      <p className="text-xs text-slate-400">
                        View detailed phenological observation records.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700/50">
                      <div className="flex items-center gap-3 mb-2">
                        <Icons.Map className="w-5 h-5 text-sky-400" />
                        <h3 className="text-sm font-semibold text-white">Trails & Sightings</h3>
                      </div>
                      <p className="text-xs text-slate-400">
                        Find trails and field observation opportunities.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}
        </>
      )}
    </SeasonalDetailPage>
  );
}
