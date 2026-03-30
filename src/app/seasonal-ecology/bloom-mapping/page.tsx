import { SeasonalListingPage } from '@/components/common/SeasonalListingPage';
import { getSeasonalEcologyData } from '@/data/seasonal-ecology';

export default function BloomMappingPage() {
  const blooms = getSeasonalEcologyData.blooms.all();

  const districts = Array.from(new Set(blooms.flatMap(b => b.districts)));
  const elevationZones = Array.from(new Set(blooms.map(b => b.elevationZone)));
  const bloomTypes = Array.from(new Set(blooms.map(b => b.bloomType)));

  return (
    <SeasonalListingPage
      title="All Bloom Mapping"
      subtitle="Bloom zones and flowering landscapes across Kashmir"
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
  );
}
