'use client';

import { ProtectedCategoryPage } from '@/components/common/ProtectedCategoryPage';
import { getProtectedAreas } from '@/data/protected-network';

export default function BirdHabitatAreasPage() {
  const areas = getProtectedAreas.birdHabitatAreas();

  const metrics = [
    { label: 'Total IBAs', value: areas.length, icon: 'Activity' as const },
    { label: 'Total Area', value: `${areas.reduce((acc, pa) => acc + pa.area, 0).toLocaleString()} km²`, icon: 'MapPin' as const },
    { label: 'Wetland IBAs', value: 12, icon: 'Droplet' as const },
    { label: 'Bird Species', value: 312, icon: 'Shield' as const },
  ];

  return (
    <ProtectedCategoryPage
      title="Bird & Habitat Areas"
      subtitle="Important Bird and Biodiversity Areas (IBAs) with critical habitats for avian conservation"
      icon="Activity"
      color="from-purple-500 to-pink-600"
      areas={areas}
      metrics={metrics}
    />
  );
}
