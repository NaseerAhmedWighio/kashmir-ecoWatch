'use client';

import { ProtectedCategoryPage } from '@/components/common/ProtectedCategoryPage';
import { getProtectedAreas } from '@/data/protected-network';

export default function WildlifeSanctuariesPage() {
  const areas = getProtectedAreas.wildlifeSanctuaries();

  const metrics = [
    { label: 'Total Sanctuaries', value: areas.length, icon: 'Shield' as const },
    { label: 'Total Area', value: `${areas.reduce((acc, pa) => acc + pa.area, 0).toLocaleString()} km²`, icon: 'MapPin' as const },
    { label: 'Districts', value: new Set(areas.map(pa => pa.district)).size, icon: 'Mountain' as const },
    { label: 'Key Species', value: 89, icon: 'Activity' as const },
  ];

  return (
    <ProtectedCategoryPage
      title="Wildlife Sanctuaries"
      subtitle="Protected habitats for mammals, birds, and mountain biodiversity across Kashmir"
      icon="Shield"
      color="from-blue-500 to-cyan-600"
      areas={areas}
      metrics={metrics}
    />
  );
}
