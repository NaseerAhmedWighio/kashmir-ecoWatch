import { SeasonalListingPage } from '@/components/common/SeasonalListingPage';
import { getSeasonalEcologyData } from '@/data/seasonal-ecology';

export default function WaterTransitionsPage() {
  const transitions = getSeasonalEcologyData.waterTransitions.all();

  const districts = Array.from(new Set(transitions.map(w => w.district)));
  const waterbodyTypes = Array.from(new Set(transitions.map(w => w.waterbodyType)));
  const transitionTypes = Array.from(new Set(transitions.map(w => w.transitionType)));

  return (
    <SeasonalListingPage
      title="All Seasonal Water and Wetland Transitions"
      subtitle="Seasonal water and wetland transitions across Kashmir"
      icon="Droplets"
      color="from-cyan-500 to-blue-600"
      entities={transitions}
      entityVariant="water"
      metrics={[
        { label: 'Water Transitions', value: transitions.length, icon: 'Droplets' as const },
        { label: 'River Systems', value: transitions.filter(w => w.waterbodyType === 'river').length, icon: 'Waves' as const },
        { label: 'Wetlands', value: transitions.filter(w => w.waterbodyType === 'wetland').length, icon: 'Waves' as const },
        { label: 'Lakes', value: transitions.filter(w => w.waterbodyType === 'lake').length, icon: 'CircleDot' as const },
      ]}
      filters={{
        districts: districts as string[],
        seasons: ['spring', 'summer', 'autumn', 'winter'],
        additionalFilters: [
          { label: 'Waterbody Type', options: waterbodyTypes as string[] },
          { label: 'Transition Type', options: transitionTypes as string[] },
        ],
      }}
      detailPageBaseRoute="/seasonal-ecology/water-transitions"
      mapPreviewEnabled
      mapCoordinates={{ lat: 34.0837, lng: 74.7973, zoom: 9 }}
    />
  );
}
