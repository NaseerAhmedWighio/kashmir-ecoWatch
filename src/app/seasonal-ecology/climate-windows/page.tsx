import { SeasonalListingPage } from '@/components/common/SeasonalListingPage';
import { getSeasonalEcologyData } from '@/data/seasonal-ecology';

export default function ClimateWindowsPage() {
  const windows = getSeasonalEcologyData.climateWindows.all();

  const districts = Array.from(new Set(windows.flatMap(c => c.districts)));
  const windowTypes = Array.from(new Set(windows.map(c => c.windowType)));

  return (
    <SeasonalListingPage
      title="All Seasonal Climate and Visibility Windows"
      subtitle="Climate-linked visibility and access windows across Kashmir"
      icon="Sun"
      color="from-yellow-500 to-amber-600"
      entities={windows}
      entityVariant="climate"
      metrics={[
        { label: 'Climate Windows', value: windows.length, icon: 'Sun' as const },
        { label: 'Access Windows', value: windows.filter(c => c.windowType.includes('access')).length, icon: 'Route' as const },
        { label: 'Observation Windows', value: windows.filter(c => c.windowType.includes('observation')).length, icon: 'Eye' as const },
        { label: 'Field Readiness', value: 'Variable', icon: 'ClipboardCheck' as const },
      ]}
      filters={{
        districts: districts as string[],
        elevationZones: ['lowland', 'mid-elevation', 'highland', 'alpine'],
        seasons: ['spring', 'summer', 'autumn', 'winter'],
        additionalFilters: [
          { label: 'Window Type', options: windowTypes as string[] },
        ],
      }}
      detailPageBaseRoute="/seasonal-ecology/climate-windows"
      mapPreviewEnabled
      mapCoordinates={{ lat: 34.0837, lng: 74.7973, zoom: 9 }}
    />
  );
}
