'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Leaf, Target, Users, Mail, ArrowRight, Book, Shield, Database,
  Globe, Map, Droplets, AlertTriangle, Activity, FileText, BarChart3,
  Eye, Lock, Layers, CheckCircle2, ArrowUpRight, Heart
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const platformModules = [
  {
    icon: Shield,
    title: 'Protected Areas',
    description: 'Conservation landscapes, reserves, protected ecosystems, and habitat-linked environmental intelligence',
    href: '/protected-network',
    color: 'from-emerald-500/20 to-teal-500/20',
    textColor: 'text-emerald-400',
  },
  {
    icon: Leaf,
    title: 'Biodiversity',
    description: 'Species records, sightings, habitat signals, migration, pollinators, and ecological observation intelligence',
    href: '/biodiversity',
    color: 'from-green-500/20 to-emerald-500/20',
    textColor: 'text-green-400',
  },
  {
    icon: Droplets,
    title: 'Water Systems',
    description: 'Lakes, wetlands, rivers, springs, watersheds, water quality, blooms, and aquatic intelligence',
    href: '/water-systems',
    color: 'from-blue-500/20 to-indigo-500/20',
    textColor: 'text-blue-400',
  },
  {
    icon: Activity,
    title: 'Environmental Monitoring',
    description: 'Waste systems, wastewater, drinking water, environmental service stress, and public environmental signals',
    href: '/environmental-monitoring',
    color: 'from-amber-500/20 to-orange-500/20',
    textColor: 'text-amber-400',
  },
  {
    icon: AlertTriangle,
    title: 'Risk & Monitoring',
    description: 'Hazards, alerts, advisories, district risk, and operational situational awareness',
    href: '/risk-monitoring',
    color: 'from-red-500/20 to-orange-500/20',
    textColor: 'text-red-400',
  },
  {
    icon: Map,
    title: 'District Profiles',
    description: 'District-level environmental synthesis across ecology, water, monitoring, evidence, and risk',
    href: '/districts',
    color: 'from-purple-500/20 to-pink-500/20',
    textColor: 'text-purple-400',
  },
  {
    icon: FileText,
    title: 'Library & Evidence Systems',
    description: 'Evidence collections, reports, datasets, reference systems, and reviewed knowledge resources',
    href: '/library',
    color: 'from-cyan-500/20 to-blue-500/20',
    textColor: 'text-cyan-400',
  },
  {
    icon: Globe,
    title: 'Atlas & Spatial Intelligence',
    description: 'Interactive GIS mapping, hazard overlays, habitat boundaries, and spatial context',
    href: '/atlas',
    color: 'from-indigo-500/20 to-violet-500/20',
    textColor: 'text-indigo-400',
  },
];

const howItWorksSteps = [
  {
    step: '1',
    title: 'Data and Evidence Enter',
    description: 'Government agencies, environmental authorities, research institutions, NGOs, monitoring systems, Earth observation inputs, field records, and community-supported evidence all contribute to the platform.',
    icon: Database,
  },
  {
    step: '2',
    title: 'Evidence Is Classified and Reviewed',
    description: 'Records are handled according to source type, thematic relevance, spatial confidence, and verification needs.',
    icon: Eye,
  },
  {
    step: '3',
    title: 'Information Is Routed into Thematic Systems',
    description: 'Evidence is connected to biodiversity, water systems, monitoring, risk, district, and library layers.',
    icon: Layers,
  },
  {
    step: '4',
    title: 'Geospatial and Contextual Intelligence Is Applied',
    description: 'Where relevant, data is interpreted through spatial, environmental, district, and thematic context.',
    icon: Map,
  },
  {
    step: '5',
    title: 'Public Outputs Are Responsibly Published',
    description: 'Maps, dashboards, alerts, district profiles, reports, and reviewed knowledge layers are published according to confidence and sensitivity rules.',
    icon: CheckCircle2,
  },
];

const trustCards = [
  {
    icon: Database,
    title: 'Data Sources',
    description: 'Understand where our environmental data comes from, how it is collected, and the institutions that contribute.',
    href: '/about/data-sources',
    color: 'from-blue-500/20 to-indigo-500/20',
    textColor: 'text-blue-400',
  },
  {
    icon: Book,
    title: 'Methodology',
    description: 'Learn about the scientific methods, analytical frameworks, and systematic processes we follow.',
    href: '/about/methodology',
    color: 'from-emerald-500/20 to-teal-500/20',
    textColor: 'text-emerald-400',
  },
  {
    icon: Shield,
    title: 'Verification Model',
    description: 'See how we review, validate, and assign confidence levels to all environmental intelligence.',
    href: '/about/verification',
    color: 'from-purple-500/20 to-pink-500/20',
    textColor: 'text-purple-400',
  },
  {
    icon: Lock,
    title: 'Sensitivity & Privacy',
    description: 'Understand our approach to handling sensitive environmental data and protecting privacy.',
    href: '/about/privacy',
    color: 'from-amber-500/20 to-orange-500/20',
    textColor: 'text-amber-400',
  },
];

const contributionPathways = [
  { title: 'Report an Issue', href: '/report-issue', desc: 'Flag environmental concerns' },
  { title: 'Submit a Sighting', href: '/submit-sighting', desc: 'Share wildlife observations' },
  { title: 'Contribute Data', href: '/contribute-data', desc: 'Provide structured datasets' },
  { title: 'Citizen Science', href: '/citizen-science', desc: 'Participate in monitoring' },
];

export default function AboutPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      {/* 1. Hero Section */}
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
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Institutional Overview</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Kashmir EcoWatch</span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 leading-relaxed max-w-4xl">
              A Kashmir Diaspora-Supported Initiative for Environmental Intelligence, Scientific Stewardship,
              and Public-Interest Environmental Knowledge, supported by Dr. Kumar Foundation USA.
            </p>

            <p className="text-base text-slate-500 mb-8 leading-relaxed max-w-4xl">
              Kashmir EcoWatch is an environmental intelligence platform built to strengthen ecological understanding,
              public environmental awareness, district-level environmental visibility, and evidence-based stewardship
              across Kashmir. The platform brings together biodiversity knowledge, water systems intelligence,
              environmental monitoring, risk interpretation, geospatial context, field evidence, and reviewed
              public contribution pathways within a structured institutional framework.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600" onClick={() => router.push('/about/mission')}>
                Our Mission
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white" onClick={() => router.push('/about/data-sources')}>
                Data & Trust Framework
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white" onClick={() => router.push('/about/contact')}>
                Contact Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. What Kashmir EcoWatch Is */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Identity</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">What Kashmir EcoWatch Is</h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-6">
              Kashmir EcoWatch is a public-interest environmental intelligence platform designed to connect
              environmental observation, scientific interpretation, geospatial awareness, field reporting,
              monitoring systems, district intelligence, and evidence-based environmental knowledge across Kashmir.
            </p>
            <p className="text-lg text-slate-400 leading-relaxed">
              It is intended as a structured platform for ecological visibility, environmental documentation,
              risk-aware interpretation, and responsible stewardship rather than as a simple information archive
              or static awareness website.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. Why It Exists */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Purpose</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Why It Exists</h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Kashmir EcoWatch exists to strengthen environmental understanding across a region where ecological
              systems, water landscapes, biodiversity, public environmental pressures, and environmental risks are
              deeply interconnected. The platform aims to support more coherent environmental visibility by bringing
              together structured evidence, scientific and geospatial interpretation, field-linked observations,
              institutional knowledge, and community-supported intelligence in one integrated public framework.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 4. Platform Intelligence Architecture */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Architecture</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Platform Intelligence Architecture</h2>
            <p className="text-lg text-slate-400 max-w-3xl">
              Kashmir EcoWatch is organized into interconnected thematic systems, each providing specialized
              environmental intelligence while contributing to a unified platform framework.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformModules.map((mod, i) => (
              <motion.div
                key={mod.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  className="glass-intense border-white/10 p-6 h-full hover:border-white/20 transition-all cursor-pointer group"
                  onClick={() => router.push(mod.href)}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4",
                    mod.color
                  )}>
                    <mod.icon className={cn("w-6 h-6", mod.textColor)} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{mod.description}</p>
                  <div className="flex items-center gap-1 mt-4 text-xs font-medium text-emerald-400 group-hover:text-emerald-300">
                    <span>Explore</span>
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. How the Platform Works */}
      <section className="py-16 md:py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How the Platform Works</h2>
            <p className="text-lg text-slate-400 max-w-3xl">
              Environmental intelligence flows through a structured pipeline from intake to public publication.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {howItWorksSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="glass-intense border-white/10 p-6 h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center">
                      <step.icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div className="text-2xl font-black text-emerald-400">{step.step}</div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Data, Trust & Review */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-indigo-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Trust</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Data, Trust & Review</h2>
            <p className="text-lg text-slate-400 leading-relaxed max-w-4xl mb-8">
              Kashmir EcoWatch does not treat all data as equal by default. The platform works across multiple
              evidence classes, including institutional records, scientific references, geospatial and remote
              sensing inputs, field observations, and community-supported contributions. Different source classes
              move through different review, interpretation, and publication pathways depending on their nature,
              sensitivity, and intended public use.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  className="glass-intense border-white/10 p-6 h-full hover:border-white/20 transition-all cursor-pointer group"
                  onClick={() => router.push(card.href)}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4",
                    card.color
                  )}>
                    <card.icon className={cn("w-6 h-6", card.textColor)} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{card.description}</p>
                  <div className="flex items-center gap-1 mt-4 text-xs font-medium text-emerald-400 group-hover:text-emerald-300">
                    <span>Learn More</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Regional and Institutional Grounding */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Grounding</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Regional and Institutional Grounding</h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Kashmir EcoWatch is grounded in a multi-level environmental knowledge framework spanning Kashmir-based
              academic and research institutions, Jammu & Kashmir environmental authorities, India-based scientific
              and regulatory systems, Asia-relevant mountain and geospatial knowledge networks, and global Earth
              observation, biodiversity, and conservation reference systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 8. Expert Review & Diaspora Scientific Insight */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-violet-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Expert Review</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Expert Review & Diaspora Scientific Insight</h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Data and environmental interpretation on Kashmir EcoWatch may be further evaluated, assessed, and
              contextually interpreted through the insights of the <strong className="text-white">Kashmir EcoWatch Global
              Diaspora Environmental Expert Committee</strong>. This expert layer supports environmental judgment,
              scientific interpretation, contextual review, and responsible publication decisions where additional
              thematic or regional insight is needed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 9. Public Contribution & Community Participation */}
      <section className="py-16 md:py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Community</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Public Contribution & Community Participation</h2>
            <p className="text-lg text-slate-400 leading-relaxed max-w-4xl mb-8">
              Kashmir EcoWatch includes structured public contribution pathways for issue reporting, sightings,
              data contribution, and citizen science participation. Community-supported evidence helps improve
              local environmental visibility, but is handled through review and verification logic before being
              surfaced as trusted public intelligence where appropriate.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {contributionPathways.map((pathway, i) => (
              <motion.div
                key={pathway.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  className="glass-intense border-white/10 p-5 text-center hover:border-emerald-500/30 transition-all cursor-pointer group"
                  onClick={() => router.push(pathway.href)}
                >
                  <h3 className="text-sm font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                    {pathway.title}
                  </h3>
                  <p className="text-xs text-slate-500">{pathway.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Institutional Support */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-8 h-8 text-red-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Support</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Institutional Support</h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-6">
              Kashmir EcoWatch is supported by <strong className="text-white">Dr. Kumar Foundation USA</strong> as
              a Kashmir diaspora-supported initiative for environmental intelligence and scientific stewardship.
            </p>
            <p className="text-base text-slate-500 leading-relaxed">
              The platform is designed as a public-interest environmental knowledge and monitoring ecosystem,
              with long-term value in ecological understanding, conservation visibility, district-level
              environmental awareness, and evidence-based stewardship.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 11. Contact & Institutional Access */}
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
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact & Institutional Access</h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              For institutional communication, partnerships, research-linked engagement, data-related inquiries,
              or platform coordination.
            </p>

            <Card className="glass-intense border-white/10 p-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-emerald-400" />
                  <a href="mailto:contact@kashmir-ecowatch.com" className="text-slate-300 hover:text-emerald-400 transition-colors">
                    contact@kashmir-ecowatch.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-emerald-400" />
                  <span className="text-slate-400">Srinagar, Jammu & Kashmir</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 mt-8 pt-8 border-t border-white/5">
                <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-teal-600" onClick={() => router.push('/about/mission')}>
                  Our Mission
                </Button>
                <Button size="lg" variant="outline" className="border-white/20 text-white" onClick={() => router.push('/about/partners')}>
                  Partners & Team
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
