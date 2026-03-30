import { SeasonalListingPage } from '@/components/common/SeasonalListingPage';
import { getSeasonalEcologyData, seasonalEcologyMetrics } from '@/data/seasonal-ecology';

export default function SeasonalLandscapesPage() {
  const landscapes = getSeasonalEcologyData.landscapes.all();

  const districts = Array.from(new Set(landscapes.flatMap(l => l.districts)));
  const elevationZones = Array.from(new Set(landscapes.map(l => l.elevationZone)));
  const seasons = Array.from(new Set(landscapes.flatMap(l => l.primarySeasons)));

  return (
    <SeasonalListingPage
      title="All Seasonal Landscapes"
      subtitle="Landscape-scale seasonal patterns across Kashmir"
      icon="Mountain"
      color="from-emerald-500 to-teal-600"
      entities={landscapes}
      entityVariant="landscape"
      metrics={seasonalEcologyMetrics.slice(0, 4)}
      filters={{
        districts: districts as string[],
        elevationZones: elevationZones as string[],
        seasons: seasons as string[],
      }}
      detailPageBaseRoute="/seasonal-ecology/seasonal-landscapes"
      mapPreviewEnabled
      mapCoordinates={{ lat: 34.0837, lng: 74.7973, zoom: 9 }}
    />
  );
}
