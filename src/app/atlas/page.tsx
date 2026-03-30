import React from 'react';
import AtlasClient from './AtlasClient';

// Force dynamic rendering - this page uses client-side map libraries (Leaflet)
export const dynamic = 'force-dynamic';

export default function AtlasPage() {
  return <AtlasClient />;
}
