'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Shield, ArrowLeft, Database, Eye, CheckCircle, Users, Globe,
  Layers, MapPin, AlertTriangle, RefreshCw, Building2, GraduationCap,
  Satellite, FileSearch, FlaskConical
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const verificationStates = [
  {
    label: 'Institutionally Sourced',
    desc: 'Records originating from verified government agencies, environmental authorities, scientific institutions, survey bodies, or formally recognized data systems. These carry stronger baseline confidence but may still require thematic and contextual handling.',
    icon: Building2,
    color: 'from-blue-500 to-cyan-600',
    variant: 'info' as const,
  },
  {
    label: 'Expert Reviewed',
    desc: 'Records assessed through subject-specific review, interpretive screening, or contextual evaluation by qualified reviewers or expert contributors, including members of the Kashmir EcoWatch Global Diaspora Environmental Expert Committee.',
    icon: GraduationCap,
    color: 'from-violet-500 to-purple-600',
    variant: 'info' as const,
  },
  {
    label: 'Platform Reviewed',
    desc: 'Records reviewed internally for completeness, plausibility, source alignment, metadata quality, and thematic fit before public surfacing.',
    icon: FileSearch,
    color: 'from-amber-500 to-orange-600',
    variant: 'warning' as const,
  },
  {
    label: 'Community Submitted',
    desc: 'Records contributed through citizen science, issue reporting, sightings, field observations, photo documentation, or other community-supported evidence channels. These typically require stronger moderation and contextual screening.',
    icon: Users,
    color: 'from-emerald-500 to-teal-600',
    variant: 'outline' as const,
  },
  {
    label: 'Under Review',
    desc: 'Records that have entered the platform but are still awaiting one or more levels of screening, contextual review, thematic checking, or publication decision.',
    icon: Eye,
    color: 'from-slate-500 to-gray-600',
    variant: 'outline' as const,
  },
  {
    label: 'Verified',
    desc: 'Records that have passed the platform\'s relevant review thresholds for public use within their intended context. This is the highest confidence state for a given evidence class.',
    icon: CheckCircle,
    color: 'from-emerald-500 to-green-600',
    variant: 'success' as const,
  },
  {
    label: 'Historical / Reference',
    desc: 'Records retained for scientific, historical, archival, or comparative purposes. These may not represent current active field confirmation but serve as reference points for trend analysis.',
    icon: Globe,
    color: 'from-indigo-500 to-blue-600',
    variant: 'info' as const,
  },
  {
    label: 'Restricted / Sensitive',
    desc: 'Records that are withheld, generalized, delayed, or only partially surfaced due to ecological sensitivity, species protection, interpretive risk, or public-safety considerations.',
    icon: AlertTriangle,
    color: 'from-rose-500 to-red-600',
    variant: 'danger' as const,
  },
];

const workflowSteps = [
  { step: 1, title: 'Contribution or Source Intake', desc: 'Data enters through institutional, academic, monitoring, remote-sensing, or community channels' },
  { step: 2, title: 'Initial Screening', desc: 'Completeness check, format validation, and source-credibility screening' },
  { step: 3, title: 'Source Classification', desc: 'Record classified by origin, evidence class, thematic relevance, and intended platform use' },
  { step: 4, title: 'Evidence & Metadata Review', desc: 'Internal consistency, plausibility, location coherence, and metadata quality checks' },
  { step: 5, title: 'Geospatial or Thematic Relevance Check', desc: 'Spatial validation, boundary alignment, and module routing assessment' },
  { step: 6, title: 'Expert or Contextual Assessment', desc: 'Subject-specific review or diaspora expert interpretation where required' },
  { step: 7, title: 'Publication State Assignment', desc: 'Record tagged with appropriate verification state and access controls applied' },
  { step: 8, title: 'Ongoing Revalidation', desc: 'Records revisited, refined, or reclassified as new evidence or expert input emerges' },
];

const evidenceTypeHandling = [
  {
    type: 'Government & Regulatory Records',
    icon: Building2,
    handling: 'Usually enter with stronger baseline confidence, but may still require thematic handling, geographic relevance checks, and publication filtering.',
  },
  {
    type: 'Academic & Research Records',
    icon: GraduationCap,
    handling: 'May require metadata alignment, context review, and thematic mapping before publication. Institutional provenance strengthens credibility.',
  },
  {
    type: 'Remote Sensing & GIS Inputs',
    icon: Satellite,
    handling: 'May strengthen spatial interpretation, overlays, change detection, and environmental analysis, but may still require contextual interpretation or field-supported handling depending on use.',
  },
  {
    type: 'Field Observations & Monitoring',
    icon: MapPin,
    handling: 'May require comparison against known references, metadata checks, and thematic review. Sensor calibration and survey-method notes support credibility.',
  },
  {
    type: 'Community-Supported Evidence',
    icon: Users,
    handling: 'Often requires stronger moderation, contextual screening, cross-reference with institutional data, and review before broader publication or public alerting.',
  },
];

const moduleVerification = [
  {
    module: 'Biodiversity',
    details: 'Species records, sightings, habitat observations, and ecological notes may require taxonomic, habitat, photographic, and location-based review. Sensitive species locations may be generalized or restricted.',
  },
  {
    module: 'Water Systems',
    details: 'Hydrological, aquatic, wetland, spring, water-quality, and bloom-related records may require spatial, environmental, and evidence-type review. Monitoring station exports carry different weight than community observations.',
  },
  {
    module: 'Environmental Monitoring',
    details: 'Pollution, wastewater, solid waste, drinking water, and environmental service records may require severity, source, and contextual review. Incident claims may be tagged Under Review until confirmed.',
  },
  {
    module: 'Air & Noise Monitoring',
    details: 'Air quality, smoke, acoustic pressure, and exposure-linked records may require signal confidence, temporal relevance, and public advisory checks. Station data differs from community reports.',
  },
  {
    module: 'Risk & Monitoring',
    details: 'Hazards, incidents, alerts, and public warnings may require stronger urgency-based verification, escalation handling, and response-aware review. Unconfirmed alerts may be delayed or labeled appropriately.',
  },
  {
    module: 'District Profiles',
    details: 'District-level observations, community reports, and geospatial overlays may require contextual screening, source comparison, and local relevance assessment before surfacing.',
  },
];

export default function VerificationPage() {
  return (
    <main className="min-h-screen bg-slate-950">{/* Hero */}
      <section className="relative pt-48 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-violet-950/30 to-slate-950" />
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <Link href="/about" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to About
            </Link>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-violet-600 flex items-center justify-center shadow-2xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Trust & Verification Framework</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Verification <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-violet-400">Model</span>
            </h1>

            <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-4xl">
              Kashmir EcoWatch follows a multi-layer verification and review model designed to support environmental accuracy,
              contextual interpretation, geospatial integrity, and responsible publication. Not all records enter the platform
              in the same way, and not all data is published at the same level of certainty. Verification is handled according
              to source type, evidence quality, thematic relevance, spatial confidence, and public-use sensitivity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Source-Aware Verification */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white">Source-Aware Verification</h2>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-3xl mb-4">
              Verification on Kashmir EcoWatch begins with source awareness. Records may enter the platform through
              government agencies, environmental authorities, academic and research institutions, NGOs, field monitoring
              networks, Earth observation and geospatial systems, biodiversity reference platforms, and community-supported
              evidence streams. Each evidence class is handled differently depending on its origin, structure, confidence,
              and intended use.
            </p>
            <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
              Verification is not treated as a single generic step. Instead, the platform evaluates records in relation to
              who contributed them, what kind of source they come from, whether they are institutional, field-based,
              technical, remote, or community-supported, and whether they require thematic, spatial, or expert review
              before publication.
            </p>
          </Card>
        </div>
      </section>

      {/* Core Verification States */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-2">Core Verification States</h2>
            <p className="text-slate-400">Eight publication states that reflect source confidence, review depth, and sensitivity level</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {verificationStates.map((vs, i) => (
              <motion.div key={vs.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} viewport={{ once: true }}>
                <Card className="glass-intense border-white/10 p-5 h-full">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${vs.color} flex items-center justify-center flex-shrink-0`}>
                      <vs.icon className="w-5 h-5 text-white" />
                    </div>
                    <Badge variant={vs.variant} size="sm">{vs.label}</Badge>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{vs.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How Verification Works */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 p-8">
            <div className="flex items-center gap-3 mb-8">
              <Layers className="w-6 h-6 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">How Verification Works</h2>
            </div>
            <p className="text-sm text-slate-400 mb-6 max-w-3xl">A typical verification pathway follows these stages:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {workflowSteps.map((ws) => (
                <div key={ws.step} className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-emerald-400">{ws.step}</span>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">{ws.title}</h3>
                    <p className="text-xs text-slate-400">{ws.desc}</p>
                  </div>
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
              <FileSearch className="w-6 h-6 text-amber-400" />
              <h2 className="text-xl font-bold text-white">How Different Evidence Types Are Handled</h2>
            </div>
            <p className="text-sm text-slate-400 mb-6 max-w-3xl">
              Government and regulatory records, academic and research inputs, remote sensing and GIS-supported data,
              field observations, and community-supported evidence do not all move through the platform in the same way.
              Different source types may require different levels of review, contextual handling, thematic screening,
              or publication control before being surfaced publicly.
            </p>

            <div className="space-y-3">
              {evidenceTypeHandling.map((eth) => (
                <div key={eth.type} className="flex items-start gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center flex-shrink-0`}>
                    <eth.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">{eth.type}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{eth.handling}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Expert Committee */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <GraduationCap className="w-6 h-6 text-violet-400" />
              <h2 className="text-xl font-bold text-white">Role of the Kashmir EcoWatch Global Diaspora Environmental Expert Committee</h2>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-3xl mb-4">
              Data may be further evaluated, assessed, and contextually interpreted through the insights of the
              <strong className="text-white"> Kashmir EcoWatch Global Diaspora Environmental Expert Committee</strong>.
              This expert layer supports:
            </p>
            <ul className="space-y-2 max-w-3xl">
              {[
                'Contextual scientific interpretation for regionally complex data',
                'Regional environmental judgment where local knowledge matters',
                'Thematic review where specialist expertise is needed',
                'Publication responsibility and sensitivity-aware decision making',
                'Support for cases where institutional data is incomplete or ambiguous',
              ].map((item) => (
                <li key={item} className="text-sm text-slate-300 flex items-start gap-2">
                  <span className="text-violet-400 mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </section>

      {/* Verification by Module */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white">Verification by Module</h2>
            </div>
            <p className="text-sm text-slate-400 mb-6 max-w-3xl">
              Verification pathways vary across platform modules depending on the kind of evidence involved.
              Different thematic systems apply different review depths, evidence thresholds, and publication controls.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {moduleVerification.map((mv) => (
                <div key={mv.module} className="p-5 rounded-lg bg-white/5 border border-white/10">
                  <h3 className="text-sm font-bold text-white mb-2">{mv.module}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{mv.details}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* Publication Logic */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">Publication Logic</h2>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-3xl mb-4">
              Not all reviewed data is published in the same way. Depending on confidence, sensitivity, and intended use,
              records may be:
            </p>
            <ul className="space-y-2 max-w-3xl mb-6">
              {[
                'Fully published with highest confidence labels',
                'Published with status labels (Under Review, Community Submitted, etc.)',
                'Published in generalized form to protect sensitive details',
                'Delayed pending further review or expert confirmation',
                'Restricted from full public display due to ecological, interpretive, or safety concerns',
              ].map((item) => (
                <li key={item} className="text-sm text-slate-300 flex items-start gap-2">
                  <span className="text-emerald-400 mt-1">→</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
              This is especially important for sensitive species locations, vulnerable habitats, community-submitted
              incident claims, early-stage or unconfirmed reports, and high-risk interpretive signals.
            </p>
          </Card>
        </div>
      </section>

      {/* Revalidation */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <Card className="glass-intense border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <RefreshCw className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white">Revalidation and Updating</h2>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
              Verification is not always a one-time event. Existing records may be reclassified, refined, or updated
              as new field evidence, expert interpretation, institutional data, or geospatial analysis becomes available.
              Kashmir EcoWatch is not a static archive — it is a living environmental intelligence system that evolves
              alongside the evidence it holds.
            </p>
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
              <Link href="/about/data-sources">
                <Badge variant="outline" size="lg" className="cursor-pointer hover:border-white/30 transition-colors px-4 py-2">
                  <Database className="w-4 h-4 mr-2" />
                  Data Sources
                </Badge>
              </Link>
              <Link href="/about/methodology">
                <Badge variant="outline" size="lg" className="cursor-pointer hover:border-white/30 transition-colors px-4 py-2">
                  <FlaskConical className="w-4 h-4 mr-2" />
                  Our Methodology
                </Badge>
              </Link>
              <Link href="/contribute">
                <Badge variant="outline" size="lg" className="cursor-pointer hover:border-white/30 transition-colors px-4 py-2">
                  <Users className="w-4 h-4 mr-2" />
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
