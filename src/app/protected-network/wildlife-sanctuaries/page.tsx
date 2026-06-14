'use client';

import { useState } from 'react';
import { ProtectedCategoryPage } from '@/components/common/ProtectedCategoryPage';
import { getProtectedAreas } from '@/data/protected-network';

const TABS = [
  { key: 'all', label: 'All', description: 'Show all items across all ecological zones' },
  { key: 'core', label: 'Kashmir Core', description: 'Kashmir Valley sanctuaries — 9 records' },
  { key: 'trans', label: 'Trans-Divisional', description: 'Jammu & Ladakh sanctuary belt — 7 records' },
  { key: 'extended', label: 'Transboundary / Extended', description: 'Azad Kashmir, Gilgit-Baltistan, and broader historical Kashmir belt — 4 records' },
] as const;

type TabKey = 'all' | 'core' | 'trans' | 'extended';

export default function WildlifeSanctuariesPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('all');
  const allAreas = getProtectedAreas.wildlifeSanctuaries();

  const coreSanctuaries    = allAreas.filter(p => p.scope === 'Kashmir Core');
  const transSanctuaries   = allAreas.filter(p => p.scope === 'Trans-Divisional');
  const extendedSanctuaries = allAreas.filter(p => p.scope === 'Transboundary / Extended');

  const activeAreas =
    activeTab === 'all'      ? allAreas :
    activeTab === 'core'     ? coreSanctuaries :
    activeTab === 'trans'    ? transSanctuaries :
    extendedSanctuaries;

  const metrics = [
    { label: 'Kashmir Core',              value: coreSanctuaries.length,             icon: 'Shield' as const },
    { label: 'Trans-Divisional',          value: transSanctuaries.length,            icon: 'Mountain' as const },
    { label: 'Transboundary / Extended',  value: extendedSanctuaries.length,         icon: 'Activity' as const },
    { label: 'Total Seed Records',        value: allAreas.length,                    icon: 'MapPin' as const },
    { label: 'Key Species',               value: '50+',                              icon: 'Eye' as const },
    { label: 'Ecosystem Types',           value: '12+',                              icon: 'Leaf' as const },
    { label: 'Legal Categories',          value: '2',                                icon: 'TrendingUp' as const },
    { label: 'Data Quality',              value: 'Verified',                         icon: 'AlertTriangle' as const },
  ];

  return (
    <ProtectedCategoryPage
      title={<><span className="block whitespace-nowrap">Kashmir Wildlife</span><span className="block whitespace-nowrap bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">Sanctuary Network</span></>}
      subtitle="Protected forest and alpine habitats supporting Kashmir's mammals, birds, and mountain biodiversity. Integrates species data, seasonal movement patterns, habitat condition, and conservation monitoring for each sanctuary."
      icon="Shield"
      color="from- emerald-700 to-emerald-500"
      areas={activeAreas}
      metrics={metrics}
      tabs={TABS as any}
      activeTab={activeTab}
      onTabChange={(tab) => setActiveTab(tab as TabKey)}
    />
  );
}
