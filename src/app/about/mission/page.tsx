'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Target, Eye, Heart, ArrowRight, Globe, Users, Shield, Database,
  Map, Activity, BarChart3, FileText, Leaf, Droplets, AlertTriangle,
  CheckCircle2, BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const values = [
  {
    icon: Database,
    title: 'Scientific Integrity',
    description: 'Environmental understanding should be grounded in evidence, careful interpretation, and methodological responsibility.',
    color: 'from-blue-500/20 to-indigo-500/20',
    textColor: 'text-blue-400',
  },
  {
    icon: Heart,
    title: 'Public Interest Stewardship',
    description: 'The platform exists to serve ecological awareness, environmental responsibility, and long-term stewardship rather than narrow institutional visibility.',
    color: 'from-emerald-500/20 to-teal-500/20',
    textColor: 'text-emerald-400',
  },
  {
    icon: Eye,
    title: 'Transparency & Traceability',
    description: 'Data, sources, review pathways, and publication states should be understandable and responsibly communicated.',
    color: 'from-purple-500/20 to-pink-500/20',
    textColor: 'text-purple-400',
  },
  {
    icon: Globe,
    title: 'Regional Grounding',
    description: "Kashmir's landscapes, water systems, biodiversity, districts, and environmental realities remain central to the platform's logic.",
    color: 'from-amber-500/20 to-orange-500/20',
    textColor: 'text-amber-400',
  },
  {
    icon: CheckCircle2,
    title: 'Responsible Participation',
    description: 'Public contributions and citizen science are welcomed, but handled through structured review and contextual care.',
    color: 'from-cyan-500/20 to-blue-500/20',
    textColor: 'text-cyan-400',
  },
  {
    icon: Users,
    title: 'Collaborative Environmental Knowledge',
    description: 'The platform values contributions from institutions, experts, monitoring systems, NGOs, field networks, and community-supported knowledge.',
    color: 'from-indigo-500/20 to-violet-500/20',
    textColor: 'text-indigo-400',
  },
];

const strategicGoals = [
  {
    icon: Database,
    title: 'Environmental Intelligence Infrastructure',
    description: 'Build and maintain a structured environmental intelligence platform connecting biodiversity, water systems, environmental monitoring, district intelligence, risk awareness, and evidence systems across Kashmir.',
    color: 'from-blue-500/20 to-indigo-500/20',
    textColor: 'text-blue-400',
  },
  {
    icon: Eye,
    title: 'Public Environmental Visibility',
    description: 'Improve the visibility of ecological conditions, water systems, environmental pressures, hazards, and district-level environmental realities through accessible maps, dashboards, profiles, and knowledge resources.',
    color: 'from-emerald-500/20 to-teal-500/20',
    textColor: 'text-emerald-400',
  },
  {
    icon: Shield,
    title: 'Scientific and Evidence-Based Trust',
    description: 'Strengthen platform credibility through clear data provenance, methodological structure, verification pathways, review logic, and responsible publication standards.',
    color: 'from-purple-500/20 to-pink-500/20',
    textColor: 'text-purple-400',
  },
  {
    icon: Map,
    title: 'Regional and District-Level Understanding',
    description: 'Develop district intelligence systems that help users understand environmental variation, ecological pressure, monitoring needs, and local context across different parts of Kashmir.',
    color: 'from-amber-500/20 to-orange-500/20',
    textColor: 'text-amber-400',
  },
  {
    icon: Activity,
    title: 'Geospatial and Monitoring Integration',
    description: 'Use geospatial intelligence, field evidence, monitoring systems, and Earth observation support to strengthen environmental interpretation and situational awareness across the platform.',
    color: 'from-cyan-500/20 to-blue-500/20',
    textColor: 'text-cyan-400',
  },
  {
    icon: Users,
    title: 'Public Contribution and Citizen Science',
    description: 'Support structured pathways for issue reporting, biodiversity sightings, data contribution, and citizen science participation in ways that improve environmental awareness while protecting evidence quality and sensitivity.',
    color: 'from-indigo-500/20 to-violet-500/20',
    textColor: 'text-indigo-400',
  },
  {
    icon: Globe,
    title: 'Knowledge Partnerships and Collaboration',
    description: 'Foster collaboration across academic institutions, research systems, environmental authorities, NGOs, monitoring networks, and expert communities connected to Kashmir, Jammu & Kashmir, India, Asia, and global environmental knowledge systems.',
    color: 'from-rose-500/20 to-red-500/20',
    textColor: 'text-rose-400',
  },
  {
    icon: Leaf,
    title: 'Conservation and Stewardship Impact',
    description: 'Support ecological stewardship, conservation visibility, and public-interest environmental responsibility by making environmental knowledge more coherent, accessible, and actionable.',
    color: 'from-green-500/20 to-emerald-500/20',
    textColor: 'text-green-400',
  },
];

const trustFrameworkLinks = [
  { icon: Database, title: 'Data Sources', href: '/about/data-sources', desc: 'Where our environmental data comes from' },
  { icon: BookOpen, title: 'Methodology', href: '/about/methodology', desc: 'Scientific methods and analytical frameworks' },
  { icon: Shield, title: 'Verification Model', href: '/about/verification', desc: 'How we review and validate intelligence' },
  { icon: Eye, title: 'Sensitivity & Privacy', href: '/about/privacy', desc: 'Handling sensitive environmental data' },
];

export default function MissionPage() {
  const router = useRouter();

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
                <Target className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Mission & Direction</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Mission</span>
            </h1>

            <p className="text-xl text-slate-400 mb-6 leading-relaxed max-w-4xl">
              To strengthen environmental understanding, ecological stewardship, and evidence-based public awareness across Kashmir through environmental intelligence, scientific interpretation, geospatial visibility, trusted knowledge systems, and responsible community participation.
            </p>

            <p className="text-base text-slate-500 leading-relaxed max-w-4xl">
              Kashmir EcoWatch exists to build a structured environmental intelligence platform for Kashmir, one that connects biodiversity, water systems, environmental monitoring, risk interpretation, district-level visibility, evidence systems, and public contribution within a scientific and public-interest framework. The platform is intended to support conservation, responsible environmental stewardship, and more informed ecological understanding across the region.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Vision */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-8 h-8 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Vision</span>
            </div>
            <p className="text-lg text-slate-400 leading-relaxed">
              A Kashmir where environmental understanding is strengthened by accessible, trusted, regionally grounded, and scientifically informed knowledge, and where ecological systems, water landscapes, biodiversity, environmental risks, and public environmental concerns are visible enough to support better stewardship, awareness, and long-term environmental responsibility.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. Values */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-8 h-8 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Values</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">What Guides Us</h2>
            <p className="text-lg text-slate-400 max-w-3xl">
              These values shape every decision, system, and publication on Kashmir EcoWatch.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-6 h-full">
                  <div className={cn(
                    "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4",
                    value.color
                  )}>
                    <value.icon className={cn("w-6 h-6", value.textColor)} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Strategic Goals */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-8 h-8 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Strategic Goals</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Where We Are Headed</h2>
            <p className="text-lg text-slate-400 max-w-3xl">
              Eight strategic priorities guide the platform's development and institutional direction.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {strategicGoals.map((goal, i) => (
              <motion.div
                key={goal.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-6 h-full">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0",
                      goal.color
                    )}>
                      <goal.icon className={cn("w-6 h-6", goal.textColor)} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white mb-2">{goal.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{goal.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Institutional Positioning */}
      <section className="py-16 md:py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-8 h-8 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Institutional Positioning</span>
            </div>
            <p className="text-lg text-slate-400 leading-relaxed mb-6">
              Kashmir EcoWatch is a Kashmir diaspora-supported initiative for environmental intelligence and scientific stewardship, supported by <strong className="text-white">Dr. Kumar Foundation USA</strong>. The platform is designed as a public-interest environmental knowledge and monitoring ecosystem, with long-term value in ecological understanding, environmental visibility, district-level awareness, and evidence-based stewardship.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 6. Expert Insight */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-8 h-8 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Expert Insight</span>
            </div>
            <p className="text-lg text-slate-400 leading-relaxed">
              Environmental interpretation and evidence handling on Kashmir EcoWatch may be further informed by the insights of the <strong className="text-white">Kashmir EcoWatch Global Diaspora Environmental Expert Committee</strong>, supporting contextual understanding, scientific judgment, and responsible publication where needed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 7. How This Mission Is Supported */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Trust Framework</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How This Mission Is Supported</h2>
            <p className="text-lg text-slate-400 max-w-3xl">
              Our mission is grounded in structured trust frameworks and methodological responsibility.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustFrameworkLinks.map((link, i) => (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  className="glass-intense border-white/10 p-6 h-full hover:border-white/20 transition-all cursor-pointer group"
                  onClick={() => router.push(link.href)}
                >
                  <link.icon className="w-8 h-8 text-emerald-400 mb-4" />
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-sm text-slate-400">{link.desc}</p>
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

      <AdvancedFooter />
    </main>
  );
}
