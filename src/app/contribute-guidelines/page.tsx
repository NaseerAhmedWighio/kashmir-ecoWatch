'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  BookOpen, CheckCircle, MapPin, Clock, Link as LinkIcon, Layers,
  AlertTriangle, Camera, Database, Users, FileText, Image,
  Eye, Shield, AlertCircle, ShieldCheck, Zap, Heart,
  ArrowRight, ChevronRight, ClipboardCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const evidenceStandards = [
  {
    title: 'Factual Accuracy',
    icon: CheckCircle,
    description: 'Submissions should be based on direct observation, documented evidence, or reliable secondary sources. Speculative or unverifiable claims may be classified but will not be published without review.',
  },
  {
    title: 'Geographic Specificity',
    icon: MapPin,
    description: 'Provide the most precise location possible. District-level, landmark-referenced, or coordinate-based location information improves the usability and verification potential of your submission.',
  },
  {
    title: 'Temporal Clarity',
    icon: Clock,
    description: 'Include the date and time of observation or event. Real-time reports carry different weight and review priority than historical observations. Always specify when the event occurred, not just when you submitted.',
  },
  {
    title: 'Source Transparency',
    icon: LinkIcon,
    description: 'If submitting secondary data, photographs, or derived materials, indicate the original source where possible. This supports review, verification, and confidence assessment.',
  },
  {
    title: 'Non-Duplication',
    icon: Layers,
    description: 'Check existing platform records before submitting. Duplicate reports may be merged during review. If you are adding to an existing report, reference the original submission.',
  },
];

const acceptableContentTypes = [
  { title: 'Environmental Incidents', description: 'Pollution events, ecological damage, infrastructure failures, wildlife harm', icon: AlertTriangle },
  { title: 'Species Observations', description: 'Wildlife sightings, bird observations, plant flowering records, habitat evidence', icon: Camera },
  { title: 'Scientific Data', description: 'Monitoring records, survey results, GIS files, research data, metadata', icon: Database },
  { title: 'Community Science', description: 'Public observations, seasonal activity records, phenology notes, habitat signals', icon: Users },
  { title: 'Photographic Evidence', description: 'Field photographs, geotagged images, habitat documentation', icon: Image },
  { title: 'Written Reports', description: 'Field notes, incident descriptions, impact assessments, local knowledge', icon: FileText },
];

const pathwayRules = [
  {
    title: 'Report an Issue',
    icon: AlertTriangle,
    color: 'from-red-500 to-orange-600',
    rules: [
      'Must describe a specific environmental incident or concern',
      'Include location, date, and description',
      'Photographs or evidence are strongly recommended',
      'Severity assessment helps with triage',
      'Reports may trigger advisory or escalation pathways',
      'Submissions do not guarantee immediate response',
    ],
  },
  {
    title: 'Submit a Sighting',
    icon: Camera,
    color: 'from-emerald-500 to-teal-600',
    rules: [
      'Must identify species or provide best-guess classification',
      'Include location, date, count if possible',
      'Photographs are strongly recommended for verification',
      'Sensitive species locations may be generalized for protection',
      'Sightings undergo expert or platform review before verification',
      'Community sightings remain "Community Submitted" until reviewed',
    ],
  },
  {
    title: 'Contribute Data',
    icon: Database,
    color: 'from-blue-500 to-indigo-600',
    rules: [
      'Must include metadata describing dataset scope, format, and source',
      'Specify geographic and temporal coverage',
      'Indicate any access restrictions or usage conditions',
      'Technical submissions may undergo quality review before integration',
      'Data contributors may be credited in platform records',
      'Large or structured data may require coordination via data@kashmir-ecowatch.com',
    ],
  },
  {
    title: 'Citizen Science',
    icon: Users,
    color: 'from-violet-500 to-purple-600',
    rules: [
      'Open to all public observers and community participants',
      'Observations contribute to platform intelligence layers',
      'No formal expertise required, but accuracy improves contribution value',
      'Seasonal and recurring observations are particularly valuable',
      'Submissions follow the same evidence standards as other pathways',
      'Contributors may build reputation and recognition over time',
    ],
  },
];

const reviewSteps = [
  { step: 1, title: 'Receipt', description: 'Submission is logged and acknowledged' },
  { step: 2, title: 'Classification', description: 'Type, category, and severity are assessed' },
  { step: 3, title: 'Review', description: 'Platform or expert review evaluates quality, relevance, and sensitivity' },
  { step: 4, title: 'Publication Decision', description: 'Content may be published fully, partially, summarized, generalized, or withheld' },
  { step: 5, title: 'Status Assignment', description: 'Records receive a publication status (Community Submitted, Platform Reviewed, Expert Reviewed, Verified, or Restricted)' },
];

const sensitivityRules = [
  {
    title: 'Sensitive Species Locations',
    icon: ShieldCheck,
    description: 'Exact coordinates for rare, threatened, or vulnerable species may be generalized or withheld from public display. This protects species from potential harm through location exposure.',
  },
  {
    title: 'Ecological Vulnerability',
    icon: AlertCircle,
    description: 'Information about fragile habitats, breeding zones, or vulnerable ecosystems may be partially restricted. Full evidence may be retained internally while public display is limited.',
  },
  {
    title: 'Incident Evidence',
    icon: Zap,
    description: 'Field evidence related to ongoing incidents may remain under review status until resolution. Premature publication could interfere with response operations.',
  },
  {
    title: 'Community Safety',
    icon: Heart,
    description: 'Submissions that could create public alarm, panic, or misuse of environmental information may be edited, summarized, or withheld. The platform prioritizes responsible stewardship over speed.',
  },
];

const quickActions = [
  { label: 'Report an Issue', route: '/report-issue', icon: AlertTriangle, gradient: 'from-red-500 to-orange-600' },
  { label: 'Submit a Sighting', route: '/submit-sighting', icon: Camera, gradient: 'from-emerald-500 to-teal-600' },
  { label: 'Contribute Data', route: '/contribute-data', icon: Database, gradient: 'from-blue-500 to-indigo-600' },
  { label: 'Citizen Science', route: '/citizen-science', icon: Users, gradient: 'from-violet-500 to-purple-600' },
  { label: 'Return to Contribute Hub', route: '/contribute', icon: BookOpen, gradient: 'from-slate-500 to-slate-600' },
];

export default function ContributeGuidelinesPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="relative pt-20 md:pt-48 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-teal-950/30 to-slate-950" />
        <div className="absolute inset-0 bg-grid opacity-20" />

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl"
          >
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <button onClick={() => router.push('/')} className="hover:text-white transition-colors">Home</button>
              <ChevronRight className="w-4 h-4" />
              <button onClick={() => router.push('/contribute')} className="hover:text-white transition-colors">Contribute</button>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-medium">Guidelines</span>
            </nav>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Contributor Guidance</Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
              Contribution <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Guidelines</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl">
              Evidence standards, submission rules, review logic, and sensitivity guidance for all Kashmir EcoWatch contribution pathways.
            </p>
          </motion.div>
        </div>
      </section>

      {/* How Contributions Work */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="glass-intense border-white/10 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-white mb-4">How Contributions Work</h2>
              <p className="text-slate-400 mb-6 leading-relaxed">
                The Kashmir EcoWatch platform supports four contribution pathways, each designed for different types of environmental intelligence:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">Report an Issue</h3>
                    <p className="text-xs text-slate-400">Field incident and environmental concern submissions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                    <Camera className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">Submit a Sighting</h3>
                    <p className="text-xs text-slate-400">Wildlife and species observation logging</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                    <Database className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">Contribute Data</h3>
                    <p className="text-xs text-slate-400">Dataset, research, and technical material submission</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">Citizen Science</h3>
                    <p className="text-xs text-slate-400">Public participation and community science programs</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-500">
                Each pathway follows shared standards for evidence quality, review processing, and publication sensitivity.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Evidence Standards */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <Badge variant="info" size="md">Standards</Badge>
            <h2 className="text-2xl font-bold text-white mt-3 mb-2">Evidence Standards</h2>
            <p className="text-slate-400">Quality requirements that apply across all contribution pathways</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {evidenceStandards.map((standard, index) => (
              <motion.div
                key={standard.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-6 h-full">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-4">
                    <standard.icon className="w-5 h-5 text-emerald-400" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-3">{standard.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{standard.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Acceptable Submissions */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <Badge variant="info" size="md">Content Types</Badge>
            <h2 className="text-2xl font-bold text-white mt-3 mb-2">Acceptable Submissions</h2>
            <p className="text-slate-400">Types of content the platform accepts across all pathways</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {acceptableContentTypes.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-6 h-full">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-teal-400" />
                    </div>
                    <h3 className="text-base font-bold text-white">{item.title}</h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Submission Rules by Pathway */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <Badge variant="info" size="md">Pathway Rules</Badge>
            <h2 className="text-2xl font-bold text-white mt-3 mb-2">Submission Rules by Pathway</h2>
            <p className="text-slate-400">Specific requirements and expectations for each contribution route</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pathwayRules.map((pathway, index) => (
              <motion.div
                key={pathway.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${pathway.color} flex items-center justify-center`}>
                      <pathway.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-base font-bold text-white">{pathway.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {pathway.rules.map((rule, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                        <CheckCircle className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Review and Publication Logic */}
      <section className="py-16 bg-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <Badge variant="info" size="md">Review Pipeline</Badge>
            <h2 className="text-2xl font-bold text-white mt-3 mb-2">Review and Publication Logic</h2>
            <p className="text-slate-400">How submissions move from receipt to publication</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="glass-intense border-white/10 p-6 md:p-8">
              <div className="space-y-6">
                {reviewSteps.map((step, index) => (
                  <div key={step.step} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-white">{step.step}</span>
                      </div>
                      {index < reviewSteps.length - 1 && (
                        <div className="w-px h-8 bg-slate-700 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className="text-base font-bold text-white mb-1">{step.title}</h3>
                      <p className="text-sm text-slate-400">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Publication does not guarantee immediate display. Sensitive records may be delayed, generalized, or restricted to protect ecological interests.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Sensitivity and Protection Rules */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <Badge variant="info" size="md">Protection</Badge>
            <h2 className="text-2xl font-bold text-white mt-3 mb-2">Sensitivity and Protection Rules</h2>
            <p className="text-slate-400">How the platform handles ecologically sensitive information</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {sensitivityRules.map((rule, index) => (
              <motion.div
                key={rule.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                      <rule.icon className="w-5 h-5 text-amber-400" />
                    </div>
                    <h3 className="text-base font-bold text-white">{rule.title}</h3>
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">{rule.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contributor Conduct */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <Badge variant="info" size="md">Agreement</Badge>
            <h2 className="text-2xl font-bold text-white mt-3 mb-2">Contributor Conduct</h2>
            <p className="text-slate-400">Expectations for all platform contributors</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="glass-intense border-white/10 p-6 md:p-8">
              <p className="text-sm text-slate-400 mb-6">Contributors agree to:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'Submit honest, good-faith observations and reports',
                  'Avoid fabricated, misleading, or malicious submissions',
                  'Respect ecological sensitivity and species protection',
                  'Not use the platform to support ecological harm, wildlife exploitation, or environmental misuse',
                  'Accept that review may modify, summarize, or restrict published content',
                  'Understand that contribution does not equal endorsement by the platform',
                ].map((rule, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Shield className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300">{rule}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <Badge variant="info" size="md">Actions</Badge>
            <h2 className="text-2xl font-bold text-white mt-3 mb-2">Quick Actions</h2>
            <p className="text-slate-400">Navigate to contribution pathways</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="glass-intense border-white/10 p-6 md:p-8">
              <div className="flex flex-wrap gap-4">
                {quickActions.map((action) => (
                  <Button
                    key={action.label}
                    size="lg"
                    variant="primary"
                    className={`bg-gradient-to-r ${action.gradient} hover:opacity-90`}
                    onClick={() => router.push(action.route)}
                  >
                    <action.icon className="w-5 h-5 mr-2" />
                    {action.label}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
