'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  BookOpen, ArrowLeft, Database, MapPin, FileSearch, Layers, Shield,
  Eye, Globe, FlaskConical, Users, AlertTriangle, RefreshCw, CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const steps = [
  {
    step: 1,
    title: 'Source Identification & Contribution Intake',
    description:
      'Environmental data enters Kashmir EcoWatch through multiple pathways, including verified government agencies, environmental authorities, academic and research institutions, NGOs, field monitoring networks, Earth observation and geospatial systems, biodiversity reference networks, and community-supported evidence streams. Contributors are associated with recognized institutions, organizations, and monitoring networks, or contribute in their personal capacity.',
    icon: Database,
    color: 'from-blue-500 to-cyan-600',
  },
  {
    step: 2,
    title: 'Source Classification & Relevance Mapping',
    description:
      'Each contribution or incoming dataset is classified by source type, geographic scope, thematic relevance, data type, and intended platform use. This helps determine whether a record belongs in biodiversity, water systems, environmental monitoring, air and noise monitoring, risk and monitoring, district profiles, or internal review systems.',
    icon: FileSearch,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    step: 3,
    title: 'Validation & Evidence Review',
    description:
      'Records are checked for internal consistency, plausibility, source credibility, completeness, and alignment with available contextual evidence. Depending on the source type, this may involve comparison against institutional records, scientific references, field observations, location coherence, or associated evidence such as photographs, coordinates, timestamps, or supporting documentation.',
    icon: CheckCircle,
    color: 'from-violet-500 to-purple-600',
  },
  {
    step: 4,
    title: 'Standardization & Structuring',
    description:
      'Validated data is converted into standardized formats appropriate to its type. This includes taxonomic normalization, geographic formatting, metadata alignment, thematic coding, temporal formatting, and structured tagging for dashboards, maps, district views, and module-level intelligence systems.',
    icon: Layers,
    color: 'from-amber-500 to-orange-600',
  },
  {
    step: 5,
    title: 'Geospatial Integration & Thematic Routing',
    description:
      'Where spatial relevance exists, records are mapped into geospatial workflows using coordinates, administrative boundaries, environmental zones, habitat references, water systems, monitoring areas, or risk-linked locations. Data is then routed into the relevant thematic systems, such as biodiversity, water systems, environmental monitoring, air and noise monitoring, or risk and monitoring.',
    icon: MapPin,
    color: 'from-indigo-500 to-blue-600',
  },
  {
    step: 6,
    title: 'Quality Review & Expert Assessment',
    description:
      'Before publication, data may pass through quality review layers that consider sensitivity, interpretive risk, thematic fit, and public-use implications. This process is further informed by the insights of the Kashmir EcoWatch Global Diaspora Environmental Expert Committee, which supports contextual assessment, scientific interpretation, and responsible environmental judgment where needed.',
    icon: Eye,
    color: 'from-rose-500 to-red-600',
  },
  {
    step: 7,
    title: 'Publication, Status Tagging & Access Controls',
    description:
      'Not all data is published in the same way. Records may appear with different publication states depending on source confidence, review outcome, and sensitivity. Public-facing outputs may include labels such as Verified, Under Review, Institutionally Sourced, Community Submitted, Historical, or Restricted / Sensitive. Some records may be generalized, masked, delayed, or withheld from full public display where ecological, safety, or interpretive concerns apply.',
    icon: Shield,
    color: 'from-slate-500 to-gray-600',
  },
  {
    step: 8,
    title: 'Revalidation, Feedback & Ongoing Updates',
    description:
      'Kashmir EcoWatch is not a static archive. Existing records, mapped features, community-supported evidence, and environmental intelligence layers may be revisited, updated, corrected, or reclassified over time as new information, expert review, institutional inputs, or field-based verification becomes available.',
    icon: RefreshCw,
    color: 'from-teal-500 to-emerald-600',
  },
];

const sourceTypes = [
  'Government and regulatory data',
  'Research and academic datasets',
  'Geospatial and remote sensing inputs',
  'Biodiversity and conservation references',
  'Field monitoring and survey records',
  'Citizen science and community-supported evidence',
  'District-level observations and issue reports',
];

const evidenceHandling = [
  {
    type: 'Institutional & Regulatory Sources',
    handling: 'May enter with stronger baseline confidence but still require thematic and contextual handling before publication.',
  },
  {
    type: 'Community-Supported Evidence',
    handling: 'May require additional screening, review, and contextual comparison against institutional and scientific references before broader publication.',
  },
  {
    type: 'Remote Sensing & GIS Inputs',
    handling: 'Strengthen interpretation and spatial analysis, but may still require field context, institutional cross-reference, and review-based use rather than automatic stand-alone public claims.',
  },
  {
    type: 'Sensitive Biodiversity & Incident Records',
    handling: 'May be generalized, partially restricted, or delayed in public display where exact publication could affect ecological sensitivity, vulnerable habitats, or species protection.',
  },
];

const publicationStatuses = [
  { label: 'Verified', desc: 'Passed multi-layer review; highest confidence' },
  { label: 'Under Review', desc: 'Submitted and undergoing assessment' },
  { label: 'Institutionally Sourced', desc: 'From recognized authority or agency' },
  { label: 'Community Submitted', desc: 'From citizen scientists or field contributors' },
  { label: 'Historical', desc: 'Archived record with time-bound relevance' },
  { label: 'Restricted / Sensitive', desc: 'Limited public display due to sensitivity' },
];

const thematicModules = [
  'Biodiversity',
  'Water Systems',
  'Environmental Monitoring',
  'Air & Noise Monitoring',
  'Risk & Monitoring',
  'District Profiles',
  'Protected Area Network',
  'Seasonal Ecology',
  'Library & Research',
];

export default function MethodologyPage() {
  return (
    <main className="min-h-screen bg-slate-950">{/* Hero */}
      <section className="relative pt-48 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-teal-950/30 to-slate-950" />
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <Link href="/about" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to About
            </Link>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Methodological Framework</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Methodology</span>
            </h1>

            <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-4xl">
              Kashmir EcoWatch follows a structured environmental intelligence methodology designed to support scientific consistency,
              regional relevance, geospatial integrity, and responsible public publication. Data is not treated as a single undifferentiated
              stream. Different source types, evidence classes, and thematic modules are handled through layered review, contextual assessment,
              standardization, and publication logic before being surfaced across maps, dashboards, alerts, profiles, and public knowledge layers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 8-Step Process */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-2">Eight-Stage Data Handling Process</h2>
            <p className="text-slate-400">From source intake to ongoing revalidation — every record follows a structured pathway</p>
          </div>

          <div className="space-y-4">
            {steps.map((item, i) => (
              <motion.div key={item.step} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} viewport={{ once: true }}>
                <Card className="glass-intense border-white/10 p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Step {item.step}</span>
                        <h3 className="text-lg font-bold text-white">{item.title}</h3>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Source Types */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white">Source Types Considered in Methodology</h2>
            </div>
            <p className="text-sm text-slate-400 mb-6 max-w-3xl">
              Kashmir EcoWatch&apos;s methodology is designed to work across multiple evidence classes.
              Environmental data enters through verified institutions, authorities, academic and research ecosystems,
              NGOs, monitoring networks, Earth observation systems, biodiversity reference platforms, and community-supported evidence streams.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {sourceTypes.map((s) => (
                <div key={s} className="flex items-start gap-2 p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                  <span className="text-sm text-slate-300">{s}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Evidence Type Handling */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <FileSearch className="w-6 h-6 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">How Different Evidence Types Are Handled</h2>
            </div>
            <p className="text-sm text-slate-400 mb-6 max-w-3xl">
              Different source types are not treated equally by default. Confidence baselines, review depth, and publication controls vary by evidence class.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {evidenceHandling.map((eh) => (
                <div key={eh.type} className="p-5 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="text-sm font-bold text-white mb-2">{eh.type}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{eh.handling}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Publication Statuses */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-violet-400" />
              <h2 className="text-xl font-bold text-white">Publication Status Logic</h2>
            </div>
            <p className="text-sm text-slate-400 mb-6 max-w-3xl">
              Records appear with different publication states depending on source confidence, review outcome, and sensitivity.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {publicationStatuses.map((ps) => (
                <div key={ps.label} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="text-sm font-bold text-white mb-1">{ps.label}</h3>
                  <p className="text-xs text-slate-400">{ps.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Thematic Routing */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Layers className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-bold text-white">Thematic Routing Destinations</h2>
            </div>
            <p className="text-sm text-slate-400 mb-6 max-w-3xl">
              After validation and standardization, data is routed into the relevant thematic systems across the platform.
            </p>
            <div className="flex flex-wrap gap-2">
              {thematicModules.map((m) => (
                <Badge key={m} variant="outline" size="lg">{m}</Badge>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Remote Sensing & GIS */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white">Remote Sensing & GIS Handling</h2>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
              Selected modules may incorporate remote sensing and GIS-supported inputs to strengthen spatial interpretation,
              environmental overlays, change detection, and map-based analysis. These inputs support environmental intelligence,
              but are handled alongside institutional records, field observations, and review-based assessment rather than as
              automatic stand-alone public claims in every case.
            </p>
          </Card>
        </div>
      </section>

      {/* Expert Committee */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-6 h-6 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">Role of the Kashmir EcoWatch Global Diaspora Environmental Expert Committee</h2>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
              The Kashmir EcoWatch Global Diaspora Environmental Expert Committee contributes contextual insight,
              environmental interpretation, and broader expert perspective to support responsible review and assessment
              of data entering or circulating through the platform. This role is especially important where regional
              interpretation, thematic nuance, or publication sensitivity requires additional expert judgment.
            </p>
          </Card>
        </div>
      </section>

      {/* Data Responsibility */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-amber-500/20 p-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-bold text-white">Data Responsibility</h2>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
              The methodology is designed not only to improve accuracy, but also to reduce harm. Some records may be generalized,
              delayed, masked, or restricted in public view where exact publication could affect ecological sensitivity,
              vulnerable habitats, species protection, public confusion, or environmental safety.
            </p>
          </Card>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 p-8 text-center">
            <p className="text-slate-400 mb-6 max-w-2xl mx-auto text-sm leading-relaxed">
              Data is contributed by, informed by, and compiled through verified institutions, monitoring systems,
              and community-supported evidence, and is handled according to source type, relevance, and verification
              status before publication.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/about/data-sources">
                <Badge variant="outline" size="lg" className="cursor-pointer hover:border-white/30 transition-colors px-4 py-2">
                  <Database className="w-4 h-4 mr-2" />
                  Data Sources
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
                  <FlaskConical className="w-4 h-4 mr-2" />
                  Contribute
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
