'use client';

import React, { useState } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Scale, FileText, Shield, AlertCircle, CheckCircle, ChevronDown, ChevronUp,
  Leaf, Database, Eye, Map, AlertTriangle, Users, Clock, Building2,
  Siren, Binoculars, Globe, Lock
} from 'lucide-react';
import { motion } from 'framer-motion';

// ─── Sections Data ──────────────────────────────────────────────────────────

const TERMS_SECTIONS = [
  {
    id: 'platform-purpose',
    icon: Globe,
    title: '1. Platform Purpose',
    color: 'from-emerald-500 to-teal-600',
    iconColor: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    content: (
      <>
        <p className="text-slate-300 leading-relaxed">
          Kashmir EcoWatch is an environmental intelligence, evidence, and public-interest knowledge platform designed to support environmental understanding, ecological visibility, district-level awareness, monitoring interpretation, evidence access, and responsible public contribution across Kashmir.
        </p>
        <p className="text-slate-300 leading-relaxed mt-3">
          The platform may include biodiversity information, water-system intelligence, environmental monitoring, alerts, risk interpretation, library materials, district profiles, geospatial tools, contribution pathways, and related systems. Use of the platform is subject to these terms.
        </p>
      </>
    ),
  },
  {
    id: 'who-these-apply-to',
    icon: Users,
    title: '2. Who These Terms Apply To',
    color: 'from-blue-500 to-cyan-600',
    iconColor: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    content: (
      <>
        <p className="text-slate-300 leading-relaxed">
          These terms apply to all platform users, including but not limited to:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            'Visitors and readers accessing public content',
            'Contributors submitting issue reports, biodiversity sightings, or data',
            'Citizen-science participants and community observers',
            'Institutional users, partner organizations, and affiliated researchers',
            'Any party interacting with Kashmir EcoWatch workflows or systems',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <span className="text-sm text-slate-300">{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: 'permitted-use',
    icon: Shield,
    title: '3. Permitted Use',
    color: 'from-violet-500 to-purple-600',
    iconColor: 'text-violet-400',
    bgColor: 'bg-violet-500/10',
    content: (
      <>
        <p className="text-slate-300 leading-relaxed">
          You may use Kashmir EcoWatch for lawful and responsible purposes, including:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            'Environmental learning and public information',
            'Institutional and academic reference',
            'Environmental awareness and responsible engagement',
            'Contribution through designated platform workflows',
            'Non-commercial research and public-interest use',
            'Responsible engagement with district, monitoring, evidence, and biodiversity systems',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <span className="text-sm text-slate-300">{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-slate-300 leading-relaxed mt-3">
          Use of the platform must remain consistent with these terms and with applicable law.
        </p>
      </>
    ),
  },
  {
    id: 'contributions',
    icon: Database,
    title: '4. Contributions and Submissions',
    color: 'from-amber-500 to-orange-600',
    iconColor: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    content: (
      <>
        <p className="text-slate-300 leading-relaxed">
          Kashmir EcoWatch may receive issue reports, biodiversity sightings, structured data contributions, field-linked evidence, citizen-science inputs, and related materials through designated workflows.
        </p>
        <p className="text-slate-300 leading-relaxed mt-3">
          By submitting content, you represent that you have the right to submit it and that, to the best of your knowledge, it is not knowingly false, misleading, or unlawfully shared.
        </p>
        <p className="text-slate-300 leading-relaxed mt-3">
          By submitting content, you grant Kashmir EcoWatch a non-exclusive, royalty-free right to store, review, classify, analyze, format, adapt for platform use, publish, summarize, display, and otherwise use such material for environmental intelligence, public-interest knowledge, platform operations, and related non-exclusive purposes.
        </p>
        <p className="text-slate-300 leading-relaxed mt-3 font-medium text-amber-300">
          Submission does not guarantee publication, verification, or public display.
        </p>
      </>
    ),
  },
  {
    id: 'review-verification',
    icon: Eye,
    title: '5. Review, Verification, and Publication Status',
    color: 'from-indigo-500 to-blue-600',
    iconColor: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    content: (
      <>
        <p className="text-slate-300 leading-relaxed">
          Not all records enter the platform in the same way, and not all records are published at the same level of certainty. Records may be classified or surfaced as:
        </p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { label: 'Institutionally Sourced', desc: 'From departments, labs, or verified bodies' },
            { label: 'Expert Reviewed', desc: 'Assessed by affiliated professionals' },
            { label: 'Platform Reviewed', desc: 'Reviewed by internal editorial or research teams' },
            { label: 'Community Submitted', desc: 'From public contributors and citizen scientists' },
            { label: 'Under Review', desc: 'Awaiting classification or verification' },
            { label: 'Verified', desc: 'Confirmed through platform review processes' },
            { label: 'Historical / Reference', desc: 'Archival or background material' },
            { label: 'Restricted / Sensitive', desc: 'Limited public display for protection reasons' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-white/5">
              <FileText className="w-3.5 h-3.5 text-indigo-400 mt-0.5 shrink-0" />
              <div>
                <p className="text-xs font-medium text-white">{item.label}</p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-slate-400 text-sm leading-relaxed mt-4">
          Classification depends on source type, evidence quality, thematic relevance, and public-use sensitivity.
        </p>
      </>
    ),
  },
  {
    id: 'environmental-alert',
    icon: AlertTriangle,
    title: '6. Environmental, Alert, and Safety Notice',
    color: 'from-red-500 to-rose-600',
    iconColor: 'text-red-400',
    bgColor: 'bg-red-500/10',
    content: (
      <>
        <p className="text-slate-300 leading-relaxed">
          Environmental information, alerts, advisories, monitoring outputs, risk updates, and map-based intelligence on Kashmir EcoWatch are provided for public-interest information, awareness, and contextual understanding unless explicitly stated otherwise.
        </p>
        <p className="text-slate-300 leading-relaxed mt-3">
          They should <strong className="text-white">not</strong> be relied upon as the sole basis for:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            'Emergency response or official action',
            'Travel decisions or evacuation decisions',
            'Legal reliance or infrastructure action',
            'Safety-critical decision-making',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <span className="text-sm text-slate-300">{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-slate-300 leading-relaxed mt-3">
          Users should consult relevant official authorities and primary institutions for authoritative and time-critical guidance. Environmental intelligence on the platform may be incomplete, evolving, or under review.
        </p>
      </>
    ),
  },
  {
    id: 'geospatial',
    icon: Map,
    title: '7. Geospatial, GIS, and Remote-Sensing Use',
    color: 'from-sky-500 to-blue-600',
    iconColor: 'text-sky-400',
    bgColor: 'bg-sky-500/10',
    content: (
      <>
        <p className="text-slate-300 leading-relaxed">
          Maps, geospatial layers, spatial analysis outputs, and remote-sensing-supported interpretations on Kashmir EcoWatch may be generalized, provisional, contextual, or updated over time.
        </p>
        <p className="text-slate-300 leading-relaxed mt-3">
          Such materials may support environmental understanding and spatial interpretation, but are <strong className="text-white">not guaranteed</strong> as:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            'Cadastral or legal maps',
            'Engineering or official operational maps',
            'Stand-alone ground truth without field confirmation',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
              <span className="text-sm text-slate-300">{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-slate-300 leading-relaxed mt-3">
          Earth observation and GIS layers may support interpretation but may require field or institutional confirmation depending on intended use.
        </p>
      </>
    ),
  },
  {
    id: 'sensitive-ecological',
    icon: Lock,
    title: '8. Sensitive Ecological and Environmental Information',
    color: 'from-slate-400 to-slate-600',
    iconColor: 'text-slate-400',
    bgColor: 'bg-slate-500/10',
    content: (
      <>
        <p className="text-slate-300 leading-relaxed">
          Some biodiversity, habitat, environmental incident, and field-based records may be generalized, delayed, masked, or partially restricted in public view.
        </p>
        <p className="text-slate-300 leading-relaxed mt-3">
          Kashmir EcoWatch may limit display of:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            'Sensitive species locations (rare, threatened, or vulnerable taxa)',
            'Vulnerable ecological zones where publication could increase risk',
            'Environmental incident evidence requiring controlled access',
            'Other environmentally sensitive records where display could cause harm or reduce responsible stewardship',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <Lock className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
              <span className="text-sm text-slate-300">{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: 'prohibited-uses',
    icon: AlertCircle,
    title: '9. Prohibited Uses',
    color: 'from-red-500 to-rose-600',
    iconColor: 'text-red-400',
    bgColor: 'bg-red-500/10',
    content: (
      <>
        <p className="text-slate-300 leading-relaxed mb-3">You may not:</p>
        <ul className="space-y-2">
          {[
            'Submit knowingly false, fabricated, or misleading information',
            'Attempt unauthorized access to systems or workflows',
            'Interfere with platform functionality or integrity',
            'Use the platform in violation of applicable laws',
            'Use the platform for unauthorized commercial exploitation',
            'Scrape, extract, or redistribute sensitive ecological or restricted data in unauthorized ways',
            'Attempt to identify masked or generalized sensitive locations',
            'Use the platform to support ecological harm, wildlife exploitation, panic generation, or malicious misuse of environmental information',
            'Redistribute sensitive platform data in ways contrary to publication restrictions',
            'Upload fabricated environmental evidence or manipulate platform records',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <span className="text-sm text-slate-300">{item}</span>
            </li>
          ))}
        </ul>
      </>
    ),
  },
  {
    id: 'intellectual-property',
    icon: Shield,
    title: '10. Intellectual Property and Content Use',
    color: 'from-violet-500 to-purple-600',
    iconColor: 'text-violet-400',
    bgColor: 'bg-violet-500/10',
    content: (
      <>
        <p className="text-slate-300 leading-relaxed">
          Platform content, design, structure, logos, and associated materials are owned by or licensed to Kashmir EcoWatch and its relevant rights holders. Contributors retain ownership of submitted content where applicable, while granting the platform the license described in Section 4.
        </p>
        <p className="text-slate-300 leading-relaxed mt-3">
          <strong className="text-white">Permitted:</strong> Personal, educational, academic, and public-interest reference use may be allowed where consistent with applicable rights and attribution expectations.
        </p>
        <p className="text-slate-300 leading-relaxed mt-3">
          <strong className="text-white">Not Permitted:</strong> Commercial reuse, bulk extraction, redistribution of restricted content, or unauthorized republishing is not permitted without authorization.
        </p>
      </>
    ),
  },
  {
    id: 'accuracy-availability',
    icon: Clock,
    title: '11. Accuracy, Availability, and Evolving Information',
    color: 'from-amber-500 to-orange-600',
    iconColor: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    content: (
      <>
        <p className="text-slate-300 leading-relaxed">
          Environmental records, reports, datasets, maps, evidence layers, and monitoring outputs may change, be revised, or be reclassified as new information becomes available.
        </p>
        <p className="text-slate-300 leading-relaxed mt-3">
          Kashmir EcoWatch does not guarantee uninterrupted availability, complete accuracy, or universal suitability for all user purposes. Environmental data may be subject to revision, update, or removal as review processes advance or as field conditions change.
        </p>
        <p className="text-slate-300 leading-relaxed mt-3 text-sm">
          THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE.
        </p>
      </>
    ),
  },
  {
    id: 'access-control',
    icon: Building2,
    title: '12. Access Control, Suspension, and Removal',
    color: 'from-blue-500 to-cyan-600',
    iconColor: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    content: (
      <>
        <p className="text-slate-300 leading-relaxed">
          Access to some workflows or data may be restricted. Kashmir EcoWatch may suspend, limit, review, remove, or refuse access, submissions, or platform content where necessary to protect:
        </p>
        <ul className="mt-3 space-y-2">
          {[
            'Platform integrity and operational security',
            'User safety and environmental sensitivity',
            'Legal compliance and jurisdictional requirements',
            'Responsible publication and review standards',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <Building2 className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
              <span className="text-sm text-slate-300">{item}</span>
            </li>
          ))}
        </ul>
        <p className="text-slate-300 leading-relaxed mt-3">
          Some content may remain internal or review-only at the platform's discretion.
        </p>
      </>
    ),
  },
  {
    id: 'changes-to-terms',
    icon: FileText,
    title: '13. Changes to These Terms',
    color: 'from-slate-400 to-slate-600',
    iconColor: 'text-slate-400',
    bgColor: 'bg-slate-500/10',
    content: (
      <>
        <p className="text-slate-300 leading-relaxed">
          These terms may be updated from time to time. Continued use of the platform after updates constitutes acceptance of the revised terms. We will notify users of material changes when appropriate through platform notices or updated publication dates.
        </p>
      </>
    ),
  },
  {
    id: 'governing-framework',
    icon: Scale,
    title: '14. Governing Framework',
    color: 'from-indigo-500 to-blue-600',
    iconColor: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    content: (
      <>
        <p className="text-slate-300 leading-relaxed">
          These terms are governed by applicable law and interpreted in relation to the platform's public-interest environmental purpose, applicable legal requirements, and relevant jurisdictional processes.
        </p>
        <p className="text-slate-300 leading-relaxed mt-3">
          KASHMIR ECOWATCH SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE PLATFORM. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU, IF ANY, TO ACCESS THE PLATFORM.
        </p>
      </>
    ),
  },
];

// ─── Contribution-Specific Terms ─────────────────────────────────────────────

const CONTRIBUTION_TYPES = [
  {
    icon: Siren,
    title: 'Issue Reports',
    color: 'from-red-500 to-rose-600',
    description: 'Field incident reports and environmental concern submissions may be reviewed, classified, summarized, or withheld from public display. Submission does not guarantee immediate response or verification.',
  },
  {
    icon: Binoculars,
    title: 'Biodiversity Sightings',
    color: 'from-green-500 to-emerald-600',
    description: 'Species observations may be verified, generalized, delayed, or restricted for sensitivity reasons. Location precision may be reduced for vulnerable taxa.',
  },
  {
    icon: Database,
    title: 'Data Contributions',
    color: 'from-amber-500 to-orange-600',
    description: 'Structured datasets and technical submissions may be reviewed for format, quality, and relevance. The platform may store, analyze, and incorporate such data into intelligence layers.',
  },
  {
    icon: Leaf,
    title: 'Citizen Science Participation',
    color: 'from-violet-500 to-purple-600',
    description: 'Community science inputs, public observations, and participatory records are valued contributions but remain subject to review, classification, and publication standards.',
  },
];

// ─── Page Component ──────────────────────────────────────────────────────────

export default function TermsPage() {
  const [openSection, setOpenSection] = useState<string | null>('platform-purpose');
  const [expandedContribution, setExpandedContribution] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-slate-950">
      {/* ─── Hero Section ─────────────────────────────────────────────────── */}
      <section className="relative pt-20 md:pt-48 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-slate-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-slate-600 flex items-center justify-center shadow-2xl">
                <Scale className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Legal & Platform Use</Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-slate-400">Use</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-3xl">
              These terms govern access to and use of Kashmir EcoWatch as an environmental intelligence, evidence, monitoring, and public-interest knowledge platform. By accessing, using, browsing, contributing to, or interacting with the platform, you agree to these terms.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Important Notice ─────────────────────────────────────────────── */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-4xl"
          >
            <Card className="glass-intense border-amber-500/20 p-6">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-6 h-6 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Please Read Carefully</h3>
                  <p className="text-slate-400 leading-relaxed">
                    These terms define what you may and may not rely on, how your contributions are treated, and what kinds of use are permitted or prohibited. They are specific to Kashmir EcoWatch's role as an environmental intelligence platform and should be read in full before using or contributing to the platform.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ─── Contribution-Specific Terms ──────────────────────────────────── */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <Badge variant="info">Contribution Types</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">
              How We Treat Your Contributions
            </h2>
            <p className="text-slate-400 max-w-2xl">
              Different types of submissions are handled under different review and publication standards.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl">
            {CONTRIBUTION_TYPES.map((ct, i) => (
              <motion.div
                key={ct.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  className="glass-intense border-white/10 p-5 cursor-pointer"
                  onClick={() => setExpandedContribution(expandedContribution === i ? null : i)}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${ct.color} flex items-center justify-center shrink-0`}>
                      <ct.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-white mb-1">{ct.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{ct.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Main Terms Sections (Accordion) ──────────────────────────────── */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <Badge variant="info">Full Terms</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">
              Complete Terms of Use
            </h2>
            <p className="text-slate-400 max-w-2xl">
              Each section below covers a specific aspect of your relationship with the platform.
            </p>
          </motion.div>

          <div className="max-w-4xl space-y-3">
            {TERMS_SECTIONS.map((section, i) => (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
              >
                <Card className="glass-intense border-white/10 p-0 overflow-hidden">
                  <button
                    className="w-full p-5 sm:p-6 flex items-start justify-between gap-4 text-left"
                    onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                  >
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      <div className={`w-9 h-9 rounded-lg ${section.bgColor} flex items-center justify-center shrink-0`}>
                        <section.icon className={`w-5 h-5 ${section.iconColor}`} />
                      </div>
                      <h3 className="text-sm font-semibold text-white leading-snug pt-1">{section.title}</h3>
                    </div>
                    <span className="text-slate-400 shrink-0 mt-1">
                      {openSection === section.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>
                  {openSection === section.id && (
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-white/10 pt-4">
                      {section.content}
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact & Last Updated ───────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl space-y-6">
            {/* Contact for Legal Questions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="glass-intense border-indigo-500/20 p-6">
                <div className="flex items-start gap-4">
                  <Scale className="w-6 h-6 text-indigo-400 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Contact for Legal & Platform Questions</h3>
                    <p className="text-slate-400 mb-3">
                      For questions about these terms, platform governance, or legal inquiries:
                    </p>
                    <a
                      href="mailto:legal@kashmir-ecowatch.com"
                      className="text-sm text-indigo-400 font-mono hover:underline break-all"
                    >
                      legal@kashmir-ecowatch.com
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Last Updated */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass-intense border-white/10 p-6">
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-8 h-8 text-emerald-400 shrink-0" />
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1">Last Updated</h3>
                    <p className="text-sm text-slate-400">
                      These terms were last updated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────────────────────────── */}
      <AdvancedFooter />
    </main>
  );
}
