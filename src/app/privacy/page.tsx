'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Shield, Lock, Eye, Database, UserCheck, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const privacyPrinciples = [
  { icon: Lock, title: 'Data Protection', description: 'Personal information is encrypted and stored securely with access controls and authentication requirements.' },
  { icon: Eye, title: 'Transparency', description: 'Clear communication about what data is collected, how it is used, and who has access to it.' },
  { icon: Shield, title: 'Minimal Collection', description: 'Only essential data is collected, with clear purpose, user consent, and specific retention periods.' },
  { icon: Database, title: 'Limited Retention', description: 'Data is retained only as long as necessary for stated purposes, then securely deleted or anonymized.' },
  { icon: UserCheck, title: 'User Rights', description: 'Users can access, correct, download, or delete their personal data upon request.' },
  { icon: FileText, title: 'Accountability', description: 'Regular audits, impact assessments, and compliance reviews ensure ongoing privacy protection.' },
];

const dataCollection = [
  { category: 'Personal Information', items: ['Name', 'Email', 'Organization', 'Location (optional)'], purpose: 'User registration and communication' },
  { category: 'Usage Data', items: ['Page views', 'Search queries', 'Feature usage'], purpose: 'Platform improvement and analytics' },
  { category: 'Contributed Data', items: ['Species sightings', 'Environmental reports', 'Field observations'], purpose: 'Scientific research and public knowledge' },
  { category: 'Technical Data', items: ['IP address', 'Browser type', 'Device information'], purpose: 'Security and performance monitoring' },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-950"><section className="relative pt-20 md:pt-48 pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-teal-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <Badge variant="success" size="lg">Data Protection</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Policy</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Your privacy is fundamental to our mission. We are committed to protecting
              your personal information and being transparent about our data practices.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto space-y-16">
            {/* Privacy Principles */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Our Privacy Principles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {privacyPrinciples.map((principle, index) => (
                  <Card key={index} className="glass-light border-white/10 p-6 hover:border-emerald-500/30 transition-colors">
                    <principle.icon className="w-10 h-10 text-emerald-400 mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">{principle.title}</h3>
                    <p className="text-sm text-slate-400">{principle.description}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Data Collection */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Data We Collect</h2>
              <div className="space-y-4">
                {dataCollection.map((item, index) => (
                  <Card key={index} className="glass-light border-white/10 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white">{item.category}</h3>
                      <Badge variant="info">Purpose: {item.purpose}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {item.items.map((dataPoint) => (
                        <Badge key={dataPoint} variant="default">{dataPoint}</Badge>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Your Rights */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Your Rights</h2>
              <Card className="glass-light border-white/10 p-8">
                <ul className="space-y-4">
                  {[
                    { right: 'Access', description: 'Request a copy of your personal data' },
                    { right: 'Correction', description: 'Update or correct inaccurate information' },
                    { right: 'Deletion', description: 'Request deletion of your data (right to be forgotten)' },
                    { right: 'Portability', description: 'Download your data in a machine-readable format' },
                    { right: 'Opt-out', description: 'Withdraw consent for data processing' },
                    { right: 'Restriction', description: 'Limit how we process your data' },
                  ].map((item) => (
                    <li key={item.right} className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5">
                        <Shield className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white">{item.right}</h4>
                        <p className="text-sm text-slate-400">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>

            {/* Contact */}
            <div>
              <h2 className="text-3xl font-bold text-white mb-8">Contact Us</h2>
              <Card className="glass-light border-white/10 p-8">
                <p className="text-slate-400 mb-4">
                  For privacy-related questions, concerns, or requests, please contact our Data Protection Officer:
                </p>
                <div className="space-y-2">
                  <p className="text-white">
                    <span className="font-semibold">Email:</span> privacy@kashmir-environment.org
                  </p>
                  <p className="text-white">
                    <span className="font-semibold">Address:</span> Data Protection Officer, Kashmir EcoWatch, Srinagar, J&K
                  </p>
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
