import { SeasonalListingPage } from '@/components/common/SeasonalListingPage';
import { getSeasonalEcologyData } from '@/data/seasonal-ecology';

export default function HabitatSignalsPage() {
  const signals = getSeasonalEcologyData.habitatSignals.all();

  const districts = Array.from(new Set(signals.flatMap(h => h.districts)));
  const signalTypes = Array.from(new Set(signals.map(h => h.signalType)));

  return (
    <SeasonalListingPage
      title="All Seasonal Habitat Signals"
      subtitle="Seasonal habitat changes and transitions across Kashmir"
      icon="Radar"
      color="from-green-500 to-emerald-600"
      entities={signals}
      entityVariant="habitat"
      metrics={[
        { label: 'Habitat Signals', value: signals.length, icon: 'Radar' as const },
        { label: 'Wetland Signals', value: signals.filter(h => h.signalType.includes('wetland')).length, icon: 'Waves' as const },
        { label: 'Forest Signals', value: signals.filter(h => h.signalType.includes('forest')).length, icon: 'Trees' as const },
        { label: 'Alpine Signals', value: signals.filter(h => h.elevationZone === 'alpine').length, icon: 'Mountain' as const },
      ]}
      filters={{
        districts: districts as string[],
        elevationZones: ['lowland', 'mid-elevation', 'highland', 'alpine', 'nival'],
        seasons: ['spring', 'summer', 'autumn', 'winter'],
        additionalFilters: [
          { label: 'Signal Type', options: signalTypes as string[] },
        ],
      }}
      detailPageBaseRoute="/seasonal-ecology/habitat-signals"
      mapPreviewEnabled
      mapCoordinates={{ lat: 34.1800, lng: 74.7500, zoom: 9 }}
    />
  );
}
