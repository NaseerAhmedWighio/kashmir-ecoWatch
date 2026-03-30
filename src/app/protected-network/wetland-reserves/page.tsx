'use client';

import { ProtectedCategoryPage } from '@/components/common/ProtectedCategoryPage';
import { getProtectedAreas } from '@/data/protected-network';

export default function WetlandReservesPage() {
  const areas = getProtectedAreas.wetlandReserves();

  const metrics = [
    { label: 'Total Reserves', value: areas.length, icon: 'Droplet' as const },
    { label: 'Total Area', value: `${areas.reduce((acc, pa) => acc + pa.area, 0).toLocaleString()} km²`, icon: 'MapPin' as const },
    { label: 'Ramsar Sites', value: 1, icon: 'Shield' as const },
    { label: 'Bird Species', value: 127, icon: 'Activity' as const },
  ];

  return (
    <ProtectedCategoryPage
      title="Wetland Reserves"
      subtitle="Marsh, reedbed, and bird-use conservation systems including Ramsar sites"
      icon="Droplet"
      color="from-sky-500 to-blue-600"
      areas={areas}
      metrics={metrics}
    />
  );
}
