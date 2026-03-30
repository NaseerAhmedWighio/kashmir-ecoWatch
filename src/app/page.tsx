import { Navigation } from '@/components/sections/Navigation';
import { ImmersiveHero } from '@/components/sections/ImmersiveHero';
import { CommandBand } from '@/components/sections/CommandBand';
import { AsymmetricModuleSurface } from '@/components/sections/AsymmetricModuleSurface';
import { MapIntelligenceCore } from '@/components/sections/MapIntelligenceCore';
import { ExpandableLivePanels } from '@/components/sections/ExpandableLivePanels';
import { NextGenDashboardPreview } from '@/components/sections/NextGenDashboardPreview';
import { FeaturedEntityStrip } from '@/components/sections/FeaturedEntityStrip';
import { AlertResponseSystem } from '@/components/sections/AlertResponseSystem';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />
      <ImmersiveHero />
      <CommandBand />
      <AsymmetricModuleSurface />
      <MapIntelligenceCore />
      <ExpandableLivePanels />
      <NextGenDashboardPreview />
      <FeaturedEntityStrip />
      <AlertResponseSystem />
      <AdvancedFooter />
    </main>
  );
}
