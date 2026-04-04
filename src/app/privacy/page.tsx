'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Shield, Lock, Eye, Database, UserCheck, FileText, Mail, MapPin,
  AlertTriangle, Leaf, Globe, Activity, Users, Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const privacyPrinciples = [
  {
    icon: Lock,
    title: 'Data Protection',
    description: 'Personal information is protected through appropriate security, access control, and handling safeguards.',
    color: 'from-blue-500/20 to-indigo-500/20',
    textColor: 'text-blue-400',
  },
  {
    icon: Eye,
    title: 'Transparency',
    description: 'We aim to communicate clearly about what data is collected, how it is used, and how it may be reviewed, published, generalized, or restricted.',
    color: 'from-emerald-500/20 to-teal-500/20',
    textColor: 'text-emerald-400',
  },
  {
    icon: Shield,
    title: 'Minimal Collection',
    description: 'We seek to collect only data that is relevant to platform operation, contribution workflows, communication, review, or environmental intelligence.',
    color: 'from-purple-500/20 to-pink-500/20',
    textColor: 'text-purple-400',
  },
  {
    icon: FileText,
    title: 'Responsible Publication',
    description: 'Not all submitted or collected information is published in the same way. Public display may differ from internal review, especially for sensitive, location-linked, or unverified material.',
    color: 'from-amber-500/20 to-orange-500/20',
    textColor: 'text-amber-400',
  },
  {
    icon: Leaf,
    title: 'Sensitive Ecological Handling',
    description: 'Species locations, vulnerable habitats, geotagged evidence, and environmentally sensitive records may be generalized, delayed, masked, or partially restricted to reduce ecological risk and misuse.',
    color: 'from-green-500/20 to-emerald-500/20',
    textColor: 'text-green-400',
  },
  {
    icon: UserCheck,
    title: 'User Rights',
    description: 'Users may request access to, correction of, or deletion of personal data, subject to applicable operational, scientific, archival, or legal considerations.',
    color: 'from-cyan-500/20 to-blue-500/20',
    textColor: 'text-cyan-400',
  },
  {
    icon: Database,
    title: 'Accountability',
    description: 'Privacy protection is supported through internal controls, review processes, and responsible platform handling.',
    color: 'from-indigo-500/20 to-violet-500/20',
    textColor: 'text-indigo-400',
  },
];

const contributionPathways = [
  {
    title: 'Report an Issue',
    description: 'Reports may include location, severity, media, and optional contact details. Anonymous reporting may be supported where available. Public display may differ from internal review handling.',
    icon: AlertTriangle,
    color: 'from-red-500/20 to-orange-500/20',
    textColor: 'text-red-400',
  },
  {
    title: 'Submit a Sighting',
    description: 'Species observations may include location and image evidence. Sensitive biodiversity records may be generalized or withheld from exact public display.',
    icon: Leaf,
    color: 'from-emerald-500/20 to-teal-500/20',
    textColor: 'text-emerald-400',
  },
  {
    title: 'Contribute Data',
    description: 'Structured data submissions may include metadata, files, affiliations, and supporting evidence. Some submissions may remain under review, internal handling, or partial publication.',
    icon: Database,
    color: 'from-blue-500/20 to-indigo-500/20',
    textColor: 'text-blue-400',
  },
  {
    title: 'Citizen Science',
    description: 'Participation-related information may be used to support program workflows, verification logic, and contribution tracking where such systems are available.',
    icon: Users,
    color: 'from-purple-500/20 to-pink-500/20',
    textColor: 'text-purple-400',
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      {/* 1. Hero */}
      <section className="relative pt-20 md:pt-48 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-teal-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <Badge variant="success" size="lg">Privacy & Data Handling</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Policy</span>
            </h1>

            <p className="text-xl text-slate-400 leading-relaxed max-w-4xl">
              Kashmir EcoWatch is committed to protecting personal information, handling contributor data responsibly, and managing environmental evidence with care. Because the platform includes public contribution pathways, geospatial workflows, environmental reporting, biodiversity observations, and evidence-based publication systems, privacy on Kashmir EcoWatch includes both personal-data protection and responsible handling of sensitive environmental information.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Privacy Principles */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Privacy Principles</h2>
            <p className="text-lg text-slate-400 max-w-3xl">
              These principles guide how we collect, handle, review, and publish information across the platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {privacyPrinciples.map((principle, i) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-6 h-full">
                  <div className={cn(
                    "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4",
                    principle.color
                  )}>
                    <principle.icon className={cn("w-6 h-6", principle.textColor)} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{principle.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{principle.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Data We Collect */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Data We Collect</h2>
            <p className="text-lg text-slate-400 max-w-3xl">
              Different categories of information may be collected depending on how you interact with the platform.
            </p>
          </motion.div>

          <div className="space-y-4 max-w-4xl">
            {/* Personal Information */}
            <Card className="glass-intense border-white/10 p-6">
              <div className="flex items-start gap-4">
                <UserCheck className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">Personal Information</h3>
                  <p className="text-sm text-slate-400 mb-3">Name, email, organization, optional location, and other contact details provided through communication or contribution workflows.</p>
                </div>
              </div>
            </Card>

            {/* Contribution and Submission Data */}
            <Card className="glass-intense border-white/10 p-6">
              <div className="flex items-start gap-4">
                <FileText className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">Contribution and Submission Data</h3>
                  <p className="text-sm text-slate-400 mb-3">Issue reports, species sightings, field observations, structured data contributions, uploaded documents, photos, geotagged evidence, and citizen-science participation records.</p>
                </div>
              </div>
            </Card>

            {/* Usage Data */}
            <Card className="glass-intense border-white/10 p-6">
              <div className="flex items-start gap-4">
                <Activity className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">Usage and Platform Interaction Data</h3>
                  <p className="text-sm text-slate-400 mb-3">Page visits, search queries, feature usage, and submission workflow interactions used for platform improvement and support.</p>
                </div>
              </div>
            </Card>

            {/* Technical and Security Data */}
            <Card className="glass-intense border-white/10 p-6">
              <div className="flex items-start gap-4">
                <Lock className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">Technical and Security Data</h3>
                  <p className="text-sm text-slate-400 mb-3">IP address, browser type, device information, system logs, and security-related technical data.</p>
                </div>
              </div>
            </Card>

            {/* Geospatial and Environmental Context Data */}
            <Card className="glass-intense border-white/10 p-6">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">Geospatial and Environmental Context Data</h3>
                  <p className="text-sm text-slate-400 mb-3">User-provided coordinates, place descriptions, geolocation data where permission is used, district inference, and embedded location metadata where relevant to contribution workflows.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 4. How We Use Data */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">How We Use Data</h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-6">
              Data may be used to operate the platform, review contributions, route submissions to relevant modules, support maps, dashboards, alerts, district profiles, library systems, and other environmental intelligence outputs, communicate with contributors where appropriate, and protect platform integrity.
            </p>
            <p className="text-lg text-slate-400 leading-relaxed">
              <strong className="text-white">Not all submitted data is used for public display, and not all records are published at exact precision or in full form.</strong>
            </p>
          </motion.div>
        </div>
      </section>

      {/* 5. Contribution Pathways and Privacy */}
      <section className="py-16 md:py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Contribution Pathways and Privacy</h2>
            <p className="text-lg text-slate-400 max-w-3xl mb-8">
              Privacy handling may differ depending on how a user interacts with the platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
            {contributionPathways.map((pathway, i) => (
              <motion.div
                key={pathway.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-6 h-full">
                  <div className={cn(
                    "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4",
                    pathway.color
                  )}>
                    <pathway.icon className={cn("w-6 h-6", pathway.textColor)} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{pathway.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{pathway.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Sensitive Ecological and Location-Linked Data */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Leaf className="w-8 h-8 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Sensitive Data</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Sensitive Ecological and Location-Linked Data</h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Kashmir EcoWatch may receive or process sensitive biodiversity, habitat, environmental incident, and location-linked records. To reduce ecological and public-interest risk, some information may be generalized, delayed, masked, partially published, or withheld from exact public display.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 7. Sharing and Disclosure */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-8 h-8 text-blue-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Disclosure</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Sharing and Disclosure</h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Kashmir EcoWatch does not publish or disclose all submitted information in the same way. Data may be displayed publicly, summarized, generalized, retained internally for review, or withheld where privacy, sensitivity, ecological protection, review integrity, or public-interest considerations require it.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 8. Retention */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-8 h-8 text-amber-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Retention</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Retention</h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Different categories of information may be retained for different periods depending on platform operations, review workflows, scientific relevance, environmental sensitivity, archival needs, and legal or integrity considerations. Some information may later be anonymized, minimized, or deleted where appropriate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 9. Your Rights */}
      <section className="py-16 md:py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Your Rights</h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              Users may request access to, correction of, deletion of, or restriction regarding personal information, subject to applicable operational, scientific, archival, or legal limitations. Requests related to privacy may be directed to the platform's privacy contact.
            </p>

            <Card className="glass-intense border-white/10 p-8">
              <div className="space-y-4">
                {[
                  { right: 'Access', description: 'Request a copy of your personal data' },
                  { right: 'Correction', description: 'Update or correct inaccurate information' },
                  { right: 'Deletion', description: 'Request deletion of your data, subject to scientific, archival, or legal considerations' },
                  { right: 'Portability', description: 'Download your data in a machine-readable format' },
                  { right: 'Restriction', description: 'Limit how we process your data' },
                ].map((item) => (
                  <div key={item.right} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5">
                      <Shield className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{item.right}</h4>
                      <p className="text-sm text-slate-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* 10. Security and Accountability */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-8 h-8 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Security</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Security and Accountability</h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Kashmir EcoWatch uses appropriate safeguards to protect information, support controlled access, reduce misuse, and maintain responsible data handling across platform workflows.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 11. Contact */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-8 h-8 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Contact</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact</h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              For privacy-related questions, concerns, or requests, contact the platform's privacy contact:
            </p>

            <Card className="glass-intense border-white/10 p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-emerald-400" />
                  <a href="mailto:privacy@kashmir-environment.org" className="text-slate-300 hover:text-emerald-400 transition-colors">
                    privacy@kashmir-environment.org
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <span className="text-slate-400">Data Protection Officer, Kashmir EcoWatch, Srinagar, J&K</span>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
