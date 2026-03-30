import { SeasonalListingPage } from '@/components/common/SeasonalListingPage';
import { getSeasonalEcologyData } from '@/data/seasonal-ecology';

export default function PollinatorWindowsPage() {
  const pollinators = getSeasonalEcologyData.pollinators.all();

  const districts = Array.from(new Set(pollinators.flatMap(p => p.districts)));
  const pollinatorGroups = Array.from(new Set(pollinators.map(p => p.pollinatorGroup)));

  return (
    <SeasonalListingPage
      title="All Pollinator Windows"
      subtitle="Pollinator activity timing across Kashmir ecosystems"
      icon="Bug"
      color="from-amber-500 to-orange-600"
      entities={pollinators}
      entityVariant="pollinator"
      metrics={[
        { label: 'Pollinator Windows', value: pollinators.length, icon: 'Bug' as const },
        { label: 'Bee Species', value: '47+', icon: 'Bug' as const },
        { label: 'Butterfly Species', value: '150+', icon: 'Bird' as const },
        { label: 'Orchard Coverage', value: '850 km²', icon: 'TreeDeciduous' as const },
      ]}
      filters={{
        districts: districts as string[],
        seasons: ['spring', 'summer'],
        additionalFilters: [
          { label: 'Pollinator Group', options: pollinatorGroups as string[] },
        ],
      }}
      detailPageBaseRoute="/seasonal-ecology/pollinator-windows"
      mapPreviewEnabled
      mapCoordinates={{ lat: 34.0500, lng: 74.8000, zoom: 9 }}
    />
  );
}
