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
      title={<><span className="block whitespace-nowrap">Conservation</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Reserves</span></>}
      subtitle="Community-involved conservation landscapes, buffer zones, and transition areas across Kashmir. Records include land use data, community engagement status, and ecological condition monitoring."
      icon="Leaf"
      color="from-emerald-600 to-emerald-500"
      areas={areas}
      metrics={metrics}
    />
  );
}
