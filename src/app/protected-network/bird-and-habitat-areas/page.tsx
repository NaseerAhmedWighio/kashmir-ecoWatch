'use client';

import { useState } from 'react';
import { ProtectedCategoryPage } from '@/components/common/ProtectedCategoryPage';
import { getProtectedAreas } from '@/data/protected-network';

const TABS = [
  { key: 'all', label: 'All', description: 'Show all items across all ecological zones' },
  { key: 'core', label: 'Kashmir Core', description: 'Kashmir Core bird habitats — 22 seed records' },
  { key: 'trans', label: 'Trans-Divisional', description: 'Trans-divisional bird habitats — 18 seed records' },
  { key: 'extended', label: 'Transboundary / Extended', description: 'Transboundary & extended flyway habitats — 25+ seed records' },
] as const;

type TabKey = 'all' | 'core' | 'trans' | 'extended';

export default function BirdHabitatAreasPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const allAreas = getProtectedAreas.birdHabitatAreas();

  const coreAreas    = allAreas.filter(p => p.scope === 'Kashmir Core');
  const transAreas   = allAreas.filter(p => p.scope === 'Trans-Divisional');
  const extendedAreas = allAreas.filter(p => p.scope === 'Transboundary / Extended');

  const activeAreas =
    activeTab === 'all'      ? allAreas :
    activeTab === 'core'     ? coreAreas :
    activeTab === 'trans'    ? transAreas :
    extendedAreas;

  const metrics = [
    { label: 'Kashmir Core', value: '22', icon: 'Mountain' as const },
    { label: 'Trans-Divisional', value: '18', icon: 'MapPin' as const },
    { label: 'Transboundary / Extended', value: '25+', icon: 'Activity' as const },
    { label: 'Total Seed Records', value: '65+', icon: 'Shield' as const },
    { label: 'Recorded Bird Species', value: '599', icon: 'Bird' as const },
    { label: 'Wetland Bird Sites', value: '20+', icon: 'Droplet' as const },
    { label: 'Forest / Alpine Sites', value: '25+', icon: 'TreePine' as const },
    { label: 'Habitat Types', value: '16+', icon: 'Leaf' as const },
  ];

  return (
    <ProtectedCategoryPage
      title={<><span className="block whitespace-nowrap">Kashmir Bird</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Habitat Network</span></>}
      subtitle="Important bird and biodiversity habitats across Kashmir supporting resident and migratory species. Integrates site assessments, species checklists, seasonal usage data, and habitat condition intelligence."
      icon="Bird"
      color="from- emerald-700 to-emerald-500"
      areas={activeAreas}
      metrics={metrics}
      tabs={TABS as any}
      activeTab={activeTab}
      onTabChange={(tab) => setActiveTab(tab as TabKey)}
    />
  );
}
