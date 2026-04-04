'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Wind, Map, BarChart3, ChevronRight, AlertTriangle,
  FileText, ArrowRight, Activity, Clock,
  MapPin, ExternalLink, Flame, Car, Factory as FactoryIcon, Cloud,
  TrendingUp, Thermometer
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const pollutantCards = [
  {
    pollutant: 'PM2.5',
    value: '87 µg/m³',
    status: 'Unhealthy',
    variant: 'danger' as const,
    icon: Cloud,
    desc: 'Exceeds WHO guideline (15 µg/m³) by 5.8x — Srinagar urban zone',
  },
  {
    pollutant: 'PM10',
    value: '142 µg/m³',
    status: 'Moderate',
    variant: 'warning' as const,
    icon: Wind,
    desc: 'Above 50 µg/m³ threshold — construction dust, road emissions',
  },
  {
    pollutant: 'NO₂',
    value: '52 ppb',
    status: 'Moderate',
    variant: 'warning' as const,
    icon: Car,
    desc: 'Traffic-related emissions — Lal Chowk corridor peak hours',
  },
  {
    pollutant: 'SO₂',
    value: '18 ppb',
    status: 'Good',
    variant: 'success' as const,
    icon: FactoryIcon,
    desc: 'Within acceptable range — industrial source monitoring active',
  },
  {
    pollutant: 'O₃ (Ozone)',
    value: '64 ppb',
    status: 'Moderate',
    variant: 'warning' as const,
    icon: Thermometer,
    desc: 'Ground-level ozone — afternoon peak in valley floor',
  },
  {
    pollutant: 'CO',
    value: '1.2 mg/m³',
    status: 'Good',
    variant: 'success' as const,
    icon: Flame,
    desc: 'Within 4 mg/m³ WHO guideline — combustion monitoring',
  },
];

const districtAirQualityData = [
  { district: 'Srinagar', aqi: 187, aqiCategory: 'Unhealthy', aqiVariant: 'danger' as const, pm25: '87 µg/m³', trend: 'worsening' as const, dominantPollutant: 'PM2.5' },
  { district: 'Anantnag', aqi: 142, aqiCategory: 'Unhealthy for Sensitive', aqiVariant: 'warning' as const, pm25: '62 µg/m³', trend: 'stable' as const, dominantPollutant: 'PM2.5' },
  { district: 'Baramulla', aqi: 98, aqiCategory: 'Moderate', aqiVariant: 'warning' as const, pm25: '41 µg/m³', trend: 'improving' as const, dominantPollutant: 'PM10' },
  { district: 'Pulwama', aqi: 156, aqiCategory: 'Unhealthy', aqiVariant: 'danger' as const, pm25: '71 µg/m³', trend: 'worsening' as const, dominantPollutant: 'PM2.5' },
  { district: 'Budgam', aqi: 118, aqiCategory: 'Unhealthy for Sensitive', aqiVariant: 'warning' as const, pm25: '52 µg/m³', trend: 'stable' as const, dominantPollutant: 'PM2.5' },
  { district: 'Ganderbal', aqi: 76, aqiCategory: 'Moderate', aqiVariant: 'success' as const, pm25: '31 µg/m³', trend: 'improving' as const, dominantPollutant: 'PM10' },
  { district: 'Kupwara', aqi: 64, aqiCategory: 'Moderate', aqiVariant: 'success' as const, pm25: '26 µg/m³', trend: 'stable' as const, dominantPollutant: 'PM10' },
  { district: 'Shopian', aqi: 71, aqiCategory: 'Moderate', aqiVariant: 'success' as const, pm25: '29 µg/m³', trend: 'stable' as const, dominantPollutant: 'PM10' },
];

const pollutionSourceAdvisories = [
  {
    title: 'Winter Heating Emissions Spike — Srinagar',
    source: 'Residential Heating',
    status: 'Active',
    desc: 'Increased PM2.5 and CO from wood/coal burning in residential zones. 42% rise in emissions compared to summer baseline. Clean heating alternatives recommended.',
    issued: '1 day ago',
    icon: Flame,
  },
  {
    title: 'Traffic Corridor NO₂ Exceedance',
    source: 'Vehicular Emissions',
    status: 'Monitoring',
    desc: 'Lal Chowk and adjacent corridors showing NO₂ peaks above 60 ppb during rush hours. Traffic management and EV adoption acceleration recommended.',
    issued: '3 days ago',
    icon: Car,
  },
  {
    title: 'Construction Dust — Urban Development Zones',
    source: 'Construction Activity',
    status: 'Advisory',
    desc: 'Multiple infrastructure projects generating PM10 exceedances. Dust suppression measures and water sprinkling protocols required at 14 active sites.',
    issued: '5 days ago',
    icon: FactoryIcon,
  },
  {
    title: 'Crop Residue Burning — Rural Belts',
    source: 'Agricultural Burning',
    status: 'Active',
    desc: 'Satellite-detected fire points in Pulwama and Budgam agricultural zones. Open burning ban enforcement and farmer awareness campaigns recommended.',
    issued: '2 days ago',
    icon: Flame,
  },
];

const recentIncidents = [
  { type: 'PM2.5 Exceedance', location: 'Rajbagh, Srinagar — 142 µg/m³', severity: 'Critical', time: '2h ago', verified: true },
  { type: 'AQI Alert — Unhealthy', location: 'Pulwama town — AQI 168', severity: 'High', time: '4h ago', verified: true },
  { type: 'Open Burning Detected', location: 'Tral agricultural zone', severity: 'High', time: '6h ago', verified: false },
  { type: 'NO₂ Peak', location: 'Lal Chowk traffic junction, Srinagar', severity: 'Moderate', time: '8h ago', verified: true },
  { type: 'Construction Dust Complaint', location: 'Nowgam roadwork site', severity: 'Moderate', time: '1 day ago', verified: true },
];

export default function AirPollutionPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">{/* Hero */}
      <section className="relative pt-48 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800/40 via-gray-900/30 to-slate-950" />
        <div className="absolute inset-0 bg-grid opacity-10" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <button onClick={() => router.push('/')} className="hover:text-white transition-colors">Home</button>
              <ChevronRight className="w-4 h-4" />
              <button onClick={() => router.push('/environmental-monitoring')} className="hover:text-white transition-colors">Environmental Monitoring</button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">Air Pollution</span>
            </nav>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-500 to-gray-600 flex items-center justify-center shadow-2xl">
                <Wind className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Air Quality Intelligence</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Air <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-gray-400">Pollution</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Real-time air quality monitoring, pollutant tracking, emission source identification,
              and health advisories across Kashmir&apos;s urban and rural monitoring stations
            </p>
          </motion.div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-12 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[
              { label: 'Active Stations', value: '12', sub: 'Valley-wide', color: 'text-slate-400' },
              { label: 'Avg AQI (Kashmir)', value: '114', sub: 'Unhealthy for Sensitive', color: 'text-amber-400' },
              { label: 'PM2.5 Hotspots', value: '7', sub: 'Above WHO guideline', color: 'text-red-400' },
              { label: 'Active Advisories', value: '4', sub: 'Source-linked', color: 'text-orange-400' },
              { label: 'Trend (7-day)', value: '↗', sub: 'Worsening', color: 'text-red-400' },
            ].map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }} className="text-center">
                <div className={`text-3xl md:text-4xl font-bold ${m.color} mb-1`}>{m.value}</div>
                <div className="text-sm text-slate-400">{m.label}</div>
                <div className="text-xs text-slate-500">{m.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Preview */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 overflow-hidden">
            <div className="p-6 flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Map className="w-5 h-5 text-slate-400" />
                <h3 className="text-lg font-bold text-white">District Air Quality Map</h3>
              </div>
              <Button size="sm" variant="outline" className="border-white/20 text-white" onClick={() => router.push('/environmental-monitoring/dashboards')}>
                <BarChart3 className="w-4 h-4 mr-2" />
                Open Dashboard
              </Button>
            </div>
            <div className="h-80 bg-gradient-to-br from-slate-800/20 to-gray-900/10 flex items-center justify-center border-t border-white/5">
              <div className="text-center">
                <Map className="w-14 h-14 text-slate-700 mx-auto mb-3" />
                <p className="text-slate-400 text-sm mb-1">Interactive air quality monitoring map with station-level AQI data</p>
                <p className="text-slate-500 text-xs">PM2.5 • PM10 • NO₂ • SO₂ • O₃ • CO monitoring stations</p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Pollutant Cards */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <Activity className="w-6 h-6 text-slate-400" />
              Key Pollutant Indicators
            </h2>
            <p className="text-slate-400">Current concentrations and health status for monitored pollutants</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pollutantCards.map((card, i) => (
              <motion.div key={card.pollutant} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center">
                        <card.icon className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">{card.pollutant}</h3>
                        <p className="text-lg font-black text-slate-300">{card.value}</p>
                      </div>
                    </div>
                    <Badge variant={card.variant} size="sm">{card.status}</Badge>
                  </div>
                  <p className="text-xs text-slate-400">{card.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* District Air Quality Table */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-slate-400" />
              District Air Quality Profiles
            </h2>
            <p className="text-slate-400">AQI values, trends, and dominant pollutants by district</p>
          </motion.div>

          <Card className="glass-intense border-white/10 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">District</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">AQI</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">PM2.5</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Trend</th>
                  <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Dominant Pollutant</th>
                </tr>
              </thead>
              <tbody>
                {districtAirQualityData.map((d, i) => (
                  <motion.tr
                    key={d.district}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.03 }}
                    className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <span className="text-white font-medium">{d.district}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant={d.aqiVariant} size="sm">{d.aqi}</Badge>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`text-xs font-medium ${
                        d.aqiCategory === 'Unhealthy' ? 'text-red-400' :
                        d.aqiCategory === 'Unhealthy for Sensitive' ? 'text-amber-400' :
                        'text-emerald-400'
                      }`}>
                        {d.aqiCategory}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-slate-300">{d.pm25}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`text-xs font-medium ${
                        d.trend === 'worsening' ? 'text-red-400' :
                        d.trend === 'improving' ? 'text-emerald-400' :
                        'text-slate-400'
                      }`}>
                        {d.trend === 'worsening' ? '↗' : d.trend === 'improving' ? '↘' : '→'} {d.trend}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center text-slate-300">{d.dominantPollutant}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </section>

      {/* Source-Linked Advisories */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <Flame className="w-6 h-6 text-orange-400" />
              Emission Source Advisories
            </h2>
            <p className="text-slate-400">Pollution source identification and targeted intervention recommendations</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pollutionSourceAdvisories.map((advisory, i) => (
              <motion.div key={advisory.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-slate-500/20 to-gray-600/20 flex items-center justify-center">
                        <advisory.icon className="w-4 h-4 text-slate-400" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white group-hover:text-slate-300 transition-colors">{advisory.title}</h3>
                        <p className="text-xs text-slate-500">{advisory.source}</p>
                      </div>
                    </div>
                    <Badge variant={advisory.status === 'Active' ? 'danger' : advisory.status === 'Monitoring' ? 'warning' : 'info'} size="sm">
                      {advisory.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-400 mb-3 leading-relaxed">{advisory.desc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Issued: {advisory.issued}</span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Incident Feed */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              Recent Air Quality Incidents
            </h2>
            <p className="text-slate-400">Latest exceedance events, alerts, and pollution complaints</p>
          </motion.div>

          <Card className="glass-intense border-white/10 p-5">
            <div className="space-y-4">
              {recentIncidents.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  className="py-3 border-b border-white/5 last:border-0 last:pb-0"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-white font-medium">{r.type}</span>
                    <div className="flex items-center gap-2">
                      {r.verified ? (
                        <Badge variant="success" size="sm" className="text-xs">Verified</Badge>
                      ) : (
                        <Badge variant="warning" size="sm" className="text-xs">Pending</Badge>
                      )}
                      <Badge variant={r.severity === 'Critical' ? 'critical' : r.severity === 'High' ? 'danger' : 'warning'} size="sm" className="text-xs">
                        {r.severity}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>{r.location}</span>
                    </div>
                    <span className="text-slate-600">|</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{r.time}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Cross-links */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Related Actions</h2>
            <p className="text-slate-400">Explore connected environmental monitoring domains</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Solid Waste', href: '/environmental-monitoring/solid-waste', desc: 'Landfill stress, dumping sites', icon: ExternalLink, color: 'from-gray-500 to-slate-600' },
              { label: 'Environmental Health', href: '/environmental-monitoring/environmental-health', desc: 'Odor, fish kill, stagnant water', icon: ExternalLink, color: 'from-amber-500 to-orange-600' },
              { label: 'Sewage & Wastewater', href: '/environmental-monitoring/sewage-wastewater', desc: 'Overflow and discharge monitoring', icon: ExternalLink, color: 'from-blue-500 to-cyan-600' },
              { label: 'Dashboards', href: '/environmental-monitoring/dashboards', desc: 'District comparison & stress maps', icon: ExternalLink, color: 'from-violet-500 to-purple-600' },
            ].map((link, i) => (
              <motion.div key={link.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-5 cursor-pointer group" onClick={() => router.push(link.href)}>
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center shadow flex-shrink-0`}>
                      <link.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white group-hover:text-slate-300 transition-colors">{link.label}</h3>
                      <p className="text-xs text-slate-400 mt-0.5">{link.desc}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
