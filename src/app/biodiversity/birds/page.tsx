'use client';

import { BiodiversityCategoryPage } from '@/components/common/BiodiversityCategoryPage';
import { getBiodiversityData } from '@/data/biodiversity';

export default function BirdsPage() {
  const species = getBiodiversityData.birds.all();

  const metrics = [
    { label: 'Total Species', value: species.length, icon: 'Activity' as const },
    { label: 'Migratory', value: 89, icon: 'Calendar' as const },
    { label: 'Threatened', value: species.filter(s => ['CR', 'EN', 'VU'].includes(s.conservationStatus)).length, icon: 'Shield' as const },
    { label: 'Verified Sightings', value: 1567, icon: 'Eye' as const },
  ];

  const filters = {
    habitats: ['Wetlands', 'Temperate forests', 'Alpine meadows', 'Forest edges', 'Riparian forests'],
    districts: ['Srinagar', 'Ganderbal', 'Anantnag', 'Kulgam', 'Kishtwar'],
    conservationStatuses: ['CR', 'EN', 'VU', 'NT', 'LC'],
  };

  return (
    <BiodiversityCategoryPage
      title="Birds"
      subtitle="Resident and migratory bird species across wetlands, forests, and alpine zones with seasonal migration patterns"
      icon="Activity"
      color="from-sky-500 to-blue-600"
      species={species}
      metrics={metrics}
      filters={filters}
    />
  );
}
