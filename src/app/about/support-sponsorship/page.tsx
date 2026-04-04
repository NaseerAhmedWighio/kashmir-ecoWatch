'use client';

import React from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Heart, Building2, Users, Server, Microscope, Community, Handshake,
  Mail, Leaf, FileText, ArrowRight, Globe, DollarSign, Eye, Target, Shield
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const supportAreas = [
  {
    icon: Server,
    title: 'Technical Infrastructure',
    description: 'Platform hosting, development tools, geospatial systems, data storage, monitoring infrastructure, and technical maintenance across all modules and intelligence layers.',
    color: 'from-blue-500/20 to-indigo-500/20',
    textColor: 'text-blue-400',
  },
  {
    icon: Microscope,
    title: 'Scientific Operations',
    description: 'Methodology development, review processes, expert committee coordination, verification standards, confidence assessment frameworks, and publication quality.',
    color: 'from-emerald-500/20 to-teal-500/20',
    textColor: 'text-emerald-400',
  },
  {
    icon: Users,
    title: 'Community Programs',
    description: 'Citizen science initiatives, public engagement, contributor support, educational outreach, and community-based environmental monitoring programs.',
    color: 'from-purple-500/20 to-violet-500/20',
    textColor: 'text-purple-400',
  },
  {
    icon: Handshake,
    title: 'Institutional Partnerships',
    description: 'Collaboration with departments, universities, research bodies, conservation organizations, and technical networks for data sharing, joint monitoring, and coordinated intelligence.',
    color: 'from-amber-500/20 to-orange-500/20',
    textColor: 'text-amber-400',
  },
  {
    icon: Leaf,
    title: 'Platform Growth',
    description: 'Module expansion, new intelligence layers, improved accessibility, multilingual support, enhanced mapping systems, and continuous platform evolution.',
    color: 'from-cyan-500/20 to-blue-500/20',
    textColor: 'text-cyan-400',
  },
];

const sponsorshipFramework = [
  {
    icon: Building2,
    title: 'Institutional Sponsorship',
    description: 'Primary institutional support from the Dr. Kumar Foundation USA provides foundational funding, strategic guidance, and organizational backing for the platform\'s core mission and operations.',
    color: 'from-indigo-500/20 to-blue-500/20',
    textColor: 'text-indigo-400',
  },
  {
    icon: Users,
    title: 'Community-Supported Development',
    description: 'Diaspora community engagement provides additional support through advocacy, knowledge contribution, expert referral, and public-interest alignment for platform activities.',
    color: 'from-emerald-500/20 to-teal-500/20',
    textColor: 'text-emerald-400',
  },
  {
    icon: FileText,
    title: 'In-Kind Contributions',
    description: 'Technical expertise, scientific advisory, data sharing, and methodological guidance from affiliated professionals and institutional partners supplement direct financial support.',
    color: 'from-purple-500/20 to-pink-500/20',
    textColor: 'text-purple-400',
  },
  {
    icon: Eye,
    title: 'Transparency Commitment',
    description: 'Kashmir EcoWatch maintains transparency about its sponsorship and support structure. This page serves as a public record of the institutional relationships that enable the platform\'s work.',
    color: 'from-amber-500/20 to-orange-500/20',
    textColor: 'text-amber-400',
  },
];

const diasporaSupportItems = [
  'Platform development and technical infrastructure',
  'Scientific methodology and review processes',
  'Community engagement and citizen science programs',
  'Public accessibility and inclusive design',
  'Free public access to environmental intelligence',
];

const quickLinks = [
  { icon: Heart, title: 'About', href: '/about' },
  { icon: Target, title: 'Mission', href: '/about/mission' },
  { icon: Shield, title: 'Governance', href: '/about/governance' },
  { icon: Handshake, title: 'Partners', href: '/about/partners' },
  { icon: Mail, title: 'Contact', href: '/about/contact' },
];

export default function SupportSponsorshipPage() {
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
                <Heart className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Institutional Support</Badge>
            </div>

            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              Support & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Sponsorship</span>
            </h1>

            <p className="text-xl text-slate-400 leading-relaxed max-w-4xl">
              Institutional backing, diaspora support, and sponsorship framework enabling Kashmir EcoWatch&apos;s environmental intelligence mission.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Support Statement */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <Card className="glass-intense border-white/10 p-8">
              <p className="text-lg text-slate-300 leading-relaxed mb-4">
                Kashmir EcoWatch is a Kashmir diaspora-supported environmental intelligence initiative. The platform is supported and sponsored by the <strong className="text-white">Dr. Kumar Foundation USA</strong>, enabling its mission to provide scientific environmental monitoring, ecological visibility, and public-interest knowledge systems across Kashmir.
              </p>
              <p className="text-base text-slate-400 leading-relaxed">
                This page outlines the support structure, sponsorship framework, and institutional relationships that sustain the platform&apos;s operations and growth.
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* 3. Primary Sponsorship */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-8 h-8 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Primary Sponsorship</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Institutional Sponsor</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="glass-intense border-white/10 p-8">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-8 h-8 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">Dr. Kumar Foundation USA</h3>
                  <p className="text-base text-slate-300 leading-relaxed mb-6">
                    Institutional sponsor and supporter of Kashmir EcoWatch. The Dr. Kumar Foundation USA provides foundational support enabling the platform&apos;s development, operations, scientific methodology, and public-interest environmental intelligence mission across Kashmir.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-slate-800/50 border border-white/5">
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Location</div>
                      <div className="text-sm font-medium text-white">United States</div>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-800/50 border border-white/5">
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Role</div>
                      <div className="text-sm font-medium text-white">Institutional Sponsorship & Support</div>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-800/50 border border-white/5">
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Focus</div>
                      <div className="text-sm font-medium text-white">Environmental intelligence, scientific research, public-interest knowledge systems</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* 4. Diaspora Support */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Globe className="w-8 h-8 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Diaspora Support</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Kashmir Diaspora Community</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="glass-intense border-white/10 p-8 h-full">
                <p className="text-slate-300 leading-relaxed mb-4">
                  The platform is supported by the Kashmir diaspora community&apos;s commitment to environmental stewardship, scientific inquiry, and responsible public-interest knowledge creation for the Kashmir Valley and its surrounding regions.
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
                <h3 className="text-lg font-bold text-white mb-4">Diaspora support enables:</h3>
                <ul className="space-y-3">
                  {diasporaSupportItems.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                      <span className="text-sm text-slate-300 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Support Areas */}
      <section className="py-16 md:py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <DollarSign className="w-8 h-8 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Support Areas</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Where Support Is Needed</h2>
            <p className="text-lg text-slate-400 max-w-3xl">
              Five key areas require sustained support to maintain and grow the platform&apos;s environmental intelligence capabilities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {supportAreas.map((item, i) => (
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

      {/* 6. Sponsorship Framework */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Handshake className="w-8 h-8 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Sponsorship Framework</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How Sponsorship Works</h2>
            <p className="text-lg text-slate-400 max-w-3xl">
              A multi-layered sponsorship model combining institutional backing, community engagement, and in-kind contributions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {sponsorshipFramework.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="glass-intense border-white/10 p-6 h-full">
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center flex-shrink-0",
                      item.color
                    )}>
                      <item.icon className={cn("w-6 h-6", item.textColor)} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Partnership & Support Inquiries */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Mail className="w-8 h-8 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Partnership & Support Inquiries</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact for Sponsorship</h2>
            <p className="text-lg text-slate-400 max-w-3xl">
              For inquiries about institutional sponsorship, partnership opportunities, or support collaboration:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="glass-intense border-white/10 p-6 h-full">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mb-4">
                  <Handshake className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-sm font-semibold text-slate-300 mb-2">Partnerships</h3>
                <p className="text-base font-medium text-white">partners@kashmir-ecowatch.com</p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass-intense border-white/10 p-6 h-full">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-sm font-semibold text-slate-300 mb-2">General</h3>
                <p className="text-base font-medium text-white">contact@kashmir-ecowatch.com</p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 8. About Kashmir EcoWatch */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <Leaf className="w-8 h-8 text-emerald-400" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">About Kashmir EcoWatch</span>
            </div>
            <Card className="glass-intense border-white/10 p-8">
              <p className="text-base text-slate-300 leading-relaxed mb-6">
                Kashmir EcoWatch is a unified scientific platform for ecological systems, biodiversity monitoring, environmental intelligence, and conservation stewardship across Kashmir. Supported by the Kashmir diaspora and sponsored by the <strong className="text-white">Dr. Kumar Foundation USA</strong>, the platform serves public-interest environmental intelligence through open access, scientific methodology, and responsible ecological stewardship.
              </p>
              <div className="border-t border-white/5 pt-6">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Quick Links</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {quickLinks.map((link) => (
                    <button
                      key={link.title}
                      onClick={() => router.push(link.href)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/50 border border-white/5 text-sm text-slate-300 hover:text-emerald-400 hover:border-emerald-500/20 transition-all text-left"
                    >
                      <link.icon className="w-4 h-4 flex-shrink-0" />
                      <span>{link.title}</span>
                    </button>
                  ))}
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
