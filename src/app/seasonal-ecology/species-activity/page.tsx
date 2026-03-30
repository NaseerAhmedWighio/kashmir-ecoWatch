import { SeasonalListingPage } from '@/components/common/SeasonalListingPage';
import { getSeasonalEcologyData } from '@/data/seasonal-ecology';

export default function SpeciesActivityPage() {
  const activities = getSeasonalEcologyData.speciesActivity.all();

  const districts = Array.from(new Set(activities.flatMap(s => s.districts)));
  const taxonomicGroups = Array.from(new Set(activities.map(s => s.taxonomicGroup)));
  const activityTypes = Array.from(new Set(activities.map(s => s.activityType)));

  return (
    <SeasonalListingPage
      title="All Seasonal Species Activity"
      subtitle="Seasonal species activity patterns across Kashmir"
      icon="PawPrint"
      color="from-rose-500 to-red-600"
      entities={activities}
      entityVariant="species"
      metrics={[
        { label: 'Species Activity', value: activities.length, icon: 'PawPrint' as const },
        { label: 'Mammals', value: activities.filter(s => s.taxonomicGroup === 'mammals').length, icon: 'PawPrint' as const },
        { label: 'Birds', value: activities.filter(s => s.taxonomicGroup === 'birds').length, icon: 'Bird' as const },
        { label: 'Plants', value: activities.filter(s => s.taxonomicGroup === 'plants').length, icon: 'Flower2' as const },
      ]}
      filters={{
        districts: districts as string[],
        elevationZones: ['lowland', 'mid-elevation', 'highland', 'alpine'],
        seasons: ['spring', 'summer', 'autumn', 'winter'],
        additionalFilters: [
          { label: 'Taxonomic Group', options: taxonomicGroups as string[] },
          { label: 'Activity Type', options: activityTypes as string[] },
        ],
      }}
      detailPageBaseRoute="/seasonal-ecology/species-activity"
      mapPreviewEnabled
      mapCoordinates={{ lat: 34.1167, lng: 75.0333, zoom: 10 }}
    />
  );
}
