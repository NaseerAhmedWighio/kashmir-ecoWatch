import { SeasonalListingPage } from '@/components/common/SeasonalListingPage';
import { getSeasonalEcologyData } from '@/data/seasonal-ecology';

export default function MigrationWindowsPage() {
  const migrations = getSeasonalEcologyData.migration.all();

  const districts = Array.from(new Set(migrations.map(m => m.district)));
  const wetlandTypes = Array.from(new Set(migrations.map(m => m.wetlandType)));
  const migrationTypes = Array.from(new Set(migrations.map(m => m.migrationType)));

  return (
    <SeasonalListingPage
      title="All Migration Windows"
      subtitle="Migration timing and wetland bird windows across Kashmir"
      icon="Bird"
      color="from-sky-500 to-blue-600"
      entities={migrations}
      entityVariant="migration"
      metrics={[
        { label: 'Migration Windows', value: migrations.length, icon: 'Bird' },
        { label: 'Wetland Complexes', value: migrations.filter(m => m.wetlandType === 'wetland-complex').length, icon: 'Waves' },
        { label: 'Wintering Sites', value: migrations.filter(m => m.migrationType === 'wintering').length, icon: 'Calendar' },
        { label: 'Total Population', value: '150K+', icon: 'Users' },
      ]}
      filters={{
        districts: districts as string[],
        seasons: ['autumn', 'winter', 'spring'],
        additionalFilters: [
          { label: 'Wetland Type', options: wetlandTypes as string[] },
          { label: 'Migration Type', options: migrationTypes as string[] },
        ],
      }}
      detailPageBaseRoute="/seasonal-ecology/migration-windows"
      mapPreviewEnabled
      mapCoordinates={{ lat: 34.1833, lng: 74.8167, zoom: 10 }}
    />
  );
}
