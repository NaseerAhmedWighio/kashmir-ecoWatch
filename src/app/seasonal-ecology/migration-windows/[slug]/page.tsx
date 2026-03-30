'use client';

import { useParams } from 'next/navigation';
import { SeasonalDetailPage } from '@/components/common/SeasonalDetailPage';
import { getSeasonalEcologyData } from '@/data/seasonal-ecology';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import * as Icons from 'lucide-react';

export default function MigrationWindowsDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const migration = getSeasonalEcologyData.migration.bySlug(slug);

  if (!migration) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Migration Window Not Found</h1>
          <p className="text-slate-400">The requested migration window could not be found.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'FileText' },
    { id: 'timing', label: 'Migration Timing', icon: 'Calendar' },
    { id: 'habitat', label: 'Habitat Features', icon: 'Trees' },
    { id: 'conservation', label: 'Conservation', icon: 'Shield' },
    { id: 'location', label: 'Location & Access', icon: 'MapPin' },
  ];

  const relatedIntelligence = [
    { title: 'Wetland Conservation', description: 'Wetland protection initiatives', link: '/water-systems', icon: 'Droplets' },
    { title: 'Bird Sightings', description: 'Field observation records', link: '/trails-sightings', icon: 'Bird' },
    { title: 'Protected Areas', description: 'Protected area network', link: '/protected-network', icon: 'Shield' },
  ];

  return (
    <SeasonalDetailPage
      entity={migration}
      variant="migration"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Seasonal Ecology', href: '/seasonal-ecology' },
        { label: 'Migration Windows', href: '/seasonal-ecology/migration-windows' },
        { label: migration.name },
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
                  <h2 className="text-xl font-semibold text-white mb-4">Migration Window Overview</h2>
                  <p className="text-slate-300 mb-6">{migration.longDescription}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-3">Primary Species</h3>
                      <div className="flex flex-wrap gap-2">
                        {migration.primarySpecies.map((species, idx) => (
                          <Badge key={idx} variant="default" size="sm">
                            {species}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-3">Migration Type</h3>
                      <Badge variant="info" size="md">
                        {migration.migrationType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                    </div>
                  </div>

                  {migration.populationEstimate && (
                    <div className="mt-6 pt-6 border-t border-slate-700/50">
                      <h3 className="text-sm font-semibold text-white mb-2">Population Estimate</h3>
                      <p className="text-slate-300">{migration.populationEstimate}</p>
                    </div>
                  )}
                </div>
              </Card>

              {/* Migration Calendar */}
              <Card className="glass-intense border-slate-700/50">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Migration Calendar</h3>
                  <div className="grid grid-cols-12 gap-2">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, idx) => {
                      const monthNum = idx + 1;
                      const isPresent = migration.peakPresenceMonths.includes(monthNum);
                      const isArrival = migration.arrivalWindow.startMonth <= monthNum && migration.arrivalWindow.endMonth >= monthNum;
                      const isDeparture = migration.departureWindow && migration.departureWindow.startMonth <= monthNum && migration.departureWindow.endMonth >= monthNum;
                      
                      let bgColor = 'bg-slate-800/50 text-slate-500';
                      if (isPresent) bgColor = 'bg-sky-500 text-white font-semibold';
                      else if (isArrival) bgColor = 'bg-sky-500/30 text-sky-300';
                      else if (isDeparture) bgColor = 'bg-amber-500/30 text-amber-300';
                      
                      return (
                        <div key={month} className={`text-center p-2 rounded-lg text-xs ${bgColor}`}>
                          <div className="mb-1">{month}</div>
                          {isPresent && <Icons.Bird className="w-3 h-3 mx-auto" />}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'timing' && (
            <div className="space-y-6">
              <Card className="glass-intense border-slate-700/50">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Migration Timing Details</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-2">Arrival Window</h3>
                      <p className="text-slate-300">{migration.arrivalWindow.description}</p>
                    </div>
                    
                    {migration.departureWindow && (
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-2">Departure Window</h3>
                        <p className="text-slate-300">{migration.departureWindow.description}</p>
                      </div>
                    )}

                    <div>
                      <h3 className="text-sm font-semibold text-white mb-2">Peak Presence</h3>
                      <p className="text-slate-300">
                        {migration.peakPresenceMonths.map(m => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][m - 1]).join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'habitat' && (
            <div className="space-y-6">
              <Card className="glass-intense border-slate-700/50">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Habitat Features</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-2">Wetland Type</h3>
                      <p className="text-slate-300">{migration.wetlandType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-white mb-2">Key Habitat Features</h3>
                      <div className="flex flex-wrap gap-2">
                        {migration.habitatFeatures.map((feature, idx) => (
                          <Badge key={idx} variant="default" size="sm">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {migration.birdingRoutes && migration.birdingRoutes.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-2">Birding Routes</h3>
                        <div className="flex flex-wrap gap-2">
                          {migration.birdingRoutes.map((route, idx) => (
                            <Badge key={idx} variant="info" size="sm">
                              {route}
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

          {activeTab === 'conservation' && (
            <div className="space-y-6">
              <Card className="glass-intense border-slate-700/50">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-4">Conservation Status</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-white mb-2">Threats</h3>
                      <div className="flex flex-wrap gap-2">
                        {migration.threats.map((threat, idx) => (
                          <Badge key={idx} variant="danger" size="sm">
                            {threat}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {migration.conservationMeasures && migration.conservationMeasures.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-2">Conservation Measures</h3>
                        <div className="flex flex-wrap gap-2">
                          {migration.conservationMeasures.map((measure, idx) => (
                            <Badge key={idx} variant="success" size="sm">
                              {measure}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="text-sm font-semibold text-white mb-2">Habitat Sensitivity Notes</h3>
                      <p className="text-slate-300">
                        Wetland habitats are sensitive to disturbance during migration periods. 
                        Maintain safe viewing distances and follow designated trails to minimize 
                        impact on bird behavior and habitat quality.
                      </p>
                    </div>
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
                      <h3 className="text-sm font-semibold text-white mb-2">District</h3>
                      <Badge variant="info" size="md">
                        {migration.district.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                    </div>

                    {migration.coordinates && (
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-2">Coordinates</h3>
                        <p className="text-slate-300">
                          {migration.coordinates.lat.toFixed(4)}°N, {migration.coordinates.lng.toFixed(4)}°E
                        </p>
                      </div>
                    )}

                    <div>
                      <h3 className="text-sm font-semibold text-white mb-2">Access Notes</h3>
                      <p className="text-slate-300">
                        Best viewing during early morning hours. Access may require permits for 
                        protected areas. Follow local guidelines and respect wildlife.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="glass-intense border-slate-700/50 overflow-hidden">
                <div className="relative h-64 bg-slate-800/50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Icons.Map className="w-12 h-12 text-slate-600 mx-auto mb-2" />
                      <p className="text-sm text-slate-400">Kashmir Region Map</p>
                      {migration.coordinates && (
                        <p className="text-xs text-slate-500 mt-1">
                          {migration.coordinates.lat.toFixed(4)}°N, {migration.coordinates.lng.toFixed(4)}°E
                        </p>
                      )}
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
