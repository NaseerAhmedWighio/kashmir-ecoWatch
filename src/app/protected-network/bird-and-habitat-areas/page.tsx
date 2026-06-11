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
      title={<><span className="block whitespace-nowrap">Bird and</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Habitat Areas</span></>}
      subtitle="Important Bird and Biodiversity Areas across Kashmir with critical habitats for resident and migratory species. Records include site assessments, species checklists, and seasonal usage data."
      icon="Activity"
      color="from-emerald-600 to-emerald-500"
      areas={areas}
      metrics={metrics}
    />
  );
}
