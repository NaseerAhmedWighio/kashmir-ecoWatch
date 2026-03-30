import { SeasonalListingPage } from '@/components/common/SeasonalListingPage';
import { getSeasonalEcologyData } from '@/data/seasonal-ecology';

export default function PhenologyRecordsPage() {
  const records = getSeasonalEcologyData.phenology.all();

  const districts = Array.from(new Set(records.flatMap(r => r.districts)));
  const recordTypes = Array.from(new Set(records.map(r => r.recordType)));
  const taxonomicGroups = Array.from(new Set(records.map(r => r.taxonomicGroup)));

  return (
    <SeasonalListingPage
      title="All Flowering and Phenology Records"
      subtitle="Flowering, seasonal, and observation-based phenology records across Kashmir"
      icon="Calendar"
      color="from-violet-500 to-purple-600"
      entities={records}
      entityVariant="phenology"
      metrics={[
        { label: 'Phenology Records', value: records.length, icon: 'Calendar' as const },
        { label: 'Flowering Records', value: records.filter(r => r.recordType === 'flowering').length, icon: 'Flower2' as const },
        { label: 'Bird Records', value: records.filter(r => r.recordType.includes('bird')).length, icon: 'Bird' as const },
        { label: 'Verified', value: records.filter(r => r.verificationStatus === 'verified').length, icon: 'CheckCircle' as const },
      ]}
      filters={{
        districts: districts as string[],
        elevationZones: ['lowland', 'mid-elevation', 'highland', 'alpine'],
        seasons: ['spring', 'summer', 'autumn', 'winter'],
        additionalFilters: [
          { label: 'Record Type', options: recordTypes as string[] },
          { label: 'Taxonomic Group', options: taxonomicGroups as string[] },
        ],
      }}
      detailPageBaseRoute="/seasonal-ecology/phenology-records"
      mapPreviewEnabled
      mapCoordinates={{ lat: 34.0837, lng: 74.7973, zoom: 9 }}
    />
  );
}
