'use client';

import { ImmersiveHero } from '@/components/sections/ImmersiveHero';
import { AsymmetricModuleSurface } from '@/components/sections/AsymmetricModuleSurface';
import { ExpandableLivePanels } from '@/components/sections/ExpandableLivePanels';
import { NextGenDashboardPreview } from '@/components/sections/NextGenDashboardPreview';
import { FeaturedEntityStrip } from '@/components/sections/FeaturedEntityStrip';
import { AlertResponseSystem } from '@/components/sections/AlertResponseSystem';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { PublicParticipationIntelligence } from '@/components/sections/PublicParticipationIntelligence';
import { DistrictIntelligenceStrip } from '@/components/sections/DistrictIntelligenceStrip';
import { OnboardingStrip } from '@/components/sections/OnboardingStrip';
import dynamic from 'next/dynamic';

// Dynamically import map component with SSR disabled (leaflet requires window)
const MapIntelligenceCore = dynamic(
  () => import('@/components/sections/MapIntelligenceCore').then(mod => ({ default: mod.MapIntelligenceCore })),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-[600px] bg-slate-900/50 animate-pulse rounded-2xl border border-white/10 flex items-center justify-center">
        <p className="text-slate-400 text-sm">Loading map intelligence...</p>
      </div>
    )
  }
);

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* Band 1: Hero Command Surface */}
      <ImmersiveHero />

      {/* Band 2: Core Intelligence Modules */}
      <AsymmetricModuleSurface />

      {/* Band 3: Atlas + Live Monitoring */}
      <MapIntelligenceCore />
      <ExpandableLivePanels />

      {/* Band 4: District Intelligence & Featured Entities */}
      <OnboardingStrip />
      <DistrictIntelligenceStrip />
      <FeaturedEntityStrip />

      {/* Band 5: Participation, Dashboards & Alerts */}
      <PublicParticipationIntelligence />
      <NextGenDashboardPreview />
      <AlertResponseSystem />

      <AdvancedFooter />
    </main>
  );
}
