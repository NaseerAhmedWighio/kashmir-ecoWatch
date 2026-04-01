import { SeasonalListingPage } from '@/components/common/SeasonalListingPage';
import { getSeasonalEcologyData } from '@/data/seasonal-ecology';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Waves, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function BloomMappingPage() {
  const blooms = getSeasonalEcologyData.blooms.all();

  const districts = Array.from(new Set(blooms.flatMap(b => b.districts)));
  const elevationZones = Array.from(new Set(blooms.map(b => b.elevationZone)));
  const bloomTypes = Array.from(new Set(blooms.map(b => b.bloomType)));

  return (
    <main className="min-h-screen  mx-auto bg-slate-950">
      <SeasonalListingPage
        title="All Bloom Mapping"
        subtitle="Floral bloom zones and flowering landscapes across Kashmir"
        icon="Flower2"
        color="from-pink-500 to-rose-600"
        entities={blooms}
        entityVariant="bloom"
        metrics={[
          { label: 'Bloom Zones', value: blooms.length, icon: 'Flower2' },
          { label: 'Orchard Blooms', value: blooms.filter(b => b.bloomType === 'orchard').length, icon: 'TreeDeciduous' },
          { label: 'Alpine Blooms', value: blooms.filter(b => b.bloomType === 'alpine-meadow').length, icon: 'Mountain' },
          { label: 'Medicinal Plants', value: blooms.filter(b => b.bloomType === 'medicinal-plant').length, icon: 'Leaf' },
        ]}
        filters={{
          districts: districts as string[],
          elevationZones: elevationZones as string[],
          seasons: ['spring', 'summer'],
          additionalFilters: [
            { label: 'Bloom Type', options: bloomTypes as string[] },
          ],
        }}
        detailPageBaseRoute="/seasonal-ecology/bloom-mapping"
        mapPreviewEnabled
        mapCoordinates={{ lat: 34.0667, lng: 74.8056, zoom: 10 }}
      />

      {/* Cross-Link Card: Algal Bloom Monitoring */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Link href="/risk-monitoring/algal-bloom-monitoring">
          <Card className="glass-intense border-emerald-500/30 hover:border-emerald-500/50 transition-all cursor-pointer group overflow-hidden">
            <div className="relative p-6 md:p-8">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/50 via-teal-950/50 to-slate-950/50" />
              <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl">
                    <Waves className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge variant="outline" className="border-emerald-500/50 text-emerald-400">
                      Related Intelligence
                    </Badge>
                    <Badge variant="info" size="sm">
                      Water Systems
                    </Badge>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    Looking for Lake Algal Bloom & Eutrophication Signals?
                  </h3>
                  <p className="text-slate-300 mb-4 max-w-3xl">
                    Not all bloom signals are floral. For lake eutrophication, water-surface bloom events, 
                    and water quality stress monitoring across Dal Lake, Wular Lake, Manasbal Lake, and other 
                    Kashmir water bodies, see our Algal Bloom Monitoring system.
                  </p>
                  <div className="flex items-center gap-2 text-emerald-400 font-medium">
                    <span>View Algal Bloom Monitoring</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex flex-shrink-0 items-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center group-hover:bg-emerald-500/30 transition-all">
                    <ArrowRight className="w-6 h-6 text-emerald-400" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </main>
  );
}
