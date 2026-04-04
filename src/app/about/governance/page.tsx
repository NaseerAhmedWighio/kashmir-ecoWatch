'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Shield, Users, Building2, FlaskConical, Briefcase, FileText,
  Mail, BookOpen, Eye, Handshake, AlertTriangle, Microscope, Globe
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const governanceStructure = [
  {
    icon: Shield,
    title: 'Platform Governance',
    description: 'Overall strategic direction, institutional relationships, public-interest mandate, legal compliance, and platform-level policy decisions. Responsible for ensuring alignment with Kashmir\'s environmental intelligence needs and diaspora-supported mission.',
    color: 'from-indigo-500/20 to-blue-500/20',
    textColor: 'text-indigo-400',
  },
  {
    icon: FlaskConical,
    title: 'Scientific Advisory',
    description: 'Expert guidance on methodology, verification standards, confidence assessment frameworks, and review logic. Ensures that platform outputs maintain scientific credibility and methodological transparency across all intelligence layers.',
    color: 'from-emerald-500/20 to-teal-500/20',
    textColor: 'text-emerald-400',
  },
  {
    icon: Microscope,
    title: 'Expert Committee',
    description: 'Independent and affiliated professionals who contribute domain expertise, review platform content, validate findings, and advise on sensitive ecological matters. Includes retired experts, specialist reviewers, and independent scientists.',
    color: 'from-purple-500/20 to-violet-500/20',
    textColor: 'text-purple-400',
  },
  {
    icon: Briefcase,
    title: 'Operational Management',
    description: 'Day-to-day platform operations, content production, evidence handling, contribution review, alert management, and technical system maintenance. Managed by the core platform team with coordination across modules.',
    color: 'from-amber-500/20 to-orange-500/20',
    textColor: 'text-amber-400',
  },
];

const teamStructure = [
  {
    icon: Users,
    title: 'Core Platform Team',
    description: 'Full-time and dedicated contributors responsible for platform architecture, content development, intelligence production, and system operations across all Kashmir EcoWatch modules.',
    color: 'from-blue-500/20 to-indigo-500/20',
    textColor: 'text-blue-400',
  },
  {
    icon: Microscope,
    title: 'Affiliated Experts',
    description: 'Professionals and scientists with domain expertise in ecology, hydrology, geology, forestry, environmental science, GIS, and related fields who provide review, validation, and advisory input.',
    color: 'from-emerald-500/20 to-teal-500/20',
    textColor: 'text-emerald-400',
  },
  {
    icon: BookOpen,
    title: 'Expert Committee',
    description: 'Senior and retired professionals who offer institutional memory, domain authority, and independent review of platform methodology, verification standards, and publication decisions.',
    color: 'from-purple-500/20 to-violet-500/20',
    textColor: 'text-purple-400',
  },
  {
    icon: Eye,
    title: 'Community Contributors',
    description: 'Public observers, citizen scientists, field reporters, and local knowledge holders who submit sightings, reports, observations, and community-supported evidence through designated pathways.',
    color: 'from-cyan-500/20 to-blue-500/20',
    textColor: 'text-cyan-400',
  },
  {
    icon: Handshake,
    title: 'Institutional Partners',
    description: 'Departments, universities, research bodies, laboratories, NGOs, and technical networks engaged in structured collaboration, data sharing, joint monitoring, and coordinated environmental intelligence.',
    color: 'from-rose-500/20 to-red-500/20',
    textColor: 'text-rose-400',
  },
];

const advisoryFramework = [
  {
    icon: BookOpen,
    title: 'Methodology Advisory',
    description: 'Advises on review logic, classification systems, confidence scoring, evidence standards, and methodological documentation across all platform intelligence layers.',
    color: 'from-blue-500/20 to-indigo-500/20',
    textColor: 'text-blue-400',
  },
  {
    icon: AlertTriangle,
    title: 'Sensitivity & Ethics Advisory',
    description: 'Guides decisions on sensitive species protection, ecological vulnerability handling, community safety considerations, and responsible publication of environmental intelligence.',
    color: 'from-amber-500/20 to-orange-500/20',
    textColor: 'text-amber-400',
  },
  {
    icon: Building2,
    title: 'Technical Advisory',
    description: 'Provides guidance on geospatial systems, data architecture, monitoring technology, platform infrastructure, and technical evolution of the Kashmir EcoWatch system.',
    color: 'from-emerald-500/20 to-teal-500/20',
    textColor: 'text-emerald-400',
  },
  {
    icon: Globe,
    title: 'Institutional Coordination Advisory',
    description: 'Facilitates relationships with government departments, research institutions, conservation bodies, and international environmental networks relevant to Kashmir\'s ecological intelligence.',
    color: 'from-purple-500/20 to-violet-500/20',
    textColor: 'text-purple-400',
  },
];

const oversightItems = [
  'Platform governance structure ensuring accountability',
  'Expert committee review of methodology and publication decisions',
  'Institutional partner coordination for data quality and credibility',
  'Community feedback pathways for platform improvement',
  'Transparent terms of use, methodology documentation, and verification frameworks',
];

const governanceContacts = [
  { label: 'Governance inquiries', email: 'contact@kashmir-ecowatch.com', icon: Shield },
  { label: 'Expert participation', email: 'experts@kashmir-ecowatch.com', icon: Microscope },
  { label: 'Institutional coordination', email: 'partners@kashmir-ecowatch.com', icon: Handshake },
];

export default function GovernancePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-950">
      {/* 1. Hero */}
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
                <Shield className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Institutional Governance</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-slate-400">Governance</span>
            </h1>

            <p className="text-xl text-slate-400 leading-relaxed max-w-4xl">
              Governance structure, advisory framework, team organization, expert committee, and institutional oversight for Kashmir EcoWatch.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Governance Statement */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-indigo-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Governance Statement</span>
            </div>
            <Card className="glass-intense border-white/10 p-8">
              <p className="text-lg text-slate-300 leading-relaxed">
                Kashmir EcoWatch operates under a structured governance framework designed to ensure scientific integrity, environmental responsibility, institutional accountability, and public-interest stewardship. The platform&apos;s governance model separates operational management, scientific advisory, expert review, and institutional coordination into distinct but interconnected layers.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* 3. Governance Structure */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-indigo-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Governance Structure</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Four Pillars of Governance</h2>
            <p className="text-lg text-slate-400 max-w-3xl">
              Distinct but interconnected layers that ensure accountability, scientific rigor, and operational effectiveness.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {governanceStructure.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-6 h-full">
                  <div className={cn(
                    "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4",
                    item.color
                  )}>
                    <item.icon className={cn("w-6 h-6", item.textColor)} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Team Structure */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Users className="w-8 h-8 text-indigo-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Team Structure</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Organizational Layers</h2>
            <p className="text-lg text-slate-400 max-w-3xl">
              A multi-tier team structure combining core operations, expert review, community participation, and institutional collaboration.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {teamStructure.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-6 h-full">
                  <div className={cn(
                    "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4",
                    item.color
                  )}>
                    <item.icon className={cn("w-6 h-6", item.textColor)} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Advisory Framework */}
      <section className="py-16 md:py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <FileText className="w-8 h-8 text-indigo-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Advisory Framework</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How Advisory Works</h2>
            <p className="text-lg text-slate-400 max-w-3xl">
              Specialized advisory streams providing structured guidance across methodology, ethics, technology, and institutional coordination.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {advisoryFramework.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-6 h-full">
                  <div className={cn(
                    "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4",
                    item.color
                  )}>
                    <item.icon className={cn("w-6 h-6", item.textColor)} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Leadership & Oversight */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-8 h-8 text-indigo-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Leadership & Oversight</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Platform Leadership</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="glass-intense border-white/10 p-8 h-full">
                <h3 className="text-lg font-bold text-white mb-4">Leadership Direction</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Kashmir EcoWatch is led by a core team responsible for platform vision, strategic partnerships, institutional relationships, and public-interest direction. The platform operates as a Kashmir diaspora-supported initiative with institutional backing from the <strong className="text-white">Dr. Kumar Foundation USA</strong>.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass-intense border-white/10 p-8 h-full">
                <h3 className="text-lg font-bold text-white mb-4">Oversight Mechanisms</h3>
                <p className="text-slate-300 leading-relaxed mb-4">
                  Oversight is provided through:
                </p>
                <ul className="space-y-3">
                  {oversightItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" />
                      <span className="text-sm text-slate-300 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. Contact for Governance Matters */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-8 h-8 text-indigo-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Governance Contact</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact for Governance Matters</h2>
            <p className="text-lg text-slate-400 max-w-3xl">
              For governance, advisory, expert committee, or institutional oversight questions:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {governanceContacts.map((contact, i) => (
              <motion.div
                key={contact.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-blue-500/20 flex items-center justify-center mb-4">
                    <contact.icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-300 mb-2">{contact.label}</h3>
                  <p className="text-base font-medium text-white">{contact.email}</p>
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
