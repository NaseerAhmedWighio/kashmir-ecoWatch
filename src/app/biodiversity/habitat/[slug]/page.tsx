'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import {
  getHabitatBySlug,
  getHabitatSpeciesList,
} from '@/data/biodiversity-access';
import PressureIndexGauge from '@/components/biodiversity/intelligence/PressureIndexGauge';
import VulnerabilityTrendChart from '@/components/biodiversity/intelligence/VulnerabilityTrendChart';
import SourceVerificationBadge from '@/components/biodiversity/intelligence/SourceVerificationBadge';
import { BiodiversityCard } from '@/components/common/BiodiversityCard';

const HabitatDetailPage: React.FC = () => {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [habitat, setHabitat] = useState<any>(null);
  const [speciesList, setSpeciesList] = useState<any[]>([]);

  useEffect(() => {
    if (slug) {
      const habitatData = getHabitatBySlug(slug);
      if (!habitatData) {
        notFound();
        return;
      }
      setHabitat(habitatData);
      setSpeciesList(getHabitatSpeciesList(slug));
    }
  }, [slug]);

  if (!habitat) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-4">
            <Link href="/biodiversity" className="hover:underline">
              Biodiversity
            </Link>
            <span>/</span>
            <span className="text-green-100">{habitat.name}</span>
          </div>

          <h1 className="text-4xl font-bold mb-4">{habitat.name}</h1>
          <p className="text-xl text-green-100 max-w-3xl">{habitat.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <MetricCard label="Area (km²)" value={habitat.areaKm2.toLocaleString()} />
          <MetricCard label="% of Kashmir" value={habitat.percentOfKashmir.toFixed(1)} />
          <MetricCard label="Total Species" value={habitat.speciesCount.toLocaleString()} />
          <MetricCard
            label="Endemic Species"
            value={habitat.endemicSpecies}
            highlight
          />
          <MetricCard
            label="Threatened Species"
            value={habitat.threatenedSpecies}
            warning
          />
          <MetricCard
            label="Migratory Species"
            value={habitat.migratorySpecies}
          />
          <MetricCard
            label="PA Overlap (km²)"
            value={habitat.protectedAreaOverlap.toLocaleString()}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pressure Index */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Habitat Pressure Index
            </h2>
            <PressureIndexGauge
              pressureIndex={habitat.pressureIndex}
              size="md"
              showDrivers
            />
          </div>

          {/* Vulnerability Trend */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Vulnerability Trend
            </h2>
            <VulnerabilityTrendChart trend={habitat.vulnerabilityTrend} height={250} />
          </div>
        </div>

        {/* Taxonomic Breakdown */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Species by Taxonomic Group
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <TaxonCard label="Mammals" count={habitat.byTaxonomicGroup.mammals} />
            <TaxonCard label="Birds" count={habitat.byTaxonomicGroup.birds} />
            <TaxonCard label="Fish" count={habitat.byTaxonomicGroup.fish} />
            <TaxonCard label="Plants" count={habitat.byTaxonomicGroup.plants} />
            <TaxonCard
              label="Medicinal Plants"
              count={habitat.byTaxonomicGroup.medicinalPlants}
            />
          </div>
        </div>

        {/* Districts */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Districts with {habitat.name}
          </h2>
          <div className="flex flex-wrap gap-2">
            {habitat.districts.map((district) => (
              <Link
                key={district}
                href={`/biodiversity/district/${district.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-2 bg-green-100 text-green-800 rounded-full hover:bg-green-200 transition-colors"
              >
                {district}
              </Link>
            ))}
          </div>
        </div>

        {/* Risk Drivers */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Risk Drivers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {habitat.riskDrivers.map((driver, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-red-50 rounded-lg"
              >
                <span className="text-red-600 text-xl">⚠️</span>
                <span className="text-gray-800 font-medium">{driver}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Flagship Species */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Flagship Species</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {speciesList
              .filter((s) => habitat.flagshipSpecies.includes(s.slug))
              .map((species) => (
                <Link
                  key={species.id}
                  href={`/biodiversity/species/${species.slug}`}
                  className="group"
                >
                  <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                    {species.imageUrl && (
                      <img
                        src={species.imageUrl}
                        alt={species.commonName}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h3 className="font-bold text-gray-800 group-hover:text-green-700">
                        {species.commonName}
                      </h3>
                      <p className="text-sm text-gray-600 italic">
                        {species.scientificName}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <ConservationStatusBadge status={species.conservationStatus} />
                        {species.endemismStatus !== 'widely-distributed' && (
                          <EndemismBadge status={species.endemismStatus} />
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        {/* All Species */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Species in this Habitat ({speciesList.length})
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
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                      <SourceVerificationBadge
                        dataSource={species.dataSource}
                        size="sm"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              Species list coming soon. Check back later for updates.
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

        {/* Related Protected Areas */}
        {habitat.relatedProtectedAreas.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Related Protected Areas
            </h2>
            <div className="flex flex-wrap gap-2">
              {habitat.relatedProtectedAreas.map((pa) => (
                <Link
                  key={pa}
                  href={`/protected-areas/${pa}`}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors"
                >
                  {pa.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Trails */}
        {habitat.relatedTrails && habitat.relatedTrails.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Related Trails
            </h2>
            <div className="flex flex-wrap gap-2">
              {habitat.relatedTrails.map((trail) => (
                <Link
                  key={trail}
                  href={`/trails/${trail}`}
                  className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full hover:bg-purple-200 transition-colors"
                >
                  {trail.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Helper Components

const MetricCard: React.FC<{
  label: string;
  value: string | number;
  highlight?: boolean;
  warning?: boolean;
}> = ({ label, value, highlight, warning }) => (
  <div
    className={`p-4 rounded-lg ${
      highlight
        ? 'bg-green-100 border-2 border-green-300'
        : warning
        ? 'bg-red-50 border-2 border-red-200'
        : 'bg-white border'
    }`}
  >
    <div className="text-2xl font-bold text-gray-800">{value}</div>
    <div
      className={`text-sm ${
        highlight
          ? 'text-green-700'
          : warning
          ? 'text-red-600'
          : 'text-gray-600'
      }`}
    >
      {label}
    </div>
  </div>
);

const TaxonCard: React.FC<{ label: string; count: number }> = ({ label, count }) => (
  <div className="p-4 bg-gray-50 rounded-lg text-center">
    <div className="text-3xl font-bold text-gray-800">{count}</div>
    <div className="text-sm text-gray-600 mt-1">{label}</div>
  </div>
);

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

const EndemismBadge: React.FC<{ status: string }> = ({ status }) => {
  const labels: Record<string, string> = {
    'kashmir-endemic': 'Kashmir Endemic',
    'himalayan-endemic': 'Himalayan Endemic',
    'northwest-himalayan': 'NW Himalayan',
    'trans-himalayan': 'Trans-Himalayan',
  };

  return (
    <span className="px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800">
      {labels[status] || status}
    </span>
  );
};

export default HabitatDetailPage;
