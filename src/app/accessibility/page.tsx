'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Accessibility as A11yIcon, Map, BarChart3, Bell, FileText,
  ClipboardList, Eye, Keyboard, Monitor, Languages, Wrench,
  CheckCircle, AlertTriangle, ArrowRight, Mail, Clock, Globe,
  Headphones, MousePointer, Ear
} from 'lucide-react';
import { motion } from 'framer-motion';

// ─── Platform Accessibility Sections ────────────────────────────────────────

const PLATFORM_ACCESS = [
  {
    icon: Map,
    title: 'Maps & Geospatial Interfaces',
    description: 'Where map-based content is used, we aim to provide alternative access paths so that critical spatial information does not depend on pointer interaction alone. This includes linked lists, district pages, evidence records, summaries, and filters. Map labels, tooltips, and layer controls are designed with readable text and clear structure.',
    status: 'Evolving',
  },
  {
    icon: BarChart3,
    title: 'Dashboards & Data Displays',
    description: 'Charts, metrics, and monitoring summaries should remain understandable without relying solely on color or visual interpretation. We aim to support readable metric cards, text-based summaries, and clear status language so that key information is accessible via screen readers and keyboard navigation.',
    status: 'In Progress',
  },
  {
    icon: Bell,
    title: 'Alerts & Advisories',
    description: 'Alert content uses clear severity labels and readable status wording rather than relying only on color indicators. Important warnings are designed to remain understandable through keyboard and assistive technology use. Advisory status terms are presented in plain text.',
    status: 'Supported',
  },
  {
    icon: FileText,
    title: 'Reports, Evidence, and Downloadable Content',
    description: 'Report lists and evidence pages should remain navigable without requiring a download just to understand what a file contains. We aim to support accessible titles, summaries, and structured metadata where possible so users can evaluate content before downloading.',
    status: 'In Progress',
  },
  {
    icon: ClipboardList,
    title: 'Contribution Workflows',
    description: 'Pathways such as Report an Issue, Submit a Sighting, Contribute Data, and Citizen Science should remain as accessible as possible through clear field labels, understandable validation messages, keyboard navigation, visible focus states, and assistive-technology-friendly form structure.',
    status: 'Supported',
  },
  {
    icon: Globe,
    title: 'Content & Navigation',
    description: 'Consistent navigation structure, clear heading hierarchy, visible focus indicators, scalable text, keyboard-friendly page flow, and skip links where supported. All public content should be reachable without mouse dependency.',
    status: 'Supported',
  },
];

// ─── Accessibility Features ──────────────────────────────────────────────────

const ACCESSIBILITY_FEATURES = [
  {
    icon: Eye,
    title: 'Visual Accessibility',
    features: [
      'High contrast mode compatibility',
      'Scalable text up to 200%',
      'Alternative text where applicable',
      'Clear visible focus indicators',
      'Consistent navigation and content structure',
    ],
  },
  {
    icon: Ear,
    title: 'Auditory Accessibility',
    features: [
      'No auto-playing audio',
      'Visual alternatives to audio alerts',
      'Text-based notification alternatives',
      'Captions for video content where provided',
    ],
  },
  {
    icon: Keyboard,
    title: 'Keyboard Navigation',
    features: [
      'Full keyboard accessibility',
      'Skip to main content links',
      'Logical tab order',
      'No keyboard traps',
      'Keyboard shortcut support (⌘K / Ctrl+K for search)',
    ],
  },
  {
    icon: MousePointer,
    title: 'Motor & Touch Accessibility',
    features: [
      'Large clickable areas',
      'No time-limited interactions',
      'Voice control compatible',
      'Touch-friendly interface for mobile use',
    ],
  },
  {
    icon: Monitor,
    title: 'Technical Compatibility',
    features: [
      'Screen reader support (NVDA, JAWS, VoiceOver, TalkBack)',
      'Browser compatibility (Chrome, Firefox, Safari, Edge)',
      'Responsive design across desktop and mobile',
      'WCAG 2.1 Level AA standards alignment',
    ],
  },
  {
    icon: Headphones,
    title: 'Assistive Technology Support',
    features: [
      'Screen reader tested interfaces',
      'Voice control tool compatibility',
      'Mobile accessibility feature support',
      'Continuing compatibility improvements',
    ],
  },
];

// ─── Commitments ─────────────────────────────────────────────────────────────

const COMMITMENTS = [
  {
    title: 'WCAG 2.1 Alignment',
    description: 'We aim to support accessibility in line with WCAG 2.1 Level AA standards wherever reasonably possible across platform content and interaction flows.',
  },
  {
    title: 'Continuous Improvement',
    description: 'Accessibility is treated as an ongoing process. As the platform evolves, we continue improving maps, dashboards, evidence systems, monitoring workflows, and contribution pathways through testing, review, and user feedback.',
  },
  {
    title: 'Third-Party Content',
    description: 'Some external files, embedded resources, third-party datasets, maps, or linked materials may not fully meet the same accessibility standard as the core platform. We work to improve alternative access where possible.',
  },
  {
    title: 'Inclusive Design Practices',
    description: 'Our development team applies inclusive design principles during feature development, testing interfaces with assistive technologies, and incorporating user feedback into accessibility improvements.',
  },
];

// ─── Page Component ──────────────────────────────────────────────────────────

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* ─── Hero Section ─────────────────────────────────────────────────── */}
      <section className="relative pt-20 md:pt-48 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-purple-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl">
                <A11yIcon className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Accessibility & Inclusive Access</Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Accessibility <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Statement</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-3xl">
              Kashmir EcoWatch is committed to ensuring that environmental intelligence, maps, dashboards, reports, alerts, and contribution workflows remain as accessible and inclusive as possible for people with disabilities and users with different access needs. We are continually improving platform usability, accessibility support, and inclusive design across content, geospatial interfaces, monitoring tools, and public contribution pathways.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Commitment & Conformance ─────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto space-y-12">
            {/* Our Commitment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="info">Standards</Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-6">Our Commitment</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {COMMITMENTS.map((item, i) => (
                  <Card key={i} className="glass-intense border-white/10 p-5">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
                      <div>
                        <h3 className="text-sm font-semibold text-white mb-2">{item.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>

            {/* Conformance Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="info">Conformance</Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-6">Conformance Status</h2>
              <Card className="glass-intense border-amber-500/20 p-6">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-7 h-7 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Partially Conformant — WCAG 2.1 Level AA</h3>
                    <p className="text-slate-300 leading-relaxed">
                      This means that while many areas of the platform are designed with accessibility in mind, some parts of the site — including evolving interfaces, data visualizations, downloadable materials, map-based content, or third-party content — may not yet fully conform to the accessibility standard. We are actively working to reduce these gaps as the platform matures.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Accessibility Across Platform Features ───────────────────────── */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <Badge variant="info">Platform Features</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">
              Accessibility Across the Platform
            </h2>
            <p className="text-slate-400 max-w-2xl">
              How accessibility is approached across Kashmir EcoWatch's key systems and interaction surfaces.
            </p>
          </motion.div>

          <div className="max-w-5xl space-y-4">
            {PLATFORM_ACCESS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 flex-wrap mb-2">
                        <h3 className="text-sm font-bold text-white">{item.title}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                          item.status === 'Supported'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : item.status === 'In Progress'
                            ? 'bg-amber-500/10 text-amber-400'
                            : 'bg-slate-500/10 text-slate-400'
                        }`}>
                          {item.status}
                        </span>
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

      {/* ─── Accessibility Features ───────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <Badge variant="info">Supported Features</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">
              Accessibility Features
            </h2>
            <p className="text-slate-400 max-w-2xl">
              Kashmir EcoWatch aims to support features and compatibility across the following accessibility dimensions.
            </p>
          </motion.div>

          <div className="max-w-5xl space-y-5">
            {ACCESSIBILITY_FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
                      <feature.icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white mb-3">{feature.title}</h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                        {feature.features.map((item) => (
                          <li key={item} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                            <span className="text-sm text-slate-400">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Language, Third-Party, Continuous Improvement ────────────────── */}
      <section className="py-16 md:py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl space-y-8">
            {/* Language & Readability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="info">Language</Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-4">
                Language and Readability
              </h2>
              <Card className="glass-intense border-white/10 p-6">
                <div className="flex items-start gap-4">
                  <Languages className="w-6 h-6 text-slate-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-slate-300 leading-relaxed">
                      Kashmir EcoWatch aims to provide clear and structured language across the platform. Support and communication pathways may include <strong className="text-white">English, Urdu, and Hindi</strong> where available, while multilingual accessibility support may continue to evolve across platform content and user assistance.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Third-Party Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="info">Limitations</Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-4">
                Third-Party Content and Limitations
              </h2>
              <Card className="glass-intense border-amber-500/20 p-6">
                <div className="flex items-start gap-4">
                  <Wrench className="w-6 h-6 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-slate-300 leading-relaxed mb-3">
                      Some external files, embedded resources, third-party datasets, maps, or linked materials may not fully meet the same accessibility standard as the core platform. This may include:
                    </p>
                    <ul className="space-y-1.5">
                      {[
                        'External PDF reports and documents',
                        'Third-party map embeds and data visualizations',
                        'Linked external data sources and portals',
                        'Embedded resources from partner organizations',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                          <span className="text-sm text-slate-400">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-slate-400 text-sm mt-3">
                      Where possible, Kashmir EcoWatch works to improve alternative access and reduce accessibility barriers in such content.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Continuous Improvement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="info">Roadmap</Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-4">
                Continuous Improvement
              </h2>
              <Card className="glass-intense border-white/10 p-6">
                <div className="flex items-start gap-4">
                  <ArrowRight className="w-6 h-6 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-slate-300 leading-relaxed">
                      Accessibility is treated as an ongoing process. As the platform evolves, we continue to improve accessibility across <strong className="text-white">content, maps, dashboards, evidence systems, monitoring workflows, and contribution pathways</strong> through testing with assistive technologies, inclusive design review, and user feedback.
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Feedback & Support ───────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl"
          >
            <Badge variant="info">Support</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-8">
              Feedback & Support
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Report Issues */}
              <Card className="glass-intense border-white/10 p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Mail className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="text-sm font-bold text-white mb-2">Report Accessibility Barriers</h3>
                    <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                      If you encounter an accessibility barrier or need help accessing any part of Kashmir EcoWatch, please contact us. We welcome feedback related to inaccessible content, navigation barriers, form and contribution access issues, map and dashboard usability, assistive technology compatibility, or requests for alternative access support where feasible.
                    </p>
                    <div className="space-y-2 text-sm">
                      <p className="text-white">
                        <span className="font-semibold">Email:</span>{' '}
                        <a href="mailto:accessibility@kashmir-ecowatch.com" className="text-blue-400 hover:underline">
                          accessibility@kashmir-ecowatch.com
                        </a>
                      </p>
                      <p className="text-white">
                        <span className="font-semibold">Response Time:</span> Within 5 business days
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Assistance */}
              <Card className="glass-intense border-white/10 p-6">
                <div className="flex items-start gap-3 mb-4">
                  <Clock className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="text-sm font-bold text-white mb-2">Assistance Available</h3>
                    <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                      Our team can provide assistance with accessing content, navigating the platform, or using specific features. Support is available for:
                    </p>
                    <ul className="space-y-1 text-sm text-slate-400 mb-4">
                      <li>• Content access help</li>
                      <li>• Navigation support</li>
                      <li>• Reporting accessibility barriers</li>
                      <li>• Requesting alternative access formats where feasible</li>
                    </ul>
                    <div className="space-y-2 text-sm">
                      <p className="text-white">
                        <span className="font-semibold">Support Hours:</span> Monday – Friday, 9 AM – 5 PM IST
                      </p>
                      <p className="text-white">
                        <span className="font-semibold">Languages:</span> English, Urdu, Hindi
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Technical Specs */}
            <Card className="glass-intense border-white/10 p-6">
              <h3 className="text-sm font-bold text-white mb-4">Technical Specifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wide mb-2">Browser Compatibility</h4>
                  <ul className="space-y-1 text-sm text-slate-400">
                    <li>• Chrome (latest 2 versions)</li>
                    <li>• Firefox (latest 2 versions)</li>
                    <li>• Safari (latest 2 versions)</li>
                    <li>• Edge (latest 2 versions)</li>
                    <li>• Mobile browsers (iOS Safari, Chrome Mobile)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wide mb-2">Assistive Technologies</h4>
                  <ul className="space-y-1 text-sm text-slate-400">
                    <li>• NVDA (Windows)</li>
                    <li>• JAWS (Windows)</li>
                    <li>• VoiceOver (macOS, iOS)</li>
                    <li>• TalkBack (Android)</li>
                    <li>• Dragon NaturallySpeaking</li>
                  </ul>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────────────────────────── */}
      <AdvancedFooter />
    </main>
  );
}
