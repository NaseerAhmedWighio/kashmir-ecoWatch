'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Scale, FileText, Shield, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const sections = [
  {
    title: '1. Acceptance of Terms',
    content: 'By accessing and using Kashmir EcoWatch, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this platform.',
  },
  {
    title: '2. Purpose and Use',
    content: 'Kashmir EcoWatch is an environmental intelligence platform designed for scientific research, public education, and environmental monitoring. Users agree to use the platform only for lawful purposes and in accordance with these terms.',
  },
  {
    title: '3. Data and Content',
    content: 'Environmental data is sourced from government agencies, research institutions, and verified community contributions. While we strive for accuracy, we do not guarantee the completeness or reliability of data. Users should verify critical information through official channels.',
  },
  {
    title: '4. User Contributions',
    content: 'By submitting data, observations, or reports, you grant Kashmir EcoWatch a non-exclusive, royalty-free license to use, reproduce, and display such content for platform purposes. You represent that you have the right to submit such content.',
  },
  {
    title: '5. Prohibited Uses',
    content: 'Users may not: (a) use the platform for commercial purposes without authorization; (b) attempt to gain unauthorized access to systems; (c) interfere with platform functionality; (d) submit false or misleading information; (e) use data in ways that violate applicable laws.',
  },
  {
    title: '6. Intellectual Property',
    content: 'All content, trademarks, logos, and intellectual property on Kashmir EcoWatch are owned by or licensed to the platform. Users may not use, reproduce, or distribute content without explicit permission, except for personal, non-commercial use.',
  },
  {
    title: '7. Disclaimer of Warranties',
    content: 'THE PLATFORM IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE. ENVIRONMENTAL DATA MAY CHANGE AND SHOULD BE VERIFIED FOR CRITICAL APPLICATIONS.',
  },
  {
    title: '8. Limitation of Liability',
    content: 'KASHMIR ECOWATCH SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE PLATFORM. OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT PAID BY YOU, IF ANY, TO ACCESS THE PLATFORM.',
  },
  {
    title: '9. Environmental Data Notice',
    content: 'Environmental data displayed may be subject to revision as new information becomes available. Data should not be used as the sole basis for critical decisions regarding safety, property, or resource management. Consult official sources for authoritative information.',
  },
  {
    title: '10. Modifications to Terms',
    content: 'We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of new terms. We will notify users of material changes when appropriate.',
  },
  {
    title: '11. Termination',
    content: 'We may terminate or suspend access to the platform immediately, without prior notice, for conduct that we believe violates these terms or is harmful to other users, us, or third parties.',
  },
  {
    title: '12. Governing Law',
    content: 'These terms shall be governed by and construed in accordance with applicable laws. Any disputes shall be resolved in the appropriate courts of jurisdiction.',
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      <section className="relative pt-20 md:pt-28 pb-16 md:pb-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/50 via-slate-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-slate-600 flex items-center justify-center shadow-2xl">
                <Scale className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Legal Framework</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-slate-400">Service</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              These terms govern your use of Kashmir EcoWatch and establish the legal
              framework for accessing our environmental intelligence platform.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="glass-light border-white/10 p-8 mb-8">
              <div className="flex items-start gap-4 mb-8">
                <AlertCircle className="w-6 h-6 text-amber-400 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Important Notice</h3>
                  <p className="text-slate-400">
                    Please read these terms carefully before using Kashmir EcoWatch.
                    By using this platform, you agree to be bound by these terms.
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-8">
              {sections.map((section, index) => (
                <Card key={index} className="glass-light border-white/10 p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center mt-0.5">
                      <FileText className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white mb-3">{section.title}</h2>
                      <p className="text-slate-400 leading-relaxed">{section.content}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Acceptance */}
            <Card className="glass-light border-emerald-500/30 p-8 mt-8">
              <div className="flex items-center gap-4">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">Last Updated</h3>
                  <p className="text-slate-400">
                    These terms were last updated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}.
                    For questions about these terms, contact us at legal@kashmir-environment.org
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
