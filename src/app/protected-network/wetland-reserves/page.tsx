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
      title={<><span className="block whitespace-nowrap">Wetland</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Reserves</span></>}
      subtitle="Marsh, reedbed, and bird-use conservation systems across Kashmir, including designated Ramsar wetland sites. Records cover hydrological data, bird usage patterns, and conservation assessments."
      icon="Droplet"
      color="from-emerald-600 to-emerald-500"
      areas={areas}
      metrics={metrics}
    />
  );
}
