'use client';

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDistrictBySlug, getDistrictSpeciesList } from '@/data/biodiversity-access';
import SourceVerificationBadge from '@/components/biodiversity/intelligence/SourceVerificationBadge';

interface DistrictDetailPageProps {
  params: {
    slug: string;
  };
}

const DistrictDetailPage: React.FC<DistrictDetailPageProps> = ({ params }) => {
  const district = getDistrictBySlug(params.slug);

  if (!district) {
    notFound();
  }

  const speciesList = getDistrictSpeciesList(params.slug);

  // Format district name for display
  const displayName = district.district;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-4">
            <Link href="/biodiversity" className="hover:underline">
              Biodiversity
            </Link>
            <span>/</span>
            <span className="text-blue-100">{displayName}</span>
          </div>

          <h1 className="text-4xl font-bold mb-4">{displayName} District</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            District-level biodiversity intelligence including species richness, 
            endemic species, threatened species, and habitat distribution.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          <MetricCard label="Total Species" value={district.totalSpecies} highlight />
          <MetricCard label="Mammals" value={district.mammals} />
          <MetricCard label="Birds" value={district.birds} />
          <MetricCard label="Fish" value={district.fish} />
          <MetricCard label="Plants" value={district.plants} />
          <MetricCard label="Medicinal Plants" value={district.medicinalPlants} />
          <MetricCard label="Threatened" value={district.threatenedSpecies} warning />
          <MetricCard label="Endemic" value={district.endemicSpecies} highlight />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Primary Habitats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Primary Habitats</h2>
            <div className="flex flex-wrap gap-2">
              {district.primaryHabitats.map((habitat) => (
                <Link
                  key={habitat}
                  href={`/biodiversity/habitat/${getHabitatSlug(habitat)}`}
                  className="px-4 py-2 bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition-colors"
                >
                  {formatHabitatName(habitat)}
                </Link>
              ))}
            </div>

            {/* Habitat Breakdown Chart */}
            <div className="mt-6">
              <h3 className="font-semibold text-gray-700 mb-3">Habitat Distribution</h3>
              <div className="space-y-2">
                {district.primaryHabitats.map((habitat, index) => (
                  <div key={habitat} className="flex items-center gap-3">
                    <div
                      className={`w-4 h-4 rounded ${getHabitatColor(habitat)}`}
                    />
                    <span className="text-gray-700 capitalize flex-1">
                      {habitat.replace(/-/g, ' ')}
                    </span>
                    <span className="text-gray-500 text-sm">
                      {Math.round(100 / district.primaryHabitats.length)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Risk Indicators */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Risk Indicators</h2>
            
            <div className="space-y-4">
              <RiskIndicator
                label="Habitat Loss Risk"
                level={district.habitatLossRisk}
              />
              <RiskIndicator
                label="Human-Wildlife Conflict"
                level={district.humanWildlifeConflict}
              />
              {district.wetlandBirdConcentration !== undefined && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-sm text-blue-700 font-medium">
                    Wetland Bird Concentration
                  </div>
                  <div className="text-2xl font-bold text-blue-900">
                    {district.wetlandBirdConcentration} species
                  </div>
                </div>
              )}
              {district.alpineBiodiversityScore !== undefined && (
                <div className="p-4 bg-purple-50 rounded-lg">
                  <div className="text-sm text-purple-700 font-medium">
                    Alpine Biodiversity Score
                  </div>
                  <div className="text-2xl font-bold text-purple-900">
                    {district.alpineBiodiversityScore}/100
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Protected Area Coverage */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Protected Area Coverage
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-green-600">
              {district.protectedAreaCoverage.toLocaleString()} km²
            </div>
            <div className="text-gray-600">
              across {district.relatedProtectedAreas.length} protected areas
            </div>
          </div>

          {district.relatedProtectedAreas.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {district.relatedProtectedAreas.map((pa) => (
                <Link
                  key={pa}
                  href={`/protected-areas/${pa}`}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors"
                >
                  {formatName(pa)}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Biodiversity Hotspots */}
        {district.biodiversityHotspots.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Biodiversity Hotspots
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {district.biodiversityHotspots.map((hotspot, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border border-green-200"
                >
                  <div className="flex items-start gap-2">
                    <span className="text-2xl">🌿</span>
                    <div>
                      <div className="font-semibold text-gray-800">{hotspot}</div>
                      <div className="text-sm text-gray-600">
                        Priority conservation area
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Endemic Species */}
        {district.endemicSpeciesList.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Endemic Species ({district.endemicSpeciesList.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {speciesList
                .filter((s) => district.endemicSpeciesList.includes(s.slug))
                .slice(0, 4)
                .map((species) => (
                  <Link
                    key={species.id}
                    href={`/biodiversity/species/${species.slug}`}
                    className="group"
                  >
                    <div className="bg-blue-50 rounded-lg p-4 hover:bg-blue-100 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <EndemismBadge status={species.endemismStatus} />
                        <ConservationStatusBadge status={species.conservationStatus} />
                      </div>
                      <h3 className="font-bold text-gray-800 group-hover:text-blue-700">
                        {species.commonName}
                      </h3>
                      <p className="text-sm text-gray-600 italic">
                        {species.scientificName}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}

        {/* Threatened Species */}
        {district.threatenedSpeciesList.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Threatened Species ({district.threatenedSpeciesList.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {speciesList
                .filter((s) => district.threatenedSpeciesList.includes(s.slug))
                .slice(0, 4)
                .map((species) => (
                  <Link
                    key={species.id}
                    href={`/biodiversity/species/${species.slug}`}
                    className="group"
                  >
                    <div className="bg-red-50 rounded-lg p-4 hover:bg-red-100 transition-colors">
                      <div className="flex items-center gap-2 mb-2">
                        <ConservationStatusBadge status={species.conservationStatus} />
                      </div>
                      <h3 className="font-bold text-gray-800 group-hover:text-red-700">
                        {species.commonName}
                      </h3>
                      <p className="text-sm text-gray-600 italic">
                        {species.scientificName}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        )}

        {/* All Species */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Species in {displayName} ({speciesList.length})
          </h2>
          {speciesList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {speciesList.slice(0, 12).map((species) => (
                <Link
                  key={species.id}
                  href={`/biodiversity/species/${species.slug}`}
                  className="block"
                >
                  <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-gray-800">
                          {species.commonName}
                        </h3>
                        <p className="text-sm text-gray-600 italic">
                          {species.scientificName}
                        </p>
                      </div>
                      <ConservationStatusBadge status={species.conservationStatus} />
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      {species.endemismStatus !== 'widely-distributed' && (
                        <EndemismBadge status={species.endemismStatus} size="sm" />
                      )}
                      <SourceVerificationBadge dataSource={species.dataSource} size="sm" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              Species data coming soon. Check back later for updates.
            </p>
          )}

          {speciesList.length > 12 && (
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                +{speciesList.length - 12} more species available
              </p>
            </div>
          )}
        </div>

        {/* Related Trails */}
        {district.relatedTrails && district.relatedTrails.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Related Trails
            </h2>
            <div className="flex flex-wrap gap-2">
              {district.relatedTrails.map((trail) => (
                <Link
                  key={trail}
                  href={`/trails/${trail}`}
                  className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full hover:bg-purple-200 transition-colors"
                >
                  {formatName(trail)}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Monitoring Info */}
        {district.monitoringSites && district.lastSurveyYear && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Monitoring Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Last Survey Year</div>
                <div className="text-2xl font-bold text-gray-800">
                  {district.lastSurveyYear}
                </div>
              </div>
              {district.monitoringSites.length > 0 && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">Monitoring Sites</div>
                  <ul className="space-y-1">
                    {district.monitoringSites.map((site, index) => (
                      <li key={index} className="text-gray-800 flex items-center gap-1">
                        <span>✓</span>
                        <span>{site}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper Functions

function getHabitatSlug(habitat: string): string {
  const mapping: Record<string, string> = {
    'wetland': 'wetland-biodiversity',
    'temperate-forest': 'forest-biodiversity',
    'coniferous-forest': 'forest-biodiversity',
    'alpine-meadow': 'alpine-biodiversity',
    'riparian': 'river-stream-biodiversity',
    'high-altitude-desert': 'alpine-biodiversity',
    'rocky-slope': 'alpine-biodiversity',
    'agricultural': 'meadow-grassland-biodiversity',
    'subtropical': 'forest-biodiversity',
  };
  return mapping[habitat] || 'forest-biodiversity';
}

function formatHabitatName(habitat: string): string {
  return habitat.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

function formatName(name: string): string {
  return name.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

function getHabitatColor(habitat: string): string {
  const colors: Record<string, string> = {
    'wetland': 'bg-blue-500',
    'temperate-forest': 'bg-green-600',
    'coniferous-forest': 'bg-green-700',
    'alpine-meadow': 'bg-purple-500',
    'riparian': 'bg-blue-400',
    'high-altitude-desert': 'bg-yellow-600',
    'rocky-slope': 'bg-gray-500',
    'agricultural': 'bg-yellow-400',
    'subtropical': 'bg-green-500',
  };
  return colors[habitat] || 'bg-gray-400';
}

// Helper Components

const MetricCard: React.FC<{
  label: string;
  value: number;
  highlight?: boolean;
  warning?: boolean;
}> = ({ label, value, highlight, warning }) => (
  <div
    className={`p-4 rounded-lg ${
      highlight
        ? 'bg-blue-100 border-2 border-blue-300'
        : warning
        ? 'bg-red-50 border-2 border-red-200'
        : 'bg-white border'
    }`}
  >
    <div className="text-2xl font-bold text-gray-800">{value}</div>
    <div
      className={`text-sm ${
        highlight
          ? 'text-blue-700'
          : warning
          ? 'text-red-600'
          : 'text-gray-600'
      }`}
    >
      {label}
    </div>
  </div>
);

const RiskIndicator: React.FC<{
  label: string;
  level: string;
}> = ({ label, level }) => {
  const colors: Record<string, string> = {
    low: 'bg-green-500',
    medium: 'bg-yellow-500',
    high: 'bg-orange-500',
    critical: 'bg-red-500',
  };

  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">{label}</span>
        <div className={`w-3 h-3 rounded-full ${colors[level] || 'bg-gray-400'}`} />
      </div>
      <div className="text-lg font-semibold text-gray-800 capitalize">
        {level}
      </div>
    </div>
  );
};

const ConservationStatusBadge: React.FC<{
  status: string;
}> = ({ status }) => {
  const colors: Record<string, string> = {
    LC: 'bg-green-100 text-green-800',
    NT: 'bg-yellow-100 text-yellow-800',
    VU: 'bg-orange-100 text-orange-800',
    EN: 'bg-red-100 text-red-800',
    CR: 'bg-red-800 text-white',
    EW: 'bg-gray-800 text-white',
    EX: 'bg-black text-white',
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-bold ${
        colors[status] || 'bg-gray-100 text-gray-800'
      }`}
    >
      {status}
    </span>
  );
};

const EndemismBadge: React.FC<{ status: string; size?: 'sm' | 'md' }> = ({ status, size = 'md' }) => {
  const labels: Record<string, string> = {
    'kashmir-endemic': 'Kashmir Endemic',
    'himalayan-endemic': 'Himalayan Endemic',
    'northwest-himalayan': 'NW Himalayan',
    'trans-himalayan': 'Trans-Himalayan',
    'widely-distributed': 'Wide Distribution',
  };

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span className={`${sizeClasses} rounded font-medium bg-blue-100 text-blue-800`}>
      {labels[status] || status}
    </span>
  );
};

export default DistrictDetailPage;
