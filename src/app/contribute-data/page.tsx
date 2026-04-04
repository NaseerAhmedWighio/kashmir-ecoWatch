'use client';

import React, { useState } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Database, Upload, FileText, ArrowRight, CheckCircle,
  Droplets, Leaf, MapPin, BarChart3, Camera, ChevronRight,
  Shield, Route, Users, FileCheck, Search, Layers, Eye, Globe, BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const submissionTypes = [
  {
    id: 'water-quality-readings',
    title: 'Water Quality Readings',
    description: 'Submit pH, dissolved oxygen, turbidity, temperature, and other water quality parameters',
    icon: Droplets,
    color: 'from-blue-500 to-cyan-600',
    route: '/contribute-data/water-quality-readings',
    nextStep: 'Opens the water quality submission form with parameter fields, file upload, and confirmation',
    fields: ['Waterbody name', 'GPS coordinates', 'pH value', 'Dissolved oxygen', 'Turbidity', 'Temperature', 'Date/time', 'Measurement method'],
    routesTo: 'Water Systems → Water Quality',
  },
  {
    id: 'species-survey-records',
    title: 'Species Survey Records',
    description: 'Structured species count data, population surveys, and distribution records',
    icon: Leaf,
    color: 'from-emerald-500 to-teal-600',
    route: '/contribute-data/species-survey-records',
    nextStep: 'Opens the species survey form with observation protocol, habitat data, and evidence upload',
    fields: ['Species name', 'Count/abundance', 'Location', 'Habitat type', 'Behavior notes', 'Photo evidence', 'Survey method'],
    routesTo: 'Biodiversity → Species Records',
  },
  {
    id: 'district-datasets',
    title: 'District Datasets',
    description: 'District-level environmental datasets, monitoring station exports, and regional assessments',
    icon: BarChart3,
    color: 'from-violet-500 to-purple-600',
    route: '/contribute-data/district-datasets',
    nextStep: 'Opens the district dataset form with coverage details, format selection, and file upload',
    fields: ['Dataset name', 'District coverage', 'Time period', 'Data format', 'Variables measured', 'Source agency'],
    routesTo: 'District Profiles → Dashboards',
  },
  {
    id: 'geotagged-evidence',
    title: 'Geotagged Evidence Collections',
    description: 'Location-tagged photos, drone imagery, and field documentation with GPS metadata',
    icon: Camera,
    color: 'from-amber-500 to-orange-600',
    route: '/contribute-data/geotagged-evidence',
    nextStep: 'Opens the geotagged evidence form with map preview, EXIF handling, and media upload',
    fields: ['Location coordinates', 'Photo/file upload', 'Date captured', 'Description', 'Evidence type', 'Confidence level'],
    routesTo: 'Routed by theme (Biodiversity, Monitoring, Risk)',
  },
  {
    id: 'research-survey-data',
    title: 'Research & Survey Data',
    description: 'Academic research outputs, institutional survey results, and peer-reviewed findings',
    icon: FileText,
    color: 'from-indigo-500 to-blue-600',
    route: '/contribute-data/research-survey-data',
    nextStep: 'Opens the research data form with study details, abstract, and dataset upload',
    fields: ['Study title', 'Institution', 'Publication status', 'Dataset link', 'DOI/reference', 'Abstract'],
    routesTo: 'Research Library + Thematic Modules',
  },
  {
    id: 'monitoring-station-exports',
    title: 'Monitoring Station Exports',
    description: 'Raw or processed data from automated monitoring stations and sensor networks',
    icon: Database,
    color: 'from-slate-500 to-gray-600',
    route: '/contribute-data/monitoring-station-exports',
    nextStep: 'Opens the station export form with time series upload, calibration notes, and quality flags',
    fields: ['Station ID', 'Parameter type', 'Time series data', 'Data format', 'Calibration info', 'Quality flags'],
    routesTo: 'Environmental Monitoring → Air/Water/Noise',
  },
];

const workflowSteps = [
  { icon: FileCheck, label: 'Received', description: 'Submission logged and acknowledged', color: 'text-blue-400' },
  { icon: Search, label: 'Screened', description: 'Initial format and metadata check', color: 'text-amber-400' },
  { icon: Layers, label: 'Reviewed', description: 'Thematic expert evaluation', color: 'text-purple-400' },
  { icon: Route, label: 'Routed', description: 'Integrated into relevant modules', color: 'text-orange-400' },
  { icon: Eye, label: 'Published', description: 'Available in dashboards or held under review', color: 'text-emerald-400' },
];

const contributorTypes = [
  { id: 'individual', label: 'Individual Contributor', icon: Users },
  { id: 'researcher', label: 'Academic/Research Contributor', icon: BookOpen },
  { id: 'institution', label: 'Institution', icon: Database },
  { id: 'ngo', label: 'NGO', icon: Globe },
  { id: 'field-team', label: 'Field Team', icon: Camera },
  { id: 'monitoring-network', label: 'Monitoring Network', icon: BarChart3 },
];

export default function ContributeDataPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-slate-950">{/* Hero */}
      <section className="relative pt-48 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-indigo-950/30 to-slate-950" />
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <Link href="/contribute" className="hover:text-white transition-colors">Contribute</Link>
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

      {/* How Data Submissions Are Handled */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="glass-intense border-white/10 p-6">
              <div className="flex items-start gap-3 mb-4">
                <Shield className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-lg font-bold text-white mb-2">How Data Submissions Are Handled</h2>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Structured submissions are screened, classified, validated, and routed into the relevant thematic 
                    and district workflows. Depending on source type and evidence quality, records may move through 
                    community, expert, and authority-aligned review before publication.
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-white/10">
                <div className="flex items-start gap-2 text-sm text-slate-400">
                  <Route className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                  <p>
                    Submissions may be routed into <span className="text-white font-medium">Biodiversity</span>, 
                    <span className="text-white font-medium"> Water Systems</span>, 
                    <span className="text-white font-medium"> Environmental Monitoring</span>, 
                    <span className="text-white font-medium"> Air & Noise Monitoring</span>, 
                    <span className="text-white font-medium"> District Profiles</span>, 
                    <span className="text-white font-medium"> Dashboards</span>, or the 
                    <span className="text-white font-medium"> Research Library</span> depending on data type and content.
                  </p>
                </div>
                <div className="flex items-start gap-2 text-sm text-slate-400 mt-3">
                  <Users className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
                  <p>
                    Accepted from: <span className="text-white font-medium">Individuals</span>, 
                    <span className="text-white font-medium"> Researchers</span>, 
                    <span className="text-white font-medium"> Institutions</span>, 
                    <span className="text-white font-medium"> NGOs</span>, 
                    <span className="text-white font-medium"> Field Teams</span>, and 
                    <span className="text-white font-medium"> Monitoring Networks</span>
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Submission Types */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Select Data Type</h2>
            <p className="text-slate-400">Choose the type of data you want to contribute — each card opens a dedicated submission workflow</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {submissionTypes.map((type, index) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link href={type.route} className="block h-full">
                  <Card
                    className={`glass-intense border transition-all p-6 h-full hover:border-white/30 cursor-pointer ${
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

                    <div className="mb-3">
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

                    <div className="mb-4">
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Routes To</span>
                      <div className="mt-2">
                        <Badge variant="outline" className="text-xs border-white/10 text-slate-300">
                          {type.routesTo}
                        </Badge>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      className={`w-full bg-gradient-to-r ${type.color} hover:opacity-90 text-white text-sm`}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Submit {type.title}
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What Happens After Submission */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="glass-intense border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-blue-400" />
                What Happens After Submission
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                {workflowSteps.map((step, idx) => (
                  <div key={step.label} className="flex flex-col items-start gap-2">
                    <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0`}>
                      <step.icon className={`w-5 h-5 ${step.color}`} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">{step.label}</div>
                      <div className="text-xs text-slate-400">{step.description}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 text-xs text-slate-500 space-y-1">
                <p>• Each submission receives a unique reference ID for tracking</p>
                <p>• Follow-up may be requested if additional information or clarification is needed</p>
                <p>• Publication status depends on data quality, source verification, and sensitivity</p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Data Submission Standards */}
      <section className="py-8 md:py-12 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white">Data Submission Standards</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-bold text-white mb-2">Accuracy</h3>
                <p className="text-sm text-slate-400">
                  All data should include precise location (GPS preferred), date/time of collection,
                  and measurement methodology. Clearly label estimated vs. measured values.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-2">Accepted Formats</h3>
                <p className="text-sm text-slate-400">
                  CSV, JSON, GeoJSON, Shapefile, KML, Parquet, XML, images (JPG/PNG/WEBP with EXIF).
                  Maximum file size: 50–200MB depending on submission type.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-white mb-2">Verification Pathway</h3>
                <p className="text-sm text-slate-400">
                  Submissions move through Community → Expert → Authority verification tiers.
                  Quality badges appear on verified contributions.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-amber-400" />
                    Permissions & Sensitivity
                  </h3>
                  <p className="text-sm text-slate-400">
                    Contributors confirm they have permission to share submitted data. 
                    Exact spatial details may be restricted for sensitive locations or species. 
                    Publication may be partial depending on data sensitivity and source agreements.
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-400" />
                    Contributor Types
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {contributorTypes.map((type) => (
                      <Badge key={type.id} variant="outline" className="text-xs border-white/10 text-slate-300">
                        <type.icon className="w-3 h-3 mr-1" />
                        {type.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA - Other Ways to Contribute */}
      <section className="py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-slate-400 mb-6 text-lg">
            Looking for other ways to contribute?
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/report-issue">
              <Button variant="outline" className="border-white/20 text-white">
                <ArrowRight className="w-4 h-4 mr-2" />
                Report an Issue
              </Button>
            </Link>
            <Link href="/submit-sighting">
              <Button variant="outline" className="border-white/20 text-white">
                <ArrowRight className="w-4 h-4 mr-2" />
                Submit a Sighting
              </Button>
            </Link>
            <Link href="/citizen-science">
              <Button variant="outline" className="border-white/20 text-white">
                <ArrowRight className="w-4 h-4 mr-2" />
                Join Citizen Science
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
