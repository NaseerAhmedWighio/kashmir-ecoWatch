'use client';

import React from 'react';
import { Navigation } from '@/components/sections/Navigation';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  AlertTriangle, Camera, Database, Users, ArrowRight,
  CheckCircle, Shield, Eye, Upload, FileText, MapPin,
  Star, Award, Lock, Info, ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const contributionPathways = [
  {
    id: 'report-issue',
    title: 'Report an Issue',
    description: 'Report environmental hazards, emergencies, and urgent concerns for rapid response',
    icon: AlertTriangle,
    color: 'from-red-500 to-orange-600',
    route: '/report-issue',
    bestFor: 'Emergency and hazard reporting',
    examples: ['Forest fires, landslides, flooding', 'Pollution leaks, sewage overflow', 'Wildlife incidents, illegal dumping'],
    cta: 'Report an Issue',
    badge: 'Emergency',
    badgeColor: 'danger',
  },
  {
    id: 'submit-sighting',
    title: 'Submit a Sighting',
    description: 'Contribute wildlife observations and species records to build the biodiversity database',
    icon: Camera,
    color: 'from-emerald-500 to-teal-600',
    route: '/submit-sighting',
    bestFor: 'Ecological observations',
    examples: ['Bird and wildlife sightings', 'Flowering and pollinator records', 'Habitat and trail observations'],
    cta: 'Submit a Sighting',
    badge: 'Observation',
    badgeColor: 'success',
  },
  {
    id: 'contribute-data',
    title: 'Contribute Data',
    description: 'Share structured datasets, research findings, water quality readings, and monitoring data',
    icon: Database,
    color: 'from-blue-500 to-indigo-600',
    route: '/contribute-data',
    bestFor: 'Structured data submissions',
    examples: ['Water quality readings', 'Species survey records', 'District datasets and monitoring exports'],
    cta: 'Contribute Data',
    badge: 'Data',
    badgeColor: 'info',
  },
  {
    id: 'citizen-science',
    title: 'Join Citizen Science',
    description: 'Become a recurring contributor with verification roles, programs, and community engagement',
    icon: Users,
    color: 'from-violet-500 to-purple-600',
    route: '/citizen-science',
    bestFor: 'Ongoing participation',
    examples: ['Wildlife monitoring programs', 'Data verification and review', 'Community outreach and training'],
    cta: 'Join the Program',
    badge: 'Program',
    badgeColor: 'default',
  },
];

const verificationLevels = [
  { level: 'Unverified', description: 'New submissions pending review', icon: Info, color: 'text-slate-400', bgColor: 'bg-slate-500/10', borderColor: 'border-slate-500/30' },
  { level: 'Community-Verified', description: 'Confirmed by 2+ community members', icon: Eye, color: 'text-blue-400', bgColor: 'bg-blue-500/10', borderColor: 'border-blue-500/30' },
  { level: 'Expert-Reviewed', description: 'Validated by domain specialists', icon: CheckCircle, color: 'text-emerald-400', bgColor: 'bg-emerald-500/10', borderColor: 'border-emerald-500/30' },
  { level: 'Authority-Confirmed', description: 'Officially confirmed by agencies', icon: Shield, color: 'text-amber-400', bgColor: 'bg-amber-500/10', borderColor: 'border-amber-500/30' },
];

const contributorTiers = [
  { tier: 'Observer', contributions: '5+', icon: Star, color: 'text-slate-400' },
  { tier: 'Contributor', contributions: '25+', icon: Award, color: 'text-emerald-400' },
  { tier: 'Expert', contributions: '100+', icon: Shield, color: 'text-blue-400' },
  { tier: 'Steward', contributions: '500+', icon: Users, color: 'text-amber-400' },
];

export default function ContributeHubPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      <Navigation />

      {/* Hero */}
      <section className="relative pt-48 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-blue-950/30 to-slate-950" />
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
              <span className="text-white font-medium">Contribute</span>
            </nav>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center shadow-2xl">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <Badge variant="success" size="lg">Community Contribution</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Contribute to <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Kashmir Intelligence</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl">
              Whether reporting an urgent hazard, documenting wildlife, sharing research data,
              or joining as a recurring contributor — your participation strengthens Kashmir&apos;s
              environmental monitoring and conservation decision-making
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contribution Pathways */}
      <section className="py-16 border-t border-white/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Choose Your Contribution Path</h2>
            <p className="text-slate-400">Select the pathway that matches your observation or data type</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contributionPathways.map((pathway, index) => (
              <motion.div
                key={pathway.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="glass-intense border-white/10 hover:border-white/20 transition-all p-6 h-full group cursor-pointer" onClick={() => router.push(pathway.route)}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${pathway.color} flex items-center justify-center shadow-lg flex-shrink-0`}>
                      <pathway.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                          {pathway.title}
                        </h3>
                        <Badge variant={pathway.badgeColor as any} size="sm">{pathway.badge}</Badge>
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {pathway.description}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Examples</span>
                    <ul className="mt-2 space-y-1">
                      {pathway.examples.map((example, i) => (
                        <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                          <span className="text-emerald-400 mt-1">•</span>
                          {example}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    size="sm"
                    className={`w-full bg-gradient-to-r ${pathway.color} hover:opacity-90 text-white text-sm`}
                    onClick={() => router.push(pathway.route)}
                  >
                    <span>{pathway.cta}</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Verification Model */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Verification Model</h2>
            <p className="text-slate-400">How submissions are reviewed and confirmed for accuracy</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {verificationLevels.map((level, index) => (
              <motion.div
                key={level.level}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className={`glass-intense ${level.borderColor} border p-5`}>
                  <div className={`w-10 h-10 rounded-lg ${level.bgColor} flex items-center justify-center mb-3`}>
                    <level.icon className={`w-5 h-5 ${level.color}`} />
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className={`text-sm font-bold ${level.color}`}>{level.level}</h3>
                    {index > 0 && <span className="text-xs text-slate-600">→</span>}
                  </div>
                  <p className="text-xs text-slate-400">{level.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contributor Tiers */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Contributor Tiers</h2>
            <p className="text-slate-400">Recognition levels based on contribution volume and verification status</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {contributorTiers.map((tier, index) => (
              <motion.div
                key={tier.tier}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="text-center"
              >
                <tier.icon className={`w-8 h-8 ${tier.color} mx-auto mb-3`} />
                <h3 className={`text-lg font-bold ${tier.color} mb-1`}>{tier.tier}</h3>
                <p className="text-sm text-slate-400">{tier.contributions} contributions</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guidelines & Privacy */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="glass-intense border-white/10 p-6">
                <FileText className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-base font-bold text-white mb-2">Contribution Guidelines</h3>
                <p className="text-sm text-slate-400 mb-4">
                  All submissions should be accurate, location-specific, and include supporting evidence
                  where possible. Avoid speculative or unverified claims.
                </p>
                <Link href="/contribute/guidelines" className="text-sm text-blue-400 font-medium hover:underline flex items-center gap-1">
                  Read Guidelines <ArrowRight className="w-3 h-3" />
                </Link>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <Card className="glass-intense border-white/10 p-6">
                <MapPin className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="text-base font-bold text-white mb-2">Location & Evidence</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Include precise location data (GPS coordinates, district, landmarks). Photos and
                  geotagged evidence significantly improve verification rates.
                </p>
                <Link href="/contribute/guidelines#evidence" className="text-sm text-emerald-400 font-medium hover:underline flex items-center gap-1">
                  Evidence Standards <ArrowRight className="w-3 h-3" />
                </Link>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <Card className="glass-intense border-white/10 p-6">
                <Lock className="w-8 h-8 text-amber-400 mb-4" />
                <h3 className="text-base font-bold text-white mb-2">Sensitivity & Privacy</h3>
                <p className="text-sm text-slate-400 mb-4">
                  Sensitive species locations are protected. Contributors can submit anonymously.
                  Personal data is never shared without explicit consent.
                </p>
                <Link href="/contribute/guidelines#privacy" className="text-sm text-amber-400 font-medium hover:underline flex items-center gap-1">
                  Privacy Policy <ArrowRight className="w-3 h-3" />
                </Link>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="glass-intense border-white/10 p-8">
              <div className="flex items-center justify-between flex-wrap gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Ready to Contribute?
                  </h3>
                  <p className="text-slate-400">
                    Join 635+ citizen scientists building Kashmir&apos;s environmental intelligence platform
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-red-500 to-orange-600"
                    onClick={() => router.push('/report-issue')}
                  >
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Report Issue
                  </Button>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-emerald-500 to-teal-600"
                    onClick={() => router.push('/submit-sighting')}
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Submit Sighting
                  </Button>
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
