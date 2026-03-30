'use client';

import { ProtectedCategoryPage } from '@/components/common/ProtectedCategoryPage';
import { getProtectedAreas } from '@/data/protected-network';

export default function ConservationReservesPage() {
  const areas = getProtectedAreas.conservationReserves();

  const metrics = [
    { label: 'Total Reserves', value: areas.length, icon: 'Leaf' as const },
    { label: 'Total Area', value: `${areas.reduce((acc, pa) => acc + pa.area, 0).toLocaleString()} km²`, icon: 'MapPin' as const },
    { label: 'Community Areas', value: areas.length, icon: 'Shield' as const },
    { label: 'Buffer Zones', value: 12, icon: 'Activity' as const },
  ];

  return (
    <ProtectedCategoryPage
      title="Conservation Reserves"
      subtitle="Community-involved conservation landscapes and buffer zones"
      icon="Leaf"
      color="from-amber-500 to-orange-600"
      areas={areas}
      metrics={metrics}
    />
  );
}
