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
      title={<><span className="block whitespace-nowrap">Wildlife</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Sanctuaries</span></>}
      subtitle="Protected habitats supporting mammals, birds, and mountain biodiversity across Kashmir's forest and alpine zones. Records include species data, seasonal patterns, and habitat condition."
      icon="Shield"
      color="from-emerald-600 to-emerald-500"
      areas={areas}
      metrics={metrics}
    />
  );
}
