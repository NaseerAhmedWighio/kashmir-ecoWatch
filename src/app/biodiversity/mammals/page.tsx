'use client';

import { BiodiversityCategoryPage } from '@/components/common/BiodiversityCategoryPage';
import { getBiodiversityData, biodiversityMetrics } from '@/data/biodiversity';

export default function MammalsPage() {
  const species = getBiodiversityData.mammals.all();

  const metrics = [
    { label: 'Total Species', value: species.length, icon: 'Activity' as const },
    { label: 'Threatened', value: species.filter(s => ['CR', 'EN', 'VU'].includes(s.conservationStatus)).length, icon: 'Shield' as const },
    { label: 'Verified Sightings', value: species.reduce((acc, s) => acc + (s.verifiedSightings || 0), 0), icon: 'Eye' as const },
    { label: 'Protected Areas', value: 12, icon: 'MapPin' as const },
  ];

  const filters = {
    habitats: ['Temperate forests', 'Alpine meadows', 'Riverine forests', 'Rocky terrain', 'Mountain slopes'],
    districts: ['Srinagar', 'Ganderbal', 'Anantnag', 'Kulgam', 'Kishtwar', 'Kargil'],
    conservationStatuses: ['CR', 'EN', 'VU', 'NT', 'LC'],
  };

  return (
    <BiodiversityCategoryPage
      title="Mammals"
      subtitle="Terrestrial mammals including endangered ungulates, carnivores, and small mammals across Kashmir's diverse habitats"
      icon="Mountain"
      color="from-emerald-500 to-teal-600"
      species={species}
      metrics={metrics}
      filters={filters}
    />
  );
}
