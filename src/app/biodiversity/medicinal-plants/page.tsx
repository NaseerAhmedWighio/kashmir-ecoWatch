'use client';

import { BiodiversityCategoryPage } from '@/components/common/BiodiversityCategoryPage';
import { getBiodiversityData } from '@/data/biodiversity';

export default function MedicinalPlantsPage() {
  const species = getBiodiversityData.medicinalPlants.all();

  const metrics = [
    { label: 'Total Species', value: species.length, icon: 'Leaf' as const },
    { label: 'Threatened', value: species.filter(s => ['CR', 'EN', 'VU'].includes(s.conservationStatus)).length, icon: 'Shield' as const },
    { label: 'High Sensitivity', value: species.filter(s => s.sensitivity === 'critical' || s.sensitivity === 'high').length, icon: 'AlertTriangle' as const },
    { label: 'Records', value: 218, icon: 'Eye' as const },
  ];

  const filters = {
    habitats: ['Alpine meadows', 'High-altitude slopes', 'Temperate forests', 'Rocky areas'],
    districts: ['Kishtwar', 'Doda', 'Anantnag', 'Kulgam'],
    conservationStatuses: ['CR', 'EN', 'VU', 'NT', 'LC'],
  };

  return (
    <BiodiversityCategoryPage
      title="Medicinal Plants"
      subtitle="Traditional medicinal flora with conservation-sensitive harvesting protocols and ecological monitoring"
      icon="Leaf"
      color="from-amber-500 to-orange-600"
      species={species}
      metrics={metrics}
      filters={filters}
    />
  );
}
