'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Database, Upload, FileText, ArrowRight, CheckCircle,
  Droplets, Leaf, MapPin, BarChart3, Camera, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const submissionTypes = [
  {
    id: 'water-quality',
    title: 'Water Quality Readings',
    description: 'Submit pH, dissolved oxygen, turbidity, temperature, and other water quality parameters',
    icon: Droplets,
    color: 'from-blue-500 to-cyan-600',
    fields: ['Waterbody name', 'GPS coordinates', 'pH value', 'Dissolved oxygen', 'Turbidity', 'Temperature', 'Date/time', 'Measurement method'],
  },
  {
    id: 'species-records',
    title: 'Species Survey Records',
    description: 'Structured species count data, population surveys, and distribution records',
    icon: Leaf,
    color: 'from-emerald-500 to-teal-600',
    fields: ['Species name', 'Count/abundance', 'Location', 'Habitat type', 'Behavior notes', 'Photo evidence', 'Survey method'],
  },
  {
    id: 'district-datasets',
    title: 'District Datasets',
    description: 'District-level environmental datasets, monitoring station exports, and regional assessments',
    icon: BarChart3,
    color: 'from-violet-500 to-purple-600',
    fields: ['Dataset name', 'District coverage', 'Time period', 'Data format', 'Variables measured', 'Source agency'],
  },
  {
    id: 'geotagged-evidence',
    title: 'Geotagged Evidence Collections',
    description: 'Location-tagged photos, drone imagery, and field documentation with GPS metadata',
    icon: Camera,
    color: 'from-amber-500 to-orange-600',
    fields: ['Location coordinates', 'Photo/file upload', 'Date captured', 'Description', 'Evidence type', 'Confidence level'],
  },
  {
    id: 'research-data',
    title: 'Research & Survey Data',
    description: 'Academic research outputs, institutional survey results, and peer-reviewed findings',
    icon: FileText,
    color: 'from-indigo-500 to-blue-600',
    fields: ['Study title', 'Institution', 'Publication status', 'Dataset link', 'DOI/reference', 'Abstract'],
  },
  {
    id: 'monitoring-exports',
    title: 'Monitoring Station Exports',
    description: 'Raw or processed data from automated monitoring stations and sensor networks',
    icon: Database,
    color: 'from-slate-500 to-gray-600',
    fields: ['Station ID', 'Parameter type', 'Time series data', 'Data format', 'Calibration info', 'Quality flags'],
  },
];

export default function ContributeDataPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-48 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-indigo-950/30 to-slate-950" />
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <button onClick={() => router.push('/contribute')} className="hover:text-white transition-colors">Contribute</button>
              <span className="text-slate-600">/</span>
              <span className="text-white font-medium">Contribute Data</span>
            </nav>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl">
                <Database className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Structured Data Contribution</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Contribute <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Data</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Share structured datasets, research findings, water quality readings, and monitoring data
              to strengthen Kashmir&apos;s environmental intelligence and evidence archive
            </p>
          </motion.div>
        </div>
      </section>

      {/* Submission Types */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Select Data Type</h2>
            <p className="text-slate-400">Choose the type of data you want to contribute</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {submissionTypes.map((type, index) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card
                  className={`glass-intense border transition-all p-6 h-full cursor-pointer ${
                    selectedType === type.id ? 'border-blue-500 bg-blue-500/5' : 'border-white/10 hover:border-white/20'
                  }`}
                  onClick={() => setSelectedType(type.id)}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <type.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-white mb-1">{type.title}</h3>
                      <p className="text-sm text-slate-400">{type.description}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Required Fields</span>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {type.fields.slice(0, 4).map((field, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-xs text-slate-300">
                          {field}
                        </span>
                      ))}
                      {type.fields.length > 4 && (
                        <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-xs text-slate-400">
                          +{type.fields.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  <Button
                    size="sm"
                    className={`w-full bg-gradient-to-r ${type.color} hover:opacity-90 text-white text-sm`}
                    onClick={() => router.push(`/submit-sighting`)}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Submit {type.title}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Guidelines */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white">Data Submission Guidelines</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-bold text-white mb-2">Accuracy</h3>
                <p className="text-sm text-slate-400">
                  All data should include precise location (GPS preferred), date/time of collection,
                  and measurement methodology. Clearly label estimated vs. measured values.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-2">Formats</h3>
                <p className="text-sm text-slate-400">
                  Accepted formats: CSV, JSON, GeoJSON, Shapefile, KML, images (JPG/PNG/WEBP with EXIF).
                  Maximum file size: 50MB per upload.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-2">Verification</h3>
                <p className="text-sm text-slate-400">
                  Submissions go through Community → Expert → Authority verification tiers.
                  Data quality badges appear on verified contributions.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-400 mb-4">
            Looking for other ways to contribute?
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button variant="outline" className="border-white/20 text-white" onClick={() => router.push('/report-issue')}>
              <ArrowRight className="w-4 h-4 mr-2" />
              Report an Issue
            </Button>
            <Button variant="outline" className="border-white/20 text-white" onClick={() => router.push('/submit-sighting')}>
              <ArrowRight className="w-4 h-4 mr-2" />
              Submit a Sighting
            </Button>
            <Button variant="outline" className="border-white/20 text-white" onClick={() => router.push('/citizen-science')}>
              <ArrowRight className="w-4 h-4 mr-2" />
              Join Citizen Science
            </Button>
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
