'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getMigrationCalendar, getMigratorySpecies, getFlywayData } from '@/data/biodiversity-access';
import type { MigrationType, Flyway, Season } from '@/types/biodiversity';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MigrationCalendarPage: React.FC = () => {
  const calendar = getMigrationCalendar();
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<MigrationType | 'all'>('all');
  const [filterFlyway, setFilterFlyway] = useState<Flyway | 'all'>('all');

  // Calculate statistics
  const allMigratory = getMigratorySpecies();
  const flywayStats = {
    centralAsian: getFlywayData('central-asian').length,
    eastAsian: getFlywayData('east-asian').length,
    westAsian: getFlywayData('west-asian').length,
  };

  const typeStats = {
    breeder: getMigratorySpecies('spring').filter(s => s.migrationWindow?.migrationType === 'breeder').length,
    winterVisitor: getMigratorySpecies('winter').filter(s => s.migrationWindow?.migrationType === 'winter-visitor').length,
    summerVisitor: getMigratorySpecies('summer').filter(s => s.migrationWindow?.migrationType === 'summer-visitor').length,
    passageMigrant: allMigratory.filter(s => s.migrationWindow?.migrationType === 'passage-migrant').length,
  };

  // Filter calendar data
  const filteredCalendar = calendar.map((month) => {
    let species = month.species;

    if (filterType !== 'all') {
      species = species.filter((s) => s.migrationWindow?.migrationType === filterType);
    }

    if (filterFlyway !== 'all') {
      species = species.filter((s) => s.migrationWindow?.flyway === filterFlyway);
    }

    return {
      ...month,
      species,
      peakSpecies: species.filter((s) => month.peakSpecies.includes(s)),
    };
  });

  const selectedMonthData = selectedMonth ? filteredCalendar[selectedMonth - 1] : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-700 to-sky-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm mb-4">
            <Link href="/biodiversity" className="hover:underline">
              Biodiversity
            </Link>
            <span>/</span>
            <span className="text-sky-100">Migration Calendar</span>
          </div>

          <h1 className="text-4xl font-bold mb-4">Migration Calendar</h1>
          <p className="text-xl text-sky-100 max-w-3xl">
            Track migratory species presence throughout the year. 
            Monitor arrival and departure patterns across Kashmir&apos;s wetlands and forests.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <StatCard
            label="Total Migratory"
            value={allMigratory.length}
            color="bg-sky-100 text-sky-800"
          />
          <StatCard
            label="Breeders"
            value={typeStats.breeder}
            color="bg-green-100 text-green-800"
          />
          <StatCard
            label="Winter Visitors"
            value={typeStats.winterVisitor}
            color="bg-blue-100 text-blue-800"
          />
          <StatCard
            label="Summer Visitors"
            value={typeStats.summerVisitor}
            color="bg-amber-100 text-amber-800"
          />
          <StatCard
            label="Passage Migrants"
            value={typeStats.passageMigrant}
            color="bg-purple-100 text-purple-800"
          />
        </div>

        {/* Flyway Distribution */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Migration Flyways</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FlywayCard
              name="Central Asian Flyway"
              count={flywayStats.centralAsian}
              description="Primary route for waterbirds and raptors"
              color="bg-blue-500"
              icon="🦅"
            />
            <FlywayCard
              name="East Asian Flyway"
              count={flywayStats.eastAsian}
              description="Route for shorebirds and passerines"
              color="bg-green-500"
              icon="🐦"
            />
            <FlywayCard
              name="West Asian Flyway"
              count={flywayStats.westAsian}
              description="Route for waterfowl and waders"
              color="bg-purple-500"
              icon="🦆"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Migration Type
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value as MigrationType | 'all')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="breeder">Breeding Species</option>
                <option value="winter-visitor">Winter Visitors</option>
                <option value="summer-visitor">Summer Visitors</option>
                <option value="passage-migrant">Passage Migrants</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Flyway
              </label>
              <select
                value={filterFlyway}
                onChange={(e) => setFilterFlyway(e.target.value as Flyway | 'all')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              >
                <option value="all">All Flyways</option>
                <option value="central-asian">Central Asian</option>
                <option value="east-asian">East Asian</option>
                <option value="west-asian">West Asian</option>
              </select>
            </div>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Monthly Migration Pattern
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCalendar.map((month) => (
              <button
                key={month.month}
                onClick={() => setSelectedMonth(selectedMonth === month.month ? null : month.month)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedMonth === month.month
                    ? 'border-sky-500 bg-sky-50'
                    : 'border-gray-200 hover:border-sky-300'
                }`}
              >
                <div className="text-center">
                  <div className="font-bold text-gray-800 mb-2">{month.name}</div>
                  <div className="text-3xl font-bold text-sky-600 mb-1">
                    {month.species.length}
                  </div>
                  <div className="text-xs text-gray-600">species present</div>
                  {month.peakSpecies.length > 0 && (
                    <div className="mt-2 text-xs text-amber-600 font-medium">
                      ★ {month.peakSpecies.length} at peak
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Month Detail */}
        {selectedMonthData && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedMonthData.name} - Species Present
              </h2>
              <button
                onClick={() => setSelectedMonth(null)}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                ✕ Close
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedMonthData.species.map((species) => (
                <Link
                  key={species.id}
                  href={`/biodiversity/species/${species.slug}`}
                  className="block"
                >
                  <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-gray-800">{species.commonName}</h3>
                        <p className="text-sm text-gray-600 italic">{species.scientificName}</p>
                      </div>
                      <ConservationStatusBadge status={species.conservationStatus} />
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      {species.migrationWindow && (
                        <>
                          <MigrationTypeBadge type={species.migrationWindow.migrationType} />
                          {species.migrationWindow.flyway && (
                            <FlywayBadge flyway={species.migrationWindow.flyway} />
                          )}
                          {species.migrationWindow.concentration && (
                            <ConcentrationBadge level={species.migrationWindow.concentration} />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Migration Type Legend */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Migration Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MigrationTypeCard
              type="breeder"
              label="Breeding Species"
              description="Arrive in spring to breed and raise young"
              icon="🪺"
              color="bg-green-500"
            />
            <MigrationTypeCard
              type="winter-visitor"
              label="Winter Visitors"
              description="Arrive in autumn to escape northern winters"
              icon="❄️"
              color="bg-blue-500"
            />
            <MigrationTypeCard
              type="summer-visitor"
              label="Summer Visitors"
              description="Arrive in spring for warmer months"
              icon="☀️"
              color="bg-amber-500"
            />
            <MigrationTypeCard
              type="passage-migrant"
              label="Passage Migrants"
              description="Pass through during migration to other regions"
              icon="➡️"
              color="bg-purple-500"
            />
          </div>
        </div>

        {/* Peak Migration Periods */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Peak Migration Periods</h2>
          <div className="space-y-4">
            <PeakPeriod
              season="Spring Migration"
              months="March - May"
              description="Waterfowl and waders moving north; breeders arriving"
              intensity="high"
              species={calendar.slice(2, 5).reduce((acc, m) => acc + m.species.length, 0)}
            />
            <PeakPeriod
              season="Autumn Migration"
              months="September - November"
              description="Waterfowl and waders moving south; winter visitors arriving"
              intensity="high"
              species={calendar.slice(8, 11).reduce((acc, m) => acc + m.species.length, 0)}
            />
            <PeakPeriod
              season="Winter Presence"
              months="December - February"
              description="Peak winter visitor concentrations at wetlands"
              intensity="medium"
              species={calendar.slice(0, 2).reduce((acc, m) => acc + m.species.length, 0) + calendar[11].species.length}
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

const FlywayCard: React.FC<{
  name: string;
  count: number;
  description: string;
  color: string;
  icon: string;
}> = ({ name, count, description, color, icon }) => (
  <div className="bg-gray-50 rounded-lg p-6">
    <div className="flex items-center gap-3 mb-3">
      <span className="text-4xl">{icon}</span>
      <div className={`w-4 h-4 rounded-full ${color}`} />
    </div>
    <div className="text-3xl font-bold text-gray-800 mb-2">{count}</div>
    <div className="font-semibold text-gray-800 mb-1">{name}</div>
    <div className="text-sm text-gray-600">{description}</div>
  </div>
);

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

const MigrationTypeBadge: React.FC<{ type: MigrationType }> = ({ type }) => {
  const config: Record<MigrationType, { label: string; color: string }> = {
    'breeder': { label: 'Breeder', color: 'bg-green-100 text-green-800' },
    'winter-visitor': { label: 'Winter Visitor', color: 'bg-blue-100 text-blue-800' },
    'summer-visitor': { label: 'Summer Visitor', color: 'bg-amber-100 text-amber-800' },
    'passage-migrant': { label: 'Passage Migrant', color: 'bg-purple-100 text-purple-800' },
  };

  const { label, color } = config[type];

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${color}`}>
      {label}
    </span>
  );
};

const FlywayBadge: React.FC<{ flyway: Flyway }> = ({ flyway }) => {
  const config: Record<Flyway, { label: string; color: string }> = {
    'central-asian': { label: 'Central Asian', color: 'bg-blue-100 text-blue-800' },
    'east-asian': { label: 'East Asian', color: 'bg-green-100 text-green-800' },
    'west-asian': { label: 'West Asian', color: 'bg-purple-100 text-purple-800' },
  };

  const { label, color } = config[flyway];

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${color}`}>
      {label}
    </span>
  );
};

const ConcentrationBadge: React.FC<{ level: string }> = ({ level }) => {
  const config: Record<string, { label: string; color: string }> = {
    'low': { label: 'Low', color: 'bg-gray-100 text-gray-800' },
    'medium': { label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
    'high': { label: 'High', color: 'bg-orange-100 text-orange-800' },
    'very-high': { label: 'Very High', color: 'bg-red-100 text-red-800' },
  };

  const { label, color } = config[level] || { label: level, color: 'bg-gray-100 text-gray-800' };

  return (
    <span className={`px-2 py-1 rounded text-xs font-medium ${color}`}>
      {label}
    </span>
  );
};

const MigrationTypeCard: React.FC<{
  type: string;
  label: string;
  description: string;
  icon: string;
  color: string;
}> = ({ type, label, description, icon, color }) => (
  <div className="bg-gray-50 rounded-lg p-4">
    <div className="flex items-center gap-2 mb-2">
      <span className="text-2xl">{icon}</span>
      <div className={`w-3 h-3 rounded-full ${color}`} />
    </div>
    <div className="font-semibold text-gray-800 mb-1">{label}</div>
    <div className="text-sm text-gray-600">{description}</div>
  </div>
);

const PeakPeriod: React.FC<{
  season: string;
  months: string;
  description: string;
  intensity: 'high' | 'medium' | 'low';
  species: number;
}> = ({ season, months, description, intensity, species }) => {
  const colors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500',
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
      <div className={`w-4 h-4 rounded-full ${colors[intensity]}`} />
      <div className="flex-1">
        <div className="font-semibold text-gray-800">{season}</div>
        <div className="text-sm text-gray-600">{months} • {description}</div>
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-gray-800">{species}</div>
        <div className="text-xs text-gray-600">species</div>
      </div>
    </div>
  );
};

export default MigrationCalendarPage;
