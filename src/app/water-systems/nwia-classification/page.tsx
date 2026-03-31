'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import {
  Book,
  MapPin,
  Droplet,
  Mountain,
  Waves,
  TrendingUp,
  Layers,
  Info,
  Search,
  Filter,
  Download,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  BarChart3,
  Globe,
  Thermometer,
  Fish,
  Eye,
  Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  NWIA_WETLAND_CLASSES,
  KASHMIR_DISTRICT_STATS,
  KASHMIR_VALLEY_TOTALS,
  NWIA_HIGH_ALTITUDE_LAKES_SUMMARY,
  NWIA_KASHMIR_LAKES,
  NWIA_KASHMIR_RIVERS,
  NWIA_HYDROLOGICAL_OBSERVATIONS,
  NWIA_SOURCE_METADATA
} from '@/data/nwia-references';
import { wetlandsData, lakesData, riversData } from '@/data/water-systems';

export default function NwiaClassificationExplorerPage() {
  const router = useRouter();
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'classification' | 'districts' | 'lakes' | 'rivers'>('overview');

  const handleExportData = (format: 'json' | 'csv') => {
    const data = {
      metadata: NWIA_SOURCE_METADATA,
      totals: KASHMIR_VALLEY_TOTALS,
      classification: NWIA_WETLAND_CLASSES,
      districts: KASHMIR_DISTRICT_STATS,
      highAltitudeLakes: NWIA_HIGH_ALTITUDE_LAKES_SUMMARY,
      majorLakes: NWIA_KASHMIR_LAKES,
      majorRivers: NWIA_KASHMIR_RIVERS,
      exportedAt: new Date().toISOString()
    };

    let blob: Blob;
    let filename: string;

    if (format === 'json') {
      blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      filename = 'nwia-kashmir-wetland-data.json';
    } else {
      // CSV export for districts
      const csvContent = [
        ['District', 'Total Wetland (ha)', 'Major Type', 'Major Type %', 'Lakes/Ponds (ha)', 'High Altitude (ha)'],
        ...KASHMIR_DISTRICT_STATS.map(d => [
          d.district,
          d.totalWetlandAreaHa.toString(),
          d.majorWetlandType,
          d.majorTypePercentage.toString(),
          d.lakesPondsAreaHa.toString(),
          d.highAltitudeWetlandsHa.toString()
        ])
      ].map(row => row.join(',')).join('\n');
      blob = new Blob([csvContent], { type: 'text/csv' });
      filename = 'nwia-kashmir-district-stats.csv';
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getClassIcon = (code: string) => {
    switch (code) {
      case '1101': return Droplet;
      case '1103': return Mountain;
      case '1104': return Waves;
      case '1106': return TrendingUp;
      case '1202': return Layers;
      default: return Info;
    }
  };

  const getClassColor = (code: string) => {
    switch (code) {
      case '1101': return 'from-blue-500 to-cyan-600';
      case '1103': return 'from-slate-400 to-slate-600';
      case '1104': return 'from-sky-500 to-blue-600';
      case '1106': return 'from-indigo-500 to-purple-600';
      case '1202': return 'from-amber-500 to-orange-600';
      default: return 'from-slate-500 to-slate-600';
    }
  };

  const getDistrictColor = (district: string) => {
    const colors: Record<string, string> = {
      'Baramulla': 'from-blue-500 to-cyan-600',
      'Srinagar': 'from-sky-500 to-blue-600',
      'Anantnag': 'from-emerald-500 to-green-600',
      'Ganderbal': 'from-violet-500 to-purple-600',
      'Budgam': 'from-amber-500 to-orange-600',
      'Kupwara': 'from-slate-400 to-slate-600',
      'Pulwama': 'from-pink-500 to-rose-600',
      'Bandipora': 'from-teal-500 to-cyan-600'
    };
    return colors[district] || 'from-slate-500 to-slate-600';
  };

  const filteredLakes = NWIA_KASHMIR_LAKES.filter(lake =>
    lake.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lake.district.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRivers = NWIA_KASHMIR_RIVERS.filter(river =>
    river.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    river.districts.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'classification', label: 'Classification', icon: Book },
    { id: 'districts', label: 'Districts', icon: MapPin },
    { id: 'lakes', label: 'Lakes', icon: Droplet },
    { id: 'rivers', label: 'Rivers', icon: Waves },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero */}
      <div className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-cyan-600/20 to-indigo-600/20 opacity-50" />
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-4">
              <button onClick={() => router.push('/water-systems')} className="hover:text-white transition-colors">
                Water Systems
              </button>
              <ChevronDown className="w-4 h-4" />
              <span className="text-white font-medium">NWIA Classification Explorer</span>
            </nav>

            <div className="flex items-start justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
                    <Book className="w-7 h-7 text-white" />
                  </div>
                  <Badge variant="info" size="lg">Kashmir Valley</Badge>
                </div>
                <h1 className="text-5xl font-black text-white mb-4">
                  NWIA Wetland Classification Explorer
                </h1>
                <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
                  Comprehensive wetland inventory and classification system for Kashmir Valley based on the National Wetland Inventory and Assessment (NWIA) Atlas by SAC/ISRO and University of Kashmir (2010).
                </p>
                <div className="flex flex-wrap gap-4 mt-6">
                  <div className="flex gap-2">
                    <Button
                      className="bg-gradient-to-r from-blue-500 to-cyan-600"
                      icon={<Download className="w-5 h-5" />}
                      onClick={() => handleExportData('json')}
                    >
                      Export JSON
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white/20 text-white"
                      icon={<Download className="w-5 h-5" />}
                      onClick={() => handleExportData('csv')}
                    >
                      Export CSV
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    className="border-white/20 text-white"
                    icon={<Globe className="w-5 h-5" />}
                    onClick={() => window.open('https://indianwetlands.in/uploads/NWIA_Jammu_and_Kashmir_Atlas.pdf', '_blank')}
                  >
                    View Original Atlas
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="container mx-auto px-6 mt-10 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="glass-intense border-white/10 p-6" padding="none">
            <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
              {[
                { label: 'Total Wetland', value: `${KASHMIR_VALLEY_TOTALS.totalWetlandAreaHa.toLocaleString()} ha`, icon: Layers },
                { label: 'Area (km²)', value: KASHMIR_VALLEY_TOTALS.totalWetlandAreaKm2.toFixed(2), icon: MapPin },
                { label: 'Lakes/Ponds', value: `${(KASHMIR_VALLEY_TOTALS.lakesPondsAreaHa / 1000).toFixed(1)}k ha`, icon: Droplet },
                { label: 'Rivers/Streams', value: `${(KASHMIR_VALLEY_TOTALS.riverStreamAreaHa / 1000).toFixed(1)}k ha`, icon: Waves },
                { label: 'High Alt. Lakes', value: KASHMIR_VALLEY_TOTALS.totalHighAltitudeLakes.toLocaleString(), icon: Mountain },
                { label: 'Districts', value: KASHMIR_DISTRICT_STATS.length, icon: MapPin },
                { label: 'Class Types', value: NWIA_WETLAND_CLASSES.length, icon: Book },
                { label: 'Major Lakes', value: NWIA_KASHMIR_LAKES.length, icon: Droplet },
                { label: 'Major Rivers', value: NWIA_KASHMIR_RIVERS.length, icon: TrendingUp },
                { label: 'Wetlands', value: wetlandsData.length, icon: Waves },
              ].map((metric, idx) => (
                <div key={idx} className="text-center p-3 border-r border-white/5 last:border-r-0">
                  <metric.icon className="w-5 h-5 text-slate-500 mx-auto mb-2" />
                  <div className="text-xl font-bold text-white tabular-nums">
                    {metric.value}
                  </div>
                  <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white'
                    : 'glass-light border border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <OverviewTab
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
              selectedDistrict={selectedDistrict}
              setSelectedDistrict={setSelectedDistrict}
              getClassIcon={getClassIcon}
              getClassColor={getClassColor}
              getDistrictColor={getDistrictColor}
            />
          )}

          {activeTab === 'classification' && (
            <ClassificationTab
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
              getClassIcon={getClassIcon}
              getClassColor={getClassColor}
            />
          )}

          {activeTab === 'districts' && (
            <DistrictsTab
              selectedDistrict={selectedDistrict}
              setSelectedDistrict={setSelectedDistrict}
              getDistrictColor={getDistrictColor}
            />
          )}

          {activeTab === 'lakes' && (
            <LakesTab
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filteredLakes={filteredLakes}
              getClassColor={getClassColor}
            />
          )}

          {activeTab === 'rivers' && (
            <RiversTab
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filteredRivers={filteredRivers}
              getClassColor={getClassColor}
            />
          )}
        </AnimatePresence>

        {/* Source Citation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <Card className="glass-light border-white/10 p-6">
            <div className="flex items-start gap-4">
              <Book className="w-6 h-6 text-slate-400 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">Data Source</h3>
                <p className="text-slate-400 text-sm mb-3">
                  {NWIA_SOURCE_METADATA.citation}
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                  <Badge variant="outline" size="sm" className="border-white/10 text-slate-400">
                    Publisher: {NWIA_SOURCE_METADATA.publisher}
                  </Badge>
                  <Badge variant="outline" size="sm" className="border-white/10 text-slate-400">
                    Date: {NWIA_SOURCE_METADATA.publicationDate}
                  </Badge>
                  <Badge variant="outline" size="sm" className="border-white/10 text-slate-400">
                    Scope: {NWIA_SOURCE_METADATA.scope}
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <AdvancedFooter />
    </main>
  );
}

// Overview Tab Component
function OverviewTab({
  selectedClass,
  setSelectedClass,
  selectedDistrict,
  setSelectedDistrict,
  getClassIcon,
  getClassColor,
  getDistrictColor
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Classification System Preview */}
      <Card className="glass-intense border-white/10 p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Book className="w-5 h-5 text-blue-400" />
          NWIA Classification System
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {NWIA_WETLAND_CLASSES.map((wetlandClass) => {
            const Icon = getClassIcon(wetlandClass.code);
            return (
              <Card
                key={wetlandClass.code}
                className={`glass-intense border-white/10 p-4 cursor-pointer transition-all hover:border-white/30 ${
                  selectedClass === wetlandClass.code ? 'border-white/30 bg-white/10' : ''
                }`}
                onClick={() => setSelectedClass(selectedClass === wetlandClass.code ? null : wetlandClass.code)}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getClassColor(wetlandClass.code)} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" size="sm" className="border-white/20 text-white text-xs">
                        {wetlandClass.code}
                      </Badge>
                      <h4 className="text-sm font-bold text-white">{wetlandClass.name}</h4>
                    </div>
                    <p className="text-xs text-slate-400">{wetlandClass.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>

      {/* District Highlights */}
      <Card className="glass-intense border-white/10 p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-emerald-400" />
          District Highlights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {KASHMIR_DISTRICT_STATS.slice(0, 4).map((district) => (
            <Card
              key={district.district}
              className={`glass-intense border-white/10 p-4 cursor-pointer transition-all hover:border-white/30 ${
                selectedDistrict === district.district ? 'border-white/30 bg-white/10' : ''
              }`}
              onClick={() => setSelectedDistrict(selectedDistrict === district.district ? null : district.district)}
            >
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${getDistrictColor(district.district)} flex items-center justify-center mb-3`}>
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{district.district}</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Area:</span>
                  <span className="text-white font-medium">{(district.totalWetlandAreaHa / 1000).toFixed(1)}k ha</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Major Type:</span>
                  <span className="text-white font-medium">{district.majorTypePercentage}%</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>

      {/* High Altitude Lakes Summary */}
      <Card className="bg-gradient-to-r from-slate-600/20 to-slate-500/20 border border-slate-500/30 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Mountain className="w-5 h-5 text-slate-400" />
            High Altitude Lakes of Kashmir
          </h3>
          <Badge variant="info" size="lg">{NWIA_HIGH_ALTITUDE_LAKES_SUMMARY.totalCount.toLocaleString()} lakes</Badge>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {Object.entries(NWIA_HIGH_ALTITUDE_LAKES_SUMMARY.districts).map(([district, data]: [string, any]) => (
            <div key={district} className="text-center p-3 rounded-lg bg-slate-800/50 border border-white/5">
              <div className="text-lg font-bold text-white">{data.count}</div>
              <div className="text-xs text-slate-400 capitalize">{district}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Hydrological Observations */}
      <Card className="glass-intense border-white/10 p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5 text-cyan-400" />
          Hydrological Characteristics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
            <div className="flex items-center gap-2 mb-3">
              <Droplet className="w-5 h-5 text-blue-400" />
              <h4 className="font-bold text-white">Water Spread</h4>
            </div>
            <p className="text-sm text-slate-400">{NWIA_HYDROLOGICAL_OBSERVATIONS.waterSpreadVariation.description}</p>
            <div className="mt-3 space-y-1 text-xs">
              <div className="text-slate-500">• Lakes: {NWIA_HYDROLOGICAL_OBSERVATIONS.waterSpreadVariation.lakes}</div>
              <div className="text-slate-500">• Rivers: {NWIA_HYDROLOGICAL_OBSERVATIONS.waterSpreadVariation.rivers}</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            <div className="flex items-center gap-2 mb-3">
              <Fish className="w-5 h-5 text-emerald-400" />
              <h4 className="font-bold text-white">Aquatic Vegetation</h4>
            </div>
            <p className="text-sm text-slate-400">{NWIA_HYDROLOGICAL_OBSERVATIONS.aquaticVegetation.description}</p>
            <div className="mt-3 space-y-1 text-xs">
              <div className="text-slate-500">• Baramulla: {NWIA_HYDROLOGICAL_OBSERVATIONS.aquaticVegetation.baramulla.postMonsoonHa} ha</div>
              <div className="text-slate-500">• Srinagar: {NWIA_HYDROLOGICAL_OBSERVATIONS.aquaticVegetation.srinagar.postMonsoonHa} ha</div>
              <div className="text-slate-500">• Budgam: {NWIA_HYDROLOGICAL_OBSERVATIONS.aquaticVegetation.budgam.postMonsoonHa} ha</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
            <div className="flex items-center gap-2 mb-3">
              <Thermometer className="w-5 h-5 text-amber-400" />
              <h4 className="font-bold text-white">Turbidity</h4>
            </div>
            <p className="text-sm text-slate-400">{NWIA_HYDROLOGICAL_OBSERVATIONS.turbidity.general}</p>
            <div className="mt-3 space-y-1 text-xs text-slate-500">
              {NWIA_HYDROLOGICAL_OBSERVATIONS.turbidity.exceptions.map((exc, idx) => (
                <div key={idx}>• {exc}</div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

// Classification Tab Component
function ClassificationTab({ selectedClass, setSelectedClass, getClassIcon, getClassColor }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {NWIA_WETLAND_CLASSES.map((wetlandClass) => {
        const Icon = getClassIcon(wetlandClass.code);
        const isExpanded = selectedClass === wetlandClass.code;

        return (
          <Card
            key={wetlandClass.code}
            className={`glass-intense border-white/10 p-6 cursor-pointer transition-all hover:border-white/30 ${
              isExpanded ? 'border-white/30 bg-white/10' : ''
            }`}
            onClick={() => setSelectedClass(isExpanded ? null : wetlandClass.code)}
          >
            <div className="flex items-start gap-4">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${getClassColor(wetlandClass.code)} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" size="lg" className="border-white/30 text-white">
                      {wetlandClass.code}
                    </Badge>
                    <h3 className="text-xl font-bold text-white">{wetlandClass.name}</h3>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <p className="text-slate-400 mb-4">{wetlandClass.description}</p>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4"
                    >
                      <div className="pt-4 border-t border-white/10">
                        <h4 className="text-sm font-bold text-white mb-3">Kashmir Examples</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {wetlandClass.kashmirExamples.map((example, idx) => (
                            <div key={idx} className="p-3 rounded-lg bg-slate-800/50 border border-white/5 flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getClassColor(wetlandClass.code)}`} />
                              <span className="text-sm text-white">{example}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10">
                        <h4 className="text-sm font-bold text-white mb-3">Characteristics</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                            <div className="text-xs text-blue-300">
                              <strong>Ecological Role:</strong> Supports diverse aquatic biodiversity, provides habitat for migratory waterfowl, regulates local hydrology
                            </div>
                          </div>
                          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                            <div className="text-xs text-emerald-300">
                              <strong>Conservation Status:</strong> Varies by site - includes Ramsar sites, conservation reserves, and community-managed wetlands
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </Card>
        );
      })}
    </motion.div>
  );
}

// Districts Tab Component
function DistrictsTab({ selectedDistrict, setSelectedDistrict, getDistrictColor }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {KASHMIR_DISTRICT_STATS.map((district) => {
          const isExpanded = selectedDistrict === district.district;

          return (
            <Card
              key={district.district}
              className={`glass-intense border-white/10 p-6 cursor-pointer transition-all hover:border-white/30 ${
                isExpanded ? 'border-white/30 bg-white/10' : ''
              }`}
              onClick={() => setSelectedDistrict(isExpanded ? null : district.district)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getDistrictColor(district.district)} flex items-center justify-center shadow-lg`}>
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{district.district}</h3>
                    <Badge variant="info" size="sm">{district.majorTypePercentage}% {district.majorWetlandType}</Badge>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="p-3 rounded-lg bg-slate-800/50 text-center">
                  <div className="text-lg font-bold text-white">{(district.totalWetlandAreaHa / 1000).toFixed(1)}k</div>
                  <div className="text-xs text-slate-400">Total (ha)</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/50 text-center">
                  <div className="text-lg font-bold text-white">{(district.lakesPondsAreaHa / 1000).toFixed(1)}k</div>
                  <div className="text-xs text-slate-400">Lakes (ha)</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/50 text-center">
                  <div className="text-lg font-bold text-white">{(district.highAltitudeWetlandsHa / 1000).toFixed(1)}k</div>
                  <div className="text-xs text-slate-400">High Alt. (ha)</div>
                </div>
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pt-4 border-t border-white/10"
                  >
                    <h4 className="text-sm font-bold text-white mb-3">Key Wetlands</h4>
                    <div className="flex flex-wrap gap-2">
                      {district.keyWetlands.map((wetland, idx) => (
                        <Badge key={idx} variant="outline" size="sm" className="border-white/20 text-white">
                          {wetland}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30">
                      <div className="text-sm text-blue-100">
                        <strong>Dominant Type:</strong> {district.majorWetlandType} covers {(district.majorTypeAreaHa / 1000).toFixed(1)}k hectares ({district.majorTypePercentage}% of district wetland area)
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          );
        })}
      </div>
    </motion.div>
  );
}

// Lakes Tab Component
function LakesTab({ searchTerm, setSearchTerm, filteredLakes, getClassColor }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Search */}
      <Card className="glass-intense border-white/10 p-4">
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search lakes by name or district..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500"
          />
          <Badge variant="info" size="sm">{filteredLakes.length} lakes</Badge>
        </div>
      </Card>

      {/* Lakes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredLakes.map((lake: any) => (
          <Card key={lake.name} className="glass-intense border-white/10 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getClassColor(lake.nwiaCode)} flex items-center justify-center shadow-lg`}>
                <Droplet className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-white">{lake.name}</h3>
                  <Badge variant="outline" size="sm" className="border-white/20 text-white text-xs">
                    {lake.nwiaCode}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <MapPin className="w-4 h-4" />
                  <span>{lake.district}</span>
                </div>
              </div>
            </div>

            {lake.area && (
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-lg bg-slate-800/50">
                  <div className="text-xs text-slate-500">Area</div>
                  <div className="text-lg font-bold text-white">{lake.area.toLocaleString()} ha</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-800/50">
                  <div className="text-xs text-slate-500">Elevation</div>
                  <div className="text-lg font-bold text-white">{lake.elevationM}m</div>
                </div>
              </div>
            )}

            <div className="mb-4">
              <h4 className="text-sm font-bold text-white mb-2">Characteristics</h4>
              <ul className="space-y-1">
                {lake.characteristics.slice(0, 3).map((char: string, idx: number) => (
                  <li key={idx} className="text-sm text-slate-400 flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                    {char}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <div className="text-xs text-blue-100">
                <strong>Significance:</strong> {lake.hydrologicalSignificance}
              </div>
            </div>

            {lake.threats && lake.threats.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4 text-amber-400" />
                  Threats
                </h4>
                <div className="flex flex-wrap gap-1">
                  {lake.threats.map((threat: string, idx: number) => (
                    <Badge key={idx} variant="outline" size="sm" className="border-amber-500/30 text-amber-400 text-xs">
                      {threat}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </motion.div>
  );
}

// Rivers Tab Component
function RiversTab({ searchTerm, setSearchTerm, filteredRivers, getClassColor }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Search */}
      <Card className="glass-intense border-white/10 p-4">
        <div className="flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search rivers by name or district..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-500"
          />
          <Badge variant="info" size="sm">{filteredRivers.length} rivers</Badge>
        </div>
      </Card>

      {/* Rivers Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredRivers.map((river: any) => (
          <Card key={river.name} className="glass-intense border-white/10 p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getClassColor(river.nwiaCode)} flex items-center justify-center shadow-lg`}>
                <Waves className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold text-white">{river.name}</h3>
                  <Badge variant="outline" size="sm" className="border-white/20 text-white text-xs">
                    {river.nwiaCode}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-400 flex-wrap">
                  <MapPin className="w-4 h-4" />
                  <span>{river.districts.join(', ')}</span>
                </div>
              </div>
            </div>

            {river.lengthKm && (
              <div className="mb-4 p-3 rounded-lg bg-slate-800/50">
                <div className="text-xs text-slate-500">Length in Kashmir Valley</div>
                <div className="text-2xl font-bold text-white">{river.lengthKm} km</div>
              </div>
            )}

            <div className="mb-4">
              <h4 className="text-sm font-bold text-white mb-2">Characteristics</h4>
              <ul className="space-y-1">
                {river.characteristics.map((char: string, idx: number) => (
                  <li key={idx} className="text-sm text-slate-400 flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 flex-shrink-0" />
                    {char}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/30 mb-4">
              <div className="text-xs text-indigo-100">
                <strong>Significance:</strong> {river.hydrologicalSignificance}
              </div>
            </div>

            {river.tributaries && river.tributaries.length > 0 && (
              <div>
                <h4 className="text-sm font-bold text-white mb-2">Major Tributaries</h4>
                <div className="flex flex-wrap gap-2">
                  {river.tributaries.map((tributary: string, idx: number) => (
                    <Badge key={idx} variant="outline" size="sm" className="border-white/20 text-white text-xs">
                      {tributary}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </motion.div>
  );
}
