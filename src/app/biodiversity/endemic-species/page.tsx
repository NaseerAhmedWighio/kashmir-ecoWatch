'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getEndemicSpecies, getSpeciesCount } from '@/data/biodiversity-access';
import type { EndemismStatus, TaxonomicGroup } from '@/types/biodiversity';
import SourceVerificationBadge from '@/components/biodiversity/intelligence/SourceVerificationBadge';

const EndemicSpeciesPage: React.FC = () => {
  const [filterEndemism, setFilterEndemism] = useState<EndemismStatus | 'all'>('all');
  const [filterTaxon, setFilterTaxon] = useState<TaxonomicGroup | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const allEndemic = getEndemicSpecies();
  const speciesCount = getSpeciesCount();

  // Apply filters
  let filteredSpecies = allEndemic;

  if (filterEndemism !== 'all') {
    filteredSpecies = filteredSpecies.filter((s) => s.endemismStatus === filterEndemism);
  }

  if (filterTaxon !== 'all') {
    filteredSpecies = filteredSpecies.filter((s) => s.taxonomicGroup === filterTaxon);
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredSpecies = filteredSpecies.filter(
      (s) =>
        s.commonName.toLowerCase().includes(query) ||
        s.scientificName.toLowerCase().includes(query) ||
        s.localName?.toLowerCase().includes(query)
    );
  }

  // Count by endemism level
  const endemismCounts = {
    'kashmir-endemic': allEndemic.filter((s) => s.endemismStatus === 'kashmir-endemic').length,
    'himalayan-endemic': allEndemic.filter((s) => s.endemismStatus === 'himalayan-endemic').length,
    'northwest-himalayan': allEndemic.filter((s) => s.endemismStatus === 'northwest-himalayan').length,
    'trans-himalayan': allEndemic.filter((s) => s.endemismStatus === 'trans-himalayan').length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-4">
            <Link href="/biodiversity" className="hover:underline">
              Biodiversity
            </Link>
            <span>/</span>
            <span className="text-emerald-100">Endemic Species</span>
          </div>

          <h1 className="text-4xl font-bold mb-4">Endemic Species of Kashmir</h1>
          <p className="text-xl text-emerald-100 max-w-3xl">
            Unique species found only in the Kashmir region and the Himalayas. 
            These species represent our natural heritage and require special conservation attention.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <StatCard
            label="Total Endemic"
            value={allEndemic.length}
            color="bg-emerald-100 text-emerald-800"
          />
          <StatCard
            label="Kashmir Endemic"
            value={endemismCounts['kashmir-endemic']}
            color="bg-blue-100 text-blue-800"
          />
          <StatCard
            label="Himalayan Endemic"
            value={endemismCounts['himalayan-endemic']}
            color="bg-purple-100 text-purple-800"
          />
          <StatCard
            label="NW Himalayan"
            value={endemismCounts['northwest-himalayan']}
            color="bg-indigo-100 text-indigo-800"
          />
          <StatCard
            label="Trans-Himalayan"
            value={endemismCounts['trans-himalayan']}
            color="bg-amber-100 text-amber-800"
          />
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Filters</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Species
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>

            {/* Endemism Level Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Endemism Level
              </label>
              <select
                value={filterEndemism}
                onChange={(e) => setFilterEndemism(e.target.value as EndemismStatus | 'all')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="all">All Levels</option>
                <option value="kashmir-endemic">Kashmir Endemic</option>
                <option value="himalayan-endemic">Himalayan Endemic</option>
                <option value="northwest-himalayan">NW Himalayan</option>
                <option value="trans-himalayan">Trans-Himalayan</option>
              </select>
            </div>

            {/* Taxonomic Group Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Taxonomic Group
              </label>
              <select
                value={filterTaxon}
                onChange={(e) => setFilterTaxon(e.target.value as TaxonomicGroup | 'all')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="all">All Groups</option>
                <option value="mammals">Mammals</option>
                <option value="birds">Birds</option>
                <option value="fish">Fish</option>
                <option value="plants">Plants</option>
                <option value="medicinal-plants">Medicinal Plants</option>
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(filterEndemism !== 'all' || filterTaxon !== 'all' || searchQuery) && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              {searchQuery && (
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  Search: {searchQuery}
                </span>
              )}
              {filterEndemism !== 'all' && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {formatEndemismLabel(filterEndemism)}
                </span>
              )}
              {filterTaxon !== 'all' && (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                  {formatTaxonLabel(filterTaxon)}
                </span>
              )}
              <button
                onClick={() => {
                  setFilterEndemism('all');
                  setFilterTaxon('all');
                  setSearchQuery('');
                }}
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Clear all
              </button>
            </div>
          )}

          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredSpecies.length} of {allEndemic.length} endemic species
          </div>
        </div>

        {/* Endemism Map Placeholder */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Endemism Distribution
          </h2>
          <div className="bg-gradient-to-br from-emerald-50 to-blue-50 rounded-lg p-8 text-center">
            <div className="text-6xl mb-4">🗺️</div>
            <p className="text-gray-700 mb-4">
              Interactive endemism map showing species distribution across Kashmir districts
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              {Object.entries(endemismCounts).map(([level, count]) => (
                <div
                  key={level}
                  className="p-3 bg-white rounded-lg shadow-sm"
                >
                  <div className="text-2xl font-bold text-emerald-600">{count}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {formatEndemismLabel(level as EndemismStatus)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Species Grid */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Endemic Species Registry
          </h2>

          {filteredSpecies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSpecies.map((species) => (
                <Link
                  key={species.id}
                  href={`/biodiversity/species/${species.slug}`}
                  className="group"
                >
                  <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm group-hover:shadow-md transition-all">
                    {species.imageUrl && (
                      <img
                        src={species.imageUrl}
                        alt={species.commonName}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <EndemismBadge status={species.endemismStatus} />
                        <ConservationStatusBadge status={species.conservationStatus} />
                        {species.conservationPriority && species.conservationPriority >= 7 && (
                          <PriorityBadge priority={species.conservationPriority} />
                        )}
                      </div>
                      <h3 className="font-bold text-gray-800 group-hover:text-emerald-700 mb-1">
                        {species.commonName}
                      </h3>
                      <p className="text-sm text-gray-600 italic mb-2">
                        {species.scientificName}
                      </p>
                      {species.localName && (
                        <p className="text-xs text-gray-500 mb-2">
                          Local: {species.localName}
                        </p>
                      )}
                      <div className="text-xs text-gray-600">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">Districts:</span>
                          <span className="text-gray-700">{species.districts.slice(0, 3).join(', ')}</span>
                          {species.districts.length > 3 && (
                            <span className="text-gray-500">+{species.districts.length - 3} more</span>
                          )}
                        </div>
                        <SourceVerificationBadge dataSource={species.dataSource} size="sm" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-600 text-lg">
                No endemic species found matching your filters
              </p>
              <button
                onClick={() => {
                  setFilterEndemism('all');
                  setFilterTaxon('all');
                  setSearchQuery('');
                }}
                className="mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Conservation Priority Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Conservation Priority
          </h2>
          <div className="space-y-4">
            <PriorityLevel
              level="Kashmir Priority Species"
              description="Species unique to Kashmir requiring immediate conservation action"
              count={allEndemic.filter((s) => (s.conservationPriority || 0) >= 8).length}
              color="bg-red-500"
            />
            <PriorityLevel
              level="High Priority"
              description="Endemic species with threatened conservation status"
              count={allEndemic.filter((s) => ['VU', 'EN', 'CR'].includes(s.conservationStatus)).length}
              color="bg-orange-500"
            />
            <PriorityLevel
              level="Monitoring Required"
              description="Endemic species requiring regular population monitoring"
              count={allEndemic.filter((s) => (s.conservationPriority || 0) >= 5 && (s.conservationPriority || 0) < 8).length}
              color="bg-yellow-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper Components

const StatCard: React.FC<{
  label: string;
  value: number;
  color: string;
}> = ({ label, value, color }) => (
  <div className={`${color} rounded-lg p-4`}>
    <div className="text-3xl font-bold">{value}</div>
    <div className="text-sm mt-1 opacity-90">{label}</div>
  </div>
);

const EndemismBadge: React.FC<{ status: string }> = ({ status }) => {
  const config: Record<string, { label: string; color: string }> = {
    'kashmir-endemic': { label: 'Kashmir Endemic', color: 'bg-red-100 text-red-800 border-red-300' },
    'himalayan-endemic': { label: 'Himalayan Endemic', color: 'bg-purple-100 text-purple-800 border-purple-300' },
    'northwest-himalayan': { label: 'NW Himalayan', color: 'bg-indigo-100 text-indigo-800 border-indigo-300' },
    'trans-himalayan': { label: 'Trans-Himalayan', color: 'bg-amber-100 text-amber-800 border-amber-300' },
  };

  const { label, color } = config[status] || { label: status, color: 'bg-gray-100 text-gray-800' };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium border ${color}`}>
      {label}
    </span>
  );
};

const ConservationStatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const colors: Record<string, string> = {
    LC: 'bg-green-100 text-green-800',
    NT: 'bg-yellow-100 text-yellow-800',
    VU: 'bg-orange-100 text-orange-800',
    EN: 'bg-red-100 text-red-800',
    CR: 'bg-red-800 text-white',
  };

  return (
    <span className={`px-2 py-1 rounded text-xs font-bold ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
};

const PriorityBadge: React.FC<{ priority: number }> = ({ priority }) => {
  const color = priority >= 8 ? 'bg-red-500' : priority >= 6 ? 'bg-orange-500' : 'bg-yellow-500';

  return (
    <span className={`px-2 py-1 rounded text-xs font-bold text-white ${color}`}>
      Priority {priority}/10
    </span>
  );
};

const PriorityLevel: React.FC<{
  level: string;
  description: string;
  count: number;
  color: string;
}> = ({ level, description, count, color }) => (
  <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
    <div className={`w-4 h-4 rounded-full ${color}`} />
    <div className="flex-1">
      <div className="font-semibold text-gray-800">{level}</div>
      <div className="text-sm text-gray-600">{description}</div>
    </div>
    <div className="text-2xl font-bold text-gray-800">{count} species</div>
  </div>
);

// Helper Functions

function formatEndemismLabel(level: string): string {
  return level.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

function formatTaxonLabel(taxon: string): string {
  return taxon.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

export default EndemicSpeciesPage;
