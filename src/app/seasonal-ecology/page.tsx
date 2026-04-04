'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import * as Icons from 'lucide-react';
import Link from 'next/link';
import { getSeasonalEcologyData, seasonalEcologyMetrics, seasonalEcologyNavigationCards, kashmirDistrictSeasons } from '@/data/seasonal-ecology';

export default function SeasonalEcologyHubPage() {
  const landscapes = getSeasonalEcologyData.landscapes.all();
  const blooms = getSeasonalEcologyData.blooms.all();
  const migrations = getSeasonalEcologyData.migration.all();

  const currentMonth = new Date().getMonth() + 1;
  const getCurrentSeason = () => {
    if (currentMonth >= 3 && currentMonth <= 5) return 'spring';
    if (currentMonth >= 6 && currentMonth <= 8) return 'summer';
    if (currentMonth >= 9 && currentMonth <= 11) return 'autumn';
    return 'winter';
  };
  const currentSeason = getCurrentSeason();

  return (
    <main className="min-h-screen bg-slate-950">{/* Hero Section */}
      <div className="relative pt-48 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/30 via-slate-950 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
        
        {/* Animated Gradient Orbs */}
        <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-emerald-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-[600px] h-[600px] bg-teal-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000" />

        <div className="relative max-w-[97rem] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
            <Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link>
            <Icons.ChevronRight className="w-4 h-4" />
            <span className="text-white">Seasonal Ecology</span>
          </nav>

          {/* Hero Content */}
          <div className="max-w-[97rem] mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 border border-white/10">
                <Icons.Calendar className="w-8 h-8 text-white" />
              </div>
              <Badge variant="success" size="md">
                <Icons.Clock className="w-3.5 h-3.5 mr-1" />
                Current: {formatLabel(currentSeason)}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Seasonal Ecology of{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Kashmir
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
              Kashmir-wide phenology, seasonality, migration, habitat-transition, and ecological-timing 
              intelligence system. Track bloom cycles, migration windows, pollinator activity, and 
              seasonal ecological shifts across the Kashmir region.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/seasonal-ecology/bloom-mapping">
                <Button variant="primary" size="lg">
                  <Icons.Flower2 className="w-5 h-5 mr-2" />
                  Explore Bloom Mapping
                </Button>
              </Link>
              <Link href="/seasonal-ecology/migration-windows">
                <Button variant="outline" size="lg">
                  <Icons.Bird className="w-5 h-5 mr-2" />
                  Migration Windows
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Ribbon */}
      <div className="max-w-[97rem] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <Card className="glass-intense border-slate-700/50">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 p-4">
            {seasonalEcologyMetrics.map((metric, idx) => {
              const MetricIcon = (Icons as any)[metric.icon] || Icons.Mountain;
              return (
                <div key={idx} className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                      <MetricIcon className="w-4 h-4 text-emerald-400" />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-white">{metric.value}</p>
                  <p className="text-xs text-slate-400">{metric.label}</p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Navigation Grid */}
      <div className="max-w-[97rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Explore Seasonal Ecology Across Kashmir
          </h2>
          <p className="text-slate-400">
            Comprehensive seasonal intelligence modules for Kashmir's diverse ecosystems
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {seasonalEcologyNavigationCards.map((card) => {
            const CardIcon = (Icons as any)[card.icon] || Icons.Mountain;
            return (
              <Link key={card.id} href={card.link} className="group">
                <Card className={`glass-intense border-slate-700/50 hover:border-emerald-500/30 transition-all h-full overflow-hidden ${card.featured ? 'ring-1 ring-emerald-500/30' : ''}`}>
                  <div className="p-5">
                    <div className="flex items-start gap-3 mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} border border-white/10`}>
                        <CardIcon className="w-6 h-6 text-white" />
                      </div>
                      {card.featured && (
                        <Badge variant="success" size="sm">Featured</Badge>
                      )}
                    </div>

                    <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-400 mb-4">
                      {card.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Icons.Database className="w-3.5 h-3.5" />
                        <span>{card.count} entities</span>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        <span>Explore</span>
                        <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Featured Landscapes */}
      <div className="max-w-[97rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Featured Seasonal Landscapes of Kashmir
            </h2>
            <p className="text-slate-400">
              Iconic landscape-scale seasonal patterns across the region
            </p>
          </div>
          <Link href="/seasonal-ecology/seasonal-landscapes">
            <Button variant="outline" size="md">
              View All
              <Icons.ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {landscapes.slice(0, 3).map((landscape) => (
            <Link
              key={landscape.id}
              href={`/seasonal-ecology/seasonal-landscapes/${landscape.slug}`}
              className="group"
            >
              <Card className="glass-intense border-slate-700/50 hover:border-emerald-500/30 transition-all h-full overflow-hidden">
                <div className="relative h-48 bg-gradient-to-br from-emerald-900/50 to-teal-900/50">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icons.Mountain className="w-16 h-16 text-slate-700" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="default" size="sm">
                      {formatLabel(landscape.category)}
                    </Badge>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white group-hover:text-emerald-400 transition-colors mb-2">
                    {landscape.name}
                  </h3>
                  <p className="text-sm text-slate-400 mb-4 line-clamp-2">
                    {landscape.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Icons.MapPin className="w-3.5 h-3.5" />
                    <span>{landscape.districts.length} districts</span>
                    <span className="mx-1">•</span>
                    <Icons.Mountain className="w-3.5 h-3.5" />
                    <span>{formatLabel(landscape.elevationZone)}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Current Seasonal Signals */}
      <div className="max-w-[97rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Current Seasonal Signals Across Kashmir
            </h2>
            <p className="text-slate-400">
              Active ecological transitions and timing windows for {formatLabel(currentSeason)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {blooms.slice(0, 4).map((bloom) => (
            <Link
              key={bloom.id}
              href={`/seasonal-ecology/bloom-mapping/${bloom.slug}`}
              className="group"
            >
              <Card className="glass-intense border-slate-700/50 hover:border-pink-500/30 transition-all h-full">
                <div className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-pink-500/20 border border-pink-500/30">
                      <Icons.Flower2 className="w-5 h-5 text-pink-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-white group-hover:text-pink-400 transition-colors line-clamp-1">
                        {bloom.name}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        {bloom.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Icons.Calendar className="w-3.5 h-3.5" />
                    <span className="line-clamp-1">{bloom.peakBloomPeriod}</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* District Season Highlights */}
      <div className="max-w-[97rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Kashmir District Season Highlights
          </h2>
          <p className="text-slate-400">
            Seasonal ecological highlights across Kashmir's districts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kashmirDistrictSeasons.slice(0, 8).map((districtSeason) => (
            <Card key={districtSeason.district} className="glass-intense border-slate-700/50">
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
                    <Icons.MapPin className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      {formatLabel(districtSeason.district)}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {districtSeason.primarySeasons.length} seasons
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Landscapes</span>
                    <span className="text-white font-medium">{districtSeason.keyLandscapes}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Bloom Zones</span>
                    <span className="text-white font-medium">{districtSeason.bloomZones}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Migration Windows</span>
                    <span className="text-white font-medium">{districtSeason.migrationWindows}</span>
                  </div>
                </div>
                {districtSeason.highlights.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-700/50">
                    <p className="text-xs text-emerald-400 line-clamp-2">
                      {districtSeason.highlights.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Related Dashboards Preview */}
      <div className="max-w-[97rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Related Dashboards
          </h2>
          <p className="text-slate-400">
            Connect seasonal ecology with broader environmental intelligence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/biodiversity">
            <Card className="glass-intense border-slate-700/50 hover:border-emerald-500/30 transition-all">
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30">
                    <Icons.PawPrint className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Biodiversity</h3>
                    <p className="text-sm text-slate-400">
                      Species distributions and conservation status
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/water-systems">
            <Card className="glass-intense border-slate-700/50 hover:border-blue-500/30 transition-all">
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <div className="p-3 rounded-xl bg-blue-500/20 border border-blue-500/30">
                    <Icons.Droplets className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Water Systems</h3>
                    <p className="text-sm text-slate-400">
                      Lakes, wetlands, and river ecology
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </Link>

          <Link href="/biodiversity/birding-hotspots">
            <Card className="glass-intense border-slate-700/50 hover:border-amber-500/30 transition-all">
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/30">
                    <Icons.Map className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">Birding & Observation Hotspots</h3>
                    <p className="text-sm text-slate-400">
                      Field observations and ecological access
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </div>

      {/* Reports & References */}
      <div className="max-w-[97rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Reports & References
            </h2>
            <p className="text-slate-400">
              Scientific evidence and documentation for Kashmir seasonal ecology
            </p>
          </div>
          <Link href="/seasonal-ecology/reports-references">
            <Button variant="outline" size="md">
              View All
              <Icons.ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {getSeasonalEcologyData.reports.all().slice(0, 3).map((report) => (
            <Link
              key={report.id}
              href={`/seasonal-ecology/reports-references/${report.slug}`}
              className="group"
            >
              <Card className="glass-intense border-slate-700/50 hover:border-slate-600 transition-all h-full">
                <div className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
                      <Icons.FileText className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                        {report.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {report.organization} • {report.publicationDate}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {report.description}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-[97rem] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Card className="glass-intense border-slate-700/50 bg-gradient-to-r from-emerald-950/50 to-teal-950/50">
          <div className="p-8 md:p-12 text-center">
            <Icons.Calendar className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Contribute to Seasonal Ecology Documentation
            </h2>
            <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
              Help us build comprehensive seasonal ecology records for Kashmir through citizen science 
              observations, phenology documentation, and ecological monitoring.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="primary" size="lg">
                <Icons.Upload className="w-5 h-5 mr-2" />
                Submit Observation
              </Button>
              <Button variant="outline" size="lg">
                <Icons.Download className="w-5 h-5 mr-2" />
                Download Data
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <AdvancedFooter />
    </main>
  );
}

function formatLabel(value: string) {
  return value.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}
