'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Database, ArrowLeft, Building2, GraduationCap, Globe2, Satellite,
  Camera, Users, MapPin, FileText, FlaskConical, CheckCircle, Layers
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const sourceCategories = [
  {
    category: 'Government & Regulatory Agencies',
    icon: Building2,
    color: 'from-blue-500 to-cyan-600',
    description: 'Official environmental data from government bodies, regulatory authorities, and statutory agencies',
    sources: [
      'J&K Forest Department',
      'Ministry of Environment, Forest & Climate Change (MoEFCC)',
      'India Meteorological Department (IMD)',
      'Central Pollution Control Board (CPCB)',
      'J&K Pollution Control Committee (JKPCC)',
      'Survey of India',
      'National Remote Sensing Centre (NRSC)',
      'J&K Lakes & Waterways Development Authority',
    ],
  },
  {
    category: 'Research & Academic Institutions',
    icon: GraduationCap,
    color: 'from-emerald-500 to-teal-600',
    description: 'Peer-reviewed datasets, academic surveys, and institutional research outputs',
    sources: [
      'Wildlife Institute of India (WII)',
      'Botanical Survey of India (BSI)',
      'Zoological Survey of India (ZSI)',
      'University of Kashmir',
      'National Institute of Technology Srinagar',
      'Sher-e-Kashmir University of Agricultural Sciences (SKUAST)',
      'Indian Institute of Integrative Medicine',
    ],
  },
  {
    category: 'International & Reference Databases',
    icon: Globe2,
    color: 'from-violet-500 to-purple-600',
    description: 'Global biodiversity, conservation, and environmental reference systems',
    sources: [
      'IUCN Red List of Threatened Species',
      'Global Biodiversity Information Facility (GBIF)',
      'Ramsar Sites Information System',
      'World Database on Protected Areas (WDPA)',
      'BirdLife International Data Zone',
      'NASA Earth Observing Systems',
      'Copernicus / ESA Remote Sensing Data',
    ],
  },
  {
    category: 'Geospatial & Remote Sensing Inputs',
    icon: Satellite,
    color: 'from-amber-500 to-orange-600',
    description: 'Satellite imagery, aerial surveys, GIS layers, and earth observation products',
    sources: [
      'Landsat / USGS satellite imagery',
      'Sentinel satellite products',
      'Digital elevation models (DEM)',
      'Land use / land cover classifications',
      'NDVI and vegetation indices',
      'Water body extent mapping',
      'Snow and glacier delineation',
    ],
  },
  {
    category: 'Field Monitoring & Survey Records',
    icon: Camera,
    color: 'from-indigo-500 to-blue-600',
    description: 'Ground-truthed observations, field surveys, camera traps, and monitoring station data',
    sources: [
      'Wildlife camera trap networks',
      'Water quality monitoring stations',
      'Air quality monitoring stations',
      'Bird census and survey records',
      'Vegetation and habitat surveys',
      'Phenological observation records',
      'Trail and field documentation',
    ],
  },
  {
    category: 'Citizen Science & Community Evidence',
    icon: Users,
    color: 'from-rose-500 to-red-600',
    description: 'Community-submitted observations, photo evidence, and participatory monitoring records',
    sources: [
      'Citizen science species sightings',
      'Community photo documentation',
      'Environmental issue reports',
      'District-level observations',
      'Community data verification reviews',
      'Outreach and awareness records',
      'Geotagged evidence collections',
    ],
  },
];

const publicationStates = [
  { label: 'Verified', desc: 'Passed multi-layer review; highest confidence', color: 'success' as const },
  { label: 'Under Review', desc: 'Submitted and undergoing assessment', color: 'warning' as const },
  { label: 'Institutionally Sourced', desc: 'From recognized authority or agency', color: 'info' as const },
  { label: 'Community Submitted', desc: 'From citizen scientists or field contributors', color: 'outline' as const },
  { label: 'Historical', desc: 'Archived record with time-bound relevance', color: 'info' as const },
  { label: 'Restricted / Sensitive', desc: 'Limited display due to ecological sensitivity', color: 'danger' as const },
];

export default function DataSourcesPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-48 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-indigo-950/30 to-slate-950" />
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <Link href="/about" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to About
            </Link>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl">
                <Database className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Data Provenance</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Data <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Sources</span>
            </h1>

            <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-4xl">
              Environmental data is contributed by, informed by, and compiled through verified institutions,
              monitoring systems, research ecosystems, remote sensing platforms, and community-supported
              evidence streams. Each source class is handled according to its type, relevance, and
              verification status before publication.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Source Categories */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-2">Source Categories</h2>
            <p className="text-slate-400">Environmental intelligence on Kashmir EcoWatch is built from six evidence classes</p>
          </div>

          <div className="space-y-6">
            {sourceCategories.map((cat, i) => (
              <motion.div key={cat.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} viewport={{ once: true }}>
                <Card className="glass-intense border-white/10 p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <cat.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">{cat.category}</h3>
                      <p className="text-sm text-slate-400">{cat.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 ml-16">
                    {cat.sources.map((source) => (
                      <div key={source} className="flex items-center gap-2 text-sm text-slate-300 py-1">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${cat.color} flex-shrink-0`} />
                        {source}
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Publication States */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">Publication States by Source</h2>
            </div>
            <p className="text-sm text-slate-400 mb-6 max-w-3xl">
              Not all data appears the same way. Records carry publication-state labels that reflect their source confidence,
              review depth, and sensitivity level. This ensures transparency about what users are seeing and how it was handled.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {publicationStates.map((ps) => (
                <div key={ps.label} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={ps.color} size="sm">{ps.label}</Badge>
                  </div>
                  <p className="text-xs text-slate-400">{ps.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* How Sources Map to Platform */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Layers className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-bold text-white">How Sources Map to Platform Modules</h2>
            </div>
            <p className="text-sm text-slate-400 mb-6 max-w-3xl">
              After intake and classification, data is routed into the thematic modules where it is most relevant.
              Different source types may contribute to multiple modules simultaneously.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { module: 'Biodiversity', sources: 'Field surveys, citizen sightings, IUCN/GBIF references, camera traps, academic research' },
                { module: 'Water Systems', sources: 'JKLWDA data, water quality stations, glacier/snow monitoring, wetland surveys, Ramsar records' },
                { module: 'Environmental Monitoring', sources: 'CPCB/JKPCC stations, air quality networks, waste management records, pollution incidents' },
                { module: 'Air & Noise Monitoring', sources: 'Continuous monitoring stations, field measurements, community noise reports' },
                { module: 'Risk & Monitoring', sources: 'Disaster management agencies, IMD alerts, geological surveys, incident reports, early warning systems' },
                { module: 'District Profiles', sources: 'District-level observations, administrative data, community reports, geospatial overlays' },
                { module: 'Protected Area Network', sources: 'Forest Department records, sanctuary surveys, national park management, corridor mapping' },
                { module: 'Seasonal Ecology', sources: 'Phenological records, bloom observations, migration window documentation, pollinator activity' },
              ].map((m) => (
                <div key={m.module} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="text-sm font-bold text-white mb-2">{m.module}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{m.sources}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 p-8 text-center">
            <p className="text-slate-400 mb-6 max-w-2xl mx-auto text-sm leading-relaxed">
              Data is contributed by, informed by, and compiled through verified institutions, monitoring systems,
              and community-supported evidence, and is handled according to source type, relevance, and verification
              status before publication.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/about/methodology">
                <Badge variant="outline" size="lg" className="cursor-pointer hover:border-white/30 transition-colors px-4 py-2">
                  <FlaskConical className="w-4 h-4 mr-2" />
                  Our Methodology
                </Badge>
              </Link>
              <Link href="/about/verification">
                <Badge variant="outline" size="lg" className="cursor-pointer hover:border-white/30 transition-colors px-4 py-2">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Verification Model
                </Badge>
              </Link>
              <Link href="/contribute">
                <Badge variant="outline" size="lg" className="cursor-pointer hover:border-white/30 transition-colors px-4 py-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  Contribute Data
                </Badge>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
