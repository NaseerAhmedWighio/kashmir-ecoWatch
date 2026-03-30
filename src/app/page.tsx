import { Navigation } from '@/components/sections/Navigation';
import { ImmersiveHero } from '@/components/sections/ImmersiveHero';
import { AsymmetricModuleSurface } from '@/components/sections/AsymmetricModuleSurface';
import { MapIntelligenceCore } from '@/components/sections/MapIntelligenceCore';
import { ExpandableLivePanels } from '@/components/sections/ExpandableLivePanels';
import { NextGenDashboardPreview } from '@/components/sections/NextGenDashboardPreview';
import { FeaturedEntityStrip } from '@/components/sections/FeaturedEntityStrip';
import { AlertResponseSystem } from '@/components/sections/AlertResponseSystem';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { PublicParticipationIntelligence } from '@/components/sections/PublicParticipationIntelligence';
import { DistrictIntelligenceStrip } from '@/components/sections/DistrictIntelligenceStrip';
import { OnboardingStrip } from '@/components/sections/OnboardingStrip';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
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
