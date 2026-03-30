'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Thermometer, ArrowRight, Map, TrendingUp, Activity, Cloud,
  Droplets, Snowflake, Calendar, Layers
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const climateSignals = [
  { signal: 'Rising Average Temperatures', trend: 'Increasing', impact: 'High', description: '0.8°C rise over past 30 years' },
  { signal: 'Glacier Retreat', trend: 'Accelerating', impact: 'Critical', description: 'Kolahoi glacier receding 15m/year' },
  { signal: 'Snowline Shift', trend: 'Upward', impact: 'High', description: 'Snowline rising 50m per decade' },
  { signal: 'Spring Discharge Changes', trend: 'Variable', impact: 'Moderate', description: 'Altered timing and volume' },
  { signal: 'Wetland Shrinkage', trend: 'Continuing', impact: 'High', description: '15% loss in past 20 years' },
  { signal: 'Altered Migration Timing', trend: 'Shifting', impact: 'Moderate', description: 'Bird arrival patterns changing' },
  { signal: 'Phenology Shifts', trend: 'Advancing', impact: 'Moderate', description: 'Flowering and leaf-out earlier' },
  { signal: 'Seasonal Instability', trend: 'Increasing', impact: 'High', description: 'Unpredictable weather patterns' },
];

const temperatureData = [
  { period: '1990-2000', avgTemp: '13.2°C', anomaly: '-0.3°C', extremeEvents: 12 },
  { period: '2000-2010', avgTemp: '13.6°C', anomaly: '+0.1°C', extremeEvents: 18 },
  { period: '2010-2020', avgTemp: '14.0°C', anomaly: '+0.5°C', extremeEvents: 27 },
  { period: '2020-2025', avgTemp: '14.3°C', anomaly: '+0.8°C', extremeEvents: 34 },
];

const seasonalChanges = [
  { season: 'Winter', change: 'Shorter & Warmer', impact: 'Reduced snowfall, less water storage', severity: 'High' },
  { season: 'Spring', change: 'Earlier Onset', impact: 'Phenology mismatch, agriculture stress', severity: 'Moderate' },
  { season: 'Summer', change: 'Longer & Hotter', impact: 'Heat stress, increased evaporation', severity: 'High' },
  { season: 'Autumn', change: 'Extended', impact: 'Delayed dormancy, ecosystem stress', severity: 'Moderate' },
];

const impactAreas = [
  { area: 'Glaciers & Cryosphere', status: 'Critical', description: 'Accelerated retreat, GLOF risk increase' },
  { area: 'Water Security', status: 'High Risk', description: 'Reduced dry season flows, spring variability' },
  { area: 'Agriculture', status: 'High Risk', description: 'Crop timing mismatch, heat stress on crops' },
  { area: 'Biodiversity', status: 'High Risk', description: 'Habitat shift, species stress, migration changes' },
  { area: 'Wetlands', status: 'Critical', description: 'Shrinkage, eutrophication acceleration' },
  { area: 'Human Health', status: 'Moderate-High', description: 'Heat stress, disease vector expansion' },
];

export default function ClimateChangePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/50 via-orange-950/30 to-slate-950" />
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-2xl">
                <Thermometer className="w-8 h-8 text-white" />
              </div>
              <Badge variant="danger" size="lg">Climate Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Climate Change <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">Signals</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Glacier retreat, snowline shifts, spring discharge changes, wetland shrinkage,
              altered migration timing, phenology shifts, and seasonal instability across Kashmir
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white shadow-xl"
                onClick={() => router.push('/risk-monitoring/dashboards')}
              >
                <Activity className="w-5 h-5 mr-2" />
                View Climate Dashboard
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
              <div className="text-4xl font-bold text-red-400 mb-2">+0.8°C</div>
              <div className="text-sm text-slate-400 mb-1">Temp Rise (30 yrs)</div>
              <div className="text-xs text-red-400">Above Baseline</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-amber-400 mb-2">15m/yr</div>
              <div className="text-sm text-slate-400 mb-1">Glacier Retreat</div>
              <div className="text-xs text-red-400">Kolahoi Rate</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-orange-400 mb-2">50m</div>
              <div className="text-sm text-slate-400 mb-1">Snowline Rise</div>
              <div className="text-xs text-amber-400">Per Decade</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-red-400 mb-2">15%</div>
              <div className="text-sm text-slate-400 mb-1">Wetland Loss</div>
              <div className="text-xs text-red-400">Past 20 Years</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">34</div>
              <div className="text-sm text-slate-400 mb-1">Extreme Events</div>
              <div className="text-xs text-red-400">2020-2025</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Climate Signals Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Climate Change Signals</h2>
            <p className="text-slate-400">Observed and monitored climate change indicators across Kashmir</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {climateSignals.map((signal, index) => (
              <motion.div
                key={signal.signal}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-light border-white/10 p-5">
                  <h3 className="text-sm font-bold text-white mb-2">{signal.signal}</h3>
                  <p className="text-xs text-slate-400 mb-3">{signal.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={signal.impact === 'Critical' ? 'danger' : 
                               signal.impact === 'High' ? 'warning' : 'info'}
                      size="sm"
                    >
                      {signal.impact}
                    </Badge>
                    <span className={`text-xs flex items-center gap-1 ${
                      signal.trend === 'Increasing' || signal.trend === 'Accelerating' ? 'text-red-400' : 'text-amber-400'
                    }`}>
                      <TrendingUp className="w-3 h-3" />
                      {signal.trend}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Temperature Trend Analysis */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Temperature Trend Analysis</h2>
            <p className="text-slate-400">Decadal temperature changes and extreme event frequency</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {temperatureData.map((item, index) => (
              <motion.div
                key={item.period}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5">
                  <h3 className="text-sm font-bold text-white mb-3">{item.period}</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Avg Temp</span>
                      <span className="text-white font-medium">{item.avgTemp}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Anomaly</span>
                      <span className={item.anomaly.startsWith('+') ? 'text-red-400' : 'text-blue-400'}>
                        {item.anomaly}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Extreme Events</span>
                      <span className="text-red-400 font-medium">{item.extremeEvents}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Seasonal Changes */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Seasonal Changes</h2>
            <p className="text-slate-400">Climate change impacts on Kashmir's seasonal patterns</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasonalChanges.map((item, index) => (
              <motion.div
                key={item.season}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-light border-white/10 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="w-5 h-5 text-blue-400" />
                    <h3 className="text-sm font-bold text-white">{item.season}</h3>
                  </div>
                  <div className="text-sm text-amber-400 mb-2">{item.change}</div>
                  <p className="text-xs text-slate-400 mb-3">{item.impact}</p>
                  <Badge
                    variant={item.severity === 'High' ? 'warning' : 'info'}
                    size="sm"
                  >
                    {item.severity} Severity
                  </Badge>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Climate Impact Areas</h2>
            <p className="text-slate-400">Systems and sectors most vulnerable to climate change in Kashmir</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {impactAreas.map((area, index) => (
              <motion.div
                key={area.area}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-sm font-bold text-white">{area.area}</h3>
                    <Badge
                      variant={area.status === 'Critical' ? 'danger' : 
                               area.status === 'High Risk' ? 'warning' : 'info'}
                      size="sm"
                    >
                      {area.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400">{area.description}</p>
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
                <Map className="w-6 h-6 text-red-400" />
                <div>
                  <h2 className="text-xl font-bold text-white">Climate Impact Map Preview</h2>
                  <p className="text-sm text-slate-400">Temperature anomalies, glacier retreat, and vulnerability layers</p>
                </div>
              </div>
              <div className="relative h-80 bg-gradient-to-br from-red-900/50 to-orange-900/30 rounded-xl flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <Layers className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <p className="text-slate-400 mb-4">Interactive climate vulnerability map with district-level data</p>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-red-500 to-orange-600"
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
            <p className="text-slate-400">Cross-linked climate and environmental monitoring</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              className="glass-light border-white/10 hover:border-cyan-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/global-warming-impacts')}
            >
              <Thermometer className="w-8 h-8 text-cyan-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                Global Warming Impacts
              </h3>
              <p className="text-xs text-slate-400">
                Warming-linked biodiversity and ecosystem stress
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-blue-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/glacier-cryosphere-risks')}
            >
              <Snowflake className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Glacier & Cryosphere
              </h3>
              <p className="text-xs text-slate-400">
                Glacier retreat and GLOF risk monitoring
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-emerald-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/biodiversity-risk-intelligence')}
            >
              <Activity className="w-8 h-8 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                Biodiversity Risk
              </h3>
              <p className="text-xs text-slate-400">
                Climate-linked species vulnerability
              </p>
            </Card>
            <Card
              className="glass-light border-white/10 hover:border-blue-500/30 transition-all p-5 cursor-pointer group"
              onClick={() => router.push('/risk-monitoring/hydrological-risks')}
            >
              <Droplets className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                Hydrological Risks
              </h3>
              <p className="text-xs text-slate-400">
                Water security and flow anomalies
              </p>
            </Card>
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
