'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Accessibility, Eye, Ear, Keyboard, MousePointer, Monitor, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const accessibilityFeatures = [
  {
    icon: Eye,
    title: 'Visual Accessibility',
    features: [
      'High contrast mode support',
      'Scalable text up to 200%',
      'Alternative text for all images',
      'Clear focus indicators',
      'Consistent navigation structure',
    ],
  },
  {
    icon: Ear,
    title: 'Auditory Accessibility',
    features: [
      'Transcripts for audio content',
      'Visual alternatives to audio alerts',
      'Captions for video content',
      'No auto-playing audio',
    ],
  },
  {
    icon: Keyboard,
    title: 'Keyboard Navigation',
    features: [
      'Full keyboard accessibility',
      'Skip to main content links',
      'Logical tab order',
      'Keyboard shortcuts (⌘K for search)',
      'No keyboard traps',
    ],
  },
  {
    icon: MousePointer,
    title: 'Motor Accessibility',
    features: [
      'Large clickable areas',
      'No time-limited interactions',
      'Voice control compatible',
      'Touch-friendly interface',
    ],
  },
  {
    icon: Monitor,
    title: 'Technical Compatibility',
    features: [
      'Screen reader support (NVDA, JAWS, VoiceOver)',
      'Browser compatibility (Chrome, Firefox, Safari, Edge)',
      'Responsive design for all devices',
      'WCAG 2.1 Level AA compliance',
    ],
  },
];

const commitments = [
  {
    title: 'WCAG 2.1 Compliance',
    description: 'We strive to meet Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards in all our features and content.',
  },
  {
    title: 'Continuous Improvement',
    description: 'We regularly test our platform with assistive technologies and incorporate user feedback to improve accessibility.',
  },
  {
    title: 'Third-Party Content',
    description: 'We work with data providers to ensure third-party content meets accessibility standards where possible.',
  },
  {
    title: 'Training and Awareness',
    description: 'Our development team receives accessibility training to ensure inclusive design practices.',
  },
];

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-slate-950"><section className="relative pt-20 md:pt-48 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/50 via-purple-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl">
                <Accessibility className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Inclusive Design</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Accessibility <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Statement</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Kashmir EcoWatch is committed to ensuring digital accessibility for people
              with disabilities. We are continually improving the user experience for
              everyone and applying the relevant accessibility standards.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto space-y-16">
            {/* Commitment */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Our Commitment</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {commitments.map((item, index) => (
                  <Card key={index} className="glass-light border-white/10 p-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                        <p className="text-sm text-slate-400">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Accessibility Features */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Accessibility Features</h2>
              <div className="space-y-6">
                {accessibilityFeatures.map((feature, index) => (
                  <Card key={index} className="glass-light border-white/10 p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-blue-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-3">{feature.title}</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {feature.features.map((item) => (
                            <li key={item} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                              <span className="text-sm text-slate-400">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Conformance Status */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Conformance Status</h2>
              <Card className="glass-light border-white/10 p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">WCAG 2.1 Level AA</h3>
                    <p className="text-slate-400">
                      Kashmir EcoWatch is partially conformant with WCAG 2.1 Level AA.
                      Partially conformant means that some parts of the content do not
                      fully conform to the accessibility standard.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Feedback */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Feedback & Support</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-light border-white/10 p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Report Accessibility Issues</h3>
                  <p className="text-slate-400 mb-4">
                    If you encounter accessibility barriers, please let us know. We take
                    all feedback seriously and will investigate your concerns.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="text-white">
                      <span className="font-semibold">Email:</span> accessibility@kashmir-environment.org
                    </p>
                    <p className="text-white">
                      <span className="font-semibold">Response Time:</span> Within 5 business days
                    </p>
                  </div>
                </Card>
                <Card className="glass-light border-white/10 p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Assistance Available</h3>
                  <p className="text-slate-400 mb-4">
                    Our team can provide assistance with accessing content, navigating
                    the platform, or using specific features.
                  </p>
                  <div className="space-y-2 text-sm">
                    <p className="text-white">
                      <span className="font-semibold">Support Hours:</span> Monday - Friday, 9 AM - 5 PM IST
                    </p>
                    <p className="text-white">
                      <span className="font-semibold">Languages:</span> English, Urdu, Hindi
                    </p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Technical Specs */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Technical Specifications</h2>
              <Card className="glass-light border-white/10 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-white mb-3">Compatibility</h3>
                    <ul className="space-y-2 text-sm text-slate-400">
                      <li>• Chrome (latest 2 versions)</li>
                      <li>• Firefox (latest 2 versions)</li>
                      <li>• Safari (latest 2 versions)</li>
                      <li>• Edge (latest 2 versions)</li>
                      <li>• Mobile browsers (iOS Safari, Chrome Mobile)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-3">Assistive Technologies</h3>
                    <ul className="space-y-2 text-sm text-slate-400">
                      <li>• NVDA (Windows)</li>
                      <li>• JAWS (Windows)</li>
                      <li>• VoiceOver (macOS, iOS)</li>
                      <li>• TalkBack (Android)</li>
                      <li>• Dragon NaturallySpeaking</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
