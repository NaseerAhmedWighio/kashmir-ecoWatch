'use client';

import { BiodiversityCategoryPage } from '@/components/common/BiodiversityCategoryPage';
import { getBiodiversityData } from '@/data/biodiversity';

export default function PlantsPage() {
  const species = getBiodiversityData.plants.all();

  const metrics = [
    { label: 'Total Species', value: 234, icon: 'Flower2' as const },
    { label: 'Endemic', value: 23, icon: 'Shield' as const },
    { label: 'Flowering', value: 189, icon: 'Leaf' as const },
    { label: 'Records', value: 567, icon: 'Eye' as const },
  ];

  const filters = {
    habitats: ['Temperate forests', 'Alpine meadows', 'Wetlands', 'Forest edges', 'Rocky slopes'],
    districts: ['All districts'],
    conservationStatuses: ['CR', 'EN', 'VU', 'NT', 'LC'],
  };

  return (
    <BiodiversityCategoryPage
      title="Plants & Flora"
      subtitle="Vascular plants and flora across forest, alpine, wetland, and meadow ecosystems with seasonal flowering patterns"
      icon="Flower2"
      color="from-green-500 to-emerald-600"
      species={species}
      metrics={metrics}
      filters={filters}
    />
  );
}
