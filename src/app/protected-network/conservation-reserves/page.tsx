'use client';

import { useState } from 'react';
import { ProtectedCategoryPage } from '@/components/common/ProtectedCategoryPage';
import { getProtectedAreas } from '@/data/protected-network';

const TABS = [
  { key: 'all', label: 'All', description: 'Show all items across all ecological zones' },
  { key: 'core', label: 'Kashmir Core', description: 'Kashmir Core reserves — 12 seed records' },
  { key: 'trans', label: 'Trans-Divisional', description: 'Jammu & trans-divisional reserves — 8 seed records' },
  { key: 'extended', label: 'Transboundary / Extended', description: 'Extended conservation landscapes — 20+ seed records' },
] as const;

type TabKey = 'all' | 'core' | 'trans' | 'extended';

export default function ConservationReservesPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const allAreas = getProtectedAreas.conservationReserves();

  const coreAreas    = allAreas.filter(p => p.scope === 'Kashmir Core');
  const transAreas   = allAreas.filter(p => p.scope === 'Trans-Divisional');
  const extendedAreas = allAreas.filter(p => p.scope === 'Transboundary / Extended');

  const activeAreas =
    activeTab === 'all'      ? allAreas :
    activeTab === 'core'     ? coreAreas :
    activeTab === 'trans'    ? transAreas :
    extendedAreas;

  const metrics = [
    { label: 'Kashmir Core', value: '12', icon: 'Mountain' as const },
    { label: 'Trans-Divisional', value: '8', icon: 'MapPin' as const },
    { label: 'Transboundary / Extended', value: '20+', icon: 'Activity' as const },
    { label: 'Seed Records', value: '40+', icon: 'Shield' as const },
    { label: 'Key Species', value: '70+', icon: 'TrendingUp' as const },
    { label: 'Ecosystem Types', value: '14+', icon: 'Leaf' as const },
    { label: 'Conservation Labels', value: '6', icon: 'FileText' as const },
    { label: 'Data Quality', value: 'Mixed', icon: 'Eye' as const },
  ];

  return (
    <ProtectedCategoryPage
      title={<><span className="block whitespace-nowrap">Kashmir Conservation</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Reserve Network</span></>}
      subtitle="Community-supported conservation landscapes, ecological buffers, and transition zones across Kashmir. Integrates land-use intelligence, community stewardship data, habitat assessments, and ecological condition monitoring."
      icon="Leaf"
      color="from- emerald-700 to-emerald-500"
      areas={activeAreas}
      metrics={metrics}
      tabs={TABS as any}
      activeTab={activeTab}
      onTabChange={(tab) => setActiveTab(tab as TabKey)}
    />
  );
}

