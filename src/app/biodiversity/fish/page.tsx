'use client';

import { BiodiversityCategoryPage } from '@/components/common/BiodiversityCategoryPage';
import { getBiodiversityData } from '@/data/biodiversity';

export default function FishPage() {
  const species = getBiodiversityData.fish.all();

  const metrics = [
    { label: 'Total Species', value: species.length, icon: 'Droplet' as const },
    { label: 'Water Systems', value: 47, icon: 'Waves' as const },
    { label: 'Native Species', value: 18, icon: 'Shield' as const },
    { label: 'Records', value: 1315, icon: 'Eye' as const },
  ];

  const filters = {
    habitats: ['Cold mountain streams', 'Rivers', 'Lakes', 'Wetlands', 'Glacial-fed waters'],
    districts: ['All districts'],
    conservationStatuses: ['CR', 'EN', 'VU', 'NT', 'LC'],
  };

  return (
    <BiodiversityCategoryPage
      title="Fish & Aquatic Biodiversity"
      subtitle="Freshwater fish and aquatic species in Kashmir's rivers, lakes, streams, and wetland ecosystems"
      icon="Droplet"
      color="from-cyan-500 to-blue-600"
      species={species}
      metrics={metrics}
      filters={filters}
    />
  );
}
