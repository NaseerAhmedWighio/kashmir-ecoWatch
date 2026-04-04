'use client';

import React, { useState } from 'react';
import { AdvancedFooter } from '@/components/sections/AdvancedFooter';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import {
  Heart, Building2, Users, Server, Microscope, Handshake,
  Mail, Leaf, ArrowRight, Globe, DollarSign, Eye, Target, Shield,
  ChevronDown, ChevronUp, CheckCircle2, Upload, CheckCircle,
  FileText, Zap, Award, Lightbulb, BookOpen
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

// ─── Data ────────────────────────────────────────────────────────────────────

const SUPPORT_STRUCTURE = [
  { icon: Building2, title: 'Institutional Sponsorship', desc: 'Foundational sponsorship from aligned institutions that enable platform continuity, governance stability, scientific direction, and strategic development.', color: 'from-indigo-500 to-blue-600', iconColor: 'text-indigo-400' },
  { icon: Globe, title: 'Diaspora-Backed Support', desc: 'Support from diaspora-aligned communities, networks, advocates, and experts who strengthen long-term commitment and public-interest continuity.', color: 'from-emerald-500 to-teal-600', iconColor: 'text-emerald-400' },
  { icon: Server, title: 'In-Kind Scientific & Technical Contribution', desc: 'Support through expertise, systems, review capacity, geospatial knowledge, infrastructure, or data-linked contribution.', color: 'from-violet-500 to-purple-600', iconColor: 'text-violet-400' },
  { icon: Heart, title: 'Public-Interest Support Ecosystem', desc: 'A broader layer of aligned contributors, collaborators, and supporters who help keep the platform open, credible, and operational.', color: 'from-amber-500 to-orange-600', iconColor: 'text-amber-400' },
];

const SUPPORT_COMPOSITION = [
  { name: 'Dr. Kumar Foundation USA', type: 'Institutional Sponsor', domain: 'Foundational Support', geo: 'United States', visibility: 'Public Full Listing', scope: 'Core Platform' },
  { name: 'Kashmir Diaspora Network', type: 'Diaspora-Linked Supporter', domain: 'Community & Advocacy', geo: 'Global', visibility: 'Public Limited Listing', scope: 'Platform-Wide' },
];

const DIASPORA_CARDS = [
  { icon: Server, title: 'Technical Enablement', desc: 'Platform development, hosting, geospatial systems, and infrastructure support from diaspora-aligned technologists.' },
  { icon: Microscope, title: 'Scientific Review Support', desc: 'Methodology, verification, and expert review capacity from diaspora scientists and researchers.' },
  { icon: Users, title: 'Community Programs', desc: 'Citizen science, public engagement, contributor support, and community-linked monitoring initiatives.' },
  { icon: Eye, title: 'Accessibility & Public Reach', desc: 'Inclusive design, multilingual support, and open public access to environmental intelligence.' },
  { icon: Heart, title: 'Open Public Intelligence Continuity', desc: 'Sustained commitment to keeping the platform free, credible, and accessible to all users.' },
];

const SUPPORT_NEEDED = [
  { icon: Server, title: 'Technical Infrastructure', desc: 'Hosting, platform operations, storage, geospatial systems, monitoring tools, and technical maintenance.', what: 'Cloud credits, infrastructure grants, technical systems provision', who: 'Tech companies, cloud providers, infrastructure supporters', color: 'from-blue-500 to-cyan-600' },
  { icon: Microscope, title: 'Scientific Operations', desc: 'Methodology, review systems, expert coordination, verification standards, confidence logic, and publication quality.', what: 'Scientific advisory, review capacity, methodology support', who: 'Research institutions, retired scientists, methodology experts', color: 'from-emerald-500 to-teal-600' },
  { icon: Users, title: 'Community Programs', desc: 'Citizen science, public engagement, contributor support, outreach, and community-linked monitoring.', what: 'Program backing, outreach support, community coordination', who: 'Community organizations, citizen science advocates, educators', color: 'from-violet-500 to-purple-600' },
  { icon: Handshake, title: 'Institutional Partnerships', desc: 'Support for coordinated work with departments, universities, research bodies, conservation organizations, and technical networks.', what: 'Institutional bridging, coordination support, partnership enablement', who: 'Universities, research bodies, conservation organizations', color: 'from-amber-500 to-orange-600' },
  { icon: Leaf, title: 'Platform Growth', desc: 'New modules, multilingual support, accessibility improvements, mapping systems, and overall platform expansion.', what: 'Module sponsorship, growth funding, expansion support', who: 'Foundations, aligned institutions, diaspora supporters', color: 'from-cyan-500 to-blue-600' },
];

const SUPPORT_PATHWAYS = [
  { icon: Building2, title: 'Institutional Sponsorship', desc: 'For foundations, institutions, aligned bodies, and mission-support structures.', route: '#support-intake', color: 'from-indigo-500 to-blue-600' },
  { icon: Target, title: 'Strategic Support', desc: 'For organizations that want to back specific platform goals, capabilities, or long-term program areas.', route: '#support-intake', color: 'from-emerald-500 to-teal-600' },
  { icon: Server, title: 'Technical In-Kind Support', desc: 'For infrastructure, systems, engineering, geospatial, or platform-operations support.', route: '#support-intake', color: 'from-violet-500 to-purple-600' },
  { icon: Microscope, title: 'Scientific & Advisory Support', desc: 'For experts, review contributors, retired professionals, thematic advisors, and scientific support roles.', route: '#support-intake', color: 'from-amber-500 to-orange-600' },
  { icon: Globe, title: 'Diaspora Support Participation', desc: 'For diaspora networks, supporters, and aligned contributors who want to strengthen the platform\'s mission.', route: '#support-intake', color: 'from-cyan-500 to-blue-600' },
  { icon: Zap, title: 'Module or Program Support', desc: 'For targeted support of specific modules such as biodiversity, water systems, risk monitoring, or citizen science.', route: '#support-intake', color: 'from-pink-500 to-rose-600' },
];

const SPONSORSHIP_FRAMEWORK = [
  { icon: Building2, title: 'Institutional Sponsorship', desc: 'Foundational support, strategic guidance, and organizational backing for core mission and operations.' },
  { icon: Users, title: 'Community-Supported Development', desc: 'Diaspora-backed engagement through advocacy, knowledge contribution, referral, and mission alignment.' },
  { icon: FileText, title: 'In-Kind Contributions', desc: 'Technical expertise, scientific advisory, data sharing, and methodological support from professionals and partners.' },
  { icon: Eye, title: 'Transparency Commitment', desc: 'Public-facing clarity about support structures, sponsorship relationships, and enabling institutional backing.' },
];

const VISIBILITY_CLASSES = [
  { label: 'Public Full Listing', desc: 'Full name, role, domain, and recognition on the platform.', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  { label: 'Public Limited Listing', desc: 'Name and support class shown; details restricted.', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  { label: 'Support Class Only', desc: 'Only the support category is shown publicly.', color: 'bg-slate-500/10 text-slate-400 border-slate-500/20' },
  { label: 'Anonymous / Non-Public', desc: 'Support acknowledged internally but not listed publicly.', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  { label: 'Internal / Restricted', desc: 'Support relationship maintained for operational purposes only.', color: 'bg-red-500/10 text-red-400 border-red-500/20' },
];

const SUPPORT_CATEGORIES = [
  'Institutional Sponsorship',
  'Strategic Support',
  'Diaspora Support',
  'Technical In-Kind Contribution',
  'Scientific / Advisory Support',
  'Program or Module Support',
  'Infrastructure Support',
  'Community Program Support',
  'Institutional Enablement',
  'Nomination of Another Supporter or Institution',
];

const APPLICANT_TYPES = [
  'Individual',
  'Institution',
  'On behalf of an institution',
  'On behalf of another supporter',
];

const SUPPORT_RELEVANCE = [
  'Environmental intelligence',
  'Water systems',
  'Biodiversity',
  'Risk monitoring',
  'GIS / geospatial systems',
  'Scientific review',
  'Public engagement',
  'Accessibility',
  'Infrastructure',
  'Governance / institutional strengthening',
  'Multilingual and knowledge access',
];

const INTENDED_SUPPORT = [
  'Financial sponsorship',
  'Infrastructure support',
  'Technical systems support',
  'Scientific advisory',
  'Expert referral',
  'Strategic guidance',
  'Institutional coordination',
  'Program backing',
  'Public-interest enablement',
];

const SCOPE_PREFERENCES = [
  'Core platform',
  'One module',
  'One program',
  'One campaign',
  'One support area',
  'Open to discussion',
];

const VISIBILITY_OPTIONS = [
  'Full public listing',
  'Limited public listing',
  'Category-only recognition',
  'Anonymous / non-public',
];

const FAQS = [
  { q: 'How is Kashmir EcoWatch currently supported?', a: 'The platform is sustained through institutional sponsorship from the Dr. Kumar Foundation USA, diaspora-backed community support, in-kind technical and scientific contributions, and a broader public-interest support ecosystem.' },
  { q: 'Is Dr. Kumar Foundation USA the primary sponsor?', a: 'Yes. The Dr. Kumar Foundation USA serves as the primary institutional sponsor, providing foundational funding, strategic guidance, and organizational backing for the platform\'s core mission and operations.' },
  { q: 'Can diaspora individuals or networks express support?', a: 'Yes. Use the Diaspora Support Participation pathway or the Support Interest Intake form below. Diaspora supporters may contribute through advocacy, knowledge sharing, technical support, or financial backing.' },
  { q: 'Can technical or scientific contribution count as support?', a: 'Yes. In-kind contributions through technical expertise, scientific advisory, data sharing, methodology support, or geospatial capacity are recognized as valid and valued forms of support.' },
  { q: 'Can support remain non-public?', a: 'Yes. Support visibility classes include Public Full Listing, Public Limited Listing, Support Class Only, Anonymous / Non-Public, and Internal / Restricted. You choose your preferred level of recognition.' },
  { q: 'Can a supporter later become a partner or advisor?', a: 'Yes. Support relationships may evolve into partnership onboarding, advisory participation, or governance pathways where appropriate and mutually agreed.' },
  { q: 'Can one institution sponsor a specific module only?', a: 'Yes. Module or Program Support allows targeted backing of specific areas such as biodiversity, water systems, risk monitoring, or citizen science without requiring core platform sponsorship.' },
  { q: 'How do I express sponsorship interest?', a: 'Use the Support Interest Intake form below, or contact partners@kashmir-ecowatch.com for institutional sponsorship inquiries.' },
];

// ─── Page Component ──────────────────────────────────────────────────────────

export default function SupportSponsorshipPage() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [supportForm, setSupportForm] = useState({ step: 1, category: '', applicantType: '', name: '', designation: '', affiliation: '', country: '', email: '', phone: '', profileUrl: '', instName: '', instType: '', focalPerson: '', website: '', instEmail: '', instGeography: '', instDomain: '', relevance: [], intendedSupport: [], scope: '', visibility: '', message: '', priorWork: '', referenceLinks: '', nominatorNote: '' });

  const toggleSelection = (list: string[], value: string) =>
    list.includes(value) ? list.filter(v => v !== value) : [...list, value];

  return (
    <main className="min-h-screen bg-slate-950">
      {/* ─── 1. Hero ──────────────────────────────────────────────────────── */}
      <section className="relative pt-20 md:pt-48 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-teal-950/30 to-slate-950" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-5xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-2xl">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <Badge variant="info" size="lg">Support, Sponsorship & Institutional Backing</Badge>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
              Support, Sponsorship &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Institutional Backing</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-4xl mb-8">
              Institutional sponsorship, diaspora-backed support, in-kind contribution pathways, and structured support participation for Kashmir EcoWatch.
            </p>

            <p className="text-base text-slate-400 leading-relaxed max-w-3xl mb-8">
              Kashmir EcoWatch is sustained through institutional sponsorship, diaspora-supported commitment, technical and scientific contribution, and public-interest backing that enables the platform's environmental intelligence mission across Kashmir.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => document.getElementById('support-structure')?.scrollIntoView({ behavior: 'smooth' })}>
                View Support Structure <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => document.getElementById('pathways')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore Support Pathways
              </Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => document.getElementById('support-intake')?.scrollIntoView({ behavior: 'smooth' })}>
                Express Support Interest
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 2. Support Structure Overview ────────────────────────────────── */}
      <section id="support-structure" className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <Badge variant="info">Structure</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">How the Platform Is Supported</h2>
            <p className="text-slate-400 max-w-3xl leading-relaxed">
              Kashmir EcoWatch depends on a multi-layered support ecosystem combining institutional sponsorship, diaspora commitment, in-kind contribution, and public-interest backing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SUPPORT_STRUCTURE.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 p-5 h-full">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center mb-3`}>
                    <s.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. Current Support Composition ───────────────────────────────── */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <Badge variant="info">Composition</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Current Support Composition</h2>
            <p className="text-slate-400 max-w-3xl leading-relaxed">
              Kashmir EcoWatch maintains a public record of major sponsorship and support relationships where suitable for display. Some support entities may be listed publicly, while others may remain limited or internal depending on preference, role, or institutional sensitivity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl">
            {SUPPORT_COMPOSITION.map(entity => (
              <Card key={entity.name} className="glass-intense border-white/10 p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-white">{entity.name}</h3>
                  <span className={cn('text-xs px-2 py-0.5 rounded-full border', entity.visibility === 'Public Full Listing' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-blue-500/10 text-blue-400 border-blue-500/20')}>{entity.visibility}</span>
                </div>
                <div className="space-y-1 text-xs text-slate-400">
                  <p><span className="text-slate-500">Type:</span> {entity.type}</p>
                  <p><span className="text-slate-500">Domain:</span> {entity.domain}</p>
                  <p><span className="text-slate-500">Geography:</span> {entity.geo}</p>
                  <p><span className="text-slate-500">Scope:</span> {entity.scope}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. Primary Institutional Sponsor ─────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <Badge variant="info">Primary Sponsor</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Primary Institutional Sponsor</h2>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="glass-intense border-amber-500/20 bg-amber-500/5 p-6 sm:p-8 max-w-4xl">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-8 h-8 text-amber-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-xl font-bold text-white">Dr. Kumar Foundation USA</h3>
                    <Badge variant="outline" size="sm" className="border-amber-500/30 text-amber-400 bg-amber-500/10">Primary Sponsor</Badge>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    Institutional sponsor and supporter of Kashmir EcoWatch. The Dr. Kumar Foundation USA provides foundational support enabling the platform's development, operations, scientific methodology, and public-interest environmental intelligence mission across Kashmir.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                      <div className="text-xs text-slate-500 mb-1">Location</div>
                      <div className="text-sm text-white">United States</div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                      <div className="text-xs text-slate-500 mb-1">Role</div>
                      <div className="text-sm text-white">Institutional Sponsorship</div>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                      <div className="text-xs text-slate-500 mb-1">Visibility</div>
                      <div className="text-sm text-white">Public Full Listing</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ─── 5. Diaspora Support Architecture ─────────────────────────────── */}
      <section className="py-16 md:py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <Badge variant="info">Diaspora</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Diaspora Support Architecture</h2>
            <p className="text-slate-400 max-w-3xl leading-relaxed">
              The Kashmir diaspora community's commitment to environmental stewardship, scientific inquiry, and responsible public-interest knowledge creation sustains multiple platform dimensions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mb-8">
            {DIASPORA_CARDS.map((card, i) => (
              <motion.div key={card.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 p-5 h-full">
                  <card.icon className="w-6 h-6 text-emerald-400 mb-3" />
                  <h3 className="text-sm font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <Button variant="outline" className="border-white/20 text-white hover:bg-white/5" onClick={() => document.getElementById('support-intake')?.scrollIntoView({ behavior: 'smooth' })}>
            Express Diaspora Support Interest <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      {/* ─── 6. Where Support Is Needed ───────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <Badge variant="info">Need</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Where Support Is Needed</h2>
            <p className="text-slate-400 max-w-3xl leading-relaxed">
              Five key areas require sustained support to maintain and grow the platform's environmental intelligence capabilities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl">
            {SUPPORT_NEEDED.map((area, i) => (
              <motion.div key={area.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 p-5 h-full flex flex-col">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${area.color} flex items-center justify-center mb-3`}>
                    <area.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{area.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3 flex-grow">{area.desc}</p>
                  <div className="space-y-1.5 text-xs text-slate-500 pt-3 border-t border-white/5">
                    <p><span className="text-slate-400">Support could look like:</span> {area.what}</p>
                    <p><span className="text-slate-400">Suitable for:</span> {area.who}</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-emerald-500/20 text-emerald-400 mt-3 text-xs" onClick={() => document.getElementById('support-intake')?.scrollIntoView({ behavior: 'smooth' })}>
                    Express Interest
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. Choose a Support Pathway ──────────────────────────────────── */}
      <section id="pathways" className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <Badge variant="info">Pathways</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Choose a Support Pathway</h2>
            <p className="text-slate-400 max-w-3xl leading-relaxed">
              Select the pathway that matches your organization, expertise, or support intent.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl">
            {SUPPORT_PATHWAYS.map((path, i) => (
              <motion.div key={path.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 p-5 cursor-pointer group h-full" onClick={() => document.getElementById('support-intake')?.scrollIntoView({ behavior: 'smooth' })}>
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${path.color} flex items-center justify-center shrink-0`}>
                      <path.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">{path.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{path.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. How Sponsorship Works ─────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <Badge variant="info">Framework</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">How Sponsorship Works</h2>
            <p className="text-slate-400 max-w-3xl leading-relaxed">
              A multi-layered sponsorship model combining institutional backing, community engagement, in-kind contributions, and transparency.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl">
            {SPONSORSHIP_FRAMEWORK.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="glass-intense border-white/10 p-5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. Public Listing & Recognition ──────────────────────────────── */}
      <section className="py-16 md:py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <Badge variant="info">Recognition</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Public Listing & Recognition</h2>
            <p className="text-slate-400 max-w-3xl leading-relaxed">
              Not all supporters need to be displayed in the same way. Kashmir EcoWatch maintains different visibility classes for sponsors, supporters, technical contributors, advisors, and non-public backing entities.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl">
            {VISIBILITY_CLASSES.map(vc => (
              <Card key={vc.label} className={cn('glass-intense p-5 border', vc.color)}>
                <h3 className="text-sm font-bold text-white mb-2">{vc.label}</h3>
                <p className="text-xs text-slate-300">{vc.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 10. Support Interest Intake ───────────────────────────────────── */}
      <section id="support-intake" className="py-16 md:py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <Badge variant="info">Interest Intake</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Interested in Supporting Kashmir EcoWatch?</h2>
            <p className="text-slate-400 max-w-3xl leading-relaxed">
              Kashmir EcoWatch welcomes structured expressions of interest from institutions, sponsors, diaspora supporters, technical contributors, scientific advisors, public-interest backers, and aligned supporters.
            </p>
            <p className="text-xs text-slate-500 mt-2 max-w-3xl">
              Submission of interest does not automatically create a public sponsor listing, institutional designation, or partnership status. Expressions of interest are reviewed according to mission fit, support relevance, platform needs, governance suitability, and public visibility preferences.
            </p>
          </motion.div>

          <Card className="glass-intense border-white/10 p-6 sm:p-8 max-w-4xl">
            {/* Step indicator */}
            <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
              {['Support Category', 'Applicant Type', 'Profile', 'Support Relevance', 'Intended Support', 'Scope', 'Visibility', 'Details', 'Review'].map((label, i) => (
                <div key={label} className={cn('flex items-center shrink-0', i < 8 && 'mr-1')}>
                  <div className={cn('w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold', supportForm.step > i + 1 ? 'bg-emerald-500 text-white' : supportForm.step === i + 1 ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-white/5 text-slate-500')}>
                    {supportForm.step > i + 1 ? <CheckCircle className="w-4 h-4" /> : i + 1}
                  </div>
                  <span className={cn('text-xs ml-1 hidden lg:inline', supportForm.step === i + 1 ? 'text-emerald-400' : 'text-slate-500')}>{label}</span>
                </div>
              ))}
            </div>

            {/* Step 1 */}
            {supportForm.step === 1 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Support Category</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SUPPORT_CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => setSupportForm({ ...supportForm, category: cat })} className={cn('px-4 py-3 rounded-lg text-sm text-left transition-colors border', supportForm.category === cat ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10')}>{cat}</button>
                  ))}
                </div>
                <Button className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => setSupportForm({ ...supportForm, step: 2 })} disabled={!supportForm.category}>Continue</Button>
              </div>
            )}

            {/* Step 2 */}
            {supportForm.step === 2 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Applicant Type</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {APPLICANT_TYPES.map(type => (
                    <button key={type} onClick={() => setSupportForm({ ...supportForm, applicantType: type })} className={cn('px-4 py-3 rounded-lg text-sm text-left transition-colors border', supportForm.applicantType === type ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10')}>{type}</button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setSupportForm({ ...supportForm, step: 1 })}>Back</Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => setSupportForm({ ...supportForm, step: 3 })} disabled={!supportForm.applicantType}>Continue</Button>
                </div>
              </div>
            )}

            {/* Step 3: Profile */}
            {supportForm.step === 3 && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white mb-4">Profile</h3>
                {[
                  { key: 'name', label: 'Full Name', required: true },
                  { key: 'designation', label: 'Designation' },
                  { key: 'affiliation', label: 'Affiliation' },
                  { key: 'country', label: 'Country' },
                  { key: 'email', label: 'Email', required: true },
                  { key: 'phone', label: 'Phone' },
                  { key: 'profileUrl', label: 'Public Profile Link' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-xs font-medium text-slate-300 mb-1">{field.label}{field.required && <span className="text-red-400 ml-1">*</span>}</label>
                    <input type="text" value={(supportForm as any)[field.key] || ''} onChange={e => setSupportForm({ ...supportForm, [field.key]: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm" placeholder={field.label} />
                  </div>
                ))}
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setSupportForm({ ...supportForm, step: 2 })}>Back</Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => setSupportForm({ ...supportForm, step: 4 })}>Continue</Button>
                </div>
              </div>
            )}

            {/* Step 4 */}
            {supportForm.step === 4 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Support Relevance (multi-select)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SUPPORT_RELEVANCE.map(r => (
                    <button key={r} onClick={() => setSupportForm({ ...supportForm, relevance: toggleSelection(supportForm.relevance, r) })} className={cn('px-4 py-3 rounded-lg text-sm text-left transition-colors border', supportForm.relevance.includes(r) ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10')}>
                      {supportForm.relevance.includes(r) && <CheckCircle2 className="w-4 h-4 inline mr-2 text-emerald-400" />}{r}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setSupportForm({ ...supportForm, step: 3 })}>Back</Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => setSupportForm({ ...supportForm, step: 5 })}>Continue</Button>
                </div>
              </div>
            )}

            {/* Step 5 */}
            {supportForm.step === 5 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Intended Support (multi-select)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {INTENDED_SUPPORT.map(s => (
                    <button key={s} onClick={() => setSupportForm({ ...supportForm, intendedSupport: toggleSelection(supportForm.intendedSupport, s) })} className={cn('px-4 py-3 rounded-lg text-sm text-left transition-colors border', supportForm.intendedSupport.includes(s) ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10')}>
                      {supportForm.intendedSupport.includes(s) && <CheckCircle2 className="w-4 h-4 inline mr-2 text-emerald-400" />}{s}
                    </button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setSupportForm({ ...supportForm, step: 4 })}>Back</Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => setSupportForm({ ...supportForm, step: 6 })}>Continue</Button>
                </div>
              </div>
            )}

            {/* Step 6 */}
            {supportForm.step === 6 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Scope Preference</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SCOPE_PREFERENCES.map(s => (
                    <button key={s} onClick={() => setSupportForm({ ...supportForm, scope: s })} className={cn('px-4 py-3 rounded-lg text-sm text-left transition-colors border', supportForm.scope === s ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10')}>{s}</button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setSupportForm({ ...supportForm, step: 5 })}>Back</Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => setSupportForm({ ...supportForm, step: 7 })} disabled={!supportForm.scope}>Continue</Button>
                </div>
              </div>
            )}

            {/* Step 7 */}
            {supportForm.step === 7 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Visibility Preference</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {VISIBILITY_OPTIONS.map(v => (
                    <button key={v} onClick={() => setSupportForm({ ...supportForm, visibility: v })} className={cn('px-4 py-3 rounded-lg text-sm text-left transition-colors border', supportForm.visibility === v ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10')}>{v}</button>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setSupportForm({ ...supportForm, step: 6 })}>Back</Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => setSupportForm({ ...supportForm, step: 8 })} disabled={!supportForm.visibility}>Continue</Button>
                </div>
              </div>
            )}

            {/* Step 8 */}
            {supportForm.step === 8 && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white mb-4">Supporting Details</h3>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Message</label>
                  <textarea value={supportForm.message} onChange={e => setSupportForm({ ...supportForm, message: e.target.value })} rows={3} className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm resize-none" placeholder="Describe your interest in supporting Kashmir EcoWatch" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Prior Relevant Work</label>
                  <input type="text" value={supportForm.priorWork} onChange={e => setSupportForm({ ...supportForm, priorWork: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm" placeholder="e.g., 10+ years in environmental technology" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Reference Links</label>
                  <input type="text" value={supportForm.referenceLinks} onChange={e => setSupportForm({ ...supportForm, referenceLinks: e.target.value })} className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 text-sm" placeholder="Website, portfolio, or publication links" />
                </div>
                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-emerald-500/30 transition-colors cursor-pointer">
                  <Upload className="w-8 h-8 text-slate-500 mx-auto mb-3" />
                  <p className="text-sm text-slate-400">Upload supporting documents (CV, reports, certifications)</p>
                  <p className="text-xs text-slate-500 mt-1">PDF, DOC, images (max 25MB each)</p>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setSupportForm({ ...supportForm, step: 7 })}>Back</Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => setSupportForm({ ...supportForm, step: 9 })}>Review & Submit</Button>
                </div>
              </div>
            )}

            {/* Step 9: Review */}
            {supportForm.step === 9 && (
              <div>
                <h3 className="text-sm font-bold text-white mb-4">Review Summary</h3>
                <Card className="bg-white/5 border-white/10 p-4 mb-6">
                  <div className="space-y-2 text-sm">
                    <p><span className="text-slate-500">Category:</span> <span className="text-white">{supportForm.category || '—'}</span></p>
                    <p><span className="text-slate-500">Applicant Type:</span> <span className="text-white">{supportForm.applicantType || '—'}</span></p>
                    <p><span className="text-slate-500">Name:</span> <span className="text-white">{supportForm.name || '—'}</span></p>
                    <p><span className="text-slate-500">Email:</span> <span className="text-white">{supportForm.email || '—'}</span></p>
                    <p><span className="text-slate-500">Relevance:</span> <span className="text-white">{supportForm.relevance.join(', ') || '—'}</span></p>
                    <p><span className="text-slate-500">Intended Support:</span> <span className="text-white">{supportForm.intendedSupport.join(', ') || '—'}</span></p>
                    <p><span className="text-slate-500">Scope:</span> <span className="text-white">{supportForm.scope || '—'}</span></p>
                    <p><span className="text-slate-500">Visibility:</span> <span className="text-white">{supportForm.visibility || '—'}</span></p>
                  </div>
                </Card>
                <div className="flex gap-3">
                  <Button variant="outline" className="border-white/20 text-white" onClick={() => setSupportForm({ ...supportForm, step: 8 })}>Back</Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => { alert('Support interest submitted for review.'); setSupportForm({ step: 1, category: '', applicantType: '', name: '', designation: '', affiliation: '', country: '', email: '', phone: '', profileUrl: '', instName: '', instType: '', focalPerson: '', website: '', instEmail: '', instGeography: '', instDomain: '', relevance: [], intendedSupport: [], scope: '', visibility: '', message: '', priorWork: '', referenceLinks: '', nominatorNote: '' }); }}>Submit Support Interest</Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* ─── 11. Contact for Support & Sponsorship ────────────────────────── */}
      <section className="py-16 md:py-20 bg-slate-900">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl">
            <Badge variant="info">Contact</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Contact for Support & Sponsorship</h2>
            <p className="text-slate-400 mb-8 leading-relaxed">
              These addresses may route into a shared backend handling system, but the public-facing contact matches your intent and context.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Sponsorship & Institutional Support', email: 'partners@kashmir-ecowatch.com', icon: Building2, color: 'text-indigo-400' },
                { label: 'General Support & Coordination', email: 'contact@kashmir-ecowatch.com', icon: Mail, color: 'text-emerald-400' },
                { label: 'Technical or Scientific Support', email: 'experts@kashmir-ecowatch.com', icon: Microscope, color: 'text-violet-400' },
              ].map(c => (
                <Card key={c.label} className="glass-intense border-white/10 p-5">
                  <c.icon className={cn('w-6 h-6 mb-3', c.color)} />
                  <p className="text-xs text-slate-500 mb-1">{c.label}</p>
                  <a href={`mailto:${c.email}`} className="text-xs font-mono text-white hover:text-emerald-400 hover:underline break-all">{c.email}</a>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 12. Relationship to Partners and Governance ──────────────────── */}
      <section className="py-16 md:py-20 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl">
            <Card className="glass-intense border-white/10 p-6 sm:p-8">
              <h2 className="text-lg font-bold text-white mb-3">How This Relates to Partners and Governance</h2>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                Support and sponsorship are related to, but distinct from, partnership onboarding and governance participation. Institutions or individuals may support Kashmir EcoWatch financially, strategically, technically, or scientifically without necessarily serving as governance participants or formal institutional partners.
              </p>
              <p className="text-sm text-slate-400 leading-relaxed">
                Where appropriate, support relationships may also evolve into partnership, advisory, or governance pathways. This helps distinguish between <strong className="text-white">sponsor</strong>, <strong className="text-white">partner</strong>, <strong className="text-white">governance participant</strong>, and <strong className="text-white">expert contributor</strong>.
              </p>
              <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-white/5">
                <Button variant="outline" size="sm" className="border-white/20 text-white text-xs" onClick={() => router.push('/about/partners')}>
                  Partners Page <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
                <Button variant="outline" size="sm" className="border-white/20 text-white text-xs" onClick={() => router.push('/about/governance')}>
                  Governance Page <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* ─── 13. FAQ ──────────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-slate-950">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <Badge variant="info">FAQ</Badge>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-4 mb-3">Frequently Asked Questions</h2>
          </motion.div>

          <div className="max-w-4xl space-y-3">
            {FAQS.map((faq, i) => (
              <Card key={i} className="glass-intense border-white/10 p-0 overflow-hidden cursor-pointer" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                <div className="p-5 sm:p-6 flex items-start justify-between gap-4">
                  <h3 className="text-sm font-semibold text-white leading-snug flex-1">{faq.q}</h3>
                  <span className="text-slate-400 shrink-0">{openFaq === i ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}</span>
                </div>
                {openFaq === i && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-white/10 pt-3">
                    <p className="text-sm text-slate-300 leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      <AdvancedFooter />
    </main>
  );
}
