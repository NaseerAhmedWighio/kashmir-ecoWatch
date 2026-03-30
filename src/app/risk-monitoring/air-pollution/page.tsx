'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Wind, ArrowRight, Map, AlertTriangle, Activity, Thermometer,
  TrendingUp, Filter, Layers, Droplets
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const airQualityData = [
  { id: 'aq-1', location: 'Srinagar City', district: 'Srinagar', aqi: 178, status: 'unhealthy' as const, pm25: 92, pm10: 145, primaryPollutant: 'PM2.5' },
  { id: 'aq-2', location: 'Lal Chowk', district: 'Srinagar', aqi: 195, status: 'unhealthy' as const, pm25: 105, pm10: 168, primaryPollutant: 'PM2.5' },
  { id: 'aq-3', location: 'Residency Road', district: 'Srinagar', aqi: 162, status: 'unhealthy' as const, pm25: 78, pm10: 132, primaryPollutant: 'PM10' },
  { id: 'aq-4', location: 'Anantnag Town', district: 'Anantnag', aqi: 134, status: 'unhealthy-for-sensitive' as const, pm25: 58, pm10: 98, primaryPollutant: 'PM2.5' },
  { id: 'aq-5', location: 'Baramulla Market', district: 'Baramulla', aqi: 121, status: 'unhealthy-for-sensitive' as const, pm25: 48, pm10: 87, primaryPollutant: 'PM10' },
  { id: 'aq-6', location: 'Kupwara Valley', district: 'Kupwara', aqi: 98, status: 'moderate' as const, pm25: 35, pm10: 62, primaryPollutant: 'PM10' },
];

const seasonalPatterns = [
  { season: 'Winter (Nov-Feb)', pattern: 'Temperature inversion traps smoke and particulates', severity: 'critical' as const },
  { season: 'Spring (Mar-May)', pattern: 'Moderate AQI with dust and pollen', severity: 'moderate' as const },
  { season: 'Summer (Jun-Aug)', pattern: 'Best air quality, valley ventilation', severity: 'good' as const },
  { season: 'Autumn (Sep-Oct)', pattern: 'Agricultural burning increases particulates', severity: 'moderate' as const },
];

const pollutionSources = [
  { source: 'Transport Corridors', contribution: '35%', description: 'NH-44, NH-1, and valley roads' },
  { source: 'Residential Heating', contribution: '28%', description: 'Wood and coal burning in winter' },
  { source: 'Agricultural Burning', contribution: '18%', description: 'Post-harvest stubble burning' },
  { source: 'Commercial Activity', contribution: '12%', description: 'Markets and small industries' },
  { source: 'Natural Dust', contribution: '7%', description: 'Dry valley floors and construction' },
];

const districtSummary = [
  { district: 'Srinagar', avgAQI: 168, trend: 'worsening' as const, hotspots: 12 },
  { district: 'Anantnag', avgAQI: 142, trend: 'stable' as const, hotspots: 7 },
  { district: 'Baramulla', avgAQI: 128, trend: 'stable' as const, hotspots: 5 },
  { district: 'Kupwara', avgAQI: 95, trend: 'improving' as const, hotspots: 3 },
  { district: 'Pulwama', avgAQI: 138, trend: 'worsening' as const, hotspots: 6 },
  { district: 'Budgam', avgAQI: 145, trend: 'stable' as const, hotspots: 8 },
];

export default function AirPollutionPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-gray-900/50 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-500 to-slate-600 flex items-center justify-center shadow-2xl">
                <Wind className="w-8 h-8 text-white" />
              </div>
              <Badge variant="warning" size="lg">Air Quality Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Air Pollution <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-slate-400">Risk & Monitoring</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              District-wise AQI intelligence, seasonal inversion patterns, transport corridor pollution,
              and public health overlap monitoring across Kashmir valley
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white shadow-xl"
                onClick={() => router.push('/risk-monitoring/dashboards')}
              >
                <Activity className="w-5 h-5 mr-2" />
                View AQI Dashboard
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/5"
                onClick={() => router.push('/risk-monitoring')}
              >
                <ArrowRight className="w-5 h-5 mr-2" />
                Back to Risk Monitoring
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Ribbon */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-red-400 mb-2">178</div>
              <div className="text-sm text-slate-400 mb-1">Peak AQI (Srinagar)</div>
              <div className="text-xs text-red-400 flex items-center justify-center gap-1">
                <TrendingUp className="w-3 h-3" />
                +12% this week
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-amber-400 mb-2">41</div>
              <div className="text-sm text-slate-400 mb-1">Avg AQI (Valley)</div>
              <div className="text-xs text-slate-500">Moderate</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">6</div>
              <div className="text-sm text-slate-400 mb-1">Districts Monitored</div>
              <div className="text-xs text-emerald-400">All Active</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-orange-400 mb-2">41</div>
              <div className="text-sm text-slate-400 mb-1">Pollution Hotspots</div>
              <div className="text-xs text-red-400">12 Critical</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-sm text-slate-400 mb-1">Monitoring Status</div>
              <div className="text-xs text-emerald-400">Real-time</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter Row */}
      <section className="py-8 border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              <Filter className="w-3 h-3 mr-2" />
              All Districts
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Srinagar
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Anantnag
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Baramulla
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Kupwara
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Pulwama
            </Badge>
            <Badge variant="outline" className="border-white/20 cursor-pointer hover:bg-white/5">
              Budgam
            </Badge>
          </div>
        </div>
      </section>

      {/* District AQI Summary */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">District AQI Summary</h2>
            <p className="text-slate-400">Real-time air quality index across Kashmir districts</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {districtSummary.map((item, index) => (
              <motion.div
                key={item.district}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{item.district}</h3>
                      <div className="text-xs text-slate-500">{item.hotspots} hotspots</div>
                    </div>
                    <Badge
                      variant={item.avgAQI > 150 ? 'danger' : item.avgAQI > 100 ? 'warning' : 'success'}
                      size="sm"
                    >
                      AQI {item.avgAQI}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className={`w-4 h-4 ${
                      item.trend === 'worsening' ? 'text-red-400' :
                      item.trend === 'improving' ? 'text-emerald-400' : 'text-slate-400'
                    }`} />
                    <span className={`text-sm ${
                      item.trend === 'worsening' ? 'text-red-400' :
                      item.trend === 'improving' ? 'text-emerald-400' : 'text-slate-400'
                    }`}>
                      {item.trend === 'worsening' ? 'Worsening' :
                       item.trend === 'improving' ? 'Improving' : 'Stable'}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Air Quality Records */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Recent Air Quality Records</h2>
            <p className="text-slate-400">Latest monitoring station readings across Kashmir</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {airQualityData.map((record, index) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{record.location}</h3>
                      <div className="text-xs text-slate-500">{record.district}</div>
                    </div>
                    <Badge
                      variant={
                        record.status === 'unhealthy' ? 'danger' :
                        record.status === 'unhealthy-for-sensitive' ? 'warning' : 'success'
                      }
                      size="sm"
                    >
                      AQI {record.aqi}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">PM2.5</span>
                      <span className="text-white font-medium">{record.pm25} μg/m³</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">PM10</span>
                      <span className="text-white font-medium">{record.pm10} μg/m³</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Primary Pollutant</span>
                      <span className="text-white font-medium">{record.primaryPollutant}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Patterns */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Seasonal Air Quality Patterns</h2>
            <p className="text-slate-400">Winter inversion, summer ventilation, and seasonal pollution dynamics</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasonalPatterns.map((pattern, index) => (
              <motion.div
                key={pattern.season}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-light border-white/10 p-5">
                  <h3 className="text-sm font-bold text-white mb-2">{pattern.season}</h3>
                  <p className="text-xs text-slate-400 mb-3">{pattern.pattern}</p>
                  <Badge
                    variant={
                      pattern.severity === 'critical' ? 'danger' :
                      pattern.severity === 'moderate' ? 'warning' : 'success'
                    }
                    size="sm"
                  >
                    {pattern.severity}
                  </Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pollution Sources */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Pollution Sources</h2>
            <p className="text-slate-400">Major contributors to air pollution in Kashmir valley</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {pollutionSources.map((source, index) => (
              <motion.div
                key={source.source}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5 text-center">
                  <div className="text-3xl font-bold text-amber-400 mb-2">{source.contribution}</div>
                  <h3 className="text-sm font-bold text-white mb-2">{source.source}</h3>
                  <p className="text-xs text-slate-400">{source.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Preview Panel */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 overflow-hidden">
            <div className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Map className="w-6 h-6 text-blue-400" />
                <div>
                  <h2 className="text-xl font-bold text-white">Air Quality Map Preview</h2>
                  <p className="text-sm text-slate-400">District-wise AQI visualization and hotspot layers</p>
                </div>
              </div>
              <div className="relative h-80 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <Layers className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 mb-4">Interactive AQI map with district boundaries and monitoring stations</p>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-cyan-600"
                    onClick={() => router.push('/risk-monitoring/dashboards')}
                  >
                    <Map className="w-5 h-5 mr-2" />
                    Open Full Map
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Related Intelligence */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Related Intelligence</h2>
            <p className="text-slate-400">Cross-linked environmental and health monitoring</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              className="glass-light border-white/10 hover:border-emerald-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/water-pollution')}
            >
              <Droplets className="w-8 h-8 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                Water Pollution
              </h3>
              <p className="text-xs text-slate-400">
                Lake and river contamination monitoring
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-amber-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/noise-pollution')}
            >
              <Activity className="w-8 h-8 text-amber-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                Noise Pollution
              </h3>
              <p className="text-xs text-slate-400">
                Urban and tourism corridor noise levels
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-red-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/climate-change')}
            >
              <Thermometer className="w-8 h-8 text-red-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                Climate Change
              </h3>
              <p className="text-xs text-slate-400">
                Seasonal instability and warming signals
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-blue-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/dashboards')}
            >
              <Activity className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Risk Dashboards
              </h3>
              <p className="text-xs text-slate-400">
                Comprehensive environmental dashboards
              </p>
            </Card>
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
