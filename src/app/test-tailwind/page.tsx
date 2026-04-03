/**
 * Test page to verify Tailwind CSS is working
 * Visit: http://localhost:3000/test-tailwind
 */

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function TestTailwindPage() {
  return (
    <div className="min-h-screen bg-surface-0 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">
            Tailwind CSS Test Page
          </h1>
          <p className="text-secondary">
            Verifying the semantic design system is working correctly
          </p>
        </div>

        {/* Surface Colors Test */}
        <section className="bg-surface-1 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold text-primary">Surface Colors</h2>
          <div className="grid grid-cols-5 gap-4">
            <div className="bg-surface-0 rounded p-4 text-center">
              <div className="h-20 rounded mb-2 bg-surface-0 border border-surface-4" />
              <span className="text-xs text-muted">Surface 0</span>
            </div>
            <div className="bg-surface-1 rounded p-4 text-center">
              <div className="h-20 rounded mb-2 bg-surface-1 border border-surface-4" />
              <span className="text-xs text-muted">Surface 1</span>
            </div>
            <div className="bg-surface-2 rounded p-4 text-center">
              <div className="h-20 rounded mb-2 bg-surface-2 border border-surface-4" />
              <span className="text-xs text-muted">Surface 2</span>
            </div>
            <div className="bg-surface-3 rounded p-4 text-center">
              <div className="h-20 rounded mb-2 bg-surface-3 border border-surface-4" />
              <span className="text-xs text-muted">Surface 3</span>
            </div>
            <div className="bg-surface-4 rounded p-4 text-center">
              <div className="h-20 rounded mb-2 bg-surface-4 border border-surface-4" />
              <span className="text-xs text-muted">Surface 4</span>
            </div>
          </div>
        </section>

        {/* Status Colors Test */}
        <section className="bg-surface-1 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold text-primary">Status Colors</h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            <div className="bg-status-info-surface border border-status-info-border rounded p-4 text-center">
              <div className="h-12 rounded mb-2 bg-status-info-surface" />
              <span className="text-xs text-status-info font-medium">Info</span>
            </div>
            <div className="bg-status-stable-surface border border-status-stable-border rounded p-4 text-center">
              <div className="h-12 rounded mb-2 bg-status-stable-surface" />
              <span className="text-xs text-status-stable font-medium">Stable</span>
            </div>
            <div className="bg-status-monitoring-surface border border-status-monitoring-border rounded p-4 text-center">
              <div className="h-12 rounded mb-2 bg-status-monitoring-surface" />
              <span className="text-xs text-status-monitoring font-medium">Monitoring</span>
            </div>
            <div className="bg-status-warning-surface border border-status-warning-border rounded p-4 text-center">
              <div className="h-12 rounded mb-2 bg-status-warning-surface" />
              <span className="text-xs text-status-warning font-medium">Warning</span>
            </div>
            <div className="bg-status-critical-surface border border-status-critical-border rounded p-4 text-center">
              <div className="h-12 rounded mb-2 bg-status-critical-surface" />
              <span className="text-xs text-status-critical font-medium">Critical</span>
            </div>
            <div className="bg-status-resolved-surface border border-status-resolved-border rounded p-4 text-center">
              <div className="h-12 rounded mb-2 bg-status-resolved-surface" />
              <span className="text-xs text-status-resolved font-medium">Resolved</span>
            </div>
          </div>
        </section>

        {/* Module Accents Test */}
        <section className="bg-surface-1 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold text-primary">Module Accents</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            <div className="text-center">
              <div className="h-12 rounded mb-2 bg-accent-biodiversity/20" />
              <span className="text-xs text-muted">Biodiversity</span>
            </div>
            <div className="text-center">
              <div className="h-12 rounded mb-2 bg-accent-water/20" />
              <span className="text-xs text-muted">Water</span>
            </div>
            <div className="text-center">
              <div className="h-12 rounded mb-2 bg-accent-protected/20" />
              <span className="text-xs text-muted">Protected</span>
            </div>
            <div className="text-center">
              <div className="h-12 rounded mb-2 bg-accent-seasonal/20" />
              <span className="text-xs text-muted">Seasonal</span>
            </div>
            <div className="text-center">
              <div className="h-12 rounded mb-2 bg-accent-trails/20" />
              <span className="text-xs text-muted">Trails</span>
            </div>
            <div className="text-center">
              <div className="h-12 rounded mb-2 bg-accent-risk/20" />
              <span className="text-xs text-muted">Risk</span>
            </div>
            <div className="text-center">
              <div className="h-12 rounded mb-2 bg-accent-districts/20" />
              <span className="text-xs text-muted">Districts</span>
            </div>
            <div className="text-center">
              <div className="h-12 rounded mb-2 bg-accent-atlas/20" />
              <span className="text-xs text-muted">Atlas</span>
            </div>
          </div>
        </section>

        {/* Typography Test */}
        <section className="bg-surface-1 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold text-primary">Typography</h2>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-primary">Heading 1 - Primary Text</h1>
            <h2 className="text-3xl font-bold text-primary">Heading 2 - Primary Text</h2>
            <h3 className="text-2xl font-bold text-primary">Heading 3 - Primary Text</h3>
            <p className="text-base text-secondary">Body text - Secondary color (readable on dark backgrounds)</p>
            <p className="text-sm text-muted">Muted text - For captions and support text</p>
          </div>
        </section>

        {/* Badge Component Test */}
        <section className="bg-surface-1 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold text-primary">Badge Component</h2>
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="default" size="sm">SM</Badge>
            <Badge variant="warning" size="md">MD</Badge>
            <Badge variant="danger" size="lg">LG</Badge>
          </div>
        </section>

        {/* Button Component Test */}
        <section className="bg-surface-1 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold text-primary">Button Component</h2>
          <div className="flex flex-wrap gap-2">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" size="md">Medium</Button>
            <Button variant="primary" size="lg">Large</Button>
          </div>
        </section>

        {/* Card Example */}
        <section className="bg-surface-1 rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-bold text-primary">Card Example</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {/* Stable Card */}
            <div className="bg-surface-2 border border-surface-4 rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-primary">Normal State</h3>
                <Badge variant="stable">Stable</Badge>
              </div>
              <p className="text-sm text-secondary">
                This is a normal card with stable state. All text is clearly visible.
              </p>
              <div className="flex gap-2">
                <Button variant="primary" size="sm">Action</Button>
                <Button variant="outline" size="sm">Cancel</Button>
              </div>
            </div>

            {/* Monitoring Card */}
            <div className="bg-status-monitoring-surface border border-status-monitoring-border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-status-monitoring">Monitoring</h3>
                <Badge variant="monitoring">Active</Badge>
              </div>
              <p className="text-sm text-secondary">
                This card shows active monitoring state with proper contrast.
              </p>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm">View</Button>
                <Button variant="ghost" size="sm">Dismiss</Button>
              </div>
            </div>

            {/* Critical Card */}
            <div className="bg-status-critical-surface border border-status-critical-border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-status-critical">Critical</h3>
                <Badge variant="critical">ALERT</Badge>
              </div>
              <p className="text-sm text-secondary">
                Critical alert card with high visibility and urgency.
              </p>
              <div className="flex gap-2">
                <Button variant="primary" size="sm">Respond</Button>
                <Button variant="outline" size="sm">Details</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Status Check */}
        <section className="bg-surface-2 border border-surface-4 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-primary mb-4">System Status</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-status-stable animate-pulse" />
              <span className="text-secondary">Tailwind CSS: <strong className="text-status-stable">Working</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-status-stable animate-pulse" />
              <span className="text-secondary">Design Tokens: <strong className="text-status-stable">Loaded</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-status-stable animate-pulse" />
              <span className="text-secondary">Semantic Colors: <strong className="text-status-stable">Active</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-status-stable animate-pulse" />
              <span className="text-secondary">Components: <strong className="text-status-stable">Functional</strong></span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
